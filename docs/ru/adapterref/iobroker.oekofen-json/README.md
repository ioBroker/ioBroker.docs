---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.oekofen-json/README.md
title: ioBroker.oekofen-json
hash: DhMxRMvL6WhO/HOntnwCO2LI4UaMihgYKmRnjeQjpFE=
---
![Логотип](../../../en/adapterref/iobroker.oekofen-json/admin/oekofen-json.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)
![Количество установок](https://iobroker.live/badges/oekofen-json-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/oekofen-json-stable.svg)
![Статус зависимости](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)
![НПМ](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)

# IoBroker.oekofen-json
**Тесты:** ![Тестируйте и выпускайте](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

## Адаптер oekofen-json для ioBroker
### Описание
Этот адаптер подключает обогреватель OekoFEN с новым сенсорным интерфейсом (также называемым [Пеллетроник Тач](https://www.oekofen.com/en-gb/pelletronic-touch/)) к ioBroker. Поскольку OekoFEN реализовал интерфейс JSON шаг за шагом и без общедоступной документации, он должен работать как минимум с версией 3.10d и новее.
Поскольку существует множество комбинаций нагревателей, солнечных модулей, слоёвых хранилищ, полноценных двигателей и т. д., этот адаптер пытается прочитать все доступные точки данных из интерфейса и создает объекты на лету при запуске.

Точки данных только для чтения создаются таким образом, что они начинаются с префикса L_ в их имени. Также адаптер преобразует масштаб числа в соответствии с информацией, предоставляемой интерфейсом (атрибут фактора). Например, нагреватель имеет дело с температурами в формате XXX и коэффициентом 0,1, которые будут преобразованы адаптером в XX.X при операциях чтения и обратно в XXX при операциях записи.

### Монтаж
После установки достаточно ввести

* ИП,
* TCP-порт,
* "так называемый" пароль
* и интервал

при котором адаптер пытается получить обновления.

Адаптер сохраняет подключенное состояние даже при отсутствии реального постоянного подключения. Если устройство отправляет сообщение об ошибке или адаптер не может связаться с контроллером OekoFEN, для состояния подключения устанавливается значение false. Например, это может произойти, если на контроллер поступает слишком много запросов, который отвечает HTTP 401. В нормальных условиях ограничение скорости контроллера не должно достигаться (2,5 секунды между запросами).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS** 
-->

### 1.0.1 (2023-01-21)
* (chaozmc) Fixed extensive object creation when using a wrong password (fixes Issue #18)
* (chaozmc) Added counter to stop adapter after 10 unsuccessful requests
* (chaozmc) Added check if there would be more than 50 top-level-objects to be created

### 1.0.0 (2023-01-15)
* (chaozmc) Push version to v1.0.0 as the code seems to be considerable as first stable release

### 0.3.0 (2023-01-15)
* (chaozmc) Changed Adapter Type to more suitable climate-control instead of communication
* (chaozmc) Altered query URL for inital scan to use single ?-symbol instead of double

### 0.2.5 (2022-11-18) 
* (chaozmc) Removed unnecessary const

### 0.2.4 (2022-10-31) 
* (chaozmc) changed loop behaviour to use a for...of loop instead of forEach to avoid parallel creation of too many objects at startup

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

## License
MIT License

Copyright (c) 2022 chaozmc <chaozmc@is-jo.org>

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