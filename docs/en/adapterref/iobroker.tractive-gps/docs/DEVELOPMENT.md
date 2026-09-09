---
chapters: {"pages":{"en/adapterref/iobroker.tractive-gps/README.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README.md"},"en/adapterref/iobroker.tractive-gps/README_DE.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README_DE.md"},"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md":{"title":{"en":"Developer documentation for ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md"}}}
---
# Developer documentation for ioBroker.tractive-gps

This document is intended for contributors. User installation, configuration, states, and widget usage are documented in the
main [README](/#/adapters/tractive-gps) and [German README](/#/docs/adapterref/iobroker.tractive-gps/README_DE.md).

## Development requirements

- Node.js 22.13 or newer
- npm 10 or newer
- js-controller 7.2.2 or newer for local integration testing
- Admin 7.8.23 or newer
- VIS 2 version 2.12.8 or newer for widget testing

Install all workspace dependencies from the repository root:

```bash
npm install
```

## Repository structure

```text
src/
├── main.ts                         Adapter lifecycle, scheduling, messages, and commands
├── lib/
│   ├── tractive-api.ts             Authentication, requests, validation, and rate limiting
│   ├── helpers/stateHelpers.ts     ioBroker object and state creation
│   └── services/dataAggregation.ts API normalization and synchronization
└── types/types.ts                  Shared backend types

src-admin/                          React-based Admin 8 configuration
src-widgets/                        VIS 2 PetTrackerCard widget
admin/                              Built Admin files and translations
widgets/                            Built VIS 2 files and classic VIS 1 widget sources
build/                              Compiled adapter backend
test/                               Package and integration tests
```

## Adapter lifecycle

On startup, the adapter creates its lifecycle objects, authenticates with Tractive, performs a full synchronization, subscribes to the refresh and
tracker command states, and schedules the next regular synchronization.

Synchronization runs are serialized. A new request made while a synchronization is running is queued instead of starting an overlapping run.

The synchronization schedule is divided by data type:

- tracker lists and positions use the configured polling interval,
- hardware and battery reports use a 15-minute interval,
- pet profiles, images, tracker details, and discovery use a daily full synchronization.

## Tractive API client

`src/lib/tractive-api.ts` owns all HTTP access. Important rules:

- Authentication credentials are sent only in the login request body.
- Access tokens are kept in memory.
- A single shared refresh promise prevents concurrent authentication refreshes.
- A failed request is replayed once after HTTP 401.
- Requests are serialized and spaced before being sent.
- HTTP 429 creates an account-wide cooldown and an adaptive request delay.
- `Retry-After` is accepted as seconds or an HTTP date.
- Logs must never include request URLs, credentials, tokens, payloads, complete responses, or coordinates.
- External values are validated before they cross the API boundary.

The Tractive interface is unofficial and may change without notice. Endpoint changes require tests with sanitized fixtures.

## Credentials

The Admin application uses `AdminConnection` from `@iobroker/socket-client`. The normal ioBroker Save button calls the server-side `encrypt()` method
so passwords are written in ioBroker's AES configuration format.

`io-package.json` declares the password in both `encryptedNative` and `protectedNative`. The adapter receives the decrypted value from js-controller
at runtime.

Do not add a separate credential-save button and do not persist access tokens.

## Object model

The public stable object model consists of:

- `info.*` for lifecycle and synchronization information,
- `pets.<pet-id>.info.*` for normalized pet data,
- `trackers.<tracker-id>.*` for normalized tracker, position, health, and command data,
- `api.data.*` and `info.currentApi` for the sanitized API mirror.

The API mirror must remove credentials, email addresses, access and refresh tokens, authorization fields, user IDs, and nearby user IDs. Arrays are
stored as JSON strings. Existing tracker objects are retained and marked as missing instead of being deleted.

## Tracker commands

Command states are created only for capabilities reported by the tracker. Commands for the same tracker are serialized. A state is acknowledged only
after the Tractive request succeeds.

## Admin UI

The Admin 8 application is located in `src-admin/` and uses React, TypeScript, Material UI, `@iobroker/gui-components`, and `AdminConnection`.

The configuration is saved exclusively through the standard ioBroker Save workflow. Translations must be updated for every locale in
`src-admin/src/i18n/` and rebuilt into `admin/i18n/`.

## VIS widgets

The widget source is located in `src-widgets/`. `PetTrackerCard` uses the VIS 2 component API and Leaflet/OpenStreetMap.

The classic VIS 1 implementation is registered through `widgets/tractive-gps.html`, as required by VIS 1. Its source resources live in `src-widgets/public/vis1/`; Vite copies them to `widgets/tractive-gps/vis1/` alongside the VIS 2 build. It uses the VIS 1 EJS and `vis.binds` APIs. The vendored Leaflet files must remain synchronized with the `leaflet` version in `src-widgets/package.json`.

Widget changes must preserve:

- automatic light and dark theme colors,
- API image and custom ioBroker image fallback,
- safe `_PRJ_NAME` image path handling,
- configurable map interaction and zoom limits,
- automatic fitting of the configured or reported radius,
- cleanup of Leaflet instances and event listeners.

## Commands

Run the following checks before submitting changes:

```bash
npm run check
npm run lint
npm test
npm run build
```

Individual commands:

```bash
npm run test:ts
npm run test:package
npm run test:integration
npm run build:ts
npm run build:admin
npm run build:widgets
```

## Release process

The root adapter package and the private Admin and VIS workspaces use fixed Lerna versioning. Keep the versions in `package.json`,
`src-admin/package.json`, `src-widgets/package.json`, `io-package.json`, and `lerna.json` synchronized.

Releases must be prepared from a clean and current `main` branch. First run a dry run with the appropriate semantic version bump:

```bash
npm run release -- major --dryRun --noPush --yes
```

Use `major` for breaking changes, `minor` for backward-compatible features, and `patch` for backward-compatible fixes. After reviewing the dry-run
output, run the same command without `--dryRun` and `--noPush`. The release script updates the changelog and ioBroker news, builds the project,
creates the release commit and annotated tag, and pushes them. The tag then triggers the Trusted Publishing workflow.

## Local ioBroker development server

The project uses `@iobroker/dev-server` for local integration testing:

```bash
npm run dev-server -- doctor --json
npm run dev-server
```

Use `npm run dev` for watch mode, `npm run dev-update` to update the local adapter installation, and `npm run dev-upload` to upload rebuilt files.

## Documentation and changelog rules

The main READMEs are user documentation. Do not add build instructions, internal architecture explanations, dependency maintenance notes, or
contributor workflows there. Put such information in this file.

The README must always retain these sections:

- Disclaimer
- Error reporting with Sentry
- Changelog
- Credits
- License