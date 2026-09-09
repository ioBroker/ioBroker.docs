---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: aRPjSp2Uew4cSHXWSMkuPbHNj+wFJqEN6ZNnuXQmpJQ=
---
![Логотип](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Количество установок](http://iobroker.live/badges/sbfspot-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.sbfspot?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.sbfspot?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.sbfspot?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)

# ioBroker.sbfspot

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Этот адаптер считывает данные с инверторов SMA Power с помощью sbfspot. Теперь поддерживаются оба типа баз данных (mySQL и sqlite). Начиная с версии 0.2.3, доступен собственный виджет визуализации на основе flot для отображения исторических данных.

## Установка / Обновление

Пожалуйста, следуйте инструкциям по установке SBFSpot по адресу <https://github.com/SBFspot/SBFspot/wiki>

В файле /opt/iobroker/node\_modules/iobroker.sbfspot/lib/scripts вы найдете скрипты для установки и обновления SBFspot в системах на базе Debian.

## Подсказки

- Используйте последнюю версию SBFSpot с <https://github.com/SBFspot/SBFspot>
- Адаптер, SBFSpot и базы данных (MySQL или SQLite) должны работать на одной системе, например, на Raspberry Pi.
- Инструкцию по установке SBFSpot на Raspberry Pi (или аналогичное устройство) можно найти по адресу <https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite> или <https://www.rg-engineering.eu/index.php/produkte/software/plugin-fuer-iobroker-sbfspot>
- Для Raspberry Pi доступен полуавтоматический инструмент настройки по адресу <https://github.com/SBFspot/sbfspot-config>

## известные проблемы

- Пожалуйста, создавайте запросы на [GitHub](https://github.com/rg-engineering/ioBroker.sbfspot/issues) , если обнаружите ошибки или пожелаете добавить новые функции.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.7 (2026-07-09)
* (copilot) Adapter requires node.js >= 22 now
* (René) update dependencies
* (René) changes based on adapter checker

### 5.0.6 (2026-04-06)
* (René) changes based on adapter checker

### 5.0.5 (2026-03-17)
* (René) update dependencies + changes based on adapter checker

### 5.0.4 (2025-10-26)
* (René) bug fix sentry

### 5.0.3 (2025-10-21)
* (René) see issue #510: read interval minimum reduced to 1 minute
* (René) update dependencies + changes based on adapter checker

[Older changelogs can be found there](https://github.com/rg-engineering/ioBroker.sbfspot/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2017-2026 René G. <info@rg-engineering.eu>

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