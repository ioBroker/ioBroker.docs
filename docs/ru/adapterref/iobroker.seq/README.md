---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.seq/README.md
title: ioBroker.seq
hash: 66jrUwtyG6WxMEGt6bHtlPIxcfM73LuOq5eoGooGyaQ=
---
![Логотип](../../../en/adapterref/iobroker.seq/admin/seq.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.seq.svg?dummy=unused)
![Загрузки](https://img.shields.io/npm/dm/iobroker.seq.svg?dummy=unused)
![Количество установок (последние)](https://iobroker.live/badges/seq-installed.svg?dummy=0.2.7)
![Количество установок (стабильных)](https://iobroker.live/badges/seq-stable.svg?dummy=0.2.7)
![НПМ](https://nodei.co/npm/iobroker.seq.png?downloads=true)

# IoBroker.seq
[![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/seq/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Seq-адаптер для ioBroker
Этот адаптер позволяет передавать логи ioBroker в систему [Последовательность](https://datalust.co/seq).
Также можно применять фильтры к уровням логирования и к адаптерам.

## Конфигурация
1. Создайте новый экземпляр адаптера.
2. Укажите URL/IP-адрес и порт экземпляра [Seq](https://datalust.co/seq).
3. Укажите, какие события журнала вы хотите отправлять в [Seq](https://datalust.co/seq)
4. Сохраните настройки.

## Changelog
### 1.0.2 (2026-04-06)
* (arteck) back to seq-logging 2.2.0

### 1.0.1 (2026-04-06)
* (arteck) Dependencies have been updated

### 1.0.0 (2026-04-05)
* (arteck) new admin

### 0.4.2 (2025-10-20)
* (arteck) fixes

### 0.4.1 (2025-10-20)
* (arteck) pin seq-logging

### 0.4.0 (2025-10-20)
* (arteck) Dependencies have been updated
* (arteck) transfer to arteck

### 0.3.0 (2023-07-25)
- (o0shojo0o) added adminTab
- (o0shojo0o) added adapter to TIER 1

### 0.2.10 (2021-04-15)

- (o0shojo0o) check log message of undefine

### 0.2.9 (2021-02-05)

- (o0shojo0o) fix 'Cannot read property common of null'

### 0.2.8 (2021-01-30)

- (o0shojo0o) fix NullPointerException

### 0.2.7 (2021-01-24)

- (o0shojo0o) added overview card

### 0.2.6 (2021-01-21)

- (bluefox) refactoring
- (bluefox) better translations

### 0.2.5 (2021-01-20)

- (o0shojo0o) no real change only the description for the admin

### 0.2.4 (2021-01-16)

- (o0shojo0o) bugfix display of the filter options
- (o0shojo0o) bugfix display of template parameters
- (o0shojo0o) added parameter logging Arch
- (o0shojo0o) added parameter logging JsController
- (o0shojo0o) added parameter logging Node
- (o0shojo0o) added parameter logging Platform
- (o0shojo0o) added parameter logging SourceVersion

### 0.2.3 (2021-01-15)

- (o0shojo0o) if the server address ends with "/", this must be removed. …

### 0.2.2 (2021-01-10)

- (o0shojo0o) handle uncomplete log message

### 0.2.1 (2020-10-01)

- (o0shojo0o) added forgetting native...

### 0.2.0 (2020-10-01)

- (o0shojo0o) optional selective logging on adapter basis

### 0.1.0 (2020-09-26)

- (o0shojo0o) API key is no longer not displayed in clear text
- (o0shojo0o) API key is now stored encrypted
  - **_Attention: The API key will be lost and must be set again!_**
- (o0shojo0o) higher dependencies of the js-controller (>=3.1.0)

### 0.0.5 (2020-09-23)

- (o0shojo0o) added param SystemName for display in Seq

### 0.0.4 (2020-09-23)

- (o0shojo0o) bugfix at the server address check

### 0.0.3 (2020-09-22)

- (o0shojo0o) fix minimum js.controller version

### 0.0.2 (2020-09-17)

- (o0shojo0o) new release for npm...

### 0.0.2-beta.0 (2020-09-16)

- (o0shojo0o) initial release

### 0.0.1

- (o0shojo0o) initial push

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