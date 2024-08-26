---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: T5qSweTthdZEApvP+6oMSEZA/qXiooHxcYxHPtmHTrc=
---
![Логотип](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Количество установок](http://iobroker.live/badges/musiccast-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**Тесты:** ![Тестирование и выпуск](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

адаптер для устройств Yamaha MusicCast, таких как WX-010/030, YSP-1600

## Монтаж:
Для установки требуется как минимум nodejs v10.

из НПМ

```javascript
npm install iobroker.musiccast
```

актуальная версия с github (это может сработать не всегда, пока идет разработка)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Настройки
На странице администратора «+» можно использовать для добавления вручную IP-адреса, DeviceID, типа и имени.
Нажмите кнопку поиска для открытия. Если у вас несколько устройств, вам придется нажать кнопку несколько раз, пока все устройства не будут обнаружены. К сожалению, обнаружение одновременно возвращает только один объект, и это может быть любое из ваших устройств MusicCast. Если возврат такой же, как и уже часть таблицы, вам придется нажать кнопку еще раз. Иногда помогает сохранить и снова открыть страницу даммина.

В том маловероятном случае, когда два или более устройств передают один и тот же идентификатор, слегка измените один идентификатор. В противном случае адаптер не сможет различить два устройства.

Если вы хотите, чтобы время воспроизведения обновлялось для треков, которые вы слушаете, установите/установите соответствующий флажок. Имейте в виду, что это увеличивает количество сообщений (каждую секунду для каждого устройства происходит пинг-понг обновлений).

## Доступных объектов
На данный момент реализованы следующие объекты:

### Базовый (зона)
|Объект|Значение|настраиваемое|Описание|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> ON/Standby|
|{zone}.zone_b|boolean|?|true/false -> целевой зоной является зона B|
|{zone}.mute|boolean|x|true/false -> звук отключен/не отключен|
|{zone}.volume|value|x|0...max (макс. в зависимости от устройства)|
|{zone}.act_vol_mode|текст|?|фактическая громкость в режиме дБ|
|{zone}.act_vol_val|значение|?|фактическая громкость в дБ значение|
|{zone}.act_vol_unit|текст|-|фактическая единица громкости (должно быть дБ)|
|{zone}.act_vol_mode_list|текст|-|фактическая громкость в режимах дБ|
|{zone}.input|текст|x|входы в зависимости от устройства|
|{зона}.input_list|текст|-|возможные входные данные|
|{zone}.input_text|текст|-|выбран ввод как текст|
|{zone}.sound_program|text|x|установить звуковую программу|
|{zone}.sound_program_list|текст|-|возможные звуковые программы|
|{zone}.surr_decoder_type|текст|?|установить тип объемного звучания|
|{zone}.surr_decoder_type_list|текст|-|возможный декодер объемного звучания|
|{zone}.link_control|text|x|установить управление ссылкой|
|{zone}.link_control_list|текст|-|возможные настройки управления ссылками|
|{zone}.link_audio_delay|text|x|установить задержку звука по ссылке|
|{zone}.link_audio_delay_list|текст|-|возможные настройки задержки звука ссылки |
|{zone}.clearVoice|boolean|x|очистить голосовое управление|
|{zone}.low|value|x|уровень эквалайзера низкий|
|{зона}.mid|значение|x|уровень эквалайзера Mid|
|{zone}.high|value|x|уровень эквалайзера высокий|
|{zone}.subwoofer_volume|значение|x|уровень громкости сабвуфера|
|{zone}.bass|значение|x|уровень баса|
|{зона}.treble|значение|x|уровень высоких частот|
|{zone}.tone_control_mode_list|текст|-|возможный режим управления тембром|
|{zone}.tone_mode|boolean|?|режим управления тоном|
|{зона}.баланс|значение|x|баланс уровня|
|{зона}.direct|логическое значение|x|установить прямую|
|{zone}.pure_direct|boolean|x|установить чистый прямой|
|{zone}.enhancer|boolean|x|установить усилитель|
|{zone}.bass_extension|boolean|x|установить расширение баса|
|{зона}.sleep|значение|x|таймер сна|
|{zone}.disable_flags|boolean|x|установить отключенные_флаги|
|{zone}.contents_display|boolean|x|установить содержимое_display|
|{zone}.party_enable|boolean|x|set party_enable|
|{zone}.extra_bass|boolean|x|set extra_bass|
|{zone}.adaptive_drc|boolean|x|set Adaptive_drc|
|{зона}.dts_dialogue_control|значение|x|установить dts_dialogue_control|
|{zone}.adaptive_dsp_level|boolean|x|set Adaptive_dsp_level|

### Нетусб
|Объект|Значение|настраиваемое|Описание|
|--------|-------|:-:|--------|
|netusb.input|значение|x|заданный/фактический ввод|
|netusb.playPause|boolean|x|установить воспроизведение/паузу|
|netusb.playback|текст|-|статус сетевого игрока|
|netusb.stop|boolean|x|установить стоп|
|netusb.auto_stop|логическое значение|-|автоматически остановлено|
|netusb.next|boolean|x|установить вперед|
|netusb.prev|boolean|x|установить перемотку назад|
|netusb.shuffle|boolean|x|переключить перемешивание|
|netusb.shuffle_stat|текст|-|статус перемешивания|
|netusb.repeat|логическое значение|x|переключить повтор|
|netusb.repeat_stat|текст|-|повторить статус|
|netusb.artist|текст|-|имя исполнителя|
|netusb.album|текст|-|название альбома|
|netusb.track|текст|-|название трека|
|netusb.albumart_url|текст|-|http-адрес для обложки альбома|
|netusb.albumart_id|значение|-|идентификатор обложки альбома|
|netusb.play_time|значение|-|время воспроизведения в с|
|netusb.play_queue_type|текст|-|тип очереди netusb|
|netusb.total_time|значение|-|общее время игры в с|
|netusb.recent_info|json|-|история сыгранных предметов|
|netusb.preset_info|json|-|сохраненные пресеты/избранное|
|netusb.presetrecallnumber|значение|x|вызов # из списка избранного|
|netusb.usb_devicetype|текст|-|тип подключенного USB-устройства|
|netusb.attribute|значение|-|который, возможно, имеет услугу, подлежащую декодированию|
|netusb.recallRecentItem|значение|x|какие возможности имеют сервис, подлежащий декодированию|

### Система
|Объект|Значение|настраиваемое|Описание|
|--------|-------|:-:|--------|
|system.api_version|значение|-|Версия API|
|system.system_version|значение|-|Версия системы|
|system.inputs.{service}|значение|-|доступный сервис ввода|
|system.inputs.{service}.account_enable|значение|-|доступная служба ввода включена|
|system.inputs.{service}.distribution_enable|значение|-|доступный распространяемый входной сервис|
|system.inputs.{service}.play_info_type|значение|-|доступный тип службы ввода|

### CD-плеер
|Объект|Значение|настраиваемое|Описание|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|установить воспроизведение/паузу|
|cd.playback|текст|-|статус проигрывателя компакт-дисков|
|cd.stop|boolean|x|установить стоп|
|cd.next|boolean|x|установить вперед|
|cd.prev|boolean|x|установить перемотку назад|
|cd.shuffle|boolean|x|переключить перемешивание|
|cd.shuffle_stat|текст|-|статус перемешивания|
|cd.repeat|логическое значение|x|переключить повтор|
|cd.repeat_stat|текст|-|повторить статус|
|cd.device_stat|текст|-|статус устройства|
|cd.playtime|значение|-|текущее время воспроизведения|
|cd.totaltime|значение|-|общее время текущего трека|
|cd.disctime|значение|-|Общее время компакт-диска|
|cd.tracknumber|значение|-|текущая дорожка в воспроизведении|
|cd.totaltracks|значение|-|всего треков компакт-диска|
|cd.artist|текст|-|имя исполнителя|
|cd.album|текст|-|название альбома|
|cd.track|текст|-|название трека|

### Тюнер
|Объект|Значение|настраиваемое|Описание|
|--------|-------|:-:|--------|
|tuner.common_preset_info|массив|-|Информация о предустановках|
|tuner.am.preset_info|array|-|Информация о предустановленной AM|
|tuner.fm.preset_info|array|-|Информация о предустановленной FM|
|tuner.dab.preset_info|array|-|Информация о предустановленных настройках DAB|
|tuner.am.preset|номер|x|Номер предустановки AM|
|tuner.am.freq|число|x|Частота AM в кГц|
|tuner.am.tuned|логическое значение|-|AM настроено|
|tuner.fm.preset|номер|x|Номер предустановки FM|
|tuner.fm.freq|число|x|Частота FM в кГц|
|tuner.fm.tuned|логическое значение|-|Настройка FM|
|tuner.fm.audio_mode|строка|-|FM моно/стерео|
|tuner.dab.preset|номер|x|Номер предустановки DAB|
|tuner.dab.id|номер|-|Идентификатор станции DAB|
|tuner.dab.status|строка|-|Состояние DAB|
|tuner.dab.freq|номер|-|частота DAB|
|tuner.dab.category|строка|-|первичный/вторичный|
|tuner.dab.audio_mode|строка|-|DAB моно/стерео|
|tuner.dab.bit_rate|число|-|Скорость передачи данных DAB в кбит/с|
|tuner.dab.quality|номер|-|Качество DAB 0–100|
|tuner.dab.tune_aid|номер|-|Сила сигнала DAB 0–100|
|tuner.dab.off_air|boolean|-|DAB отключен от эфира|
|tuner.dab.dab_plus|логическое значение|-|DAB+|
|tuner.dab.program_type|строка|-|Тип программы DAB|
|tuner.dab.ch_label|строка|-|метка DAB CH|
|tuner.dab.service_label|строка|-|Служебная метка DAB|
|tuner.dab.dls|строка|-|DAB DLS|
|tuner.dab.ensemble_label|строка|-|метка ансамбля DAB|
|tuner.dab.initial_scan_progress|число|-|Прогресс начального сканирования DAB 0-100|
|tuner.dab.total_station_num|номер|-|Тахеометры DAB 0–255|
|tuner.rds.program_type|строка|-|Тип программы RDS|
|tuner.rds.program_service|строка|-|программный сервис RDS|
|tuner.rds.radio_text_a|строка|-|текст RDS A|
|tuner.rds.radio_text_b|строка|-|текст RDS B|

### Часы
|Объект|Значение|настраиваемое|Описание|
|--------|-------|:-:|--------|
|lock.auto_sync|boolean|x|Автосинхронизация часов|
|lock.format|string|x|Формат часов 12ч/24ч|
|lock.alarm_on|boolean|x|Состояние будильника вкл./выкл.|
|lock.volume|number|x|Громкость будильника|
|lock.fade_interval|number|x|Интервал затухания будильника|
|lock.fade_type|number|x|Тип исчезновения будильника|
|lock.mode|string|x|Режим будильника один день/еженедельно|
|lock.repeat|boolean|x|Повтор будильника, если указан один день|
|lock.{day}.enable|boolean|x|Действительность настройки часов|
|lock.{day}.time|строка|-|Время включения будильника ччмм 00-23,00-59|
|lock.{day}.beep|boolean|x|Действительность звукового сигнала|
|lock.{day}.playback_type|string|-|Тип воспроизведения будильника возобновление/предустановка|
|lock.{day}.resume_input|string|-|Идентификатор входа возобновления будильника |
|lock.{day}.preset_type|string|-|Тип предустановки будильника|
|часы.{день}.preset_num|номер|-|Идентификатор входа предустановленного сигнала будильника|
|lock.{day}.preset_netusb_input|string|-|Идентификатор входа netusb будильника |
|lock.{day}.preset_netusb_text|строка|-|Текст будильника netusb|
|lock.{day}.preset_tuner_band|строка|-|Диапазон тюнера будильника|
|lock.{day}.preset_tuner_number|номер|-|Частота тюнера будильника или идентификатор станции|

## Делать
* поддержка списков
* изменение значений взаимодействия на красивое наименование
* быстрая перемотка вперед/перемотка вперед для NETUSB/CD
* Bluetooth
* уровень диалога

## 1.0.0 СЕРЬЕЗНЫЕ ИЗМЕНЕНИЯ
* идентификатор устройства ранее был идентификатором системы, который не является уникальным. Теперь используется deviceId, это меняет дерево объектов
* API музыкального вещания 2.0.0
* поиск устройств теперь может возвращать более 1 устройства
* новый вывод для разработчика в админ-панели
* больше асинхронности/ожидания
* исправлено тестирование

#### 0.2.2
* API музыкального вещания 0.0.14

#### 0.2.1
* лицензия 2022 г.
* коррекция зависимости

#### 0.2.0
* рефакторинг с помощью «создать адаптер»
* асинхронный/ожидание

#### 0.1.5
* (Scrounger) обработка ошибок, когда устройство недоступно

#### 0.1.4
* (Scrounger) исправление несоответствия типов (объект массива)

#### 0.1.3
* (foxthefox) добавлена запись для linkControl/linkAudioDelay/linkAudioQuality.

#### 0.1.2
* (Scrunger) исправление несоответствия типов (строковое логическое значение)

#### 0.1.1
* поправка на часы «один день»

#### 0.1.0
* компактный режим
* yamaha-yxc-nodejs 0.0.8
* обновление виджета

#### 0.0.9
* adminV3 использует таблицу значений2 и снова добавляет кнопку
* зона 2/3/4 теперь работает
* расширенное автоматическое тестирование
* кнопка в админке для сбора ответов в формате JSON

#### 0.0.8
* автоматическое обновление тестирования
* имя, указанное на странице администратора, будет отображаться в объекте (устройстве)

#### 0.0.7
* поддержка тюнера
* круглосуточная поддержка (в основном информационная)
* поддержка большего количества зон
* поддержка MC-Link
* установка минимального и максимального значений в соответствии с характеристиками
* админ v3

#### 0.0.6
* набор виджетов, соответствующий объектам и элементам управления
* cd.shuffle_stat boolean -> текст
* новый netusb.shuffle_stat (текст)
* обновление статуса посредством подписки на UDP-сообщения
* переключатель для обновления информации о времени игры (отключение уменьшает трафик)

#### 0.0.5
* очистка в админке
* улучшение создания объектов
* больше объектов на netusb
* больше объектов в системе
* добавлена поддержка CD

#### 0.0.4
* новые объекты и функции (вход, sound_prog, EQ,clearVoice)
* поиск/обнаружение на странице администратора

#### 0.0.3
* реализовано больше объектов

#### 0.0.2
* небольшие исправления

#### 0.0.1
* первоначальный выпуск с настройкой IP на странице конфигурации,
* доступные команды: питание, отключение звука, громкость

## Changelog
### 1.1.3
* translation with adapter-dev

### 1.1.2
* new version yamahe-yxc library

### 1.1.1
*  (scrounger) added datapoint isOnline, used by ioBroker.device-watcher

### 1.1.0 (npm)
* improved testing

### 1.0.8
* error correction add_to_group/remove_from_group

#### 1.0.7
* error correction in link/unlink/distribution

#### 1.0.6
* (scrounger) recallRecentItem added

#### 1.0.5
* usage of new IOB test library

#### 1.0.4
* correction for setting the input ("setInput")

#### 1.0.3
* new datapoint "extra_bass"
* new datapoint "adaptive_drc"
* new datapoint "dts_dialogue_control"
* new datapoint "adaptive_dsp_level"
* these are only read in, most likely they are commands, but the API is unknown

#### 1.0.2
* new datapoint "input_text"

#### 1.0.1
* changed algorithm for developer support

## License

The MIT License (MIT)

Copyright (c) 2017 - 2023 foxthefox <foxthefox@wysiwis.net>
