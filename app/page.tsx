import Link from "next/link";
import React from "react";
import { Github, Mail, Linkedin } from "lucide-react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
];

const socials = [
  {
    icon: <Linkedin size={16} />,
    href: "https://www.linkedin.com/in/diego-lezana-ai",
    label: "LinkedIn",
  },
  {
    icon: <Mail size={16} />,
    href: "mailto:diegolezana1@gmail.com",
    label: "Email",
  },
  {
    icon: <Github size={16} />,
    href: "https://github.com/DiegoAutomata",
    label: "Github",
  },
];

const skillCategories = [
  {
    title: "Artificial Intelligence",
    skills: ["LangGraph", "Agent SDK", "RAG Architectures", "Prompt Engineering", "MCP"],
  },
  {
    title: "Development",
    skills: ["TypeScript", "Next.js 16", "React", "Tailwind CSS", "Supabase", "Python"],
  },
  {
    title: "Backend & Cloud",
    skills: ["PostgreSQL", "Redis", "Docker Swarm", "Google Cloud Platform", "RESTful APIs"],
  },
  {
    title: "DevOps & Automation",
    skills: ["n8n", "Crawl4AI", "Git/CI/CD", "Vercel"],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        Diego Lezana
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in max-w-2xl px-4">
        <h2 className="text-sm text-zinc-500">
          AI &amp; Full-Stack Developer · Founder de{" "}
          <Link
            target="_blank"
            href="https://lezrai.com"
            className="underline duration-500 hover:text-zinc-300"
          >
            Lezrai
          </Link>
        </h2>
        <p className="mt-4 text-xs text-zinc-600 leading-relaxed">
          Orquestación de agentes de IA · Arquitecturas RAG · Model Context Protocol (MCP)
        </p>

        <div className="mt-6 flex items-center justify-center gap-6">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-zinc-500 duration-500 hover:text-zinc-300"
            >
              {s.icon}
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <p className="text-xs font-medium text-zinc-400 mb-1.5">{cat.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[10px] border rounded-full text-zinc-500 border-zinc-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2">
          <p>
            <span className="text-zinc-400">📍</span> San Carlos de Bariloche, Argentina
          </p>
          <p>
            <span className="text-zinc-400">🎓</span> Ing. en IA — UNSTA (Egreso 2028)
          </p>
          <p>
            <span className="text-zinc-400">🏅</span> Palo Alto Networks · SecOps, Cloud &amp; Network Security
          </p>
          <p>
            <span className="text-zinc-400">🗣️</span> Español (Nativo) · Inglés (Intermedio)
          </p>
        </div>
      </div>
    </div>
  );
}