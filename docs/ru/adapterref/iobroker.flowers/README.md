---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.flowers/README.md
title: ioBroker.flowers
hash: NrIRdHNMqL1rfOJL/gF7gA5hLcnFhfCCU6AhtMtAuVs=
---
# IoBroker.flowers
![Логотип](../../../en/adapterref/iobroker.flowers/admin/flowers.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.flowers.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)

Следите за комнатными растениями с помощью датчиков влажности почвы, температуры и заряда батареи, используя уведомления в Telegram.

Этот адаптер работает с **любым датчиком**, уже интегрированным в ioBroker (Zigbee, Wi-Fi, Bluetooth, Z-Wave и т. д.) — специальное оборудование не требуется. Популярные совместимые датчики:

- [Xiaomi Mi Flora / HHCC Plant Sensor](https://www.mi.com/global/mi-flora) — Bluetooth: влажность почвы + температура + освещенность
- [Датчики влажности почвы Zigbee](https://www.zigbee2mqtt.io/supported-devices/#s=soil) (например, Tuya TS0601, MOES) — через адаптер ioBroker Zigbee
- Любой датчик, отображающий состояние влажности/температуры/заряда батареи в ioBroker.

Уведомления отправляются через [ioBroker Telegram адаптер](https://github.com/ioBroker/ioBroker.telegram).

## Функции
- Мониторинг нескольких растений с индивидуальным назначением датчиков.
- Встроенные профили растений (фикус, орхидея, кактус, монстера, папоротник, суккулент, пальма, потос, алоэ вера, мирная лилия, кофе арабика, рапис excelsa, калатея зебрина, сансевиерия Лаврентия, пользовательские)
- Пользовательские профили: создавайте собственные профили растений с индивидуальными пороговыми значениями на вкладке «Профили».
- Настраиваемые пороговые значения для каждого предприятия (переопределяют значения по умолчанию в профиле)
- Автоматический полив: включение полива при снижении влажности почвы ниже минимального уровня.
- Настраиваемая продолжительность полива (в минутах)
- Уведомления в Telegram через `sendTo('telegram.X', ...)`
- Защита от спама: ограничение на максимальное количество сообщений в день + настраиваемое время ожидания для каждого типа оповещений.
- Ночной режим: подавление уведомлений в тихое время суток.
- Ежедневные и еженедельные отчеты о состоянии растений с возможностью ручного запуска.
- Обнаружение датчиков в автономном режиме

## Конфигурация
### Вкладка «Настройки»
| Параметр | Описание |
|-----------|-------------|
| Экземпляр Telegram | Номер экземпляра адаптера Telegram |
| Пользователи Telegram | Имена пользователей, разделённые запятыми (пустое поле = все пользователи) |
| Интервал проверки | Как часто проверять показания датчика |
| Максимальное количество сообщений в день | Лимит защиты от спама |
| Порог отключения от сети | Количество часов до того, как датчик будет считаться отключенным от сети |
| Ночной режим | Отключение уведомлений в ночное время |
| Ежедневный/еженедельный отчет | Плановые отчеты о состоянии дел |

### Вкладка «Растения»
Добавьте свои растения и назначьте идентификаторы состояния ioBroker для каждого датчика. Выберите профиль — пороговые значения применяются автоматически. Вы можете переопределить индивидуальные пороговые значения для каждого растения.

Для автоматического полива назначьте идентификатор состояния **Полив** (например, переключатель, управляющий насосом или клапаном). Когда влажность почвы падает ниже минимального порогового значения, адаптер устанавливает это состояние в `true` на заданную продолжительность полива, а затем возвращает его в `false`.

### Вкладка «Профили»
Обзор встроенных профилей с рекомендуемыми пороговыми значениями. Вы также можете создать **пользовательские профили** в таблице вверху — введите имя и пороговые значения, а затем используйте это имя в поле «Пользовательский профиль» на вкладке «Растения».

## Штаты
Адаптер создает состояния в рамках `flowers.X.plants.<plant_name>`:

| Штат | Описание |
|-------|-------------|
| `humidity` | Текущая влажность почвы в % |
| `battery` | Текущий процент заряда батареи |
| `батарея` | Текущий процент заряда батареи |

И в разделе `flowers.X`:

| Штат | Описание |
|-------|-------------|
| `info.connection` | Состояние подключения адаптера |
| `notifications.sendDailyReport` | Кнопка: запустить ежедневный отчет вручную |
| `notifications.sendWeeklyReport` | Кнопка: запустить еженедельный отчет вручную |
| `notifications.sendWeeklyReport` | Кнопка: запустить еженедельный отчет вручную |

### Автоматический полив
На вкладке «Растения» присвойте растению состояние **полива** (например, `zigbee.0.pump.state`). Когда влажность опустится ниже минимального значения:

1. Адаптер устанавливает состояние полива в значение «истина».
2. Ожидает истечения заданной **продолжительностью полива** (в минутах).
3. Возвращает состояние в значение `false`.

Для каждого растения выполняется только один цикл полива за раз. Продолжительность цикла можно настроить в разделе «Настройки» → «Автоматический полив».

## Changelog

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

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License  
Copyright (c) 2025-2026 sadam6752-tech <sadam6752@gmail.com>