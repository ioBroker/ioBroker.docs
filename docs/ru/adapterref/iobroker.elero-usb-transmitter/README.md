---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-передатчик
hash: TMXUiZdhXhEbVGe/VhbTs/SHmHhG1hvkmaFZ/F0CMVE=
---
# IoBroker.elero-usb-передатчик
![Логотип](../../../en/adapterref/iobroker.elero-usb-transmitter/admin/elero-usb-transmitter.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)
![Количество установок (последние)](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)

## Адаптер elero-usb-transmitter для ioBroker
Адаптер для управления устройствами Elero с USB-передатчиком Elero.
Вам понадобится USB-передатчик, и вы должны подключить к нему существующие двигатели рольставен. Адаптер автоматически определяет активные каналы и добавляет устройства. В настройках можно задать названия устройств и интервал обновления

## **РАБОТА В ПРОЦЕССЕ**
### 0.5.2
- Добавлен недостающий перевод для названия и описания.

### 0.5.1
- Добавлен перевод

### 0.5.0
- Добавлены переводы
- Игнорировать изменения состояния с ack=true в обработчике onStateChanged
- удален обработчик сообщений
- удален пакет node-scheduler

### 0.4.0
- Добавлен канал для информации о подключении.

### 0.3.0
- Используйте только открытое состояние для управления устройствами.

### 0.1.0
- Время передачи удалено и код очищен.

### 0,0,3 дюйма
- Добавлены сообщения журнала.

### 0.0.2
- исправление ошибок

### 0.0.1
- Начальная версия

## Changelog

## License

MIT License

Copyright (c) 2022 marc <marc@lammers.dev>

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