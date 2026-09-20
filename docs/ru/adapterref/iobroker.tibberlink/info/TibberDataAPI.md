---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/info/TibberDataAPI.md
title: API данных Tibber - заметки об исследованиях
hash: 4ni1PJ1CRZ+JKsfkitP3m0zq4l4oIfgD8tYtZs8UNT8=
---
# API данных Tibber — заметки об исследованиях

Справочные материалы по интеграции транспортного средства и зарядного устройства в[`src/lib/tibberDataAPI.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberDataAPI.ts) Данные взяты из официальной документации и интерактивной среды разработки (полная схема недоступна без авторизации, поэтому приведенные ниже примеры устройств взяты из реального отладочного вывода адаптера).

## Два API для Tibber (они разделены!)

| API                           | Хозяин                                                                                               | Цель                                                                                                     | Авторизация            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Разработчик / GraphQL API** | `api.tibber.com` (документация: [developer.tibber.com](https://developer.tibber.com) )               | Цены на энергоносители, история потребления, прямая трансляция Pulse.                                    | Персональный API-токен |
| **API данных**                | `data-api.tibber.com` (документация: [data-api.tibber.com/docs](https://data-api.tibber.com/docs/) ) | Данные с IoT-устройств: транспортные средства, зарядные устройства, тепловые насосы, инверторы, батареи. | Клиент OAuth2 (PKCE)   |

API для разработчиков/GraphQL **не** предоставляет доступ к данным о зарядных устройствах/транспортных средствах — это исключительно функция API для работы с данными.

## Полезные ссылки

- Обзор документации: <https://data-api.tibber.com/docs/>
- Начните работу: <https://data-api.tibber.com/docs/get-started/>
- Аутентификация: <https://data-api.tibber.com/docs/auth/>
- Области видимости: <https://data-api.tibber.com/docs/scopes/>
- Управление клиентами (создание идентификатора/секрета клиента): <https://data-api.tibber.com/clients/manage/>
- Поддерживаемые устройства: <https://data-api.tibber.com/docs/devices/supported/>
- Прямые трансляции событий: <https://data-api.tibber.com/docs/devices/live-events/>
- История изменений устройства: <https://data-api.tibber.com/docs/devices/device-history/>
- Ограничение скорости запросов: <https://data-api.tibber.com/docs/api-usage/rate-limiting/>
- Интерактивная площадка: <https://data-api.tibber.com/playground/>

## Аутентификация (OAuth2 PKCE)

- Авторизация URL: `https://thewall.tibber.com/connect/authorize`
- URL токена: `https://thewall.tibber.com/connect/token`
- URI перенаправления, используемый адаптером: `http://localhost/` (Должно точно соответствовать конфигурации клиента, с завершающей косой чертой)
- Запрашиваемые объемы работ: `openid offline_access data-api-homes-read data-api-vehicles-read data-api-chargers-read`
- Адаптер использует фиксированную пару верификатор/проверка PKCE (безопасность обеспечивается секретным ключом клиента); токен обновления сохраняется в состоянии. `info.tibberDataApiRefreshToken`.

## Конечные точки, используемые адаптером.

База: `https://data-api.tibber.com/v1`

| Метод    | Путь                                 | Примечания                                                                                   |
| -------- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| ПОЛУЧАТЬ | `/homes`                             | Список домов (может возвращать массив или `{ homes: [...] }`).                               |
| ПОЛУЧАТЬ | `/homes/{homeId}/devices`            | **Список** устройств — только основная информация, **без описания возможностей** .           |
| ПОЛУЧАТЬ | `/homes/{homeId}/devices/{deviceId}` | **Подробная информация** об устройстве — включает в себя: `capabilities` (реальные значения). |

> Перемещаемые устройства, такие как электромобили, включены в список **всех** домов пользователя. Поскольку конечная точка списка не обладает необходимыми возможностями, адаптер должен обращаться к конечной точке сведений для каждого устройства, чтобы считывать значения и классифицировать тип устройства.

## Схема устройства (из тестовой среды)

### `GET /v1/homes/{homeId}/devices` (список)

```json
{
  "devices": [
    {
      "id": "string",
      "externalId": "string",
      "info": { "name": "string", "brand": "string", "model": "string" },
      "supportedHistory": { "resolutions": [], "maxRetentionDays": 1 }
    }
  ]
}
```

### `GET /v1/homes/{homeId}/devices/{deviceId}` (подробности)

```json
{
  "id": "string",
  "externalId": "string",
  "info": { "name": "string", "brand": "string", "model": "string" },
  "supportedHistory": { "resolutions": [], "maxRetentionDays": 1 },
  "status": { "lastSeen": "2026-07-30T06:25:23.770Z" },
  "attributes": [
    { "id": "string", "status": "string", "ssid": "string", "bssid": "string", "ipAddress": "string" }
  ],
  "capabilities": [
    { "id": "string", "description": "string", "value": "...", "unit": "string", "availableValues": ["..."] }
  ]
}
```

Полевые заметки:

- `info.name` и `info.brand` **требуются** ; `info.model` является необязательным (значения, предполагающие наилучшие результаты).
- `externalId` = внешний идентификатор третьей стороны (для устройства Pulse это часто QR-код); `id` — это общедоступный идентификатор, существующий только в этом API.
- `status.lastSeen` = метка времени, когда устройство в последний раз было обнаружено Tibber (записывается адаптером как `LastSeen`).
- `attributes[]` = информация о подключении (SSID/BSSID Wi-Fi, IP-адрес и т. д.). В настоящее время адаптер не записывается.
- **Верхнего уровня нет. `type` /`category` Поле** — тип устройства необходимо определить по его возможностям (см. классификацию ниже).

## Категории устройств (согласно документации)

В настоящее время API данных предоставляет следующие возможности:

1. Транспортные средства (электромобили, подключаемые к сети OEM)
2. Зарядные устройства для электромобилей (EVSE)
3. Термостаты / климатические устройства (термостаты, тепловые насосы, обогреватели)
4. Солнечные инверторы (показатели выработки электроэнергии)
5. Домашние аккумуляторные батареи / гибридные энергетические системы
6. Устаревшие инверторы

> В документации прямо указано: _«Могут появиться новые категории без существенных изменений»_ и рекомендуется _«обрабатывать неизвестные атрибуты/возможности с осторожностью»._ Именно поэтому адаптер записывает возможности зарядного устройства в общем виде и **пропускает** типы устройств, которые он явно не распознает.

## Примеры работы (реальный отладочный вывод)

### Автомобиль — BMW i3

```json
[
  { "id": "storage.stateOfCharge",       "description": "state of charge",                 "value": 0,   "unit": "%" },
  { "id": "storage.targetStateOfCharge", "description": "target state of charge",           "value": 100, "unit": "%" },
  { "id": "range.remaining",             "description": "estimated remaining driving range","value": 0,   "unit": "m" },
  { "id": "connector.status",            "description": "vehicle plug status",              "value": "unknown", "availableValues": ["connected","disconnected","unknown"] },
  { "id": "charging.status",             "description": "vehicle charging status",          "value": "unknown", "availableValues": ["charging","idle","unknown"] }
]
```

### Зарядное устройство — go-e

```json
[
  { "id": "grid.phaseCount",                  "description": "number of phases being used for charging", "value": 1, "unit": "" },
  { "id": "connector.status",                 "description": "charger connector status",                 "value": "connected", "availableValues": ["connected","disconnected","unknown"] },
  { "id": "charging.status",                  "description": "charger charging status",                  "value": "idle",      "availableValues": ["charging","idle","unknown"] },
  { "id": "charging.current.max",             "description": "maximum allowed charge current",           "value": 8, "unit": "A" },
  { "id": "charging.current.offlineFallback", "description": "fallback current if charger goes offline", "value": 0, "unit": "A" }
]
```

Примечание: `range.remaining` указано в **метрах** (`m`) — адаптер преобразует это значение в километры для транспортных средств.

## Классификация устройств в адаптере

Поскольку устройства нет `type` В данной области классификация основана на возможностях и **носит позитивный характер** (не является всеобъемлющей):

| Тип                   | Обнаружено                                                         | Обоснование                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Транспортное средство | обладает возможностью `range.remaining`                             | Только у автомобиля есть дальность дальних заездов. `storage.stateOfCharge` Этот параметр **не** используется, поскольку домашние аккумуляторы/инверторы также сообщают об этом.                   |
| Зарядное устройство   | имеет идентификатор возможности, начинающийся с `charging.current.` | Только зарядное устройство для электромобилей контролирует ток заряда. `connector.status` /`charging.status` они используются совместно с транспортными средствами и, следовательно, недостаточны. |
| Что-нибудь еще        | —                                                                  | Преднамеренно пропущено (занесено в журнал отладки), чтобы в будущем можно было осознанно добавлять новые категории (инверторы, тепловые насосы, батареи).                                        |

Состояния зарядного устройства записываются в общем виде: одно состояние на каждую возможность, названное по очищенному идентификатору возможности (`charging.current.max` →`charging_current_max`), типизированный из значения (число / логическое значение / строка), с использованием предоставленного API. `description` как описание штата.