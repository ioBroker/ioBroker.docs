---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.artnet-recorder/README.md
title: ioBroker.artnet-рекордер
hash: m8OLdXb7kjlJO34QT/IXo//ie7Bd4Uu8jUukaY3Vt4M=
---
![Логотип](../../../en/adapterref/iobroker.artnet-recorder/admin/artnet-recorder.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.artnet-recorder.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.artnet-recorder.svg)
![Количество установок (последних)](http://iobroker.live/badges/artnet-recorder-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/artnet-recorder-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.artnet-recorder/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.artnet-recorder.png?downloads=true)

# IoBroker.artnet-рекордер
![Тестирование и выпуск](https://github.com/bannsaenger/iobroker.artnet-recorder/workflows/Test%20and%20Release/badge.svg)

## Адаптер artnet-recorder для ioBroker
Запишите данные Art-Net в файл для последующего воспроизведения.

## Цель
Простой адаптер для записи данных Art-Net, которые передаются по трансляции в json-файл, расположенный в пользовательских данных.
Записывайте только изменения значений DMX.
Воспроизведение отправляет данные в неизменном виде с указанием времени, хранящегося в файле JSON.
Когда режим слияния LTP или HTP, сервер прослушивает все пакеты ArtDMX, отправляемые через сеть, и пытается получить фактическое изображение данных DMX для добавления сохраненных значений.
Интервал или шаг отправки данных задается конфигурацией.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.5 (2023-12-25)
* (Bannsaenger) added releaseconfig

### 0.0.4 (2023-12-21)
* (Bannsaenger) updated dependencies
* (Bannsaenger) switched to release script
* (Bannsaenger) switched to json-config

### 0.0.3
* (Bannsaenger) fixed comments from code review

### 0.0.2
* (Bannsaenger) added engine and prepared for review

### 0.0.1
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2021-2023 Bannsaenger <bannsaenger@gmx.de>

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
