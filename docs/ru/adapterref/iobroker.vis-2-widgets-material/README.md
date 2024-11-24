---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-material/README.md
title: Материальные виджеты для ioBroker.vis 2.0
hash: A/LUw2OF9kxJI2ckvXSi8c0DcJINowASCGR9R9TSL98=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-material/admin/vis-2-widgets-material.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-material-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-material.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2-widgets-material.png?downloads=true)

# Материальные виджеты для ioBroker.vis 2.0
## Виджеты
### Кнопки и переключатели
![Переключатели](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches.png)

![Переключатели](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons.png)

![Переключатели](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons-2.png)

### Часы
- Аналоговый

![Аналоговые часы](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-1.png)

- Аналоговая вариация

![Аналоговые часы 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-2.png)

-   Цифровой

![Цифровой](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-1.png)

- Digital2 (текст SVG)

![Цифровой2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-2.png)

### Простое состояние
С помощью этого виджета вы можете управлять одним устройством. Логическое значение или число.

-   Число

![Простое состояние](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-1.png)

-   Контроль

![Простое состояние](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-2.png)

### Посмотреть в виджете
![Посмотреть в виджете](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-1.png)

Не как кнопка: Вид может отображаться в полном размере, и вы можете управлять элементами в виде.

![Просмотреть в виджете - кнопка](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-2.png)

В виде кнопки: Вы можете отобразить небольшую миниатюру вида, а нажав на нее, вы увидите ее в полном размере.

### Термостат
![Термостат](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-thermostat-1.png)

Кроме того, он может отображать историю, если вы ее активировали.

### Фактическое значение с диаграммой
![Фактическое значение](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-1.png)

![Фактическое значение с диаграммой](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-2.png)

### Контроль безопасности
![Контроль безопасности](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-0.png)

![Контроль безопасности](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-1.png)

Вы можете определить задержку в секундах.

При активации определенный идентификатор будет записан с числом секунд задержки, а после окончания задержки определенный идентификатор будет установлен на 0, а идентификатор тревоги будет установлен на значение true.

![Контроль безопасности](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-2.png)

### Игрок
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-player.png)

### Карта
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-map-1.png)

Положение может быть определено как комбинированное состояние, например `9.2344;41.374652` - (долгота;широта) или как два отдельных состояния.

### Камера
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-camera-1.png)

### HTML-шаблон
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-html-1.png)

Шаблон Html можно использовать для отображения любого кода HTML.
Кроме того, с помощью этого виджета можно отображать изображение или iframe.

### Жалюзи
![Жалюзи](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-1.png)

![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-2.png)

### Цветная лампа
С помощью виджета RGB-лампы вы можете управлять различными типами RGB-ламп. Вот несколько примеров:

- Цвета RGB устанавливаются в одном состоянии, например, «#RRGGBB»
- Цвета R/G/B устанавливаются в различных состояниях от 0 до 255
- RGBW как одна переменная, например '#RRGGBBWW'
- Цвета R/G/B/W устанавливаются в различных состояниях от 0 до 255
- оттенок/насыщенность/яркость как 3 различных состояния
- цветовая температура как одно состояние от 2700 до 6500 или определяется мин/макс объекта
- Состояние белого режима можно использовать для переключения между режимами RGB и белого через специальное состояние.

![RGB-лампа 1](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-1.png)

![RGB-лампа 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-2.png)

### Дверной замок
![Дверной замок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-lock.png)

### Пылесос
Этот виджет в первую очередь предназначен для пылесоса Xiaomi. Но его можно использовать и для любого другого пылесоса.

Единственное отличие в том, что Xiaomi поддерживает уборку помещения.

![Пылесос](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-vacuum.png)

### Выбор времени
## То, что нужно сделать
- Раздвижные жалюзи со шторой

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog

### **WORK IN PROGRESS**

-   (bluefox) Corrected thermostat slider

### 1.4.10 (2024-08-09)

-   (Steiger04) Corrected recursive icon search on a channel, device, instance and adapter.

### 1.4.9 (2024-08-03)

-   (bluefox) Corrected blinds dialog
-   (bluefox) Added the invert option for blinds

### 1.4.8 (2024-07-12)

-   (bluefox) Small changes for SweetHome3D

### 1.4.7 (2024-07-11)

-   (bluefox) Corrected thermostat chart button

### 1.4.6 (2024-07-10)

-   (bluefox) Better detection of modes for thermostat
-   (bluefox) Round temperature in charts

### 1.4.1 (2024-07-07)

