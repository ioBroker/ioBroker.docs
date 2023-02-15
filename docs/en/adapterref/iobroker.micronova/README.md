![Logo](admin/micronova.png)

# ioBroker.micronova

[![NPM version](https://img.shields.io/npm/v/iobroker.micronova.svg)](https://www.npmjs.com/package/iobroker.micronova)
[![Downloads](https://img.shields.io/npm/dm/iobroker.micronova.svg)](https://www.npmjs.com/package/iobroker.micronova)
![Number of Installations](https://iobroker.live/badges/micronova-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/micronova-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.micronova.png?downloads=true)](https://nodei.co/npm/iobroker.micronova/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.micronova/workflows/Test%20and%20Release/badge.svg)

## micronova adapter for ioBroker

Adapter for Micronova devices

Hi ich habe ein neuen Adapter für Micronova geschrieben.
Unterstütze Apps:

EvaCalòr - PuntoFuoco
Elfire Wifi
Karmek Wifi
Easy Connect
Easy Connect Plus
Easy Connect Poêle
Lorflam Home
LMX Remote Control
Boreal Home
Bronpi Home
EOSS WIFI
LAMINOXREM REMOTE CONTROL 2.0
Jolly Mec Wi Fi
Globe-fire
TS Smart
Stufe a pellet Italia
My Corisit
Fonte Flamme contrôle 1
Klover Home
Nordic Fire 2.0
GO HEAT
Wi-Phire
Thermoflux
Darwin Evolution
Moretti design
Fontana Forni
MyPiazzetta (MySuperior?)
Alfaplam
Nina

Bei Logout Problemen ein anderes Betriebssystem in den Einstellungen wählen

## Login

User und Password eingeben.

## **Steuern**

Es gibt setMethod. Eingabe ist das offset des register und value von enc_val oder eignen Wert eingegeben
Unter register sind alle offsets mit dem namen abgespeichert.

Zb zum starten 232,85
offset von status_manged und für Value ON ist 85 OFF ist 170 also 232,170

setzen der Temperatur auf 38Grad (temp_air = 32893 formular= /2 = 76/2 = 38
32893, 76

Status enthält den aktuellen Status
Der passende Status zu Items02 ist dann unter Values02 zu finden. Der Wert unter Items ist dann der jeweilige Offset unter register

.status.Values19 Heizstufe
32895,Wert für Heizstufe

Zustand der Heizung
Values02":

0 = Ausgeschaltet
1 = Zündung
2 = Warten auf Flamme
3 = Anlaufen
4 = Heizen
5 = Reinigung
6 = Auskühlen/Abkühlen

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
