---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cec2/README.md
title: ioBroker.cec2
hash: fP67Ti8lt/GHkCAQmbZG+yTnrqh6Wlmt0a9BynPEatQ=
---
![Logo](../../../en/adapterref/iobroker.cec2/admin/cec2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.cec2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cec2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/cec2-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/cec2-stable.svg)
![NPM](https://nodei.co/npm/iobroker.cec2.png?downloads=true)

# IoBroker.cec2
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.cec2/workflows/Test%20and%20Release/badge.svg)

Adapter für HDMI CEC

Sie können Geräte mit HDMI CEC überwachen/steuern. Die meisten modernen Fernseher und Multimediageräte unterstützen CEC in gewissem Umfang.

## Die Info
Beim Start führt dieser Adapter den CEC-Client aus und fragt alle Geräte am HDMI-Bus ab. Für jedes CEC-Gerät wird ein Gerät in ioBroker erstellt. Der OSDName eines Geräts wird in ioBroker zu seiner ID (da er sich nicht ändern sollte und gut lesbar ist).
Wenn Geräte während der Laufzeit angezeigt werden, werden sie auch zu ioBroker hinzugefügt.

#### CEC-Adressen
Kurze Einführung zu CEC-Adressen. Sie können diese überspringen, aber vielleicht möchten Sie sie hier lesen, wenn Sie die Beschreibung unten verwirrt.

In CEC gibt es zwei Arten von Adressen. Beides ist wichtig.

##### Logische Adresse
Die logische Adresse ist eine Zahl zwischen 0 und 15 (oder F in Hex, was normalerweise verwendet wird). Die Nummer definiert, um welche Art von Gerät es sich handelt:

* 0 = Fernseher
* 5 = Audiosystem
* 4,8,11 = Wiedergabe
* 1,2,9 = Aufnahme
* 3,6,7,10 = Tuner

Die anderen sind reserviert (12,13), Freeuse (14) und nicht registriert/ausgestrahlt (15). Die Geräte, die diese Adressen verwenden, sind in ihrer Kommunikation eingeschränkt.

Die logische Adresse wird dynamisch vergeben. Das heißt, an einem Tag kann es vorkommen, dass Playback A die Adresse 4 und Playback B die Adresse 8 zugewiesen bekommt. Am nächsten Tag werden sie aber in einer anderen Reihenfolge eingeschaltet und dann bekommt A die Adresse 8 und B die Adresse 4. (Einige Geräte sind immer aktiv.) auf dem CEC-Bus und klammern sich daher an ihre Adressen). Wenn es zu viele Geräte eines Typs gibt (z. B. 4 Wiedergabegeräte), müssen die logischen Adressen wiederverwendet werden, und das passiert. Der Adapter versucht, diesen Fall zu bewältigen.

Die logische Adresse wird zur Adressierung von Nachrichten und Berichten verwendet.
Auch ioBroker benötigt eine logische Adresse, um Berichte vom Bus zu empfangen. Konfigurieren Sie den Adapter daher auf einen Gerätetyp, von dem Sie wissen, dass Sie über freie logische Adressen verfügen (z. B. Aufnahme).

##### Physikalische Adresse
Die physikalische Adresse basiert auf den beteiligten HDMI-Anschlüssen des Geräts. Es handelt sich im Grunde um einen Pfad von Portnummern zum Gerät. Es besteht aus 4 durch Punkte getrennten Zahlen. Einige Beispiele:

* 0.0.0.0 = Fernseher
* 1.0.0.0 = 1. HDMI-Anschluss des Fernsehers
* 2.0.0.0 = 2. HDMI-Anschluss des Fernsehers
* 2.2.0.0 = 2. HDMI-Anschluss des Fernsehers, 2. HDMI-Anschluss eines Switches / AV-Receivers
* 4.1.2.0 = 4. HDMI-Anschluss des Fernsehers, 1. HDMI-Anschluss eines AV-Receivers/Switches, 2. HDMI-Anschluss des nächsten AV-Receivers/Switches

Das sollte eine Grundidee geben. Eine 0 bedeutet, dass der Pfad endet.

Die physikalische Adresse ist für ein Gerät fest, es sei denn, es wird erneut an einen anderen HDMI-Anschluss angeschlossen (oder an ein anderes Gerät, bevor es vom Fernseher gesehen wird).

#### Zustände pro Gerät
Für jedes Gerät werden folgende Zustände erstellt:

