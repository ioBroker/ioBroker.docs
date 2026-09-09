---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.traccar/README.md
title: ioBroker.traccar
hash: B6pSwUemQkhaoruN++f1KbSVfU13QkGHzEM8iblGHcA=
---
![Логотип](../../../en/adapterref/iobroker.traccar/admin/traccar.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.traccar.svg?dummy=unused)
![Загрузки](https://img.shields.io/npm/dm/iobroker.traccar.svg?dummy=unused)
![Количество установок (последние)](https://iobroker.live/badges/traccar-installed.svg?dummy=unused)
![Количество установок (стабильных)](https://iobroker.live/badges/traccar-stable.svg?dummy=unused)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/traccar/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.traccar.png?downloads=true)

# ioBroker.traccar

## Адаптер Traccar для ioBroker

Этот адаптер в режиме реального времени импортирует данные о местоположении и расширенные данные из [Traccar](https://www.traccar.org) и делает их доступными в ioBroker.

## Конфигурация

1. Создайте новый экземпляр адаптера.
2. Укажите URL/IP-адрес и порт с сервера Traccar.
3. Настройте имя пользователя и пароль.
4. Сохраните настройки
5. Веселиться :)

## Changelog
### 1.2.1 (2026-08-06)
+ (copilot) Adapter requires node.js >= 22 now
* (arteck) add version check re-runs every 24 hours
* (arteck) Dependencies have been updated

### 1.2.0 (2026-04-23)
* (arteck) refactoring

### 1.1.7 (2026-04-14)
* (arteck) Dependencies have been updated

### 1.1.6 (2024-10-28)
-   (arteck) dependency update

### 1.1.5 (2024-09-26)
-   (arteck) transfer to arteck 
-   (arteck) add accuracy

[Older changelogs can be found there](https://github.com/arteck/ioBroker.traccar/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026  Arthur Rupp <arteck@outlook.com>,

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