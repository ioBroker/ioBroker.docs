---
chapters: {"pages":{"en/adapterref/iobroker.motioneye/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/README.md"},"en/adapterref/iobroker.motioneye/settings.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/settings.md"},"en/adapterref/iobroker.motioneye/cameras.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/cameras.md"},"en/adapterref/iobroker.motioneye/modes.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/modes.md"},"en/adapterref/iobroker.motioneye/alert-level.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/alert-level.md"},"en/adapterref/iobroker.motioneye/datapoints.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/datapoints.md"},"en/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/vis-stream.md"},"en/adapterref/iobroker.motioneye/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[Back to documentation index](/#/adapters/motioneye)

## Camera modes

| Mode | Motion detection | Video recording | Webhook to ioBroker |
|------|------------------|-----------------|---------------------|
| `off` | no | no | no |
| `still` | yes | no | yes |
| `sharp` | yes | motion-triggered MP4 | yes |

Set mode via datapoint `<camera>.mode` or from scripts. The adapter writes the corresponding MotionEye config when **Control MotionEye via config API** is enabled.

For a **single VIS dropdown** that also controls Telegram-on-motion, use [`alertLevel`](/#/docs/adapterref/iobroker.motioneye/alert-level.md) instead (`off` / `motion` / `notify` / `record` / `full`). The `mode` datapoint stays in sync.