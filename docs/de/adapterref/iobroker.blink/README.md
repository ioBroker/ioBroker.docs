---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blink/README.md
title: ioBroker.blink
hash: Lwtzl+yrYNLsyJ7PaUMAUQ0MLqHFEFkP1mEw5SqpKsk=
---
![Logo](../../../en/adapterref/iobroker.blink/admin/blink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.blink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/blink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/blink-stable.svg)

# ioBroker.blink

## Blink-Adapter für ioBroker

ioBroker-Adapter für Blink-Kameras.

## Unterstützte Geräte

Dieser Adapter ist für Blink-Heimsicherheitskameras und zugehörige Blink-Kontogeräte vorgesehen.

Hersteller-Website: [Blink](https://blinkforhome.com/)\
&#x20;Geräteübersicht: [Blink-Produkte](https://blinkforhome.com/products)\
&#x20;Support / Gerätedokumentation: [Blink-Support](https://support.blinkforhome.com/)

Dieser Adapter steht in keiner Verbindung zu Blink oder Amazon, wird nicht von diesen gewartet oder unterstützt.

## Erste Schritte

## Installation über die ioBroker-Admin-Oberfläche

## Füllen Sie Ihre Anmeldedaten aus:<img width="2356" height="880" alt="image" src="https://github.com/user-attachments/assets/cdc22784-309f-4514-bfe4-abb93625958c" />

<img width="2364" height="1044" alt="image" src="https://github.com/user-attachments/assets/fc9e9a79-f512-4675-b0f0-e6a998a91894" />
-----------------------------------------------------------------------------------------

## Merkmale

- Verbindet sich mit der Blink Cloud
- Fragt den Kamera- und Synchronisierungsmodulstatus ab
- Unterstützt manuelle Snapshots
- Speichert Live-Momentaufnahmen
- Lädt die neueste verfügbare Cloud-Videodatei herunter
- Ermöglicht das Aktivieren oder Deaktivieren der Bewegungserkennung
- Unterstützt Warnmeldungen und Benachrichtigungen zum Akkustand
- Unterstützt Smart-Detection-Zustände für klassifizierte Bewegungsereignisse (funktioniert nur bei kostenpflichtigen Cloud-Diensten).
- Unterstützt in der Cloud gespeicherte Videos und lokal auf der SD-Karte gespeicherte Videos (SyncModule 2 und XR) über einen lokalen Server auf Port 8085 - JavaScript erforderlich, siehe unten!
- Das Skript erfordert die Installation von ffmpeg und viele Ressourcen, wenn Sie viele Kameras haben, und ist daher nur bedingt für Raspberry Pis geeignet (mind. 4 GB – mehr ist besser).
- Erste Version mit Live-Ansicht und JavaScript für jede Kamera – das benötigte JavaScript wird automatisch installiert – außer bei der älteren XT2, da diese einen anderen Videostream verwendet.
- Experimentelle native LiveView-Sitzung (kein JavaScript-Helfer / ffmpeg erforderlich) über `commands.start_live` /`commands.stop_live` Siehe „Real LiveView-Sitzung“ unten
  <img width="1388" height="414" alt="image" src="https://github.com/user-attachments/assets/f6446647-c3d5-4cc2-b7e7-1b2a3686424a" />

## Blink-Adapter: Datenpunkte

Übersicht aller vom angepassten ioBroker-Adapter bereitgestellten Datenpunkte `blink.0` Status: nach Refactoring für Cloud-Verlauf + Local-Storage-Fallback sowie der in Version 0.0.37/0.0.38 hinzugefügten experimentellen nativen LiveView-Sitzung.

## Konventionen

- `<CamID>` — numerische Kamera-ID (z. B. `1754227`). Wird auch im MP4-Dateinamen verwendet.
- `<NetID>` — Netzwerk-ID des Synchronisierungsmoduls / Heimnetzwerks (z. B. `174553`).
- `<N>` — Slot-Index der Videohistorie, **0 = neuester** Clip, **9 = ältester Clip** .

Alle MP4- und Snapshot-Dateien werden im konfigurierten Snapshot-Verzeichnis gespeichert (Standard: `/opt/iobroker/iobroker-data/blink/`).

---

## Adapter globals

| Datenpunkt                | Typ             | Beschreibung                                                                                                       |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| `blink.0.info.connection` | boolescher Wert | `true` wenn der Adapter über eine gültige Sitzung zur Blink-Cloud verfügt.                                         |
| `blink.0.info.account_id` | Zeichenkette    | Die Blink-Konto-ID wird intern verwendet, damit das optionale LiveView-Hilfsskript das richtige Konto finden kann. |

---

## Kameradatenpunkte

Jede Kamera erhält ihren eigenen Kanal. `blink.0.cameras.<CamID>` mit den folgenden Unterstrukturen.

### `info` – Stammdaten

| Datenpunkt        | Typ          | Beschreibung                                                         |
| ----------------- | ------------ | -------------------------------------------------------------------- |
| `info.name`       | Zeichenkette | Anzeigename aus der Blink-App (z. B. „Einfahrt“, „Terrasse“).        |
| `info.network_id` | Nummer       | Die Kamera gehört zur Netzwerk-ID.                                   |
| `info.serial`     | Zeichenkette | Seriennummer der Kamera.                                             |
| `info.type`       | Zeichenkette | Kameramodell / Blink-API-Typ (`camera`, `owl`, `mini`, `doorbell`). |
| `info.account_id` | Zeichenkette | Blink-Konto-ID, gespiegelt pro Kamera für das LiveView-Hilfsskript.  |

### `status` – Aktueller Sensorzustand

| Datenpunkt                     | Typ             | Beschreibung                                                                                                                          |
| ------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `status.armed`                 | boolescher Wert | Kamera aktiviert (folgt dem Netzwerkmodus).                                                                                           |
| `status.battery`               | Nummer          | Batteriespannung in Volt (Einheit `V`). `null` bei Modellen ohne Batterie.                                                             |
| `status.battery_raw`           | Nummer          | Rohsensorwert vor der Umrechnung.                                                                                                     |
| `status.battery_text`          | Zeichenkette    | Für Menschen lesbare Notiz, z. B. `not available` bei Modellen ohne Batterie.                                                          |
| `status.battery_volt`          | Nummer          | Batteriespannung in Volt (Einheit `V`).                                                                                               |
| `status.temperature`           | Nummer          | Temperatur am Kamerasensor in °C (Einheit `°C`).                                                                                      |
| `status.temperature_f`         | Nummer          | Temperatur in °F (Einheit `°F`).                                                                                                      |
| `status.temperature_text`      | Zeichenkette    | Temperatur als formatierter Text, z. B. `not available` bei Modellen ohne Sensor.                                                      |
| `status.wifi_strength`         | Nummer          | WLAN-Signalstärke in dBm (Einheit) `dBm`).                                                                                            |
| `status.motion_detect_enabled` | boolescher Wert | Bewegungserkennung an der Kamera aktiviert/deaktiviert (nur lesbare Spiegelung; Verwendung) `commands.motion_detect` um es zu ändern). |
| `status.last_update`           | Zeichenkette    | Zeitstempel der letzten Statusaktualisierung (ISO-Format).                                                                            |

