---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: VZ/DSrc+CJb1AdeCUXgibAgMsPYcfamP8YaiwwDlnEY=
---
![Логотип](../../../en/adapterref/iobroker.eusec/docs/_media/ioBroker.euSec.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.eusec.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.eusec.svg)
![Всего загрузок](https://img.shields.io/npm/dt/iobroker.eusec.svg)
![Требование к версии узла](https://img.shields.io/node/v/iobroker.eusec)
![Количество установок (последних)](https://iobroker.live/badges/eusec-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/eusec-stable.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.eusec)
![Известные уязвимости](https://snyk.io/test/github/bropat/ioBroker.eusec/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.eusec.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# IoBroker.euSec
**Тесты:** ![Тестирование и выпуск](https://github.com/bropat/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)

Это библиотека [ioBroker](https://www.iobroker.net) адаптер, использующий [eufy-security-client](https://github.com/bropat/eufy-security-client) для связи с устройствами Eufy.

Если вы цените мою работу и прогресс и хотите меня поддержать, вы можете сделать это здесь:

[![ко-фи](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E332Q6Z)

**Этот проект не связан с Anker и Eufy (Eufy Security). Это личный проект, который поддерживается в свободное время.**

## Описание
Этот адаптер позволяет управлять [Устройства безопасности Eufy](https://us.eufylife.com/collections/security) путем подключения к облачным серверам Eufy и локальным/удаленным станциям.

Вам необходимо предоставить свои учетные данные для входа в облако. Адаптер подключается к вашей облачной учетной записи и запрашивает все данные устройства через HTTPS. Теперь также поддерживается локальное или удаленное P2P-соединение со станциями/устройствами Eufy. Однако подключение к Eufy Cloud всегда является обязательным условием.

Один экземпляр адаптера покажет все устройства из одной учетной записи Eufy Cloud и позволит управлять ими.

## Функции
* Поддерживает локальное и удаленное p2p-соединение со станцией.
* Двухфакторная аутентификация
* Прямая трансляция в формате HLS (поддерживает все платформы, но имеет задержку)
* Последняя прямая трансляция HLS всегда сохраняется для последующего просмотра.
* Загружает видео о событии при получении push-уведомления (асинхронно).
* Делает миниатюру прямой трансляции или загруженного видео в формате JPEG.
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
    * IP-адрес локальной сети
  * Действия:
    * Изменение режима охраны
    * Звуковой сигнал триггера
    * Сбросить звук будильника
    * Перезагрузить станцию
  * События:
    * Изменение режима будильника
* Камера:
  * Состояния:
    * Онлайн/оффлайн и т.д.
    * Батарея %
    * Температура батареи
    * Имя
    * Модель
    * Серийный номер
    * Версия ПО
    * Версия оборудования
    * MAC-адрес
    * Wi-Fi RSSI
    * Отфильтрованы ложные события с момента последней зарядки.
    * Сохраненные/записанные события с момента последней зарядки
    * Общее количество событий с момента последней зарядки
    * Количество дней использования с момента последней зарядки
    * И многое другое...
  * Действия:
    * Начать прямую трансляцию (hls; поддерживается также локальная прямая трансляция)
    * Остановить прямую трансляцию (hls)
    * Включить/отключить устройство
    * Включить/отключить автоматическое ночное видение
    * Включение/выключение светодиода (только для продуктов с камерой 2, внутренними камерами, камерами с прожектором, одиночными камерами и дверными звонками)
    * Включение/отключение функции обнаружения кражи (только для продуктов с камерой 2)
    * Включить/отключить обнаружение движения
    * Включить/отключить обнаружение домашних животных (только для внутренних камер)
    * Включить/отключить обнаружение звука (только для внутренних камер)
    * Включение/отключение потока RTSP (только для продуктов camera2, внутренних камер и одиночных камер)
    * Изменить настройку водяного знака видео.
    * И многое другое...
  * События:
    * Обнаружено движение
    * Человек обнаружен
    * Звонок (только дверной звонок)
    * Обнаружен плач (только для внутренних камер)
    * Обнаружен звук (только для внутренних камер)
    * Обнаружено домашнее животное (только для внутренних камер)
* Датчик:
  * Датчик входа:
    * Состояния:
      * Онлайн/оффлайн и т.д.
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
      * Онлайн/оффлайн и т.д.
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
    * Онлайн/оффлайн и т.д.
    * Низкий заряд батареи
    * Имя
    * Модель
    * Серийный номер
    * Версия ПО
    * Версия оборудования
* Замок:
  * Состояния:
    * Онлайн/оффлайн и т.д.
    * Батарея %
    * Статус блокировки
    * Имя
    * Модель
    * Серийный номер
    * Версия ПО
    * Версия оборудования
    * Wi-Fi RSSI
  * Действия:
    * Блокировка/разблокировка
* еще не все...

## Документация
Посмотрите [здесь](https://bropat.github.io/ioBroker.eusec/)

## Известные рабочие устройства
Информацию о поддерживаемых устройствах можно найти [здесь](https://github.com/bropat/eufy-security-client#known-working-devices).

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого выпуски GitHub.

Лучше всего перевести адаптер в режим журнала отладки (см. [здесь](https://bropat.github.io/ioBroker.eusec/#/debugging)). Затем получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не из администратора, потому что администратор обрезает строки).

## Changelog

### 1.2.1 (2023-11-04)

* (bropat) Updated version of the package eufy-security-client (2.9.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.9.1)

### 1.2.0 (2023-11-04)

* (bropat) Requires node version >= 18
* (bropat) Added support for SmartTrack Link (T87B0) and SmartTrack Card (T87B2)
* (bropat) Added support for SoloCam S220 (T8134)
* (bropat) Fixed livestream issue
* (bropat) Updated version of the package go2rtc-static (1.8.1)
* (bropat) Updated version of the package eufy-security-client (2.9.0)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.9.0)

### 1.1.2 (2023-08-31)

* (bropat) Updated version of the package eufy-security-client (2.8.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.8.1)

### 1.1.1 (2023-08-20)

* (bropat) Fixed issue #365
* (bropat) Fixed issue #363
* (bropat) Updated version of the package ffmpeg-static (5.2.0)
* (bropat) Updated version of the package eufy-security-client (2.8.0)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.8.0)

### 1.1.0 (2023-08-08)

* (bropat) Added support for Wired Wall Light Cam S100 (T84A1; #332)
* (bropat) Added support for Garage-Control Cam (T8452)
* (bropat) Fixed issue #353
* (bropat) Fixed issue #347
* (bropat) Fixed issue #342
* (bropat) Fixed issue #316
* (bropat) Updated version of the package go2rtc-static (1.6.2)
* (bropat) Updated version of the package eufy-security-client (2.7.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.7.1)

### 1.0.0 (2023-05-16)

* (bropat) Notification pictures are supported again
* (bropat) Implemented new livestream support using go2rtc (WebRTC/MSE, rtsp)
* (bropat) Fixed issue #323
* (bropat) Updated version of the package eufy-security-client (2.6.2)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.6.2)

**Note:** The download of event videos has been temporarily removed as decryption of these is not yet supported. It will be added back as soon as it is supported.

### 0.9.10 (2023-02-24)

* (bropat) Requires node version >= 16
* (bropat) Fixed issue #319
* (bropat) Fixed issue #307
* (bropat) Fixed issue #306
* (bropat) Fixed issue #305
* (bropat) Updated version of the package eufy-security-client (2.4.2)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.4.2)

**Note:** The download of notification images has been temporarily removed as decryption of these is not yet supported. It will be added back as soon as it is supported.

### 0.9.9 (2022-12-24)

* (bropat) Fixed issue #311
* (bropat) Fixed issue #312
* (bropat) Updated version of the package eufy-security-client (2.4.0)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.4.0)

### 0.9.8 (2022-11-26)

* (bropat) Fixed issue #300
* (bropat) Updated version of the package eufy-security-client (2.3.0)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.3.0)

**Note:** Those who use 2FA will be prompted to do so again after this update.

### 0.9.7 (2022-11-12)

* (bropat) Implemented Homebase Alarm (#271)
* (bropat) Fixed issue #293
* (bropat) Updated version of the package eufy-security-client (2.2.3)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.2.3)

### 0.9.6 (2022-11-06)

* (bropat) Fixed issue #292
* (bropat) Updated version of the package eufy-security-client (2.2.2)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.2.2)

### 0.9.5 (2022-11-05)

* (bropat) Added new P2P feature: unlock smart safe products
* (bropat) Added option to enable/disable "Automatically download picture" (#255)
* (bropat) Fixed issue #269
* (bropat) Updated version of the package eufy-security-client (2.2.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.2.1)

### 0.9.4 (2022-07-30)

* (bropat) Updated version of the package eufy-security-client (2.1.2)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.1.2)

### 0.9.3 (2022-07-16)

* (bropat) Updated version of the package eufy-security-client (2.1.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.1.1)

### 0.9.2 (2022-06-12)

* (bropat) Updated version of the package eufy-security-client (2.1.0)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.1.0)

### 0.9.1 (2022-05-03)

* (bropat) Updated version of the package eufy-security-client (2.0.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.0.1)

### 0.9.0 (2022-04-30)

* (bropat) Requires node version >= 14.17
* (bropat) Added support for Battery Doorbell Dual (T8213)
* (bropat) Added support for Video Doorbell Dual (T8203)
* (bropat) Added support for IndoorCam Mini (T8414)
* (bropat) Fixed issue #250
* (bropat) Fixed issue #238
* (bropat) Fixed issue #236
* (bropat) Fixed issue #231
* (bropat) Fixed issue #229
* (bropat) Fixed issue #208
* (bropat) Updated version of the package eufy-security-client (2.0.0)
* (bropat) Further details can be found in the changelog of eufy-security-client (2.0.0)

### 0.8.5 (2022-02-12)

* (bropat) Fixed issue #222
* (bropat) Updated version of the package eufy-security-client (1.6.6)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.6)

### 0.8.4 (2022-02-08)

* (bropat) Fixed regression in authentication flow
* (bropat) Fixed issue #228
* (bropat) Updated version of the package eufy-security-client (1.6.5)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.5)

### 0.8.3 (2022-02-07)

* (bropat) Updated version of the package eufy-security-client (1.6.4)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.4)
* (bropat) Fixed issue #222
* (bropat) Fixed issue #224
* (bropat) Fixed issue #225

**Note:** Selecting the correct country in ioBroker is essential for the devices to be found (should match the setting in the Eufy app).

### 0.8.2 (2022-02-06)

* (bropat) Renamed Adapter to ioBroker.euSec
* (bropat) Updated version of the package eufy-security-client (1.6.3)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.3)
* (bropat) Fixed issue #221

### 0.8.1 (2022-02-05)

* (bropat) Fixed MQTT connection issue (error: 5; #219)
* (bropat) Updated version of the package eufy-security-client (1.6.2)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.2)

### 0.8.0 (2022-02-05)

* (bropat) Added support for Smart Lock Touch & Wifi (T8520; #138)
* (bropat) Added option to enable/disable "Automatically download video" (#180; #203)
* (bropat) Added new state to retrieve received captcha in HTML format "received_captcha_html" (#210)
* (bropat) Updated version of the package eufy-security-client (1.6.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.1)
* (bropat) Updated versions of the package dependencies
* (bropat) Fixed issue #199
* (bropat) Fixed issue #217
* (bropat) Some other small bugfixes

### 0.7.5 (2021-12-05)

* (bropat) Fixed issue #195
* (bropat) Fixed issue #202

### 0.7.4 (2021-11-22)

* (bropat) Implemented captcha authentication mechanism (API v2)
* (bropat) Updated version of the package eufy-security-client (1.4.0)

### 0.7.3 (2021-11-20)

* (bropat) Implemented new encrypted authentication mechanism (API v2)
* (bropat) Dropped old plaintext authentication mechanism (API v1)
* (bropat) Fixed issue #191
* (bropat) Updated version of the package eufy-security-client (1.3.0)

**Note:** If you have 2FA enabled, you will need to authenticate again after this update.

### 0.7.2 (2021-11-16)

* (bropat) Updated version of the package eufy-security-client (1.2.3)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.2.3)
* (bropat) Changed ioBroker.admin dependency to ">=4.0.10"
* (bropat) Updated versions of the package dependencies

### 0.7.1 (2021-10-23)

* (bropat) Updated version of the package eufy-security-client (1.2.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.2.1)

### 0.7.0 (2021-10-17)

* (bropat) Added support for Floodlight T8422
* (bropat) Added support for SoloCam E40 (T8131)
* (bropat) Added new properties for solo cameras: battery, batteryTemperature, wifiSignalLevel, state, chargingStatus, lastChargingDays, lastChargingRecordedEvents, lastChargingTotalEvents, batteryUsageLastWeek
* (bropat) Fixed issue #169
* (bropat) Fixed issue #167
* (bropat) Fixed issue #151
* (bropat) Fixed push notifications for solo cameras (motion and person detection)
* (bropat) Updated version of the package eufy-security-client (1.2.0)
* (bropat) Updated versions of the package dependencies
* (bropat) Further details can be found in the changelog of eufy-security-client (1.2.0)

### 0.6.2 (2021-08-19)

* (bropat) Updated version of the package eufy-security-client (1.1.2)

### 0.6.1 (2021-08-19)

* (bropat) Fixed issue in the function responsible for the version upgrade (non-updatable states; issue #159)
* (bropat) Tried to fix issue #157 and issue #140

### 0.6.0 (2021-08-13)

* (bropat) **Breaking Changes** Switched to the new managed driver class - All states will be dropped and recreated (Note: some states where renamed)
* (bropat) Supports Admin 5
* (bropat) Added new adapter setting "Accept incoming invitations" to automatically accept device invitations
* (bropat) Added new adapter setting "Alarm sound duration (sec)" used for triggering alarm sound on supported devices/stations ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added enable/disable led setting for camera 1 products
* (bropat) Added motion detection sensitivity setting for camera 1 products and wired doorbell
* (bropat) Added motion detection type setting for camera 1 products
* (bropat) Added motion audio recording setting for camera 1 products and wired doorbell
* (bropat) Added ringtone volume setting for wired doorbell
* (bropat) Added enable/disable indoor chime setting for wired doorbell ([#100](https://github.com/bropat/ioBroker.euSec/issues/100))
* (bropat) Added notification ring setting for wired doorbell
* (bropat) Added notification motion setting for wired doorbell
* (bropat) Added video streaming quality setting for wired doorbell
* (bropat) Added video recording quality setting for wired doorbell
* (bropat) Added video HDR setting for wired doorbell
* (bropat) Added video distortion correction setting for wired doorbell
* (bropat) Added video ring recording setting for wired doorbell
* (bropat) Added notification type setting for camera 1 products, solo cameras and wired doorbell
* (bropat) Added chirp volume setting for entry sensor
* (bropat) Added chirp tone setting for entry sensor
* (bropat) Added pan an tilt functionality to supported indoor cameras ([#129](https://github.com/bropat/ioBroker.euSec/issues/129))
* (bropat) Added error detection if stopping or starting stream that isn't running or already running
* (bropat) Added new setting "acceptInvitations" to "EufySecurity" to accept invitations automatically
* (bropat) Added floodlight camera light switch ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added motion detection sensitivity for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added motion detection type for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added motion tracking for indoor camera pan & tilt cameras
* (bropat) Added video stream quality setting for indoor cameras, solo cameras, floodlight cameras and battery doorbell ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added video recording quality setting for indoor cameras
* (bropat) Added WDR setting for battery doorbells
* (bropat) Added microphone mute setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added audio recording setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable speaker setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added speaker volume setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added power source setting for camera 2 products cameras, eufy cameras and eufy E cameras
* (bropat) Added power working mode setting for solo cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras
* (bropat) Added power custom working mode recording clip length setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added power custom working mode recording retrigger interval setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added power custom working mode recording ends if motion stops setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added video streaming quality setting for indoor cameras, solo cameras, floodlight cameras, 2c pro cameras and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added video recording quality setting for indoor 2k cameras and 2c pro cameras
* (bropat) Added motion detection sensitivity setting for indoor cameras, floodlight cameras and camera 2 products ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable motion tracking setting for indoor pan & tilt cameras
* (bropat) Added motion detection type setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable WDR setting for battery doorbells
* (bropat) Added ringtone volume setting for battery doorbells
* (bropat) Added enable/disable chime indoor setting for battery doorbells ([#100](https://github.com/bropat/ioBroker.euSec/issues/100))
* (bropat) Added enable/disable chime homebase setting for battery doorbells ([#100](https://github.com/bropat/ioBroker.euSec/issues/100))
* (bropat) Added chime homebase ringtone volume setting for battery doorbells
* (bropat) Added chime homebase ringtone type setting for battery doorbells
* (bropat) Added notification type setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable person notification setting for indoor cameras
* (bropat) Added enable/disable pet notification setting for indoor cameras
* (bropat) Added enable/disable all other motion notification setting for indoor cameras
* (bropat) Added enable/disable all sound notification setting for indoor cameras
* (bropat) Added enable/disable crying notification setting for indoor cameras
* (bropat) Added enable/disable motion notification setting for battery doorbells
* (bropat) Added enable/disable ring notification setting for battery doorbells
* (bropat) Added trigger alarm sound for camera 2 products, indoor cameras, solo cameras (incl. new) and floodlight cameras ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added reset alarm sound for camera 2 products, indoor cameras, solo cameras (incl. new) and floodlight cameras ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added trigger alarm sound for homebase 1+2 ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added reset alarm sound for homebase 1+2 ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added alarm tone setting for homebase 1+2
* (bropat) Added alarm volume setting for homebase 1+2
* (bropat) Added prompt volume setting for homebase 1+2
* (bropat) Added time format setting for homebase 1+2
* (bropat) Added enable/disable switch mode app notification setting for homebase 1+2
* (bropat) Added enable/disable switch mode geofence notification setting for homebase 1+2
* (bropat) Added enable/disable switch mode schedule notification setting for homebase 1+2
* (bropat) Added enable/disable switch mode keypad notification setting for homebase 1+2
* (bropat) Added enable/disable start alarm delay notification setting for homebase 1+2
* (bropat) Added new floodlight, solo and outdoor cameras (untested!)
* (bropat) Added brightness light setting for 2c/2c pro cameras, new solo cameras and new outdoor cameras
* (bropat) Added enable/disable light setting for 2c/2c pro cameras, new solo cameras and new outdoor cameras
* (bropat) Added battery charging state for keypad devices
* (bropat) Added wifi rssi state for keypad devices
* (bropat) Added nightvision setting for devices supporting the "light" nightvision mode
* (bropat) Added enable disable "switch mode with access code" for station with registered keypad
* (bropat) Added enable disable "auto end alarm" for station with registered keypad
* (bropat) Added enable disable "turn off alarm with button" for station with registered keypad
* (bropat) Fixed issue [#98](https://github.com/bropat/ioBroker.euSec/issues/98)
* (bropat) Fixed issue [#140](https://github.com/bropat/ioBroker.euSec/issues/140)
* (bropat) Fixed issue [#146](https://github.com/bropat/ioBroker.euSec/issues/146)
* (bropat) Fixed issue [#117](https://github.com/bropat/ioBroker.euSec/issues/117)
* (bropat) Many small bugfixes
* (bropat) Updated versions of the package dependencies

### 0.5.5 (2021-06-01)

* (bropat) Fixed regression in p2p protocol

### 0.5.4 (2021-05-26)

* (bropat) Fixed issue with video corruption in p2p livestream
* (bropat) Updated versions of the package dependencies

### 0.5.3 (2021-05-14)

* (bropat) Fixed issue [#121](https://github.com/bropat/ioBroker.euSec/issues/121)
* (bropat) Fixed push notification for indoor and floodlight cams (issue [#130](https://github.com/bropat/ioBroker.euSec/issues/130))
* (bropat) Fixed refresh of properties/settings of standalone devices (issue [#130](https://github.com/bropat/ioBroker.euSec/issues/130))
* (bropat) Updated versions of the package dependencies

### 0.5.2 (2021-04-02)

* (bropat) Try to add support for FreeBSD - issue [#106](https://github.com/bropat/ioBroker.euSec/issues/106)
* (bropat) Updated package dependency ffmpeg-static for FreeBSD support

### 0.5.1 (2021-04-01)

* (bropat) Fixed issue [#105](https://github.com/bropat/ioBroker.euSec/issues/105)

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

* (bropat) Implemented feature request [#88](https://github.com/bropat/ioBroker.euSec/issues/88): Enable/disable motion detection for camera products
* (bropat) Implemented feature request [#81](https://github.com/bropat/ioBroker.euSec/issues/81): Enable/disable RTSP stream (added also RTSP stream url)
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

* (bropat) Fixed issue [#86](https://github.com/bropat/ioBroker.euSec/issues/86)
* (bropat) Fixed not correctly identifying if the livestream is still active or not

### 0.2.3 (2021-02-17)

* (bropat) Fixed wired doorbell p2p livestream (should fix also indoor, floodlight and solo cameras)
* (bropat) Fixed issue that treats known push notifications as unknown
* (bropat) Fixed relative path for state last_event_pic_url
* (bropat) Updated versions of the package dependencies

### 0.2.2 (2021-02-16)

* (bropat) Fixed web extension settings for serving videos and pictures (issue [#79](https://github.com/bropat/ioBroker.euSec/issues/78))

### 0.2.1 (2021-02-15)

* (bropat) Fixed device_enable state
* (bropat) Fixed battery doorbell start livestream over p2p (issue [#78](https://github.com/bropat/ioBroker.euSec/issues/78))
* (bropat) Implemented fallback for failed P2P livestream to RTMP livestream

### 0.2.0 (2021-02-14)

* (bropat) Implemented P2P livestream over HLS
* (bropat) Last livestream is always saved and is still available later
* (bropat) Implemented device and station parameter refresh over P2P
* (bropat) Revised push notification implementation
* (bropat) Fixed issue [#71](https://github.com/bropat/ioBroker.euSec/issues/71) by implementing retry mechanism on HTTP error 404 (max. 5 retries with increasing delay)
* (bropat) Fixed issue [#12](https://github.com/bropat/ioBroker.euSec/issues/12)
* (bropat) Eufy client library extracted as standalone library and adapters ported to new shared library: [eufy-security-client](https://www.npmjs.com/package/eufy-security-client)
* (bropat) Removed following states: last_captured_pic_url, last_captured_pic_html
* (bropat) Updated versions of the package dependencies

### 0.1.5 (2021-01-14)

* (bropat) Fixed issue [#50](https://github.com/bropat/ioBroker.euSec/issues/50) and [#53](https://github.com/bropat/ioBroker.euSec/issues/53)
* (bropat) Updated versions of the package dependencies

### 0.1.4 (2021-01-05)

* (bropat) Fixed: Accept only valid modes for station guard mode (for invalid mode, an error is logged)
* (bropat) Fixed reset of an event (motion, ringing, etc.)
* (bropat) Updated versions of the package dependencies

### 0.1.3 (2021-01-02)

* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.euSec/issues/37) and [#41](https://github.com/bropat/ioBroker.euSec/issues/41)
* (bropat) Updated versions of the package dependencies

### 0.1.2 (2021-01-02)

* (bropat) Revised captured_pic_url state (renamed to last_captured_pic_url and added last_captured_pic_html)
* (bropat) Fixed p2p issue passing wrong user id (action_user_id instead of admin_user_id)
* (bropat) Revised push notification to properly support doorbell notifications
* (bropat) Updated versions of the package dependencies

### 0.1.1 (2020-12-29)

* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.euSec/issues/37)
* (bropat) Fixed version numbering
* (bropat) Updated versions of the package dependencies

### 0.0.9 (2020-12-28)

* (bropat) Finished implementation for feature request: [#1](https://github.com/bropat/ioBroker.euSec/issues/1)
* (bropat) Little progress for feature request: [#5](https://github.com/bropat/ioBroker.euSec/issues/5)
* (bropat) Now supports also cloud P2P communication if local P2P comunication isn't possible
* (bropat) Implemented set Guard Mode with CMD_SET_PAYLOAD for certain devices
* (bropat) Added back USA ip addresses for P2P cloud discovery
* (bropat) Using the correct local time zone for communication with the Eufy Cloud
* (bropat) HUB filtering by device type 0 (station) removed
* (bropat) Added documentation for 2FA
* (bropat) Updated versions of the package dependencies

### 0.0.8 (2020-12-13)

* (bropat) Fixed issue [#16](https://github.com/bropat/ioBroker.euSec/issues/16)
* (bropat) P2P communication revisited
* (bropat) Added reconnect functionality for P2P communication
* (bropat) Added heartbeat for P2P communication
* (bropat) Added local caching of last event picture as image url or html image (removed old state: last_camera_url)
* (bropat) Updated versions of the package dependencies

### 0.0.7 (2020-12-08)

* (bropat) Fixed issue [#11](https://github.com/bropat/ioBroker.euSec/issues/11)

### 0.0.6 (2020-12-06)

* (bropat) Fixed issue [#13](https://github.com/bropat/ioBroker.euSec/issues/13)

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

Copyright (c) 2020-2023 bropat <patrick.broetto@gmail.com>

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
