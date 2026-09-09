---
chapters: {"pages":{"en/adapterref/iobroker.frigate/README.md":{"title":{"en":"ioBroker.frigate"},"content":"en/adapterref/iobroker.frigate/README.md"},"en/adapterref/iobroker.frigate/docs/en/README.md":{"title":{"en":"ioBroker.frigate — Documentation"},"content":"en/adapterref/iobroker.frigate/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frigate/docs/en/README.md
title: ioBroker.frigate - Dokumentation
hash: LUnobo5vXIjpgeB4/IgDm7BWk8KISNrLYXOTly+n2yg=
---
![Logo](../../../../../en/adapterref/iobroker.frigate/admin/frigate.png)

# IoBroker.frigate - Dokumentation
Adapter für [Fregatte NVR](https://frigate.video/) - ein Open-Source-Videoüberwachungssystem mit KI-gestützter Objekterkennung, das selbst gehostet wird.

## Inhaltsverzeichnis
- [Setup](#setup)
- [Integrierter MQTT-Broker](#built-in-mqtt-broker-default)
- [Externer MQTT-Broker](#external-mqtt-broker)
- [Frigate API-Authentifizierung](#frigate-api-authentication)
- [Staatenreferenz](#states-reference)
- [Statistiken](#stats)
- [Events](#events)
- [Kamerazustände](#camera-states)
- [Kamerafernbedienungen](#camera-remote-controls)
- [Zonen](#Zonen)
- [Fregatten-Benachrichtigungssteuerung](#frigate-notification-control)
- [Automatisch verfügbare Zustände](#automatically-available-states)
- [Benachrichtigungen](#Benachrichtigungen)
- [Unterstützte Dienste](#supported-services)
- [Konfiguration](#notification-configuration)
- [Benachrichtigungstextvorlage](#notification-text-template)
- [Integration](#integration)
- [Live-Ansicht über den Webadapter](#live-view-via-the-web-adapter)
- [Geräteverwaltungs-Widgets](#device-manager-widgets)
- [vis Integration](#vis-integration)
- [Skripte & Automatisierung](#scripts--automation)
- [Anforderungen](#requirements)
- [FAQ](#faq)

---

## Aufstellen
Der Adapter unterstützt zwei MQTT-Modi zur Kommunikation mit Frigate.

### Eingebauter MQTT-Broker (Standard)
Der Adapter betreibt seinen eigenen MQTT-Broker. Frigate verbindet sich direkt mit diesem.

1. Geben Sie die Frigate-URL in den Adaptereinstellungen ein (z. B. `192.168.178.2:5000`).
2. Stellen Sie den MQTT-Port ein (Standard: `1883`).
3. Konfigurieren Sie die `config.yml`-Datei von Frigate, um eine Verbindung zu ioBroker herzustellen:

```yaml
mqtt:
  host: <ioBroker IP address>
  port: 1883
```

4. Starten Sie sowohl Frigate als auch den Adapter. Im Adapterprotokoll sollte „Neuer Client“ angezeigt werden.

### Externer MQTT-Broker
Falls Sie bereits einen MQTT-Broker (z. B. Mosquitto) betreiben, konfigurieren Sie den Adapter so, dass er sich als Client verbindet.

1. Stellen Sie den **MQTT-Modus** auf „Externer MQTT-Broker“ ein.
2. Geben Sie den Broker-Host ein (z. B. `192.168.1.100` oder `mqtt://192.168.1.100:1883`).
3. Optional können Sie hier Benutzernamen und Passwort eingeben.
4. Legen Sie das **MQTT-Themenpräfix** fest, falls Frigate ein benutzerdefiniertes Präfix verwendet (Standard: `frigate`).
5. Geben Sie die Frigate-URL wie gewohnt ein.

### Frigate API-Authentifizierung
Wenn Ihre Frigate-Instanz über eine aktivierte Authentifizierung verfügt (typischerweise auf Port 8971 mit HTTPS), können Sie den Adapter so konfigurieren, dass er sich automatisch anmeldet.

1. Geben Sie die Frigate-URL mit dem Präfix `https://` ein (z. B. `https://192.168.178.26:8971`).
2. Geben Sie Ihren **Frigate-Benutzernamen** und Ihr **Frigate-Passwort** ein.
3. Der Adapter meldet sich über `POST /api/login` an und verwendet das JWT-Token für alle API-Aufrufe.

Wenn die Felder leer bleiben, findet keine Anmeldung statt und der Adapter funktioniert wie zuvor (unauthentifizierter Zugriff auf Port 5000).

Der Adapter aktualisiert das Token automatisch, wenn es abläuft (eine 401-Antwort löst eine erneute Anmeldung und einen erneuten Versuch der Anfrage aus).

**Hinweis:** Selbstsignierte Zertifikate werden akzeptiert. Wenn Sie kein HTTPS verwenden, lassen Sie die URL ohne Präfix (z. B. `192.168.178.26:5000`) - der Adapter verwendet standardmäßig HTTP.

---

## Staatenreferenz
### Statistiken
`frigate.0.stats.*` - Allgemeine Systeminformationen werden alle paar Sekunden aktualisiert.

| Bundesland | Beschreibung | Einheit |
|------------------------------------------|--------------------------------------|-------|
| `stats.cameras.<name>.camera_fps` | Bilder pro Sekunde vom Kamerabild | fps |
| `stats.cameras.<name>.skipped_fps` | Frames übersprungen (Verarbeitungsüberlastung) | fps |
| `stats.cameras.<name>.detection_fps` | Objekterkennungsläufe pro Sekunde | fps |
| `stats.cameras.<name>.detection_enabled` | Objekterkennung aktiv | - |
| `stats.cameras.<name>.audio_dBFS` | Audiopegel | dBFS |
| `stats.cameras.<name>.audio_rms` | Audio-RMS-Amplitude | - |
| `stats.detectors.<name>.inference_speed` | Zeit pro Inferenz | ms |
| `stats.service.uptime` | Dienstverfügbarkeit | s |
| `stats.service.version` | Fregattenversion | - |
| `stats.service.storage.<mount>.total` | Gesamtspeicherplatz | MB |
| `stats.service.storage.<mount>.used` | Belegter Speicherplatz | MB |
| `stats.service.storage.<mount>.free` | Freier Speicherplatz | MB |
| `stats.service.storage.<mount>.free` | Freier Speicherplatz | MB |

### Veranstaltungen
`frigate.0.events.*` - Letztes Ereignis mit Vorher/Nachher-Informationen.

| Bundesland | Beschreibung |
|-----------------------------|---------------------------------|
| `events.after.camera` | Kamera, die das Ereignis erkannt hat |
| `events.after.top_score` | Höchster Konfidenzwert |
| `events.after.has_snapshot` | Snapshot verfügbar |
| `events.after.has_clip` | Clip verfügbar |
| `events.history.json` | JSON-Array der letzten X Ereignisse |
| `events.history.json` | JSON-Array der letzten X Ereignisse |

Jeder Eintrag im Verlauf enthält URLs für Schnappschüsse und Videoclips:

- `websnap` - Snapshot-URL
- `webclip` - Clip-URL (MP4)
- `webm3u8` - HLS-Stream-URL
- `thumbnail` - Base64-kodiertes Miniaturbild

### Kamerazustände
`frigate.0.<camera_name>.*` - Status und Erkennungszustände pro Kamera.

| Zustand | Typ | Beschreibbar | Beschreibung |
|-----------------------------|---------|-----------|-------------------------------------------|
| `<cam>.motion` | boolesch | nein | Bewegung aktuell erkannt |
| `<cam>.car` | Nummer | Nein | Anzahl der erkannten Fahrzeuge |
| `<cam>.person_snapshot` | Zeichenkette | nein | Base64-JPEG der zuletzt erkannten Person |
| `<cam>.detect_state` | Boolesch | Ja | Objekterkennung aktivieren/deaktivieren |
| `<cam>.recordings_state` | boolesch | ja | Aufnahmen aktivieren/deaktivieren |
| `<cam>.snapshots_state` | Boolesch | Ja | Snapshots aktivieren/deaktivieren |
| `<cam>.audio_state` | boolesch | ja | Audioerkennung aktivieren/deaktivieren |
| `<cam>.birdseye_state` | boolesch | ja | Vogelperspektive aktivieren/deaktivieren |
| `<cam>.birdseye_mode_state` | Zeichenkette | ja | Vogelperspektivenmodus (Objekte/kontinuierlich/Bewegung) |
| `<cam>.review_status` | Zeichenkette | nein | Aktivitätsstufe (KEINE/ERKENNUNG/ALARM) |
| `<cam>.review_status` | Zeichenkette | keine | Aktivitätsstufe (KEINE/ERKENNUNG/ALARM) |

### Kamerafernbedienungen
`frigate.0.<camera_name>.remote.*` - Beschreibbare Zustände zur Steuerung von Kameras.

| Bundesland | Typ | Beschreibung |
|------------------------------------|---------|----------------------------------------------------------------------|
| `remote.ptz` | Zeichenkette | PTZ-Befehle (z. B. `preset_preset1`, `MOVE_LEFT`, `ZOOM_IN`, `STOP`) |
| `remote.createEventBody` | Zeichenkette | JSON-Text für die manuelle Ereigniserstellung |
| `remote.motionThreshold` | Nummer | Bewegungserkennungsschwelle (1-255) |
| `remote.motionContourArea` | Nummer | Mindestgröße des Bewegungskonturbereichs |
| `remote.birdseyeMode` | Zeichenkette | Vogelperspektivenmodus (Objekte, kontinuierlich, Bewegung) |
| `remote.improveContrast` | Boolesch | Kontrastverbesserung für die Erkennung umschalten |
| `remote.pauseNotifications` | Boolescher Wert | Benachrichtigungen für diese Kamera pausieren |
| `remote.pauseNotificationsForTime` | Nummer | Benachrichtigungen für X Minuten pausieren |
| `remote.notificationText` | Zeichenkette | Benutzerdefinierter Benachrichtigungstext für diese Kamera |
| `remote.notificationMinScore` | Zahl | Benutzerdefinierte Mindestpunktzahl für Benachrichtigungen |
| `remote.notificationMinScore` | Zahl | Benutzerdefinierte Mindestpunktzahl für Benachrichtigungen |

### Zonen
Zonengeräte werden automatisch aus der Frigate-Konfiguration erstellt.

Die Anzahl der Objekte (z. B. `<zone>.person`, `<zone>.car`) stammt direkt aus den MQTT-Belegungsthemen von Frigate (`frigate/<zone>/<object>` und `frigate/<zone>/all`) und stimmt daher immer mit den Frigate-Meldungen überein. Der Adapter liefert zusätzlich eine Aufschlüsselung nach aktiven und stationären Objekten sowie eine Zusammenfassung, die aus dem Ereignisstrom abgeleitet werden.

| Bundesland | Typ | Beschreibung | Quelle |
|----------------------------|---------|-----------------------------------------------------|------------------|
| `<zone>.person` | Anzahl | Personen in der Zone | Frigate MQTT |
| `<zone>.person_active` | Anzahl | Personen in Bewegung | Ereignisaggregator |
| `<zone>.person_stationary` | Nummer | Stationäre Personen | Ereignisaggregator |
| `<zone>.total_objects` | Anzahl | Gesamtzahl der Objekte aller Typen (aktiv + stationär) | Ereignisaggregator |
| `<zone>.active` | Boolescher Wert | Jedes in der Zone erkannte Objekt | Ereignisaggregator |
| `<zone>.active` | Boolescher Wert | Jedes in der Zone erkannte Objekt | Ereignisaggregator |

Die aktiven/stationären Zustände verwenden den `current_zones` des Objekts und werden auf 0 zurückgesetzt, sobald das Objekt die Zone verlässt oder das Ereignis endet.

### Fregatten-Benachrichtigungssteuerung
`frigate.0.notifications.*` - Das eingebaute Benachrichtigungssystem der Steuerfregatte.

| Zustand | Typ | Beschreibbar | Beschreibung |
|---------------------------|---------|-----------|--------------------------------------|
| `notifications.enabled` | Boolesch | Ja | Frigate-Benachrichtigungen aktivieren/deaktivieren |
| `notifications.suspended` | Nummer | Nein | UNIX-Zeitstempel bei Ende der Sperrung |
| `notifications.suspended` | Nummer | Nein | UNIX-Zeitstempel des Endes der Sperrung |

### Automatisch verfügbare Zustände
Diese Zustände werden automatisch erstellt, wenn Frigate die entsprechenden MQTT-Themen veröffentlicht:

| Bundesland | Beschreibung |
|--------------------------------|-------------------------------------------------|
| `<cam>.audio_dBFS` | Audiopegel in dBFS |
| `<cam>.audio_transcription` | Transkribierter Audiotext |
| `<cam>.audio_<type>` | Audiotyperkennung (Sprache, Bellen usw.) |
| `<cam>.status_detect` | Status der Erkennungsrolle (online/offline/deaktiviert) |
| `<cam>.status_audio` | Status der Audiorolle |
| `<cam>.status_record` | Gesundheitsdatensatzrolle |
| `<cam>.classification_<model>` | Klassifizierungsergebnisse |
| `<cam>.ptz_autotracker_active` | PTZ-Autotracker aktiv |
| `<cam>.ptz_autotracker_active` | PTZ-Autotracker aktiv |

---

## Benachrichtigungen
Der Adapter kann Schnappschüsse und Ausschnitte von Ereignissen an Messaging-Dienste senden.

### Unterstützte Dienste
- Telegram
- Leichtgläubig (nur Schnappschüsse, kein Video)
- Signal (signal-cmb)
- E-Mail (Postfach)
- Jeder andere ioBroker-Messaging-Adapter

### Benachrichtigungskonfiguration
1. Aktivieren Sie Benachrichtigungen in den Adaptereinstellungen.
2. Geben Sie eine oder mehrere Benachrichtigungsinstanzen ein (z. B. `telegram.0`).
3. Optional können Sie Benutzernamen/IDs für die gezielte Zustellung eingeben.
4. Mindestpunktzahl festlegen (0 = deaktiviert)

Die Clips werden nach Ablauf der konfigurierten Wartezeit (Standard: 5 Sekunden) nach Ende des Ereignisses gesendet.

**Wichtig:** Die Benachrichtigungsinstanz und der Frigate-Adapter müssen auf demselben Host ausgeführt werden, da die Dateien über das lokale Dateisystem übertragen werden.

### Benachrichtigungstextvorlage
Verwenden Sie Platzhalter in Ihrem Benachrichtigungstext:

| Platzhalter | Beschreibung |
|--------------|----------------------------------------|
| `{{source}}` | Kameraname |
| `{{state}}` | Ereignisstatus (Ereignis vorher/Ereignis nachher) |
| `{{status}}` | Ereignisstatus (neu/aktualisiert/beendet) |
| `{{score}}` | Konfidenzwert |
| `{{zones}}` | Eingegangene Zonen (durch Komma getrennt) |
| `{{zones}}` | Eingegebene Zonen (durch Komma getrennt) |

Beispiel: `{{source}}: {{type}} detected ({{score}}) in {{zones}}`

---

## Integration
### Live-Ansicht über den Webadapter
Der Adapter registriert eine Web-Erweiterung in `ioBroker.web`, sodass jede Kamera über den Webserver verfügbar ist, ohne dass Frigate selbst offengelegt werden muss:

| URL | Inhalt |
| --- | --- |
| `http(s)://iobroker-IP:8082/frigate.0/<camera>/snapshot.jpg` | Das aktuelle Bild als JPEG |
| `http(s)://iobroker-IP:8082/frigate.0/<camera>/stream.mjpeg` | kontinuierlicher MJPEG-Stream, verwendbar in einem einfachen `<img src="...">` |

Beide akzeptieren die Abfrageparameter des entsprechenden Frigate-Endpunkts, z. B. `?height=480` für ein kleineres Bild, `?fps=5` zur Begrenzung der Bildrate des Streams oder `?bbox=1&timestamp=1`, damit Frigate die Begrenzungsrahmen und den Zeitstempel in das Bild einzeichnet.

Warum sollte man den Webadapter verwenden, anstatt die Frigate-URL direkt zu nutzen?

Frigate ist normalerweise an `127.0.0.1` gebunden, daher funktioniert die URL von keinem anderen Rechner aus.
- Port 8971 erfordert eine Anmeldung - der Adapter speichert das Token, der Browser nicht.
- Ein HTTP-Fregatte innerhalb eines HTTPS-ioBroker.web wird vom Browser als gemischter Inhalt blockiert.
Diese Routen werden durch die ioBroker.web-Authentifizierung abgedeckt, der eigene Port von Frigate ist es nicht.

Beachten Sie, dass Frigate den MJPEG-Stream für jeden Betrachter separat kodiert. Für ein permanentes Dashboard empfiehlt sich ein Snapshot, der alle paar Sekunden neu geladen wird. Verwenden Sie MJPEG nur dann, wenn tatsächlich jemand zuschaut.

### Geräte-Manager-Widgets
Der Adapter liefert zwei Widgets für **ioBroker.devices**. Beide ermöglichen die Auswahl einer Kamera als einfaches Objekt unterhalb des Namespace `frigate` (z. B. `frigate.0.driveway`) und können Frigate die Erkennungsrahmen und den Zeitstempel in das Bild einzeichnen lassen.

- **Frigate Snapshot** - lädt in einem konfigurierbaren Intervall ein Standbild neu. Es fragt den Adapter ab.

Der ioBroker-Socket sorgt dafür, dass er überall dort funktioniert, wo die Geräte-UI ausgeführt wird, auch innerhalb der Admin-Oberfläche, und er verwendet die Frigate-Anmeldung des Adapters wieder.

- **Frigate Live** - zeigt den MJPEG-Stream an, den der Browser nativ dekodiert. Er lädt den Stream.

vom **Web**-Adapter, auf den die Geräte-UI nur zugreifen kann, wenn sie innerhalb einer Webinstanz ausgeführt wird.
Wenn sie im Administratormodus ausgeführt wird - was üblicherweise der Fall ist - geben Sie die Webinstanz in den Widget-Einstellungen ein, z. B.:

`http://192.168.1.5:8082`.

Im Zweifelsfall verwenden Sie das Snapshot-Widget, dieses unterliegt keiner solchen Einschränkung.

### Vis Integration
**Schnappschuss:**

```
String img src → Object ID: frigate.0.camera_name.person_snapshot
String img src → Object ID: frigate.0.events.history.01.thumbnail
```

**Ausschnitt:**

```html
<video width="100%" height="auto" src="{frigate.0.events.history.01.webclip}" autoplay muted></video>
```

**Personenzahl:**

```
Value → Object ID: frigate.0.camera_name.person
```

**Zonenaktivität:**

```
Indicator → Object ID: frigate.0.Vorgarten.active
Value → Object ID: frigate.0.Vorgarten.person
```

### Skripte & Automatisierung
Beispiel: Licht einschalten, wenn eine Person im Bereich erkannt wird:

```javascript
on({ id: 'frigate.0.Vorgarten.active', val: true }, () => {
    setState('hm-rpc.0.ABC1234567.1.STATE', true);
    log('Person detected in Vorgarten');
});
```

Beispiel: Benachrichtigung senden, wenn die Personenzahl in der Zone einen Schwellenwert überschreitet:

```javascript
on({ id: 'frigate.0.Vorgarten.person', change: 'ne' }, (obj) => {
    if (obj.state.val >= 3) {
        sendTo('telegram.0', { text: `Warning: ${obj.state.val} persons in Vorgarten!` });
    }
});
```

---

## Anforderungen
| Komponente | Mindestversion |
|---------------|-----------------|
| Node.js | >= 20 |
| js-controller | >= 6.0.5 |
| Admin | >= 7.7.29 |
| Fregatte | >= 0,14 |

---

## Häufig gestellte Fragen
**F: Der Adapter zeigt nach der Installation von GitHub die Fehlermeldung „Startdatei nicht gefunden“ an.** A: Diese Version enthält das Build-Verzeichnis. Sollte der Fehler weiterhin auftreten, führen Sie `npm run build` im Adapterverzeichnis aus.

**F: Die Zonengeräte sind leer.** A: Zonenzustände werden nur erstellt, wenn Frigate Objekte in diesen Zonen erkennt. Warten Sie, bis in der Zone ein Ereignis eintritt.

**F: Ich erhalte ENOENT-Fehler für Snapshots/Clips.** A: Dies wurde in Version 2.3.0 behoben. Aktualisieren Sie auf die neueste Version.

**F: Wie ändere ich den Schwellenwert für die Bewegungserkennung?** A: Stellen Sie `frigate.0.<camera>.remote.motionThreshold` auf einen Wert zwischen 1 und 255 ein.

**F: Benachrichtigungen werden nicht gesendet.** A: Stellen Sie sicher, dass die Benachrichtigungsinstanz (z. B. telegram.0) auf demselben Host wie der Frigate-Adapter ausgeführt wird. Überprüfen Sie, ob Benachrichtigungen in den Adaptereinstellungen aktiviert sind.