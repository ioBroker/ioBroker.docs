![Logo](admin/pwned-check.svg)

# ioBroker.pwned-check

[![NPM version](https://img.shields.io/npm/v/iobroker.pwned-check.svg)](https://www.npmjs.com/package/iobroker.pwned-check)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pwned-check.svg)](https://www.npmjs.com/package/iobroker.pwned-check)
![Number of Installations](https://iobroker.live/badges/pwned-check-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/pwned-check-stable.svg)
[![NPM](https://nodei.co/npm/iobroker.pwned-check.png?downloads=true)](https://nodei.co/npm/iobroker.pwned-check/)

**Tests:** ![Test and Release](https://github.com/ipod86/ioBroker.pwned-check/workflows/Test%20and%20Release/badge.svg)

## ioBroker adapter for password and e-mail breach checking

This adapter checks whether your passwords or e-mail addresses have appeared in known data breaches — without ever sending your actual passwords to any server.

## Features

- **Privacy first** – passwords are never transmitted. The SHA-1 hash is computed locally in the browser; only the first 5 characters are sent to the API (k-anonymity)
- **Password check** – uses the free [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords) k-anonymity API — no API key required
- **E-mail check** – uses the free [XposedOrNot](https://xposedornot.com) API — no API key required
- **Breach details** – individual data points per breach source under `emails.<id>.leaks.*`
- **ioBroker notifications** – sends a system notification when a new breach is detected, in the configured system language (11 languages supported)
- **HTML visualisation** – generates a ready-to-use HTML data point for use in VIS or other dashboards
- **Configurable appearance** – theme (light/dark), background transparency, card transparency, font size
- **Configurable interval** – check every 3, 6, 12 or 24 hours
- **Malware detection** – detects pawns-cli (iProyal proxy software) via process and file check (**Linux only** — automatically skipped on Windows and macOS)

## Platform support

Password and e-mail breach checking works on **all platforms** (Linux, Windows, macOS).

The **malware detection** (pawns-cli check) is **Linux-only** — the malware detection tool (pawns-cli) is a Linux binary and is not available on Windows or macOS. The check is automatically skipped on non-Linux systems; no configuration is required.

## Installation

Install via the ioBroker Admin interface — search for **pwned-check**.

## Configuration

### Passwords tab

Add one entry per password you want to monitor. Enter a **description** (e.g. the service name) and the **password**. The SHA-1 hash is computed in your browser and stored — the plaintext password is never saved.

| Field | Description |
|-------|-------------|
| Description | A label for this password (e.g. "GitHub") |
| Password | Entered once; only the SHA-1 hash is stored |

### E-Mails tab

Add one entry per e-mail address to monitor.

| Field | Description |
|-------|-------------|
| E-Mail | The e-mail address to check |

### Settings tab

| Setting | Description | Default |
|---------|-------------|---------|
| Interval | How often to check for new breaches | 24 hours |
| Theme | Light or dark visualisation | Light |
| Background transparency | Outer container opacity (0 = fully transparent) | 100% |
| Card transparency | Individual entry card opacity | 100% |
| Font size | Text size in the visualisation | 14 px |

## Data points

The adapter creates data points under `pwned-check.<instance>`.

### Passwords

| Data point | Type | Description |
|-----------|------|-------------|
| `passwords.<id>.isPwned` | boolean | `true` if found in a breach |
| `passwords.<id>.leakCount` | number | Number of times found in breach databases |
| `passwords.<id>.lastCheck` | string | ISO timestamp of last successful check |

### E-Mails

| Data point | Type | Description |
|-----------|------|-------------|
| `emails.<id>.isPwned` | boolean | `true` if found in a breach |
| `emails.<id>.lastCheck` | string | ISO timestamp of last successful check |
| `emails.<id>.leaks.<service>` | boolean | `true` for each breach source found |

### Other

| Data point | Type | Description |
|-----------|------|-------------|
| `visualisation` | string | HTML snippet for use in VIS or ioBroker.vis-2 |
| `info.connection` | boolean | `true` while a check is running |

## Privacy

- Passwords are **never** stored in plaintext — only their SHA-1 hash
- Password hashes are checked using the HIBP **k-anonymity** method: only the first 5 hex characters of the hash are transmitted; the full hash never leaves your system
- E-mail addresses are sent to the XposedOrNot API over HTTPS

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.9 (2026-07-01)
* (ipod86) fix: update adapter-core to 3.4.1, clarify malware scanner description in README (W0034)
* (ipod86) fix: update admin dependency to >= 7.8.23 and fix dependabot cooldown format (W8917)

### 0.0.8 (2026-06-09)
* (ipod86) fix: robust language detection for widget (toLowerCase + language fallback)
* (ipod86) fix: translate all widget strings to system language (SAFE/PWNED/section headers/last check)

### 0.0.7 (2026-06-08)
* (ipod86) fix: translate all object names and widget texts to English/system language
* (ipod86) fix: malware notification now only sent on new detection, not on every check
* (ipod86) fix: malware check skipped on non-Linux platforms (Windows/macOS)
* (ipod86) fix: i18n description key corrected in 9 language files

### 0.0.6 (2026-06-06)
* (ipod86) fix: add missing intermediate folder/channel objects for emails, passwords, system, leaks (E3009)
* (ipod86) fix: update @alcalzone/release-script to >=5.2.1 (E0036)

### 0.0.5 (2026-05-31)
* (ipod86) fix: use this.setInterval/clearInterval/setTimeout/delay instead of plain JS timers (W5004, W5005, W5051)
* (ipod86) fix: add missing i18n key "label" to all languages (W5604)
* (ipod86) fix: engines.node >= 22, @tsconfig/node22, @types/node ^22, deploy node 24 (E0028, E3022)
* (ipod86) fix: add dependabot ignore block for @types/node major versions (E8917)
* (ipod86) fix: remove Node 20 from test matrix (W3024)
* (ipod86) fix: upgrade typescript to 6.0.3, release-script to 5.2.0, @iobroker/eslint-config to 2.3.4

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 ipod86

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
