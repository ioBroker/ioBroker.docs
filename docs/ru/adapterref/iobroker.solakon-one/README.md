---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solakon-one/README.md
title: ioBroker.solakon-one
hash: SV1BXXba62lijE4BmM5bVBQ8dHQ01F7nm5bh5OWgtwQ=
---
# ioBroker.solakon-one

![Версия NPM](https://img.shields.io/npm/v/iobroker.solakon-one.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)

**Адаптер ioBroker для гибридного солнечного инвертора Solakon ONE**

Осуществляет мониторинг и управление гибридным солнечным инвертором Solakon ONE ( [www.solakon.de](https://www.solakon.de) ) с аккумуляторным хранилищем по локальной сети через **протокол Modbus TCP** (порт 502).

**[Немецкая документация](README.de.md)**

---

## Требования

- ioBroker с js-контроллером >= 6.0.0
- Node.js >= 22
- Инвертор Solakon ONE доступен в локальной сети.
- На устройстве включен протокол Modbus TCP (порт 502).

---

## Установка

Установка через административный интерфейс ioBroker: **Адаптеры** → найдите **"solakon-one"** → **Установить** .

---

## Конфигурация

| Поле                                | Описание                                         | По умолчанию    |
| ----------------------------------- | ------------------------------------------------ | --------------- |
| **IP-адрес**                        | IP-адрес устройства Solakon ONE в локальной сети | `192.168.1.100` |
| **Порт**                            | TCP-порт Modbus                                  | `502`           |
| **Идентификатор устройства Modbus** | Адрес раба (1–247)                               | `1`             |
| **Интервал (с)**                    | Интервал опроса (1–300 с)                        | `30`            |

---

## Точки данных

Все точки данных созданы в рамках`solakon-one.<instance>.*` (например`solakon-one.0.*` (для экземпляра по умолчанию номер 0; возможно создание нескольких экземпляров).

### Статус подключения

| ИДЕНТИФИКАТОР     | Описание           | Тип        |
| ----------------- | ------------------ | ---------- |
| `info.connection` | Соединение активно | Логический |

### Информация об устройстве (`device.*` )

| ИДЕНТИФИКАТОР      | Описание                 |
| ------------------ | ------------------------ |
| `device.model`     | Название модели          |
| `device.serial`    | Серийный номер           |
| `device.fw_master` | Версия прошивки (мастер) |
| `device.fw_slave`  | Версия прошивки (Slave)  |

### Фотовольтаика (`pv.*` )

| ИДЕНТИФИКАТОР                   | Описание                                    | Единица |
| ------------------------------- | ------------------------------------------- | ------- |
| `pv.total_power`                | Суммарная мощность фотоэлектрических систем | В       |
| `pv.total_energy`               | Суммарная энергия фотоэлектрических систем  | кВтч    |
| `pv.pv1_voltage` …`pv4_voltage` | Напряжение струны                           | В       |
| `pv.pv1_current` …`pv4_current` | Текущая строка                              | А       |
| `pv.pv1_power` …`pv4_power`     | Сила струны                                 | В       |

### Батарея (`battery.*` )

| ИДЕНТИФИКАТОР             | Описание                     | Единица |
| ------------------------- | ---------------------------- | ------- |
| `battery.soc`             | Состояние заряда (SoC)       | %       |
| `battery.voltage`         | Напряжение                   | В       |
| `battery.current`         | Текущий                      | А       |
| `battery.power`           | Мощность (+ заряд, − разряд) | В       |
| `battery.combined_power`  | Совокупная мощность          | В       |
| `battery.total_charge`    | Суммарная энергия заряда     | кВтч    |
| `battery.total_discharge` | Суммарная энергия разряда    | кВтч    |
| `battery.bms1_soh`        | Состояние здоровья (SoH)     | %       |
| `battery.design_energy`   | Номинальная мощность         | Что     |
| `battery.ambient_temp`    | Температура окружающей среды | °С      |
| `battery.max_temp`        | Максимальная температура     | °С      |
| `battery.min_temp`        | Минимальная температура      | °С      |

### Сетка (`grid.*` )

| ИДЕНТИФИКАТОР         | Описание                                  | Единица    |
| --------------------- | ----------------------------------------- | ---------- |
| `grid.off_grid`       | Активирован островной режим               | Логический |
| `grid.r_voltage`      | Фаза R напряжения сети                    | В          |
| `grid.s_voltage`      | Фаза напряжения сети S                    | В          |
| `grid.t_voltage`      | Фаза напряжения сети T                    | В          |
| `grid.frequency`      | Частота сети                              | Гц         |
| `grid.active_power`   | Активная мощность (+ экспорт, − импорт)   | В          |
| `grid.reactive_power` | Реактивная мощность                       | квар       |
| `grid.power_factor`   | коэффициент мощности                      | –          |
| `grid.total_export`   | Общая энергия, поступающая в сеть         | кВтч       |
| `grid.total_import`   | Общий объем закупленной энергии           | кВтч       |
| `grid.standard`       | Стандарт сетки (6=VDE0126, 7=VDE4105\_DE) | –          |

### Инвертор (`inverter.*` )

| ИДЕНТИФИКАТОР             | Описание               | Единица |
| ------------------------- | ---------------------- | ------- |
| `inverter.temperature`    | Внутренняя температура | °С      |
| `inverter.frequency`      | Выходная частота       | Гц      |
| `inverter.daily_energy`   | Суточная урожайность   | кВтч    |
| `inverter.total_energy`   | Общий урожай           | кВтч    |
| `inverter.operating_mode` | Режим работы           | –       |
| `inverter.network_status` | Состояние сети         | –       |

### Аварийное электропитание / EPS (`eps.*` )

| ИДЕНТИФИКАТОР | Описание                | Единица |
| ------------- | ----------------------- | ------- |
| `eps.voltage` | выходное напряжение EPS | В       |
| `eps.current` | выходной ток EPS        | А       |
| `eps.power`   | выходная мощность EPS   | В       |

### Статус (`status.*` )

| ИДЕНТИФИКАТОР             | Описание                                       |
| ------------------------- | ---------------------------------------------- |
| `status.remote_control`   | Активный режим дистанционного управления       |
| `status.remote_countdown` | Оставшееся время дистанционного управления (с) |

### Контроль (`control.*` ) — записываемый

| ИДЕНТИФИКАТОР                   | Описание                                                    | Диапазон                    |
| ------------------------------- | ----------------------------------------------------------- | --------------------------- |
| `control.remote_control_mode`   | Режим дистанционного управления                             | 0/1/3/5/7/9/11/13/15        |
| `control.remote_timeout`        | Тайм-аут дистанционного управления (с)                      | 0–3600                      |
| `control.remote_active_power`   | Уставка активной мощности (Вт)                              | -100000–100000              |
| `control.remote_reactive_power` | Уставка реактивной мощности (вар)                           | -100000–100000              |
| `control.eps_output`            | Выход EPS/UPS                                               | 0 = Выкл., 2 = EPS, 3 = ИБП |
| `control.minimum_soc`           | Минимальный уровень заряда                                  | 0–100 %                     |
| `control.maximum_soc`           | Максимальное состояние заряда                               | 0–100 %                     |
| `control.minimum_soc_ongrid`    | Минимальный уровень заряда батареи (при подключении к сети) | 0–100 %                     |
| `control.max_charge_current`    | Максимальный зарядный ток                                   | 0–40 А                      |
| `control.max_discharge_current` | Максимальный разрядный ток                                  | 0–40 А                      |
| `control.operating_mode`        | Режим работы                                                | 0–7                         |

#### Режимы работы (`operating_mode` )

| Ценить | Описание                        |
| ------ | ------------------------------- |
| 0      | Не указано                      |
| 1      | Самопотребление                 |
| 2      | Приоритет подачи электроэнергии |
| 3      | Резервная копия                 |
| 4      | Идеальное бритье                |
| 6      | Силовой заряд                   |
| 7      | Силовой разряд                  |

#### Режимы дистанционного управления (`remote_control_mode` )

| Ценить | Описание                                                            |
| ------ | ------------------------------------------------------------------- |
| 0      | Выключенный                                                         |
| 1      | Экспорт электроэнергии с инвертора (приоритет от солнечных батарей) |
| 3      | Импорт инвертора (приоритет фотоэлектрических систем)               |
| 5      | разряд батареи                                                      |
| 7      | Заряд батареи                                                       |
| 9      | Экспорт сетки                                                       |
| 11     | Импорт сетки                                                        |
| 13     | Экспорт электроэнергии от инвертора (приоритет сети)                |
| 15     | Импорт инвертора (приоритет сети)                                   |

---

## Changelog

### 1.0.18 (2026-07-24)
- Fix stale Modbus connection not being reset after a poll returns no data, which could cause the adapter to keep reusing a dead connection instead of reconnecting

### 1.0.17 (2026-07-24)
- Speed up adapter startup by creating/healing all datapoints in parallel instead of sequentially
- Make Modbus reconnect more robust (graceful socket close, automatic connect retry) to reduce ECONNRESET disconnects

### 1.0.16 (2026-07-23)
- Fix Admin GUI crash when hovering enum values in the object tree (#44): common.states is now resolved to plain per-language strings instead of translation objects, with automatic self-healing for existing installations
- Add common.desc (English/German) for control and status datapoints

### 1.0.15 (2026-06-28)
- Fix README manufacturer link: use solakon.de instead of the unrelated Home Assistant integration repo

### 1.0.14 (2026-06-28)
- Address manual review feedback: remove postinstall script, English log messages, i18n state labels and instanceObjects, translatable admin labels, sequential polling, README fixes, integration tests

### 1.0.13 (2026-06-11)
- Fix invalid role 'level.power' for power setpoint states (E1008)

### 1.0.12 (2026-06-10)
- Update @tsconfig/node22 to ^22.0.5 (W0083); migrate i18n to short format (S5601)

### 1.0.11 (2026-06-10)
- Add CHANGELOG_OLD.md for older entries (W6020); add tsconfig.json and @tsconfig/node22 (S0085/S0087); add README link to CHANGELOG_OLD.md

### 1.0.10 (2026-06-10)
- Fix W5005: use adapter.setTimeout in modbus.js; update eslint-config to 2.3.4; remove CHANGELOG_OLD.md

### 1.0.9 (2026-06-09)
- Fix JSON syntax error in io-package.json; limit news entries to 7 (E1032)

### 1.0.7 (2026-06-09)
- Fix @types/node version specifier: change >=22 to ^22.0.0 (W0066)

### 1.0.6 (2026-06-09)
- Fix Node.js requirement in README (>=22); add @types/node devDependency

### 1.0.5 (2026-06-09)
- Fix repo checker errors: require Node.js >=22, update release-script packages, remove redundant eslint devDependency, add macOS to CI test matrix, use this.setInterval/clearTimeout correctly

### 1.0.4 (2026-06-09)
- Add multilingual names (11 languages) to all datapoints

### 1.0.3 (2026-05-30)
- Add Node.js 24 to CI test matrix; use Node 24 for lint and deploy

### 1.0.2 (2026-04-13)
- Fix: add changelog to README, remove obsolete .eslintrc.json, add release-script packages, VS Code schema, automerge workflow

### 1.0.1 (2026-04-13)
- Fix: compact mode enabled, ESLint migrated to @iobroker/eslint-config, node: prefix for built-in modules, automated deploy workflow added

### 1.0.0 (2026-04-12)
- Initial release
- Modbus TCP communication
- All sensor data points (PV, battery, grid, inverter, EPS)
- All control data points (operating mode, SoC limits, remote control, EPS)
- Admin UI with jsonConfig

For older changelog entries see CHANGELOG_OLD.md.

---

## License

MIT License

Copyright (c) 2026 Marco Bertulies <berto74online@gmail.com>

Based on the [Home Assistant integration for Solakon ONE](https://github.com/solakon-de/solakon-one-homeassistant).