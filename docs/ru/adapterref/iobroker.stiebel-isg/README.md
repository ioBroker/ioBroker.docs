---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: 1ClhfUd7q9ds4+iWLWMIIZl2Kb6RRT7t1Bk67QM3dxc=
---
![Логотип](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![Количество установок (последнее)](https://iobroker.live/badges/stiebel-isg-installed.svg)
![Количество установок (стабильное)](https://iobroker.live/badges/stiebel-isg-stable.svg)
![Статус зависимости](https://img.shields.io/david/unltdnetworx/iobroker.stiebel-isg.svg)
![НПМ](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

# IoBroker.stiebel-isg
**Тесты:** ![Тестирование и выпуск](https://github.com/unltdnetworx/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## Адаптер stiebel-isg для ioBroker
Этот адаптер предназначен для считывания значений с интернет-шлюзов (ISG) stiebel-eltron/tecalor и управления устройством.

## Шаги
1. Установите адаптер.
2. Извлеките значения из вашего объекта stiebel-isg.[x].

## Требования
* интернет-шлюз stiebel-eltron/tecalor (ISG)

## Кредиты
Создание этого адаптера было бы невозможно без выдающейся работы Майкла Шустера (unltdnetworx) <https://github.com/unltdnetworx>, создавшего предыдущие версии этого адаптера.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0-alpha.1 (2025-10-21)

- (mcm1957) Adapter has been migrated to iobroker-communita-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.7.7

* security- and compatibility update

### 1.7.6

* fix error with controller v5

### 1.7.5

* security enhancements

### 1.7.4

* security enhancements

## License
MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

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