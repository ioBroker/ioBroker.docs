---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.metermaster/README.md
title: ioBroker MeterMaster Adapter
hash: NEDjPcvQ2UIQKo6i8RNszFoHSPh/t3BeY1DzGEMi5wY=
---
# Адаптер ioBroker MeterMaster

![Версия](https://img.shields.io/badge/version-0.9.4-blue.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)

[![Баннер MeterMaster](https://github.com/MPunktBPunkt/ioBroker.metermaster/raw/main/github-banner.svg)](https://github.com/MPunktBPunkt/ioBroker.metermaster)

Получает показания счетчика от **[Приложение MeterMaster для Android (https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) сохраняет данные в виде точек данных ioBroker и управляет узлами отображения ESP32 для вывода показаний счетчиков на OLED-дисплеи. Исходный код: [GitHub]](https://github.com/MPunktBPunkt/MeterMaster).

---

## Функции
- **HTTP-приемник** – принимает показания непосредственно из приложения.
- **Автоматическое создание точек данных** – состояния создаются автоматически при первой синхронизации.
- **Правильные временные метки** – состояние `ts` отражает фактическую дату чтения.
- **История** – каждый счетчик хранит полный массив `readings.history`.
- **Базовая аутентификация** – дополнительная защита с помощью имени пользователя и пароля.
- **Веб-интерфейс** – встроенный браузерный просмотрщик с 5 вкладками (Данные, Узлы, Импорт, Журналы, Система)
- **График и CSV-файлы** – исторические графики, ежемесячное потребление и экспорт CSV-файлов по каждому метру.
- **DE/EN** – переключение языка в веб-интерфейсе
- **Импорт** – резервное копирование приложения (схема 2.0) через веб-интерфейс.
- **Управление узлами ESP32** – просмотр и настройка зарегистрированных узлов отображения.
- **Дистанционное управление** – управление выбором индикаторов и светодиодами узлов ESP32 через веб-интерфейс.

---

## Скриншоты
Встроенный веб-интерфейс предлагает пять вкладок — обзор:

| | |
|---|---|
| **Данные** – карты учета потребления с KPI, историей, графиком и CSV-файлом | ![Вкладка «Данные»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-daten.png) |
| **Узлы** – статус ESP32, IP-адрес, прошивка | ![Вкладка «Узлы»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-nodes.png) |
| **Импорт** – резервное копирование приложения методом перетаскивания | ![Вкладка «Импорт»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-import.png) |
| **Журналы** – журнал в реальном времени с фильтрацией и экспортом | ![вкладка «Журналы»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-logs.png) |
| **Система** – статистика и проверка версии | ![Вкладка «Система»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-system.png) |
| **Система** – статистика и проверка версии | ![Вкладка «Система»](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-system.png) |

---

## Установка
Установите адаптер из официального списка адаптеров ioBroker:

1. Откройте **административную панель ioBroker** → **Адаптеры**
2. Найдите **MeterMaster**
3. Нажмите **Установить** и создайте экземпляр.

Из командной строки на хосте ioBroker:

```bash
iobroker add metermaster
iobroker start metermaster
```

При необходимости откройте брандмауэр: `sudo ufw allow 8089/tcp`

Подробнее: [INSTALLATION.md](INSTALLATION.md)

---

## Конфигурация экземпляра
После установки → Администрирование ioBroker → **Адаптеры → MeterMaster** → создать экземпляр:

| Настройки | По умолчанию | Описание |
|---|---|---|
| HTTP-порт | `8089` | Порт, на котором адаптер прослушивает запросы |
| Имя пользователя | `metermaster` | Имя пользователя для базовой аутентификации |
| Пароль | – | Пароль для базовой аутентификации |
| Буфер журнала | `500` | Максимальное количество сохраненных записей журнала |
| Сохранять историю | `0` | 0 = неограниченно |
| Сохранять историю | `0` | 0 = неограниченно |

---

## Приложение MeterMaster для Android
Снимайте показания счетчиков и синхронизируйте их с ioBroker:

| | |
|---|---|
| **Google Play** | [**MeterMaster**](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) – установите приложение, считывайте показания счетчиков и отправляйте их на адаптер |
| **GitHub** | [**MPunktBPunkt/MeterMaster**](https://github.com/MPunktBPunkt/MeterMaster) – исходный код, сборка APK и документация |

[![[Скачать в Google Play](https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster)

---

## Настройка приложения MeterMaster
**Настройки → ioBroker → Адаптер MeterMaster:**

| Поле | Ценность |
|---|---|
| Включить ioBroker | вкл |
| IP-адрес / имя хоста | IP-адрес сервера ioBroker |
| Порт адаптера | `8089` |
| Имя пользователя | как настроено в адаптере |
| Пароль | как указано в настройках адаптера |

Функция «Проверка соединения» должна вернуть `MeterMaster adapter reachable ✓`.

---

## Веб-интерфейс
Доступно без пароля:

```
http://{ioBroker-IP}:8089/
```

| Вкладка | Содержание |
|---|---|
| **Данные** | Все полученные данные со счетчиков сгруппированы по домам/квартирам, с историей показаний, графическим представлением и возможностью экспорта в CSV |
| **Узлы** | Зарегистрированные узлы ESP32: статус, IP-соединение, прошивка, выпадающее меню счетчика, управление светодиодами |
| **Импорт** | Резервное копирование приложения (JSON-схема 2.0) с помощью перетаскивания |
| **Журналы** | Журнал в реальном времени с фильтрацией, автоматической прокруткой и экспортом |
| **Система** | Статистика и проверка версии |

Скриншоты: см. [Скриншоты](#screenshots) выше.

---

## Узел дисплея ESP32
Адаптер поддерживает [MeterMaster ESP32 node](https://github.com/MPunktBPunkt/esp32.MeterMaster) в качестве дополнительного устройства для OLED-дисплея.

### Поток
1. ESP32 отправляет сигнал подтверждения активности каждые 60 секунд: `POST :8089/api/register`
2. Адаптер автоматически создает состояния `metermaster.0.nodes.{MAC}.*`
3. ESP32 опрашивает устройство каждые 15 секунд: `GET :8089/api/nodes/{MAC}/config`
4. Адаптер возвращает конфигурацию и необязательные команды (cmd).

### Вкладка "Узлы"
- Значок "Онлайн/офлайн" (зеленый, если частота сердечных сокращений < 120 с)
— IP-адрес в виде кликабельной ссылки → открывает веб-интерфейс ESP32
- Выпадающее меню «Измеритель»: назначить измеритель → ESP32 подхватит его при следующем опросе
- Светодиодные кнопки: включение/выключение → немедленное управление через командную строку

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
└── nodes/{MAC}/
    ├── ip          string  ESP32 IP address
    ├── name        string  Device name
    ├── version     string  Firmware version
    ├── lastSeen    number  Timestamp of last heartbeat (ms)
    ├── config      string  JSON config (adapter writes, ESP32 reads)
    ├── configAck   string  Acknowledgement by ESP32
    └── cmd         string  Immediate command (adapter writes, ESP32 reads+clears)
```

---

## HTTP API
### Без аутентификации
| Метод | Путь | Описание |
|---|---|---|
| GET | `/` | Веб-интерфейс |
| GET | `/api/stats` | Статистика (показания, время работы, узлы) |
| ПОЛУЧИТЬ | `/api/data` | Все кэшированные показания |
| GET | `/api/logs` | Буфер журнала (с фильтром `?level=&category=&text=`) |
| GET | `/api/nodes` | Все зарегистрированные узлы ESP32 |
| GET | `/api/discover` | Известные идентификаторы состояния счетчика |
| POST | `/api/register` | ESP32 пульс (аутентификация не требуется) |
| POST | `/api/register` | ESP32 heartbeat (аутентификация не требуется) |

### С базовой аутентификацией
| Метод | Путь | Описание |
|---|---|---|
| GET | `/api/ping` | Проверка соединения |
| ПОСТ | `/api/readings` | Сохранение показаний пакетной обработки |
| ПОСТ | `/api/import` | Импорт резервной копии приложения |
| GET | `/api/nodes/{MAC}/config` | Получить конфигурацию для ESP32 |
| POST | `/api/nodes/{MAC}/config` | Настройка конфигурации для ESP32 |
| POST | `/api/nodes/{MAC}/configAck` | Получение подтверждения конфигурации |
| POST | `/api/nodes/{MAC}/cmd` | Отправить немедленную команду (светодиод, индикатор) |
| POST | `/api/nodes/{MAC}/cmd` | Отправить немедленную команду (светодиод, индикатор) |

### Пример: однократное чтение
```
POST http://host:8089/api/reading
Authorization: Basic base64(user:password)
Content-Type: application/json

{
  "house":       "MyHouse",
  "apartment":   "West",
  "meter":       "HotWater",
  "value":       128.75,
  "unit":        "m³",
  "typeName":    "HotWater",
  "readingDate": "2024-02-12T09:30:00.000Z"
}
```

### Пример: немедленная команда для ESP32
```
POST http://host:8089/api/nodes/C8C9A3CB7B08/cmd
Authorization: Basic base64(user:password)
Content-Type: application/json

{ "ledOn": true }
```

---

## Обновлять
### Через веб-интерфейс
`http://IP:8089/` → Вкладка **Система** → "Проверить наличие обновлений" (отображает наличие обновлений; установите через командную строку ниже)

### Командная строка
```bash
iobroker upgrade metermaster
iobroker restart metermaster.0
```

---

## Changelog

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

## License

Copyright (c) 2026 MPunktBPunkt

MIT License – see [LICENSE](LICENSE) for the full license text.