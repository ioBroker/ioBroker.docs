---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjlink
hash: sONeU363DJxBis8FGxm29y9eMOBZ1hOMBQZOjEovGA8=
---
![Logo](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pjlink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pjlink-stable.svg)
![Test und Freigabe](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# ioBroker.pjlink

## pjlink-Adapter für ioBroker

PJLink Projektorsteuerung

**!! Derzeit wird nur das Protokoll der Klasse 1 unterstützt.**

## Über PJLink

> PJLink ist ein einheitlicher Standard für den Betrieb und die Steuerung von Datenprojektoren. PJLink ermöglicht die zentrale Steuerung von Projektoren verschiedener Hersteller, die dann über einen Controller bedient werden können. PJLink-kompatible Geräte lassen sich unabhängig vom Hersteller jederzeit und überall verwalten und steuern. PJLink ist ein neuer Standard, der die bisher herstellerspezifischen Kommunikationsschnittstellen und -protokolle vereinheitlicht und standardisiert.

> PJLink-kompatible Geräte zeichnen sich durch eine hohe Interkonnektivität über verschiedene Modelle und Hersteller hinweg aus. Dies ermöglicht die einfache Gestaltung von Umgebungen, in denen unterschiedliche Modelle und Systeme gemischt sind, sowie den einfachen Austausch bereits vorhandener Systeme.

- [Entnommen von der PJLink-Homepage](https://pjlink.jbmia.or.jp/english/)

## Credits

Das Protokoll ist eine eingetragene Marke **der Japan Business Machine and Information System Industries Association. Alle Rechte vorbehalten.** [PJLink-Homepage](https://pjlink.jbmia.or.jp/english/)

Diese Arbeit basiert auf dem Node.js-Modul mit pjlink-Implementierung von **sy1vain** : <https://github.com/sy1vain/node-pjlink>

## Aufgaben

- Unterstützung des node-pjlink-Projekts zur Implementierung der Klasse 2
- Kehren Sie zur pjlink-Bibliothek auf GitHub zurück. Die Bibliothek wird derzeit aufgrund eines Fehlers im Testskript lokal verwaltet.

## Funktionsweise des Adapters

Aktuell wird nur Klasse 1 unterstützt. Das bedeutet, der Adapter kann den Status lediglich abfragen. Die aktive Übertragung von Statusinformationen vom Gerät an den Adapter kann hinzugefügt werden, sobald Klasse 2 unterstützt wird.

#### PJLink-Eingänge der Klasse 1

- Die Eingaben müssen als zweistellige Zahlen festgelegt werden. Die erste Ziffer beschreibt den Eingabetyp.

| Typ      | Nummer | mögliche Eingaben |
| -------- | ------ | ----------------- |
| RGB      | 1      | 1 - 9             |
| VIDEO    | 2      | 1 - 9             |
| DIGITAL  | 3      | 1 - 9             |
| LAGERUNG | 4      | 1 - 9             |
| NETZWERK | 5      | 1 - 9             |

Die möglichen Eingaben können in der Datenbank gefunden werden, nachdem der Adapter gestartet wurde.

> pjlink.\<instance>.deviceInfo.availableInputs

Sie können das Eingabeobjekt in der Instanzkonfiguration bearbeiten. Dort können Sie die Namen der Eingaben ändern und die Datenbankobjekte Ihre Eingaben validieren lassen.

### Netzschalter

Wenn der Zustand (auf **„true“** gesetzt)

> pjlink.\<instance>.power

Der Projektor kann je nach aktuellem Stromzustand ein- **und** ausgeschaltet werden.

> pjlink.\<instance>.powerStatus

Der Netzschalter kehrt automatisch in die **Position „false“** zurück.

#### Lampenstatus

In der Datenbank ist nur eine Lampe vordefiniert. Falls die Lampenabfrage mehrere Lampen zurückgibt, werden die übrigen Lampen dynamisch hinzugefügt.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.1.2 (2025-10-27)
* (Bannsaenger) updated dependencies and issues from repository checker
* (Bannsaenger) migrate to NPM Trusted Publishing
* (Bannsaenger) added tcp-ping feature

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

[Older changelogs can be found there](https://github.com/Bannsaenger/ioBroker.pjlink/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 Bannsaenger <bannsaenger@gmx.de>

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