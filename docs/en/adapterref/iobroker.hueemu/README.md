# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="48" align="top" /> ioBroker.hueemu

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.hueemu)](https://www.npmjs.com/package/iobroker.hueemu) ![stable](https://iobroker.live/badges/hueemu-stable.svg) ![Installations](https://iobroker.live/badges/hueemu-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.hueemu)](https://www.npmjs.com/package/iobroker.hueemu)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.hueemu/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.hueemu/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Emulates a [Philips Hue](https://www.philips-hue.com) Bridge (v2, BSB002) so that ioBroker devices appear as Hue lights to clients that only support the Hue API.

---

## When to use this adapter

**Use it if you want to control ioBroker states from an older device or app that only speaks the Hue API.** Examples: Logitech Harmony Hub, Bosch Smart Home Controller, legacy Echo firmware, in-wall touch panels, abandoned dashboard apps, old control systems with a Hue plugin.

### Modern Alexa, Google Home or Apple Home — use the Matter adapter instead

Modern voice assistants all support Matter directly. Use the [ioBroker Matter adapter](https://github.com/ioBroker/ioBroker.matter) — it's the right tool for that. This adapter is only for clients that don't have a Matter option.

---

## Features

- **Hue API v1** — Bridge model BSB002 (Hue Bridge v2)
- **UPnP/SSDP Discovery** — Automatic detection by any Hue-compatible client
- **Direct state mapping** — Point to any ioBroker state, no bridge scripts
- **Device assistant** — scan ioBroker for mappable lights and add them automatically, or add and edit each light by hand
- **Light types** — On/Off, Dimmable, Color Temperature, RGB
- **Per-device value scale** — pick how brightness and saturation are stored in your source state
- **Persistent TLS certificate** — clients only trust the bridge once, restarts keep the same identity
- **Localized state names** — admin labels follow the ioBroker system language
- **Automatic migration** — legacy `createLight` setups are converted to the admin configuration on first start

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**

---

## Ports

| Port | Protocol  | Purpose                      | Configurable                        |
| ---- | --------- | ---------------------------- | ----------------------------------- |
| 8080 | TCP/HTTP  | Hue Bridge API               | Yes — clients are informed via SSDP |
| 1900 | UDP       | SSDP/UPnP Discovery          | No — fixed by the UPnP standard     |
| —    | TCP/HTTPS | Optional TLS (if configured) | Yes                                 |

---

## Configuration

### Network Settings

| Option          | Description                                                                                                                                             | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **Host / IP**   | The IP the bridge binds to and announces to clients (Alexa, Harmony). Choose `0.0.0.0` to listen on all interfaces — the announced IP is auto-detected | 0.0.0.0 |
| **HTTP Port**   | Port for the Hue API                                                                                                                                    | 8080    |
| **HTTPS Port**  | Only needed if a client insists on TLS; leave empty otherwise                                                                                           | —       |
| **MAC Address** | Bridge MAC (auto-generated if empty)                                                                                                                    | —       |

### Adding Devices

Open the **Device Configuration** tab. There are two ways to add lights:

**Manually** — click **Add light**, enter a name, choose a light type, and map the ioBroker states with the object browser.

**Automatically** — click **Search lights**. The adapter scans your objects for things that look like lights (on/off, dimmers, colour-temperature and colour lights) and shows the mappable ones as a checklist — tick the ones you want and only those are added. Anything it detects but cannot map (for example RGB-channel devices) is reported so you can add it by hand.

Each light shows as a card — use **Edit** to change its mapping or **Delete** to remove it.

### Supported Light Types

| Type                  | States                                | Hue Model |
| --------------------- | ------------------------------------- | --------- |
| **On/Off**            | `on`                                  | LWB007    |
| **Dimmable**          | `on`, `bri`                           | LWB010    |
| **Color Temperature** | `on`, `bri`, `ct`                     | LTW001    |
| **Color Light**       | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003    |

### Pairing

Before any client can connect, pairing must be activated:

1. ioBroker Objects → `hueemu.0` → set **`startPairing`** to `true`
2. Start the device search / pairing in your client app within **50 seconds**
3. After successful pairing a new entry appears under `hueemu.0.clients.*`

### Connecting with Alexa (older Echo without Matter)

> If you have a current Echo, use the [Matter adapter](https://github.com/ioBroker/ioBroker.matter) instead.

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
└── clients/             — Paired client devices
    └── {username}       — Client API key (created during pairing)
```

---

## Troubleshooting

### Upgrading from 0.x / legacy createLight mode

If you used the old `createLight` JSON state to define lights, your devices are **automatically migrated** on first start. The adapter reads your existing device objects, converts them to the new admin configuration format, and restarts once. No manual action required — your existing scripts and automations continue to work as before.

**Optional improvement:** The old system used internal adapter states as intermediaries, requiring separate scripts to control the actual devices. You can now open the adapter settings and change the state mappings to point **directly** to your device states (e.g. `hm-rpc.0.dimmer.LEVEL` instead of `hueemu.0.1.state.bri`).

### Bridge not found

- Ensure the UPnP port (1900) is not blocked by a firewall
- On a multi-interface host, set the **Host / IP** to the concrete LAN address instead of `0.0.0.0` if the auto-detected IP is wrong
- Check firewall rules on the ioBroker host

### Client finds no devices / pairing fails

- Set `startPairing` to `true` in ioBroker Objects → `hueemu.0` **before** starting the device search in your client — you have 50 seconds
- Ensure at least one device is configured
- Check adapter logs for errors

### State changes not working

- Verify state IDs in device configuration
- Pick the matching brightness/saturation scale per device in the admin — Auto, Percent (0..100), Normalized (0..1) or Hue-Raw (1..254). A `level.dimmer` storing 0..100 needs Percent.
- `ct` range is 153–500 (Mireds)

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.13.0 (2026-08-25)

- Changed: The discovery service was rebuilt — the long-standing security warning is gone and devices find the bridge exactly as before
- Improved: When the adapter stops, the bridge now announces its shutdown on the network so controllers notice right away instead of waiting for a timeout

### 1.12.2 (2026-08-22)

- Changed: Internal cleanup. No user-facing changes.

### 1.12.1 (2026-07-31) — stable

- Leaving the HTTPS port empty in the settings no longer shows an error — an empty value simply means that no HTTPS server is started for the bridge
- The bridge MAC address that is generated automatically is now always a valid device address; some of the values generated before were not valid MAC addresses

### 1.12.0 (2026-07-12) — stable

- The "Search lights" assistant now actually finds your lights (it scanned the wrong objects before) and lets you pick which ones to add instead of adding them all
- The two IP fields in the settings are now one Host/IP selector — pick your IP, or "all interfaces" to auto-detect the announced address
- A logged-in client reading the bridge configuration now receives the full config, matching a real Hue bridge

### 1.11.0 (2026-07-09)

- The devices tab can now scan ioBroker for dimmer, colour-temperature and colour lights and add the mappable ones. Manual add still works.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Credits

This adapter would not exist without [Christopher Holomek](https://github.com/holomekc), who built the original Hue bridge emulator on GitHub back in 2020. The code has since been rewritten from the ground up — but the idea, and the proof that it works, are his.

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

Copyright (c) 2020-2021 Christopher Holomek <holomekc.github@gmail.com>  
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

_Developed with assistance from Claude.ai_
