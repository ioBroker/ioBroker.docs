---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: ADSCIlqm9U+gK84+3fU1fEF8ZdlgfkilsN3ozaWAukA=
---
![Logo](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Anzahl der Installationen](http://iobroker.live/badges/socketio-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
Dieser Adapter wird von WEB-Anwendungen und -Adaptern verwendet, um über WebSockets und das Socket.io-Protokoll mit ioBroker zu kommunizieren.

**Wichtiger Hinweis: Seit Version 4.0 dieses Adapters werden ausschließlich reine WebSockets verwendet! Socket.io wird nicht mehr über die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Benutzer können diesen Adapter verwenden, um ihre Produkte über WebSockets mit ioBroker zu verbinden.

Tatsächlich kann dieser Adapter von echarts, vis und vielen anderen Adaptern verwendet werden, um Daten aus ioBroker zu extrahieren.

Verwenden Sie nach Möglichkeit [`iobroker.ws`](https://github.com/ioBroker/ioBroker.ws) anstelle dieses Adapters.

Im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) finden Sie eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, etwas über [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Objekt ist die Beschreibung eines Datenpunkts oder einer Gruppe. Die Gruppe kann weitere Datenpunkte enthalten und wird in diesem Fall als Kanal bezeichnet.
Besteht eine Gruppe aus weiteren Kanälen, wird sie als Gerät bezeichnet.

Das Objekt ist eine Metainformation, die den Datenpunkt beschreibt und folgenden Inhalt haben könnte: Max.-/Min.-Wert, Einheit, Name, Standardwert, Werttyp, Informationen zum Adapter für die Kommunikation (z. B. IP-Adresse) usw.

### Zustand
Der Status ist der tatsächliche Wert des Datenpunkts und wird durch ein JavaScript-Objekt dargestellt:

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

Zustände ändern sich im Vergleich zu Objekten sehr häufig. (Normalerweise sollten Objekte einmal bei der Erstellung geändert werden, und das ist alles.)

### Bestätigung
Jeder Zustand besitzt das Attribut `ack`. Es zeigt die Befehlsrichtung an.

- Wenn ack=false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, sodass der Befehl ausgeführt wird (z. B. das Licht eingeschaltet wird).
- Wenn ack=true, bedeutet dies, dass das Gerät über einen neuen Wert informiert. (z.B. Licht wurde manuell eingeschaltet oder Bewegung wurde erkannt)

**Beispiel**: Wir haben einen Heimautomatisierungsadapter (HAA), an den eine Lampe unter der Adresse `haa.0.lamp1` angeschlossen ist.

- Die Lampe kann manuell mit einem physischen Schalter oder mithilfe von HAA über WLAN eingeschaltet werden.
- Wenn vis die Lampe über WLAN einschalten möchte, sollte es den neuen Wert mit `{value: true, ack: false}` setzen.
- Wenn die Lampe eingeschaltet wird, informiert sie HAA normalerweise über den neuen Status und der Wert sollte sofort mit „{value: true, ack: true}“ überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA mit „{value: false, ack: true}“ über den neuen Status.

### Qualität
Jeder Datenpunkt hat ein Attribut `q` – *Qualität*.

## Verwendung
Die Beschreibung aller unterstützten Methoden finden Sie unter [Hier](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Es wird empfohlen, für die Kommunikation [Socket-Klasse](https://github.com/ioBroker/socket-client) zu verwenden.

## Web-Sockets optimieren
Bei einigen Web-Sockets-Clients kommt es zu Leistungsproblemen bei der Kommunikation.

Manchmal liegt dieses Problem daran, dass die socket.io-Kommunikation auf einen langen Polling-Mechanismus zurückgreift.

Sie können die Option „Web-Sockets erzwingen“ aktivieren, um die ausschließliche Verwendung von Web-Sockets-Transport zu erzwingen.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 7.0.8 (2025-03-04)
* (@GermanBluefox) Removed the frequent debug output

### 7.0.7 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 7.0.6 (2025-02-28)
* (@GermanBluefox) Added OAuth2 support

### 7.0.1 (2025-02-11)
* (@GermanBluefox) Adapter was rewritten in TypeScript

### 6.7.1 (2024-06-26)
* (@GermanBluefox) Corrected call of getObjectView with null parameter

### 6.7.0 (2024-04-27)
* (foxriver76) ported to webserver

### 6.6.1 (2024-02-22)
* (@GermanBluefox) Just some packages were updated

### 6.6.0 (2023-10-13)
* (@GermanBluefox) Corrected adapter termination if the alias has no target

### 6.5.7 (2023-10-08)
* (foxriver76) upgrade socket-classes to fix error with vis subscriptions

### 6.5.6 (2023-09-28)
* (@GermanBluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 6.5.5 (2023-09-14)
* (foxriver76) upgrade socket-classes to fix crash cases

### 6.5.3 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 6.5.2 (2023-08-01)
* (@GermanBluefox) Added the subscribing on the specific instance messages

### 6.4.0 (2023-07-07)
(@GermanBluefox) extended the getObjects function with the possibility to read the list of IDs

### 6.3.5 (2023-03-17)
* (@GermanBluefox) Increased the max size of the message to 200MB

### 6.3.4 (2023-03-03)
* (@GermanBluefox) Allowed deletion of fullcalendar objects

### 6.3.3 (2022-12-22)
* (@GermanBluefox) used new socket-classes

### 6.3.1 (2022-11-27)
* (@GermanBluefox) Added `fileChange` event

### 6.2.0 (2022-11-08)
* (Apollon77) Prepare for future js-controller versions
* (@GermanBluefox) Function `getObjects` for web was extended by devices, channels and enums

### 6.1.10 (2022-08-24)
* (@GermanBluefox) Caught error by subscribing

### 6.1.8 (2022-07-08)
* (@GermanBluefox) Corrected getAdapterInstances method

## License

The MIT License (MIT)

Copyright (c) 2014-2025 @GermanBluefox <dogafox@gmail.com>