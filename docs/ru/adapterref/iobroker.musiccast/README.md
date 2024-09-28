---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: +Y3fTE3nCjE0f9m03KWr9TD02GnweDhdmOqMaSdMScg=
---
![Логотип](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Количество установок](http://iobroker.live/badges/musiccast-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**Тесты:** ![Тест и выпуск](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

адаптер для устройств Yamaha MusicCast, таких как WX-010/030, YSP-1600

## Настройки
Страница администратора «+» может использоваться для ручного добавления IP-адреса, DeviceID, типа и имени.
Нажмите кнопку поиска для обнаружения. Если у вас несколько устройств, вам придется нажимать кнопку несколько раз, пока все устройства не будут обнаружены. К сожалению, обнаружение возвращает только один объект за раз, и это может быть любое из ваших устройств MusicCast. Если возврат такой же, как и уже часть таблицы, вам придется нажать кнопку еще раз. Иногда помогает сохранить и снова открыть страницу damin.

В маловероятном случае, если 2 или более устройств выдают один и тот же идентификатор, немного измените один идентификатор. В противном случае адаптер не сможет различить 2 устройства.

Если вы хотите видеть обновленное время воспроизведения для прослушиваемых вами треков, включите/отметьте соответствующий флажок. Имейте в виду, что это увеличивает количество сообщений (каждую секунду для каждого устройства пинг-понг обновлений).

## Доступные объекты
В настоящее время реализованы следующие объекты:

### Базовый (зона)
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> ВКЛ/Режим ожидания|
|{zone}.zone_b|логическое значение|?|истина/ложь -> целевая зона — зона B|
|{zone}.mute|boolean|x|true/false -> отключен звук/не отключен звук|
|{zone}.volume|value|x|0...max (max зависит от устройства)|
|{zone}.act_vol_mode|text|?|фактическая громкость в режиме дБ|
|{zone}.act_vol_val|value|?|фактическое значение громкости в дБ|
|{zone}.act_vol_unit|text|-|фактическая единица громкости (должна быть дБ)|
|{zone}.act_vol_mode_list|text|-|фактическая громкость в дБ модах|
|{zone}.input|text|x|входы в зависимости от устройства|
|{zone}.input_list|текст|-|возможные входы|
|{zone}.input_text|текст|-|выбранный ввод как текст|
|{zone}.sound_program|text|x|установить звуковую программу|
|{zone}.sound_program_list|текст|-|возможные звуковые программы|
|{zone}.surr_decoder_type|text|?|установить тип объемного звучания|
|{zone}.surr_decoder_type_list|text|-|возможный декодер объемного звучания|
|{zone}.link_control|text|x|установить управление ссылкой|
|{zone}.link_control_list|text|-|возможные настройки управления ссылками|
|{zone}.link_audio_delay|text|x|установить задержку звука ссылки|
|{zone}.link_audio_delay_list|text|-|возможные настройки задержки звука link link|
|{zone}.clearVoice|boolean|x|очистить голосовое управление|
|{zone}.low|value|x|level EQ низкий|
|{zone}.mid|value|x|level эквалайзер средний|
|{zone}.high|value|x|уровень эквалайзера высокий|
|{zone}.subwoofer_volume|value|x|уровень громкости сабвуфера|
|{zone}.bass|value|x|уровень баса|
|{zone}.treble|значение|x|уровень высоких частот|
|{zone}.tone_control_mode_list|текст|-|возможный режим управления тембром|
|{zone}.tone_mode|логическое значение|?|режим управления тембром|
|{zone}.balance|value|x|уровень баланса|
|{zone}.direct|логическое|x|установить прямое|
|{zone}.pure_direct|boolean|x|установить чистый прямой|
|{zone}.enhancer|boolean|x|установить усилитель|
|{zone}.bass_extension|логическое значение|x|установить расширение баса|
|{zone}.sleep|значение|x|таймер сна|
|{zone}.disable_flags|логическое значение|x|установить disable_flags|
|{zone}.contents_display|логическое значение|x|установить content_display|
|{zone}.party_enable|логическое значение|x|установить party_enable|
|{zone}.extra_bass|логическое значение|x|установить extra_bass|
|{zone}.adaptive_drc|логическое|x|установить адаптивное_drc|
|{zone}.dts_dialogue_control|значение|x|установить dts_dialogue_control|
|{zone}.adaptive_dsp_level|логическое значение|x|установить адаптивный_dsp_level|

### Netusb
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|netusb.input|значение|x|установленный/фактический ввод|
|netusb.playPause|логическое значение|x|установить воспроизведение/паузу|
|netusb.playback|текст|-|статус сетевого проигрывателя|
|netusb.stop|логическое|x|установить Стоп|
|netusb.auto_stop|boolean|-|автоматически остановлен|
|netusb.next|boolean|x|установить Переслать|
|netusb.prev|boolean|x|установить перемотку|
|netusb.shuffle|boolean|x|переключить перемешивание|
|netusb.shuffle_stat|текст|-|статус перемешивания|
|netusb.repeat|boolean|x|переключить повтор|
|netusb.repeat_stat|текст|-|повторить статус|
|netusb.artist|текст|-|имя исполнителя|
|netusb.album|текст|-|название альбома|
|netusb.track|текст|-|имя трека|
|netusb.albumart_url|текст|-|http-адрес для обложки альбома|
|netusb.albumart_id|значение|-|идентификатор обложки альбома|
|netusb.play_time|value|-|время воспроизведения в с|
|netusb.play_queue_type|текст|-|тип очереди netusb|
|netusb.total_time|value|-|общее время воспроизведения в с|
|netusb.recent_info|json|-|история воспроизведенных предметов|
|netusb.preset_info|json|-|сохраненные предустановки/избранное|
|netusb.presetrecallnumber|value|x|вызвать # из списка избранного|
|netusb.usb_devicetype|текст|-|тип подключенного USB-устройства|
|netusb.attribute|value|-|какие возможности имеет служба, подлежащая декодированию|
|netusb.recallRecentItem|value|x|какие возможности имеет служба, подлежащая декодированию|

### Система
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|system.api_version|значение|-|Версия API|
|system.system_version|значение|-|Версия системы|
|system.inputs.{service}|value|-|доступная служба ввода|
|system.inputs.{service}.account_enable|value|-|доступная служба ввода включена|
|system.inputs.{service}.distribution_enable|value|-|доступная служба ввода, распределяемая|
|system.inputs.{service}.play_info_type|value|-|доступный тип службы ввода|

### CD-плеер
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|cd.playPause|логическое значение|x|установить воспроизведение/паузу|
|cd.playback|текст|-|статус CD-плеера|
|cd.stop|логическое|x|установить Стоп|
|cd.next|логическое|x|установить вперед|
|cd.prev|boolean|x|установить перемотку назад|
|cd.shuffle|boolean|x|переключить перемешивание|
|cd.shuffle_stat|текст|-|статус перемешивания|
|cd.repeat|логическое значение|x|переключить повтор|
|cd.repeat_stat|текст|-|статус повтора|
|cd.device_stat|текст|-|состояние устройства|
|cd.playtime|value|-|текущее время воспроизведения|
|cd.totaltime|value|-|общее время текущего трека|
|cd.disctime|value|-|Общее время CD|
|cd.tracknumber|value|-|текущий воспроизводимый трек|
|cd.totaltracks|value|-|всего треков CD|
|cd.artist|текст|-|имя исполнителя|
|cd.album|текст|-|название альбома|
|cd.track|текст|-|имя трека|

### Тюнер
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|tuner.common_preset_info|массив|-|Информация о предустановках|
|tuner.am.preset_info|array|-|Предустановленная информация AM|
|tuner.fm.preset_info|array|-|Предустановленная информация о FM|
|tuner.dab.preset_info|array|-|Предустановленная информация DAB|
|tuner.am.preset|номер|x|номер предустановки AM|
|tuner.am.freq|number|x|Частота AM в кГц|
|tuner.am.tuned|логическое|-|AM настроен|
|tuner.fm.preset|номер|x|номер предустановки FM|
|tuner.fm.freq|number|x|Частота FM в кГц|
|tuner.fm.tuned|логическое|-|FM настроен|
|tuner.fm.audio_mode|string|-|FM моно/стерео|
|tuner.dab.preset|number|x|номер предустановки DAB|
|tuner.dab.id|номер|-|ID станции DAB|
|tuner.dab.status|строка|-|статус DAB|
|tuner.dab.freq|номер|-|частота DAB|
|tuner.dab.category|string|-|первичный/вторичный|
|tuner.dab.audio_mode|string|-|DAB моно/стерео|
|tuner.dab.bit_rate|число|-|скорость передачи данных DAB в кбит/с|
|tuner.dab.quality|номер|-|Качество DAB 0-100|
|tuner.dab.tune_aid|номер|-|Сила сигнала DAB 0–100|
|tuner.dab.off_air|boolean|-|DAB выключен из эфира|
|tuner.dab.dab_plus|логическое|-|DAB+|
|tuner.dab.program_type|string|-|Тип программы DAB|
|tuner.dab.ch_label|string|-|Метка DAB CH|
|tuner.dab.service_label|string|-|Метка службы DAB|
|tuner.dab.dls|строка|-|DAB DLS|
|tuner.dab.ensemble_label|string|-|Метка ансамбля DAB|
|tuner.dab.initial_scan_progress|number|-|Прогресс начального сканирования DAB 0-100|
|tuner.dab.total_station_num|число|-|общее количество станций DAB 0-255|
|tuner.rds.program_type|string|-|Тип программы RDS|
|tuner.rds.program_service|string|-|Служба программы RDS|
|tuner.rds.radio_text_a|строка|-|RDS текст A|
|tuner.rds.radio_text_b|string|-|RDS текст B|

### Часы
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|clock.auto_sync|boolean|x|Автоматическая синхронизация часов|
|clock.format|string|x|Формат времени 12ч/24ч|
|clock.alarm_on|boolean|x|Состояние будильника вкл/выкл|
|clock.volume|число|x|Громкость будильника|
|clock.fade_interval|number|x|Интервал затухания будильника|
|clock.fade_type|number|x|Тип затухания будильника|
|clock.mode|string|x|Режим будильника один день/еженедельно|
|clock.repeat|boolean|x|Повтор будильника, если указан один день|
|clock.{day}.enable|boolean|x|Допустимость настройки часов|
|clock.{day}.time|string|-|Время срабатывания будильника ччмм 00-23,00-59|
|clock.{day}.beep|boolean|x|Достоверность сигнала часов|
|clock.{day}.playback_type|string|-|Тип воспроизведения будильника возобновление/предустановка|
|clock.{day}.resume_input|string|-|Идентификатор ввода возобновления будильника|
|clock.{day}.preset_type|string|-|Тип предустановки будильника|
|clock.{day}.preset_num|number|-|Идентификатор входа предустановки будильника|
|clock.{day}.preset_netusb_input|string|-|Идентификатор входа netusb будильника|
|clock.{day}.preset_netusb_text|string|-|Текст будильника netusb|
|clock.{day}.preset_tuner_band|string|-|Полоса тюнера будильника|
|clock.{day}.preset_tuner_number|number|-|Частота тюнера будильника или идентификатор станции|

## Задача
* поддержка списков
* изменение значений взаимодействия на приятные названия
* быстрая перемотка вперед/перемотка вперед для NETUSB/CD
* Bluetooth
* уровень диалога

## 1.0.0 ВАЖНЕЙШИЕ ИЗМЕНЕНИЯ
* deviceId раньше был systemId, который не является уникальным. Теперь используется deviceId, это меняет дерево объектов
* API Musiccast 2.0.0
* поиск устройств теперь может возвращать более 1 устройства
* новый вывод для разработчика в панели администратора
* больше асинхронности/ожидания
* исправленное тестирование

#### 0.2.2
* API musiccast 0.0.14

#### 0.2.1
* лицензия 2022
* коррекция зависимости

#### 0.2.0
* рефакторинг с помощью «создать адаптер»
* асинхронный/ожидание

#### 0.1.5
* (Scrounger) обработка ошибок, когда устройство недоступно

#### 0.1.4
* (Scrounger) исправление несоответствия типов (объект массива)

#### 0.1.3
* (foxthefox) добавлена запись для linkControl/linkAudioDelay/linkAudioQuality

#### 0.1.2
* (Scrounger) исправление несоответствия типов (строка boolean)

#### 0.1.1
* поправка на часы "oneday"

#### 0.1.0
* компактный режим
* yamaha-yxc-nodejs 0.0.8
* обновление виджета

#### 0.0.9
* adminV3 использует values2table и кнопку добавления снова
* зона 2/3/4 теперь работает
* расширенное автоматическое тестирование
* кнопка в админке для сбора JSON-ответов

#### 0.0.8
* автоматическое обновление тестирования
* указанное имя на странице администратора для отображения в объекте (устройстве)

#### 0.0.7
* поддержка тюнера
* поддержка часов (в основном информация)
* поддержка большего количества зон
* поддержка mc-link
* установка минимальных и максимальных значений в соответствии с характеристиками
* администратор v3

#### 0.0.6
* набор виджетов, соответствующих объектам и элементам управления
* cd.shuffle_stat логическое значение -> текст
* новый netusb.shuffle_stat (текст)
* обновление статуса через подписку на UDP-сообщения
* включить обновление информации о времени воспроизведения (отключение снижает трафик)

#### 0.0.5
* очистка на странице администратора
* улучшение создания объектов
* больше объектов на netusb
* больше объектов в системе
* добавлена поддержка CD

#### 0.0.4
* новые объекты и функции (input, sound_prog, EQ, clearVoice)
* поиск/обнаружение на странице администратора

#### 0.0.3
* реализовано больше объектов

#### 0.0.2
* незначительные исправления

#### 0.0.1
* начальный релиз с настройкой IP на странице конфигурации,
* доступны команды питание, отключение звука, громкость

## Changelog

### 1.1.4
* fixed main.surround_ai
* update devDeps, eslint corrections
* IOB checker corrections

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

Copyright (c) 2017 - 2024 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2024 foxthefox <foxthefox@wysiwis.net>