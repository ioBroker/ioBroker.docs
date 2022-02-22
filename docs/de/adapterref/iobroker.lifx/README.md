---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: kcATNN9SeK/K8naEsyUEXDNkSAzbBW+v9YSuK+9Bwos=
---
![Logo](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/lifx-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lifx.svg)

# IoBroker.lifx
**Tests:** ![Testen und freigeben](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

Lifx-Adapter für ioBroker

## Installation:
die offiziell veröffentlichte Version

```javascript
npm install iobroker.lifx
```

die aktuelle version von github:

```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

## Einstellungen/Konfiguration:
- keine Einstellungen oder Konfiguration erforderlich, Adapter erkennt die Lampen automatisch

### U-Bahn-Widget ist nicht erreichbar
- Kleines Symbol für den Status "Unerreichbar" im Metro-Widget ist das erste Objekt der Benachrichtigung
- object_id[0] ist der Indikator.unerreichbar
- Anstelle der Vorgabe "true" soll "false" geschrieben werden
- Das Symbol sollte wifiColorRed.png sein
- Horizontaler Versatz von 6 sollte gut funktionieren

## Visualisierung:
- Lifx-Widgets verwenden

## Objekte
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|Bulb.state|boolesch|x|true/false -> ON/OFF|
|Bulb.colormode|boolesch|x|Farbe, weiß|
|Lampentemp|Wert|x|Farbtemperatur 2500...9000 K|
|Glühbirnenfarbton|Wert|x|Farbe 0...360|
|Bulb.sat|Wert|x|Sättigung 0...100 %|
|Lampenhelligkeit|Wert|x|Helligkeit 0...100 %|
|Glühbirne.online|boolean|-|true/false|
|Lampenlabel|Wert|-|Name/Label|
|Bulb.vendor|value|-|vendor info|
|Lampenprodukt|Wert|-|Produktinfo|
|Bulb.colorLamp|value|-|colorLamp info|
|Birne.infraredLamp|value|-|infraredLamp info|
|Bulb.multizoneLamp|value|-|multizoneLamp info|
|Bulb.Zone.temp|Wert|x|Farbtemperatur 2500...9000 K|
|Bulb.Zone.Hue|Wert|x|Farbe 0...360|
|Bulb.Zone.sat|Wert|x|Sättigung 0...100 %|
|Bulb.Zone.hell|Wert|x|Helligkeit 0...100 %|

## MACHEN:
- Anpassung der Farbwerte mit allen vorhandenen Einstellungen (Helligkeitsanpassung hat eine feste 80% Sättigung und behält die vorherige Farbtoneinstellung bei; Sättigungsanpassung und Farbtonanpassung haben eine feste 80% Helligkeit)
- Übergangszeiten
- Wellenformen

## Bekannte Probleme
- Werte außerhalb des Bereichs führen zum Absturz des Adapters

## Changelog
### 1.0.0
* refactoring, change to class based structure of the adapter
* gitub actions instead travis

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

Copyright (c) 2016-2022 foxthefox <foxthefox@wysiwis.net>