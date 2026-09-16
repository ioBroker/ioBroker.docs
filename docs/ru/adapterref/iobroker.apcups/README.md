---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apcups/README.md
title: ioBroker.appucs
hash: 8MtYCWlnANmTGicaxejrChkphKxIU84teCQwg71D+oA=
---
![Логотип](../../../en/adapterref/iobroker.apcups/admin/ups.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.apcups.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.apcups.svg)
![Количество установок (последние)](https://iobroker.live/badges/apcups-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/apcups-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.apcups.png?downloads=true)
![Тестирование и выпуск](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.appucs

## Адаптер ИБП APC для ioBroker

Адаптер для ioBroker, позволяющий получать информацию от ИБП APS через apcupsd.

Домашняя страница apcupsd: <http://www.apcupsd.org/>

apcupsd — это демон для управления ИБП APC. С помощью этого адаптера вы можете отслеживать состояние ИБП и принимать решения на основе предоставленной информации.

**Установите apcupsd в Ubuntu:**

sudo apt-get -y install apcupsd

Более подробную информацию о настройке apcupsd для Ubuntu можно найти на сайте <https://help.ubuntu.com/community/apcupsd>

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Changelog
### 6.0.3 (2026-05-31)
- Fixed ESLint configuration
- Removed obsolete devDependencies
- Refactored connection timeout to use native socket timeout
- Updated npm configuration

### 6.0.2 (2026-05-30)
- Fixed CI/CD deploy workflow to use Trusted Publishing
- Fixed setTimeout usage in connection handler
- Updated dependencies

### 6.0.1 (2026-05-29)
- Fixed adapter startup on invalid configuration
- Fixed CI workflow for TypeScript build
- Updated dependencies

### 6.0.0 (2026-05-28)
- Migrated adapter source code to TypeScript
- Added TypeScript build pipeline
- CI now tests on all branches
- Updated dependencies

### 5.0.9 (2026-05-28)
- Migrated i18n to short format (`{lang}.json`)
- Migrated ESLint config to `@iobroker/eslint-config`
- Deploy workflow now publishes to Sentry before npm
- Updated `@alcalzone/release-script` to 5.2.0
- Updated dependencies

### 5.0.8 (2026-05-25)
- Fixed float regex to correctly match whole-number values (e.g. BCHARGE at 100%)
- Fixed integer fields incorrectly stored as floats (parseFloat → parseInt)
- Fixed state object mutation that could corrupt subsequent state definitions
- Fixed null dereference crash in availability check on first run
- Fixed connection log messages showing `undefined:undefined`
- Added 5-second TCP connection timeout to prevent polling hangs on unreachable hosts
- Updated CI workflow to use ioBroker testing actions
- Updated dependencies

[Older changelogs can be found there](https://github.com/XHunter74/ioBroker.apcups/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Serhiy Krasovskyy xhunter74@gmail.com"

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