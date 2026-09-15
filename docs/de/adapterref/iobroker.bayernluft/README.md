---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bayernluft/README.md
title: ioBroker.bayernluft
hash: 7zWw4VLFLGm3gFgVmGp92N0Lv+Ou97cdlMCUP9CJP+w=
---
![Logo](../../../en/adapterref/iobroker.bayernluft/admin/bayernluft.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bayernluft.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bayernluft.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bayernluft-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bayernluft-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bayernluft.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.bayernluft/workflows/Test%20and%20Release/badge.svg)

# ioBroker.bayernluft

## BayernLuft-Adapter für ioBroker

Verbindet Lüftungsgeräte des Herstellers [BayernLuft](https://www.bayernluft.de/) mit IoBroker-Systemen.

## Haftungsausschluss

**Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele.**

## Was muss getan werden?

Um diesen Adapter verwenden zu können, müssen Sie die Exportvorlage des Geräts ändern.\
&#x20;**Bitte befolgen Sie unbedingt die folgenden Schritte:**

## Wie kann ich die Vorlage ändern?

1. Rufen Sie die Weboberfläche Ihres Geräts auf.
2. Klicken Sie auf das Zahnradsymbol für die Einstellungen, um zu den Einstellungen zu gelangen.
3. Scrollen Sie nach unten, bis Sie den Expertenmodus sehen.
4. Laden Sie die Datei 'export\_iobroker.txt' aus diesem GitHub-Repository hoch.
5. Fertig! Richten Sie das Gerät in der Adapterinstanz ein. Der Standardport des Geräts ist 80.

## Gut zu wissen

Die Befehle commands.setSpeedIn, commands.setSpeedOut und commands.setSpeedAntiFreeze funktionieren nur, wenn das Gerät ausgeschaltet ist. Wenn das Gerät eingeschaltet ist, werden die Befehle zwar vom Gerät erkannt, es passiert aber nichts (Sie können dies manuell in den entsprechenden Statuswerten states.speed\_in, states.speed\_out und states.speed\_antifreeze überprüfen).

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @Marco15453 ( <https://github.com/Marco15453> ), der Version 1.xx dieses Adapters entwickelt hat, nicht möglich gewesen. Ein herzliches Dankeschön geht auch an die Firma Bayernluft für ihre hervorragende Unterstützung.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 3.1.1 (2026-02-11)
* (mcm1957) Dependencies have been updated

### 3.1.0 (2025-09-07)
* (mcm1957) Adapter requires Admin >= 7.6.17, js-controller >= 6.0.11 and node.js >= 20 now.
* (mcm1957) Dependencies have been updated

### 3.0.0 (2025-02-24)
* (boriswerner) **Breaking Change:** All states from the 2.alpha versions have been removed and the adapter has been completely redesigned. The Bayernlüfter devices need a new export configuration file. Please upload export_iobroker.txt to each of your devices and delete old states.
* (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
* (boriswerner) Commands have been implemnted for individual fan speeds (see  WS32240427 in https://www.bayernluft.de/de/wlan32_changelist.html):
    When device is turned off, the fans can be set individually (commands: setSpeedIn, setSpeedOut, setSpeedAntiFreeze)
* (boriswerner) States in "states"-folder have been set to read-only
* (boriswerner) Roles of states have been changed
* (boriswerner) Update interval label and set default port have been fixed
* (mcm1957) Missing values from device are set to null and qs flag is set to 0x82 now
* (mcm1957) Units have been added where appropiate
* (mcm1957) Translations have been added for all supported languages
* (mcm1957) Dependencies have been updated

### 2.0.1 (2025-01-16)
* (mcm1957) AdminUI and translations have been fixed.

### 2.0.0 (2025-01-14)
* (mcm1957) Adapter requires node.js 20, js-controller 6 and and admin 6 now.
* (boriswerner) Corrected the API calls to match the new API (rev 2.0 version WS32231301, see: https://www.bayernluft.de/de/wlan32_changelist.html)
* (boriswerner) Corrected the ACK-handling in onStateChange
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.bayernluft/blob/main/CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Marco15453 <support@marco15453.xyz>

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