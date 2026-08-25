import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const visibleCategories = new Set([
  "Agentes IA & RAG",
  "Páginas Web & E-Commerce",
]);

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, "El proyecto debe tener frontmatter válido");

  return Object.fromEntries(
    match[1].split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");
      assert.notEqual(separator, -1, `Línea de frontmatter inválida: ${line}`);

      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^(["'])(.*)\1$/, "$2");

      return [key, value];
    }),
  );
}

test("cada proyecto publicado pertenece a un grupo visible", async () => {
  const projectsDirectory = new URL("../content/projects/", import.meta.url);
  const files = (await readdir(projectsDirectory)).filter((file) =>
    file.endsWith(".mdx"),
  );

  for (const file of files) {
    const source = await readFile(new URL(file, projectsDirectory), "utf8");
    const frontmatter = parseFrontmatter(source);

    if (frontmatter.published !== "true" || !frontmatter.category) continue;

    assert.ok(
      visibleCategories.has(frontmatter.category),
      `${file} usa la categoría no visible "${frontmatter.category}"`,
    );
  }
});
