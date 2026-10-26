---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
---
# Contributing

The German original of this document is in [`docs/de/CONTRIBUTING.md`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/CONTRIBUTING.md).

## 1. Basic rule: clean room (binding)

This project is an **implementation of its own** and **not** a derived version of another time tracking system. The basis
is the **internal specification**: it lives outside this repository and is **not published**. Only the adapter
description (`README.md`), these contribution rules and the source code are published (see section 6).

**Not allowed**

- Taking over code, comments, message texts, class or variable names from other projects — not even “copy and rename”.
- Porting or translating foreign code automatically (transpiler, LLM conversion).
- Rebuilding the file or class structure of other projects as the own module structure.

**Allowed**

- Technical facts that are needed to keep using existing data: file and data formats, field indices and units
  (`users.txt`, `userdaten.txt` index 0–17, `Timetable/<year>.<month>`, `A<year>`, `absenz.txt`).
- Calculation rules, behaviour and rounding rules (documented in the internal specification).
- Short technical identifiers in the documentation, for traceability.

**Own identifiers in the code** (English, consistent):
`_Vorholzeit_pro_Jahr` → `vorholzeit_per_year`, `_zuschlag` → `shift_rules`, `Timetable` → `time_entries`,
`_modell` → `overtimeModel`, `absenz.txt` → `absenceTypes`.

## 2. Way of working

1. **Spec first:** record behaviour in the **internal specification** first (it lives outside this repository and is not
   published).
2. **Tests before implementation:** create golden files and fixtures from **observed outputs** of the reference
   installation or from the existing data — never derive them from foreign code.
3. **Implement** and adapt the specification where it deviates — do not look up foreign code as a reference to make an
   implementation “fit”.
4. Changes of the specification are maintained in the same step as the code and mentioned briefly in the PR text (the
   specification itself is not published).

## 3. PR checklist

- [ ] No code, comment or identifier taken over from a foreign project (compared against the specification, result named
      in the PR).
- [ ] Internal specification updated if behaviour or format is affected (mentioned in the PR text).
- [ ] Tests added or adapted (unit/integration; golden file for calculation logic).
- [ ] i18n: new texts added to `en.json` only, `npm run translate` run, `npm run check:i18n` green (all 11 languages
      complete).
- [ ] Licence and provenance notes still correct (`LICENSE`, section “Provenance” in `README.md`).
- [ ] No foreign files, archives or data copies in the commit (`*.zip`, foreign directories).
- [ ] New/changed states: `common.role`, `common.type`, `common.read`, `common.write` fit together — no generic role
      `state`, `button` → `boolean` with `read:false`/`write:true`, role `json` → `common.type = "string"`.
- [ ] New texts in `common.news` of the current version added in **all 11 languages** (the adapter checker reports
      missing translations of the newest version as an error).
- [ ] Secrets only through `encryptedNative`/`protectedNative`; no clear text in `native` or in logs.
- [ ] Result of the adapter checker named in the PR as soon as the adapter skeleton exists
      (`npx @iobroker/repochecker <repo-url> --local`).

## 4. Code conventions

- **TypeScript** (strict), ESLint with `@iobroker/eslint-config`, Prettier; no German identifiers in the code (exception:
  domain terms that are documented on purpose, e.g. `vorholzeit_per_year`).
- **Adapter tests:** `@iobroker/testing` — `tests.packageFiles` (checks `package.json`/`io-package.json`) and
  `tests.integration` against a js-controller; the supplied unit mocks are deprecated.
- **Own logic:** Mocha with ts-node and chai for calculation and time zone cases (`test/mocharc.custom.json`),
  Playwright for the end-to-end tests of the PWA, `npm run coverage` (`nyc`) for the coverage — the coverage run
  deliberately skips the type check (`test/mocharc.coverage.json`), because a type-checking ts-node under `nyc` fails on
  the adapter types; `npm run check` stays the type gate; test names describe scenario and expectation (“builds pairs by
  (ts_utc, id)”, not “test1”).
