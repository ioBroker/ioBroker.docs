---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.echarts/README.md
title: ioBroker.echarts
hash: adErFx29GS51MtHt4t3z63MRU+ojFpcIH8aJxYJ3KgQ=
---
![Logo](../../../en/adapterref/iobroker.echarts/admin/echarts.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.echarts.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.echarts.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.echarts.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.echarts/badge.svg)

# IoBroker.echarts
## ECharts-Adapter für ioBroker
Erstellen Sie nützliche Diagramme in ioBroker:

![Bildschirmfoto](../../../en/adapterref/iobroker.echarts/img/screenshot1.png)

## Verwendungszweck
Nach dem Neustart den Tab im Admin hinzufügen: ![Administrator](../../../en/adapterref/iobroker.echarts/img/admin.png)

Auf die erstellte Voreinstellung kann auch im Webadapter zugegriffen werden. URL: `http://IP:8082/echarts/index.html?preset=echarts.0.PRESETID`.

Für vis gibt es ein spezielles Widget mit einfacher Auswahl von Voreinstellungen.

### Kurzinfo
Der Kleinbuchstabe `i` gibt an, dass der Wert aus den 2 Nachbarwerten interpoliert wurde und zu diesem Zeitstempel nicht existiert.

![Kurzinfo](../../../en/adapterref/iobroker.echarts/img/tooltip.png)

### Serverseitiges Rendern
Sie können die Voreinstellungen auf dem Server rendern und als base64-URL abrufen oder auf der Festplatte in der ioBroker-DB speichern:

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

- cd iobroker.echarts/src-chart
- npm-Lauf starten
- Browser: http://localhost:8081/adapter/echarts/tab.html?dev=true

## Machen
- Widget für vis (Schaltfläche)
- Widget für Material
- Aufzählungssymbole in Ordnern oder in der Nähe anzeigen

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Added background to export image

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
* (bluefox) Added support of multiple charts

### 0.1.1 (2020-10-21)
* (bluefox) initial release

## License
ioBroker.echarts is available under the Apache License V2.

Copyright (c) 2019-2022 bluefox <dogafox@gmail.com>

Apache ECharts
Copyright (c) 2017-2022 The Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).