#### Intelligente Erkennung (nur mit aktivem Blink-Abonnement)

Ausschnitt aus dem **neuesten Cloud-Clip** der Kamera:

| Datenpunkt                   | Typ             | Beschreibung                                                                        |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------- |
| `status.smart_detection`     | boolescher Wert | Im letzten Clip ist mindestens ein Treffer der intelligenten Erkennung zu erkennen. |
| `status.smart_detection_raw` | Zeichenkette    | Rohdaten der intelligenten Erkennung (JSON, gekürzt).                               |
| `status.detection_type`      | Zeichenkette    | Durch Kommas getrennte Liste der erkannten Typen.                                   |
| `status.motion_source`       | Zeichenkette    | Auslöser für den Clip: `pir`, `cv_motion`, usw.                                     |
| `status.person_detected`     | boolescher Wert | Person entdeckt.                                                                    |
| `status.vehicle_detected`    | boolescher Wert | Fahrzeug erkannt.                                                                   |
| `status.animal_detected`     | boolescher Wert | Tier gesichtet.                                                                     |
| `status.package_detected`    | boolescher Wert | Paket erkannt.                                                                      |

### `battery` – Erweiterter Akkustatus

Dient dazu, wiederholte Benachrichtigungen zu vermeiden.

| Datenpunkt            | Typ             | Beschreibung                                                                                                   |
| --------------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| `battery.low`         | boolescher Wert | Der Akku ist kritisch schwach.                                                                                 |
| `battery.warningSent` | boolescher Wert | Für den aktuellen Zeitraum mit niedrigem Batteriestand wurde bereits eine Warnung ausgegeben (Deduplizierung). |
| `battery.lastMessage` | Zeichenkette    | Text der letzten gesendeten Warnmeldung wegen niedrigem Batteriestand (z. B. über Pushover/Telegram).          |
| `battery.lastWarning` | Zeichenkette    | Zeitstempel der letzten Warnung wegen niedrigem Batteriestand (ISO).                                           |

