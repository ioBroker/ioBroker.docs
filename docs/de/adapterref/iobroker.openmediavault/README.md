---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openmediavault/README.md
title: ioBroker.openmediavault
hash: PIFlilMllP5K4tlwt7+nBxfg4xnUO5spN696H9Ba9tc=
---
![Logo](../../../en/adapterref/iobroker.openmediavault/admin/openmediavault.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.openmediavault.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openmediavault.svg)
![Anzahl der Installationen](https://iobroker.live/badges/openmediavault-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/openmediavault-stable.svg)
![NPM](https://nodei.co/npm/iobroker.openmediavault.png?downloads=true)
![Test und Freigabe](https://github.com/Scrounger/ioBroker.openmediavault/workflows/Test%20and%20Release/badge.svg)

# ioBroker.openmediavault

## OpenMediaVault-Adapter für ioBroker

Dieser Adapter ermöglicht das Auslesen von Informationen aus Ihrem OpenMediaVault über die RPC-Schnittstelle.

## Konfiguration

Sie benötigen die URL Ihres OpenMediavault-Servers und das Passwort Ihres Administratorkontos.<br> **Hinweis** : Die Verwendung eines Administratorkontos ist erforderlich, da die RPC-Schnittstelle nur für Administratoren verfügbar ist.

## Bekannte Probleme

Der Adapter verhindert, dass Festplatten während des zyklischen Pollings in den Standby-Modus wechseln, und weckt sie beim Abfragen aus dem Standby-Modus auf.<br> Der Grund dafür ist, dass dies im Design der RPC-API begründet liegt.<br> [Details anzeigen](https://github.com/openmediavault/openmediavault/issues/2063)

Um dies zu verhindern, können die Daten auch mithilfe eines Cronjobs aktualisiert werden.<br> Beispielsweise können Sie die Adapterabfrage für einen Zeitpunkt planen, an dem sich die Festplatten ohnehin nicht im Standby-Modus befinden, etwa während der Datensicherung.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.5.0 (2026-07-13)
- (Scrounger) dependencies updated
- (Scrounger) typescript 6.x bug fixes
- (Scrounger) authentication bug fix for >= v.8.5.x #63
- (copilot) Adapter requires node.js >= 22 now
- (ioBrokerTranslator) spanish language added #57

### 1.4.4 (2026-03-17)

- (Scrounger) dependencies updated

### 1.4.3 (2026-03-09)

- (Scrounger) translation updates
- (Scrounger) dependencies updated
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases

### 1.4.2 (2025-12-04)

- (Scrounger) connection timeout bug fix

### 1.4.1 (2025-12-02)

- (Scrounger) session expired bug fix

[Older changelogs can be found there](https://github.com/Scrounger/ioBroker.openmediavault/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Scrounger <scrounger@gmx.net>

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