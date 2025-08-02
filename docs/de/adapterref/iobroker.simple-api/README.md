---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.simple-api/README.md
title: Simple-API
hash: q1/fQiizuoo4563slosAzKVM/45ewTQF6c+UgBc9kaM=
---
![Logo](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)

![Anzahl der Installationen](http://iobroker.live/badges/simple-api-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.simple-api.svg)

# Einfache API
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.simple-api/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/simple-api/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dies ist eine RESTFul-Schnittstelle zum Lesen der Objekte und Zustände von ioBroker und zum Schreiben/Steuern der Zustände über HTTP-Get/Post-Anfragen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Verwenden Sie anstelle dieses Adapters besser [`ioBroker.rest-api`](https://github.com/ioBroker/ioBroker.rest-api).**

## Verwendung
Rufen Sie im Browser `http://ipaddress:8087/help` auf, um die Hilfe zur API zu erhalten. Das Ergebnis ist:

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
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&aggregate=minmax&count=2000&prettyPrint"
}
```

### GetPlainValue
Rufen Sie z.B. auf:

`http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive`

Ergebnis:

`true`

Zusätzlich können Sie den Abfrageschlüssel `json` verwenden, um die Analyse des gespeicherten Werts zu erzwingen:

`http://ipaddress:8087/getPlainValue/javascript.0.value?json`

Ergebnis:

`{"a":1}`

Und ohne das Flag `json` wäre das Ergebnis

`"{\"a\": 1}"`

Ein weiteres nützliches Flag könnte ebenfalls verwendet werden: `noStringify`:

`http://ipaddress:8087/getPlainValue/javascript.0.stringValue?noStringify`

Ergebnis:

`VALUETEXT`

Und ohne das Flag `noStringify` wäre das Ergebnis

`"VALUETEXT"`

### Erhalten
Rufen Sie z. B. auf: `http://ipaddress:8087/get/system.adapter.admin.0.alive`

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

### GetBulk
Erhalten Sie mit einer Anfrage viele Zustände, die als Array von Objekten in der Reihenfolge einer Liste in der Anfrage und ID/Val/TS als Unterobjekt zurückgegeben werden

### Satz
Rufen Sie z. B. auf: `http://ipaddress:8087/set/javascript.0.test?value=1`

Ergebnis:

```json
{"id":"javascript.0.test","value":1}
```

oder rufen Sie z.B. auf: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint`

Ergebnis:

```json
{
  "id": "javascript.0.test",
  "value": 1
}
```

Natürlich muss der Datenpunkt `javascript.0.test` vorhanden sein.

Zusätzlich kann der Werttyp definiert werden: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string`

und ein Bestätigungsflag könnte ebenfalls definiert werden: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true`

### Umschalten
Schaltet den Wert um:

- Boolesch: wahr => falsch, falsch => wahr
- Zahl ohne Begrenzung: x => 100-x
- Zahl mit Grenzen: x => max - (x - min)

### SetBulk
Legen Sie mit einer Anfrage mehrere Status fest. Diese Anfrage unterstützt auch die POST-Methode, da POST-Daten im Text und nicht in der URL enthalten sein sollten.

Bitte verwenden Sie hierfür den Inhaltstyp `text/plain`.

### SetValueFromBody
Mit diesem Befehl kann der Wert eines bestimmten Status festgelegt werden, der durch den POST-Textinhalt festgelegt werden soll.

Rufen Sie z. B. auf: `http://ipaddress:8087/setValueFromBody/0_userdata.0.example_state` mit Text `hello`, wobei `0_userdata.0.example_state` die ID des Staates ist.

Bitte verwenden Sie hierfür den Inhaltstyp `text/plain`.

### Objekte
Lesen Sie Objekte eines definierten Typs aus der Datenbank.

Rufen Sie z.B. auf: `http://ipaddress:8087/objects?pattern=enum.*&type=enum` - um alle Enums zu lesen

oder

`http://ipaddress:8087/objects?pattern=system.adapter.admin.0.*` - um alle Zustände im Zweig `system.adapter.admin.0` zu lesen

### Staaten
### Suchen
Wenn in der Konfiguration eine Datenquelle (Verlauf, SQL) festgelegt ist, werden nur die der Datenquelle bekannten Datenpunkte aufgelistet.

Wenn die Option „Alle Datenpunkte auflisten“ aktiviert ist oder keine Datenquelle angegeben wurde, werden alle Datenpunkte aufgelistet.

Dieser Befehl wird für das Grafana JSON / SimpleJSON Plugin benötigt.

### Abfrage
Wenn in der Instanzkonfiguration eine Datenquelle (History, SQL) angegeben wurde, werden die Daten der angegebenen Datenpunkte für den angegebenen Zeitraum ausgelesen, andernfalls wird nur der aktuelle Wert ausgelesen.
Dieser Befehl wird für das Grafana JSON / SimpleJSON Plugin benötigt.

### Helfen
Gibt [Das](#usage) zurück

## Verwendung
Angenommen, wir haben keine Sicherheit und der Server läuft auf dem Standardport 8087.

Bei allen Abfragen kann der Name oder die ID des Bundeslandes angegeben werden.

Für jede Anfrage, die JSON zurückgibt, können Sie den Parameter `prettyPrint` festlegen, um die Ausgabe in einer für Menschen lesbaren Form zu erhalten.

Wenn die Authentifizierung aktiviert ist, sind zwei weitere Felder obligatorisch: `?user=admin&pass=iobroker`

### GetPlainValue
Statuswert als Text lesen. Sie können mehrere IDs durch Semikolon getrennt angeben.

`http://ip:8087/getPlainValue/admin.0.memHeapTotal` => `31.19`

`http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed` =>

```
  31.19
  17.52
```

### Erhalten
Status- und Objektdaten des Status werden als JSON gelesen. Sie können mehrere IDs angeben, getrennt durch Semikolon.
Wenn mehr als eine ID angefordert wird, wird das JSON-Array zurückgegeben.

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

### GetBulk
Lesen Sie den Status mehrerer IDs mit Zeitstempel. Sie können mehrere IDs durch Semikolon getrennt angeben.
Das JSON-Array wird immer zurückgegeben.

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
Schreiben Sie die Zustände mit den angegebenen IDs. Sie können die Option *wait* in Millisekunden angeben, um auf eine Antwort vom Treiber zu warten.

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

Wenn innerhalb der angegebenen Zeit keine Antwort eingeht, wird der Wert `null` zurückgegeben.
Im ersten Fall wird die Antwort sofort zurückgegeben und `ack` ist falsch. Im zweiten Fall ist `ack` wahr. Das bedeutet, es handelt sich um eine Antwort des Fahrers.

### SetBulk
- Schreiben Sie den Großteil der IDs in eine Anfrage.

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

Sie können diese Anfrage auch als POST senden. Verwenden Sie dazu den Inhaltstyp `text/plain` und fügen Sie die Daten in den Text ein.

### Objekte
Ruft die Liste aller Objekte für das Muster ab. Wenn kein Muster angegeben ist, werden alle Objekte als JSON-Array zurückgegeben.

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

Alle Steuerobjekte des Adapters system.adapter.admin.0 abrufen: `http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint` =>

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
Ruft die Liste aller Zustände für das Muster ab. Wenn kein Muster angegeben ist, werden alle Zustände als JSON-Array zurückgegeben.

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

Alle Steuerobjekte des Adapters system.adapter.admin.0 abrufen:

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

### Suchen
Ist in der Konfiguration eine Datenquelle (Verlauf, SQL) festgelegt, werden nur die der Datenquelle bekannten Datenpunkte aufgelistet.

Ist die Option „Alle Datenpunkte auflisten“ aktiviert oder keine Datenquelle angegeben, werden alle Datenpunkte aufgelistet.

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
Wenn eine Datenquelle (Verlauf, SQL) angegeben ist, werden Daten aus den angegebenen Datenpunkten für den angegebenen Zeitraum abgerufen.

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

Wurde keine Datenquelle angegeben oder der Parameter noHistory übergeben, wird nur der aktuelle Wert des Datenpunkts ausgelesen.

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

Sie können in der Abfrage relative Zeitangaben verwenden. Beispiel: `dateFrom=-1h` oder `dateTo=today`.

Die folgenden relativen Muster werden unterstützt:

- `hour` oder `thisHour` oder `this hour` - Beginn der aktuellen Stunde
- `last hour` oder `lastHour` - Beginn der vorherigen Stunde
- `today` - Beginn des aktuellen Tages
- `yesterday` - Beginn des Vortages
- `week` oder `thisWeek` oder `this week` - Beginn der aktuellen Woche
- `lastWeek` oder `last week` - Beginn der Vorwoche
- `month` oder `thisMonth` oder `this month` - Beginn des aktuellen Monats
- `lastMonth` oder `last month` - Beginn des Vormonats
- `year` oder `thisYear` oder `this year` - Beginn des aktuellen Jahres
- `lastYear` oder `last year` - Beginn des Vorjahres
- `-Nd` - vor N Tagen
- `-NM` - vor N Monaten
- `-Ny` - vor N Jahren
- `-Nh` - vor N Stunden
- `-Nm` - vor N Minuten
- `-Ns` - vor N Sekunden

## CORS
Mit der Option „Ursprung zulassen (CORS)“ können Sie den Header `Access-Control-Allow-Origin` setzen, um Anfragen von anderen Domänen zuzulassen.

Wenn Sie es leer lassen, wird die Kopfzeile nicht festgelegt.

## Modifikatoren
Sie können einige Optionen verwenden, um die Antwort zu ändern:

- `prettyPrint` - um die Ausgabe in einer für Menschen lesbaren Form zu erhalten
- `json` - um die Analyse des Wertes im Befehl `getPlainValue` zu erzwingen
- `timeRFC3339` – um die Zeit der Zeitstempel (`ts` und `lc`) im RFC3339-Format zu erhalten, wie `2019-06-08T01:00:00.000Z`
- `callback` - Antwort im JSONP-Format. In `callback=<CALLBACK>` ist `CALLBACK` der Name der Callback-Funktion

## Authentifizierung
Dieser Adapter unterstützt die folgenden Authentifizierungsarten:

- Abfrageparameter „Benutzer“ und „Passwort“
- Grundlegende Authentifizierung
- Oauth2-Bearer-Token im Header. Weitere Informationen zum Abrufen von Token finden Sie im Webadapter.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 3.0.6 (2025-03-15)
* (bluefox) Added support for 'Access-Control-Allow-Origin'
* (bluefox) Removed letsencrypt information
* (bluefox) Added basic and OAuth2 authentication
* (bluefox) Implemented JSONP response
* (bluefox) Implemented relative times for query

### 3.0.5 (2025-03-13)
* (bluefox) Corrected the indication of running mode in admin
* (bluefox) Corrected the writing of numeric values
* (bluefox) Clear cache after 10 minutes

### 3.0.0 (2025-03-09)
* (bluefox) Updated packages
* (bluefox) Migrated to TypeScript
* (bluefox) If State/Object not found, the response will be 404 (and not 500)
* (bluefox) If a user has no permission, the response will be 403 (and not 401)

### 2.8.0 (2024-05-23)
* (foxriver76) ported to `@iobroker/webserver`

### 2.7.2 (2022-10-08)
* (Apollon77) Prepare for future js-controller versions

### 2.7.1 (2022-08-29)
* (bluefox) Check if the port is occupied only on defined interface
* (bluefox) Added JSON config

### 2.7.0 (2022-05-31)
* (crycode-de) Allow use of ack flag for setBulk post requests
* (Apollon77) Return an ack flag too on getBulk

### 2.6.5 (2022-04-14)
* Added support for aggregate and count for queries

### 2.6.4 (2022-03-17)
* (Apollon77) Optimize performance, especially when using names instead of object ids

### 2.6.3 (2022-02-19)
* (Apollon77) Optimize error message for multi-language objects
* (Apollon77) Do not overwrite state properties by object properties

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
* (Apollon77) Make sure that the adapter is showing the correct error when webserver cannot be initialized (Sentry IOBROKER-SIMPLE-API-7)

### 2.4.5 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with invalid certificates

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
* (bluefox) compatible only with new admin

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

Copyright (c) 2015-2025 bluefox <dogafox@gmail.com>

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