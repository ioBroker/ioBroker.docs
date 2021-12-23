---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: 8WLgtLIavDN5rEQxNMS7s+61/GA86fr/OsdTLsXzkWQ=
---
![Логотип](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Количество установок (последнее)](http://iobroker.live/badges/twinkly-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/twinkly-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![Статус зависимости](https://img.shields.io/david/patrickbs96/iobroker.twinkly.svg)
![Известные уязвимости](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.twinkly.png?downloads=true)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)

# IoBroker.twinkly
** Тесты: ** Linux / Mac: [![Travis-CI] (https://travis-ci.com/patrickbs96/ioBroker.twinkly.svg)](https://travis-ci.com/github/patrickbs96/ioBroker.twinkly)

## Адаптер twinkly для ioBroker
Адаптер для связи с [Мерцающие огни](https://www.twinkly.com/).

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Настройки
Доступны следующие настройки: ![admin.png](../../../en/adapterref/iobroker.twinkly/img/admin.png)

В таблицу вы можете добавить все мерцающие огни, которыми хотите управлять.

| Колонка | Описание |
|--------------|------------------------------------|
| `Enabled` | Будет ли это соединение доступно |
| `IP Address` | IP-адрес для мерцающих огней |
| `IP-адрес` | IP-адрес для мерцающих огней |

При установке флажка для каждого устройства создаются следующие дополнительные состояния:

* Информация об устройстве
* Состояние сети
* MQTT

Доступны следующие состояния:

| Государство | Возможность записи | Описание |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected` | : x: | Устройство подключено |
| `firmware` | : x: | Версия прошивки |
| `ledBri` | : heavy_check_mark: | Яркость (отключите управление с помощью -1) |
| `ledColor` | : heavy_check_mark: | Цвет светодиодов, HSV / RGB (W) / HEX |
| `ledConfig` | : heavy_check_mark: | Конфигурация светодиодов |
| `ledEffect` | : heavy_check_mark: | Эффекты (`Effect`) |
| `ledLayout` | : heavy_check_mark: | Расположение светодиодов (отключено для дальнейшего тестирования) |
| `ledMode` | : heavy_check_mark: | Mode: Movie, Color, Effect, Playlist, Off, RealTime (пока не поддерживается), Demo |
| `ledMovie` | : heavy_check_mark: | Активный фильм, если в функцию списка воспроизведения добавлено несколько фильмов, их можно выбрать здесь. (`Movie`) |
| `ledPlaylist` | : heavy_check_mark: | Активная запись в плейлист, переключение между фильмами. (`Playlist`) |
| `ledSat` | : heavy_check_mark: | Насыщенность 0-100 (отключите управление с помощью -1) |
| `mqtt` | : heavy_check_mark: | MQTT-соединение |
| `name` | : heavy_check_mark: | Имя |
| `network` | : x: | Сетевая информация |
| `on` | : heavy_check_mark: | Переключатель Вкл. / Выкл. |
| `paused` | : heavy_check_mark: | Приостановите подключение к Twinkly, чтобы вы могли вносить изменения в приложение. В противном случае вы можете потерять соединение при работе в приложении |
| `timer` | : heavy_check_mark: | Обновите таймер |
| `таймер` | : heavy_check_mark: | Обновите таймер |

[Информация о частном API] (https://xled-docs.readthedocs.io/en/latest/) [Павол Бабинчак](https://github.com/scrool)

## Известные проблемы
* Максимальная длина названия фильма - 15 символов.

## Changelog

### 0.2.8 (2021-12-20)
* (patrickbs96) Rename mode On to movie as it's a better representation

### 0.2.7 (2021-12-19)
* (patrickbs96) Hex without Hash. Option to not use ping for reachability.

### 0.2.6 (2021-12-09)
* (patrickbs96) Renamed States with led control. Now starting with "led".
* (patrickbs96) Add new State `ledLayout`/`ledPlaylist`

### 0.2.4 (2021-12-03)
* (patrickbs96) Handle wrong input so it does not cause exceptions
* (patrickbs96) Add new State `ledEffect`

### 0.2.2 (2021-11-30)
* (patrickbs96) Add new State `ledColor`

### 0.2.0 (2021-11-28)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-J, IOBROKER-TWINKLY-K, IOBROKER-TWINKLY-M, IOBROKER-TWINKLY-N, IOBROKER-TWINKLY-P)
* (patrickbs96) Add Pause-Feature, to work with app. (Twinkly only allows one active connection...)
* (patrickbs96) Add Feature, activate uploaded Movies (Playlist) 

### 0.1.15 (2021-10-26)
* (patrickbs96) Add new Value `network.accesspoint.password_changed` from API-Response (Sentry IOBROKER-TWINKLY-A)

### 0.1.14 (2021-10-23)
* (patrickbs96) Add new Value `network.station.status` from API-Response (Sentry IOBROKER-TWINKLY-A, IOBROKER-TWINKLY-B)
* (patrickbs96) Add new Value `network.details.product_version` from API-Response (Sentry IOBROKER-TWINKLY-E)
* (patrickbs96) Add new Value `network.details.rssi` from API-Response (Sentry IOBROKER-TWINKLY-D)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-7)

### 0.1.13 (2021-10-13)
* (patrickbs96) Add new Value `network.station.rssi` from API-Response (Sentry IOBROKER-TWINKLY-8)

### 0.1.12 (2021-09-13)
* (patrickbs96) Added new Values from Response (Sentry IOBROKER-TWINKLY-7)
* (patrickbs96) Prevent excessive Sentry Logging 

### 0.1.10 (2021-09-04)
* (patrickbs96) Update API values to Firmware 2.7.1

### 0.1.8 (2021-02-06)
* (patrickbs96) Changes from the Review

### 0.1.6
* (patrickbs96) Update dependencies

### 0.1.5
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

### 0.1.4
* (patrickbs96) Temporary removing Reset as API path not exists

### 0.1.1
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

## License
MIT License

Copyright (c) 2021 patrickbs96 <patrickbsimon96@gmail.com>

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