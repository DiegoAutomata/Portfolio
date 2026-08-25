# Portfolio de Diego Lezana

Portfolio técnico personal de [Diego Lezana](https://www.linkedin.com/in/diego-lezana-ai), Applied AI Engineer y fundador de [Lezrai](https://lezrai.com).

El sitio reúne proyectos de agentes de IA, arquitecturas RAG, automatizaciones, integraciones y aplicaciones web. Cada caso se publica desde un archivo MDX con su problema, solución, arquitectura y enlaces relacionados.

## Proyectos incluidos

- **MultiAgente RAG** — sistema de búsqueda documental con asistentes especializados y control de alucinaciones.
- **Rubi Lentes** — comercio electrónico con asistencia de IA, WhatsApp y gestión de productos.
- **Vosstudio** — experiencia web multilingüe orientada a captación y conversión.
- **Agente de creación de contenido** — flujo asistido por IA para investigar y producir contenido.
- **Natural Mystic** — comercio electrónico con catálogo, carrito y checkout.
- **Vértice Extremo** — aplicación demostrativa de turismo de aventura con asistente y reservas.

Los casos se mantienen en [`content/projects`](./content/projects) y se muestran únicamente cuando declaran `published: true`.

## Stack

- Next.js 13 con App Router
- React y TypeScript
- Tailwind CSS y Framer Motion
- Contentlayer y MDX para los casos
- Upstash Redis para métricas de visualización
- Vercel o Docker para despliegue

## Desarrollo local

Requisitos: Node.js 18+ y pnpm 10.

```bash
git clone https://github.com/DiegoAutomata/Portfolio.git
cd Portfolio
pnpm install
cp .env.example .env.local
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000`.

Las variables de Upstash son opcionales para navegar el portfolio localmente; sin ellas, el sitio utiliza valores de respaldo para las visualizaciones.

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Comandos

```bash
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción y generación de contenido
pnpm start    # servidor de producción
pnpm fmt      # formato y análisis estático con Rome
```

## Añadir un proyecto

1. Crear un archivo `.mdx` dentro de [`content/projects`](./content/projects).
2. Completar el frontmatter siguiendo los casos existentes.
3. Marcar `published: true` cuando el contenido y sus enlaces estén verificados.
4. Ejecutar `pnpm build` antes de publicar.

## Autoría y atribución

El contenido, la selección de proyectos y las adaptaciones de este portfolio pertenecen a Diego Lezana.

La base visual y técnica deriva del portfolio open source [`chronark.com`](https://github.com/chronark/chronark.com), creado por Andreas Thomas y utilizado bajo licencia MIT. El aviso de copyright original se conserva en [`LICENSE`](./LICENSE), tal como exige esa licencia.

## Licencia

Código distribuido bajo [MIT](./LICENSE). Las marcas, textos, imágenes y materiales de cada proyecto pueden tener condiciones propias y no quedan relicenciados automáticamente por la licencia del código.

