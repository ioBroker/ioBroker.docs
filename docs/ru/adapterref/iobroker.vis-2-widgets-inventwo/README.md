---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: Виджеты inventwo для ioBroker.vis 2.0
hash: vDNwHd2FXuXhpeiuRyJe+BVugXJIGn+yVwt/ZXfCk6A=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/admin/vis-2-widgets-inventwo.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Виджеты inventwo для ioBroker.vis 2.0
## О
Добавляет переключатели, кнопки, ползунки и многое другое в качестве виджетов для ioBroker VIS 2.0.

## Содержание
Различные виджеты для переключения, навигации и многого другого.

### Виджет - Универсальный
![Предварительный просмотр универсальных и многовиджетных моделей](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_universal_widget.png)

#### Различные типы контента
![Предварительный просмотр выбора цвета](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_content_types.png)

![Предварительный просмотр аналоговых часов](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_content_type_clock_analog.png)

Выбор цвета

![Предварительный просмотр выбора цвета](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_colorpicker.png)

### Виджет - Слайдер
![Предварительный просмотр слайдера](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_sliders.png)

### Виджет - Переключатели
![Предварительный просмотр переключателей](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_switches.png)

### Виджет - Флажок
![Флажок предварительного просмотра](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_checkbox.png)

### Виджет - Таблица
![Предварительный просмотр таблицы](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_table.png)

### Дизайн
Все виджеты обладают широкими возможностями настройки дизайна, позволяющими адаптировать внешний вид под ваши потребности.
Подробнее см. [здесь](./docs/universal-widget-design-examples.md).

![Предварительный просмотр настроек](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_univseral_design_examples.png)

### Продолжение следует...

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Marquee widget: new scrolling text widget with configurable speed, direction, loop count, gap and pause-on-hover

### 0.8.0 (2026-05-15)
- Slider widget: added read-only mode, gradient support for colors and an option to place steps inside the slider bar (#244)
- Dropdown widget: added conditional background color (#198), read-only mode (#201) and option to show value without text (#201)
- Table widget: added multi-column sort (#234)

### 0.7.2 (2026-04-26)
- Fix button click and hold for mobile devices (#192)

### 0.7.1 (2026-04-24)
- Fixed table widget fixed header not working

### 0.7.0 (2026-04-21)
- Table widget added fixed header option (#234)
- Table widget added conditional row color (#234)
- Table widget added column filter (#234)

### 0.6.5 (2026-04-11)
- Changed click behavior to fix click and hold for mobile devices (#192)
- Fixed dropdown border on focus visible even though border with is 0 (#200)

## License
The MIT License (MIT)

Copyright (c) 2025-2026 jkvarel <jk@inventwo.com>

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