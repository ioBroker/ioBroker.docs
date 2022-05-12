---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.socketio/README.md
title: ioBroker-socket.io
hash: yWpW1NCZDpHa5mw4WmbubpFxjWMLJKdw218Avlfc71w=
---
![Logo](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Anzahl der Installationen](http://iobroker.live/badges/socketio-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker-socket.io
Dieser Adapter wird von WEB-Anwendungen und Adaptern verwendet, um mit ioBroker über Websockets und das socket.io-Protokoll zu kommunizieren.

**Wichtiger Hinweis: Seit v4.0 dieses Adapters werden ausschließlich reine Websockets verwendet! Socket.io wird nicht mehr durch die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Benutzer können diesen Adapter verwenden, um ihre Produkte über Websockets mit ioBroker zu verbinden. Eigentlich ist dieser Adapter z.B. Wird von Flot, Rickshaw, Vis und Mobile verwendet, um Daten aus ioBroker zu extrahieren.

Sie finden im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, über die [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Objekt ist eine Beschreibung des Datenpunkts oder der Gruppe. Die Gruppe könnte andere Datenpunkte enthalten, in diesem Fall heißt sie Kanal. Wenn die Gruppe aus anderen Kanälen besteht, wird sie in diesem Fall als Gerät bezeichnet.

Objekt sind Metainformationen, die einen Datenpunkt beschreiben und Folgendes enthalten können: Maximal-/Mindestwert, Einheit, Name, Standardwert, Werttyp, Informationen zum Adapter für die Kommunikation (z. B. IP-Adresse) und so weiter.

### Bundesland
Status ist der tatsächliche Wert des Datenpunkts und wird durch ein Javascript-Objekt dargestellt:

```
{
    val: VALUE,
    ack: ACKNOWLEDGED,
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change,
    from: ADAPTER_NAME,
    q: QUALITY
}
```

Zustände ändern sich sehr häufig im Vergleich zu den Objekten. (Normalerweise sollten Objekte einmal bei der Erstellung geändert werden und das ist alles)

### Wissen
Jeder Zustand hat das Attribut „ack“. Es zeigt die Befehlsrichtung an.

- Wenn ack=false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, damit dieser Befehl ausgeführt wird (z. B. Licht wird eingeschaltet).
- Wenn ack=true, bedeutet dies, dass das Gerät über den neuen Wert informiert. (z. B. Licht wurde manuell eingeschaltet oder Bewegung erkannt)

**Beispiel**: Wir haben einen Heimautomatisierungsadapter (HAA), an dem eine Lampe unter der Adresse `haa.0.lamp1` angeschlossen ist.

- Die Lampe kann manuell mit einem physischen Schalter oder über WLAN mit Hilfe von HAA eingeschaltet werden.
- Wenn vis die Lampe über Wi-Fi einschalten möchte, sollte es den neuen Wert mit ```{value: true, ack: false}``` setzen.
- Wenn die Lampe eingeschaltet wird, wird sie normalerweise HAA über den neuen Zustand informiert und der Wert sollte sofort mit ```{value: true, ack: true}``` überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA über den neuen Zustand mit ```{value: false, ack: true}```.

### Qualität
Jeder Datenpunkt hat ein Attribut `q` - *Qualität*.

## Verwendungszweck
Es wird empfohlen, example/conn.js für die Kommunikation zu verwenden.

Nach Einbindung der Datei conn.js konnte das globale Objekt `servConn` verwendet werden, um die Kommunikation mit dem Socketio-Adapter herzustellen.

`servConn` Objekt hat Aushöhlungsmethoden:

### Drin
- Funktion (connOptions, connCallbacks, objectsRequired)

`connOptions` - ist optionaler Parameter:

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is.
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

Sie können diese Parameter übergeben, indem Sie auch die globalen Variablen vor dem Aufruf von "init" definieren:

```
var socketUrl      = 'http://localhost:8084';  // is connOptions.connLink
var socketSession  = '';                       // is connOptions.socketSession
servConn.namespace = 'myapp';                  // is connOptions.name
```

`connCallbacks` - Objekt mit Callbacks:

```
connCallbacks = {
    onConnChange:   function (isConnected) {}, // optional - called if connection state changed.
    onObjectChange: function (id, obj)     {}, // optional - called if content of some object is changed, new object created or object was deleted (obj = null)
    onUpdate:       function (id, state)   {}, // optional - called if state of some object is changed, new state for object is created or state was deleted (state = null)
    onError:        function (error)       {}  // optional - called if some error occurs
};
```

### SetState
- Funktion (pointId, Wert, Callback)

neuen Wert eines Datenpunkts setzen.

Z.B. ```servConn.setState('adapter.0.myvalue', true)``` schreibt ```{val: true, ack: false}``` in *adapter.0.myvalue*.

- `pointId` - ist die ID des Zustands, wie `adapter.0.myvalue`,
- `value` - Neuer Wert des Zustands, kann ein einfacher Wert (String, Zahl, Boolean) oder ein Objekt wie ```{val: newValue, ack: false, q: 0}``` sein.

Falls ein einfacher Wert verwendet wird, wird "ack" auf "false" gesetzt.

- `callback` - ```function (error) {}``` - aufgerufen, wenn ein neuer Wert in die DB geschrieben wird (nicht wenn das Gerät gesteuert wurde).

### GetStates
- Funktion (IDs, Callback)

Holen Sie sich die Zustände von mehr als einem Zustand. Dieser Befehl wird normalerweise aufgerufen, nachdem die Verbindung hergestellt wurde, um die aktuellen Zustände der verwendeten Datenpunkte zu erhalten.

- "IDs" - Muster oder Array mit IDs. Könnte weggelassen werden, um alle Zustände zu erhalten. Muster können Platzhalter enthalten, wie: '*.STATE', 'haa.0.*'
- `callback` - ```function (error, states) {}``` - *states* ist Objekt wie ```{'id1': 'state1', 'id2': 'state2', ...} ```. *stateX* sind Objekte mit der [oben] beschriebenen Struktur (#state).

### HttpGet
- Funktion (URL, Rückruf)

ruft diese URL vom PC auf, auf dem der Socketio-Adapter läuft.

- `url` - ist die anzurufende Adresse.
- `callback` - ```function (data) {}``` - result of the request (html body).

### Protokollfehler
- Funktion (FehlerText)

schreibt Fehlermeldung ins Log des Controllers.

### GetConfig
- Funktion (Rückruf)

liest Controller-Konfiguration wie Sprache, Temperatureinheiten, Punkt- oder Komma-Trennzeichen in Fließkommazahlen, Datumsformat.

- `callback` - ```function (err, config) {}``` - config sieht so aus:

```
{
  "_id": "system.config",
  "type": "config",
  "common": {
    "name":             "System configuration",
    "language":         "de",
    "tempUnit":         "°C",
    "currency":         "€",
    "dateFormat":       "DD.MM.YYYY",
    "isFloatComma":     true,
    "licenseConfirmed": true,
    "activeRepo":       "fast-online",
    "diag":             "extended",
    "defaultHistory":   ""
  }
}
```

### Objekt abrufen
- Funktion (ID, Rückruf)

bestimmtes Objekt aus DB lesen. Mit dieser Funktion können die Metainformationen einiger Objekte gelesen werden.

- `id` - ID des Zustands, wie "haa.0.light1",
- `callback` - ```function (error, obj)``` - obj sieht so aus:

```
{
  "_id": "haa.0.light1",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": false,
    "write": true,
    "role": "switch",
    "name": "light in floor"
  },
  "native": {
    "CONTROL": "BUTTON.LONG",
    "DEFAULT": false,
    "FLAGS": 1,
    "ID": "PRESS_LONG",
    "MAX": true,
    "MIN": false,
    "OPERATIONS": 6,
    "TAB_ORDER": 1,
    "TYPE": "ACTION",
    "UNIT": ""
  },
  "enums": ['enum.rooms.floor'],
  "acl": {
    "object": 1638,
    "state": 1638
  }
}
```

### GetObjects
- Funktion (Rückruf)

alle Objekte aus DB lesen.

- `callback` - ```function (error, objs)``` - objs sieht so aus: ```{'id1': 'object1', 'id2': 'object2', ...}```

### ReadDir
- Funktion (dirName, Callback)

liest Dateien und Verzeichnisse im angegebenen Verzeichnis.

Dateien werden in DB (oder ähnlich) gespeichert und sollten normalerweise nicht direkt aufgerufen werden. Der Dateiname besteht aus Pfad, Dateiname und Dateierweiterung, z. B. "/mobile.0/data/fileName.txt".

- dirName - Name des Verzeichnisses wie */mobile.0/data*
- Callback - ```Funktion (Fehler, Liste)``` - Liste sieht so aus:

```
[
    {
        file:       'file1.txt',
        stats:      {
                      mode: 33188,
                      size: 527,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      false,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    {
        file:       'main',
        stats:      {
                      mode: 33188,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      true,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    ...
]
```

### Mkdir
- Funktion (dirName, Callback)

- `Rückruf` - ```Funktion (Fehler) {}```

### Verknüpfung aufheben
- Funktion (Name, Callback)

löscht Datei oder Verzeichnis. Das Verzeichnis muss leer sein, um gelöscht zu werden.

- dirName - Name des Verzeichnisses oder der Datei wie */mobile.0/data*.
- `Rückruf` - ```Funktion (Fehler) {}```

### Datei lesen
- Funktion (Dateiname, Callback)

- `callback` - ```function (error, fileData, mimeType)```

### ReadFile64
- Funktion (Dateiname, Callback)

- `callback` - ```function (error, data)``` - data is ```{mime: mimeType, data: base64data}```

### Datei schreiben
- Funktion (Dateiname, Daten, Modus, Callback)

- `Rückruf` - ```Funktion (Fehler) {}```

### SchreibeDatei64
- Funktion (Dateiname, Daten, Modus, Callback)

- `Rückruf` - ```Funktion (Fehler) {}```

### Datei umbenennen
- Funktion (alterName, neuerName, Rückruf)

- `Rückruf` - ```Funktion (Fehler) {}```

### Geschichte abrufen
- Funktion (Instanz, Optionen, Callback)

- `callback` - ```function (error, data, step, sessionId) {}```

### Protokoll erforderlich
- Funktion (isRequire, Callback)

aktiviert/deaktiviert den Protokollempfang für diesen Socket.

- `Rückruf` - ```Funktion (Fehler) {}```

### AuthentifizierungAktiviert
- Funktion ()

liest, ob die Authentifizierung aktiviert ist und welcher Benutzer angemeldet ist

- `Rückruf` - ```Funktion (authEnabled, aktuellerBenutzer) {}```

Wenn die Authentifizierung aktiviert ist, wird der aktuell angemeldete Benutzer zurückgegeben, wenn die Authentifizierung deaktiviert ist, wird der Standardbenutzer "wird ausgeführt als" zurückgegeben.

## Web-Sockets optimieren
Bei einigen Web-Sockets-Clients gibt es Leistungsprobleme bei der Kommunikation. Manchmal ist dieses Problem auf einen Fallback der socket.io-Kommunikation auf einen langen Abfragemechanismus zurückzuführen.
Sie können die Option *Force Web-Sockets* so einstellen, dass nur die Verwendung von Web-Sockets-Transport erzwungen wird.

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Used common sockets (could be buggy)

### 4.2.0 (2022-03-27)
* (bluefox) Added `log` socket command

### 4.1.5 (2022-03-20)
* (Apollon77) make sure patterns are handled as strings on subscribe/unsubscribe
* (Apollon77) when getHistory is called with instance as string correct the data into an object

### 4.1.4 (2022-02-16)
* (bluefox) Added `unlink` and `rename` to web functions

### 4.1.2 (2022-02-13)
* (bluefox) Corrected the connection indication

### 4.1.0 (2022-01-31)
* (bluefox) Update socket.io library to 2.4.1
* (bluefox) Used json config for settings

### 3.1.5 (2021-10-22)
* (foxriver76) make error logging on failed authentication more specific
* (foxriver76) "request" was replaced by "axios"

### 3.1.4 (2021-01-13)
* (Apollon77) Define instanceObject "connected" to prevent warning with js-controller 3.2

### 3.1.3 (2021-01-12)
* (Apollon77) fix socketio dependency

### 3.1.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 3.0.13 (2020-08-21)
* (bluefox) Added getAdapterName method

### 3.0.12 (2020-07-27)
* (Apollon77) socket.io pingTimeout and pinInterval increased to prevent too fast reconnections and bigger visualizations

### 3.0.11 (2020-07-23)
* (Apollon77) make sure web adapter gets restarted on socketio adapter upgrade

### 3.0.10 (2020-07-16)
* (Apollon77) Error caught when trying to write an empty base64 value into a file (Sentry )

### 3.0.9 (2020-06-11)
* (Apollon77) optimize error handling on webserver initialization again

### 3.0.8 (2020-06-10)
* (Apollon77) Make sure adapter does not crash if getHttp is called with an invalid URL (Sentry IOBROKER-WEB-R)

### 3.0.7 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with invalid certificates

### 3.0.6 (2020-04-30)
* (bluefox) errors on webserver initialization are handled properly

### 3.0.5 (2020-04-23)
* (bluefox) Caught the web server errors

### 3.0.4 (2020-04-23)
* fix crash reason when server closes (Sentry IOBROKER-SOCKETIO-2/3/4/5)

### 3.0.3 (2020-04-16)
* (Apollon77) Remove usage of deprecated object methods; prevent js-controller 3.0 warnings
* (Apollon77) Add Sentry error reporting

### 3.0.2 (2020-03-07)
* (bluefox) Unload of adapter was corrected

### 3.0.1 (2020-02-23)
* (Apollon77) Workaround for socket.io bug #3555 added to make sure always the correct client files are delivered

### 3.0.0 (2020-01-15)
* (Apollon77) upgrade all dependencies, especially socketio to current version! This might break ipad 1/2 devices

### 2.1.2 (2019-09-28)
* (Apollon77) optimize shutdown for compact mode

### 2.1.1 (2018-06-09)
* (bluefox) Used socket.io Version 1.7.2
* (bluefox) Fix authentication problem

### 2.1.0 (2018-05-04)
* (bluefox) Used socket.io Version 1.7.4

### 2.0.1 (2018-02-28)
* (bluefox) Dropped support of old browsers. Please do not update if you have iPad 1 and so on.

### 1.9.0 (2018-01-14)
* (bluefox) Ready for admin3

### 1.8.7 (2017-11-29)
* (bluefox) Tune cloud work

### 1.8.5 (2017-10-22)
* (bluefox) Escape [] in subscriptions

### 1.8.4 (2017-10-16)
* (bluefox) Check callback validity

### 1.8.3 (2017-10-09)
* (bluefox) Allow authentication via URL

### 1.8.2 (2017-09-20)
* (bluefox) Fix cmdExec command

### 1.8.1 (2017-09-13)
* (bluefox) Fix user access rights for sendToHost

### 1.8.0 (2017-08-06)
* (bluefox) Support the access to admin via iobroker.pro

### 1.7.5 (2017-05-24)
* (bluefox) fix error if subscribe is empty

### 1.7.4 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.3 (2016-11-13)
* (bluefox) support of socket extensions

### 1.7.2 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.1 (2016-10-11)
* (bluefox) Fix authentication for app

### 1.7.0 (2016-08-30)
* (bluefox) compatible only with new admin

### 1.6.1 (2016-08-29)
* (bluefox) fix error by checking user name

### 1.6.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.5.4 (2016-08-26)
* (bluefox) fix error in socket.js

### 1.5.3 (2016-08-14)
* (bluefox) support of force only web sockets transport

### 1.5.2 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.1 (2016-06-28)
* (bluefox) add sendToHost command

### 1.5.0 (2016-06-17)
* (bluefox) preparations for cloud

### 1.4.1 (2016-05-13)
* (bluefox) change getHistory function

### 1.4.0 (2016-04-24)
* (bluefox) encode json files

### 1.3.0 (2016-03-17)
* (bluefox) rename files

### 1.2.3 (2015-12-24)
* (bluefox) support of authentication over URL

### 1.2.2 (2015-12-09)
* (bluefox) remove unused parameter "cache"

### 1.2.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.1.0 (2015-11-14)
* (Smiling_Jack) add getHistory

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.5 (2015-08-11)
* (bluefox) update packets

### 0.4.4 (2015-07-07)
* (bluefox) extend writeFile with mode

### 0.4.3 (2015-07-06)
* (bluefox) add chmodFile

### 0.4.1 (2015-06-13)
* (bluefox) add default ttl
* (bluefox) enable run from "web" and add permissions check

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.1 (2015-05-19)
* (bluefox) support of subscribe on objectChanged

### 0.3.0 (2015-04-23)
* (bluefox) enable security

### 0.2.3 (2015-03-07)
* (bluefox) extend getStates to support list of objects

### 0.2.2 (2015-02-14)
* (bluefox) fix error with objectChanged event

### 0.2.0 (2015-01-16)
* (bluefox) make socket usable as module

### 0.1.6 (2015-01-08)
* (bluefox) support of subscribe for different sockets. Support of socket names. Diagnostic info in socket.0.connected

### 0.1.5 (2015-01-07)
* (bluefox) fix error with update of states and objects

### 0.1.4 (2015-01-06)
* (bluefox) support of file manager in vis

### 0.1.3 (2015-01-02)
* (bluefox) enable adapter by default

### 0.1.2 (2015-01-02)
* (bluefox) add "request" module to package.json

### 0.1.1 (2015-01-02)
* (bluefox) enable npm install

### 0.1.0 (2014-12-28)
* (bluefox) support of read/write files

### 0.0.5 (2014-12-19)
* (bluefox) support of setObjects command

### 0.0.4 (2014-12-10)
* (bluefox) support of https sockets

### 0.0.3 (2014-12-05)
* (bluefox) support of https sockets

### 0.0.2 (2014-11-24)
* (bluefox) fix error by start

### 0.0.1 (2014-10-10)
* (bluefox) authentication works

## License

The MIT License (MIT)

Copyright (c) 2014-2022 bluefox <dogafox@gmail.com>