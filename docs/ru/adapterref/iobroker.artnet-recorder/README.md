---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.artnet-recorder/README.md
title: ioBroker.artnet-рекордер
hash: uqpn2PwrGT4aqZ2T/Sl0mi7zIRGu9XbQzyyNNeHUYrs=
---
![Логотип](../../../en/adapterref/iobroker.artnet-recorder/admin/artnet-recorder.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.artnet-recorder.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.artnet-recorder.svg)
![Количество установок (последние)](http://iobroker.live/badges/artnet-recorder-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/artnet-recorder-stable.svg)
![Статус зависимости](https://img.shields.io/david/Bannsaenger/iobroker.artnet-recorder.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.artnet-recorder/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.artnet-recorder.png?downloads=true)

# IoBroker.artnet-рекордер
## Адаптер artnet-recorder для ioBroker
Запись данных Art-Net в файл для последующего воспроизведения

## Цель
Простой адаптер для записи данных Art-Net, которые отправляются по трансляции в файл json, расположенный в пользовательских данных.
Запишите только изменение значений DMX.
Воспроизведение отправляет данные как есть с синхронизацией, хранящейся в файле json.
Когда режимом слияния является LTP или HTP, сервер прослушивает все пакеты ArtDMX, отправленные через сеть, и пытается получить фактический образ данных DMX для добавления сохраненных значений.
Интервал или шаг для отправки данных задается конфигурацией.

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) added engine and prepared for review

### 0.0.3
* (Bannsaenger) fixed comments from code review

## License
MIT License

Copyright (c) 2021-2022 Bannsaenger <bannsaenger@gmx.de>

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

Credit:
 [Art-Net™ Designed by and Copyright Artistic Licence Holdings Ltd](https://art-net.org.uk)