-   (bluefox) removed withStyles package
-   (bluefox) Better thermostat visualization by narrow height

### 1.3.33 (2024-06-10)

-   (bluefox) Wait for data before the map is shown
-   (bluefox) Round of value is possible now in the actual value widget (with chart)

### 1.3.32 (2024-05-14)

-   (bluefox) Corrected error with multi-language names

### 1.3.31 (2024-04-26)

-   (bluefox) Improved wizard layout

### 1.3.28 (2024-04-19)

-   (bluefox) Improved resolving of icons

### 1.3.27 (2024-04-09)

-   (bluefox) Updated packages
-   (bluefox) improved RGB widget

### 1.3.25 (2024-03-07)

-   (bluefox) Corrected filter property in the widget settings

### 1.3.23 (2024-03-05)

-   (bluefox) Added possibility to change the icon size in simple widget

### 1.3.21 (2024-02-22)

-   (bluefox) Corrected small input fields

### 1.3.18 (2024-01-16)

-   (bluefox) Corrected long click for RGB widget on touch devices
-   (bluefox) Corrected dimmer widget

### 1.3.17 (2023-12-19)

-   (bluefox) Added option to hide the line in switches widget

### 1.3.15 (2023-12-17)

-   (foxriver76) Added option to rotate video

### 1.3.14 (2023-12-05)

-   (bluefox) Allowed with on click on the widget toggling the ON/OFF state of RGB widget
-   (bluefox) Added class names to ON/OFF widgets to allow styling

### 1.3.11 (2023-11-17)

-   (bluefox) Allowed opening/closing dialogs of some widgets by command

### 1.3.9 (2023-11-10)

-   (bluefox) updated packages

### 1.3.8 (2023-11-08)

-   (bluefox) Corrected RGB widget if minimal is equal with maximal

### 1.3.5 (2023-11-06)

-   (bluefox) Corrected layout of RGB widget
-   (bluefox) Added option for RGB widget to hide brightness control
-   (bluefox) Added option for white mode in RGB widget

### 1.3.3 (2023-10-26)

-   (bluefox) Corrected layout of RGB widget
-   (bluefox) Added color settings to actual
-   (bluefox) Vacuum settings were hidden

### 1.3.2 (2023-10-14)

-   (bluefox) Small improvements done

### 1.3.1 (2023-10-13)

-   (bluefox) Added the vacuum cleaner widget

### 1.2.1 (2023-09-18)

-   (bluefox) Added door lock, rgb and thermostat to switches widget

### 1.1.3 (2023-09-10)

-   (bluefox) Door lock improved

### 1.1.0 (2023-09-08)

-   (bluefox) Added door lock

### 1.0.0 (2023-08-21)

-   (bluefox) Added RGB widget

### 0.8.5 (2023-08-11)

-   (bluefox) Improvement of the widget loading

### 0.8.4 (2023-08-10)

-   (bluefox) Improvement of wizard

### 0.8.3 (2023-07-30)

-   (bluefox) Font styles are applied to all buttons

### 0.8.2 (2023-07-19)

-   (bluefox) Corrected small layout problems

### 0.8.0 (2023-07-18)

-   (bluefox) Added wizard for widgets

### 0.7.1 (2023-07-02)

-   (bluefox) Added washer widget

### 0.6.2 (2023-06-29)

-   (bluefox) Allowed usage without a frame for all widgets

### 0.6.0 (2023-06-28)

-   (bluefox) Added blinds to switches widget
-   (bluefox) Allowed to place widgets in widgets

### 0.5.3 (2023-06-21)

-   (bluefox) Corrected errors with view in widget

### 0.5.1 (2023-06-20)

-   (bluefox) Added widget to switch the theme
-   (bluefox) Improved HTML widget to show iframe and image

### 0.4.0 (2023-06-16)

-   (bluefox) Added button texts for switches widget
-   (bluefox) Removed static widget, as it was replaced by switches widget

### 0.3.1 (2023-06-14)

-   (bluefox) Improved buttons widget

### 0.2.13 (2023-03-22)

-   (bluefox) BREAKING CHANGE: The names of widgets must be entered anew
-   (bluefox) update packages

### 0.2.9 (2023-02-27)

-   (bluefox) Made this adapter singleton

### 0.2.2 (2023-02-22)

-   (bluefox) Update packages

### 0.2.1 (2022-11-26)

-   (bluefox) Implemented the blinds widget

### 0.1.5 (2022-10-27)

-   (bluefox) First beta version

### 0.1.2 (2022-10-21)

-   (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2022-2024 Denis Haev <dogafox@gmail.com>

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