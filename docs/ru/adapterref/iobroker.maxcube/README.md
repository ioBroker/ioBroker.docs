---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.maxcube/README.md
title: ioBroker.maxcube
hash: MpkrEy9ZuJa1izqwLyLwRZ+vzSRMcw2ofpiX+aml4wU=
---
![Логотип](../../../en/adapterref/iobroker.maxcube/admin/maxcube.png)

![Количество установок](http://iobroker.live/badges/maxcube-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.maxcube.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.maxcube.svg)

# IoBroker.maxcube
==================================

![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.maxcube/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/maxcube/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Адаптер ioBroker для управления Max! через куб

## Поддерживаемые устройства
- термостат
- Датчик двери / окна
- Нажимная кнопка (только состояние батареи)

## Применение
Перед использованием необходимо сначала подключить все устройства к MAX! Куб через MAX! Прошивка.

## Changelog

### 1.0.4 (2021-07-15)
* (thost96/Apollon77) optimize for js-controller 3.3

### 1.0.3 (2021-04-10)
* (thost96) fixed state has no existing object for info.serial_number

### 1.0.3 (2021-04-11)
* (thost96) Prevent js-controller 3.2 warnings

### 1.0.2 (2020-07-28)
* (Apollon77) Update dependencies
* (Apollon77) make compatible with js-controller 3

### 1.0.1 (2018-07-06)
* (stabilostick) initialization of working state
* (stabilostick) setpoint rounding to 0.5
* (stabilostick) upstream only changed states
* (stabilostick) stabilize state display for setpoint and mode values

### 1.0.0 (2018-05-24)
* (bluefox) refactoring
* (bluefox) added admin3

### 0.1.2 (2017-06-11)
* (paul53) Try to read wall thermostat

### 0.1.1 (2017-06-07)
* (bluefox) use local maxcube lib

### 0.1.0 (2017-06-05)
* (bluefox) intial commit

## License

MIT Copyright (c) 2017-2021 bluefox