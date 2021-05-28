---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: AuaRcz6l0S7OYjP7Y0x2/PW7EwSI1OhFRue1IYG3Nj4=
---
![Logo](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![Anzahl der Installationen](http://iobroker.live/badges/statistics-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.statistics.svg)
![Build-Status](https://travis-ci.org/iobroker-community-adapters/ioBroker.statistics.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.statistics.png?downloads=true)

# IoBroker.statistics
## Beschreibung
Dieser Adapter erleichtert die Konfiguration von Statistiken.

`The adapter only reacts on state changes (state.ack=true), not on commands!`

Wählen Sie aus folgenden Einstellungen:

* Impulse zählen oder Ein / Aus-Änderungen (nur für Binärwerte und positive Flanke)
* Kosten aus den gezählten Werten berechnen (nur für Binärwerte)
* Wie lange war der Status wahr / EIN und wie lange falsch / AUS (nur für Binärwerte)
* Delta zwischen protokollierten Analogwerten (nur für Analogwerte)
* tägliche Max, Min und Durchschnitt (nicht für Delta-Berechnungen)
* min / max über das Jahr
* zählt innerhalb von 5 min und täglich max, min und Durchschnitt davon (nicht für Delta-Berechnungen)
* Summe der gruppierten Werte

Der Adapter abonniert die konfigurierten Objekte und erstellt seine eigenen Status im Statistikbaum.

Es werden 2 separate Bäume erstellt:

* `statistics.0.save` -> Endwerte des Zeitrahmens
* `statistics.0.temp` -> temporäre Werte bis zum Zeitpunkt der Übertragung zum Speichern, dann beginnt die Temperatur erneut

Die Struktur des Staates ist: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

Ein deutsches HowTo-Dokument finden Sie hier: [howto_de](./doc/howto_de.md)

## Die Einstellungen
* Geben Sie die relevanten Gruppen auf der Instanzkonfigurationsseite an (admin => Instanzen => Statistikkonfiguration).
* Geben Sie die Konfiguration in den Einstellungen des Status an (admin => Objekte)

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->

## Changelog
### __WORK IN PROGRESS__
* (bluefox) added the support of Admin5 

### 1.0.4
* (foxthefox) changed the state change to BOTH positive and negative edges, hence it causes a lot of log entries

### 1.0.3 (2021-02-08)
* (Apollon77) fix from sentry crash reports

### 1.0.2 (2021-01-06)
* (foxthefox) try catch around the cronjobs

### 1.0.1 (2020-12-22)
* (Black-Thunder) Precision in rounding set to 4

### 1.0.0 (2020-05-01)
* (bluefox) Caught error if structure is invalid
* (bluefox) Added sentry
* adapter.getObjectView -> controller > 2.0

### 0.2.3 (2020-01-02)
* (HIRSCH-DE) bugfix main.js
* (foxthefox) delete messagehandler

### 0.2.2 (2019-06-29)
* (foxthefox) adapter logs a warning when invalid values arrive and cancels further processing

### 0.2.1 (2019-06-15)
* (foxthefox) correction, timecount value was milliseconds instead seconds
* (foxthefox) other calculations with 2 decimal places after comma
* (foxthefox) min/max for day/week/month/quarter/year
* (foxthefox) set of daily min/max starting point from actual value
* (foxthefox) fixing the PR with dayMin 0 at 00:00
* (foxthefox) improvement for timecount when receiving status updates and no real status change

### 0.2.0 (2019-01-08)
* (foxthefox) compact mode

### 0.1.4 (2019-01-07)
* (foxthefox) license added in io-package.json
* (foxthefox) ReadMe updated
* (foxthefox) type = misc-data

### 0.1.3 (2019-01-06)
* first npm release
* (foxthefox) german doc added
* (foxthefox) error corrections
* (foxthefox) travis testing corrections

### 0.1.2 (2018-09-08)
* (bluefox) total refactoring

### 0.0.3
* admin3 implemented
* complete rewrite to have configuration through the settings of the individual states instead in admin page

### 0.0.2
* setup running

### 0.0.1
* initial release

## License

The MIT License (MIT)

Copyright (c) 2018-2021 foxthefox <foxthefox@wysiwis.net>,

Copyright (c) 2018-2021 bluefox <dogafox@gmail.com>