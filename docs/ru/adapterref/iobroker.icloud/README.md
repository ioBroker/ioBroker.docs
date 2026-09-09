---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.icloud/README.md
title: ioBroker.icloud
hash: Yjeh1xGzvvAuU1+ubA+38hwuCs8JRjxQ3sG1WH84l1k=
---
![Логотип](../../../en/adapterref/iobroker.icloud/admin/icloud.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.icloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.icloud.svg)
![Количество установок](https://iobroker.live/badges/icloud-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/icloud-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.icloud.png?downloads=true)
![Тестирование и выпуск](https://github.com/ticaki/ioBroker.icloud/workflows/Test%20and%20Release/badge.svg)
![Немецкая документация](https://img.shields.io/badge/Doku-Deutsch-green?logo=readme)
![Документация на английском языке](https://img.shields.io/badge/docs-English-blue?logo=readme)

# ioBroker.icloud

## адаптер iCloud для ioBroker

Этот адаптер интегрирует вашу учетную запись Apple iCloud с ioBroker. Он предоставляет доступ к широкому спектру сервисов Apple — от местоположения устройства и напоминаний до файлов Google Диска, контактов, заметок, событий календаря и вашей фотобиблиотеки — все данные доступны для чтения и (где это поддерживается) для записи в соответствии с настройками ioBroker или через`sendTo()` .

---

## Кредиты

Создание этого адаптера было бы невозможно без следующих проектов с открытым исходным кодом:

- **[icloud.js](https://github.com/foxt/icloud.js)** от foxt — оригинальная JavaScript-библиотека для работы с iCloud, на основе которой создан и построен этот адаптер.
- **[pyicloud](https://github.com/picklepete/pyicloud)** от picklepete — эталонная реализация API iCloud от Apple на Python, которая легла в основу многих интеграций сервиса.
- **[pyicloud (форк timlaing)](https://github.com/timlaing/pyicloud)** от timlaing — активно поддерживаемый форк pyicloud, который послужил эталонной реализацией для современных напоминаний (CloudKit v2) и других актуальных деталей API.

Огромное спасибо всем, кто внес свой вклад в эти проекты!

## Отказ от ответственности

Этот адаптер — независимый проект с открытым исходным кодом, разработанный сообществом. Он **не связан с компанией Apple Inc., не одобрен ею и никоим образом официально с ней не сотрудничает.**

_iCloud_ , _Find My_ , _Apple ID_ , _iCloud Drive_ и все другие товарные знаки Apple являются собственностью Apple Inc. Все названия продуктов, логотипы и бренды являются собственностью их соответствующих владельцев. Использование этих названий осуществляется исключительно в целях идентификации.

Данный адаптер использует API-интерфейсы, применяемые собственными клиентами Apple для доступа к сервисам iCloud. Использование этих API-интерфейсов регулируется Условиями предоставления услуг Apple. Используя данный адаптер, вы соглашаетесь соблюдать все применимые условия Apple. Автор не несет ответственности за любое неправомерное использование адаптера или любые нарушения Условий предоставления услуг Apple.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.5 (2026-09-06)
* (ticaki) new: when Apple refuses `/ca/startup`, the titles, colours and flags of the reconstructed calendars are now fetched separately via `/ca/collections` — such calendars only appeared under their guid before, and a list answer also brings back calendars that have no event in the queried range
* (ticaki) changed: the warning about a reconstructed calendar list now states how many calendars could be completed with their real metadata, and a title delivered by Apple is no longer overwritten by the one stored from an earlier refresh

### 2.0.4 (2026-09-06)
* (ticaki) fixed: the calendar could fail permanently with `WEBSERVICE_REAUTH_REQUIRED:calendar` although the session was still valid — the service re-authentication no longer posts the account password to Apple's `accountLogin` (which answers HTTP 421 for every account with two-factor authentication) but refreshes the webservices with the session token, the way FindMy has been doing it all along
* (ticaki) fixed: an empty HTTP 500 is no longer mistaken for an expired session — only a real HTTP 401 triggers a calendar re-authentication now
* (ticaki) fixed: when Apple refuses `/ca/startup`, the calendar list is now taken from a single-day `/startup` request and, if that fails too, reconstructed from the `pGuid`s of `/ca/events` — the adapter delivers the events instead of aborting the whole refresh, and a reconstructed list never deletes existing calendar objects
* (ticaki) changed: the calendar service now picks up the calendar partition URL returned by a re-authentication instead of reusing the cached one

### 2.0.3 (2026-09-06)
* (ticaki) fixed: requesting a 2FA code by SMS could fail with `SMS request failed (500)` — the session is now refreshed directly before the request and a rejected request is retried once with the complete phone number payload
* (ticaki) fixed: calendar requests now carry the `clientBuildNumber` / `clientMasteringNumber` / `clientId` parameters that Apple's own web client sends — without them stricter calendar servers answered with an empty HTTP 500
* (ticaki) changed: failed SMS and calendar requests now report Apple's actual error (service errors, edge headers) instead of a truncated JSON fragment, and all adapter messages are English now

### 2.0.2 (2026-09-05)
* (ticaki) fixed: a failed calendar request no longer deleted all calendar objects and left only `calendar.lastSync` behind — an empty calendar list is now treated as an error, the existing objects are kept and the failure is logged

### 2.0.1 (2026-09-03)
* (ticaki) fixed: login failed with `SRP init failed (409)` when a leftover session from an aborted 2FA attempt was still on disk — the stale session is now discarded and the sign-in retried once
* (ticaki) fixed: the fresh scnt / session id returned by Apple's SRP init response is now used for the following `signin/complete` request

Older changes are listed in [CHANGELOG_OLD.md](https://github.com/ticaki/ioBroker.icloud/blob/main/CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ticaki <github@renopoint.de>

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