---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.electrolux-aeg/README.md
title: ioBroker.electrolux-aeg
hash: ySRwwnUskHJWDdPnxuwM8ymfCPzdXbgnFgcdqeC2aaY=
---
![Логотип](../../../en/adapterref/iobroker.electrolux-aeg/admin/electrolux-aeg.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.electrolux-aeg.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.electrolux-aeg.svg)
![Количество установок](https://iobroker.live/badges/electrolux-aeg-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/electrolux-aeg-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.electrolux-aeg.png?downloads=true)

# IoBroker.electrolux-aeg
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.electrolux-aeg/workflows/Test%20and%20Release/badge.svg)

## Адаптер electrolux-aeg для ioBroker
Адаптер для Electrolux и AEG

Управление поддерживаемыми устройствами осуществляется через официальные сервисы [Electrolux](https://www.electrolux.com/) и [AEG]](https://www.aeg.com/) для подключенных устройств.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Контроль
electrolux-aeg.0.XXXX.remote

## Статус
electrolux-aeg.0.XXXX.status

## Прямые трансляции
electrolux-aeg.0.XXXX.events

## Changelog

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.14 (2026-08-06)

- Button states (`remote.Refresh`, `remote.START`, `remote.STOPRESET`) are now write-only (`read: false`) as required by the ioBroker state role specification.
- Sanitize remote command names coming from the cloud API before using them as object IDs; the raw command name is still sent to the API.
- Redact WebSocket debug logs instead of logging the raw payload.
- Await the logout request during unload and give it a shorter timeout than regular requests.
- Update axios to 1.19.0.

### 0.0.13 (2026-07-04)

- Trim old `common.news` entries for repository review.

### 0.0.12 (2026-07-04)

- Exclude `CHANGELOG_OLD.md` and test files from npm publishing.
- Tighten object ID sanitization to replace commas.
- Remove stale commented-out logout code and document raw/sanitized appliance ID mapping.

### 0.0.11 (2026-07-03)

- Republish the latest repository review fixes with npm provenance.
- Remove obsolete ESLint and Prettier dependencies after migrating to `@iobroker/eslint-config`.

### 0.0.10 (2026-07-03)

- Republish the 0.0.9 migration fixes with npm provenance.

### 0.0.9 (2026-07-03)

- Breaking: sanitize appliance object IDs. Characters like `:` are replaced with `_`; update scripts, aliases, VIS and history settings that reference old IDs.
- Remove old unsanitized appliance object trees after creating the new sanitized objects.
- Handle temporary Electrolux API gateway timeouts without error log spam

### 0.0.8 (2026-06-29)

- Hardened login, token refresh and WebSocket reconnect
- Added active alert summary states under `.status.activeAlert*`
- Fixed brand parameter for AEG accounts

### 0.0.6 (2025-12-09)

- fix refresh token

Older changes are documented in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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