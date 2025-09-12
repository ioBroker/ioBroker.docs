---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bydhvs/README.md
title: kein Titel
hash: KB7RargX+yva7yH7Db8nwbj/wkP5w5DHRtli0soAJ0E=
---
![Logo](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bydhvs.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bydhvs.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bydhvs-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bydhvs-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bydhvs.png?downloads=true)

**Tests:** ![Testen und Freigeben](https://github.com/christianh17/ioBroker.bydhvs/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/christianh17/ioBroker.bydhvs/actions/workflows/codeql.yml/badge.svg?branch=main)

## Bydhvs-Adapter für ioBroker
BYD HVS Batterie-Umfragedaten

## Einführung
Dieser Adapter empfängt Daten von einer BYD-PV-Batterie ( https://www.bydbatterybox.com/ ) und legt sie in Datenpunkte im Adapter ab. Leider gibt es weder eine offizielle API noch eine Dokumentation, daher habe ich Wireshark und einen BYD-HVS-Simulator verwendet, um die Kommunikation zu verstehen. Mein Adapter simuliert die BYD-App, sendet ähnliche Pakete an das Gerät und analysiert die Antworten.

## Seien Sie vorsichtig
Die beConnect-App besteht aus zwei Schritten: Im ersten Schritt erhält man die normalen Daten, im zweiten Schritt erhält man Detaildaten für alle Zellen (Temperatur und Spannung der einzelnen Zellen und einige weitere Details). Um die Detaildaten zu erhalten, muss es nach einem der Datenpakete eine Verzögerung geben, bis ich das Ergebnis erhalten kann. Ich glaube, dass inzwischen alle Zellen gemessen wurden, bin mir aber nicht sicher. Ich bin mir definitiv nicht sicher, ob Sie Ihrer Batterie schaden, wenn Sie diese Daten zu oft abfragen. Seien Sie sich also bewusst: Sie handeln auf eigene Gefahr!

## Unterstützung für bis zu 5 Module
Es werden jetzt bis zu 5 HVS-Module unterstützt.

## Einstellungen
Intervall: Ganz einfach: Wie oft sollen die Daten abgefragt werden? IP-Adresse: Das erklärt sich von selbst. Entweder Sie verwenden die Standardadresse (192.168.16.254) und ändern das Routing zu Hause, z. B.: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343. Der Vorteil: Die beConnect-App funktioniert auch. Andere Möglichkeit: Sie ändern die IP-Adresse der Box. Aber Vorsicht: Der Text auf der Webseite ist verwirrend, und wenn Sie sich nicht ganz sicher sind: BITTE die Finger von den Einstellungen lassen. In den deutschen Foren habe ich von Leuten gelesen, die aus ihrem System ausgesperrt wurden und es keinen Weg zurück gibt. Entweder schickt Ihnen byd eine Ersatz-HVU oder Sie müssen eine neue kaufen.
Batteriedetails: Wie oben erläutert: Benötigen Sie die Details der Batterie? Falls ja: Aktivieren Sie das Kontrollkästchen.
Batteriedetails – alle ... Zyklen: Sollte wie oben deaktiviert sein. Testmodus – Daten im Fehlerprotokoll anzeigen: Wenn Sie dieses Kontrollkästchen aktivieren, werden die gesendeten und empfangenen Daten im Fehlerprotokoll angezeigt, sodass Sie die Daten einfach herunterladen und mir im Fehlerfall zusenden können.
Kopieren und Einfügen funktioniert nicht – die Daten werden am Ende abgeschnitten. Sie müssen sie herunterladen, bevor Sie sie mir zusenden.

[Link zur nativen deutschen Readme:](README-German.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (arteck) add current info
* (arteck) add creates into separated file 

### 1.5.4 (2025-08-03)
* (arteck) typo

### 1.5.3 (2025-08-02)
* (arteck) update dependecy

### 1.5.2 (2025-08-02)
* (arteck) add socketConnection DP
* (arteck) use jsconConfig
* (arteck) refactoring to modern Code
* (arteck) use direct socket connection without detour IPClient
* first Version with two towers in NPM

### 1.5.1 (2024-01-15)
* Enable the possibility to get informations from a two tower setup
* BREAKING CHANGE of Structure.

### 1.5.0 (2023-11-04)
* Breaking change: nodejs 16 minimum required
* automated checks and release-script repaired (thanks to mcm1957, he did the work)
* nothing else changed in code

###

## License
MIT License

Copyright (c) 2025 Christian <github@familie-herrmann.de>

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