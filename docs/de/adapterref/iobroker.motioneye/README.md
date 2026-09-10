---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

### ioBroker-Adapter für MotionEye

## Dokumentation

- [Einstellungen](/#/docs/adapterref/iobroker.motioneye/settings.md)
- [Kameras](/#/docs/adapterref/iobroker.motioneye/cameras.md)
- [Kameramodi](/#/docs/adapterref/iobroker.motioneye/modes.md)
- [Schutzstufe (VIS)](/#/docs/adapterref/iobroker.motioneye/alert-level.md)
- [Datenpunkte](/#/docs/adapterref/iobroker.motioneye/datapoints.md)
- [Livestream in VIS](/#/docs/adapterref/iobroker.motioneye/vis-stream.md)
- [Hilfe & FAQ](/#/docs/adapterref/iobroker.motioneye/faq.md)

#### ioBroker-Voraussetzungen

1. Node.js 22 oder neuer
2. js-controller 6.0.11 oder neuer
3. Admin-Adapter 7.6.20 oder neuer

#### MotionEye-Voraussetzungen

1. MotionEye mit Config-API auf Port **8765** (Standard)
2. **MotionEye 0.44+:** Adapter **0.5.0** oder neuer (Session-Login) — siehe [FAQ](/#/docs/adapterref/iobroker.motioneye/faq.md#motioneye-044-adapter-050)

## Schnellstart

- Pro MotionEye-Server eine Adapter-Instanz anlegen.
- Unter **Einstellungen**: MotionEye-Host, Zugangsdaten und **Webhook-Host** setzen (ioBroker-IP, von MotionEye aus erreichbar).
- Unter **Kameras**: Kameras eintragen oder **Kameras aus MotionEye laden**, speichern und Instanz neu starten.
- `motioneye.<Instanz>._info.connection` prüfen — sollte `true` sein, wenn MotionEye erreichbar ist.
- Livebild in VIS: HTML-Widget mit Binding auf `<kamera>.streamUrl` (siehe [Livestream in VIS](/#/docs/adapterref/iobroker.motioneye/vis-stream.md)).