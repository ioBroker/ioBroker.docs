---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: STvU/5u80kIYW6JHWnKFtNkKbiijpC9qTXAxRKNN4Ns=
---
![Логотип](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Количество установок](https://iobroker.live/badges/sonoff-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.sonoff.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# ioBroker Sonoff

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Сравнение адаптеров ioBroker, использующих протокол MQTT.

Если ваши Tasmota используют только протокол MQTT, выбирайте... `ioBroker.sonoff` В других случаях рассмотрите различные варианты:

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
- `tele/DeviceNAME/SWITCH` (Дистанционное управление, см. [Автоматическое создание объектов](#auto-creation-of-objects) )
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

**Примечание** : Список можно легко расширить. Пожалуйста, пришлите. `Pull Requests` или отправлять разработчику _отладочные данные_ для неизвестных состояний (через сообщение об ошибке). Собственные темы (например, правил или скриптов на устройстве) можно добавить в настройках, см. `Additional topics` ниже.

## Отправка любой команды (`Backlog`)

Каждое устройство имеет состояние. `Backlog` Его текст отправляется по адресу: `cmnd/<topic>/Backlog` Таким образом, это может быть любая команда Tasmota, включая команды без собственного состояния, например... `POWER1 TOGGLE` или `POWER1 BLINK` Несколько команд разделены символом `;`: `POWER1 ON; Delay 100; POWER1 OFF` В карточке устройства в диспетчере устройств оно отображается как текстовое поле.

Он `POWERx` Состояния остаются логическими (вкл/выкл), поэтому визуализации, скрипты и история событий продолжают работать. Используйте `Backlog` для `TOGGLE` или `BLINK`.

## Зашифрованные соединения (MQTTS)

При использовании **протокола Secure (MQTTS)** встроенный сервер принимает только TLS-соединения. Обычно используется порт... `8883` Для этого используется порт, поэтому укажите и его. Сертификаты выбираются из списка сертификатов ioBroker (администратор: Настройки → Сертификаты), пустые поля используют самоподписанные сертификаты ioBroker по умолчанию. Если сертификаты не могут быть прочитаны, сервер не запускается, и в журнале указывается причина.

Со стороны компании Tasmota:

- TLS включен только в `tasmota32` и `tasmota-zbbridge` Сборки. Для устройств ESP8266 требуется собственная сборка. `USE_MQTT_TLS` См. [документацию Tasmota TLS](https://tasmota.github.io/docs/TLS/) .
- `SetOption103 1` включает TLS, `MqttPort 8883` задает порт.
- `SetOption132 1` Вместо встроенных центров сертификации (Let's Encrypt, Amazon) проверяется отпечаток сервера. Это необходимо для самоподписанных сертификатов, например, стандартных сертификатов ioBroker. Tasmota определяет отпечаток при первом подключении.
- Поиск устройств в диспетчере устройств показывает следующее: `SetOption103 1; SetOption132 1` автоматически, если сервер (или в режиме моста внешний брокер, `mqtts://`) использует TLS.

Сообщение об устройстве без TLS на порту MQTTS поступает один раз в час. `TLS connection from <address> failed`), дальнейшие попытки регистрируются как отладочные.

Для подключения к внешнему брокеру см. раздел [«Зашифрованные соединения](#encrypted-connections) в режиме моста».

## Режим моста

По умолчанию адаптер использует встроенный TCP-брокер, к которому устройства Tasmota подключаются напрямую. Если у вас уже используется выделенный MQTT-брокер (например, Mosquitto), вы можете использовать режим моста — адаптер подключится к вашему существующему брокеру в качестве клиента.

### Конфигурация

В настройках адаптера активируйте **параметр «Использовать внешний MQTT-брокер»** и укажите в качестве **URL-адреса внешнего брокера** адрес вашего брокера, например: `mqtt://192.168.1.10:1883` или просто `192.168.1.10:1883` При желании можно указать имя пользователя и пароль. Если эта опция отключена (или не указан URL-адрес), встроенный брокер запускается как обычно.

**Учетные данные из центрального хранилища:** вместо ввода имени пользователя и пароля можно выбрать **«Учетные данные: Из хранилища учетных данных»** — как для встроенного сервера, так и для внешнего брокера — и выбрать учетные данные в формате «Логин и пароль», которые управляются один раз в системных настройках администратора (Настройки → Учетные данные, admin 7.9.0 или новее). Это удобно, если один и тот же логин MQTT используется несколькими адаптерами или экземплярами. Адаптер считывает учетные данные при запуске и перезапускается, если они изменяются. Если учетные данные не могут быть прочитаны, сервер/соединение MQTT не запускается, и в журнал записывается ошибка.

**Параметр «Темы для подписки»** определяет, какие темы адаптер будет отслеживать по умолчанию. `tele/#, stat/#, +/tele/+, +/stat/+` Расширьте этот список, если ваши устройства используют другие темы, например, устройства OpenBeken, которые публикуют данные в эту тему. `<devicename>/...` или глобальный префикс в полной теме (`myPrefix/tele/#`).

При желании вы можете указать **идентификатор клиента** , используемый брокером (по умолчанию). `iobroker_sonoff_<instance>`), интервал **Keepalive** и **очистка сессии** . Отключите очистку сессии, если брокер должен сохранять сообщения устройств, когда адаптер не запущен.

### Полные тематические структуры

Обычный Tasmota `FullTopic` Настройки поддерживаются и автоматически определяются для каждого устройства, команды отправляются обратно в той же структуре:

| Полная тема                        | Пример                    | Командование              |
| ---------------------------------- | ------------------------- | ------------------------- |
| `%prefix%/%topic%/` (по умолчанию) | `tele/lamp/STATE`         | `cmnd/lamp/POWER`         |
| `%topic%/%prefix%/`                | `lamp/tele/STATE`         | `lamp/cmnd/POWER`         |
| `gateway/%prefix%/%topic%/`        | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/`        | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

Вложенные темы, такие как `tele/house/floor1/lamp/STATE` Работает тоже. Фиксированный префикс перед полным названием темы (последние две строки, например, для нескольких шлюзов на одном брокере) распознается только в том случае, если подписки его охватывают, поэтому добавьте, например, `gateway/tele/#, gateway/stat/#` Чтобы **подписаться на раздел «Темы», перейдите по ссылке** . То же самое относится и к... `%topic%/%prefix%/` структура, которая покрыта `+/tele/+, +/stat/+` по умолчанию.

### Зашифрованные соединения

Использовать `mqtts://broker:8883` (или `wss://`) в качестве URL. Для самоподписанных сертификатов отключите **проверку сертификата брокера** или введите путь к **сертификату вашего центра сертификации** . Если брокеру требуются клиентские сертификаты, можно также ввести пути к **клиентскому сертификату** и **клиентскому ключу** . Файлы считываются из файловой системы хоста ioBroker.

### именование устройств

В режиме моста адаптер не может видеть пакеты MQTT CONNECT от устройств (ограничение протокола MQTT), поэтому имя устройства берется из его сообщений:

1. `MqttClient` от `stat/<topic>/STATUS6` - Это идентификатор MQTT-клиента, поэтому устройства получают те же имена, что и при использовании встроенного брокера. Адаптер запрашивает эту информацию (`cmnd/<topic>/Status 6`) как только появится неизвестное устройство.
2. `Hostname` от `tele/<topic>/STATE`, `tele/<topic>/INFO2` или `stat/<topic>/STATUS5` если устройство не отвечает на запрос о состоянии.
3. Если в течение 30 секунд ничего не поступает (например, на устройства с пользовательской прошивкой), то вопрос остается открытым.

Устройство переименовывается только в том случае, если новое имя получено из того же или лучшего источника, поэтому объекты не изменяются туда-обратно. Если устройство переименовывается в Tasmota, адаптер переименовывает соответствующие объекты ioBroker, но ссылки в других адаптерах (history, VIS и т. д.) необходимо корректировать вручную.

Поскольку внешний брокер продолжает работать во время перезагрузки адаптера, устройства не повторяют свои сообщения загрузки. Для заполнения `INFO.Hostname`, `INFO.IPAddress` и `INFO.Version`, адаптер запрашивает их (`cmnd/<topic>/Status 5` и `cmnd/<topic>/Status 2`) при первом обнаружении устройства. `Module` (из INFO1) запрос невозможен, и поле остается пустым.

### Доступность

При наличии встроенного брокера `alive` Состояние определяется TCP-соединением устройства. В режиме моста последним будет топик (`tele/<topic>/LWT` Вместо этого используется ): `Online` наборы `alive` правда, `Offline` ложно.

## Автоматическое создание объектов

В веб-конфигурации можно определить, какие MQTT-телеграммы создают новые объекты, не входящие в стандартные точки данных:

- `TELE_SENSOR` - создает объекты из `tele/xxx/SENSOR` телеграммы
- `TELE_STATE` - создает объекты из `tele/xxx/STATE` телеграммы
- `STAT_RESULT` - создает объекты из `stat/xxx/RESULT` телеграммы
- `TELE_SWITCH` - создает объекты из `tele/xxx/SWITCH` Телеграммы с пультов дистанционного управления (включены по умолчанию)

Обычно для большинства пользователей достаточно параметра TELE\_SENSOR.

**Пульты дистанционного управления:** скрипт Berry [Tasmota-eWeLinkRemote](https://github.com/Flobul/Tasmota-eWeLinkRemote) (eWeLink R5, S-MATE) отправляет каждое нажатие как `tele/xxx/SWITCH = {"Button1":{"Action":"single"},"Signal":-61,"DeviceId":"5AC87680",...}` Оно хранится в `Button1_Action` (`single`, `double` или `hold`) и `Signal`, `DeviceId`, `DeviceType`, `Sequence`, `Timestamp` Каждый оттиск записывается, и каждое действие повторяется снова и снова. `DeviceId` написано перед `ButtonX_Action` Таким образом, скрипт, запускаемый нажатием кнопки, может определить, какой пульт был нажат.

**Дополнительные темы:** значения по другим темам, помимо перечисленных выше, игнорируются, за исключением случаев, когда последняя часть темы указана в `Additional topics` (разделенные запятыми, `*` (используется подстановочный знак, регистр не учитывается), например `PIR*, Motion`:

- Простое значение создает состояние только для чтения, содержащее имя темы: `stat/xxx/PIR1 = ON` создает `PIR1` Тип определяется по первому значению: число (`1`, `25.4`), вкл/выкл (`ON`, `OFF`) или текст. Существующее состояние сохраняет свой тип, а значения, которые ему не подходят (например) `TOGGLE` (для включения/выключения) игнорируются.
- JSON обрабатывается следующим образом: `tele/xxx/SENSOR`, но под названием темы: `tele/xxx/Motion = {"State":"detected"}` создает `Motion_State` (`Motion.State` с `Create object tree`).
- Телеграммы компании Tasmota (`STATE`, `SENSOR`, `RESULT`, `STATUSx`...) сохраняют свои собственные варианты, даже при наличии `*`.

При наличии нескольких пультов дистанционного управления скрипт Berry может отправлять сообщения с каждого пульта в отдельную тему, например: `EweTopicMode 3 %prefix%/%topic%/Remote_%alias%` с дополнительной темой `Remote_*`. Тогда каждый удаленный модуль получает свои собственные состояния (`Remote_kitchen_Button1_Action`, ...).

- `Create object tree` создает объекты в виде древовидной структуры.

**Внимание!** Эта опция нарушит структуру объектов Sonoff! Вам придётся заново настраивать все параметры хранения... Сохраняйте структуру объектов в виде JSON-файла, чтобы потом можно было воссоздать старую структуру. Лучше всего остановить адаптер, удалить все объекты в папке Sonoff и снова запустить адаптер.

## Флаги для контроллеров светодиодов

Режимы работы будут созданы только в том случае, если устройство находится в одном из следующих состояний:

- `Red`, `Green`, `Blue`, `WW`, `CW`, `Color`, `RGB_POWER`, `WW_POWER`, `CW_POWER`, `Hue`, `Saturation`

Штаты:

- `modeLedExor` - exor для белых и цветных светодиодов => если белые светодиоды включены, цветные светодиоды выключены, и наоборот (по умолчанию true)
- `modeReadColors` - Разрешить считывание цвета из MQTT (по умолчанию - false)

## Роли объектов начиная с версии 5.0

Начиная с версии 5.0, объектам присваиваются роли, которые корректно распознаются детектором типов, благодаря чему адаптеры, такие как Alexa (iO), Matter, Material или другие устройства, находят нужные устройства: реле как светильник или розетку, светильник с его цветом, диммером и эффектами, датчик температуры и так далее. Раньше, например, `Wifi_Channel` или `MqttPort` были обнаружены как более тусклые и `POWER` RGB-светильник был заменен на `WW_POWER`.

**Поведение существующих объектов может измениться:**

- Роли существующих объектов обновляются, как только устройство снова отправляет значение. Изменяются только те роли, которые были установлены в более старых версиях, то есть роли, измененные вами (например, `switch.light` на `POWER`) сохраняется. Идентификатор, имя, настройки истории и значение остаются без изменений.
- Визуализации, скрипты или псевдонимы, которые выбирают состояния по их роли, теперь могут находить другие состояния.
- `Switch1`... `Switch28` являются входными данными устройства и поэтому теперь доступны только для чтения.
- Наиболее важные изменения:
  - Информация о сети и микропрограммном обеспечении: `info.ip`, `info.name`, `info.firmware`, `info.hardware`, ...
  - диагностические значения (`Heap`, `LoadAvg`, `Wifi_Channel`, `HTTP_API`, ...): `info.status`, `UptimeSec`: `value.interval`, `Wifi_Signal`: `value.rssi`
  - `POWER`, `POWER1`... с `switch.power`: `switch`
  - `RGB_POWER`, `WW_POWER`, `CW_POWER`: `switch.mode.color`, `switch.mode.white`, `switch.mode.coldwhite`, `Fade`, `modeLedExor`, `modeReadColors`: `switch.setting`, `Scheme`: `level.effect`, `CT`: `level.color.temperature`
  - `Today`, `Yesterday`: `value.energy.consumed`, `Vcc`: `value.voltage.vcc`, `DewPoint`: `value.temperature.dewpoint`
  - автоматически созданные состояния: тексты `text`, записываемые числа `state` (до `level`)

Устройство с несколькими реле (`POWER1`, `POWER2` Устройство, находящееся в одном канале, по-прежнему определяется только как одно устройство, поскольку детектор типов обнаруживает каждый тип устройства только один раз на канал.

## Диспетчер устройств

Устройства отображаются в диспетчере устройств административной панели с указанием их реле, диммеров, цветовой гаммы, жалюзи и настроек, которыми можно управлять непосредственно там.

**Обновление прошивки:** если включена опция «Проверять наличие обновлений прошивки» (по умолчанию), адаптер считывает последнюю версию Tasmota из GitHub один раз в день. Устройство Tasmota со старой прошивкой отображает индикатор обновления и действие «Обновить прошивку». Оно отправляет `Upgrade 1` к устройству, которое загружает прошивку со своего собственного OTA-адреса (по умолчанию это официальный релиз варианта сборки, например...). `tasmota` или `tasmota32`) и перезапускается. Диалоговое окно ожидает, пока устройство сообщит о новой версии, максимум 5 минут. Для «обновления» до версии, на которой они основаны, отладочные сборки не предлагаются.

**Поиск устройств:** действие «Поиск устройств» экземпляра запрашивает статус каждого адреса в локальных сетях (сети /24 каждого собственного адреса) через веб-интерфейс Tasmota — официальные сборки Tasmota не объявляют себя через mDNS. Найденные устройства отображаются с их текущими настройками MQTT, а устройства, уже подключенные к этому экземпляру, — отдельно. Для выбранных устройств адаптер включает MQTT и записывает MQTT-сервер, порт, пользователя и пароль. `Backlog SetOption3 1; MqttHost ...; MqttPort ...; MqttUser ...; MqttPassword ...` Настройки предварительно заполняются собственным адресом, портом и учетными данными встроенного сервера в режиме моста с внешним брокером. Устройства перезапускаются и отображаются в списке сразу после подключения. Для устройств с веб-паролем требуется указать его в форме. Если ioBroker работает в контейнере Docker без хост-сети, поиск осуществляется только в сети контейнера.

На карте устройства отображается состояние подключения и сигнал Wi-Fi. `Wifi_Signal` (в дБм) в прямом эфире.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.4.0 (2026-11-10)
* (@GermanBluefox) The built-in MQTT server supports encrypted connections (MQTTS) with the certificates of ioBroker, new option "Secure (MQTTS)". The search for devices enables TLS on the devices then (#529)

### 5.3.0 (2026-11-10)
* (@GermanBluefox) Presses of remote controls (`tele/<topic>/SWITCH`, e.g. eWeLink R5 with the Berry script Tasmota-eWeLinkRemote) are stored, new option "For tele/SWITCH" (#515)
* (@GermanBluefox) New option "Additional topics": values of own topics like `stat/<topic>/PIR1` are stored, also with wildcards (`PIR*`) (#281)
* (@GermanBluefox) Every device has the state `Backlog` to send any Tasmota command, e.g. `POWER1 TOGGLE` (#277)

### 5.2.2 (2026-11-10)
* (@patricknitsch) The firmware update dialog of the device manager recognizes the new version also with "Create object tree" ("INFO.Info1.Version"), before it waited till the timeout
* (@patricknitsch) The firmware update from the device manager clears the "Upgrade" command afterwards, so a restart of the external broker (e.g. the ioBroker MQTT adapter) does not start the update again
* (@patricknitsch) Bridge mode: "INFO.Version" and the IP address are requested again after a device restarted (e.g. after a firmware update)
* (@GermanBluefox) A device with a wrong MQTT password is reported only once per hour instead of on every connection attempt, the other attempts are logged as debug (#548)
* (@GermanBluefox) Control characters (e.g. 0x00) of a corrupted payload are escaped in the warning "cannot parse data", so they do not corrupt the log file (#586)
* (@GermanBluefox) The timers use the adapter functions, so they are cleared when the adapter stops

### 5.2.1 (2026-10-23)
* (@GermanBluefox) Firmware with other texts for ON/OFF (e.g. "AN"/"AUS" of a German build) is supported: the texts of every device are requested and recognized automatically

### 5.2.0 (2026-10-22)
* (@GermanBluefox) The MQTT login of the built-in server and of the external broker can be taken from the central credential storage of admin (Settings → Credentials), admin 7.9.0+ is required (#629)

Older changes can be found in CHANGELOG_OLD.md

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