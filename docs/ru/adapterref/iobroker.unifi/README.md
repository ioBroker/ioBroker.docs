---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: TTW2nHsM7XdfqKl3Pj83+8zqiccTDN6PF2+tYNSbctA=
---
![Количество установок](http://iobroker.live/badges/unifi-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.unifi/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/unifi/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi.svg)

<img height="100px" src="admin/unifi.svg" align="left"><br/>

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

### Состояния фильтра

Для каждого типа информации можно выбрать создаваемые состояния. Если ничего не выбрано, создаются все состояния. Состояния, необходимые для выбранного состояния, добавляются автоматически, например... `last_seen_by_uap` и `last_seen_by_usw` для `is_online`.

## Контроль

### Включение/отключение Wi-Fi

Изменив состояние «включено» сети Wi-Fi, можно включить или выключить её. Через несколько секунд изменения будут применены к точкам доступа.

### Создание ваучера

Используя `vouchers.create_vouchers` С помощью этой кнопки можно создавать предопределенные ваучеры. Можно настроить количество создаваемых ваучеров, срок их действия, а также установить ограничения на загрузку и скачивание.

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
### 1.0.2 (2026-09-24)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (@FiraSenax) Controller sessions are reused and the polling loop keeps running after errors, new diagnostic states in `info` [#989]
- (@GermanBluefox) A failing endpoint or site no longer aborts the whole refresh
- (@GermanBluefox) Fixed polling stopping after `trigger_update` overlapped a scheduled refresh
- (@GermanBluefox) Migrated the settings page to JSON config
- (@GermanBluefox) Fixed creating vouchers: the settings were passed in the wrong order since node-unifi 2
- (@GermanBluefox) The adapter was refactored to TypeScript. It can be installed from npm only, not from GitHub

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