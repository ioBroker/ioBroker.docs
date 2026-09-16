---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.melcloud/README.md
title: ioBroker.melcloud
hash: 92yNZ40MFwfU7/OpLqO3gtlDVo+UYihOxZDs/c2pUUY=
---
![Логотип](../../../en/adapterref/iobroker.melcloud/admin/melcloud.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.melcloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.melcloud.svg)
![Количество установок (последние)](http://iobroker.live/badges/melcloud-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/melcloud-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Black-Thunder/ioBroker.melcloud/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.melcloud.png?downloads=true)
![Тестирование и выпуск](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/test-and-release.yml/badge.svg)
![Reviewdog](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/code-quality.yml/badge.svg)

_Иконка создана с помощью [Freepik](https://www.flaticon.com/authors/freepik) с сайта [www.flaticon.com](https://www.flaticon.com/")_

# ioBroker.melcloud

## адаптер MelCloud для ioBroker

Этот адаптер интегрирует устройства Mitsubishi Electric через MELCloud ( <https://www.melcloud.com/> ) в ioBroker.

Документация:

- [Описание на английском языке](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/en/melcloud.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/de/melcloud.md)

Обсуждение:

- [Форум ioBroker](https://forum.iobroker.net/topic/40705/)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 4.0.0 (2026-08-26)

- (Black-Thunder) Adapter requires node.js >= 22, js-controller >=7.2.2 and admin >=7.9.0 now
- (Black-Thunder) Support for the central ioBroker credentials store was added, while legacy username/password configuration remains supported for backwards compatibility

### 3.0.4 (2026-04-10)

- (Black-Thunder) Retry and queue handling was added when device information is missing

### 3.0.3 (2026-01-21)

- (Black-Thunder) Setting ATW device zone operation modes was fixed
- (Black-Thunder) Dependencies were updated

### 3.0.2 (2025-12-07)

- (Black-Thunder) Dependencies were updated

### 3.0.1 (2025-08-13)

- (Black-Thunder) Setting a state value is now more tolerant of strings.
- (Black-Thunder) Fixed a bug that caused subsequent commands to fail after a failed state change.

[Older changelogs can be found there](https://github.com/Black-Thunder/ioBroker.melcloud/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Black-Thunder <glwars@aol.de>

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