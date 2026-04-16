# ioBroker.hueemu

[![npm version](https://img.shields.io/npm/v/iobroker.hueemu)](https://www.npmjs.com/package/iobroker.hueemu)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/iobroker.hueemu)](https://www.npmjs.com/package/iobroker.hueemu)
![Installations](https://iobroker.live/badges/hueemu-installed.svg)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

<img src="https://raw.githubusercontent.com/krobipd/ioBroker.hueemu/main/admin/hue-emu-logo.png" width="100" />

Emulates a [Philips Hue](https://www.philips-hue.com) Bridge (v2, BSB002) so that ioBroker devices can be controlled via Alexa, Google Home, and other Hue-compatible smart home systems.

---

## Features

- **Hue Bridge Emulation** — Full Hue API v1 compatibility
- **UPnP/SSDP Discovery** — Automatic detection by smart home systems
- **Modern Admin UI** — JSON-Config for easy device configuration
- **Flexible Device Types** — On/Off, Dimmable, Color Temperature, RGB lights

---

## Requirements

- **Node.js >= 20**
- **ioBroker js-controller >= 7.0.0**
- **ioBroker Admin >= 7.6.20**

---

## Ports

| Port | Protocol | Purpose | Configurable |
|------|----------|---------|--------------|
| 8080 | TCP/HTTP | Hue Bridge API | Yes — clients are informed via SSDP |
| 1900 | UDP      | SSDP/UPnP Discovery | No — fixed (all UPnP clients including Harmony, Alexa, Google Home scan exactly this port) |
| —    | TCP/HTTPS | Optional TLS (if configured) | Yes |

---

## Configuration

### Network Settings

| Option | Description | Default |
|--------|-------------|---------|
| **Host** | IP address of the bridge (must be a real network IP) | — |
| **HTTP Port** | Port for the Hue API | 8080 |
| **HTTPS Port** | Optional HTTPS port | — |
| **MAC Address** | Bridge MAC (auto-generated if empty) | — |

### Adding Devices

1. Open the **Device Configuration** tab
2. Click the `+` button
3. Enter a **Name** (e.g. "Living Room Light")
4. Select a **Light Type**
5. Map **States** via the object browser (`...`)

### Supported Light Types

| Type | States | Hue Model |
|------|--------|-----------|
| **On/Off** | `on` | LWB007 |
| **Dimmable** | `on`, `bri` | LWB010 |
| **Color Temperature** | `on`, `bri`, `ct` | LTW001 |
| **Color Light** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |

### Pairing

Before any client (Alexa, Google Home, Harmony Hub, etc.) can connect, pairing must be activated:

1. ioBroker Objects → `hueemu.0` → set **`startPairing`** to `true`
2. Start the device search / pairing in your client app within **50 seconds**
3. After successful pairing a new entry appears under `hueemu.0.clients.*`

### Connecting with Alexa

> **Tip:** If Alexa cannot find the bridge, try changing the HTTP port to **80** in the adapter settings — some Alexa firmware versions only discover bridges on port 80.

1. Activate pairing (see above)
2. Alexa App → Devices → `+` → Philips Hue
3. The bridge is discovered automatically

### Connecting with Logitech Harmony Hub

1. Activate pairing (see above)
2. In the Harmony setup software: Add Device → Lighting → Philips Hue → search for bridge
3. Confirm pairing within 50 seconds

---

## State Tree

```
hueemu.0.
├── startPairing         — Enable pairing mode for 50 seconds (button)
├── disableAuth          — Disable authentication (switch)
└── clients/             — Paired client devices (Alexa, Google Home, Harmony Hub, etc.)
    └── {username}       — Client API key (created during pairing)
```

---

## Troubleshooting

### Upgrading from 0.x / legacy createLight mode

If you used the old `createLight` JSON state to define lights, your devices are **automatically migrated** on first start. The adapter reads your existing device objects, converts them to the new admin configuration format, and restarts once. No manual action required — your existing scripts and automations continue to work as before.

**Optional improvement:** The old system used internal adapter states as intermediaries, requiring separate scripts to control the actual devices. You can now open the adapter settings and change the state mappings to point **directly** to your device states (e.g. `hm-rpc.0.dimmer.LEVEL` instead of `hueemu.0.1.state.bri`). This eliminates the need for bridge scripts entirely.

### Bridge not found

- Ensure the UPnP port (1900) is not blocked by a firewall
- The **Host** IP must be the actual network IP, not `0.0.0.0`
- Check firewall rules on the ioBroker host

### Client finds no devices / pairing fails

- Set `startPairing` to `true` in ioBroker Objects → `hueemu.0` **before** starting the device search in your client — you have 50 seconds
- Ensure at least one device is configured
- Check adapter logs for errors

### State changes not working

- Verify state IDs in device configuration
- Check value ranges: `bri` 0–100 or 0–1, `ct` 153–500 (Mireds)

---

## Changelog

### 1.2.4 (2026-04-13)
- Remove dead types from light model (6 unused interfaces, 3 unused LightType variants)
- Refactor UserService from callback to async API (removes ~40 lines boilerplate)
- Extract `requireAuth()` helper in API routes (DRY, 6 duplicated auth checks → 1 function)
- Centralize `BRIDGE_MODEL_ID` constant (was duplicated in config-service and main)
- Make logger required in all services (removes conditional null-checks in 5 files)
- Use `try/finally` in onUnload for safer shutdown
- Remove dead `createLight` instanceObject from io-package.json
- Remove synchronous `generateCertificate` from being unnecessarily async

### 1.2.3 (2026-04-11)
- Extract shared `sanitizeId` utility module (DRY)
- Add Hue API value range constants for readability
- Add pairing timeout constant
- Improve callback error handling in UserService
- Replace `as any` with type-safe casts in DeviceBindingService
- Enforce `no-floating-promises` as error
- Split monolithic test file into focused modules (146 tests)
- Fix duplicate io-package.json news entry

### 1.2.2 (2026-04-11)
- Remove redundant `actions/checkout@v6` from CI workflow (ioBroker testing actions handle checkout internally)
- Fix `readme` URL in io-package.json (master → main)

### 1.2.1 (2026-04-08)
- Restore standard integration tests (create-adapter compatible)
- Add FORBIDDEN_CHARS sanitization for all external object IDs
- Remove CHANGELOG.md (changelog in README + CHANGELOG_OLD.md)
- Remove dead code, clean up empty JSDoc stubs

### 1.2.0 (2026-04-06)
- Rename `user` folder to `clients` — clearer naming for paired endpoints (Alexa, Harmony, etc.)
- Automatic migration of existing paired clients on startup

### 1.1.4 (2026-04-05)
- Clean up obsolete `info.connection` state, remove empty parent folders after state cleanup

### 1.1.3 (2026-04-05)
- Remove unused `info.connection` state (no external connection to track)

Older entries have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

---

## Credits

**Original Author:** Christopher Holomek ([@holomekc](https://github.com/holomekc))

**Modernization (2026):** krobi

---

## Support

- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.hueemu/issues)

### Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/krobipd)

---

## License

MIT License

Copyright (c) 2020-2024 Christopher Holomek <holomekc.github@gmail.com>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

*Developed with assistance from Claude.ai*
