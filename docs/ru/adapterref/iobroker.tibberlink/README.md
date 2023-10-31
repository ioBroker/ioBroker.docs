---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: LT/LhbUF0XVZzj2ztND+GmoRHWjQULtqliGgbKeB0qc=
---
![Логотип](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Аппвейор-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/tibberlink-stable.svg)
![Установлен](https://iobroker.live/badges/tibberlink-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL] (https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-anasis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## Версии
## Адаптер для использования данных об энергии TIBBER в ioBroker
Этот адаптер облегчает подключение данных из API вашей учетной записи Tibber для использования в ioBroker, будь то для одного дома или нескольких домов.

Если вы в настоящее время не являетесь пользователем Tibber, я был бы очень признателен, если бы вы использовали мою реферальную ссылку: [Реферальная ссылка Тиббера](https://invite.tibber.com/mu8c82n5).

## Стандартная конфигурация
- Начните с создания нового экземпляра адаптера.
- Вам также потребуется токен API от Tibber, который вы можете получить здесь: [Tibber Developer API](https://developer.tibber.com).
- Введите свой токен API Tibber в стандартных настройках и настройте хотя бы одну строку для настроек прямой трансляции (выберите «Нет доступно»).
- Сохраните настройки и выйдите из конфигурации, чтобы перезагрузить адаптер; этот шаг позволяет запрашивать ваш дом(ы) с сервера Tibber.
- Вернитесь на экран конфигурации и выберите дома, из которых вы хотите получать данные в реальном времени с помощью Tibber Pulse. Вы также можете выбрать дома и отключить ленту (Примечание: это работает, только если оборудование установлено и сервер Tibber проверил соединение с Pulse).
- Сохраните настройки.

## Конфигурация калькулятора
- Теперь, когда соединение Tibber установлено и работает, вы также можете использовать калькулятор для включения дополнительных функций автоматизации в адаптер TibberLink.
- Калькулятор работает с использованием каналов, каждый из которых связан с выбранным домом.
- Эти каналы можно активировать или деактивировать в зависимости от соответствующих состояний.
— Эти состояния предназначены для использования в качестве внешних динамических входных данных для TibberLink, что позволяет вам, например, корректировать предельную стоимость («TriggerPrice») из внешнего источника или отключать канал калькулятора («Активный»).
- Состояния канала калькулятора располагаются рядом с исходными состояниями и называются в соответствии с номером канала.

    ![Состояния калькулятора](../../../en/adapterref/iobroker.tibberlink/admin/calculatorStates.png)

- Поведение каждого канала определяется его типом: «лучшая стоимость», «лучшие отдельные часы» или «лучший блок часов».
- Каждый канал заполняет внешнее состояние в качестве выхода, которое необходимо выбрать на вкладке настроек. Например, это состояние может быть «0_userdata.0.example_state» или любым другим доступным для записи внешним состоянием.
- Значения, которые должны быть записаны в выходное состояние, могут быть определены в «значении ДА» и «значении НЕТ», например, «истина» для логических состояний или числа или текста для записи.
- Выходы:
    - «Лучшая стоимость»: в качестве входных данных используется состояние «TriggerPrice», а выходным сигналом является «ДА» каждый час, когда текущая стоимость энергии Tibber ниже триггерной цены.
    - «Лучшие отдельные часы»: выходное значение «ДА» в течение самого дешевого количества часов, число которого определяется в состоянии «AmountHours».
    - «Блок лучших часов»: вывод «ДА» в течение лучшего блока часов, при этом количество часов определяется в состоянии «AmountHours».

## Примечания
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, обратитесь к разделу [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry запускаются начиная с js-controller 3.0.

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 1.4.2 (2023-11-xx) WORK in PROGRESS

-   (HombachC) complete rework of task scheduling for more precise pull timing (#149)
-   (HombachC) critical vulnerability fix for axios
-   (HombachC) fix debug message typos, code optimisations
-   (HombachC) fix type error in price average calculation notified by Sentry

### 1.4.1 (2023-10-25)

-   (HombachC) implement forced update of all data after adapter restart (#155)
-   (HombachC) Bump actions/setup-node from 3.8.1 to 4.0.0 (#157)
-   (HombachC) remove node.js 16 actions - dependency updates

### 1.4.0 (2023-10-24)

-   (HombachC) implement min/max states (#131)
-   (HombachC) fix error with ignored calculator channel deaktivations (#143)
-   (HombachC) optimize translation handling, code cleanup

### 1.3.1 (2023-10-21)

-   (HombachC) fix initialisiation of channel states (#141)
-   (HombachC) change message "reconnect successful" to level info (#80)
-   (HombachC) documentation tweaks - dependency updates

### 1.3.0 (2023-10-20)

-   (HombachC) implement tibber calculator mode "best hours block" (#16)
-   (HombachC) handle empty calculator destination states - detected by sentry

### 1.2.0 (2023-10-18)

-   (HombachC) implement tibber calculator mode "best single hours" (#16)
-   (HombachC) changed i18n files to inline translations, single files aren't update compatible (#128)
-   (HombachC) fixed error in initial read of calculator states (#129)

### 1.1.2 (2023-10-15)

-   (HombachC) fix timing error in calculator

### 1.1.1 (2023-10-14)

-   (HombachC) fix error in startup of additional channels

### 1.1.0 (2023-10-14)

-   (HombachC) implement tibber calculator mode "best price" (#16)
-   (HombachC) precised pull times of current cost
-   (HombachC) reduced error messages (#80)
-   (HombachC) extend documentation
-   (HombachC) update adapter-core

### 1.0.0 (2023-10-05)

-   (HombachC) Increase to the first major release, as now a stable level is reached
-   (HombachC) Code cleanup

### 0.4.2 (2023-10-03)

-   (HombachC) fixed error with polling multiple homes live data (#108)
-   (HombachC) Lots of dependency updates; code optimizations

### 0.4.1 (2023-09-24)

-   (HombachC) Hardened 2 typeerrors uppon sentry recognition
-   (HombachC) Fix error with not deleted averages of tomorrow pricing (#95)
-   (HombachC) preparations for tibber calculator

### 0.4.0 (2023-09-20)

-   (HombachC) Added daily average price values (#89)

### 0.3.3 (2023-09-17)

-   (HombachC) Fixed false positive connection message (#87)
-   (HombachC) Updated translations with ChatGPT
-   (HombachC) preparations for tibber calculator

### 0.3.2 (2023-09-14)

-   (HombachC) Fixed error when starting adapter first time (#82)
-   (HombachC) Fixed error in admin config from 0.3.0 (#81)

### 0.3.1 (2023-09-13)

-   (HombachC) Mitigate error in admin config from 0.3.0 (#81)
-   (HombachC) Change logging of TibberFeed errors from type error to type warn - because of too many downtimes of Tibber server (#80)

### 0.3.0 (2023-09-12)

-   (HombachC) BREAKING: change Pulse usage to be configurable for all homes seperately (#41)
-   (HombachC) optimize code again to mitigate set state timing for long JSON states (#68)
-   (HombachC) preparations for tibber calculator

### 0.2.7 (2023-09-07)

-   (HombachC) reducing polls at Tibber server by precheck of current price data
-   (HombachC) preparations for tibber calculator

### 0.2.6 (2023-09-04)

-   (HombachC) fix error with boolean states

### 0.2.5 (2023-09-03)

-   (HombachC) optimize code to mitigate set state timing for long JSON states (#68)

### 0.2.4 (2023-08-30)

-   (HombachC) enable correct price poll also for adapter running in different timezones (#63)

### 0.2.3 (2023-08-27)

-   (HombachC) fix error in 0.2.2 in start conditions of adapter

### 0.2.2 (2023-08-24)

-   (HombachC) reducing polls at Tibber server by precheck of known data
-   (HombachC) code optimizations
-   (HombachC) fix config screen (#55)

### 0.2.1 (2023-08-21)

-   (HombachC) double timeout for Tibber server queries

### 0.2.0 (2023-08-18)

-   (HombachC) introduces JSONs for prices sorted by price ascending
-   (HombachC) fix stupid error for obsolete next day pricing (#23, #50)

### 0.1.10 (2023-08-15)

-   (HombachC) bump dependencies, code cleanups
-   (HombachC) preparations for tibber calculator
-   (HombachC) mitigate multi homes & pulse problems (#41)
-   (HombachC) add documentation to config screen (#47)

### 0.1.9 (2023-08-14)

-   (HombachC) optimizing fetching homes list (#32) after Tibber server error, restart adapter in case of trouble

### 0.1.8 (2023-08-12)

-   (HombachC) bump dev-dependencies, fix eslint/prettier issue

### 0.1.7 (2023-08-11)

-   (HombachC) code cleanup, fix error for obsolete next day pricing (#23)
-   (HombachC) add another try/catch while fetching homes list (#32)

### 0.1.6 (2023-07-30)

-   (HombachC) add units for live data, bump adapter-core to 3.x

### 0.1.5 (2023-07-18)

-   (HombachC) fix error in sentry logging

### 0.1.4 (2023-07-17)

-   (HombachC) BREAKING: encrypted API-Token in ioBroker
-   (HombachC) rearranged configuration options
-   (HombachC) fixed bug in state generation

### 0.1.3 (2023-07-17)

-   (HombachC) all log messages in English
-   (HombachC) remove unused state change handler
-   (HombachC) fixed state roles

### 0.1.2 (2023-07-17)

-   (HombachC) round grid consumption meter values to Wh accuracy
-   (HombachC) hide unused checkboxes in config
-   (HombachC) fix snyc and appveyor

### 0.1.1 (2023-07-16)

-   (HombachC) remove release script and dev-server

### 0.1.0 (2023-07-14)

-   (HombachC) initial version

## License

GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>