---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.deyeidc/README.md
title: ioBroker.deyeidc
hash: Ds4rrNpll3XuGMXCxAEp43eyEX8PyN6yEyqSPFCovFA=
---
![Логотип](../../../en/adapterref/iobroker.deyeidc/admin/deyeidc.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.deyeidc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.deyeidc.svg)
![Количество установок](https://iobroker.live/badges/deyeidc-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/deyeidc-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.deyeidc.png?downloads=true)

# IoBroker.deyeidc
**Тесты:** ![Тестирование и выпуск](https://github.com/rasyxh/ioBroker.deyeidc/workflows/Test%20and%20Release/badge.svg)

## Адаптер deyeidc для ioBroker
Сборщик данных или инвертор, совместимый с Deye

### Начиная
Этот адаптер позволяет считывать данные с инвертора в локальной сети. Для этого достаточно ввести IP-адрес инвертора и серийный номер регистратора. Если порт отличается от значения по умолчанию, его также можно настроить. В качестве практического значения частоты дискретизации установлено 60 секунд.

Сами данные извлекаются через известные регистры Modbus и сохраняются в точках данных. Эта технология была разработана и протестирована на инверторе, совместимом с датчиком «глаз». Поэтому регистры, к которым осуществляется запрос, могут отличаться для других моделей.

## Использование
Для ввода адаптера в эксплуатацию необходимо также ввести регистровые области и катушки в графический интерфейс пользователя на следующих страницах. В настоящее время на GitHub уже есть примеры записей для различных типов (например, https://github.com/raschy/ioBroker.deyeidc/blob/main/deyeidc.MI600.json).
В основном, регистры должны быть определены на основе соответствующей документации. В зависимости от типа содержимого, декодирование осуществляется с помощью «правил».

В данном случае применима следующая формулировка:

| Правила | Описание |
| ----- | ------------ |
| 0 | raw_signed |
| 1 | для 16-битных беззнаковых значений |
| 2 | для 16-битных знаковых значений |
| 3 | для 32-битных беззнаковых значений |
| 4 | для 32-битных знаковых значений |
| 5 | для серийного номера |
| 6 | для температуры |
| 7 | для номера версии |
| 8 | для однобайтовых (старших байтов) |
| 9 | для однобайтовых чисел (LSB) |

В документации также указано, нужно ли сдвигать десятичную точку на одну или две цифры. Для этой цели используется поле «Фактор». При этом дальнейшие осмысленные вычисления невозможны.

Некоторые значения не предоставляются инвертором и должны вычисляться отдельно. До версии 0.3.2 здесь было возможно только два значения. Начиная с версии 0.4.0, выражения с несколькими операндами и операторами — например, «A + B – C _ D» — можно вводить в таблицу «Вычислить» для каждого целевого объекта, после чего они вычисляются. Конечно, соблюдается стандартный порядок операций (_ и / вычисляются перед + и –) (спасибо XHunter74). Правила использования скобок по-прежнему не поддерживаются.

Типичным примером является выходная мощность солнечного модуля. Ее необходимо рассчитать, используя значения «DV1 * DC1», а результат («PV1») затем сохраняется в дереве данных в разделе «Ключ» вместе с соответствующим устройством.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Использование этих товарных знаков не подразумевает какой-либо связи с ними или их дочерними компаниями, а также одобрения с их стороны! Этот личный проект создан в свободное время и не преследует коммерческих целей. DEYE является товарным знаком © 2023 Ningbo Deye Technology Co., Ltd., No.26 South Yongjiang Road, Beilun, Ningbo, Zhejiang, 315806 VR China.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (raschy) Compute module redesigned and expanded (PR XHunter74)

### 0.3.2 (2026-05-31)

- (raschy) Less restrictive serial number check
- (raschy) NodeJS >= 22.x is required
- (raschy) Any necessary adjustments for nodeJS 22.x
- (raschy) translations i18n-short

### 0.3.1 (2025-10-01)

- (raschy) Reduction of info-log output

### 0.3.0 (2025-08-29)

- (raschy) Reduction of devDependencies
- (raschy) The auxiliary functions chai and chai-as-promised have been tacked onto the executable version
- (raschy) Control codes have been added for Modbus RTU requests
- (raschy) Extended Debugging can be switched
- (raschy) Modified method for offlineReset

### 0.2.0 (2025-02-06)

- (raschy) Dependabot run tracked manually

### 0.1.4 (2025-01-11)

- (raschy) Error message corrected
- (raschy) Function nullable repaired

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 raschy <raschy@gmx.de>

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