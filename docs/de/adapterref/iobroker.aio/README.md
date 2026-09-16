---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.aio/README.md
title: ioBroker.aio
hash: hxdApo1x+ruDwJurq3aDkiOCckP+6qwXENcy7+tGAns=
---
![Logo](../../../en/adapterref/iobroker.aio/admin/aio.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.aio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.aio.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/aio-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/aio-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Newan/iobroker.aio.svg)
![NPM](https://nodei.co/npm/iobroker.aio.png?downloads=true)
![Test und Freigabe](https://github.com/Newan/ioBroker.aio/workflows/Test%20and%20Release/badge.svg)

# ioBroker.aio

## AIO-Adapter für ioBroker

Werte vom Hansol Technics AIO-System auslesen

## Hilfe Konfiguration

Fügen Sie die IP-Adresse Ihres Wechselrichters in der Konfiguration hinzu. Der Adapter generiert anhand der angegebenen IP-Adresse (IHRE\_IP\_HIER) die folgende URL: http\://IHRE\_IP\_HIER/R3EMSAPP\_REAL.ems?file=ESSRealtimeStatus.json

## Testkonfiguration

Öffnen Sie die URL http\://IHRE\_IP\_HIER/R3EMSAPP\_REAL.ems?file=ESSRealtimeStatus.json in Ihrem Browser. Die Ausgabe sollte eine JSON-Zeichenkette wie die folgende sein:

```javascript
{
    "ESSRealtimeStatus":{
        "ColecTm":"00000000000000",
        "PowerOutletPw":"0",
        "GridPw":0.00,
        "UnitPrice":0.00,
        "ConsPw":0.00,
        "BtSoc":0,
        "PcsPw":0.00,
        "AbsPcsPw":0.00,
        "PvPw":0.00,
        "GridStusCd":"0",
        "BtStusCd":"0",
        "BtPw":0.00,
        "OperStusCd":"0",
        "EmsOpMode":"0",
        "RankPer":0,
        "ErrorCnt":0
    }
}
```

## Changelog
### 0.1.1
* (Newan) add new object states

### 0.1.0
* (Newan) add weather infos

### 0.0.2
* (Newan) add typescript / react - bug fixes object types

### 0.0.1
* (Newan) initial release

## License
MIT License

Copyright (c) 2021 Newan <info@newan.de>

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