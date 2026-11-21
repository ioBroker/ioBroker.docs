---
chapters: {"pages":{"en/adapterref/iobroker.denon/README.md":{"title":{"en":"ioBroker.denon"},"content":"en/adapterref/iobroker.denon/README.md"},"en/adapterref/iobroker.denon/docs/en/states.md":{"title":{"en":"All states"},"content":"en/adapterref/iobroker.denon/docs/en/states.md"},"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md":{"title":{"en":"Upgrading from 1.x to 2.0"},"content":"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.denon/docs/en/upgrade-1x.md
title: Обновление с версии 1.x до 2.0
hash: m/3fM4UxlLUSshcRV1Dv92U/urB5/X2mAwbw7/pM8C4=
---
# Обновление с версии 1.x до 2.0

[← вернуться к файлу README](/#/adapters/denon)

В версии 2.0 используется новое дерево объектов: состояния сгруппированы по функциям (основная зона, звук, видео, пульт дистанционного управления и т. д.) и имеют новые, согласованные названия. При первом запуске адаптер удаляет старые каналы. `settings`, `zoneMain`, `zone2`, `zone3`, `display` и `tuner` и создает новые состояния, как только получатель отвечает.

**Перед обновлением:**

- Скрипты, Blockly, виджеты VIS и псевдонимы, использующие состояния этого адаптера, необходимо переименовать (см. таблицу ниже).
- Настройки старых состояний (например, история/ведение журнала SQL) теряются и должны быть установлены заново в новых состояниях.
- Считываемые значения всегда представляют собой код получателя, например: `display.brightness` =`BRI` вместо `Bright` При написании текста принимается либо код, либо метка.

Основные изменения (зоны 2 и 3 одинаковы) `zone2.` /`zone3.` вместо `main.`):

| До 1.x                                                                                                              | Начиная с версии 2.0                                                                                        |
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
| `settings.loadPreset`, `savePreset`, `info.onlinePresets`                                                           | `netAudio.loadPreset`, `savePreset`, `presets`                                                              |
| `display.displayContent0`...                                                                                       | `display.line0`...                                                                                          |
| `info.friendlyName`                                                                                                 | `info.name`                                                                                                 |
| `settings.expertCommand`, `expertReadingPattern`, `expertReadingResult`                                             | `expert.command`, `readingPattern`, `readingResult`                                                         |

Перечислите значения индексов 1.x (например) `selectInput` =`'5'` (для телевидения) больше не принимаются.