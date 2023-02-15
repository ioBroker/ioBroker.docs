---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.micronova/README.md
title: ioBroker.micronova
hash: yfvgVsaZ3A81PzhmqINEhHT08t1Ep6I/7LxAPk7o5F4=
---
![Logo](../../../en/adapterref/iobroker.micronova/admin/micronova.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.micronova.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.micronova.svg)
![Anzahl der Installationen](https://iobroker.live/badges/micronova-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/micronova-stable.svg)
![NPM](https://nodei.co/npm/iobroker.micronova.png?downloads=true)

# IoBroker.micronova
**Tests:** ![Testen und freigeben](https://github.com/TA2k/ioBroker.micronova/workflows/Test%20and%20Release/badge.svg)

## Micronova-Adapter für ioBroker
Adapter für Micronova-Geräte

Hallo ich habe einen neuen Adapter für Micronova geschrieben.
Unterstütze-Apps:

EvaCalòr - PuntoFuoco Elfire Wifi Karmek Wifi Easy Connect Easy Connect Plus Easy Connect Poêle Lorflam Home LMX Remote Control Boreal Home Bronpi Home EOSS WIFI LAMINOXREM REMOTE CONTROL 2.0 Jolly Mec Wi Fi Globe-fire TS Smart Stufe a pellet Italia My Corisit Fonte Flamme contrôle 1 Klover Home Nordic Fire 2.0 GO HEAT Wi-Phire Thermoflux Darwin Evolution Moretti Design Fontana Forni MyPiazzetta (MySuperior?) Alfaplam Nina

Bei Logout-Problemen ein anderes Betriebssystem in den Einstellungen wählen

## Anmeldung
Benutzer und Passwort eingeben.

## **Steuern**
Es gibt setMethod. Eingabe ist das Offset des Registers und Wert von enc_val oder eigenen Wert eingegeben Unter Register sind alle Offsets mit dem Namen abgespeichert.

Zb zum starten 232,85 offset von status_manged und für Value ON ist 85 OFF ist 170 also 232,170

setzen der Temperatur auf 38Grad (temp_air = 32893 formel= /2 = 76/2 = 38 32893, 76

Status enthält den aktuellen Status Der passende Status zu Items02 ist dann unter Values02 zu finden. Der Wert unter Posten ist dann der jeweilige Offset unter Register

.status.Values19 Heizstufe 32895,Wert für Heizstufe

Zustand der Heizung Werte02":

0 = Ausgeschaltet 1 = Zündung 2 = Warten auf Flamme 3 = Anlaufen 4 = Heizen 5 = Reinigung 6 = Auskühlen/Abkühlen

9 = keine Pellets vorhanden

## Fragen Diskussion
https://forum.iobroker.net/topic/59744/test-adapter-micronova-easy-connect-plus

## Changelog

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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