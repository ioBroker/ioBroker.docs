---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: ic2xztq3rX24UELsVZ/w+vk71x5uNctv7vzyjQB9ZQc=
---
![Логотип](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Количество установок (последние)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/tesla-motors-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![НПМ](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Адаптер Tesla для ioBroker
Все автомобили Tesla и устройства Powerwall, отображаемые в приложении Tesla, обновляются через официальный **API Tesla Fleet**.

Команды управления автомобилем (блокировка, разблокировка, климат-контроль, зарядка и т. д.) поддерживаются для всех моделей, включая автомобили, выпущенные после 2021 года, для которых требуется **сквозная подпись команд** (протокол управления автомобилем).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

### Требования
- Аккаунт Tesla, связанный с транспортными средствами или энергетической продукцией.
- Node.js >= 22
- Зарегистрированное приложение Tesla Fleet API (идентификатор клиента + секретный ключ клиента) от [developer.tesla.com](https://developer.tesla.com)
- Домен Fleet Key (для установки виртуального ключа на транспортное средство)

### Настройка (пошагово)
Административный интерфейс адаптера проведет вас через 4 шага:

#### Шаг 1: Сгенерируйте пару ключей
1. В настройках адаптера нажмите кнопку **Создать пару ключей**, чтобы создать пару ключей EC (prime256v1).
2. Нажмите **Скопировать открытый ключ** и перейдите на [fleetkey.net](https://fleetkey.net) - вставьте его в поле "Открытый ключ хоста" и создайте поддомен (например, `abc123.fleetkey.net`).
3. После сохранения FleetKey.net разместит ваш открытый ключ. Tesla загрузит ключ оттуда во время регистрации.

#### Шаг 2: Приложение Tesla для разработчиков
1. Создайте приложение Fleet API на сайте [developer.tesla.com](https://developer.tesla.com/request)
2. Установите **Origin** на полный поддомен FleetKey (например, `https://abc123.fleetkey.net`).
3. Установите **URL перенаправления** на `https://auth.tesla.com/void/callback`
4. Скопируйте **Идентификатор клиента** и **Секретный ключ клиента** из созданного приложения и введите их ниже вместе с вашим доменом FleetKey (например, `abc123.fleetkey.net`).

#### Шаг 3: Аутентификация (OAuth2)
1. Нажмите **Сгенерировать ссылку для авторизации** — откроется новая вкладка браузера со страницей входа в Tesla.
2. Войдите в свою учетную запись Tesla и авторизуйте приложение.
3. После входа в систему вы увидите сообщение «Страница не найдена» — это нормально! Скопируйте полный URL-адрес из адресной строки браузера.
4. Вставьте URL-адрес в поле «Код URL» и нажмите **Сохранить и закрыть**.

**Внимание:** Никогда никому не делитесь этой ссылкой! Она предоставляет доступ к вашей учетной записи Tesla.

#### Повторная авторизация после изменения области действия Tesla
Если вы позже добавите или измените области действия в приложении Tesla Developer, существующий токен обновления не получит эти разрешения автоматически. Сначала сбросьте сохраненную сессию Fleet, а затем снова запустите процесс OAuth:

1. Включите опцию **Сброс информации для входа/токена** в настройках адаптера.
2. Сохраните и закройте настройки. Адаптер удалит сохраненный парк.

Сессия, URL-адрес кода и перезапуски.

3. Снова откройте настройки, сгенерируйте новую ссылку авторизации и авторизуйте Tesla.

требуемые объемы работ.

4. Вставьте новый URL-адрес обратного вызова в поле **URL-адрес кода** и снова сохраните.

Новый URL-адрес обратного вызова, отправленный без сброса сохраненной сессии, игнорируется, в то время как старая сессия может быть обновлена.

#### Шаг 4: Установка виртуального ключа
Виртуальный ключ необходим для отправки команд вашему автомобилю (блокировка/разблокировка, климат-контроль, зарядка и т. д.). Без него вы сможете только считывать данные об автомобиле. Этот шаг можно выполнить после запуска адаптера.

1. Откройте URL-адрес виртуального ключа, указанный в настройках адаптера на вашем телефоне (или отсканируйте QR-код).
2. Приложение Tesla попросит вас подтвердить добавление «ключа стороннего производителя».
3. Подойдите к своему автомобилю и приложите ключ-карту к центральной консоли, чтобы подтвердить установку.

### Удаленные команды
Удаленные команды доступны в разделе `tesla-motors.0.<VIN>.remote`.

Поддерживаемые команды включают:

- **Заблокировать/Разблокировать**: `door_lock`, `door_unlock`
- **Климат**: `auto_conditioning_start`, `auto_conditioning_stop`, `set_temps`, `set_preconditioning_max`, `remote_seat_heater_request`, `remote_auto_seat_climate_request`, `remote_steering_wheel_heater_request`
- **Зарядка**: `charge_start`, `charge_stop`, `set_charge_limit`, `set_charging_amps`, `charge_port_door_open`, `charge_port_door_close`, `set_scheduled_charging`
- **Багажник**: `actuate_trunk` (передний/задний)
- **Windows**: `window_control` (вентиляция/закрытие)
- **Безопасность**: `set_sentry_mode`, `remote_start_drive`
- **Медиа**: `media_toggle_playback`, `media_next_track`, `media_prev_track`
- **Другое**: `flash_lights`, `honk_horn`, `trigger_homelink`, `schedule_software_update`

Команды управления сиденьями и рулевым колесом, зависящие от климат-контроля, включая `remote_auto_seat_climate_request`, требуют активного предварительного прогрева или использования системы Climate Keeper. Перед отправкой этих команд сначала запустите климат-контроль с помощью `auto_conditioning_start` (или включите Climate Keeper). Если климат-контроль выключен, Tesla отклонит команду с помощью `cabin comfort remote settings not enabled`.

### Описание поля
- df: передняя часть водителя
- dr: задняя часть водителя
- пф: передняя пассажирская сторона
- pr: пассажирская задняя часть
- футов: передний багажник
- rt: задний багажник

### Технические характеристики
- **Fleet API**: Региональные конечные точки (ЕС/Северная Америка/Китай) с автоматическим определением региона по токену JWT.
- **Подписание команд**: ECDSA P-256 + HMAC-SHA256 через protobuf (протокол управления транспортными средствами)
- **Два домена**: DOMAIN_INFOTAINMENT (климат, зарядка, мультимедиа) и DOMAIN_VEHICLE_SECURITY (блокировка, разблокировка, багажник)
- **Управление сессиями**: рукопожатие ECDH для каждого домена, на основе эпох и счетчика, хранится в состоянии ioBroker.
- **Обновление токена**: автоматическое обновление перед истечением срока действия.

### Примечания по административному интерфейсу и миграции
Настройки адаптера используют административный интерфейс ioBroker `jsonConfig`. Существующие экземпляры адаптера сохраняют свою конфигурацию, но страница настроек была реорганизована, чтобы упростить настройку Fleet API, моста Fleet Telemetry и выбор полей.

При обновлении с более старой версии 2.x, пожалуйста, откройте настройки адаптера и проверьте учетные данные Fleet API, домен виртуального ключа и дополнительные параметры Fleet Telemetry, прежде чем начинать настройку Fleet Telemetry.

### Дополнительный режим телеметрии флота (мост MQTT)
Начиная с миграции на Fleet API, адаптер также можно использовать совместно с сервисом Tesla **Fleet Telemetry** для снижения затрат на опрос `vehicle_data`.
Fleet Telemetry является необязательным. Если он отключен, адаптер сохраняет существующее поведение опроса без изменений.

В первом варианте используется **мост MQTT**, и приемник телеметрии флота намеренно размещен вне адаптера:

1. Автомобили Tesla передают телеметрию на собственное хостинговое устройство.

[телеметрия флота](https://github.com/teslamotors/fleet-telemetry) сервер.

2. Сервер публикует выбранные поля данных транспортного средства в протокол MQTT.
3. Адаптер подписывается на темы MQTT и записывает данные обратно в устройство.

существующее дерево состояний Теслы.

Это позволяет сохранить работоспособность существующих скриптов и псевдонимов, одновременно уменьшая количество регулярных запросов `vehicle_data`.

Практическое, простое для начинающих руководство по настройке Docker Compose, сертификатов, сквозной передачи TCP, параметров адаптера и устранению неполадок см. в [docs/fleet-telemetry-setup.md](docs/fleet-telemetry-setup.md).

#### Требования
— Доступный сервер телеметрии автопарка Tesla с

`transmit_decoded_records=true`.

- MQTT-брокер, доступный для хоста ioBroker.
- Местный

[команда транспортного средства](https://github.com/teslamotors/vehicle-command) прокси для вызовов конфигурации телеметрии флота.

- Серверная цепочка сертификатов/центров сертификации для общедоступной конечной точки Fleet Telemetry.
- Транспортное средство с поддержкой системы Fleet Telemetry и сопряженным виртуальным ключом.

Сервер Fleet Telemetry должен быть доступен для транспортного средства по настроенному общедоступному хосту и порту. Во многих системах для этого требуется сквозная передача TCP-трафика вместо обычного обратного прокси-сервера HTTPS, поскольку Tesla подключается напрямую к серверу Fleet Telemetry.

Дополнительные настройки адаптера доступны для:

- включение режима телеметрии
- локальный URL-адрес прокси-сервера `vehicle-command`, используемый для настройки телеметрии в автомобиле.
- имя хоста/порт/цепочка сертификатов сервера телеметрии
- Брокер MQTT, база тем и учетные данные
- выбор полей телеметрии флота и параметр `interval_seconds` для каждого поля /

необязательный `minimum_delta`

- Дополнительная периодическая синхронизация Fleet API для данных, не охватываемых телеметрией.

#### Настройка адаптера
1. Запустите и откройте сервер Fleet Telemetry.
2. Настройте хранилище данных MQTT для публикации декодированных записей в ваш брокер MQTT.
3. Запустите прокси-сервер `vehicle-command` в той же доверенной сети, что и ioBroker.
4. Настройте параметры адаптера:
- включить **режим телеметрии флота**
- введите URL-адрес прокси-сервера `vehicle-command`
- Введите общедоступное имя хоста Fleet Telemetry, порт и CA/fullchain PEM.
- Введите MQTT-брокер, необязательные учетные данные и базовую тему.
5. Выберите необходимые поля, интервалы и, при необходимости, минимальные значения разницы.

Вкладка **Поля телеметрии флота**.

6. В первую очередь используйте действие администратора **Проверить состояние флота**.
7. Используйте **Настройка телеметрии автопарка** для отправки конфигурации на транспортное средство.
8. Используйте **Чтение конфигурации автопарка**, чтобы убедиться, что транспортное средство сообщает следующее.

Конфигурация синхронизирована.

Действия администратора позволяют выявить распространенные причины ошибок, такие как отсутствие виртуальных ключей, неподдерживаемая прошивка, отключенная потоковая передача или превышение лимитов конфигурации телеметрии флота.

#### Формат темы MQTT
Адаптер подписывается на базовый набор тем MQTT, настроенный в административном интерфейсе. При использовании базового набора тем по умолчанию `tesla-telemetry` ожидаемые темы:

- `tesla-telemetry/<VIN>/v/<FieldName>` для значений телеметрии
- `tesla-telemetry/<VIN>/connectivity` для событий, связанных с подключением.
- `tesla-telemetry/<VIN>/errors/<Type>` для ошибок телеметрии
- `tesla-telemetry/<VIN>/alerts/<Type>/current` для получения информации о текущих оповещениях.

Административный интерфейс содержит специальную вкладку «Поля телеметрии автопарка». Каталог полей Tesla разделен на сворачиваемые группы категорий, поэтому на странице администратора одновременно отображаются/открываются только небольшие разделы. Там можно включать/отключать отдельные поля телеметрии Tesla и устанавливать интервал обновления в секундах для каждого поля. Для числовых полей, поддерживаемых Tesla, можно настроить дополнительные значения `minimum_delta`. Если поле оставлено пустым и в административном интерфейсе отображается заполнитель, адаптер использует это значение по умолчанию при построении конфигурации автомобиля. Для `Location`, `OriginLocation` и `DestinationLocation` Tesla интерпретирует `minimum_delta` в метрах, поэтому значение по умолчанию `100 m` приблизительно соответствует `0.001°` широте/долготе и позволяет избежать небольших колебаний GPS-сигнала. Для распространенных полей, таких как процентное значение, диапазон, скорость, температура, ток, напряжение, мощность и энергия, предусмотрены и другие полезные значения по умолчанию. Поля, уже сопоставленные адаптером, записываются обратно в существующее дерево состояний Tesla. Другие выбранные поля хранятся в виде необработанных значений в разделе `<VIN>.telemetry.fields.<FieldName>`, поэтому скрипты могут продолжать их использовать.

В настоящее время сопоставленные поля включают наиболее часто используемые состояния зарядки, батареи, положения и блокировки:

- `Soc` -> `charge_state.battery_level`
- `ChargeState` -> `charge_state.telemetry_charge_state`
- `DetailedChargeState` -> `charge_state.charging_state` и

`charge_state.detailed_charge_state`

- `ChargeLimitSoc` -> `charge_state.charge_limit_soc`
- `ChargeAmps` -> `charge_state.charge_amps` и

`charge_state.charger_actual_current`

- `ChargeCurrentRequest` -> `charge_state.charge_current_request`
- `ChargeCurrentRequestMax` -> `charge_state.charge_current_request_max`
- `ChargingCableType` -> `charge_state.conn_charge_cable`
- `ChargePortDoorOpen` -> `charge_state.charge_port_door_open`
- `EstBatteryRange` -> `charge_state.est_battery_range`
- `VehicleSpeed` -> `drive_state.speed`
- `Передача` -> `состояние_привода.состояние_переключения`
- `Местоположение` -> `drive_state.latitude` и `drive_state.longitude`
- `Заблокировано` -> `vehicle_state.locked`
- `Одометр` -> `vehicle_state.odometer`
- `VehicleName` -> `vehicle_state.vehicle_name`

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

Система телеметрии автопарка работает по принципу отслеживания изменений: поле отправляется только после истечения `interval_seconds` и изменения его значения. При наличии соответствующей настройки `minimum_delta` дополнительно подавляет меньшие изменения числовых значений перед их отправкой. Поэтому в настройках по умолчанию используется `Soc` с `interval_seconds=1` и `minimum_delta=1`, поэтому обновления уровня заряда батареи отправляются быстро, но только после изменения хотя бы на один процентный пункт. Установка значения `false` исключает поле из конфигурации транспортного средства.

Когда включен режим телеметрии, в качестве основного источника данных в реальном времени используется Fleet Telemetry. Дополнительная периодическая синхронизация Fleet API по-прежнему опрашивает обычные конечные точки `vehicle_data` с заданным **нормальным интервалом обновления**, поэтому состояния, не охватываемые выбранными полями телеметрии, продолжают обновляться. Установите нормальный интервал обновления на `0`, чтобы полностью отключить эту запланированную синхронизацию Fleet API. Разделенный запятыми список исключений также применяется к периодическому опросу синхронизации API и может содержать конечные точки `vehicle_data`, такие как `charge_state`, `climate_state`, `drive_state`, `vehicle_state`, `vehicle_config`, `location_data`, а также выделенные конечные точки, такие как `charge_history`.

Диагностические состояния доступны в разделе `tesla-motors.0.info.*`:

- `telemetryConnected`
- `telemetryConfigured`
- `telemetrySynced`
- `telemetryLastMessage`
- `telemetryLastError`
- `telemetryLastApiSync`
- `telemetryLastVehicleDataSync`
- `telemetryLastChargeHistorySync`

### Вопросы и обсуждения
<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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