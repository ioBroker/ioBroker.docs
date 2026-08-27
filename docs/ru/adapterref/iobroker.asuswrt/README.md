---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asuswrt/README.md
title: ioBroker.asuswrt
hash: Xv8JPVLXL+BoBQ3TFyJN817HOEilIdlAw/RAXyj+5ao=
---
![Логотип](../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)

![Количество установок](http://iobroker.live/badges/asuswrt-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.asuswrt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![НПМ](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)

# IoBroker.asuswrt
=================

## Адаптер ASUSWRT для ioBroker
Поиск активных устройств в маршрутизаторах ASUS под управлением ASUSWRT.
Вы можете использовать это, например, для определения присутствия телефонов, чтобы отслеживать, находится ли кто-то дома.

Протестировано на материнской плате Asus GT-AC5300 с операционной системой ASUSWRT 3.0.0.4.384_32799.

Список маршрутизаторов, которые НЕ используют ASUSWRT, можно найти здесь: https://event.asus.com/2013/nw/ASUSWRT/

## Требования
Необходимо активировать и разрешить SSH-соединения в настройках маршрутизатора.

Вам потребуется как минимум:

* js-controller >= 6.0.11
* admin >= 7.6.20
* Node.js >= 22

Для более старых версий ioBroker установите версию 0.3.1.

## Настраивать
* IP-адрес маршрутизатора Asus (обязательно)
* IP-адрес маршрутизатора Asus
* Вход в систему (обязательно)
* Имя пользователя для входа в систему маршрутизатора Asus
* Пароль для входа (необязательно, если используется файл закрытого ключа)
* Пароль для входа пользователя в систему
* При использовании файла закрытого ключа оставьте это поле пустым.
* Файл закрытого ключа (необязательно, если используется пароль)
* Если вы не хотите использовать вход по паролю, вы можете указать путь к файлу закрытого ключа для входа по SSH.
* Оставьте пустым, если не требуется
* Пароль для файла закрытого ключа (необязательно, если файл закрытого ключа зашифрован)
* Если ваш файл ключа зашифрован с помощью парольной фразы, введите ее здесь.
* Оставьте пустым, если не требуется
* SSH-порт (обязательно)
* Порт для SSH-подключения к маршрутизатору Asus
* Время опроса
* Время в миллисекундах, необходимое для проверки активных устройств (минимальное время 5000 мс = 5 с).
* Время неактивно
* Время в миллисекундах, в течение которого устройство больше не активно.
* В моем случае 180000 мс = 180 с = 3 минуты работает идеально. Минимальное значение — 60000 мс.
* Адреса для мониторинга
* Добавляйте устройства для отслеживания, независимо от того, активны они или нет, используя MAC-адрес устройства.
* Не забудьте поставить галочку, чтобы активировать мониторинг.

## Changelog

### 1.0.7 (2026-07-07)
* (mcdhrts) Resolve all remaining repository checker issues (#106)
* (mcdhrts) Update dependencies: @iobroker/adapter-core ^3.4.1, @alcalzone/release-script ^5.2.1, @types/node ~22
* (mcdhrts) Add explicit "i18n": true to admin/jsonConfig.json5
* (mcdhrts) Translate remaining untranslated ru i18n keys
* (mcdhrts) Add 1.0.6 changelog entry to README
* (mcdhrts) Add dependency overrides to reduce transitive dev-dependency security vulnerabilities
* (mcdhrts) Merge form-data security update

### 1.0.6 (2026-05-30)
* (mcdhrts) Resolve repository checker issues, deprecated methods and improve CI (#95, #97)
* (mcdhrts) Translate i18n files into native languages and restore missing language files (#95)
* (mcdhrts) Resolve all remaining repository checker issues (#99)
* (mcdhrts) Update tsconfig node target from template (#98)

### 1.0.5 (2026-05-28)
* (mcdhrts) Fix deprecated method usage: use delObject with recursive flag (Issue #97)
* (mcdhrts) Fix eslint.config.mjs to properly use @iobroker/eslint-config (E0077)
* (mcdhrts) Add missing xs/xl size attributes to admin jsonConfig fields (E5507)
* (mcdhrts) Update workflow node.js version to 24 for deploy and lint jobs (E3022, S3021)
* (mcdhrts) Add needs dependency between adapter-tests and check-and-lint jobs (S3014)
* (mcdhrts) Add prettier.config.mjs for @iobroker/eslint-config compatibility (W0076)
* (mcdhrts) Remove obsolete eslint devDependency (W0078)
* (mcdhrts) Fix @types/node version constraint to ~22 (W0066)
* (mcdhrts) Trim common.news to 7 entries (W1032)
* (mcdhrts) Fix dependabot: add cooldown, ignore @types/node major, increase PR limit (W8915, W8917, S8908)
* (mcdhrts) Improve ip neigh parsing to handle multiple spaces
* (mcdhrts) Modernize code style, fix line endings, add CHANGELOG_OLD.md

### 1.0.4 (2026-04-01)
* (mcdhrts) Improve parsing of ip neigh output to handle multiple spaces, update dependencies

### 1.0.3 (2025-10-11)
* (mcdhrts) Migrated to modern i18n format with separate translation files in admin/i18n/ directory
* (mcdhrts) Migrated from HTML-based admin interface to JSON Config system (Admin 5+) for better user experience
* (mcdhrts) Fixed critical issue where admin folder was not included in npm package (404 error on jsonConfig.json)
* (mcdhrts) Fixed + button not responding in device monitoring table
* (mcdhrts) Improved parsing of ip neigh command output for better device detection
* (mcdhrts) Fixed all ioBroker repository checker issues (E5507, W4042, W4044)
* (mcdhrts) Added comprehensive configuration validation with min/max values
* (mcdhrts) Added VS Code settings with JSON schema definitions for better development experience
* (mcdhrts) Removed invalid i18n property from io-package.json
* (mcdhrts) Updated release configuration format to dictionary

### 1.0.2 (2025-10-05)
* (mcdhrts) Fixed admin UI 404 error - renamed index_m.html to index.html
* (mcdhrts) Updated requirements documentation to reflect current dependencies (js-controller >= 6.0.11, admin >= 7.6.17, Node.js >= 18.x)
* (mcdhrts) Improved integration tests with proper test harness and configuration validation
* (mcdhrts) Removed deprecated unit tests in favor of modern integration tests
* (mcdhrts) Updated dependencies: ssh2 ^1.4.0 -> ^1.17.0, @iobroker/adapter-core ^3.3.1 -> ^3.3.2, @iobroker/testing ^5.0.4 -> ^5.1.1
* (mcdhrts) Removed deprecated devDependencies: gulp, mocha, chai (now handled by @iobroker/testing)

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

[Older changes](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2025-2026 mcdhrts <mcdhrts@outlook.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.