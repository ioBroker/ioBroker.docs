---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: 9SFophmy/4YR2EkrDPqqyIgqQmRzMq1OI2ZajzO/KO8=
---
![Logo](../../../en/adapterref/iobroker.intex/admin/intex.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.intex.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.intex.svg)
![Anzahl der Installationen](https://iobroker.live/badges/intex-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/intex-stable.svg)
![NPM](https://nodei.co/npm/iobroker.intex.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

# ioBroker.intex

## Intex-Adapter für ioBroker

Adapter für Intex Whirlpool mit WLAN-Modul, der mit der alten App funktioniert.

## Dieser Adapter funktioniert nur mit der alten Intex-App.

Intex bietet seit 2025 zwei Apps zum Download an, eine für Apple und eine für Android. Wie bereits erwähnt, ist dieser Adapter nicht mit den neuen Pools kompatibel. Die Bedienungsanleitung gibt Auskunft darüber, welche App Sie benötigen. Daher wird empfohlen, die Bedienungsanleitung sorgfältig zu lesen.

### Muss ich weinen, wenn ich einen neuen Pool bekomme?

Nein, definitiv nicht. Die neuen Pools scheinen Tuya zu unterstützen. Vergiss die neue Intex-App; nutze einfach die Tuya-App, Smart Life oder eine andere, die vom Tuya-Adapter unterstützt wird. Füge den Pool dort hinzu. Es funktioniert einwandfrei. Viel Spaß damit und danke an Thestef86 für die Recherche.

## Die Strategie zur Kommunikation mit dem Pool und der Cloud

### Über Wolken

#### Cloud-Sekundärsystem; Pool lokal, falls verfügbar

In diesem Modus versucht das System, den Steuerbefehl und den Aktualisierungsbefehl lokal auszugeben. Tritt ein Fehler in der lokalen Kommunikation auf, wechselt das System in den Cloud-Betrieb, bis der Adapter neu gestartet wird.

IP-Adresse und Port werden aus der Cloud bezogen. Falls die IP-Adresse gleich bleibt, muss der Pool in der App erneut registriert werden. Halten Sie die Verbindungstaste gedrückt und suchen Sie den Pool. In der Regel ist es nicht notwendig, ihn aus der App zu löschen.

#### Cloud sekundär; Pool nur lokal

In diesem Modus sendet das System den Steuerbefehl und den Aktualisierungsbefehl lokal. Tritt ein Fehler in der lokalen Kommunikation auf, schaltet das System nicht auf Cloud-Betrieb um.

Das Intervall kann hier auf 0,5 Minuten eingestellt werden.

IP-Adresse und Port werden aus der Cloud bezogen. Falls die IP-Adresse gleich bleibt, muss der Pool in der App erneut registriert werden. Halten Sie die Verbindungstaste gedrückt und suchen Sie den Pool. In der Regel ist es nicht notwendig, ihn aus der App zu löschen.

#### Nur Wolken

In diesem Modus sendet das System nur den Steuerbefehl und den Aktualisierungsbefehl über die Cloud.

##### Login

Geben Sie die E-Mail-Adresse und das Passwort der Intex-App ein.

### Lokal

#### Nur für lokale Nutzer

Im lokalen Betrieb werden derzeit auch Funktionen angeboten, die der Pool nicht unterstützt. Entweder der DNS-Name des Pools auf dem Router oder die IP-Adresse des Pools muss unter „Adresse“ angegeben werden.

Das Intervall kann hier auch auf 0,5 Minuten eingestellt werden.

Die IP-Adresse des Pools kann über die Suchfunktion gefunden werden. Dies kann jedoch durch Router verhindert werden, beispielsweise wenn WLAN-Geräte nicht miteinander kommunizieren dürfen oder Ports bzw. Onboard-Casting in der lokalen Firewall des Computers blockiert sind.

## Steuerung der Funktionen des Spas

Die Einstellung "intex.0.-id-.control.-command-" auf true oder false steuert den Status des Pool-Befehls.

## Diskussion und Fragen auf Deutsch

<https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 0.1.7 (2024-08-13)

- (PLCHome) Fixed error.

### 0.1.6 (2024-08-13)

- (PLCHome) Configure this adapter to use the release script.
- (PLCHome) New object error, the error is extracted from the temperature if one is pending.

### 0.1.5

- (PLCHome) spelling mistake sanitzer to sanitizer on status control.sanitizer and control.sanitizerTime corrected.

### 0.1.4

- (PLCHome) Changing read-only objects, e.g. temperature, no longer causes a crash.

### 0.1.3

- (PLCHome) The remaining time for the filter is corrected to the disinfection time if it is longer

### 0.1.2

- (PLCHome) Fixed filter remaining time on heating from 1 to -1 for infinity

### 0.1.1

- (PLCHome) Remaining time for filter and sanitizer added under control.
- (PLCHome) Refresh added under Control.
- (PLCHome) Remote deleted because Control can do it better.

### 0.1.0

- (rbartl/PLCHome) Support local IP. Both via cloud and only locally without cloud. Thanks to Austria to Robert Bartl.
- (PLCHome) Confirm directly after switching via Control.

### 0.0.7

- (PLCHome) Switching via remote works again.
- (PLCHome) After switching via Control, the previous traffic status can be transmitted from the cloud. This can lead to a toggling of the status.

### 0.0.6

- (PLCHome) Defined setting of states
- (PLCHome) Change Fahrenheit Celsius
- (PLCHome) "control.temperature", read only, object from 0.0.5 must be deleted once.

### 0.0.5

- (PLCHome) Set temperature added, object must be deleted once.
- (PLCHome) Decoding of status information

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021 - 2024 TA2k <tombox2020@gmail.com>

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