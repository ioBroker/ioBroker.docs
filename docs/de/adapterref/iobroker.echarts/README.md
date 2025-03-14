---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.echarts/README.md
title: ioBroker.echarts
hash: USV0DtM4cmKWURgsttOjXnQjTRgXrKtJOXVavTdefNk=
---
![Logo](../../../en/adapterref/iobroker.echarts/admin/echarts.png)

![Anzahl der Installationen](http://iobroker.live/badges/echarts-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.echarts.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.echarts.svg)

# IoBroker.echarts
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.echarts/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Echarts-Adapter für ioBroker
Erstellen Sie nützliche Diagramme in ioBroker:

![Screenshot](../../../en/adapterref/iobroker.echarts/img/screenshot1.png)

![Barren](../../../en/adapterref/iobroker.echarts/img/bars.png)

![Radar](../../../en/adapterref/iobroker.echarts/img/radar.png) Verwenden Sie die Aggregation „Tatsächlicher Wert“ für das prognostizierte Ergebnis.

## Verwendung
Füge nach dem Neustart den Reiter im Admin hinzu: ![Verwaltung](../../../en/adapterref/iobroker.echarts/img/admin.png)

Auf die erstellte Voreinstellung kann auch im Webadapter zugegriffen werden. URL: `http://IP:8082/echarts/index.html?preset=echarts.0.PRESETID`.

Für `vis` gibt es ein spezielles Widget mit einfacher Auswahl von Voreinstellungen.

### Tooltip
Kleingeschriebene `i` zeigen an, dass der Wert aus den beiden Nachbarwerten interpoliert wurde und zu diesem Zeitstempel nicht existiert.

![Tooltip](../../../en/adapterref/iobroker.echarts/img/tooltip.png)

### Daten aus JSON
Sie können die Datenquelle aus JSON definieren. In diesem Fall können Sie einen benutzerdefinierten Status vom Typ `json` erstellen und den Wert wie folgt speichern:

```json
[
    { "ts": 1675887847000, "val": 45 },
    { "ts": 1675887848000, "val": 77 },
    { "ts": 1675887849000, "val": 180 }
]
```

Für `val` werden folgende alternative Attributnamen unterstützt: `value`, `v`, `data`, `y`.
Und für `ts`: `time`, `t`, `date`.

In den eCharts-Einstellungen können Sie Start und Ende nicht definieren. Start und Ende werden automatisch aus den Daten berechnet.
Auch eine Aggregation ist nicht möglich. Alle Manipulationen müssen durch Schreiben der JSON-Daten erfolgen.
Das Diagramm wird bei jeder Wertänderung automatisch aktualisiert.

### Serverseitiges Rendering
Sie können die Voreinstellungen auf dem Server rendern und sie als Base64-URL abrufen oder auf der Festplatte in der ioBroker-Datenbank speichern:

```js
sendTo(
    'echarts.0',
    {
        preset: 'echarts.0.myPreset', // the only mandatory attribute

        renderer: 'svg', // svg | png | jpg | pdf, default: svg

        width: 1024, // default 1024
        height: 300, // default 300
        background: '#000000', // Background color
        theme: 'light', // Theme type: 'light', 'dark'

        title: 'ioBroker Chart', // Title of PDF document
        quality: 0.8, // quality of JPG
        compressionLevel: 3, // Compression level of PNG
        filters: 8, // Filters of PNG (Bit combination https://github.com/Automattic/node-canvas/blob/master/types/index.d.ts#L10)

        fileOnDisk: '', // Path on disk to save the file.
        fileName: '', // Path in ioBroker DB to save the files on 'echarts.0'. E.g. if your set "chart.svg", so you can access your picture via http(s)://ip:8082/echarts.0/chart.png

        cache: 600, // Cache time for this preset in seconds, default: 0 - no cache
    },
    result => {
        if (result.error) {
            console.error(result.error);
        } else {
            console.log(result.data);
        }
    },
);
```

**Achtung: Sie können Linien in der Legende auf Touch-Geräten mit aktiviertem Zoom nicht aktivieren/deaktivieren**

## Entwicklerhandbuch
**Für Nicht-Entwickler funktioniert dieser Link nicht!**

Sie können Ansichtsdiagramme lokal debuggen mit:

- cd iobroker.echarts/src-chart
- npm-Ausführung starten
- Browser: http://localhost:8081/adapter/echarts/tab.html?dev=true

## Aufgaben
- Widget für Vis (Schaltfläche)
- Enumerationssymbole auf Ordnern oder in deren Nähe anzeigen

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 2.0.0 (2025-01-05)

- (@GermanBluefox) Project was completely rewritten with TypeScript
- (@GermanBluefox) Better mobile layouts added

### 1.9.5 (2024-12-20)

- (@GermanBluefox) Convert actual values with provided "convert" function too

### 1.9.2 (2024-09-10)

- (@GermanBluefox) Fixed polar and bar charts

### 1.9.0 (2024-08-06)

- (@GermanBluefox) upgraded packages
- (@GermanBluefox) removed `withStyles`

### 1.8.4 (2024-06-21)

- (foxriver76) upgraded dependencies

### 1.8.0 (2024-02-03)

- (@GermanBluefox) Added the radar (polar) chart type

### 1.7.2 (2023-11-20)

- (@GermanBluefox) Added option to hide the value in the future

### 1.7.1 (2023-11-16)

- (@GermanBluefox) Added X-Label offset
- (@GermanBluefox) Corrected icons in the object selection dialog

### 1.6.1 (2023-11-08)

- (@GermanBluefox) Added vis-2 widget

### 1.5.4 (2023-09-13)

- (@GermanBluefox) Added an option to the export dialog: select / unselect all
- (@GermanBluefox) Added the availability to show legend as dialog

### 1.5.3 (2023-09-12)

- (@GermanBluefox) Added an option to reset zoom and tilt after X seconds of idle

### 1.5.1 (2023-06-14)

- (@GermanBluefox) Error handling in JSON data was improved

### 1.5.0 (2023-05-17)

- (@GermanBluefox) Implemented raw data export

### 1.4.15 (2023-05-10)

- (@GermanBluefox) Allowed using the timestamp in seconds in JSON sources

### 1.4.14 (2023-04-20)

- (@GermanBluefox) Added support for the alternative names for JSON sources

### 1.4.13 (2023-03-14)

- (@GermanBluefox) Corrected some issues from GitHub

### 1.4.11 (2023-02-25)

- (@GermanBluefox) Booleans were improved

### 1.4.9 (2023-02-22)

- (@GermanBluefox) Allowed the disabling of texts for enums and the adding/deletion of own text values

### 1.4.7 (2023-02-22)

- (@GermanBluefox) Implemented custom texts for enums

### 1.4.6 (2023-02-16)

- (@GermanBluefox) Implemented custom texts for true and false values

### 1.4.5 (2023-02-16)

- (@GermanBluefox) Allowed copying only the web URLs in the preview
- (@GermanBluefox) Corrected boolean charts

### 1.4.3 (2023-02-15)

- (@GermanBluefox) Implemented charts preview

### 1.4.1 (2023-02-14)

- (@GermanBluefox) Corrected some issues from GitHub
- (@GermanBluefox) Implemented negative offset of X-Axis
- (@GermanBluefox) Show device names for charts

### 1.4.0 (2023-02-13)

- (@GermanBluefox) Added possibility to load the history data from JSON state.

### 1.3.4 (2023-02-08)

- (@GermanBluefox) Added a formula for the value conversion

### 1.3.3 (2023-02-08)

- (@GermanBluefox) Implemented bar chart

### 1.2.1 (2023-01-31)

- (@GermanBluefox) Changed german translation
- (@GermanBluefox) Added new positions for markings: inside, top, bottom

### 1.1.5 (2022-12-31)

- (@GermanBluefox) Refactoring and packages update done

### 1.1.3 (2022-12-01)

- (@GermanBluefox) Make all buttons smaller

### 1.1.1 (2022-08-23)

- (@GermanBluefox) Added preparations for vis2.0

### 1.1.0 (2022-07-05)

- (@GermanBluefox) Made it work with ioBroker cloud
- (@GermanBluefox) GUI migrated to mui5

### 1.0.10 (2022-06-20)

- (@GermanBluefox) Corrected the problem with `socket.io`

### 1.0.9 (2022-06-17)

- (@GermanBluefox) Added 2 weeks as a relative period

### 1.0.8 (2022-06-01)

- (@GermanBluefox) Added option `shift+mouse move` to scale Y axis

### 1.0.7 (2022-05-13)

- (@GermanBluefox) Added background to export image
- (@GermanBluefox) Added integral and percentile aggregate methods

### 1.0.5 (2022-02-16)

- (@GermanBluefox) Added "i" in tooltips by interpolated values

### 1.0.4 (2022-01-31)

- (@GermanBluefox) License changed to Apache-2.0 (because of apache/echarts)
- (@GermanBluefox) Updated some packages
- (@GermanBluefox) Added fast properties editor

### 1.0.3 (2021-07-21)

- (@GermanBluefox) Fixed server-side rendering

### 1.0.2 (2021-07-20)

- (@GermanBluefox) Fixed the communication with admin4

### 1.0.1 (2021-07-14)

- (@GermanBluefox) Fixed the "no background" option

### 1.0.0 (2021-07-02)

- (@GermanBluefox) Fixed many bugs

### 0.4.14 (2021-04-29)

- (@GermanBluefox) Fixed reorder of presets

### 0.4.13 (2021-03-27)

- (@GermanBluefox) Tried to sort the time series before displaying it

### 0.4.12 (2021-03-27)

- (@GermanBluefox) Added the support of parameters in URL

### 0.4.11 (2021-02-06)

- (@GermanBluefox) Fixed the dashed lines

### 0.4.10 (2020-12-22)

- (@GermanBluefox) Allow the hiding of lines at start and show them via legend later
- (@GermanBluefox) Use canvas renderer on touch devices to allow zoom and pan

### 0.4.9 (2020-12-21)

- (@GermanBluefox) Updated echarts to 5.0
- (@GermanBluefox) Implemented copy&paste of lines and markings
- (@GermanBluefox) Available vertical legend
- (@GermanBluefox) Allowed the hiding the interpolated values in tooltip

### 0.4.7 (2020-12-13)

- (@GermanBluefox) Updated the select ID dialog

### 0.4.6 (2020-12-12)

- (@GermanBluefox) Allowed the same names in different folders

### 0.4.5 (2020-12-11)

- (@GermanBluefox) Some sentry errors were corrected.
- (@GermanBluefox) Added the possibility to show actual values in legend.

### 0.4.4 (2020-12-07)

- (@GermanBluefox) Some sentry errors were corrected.

### 0.4.2 (2020-11-29)

- (@GermanBluefox) Corrected the error with overflow of axis.

### 0.4.1 (2020-11-29)

- (@GermanBluefox) Disconnection errors are caught now.

### 0.4.0 (2020-11-28)

- (@GermanBluefox) Added new option: no background

### 0.3.9 (2020-11-28)

- (@GermanBluefox) Corrected error with the chart.

### 0.3.8 (2020-11-27)

- (@GermanBluefox) Implemented the conversion of the flot presets into echarts.

### 0.3.7 (2020-11-17)

- (@GermanBluefox) Hide nulls in hover details

### 0.3.6 (2020-11-13)

- (@GermanBluefox) The copy of charts is implemented

### 0.3.5 (2020-11-10)

- (@GermanBluefox) Corrected SENTRY errors

### 0.3.4 (2020-11-08)

- (@GermanBluefox) Corrected server-side rendering of PNG

### 0.3.1 (2020-10-31)

- (@GermanBluefox) Added the color of export button
- (@GermanBluefox) The interpolated values are shown now
- (@GermanBluefox) Server-side rendering is implemented

### 0.2.1 (2020-10-25)

- (@GermanBluefox) GUI fixes

### 0.2.0 (2020-10-22)

- (@GermanBluefox) Implemented the grouping by the category.

### 0.1.2 (2020-10-21)

- (@GermanBluefox) Added support for multiple charts

### 0.1.1 (2020-10-21)

- (@GermanBluefox) initial release

## License

ioBroker.echarts is available under the Apache License V2.

Copyright (c) 2019-2025 @GermanBluefox <dogafox@gmail.com>

Apache ECharts
Copyright (c) 2017-2025 The Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).