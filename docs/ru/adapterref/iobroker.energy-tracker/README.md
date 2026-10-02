---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.energy-tracker/README.md
title: ioBroker.energy-tracker
hash: kpvqsRIOq80zlKCNoWG8YM/HNWiza2ioU3BdfMFdbzc=
---
![Логотип](../../../en/adapterref/iobroker.energy-tracker/admin/energy-tracker.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.energy-tracker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.energy-tracker.svg)
![Установки](https://iobroker.live/badges/energy-tracker-installed.svg)
![Стабильная версия](https://iobroker.live/badges/energy-tracker-stable.svg)

# ioBroker.energy-tracker

Адаптер для передачи показаний счетчика на платформу Energy Tracker.\
&#x20;Он периодически передает значения из настроенных состояний ioBroker, используя общедоступный REST API.

## Требования

Требуется Node.js версии 22 или новее, ioBroker js-controller версии 6.0.11 или новее и ioBroker Admin версии 7.6.20 или новее.

1. **Зарегистрируйте аккаунт:**\
   &#x20;👉 [Создайте свою учетную запись](https://www.energy-tracker.best-ios-apps.de/en-US/register)

2. **Создайте персональный токен доступа** (требуется вход в систему).\
   &#x20;👉 [Сгенерировать токен](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Faccess-token)

3. **Получите идентификаторы своих устройств из документации API** (требуется вход в систему).\
   &#x20;👉 [Документация API](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Frest-api)

## Конфигурация

В адаптере необходимо настроить следующие поля:

- **Персональный токен доступа** с разрешением на создание показаний счетчика.
- **Список устройств** , содержащий:
  - `deviceId` (Идентификатор устройства Energy Tracker)
  - `sourceState` (Состояние ioBroker, обеспечивающее получение данных)
  - Включите округление значений на стороне сервера.
- **Количество попыток после истечения таймаута:** 0 (отключено), 1 или 2, с настраиваемой задержкой от 1 до 60 секунд. Запросы по-прежнему истекают через 10 секунд. В случае конфликта после истечения таймаута необходимо проверить показания в Energy Tracker.

Исходные данные могут содержать числа или простые десятичные строки. Используйте десятичные строки, если требуется точная десятичная точность. Значения обрезаются до шести знаков после запятой, установленных API, перед отправкой; `allowRounding` контролирует округление показаний счетчика на стороне сервера с точностью до заданного значения.

**Кроме того, необходимо создать расписание в ioBroker для запуска адаптера через регулярные интервалы времени.**\
&#x20;Без заданного расписания адаптер не будет автоматически получать или передавать данные.

## Безопасность

- Токен доступа хранится в зашифрованном виде.
- Данные только **передаются** — показания не извлекаются.

## Changelog

### 1.0.0

**Before upgrading:** Node.js 22 or newer, ioBroker js-controller 6.0.11 or newer and ioBroker Admin 7.6.20 or newer are required.

- Send readings through the Energy Tracker SDK and API v3.
- Truncate readings to six decimal places before sending.
- Fix connection status for failed or incomplete batches.
- Add optional timeout retries with a fixed reading timestamp.
- Require Node.js 22 or newer and test on Node.js 22, 24 and 26.
- Update dependencies, release tools and adapter metadata.
- Publish releases through npm trusted publishing.

### 0.3.1

- Cleaned up dev dependencies and updated the admin adapter to version 7.6.17.

### 0.3.0

- Updated all adapter dependencies to current stable versions.
- Updated the API endpoint for submitting meter readings to the new v2 API.
- General maintenance and compatibility improvements.

### 0.2.8

- Improved API reliability, added request timeout, and addressed review feedback.

### 0.2.7

- Updated ESLint to v9, fixed repository URL in package.json, and improved test coverage.

## License

MIT – see [LICENSE](https://github.com/energy-tracker/ioBroker.energy-tracker/blob/main/LICENSE).

Copyright (c) 2017-2026 Bluefox <dogafox@gmail.com>  
Copyright (c) 2015-2026 energy-tracker support@energy-tracker.app