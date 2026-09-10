---
chapters: {"pages":{"en/adapterref/iobroker.motioneye/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/README.md"},"en/adapterref/iobroker.motioneye/settings.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/settings.md"},"en/adapterref/iobroker.motioneye/cameras.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/cameras.md"},"en/adapterref/iobroker.motioneye/modes.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/modes.md"},"en/adapterref/iobroker.motioneye/alert-level.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/alert-level.md"},"en/adapterref/iobroker.motioneye/datapoints.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/datapoints.md"},"en/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/vis-stream.md"},"en/adapterref/iobroker.motioneye/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

### ioBroker adapter for MotionEye

## Documentation

- [Settings](/#/docs/adapterref/iobroker.motioneye/settings.md)
- [Cameras](/#/docs/adapterref/iobroker.motioneye/cameras.md)
- [Camera modes](/#/docs/adapterref/iobroker.motioneye/modes.md)
- [Alert level (VIS)](/#/docs/adapterref/iobroker.motioneye/alert-level.md)
- [Datapoints](/#/docs/adapterref/iobroker.motioneye/datapoints.md)
- [Live stream in VIS](/#/docs/adapterref/iobroker.motioneye/vis-stream.md)
- [Help & FAQ](/#/docs/adapterref/iobroker.motioneye/faq.md)

#### ioBroker requirements

1. Node.js 22 or newer
2. js-controller 6.0.11 or newer
3. Admin adapter 7.6.20 or newer

#### MotionEye requirements

1. MotionEye with config API on port **8765** (default)
2. **MotionEye 0.44+:** adapter **0.5.0** or newer (session login) — see [FAQ](/#/docs/adapterref/iobroker.motioneye/faq.md#motioneye-044-adapter-050)

## Quick start

- Create one adapter instance per MotionEye server.
- On **Settings**: set MotionEye host, credentials, and **webhook host** (ioBroker IP as reachable from MotionEye).
- On **Cameras**: add cameras or use **Load cameras from MotionEye**, then save and restart the instance.
- Check `motioneye.<instance>._info.connection` — should be `true` when MotionEye is reachable.
- For live video in VIS: HTML widget with binding to `<camera>.streamUrl` (see [Live stream in VIS](/#/docs/adapterref/iobroker.motioneye/vis-stream.md)).