- **Web app (`src-www/`):** a project of its own with its own `package.json`/`tsconfig.json` (React 18, MUI 5, Vite).
  Flow: `npm run install:pwa` → `npm run build:pwa` (type check + build into `www/`) → `npm run lint:pwa`; during
  development `npm run dev:pwa` (forwards `/api` to the running instance). The app talks to the adapter only through the
  API prefix `/api`, keeps the session in `localStorage` and queues punches offline (`idempotencyKey` per punch).
  Permissions are **always** decided by the server; the UI only hides what would be forbidden anyway. New texts belong in
  `src-www/src/i18n/en.json`.
- **Generated files:** `build/` and `www/` are generated and never edited directly.
- **States:** create objects with `setObjectNotExistsAsync`/`extendObject`; `common.name` (at least `en`+`de`),
  `common.type`, `common.role`, `common.read`, `common.write` are mandatory and have to match the role rules (see the PR
  checklist).
- **Configuration:** secrets belong in `encryptedNative`/`protectedNative`; the `native` block,
  `admin/jsonConfig.json` and `src/lib/adapter-config.d.ts` are kept in sync.
- **Times:** internally always UTC epoch **and** whole minutes; display through the time zone of the user.
- **Database:** changes only through versioned migrations (`schema_migrations`).
- **Errors:** API errors as `application/problem+json` with stable error codes (according to the internal
  specification).
