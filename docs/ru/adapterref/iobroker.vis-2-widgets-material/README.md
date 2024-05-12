---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-material/README.md
title: Виджеты материалов для ioBroker.vis 2.0
hash: NbZzVpDRzjaniHO/LzukDm6Up4OwVLs7vxfalnkaoR8=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-material/admin/vis-2-widgets-material.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-material-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-material.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2-widgets-material.png?downloads=true)

# Виджеты материалов для ioBroker.vis 2.0
## Виджеты
### Кнопки и переключатели
![Переключатели](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches.png)

![Переключатели](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons.png)

![Переключатели](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons-2.png)

### Часы
- Аналоговый

![Аналоговые часы](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-1.png)

- Аналоговый вариант

![Аналоговые часы 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-2.png)

- Цифровой

![Цифровой](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-1.png)

- Digital2 (текст SVG)

![Цифровой2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-2.png)

### Простое состояние
С помощью этого виджета вы сможете управлять одним устройством. Логическое значение или число.

- Число

![Простое состояние](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-1.png)

- Контроль

![Простое состояние](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-2.png)

### Посмотреть в виджете
![Посмотреть в виджете](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-1.png)

Не как кнопка: представление может отображаться в полном размере, и вы можете управлять отображаемыми элементами.

![Посмотреть в виджете - кнопка](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-2.png)

Кнопка «Как»: вы можете показать небольшую миниатюру изображения, а нажав на нее, она отобразится в полном размере.

### Термостат
![Термостат](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-thermostat-1.png)

Кроме того, он может отображать историю, если вы его активировали.

### Фактическое значение с диаграммой
![Реальная стоимость](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-1.png)

![Фактическое значение с диаграммой](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-2.png)

### Контроль безопасности
![Контроль безопасности](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-0.png)

![Контроль безопасности](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-1.png)

Вы можете определить задержку в секундах.

При активации определенный идентификатор будет записан с указанием количества секунд задержки, а после окончания задержки определенный идентификатор будет установлен на 0, а идентификатор сигнала тревоги будет установлен на истинное значение.

![Контроль безопасности](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-2.png)

### Игрок
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-player.png)

### Карта
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-map-1.png)

Позиция может быть определена как объединенное состояние, например `9.2344;41.374652` - (долгота;широта), или как два отдельных состояния.

### Камера
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-camera-1.png)

### HTML-шаблон
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-html-1.png)

HTML-шаблон можно использовать для отображения любого HTML-кода.
Кроме того, с помощью этого виджета вы также можете отображать изображения или iframe.

### Жалюзи
![Жалюзи](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-1.png)

![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-2.png)

### Цветная лампа
С помощью виджета RGB-лампы вы можете управлять различными типами RGB-ламп. Вот некоторые примеры:

- Цвета RGB установлены в одном состоянии, например «#RRGGBB».
- Цвета R/G/B установлены в разных состояниях от 0 до 255.
- RGBW как одна переменная, например '#RRGGBBWW'
- Цвета R/G/B/W установлены в разных состояниях от 0 до 255.
- оттенок/спутник/яркость в 3 разных состояниях
- цветовая температура как одно состояние от 2700 до 6500 или определяется мин/макс объекта
- Состояние белого режима можно использовать для переключения между RGB и белым режимом через специальное состояние.

![RGB-лампа 1](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-1.png)

![RGB-лампа 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-2.png)

### Замок
![Замок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-lock.png)

### Пылесос
Этот виджет является основным для пылесоса Xiaomi. Но его можно использовать и для любого другого пылесоса.

Разница лишь в том, что Xiaomi поддерживает уборку помещений.

![Пылесос](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-vacuum.png)

### Выбор времени
## Делать
- Выдвижные жалюзи со ставнями

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 1.3.31 (2024-04-26)
* (bluefox) Improved wizard layout

### 1.3.28 (2024-04-19)
* (bluefox) Improved resolving of icons

