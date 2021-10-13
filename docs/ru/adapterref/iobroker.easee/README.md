---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.easee/README.md
title: ioBroker.easee
hash: hGjDWYqWQrWPgaQGtPV2tZMVZTYEgOLPjF6ljaLvbn8=
---
![Логотип](../../../en/adapterref/iobroker.easee/admin/easee.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.easee.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.easee.svg)
![Количество установок (последнее)](http://iobroker.live/badges/easee-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/easee-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.easee.svg)
![Известные уязвимости](https://snyk.io/test/github/Newan/ioBroker.easee/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.easee.png?downloads=true)

# IoBroker.easee
** Тесты: ** ![Тестирование и выпуск](https://github.com/Newan/ioBroker.easee/workflows/Test%20and%20Release/badge.svg)

## Простой адаптер для ioBroker
Адаптер для подключения Easee Wallbox

## Помощь
ChargerOpMode = Offline: 0, Disconnected: 1, AwaitingStart: 2, Charging: 3, Completed: 4, Error: 5, ReadyToCharge: 6

dynamicCircuitCurrentPX -> Все фазы должны быть установлены в пределах 500 мс (сценарий), иначе фаза будет установлена на 0.

## Пожертвование
[![] (https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L55UBQJKJEUJL)

## Changelog
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

Copyright (c) 2021 Newan <iobroker@newan.de>

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