---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: 69OoQHxHyfJg+oi1Qak6r4UkNk7G0sJIOhYvXfItk+o=
---
![Логотип](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Количество установок](http://iobroker.live/badges/sonoff-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# ioBroker Sonoff

![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg)[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Сравнение адаптеров ioBroker, использующих протокол MQTT.

Если ваши Tasmota используют только протокол MQTT, выбирайте...`ioBroker.sonoff` В других случаях рассмотрите различные варианты:

| Особенность                                                           | ioBroker.sonoff            | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (в режиме брокера) | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (в клиентском режиме) | [ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/) |
| --------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Имеет встроенный MQTT-брокер.                                         | да                         | да                                                                             | нет                                                                               | нет                                                                    |
| Передает сообщения другим подписчикам MQTT.                           | НЕТ!!!                     | да                                                                             | непригодный                                                                       | непригодный                                                            |
| Внешний MQTT-брокер                                                   | опционально (режим моста)  | неподдерживаемый                                                               | необходимый                                                                       | необходимый                                                            |
| Отправка MQTT-сообщений Tasmota объектам ioBroker                     | интеллектуальная обработка | Обработка всех сообщений в соотношении 1:1                                     | Обработка подписанных сообщений в соотношении 1:1                                 | Обработка подписанных сообщений в соотношении 1:1                      |
| Отправка сообщений MQTT, не относящихся к Tasmota, объектам ioBroker. | без обработки              | Обработка всех сообщений в соотношении 1:1                                     | Обработка подписанных сообщений в соотношении 1:1                                 | Обработка подписанных сообщений в соотношении 1:1                      |
| Публиковать значения ioBroker в виде сообщений MQTT                   | никто                      | настроенные поддеревья                                                         | настроенные поддеревья                                                            | индивидуально настроенные значения                                     |

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
- `/DeviceNAME/BM280/Approx. Altitude`
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

**Примечание** : Список можно легко расширить. Пожалуйста, пришлите.`Pull Requests` или предоставить разработчику _отладочные данные_ для неизвестных состояний (через сообщение об ошибке).

## Режим моста

По умолчанию адаптер использует встроенный TCP-брокер, к которому устройства Tasmota подключаются напрямую. Если у вас уже используется выделенный MQTT-брокер (например, Mosquitto), вы можете использовать режим моста — адаптер подключится к вашему существующему брокеру в качестве клиента.

### Конфигурация

В настройках адаптера активируйте **параметр «Использовать внешний MQTT-брокер»** и укажите в качестве **URL-адреса внешнего брокера** адрес вашего брокера, например:`mqtt://192.168.1.10:1883` или просто`192.168.1.10:1883` При желании можно указать имя пользователя и пароль. Если эта опция отключена (или не указан URL-адрес), встроенный брокер запускается как обычно.

**Параметр «Темы для подписки»** определяет, какие темы адаптер будет отслеживать по умолчанию.`tele/#, stat/#, +/tele/+, +/stat/+` Расширьте этот список, если ваши устройства используют другие темы, например, устройства OpenBeken, которые публикуют данные в эту тему.`<devicename>/...` или глобальный префикс в полной теме (`myPrefix/tele/#` ).

При желании вы можете указать **идентификатор клиента** , используемый брокером (по умолчанию).`iobroker_sonoff_<instance>` ), интервал **Keepalive** и **очистка сессии** . Отключите очистку сессии, если брокер должен сохранять сообщения устройств, когда адаптер не запущен.

### Полные тематические структуры

Обычный Tasmota`FullTopic` Настройки поддерживаются и автоматически определяются для каждого устройства, команды отправляются обратно в той же структуре:

| Полная тема                        | Пример                    | Командование              |
| ---------------------------------- | ------------------------- | ------------------------- |
| `%prefix%/%topic%/` (по умолчанию) | `tele/lamp/STATE`         | `cmnd/lamp/POWER`         |
| `%topic%/%prefix%/`                | `lamp/tele/STATE`         | `lamp/cmnd/POWER`         |
| `gateway/%prefix%/%topic%/`        | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/`        | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

Вложенные темы, такие как`tele/house/floor1/lamp/STATE` Работает тоже. Фиксированный префикс перед полным названием темы (последние две строки, например, для нескольких шлюзов на одном брокере) распознается только в том случае, если подписки его охватывают, поэтому добавьте, например,`gateway/tele/#, gateway/stat/#` Чтобы **подписаться на раздел «Темы», перейдите по ссылке** . То же самое относится и к...`%topic%/%prefix%/` структура, которая покрыта`+/tele/+, +/stat/+` по умолчанию.

### Зашифрованные соединения

Использовать`mqtts://broker:8883` (или`wss://` ) в качестве URL. Для самоподписанных сертификатов отключите **проверку сертификата брокера** или введите путь к **сертификату вашего центра сертификации** . Если брокеру требуются клиентские сертификаты, можно также ввести пути к **клиентскому сертификату** и **клиентскому ключу** . Файлы считываются из файловой системы хоста ioBroker.

### именование устройств

В режиме моста адаптер не может видеть пакеты MQTT CONNECT от устройств (ограничение протокола MQTT), поэтому имя устройства берется из его сообщений:

1. `MqttClient` от`stat/<topic>/STATUS6` - Это идентификатор MQTT-клиента, поэтому устройства получают те же имена, что и при использовании встроенного брокера. Адаптер запрашивает эту информацию (`cmnd/<topic>/Status 6` ) как только появится неизвестное устройство.
2. `Hostname` от`tele/<topic>/STATE` ,`tele/<topic>/INFO2` или`stat/<topic>/STATUS5` если устройство не отвечает на запрос о состоянии.
3. Если в течение 30 секунд ничего не поступает (например, на устройства с пользовательской прошивкой), то вопрос остается открытым.

Устройство переименовывается только в том случае, если новое имя получено из того же или лучшего источника, поэтому объекты не изменяются туда-обратно. Если устройство переименовывается в Tasmota, адаптер переименовывает соответствующие объекты ioBroker, но ссылки в других адаптерах (history, VIS и т. д.) необходимо корректировать вручную.

Поскольку внешний брокер продолжает работать во время перезагрузки адаптера, устройства не повторяют свои сообщения загрузки. Для заполнения`INFO.Hostname` ,`INFO.IPAddress` и`INFO.Version` , адаптер запрашивает их (`cmnd/<topic>/Status 5` и`cmnd/<topic>/Status 2` ) при первом обнаружении устройства.`Module` (из INFO1) запрос невозможен, и поле остается пустым.

### Доступность

При наличии встроенного брокера`alive` Состояние определяется TCP-соединением устройства. В режиме моста последним будет топик (`tele/<topic>/LWT` Вместо этого используется ):`Online` наборы`alive` правда,`Offline` ложно.

## Автоматическое создание объектов

В веб-конфигурации можно определить, какие MQTT-телеграммы создают новые объекты, не входящие в стандартные точки данных:

- `TELE_SENSOR` - создает объекты из`tele/xxx/SENSOR` телеграммы
- `TELE_STATE` - создает объекты из`tele/xxx/STATE` телеграммы
- `STAT_RESULT` - создает объекты из`stat/xxx/RESULT` телеграммы

Обычно для большинства пользователей достаточно параметра TELE\_SENSOR.

- `Create object tree` создает объекты в виде древовидной структуры.

**Внимание!** Эта опция нарушит структуру объектов Sonoff! Вам придётся заново настраивать все параметры хранения... Сохраняйте структуру объектов в виде JSON-файла, чтобы потом можно было воссоздать старую структуру. Лучше всего остановить адаптер, удалить все объекты в папке Sonoff и снова запустить адаптер.

## Флаги для контроллеров светодиодов

Режимы работы будут созданы только в том случае, если устройство находится в одном из следующих состояний:

- `Red` ,`Green` ,`Blue` ,`WW` ,`CW` ,`Color` ,`RGB_POWER` ,`WW_POWER` ,`CW_POWER` ,`Hue` ,`Saturation`

Штаты:

- `modeLedExor` - exor для белых и цветных светодиодов => если белые светодиоды включены, цветные светодиоды выключены, и наоборот (по умолчанию true)
- `modeReadColors` - Разрешить считывание цвета из MQTT (по умолчанию - false)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.2.0 (2026-09-07)
* (@patricknitsch) Added Device Manager for existing devices

### 4.0.0 (2026-08-13)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (stony2k) Added bridge mode to connect to an external MQTT broker instead of running a built-in broker
* (stony2k) Fixed the alive state object not being created (warning "has no existing object")
* (@GermanBluefox/GreatSUN) Fixed the names of data points inside a group: since 3.3.0 e.g. `SML_Total_in` was created as `SML_in` (#489)
* (@GermanBluefox/baetzst) The MAC address and the other network and firmware information of a device are stored as data points (`INFO.Mac`, `INFO.Gateway`, `INFO.Hardware`, ...) (#513)
* (@GermanBluefox) Server mode: the adapter requests `Status 5` and `Status 2` from a device with its first message, so the INFO states are filled even if the device did not reboot
* (@GermanBluefox) The states which were created with a shortened name by 3.3.x are listed in the log on start, so they can be deleted (#489)
* (@GermanBluefox) Bridge mode: the topics to subscribe are configurable now, and nested full topics as well as OpenBeken topics are supported
* (@GermanBluefox) Bridge mode: devices are named after their MQTT client ID like with the built-in broker and are no longer renamed by less reliable sources
* (@GermanBluefox) Bridge mode: the `alive` state is set from the last will topic (LWT), so devices are recognized as offline
* (@GermanBluefox) Commands for auto-created states are sent to `cmnd/...` again, also for nested full topics
* (@GermanBluefox) `info.connection` contains the list of the connected clients again (server mode), in bridge mode the URL of the broker
* (@GermanBluefox/patricknitsch) Bridge mode: support for the full topic structure `%topic%/%prefix%/` (device first), detected automatically per device
* (@GermanBluefox/patricknitsch) Bridge mode: encrypted connections with CA/client certificates and optional certificate check, configurable client ID, keepalive and clean session
* (@GermanBluefox/patricknitsch) Bridge mode: a fix prefix in front of the full topic (e.g. `gateway/tele/device/STATE`) is recognized and used for the commands
* (@Apollon77/@copilot) Added support for OpenBeken LED datapoints (led_enableAll, led_dimmer, led_temperature, led_basecolor_rgb, led_finalcolor_rgbcw, led_basecolor_rgbcw, led_hue, led_saturation) - enables control of OpenBeken LED devices with automatic topic mapping for /get and /set suffixes
* (@Apollon77/@copilot) Added PulseTime1-PulseTime16 datapoint support - users can now read and set PulseTime values directly from ioBroker to control relay auto-off timers
* (@GermanBluefox) Breaking: a minimal supported Node.js version is now 22

### 3.3.0 (2025-09-20)
* (@Apollon77/@copilot) **IMPORTANT**: Commands now correctly use `cmnd/` prefix instead of `tele/` prefix
* (@Apollon77/@copilot) Added configuration for advanced MQTT settings
* (@Apollon77/@copilot) Fixed shutter command mapping to use the correct Tasmota format - Transforms Shutter1_Position to ShutterPosition1 for proper device control
* (@Apollon77/@copilot) Fixed IRHVAC Power, Light and Mode fields showing NULL instead of actual string values
* (@Apollon77/@copilot) Added Zigbee device control support for Tasmota coordinators - users can now control Zigbee devices (Power/Dimmer) through ioBroker states via automatic ZbSend command generation
* (@Apollon77/@copilot) Added support for Tasmota tele/MARGINS messages enabling integration of PowerLow, PowerHigh, and PowerDelta limits
* (@Apollon77/@copilot) Fixed POW R2 energy datapoints not being created by enabling TELE_STATE by default
* (@Apollon77/@copilot) Fixed pressure and temperature unit display to respect PressureUnit and TempUnit from Tasmota MQTT messages
* (@Apollon77/@copilot) Added support for decoupled button actions in Tasmota devices - creates Button1-Button8 datapoints for button events
* (@Apollon77/@copilot) Fixed RESULT message processing bug where tele/*/RESULT messages were incorrectly processed as WAKEUP instead of RESULT
* (@Apollon77/@copilot) Fixed the deprecated value.power.consumption role for ENERGY_Power datapoint to improve device detection
* (@Apollon77/@copilot) Added support for SHUTTER5-SHUTTER16 datapoints for ESP32 shutter32 devices
* (@Apollon77/@copilot) Updated admin UI responsive design to use ioBroker standard values for mobile compatibility
* (@Apollon77/@copilot) Added support for Sonoff B1 (RGB LED) and Sonoff SC (Environmental Sensor) devices with proper value ranges
* (@Apollon77/@copilot) Added meaningful state labels for Scheme datapoint (color animation schemes)
* (@Apollon77/@copilot) Added a configuration option to suppress "not connected" warnings for temporarily offline devices
* (@Apollon77/@copilot) Added Switch5-Switch28 datapoint definitions for consistent boolean mapping
* (@Apollon77/@copilot) Fixed a write flag for all Switch datapoints to enable proper control from ioBroker

### 3.2.1 (2024-10-07)

* (bluefox) Sanitize the IDs of the clients

### 3.2.0 (2024-08-28)
* (bluefox) Added information about connected clients in the server mode

[Older changelogs can be found there](CHANGELOG_OLD.md)

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