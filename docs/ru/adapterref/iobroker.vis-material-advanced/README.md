---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-материал-продвинутый
hash: rQGHx5wnsb7Uay3ZjyfpYEOtiL9vBKR7WN6iSDk6J40=
---
![Логотип](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![Количество установок (последние)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![Статус зависимости](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![Известные уязвимости](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-material-advanced
## Адаптер vis-material-advanced для ioBroker
Этот адаптер предоставляет стандартизированные виджеты для vis в ioBroker. Множество различных предустановленных виджетов

основы этого адаптера были созданы:

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (пикс---) https://github.com/Pix---/ioBroker.vis-material

но переписано на 90%

Добавлено несколько исправлений и множество новых виджетов.

## Следующие виджеты присутствуют прямо сейчас
### Текущий
 - Дверь
 - Окно
 - Температура
 - Влажность
 - Давление
 - Температура и влажность
 - Вместимость
 - Светлый
 - диммер
 - Световая температура
 - Затвор
 - Объем
 - Термостат
 - логическое значение
 - Количество
 - Текст
 - Клапан

### В ходе выполнения
Еще не окончательно:

 - Гаражная дверь
 - Радио станция

 много виджетов еще в планах

## Опции
    В большинстве виджетов доступны следующие параметры:

    - цвет текста
    - cardIcon (пока не везде имеет смысл, например диммер)
    - цвет непрозрачности (стандартный цвет непрозрачности)
    - colorizeByValue (в зависимости от некоторых значений цвет непрозрачности может быть изменен, например, если слишком жарко, сделайте его красным или холодным синим)
    - ниже, выше, мин, макс ( значения для colorizeByValue )
    - цвет-низкий/высокий,средний... (цвет, используемый, если граница приподнята)
    - только для чтения (некоторые виджеты могут быть установлены в режим только для чтения только для отображения)
    - border-radius для включения и изменения закругления угла
    - valueAlign Выравнивание поля значения по левому краю, центру или правому краю
    - value-vertical Выровняйте поле «Значение» по верхнему, нижнему или среднему краю
    - borderColor Цвет границы, если активирован

### Начиная
установите адаптер и запустите VIS в режиме редактирования.
С левой стороны выберите vis-material-adapter, после чего все виджеты отобразятся в предварительном просмотре.

............. много документов отсутствует ......................

**это пример2.png, импортируйте его и смотрите вживую** ![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

**вы можете импортировать файл example.json в vis** благодаря @sigi234

## Changelog
<!--
    Placeholder
    ### **WORK IN PROGRESS**
-->
### 1.7.3 (2022-04-11)
* (bluefox) Removed erroneous chars from HTML

### 1.7.2 (2021-07-02)
* bugfix 2 Temp Humidity

### 1.7.1 (2021-07-02)
* bugfix for Temp Humidity

### 1.7.0 (2021-04-19)
* added new Widget Window3 for possibility showing open/tilted/closed [0/1/2] windows

### 1.6.0 (2021-04-01)
* new Temperature widget with ONLY an icon from blue to red depending on temperature setting

## License
MIT License

Copyright (c) 2020-2022 EdgarM73 <edgar.miller@gmail.com>

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