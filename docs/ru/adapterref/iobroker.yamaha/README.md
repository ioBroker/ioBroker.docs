---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yamaha/README.md
title: без заголовка
hash: 7OJuYFsy6VNYKUCbfYG3oHnTo5qf9BztKBSu3G86OrU=
---
![Логотип](../../../en/adapterref/iobroker.yamaha/admin/yamaha.png)

![Количество установок](http://iobroker.live/badges/yamaha-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.yamaha.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yamaha.svg)

## IoBroker.yamaha
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.yamaha/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/yamaha/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

#### Описание
Адаптер для AV-ресиверов Yamaha.

Обсудите, пожалуйста, на github или https://forum.iobroker.net/topic/53174/weiterentwicklung-yamaha-adapter.

### Первоначальное создание
Этот адаптер изначально был создан @soef по адресу https://github.com/soef/ioBroker.yamaha, но больше не поддерживается, поэтому мы переместили его в iobroker-community, чтобы можно было исправить ошибки. спасибо @soef за его работу.

#### Конфигурация
В настоящее время без автообнаружения вам необходимо ввести IP-адрес вашего получателя.

#### Монтаж
через администратора ioBroker.

В противном случае выполните следующую команду в корневом каталоге iobroker (например, в /opt/iobroker) `` npm install iobroker.yamaha iobroker upload yamaha ``

#### В реальном времени
Государства будут созданы, когда они возникнут. Т.е. используйте свой пульт дистанционного управления и измените что-нибудь, и вы увидите новые состояния.
Устройства Yamaha принимают только одно соединение.

#### Требования
Ресивер Ямаха

Вам необходимо включить функцию «режим ожидания сети» в конфигурации вашего ресивера.

## Changelog
### 0.5.4 (2024-06-14)
* (foxriver76) updated packages

### 0.5.3 (2022-06-17)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.2 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.1 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry
* (Sneak-L8) fix type of pureDirect

### 0.5.0 (2022-03-08)
* IMPORTANT: js-controller 2.0 is needed at least
* (Apollon77) Add Sentry for crash reporting

### 0.4.1
* (Sneak-L8) "toggleMute" now toggle mute state (instead of always muting)

### 0.4.0
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.

### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters

### 0.3.19
* (soef) Changelog added to readme

### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps

### 0.3.17
* (Apollon77) update basic package-file testing

### 0.3.16
* (soef) node 0.12 removed from testing

### 0.3.15
* (soef) Enhance CI testing

### 0.3.14
* (soef) Possible exception in reconnect fixed

### 0.3.12
* (soef) Version incr. for npm

### 0.3.11
* (soef) reconnect overworked

### 0.3.10
* (soef) realtime Ping now configurable

### 0.3.8
* (soef) realtime states optimized

### 0.3.7
* (soef) fix typo in creating realtime states

### 0.3.6
* (soef) timeout to connect reduced

<!--

## License
The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>

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
-->
