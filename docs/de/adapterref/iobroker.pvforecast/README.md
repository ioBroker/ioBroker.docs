---
BADGE-Number of Installations: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.pvforecast.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast.svg
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast - Adapter zu vorhersage eurer PV Erträge"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
---
![Logo](../../admin/pvforecast.png)

# ioBroker.pvforecast - Adapter zu vorhersage eurer PV Erträge

Dieser Adapter ersetzt das JavaScript aus dem [ioBroker forum](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter)

Der Adapter holt die Grunddaten von https://api.forecast.solar mit folgenden Daten:

## Einstellungen

1. Längengrad (-180 (West) … 180 (Ost))
2. Breitengrad -90 (Süd) … 90 (Nord)
3. Link zu Seite
4. Api Schlüssel
5. Diagramm Y-Achse Stufe
6. Zeitplan Datenabfrage(min) - Zeitplan aller x Minuten die Daten vom Server abgerufen werden sollen.

![pvforecast options](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

Mit einem Api-Schlüssel kann zusätzlich das Wetter bezogen werden.

1. datetime - Datum und Uhrzeit
2. sky - Wert zwischen 0 und 1 prozentual für klaren Himmel [1 =  klarer Himmel].
3. Temperatur [°C]
4. Zustand - text 
5. icon - text + nummer
6. Wind Geschwindigkeit -  [km/h]
7. Wind winkel - Norden 0°[Uhrzeigersinn]. (Wenn die Windgeschwindigkeit ist Null, wird der Wert nicht definiert)
8. Wind richtung - Short name 
9. Höhere Zeitauflösung

## Für die Anlage stehen folgende Einstellungen zu Verfügung

1. Neigung (0°-90°)
2. Azimuth (-180 = north, -90 = east, 0 = south, 90 = west, 180 = north)
3. Anlagenleistung (kWh)
4. Anlagenname
5. Diagramm Legenden Name
9. Diagramm Farbe
10. Diagramm Label Farbe 

![pvforecast pvsystem](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

All diese Information werden benötigt um eine saubere Funktion des Adapters gewährleisten zu können.

Falls der Längen und Breitengrad schon im System hinterlegt ist, trägt das System die Daten automatisch in die Felder ein.

## VIS Beispiel

Bevor das Beispiel geladen werden kann, bitte installiert: [Material Design](https://github.com/Scrounger/ioBroker.vis-materialdesign).
Wenn ihr in der ioBroker Vis die Json Diagramme und Tabellen benutzen möchtet, findet ihr hier ein [Beispiel](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.7.1 (2023-05-10)
* (klein0r) Summary channel should not be deleted

### 2.7.0 (2023-05-09)
* (klein0r) Request forecast data in correct timezone
* (bluefox) Type of the `summary` object was changed to `device`

### 2.6.0 (2023-03-09)
* (arteck) chart summary for more strings
* (klein0r) Fixed charting summary
* (klein0r) Rounded values in JSON summary

### 2.5.2 (2023-03-08)
* (klein0r) Fixed error when weather data could not be fetched

### 2.5.1 (2023-01-13)
* (klein0r) Fixed JSON table when using solcast

## License
MIT License

Copyright (c) 2021-2023 Patrick-Walther
                        Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.