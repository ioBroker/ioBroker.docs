---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wiobrowser/README.md
title: ioBroker.wiobrowser
hash: QEjcKZX7N0B7az8svF+U13+hxDTAFxmAD7A/NeDh+xI=
---
![Логотип](../../../en/adapterref/iobroker.wiobrowser/admin/wiobrowser.png)

![Количество установок](http://iobroker.live/badges/wiobrowser-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.wiobrowser.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wiobrowser.svg)
![НПМ](https://nodei.co/npm/iobroker.wiobrowser.png?downloads=true)

# IoBroker.wiobrowser
## Информация
управление полноэкранным браузером Windows Адаптер для ioBroker

Этот адаптер подключается к wioBrowser через tcp.socket для управления им. Существует 3 разных приложения wioBrowser: + wioBrowser WebView2 Framework + wio Browser Chromium Framework + wioNoweb (те же функции без Интернета)

wioBrowser — это полноэкранный браузер Windows, которым можно управлять через ioBroker, он отображает отдельные веб-сайты или слайд-шоу веб-сайтов, которые можно настроить в адаптере. На адаптер также передается информация: + загрузка процессора + свободная память + текущий разряд батареи на планшете или ноутбуке + имя хоста + IP

Он также может управлять: + включение/выключение экрана + выход из приложения + громкость +/- + включение/выключение звука + яркость +/- + запуск программ с помощью переключателей, например. C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100 + текстовые сообщения + голосовые сообщения

*** Адаптер Dieser включает в себя tcp.socket mit dem wioBrowser, um ihn zu steuern. Есть 3 несовместимых приложения wioBrowser: + wioBrowser WebView2 Framework + wioBrowser Chromium Framework + wioNoweb (Gleiche Funktionen ohne Web)

wioBrowser является полноэкранным браузером Windows, который используется в ioBroker, когда вы используете последний веб-сайт и один из веб-сайтов Слайд-шоу с помощью адаптера. Es werden auch Infos and den Adapter übertragen: + CPU Last + freier Speicher + aktuelle Batterieentladung bei Tablet oder Notebook + Hostname + IP

Er kann auch steuern: + Bildschirm an/aus + App beden + Lautstärke +/- + Stumm an/aus + Helligkeit +/- + Program mit Schaltern ausführen z.B C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100 + Text Nachrichten + Sprach Nachrichten

## Ссылка на сайт
* [Тема адаптера форума ioBroker] (https://forum.iobroker.net/topic/50982/neuer-adapter-wiobrowser-f%C3%BCr-windows)
* [Учебник по сообщениям](https://forum.iobroker.net/topic/51534/tutorial-wiobrowser-windows-desktop-popup-messages) от пользователя hydrotec

## Changelog
### 1.1.2
* (bettman66) translate

### 1.1.1
* (bettman66) update readme

### 1.1.0
* (bettman66) window transparency

### 1.0.0
* (bettman66) stable

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