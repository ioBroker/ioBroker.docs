---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eufy-security/README.md
title: ioBroker.eufy-security
hash: cEwbuVh0ESWcs7RKS4gY8WFx0kUKseQ91JtyK5S1GIs=
---
![Логотип](../../../en/adapterref/iobroker.eufy-security/admin/eufy-security.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.eufy-security.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.eufy-security.svg)
![Количество установок (последнее)](https://iobroker.live/badges/eufy-security-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/eufy-security-stable.svg)
![Статус зависимости](https://img.shields.io/david/bropat/iobroker.eufy-security.svg)
![Известные уязвимости](https://snyk.io/test/github/bropat/ioBroker.eufy-security/badge.svg)
![Статус сборки](https://travis-ci.org/bropat/ioBroker.eufy-security.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/bropat/ioBroker.eufy-security?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.eufy-security.png?downloads=true)

# IoBroker.eufy-security
Этот адаптер использует библиотеку [eufy-security-client](https://github.com/bropat/eufy-security-client) для связи с устройствами Eufy.

Если вы цените мою работу и прогресс и хотите меня поддержать, вы можете сделать это здесь:

[![ko-fi] (https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E332Q6Z)

## Описание
Этот адаптер позволяет управлять [Устройства безопасности Eufy](https://us.eufylife.com/collections/security), подключаясь к облачным серверам Eufy и локальным / удаленным станциям.

Вам необходимо предоставить свои учетные данные для входа в Cloud. Адаптер подключается к вашей облачной учетной записи и опрашивает все данные устройства через HTTPS. Теперь также поддерживается локальное или удаленное P2P-соединение со станциями / устройствами Eufy. Однако подключение к Eufy Cloud всегда является обязательным условием.

Один экземпляр адаптера покажет все устройства из одной учетной записи Eufy Cloud и позволит управлять ими.

## Функции
* Поддерживает локальное и удаленное p2p-соединение со станцией
* Двухфакторная аутентификация
* Прямая трансляция как поток HLS (поддерживает все платформы, но с задержкой)
* Последний прямой эфир HLS всегда сохраняется для последующего просмотра
* Загружает видео о событии при получении push-уведомления (асинхронно)
* Делает эскиз в формате jpeg прямой трансляции или загруженного видео
* Базовая станция:
    * Состояния:
        * Настроен режим охраны
        * Текущий режим охраны
        * Имя
        * Модель
        * Серийный номер
        * Версия ПО
        * Версия оборудования
        * MAC-адрес
        * IP-адрес LAN
    * Действия:
        * Изменить режим охраны
        * Перезагрузка станции
    * События:
        * Изменение режима будильника
* Камера:
    * Состояния:
        * Онлайн / офлайн и т. Д.
        * Батарея%
        * Температура батареи
        * Имя
        * Модель
        * Серийный номер
        * Версия ПО
        * Версия оборудования
        * MAC-адрес
        * Wi-Fi RSSI
        * Отфильтрованные ложные события с момента последней зарядки
        * Сохраненные / записанные события с момента последней зарядки
        * Всего событий с момента последней зарядки
        * Количество дней использования с момента последней зарядки
    * Действия:
        * Начать прямую трансляцию (hls; поддерживает также локальную трансляцию)
        * Остановить прямую трансляцию (hls)
        * Включение / отключение устройства
        * Включение / отключение автоматического ночного видения
        * Включение / отключение светодиода (только камеры 2, внутренние камеры, прожектор, одиночные камеры и дверные звонки)
        * Включение / отключение обнаружения кражи (только продукты камеры 2)
        * Включение / отключение обнаружения движения
        * Включение / отключение обнаружения домашних животных (только внутренние камеры)
        * Включение / отключение обнаружения звука (только внутренние камеры)
        * Включение / отключение потока RTSP (только продукты camera2, внутренние камеры и одиночные камеры)
        * Изменить настройку водяного знака видео
    * События:
        * Обнаружено движение
        * Человек обнаружен
        * Звонок (только дверной звонок)
        * Обнаружен плач (только внутренние камеры)
        * Обнаружен звук (только внутренние камеры)
        * Обнаружено домашнее животное (только внутренние камеры)
* Датчик
    * Датчик входа:
        * Состояния:
            * Онлайн / офлайн и т. Д.
            * Низкий заряд батареи
            * Имя
            * Модель
            * Серийный номер
            * Версия ПО
            * Версия оборудования
        * События:
            * Открыто закрыто
    * Датчик движения:
        * Состояния:
            * Онлайн / офлайн и т. Д.
            * Низкий заряд батареи
            * Имя
            * Модель
            * Серийный номер
            * Версия ПО
            * Версия оборудования
        * События:
            * Обнаружено движение
* Клавиатура:
    * Состояния:
        * Онлайн / офлайн и т. Д.
        * Низкий заряд батареи
        * Имя
        * Модель
        * Серийный номер
        * Версия ПО
        * Версия оборудования
* Замок:
    * Состояния:
        * Онлайн / офлайн и т. Д.
        * Батарея%
        * Статус блокировки
        * Имя
        * Модель
        * Серийный номер
        * Версия ПО
        * Версия оборудования
        * Wi-Fi RSSI
    * Действия:
        * Блокировка / разблокировка
* еще не все...

## Конфигурация
См. [здесь](./docs/en/README.md).

## Известные рабочие устройства
* HomeBase (T8001)
* HomeBase E (T8002)
* HomeBase 2 (T8010)
* Мост Wi-Fi Smart Lock (T8021)
* eufyCam (T8111)
* eufyCam E (T8112)
* eufyCam 2 (T8114)
* eufyCam 2C (T8113)
* eufyCam 2 Pro (T8140)
* eufyCam 2C Pro (T8141)
* Прожектор (T8420)
* Проводной дверной звонок 2к (T8200)
* Проводной дверной звонок 1080p (T8201)
* Батарейный дверной звонок 2К (T8210)
* Батарейный дверной звонок 1080p (T8222)
* Датчик входа (T8900)
* Датчик движения (T8910)
* Внутренний кулачок Pan & Tilt 2K (T8410)
* Внутренняя камера 2K (T8400)
* Внутренняя камера Pan & Tilt 1080p (T8411)
* Внутренняя камера 1080p (T8401)
* Умный замок передней двери (T8500)

Если работают другие устройства (или нет), сообщите о них, открыв проблему на GitHub.

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого проблемы GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов или см. [здесь](https://github.com/bropat/ioBroker.eufy-security/wiki/Howto-enable-debug)). Затем получите файл журнала с диска (подкаталог "log" в установочном каталоге ioBroker, а не из Admin, потому что Admin сокращает строки).

## Changelog

### 0.5.4 (2021-05-26)
* (bropat) Fixed issue with video corruption in p2p livestream
* (bropat) Updated versions of the package dependencies

### 0.5.3 (2021-05-14)
* (bropat) Fixed issue [#121](https://github.com/bropat/ioBroker.eufy-security/issues/121)
* (bropat) Fixed push notification for indoor and floodlight cams (issue [#130](https://github.com/bropat/ioBroker.eufy-security/issues/130))
* (bropat) Fixed refresh of properties/settings of standalone devices (issue [#130](https://github.com/bropat/ioBroker.eufy-security/issues/130))
* (bropat) Updated versions of the package dependencies

### 0.5.2 (2021-04-02)
* (bropat) Try to add support for FreeBSD - issue [#106](https://github.com/bropat/ioBroker.eufy-security/issues/106)
* (bropat) Updated package dependency ffmpeg-static for FreeBSD support

### 0.5.1 (2021-04-01)
* (bropat) Fixed issue [#105](https://github.com/bropat/ioBroker.eufy-security/issues/105)

### 0.5.0 (2021-03-30)
* (bropat) Added support for smart lock products
* (bropat) Added new P2P feature: lock/unlock smart lock products
* (bropat) Optimized speed of P2P connection establishment
* (bropat) New setting: P2P connection setup preference: local prefered, local only or quickest connection
* (bropat) Dropped support for NodeJS 10.x (min. requirement 12)
* (bropat) Updated versions of the package dependencies

### 0.4.3 (2021-03-19)
* (bropat) Code enhancements for publishing the adapter to the central repository
* (bropat) Updated versions of the package dependencies

### 0.4.2 (2021-03-14)
* (bropat) Fixed roles of states according to ioBroker documentation

### 0.4.1 (2021-03-14)
* (bropat) Removed legacy password encryption support for admin adapter (requires admin adapter >= 4.0.9)
* (bropat) Added admin adapter as global dependency
* (bropat) Updated license

### 0.4.0 (2021-03-11)
* (bropat) Added handling of adapter updates with breaking changes
* (bropat) Added new P2P feature: enable/disable pet detection for indoor cameras
* (bropat) Added new P2P feature: enable/disable sound detection for indoor cameras
* (bropat) Added new P2P feature: enable/disable led for wired doorbell
* (bropat) Unlocked state: last_event_video_url
* (bropat) Fixed parsing of push notification to download video events for battery doorbells and indoor cameras
* (bropat) Fixed enable/disable device (for wired doorbells, indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed enable/disable led (for battery doorbells, indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed enable/disable motion detection (for indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed change video watermark setting (for indoor cameras and floodlight camera)
* (bropat) Updated versions of the package dependencies

### 0.3.1 (2021-03-06)
* (bropat) Fixed regression on livestream with h265 codec

### 0.3.0 (2021-03-05)
* (bropat) Implemented feature request [#88](https://github.com/bropat/ioBroker.eufy-security/issues/88): Enable/disable motion detection for camera products
* (bropat) Implemented feature request [#81](https://github.com/bropat/ioBroker.eufy-security/issues/81): Enable/disable RTSP stream (added also RTSP stream url)
* (bropat) Implemented asynchronous download of event videos when receiving a push notification
* (bropat) Optimized ffmpeg implementation to only muxing video data to HLS
* (bropat) Optimized HLS livestream video start delay (10-15 sec.)
* (bropat) Fixed possible race condition with ffmpeg when using fallback to Eufy RTMP live stream
* (bropat) Fixed issue with livestream when p2p connection is lost
* (bropat) Updated versions of the package dependencies

### 0.2.5 (2021-02-20)
* (bropat) Fixed possible race condition that brokes sometime the livestream
* (bropat) Updated versions of the package dependencies

### 0.2.4 (2021-02-20)
* (bropat) Fixed issue [#86](https://github.com/bropat/ioBroker.eufy-security/issues/86)
* (bropat) Fixed not correctly identifying if the livestream is still active or not

### 0.2.3 (2021-02-17)
* (bropat) Fixed wired doorbell p2p livestream (should fix also indoor, floodlight and solo cameras)
* (bropat) Fixed issue that treats known push notifications as unknown
* (bropat) Fixed relative path for state last_event_pic_url
* (bropat) Updated versions of the package dependencies

### 0.2.2 (2021-02-16)
* (bropat) Fixed web extension settings for serving videos and pictures (issue [#79](https://github.com/bropat/ioBroker.eufy-security/issues/78))

### 0.2.1 (2021-02-15)
* (bropat) Fixed device_enable state
* (bropat) Fixed battery doorbell start livestream over p2p (issue [#78](https://github.com/bropat/ioBroker.eufy-security/issues/78))
* (bropat) Implemented fallback for failed P2P livestream to RTMP livestream

### 0.2.0 (2021-02-14)
* (bropat) Implemented P2P livestream over HLS
* (bropat) Last livestream is always saved and is still available later
* (bropat) Implemented device and station parameter refresh over P2P
* (bropat) Revised push notification implementation
* (bropat) Fixed issue [#71](https://github.com/bropat/ioBroker.eufy-security/issues/71) by implementing retry mechanism on HTTP error 404 (max. 5 retries with increasing delay) 
* (bropat) Fixed issue [#12](https://github.com/bropat/ioBroker.eufy-security/issues/12)
* (bropat) Eufy client library extracted as standalone library and adapters ported to new shared library: [eufy-security-client](https://www.npmjs.com/package/eufy-security-client)
* (bropat) Removed following states: last_captured_pic_url, last_captured_pic_html
* (bropat) Updated versions of the package dependencies

### 0.1.5 (2021-01-14)
* (bropat) Fixed issue [#50](https://github.com/bropat/ioBroker.eufy-security/issues/50) and [#53](https://github.com/bropat/ioBroker.eufy-security/issues/53)
* (bropat) Updated versions of the package dependencies

### 0.1.4 (2021-01-05)
* (bropat) Fixed: Accept only valid modes for station guard mode (for invalid mode, an error is logged)
* (bropat) Fixed reset of an event (motion, ringing, etc.)
* (bropat) Updated versions of the package dependencies

### 0.1.3 (2021-01-02)
* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.eufy-security/issues/37) and [#41](https://github.com/bropat/ioBroker.eufy-security/issues/41)
* (bropat) Updated versions of the package dependencies

### 0.1.2 (2021-01-02)
* (bropat) Revised captured_pic_url state (renamed to last_captured_pic_url and added last_captured_pic_html)
* (bropat) Fixed p2p issue passing wrong user id (action_user_id instead of admin_user_id)
* (bropat) Revised push notification to properly support doorbell notifications
* (bropat) Updated versions of the package dependencies

### 0.1.1 (2020-12-29)
* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.eufy-security/issues/37)
* (bropat) Fixed version numbering
* (bropat) Updated versions of the package dependencies

### 0.0.9 (2020-12-28)
* (bropat) Finished implementation for feature request: [#1](https://github.com/bropat/ioBroker.eufy-security/issues/1)
* (bropat) Little progress for feature request: [#5](https://github.com/bropat/ioBroker.eufy-security/issues/5)
* (bropat) Now supports also cloud P2P communication if local P2P comunication isn't possible
* (bropat) Implemented set Guard Mode with CMD_SET_PAYLOAD for certain devices
* (bropat) Added back USA ip addresses for P2P cloud discovery
* (bropat) Using the correct local time zone for communication with the Eufy Cloud
* (bropat) HUB filtering by device type 0 (station) removed
* (bropat) Added documentation for 2FA
* (bropat) Updated versions of the package dependencies

### 0.0.8 (2020-12-13)
* (bropat) Fixed issue [#16](https://github.com/bropat/ioBroker.eufy-security/issues/16)
* (bropat) P2P communication revisited
* (bropat) Added reconnect functionality for P2P communication
* (bropat) Added heartbeat for P2P communication
* (bropat) Added local caching of last event picture as image url or html image (removed old state: last_camera_url)
* (bropat) Updated versions of the package dependencies

### 0.0.7 (2020-12-08)
* (bropat) Fixed issue [#11](https://github.com/bropat/ioBroker.eufy-security/issues/11)

### 0.0.6 (2020-12-06)
* (bropat) Fixed issue [#13](https://github.com/bropat/ioBroker.eufy-security/issues/13)

### 0.0.5 (2020-12-05)
* (bropat) Added event states for camera (motion detected, person detected)
* (bropat) Added event states for entry sensor (open/closed)
* (bropat) Added event states for motion sensor (motion detected)
* (bropat) Added event states for doorbell (motion detected, person detected, ringing)
* (bropat) Added event states for indoor camera (motion detected, person detected, crying detected, sound detected, pet detected)
* (bropat) Added entry sensor state (online, offline, etc.)
* (bropat) Added entry sensor low battery
* (bropat) Added motion sensor state (online, offline, etc.)
* (bropat) Added motion sensor low battery
* (bropat) Added keypad state (online, offline, etc.)
* (bropat) Added keypad low battery

### 0.0.4 (2020-12-03)
* (bropat) Better exception handling
* (bropat) Fixed push token handling
* (bropat) Added push connection retry mechanism
* (bropat) Added camera state (online, offline, etc.)
* (bropat) Added camera wifi RSSI
* (bropat) Added camera total events since last charge
* (bropat) Added camera saved/recorded events since last charge
* (bropat) Added camera filtered false events since last charge
* (bropat) Added camera used days since last charge
* (bropat) Added camera battery temperature

### 0.0.3 (2020-11-21)
* (bropat) Fixed issue with push notification credentials initialization

### 0.0.2 (2020-11-21)
* (bropat) Added push notification support for event notification (raw notifications!)
* (bropat) Added 2FA (token renewal needs manual intervention)
* (bropat) Added P2P communication with station (event: Alarm mode change)
* (bropat) Added more device classes (sensors, locks, keypads) with no actions (at the moment! WIP!)
* (bropat) Added all eufy camera devices release to date
* (bropat) Added battery state to eufy cameras

### 0.0.1 (2020-10-04)
* (bropat) initial release

## License
MIT License

Copyright (c) 2021 bropat <patrick.broetto@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.