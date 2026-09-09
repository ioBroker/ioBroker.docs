---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: Svl//FPnY7JwqrwC81EYj++vcRBHa+Px7XEUaWi4AcE=
---
![Логотип](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/tibberlink-stable.svg)
![Установлено](https://iobroker.live/badges/tibberlink-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# ioBroker.tibberlink

## Версии

## Часовой

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. в разделе \[ссылка на соответствующий раздел].<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry"> Документация по плагину Sentry</a> !

## Адаптер для использования данных Tibber Energy в ioBroker.

Этот адаптер подключает данные API вашей учетной записи Tibber к ioBroker, независимо от того, используется ли он для одного или нескольких домов. Он также поддерживает прямое локальное считывание данных с датчика Tibber Pulse через вашу домашнюю сеть, что позволяет осуществлять мониторинг и сбор данных в режиме реального времени, не полагаясь исключительно на облачный API.

Если вы еще не пользуетесь Tibber, я буду очень признателен, если вы воспользуетесь моей реферальной ссылкой: [Реферальная ссылка Tibber](https://invite.tibber.com/mu8c82n5) .

## Документация

- [Стандартная конфигурация](#standard-configuration) — первоначальная настройка, токен API, дома, исторические данные.
- [Настройка калькулятора](/#/docs/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md) — каналы автоматизации на основе цен и интеллектуальный буфер батареи.
- [Настройка вывода графиков](/#/docs/adapterref/iobroker.tibberlink/docu/GraphOutput.md) — визуализация цен с помощью E-Charts / FlexCharts
- [Настройка транспортных средств и зарядных устройств](/#/docs/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md) — Настройка API данных Tibber для автомобилей и настенных зарядных устройств.
- [Прямой локальный опрос данных Pulse](https://github.com/Hombach/ioBroker.tibberlink/blob/master/docu/LocalPulse.md) — считывание данных с Pulse локально, поддерживаются различные режимы работы счетчика.

## Стандартная конфигурация

- Для начала создайте новый экземпляр адаптера.
- Вам также потребуется API-токен от Tibber, который можно получить здесь: [Tibber Developer API](https://developer.tibber.com) .
- Введите свой API-токен Tibber в стандартных настройках и укажите как минимум одну строку для параметров прямой трансляции (выберите «Нет в наличии»).
- Сохраните настройки и выйдите из режима конфигурации, чтобы перезапустить адаптер; этот шаг позволит впервые выполнить запрос к вашему(им) дому(ам) с сервера Tibber.
- Вернитесь на экран настроек и выберите дома, из которых вы хотите получать данные в реальном времени с помощью Tibber Pulse. Вы также можете выбрать дома и отключить передачу данных (Примечание: это работает только в том случае, если оборудование установлено и сервер Tibber подтвердил подключение к Pulse).
- Примечание: Если в вашей учетной записи Tibber более одного дома, необходимо добавить их все, чтобы избежать сообщений об ошибках, вызванных ненужными домами. Добавьте все дома и отключите ненужные.
- У вас есть возможность отключить получение данных о ценах на сегодня и завтра, например, если вы планируете использовать только прямую трансляцию Pulse.
- При желании вы можете включить получение исторических данных о потреблении. Укажите количество наборов данных для часов, дней, недель, месяцев и лет. Вы можете использовать «0», чтобы отключить один или несколько из этих интервалов в соответствии с вашими предпочтениями.
- Примечание: Важно учитывать размер набора данных, поскольку слишком большие запросы могут привести к отсутствию ответа от сервера Tibber. Мы рекомендуем поэкспериментировать с размером набора данных, чтобы обеспечить оптимальную функциональность. Настройка интервалов и количества данных в наборе данных поможет найти правильный баланс между получением полезных данных и поддержанием быстродействия сервера. Например, рекомендуемое значение для часов — 48.
- Сохраните настройки.

## Документация по данным о потреблении

При включении функции ежедневного анализа исторического потребления адаптер предоставляет агрегированное состояние за текущий месяц:

- `Homes.<HOME-ID>.Consumption.currentMonthConsumption`

Это показатель общего потребления за текущий календарный месяц в`kWh` Рассчитывается на основе данных о ежедневном потреблении, возвращаемых Tibber. Если указано слишком мало дней, значение будет отражать только это количество дней, а не полный месяц.

## Настройка калькулятора

Калькулятор добавляет к подключению к Tibber автоматизацию на основе цен: для каждого домашнего канала внешние состояния переключаются в зависимости от самых дешевых/самых дорогих часов, ценовых порогов, блоков лучших часов, процентных диапазонов, ограниченных временных рамок (LTF) и режима интеллектуального буфера батареи.

📖 **Полное руководство: [docu/CalculatorConfiguration.md](/#/docs/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md)**

## Настройка вывода графика

Адаптер помогает визуализировать ценовые тренды и результаты калькулятора — от простого подхода на основе JSON с помощью адаптеров "E-Charts" / "FlexCharts" до полностью настраиваемого решения на JavaScript.

📖 **Полное руководство: [docu/GraphOutput.md](/#/docs/adapterref/iobroker.tibberlink/docu/GraphOutput.md)**

## Прямой локальный опрос данных Pulse.

Адаптер может считывать данные с Tibber Pulse локально по вашей домашней сети (через Tibber Bridge), вместо того чтобы полагаться исключительно на облачный поток, записывая данные счетчика в состояние ioBroker каждые 2 секунды. Поддерживаются как бинарные SML-счетчики, так и обычные текстовые счетчики OBIS.

📖 **Полное руководство (настройка моста, поддерживаемые режимы работы счетчика): [docu/LocalPulse.md](https://github.com/Hombach/ioBroker.tibberlink/blob/master/docu/LocalPulse.md)**

## Конфигурация транспортных средств и зарядных устройств

В дополнение к основному API-токену, адаптер может считывать данные с IoT-устройств (транспортных средств, зарядных устройств) из отдельного **API данных Tibber** .`data-api.tibber.com` ), для которого требуется собственная регистрация клиента OAuth2 и одноразовая авторизация. Данные об автомобиле записываются в`Vehicles.<VIN>.*` данные зарядного устройства для`Chargers.<id>.*` .

📖 **Полное руководство по настройке (регистрация клиента, авторизация, доступные штаты): [docu/VehiclesAndChargers.md](/#/docs/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md)**

## Пожертвовать

<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>\
&#x20;Если вам понравился этот проект — или вы просто чувствуете себя щедрым, — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 7.2.3 (2026-08-29)

- (HombachC) fixed local Pulse boolean states (e.g. usb_power, autolevel_enable) being created as type number, causing recurring log errors (#935)
- (HombachC) SmartBatteryBuffer: EfficiencyLoss is now validated to the range 0…1; out-of-range values (e.g. 25 instead of 0.25) are clamped with a warning instead of corrupting the calculation, and the state now carries min/max/step (#934)
- (HombachC) updated dependencies

### 7.2.2 (2026-08-22)

- (HombachC) fixed local Pulse meter mode 5 (plain OBIS text, e.g. eBZ meters) not being parsed, leaving states frozen (#931)
- (HombachC) documented the supported Pulse meter modes (README + Info/PulseMeterModes.md)
- (HombachC) restructured the README: moved the Calculator, Graph Output, Local Pulse and Vehicles & Chargers guides into separate files under docu/
- (HombachC) updated dependencies

### 7.2.1 (2026-08-10)

- (HombachC) fixed charger devices with an empty externalId (e.g. Wallbox Pulsar Plus) producing an invalid state id; a single bad device no longer aborts the whole Data API poll (#925)
- (HombachC) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts (#927)
- (HombachC) projectUtils: fixed min/max/step value of 0 being dropped from number state definitions
- (HombachC) updated tibber-api to 5.6.0
- (HombachC) updated dependencies

### 7.2.0 (2026-07-30)

- (HombachC) added polling of charger/wallbox devices from the Tibber Data API, written to `Chargers.<id>.*` (#925)
- (HombachC) added a `LastSeen` state (device-reported last-seen timestamp) for vehicles and chargers

### 7.1.5 (2026-07-12)

- (HombachC) added a regression test confirming best single hours LTF no longer switches on the wrong day (#631)
- (HombachC) worked around a Tibber server bug that returns `to` equal to `from` in weekly historical consumption data (#890)
- (HombachC) removed redundant test devDependencies (chai, chai-as-promised, sinon-chai, proxyquire) and switched unit tests to Node's built-in assert

### Old Changes see [CHANGELOG OLD](https://github.com/Hombach/ioBroker.tibberlink/blob/master/CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2026 C.Hombach <TibberLink@homba.ch>