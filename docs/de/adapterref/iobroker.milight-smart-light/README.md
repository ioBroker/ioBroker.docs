---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: oed1wpV8HlHSa4npvyOtPHQdOpAzYTYEUpNrhSZn27E=
---
![milight-smart-light-Logo](../../../en/adapterref/iobroker.milight-smart-light/admin/milight-smart-light.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![stabil](http://iobroker.live/badges/milight-smart-light-stable.svg)
![Eingerichtet](http://iobroker.live/badges/milight-smart-light-installed.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)
![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

# IoBroker.milight-smart-light
![Testen und freigeben](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

Dieser Adapter für ioBroker steuert Milight LED-Lampen und LED-Streifen und basiert auf dem Node-Modul von mwittig.

mwittig / [Knoten-Milight-Versprechen](https://github.com/mwittig/node-milight-promise)

Mit Adapter können Sie beides verwenden: **v6 Bridge** und **Legacy Bridge**.

**v6-Brücke:**

- Brücke (nur iBox1)
- Weiss
- rgb(w)
- volle Farbe
- fullColor8Zone

**Alte Brücke:**

- Weiss
- rgb(w)

**Beschreibung**

Eine ausführliche Beschreibung finden Sie unter [Hier](https://steiger04.github.io/milight-smart-light-doku/).

###Versionen
- **Node.js**: Verwenden Sie v. 14.x oder höher
- **iobroker.admin**: Verwenden Sie v. 5.1.25 oder höher

## Changelog
### 1.2.2 (2021-10-17)
- (steiger04) Compatibility check and testing for Node.js 16 and some CSS adjustments
### 1.2.1 (2021-05-18)
- (steiger04) Compatibility with socketio v3.1.4 
### 1.2.0 (2021-01-16)
- (steiger04) compact mode added
### 1.0.5 (2021-01-10)
- (steiger04) Small bug fix
### 1.0.1 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2
### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License
The MIT License (MIT)

Copyright (c) 2017-2021 Steiger04 <steiger04@posteo.de>