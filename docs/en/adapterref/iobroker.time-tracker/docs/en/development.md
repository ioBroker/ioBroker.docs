---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
---
# Development

Repository, scripts, tests and release. The binding rules are in [`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md); the
[README](/#/adapters/time-tracker) describes the adapter for users.

## Layout

```
src/          adapter sources (TypeScript)
src-www/      progressive web app (Vite + React + MUI) — built into www/
src-shared/   types and checks that adapter and web app share
admin/        jsonConfig of the instance and translations (11 languages)
test/         package and integration tests (@iobroker/testing)
test/e2e/     browser tests (Playwright, own server without ioBroker)
docs/en/      documentation in English
docs/de/      documentation in German (the original text)
```

## Scripts

| Script                     | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| `npm run build`            | compile the TypeScript sources                                             |
| `npm run watch`            | compile and wait for changes                                               |
| `npm run install:pwa`      | install the dependencies of the web app (`src-www`, own `node_modules`)    |
| `npm run build:pwa`        | build the web app, type-checked, into `www/`                               |
| `npm run dev:pwa`          | Vite dev server with `/api` proxy to the running instance                  |
| `npm run lint`             | ESLint (`@iobroker/eslint-config`) for adapter and web app                 |
| `npm run check`            | TypeScript type check (adapter and web app)                                |
| `npm run test:ts`          | unit tests of the adapter sources                                          |
| `npm run test:package`     | check `package.json` / `io-package.json`                                   |
| `npm run test:integration` | adapter start against a real js-controller (packs `build/` and `www/`)     |
| `npm run e2e`              | browser tests (Playwright) against `test/e2e/server.mjs`                   |
| `npm run coverage`         | unit tests with a coverage report                                          |
| `npm run translate`        | align the 11 translation files                                             |
| `npm run check:i18n`       | check that all 11 languages are complete                                   |
| `npm run check:adapter`    | local pre-check of the ioBroker rules ([`adapter-check.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/adapter-check.md)) |
| `npm run version:bump`     | raise the version, maintain the changelog and `common.news`                |
| `npm run version:check`    | check version, changelog and the length limits of the lists                |
| `npm run push:approve`     | approve the current commit for the push (ask the owner first)              |
| `npm run release`          | create a release (version, changelog, tag)                                 |
| `dev-server watch`         | start and debug the adapter locally                                        |

## Building

For a release **both** outputs are needed — `build/` (adapter) and `www/` (web app):

```bash
npm run install:pwa
npm run build:pwa
npm run build
```

`node tools/make-pwa-icons.mjs` regenerates the app icons (they are part of the repository, no image library needed).

## Open

