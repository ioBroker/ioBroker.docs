---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alpha2/README.md
title: ioBroker.alpha2
hash: EQcdPK8Xi7xiAGe4tLPcIjwUhP3XNmtD4AgfK8zLFSU=
---
![Логотип](../../../en/adapterref/iobroker.alpha2/admin/mh-logo-schrift.png)

![Количество установок](http://iobroker.live/badges/alpha2-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.alpha2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alpha2.svg)
![Трэвис-Си](https://travis-ci.org/Eisbaeeer/ioBroker.alpha2.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.alpha2.png?downloads=true)

# IoBroker.alpha2
Этот адаптер позволяет получать и устанавливать значения регулятора отопления Moehlenhoff Alpha2.
Адаптер использует XML-API Alpha2. Если вы используете более одного контроллера Alpha2, вам необходимо установить второй экземпляр адаптера.

## Установка
- Установить переходник
- введите свой ip-адрес или имя хоста контроллера Alpha2
- заполните интервал опроса, чтобы получить состояния

## Использование
Вы можете изменить следующие объекты в:

- Для каждой HEATAREA (максимум 8 зон)

| Описание | Объект | Ценности |
|---------------------|-----------------|---------------------------|
| Целевая температура | T_TARGET | Темп. в градусах Цельсия |
| Целевая температура. день | T_HEAT_DAY | Темп. в градусах Цельсия |
| Целевая температура. ночь | T_HEAT_NIGHT | Темп. в градусах Цельсия |
| Режим HeatArea | HEATAREA_MODE | 0 = Авто, 1 = День, 2 = Ночь |
| Программа Будни | PROGRAM_WEEK | Программа № 0-3 |
| Программа выходных | PROGRAM_WEEKEND | Программа № 0-3 |

- Для каждой ПРОГРАММЫ с макс. 4 смены на каждую программу.
- Шаги минут 15. Разрешены только 00,15,30,45.
- Часы в 24 стилях

| Описание | Объект | Ценности |
|---------------------|-----------------|-------------------------------|
| Время начала | СТАРТ | Время запуска программы [чч: мм] |
| Время окончания | КОНЕЦ | Время окончания программы [чч: мм] |

- Для отдыха

| Описание | Объект | Ценности |
|-----------------------|---------------------|--------------------------|
| Начало отпуска | VACATION.START_DATE | [ГГГГ-ММ-ДД] |
| Конец отпуска | VACATION.END_DATE | [ГГГГ-ММ-ДД] |
| Темп. во время отпуска | T_HEAT_VACATION | Темп. в градусах Цельсия |

- Все остальные объекты доступны только для чтения

## Примеры
### Установите температуру в комнате 1
Чтобы установить целевую температуру (действительную только до начала или окончания следующей программы), установите объект T_TARGET в соответствующей Heatarea.
Адаптер будет использовать XML-API для установки значения в heatarea.

### Установить отпуск
Чтобы установить отпуск, убедитесь, что вы определили целевую температуру отпуска с помощью объекта T_HEAT_VACATION. Вы найдете этот объект в УСТРОЙСТВЕ.
После этого установите оба объекта VACATION.START_DATE и VACATION.END_DATE. Если вы деактивируете настройки отпуска, установите оба объекта с датами до сегодняшнего дня.
Вы можете проверить объект VACATION.STATE, чтобы проверить статус. Если статус показывает true, отпуск активен.

## Известные ограничения
- нет виртуальных комнат

## Changelog

### 1.0.3
. (Eisbaeeer)
Fixed error messages in log

### 1.0.2
- (oHa510)
Fixed an issue if you don't use all 4/8/12 heataras then heatareas could get assigned to wrong heatarea object in iobroker
Expanded Heatareas and Heatctrl to the maxiumum of 12
Changed Heatarea and Heatctrl indexing to 1-12 (old 0-11 was very confusing)
Added support for locking controllers (kids mode)
Added support for locking set temperature (hotel mode)
Added some new objects and infos like IODEVICEs etc.

### 1.0.1
- (Eisbaeeer)
Fixed issues

### 1.0.0
- (Eisbaeeer)
Fixed issue #6 (HEATAREA_NAME)

### 0.0.4
- (Eisbaeeer)   
Added refresh of states after setting states

### 0.0.3
- (Eisbaeeer)   
fixed issues #2

### 0.0.2
- (Eisbaeeer)   
fixed issues #1

### 0.0.1
- (Eisbaeeer) inital version of Alpha2

## License
The MIT License (MIT)
Copyright (c) 2021 Eisbaeeer eisbaeeer@gmail.com