---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blustream-acm/README.md
title: ioBroker.blustream-acm
hash: WM9idrhDJNPp0YpPYf0WY/YaRdSPfim+FOwHpryGUws=
---
# IoBroker.blustream-acm

![NPM-Version](https://img.shields.io/npm/v/iobroker.blustream-acm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blustream-acm.svg)
![Anzahl der Installationen](https://iobroker.live/badges/blustream-acm-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/blustream-acm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.blustream-acm.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/AlanSRU/ioBroker.blustream-acm/workflows/Test%20and%20Release/badge.svg)

## Blustream ACM Matrix Controller für ioBroker
Steuert die erweiterten Blustream ACM-Steuermodule für die HDMI-über-IP-Audio-/Videoverteilung. Erkennt angeschlossene Sender und Empfänger über die Telnet-Schnittstelle des Controllers und zeigt deren Routing- und Statusinformationen an. Die verfügbaren Befehle und Statusinformationen hängen vom Controller-Modell ab, das Sie in der Adapterkonfiguration auswählen.

**Umbenannt von `iobroker.blustream-acm200`.** Dieser Adapter unterstützt nun mehrere ACM-Modelle und ist daher nicht mehr an den Namen ACM200 gebunden. Bestehende Installationen von `blustream-acm200.0` müssen im neuen Namespace `blustream-acm.0` neu konfiguriert werden.

### Unterstützte Hardware
- **ACM200** — [Blustream ACM200](https://www.blustream.com/product/acm200/) (Routing + Sender-Audioquelle)
- **ACM210** — Routing, Breakaway (IR/RS232/USB/CEC), Ausgangsleistung/Stummschaltung, Dante-Audiomatrix + ARC
- **ACM500** — Routing, Breakaway, Ausgangsleistung/Stummschaltung
- **ACM1000** — Routing, Breakaway, Ausgangsleistung/Stummschaltung, Dante-Audiomatrix + ARC
- **Hersteller:** [Blustream](https://www.blustream.com/)

Dieser Adapter steht in keiner Verbindung zu Blustream und wird von Blustream auch nicht unterstützt; alle Markenrechte gehören den jeweiligen Eigentümern.

## Merkmale
- Automatische Erkennung angeschlossener Sender und Empfänger
- Modellbasierte Funktionen – der Adapter erstellt nur Zustände und akzeptiert nur Befehle, die das ausgewählte Modell unterstützt.
- Video-/Audio-Routing-Steuerung (kombiniert und unabhängig pro Stream)
- Separates Routing von IR-/RS232-/USB-/CEC-Datenströmen (ACM210/500/1000)
- Ausgangsleistung und Stummschaltungssteuerung (ACM210/500/1000)
- Dante/Analog/HDMI-Audiomatrix und ARC-Steuerung (ACM210/1000)
- Auswahl der Audioquelle des Senders (HDMI / ANA)
- Befehle der Kategorie „An alle Bildschirme weiterleiten“ (Audio+Video, nur Video, nur Audio)
- Statusüberwachung für alle Geräte
- Vorschaubild-URLs (bereitgestellt vom integrierten Erfassungsendpunkt des Controllers)

## Installation
Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche (Adapter → suchen Sie nach "blustream").

## Konfiguration
### Haupteinstellungen
- **Controller-Modell**: Wählen Sie Ihr ACM-Controller-Modell (ACM200 / ACM210 / ACM500 / ACM1000). Dies bestimmt, welche Befehle und Zustände verfügbar sind.
- **IP-Adresse**: IP-Adresse Ihres ACM-Controllers (Standard: 192.168.0.225)
- **Port**: Telnet-Port (Standard: 23)

### Erweiterte Einstellungen
- **Abfrageintervall (ms)**: Wie oft Statusaktualisierungen abgefragt werden sollen (Standard: 30000). Muss mindestens doppelt so lang sein wie das Befehlstimeout, damit jede Abfrage abgeschlossen werden kann, bevor die nächste beginnt – niedrigere Werte führen automatisch zu einer Warnung im Protokoll.
- **Befehls-Timeout (ms)**: Timeout für einen einzelnen an den Controller gesendeten Befehl (Standard: 10000, Minimum: 1000). Erhöhen Sie diesen Wert, wenn in einem großen System Befehls-Timeouts im Protokoll gemeldet werden.

## Staaten
Zustände, die mit _(model)_ gekennzeichnet sind, werden nur dann erstellt, wenn das ausgewählte Controller-Modell die entsprechende Funktion unterstützt.

### System
- `info.connection` — Verbindungsstatus zum Controller
- `system.status.connected` — Entspricht info.connection (veraltet)
- `system.status.lastUpdate` — Zeitstempel der letzten Statusaktualisierung
- `system.status.nextScheduledRefresh` — Wann die nächste nächtliche vollständige Aktualisierung ausgeführt wird
- `system.status.lastFullRefresh` — Zeitstempel der letzten vollständigen Aktualisierung
- `system.status.fullRefreshRunning` — True, solange eine vollständige Aktualisierung läuft
- `system.commands.routeAll` — Sendet eine Sender-ID, um Audio und Video an alle Displays weiterzuleiten.
- `system.commands.routeAllVideo` — Sendet eine Sender-ID, um nur das Video an alle Displays weiterzuleiten.
- `system.commands.routeAllAudio` — Sendet eine Sender-ID, um nur Audio an alle Displays weiterzuleiten.

#### Aktualisierungsbefehle
Die beiden Aktualisierungsschaltflächen haben unterschiedlichen Arbeitsaufwand:

`system.commands.refresh` sendet eine `STATUS`-Abfrage, dieselbe, die auch beim regulären Polling verwendet wird. Aktualisiert Routen, Namen und Online-Status aller Geräte mit einem einzigen Befehl. Ressourcenschonend; verwenden Sie diese Funktion, nachdem Sie Änderungen außerhalb von ioBroker vorgenommen haben.
`system.commands.refreshAll` fragt für jedes bekannte Gerät `IN<id>` / `OUT<id>` ab und ergänzt so die gerätespezifischen Details, die `STATUS` nicht liefert (Firmware-Version, MAC-Adresse, Ausgabemodus, alternative Routen). Da pro Gerät ein Befehl gesendet wird, dauert der Vorgang merklich länger. Er wird außerdem einmal pro Nacht automatisch zu einer zufälligen Zeit zwischen 02:45 und 03:15 Uhr ausgeführt, um zu verhindern, dass mehrere Instanzen gleichzeitig Abfragen durchführen.

### Sender (pro Sender)
- `transmitters.<id>.id` — Sender-ID
- `transmitters.<id>.name` — Anzeigename
- `transmitters.<id>.ip` — IP-Adresse
- `transmitters.<id>.connected` — Verbindungsstatus
- `transmitters.<id>.edid` — EDID-Einstellung
- `transmitters.<id>.audioSource` — Audioquellenauswahl (HDMI/ANA)
- `transmitters.<id>.audioMatrixMode` — _(ACM210/1000)_ Eingangsseitiger Audiomatrixpfad (HDMI/Analog/Dante)
- `transmitters.<id>.previewUrl` — URL zur Bildvorschau (falls der Vorschaudienst aktiviert ist)

### Empfänger (pro Empfänger)
- `receivers.<id>.id` — Empfänger-ID
- `receivers.<id>.name` — Anzeigename
- `receivers.<id>.ip` — IP-Adresse
- `receivers.<id>.connected` — Verbindungsstatus
- `receivers.<id>.route` — Kombinierte Audio- und Videoroute (Sender-ID angeben)
- `receivers.<id>.videoRoute` — Nur-Video-Route
- `receivers.<id>.audioRoute` — Nur-Audio-Route
- `receivers.<id>.irRoute` / `.rs232Route` / `.usbRoute` / `.cecRoute` — _(ACM210/500/1000)_ Breakaway-Routen (Sender-ID schreiben)
- `receivers.<id>.power` — _(ACM210/500/1000)_ Ausgangsleistung ein/aus
- `receivers.<id>.mute` — _(ACM210/500/1000)_ Stummschaltung des Ausgangs ein/aus
- `receivers.<id>.audioOutputMode` — _(ACM210/1000)_ Audiomatrixpfad auf der Ausgabeseite
- `receivers.<id>.arcMode` — _(ACM210/1000)_ ARC-Modus (Aus/HDMI/Optisch)
- `receivers.<id>.resolution` — Ausgabeauflösung
- `receivers.<id>.previewUrl` — URL zur Bildvorschau

## Anwendungsbeispiele
Sender 2 an Empfänger 1 weiterleiten:

```javascript
setState('blustream-acm.0.receivers.001.route', '002');
```

Sender 3 an alle Empfänger weiterleiten:

```javascript
setState('blustream-acm.0.system.commands.routeAll', '003');
```

## Fehlerbehebung
- Falls der Adapter keine Verbindung herstellen kann, überprüfen Sie die IP-Adresse, den Port und ob die Telnet-Schnittstelle des Controllers aktiviert ist.
- Stellen Sie sicher, dass das konfigurierte **Controller-Modell** zu Ihrer Hardware passt – das falsche Modell kann Befehle senden, die Ihr Gerät nicht versteht, oder Zustände ausblenden, die es unterstützt.
- Falls nach dem Start Sender oder Empfänger fehlen, lösen Sie eine Aktualisierung über `system.commands.refresh` aus.
- Aktivieren Sie die Debug-Protokollierung unter Admin → Instanz → Protokollierungsstufe, um den Telnet-Verkehr anzuzeigen.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.3.2 (2026-08-07)
- (Alan Paris) Fixed: the adapter stopped retrying for good if the controller was unreachable at start or when a cable was pulled
- (Alan Paris) Fixed: a command timing out while queued removed the wrong queue entry
- (Alan Paris) Command Timeout now applies to all commands, not just the handshake; default raised 5000 to 10000 ms
- (Alan Paris) Routing writes are validated; a non-numeric transmitter id is rejected instead of sent to the controller
- (Alan Paris) The nightly full refresh is now spread over 02:45-03:15 instead of firing at exactly 03:00
- (Alan Paris) Polling interval is floored at twice the command timeout
- (Alan Paris) Preview URLs are only rewritten when the previewed source changes
- (Alan Paris) Clarified the refresh and refreshAll button labels; existing installs are updated on start
- (Alan Paris) Corrected the Command Timeout help text in the configuration UI
- (Alan Paris) Per-device detail parsing logs at debug level instead of flooding the info log
- (Alan Paris) Receiver mode shows Matrix or Video Wall instead of the raw MX and VW tokens
- (Alan Paris) A transient object database error during a status parse no longer stops the instance

### 0.3.1 (2026-07-17)
- (Alan Paris) Object role corrections for ioBroker repository review: per-device `connected` states now use `indicator.reachable`; transmitter/receiver `id` states use the `text` role
- (Alan Paris) Remove a stale command-timeout comment

### 0.3.0 (2026-07-17)
- (Alan Paris) Renamed adapter from `blustream-acm200` to `blustream-acm` to reflect multi-model support
- (Alan Paris) Added a Controller Model setting (ACM200 / ACM210 / ACM500 / ACM1000); states and commands are now model-aware
- (Alan Paris) Added breakaway routing (IR/RS232/USB/CEC) and output power/mute for ACM210/500/1000
- (Alan Paris) Added Dante/analogue/HDMI audio matrix and ARC control for ACM210/1000
- (Alan Paris) Preview image URLs now use the configured controller host instead of a hardcoded address

### 0.2.4 (2026-07-03)
- (Alan Paris) Remove unused username/password settings — the ACM200 telnet interface requires no login
- (Alan Paris) Transmitter/receiver name states are now read-only (they are reported by the device and cannot be set from the adapter)
- (Alan Paris) Validate and clamp polling interval and command timeout to safe ranges
- (Alan Paris) Add Blustream product/manufacturer links to the documentation

### 0.2.3 (2026-07-03)
- (Alan Paris) Resolve adapter-checker errors: use framework-managed timers, add missing config help translations, and clean up redundant devDependencies

**Older changes have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)**

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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