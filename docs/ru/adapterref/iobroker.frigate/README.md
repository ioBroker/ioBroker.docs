---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: j0s/xrvbFuZGzEpPCJYqWJqQjZ/SuuGz8QlwiqbVc3s=
---
![Логотип](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.frigate.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![Количество установок](https://iobroker.live/badges/frigate-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/frigate-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.фрегат
## Фрегат адаптер для ioBroker
Frigate — это сетевой видеорегистратор с открытым исходным кодом, основанный на обнаружении объектов ИИ в реальном времени.
Этот адаптер анализирует MQTT-сообщения Frigate и создает из них объекты данных.

## Инструкции
MQTT должен быть активирован во Frigate и интегрирован в ioBroker.
Точка данных MQTT (обычно «mqtt.0.frigate»), URL-адрес фрегата и количество веб-адресов вводятся в настройках адаптера.

_Автоматически созданные объекты:_

- объекты для настроек в Frigate
- события движения для каждой камеры
- URL последнего снимка/клипа камеры в кольцевом буфере

Эти объекты могут быть дополнительно обработаны в ioBroker, например. в Висе.

## Связь
- [Тема адаптера форума ioBroker] (https://forum.iobroker.net/topic/64928/test-frigate-adapter-v0-0-1-alpha)
- [Видеопроект «Фрегат»](https://frigate.video)

## Changelog

### 0.2.6

-   (bettman66) add camid

### 0.2.5

-   (bettman66) fix https

### 0.2.4

-   (bettman66) add v0.2.4 to npm

### 0.2.3

-   (bettman66) merge pull request

### 0.2.2

-   (bettman66) settings translate

### 0.2.1

-   (bettman66) add version

### 0.2.0

-   (bettman66) add uptime and more

### 0.1.9

-   (bettman66) add online

### 0.1.8

-   (bettman66) add storage info

### 0.1.7

-   (bettman66) add switch

### 0.1.6

-   (bettman66) Number of web url

### 0.1.5

-   (bettman66) new npm package

### 0.1.4

-   (bettman66) update readme

### 0.1.3

-   (bettman66) bug web objects

### 0.1.2

-   (bettman66) ready to test

### 0.1.1

-   (bettman66) translate

### 0.1.0

-   (bettman66) objects add

## License

MIT License

Copyright (c) 2023 Bettman66 <w.zengel@gmx.de>

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