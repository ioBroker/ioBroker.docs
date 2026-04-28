---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.bydhvs.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.bydhvs.svg
BADGE-Number of Installations: https://iobroker.live/badges/bydhvs-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/bydhvs-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.bydhvs.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bydhvs/README.md
title: Структура сообщений BYD HVS
hash: ivS/3Uo2lXRDo8NTqbOQ+atzevFaI9uKutZFWHsuwMA=
---
# Структура сообщений BYD HVS
## Перехват сообщений
Эти сообщения расшифровываются путем перехвата обмена данными между программным обеспечением Be Connect и оборудованием. Положение и информация в каждом сообщении интерпретируются сообществом и могут быть неверными. Пожалуйста, используйте только достоверную информацию от BYD или ее дочерних компаний.

## Сообщения
После установления TCP-соединения необходимо отправить команду для получения данных или выполнения измерения. В проекте smarthomeNG это описывается как аналог ModBus, где мы читаем и записываем регистры через TCP-соединение.

https://github.com/lgb-this/plugins/blob/develop/byd_bat/user_doc.rst Все сообщения имеют заголовок в байтах 1 и 2.

### Сообщение 0 - Инициирование соединения и основные данные
Отправляемое сообщение: ```010300000066c5e0```

| Байт | Тип | Описание |
|:-- |:--:|:--|
| От 3 до 21 | строка | Это серийный номер. По символу 2 можно определить тип оборудования (HVS, HVM и т. д.) |
| 27 + 28 | символ | Версия в формате V(27).(28) для первого BMU |
| 29 + 30 | символ | Версия в формате V(29).(30) для 2-го БМУ |
| 33 | целое число | использованная башня BMU |
| 36 | 2 отдельных байтовых целых числа | 1 байт - башни; 2 байта - модули (23 => 2 башни и 3 модуля) |
| 38 | перечисление | 0: OffGrid; 1: OnGrid; 2: Backup |

### Сообщение 1 - Диагностика системы
Отправляемое сообщение: ```01030500001984cc```

| Байт | Тип | Описание |
|:-- |:--:|:--|
| 3 | int16 signed | SOC всей системы |
| 5 | int16 signed | Максимальное напряжение системы |
| 7 | int16 signed | Минимальное напряжение системы |
| 9 | int16 signed | System SOH |
| 11 | int16 signed | Системные амперы |
| 13 | int16 беззнаковое | Напряжение батареи с SF 100 |
| 15 | int16 signed | максимальная температура |
| 17 | int16 signed | min Temperature |
| 19 | int16 signed | Температура батареи |
| 29 | int16 signed | Номер ошибки |
| 31 + 32 | символов | Параметр Т |
| 35 | int16 беззнаковое | Выходное напряжение с SF 100 |
| 37 | int16 беззнаковое | Общий заряд системы |
| 41 | int16 unsinged | Полный разряд системы |

### Сообщение 2 - Диагностика системы
Команда отправки: ```010300100003040e```

| Байт | Тип | Описание |
|:-- |:--:|:--|
| 3 | перечисление | тип инвертора |
| 5 | перечисление | Тип батареи: 0: HVL; 1: ХВМ; 2: ХВС |

### Сообщение 5 - Основная информация о вышке
| Байт | Тип | Описание |
|:-- |:--:|:--|
| 5 | int16 signed | Tower max Volt |
| 7 | int16 singed | Минимальное напряжение башни |
| 9 | инт | максимальное напряжение элемента |
| 10 | инт | минимальное вольтовое число элементов |
| 11 | int16 signed | максимальная температура |
| 13 | int 16 signed | min temperature |
| 15 | инт | максимальная температура ячейки |
| 16 | int | min temperature cell number |
| 17 - 32 | MSB, LSB | Балансировочные флаги |
| 33 | int32 Беззнаковое | общая сумма платы за вышку с SF 1000 |
| 37 | int32 Беззнаковое | общий объем разряда башни с SF 1000 |
| 45 | int16 signed | напряжение батареи башни SF 10 |
| 51 | int16 singed | tower volt out |
| 53 | int16 signed | Процент SOC |
| 55 | int16 signed | SOH percentage |
| 57 | int16 signed | Currentamperes |
| 59 + 60 | шестнадцатеричное число | состояние |

## Глоссарий
| Краткое | Описание |
|:--:|:-- |
| SF | Масштабный коэффициент (значение 1234 и SF 100 => Реальное значение: 12,34) |

## Changelog
### 1.5.11 (2026-04-26)
* (arteck) del deprectated setStateAsync

### 1.5.10 (2026-04-26)
* (arteck) fix Modbus Exception – fc=0x3 exCode=0x4 in State 7
* (arteck) add Max retry attempts after error into settings

### 1.5.9 (2026-04-25)
* (arteck) fix wrong package
* (arteck) fix Modbus-RTU

### 1.5.8 (2026-04-23)
* (arteck) typo

### 1.5.7 (2026-04-23)
* (arteck) fix tower count > 1

###

## License
MIT License

Copyright (c) 2026 Christian <github@familie-herrmann.de>

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