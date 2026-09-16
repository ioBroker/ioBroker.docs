---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[zurück zur Dokumentations-Übersicht](/#/adapters/motioneye)

## Tab Kameras

| Spalte | Beschreibung |
|--------|--------------|
| Anzeigename | Anzeige in ioBroker; Kanalordner in **Kleinbuchstaben** (z. B. `Garten` → `garten`) |
| MotionEye-ID | Numerische ID aus MotionEye Web-UI → Videogerät → Kamera-ID, oder `/config/list` |
| Interne ID | Stabiler Webhook-Schlüssel (z. B. `auffahrt`); leer = aus Anzeigename abgeleitet |
| Medien-Ordner | Optional unter `/var/lib/motioneye`; wird beim Adapterstart gesetzt |
| Aktiv | Deaktivieren, um Kamera zu überspringen |

### Kameras aus MotionEye laden

Die Instanz muss **laufen**. Der Button führt `/config/list` in die Tabelle ein, ohne bestehende Zeilen zu löschen. Nach dem Hinzufügen speichern und neu starten.

Nach dem Neustart legt der Adapter Datenpunkte an und schreibt Webhook-URLs nach MotionEye.