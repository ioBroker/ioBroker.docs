---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.teslamateapi/README.md
title: ioBroker.teslamateapi
hash: soSS6WongH1psOFoLEVVCZ66r0DQCoIomBjbzTHWKbA=
---
![версия NPM](https://img.shields.io/npm/v/iobroker.teslamateapi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.teslamateapi.svg)
![Количество установок](https://iobroker.live/badges/teslamateapi-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/teslamateapi-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.teslamateapi.png?downloads=true)

<img src="/admin/teslamate.svg" alt="Логотип" style="max-width: 100%;" width="100">

# IoBroker.teslamateapi
**Тесты:** ![Тестируйте и выпускайте](https://github.com/virusbrain/ioBroker.teslamateapi/workflows/Test%20and%20Release/badge.svg)

## Адаптер teslamateapi для ioBroker
Управляйте своим автомобилем через TeslaMateApi!

TeslaMateApi — это RESTful API для получения данных, собранных автономным регистратором данных TeslaMate, в формате JSON. Вы можете найти приложение здесь: https://github.com/tobiasehlert/teslamateapi

Этот адаптер предоставит статус вашего автомобиля через TeslaMateApi и Telsmate. Также вы можете отправить несколько команд на свой автомобиль. В настоящее время поддерживаются следующие команды:

- вставай
- фонарики
- charge_port_door_open
- charge_port_door_close
- заряд_старт
- заряд_стоп
- замок
- дверь_разблокировать
- auto_conditioning_start
- auto_conditioning_stop

С помощью этого адаптера вы также можете установить некоторые настройки вашего автомобиля. В настоящее время реализованы:

- лимит_заряда
- charge_amps

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.7 (2022-11-09)
* (virusbrain) Fix automatic wake_up

### 0.0.6 (2022-11-09)
* (virusbrain) Fixed axios import

### 0.0.5 (2022-11-09)
* (virusbrain) Updated dependencies

### 0.0.4 (2022-11-09)
* (virusbrain) Fixed forced wake up.

### 0.0.3 (2022-10-11)
* (virusbrain) Second try to make intervals unload safe

### 0.0.2 (2022-09-27)
* (virusbrain) Fixed clearInterval
* (virusbrain) Fixed logo size

### 0.0.1 (2022-09-24)
* (virusbrain) Intial beta elease

## License
MIT License

Copyright (c) 2022 virusbrain <github@eideo.de>

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
