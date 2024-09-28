---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: SLEQGS3SNTdTr/oW8nwQtR2kQ0/Z0t0u8fgAHgisX6s=
---
![Logo](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Anzahl der Installationen](https://iobroker.live/badges/heizungssteuerung-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/heizungssteuerung-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

# IoBroker.heizungssteuerung
**Tests:** ![Testen und Freigeben](https://github.com/jbeenenga/ioBroker.heizungssteuerung/workflows/Test%20and%20Release/badge.svg)

## Heizungssteuerungsadapter für ioBroker
Mit diesem Adapter können Sie Heizungsanlagen steuern. Sie können zwischen Kühl- und Heizbetrieb wählen und für einen Raum Boost oder Pause aktivieren. Außerdem können Sie die Zieltemperatur für einen Raum überschreiben.

## Konfiguration
Um den Adapter zu verwenden, müssen Sie Räume zur Enumeration hinzufügen und die Sensoren und Motoren zu den Räumen hinzufügen.
Außerdem müssen Sie die Funktionen Temperatur, Luftfeuchtigkeit und Motor den richtigen Zuständen hinzufügen. Die Enumerationen werden nach dem ersten Start des Adapters erstellt. Wenn Sie keinen Luftfeuchtigkeitssensor haben, können Sie das Feld leer lassen.
![Konfigurationsbeispiel](../../../en/adapterref/iobroker.heizungssteuerung/img/configExample.png)

### Haupteinstellungen
#### Heizmodus
Sie können zwischen Kühlen und Heizen wählen.

#### Setzen Sie die Temperaturen beim Adapterstart auf die Standardeinstellung zurück
Wenn diese Einstellung aktiv ist, werden alle Temperaturzustände mit der Standardtemperatur und dem Zielwert überschrieben. Bei der nächsten Temperaturprüfung werden die Temperaturen dann auf die in den Perioden festgelegten, konfigurierten Temperaturen gesetzt.

#### Stoppen Sie die Kühlung, wenn die Luftfeuchtigkeit höher ist als
Wenn die Luftfeuchtigkeit erreicht ist, wird die Kühlung gestoppt. Dies funktioniert nur, wenn Sie der Funktion und dem Raum einen Feuchtigkeitssensor hinzugefügt haben.

#### Updateintervall in Sekunden
Legen Sie fest, wie oft der Adapter die Temperaturen prüft und die Motoren einstellt

#### Standardtemperatur
Definieren Sie die einzustellende Temperatur, wenn für einen Raum kein passender Zeitraum vorhanden ist

#### Zeit bis zum Ende der Pause in Minuten
Definieren Sie die Zeit in Minuten, bis der Pausenzustand auf inaktiv zurückgesetzt wird

#### Zeit bis zum Ende des Boosts in Minuten
Definieren Sie die Zeit in Minuten, bis der Boost-Status auf inaktiv zurückgesetzt wird

#### Differenz von der Zieltemperatur bis zum Start oder Stopp des Heizens
Definieren Sie die Differenz von der Zieltemperatur, ab der der Adapter mit dem Heizen beginnt oder aufhört. Wenn beispielsweise 20 °C die Zieltemperatur sind, beträgt diese Einstellung 0,5 und der Motor ist ausgeschaltet. Die Heizung startet, wenn die Temperatur unter 19,5 °C liegt, und stoppt das Heizen, wenn die Temperatur über 20,5 °C liegt.

### Perioden
Sie können für jeden Raum und jede Uhrzeit Zeiträume definieren. Außerdem können Sie festlegen, ob dieser Zeitraum zum Kühlen oder Heizen verwendet werden soll. Wenn der Heizmodus nicht mit dem in den Haupteinstellungen eingestellten Modus übereinstimmt, wird der Zeitraum ignoriert.

### Aktionen
Während der Adapter läuft, können Sie Aktionen verwenden, um die Behandlung für spezielle Fälle zu ändern. Diese Aktionen finden Sie in Objekten im Ordner *Aktionen* unter Ihrem Adapter. Einige Aktionen sind für alle Räume und für spezielle Räume verfügbar.

#### Abwesenheit Um die Heizungssteuerung während z.B. eines Urlaubs zu deaktivieren, können Sie in Ihren Objekten unter *Aktionen AbwesenheitBis* ein Abwesenheits-bis-Datum eintragen. Hier können Sie ein Datum im Format *tt.MM.jjjj hh:mm* eingeben (z.B. *01.01.2024 14:00*). Wenn aktiviert, werden die Zeiträume ignoriert und die Temperaturen auf [Standardtemperatur](#default-temperature) gesetzt.
Diese Konfiguration ist grundsätzlich für alle Räume verfügbar.

#### Pause
Um die Heizung für eine Weile zu stoppen, können Sie eine Pause aktivieren. Der Pausenzustand wird nach der in [Einstellungen](#time-until-pause-will-be-end-in-minutes) definierten Zeit auf deaktiviert zurückgesetzt. Wenn die Pause aktiv ist, werden die Zeiträume ignoriert und es wird keine Heizung durchgeführt.

Diese Konfiguration ist für alle Räume allgemein und für spezielle Räume verfügbar.

#### Schub
Um die Heizung für eine Weile zu stoppen, können Sie einen Boost aktivieren. Der Boost-Zustand wird nach der in [Einstellungen](#time-until-boost-will-be-end-in-minutes) definierten Zeit auf deaktiviert zurückgesetzt. Wenn Boost aktiv ist, werden die Zeiträume ignoriert und die Heizung wird ausgeführt.

Diese Konfiguration ist für alle Räume allgemein und für spezielle Räume verfügbar.

## Bilder
Das Hauptbild erstellt von Freepick (https://www.flaticon.com/de/kostenloses-icon/heizung_1295221)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-09-17)
* (jbeenenga) update dependencies
* (jbeenenga) add absence mode
* (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)
* (jbeenenga) fix bug for end boost or pause mode
* (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)
* (jbeenenga) fix date format

### 1.6.5 (2022-12-16)
* (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)
* (jbeenenga) add more debug outputs
* (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)
* (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)
* (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

## License
MIT License

Copyright (c) 2024 jbeenenga <j.beenenga@gmail.com>

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