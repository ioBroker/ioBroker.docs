# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hassemu@main/admin/hassemu.svg" width="48" align="top" /> ioBroker.hassemu

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.hassemu)](https://www.npmjs.com/package/iobroker.hassemu) ![stable](https://iobroker.live/badges/hassemu-stable.svg) ![Installations](https://iobroker.live/badges/hassemu-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.hassemu)](https://www.npmjs.com/package/iobroker.hassemu)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.hassemu/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.hassemu/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Emulates a Home Assistant server so displays that only accept an HA dashboard show any web URL instead.

---

## What it's for

The display completes the HA onboarding, then shows whatever web URL you point it at — VIS, VIS-2, Aura, Grafana, Node-RED, anything HTTP.

Typical clients: Shelly Wall Display family (built-in HA page; on-device HA app on firmware 2.6.0+), Home Assistant Companion App (Android wall panels, sideloaded apps). Anything that uses the same HA onboarding flow should work — if yours doesn't, open an issue with the failing endpoint trace.

---

## Features

- One URL per display, or one global URL for all
- Auto-discovery via mDNS, plus auto-detect of every VIS / VIS-2 / Aura instance installed on the host (see [Supported dashboards](#supported-dashboards) below)
- Two HA login flows in parallel — the classic JSON `login_flow` for older clients, plus the browser-OAuth2 flow used by the on-device HA app on Shelly Wall Display 2.6.0+
- Mobile-App registration emulation so the HA Companion App finishes onboarding
- Cookie-based: displays keep their URL across reboots, IP changes, renames

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Supported dashboards

The mode dropdown auto-discovers what's installed on your ioBroker host. You always have the option to paste any other HTTP URL as `manual`.

| Source                          | What gets discovered                                                                                                    | Notes                                                                                                                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ioBroker VIS** (`vis.0`+)     | One entry per project, plus one entry per view inside each project                                                      | Works with every `web.*` instance — multiple web instances get a `(web.X)` suffix on the label                                                                               |
| **ioBroker VIS-2** (`vis-2.0`+) | Same — one entry per project, one per view                                                                              | Project + view encoded into the URL (`?<project>#<view>`); deep links work                                                                                                   |
| **ioBroker Aura** (`aura.0`+)   | One entry per running aura instance, pointing at its frontend                                                           | Reads the actual `native.port` configured in aura (default 8095, ignores the hardcoded value in aura's `localLinks` template) — works with `https` and `customUrl` overrides |
| **Admin tiles**                 | Anything an adapter advertises via `common.localLinks` / `common.welcomeScreen` (jarvis, material, grafana, custom UI…) | Resolves `%ip%`, `%port%`, `%protocol%`, `%bind%`, and cross-instance refs like `%web.0_port%`                                                                               |
| **Manual URL**                  | A free-text URL of your choice — Grafana, Node-RED, custom HTML, anything HTTP/HTTPS                                    | Set the display's `mode` to `manual` and the URL in `manualUrl`. `javascript:`, `data:`, `file:` are rejected for safety                                                     |

Want to add a URL the adapter doesn't auto-detect? Set `manual` and paste it.

---

## Requirements

- Node.js ≥ 22
- ioBroker js-controller ≥ 7.2.2
- ioBroker Admin ≥ 7.8.23

---

## Ports

| Port       | Use                                 |
| ---------- | ----------------------------------- |
| 8123 / TCP | HA emulation (fixed, HA standard)   |
| 5353 / UDP | mDNS broadcast (only if mDNS is on) |

One instance per host. Port 8123 is HA-fixed. With multiple ioBroker hosts on the same LAN, only one of them runs hassemu.

**All traffic is plain HTTP** — HA clients do not support HTTPS on this flow. Treat port 8123 as LAN-only and never forward it to the internet. With authentication on, the username, password and tokens travel unencrypted over your LAN, so Auth guards the HA API against other LAN devices — it is not internet-exposure protection.

---

## First steps

1. Start the hassemu instance in ioBroker.
2. On the display, add a Home Assistant server. With mDNS on it appears automatically; otherwise enter `http://<ioBroker-IP>:8123` by hand.
3. Complete the HA onboarding on the display. With Auth off you can click through the login; with Auth on, enter the username and password from the instance settings.
4. The display now shows the **landing page** with its own device ID — that means it is connected and waiting for a URL.
5. In ioBroker, open the Object Browser and set `hassemu.0.clients.<id>.mode` for that device: pick a discovered URL from the dropdown, or choose `manual` and put any URL in `clients.<id>.manualUrl`.
6. The display reloads within ~30 seconds and shows your URL.

Want the same URL on every display? Set `global.mode` (plus `global.manualUrl` for a free URL) and turn on the `global.enabled` master switch instead of configuring each client.

---

## Configuration

| Option              | What                                                                              | Default   |
| ------------------- | --------------------------------------------------------------------------------- | --------- |
| Bind                | Network interface                                                                 | 0.0.0.0   |
| Service Name        | Name the display sees                                                             | ioBroker  |
| mDNS                | LAN auto-discovery. Off → set `http://<ioBroker-IP>:8123` on the display by hand. | on        |
| Auth                | Login required (guards the HA API on the LAN; credentials travel in plain HTTP)   | off       |
| Username / Password | When Auth is on                                                                   | admin / — |
| Trust Proxy         | Only behind a trusted reverse proxy that terminates TLS and strips X-Forwarded-*  | off       |

---

## State tree

```
hassemu.0.
├── info.
│   ├── connection      — server is running
│   ├── serverUuid      — server identity (read-only)
│   └── refreshUrls     — re-scan URL list (button, set to true)
├── global.
│   ├── enabled         — master switch
│   ├── mode            — URL choice used by every client whose mode is `global`
│   └── manualUrl       — free-text URL, used when global.mode = `manual`
└── clients.
    └── <id>            — one channel per display (channel name = hostname or IP)
        ├── mode        — per-client URL choice
        ├── manualUrl   — free-text URL, used when mode = `manual`
        ├── ip          — last seen client IP
        └── remove      — forget this client (button, set to true)
```

### Which URL does the display get?

| `mode`        | URL               |
| ------------- | ----------------- |
| `global`      | use `global.mode` |
| `manual`      | use `manualUrl`   |
| a URL         | that URL          |
| empty (`---`) | landing page      |

Master switch:

- **on** — all displays follow `global.mode`
- **off** — all displays go back to `---`
- new displays always start at `---`

---

## Refresh

The display reloads itself within ~30 seconds after a URL change.

After adding or renaming a VIS-2 project or view, set `info.refreshUrls` to `true` so it shows up in the dropdown.

If hassemu goes offline while a display is running, the display switches to a clear offline page with a reload button after ~1.5 minutes and returns to your dashboard automatically once hassemu is back. Limitation: a display that cold-boots _while_ hassemu is down can't load that page and shows a connection error until the adapter is running again.

---

## Troubleshooting

Set the instance log level to `debug` first — since v1.31.1 the adapter traces every decision point (identify, OAuth2, URL discovery, resolver chain, mobile-app webhooks, master switch). Most symptoms are triage-able from that log alone.

**Display can't find the server** — with mDNS on, the log should show `mDNS: Broadcasting`. If that line is missing, mDNS failed to bind (port 5353/UDP). Workaround: turn mDNS off in the instance config and point the display at `http://<ioBroker-IP>:8123` by hand.

**Display shows the wrong URL or the landing page** — open Object Browser, check `clients.<id>.mode` (and `manualUrl` if mode is `manual`). At `mode='global'`, also check `global.mode` / `global.manualUrl`. The device id is shown on the landing page and stored at `clients.<id>.ip`. The debug log shows the full resolver chain (`chain=global→manual→…`) per request.

**Display lost its identity (new id on every visit)** — the display is not persisting the cookie. Common causes: aggressive privacy mode, factory reset, browser cache flush. The old `clients.<id>`-channels can be removed via their `remove` button, but the root cause is on the display side, not in hassemu.

**HA Companion App says "Server is not Home Assistant"** — point the app at `http://<ioBroker-IP>:8123`, not at the ioBroker Admin port. If a reverse proxy is in front of hassemu, make sure `/manifest.json` is passed through unmodified — the App parses `name === "Home Assistant"` to verify the server.

**Aura entry in the dropdown points at the wrong port** — `native.port` of the Aura instance must match its actually-listening port. Trigger `info.refreshUrls = true` to re-run discovery after fixing the Aura config.

---

## Upgrade

Migration runs automatically when the adapter starts.

Got scripts that still write to `visUrl`? Update them — write to `manualUrl` instead and set `mode` to `manual`.

**Coming from a Shelly Wall Display on firmware 2.6.0 or newer?** Make sure you're on hassemu **≥ 1.29.2**. The on-device HA app introduced in firmware 2.6.0 needs a server-identity probe, a mobile-app registration step and a WebView "connected" signal — all three came in with v1.29.0–v1.29.2. After upgrading, run the display through the on-device HA onboarding once more.

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.37.0 (2026-07-09)

- A custom name you give a display now survives even when its network hostname resolves later — the name you set sticks.
- A display that keeps losing its identity no longer fills ioBroker with unused entries over time.
- A display connection that simply goes away (a panel powered off) is now cleaned up instead of lingering until the adapter restarts.
- The manual URL-refresh datapoint is now `info.refreshUrls` (was `info.refresh_urls`); the old one is removed automatically on upgrade — update any script that wrote to the old name.
- Corrected the configuration help texts and the README to match the current setup, documented the offline behaviour, and added a first-steps guide.

### 1.36.0 (2026-06-22) — stable

- Fixed a rare adapter crash and restart loop that a malformed connection message could trigger — it briefly took all connected displays offline until the adapter recovered.
- A custom name you give a display (its channel name) is no longer overwritten with the device's IP address when that IP changes.
- With authentication enabled, a display again reloads automatically after you change its target URL.
- With authentication enabled, a password is now required — the settings can no longer be saved with an empty password.

### 1.35.3 (2026-06-15)

- Fixed Home Assistant discovery pointing the display at the wrong address on multi-interface hosts; it now uses the address the adapter actually listens on.

### 1.35.2 (2026-06-12)

- Displays whose registration became stale after an adapter restart now re-register automatically — the server previously answered in a way the companion app did not recognize as "please register again"
- Removing a display now also clears its leftover app registration, so a re-added display starts with a fresh one

### 1.35.1 (2026-06-09)

- Internal cleanup. No user-facing changes.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/krobipd)

---

## License

MIT License

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

<!-- prettier-ignore -->
*Developed with assistance from Claude.ai*
