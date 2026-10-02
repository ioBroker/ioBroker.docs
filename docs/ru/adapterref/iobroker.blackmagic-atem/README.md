---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.blackmagic-atem/README.md
title: ioBroker.blackmagic-atem
hash: e5wtXrs/34o/5BuBu/cZpnaGS+sttE0Rfxu5l3JxpSA=
---
# ioBroker.blackmagic-atem

![Версия NPM](https://img.shields.io/npm/v/iobroker.blackmagic-atem.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.blackmagic-atem.svg)
![Количество установок](https://iobroker.live/badges/blackmagic-atem-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/blackmagic-atem-stable.svg)
![Лицензия](https://img.shields.io/npm/l/iobroker.blackmagic-atem.svg)
![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.blackmagic-atem/workflows/Test%20and%20Release/badge.svg)

Управляйте видеомикшерами Blackmagic ATEM через ioBroker — поддерживаются все 21+ модели ATEM, от Mini до Constellation 4K+.

## Описание

Этот адаптер управляет видеомикшерами [Blackmagic Design ATEM](https://www.blackmagicdesign.com/products/atem) по сети. Он использует протокол ATEM UDP, полученный методом обратной разработки, через библиотеку [atem-connection](https://github.com/Sofie-Automation/sofie-atem-connection) и поддерживает более 21 варианта моделей — от ATEM Mini и Television Studio до Constellation 4K+ — с созданием состояния на основе возможностей, которое адаптируется к подключенному устройству.

## Функции

- **Переключение между режимами «Программа» и «Предварительный просмотр»** — смена входа для программы и предварительного просмотра.
- **Переходы** — Обрезка, Автоматический, Ручной Т-образный переключатель; Стили Микс / Дип / Вибрация / DVE / Стинг с разной стоимостью для каждого стиля.
- **Затемнение экрана** — переключение и настройка скорости FTB.
- **Клавишные манипуляторы** (до 4 на каждый M/E) — в эфире, тип, источник заполнения/ключевого сигнала, маска, выходной сигнал
- **Нисходящие ключи** (до 4) — в эфире, привязка, автоматическое управление, ставка, источник заполнения/ключевого сигнала
- **Дополнительные выходы** (до 48) — маршрутизация источников
- **Аудиомикшер** — общее усиление/баланс, мониторинг, усиление/баланс/микс для каждого входа (Classic + Fairlight)
- **Генераторы цвета** — оттенок/насыщенность/яркость
- **Потоковая передача** — запуск/остановка, состояние, использованный кэш (поддерживаемые модели)
- **Запись** — запуск/остановка, переключение дисков, продолжительность, оставшееся место (поддерживаемые модели)
- **Медиаплееры** — тип источника, индекс фото/видеоклипов, управление воспроизведением.
- **Итоги** — состояние итогов программы/предварительного просмотра
- **Макросы** — запуск, остановка, продолжение, цикл, именованные слоты (до 100)
- **Входные метаданные** — короткие/длинные имена, тип порта.
- **Автоматическое определение модели** — возможности, обнаруженные подключенным устройством.

## Требования

- js-controller >= 6.0.11
- ioBroker Admin >= 7.8.23
- Node.js >= 22
- Видеомикшер Blackmagic ATEM с возможностью подключения к сети.

## Установка

Установка через административный интерфейс ioBroker: **Адаптеры → найти `blackmagic-atem` → установить** .

## Конфигурация

1. Откройте конфигурацию экземпляра адаптера в административной панели ioBroker.
2. Введите IP-адрес вашего устройства ATEM.
3. Выберите модель (или оставьте включенным автоматическое определение).
4. При необходимости отрегулируйте интервал переподключения.
5. Сохраните и запустите адаптер.

## Государственное дерево

```
info.connection
device.{modelName, productId, videoMode, capabilities}
me[0-3].{programInput, previewInput, inTransition, transitionPosition}
me[0-3].transition.{style, mixRate, dipRate, wipeRate, dveRate, wipePattern}
me[0-3].fadeToBlack.{isFullyBlack, inTransition, rate}
me[0-3].usk[0-3].{onAir, type, fillSource, keySource, maskEnabled, flyEnabled}
commands.{cut, auto, ftb}
dsk[0-3].{onAir, tie, inTransition, rate, fillSource, keySource, auto}
aux[0-47].source
audio.master.{gain, balance, afv}
audio.monitor.{enabled, gain, mute, solo, dim}
audio.inputs.input[N].{gain, balance, mixOption}
audio.commands.resetPeaks
colorGenerator[0-1].{hue, saturation, luminance}
streaming.{status, start, stop, duration, cacheUsed}
recording.{status, start, stop, switchDisk, duration, remainingDiskSpace}
mediaPlayer[0-3].{sourceType, stillIndex, clipIndex, playing, loop, atBeginning}
tally.{programInputs, previewInputs}
macros.{run, stop, continue, isRunning, isWaiting, loop, runningIndex, recordedCount}
macros.slots[0-99].{name, isUsed, trigger}
inputs.input[N].{shortName, longName, inputId, portType}
```

Состояния создаются условно на основе обнаруженных/выбранных возможностей модели. «Сиротские» состояния удаляются при изменении модели.

## Пример использования

```javascript
// Switch program to camera 1
setState('blackmagic-atem.0.me0.programInput', 1);

// Perform a cut
setState('blackmagic-atem.0.commands.cut', true);

// Start streaming (supported models only)
setState('blackmagic-atem.0.streaming.start', true);

// Run macro 5
setState('blackmagic-atem.0.macros.run', 5);
```

## Ссылка на идентификатор ввода

| ИДЕНТИФИКАТОР | Источник                            |
| ------------- | ----------------------------------- |
| 1–8           | Входы камеры                        |
| 0             | Черный                              |
| 1000          | Цветовые полосы                     |
| 2001–2002     | Генераторы цвета 1, 2               |
| 3010, 3011    | Медиаплеер 1, 2                     |
| 3020, 3021    | Медиаплеер 1, 2 Key                 |
| 7001–7002     | Чистая подача 1, 2                  |
| 10010, 10011  | Программа, предварительный просмотр |

## Протокольные примечания

Этот адаптер использует протокол ATEM UDP (порт 9910), полученный методом обратной разработки, как это описано сообществом разработчиков открытого программного обеспечения:

- [Документация OpenSwitcher](https://docs.openswitcher.org/)
- [библиотека atem-connection](https://github.com/Sofie-Automation/sofie-atem-connection)

Протокол ATEM не предусматривает аутентификации — используйте устройства ATEM в доверенной частной сети.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.2.10 (2026-09-27)
- (Alan Paris) Fixed live updates on 2 M/E and 4 M/E switchers: changes to M/E 2-4 (program, preview, keyers, transitions) were not reflected until the next reconnect
- (Alan Paris) Fixed live updates when one packet changes several areas at once, and classic-audio input gain/balance/mix option now update live
- (Alan Paris) Fixed a connection leak: each network drop left the previous ATEM connection running, taking an extra switcher session
- (Alan Paris) Object definitions (roles, names, ranges) are now updated on existing installations, not only on fresh installs
- (Alan Paris) With model auto-detect, restarting the adapter no longer deletes states (and their history settings) that the connected model supports, e.g. M/E 2-4 or classic-audio monitor states
- (Alan Paris) device.modelName now shows the product name (e.g. "ATEM Mini Pro") and device.productId the numeric model ID; previously they were swapped
- (Alan Paris) Transition and fade-to-black rate states no longer default to 0, below their minimum of 1
- (Alan Paris) Adapter now requires admin >= 7.8.23
- (Alan Paris) Node.js 26 added to the test matrix
- (Alan Paris) Updated dependencies (@iobroker/adapter-core 3.4.3, @iobroker/testing 6.2.2)

### 0.2.9 (2026-07-12)
- (Alan Paris) Made macros.run write-only (it no longer retains the last-triggered index); use macros.runningIndex to read the active macro
- (Alan Paris) Renamed recording.remainingDiskSpace to "Remaining Recording Time" and documented that its value is seconds of available recording capacity, not bytes
- (Alan Paris) Stopped writing audio.master.afvCrossfade on Fairlight models, where the state does not exist

### 0.2.8 (2026-07-05)
- (Alan Paris) Fixed upstream-keyer mask/fly enable and downstream-key pre-multiplied controls, which were writable but ignored, so they now apply to the switcher
- (Alan Paris) Master audio gain now controls Fairlight mixers correctly (previously it sent a Classic-audio command that Fairlight models ignored)
- (Alan Paris) Hid Classic-only audio controls (master balance/AFV crossfade, monitor enable/solo/dim) on Fairlight models, where they had no effect
- (Alan Paris) Added default values to all dynamically created states

### 0.2.7 (2026-07-04)
- (Alan Paris) Added a link to the Blackmagic Design ATEM product page in the README
- (Alan Paris) Clamp the reconnect interval in code so out-of-range config values cannot break the timer
- (Alan Paris) Removed the unused `pollInterval` config option (the adapter is fully push-based)
- (Alan Paris) Removed the unused `audio.master.programOutGain` state

### 0.2.6 (2026-07-04)
- (Alan Paris) Updated atem-connection to 3.9.0 and dev dependencies (@iobroker/types, rimraf)
- (Alan Paris) Extended tsconfig from @tsconfig/node22 for standardized type checking
- (Alan Paris) Switched Dependabot to cron schedules to distribute update load

## License

MIT License — see [LICENSE](https://github.com/AlanSRU/ioBroker.blackmagic-atem/blob/main/LICENSE) for details.

Copyright (c) 2024-2026 Alan Paris <alan.paris@scottish.rugby>