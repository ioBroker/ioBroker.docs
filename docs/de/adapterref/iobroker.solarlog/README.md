---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: QvJCpUjrFP0Cyiu8k4Dc1frlxjH9u5B27o1uXAnifF0=
---
![Logo](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![Anzahl der Installationen](http://iobroker.live/badges/solarlog-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![NPM](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)

# IoBroker.solarlog
Ein ioBroker Adapter für Solarlog - Geräte

## Solarlog - Einstellungen
Die offene JSON-Schnittstelle muss im Konfigurationsmenü des Solar-Logs aktiviert werden (Konfiguration – System – Zugangskontrolle – Offene JSON-Schnittstelle: aktivieren.)

## Adapter - Einstellungen
### Grundeinstellungen
Stellen Sie die Solarlog - IP-Adresse (192.XXX.X.XXX), den Port (optional) und das Polling - Intervall für Verbrauch/Produktion in Sekunden ein (,Live‘-Daten, min. 10s).

Sicherheit: Sie können in Ihrem Solarlog das 'Benutzer'-Passwort aktivieren und die Checkbox 'Benutzeranmeldung aktiviert' ankreuzen und Ihr Passwort in der Adapterkonfiguration eintragen oder Sie können Solarlog und Adapter ohne Benutzerpasswort laufen lassen. Wenn die Benutzeranmeldung aktiviert ist, empfiehlt es sich, den Adapter während der Nutzung der Solarlog-Benutzeroberfläche zu stoppen (sonst müssen Sie sich nach jeder Anfrage des Adapters neu anmelden).

### Erweiterte Einstellungen
Überprüfen Sie, ob alle Wechselrichter-/Unterzähler-/Geräte-/Smart Energy-Daten erfasst werden sollen.

Legen Sie das Abfrageintervall für Durchschnitts- und Summenwerte in Minuten fest (mindestens 5 Min.).

Aktivieren Sie die Option, wenn historische Daten erfasst werden sollen, und legen Sie die Tageszeit fest, zu der die historischen Datenobjekte aktualisiert werden.

Prognose: Optional erhält der Adapter Prognosedaten über die Forecast.Solar-API. Aktuell werden die Gesamt-kWh für heute und morgen prognostiziert und stündlich aktualisiert. Detailliertere oder zusätzliche Daten sind auf Anfrage erhältlich (bitte melden Sie sich bei uns).

## Hardware
Getestet auf: Solarlog 200PM+ / 300PM+ / 500 / 1200Meter / 50

SolarLog 50: Es gibt keine offene JSON-Schnittstelle für SolarLog 50-Geräte. Daher werden bestimmte Werte im „Info“- und „Status“-Kanal „ZUGRIFF VERWEIGERT“ lauten. Wenn Sie eine andere Lösung bevorzugen, eröffnen Sie bitte ein Problem oder posten Sie Ihre Präferenzen in einem entsprechenden Problem.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.2.8

-   ready for js-controller 5.0, enhanced error-handling, dependecies updated

### 2.2.6

-   bug in 'forecast' fixed, dependecies updated

### 2.2.5

-   testing fixed

### 2.2.4

-   polling-bug fixed, dependecies updated

## License

The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 forelleblau marceladam@gmx.ch

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