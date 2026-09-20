---
chapters: {"pages":{"en/adapterref/iobroker.vis-timeandweather/README.md":{"title":{"en":"ioBroker.vis-timeandweather"},"content":"en/adapterref/iobroker.vis-timeandweather/README.md"},"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md":{"title":{"en":"Time and weather widgets for vis-2"},"content":"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-timeandweather/README.md
title: ioBroker.vis-timeandweather
hash: omSXiMtDOl9FYZEUOKoqePPPfHHoHyUumJ52mS2Htg0=
---
![Логотип](../../../en/adapterref/iobroker.vis-timeandweather/admin/timeandweather.svg)

![Количество установок](http://iobroker.live/badges/vis-timeandweather-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-timeandweather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-timeandweather.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-timeandweather.png?downloads=true)

# ioBroker.vis-timeandweather

`timeandweather` — Виджеты времени и погоды для [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) и [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2)

![Пример](../../../en/adapterref/iobroker.vis-timeandweather/img/widgets.png)

## Виджеты

| Виджет             | Описание                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| SimpleClock        | Время в текстовом виде, с указанием секунд или без них, при желании с мигающим двоеточием.                      |
| SimpleDate         | Дата в текстовом формате, с указанием дня недели и месяца в текстовом виде, в кратком или американском формате. |
| CoolClock          | Аналоговые настольные часы с 21 вариантом оформления, опционально с цифровым отображением времени.              |
| ФлипКлок           | Переворачивающиеся часы с 24 или 12 часами                                                                      |
| WeatherCustom      | Текущая погода и прогноз на срок до шести дней, полученные из данных любого метеорологического адаптера.        |
| Часы в формате SVG | Аналоговые SVG-часы с настраиваемыми цветами и шрифтом.                                                         |
| Сегментные часы    | 7-, 14- или 16-сегментный дисплей для отображения времени, фиксированного текста или значения состояния.        |

## вис и вис-2

Адаптер поставляет каждый виджет в двух экземплярах:

- **vis (vis-1)** использует набор виджетов EJS/jQuery в `widgets/timeandweather.html`.
- **vis-2** использует набор виджетов React в `widgets/vis-2-widgets-timeandweather/` построен из `src-widgets/`.

Оба варианта объявляют одни и те же идентификаторы виджетов (`tplTwSimpleClock`, `tplTwCoolClock`...) и те же имена атрибутов, а vis-2 предпочитает виджет React виджету EJS. Поэтому проект, созданный с помощью vis, продолжает работать после перехода на vis-2 — виджеты просто отображаются с использованием реализации React, без jQuery и без загрузки библиотек, указанных ниже.

Для работы виджетов React требуется vis-2 версии 2.12.8 или новее. При использовании более старых версий vis-2 применяются виджеты EJS.

Виджеты `HtcWeather` и `YahooWeather` Функции vis-1 отключены, поскольку служба погоды Yahoo! была закрыта. `WeatherCustom` вместо этого использовать устройства, позиционируемые как адаптеры для защиты от непогоды.

## Документация

Все виджеты с настройками и скриншотами: [Английский](/#/docs/adapterref/iobroker.vis-timeandweather/docs/en/README.md) | [Немецкий](https://github.com/ioBroker/ioBroker.vis-timeandweather/blob/master/docs/de/README.md)

## Используемые пакеты (только vis-1, vis-2 использует собственный код)

- **CoolClock** <http://randomibis.com/coolclock/> от Саймона Бэрда (MIT) <https://github.com/simonbaird/CoolClock/> — виджет vis-2 использует его код отрисовки и темы оформления.
- **jDigiClock** [http://www.radlavdimov.com/jquery-plugins/jquery-plugin-digilock/](http://www.radoslavdimov.com/jquery-plugins/jquery-plugin-digiclock/) от Радослава Димова (MIT и GPL) – только vis-1
- **zWeatherFeed** <http://www.zazar.net/developers/jquery/zweatherfeed/> Zazar Ltd (MIT) - vis-1; виджет vis-2 сохраняет свою разметку и переводы
- **Сегментный дисплей** <http://www.3quarks.com/en/SegmentDisplay> (CC-3.0) - виджет vis-2 использует его код отрисовки.
- **flipclock** <http://flipclockjs.com/> (MIT) <https://github.com/objectivehtml/FlipClock> - vis-1; виджет vis-2 сохраняет свою разметку и стили

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Made widgets to be compatible with vis2
* (bluefox) All widgets were ported to vis-2 as React widgets, without jQuery and without the vis-1 libraries
* (bluefox) The widgets print the names of week days and months in all languages of vis-2, not only in en/de/ru
* (bluefox) Weather: known weather conditions are translated into all languages of vis-2; a text that is not known is shown as it is instead of being replaced by a similar condition (e.g., "Rain" was shown as "Mixed rain and snow" and an empty text as "Tornado")
* (bluefox) Weather: values that are not set do not leave empty lines like "High: ° Low: °" any more
* (bluefox) Weather: the group names of the forecast days in the editor were one day off
* (bluefox) SimpleDate: English ordinal numbers are correct for the 21st, 22nd, 23rd and 31st and with a leading zero
* (bluefox) Svg Clock: several clocks on one view no longer share the tick colors of the first one
* (bluefox) Added documentation for every vis-2 widget with screenshots (English and German)
* (bluefox) The adapter icon is an SVG now
* (bluefox) Updated packages and GitHub actions

### 1.2.2 (2022-07-05)
* (bluefox) Refactoring of build process done

### 1.2.1 (2022-07-05)
* (HeadCrash78) Fixed the icon display in custom weather forecast
* (bluefox) Refactoring of build process done

### 1.1.7 (2017-01-05)
* (bluefox) add update interval for weather

### 1.1.6 (2016-07-13)
* (bluefox) support of vis APP

### 1.1.4 (2016-06-28)
* (jens-maus) improved german translation of weather terms

### 1.1.3 (2016-06-23)
* (bluefox) enable widgets for https too

### 1.1.2 (2016-06-02)
* (bluefox) add weather custom widget

### 1.1.1 (2016-05-31)
* (bluefox) fix the slide in htc weather

### 1.1.0 (2016-04-16)
* (bluefox) add city name to display

### 0.1.0 (2016-02-10)
* (bluefox) fix typo with Dienstag=>Februar

### 0.0.1 (2015-10-04)
* (bluefox) initial checkin

## License
The MIT License (MIT)

Copyright (c) 2013-2026 bluefox <dogafox@gmail.com>