---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: B5jRjVJrj3E1HA6OmRZ+zA1I+dPzjI2vAeSGLDjtbM4=
---
![Логотип](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Количество установок](http://iobroker.live/badges/lifx-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lifx.svg)

# IoBroker.lifx
**Тесты:** ![Тест и выпуск](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

Адаптер Lifx для ioBroker

## Настройки/Конфигурация:
- не требуется никаких настроек или конфигурирования, адаптер автоматически определяет лампы

### Статус недоступности виджета метро
- маленькая иконка для статуса «недоступен» в метро-виджете является первым объектом уведомления
- object_id[0] - это индикатор.недоступен
- вместо предустановки «истина» следует написать «ложь»
- значок должен быть wifiColorRed.png
- горизонтальное смещение 6 должно работать нормально

## Визуализация:
- использовать виджеты lifx

## Объектов
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|состояние лампочки|логическое|x|истина/ложь -> ВКЛ/ВЫКЛ|
|Bulb.colormode|логическое|x|цвет, белый|
|Bulb.temp|значение|x|цветовая температура 2500...9000 К|
|Bulb.hue|значение|x|цвет 0...360|
|Bulb.sat|значение|x|насыщенность 0...100 %|
|Bulb.bright|значение|x|яркость 0...100 %|
|Bulb.online|логическое|-|истина/ложь|
|Bulb.label|значение|-|имя/метка|
|Bulb.vendor|значение|-|информация о поставщике|
|Bulb.product|стоимость|-|информация о продукте|
|Bulb.colorLamp|значение|-|информация о colorLamp|
|Bulb.infraredLamp|значение|-|информация об инфракрасной лампе|
|Bulb.multizoneLamp|значение|-|информация о multizoneLamp|
|Bulb.Zone.temp|значение|x|цветовая температура 2500...9000 К|
|Bulb.Zone.hue|значение|x|цвет 0...360|
|Bulb.Zone.sat|значение|x|насыщенность 0...100 %|
|Bulb.Zone.bright|значение|x|яркость 0...100 %|

## ДЕЛАТЬ:
- получение настройки цветовых значений со всеми существующими настройками (настройка яркости имеет фиксированную насыщенность 80% и сохраняет предыдущую настройку оттенка; настройка насыщенности и настройка оттенка имеют фиксированную яркость 80%)
- время перехода
- формы волн

## Известные проблемы
- значения вне диапазона вызывают сбой адаптера

## Changelog

### 1.0.7
* (Jarves020) Reactivated Cyclic Updates (brackets were missing at function call)
* (Jarves020) reenabled Settings for lifx Cyclic Update Intervall
* (Jarves020) Changed LogLevel for "Failed Cyclic Update...." from error to debug to avoid log spamming
* (foxthefox) IOB checker corrections

### 1.0.6
* eslint upgrade and corrections

### 1.0.5
* update devDeps
* IOB checker corrections

### 1.0.4
* implementation jsonUI

### 1.0.3
* translation with adapter-dev

### 1.0.2
* some changes to loglevel
* fix crash when no label is provided

### 1.0.1
* bugfix, context of 'this' in timeout
* Null exception with B/W bulb issue#23

### 1.0.0
* refactoring, change to class based structure of the adapter
* gitub actions instead travis

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

Copyright (c) 2016-2024 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2024 foxthefox <foxthefox@wysiwis.net>