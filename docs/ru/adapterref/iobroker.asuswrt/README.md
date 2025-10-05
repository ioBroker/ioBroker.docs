---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asuswrt/README.md
title: ioBroker.asuswrt
hash: aI0i0gZIkf0AO68rz7yVv1U5pQCIK2uLW+ZXAiq1YL8=
---
![Логотип](../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)

![Количество установок](http://iobroker.live/badges/asuswrt-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.asuswrt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)
![Тесты](https://api.travis-ci.org/mcdhrts/ioBroker.asuswrt.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![НПМ](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)

# IoBroker.asuswrt
=================

## Адаптер ASUSWRT для ioBroker
Найдите активные устройства на роутерах ASUS с ASUSWRT.
Вы можете использовать это, например, для обнаружения присутствия телефонов, чтобы отслеживать, находится ли кто-то дома.

Протестировано на Asus GT-AC5300 с ASUSWRT 3.0.0.4.384_32799

Список маршрутизаторов Asus, которые НЕ используют ASUSWRT, можно найти здесь: https://event.asus.com/2013/nw/ASUSWRT/

## Требования
Вам необходимо активировать и разрешить SSH-подключения в настройках маршрутизатора.

Вам необходимо как минимум:

* js-контроллер >= 6.0.11
* администратор >= 7.6.17
* Node.js >= 18.x

Для более старых версий ioBroker установите версию 0.3.1.

## Настраивать
* IP-адрес роутера Asus (обязательно)
* IP-адрес роутера Asus
* Авторизация пользователя (обязательно)
* Имя пользователя для входа в маршрутизатор Asus
* Пароль для входа (необязательно, если используется файл закрытого ключа)
* Пароль для входа пользователя в систему
* При использовании файла закрытого ключа оставьте это поле пустым.
* Файл закрытого ключа (необязательно, если используется пароль)
* Если вы не хотите использовать Passwort-Login, вы можете указать путь к файлу закрытого ключа для SSH-Login.
* Оставьте пустым, если не хотите
* Парольная фраза файла закрытого ключа (необязательно, если файл закрытого ключа зашифрован)
* Если ваш файл ключа зашифрован парольной фразой, введите ее здесь.
* Оставьте пустым, если не требуется
* SSH-порт (обязательно)
* Порт для SSH-подключения к роутеру Asus
* Время опроса
* Время в мс для проверки активных устройств (минимальное время — 5000 мс = 5 с)
* Время неактивно
* Время в мс, когда устройство больше не активно.
* В моём случае 180000 мс = 180 с = 3 минуты работает идеально. Минимум — 60000 мс.
* Адреса для мониторинга
* Добавьте устройства, активность которых необходимо отслеживать с помощью MAC-адреса устройства.
* Не забудьте установить флажок для активации мониторинга

## Changelog

### 1.0.2 (2025-10-05)
* (mcdhrts) Fixed admin UI 404 error - renamed index_m.html to index.html
* (mcdhrts) Updated requirements documentation to reflect current dependencies (js-controller >= 6.0.11, admin >= 7.6.17, Node.js >= 18.x)
* (mcdhrts) Improved integration tests with proper test harness and configuration validation
* (mcdhrts) Removed deprecated unit tests in favor of modern integration tests
* (mcdhrts) Updated dependencies: ssh2 ^1.4.0 -> ^1.17.0, @iobroker/adapter-core ^3.3.1 -> ^3.3.2, @iobroker/testing ^5.0.4 -> ^5.1.1
* (mcdhrts) Removed deprecated devDependencies: gulp, mocha, chai (now handled by @iobroker/testing)

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

## License
The MIT License (MIT)

Copyright (c) 2019 mcdhrts <mcdhrts@outlook.com>

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