---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: 0LKUJSYTur11gX3lAf5dHULT5hrr/gFntR5r1rIsctw=
---
![Логотип](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Количество установок](http://iobroker.live/badges/sonoff-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# IoBroker Sonoff
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Сравнение адаптеров ioBroker, использующих протокол MQTT
Если у вас установлены только устройства Tasmota, использующие протокол MQTT, выберите `ioBroker.sonoff`.
В других сценариях рассмотрите различные варианты:

| Функция | ioBroker.sonoff | [[ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (в режиме брокера) | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (в режиме клиента) | [ioBroker.mqtt-client]](https://github.com/Pmant/ioBroker.mqtt-client/) |
|-----------------------------------------------|------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Имеет встроенный MQTT-брокер | да | да | нет | нет |
| Передает сообщения другим подписчикам MQTT | НЕТ!!! | да | неприменимо | неприменимо |
| Внешний MQTT-брокер | необязательно (режим моста) | не поддерживается | обязательно | обязательно |
| Отправка MQTT-сообщений Tasmota в объекты ioBroker | интеллектуальная обработка | обработка всех сообщений в соотношении 1:1 | обработка подписанных сообщений в соотношении 1:1 | обработка подписанных сообщений в соотношении 1:1 |
| Отправка MQTT-сообщений, не относящихся к Tasmota, в объекты ioBroker | без обработки | Обработка всех сообщений в соотношении 1:1 | Обработка подписанных сообщений в соотношении 1:1 | Обработка подписанных сообщений в соотношении 1:1 |
| Публиковать значения ioBroker в виде сообщений MQTT | нет | настроенные поддеревья | настроенные поддеревья | индивидуально настроенные значения |

## Использование
Этот адаптер взаимодействует с устройствами Sonoff с прошивкой Tasmota или устройствами ESP через протокол MQTT.

Ожидается обсуждение следующих тем:

- `tele/DeviceNAME/STATE`
- `tele/DeviceNAME/SENSOR`
- `tele/DeviceNAME/INFOx`
- `tele/DeviceNAME/ENERGY`
- `cmnd/DeviceNAME/POWERx`
- `stat/DeviceNAME/POWERx`
- `/DeviceNAME/BM280/Temperature`
- `/DeviceNAME/BM280/Humidity`
- `/DeviceNAME/BM280/Temperatur`
- `/DeviceNAME/BM280/Feuchtigkeit`
- `/DeviceNAME/BM280/Vcc`
- `/DeviceNAME/BM280/VCC`
- `/DeviceNAME/BM280/Laufzeit`
- `/DeviceNAME/BM280/RSSI`
- `/DeviceNAME/BM280/POWER`
- `/DeviceNAME/BM280/POWER1`
- `/DeviceNAME/BM280/POWER2`
- `/DeviceNAME/BM280/POWER3`
- `/DeviceNAME/BM280/POWER4`
- `/DeviceNAME/BM280/Switch1`
- `/DeviceNAME/BM280/Switch2`
- `/DeviceNAME/BM280/Total`
- `/DeviceNAME/BM280/Today`
- `/DeviceNAME/BM280/heute`
- `/DeviceNAME/BM280/Yesterday`
- `/DeviceNAME/BM280/gestern`
- `/DeviceNAME/BM280/Faktor`
- `/DeviceNAME/BM280/Factor`
- `/DeviceNAME/BM280/Power`
- `/DeviceNAME/BM280/Leistung`
- `/DeviceNAME/BM280/Voltage`
- `/DeviceNAME/BM280/Spannung`
- `/DeviceNAME/BM280/Current`
- `/DeviceNAME/BM280/Strom`
- `/DeviceNAME/BM280/Punkt`
- `/DeviceNAME/BM280/Counter1`
- `/DeviceNAME/BM280/Counter2`
- `/DeviceNAME/BM280/Counter3`
- `/DeviceNAME/BM280/Counter4`
- `/DeviceNAME/BM280/Pressure`
- `/DeviceNAME/BM280/SeaPressure`
- `/DeviceNAME/BM280/Druck`
- `/DeviceNAME/BM280/Приблизительная высота`
- `/DeviceNAME/BM280/Module`
- `/DeviceNAME/BM280/Version`
- `/DeviceNAME/BM280/Hostname`
- `/DeviceNAME/BM280/IPAddress`
- `/DeviceNAME/BM280/IPaddress`
- `/DeviceNAME/BM280/RestartReason`
- `/DeviceNAME/BM280/CarbonDioxide`
- `/DeviceNAME/DHT11/Illuminance`
- `/DeviceNAME/SonoffSC/Light`
- `/DeviceNAME/SonoffSC/Noise`
- `/DeviceNAME/SonoffSC/AirQuality`
- `/DeviceNAME/SDS0X1/PM2.5`
- `/DeviceNAME/SDS0X1/PM10`
- `/DeviceNAME/SDS0X1/UvLevel`
- `/DeviceNAME/SDS0X1/Latitude`
- `/DeviceNAME/SDS0X1/Longitude`
- `/DeviceNAME/SR04/Distance`

**Примечание**: Список можно легко расширить. Пожалуйста, отправьте `Pull Requests` или *отладочные данные* для неизвестных состояний разработчику (через проблему).

## Режим моста
По умолчанию адаптер использует встроенный TCP-брокер, к которому устройства Tasmota подключаются напрямую. Если у вас уже используется выделенный MQTT-брокер (например, Mosquitto), вы можете использовать режим моста — адаптер подключится к вашему существующему брокеру в качестве клиента.

### Конфигурация
В настройках адаптера активируйте параметр **Использовать внешний MQTT-брокер** и укажите **URL внешнего брокера** в качестве адреса вашего брокера, например, `mqtt://192.168.1.10:1883` или просто `192.168.1.10:1883`. При желании укажите имя пользователя и пароль. Если этот параметр отключен (или URL не указан), встроенный брокер запускается как обычно.

**Темы для подписки** определяет, какие темы будет прослушивать адаптер, по умолчанию это `tele/#, stat/#, +/tele/+, +/stat/+`. Расширьте этот список, если ваши устройства используют другие темы, например, устройства OpenBeken, которые публикуют данные в `<devicename>/...`, или глобальный префикс в полной теме (`myPrefix/tele/#`).

При желании можно задать **идентификатор клиента**, используемый брокером (по умолчанию `iobroker_sonoff_<instance>`), интервал **Keepalive** и **чистую сессию**. Отключите чистую сессию, если брокер должен сохранять сообщения устройств, когда адаптер не запущен.

### Полная структура тем
Поддерживаются стандартные настройки Tasmota `FullTopic`, которые автоматически определяются для каждого устройства; команды отправляются обратно в той же структуре:

| Полная тема | Пример | Команда |
|---|---|---|
| `%prefix%/%topic%/` (по умолчанию) | `tele/lamp/STATE` | `cmnd/lamp/POWER` |
| `gateway/%prefix%/%topic%/` | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/` | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |
| `gateway/%topic%/%prefix%/` | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

Вложенные темы, такие как `tele/house/floor1/lamp/STATE`, также работают. Фиксированный префикс перед полным названием темы (последние две строки, например, для нескольких шлюзов на одном брокере) распознается только в том случае, если подписки его охватывают, поэтому добавьте, например, `gateway/tele/#, gateway/stat/#` в **Темы для подписки**. То же самое относится и к структуре `%topic%/%prefix%/`, которая по умолчанию охватывается `+/tele/+, +/stat/+`.

### Зашифрованные соединения
Используйте `mqtts://broker:8883` (или `wss://`) в качестве URL. Для самоподписанных сертификатов отключите **Проверку сертификата брокера** или введите путь к вашему **сертификату центра сертификации**. Если брокеру требуются клиентские сертификаты, можно также указать пути к **клиентскому сертификату** и **ключу клиента**. Файлы считываются из файловой системы хоста ioBroker.

### Именование устройств
В режиме моста адаптер не может видеть пакеты MQTT CONNECT от устройств (ограничение протокола MQTT), поэтому имя устройства берется из его сообщений:

1. `MqttClient` из `stat/<topic>/STATUS6` — это идентификатор MQTT-клиента, поэтому устройства получают те же имена, что и при использовании встроенного брокера. Адаптер запрашивает эту информацию (`cmnd/<topic>/Status 6`), как только появляется неизвестное устройство.
2. `Имя хоста` из `tele/<topic>/STATE`, `tele/<topic>/INFO2` или `stat/<topic>/STATUS5`, если устройство не отвечает на запрос состояния.
3. Сама тема, если в течение 30 секунд ничего не приходит (например, устройства с пользовательской прошивкой).

Устройство переименовывается только в том случае, если новое имя получено из того же или лучшего источника, поэтому объекты не изменяются туда-обратно. Если устройство переименовывается в Tasmota, адаптер переименовывает соответствующие объекты ioBroker, но ссылки в других адаптерах (history, VIS и т. д.) необходимо корректировать вручную.

Поскольку внешний брокер продолжает работать во время перезагрузки адаптера, устройства не повторяют свои сообщения загрузки. Для заполнения полей `INFO.Hostname`, `INFO.IPAddress` и `INFO.Version` адаптер запрашивает их (`cmnd/<topic>/Status 5` и `cmnd/<topic>/Status 2`) при первом обнаружении устройства. Поле `Module` (из INFO1) запросить невозможно, и оно остается пустым.

### Доступность
При использовании встроенного брокера состояние `alive` отслеживает TCP-соединение устройства. В режиме моста вместо этого используется последняя тема will (`tele/<topic>/LWT`): `Online` устанавливает `alive` в true, `Offline` в false.

## Автоматическое создание объектов
В веб-конфигурационном файле можно определить, какие MQTT-телеграммы создают новые объекты, не входящие в стандартные точки данных:

* `TELE_SENSOR` — создает объекты из телеграмм `tele/xxx/SENSOR`.
* `TELE_STATE` — создает объекты из телеграмм `tele/xxx/STATE`.
* `STAT_RESULT` — создает объекты из телеграмм `stat/xxx/RESULT`.

Обычно для большинства пользователей достаточно параметра TELE_SENSOR.

* Команда `Create object tree` создает объекты в виде древовидной структуры.

**Внимание!** Эта опция нарушит структуру объектов Sonoff! Вам придётся заново настраивать все параметры хранения...
Сохраните структуру объектов в виде JSON-файла, чтобы вы могли воссоздать свою старую структуру.
Лучше всего остановить адаптер, удалить все объекты в Sonoff и снова запустить адаптер.

## Флаги для контроллеров светодиодов
Режимы работы будут созданы только в том случае, если устройство находится в одном из следующих состояний:

- `Красный`, `Зеленый`, `Синий`, `WW`, `CW`, `Цвет`, `RGB_POWER`, `WW_POWER`, `CW_POWER`, `Оттенок`, `Насыщенность`

Штаты:

* `modeLedExor` - exor для белых и цветных светодиодов => если белые светодиоды включены, цветные светодиоды выключены, и наоборот (по умолчанию true)
* `modeReadColors` — разрешает чтение цветов из MQTT (по умолчанию false)

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog

### **WORK IN PROGRESS**
* (stony2k) Add bridge mode to connect to an external MQTT broker instead of running a built-in broker
* (stony2k) Fix alive state object not being created (warning "has no existing object")
* (bluefox/GreatSUN) Fixed the names of data points inside a group: since 3.3.0 e.g. `SML_Total_in` was created as `SML_in` (#489)
* (bluefox) The states which were created with a shortened name by 3.3.x are listed in the log on start, so they can be deleted (#489)
* (bluefox) Bridge mode: the topics to subscribe are configurable now and nested full topics as well as OpenBeken topics are supported
* (bluefox) Bridge mode: devices are named after their MQTT client ID like with the built-in broker and are no longer renamed by less reliable sources
* (bluefox) Bridge mode: the `alive` state is set from the last will topic (LWT), so devices are recognized as offline
* (bluefox) Commands for auto-created states are sent to `cmnd/...` again, also for nested full topics
* (bluefox) `info.connection` contains the list of the connected clients again (server mode), in bridge mode the URL of the broker
* (bluefox/patricknitsch) Bridge mode: support for the full topic structure `%topic%/%prefix%/` (device first), detected automatically per device
* (bluefox/patricknitsch) Bridge mode: encrypted connections with CA/client certificates and optional certificate check, configurable client ID, keepalive and clean session
* (bluefox/patricknitsch) Bridge mode: a fix prefix in front of the full topic (e.g. `gateway/tele/device/STATE`) is recognized and used for the commands
* (@Apollon77/@copilot) Add support for OpenBeken LED datapoints (led_enableAll, led_dimmer, led_temperature, led_basecolor_rgb, led_finalcolor_rgbcw, led_basecolor_rgbcw, led_hue, led_saturation) - enables control of OpenBeken LED devices with automatic topic mapping for /get and /set suffixes
* (@Apollon77/@copilot) Add PulseTime1-PulseTime16 datapoint support - users can now read and set PulseTime values directly from ioBroker to control relay auto-off timers

### 3.3.0 (2025-09-20)
* (@Apollon77/@copilot) **IMPORTANT**: Commands now correctly use cmnd/ prefix instead of tele/ prefix
* (@Apollon77/@copilot) Added configuration for advanced MQTT settings
* (@Apollon77/@copilot) Fix shutter command mapping to use correct Tasmota format - Transforms Shutter1_Position to ShutterPosition1 for proper device control
* (@Apollon77/@copilot) Fix IRHVAC Power, Light and Mode fields showing NULL instead of actual string values
* (@Apollon77/@copilot) Add Zigbee device control support for Tasmota coordinators - users can now control Zigbee devices (Power/Dimmer) through ioBroker states via automatic ZbSend command generation
* (@Apollon77/@copilot) Add support for Tasmota tele/MARGINS messages enabling integration of PowerLow, PowerHigh, and PowerDelta limits
* (@Apollon77/@copilot) Fix POW R2 energy datapoints not being created by enabling TELE_STATE by default
* (@Apollon77/@copilot) Fix pressure and temperature unit display to respect PressureUnit and TempUnit from Tasmota MQTT messages
* (@Apollon77/@copilot) Add support for decoupled button actions in Tasmota devices - creates Button1-Button8 datapoints for button events
* (@Apollon77/@copilot) Fix RESULT message processing bug where tele/*/RESULT messages were incorrectly processed as WAKEUP instead of RESULT
* (@Apollon77/@copilot) Fix deprecated value.power.consumption role for ENERGY_Power datapoint to improve device detection
* (@Apollon77/@copilot) Add support for SHUTTER5-SHUTTER16 datapoints for ESP32 shutter32 devices
* (@Apollon77/@copilot) Update admin UI responsive design to use ioBroker standard values for mobile compatibility
* (@Apollon77/@copilot) Add support for Sonoff B1 (RGB LED) and Sonoff SC (Environmental Sensor) devices with proper value ranges
* (@Apollon77/@copilot) Add meaningful state labels for Scheme datapoint (color animation schemes)
* (@Apollon77/@copilot) Add configuration option to suppress "not connected" warnings for temporarily offline devices
* (@Apollon77/@copilot) Add Switch5-Switch28 datapoint definitions for consistent boolean mapping
* (@Apollon77/@copilot) Fix write flag for all Switch datapoints to enable proper control from ioBroker

### 3.2.1 (2024-10-07)

* (bluefox) Sanitize the IDs of the clients

### 3.2.0 (2024-08-28)
* (bluefox) Added information about connected clients in the server mode

### 3.1.2 (2024-08-17)
* (mattreim) updated packages

### 3.1.1 (2024-08-09)
* (mattreim) updated packages

### 3.1.0 (2024-05-25)
* Important: Node.js 18.x and js-controller 5.0.19+ are necessary at minimum
* (mattreim) upgraded states for Tasmota 13.4.0.3 20240402
* (mattreim) enhanced some log messages
* (mattreim) Added PWM Items
* (Apollon77) Fixed QoS handling to prevent invalid resubmissions
* (Apollon77) Prevent creation of storeMap property in common and cleanup

### 3.0.3 (2023-09-25)
* (bluefox/Bettman66) Added migration of password on JSON Config

### 2.5.7 (2023-07-07)
* (mcm1957) Disabled the logging of username and password during connection errors
* (bluefox) added json config

### 2.5.3 (2023-03-30)
* (GreatSUN) Implemented potential `.STATE.POWER` update

### 2.5.1 (2022-04-23)
* (Apollon77) Fixed the crash case reported by Sentry

### 2.5.0 (2022-03-21)
* (GreatSUN) Implement writing of NSPanel Widget changes
* (Apollon77) Fixed the crash case reported by Sentry

### 2.4.7 (2021-11-14)
* (Apollon77) Fix crash case (Sentry IOBROKER-SONOFF-1S)

### 2.4.6 (2021-11-13)
* (Apollon77) Fix some crash cases reported by Sentry (IOBROKER-SONOFF-B, IOBROKER-SONOFF-R, IOBROKER-SONOFF-4, IOBROKER-SONOFF-1, IOBROKER-SONOFF-13, IOBROKER-SONOFF-1J, IOBROKER-SONOFF-16, IOBROKER-SONOFF-3, IOBROKER-SONOFF-H)
* (Apollon77) Adjust Uptime to mixed because it seems that it can be number or string

### 2.4.5 (2021-07-21)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.4.4 (2021-07-19)
* (bluefox) Added UvaIntensity and UvbIntensity

### 2.4.3 (2021-07-18)
* (bluefox) Better type detection for non-described states

### 2.4.2 (2021-07-17)
* (bluefox) Optimize for js-controller 3.3

### 2.4.1 (2021-07-17)
* (Apollon77/bluefox) Optimize for js-controller 3.3
* (Apollon77) Add Sentry for error reporting with js-controller 3.x+

### 2.4.0 (2021-02-04)
* (anwa) add several data points
* (anwa) Fix translation for 'ignorePings'
* (anwa) Fixed the wrong unit for humidity
* (anwa) Config option to create a complete object tree instead of a flat structure
* (anwa) Change Action type to string
* (Apollon77) js-controller 2.0 is required at least

### 2.3.3 (2019-11-27)
* (bluefox) Error with the empty packet was caught

### 2.3.2 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed setting the IP interface for server
* (bluefox) Fixed tests for js-controller 2.0
* (bluefox) Fixed the monitoring of the client connection
* (bluefox) Changed "indicator.connected" to "indicator.reachable" for clients
* (bluefox) Supported `{POWERn: "true"}`
* (bluefox) Correct processing of `{temp: nan}`

### 2.2.3 (2019-01-10)
* (simatec) Support for compact mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), led-controllers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Today's power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2026, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.