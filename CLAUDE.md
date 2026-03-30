# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ioBroker documentation website and CMS serving https://www.iobroker.net. Combines a Node.js/Express backend (`engine-2/`) with a React SPA frontend (`engine-2/front-end/`). Processes multilingual markdown documentation (de, en, ru, zh-cn) from `docs/` into a searchable website.

**Note:** The README references an older `engine/` directory with Gulp. Active development uses `engine-2/` with a custom task-based pipeline.

## Commands

All commands run from `engine-2/` unless noted otherwise.

### Build Pipeline (Documentation Processing)

```bash
npm run buildDocs          # Full 10-step pipeline (clean, blog, adapters, sync, FAQ, docs, copy, build)
npm run 0.clean            # Remove generated language dirs from frontend
npm run 2.downloadAdapters # Download adapter READMEs from GitHub
npm run 5.syncDocs         # Translate docs via Google Cloud Translate (requires GOOGLE_APPLICATION_CREDENTIALS_JSON)
npm run 8.copyFiles        # Copy processed markdown to front-end/public/<lang>/
npm run 10.build           # Build frontend only (npm install + vite build in front-end/)
npm run buildOnly          # Alias for step 10 only
```

### Backend

```bash
npm run buildBackend       # tsc -p tsconfig.build.json
npm start                  # node main (serves on port 5001)
```

### Frontend (from `engine-2/front-end/`)

```bash
npm run dev                # Vite dev server on :5173 (proxies /api/iobroker to www.iobroker.net)
npm run build              # tsc + vite build -> build/
npm run lint               # eslint -c eslint.config.mjs
npm run lint:fix           # eslint --fix
```

### Utilities

```bash
npm run i18n=>flat         # Convert i18n JSON to flat text for translation
npm run flat=>i18n         # Convert flat text back to i18n JSON
npm run translate          # Translate UI strings
npm run syncDocsTest       # Test doc sync without applying
npm run downloadAdapterTest # Test adapter download
```

## Architecture

### Backend (`engine-2/src/`)

Express server (TypeScript) with:
- `main.ts` - Entry point, loads `config.json`, initializes search
- `lib/web.ts` - Routes, CORS, rate limiting (express-brute), static file serving from `front-end/build/`
- `lib/search.ts` - MiniSearch full-text indexing of markdown files. API: `GET /search?ln=<lang>&q=<query>`
- `lib/utils.ts` - YAML frontmatter extraction, title parsing

### Frontend (`engine-2/front-end/src/`)

React 19 + Vite + Material-UI v7 + TypeScript SPA:
- Hash-based routing via react-router-dom v7
- `pages/` - HomePage, DocsPage, AdaptersPage, InstallationPage, etc.
- `components/` - Header, Footer, MarkdownView, DocsMenu, DocsTableOfContents
- `api/` - HTTP clients for backend
- `i18n/` - UI translation JSON files
- `theme/` - MUI theme with dark mode support
- Markdown rendering via react-markdown + rehype-raw + remark-gfm
- Charts via echarts-for-react, API state via TanStack React Query

### Build Pipeline (`engine-2/tasks.js`)

The core orchestrator (~21KB). 10-step pipeline driven by CLI flags (`--0.clean`, `--1.blog`, etc.):
1. Clean generated dirs
2. Process blog posts from `/blog/`
3. Download adapter READMEs from GitHub
4. Fetch jsonConfig docs
5. Fetch vis.cordova docs
6. Sync/translate docs across languages (Google Cloud Translate)
7. Process FAQ
8. Build navigation from `docs/content.md`
9. Copy files to `front-end/public/<lang>/`
10. Build frontend

### Documentation Sources

- `docs/<lang>/` - Markdown files with optional YAML frontmatter (`title`, `translatedFrom`, `editLink`, `hash`)
- `docs/content.md` - Navigation/menu structure definition
- `blog/` - Blog post markdown sources
- English (`en`) is the base language; others are translated from it

### Config

`engine-2/config.json` - Server port (5001), supported languages, static file paths, upload secret.

## Code Style

- ESLint via `@iobroker/eslint-config` (shared ioBroker config)
- Prettier via `@iobroker/eslint-config` (included)
- TypeScript strict mode, ES2022 target
- Frontend output dir is `build/` (not default `dist/`)
