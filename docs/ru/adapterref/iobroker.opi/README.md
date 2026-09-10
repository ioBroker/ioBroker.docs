---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.opi/README.md
title: ioBroker.opi
hash: 20H1YxuPCoPr0f50uo1jvF9DpesVvDMfstbMAVqmq6E=
---
![Логотип](../../../en/adapterref/iobroker.opi/admin/opi.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.opi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.opi.svg)
![НПМ](https://nodei.co/npm/iobroker.opi.png?downloads=true)

# ioBroker.opi

Реализация OPI-Monitor для интеграции в ioBroker.

### Важная информация

Протестированное оборудование: OrangePi plus2 H3

### После выбора становятся доступны следующие объекты:

## _Процессор_

- частота процессора
- загрузка1
- загрузка5
- загрузка15

## _Память_

- доступная память
- свободная память
- memory\_total

## _Сеть (eth0)_

- net\_received
- net\_send

## _eMMC_

- emmc\_root\_total
- emmc\_root\_used

## _Менять_

- swap\_total
- swap\_used

## _Температура_

- soc\_temp

## _Время безотказной работы_

- время безотказной работы

## _Беспроводная сеть_

- wifi\_received
- wifi\_send

### Конфигурация

На странице настроек вы можете выбрать следующие модули:

- Процессор
- Память
- Сеть
- eMMC
- Менять
- Температура
- Время безотказной работы
- Беспроводная сеть

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 0.1.2 (2021-11-06)
* (foxriver76) we no longer use deprecated adapter.objects

### 0.1.1 (2018-01-27)
- update index_m.html.
- update index.html.
- update codes.

### 0.1.0 (2018-01-24)
- Admin3 support.

### 0.0.6 (2017-08-01)
- stable release.

### 0.0.2 (2017-06-01)
- Initial release. Beta Version.

## License
Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Modified for OrangePi by Johnny Schneider <johann.schneider1@googlemail.com>
Copyright (c) 2015-2016 husky-koglhof <husky.koglhof@icloud.com>

MIT License

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