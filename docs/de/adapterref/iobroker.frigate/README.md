---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: 3WrCVv9K/OwVM2kqsLUcAYh8lE3u7uYbapGYnDpFkZ4=
---
![Logo](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.frigate.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![Anzahl der Installationen](https://iobroker.live/badges/frigate-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/frigate-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.frigate
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Frigate-Adapter für ioBroker
Adapter für Frigate Tool [Fregatten-Video](https://frigate.video/)

## Aufstellen
- Geben Sie die Frigate-URL ein, z. B. `localhost:5000` oder `192.168.178.2:5000`
- Geben Sie den MQTT-Port 1883 aus der Fregattenkonfiguration ein.
- Geben Sie den Host oder die IP-Adresse des iobroker-Systems in der Frigate-Konfiguration unter ein.

```yaml
mqtt:
    host: ioBrokerIP
    port: ioBrokerPort
```

Nach dem Starten von Frigate und des Adapters sollte im Protokoll ein neuer verbundener Client angezeigt werden.

## Verwendung
### Statistiken
Allgemeine Informationen zum System und den Kameras.

### Fernbedienungen
`frigate.0.remote.pauseNotifications` - Benachrichtigung für alle Kameras pausieren.

### Ereignisse
Letzte Veranstaltung mit Vorher- und Nachher-Informationen.

`frigate.0.events.history` - Verlauf der letzten X Ereignisse.

Das Verlaufsereignis enthält eine Miniaturansicht des Ereignisses sowie die URL zum Snapshot und Clip.

### Kameraname
Status und Einstellungen der Kamera.

Ändern Sie den Status, um die Kameraeinstellungen zu ändern.

[Detaillierte Informationen zu allen Bundesstaaten](https://docs.frigate.video/integrations/mqtt/)

* `frigate.0.camera_name.motion` – Gibt an, ob die Kamera „camera_name“ aktuell Bewegungen erkennt. Mögliche Werte sind EIN und AUS. HINWEIS: Nach der ersten Bewegungserkennung wird der Wert auf EIN gesetzt, bis innerhalb von mqtt_off_delay Sekunden (standardmäßig 30) keine Bewegung mehr erkannt wird.
* `frigate.0.camera_name.person_snapshot` – Veröffentlicht ein JPEG-kodiertes Bild des erkannten Objekttyps. Wird das Objekt nicht mehr erkannt, wird das Bild mit der höchsten Trefferquote oder das Originalbild erneut veröffentlicht.

Höhe und Bildausschnitt der Schnappschüsse können in der Konfiguration festgelegt werden.

* `frigate.0.camera_name.history` - Ereignisverlauf der Kamera.
* `frigate.0.camera_name.remote.notificationText` - benutzerdefinierter Benachrichtigungstext für die Kamera.
* `frigate.0.camera_name.remote.notificationMinScore` - benutzerdefinierte Mindestpunktzahl für Benachrichtigungen der Kamera.
* `frigate.0.camera_name.remote.pauseNotifications` - Benachrichtigungen für die Kamera pausieren.
* `frigate.0.camera_name.remote.ptz` - PTZ-Befehle senden https://docs.frigate.video/integrations/mqtt/#frigatecamera_nameptz

## Benachrichtigungen
Der Adapter kann Schnappschüsse und Ausschnitte von Ereignissen und Objekterkennung an Instanzen wie `telegram`, `pushover` und `signal-cbm` senden.

Sie können mehrere Instanzen oder Benutzer angeben, an die Snapshots oder Clips gesendet werden sollen.

Aktivieren Sie Benachrichtigungen in den Einstellungen, um Schnappschüsse oder Videoclips zu erhalten.

Für die Veranstaltung kann vor dem Absenden eine Mindestpunktzahl festgelegt werden. 0 = Deaktiviert.

Die Clips werden 5 Sekunden (Instanzeinstellungen) nach Ende des Ereignisses gesendet.

Sie können einen benutzerdefinierten Benachrichtigungstext mit dem Platzhalter `{{source}} {{type}} erkannt {{status}} {{score}} {{state}}` eingeben.

## In die Visualisierung integrieren
Sie können Schnappschüsse und Clips in die Visualisierung integrieren:

Schnappschuss:

- Füge eine `String img src` hinzu und verwende sie als Objekt-ID: `frigate.0.camera_name.person_snapshot`
- Fügen Sie eine `String img src` hinzu und verwenden Sie als Objekt-ID: `frigate.0.events.history.01.thumbnail`

Ausschnitte:

- Fügen Sie ein `HTML` als HTML hinzu:

```html
<video width="100%" height="auto" src="{frigate.0.events.history.01.webclip}" autoplay muted>
</video>
```

Anzahl der Personen:

- `frigate.0.camera.person`

Veranstaltung mit Person:

- `frigate.0.events.after.label` = Person

## Frigate Docker auf einem anderen Host ausführen
Wenn Sie die Clips und Snapshots über Telegram und Co. an den iobroker-Host senden möchten, müssen die Frigate-Instanz und die Telegram-Instanz (oder eine andere Instanz) auf demselben Host laufen, da Frigate die Festplatte zum Speichern der Clips und Snapshots verwendet.

## Diskussion und Fragen
[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Code optimizations and refactoring

### 2.0.2 (2026-02-16)
- (@GermanBluefox) Removed gpu_usages

### 2.0.0 (2026-02-16)
- (@GermanBluefox) Adapter was migrated to TypeScript
- (@GermanBluefox) Breaking change: All states with value ON/OFF were changed to boolean true/false
- (@GermanBluefox) Better handling of complex objects and arrays
- (@GermanBluefox) `path_data` is not parsed anymore
- (@GermanBluefox) Added еру possibility to start and manage docker with frigate from the adapter

### 1.4.0 (2026-01-26)

- (mcm1957) Adapter requires node.js 20 as minimum now.
- (TA2k) Remove path_data objects to prevent too many objects generated by the adapter

### 1.3.3 (2026-01-26)

- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

- (mcm1957) Adapter requires admin 6.17.14 as minimum now.

### 1.3.2 (2025-05-06)

- (TA2k) remove path_data from v0.16
- (TA2k) move clip url from mp4 to m3u8
- (mcm1957) Adapter requires js-controller 5.0.19 as minimum now.
- (mcm1957) Several issues reported by the adapter checker have been fixed.

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024-2025 TA2k <tombox2020@gmail.com>

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