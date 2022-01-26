---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.simple-api/README.md
title: Einfache-API
hash: txduiwaVbJHHCbM4ZG9+h/lYVF/17V9Qo6bz2ml5m9E=
---
![Logo](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)

![Anzahl der Installationen](http://iobroker.live/badges/simple-api-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.simple-api.svg)

# Simple-API
![Testen und freigeben](https://github.com/ioBroker/ioBroker.simple-api/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/simple-api/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dies ist eine RESTFul-Schnittstelle, um die Objekte und Zustände von ioBroker zu lesen und die Zustände über HTTP-Get/Post-Anfragen zu schreiben/zu steuern.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Verwendungszweck
Rufen Sie im Browser `http://ipaddress:8087/help` auf, um die Hilfe zur API zu erhalten. Das Ergebnis ist:

```
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID?json",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID&prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&prettyPrint"
}
```

### GetPlainValue
Rufen Sie z.B. an:

`http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive`

Ergebnis:

`true`

Zusätzlich können Sie mit dem Abfrageschlüssel `json` das Parsen des gespeicherten Wertes erzwingen:

`http://ipaddress:8087/getPlainValue/javascript.0.value?json`

Ergebnis:

`{"a":1}`

Und ohne `json` Flag wäre das Ergebnis

`"{\"a\": 1}"`

Ein weiteres nützliches Flag könnte auch verwendet werden, `noStringify`:

`http://ipaddress:8087/getPlainValue/javascript.0.stringValue?noStringify`

Ergebnis:

`VALUETEXT`

Und ohne `noStringify` Flag wäre das Ergebnis

`"VALUETEXT"`

### Werden
Rufen Sie z.B. an: `http://ipaddress:8087/get/system.adapter.admin.0.alive`

Ergebnis:

```
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

oder rufen Sie z.B. an:

```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

Ergebnis:

```
{
  "val": true,
  "ack": true,
  "ts": 1442432238,
  "from": "system.adapter.admin.0",
  "lc": 1442431190,
  "expire": 28494,
  "_id": "system.adapter.admin.0.alive",
  "type": "state",
  "common": {
    "name": "admin.0.alive",
    "type": "boolean",
    "role": "indicator.state"
  },
  "native": {}
}
```

### GetBulk
Erhalten Sie viele Zustände mit einer Anfrage, die als Array von Objekten in der Reihenfolge der Liste in der Anfrage und id/val/ts als Unterobjekt zurückgegeben wird

### Einstellen
Rufen Sie z.B. an:

```
http://ipaddress:8087/set/javascript.0.test?value=1
```

Ergebnis:

```
{"id":"javascript.0.test","value":1}
```

oder rufen Sie z.B. an:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint
```

Ergebnis:

```
{
  "id": "javascript.0.test",
  "value": 1
}
```

Natürlich muss der Datenpunkt `javascript.0.test` vorhanden sein.

Zusätzlich könnte die Art des Wertes definiert werden:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string
```

und ack-Flag könnte auch definiert werden:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true
```

### Umschalten
Schaltet den Wert um:

- Boolean: true => false, false => true
- Zahl ohne Grenzen: x => 100-x
- Zahl mit Grenzen: x => max - (x - min)

### SetBulk
Legen Sie viele Zustände mit einer Anfrage fest. Diese Anfrage unterstützt auch die POST-Methode, da POST-Daten im Hauptteil und nicht in der URL enthalten sein sollten.

### SetValueFromBody
Ermöglicht das Festlegen des Werts eines bestimmten Zustands durch den Inhalt des POST-Textkörpers.

### Objekte
### Zustände
### Suche
Ist in der Konfiguration eine Datenquelle (History, SQL) gesetzt, dann werden nur die der Datenquelle bekannten Datenpunkte aufgelistet.
Wenn die Option 'Alle Datenpunkte auflisten' aktiviert oder keine Datenquelle angegeben wurde, werden alle Datenpunkte aufgelistet.
Dieser Befehl wird für das Grafana JSON / SimpleJSON Plugin benötigt.

### Anfrage
Wenn eine Datenquelle (History, SQL) angegeben wurde, werden die Daten der angegebenen Datenpunkte für den angegebenen Zeitraum ausgelesen, ansonsten wird nur der aktuelle Wert ausgelesen.
Dieser Befehl wird für das Grafana JSON / SimpleJSON Plugin benötigt.

### Hilfe
Gibt [Dies](#usage) Ausgabe zurück

## Installieren
```node iobroker.js add simple-api```

## Verwendungszweck
Angenommen, wir haben keine Sicherheit und der Server läuft auf dem Standardport 8087.

Für alle Abfragen kann der Name oder die ID des Staates angegeben werden.

Für jede Anfrage, die JSON zurückgibt, können Sie den Parameter `prettyPrint` setzen, um die Ausgabe in menschenlesbarer Form zu erhalten.

Wenn die Authentifizierung aktiviert ist, sind zwei weitere Felder Pflichtfelder: `?user=admin&pass=iobroker`

### GetPlainValue
Zustandswert als Text lesen. Sie können weitere IDs durch Semikolon geteilt angeben

```http://ip:8087/getPlainValue/admin.0.memHeapTotal```

```
  31.19
```

```http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed```

```
  31.19
  17.52
```

### Werden
Zustands- und Objektdaten des Zustands als json lesen. Sie können weitere IDs durch Semikolon geteilt angeben.
Wenn mehr als eine ID angefordert wird, wird das JSON-Array zurückgegeben.

```http://localhost:8087/get/admin.0.memHeapTotal/?prettyPrint```

```
  {
    "val": 31.19,
    "ack": true,
    "ts": 1423154619,
    "from": "system.adapter.admin.0",
    "lc": 1423153989,
    "_id": "system.adapter.admin.0.memHeapTotal",
    "type": "state",
    "common": {
      "name": "admin.0.memHeapTotal",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  }
```

```http://ip:8087/get/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint```

```
  [
    {
      "val": 31.19,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423153989,
      "_id": "system.adapter.admin.0.memHeapTotal",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapTotal",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    },
    {
      "val": 16.25,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423154544,
      "_id": "system.adapter.admin.0.memHeapUsed",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapUsed",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    }
  ]
```

### GetBulk
Lesen Sie den Status von mehr IDs mit Zeitstempel. Sie können weitere IDs durch Semikolon geteilt angeben.
Das JSON-Array wird immer zurückgegeben.

```http://ip:8087/getBulk/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint```

```
  {
      "admin.0.memHeapTotal": {
          "val": 31.19,
          "ts": 1423154754
      },
      "admin.0.memHeapUsed": {
          "val": 15.6,
          "ts": 1423154754
      }
  }
```

### Einstellen
Schreiben Sie die Zustände mit den angegebenen IDs. Sie können die Option *wait* in Millisekunden angeben, um auf die Antwort vom Treiber zu warten.

```http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&prettyPrint```

```{
       "id": "hm-rpc.0.IEQ12345.LEVEL",
       "value": 1
     }
```

```http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&wait=5000&prettyPrint```

```{
       "val": 1,
       "ack": true,
       "ts": 1423155399,
       "from": "hm-rpc.0.IEQ12345.LEVEL",
       "lc": 1423155399
     }
```

Wenn innerhalb der angegebenen Zeit keine Antwort eingeht, wird der Wert `null` zurückgegeben.
Im ersten Fall wird die Antwort sofort zurückgegeben und `ack` ist falsch. Im zweiten Fall ist `ack` wahr. Das heißt, es war eine Antwort des Fahrers.

### SetBulk
- Schreiben Sie viele IDs in einer Anfrage.

```http://ip:8087/setBulk?hm-rpc.0.FEQ1234567:1.LEVEL=0.7&Anwesenheit=0&prettyPrint```

```
  [
    {
      "id": "hm-rpc.0.FEQ1234567:1.LEVEL",
      "val": "0.7"
    },
    {
      "error": "error: datapoint \"Anwesenheit\" not found"
    }
  ]
```

Sie können diese Anfrage auch als POST senden.

### Objekte
Rufen Sie die Liste aller Objekte für Muster ab. Wenn kein Muster angegeben ist, werden alle Objekte als JSON-Array zurückgegeben.

```http://ip:8087/objects?prettyPrint```

```
  {
  "system.adapter.admin.0.uptime": {
    "_id": "system.adapter.admin.0.uptime",
    "type": "state",
    "common": {
      "name": "admin.0.uptime",
      "type": "number",
      "role": "indicator.state",
      "unit": "seconds"
    },
    "native": {}
  },
  "system.adapter.admin.0.memRss": {
    "_id": "system.adapter.admin.0.memRss",
    "type": "state",
    "common": {
      "name": "admin.0.memRss",
      "desc": "Resident set size",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  },
  ...
```

Holen Sie sich alle Kontrollobjekte des Adapters system.adapter.admin.0:

```http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint```

```
    {
    "system.adapter.admin.0.uptime": {
      "_id": "system.adapter.admin.0.uptime",
      "type": "state",
      "common": {
        "name": "admin.0.uptime",
        "type": "number",
        "role": "indicator.state",
        "unit": "seconds"
      },
      "native": {}
    },
    ...

```

### Zustände
Rufen Sie die Liste aller Zustände für Muster ab. Wenn kein Muster angegeben ist, werden alle Zustände als JSON-Array zurückgegeben.

```http://ip:8087/states?prettyPrint```

```
  {
    "system.adapter.admin.0.uptime": {
      "val": 32176,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156164
    },
    "system.adapter.admin.0.memRss": {
      "val": 41.14,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156119
    },
    "system.adapter.admin.0.memHeapTotal": {
      "val": 31.19,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423155084
    },
  ...
```

Holen Sie sich alle Kontrollobjekte des Adapters system.adapter.admin.0:

```http://ip:8087/states?pattern=system.adapter.admin.0*&prettyPrint```

```
    {
      "system.adapter.admin.0.uptime": {
        "val": 32161,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.memRss": {
        "val": 41.14,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156119
      },
      "system.adapter.admin.0.memHeapTotal": {
        "val": 31.19,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423155084
      },
      "system.adapter.admin.0.memHeapUsed": {
        "val": 19.07,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.connected": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28100
      },
      "system.adapter.admin.0.alive": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28115
      }
    }
```

### Suche
Ist in der Konfiguration eine Datenquelle (History, SQL) gesetzt, dann werden nur die der Datenquelle bekannten Datenpunkte aufgelistet.
Wenn die Option 'Alle Datenpunkte auflisten' aktiviert oder keine Datenquelle angegeben wurde, werden alle Datenpunkte aufgelistet.

```
http://ip:8087/search?pattern=system.adapter.admin.0*&prettyPrint
```

```
  {
    "system.adapter.admin.0.outputCount",
    "system.adapter.admin.0.inputCount",
    "system.adapter.admin.0.uptime",
    "system.adapter.admin.0.memRss",
    "system.adapter.admin.0.memHeapTotal",
    "system.adapter.admin.0.memHeapUsed",
    "system.adapter.admin.0.cputime",
    "system.adapter.admin.0.cpu",
    "system.adapter.admin.0.connected",
    "system.adapter.admin.0.alive"
  }
```

### Anfrage
Wenn eine Datenquelle (History, SQL) angegeben wurde, werden die Daten der angegebenen Datenpunkte für den angegebenen Zeitraum ausgelesen.

```http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&dateFrom=2019-06-08T01:00:00.000Z&dateTo=2019-06-08T01:00:10.000Z```

```
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.12,
          1559955600000
        ],
        [
          0.46,
          1559955601975
        ],
        [
          0.44,
          1559955610000
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          23.01,
          1559955600000
        ],
        [
          22.66,
          1559955601975
        ],
        [
          22.69,
          1559955610000
        ]
      ]
    }
  ]
```

Wurde keine Datenquelle angegeben oder der Parameter noHistory übergeben, wird nur der aktuelle Wert des Datenpunkts ausgelesen.

```http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&noHistory=true```

```
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.58,
          1559970500342
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          21.53,
          1559970500342
        ]
      ]
    }
  ]
```

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog
### 2.6.2 (2021-11-12)
* (bluefox) Support of new flags for `getPlainValue`: `json` and `noStringify`

### 2.6.1 (2021-05-13)
* (Apollon77) Catch error in request parsing when malformed (Sentry IOBROKER-SIMPLE-API-16)

### 2.6.0 (2021-05-09)
* (Apollon77) Also URL-Decode the path parts like state ids
* (Apollon77) Optimize for js-controller 3.3

### 2.5.3 (2021-01-25)
* (Apollon77) Make sure that delayed answers are not crashing (Sentry IOBROKER-SIMPLE-API-Z)

### 2.5.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 2.4.8 (2020-09-17)
* (Apollon77) Make sure missing favico file locally is not throwing exceptions (Sentry IOBROKER-SIMPLE-API-G)

### 2.4.7 (2020-08-17)
* (Apollon77) check that targets are an array for "query" requests (Sentry IOBROKER-SIMPLE-API-F)

### 2.4.6 (2020-06-11)
* (Apollon77) Make sure adapter is showing correct error when webserver can not be initialized (Sentry IOBROKER-SIMPLE-API-7)

### 2.4.5 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with imvalid certificates

### 2.4.4 (2020-05-02)
* (Apollon77) Make sure Permission errors do not crash adapter (Sentry IOBROKER-SIMPLE-API-3)

### 2.4.3 (2020-04-30)
* (Apollon77) Optimize web server error handling

### 2.4.1 (2020-04-23)
* (bluefox) Caught the web server errors

### 2.4.0 (2020-04-12)
* (Apollon77) Add Sentry support with js-controller 3.0
* (Apollon77) fix potential crash

### 2.3.3 (2019-11-16)
* (bluefox) Added response code for unknown commands

### 2.3.2 (2019-10-18)
* (Apollon77) Fix Admin 3 support

### 2.3.1 (2019-10-12)
* (bluefox) Admin 3 is now supported
* (bluefox) NPM packages were updated

### 2.2.0 (2019-09-10)
* (bluefox) New flags are supported: ack and type
* (bluefox) Return error codes as JSON if no pretty print defined

### 2.1.2 (2019-09-05)
* (Apollon77) fix compact mode

### 2.1.0 (2019-07-05)
* (Marco.K) Added command set for the Grafana plugins JSON / SimpleJSON. Usage see https://forum.iobroker.net/topic/23033/aufruf-modifikation-simpleapi-adapter-iobroker-als-datenquelle-f%C3%BCr-grafana

### 2.0.5 (2019-06-26)
* (Apollon77) remove logging

### 2.0.4 (2019-06-23)
* (Apollon77) fix usage as web extension

### 2.0.2 (2018-12-17)
* (Apollon77) fix decoding for state Ids with # in it

### 2.0.0 (2018-06-29)
* (Giermann) BREAKING CHANGE: getBulk is returning data in a different structure

### 1.6.3 (2018-04-15)
* (Apollon77) Return used character encoding (UTF-8)

### 1.6.2 (2017-11-27)
* (Apollon77) Fix decoding problems

### 1.6.1 (2017-09-25)
* (Apollon77) Fix statuscode for setBulk and optimize permission errors

### 1.6.0 (2017-07-10)
* (Apollon77) Fix handling of URL-encoded values, they are now decoded properly
* (Apollon77) Optimize Permission handling
* (Apollon77) add possibility to only allow access to states where user is also owner, finally works correct with js-controller 1.1.1!

### 1.5.0 (2017-03-10)
* (greyhound) Add new POST method setValueFromBody

### 1.4.0 (2017-01-05)
* (bluefox) new web server plugin support

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.1.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.1.0 (2016-02-09)
* (bluefox) fix toggle, objects, states, setBulk, POST
* (bluefox) add tests

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.1.2 (2015-06-28)
* (bluefox) add description in readme.md
* (bluefox) change "toggle" for boolean and numbers

### 0.1.1 (2015-06-28)
* (bluefox) change setForeignState api
* (bluefox) add type to io-package.json
* (bluefox) enable run from "web"
* (bluefox) add default user

### 0.1.0 (2015-06-10)
* (bluefox) change setForeignState api
* (bluefox) support of user permissions

### 0.0.4 (2015-03-11)
* (bluefox) remove socket.io from file

### 0.0.3 (2015-02-13)
* (bluefox) remove socket.io from dependencies

### 0.0.2 (2015-02-12)
* (bluefox) enable be a part of "web"

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2021 bluefox <dogafox@gmail.com>

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