---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: 4M+4DmYgC0LkmJuO3Ww9VyzlR5ejQiG4vt43fl4hsVU=
---
![Логотип](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Количество установок](https://iobroker.live/badges/heizungssteuerung-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/heizungssteuerung-stable.svg)
![Статус зависимости](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![НПМ](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

# IoBroker.heizungssteuerung
**Тесты:** ![Тестируйте и выпускайте](https://github.com/jbeenenga/ioBroker.heizungssteuerung/workflows/Test%20and%20Release/badge.svg)

## Адаптер Heizungssteuerung для ioBroker
Этот адаптер можно использовать для управления системами отопления. Вы можете выбирать между режимами охлаждения и обогрева, а также активировать ускорение или паузу для одной комнаты. Кроме того, вы можете перезаписать целевую температуру для одной комнаты.

## Конфигурация
Чтобы использовать адаптер, вы должны добавить комнаты в перечисление комнат и добавить датчики и двигатели в комнаты.
Кроме того, вы должны добавить функции температуры, влажности и двигателя в правильные состояния. Перечисления будут созданы после первого запуска адаптера. Если у вас нет датчика влажности, вы можете оставить его пустым.

### Основные параметры
*режим обогрева:* вы можете выбрать между охлаждением и обогревом.

* Остановите охлаждение, если влажность выше: * Если влажность достигнута, охлаждение будет остановлено. Это работает только в том случае, если вы добавили датчик влажности в функцию и комнату.

* Интервал обновления в секундах: * Определите, как часто адаптер будет проверять температуру при установке двигателей.

*Температура по умолчанию:* Определите температуру, которую нужно установить, если для помещения не подходит ни один период.

*Время до окончания паузы в минутах:* Определите время до сброса состояния паузы в неактивное в минутах.

*Время до окончания бустинга в минутах:* Определите время до сброса состояния бустера в неактивное в минутах.

*Отклонение от заданной температуры до начала или остановки нагрева:* Определите разницу от заданной температуры до момента, когда адаптер начнет или прекратит нагрев. Например, если целевой температурой является 20°, эта настройка равна 0,5, и двигатель выключен, обогрев начнется, если температура ниже 19,5°, и остановится, если температура превысит 20,5°.

### Периоды
Вы можете определить периоды для каждой комнаты и времени. Кроме того, вы можете определить, следует ли использовать этот период для охлаждения или обогрева. Если режим нагрева не соответствует установленному режиму в основных настройках, период будет проигнорирован.

## Картинки
Основное изображение создано Freepick (https://www.flaticon.com/de/kostenloses-icon/heizung_1295221)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.5.2 (2022-10-05)
* (jbeenenga) fix for overwrite temperature

### 1.5.1 (2022-09-25)
* (jbeenenga) fix for overwrite temperature

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

### 1.4.6 (2022-09-12)
* (jbeenenga) small fix

### 1.4.5 (2022-09-10)
* (jbeenenga) correct type of temperatures to write into states

### 1.4.4 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.3 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.2 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.1 (2022-09-10)
* (jbeenenga) little logging fixes

### 1.4.0 (2022-09-10)
* (jbeenenga) add default temperature
* (jbeenenga) write current and target temperature into states

### 1.3.0 (2022-09-08)
* (jbeenenga) add possibility to define update intervall

### 1.2.4 (2022-09-08)
* (jbeenenga) small fixes

### 1.2.3 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.2 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.1 (2022-09-04)
* (jbeenenga) some logging issues

### 1.2.0 (2022-09-02)
* (jbeenenga) update dependencies

### 1.1.6 (2022-07-22)
* (jbeenenga) little fix

### 1.1.5 (2022-07-22)
* (jbeenenga) add some documentation
* (jbeenenga) remove connection state

### 1.1.4 (2022-07-22)
* (jbeenenga) little changes

### 1.1.3 (2022-07-22)
* (jbeenenga) changed admin dependency to minimum version 5.3.8

### 1.1.2 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.0 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.0 (2022-07-22)
* (jbeenenga) some changes

### 0.1.3 (2022-07-22)
* (jbeenenga) changed some dependency versions

### 0.1.2 (2022-07-22)
* (jbeenenga) add main logic

### 0.1.1 (2022-07-15)
* (jbeenenga) little changes

### 0.1.0 (2022-07-15)
* (jbeenenga) initial release

## License
MIT License

Copyright (c) 2022 jbeenenga <j.beenenga@gmail.com>

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