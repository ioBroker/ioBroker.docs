---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: q6tcD9V+1vd5xqcZioq6ggdpTrbdXmpu6Fb7CjcRpVM=
---
![Логотип](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.tibberlink.svg)
![Версия NPM (стабильная)](https://iobroker.live/badges/tibberlink-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tibberlink.svg)
![Количество установок (последних)](https://iobroker.live/badges/tibberlink-installed.svg)
![Известные уязвимости](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Аппвейор-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
**CI-тесты:** ![Тестирование и выпуск](https://github.com/hombach/ioBroker.tibberlink/workflows/Test%20and%20Release/badge.svg) [![CodeQL] (https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-anasis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## Адаптер для использования данных об энергии TIBBER в iOBroker
Адаптер для связывания данных из API вашей учетной записи Tibber для использования в ioBroker.

Если вы сейчас не являетесь пользователем Tibber, я буду очень признателен, если вы воспользуетесь моей ссылкой возврата:

[https://invite.tibber.com/2gwuign3.](https://invite.tibber.com/2gwuign3.)

## Конфигурация
1. Создайте новый экземпляр адаптера.
2. Вам также понадобится токен API от Tibber. Загрузите его здесь: [https://developer.tibber.com/](https://developer.tibber.com/)
3. Введите свой токен API Tibber -> создайте конфигурацию прямой трансляции минимум в одну строку (выберите «Нет доступно»)
4. Сохраните настройки и выйдите из конфигурации, чтобы перезапустить адаптер (теперь ваш дом будет опрашиваться с сервера Tibber)
4. Вернитесь к экрану конфигурации и выберите дом(а), чтобы также получать данные в реальном времени из вашего Tibber Pulse, или выберите дом(ы) и отключите ленту - (!! Работает только в том случае, если установлено оборудование и сервер Tibber подтвердил соединение с Pulse)
5. Сохраните настройки

## Примечания
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Changelog
! Note that missing version entries are typically dependency updates for improved security.

### 0.4.1 (2023-09-24)
* (HombachC) Hardened 2 typeerrors uppon sentry recognition
* (HombachC) Fix error with not deleted averages of tomorrow pricing (#95)
* (HombachC) preparations for tibber calculator
### 0.4.0 (2023-09-20)
* (HombachC) Added daily average price values (#89)
### 0.3.3 (2023-09-17)
* (HombachC) Fixed false positive connection message (#87)
* (HombachC) Updated translations with ChatGPT
* (HombachC) preparations for tibber calculator
### 0.3.2 (2023-09-14)
* (HombachC) Fixed error when starting adapter first time (#82)
* (HombachC) Fixed error in admin config from 0.3.0 (#81)
### 0.3.1 (2023-09-13)
* (HombachC) Mitigate error in admin config from 0.3.0 (#81)
* (HombachC) Change logging of TibberFeed errors from type error to type warn - because of too many downtimes of Tibber server (#80)
### 0.3.0 (2023-09-12)
* (HombachC) BREAKING: change Pulse usage to be configurable for all homes seperately (#41)
* (HombachC) optimize code again to mitigate set state timing for long JSON states (#68)
* (HombachC) preparations for tibber calculator
### 0.2.7 (2023-09-07)
* (HombachC) reducing polls at Tibber server by precheck of current price data
* (HombachC) preparations for tibber calculator
### 0.2.6 (2023-09-04)
* (HombachC) fix error with boolean states
### 0.2.5 (2023-09-03)
* (HombachC) optimize code to mitigate set state timing for long JSON states (#68) 
### 0.2.4 (2023-08-30)
* (HombachC) enable correct price poll also for adapter running in different timezones (#63) 
### 0.2.3 (2023-08-27)
* (HombachC) fix error in 0.2.2 in start conditions of adapter
### 0.2.2 (2023-08-24)
* (HombachC) reducing polls at Tibber server by precheck of known data
* (HombachC) code optimizations
* (HombachC) fix config screen (#55)
### 0.2.1 (2023-08-21)
* (HombachC) double timeout for Tibber server queries
### 0.2.0 (2023-08-18)
* (HombachC) introduces JSONs for prices sorted by price ascending
* (HombachC) fix stupid error for obsolete next day pricing (#23, #50)
### 0.1.10 (2023-08-15)
* (HombachC) bump dependencies, code cleanups
* (HombachC) preparations for tibber calculator
* (HombachC) mitigate multi homes & pulse problems (#41)
* (HombachC) add documentation to config screen (#47)
### 0.1.9 (2023-08-14)
* (HombachC) optimizing fetching homes list (#32) after Tibber server error, restart adapter in case of trouble
### 0.1.8 (2023-08-12)
* (HombachC) bump dev-dependencies, fix eslint/prettier issue
### 0.1.7 (2023-08-11)
* (HombachC) code cleanup, fix error for obsolete next day pricing (#23)
* (HombachC) add another try/catch while fetching homes list (#32)
### 0.1.6 (2023-07-30)
* (HombachC) add units for live data, bump adapter-core to 3.x
### 0.1.5 (2023-07-18)
* (HombachC) fix error in sentry logging
### 0.1.4 (2023-07-17)
* (HombachC) BREAKING: encrypted API-Token in ioBroker
* (HombachC) rearranged configuration options
* (HombachC) fixed bug in state generation
### 0.1.3 (2023-07-17)
* (HombachC) all log messages in English
* (HombachC) remove unused state change handler
* (HombachC) fixed state roles
### 0.1.2 (2023-07-17)
* (HombachC) round grid consumption meter values to Wh accuracy
* (HombachC) hide unused checkboxes in config
* (HombachC) fix snyc and appveyor
### 0.1.1 (2023-07-16)
* (HombachC) remove release script and dev-server
### 0.1.0 (2023-07-14)
* (HombachC) initial version

## License
GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>