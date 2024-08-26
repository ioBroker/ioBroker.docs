---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.statistics?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.statistics?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.statistics?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.statistics?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.statistics?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.statistics?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/iobroker-community-adapters/iobroker.statistics/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/iobroker-community-adapters/iobroker.statistics?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.statistics.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/statistics-stable.svg
BADGE-Installed: http://iobroker.live/badges/statistics-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.statistics/README.md
title: ioBroker.статистика
hash: V92dfCJJef+vDHFwjWqxZbwltEJlUayZvL+0vSXTzSw=
---
![Логотип](../../../en/admin/statistics.png)

# IoBroker.статистика
Этот адаптер упростит настройку статистики.

**Адаптер реагирует только на изменение состояния (state.ack = true), а не на команды!**

Выберите один из следующих параметров:

* подсчитывать импульсы или изменения включения/выключения (только для двоичных значений и положительного фронта)
* рассчитать затраты из подсчитанных значений (только для двоичных значений)
* как долго был статус true/ON и как долго false/OFF (только для бинарных значений)
* дельта между записанными аналоговыми значениями (только для аналоговых значений)
* дневной максимум, минимум и среднее значение (не для расчета дельты)
* мин/макс за год
* считает в течение 5 минут и дневного максимума, минимума и среднего значения (не для расчета дельты)
* сумма сгруппированных значений

Адаптер подписывается на настроенные объекты и создает свои состояния в дереве статистики.

Создаются 2 отдельных дерева:

* `statistics.0.save` -> окончательные значения таймфрейма
* `statistics.0.temp` -> временные значения до момента передачи для сохранения, затем снова запускается temp

Структура состояния: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

## Настройки
* укажите соответствующие группы на странице конфигурации инстанса (admin => instances => stats config)
* указать конфигурацию в настройках состояния (админ=>объекты)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__

* (klein0r) Show error if groups are not configured correctly

### 2.3.1 (2023-01-11)
* (klein0r) Added Ukrainian language

### 2.3.0 (2022-11-03)
NodeJS 14.5.0 is required

* (klein0r) Added hourly, weekly, monthly, ... averages
* (klein0r) Added promises to avoid parallel execution of tasks (lead to incorrect calculations)
* (klein0r) Fixed init values for save/temp
* (klein0r) Added option to enable statistics for objects via sendTo
* (klein0r) Allow sum delta to substract values (negative delta)
* (klein0r) Delete states when option in unchecked
* (klein0r) Removed dayMin and dayMax from avg (use minmax for that case!)
* (klein0r) Fix: Calculation of avg when no change of value

### 2.2.0 (2022-07-07)
* (klein0r) Added absolute min and max values

### 2.1.1 (2022-06-16)
* (klein0r) Fixed usage of default values for groups

### 2.1.0 (2022-06-16)
* (klein0r) Added support for translated object names
* (klein0r) Fixed sum calculation
* (klein0r) Increased precision to 5 digits
* (klein0r) Translated all objects

## License

The MIT License (MIT)

Copyright (c) 2018-2023 foxthefox <foxthefox@wysiwis.net>,
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
