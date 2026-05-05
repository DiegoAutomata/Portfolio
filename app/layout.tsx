import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://diegolezana.com"),
  title: {
    default: "Diego Lezana",
    template: "%s | Diego Lezana",
  },
  description:
    "Diego Lezana — AI & Full-Stack Developer. Founder de Lezrai. Especializado en orquestación de agentes de IA con LangGraph y Agent SDK, arquitecturas RAG y Model Context Protocol (MCP). Stack: TypeScript, Next.js, React, Supabase.",
  keywords: [
    "AI Developer",
    "Full-Stack Developer",
    "AI Engineer",
    "LangGraph",
    "Agent SDK",
    "RAG Architectures",
    "Model Context Protocol",
    "MCP",
    "AI Agents",
    "Orquestación de Agentes",
    "TypeScript",
    "Next.js",
    "React",
    "Supabase",
    "Prompt Engineering",
    "Docker Swarm",
    "n8n",
    "Inteligencia Artificial",
    "Lezrai",
    "Diego Lezana",
    "Bariloche",
    "Argentina",
  ],
  authors: [{ name: "Diego Lezana" }],
  creator: "Diego Lezana",
  openGraph: {
    title: "Diego Lezana — AI & Full-Stack Developer",
    description:
      "AI & Full-Stack Developer | Founder de Lezrai. Orquestación de agentes de IA, arquitecturas RAG y MCP.",
    url: "https://diegolezana.com",
    siteName: "Diego Lezana",
    images: [
      {
        url: "https://diegolezana.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "es-AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Diego Lezana — AI & Full-Stack Developer",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
