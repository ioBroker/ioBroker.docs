---
chapters: {"pages":{"en/adapterref/iobroker.tesla-motors/README.md":{"title":{"en":"ioBroker.tesla-motors"},"content":"en/adapterref/iobroker.tesla-motors/README.md"},"en/adapterref/iobroker.tesla-motors/docs/fleet-telemetry-setup.md":{"title":{"en":"Fleet Telemetry setup guide"},"content":"en/adapterref/iobroker.tesla-motors/docs/fleet-telemetry-setup.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: KhM2/6dwYLL5z36LkuPdRPMRnrw27gzAAIxTnnxDYC8=
---
![Логотип](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Количество установок (последние)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/tesla-motors-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tesla-motors

## Адаптер Tesla для ioBroker

Все автомобили Tesla и устройства Powerwall, отображаемые в приложении Tesla, отображаются и обновляются через официальный **API Tesla Fleet** .

Команды управления автомобилем (блокировка, разблокировка, климат-контроль, зарядка и т. д.) поддерживаются для всех моделей, включая автомобили, выпущенные после 2021 года, для которых требуется **сквозная подпись команд** (протокол управления автомобилем).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

### Требования

- Компания Tesla имеет аккаунты, связанные с транспортными средствами или энергетическими продуктами.
- Node.js >= 22
- Зарегистрированное приложение Tesla Fleet API (идентификатор клиента + секретный ключ клиента) с сайта [developer.tesla.com](https://developer.tesla.com)
- Домен Fleet Key (для установки виртуального ключа на транспортное средство)

### Настройка (пошаговая инструкция)

Административный интерфейс адаптера проведет вас через 4 шага:

#### Шаг 1: Сгенерируйте пару ключей

1. Нажмите **«Создать пару ключей»** в настройках адаптера, чтобы создать пару ключей EC (prime256v1).
2. Нажмите **«Скопировать открытый ключ»** и перейдите на [fleetkey.net](https://fleetkey.net) , вставьте его в поле «Открытый ключ хоста» и создайте поддомен (например,`abc123.fleetkey.net` )
3. После сохранения ваш открытый ключ будет размещен на FleetKey.net. Tesla загрузит ключ оттуда во время регистрации.

#### Шаг 2: Приложение Tesla для разработчиков

1. Создайте приложение Fleet API на [developer.tesla.com](https://developer.tesla.com/request)
2. Установите в качестве **источника** полный поддомен FleetKey (например)`https://abc123.fleetkey.net` )
3. Установить **URL-адрес перенаправления** на`https://auth.tesla.com/void/callback`
4. Скопируйте **идентификатор клиента (Client ID)** и **секретный ключ клиента (Client Secret)** из созданного приложения и введите их ниже вместе с вашим доменом FleetKey (например,`abc123.fleetkey.net` )

#### Шаг 3: Аутентификация (OAuth2)

1. Нажмите **«Сгенерировать ссылку для авторизации»** — откроется новая вкладка браузера со страницей входа в систему Tesla.
2. Войдите в систему, используя свою учетную запись Tesla, и авторизуйте приложение.
3. После входа в систему вы увидите сообщение «Страница не найдена» — это нормально! Скопируйте полный URL-адрес из адресной строки браузера.
4. Вставьте URL-адрес в поле «Код URL» и нажмите **«Сохранить и закрыть».**

**Внимание:** Никогда никому не передавайте этот URL-адрес! Он предоставляет доступ к вашей учетной записи Tesla.

#### Повторная авторизация после изменения области действия Tesla.

Если вы позже добавите или измените области действия в приложении Tesla Developer, существующий токен обновления не получит эти разрешения автоматически. Сначала сбросьте сохраненную сессию Fleet, а затем снова запустите процесс OAuth:

1. Включите **функцию сброса информации для входа/токена** в настройках адаптера.
2. Сохраните и закройте настройки. Адаптер удалит сохраненную сессию Fleet и URL-адрес кода и перезапустится.
3. Снова откройте настройки, сгенерируйте новую ссылку аутентификации и авторизуйте Tesla с необходимыми правами доступа.
4. Вставьте новый URL-адрес обратного вызова в **поле "URL-адрес кода"** и снова сохраните.

Новый URL-адрес обратного вызова, отправленный без сброса сохраненной сессии, игнорируется, в то время как старая сессия может быть обновлена.

#### Шаг 4: Установка виртуального ключа

Виртуальный ключ необходим для отправки команд вашему автомобилю (блокировка/разблокировка, климат-контроль, зарядка и т. д.). Без него вы сможете только считывать данные об автомобиле. Этот шаг можно выполнить после запуска адаптера.

1. Откройте URL-адрес виртуального ключа, указанный в настройках адаптера на вашем телефоне (или отсканируйте QR-код).
2. Приложение Tesla запросит подтверждение добавления «ключа стороннего производителя».
3. Подойдите к своему автомобилю и приложите ключ-карту к центральной консоли, чтобы подтвердить установку.

### Удаленные команды

Удаленные команды доступны в разделе`tesla-motors.0.<VIN>.remote` .

Поддерживаемые команды включают:

- **Блокировка/Разблокировка** :`door_lock` ,`door_unlock`
- **Климат** :`auto_conditioning_start` ,`auto_conditioning_stop` ,`set_temps` ,`set_preconditioning_max` ,`remote_seat_heater_request` ,`remote_auto_seat_climate_request` ,`remote_steering_wheel_heater_request`
- **Зарядка** :`charge_start` ,`charge_stop` ,`set_charge_limit` ,`set_charging_amps` ,`charge_port_door_open` ,`charge_port_door_close` ,`set_scheduled_charging`
- **Ствол** :`actuate_trunk` (передняя/задняя)
- **Windows** :`window_control` (вентиляция/закрытие)
- **Безопасность** :`set_sentry_mode` ,`remote_start_drive`
- **СМИ** :`media_toggle_playback` ,`media_next_track` ,`media_prev_track`
- **Другой** :`flash_lights` ,`honk_horn` ,`trigger_homelink` ,`schedule_software_update`

Управление сиденьями и рулевым колесом в зависимости от климат-контроля, включая`remote_auto_seat_climate_request` Для этого требуется активная предварительная подготовка или Climate Keeper. Начните с создания благоприятного климата.`auto_conditioning_start` (или включите Climate Keeper) перед отправкой этих команд. Если климат-контроль отключен, Tesla отклоняет команду.`cabin comfort remote settings not enabled` .

### Описание поля

- df: передняя часть водителя
- dr: водитель сзади
- пф: передняя пассажирская сторона
- pr: пассажирская задняя
- футов: передний багажник
- rt: задний багажник

### Технические характеристики

- **Fleet API** : региональные конечные точки (ЕС/Северная Америка/Китай) с автоматическим определением региона по токену JWT.
- **Подписание команд** : ECDSA P-256 + HMAC-SHA256 через protobuf (протокол управления транспортными средствами)
- **Два домена** : DOMAIN\_INFOTAINMENT (климат, зарядка, мультимедиа) и DOMAIN\_VEHICLE\_SECURITY (блокировка, разблокировка, багажник).
- **Управление сессиями** : рукопожатие ECDH для каждого домена, на основе эпох и счетчика, хранится в состоянии ioBroker.
- **Обновление токена** : автоматическое обновление перед истечением срока действия.

### Примечания по административному интерфейсу и миграции

Настройки адаптера используют ioBroker.`jsonConfig` Административный интерфейс. Существующие экземпляры адаптера сохраняют свою конфигурацию, но страница настроек была реорганизована, чтобы упростить настройку Fleet API, моста Fleet Telemetry и выбор полей.

При обновлении с более старой версии 2.x, пожалуйста, откройте настройки адаптера и проверьте учетные данные Fleet API, домен виртуального ключа и дополнительные параметры Fleet Telemetry, прежде чем начинать настройку Fleet Telemetry.

### Дополнительный режим телеметрии флота (мост MQTT)

Начиная с миграции на Fleet API, адаптер также можно использовать совместно со службой **телеметрии автопарка** Tesla для сокращения...`vehicle_data` Расходы на опрос. Телеметрия флота является необязательной. Если она отключена, адаптер сохраняет существующее поведение опроса без изменений.

В первом варианте используется **мост MQTT** , и приемник Fleet Telemetry намеренно размещен вне адаптера:

1. Автомобили Tesla передают телеметрические данные на собственный сервер [телеметрии автопарка](https://github.com/teslamotors/fleet-telemetry) .
2. Сервер публикует выбранные поля, относящиеся к транспортному средству, в протокол MQTT.
3. Адаптер подписывается на темы MQTT и записывает данные обратно в существующее дерево состояний Tesla.

Это позволяет сохранить работоспособность существующих скриптов и псевдонимов, одновременно сокращая количество регулярных обращений.`vehicle_data` запросы.

Для получения практического, удобного для начинающих руководства по настройке Docker Compose, сертификатов, сквозной передачи TCP, параметров адаптера и устранения неполадок см. [файл docs/fleet-telemetry-setup.md](/#/docs/adapterref/iobroker.tesla-motors/docs/fleet-telemetry-setup.md) .

#### Требования

- Доступный сервер телеметрии автопарка Tesla с`transmit_decoded_records=true` .
- MQTT-брокер, доступный для хоста ioBroker.
- Локальный прокси [-сервер для управления транспортными средствами,](https://github.com/teslamotors/vehicle-command) используемый для конфигурационных вызовов системы Fleet Telemetry.
- Цепочка сертификатов сервера/центра сертификации для общедоступной конечной точки Fleet Telemetry.
- Транспортное средство с поддержкой системы Fleet Telemetry и сопряженным виртуальным ключом.

Сервер Fleet Telemetry должен быть доступен для транспортного средства по настроенному общедоступному хосту и порту. Во многих системах для этого требуется сквозная передача TCP-трафика вместо обычного обратного прокси-сервера HTTPS, поскольку Tesla подключается напрямую к серверу Fleet Telemetry.

Дополнительные настройки адаптера доступны для:

- включение режима телеметрии
- местный`vehicle-command` URL-адрес прокси-сервера, используемый для настройки телеметрии в автомобиле.
- имя хоста/порт/цепочка сертификатов сервера телеметрии
- Брокер MQTT, база тем и учетные данные
- Выбор полей системы Fleet Telemetry и выбор полей для каждого поля отдельно.`interval_seconds` / необязательный`minimum_delta`
- Дополнительная периодическая синхронизация Fleet API для данных, не охватываемых телеметрией.

#### Настройка адаптера

1. Запустите и откройте сервер Fleet Telemetry.
2. Настройте хранилище данных MQTT для публикации декодированных записей в ваш MQTT-брокер.
3. Запустите`vehicle-command` Прокси-сервер находится в той же доверенной сети, что и ioBroker.
4. Настройте параметры адаптера:
   - включить **режим телеметрии флота**
   - войти`vehicle-command` URL прокси
   - Введите общедоступное имя хоста Fleet Telemetry, порт и CA/fullchain PEM.
   - Введите MQTT-брокер, необязательные учетные данные и базу тем.
5. На вкладке **«Поля телеметрии флота»** выберите необходимые поля, интервалы и необязательные минимальные значения разницы.
6. Для начала воспользуйтесь действием администратора **«Проверить состояние автопарка»** .
7. Используйте **функцию «Настроить телеметрию автопарка»** , чтобы отправить конфигурацию на транспортное средство.
8. Используйте **функцию «Чтение конфигурации автопарка»** , чтобы убедиться, что транспортное средство сообщает о синхронизации конфигурации.

Действия администратора позволяют выявить распространенные причины ошибок, такие как отсутствие виртуальных ключей, неподдерживаемая прошивка, отключенная потоковая передача или превышение лимитов конфигурации телеметрии флота.

#### формат темы MQTT

Адаптер подписывается на базовую тему MQTT, настроенную в административном интерфейсе. При использовании базовой темы по умолчанию.`tesla-telemetry` Ожидаемые темы:

- `tesla-telemetry/<VIN>/v/<FieldName>` для значений телеметрии
- `tesla-telemetry/<VIN>/connectivity` для мероприятий по обеспечению связи
- `tesla-telemetry/<VIN>/errors/<Type>` для ошибок телеметрии
- `tesla-telemetry/<VIN>/alerts/<Type>/current` для получения текущих оповещений

Административный интерфейс содержит специальную вкладку **с полями телеметрии автопарка** . Каталог полей Tesla разбит на сворачиваемые группы категорий, поэтому на странице администратора одновременно отображаются/открываются только небольшие разделы. Там вы можете включать/отключать отдельные поля телеметрии Tesla и устанавливать интервал обновления в секундах для каждого поля. (Дополнительно)`minimum_delta` Значения для числовых полей можно настроить там, где это поддерживает Tesla. Если поле оставлено пустым и в административном интерфейсе отображается заглушка, адаптер использует это значение по умолчанию при формировании конфигурации автомобиля.`Location` ,`OriginLocation` и`DestinationLocation` Тесла интерпретирует`minimum_delta` в метрах, поэтому используется значение по умолчанию.`100 m` приблизительно совпадает`0.001°` Широта/долгота и позволяет избежать незначительных колебаний GPS-сигнала. Для распространенных полей, таких как процентное значение, дальность, скорость, температура, ток, напряжение, мощность и энергия, предусмотрены другие полезные значения по умолчанию. Поля, уже сопоставленные адаптером, записываются обратно в существующее дерево состояний Tesla. Другие выбранные поля хранятся в виде необработанных значений.`<VIN>.telemetry.fields.<FieldName>` поэтому скрипты по-прежнему смогут их использовать.

В настоящее время сопоставленные поля включают наиболее часто используемые состояния зарядки, батареи, положения и блокировки:

- `Soc` ->`charge_state.battery_level`
- `ChargeState` ->`charge_state.telemetry_charge_state`
- `DetailedChargeState` ->`charge_state.charging_state` и`charge_state.detailed_charge_state`
- `ChargeLimitSoc` ->`charge_state.charge_limit_soc`
- `ChargeAmps` ->`charge_state.charge_amps` и`charge_state.charger_actual_current`
- `ChargeCurrentRequest`->`charge_state.charge_current_request`
- `ChargeCurrentRequestMax` ->`charge_state.charge_current_request_max`
- `ChargingCableType` ->`charge_state.conn_charge_cable`
- `ChargePortDoorOpen` ->`charge_state.charge_port_door_open`
- `EstBatteryRange` ->`charge_state.est_battery_range`
- `VehicleSpeed` ->`drive_state.speed`
- `Gear` ->`drive_state.shift_state`
- `Location` ->`drive_state.latitude` и`drive_state.longitude`
- `Locked` ->`vehicle_state.locked`
- `Odometer` ->`vehicle_state.odometer`
- `VehicleName` ->`vehicle_state.vehicle_name`

Внутри системы выбранные значения хранятся в формате JSON для обеспечения обратной совместимости со старыми версиями административной панели. Значения JSON, заданные вручную, могут представлять собой обычные секунды или полные параметры полей Tesla:

```json
{
  "Soc": { "interval_seconds": 1, "minimum_delta": 1 },
  "ChargeState": 1,
  "DetailedChargeState": 1,
  "ChargeAmps": 1,
  "Location": { "interval_seconds": 10, "minimum_delta": 100 },
  "Locked": 1
}
```

Система Fleet Telemetry основана на изменениях: поле генерируется только после того, как оно...`interval_seconds` Прошло время, **и** значение изменилось. Там, где это настроено,`minimum_delta` Кроме того, подавляется обработка небольших изменений числовых значений до их отправки. Поэтому в настройках по умолчанию используется`Soc` с`interval_seconds=1` и`minimum_delta=1` Таким образом, обновления уровня заряда батареи отображаются быстро, но только после изменения хотя бы одного процентного пункта. Установка поля в`false` исключает его из конфигурации транспортного средства.

При включении режима телеметрии в качестве основного источника данных в реальном времени используется Fleet Telemetry. Дополнительная периодическая синхронизация Fleet API по-прежнему осуществляет обычный опрос.`vehicle_data` Установите интервал обновления конечных точек в соответствии с заданным **стандартным интервалом обновления** , чтобы состояния, не охватываемые выбранными полями телеметрии, продолжали обновляться. Установите стандартный интервал обновления на`0` Чтобы полностью отключить эту запланированную синхронизацию Fleet API. Разделенный запятыми список исключений также применяется к периодическому опросу синхронизации API и может содержать`vehicle_data` конечные точки, такие как`charge_state` ,`climate_state` ,`drive_state` ,`vehicle_state` ,`vehicle_config` ,`location_data` и выделенные конечные точки, такие как`charge_history` .

Диагностические состояния доступны в разделе`tesla-motors.0.info.*` :

- `telemetryConnected`
- `telemetryConfigured`
- `telemetrySynced`
- `telemetryLastMessage`
- `telemetryLastError`
- `telemetryLastApiSync`
- `telemetryLastVehicleDataSync`
- `telemetryLastChargeHistorySync`

### Вопросы и дискуссии

<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**

### 3.2.2 (2026-07-27)

- (TA2k) fix QR Code generation

### 3.2.1 (2026-06-05)

- (ChrMaass) Update the release tooling dependency to satisfy the ioBroker repository checker.

### 3.2.0 (2026-06-01)

- (ChrMaass) Reduce routine Fleet API polling log noise by moving frequent vehicle state and vehicle_data messages to debug while keeping anomalies as warnings.

### 3.1.1 (2026-06-01)

- (ChrMaass) Clarify Tesla OAuth re-authorization after scope changes and log missing-scope errors with a reset hint.

### 3.1.0 (2026-05-31)

- (ChrMaass) Support the normal Fleet command endpoint for vehicles that do not support or do not require the Tesla Vehicle Command Protocol.

### 3.0.1 (2026-05-31)

- (ChrMaass) Fix the Sentry README notice to match the repository checker standard wording.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 iobroker-community

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