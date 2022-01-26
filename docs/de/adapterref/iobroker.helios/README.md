---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.helios/README.md
title: ioBroker.helios
hash: 3GjQa2i11XAd7dg3Toe1zS0jBi5gi/qngJgCP8GH+zo=
---
![Logo](../../../en/adapterref/iobroker.helios/admin/helios.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.helios.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.helios.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/helios-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/helios-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.helios.svg)
![NPM](https://nodei.co/npm/iobroker.helios.png?downloads=true)

#ioBroker.helios
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.helios/workflows/Test%20and%20Release/badge.svg)

##helios-Adapter für ioBroker
Helios KWL easyControls

Remote Befehle sind möglich, in dem man in die schreibbaren Datenpunkt Werte schreibt.

Datenpunkte zum aktualisieren:

1: Erstinbetriebnahme (inbetr.htm) 2: 3: Partybetrieb / Ruhemodus (party.htm + ruhe.htm) 4: Aktuelle Lüfterstufe / Modus (info.htm) 5: Nachheizung Profil (nachheiz.htm) 6: Urlaubsprogramm (urlaub. htm) 7: Geräte Daten / Seriennummer usw. (tinfo.htm) 8: Systemstatus (Betriebsart, Drehzahl Lüfter, aktuelle Temperaturen) (anzeig.htm) 9: Wochenprogramm (woche.htm) 10: Netzwerkeinstellung (Ip, DNS, ect.) (web.htm) 11: Uhrzeit / Betriebslaufzeit der Vorheizung ect. (syst.htm) 12: Gerätekonfiguration / Filterwechsel / Bypass steuern (gaer.htm) 13: Voltzahl der Lüfter (luft.htm) 14: Konfiguration der Fühler (fueh.htm) 15: Passwort ändern (lost.htm) 16: Fehler Übersicht (fehl.htm) 17:931:

## Diskussion und Fragen
https://forum.iobroker.net/topic/47762/test-helios-kwl-v0-0-x

## Changelog

### 0.0.1
* (iobroker-community-adapters) initial release

## License
MIT License

Copyright (c) 2021 iobroker-community-adapters

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