---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pid/README.md
title: ioBroker.pid
hash: 9UJOPypmxkFfxvXFuqf+wbRiFmcNAW2l/q/xAjD51bM=
---
![Логотип](../../../en/adapterref/iobroker.pid/admin/pid.png)

![Лицензия GitHub](https://img.shields.io/github/license/mcm4iob/ioBroker.pid)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pid.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/mcm4iob/ioBroker.pid)
![Активность коммитов GitHub](https://img.shields.io/github/commit-activity/m/mcm4iob/ioBroker.pid)
![Коммиты GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/mcm4iob/ioBroker.pid/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/mcm4iob/ioBroker.pid)
![Проблемы с GitHub](https://img.shields.io/github/issues/mcm4iob/ioBroker.pid)
![версия НПМ](http://img.shields.io/npm/v/iobroker.pid.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/pid-stable.svg)
![Количество установок](https://iobroker.live/badges/pid-installed.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.pid
**Общая информация:**<br> [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/pid/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br></br> **Версия:**</br></br> **Тесты:**</br> [![Тестирование и выпуск](https://github.com/mcm4iob/ioBroker.pid/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/mcm4iob/ioBroker.pid/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/mcm4iob/ioBroker.pid/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mcm4iob/ioBroker.pid/actions/workflows/github-code-scanning/codeql)<br> **Пожертвование:**</br>

**************************************************************************************************************

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее и как отключить отправку сообщений об ошибках см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется, начиная с js-controller 3.0.
**************************************************************************************************************

## Адаптер PID для ioBroker
Этот адаптер оснащен настраиваемым ПИД-регулятором.

**************************************************************************************************************

## Отказ от ответственности
**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками своих соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями или их одобрения! Этот личный проект поддерживается в свободное время и не имеет коммерческой цели.**

**************************************************************************************************************

## Общая информация
Данный адаптер обеспечивает функциональность ПИД-регулятора.

На практике ПИД-регулятор автоматически рассчитывает значение коррекции для системы на основе фактического значения и уставки. Этот процесс регулируется параметрами. Типичным примером служит круиз-контроль автомобиля, где подъём на холм снижает скорость при постоянной мощности двигателя. ПИД-алгоритм регулятора восстанавливает измеренную скорость до заданной с минимальной задержкой и перерегулированием, управляемо увеличивая выходную мощность двигателя. [(c) Википедия]

В одном экземпляре адаптера может быть настроено более одного контроллера. Адаптер поддерживает настройку параметров (P-, I-, D-составляющих) и времени цикла, используемого для расчёта. Кроме того, расчёт можно приостанавливать и возобновлять, а контроллер можно сбрасывать. Для удобства сервера можно включить ручной режим для непосредственной настройки выходного сигнала. Выходной сигнал может быть ограничен минимальным/максимальным значением и содержать фиксированное смещение.

Все соответствующие значения, включая внутренние данные, доступны в виде состояний для целей диагностики.

## Документация
[документация на английском языке](docs/en/pid_en.md)<br> [deutsche Dokumentation](docs/de/pid_de.md)

## Кредиты
Создание этого адаптера было бы невозможно без великолепной работы @Philmod (https://github.com/Philmod), который разработал node-pid-controller (https://github.com/Philmod/node-pid-controller).

## Как сообщать о проблемах и запрашивать новые функции
Для этого используйте GitHub Issues.

Лучше всего перевести адаптер в режим отладки журнала (Экземпляры -> Режим эксперта -> Уровень журнала столбцов). Затем, пожалуйста, получите файл журнала с диска (подкаталог "log" в каталоге установки ioBroker, а не из папки администратора, поскольку администратор обрезает строки). Если вам не нравится предоставлять его в задаче GitHub, вы также можете отправить его мне по электронной почте (mcm57@gmx.at). Пожалуйста, добавьте ссылку на соответствующую задачу GitHub и опишите, что я вижу в журнале и в какой момент времени.
"title": "lblCtrlInvert",

**************************************************************************************************************

**Если вам понравился этот адаптер, пожалуйста, рассмотрите возможность пожертвования:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.3 (2024-03-22)

-   (mcm1957) Adapter uses sentry to report errors now.

### 1.0.0 (2024-03-11)

-   (mcm1957) BREAKING: Adapter requires node.js 18 or newer now
-   (mcm1957) BREAKING: Adapter requires js-controller 5.x.x and admin 6.x.x or newer now
-   (mcm1957) BREAKING: Adapter requires node.js 18 or newer now
-   (mcm1957) Incorrect error message whenever no controllers have been defied has been removed. [#68]
-   (mcm1957) State roles have been reviewed and adapted. [#88]
-   (mcm1957) Dependencies have been updated.

### 0.0.8 (2023-07-13)

-   (mcm1957) changed: Overall stability during state updates has been increased
-   (mcm1957) changed: Dependencies have been updated

### 0.0.7 (2023-04-24)

-   (mcm1957) changed: Cycle time is now required to be at least 100ms
-   (mcm1957) changed: Recalculations are now controlled by cycle timer only, no extra updates are performed (#62)
-   (mcm1957) changed: Several dependencies have been updated

### 0.0.6 (2023-04-14)

-   (mcm1957) solved: Calculation of sumerr in case of hitting max/min Limits has been corrected

### 0.0.5 (2023-04-14)

-   (mcm1957) new: npm/npmjs support has been added

### 0.0.4 (2023-04-14)

-   (mcm1957) changed: State last_upd_str has been removed
-   (mcm1957) changed: Some roles have been updated
-   (mcm1957) changed: Translations have been updated

### 0.0.3-alpha.1 (2023-04-13)

-   (mcm1957) changed: Setting rst state does no longer trigger a recalculation
-   (mcm1957) changed: State diff now displays error value even if sup is active
-   (mcm1957) changed: Calculation of I-part has been changed, changing Tn effects future calculations only now

### 0.0.3-alpha.0 (2023-04-12)

-   (mcm1957) new: optionally use folder structure for states
-   (mcm1957) changed: reset timer at restart after pausing calculation
-   (mcm1957) changed: use values stored for ack and set when starting adapter
-   (mcm1957) changed: log state changes with unexpected ack=true
-   (mcm1957) changed: fix incorrect updates occuring whenever act is written
-   (mcm1957) changed: fix invert flag not working at all
-   (mcm1957) changed: remove error display whenever adapter is hitting the limits
-   (mcm1957) changed: fix q flag handling
-   (mcm1957) changed: fix unexpected bahavior of sup parameter
-   (mcm1957) changed: rename run state to hold

### 0.0.2-alpha.2 (2023-04-06)

-   (mcm1957) changed: values of 'kp', 'xp' and 'sup' are now verified if set using states
-   (mcm1957) changed: values of 'min' and 'max' are now verified if set using states
-   (mcm1957) changed: activation of 'man' updates output 'y' with current value of 'man_inp' now
-   (mcm1957) changed: 'min' value is now conserved when restarting the instance
-   (mcm1957) changed: conversion between and xp has been fixed at several places
-   (mcm1957) changed: 'kp' or 'xp' are writepotected now depending on 'useXp' parameter

### 0.0.2-alpha.1 (2023-04-04)

-   (mcm1957) changed: some small fixes

### 0.0.2-alpha.0 (2023-04-04)

-   (mcm1957) THIS IS AN ALPHA RELEASE ONLY
-   (mcm1957) major changes after discussion in forum
-   (mcm1957) new initial release

## License

MIT License

Copyright (c) 2023-2024 mcm1957 <mcm57@gmx.at>

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