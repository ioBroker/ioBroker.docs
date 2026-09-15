---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.voltoplus/README.md
title: ioBroker.voltoplus
hash: E3Det/l6IE3mZ3W26z3ZeVrVj1pmCW70qcRDKsK4jUc=
---
![Logo](../../../en/adapterref/iobroker.voltoplus/admin/voltoplus.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.voltoplus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.voltoplus.svg)
![Anzahl der Installationen](https://iobroker.live/badges/voltoplus-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/voltoplus-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Jey-Cee/iobroker.voltoplus.svg)
![NPM](https://nodei.co/npm/iobroker.voltoplus.png?downloads=true)
![Test und Freigabe](https://github.com/Jey-Cee/ioBroker.voltoplus/workflows/Test%20and%20Release/badge.svg)

# ioBroker.voltoplus

## VoltoPlus-Adapter für ioBroker

Empfangen Sie Echtzeitdaten vom VoltoPlus-Energiezähler.

## Sponsoren

Wenn Ihnen meine Arbeit gefällt, freue ich mich über eine persönliche Spende.\
&#x20;(Dies ist ein persönlicher Spendenlink für Jey Cee und steht in keiner Verbindung zum ioBroker-Projekt!)\
[![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=95YZN2LR59Q64\&source=url)

## Verwendung

Geben Sie einfach die IP-Adresse des VoltoPlus-Energiezählers in den Adaptereinstellungen ein. Der Adapter liest die Daten dann jede Sekunde aus.

## Haftungsausschluss

Die Entwickler dieses Moduls stehen in keiner Verbindung zu Wallner Automation GmbH oder deren Tochtergesellschaften, Logos oder Marken und werden von diesen auch nicht unterstützt.

## Links

[Produkt](https://www.voltoplus.com/shop/voltoplus/167/voltoplus?c=44)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
### 0.2.13 (2026-09-03)
* Bump @alcalzone/release-script-plugin-license from 5.2.0 to 5.2.2

### 0.2.12 (2026-08-03)
* Bump @types/node from 25.9.4 to 25.9.5
* Bump @iobroker/testing from 5.2.2 to 5.3.0

### 0.2.11 (2026-07-03)
* Bump @types/node from 25.9.1 to 25.9.4
* Bump @alcalzone/release-script from 5.2.0 to 5.2.1

### 0.2.10 (2026-06-03)
* Bump @alcalzone/release-script-plugin-manual-review from 5.1.1 to 5.2.0
* Bump @alcalzone/release-script from 5.1.1 to 5.2.0
* Bump @alcalzone/release-script-plugin-license from 5.1.1 to 5.2.0
* Bump @iobroker/eslint-config from 2.2.0 to 2.3.4
* Bump @types/node from 25.6.0 to 25.9.1
* Bump @alcalzone/release-script-plugin-iobroker from 5.1.2 to 5.2.0
* Update from template: S6020-addChangelogOld
* Update from template: X0000-dropNode20
* Update from template: W8917-dependabot-addIgnoreTypesNode
* Bump axios from 1.13.6 to 1.15.2

### 0.2.9 (2026-05-03)
* Bump @types/node from 25.5.0 to 25.6.0
* Update from template: X0000-updateNodeJsAtTestAndRelease

### 0.2.8 (2026-04-02)
* Update dependencies
* automate release

### 0.2.7 (2026-03-31)
* publish directly from monthly release workflow

### 0.2.6 (2026-03-31)
* next try to fix monthly release workflow

### 0.2.5 (2026-03-31)
* next try to fix monthly release workflow

### 0.2.4 (2026-03-31)
* switch to PAT for GitHub release token

### 0.2.3 (2026-03-31)
* dont block test and release
* remove codeql.yml

### 0.2.2 (2026-03-31)
* updated codeql.yml fix monthly-release.yml
* only test against ubuntu-latest
* fix lint error no-unused-vars in main.js
* update test and release workflow
* chore: update monthly release workflow - add io-package.json and README changelog
* chore: add monthly release workflow
* Uncomment NPM deployment section in workflow
* Delete .github/workflows/dependabot-auto-merge.yml.OLD
* fix admin dependency version to >=7.6.17
* update dependabot.yml
* update dependencies
* Bump @alcalzone/release-script-plugin-license from 3.7.0 to 5.1.1
* Bump @alcalzone/release-script from 3.8.0 to 5.1.1
* Bump axios from 1.13.2 to 1.13.6
* Bump @types/node from 25.0.3 to 25.5.0
* Update from template: X0000-updateNodeJsAtTestAndRelease
* Update from template: X0000-setupAutomergeDependabot
* Update from template: E6005-fixCopyrightYear
* Bump @types/node from 22.10.3 to 25.0.3
* Update from template: E40xx-fixSchemaLinkForVsCode

### 0.2.1 (2025-10-13)
* Fix value handling

### 0.2.0 (2025-09-26)
* Better value handling

### 0.1.4 (2024-09-30)
* Update dependencies
* Fix issues found by adapter checker

### 0.1.3 (2023-07-27)
* stable release

### 0.1.2 (2023-07-27)
* stable release

### 0.1.1 (2022-11-17)
* some fixes for relesase

### 0.1.0 (2022-10-18)
* Changed unit of energy_purchased & energy_supplied from W to kWh
* divide value of energy_purchased & energy_supplied by 10
* Update depenendencies

### 0.0.1
* (Jey Cee) initial release

[Older changelogs can be found there](https://github.com/Jey-Cee/ioBroker.voltoplus/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Jey Cee <jey-cee@live.com>

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