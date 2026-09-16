---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.soliscloud/README.md
title: без названия
hash: TLCd97ICrx+ZHSrHnS8taRGxSkQwXK/Sx7cgHziilyE=
---
![Логотип](../../../en/adapterref/iobroker.soliscloud/admin/solis.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.soliscloud)
![Известные уязвимости](https://snyk.io/test/github/Trixx34/ioBroker.soliscloud/badge.svg)

## Адаптер SolisCloud для IOBroker

Данная интеграция основана на следующей интеграции Home Assistant: <https://github.com/hultenvp/solis-sensor>

Для получения необходимых данных для использования интеграции необходимо выполнить следующие шаги:

Создайте заявку в службу поддержки Ginlong, чтобы запросить включение доступа к API для вашей учетной записи, и дождитесь подтверждения изменения. Контактную информацию для вашего региона можно найти здесь: <https://www.solisinverters.com/global/contactus.html>

- Перейдите по ссылке <https://www.soliscloud.com/#/apiManage> .
- Активируйте управление API и согласитесь с условиями использования.
- После активации нажмите «Просмотреть ключ», чтобы появилось всплывающее окно с запросом кода подтверждения.
- Сначала нажмите на кнопку «Проверочный код», после чего появится изображение с двумя элементами пазла, которые нужно совместить, используя ползунок ниже.
- После этого вы получите электронное письмо с кодом подтверждения, который необходимо ввести (в течение 60 секунд).
- После подтверждения вы получите идентификатор API, секретный ключ и URL-адрес API.
- Идентификатор станции, который необходимо ввести в настройках, — это идентификатор, найденный в URL-адресе после входа в систему. Например: soliscloud.com/#/station/stationdetail\_1?id= **123486816843454864**

Этот адаптер будет считывать несколько значений, доступных через API Soliscloud, и сохранять их для использования в ioBroker. Чтобы запросить дополнительные значения, вы можете сделать это одним из следующих способов:

- Оставьте свой комментарий на форуме ioBroker здесь: <https://forum.iobroker.net/topic/69026/new-adapter-soliscloud/37>
- Напишите мне на <trixxdev034@gmail.com>
- Создайте заявку на GitHub.

API возвращает и другие значения, которые можно добавить, но на данный момент этих мне достаточно.

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы Trixx <trixxdev034@gmail.com> , который разработал предыдущие версии этого адаптера.

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.4.2 (2024-01-24)

- Adjustment in logging.

### 1.4.1 (2024-01-21)

- Removed test code that logged (lots of) errors.

### 1.4.0 (2024-01-11)

- Switched to ioBrokers sentry plugin instead of own implementation.
- Removed setting for own implementation of Sentry.
- All informational logging can now be turned off in settings.

### 1.3.5 (2023-12-28)

- Added option to send stacktraces
- improved errorhandling

### 1.3.4 (2023-12-27)

- Allow for EPM debug logging to be turned off.

### 1.3.3 (2023-12-27)

- Added settings to test EPM API Call. Result is logged, not processed at the moment.

### 1.3.1 (2023-11-10)

- Plant_state wasn't processed correctly

### 1.3.0 (2023-11-02)

- Added more values

### 1.2.5 (2023-11-01)

- attempt 2 to fix values

### 1.2.4 (2023-11-01)

- 2 values weren't updated correctly

### 1.2.3 (2023-11-01)

- Typo in main which caused application crashes

### 1.2.2 (2023-11-01)

- Typo in main which caused application crashes

### 1.2.1 (2023-11-01)

- added ack to value updates.

### 1.2.0 (2023-11-01)

- Adjusted processing of inverter API call.
- Fixed logging for API calls
- improved error handling
- write attribute set to false for all objects.

### 1.1.6 (2023-31-10)

- Added new values:
  from the Power Station List:
  batteryTodayDischargeEnergy
  batteryTodayChargeEnergy
  homeLoadTodayEnergy
  state
  oneSelf

  from the Inverter List:
  eToday
  etodayStr
  state

### 1.1.5 (2023-30-10)

- Updated minimum node version.
- Limited input to numerical values only for the plantID.
- removed some unneeded settings.
- updated translations.

### 1.1.4 (2023-24-10)

- Fixed issues with translations.

### 1.1.3 (2023-15-10)

- Switched to setInterval -> https://github.com/Trixx34/ioBroker.soliscloud/issues/12

### 1.0.3 (2023-15-10)

- Removed console logging
- Removed unused onStateChange handler
- Adjusted state-id naming
- Added units to values
- Added plant ID as root folder for objects

### 1.0.2 (2023-11-10)

- Translations
- Removed some unneeded files.

### 1.0.1 (2023-10-09)

- Fixed issue where pollinterval wasn't checked/used

### 1.0.0 (2023-10-09)

- Split api logic in separate files
- various updates to comply with publishing rules
- Initial release!

## License

MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 Trixx trixxdev034@gmail.com

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