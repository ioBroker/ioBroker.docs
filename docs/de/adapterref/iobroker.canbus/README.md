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
![Anzahl Installationen (stabil)](https://iobroker.live/badges/canbus-stable.svg)
![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Testen und Freigeben](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## CAN-Bus-Adapter für ioBroker
Dieser Adapter verbindet ioBroker mit einem Controller Area Network (CAN-Bus).

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Merkmale
* Empfangen und Senden von Rohnachrichten mithilfe von Standard-Frames und erweiterten Frames
* Jede Nachricht kann für den Empfang und/oder das Senden von Daten konfiguriert werden
* Möglichkeit zum automatischen Hinzufügen von Objekten für gesehene CAN-Nachrichten, die noch nicht konfiguriert sind
* Konfigurieren Sie Parser für jede Nachricht, um Daten aus dem/in den Rohnachrichtenpuffer zu lesen/schreiben
* Numerische Typen
* Boolesche Werte einschließlich Bitmaskenunterstützung
* Zeichenfolgen in unterschiedlichen Zeichenkodierungen
* Benutzerdefinierte Skripte zum Lesen/Schreiben aus/in den Puffer der Rohdaten
* Erweiterte Import-/Exportfunktion
* Importieren Sie Nachrichtenkonfigurationen, um Ihre vorhandene Konfiguration zu erweitern
* Importieren Sie vordefinierte „bekannte“ Konfigurationen von GitHub innerhalb der Admin-Oberfläche
* Exportieren und importieren Sie Ihre Nachrichtenkonfigurationen als `json` oder `csv` Dateien
* Optionale Unterstützung für feste Datenlängen (DLC)
* Optionale Unterstützung für das RTR-Flag
* Optionale Rohzustände, die Roh-CAN-Nachrichtenobjekte enthalten
* Optional kann für jeden Parser automatisch ein bestimmter Wert in einem vorgegebenen Intervall festgelegt werden (nützlich für das Polling von Daten)

## Anforderungen
* Linux-Betriebssystem (aufgrund der verwendeten Socketcan-Bibliothek)
* CAN-Hardware, die vom Kernel unterstützt wird und eine Schnittstelle wie „can0“ erstellt
* Einige Kenntnisse über die Nachrichten, die auf Ihrem CAN-Bus gesendet werden

## Parser
Durch den Einsatz von Parsern können Sie Daten aus dem CAN-Nachrichtenpuffer lesen oder dorthin schreiben.

Für die folgenden Datentypen gibt es vordefinierte Parser.
Zusätzlich können Sie eigene Skripte schreiben, um Werte mit einem *benutzerdefinierten Parser* zu lesen/schreiben.

### Numerische Typen in *Big-Endian*- und *Little-Endian*-Darstellung
* Vorzeichenbehaftete und vorzeichenlose 8-, 16- und 32-Bit-Ganzzahlen
* 32-Bit-Float
* 64-Bit-Doppel

### Boolescher Wert
* 1 Byte einschließlich Bitmaskenunterstützung

### Zeichenfolge
* 1 bis 8 Byte Länge
* Kodierung: *ascii*, *base64*, *hex*, *latin1*, *utf8*, *utf16le*

### Brauch
Für einen benutzerdefinierten Parser müssen Sie Ihr eigenes Lese- und Schreibskript bereitstellen.
Diese Skripte sollten reines JavaScript sein und in einem begrenzten Umfang ausgeführt werden.

In den Skripten können Sie die folgenden Funktionen nutzen:

* Globals „undefiniert“, „NaN“, „isNaN“, „Infinity“, „isFinite“, „atob“, „btoa“,

`encodeURI`, `encodeURIComponent`, `decodeURI`, `decodeURIComponent`, `parseFloat`, `parseInt`, `JSON`, `Number`, §§ SSSSS_15§§, `Array`, `BigInt`, `Blob`, `Boolean`, `Date`, `Map`, `Math`, `Object`, `RegExp`, `Set`, `Intl`, `Buffer`, `Promise`, `setTimeout`, §§ SSSSS_30§§

* `async`/`warten`
* Adapter-Logfunktionen `log.warn('etwas')`, `log.info('etwas')`, `log.debug('etwas')`
* `getStateAsync('id')`, `getObjectAsync('id')`, `setStateAsync('id', 'value', ack)`, wobei `id` die Teil-ID des Status/Objekts unterhalb der aktuellen Adapterinstanz ist.
* `getForeignStateAsync('id')`, `getForeignObjectAsync('id')` und `setForeignStateAsync('id', 'value', ack)`, wobei `id` die vollständige ID des Status/Objekts ist
* Funktion `wait(ms)`, die ein Promise zurückgibt, das nach der angegebenen Zeit eingelöst wird
* Ein Objekt `sharedData`, das von allen benutzerdefinierten Skripten einer Adapterinstanz gemeinsam genutzt wird

Fehler in den Skripten werden vom Adapter protokolliert.

In beiden Skripten sind die Variablen `buffer` und `value` vordefiniert.
`buffer` enthält immer den aktuellen CAN-Nachrichteninhalt als Node.js-Buffer.

Das Objekt `sharedData` ist standardmäßig leer und kann verwendet werden, um einige Daten zwischen mehreren Aufrufen eines einzelnen benutzerdefinierten Parsers oder sogar zwischen mehreren benutzerdefinierten Parsern zu teilen.

#### Benutzerdefiniertes Leseskript
In einem Leseskript müssen Sie die Variable `value` aus der Variable `buffer` auslesen.

Zu Beginn des benutzerdefinierten Leseskripts ist `buffer` eine Kopie der empfangenen/aktuellen CAN-Nachrichtendaten (wie im Zustand `.json`).
`value` ist `undefined` und sollte vom Skript festgelegt werden.

Der Inhalt der Variable `value` am Ende des benutzerdefinierten Leseskripts wird als neuer Wert für den Status verwendet.
Wenn `value` gleich `undefined` ist, wird es ignoriert. Damit können Sie Nachrichten im benutzerdefinierten Leseskript nach Datenteilen filtern.

##### Beispiel für ein benutzerdefiniertes Leseskript
Überprüfen Sie die ersten drei Bytes im empfangenen Puffer auf Übereinstimmung mit festen Werten.
Wenn eine Übereinstimmung vorliegt, lesen Sie einen vorzeichenbehafteten 16-Bit-Integerwert aus den Pufferbytes 3 und 4 und dividieren Sie ihn durch 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Denn `value` wird nur gesetzt, wenn die ersten drei Bytes übereinstimmen, alle anderen Daten werden ignoriert und es wird kein neuer Wert für den Status gesetzt.

#### Benutzerdefiniertes Schreibskript
In einem Schreibskript müssen Sie die Variable `buffer` ändern (oder ersetzen).

Zu Beginn des benutzerdefinierten Schreibskripts ist `buffer` eine Kopie der aktuellen CAN-Nachrichtendaten (wie im Zustand `.json`).
`value` wird auf den Wert des Zustands gesetzt, der in `buffer` geschrieben werden soll.

Der Inhalt der Variable `buffer` am Ende des benutzerdefinierten Schreibskripts wird als neue Daten für die CAN-Nachricht verwendet.

Sie können den Schreibvorgang auch abbrechen, indem Sie `return false;` im benutzerdefinierten Schreibskript aufrufen.
Auf diese Weise können Sie Schreibvorgänge verhindern, wenn bestimmte Bedingungen nicht erfüllt sind.

##### Beispiel für ein benutzerdefiniertes Schreibskript
Bereiten Sie einen neuen Puffer mit festen Werten vor.
Schreiben Sie den Statuswert als vorzeichenbehaftete 16-Bit-Ganzzahl in den Puffer, beginnend beim fünften Byte im Puffer.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

Der neue `buffer` wird dann als Status `.json` festgelegt.
Wenn die Option *Autosend* für die Nachricht aktiviert ist, wird die Nachricht automatisch gesendet.

## Verwendung in Skripten
Sie können die Zustände `<messageId>.json` bzw. `<messageId>.<parserId>` in Ihren Skripten verarbeiten/ändern.

Zusätzlich können Sie die Zustände `raw.received` und `raw.send` verwenden, wenn Sie diese in der Adapterkonfiguration aktiviert haben.
Sie enthalten die in Zeichenfolgen umgewandelten JSON-Daten der Nachrichtendaten und können verwendet werden, um jede empfangene oder gesendete Nachricht unabhängig von den konfigurierten Nachrichten zu verarbeiten.
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

`ext` und `rtr` sind optional und entsprechen standardmäßig `false`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 1.3.1 (2022-04-19)

* (crycode-de) Fixed `autoSetValue` defaults for parsers
* (crycode-de) Fixed sentry admin integration
* (crycode-de) Updated dependencies

### 1.3.0 (2022-02-07)

* (crycode-de) Added `sharedData` object in custom parsers

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2024 Peter Müller <peter@crycode.de> (<https://crycode.de/>)