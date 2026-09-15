---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.icloud/README.md
title: ioBroker.icloud
hash: TlgGuXYSpeSbWZQffBkJOjuZ5Hs65/38a4IU6Ru2PSY=
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
### 2.1.2 (2026-09-15)
* (ticaki) fixed: when Apple requires the account holder to accept updated iCloud terms and conditions (`termsUpdateNeeded`; Find My answers `HTTP 450` although the session is valid), the adapter stops with a clear error message — accept the terms at icloud.com or on an Apple device and start the instance again — instead of re-authenticating in an endless loop
* (ticaki) fixed: a session recovery now performs a real re-login — session token and cookies are dropped, the trust token is kept so no new MFA is required — and backs off (10 s, 1 min, 5 min, 15 min, 30 min) when it keeps failing, instead of re-validating the same session token every 10 s
* (ticaki) new: option "Accept updated iCloud terms automatically" (off by default) — when Apple flags the account with `termsUpdateNeeded`, the adapter fetches the current terms version via `/getTerms`, confirms it via `/repairDone` and re-runs `accountLogin`, the way pyicloud's `accept_terms` does; enabling it means agreeing to Apple's terms without reading them
* (ticaki) fixed: a failed refresh during startup no longer reports "iCloud connection established"

### 2.1.1 (2026-09-15)
* (ticaki) fixed: the adapter crashed with `UNCAUGHT_EXCEPTION` (unhandled promise rejection `HTTP 450`) when Find My rejected the session — the Find My service started a second, unmonitored `refresh()` in its constructor in parallel to the adapter's own call; the adapter's error handling and session recovery now apply
* (ticaki) fixed: reminders text containing U+2028/U+2029 line separators or control characters is normalised before being stored

### 2.1.0 (2026-09-10)
* (ticaki) new: `calendar.agenda` — every event of a configurable window (days back / days ahead, selectable calendars) as one JSON object keyed by local day, with calendar title and colour and absolute alarm times; rebuilt on every refresh and shortly after midnight, written only when it changes
* (ticaki) fixed: an event that started before today and is still running (e.g. a multi-day all-day event) no longer disappears from the calendar slots
* (ticaki) changed: the calendar refresh and `queryCalendarEvents` share one month-by-month fetch

### 2.0.6 (2026-09-10)
* (ticaki) fixed: an MFA code requested via SMS was rejected with Apple error -21669 ("incorrect verification code") on accounts whose trusted phone number Apple reports with `pushMode: "voice"` — the code was submitted with `mode: "voice"` although Apple had confirmed SMS delivery for the request; the verification now repeats the channel and the phone payload that Apple accepted for the code request

### 2.0.5 (2026-09-06)
* (ticaki) new: when Apple refuses `/ca/startup`, the titles, colours and flags of the reconstructed calendars are now fetched separately via `/ca/collections` — such calendars only appeared under their guid before, and a list answer also brings back calendars that have no event in the queried range
* (ticaki) changed: the warning about a reconstructed calendar list now states how many calendars could be completed with their real metadata, and a title delivered by Apple is no longer overwritten by the one stored from an earlier refresh

Older changes are listed in CHANGELOG_OLD.md.

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