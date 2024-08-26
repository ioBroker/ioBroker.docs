---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.chargemaster/README.md
title: ioBroker.chargemaster
hash: xvFIPavgdxAYZECCfr+v6WITn12RRC+P9OASJVe7DQU=
---
![Логотип](../../../en/adapterref/iobroker.chargemaster/admin/chargemaster.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.chargemaster?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.chargemaster?label=npm%20downloads&style=flat-square)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.chargemaster?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.chargemaster?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.chargemaster?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.chargemaster/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.chargemaster?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.chargemaster/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.chargemaster.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/chargemaster-stable.svg)
![Установлено](https://iobroker.live/badges/chargemaster-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.chargemaster.png?downloads=true)

# IoBroker.chargemaster
[![CodeQL](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml)

## Версии
## Адаптер для управления одним или несколькими зарядными устройствами для электромобилей с использованием солнечной энергии
**!!! ЭТОТ АДАПТЕР ВСЕ ЕЩЕ НАХОДИТСЯ В СТАДИИ РАЗРАБОТКИ!!!**

Адаптер для управления одним или несколькими зарядными устройствами для электромобилей (wallbox) с использованием энергии от солнечных батарей. В настоящее время адаптер поддерживает до 3 настенных станций для электромобилей для управления зарядкой доступной мощности сети с потенциальным использованием избыточной энергии от солнечных батарей.

## Настройки
Для подключения к настенным устройствам введите в конфигурацию штаты с необходимыми данными.

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Для получения дополнительных сведений и информации о том, как отключить отчеты об ошибках, обратитесь к [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry инициируются, начиная с js-controller 3.0.

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=H5PMQ8JKQL7SL"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект � или вы просто чувствуете себя щедрым, подумайте о том, чтобы купить мне пива. Ура! :beers:

## Протестировано с
- 3 зарядных устройства go-E и Костал ПикоБА

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 0.11.0 (2024-08-24)

-   (HombachC) implement variable wallbox amount 
-   (HombachC) fix errors in wallbox control
-   (HombachC) complete rework of configuration screen
-   (HombachC) move utils to extra class
-   (HombachC) switch to ECMA 2022 code
-   (HombachC) bumped dependencies

### 0.10.0 (2024-08-18)

-   (HombachC) switch to Typescript
-   (HombachC) change adapter type to "energy"
-   (HombachC) replace deprecated setStateAsync

### 0.9.3 (2024-08-18)

-   (HombachC) change translation handling
-   (HombachC) code and repository cleanup
-   (HombachC) prepare switch to Typescript

### 0.9.2 (2024-08-16)

-   (HombachC) fixed vulnerability in dependency
-   (HombachC) added tests for node 22

### 0.9.1 (2024-08-06)

-   (HombachC) fixed issues detected by repository checker (#494)
-   (HombachC) code cleanups

### 0.9.0 (2024-04-20)

-   (HombachC) BREAKING: dropped support for node.js 16 (#455)
-   (HombachC) BREAKING: js-controller >= 5 is required (#456)

### 0.8.5 (2024-03-27)

-   (HombachC) updated CI definitions, switched to node 20 as main test scenario
-   (HombachC) corrected io-package.json according to new schema
-   (HombachC) bumped dependencies

### 0.8.4 (2023-12-29)

-   (HombachC) BREAKING: dropped support for js-controller 3.x
-   (HombachC) Year 2024 changes
-   (HombachC) Bump axios to 1.6.3 because of vulnerability

### 0.8.3 (2023-10-29)

-   (HombachC) Bumb adapter core to 3.x
-   (HombachC) Bump axios to 1.6.0 because of vulnerability

### 0.8.2 (2023-10-01)

-   (HombachC) Several dependency updates
-   (HombachC) Fixed acknowledging of state changes (#339)

### 0.8.1 (2023-08-29)

-   (HombachC) bumped dependencies, added min/max to settings state defaults

### 0.8.0 (2023-06-23)

-   (HombachC) changed config screen to admin 5 solution

### 0.7.2 (2023-06-19)

-   (HombachC) Removed Travis 

### 0.7.1 (2023-06-13)

-   (HombachC) Fixed typo in docu, added translations 

### 0.7.0 (2023-06-11)

-   (HombachC) BREAKING: dropped node.js 14 support
-   (HombachC) Add tests for node.js 20, removed for node.js 14, bumped dependencies
-   (HombachC) BREAKING: dropped ioBroker.admin 4 support

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2021-2024 Christian Hombach

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
