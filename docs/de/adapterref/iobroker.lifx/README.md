---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: k2uPTrT/wv20Rf+hQLaJ9n+2BuYsWaxt/yQ3pLPPFBA=
---
![Logo](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/lifx-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lifx.svg)
![Test und Freigabe](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

# ioBroker.lifx

Lifx-Adapter für ioBroker

## Einstellungen/Konfiguration:

- Keine Einstellungen oder Konfiguration erforderlich, der Adapter erkennt die Lampen automatisch.

### Metro-Widget nicht erreichbar

- Das kleine Symbol für den Status „Nicht erreichbar“ im Metro-Widget ist das erste Objekt der Benachrichtigung.
- object\_id\[0] ist der Indikator.unreachable
- Anstelle der Voreinstellung „true“ soll „false“ geschrieben werden.
- Das Symbol sollte wifiColorRed.png sein.
- Ein horizontaler Versatz von 6 sollte problemlos funktionieren.

## Visualisierung:

- LIFX-Widgets verwenden

## Objekte

| Objekt                    | Wert            | einstellbar | Beschreibung                    |
| ------------------------- | --------------- | :---------: | ------------------------------- |
| Bulb.state                | boolescher Wert |      X      | wahr/falsch -> EIN/AUS          |
| Glühbirne.Farbmodus       | boolescher Wert |      X      | Farbe: Weiß                     |
| Glühbirnentemperatur      | Wert            |      X      | Farbtemperatur 2500…9000 K      |
| Bulb.hue                  | Wert            |      X      | Farbe 0...360                   |
| Bulb.sat                  | Wert            |      X      | Sättigung 0...100 %             |
| Glühbirne.hell            | Wert            |      X      | Helligkeit 0...100 %            |
| Bulb.online               | boolescher Wert |      -      | wahr/falsch                     |
| Bulb.label                | Wert            |      -      | Name/Bezeichnung                |
| Bulb.vendor               | Wert            |      -      | Anbieterinformationen           |
| Glühbirne.Produkt         | Wert            |      -      | Produktinformationen            |
| Glühbirne.FarbeLampe      | Wert            |      -      | Farblampeninformationen         |
| Infrarotlampe             | Wert            |      -      | Informationen zur Infrarotlampe |
| Glühbirne.Mehrzonenlampe  | Wert            |      -      | Mehrzonen-Lampeninformationen   |
| Glühbirnenzone.temperatur | Wert            |      X      | Farbtemperatur 2500…9000 K      |
| Glühbirne.Zone.Farbton    | Wert            |      X      | Farbe 0...360                   |
| Bulb.Zone.sat             | Wert            |      X      | Sättigung 0...100 %             |
| Glühbirne.Zone.hell       | Wert            |      X      | Helligkeit 0...100 %            |

## TODO:

- Anpassung der Farbwerte unter Beibehaltung aller bestehenden Einstellungen (Helligkeitsanpassung mit fester Sättigung von 80 % und Beibehaltung der vorherigen Farbtoneinstellung; Sättigungsanpassung und Farbtonanpassung mit fester Helligkeit von 80 %)
- Übergangszeiten
- Wellenformen

## bekannte Probleme

- Werte außerhalb des zulässigen Bereichs führen zum Absturz des Adapters.

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.0.0 [BREAKING]

- update lifx-lan-client 2.1.2
- state roles (colorLamp, infraredLamp, multizoneLampe) are no longer string, corrected to boolean (delete those states when adapter is stopped and restart adapter)
- hue and saturation states in warm white lamp, since the states are transmitted and causing warnings

### 1.0.10

- update dependencies
- update to comply with repo checker

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

[Older changelogs can be found there](https://github.com/foxthefox/ioBroker.lifx/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2016-2026 foxthefox <foxthefox@wysiwis.net>