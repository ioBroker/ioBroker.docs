---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.energy-tracker/README.md
title: ioBroker.energy-tracker
hash: n55Qf5xNASOOJMjfcnMUc0QoYCHIL7D+SDwykDxQuF4=
---
![Логотип](../../../en/adapterref/iobroker.energy-tracker/admin/energy-tracker.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.energy-tracker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.energy-tracker.svg)
![Инсталляции](https://iobroker.live/badges/energy-tracker-installed.svg)
![Стабильная версия](https://iobroker.live/badges/energy-tracker-stable.svg)

# IoBroker.energy-tracker
Адаптер для передачи показаний счетчиков на платформу Energy Tracker.
Он периодически передает значения из настроенных состояний ioBroker, используя общедоступный REST API.

## Требования
1. **Зарегистрируйте учетную запись:**

   👉 [Создайте свой аккаунт](https://www.energy-tracker.best-ios-apps.de/en-US/register)

2. **Создайте персональный токен доступа** (требуется вход в систему)

   👉 [Сгенерировать токен](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Faccess-token)

3. **Получите идентификаторы устройств из документации API** (требуется вход в систему)

   👉 [API-документация](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Frest-api)

## Конфигурация
В адаптере необходимо настроить следующие поля:

- **Персональный токен доступа**
- **Список устройств** с:
- `deviceId` (идентификатор устройства Energy Tracker)
- `sourceState` (состояние ioBroker, которое обеспечивает чтение)
- Включить округление значений

**Кроме того, необходимо создать расписание в ioBroker для запуска адаптера через регулярные промежутки времени.** Без расписания адаптер не будет автоматически извлекать и передавать какие-либо данные.

## Безопасность
- Токен доступа хранится в зашифрованном виде.
- Данные только **отправляются** – показания не извлекаются.

## Changelog

### 0.2.8

- Improved API reliability, added request timeout, and addressed review feedback.

### 0.2.7

- Updated ESLint to v9, fixed repository URL in package.json, and improved test coverage.

### 0.2.6

- Added README note: schedule required in ioBroker.

### 0.2.5

- Updated dependencies for testing and added Node.js v24 to adapter tests.

### 0.2.4

- Removed old news entries (fix W132 warning)

### 0.2.3

- Reduced build size

### 0.2.2

- Improved support for integration testing

### 0.2.1

- Added default schedule configuration for scheduled adapter mode

### 0.2.0

- Changed adapter type to 'schedule' to reflect intended usage. Fixed repository metadata and added missing GitHub test workflows.

### 0.1.3

- Fixed repository metadata and performed required minor adjustments

### 0.1.2

- Fixed repository metadata and performed required minor adjustments

### 0.1.1

- Fixed repository metadata

### 0.1.0

- Initial version with full Admin UI configuration
- Supports multiple devices and configurable intervals

## License

MIT – see [LICENSE](LICENSE).

Copyright (c) 2017-2025 Bluefox <dogafox@gmail.com>
Copyright (c) 2015-2025 energy-tracker support@best-ios-apps.de