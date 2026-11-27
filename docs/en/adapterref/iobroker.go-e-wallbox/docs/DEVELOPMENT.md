---
chapters: {"pages":{"en/adapterref/iobroker.go-e-wallbox/README.md":{"title":{"en":"ioBroker.go-e-wallbox"},"content":"en/adapterref/iobroker.go-e-wallbox/README.md"},"en/adapterref/iobroker.go-e-wallbox/docs/DEVELOPMENT.md":{"title":{"en":"Development notes"},"content":"en/adapterref/iobroker.go-e-wallbox/docs/DEVELOPMENT.md"}}}
---
# Development notes

## Goal and scope

`go-e-wallbox` mirrors a go-e Charger into ioBroker states. It contains no charging logic and is meant to stay that
way: no surplus control, no schedules, no assumptions about what the user wants the wallbox to do.

The only source for the behaviour of the wallbox is the
[official go-e API documentation](https://github.com/goecharger/go-eCharger-API-v2) and measurements on real devices.
The adapter is written from scratch; code of other adapters is not used as a template.

## Layout

| Path                         | Content                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `src/main.ts`                | Adapter class: configuration, poll loop, object creation, write handling            |
| `src/lib/transport.ts`       | `ChargerTransport` interface: `read(keys)` and `write(key, value)`                  |
| `src/lib/httpV2Transport.ts` | Local HTTP API v2 (`/api/status?filter=…`, `/api/set?key=<json>`)                   |
| `src/lib/datapoints.ts`      | Table of all states: id, API keys, type, role, unit, value list, read/write mapping |
| `src/i18n/<lang>.json`       | Names of channels and states, key = id below the device (`src/lib/i18n.ts`)         |
| `src/lib/*.test.ts`          | Unit tests, compiled to `build/` and run from there (not part of the npm package)   |
| `admin/jsonConfig.json`      | Instance settings; texts in `admin/i18n/<lang>.json`                                |
| `test/package.js`            | Validation of `package.json` and `io-package.json`                                  |
| `test/integration.js`        | Starts the adapter in a real js-controller                                          |
| `scripts/check-release.mjs`  | Checks versions, news and release notes before a release                            |
| `docs/de/README.md`          | German readme; keep it in step with `README.md`                                     |

## Tools

| Tool                                                                        | Used for                                                             |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`@iobroker/testing`](https://github.com/ioBroker/testing)                  | Package and integration tests; also brings `mocha`                   |
| [`@iobroker/eslint-config`](https://github.com/ioBroker/eslint-config)      | Lint and formatting rules (`npm run lint`, `--fix` formats)          |
| [`@iobroker/adapter-dev`](https://github.com/ioBroker/adapter-dev)          | `npm run translate`: fills in missing languages                      |
| [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script)  | `npm run release`: version, changelog, news, commit, tag, push       |
| ioBroker GitHub actions (`testing-action-check`, `-adapter`, `-deploy`)     | CI: checks, tests on all systems, npm publication and GitHub release |
| [`@iobroker/repochecker`](https://github.com/ioBroker/ioBroker.repochecker) | Requirements of the ioBroker repository (run with `npx`, see below)  |
| Dependabot                                                                  | Monthly dependency update pull requests                              |

## How it works

- One poll loop per wallbox. Each cycle is a single filtered status request for exactly the keys the datapoints need,
  plus the user's additional keys.
- The serial number (`sse`) becomes the device id. Nothing is created before the first answer.
- A state object is created the first time the firmware delivers its key. Keys a firmware does not know simply stay
  away.
- States are written only when the value changed; measurements are rounded in `datapoints.ts` to keep the noise down.
- A write (`ack = false`) is validated by the datapoint, sent, and followed by a re-read after one second. The state
  is acknowledged with the value the wallbox reports. On any failure the last reported value is restored.
- In read-only mode nothing is ever sent.

## Conventions

- Values are reported under the key names of API v2 on the transport level, whatever API delivered them. A transport
  for the legacy API v1 has to translate its fields to these names; the datapoints must not change.
- State ids are part of the public interface. Do not rename or re-scale an existing state; add a new one instead.
- Code, log messages and commit messages are in English. User-facing texts exist in English and German.
- Admin texts (`admin/i18n/en.json`, `de.json`), names of channels and states (`src/i18n/en.json`, `de.json`) and
  `titleLang`/`desc` in `io-package.json` are written by hand in English and German. The names of the instance objects
  in `io-package.json` are copied from the `instance.*` keys in `src/i18n`; a unit test compares them.
  `npm run translate` fills in the other ioBroker languages by machine translation; it does not overwrite existing
  texts. The ioBroker repository checker requires all languages.
- Member names of the adapter class must not collide with members of the ioBroker base class (for example
  `connected` or `createDevice`); the type check reports such collisions.
- No example in code, tests or documentation may contain real addresses, serial numbers or other data of an actual
  installation. Use obviously generic values.

## Adding a datapoint

1. Look up the key in the API documentation (type, read/write, value list).
2. Add an entry to `DATAPOINTS` in `src/lib/datapoints.ts`. Use the helpers (`numberOf`, `enumTo`, …); a `read`
   function returns `undefined` if the key is missing and `null` if the wallbox reports no value.
3. Add or extend a unit test.
4. Document the state in both readmes.

## Checks before every commit

```bash
npm run check
npm run lint
npm test
```

`npm run test:integration` downloads a js-controller and takes about a minute; run it before a release and after
changes to `main.ts` or `io-package.json`.

## Fixing a bug

1. Reproduce the problem and find the cause. Measure on a real wallbox where possible: save the complete
   `/api/status` for each state of the device and compare the files. These files contain data of your installation;
   never commit them or attach them to issues.
2. Prefer values the wallbox reports itself over values the adapter derives from other keys.
3. Fix it and add or extend a unit test. Run all checks; run the integration test after changes to `main.ts` or
   `io-package.json`.
4. Add a line to the changelog below `### **WORK IN PROGRESS**` in `README.md`.
5. Commit, push and wait until all CI jobs are green.
6. Release a patch version (see "Releasing").

## Installing a package file

Before the adapter is listed in the ioBroker repository, and for test versions, it is installed from a package file
(`.tgz`). Installing directly from the GitHub repository URL does **not** work: the repository contains only the
TypeScript sources, the compiled code is part of the package file.

1. Download `iobroker.go-e-wallbox-<version>.tgz` from the releases of this repository, or build it on any computer
   with Node.js 22 or newer:

    ```bash
    git clone https://github.com/BenZ-ITS/ioBroker.go-e-wallbox.git
    cd ioBroker.go-e-wallbox
    npm ci
    npm run build
    npm pack
    ```

    Do not rename the file: ioBroker derives the adapter name from the file name.

2. In the admin interface open **Adapters** and switch on the **expert mode** (head icon at the bottom of the side
   menu; it only applies to the current browser session).
3. Click the **GitHub icon** in the toolbar and choose one of these tabs:
    - **From file**: select the `.tgz` on your computer.
    - **Custom**: enter a URL of the `.tgz` that the ioBroker host can reach, or the path of the file on the ioBroker
      host. For a published version the npm address works:
      `https://registry.npmjs.org/iobroker.go-e-wallbox/-/iobroker.go-e-wallbox-<version>.tgz`. Addresses on
      `github.com`, including the download link of a GitHub release, are refused ("Cannot install from GitHub");
      download such a file and use **From file** instead.
4. Leave "Create instance if it does not exist yet" checked and click **Install**. The red warning in the dialog is
   shown for every installation from outside the official repository.

On the command line of the ioBroker host:

```bash
iobroker url /path/to/iobroker.go-e-wallbox-<version>.tgz
iobroker add go-e-wallbox
```

A newer package file is installed the same way; instance and settings are kept.

## Releasing

Releases are made with the [release script](https://github.com/AlCalzone/release-script) (`.releaseconfig.json`,
plugins `iobroker`, `license` and `manual-review`). The GitHub workflow then tests the tag, publishes the package to
npm and creates the GitHub release.

1. Below the placeholder `### **WORK IN PROGRESS**` in the changelog of `README.md` add one line per change
   (`- …`). The release script turns these lines into the changelog entry and into `common.news` of
   `io-package.json`, translated into all ioBroker languages.
2. Write the release notes in `docs/release-notes/<new version>.md` (see below).
3. Commit both. The working tree must be clean; run all checks including the integration test.
4. Run `npm run release patch` (or `minor`, `major`). The script raises the version in `package.json` and
   `io-package.json` and updates changelog and news. It then runs `npm run release:check`: build, then
   `scripts/check-release.mjs` (same version everywhere, English and German news, release notes present). The
   release script runs this command without a shell, so it must stay a single npm script. Afterwards it pauses for a
   review and asks "Are you done?".
5. Review the changes before answering: `git diff`, especially the news in `io-package.json`. They are machine
   translated and can be wrong; correct the German text by hand. **The default answer is "yes"**, so do not just
   press Enter. After "yes" the script commits, tags `v<version>` and pushes both.

`npm run release patch -- --dry` shows what would happen without changing anything. A dry run only prints the
`release:check` command; it does not run it. 6. The workflow runs all tests for the tag, checks the release metadata again, publishes to npm (`deploy` job) and
creates the GitHub release. The job `release-notes` attaches the `.tgz` from `npm pack` and replaces the text of
the release with the release notes. 7. Check the result: `npm view iobroker.go-e-wallbox version dist-tags` and the GitHub release (package file and
text).

If a release step fails after the tag was pushed, fix the cause, delete the tag (`git push origin :refs/tags/v<version>`
and `git tag -d v<version>`) and release a new patch version rather than moving the tag.

### Pre-releases (alpha, beta, release candidate)

The ioBroker repository has two channels: **latest** (beta) always offers the newest regular version on npm, and
**stable** offers one fixed, tested version. There is no separate alpha or nightly channel. Pre-releases are
therefore distributed through npm and GitHub only:

1. Write changelog lines and release notes as for a normal release (`docs/release-notes/<version>.md`, e.g.
   `0.2.0-beta.0.md`).
2. Run the release script with a pre-release bump and an identifier:
    - `npm run release preminor beta`: 0.1.3 → 0.2.0-beta.0
    - `npm run release prepatch alpha`: 0.1.3 → 0.1.4-alpha.0
    - `npm run release prerelease`: 0.2.0-beta.0 → 0.2.0-beta.1
3. The workflow publishes versions with a hyphen under the npm tag **`next`** (not `latest`) and marks the GitHub
   release as a **pre-release**. Users on the regular channels do not receive it.
4. Testers install it in the admin (expert mode, "Install from custom URL" → **Custom**) with
   `https://registry.npmjs.org/iobroker.go-e-wallbox/-/iobroker.go-e-wallbox-<version>.tgz`, or download the `.tgz`
   of the GitHub pre-release and use **From file**.
5. The final version follows with the normal bump: `npm run release minor` turns 0.2.0-beta.1 into 0.2.0, which is
   published as `latest` and reaches the latest channel.

Check with `npm view iobroker.go-e-wallbox dist-tags` that `latest` still points to the last regular version.

### Release notes

Every version gets a file `docs/release-notes/<version>.md` with an English and a German part. Each part answers
three questions: what changed, what it means for users (states, settings, scripts, anything to do after the update)
and why the change was made. The short entry in `common.news` is what the admin interface shows; the release notes
are the full description.

```markdown
## English

### What changed

### Impact

### Why

## Deutsch

### Was sich geändert hat

### Auswirkungen

### Hintergrund
```

## How the package is published

- npm publishes `iobroker.go-e-wallbox` only from the `deploy` job of this repository's workflow, using
  [trusted publishing](https://docs.npmjs.com/trusted-publishers): no npm token is stored anywhere.
- The trusted publisher on npmjs.com (package → **Settings**) is GitHub Actions, repository
  `BenZ-ITS/ioBroker.go-e-wallbox`, workflow `test-and-release.yml`, no environment. Under "Allowed actions",
  **Allow npm publish** must be checked; without it the workflow may only stage a publication, which then needs a
  manual approval.
- "Publishing access" requires two-factor authentication and disallows tokens that bypass it. npm accepts only
  WebAuthn for two-factor authentication (a security key or a passkey, for example from a password manager).
- A trusted publisher can only be added to a package that exists. The first version was therefore published once
  with a short-lived token, which was deleted afterwards.
- The ioBroker organisation is owner of the npm package as well (`bluefox`), as the ioBroker repository requires.

## Repository checker

The ioBroker repository checker tests the requirements of the ioBroker adapter repository. Run the current version
locally:

```bash
npx -y @iobroker/repochecker@latest https://github.com/BenZ-ITS/ioBroker.go-e-wallbox
```

- It waits up to ten minutes for running workflows.
- Without a GitHub token it uses the anonymous GitHub API, limited to 60 requests per hour. If it stops with
  "API rate limit exceeded", wait an hour. A file with `GITHUB_TOKEN=…` can be passed with `--env <file>`.
- The web version at [adapter-check.iobroker.in](https://adapter-check.iobroker.in/) may run an older checker
  version; the local run is authoritative.
- Expected without a login: warnings that job logs cannot be read (W3050, W3052).

## Publishing in the ioBroker repository

The requirements are listed in [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#readme).
Check them again before each step; they change.

1. The repository checker reports no errors.
2. Add the adapter to the **latest** (beta) repository: on [iobroker.dev](https://www.iobroker.dev) log in with
   GitHub, open the adapter, **manage → ADD TO LATEST**; or fork `ioBroker/ioBroker.repositories` and run
   `npm run addToLatest -- --name go-e-wallbox --type energy`, then open a pull request.
3. For **stable**: open a test thread in the ioBroker forum, collect feedback, then
   `npm run addToStable -- --name go-e-wallbox --version <version>` in the fork and open a pull request.

## Continuous integration

`.github/workflows/test-and-release.yml` uses the shared ioBroker actions. `check-and-lint` runs type check, lint and
package tests; `adapter-tests` runs unit and integration tests on Node.js 22, 24 and 26 under Linux, Windows and
macOS. For version tags `deploy` publishes to npm with trusted publishing (no npm token) and creates the GitHub
release; `release-notes` completes it. Both use the token GitHub Actions provides and need no secret.

## Dependency updates

Dependabot (`.github/dependabot.yml`) proposes updates once a month, at the earliest seven days after a version was
published. Major updates of `@types/node` and `typescript` are ignored on purpose: `@types/node` follows the minimum
supported Node.js version, and TypeScript stays on 5.x until the ioBroker lint rules support a newer major.

1. Wait until all CI jobs of the pull request are green.
2. For a major update read the changelog of the package.
3. Merge the pull request on GitHub, then `git pull` locally.

Updates of dev dependencies and GitHub actions do not need a release. A release is only needed when
`dependencies` (what users install) change.

Do not add `mocha` or `@types/mocha` to `devDependencies`; they come with `@iobroker/testing`.

## Known gaps

- Only the local HTTP API v2 is implemented. API v1 (older hardware) is planned as a second transport.
- Only one device has been tested: go-eCharger V4, firmware 60.5. On it were verified: reading all states, writing a
  changed value (acknowledged with the value the wallbox reports), a value refused by the adapter (warning, nothing
  sent, state restored) and changes made outside ioBroker. The format of the wallbox's answer to an invalid value
  (`{"<key>": "<key>: failed: …"}`) was measured directly; the adapter's reaction to it is covered by a unit test,
  not by a test on the device. Other models, other firmware versions and several wallboxes at once are untested.
- Not exposed yet: feeding PV data into the wallbox (`ids`), the temporary current limit (`tcl`), RFID cards,
  scheduler, load balancing, MQTT and OCPP settings. They can be read through "Additional API keys".
- State names are available in English and German only.
- The icon is a placeholder.