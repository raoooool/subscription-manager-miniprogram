# Repository Guidelines

## Project Structure & Module Organization
- `docs/`: product, client, and server design docs (Chinese).
- `server/`: NestJS + Drizzle ORM backend. Key subpaths: `src/` (application modules), `src/database/` (Drizzle schema and connection), `drizzle/migrations/` (generated SQL), `test/` (e2e specs), `dist/` (build output). Keep new modules in `src/` grouped by domain with module/controller/service files co-located.

## Build, Test, and Development Commands
- Install: `cd server && yarn install && cp .env.example .env`.
- Local dev: `yarn start:dev` (watch mode, uses `.env`).
- Lint/format: `yarn lint`, `yarn lint:fix`, `yarn format`, `yarn format:check`.
- Tests: `yarn test` (unit), `yarn test:e2e`, `yarn test:cov`, `yarn test:watch`.
- Build: `yarn build`; run compiled output with `yarn start`.
- Database: `yarn drizzle:generate` (emit SQL from schema), `yarn drizzle:migrate` (apply), `yarn drizzle:studio` (inspect).

## Coding Style & Naming Conventions
- Language: TypeScript (Node >= 18.18, Yarn 1.x). Prefer NestJS module patterns and DI.
- Formatting: Prettier enforces single quotes, trailing commas, 100-char line width, semicolons, arrow parens. Run `yarn format` before commits.
- Linting: ESLint with `@typescript-eslint`, `import` order (builtins/external, internal, then relative; alphabetized; blank line between groups) and explicit member accessibility (no `public` keyword).
- Indent with 2 spaces; keep one responsibility per file; name files in `kebab-case` (e.g., `billing.module.ts`).

## Testing Guidelines
- Framework: Jest + ts-jest + Supertest for e2e (`test/app.e2e-spec.ts`).
- Name tests as `*.spec.ts` or `*.e2e-spec.ts`. Co-locate unit specs beside code or under `test/` for e2e.
- Aim for meaningful coverage on new endpoints/services; add assertions for both success and expected failures.
- Use `.env` test overrides if needed; avoid hitting shared DBs—prefer local MySQL + isolated schema.

## Commit & Pull Request Guidelines
- Commit style follows Conventional Commits (`feat:`, `fix:`, `chore:`) as seen in history; emoji is optional but keep type prefix.
- Keep commits scoped and descriptive; include migration or schema notes when touching Drizzle schema/migrations.
- PRs should state purpose, linked issue/story, setup notes, and screenshots for behavioral changes (HTTP responses, logs, or DB diffs if UI is absent).
- Before opening a PR: run lint, format check, and the relevant test suite; mention skipped tests or known gaps explicitly.

## Environment & Configuration
- Copy `.env.example` to `.env` and provide MySQL/Redis endpoints plus app port. Do not commit real secrets.
- After changing `src/database/schema.ts`, regenerate/apply migrations (`yarn drizzle:generate`, `yarn drizzle:migrate`) under `server/drizzle/migrations/`.
- Structured logging uses Pino; prefer dependency injection for config (`@nestjs/config`) instead of reading env directly.
