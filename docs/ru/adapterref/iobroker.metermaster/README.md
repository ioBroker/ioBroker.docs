---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.metermaster/README.md
title: ioBroker.metermaster
hash: heFYlUzT/xFzRnwAl9oKBq0HVuSDuFCUUeKG4xgvtGM=
---
![Логотип](../../../en/adapterref/iobroker.metermaster/admin/metermaster.svg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.metermaster.svg)
![Количество установок](https://iobroker.live/badges/metermaster-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/metermaster-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.metermaster.svg)
![НПМ](https://nodei.co/npm/iobroker.metermaster.png?downloads=true)

# ioBroker.metermaster

**Автоматически переносите показания счетчиков с телефона в ioBroker.**

MeterMaster — это мост между [Приложение MeterMaster для Android](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) и вашего умного дома. Записывайте показания счетчиков электроэнергии, газа, воды или тепла на своем смартфоне; адаптер сохраняет их в виде состояний ioBroker с правильными метками времени и полной историей — готовыми для скриптов, визуализаций и рабочих процессов выставления счетов.

Облачный аккаунт не требуется. Результаты гаданий остаются в вашей сети.

[![Скачайте в Google Play](https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster)

---

## Зачем нужен этот адаптер?

| Без MeterMaster                                         | С MeterMaster                                                   |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| Ввод данных вручную в ioBroker или электронные таблицы. | Одно касание в приложении → состояние обновлено                 |
| Предполагаемые временные метки                          | Состояние `ts` = дата реального чтения                          |
| Нет истории по каждому метру                            | Полный `readings.history` множество                             |
| Отдельные инструменты для диаграмм/CSV-файлов.          | Встроенный веб-интерфейс с диаграммами и возможностью экспорта. |

Типичные пользователи: домовладельцы, арендодатели и управляющие недвижимостью, которые уже считывают показания счетчиков на месте и хотят получать эти значения в ioBroker без повторного ввода.

---

## Быстрый старт

1. Установить **MeterMaster** Выберите адаптер из официального списка адаптеров ioBroker и создайте экземпляр.
2. Обратите внимание на HTTP-порт (по умолчанию). `8089`) и установите пароль для базовой аутентификации.
3. Установите [Приложение для Android](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) → **Настройки → ioBroker → Адаптер MeterMaster**.
4. Введите хост, порт, имя пользователя и пароль вашего ioBroker → **Проверить соединение**.
5. Запишите чтение в приложении — запись появится в разделе `metermaster.0.…` а также в веб-интерфейсе.

```
Android app  ──HTTP──►  MeterMaster adapter  ──►  ioBroker states + history + Web UI
```

Откройте веб-интерфейс в любое время по адресу: `http://{ioBroker-IP}:8089/` (Для просмотра пароль не требуется).

---

## Функции

- **HTTP-приемник** — Принимает показания из приложения MeterMaster для Android (по одному или пакетом)
- **Автоматические состояния** — Объекты дома/квартиры/счетчика создаются при первой синхронизации.
- **Правильные временные метки** — `readings.latest` использует фактическую дату чтения в качестве государственного документа. `ts`
- **Полная история** — каждый счетчик ведет учет `readings.history` JSON-массив
- **Базовая аутентификация** — Дополнительная защита по имени пользователя/паролю для точек записи
- **Встроенный веб-интерфейс** — Вкладки «Данные», «Импорт», «Журналы» и «Система» на немецком/английском языках.
- **Удалить через веб-интерфейс** — удалить квартиры/счетчики из ioBroker (подтвердите пароль)
- **Складные секции** — сложите блоки домов/квартир на вкладке «Данные».
- **Диаграммы и CSV-файлы** — Графики истории потребления, ежемесячное потребление и экспорт в формате CSV по счетчику.
- **Импорт резервной копии** — Восстановить резервные копии приложения MeterMaster (схема 2.0) с помощью перетаскивания.

Необязательный: [Узлы OLED-дисплеев ESP32](#optional-esp32-display-nodes) Может отображать выбранные значения показаний счетчика на небольшом дисплее.

---

## Приложение MeterMaster для Android

Адаптер представляет собой сторону ioBroker. [MeterMaster](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) — Приложение для Android, ориентированное на локальные решения, для учета коммунальных услуг.

- Управление недвижимостью, квартирами и счетчиками (электроэнергия, газ, вода, отопление, коммунальные услуги)
- Записывайте показания с указанием даты/времени и, при желании, фотографией.
- Диаграммы потребления и годовые счета / Экспорт в CSV / HTML
- Только локальное хранение — без облачного хранилища, без учетной записи, без отслеживания.
- Дополнительные интеграции: ioBroker (этот адаптер), MQTT, Google Sheets, InfluxDB.

|                                 |                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Google Play**                 | [MeterMaster](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) |
| **Исходный код и документация** | [MPunktBPunkt/MeterMaster](https://github.com/MPunktBPunkt/MeterMaster)                         |

---

## Скриншоты

| Данные — карты учета, KPI, история, графики и CSV-файлы. | Диаграмма — линейная временная ось и ежемесячное потребление  |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| ![Вкладка «Данные»](docs/screenshots/webui-daten.png)    | ![Модальное окно диаграммы](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-chart.png) |

| Импорт — резервное копирование приложения с помощью перетаскивания. | Журналы — фильтрация в реальном времени и экспорт     |
| ------------------------------------------------------------------- | ----------------------------------------------------- |
| ![Вкладка «Импорт»](docs/screenshots/webui-import.png)              | ![вкладка «Журналы»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-logs.png) |

| Система — статистика и проверка версии                  | Узлы — необязательный статус ESP32                  |
| ------------------------------------------------------- | --------------------------------------------------- |
| ![Вкладка «Система»](docs/screenshots/webui-system.png) | ![Вкладка «Узлы»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-nodes.png) |

---

## Установка

Установите адаптер из официального списка адаптеров ioBroker:

1. Открыть **Администратор ioBroker** → **Адаптеры**
2. Искать **MeterMaster**
3. Нажмите **Установить** и создать экземпляр

Из командной строки на хосте ioBroker:

```bash
iobroker add metermaster
iobroker start metermaster
```

Если приложение не может связаться с адаптером, откройте брандмауэр для настроенного порта, например. `sudo ufw allow 8089/tcp`.

Дополнительные примечания: [INSTALLATION.md](INSTALLATION.md)

---

## Конфигурация экземпляра

**Администрирование ioBroker → Адаптеры → MeterMaster → Настройки экземпляра**

| Параметр                   | По умолчанию  | Описание                                                       |
| -------------------------- | ------------- | -------------------------------------------------------------- |
| HTTP-порт                  | `8089`        | Порт, на котором адаптер прослушивает                          |
| Имя пользователя           | `metermaster` | Имя пользователя для базовой аутентификации                    |
| Пароль                     | –             | Пароль для базовой аутентификации (установите надежный пароль) |
| Подробная запись в журнале | включено      | Отображение отладочных записей в журнале событий.              |
| Буфер лога                 | `500`         | Максимальное количество сохраненных записей в журнале          |
| Сохраняйте историю         | `0`           | `0` = неограниченное количество показаний на метр              |

---

## Настройте приложение для Android.

**Настройки → ioBroker → Адаптер MeterMaster**

| Поле                 | Ценить                            |
| -------------------- | --------------------------------- |
| Включить ioBroker    | на                                |
| IP-адрес / имя хоста | IP-адрес сервера ioBroker         |
| Порт адаптера        | `8089` (или ваш настроенный порт) |
| Имя пользователя     | как в случае с адаптером          |
| Пароль               | как в случае с адаптером          |

Использовать **Проверить соединение**Успех выглядит так: `MeterMaster adapter reachable ✓`

---

## Веб-интерфейс

```
http://{ioBroker-IP}:8089/
```

| Вкладка     | Содержание                                                                              |
| ----------- | --------------------------------------------------------------------------------------- |
| **Данные**  | Данные счетчиков сгруппированы по домам/квартирам — история, графики, CSV-файл.         |
| **Импорт**  | Резервное копирование приложения MeterMaster (JSON-схема 2.0) с помощью перетаскивания. |
| **Журналы** | Журнал событий в реальном времени с фильтрацией, автоматической прокруткой и экспортом. |
| **Система** | Статистика и проверка обновлений                                                        |
| **Узлы**    | Дополнительные дисплеи ESP32 (см. ниже)                                                 |

Переключение языка: DE / EN в веб-интерфейсе.

---

## Созданы точки данных

```
metermaster.0.
├── info.connection        bool    Adapter connected
├── info.lastSync          number  Timestamp of last sync (ms)
├── info.readingsReceived  number  Total readings received
│
├── {House}/{Apartment}/{Meter}/
│   ├── readings.latest      number  Latest value (ts = reading date)
│   ├── readings.latestDate  string  ISO-8601 date
│   ├── readings.history     string  JSON array of all readings
│   ├── name                 string
│   ├── unit                 string
│   └── typeName             string
│
└── nodes/{MAC}/             (only if ESP32 nodes are used)
    ├── ip, name, version, lastSeen
    ├── config, configAck, cmd
```

---

## HTTP API

### Без аутентификации

| Метод    | Путь            | Описание                                    |
| -------- | --------------- | ------------------------------------------- |
| ПОЛУЧАТЬ | `/`             | Веб-интерфейс                               |
| ПОЛУЧАТЬ | `/api/version`  | Проверка версии и GitHub                    |
| ПОЛУЧАТЬ | `/api/stats`    | Статистика                                  |
| ПОЛУЧАТЬ | `/api/data`     | Все кэшированные показания                  |
| ПОЛУЧАТЬ | `/api/logs`     | Буфер лога (`?level=&category=&text=`)      |
| ПОЛУЧАТЬ | `/api/nodes`    | Зарегистрированные узлы ESP32               |
| ПОЛУЧАТЬ | `/api/discover` | Известные идентификаторы состояния счетчика |
| ПОЧТА    | `/api/register` | Сердцебиение ESP32                          |

### С базовой аутентификацией

| Метод    | Путь                                     | Описание                                       |
| -------- | ---------------------------------------- | ---------------------------------------------- |
| ПОЛУЧАТЬ | `/api/ping`                              | проверка соединения                            |
| ПОЧТА    | `/api/reading`                           | Сохраните одно показание.                      |
| ПОЧТА    | `/api/readings`                          | Сохранение результатов пакетных измерений      |
| ПОЧТА    | `/api/import`                            | Импорт резервной копии приложения              |
| УДАЛИТЬ  | `/api/apartment/{house}/{apartment}`     | Удалить дерево каналов квартиры                |
| УДАЛИТЬ  | `/api/meter/{house}/{apartment}/{meter}` | Удалить отдельный счетчик                      |
| GET/POST | `/api/nodes/{MAC}/config`                | Получить/настроить конфигурацию ESP32          |
| ПОЧТА    | `/api/nodes/{MAC}/configAck`             | Подтверждение конфигурации                     |
| ПОЧТА    | `/api/nodes/{MAC}/cmd`                   | Немедленная команда (например, для светодиода) |

### Пример: однократное чтение

```http
POST http://host:8089/api/reading
Authorization: Basic base64(user:password)
Content-Type: application/json

{
  "house": "MyHouse",
  "apartment": "West",
  "meter": "HotWater",
  "value": 128.75,
  "unit": "m³",
  "typeName": "HotWater",
  "readingDate": "2024-02-12T09:30:00.000Z"
}
```

---

## Дополнительно: модули отображения ESP32

Как **дополнительная опция**адаптер может управлять [Узлы MeterMaster ESP32](https://github.com/MPunktBPunkt/esp32.MeterMaster) которые отображают выбранные значения измерительного прибора на небольшом OLED-дисплее.

- Узлы регистрируются посредством пульсации (пульса)`POST /api/register`) и опрашивать конфигурацию каждые 15 секунд
- Государства в `metermaster.0.nodes.{MAC}.*`
- Веб-интерфейс **Узлы** Вкладка: онлайн-статус, IP-соединение, выбор счетчика, управление светодиодами, прошивка.

Вы делаете **нет** Для использования адаптера необходим ESP32 или приложение для Android.

---

## Обновлять

**Веб-интерфейс:** `http://IP:8089/` → **Система** → Проверить наличие обновлений (установить через командную строку).

**Командная строка:**

```bash
iobroker upgrade metermaster
iobroker restart metermaster.0
```

---

## Changelog


### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.9.10
- Repo checker (E2004/E6029): remove unpublished `0.9.5` from `common.news`
- Trim `common.news` to 7 entries
- Document releases 0.9.6–0.9.10 in README changelog

### 0.9.9
- Web UI: delete apartment/meter with password confirmation (DELETE API)
- Collapsible house/apartment sections in the Data tab (localStorage)

### 0.9.8
- Log MeterMaster app connection tests from User-Agent on `/api/ping` at info level

### 0.9.7
- Print fix (Blob URL revoke)
- ESP32 discover proxy (`getStates` / node-discover)
- Node heartbeat/ack logs moved to debug

### 0.9.6
- Assign display nodes via chips on meter cards in the Data tab
- Correct history on re-sync; edit values in Web UI; print chart and apartment/house latest readings

### 0.9.4
- All adapter log messages and API JSON error responses in English
- State common names and roles corrected (readings channel, date/text/json roles, info.firmware for nodes)
- Web UI i18n: full DE/EN coverage, English default HTML
- Config validation: clamped port (1024–65535), logBufferSize (50–5000), keepHistory (0–100000)
- Removed `/api/update` endpoint and one-click Web UI update (CLI commands card retained)
- `migrateStateRoles()` uses `getAdapterObjectsAsync` (own adapter states only)
- Removed dead `houseName` config; import default house is `MyHouse`
- Fixed redundant state check in stateChange handler
- `@types/node` pinned to `^22.0.0`

### 0.9.3
- Fix state roles for ioBroker object structure check (repochecker E1008/E1009/E1011)
- Migration of existing objects on adapter start

### 0.9.2
- Adapter checker compliance: npm news cleanup, devDependencies, trusted publishing
- npm publish via GitHub Actions with provenance

### 0.9.1
- Lowered admin dependency to >=7.6.20 (fixes startup when admin 7.7.x is installed)

### 0.9.0
- Finalized for ioBroker repository: CI/CD testing, adapter checker compliance
- English README, updated dependencies (Node.js >= 22, adapter-core 3.4.x)
- Admin config i18n, encrypted password storage
- Requires js-controller >= 6.0.11 and admin >= 7.6.20

### 0.8.3
- Chart: linear time axis, yearly consumption projection toggle, README screenshots

### 0.8.2
- Bugfix: chart modal close button and range filters

### 0.8.1
- Bugfix: literal newline in CSV export JS broke Web UI

### 0.8.0
- Charts per meter, consumption KPI, CSV export, DE/EN language switch

See [io-package.json](io-package.json) `common.news` for full history. Older entries: [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

---

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 MPunktBPunkt

See [LICENSE](LICENSE) for the full license text.