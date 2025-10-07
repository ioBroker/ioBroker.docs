---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asuswrt/README.md
title: ioBroker.asuswrt
hash: aI0i0gZIkf0AO68rz7yVv1U5pQCIK2uLW+ZXAiq1YL8=
---
![Logo](../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)

![Anzahl der Installationen](http://iobroker.live/badges/asuswrt-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.asuswrt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)
![Tests](https://api.travis-ci.org/mcdhrts/ioBroker.asuswrt.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![NPM](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)

# IoBroker.asuswrt
=================

## ASUSWRT-Adapter für ioBroker
Suchen Sie aktive Geräte in ASUS-Routern mit ASUSWRT.
Sie können dies beispielsweise zur Anwesenheitserkennung von Telefonen verwenden, um festzustellen, ob jemand zu Hause ist.

Getestet mit Asus GT-AC5300 mit ASUSWRT 3.0.0.4.384_32799

Eine Liste von Asus, welche Router ASUSWRT NICHT verwenden, finden Sie hier: https://event.asus.com/2013/nw/ASUSWRT/

## Anforderungen
Sie müssen SSH-Verbindungen in Ihren Router-Einstellungen aktivieren und zulassen

Sie benötigen mindestens:

* js-controller >= 6.0.11
* Administrator >= 7.6.17
* Node.js >= 18.x

Für ältere ioBroker-Versionen installieren Sie Version 0.3.1

## Aufstellen
* Asus Router IP-Adresse (Pflichtfeld)
* Die IP-Adresse des Asus Routers
* Benutzer-Login (Pflichtfeld)
* Der Benutzername für die Anmeldung am Asus-Router
* Anmeldekennwort (optional, wenn eine private Schlüsseldatei verwendet wird)
* Das Passwort für den Benutzer zum Anmelden
* Wenn Sie eine private Schlüsseldatei verwenden, lassen Sie dieses Feld leer
* Private Schlüsseldatei (optional, wenn ein Passwort verwendet wird)
* Wenn Sie kein Passwort-Login verwenden möchten, können Sie den Pfad zur privaten Schlüsseldatei für den SSH-Login festlegen
* Leer lassen, falls nicht gewünscht
* Passphrase der privaten Schlüsseldatei (optional, wenn die private Schlüsseldatei verschlüsselt ist)
* Wenn Ihre Schlüsseldatei mit einer Passphrase verschlüsselt ist, geben Sie diese hier ein
* Leer lassen, falls nicht erforderlich
* SSH-Port (Pflicht)
* Der Port für die SSH-Verbindung zum Asus Router
* Abfragezeit
* Die Zeit in ms zum Prüfen auf aktive Geräte (Mindestzeit beträgt 5000 ms = 5 s)
* Zeit nicht aktiv
* Die Zeit in ms, wenn ein Gerät nicht mehr aktiv ist.
* In meinem Fall funktioniert 180000ms = 180s = 3 Minuten perfekt. Minimum ist 60000ms
* Adressen zur Überwachung
* Fügen Sie die zu überwachenden Geräte hinzu, ob sie aktiv sind oder nicht, mit der MAC-Adresse des Geräts.
* Vergessen Sie nicht, das Kontrollkästchen zu aktivieren, um die Überwachung zu aktivieren

## Changelog

### 1.0.2 (2025-10-05)
* (mcdhrts) Fixed admin UI 404 error - renamed index_m.html to index.html
* (mcdhrts) Updated requirements documentation to reflect current dependencies (js-controller >= 6.0.11, admin >= 7.6.17, Node.js >= 18.x)
* (mcdhrts) Improved integration tests with proper test harness and configuration validation
* (mcdhrts) Removed deprecated unit tests in favor of modern integration tests
* (mcdhrts) Updated dependencies: ssh2 ^1.4.0 -> ^1.17.0, @iobroker/adapter-core ^3.3.1 -> ^3.3.2, @iobroker/testing ^5.0.4 -> ^5.1.1
* (mcdhrts) Removed deprecated devDependencies: gulp, mocha, chai (now handled by @iobroker/testing)

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

## License
The MIT License (MIT)

Copyright (c) 2019 mcdhrts <mcdhrts@outlook.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.