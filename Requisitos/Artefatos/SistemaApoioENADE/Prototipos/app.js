/* ENADE v3 — protótipo acadêmico. Dados e autenticação de avaliação ficam no navegador. */
(() => {
  "use strict";
  const C = window.EnadeCore,
    seed = window.EnadeSeed;
  const key = "enade.grupo2.v3",
    sessionKey = "enade.grupo2.session.v3";
  const main = document.querySelector("main");
  const paths = {
    home: "M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9",
    book: "M4 4h7a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4zM14 7a3 3 0 0 1 3-3h4v14h-3a4 4 0 0 0-4 3",
    clock:
      "M12 8v5l3 2M9 2h6M12 2v3M19 5l2 2M21 13a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
    chart: "M4 20V4M4 20h17M8 16l4-5 4 2 5-8",
    file: "M14 3H5v18h14V8zM14 3v6h5M8 13h8M8 17h6",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6",
    arrow: "M5 12h14M14 7l5 5-5 5",
    external: "M14 3h7v7M21 3 10 14M11 3H3v18h18v-8",
    search: "M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    chevron: "m8 10 4 4 4-4",
    check: "m5 12 4 4L19 6",
    plus: "M12 4v16M4 12h16",
    edit: "m16 3 5 5-12 12-6 1 1-6zM14 5l5 5",
    archive: "M3 4h18v5H3zM5 9v12h14V9M9 13h6",
    user: "M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-3a8 8 0 0 1 16 0v3",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    lock: "M6 10h12v11H6zM8 10V6a4 4 0 0 1 8 0v4M12 14v3",
    chat: "M3 4h18v13H8l-5 4zM7 9h10M7 13h7",
    logout: "M9 3H3v18h6M9 12h12M17 8l4 4-4 4",
    leaf: "M4 20 17 7M3 14C3 5 13 2 21 3c1 10-3 17-11 17-4 0-7-2-7-6",
    info: "M12 11v6M12 7v.1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    star: "m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z",
  };
  const icon = (name) =>
    `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="${paths[name] || paths.file}"/></svg>`;
  const e = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const uuid = () => crypto.randomUUID();
  const fresh = () => ({
    version: 3,
    questions: structuredClone(seed.questions),
    materials: structuredClone(seed.materials),
    accounts: [],
    attempts: [],
    messages: [],
    reports: [],
  });
  let state = fresh(),
    storageError = false,
    index = 0,
    userId = "guest",
    curator = false,
    lastRoute = "";
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const loaded = JSON.parse(raw);
      if (
        loaded.version !== 3 ||
        ![
          "questions",
          "materials",
          "accounts",
          "attempts",
          "messages",
          "reports",
        ].every((k) => Array.isArray(loaded[k])) ||
        loaded.questions.some((q) => C.validateQuestion(q).length) ||
        loaded.materials.some((m) => C.validateMaterial(m).length)
      )
        throw Error("Estrutura incompatível.");
      state = loaded;
    } else {
      const old = JSON.parse(localStorage.getItem("enade.grupo2.v2") || "null");
      if (
        old &&
        Array.isArray(old.questions) &&
        old.questions.every((q) => !C.validateQuestion(q).length)
      ) {
        for (const q of old.questions)
          if (!state.questions.some((s) => s.id === q.id))
            state.questions.push({ ...q, version: q.version || 1 });
        state.attempts = (old.attempts || []).map((a) => ({
          ...a,
          owner: "guest",
        }));
        state.messages = (old.messages || []).map((m) => ({
          ...m,
          owner: "guest",
          author: "Visitante local",
        }));
        state.reports = old.reports || [];
      }
    }
    const session = JSON.parse(sessionStorage.getItem(sessionKey) || "null");
    if (session) {
      userId = state.accounts.some((a) => a.id === session.userId)
        ? session.userId
        : "guest";
      curator = session.curator === true;
    }
  } catch {
    storageError = true;
  }
  const account = () => state.accounts.find((a) => a.id === userId);
  const ownAttempts = () =>
    state.attempts.filter((a) => (a.owner || "guest") === userId);
  const active = () => ownAttempts().find((a) => a.ended === null);
  const completed = () => ownAttempts().filter((a) => a.ended !== null);
  const published = () =>
    state.questions.filter((q) => q.status === "published");
  const date = (stamp) =>
    new Date(stamp).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  const pct = (n) =>
    n === null
      ? "—"
      : n.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";
  const shortCourse = (course) =>
    course.includes("Análise") ? "Análise e Desenv. de Sistemas" : course;
  const link = (route, text, kind = "primary", ico = "") =>
    `<a class="${kind}" href="#${route}">${text}${ico ? icon(ico) : ""}</a>`;
  const external = (url, text, kind = "text-link") =>
    `<a class="${kind}" href="${e(url)}" target="_blank" rel="noopener noreferrer">${text}${icon("external")}</a>`;
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      return true;
    } catch {
      storageError = true;
      toast(
        "Não foi possível salvar no navegador. Mantenha esta página aberta para não perder as alterações.",
      );
      return false;
    }
  }
  function saveSession() {
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify({ userId, curator }));
    } catch {
      toast("A sessão ficará ativa apenas nesta página.");
    }
  }
  function toast(text) {
    const box = document.querySelector("#toast");
    box.textContent = text;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => (box.textContent = ""), 6500);
  }
  function go(route) {
    if (location.hash === "#" + route) render();
    else location.hash = route;
  }
  function head(eyebrow, title, description, action = "") {
    return `<div class="page-head"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="intro">${description}</p></div>${action || `<span class="tag">${icon("leaf")} Aprendizado contínuo</span>`}</div>`;
  }
  function empty(title, text, action = "", ico = "book") {
    return `<div class="empty"><span class="empty-icon">${icon(ico)}</span><h3>${title}</h3><p>${text}</p>${action}</div>`;
  }
  function metric(label, value, detail, ico, accent = false) {
    return `<div class="metric"><div class="metric-label">${label}<span class="metric-icon ${accent ? "accent" : ""}">${icon(ico)}</span></div><strong>${value}</strong><small>${detail}</small></div>`;
  }
  function meta(q) {
    return `<div class="question-meta"><span class="chip">ENADE ${q.year}</span><span class="chip neutral">${e(shortCourse(q.course))}</span><span class="chip accent">${e(q.theme)}</span></div>`;
  }
  function adaptation(q) {
    return q.adapted
      ? `<div class="question-description">${icon("info")} Adaptação textual de questão real. Número e gabarito preservados. ${external(q.source, "Consultar o original")}</div>`
      : "";
  }
  function questionInfo(q) {
    return `<aside class="info-stack"><section class="info-card"><p class="overline">SOBRE A QUESTÃO</p><dl class="info-list"><div><dt>Edição</dt><dd>ENADE ${q.year}</dd></div><div><dt>Área</dt><dd>${e(q.course)}</dd></div><div><dt>Componente</dt><dd>${e(q.component)}</dd></div><div><dt>Questão original</dt><dd>${e(q.number)}</dd></div><div><dt>Versão local</dt><dd>${q.version || 1}</dd></div></dl>${external(q.source, "Abrir prova oficial")}${external(q.answerSource, "Abrir gabarito oficial")}</section><section class="info-card"><h3>Pratique. Revise. Compreenda.</h3><p class="info-note">A correção aparece depois da resposta ou do encerramento do simulado. Aproveite o comentário para revisar o raciocínio.</p><small>Comentários: análise técnica do projeto. Revisão pedagógica externa pendente.</small></section></aside>`;
  }
  function dialog(title, text, confirmLabel, callback, danger = false) {
    const d = document.querySelector("#dialog");
    document.querySelector("#dialog-body").innerHTML =
      `<div class="dialog-symbol">${icon(danger ? "archive" : "info")}</div><h2 id="dialog-title">${title}</h2><p>${text}</p><div class="actions"><button class="secondary" id="dialog-cancel">Cancelar</button><button class="${danger ? "danger" : "primary"}" id="dialog-ok">${confirmLabel}</button></div>`;
    const oldFocus = document.activeElement;
    document.querySelector("#dialog-cancel").onclick = () => {
      d.close();
      oldFocus?.focus();
    };
    document.querySelector("#dialog-ok").onclick = () => {
      d.close();
      callback();
    };
    d.showModal();
  }
  function expire() {
    const a = active();
    if (a && a.deadline !== null && Date.now() >= a.deadline) {
      C.finish(a);
      save();
      return a;
    }
    return null;
  }
  function history(limit = Infinity) {
    return completed()
      .slice()
      .sort((a, b) => b.ended - a.ended)
      .slice(0, limit)
      .map((a) => {
        const s = C.score(a);
        return `<div class="history-row"><span class="history-icon">${icon(a.kind === "simulado" ? "clock" : "book")}</span><div class="history-info"><strong>${a.kind === "simulado" ? "Simulado cronometrado" : "Prática individual"}</strong><small>${date(a.ended)} · ${s.total} questão(ões)</small></div><a class="history-result text-link" href="#resultado/${a.id}">${pct(s.percent)}<small>Revisar ${icon("arrow")}</small></a></div>`;
      })
      .join("");
  }
  function home() {
    const data = C.aggregate(ownAttempts()),
      name = account()?.name.split(" ")[0];
    return (
      head(
        "SEU ESPAÇO DE APRENDIZADO",
        name
          ? `Que bom ter você aqui, ${e(name)}.`
          : "Um bom caminho começa aqui.",
        "Pratique com propósito, compreenda as respostas e construa sua preparação para o ENADE.",
      ) +
      `<section class="hero"><div class="hero-copy"><p class="eyebrow">CONHECIMENTO QUE SE CONSTRÓI</p><h2>Seu próximo acerto<br>começa <em>aqui.</em></h2><p>Questões com origem identificada, prática no seu ritmo e um novo olhar sobre o que você aprende.</p><div class="actions">${link("banco", "Começar a praticar", "primary accent", "arrow")}${link("simulado", "Preparar um simulado", "text-link", "clock")}</div></div><div class="hero-visual" aria-hidden="true"><div class="study-sheet"><div class="sheet-head">SEU ESPAÇO DE ESTUDO<span>ENADE</span></div><div class="sheet-line"></div><div class="sheet-line"></div><div class="sheet-line short"></div><div class="sheet-option"><span></span><i></i></div><div class="sheet-option checked"><span>✓</span><i></i></div><div class="sheet-option"><span></span><i></i></div><div class="sheet-option"><span></span><i></i></div><span class="sheet-seal">↗</span></div></div></section>
      <section class="metrics" aria-label="Resumo do espaço de estudo">${metric("Questões para praticar", published().length, "Questões de origem identificada", "book")}${metric("Temas disponíveis", new Set(published().map((q) => q.theme)).size, "Escolha seu ponto de partida", "grid")}${metric("Tentativas concluídas", data.attempts, "Seu histórico neste navegador", "check")}${metric("Seu aproveitamento", pct(data.percent), data.total ? `${data.correct} acertos em ${data.total} questões` : "Disponível após a primeira tentativa", "chart", true)}</section>
      <div class="dashboard-grid"><div><section class="card"><div class="section-head"><div><h2>Seu percurso de estudo</h2><p>Pequenos passos, novas descobertas.</p></div>${link("desempenho", "Ver histórico", "text-link", "arrow")}</div>${active() ? `<div class="notice">Há uma tentativa em andamento. Seu prazo original continua valendo.</div>${link("tentativa", "Retomar tentativa", "primary", "arrow")}` : data.attempts ? history(3) : empty("Seu percurso começa na primeira questão", "Quando você concluir uma prática ou um simulado, seus resultados e temas de revisão aparecerão aqui.", link("banco", "Explorar o banco de questões", "secondary", "arrow"), "chart")}</section><div class="quick-paths"><a href="#banco" class="path-card">${icon("book")}<span class="path-arrow">↗</span><strong>Uma questão de cada vez</strong><small>Escolha um tema e descubra o raciocínio por trás da resposta.</small></a><a href="#simulado" class="path-card">${icon("clock")}<span class="path-arrow">↗</span><strong>Seu ritmo, seu desafio</strong><small>Defina o tempo e experimente um simulado com foco.</small></a></div></div><div><section class="card"><div class="section-head"><div><h2>Fontes que você pode conferir</h2><p>Origem clara para estudar com contexto.</p></div></div>${state.materials
        .filter((m) => m.status === "published")
        .slice(0, 2)
        .map(
          (m) =>
            `<article class="source-card"><span class="source-badge">INEP</span><div><h3>${e(m.title)}</h3><p>${e(m.description.slice(0, 115))}</p>${external(m.url, "Consultar fonte")}</div></article>`,
        )
        .join(
          "",
        )}${link("materiais", "Ver todos os materiais", "text-link", "arrow")}</section><section class="mini-guide">${icon("leaf")}<div><strong>Compreender vale mais que decorar.</strong><p>Leia os comentários, confira a fonte e retome os temas que pedem atenção. Seu resultado é um ponto de partida.</p></div></section></div></div>`
    );
  }
  function filterFields(filters = {}) {
    return [
      ["year", "Ano"],
      ["course", "Curso"],
      ["component", "Componente"],
      ["theme", "Tema"],
    ]
      .map(
        ([key, label]) =>
          `<label>${label}<select name="${key}"><option value="">${key === "course" ? "Todos os cursos" : key === "year" ? "Todos os anos" : key === "component" ? "Todos os componentes" : "Todos os temas"}</option>${[
            ...new Set(published().map((q) => String(q[key]))),
          ]
            .sort()
            .map(
              (v) =>
                `<option value="${e(v)}" ${String(filters[key]) === v ? "selected" : ""}>${e(v)}</option>`,
            )
            .join("")}</select></label>`,
      )
      .join("");
  }
  function bank() {
    const filters = Object.fromEntries(
      new URLSearchParams(location.hash.split("?")[1] || ""),
    );
    const list = C.filterQuestions(state.questions, filters);
    return (
      head(
        "PRÁTICA COM PROPÓSITO",
        "Banco de questões",
        "Encontre seu próximo desafio. Todas as questões da seleção inicial remetem a provas e gabaritos oficiais.",
      ) +
      `<form id="filters" class="filter-panel"><div class="search-bar">${icon("search")}<input type="search" name="search" aria-label="Buscar por tema ou palavra-chave" placeholder="Busque por tema, palavra-chave ou número da questão" value="${e(filters.search || "")}"></div><div class="filter-grid">${filterFields(filters)}</div><div class="filter-footer"><span>Combine os filtros para direcionar sua prática.</span><div class="actions">${link("banco", "Limpar filtros", "text-link")}<button class="primary">Aplicar filtros ${icon("search")}</button></div></div></form><div class="results-head"><strong>${list.length} questão(ões) encontrada(s)</strong><span class="muted">Origem identificada · Gabarito conferido</span></div>` +
      (list.length
        ? list
            .map(
              (q) =>
                `<article class="question-card">${meta(q)}<h2>${e(q.title || q.theme)}</h2><p>${e(q.statement.slice(0, 230))}${q.statement.length > 230 ? "…" : ""}</p><div class="question-footer"><small>Questão ${e(q.number)} · ${q.adapted ? "Adaptação textual de prova real" : "Conteúdo cadastrado na curadoria"}</small><div class="actions">${external(q.source, "Ver fonte")}${link("questao/" + q.id, "Responder questão", "primary", "arrow")}</div></div></article>`,
            )
            .join("")
        : empty(
            "Nenhuma questão com esses filtros",
            "Tente combinar outros critérios ou limpar os filtros para voltar ao banco completo.",
            link("banco", "Limpar filtros", "secondary"),
          ))
    );
  }
  function options(q, selected) {
    return `<fieldset class="fieldset"><legend>Selecione uma alternativa</legend>${q.options.map((text, i) => `<label class="option"><input type="radio" name="alternative" value="${C.letters[i]}" ${selected === C.letters[i] ? "checked" : ""}><span class="option-letter">${C.letters[i]}</span><span>${e(text)}</span></label>`).join("")}</fieldset>`;
  }
  function practice(id) {
    const q = published().find((q) => q.id === id);
    if (!q) return missing();
    return (
      head(
        "PRÁTICA INDIVIDUAL",
        e(q.title || "Uma questão, um novo olhar."),
        "Pense no raciocínio antes de confirmar. Você poderá consultar a correção depois do envio.",
      ) +
      `<div class="two-column"><section class="card question-detail">${meta(q)}<h2>Questão ${e(q.number)}</h2><p class="question-text">${e(q.statement)}</p>${adaptation(q)}<form id="practice" data-id="${q.id}">${options(q)}<p id="form-error" class="form-error notice error" role="alert"></p><div class="form-actions">${link("banco", "Voltar ao banco", "text-link")}<button class="primary">Confirmar resposta ${icon("arrow")}</button></div></form></section>${questionInfo(q)}</div>`
    );
  }
  function setup() {
    if (active())
      return (
        head(
          "SIMULADOS",
          "Seu desafio está em andamento.",
          "Retome a tentativa atual antes de começar outra.",
        ) +
        `<section class="card">${link("tentativa", "Retomar tentativa", "primary", "arrow")}</section>`
      );
    return (
      head(
        "FOCO NO SEU TEMPO",
        "Prepare seu próximo desafio.",
        "Escolha o conteúdo e defina um ritmo. O prazo não reinicia ao sair ou atualizar a página.",
      ) +
      `<div class="two-column"><section class="card"><form id="setup"><div class="form-section"><div class="form-section-title"><span class="step-badge">1</span> O que você quer praticar?</div><div class="filter-grid">${filterFields()}</div></div><div class="form-section"><div class="form-section-title"><span class="step-badge">2</span> Como será seu desafio?</div><div class="form-grid"><label>Quantidade de questões<input name="quantity" type="number" min="1" max="${published().length}" step="1" value="${Math.min(5, published().length)}" required><span class="form-help" id="quantity-help">Até ${published().length} questões disponíveis.</span></label><label>Duração em minutos<input name="minutes" type="number" min="1" max="240" step="1" value="30" required><span class="duration-options"><button type="button" data-minutes="15">15 min</button><button type="button" data-minutes="30">30 min</button><button type="button" data-minutes="60">60 min</button></span></label></div></div><div class="notice">${icon("clock")} Depois de iniciar, o tempo continua contando. Questões sem resposta são consideradas omissões, e a correção é liberada ao encerrar.</div><p class="form-error notice error" id="form-error" role="alert"></p><div class="form-actions"><span class="form-help">O desafio usa somente as questões dos filtros escolhidos.</span><button class="primary" id="start-exam">Iniciar simulado ${icon("arrow")}</button></div></form></section><aside class="info-stack"><section class="info-card"><p class="overline">SEU RECORTE DE ESTUDO</p><div class="match-count" id="match-count">${published().length}<small>questões disponíveis</small></div><div class="topic-list" id="match-topics">${topicCounts(published())}</div></section><section class="info-card"><h3>Uma experiência de estudo.</h3><p class="info-note">O percentual de acertos ajuda na sua revisão e não equivale à nota oficial do ENADE.</p></section></aside></div>`
    );
  }
  function topicCounts(qs) {
    const topics = Object.create(null);
    for (const q of qs) topics[q.theme] = (topics[q.theme] || 0) + 1;
    return (
      Object.entries(topics)
        .map(
          ([t, n]) =>
            `<div class="topic-item"><span>${e(t)}</span><strong>${n}</strong></div>`,
        )
        .join("") ||
      '<p class="info-note">Nenhuma questão para a combinação selecionada.</p>'
    );
  }
  function updateSetup() {
    const form = document.querySelector("#setup");
    if (!form) return;
    const filters = Object.fromEntries(new FormData(form));
    const qs = C.filterQuestions(state.questions, filters);
    document.querySelector("#match-count").innerHTML =
      `${qs.length}<small>questões disponíveis</small>`;
    document.querySelector("#match-topics").innerHTML = topicCounts(qs);
    const quantity = form.elements.quantity;
    quantity.max = String(qs.length);
    if (Number(quantity.value) > qs.length)
      quantity.value = String(Math.max(1, qs.length));
    document.querySelector("#quantity-help").textContent =
      `Até ${qs.length} questões disponíveis.`;
    document.querySelector("#start-exam").disabled = qs.length === 0;
  }
  function running() {
    const a = active();
    if (!a)
      return (
        head(
          "SIMULADOS",
          "Tudo pronto para um novo começo.",
          "Nenhuma tentativa está em andamento.",
        ) + link("simulado", "Preparar simulado", "primary", "arrow")
      );
    index = Math.max(0, Math.min(index, a.questions.length - 1));
    const q = a.questions[index],
      answered = Object.keys(a.answers).length;
    return (
      head(
        "SIMULADO EM ANDAMENTO",
        "Agora é o seu momento.",
        "As respostas são salvas ao selecionar. Você pode revisar as alternativas até encerrar.",
      ) +
      `<div class="two-column"><section class="card"><div class="exam-header"><div><p class="overline">QUESTÃO ${index + 1} DE ${a.questions.length}</p><h2 class="no-margin">${e(q.title || q.theme)}</h2></div><span class="timer" id="timer" aria-label="Tempo restante"></span></div><div class="exam-progress" aria-hidden="true"><span id="exam-bar" style="width:${(answered / a.questions.length) * 100}%"></span></div>${meta(q)}<p class="question-text">${e(q.statement)}</p>${q.adapted ? '<p class="question-description">Adaptação textual de questão real. Referências disponíveis na correção.</p>' : ""}<form id="running" data-id="${q.id}">${options(q, a.answers[q.id])}</form><div class="form-actions"><button class="secondary" data-step="${index - 1}" ${index === 0 ? "disabled" : ""}>Anterior</button><button class="primary" data-step="${index + 1}" ${index === a.questions.length - 1 ? "disabled" : ""}>Próxima questão ${icon("arrow")}</button></div></section><aside class="info-stack"><section class="info-card"><p class="overline">SEU ANDAMENTO</p><h3 id="answered-count">${answered} de ${a.questions.length} respondida(s)</h3><div class="progress-nav" aria-label="Navegar entre questões">${a.questions.map((q, i) => `<button data-step="${i}" class="${a.answers[q.id] ? "answered " : ""}${i === index ? "current" : ""}" ${i === index ? 'aria-current="step"' : ""} aria-label="Questão ${i + 1}${a.answers[q.id] ? ", respondida" : ""}">${i + 1}</button>`).join("")}</div><div class="progress-legend"><span><i class="legend-box"></i>Respondida</span><span><i class="legend-box active"></i>Atual</span></div><button class="primary" id="finish">Encerrar simulado ${icon("check")}</button><p class="data-note">Após a confirmação, as respostas não poderão ser alteradas.</p></section><section class="info-card"><h3>Concentre-se no raciocínio.</h3><p class="info-note">Use os números para voltar às questões que quiser revisar. O prazo continua valendo se você sair desta tela.</p></section></aside></div>`
    );
  }
  function result(id) {
    const a = completed().find((a) => a.id === id);
    if (!a) return missing();
    const s = C.score(a),
      arc = 339.3;
    return (
      head(
        "CORREÇÃO E APRENDIZADO",
        "Cada resposta abre um caminho.",
        `Tentativa concluída em ${date(a.ended)} · Encerramento ${a.reason === "prazo" ? "por prazo" : "manual"}.`,
        link("simulado", "Praticar novamente", "secondary", "arrow"),
      ) +
      `<section class="result-hero"><div class="score-ring" aria-label="${pct(s.percent)} de acertos"><svg viewBox="0 0 125 125" aria-hidden="true"><circle cx="62.5" cy="62.5" r="54" fill="none" stroke="#E4F2FE" stroke-width="8"/><circle cx="62.5" cy="62.5" r="54" fill="none" stroke="#004AF7" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(arc * s.percent) / 100} ${arc}"/></svg><div><strong>${pct(s.percent)}</strong><small>APROVEITAMENTO</small></div></div><div class="result-summary"><h2>Revisar também é avançar.</h2><p>Observe as alternativas e leia os comentários. O percentual é um indicador de estudo, não a nota oficial do ENADE.</p><div class="score-breakdown"><div><strong>${s.correct}</strong><small>Acertos</small></div><div><strong>${s.wrong}</strong><small>Erros</small></div><div><strong>${s.blank}</strong><small>Omissões</small></div><div><strong>${s.total}</strong><small>Questões</small></div></div></div></section><div class="section-head"><h2>Confira o raciocínio de cada questão</h2>${link("desempenho", "Ver desempenho", "text-link", "chart")}</div>` +
      a.questions
        .map((q, i) => {
          const selected = a.answers[q.id],
            ok = selected === q.correct;
          return `<details class="card review-card" ${i === 0 ? "open" : ""}><summary><span><i class="review-status ${ok ? "" : "wrong"}">${ok ? "✓" : selected ? "×" : "–"}</i><strong>${i + 1}. ${e(q.title || q.theme)}</strong></span><span class="muted">${ok ? "Acerto" : selected ? "Revisar" : "Não respondida"} ${icon("chevron")}</span></summary><div class="review-inner">${meta(q)}<p class="question-text">${e(q.statement)}</p>${q.options.map((t, j) => `<div class="option ${q.correct === C.letters[j] ? "correct" : selected === C.letters[j] ? "wrong" : ""}"><span class="option-letter">${C.letters[j]}</span><span>${e(t)}${q.correct === C.letters[j] ? '<strong class="option-annotation">Gabarito</strong>' : ""}${selected === C.letters[j] ? '<strong class="option-annotation">Sua resposta</strong>' : ""}</span></div>`).join("")}<section class="review-comment"><h3>COMENTÁRIO PARA SUA REVISÃO</h3><p>${e(q.comment)}</p><small>${e(q.commentAttribution || "Comentário cadastrado na curadoria.")} Revisão pedagógica externa pendente.</small></section>${adaptation(q)}<div class="actions">${external(q.source, "Prova original")}${external(q.answerSource, "Gabarito oficial")}${link("discussao/" + q.id, "Discutir a questão", "text-link", "chat")}</div></div></details>`;
        })
        .join("")
    );
  }
  function performance() {
    const s = C.aggregate(ownAttempts());
    return (
      head(
        "MEU DESEMPENHO",
        "Entenda seu ritmo. Escolha seu próximo passo.",
        "Seus indicadores são calculados apenas a partir das tentativas concluídas neste perfil local.",
      ) +
      (s.attempts
        ? `<div class="metrics">${metric("Tentativas concluídas", s.attempts, "Práticas e simulados", "clock")}${metric("Questões praticadas", s.total, "Inclui as omissões nas tentativas", "book")}${metric("Respostas corretas", s.correct, "Acertos conforme o gabarito", "check")}${metric("Aproveitamento geral", pct(s.percent), "Acertos / total de questões", "chart", true)}</div><section class="card"><h2>Seu desempenho por tema</h2>${Object.entries(
            s.themes,
          )
            .map(
              ([t, v]) =>
                `<div class="chart-row" aria-hidden="true"><span>${e(t)}</span><div class="bar"><span style="width:${(v.correct / v.total) * 100}%"></span></div><strong>${pct(Math.round((v.correct * 1000) / v.total) / 10)}</strong></div>`,
            )
            .join(
              "",
            )}<div class="table-wrap"><table><caption>Indicadores por tema, com denominador explícito</caption><thead><tr><th>TEMA</th><th>ACERTOS</th><th>QUESTÕES</th><th>APROVEITAMENTO</th></tr></thead><tbody>${Object.entries(
            s.themes,
          )
            .map(
              ([t, v]) =>
                `<tr><td>${e(t)}</td><td>${v.correct}</td><td>${v.total}</td><td>${pct(Math.round((v.correct * 1000) / v.total) / 10)}</td></tr>`,
            )
            .join(
              "",
            )}</tbody></table></div></section><section class="card spaced"><div class="section-head"><h2>Histórico de tentativas</h2></div>${history()}</section>`
        : empty(
            "Seu histórico está esperando o primeiro passo",
            "Conclua uma prática ou um simulado para conhecer seus resultados e retomar os temas que merecem atenção.",
            link("banco", "Começar uma prática", "primary", "arrow"),
            "chart",
          ))
    );
  }
  function materials() {
    const params = new URLSearchParams(location.hash.split("?")[1] || ""),
      theme = params.get("theme") || "";
    const items = state.materials.filter(
      (m) => m.status === "published" && (!theme || m.theme === theme),
    );
    return (
      head(
        "BIBLIOTECA DE ESTUDO",
        "Boas fontes. Novas possibilidades.",
        "Acesse as referências e amplie sua revisão. Os links identificam a origem dos materiais.",
      ) +
      `<form id="material-filters" class="filter-panel"><label>Tema<select name="theme"><option value="">Todos os temas</option>${[...new Set(state.materials.filter((m) => m.status === "published").map((m) => m.theme))].map((t) => `<option ${t === theme ? "selected" : ""}>${e(t)}</option>`).join("")}</select></label><div class="filter-footer"><span>${items.length} material(is) disponível(is)</span><button class="secondary">Filtrar materiais</button></div></form><div class="library-grid">${items.map((m) => `<article class="card library-card"><span class="library-card-icon">${icon("file")}</span><div class="question-meta"><span class="chip">${e(m.theme)}</span><span class="chip neutral">${e(new URL(m.url).hostname)}</span></div><h2>${e(m.title)}</h2><p>${e(m.description)}</p><div class="actions">${external(m.url, "Acessar material", "secondary")}</div></article>`).join("")}</div>` +
      (items.length
        ? ""
        : empty(
            "Nenhum material para esse tema",
            "Escolha outro tema para consultar as referências disponíveis.",
            link("materiais", "Ver todos os materiais", "secondary"),
          ))
    );
  }
  function auth(signup = false) {
    return `<div class="auth-layout"><section class="auth-story"><div><p class="eyebrow">APRENDER É CONSTRUIR CAMINHOS</p><h2>Seu próximo passo<br>merece <em>atenção.</em></h2><p>Um espaço para praticar, compreender suas respostas e voltar ao que realmente importa: aprender.</p><div class="auth-points"><div>${icon("book")} Questões com origem identificada</div><div>${icon("clock")} Desafios com tempo definido</div><div>${icon("chart")} Um histórico que acompanha seu ritmo</div></div></div><small>Protótipo acadêmico UNIFOR · Grupo 2.<br>Cadastro e sessão funcionam somente neste navegador. Nenhum dado é enviado a um serviço de contas.</small></section><section class="auth-form-panel"><p class="eyebrow">${signup ? "SEU ESPAÇO COMEÇA AQUI" : "BOM TER VOCÊ DE VOLTA"}</p><h1>${signup ? "Crie seu espaço de estudo." : "Entre para continuar."}</h1><p class="intro">${signup ? "Cadastre uma conta local para separar seu histórico neste navegador." : "Acesse a conta que você cadastrou neste navegador."}</p><form id="auth-form" data-mode="${signup ? "signup" : "login"}">${signup ? '<label>Seu nome<input name="name" autocomplete="name" required maxlength="80" placeholder="Como você gostaria de ser chamado?"></label>' : ""}<label>E-mail<input type="email" name="email" autocomplete="email" required maxlength="200" placeholder="Seu endereço de e-mail"></label><label>Senha<span class="password-wrap"><input type="password" name="password" id="password" autocomplete="${signup ? "new-password" : "current-password"}" required minlength="8" maxlength="128" placeholder="${signup ? "Pelo menos 8 caracteres" : "Sua senha local"}"><button type="button" class="password-toggle" data-password="password" aria-label="Mostrar senha">${icon("eye")}</button></span></label>${signup ? '<label>Confirme sua senha<input type="password" name="confirmation" autocomplete="new-password" required minlength="8" maxlength="128" placeholder="Digite a senha novamente"></label><label class="check-label"><input type="checkbox" name="accept" required><span>Entendo que esta conta é local e que não há recuperação por e-mail ou sincronização entre dispositivos.</span></label>' : ""}<p id="form-error" class="form-error notice error" role="alert"></p><button class="primary" id="auth-submit">${signup ? "Criar conta local" : "Entrar no meu espaço"} ${icon("arrow")}</button></form><p class="auth-bottom">${signup ? 'Já criou sua conta? <a href="#entrar">Entrar</a>' : 'Ainda não tem conta? <a href="#cadastro">Criar conta local</a>'}</p><div class="auth-divider">ou</div><a href="#inicio" class="guest-link">Continuar explorando como visitante →</a></section></div>`;
  }
  function accountPage() {
    const a = account();
    return (
      head(
        "CONTA E PRIVACIDADE",
        "Seu espaço, suas escolhas.",
        "Gerencie sua sessão e entenda como seus dados de estudo são usados neste protótipo.",
      ) +
      `<div class="account-grid"><section class="card"><div class="account-profile"><span class="avatar large">${a ? e(initials(a.name)) : icon("user")}</span><div><h2>${a ? e(a.name) : "Visitante local"}</h2><p>${a ? e(a.email) : "Você está explorando sem uma conta."}</p></div></div><div class="account-row"><span>Histórico deste perfil</span><strong>${completed().length} tentativa(s)</strong></div><div class="account-row"><span>Modo de navegação</span><strong>${curator ? "Curadoria de avaliação" : "Estudo"}</strong></div><div class="actions spaced">${a ? `<button class="secondary" id="logout">Sair da conta ${icon("logout")}</button>` : link("entrar", "Entrar", "primary", "arrow")}${!a ? link("cadastro", "Criar conta", "secondary") : ""}<button class="secondary" id="curator-mode">${curator ? "Voltar ao modo estudo" : "Avaliar curadoria"}</button></div>${a ? '<button class="text-link spaced" id="delete-account">Excluir esta conta local</button>' : ""}</section><section class="card"><h2>Privacidade por clareza.</h2><p class="info-note">Contas, respostas, mensagens e alterações ficam apenas neste navegador. Senhas locais são derivadas com PBKDF2 e sal aleatório; isso não equivale à autenticação de um serviço de produção. A curadoria é um modo de avaliação da interface.</p><p class="info-note">O armazenamento pode ser removido pelo navegador. Não há integração institucional, recuperação por e-mail ou comunicação com outros participantes.</p><button id="erase" class="danger">Apagar todos os dados locais ${icon("archive")}</button><p class="data-note">A seleção original de questões e fontes será restaurada. Contas, respostas, mensagens e conteúdo cadastrado serão apagados deste navegador.</p></section></div>`
    );
  }
  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toLocaleUpperCase("pt-BR");
  }
  function curatorGate() {
    return (
      head(
        "CURADORIA DE CONTEÚDO",
        "Um olhar cuidadoso sobre cada conteúdo.",
        "A manutenção do catálogo faz parte da experiência administrativa do protótipo.",
      ) +
      `<section class="card">${empty("Entrar no modo de curadoria", "Neste protótipo, o modo de curadoria permite avaliar cadastro, edição, publicação e arquivamento. As alterações ficam neste navegador.", '<button class="primary" id="curator-mode">Avaliar curadoria</button>', "shield")}</section>`
    );
  }
  function admin(kind = "questoes") {
    if (!curator) return curatorGate();
    const isQ = kind !== "materiais",
      items = isQ ? state.questions : state.materials;
    return (
      head(
        "CURADORIA",
        "Conteúdo com origem e contexto.",
        "Cadastre, revise e mantenha os conteúdos. Edições não alteram a fotografia das tentativas já realizadas.",
        link(
          isQ ? "editar-questao" : "editar-material",
          isQ ? "Nova questão" : "Novo material",
          "primary",
          "plus",
        ),
      ) +
      `<nav class="tabs" aria-label="Tipo de conteúdo"><a class="${isQ ? "active" : ""}" href="#admin/questoes">Questões <small>${state.questions.length}</small></a><a class="${!isQ ? "active" : ""}" href="#admin/materiais">Materiais <small>${state.materials.length}</small></a></nav><section class="card"><div class="section-head"><div><h2>${isQ ? "Banco de questões" : "Biblioteca de materiais"}</h2><p>Catálogo compartilhado entre os perfis deste navegador.</p></div><span class="tag">Modo de avaliação</span></div><div class="table-wrap"><table><thead><tr><th>CONTEÚDO</th><th>${isQ ? "EDIÇÃO" : "TEMA"}</th><th>SITUAÇÃO</th><th>AÇÕES</th></tr></thead><tbody>${items.map((item) => `<tr><td><strong>${e(item.title || item.theme)}</strong><small>${isQ ? `${e(shortCourse(item.course))} · Questão ${e(item.number)} · v${item.version || 1}` : e(item.description.slice(0, 85))}</small></td><td>${isQ ? item.year : e(item.theme)}</td><td><span class="status-pill ${item.status}">${item.status === "published" ? "Publicado" : item.status === "draft" ? "Rascunho" : "Arquivado"}</span></td><td><div class="table-actions"><a class="icon-button" href="#${isQ ? "editar-questao" : "editar-material"}/${item.id}" aria-label="Editar ${e(item.title || item.theme)}">${icon("edit")}</a>${item.status !== "archived" ? `<button class="icon-button" data-archive="${item.id}" data-kind="${isQ ? "question" : "material"}" aria-label="Arquivar ${e(item.title || item.theme)}">${icon("archive")}</button>` : ""}</div></td></tr>`).join("")}</tbody></table></div></section>`
    );
  }
  function questionEditor(id) {
    if (!curator) return curatorGate();
    const q = state.questions.find((q) => q.id === id) || {
      title: "",
      year: "",
      course: "",
      component: "Componente específico",
      theme: "",
      number: "",
      source: "",
      answerSource: "",
      statement: "",
      options: ["", "", "", "", ""],
      correct: "A",
      comment: "",
    };
    return (
      head(
        "CURADORIA DE QUESTÕES",
        id
          ? "Revise o conteúdo com cuidado."
          : "Uma nova oportunidade de aprender.",
        "Informe a origem e confira o gabarito. Uma edição cria uma nova versão para as próximas tentativas.",
      ) +
      `<section class="card reduced"><form id="question-form" data-id="${id || ""}"><div class="form-section"><div class="form-section-title"><span class="step-badge">1</span> Identificação e origem</div><div class="form-grid"><label class="full">Título da questão<input name="title" required maxlength="150" value="${e(q.title)}"></label><label>Ano da prova<input type="number" name="year" required min="2004" max="${new Date().getFullYear()}" value="${q.year}"></label><label>Curso<input name="course" required maxlength="150" value="${e(q.course)}"></label><label>Componente<select name="component">${["Formação geral", "Componente específico"].map((c) => `<option ${q.component === c ? "selected" : ""}>${c}</option>`).join("")}</select></label><label>Tema<input name="theme" required maxlength="120" value="${e(q.theme)}"></label><label>Número original<input name="number" required maxlength="20" value="${e(q.number)}"></label><label>URL HTTPS da prova<input type="url" name="source" required value="${e(q.source)}"></label><label class="full">URL HTTPS do gabarito<input type="url" name="answerSource" required value="${e(q.answerSource)}"></label></div></div><div class="form-section"><div class="form-section-title"><span class="step-badge">2</span> Questão e alternativas</div><div class="form-grid"><label class="full">Enunciado<textarea name="statement" required maxlength="20000">${e(q.statement)}</textarea></label>${C.letters.map((l, i) => `<label class="full">Alternativa ${l}<textarea name="option${l}" required maxlength="5000">${e(q.options[i])}</textarea></label>`).join("")}<label>Gabarito<select name="correct">${C.letters.map((l) => `<option ${q.correct === l ? "selected" : ""}>${l}</option>`).join("")}</select></label><label class="full">Comentário para revisão<textarea name="comment" required maxlength="10000">${e(q.comment)}</textarea></label></div></div><div class="form-section"><div class="form-section-title"><span class="step-badge">3</span> Conferência e publicação</div><label class="check-label"><input type="checkbox" name="reviewed"><span>Conferi os campos, a fonte, o gabarito e o comentário desta versão e quero publicá-la. Sem esta confirmação, a questão ficará em rascunho.</span></label>${q.adapted ? '<p class="data-note">Esta questão é uma adaptação de prova oficial. Preserve a identificação da adaptação e as referências.</p>' : ""}<p id="form-error" class="form-error notice error" role="alert"></p><div class="form-actions">${link("admin/questoes", "Cancelar", "text-link")}<button class="primary">Salvar questão ${icon("check")}</button></div></div></form></section>`
    );
  }
  function materialEditor(id) {
    if (!curator) return curatorGate();
    const m = state.materials.find((m) => m.id === id) || {
      title: "",
      theme: "",
      description: "",
      url: "",
      status: "published",
    };
    return (
      head(
        "CURADORIA DE MATERIAIS",
        id ? "Mantenha a biblioteca em dia." : "Compartilhe uma boa fonte.",
        "Identifique o material e sua origem. O conteúdo será aberto por um link externo.",
      ) +
      `<section class="card reduced"><form id="material-form" data-id="${id || ""}" class="form-grid"><label class="full">Título<input name="title" required maxlength="150" value="${e(m.title)}"></label><label>Tema<input name="theme" required maxlength="120" value="${e(m.theme)}"></label><label>Situação<select name="status"><option value="published" ${m.status === "published" ? "selected" : ""}>Publicado</option><option value="archived" ${m.status === "archived" ? "selected" : ""}>Arquivado</option></select></label><label class="full">Descrição<textarea name="description" required maxlength="2000">${e(m.description)}</textarea></label><label class="full">URL HTTPS do material<input type="url" name="url" required value="${e(m.url)}"></label><p id="form-error" class="form-error notice error full" role="alert"></p><div class="form-actions full">${link("admin/materiais", "Cancelar", "text-link")}<button class="primary">Salvar material ${icon("check")}</button></div></form></section>`
    );
  }
  function discussion(id) {
    const q =
      state.questions.find((q) => q.id === id) ||
      ownAttempts()
        .flatMap((a) => a.questions)
        .find((q) => q.id === id);
    if (!q) return missing();
    const messages = state.messages.filter(
      (m) => m.question === id && !m.hidden,
    );
    return (
      head(
        "DISCUSSÃO DA QUESTÃO",
        e(q.title || q.theme),
        "Registre sua dúvida e volte a ela durante a revisão. As mensagens são locais, sem uma comunidade conectada.",
      ) +
      `<div class="two-column"><section class="card">${messages.length ? messages.map((m) => `<article class="discussion-message"><div class="message-head"><span class="avatar">${e(initials(m.author || "Visitante local"))}</span><div><strong>${e(m.author || "Visitante local")}</strong><br><small>${date(m.created)} · Registro local</small></div></div><p class="question-text">${e(m.text)}</p><button class="text-link" data-report="${m.id}">Sinalizar mensagem</button></article>`).join("") : empty("Uma dúvida pode abrir um novo caminho", "Ainda não há mensagens nesta questão. Registre uma observação para sua revisão.", "", "chat")}<form id="message-form" data-id="${id}" class="spaced"><label>Sua mensagem<textarea name="text" required maxlength="2000" placeholder="Que ponto você gostaria de compreender melhor?"></textarea></label><button class="primary spaced">Publicar mensagem local ${icon("chat")}</button></form></section>${questionInfo(q)}</div>`
    );
  }
  function moderation() {
    if (!curator) return curatorGate();
    return (
      head(
        "MODERAÇÃO",
        "Cuidado também faz parte do aprendizado.",
        "Analise as sinalizações locais e registre uma justificativa para cada decisão.",
      ) +
      (state.reports.length
        ? state.reports
            .map((r) => {
              const m = state.messages.find((m) => m.id === r.message);
              return `<section class="card moderation-card"><p class="overline">${r.decision ? "ANÁLISE CONCLUÍDA" : "AGUARDANDO ANÁLISE"}</p><p class="question-text">${e(m?.text || "Mensagem indisponível")}</p><p class="info-note"><strong>Motivo:</strong> ${e(r.reason)}</p>${r.decision ? `<div class="notice">Decisão: ${e(r.decision)} · ${e(r.justification)}</div>` : `<form class="moderate-form form-grid" data-id="${r.id}"><label>Decisão<select name="decision"><option value="ocultar">Ocultar mensagem</option><option value="manter">Manter mensagem</option></select></label><label>Justificativa<input name="justification" required maxlength="500"></label><div class="full"><button class="secondary">Registrar decisão</button></div></form>`}</section>`;
            })
            .join("")
        : empty(
            "Nenhuma mensagem sinalizada",
            "As sinalizações feitas na discussão aparecerão aqui para análise.",
            "",
            "shield",
          ))
    );
  }
  function missing() {
    return (
      head(
        "NAVEGAÇÃO",
        "Não encontramos esse conteúdo.",
        "O item pode ter sido arquivado ou removido deste navegador.",
      ) + link("inicio", "Voltar ao início", "primary", "arrow")
    );
  }
  function render() {
    const expired = expire();
    if (expired) {
      go("resultado/" + expired.id);
      return;
    }
    const route = location.hash.slice(1).split("?")[0] || "inicio",
      [name, id] = route.split("/");
    const pages = {
      inicio: home,
      banco: bank,
      questao: () => practice(id),
      simulado: setup,
      tentativa: running,
      resultado: () => result(id),
      desempenho: performance,
      materiais: materials,
      entrar: () => auth(false),
      cadastro: () => auth(true),
      conta: accountPage,
      acesso: accountPage,
      admin: () => admin(id),
      catalogo: () => admin("questoes"),
      "editar-questao": () => questionEditor(id),
      "editar-material": () => materialEditor(id),
      discussao: () => discussion(id),
      moderacao: moderation,
    };
    const labels = {
      inicio: "Visão geral",
      banco: "Banco de questões",
      questao: "Prática individual",
      simulado: "Simulados",
      tentativa: "Simulado em andamento",
      resultado: "Correção comentada",
      desempenho: "Meu desempenho",
      materiais: "Materiais e fontes",
      entrar: "Entrar",
      cadastro: "Criar conta",
      conta: "Conta e privacidade",
      acesso: "Conta e privacidade",
      admin: "Curadoria",
      catalogo: "Curadoria",
      "editar-questao": "Editar questão",
      "editar-material": "Editar material",
      discussao: "Discussão",
      moderacao: "Moderação",
    };
    document.body.classList.toggle(
      "auth-mode",
      ["entrar", "cadastro"].includes(name),
    );
    main.innerHTML =
      (storageError
        ? '<div class="notice warning">O armazenamento local não pôde ser usado normalmente. Confira seus dados na tela de conta e mantenha a página aberta.</div>'
        : "") + (pages[name] || missing)();
    main.dataset.route = route;
    const navigation = [
      ["inicio", "Visão geral", "home"],
      ["banco", "Banco de questões", "book"],
      ["simulado", "Simulados", "clock"],
      ["desempenho", "Meu desempenho", "chart"],
      ["materiais", "Materiais e fontes", "file"],
    ];
    const adminNavigation = [
      ["admin/questoes", "Curadoria de conteúdo", "grid"],
      ["moderacao", "Moderação", "shield"],
    ];
    function navHtml(items) {
      return items
        .map(
          ([r, t, i]) =>
            `<a href="#${r}" class="${route === r || (["questao"].includes(name) && r === "banco") || (["editar-questao", "editar-material"].includes(name) && r.startsWith("admin")) ? "active" : ""}">${icon(i)}${t}</a>`,
        )
        .join("");
    }
    document.querySelector("#nav").innerHTML = navHtml(navigation);
    document.querySelector("#admin-nav").innerHTML = navHtml(adminNavigation);
    document.querySelector("#breadcrumb").textContent =
      labels[name] || "Espaço de estudo";
    const a = account();
    document.querySelector("#profile-action").innerHTML =
      `<a href="#${a ? "conta" : "entrar"}" class="profile"><span class="avatar">${a ? e(initials(a.name)) : icon("user")}</span><span class="profile-meta">${a ? e(a.name.split(" ")[0]) : "Entrar no meu espaço"}<small>${a ? "Conta local" : "Visitante · Exploração livre"}</small></span>${icon("chevron")}</a>`;
    document.title = (labels[name] || "Espaço de estudo") + " · ENADE";
    if (route !== lastRoute) {
      main.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
      lastRoute = route;
    }
    updateSetup();
    tick();
  }
  function formError(text) {
    const box = document.querySelector("#form-error");
    if (box) {
      box.textContent = text;
      box.scrollIntoView({ block: "nearest" });
    } else toast(text);
  }
  function base64(bytes) {
    return btoa(String.fromCharCode(...bytes));
  }
  async function derive(password, salt) {
    const source = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const value = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: new Uint8Array(salt),
        iterations: 120000,
        hash: "SHA-256",
      },
      source,
      256,
    );
    return base64(new Uint8Array(value));
  }
  async function authSubmit(form, data) {
    const signup = form.dataset.mode === "signup",
      email = String(data.get("email")).trim().toLocaleLowerCase("pt-BR"),
      password = String(data.get("password"));
    const submit =
      form.querySelector("[type=submit]") ||
      document.querySelector("#auth-submit");
    const oldHtml = submit.innerHTML;
    submit.disabled = true;
    submit.textContent = signup ? "Criando seu espaço…" : "Conferindo acesso…";
    try {
      if (!crypto.subtle)
        throw Error(
          "O acesso local requer HTTPS ou localhost. Abra o endereço publicado do protótipo.",
        );
      if (signup) {
        const name = String(data.get("name")).trim();
        if (!name) throw Error("Informe seu nome.");
        if (state.accounts.some((a) => a.email === email))
          throw Error(
            "Este e-mail já foi cadastrado neste navegador. Entre na sua conta.",
          );
        if (password.length < 8)
          throw Error("Use uma senha com pelo menos 8 caracteres.");
        if (password !== data.get("confirmation"))
          throw Error("A confirmação deve ser igual à senha.");
        if (!data.has("accept"))
          throw Error("Confirme que compreendeu o armazenamento local.");
        const salt = Array.from(crypto.getRandomValues(new Uint8Array(16))),
          hash = await derive(password, salt);
        const a = { id: uuid(), name, email, salt, hash, created: Date.now() };
        state.accounts.push(a);
        userId = a.id;
      } else {
        const a = state.accounts.find((a) => a.email === email);
        if (!a || (await derive(password, a.salt)) !== a.hash)
          throw Error(
            "E-mail ou senha não conferem com uma conta deste navegador.",
          );
        userId = a.id;
      }
      curator = false;
      save();
      saveSession();
      form.reset();
      go("inicio");
      toast(
        signup
          ? "Seu espaço local foi criado. Vamos começar?"
          : "Bem-vindo de volta ao seu espaço.",
      );
    } catch (error) {
      formError(error.message);
    } finally {
      if (submit.isConnected) {
        submit.disabled = false;
        submit.innerHTML = oldHtml;
      }
    }
  }
  main.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target,
      data = new FormData(form);
    if (form.id === "auth-form") {
      await authSubmit(form, data);
      return;
    }
    if (form.id === "filters") {
      go("banco?" + new URLSearchParams(data));
      return;
    }
    if (form.id === "material-filters") {
      go("materiais?" + new URLSearchParams(data));
      return;
    }
    if (form.id === "practice") {
      if (active()) {
        formError(
          "Conclua ou retome o simulado em andamento antes de iniciar uma prática.",
        );
        return;
      }
      if (!data.get("alternative")) {
        formError("Selecione uma alternativa para confirmar a resposta.");
        return;
      }
      const q = published().find((q) => q.id === form.dataset.id);
      if (!q) return;
      const a = C.createAttempt([q], 1, 1, "pratica", Date.now(), uuid());
      a.owner = userId;
      C.answer(a, q.id, data.get("alternative"));
      C.finish(a);
      state.attempts.push(a);
      save();
      go("resultado/" + a.id);
      return;
    }
    if (form.id === "setup") {
      if (active()) {
        go("tentativa");
        return;
      }
      try {
        const filters = Object.fromEntries(data),
          qs = C.filterQuestions(state.questions, filters),
          a = C.createAttempt(
            qs,
            Number(data.get("quantity")),
            Number(data.get("minutes")),
            "simulado",
            Date.now(),
            uuid(),
          );
        a.owner = userId;
        a.filters = filters;
        state.attempts.push(a);
        index = 0;
        save();
        go("tentativa");
      } catch (error) {
        formError(error.message);
      }
      return;
    }
    if (form.id === "question-form") {
      if (!curator) return;
      const prior = state.questions.find((q) => q.id === form.dataset.id),
        reviewed = data.has("reviewed");
      const fields = {
        title: String(data.get("title")).trim(),
        year: Number(data.get("year")),
        course: String(data.get("course")).trim(),
        component: data.get("component"),
        theme: String(data.get("theme")).trim(),
        number: String(data.get("number")).trim(),
        source: String(data.get("source")).trim(),
        answerSource: String(data.get("answerSource")).trim(),
        statement: String(data.get("statement")).trim(),
        options: C.letters.map((l) => String(data.get("option" + l)).trim()),
        correct: data.get("correct"),
        comment: String(data.get("comment")).trim(),
        reviewed,
        status: reviewed ? "published" : "draft",
        reviewedAt: reviewed ? Date.now() : null,
      };
      try {
        const q = prior
          ? C.reviseQuestion(prior, fields)
          : { ...fields, id: uuid(), version: 1 };
        if (C.validateQuestion(q).length)
          throw Error(
            "Confira os campos, as URLs HTTPS e as cinco alternativas distintas.",
          );
        if (prior) state.questions[state.questions.indexOf(prior)] = q;
        else state.questions.push(q);
        save();
        go("admin/questoes");
        toast(
          reviewed
            ? "Questão salva e publicada. Tentativas anteriores permanecem intactas."
            : "Questão salva em rascunho, aguardando conferência.",
        );
      } catch (error) {
        formError(error.message);
      }
      return;
    }
    if (form.id === "material-form") {
      if (!curator) return;
      const prior = state.materials.find((m) => m.id === form.dataset.id),
        m = {
          id: prior?.id || uuid(),
          title: String(data.get("title")).trim(),
          theme: String(data.get("theme")).trim(),
          description: String(data.get("description")).trim(),
          url: String(data.get("url")).trim(),
          status: data.get("status"),
          updatedAt: Date.now(),
        };
      if (C.validateMaterial(m).length) {
        formError("Preencha todos os campos e informe uma URL HTTPS válida.");
        return;
      }
      if (prior) state.materials[state.materials.indexOf(prior)] = m;
      else state.materials.push(m);
      save();
      go("admin/materiais");
      toast("Material salvo na biblioteca local.");
      return;
    }
    if (form.id === "message-form") {
      const text = String(data.get("text")).trim();
      if (!text || text.length > 2000) {
        toast("Escreva uma mensagem de 1 a 2000 caracteres.");
        return;
      }
      state.messages.push({
        id: uuid(),
        question: form.dataset.id,
        owner: userId,
        author: account()?.name || "Visitante local",
        text,
        created: Date.now(),
        hidden: false,
      });
      save();
      render();
      toast("Mensagem local registrada.");
      return;
    }
    if (form.classList.contains("moderate-form")) {
      if (!curator) return;
      const r = state.reports.find((r) => r.id === form.dataset.id),
        justification = String(data.get("justification")).trim();
      if (!r || !justification) return;
      r.decision = data.get("decision");
      r.justification = justification;
      r.decided = Date.now();
      r.by = account()?.name || "Curadoria local";
      if (r.decision === "ocultar") {
        const m = state.messages.find((m) => m.id === r.message);
        if (m) m.hidden = true;
      }
      save();
      render();
      toast("Decisão registrada.");
    }
  });
  main.addEventListener("change", (event) => {
    if (event.target.closest("#setup")) updateSetup();
    if (
      event.target.closest("#running") &&
      event.target.name === "alternative"
    ) {
      const a = active();
      if (!a) return;
      if (
        !C.answer(
          a,
          event.target.closest("form").dataset.id,
          event.target.value,
        )
      ) {
        const ex = expire();
        if (ex) go("resultado/" + ex.id);
        return;
      }
      save();
      document.querySelector("#answered-count").textContent =
        `${Object.keys(a.answers).length} de ${a.questions.length} respondida(s)`;
      document.querySelector("#exam-bar").style.width =
        (Object.keys(a.answers).length / a.questions.length) * 100 + "%";
      document
        .querySelectorAll(".progress-nav [data-step]")
        .forEach((b) =>
          b.classList.toggle(
            "answered",
            !!a.answers[a.questions[Number(b.dataset.step)].id],
          ),
        );
    }
  });
  main.addEventListener("click", (event) => {
    const b = event.target.closest("button");
    if (!b || b.disabled) return;
    if (b.dataset.password) {
      const field = document.getElementById(b.dataset.password),
        show = field.type === "password";
      field.type = show ? "text" : "password";
      b.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
      return;
    }
    if (b.dataset.minutes) {
      const f = document.querySelector("#setup");
      f.elements.minutes.value = b.dataset.minutes;
      return;
    }
    if (b.hasAttribute("data-step")) {
      index = Number(b.dataset.step);
      render();
      return;
    }
    if (b.id === "finish") {
      const a = active();
      if (a)
        dialog(
          "Encerrar este desafio?",
          `${a.questions.length - Object.keys(a.answers).length} questão(ões) sem resposta. Após encerrar, sua correção será liberada e as respostas não poderão ser alteradas.`,
          "Encerrar simulado",
          () => {
            C.finish(a);
            save();
            go("resultado/" + a.id);
          },
        );
      return;
    }
    if (b.id === "curator-mode") {
      if (curator) {
        curator = false;
        saveSession();
        go("inicio");
        return;
      }
      dialog(
        "Avaliar a curadoria?",
        "Você poderá cadastrar, editar e arquivar conteúdos neste navegador. Este modo serve para avaliar a interface e não representa uma autorização administrativa de um serviço real.",
        "Entrar na curadoria",
        () => {
          curator = true;
          saveSession();
          go("admin/questoes");
        },
      );
      return;
    }
    if (b.id === "logout") {
      const a = active();
      dialog(
        "Sair da conta local?",
        a
          ? "Seu simulado continua contando o prazo. Entre novamente nesta conta para retomá-lo."
          : "O histórico continuará guardado neste navegador para seu próximo acesso.",
        "Sair da conta",
        () => {
          userId = "guest";
          curator = false;
          saveSession();
          go("inicio");
          toast("Você saiu da conta local.");
        },
      );
      return;
    }
    if (b.id === "erase") {
      dialog(
        "Apagar os dados deste navegador?",
        "Esta ação remove todas as contas, respostas, mensagens e conteúdos cadastrados localmente. A seleção original de questões e materiais será restaurada.",
        "Apagar dados",
        () => {
          state = fresh();
          userId = "guest";
          curator = false;
          storageError = false;
          try {
            localStorage.removeItem(key);
            localStorage.removeItem("enade.grupo2.v2");
            sessionStorage.removeItem(sessionKey);
          } catch {
            storageError = true;
          }
          go("inicio");
          toast("Dados locais apagados. A seleção original foi restaurada.");
        },
        true,
      );
      return;
    }
    if (b.id === "delete-account") {
      const id = userId;
      dialog(
        "Excluir esta conta local?",
        "A conta e seu histórico serão removidos deste navegador. As mensagens serão removidas junto com as sinalizações correspondentes.",
        "Excluir conta",
        () => {
          const messages = state.messages
            .filter((m) => m.owner === id)
            .map((m) => m.id);
          state.accounts = state.accounts.filter((a) => a.id !== id);
          state.attempts = state.attempts.filter((a) => a.owner !== id);
          state.messages = state.messages.filter((m) => m.owner !== id);
          state.reports = state.reports.filter(
            (r) => !messages.includes(r.message),
          );
          userId = "guest";
          curator = false;
          save();
          saveSession();
          go("inicio");
          toast("Conta local excluída.");
        },
        true,
      );
      return;
    }
    if (b.dataset.archive && curator) {
      const list =
          b.dataset.kind === "material" ? state.materials : state.questions,
        item = list.find((i) => i.id === b.dataset.archive);
      if (!item) return;
      dialog(
        "Arquivar este conteúdo?",
        "Ele deixará de aparecer nas novas consultas e tentativas. Resultados anteriores serão preservados.",
        "Arquivar",
        () => {
          item.status = "archived";
          save();
          render();
          toast("Conteúdo arquivado.");
        },
      );
      return;
    }
    if (b.dataset.report) {
      const d = document.querySelector("#dialog");
      document.querySelector("#dialog-body").innerHTML =
        `<div class="dialog-symbol">${icon("shield")}</div><h2 id="dialog-title">Sinalizar mensagem</h2><p>Descreva o motivo para que a curadoria local possa avaliar.</p><form id="report-form"><label>Motivo<textarea name="reason" required maxlength="500"></textarea></label><div class="actions"><button type="button" class="secondary" id="cancel-report">Cancelar</button><button class="primary">Registrar sinalização</button></div></form>`;
      document.querySelector("#cancel-report").onclick = () => d.close();
      document.querySelector("#report-form").onsubmit = (ev) => {
        ev.preventDefault();
        const reason = new FormData(ev.target).get("reason").trim();
        if (!reason) return;
        state.reports.push({
          id: uuid(),
          message: b.dataset.report,
          reason,
          created: Date.now(),
          decision: null,
        });
        save();
        d.close();
        toast("Sinalização registrada para análise local.");
      };
      d.showModal();
    }
  });
  function tick() {
    const ex = expire();
    if (ex) {
      go("resultado/" + ex.id);
      return;
    }
    const a = active(),
      timer = document.querySelector("#timer");
    if (a && timer) {
      const seconds = Math.max(0, Math.ceil((a.deadline - Date.now()) / 1000));
      timer.innerHTML =
        icon("clock") +
        `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
      timer.classList.toggle("low", seconds <= 60);
    }
  }
  window.addEventListener("hashchange", render);
  document.addEventListener("visibilitychange", tick);
  setInterval(tick, 1000);
  render();
})();
