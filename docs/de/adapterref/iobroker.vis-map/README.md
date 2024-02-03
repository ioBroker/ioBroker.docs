---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-map/README.md
title: ioBroker.vis-map
hash: AuN4FwNGTj3kE9XUp7CpFeo9c3fj97QGvtmTjLa72nk=
---
![Logo](../../../en/adapterref/iobroker.vis-map/admin/vis-map.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-map-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-map.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-map.svg)
![NPM](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)

# IoBroker.vis-map
![Bildschirmfoto](../../../en/adapterref/iobroker.vis-map/img/widgets.png)

Widgets, die Koordinaten auf einer Karte anzeigen können.
Unterstützt werden eigentlich nur Open Street Maps und Google. Um Google Maps nutzen zu können, benötigen Sie den API-Schlüssel für Google Maps.
Sie können es bekommen [Hier](https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend&keyType=CLIENT_SIDE&reusekey=true)

## Verwendung
Sie können Längen- und Breitengrad voneinander trennen oder einfach die Objekt-ID mit dem folgenden Wert in **Längengrad** einfügen:

- 7.0001;49.0000 (Längengrad; Breitengrad)
- 7.0001;49.0000 (Längengrad; Breitengrad)
- 7.0001,49.0000 (Längengrad, Breitengrad)
- 49.0000,7.0001 (Breitengrad, Längengrad + Swap-Flag)
- 49.0000;7.0001 (Breitengrad; Längengrad + Swap-Flag)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
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