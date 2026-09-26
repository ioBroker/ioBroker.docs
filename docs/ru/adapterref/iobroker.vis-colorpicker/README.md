---
chapters: {"pages":{"en/adapterref/iobroker.vis-colorpicker/README.md":{"title":{"en":"ioBroker.vis-colorpicker"},"content":"en/adapterref/iobroker.vis-colorpicker/README.md"},"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md":{"title":{"en":"Color picker widgets for vis-2"},"content":"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-colorpicker/README.md
title: ioBroker.vis-colorpicker
hash: dSj+BXdJEmFrUQoV+cj3+IzSi1pmMybo4E135ATycY0=
---
![Логотип](../../../en/adapterref/iobroker.vis-colorpicker/admin/colorpicker.png)

![Количество установок](http://iobroker.live/badges/vis-colorpicker-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-colorpicker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-colorpicker.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-colorpicker.png?downloads=true)

# ioBroker.vis-colorpicker

Виджеты выбора цвета для [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) и [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2)

![Пример](../../../en/adapterref/iobroker.vis-colorpicker/docs/img/overview.png)

Девять виджетов для установки и отображения цвета: три универсальных палитры цветов, один для светильников Homematic и пять для светильников Philips HUE.

## вис и вис-2

Адаптер поставляет каждый виджет в двух экземплярах:

- **vis (vis-1)** использует набор виджетов EJS/jQuery в `widgets/colorpicker.html`, которая загружает spectrum, jscolor, farbtastic и вспомогательную функцию CIE из huepi.
- **vis-2** использует набор виджетов React в `widgets/vis-2-widgets-colorpicker/` построен из `src-widgets/` Для этого не требуется jQuery и никаких сторонних инструментов выбора — элементы выбора отрисовываются с помощью CSS и одного холста.

Оба варианта объявляют одни и те же идентификаторы виджетов (`tplRGBSpectrum`, `tplSpectrumHomematic`, `tplRGBFarbtastic`, `tplJscolor`, `tplHUEjscolor`, `tplHUEPickerXY`, `tplHUEIndicatorXY`, `tplHUEPickerCT`, `tplHUEIndicatorCT`) и те же имена атрибутов, а vis-2 предпочитает виджет React виджету EJS. Поэтому проект, созданный с помощью vis, продолжает работать после перехода на vis-2 — виджеты просто отображаются с использованием реализации React.

Для работы виджетов React требуется vis-2 версии 2.12.8 или новее. При использовании более старых версий vis-2 применяются виджеты EJS.

## Документация

Все виджеты с настройками и скриншотами: [Английский](/#/docs/adapterref/iobroker.vis-colorpicker/docs/en/README.md) | [Немецкий](https://github.com/ioBroker/ioBroker.vis-colorpicker/blob/master/docs/de/README.md)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) All nine widgets were ported to vis-2 as React widgets, without jQuery, spectrum, jscolor and farbtastic
* (bluefox) The widgets of a vis-1 project keep all their settings: same widget ids, same attribute names
* (bluefox) The CT indicator is a React widget as well, although its vis-1 template is marked with `data-vis-2-ignore`
* (bluefox) Added the setting "Picker in the widget", which shows the colour picker instead of a small colour box
* (bluefox) Added "Unit" (mired or Kelvin) and the range "Warmest"/"Coldest" to the two color temperature widgets
* (bluefox) The gamut letters A, B and C are recognized now, not only the model ids of the lamps
* (bluefox) The pickers follow touch and pen, and they no longer re-compute the whole colour field on every change
* (bluefox) The colour is only written every 200 ms while dragging, and once more when the pointer is released
* (bluefox) The widget settings are translated in eleven languages
* (bluefox) Added documentation with screenshots for every widget (English and German)
* (bluefox) Fixed the color wheel: it really writes and reads hue/saturation/brightness now
* (bluefox) Fixed the divisor of the Philips HUE widget, the rounding of saturation and lightness of the spectrum, and the hue, which was written as text
* (bluefox) "level" is only sent to a HUE lamp if a Level ID is configured, so a colour change does not set the brightness
* (bluefox) Updated the CI to the current ioBroker actions and added a CodeQL workflow

### 2.1.0 (2025-11-25)
* (oweitman) loaded an additional javascript file for the widget jscolorcie to fix

### 2.0.3 (2023-03-17)
* (bluefox) Made it work with vis-2.0

### 1.2.0 (2020-04-14)
* (bluefox) Corrected html structure

### 1.1.1 (2016-11-30)
* (Pmant) add new hue bulbs and fix gamut

### 1.1.0 (2016-05-31)
* (Pmant) add homematic colorpicker

### 1.0.2 (2016-05-20)
* (bluefox) Fix Philips HUE Colorpicker

### 1.0.0 (2016-05-19)
* (bluefox) rewrite all widgets

### 0.2.0 (2016-05-15)
* (Pmant) add hue CIE picker

### 0.1.3 (2016-01-25)
* (bluefox) add precision

### 0.1.2 (2016-01-25)
* (bluefox) enable ID Select dialog

### 0.1.1 (2015-09-27)
* (bluefox) update packets

### 0.1.0 (2015-07-09)
* (bluefox) initial checkin

## License
The MIT License (MIT)

Copyright (c) 2013-2026 Bluefox https://github.com/GermanBluefox,
              2013-2014 hobbyquaker https://github.com/hobbyquaker

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