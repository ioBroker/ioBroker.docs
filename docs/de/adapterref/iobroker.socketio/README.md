---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: RbQP2f3iyXDvJRRqZZug9sdL97bR2n6atxTbDD2nxfs=
---
![Logo](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Anzahl der Installationen](http://iobroker.live/badges/socketio-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
Dieser Adapter wird von Webanwendungen und Adaptern verwendet, um mit ioBroker über WebSockets und das Socket.io-Protokoll zu kommunizieren.

**Wichtiger Hinweis: Seit Version 4.0 dieses Adapters werden ausschließlich reine WebSockets verwendet! Socket.io wird nicht mehr durch die Socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Mit diesem Adapter können Nutzer ihre Produkte über WebSockets mit ioBroker verbinden.
Tatsächlich kann dieser Adapter auch von ECharts, Vis und vielen anderen Anbietern verwendet werden, um Daten von ioBroker abzurufen.

Wenn möglich, verwenden Sie bitte [`iobroker.ws`](https://github.com/ioBroker/ioBroker.ws) anstelle dieses Adapters.

Im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) finden Sie eine einfache Anwendung, die diese Schnittstelle nutzt, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, über [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Ein Objekt beschreibt einen Datenpunkt oder eine Gruppe. Die Gruppe kann weitere Datenpunkte enthalten; in diesem Fall wird sie als Kanal bezeichnet. Besteht eine Gruppe aus mehreren Kanälen, wird sie als Gerät bezeichnet.

Ein Objekt ist eine Metainformation, die einen Datenpunkt beschreibt und folgenden Inhalt haben kann: Maximal-/Minimalwert, Einheit, Name, Standardwert, Datentyp, Informationen für den Kommunikationsadapter (z. B. IP-Adresse) usw.

### Zustand
Der Zustand ist der tatsächliche Wert des Datenpunkts und wird durch ein JavaScript-Objekt dargestellt:

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

Zustände ändern sich im Vergleich zu Objekten sehr häufig. (Normalerweise sollten Objekte nur einmal bei ihrer Erstellung geändert werden, und das war's.)

### Danksagung
Jeder Zustand besitzt das Attribut `ack`. Es zeigt die Befehlsrichtung an.

- Wenn ack=false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, sodass dieser Befehl ausgeführt wird (z. B. wird das Licht eingeschaltet).
- Wenn ack=true, bedeutet dies, dass das Gerät einen neuen Wert meldet. (z. B. wurde das Licht manuell eingeschaltet oder eine Bewegung erkannt)

**Beispiel**: Wir haben einen Hausautomatisierungsadapter (HAA), an den eine Lampe unter der Adresse `haa.0.lamp1` angeschlossen ist.

Die Lampe kann manuell über einen physischen Schalter oder per WLAN mit Hilfe von HAA eingeschaltet werden.
- Wenn vis die Lampe über Wi-Fi einschalten möchte, sollte es den neuen Wert mit `{value: true, ack: false}` setzen.
- Wenn die Lampe eingeschaltet wird, informiert sie normalerweise HAA über den neuen Zustand, und der Wert sollte sofort mit `{value: true, ack: true}` überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert HAA über den neuen Zustand mit `{value: false, ack: true}`.

### Qualität
Jeder Datenpunkt besitzt das Attribut `q` - *Qualität*.

## Verwendung
Die Beschreibung jeder unterstützten Methode finden Sie unter [Hier](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Für die Kommunikation wird die Verwendung von [Socket-Klasse](https://github.com/ioBroker/socket-client) empfohlen.

## WebSockets optimieren
Bei einigen WebSocket-Clients kann es zu Leistungsproblemen bei der Kommunikation kommen.
Dieses Problem wird mitunter durch die Verwendung eines Long-Polling-Mechanismus anstelle der Socket.IO-Kommunikation verursacht. Sie können die Option „WebSockets erzwingen“ aktivieren, um die ausschließliche Verwendung von WebSockets zu erzwingen.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 8.0.1 (2026-06-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Moved socketio server classes to a separate package
* (@GermanBluefox) A minimal node.js version is 20

### 7.1.3 (2026-04-13)
* (@GermanBluefox) Fixed possible problems
* (@GermanBluefox) Updated packages

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

Copyright (c) 2014-2026 @GermanBluefox <dogafox@gmail.com>