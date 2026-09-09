---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.seq/README.md
title: ioBroker.seq
hash: LxFVjAQEAdn40wowoJhw7ayYk1LpN8tbgG0EgRNPtco=
---
![Логотип](../../../en/adapterref/iobroker.seq/admin/seq.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.seq.svg?dummy=unused)
![Загрузки](https://img.shields.io/npm/dm/iobroker.seq.svg?dummy=unused)
![Количество установок (последние)](https://iobroker.live/badges/seq-installed.svg?dummy=0.2.7)
![Количество установок (стабильных)](https://iobroker.live/badges/seq-stable.svg?dummy=0.2.7)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/seq/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.seq.png?downloads=true)

# ioBroker.seq

## Seq-адаптер для ioBroker

Этот адаптер позволяет передавать логи ioBroker в систему [Seq](https://datalust.co/seq) .\
&#x20;Также можно применить фильтр к уровням логирования и к адаптерам.

## Конфигурация

1. Создайте новый экземпляр адаптера.
2. Укажите URL/IP-адрес и порт экземпляра [Seq.](https://datalust.co/seq)
3. Укажите, какие события журнала вы хотите отправлять в [Seq.](https://datalust.co/seq)
4. Сохраните настройки

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.2 (2026-04-06)
* (arteck) back to seq-logging 2.2.0

### 1.0.1 (2026-04-06)
* (arteck) Dependencies have been updated

### 1.0.0 (2026-04-05)
* (arteck) new admin

[Older changelogs can be found there](https://github.com/arteck/ioBroker.seq/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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