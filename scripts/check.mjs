import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "Requisitos/Artefatos/SistemaApoioENADE");
const require = createRequire(import.meta.url);
const proto = path.join(dir, "Prototipos");
const read = (name) => fs.readFile(path.join(dir, name), "utf8");
const C = require(path.join(dir, "Prototipos/core.js"));
const data = JSON.parse(
  await fs.readFile(path.join(dir, "catalogo.json"), "utf8"),
);
let checks = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  checks++;
};
const sets = Object.fromEntries(
  ["needs", "rf", "rules", "nfr", "cases"].map((k) => [
    k,
    new Set(data[k].map((r) => r[0])),
  ]),
);
for (const k of Object.keys(sets))
  check(sets[k].size === data[k].length, `IDs duplicados: ${k}`);
const valid = new Set(Object.values(sets).flatMap((s) => [...s]));
for (const [type, rows] of Object.entries(data))
  if (Array.isArray(rows))
    for (const row of rows) {
      for (const ref of JSON.stringify(row).matchAll(
        /\b(?:RF|RNF|RN|NEC|UC)-\d{2}\b/g,
      ))
        check(valid.has(ref[0]), `${type}: referência inexistente ${ref[0]}`);
    }
const ids = (text, type) => text.match(new RegExp("\\b" + type + "-\\d{2}\\b", "g")) || [];
const [vision, spec, requirements, backlog, matrix, model, app, seed] = await Promise.all([
  ...["DocumentoDeVisao.md", "CasosDeUso.md", "RequisitosFuncionais.md",
    "Backlog.md", "Rastreabilidade.md", "UML/CasosDeUso.puml", "Prototipos/app.js"].map(read),
  read("Prototipos/content.json").then(JSON.parse),
]);
const needStart = vision.indexOf("## 4. Necessidades");
const featureStart = vision.indexOf("## 5. Funcionalidades");
check(needStart >= 0 && featureStart > needStart, "Necessidades devem preceder funcionalidades na Visão");
const features = vision.slice(featureStart, vision.indexOf("### 5.3"));
const caseHeadings = [...spec.matchAll(/^## (UC-\d{2}) — (.+)$/gm)];
const caseShapes = [...model.matchAll(/^\s*usecase "(UC-\d{2}) · ([^"]+)"/gm)];
check(caseHeadings.length === data.cases.length, "Número de casos da especificação diverge do catálogo");
check(caseShapes.length === data.cases.length, "Número de casos do diagrama diverge do catálogo");
const associations = new Set([...model.matchAll(/^([A-Z][0-9]*) -- ([A-Z][0-9]*)$/gm)]
  .map((m) => [m[1], m[2]].sort().join("-")));
for (const [id, title, , needs, cases, rules] of data.rf) {
  check(ids(features, "RF").includes(id), id + " ausente das funcionalidades da Visão");
  check(requirements.includes("## " + id + " — " + title), id + " diverge do catálogo de RF");
  check(backlog.includes(id + " / " + cases + " |"), id + " diverge do backlog");
  const row = matrix.split(/\r?\n/).find((line) => line.startsWith("| " + id + " |"));
  check(row?.startsWith("| " + [id, needs, cases, rules, "PB-" + id.slice(3)].join(" | ") + " | "),
    id + " tem vínculos divergentes na matriz");
  check(row?.includes("Prototipos/index.html#"), id + " sem link de tela");
  const caseIds = ids(cases, "UC");
  check(caseIds.length > 0, id + " sem caso de uso");
  for (const caseId of caseIds)
    check(data.cases.some((c) => c[0] === caseId && ids(c[7], "RF").includes(id)),
      id + " sem referência recíproca em " + caseId);
  for (const need of ids(needs, "NEC"))
    check(data.needs.some((n) => n[0] === need && ids(n[3], "RF").includes(id)),
      id + " sem referência recíproca em " + need);
}
for (const [id, , , coverage] of data.needs) {
  check(vision.slice(needStart, featureStart).includes("| " + id + " |"),
    id + " ausente da seção de necessidades");
  check(ids(coverage, "RF").length + ids(coverage, "RNF").length > 0, id + " sem cobertura");
  for (const rfId of ids(coverage, "RF"))
    check(data.rf.some((r) => r[0] === rfId && ids(r[3], "NEC").includes(id)),
      id + " sem referência recíproca em " + rfId);
}
for (const [id, title, actor, , , , , coverage] of data.cases) {
  check(caseHeadings.filter((m) => m[1] === id && m[2].trim() === title).length === 1,
    id + " ausente, duplicado ou divergente na especificação");
  check(caseShapes.filter((m) => m[1] === id && m[2] === title).length === 1,
    id + " ausente, duplicado ou divergente no PlantUML");
  for (const [role, endpoint] of [["Estudante", "E"], ["Administrador", "A"]])
    check(actor.includes(role) === associations.has([endpoint, "U" + id.slice(3)].sort().join("-")),
      id + " diverge do ator " + role);
  const rfIds = ids(coverage, "RF");
  check(rfIds.length > 0, id + " sem requisito");
  for (const rfId of rfIds)
    check(data.rf.some((r) => r[0] === rfId && ids(r[4], "UC").includes(id)),
      id + " sem referência recíproca em " + rfId);
}
const routeTable = app.match(/const pages = \{([\s\S]*?)\};/)?.[1] || "";
const routes = new Set([...routeTable.matchAll(/^\s*"?([\w-]+)"?:/gm)].map((m) => m[1]));
async function walk(folder) {
  const entries = await fs.readdir(folder, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((x) =>
        x.isDirectory()
          ? walk(path.join(folder, x.name))
          : path.join(folder, x.name),
      ),
    )
  ).flat();
}
const files = await walk(dir);
for (const file of [
  path.join(root, "README.md"),
  ...files.filter(
    (f) =>
      f.endsWith(".md") && !f.includes(path.sep + "Referencias" + path.sep),
  ),
]) {
  const content = await fs.readFile(file, "utf8");
  for (const [, target] of content.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(?:https?:|mailto:)/.test(target)) continue;
    const [relative, fragment] = target.split("#", 2);
    const location = path.resolve(
      path.dirname(file),
      decodeURIComponent(relative) || path.basename(file),
    );
    check(
      await fs.stat(location).then(
        () => true,
        () => false,
      ),
      `Link inexistente: ${path.relative(root, file)} -> ${target}`,
    );
    if (location === path.join(proto, "index.html") && fragment) {
      const [route, parameter] = fragment.split("/");
      check(routes.has(route), "Rota inexistente: " + fragment);
      if (route === "questao")
        check(seed.questions.some((q) => q.id === parameter), "Questão inexistente: " + parameter);
      if (route === "admin")
        check(["questoes", "materiais"].includes(parameter), "Área de curadoria inexistente: " + fragment);
    }
    if (location.endsWith(".md") && fragment) {
      const headings = [...(await fs.readFile(location, "utf8")).matchAll(/^#{1,6}\s+(.+)$/gm)]
        .map((m) => m[1].toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu, "").trim().replaceAll(" ", "-"));
      check(headings.includes(decodeURIComponent(fragment)), "Seção inexistente: " + target);
    }
  }
  for (const ref of content.matchAll(/\b(?:RF|RNF|RN|NEC|UC)-\d{2}\b/g))
    check(valid.has(ref[0]), `Referência inválida em ${file}: ${ref[0]}`);
}
for (const diagram of [
  "CasosDeUso",
  "Componentes",
  "Implantacao",
  "ImplantacaoProposta",
  "Classes",
  "Sequencia",
  "SequenciaMateriais",
  "Atividades",
  "AtividadesMateriais",
]) {
  const svg = await fs.readFile(
    path.join(dir, "UML", diagram + ".svg"),
    "utf8",
  );
  check(
    svg.includes("<svg") && !/Syntax Error|An error has occurred/i.test(svg),
    `Renderização inválida: ${diagram}`,
  );
  if (diagram === "CasosDeUso")
    for (const [id, title] of data.cases)
      check(svg.includes(id + " · " + title), id + " ausente ou divergente no SVG");
}
// Dados mínimos de ensaio, em memória. Não são cadastrados no protótipo distribuído.
const q = {
  id: "q",
  year: 2021,
  course: "Área de ensaio",
  component: "Componente específico",
  theme: "Tema de ensaio",
  number: "1",
  source: "https://www.gov.br/inep/",
  answerSource: "https://www.gov.br/inep/",
  statement: "Ensaio de integridade",
  options: ["1", "2", "3", "4", "5"],
  correct: "A",
  comment: "Ensaio de validação técnica",
  status: "published",
  reviewed: true,
};
check(C.validateQuestion(q).length === 0, "Questão válida rejeitada");
check(
  C.validateQuestion({ ...q, options: ["1", "1", "3", "4", "5"] }).includes(
    "options",
  ),
  "Alternativas duplicadas aceitas",
);
check(
  C.validateQuestion({ ...q, source: "javascript:alert(1)" }).includes(
    "source",
  ),
  "Origem insegura aceita",
);
check(
  C.validateQuestion({ ...q, reviewed: false }).includes("reviewed"),
  "Publicação sem revisão aceita",
);
assert.throws(() => C.createAttempt([q], 2, 1));
checks++;
assert.throws(() => C.createAttempt([q], 1, 0));
checks++;
const a = C.createAttempt([q], 1, 1, "simulado", 1000, "t1");
q.correct = "B";
check(a.questions[0].correct === "A", "Tentativa não preserva fotografia");
check(!C.answer(a, "outra", "A", 1500), "Questão estranha aceita");
check(C.answer(a, "q", "A", 1500), "Resposta em prazo rejeitada");
check(!C.answer(a, "q", "B", 61000), "Resposta após prazo aceita");
C.finish(a, 62000);
check(a.reason === "prazo" && a.ended === 61000, "Prazo não respeitado");
C.finish(a, 90000);
check(a.ended === 61000, "Encerramento não idempotente");
check(!C.answer(a, "q", "B", 62000), "Tentativa encerrada alterável");
const s = C.score(a);
check(
  s.correct === 1 && s.percent === 100 && s.blank === 0,
  "Correção incorreta",
);
const b = C.createAttempt([q], 1, 1, "pratica", 1000, "t2");
C.finish(b, 2000);
check(C.score(b).blank === 1, "Omissão incorreta");
const open = C.createAttempt([q], 1, 1, "simulado", 1000, "t3");
check(
  C.aggregate([a, b, open]).attempts === 2,
  "Tentativa aberta entrou na estatística",
);
check(
  C.aggregate([a, b]).percent === 50,
  "Agregação usa denominador incorreto",
);
check(C.aggregate([]).percent === null, "Ausência de dados virou nota");
check(
  C.score({
    questions: [{ id: "x", theme: "__proto__", correct: "A" }],
    answers: { x: "A" },
  }).correct === 1,
  "Tema especial altera cálculo",
);
// Conteúdo publicado, filtros e manutenção introduzidos na versão 3.
const bootstrap = (await fs.readFile(path.join(proto, "content.js"), "utf8"))
  .replace(/^.*?window\.EnadeSeed\s*=\s*/s, "")
  .replace(/;\s*$/, "");
check(
  JSON.stringify(JSON.parse(bootstrap)) === JSON.stringify(seed),
  "content.js diverge de content.json; execute scripts/build-content.mjs",
);
check(
  seed.questions.length === 8 &&
    seed.questions.filter((q) => q.component === "Formação geral").length === 3,
  "Seleção documental inicial alterada sem atualizar a verificação",
);
check(
  new Set(seed.questions.map((q) => q.id)).size === seed.questions.length,
  "IDs de questões duplicados",
);
for (const item of seed.questions) {
  check(
    !C.validateQuestion(item).length,
    "Questão inicial inválida: " + item.id,
  );
  check(
    item.adapted === true &&
      item.adaptationNote &&
      item.commentAttribution &&
      item.reviewType && item.reviewed === true &&
      new URL(item.source).hash === "#page=" + item.originalPage,
    "Proveniência incompleta: " + item.id,
  );
  check(
    new URL(item.source).hostname === "download.inep.gov.br" &&
      new URL(item.answerSource).hostname === "download.inep.gov.br",
    "Fonte inicial não oficial",
  );
  check(
    /^[a-f0-9]{64}$/.test(item.sourceSha256) &&
      /^[a-f0-9]{64}$/.test(item.answerSourceSha256),
    "Hash de conferência inválido",
  );
}
for (const item of seed.materials)
  check(!C.validateMaterial(item).length, "Material inicial inválido");
const first = seed.questions[0];
check(
  C.filterQuestions(seed.questions, {
    year: first.year,
    course: first.course,
    component: first.component,
    theme: first.theme,
    search: first.title.toUpperCase(),
  }).length === 1,
  "Filtros combinados divergem do catálogo",
);
check(
  C.filterQuestions(seed.questions, { year: 2017, theme: "Modelagem UML" })
    .length === 0,
  "Combinação sem correspondência não vazia",
);
check(
  C.filterQuestions(seed.questions, { search: "REQUISITO" }).some(
    (q) => q.id === first.id,
  ),
  "Busca ignora termo presente ou caixa",
);
check(
  !C.filterQuestions([
    { ...first, status: "draft" },
    { ...first, id: "archived", status: "archived" },
  ]).length,
  "Conteúdo não publicado consultável",
);
const revision = C.reviseQuestion(first, {
  title: first.title + " — revisão técnica",
});
check(
  revision.version === first.version + 1 && revision.id === first.id,
  "Edição não preserva identidade/versão",
);
check(
  first.version === 1 && revision !== first,
  "Edição altera o objeto anterior",
);
assert.throws(() => C.reviseQuestion(first, { correct: "F" }));
checks++;
check(
  C.validateMaterial({
    ...seed.materials[0],
    url: "http://example.org",
  }).includes("url"),
  "Material HTTP aceito",
);
check(
  C.validateMaterial({ ...seed.materials[0], title: " " }).includes("title"),
  "Material sem título aceito",
);
check(
  C.validateMaterial({ ...seed.materials[0], status: "draft" }).includes(
    "status",
  ),
  "Situação desconhecida de material aceita",
);
check(!C.filterQuestions(seed.questions, {
  component: "Formação geral", search: first.title,
}).length, "Busca por título ignorou o filtro de componente");
const attachment = { id: "file", name: "Guia.pdf", type: "application/pdf", size: 100 };
const material = { ...seed.materials[0], url: undefined, attachment };
check(!C.validateMaterial(material).length, "Anexo compatível rejeitado");
check(C.validateMaterial({ ...material, url: seed.materials[0].url }).includes("attachment"),
  "Material com duas origens aceito");
for (const changes of [
  { name: "../Guia.pdf" }, { name: "Guia.exe" }, { type: "image/png" },
  { size: 0 }, { size: C.attachmentLimit + 1 },
])
  check(C.validateMaterial({ ...material, attachment: { ...attachment, ...changes } }).includes("attachment"),
    "Anexo inválido aceito: " + JSON.stringify(changes));
check(
  !C.validDocument(Buffer.from("%PDF-1.7\n%%EOF"), C.attachmentTypes.pdf),
  "PDF sem estrutura foi aceito",
);
check(
  !C.validDocument(Buffer.from([0x50, 0x4b, 3, 4, 0, 0]), C.attachmentTypes.docx),
  "Arquivo ZIP sem estrutura do Office foi aceito",
);
console.log(
  `${checks} verificações concluídas: referências, links, cobertura, SVG, cálculo, prazo, histórico, filtros, versões, materiais e proveniência.`,
);
