import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const args of [["scripts/build-content.mjs"], ["scripts/check.mjs"]]) {
  execFileSync(process.execPath, args, { cwd: root, stdio: "inherit" });
}

// A distribuição gerada começa vazia para evitar que recursos antigos sejam republicados.
const project = await fs.realpath(root);
const dist = path.join(project, "dist");
const previous = await fs.lstat(dist).catch((error) => {
  if (error.code !== "ENOENT") throw error;
  return null;
});
if (previous) {
  if (!previous.isDirectory() || previous.isSymbolicLink() || await fs.realpath(dist) !== dist)
    throw Error("O diretório de distribuição deve ficar na raiz do repositório.");
  await fs.rm(dist, { recursive: true });
}
execFileSync(process.execPath, ["scripts/package-prototype.mjs", dist], {
  cwd: project,
  stdio: "inherit",
});
