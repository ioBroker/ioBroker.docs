---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.winsipbrowser/README.md
title: ioBroker.winsipbrowser
hash: JhCF2oBEXZ6EkgZLT8QpMSgHqKfgWIvb8v1C2fjyMhc=
---
![Логотип](../../../en/adapterref/iobroker.winsipbrowser/admin/winsipbrowser.png)

![Количество установок](http://iobroker.live/badges/winsipbrowser-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.winsipbrowser.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.winsipbrowser.svg)
![НПМ](https://nodei.co/npm/iobroker.winsipbrowser.png?downloads=true)

# IoBroker.winsipbrowser
## Информация
управление полноэкранным браузером Windows с помощью sipclient

Адаптер для ioBroker

Этот адаптер подключается к winsipbrowser через tcp.socket для управления им.

winsipbrowser — это полноэкранный браузер Windows с sipclient, которым можно управлять через ioBroker, он отображает отдельные веб-сайты или слайд-шоу веб-сайтов, которые можно настроить в адаптере. На адаптер также передается информация: + загрузка процессора + свободная память + текущий разряд батареи на планшете или ноутбуке + имя хоста + IP

Он также может управлять: + включение/выключение экрана + выход из приложения + громкость +/- + включение/выключение звука + яркость +/- + запуск программ с помощью переключателей, например. C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100 + текстовые сообщения + голосовые сообщения + воспроизведение аудиофайлов

## Связь
* [Тема адаптера форума ioBroker] (https://forum.iobroker.net/topic/53162/neuer-adapter-winsipbrowser-f%C3%BCr-windows)
* [Тема программы форума ioBroker] (https://forum.iobroker.net/topic/53032/sprechanlagen-innenstation-browser-mit-sip-client?_=1646732403727)

## Changelog
### 0.1.4
* (bettman66) change objects

### 0.1.2
* (bettman66) play musicfile

### 0.1.1
* (bettman66) stop slideshow by touchevent

### 0.1.0
* (bettman66) tcpclient2tcpserver

### 0.0.5
* (bettman66) add messages

### 0.0.4
* (bettman66) add siphungup

### 0.0.3
* (bettman66) add sipring

### 0.0.2
* (bettman66) add sipcall

### 0.0.1
* (bettman66) first commit

## License
The MIT License (MIT)

Copyright (c) 2022 Walter Zengel <w.zengel@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.