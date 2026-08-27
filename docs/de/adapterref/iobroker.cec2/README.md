---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cec2/README.md
title: ioBroker.cec2
hash: EMAqD2sH3brmb4L8tLeFJLuQJv73syqnJHv+aKcHCXI=
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

Sie können Geräte mithilfe von HDMI CEC überwachen/steuern. Die meisten modernen Fernseher und Multimedia-Geräte unterstützen CEC zumindest teilweise.

## Info
Beim Start führt dieser Adapter den cec-Client aus und fragt alle Geräte am HDMI-Bus ab. Für jedes CEC-Gerät wird ein Eintrag in ioBroker erstellt. Der OSDName eines Geräts wird zu seiner ID in ioBroker (da er sich nicht ändern sollte und gut lesbar ist).
Wenn während der Laufzeit neue Geräte erkannt werden, werden diese ebenfalls zu ioBroker hinzugefügt.

#### CEC-Adressen
Kurze Einführung zu CEC-Adressen, die Sie überspringen können, aber falls Ihnen die folgende Beschreibung unklar ist, sollten Sie sie hier lesen.

Im CEC gibt es zwei Arten von Adressen. Beide sind wichtig.

##### Logische Adresse
Die logische Adresse ist eine Zahl zwischen 0 und 15 (oder F in Hexadezimaldarstellung, was üblicherweise verwendet wird). Die Zahl definiert den Gerätetyp:

* 0 = Fernseher
* 5 = Audiosystem
* 4,8,11 = Wiedergabe
* 1,2,9 = Aufnahme
* 3,6,7,10 = Tuner

Die übrigen Adressen sind reserviert (12, 13), frei nutzbar (14) und nicht registriert/ausgestrahlt (15). Geräte, die diese Adressen verwenden, sind in ihrer Kommunikation eingeschränkt.

Die logische Adresse wird dynamisch zugewiesen. Das bedeutet, dass beispielsweise Wiedergabegerät A an einem Tag die Adresse 4 und Wiedergabegerät B die Adresse 8 hat. Am nächsten Tag werden sie in anderer Reihenfolge eingeschaltet, und dann erhält A die Adresse 8 und B die Adresse 4. (Einige Geräte sind jedoch immer am CEC-Bus aktiv und behalten daher ihre Adressen bei.) Sind zu viele Geräte eines Typs vorhanden (z. B. vier Wiedergabegeräte), müssen die logischen Adressen wiederverwendet werden, was auch geschieht. Der Adapter versucht, diesen Fall zu verwalten.

Die logische Adresse dient zum Empfangen von Nachrichten und Berichten.
Auch ioBroker benötigt eine logische Adresse, um Berichte vom Bus zu empfangen. Konfigurieren Sie den Adapter daher für einen Gerätetyp, für den Sie freie logische Adressen haben (z. B. Aufzeichnungsgerät).

##### Physische Adresse
Die physikalische Adresse basiert auf den HDMI-Anschlüssen des Geräts. Sie stellt im Grunde eine Abfolge von Portnummern dar, die zum Gerät führen. Sie besteht aus vier durch Punkte getrennten Zahlen. Einige Beispiele:

* 0.0.0.0 = Fernseher
* 1.0.0.0 = 1. HDMI-Anschluss des Fernsehers
* 2.0.0.0 = 2. HDMI-Anschluss des Fernsehers
* 2.2.0.0 = 2. HDMI-Anschluss des Fernsehers, 2. HDMI-Anschluss eines Switches/AV-Receivers
* 4.1.2.0 = 4. HDMI-Anschluss des Fernsehers, 1. HDMI-Anschluss eines AV-Receivers/Switches, 2. HDMI-Anschluss des nächsten AV-Receivers/Switches

Das sollte einen grundlegenden Überblick geben. Eine 0 bedeutet, dass der Pfad endet.

Die physische Adresse ist für ein Gerät fest, es sei denn, es wird an einen anderen HDMI-Anschluss (oder an ein anderes Gerät, das zuvor vom Fernseher erkannt wurde) angeschlossen.

#### Zustände pro Gerät
Für jedes Gerät werden die folgenden Zustände erstellt:

* info.active = Das Gerät wurde kürzlich erkannt und die logische Adresse sollte korrekt sein.
* info.cecVersion = sollte 1.4 sein, bestimmt die Funktionen
* info.lastSeen = letzte Nachricht vom Gerät im CEC-Bus
* info.logicalAddress = logische Adresse als Zahl
* info.logicalAddressHex = logische Adresse als Hexadezimalzahl (wird für eigene Befehle benötigt)
* info.Name = Name, den das Gerät im CEC-Bus setzt
* info.physicalAddress = physische Adresse
* info.Vendor = Hersteller des Geräts
* activeSource = Ist das Gerät die aktive Quelle? Kann dieses Gerät als aktive Quelle festgelegt werden?
* menuStatus = ermöglicht die Steuerung des Geräts über die TV-Fernbedienung
* Status = Energiezustand des Geräts (ermöglicht das Ein- und Ausschalten, sofern unterstützt)
* createButtons = Hier klicken, um Zustände für Schaltflächen im Unterordner .buttons zu generieren.
* buttons.time = Zeit, die eine Taste gedrückt werden soll (Standardwert 500 ms).

## Schaltflächen
Tastendrücke funktionieren nicht bei allen Geräten, und einige benötigen möglicherweise eine aktive Verbindung zum ioBroker-Gerät, um über den CEC-Bus gesteuert zu werden.
Bei Fire TV funktioniert es recht gut.
Um Tastendrücke zu testen, drücken Sie die Taste `createButtons` an einem Gerät und testen Sie einige der erstellten Tasten in verschiedenen Situationen. Die Stromversorgung funktioniert bei den meisten Geräten.

#### Globale Staaten
Es gibt folgende globale Staaten:

* aktive Quelle = physikalische Adresse der aktuell aktiven Quelle (kann zum Umschalten der Eingänge verwendet werden)
* arc = Audio Return Channel ist (in)aktiv, kann hier möglicherweise (de)aktiviert werden.
* stumm = Audiosystem stumm schalten
* raw-command = Befehle direkt an den CEC-Client senden (z. B. 'scan' oder tx + CEC-Befehl von http://www.cec-o-matic.com/)
* standbyAll = Alle Geräte in den Standby-Modus versetzen
* systemAudio = Audiosystem ist in Gebrauch/ist nicht in Gebrauch. Informiert Geräte darüber, dass sie Lautstärke-/Stummschaltungsbefehle an das Audiosystem senden sollen.
* Lautstärke = Lautstärke des Audiosystems, 0 = stumm
* Lautstärke erhöhen/verringern = Lautstärke des Audiosystems ändern

#### Umfragestaaten
Es gibt einen Unterordner namens „poll“ mit Schaltflächenzuständen für die meisten Zustände. Wird die Schaltfläche betätigt, sendet der Adapter einen Befehl über den CEC-Bus, um den Wert abzufragen und den Zustand entsprechend zu setzen (leider reagieren jedoch nicht alle Geräte auf Abfragenachrichten).

#### Anforderungen
Der cec-Client muss installiert sein. Die Installation erfolgt üblicherweise mit folgendem Befehl:

```
sudo apt install cec-utils
```

Der Benutzer, der iobroker ausführt (heute nur noch „iobroker“), benötigt Zugriff auf /dev/vchiq. Möglicherweise müssen Sie den Benutzer iobroker dazu der Gruppe „video“ hinzufügen:

```
sudo usermod -a -G video iobroker
```

## Konfiguration
* OSD-Name: Dieser Name wird anderen Geräten, z. B. Ihrem Fernseher, gemeldet. Möglicherweise müssen Sie dort ioBroker auswählen, um Fernbedienungsbefehle in ioBroker zu empfangen.
* Gerätetyp: Sie können den Gerätetyp festlegen. Siehe dazu die obige Erläuterung zur logischen Adresse. Verwenden Sie einen Gerätetyp, von dem Sie nicht viele Exemplare besitzen.
* Unbenannte Geräte verhindern: Manchmal melden Geräte in bestimmten Situationen ihren Namen nicht (z. B. meldet die Nintendo Switch im Standby-Modus ihren Namen nicht, sondern gibt sich selbst an). In solchen Fällen kann der Adapter ein Duplikat des Geräts unter seiner physischen Adresse (z. B. bei Zahlen) erstellen. Sie können diese Option aktivieren, um dies zu verhindern.

## Skriptbeispiele:
Siehe [Beispielskripte](doc/ExampleScripts.md) für einige Beispielskripte, die bei der Einrichtung/Reparatur von Multimedia-Systemen helfen.

## Changelog

<!--
	PLACEHOLDER for next version:
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 0.1.3 (2024-07-04)
* remove unnecessary files from npm package

### 0.1.2 (2024-06-04)
* prevent crash
* try restart in case of error with cec-client

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 Garfonso <garfonso@mobo.info>

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