---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: k2uPTrT/wv20Rf+hQLaJ9n+2BuYsWaxt/yQ3pLPPFBA=
---
![Логотип](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Количество установок](http://iobroker.live/badges/lifx-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lifx.svg)
![Тестирование и выпуск](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

# ioBroker.lifx

Адаптер Lifx для ioBroker

## Настройки/Конфигурация:

- Никаких настроек или конфигурации не требуется, адаптер автоматически определяет лампы.

### Недоступен виджет метро

- Небольшая иконка, указывающая на недоступный статус в Metro-виджете, является первым объектом уведомления.
- object\_id\[0] — это индикатор недоступности.
- Вместо значения "true" следует писать "false".
- Значок должен быть wifiColorRed.png.
- Смещение по горизонтали на 6 должно работать нормально.

## Визуализация:

- используйте виджеты Lifx

## объекты

| Объект                                       | Ценить     | настраиваемый | Описание                           |
| -------------------------------------------- | ---------- | :-----------: | ---------------------------------- |
| Bulb.state                                   | логический |       х       | true/false -> ВКЛ/ВЫКЛ             |
| Bulb.colormode                               | логический |       х       | цвет, белый                        |
| Bulb.temp                                    | ценить     |       х       | цветовая температура 2500...9000 К |
| Bulb.hue                                     | ценить     |       х       | цвет 0...360                       |
| Bulb.sat                                     | ценить     |       х       | насыщенность 0…100 %               |
| Лампочка.яркая                               | ценить     |       х       | яркость 0...100 %                  |
| Bulb.online                                  | логический |       -       | истина/ложь                        |
| Bulb.label                                   | ценить     |       -       | имя/метка                          |
| Bulb.vendor                                  | ценить     |       -       | информация о поставщике            |
| Лампочка.продукт                             | ценить     |       -       | информация о продукте              |
| Bulb.colorLamp                               | ценить     |       -       | информация о цветных лампах        |
| Лампа инфракрасная                           | ценить     |       -       | информация об инфракрасной лампе   |
| Лампа многозонная                            | ценить     |       -       | информация о многозонной лампе     |
| Bulb.Zone.temp                               | ценить     |       х       | цветовая температура 2500...9000 К |
| Цветовая зона.Оттенок.Лампочка.Зона.Оттенок. | ценить     |       х       | цвет 0...360                       |
| Bulb.Zone.sat                                | ценить     |       х       | насыщенность 0…100 %               |
| Bulb.Zone.bright                             | ценить     |       х       | яркость 0...100 %                  |

## TODO:

- Настройка цветовых значений со всеми существующими параметрами (регулировка яркости имеет фиксированную насыщенность 80% и сохраняет предыдущую настройку оттенка; регулировка насыщенности и регулировка оттенка имеют фиксированную яркость 80%).
- переходные периоды
- волновые формы

## известные проблемы

- Значения, выходящие за пределы допустимого диапазона, приводят к сбою адаптера.

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.0.0 [BREAKING]

- update lifx-lan-client 2.1.2
- state roles (colorLamp, infraredLamp, multizoneLampe) are no longer string, corrected to boolean (delete those states when adapter is stopped and restart adapter)
- hue and saturation states in warm white lamp, since the states are transmitted and causing warnings

### 1.0.10

- update dependencies
- update to comply with repo checker

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

[Older changelogs can be found there](https://github.com/foxthefox/ioBroker.lifx/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2016-2026 foxthefox <foxthefox@wysiwis.net>