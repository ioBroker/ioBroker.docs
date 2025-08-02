---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.deyeidc/README.md
title: ioBroker.deyeidc
hash: 0ZcS+L2l6rWq/BTpl4sDy6dZEdwFIlHLGQPkO1XWA0k=
---
![Логотип](../../../en/adapterref/iobroker.deyeidc/admin/deyeidc.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.deyeidc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.deyeidc.svg)
![Количество установок](https://iobroker.live/badges/deyeidc-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/deyeidc-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.deyeidc.png?downloads=true)

# IoBroker.deyeidc
**Тесты:** ![Тестирование и выпуск](https://github.com/rasyxh/ioBroker.deyeidc/workflows/Test%20and%20Release/badge.svg)

## Адаптер deyeidc для ioBroker
Сборщик данных для инвертора, совместимого с Deye

### Начиная
Этот адаптер позволяет считывать данные с инвертора в локальной сети. Для этого необходимо ввести только IP-адрес инвертора и серийный номер регистратора. Если порт отличается от значения по умолчанию, это также можно отрегулировать. В качестве практического значения частоты дискретизации установлено значение 60 секунд.

Сами данные извлекаются через известные регистры Modbus и сохраняются в точках данных. Он был разработан и протестирован на инверторе, совместимом с Deye. Поэтому для других моделей регистры, к которым осуществляется запрос, могут отличаться.

## Использование
Для ввода адаптера в эксплуатацию необходимо также ввести области регистрации и катушки в графическом интерфейсе на следующих страницах. Тем временем на github уже есть примеры записей для различных типов (например, https://github.com/raschy/ioBroker.deyeidc/blob/main/deyeidc.MI600.json).
В основном регистры должны определяться из соответствующей документации. В зависимости от типа контента декодирование осуществляется с помощью «правил».

Здесь применимо следующее:

| Правила | Описания |
| ----- | ------------ |
| 0 | необработанный_подписанный |
| 1 | для 16-битных беззнаковых значений |
| 2 | для 16-битных значений со знаком |
| 3 | для 32-битных беззнаковых значений |
| 4 | для 32-битных значений со знаком |
| 5 | для серийного номера |
| 6 | для температуры |
| 7 | для номера версии |
| 8 | для одиночных байтов (MSB) |
| 9 | для одиночных байтов (LSB) |

В документации также указано, нужно ли сдвигать десятичную точку на одну или две цифры. Этой цели служит запись «Фактор». При этом дальнейшие содержательные расчеты проводиться не могут.

Некоторые значения не предоставляются инвертором и должны рассчитываться самостоятельно. Для этого в таблицу «Расчет» можно ввести два значения в каждой строке, которые затем вычисляются.
Типичным примером является «DV1\*DC1», где результат затем сохраняется в «Ключе» с соответствующей единицей в дереве данных. Обратите внимание, что в каждой строке может обрабатываться только один базовый тип расчета. Поэтому правила скобок невозможны и не поддерживаются.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия и логотипы продуктов и компаний являются торговыми марками™ или зарегистрированными торговыми марками® соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения с их стороны или любых связанных с ними дочерних компаний! Этот личный проект поддерживается в свободное время и не имеет бизнес-целей. DEYE является товарным знаком © 2023 Ningbo Deye Technology Co., Ltd., № 26 South Yongjiang Road, Beilun, Ningbo, Zhejiang, 315806 VR China.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.11 (2023-08-26)

-   (raschy) wrong implementation msb/lsb of 32-bit values recorrected

### 0.0.10 (2023-08-25)

-   (raschy) Calculation of 32-bit values corrected
-   (raschy) Ready for launch into the stable repository

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
