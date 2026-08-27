---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.icloud/README.md
title: ioBroker.icloud
hash: l8oC8rjNxbGr9CsPxPxumhQy7MaRHMcBJFABlnmDLLY=
---
![Логотип](../../../en/adapterref/iobroker.icloud/admin/icloud.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.icloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.icloud.svg)
![Количество установок](https://iobroker.live/badges/icloud-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/icloud-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.icloud.png?downloads=true)
![Немецкая документация](https://img.shields.io/badge/Doku-Deutsch-green?logo=readme)
![Документация на английском языке](https://img.shields.io/badge/docs-English-blue?logo=readme)

# IoBroker.icloud
**Тесты:** ![Тестирование и выпуск](https://github.com/ticaki/ioBroker.icloud/workflows/Test%20and%20Release/badge.svg)

## Адаптер iCloud для ioBroker
Этот адаптер интегрирует вашу учетную запись Apple iCloud с ioBroker. Он предоставляет вам доступ к широкому спектру сервисов Apple — от местоположения устройства и напоминаний до файлов Google Диска, контактов, заметок, событий календаря и вашей фотобиблиотеки — все это доступно для чтения и (где поддерживается) для записи в соответствии с настройками ioBroker или через `sendTo()`.

---

## Благодарности
Создание этого адаптера было бы невозможно без следующих проектов с открытым исходным кодом:

- **[icloud.js](https://github.com/foxt/icloud.js)** от foxt — оригинальная библиотека клиента iCloud на JavaScript, на основе которой создан и построен этот адаптер.
- **[pyicloud](https://github.com/picklepete/pyicloud)** от picklepete — эталонная реализация API iCloud от Apple на Python, которая легла в основу многих интеграций сервиса.
- **[pyicloud (форк timlaing)](https://github.com/timlaing/pyicloud)** от timlaing — активно поддерживаемый форк pyicloud, который послужил эталонной реализацией для современных напоминаний (CloudKit v2) и других актуальных деталей API.

Огромное спасибо всем, кто внес свой вклад в эти проекты!

## Отказ от ответственности
Этот адаптер — независимый проект с открытым исходным кодом, разработанный сообществом. Он **не связан с компанией Apple Inc., не одобрен ею и никоим образом официально с ней не сотрудничает.**

*iCloud*, *Find My*, *Apple ID*, *iCloud Drive* и все другие товарные знаки Apple являются собственностью Apple Inc. Все названия продуктов, логотипы и бренды являются собственностью их соответствующих владельцев. Использование этих названий осуществляется исключительно в целях идентификации.

Данный адаптер использует API-интерфейсы, применяемые собственными клиентами Apple для доступа к сервисам iCloud. Использование этих API-интерфейсов регулируется Условиями предоставления услуг Apple. Используя данный адаптер, вы соглашаетесь соблюдать все применимые условия Apple. Автор не несет ответственности за любое неправомерное использование адаптера или любые нарушения Условий предоставления услуг Apple.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-06-28)
* (ticaki) **New: FIDO2 / security-key MFA** — sign in with a hardware security key (passkey) straight from the admin panel; the full sign-in ceremony runs in the background with a live, localized status (MFA panel translated into 11 languages)
* (ticaki) Admin: the security-key button now shows a live "running" state while the background ceremony is in progress
* (ticaki) fixed: object writes in `syncMap` now use read-merge-write (`getObject` + `setObject`) so existing ACLs and custom settings are preserved instead of being overwritten
* (ticaki) changed: internal waits (security-key polling, PCS consent, geocoder rate-throttle) now use the cancellable adapter timer, so pending timers are cleared cleanly when the adapter unloads
* (ticaki) changed: geocoder HTTP requests now use `AbortSignal.timeout` with improved timeout detection
* (ticaki) fixed: addressed ioBroker repochecker findings for the latest-repo listing

### 0.7.7 (2026-05-11)
- (ticaki) Extends an ioBroker object only when the provided partial object has actually changed

### 0.7.6 (2026-04-26)
* (ticaki) fixed: SMS 2FA verification mode is now always forced to `sms` — using `pushMode` from the trusted phone could cause authentication failures

### 0.7.5 (2026-04-23)
* (ticaki) changed: Removed unused keytar dependency and code.
* (ticaki) fixed: jsonConfig warnings / all repochecker error, warnings
* (ticaki) donate link

### 0.7.4 (2026-04-22)
* (ticaki) New: SMS MFA panel in the General admin tab — appears automatically below the login fields when the adapter requests MFA; lets you request an SMS code and submit the 6-digit code directly from the admin UI without touching ioBroker states; visibility is driven by an internal adapter variable (not the `mfa.required` state) so the panel only appears once the adapter is ready to accept the code

Older changes are listed in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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