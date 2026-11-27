---
chapters: {"pages":{"en/adapterref/iobroker.smartvis/README.md":{"title":{"en":"ioBroker.smartvis"},"content":"en/adapterref/iobroker.smartvis/README.md"},"en/adapterref/iobroker.smartvis/DEVELOPMENT.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.smartvis/DEVELOPMENT.md"}}}
---
# Development

Notes for contributors. User documentation: [README.md](/#/adapters/smartvis) (English) and [docs/de/README.md](https://github.com/Exc3pt10n/ioBroker.smartvis/blob/main/docs/de/README.md) (German).

## Setup and checks

```bash
npm install
npm run build              # backend (build/) + frontend (www/)
npm test                   # unit and package tests
npm run test:integration   # adapter in a real js-controller test instance
npm run lint && npm run check
```

## Frontend without ioBroker

```bash
npm run build:www && npm run demo   # demo server with sample devices on :8099
npm run dev:www                     # Vite with hot reload, proxies /ws to :8099
```

The demo uses German texts by default; `SMARTVIS_LANG=en npm run demo` shows the English user interface.

## Architecture

```
ioBroker objects / states / enums
        │
        ▼
SmartVis adapter (Node.js, TypeScript)
  discovery (type-detector + adapter profiles) → device model ← customizations per end device (overrides.json)
  HTTP server for the PWA files + WebSocket API (/ws)
        │  only detected states, batched updates; writes only to released states
        ▼
Frontend (React + Vite PWA)
```

- The adapter sends the device model and the current values of the detected states only; the app never gets
  access to arbitrary states.
- WebSocket connections from other web pages are rejected (`Origin` must match the host of the request).
- Customizations made in edit mode are stored per end device in the ioBroker file storage (`smartvis.0/overrides.json`).

## Project structure

```
src/              adapter (TypeScript)
  main.ts           life cycle, subscriptions, writes
  lib/discovery     device and room detection (pure function, tested)
  lib/rooms         room name heuristics
  lib/profiles      adapter profiles for systems without standard roles (PV, wallbox, weather, climate, scenes …)
  lib/normalize     corrections for device adapters (Shelly, Tasmota, Tuya, FRITZ!DECT, Zigbee, deCONZ …)
  lib/overrides     customizations from edit mode; lib/clientOverrides: per end device
  lib/history       history from sql/history/influxdb
  lib/system        state of ioBroker (hosts, instances)
  lib/server        HTTP + WebSocket
  shared/           protocol types, translations and helpers used by backend and frontend
src-www/          frontend (React + Vite), built to www/
admin/            jsonConfig of the instance settings
scripts/demo.ts   demo server without ioBroker
```

## Translations

- All texts in the code are **English**. German translations are in `src/shared/i18n/de.ts`
  (English text → German text); placeholders like `{n}` are filled in by `t()`.
- Use `t('Text')` for fixed texts and `tn(n, '{n} device', '{n} devices')` for counts, in the adapter as well as in the app.
  Log messages stay English and are not translated.
- The language follows the instance setting (default: ioBroker system language; German or otherwise English) and
  is sent to the app with the model.
- The unit test `i18n` fails if a text passed to `t()`/`tn()` has no German entry.

## Battery types

The table `src/lib/batteryModels.ts` is generated from the device library of
[Battery Notes](https://github.com/andrew-codechimp/HA-Battery-Notes) (MIT):

```bash
npx tsx scripts/battery-models.ts <library.json>
```