---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: nTPtVkzKPbkqwG4ZqyA5Utge6xM5EauqFIYXv23k87Q=
---
![Logo](../../../en/adapterref/iobroker.ws/admin/ws.png)

![Anzahl der Installationen](http://iobroker.live/badges/ws-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ws.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)
![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
Dieser Adapter wird von WEB-Anwendungen und Adaptern verwendet, um über WebSockets mit ioBroker zu kommunizieren.

Es ist fast dasselbe wie `ioBroker.socketio`, verwendet jedoch nicht die Socket.io-Bibliothek, sondern simuliert sie nur.

**Wichtiger Hinweis: Seit v4.0 dieses Adapters werden ausschließlich reine WebSockets verwendet! Socket.io wird nicht mehr über die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Benutzer können diesen Adapter verwenden, um ihre Produkte über Websockets mit ioBroker zu verbinden.
Tatsächlich könnte dieser Adapter von echarts, vis und vielen anderen Adaptern verwendet werden, um Daten aus ioBroker zu extrahieren.

Im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.ws/tree/master/example) finden Sie eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, über [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Objekt ist die Beschreibung eines Datenpunkts oder einer Gruppe. Die Gruppe kann andere Datenpunkte enthalten, in diesem Fall wird sie Kanal genannt. Wenn eine Gruppe aus anderen Kanälen besteht, wird sie in diesem Fall Gerät genannt.

Ein Objekt ist eine Metainformation, die den Datenpunkt beschreibt und folgenden Inhalt haben könnte: Max.-/Min.-Wert, Einheit, Name, Standardwert, Werttyp, Informationen für den Adapter zur Kommunikation (z. B. IP-Adresse) usw.

### Zustand
Der Status ist der tatsächliche Wert des Datenpunkts und wird durch ein JavaScript-Objekt dargestellt:

```js
{
    val: VALUE,
    ack: ACKNOWLEDGED,
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change,
    from: ADAPTER_NAME,
    q: QUALITY
}
```

Zustände ändern sich im Vergleich zu Objekten sehr häufig. (Normalerweise sollten Objekte einmal bei der Erstellung geändert werden und das ist alles.)

### Danksagung
Jeder Zustand besitzt das Attribut `ack`. Es zeigt die Befehlsrichtung an.

- Wenn ack=false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, sodass der Befehl ausgeführt wird (z. B. das Licht eingeschaltet wird).
- Wenn ack=true, bedeutet dies, dass das Gerät über einen neuen Wert informiert. (z. B. Licht wurde manuell eingeschaltet oder Bewegung wurde erkannt)

**Beispiel**: Wir haben einen Heimautomatisierungsadapter (HAA), an den eine Lampe unter der Adresse `haa.0.lamp1` angeschlossen ist.

- Die Lampe kann manuell mit einem physischen Schalter oder mithilfe von HAA über WLAN eingeschaltet werden.
- Wenn vis die Lampe über WLAN einschalten möchte, sollte es den neuen Wert mit `{value: true, ack: false}` setzen.
- Wenn die Lampe eingeschaltet wird, informiert sie HAA normalerweise über den neuen Status und der Wert sollte sofort mit „{value: true, ack: true}“ überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA mit „{value: false, ack: true}“ über den neuen Status.

### Qualität
Jeder Datenpunkt hat ein Attribut `q` - *Qualität*.

## Verwendung
Eine Beschreibung aller unterstützten Methoden finden Sie unter [Hier](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Es wird empfohlen, für die Kommunikation [Socket-Klasse](https://github.com/ioBroker/socket-client) zu verwenden.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 2.7.0 (2024-11-17)
* (bluefox) Update ws-server library

### 2.6.2 (2024-06-26)
* (bluefox) Corrected call of getObjectView with null parameter

### 2.6.1 (2024-04-22)
* (foxriver76) fixed require of webserver

### 2.6.0 (2024-04-21)
* (foxriver76) use `@iobroker/webserver`

### 2.5.11 (2024-02-22)
* (bluefox) Some packages were updated

### 2.5.10 (2023-12-17)
* (foxriver76) updated ws-server to increase the file limit to 500 MB

### 2.5.9 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 2.5.8 (2023-10-11)
* (bluefox) Corrected adapter termination if the alias has no target

### 2.5.7 (2023-10-07)
* (foxriver76) upgraded socket-classes to fix vis problems

### 2.5.6 (2023-09-28)
* (bluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 2.5.5 (2023-09-14)
* (foxriver76) upgraded socket-classes to fix crash cases

### 2.5.4 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 2.5.3 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 2.4.0 (2023-07-07)
* (bluefox) extended the getObjects function with the possibility to read the list of IDs

### 2.3.6 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 2.3.5 (2023-01-29)
* (bluefox) added `publishFileAll` method (for future use)

### 2.3.4 (2022-12-27)
* (bluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

## License
The MIT License (MIT)

Copyright (c) 2014-2024 bluefox <dogafox@gmail.com>