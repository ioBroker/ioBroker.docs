---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[zurück zur Dokumentations-Übersicht](/#/adapters/motioneye)

## Kameramodi

| Modus | Bewegungserkennung | Videoaufnahme | Webhook an ioBroker |
|-------|-------------------|---------------|---------------------|
| `off` | nein | nein | nein |
| `still` | ja | nein | ja |
| `sharp` | ja | MP4 bei Bewegung | ja |

Modus über Datenpunkt `<kamera>.mode` oder Skripte setzen. Der Adapter schreibt die MotionEye-Config, wenn **MotionEye über Config-API steuern** aktiv ist.

Für **ein VIS-Dropdown** inkl. Telegram-bei-Bewegung [`alertLevel`](/#/docs/adapterref/iobroker.motioneye/alert-level.md) nutzen (`off` / `motion` / `notify` / `record` / `full`). Der Datenpunkt `mode` wird mitgeführt.