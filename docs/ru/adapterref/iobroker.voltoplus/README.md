---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.voltoplus/README.md
title: ioBroker.voltoplus
hash: PYDcxFBeBjqRqJEeAZ8P1dt2hnfLKBEdGgrk4xGKTkk=
---
![Логотип](../../../en/adapterref/iobroker.voltoplus/admin/voltoplus.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.voltoplus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.voltoplus.svg)
![Количество установок](https://iobroker.live/badges/voltoplus-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/voltoplus-stable.svg)
![Статус зависимости](https://img.shields.io/david/Jey-Cee/iobroker.voltoplus.svg)
![НПМ](https://nodei.co/npm/iobroker.voltoplus.png?downloads=true)

# IoBroker.voltoplus
**Тесты:** ![Тестируйте и выпускайте](https://github.com/Jey-Cee/ioBroker.voltoplus/workflows/Test%20and%20Release/badge.svg)

## Адаптер VoltoPlus для ioBroker
Получите актуальные данные от счетчика энергии VoltoPlus.

## Спонсоры
Если вам нравится моя работа, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвований для Jey Cee, не имеющая отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Использование
Просто введите IP-адрес счетчика энергии VoltoPlus в настройках адаптера.
Адаптер будет считывать данные каждую секунду.

## Отказ от ответственности
Разработчики этого модуля никоим образом не поддерживаются и не связаны с Wallner Automation GmbH или любыми связанными дочерними компаниями, логотипами или товарными знаками.

## Ссылки
[Продукт](https://www.voltoplus.com/shop/voltoplus/167/voltoplus?c=44)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2022-11-17)
* some fixes for relesase

### 0.1.0 (2022-10-18)
* Changed unit of energy_purchased & energy_supplied from W to kWh
* divide value of energy_purchased & energy_supplied by 10
* Update depenendencies

### 0.0.1
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2022 Jey Cee <jey-cee@live.com>

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
