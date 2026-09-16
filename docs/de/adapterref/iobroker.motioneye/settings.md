---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[zurück zur Dokumentations-Übersicht](/#/adapters/motioneye)

## Tab Einstellungen

| Option | Standard | Beschreibung |
|--------|----------|--------------|
| MotionEye-Host | *(Pflicht)* | IP oder Hostname des MotionEye-Servers |
| MotionEye Config-API-Port | `8765` | Modus, Webhooks, Stream-Steuerung, Snapshots |
| MotionEye-Benutzer | `admin` | Web-Login |
| MotionEye-Passwort | *(leer)* | Nach Adapter-Update neu eintragen bei `unauthorized` im Log |
| MotionEye über Config-API steuern | `true` | Für Normalbetrieb aktiviert lassen |
| Webhook-Host | *(Pflicht)* | ioBroker-IP/Hostname **von MotionEye aus erreichbar** |
| Webhook-Port | `8090` | Eingebauter Webhook-Listener; eingehend auf ioBroker erlauben |
| Bewegung Auto-Reset (ms) | `15000` | Wie lange `.motion` nach Webhook auf true bleibt |
| Status-Abfrageintervall (s) | `300` | MotionEye-Status-Poll |
| Videostream beim Start ausschalten | `true` | Streams beim Adapterstart aus |
| Stream-Pulse Auto-Aus (ms) | `120000` | Dauer für `streamPulse` |

### motionHost vs webhookHost

- **motionHost** — ioBroker **verbindet zu** MotionEye (Config-API, Port 8765).
- **webhookHost** — MotionEye **verbindet zu** ioBroker (Webhooks, Port 8090).

Beide Richtungen müssen im Netz funktionieren. In Docker-Umgebungen kann die vom PC aus sichtbare IP anders sein als die, die Container brauchen.