---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: 9JkQkAkEUwCAcPs2Nmazq+dTiQcPBBp+DG/V6J0DVqk=
---
![Logo](../../../en/adapterref/iobroker.ws/admin/ws.png)

![Anzahl der Installationen](http://iobroker.live/badges/ws-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ws.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)
![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
Dieser Adapter wird von WEB-Anwendungen und Adaptern verwendet, um über Websockets mit ioBroker zu kommunizieren.

Es ist fast dasselbe wie `ioBroker.socketio`, verwendet jedoch nicht die Socket.io-Bibliothek und simuliert sie nur.

**Wichtiger Hinweis: Seit v4.0 dieses Adapters werden ausschließlich reine Websockets verwendet! Socket.io wird nicht mehr durch die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Benutzer können diesen Adapter verwenden, um ihre Produkte über Web-Sockets mit ioBroker zu verbinden.
Tatsächlich könnte dieser Adapter von Echarts, Vis und vielen anderen Adaptern verwendet werden, um Daten aus ioBroker zu extrahieren.

Im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.ws/tree/master/example) finden Sie eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, etwas über die [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Objekt ist eine Beschreibung eines Datenpunkts oder einer Datengruppe. Die Gruppe könnte andere Datenpunkte enthalten, in diesem Fall wird sie als Kanal bezeichnet. Besteht eine Gruppe aus anderen Kanälen, wird sie in diesem Fall als Gerät bezeichnet.

Bei einem Objekt handelt es sich um Metainformationen, die einen Datenpunkt beschreiben und Folgendes enthalten können: Maximal-/Mindestwert, Einheit, Name, Standardwert, Werttyp, Informationen zum Adapter für die Kommunikation (z. B. IP-Adresse) usw.

### Zustand
Der Status ist der tatsächliche Wert des Datenpunkts und wird durch ein Javascript-Objekt dargestellt:

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

Zustände ändern sich im Vergleich zu den Objekten sehr häufig. (Normalerweise sollten Objekte bei der Erstellung einmal geändert werden und das ist alles)

### Wissen
Jeder Zustand hat das Attribut „ack“. Es zeigt die Befehlsrichtung an.

– Wenn ack=false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, damit der Befehl ausgeführt wird (z. B. das Licht wird eingeschaltet).
- Wenn ack=true, bedeutet dies, dass das Gerät über den neuen Wert informiert. (z. B. Licht wurde manuell eingeschaltet oder Bewegung wurde erkannt)

**Beispiel**: Wir haben einen Hausautomationsadapter (HAA), an den eine Lampe unter der Adresse `haa.0.lamp1` angeschlossen ist.

- Die Lampe kann manuell mit einem physischen Schalter oder über WLAN mit Hilfe von HAA eingeschaltet werden.
- Wenn Vis die Lampe über WLAN einschalten möchte, sollte es den neuen Wert mit „{value: true, ack: false}“ setzen.
- Wenn die Lampe eingeschaltet wird, informiert sie HAA normalerweise über den neuen Status und der Wert sollte sofort mit „{value: true, ack: true}“ überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA mit „{value: false, ack: true}“ über den neuen Status.

### Qualität
Jeder Datenpunkt hat ein Attribut `q` - *Qualität*.

## Verwendung
Die Beschreibung jeder unterstützten Methode finden Sie [Hier](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Es wird empfohlen, für die Kommunikation [Socket-Klasse](https://github.com/ioBroker/socket-client) zu verwenden.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 2.4.0 (2023-07-07)
(bluefox) extended the getObjects function with the possibility to read the list of IDs

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

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>