---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
---
# Checking the adapter rules

Two stages: `npm run check:adapter` (local, offline) and the official checker (`npx @iobroker/repochecker`) as soon as
the repository is on GitHub.

## 1. Local pre-check (offline)

```powershell
npm run check:adapter
```

`tools/check-adapter.ps1` checks the rules of the official checker that can be evaluated **without** GitHub and names
the rule it applies:

| Rule               | Checks                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| W0066/S0067        | `@types/node` covers the minimum Node version of `package.json` → `engines.node`                            |
| (tsconfig)         | `@tsconfig/nodeNN` matches the minimum Node version                                                         |
| (generate-adapter) | `.create-adapter.json` → `nodeVersion` matches `engines.node`                                               |
| W5052/W5053        | every `"type": "password"` in `admin/jsonConfig.json` is in `protectedNative` **and** `encryptedNative`     |
| E5049/E5050        | no `process.env`/`process.exit` in the source code as long as `common.compact` is not `true`                |
| W8918              | no ioBroker workflow action without a version tag (`@main`/`@master`)                                       |
| W6021              | `## License` is the **last** section of `README.md`                                                         |
| E510               | `common.news` of the newest version contains all 11 languages                                               |
| W438               | `.vscode/settings.json` contains `json.schemas`                                                             |

Exit code 1 (with `-FailOnIssue`) on errors; warnings and notes let the run pass.

Not part of this stage, because the checker reads the **file list of the repository** and the **project settings** from
GitHub for them: published version numbers, release notes, `package-lock.json` against `engines.node`, the Dependabot
configuration, the comparison of the licence file, the rights of the actions and the structure of `objects`/
`instanceObjects`. That is why the second stage stays binding.

The checker examines button states (`role: "button"` with `read: false`, `write: true`) structurally; in this project
the unit tests in `src/lib/adapter/states.test.ts` cover that — they also secure the **object structure**: every state
needs its parent channels. The “Object Structure Check” of the ioBroker bot checks that against the object list of a
running system and otherwise reports `E3009` (“missing intermediate object”) — in PR #6697 these were **126 messages
from a single missing channel** (`users`). The root channel is created in `createUserChannel` now.

## 2. Official checker (with a published repository)

The checker always reads project data through the GitHub API and stops without a repository with
`[E0000] FATAL: cannot access repository https://api.github.com/repos/…` — so `--local` alone does not work. As soon as
`https://github.com/sadam6752-tech/ioBroker.time-tracker` exists:

```powershell
npx @iobroker/repochecker@latest https://github.com/sadam6752-tech/ioBroker.time-tracker --local
```

`--local` reads the files from the working directory (the local state instead of the pushed one); the repository
metadata still comes from GitHub. For higher GitHub rate limits a token can be passed with `--env <file>` containing
`GITHUB_TOKEN=…`.

## Deliberate deviations

- `common.compact: false` — the adapter binds its own HTTP port and keeps an SQLite file (`WAL`) open for its whole
  run time; it therefore runs as a process of its own on purpose. The local check reports that as a **note**, the
  official checker as a warning (`W5049`).
- No `process.env`/`process.exit` in the source code: the configuration comes exclusively from `adapter.config`, and the
  adapter lifecycle ends the process. That meets the requirement the checker otherwise makes of the compact mode.