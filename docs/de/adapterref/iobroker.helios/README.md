---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.helios/README.md
title: ioBroker.helios
hash: RfQkMmS8xZ5MptT8QVVrzxrcjyLi+B0CO86tff5UsBw=
---
![Logo](../../../en/adapterref/iobroker.helios/admin/helios.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.helios.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.helios.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/helios-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/helios-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.helios.svg)
![NPM](https://nodei.co/npm/iobroker.helios.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.helios/workflows/Test%20and%20Release/badge.svg)

# ioBroker.helios

## Helios-Adapter für ioBroker

Helios KWL easyControls

Fernbefehle sind möglich, indem Werte in die beschreibbaren Datenpunkte geschrieben werden.

Zu aktualisierende Datenpunkte:

1: Erstinbetriebnahme (inbetr.htm)\
&#x20;2:\
&#x20;3: Partymodus / Ruhemodus (party.htm + ruhe.htm)\
&#x20;4: Aktuelle Lüfterdrehzahl / Modus (info.htm)\
&#x20;5: Nachheizprofil (nachheiz.htm)\
&#x20;6: Urlaubsprogramm (urlaub.htm)\
&#x20;7: Gerätedaten / Seriennummer usw. (tinfo.htm)\
&#x20;8: Systemstatus (Betriebsmodus, Lüfterdrehzahl, aktuelle Temperaturen) (anzeig.htm)\
&#x20;9: Wochenprogramm (woche.htm)\
&#x20;10: Netzwerkeinstellungen (IP, DNS usw.) (web.htm)\
&#x20;11: Zeit / Betriebsstunden der Vorwärmung usw. (syst.htm)\
&#x20;12: Gerätekonfiguration / Filteränderung / Bypass-Steuerung (gaer.htm)\
&#x20;13: Spannung der Lüfter (luft.htm)\
&#x20;14: Sensorkonfiguration (fueh.htm)\
&#x20;15: Passwort ändern (lost.htm)\
&#x20;16: Fehlerübersicht (fehl.htm)\
&#x20;17:\
&#x20;931:

## Diskussion und Fragen

<https://forum.iobroker.net/topic/47762/test-helios-kwl-v0-0-x>

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


[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.helios/blob/master/CHANGELOG_OLD.md)

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