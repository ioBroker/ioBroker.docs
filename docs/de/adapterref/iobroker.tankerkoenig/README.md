---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-installed.svg
BADGE-ioBroker stable release: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg?logo=npm
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg?logo=npm
---
![Logo](../../admin/tankerkoenig.png)
# ioBroker.tankerkoenig

![Number of Installations](http://iobroker.live/badges/tankerkoenig-installed.svg) 
![stable Version](http://iobroker.live/badges/tankerkoenig-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)](https://www.npmjs.com/package/iobroker.tankerkoenig)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)](https://www.npmjs.com/package/iobroker.tankerkoenig)

[![NPM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)](https://nodei.co/npm/iobroker.tankerkoenig/)

**Tests:**
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml)

## Beschreibung
:de: Dieser Adapter liefert die Spritpreise für 10 festgelegte Tankstellen über den JSON Feed der Internetseite [tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about). Die Daten werden in Objekte gespeichert, um in [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) verarbeitet zu werden.
Der Adapter verwendet die Seite `prices.php`, welche beim Quellserver von tankerkoenig.de durch die gleichzeitige Abfrage vieler Stationen und die Rückgabe von nur wenigen Daten insgesamt sehr viel weniger Datenverkehr verursacht, als die Abfrage über `list.php` (Umkreissuche) oder `detail.php` (Einzelabfrage einer Tankstelle). Auf die beiden anderen Formen der Abfrage wurde bewusst verzichtet. Somit ist keine Umkreissuche (zB sortiert nach Preis) und keine Lieferung genauerer Daten (Straße, Marke, Hausnummer, etc.) möglich. Die jeweils günstigste Tankstelle für die drei Spritsorten E5, E10 und Diesel werden in einem separaten Kanal gespeichert.

## Einstellungen
### API-Key
Der API Schlüssel ist auf der [Seite von Tankerkönig](https://creativecommons.tankerkoenig.de/#about) erhältlich. Die 36-stellige Zeichenkette muss hier eingetragen werden.

### Tankstellen
Es können bis zu 10 Tankstellen abgefragt werden. Dazu ist die Eingabe der Tankstellen ID nötig. Die ID für jede Tankstelle erhält man auf tankerkoenig.de. Sie ist ebenfalls 
36-stellig. 
Zusätzlich kann ein eigener Name für die Station hinterlegt werden.
![alt text](../img/tankerkoenigSettingsScreenshot1.png "Screenshot Settings")
![alt text](../img/tankerkoenigSettingsScreenshot2.png "Screenshot Settings")

Über dieses Fenster werden die neuen Stationen hinzugefügt, man kann direkt in der Karte darunter die Stadions-ID auslesen und in das Feld oben kopieren.
Es gibt 2 Möglichkeiten, die ID in das Feld zu kopieren:
- Du markierst die ID und kopierst sie mit Strg+C oder du klickst mit der rechten Maustaste auf Kopieren und fügst sie dann in das Feld ein.
- Du kannst auch auf die Schaltfläche `Copy` klicken, dann wird der gesamte Inhalt kopiert, und du kannst ihn dann entweder direkt in das Feld einfügen. 
  Oder du klickst auf die Schaltfläche `Paste`, dann wird nur die ID in das Feld eingefügt. 

**Dazu muss man aber zulassen, dass der Browser auf die Zwischenablage zugreifen darf.** (dies funktioniert nur, wenn Ihr Admin mit https läuft und Sie die Seite mit https aufrufen)

![alt text](../img/tankerkoenigStationFinder_copyId.png "Screenshot Settings")

Unter der Rabatt Optionen kann man zwischen den Rabatt Varianten ⇨ Euro / Prozent auswählen und für welchen Kraftstoffart der Rabatt gilt (Standard sind alle ausgewählt)

![alt text](../img/tankerkoenigStationFinder.png "Screenshot Settings")

### Werte auf 0 setzen
Aktivieren Sie diese Funktion, wenn die Preise auf 0 gesetzt werden sollen, wenn die Tankstelle geschlossen ist.\
Wenn die Funktion ausgeschaltet ist, werden die Preise als ungültig gesetzt, siehe unten.

### Ungültige Preise
Wenn eine Tankstelle keine Preise für E5, E10 oder Diesel liefert, z. B. bei einer geschlossenen Station, wird der Preis sich nicht ändern stattdessen wird die state Qualität auf `Qualitätscode 0x40 => Ersatzwert aus Gerät` gesetzt, der state wird dann orange angezeigt.

![alt text](../img/state_quality.png "Screenshot Settings")

## Aktivierung
Der Adapter läuft als Daemon (nicht im Schedule Modus) und startet regulär alle fünf Minuten. Die Daten des Quellfeeds werden vom Server bei tankerkoenig.de nur alle 4min aktualisiert, daher macht eine häufigere Abfrage der Daten keinen Sinn und verursacht nur überflüssigen Datenverkehr und kostet Ressourcen. Größere Intervalle sind jederzeit einstellbar.

##  Datenpunkte
Die Datenpunkte werden dynamisch erstellt, das heißt, wen man eine Station anlegt werden Datenpunkte dazu angelegt (Maximal 10 Stationen)
![alt text](../img/tankerkoenigNewDP.png "Screenshot Settings")
Unter den verschiedenen Kraftstoffart werden die folgenden Datenpunkte:
* `feed` (Preis mit drei Dezimalstellen als Number)
* `short` (Preis mit zwei Dezimalstellen (ungerundet) als String)
* `3rd` (dritte Dezimalstelle des Preises zur Darstellung der Hochzahl in VIS)
* `combined` (fertig HTML formatiert mit Preis und hochgestellter dritter Dezimalstelle oder ggf. Öffnungsstatus [`closed`/`not found`] zur einfachen Darstellung mit VIS HTML Widget)

Unter jeder Kraftstoffart gibt es noch einen weiteren Ordner `minmax` in dem die Datenpunkte für die Min und Max Preise der Tankstelle angelegt werden. Sie werden nur für den 
einen Tag gespeichert und werden am nächsten Tag wieder auf 0 gesetzt und neu befüllt.

Außerdem werden noch fünf Datenpunkte auf in der jeweiligen Station erstellt:
* `discount` (Rabatt in Euro / Prozent als Number)
* `discounted` (Zeigt an, ob ein Rabatt aktiv ist oder nicht)
* `status` (Station geöffnet?)
* `name` (vom Nutzer vergebener Name der Tankstelle)
* `station_id` (Tankerkönig ID der Tankstelle)

Zusätzlich werden noch den die günstigsten Tankstellen aus der Liste in die Kanäle ermittelt
* `cheapest.E5`
* `chepest.E10`
* `cheapest.diesel`

Auf der Stations ebenen werden weitere fünf Datenpunkte erstellt:
* `adapterStatus` (zeigt den status vom adapter an mögliche Werte: `idle / automatic request / manual request / detail request / requet timeout 1min / write states / request 
  Error / offline`)
* `json` (JSON Daten der Tankstelle)
* `jsonTable` (json Tabelle für die vis `nur die json Daten kein Widget`)

![alt text](../img/jsonTable.png "Screenshot Settings")
* `lastUpdate` (Zeitpunkt der letzten Aktualisierung)
* `refresh` (Dies ist ein Button, mit dem man die Daten manuell aktualisieren kann `ACHTUNG` nach einmaligen auslösen ist es für 1 minute nicht mehr möglich die manuelle Aktualisierung auszulösen)


Innerhalb dieser Kanäle ist die jeweils günstigste Tankstelle für die genannte Kraftstoffart angelegt. Bieten mehrere Tankstellen einen Treibstoff zum gleichen Preis an, wird die Station ausgegeben, die in den Einstellungen zuerst/ganz oben eingetragen wurde.

## VIS Nutzung
Der Datenpunkt combined lässt sich in VIS mit diesem Widget darstellen
```js
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```
Der Inhalt des Datenpunktes `combined` wird mit einer CSS-Klasse übergeben. Die Klassen sind `station_open`,`station_closed` und `station_notfound`. Durch die Verwendung von CSS-Definitionen im VIS Editor können so (nicht nur farblich) unterschiedliche Darstellungen für die Zustände "geöffnet" (zB normal), "geschlossen" (zB rote Schrift) und "nicht gefunden" (zB gelbe Schrift) erzielt werden.
```css
.station_open {
    color: blue; 
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}
.station_no_prices {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

## Changelog
<!--
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.3.7 (2023-02-06)
* (xXBJXx) added difference to jsonTable [issue #116](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/116)
* (xXBJXx) added a log message for the error `parameter error`
* (xXBJXx) set the name length to 34 characters
* (xXBJXx) Added verification if the api key is encrypted
* (xXBJXx) updated the Dependencies

### 3.3.6 (2023-01-22)
* (xXBJXx) fixed position of the warning message in the UI
* (xXBJXx) updated the documentation and migration guides for stable version 3.3.6

### 3.3.5 (2023-01-04)
* (xXBJXx) fixed copy/paste bug in the UI

### 3.3.4 (2023-01-03)
* (xXBJXx) Fixed an issue where a postal code starting with 0 was not displayed correctly [Issue #113](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/113)

### 3.3.3 (2023-01-02)
* (xXBJXx) fixed => adapter does not fetch data after a `requestData error` e.g. internet termination.
* (xXBJXx) add adapter migration Guide from 3.1.x to 3.3.x or 3.2.x to 3.3.x [Migration guide](docs/guide/migration_3.3.x.md)
* (xXBJXx) fixed Issue [Issue #111](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/111)

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2023 xXBJXx <issi.dev.iobroker@gmail.com> pix

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