### `live` – Momentaufnahme und Livestream

| Datenpunkt           | Typ             | Beschreibung                                                                                                                                                        |
| -------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `live.file`          | Zeichenkette    | Absoluter Pfad des letzten Snapshots auf der Festplatte.                                                                                                            |
| `live.image_base64`  | Zeichenkette    | Snapshot als Base64-Zeichenkette (zum direkten Einbetten in VIS ohne Dateizugriff).                                                                                 |
| `live.mime_type`     | Zeichenkette    | MIME-Typ des Snapshots (z. B. `image/jpeg`).                                                                                                                        |
| `live.timestamp`     | Zeichenkette    | Momentaufnahme-Zeitstempel (ISO).                                                                                                                                   |
| `live.stream_active` | boolescher Wert | Der MJPEG-Livestream (Web-Grid-Helper) wird aktuell abgefragt.                                                                                                      |
| `live.stream_url`    | Zeichenkette    | URL des aktiven MJPEG-Livestreams (Web-Grid-Helper, TTL begrenzt).                                                                                                  |
| `live.mode`          | Zeichenkette    | Modus der experimentellen nativen LiveView-Sitzung (z. B. `idle`, Name des aktiven Modus).                                                                          |
| `live.active`        | boolescher Wert | `true` während einer nativen LiveView-Sitzung (`commands.start_live`) läuft.                                                                                       |
| `live.url`           | Zeichenkette    | Wiedergabe-URL der aktuellen nativen LiveView-Sitzung.                                                                                                              |
| `live.expires_at`    | Zeichenkette    | Ablaufzeitstempel der aktuellen nativen LiveView-Sitzung (ISO).                                                                                                     |
| `live.last_error`    | Zeichenkette    | Letzter Fehler aus der nativen LiveView-Sitzung, falls vorhanden.                                                                                                   |
| `live.session_id`    | Zeichenkette    | ID der aktuellen nativen LiveView-Sitzung.                                                                                                                          |
| `live.backend`       | Zeichenkette    | Das Backend wurde zur Bereitstellung der nativen LiveView-Sitzung verwendet.                                                                                        |
| `live.unsupported`   | boolescher Wert | `true` Wenn dieses Kameramodell die native LiveView-Sitzung nicht unterstützt (z. B. ältere XT/XT2-Modelle). In diesem Fall `commands.start_live` hat keine Wirkung. |

### `video` – Aktuelles Video

