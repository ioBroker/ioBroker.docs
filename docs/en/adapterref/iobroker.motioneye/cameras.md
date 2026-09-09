---
chapters: {"pages":{"en/adapterref/iobroker.motioneye/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/README.md"},"en/adapterref/iobroker.motioneye/settings.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/settings.md"},"en/adapterref/iobroker.motioneye/cameras.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/cameras.md"},"en/adapterref/iobroker.motioneye/modes.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/modes.md"},"en/adapterref/iobroker.motioneye/alert-level.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/alert-level.md"},"en/adapterref/iobroker.motioneye/datapoints.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/datapoints.md"},"en/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/vis-stream.md"},"en/adapterref/iobroker.motioneye/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[Back to documentation index](/#/adapters/motioneye)

## Cameras tab

| Column | Description |
|--------|-------------|
| Display name | Shown in ioBroker; channel folder is **lowercase** (e.g. `Garten` → `garten`) |
| MotionEye ID | Numeric ID from MotionEye web UI → Video Device → Camera ID, or `/config/list` |
| Internal ID | Stable webhook key (e.g. `auffahrt`); empty = derived from display name |
| Media folder | Optional folder under `/var/lib/motioneye`; applied on adapter start |
| Enabled | Uncheck to skip a camera |

### Load cameras from MotionEye

The instance must be **running**. The button merges `/config/list` into the table without removing existing rows. Save configuration and restart after adding cameras.

After restart the adapter creates datapoints and writes webhook URLs to MotionEye.