# ioBroker.hueemu

[![npm version](https://img.shields.io/npm/v/iobroker.hueemu)](https://www.npmjs.com/package/iobroker.hueemu)
![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/iobroker.hueemu)](https://www.npmjs.com/package/iobroker.hueemu)
![Installations](https://iobroker.live/badges/hueemu-installed.svg)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

<img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="100" />

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
- **Light types** — On/Off, Dimmable, Color Temperature, RGB
- **Per-device value scale** — pick how brightness and saturation are stored in your source state
- **Persistent TLS certificate** — clients only trust the bridge once, restarts keep the same identity
- **Localized state names** — admin labels follow the ioBroker system language
- **Automatic migration** — legacy `createLight` setups are converted to the admin configuration on first start

---

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.0.7**
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

| Option          | Description                                                   | Default |
| --------------- | ------------------------------------------------------------- | ------- |
| **Host**        | IP address of the bridge (must be a real network IP)          | —       |
| **HTTP Port**   | Port for the Hue API                                          | 8080    |
| **HTTPS Port**  | Only needed if a client insists on TLS; leave empty otherwise | —       |
| **MAC Address** | Bridge MAC (auto-generated if empty)                          | —       |

### Adding Devices

1. Open the **Device Configuration** tab
2. Click the `+` button
3. Enter a **Name** (e.g. "Living Room Light")
4. Select a **Light Type**
5. Map **States** via the object browser (`...`)

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
- The **Host** IP must be the actual network IP, not `0.0.0.0`
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
### 1.5.1 (2026-05-23)

- Changelog rewritten in user-centric style across all versions.

### 1.5.0 (2026-05-22)

- User-modified state names are no longer overwritten on adapter restart

### 1.4.9 (2026-05-21)

- Improved error handling and stability.

### 1.4.8 (2026-05-20)

- Improved security: TLS private key is no longer visible in the admin interface.

### 1.4.7 (2026-05-19)

- TLS private key is now encrypted at rest in the ioBroker object database.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## Credits

**Original Author:** Christopher Holomek ([@holomekc](https://github.com/holomekc))

**Modernization:** krobi

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
