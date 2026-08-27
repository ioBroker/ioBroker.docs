---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.followthesun/README.md
title: ioBroker.followthesun
hash: BRQNdNMRwJEA1EaojOqvqVyctslhVlZaVBvCg6iH6Ko=
---
![Логотип](../../../en/adapterref/iobroker.followthesun/admin/followthesun.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.followthesun.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/followthesun-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.followthesun.svg)
![Количество установок (последние)](http://iobroker.live/badges/followthesun-installed.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.followthesun)
![Известные уязвимости](https://snyk.io/test/github/HGlab01/ioBroker.followthesun/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.followthesun.png?downloads=true)

# IoBroker.followthesun
[![Статус FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_shield) ![Тестирование и выпуск](https://github.com/HGlab01/ioBroker.followthesun/workflows/Test%20and%20Release/badge.svg)

## Адаптер followthesun для ioBroker
Этот адаптер вычисляет текущую высоту и азимут солнца на основе геопозиционирования. Дополнительно сохраняются направление по компасу и движение солнца (восход или закат).
Он использует геопозиционирование, определенное в конфигурации. Интервал вычислений можно задать в настройках экземпляра.
Также сохраняются значения солнечного полудня для некоторых дней, таких как сегодня, завтра или начало весны/лета/осени/зимы.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Требует
* Node.js 22 или выше
* ioBroker host (js-controller) 6.0.11 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.5.3 (2026-06-16)
* (HGlab01) code quality improvements
* (HGlab01) dependecy updates

### 0.5.2 (2025-03-12)
* (HGlab01) Bump axios to 1.8.3

### 0.5.1 (2024-08-21)
* (HGlab01) Fixing repository checker issues

### 0.5.0 (2023-12-05)
* (HGlab01) Breaking changes
    - Node.js 18 or higher required
    - ioBroker host (js-controller) 5.0 or higher
* (HGlab01) Coordinates can be configured on instance level (optional)
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.14

### 0.4.2 (2023-08-10)
* (HGlab01) Improve admin5 UI usage

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2026 HGlab01 <myiobrokeradapters@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_large)