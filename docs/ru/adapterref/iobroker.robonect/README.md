---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.robonect/README.md
title: ioBroker.robonect
hash: Phfc2fvE8Sol/iBhoSudN5DawNTpFAnvBZKh1MB1UcI=
---
# ioBroker.robonect

![НПМ](https://nodei.co/npm/iobroker.robonect.png?downloads=true)
![Количество установок](http://iobroker.live/badges/robonect-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.robonect.svg)
![Тестирование и выпуск](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/codeql.yml/badge.svg)

![Логотип](../../../en/adapterref/iobroker.robonect/admin/robonect.png)

Это адаптер ioBroker для вашей газонокосилки с поддержкой Robonect HX.

- Тестирование проводилось с использованием Robonect v1.1b (с ZeroConf v1.4) и Gardena R70Li.
- Также было проведено тестирование с Robonect v1.3b (с ZeroConf v1.9) и Gardena R40Li.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Настройки

- Необходимо ввести IP-адрес (например, 192.168.xx) или имя хоста (например, robonect-D247BF) или полное доменное имя (например, robonect-D247BF.fritz.box) модуля Robonect. Если указаны имя пользователя и пароль, они также обязательны для ввода.
- ioBroker.robonect опрашивает данные с разными интервалами: по умолчанию информация о состоянии опрашивается каждые 60 секунд (1 минуту), а остальная информация — каждые 900 секунд (15 минут).
- Можно настроить два периода ожидания, чтобы предотвратить опрос, например, в полдень и ночью. Информация, которую можно опросить, не разбудив газонокосилку (и не заставив её издать звуковой сигнал), всё равно будет опрашиваться.
- Для каждого API-запроса можно выбрать интервал опроса (статус или информация) или вообще не опрашивать.
- Служба push-уведомлений: при активации выберите IP-адрес и порт, на котором адаптер должен принимать запросы.

### Пароль для Robonect

В версиях старше 1.3.0 требовался простой пароль, состоящий только из строчных и заглавных букв, а также цифр. Начиная с версии 1.3.0, стало возможным использование надежных паролей благодаря внедрению базовой HTTP-аутентификации.

### Push-сервис

В модуле Robonect есть опция конфигурации "Push Service" — она отправляет информацию о состоянии в зависимости от настраиваемых событий. При активации адаптер будет получать push-уведомления при наступлении одного из этих событий. С этой опцией можно использовать гораздо более длительные интервалы опроса, чем по умолчанию (например, 6-12 часов для статуса и 24 часа для информации). Эти данные также необходимо настроить в модуле Robonect. Даже если вы прослушиваете все IP-адреса (0.0.0.0), вам необходимо настроить реальный IP-адрес в Robonect. Формат IP-адреса выглядит примерно так: 192.168.xx:Port

- В Robonect можно выбрать GET или POST — оба варианта работают и дают абсолютно одинаковый результат.
- Имя пользователя и пароль не требуются.

Поскольку передается лишь часть информации о состоянии (сигнал WLAN, статус, остановка, режим, продолжительность, часы, расстояние и состояние батареи), по-прежнему требуется получать данные, например, для получения статуса модуля.

### Конфигурация службы Push должна выглядеть следующим образом.

#### Конфигурация администратора

![изображение](../../../en/adapterref/iobroker.robonect/admin/Push-Service-Adapter.png)

#### Конфигурация Robonect

![изображение](../../../en/adapterref/iobroker.robonect/admin/Push-Service-Robonect.png)

## Контроль

### Режим

Режим работы газонокосилки можно контролировать, изменяя параметр robonect.0.status.mode. Возможные режимы: «Авто», «Домой», «Ручной», «Конец дня» и «Задание» (пока не полностью реализовано).

### Расширения

Можно управлять дополнительными выводами GPIO 1, GPIO 2, OUT 1 и OUT 2 модуля Robonect. Необходимо, чтобы режим работы дополнительного вывода был настроен как "API" через веб-интерфейс Robonect. Например, если к OUT1 подключены светодиоды, их можно включать ночью и выключать утром, установив параметр Robonect.0.extension.out1.status в значение "true" или "false".

## Известные проблемы:

- Чтобы убедиться в доступности Robonect, адаптер сначала отправляет пинг на устройство, прежде чем отправлять какие-либо запросы. Этот пинг может завершиться неудачей, особенно если ioBroker установлен в контейнере. Это не проблема самого адаптера, но поскольку такое может произойти, и найти решение довольно сложно, попробуйте выполнить следующее:`sudo chmod 4755 /bin/ping` в оболочке внутри контейнера ioBroker. Это решение предполагает наличие проблемы с правами доступа между пользователем ioBroker и утилитой ping.

## Changelog
### 1.4.2 (2024-10-01)
- (grizzelbee) Fix: Minor fix in readme.md for release script

### 1.4.1 (2024-09-30)
- (grizzelbee) New: Added ioBroker adapter release script
- (grizzelbee) Fix  [#18](https://github.com/Grizzelbee/ioBroker.robonect/issues/48): Fixed some issues mentioned by adapter-checker

### 1.4.0 (2024-09-11)

- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: minor fixes for adapter checker the require a minor release

### 1.3.6 (2024-06-21)

- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: minor fixes for AdapterChecker

### 1.3.5 (2024-06-04)

- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: Requires at least admin  v6.13.16
- (grizzelbee) Upd: Requires at least nodeJs v18.0.2
- (grizzelbee) Upd: Updated translations
- (grizzelbee) Upd: Reorganized Admin-UI
- (grizzelbee) New: Added Ping-Option to admin

### 1.3.4 (2023-10-10)

- (grizzelbee) Chg: massive code refactoring 
- (grizzelbee) Fix: Fixed false error message when PushService is listening to all IPv4 or IPv6 addresses
- (grizzelbee) Chg: Forcing pollType info for pushService when enabled it's enabled in config

### 1.3.2 (2023-10-04)

* (grizzelbee) Fix: Switching of extensions works now
* (grizzelbee) Fix: Fixed false error message when switching extensions

### 1.3.1 (2023-10-02)

* (grizzelbee) Chg: removed unnecessary Info log entries

### 1.3.0 (2023-10-02)

* (grizzelbee) Chg: [#28](https://github.com/Grizzelbee/ioBroker.robonect/issues/28) Changed authentication method from URL-Encoding to basic authentication
* (grizzelbee) Chg: [#27](https://github.com/Grizzelbee/ioBroker.robonect/issues/27) Improved error handling
* (grizzelbee) Upd: Dependencies got updated

### 1.2.0 (2023-09-22)

* (mcm1957) Fix: Adapter requires NodeJs >= 16.0.0  
* (crocri)  New: Introduced code to clear errors 
* (crocri)  Upd: Highlighted issues in functions getValueAsync() and testPushServerConfig()
* (grizzelbee) Fix: Fixed functions getValueAsync() and testPushServerConfig()

### 1.1.5 (2023-09-08)

* (grizzelbee) Fix: Command-URL was invalid when Robonect UI wasn't protected by username and password
* (grizzelbee) Upd: minor code refactoring

### 1.1.4 (2023-09-04)

* (grizzelbee) Fix: Attempting to fix the error: Cannot read properties of null (reading 'val')

### 1.1.3 (2023-09-01)

* (grizzelbee) New: Added release script for easier publishing to stable repo

### 1.1.1 (2023-08-24)

* (grizzelbee) Fix: Fixed status.stopped for push messages.

### 1.1.0 (2023-08-23)

* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.robonect/issues/18) Showing values for battery with fractions (again)
* (grizzelbee) New: Added START button
* (grizzelbee) New: Added STOP button
* (grizzelbee) New: Added SERVICE button to reboot, shutdown or sleep Robonect module
* (grizzelbee) New: Push states and interval can be set
* (grizzelbee) New: Nickname of the mower can be set
* (grizzelbee) New: Timers of the mower can be set

### 1.0.5 (2023-08-22)

* (grizzelbee) Upd: Added new state #18 - Garage door is opening
* (grizzelbee) Fix: Status.stopped gets correctly updated

### 1.0.4 (2023-08-22)

* (grizzelbee) Upd: Improved error handling

### 1.0.3 (2023-08-21)

* (grizzelbee) Upd: Improved error handling
* (grizzelbee) Fix: some bug fixes
* (grizzelbee) Upd: Renamed jsonConfig.json5 to jsonConfig.json to get better compatibility

### 1.0.2 (2023-08-18)

* (grizzelbee) Fix: Updated package.json to deliver jasonConfig.json5

### 1.0.1 (2023-08-18)

* (grizzelbee) Upd: Documentation got updated

### 1.0.0 (2023-08-17)

* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Some fixes to make adapter-checker happy
* (grizzelbee) Upd: Updated git workflows
* (grizzelbee) New: Dropped request.js since it's deprecated
* (grizzelbee) New: Replaced request.js by axios.js for http requests
* (grizzelbee) New: Add Webserver for Push-Service API
* (grizzelbee) New: Add adapter-dev support
* (grizzelbee) New: Added snyk plugin
* (grizzelbee) New: Swapped Admin UI to V5

### 0.1.4

* (braindead1) changed polling log level from info to debug
* (braindead1) implemented polling of garage door status

### 0.1.3

* (braindead1) implemented JsonLogic & refactoring

### 0.1.2

* (braindead1) fixed GPS

### 0.1.1

* (braindead1) fixed typo

### 0.1.0

* (braindead1) implemented rest times

### 0.0.12

* (braindead1) improved polling

### 0.0.11

* (braindead1) implemented weather and GPS polls

### 0.0.10

* (braindead1) first stable version

### 0.0.9

* (braindead1) adapter improvements

### 0.0.8

* (braindead1) fixed some issues caused by different configurations

### 0.0.7

* (braindead1) prepared adapter for latest repository

### 0.0.6

* (braindead1) fixed minor issues

### 0.0.5

* (braindead1) updated to work with Robonect HX version 1.1b

### 0.0.4

* (braindead1) updated to work with Robonect HX version 1.0 Beta5

### 0.0.3

* (braindead1) support of Admin3

### 0.0.2

* (braindead1) updated to work with Robonect HX version 1.0 Beta2

### 0.0.1

* (StefSign) initial commit

## License

The MIT License (MIT)

Copyright (c) 2024 grizzelbee

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