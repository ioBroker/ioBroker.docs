---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: vidHWdxc5eeX+XnUFQtmFMETAZUYCX6fBRuQxeyaYW0=
---
![Logo](../../../en/adapterref/iobroker.intex/admin/intex.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.intex.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.intex.svg)
![Anzahl der Installationen](https://iobroker.live/badges/intex-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/intex-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.intex.svg)
![NPM](https://nodei.co/npm/iobroker.intex.png?downloads=true)

# IoBroker.intex
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## Intex-Adapter für ioBroker
Adapter für Intex Whirlpool mit WLAN-Modul

## Loginablauf:
Die Intex App Mail und Passwort eingeben.

## Steuern
intex.0.<id>.remote auf true setzt steuert den jeweiligen Befehl.
intex.0.<id>.control auf true oder false setzen, steuert den Pool Befehl in den Zustand.

## Lokal
Bei Cloudbetrieb versucht das System den Befehl lokal abzusetzen, es sei denn, es ist nur Cloud angegeben. Sollte ein Fehler auftreten, wechselt das System bis zum nächsten Start des Adapters wieder in den Cloudbetrieb.

Im lokalen Betreib werden aktuell auch Funktionen angeboten, die der Pool nicht unterstützt. Hier muss unter der Adresse entweder der DNS-Name des Pools beim Router oder die IP-Adresse des Pools angegeben werden.
Das Intervall kann hier auf eine Minute gesetzt werden.

Dieses kann über den Suchbutton gesucht werden. Dies kann jedoch von Router Unterbundnen werden, wenn z. B. WLAN-Geräte nicht untereinander kommunizieren dürfen oder in der lokalen Firewall des Rechners Ports oder Bordcasting gesperrt ist.

## Diskussion und Fragen:
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## Changelog

### 0.1.0
* (PLCHome/rbartl) Unterstützung lokale IP. Sowohl über Cloud als auch nur lokal ohne Cloud. Danke nach Österreich an Robert Bartl.
* (PLCHome) Nach dem Schalten über Control direkt bestätigen.

### 0.0.7
* (PLCHome) Schalten über remote funktioniert wieder.
* (PLCHome) Nach dem Schalten über Control kann von der Cloud der vorherige Staus übermittelt werden. Dadurch kann es zu einem Toggeln des Zutands kommen.

### 0.0.6
* (PLCHome) Definiertes Setzen von Zuständen
* (PLCHome) Ändern Fahrenheit Celsius
* (PLCHome) control.temperatur, nur lesen, Objekt aus 0.0.5 muss einmal gelöscht werden.

### 0.0.5
* (PLCHome) Temperatur setzen hinzugefügt, Objekt muss einmal gelöscht werden.
* (PLCHome) Decodierung der Statusinformationen

### 0.0.1
* (TA2k) initial release

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