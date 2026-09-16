---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[zurück zur Dokumentations-Übersicht](/#/adapters/motioneye)

## Datenpunkte

### Pro Kamera (`motioneye.<Instanz>.<kanal>.*`)

Kanalnamen in Kleinbuchstaben (z. B. `garten`, `innenhof_ii`).

| Datenpunkt | Lesen | Schreiben | Beschreibung |
|------------|-------|-----------|--------------|
| `mode` | ja | ja | `off` / `still` / `sharp` (MotionEye; siehe [Modi](/#/docs/adapterref/iobroker.motioneye/modes.md)) |
| `alertLevel` | ja | ja | Kombiniertes Profil: `off` / `motion` / `notify` / `record` / `full` — siehe [Schutzstufe](/#/docs/adapterref/iobroker.motioneye/alert-level.md) |
| `motion` | ja | nein | Bewegung erkannt (Auto-Reset) |
| `snapshot` | nein | ja | Snapshot auslösen (Button) |
| `stream` | ja | ja | Live-MJPEG-Stream ein/aus |
| `streamPulse` | nein | ja | Kurzer Stream-Impuls (Button) |
| `streamUrl` | ja | nein | Fertiges HTML für HTML-Widgets |
| `status` | ja | nein | Letzte Sync-Meldung / Fehler |
| `lastAction` | ja | nein | Letzte API-Aktion |
| `webhookUrl` | ja | nein | In MotionEye geschriebene URL |
| `motionEyeId` | ja | nein | MotionEye-Kamera-ID |
| `motionEyeName` | ja | nein | Originalname in MotionEye |

### Geräteeinstellungen (`motioneye.<Instanz>.<kamera>.settings.*`)

| Datenpunkt | Lesen | Schreiben | Beschreibung |
|------------|-------|-----------|--------------|
| `framerate` | ja | ja | Aufnahme-Framerate in fps |
| `resolution` | ja | ja | Auflösung `BxH` |
| `availableResolutions` | ja | nein | Unterstützte Auflösungen (kommagetrennt) |
| `rotation` | ja | ja | Video-Rotation `0` / `90` / `180` / `270` |
| `autoBrightness` | ja | ja | Automatische Helligkeit ein/aus |
| `privacyMask` | ja | ja | Datenschutzmaske ein/aus |

### Textüberlagerung (`motioneye.<Instanz>.<kamera>.overlay.*`)

| Datenpunkt | Lesen | Schreiben | Beschreibung |
|------------|-------|-----------|--------------|
| `enabled` | ja | ja | Textüberlagerung ein/aus |
| `leftText` | ja | ja | `camera-name` / `timestamp` / `custom-text` / `disabled` |
| `rightText` | ja | ja | Wie `leftText` |
| `customLeftText` | ja | ja | Bei `leftText = custom-text` |
| `customRightText` | ja | ja | Bei `rightText = custom-text` |
| `textScale` | ja | ja | Textgröße, `1`–`10` |

### Bewegungserkennung (`motioneye.<Instanz>.<kamera>.motiondetection.*`)

| Datenpunkt | Lesen | Schreiben | Beschreibung |
|------------|-------|-----------|--------------|
| `frameChangeThreshold` | ja | ja | Schwellwert für Frameveränderung in % der Bildpixel (0–20) |
| `autoThresholdTuning` | ja | ja | Automatische Schwellenwerteinstellung ein/aus |
| `autoNoiseDetect` | ja | ja | Automatische Bildrauscherkennung ein/aus |
| `noiseLevel` | ja | ja | Manueller Rauschpegel 0–255 (wenn Auto-Rauschen aus) |
| `eventGap` | ja | ja | Sekunden ohne Bewegung, bis ein Ereignis endet |
| `minimumMotionFrames` | ja | ja | Mindestanzahl aufeinanderfolgender Frames mit Bewegung |
| `lightSwitchDetect` | ja | ja | Erkennung von Lichtveränderungen in % (0–100) |
| `despeckleFilter` | ja | ja | Fleckenfilter ein/aus |
| `preCapture` | ja | ja | Frames vor erkannter Bewegung (Vorschau) |
| `postCapture` | ja | ja | Frames nach Ende der Bewegung |

### Speicherplatz (`motioneye.<Instanz>.<kamera>.storage.*`)

| Datenpunkt | Lesen | Schreiben | Beschreibung |
|------------|-------|-----------|--------------|
| `snapshotCount` | ja | nein | Anzahl gespeicherter Snapshots |
| `videoCount` | ja | nein | Anzahl gespeicherter Videoclips |
| `usedSpaceMb` | ja | nein | Belegter Speicherplatz in MB |
| `lastRefresh` | ja | nein | Zeitstempel der letzten erfolgreichen Aktualisierung |
| `refresh` | nein | ja | Aktualisierung jetzt auslösen |

### Snapshot-Cache (`motioneye.<Instanz>.<kamera>.snapshots.*`)

| Datenpunkt | Lesen | Schreiben | Beschreibung |
|------------|-------|-----------|--------------|
| `url` | ja | nein | Web-Pfad im ioBroker-Dateispeicher |
| `urlLocal` | ja | nein | Vollständige LAN-URL (Web-Adapter) |
| `filePath` | ja | nein | Absoluter Dateipfad (Telegram, Skripte) |
| `html` | ja | nein | HTML-Snippet für VIS-HTML-Widget |
| `lastUpdate` | ja | nein | ISO-Zeitstempel der letzten Cache-Aktualisierung |
| `sizeKb` | ja | nein | Größe des gecachten JPEG in KB |
| `refresh` | nein | ja | Von MotionEye neu laden |

### Instanz-Info (`motioneye.<Instanz>._info.*`)

| Datenpunkt | Beschreibung |
|------------|--------------|
| `_info.connection` | `true`, wenn MotionEye Config-API erreichbar |
| `_info.camerasOnline` | Aktive Kameras in MotionEye gefunden |
| `_info.lastSync` | Zeitstempel letzter Poll |
| `_info.motionEyeVersion` | MotionEye-Version |
| `_info.motionVersion` | Motion-Daemon-Version |
| `_info.diskUsedGb` | Festplatte belegt (GB) — linke Zahl in MotionEye „Festplattennutzung“ |
| `_info.diskTotalGb` | Festplatte gesamt (GB) — rechte Zahl (Gesamtkapazität der Partition, nicht freier Platz) |
| `_info.diskUsedPercent` | Belegung in Prozent (z. B. 3) |