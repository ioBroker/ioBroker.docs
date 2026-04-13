---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.brunner-eas3/README.md
title: ioBroker.brunner-eas3
hash: c/OP6XPydI74q7mpQKoD0wzg885HvMTnM6y1yFd+vMA=
---
![Логотип](../../../en/adapterref/iobroker.brunner-eas3/admin/brunner-eas3.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.brunner-eas3.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.brunner-eas3.svg)
![Количество установок](https://iobroker.live/badges/brunner-eas3-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/brunner-eas3-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.brunner-eas3.png?downloads=true)

# IoBroker.brunner-eas3
**Тесты:** ![Тестирование и выпуск](https://github.com/JR-Home/ioBroker.brunner-eas3/workflows/Test%20and%20Release/badge.svg)

## Адаптер brunner-eas3 для ioBroker
Адаптер для чтения данных из системы управления процессом сгорания Brunner EAS 3. Данные передаются посредством широковещательных сообщений WLAN.

Если связь с EAS 3 обрывается, температура сгорания устанавливается на -99.

Горящие состояния:

* -1 - статус недоступен, соединение потеряно
* 0 - дверь открыта
* 1 - разжигание огня
* 2 - шаг огня 2
* 5 - конец огня
* 6 - Ошибка/Тайм-аут, возгорание не обнаружено
* 7 - огонь потушен.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Этот адаптер НЕ является официальным продуктом компании Urlich Brunner GmbH. Он был разработан и поддерживается членами сообщества разработчиков открытого программного обеспечения.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.1 (2026-03-26)
* (JR-HOME) release - updating roles of IOBroker objects, corrected add more wood status

### 1.0.7 (2026-03-06)
* (JR-HOME) release - correction for publishing adapter on IOBroker dev portal

### 1.0.6 (2026-03-01)
* (JR-HOME) release

## License
MIT License

Copyright (c) 2026 JR-Home 

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