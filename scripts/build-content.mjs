import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
const folder = new URL(
  "../Requisitos/Artefatos/SistemaApoioENADE/Prototipos/",
  import.meta.url,
);
const content = JSON.parse(
  await fs.readFile(new URL("content.json", folder), "utf8"),
);
await fs.writeFile(
  new URL("content.js", folder),
  "/* Gerado por node scripts/build-content.mjs a partir de content.json. */\nwindow.EnadeSeed = " +
    JSON.stringify(content, null, 2) +
    ";\n",
);
console.log(
  "Catálogo gerado:",
  content.questions.length,
  "questões com referências,",
  content.materials.length,
  "materiais.",
);
