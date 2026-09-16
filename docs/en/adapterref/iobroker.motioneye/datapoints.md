---
chapters: {"pages":{"en/adapterref/iobroker.motioneye/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/README.md"},"en/adapterref/iobroker.motioneye/settings.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/settings.md"},"en/adapterref/iobroker.motioneye/cameras.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/cameras.md"},"en/adapterref/iobroker.motioneye/modes.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/modes.md"},"en/adapterref/iobroker.motioneye/alert-level.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/alert-level.md"},"en/adapterref/iobroker.motioneye/datapoints.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/datapoints.md"},"en/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/vis-stream.md"},"en/adapterref/iobroker.motioneye/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[Back to documentation index](/#/adapters/motioneye)

## Datapoints

### Per camera (`motioneye.<instance>.<channel>.*`)

Channel names are lowercase (e.g. `garten`, `innenhof_ii`).

| State | Read | Write | Description |
|-------|------|-------|-------------|
| `mode` | yes | yes | `off` / `still` / `sharp` (MotionEye; see [modes](/#/docs/adapterref/iobroker.motioneye/modes.md)) |
| `alertLevel` | yes | yes | Combined profile: `off` / `motion` / `notify` / `record` / `full` — see [alert level](/#/docs/adapterref/iobroker.motioneye/alert-level.md) |
| `motion` | yes | no | Motion detected (auto-reset) |
| `snapshot` | no | yes | Trigger snapshot (button) |
| `stream` | yes | yes | Live MJPEG stream on/off |
| `streamPulse` | no | yes | Short stream pulse (button) |
| `streamUrl` | yes | no | Ready-to-use HTML for HTML widgets |
| `status` | yes | no | Last sync / error text |
| `webhookUrl` | yes | no | URL written to MotionEye |

### Per camera device settings (`motioneye.<instance>.<camera>.settings.*`)

| State | Read | Write | Description |
|-------|------|-------|-------------|
| `framerate` | yes | yes | Capture framerate in fps |
| `resolution` | yes | yes | Resolution `WxH` |
| `availableResolutions` | yes | no | Supported resolutions (comma-separated) |
| `rotation` | yes | yes | Video rotation `0` / `90` / `180` / `270` |
| `autoBrightness` | yes | yes | Automatic brightness on/off |
| `privacyMask` | yes | yes | Privacy mask on/off |

### Per camera text overlay (`motioneye.<instance>.<camera>.overlay.*`)

| State | Read | Write | Description |
|-------|------|-------|-------------|
| `enabled` | yes | yes | Text overlay on/off |
| `leftText` | yes | yes | `camera-name` / `timestamp` / `custom-text` / `disabled` |
| `rightText` | yes | yes | Same options as `leftText` |
| `customLeftText` | yes | yes | Used when `leftText = custom-text` |
| `customRightText` | yes | yes | Used when `rightText = custom-text` |
| `textScale` | yes | yes | Text size, `1`–`10` |

### Per camera motion detection (`motioneye.<instance>.<camera>.motiondetection.*`)

| State | Read | Write | Description |
|-------|------|-------|-------------|
| `frameChangeThreshold` | yes | yes | Frame change threshold in % of image pixels (0–20) |
| `autoThresholdTuning` | yes | yes | Automatic threshold tuning on/off |
| `autoNoiseDetect` | yes | yes | Automatic noise detection on/off |
| `noiseLevel` | yes | yes | Manual noise level 0–255 (when auto noise detection is off) |
| `eventGap` | yes | yes | Seconds of no motion before an event ends |
| `minimumMotionFrames` | yes | yes | Minimum consecutive frames with motion before triggering |
| `lightSwitchDetect` | yes | yes | Light switch detection sensitivity in % (0–100) |
| `despeckleFilter` | yes | yes | Despeckle filter on/off |
| `preCapture` | yes | yes | Frames captured before motion is detected |
| `postCapture` | yes | yes | Frames captured after motion stops |

### Per camera storage (`motioneye.<instance>.<camera>.storage.*`)

| State | Read | Write | Description |
|-------|------|-------|-------------|
| `snapshotCount` | yes | no | Number of stored snapshots |
| `videoCount` | yes | no | Number of stored video clips |
| `usedSpaceMb` | yes | no | Occupied space in MB |
| `lastRefresh` | yes | no | Timestamp of the last successful refresh |
| `refresh` | no | yes | Trigger a refresh now |

### Per camera snapshot cache (`motioneye.<instance>.<camera>.snapshots.*`)

| State | Read | Write | Description |
|-------|------|-------|-------------|
| `url` | yes | no | Web path under ioBroker file storage |
| `urlLocal` | yes | no | Full LAN URL (web adapter) |
| `filePath` | yes | no | Absolute filesystem path (Telegram, scripts) |
| `html` | yes | no | HTML snippet for VIS html widget |
| `lastUpdate` | yes | no | ISO timestamp of last cache update |
| `sizeKb` | yes | no | Cached JPEG size in KB |
| `refresh` | no | yes | Re-download from MotionEye |

### Instance info (`motioneye.<instance>._info.*`)

| State | Description |
|-------|-------------|
| `_info.connection` | `true` when MotionEye config API is reachable |
| `_info.camerasOnline` | Enabled cameras found in MotionEye |
| `_info.lastSync` | Last poll timestamp |
| `_info.motionEyeVersion` | MotionEye version |
| `_info.motionVersion` | Motion daemon version |
| `_info.diskUsedGb` | Filesystem used space (GB) — left value in MotionEye “Disk usage” |
| `_info.diskTotalGb` | Filesystem total capacity (GB) — right value (partition size, not free space) |
| `_info.diskUsedPercent` | Used space in percent (e.g. 3) |