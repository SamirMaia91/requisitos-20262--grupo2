(function (global) {
  "use strict";
  const letters = ["A", "B", "C", "D", "E"];
  function https(value) {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }
  function validateQuestion(q) {
    const errors = [];
    for (const field of [
      "id",
      "course",
      "theme",
      "number",
      "statement",
      "comment",
    ]) {
      if (typeof q[field] !== "string" || !q[field].trim()) errors.push(field);
    }
    if (
      !Number.isInteger(q.year) ||
      q.year < 2004 ||
      q.year > new Date().getFullYear()
    )
      errors.push("year");
    if (!["Formação geral", "Componente específico"].includes(q.component))
      errors.push("component");
    if (!https(q.source) || !https(q.answerSource)) errors.push("source");
    if (
      !Array.isArray(q.options) ||
      q.options.length !== 5 ||
      q.options.some((o) => typeof o !== "string" || !o.trim()) ||
      new Set(q.options.map((o) => String(o).trim())).size !== 5
    )
      errors.push("options");
    if (!letters.includes(q.correct)) errors.push("correct");
    if (!["draft", "published", "archived"].includes(q.status))
      errors.push("status");
    if (q.status === "published" && q.reviewed !== true)
      errors.push("reviewed");
    return errors;
  }
  function score(attempt) {
    let correct = 0,
      wrong = 0,
      blank = 0;
    const themes = Object.create(null);
    for (const q of attempt.questions) {
      const selected = attempt.answers[q.id];
      if (!selected) blank++;
      else if (selected === q.correct) correct++;
      else wrong++;
      const theme =
        themes[q.theme] || (themes[q.theme] = { correct: 0, total: 0 });
      theme.total++;
      if (selected === q.correct) theme.correct++;
    }
    const total = attempt.questions.length;
    return {
      correct,
      wrong,
      blank,
      total,
      percent: total ? Math.round((correct * 1000) / total) / 10 : null,
      themes,
    };
  }
  function createAttempt(
    questions,
    quantity,
    minutes,
    kind = "simulado",
    now = Date.now(),
    id = String(now),
  ) {
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > questions.length
    )
      throw Error(
        "A quantidade deve estar entre 1 e o total de questões disponíveis.",
      );
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 240)
      throw Error("A duração deve ser de 1 a 240 minutos inteiros.");
    if (
      questions
        .slice(0, quantity)
        .some((q) => q.status !== "published" || validateQuestion(q).length)
    )
      throw Error("Selecione somente questões publicadas e revisadas.");
    return {
      id,
      kind,
      questions: JSON.parse(JSON.stringify(questions.slice(0, quantity))),
      answers: {},
      started: now,
      deadline: kind === "simulado" ? now + minutes * 60000 : null,
      ended: null,
      reason: null,
    };
  }
  function answer(attempt, questionId, value, now = Date.now()) {
    if (
      attempt.ended !== null ||
      (attempt.deadline !== null && now >= attempt.deadline)
    )
      return false;
    if (
      !letters.includes(value) ||
      !attempt.questions.some((q) => q.id === questionId)
    )
      return false;
    attempt.answers[questionId] = value;
    return true;
  }
  function finish(attempt, now = Date.now()) {
    if (attempt.ended !== null) return attempt;
    attempt.reason =
      attempt.deadline !== null && now >= attempt.deadline ? "prazo" : "manual";
    attempt.ended = attempt.reason === "prazo" ? attempt.deadline : now;
    return attempt;
  }
  function aggregate(attempts) {
    const completed = attempts.filter((a) => a.ended !== null);
    return {
      ...score({
        questions: completed.flatMap((a) =>
          a.questions.map((q) => ({ ...q, id: a.id + "/" + q.id })),
        ),
        answers: Object.fromEntries(
          completed.flatMap((a) =>
            Object.entries(a.answers).map(([id, value]) => [
              a.id + "/" + id,
              value,
            ]),
          ),
        ),
      }),
      attempts: completed.length,
    };
  }
  function filterQuestions(questions, filters = {}) {
    const query = String(filters.search || "")
      .trim()
      .toLocaleLowerCase("pt-BR");
    return questions.filter(
      (q) =>
        q.status === "published" &&
        ["year", "course", "component", "theme"].every(
          (k) => !filters[k] || String(q[k]) === String(filters[k]),
        ) &&
        (!query ||
          [q.statement, q.theme, q.course, q.number].some((v) =>
            String(v).toLocaleLowerCase("pt-BR").includes(query),
          )),
    );
  }
  function validateMaterial(m) {
    return ["id", "title", "theme", "description"]
      .filter((k) => typeof m[k] !== "string" || !m[k].trim())
      .concat(https(m.url) ? [] : ["url"])
      .concat(["published", "archived"].includes(m.status) ? [] : ["status"]);
  }
  function reviseQuestion(previous, changes) {
    const revised = {
      ...previous,
      ...changes,
      id: previous.id,
      version: (previous.version || 1) + 1,
      updatedAt: Date.now(),
    };
    if (validateQuestion(revised).length)
      throw Error("Confira os campos e a revisão da questão.");
    return revised;
  }
  const api = {
    letters,
    https,
    validateQuestion,
    score,
    createAttempt,
    answer,
    finish,
    aggregate,
    filterQuestions,
    validateMaterial,
    reviseQuestion,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.EnadeCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
