---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: tMg9bs8laDd02JYcEJwNoU9LIeXIWbRTszVkW2f7KfE=
---
# IoBroker.canbus
![Logo](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/canbus-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/canbus-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/crycode-de/iobroker.canbus.svg)
![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Testen und freigeben](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## CAN-Bus-Adapter für ioBroker
Dieser Adapter verbindet ioBroker mit einem Controller Area Network (CAN-Bus).

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Eigenschaften
* Empfangen und Senden von Rohnachrichten mit Standard-Frames und erweiterten Frames
* Jede Nachricht kann zum Empfangen und/oder Senden von Daten konfiguriert werden
* Möglichkeit zum automatischen Hinzufügen von Objekten für gesehene CAN-Nachrichten, die noch nicht konfiguriert sind
* Konfigurieren Sie Parser für jede Nachricht, um Daten aus dem/in den Rohnachrichtenpuffer zu lesen/schreiben
  * Numerische Typen
  * Boolesche Werte einschließlich Bitmasken-Unterstützung
  * Strings in verschiedenen Zeichenkodierungen
  * Benutzerdefinierte Skripte zum Lesen/Schreiben aus/in den Rohdatenpuffer
* Erweiterte Import-/Exportfunktion
  * Nachrichtenkonfigurationen importieren, um Ihre vorhandene Konfiguration zu erweitern
  * Importieren Sie vordefinierte "bekannte" Konfigurationen von GitHub innerhalb der Admin-Oberfläche
  * Exportieren und importieren Sie Ihre Nachrichtenkonfigurationen als `json`- oder `csv`-Dateien
* Optionale Unterstützung für feste Datenlängen (DLC)
* Optionale Unterstützung für das RTR-Flag
* Optionale Rohzustände mit rohen CAN-Nachrichtenobjekten
* Optional automatisch einen bestimmten Wert in einem bestimmten Intervall für jeden Parser setzen (nützlich zum Abfragen von Daten)

## Bedarf
* Linux-Betriebssystem (wegen der verwendeten Socketcan-Bibliothek)
* CAN-Hardware, die vom Kernel unterstützt wird und eine Schnittstelle wie `can0` . erstellt
* Einige Kenntnisse über die Nachrichten, die auf Ihrem CAN-Bus gesendet werden

##Parser
Mit Parsern können Sie Daten aus dem CAN-Nachrichtenpuffer lesen oder in diesen schreiben.

Für die folgenden Datentypen gibt es vordefinierte Parser.
Zusätzlich können Sie eigene Skripte schreiben, um Werte mit einem *benutzerdefinierten Parser* zu lesen/schreiben.

### Numerische Typen in *Big-Endian*- und *Little-Endian*-Darstellung
* Vorzeichenbehaftete und vorzeichenlose 8, 16 und 32 Bit Ganzzahl
* 32-Bit-Float
* 64-Bit-Doppel

###Boolean
* 1 Byte inklusive Bitmaskenunterstützung

### Zeichenfolge
* 1 bis 8 Byte Länge
* Kodierung: *ascii*, *base64*, *hex*, *latin1*, *utf8*, *utf16le*

### Benutzerdefiniert
Für einen benutzerdefinierten Parser müssen Sie ein eigenes Lese- und Schreibskript bereitstellen.
Diese Skripte sollten reines Javascript sein und werden in einer Sandbox ausgeführt.

In den Skripten können Sie die folgenden Funktionen verwenden:

* Die meisten von Node.js eingebauten Funktionen
* `async`/`warten`
* Adapter-Logfunktionen `log.warn('something')`, `log.info('something')`, `log.debug('something')`
* `getStateAsync('id')` und `getObjectAsync('id')` wobei `id` die vollständige ID des Zustands/Objekts ist

Fehler in den Skripten werden vom Adapter protokolliert.

In beiden Skripten sind die Variablen `buffer` und `value` vordefiniert.
`buffer` enthält immer den aktuellen Inhalt der CAN-Botschaft als Node.js-Puffer.

#### Benutzerdefiniertes Leseskript
In einem Leseskript müssen Sie die `value` aus der Variablen `buffer` lesen.

Am Anfang des benutzerdefinierten Leseskripts sind `buffer` die empfangenen/aktuellen CAN-Nachrichtendaten (wie im Zustand `.json`).
`value` sind `undefined` und sollten vom Skript gesetzt werden.

Der Inhalt der Variable `value` am Ende des benutzerdefinierten Leseskripts wird als neuer Wert für den Zustand verwendet.
Wenn `value` `undefined` ist, wird es ignoriert. Damit können Sie Nachrichten im benutzerdefinierten Leseskript nach Datenteilen filtern.

##### Beispiel für ein benutzerdefiniertes Leseskript
Prüfen Sie, ob die ersten drei Bytes im empfangenen Puffer mit festen Werten übereinstimmen.
Lesen Sie bei Übereinstimmung einen 16-Bit-Integer-Wert mit Vorzeichen aus den Pufferbytes 3 und 4 und dividieren Sie ihn durch 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Ursache von `value` wird nur gesetzt, wenn die ersten drei Bytes übereinstimmen, alle anderen Daten werden ignoriert und kein neuer Wert in den Zustand gesetzt.

#### Benutzerdefiniertes Schreibskript
In einem Schreibskript müssen Sie die Variable `buffer` ändern (oder ersetzen).

Zu Beginn des benutzerdefinierten Schreibskripts sind `buffer` die aktuellen CAN-Nachrichtendaten (wie im Zustand `.json`).
`value` wird auf den Wert des Zustands gesetzt, der in die `buffer` geschrieben werden soll.

Der Inhalt der Variable `buffer` am Ende des Custom Write Scripts wird als neue Daten für die CAN-Botschaft verwendet.

##### Beispiel für ein benutzerdefiniertes Schreibskript
Bereiten Sie einen neuen Puffer mit festen Werten vor.
Schreiben Sie den Zustandswert als vorzeichenbehaftete 16-Bit-Ganzzahl in den Puffer, beginnend mit dem fünften Byte im Puffer.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

Der neue `buffer` wird dann als `.json`-Zustand gesetzt.
Wenn die Option *autosend* für die Nachricht aktiviert ist, wird die Nachricht automatisch gesendet.

## Verwendung in Skripten
Sie können die Zustände `<messageId>.json` oder `<messageId>.<parserId>` in Ihren Skripten bearbeiten/ändern.

Zusätzlich können Sie die Zustände `raw.received` und `raw.send` verwenden, wenn Sie diese in der Adapterkonfiguration aktiviert haben.
Sie enthalten die stringifizierten JSON-Daten der Nachrichtendaten und können verwendet werden, um jede empfangene oder gesendete Nachricht unabhängig von den konfigurierten Nachrichten zu behandeln.
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

### 1.2.1 (2021-06-22)
* (crycode-de) Added option to automatically set a certain value in a given interval for each parser
* (crycode-de) Added checks for duplicate parser IDs
* (VeSler) Russian translation updates
* (crycode-de) Use inline sourcemaps for the adapter build files to make remote debugging work
* (crycode-de) Updated dependencies

### 1.1.4 (2021-04-30)
* (crycode-de) Added license information to import of well-known configurations
* (crycode-de) Fixed "Parser returned wrong data type undefined" log message
* (crycode-de) Updated dependencies

### 1.1.3 (2021-04-12)
* (crycode-de) Added definition of possible state values in admin
* (crycode-de) Added selection of the state role for each parser in admin
* (crycode-de) Fixed display bug of floating action buttons in admin
* (crycode-de) Export uses defaults if some config parts are not defined (e.g. if the config is from an older version)
* (crycode-de) Fixed wrong validation if a message/parser was deleted

### 1.1.2 (2021-04-06)
* (crycode-de) Added copy/paste function for message and parser configurations in admin

### 1.1.1 (2021-04-02)
* (crycode-de) Import bugfixes
* (crycode-de) Prevent wrong log warning if a parser returned undefined
* (crycode-de) Added react errorboundary for better clientside error handling

### 1.1.0 (2021-04-01)
* (crycode-de) Added import/export feature for messages in json or csv format
* (crycode-de) Added import of well known configurations from GitHub
* (crycode-de) Fixed config import in admin
* (crycode-de) Added ioBroker state data type option for custom parsers

### 1.0.2 (2021-03-26)
* (crycode-de) Fixed issue where missing state prevented custom parser write
* (DutchmanNL) Dutch translation updates
* (UncleSamSwiss) French translation updates
* (VeSler) Russian translation updates

### 1.0.1 (2021-03-12)
* (crycode-de) Use a queue to process _parser_ and _send_ state changes in the correct order
* (crycode-de) Fixed some spelling issues
* (crycode-de) Updated dependencies

### 1.0.0 (2021-02-23)
* (crycode-de) Sort messages in admin
* (VeSler) Russian admin translations
* (crycode-de) Updated dependencies

Older changelog is in CHANGELOG_OLD.md

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2021 Peter Müller <peter@crycode.de> (https://crycode.de/)