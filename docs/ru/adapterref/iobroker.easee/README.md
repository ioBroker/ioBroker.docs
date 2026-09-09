---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.easee/README.md
title: ioBroker.easee
hash: JY2vjvmNhTK44/1/hWJmmaDLOqN83oM0KpA++OUuCNc=
---
![Логотип](../../../en/adapterref/iobroker.easee/admin/easee.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.easee.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.easee.svg)
![Количество установок (последние)](http://iobroker.live/badges/easee-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/easee-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.easee.svg)
![Известные уязвимости](https://snyk.io/test/github/Newan/ioBroker.easee/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.easee.png?downloads=true)
![Тестирование и выпуск](https://github.com/Newan/ioBroker.easee/workflows/Test%20and%20Release/badge.svg)

# ioBroker.easee

## Адаптер easee для ioBroker

Адаптер для подключения Easee Wallbox

## Помощь

chargerOpMode = Offline: 0, Disconnected: 1, AwaitingStart: 2, Charging: 3, Completed: 4, Error: 5, ReadyToCharge: 6

dynamicCircuitCurrentPX -> Все фазы должны быть установлены в течение 500 мс (с помощью скрипта), в противном случае фаза будет установлена на 0.

## Пожертвование

[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=L55UBQJKJEUJL)

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.0.10 (2023-07-27)
* (Newan) fix version number

### 1.0.9 (2023-07-27)
* (walburgf)  changed API URL from api.easee.cloud to api.easee.com
* (walburgf)  created addition parameter in admin config to reduce/steer logging information for user
* (walburgf)  modified internationalization to use jsonConfig.json. this needs at least ioBroker.admin version 5
* (walburgf)  added dependency to admin >=v5.1.28

### 1.0.8 (2023-07-02)
* (Newan)  small fixes

### 1.0.7
* (Newan) Changed login URL

### 1.0.6
* (Newan) Changed that smart charging is editable

### 1.0.5
* (marwin79) More Features supported and convert values to expected datatypes

### 1.0.4
* (Newan) dynamicCircuitCurrentPX writeable (set all Phases in 500ms) to limit ampere

### 1.0.3
* (Newan) Adapter crash fixed an other bugfixes

### 1.0.1
* (Newan) Add circuitMaxCurrentPX to limit current ampere

### 1.0.0
* (Newan) Stable Version with SignalR

## License
MIT License

Copyright (c) 2025 Newan <iobroker@newan.de>

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