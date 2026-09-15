---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: hN8WxkqVF1rB30WnUdna7GPeePw+p8pCDoy+COXmG+w=
---
# ioBroker.canbus

![NPM-Version](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/canbus-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/canbus-stable.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)
![Test und Freigabe](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

![Logo](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

## CAN-Bus-Adapter für ioBroker

Dieser Adapter verbindet ioBroker mit einem Controller Area Network (CAN-Bus).

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Merkmale

- Empfangen und Senden von Rohnachrichten mithilfe von Standard-Frames und erweiterten Frames
- Jede Nachricht kann für den Empfang und/oder das Senden von Daten konfiguriert werden.
- Möglichkeit, Objekte für erkannte CAN-Nachrichten automatisch hinzuzufügen, die noch nicht konfiguriert sind
- Konfigurieren Sie Parser für jede Nachricht, um Daten aus dem Rohnachrichtenpuffer zu lesen/in diesen zu schreiben.
  - Numerische Typen
  - Boolesche Werte einschließlich Bitmaskenunterstützung
  - Zeichenketten in verschiedenen Zeichenkodierungen
  - Benutzerdefinierte Skripte zum Lesen/Schreiben aus/in den Puffer von Rohdaten
- Erweiterte Import-/Exportfunktion
  - Importieren Sie Nachrichtenkonfigurationen, um Ihre bestehende Konfiguration zu erweitern.
  - Importieren Sie vordefinierte, „bekannte“ Konfigurationen von GitHub über die Admin-Oberfläche.
  - Exportieren und importieren Sie Ihre Nachrichtenkonfigurationen als`json` oder`csv` Dateien
- Optionale Unterstützung für feste Datenlängen (DLC)
- Optionale Unterstützung für das RTR-Flag
- Optionale Rohzustände, die rohe CAN-Nachrichtenobjekte enthalten
- Optional: Automatische Festlegung eines bestimmten Werts in einem vorgegebenen Intervall für jeden Parser (nützlich für die Datenabfrage).

## Anforderungen

- Linux-Betriebssystem (wegen der verwendeten socketcan-Bibliothek)
- CAN-Hardware, die vom Kernel unterstützt wird und eine Schnittstelle wie diese erstellt`can0`
- Kenntnisse über die Nachrichten, die über den CAN-Bus gesendet werden

## Parser

Mithilfe von Parsern können Sie Daten aus dem CAN-Nachrichtenpuffer lesen oder in diesen schreiben.

Für die folgenden Datentypen sind vordefinierte Parser vorhanden.\
&#x20;Darüber hinaus können Sie eigene Skripte schreiben, um Werte mit einem _benutzerdefinierten Parser_ zu lesen/schreiben.

### Numerische Datentypen in _Big-Endian-_ und _Little-Endian_ -Darstellung

- Vorzeichenbehaftete und vorzeichenlose 8-, 16- und 32-Bit-Ganzzahlen
- 32-Bit-Gleitkommazahl
- 64-Bit-Doppelbit

### Boolescher Wert

- 1 Byte inklusive Bitmaskenunterstützung

### Zeichenkette

- 1 bis 8 Byte Länge
- Kodierung: _ASCII_ , _Base64_ , _Hexadezimal_ , _Latin-1_ , _UTF-8_ , _UTF-16LE_

### Brauch

Für einen benutzerdefinierten Parser müssen Sie Ihr eigenes Lese- und Schreibskript bereitstellen.\
&#x20;Diese Skripte sollten reines JavaScript sein und nur in einem begrenzten Bereich ausgeführt werden.

In den Skripten stehen Ihnen folgende Funktionen zur Verfügung:

- Globals`undefined` ,`NaN` ,`isNaN` ,`Infinity` ,`isFinite` ,`atob` ,`btoa` ,`encodeURI` ,`encodeURIComponent` ,`decodeURI` ,`decodeURIComponent` ,`parseFloat` ,`parseInt` ,`JSON` ,`Number` ,`String` ,`Array` ,`BigInt` ,`Blob` ,`Boolean` ,`Date` ,`Map` ,`Math` ,`Object` ,`RegExp` ,`Set` ,`Intl` ,`Buffer` ,`Promise` ,`setTimeout` ,`clearTimeout`
- `async` /`await`
- Adapter-Protokollfunktionen`log.warn('something')` ,`log.info('something')` ,`log.debug('something')`
- `getStateAsync('id')` ,`getObjectAsync('id')` ,`setStateAsync('id', 'value', ack)` Wo`id` ist die partielle ID des Zustands/Objekts unterhalb der aktuellen Adapterinstanz.
- `getForeignStateAsync('id')` ,`getForeignObjectAsync('id')` Und`setForeignStateAsync('id', 'value', ack)` Wo`id` ist die vollständige ID des Zustands/Objekts
- Funktion`wait(ms)` das ein Promise zurückgibt, das nach der angegebenen Zeit aufgelöst wird.
- Ein Objekt`sharedData` die von allen benutzerdefinierten Skripten einer Adapterinstanz gemeinsam genutzt wird.

Fehler in den Skripten werden vom Adapter protokolliert.

In beiden Skripten sind die Variablen`buffer` Und`value` sind vordefiniert.\
`buffer` Enthält immer den aktuellen CAN-Nachrichteninhalt als Node.js-Puffer.

Der`sharedData` Das Objekt ist standardmäßig leer und kann verwendet werden, um Daten zwischen mehreren Aufrufen eines einzelnen benutzerdefinierten Parsers oder sogar zwischen mehreren benutzerdefinierten Parsern gemeinsam zu nutzen.

#### Benutzerdefiniertes Leseskript

In einem Leseskript müssen Sie lesen`value` von`buffer` Variable.

Am Anfang des benutzerdefinierten Leseskripts,`buffer` wird eine Kopie der empfangenen/aktuellen CAN-Nachrichtendaten sein (wie in der`.json` Zustand).`value` wird sein`undefined` und sollte vom Skript festgelegt werden.

Der Inhalt des`value` Die Variable am Ende des benutzerdefinierten Leseskripts wird als neuer Wert für den Status verwendet.\
&#x20;Wenn`value` Ist`undefined` Sie wird ignoriert. Damit können Sie Nachrichten im benutzerdefinierten Leseskript nach Datenbestandteilen filtern.

##### Beispiel für ein benutzerdefiniertes Leseskript

Prüfen Sie, ob die ersten drei Bytes im empfangenen Puffer mit den festgelegten Werten übereinstimmen.\
&#x20;Wenn eine Übereinstimmung gefunden wird, wird aus den Pufferbytes 3 und 4 ein 16-Bit-Ganzzahlwert mit Vorzeichen gelesen und durch 10 geteilt.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Ursache von`value` wird nur dann gesetzt, wenn die ersten drei Bytes übereinstimmen; alle anderen Daten werden ignoriert und setzen keinen neuen Wert für den Zustand.

#### Benutzerdefiniertes Schreibskript

In einem Schreibskript müssen Sie Folgendes ändern (oder ersetzen):`buffer` Variable.

Am Anfang des benutzerdefinierten Schreibskripts,`buffer` wird eine Kopie der aktuellen CAN-Nachrichtendaten sein (wie in der`.json` Zustand).`value` wird auf den Wert des Zustands gesetzt, der in die Datei geschrieben werden soll.`buffer` Die

Der Inhalt des`buffer` Die Variable am Ende des benutzerdefinierten Schreibskripts wird als neue Daten für die CAN-Nachricht verwendet.

Sie können den Schreibvorgang auch stornieren, indem Sie anrufen.`return false;` im benutzerdefinierten Schreibskript. Dies ermöglicht es Ihnen, Schreibvorgänge zu verhindern, wenn bestimmte Bedingungen nicht erfüllt sind.

##### Beispiel für ein benutzerdefiniertes Schreibskript

Bereiten Sie einen neuen Puffer mit festen Werten vor.\
&#x20;Schreibe den Zustandswert als vorzeichenbehaftete 16-Bit-Ganzzahl in den Puffer, beginnend mit dem fünften Byte im Puffer.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

Das neue`buffer` wird dann als die`.json` Zustand.\
&#x20;Wenn die Option _„Automatisch senden_ “ für die Nachricht aktiviert ist, wird die Nachricht automatisch gesendet.

## Verwendung in Skripten

Sie können die`<messageId>.json` oder`<messageId>.<parserId>` Zustände in Ihren Skripten.

Darüber hinaus können Sie die`raw.received` Und`raw.send` Zustände, sofern diese in der Adapterkonfiguration aktiviert sind.\
&#x20;Sie enthalten die als JSON-String formatierten Nachrichtendaten und können verwendet werden, um jede empfangene oder gesendete Nachricht unabhängig von den konfigurierten Nachrichten zu verarbeiten. Durch das Schreiben von JSON-Daten in die`raw.send` Sie erklären, dass Sie CAN-Nachrichten senden können, die beliebige Daten enthalten.

### Beispiel für ein rohes Nachrichtenobjekt

```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` Und`rtr` sind optional und haben standardmäßig den Wert`false` Die

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.1 (2025-10-25)

* (crycode-de) Updated Sentry DSN

### 2.3.0 (2025-10-03)

* (crycode-de) Support for Node.js 24
* (crycode-de) js-controller >= 6.0.11, Admin >= 7.6.17 required
* (crycode-de) Fixed issue with importing configurations
* (crycode-de) Updated dependencies

### 2.2.0 (2025-05-27)

* (crycode-de) Node.js >= 20 and <23, Admin >= 7.4.10 required
* (crycode-de) Optimized admin layout for smaller devices and added a warning on very small devices
* (crycode-de) Updated dependencies

### 2.1.1 (2024-11-04)

* (crycode-de) Fixed get/set functions in custom parser scripts

### 2.1.0 (2024-11-03)

* (crycode-de) Allow `setStateAsync` and `setForeignStateAsync` in custom parser scripts
* (crycode-de) Allow `setTimeout` and `clearTimeout` in custom parser scripts (using the adapters setTimeout implementation)
* (crycode-de) Added `wait` function to custom parser scripts

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2026 Peter Müller <peter@crycode.de> (<https://crycode.de/>)