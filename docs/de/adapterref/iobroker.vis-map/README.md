---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-map/README.md
title: ioBroker.vis-Karte
hash: wrWX5vCEa+TyCgDVUkiRLNIyI2SdtOdQd4cOyJHlgv4=
---
![Logo](../../../en/adapterref/iobroker.vis-map/admin/vis-map.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-map-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-map.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-map.svg)
![NPM](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)

# IoBroker.vis-map
![Screenshot](../../../en/adapterref/iobroker.vis-map/img/widgets.png)

Widgets, die Koordinaten auf einer Karte anzeigen können.
Aktuell werden nur Open Street Maps und Google unterstützt. Um Google Maps zu verwenden, sollten Sie den API-Schlüssel für Google Maps erhalten.
Sie erhalten ihn unter [Hier](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Verwendung
Sie können Längen- und Breitengrad trennen oder in **Längengrad** einfach die Objekt-ID mit dem folgenden Wert einfügen:

- 7.0001;49.0000 (Längengrad; Breitengrad)
- 7.0001;49.0000 (Längengrad; Breitengrad)
- 7.0001,49.0000 (Längengrad, Breitengrad)
- 49.0000,7.0001 (Breitengrad, Längengrad + Umschaltflagge)
- 49.0000;7.0001 (Breitengrad; Längengrad + Flagge vertauschen)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 1.1.2 (2024-07-12)
- fix datapoint handling for lat/lan
- Make data points in 0_userdata work again

### 1.1.0 (2024-03-07)
- (bluefox) Removed dependency to `iobroker.vis`. Only show the message if vis is not installed

### 1.0.5 (2024-01-14)
- (bluefox) Added vis-2 to the restart by installation

### 1.0.4 (2020-03-18)
- (bluefox) Small errors were fixed

### 1.0.3 (2020-01-25)
- (TA2k) Fix OSM issue with Safari

### 1.0.2 (2018-07-06)
- (bluefox) Event click on pins added

### 1.0.1 (2018-01-08)
- (bluefox) Fix error if coordinates are empty

### 1.0.0 (2017-09-26)
- (bluefox) allow to swap longitude and latitude

### 0.1.4 (2017-04-28)
- (bluefox) add traffic layer for google maps

### 0.1.3 (2016-09-04)
- (bluefox) fix google map max zoom

### 0.1.1 (2016-07-17)
- (bluefox) remove unused files

### 0.1.0 (2016-07-08)
- (bluefox) initial checkin

## License
 Copyright (c) 2016-2024 bluefox <dogafox@gmail.com>
 MIT