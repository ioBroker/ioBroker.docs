---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: 4M+4DmYgC0LkmJuO3Ww9VyzlR5ejQiG4vt43fl4hsVU=
---
![Logo](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Anzahl der Installationen](https://iobroker.live/badges/heizungssteuerung-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/heizungssteuerung-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

# IoBroker.heizungssteuerung
**Tests:** ![Testen und freigeben](https://github.com/jbeenenga/ioBroker.heizungssteuerung/workflows/Test%20and%20Release/badge.svg)

##Heizungssteuerungsadapter für ioBroker
Mit diesem Adapter können Heizungsanlagen verwaltet werden. Sie können zwischen Kühl- und Heizbetrieb wählen und Boost oder Pause für einen Raum aktivieren. Außerdem können Sie die Solltemperatur für einen Raum überschreiben.

## Aufbau
Um den Adapter zu verwenden, müssen Sie Räume zu Räumen hinzufügen und die Sensoren und Motoren zu den Räumen hinzufügen.
Außerdem müssen die Funktionen Temperatur, Feuchtigkeit und Motor den richtigen Zuständen hinzugefügt werden. Die Enums werden nach dem ersten Start des Adapters erstellt. Wenn Sie keinen Feuchtigkeitssensor haben, können Sie ihn leer lassen.

### Haupteinstellungen
*Heizmodus:* Sie können zwischen Kühlen und Heizen wählen.

*Kühlung stoppen, wenn die Luftfeuchtigkeit höher ist als:* Wenn die Luftfeuchtigkeit erreicht ist, wird die Kühlung gestoppt. Es funktioniert nur, wenn Sie den Feuchtigkeitssensor der Funktion und dem Raum hinzugefügt haben.

*Aktualisierungsintervall in Sekunden:* Legen Sie fest, wie oft der Adapter die Temperaturen überprüft und die Motoren einstellt

*Standardtemperatur:* Definieren Sie die Temperatur, die eingestellt werden soll, wenn kein Zeitraum für einen Raum passt

*Zeit bis zum Ende der Pause in Minuten:* Definieren Sie die Zeit in Minuten, bis der Pausenzustand auf inaktiv zurückgesetzt wird

*Zeit bis zum Ende des Boosts in Minuten:* Definieren Sie die Zeit in Minuten, bis der Boost-Status auf inaktiv zurückgesetzt wird

*Differenz von der Zieltemperatur bis zum Start oder Stopp der Heizung:* Definieren Sie die Differenz von der Zieltemperatur, bis der Adapter die Heizung startet oder beendet. Wenn beispielsweise 20° die Zieltemperatur ist, beträgt diese Einstellung 0,5 und der Motor ist aus. Die Heizung beginnt, wenn die Temperatur unter 19,5° liegt, und stoppt die Heizung, wenn die Temperatur über 20,5° liegt.

### Perioden
Sie können Zeiträume für jeden Raum und jede Uhrzeit definieren. Außerdem können Sie festlegen, ob dieser Zeitraum zum Kühlen oder Heizen verwendet werden soll. Wenn der Heizmodus nicht mit dem eingestellten Modus in den Haupteinstellungen übereinstimmt, wird der Zeitraum ignoriert.

## Bilder
Das Hauptbild erstellt von Freepick (https://www.flaticon.com/de/kostenloses-icon/heizung_1295221)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.5.2 (2022-10-05)
* (jbeenenga) fix for overwrite temperature

### 1.5.1 (2022-09-25)
* (jbeenenga) fix for overwrite temperature

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

### 1.4.6 (2022-09-12)
* (jbeenenga) small fix

### 1.4.5 (2022-09-10)
* (jbeenenga) correct type of temperatures to write into states

### 1.4.4 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.3 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.2 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.1 (2022-09-10)
* (jbeenenga) little logging fixes

### 1.4.0 (2022-09-10)
* (jbeenenga) add default temperature
* (jbeenenga) write current and target temperature into states

### 1.3.0 (2022-09-08)
* (jbeenenga) add possibility to define update intervall

### 1.2.4 (2022-09-08)
* (jbeenenga) small fixes

### 1.2.3 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.2 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.1 (2022-09-04)
* (jbeenenga) some logging issues

### 1.2.0 (2022-09-02)
* (jbeenenga) update dependencies

### 1.1.6 (2022-07-22)
* (jbeenenga) little fix

### 1.1.5 (2022-07-22)
* (jbeenenga) add some documentation
* (jbeenenga) remove connection state

### 1.1.4 (2022-07-22)
* (jbeenenga) little changes

### 1.1.3 (2022-07-22)
* (jbeenenga) changed admin dependency to minimum version 5.3.8

### 1.1.2 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.0 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.0 (2022-07-22)
* (jbeenenga) some changes

### 0.1.3 (2022-07-22)
* (jbeenenga) changed some dependency versions

### 0.1.2 (2022-07-22)
* (jbeenenga) add main logic

### 0.1.1 (2022-07-15)
* (jbeenenga) little changes

### 0.1.0 (2022-07-15)
* (jbeenenga) initial release

## License
MIT License

Copyright (c) 2022 jbeenenga <j.beenenga@gmail.com>

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