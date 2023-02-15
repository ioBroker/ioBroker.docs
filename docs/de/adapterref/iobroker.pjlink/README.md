---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjlink
hash: fRFyqywoqjqqH5xW0ND8o/PnzeQLT9fhEDVWAGrmvi8=
---
![Logo](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pjlink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pjlink-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# IoBroker.pjlink
![Testen und freigeben](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

## Pjlink-Adapter für ioBroker
PJLink-Projektorsteuerung

**!! Derzeit wird nur das Klasse-1-Protokoll unterstützt**

## Über PJLink
> PJLink ist ein einheitlicher Standard für den Betrieb und die Steuerung von Datenprojektoren.
PJLink ermöglicht die zentrale Steuerung von Projektoren verschiedener Hersteller und Projektoren können von einem Controller aus bedient werden.
PJLink-konforme Geräte können unabhängig vom Hersteller jederzeit und überall verwaltet und gesteuert werden.
PJLink ist ein neuer Standard, der entwickelt wurde, um Kommunikationsschnittstellen und Kommunikationsprotokolle, die sich von einem Projektorhersteller zum anderen unterscheiden, einheitlich und gemeinsam zu machen.

> PJLink-konforme Geräte zeichnen sich durch eine hohe Interkonnektivität zwischen verschiedenen Modellen und Herstellern aus und ermöglichen den einfachen Aufbau von Umgebungen, die mit verschiedenen Modellen und Systemen gemischt sind, und den einfachen Austausch bereits vorhandener Systeme.

* [Übernommen von der PJLink Homepage](https://pjlink.jbmia.or.jp/english/)

## Credits
Das Protokoll ist eine Marke von: **Copyrights © Japan Business Machine and Information System Industries Association. Alle Rechte vorbehalten,** [PJLink-Homepage](https://pjlink.jbmia.or.jp/english/)

Diese Arbeit basiert auf dem nodejs-Modul mit pjlink-Implementierung von **sy1vain**: [https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

## Machen
* Unterstützung des node-pjlink-Projekts zur Implementierung von Klasse 2
* Gehen Sie zurück zur pjlink-Bibliothek auf github. Aufgrund eines Fehlers im Testskript wird die Bibliothek vorerst lokal gehalten

## Funktionsweise des Adapters
Derzeit wird nur Klasse 1 unterstützt. Das heißt, der Adapter kann nur den Status abfragen.
Das aktive Senden von Statusinformationen vom Gerät zum Adapter kann hinzugefügt werden, sobald Klasse 2 unterstützt wird.

#### PJLink-Eingänge der Klasse 1
* Die Eingaben müssen als 2-stellige Zahlen erfolgen. Die erste Ziffer beschreibt den Eingangstyp

| Geben Sie | ein Nummer | mögliche Eingänge |
| ------- | ------ | --------------- |
| RGB | 1 | 1 - 9 |
| VIDEOS | 2 | 1 - 9 |
| DIGITAL | 3 | 1 - 9 |
| LAGERUNG | 4 | 1 - 9 |
| NETZWERK | 5 | 1 - 9 |

Die möglichen Eingänge sind nach dem Start des Adapters in der Datenbank unter > pjlink.\<instance\>.deviceInfo.availableInputs zu finden

Sie können das Eingangsobjekt in der Instanzkonfiguration bearbeiten. Dort können Sie die Namen der Eingaben bearbeiten und das Datenbankobjekt Ihre Eingaben validieren lassen.

### Stromschalter
Mit dem Status (auf **true** gesetzt)

> pjlink.\<Instanz\>.power

Der Projektor kann je nach aktuellem Energiezustand ein- und ausgeschaltet werden.

> pjlink.\<Instanz\>.powerStatus

Der Netzschalter wird automatisch auf **false** zurückgesetzt.

#### Lampenstatus
In der Datenbank ist nur eine Lampe vordefiniert. Wenn die Lampenabfrage mehr als eine Lampe zurückgibt, werden die anderen Lampen dynamisch hinzugefügt.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2022-2023 Bannsaenger <bannsaenger@gmx.de>

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