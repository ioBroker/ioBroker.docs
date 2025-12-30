![Logo](admin/helios.png)
# ioBroker.helios

[![NPM version](https://img.shields.io/npm/v/iobroker.helios.svg)](https://www.npmjs.com/package/iobroker.helios)
[![Downloads](https://img.shields.io/npm/dm/iobroker.helios.svg)](https://www.npmjs.com/package/iobroker.helios)
![Number of Installations (latest)](https://iobroker.live/badges/helios-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/helios-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.helios.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.helios)

[![NPM](https://nodei.co/npm/iobroker.helios.png?downloads=true)](https://nodei.co/npm/iobroker.helios/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.helios/workflows/Test%20and%20Release/badge.svg)

## helios adapter for ioBroker

Helios KWL easyControls

Remote Befehle sind möglich, in dem man in die schreibbaren Datenpunkt Werte schreibt.

Datenpunkte zum aktualisieren:

1: Erstinbetriebnahme (inbetr.htm)  
2:  
3: Partybetrieb / Ruhemodus (party.htm + ruhe.htm)  
4: Aktuelle Lüfterstufe / Modus (info.htm)  
5: Nachheizung Profil (nachheiz.htm)  
6: Urlaubsprogramm (urlaub.htm)  
7: Geräte Daten / Seriennummer usw. (tinfo.htm)  
8: Systemstatus (Betriebsart, Drehzahl Lüfter, aktuelle Temperaturen) (anzeig.htm)  
9: Wochenprogramm (woche.htm)  
10: Netzwerkeinstellung (Ip, DNS, ect.) (web.htm)  
11: Uhrzeit / Betriebslaufzeit der Vorheizung ect. (syst.htm)  
12: Gerätekonfiguration / Filterwechsel / Bypass steuern (gaer.htm)  
13: Voltzahl der Lüfter (luft.htm)  
14: Konfiguration der Fühler (fueh.htm)  
15: Passwort ändern (lost.htm)  
16: Fehler Übersicht (fehl.htm)  
17:  
931:  

## Diskussion und Fragen  
https://forum.iobroker.net/topic/47762/test-helios-kwl-v0-0-x

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 0.1.0 (2024-04-17)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.0.1
* (iobroker-community-adapters) initial release

## License
MIT License

Copyright (c) 2021-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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