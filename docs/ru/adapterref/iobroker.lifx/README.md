---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: kcATNN9SeK/K8naEsyUEXDNkSAzbBW+v9YSuK+9Bwos=
---
![Логотип](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Количество установок](http://iobroker.live/badges/lifx-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lifx.svg)

# IoBroker.lifx
**Тесты:** ![Тестируйте и выпускайте](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

Адаптер Lifx для ioBroker

## Установка:
официальная выпущенная версия

```javascript
npm install iobroker.lifx
```

актуальная версия с github:

```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

## Настройки/Конфигурация:
- никаких настроек или настроек не требуется, адаптер автоматически определяет лампы

### Статус виджета метро недоступен
- маленькая иконка недостижимого статуса в метро-виджете - первый объект оповещения
- object_id[0] - это индикатор.unreachable
- вместо предустановки "true" должно быть написано "false"
- иконка должна быть wifiColorRed.png
- горизонтальное смещение 6 должно работать нормально

## Визуализация:
- использовать виджеты lifx

## Объекты
|Объект|Значение|устанавливаемое|Описание|
|--------|-------|:-:|--------|
|Bulb.state|boolean|x|true/false -> ON/OFF|
|Bulb.colormode|boolean|x|цвет, белый|
|Bulb.temp|value|x|цветовая температура 2500...9000 K|
|Bulb.hue|значение|x|цвет 0...360|
|Bulb.sat|значение|x|насыщенность 0...100 %|
|Яркость лампы|значение|x|яркость 0...100 %|
|Bulb.online|логическое значение|-|true/false|
|Bulb.label|значение|-|имя/метка|
|Bulb.vendor|значение|-|информация о поставщике|
|Bulb.product|значение|-|информация о продукте|
|Bulb.colorLamp|значение|-|информация о colorLamp|
|Bulb.infraredLamp|значение|-|информация об инфракрасной лампе|
|Bulb.multizoneLamp|значение|-|информация о multizoneLamp|
|Bulb.Zone.temp|значение|x|цветовая температура 2500...9000 K|
|Bulb.Zone.hue|значение|x|цвет 0...360|
|Bulb.Zone.sat|значение|x|насыщенность 0...100 %|
|Bulb.Zone.bright|значение|x|яркость 0...100 %|

## СДЕЛАТЬ:
- получение настройки значений цвета со всеми существующими настройками (регулировка яркости имеет фиксированную насыщенность 80% и сохраняет предыдущую настройку оттенка; регулировка насыщенности и настройка оттенка имеют фиксированную яркость 80%)
- время перехода
- формы волны

## Известные проблемы
- значения вне диапазона вызывают сбой адаптера

## Changelog
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

Copyright (c) 2016-2022 foxthefox <foxthefox@wysiwis.net>