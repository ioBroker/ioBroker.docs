---
chapters: {"pages":{"en/adapterref/iobroker.denon/README.md":{"title":{"en":"ioBroker.denon"},"content":"en/adapterref/iobroker.denon/README.md"},"en/adapterref/iobroker.denon/docs/en/states.md":{"title":{"en":"All states"},"content":"en/adapterref/iobroker.denon/docs/en/states.md"},"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md":{"title":{"en":"Upgrading from 1.x to 2.0"},"content":"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.denon/docs/en/upgrade-1x.md
title: Upgrade von Version 1.x auf 2.0
hash: m/3fM4UxlLUSshcRV1Dv92U/urB5/X2mAwbw7/pM8C4=
---
# Upgrade von Version 1.x auf 2.0

[← zurück zur README-Datei](/#/adapters/denon)

Version 2.0 verfügt über eine neue Objektstruktur: Zustände sind nach Funktion gruppiert (Hauptzone, Ton, Video, Fernbedienung usw.) und haben neue, einheitliche Namen. Beim ersten Start löscht der Adapter die alten Kanäle. `settings`, `zoneMain`, `zone2`, `zone3`, `display` Und `tuner` und erstellt die neuen Zustände, sobald der Empfänger antwortet.

**Vor dem Update:**

- Skripte, Blockly- und VIS-Widgets sowie Aliase, die Zustände dieses Adapters verwenden, müssen in die neuen Namen (siehe Tabelle unten) geändert werden.
- Die Einstellungen der alten Zustände (z. B. Verlauf/SQL-Protokollierung) gehen verloren und müssen in den neuen Zuständen erneut eingestellt werden.
- Gelesene Werte sind immer der Code des Empfängers, z. B. `display.brightness` =`BRI` anstatt `Bright` Die Schreibfunktion akzeptiert den Code oder die Bezeichnung.

Wichtigste Änderungen (Zone 2 und 3 gleich mit `zone2.` /`zone3.` anstatt `main.`):

| Bis zu 1.x                                                                                                          | Ab Version 2.0                                                                                              |
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
| `settings.lfeAmount`, `audysseyLfc`, `containmentAmount`                                                            | `main.audio.lfe` (jetzt 0 bis -10 dB), `lfc`, `containment`                                                  |
| `settings.dialogLevel`, `dialogLevelAdjust`, `dialogControl`                                                        | `main.audio.dialogLevel`, `dialogLevelAdjust`, `dialogControl`                                              |
| `settings.toneControl`, `centerSpread`, `dynamicCompression`, `audioRestorer`, `inputMode`, `digitalInputMode`      | `main.audio.` + gleicher Name                                                                               |
| `settings.outputMonitor`, `videoProcessingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` | `main.video.monitor`, `processingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` |
| `settings.soundModeGroup`                                                                                           | `info.soundModeGroup`                                                                                       |
| `settings.loadPreset`, `savePreset`, `info.onlinePresets`                                                           | `netAudio.loadPreset`, `savePreset`, `presets`                                                              |
| `display.displayContent0`...                                                                                       | `display.line0`...                                                                                          |
| `info.friendlyName`                                                                                                 | `info.name`                                                                                                 |
| `settings.expertCommand`, `expertReadingPattern`, `expertReadingResult`                                             | `expert.command`, `readingPattern`, `readingResult`                                                         |

Listenindexwerte von 1.x auf (z. B. `selectInput` =`'5'` (für Fernsehen) werden nicht mehr akzeptiert.