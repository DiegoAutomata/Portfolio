import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

const defaultViews: Record<string, number> = {
  "multiagente-rag": 12,
  "rubi-lentes": 7,
  "vosstudio": 4,
  "agente-creacion-contenido": 3,
};

export const dynamic = "force-dynamic";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  let views = defaultViews[slug] ?? 0;
  try {
    const redis = Redis.fromEnv();
    const redisViews = (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;
    if (redisViews > views) views = redisViews;
  } catch {}

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
