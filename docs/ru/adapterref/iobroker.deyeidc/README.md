---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.deyeidc/README.md
title: ioBroker.deyeidc
hash: L8p1zCvIrtdtSi1KJXiwaU3syYEVmB4aLoaGFcFdju4=
---
![Логотип](../../../en/adapterref/iobroker.deyeidc/admin/deyeidc.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.deyeidc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.deyeidc.svg)
![Количество установок](https://iobroker.live/badges/deyeidc-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/deyeidc-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.deyeidc.png?downloads=true)

# IoBroker.deyeidc
**Тесты:** ![Тестируйте и выпускайте](https://github.com/rasyxh/ioBroker.deyeidc/workflows/Test%20and%20Release/badge.svg)

## Адаптер deyeidc для ioBroker
Сборщик данных с инвертором, совместимым с Дейе

## Использование
Для ввода адаптера в эксплуатацию необходимо ввести в графическом интерфейсе диапазоны регистров и катушки в дополнение к IP-адресу и серийному номеру регистратора на следующих страницах. Для этого уже есть пример записи.
Некоторые значения не предоставляются инвертором и должны рассчитываться независимо. Для этого в расчетную таблицу можно ввести два значения на строку, которые затем перемножаются.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения ими или любыми связанными с ними дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет бизнес-целей. DEYE является товарным знаком Copyright © 2023 Ningbo Deye Technology Co., Ltd., No.26 South Yongjiang Road, Beilun, Ningbo, Zhejiang, 315806 VR China.

### Начиная
Этот адаптер позволяет считывать данные с инвертора в локальной сети. Эти данные извлекаются через известные порты Modbus и сохраняются в точках данных. Это было разработано и протестировано на «Deye-совместимом» инверторе. Поэтому запрашиваемые регистры могут отличаться на других моделях.
Для этого необходимо ввести только IP инвертора и серийный номер регистратора. Если порт отличается от значения по умолчанию, его также можно настроить. 60 секунд были предустановлены как практическое значение частоты дискретизации.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.0.9 (2023-07-10)

-   (raschy) minor bugs fixed

### 0.0.8 (2023-07-10)

-   (raschy) Day reset for offline operation

### 0.0.7 (2023-05-27)

-   (raschy) release for npm and ioBroker latest

### 0.0.6 (2023-05-27)

-   (raschy) Some processes optimized

### 0.0.5 (2023-04-27)

-   (raschy) Calculations modified with formulas
-   (raschy) Error messages in English

### 0.0.4 (2023-03-21)

-   (raschy) release for npm

### 0.0.3 (2023-03-21)

-   (raschy) release

### 0.0.2 (2023-03-21)

-   (raschy) initial release

## License

MIT License

Copyright (c) 2023 raschy <raschy@gmx.de>

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