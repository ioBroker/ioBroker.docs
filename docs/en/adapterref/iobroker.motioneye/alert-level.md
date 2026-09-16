---
chapters: {"pages":{"en/adapterref/iobroker.motioneye/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/README.md"},"en/adapterref/iobroker.motioneye/settings.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/settings.md"},"en/adapterref/iobroker.motioneye/cameras.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/cameras.md"},"en/adapterref/iobroker.motioneye/modes.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/modes.md"},"en/adapterref/iobroker.motioneye/alert-level.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/alert-level.md"},"en/adapterref/iobroker.motioneye/datapoints.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/datapoints.md"},"en/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/vis-stream.md"},"en/adapterref/iobroker.motioneye/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[Back to documentation index](/#/adapters/motioneye)

## Alert level (`alertLevel`)

Per-camera **alert level** combines MotionEye mode and Telegram-on-motion in one writable datapoint — ideal for a single VIS dropdown.

| `alertLevel` | MotionEye `mode` | `motion` trigger | Telegram on motion |
|--------------|------------------|------------------|--------------------|
| `off` | `off` | no | no |
| `motion` | `still` | yes | no |
| `notify` | `still` | yes | yes (text/image per Notifications tab) |
| `record` | `sharp` | yes | no |
| `full` | `sharp` | yes | yes |

Path: `motioneye.<instance>.<camera>.alertLevel` (same level as `mode`).

### VIS usage

Bind your dropdown to **`alertLevel`** instead of `mode`. The adapter applies the profile and keeps **`mode`** in sync (`still` / `sharp` / `off`).

Aliases (case-insensitive): `aus`, `bewegung`, `alarm`, `aufnahme`, `vollschutz`, or `0`–`4`.

### Legacy `mode` control

Writing **`mode`** directly still works (existing VIS/scripts). Telegram then follows the **Notifications** tab config; **`alertLevel`** is updated to the closest matching level for display.

Writing **`alertLevel`** takes priority for Telegram-on-motion until **`mode`** is written again.

### Persistence

The selected level is stored in the **`alertLevel`** state and reapplied on adapter restart.

Manual **`snapshot`** and per-camera **On snapshot** Telegram settings are independent.

### Telegram image on motion (`notify` / `full`)

When **Send image** is enabled in the Notifications tab, the adapter **triggers a MotionEye snapshot** on the motion webhook (same as the manual **`snapshot`** button), waits **`snapshotCacheDelayMs`** (Settings → Snapshots tab, default 800 ms), then downloads the JPEG for Telegram. In **`still`** mode MotionEye does not always have a ready `lastsnap.jpg` without this step.