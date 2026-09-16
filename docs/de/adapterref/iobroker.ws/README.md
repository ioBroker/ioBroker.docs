---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: 7Ye2IjPmKH3F2gIsVRYQWp3q/kfDDBhZL9jCwB0Ntvg=
---
![Anzahl der Installationen](http://iobroker.live/badges/ws-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ws.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)
![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)

<img src="admin/ws.svg" width="100" height="100" />

# ioBroker.ws

Dieser Adapter wird von Webanwendungen und Adaptern verwendet, um über WebSockets mit ioBroker zu kommunizieren.

Es ist fast dasselbe wie`ioBroker.socketio` , verwendet aber nicht die socket.io-Bibliothek, sondern simuliert sie nur.

**Wichtiger Hinweis: Seit Version 4.0 dieses Adapters werden ausschließlich reine WebSockets verwendet! Socket.io wird nicht mehr durch die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Mit diesem Adapter können Nutzer ihre Produkte über WebSockets mit ioBroker verbinden. Tatsächlich kann dieser Adapter auch von ECharts, Vis und vielen anderen Anbietern verwendet werden, um Daten von ioBroker abzurufen.

Im [Beispielverzeichnis](https://github.com/ioBroker/ioBroker.ws/tree/master/example) finden Sie eine einfache Anwendung, die diese Schnittstelle nutzt, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzepte](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch hilfreich, etwas über die [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Kurzbeschreibung des Konzepts

### Objekt

Ein Objekt beschreibt einen Datenpunkt oder eine Datengruppe. Die Gruppe kann weitere Datenpunkte enthalten; in diesem Fall wird sie als Kanal bezeichnet. Besteht eine Gruppe aus mehreren Kanälen, wird sie als Gerät bezeichnet.

Ein Objekt ist eine Metainformation, die einen Datenpunkt beschreibt und folgenden Inhalt haben kann: Maximal-/Minimalwert, Einheit, Name, Standardwert, Datentyp, Informationen für den Kommunikationsadapter (z. B. IP-Adresse) usw.

### Zustand

Der Zustand ist der tatsächliche Wert des Datenpunkts und wird durch ein JavaScript-Objekt dargestellt:

```js
const state = {
    "val": VALUE, 
    "ack": ACKNOWLEDGED, 
    "ts": TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    "lc": TIMESTAMP_of_last_change, 
    "from": ADAPTER_NAME, 
    "q": QUALITY
}
```

Zustände ändern sich im Vergleich zu Objekten sehr häufig. (Normalerweise sollten Objekte nur einmal bei ihrer Erstellung geändert werden, und das war's.)

### Anerkennung

Jeder Staat besitzt das Attribut`ack` Es zeigt die Befehlsrichtung an.

- Wenn ack=false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, sodass dieser Befehl ausgeführt wird (z. B. wird das Licht eingeschaltet).
- Wenn ack=true, bedeutet dies, dass das Gerät einen neuen Wert meldet (z. B. wurde das Licht manuell eingeschaltet oder eine Bewegung erkannt).

**Beispiel** : Wir haben einen Hausautomatisierungsadapter (HAA), an den eine Lampe unter folgender Adresse angeschlossen ist:`haa.0.lamp1` Die

- Die Lampe kann manuell über einen physischen Schalter oder per WLAN mit Hilfe von HAA eingeschaltet werden.
- Wenn vis die Lampe über WLAN einschalten möchte, sollte es den neuen Wert mit`{ value: true, ack: false }` Die
- Wenn die Lampe eingeschaltet wird, informiert sie HAA normalerweise über ihren neuen Zustand, und der Wert sollte sofort überschrieben werden.`{ value: true, ack: true }` Die
- Wird die Lampe manuell über einen physischen Schalter ausgeschaltet, informiert dies HAA über den neuen Zustand.`{ value: false, ack: true }` Die

### Qualität

Jeder Datenpunkt besitzt ein Attribut.`q` - _Qualität_ .

## Verwendung

Die Beschreibung jeder unterstützten Methode finden Sie [hier](https://github.com/ioBroker/ioBroker.socket-classes#web-methods) .

Es wird empfohlen, für die Kommunikation [die Socket-Klasse](https://github.com/ioBroker/socket-client) zu verwenden.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.0.2 (2026-08-31)
* (@GermanBluefox) Updated packages

### 5.0.1 (2026-08-28)
* (@GermanBluefox) Updated packages

### 5.0.0 (2026-06-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Migrated to TypeScript 6.0
* (@GermanBluefox) Used a common server library for WebSockets

### 4.1.0 (2026-04-13)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Fixed possible bugs

### 4.0.0 (2026-02-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Removed support for node.js 18