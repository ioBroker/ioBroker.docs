---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: EV66MfmeApEpbV7mwc4WMERUCxQOkFeRTdHBfQvUmbs=
---
![Logo](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.frigate.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![Anzahl der Installationen](https://iobroker.live/badges/frigate-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/frigate-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.frigate
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Fregattenadapter für ioBroker
Adapter für Frigate Tool [Fregattenvideo](https://frigate.video/)

## Aufstellen
- Geben Sie die Frigate-URL ein, z. B. localhost:5000 oder 192.168.178.2:5000
- Geben Sie den MQTT-Port: 1883 aus der Fregattenkonfiguration ein
- Geben Sie in der Fregattenkonfiguration unten den Host oder die IP des Iobroker-Systems ein

```
mqtt:
  host: ioBrokerIP
```

  Nach dem Starten von Frigate und dem Adapter sollten Sie im Protokoll sehen, dass ein neuer Client verbunden ist

## Verwendung
### Statistiken
Allgemeine Informationen zum System und zu den Kameras

### Fernbedienungen
`frigate.0.remote.pauseNotifications` Benachrichtigung für alle Kameras pausieren

### Veranstaltungen
Letzte Veranstaltung mit Vorher- und Nachher-Informationen

`frigate.0.events.history` Verlauf der letzten X Ereignisse

Das Verlaufsereignis verfügt über eine Miniaturansicht des Ereignisses und eine URL zum Schnappschuss und Clip

### Kameraname
Status und Einstellungen der Kamera

Status ändern Status, um die Einstellungen der Kamera zu ändern

[Detaillierte Informationen zu allen Bundesländern](https://docs.frigate.video/integrations/mqtt/)

`frigate.0.camera_name.motion`

Ob camera_name derzeit Bewegung erkennt. Erwartete Werte sind EIN und AUS. HINWEIS: Nachdem eine Bewegung zum ersten Mal erkannt wurde, wird „EIN“ eingestellt, bis für mqtt_off_delay Sekunden (standardmäßig 30) keine Bewegung erkannt wurde.

`frigate.0.camera_name.person_snapshot`

Veröffentlicht einen JPEG-codierten Frame des erkannten Objekttyps. Wenn das Objekt nicht mehr erkannt wird, wird das Bild mit der höchsten Zuverlässigkeit veröffentlicht oder das Originalbild wird erneut veröffentlicht.
Die Höhe und der Zuschnitt von Schnappschüssen können in der Konfiguration konfiguriert werden.

`frigate.0.camera_name.history` Ereignisverlauf der Kamera

`frigate.0.camera_name.remote.notificationText` benutzerdefinierter Benachrichtigungstext für die Kamera `frigate.0.camera_name.remote.notificationMinScore` benutzerdefinierter Benachrichtigungs-Mindestwert für die Kamera `frigate.0.camera_name.remote.pauseNotifications`Pause-Benachrichtigung für die Kamera

## Benachrichtigungen
Der Adapter kann Schnappschüsse und Clips von Ereignissen und Objekterkennung an Instanzen wie Telegram, Pushover und Signal-CBM senden

Sie können mehrere Instanzen oder Benutzer angeben, um Schnappschüsse oder Clips zu senden

Aktivieren Sie die Benachrichtigung in den Einstellungen, um die Schnappschüsse oder Clips zu erhalten

Für ein Ereignis kann vor dem Senden eine Mindestpunktzahl eingegeben werden. 0 = Deaktiviert

Clips werden 5 Sekunden (Instanzeinstellungen) nach Ende des Ereignisses gesendet.

Sie können einen benutzerdefinierten Benachrichtigungstext mit dem Platzhalter `{{source}} {{type}} erkannt {{status}} {{score}} {{state}}` eingeben.

## In vis integrieren
Sie können Snapshots und Clips in die Vis integrieren:

Schnappschuss:

Fügen Sie einen `String img src` hinzu und verwenden Sie als Objekt-ID: `frigate.0.camera_name.person_snapshot`

Fügen Sie einen `String img src` hinzu und verwenden Sie als Objekt-ID: `frigate.0.events.history.01.thumbnail`

Clips:

Fügen Sie einen `HTML` als HTML hinzu:

```
<video width="100%" height="auto" src="{frigate.0.events.history.01.webclip}" autoplay muted>
</video>
```

## Diskussion und Fragen
[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2024-01-29)

- reduce memory usage for clip notifications

### 1.0.1 (2024-01-28)

- fix frigate v12 camera fetching
- fix pushover notifications

### 1.0.0 (2024-01-26)

- New Version with new state structure. Please check you vis and scripts. The new version doesn't need the mqtt adapter and can send directly notification to telegram.

## License

MIT License

Copyright (c) 2024 TA2k <tombox2020@gmail.com>

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