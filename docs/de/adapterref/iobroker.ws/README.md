---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: DzmdQGifgATBcDe+ZOI3dLcRh0qFciQw0QI+pX2msPM=
---
![Logo](../../../en/adapterref/iobroker.ws/admin/ws.png)

![Anzahl der Installationen](http://iobroker.live/badges/ws-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ws.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)
![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
Dieser Adapter wird von Webanwendungen und Adaptern verwendet, um über WebSockets mit ioBroker zu kommunizieren.

Es ist fast identisch mit `ioBroker.socketio`, verwendet aber nicht die socket.io-Bibliothek, sondern simuliert sie nur.

**Wichtiger Hinweis: Seit Version 4.0 dieses Adapters werden ausschließlich reine WebSockets verwendet! Socket.io wird nicht mehr durch die Socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Mit diesem Adapter können Nutzer ihre Produkte über WebSockets mit ioBroker verbinden.
Tatsächlich kann dieser Adapter auch von ECharts, Vis und vielen anderen Anbietern verwendet werden, um Daten von ioBroker abzurufen.

Im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.ws/tree/master/example) finden Sie eine einfache Anwendung, die diese Schnittstelle nutzt, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, über [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Ein Objekt beschreibt einen Datenpunkt oder eine Datengruppe. Die Gruppe kann weitere Datenpunkte enthalten; in diesem Fall wird sie als Kanal bezeichnet. Besteht eine Gruppe aus mehreren Kanälen, wird sie als Gerät bezeichnet.

Ein Objekt ist eine Metainformation, die einen Datenpunkt beschreibt und folgenden Inhalt haben kann: Maximal-/Minimalwert, Einheit, Name, Standardwert, Datentyp, Informationen für den Kommunikationsadapter (z. B. IP-Adresse) usw.

### Zustand
Der Zustand ist der tatsächliche Wert des Datenpunkts und wird durch ein JavaScript-Objekt dargestellt:

```json
{
    "val": VALUE,
    "ack": ACKNOWLEDGED,
    "ts": TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    "lc": TIMESTAMP of last change,
    "from": ADAPTER_NAME,
    "q": QUALITY
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

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 4.1.0 (2026-04-13)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Fixed possible bugs

### 4.0.0 (2026-02-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Removed support for node.js 18

### 3.0.19 (2025-03-04)
* (@GermanBluefox) Removed the frequent debug output

### 3.0.18 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 3.0.17 (2025-02-28)
* (@GermanBluefox) Added OAuth2 authentication

### 3.0.5 (2025-02-11)
* (@GermanBluefox) Corrected address detection
* (@GermanBluefox) Corrected language settings

### 3.0.4 (2025-02-11)
* (@GermanBluefox) Adapter was rewritten in TypeScript

### 2.7.0 (2024-11-17)
* (@GermanBluefox) Update ws-server library

### 2.6.2 (2024-06-26)
* (@GermanBluefox) Corrected call of getObjectView with null parameter

### 2.6.1 (2024-04-22)
* (foxriver76) fixed require of webserver

### 2.6.0 (2024-04-21)
* (foxriver76) use `@iobroker/webserver`

### 2.5.11 (2024-02-22)
* (@GermanBluefox) Some packages were updated

### 2.5.10 (2023-12-17)
* (foxriver76) updated ws-server to increase the file limit to 500 MB

### 2.5.9 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 2.5.8 (2023-10-11)
* (@GermanBluefox) Corrected adapter termination if the alias has no target

### 2.5.7 (2023-10-07)
* (foxriver76) upgraded socket-classes to fix vis problems

### 2.5.6 (2023-09-28)
* (@GermanBluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 2.5.5 (2023-09-14)
* (foxriver76) upgraded socket-classes to fix crash cases

### 2.5.4 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 2.5.3 (2023-08-01)
* (@GermanBluefox) Added the subscribing on the specific instance messages

### 2.4.0 (2023-07-07)
* (@GermanBluefox) extended the getObjects function with the possibility to read the list of IDs

### 2.3.6 (2023-03-03)
* (@GermanBluefox) Allowed deletion of fullcalendar objects

### 2.3.5 (2023-01-29)
* (@GermanBluefox) added `publishFileAll` method (for future use)

### 2.3.4 (2022-12-27)
* (@GermanBluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (@GermanBluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (@GermanBluefox) Added `fileChange` event

## License
The MIT License (MIT)

Copyright (c) 2014-2026 @GermanBluefox <dogafox@gmail.com>