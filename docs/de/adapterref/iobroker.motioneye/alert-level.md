---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[Zurück zur Dokumentationsübersicht](/#/adapters/motioneye)

## Schutzstufe (`alertLevel`)

Pro Kamera kombiniert **alertLevel** MotionEye-Modus und Telegram-bei-Bewegung in einem schreibbaren Datenpunkt — ideal für ein VIS-Dropdown.

| `alertLevel` | MotionEye-`mode` | `motion`-Trigger | Telegram bei Bewegung |
|--------------|------------------|------------------|------------------------|
| `off` | `off` | nein | nein |
| `motion` | `still` | ja | nein |
| `notify` | `still` | ja | ja (Text/Bild laut Tab Benachrichtigungen) |
| `record` | `sharp` | ja | nein |
| `full` | `sharp` | ja | ja |

Pfad: `motioneye.<Instanz>.<kamera>.alertLevel` (gleiche Ebene wie `mode`).

### VIS-Nutzung

Dropdown an **`alertLevel`** binden statt an `mode`. Der Adapter wendet das Profil an und hält **`mode`** synchron (`still` / `sharp` / `off`).

Aliase (ohne Groß/Kleinschreibung): `aus`, `bewegung`, `alarm`, `aufnahme`, `vollschutz` oder `0`–`4`.

### Legacy-Steuerung über `mode`

Direktes Schreiben auf **`mode`** funktioniert weiter (bestehende VIS/Skripte). Telegram folgt dann der Config im Tab **Benachrichtigungen**; **`alertLevel`** wird zur Anzeige auf die passende Stufe gesetzt.

Schreiben auf **`alertLevel`** hat Vorrang für Telegram-bei-Bewegung, bis wieder **`mode`** geschrieben wird.

### Persistenz

Die gewählte Stufe liegt im **`alertLevel`**-State und wird nach Adapter-Neustart erneut angewendet.

Manueller **`snapshot`** und **Bei Snapshot** in der Config bleiben unabhängig.

### Telegram-Bild bei Bewegung (`notify` / `full`)

Ist **Bild senden** im Tab Benachrichtigungen aktiv, löst der Adapter beim Bewegungs-Webhook **zuerst einen MotionEye-Snapshot** aus (wie der manuelle **`snapshot`**-Button), wartet **`snapshotCacheDelayMs`** (Tab Snapshots, Standard 800 ms) und lädt dann das JPEG für Telegram. Im Modus **`still`** liegt oft noch kein fertiges `lastsnap.jpg` ohne diesen Schritt vor.