---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: xKe23Xkj89gC/PCQFAdtUkjvEwhDFRyVl+a7nhnKC80=
---
![Логотип](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![Количество установок (последних)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![Статус зависимости](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![Известные уязвимости](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-material-advanced
## Адаптер vis-material-advanced для ioBroker
Этот адаптер предоставляет стандартизированные виджеты для визуализации в ioBroker. Множество различных предустановленных виджетов

основы этого адаптера были созданы:

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (фото---) https://github.com/Pix---/ioBroker.vis-material

но переписано на 90%

Добавлено несколько исправлений ошибок и множество новых виджетов.

## Следующие виджеты присутствуют прямо сейчас
### Текущий
 - Дверь
 - Окно
 - Температура
 - Влажность
 - Давление
 - Температура и влажность
 - Размещение
 - Свет
 - Диммер
 - Свет-температура
 - Затвор
 - Объем
 - Термостат
 - логическое значение
 - Число
 - Текст
 - Клапан

### В ходе выполнения
Еще не окончательно:

 - Гаражная дверь
 - Радио станция

 много виджетов все еще в планах

## Параметры
В большинстве виджетов доступны следующие параметры:

    - цвет текста
    - cardIcon (пока не везде имеет смысл, например диммер)
    - цвет непрозрачности (стандартный цвет непрозрачности)
    - colorizeByValue (в зависимости от некоторых значений цвет непрозрачности можно изменить, например, если слишком жарко, сделайте его красным или холодным синим)
    - ниже, выше, мин, макс (значения для colorizeByValue)
    - цвет-низкий/высокий, средний... (цвет, который будет использоваться, если граница поднята)
    - только для чтения (некоторые виджеты можно перевести в режим только для чтения и только для отображения)
    - border-radius для включения и изменения круглого угла
    - valueAlign Выравнивает поле значения по левому, центральному или правому краю.
    - value-vertical Выровнять поле значения сверху, снизу или посередине.
    - borderColor Цвет границы, если активирован

### Начиная
установите адаптер и запустите VIS в режиме редактирования.
С левой стороны выберите vis-material-adapter, после чего все виджеты отобразятся в предварительном просмотре.

............. пропало много документов ............

**это example2.png, импортируйте его и посмотрите вживую** ![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

**вы можете импортировать файл example.json в vis** благодаря @sigi234

## Changelog
<!--
    Placeholder
    ### **WORK IN PROGRESS**
-->
### 1.7.4 (2023-09-07)
* (DEV2DEV-DE) Subscribe to updates of both values (temperature, humidity)

### 1.7.3 (2022-04-11)
* (bluefox) Removed erroneous chars from HTML

### 1.7.2 (2021-07-02)
* bugfix 2 Temp Humidity

### 1.7.1 (2021-07-02)
* bugfix for Temp Humidity

### 1.7.0 (2021-04-19)
* added new Widget Window3 for possibility showing open/tilted/closed [0/1/2] windows

## License
MIT License

Copyright (c) 2020-2023 EdgarM73 <edgar.miller@gmail.com>

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