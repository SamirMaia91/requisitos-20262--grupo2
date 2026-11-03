import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(
  root,
  "Requisitos/Artefatos/SistemaApoioENADE/Prototipos",
);
if (process.argv.length !== 3)
  throw Error("Uso: node scripts/package-prototype.mjs <diretório de destino>");
const destination = path.resolve(process.argv[2]);
// Só prepara uma distribuição; nunca remove ou sobrescreve a árvore de fontes.
if (
  destination === root ||
  root.startsWith(destination + path.sep) ||
  destination === source ||
  destination.startsWith(source + path.sep)
)
  throw Error("Escolha um destino separado da raiz e da pasta de fontes.");
await fs.mkdir(destination, { recursive: true });
for (const name of [
  "index.html",
  "styles.css",
  "core.js",
  "app.js",
  "content.js",
  "content.json",
  "favicon.svg",
  "assets",
]) {
  await fs.cp(path.join(source, name), path.join(destination, name), {
    recursive: true,
  });
}
console.log("Distribuição preparada em " + destination);
