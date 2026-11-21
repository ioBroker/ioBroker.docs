---
chapters: {"pages":{"de/adapterref/iobroker.denon/README.md":{"title":{"de":"ioBroker.denon – Denon/Marantz AV-Receiver"},"content":"de/adapterref/iobroker.denon/README.md"},"de/adapterref/iobroker.denon/states.md":{"title":{"de":"Alle Datenpunkte"},"content":"de/adapterref/iobroker.denon/states.md"},"de/adapterref/iobroker.denon/upgrade-1x.md":{"title":{"de":"Update von 1.x auf 2.0"},"content":"de/adapterref/iobroker.denon/upgrade-1x.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.denon/upgrade-1x.md
title: Обновление с версии 1.x до 2.0
hash: z2RpA1k/UsN89ROtO7mMBVzqUnihDq4XEhCmNUkUhhM=
---
# Обновление с версии 1.x до 2.0

[← вернуться к файлу README](/#/adapters/denon)

В версии 2.0 структура дерева объектов была реструктурирована: точки данных отсортированы по функциям (основная зона, звук, изображение, пульт дистанционного управления и т. д.) и получили новые, единообразные имена. При первом запуске адаптер удаляет старые каналы. `settings`, `zoneMain`, `zone2`, `zone3`, `display` и `tuner` и создает новые сразу после ответа получателя.

**Перед обновлением обратите внимание на следующее:**

- Скрипты, Blockly, виджеты VIS и псевдонимы, использующие точки данных адаптера, необходимо переименовать в новые имена (таблица ниже).
- Настройки в старых точках данных (например, история/запись SQL) будут потеряны и должны быть сброшены в новых точках данных.
- Теперь считываемые значения всегда представляют собой код получателя, например: `display.brightness` =`BRI` вместо `Bright` Запись осуществляется с использованием кода или отображаемого имени.

Наиболее важные изменения (зоны 2 и 3 одинаковы, только с `zone2.` или `zone3.` вместо `main.`):

| До 1.x                                                                                                              | Версия 2.0 и более поздние                                                                                  |
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
| `settings.lfeAmount`, `audysseyLfc`, `containmentAmount`                                                            | `main.audio.lfe` (теперь от 0 до -10 дБ), `lfc`, `containment`                                               |
| `settings.dialogLevel`, `dialogLevelAdjust`, `dialogControl`                                                        | `main.audio.dialogLevel`, `dialogLevelAdjust`, `dialogControl`                                              |
| `settings.toneControl`, `centerSpread`, `dynamicCompression`, `audioRestorer`, `inputMode`, `digitalInputMode`      | `main.audio.` + то же имя                                                                                   |
| `settings.outputMonitor`, `videoProcessingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` | `main.video.monitor`, `processingMode`, `pictureMode`, `hdmiResolution`, `analogResolution`, `aspectRatio` |
| `settings.soundModeGroup`                                                                                           | `info.soundModeGroup`                                                                                       |
| `settings.loadPreset`, `savePreset`, `info.onlinePresets`                                                           | `netAudio.loadPreset`, `savePreset`, `presets`                                                               |
| `display.displayContent0`...                                                                                       | `display.line0`...                                                                                         |
| `info.friendlyName`                                                                                                 | `info.name`                                                                                                 |
| `settings.expertCommand`, `expertReadingPattern`, `expertReadingResult`                                             | `expert.command`, `readingPattern`, `readingResult`                                                         |

Список индексов из версии 1.x (например, `selectInput` =`'5'` (для телевидения) больше не принимаются.