---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hekr/README.md
title: ioBroker.hekr
hash: /5C1XJSnWxGJjGbsjCn9PIRw6CU+e2Dt+QNrFoYSmY8=
---
![Logo](../../../en/adapterref/iobroker.hekr/admin/hekr.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hekr.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hekr.svg)
![Anzahl der Installationen](https://iobroker.live/badges/hekr-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hekr-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.hekr.svg)
![NPM](https://nodei.co/npm/iobroker.hekr.png?downloads=true)

#ioBroker.hekr
**Tests:** ![Testen und freigeben](https://github.com/TA2k/ioBroker.hekr/workflows/Test%20and%20Release/badge.svg)

## Hekr-Adapter für ioBroker
Adapter für Hekr Wisen Elro Apps

##Anmeldeablauf
Die Weisen App Mail und Passwort eingeben.

## Befehle im lokalen Netzwerk senden
Befehle werden im lokalen Netzwerk an das Gerät gesendet.

##Steuern
Einschalten/Ausschalten hekr.0.{ID}.status.sw auf 1 oder 0 setzen hekr.0.{ID}.status.light_Sw auf 1 oder 0 setzen hekr.0.{ID}.status.Statue 0 = Aus, 1 = Standby, 2 = Licht an / L�fter an hekr.0.{ID}.status.cleaning auf 0 stzen l�scht die Info Filterwechsel.
hekr.0.{ID}.status.rgb Wechselt die Farbe der Haube. Nur Hex erlaubt Bsp. #65ff00 oder 65ff00 hekr.0.{ID}.status.speed Geschwindigkeit 1, 2, 3 und 4 möglich.
hekr.0.{ID}.status.time Zeit von IOBroker wird �übertragen.
hekr.0.{ID}.status.tm_Minutes Automatische Abschaltung Wert 1-60 m�glich hekr.0.{ID}.status.B Kann nicht gesteuert werden. Anzeige der aktuellen Farbe.
hekr.0.{ID}.status.G Kann nicht gesteuert werden. Anzeige der aktuellen Farbe.
hekr.0.{ID}.status.R Kann nicht gesteuert werden. Anzeige der aktuellen Farbe.
hekr.0.{ID}.status.fitter Bei 1 muss der Kohlefilter gewechselt oder gereinigt werden.

## Diskussion und Fragen
<https://forum.iobroker.net/topic/48262/test-adapter-hekr-wisen-elro-app-v0-0-x>

## Changelog

### 0.0.3

* (TA2k) initial release

## License

MIT License

Copyright (c) 2021 TA2k <tombox2020@gmail.com>

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