Das neueste Video der Kamera. Die Cloud wird automatisch bevorzugt; bei Bedarf wird auf den lokalen Speicher (USB-Stick des Sync-Moduls 2) zurückgegriffen.

| Datenpunkt        | Typ             | Beschreibung                                                                                       |
| ----------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `video.file`      | Zeichenkette    | Absoluter Pfad der MP4-Datei (`<CamID>_latest.mp4`).                                              |
| `video.timestamp` | Zeichenkette    | Zeitstempel des Videoinhalts (ISO).                                                                |
| `video.id`        | Zeichenkette    | Eindeutige Clip-ID aus der Blink-API.                                                              |
| `video.size`      | Nummer          | Dateigröße in Bytes.                                                                               |
| `video.ready`     | boolescher Wert | Die Datei wurde erfolgreich heruntergeladen und ist abspielbar.                                    |
| `video.lastError` | Zeichenkette    | Fehler beim letzten Download. `""` = ok, andernfalls eine Meldung wie z. B. `no video available` Die |

### `video.history.0` …`video.history.9` – Ringgalerie

Jede Kamera verfügt über **10 Speicherplätze** für die 10 aktuellsten Clips. **Speicherplatz 0 = neuester Clip** , Speicherplatz 9 = ältester Clip. Bei jedem neuen Clip wechseln die Speicherplätze automatisch (der älteste Clip wird entfernt).

