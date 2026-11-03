import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Gera o catálogo, verifica a entrega e copia somente os arquivos de execução.
for (const args of [
  ["scripts/build-content.mjs"],
  ["scripts/check.mjs"],
  ["scripts/package-prototype.mjs", "dist"],
]) {
  execFileSync(process.execPath, args, { cwd: root, stdio: "inherit" });
}
