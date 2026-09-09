---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onlycat/README.md
title: ioBroker.onlycat
hash: LhqrB/uek7EBWNDjGToorIsLWjUEW6gHAuZiVA3Biu4=
---
![Логотип](../../../en/adapterref/iobroker.onlycat/admin/onlycat.png)

![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/onlycat-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.onlycat.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onlycat.svg)
![Количество установок](https://iobroker.live/badges/onlycat-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.onlycat.png?downloads=true)
![Тестирование и выпуск](https://github.com/Author/ioBroker.onlycat/workflows/Test%20and%20Release/badge.svg)

# ioBroker.onlycat

## Адаптер для кошачьих дверок OnlyCat® с функцией обнаружения добычи.

Адаптер для кошачьих дверок OnlyCat® с функцией обнаружения добычи.

<p align="center">
  <img src="/admin/onlycat-flap.webp" />
</p>
<p align="center">
  <img style="max-width: 300px" src="/admin/screenshot.jpg" />
</p>

## Конфигурация

Добавьте токен устройства на странице конфигурации адаптера. Токен можно найти в приложении OnlyCat на странице «Учетная запись».

## Описание

Адаптер передает события с дверцы для кошек OnlyCat, а именно: входы, выходы и обнаружение добычи. Он также позволяет устанавливать политику активного перемещения.

Для работы адаптера требуется Node 20 или более поздняя версия.

## Примечания

OnlyCat® — зарегистрированный товарный знак компании [VirtualV Trading Ltd.](https://www.onlycat.com/)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.6.2 (2026-08-29)

* (Sickboy78) dependency updates
* (copilot) Adapter requires node.js >= 22 now

### 0.6.1 (2026-05-10)

* (Sickboy78) added image to events

### 0.6.0 (2026-05-04)

* (Sickboy78) added deletedAt, eventManualClassification, eventManualClassificationUserId and link states to events
* (Sickboy78) added rfid code to pet state
* (Sickboy78) fixed some minor bugs
* (Sickboy78) added more unit tests

### 0.5.4 (2026-02-09)

* (Sickboy78) added removal of deleted or renamed devices and transit policies
* (Sickboy78) fixed bug if device has no events

### 0.5.3 (2026-01-09)

* (Sickboy78) dependency updates
* (Sickboy78) add AlCalzone's Release Script

[Older changelogs can be found there](https://github.com/Sickboy78/ioBroker.onlycat/blob/main/CHANGELOG_OLD.md)

## License

MIT License

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

Copyright (c) 2025-2026 Sickboy78 <asmoday_666@gmx.de>