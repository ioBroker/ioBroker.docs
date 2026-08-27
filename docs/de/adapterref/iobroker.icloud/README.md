---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.icloud/README.md
title: ioBroker.icloud
hash: l8oC8rjNxbGr9CsPxPxumhQy7MaRHMcBJFABlnmDLLY=
---
![Logo](../../../en/adapterref/iobroker.icloud/admin/icloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.icloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.icloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/icloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/icloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.icloud.png?downloads=true)
![Deutsche Dokumentation](https://img.shields.io/badge/Doku-Deutsch-green?logo=readme)
![Englische Dokumentation](https://img.shields.io/badge/docs-English-blue?logo=readme)

# IoBroker.icloud
**Tests:** ![Test und Freigabe](https://github.com/ticaki/ioBroker.icloud/workflows/Test%20and%20Release/badge.svg)

## ICloud-Adapter für ioBroker
Dieser Adapter integriert Ihr Apple iCloud-Konto mit ioBroker. Er ermöglicht Ihnen den Zugriff auf eine Vielzahl von Apple-Diensten – von Gerätestandorten und Erinnerungen bis hin zu Drive-Dateien, Kontakten, Notizen, Kalenderereignissen und Ihrer Fotomediathek – die alle lesbar und (sofern unterstützt) beschreibbar sind, wie ioBroker es angibt oder über `sendTo()`.

---

## Credits
Dieser Adapter wäre ohne die folgenden Open-Source-Projekte nicht möglich gewesen:

- **[icloud.js](https://github.com/foxt/icloud.js)** von foxt — die ursprüngliche JavaScript iCloud-Clientbibliothek, von der dieser Adapter abgeleitet ist und auf der er aufbaut.
- **[pyicloud](https://github.com/picklepete/pyicloud)** von picklepete — die Python-Referenzimplementierung für Apples iCloud-APIs, die als Grundlage für viele der Serviceintegrationen diente.
- **[pyicloud (timlaing fork)](https://github.com/timlaing/pyicloud)** von timlaing — ein aktiv gepflegter Fork von pyicloud, der als Referenzimplementierung für moderne Erinnerungen (CloudKit v2) und andere aktuelle API-Details diente.

Ein herzliches Dankeschön an alle Mitwirkenden dieser Projekte!

## Haftungsausschluss
Dieser Adapter ist ein unabhängiges, von der Community entwickeltes Open-Source-Projekt. Er steht **in keiner Verbindung zu Apple Inc., wird weder von Apple Inc. unterstützt noch ist er in irgendeiner Weise offiziell mit Apple Inc. verbunden.**

iCloud, „Wo ist?“, Apple-ID, iCloud Drive und alle anderen Apple-Marken sind Eigentum von Apple Inc. Alle Produktnamen, Logos und Marken sind Eigentum ihrer jeweiligen Inhaber. Die Verwendung dieser Namen dient ausschließlich der Identifizierung.

Der Adapter greift über dieselben APIs, die auch von Apples eigenen Clients verwendet werden, auf Apples iCloud-Dienste zu. Die Nutzung dieser APIs unterliegt den Nutzungsbedingungen von Apple. Mit der Verwendung dieses Adapters erklären Sie sich mit allen geltenden Nutzungsbedingungen von Apple einverstanden. Der Autor übernimmt keine Haftung für Missbrauch des Adapters oder Verstöße gegen die Nutzungsbedingungen von Apple.

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