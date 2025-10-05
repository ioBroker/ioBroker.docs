---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ping/README.md
title: Адаптер PING
hash: Ik1WbI1tFqu04+qoinEQuD6k2cb0P2D71rgyUPQwaiU=
---
![Логотип](../../../en/adapterref/iobroker.ping/admin/ping.png)

![Количество установок](http://iobroker.live/badges/ping-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.ping.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ping.svg)

# Адаптер PING
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Пингует настроенные IP-адреса.
Осуществляет пингование указанных IP-адресов с заданным интервалом и отслеживает результаты.

Вы также можете отслеживать TCP-порты, указав номер порта после IP-адреса через двоеточие (например, `192.168.1.1:80` или `google.com:443`). Это позволит проверить доступность порта вместо использования ICMP-пинга.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

## Пинг с адаптера JavaScript
Вы можете выполнить ping любого IP-адреса из адаптера JavaScript с помощью команды:

```js
sendTo('ping.0', 'ping', '192.168.1.1', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1", "alive": true, "ms": 250}}
});
```

Вы также можете проверить TCP-порты:

```js
sendTo('ping.0', 'ping', '192.168.1.1:80', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1:80", "alive": true, "ms": 15}}
});
```

## Известные проблемы
- если не удаётся выполнить ping вашего Linux-клиента, проверьте, правильно ли установлен `iputils-ping` на клиенте.

- команда `ping` в Linux требует прав root.

Вы можете предоставить адаптеру права на выполнение команды `ping` от имени пользователя root.

Для этого необходимо добавить следующую строку в файл `/etc/sudoers` с командой `sudo visudo`: `iobroker ALL=(ALL) NOPASSWD: /bin/ping`.

Или вы можете разрешить выполнение ping с помощью команды `sudo setcap cap_net_raw+ep /bin/ping`.

Вам необходимо установить `setcap` с `sudo apt-get install libcap2-bin` до того, как `setcup` не будет найден.

## Проверка порта TCP
Начиная с версии 1.8.0 вы также можете проверить TCP-порты, указав номер порта после IP-адреса через двоеточие (например, `192.168.1.1:80`).

Адаптер проверит доступность порта TCP вместо использования ICMP-пинга.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 1.8.0 (2025-10-05)

- (@GermanBluefox) Removed admin 4,5 support
- (@GermanBluefox) Updated dependencies
- (@GermanBluefox) Added possibility to probe TCP ports

### 1.7.9 (2024-10-01)

- (@GermanBluefox) Small changes the layout of the dynamic messages

### 1.7.8 (2024-09-28)

- (@GermanBluefox) Used `iobroker/eslint-config`
- (@GermanBluefox) Fixed some errors with `setcup`
- (@GermanBluefox) Corrected admin notification

### 1.7.6 (2024-09-21)

- (@GermanBluefox) Corrected notification message

### 1.7.5 (2024-09-18)

- (@GermanBluefox) Corrected small error about range length

### 1.7.4 (2024-09-17)

- (@GermanBluefox) Added support for dynamic notifications
- (@GermanBluefox) Added custom range settings

### 1.7.3 (2024-08-25)

- (@GermanBluefox) Added the functionality to poll the address range periodically

### 1.7.1 (2024-08-25)

- (@GermanBluefox) Added resolution of IP addresses to MAC addresses

### 1.7.0 (2024-08-17)

- (@GermanBluefox) Added possibility to browse the IP ranges

### 1.6.4 (2024-07-17)

- (@GermanBluefox) Added possibility to execute `setcap` command to allow ping without root rights

### 1.6.3 (2024-07-16)

- (@GermanBluefox) Updated the packages

### 1.6.2 (2023-07-19)

- (McM1957) Handling of state updates causing crashes with js-controller 5 has been corrected. (Issue #106)
- (McM1957) Trailing spaces are now removed from ip address and name. Trailing spaces blocked correct operation. (Issue #98)
- (@GermanBluefox) Added JSON config
- (@GermanBluefox) Added different intervals for online and offline devices
- (@GermanBluefox) implemented export/import of devices

### 1.5.3 (2022-02-24)

- (Apollon77) Fix the ping retry logic

### 1.5.2 (2022-01-20)

- (basti4557) Number of retries can be defined if a ping request failed. This should minimize wrong offline detection.

### 1.5.0 (2021-07-14)

- js-controller 2.0 required at least
- (Apollon77) optimize for js-controller 3.3

### 1.4.12 (2020-09-18)

- (Apollon77) Prevented a crash case when no devices are defined (Sentry IOBROKER-PING-R)

### 1.4.11 (2020-08-26)

- (Apollon77) update js-controller dependency to correct version (1.5.8)

### 1.4.8 (2020-06-29)

- (Apollon77) Prevent adapter crashes with invalid state/channel names, see error log! (Sentry IOBROKER-PING-H, IOBROKER-PING-P, IOBROKER-PING-B)

### 1.4.7 (2020-05-02)

- (Apollon77) finally try to catch spawn errors (Sentry IOBROKER-PING-2)

### 1.4.6 (2020-04-29)

- (Apollon77) Make sure the adapter does not crash if ping command cannot be executed (Sentry)
- (Apollon77) Catch error when `ping.probe` could not be started (Sentry IOBROKER-PING-2)

### 1.4.5 (2020-04-23)

- (Apollon77) Fixed a potential crash case (Sentry)

### 1.4.4 (2020-04-17)

- (@GermanBluefox) Added support for Admin3

### 1.4.3 (2020-04-17)

- (Apollon77) Add Sentry for js-controller 3.0
- (Apollon77) update dependencies

### 1.4.2 (2020-01-23)

- (JayVee2) Sort the IP addresses

### 1.4.1 (2019-01-08)

- (simatec) supported compact mode

### 1.4.0 (2018-01-25)

- (vdemidov) refactored, added ping time and roundtrips per second for every host

### 1.3.2 (2017-09-20)

- (ldittmar) object values are converted to the valid type

### 1.3.0 (2017-02-21)

- (@GermanBluefox) allowed removing host name from state's name

### 1.2.0 (2016-12-09)

- (@GermanBluefox) change configuration dialog

### 1.1.3 (2016-11-16)

- (@GermanBluefox) catch error if no IP defined

### 1.1.1 (2016-04-10)

- (@GermanBluefox) remove ms

### 1.1.0 (2016-04-10)

- (@GermanBluefox) rewrite ping for windows

### 1.0.0 (2016-04-03)

- (@GermanBluefox) support for freebsd and all windows languages
- (@GermanBluefox) add tests

### 0.1.3 (2015-01-26)

- (@GermanBluefox) Fixed the error if the configuration changed

### 0.1.2 (2015-01-14)

- (@GermanBluefox) Fixed the configuration page

### 0.1.1 (2015-01-03)

- (@GermanBluefox) Enabled npm install

### 0.1.0 (2014-11-26)

- (@GermanBluefox) Used ping npm module instead of static one

### 0.0.5 (2014-11-21)

- (@GermanBluefox) Made possible to have shorter ping intervals (down to 5 seconds)

### 0.0.4 (2014-11-07)

- (@GermanBluefox) fix ping node

### 0.0.3 (2014-11-03)

- (@GermanBluefox) fix ping node (do not forget to remove package from git when the npm gets the update)

### 0.0.1 (2014-11-02)

- (@GermanBluefox) support of server (actually no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2025, @GermanBluefox <dogafox@gmail.com>

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