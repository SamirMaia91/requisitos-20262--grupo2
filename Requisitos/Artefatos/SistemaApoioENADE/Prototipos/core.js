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
          [q.title, q.statement, q.theme, q.course, q.number].some((v) =>
            String(v ?? "").toLocaleLowerCase("pt-BR").includes(query),
          )),
    );
  }
  const attachmentTypes = Object.freeze({
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const attachmentLimit = 15 * 1024 * 1024;
  function attachmentType(name) {
    const extension = typeof name === "string" && name.includes(".")
      ? name.split(".").at(-1).toLowerCase()
      : "";
    return Object.hasOwn(attachmentTypes, extension) ? attachmentTypes[extension] : "";
  }
  function validPdf(bytes) {
    const decode = new TextDecoder("latin1");
    if (!/^%PDF-\d\.\d(?:\r|\n)/.test(decode.decode(bytes.subarray(0, 16)))) return false;
    const tail = decode.decode(bytes.subarray(Math.max(0, bytes.length - 65536)));
    const end = /startxref\s+(\d+)\s+%%EOF[\s\0]*$/.exec(tail);
    if (!end) return false;
    const offset = Number(end[1]);
    if (!Number.isSafeInteger(offset) || offset <= 0 || offset >= bytes.length) return false;
    const crossReference = decode.decode(bytes.subarray(offset, offset + 1024));
    return /^xref\s+\d+\s+\d+\b/.test(crossReference) ||
      /^\d+\s+\d+\s+obj\b[\s\S]*?\/Type\s*\/XRef\b/.test(crossReference);
  }
  function validOffice(bytes, documentPart) {
    const zip = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const decode = new TextDecoder();
    for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
      if (zip.getUint32(i, true) !== 0x06054b50 ||
          i + 22 + zip.getUint16(i + 20, true) !== bytes.length) continue;
      const count = zip.getUint16(i + 10, true);
      const end = zip.getUint32(i + 12, true) + zip.getUint32(i + 16, true);
      let cursor = zip.getUint32(i + 16, true);
      if (end > i || zip.getUint32(i + 4, true) !== 0) return false;
      const parts = new Set();
      for (let entry = 0; entry < count; entry++) {
        if (cursor + 46 > end || zip.getUint32(cursor, true) !== 0x02014b50) return false;
        const nameLength = zip.getUint16(cursor + 28, true);
        const name = decode.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLength));
        const offset = zip.getUint32(cursor + 42, true);
        if (offset + 30 > cursor || zip.getUint32(offset, true) !== 0x04034b50) return false;
        const localNameLength = zip.getUint16(offset + 26, true);
        const dataStart = offset + 30 + localNameLength + zip.getUint16(offset + 28, true);
        if (dataStart + zip.getUint32(cursor + 20, true) > i ||
            decode.decode(bytes.subarray(offset + 30, offset + 30 + localNameLength)) !== name) return false;
        parts.add(name);
        cursor += 46 + nameLength + zip.getUint16(cursor + 30, true) + zip.getUint16(cursor + 32, true);
      }
      return cursor === end && parts.has("[Content_Types].xml") && parts.has(documentPart);
    }
    return false;
  }
  function validDocument(bytes, type) {
    if (type === "application/pdf") return validPdf(bytes);
    const required = {
      [attachmentTypes.docx]: "word/document.xml",
      [attachmentTypes.pptx]: "ppt/presentation.xml",
      [attachmentTypes.xlsx]: "xl/workbook.xml",
    };
    return Object.hasOwn(required, type) && validOffice(bytes, required[type]);
  }
  function validAttachment(a) {
    return (
      typeof a?.id === "string" && a.id.trim() &&
      typeof a.name === "string" && a.name.length <= 255 &&
      !/[/\\\u0000-\u001f\u007f]/.test(a.name) &&
      attachmentType(a.name) && attachmentType(a.name) === a.type &&
      Number.isSafeInteger(a.size) && a.size > 0 && a.size <= attachmentLimit
    );
  }
  function validateMaterial(m) {
    return ["id", "title", "theme", "description"]
      .filter((k) => typeof m[k] !== "string" || !m[k].trim())
      .concat(m.attachment
        ? (!m.url && validAttachment(m.attachment) ? [] : ["attachment"])
        : (https(m.url) ? [] : ["url"]))
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
    attachmentTypes,
    attachmentType,
    attachmentLimit,
    validDocument,
    validateMaterial,
    reviseQuestion,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.EnadeCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
