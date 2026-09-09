---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-alarmserver
hash: HhJp+KJDP5CyasLVEgwaSnnE747GGYp7YZkct9Mi2QM=
---
![Logo](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![Anzahl der Installationen](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![NPM](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

# ioBroker.hikvision-alarmserver

## Hikvision Alarm Server-Adapter für ioBroker

Ein Adapter zum Empfangen von Alarmen/Ereignissen, die von Hikvision-Kameras gesendet werden.

Getestet mit Hikvision-Modellen:

- DS-2CD2043G2-I
- DS-2CD2143G2-I
- DS-2DE2A404IW-DE3
- DS-2DE3A404IW-DE/W

Wir freuen uns über Berichte zu Erfolgen, Misserfolgen und Fehlern, falls Ihr Modell nicht in dieser Liste enthalten ist.

## Verwendung

Die Adapterinstanz erzeugt für jede Kombination aus Kamera und gemeldetem Ereignistyp einen booleschen Zustand. Kameras werden anhand ihrer MAC-Adresse identifiziert (beschränkt durch die von der Kamera bereitgestellten Informationen).

Anscheinend senden Kameras jede Sekunde wiederholt Ereignisse, obwohl diese noch gültig sind, ohne dass eine Nachricht zum Löschen dieser Ereignisse gesendet wird. Aus diesem Grund löscht der Adapter automatisch Ereignisse, die länger als 5 Sekunden nicht erneut gemeldet wurden.

## Konfiguration

### ioBroker

#### Netzwerk

Wählen Sie in der Adapterkonfiguration einen freien Port aus, an dem der Adapter lauschen soll (standardmäßig 8089).

#### Alarm-Timeout

Die meisten Geräte signalisieren einen _aktiven_ Alarm durch das kontinuierliche Senden von Warnmeldungen. Diese Geräte senden niemals eine _Inaktivitätsmeldung_ . Daher geht der Adapter davon aus, dass ein Alarm gelöscht ist, wenn nach einer bestimmten Zeitspanne keine Meldung empfangen wird. Geben Sie diese Zeitspanne hier an (Standard: 5000 ms).

#### Kanalbaum

Manche Kameras (z. B. mit mehreren Sensoren) senden Daten über mehrere Kanäle (nicht zu verwechseln mit ioBroker-Kanälen). Um Ereignisse auf den einzelnen Kamerakanälen zu unterscheiden, aktivieren Sie die entsprechende Option.

Bei bestimmten Ereignistypen (z. B. Felderkennung, Linienüberschreitung usw.) können einige Kameras Bewegungserkennungsziele (z. B. Personen, Fahrzeuge usw.) identifizieren. Um für jedes dieser Ziele unter jedem zutreffenden Ereignistyp einen Status zu erstellen, aktivieren Sie die entsprechende Option.

#### senden an

Einige empfangene Ereignistypen verfügen über einen einfachen booleschen Ein-/Aus-Status (Dauer, VMD usw.). Für diese einfachen Ereignisse genügt es, den entsprechenden Status im Objektbaum von ioBroker zu setzen.

Allerdings enthalten manche empfangene Ereignisse Binärdaten wie Bilder, deren dauerhafte Speicherung im ioBroker-Objektbaum unpraktisch wäre. Ein eleganterer Mechanismus zur Verarbeitung solcher Ereignisse ist die Verwendung des integrierten Nachrichtensystems von ioBroker, das die Kommunikation von Nachrichtenobjekten zwischen Adaptern ermöglicht.

Diese Funktion ist zwar hauptsächlich für Bilder konzipiert, unterstützt aber auch das Senden von Inhalten, die durch einfache XML-Teile ausgelöst werden.

Die genaue Nachricht, die gesendet wird, kann in der Konfiguration festgelegt werden.`Send to message...` Felder. Diese Felder werden mit JavaScript ausgewertet.`Function` Das Objekt verfügt über zwei verfügbare Variablen:`ctx` (das Ereigniskontextobjekt – siehe unten) und im Falle von Bildteilen ist der Rohpuffer verfügbar in`imageBuffer` Die

##### Beispiel 1: Senden einer Textbenachrichtigung bei jedem über Telegram empfangenen Ereignis

Wenn der Telegram-Adapter implementiert wurde, können die folgenden Parameter im`XML event parts` Abschnitt:

- An Instanz für XML senden:`telegram.0`
- Befehl für XML senden: Leer lassen
- An Nachricht senden für XML: Beachten Sie, dass Backticks Teil des konfigurierten Werts sind -`` `Received ${ctx.eventType} from ${ctx.deviceName}` ``

##### Beispiel 2: Bilder über Telegram senden

Wenn der Telegram-Adapter implementiert wurde, können die folgenden Parameter im`Image event parts` Abschnitt:

- An Instanz senden, um Bilder zu erhalten:`telegram.0`
- An Befehl zum Abrufen von Bildern senden: Leer lassen
- Senden Sie eine Nachricht, um Bilder zu erhalten:`{ text: imageBuffer, type: 'photo' }`

##### Beispiel 3: Bilder an benutzerdefiniertes JavaScript senden

Ein komplexeres Beispiel ist das Senden jedes empfangenen Bildpuffers an ein benutzerdefiniertes Skript, das innerhalb eines Javascript-Adapters ausgeführt wird:

- An Instanznamen senden:`javascript.0`
- An den Befehl senden:`toScript` (Dies ist kein Beispiel – die Zeichenkette muss wörtlich angegeben werden).
- An Nachricht senden:`{ script: 'script.js.myImageHandler', message: 'myImageReceiver', data: { device: ctx.device, image: imageBuffer } }`

Erstellen Sie innerhalb des Javascript-Adapters (Instanz null) ein Skript mit dem Namen`myImageHandler` und fügen Sie diesen Code hinzu:

```javascript
onMessage('myImageReceiver', (data, cb) => {
  // data.device holds mac address of device (colons stripped).
  // data.image holds raw image buffer.
  ...
  cb();
});
```

##### Ereigniskontextobjekt

Der`ctx` Der Ereigniskontext besitzt folgende Eigenschaften:

- `macAddress`
- `eventType`
- `detectionTarget`
- `channelName`
- `device` - MAC-Adresse ohne Anführungszeichen (zur Konsistenz mit net-tools).
- `deviceName` - Hostname abgeleitet von net-tools oder einer Kopie von`device` falls nicht gefunden.
- `stateId` - Status-ID, die dieses Ereignis auslöst.
- `eventLogged` - Boolescher Wert, der angibt, ob ein Zustand ordnungsgemäß ausgelöst wurde. Sollte immer „true“ sein.
- `xml` - Geparste XML-Daten.
- `ts` - JavaScript`Date` Objekt erstellt aus`dateTime` in der Ereignisnachricht (oder dem Zeitpunkt des Empfangs des Ereignisses, falls nicht verfügbar).
- `periodPath` - Dateisystemordner, in dem die Ereignisteile aktuell gespeichert werden (ändert sich täglich).
- `fileBase` - Präfix für alle gespeicherten Teile der aktuellen Nachricht.
- `files` - Array, das die Dateinamen (einschließlich des vollständigen Pfads) aller Dateien enthält, die im Rahmen der Verarbeitung der aktuellen Nachricht ausgegeben wurden.

#### Ereignisdaten speichern

Wenn aktiviert, werden Ereignis-XML- und/oder Bilddaten im lokalen Dateisystem unter gespeichert.`iobroker-data/hikvision-alarmserver.<instance>` Die

_Achtung!_ Diese Dateien werden derzeit weder gelöscht noch archiviert. Verwenden Sie sie daher mit Vorsicht oder implementieren Sie eine externe Strategie.

### Vor der Kamera

Rufen Sie die Konfigurationsseite Ihrer Kamera(s) auf und definieren Sie die ioBroker-IP-Adresse/den Host und die Port-Einstellungen:

![Optionen für den Alarmserver](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

Stellen Sie sicher, dass die Verknüpfung der Ereignisse, die Sie an ioBroker melden möchten, die Option „Überwachungszentrum benachrichtigen“ enthält. Beispiel:

![Optionen zur Bewegungserkennung](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/blob/main/CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022-2024 Robin Rainton <robin@rainton.com>

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