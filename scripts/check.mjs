import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'Requisitos/Artefatos/SistemaApoioENADE');
const require=createRequire(import.meta.url);
const C=require(path.join(dir,'Prototipos/core.js'));
const data=JSON.parse(await fs.readFile(path.join(dir,'catalogo.json'),'utf8'));
let checks=0;
const check=(condition,message)=>{assert.ok(condition,message);checks++;};
const sets=Object.fromEntries(['needs','rf','rules','nfr','cases'].map(k=>[k,new Set(data[k].map(r=>r[0]))]));
for(const k of Object.keys(sets))check(sets[k].size===data[k].length,`IDs duplicados: ${k}`);
const valid=new Set(Object.values(sets).flatMap(s=>[...s]));
for(const [type,rows] of Object.entries(data))if(Array.isArray(rows))for(const row of rows){
  for(const ref of JSON.stringify(row).matchAll(/\b(?:RF|RNF|RN|NEC|UC)-\d{2}\b/g))check(valid.has(ref[0]),`${type}: referência inexistente ${ref[0]}`);
}
for(const r of data.rf){
  check(data.cases.some(c=>c[0]===r[4]&&c[7].split(', ').includes(r[0])),`${r[0]} sem cobertura no caso de uso`);
  for(const name of ['RequisitosFuncionais.md','Backlog.md','Rastreabilidade.md'])check((await fs.readFile(path.join(dir,name),'utf8')).includes(r[0]),`${r[0]} ausente em ${name}`);
}
async function walk(folder){const entries=await fs.readdir(folder,{withFileTypes:true});return (await Promise.all(entries.map(x=>x.isDirectory()?walk(path.join(folder,x.name)):path.join(folder,x.name)))).flat();}
const files=await walk(dir);
for(const file of [path.join(root,'README.md'),...files.filter(f=>f.endsWith('.md')&&!f.includes(path.sep+'Referencias'+path.sep))]){
  const content=await fs.readFile(file,'utf8');
  for(const [,target] of content.matchAll(/\]\(([^)]+)\)/g)){
    if(/^(?:https?:|#|mailto:)/.test(target))continue;
    const location=path.resolve(path.dirname(file),decodeURIComponent(target.split('#')[0]));
    check(await fs.stat(location).then(()=>true,()=>false),`Link inexistente: ${path.relative(root,file)} -> ${target}`);
  }
  for(const ref of content.matchAll(/\b(?:RF|RNF|RN|NEC|UC)-\d{2}\b/g))check(valid.has(ref[0]),`Referência inválida em ${file}: ${ref[0]}`);
}
for(const diagram of ['CasosDeUso','Componentes','Implantacao','Classes','Sequencia','Atividades']){
  const svg=await fs.readFile(path.join(dir,'UML',diagram+'.svg'),'utf8');
  check(svg.includes('<svg')&&!/Syntax Error|An error has occurred/i.test(svg),`Renderização inválida: ${diagram}`);
}
// Dados mínimos de ensaio, em memória. Não são cadastrados no protótipo distribuído.
const q={id:'q',year:2021,course:'Área de ensaio',component:'Componente específico',theme:'Tema de ensaio',number:'1',source:'https://www.gov.br/inep/',answerSource:'https://www.gov.br/inep/',statement:'Ensaio de integridade',options:['1','2','3','4','5'],correct:'A',comment:'Ensaio de validação técnica',status:'published',reviewed:true};
check(C.validateQuestion(q).length===0,'Questão válida rejeitada');
check(C.validateQuestion({...q,options:['1','1','3','4','5']}).includes('options'),'Alternativas duplicadas aceitas');
check(C.validateQuestion({...q,source:'javascript:alert(1)'}).includes('source'),'Origem insegura aceita');
check(C.validateQuestion({...q,reviewed:false}).includes('reviewed'),'Publicação sem revisão aceita');
assert.throws(()=>C.createAttempt([q],2,1));checks++;
assert.throws(()=>C.createAttempt([q],1,0));checks++;
const a=C.createAttempt([q],1,1,'simulado',1000,'t1');
q.correct='B';check(a.questions[0].correct==='A','Tentativa não preserva fotografia');
check(!C.answer(a,'outra','A',1500),'Questão estranha aceita');
check(C.answer(a,'q','A',1500),'Resposta em prazo rejeitada');
check(!C.answer(a,'q','B',61000),'Resposta após prazo aceita');
C.finish(a,62000);check(a.reason==='prazo'&&a.ended===61000,'Prazo não respeitado');
C.finish(a,90000);check(a.ended===61000,'Encerramento não idempotente');
check(!C.answer(a,'q','B',62000),'Tentativa encerrada alterável');
const s=C.score(a);check(s.correct===1&&s.percent===100&&s.blank===0,'Correção incorreta');
const b=C.createAttempt([q],1,1,'pratica',1000,'t2');C.finish(b,2000);check(C.score(b).blank===1,'Omissão incorreta');
const open=C.createAttempt([q],1,1,'simulado',1000,'t3');
check(C.aggregate([a,b,open]).attempts===2,'Tentativa aberta entrou na estatística');
check(C.aggregate([a,b]).percent===50,'Agregação usa denominador incorreto');
check(C.aggregate([]).percent===null,'Ausência de dados virou nota');
check(C.score({questions:[{id:'x',theme:'__proto__',correct:'A'}],answers:{x:'A'}}).correct===1,'Tema especial altera cálculo');
console.log(`${checks} verificações concluídas: referências, links, cobertura, SVG, pontuação, prazo, omissões, imutabilidade e agregação.`);
