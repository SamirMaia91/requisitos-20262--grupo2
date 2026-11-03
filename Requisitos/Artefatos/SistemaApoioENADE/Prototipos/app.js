/* Interface acadêmica local. Sem contas, senhas ou serviços institucionais. */
(() => {
  'use strict';
  const C = window.EnadeCore;
  const key = 'enade.grupo2.v2';
  const emptyState = () => ({version:2,questions:[],attempts:[],messages:[],reports:[],role:'estudante'});
  let state = emptyState(), volatile = false, corrupt = false, index = 0;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version !== 2 || !['questions','attempts','messages','reports'].every(k=>Array.isArray(parsed[k])) || parsed.questions.some(q=>C.validateQuestion(q).length)) throw Error('Dados incompatíveis.');
      state = parsed;
    }
  } catch { corrupt = true; }
  const main = document.querySelector('main');
  const e = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uuid = () => typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2);
  const published = () => state.questions.filter(q=>q.status==='published');
  const active = () => state.attempts.find(a=>a.ended===null);
  const completed = () => state.attempts.filter(a=>a.ended!==null);
  const date = stamp => new Date(stamp).toLocaleString('pt-BR');
  const percent = n => n === null ? '—' : n.toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
  const button = (href,text,kind='primary') => `<a class="${kind}" href="${href}">${text}</a>`;
  const blank = (title,text,action='') => `<div class="empty"><span class="empty-symbol" aria-hidden="true">▤</span><h3>${title}</h3><p>${text}</p>${action}</div>`;
  const heading = (eyebrow,title,subtitle) => `<div class="page-head"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="intro">${subtitle}</p></div><span class="badge">Grupo 2 · 2026.2</span></div>`;
  const chips = q => `<div class="chips"><span class="chip">${e(q.year)}</span><span class="chip">${e(q.course)}</span><span class="chip">${e(q.component)}</span><span class="chip">${e(q.theme)}</span></div>`;
  const source = q => `<p class="muted">Questão ${e(q.number)} · <a href="${e(q.source)}" target="_blank" rel="noopener noreferrer">Prova de origem ↗</a> · <a href="${e(q.answerSource)}" target="_blank" rel="noopener noreferrer">Gabarito de origem ↗</a></p>`;
  function toast(text) { const el=document.querySelector('#toast'); el.textContent=text; clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.textContent='',6500); }
  function save() {
    try { localStorage.setItem(key,JSON.stringify(state)); }
    catch { volatile=true; toast('Armazenamento indisponível. Alterações duram apenas enquanto esta página estiver aberta.'); }
  }
  function go(route) { if(location.hash === '#'+route) render(); else location.hash = route; }
  function confirmAction(title,text,label,callback) {
    const d=document.querySelector('#confirm-dialog');
    document.querySelector('#dialog-title').textContent=title;
    document.querySelector('#dialog-text').textContent=text;
    document.querySelector('#dialog-ok').textContent=label;
    const oldFocus=document.activeElement;
    document.querySelector('#dialog-cancel').onclick=()=>{d.close();oldFocus?.focus();};
    document.querySelector('#dialog-ok').onclick=()=>{d.close();callback();};
    d.showModal();
  }
  function expire() {
    const a=active();
    if(a && a.deadline!==null && Date.now()>=a.deadline){ C.finish(a);save();return a; }
    return null;
  }
  function home() {
    const data=C.aggregate(state.attempts);
    return heading('SEU ESPAÇO DE APRENDIZADO','Um passo de cada vez.','Organize sua prática, compreenda as respostas e acompanhe sua evolução para o ENADE.')+
      `<section class="hero"><div class="hero-content"><p class="eyebrow" style="color:#d8ece3">PRÁTICA COM PROPÓSITO</p><h2>Transforme questões<br>em conhecimento.</h2><p>Encontre seu ponto de partida no banco de questões e escolha os temas que deseja revisar.</p>${button('#banco','Explorar questões <span aria-hidden="true">&nbsp;↗</span>')}</div><div class="hero-art" aria-hidden="true"><span class="art-book">e.</span></div></section>
      <section class="stats" aria-label="Resumo pessoal"><div class="stat"><div class="stat-top">Questões disponíveis <span class="stat-icon" aria-hidden="true">▤</span></div><strong>${published().length}</strong><small>No catálogo deste navegador</small></div><div class="stat"><div class="stat-top">Tentativas concluídas <span class="stat-icon" aria-hidden="true">✓</span></div><strong>${data.attempts}</strong><small>Práticas e simulados realizados</small></div><div class="stat"><div class="stat-top">Aproveitamento <span class="stat-icon" aria-hidden="true">↗</span></div><strong>${percent(data.percent)}</strong><small>${data.total ? data.correct+' acertos em '+data.total+' questões':'Disponível após sua primeira tentativa'}</small></div></section>
      <div class="grid-two"><section class="card"><div class="section-head"><h2>Seu percurso de estudo</h2><a href="#desempenho">Ver histórico</a></div>${active()?`<div class="notice">Você tem uma tentativa em andamento.</div>${button('#tentativa','Retomar tentativa')}`:data.attempts?history(3):blank('Seu percurso começa aqui','Depois de concluir uma prática ou um simulado, seus resultados aparecerão neste espaço.',button('#simulado','Preparar um simulado','secondary'))}</section><section class="card"><div class="section-head"><h2>Uma rotina que faz sentido</h2></div><ol class="steps"><li><span class="step-num">1</span><span><strong>Escolha um tema</strong><br>Localize questões pela área que quer estudar.</span></li><li><span class="step-num">2</span><span><strong>Pratique no seu ritmo</strong><br>Responda uma questão ou experimente o tempo de um simulado.</span></li><li><span class="step-num">3</span><span><strong>Revise para avançar</strong><br>Leia os comentários e observe os temas a retomar.</span></li></ol></section></div>`;
  }
  function filters() {
    const params=new URLSearchParams(location.hash.split('?')[1] || '');
    return `<form id="filters" class="filters">${[['year','Ano'],['course','Curso'],['component','Componente'],['theme','Tema']].map(([k,label])=>`<label>${label}<select name="${k}"><option value="">Todos</option>${[...new Set(published().map(q=>q[k]))].sort().map(v=>`<option ${String(v)===params.get(k)?'selected':''} value="${e(v)}">${e(v)}</option>`).join('')}</select></label>`).join('')}<div class="actions"><a href="#banco">Limpar filtros</a><button class="primary">Aplicar filtros</button></div></form>`;
  }
  function bank() {
    const params=new URLSearchParams(location.hash.split('?')[1] || '');
    const list=published().filter(q=>['year','course','component','theme'].every(k=>!params.get(k)||String(q[k])===params.get(k)));
    return heading('PRÁTICA','Banco de questões','Encontre questões com origem identificada. Combine os filtros para direcionar seu estudo.')+filters()+`<p class="muted">${list.length} questão(ões) encontrada(s)</p>`+(list.length?list.map(q=>`<article class="card question-card">${chips(q)}<h3>Questão ${e(q.number)} · ${e(q.theme)}</h3><p class="question-text">${e(q.statement.slice(0,210))}${q.statement.length>210?'…':''}</p><div class="actions">${button('#questao/'+q.id,'Responder questão')}${button('#discussao/'+q.id,'Discussão','secondary')}</div></article>`).join(''):blank('Nenhuma questão disponível','O banco começa vazio. Questões reais podem ser cadastradas na curadoria, com prova, gabarito e comentário revisado.',button('#materiais','Consultar fontes oficiais','secondary')));
  }
  function options(q,value,readonly=false) {
    return `<fieldset><legend>Selecione uma alternativa</legend>${q.options.map((text,i)=>`<label class="option"><input type="radio" name="alternative" value="${C.letters[i]}" ${value===C.letters[i]?'checked':''} ${readonly?'disabled':''}><strong>${C.letters[i]}</strong><span>${e(text)}</span></label>`).join('')}</fieldset>`;
  }
  function question(id) {
    const q=published().find(q=>q.id===id);
    if(!q)return missing();
    return heading('BANCO DE QUESTÕES','Pratique e compreenda.','Responda antes de consultar a correção. Seu resultado será registrado somente neste navegador.')+`<article class="card">${chips(q)}<h2>Questão ${e(q.number)}</h2><p class="question-text">${e(q.statement)}</p><form id="practice" data-id="${e(id)}">${options(q)}<p id="form-error" class="notice error" role="alert" hidden></p><div class="actions spaced"><button class="primary">Enviar resposta</button>${button('#banco','Voltar ao banco','secondary')}</div></form></article>`;
  }
  function setup() {
    if(active())return heading('SIMULADOS','Continue de onde parou.','Conclua a tentativa atual antes de iniciar uma nova.')+`<div class="card">${button('#tentativa','Retomar tentativa')}</div>`;
    return heading('SIMULADOS','Pratique com tempo definido.','Escolha um tema, a quantidade de questões e a duração. O prazo continua contando ao sair ou atualizar a página.')+`<section class="card"><h2>Preparar simulado</h2><p class="muted">${published().length} questão(ões) publicada(s) disponível(is).</p><form id="setup" class="form-grid"><label>Tema<select name="theme"><option value="">Todos os temas</option>${[...new Set(published().map(q=>q.theme))].map(t=>`<option>${e(t)}</option>`).join('')}</select></label><label>Quantidade de questões<input name="quantity" type="number" min="1" step="1" value="1" required></label><label>Duração em minutos<input name="minutes" type="number" min="1" max="240" step="1" value="30" required></label><div class="notice full no-margin">A correção ficará disponível após o encerramento. Questões não respondidas serão contadas como omissões.</div><p id="form-error" class="notice error full" role="alert" hidden></p><div class="actions full"><button class="primary" ${published().length?'':'disabled'}>Iniciar simulado</button>${button('#banco','Explorar questões','secondary')}</div></form></section>`;
  }
  function running() {
    const a=active(); if(!a)return heading('SIMULADOS','Nenhuma tentativa em andamento.','Você pode preparar um novo simulado a qualquer momento.')+button('#simulado','Preparar simulado');
    index=Math.min(index,a.questions.length-1);
    const q=a.questions[index];
    return heading('SIMULADO EM ANDAMENTO',`Questão ${index+1} de ${a.questions.length}`,'As respostas são salvas ao selecionar. Você pode revisá-las antes de encerrar.')+`<div class="card"><div class="section-head"><span class="muted">${Object.keys(a.answers).length} de ${a.questions.length} respondida(s)</span><span class="timer" id="timer" aria-label="Tempo restante"></span></div><div class="progress-nav" aria-label="Navegar entre questões">${a.questions.map((q,i)=>`<button data-step="${i}" class="${i===index?'current ':''}${a.answers[q.id]?'answered':''}" aria-label="Questão ${i+1}${a.answers[q.id]?', respondida':''}" ${i===index?'aria-current="step"':''}>${i+1}</button>`).join('')}</div>${chips(q)}<h2>Questão ${e(q.number)}</h2><p class="question-text">${e(q.statement)}</p><form id="running" data-id="${e(q.id)}">${options(q,a.answers[q.id])}</form><div class="actions spaced"><button class="secondary" data-step="${index-1}" ${index===0?'disabled':''}>Anterior</button><button class="secondary" data-step="${index+1}" ${index===a.questions.length-1?'disabled':''}>Próxima</button><button class="primary" id="finish">Encerrar simulado</button></div></div>`;
  }
  function result(id) {
    const a=completed().find(a=>a.id===id);if(!a)return missing();
    const s=C.score(a);
    return heading('CORREÇÃO E REVISÃO','Cada resposta é um aprendizado.',`Tentativa concluída em ${date(a.ended)} · Encerramento ${a.reason==='prazo'?'por prazo':'manual'}.`)+`<div class="stats"><div class="stat"><div class="stat-top">Aproveitamento</div><strong>${percent(s.percent)}</strong><small>${s.correct} acertos / ${s.total} questões</small></div><div class="stat"><div class="stat-top">Erros</div><strong>${s.wrong}</strong><small>Respostas diferentes do gabarito</small></div><div class="stat"><div class="stat-top">Omissões</div><strong>${s.blank}</strong><small>Questões sem resposta</small></div></div><p class="notice">Este percentual apoia o estudo e não equivale à nota oficial do ENADE.</p>`+a.questions.map((q,i)=>`<article class="card question-card">${chips(q)}<h2>${i+1}. Questão ${e(q.number)}</h2><p class="question-text">${e(q.statement)}</p>${q.options.map((text,i)=>`<div class="option ${q.correct===C.letters[i]?'correct':a.answers[q.id]===C.letters[i]?'wrong':''}"><strong>${C.letters[i]}</strong><span>${e(text)} ${q.correct===C.letters[i]?'<strong>· Gabarito</strong>':''}${a.answers[q.id]===C.letters[i]?'<strong> · Sua resposta</strong>':''}</span></div>`).join('')}<p>${a.answers[q.id]?'Sua resposta: '+e(a.answers[q.id]):'Você não respondeu esta questão.'}</p><h3>Comentário da curadoria</h3><p class="question-text">${e(q.comment)}</p>${source(q)}${button('#discussao/'+q.id,'Discutir esta questão','secondary')}</article>`).join('')+button('#desempenho','Ver meu desempenho');
  }
  function history(limit=Infinity) {
    return completed().slice().reverse().slice(0,limit).map(a=>{const s=C.score(a);return `<div class="row"><div><strong>${a.kind==='simulado'?'Simulado':'Prática individual'}</strong><p class="muted">${date(a.ended)} · ${s.total} questão(ões)</p></div><a href="#resultado/${e(a.id)}">${percent(s.percent)} · Revisar</a></div>`;}).join('');
  }
  function performance() {
    const data=C.aggregate(state.attempts);
    return heading('MEU DESEMPENHO','Observe seu caminho.','Indicadores calculados exclusivamente a partir das tentativas concluídas neste navegador.')+(data.attempts?`<div class="stats"><div class="stat"><div class="stat-top">Tentativas concluídas</div><strong>${data.attempts}</strong></div><div class="stat"><div class="stat-top">Questões respondidas ou omitidas</div><strong>${data.total}</strong></div><div class="stat"><div class="stat-top">Aproveitamento global</div><strong>${percent(data.percent)}</strong></div></div><section class="card"><h2>Desempenho por tema</h2>${Object.entries(data.themes).map(([t,v])=>`<div class="chart-row" aria-hidden="true"><span>${e(t)}</span><div class="bar"><span style="width:${100*v.correct/v.total}%"></span></div><strong>${percent(100*v.correct/v.total)}</strong></div>`).join('')}<div class="table-wrap"><table><caption class="muted">Acertos por tema, incluindo todas as questões das tentativas concluídas</caption><thead><tr><th>Tema</th><th>Acertos</th><th>Questões</th><th>Percentual</th></tr></thead><tbody>${Object.entries(data.themes).map(([t,v])=>`<tr><td>${e(t)}</td><td>${v.correct}</td><td>${v.total}</td><td>${percent(Math.round(v.correct*1000/v.total)/10)}</td></tr>`).join('')}</tbody></table></div></section><section class="card spaced"><h2>Histórico de tentativas</h2>${history()}</section>`:blank('Seu histórico ainda está vazio','Depois de concluir uma tentativa, você verá acertos e temas que merecem uma nova revisão.',button('#banco','Começar uma prática')));
  }
  function materials() {
    return heading('MATERIAIS E FONTES','Comece por uma fonte confiável.','Referências públicas consultadas para o projeto. Questões e comentários precisam de revisão antes de entrar no catálogo.')+`<div class="card"><h2>Fontes oficiais</h2><article class="ref-card"><span class="ref-icon" aria-hidden="true">↗</span><div><h3>Provas e gabaritos do ENADE</h3><p class="muted">Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira · Inep</p><a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enade/provas-e-gabaritos" target="_blank" rel="noopener noreferrer">Consultar catálogo oficial ↗</a></div></article><article class="ref-card"><span class="ref-icon" aria-hidden="true">↗</span><div><h3>Provas e gabaritos · edição 2021</h3><p class="muted">Inclui a área de Tecnologia em Análise e Desenvolvimento de Sistemas.</p><a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enade/provas-e-gabaritos/2021" target="_blank" rel="noopener noreferrer">Abrir página da edição ↗</a></div></article><div class="notice">A consulta à fonte não preenche o banco automaticamente. Confira enunciado, alternativas e gabarito, e registre um comentário revisado na curadoria.</div>${button('#catalogo','Acessar curadoria','secondary')}</div>`;
  }
  function access() {
    return heading('ACESSO E DADOS','Seu espaço neste navegador.','Avalie as telas sem fornecer senha, matrícula ou dados institucionais.')+`<section class="card"><h2>Contexto de avaliação</h2><p>Este protótipo não autentica pessoas. A seleção abaixo muda apenas as telas disponíveis para avaliar os fluxos. No produto especificado, sessão e autorização deverão ser verificadas no servidor.</p><form id="role-form"><label>Perfil de navegação<select name="role"><option value="estudante" ${state.role==='estudante'?'selected':''}>Estudante</option><option value="administrador" ${state.role==='administrador'?'selected':''}>Administrador do catálogo</option></select></label><div class="actions spaced"><button class="primary">Aplicar perfil</button><button type="button" class="secondary" id="exit">Sair do perfil administrativo</button></div></form></section><section class="card spaced"><h2>Armazenamento local</h2><p>Questões cadastradas, respostas, mensagens e resultados são guardados neste navegador quando ele permite. Não há sincronização entre dispositivos ou usuários. Não use um navegador compartilhado para guardar informações pessoais.</p><p class="muted">${volatile?'Armazenamento indisponível; dados mantidos apenas nesta página.':corrupt?'Os dados anteriores não puderam ser lidos. Exporte o armazenamento pelo navegador antes de substituir, se precisar preservá-los.':'Você pode apagar os registros locais a qualquer momento.'}</p><button id="erase" class="danger">Apagar todos os dados locais</button></section>`;
  }
  function adminGate() {
    return heading('CURADORIA','Acesso ao catálogo.','Escolha o perfil de administrador para avaliar esta parte da interface.')+blank('Perfil administrativo necessário','A seleção de perfil é um recurso de avaliação local. O produto deverá ter autorização real no servidor.',button('#acesso','Selecionar perfil','secondary'));
  }
  function catalog() {
    if(state.role!=='administrador')return adminGate();
    return heading('CURADORIA','Conteúdo com origem e contexto.','Cadastre uma questão real após conferir a fonte. Nenhum conteúdo é incluído automaticamente.')+`<section class="card"><h2>Cadastrar questão objetiva</h2><form id="question-form" class="form-grid"><label>Ano da prova<input type="number" name="year" min="2004" max="${new Date().getFullYear()}" required></label><label>Curso<input name="course" required maxlength="150"></label><label>Componente<select name="component"><option>Formação geral</option><option>Componente específico</option></select></label><label>Tema<input name="theme" required maxlength="120"></label><label>Número da questão na prova<input name="number" required maxlength="20"></label><label>URL HTTPS da prova<input name="source" type="url" required></label><label class="full">URL HTTPS do gabarito<input name="answerSource" type="url" required></label><label class="full">Enunciado conferido<textarea name="statement" required maxlength="20000"></textarea></label>${C.letters.map(l=>`<label class="full">Alternativa ${l}<textarea name="option${l}" required maxlength="5000"></textarea></label>`).join('')}<label>Alternativa correta<select name="correct">${C.letters.map(l=>`<option>${l}</option>`).join('')}</select></label><label class="full">Comentário pedagógico<textarea name="comment" required maxlength="10000"></textarea></label><label class="full check-label"><input type="checkbox" name="reviewed"><span>Conferi a prova e o gabarito, revisei o comentário e verifiquei as condições de uso do conteúdo. Publicar a questão.</span></label><p class="muted full no-margin">Sem essa confirmação, o conteúdo completo será salvo em rascunho e não entrará em práticas ou simulados.</p><p id="form-error" role="alert" class="notice error full" hidden></p><div class="actions full"><button class="primary">Salvar questão</button></div></form></section><section class="card spaced"><h2>Catálogo local · ${state.questions.length} registro(s)</h2>${state.questions.length?state.questions.map(q=>`<div class="row"><div><strong>Questão ${e(q.number)} · ${e(q.theme)}</strong><p class="muted">${e(q.year)} · ${e(q.course)} · ${q.status==='published'?'Publicada':q.status==='draft'?'Rascunho':'Arquivada'}</p></div><div class="actions">${q.status==='draft'?`<button class="secondary" data-publish="${e(q.id)}">Revisar e publicar</button>`:''}${q.status!=='archived'?`<button class="secondary" data-archive="${e(q.id)}">Arquivar</button>`:''}</div></div>`).join(''):blank('O catálogo está vazio','Use o formulário para registrar conteúdo conferido, sem dados de exemplo.')}</section>`;
  }
  function discussion(id) {
    const q=state.questions.find(q=>q.id===id) || state.attempts.flatMap(a=>a.questions).find(q=>q.id===id);
    if(!q)return missing();
    const messages=state.messages.filter(m=>m.question===id&&!m.hidden);
    return heading('DISCUSSÃO POR QUESTÃO',`Questão ${e(q.number)} · ${e(q.theme)}`,'Registre suas dúvidas e observações. Nesta avaliação, as mensagens não são compartilhadas com outras pessoas.')+`<div class="card">${messages.length?messages.map(m=>`<article class="row"><div><strong>Você · registro local</strong><p class="muted">${date(m.created)}</p><p class="question-text">${e(m.text)}</p></div><button class="secondary" data-report="${e(m.id)}">Denunciar</button></article>`).join(''):blank('A conversa ainda não começou','Nenhuma mensagem foi publicada para esta questão neste navegador.')}<form id="message-form" data-id="${e(id)}" class="spaced"><label>Sua mensagem<textarea name="text" required maxlength="2000"></textarea></label><button class="primary spaced">Publicar mensagem local</button></form></div>`;
  }
  function moderation() {
    if(state.role!=='administrador')return adminGate();
    return heading('MODERAÇÃO','Um espaço respeitoso para aprender.','Analise os registros locais de denúncia e justifique cada decisão.')+`<section class="card"><h2>Denúncias registradas</h2>${state.reports.length?state.reports.map(r=>{const m=state.messages.find(m=>m.id===r.message);return `<article class="row"><div><p class="question-text">${e(m?.text)}</p><p><strong>Motivo:</strong> ${e(r.reason)}</p><p class="muted">${r.decision?'Decisão: '+e(r.decision)+' · '+e(r.justification):'Análise pendente'}</p></div>${!r.decision?`<form class="moderate-form" data-id="${e(r.id)}"><label>Justificativa<input name="justification" required maxlength="500"></label><label>Decisão<select name="decision"><option value="ocultar">Ocultar mensagem</option><option value="manter">Manter mensagem</option></select></label><button class="secondary spaced">Registrar decisão</button></form>`:''}</article>`;}).join(''):blank('Nenhuma denúncia registrada','As denúncias feitas na discussão aparecerão aqui para análise.')}</section>`;
  }
  function missing(){return heading('NAVEGAÇÃO','Conteúdo não encontrado.','O registro pode ter sido removido deste navegador.')+button('#inicio','Voltar à visão geral');}
  function render() {
    const expired=expire();
    if(expired){go('resultado/'+expired.id);return;}
    const route=location.hash.slice(1).split('?')[0] || 'inicio';
    const [name,id]=route.split('/');
    const pages={inicio:home,banco:bank,questao:()=>question(id),simulado:setup,tentativa:running,resultado:()=>result(id),desempenho:performance,materiais:materials,acesso:access,catalogo:catalog,discussao:()=>discussion(id),moderacao:moderation};
    main.innerHTML=(corrupt?'<p class="notice error">Não foi possível ler o armazenamento anterior. Consulte Acesso e dados locais.</p>':'')+(pages[name] || missing)();
    document.querySelectorAll('.sidebar a').forEach(a=>a.classList.toggle('active',a.hash.slice(1)===name));
    document.querySelector('#breadcrumb').textContent=({'inicio':'Visão geral','banco':'Banco de questões','simulado':'Simulados','tentativa':'Simulado em andamento','resultado':'Correção comentada','desempenho':'Meu desempenho','materiais':'Materiais e fontes','acesso':'Acesso e dados','catalogo':'Curadoria','discussao':'Discussão','moderacao':'Moderação','questao':'Prática individual'})[name] || 'Espaço de estudo';
    document.title=document.querySelector('#breadcrumb').textContent+' · ENADE';
    main.focus({preventScroll:true});
    tick();
  }
  function formError(text){const el=document.querySelector('#form-error');el.hidden=false;el.textContent=text;}
  main.addEventListener('submit',event=>{
    event.preventDefault();const form=event.target;const data=new FormData(form);
    if(form.id==='filters'){go('banco?'+new URLSearchParams(data));return;}
    if(form.id==='role-form'){state.role=data.get('role');save();toast('Perfil de navegação atualizado.');go(state.role==='administrador'?'catalogo':'inicio');return;}
    if(form.id==='practice'){
      if(active()){formError('Conclua a tentativa em andamento antes de iniciar outra.');return;}
      if(!data.get('alternative')){formError('Selecione uma alternativa antes de enviar.');return;}
      const q=published().find(q=>q.id===form.dataset.id);if(!q)return;
      const a=C.createAttempt([q],1,1,'pratica',Date.now(),uuid());C.answer(a,q.id,data.get('alternative'));C.finish(a);state.attempts.push(a);save();go('resultado/'+a.id);return;
    }
    if(form.id==='setup'){
      if(active()){go('tentativa');return;}
      try{const qs=published().filter(q=>!data.get('theme')||q.theme===data.get('theme'));const a=C.createAttempt(qs,Number(data.get('quantity')),Number(data.get('minutes')),'simulado',Date.now(),uuid());state.attempts.push(a);index=0;save();go('tentativa');}catch(error){formError(error.message);}return;
    }
    if(form.id==='question-form'){
      if(state.role!=='administrador')return;
      const q={id:uuid(),year:Number(data.get('year')),course:data.get('course').trim(),component:data.get('component'),theme:data.get('theme').trim(),number:data.get('number').trim(),source:data.get('source').trim(),answerSource:data.get('answerSource').trim(),statement:data.get('statement').trim(),options:C.letters.map(l=>data.get('option'+l).trim()),correct:data.get('correct'),comment:data.get('comment').trim(),reviewed:data.has('reviewed'),status:data.has('reviewed')?'published':'draft',reviewedAt:data.has('reviewed')?Date.now():null};
      if(C.validateQuestion(q).length){formError('Confira os campos, as URLs HTTPS, o ano e cinco alternativas distintas.');return;}
      state.questions.push(q);save();render();toast(q.status==='published'?'Questão publicada no catálogo local.':'Questão salva em rascunho.');return;
    }
    if(form.id==='message-form'){
      const text=data.get('text').trim();if(!text||text.length>2000){toast('Escreva uma mensagem de 1 a 2000 caracteres.');return;}
      state.messages.push({id:uuid(),question:form.dataset.id,text,created:Date.now(),hidden:false});save();render();toast('Mensagem local registrada.');return;
    }
    if(form.classList.contains('moderate-form')){
      if(state.role!=='administrador')return;
      const r=state.reports.find(r=>r.id===form.dataset.id),justification=data.get('justification').trim();if(!r||!justification)return;
      r.decision=data.get('decision');r.justification=justification;r.decided=Date.now();r.by='perfil administrativo local';
      if(r.decision==='ocultar'){const m=state.messages.find(m=>m.id===r.message);if(m)m.hidden=true;}
      save();render();toast('Decisão registrada.');
    }
  });
  main.addEventListener('change',event=>{
    if(event.target.closest('#running')){
      const a=active();if(!a)return;
      if(!C.answer(a,event.target.closest('form').dataset.id,event.target.value)){const expired=expire();if(expired)go('resultado/'+expired.id);return;}
      save();document.querySelectorAll('[data-step]').forEach(b=>{const q=a.questions[Number(b.dataset.step)];if(q)b.classList.toggle('answered',!!a.answers[q.id]);});
    }
  });
  main.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-step')){index=Number(b.dataset.step);render();return;}
    if(b.id==='finish'){const a=active();if(a)confirmAction('Encerrar simulado?',`${a.questions.length-Object.keys(a.answers).length} questão(ões) sem resposta. Após encerrar, as respostas não poderão ser alteradas.`,'Encerrar',()=>{C.finish(a);save();go('resultado/'+a.id);});return;}
    if(b.id==='erase'){confirmAction('Apagar dados locais?','Questões, respostas, mensagens e resultados deste navegador serão apagados. Essa ação não pode ser desfeita.','Apagar dados',()=>{state=emptyState();corrupt=false;try{localStorage.removeItem(key);}catch{}go('inicio');toast('Dados locais apagados.');});return;}
    if(b.id==='exit'){state.role='estudante';save();go('inicio');return;}
    if(b.dataset.archive&&state.role==='administrador'){confirmAction('Arquivar questão?','A questão deixará de aparecer em novas tentativas. Resultados anteriores serão preservados.','Arquivar',()=>{state.questions.find(q=>q.id===b.dataset.archive).status='archived';save();render();});return;}
    if(b.dataset.publish&&state.role==='administrador'){
      const q=state.questions.find(q=>q.id===b.dataset.publish);
      confirmAction('Publicar questão revisada?','Confirme que você conferiu a prova e o gabarito, revisou o comentário e verificou as condições de uso do conteúdo.','Confirmar revisão e publicar',()=>{q.reviewed=true;q.reviewedAt=Date.now();q.status='published';save();render();});return;
    }
    if(b.dataset.report){
      const reason=window.prompt('Informe o motivo da denúncia:');if(!reason?.trim())return;
      state.reports.push({id:uuid(),message:b.dataset.report,reason:reason.trim().slice(0,500),created:Date.now(),decision:null});save();toast('Denúncia registrada para análise local.');
    }
  });
  function tick(){
    const expired=expire();if(expired){go('resultado/'+expired.id);return;}
    const a=active(),el=document.querySelector('#timer');
    if(a&&el){const seconds=Math.max(0,Math.ceil((a.deadline-Date.now())/1000));el.textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
  }
  window.addEventListener('hashchange',render);
  document.addEventListener('visibilitychange',tick);
  setInterval(tick,1000);
  render();
})();
