---
chapters: {"pages":{"de/adapterref/iobroker.denon/README.md":{"title":{"de":"ioBroker.denon – Denon/Marantz AV-Receiver"},"content":"de/adapterref/iobroker.denon/README.md"},"de/adapterref/iobroker.denon/states.md":{"title":{"de":"Alle Datenpunkte"},"content":"de/adapterref/iobroker.denon/states.md"},"de/adapterref/iobroker.denon/upgrade-1x.md":{"title":{"de":"Update von 1.x auf 2.0"},"content":"de/adapterref/iobroker.denon/upgrade-1x.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.denon/upgrade-1x.md
title: Update from 1.x to 2.0
hash: z2RpA1k/UsN89ROtO7mMBVzqUnihDq4XEhCmNUkUhhM=
---
# Update from 1.x to 2.0

[← back to README](/#/adapters/denon)

With version 2.0, the object tree has been restructured: The data points are sorted by function (main zone, sound, picture, remote control, etc.) and have new, uniform names. On first startup, the adapter deletes the old channels. `settings`, `zoneMain`, `zone2`, `zone3`, `display` and `tuner` and creates the new ones as soon as the receiver responds.

**Please note the following before updating:**

- Scripts, Blockly, VIS widgets and aliases that use the adapter's data points must be renamed to the new names (table below).
- Settings at the old data points (e.g., history/SQL recording) will be lost and must be reset at the new data points.
- The values read are now always the receiver's code, e.g. `display.brightness` =`BRI` instead of `Bright` Writing is done using the code or the display name.

The most important changes (Zones 2 and 3 are the same, only with `zone2.` or `zone3.` instead of `main.`):

| Until 1.x                                                                                                           | Version 2.0 and later                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `zoneMain.powerZone`                                                                                                | `main.power`                                                                                                |
| `zoneMain.volume` /`zoneMain.volumeDB`                                                                              | `main.volume` /`main.volumeDb`                                                                              |
| `zoneMain.volumeUp` /`zoneMain.volumeDown`                                                                          | `main.volumeUp` / `main.volumeDown`                                                                         |
| `zoneMain.muteIndicator`                                                                                            | `main.mute`                                                                                                 |
| `zoneMain.selectInput`                                                                                              | `main.input`                                                                                                |
| `zoneMain.quickSelect`, `zoneMain.sleepTimer`                                                                       | `main.quickSelect`, `main.sleepTimer`                                                                       |
| `zoneMain.maximumVolume` /`zoneMain.maximumVolumeDB`                                                                | `main.maxVolume` /`main.maxVolumeDb`                                                                        |
| `zoneMain.equalizerBass` /`equalizerTreble` (+`Up` /`Down`)                                                        | `main.audio.bass` /`main.audio.treble` (+`Up` /`Down`)                                                     |
| `zoneMain.channelVolumeFrontLeft`...                                                                               | `main.channelVolume.frontLeft`...                                                                          |
| `zoneMain.iconURL`                                                                                                  | `main.cover`                                                                                                |
| `zoneMain.play`, `pause`, `playPause`, `skipPlus`, `skipMinus`                                                      | `remote.play`, `pause`, `playPause`, `next`, `previous`                                                    |
| `settings.powerSystem`                                                                                              | `system.power`                                                                                              |
| `settings.ecoMode`, `settings.speakerPreset`                                                                        | `system.ecoMode`, `system.speakerPreset`                                                                    |
| `settings.surroundMode`, `settings.soundModeMovie`...                                                              | `main.surroundMode`, `main.soundModeMovie`...                                                              |
| `settings.autoStandby`                                                                                              | `main.autoStandby`                                                                                          |
| `settings.cursorUp`... `settings.return`, `settings.setupMenu`                                                      | `remote.up`... `remote.back`, `remote.menu`                                                                 |
| `settings.multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevelOffset`                                             | `main.audio.multEq`, `dynamicEq`, `dynamicVolume`, `referenceLevel`                                         |
| `settings.subwooferLevel`, `subwooferLevelState`, `subwooferTwoLevel`                                               | `main.audio.subwooferLevel`, `subwooferLevelAdjust`, `subwoofer2Level`                                      |
| `settings.lfeAmount`, `audysseyLfc`, `containmentAmount`                                                            | `main.audio.lfe` (now 0 to -10 dB), `lfc`, `containment`                                                     |
| `settings.dialogLevel`, `dialogLevelAdjust`, `dialogControl`                                                        | `main.audio.dialogLevel`, `dialogLevelAdjust`, `dialogControl`                                              |
| `settings.toneControl`, `centerSpread`, `dynamicCompression`, `audioRestorer`, `inputMode`, `digitalInputMode`      | `main.audio.` + same name                                                                                   |
| `settings.outputMonitor`, `videoProcessingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` | `main.video.monitor`, `processingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` |
| `settings.soundModeGroup`                                                                                           | `info.soundModeGroup`                                                                                       |
| `settings.loadPreset`, `savePreset`, `info.onlinePresets`                                                           | `netAudio.loadPreset`, `savePreset`, `presets`                                                               |
| `display.displayContent0`...                                                                                       | `display.line0`...                                                                                         |
| `info.friendlyName`                                                                                                 | `info.name`                                                                                                 |
| `settings.expertCommand`, `expertReadingPattern`, `expertReadingResult`                                             | `expert.command`, `readingPattern`, `readingResult`                                                         |

The list indices from 1.x (e.g. `selectInput` =`'5'` (for TV) are no longer accepted.