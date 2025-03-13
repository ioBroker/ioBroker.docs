---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjlink
hash: nkmGmjt70xaRl8i7F74+GYPsaaiq/NlgGtOsXAg7dRA=
---
![Logo](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pjlink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pjlink-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# IoBroker.pjlink
![Testen und Freigeben](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

## Pjlink-Adapter für ioBroker
PJLink Projektorsteuerung

**!! Derzeit wird nur das Protokoll der Klasse 1 unterstützt**

## Über PJLink
PJLink ist ein einheitlicher Standard für die Bedienung und Steuerung von Datenprojektoren.
PJLink ermöglicht die zentrale Steuerung von Projektoren verschiedener Hersteller. Die Projektoren können über einen Controller gesteuert werden.
PJLink-kompatible Geräte können jederzeit, überall und herstellerunabhängig verwaltet und gesteuert werden.
PJLink ist ein neuer Standard, der Kommunikationsschnittstellen und -protokolle, die sich je nach Projektorhersteller unterscheiden, vereinheitlicht und einheitlich gestaltet.

> PJLink-kompatible Geräte zeichnen sich durch eine hohe Interkonnektivität zwischen verschiedenen Modellen und Herstellern aus, sodass sich Umgebungen mit unterschiedlichen Modellen und Systemen problemlos aufbauen und bereits vorhandene Systeme problemlos austauschen lassen.

* [Von der PJLink-Homepage übernommen](https://pjlink.jbmia.or.jp/english/)

## Credits
Das Protokoll ist ein Warenzeichen von: **Copyrights © Japan Business Machine and Information System Industries Association. Alle Rechte vorbehalten,** [PJLink Homepage](https://pjlink.jbmia.or.jp/english/)

Diese Arbeit basiert auf dem Node.js-Modul mit pjlink-Implementierung von **sy1vain**: [https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

## Aufgaben
* Unterstützung des Node-PJLink-Projekts zur Implementierung von Klasse 2
* Gehen Sie zurück zur pjlink-Bibliothek auf GitHub. Aufgrund eines Fehlers im Testskript wird die Bibliothek derzeit lokal gespeichert.

## So funktioniert der Adapter
Derzeit wird nur Klasse 1 unterstützt. Das bedeutet, dass der Adapter nur den Status abfragen kann.
Das aktive Senden von Statusinformationen vom Gerät an den Adapter ist möglich, sobald Klasse 2 unterstützt wird.

#### PJLink Klasse 1 Eingänge
* Die Eingänge müssen als 2-stellige Zahlen angegeben werden. Die erste Ziffer beschreibt den Eingangstyp

| Typ | Anzahl | mögliche Eingaben |
| ------- | ------ | --------------- |
| RGB | 1 | 1 - 9 |
| VIDEO | 2 | 1 - 9 |
| DIGITAL | 3 | 1 - 9 |
| LAGERUNG | 4 | 1 - 9 |
| NETZWERK | 5 | 1 - 9 |

Die möglichen Eingaben finden Sie nach dem Start des Adapters in der Datenbank unter > pjlink.\<instance\>.deviceInfo.availableInputs

Sie können das Eingabeobjekt in der Instanzkonfiguration bearbeiten. Dort können Sie die Namen der Eingaben bearbeiten und die Eingaben vom Datenbankobjekt validieren lassen.

### Netzschalter
Mit dem Status (auf **true** gesetzt)

> pjlink.\<Instanz\>.power

Der Projektor kann je nach aktuellem Stromzustand ein- **und** ausgeschaltet werden.

> pjlink.\<Instanz\>.powerStatus

Der Netzschalter wird automatisch auf **false** zurückgesetzt.

#### Lampenstatus
In der Datenbank ist nur eine Lampe vordefiniert. Ergibt die Lampenabfrage mehrere Lampen, werden die weiteren Lampen dynamisch hinzugefügt.

#### Ping-Funktion
Ist der Projektor längere Zeit nicht erreichbar, kann der Adapter auf ICMP-Ping umschalten, um die Erreichbarkeit zu prüfen, z. B. nach drei fehlgeschlagenen Verbindungsversuchen. Wird ein Ping beantwortet, versucht der Adapter erneut, die Verbindung wiederherzustellen, vgl. [https://github.com/Bannsaenger/ioBroker.pjlink/issues/59](https://github.com/Bannsaenger/ioBroker.pjlink/issues/59)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated dependencies
* (Bannsaenger) added ping feature

### 0.1.1 (2023-01-24)
* (Bannsaenger) temporarily fix the test script error with local libraries

### 0.1.0 (2023-01-23)
* (Bannsaenger) extended configuration to let you choose the frequency and time for information retrieval
* (Bannsaenger) add possibility to customize media.input by the **INST** query and edit the names in instance config
* (Bannsaenger) add non-guaranteed time after power ON (number of skipped short cycles after power ON event)
* (Bannsaenger) moved all status queries to one timer due to authentification issues when queries are executed at the same time
* (Bannsaenger) treat error "unavailabe time" only as warning and log it only once

### 0.0.3 (2022-10-19)
* (Bannsaenger) updated react dependency

### 0.0.2 (2022-10-19)
* (Bannsaenger) changed some info logs to debug. Fixed one power state issue.
* (Bannsaenger) redesign of timer and error handling

### 0.0.1 (2022-10-13)
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2022-2025 Bannsaenger <bannsaenger@gmx.de>

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