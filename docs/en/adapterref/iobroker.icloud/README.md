![Logo](admin/icloud.png)
# ioBroker.icloud

[![NPM version](https://img.shields.io/npm/v/iobroker.icloud.svg)](https://www.npmjs.com/package/iobroker.icloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.icloud.svg)](https://www.npmjs.com/package/iobroker.icloud)
![Number of Installations](https://iobroker.live/badges/icloud-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/icloud-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.icloud.png?downloads=true)](https://nodei.co/npm/iobroker.icloud/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.icloud/workflows/Test%20and%20Release/badge.svg)

## icloud adapter for ioBroker

This adapter integrates your Apple iCloud account with ioBroker. It gives you access to a wide range of Apple services — from device locations and reminders to drive files, contacts, notes, calendar events, and your photo library — all readable and (where supported) writable as ioBroker states or via `sendTo()`.

[![Deutsche Dokumentation](https://img.shields.io/badge/Doku-Deutsch-green?logo=readme)](README_GERMAN.md)

[![English documentation](https://img.shields.io/badge/docs-English-blue?logo=readme)](README_ENGLISH.md)


---

## Credits

This adapter would not have been possible without the following open-source projects:

- **[icloud.js](https://github.com/foxt/icloud.js)** by foxt — the original JavaScript iCloud client library that this adapter is derived from and builds upon.
- **[pyicloud](https://github.com/picklepete/pyicloud)** by picklepete — the Python reference implementation for Apple's iCloud APIs that guided many of the service integrations.
- **[pyicloud (timlaing fork)](https://github.com/timlaing/pyicloud)** by timlaing — an actively maintained fork of pyicloud that served as the reference implementation for modern Reminders (CloudKit v2) and other up-to-date API details.

A big thank you to all contributors of these projects!


## Disclaimer

This adapter is an independent, community-developed open-source project. It is **not affiliated with, endorsed by, or in any way officially connected to Apple Inc.**

*iCloud*, *Find My*, *Apple ID*, *iCloud Drive*, and all other Apple trademarks are the property of Apple Inc. All product names, logos, and brands are property of their respective owners. The use of these names is for identification purposes only.

The adapter accesses Apple's iCloud services using the same APIs that are used by Apple's own clients. Use of those APIs is subject to Apple's Terms of Service. By using this adapter, you agree to comply with all applicable Apple terms and conditions. The author accepts no liability for any misuse of the adapter or any violations of Apple's Terms of Service.


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-06-28)
* (ticaki) **New: FIDO2 / security-key MFA** — sign in with a hardware security key (passkey) straight from the admin panel; the full sign-in ceremony runs in the background with a live, localized status (MFA panel translated into 11 languages)
* (ticaki) Admin: the security-key button now shows a live "running" state while the background ceremony is in progress
* (ticaki) fixed: object writes in `syncMap` now use read-merge-write (`getObject` + `setObject`) so existing ACLs and custom settings are preserved instead of being overwritten
* (ticaki) changed: internal waits (security-key polling, PCS consent, geocoder rate-throttle) now use the cancellable adapter timer, so pending timers are cleared cleanly when the adapter unloads
* (ticaki) changed: geocoder HTTP requests now use `AbortSignal.timeout` with improved timeout detection
* (ticaki) fixed: addressed ioBroker repochecker findings for the latest-repo listing

### 0.7.7 (2026-05-11)
- (ticaki) Extends an ioBroker object only when the provided partial object has actually changed

### 0.7.6 (2026-04-26)
* (ticaki) fixed: SMS 2FA verification mode is now always forced to `sms` — using `pushMode` from the trusted phone could cause authentication failures

### 0.7.5 (2026-04-23)
* (ticaki) changed: Removed unused keytar dependency and code.
* (ticaki) fixed: jsonConfig warnings / all repochecker error, warnings
* (ticaki) donate link

### 0.7.4 (2026-04-22)
* (ticaki) New: SMS MFA panel in the General admin tab — appears automatically below the login fields when the adapter requests MFA; lets you request an SMS code and submit the 6-digit code directly from the admin UI without touching ioBroker states; visibility is driven by an internal adapter variable (not the `mfa.required` state) so the panel only appears once the adapter is ready to accept the code

Older changes are listed in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ticaki <github@renopoint.de>

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