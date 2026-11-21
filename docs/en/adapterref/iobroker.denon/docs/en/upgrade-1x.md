---
chapters: {"pages":{"en/adapterref/iobroker.denon/README.md":{"title":{"en":"ioBroker.denon"},"content":"en/adapterref/iobroker.denon/README.md"},"en/adapterref/iobroker.denon/docs/en/states.md":{"title":{"en":"All states"},"content":"en/adapterref/iobroker.denon/docs/en/states.md"},"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md":{"title":{"en":"Upgrading from 1.x to 2.0"},"content":"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md"}}}
---
# Upgrading from 1.x to 2.0

[← back to README](/#/adapters/denon)

Version 2.0 comes with a new object tree: states are grouped by function (main zone, sound, video, remote control ...)
and have new, consistent names. On the first start the adapter deletes the old channels `settings`, `zoneMain`, `zone2`,
`zone3`, `display` and `tuner` and creates the new states as soon as the receiver answers.

**Before updating:**

* Scripts, Blockly, VIS widgets and aliases using states of this adapter have to be changed to the new names (table below).
* Settings of the old states (e.g. history/SQL logging) are lost and have to be set again on the new states.
* Read values are always the code of the receiver, e.g. `display.brightness` = `BRI` instead of `Bright`. Writing accepts the code or the label.

Main changes (zone 2 and 3 the same with `zone2.` / `zone3.` instead of `main.`):

| Up to 1.x | From 2.0 |
|---|---|
| `zoneMain.powerZone` | `main.power` |
| `zoneMain.volume` / `zoneMain.volumeDB` | `main.volume` / `main.volumeDb` |
| `zoneMain.volumeUp` / `zoneMain.volumeDown` | `main.volumeUp` / `main.volumeDown` |
| `zoneMain.muteIndicator` | `main.mute` |
| `zoneMain.selectInput` | `main.input` |
| `zoneMain.quickSelect`, `zoneMain.sleepTimer` | `main.quickSelect`, `main.sleepTimer` |
| `zoneMain.maximumVolume` / `zoneMain.maximumVolumeDB` | `main.maxVolume` / `main.maxVolumeDb` |
| `zoneMain.equalizerBass` / `equalizerTreble` (+ `Up`/`Down`) | `main.audio.bass` / `main.audio.treble` (+ `Up`/`Down`) |
| `zoneMain.channelVolumeFrontLeft` ... | `main.channelVolume.frontLeft` ... |
| `zoneMain.iconURL` | `main.cover` |
| `zoneMain.play`, `pause`, `playPause`, `skipPlus`, `skipMinus` | `remote.play`, `pause`, `playPause`, `next`, `previous` |
| `settings.powerSystem` | `system.power` |
| `settings.ecoMode`, `settings.speakerPreset` | `system.ecoMode`, `system.speakerPreset` |
| `settings.surroundMode`, `settings.soundModeMovie` ... | `main.surroundMode`, `main.soundModeMovie` ... |
| `settings.autoStandby` | `main.autoStandby` |
| `settings.cursorUp` ... `settings.return`, `settings.setupMenu` | `remote.up` ... `remote.back`, `remote.menu` |
| `settings.multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevelOffset` | `main.audio.multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevel` |
| `settings.subwooferLevel`, `subwooferLevelState`, `subwooferTwoLevel` | `main.audio.subwooferLevel`, `subwooferLevelAdjust`, `subwoofer2Level` |
| `settings.lfeAmount`, `audysseyLfc`, `containmentAmount` | `main.audio.lfe` (now 0 to -10 dB), `lfc`, `containment` |
| `settings.dialogLevel`, `dialogLevelAdjust`, `dialogControl` | `main.audio.dialogLevel`, `dialogLevelAdjust`, `dialogControl` |
| `settings.toneControl`, `centerSpread`, `dynamicCompression`, `audioRestorer`, `inputMode`, `digitalInputMode` | `main.audio.` + same name |
| `settings.outputMonitor`, `videoProcessingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` | `main.video.monitor`, `processingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` |
| `settings.soundModeGroup` | `info.soundModeGroup` |
| `settings.loadPreset`, `savePreset`, `info.onlinePresets` | `netAudio.loadPreset`, `savePreset`, `presets` |
| `display.displayContent0` ... | `display.line0` ... |
| `info.friendlyName` | `info.name` |
| `settings.expertCommand`, `expertReadingPattern`, `expertReadingResult` | `expert.command`, `readingPattern`, `readingResult` |

List index values of 1.x (e.g. `selectInput` = `'5'` for TV) are not accepted anymore.