---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: AsmePoTscNwWtzLsi82WDRG9EPTCLQmIlZFVoUGldy8=
---
# IoBroker.canbus
![Logo](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/canbus-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/canbus-stable.svg)
![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Testen und Freigeben](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## CAN-Bus-Adapter für ioBroker
Dieser Adapter verbindet ioBroker mit einem Controller Area Network (CAN-Bus).

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Merkmale
* Empfangen und Senden von Rohnachrichten mit Standard-Frames und erweiterten Frames
* Jede Nachricht kann für den Empfang und/oder das Senden von Daten konfiguriert werden
* Möglichkeit, automatisch Objekte für gesehene CAN-Nachrichten hinzuzufügen, die noch nicht konfiguriert sind
* Konfigurieren Sie Parser für jede Nachricht, um Daten aus dem/in den Rohnachrichtenpuffer zu lesen/schreiben
* Numerische Typen
* Boolesche Werte einschließlich Bitmaskenunterstützung
* Zeichenfolgen in verschiedenen Zeichenkodierungen
* Benutzerdefinierte Skripte zum Lesen/Schreiben aus/in den Puffer der Rohdaten
* Erweiterte Import-/Exportfunktion
* Importieren Sie Nachrichtenkonfigurationen, um Ihre vorhandene Konfiguration zu erweitern
* Importieren Sie vordefinierte „bekannte“ Konfigurationen von GitHub innerhalb der Admin-Oberfläche
* Exportieren und importieren Sie Ihre Nachrichtenkonfigurationen als JSON- oder CSV-Dateien
* Optionale Unterstützung für feste Datenlängen (DLC)
* Optionale Unterstützung für das RTR-Flag
* Optionale Rohzustände, die rohe CAN-Nachrichtenobjekte enthalten
* Optional kann für jeden Parser automatisch ein bestimmter Wert in einem bestimmten Intervall festgelegt werden (nützlich für die Abfrage von Daten).

## Anforderungen
* Linux-Betriebssystem (aufgrund der verwendeten Socketcan-Bibliothek)
* CAN-Hardware, die vom Kernel unterstützt wird und eine Schnittstelle wie „can0“ erstellt
* Einige Kenntnisse über die Nachrichten, die auf Ihrem CAN-Bus gesendet werden

## Parser
Mithilfe von Parsern können Sie Daten aus dem CAN-Nachrichtenpuffer lesen oder in diesen schreiben.

Für die folgenden Datentypen stehen vordefinierte Parser zur Verfügung.
Zusätzlich können Sie eigene Skripte zum Lesen/Schreiben von Werten mit einem *benutzerdefinierten Parser* schreiben.

### Numerische Typen in *Big-Endian*- und *Little-Endian*-Darstellung
* Vorzeichenbehaftete und vorzeichenlose 8-, 16- und 32-Bit-Ganzzahlen
* 32-Bit-Float
* 64-Bit-Doppel

### Boolesch
* 1 Byte einschließlich Bitmaskenunterstützung

### Zeichenfolge
* 1 bis 8 Byte Länge
* Kodierung: *ascii*, *base64*, *hex*, *latin1*, *utf8*, *utf16le*

### Brauch
Für einen benutzerdefinierten Parser müssen Sie ein eigenes Lese- und Schreibskript bereitstellen.
Diese Skripte sollten reines JavaScript sein und in einem begrenzten Umfang ausgeführt werden.

In den Skripten können Sie die folgenden Funktionen nutzen:

* Globals „undefiniert“, „NaN“, „isNaN“, „Infinity“, „isFinite“, „atob“, „btoa“,

`encodeURI`, `encodeURIComponent`, `decodeURI`, `decodeURIComponent`, `parseFloat`, `parseInt`, `JSON`, `Number`, `String`, `Array`, `BigInt`, `Blob`, `Boolean`, `Date`, `Map`, `Math`, `Object`, `RegExp`, `Set`, `Intl`, `Buffer`, `Promise`, `setTimeout`, `clearTimeout`

* `async`/`await`
* Adapter-Protokollfunktionen `log.warn('etwas')`, `log.info('etwas')`, `log.debug('etwas')`
* `getStateAsync('id')`, `getObjectAsync('id')`, `setStateAsync('id', 'value', ack)`, wobei `id` die Teil-ID des Status/Objekts unterhalb der aktuellen Adapterinstanz ist
* `getForeignStateAsync('id')`, `getForeignObjectAsync('id')` und `setForeignStateAsync('id', 'value', ack)`, wobei `id` die vollständige ID des Status/Objekts ist
* Funktion `wait(ms)`, die ein Promise zurückgibt, das nach der angegebenen Zeit eingelöst wird
* Ein Objekt `sharedData`, das von allen benutzerdefinierten Skripten einer Adapterinstanz gemeinsam genutzt wird

Fehler in den Skripten werden vom Adapter protokolliert.

In beiden Skripten sind die Variablen `buffer` und `value` vordefiniert.
`buffer` enthält immer den aktuellen CAN-Nachrichteninhalt als Node.js-Puffer.

Das Objekt `sharedData` ist standardmäßig leer und kann verwendet werden, um einige Daten zwischen mehreren Aufrufen eines einzelnen benutzerdefinierten Parsers oder sogar zwischen mehreren benutzerdefinierten Parsern gemeinsam zu nutzen.

#### Benutzerdefiniertes Leseskript
In einem Leseskript müssen Sie die Variable `value` aus der Variable `buffer` auslesen.

Zu Beginn des benutzerdefinierten Leseskripts ist `buffer` eine Kopie der empfangenen/aktuellen CAN-Nachrichtendaten (wie im Zustand `.json`).
`value` wird zu `undefined` und sollte vom Skript festgelegt werden.

Der Inhalt der Variable `value` am Ende des benutzerdefinierten Leseskripts wird als neuer Wert für den Status verwendet.
Wenn `value` gleich `undefined` ist, wird es ignoriert. Dadurch können Sie Nachrichten im benutzerdefinierten Leseskript nach Datenteilen filtern.

##### Beispiel für ein benutzerdefiniertes Leseskript
Überprüfen Sie die ersten drei Bytes im Empfangspuffer auf Übereinstimmung mit festen Werten.
Bei Übereinstimmung lesen Sie einen vorzeichenbehafteten 16-Bit-Integer-Wert aus den Pufferbytes 3 und 4 und dividieren ihn durch 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Ursache für `value` ist, dass es nur gesetzt wird, wenn die ersten drei Bytes übereinstimmen, alle anderen Daten werden ignoriert und es wird kein neuer Wert für den Status gesetzt.

#### Benutzerdefiniertes Schreibskript
In einem Schreibskript müssen Sie die Variable `buffer` ändern (oder ersetzen).

Zu Beginn des benutzerdefinierten Schreibskripts ist `buffer` eine Kopie der aktuellen CAN-Nachrichtendaten (wie im Zustand `.json`).
`value` wird auf den Wert des Zustands gesetzt, der in `buffer` geschrieben werden soll.

Der Inhalt der Variable `buffer` am Ende des benutzerdefinierten Schreibskripts wird als neue Daten für die CAN-Nachricht verwendet.

Sie können den Schreibvorgang auch abbrechen, indem Sie im benutzerdefinierten Schreibskript `return false;` aufrufen.
So können Sie Schreibvorgänge verhindern, wenn bestimmte Bedingungen nicht erfüllt sind.

##### Beispiel für ein benutzerdefiniertes Schreibskript
Bereiten Sie einen neuen Puffer mit festen Werten vor.
Schreiben Sie den Statuswert als vorzeichenbehaftete 16-Bit-Ganzzahl in den Puffer, beginnend beim fünften Byte im Puffer.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

Der neue Status `buffer` wird dann als Status `.json` festgelegt.
Wenn die Option „Autosenden“ für die Nachricht aktiviert ist, wird die Nachricht automatisch gesendet.

## Verwendung in Skripten
Sie können die Zustände `<messageId>.json` oder `<messageId>.<parserId>` in Ihren Skripten verarbeiten/ändern.

Zusätzlich können Sie die Zustände `raw.received` und `raw.send` verwenden, sofern Sie diese in der Adapterkonfiguration aktiviert haben.
Sie enthalten die stringifizierten JSON-Daten der Nachrichtendaten und können verwendet werden, um jede empfangene oder gesendete Nachricht unabhängig von den konfigurierten Nachrichten zu verarbeiten.
Durch Schreiben von JSON-Daten in den Zustand `raw.send` können Sie CAN-Nachrichten mit beliebigen Daten senden.

### Beispiel für ein Rohnachrichtenobjekt
```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` und `rtr` sind optional und standardmäßig `false`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 2.0.0 (2024-11-02)

* (crycode-de) Node.js >= 18, Admin >= 6.17, js-contoller >= 5.0.19 are required
* (crycode-de) Changed how custom parser scripts are interpreted. Most custom parser scripts should work as before but they have a limited scope now.
* (crycode-de) Custom parser scripts now support `getStateAsync`, `getForeignStateAsync`, `getObjectAsync` and `getForeignObjectAsync`. If you have used `getStateAsync`/`getObjectAsync` before you need to change them to `getForeignStateAsync`/`getForeignObjectAsync` or update the IDs if you get data from the same adapter instance.
* (crycode-de) Custom write parser scripts an now return false to cancel the write
* (crycode-de) Updated dependencies

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2025 Peter Müller <peter@crycode.de> (<https://crycode.de/>)