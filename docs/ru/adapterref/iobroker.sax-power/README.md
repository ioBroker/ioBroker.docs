---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/README.md
title: ioBroker.sax-power
hash: BNO6C7bw4B8pUryMvGiSTz5IB0n4G9VZkGHBsQfoXxs=
---
# IoBroker.sax-power

![Версия NPM](https://img.shields.io/npm/v/iobroker.sax-power.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sax-power.svg)
![Лицензия](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-brightgreen.svg)

[![Тестирование и выпуск](https://github.com/GodHunter/ioBroker.sax-power/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/GodHunter/ioBroker.sax-power/actions/workflows/test-and-release.yml)

Адаптер ioBroker для систем хранения энергии на основе аккумуляторов SAX Power.

Этот независимый адаптер, созданный сообществом пользователей, подключает ioBroker к облаку SAX Power и предоставляет данные измерений в реальном времени, информацию об устройствах и исторические статистические данные об энергопотреблении. Он поддерживает автоматическое обнаружение устройств и агрегирует значения по всем обнаруженным системам хранения данных.

Информация о продукте и производителе: [SAX Power GmbH](https://sax-power.net/)

Данный проект не связан с компанией SAX Power GmbH, не поддерживается ею и не поддерживается ею.

## Функции
- Аутентификация в облаке SAX Power
- Автоматическое обнаружение всех систем хранения данных, назначенных учетной записи.
- Актуальные значения выработки электроэнергии фотоэлектрическими системами, потребления электроэнергии домом, электроэнергии из сети, заряда батареи и уровня заряда.
- Исторические статистические данные по потреблению энергии за сегодня, неделю, месяц, год и за весь период.
- Количество циклов, сообщаемое системой SAX, плюс прозрачные расчеты эквивалентного полного цикла для каждого устройства и для всей установки.
- Явное определение модели батареи с указанием номинальной и полезной емкостей.
- Сводные данные и статистика в режиме реального времени по нескольким системам хранения.
- Адаптивный административный интерфейс на основе React
- Дополнительная конфигурация Modbus подготовлена для будущих функций управления.
- Минимальный поддерживаемый интервал опроса составляет **60 секунд** во избежание излишней нагрузки на службу SAX Power.
— Документированная объектная модель, интеграция API и обработка статистики.

## Требования
- ioBroker с правами администратора **7.8.23 или новее**
- Node.js **22 или новее**
- Учетная запись SAX Power с доступом к панели управления SAX Power.

## Установка
Установите адаптер из официального репозитория ioBroker через административный интерфейс ioBroker.

## Конфигурация
Откройте конфигурацию адаптера в административной панели ioBroker и введите:

- адрес электронной почты панели управления SAX Power
- соответствующий пароль
- интервал опроса
- Модель SAX Power для каждой автоматически определяемой системы хранения данных

Минимальный интервал опроса составляет **60 секунд**.
Конечная точка API SAX Power встроена в адаптер и не может быть изменена в административном интерфейсе.

Пароль хранится с помощью механизма конфигурации ioBroker `encryptedNative` и защищен от обычного чтения конфигурации с помощью `protectedNative`. Он остается неизменным при сохранении несвязанных настроек, таких как интервал опроса или модель батареи.

Административный интерфейс разделяет вход в облако и настройки адаптера. Системы хранения данных нельзя добавить вручную: адаптер обнаруживает их через учетную запись SAX Power и запрашивает только соответствующую модель.

## Панель мониторинга в реальном времени
Административный интерфейс отображает сводные данные по следующим параметрам:

- Солнечная энергия
Потребление в домохозяйстве
- Электроэнергия из сети
- Питание от батареи
- Состояние обвинения

Панель управления считывает только состояния ioBroker. Она не выполняет дополнительных запросов к облаку.

## Структура объекта
Адаптер создает отдельные деревья объектов для каждой обнаруженной системы хранения данных SAX Power. Все значения, относящиеся ко всей системе, сгруппированы ниже `summary`, поэтому их нельзя спутать со значениями отдельного устройства хранения данных.

Типичная структура:

```text
sax-power.0
├── info
├── devices
│   └── <device-id>
│       ├── info
│       ├── live
│       ├── battery
│       └── statistics
└── summary
    ├── battery
    └── statistics
        ├── info
        ├── day
        ├── week
        ├── month
        ├── year
        └── total
```

Подробные справочные материалы доступны по следующим ссылкам:

- [Ссылка на объект](docs/OBJECTS.md)
- [Справочник поля](docs/FIELD_REFERENCE.md)
- [Статистика](docs/STATISTICS.md)
- [Модели, циклы работы и состояние батарей](docs/BATTERY.md)

## Статистика
Исторические значения извлекаются из конечной точки графика энергопотребления SAX Power и сопоставляются с состояниями ioBroker.

Поддерживаемые периоды:

- сегодня
- неделя
- месяц
- год
- общий

Для учетных записей с несколькими системами хранения данных адаптер также вычисляет сводную статистику.

Более подробная информация приведена в [docs/STATISTICS.md](docs/STATISTICS.md).

Для расчета эквивалентных полных циклов используется документированная формула `(charged energy + discharged energy) / (2 × nominal capacity)`. Состояние батареи оценивается на основе медианы пяти квалифицированных циклов разряда, каждый из которых охватывает не менее 40 процентных пунктов уровня заряда. Действительные, необходимые и отклоненные циклы, а также текущий ход выполнения, остаются видимыми во время сбора данных. Метод интегрирования, пределы допустимости, устойчивость и известные ограничения точности описаны в [docs/BATTERY.md](docs/BATTERY.md).

## Модбус
Настройка Modbus является необязательной и не зависит от подключения к облаку SAX Power.

В версии 1.0.x не отображаются активные функции управления Modbus. Существующая конфигурация обеспечивает техническую основу для последующих релизов без изменения интеграции с облаком в режиме только для чтения.

См. [docs/MODBUS.md](docs/MODBUS.md).

## Документация
- [Интеграция API](docs/API.md)
- [Архитектура](docs/ARCHITECTURE.md)
- [Модели, циклы работы и состояние батарей](docs/BATTERY.md)
- [Брендинг и независимость проекта](docs/BRANDING.md)
- [Справочник поля](docs/FIELD_REFERENCE.md)
- [Modbus](docs/MODBUS.md)
- [Структура объекта](docs/OBJECTS.md)
- [Статистика](docs/STATISTICS.md)

## Поддержка и обратная связь
Пожалуйста, используйте GitHub Issues для сообщений об ошибках и запросов на добавление новых функций:

- [Сообщить об ошибке](https://github.com/GodHunter/ioBroker.sax-power/issues)
- [Вклад](CONTRIBUTING.md)
- [Политика безопасности](SECURITY.md)
- [Кодекс поведения](CODE_OF_CONDUCT.md)

Отзывы пользователей, работающих с несколькими системами хранения данных SAX Power, особенно ценны, поскольку помогают проверить работу функций обнаружения, агрегирования и взаимодействия нескольких устройств в реальных условиях.

## Разработка
Установите зависимости:

```bash
npm ci
npm --prefix src-admin ci
```

Выполните полную проверку проекта:

```bash
npm run check
```

Запустите исторические тесты:

```bash
npm run test:history
```

Выполните проверку пакета:

```bash
npm run test:package
```

## Changelog

### 1.2.4 (2026-08-20)

- Removed direct GitHub installation guidance in favor of installation from the official ioBroker repository.
- Standardized the custom administration interface on English until full ioBroker i18n support is implemented.
- Added a safe upper bound of 2,147,483 seconds for the polling interval to prevent Node.js timer overflow.
- Replaced deprecated directional power roles with `value.power.consumed` and `value.power.produced`.
- Removed inactive Modbus configuration fields that had no runtime effect.
- Added regression tests for the repository inclusion requirements and polling interval boundaries.

### 1.2.3 (2026-08-11)

- Added the missing `info` channel required by the instance information states.
- Corrected the `devices` container from `channel` to `folder` so device objects have a valid ioBroker parent.
- Added regression tests for both object hierarchy requirements.
- Existing state IDs and values remain unchanged.


### 1.2.2 (2026-08-10)

- Limited the adapter news history to the seven entries supported by the ioBroker repository builder.
- Added mandatory release checks for version metadata, release notes and the README changelog.
- Kept adapter runtime behavior unchanged.

### 1.2.1 (2026-08-10)

- Removed the deprecated `common.title` metadata in favor of `common.titleLang`.
- Replaced the direct npm installation command with ioBroker Admin installation guidance.
- Kept adapter runtime behavior unchanged.

### 1.2.0 (2026-08-10)

- Added automatically assigned battery models with documented nominal and usable capacities.
- Added SAX-reported and adapter-calculated equivalent full cycles per device and for the complete system.
- Added persistent, transparent battery-health estimation from qualified discharge runs, including valid, required and rejected run counters.
- Added the separate `devices.<serial>.*` and `summary.*` object structures and automatic cleanup of obsolete root objects.
- Redesigned the administration interface and fixed password persistence when saving unrelated settings.
- Documented health formulas, validation rules, object paths, data sources and known limitations in `docs/BATTERY.md` and the object references.

### 1.1.2 (2026-08-05)

- Updated the public project identity and maintainer contact.
- Corrected the donation address shown in the administration interface.
- Aligned the Node.js 22 TypeScript dependency declaration with ioBroker repository requirements.


### 1.1.1 (2026-08-05)

- Added detailed SAX Power Cloud connection states and HTTP status reporting.
- Improved authentication error messages, including guidance to re-enter and save the password after upgrading from an older adapter version.
- Updated the React admin interface with clear connection, authentication, timeout, network and server status messages.
- Updated `@tsconfig/node22` to 22.0.5 and removed the remaining backend ESLint warning.

### 1.1.0 (2026-08-05)

- Update the TypeScript configuration from `@tsconfig/node20` to `@tsconfig/node22`
- Commit the compiled backend to support direct GitHub installations
- Remove the unsupported `common.noGit` property
- Optimize the build workflow so admin dependencies are installed only once per full check
- Clean up conflicting and malformed `.gitignore` rules
- Keep runtime behavior and the existing SAX Power functionality unchanged


### 1.0.1 (2026-08-04)

- Require Node.js 22 or newer
- Raise the required ioBroker Admin version
- Align package metadata with current ioBroker repository requirements
- Modernize GitHub Actions and Dependabot configuration
- Replace the deprecated Dependabot auto-merge action
- Configure npm dependency cooldown and include the separate admin project
- Correct encrypted and protected native password declarations
- Remove unused template translations and obsolete `jsonConfig.json`
- Mark generated build files correctly for GitHub installations
- Replace the plain API request timer with `AbortSignal.timeout()`
- Keep the existing React administration interface and runtime behavior unchanged

### 1.0.0 (2026-08-03)

- Initial public release
- Automatic discovery of SAX Power systems
- Live monitoring
- Historical energy statistics
- Aggregated values across multiple systems
- Responsive React-based admin interface
- Optional Modbus configuration
- Comprehensive project documentation

## License

Copyright (c) 2026 GodHunter godhunter@posteo.de

MIT License

See [LICENSE](LICENSE) for the complete license text.