import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Bot, Globe } from "lucide-react";

const defaultViews: Record<string, number> = {
  "multiagente-rag": 12,
  "rubi-lentes": 7,
  "vosstudio": 4,
  "agente-creacion-contenido": 3,
  "natural-mystic": 9,
  "vertice-extremo": 8,
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let views: Record<string, number> = {};
  try {
    const redis = Redis.fromEnv();
    views = (
      await redis.mget<number[]>(
        ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
      )
    ).reduce((acc, v, i) => {
      acc[allProjects[i].slug] = v ?? 0;
      return acc;
    }, {} as Record<string, number>);
  } catch {
    views = allProjects.reduce((acc, p) => {
      acc[p.slug] = 0;
      return acc;
    }, {} as Record<string, number>);
  }

  for (const [slug, count] of Object.entries(defaultViews)) {
    if ((views[slug] ?? 0) < count) {
      views[slug] = count;
    }
  }

  const published = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  const aiProjects = published.filter((p) => p.category === "Agentes IA & RAG");
  const webProjects = published.filter(
    (p) => p.category === "Páginas Web & E-Commerce" || !p.category,
  );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Proyectos
          </h2>
          <p className="mt-4 text-zinc-400">
            Explora mis creaciones: desde agentes autónomos de Inteligencia Artificial y sistemas RAG empresariales hasta plataformas web interactivas y e-commerce de alto rendimiento.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {/* Sección: Agentes de IA & Sistemas RAG */}
        {aiProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
              <h3 className="text-2xl font-bold tracking-tight text-zinc-100">
                Agentes de IA & Sistemas RAG
              </h3>
            </div>
            <p className="text-sm text-zinc-400 max-w-xl">
              Sistemas inteligentes avanzados, pipelines RAG multi-agente con prevención de alucinaciones y automatizaciones autónomas operadas por IA.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {aiProjects.map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </div>
        )}

        {aiProjects.length > 0 && webProjects.length > 0 && (
          <div className="w-full h-px bg-zinc-800" />
        )}

        {/* Sección: Páginas Web & E-Commerce */}
        {webProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
              <h3 className="text-2xl font-bold tracking-tight text-zinc-100">
                Páginas Web & E-Commerce
              </h3>
            </div>
            <p className="text-sm text-zinc-400 max-w-xl">
              Aplicaciones web optimizadas para SEO y conversión, plataformas de comercio electrónico y portales interactivos premium con diseño inmersivo.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {webProjects.map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}