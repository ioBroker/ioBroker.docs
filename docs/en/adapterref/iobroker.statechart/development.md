---
chapters: {"pages":{"en/adapterref/iobroker.statechart/README.md":{"title":{"en":"ioBroker.statechart: reference"},"content":"en/adapterref/iobroker.statechart/README.md"},"en/adapterref/iobroker.statechart/development.md":{"title":{"en":"ioBroker.statechart: development"},"content":"en/adapterref/iobroker.statechart/development.md"}}}
---
# ioBroker.statechart: development

[Overview](https://github.com/IggePop/ioBroker.statechart/blob/main/README.md) | [Deutsch](https://github.com/IggePop/ioBroker.statechart/blob/main/docs/de/development.md)

```bash
npm install
npm run build                # build the adapter (src/ to build/) and the admin tab
npm run dev-server setup     # once: local ioBroker test instance in .dev-server/
npm run dev-server watch     # run it, admin on http://127.0.0.1:8081/, rebuilds the adapter on changes
npm run upload:tab           # in a second terminal: upload the tab into the test instance
```

The adapter and the editor are written in TypeScript. The editor imports the chart model, the validation
and the code generator directly from `src/lib/`, so they are shared by both.

| Script | Description |
|---|---|
| `dev-server` | Runs [`dev-server`](https://github.com/ioBroker/dev-server) with the given command. Before, it applies the patches in `patches/`: the dev-server uses `wmic.exe` to find the adapter process, which no longer exists in Windows 11 25H2, and a WebSocket connection reset by the browser (`ECONNRESET`) would crash it |
| `build` / `watch` | Build the adapter (`src` to `build`) and the tab (`admin/src` to `admin/build`), with type check |
| `build:ts` / `watch:ts` | Build only the adapter |
| `build:react` / `watch:react` | Build only the tab |
| `upload:tab` | Build the tab and write the admin files into the running dev-server instance (works while `dev-server watch` runs) |
| `test` | Unit tests (`src/**/*.test.ts` and `admin/src/**/*.test.ts`) and package tests |
| `check` | Type check of the adapter and the tab |
| `lint` | ESLint |
| `translate` | Translate the texts of the adapter |
| `release` | Create a new release |

After changes of `io-package.json`, run `npm run dev-server upload` and restart `npm run dev-server watch`.

While `dev-server watch` runs, it builds the adapter itself on every change in `src`. Do not run `npm run build` or
`npm run build:ts` meanwhile: they delete `build` first, and afterwards the dev-server may no longer copy the files
in `build/lib` into its instance. Restart `dev-server watch` if that happened.

**The built adapter (`build`) and tab (`admin/build`) are committed**, because installations from GitHub do
not run a build. After changes in `src` or `admin/src`, run `npm run build` and commit `build` and
`admin/build` as well. The workflow job `check-build` fails if they are outdated. The source maps are not
committed.

**Dependabot** proposes updates monthly. Patch updates (and minor updates of development dependencies) are
merged automatically when the checks pass, which are required for `main`. Dependabot cannot rebuild the
committed build, so `check-build` does not compare it in Dependabot pull requests. Instead, after every push to
`main`, it rebuilds `build` and `admin/build` and commits them if they changed. The workflows need the secret
`AUTO_MERGE_TOKEN`, a fine-grained personal access token for this repository with the permissions
"Contents" and "Pull requests" (read and write). Major updates of MUI, React and
`@types/node` are ignored: `@iobroker/adapter-react-v5` requires MUI 6 and React 18, and the adapter supports
Node.js 22.

**Releases:** `npm run release minor` (or `patch`, `major`) runs without questions with `--yes`. It moves the entries
under `WORK IN PROGRESS` in the changelog to the new version, updates `package.json` and `io-package.json`, builds,
commits, tags and pushes. The tag starts the job `deploy`, which publishes the package to npm with trusted publishing
(no npm token; on npmjs.com the trusted publisher must allow "npm publish") and creates the GitHub release. Stop
`dev-server watch` before, the release runs `npm run build`.

The automatic translation of the news breaks code examples and terms. So write the news of the next version by hand
right before the release, as entry `NEXT` in `common.news` of `io-package.json`, in all languages, and run the release
with `--all` (`npm run release minor -- --yes --all`): it renames `NEXT` to the new version, translates nothing, and
takes the uncommitted change into the release commit. Do not commit `NEXT` itself, the schema of `io-package.json`
only allows versions there, so the package tests fail.

| Path | Content |
|---|---|
| `src/main.ts` | Adapter: loads the charts, subscribes the inputs, restarts a chart when it is saved |
| `src/lib/chart-model.ts` | Chart model (shared by adapter and editor) and parser of the transition labels |
| `src/lib/chart-runtime.ts` | Execution of a chart with XState |
| `src/lib/chart-validation.ts` | Checks of conditions, actions and function blocks |
| `src/lib/chart-analysis.ts` | Static check of the chart: unreachable states, transitions never taken, unused variables, where the variables are used |
| `src/lib/chart-codegen.ts` | Code shown by "Show code" in the editor |
| `admin/src/` | Editor (React, React Flow, CodeMirror) |
| `admin/tab_m.html`, `admin/tab.css` | Page of the admin tab, the editor is loaded into it |