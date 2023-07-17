---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-material/README.md
title: Виджеты материалов для ioBroker.vis 2.0
hash: irY/iuda19liBWKDfloda8VwtnnwEfOLTAcoS4Ye7sI=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-material/admin/vis-2-widgets-material.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-material-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)
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

- Цифровой

![Цифровой](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-1.png)

- Digital2 (текст SVG)

![Цифровой2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-2.png)

### Простое состояние
С помощью этого виджета вы можете управлять одним устройством. Логическое или числовое значение.

- Число

![Простое состояние](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-1.png)

- Контроль

![Простое состояние](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-2.png)

### Посмотреть в виджете
![Посмотреть в виджете](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-1.png)

Не как кнопка: представление может отображаться в полном размере, и вы можете управлять элементами в представлении.

![Посмотреть в виджете - кнопка](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-2.png)

В виде кнопки: Вы можете показать маленькую миниатюру вида, и, нажав на нее, она будет показана в полном размере.

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

При активации в определенный идентификатор будет записано количество секунд задержки, и после того, как задержка закончится, определенный идентификатор будет установлен на 0, а идентификатор тревоги будет установлен на истину.

![Контроль безопасности](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-2.png)

### Игрок
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-player.png)

### Карта
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-map-1.png)

### Камера
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-camera-1.png)

### HTML-шаблон
![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-html-1.png)

HTML-шаблон можно использовать для отображения любого html-кода.
Кроме того, вы также можете показывать изображение или iframe с помощью этого виджета.

### Жалюзи
![Жалюзи](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-1.png)

![Игрок](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-2.png)

### Цветная лампа
### Выбор времени
## Сопоставление мастера
### Один вид - одна комната
- Термостат => Виджет Термостат (Фактическая, Желаемая, Влажность) с именем устройства
- Включение/выключение света => Включение/выключение простого состояния с именем устройства
- Диммер => Простое состояние
- Затвор => Жалюзи с именем
- Themerature => фактическое значение с диаграммой (если возможно, добавьте влажность)
- Движение => Простое состояние с определенной иконкой (мальчик), только чтение, активный цвет rgba(52,170,68,1)
- Огонь => Простое состояние с определенным значком (огонь), только чтение, активный цвет «красный».
- Наводнение => Простое состояние с определенной иконкой (вода), только для чтения, активный цвет «синий».
- Дверь => Простое состояние с определенным значком (Дверь), только для чтения, активный цвет «красный».
- Ползунок => Простое состояние
- Блокировка => Простое состояние
- Socket => Простое состояние с определенной иконкой
- Медиаплеер => медиаплеер
- Громкость => простое состояние с определенной иконкой (Громкость)
- Прогноз погоды => Openweathermap (только если установлен)
- Окно => Простое состояние с определенными иконками (открыто => правда, закрыто => ложь)

### Один вид - все номера
- Термостат => Виджет Термостат (Фактическая, Желаемая, Влажность) с именем устройства
- Включение/выключение света => Переключатель и переключатель кнопок
- Диммер => Переключатель и ползунок кнопок
- Затвор => Переключатель и кнопки Жалюзи
- Themerature => Информация о переключателях и кнопках с диаграммой

-- влажность => Информация о переключателях и кнопках с диаграммой

- Движение => Переключатель и кнопки Информация о конкретном значке, только для чтения, активный цвет rgba (52,170,68,1)
- Fire => ISwitch and Buttons nfo конкретный значок (огонь), только для чтения, активный цвет «красный»
- Flood => Информация о переключателях и кнопках с определенным значком (вода), только для чтения, активный цвет «синий».
- Дверь => Информация о переключателях и кнопках с определенным значком (Дверь), только для чтения, активный цвет «красный».
- Ползунок => Ползунок переключателей и кнопок
- Блокировка => Переключатель и переключатель кнопок
- Розетка => Переключатель и Кнопки с определенным значком
- Медиаплеер => медиаплеер (как карта) с названием комнаты
- Громкость => Ползунок переключателей и кнопок с определенным значком (Громкость)
- Прогноз погоды => Openweathermap как карта (только если установлена)
- Окно => Информация о переключателях и кнопках с определенными значками (открыто => правда, закрыто => ложь)

## Делать
- контроллер цвета RGBW

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 0.7.1 (2023-07-02)
* (bluefox) Added washer widget

### 0.6.2 (2023-06-29)
* (bluefox) Allowed usage without frame for all widgets

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
* (bluefox) Removed static widget, as it replaced by switches widget

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

Copyright (c) 2022-2023 bluefox <dogafox@gmail.com>

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