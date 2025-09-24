---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: 077QgmId8Wc6BjXF7/rEBeZs5kRJRzb8K2n380L2S1U=
---
![Логотип](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Количество установок](http://iobroker.live/badges/musiccast-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**Тесты:** ![Тестирование и выпуск](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

адаптер для устройств Yamaha MusicCast, таких как WX-010/030, YSP-1600

## Настройки
На странице администратора значок «+» можно использовать для ручного добавления IP-адреса, идентификатора устройства, типа и имени.
Нажмите кнопку поиска для обнаружения. Если у вас несколько устройств, вам придётся нажимать кнопку несколько раз, пока все устройства не будут обнаружены. К сожалению, при обнаружении возвращается только один объект за раз, и это может быть любое из ваших устройств MusicCast. Если результат совпадает с уже имеющимся в таблице, вам придётся нажать кнопку ещё раз. Иногда помогает сохранение и повторное открытие страницы damin.

В маловероятном случае, если два или более устройств используют один и тот же идентификатор, немного измените один из них. В противном случае адаптер не сможет различить два устройства.

Если вы хотите видеть обновленную информацию о времени воспроизведения прослушиваемых треков, установите соответствующий флажок. Имейте в виду, что это увеличивает количество сообщений (каждую секунду для каждого устройства это пинг-понг обновлений).

## Доступных объектов
В настоящее время реализованы следующие объекты:

### Базовый (зона)
| Объект | Значение | Устанавливаемый | Описание |
| ----------------------------- | ------- | :------: | --------------------------------------- |
| {zone}.power | логическое значение | x | true/false -> ВКЛ/Режим ожидания |
| {zone}.zone_b | логическое значение | ? | true/false -> целевая зона — зона B |
| {zone}.mute | boolean | x | true/false -> отключен звук/не отключен звук |
| {zone}.volume | значение | x | 0...макс (макс в зависимости от устройства) |
| {zone}.act_vol_mode | текст | ? | фактическая громкость в режиме дБ |
| {zone}.act_vol_val | значение | ? | фактическая громкость в дБ |
| {zone}.act_vol_unit | text | - | фактическая единица измерения громкости (должна быть дБ) |
| {zone}.act_vol_mode_list | текст | - | фактическая громкость в дБ режимах |
| {zone}.input | текст | x | входы в зависимости от устройства |
| {zone}.input_list | текст | - | возможные входы |
| {zone}.input_text | текст | - | выбранный ввод как текст |
| {zone}.sound_program | текст | x | установить звуковую программу |
| {zone}.sound_program_list | текст | - | возможные звуковые программы |
| {zone}.surr_decoder_type | текст | ? | установить тип объемного звучания |
| {zone}.surr_decoder_type_list | текст | - | возможный декодер объемного звучания |
| {zone}.link_control | текст | x | установить управление ссылкой |
| {zone}.link_control_list | текст | - | возможные настройки управления ссылками |
| {zone}.link_audio_delay | text | x | установить задержку звука ссылки |
| {zone}.link_audio_delay_list | текст | - | возможные настройки задержки звука link link |
| {zone}.clearVoice | boolean | x | clear Голосовое управление |
| {zone}.low | значение | x | уровень эквалайзера низкий |
| {zone}.mid | значение | x | уровень эквалайзера mid |
| {zone}.high | значение | x | уровень эквалайзера высокий |
| {zone}.subwoofer_volume | значение | x | уровень громкости сабвуфера |
| {zone}.bass | значение | x | уровень баса |
| {zone}.treble | значение | x | уровень высоких частот |
| {zone}.tone_control_mode_list | текст | - | возможный режим управления тембром |
| {zone}.tone_mode | логическое значение | ? | режим управления тембром |
| {zone}.balance | значение | x | уровень баланса |
| {zone}.direct | логическое значение | x | установить прямой |
| {zone}.pure_direct | boolean | x | установить чистый прямой |
| {zone}.enhancer | логическое значение | x | установить усилитель |
| {zone}.bass_extension | логическое значение | x | установить расширение баса |
| {zone}.sleep | значение | x | таймер сна |
| {zone}.disable_flags | логическое значение | x | установить disable_flags |
| {zone}.contents_display | логическое значение | x | установить content_display |
| {zone}.party_enable | логическое значение | x | установить party_enable |
| {zone}.extra_bass | логическое значение | x | установить extra_bass |
| {zone}.adaptive_drc | логическое значение | x | установить adaptive_drc |
| {zone}.dts_dialogue_control | значение | x | установить dts_dialogue_control |
| {zone}.adaptive_dsp_level | логическое значение | x | установить adaptive_dsp_level |

### Netusb
| Объект | Значение | Устанавливаемый | Описание |
| ------------------------- | ------- | :------: | -------------------------------------------------- |
| netusb.input | значение | x | заданный/фактический ввод |
| netusb.playPause | boolean | x | set Воспроизведение/Пауза |
| netusb.playback | текст | - | статус сетевого проигрывателя |
| netusb.stop | boolean | x | set Stop |
| netusb.auto_stop | boolean | - | автоматически остановлен |
| netusb.next | boolean | x | set Forward |
| netusb.prev | boolean | x | set Перемотка назад |
| netusb.shuffle | boolean | x | включить перемешивание |
| netusb.shuffle_stat | текст | - | статус перемешивания |
| netusb.repeat | boolean | x | включить повтор |
| netusb.repeat_stat | текст | - | повторить статус |
| netusb.artist | текст | - | имя исполнителя |
| netusb.album | текст | - | название альбома |
| netusb.track | текст | - | имя трека |
| netusb.albumart_url | текст | - | http-адрес для обложки альбома |
| netusb.albumart_id | значение | - | идентификатор обложки альбома |
| netusb.play_time | значение | - | время воспроизведения в с |
| netusb.play_queue_type | текст | - | тип очереди netusb |
| netusb.total_time | значение | - | общее время воспроизведения в с |
| netusb.recent_info | json | - | история воспроизведенных предметов |
| netusb.preset_info | json | - | сохраненные предустановки/избранное |
| netusb.presetrecallnumber | значение | x | вызвать # из списка избранного |
| netusb.usb_devicetype | текст | - | тип подключенного USB-устройства |
| netusb.attribute | значение | - | какие возможности имеет служба, подлежащая декодированию |
| netusb.recallRecentItem | значение | x | какие возможности есть у сервиса, который нужно декодировать |

### Система
| Объект | Значение | Устанавливаемый | Описание |
| ------------------------------------------- | ----- | :------: | ------------------------------------- |
| system.api_version | значение | - | Версия API |
| system.system_version | значение | - | Версия системы |
| system.inputs.{service} | значение | - | доступная служба ввода |
| system.inputs.{service}.account_enable | значение | - | доступная служба ввода включена |
| system.inputs.{service}.distribution_enable | значение | - | доступная распределяемая служба ввода |
| system.inputs.{service}.play_info_type | значение | - | доступный тип службы ввода |

### CD-плеер
| Объект | Значение | Устанавливаемый | Описание |
| --------------- | ------- | :------: | ------------------------- |
| cd.playPause | boolean | x | set Воспроизведение/Пауза |
| cd.playback | текст | - | статус CD проигрывателя |
| cd.stop | логическое значение | x | set Stop |
| cd.next | boolean | x | set Forward |
| cd.prev | boolean | x | set Перемотка назад |
| cd.shuffle | boolean | x | включить перемешивание |
| cd.shuffle_stat | текст | - | статус перемешивания |
| cd.repeat | логическое значение | x | включить повтор |
| cd.repeat_stat | текст | - | статус повтора |
| cd.device_stat | текст | - | состояние устройства |
| cd.playtime | значение | - | текущее время воспроизведения |
| cd.totaltime | значение | - | общее время текущего трека |
| cd.disctime | значение | - | общее время CD |
| cd.tracknumber | значение | - | текущий воспроизводимый трек |
| cd.totaltracks | значение | - | всего треков CD |
| cd.artist | текст | - | имя исполнителя |
| cd.album | текст | - | название альбома |
| cd.track | текст | - | название трека |

### Тюнер
| Объект | Значение | Устанавливаемый | Описание |
| ------------------------------- | ------- | :------: | -------------------------------- |
| tuner.common_preset_info | array | - | Информация о предустановках |
| tuner.am.preset_info | array | - | Предустановленная информация AM |
| tuner.fm.preset_info | array | - | Информация о предустановленных FM-станциях |
| tuner.dab.preset_info | array | - | Предустановленная информация DAB |
| tuner.am.preset | номер | x | номер предустановки AM |
| tuner.am.freq | номер | x | Частота AM в кГц |
| tuner.am.tuned | boolean | - | AM настроен |
| tuner.fm.preset | номер | x | Номер предустановки FM |
| tuner.fm.freq | номер | x | Частота FM в кГц |
| tuner.fm.tuned | boolean | - | FM настроен |
| tuner.fm.audio_mode | string | - | FM моно/стерео |
| tuner.dab.preset | номер | x | Номер предустановки DAB |
| tuner.dab.id | номер | - | Идентификатор станции DAB |
| tuner.dab.status | string | - | статус DAB |
| tuner.dab.freq | номер | - | Частота DAB |
| tuner.dab.category | string | - | primary/secondary |
| tuner.dab.audio_mode | string | - | DAB моно/стерео |
| tuner.dab.bit_rate | number | - | Скорость передачи данных DAB в кбит/с |
| tuner.dab.quality | номер | - | Качество DAB 0-100 |
| Tuner.dab.tune_aid | номер |    - | Уровень сигнала DAB 0–100 |
| tuner.dab.off_air | boolean | - | DAB off-air |
| tuner.dab.dab_plus | логическое значение | - | DAB+ |
| tuner.dab.program_type | string | - | Тип программы DAB |
| tuner.dab.ch_label | string | - | Метка канала DAB |
| tuner.dab.service_label | string | - | Метка службы DAB |
| tuner.dab.dls | string | - | DAB DLS |
| tuner.dab.ensemble_label | string | - | Метка ансамбля DAB |
| tuner.dab.initial_scan_progress | number | - | Ход начального сканирования DAB 0-100 |
| tuner.dab.total_station_num | number | - | Общее количество станций DAB 0-255 |
| tuner.rds.program_type | string | - | Тип программы RDS |
| tuner.rds.program_service | string | - | Служба программ RDS |
| tuner.rds.radio_text_a | string | - | RDS текст A |
| tuner.rds.radio_text_b | string | - | RDS текст B |

### Часы
| Объект | Значение | Устанавливаемый | Описание |
| ------------------------------- | ------- | :------: | ------------------------------------------ |
| clock.auto_sync | boolean | x | Автоматическая синхронизация часов |
| clock.format | string | x | Формат часов 12h/24h |
| clock.alarm_on | boolean | x | Состояние будильника вкл/выкл |
| clock.volume | number | x | Громкость будильника |
| clock.fade_interval | number | x | Интервал затухания будильника |
| clock.fade_type | number | x | Тип затухания будильника |
| clock.mode | string | x | Режим будильника: один день/еженедельно |
| clock.repeat | boolean | x | Повтор будильника, если указан один день |
| clock.{day}.enable | boolean | x | Действительность настройки часов |
| clock.{day}.time | string | - | Время начала срабатывания будильника ччмм 00-23,00-59 |
| clock.{day}.beep | boolean | x | Действительность сигнала часов |
| clock.{day}.playback_type | string | - | Возобновление/предустановка типа воспроизведения будильника |
| clock.{day}.resume_input | string | - | ID входа возобновления будильника |
| clock.{day}.preset_type | string | - | Тип предустановки будильника |
| clock.{day}.preset_num | number | - | ID входа предустановки будильника |
| clock.{day}.preset_netusb_input | string | - | Идентификатор входа netusb будильника |
| часы.{день}.preset_netusb_text | строка | - | Будильник netusb текст |
| clock.{day}.preset_tuner_band | string | - | Диапазон тюнера будильника |
| clock.{day}.preset_tuner_number | номер | - | Частота тюнера будильника или идентификатор станции |

## Задача
- поддержка списков
- изменение значений взаимодействия на приятные названия
- быстрая перемотка вперед/перемотка вперед для NETUSB/CD
- Bluetooth
- уровень диалога

## 1.0.0 ВАЖНЕЙШИЕ ИЗМЕНЕНИЯ
— DeviceId раньше был systemId, который не является уникальным. Теперь используется deviceId, что меняет дерево объектов.
- API Musiccast 2.0.0
- поиск устройств теперь может возвращать более одного устройства
- новый вывод для разработчика в админ-панели
- больше асинхронности/ожидания
- исправленное тестирование

#### 0.2.2
- API Musiccast 0.0.14

#### 0.2.1
- лицензия 2022
- коррекция зависимости

#### 0.2.0
- рефакторинг с помощью «создать адаптер»
- асинхронный/ожидающий

#### 0.1.5
- (Scrounger) обработка ошибок, когда устройство недоступно

#### 0.1.4
- (Scrounger) исправление несоответствия типов (объект массива)

#### 0.1.3
- (foxthefox) добавлена запись для linkControl/linkAudioDelay/linkAudioQuality

#### 0.1.2
- (Scrounger) исправление несоответствия типов (строка boolean)

#### 0.1.1
- поправка на часы "oneday"

#### 0.1.0
- компактный режим
- yamaha-yxc-nodejs 0.0.8
- обновление виджета

#### 0.0.9
- adminV3 использует values2table и снова добавляет кнопку
- зоны 2/3/4 теперь работают
- расширенное автоматическое тестирование
- кнопка в админке для сбора JSON-ответов

#### 0.0.8
- автоматическое обновление тестирования
- имя, указанное на странице администратора, для отображения в объекте (устройстве)

#### 0.0.7
- поддержка тюнера
- поддержка часов (в основном информация)
- поддержка большего количества зон
- поддержка mc-link
- установка минимальных и максимальных значений в соответствии с характеристиками
- администратор v3

#### 0.0.6
- набор виджетов, соответствующих объектам и элементам управления
- cd.shuffle_stat логическое значение -> текст
- новый netusb.shuffle_stat (текст)
- обновление статуса через подписку на UDP-сообщения
- включить обновление информации о времени воспроизведения (отключение уменьшает трафик)

#### 0.0.5
- очистка на странице администратора
- улучшение создания объектов
- больше объектов на netusb
- больше объектов в системе
- добавлена поддержка CD

#### 0.0.4
- новые объекты и функции (input, sound_prog, EQ, clearVoice)
- поиск/обнаружение на странице администратора

#### 0.0.3
- реализовано больше объектов

#### 0.0.2
- незначительные исправления

#### 0.0.1
- начальный релиз с настройкой IP на странице конфигурации,
- доступны команды питания, отключения звука, громкости

## Changelog

### 1.2.1

- materialize -> jsonUI

### 1.2.0

- issue #388 dab.freq and dab.bit_rate min=0
- dependency update
- issue #412 dab.preset correction

### 1.1.4

- fixed main.surround_ai
- update devDeps, eslint corrections
- IOB checker corrections

### 1.1.3

- translation with adapter-dev

### 1.1.2

- new version yamahe-yxc library

### 1.1.1

- (scrounger) added datapoint isOnline, used by ioBroker.device-watcher

### 1.1.0 (npm)

- improved testing

### 1.0.8

- error correction add_to_group/remove_from_group

#### 1.0.7

- error correction in link/unlink/distribution

#### 1.0.6

- (scrounger) recallRecentItem added

#### 1.0.5

- usage of new IOB test library

#### 1.0.4

- correction for setting the input ("setInput")

#### 1.0.3

- new datapoint "extra_bass"
- new datapoint "adaptive_drc"
- new datapoint "dts_dialogue_control"
- new datapoint "adaptive_dsp_level"
- these are only read in, most likely they are commands, but the API is unknown

#### 1.0.2

- new datapoint "input_text"

#### 1.0.1

- changed algorithm for developer support

## License

The MIT License (MIT)

Copyright (c) 2017 - 2025 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2025 foxthefox <foxthefox@wysiwis.net>