---
chapters: {"pages":{"en/adapterref/iobroker.sehybrid/README.md":{"title":{"en":"ioBroker adapter for SolarEdge hybrid inverters"},"content":"en/adapterref/iobroker.sehybrid/README.md"},"en/adapterref/iobroker.sehybrid/README_dev.md":{"title":{"en":"ioBroker.sehybrid — Developer Guide"},"content":"en/adapterref/iobroker.sehybrid/README_dev.md"}}}
---
# ioBroker.sehybrid — Developer Guide

Build, test and release documentation for the **sehybrid** adapter. For user-facing documentation see
[README.md](/#/adapters/sehybrid).

## Project layout

The adapter is split into two parts:

- **Backend** (the adapter itself) — TypeScript in `src/`, compiled with `build-adapter ts` into `build/`.
- **Admin UI** (the configuration page) — a declarative [jsonConfig](https://github.com/ioBroker/ioBroker.admin/tree/master/packages/jsonConfig)
  dialog in `admin/jsonConfig.json`, with per-language labels/error texts in `admin/i18n/<lang>.json`. There is
  no React/Vite/TypeScript application and no build step for the admin UI — the ioBroker admin renders the
  dialog directly from the committed JSON.

`npm run lint` and `npm run check` cover the backend only; the admin UI is plain JSON and needs no compilation.

> `build/` is generated output and is **not** committed to git. It is produced by `npm run build`. The admin
> UI source (`admin/jsonConfig.json`, `admin/i18n/*.json`, `admin/sehybrid.png`) is committed directly. Both
> are included in the published npm package via the `files` field in `package.json`.

## Prerequisites

- Node.js >= 22
- A local ioBroker environment is provided via `@iobroker/dev-server` (installed as a dev dependency).

## Getting started

Install dependencies:

```bash
npm install
```

Build the backend (the admin UI needs no build step):

```bash
npm run build
```

## Running in development

Run ioBroker locally with `dev-server` (admin on http://localhost:8081):

```bash
npm run dev-server        # admin-UI work: admin only, adapter not started
npm run dev-server:watch  # backend work: runs the adapter and restarts it on src/ changes
```

Use `dev-server:watch` when changing backend code in `src/` so the recompiled adapter restarts automatically.
Plain `dev-server` only starts the admin (lighter when working on the admin page).

> The admin UI needs no build step. After editing `admin/jsonConfig.json` or `admin/i18n/*.json`, push the
> changes with `npm run dev-server:upload` and refresh the browser — there is nothing to rebuild.

> The `dev-server` script runs with `--noBrowserSync` on purpose. BrowserSync (auto browser reload) interferes
> with the admin socket.io connection here, causing the UI to reconnect endlessly. Without it the admin
> WebSocket connects directly and reliably; you just refresh the browser manually after a change. To try the
> auto-reload variant, use `npm run dev-server:sync`.

## npm scripts

Run with `npm run <name>`.

| Script | Description |
|--------|-------------|
| `build` | Build the backend (TypeScript) into `build/`. |
| `build:ts` | Build only the backend into `build/`. |
| `watch:ts` | Rebuild the backend on change. |
| `dev-server` | Run the ioBroker admin for admin-UI development (adapter not started, no BrowserSync). |
| `dev-server:sync` | Same as `dev-server`, with BrowserSync auto-reload. |
| `dev-server:watch` | Run ioBroker **and** the adapter in watch mode (adapter restarts on `src/` changes). |
| `dev-server:upload` | Upload the adapter (needed after `io-package.json`, `admin/jsonConfig.json`, or `admin/i18n/*.json` changes). |
| `test:ts` | Run the `*.test.ts` unit tests. |
| `test:package` | Validate `package.json` and `io-package.json`. |
| `test:integration` | Test adapter startup against a real ioBroker instance. |
| `test` | Run unit tests and package validation. |
| `check` | Type-check the backend (no compilation). |
| `lint` | Lint the backend with ESLint. |
| `translate` | Translate admin texts, see [`@iobroker/adapter-dev`](https://github.com/ioBroker/adapter-dev#manage-translations). |
| `release` | Create a new release, see [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage). |

## Compilation config

The backend is compiled with [esbuild](https://esbuild.github.io/) via `@iobroker/adapter-dev`; adjust settings
in `tsconfig.json` / `tsconfig.build.json`. The admin UI has no compilation step: it is the declarative
`admin/jsonConfig.json` plus the `admin/i18n/<lang>.json` translation files, which the ioBroker admin renders
directly. To change the configuration dialog, edit those JSON files directly and push them with
`npm run dev-server:upload`.

## Testing

- **Unit tests** (`npm run test:ts`) — fast, run against the pure logic in `src/lib`.
- **Package validation** (`npm run test:package`) — checks `package.json` / `io-package.json` consistency.
- **Integration test** (`npm run test:integration`) — spins up a real js-controller and verifies the adapter
  starts. Slower (~30s).

To mirror the CI checks locally before pushing:

```bash
npm ci && npm run lint && npm run check && npm run build && npm run test:ts && npm run test:package && npm run test:integration
```

When adding features or fixing bugs, add matching unit tests. See
[test-driven development](https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92) for
background.

### State roles

Use the correct [state role](https://www.iobroker.net/#en/documentation/dev/stateroles.md) for each state.
Do not invent custom role names; if you need a role that is not in the official list, ask the ioBroker
developer community.

## Git workflow

- Work on the `dev` branch; open a pull request into `main`.
- `main` is the release branch. Pushes to `main`, pull requests, and `v*` tags trigger CI
  (`.github/workflows/test-and-release.yml`).
- Only version tags (`v<major>.<minor>.<patch>`) run the `deploy` job that publishes to npm.

## Releasing

Create a release with the [release script](https://github.com/AlCalzone/release-script#usage) from a clean
`main`:

```bash
npm run release
```

This bumps the version, updates `io-package.json` and the changelog, commits, tags `v<version>`, and pushes.
The tag push triggers the `deploy` job, which builds and publishes to npm.

### npm trusted publishing (OIDC)

Releases publish to npm using **trusted publishing** (OIDC) — no `NPM_TOKEN` is stored. The `deploy` job has
`id-token: write` and npm exchanges a short-lived token at publish time, also generating a signed provenance
statement.

Trusted publishing is configured once on the npm package settings page
(`https://www.npmjs.com/package/iobroker.sehybrid` → Settings → Trusted Publisher) with:

- Organization or user: `heresiarch`
- Repository: `ioBroker.sehybrid`
- Workflow filename: `test-and-release.yml`
- Environment name: *(empty)*
- **Allow npm publish** must be checked (and saved) for direct publishing.

> npm requires the package to already exist before a trusted publisher can be configured, so the very first
> version must be published once from the command line.

To get the adapter into the ioBroker repository, follow the
[ioBroker.repositories requirements](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

## Best practices

See the ioBroker
[development best practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices).

## Disclaimer

Respect copyrights and trademarks when using company names or logos. "SolarEdge" is a trademark of its
respective owner; this adapter is an independent, unofficial project and is not affiliated with or endorsed by
SolarEdge.