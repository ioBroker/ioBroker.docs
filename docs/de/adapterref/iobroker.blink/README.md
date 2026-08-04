---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blink/README.md
title: ioBroker.blink
hash: 190YhbHrYbLP+3ERX1vgiGvnd/q6WJ+/ImR/p6tUi6o=
---
![Logo](../../../en/adapterref/iobroker.blink/admin/blink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.blink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/blink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/blink-stable.svg)

# IoBroker.blink
## Blink-Adapter für ioBroker
ioBroker-Adapter für Blink-Kameras.

## Unterstützte Geräte
Dieser Adapter ist für Blink-Heimsicherheitskameras und zugehörige Blink-Kontogeräte vorgesehen.

Hersteller-Website: [Blinken](https://blinkforhome.com/) Geräteübersicht: [Blink-Produkte](https://blinkforhome.com/products) Support / Gerätedokumentation: [Blink-Unterstützung](https://support.blinkforhome.com/)

Dieser Adapter steht in keiner Verbindung zu Blink oder Amazon, wird nicht von diesen gewartet oder unterstützt.

## Erste Schritte
Installation über die ioBroker-Admin-Oberfläche ----------------------------------------------------------------------------------------- Geben Sie Ihre Zugangsdaten ein: <img width="2356" height="880" alt="Bild" src="https://github.com/user-attachments/assets/cdc22784-309f-4514-bfe4-abb93625958c" /> ----------------------------------------------------------------------------------------- <img width="2364" height="1044" alt="Bild" src="https://github.com/user-attachments/assets/fc9e9a79-f512-4675-b0f0-e6a998a91894" /> -----------------------------------------------------------------------------------------

## Merkmale
- Verbindet sich mit der Blink Cloud
- Fragt den Kamera- und Synchronisierungsmodulstatus ab
- Unterstützt manuelle Snapshots
- Speichert Live-Momentaufnahmen
- Lädt die neuesten verfügbaren Cloud-Videos herunter
- Ermöglicht das Aktivieren oder Deaktivieren der Bewegungserkennung
- Unterstützt Warnmeldungen zum Akkustand und entsprechende Benachrichtigungen
- Unterstützt Smart-Detection-Zustände für klassifizierte Bewegungsereignisse (funktioniert nur bei kostenpflichtigen Cloud-Diensten)
- Unterstützt in der Cloud gespeicherte Videos und lokal auf der SD-Karte gespeicherte Videos (SyncModule 2 und XR) über einen lokalen Server auf Port 8085 - JavaScript erforderlich, siehe unten!
- Das Skript erfordert die Installation von ffmpeg und viele Ressourcen, wenn Sie viele Kameras haben, und ist daher nur bedingt für Raspberry Pis geeignet (mind. 4 GB – mehr ist besser).
- Erste Version mit Live-Ansicht und JavaScript für jede Kamera – das benötigte JavaScript wird automatisch installiert – außer bei der älteren XT2, da diese einen anderen Videostream verwendet.
- Experimentelle native LiveView-Sitzung (kein JavaScript-Helfer/ffmpeg erforderlich) über `commands.start_live` / `commands.stop_live`, siehe „Echte LiveView-Sitzung“ unten.

<img width="1388" height="414" alt="Bild" src="https://github.com/user-attachments/assets/f6446647-c3d5-4cc2-b7e7-1b2a3686424a" />

## Blink-Adapter: Datenpunkte
Übersicht aller vom angepassten ioBroker-Adapter bereitgestellten Datenpunkte `blink.0`.

Status: Nach der Überarbeitung für Cloud-Verlauf + lokale Speicherausweichlösung sowie der in Version 0.0.37/0.0.38 hinzugefügten experimentellen nativen LiveView-Sitzung.

## Konventionen
- `<CamID>` – numerische Kamera-ID (z. B. `1754227`). Wird auch im MP4-Dateinamen verwendet.
- `<NetID>` — Netzwerk-ID des Synchronisierungsmoduls / Heimnetzwerks (z. B. `174553`).
- `<N>` — Slot-Index der Videohistorie, **0 = neuestes** Video, **9 = ältestes** Video.

Alle MP4- und Snapshot-Dateien werden im konfigurierten Snapshot-Verzeichnis gespeichert (Standard: `/opt/iobroker/iobroker-data/blink/`).

---

## Adapter-Globale
| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `blink.0.info.connection` | boolescher Wert | `true` wenn der Adapter eine gültige Sitzung zur Blink-Cloud hat. |
| `blink.0.info.account_id` | Zeichenkette | Blink-Konto-ID, die intern verwendet wird, damit das optionale LiveView-Hilfsskript das richtige Konto finden kann. |

---

## Kameradatenpunkte
Jede Kamera erhält ihren eigenen Kanal `blink.0.cameras.<CamID>` mit den folgenden Unterstrukturen.

### `info` – Stammdaten
| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `info.name` | Zeichenkette | Anzeigename aus der Blink-App (z. B. "Einfahrt", "Terrasse"). |
| `info.serial` | Zeichenkette | Seriennummer der Kamera. |
| `info.type` | Zeichenkette | Kameramodell / Blink-API-Typ (`camera`, `owl`, `mini`, `doorbell`). |
| `info.account_id` | Zeichenkette | Blink-Konto-ID, gespiegelt pro Kamera für das LiveView-Hilfsskript. |
| `info.account_id` | Zeichenkette | Blink-Konto-ID, gespiegelt pro Kamera für das LiveView-Hilfsskript. |

### `status` – Aktueller Sensorzustand
| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `status.armed` | Boolescher Wert | Kamera aktiviert (entspricht dem Netzwerkmodus). |
| `status.battery_raw` | Zahl | Rohsensorwert vor der Konvertierung. |
| `status.battery_text` | Zeichenkette | Für Menschen lesbarer Hinweis, z. B. `not available` bei Modellen ohne Batterie. |
| `status.battery_volt` | Zahl | Batteriespannung in Volt (Einheit `V`). |
| `status.temperature` | Zahl | Temperatur am Kamerasensor in °C (Einheit `°C`). |
| `status.temperature_f` | Zahl | Temperatur in °F (Einheit `°F`). |
| `status.temperature_text` | Zeichenkette | Temperatur als formatierter Text, z. B. `not available` bei Modellen ohne Sensor. |
| `status.wifi_strength` | Zahl | WLAN-Signalstärke in dBm (Einheit `dBm`). |
| `status.motion_detect_enabled` | Boolescher Wert | Bewegungserkennung der Kamera aktiviert/deaktiviert (schreibgeschützte Reflexion; verwenden Sie `commands.motion_detect`, um dies zu ändern). |
| `status.last_update` | Zeichenkette | Zeitstempel der letzten Statusaktualisierung (ISO-Format). |
| `status.last_update` | Zeichenkette | Zeitstempel der letzten Statusaktualisierung (ISO-Format). |

#### Intelligente Erkennung (nur mit aktivem Blink-Abonnement)
Aus dem **neuesten Wolkenclip** der Kamera extrahiert:

| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `status.smart_detection` | Boolescher Wert | Im letzten Clip ist mindestens ein Treffer der intelligenten Erkennung vorhanden. |
| `status.detection_type` | Zeichenkette | Durch Kommas getrennte Liste der erkannten Typen. |
| `status.motion_source` | Zeichenkette | Auslöser für den Clip: `pir`, `cv_motion` usw. |
| `status.person_detected` | Boolescher Wert | Person erkannt. |
| `status.vehicle_detected` | Boolescher Wert | Fahrzeug erkannt. |
| `status.animal_detected` | Boolescher Wert | Tier erkannt. |
| `status.package_detected` | Boolescher Wert | Paket erkannt. |
| `status.package_detected` | boolean | Paket erkannt. |

### `battery` – Erweiterter Batteriestatus
Dient dazu, wiederholte Benachrichtigungen zu vermeiden.

| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `battery.low` | Boolescher Wert | Der Akku ist kritisch schwach. |
| `battery.lastMessage` | Zeichenkette | Text der letzten gesendeten Warnmeldung bei niedrigem Batteriestand (z. B. über Pushover/Telegram). |
| `battery.lastWarning` | Zeichenkette | Zeitstempel der letzten Warnung vor niedrigem Batteriestand (ISO). |
| `battery.lastWarning` | Zeichenkette | Zeitstempel der letzten Warnung vor niedrigem Batteriestand (ISO). |

### `live` – Momentaufnahme und Livestream
| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `live.file` | Zeichenkette | Absoluter Pfad des letzten Snapshots auf der Festplatte. |
| `live.mime_type` | Zeichenkette | MIME-Typ des Snapshots (z. B. `image/jpeg`). |
| `live.timestamp` | Zeichenkette | Snapshot-Zeitstempel (ISO). |
| `live.stream_active` | Boolescher Wert | Derzeit abgefragter MJPEG-Livestream (Web-Grid-Helfer). |
| `live.stream_url` | Zeichenkette | URL des aktiven MJPEG-Livestreams (Web-Grid-Helper, TTL-begrenzt). |
| `live.mode` | Zeichenkette | Modus der experimentellen nativen LiveView-Sitzung (z. B. `idle`, Name des aktiven Modus). |
| `live.active` | boolescher Wert | `true` während eine native LiveView-Sitzung (`commands.start_live`) ausgeführt wird. |
| `live.url` | Zeichenkette | Wiedergabe-URL der aktuellen nativen LiveView-Sitzung. |
| `live.expires_at` | Zeichenkette | Ablaufzeitstempel der aktuellen nativen LiveView-Sitzung (ISO). |
| `live.last_error` | Zeichenkette | Letzter Fehler der nativen LiveView-Sitzung, falls vorhanden. |
| `live.session_id` | Zeichenkette | ID der aktuellen nativen LiveView-Sitzung. |
| `live.backend` | Zeichenkette | Backend, das zur Bereitstellung der nativen LiveView-Sitzung verwendet wird. |
| `live.unsupported` | Boolescher Wert | `true` Wenn dieses Kameramodell die native LiveView-Sitzung nicht unterstützt (z. B. ältere XT/XT2). In diesem Fall hat `commands.start_live` keine Auswirkung. |
| `live.unsupported` | boolean | `true`, wenn dieses Kameramodell die native LiveView-Sitzung nicht unterstützt (z. B. ältere XT/XT2). In diesem Fall hat `commands.start_live` keine Auswirkung. |

### `video` – Aktuelles Video
Das neueste Video der Kamera. Die Cloud wird automatisch bevorzugt; bei Bedarf wird auf den lokalen Speicher (USB-Stick des Sync-Moduls 2) zurückgegriffen.

| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `video.file` | Zeichenkette | Absoluter Pfad der MP4-Datei (`<CamID>_latest.mp4`). |
| `video.id` | Zeichenkette | Eindeutige Clip-ID aus der Blink-API. |
| `video.size` | Zahl | Dateigröße in Bytes. |
| `video.ready` | Boolescher Wert | Die Datei wurde erfolgreich heruntergeladen und ist abspielbar. |
| `video.lastError` | Zeichenkette | Fehler beim letzten Download. `""` = ok, andernfalls eine Meldung wie z. B. `no video available`. |
| `video.lastError` | Zeichenkette | Letzter Downloadfehler. `""` = ok, andernfalls eine Meldung wie `Kein Video verfügbar`. |

### `video.history.0` … `video.history.9` – Ringgalerie
Jede Kamera verfügt über **10 Speicherplätze**, die jeweils die 10 aktuellsten Clips enthalten.

Speicherplatz 0 = neuester Clip, Speicherplatz 9 = ältester. Bei jedem neuen Clip wechseln die Speicherplätze automatisch (der älteste Clip wird entfernt).

| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `video.history.<N>.file` | Zeichenkette | Absoluter Pfad der MP4-Datei (`<CamID>_history_<N>.mp4`). Konstanter Dateiname pro Slot ⇒ stabile URLs in VIS. |
| `video.history.<N>.timestamp` | Zeichenkette | Zeitstempel des Clipinhalts (ISO). |
| `video.history.<N>.source` | Zeichenkette | Quelle des Clips: `cloud` oder `local_storage`. Leer, falls der Slot nicht verwendet wird. |
| `video.history.<N>.source` | Zeichenkette | Quelle des Clips: `cloud` oder `local_storage`. Leer, falls der Speicherplatz nicht verwendet wird. |

### `commands` – Trigger-Datenpunkte
Wird der Wert auf `true` gesetzt, wird die Aktion ausgeführt und der Adapter stellt sich automatisch auf `false` zurück. (`commands.motion_detect` ist die einzige Ausnahme – es handelt sich um einen permanenten Ein-/Ausschalter, nicht um einen selbstzurücksetzenden Auslöser.)

| Datenpunkt | Typ | Aktion |
|---|---|---|
| `commands.snapshot` | Boolescher Wert | Neuen Snapshot anfordern (als Base64-Status gespeichert). |
| `commands.fetch_video` | Boolescher Wert | Das neueste Video herunterladen. Intelligente Logik: Cloud zuerst, dann lokaler Speicher als Fallback. |
| `commands.live_request` | Boolescher Wert | MJPEG-Livestream öffnen (Web-Grid-Hilfsprogramm, TTL ~60 s). |
| `commands.start_live` | Boolescher Wert | Startet eine experimentelle native LiveView-Sitzung (kein JavaScript-Helfer / ffmpeg erforderlich). Das Ergebnis wird unter `live.url` / `live.mode` / `live.session_id` angezeigt. |
| `commands.stop_live` | Boolescher Wert | Beendet die native LiveView-Sitzung, die über `commands.start_live` gestartet wurde. |
| `commands.motion_detect` | Boolescher Wert | Bewegungserkennung der Kamera aktivieren/deaktivieren (dauerhafter Schalter, kein automatisches Zurücksetzen). |
| `commands.clear_session` | Boolescher Wert | Die Authentifizierungssitzung löschen (bei Anmeldeproblemen). |
| `commands.clear_session` | Boolean | Löscht die Authentifizierungssitzung (bei Anmeldeproblemen). |

---

## Synchronisierungsmodul / Netzwerk
Jedes Synchronisierungsmodul erhält seinen eigenen Kanal `blink.0.sync.<NetID>`. **Hinweis:** Der Statuspfad verwendet `network_id`, nicht die tatsächliche Geräte-ID des Synchronisierungsmoduls.

### `info` – Stammdaten
| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `info.name` | Zeichenkette | Netzwerkname (z. B. "Home"). |
| `info.serial` | Zeichenkette | Seriennummer des Sync-Moduls. |

### `status` – Zustand
| Datenpunkt | Typ | Beschreibung |
|---|---|---|
| `status.armed` | Boolescher Wert | Netzwerk aktiviert (aktiviert die Bewegungserkennung auf allen Kameras). |
| `status.last_update` | Zeichenkette | Zeitstempel der letzten Aktualisierung (ISO). |

### `commands` – Auslöser
| Datenpunkt | Typ | Aktion |
|---|---|---|
| `commands.armed` | Boolescher Wert | Aktiviert (`true`) oder deaktiviert (`false`) des gesamten Netzwerks. Betrifft alle Kameras in diesem Netzwerk. |

---

## Dateistruktur im Snapshot-Verzeichnis
Standardpfad: `/opt/iobroker/iobroker-data/blink/`

| Datei | Beschreibung |
|---|---|
| `<CamID>_latest.mp4` | Aktuellstes Video der Kamera (siehe `video.file`). |
| `<CamID>_snapshot.jpg` | Letzter Snapshot, falls über `commands.snapshot_file` gespeichert. |
| `<CamID>_snapshot.jpg` | Letzter Schnappschuss, falls über `commands.snapshot_file` gespeichert. |

Dateinamen bleiben **pro Slot** konstant, der Inhalt ändert sich bei der Rotation. Für die Einbettung im Web verwenden Sie einen Cache-Buster in der Abfragezeichenfolge (`?t={timestamp}`), damit der Browser die neue Datei tatsächlich neu lädt.

---

### Optionales Videoarchiv
Der Adapter kann heruntergeladene MP4-Clips in ein separates Archivverzeichnis kopieren, beispielsweise in einen eingebundenen NAS-Pfad. Das Archivieren ist optional und standardmäßig deaktiviert.

Die Archivierungseinstellungen werden in der Administrator-Benutzeroberfläche des Adapters konfiguriert:

* `Videoarchiv aktivieren`: Ermöglicht das Kopieren heruntergeladener MP4-Clips in das Archivverzeichnis.
* `Archivverzeichnis`: absoluter Pfad für archivierte MP4-Dateien, zum Beispiel `/opt/iobroker/iobroker-data/blink-archive`.
* `Kamera-Unterordner erstellen`: Erstellt einen Archiv-Unterordner pro Kamera.
* `Maximale Anzahl archivierter Clips pro Kamera im Raster`: Begrenzt die Anzahl der archivierten Clips, die pro Kamera im Web-Raster angezeigt werden.

Wenn die Archivierung aktiviert ist, archiviert der Adapter auch vorhandene lokale MP4-Dateien aus dem aktuellen Videostatus und dem Videoverlauf. Die Kameraansicht zeigt die archivierten Clips unter der Navigationsschaltfläche `Archive` an, sortiert nach Clip-Zeitstempel und nach Clip-ID bereinigt.

Die folgenden Archivstatuszustände werden unter `blink.0.archive` erstellt:

| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `archive.enabled` | Boolescher Wert | Zeigt an, ob das Archiv in der Adapterkonfiguration aktiviert ist. |
| `archive.directory` | Zeichenkette | Zeigt das konfigurierte Archivverzeichnis an. |
| `archive.lastFile` | Zeichenkette | Die zuletzt für die Archivierung verarbeitete MP4-Quelldatei. |
| `archive.lastTarget` | Zeichenkette | Archivzielpfad der zuletzt erfolgreich kopierten MP4-Datei. |
| `archive.lastSuccess` | Zeichenkette | Zeitstempel der letzten erfolgreichen Archivkopie. |
| `archive.lastError` | Zeichenkette | Letzte Archivfehlermeldung, falls vorhanden. |
| `archive.lastError` | Zeichenkette | Letzte Fehlermeldung des Archivs, falls vorhanden. |

Die Archivstatus sind schreibgeschützte Statusanzeigen. Ändern Sie die Archivierungseinstellungen in der Adapterkonfiguration, anstatt diese Status zu beschreiben.

---

## Tipps zur VIS-Integration
Für eine **Live-Vorschau** in VIS:

```
{cameras.1754227.video.file}      → absolute path
{cameras.1754227.video.timestamp} → use for cache-busting
{cameras.1754227.video.ready}     → if false, show a "no video" hint
{cameras.1754227.video.lastError} → if non-empty, show as error status
```

Für die Abfragefelder 0–9 der **Historiengalerie** einzeln:

```
{cameras.1754227.video.history.0.file}
{cameras.1754227.video.history.0.timestamp}
{cameras.1754227.video.history.0.source}
... through slot 9
```

`source = "cloud"` bedeutet, dass der Clip direkt aus der Blink-Cloud stammt (schnell, kein Upload über USB-Stick).
`source = "local_storage"` bedeutet, dass der Clip vom USB-Stick des Sync-Moduls 2 über die Cloud hochgeladen wurde.

## Notizen
- Batteriebetriebene Warnungen werden über die `battery.*`-Zustände behandelt.
- Geräte ohne eingebauten Akku, wie z. B. Mini/Owl/PanTilt-ähnliche Geräte, sind von den Akkuwarnungen ausgenommen.
- In diesem Fall wird `battery.lastMessage` auf `no built in battery` gesetzt.
- Der Status der Live-Bilder wird aktualisiert, wenn ein Snapshot abgerufen wird oder wenn Live-Snapshots aktiviert sind.
- MJPEG-Stream-Zustände sind nur dann relevant, wenn das Streaming in der Adapterkonfiguration aktiviert ist.
- Die nativen LiveView-Sitzungszustände (`live.mode`, `live.active`, `live.url`, …) sind unabhängig vom MJPEG-Webgrid-Helper; prüfen Sie `live.unsupported`, bevor Sie `commands.start_live` bei älteren Kameramodellen aufrufen.
- Der Status der intelligenten Erkennung wird aktualisiert, sobald klassifizierte Bewegungsmetadaten aus der Blink Cloud verfügbar sind.

## Optionales LiveView-Webgitter
Der Adapter kann optional ein Hilfsskript für das LiveView-Webgitter installieren und aktualisieren.

Dieses Hilfsskript wurde im ioBroker JavaScript-Adapter-Namespace wie folgt erstellt:

```text
script.js.common.blink-video-url-server
```

Dies ist beabsichtigt und dient ausschließlich der optionalen Web-Grid-/LiveView-Hilfsfunktionalität. Vorhandene Benutzerskripte mit derselben Objekt-ID können überschrieben werden. Wenn Sie eine angepasste Version dieses Skripts verwenden, erstellen Sie bitte eine Sicherungskopie, bevor Sie diese Funktion aktivieren oder aktualisieren.

**Hinweis:** Diese Web-Grid-Hilfe ist eine separate Funktion der oben beschriebenen nativen LiveView-Sitzung (`commands.start_live` / `live.url`). Die native Sitzung benötigt weder den JavaScript-Adapter noch `ffmpeg` und ist der empfohlene Ausgangspunkt, wenn Sie in VIS oder einer anderen Integration nur die Live-URL einer einzelnen Kamera benötigen.

### Anforderungen
Das LiveView-Webgitter erfordert:

* der ioBroker JavaScript-Adapter
* `ffmpeg` ist auf dem Hostsystem installiert und im `PATH` verfügbar.
* Unterstützte Blink-Kameras über den aktuellen IMMI/MCLV LiveView-Ablauf
* Netzwerkzugriff vom ioBroker-Host auf die Blink-Cloud-Dienste

Auf Debian/Ubuntu-Systemen kann `ffmpeg` üblicherweise wie folgt installiert werden:

```bash
sudo apt update
sudo apt install ffmpeg
```

### Kamerakompatibilität
Nicht alle Generationen von Blink-Kameras bieten den gleichen LiveView-Ablauf.

Kameras, die den aktuellen IMMI/MCLV LiveView-Ablauf verwenden, können für das Web-Grid in einen HLS-Stream konvertiert werden. Ältere Kameras der XT/XT2/LFR-Serie liefern mit dieser Methode möglicherweise keinen nutzbaren Stream. In diesem Fall erkennt der Adapter den nicht unterstützten LiveView-Status und deaktiviert die LiveView-Schaltfläche für die betreffende Kamera, anstatt einen fehlerhaften Stream zu starten. Das gleiche Flag `live.unsupported` gilt auch für die native LiveView-Sitzung (`commands.start_live`).

### Notizen
Das LiveView-Webgitter ist eine Komfortfunktion. Die Kernfunktionen des Adapters, wie Anmeldung, Geräteerkennung, Bewegungsstatus, Akkustand, Miniaturansichten und Video-Downloads, benötigen weder das JavaScript-Hilfsskript noch `ffmpeg`.
Der LiveView-Webgitter-Helfer wird nur auf Linux-basierten ioBroker-Installationen unterstützt. Er verwendet Linux-Pfade und verarbeitet Befehle wie `/opt/iobroker`, `/tmp`, `/usr/bin/node`, `nohup` und `pkill`. Die Kernfunktionalität des Adapters bleibt plattformunabhängig, die LiveView-Webgitterfunktionen erfordern jedoch einen Linux-Host.

## HAFTUNGSAUSSCHLUSS
Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele. Blink ist eine Marke von Amazon Technologies, Inc.

## Changelog

Older entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 0.0.34 (2026-07-12)
* Fixed admin JSON configuration layout warnings.
* Updated archive admin translations.

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