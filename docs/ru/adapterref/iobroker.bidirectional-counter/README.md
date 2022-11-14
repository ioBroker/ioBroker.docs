---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bidirectional-counter/README.md
title: ioBroker.bidirectional-счетчик
hash: VQRM1yPne/H+CEd1AsSojSOan53JJwXTJWyQGzsSyyU=
---
![Логотип](../../../en/adapterref/iobroker.bidirectional-counter/admin/bidirectional-counter.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.bidirectional-counter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bidirectional-counter.svg)
![Количество установок](https://iobroker.live/badges/bidirectional-counter-installed.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![НПМ](https://nodei.co/npm/iobroker.bidirectional-counter.png?downloads=true)

# IoBroker.bidirectional-counter
![Тестируйте и выпускайте](https://github.com/BenAhrdt/ioBroker.bidirectional-counter/workflows/Test%20and%20Release/badge.svg)

## Адаптер двунаправленного счетчика для ioBroker
Счетчик раздельного потребления (положительные изменения) и поставки (отрицательные изменения)

С помощью этого счетчика вы можете выбрать каждое состояние типа номера в пользовательской конфигурации.
Адаптер создаст 3 внутренних состояния. (рассчитано, доставлено и всего).
потребляемый будет назначен, если будет обнаружено положительное изменение состояния подписки.
доставлено будет назначено, если будет обнаружено отрицательное изменение состояния подписки.
Всего будет назначено в каждом случае.

например этот адаптер полезен для эмуляции счетчика энергии с заданным значением энергии от стороннего устройства.
например, shelly установит энергию канала обратно в ноль в случае перезапуска.
Адаптер игнорирует ноль, а значение счетчика сохраняется для использования в других адаптерах/скриптах.
Состояние счетчика увеличится по сравнению с сохраненным значением, когда состояние энергии оболочки увеличится в следующий раз.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 2.0.8 (2022-06-17) - Readme updated
* (BenAhrdt) readme updated with paypal link

### 2.0.7 (2022-06-16) - loglevel query deleted
* (BenAhrdt) dont check loglevel before log.debug()

### 2.0.6 (2022-06-13) - adapter type changed
* (BenAhrdt) change adapter type into misc-data

### 2.0.5 (2022-06-08) - rewrite additional state with ack true
* (BenAhrdt) write ack = true in case of additional state is subscribed

### 2.0.4 (2022-06-08) - do not unsubscribe
* (BenAhrdt) unsubscribe fixed

### 2.0.3 (2022-06-06)
* (BenAhrdt) readme fixed

### 2.0.2 (2022-06-04)
* (BenAhrdt) fixed a comment Bug

### 2.0.1 (2022-06-04)
* (BenAhrdt) first try to release and push with Token

### 2.0.0 (2022-06-03)
* (BenAhrdt) release script implemented

### 1.14.9
* (BenAhrdt) fixed some changes in readme

### 1.13.8
* (BenAhrdt) fixed changes for official version
  use seState to write internal adapter states

### 1.8.7
* (BenAhrdt) edit changelog

### 1.8.6
* (BenAhrdt) first official version

## License
MIT License

Copyright (c) 2022 BenAhrdt <bsahrdt@gmail.com>

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