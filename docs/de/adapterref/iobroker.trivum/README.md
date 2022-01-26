---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: OPUUq+XSk/V6xvZboFDmtK4R9e9OgPnZxtJRc9Tor10=
---
![Logo](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.trivum.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.trivum.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/trivum-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/trivum-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TheBam1990/iobroker.trivum.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/TheBam1990/ioBroker.trivum/badge.svg)
![NPM](https://nodei.co/npm/iobroker.trivum.png?downloads=true)

#ioBroker.trivum
**Tests:** ![Testen und freigeben](https://github.com/TheBam1990/ioBroker.trivum/workflows/Test%20and%20Release/badge.svg)

## Trivum-Adapter für ioBroker
Trivum Multiroom-System

## Benutzerhandbuch
Geben Sie die IP-Adresse des Geräts in der Registerkarte Haupteinstellungen ein.
Der Adapter sucht dann automatisch nach den verfügbaren Zonen und schreibt diese mit den zugehörigen Objekten in die Objektliste.

Als allgemeine Variablen (global) werden angelegt:

-Alles ausschalten

-Aktive Zonen (wie viele Zonen sind derzeit aktiv)

Dann die jeweiligen Bedienelemente unter den einzelnen Zonen:

-Mute (stummschalten und reaktivieren)

-Default-Stream (Aktivieren der Zone mit dem Standard-Webstream)

-Default-Tuner (Aktivieren der Zone mit dem Standard-Tuner)

-Lautstärke (Lautstärke anzeigen und ändern)

-Zone-Off (Zone ausschalten)

-Status der Zone (zeigt an, ob die Zone ein- oder ausgeschaltet ist)

## Changelog

### 0.0.4 (2021-06-12)
* (TheBam) Paging added and info.connection fixed for admin 5

### 0.0.3 (2021-04-29)
* (TheBam) Cleaning the code

### 0.0.2
* (TheBam) Cleaning the code

### 0.0.1
* (TheBam) First version to control your Trivum Multiroom Systems

## License
MIT License

Copyright (c) 2021 TheBam <elektrobam@gmx.de>

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
SOFTWARE."# ioBroker.trivum"