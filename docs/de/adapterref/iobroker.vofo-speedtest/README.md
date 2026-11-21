---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vofo-speedtest/README.md
title: ioBroker.vofo-speedtest
hash: 9ZbE6oSfscyv0H3HB+zcsaB9Z6sw9bmNtPjrHqtvHYQ=
---
![Logo](../../../en/adapterref/iobroker.vofo-speedtest/admin/vofo-speedtest.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.vofo-speedtest)
![Downloads](https://img.shields.io/npm/dm/iobroker.vofo-speedtest.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.vofo-speedtestd)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/vofo-speedtest/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.vofo-speedtest)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.vofo-speedtest/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.vofo-speedtest)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.vofo-speedtest)
![NPM-Version](https://img.shields.io/npm/v/iobroker.vofo-speedtest.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vofo-speedtest-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vofo-speedtest-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/github-code-scanning/codeql/badge.svg)

# ioBroker.vofo-speedtest

**Version:**

**Tests:**

> \[!WICHTIG] Dieser Adapter kann nicht von GitHub installiert werden. ## vofo-speedtest-Adapter für ioBroker

Geschwindigkeitstest von Vodafone.de

Wendet dieselbe Technik an wie <https://speedtest.vodafone.de>

Der Test funktioniert auch mit Verbindungen anderer Anbieter. Vodafone meldet die gebuchte Geschwindigkeit nur für seine eigenen Kunden, ohne eine Vodafone-Verbindung also nicht. `downstreamBooked` Und `upstreamBooked` Sie bleiben leer, und die Widgets zeigen keinen Prozentsatz der gebuchten Geschwindigkeit an.

## Starten eines Tests

Der Adapter läuft permanent und startet den Test von selbst:

- gemäß dem Zeitplan in den Instanzeinstellungen (Standard: Minute 11 und 41 jeder Stunde); lassen Sie das Feld leer, um Tests nur bei Bedarf zu starten.
- Wann `true` wird geschrieben an `vofo-speedtest.0.test.start` z. B. über die Schaltfläche in den Instanzeinstellungen oder den Widgets oder über ein Skript.

Ein Start während eines laufenden Tests wird ignoriert.

| Zustand        | Bedeutung                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test.start`   | Schreiben `true` einen Test starten                                                                                                                       |
| `test.running` | Ein Test läuft.                                                                                                                                          |
| `test.phase`   | Testphase: `init`, `download`, `upload`, `ping` leer, wenn im Leerlauf                                                                                    |
| `test.speed`   | Aktuelle Download- und Upload-Geschwindigkeit in Mbit/s                                                                                                  |
| `test.error`   | Fehler des letzten Tests, leer, wenn er erfolgreich war. Zeigt außerdem an, wenn der Ping-Server nicht geantwortet hat: Download und Upload sind gültig. |

## Widgets

Der Adapter bietet für drei Frontends dieselbe Ansicht: Anzeigen für Download- und Upload-Geschwindigkeit, den Prozentsatz der gebuchten Geschwindigkeit (sofern vom Anbieter angegeben), Ping, Paketverlust, den Zeitpunkt des letzten Tests und eine Schaltfläche zum Starten eines Tests. Während eines Tests zeigen die Anzeigen die aktuelle Geschwindigkeit an.

- **vis-2** : das Widget-Set `vofo-speedtest`
- **ioBroker.devices** : eine Kachel in den Größen 1x1, 2x0,5 und 2x1
- **Webkomponente** : `<iob-vofo-speedtest>` für jeden Gastgeber `@iobroker/web-components` z. B. Aura

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von Peter Baumert <ioBroker.unifi-protect@outlook.com> , der die erste Version dieses Adapters implementiert hat, nicht möglich gewesen.

## Haftungsausschluss

Vodafone ist eine Marke der Vodafone GmbH. Ich stehe in keiner Verbindung zu Vodafone GmbH oder deren Tochtergesellschaften, Logos oder Marken und werde von diesen auch nicht unterstützt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.1.0 (2026-11-16)
- (bluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 3.0.1 (2026-11-08)
- (mcm1957) Issues detected by repositorychecker have been fixed

### 3.0.0 (2026-11-08)
- (copilot) BREAKING: Adapter requires node.js >= 22.19.0 now
- (copilot) BREAKING: Adapter requires admin >= 8.3.10 now
- (copilot) BREAKING: Adapter requires js-controller >= 6.0.11 now
- (bluefox) BREAKING: The adapter runs permanently now and starts the test by itself. A schedule changed in the instance settings is taken over
- (bluefox) BREAKING: The option "Use curl" has been removed. node-libcurl is not used anymore, download and upload run over node.js https
- (bluefox) Added: start a test with the state `test.start` (#153), and the states `test.running`, `test.phase`, `test.speed` and `test.error`
- (bluefox) Added: the instance settings show the result and the running test, with a button to start a test
- (bluefox) Added: `test.error` tells if the ping server did not answer
- (bluefox) Added: a vis-2 widget, a tile for ioBroker.devices and the web component `<iob-vofo-speedtest>`
- (bluefox) Fixed: upload values were missing without curl (#253)
- (bluefox) Fixed: the adapter did not stop if the API key could not be found on speedtest.vodafone.de, the next start failed with "already running" (#239, #208)
- (bluefox) Fixed: the download test without curl used outdated server paths
- (bluefox) The option "Local address" is evaluated now
- (bluefox) The adapter was refactored to TypeScript

### 2.0.1 (2024-04-29)
* (mcm1957) Dependencies have been updated

### 2.0.0 (2024-03-29)
* (mcm1957) BREAKING: Adapter requires node.js 18, js-controller >= 5 and admin >= 6 now
* (mcm1957) Adapter has been moved to iobroker-community-adapters organisation
* (mcm1957) Metrialize admin UI has been removed as jsonConfig is available
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 Peter Baumert <ioBroker.unifi-protect@outlook.com>

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