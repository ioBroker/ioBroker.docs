---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: cHFDPzB1oFJRb2WVniS1yyYafFjUmhajBRgWuIskwtU=
---
![Logo](../../../en/adapterref/iobroker.ws/admin/ws.png)

![Anzahl der Installationen](http://iobroker.live/badges/ws-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ws.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)
![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
Dieser Adapter wird von WEB-Anwendungen und Adaptern verwendet, um mit ioBroker über Websockets zu kommunizieren.

Es ist fast dasselbe wie `ioBroker.socketio`, verwendet aber keine Socket.io-Bibliothek und simuliert sie nur.

**Wichtiger Hinweis: Seit v4.0 dieses Adapters werden ausschließlich reine Websockets verwendet! Socket.io wird nicht mehr durch die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Benutzer können diesen Adapter verwenden, um ihre Produkte über Websockets mit ioBroker zu verbinden. Eigentlich ist dieser Adapter z.B. Wird von Flot, Rickshaw, Vis und Mobile verwendet, um Daten aus ioBroker zu extrahieren.

Sie finden im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.ws/tree/master/example) eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, über die [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Objekt ist eine Beschreibung des Datenpunkts oder der Gruppe. Die Gruppe könnte andere Datenpunkte enthalten, in diesem Fall heißt sie Kanal. Wenn die Gruppe aus anderen Kanälen besteht, wird sie in diesem Fall als Gerät bezeichnet.

Objekt sind Metainformationen, die Datenpunkte beschreiben und Folgendes enthalten können: Maximal-/Mindestwert, Einheit, Name, Standardwert, Werttyp, Informationen zum Adapter für die Kommunikation (z. B. IP-Adresse) und so weiter.

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
- `value` - Neuer Wert des Zustands, kann ein einfacher Wert (String, Zahl, boolescher Wert) oder ein Objekt wie ```{val: newValue, ack: false, q: 0}``` sein.

Falls ein einfacher Wert verwendet wird, wird "ack" auf "false" gesetzt.

- `callback` - ```function (error) {}``` - aufgerufen, wenn das Schreiben eines neuen Werts in die DB ausgeführt wird (nicht, wenn das Gerät gesteuert wurde).

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
- Funktion (Fehlertext)

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
### 2.0.0 (2022-05-12)
* (bluefox) Used common sockets (could be buggy)

### 1.3.0 (2022-03-27)
* (bluefox) Added `log` socket command

### 1.2.0 (2022-02-21)
* (bluefox) Made it possible to have more than one socket from one page

### 1.1.6 (2022-02-16)
* (bluefox) Added `unlink` and `rename` to web functions

### 1.1.4 (2022-02-13)
* (bluefox) Changed name `info.connection` to `info.connected`

### 1.1.2 (2022-02-13)
* (bluefox) Updated ws client file

### 1.1.1 (2022-02-02)
* (bluefox) Updated ws client file

### 1.1.0 (2022-01-31)
* (bluefox) Distributed the compatible client file together with the backen

### 1.0.1 (2022-01-30)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2022 bluefox <dogafox@gmail.com>