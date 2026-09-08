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
### 2.0.5 (2026-09-06)
* (ticaki) new: when Apple refuses `/ca/startup`, the titles, colours and flags of the reconstructed calendars are now fetched separately via `/ca/collections` — such calendars only appeared under their guid before, and a list answer also brings back calendars that have no event in the queried range
* (ticaki) changed: the warning about a reconstructed calendar list now states how many calendars could be completed with their real metadata, and a title delivered by Apple is no longer overwritten by the one stored from an earlier refresh

### 2.0.4 (2026-09-06)
* (ticaki) fixed: the calendar could fail permanently with `WEBSERVICE_REAUTH_REQUIRED:calendar` although the session was still valid — the service re-authentication no longer posts the account password to Apple's `accountLogin` (which answers HTTP 421 for every account with two-factor authentication) but refreshes the webservices with the session token, the way FindMy has been doing it all along
* (ticaki) fixed: an empty HTTP 500 is no longer mistaken for an expired session — only a real HTTP 401 triggers a calendar re-authentication now
* (ticaki) fixed: when Apple refuses `/ca/startup`, the calendar list is now taken from a single-day `/startup` request and, if that fails too, reconstructed from the `pGuid`s of `/ca/events` — the adapter delivers the events instead of aborting the whole refresh, and a reconstructed list never deletes existing calendar objects
* (ticaki) changed: the calendar service now picks up the calendar partition URL returned by a re-authentication instead of reusing the cached one

### 2.0.3 (2026-09-06)
* (ticaki) fixed: requesting a 2FA code by SMS could fail with `SMS request failed (500)` — the session is now refreshed directly before the request and a rejected request is retried once with the complete phone number payload
* (ticaki) fixed: calendar requests now carry the `clientBuildNumber` / `clientMasteringNumber` / `clientId` parameters that Apple's own web client sends — without them stricter calendar servers answered with an empty HTTP 500
* (ticaki) changed: failed SMS and calendar requests now report Apple's actual error (service errors, edge headers) instead of a truncated JSON fragment, and all adapter messages are English now

### 2.0.2 (2026-09-05)
* (ticaki) fixed: a failed calendar request no longer deleted all calendar objects and left only `calendar.lastSync` behind — an empty calendar list is now treated as an error, the existing objects are kept and the failure is logged

### 2.0.1 (2026-09-03)
* (ticaki) fixed: login failed with `SRP init failed (409)` when a leftover session from an aborted 2FA attempt was still on disk — the stale session is now discarded and the sign-in retried once
* (ticaki) fixed: the fresh scnt / session id returned by Apple's SRP init response is now used for the following `signin/complete` request

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