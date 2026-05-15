---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.helios/README.md
title: ioBroker.helios
hash: aLHvTFftXrhYG9JsAVweaQyMa8O6Me8byCb00XAYof0=
---
![Logo](../../../en/adapterref/iobroker.helios/admin/helios.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.helios.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.helios.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/helios-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/helios-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.helios.svg)
![NPM](https://nodei.co/npm/iobroker.helios.png?downloads=true)

# IoBroker.helios
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.helios/workflows/Test%20and%20Release/badge.svg)

## Helios-Adapter für ioBroker
Helios KWL easyControls

Fernbefehle sind möglich, indem Werte in die beschreibbaren Datenpunkte geschrieben werden.

Zu aktualisierende Datenpunkte:

1: Erstinbetriebnahme (inbetr.htm) 2: 3: Partymodus / Leisemodus (party.htm + ruhe.htm) 4: Aktuelle Lüfterdrehzahl / Modus (info.htm) 5: Nachheizprofil (nachheiz.htm) 6: Urlaubsprogramm (urlaub.htm) 7: Gerätedaten / Seriennummer usw. (tinfo.htm) 8: Systemstatus (Betriebsmodus, Lüfterdrehzahl, aktuelle Temperaturen) (anzeig.htm) 9: Wochenprogramm (woche.htm) 10: Netzwerkeinstellungen (IP, DNS usw.) (web.htm) 11: Zeit / Betriebsstunden der Vorheizung usw. (syst.htm) 12: Gerätekonfiguration / Filterwechsel / Bypass-Steuerung (gaer.htm) 13: Lüfterspannung (luft.htm) 14: Sensorkonfiguration (fueh.htm) 15: Passwort ändern (lost.htm) 16: Fehlerübersicht (fehl.htm) 17: 931:

## Diskussion und Fragen
https://forum.iobroker.net/topic/47762/test-helios-kwl-v0-0-x

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-05-10)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 0.1.0 (2024-04-17)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.0.1
* (iobroker-community-adapters) initial release

## License
MIT License

Copyright (c) 2021-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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