---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-alarmserver
hash: z4bWsccAq81OoH3wJSHVUjcPMdJoHpYRUiVyoPw9AAA=
---
![Logo](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![Anzahl der Installationen](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![NPM](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)

# IoBroker.hikvision-alarmserver
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## Hikvision Alarm Server-Adapter für ioBroker
Ein Adapter zum Empfangen von Alarmen/Ereignissen, die von Hikvision-Kameras gesendet werden.

Getestet mit Hikvision-Modellen:

- DS-2CD2043G2-I
- DS-2CD2143G2-I
- DS-2DE2A404IW-DE3
- DS-2DE3A404IW-DE/W

Erfolgs-/Fehler-/Fehlerberichte sind willkommen, wenn Sie ein Modell haben, das nicht in dieser Liste enthalten ist.

## Verwendung
Die Adapterinstanz erstellt einen booleschen Zustand für jede gemeldete Kombination aus Kamera/Ereignistyp. Kameras werden anhand der MAC-Adresse identifiziert (begrenzt durch die von der Kamera bereitgestellten Informationen).

Es scheint, dass Kameras jede Sekunde wiederholt Ereignisse ausgeben, wenn diese Ereignisse noch gültig sind, aber keine Nachricht gesendet wird, um sie zu löschen. Aus diesem Grund löscht der Adapter automatisch Ereignisse, die länger als 5 Sekunden nicht erneut gemeldet wurden.

## Aufbau
### IoBroker
#### Netzwerk
Wählen Sie in der Adapterkonfiguration einen freien Port aus, auf dem der Adapter lauschen soll (standardmäßig 8089).

#### Alarmzeitüberschreitung
Die meisten Geräte signalisieren, dass ein Alarm *aktiv* ist, indem sie ständig Warnmeldungen senden. Diese Geräte senden niemals eine *inaktive* Nachricht. Daher geht der Adapter davon aus, dass ein Alarm gelöscht wird, wenn nach einer bestimmten Zeitspanne keine Nachricht empfangen wird. Geben Sie diesen Zeitraum hier an (Standard 5000 ms).

#### Kanalbaum
Einige Kameras (z. B. mit mehreren Sensoren) melden auf mehreren Kanälen (nicht zu verwechseln mit ioBroker-Kanälen). Um Ereignisse zwischen den einzelnen Kanälen der Kamera zu unterscheiden, aktivieren Sie die entsprechende Option.

Bei bestimmten Ereignistypen (z. B. Felderkennung, Linienüberquerung usw.) sind einige Kameras in der Lage, Bewegungserkennungsziele (z. B. Mensch, Fahrzeug usw.) zu identifizieren. Um einen Status für jedes dieser Ziele unter jedem anwendbaren Ereignistyp zu erstellen, aktivieren Sie die entsprechende Option.

#### Senden an
Einige empfangene Ereignistypen haben ein einfaches boolesches Ein/Aus (Dauer, VMD usw.). Für diese einfachen Ereignisse reicht es aus, den entsprechenden Status im Objektbaum von ioBroker zu setzen.

Einige empfangene Ereignisse enthalten jedoch Binärdaten wie Bilder, die nicht ständig im ioBroker-Objektbaum gespeichert werden könnten. Ein eleganterer Mechanismus zur Handhabung solcher Ereignisse ist die Verwendung des eingebauten Messaging-Systems von ioBroker, das die Kommunikation von Nachrichtenobjekten zwischen Adaptern ermöglicht.

Obwohl diese Funktion hauptsächlich für Bilder konzipiert ist, wird das Senden, das durch einfache XML-Teile ausgelöst wird, ebenfalls unterstützt.

Die genaue gesendete Nachricht ist in den Feldern `Send to message...` konfigurierbar. Diese Felder werden mit dem JavaScript-Objekt `Function` ausgewertet und haben zwei verfügbare Variablen: `ctx` (das Ereigniskontextobjekt - siehe unten) und im Fall von Bildteilen steht der Rohpuffer in §§SSSSS_3§ zur Verfügung. §.

##### Beispiel 1: Senden Sie eine Textbenachrichtigung bei jedem Ereignis, das über Telegram empfangen wird
Wenn der Telegram-Adapter implementiert wurde, könnte man im Abschnitt `XML event parts` folgende Parameter setzen:

* An Instanz für XML senden: `telegram.0`
* Befehl „Senden an“ für XML: Leer lassen
* Senden an Nachricht für XML: Beachten Sie, dass Backticks Teil des konfigurierten Werts sind - `` `Received ${ctx.eventType} from ${ctx.deviceName}` ``

##### Beispiel 2: Bilder per Telegram versenden
Wenn der Telegram-Adapter implementiert wurde, könnte man im Abschnitt `Image event parts` folgende Parameter setzen:

* Für Bilder an Instanz senden: `telegram.0`
* An Befehl für Bilder senden: Leer lassen
* Für Bilder an Nachricht senden: `{ text: imageBuffer, type: 'photo' }`

##### Beispiel 3: Bilder an benutzerdefiniertes Javascript senden
Ein komplexeres Beispiel besteht darin, jeden empfangenen Bildpuffer an ein benutzerdefiniertes Skript zu senden, das in einem Javascript-Adapter ausgeführt wird:

* An Instanznamen senden: `javascript.0`
* Senden an Befehl: `toScript` (dies ist kein Beispiel - die Literalzeichenfolge ist erforderlich).
* Senden an Nachricht: `{ script: 'script.js.myImageHandler', message: 'myImageReceiver', data: { device: ctx.device, image: imageBuffer } }`

Erstellen Sie im Javascript-Adapter (Instanz Null) ein Skript mit dem Namen `myImageHandler` und fügen Sie diesen Code hinzu:

```javascript
onMessage('myImageReceiver', (data, cb) => {
  // data.device holds mac address of device (colons stripped).
  // data.image holds raw image buffer.
  ...
  cb();
});
```

##### Ereigniskontextobjekt
Der Ereigniskontext `ctx` hat folgende Eigenschaften:

- `macAdresse`
- "Ereignistyp".
- `Erkennungsziel`
- "Kanalname".
- `device` - MAC-Adresse mit entfernten Anführungszeichen (aus Gründen der Konsistenz mit net-tools).
- `deviceName` - Von net-tools abgeleiteter Hostname oder Kopie von `device`, falls nicht gefunden.
- `stateId` - Zustands-ID, die dieses Ereignis auslöst.
- "eventLogged" - Boolescher Wert, der angibt, dass ein Zustand ordnungsgemäß ausgelöst wurde. Sollte immer stimmen.
- `xml` - Geparste XML-Daten.
- `ts` - JavaScript `Date`-Objekt erstellt aus `dateTime` in der Ereignisnachricht (oder Zeit, zu der das Ereignis empfangen wurde, falls nicht verfügbar).
- `periodPath` - Dateisystemordner, in dem Ereignisteile derzeit gespeichert werden (ändert sich jeden Tag).
- `fileBase` - Präfix für alle gespeicherten Teile der aktuellen Nachricht.
- `files` - Array, das die Dateinamen (einschließlich vollständiger Pfade) aller Dateien enthält, die als Teil der Verarbeitung der aktuellen Nachricht ausgegeben wurden.

#### Ereignisdaten werden gespeichert
Wenn aktiviert, werden XML- und/oder Bilddaten auf dem lokalen Dateisystem unter `iobroker-data/hikvision-alarmserver.<instance>` gespeichert.

*Warnung!* Diese Dateien werden derzeit nicht gelöscht oder archiviert, verwenden Sie sie daher mit Vorsicht oder implementieren Sie eine externe Strategie dafür.

### Vor der Kamera
Besuchen Sie die Konfigurationsseite Ihrer Kamera(s) und definieren Sie die IP-/Host- und Porteinstellungen von ioBroker:

![Alarmserver-Optionen](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

Stellen Sie sicher, dass die Verknüpfung in den Ereignissen, die Sie ioBroker melden möchten, „Überwachungszentrum benachrichtigen“ enthält. Z.B:

![Bewegungserkennungsoptionen](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.1.0 (2023-01-24)
-   (Robin Rainton) Added configuration for alarm timeout ([#16](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/16)).
-   (Robin Rainton) Fixed multipart message handling for line crossing/field detection, etc ([#18](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/18)).
-   (Robin Rainton) Optionally save XML/images & send events using `sendTo` to other adapters ([#20](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/20) & [#26](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/26)).
-   (Robin Rainton) Added info.connection state ([#22](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/22)).
-   (Robin Rainton) Handle cases where `TargetRect` is specified in decimals between zero & one ([#24](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/24)).

### 0.0.7 (2022-12-29)
-   (Robin Rainton) Add bind address option ([#9](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/9)).
-   (Robin Rainton) Try to derive device names from net-tools. Optionally use channelName from devices ([#10](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/10)).

### 0.0.6 (2022-12-13)
-   (Robin Rainton) Handle multipart message payload ([#5](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/5)).
-   (Robin Rainton) Handle payloads without XML declaration ([#7](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/7).)

### 0.0.5 (2022-12-10)
-   (Robin Rainton) Drop colons from device IDs.

### 0.0.2
-   (Robin Rainton) initial release.

## License
MIT License

Copyright (c) 2022-2023 Robin Rainton <robin@rainton.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.