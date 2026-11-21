---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.simple-api/README.md
title: Simple-API
hash: FwlAK09o12Ezzmeo8HK4/skFuqh9J+X9pEQfZ/HbM0o=
---
![Anzahl der Installationen](https://iobroker.live/badges/simple-api-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.simple-api.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.simple-api/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/simple-api/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.simple-api.svg)

<img src="admin/simple-api.svg" width="100" height="100" />

# Simple-API

Dies ist eine RESTful-Schnittstelle zum Lesen der Objekte und Zustände von ioBroker und zum Schreiben/Steuern der Zustände über HTTP-Get/Post-Anfragen.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Besser nutzen[`ioBroker.rest-api`](https://github.com/ioBroker/ioBroker.rest-api) anstelle dieses Adapters.**

## Verwendung

Aufruf im Browser `http://ipaddress:8087/help` Um Hilfe zur API zu erhalten. Das Ergebnis lautet:

```json
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID?json",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID?prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint",
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&aggregate=minmax&count=2000&prettyPrint"
}
```

### getPlainValue

Anrufbeispiel:

`http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive`

Ergebnis:

`true`

Zusätzlich können Sie einen Abfrageschlüssel verwenden. `json` um das Parsen des gespeicherten Werts zu erzwingen:

`http://ipaddress:8087/getPlainValue/javascript.0.value?json`

Ergebnis:

`{"a":1}`

Und ohne `json` Das Ergebnis wäre

`"{\"a\": 1}"`

Eine weitere nützliche Flagge könnte ebenfalls verwendet werden. `noStringify`:

`http://ipaddress:8087/getPlainValue/javascript.0.stringValue?noStringify`

Ergebnis:

`VALUETEXT`

Und ohne `noStringify` Das Ergebnis wäre

`"VALUETEXT"`

### erhalten

Anrufbeispiel: `http://ipaddress:8087/get/system.adapter.admin.0.alive`

Ergebnis:

```json
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

oder rufen Sie z.B. an:

```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

Ergebnis:

```json
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

### getBulk

Mehrere Zustände mit einer Anfrage abrufen, zurückgegeben als Array von Objekten in der Reihenfolge einer Liste in der Anfrage und id/val/ts als Unterobjekt.

### Satz

Anrufbeispiel: `http://ipaddress:8087/set/javascript.0.test?value=1`

Ergebnis:

```json
{"id":"javascript.0.test","value":1}
```

oder rufen Sie z.B. an: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint`

Ergebnis:

```json
{
  "id": "javascript.0.test",
  "value": 1
}
```

Natürlich der Datenpunkt `javascript.0.test` muss existieren.

Darüber hinaus könnte der Werttyp definiert werden: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string`

und es könnte auch ein Bestätigungsflag definiert werden: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true`

### Umschalten

Schaltet den Wert um:

- boolescher Wert: true => false, false => true
- Zahl ohne Grenzen: x => 100-x
- Zahl mit Grenzen: x => max - (x - min)

### setBulk

Mehrere Zustände können mit einer einzigen Anfrage festgelegt werden. Diese Anfrage unterstützt auch die POST-Methode; die POST-Daten müssen sich im Anfragetext und nicht in der URL befinden.

Die Werte werden in den Datentyp des Datenpunkts konvertiert (`common.type`): ein Zahlenzustand erhält `21` aus `21.0` oder `21,0` und ein String-Zustand behält den Text unverändert bei, z. B. `1.10` Die

### setValueFromBody

Mit diesem Befehl kann der Wert eines bestimmten Zustands durch den Inhalt des POST-Bodys festgelegt werden.

Anrufbeispiel: `http://ipaddress:8087/setValueFromBody/0_userdata.0.example_state` mit Körper `hello` Wo `0_userdata.0.example_state` ist die Kennung des Staates.

Der Body wird unverändert übernommen, unabhängig von seinem Inhaltstyp, und in den Typ des Datenpunkts konvertiert, beispielsweise mit `setBulk` Die

### Objekte

Objekte eines definierten Typs aus der Datenbank lesen.

Anrufbeispiel: `http://ipaddress:8087/objects?pattern=enum.*&type=enum` - alle Enumerationen lesen

oder

`http://ipaddress:8087/objects?pattern=system.adapter.admin.0.*` - alle Zustände im Zweig lesen `system.adapter.admin.0`

### Staaten

### suchen

Wenn in der Konfiguration eine Datenquelle (Verlauf, SQL) festgelegt ist, werden nur die dieser Datenquelle bekannten Datenpunkte aufgelistet. Ist die Option „Alle Datenpunkte auflisten“ aktiviert oder wurde keine Datenquelle angegeben, werden alle Datenpunkte angezeigt. Dieser Befehl wird für das Grafana JSON-/SimpleJSON-Plugin benötigt.

### Abfrage

Wenn in der Instanzkonfiguration eine Datenquelle (Verlauf, SQL) angegeben wurde, werden die Daten der angegebenen Datenpunkte für den angegebenen Zeitraum ausgelesen; andernfalls wird nur der aktuelle Wert ausgelesen. Dieser Befehl wird für das Grafana JSON-/SimpleJSON-Plugin benötigt.

### helfen

Gibt [diese](#usage) Ausgabe zurück

## Verwendung

Angenommen, wir haben keine Sicherheitsvorkehrungen getroffen und der Server läuft auf dem Standardport 8087.

Bei allen Anfragen kann der Name oder die ID des Bundeslandes angegeben werden.

Für jede Anfrage, die JSON zurückgibt, können Sie einen Parameter festlegen. `prettyPrint` um die Ausgabe in einer für Menschen lesbaren Form zu erhalten.

Wenn die Authentifizierung aktiviert ist, sind zwei weitere Felder obligatorisch: `?user=admin&pass=iobroker`

### getPlainValue

Lesen Sie den Statuswert als Text. Sie können mehrere IDs durch Semikolon getrennt angeben.

`http://ip:8087/getPlainValue/admin.0.memHeapTotal` =>`31.19`

`http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed` =>

```
  31.19
  17.52
```

### erhalten

Zustands- und Objektdaten werden als JSON gelesen. Sie können mehrere IDs durch Semikolon getrennt angeben. Bei Anforderung mehrerer IDs wird ein JSON-Array zurückgegeben.

`http://localhost:8087/get/admin.0.memHeapTotal/?prettyPrint` =>

```json
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

`http://ip:8087/get/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint` =>

```json
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

### getBulk

Lesen Sie die Zustände mehrerer IDs mit Zeitstempel. Sie können mehrere IDs durch Semikolon getrennt angeben. Es wird immer ein JSON-Array zurückgegeben.

`http://ip:8087/getBulk/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint` =>

```json
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

### Satz

Schreiben Sie die Zustände mit den angegebenen IDs. Sie können die _Wartezeit_ in Millisekunden angeben, um auf eine Antwort vom Treiber zu warten.

`http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&prettyPrint` =>

```json
{
       "id": "hm-rpc.0.IEQ12345.LEVEL",
       "value": 1
     }
```

`http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&wait=5000&prettyPrint` =>

```json
{
       "val": 1,
       "ack": true,
       "ts": 1423155399,
       "from": "hm-rpc.0.IEQ12345.LEVEL",
       "lc": 1423155399
     }
```

Wenn innerhalb der vorgegebenen Zeit keine Antwort eingeht, `null` Es wird ein Wert zurückgegeben. Im ersten Fall wird die Antwort sofort zurückgegeben. `ack` ist falsch. Im zweiten Fall `ack` Das stimmt. Das bedeutet, es war eine Reaktion des Fahrers.

### setBulk

- Die meisten IDs in einer einzigen Anfrage senden.

`http://ip:8087/setBulk?hm-rpc.0.FEQ1234567:1.LEVEL=0.7&Anwesenheit=0&prettyPrint` =>

```json
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

Sie können diese Anfrage auch als POST-Anfrage senden. Bitte verwenden Sie den Inhaltstyp. `text/plain` und fügen Sie die Daten in den Textkörper ein.

### Objekte

Gibt die Liste aller Objekte zurück, die einem bestimmten Muster entsprechen. Wird kein Muster angegeben, werden alle Objekte als JSON-Array zurückgegeben.

`http://ip:8087/objects?prettyPrint` =>

```json
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

Alle Steuerungsobjekte des Adapters system.adapter.admin.0 abrufen: `http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
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

### Staaten

Gibt die Liste aller Bundesstaaten für ein bestimmtes Muster zurück. Wird kein Muster angegeben, werden alle Bundesstaaten als JSON-Array zurückgegeben.

`http://ip:8087/states?prettyPrint` =>

```json
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

Alle Steuerungsobjekte des Adapters system.adapter.admin.0 abrufen:

`http://ip:8087/states?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
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

### suchen

Wenn in der Konfiguration eine Datenquelle (Verlauf, SQL) festgelegt ist, werden nur die dieser Datenquelle bekannten Datenpunkte aufgelistet. Ist die Option „Alle Datenpunkte auflisten“ aktiviert oder wurde keine Datenquelle angegeben, werden alle Datenpunkte aufgelistet.

`http://ip:8087/search?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
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

### Abfrage

Wenn eine Datenquelle (Historie, SQL) angegeben wird, werden Daten von den angegebenen Datenpunkten für den angegebenen Zeitraum abgerufen.

`http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&dateFrom=2019-06-08T01:00:00.000Z&dateTo=2019-06-08T01:00:10.000Z` =>

```json
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

Wenn keine Datenquelle angegeben wurde oder der Parameter noHistory übergeben wird, wird nur der aktuelle Wert des Datenpunkts ausgelesen.

`http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&noHistory=true` =>

```json
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

Sie können in der Abfrage relative Zeitangaben verwenden. Zum Beispiel: `dateFrom=-1h` oder `dateTo=today` Die

Folgende relative Muster werden unterstützt:

- `hour` oder `thisHour` oder `this hour` - Beginn der aktuellen Stunde
- `last hour` oder `lastHour` - Beginn der vorherigen Stunde
- `today` - Beginn des heutigen Tages
- `yesterday` - Beginn des Vortages
- `week` oder `thisWeek` oder `this week` - Beginn der aktuellen Woche
- `lastWeek` oder `last week` - Beginn der Vorwoche
- `month` oder `thisMonth` oder `this month` - Beginn des laufenden Monats
- `lastMonth` oder `last month` - Anfang des Vormonats
- `year` oder `thisYear` oder `this year` - Beginn des laufenden Jahres
- `lastYear` oder `last year` - Beginn des Vorjahres
- `-Nd` - vor N Tagen
- `-NM` - vor N Monaten
- `-Ny` - vor N Jahren
- `-Nh` - vor N Stunden
- `-Nm` - vor N Minuten
- `-Ns` - vor N Sekunden

## CORS

Mit der Option „Ursprung zulassen (CORS)“ können Sie die `Access-Control-Allow-Origin` Header, um Anfragen von anderen Domains zu ermöglichen.

Wenn Sie das Feld leer lassen, wird die Kopfzeile nicht festgelegt.

## Modifikatoren

Sie können einige Optionen nutzen, um die Antwort zu ändern:

- `prettyPrint` - um die Ausgabe in einer für Menschen lesbaren Form zu erhalten
- `json` - um das Parsen des Wertes im `getPlainValue` Befehl
- `timeRFC3339` - um die Zeit von Zeitstempeln zu erhalten (`ts` Und `lc`) im RFC3339-Format, wie `2019-06-08T01:00:00.000Z`
- `callback` - Antwort im JSONP-Format. `callback=<CALLBACK>` Die `CALLBACK` ist der Name der Callback-Funktion

## Authentifizierung

Dieser Adapter unterstützt die folgenden Authentifizierungstypen:

- Abfrageparameter `user` Und `pass`
- Basisauthentifizierung
- Der OAuth2-Bearer-Token befindet sich im Header. Weitere Informationen zum Abrufen von Tokens finden Sie im Webadapter.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.0.4 (2026-11-06)
- (@GermanBluefox) Admin 7.6.20 or newer is required now

### 4.0.3 (2026-11-06)
- (@GermanBluefox) Admin 7.6.17 or newer is required now
- (@GermanBluefox) The adapter does not call `process.exit()` anymore, which would stop the whole host in compact mode
- (@GermanBluefox) Added the missing sizes and the missing translation in the settings dialog

### 4.0.2 (2026-11-06)
- (iobroker-bot) Adapter requires node.js >= 22.19.0 now
- (@GermanBluefox) Updated packages
- (@GermanBluefox) Fixed POST requests with authentication: a request with a form or JSON body never got an answer (#316)
- (@GermanBluefox) `setBulk` and `setValueFromBody` convert the values to the type of the datapoint: a number like `21.0` was written as text into a number state (#245, #298)

### 4.0.1 (2026-11-06)
- (@GermanBluefox) Publishing to npm goes through trusted publishing now: 4.0.0 could not be published with the old npm token

### 4.0.0 (2026-11-06)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (@GermanBluefox) Fixed `set` and `toggle` with `wait`: the request got no answer and the state was never unsubscribed. Now it answers with the acknowledged state, or `null` if the driver does not acknowledge in time, as documented

## License
The MIT License (MIT)

Copyright (c) 2015-2026 bluefox <dogafox@gmail.com>

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