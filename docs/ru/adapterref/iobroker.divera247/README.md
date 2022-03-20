---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.divera247/README.md
title: ioBroker.divera247
hash: LyHEz+a45NCnsQ0Y2SDqeWhCuAvLD11aWtvFJ1vjonQ=
---
![Логотип](../../../en/adapterref/iobroker.divera247/admin/divera247_long.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.divera247.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.divera247.svg)
![Количество установок (последние)](http://iobroker.live/badges/divera247-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/divera247-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/TKnpl/ioBroker.divera247/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.divera247.png?downloads=true)

# IoBroker.divera247
**Тесты:** ![Тестируйте и выпускайте](https://github.com/TKnpl/ioBroker.divera247/workflows/Test%20and%20Release/badge.svg)

## Адаптер divera247 для ioBroker
Адаптер для службы оповещения <a href="https://www.divera247.com/" target="_blank">Divera 24/7</a>

## Требования
Для полноценного использования этого адаптера ваша организация должна подписаться на тариф «Тревога» услуг Divera 24/7 как минимум, иначе адаптер не будет работать или будет работать не полностью.

## Конфигурация этого адаптера
Вы должны ввести свои учетные данные для входа в систему «Divera 24/7» для этого адаптера.

Кроме того, вы можете ограничить будильники для определенных пользователей или групп будильников.
Для этого вам необходимо ввести идентификаторы пользователей Divera или номера групп сигналов тревоги на странице администрирования этого адаптера. Через запятую (,) можно указать несколько идентификаторов пользователей и/или номеров групп тревог.
Этот адаптер сначала проверяет идентификаторы пользователей, прежде чем проверять группы. Первое попадание вызовет тревогу и обновит все состояния. Комбинация идентификатора пользователя и группы сигналов тревоги в настоящее время невозможна.

Чтобы подписаться на **все тревоги**, просто оставьте поля ввода пустыми.

## Changelog

### 0.2.0
* (TKnpl) complete renewal of the adapter

### 0.1.3
* (TKnpl) general revision of the adapter

### 0.1.2
* (TKnpl) added alarmed vehicles datapoint

### 0.1.1
* (TKnpl) small changes - wording

### 0.1.0
* (TKnpl) added possibility to specify alarm groups

### 0.0.10
* (TKnpl) bug in info.connection fixed and handling of user ids expanded

### 0.0.9
* (TKnpl) added default values for admin page

### 0.0.8
* (TKnpl) Changed API call from intervall to timeout, added states 'group' and 'foreign_id'

### 0.0.7
* (TKnpl) added object 'priority' and 'alarm' object updates only in case of an new alarm or when an alarm was closed

### 0.0.6
* (TKnpl) state handling while active alarm and connection check improved, fixed object types

### 0.0.5
* (TKnpl) fixed io-package news issue

### 0.0.4
* (TKnpl) Connection check to api improved, added timestamp of latest alert

### 0.0.3
* (TKnpl) added title, text, address, latitude, longitude, general formatting

### 0.0.2
* (TKnpl) adjusted translation

### 0.0.1
* (TKnpl) initial commit

## License
MIT License

Copyright (c) 2022 TKnpl <dev@t-concepts.de>

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