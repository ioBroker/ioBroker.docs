---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: bMN/k1bUqhAK3n6vjpzqLess5736QFbTkdhpwxLGYMg=
---
![Логотип](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Количество установок](http://iobroker.live/badges/lifx-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lifx.svg)

# IoBroker.lifx
**Тесты:** ![Тестирование и выпуск](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

Адаптер Lifx для ioBroker

## Настройки/Конфигурация:
- не требует настроек и конфигурирования, адаптер автоматически определяет лампы

### Статус недоступности виджета метро
- маленькая иконка статуса «недоступен» в метро-виджете — первый объект уведомления
- object_id[0] - это индикатор.недоступен
- вместо установки «истина» следует написать «ложь»
- значок должен быть wifiColorRed.png
- горизонтальное смещение 6 должно работать нормально

## Визуализация:
- использовать виджеты lifx

## Объектов
| Объект | Значение | Устанавливаемый | Описание |
| ------------------ | ------- | :------: | ------------------------------- |
| Bulb.state | boolean | x | true/false -> ON/OFF |
| Bulb.colormode | логический | x | цвет, белый |
| Bulb.temp | значение | x | цветовая температура 2500...9000 K |
| Bulb.hue | значение | x | цвет 0...360 |
| Bulb.sat | значение | x | насыщенность 0...100 % |
| Bulb.bright | значение | x | яркость 0...100 % |
| Bulb.online | логическое значение | - | истинно/ложно |
| Bulb.label | значение | - | имя/метка |
| Bulb.vendor | значение | - | информация о поставщике |
| Bulb.product | значение | - | информация о продукте |
| Bulb.colorLamp | значение | - | информация о colorLamp |
| Bulb.infraredLamp | значение | - | информация об инфракрасной лампе |
| Bulb.multizoneLamp | значение | - | информация о multizoneLamp |
| Bulb.Zone.temp | значение | x | цветовая температура 2500...9000 K |
| Bulb.Zone.hue | значение | x | цвет 0...360 |
| Bulb.Zone.sat | значение | x | насыщенность 0...100 % |
| Bulb.Zone.bright | значение | x | яркость 0...100 % |

## ДЕЛО:
- получение настройки цветовых значений со всеми существующими настройками (регулировка яркости имеет фиксированную насыщенность 80% и сохраняет предыдущую настройку оттенка; регулировка насыщенности и регулировка оттенка имеют фиксированную яркость 80%)
- время перехода
- формы волн

## Известные проблемы
- значения вне диапазона вызывают сбой адаптера

## Changelog

### 1.0.9

- update dependencies
- update to iobroker/eslint

### 1.0.8

- update dependencies

### 1.0.7

- (Jarves020) Reactivated Cyclic Updates (brackets were missing at function call)
- (Jarves020) reenabled Settings for lifx Cyclic Update Intervall
- (Jarves020) Changed LogLevel for "Failed Cyclic Update...." from error to debug to avoid log spamming
- (foxthefox) IOB checker corrections

### 1.0.6

- eslint upgrade and corrections

### 1.0.5

- update devDeps
- IOB checker corrections

### 1.0.4

- implementation jsonUI

### 1.0.3

- translation with adapter-dev

### 1.0.2

- some changes to loglevel
- fix crash when no label is provided

### 1.0.1

- bugfix, context of 'this' in timeout
- Null exception with B/W bulb issue#23

### 1.0.0

- refactoring, change to class based structure of the adapter
- gitub actions instead travis

### 0.2.1

- (Jarvis020) errorhandling improvements
- (Jarvis020) fade time

### 0.2.0

- lifx-lan-client library instead node-lifx
- states for vendor, product, version, product features
- multizone support
- cyclic polling

### 0.1.1

- logo quadratic

### 0.1.0

- compact mode

### 0.0.5

- adminv3
- noConfig -> no admin page anymore

### 0.0.4

- jqui widget with interactive colored slider

### 0.0.3

- metro widget
- jqui widget

### 0.0.2

- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1

- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2016-2025 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2025 foxthefox <foxthefox@wysiwis.net>