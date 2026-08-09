---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.goodwe-pv/README.md
title: iobroker.goodwe-pv
hash: iEexl/0XQ1u+9s0VjuF+yhHrKatDEK509JdH4pg2nvA=
---
![Logo](../../../en/adapterref/iobroker.goodwe-pv/admin/goodwe-pv.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.goodwe-pv.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe-pv.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.goodwe-pv?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.goodwe-pv?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.goodwe-pv?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.goodwe-pv/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/iobroker.goodwe-pv?branch=master&svg=true)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/hombach/iobroker.goodwe-pv/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.goodwe-pv.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/goodwe-pv-stable.svg)
![Installiert](https://iobroker.live/badges/goodwe-pv-installed.svg)
![NPM](https://nodei.co/npm/iobroker.goodwe-pv.png?downloads=true)

# Iobroker.goodwe-pv
[![CodeQL](https://github.com/hombach/iobroker.goodwe-pv/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/iobroker.goodwe-pv/actions/workflows/codeql-analysis.yml)

## Versionen
## Wächter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">der Sentry-Plugin-Dokumentation</a> !

## Goodwe-pv Adapter für ioBroker
Kommunikation mit Hybrid-Wechselrichtern der Serien ET, EH, BH und BT über die lokale UDP-Schnittstelle (Port 8899). Keine Cloud-Verbindung erforderlich – der Adapter kommuniziert direkt mit dem Wechselrichter in Ihrem LAN.

### Unterstützte Geräte
Alle GoodWe-Hybridwechselrichter, die die lokale Modbus-over-UDP-Schnittstelle an Port 8899 bereitstellen:

- ET-Serie (z. B. GW5-ET, GW8-ET, …)
- EH-Serie
- BH-Serie
- BT-Serie

## Konfiguration
**IP-Adresse** – Lokale IP-Adresse des GoodWe-Wechselrichters (Standard: `127.0.0.1`). Sie finden diese in der DHCP-Leasetabelle Ihres Routers oder im SEMS-Portal/in der ShinePhone-App unter „Geräteinformationen“. Eine statische IP-Adresse oder eine DHCP-Reservierung wird empfohlen.

**Abfragezyklus** – Wie oft in Sekunden jede Datengruppe vom Wechselrichter neu ausgelesen wird (Standard: `10`). Die vier Datengruppen (DeviceInfo, RunningData, ExtComData, BMSInfo) sind zeitlich versetzt, sodass pro Sekunde nur eine UDP-Anfrage gesendet wird.

**Tipp:** Die IP-Adresse des Wechselrichters finden Sie in der DHCP-Leasetabelle Ihres Routers oder im GoodWe SEMS-Portal bzw. in der ShinePhone-App unter „Geräteinformationen“. Es wird empfohlen, eine statische IP-Adresse zuzuweisen oder eine DHCP-Reservierung vorzunehmen, damit sich die Adresse nicht ändert.

## Bezogen auf
Dieser Adapter basiert auf [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe) von [FossyTom](https://github.com/FossyTom/ioBroker.goodwe)](https://github.com/FossyTom) (Thomas Schönberger), lizenziert unter MIT.
Copyright (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=GR6PERNQHJQ2A"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) updated dependencies

### 0.2.4 (2026-08-07)

- (hombach) add missing descriptions to DeviceInfo and BMSInfo states
- (hombach) remove placeholder desc "-" from states without a meaningful description
- (hombach) remove unused Rtc field from GoodWeRunningData type
- (hombach) updated dependencies

### 0.2.3 (2026-07-18)

- (hombach) replace deprecated role value.power.consumption with value.energy.consumed
- (hombach) replace value.power.produced with value.energy.produced for accumulated kWh states
- (hombach) replace invalid roles value.power.apparent and value.signal with valid alternatives

### 0.2.2 (2026-07-12)

- (hombach) assign semantic ioBroker roles to many states
- (hombach) fix PowerFactor scaling: signed int / 1000 instead of uint / 100
- (hombach) fix TotalReactivePower sign: use signed int (VAR can be negative)
- (hombach) fix EnergyTotalSell/Buy unit: GM3000 meter float is in Wh, divide by 1000

### 0.2.1 (2026-07-12)

- (hombach) add GoodWe manufacturer link to README
- (hombach) remove debug code (checkPasswordAsync/checkGroupAsync) from onReady
- (hombach) disable unused onStateChange handler (no writable states)
- (hombach) add runtime validation for pollCycle config parameter
- (hombach) expose DerateFlag as ioBroker state in RunningData
- (hombach) fix UTF-8 encoding corruption in all i18n translation files

### 0.2.0 (2026-07-05)

- (hombach) added units
- (hombach) replace chai/sinon-chai test dependencies with node:assert
- (hombach) fix test runner TS5011 rootDir error
- (hombach) remove redundant mocha/@types/mocha devDependencies (already included in @iobroker/testing)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 hombach <goodwePV@homba.ch>

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