- **Languages (i18n):** display texts only from the language files; add new texts **only** to the English base file and
  then run `npm run translate`. Details: [`docs/en/i18n.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/i18n.md).
- **Commits:** short, factual description in the imperative; one commit per logical change.
- **Integration test:** it runs against the **built** package (`npm pack` from `build/`). Always run `npm run build`
  before `npm run test:integration` — otherwise the test silently checks the previous state (visible by new log output
  missing in the test run).
- **Line endings and formatting:** line endings are **LF** (`.gitattributes`, `.editorconfig`, Prettier); CRLF makes
  `npm run lint` fail with hundreds of `prettier/prettier` errors. So correct formatting with
  `npx prettier --write "src/**/*.ts"` and **not** with `eslint --fix`: `--fix` adds empty JSDoc blocks for undocumented
  members and thereby creates errors (`jsdoc/no-blank-blocks`).

## 5. Security-relevant changes

This concerns in particular authentication, session/token handling, RBAC, audit and terminal endpoints. Such changes need:
a description of the risk, tests of the negative cases (permissions, CSRF, idempotency, `409`) and an update of the
security checklist in the internal specification.

## 6. What is published

| Document                              | Place                                              | Published                     |
| ------------------------------------- | -------------------------------------------------- | ----------------------------- |
| Adapter description                   | `README.md` (later also `adapter/README.md`)       | yes                           |
| Licence                               | `LICENSE`                                          | yes                           |
| Contribution rules (clean room)       | `CONTRIBUTING.md`                                  | yes                           |
| Provenance                            | section “Provenance” in `README.md`                | yes                           |
| Source code                           | `src/`, `src-www/`, `src-shared/`, `tools/`        | yes                           |
| Language files (11 languages)         | `admin/i18n/`, `src-www/src/i18n/`                 | yes (translations welcome)    |
| Documentation (English, German)       | `docs/en/`, `docs/de/`                             | yes                           |
| Internal specification                | outside this repository                            | **no**                        |
| Foreign projects, archives, data copies | outside this repository                          | **no**                        |

Rules for it:

- The internal specification is **never** copied into the repository; `.gitignore` contains a safety net for it
  (`PROJECT_PROMPT.md`, `docs/PROJECT_PROMPT.md`).
- References to section numbers of the specification do not belong in published files such as `README.md`; internal
  module READMEs describe the requirements in their own words.
- The provenance record is kept outside this repository and names the basis of the implementation and the statement “no
  foreign source code taken over”.

### Release procedure

1. `npm run version:bump patch` sets the version in `package.json`, `io-package.json` and in the changelog of the README.
   Add the news entries in **all 11 languages** afterwards — the bump copies only the first line.
2. `npm run version:check` (also checks that the lists do not grow: at most seven `common.news` entries and five
   versions in the README), `npm run check:i18n`, `npm test`, `npm run check:adapter` and `npm run e2e` (the latter
   **after** `npm run build && npm run build:pwa`, otherwise it checks an old state) have to be green — only then commit.
   After script-assisted changes always run `npm run lint`: eslint treats Prettier rules as errors, and a single
   expression that is too long makes the CI job `check-and-lint` fail. `lint` and `lint:pwa` run with
   `--max-warnings 0`, so a warning is as much an error as an error.
3. **Ask before the commit and the push.** The version commit and the tag go out only if the owner (Alex) says “ok”:
   directly before the release, the question is whether pushing is allowed or whether there are remarks. Only after
   this “ok” is the commit made, tagged and pushed.
4. Commit, **annotated** tag (`git tag -a vX.Y.Z -m 'X.Y.Z'`) and push with approval (`npm run push:approve`). The commit
   message of the version commit becomes the **release note** — the workflow writes its body onto the release page. It
   is therefore written **in English** (like the changelog entries in the README), so that the release page is readable
   for everybody.
5. **Wait until the workflow “Test and Release” is green for the tag — and then another 5 to 10 minutes:** the
   publication to npm runs at the end of the run and the registry index follows (measured: green run 17:37,
   `npm view … dist-tags` shows the version 17:42). Only then check.
6. A tag of a published version is **never deleted and pushed again**. That deletes the corresponding GitHub release,
   creates a red run (npm refuses a second publication of the same version) and changes nothing about the published
   package. If a tag is missing, only the tag is set again and the release is created from it in the GitHub interface.

## 7. Local dev server (ioBroker dev-server)

The development instance lives in `.dev-server/`: the admin on `http://127.0.0.1:8081`, the adapter with the web
interface on `http://127.0.0.1:8092`. It is started with

```powershell
npm run dev-server watch
```

The dev server builds the adapter, installs it into the dev instance (`npm pack` + `npm install`) and starts it itself;
with every change of the sources it restarts it after about two seconds.

Rules, important in this order:

1. **The instance stays disabled in the controller.** The dev server starts the adapter itself, and the controller must
   not start it in addition — otherwise every start request of the controller runs into `ADAPTER_ALREADY_RUNNING` (code
   7) and repeats every 30 seconds. Check and set (from `.dev-server/default`):

    ```powershell
    node node_modules/iobroker.js-controller/iobroker.js list instances
    node node_modules/iobroker.js-controller/iobroker.js object set system.adapter.time-tracker.0 common.enabled=false
    ```

    The log then says `Do not restart adapter system.adapter.time-tracker.0 because disabled or deleted`, and the
    adapter keeps running because the dev server holds it.

2. **Never start or restart the adapter in `ioBroker.admin`** while `dev-server watch` is running — a start from the
   interface enables the instance again and produces exactly the loop of rule 1. In the log it looks like this:
   `"system.adapter.time-tracker.0" enabled` → `started with pid …` → `terminated with code 7 (ADAPTER_ALREADY_RUNNING)`
   → `Restart adapter … because enabled`, every 30 seconds. The documentation of the dev server points that out
   explicitly. A restart is forced by saving a source file (the watcher takes over) or by restarting the whole chain.
3. Whoever wants to start and stop the adapter **from the admin interface** chooses one of the two modes — then only one
   side holds the adapter and a start/stop in the interface is unproblematic:
    - `npm run dev-server run` — the dev server does not start the adapter, the controller holds it. Hot reload exists
      only for the admin interface; code changes need `npm run build` and (with the dev server stopped)
      `npm run dev-server upload`.
    - `npm run dev-server watch --noStart` — the dev server still builds and synchronises automatically but does not
      start the adapter. It disables the instance at every start of its own (`adapter.common.enabled = false`, in the log
      `Stop <adapter>.0`), so start the adapter **once** afterwards — in the admin interface or with
      `node .dev-server/default/node_modules/iobroker.js-controller/iobroker.js start time-tracker.0`. After that the
      controller holds it; start, stop and restart in the interface are unproblematic. After a code change restart the
      adapter there so that the synchronised version is loaded.
4. **Only one dev server at a time** and **no additional `npm run build`** beside it: the dev server builds itself,
   parallel builds lead to race conditions and follow-up restarts.
5. If the instance hangs in the loop anyway, end all processes whose command line names the repository or `.dev-server`
   and restart `npm run dev-server watch --noStart`.
6. The Playwright suite (`npm run e2e`) starts a server of its own on port `8099` with an in-memory database and leaves
   the dev server untouched; it loads the adapter from `build/`, which is why `npm run build` is needed before.
7. For the call, pass `--no-browser-sync`: BrowserSync has failed once at the start on a race with the admin that was
   still starting (`ECONNREFUSED 127.0.0.1:20426`) and dragged the dev server down with it. The price is only that
   changes to the ioBroker admin interface are no longer reloaded automatically.

The data of the dev instance lives under `.dev-server/default/iobroker-data/time-tracker.0/` (database, `session-secret`,
`backups/`) and is not versioned.

## 8. Versioning and release

The version of the adapter is in **two** places and has to be the same: `package.json` (`version`) and `io-package.json`
(`common.version`). The check for that runs in `npm run test:package` and additionally through `npm run version:check`.

Rules:

1. **Nothing is pushed or published without approval.** Before a `git push` and before every version step
   (`npm run release …`), the maintainer is asked and the answer is awaited. Whoever wants to block the push switches the
   approval duty on in their working copy (local setting, not versioned):

    ```powershell
    git config zt.requirePushApproval true   # works only together with core.hooksPath = .githooks
    npm run push:approve                     # shows the open commits and approves exactly this commit
    git push                                 # now allowed — the next commit needs an OK again
    ```

    Without approval the pre-push hook aborts; switch it off permanently with `git config zt.requirePushApproval false`.

2. **Before every push, `npm run version:bump -- patch` raises the version** (or `minor`/`major`). The tool sets both
   version fields, renames the block “WORK IN PROGRESS” in the README to the new version, creates a fresh placeholder and
   adds `common.news` for the new version. Afterwards translate the news (`npm run translate` or by hand) and run
   `npm run version:check`, `npm run check:i18n` and the tests. The arguments belong behind `--`, otherwise npm swallows
   them (`npm run version:bump -- patch --dry` shows the procedure without writing).

3. **Every change gets its entry before the push** in the changelog of the README (`## Changelog`, newest section
   `### **WORK IN PROGRESS**`). This block must **not be empty** — the release tool refuses that. The version is **not**
   changed by hand for it.
4. **The changelog is in the README, not in a file of its own.** The release tool reads `CHANGELOG.md` only if it exists,
   and would then no longer maintain the README section. The README keeps the latest **five** versions
   (`--numChangelogEntries`, default 5); older ones move to `CHANGELOG_OLD.md` as soon as that file exists. Then a footer
   link to `CHANGELOG_OLD.md` has to stay in the README (the tool demands it).
5. **Publication happens through a tag.** The tag marks the version that is built in the CI and published through **npm
   trusted publishing** (without this approval in npm the deploy job fails):

    ```powershell
    git tag v0.0.2                   # mark the approved version
    npm run push:approve             # approval for the tag push
    git push --follow-tags           # push the tag — the CI publishes the package
    ```

    `npm run release <patch|minor|major>` stays available as an alternative: it raises the version, writes the changelog
    and `common.news` and tags in one go (see `.releaseconfig.json`, which runs `npm run build` first).

    **Both build outputs belong in the package.** The deploy job builds `build/` **and** `www/` before publishing (own
    `build-command`, because `build/` and `www/` are not in the repository); `npm run check:package` — automatically
    before `npm pack` and `npm publish` through `prepack` — makes the release fail if one of them is missing. The
    publications up to 0.0.6 contained no `www/` and answered `/` with `404 not_found`.

6. After every version step, check the `common.news` texts in all 11 languages or run `npm run translate` — the adapter
   checker demands them (rule E510). `npm run check:i18n` reports gaps.
7. **The pre-push hook** checks points 1 and 2 automatically. Activate it once per working copy:

    ```powershell
    npm run hooks:install
    ```

    It aborts the push if there is no approval for the commit, the version fields differ, the README changelog is missing
    or its newest section is neither “WORK IN PROGRESS” nor the current version. Skip it deliberately with
    `git push --no-verify`.