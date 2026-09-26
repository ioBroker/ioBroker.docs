---
chapters: {"pages":{"en/adapterref/iobroker.vis-canvas-gauges/README.md":{"title":{"en":"ioBroker.vis-canvas-gauges"},"content":"en/adapterref/iobroker.vis-canvas-gauges/README.md"},"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md":{"title":{"en":"Canvas gauges for vis-2"},"content":"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-canvas-gauges/README.md
title: ioBroker.vis-canvas-gauges
hash: 6moyqY2TZnM1twuZOWyzGG04ryfdt3ZTUUg3LFOonb4=
---
![Логотип](../../../en/adapterref/iobroker.vis-canvas-gauges/admin/vis-canvas-gauges.png)

![Количество установок](http://iobroker.live/badges/vis-canvas-gauges-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-canvas-gauges.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-canvas-gauges.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-canvas-gauges.png?downloads=true)

# ioBroker.vis-canvas-gauges

![Логотип](../../../en/adapterref/iobroker.vis-canvas-gauges/img/logo.svg)

canvas-gauges — Индикаторы на холсте для [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) и [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2)![Пример](../../../en/adapterref/iobroker.vis-canvas-gauges/img/widgets.png)

В этом наборе виджетов используется очень подробная библиотека canvas от Михуса. Спасибо, Михус!

Описание используемой библиотеки можно найти здесь: <https://canvas-gauges.com>

А на GitHub [здесь.](https://github.com/Mikhus/canvas-gauges)

## вис и вис-2

Адаптер поставляет каждый виджет в двух экземплярах:

- **vis (vis-1)** использует набор виджетов EJS/jQuery в `widgets/canvas-gauges.html`.
- **vis-2** использует набор виджетов React в `widgets/vis-2-widgets-canvas-gauges/` построен из `src-widgets/`.

Оба варианта объявляют одни и те же идентификаторы виджетов (`tplCGlinearGauge`, `tplCGradialGauge`, `tplCGCompas`, `tplCGflatGauge`) и те же имена атрибутов, а vis-2 предпочитает виджет React виджету EJS. Поэтому проект, созданный с помощью vis, продолжает работать после перехода на vis-2 — виджеты просто отображаются с использованием реализации React, без jQuery.

Индикатор выполнения (`tplCGprogress`) был добавлен для vis-2 и не имеет аналога в наборе vis-1.

Для работы виджетов React требуется vis-2 версии 2.12.8 или новее. При использовании более старых версий vis-2 применяются виджеты EJS.

## Документация

Все виджеты с настройками и скриншотами: [Английский](/#/docs/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md) | [Немецкий](https://github.com/ioBroker/ioBroker.vis-canvas-gauges/blob/master/docs/de/README.md)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) All four widgets were ported to vis-2 as React widgets, without jQuery
* (bluefox) Added the widget "Progress" - a plain bar for a battery, a tank or a humidity (vis-2 only)
* (bluefox) The widgets follow the dark theme of vis-2: plate, scale, texts, rings and the track of the bar adapt, while the needle and the colour of the bar keep their meaning. Widgets placed before this version keep their look
* (bluefox) Added the settings of the library that the vis-1 widgets never offered: section width and section ends of the highlights, exact ticks, numbers margin, stroke colour of the ticks, width of the value box and the shadow of the bar
* (bluefox) The vis-2 palette shows a sharp preview and a short description for every widget
* (bluefox) Added documentation for every vis-2 widget with screenshots (English and German)
* (bluefox) The labels of the widget settings are translated properly now, in eleven languages
* (bluefox) "Padding" of the bar ticks is applied to the ticks now instead of the round end of the bar
* (bluefox) "Value weight" changes the weight of the value now instead of the font family of the scale
* (bluefox) The scale keeps its last label if the step does not divide the range without a rounding error
* (bluefox) A state that has no value yet when the view opens is subscribed now, so the gauge follows it
* (bluefox) "Major ticks" is a text field in every widget now, so a list of labels can be used everywhere
* (bluefox) The default needle type of the radial gauge is "arrow" instead of the unused word "select"
* (bluefox) Removed the vis dependency and replaced it with a message by installation or update if neither vis nor vis-2 is installed

### 1.0.1 (2022-09-05)
* (oweitman) Added workaround for firefox canvas problem

### 0.1.5 (2016-11-24)
* (bluefox) do not scan DOM at start

### 0.1.4 (2016-11-18)
* (bluefox) fix destroy of widgets

### 0.1.3 (2016-10-06)
* (bluefox) fix highlights if min not zero

### 0.1.2 (2016-09-30)
* (bluefox) translate english

### 0.1.0 (2016-09-26)
* (bluefox) initial checkin

## License
 Copyright (c) 2016-2026 bluefox https://github.com/GermanBluefox
 MIT