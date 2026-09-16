---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: sswOccacr+6lKe3YV4FYXPd6dARDEj4f62Pg6PAcYJ0=
---
![Количество установок](http://iobroker.live/badges/unifi-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.unifi/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/unifi/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi.svg)

<img height="100px" src="admin/unifi.png" align="left"><br/>

# ioBroker.unifi

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Этот адаптер ioBroker позволяет осуществлять мониторинг и ограниченное управление [устройствами UniFi](http://www.ubnt.com/) , такими как точки доступа Wi-Fi UniFi, с помощью общедоступного веб-API контроллера UniFi.

## Конфигурация

### Минимально необходимая информация

Для запуска и работы этого адаптера необходима следующая информация:

- IP-адрес и порт вашего контроллера UniFi (оставьте поле порта пустым, если ваш контроллер работает на UniFiOS (например, UDM-Pro)).
- Локальное имя пользователя и пароль (двухфакторная аутентификация **не** поддерживается)
- Интервал обновления

По умолчанию информация обновляется каждые 60 секунд. В зависимости от вашего оборудования ioBroker и размера вашей сети (количество клиентов, устройств UniFi и т. д.) рекомендуется сохранять этот интервал и не уменьшать его далее.

### Фильтрация объектов

Адаптер обновляет максимально возможный объем информации с вашего контроллера UniFi, но предоставляет возможность ограничить объем обновляемой информации.

Можно отключить обновление выбранной информации или отфильтровать определенные объекты этой информации.

| Информация | Объекты, которые можно фильтровать по |
| ---------- | ------------------------------------- |
| Клиенты    | Имя, имя хоста, IP-адрес, MAC-адрес   |
| Устройства | Имя, IP-адрес, MAC-адрес              |
| Wi-Fi      | Имя                                   |
| Сети       | Имя                                   |
| Здоровье   | Подсистема                            |

## Контроль

### Включение/отключение Wi-Fi

Изменив состояние «включено» сети Wi-Fi, можно включить или выключить её. Через несколько секунд изменения будут применены к точкам доступа.

### Создание ваучера

Используя`vouchers.create_vouchers` С помощью этой кнопки можно создавать предопределенные ваучеры. Можно настроить количество создаваемых ваучеров, срок их действия, а также установить ограничения на загрузку и скачивание.

## Отсутствующие данные

Адаптер использует [node-unifi](https://github.com/jens-maus/node-unifi) для подключения к вашему контроллеру UniFi. Для упрощения процесса не все доступные точки данных загружаются в ваш ioBroker. Если у вас отсутствуют какие-либо точки данных, используйте следующие URL-адреса для проверки API. (Примечание: вам необходимо заменить IP, PORT и SITE на ваши настройки)

| Информация   | URL API                                       |
| ------------ | --------------------------------------------- |
| Сайты        | <https://IP:PORT/api/self/sites>              |
| SysInfo      | <https://IP:PORT/api/s/SITE/stat/sysinfo>     |
| Клиенты      | <https://IP:PORT/api/s/SITE/stat/sta>         |
| Устройства   | <https://IP:PORT/api/s/SITE/stat/device>      |
| Wi-Fi        | <https://IP:PORT/api/s/SITE/rest/wlanconf>    |
| Сети         | <https://IP:PORT/api/s/SITE/rest/networkconf> |
| Здоровье     | <https://IP:PORT/api/s/SITE/stat/health>      |
| Ваучеры      | <https://IP:PORT/api/s/SITE/stat/voucher>     |
| ДПИ          | <https://IP:PORT/api/s/SITE/stat/dpi>         |
| Сигнализация | <https://IP:PORT/api/s/SITE/stat/alarm>       |

### Конечные устройства UniFiOS (UDM-Pro)

| Информация   | URL API                                                |
| ------------ | ------------------------------------------------------ |
| Сайты        | <https://IP/proxy/network/api/self/sites>              |
| SysInfo      | <https://IP/proxy/network/api/s/SITE/stat/sysinfo>     |
| Клиенты      | <https://IP/proxy/network/api/s/SITE/stat/sta>         |
| Устройства   | <https://IP/proxy/network/api/s/SITE/stat/device>      |
| Wi-Fi        | <https://IP/proxy/network/api/s/SITE/rest/wlanconf>    |
| Сети         | <https://IP/proxy/network/api/s/SITE/rest/networkconf> |
| Здоровье     | <https://IP/proxy/network/api/s/SITE/stat/health>      |
| Ваучеры      | <https://IP/proxy/network/api/s/SITE/stat/voucher>     |
| ДПИ          | <https://IP/proxy/network/api/s/SITE/stat/dpi>         |
| Сигнализация | <https://IP/proxy/network/api/s/SITE/stat/alarm>       |

## Известные проблемы

- Состояние is\_wired у клиентов отображается некорректно после того, как клиент отключился от сети. Это известная проблема контроллера UniFi и не связана с адаптером. (см. [https:// community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1](https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1) )

## Ссылки

Этот адаптер использует функциональность следующих сторонних модулей Node.js:

- [node-unifi](https://github.com/jens-maus/node-unifi)
- [json-logic-js](https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 0.7.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.6.7 (2023-12-10)
* (jens-maus) updated node-unifi to 2.5.1 to fix UDMpro v3.2.x auth issues
* (jens-maus) updated dependencies

### 0.6.6 (2023-06-20)
* (pafade89) fixed broken client status updates (#672)

### 0.6.5 (2023-06-20)
* (jens-maus) Bumped node-unifi to latest 2.4.1

### 0.6.4 (2023-03-31)
* (jens-maus) Bumped node-unifi to latest 2.4.0
* (wuliwux) fixed issue in setWlanStatus not working (#665, #601)
* (pafade89) New feature for whitelisting client objects (#651)
* (Scrounger) client block / unblock added
* (Scrounger) restart device added
* (Scrounger) led override added
* (Scrounger) port power cycle added

### 0.6.3 (2022-10-08)
* (jens-maus) Bumped node-unifi to latest 2.2.1 (fixes #613)

### 0.6.2 (2022-10-07)
* (jens-maus) Bumped node-unifi to latest 2.2.0
* (maximilian-1) port-overrides structures added
* (Scrounger) poe power switch added
* (Scrounger) client reconnect added

### 0.6.1 (2022-06-08)
* (jens-maus) Bumped node-unifi to latest 2.1.0
* (jens-maus) updated translations

### 0.6.0 (2022-06-05)
* IMPORTANT: js-controller 2.0 or higher is required
* IMPORTANT: If Login do not work please re-enter the password in the instance configuration
* (Apollon77) Migrate to new version of unifi library
* (Apollon77) Allow to specify if SSL error should be ignored or not  (Default is to ignore errors as in former versions)
* (jens-maus) Fixed more device state object definitions to get rid of state warnings.
* (jens-maus/Apollon77) Updated dependencies, make compatible to newest firmwares

### 0.5.10 (2021-05-27)
* (jens-maus) Changed "Update done" output to be output as debug info.
* (jens-maus) Updated dependencies.

### 0.5.9 (2021-05-07)
* (jens-maus) Fixed all js-controller 3.3 related state warnings
* (kirovilya, jens-maus) Added device state object with dedicated states list.
* (jens-maus) Updated node-unifi to latest version
* (jens-maus) Updated dependencies

### 0.5.8 (2020-08-29)
* (braindead1) Fixed problems related to unused sites
* (braindead1) Fixed some errors reported via Sentry

### 0.5.7 (2020-07-27)
* (braindead1) Fixed Sentry errors caused by not updated configuration after update

### 0.5.6 (2020-07-25)
* (Scrounger, braindead1) Implemented Alarms, DPI & Gateway Traffic
* (braindead1) Prevented creation of ghost clients caused by iOS MAC randomization
* (dklinger) Implemented manual update trigger
* (braindead1) Implemented deletion of used vouchers
* (braindead1) Fixed some errors reported via Sentry

### 0.5.5 (2020-06-13)
* (braindead1) Fixed some errors reported via Sentry

### 0.5.4 (2020-06-06)
* (braindead1) Implemented offset for is_online
* (braindead1) Fixed some issues related to is_online
* (braindead1) Prepared whitelisting of clients etc.

### 0.5.2 (2020-05-23)
* (jens-maus) Implemented UniFiOS/UDM-Pro support
* (braindead1) Implemented possibility to enable/disable WLANs
* (braindead1) Implemented voucher creation
* (braindead1) Implemented online state for clients
* (braindead1) Updated client states
* (braindead1) Updated device states
* (braindead1) Improved error messages

### 0.5.0 (2020-05-09)
* (braindead1) Implemented configuration of updates
* (braindead1) Improved JsonLogic
* (braindead1) Removed legacy code
* (braindead1) Implemented Sentry

### 0.4.3 (2020-04-24)
* (braindead1) fixed configuration issue

### 0.4.2 (2020-04-23)
* (braindead1) subsystem issue fixed

### 0.4.1 (2020-04-16)
* (braindead1) Enhanced refactoring

### 0.4.0 (2020-04-16)
* (bluefox) Refactoring

### 0.3.1
* (jens-maus) added support for multi-site environments.

### 0.3.0
* (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
* (jens-maus) minor fixes

### 0.2.0
* (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
* (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
* (jens-maus) initial checkin of non-working development version

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.unifi/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2023 Jens Maus &lt;mail@jens-maus.de&gt;
Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.