| Datenpunkt                    | Typ          | Beschreibung                                                                                                 |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `video.history.<N>.file`      | Zeichenkette | Absoluter Pfad der MP4-Datei (`<CamID>_history_<N>.mp4` Konstanter Dateiname pro Slot ⇒ stabile URLs in VIS. |
| `video.history.<N>.id`        | Zeichenkette | Eindeutige Clip-ID aus der Blink-API.                                                                        |
| `video.history.<N>.timestamp` | Zeichenkette | Zeitstempel des Clipinhalts (ISO).                                                                           |
| `video.history.<N>.source`    | Zeichenkette | Quelle des Clips: `cloud` oder `local_storage` Leer, falls der Slot nicht verwendet wird.                      |

### `commands` – Trigger-Datenpunkte

Auf einstellen `true` → Die Aktion wird ausgeführt, der Adapter wird automatisch zurückgesetzt auf `false`. (`commands.motion_detect` ist die einzige Ausnahme – es handelt sich um einen permanenten Ein-/Ausschalter, nicht um einen selbstzurücksetzenden Auslöser.)

| Datenpunkt               | Typ             | Aktion                                                                                                                                                                                |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `commands.snapshot`      | boolescher Wert | Fordern Sie einen neuen Snapshot an (gespeichert als Base64-Status).                                                                                                                  |
| `commands.snapshot_file` | Zeichenkette    | Schreibgeschützt: Absoluter Pfad der zuletzt gespeicherten Snapshot-Datei, wird nach jedem Snapshot automatisch festgelegt.                                                           |
| `commands.fetch_video`   | boolescher Wert | Laden Sie das neueste Video herunter. Intelligente Logik: Cloud-Speicher zuerst, dann lokaler Speicher als Fallback.                                                                  |
| `commands.live_request`  | boolescher Wert | Öffnen Sie den MJPEG-Livestream (Web-Grid-Helper, TTL \~60 s).                                                                                                                        |
| `commands.start_live`    | boolescher Wert | Starten Sie eine experimentelle native LiveView-Sitzung (kein JavaScript-Helfer/ffmpeg erforderlich). Das Ergebnis wird unter angezeigt `live.url` /`live.mode` /`live.session_id` Die |
| `commands.stop_live`     | boolescher Wert | Beenden Sie die native LiveView-Sitzung, die über `commands.start_live` Die                                                                                                            |
| `commands.motion_detect` | boolescher Wert | Bewegungserkennung an der Kamera aktivieren/deaktivieren (dauerhafter Schalter, kein automatisches Zurücksetzen).                                                                     |
| `commands.clear_session` | boolescher Wert | Die Authentifizierungssitzung löschen (bei Anmeldeproblemen).                                                                                                                         |

---

## Synchronisierungsmodul / Netzwerk

Jedes Synchronisierungsmodul erhält seinen eigenen Kanal. `blink.0.sync.<NetID>` **Hinweis:** Der Zustandspfad verwendet den `network_id`, nicht die tatsächliche Geräte-ID des Synchronisierungsmoduls.

### `info` – Stammdaten

| Datenpunkt    | Typ          | Beschreibung                  |
| ------------- | ------------ | ----------------------------- |
| `info.name`   | Zeichenkette | Netzwerkname (z. B. „Home“).  |
| `info.serial` | Zeichenkette | Seriennummer des Sync-Moduls. |

### `status` - Zustand

| Datenpunkt           | Typ             | Beschreibung                                                             |
| -------------------- | --------------- | ------------------------------------------------------------------------ |
| `status.armed`       | boolescher Wert | Netzwerk aktiviert (aktiviert die Bewegungserkennung auf allen Kameras). |
| `status.last_update` | Zeichenkette    | Zeitstempel der letzten Aktualisierung (ISO).                            |

### `commands`- Auslösen

| Datenpunkt       | Typ             | Aktion                                                                                                      |
| ---------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| `commands.armed` | boolescher Wert | Aktiviert das gesamte Netzwerk (`true`) oder entwaffnet (`false` Betrifft alle Kameras in diesem Netzwerk. |

---

## Dateistruktur im Snapshot-Verzeichnis

Standardpfad: `/opt/iobroker/iobroker-data/blink/`

| Datei                     | Beschreibung                                                              |
| ------------------------- | ------------------------------------------------------------------------- |
| `<CamID>_latest.mp4`      | Aktuellstes Video der Kamera (siehe `video.file`).                        |
| `<CamID>_history_<N>.mp4` | Geschichte `N` der Kamera (`video.history.<N>.file`).                     |
| `<CamID>_snapshot.jpg`    | Letzter Schnappschuss, falls gespeichert über `commands.snapshot_file` Die |

Dateinamen bleiben **pro Slot konstant** , Inhalte ändern sich bei Rotation. Für Web-Einbettung verwenden Sie einen Cache-Buster in der Abfragezeichenfolge (`?t={timestamp}`) Der Browser lädt also die neue Datei neu.

---

### Optionales Videoarchiv

Der Adapter kann heruntergeladene MP4-Clips in ein separates Archivverzeichnis kopieren, beispielsweise in einen eingebundenen NAS-Pfad. Das Archivieren ist optional und standardmäßig deaktiviert.

Die Archivierungseinstellungen werden in der Administrator-Benutzeroberfläche des Adapters konfiguriert:

- `Enable video archive`: Ermöglicht das Kopieren heruntergeladener MP4-Clips in das Archivverzeichnis.
- `Archive directory`: absoluter Pfad für archivierte MP4-Dateien, zum Beispiel `/opt/iobroker/iobroker-data/blink-archive` Die
- `Create camera subfolders`: Erstellt einen Archiv-Unterordner pro Kamera.
- `Maximum archive clips per camera in grid`: begrenzt die Anzahl der archivierten Clips, die pro Kamera im Web-Grid angezeigt werden.

Wenn die Archivierung aktiviert ist, archiviert der Adapter auch vorhandene lokale MP4-Dateien aus dem aktuellen Videostatus und dem Videoverlauf. Die archivierten Clips werden im Kameraraster unter dem entsprechenden Eintrag angezeigt. `Archive` Navigationsschaltfläche, sortiert nach Clip-Zeitstempel und dedupliziert nach Clip-ID.

Die folgenden Archivstatuszustände werden erstellt unter `blink.0.archive`:

| Zustand               | Typ             | Beschreibung                                                       |
| --------------------- | --------------- | ------------------------------------------------------------------ |
| `archive.enabled`     | boolescher Wert | Zeigt an, ob das Archiv in der Adapterkonfiguration aktiviert ist. |
| `archive.available`   | boolescher Wert | Zeigt an, ob das Archivverzeichnis aktuell beschreibbar ist.       |
| `archive.directory`   | Zeichenkette    | Zeigt das konfigurierte Archivverzeichnis an.                      |
| `archive.lastFile`    | Zeichenkette    | Die zuletzt für die Archivierung verarbeitete MP4-Quelldatei.      |
| `archive.lastTarget`  | Zeichenkette    | Archivzielpfad der zuletzt erfolgreich kopierten MP4-Datei.        |
| `archive.lastSuccess` | Zeichenkette    | Zeitstempel der letzten erfolgreichen Archivkopie.                 |
| `archive.lastError`   | Zeichenkette    | Letzte Fehlermeldung im Archiv, falls vorhanden.                   |

## Die Archivstatuszustände sind schreibgeschützte Statusanzeigen. Ändern Sie die Archivierungseinstellungen in der Adapterkonfiguration, anstatt diese Zustände zu beschreiben.

## Tipps zur VIS-Integration

Für eine **Live-Vorschau** in VIS:

```
{cameras.1754227.video.file}      → absolute path
{cameras.1754227.video.timestamp} → use for cache-busting
{cameras.1754227.video.ready}     → if false, show a "no video" hint
{cameras.1754227.video.lastError} → if non-empty, show as error status
```

Für die Abfragefelder 0–9 **der Verlaufsgalerie** einzeln:

```
{cameras.1754227.video.history.0.file}
{cameras.1754227.video.history.0.timestamp}
{cameras.1754227.video.history.0.source}
... through slot 9
```

`source = "cloud"` Das bedeutet, dass der Clip direkt aus der Blink-Cloud stammt (schnell, kein Upload per Stick). `source = "local_storage"` Das bedeutet, dass der Clip vom USB-Stick des Sync Module 2 über die Cloud hochgeladen wurde.

## Anmerkungen

- Batteriebetriebene Warnmeldungen werden über die `battery.*` Staaten.
- Geräte ohne eingebauten Akku, wie z. B. Mini/Owl/PanTilt-ähnliche Geräte, sind von den Akkuwarnungen ausgenommen.
- In diesem Fall `battery.lastMessage` ist eingestellt auf `no built in battery` Die
- Live-Image-Zustände werden aktualisiert, wenn ein Snapshot abgerufen wird oder wenn Live-Snapshots aktiviert sind.
- MJPEG-Stream-Zustände sind nur dann relevant, wenn das Streaming in der Adapterkonfiguration aktiviert ist.
- Die nativen LiveView-Sitzungszustände (`live.mode`, `live.active`, `live.url`, …) sind unabhängig vom MJPEG-Webgrid-Helper; prüfen `live.unsupported` vor dem Anruf `commands.start_live` bei älteren Kameramodellen.
- Die Smart-Detection-Status werden aktualisiert, sobald klassifizierte Bewegungsmetadaten aus der Blink Cloud verfügbar sind.

## Optionales LiveView-Webgitter

Der Adapter kann optional ein Hilfsskript für das LiveView-Webgitter installieren und aktualisieren.

Dieses Hilfsskript wurde im ioBroker JavaScript-Adapter-Namespace wie folgt erstellt:

```text
script.js.common.blink-video-url-server
```

Dies ist beabsichtigt und dient ausschließlich der optionalen Web-Grid-/LiveView-Hilfsfunktionalität. Vorhandene Benutzerskripte mit derselben Objekt-ID können überschrieben werden. Wenn Sie eine angepasste Version dieses Skripts verwenden, erstellen Sie bitte eine Sicherungskopie, bevor Sie diese Funktion aktivieren oder aktualisieren.

> **Hinweis:** Dieser Web-Grid-Helfer ist eine separate Funktion der oben beschriebenen nativen LiveView-Sitzung (`commands.start_live` /`live.url` Die native Sitzung benötigt weder den JavaScript-Adapter noch `ffmpeg` und ist der empfohlene Ausgangspunkt, wenn Sie nur die Live-URL einer einzelnen Kamera in VIS oder einer anderen Integration benötigen.

### Anforderungen

Das LiveView-Webgitter erfordert:

- der ioBroker JavaScript-Adapter
- `ffmpeg` auf dem Hostsystem installiert und verfügbar in `PATH`
- Unterstützte Blink-Kameras über den aktuellen IMMI/MCLV LiveView-Ablauf
- Netzwerkzugriff vom ioBroker-Host zu den Blink-Cloud-Diensten

Auf Debian/Ubuntu-Systemen `ffmpeg` kann in der Regel installiert werden mit:

```bash
sudo apt update
sudo apt install ffmpeg
```

### Kamerakompatibilität

Nicht alle Generationen von Blink-Kameras bieten den gleichen LiveView-Ablauf.

Kameras, die den aktuellen IMMI/MCLV LiveView-Ablauf verwenden, können für das Web-Grid in einen HLS-Stream konvertiert werden. Ältere Kameras der XT/XT2/LFR-Serie liefern mit dieser Methode möglicherweise keinen nutzbaren Stream. In diesem Fall erkennt der Adapter den nicht unterstützten LiveView-Status und deaktiviert die LiveView-Taste für die betreffende Kamera, anstatt einen fehlerhaften Stream zu starten. `live.unsupported` Dieses Flag gilt auch für die native LiveView-Sitzung (`commands.start_live`).

### Anmerkungen

Das LiveView-Webraster ist eine Komfortfunktion. Die Kernfunktionen des Adapters, wie Anmeldung, Geräteerkennung, Bewegungsstatus, Akkustand, Miniaturansichten und Video-Downloads, benötigen kein JavaScript-Hilfsskript. `ffmpeg` Der LiveView-Webgrid-Helper wird nur auf Linux-basierten ioBroker-Installationen unterstützt. Er verwendet Linux-Pfade und verarbeitet Befehle wie beispielsweise `/opt/iobroker`, `/tmp`, `/usr/bin/node`, `nohup`, Und `pkill` Die Kernfunktionalität des Adapters bleibt plattformunabhängig, die LiveView-Webgrid-Funktionen erfordern jedoch einen Linux-Host.

## HAFTUNGSAUSSCHLUSS

Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele. Blink ist eine Marke von Amazon Technologies, Inc.

## Changelog

Older entries are available in CHANGELOG_OLD.md.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.39 (2026-08-08)
* Automatically clears the cached Blink session once after HTTP 401/code 101 and retries the connection.
* Allows the clear session command even when the adapter is not connected.

### 0.0.38 (2026-07-13)
* Added units for temperature and battery voltage states.
* Removed duplicate detail roles for Fahrenheit temperature and secondary live URL states.

### 0.0.37 (2026-07-13)
* Fixed button command states to use `read: false` as required for `role: button`.
* Fixed object hierarchy by creating `cameras`, `sync`, `video.history` and video history slots as folders where they contain child objects.
* Fixed remaining English object names for smart detection and live URL states.
* Fixed device information roles for name, serial number and camera model states.
* Added dBm unit metadata for Wi-Fi signal strength states.

### 0.0.36 (2026-07-12)
* Fixed remaining admin checker warnings for archive translations.
* Normalized admin UI translation keys for streaming settings.
* Normalized English runtime labels and debug messages.
* Documented that the LiveView web grid helper requires Linux.

### 0.0.35 (2026-07-12)
* Fixed remaining admin checker warnings for archive translations.

## License

MIT License

Copyright (c) 2026 Pischleuder1 <pischleuder@gmx.de>

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