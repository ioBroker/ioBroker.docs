---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: tgidaa2s0L6W6bnbd2mzYh/MMnpUyEGFUQzGzJ8/VFA=
---
![Логотип](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect)
![Коммиты GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect)
![версия НПМ](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/homeconnect-stable.svg)
![Количество установок](https://iobroker.live/badges/homeconnect-installed.svg)

# IoBroker.homeconnect
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/homeconnect/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml)

## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер Homeconnect для ioBroker
## Требования перед установкой
Необходимо установить Node.js версии не ниже 18!

Для адаптера требуется ClientID. Используйте настройки для каждого шага для регистрации.

<https://developer.home-connect.com>

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Для **Учетной записи пользователя Home Connect по умолчанию для тестирования** укажите адрес электронной почты, с которого будет отправлено приложение Home Connect.
был зарегистрирован, это также потребуется позже в процессе авторизации.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Для **Типа учетной записи** выберите Индивидуальный. Добавьте оставшиеся данные, если они доступны (не знаю, будут ли они проверяться).

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Затем перейдите в раздел **Приложения**, а затем в раздел **Регистрация приложения**.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Для **Application ID** введите имя приложения, например, ioBroker. С **OAuth Flow** выберите Device Flow.

**Home Connect User Account for Testing** может оставаться пустым. Для **Success Redirect** введите URI, например, https://example.com.
Затем сохраните, и у вас будет требуемый ClientID.

## Конфигурация
Добавьте имя пользователя, пароль и сгенерированный идентификатор клиента приложения Homeconnect в конфигурацию адаптера.

## Использование
С помощью состояний в командах вы можете остановить, приостановить и возобновить программу. С помощью состояний в настройках вы можете выключить или включить устройство Изменение значения programs.active.BSH_Common_Root_ActiveProgram приводит к запуску программы Обновление iQ300: Вам необходимо задать имя программы в этой переменной. Если programs.selected.BSH_Common_Root_SelectedProgram скопирован, пользователь машины может заранее определить нужную программу на машине, и она будет запущена через ioBroker Изменение значения programs.selected.BSH_Common_Root_SelectedProgram приводит к выбору программы или опций

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.2 (2024-10-25)

- fix for devices with object values

### 1.4.1 (2024-07-02)

- (foxriver76) fixed invalid min/max values

### 1.4.0 (2024-04-18)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.3.0 (2023-12-15)

- fix login

### 1.2.2 (2023-12-02)

- bump version

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