* info.active = Gerät wurde kürzlich gesehen und die logische Adresse sollte korrekt sein
* info.cecVersion = sollte 1.4 sein, bestimmt die Funktionen
* info.lastSeen = letzte Nachricht vom Gerät am CEC-Bus
* info.logicalAddress = logische Adresse als Zahl
* info.logicalAddressHex = logische Adresse als Hexzahl (wird für eigene Befehle benötigt)
* info.Name = Benennen Sie die Gerätesätze im CEC-Bus
* info.physicalAddress = physische Adresse
* info.Vendor = Hersteller des Geräts
* activeSource = ist das Gerät die aktive Quelle? Kann dieses Gerät als aktive Quelle schalten
* menuStatus = ermöglicht die Steuerung des Geräts über die TV-Fernbedienung
* state = Energiestatus des Geräts (ermöglicht das Ein-/Ausschalten, sofern unterstützt)
* createButtons = hier drücken, um Zustände für Schaltflächen im Unterordner .buttons zu generieren.
* Buttons.time = Zeit zum Drücken einer Taste (Standard 500 ms).

## Tasten
Tastendrücke funktionieren nicht bei allen Geräten und einige benötigen möglicherweise eine aktive Verbindung mit dem ioBroker-Gerät, um über den CEC-Bus gesteuert zu werden.
Für FireTV funktioniert es ganz gut.
Um Tastendrücke zu testen, drücken Sie die `createButtons`-Taste in einem Gerät und testen Sie in bestimmten Situationen einige der erstellten Tasten. Die Stromversorgung funktioniert für viele Geräte.

#### Globale Staaten
Es gibt folgende globale Zustände:

* active-source = physikalische Adresse der aktuell aktiven Quelle (kann zum Schalten von Eingängen eingestellt werden)
* arc = Audio Return Channel ist (in)aktiv, möglicherweise kann er hier (de)aktiviert werden
* mute = Audiosystem stumm schalten
* raw-command = Befehle direkt an cec-client senden (z. B. „scan“ oder tx + CEC-Befehl von http://www.cec-o-matic.com/)
* standbyAll = alle Geräte in den Standby-Modus versetzen
* systemAudio = Audiosystem wird/wird nicht verwendet. Informiert Geräte darüber, dass sie Lautstärke-/Stummschaltbefehle an das Audiosystem senden sollen
* Lautstärke = Lautstärke des Audiosystems, 0 = stumm
* volumeUp/Down = Lautstärke des Audiosystems ändern

#### Umfragezustände
Für die meisten Bundesstaaten gibt es einen Unterordner „poll“ mit Button-States. Wenn die Schaltfläche ausgelöst wird, gibt der Adapter einen Befehl auf dem CEC-Bus aus, um den Wert abzufragen und den Status entsprechend festzulegen (leider reagieren jedoch nicht alle Geräte auf Abfragenachrichten).

#### Anforderungen
Der CEC-Client muss installiert sein. Kann normalerweise installiert werden mit:

```
sudo apt install cec-utils
```

Der Benutzer, der iobroker (heutzutage „iobroker“) ausführt, benötigt Zugriff auf /dev/vchiq. Möglicherweise müssen Sie dazu den iobroker-Benutzer zur Videogruppe hinzufügen:

```
sudo usermod -a -G video iobroker
```

#### Installation
Führen Sie den folgenden Befehl im iobroker-Stammverzeichnis aus (z. B. in /opt/iobroker)

```
npm install iobroker.cec2
```

Oder installieren Sie es von der Admin-Webseite.

## Aufbau
* OSD-Name: Dieser Name wird an andere Geräte gemeldet, beispielsweise an Ihren Fernseher. Möglicherweise müssen Sie dort ioBroker auswählen, um Fernbedienungen in ioBroker zu empfangen.
* Gerätetyp: Sie können den Gerätetyp festlegen. Sehen Sie sich die Diskussion der logischen Adresse oben an, um eine Vorstellung davon zu bekommen, was das bedeutet. Verwenden Sie einen Gerätetyp, von dem Sie nicht viele haben.
* Unbenannte Geräte verhindern: Manchmal melden Geräte in bestimmten Situationen ihren Namen nicht (z. B. meldet Nintendo Switch im Standby-Modus seinen Namen nicht, sondern meldet sich selbst). In solchen Situationen erstellt der Adapter möglicherweise ein Duplikat des Geräts unter seiner physischen Adresse (z. B. für Nummern). Sie können diese Option aktivieren, um dies zu verhindern.

## Skriptbeispiele:
Unter [Beispielskripte](doc/ExampleScripts.md) finden Sie einige Beispielskripte, die bei Multimedia-Setups helfen bzw. diese reparieren.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2023-09-06)
* dependency updates.
* sending commands is now more reliable.
* more error handling

### 0.1.0 (2021-02-18)
* add more translations.
* add more options (poll TV power).

### 0.0.8 (2021-02-14)
* Switched from unmaintained dependency to own code to control cec-monitor binary.
* Swtiched from event-stream to readline.
* Probably fixed missed incomming events.

### 0.0.7 (2021-01-24)
* fix warnings

### 0.0.6 (2021-01-02)
* update dependencies

## License
MIT License

Copyright (c) 2020-2023 Garfonso <garfonso@mobo.info>

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