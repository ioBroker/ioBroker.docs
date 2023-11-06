---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-homekittiles/README.md
title: ioBroker.vis-homekittiles
hash: mOa2n5UyvM6KD1Nj95QtoEhFIPTLUWvqAF9sZzJTNYo=
---
# IoBroker.vis-homekittiles

![НПМ-версия](https://img.shields.io/npm/v/iobroker.vis-homekittiles.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-homekittiles.svg)
![Количество установок](https://iobroker.live/badges/vis-homekittiles-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/vis-homekittiles-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-homekittiles.png?downloads=true)

<img src="doc/img/title-pic_hkt-on-ipad.png" />

**Тесты:** ![Тестирование и выпуск](https://github.com/Standarduser/ioBroker.vis-homekittiles/workflows/Test%20and%20Release/badge.svg)

## HomeKit-Tiles для ioBroker-VIS
Homekit Tiles — это набор виджетов, основанный на дизайне Apple HomeKit.
Особенностью виджетов является то, что они не содержат элементов фиксированного стиля, а все форматируется с помощью CSS. В результате в редакторе VIS нет отдельных настроек положения и/или размера значков, надписей и т.п. Дизайн корректируется путем изменения CSS-кода. Для этого в качестве шаблона можно использовать CSS-код из файла `/widgets/homekittiles/css/style.css`. Код вставляется во вкладку CSS в редакторе VIS и может быть настроен по желанию. Также можно добавить свои собственные классы CSS через редактор VIS в разделе виджетов «Общие».

Виджеты предназначены для VIS 1.x.

**Примечание.** По причинам лицензирования в этот адаптер не включены значки. Очень хорошие источники иконок:

* [https://www.flaticon.com](https://www.flaticon.com)
* [https://icons8.com](https://icons8.com)

[🇩🇪 Документация](doc/homekittiles-de.md) [🇺🇸 Документация](doc/homekittiles-en.md)

## Дела, которые необходимо сделать
* Шаг ремонта
* Собственные сигнальные картинки для тайлов
* Набор плиток диалогового окна активен в зависимости от состояния.
* Мини-медиаплеер
* Термостат
* Выбирать
* Кнопка подменю
* CSS: сделайте цвета диалогового окна красивыми.
* CSS: сделайте цвета окна выбора даты красивыми

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.5 (2023-11-04)

* (Standarduser) fixed: adjustment of decimals in labelgroup 1 & 2
* (Standarduser) fixed: readme
* (Standarduser) not fixed: increment not working properbly

### 0.0.4 (2023-11-01)

* (Standarduser) fixed: some corrections on CSS code
* (Standarduser) fixed: widget description text
* (Standarduser) fixed: wrong placement if dialog-height had a unit (ViewInWidget-Dialog)
* (Standarduser) fixed: increment buttons on tiles were working insuficient
* (Standarduser) added: variable number of digits at value-tile
* (Standarduser) added: slider for ViewInWidget-Swipe
* (Standarduser) added: ability to manipulate values in label-groups

### 0.0.2 (2023-10-14)

* (Standarduser) initial release

## License

MIT License

Copyright (c) 2023 Standarduser

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