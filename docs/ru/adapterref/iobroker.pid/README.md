---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pid/README.md
title: ioBroker.pid
hash: T3lRBLIggbW/x5Eu3EnCKSmX6yzwBn4JHckOhGrlWgk=
---
![Логотип](../../../en/adapterref/iobroker.pid/admin/pid.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.pid)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pid.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.pid)
![Активность фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.pid)
![Коммиты GitHub с момента последней версии (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.pid/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.pid)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.pid)
![версия NPM](http://img.shields.io/npm/v/iobroker.pid.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/pid-stable.svg)
![Количество установок](https://iobroker.live/badges/pid-installed.svg)

# IoBroker.pid
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/pid/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск] (https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/test-and-release.yml) [![CodeQL] (https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/codeql.yml)

<!--

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.
-->
## Адаптер PID для ioBroker
Этот адаптер обеспечивает настраиваемый ПИД-регулятор.

## Общая информация
Этот адаптер обеспечивает функциональность ПИД-регулятора.

С практической точки зрения, ПИД-регулятор автоматически рассчитывает значение коррекции для системы на основе фактического значения и заданного значения. Поведение управляется параметрами. Повседневным примером является круиз-контроль в автомобиле, где подъем на холм снижает скорость, если применяется постоянная мощность двигателя. Алгоритм ПИД-регулятора восстанавливает измеренную скорость до желаемой скорости с минимальной задержкой и выбросом за счет контролируемого увеличения выходной мощности двигателя. [(с) Википедия]

В пределах одного экземпляра адаптера может быть настроено более одного контроллера. Адаптер поддерживает настройку параметров (компоненты P, I, D) и времени цикла, используемого для расчета. Кроме того, вычисление может быть приостановлено и возобновлено, а контроллер вообще может быть сброшен. В качестве удобного сервера можно включить ручной режим для непосредственной установки вывода. Вывод может быть ограничен минимальным/максимальным значением и содержать фиксированное смещение.

Все соответствующие значения, включая внутренние данные, доступны в виде состояний для целей диагностики.

## Документация
[английская документация](docs/en/pid_en.md)<br> [немецкая документация](docs/de/pid_de.md)

## Кредиты
Предоставление этого адаптера было бы невозможно без большой работы @Philmod (https://github.com/Philmod), который разработал node-pid-controller (https://github.com/Philmod/node-pid-controller). .

## Как сообщать о проблемах и запросах функций
Пожалуйста, используйте для этого задачи GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Режим эксперта -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не от администратора, потому что администратор обрезает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (mcm57@gmx.at). Пожалуйста, добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.
"title": "lblCtrlInvert",

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2023 mcm1957 <mcm57@gmx.at>

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