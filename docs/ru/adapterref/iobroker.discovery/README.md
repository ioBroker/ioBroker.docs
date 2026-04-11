---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: D/72x86GmJCeDJxyqlcj3Bp2mAh8a6fxHgt7E6LOgpM=
---
![Логотип](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Количество установок](http://iobroker.live/badges/discovery-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker Discover Adapter
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **Обнаружение устройств всеми известными методами.**

Это специальный адаптер, который пытается найти все возможные устройства, доступные с хоста iobroker.
В настоящее время он может обнаруживать устройства через ping и UPnP (планируется поддержка последовательного порта).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Фактически поддерживается
### Автоматически обнаружено
- Air-Q
- Beckhoff PLC
- Bosch Smart Home
- Bose Soundtouch
- Broadlink
- BSBLan
- Chromecast
- Система климат-контроля Daikin
- деКонц
- Denon /Marantz
- DoorBird
- e3dc-rscp
- ebus
- ekey
- EnergyManager (E.ON/Solarwatt)
- enet (Юнг)
- Epson Stylus PX830
- Факероку (гармония)
- ФХЕМ
- FireTV
- Фрицдекс
- Фрониус
- Frontier_silicon
- Вилки G-Homa
- Гармония
- Хеос
- Домашний помощник
- Homematic CCU (hm-rpc, hm-rega)
- Инверторы Hoymiles HMS (hoymiles)
- Домашний пилот
- HP-lio
- Philips HUE
- Плекс
- InfluxDB
- KLF-200
- KNX (фактически отключен)
- Keba KeContact P30
- Коди
- Ламетрический
- Лэндроид
- LGTV
- Lightify
- Локсон
- Лупусек
- Куб MAX!
- МакЛайтинг
- МегаД
- Miele
- Облачный сервис Miele
- Mi Home Smarthome
- Микротик
- Мост MiLight (v6)
- Мпд
- Музыкальный подкаст
- myDlink
- Датчики Mysensors USB/Serial (9600, 38400, 57600, 115200)
- myvbus
- Световые панели / Холст Nanoleaf
- Инструменты Net
- Нуки2
- Орех
- Onkyo
- OpenHAB
- OpenKNX
- Пинг
- Плекс
- Проксмокс
- RFLink (последовательный порт 57600 бод)
- SamsungTV
- Сма-ем
- Смаппи
- Solarlog
- Зоннен
- Sonos
- Stiebel-Eltron/Tecalor ISG (плюс)
- SQL (MySQL, MSSQL, PostgreSQL)
- SqueezeboxRPC
- Синология
- TR-064
- Традфри
- UPnP
- ValloxMV
- Wifilight
- WLED
- Yamaha
- Свет
- Z-wave USB (протестировано в лаборатории Aeon)

### Предлагается в качестве дополнительных адаптеров
- Облако
- История (если не найдены базы данных SQL или InfluxDB)
- Интернет вещей
- iControl
- eCharts (предлагается при наличии адаптера истории)
- JavaScript
- Информация
- Виз
- Веб

## Если адаптер не может найти IP-адреса...
Адаптер отправляет ping-запросы в сеть по IP-адресу текущего хоста (x.y.z.1..255). Кроме того, для обнаружения IP-адресов используются UPnP и mDNS.
Если не все IP-адреса найдены, проверьте, может ли пользователь iobroker выполнить `/bin/ping`.
Вы можете выполнить `sudo setcap cap_net_raw+p /bin/ping` для добавления недостающих возможностей/разрешений.

## Todo
- artnet? (Bluefox)
- B-Control-Em? (Bluefox)
- cul / maxcul (Синяя лиса)
- Foobar200 (Установщик)
- fritzbox (ruhr70)
- км200 (откровенная шутка)
- megaesp (ausHaus)
- modbus (Bluefox)
- mqtt/mqtt-client (Bluefox)
- owfs (Синяя лиса)
- rpi2 (если ioBroker работает на Raspberry Pi)
- rwe-smarthome (PArns)
- s7 (Bluefox)
- умный счетчик (Apollon77)
- unifi (jens-maus)
- волк (улыбающийся Джек)
- xs1 (откровенная шутка)

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### **WORK IN PROGRESS**
* (iobroker-bot) Adapter requires node.js >= 20 now.
* (UncleSamSwiss) Remove obsolete squeezebox adapter
* (GermanBluefox) Packages were updated

### 5.0.0 (2024-07-21)
* (bluefox) Packages updated
* (bluefox) Minimum node.js version is 18.x
* (bluefox) Updated licenses for knx and jarvis

### 4.5.0 (2024-04-21)
* (pr0crstntr) Added Air-Q

### 4.4.0 (2024-02-23)
* (klein0r) Added WLED
* (klein0r) Added LaMetric
* (Jey-Cee) Removed net-tools from proposals

### 4.3.0 (2024-02-21)
* (bluefox) Replaced vis with vis-2

### 4.2.0 (2023-10-09)
* (pdbjjens) Changed detection of myvbus and resol

## License

The MIT License (MIT)

Copyright (c) 2017-2026, Denis Haev ak Bluefox <dogafox@gmail.com>

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