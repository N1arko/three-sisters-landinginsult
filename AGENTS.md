# Repository Guidelines

## Project Structure & Module Organization

- `src/`: React + TypeScript source (`main.tsx`, `App.tsx`, UI components, co-located assets).
- `public/`: Static files served as-is (favicons, static images).
- `dist/`: Build output from Vite; do not edit by hand.
- Root config: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `postcss.config.cjs`, `package.json`.

## Build, Test, and Development Commands

- Install dependencies: `pnpm install` (or `npm install`).
- Start dev server: `pnpm dev` – Vite dev server with hot reload.
- Build for production: `pnpm build` – type-checks (`tsc -b`) and runs `vite build`.
- Preview built app: `pnpm preview` – serves the production build (run after `pnpm build`).
- Lint code: `pnpm lint` – runs ESLint on the entire project.

## Coding Style & Naming Conventions

- Use TypeScript, React function components, and hooks; avoid class components.
- Prefer 2-space indentation and small, focused components/helpers.
- Name components in `PascalCase` (e.g., `PdfLandingHero`), hooks in `camelCase` starting with `use`.
- Place co-located assets under `src/assets/...` with descriptive, kebab-case filenames.

## Testing Guidelines

- No formal test suite yet; when adding tests, prefer Vitest + React Testing Library.
- Name test files `*.test.tsx` or `*.test.ts` under `src/`.
- Focus tests on user-visible behavior, key flows, and regression coverage.

## Commit & Pull Request Guidelines

- Follow conventional commits (e.g., `chore: scaffold Vite + Tailwind v4 project`, `feat:`, `fix:`, `refactor:`).
- Keep commits small and focused; explain what changed and why.
- Pull requests should include a concise summary, screenshots for UI changes, and links to related issues/tasks.

## Agent-Specific Instructions

- Treat `dist/` and lockfiles as generated artifacts; avoid editing them unless explicitly requested.
- Prefer minimal, targeted changes that match existing patterns and Tailwind utility usage.