### 1.3.27 (2024-04-09)
* (bluefox) Updated packages
* (bluefox) improved RGB widget

### 1.3.25 (2024-03-07)
* (bluefox) Corrected filter property in the widget settings

### 1.3.23 (2024-03-05)
* (bluefox) Added possibility to change the icon size in simple widget

### 1.3.21 (2024-02-22)
* (bluefox) Corrected small input fields

### 1.3.18 (2024-01-16)
* (bluefox) Corrected long click for RGB widget on touch devices
* (bluefox) Corrected dimmer widget

### 1.3.17 (2023-12-19)
* (bluefox) Added option to hide the line in switches widget

### 1.3.15 (2023-12-17)
* (foxriver76) Added option to rotate video

### 1.3.14 (2023-12-05)
* (bluefox) Allowed with on click on the widget toggling the ON/OFF state of RGB widget
* (bluefox) Added class names to ON/OFF widgets to allow styling

### 1.3.11 (2023-11-17)
* (bluefox) Allowed opening/closing dialogs of some widgets by command

### 1.3.9 (2023-11-10)
* (bluefox) updated packages

### 1.3.8 (2023-11-08)
* (bluefox) Corrected RGB widget if minimal is equal with maximal

### 1.3.5 (2023-11-06)
* (bluefox) Corrected layout of RGB widget
* (bluefox) Added option for RGB widget to hide brightness control
* (bluefox) Added option for white mode in RGB widget

### 1.3.3 (2023-10-26)
* (bluefox) Corrected layout of RGB widget
* (bluefox) Added color settings to actual
* (bluefox) Vacuum settings were hidden

### 1.3.2 (2023-10-14)
* (bluefox) Small improvements done

### 1.3.1 (2023-10-13)
* (bluefox) Added the vacuum cleaner widget

### 1.2.1 (2023-09-18)
* (bluefox) Added door lock, rgb and thermostat to switches widget

### 1.1.3 (2023-09-10)
* (bluefox) Door lock improved

### 1.1.0 (2023-09-08)
* (bluefox) Added door lock

### 1.0.0 (2023-08-21)
* (bluefox) Added RGB widget

### 0.8.5 (2023-08-11)
* (bluefox) Improvement of the widget loading

### 0.8.4 (2023-08-10)
* (bluefox) Improvement of wizard

### 0.8.3 (2023-07-30)
* (bluefox) Font styles are applied to all buttons

### 0.8.2 (2023-07-19)
* (bluefox) Corrected small layout problems

### 0.8.0 (2023-07-18)
* (bluefox) Added wizard for widgets

### 0.7.1 (2023-07-02)
* (bluefox) Added washer widget

### 0.6.2 (2023-06-29)
* (bluefox) Allowed usage without a frame for all widgets

### 0.6.0 (2023-06-28)
* (bluefox) Added blinds to switches widget
* (bluefox) Allowed to place widgets in widgets

### 0.5.3 (2023-06-21)
* (bluefox) Corrected errors with view in widget

### 0.5.1 (2023-06-20)
* (bluefox) Added widget to switch the theme
* (bluefox) Improved HTML widget to show iframe and image

### 0.4.0 (2023-06-16)
* (bluefox) Added button texts for switches widget
* (bluefox) Removed static widget, as it was replaced by switches widget

### 0.3.1 (2023-06-14)
* (bluefox) Improved buttons widget

### 0.2.13 (2023-03-22)
* (bluefox) BREAKING CHANGE: The names of widgets must be entered anew 
* (bluefox) update packages

### 0.2.9 (2023-02-27)
* (bluefox) Made this adapter singleton

### 0.2.2 (2023-02-22)
* (bluefox) Update packages

### 0.2.1 (2022-11-26)
* (bluefox) Implemented the blinds widget

### 0.1.5 (2022-10-27)
* (bluefox) First beta version

### 0.1.2 (2022-10-21)
* (bluefox) initial commit

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