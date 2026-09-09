---
chapters: {"pages":{"en/adapterref/iobroker.zte-mc888/README.md":{"title":{"en":"ioBroker.zte-mc888"},"content":"en/adapterref/iobroker.zte-mc888/README.md"},"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md":{"title":{"en":"Development notes"},"content":"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md"}}}
---
# Development notes

These notes are for contributors. As a user of the adapter you do not need any of this —
install the adapter from the ioBroker admin interface.

## Requirements

- Node.js >= 22
- npm

## Setup and tests

```bash
npm install               # install dependencies (incl. the test framework)
npm test                  # unit tests + package validation
npm run test:js           # only the unit tests (fields + zteClient, no router needed)
npm run test:package      # validate package.json / io-package.json
npm run test:integration  # boot the adapter in a temporary js-controller
npm run lint              # ESLint (@iobroker/eslint-config)
npm run check             # type check the JavaScript sources via JSDoc (tsc --noEmit)
```

The unit tests run entirely offline: [test/zteClient.test.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/test/zteClient.test.js)
spins up a local mock HTTP server that emulates the router's `goform` API, so no real
ZTE MC888 is needed. The integration test downloads and starts a real js-controller in a
temporary directory (needs internet access on first run).

## Router API

The adapter reads the router's local `goform` HTTP API
(`/goform/goform_get_cmd_process`). The login flow uses `LOGIN_MULTI_USER` with the `AD`
token (`MD5( MD5(cr_version + wa_inner_version) + RD )`) and the password hash
`SHA256( SHA256(password) + LD )`. See [lib/zteClient.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/lib/zteClient.js).

The router only serves a handful of fields (network type and the primary RSRP/RSSI)
without authentication; everything else requires a session, and the router allows only
one session per user — a second login silently kicks the first. The session handling and
the "web UI has priority" back-off live in `poll()` in [main.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/main.js).

## Adding fields for another firmware

The raw field names differ between firmware versions. To add support for a firmware:

1. Run the instance with log level `debug` — the raw router JSON is logged on every poll.
2. Add or adjust the entry in [lib/fields.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/lib/fields.js) (`cmd` is the raw field
   name, `id` the ioBroker state id) and extend the tests in
   [test/fields.test.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/test/fields.test.js).
3. Open a pull request with the firmware version you tested against.

Please do not patch an installed adapter locally — changes are overwritten on the next
update and nobody else benefits from them.

## Release

Releases are created with [@alcalzone/release-script](https://github.com/AlCalzone/release-script):

```bash
npm run release -- patch   # or minor / major
```

The changelog is maintained in the `## Changelog` section of
[README.md](/#/adapters/zte-mc888); the release script copies it into `io-package.json`.