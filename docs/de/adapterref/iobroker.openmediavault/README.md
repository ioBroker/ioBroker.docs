---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openmediavault/README.md
title: ioBroker.openmediavault
hash: pms8zano3DR5vTltb8NPc+e2JUtk6fX6IcmGNHGK1IY=
---
![Logo](../../../en/adapterref/iobroker.openmediavault/admin/openmediavault.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.openmediavault.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openmediavault.svg)
![Anzahl der Installationen](https://iobroker.live/badges/openmediavault-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/openmediavault-stable.svg)
![NPM](https://nodei.co/npm/iobroker.openmediavault.png?downloads=true)

# IoBroker.openmediavault
**Tests:** ![Test und Freigabe](https://github.com/Scrounger/ioBroker.openmediavault/workflows/Test%20and%20Release/badge.svg)

## OpenMediaVault-Adapter für ioBroker
Dieser Adapter ermöglicht das Auslesen von Informationen aus Ihrem OpenMediaVault über die RPC-Schnittstelle.

## Konfiguration
Sie benötigen die URL Ihres OpenMediavault-Servers und das Passwort Ihres Administratorkontos.<br> **Hinweis:** Die Verwendung eines Administratorkontos ist erforderlich, da die RPC-Schnittstelle nur für Administratoren verfügbar ist.

## Bekannte Probleme
Der Adapter verhindert, dass Festplatten während des zyklischen Pollings in den Standby-Modus wechseln, und weckt sie beim Abfragen aus dem Standby-Modus auf.<br> Der Grund dafür ist, dass dies im Design der RPC-API begründet liegt.<br> [Details anzeigen](https://github.com/openmediavault/openmediavault/issues/2063)

Um dies zu verhindern, können die Daten auch mithilfe eines Cronjobs aktualisiert werden.<br> Beispielsweise können Sie die Adapterabfrage für einen Zeitpunkt planen, an dem sich die Festplatten ohnehin nicht im Standby-Modus befinden, etwa während der Datensicherung.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.4.2 (2025-12-04)

- (Scrounger) connection timeout bug fix

### 1.4.1 (2025-12-02)

- (Scrounger) session expired bug fix

### 1.4.0 (2025-12-01)

- (Scrounger) option to update data with cron job added
- (Scrounger) connection timeout configurable
- (Scrounger) dependencies updated
- (Scrounger) disk and s.m.a.r.t using label as channel name if avaiable

### 1.3.0 (2025-11-24)

- (Scrounger) s.m.a.r.t. error indicator added
- (Scrounger) filesystem status, isOnline, hasErrors indicators added

### 1.2.0 (2025-11-23)

- (Scrounger) using disk uuid as channel id for disk and s.m.a.r.t -> Breaking Change !!!
- (Scrounger) bug fixes

### 1.1.0 (2025-11-21)

- (Scrounger) additonal s.m.a.r.t. attributes added
- (Scrounger) dependencies updated

### 1.0.4 (2025-10-19)

- (Scrounger) auto translation bug fix
- (Scrounger) bug fixes

### 1.0.3 (2025-09-30)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.2 (2025-09-27)

- (Scrounger) bug fixes

### 1.0.1 (2025-09-21)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.0 (2025-09-11)

- (Scrounger) automatic role assignment implemented
- (Scrounger) translation added

### 1.0.0-beta.2 (2025-08-31)

- (Scrounger) adapter config layout bug fixes
- (Scrounger) converted to esm project
- (Scrounger) bug fixes

### 1.0.0-beta.1 (2025-07-08)

- (Scrounger) devices blacklist / whitelist added
- (Scrounger) bug fixes

### 1.0.0-beta.0 (2025-07-07)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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