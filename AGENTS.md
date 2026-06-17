# Agents.md — E-commerce

## Project structure

Two independent packages (no monorepo tooling):

- `backend/` — Express 5 + MySQL2 (JWT auth, helmet, rate-limit)
  Entrypoint: `backend/server.js`
  Port: 5000 (default)
- `frontend/` — Vanilla HTML/CSS/JS, no framework, no build step
  Served via VS Code Live Server on port 5500

## Commands (run from `backend/`)

| Action | Command |
|--------|---------|
| Dev server (nodemon) | `npm run dev` |
| Start production | `npm start` |
| Init DB from schema | `mysql -u root -p ecommerce < schema.sql` |

## Database

- MySQL 8.0 via docker-compose (`backend/docker-compose.yml`) or local install
- Five tables: `users`, `products`, `orders`, `order_items`, `wishlist_items`
- Schema: `backend/schema.sql`
- DB uses utf8mb4 charset, connection pool with auto-retry and exponential backoff

## Setup

1. `cd backend && cp .env.example .env` — edit DB_PASSWORD, JWT_SECRET, FRONTEND_URL
2. `npm install` in `backend/`
3. Start MySQL, create `ecommerce` DB, import `schema.sql`
4. `npm run dev`
5. Open frontend with Live Server (right-click `frontend/index.html` → Open with Live Server)

## Backend conventions

- All responses use envelope: `{ success: boolean, message: string, ... }`
- Always use safe wrappers from `utils/helpers.js` (safeNumber, safeArray, sanitizeString, escapeHTML) for input handling
- Auth: JWT Bearer token in `Authorization` header (cookie fallback via `accessToken`)
- Admin routes require `authMiddleware` + `authorizeRoles("admin")`
- Rate limits: auth endpoints 20 req/15min, API 120 req/min
- CORS allows: localhost:5500-5502, specific production URLs
- Graceful shutdown on SIGINT/SIGTERM; exits on unhandled rejection/exception

## Frontend conventions

- Shared API client: `window.CONFIG.API_BASE` (auto-detects localhost vs production)
- Utility helpers in `scripts/utils.js`: `notify(msg, type)`, `apiRequest(url, opts)`, `formatPrice(price)`, `getJSON`/`setJSON`
- Cart, wishlist, recentlyViewed stored in localStorage
- Deployed on Vercel; config in `frontend/vercel.json`

## Installed skills

| Skill | Usefulness in this repo |
|-------|------------------------|
| `nodejs-express-server` | Core skill; backend is Express 5, directly applicable to server setup and middleware patterns |
| `nodejs-backend-patterns` | Covers auth, routing, error handling patterns used throughout `backend/` |
| `mysql-best-practices` | DB is MySQL 8.0 with connection pooling; query safety, indexing, utf8mb4 concerns all apply |
| `api-design-principles` | REST API with envelope responses; useful for new endpoint design and consistency |
| `api-docs-generator` | No API docs exist; generates OpenAPI/JSDoc docs for Express routes |
| `deploy-to-vercel` | Frontend deployed on Vercel (`frontend/vercel.json` exists) |
| `modern-javascript-patterns` | Vanilla JS frontend + Node.js backend; no framework or build step, so JS patterns matter |
| `responsive-design` | E-commerce frontend in vanilla HTML/CSS must be mobile-friendly |
| `css` | Vanilla CSS, no framework; useful for consistent styling patterns |
| `semantic-html` | Vanilla HTML frontend; semantic markup aids SEO and accessibility for product/cart pages |
| `core-web-vitals` | No build step means manual perf optimisation; LCP/CLS relevant for product listing pages |
| `accessibility-compliance` | E-commerce checkout/forms need ARIA and keyboard support |
| `wcag-audit-patterns` | Audit companion to accessibility-compliance; useful before release |
| `conventional-commit` | `CONTRIBUTING.md` has no commit format requirement; optional if team adopts it |

## What's not here

- No test framework, no lint config, no typecheck, no CI workflows, no formatter config
- No build step for frontend
- No package manager at root (root `package.json` is a leftover with express-rate-limit only)

## Conventions from CONTRIBUTING.md

- Branch: `main` (production), `develop` (latest), `feature/*`, `fix/*`
- PRs target `develop`, include screenshots for UI changes
- No convenventional commits needed — `CONTRIBUTING.md` says nothing about commit format
