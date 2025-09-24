---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: bMN/k1bUqhAK3n6vjpzqLess5736QFbTkdhpwxLGYMg=
---
![Logo](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/lifx-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lifx.svg)

# IoBroker.lifx
**Tests:** ![Testen und Freigeben](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

Lifx-Adapter für ioBroker

## Einstellungen/Konfiguration:
- keine Einstellungen oder Konfiguration erforderlich, Adapter erkennt die Lampen automatisch

### Metro-Widget-Status nicht erreichbar
- kleines Symbol für den Nichterreichbarkeitsstatus im Metro-Widget ist das erste Benachrichtigungsobjekt
- object_id[0] ist der Indikator.nicht erreichbar
- statt der Vorgabe "true" soll "false" geschrieben werden
- das Symbol sollte wifiColorRed.png sein
- horizontaler Versatz von 6 sollte gut funktionieren

## Visualisierung:
- Verwenden Sie Lifx-Widgets

## Objekte
| Objekt | Wert | einstellbar | Beschreibung |
| ------------------ | ------- | :------: | ------------------------------- |
| Bulb.state | Boolean | x | wahr/falsch -> EIN/AUS |
| Bulb.colormode | boolesch | x | Farbe, weiß |
| Bulb.temp | Wert | x | Farbtemperatur 2500...9000 K |
| Bulb.hue | Wert | x | Farbe 0...360 |
| Bulb.sat | Wert | x | Sättigung 0...100 % |
| Bulb.bright | Wert | x | Helligkeit 0...100 % |
| Bulb.online | Boolesch | - | Wahr/Falsch |
| Bulb.label | Wert | - | Name/Label |
| Bulb.vendor | Wert | - | Anbieterinfo |
| Glühbirnenprodukt | Wert | - | Produktinfo |
| Bulb.colorLamp | Wert | - | colorLamp-Info |
| Bulb.infraredLamp | Wert | - | Infrarotlampeninfo |
| Bulb.multizoneLamp | Wert | - | multizoneLamp-Info |
| Bulb.Zone.temp | Wert | x | Farbtemperatur 2500...9000 K |
| Bulb.Zone.hue | Wert | x | Farbe 0...360 |
| Bulb.Zone.sat | Wert | x | Sättigung 0...100 % |
| Bulb.Zone.bright | Wert | x | Helligkeit 0...100 % |

## ZU TUN:
- Anpassung der Farbwerte mit allen vorhandenen Einstellungen (Helligkeitsanpassung hat eine feste Sättigung von 80 % und behält die vorherige Farbtoneinstellung bei; Sättigungsanpassung und Farbtonanpassung haben eine feste Helligkeit von 80 %)
- Übergangszeiten
- Wellenformen

## Bekannte Probleme
- Werte außerhalb des Bereichs führen zum Absturz des Adapters

## Changelog

### 1.0.9

- update dependencies
- update to iobroker/eslint

### 1.0.8

- update dependencies

### 1.0.7

- (Jarves020) Reactivated Cyclic Updates (brackets were missing at function call)
- (Jarves020) reenabled Settings for lifx Cyclic Update Intervall
- (Jarves020) Changed LogLevel for "Failed Cyclic Update...." from error to debug to avoid log spamming
- (foxthefox) IOB checker corrections

### 1.0.6

- eslint upgrade and corrections

### 1.0.5

- update devDeps
- IOB checker corrections

### 1.0.4

- implementation jsonUI

### 1.0.3

- translation with adapter-dev

### 1.0.2

- some changes to loglevel
- fix crash when no label is provided

### 1.0.1

- bugfix, context of 'this' in timeout
- Null exception with B/W bulb issue#23

### 1.0.0

- refactoring, change to class based structure of the adapter
- gitub actions instead travis

### 0.2.1

- (Jarvis020) errorhandling improvements
- (Jarvis020) fade time

### 0.2.0

- lifx-lan-client library instead node-lifx
- states for vendor, product, version, product features
- multizone support
- cyclic polling

### 0.1.1

- logo quadratic

### 0.1.0

- compact mode

### 0.0.5

- adminv3
- noConfig -> no admin page anymore

### 0.0.4

- jqui widget with interactive colored slider

### 0.0.3

- metro widget
- jqui widget

### 0.0.2

- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1

- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2016-2025 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2025 foxthefox <foxthefox@wysiwis.net>