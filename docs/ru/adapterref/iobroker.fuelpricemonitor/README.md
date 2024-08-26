---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fuelpricemonitor/README.md
title: ioBroker.fuelpricemonitor
hash: sfa6ISJsOEqQnyIOygbCl6Kfi9twg6kGwEtPsLmJjb0=
---
![Логотип](../../../en/adapterref/iobroker.fuelpricemonitor/admin/fuelpricemonitor.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)
![Количество установок (последних)](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.fuelpricemonitor)
![Известные уязвимости](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)

# IoBroker.fuelpricemonitor
[![Статус FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield) ![Тестирование и выпуск](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

## Адаптер Fuelpricemonitor для ioBroker
Этот адаптер получает цены на топливо (дизельное топливо, Super95 и КПГ) из официальной базы данных Австрии на основе настроенного вами географического положения. API предоставляет цены только для первых 5 станций. Для остальных 5 станций цены недоступны. Можно добавить дополнительные локации.
Расписание по умолчанию выполняется каждые 20 минут в виде задания cron на вкладке экземпляра.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Требует
* Node.js 18 или выше.
* Хост ioBroker (js-контроллер) 5.0 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (HGlab01) Breaking changes
    - Node.js 18.0 or higher
    - ioBroker host (js-controller) 5.0 or higher
* (HGlab01) Bump axios to 1.6.2

### 0.3.6 (2023-08-10)
* (HGlab01) switch to Admin5 UI for configuration

### 0.3.5 (2023-07-07)
* (HGlab01) Spread API calls
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.12

### 0.3.4 (2023-02-05)
* (HGlab01) Cheapest station from experimental to stable
* (HGlab01) Bump axios to 1.3.2

### 0.3.3 (2022-12-22)
* (HGlab01) Cheapest station now per fuel type (#445)

## License
MIT License

Copyright (c) 2023 HGlab01 <myiobrokeradapters@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_large)
