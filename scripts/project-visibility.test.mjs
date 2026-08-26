import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
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

test("TAOS abre la experiencia operativa integrada en el portfolio", async () => {
  const projectSource = await readFile(
    new URL("../content/projects/taos-agent.mdx", import.meta.url),
    "utf8",
  );
  const frontmatter = parseFrontmatter(projectSource);

  assert.equal(frontmatter.url, "/taos/index.html");
  assert.equal(frontmatter.urlLabel, "Explorar Plataforma");

  const showcaseDirectory = new URL("../public/taos/", import.meta.url);
  await access(new URL("index.html", showcaseDirectory));

  const assetsDirectory = new URL("assets/", showcaseDirectory);
  const assetFiles = await readdir(assetsDirectory);
  const showcaseSource = (
    await Promise.all(
      assetFiles.map((file) => readFile(new URL(file, assetsDirectory), "utf8")),
    )
  ).join("\n");

  assert.match(showcaseSource, /data-theme":`dark`/);
  assert.match(showcaseSource, /Asesor IA/);
  assert.match(showcaseSource, /Métricas comerciales/);
  assert.match(showcaseSource, /Conectar con Asesor IA/);
});