- **Acceptance run on real hardware:** done — the PDF rendering for `ru`, `uk`, `zh-cn` and Polish works (Unicode font
  through `report_font_path`, checked by the owner on 01.10.2026). The **import of the old data** of the predecessor
  system is not part of the scope — the reasoning is in [`decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md).
- **Publication:** the package is on npm (the CI publishes it through npm trusted publishing with provenance); the entry
  in `ioBroker.repositories` has been requested ([PR #6702](https://github.com/ioBroker/ioBroker.repositories/pull/6702))
  and is waiting for review.
- **Smaller gaps:** the machine-translated language files of the web app are waiting for a review by native speakers.
  The earlier wish “NFC convenience in the admin area” is **done** — instead of a phone NFC app (which only Android
  Chrome can do), every ioBroker state triggers an action now (see the README, “Actions”): the adapter subscribes to the
  states of the table, fires on a change of the value (per rule also on every write) and punches, rounds or sets the
  presence.

## Package boundaries (and what the ioBroker repochecker says about them)

The adapter has **two** `package.json` files: the root for the adapter itself (runtime dependencies such as
`better-sqlite3`, `pdfkit`, `exceljs`, `luxon`, `ws`) and `src-www/` for the web app (React, MUI, i18next, `qrcode`, …).
The web app is **pre-built** with `npm run build:pwa` and then lies in `www/` as a finished bundle; nothing of it is
loaded while the adapter runs.

The repochecker reads the sources for imported packages and skips only a **fixed** list of folders (`excludedSourceDirs`
in `lib/M5000_Code.js`: `/admin`, `/build`, `/docs`, `/test`, `/tools`, `/www`, `/src-www`, `/src-vis`, `/src-widgets`,
…). The earlier folder name `src-pwa/` was not on it, so the checker reported `W5042` (“Package … is used in source
file(s) but not found in dependencies of package.json”) for react, MUI and i18next — packages that belong to the web
app (`src-www/package.json`) and that an adapter installation should not bring along. With `src-www/` the folder is on
the list and the messages are gone; only `dependencies` count, `@types/*` and `@iobroker/types` are the exception.
`W5049` (`process.env` in `test/e2e/server.mjs`) concerns the **test server** of the browser tests, not the adapter.
`S1039` suggests the compact mode — the adapter brings its own HTTP port and an SQLite file and deliberately does **not**
run in compact mode (`common.compact: false`).

**Licence information:** `common.licenseInformation` (`{ type: "free", license: "MIT" }`) is set — and **no**
`common.license` may stand next to it: the ioBroker package test (`npm run test:package`) rejects both together
(“common.license should not exist together with common.licenseInformation”). The licence entry in `package.json`
(`"license": "MIT"`) is not touched by that and has to match. The 0.1.7 pipeline failed exactly on this, which is why
`npm run test:package` is on the checklist before every release.

## Object structure (E3009, E1011, E6001)

The ioBroker bot checks the object list of a running system (“Object Structure Check – `time-tracker.0.json`”). For
**every** state it demands the parent objects: `users.<id>.todayWorkedMinutes` needs the channel `users.<id>` **and** the
channel `users`. If one of them is missing, the check reports `E3009` (“missing intermediate object”) for every affected
object — in PR #6697 these were **126 messages from a single missing channel** (`users`).

That is why `createUserChannel` (`src/lib/adapter/states.ts`) creates the root channel `users` as well, idempotently
through `setObjectNotExists`; the other channels (`info`, `company`, `events`, `commands`) are created in their
respective `create…States` functions.

Two more findings of the same check:

- **`E1011`** — `common.write` has to fit the role: `value` is a **reading** role, so the writable
  `commands.punchUserId` carries `level` now.
- **`E6001`** — every object name should carry the **eleven** languages that `common.titleLang` and the news already
  have. The texts live in **one** place (`src/lib/adapter/stateNames.ts`), and `src/lib/adapter/states.test.ts` fails as
  soon as a name lacks a language.

Because `setObjectNotExists` leaves existing objects untouched, `ensureObject` in `states.ts` updates the
**adapter-owned** fields with `extendObject` after creating them (`name`, `type`, `role`, `read`, `write`, `unit`) —
without that, running installations would keep their old definition: the object dump that the checker reads would still
show `role: "value"` (`E1011`) and the old `en`/`de` names (`E6001`). `common.custom` is left out, it holds the settings
of the user (for example for `history`).

## Events (`events.*`)

`events.lastType`, `lastUser`, `lastDirection` and `lastSource` mirror the **newest** event. They are filled from the
**event bus** of the API: `onReady` subscribes to it (`api.events.subscribe`) and writes every event into the object
tree through `publishEventState` — it also refreshes the figures when the event concerns the numbers
(`FIGURES_EVENT_TYPES`).

**Every** way therefore publishes to the bus: the REST API, the kiosk terminal, the command states (`commands.*`), a
`sendTo` message (`punch`, `present`), the action/trigger rules, the automatic rules and the presence state
(`users.<id>.present`). The pure layers deliver the result for that, and the adapter layer builds the event from it
(`punchEvent` in `commands.ts`, `presenceEvent` in `presence.ts`) — a new way without this step shows up exactly here:
the booking is in the database, but `events.*` stays at the previous event.

## After the renaming: two more rules

The change to `ioBroker.time-tracker` made two things visible that could not apply before:

- **`common.news` applies per npm package** (repochecker `E2004`): every version named there has to be on npm under
  **this** name. The 0.1.x versions exist only under the former package `iobroker.zeiterfassung`, which is why the news
  list starts with 0.2.0 — `CHANGELOG_OLD.md` explains the history.
- **`bluefox` has to be a co-owner of the npm package** (repochecker `E2001`): `npm owner add bluefox
  iobroker.time-tracker` or invite on npmjs.com — without it no adapter is taken into `latest`. `npm run version:check`
  reminds of it as a **warning** (bluefox has to accept the invitation himself, so the point does not block the push).

`npm run version:check` checks the news versions against npm (error) and the owner list of the package (warning);
offline both points are skipped, so the check keeps running.