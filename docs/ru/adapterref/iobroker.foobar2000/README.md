---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.foobar2000/README.md
title: iobroker.foobar2000
hash: FHzzUUNQWfab64uspZV5k99ssaQCOnUV9MNaunZnp2s=
---
![Логотип](../../../en/adapterref/iobroker.foobar2000/admin/foobar2000.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.foobar2000)
![Загрузки](https://img.shields.io/npm/dm/iobroker.foobar2000.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.foobar2000)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.foobar2000)
![GitHub фиксирует с момента последнего выпуска (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.foobar2000/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.foobar2000)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.foobar2000)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.foobar2000.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/foobar2000-stable.svg)
![Количество установок](https://iobroker.live/badges/foobar2000-installed.svg)

# Iobroker.foobar2000
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/foobar2000/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск] (https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/codeql.yml)

<!--

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.
-->
##Адаптер Foobar2000 для iobroker
![настройки администратора.](../../../en/adapterref/iobroker.foobar2000/admin/admin.png)

## С использованием
Для управления плеером необходимо установить плагин [foo_httpcontrol](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/).
Чтобы обложка отображалась как ссылка на файл, в файле ```c:\Users\{USER}\AppData\Roaming\foobar2000\foo_httpcontrol_data\foobar2000controller\config``` измените параметр ```albumart_prefer_embedded = 0```.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.0 (2023-11-07)
* (mcm1957) Adapter requires nodejs16 or newer now.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization.
* (mcm1957) Dependencies have been updated.

### 2.0.4
* (instalator) fixed error

### 2.0.3
* (instalator) fixed admin error

### 2.0.2
* (instalator) fixed error

### 2.0.0
* (instalator) Completely rewritten

### 1.0.0
* (instalator) Up to stable

### 0.2.0
* (instalator) Change for widgets vis-players

### 0.1.2
* (instalator) del widgets folders
* (instalator) change log level
* (instalator) add news object

### 0.1.1
* (instalator) fix start, exit for local

### 0.1.0
* (instalator) beta (20.10.2016)

### 0.0.1
* (instalator) initial (12.10.2016)

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2021 instalator <vvvalt@mail.ru>

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
