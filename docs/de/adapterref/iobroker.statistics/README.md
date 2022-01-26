---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: 50F3oa1dUN0ZXS5QMiPgTULKjXr2Y6gjxR/q4zvXj1k=
---
![Logo](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![Anzahl der Installationen](http://iobroker.live/badges/statistics-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.statistics.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.statistics.svg)

# IoBroker.statistics
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.statistics/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/statistics/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Beschreibung
Dieser Adapter erleichtert die Konfiguration von Statistiken.

`The adapter only reacts on state changes (state.ack=true), not on commands!`

wählen Sie aus den folgenden Einstellungen:

* Impulse oder Ein/Aus-Änderungen zählen (Nur für Binärwerte und positive Flanke)
* Kosten aus den gezählten Werten berechnen (Nur bei Binärwerten)
* wie lange war Status true/ON und wie lange false/OFF (Nur für Binärwerte)
* Delta zwischen protokollierten Analogwerten (Nur für Analogwerte)
* Tagesmax, min und Durchschnitt (nicht für Delta-Berechnungen)
* min/max über das Jahr
* zählt innerhalb von 5 min und täglich max, min und Durchschnitt davon (nicht für Delta-Berechnungen)
* Summe der gruppierten Werte

Der Adapter abonniert die konfigurierten Objekte und erstellt eigene Zustände im Statistikbaum.

Es werden 2 separate Bäume erstellt:

* `statistics.0.save` -> Endwerte des Zeitrahmens
* `statistics.0.temp` -> temporäre Werte bis zum Moment der Übertragung zu speichern, dann startet Temp wieder

Die Struktur des Staates ist: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

Ein deutsches HowTo-Dokument finden Sie hier: [howto_de](./doc/howto_de.md)

## Einstellungen
* Geben Sie die relevanten Gruppen auf der Instanzkonfigurationsseite an (admin => Instanzen => Statistikkonfiguration)
* die Konfiguration in den Einstellungen des Staates angeben (admin => Objekte)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog
### 1.0.10 (2021-11-14)
* (Apollon77) prevent some crash cases

### 1.0.9 (2021-07-29)
* (bluefox) Removed the warnings for js-controller 3.x

### 1.0.6 (2021-05-27)
* (Apollon77) prepare for js-controller 3.3
* (Apollon77) make sure all tasks are processed to prevent missing objects
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