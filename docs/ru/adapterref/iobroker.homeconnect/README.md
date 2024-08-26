---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: GTUDvjs9GnT4DlODALr0GeQzsiybVL5aFfRsP8zoFfg=
---
![Логотип](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub фиксирует данные с момента последнего выпуска (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/homeconnect-stable.svg)
![Количество установок](https://iobroker.live/badges/homeconnect-installed.svg)

# IoBroker.homeconnect
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/homeconnect/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск] (https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml) [![CodeQL] (https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml)

## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Адаптер Homeconnect для ioBroker
## Требования перед установкой
Должен быть установлен как минимум Node.js версии 18!

Для адаптера требуется ClientID. Используйте настройки для каждого шага для регистрации.

<https://developer.home-connect.com>

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Для **Учетной записи пользователя Home Connect по умолчанию для тестирования** укажите адрес электронной почты, на который будет отправлено приложение Home Connect.
был зарегистрирован, это также потребуется в дальнейшем в процессе авторизации.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

В поле **Тип учетной записи** выберите Индивидуальный. Добавьте оставшиеся данные, если они доступны (не знаю, будет ли это проверено).

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Затем перейдите в раздел **Приложения**, а затем в раздел **Зарегистрировать приложение**.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

В поле **Идентификатор приложения** введите имя приложения, например. ioБрокер. С помощью **Потока OAuth** выберите «Поток устройства».
**Учетная запись пользователя Home Connect для тестирования** может оставаться пустой. Для параметра **Перенаправление успеха** введите URI, например. https://example.com.
Затем сохраните, и у вас есть необходимый ClientID.

## Конфигурация
Добавьте имя пользователя, пароль и сгенерированный идентификатор cleintId приложения Homeconnect в конфигурацию адаптера.

## Использование
С помощью состояний команд вы можете остановить, приостановить и возобновить программу.
С помощью состояний в настройках вы можете выключить или включить устройство. Изменение значения program.active.BSH_Common_Root_ActiveProgram приводит к запуску программы. Обновление iQ300: В этой переменной необходимо указать имя программы. Если программы.selected.BSH_Common_Root_SelectedProgram скопированы, пользователь машины может заранее определить нужную программу на машине, и она будет запущена через ioBroker. Изменение значения программы.selected.BSH_Common_Root_SelectedProgram приведет к выбору программы или параметров.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.0 (2024-04-18)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.3.0 (2023-12-15)

- fix login

### 1.2.2 (2023-12-02)

- bump version

### 1.2.1 (2023-12-02)

- bump version

### 1.2.0 (2023-12-02)

- fix login flow
- (mcm1957) changed: Testing has been changed to support node 16, 18 and 20
- (mcm1957) changed: Dependencies have been updated
- (ta2k) restart adapter instead of relogin

### 1.1.1

- Fix auto login for SingleKey User

### 1.1.0

- Add auto login for SingleKey User

### 1.0.3

- Add manually login for SingleKey User

### 1.0.2

- Adapter complete rewriten. Includes a lot of Bugfixes

### 0.0.36

- fix for js.controller 3.3. Please delete the device in Objects manually

### 0.0.32 (29.12.2020)

- (Morluktom) bugfix for devices that are completely switched off (e.g. washing machine, dryer)

### 0.0.31

- (ta2k) fix pause start command

### 0.0.30 (10.05.2020)

- (ta2k) fix js controller 3 issues

### 0.0.27 (13.11.2019)

- (ta2k) improve option selecting

### 0.0.26 (04.11.2019)

- (ta2k) fix boolean settings

### 0.0.25 (08.09.2019)

- (ta2k) fix compact mode
- (ta2k) reduce query per minute to prevent too much request error

### 0.0.24 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (26.07.2019)

- (ta2k) bugfixing

### 0.0.21 (12.07.2019)

- (ta2k) bugfixing

### 0.0.19 (30.06.2019)

- (ta2k) improve displaying long states, options and events

### 0.0.18 (26.06.2019)

- (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

- (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

- (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

- (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

- (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

- (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

- (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

- (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

- (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

- (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

- (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

- (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

- (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
- (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
  added startInRelative for Oven

### 0.0.5 (28.11.2018)

- (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

- (dna909) add event-listener

### 0.0.3 (14.11.2018)

- (dna909) query States and available programs

### 0.0.2 (08.11.2018)

- (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

- (dna909) initial release

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 dna909 <dna909@googlemail.com>, TA2k

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
