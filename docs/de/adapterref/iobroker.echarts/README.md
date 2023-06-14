---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.echarts/README.md
title: ioBroker.echarts
hash: MeWldIrxZX3/bZ79jf+iC0CUg+946xWacZgCGLaJmmE=
---
![Logo](../../../en/adapterref/iobroker.echarts/admin/echarts.png)

![Anzahl der Installationen](http://iobroker.live/badges/echarts-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.echarts.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.echarts.svg)

# IoBroker.echarts
![Test und Freigabe](https://github.com/ioBroker/ioBroker.echarts/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Echarts-Adapter für ioBroker
Erstellen Sie nützliche Diagramme in ioBroker:

![Bildschirmfoto](../../../en/adapterref/iobroker.echarts/img/screenshot1.png)

![Riegel](../../../en/adapterref/iobroker.echarts/img/bars.png)

## Verwendung
Nach dem Neustart den Tab im Admin hinzufügen: ![Administrator](../../../en/adapterref/iobroker.echarts/img/admin.png)

Auf die erstellte Voreinstellung kann auch im Webadapter zugegriffen werden. URL: `http://IP:8082/echarts/index.html?preset=echarts.0.PRESETID`.

Für `vis` gibt es ein spezielles Widget mit einfacher Auswahl von Voreinstellungen.

### Tooltip
Der Kleinbuchstabe `i` gibt an, dass der Wert aus den 2-Nachbarwerten interpoliert wurde und zu diesem Zeitstempel nicht existiert.

![Tooltip](../../../en/adapterref/iobroker.echarts/img/tooltip.png)

### Daten aus JSON
Sie können die Datenquelle aus JSON definieren. In diesem Fall können Sie einen benutzerdefinierten Status vom Typ `json` erstellen und den Wert wie folgt speichern:

```
[
  {"ts": 1675887847000, "val": 45},
  {"ts": 1675887848000, "val": 77},
  {"ts": 1675887849000, "val": 180}
]
```

Alternative folgende Attributnamen werden für `val` unterstützt: `value`, `v`, `data`, `y`.
Und Folgendes für `ts`: `time`, `t`, `date`.

Sie können Start und Start nicht in den Echarts-Einstellungen definieren. Start und Ende werden automatisch aus den Daten berechnet.
Auch eine Aggregation ist nicht möglich. Alle Manipulationen müssen durch Schreiben der JSON-Daten erfolgen.
Das Diagramm wird jedes Mal automatisch aktualisiert, wenn sich der Wert ändert.

### Serverseitiges Rendering
Sie können die Voreinstellungen auf dem Server rendern und als Base64-URL abrufen oder auf der Festplatte in der ioBroker-Datenbank speichern:

```
sendTo('echarts.0', {
    preset:   'echarts.0.myPreset', // the only mandatory attribute

    renderer: 'svg',                // svg | png | jpg | pdf, default: svg

    width: 1024,                    // default 1024
    height: 300,                    // default 300
    background: '#000000',          // Background color
    theme: 'light',                 // Theme type: 'light', 'dark'

    title: 'ioBroker Chart',        // Title of PDF document
    quality: 0.8,                   // quality of JPG
    compressionLevel: 3,            // Compression level of PNG
    filters: 8,                     // Filters of PNG (Bit combination https://github.com/Automattic/node-canvas/blob/master/types/index.d.ts#L10)

    fileOnDisk: '',                 // Path on disk to save the file.
    fileName: '',                   // Path in ioBroker DB to save the files on 'echarts.0'. E.g. if your set "chart.svg", so you can access your picture via http(s)://ip:8082/echarts.0/chart.png

    cache:    600,                  // Cache time for this preset in seconds, default: 0 - no cache
}, result => {
    if (result.error) {
        console.error(result.error);
    } else {
        console.log(result.data);
    }
});
```

**Achtung: Sie können Linien in der Legende auf Touch-Geräten mit aktiviertem Zoom nicht aktivieren/deaktivieren**

## Entwicklerhandbuch
**Für Nicht-Entwickler funktioniert dieser Link nicht!**

Sie können Ansichtsdiagramme lokal debuggen mit:

- CD iobroker.echarts/src-chart
- NPM-Laufstart
- Browser: http://localhost:8081/adapter/echarts/tab.html?dev=true

## Machen
- Widget für Vis (Button)
- Widget für Material
- Enum-Symbole in Ordnern oder in deren Nähe anzeigen

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 1.4.15 (2023-05-10)
* (bluefox) Allowed using the timestamp in seconds in JSON sources

### 1.4.14 (2023-04-20)
* (bluefox) Added support for the alternative names for JSON sources

### 1.4.13 (2023-03-14)
* (bluefox) Corrected some issues from GitHub

### 1.4.11 (2023-02-25)
* (bluefox) Booleans were improved

### 1.4.9 (2023-02-22)
* (bluefox) Allowed the disabling of texts for enums and the adding/deletion of own text values

### 1.4.7 (2023-02-22)
* (bluefox) Implemented custom texts for enums

### 1.4.6 (2023-02-16)
* (bluefox) Implemented custom texts for true and false values

### 1.4.5 (2023-02-16)
* (bluefox) Allowed copying only the web URLs in the preview
* (bluefox) Corrected boolean charts

### 1.4.3 (2023-02-15)
* (bluefox) Implemented charts preview

### 1.4.1 (2023-02-14)
* (bluefox) Corrected some issues from GitHub
* (bluefox) Implemented negative offset of X-Axis
* (bluefox) Show device names for charts

### 1.4.0 (2023-02-13)
* (bluefox) Added possibility to load the history data from JSON state.

### 1.3.4 (2023-02-08)
* (bluefox) Added a formula for the value conversion

### 1.3.3 (2023-02-08)
* (bluefox) Implemented bar chart

### 1.2.1 (2023-01-31)
* (bluefox) Changed german translation
* (bluefox) Added new positions for markings: inside, top, bottom

### 1.1.5 (2022-12-31)
* (bluefox) Refactoring and packages update done

### 1.1.3 (2022-12-01)
* (bluefox) Make all buttons smaller

### 1.1.1 (2022-08-23)
* (bluefox) Added preparations for vis2.0

### 1.1.0 (2022-07-05)
* (bluefox) Made it work with ioBroker cloud
* (bluefox) GUI migrated to mui5

### 1.0.10 (2022-06-20)
* (bluefox) Corrected the problem with `socket.io`

### 1.0.9 (2022-06-17)
* (bluefox) Added 2 weeks as a relative period

### 1.0.8 (2022-06-01)
* (bluefox) Added option `shift+mouse move` to scale Y axis

### 1.0.7 (2022-05-13)
* (bluefox) Added background to export image
* (bluefox) Added integral and percentile aggregate methods

### 1.0.5 (2022-02-16)
* (bluefox) Added "i" in tooltips by interpolated values

### 1.0.4 (2022-01-31)
* (bluefox) License changed to Apache-2.0 (because of apache/echarts)
* (bluefox) Updated some packages
* (bluefox) Added fast properties editor

### 1.0.3 (2021-07-21)
* (bluefox) Fixed server-side rendering

### 1.0.2 (2021-07-20)
* (bluefox) Fixed the communication with admin4

### 1.0.1 (2021-07-14)
* (bluefox) Fixed the "no background" option

### 1.0.0 (2021-07-02)
* (bluefox) Fixed many bugs

### 0.4.14 (2021-04-29)
* (bluefox) Fixed reorder of presets

### 0.4.13 (2021-03-27)
* (bluefox) Tried to sort the time series before displaying it

### 0.4.12 (2021-03-27)
* (bluefox) Added the support of parameters in URL

### 0.4.11 (2021-02-06)
* (bluefox) Fixed the dashed lines

### 0.4.10 (2020-12-22)
* (bluefox) Allow the hiding of lines at start and show them via legend later
* (bluefox) Use canvas renderer on touch devices to allow zoom and pan

### 0.4.9 (2020-12-21)
* (bluefox) Updated echarts to 5.0
* (bluefox) Implemented copy&paste of lines and markings
* (bluefox) Available vertical legend
* (bluefox) Allowed the hiding the interpolated values in tooltip

### 0.4.7 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.4.6 (2020-12-12)
* (bluefox) Allowed the same names in different folders

### 0.4.5 (2020-12-11)
* (bluefox) Some sentry errors were corrected.
* (bluefox) Added the possibility to show actual values in legend.

### 0.4.4 (2020-12-07)
* (bluefox) Some sentry errors were corrected.

### 0.4.2 (2020-11-29)
* (bluefox) Corrected the error with overflow of axis.

### 0.4.1 (2020-11-29)
* (bluefox) Disconnection errors are caught now.

### 0.4.0 (2020-11-28)
* (bluefox) Added new option: no background

### 0.3.9 (2020-11-28)
* (bluefox) Corrected error with the chart.

### 0.3.8 (2020-11-27)
* (bluefox) Implemented the conversion of the flot presets into echarts.

### 0.3.7 (2020-11-17)
* (bluefox) Hide nulls in hover details

### 0.3.6 (2020-11-13)
* (bluefox) The copy of charts is implemented

### 0.3.5 (2020-11-10)
* (bluefox) Corrected SENTRY errors

### 0.3.4 (2020-11-08)
* (bluefox) Corrected server-side rendering of PNG

### 0.3.1 (2020-10-31)
* (bluefox) Added the color of export button 
* (bluefox) The interpolated values are shown now
* (bluefox) Server-side rendering is implemented

### 0.2.1 (2020-10-25)
* (bluefox) GUI fixes

### 0.2.0 (2020-10-22)
* (bluefox) Implemented the grouping by the category.

### 0.1.2 (2020-10-21)
* (bluefox) Added support for multiple charts

### 0.1.1 (2020-10-21)
* (bluefox) initial release

## License
ioBroker.echarts is available under the Apache License V2.

Copyright (c) 2019-2023 bluefox <dogafox@gmail.com>

Apache ECharts
Copyright (c) 2017-2023 The Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).