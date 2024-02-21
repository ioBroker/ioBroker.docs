---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: LzjlC+djKM5jR/Tz9XJnk3QJ1oO7kdofxCoROZ7nris=
---
![Logo](../../../en/adapterref/iobroker.intex/admin/intex.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.intex.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.intex.svg)
![Anzahl der Installationen](https://iobroker.live/badges/intex-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/intex-stable.svg)
![NPM](https://nodei.co/npm/iobroker.intex.png?downloads=true)

# IoBroker.intex
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## Intex-Adapter für ioBroker
Adapter für Intex Whirlpool mit WLAN-Modul

## Die Strategie zur Kommunikation mit dem Pool und der Cloud
### Über Wolken
#### Cloud sekundär; Pool vor Ort, falls verfügbar
In diesem Modus versucht das System, den Steuerbefehl und den Aktualisierungsbefehl lokal zu erteilen. Bei einem Fehler in der lokalen Kommunikation wechselt das System in den Cloud-Betrieb, bis der Adapter erneut gestartet wird.

IP-Adresse und Port stammen aus der Cloud. Bei gleicher IP-Adresse muss der Pool erneut in der App registriert werden. Drücken Sie lange auf die Verbindungstaste und durchsuchen Sie den Pool. Ein Löschen aus der App ist in der Regel nicht notwendig.

#### Cloud sekundär; Pool nur lokal
In diesem Modus gibt das System den Steuerbefehl und den Aktualisierungsbefehl lokal aus. Bei einem Fehler in der lokalen Kommunikation wechselt das System nicht in den Cloud-Betrieb.

Das Intervall kann hier auf 0,5 Minuten eingestellt werden.

IP-Adresse und Port stammen aus der Cloud. Bei gleicher IP-Adresse muss der Pool erneut in der App registriert werden. Drücken Sie lange auf die Verbindungstaste und durchsuchen Sie den Pool. Ein Löschen aus der App ist in der Regel nicht notwendig.

#### Nur Cloud
In diesem Modus sendet das System den Steuerbefehl und den Aktualisierungsbefehl nur über die Cloud.

##### Anmeldung
Geben Sie die E-Mail-Adresse und das Passwort der Intex-App ein.

### Lokal
#### Nur lokal
Im lokalen Betrieb werden derzeit auch Funktionen angeboten, die der Pool nicht unterstützt. Unter Adresse muss entweder der DNS-Name des Pools auf dem Router oder die IP-Adresse des Pools angegeben werden.

Das Intervall kann hier auch auf 0,5 Minuten eingestellt werden.

Über die Suchschaltfläche kann nach der IP-Adresse des Pools gesucht werden. Dies kann jedoch durch Router verhindert werden, wenn z.B. B. WLAN-Geräte nicht untereinander kommunizieren dürfen oder Ports oder On-Board-Casting in der lokalen Firewall des Rechners blockiert sind.

## Steuerung der Funktionen des Spas
„intex.0.-id-.control.-command-“ mit der Einstellung „true“ oder „false“ steuert den Status des Poolbefehls.

# Diskussion und Fragen auf Deutsch
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## **IN ARBEIT**
- (PLCHome) Konfigurieren Sie diesen Adapter für die Verwendung des Release-Skripts.

## 0.1.5
* (PLCHome) Rechtschreibfehler von Sanitzer zu Sanitizer im Status control.sanitizer und control.sanitizerTime korrigiert.

## 0.1.4
* (PLCHome) Nur-Lese-Objekte ändern, z.B. Temperatur verursacht keinen Absturz mehr.

## 0.1.3
* (PLCHome) Die verbleibende Zeit für den Filter wird auf die Desinfektionszeit korrigiert, falls diese länger ist

## 0.1.2
* (PLCHome) Die verbleibende Filterzeit beim Heizen wurde von 1 auf -1 für unendlich korrigiert

## 0.1.1
* (PLCHome) Verbleibende Zeit für die Zugabe von Filter und Desinfektionsmittel unter Kontrolle.
* (PLCHome) Aktualisierung unter Steuerung hinzugefügt.
* (PLCHome) Remote gelöscht, da Control es besser kann.

## 0.1.0
* (rbartl/PLCHome) Unterstützt lokale IP. Sowohl über die Cloud als auch nur lokal ohne Cloud. Danke an Österreich an Robert Bartl.
* (PLCHome) Direkt nach dem Umschalten über Control bestätigen.

## 0.0.7
* (PLCHome) Das Umschalten per Remote funktioniert wieder.
* (PLCHome) Nach der Umschaltung per Control kann der bisherige Verkehrsstatus aus der Cloud übermittelt werden. Dies kann zu einem Umschalten des Status führen.

## 0.0.6
* (PLCHome) Definierte Einstellung von Zuständen
* (PLCHome) Ändern Sie Fahrenheit Celsius
* (PLCHome) „control.temperature“, nur lesbar, Objekt aus 0.0.5 muss einmalig gelöscht werden.

## 0,0,5
* (PLCHome) Solltemperatur hinzugefügt, Objekt muss einmalig gelöscht werden.
* (PLCHome) Dekodierung von Statusinformationen

## 0.0.1
* (TA2k) Erstveröffentlichung

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

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