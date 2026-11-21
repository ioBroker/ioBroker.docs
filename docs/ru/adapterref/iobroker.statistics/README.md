---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.statistics?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.statistics?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.statistics?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.statistics?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.statistics?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.statistics/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.statistics.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/statistics-stable.svg
BADGE-Installed: https://iobroker.live/badges/statistics-installed.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/statistics/svg-badge.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: 0FE0AslwJYzrFgHfODE9/RA/FMg2gj1UYyO0nnuJIpU=
---
![Логотип](../../../en/admin/statistics.png)

# ioBroker.statistics

Этот адаптер упростит настройку статистики.

**Адаптер реагирует только на изменения состояния (state.ack = true), а не на команды!**

Выберите один из следующих вариантов настроек:

- Подсчет импульсов или изменений состояния включения/выключения (только для бинарных значений и положительного фронта).
- Рассчитать затраты на основе подсчитанных значений (только для бинарных значений).
- Как долго статус был true/включен и как долго false/выключен (только для двоичных значений)?
- Разница между зарегистрированными аналоговыми значениями (только для аналоговых значений)
- Максимальное, минимальное и среднее значение за сутки (не для расчетов разницы).
- мин/макс в течение года
- Подсчеты с точностью до 5 минут, а также суточные максимум, минимум и среднее значение (не для расчетов дельты).
- сумма сгруппированных значений

Адаптер подписывается на настроенные объекты и создает собственные состояния в дереве статистики.

Создаются 2 отдельных дерева:

- `statistics.0.save` -> итоговые значения временного интервала
- `statistics.0.temp` -> Временные значения сохраняются до момента передачи, затем временные значения запускаются снова.

Структура государства такова: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

## Настройки

- Укажите соответствующие группы на странице конфигурации экземпляра (администратор => экземпляры => конфигурация статистики).
- Укажите конфигурацию в настройках состояния (администратор => объекты).
- необязательно для указания количества состояний: `Ignore values below` (`ignoreBelowNumber`) и `Ignore values above` (`ignoreAboveNumber` Значения, выходящие за эти пределы, игнорируются при всех вычислениях (мин/макс, среднее, дельта). Оставьте поле пустым, чтобы отключить эту функцию.

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now
* (GermanBluefox) Added options to ignore values below/above a limit (#486)
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 5.0.0 (2026-06-02)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Adapter requires admin >= 7.7.22 now
* (@klein0r) Added option to use a weighted average (based on time delta between changes)
* (@klein0r) Optimized avg calculation (without using a sum)
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 4.0.0 (2025-04-16)
NodeJS >= 20.x and js-controller >= 6 is required

### 3.1.0 (2024-11-18)

* (@simatec) Added responsive jsonConfig
* (@klein0r) Copy unit of source state to all statistic states

### 3.0.0 (2024-11-15)
NodeJS >= 18.x and js-controller >= 5 is required

### 2.4.0 (2023-11-03)
NodeJS 16.x is required

* (klein0r) Show error if groups are not configured correctly
* (klein0r) Fixed cron expressions for quarter and year
* (klein0r) Added indicators for startup and working

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2026 foxthefox <foxthefox@wysiwis.net>,
                        bluefox <dogafox@gmail.com> and
                        Matthias Kleine <info@haus-automatisierung.com>

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