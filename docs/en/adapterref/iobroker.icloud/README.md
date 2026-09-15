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
### 2.1.2 (2026-09-15)
* (ticaki) fixed: when Apple requires the account holder to accept updated iCloud terms and conditions (`termsUpdateNeeded`; Find My answers `HTTP 450` although the session is valid), the adapter stops with a clear error message — accept the terms at icloud.com or on an Apple device and start the instance again — instead of re-authenticating in an endless loop
* (ticaki) fixed: a session recovery now performs a real re-login — session token and cookies are dropped, the trust token is kept so no new MFA is required — and backs off (10 s, 1 min, 5 min, 15 min, 30 min) when it keeps failing, instead of re-validating the same session token every 10 s
* (ticaki) new: option "Accept updated iCloud terms automatically" (off by default) — when Apple flags the account with `termsUpdateNeeded`, the adapter fetches the current terms version via `/getTerms`, confirms it via `/repairDone` and re-runs `accountLogin`, the way pyicloud's `accept_terms` does; enabling it means agreeing to Apple's terms without reading them
* (ticaki) fixed: a failed refresh during startup no longer reports "iCloud connection established"

### 2.1.1 (2026-09-15)
* (ticaki) fixed: the adapter crashed with `UNCAUGHT_EXCEPTION` (unhandled promise rejection `HTTP 450`) when Find My rejected the session — the Find My service started a second, unmonitored `refresh()` in its constructor in parallel to the adapter's own call; the adapter's error handling and session recovery now apply
* (ticaki) fixed: reminders text containing U+2028/U+2029 line separators or control characters is normalised before being stored

### 2.1.0 (2026-09-10)
* (ticaki) new: `calendar.agenda` — every event of a configurable window (days back / days ahead, selectable calendars) as one JSON object keyed by local day, with calendar title and colour and absolute alarm times; rebuilt on every refresh and shortly after midnight, written only when it changes
* (ticaki) fixed: an event that started before today and is still running (e.g. a multi-day all-day event) no longer disappears from the calendar slots
* (ticaki) changed: the calendar refresh and `queryCalendarEvents` share one month-by-month fetch

### 2.0.6 (2026-09-10)
* (ticaki) fixed: an MFA code requested via SMS was rejected with Apple error -21669 ("incorrect verification code") on accounts whose trusted phone number Apple reports with `pushMode: "voice"` — the code was submitted with `mode: "voice"` although Apple had confirmed SMS delivery for the request; the verification now repeats the channel and the phone payload that Apple accepted for the code request

### 2.0.5 (2026-09-06)
* (ticaki) new: when Apple refuses `/ca/startup`, the titles, colours and flags of the reconstructed calendars are now fetched separately via `/ca/collections` — such calendars only appeared under their guid before, and a list answer also brings back calendars that have no event in the queried range
* (ticaki) changed: the warning about a reconstructed calendar list now states how many calendars could be completed with their real metadata, and a title delivered by Apple is no longer overwritten by the one stored from an earlier refresh

Older changes are listed in CHANGELOG_OLD.md.

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