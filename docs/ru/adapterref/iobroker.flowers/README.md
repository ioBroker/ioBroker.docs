---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.flowers/README.md
title: ioBroker.flowers
hash: IPVnZBXI8WrCHJI+HNruuBA8EghNZ6EzPvlJUG+BrQQ=
---
# ioBroker.flowers

![Стабильный](https://iobroker.live/badges/flowers-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.flowers.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.flowers.svg)
![Лицензия](https://img.shields.io/github/license/sadam6752-tech/ioBroker.flowers.svg)
![НПМ](https://nodei.co/npm/iobroker.flowers.png?downloads=true)
![Тестирование и выпуск](https://github.com/sadam6752-tech/ioBroker.flowers/actions/workflows/test-and-release.yml/badge.svg)
![Количество установок](https://iobroker.live/badges/flowers-installed.svg)

![Логотип](../../../en/adapterref/iobroker.flowers/admin/flowers.png)

Следите за комнатными растениями с помощью датчиков влажности почвы, температуры и заряда батареи, используя уведомления в Telegram.

Этот адаптер работает с **любым датчиком,** уже интегрированным в ioBroker (Zigbee, Wi-Fi, Bluetooth, Z-Wave и т. д.) — специальное оборудование не требуется. Популярные совместимые датчики:

- [Датчик влажности почвы Xiaomi Mi Flora / HHCC](https://www.mi.com/global/mi-flora) — Bluetooth, отображает влажность, температуру и освещенность почвы.
- [Датчики влажности почвы Zigbee](https://www.zigbee2mqtt.io/supported-devices/#s=soil) (например, Tuya TS0601, MOES) — через адаптер ioBroker Zigbee
- Любой датчик, отображающий состояние влажности/температуры/заряда батареи в ioBroker.

Уведомления отправляются через [Telegram-адаптер ioBroker](https://github.com/ioBroker/ioBroker.telegram) .

## Функции

- Мониторинг нескольких растений с индивидуальным назначением датчиков.
- Встроенные профили растений (фикус, орхидея, кактус, монстера, папоротник, суккулент, пальма, потос, алоэ вера, мирная лилия, кофе арабика, рапис excelsa, калатея зебрина, сансевиерия Лаврентия, пользовательские)
- Пользовательские профили: создавайте собственные профили растений с индивидуальными пороговыми значениями на вкладке «Профили».
- Настраиваемые пороговые значения для каждого предприятия (переопределяют значения по умолчанию в профиле).
- Автоматический полив: включение полива при снижении влажности почвы ниже минимального уровня.
- Настраиваемая продолжительность полива (в минутах)
- Уведомления в Telegram через `sendTo('telegram.X', ...)`
- Защита от спама: ограничение на максимальное количество сообщений в день + настраиваемое время ожидания для каждого типа оповещений.
- Ночной режим: отключение уведомлений в тихие часы.
- Ежедневные и еженедельные отчеты о состоянии растений с возможностью ручного запуска.
- Автономное обнаружение датчиков

## Конфигурация

### Вкладка «Настройки»

| Параметр                                 | Описание                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| Экземпляр Telegram                       | Номер экземпляра телеграм-адаптера                                         |
| Пользователи Telegram                    | Имена пользователей, разделённые запятыми (пустое поле = все пользователи) |
| Контрольный интервал                     | Как часто проверять показания датчиков?                                    |
| Максимальное количество сообщений в день | Лимит защиты от спама                                                      |
| Порог офлайн-режима                      | Количество часов до того, как датчик будет считаться отключенным           |
| Ночной режим                             | Отключите уведомления в ночное время.                                      |
| Ежедневный/еженедельный отчет            | Плановые отчеты о состоянии                                                |

### Вкладка «Растения»

Добавьте свои растения и назначьте идентификаторы состояния ioBroker для каждого датчика. Выберите профиль — пороговые значения применяются автоматически. Вы можете переопределить индивидуальные пороговые значения для каждого растения.

Для автоматического полива назначьте идентификатор состояния **полива** (например, переключатель, управляющий насосом или клапаном). Когда влажность почвы падает ниже минимального порогового значения, адаптер устанавливает это состояние. `true` в течение заданного периода полива, а затем возвращает его обратно на заданное значение. `false`.

### Вкладка «Профили»

Обзор встроенных профилей с рекомендуемыми пороговыми значениями. Вы также можете создавать **пользовательские профили** в таблице вверху — введите имя и пороговые значения, а затем используйте это имя в поле «Пользовательский профиль» на вкладке «Растения».

## Штаты

Адаптер создает состояния в рамках `flowers.X.plants.<plant_name>`:

| Состояние     | Описание                           |
| ------------- | ---------------------------------- |
| `humidity`    | Текущая влажность почвы %          |
| `temperature` | Текущая температура °C             |
| `battery`     | Текущий уровень заряда батареи (%) |

И под `flowers.X`:

| Состояние                        | Описание                                     |
| -------------------------------- | -------------------------------------------- |
| `info.connection`                | Состояние подключения адаптера               |
| `notifications.totalToday`       | Уведомления разосланы сегодня.               |
| `notifications.sendDailyReport`  | Кнопка: запустить ежедневный отчет вручную   |
| `notifications.sendWeeklyReport` | Кнопка: запустить еженедельный отчет вручную |

### Автоматический полив

Присвойте режим **полива** (например) `zigbee.0.pump.state`) во вкладке «Растения». Когда влажность опускается ниже минимального значения:

1. Адаптер устанавливает режим полива на `true`
2. Ожидание заданной **продолжительности полива** (в минутах)
3. Возвращает состояние в исходное. `false`

Для каждого растения выполняется только один цикл полива за раз. Продолжительность цикла можно настроить в разделе «Настройки» → «Автоматический полив».

## Changelog

### **WORK IN PROGRESS**
- (sadam6752-tech) `@iobroker/testing` 6.3.2 (repository checker W0037)

### 0.4.8
- (sadam6752-tech) Fix W1032: reduce common.news to the latest 7 entries

### 0.4.7
- (sadam6752-tech) Fix W0037: update @iobroker/testing to 6.3.0

### 0.4.6
- (sadam6752-tech) Fix E6029/W6030: add the missing changelog entry for 0.4.5
- (sadam6752-tech) Fix W6034: complete MIT license text in the README
- (sadam6752-tech) CI: Node.js 26 in the test matrix and a new deploy job using npm Trusted Publishing (OIDC) with provenance

### 0.4.5
- (sadam6752-tech) Fix S0064: update @alcalzone/release-script-plugin-license to 5.2.2

### 0.4.4
- (sadam6752-tech) Fix S0082: update @tsconfig/node22 devDependency to 22.0.5

### 0.4.3
- (sadam6752-tech) Fix W0034: update declared @iobroker/adapter-core range to ^3.4.3
- (sadam6752-tech) Fix S5601: migrate i18n to short format ({lang}.json)
- (sadam6752-tech) Fix W1032: trim news to 7 entries

### 0.4.2
- (sadam6752-tech) Update @iobroker/adapter-core to 3.4.3
- (sadam6752-tech) Downgrade @types/node to ^22 (fix W0066)
- (sadam6752-tech) Add @tsconfig/node22 with extends in tsconfig.json (fix S0085/S0088)
- (sadam6752-tech) Trim old news entries (fix W1032)

### 0.4.1 (2026-06-20)
- (sadam6752-tech) Fix W5612: add missing i18n keys for Custom Profiles and placeholder fields
- (sadam6752-tech) Update engines.node to >=22; remove Node.js 20 from test matrix
- (sadam6752-tech) Add prettier.config.mjs, tsconfig.json, @types/node; update devDependencies

### 0.4.0 (2026-05-14)
- (sadam6752-tech) Fix object hierarchy: change plants container from `channel` to `folder` type to allow device children

### 0.3.9 (2026-04-30)
- (sadam6752-tech) Fix button state roles: set `read=false` for `sendDailyReport` and `sendWeeklyReport` buttons (required by ioBroker role spec)

### 0.3.8 (2026-04-30)
- (sadam6752-tech) Auto-cleanup: remove ioBroker objects for plants deleted from config on adapter start

### 0.3.7 (2026-04-30)
- (sadam6752-tech) Fix E8915: add dependabot cooldown (`default-days: 7`) for npm ecosystem
- (sadam6752-tech) Update CI/CD: `check-and-lint` and `deploy` steps to Node.js 24.x
- (sadam6752-tech) Remove redundant `eslint` devDependency (included via `@iobroker/eslint-config`)
- (sadam6752-tech) Add CHANGELOG_OLD.md for older changelog entries

### 0.3.6 (2026-03-31)
- (sadam6752-tech) Fix dependabot config to track all package.json in subdirectories (W8905)
- (sadam6752-tech) Add .github/auto-merge.yml for dependabot automerge configuration (S8914)

### 0.3.5 (2026-03-31)
- (sadam6752-tech) Fix .releaseconfig.json plugins format (array instead of object)

### 0.3.4 (2026-03-31)
- (sadam6752-tech) Add unit tests for MonitorService, NotificationManager and messages (106 tests total)
- (sadam6752-tech) Update README with links to compatible devices and Telegram adapter
- (sadam6752-tech) Remove mocha from devDependencies (already included in @iobroker/testing)

### 0.3.3 (2026-03-30)
- (sadam6752-tech) Fix object hierarchy: create device/channel parent objects before states
- (sadam6752-tech) Use correct state roles: value.humidity, value.temperature, value.battery
- (sadam6752-tech) Improve unload: null timers after clearing, guard monitor null check

### 0.3.2 (2026-03-30)
- (sadam6752-tech) Custom profiles: users can create own plant profiles in Profiles tab
- (sadam6752-tech) Custom profile field in Plants table for direct profile name entry

For older changelog entries see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2025-2026 sadam6752-tech <sadam6752@gmail.com>

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