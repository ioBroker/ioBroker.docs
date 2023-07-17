---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: ktN1Y0ayr7SU7SvJzFhp9d5LF0yT8y6TQc/lpsl8Ozs=
---
![Logo](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Anzahl der Installationen](http://iobroker.live/badges/socketio-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
Dieser Adapter wird von WEB-Anwendungen und Adaptern verwendet, um über Websockets und das socket.io-Protokoll mit ioBroker zu kommunizieren.

**Wichtiger Hinweis: Seit v4.0 dieses Adapters werden ausschließlich reine Websockets verwendet! Socket.io wird nicht mehr durch die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!**

Benutzer können diesen Adapter verwenden, um ihre Produkte über Web-Sockets mit ioBroker zu verbinden.
Tatsächlich könnte dieser Adapter von Echarts, Vis und vielen anderen Adaptern verwendet werden, um Daten aus ioBroker zu extrahieren.

Wenn möglich, verwenden Sie bitte [`iobroker.ws`](https://github.com/ioBroker/ioBroker.ws) anstelle dieses Adapters.

Im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) finden Sie eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.

Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, etwas über die [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Objekt ist eine Beschreibung eines Datenpunkts oder einer Datengruppe. Die Gruppe könnte andere Datenpunkte enthalten, in diesem Fall wird sie als Kanal bezeichnet.
Besteht eine Gruppe aus anderen Kanälen, wird sie in diesem Fall als Gerät bezeichnet.

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
- Wenn vis die Lampe über WLAN einschalten möchte, sollte es den neuen Wert mit „{value: true, ack: false}“ setzen.
- Wenn die Lampe eingeschaltet wird, informiert sie HAA normalerweise über den neuen Status und der Wert sollte sofort mit „{value: true, ack: true}“ überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA über den neuen Status mit „{value: false, ack: true}“.

### Qualität
Jeder Datenpunkt hat ein Attribut `q` - *Qualität*.

## Verwendung
Die Beschreibung jeder unterstützten Methode finden Sie [Hier](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Es wird empfohlen, für die Kommunikation [Socket-Klasse](https://github.com/ioBroker/socket-client) zu verwenden.

## Optimierung von Web-Sockets
Bei einigen Web-Sockets-Clients gibt es ein Leistungsproblem bei der Kommunikation.
Manchmal ist dieses Problem darauf zurückzuführen, dass die Kommunikation von socket.io auf einen langen Abfragemechanismus zurückgreift.
Sie können die Option *Web-Sockets erzwingen* festlegen, um zu erzwingen, dass nur der Web-Sockets-Transport verwendet wird.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 6.4.0 (2023-07-07)
(bluefox) extended the getObjects function with the possibility to read the list of IDs

### 6.3.5 (2023-03-17)
* (bluefox) Increased the max size of the message to 200MB

### 6.3.4 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 6.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 6.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

### 6.2.0 (2022-11-08)
* (Apollon77) Prepare for future js-controller versions
* (bluefox) Function `getObjects` for web was extended by devices, channels and enums

### 6.1.10 (2022-08-24)
* (bluefox) Caught error by subscribe

### 6.1.8 (2022-07-08)
* (bluefox) Corrected getAdapterInstances method

## License

The MIT License (MIT)

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>