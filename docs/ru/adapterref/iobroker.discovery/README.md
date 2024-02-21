---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/README.md
title: Адаптер ioBroker Discover
hash: 413E7lBQoylWDXshoHsaA+/vCUJOeQqEbZrNIM0psFQ=
---
![Логотип](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Количество установок](http://iobroker.live/badges/discovery-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# Адаптер обнаружения ioBroker
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **Обнаружение устройств всеми известными методами.**

Это специальный адаптер, который пытается найти все возможные устройства, доступные с хоста iobroker.
Просто сейчас умеет определять через пинг, UPnP (серийный планируется).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Действительно поддерживается
### Обнаружено автоматически
- Бекхофф ПЛС
- Умный дом Бош
- Бозе Саундтач
- Бродлинк
- БСБЛан
- Хромкаст
— Климат-контроль Дайкин.
- деКонц
- Денон/Маранц
- Дверная Птица
- e3dc-rscp
- эбус
- экей
- энергоменеджер (E.ON/Solarwatt)
- энэт (Юнг)
- Эпсон Стилус PX830
- Факероку (гармония)
- ФЕМ
- ФаерТВ
- Фрицдект
- Фрониус
- Frontier_silicon
- Заглушки G-Homa
- Гармония
- Хеос
- Домашний помощник
- Homematic CCU (hm-rpc, hm-rega)
- Домашний пилот
- ХП-лио
- Филипс ХЮЭ
- Плекс
- ИнфлюксБД
- КЛФ-200
- KNX (фактически отключен)
- Кеба КеКонтакт P30
- Коди
- Ландроид
- ЛГТВ
- Осветлить
- Локсон
- Лупусек
- МАКС! Куб
- Маклайтинг
- МегаД
- Миле
- Облачный сервис Miele
- Умный дом Mi Home
- Микротик
- Мост МиЛайт (v6)
- МПД
- Музыкальная трансляция
- мойДлинк
- Mysensors USB/Serial (9600, 38400, 57600, 115200)
- мойвбус
- Световые панели nanoleaf/холст
- Чистые инструменты
- Нуки2
- Орех
- Онкё
- ОпенХАБ
- OpenKNX
- Пинг
- Плекс
- Проксмокс
- RFLink (последовательный порт 57600 бод)
- СамсунгТВ
- Сма-эм
- Смаппи
- Соларлог
- Соннен
- Сонос
- Stiebel-Eltron/Tecalor ISG (плюс)
- SQL (MySQL, MSSQL, PostgreSQL)
- Сжимающая коробка
- СквизбоксРПК
- Синология
- ТР-064
- Традфри
- УПнП
- ВаллоксМВ
- Wi-Filight
- Ямаха
- Йилайт
- Z-wave USB (протестировано в Aeon Labs)

### Предлагается в качестве дополнительных адаптеров
- Облако
- История (если не найден SQL или InfluxDB)
- Интернет вещей
- iControl
- электронные диаграммы (предлагаются при наличии адаптера истории)
- JavaScript
- Информация
- Вис
- Интернет

## Если адаптер не может найти IP-адреса...
Адаптер пингует сеть по IP текущего хоста (x.y.z.1..255). Кроме того, для обнаружения IP-адресов используются UPnP и mDNS.
Если не все IP-адреса найдены, убедитесь, что пользователь iobroker может выполнить `/bin/ping`.
Вы можете выполнить `sudo setcap cap_net_raw+p /bin/ping`, чтобы добавить недостающие возможности/разрешения.

## Делать
- артнет? (Блюфокс)
- Би-Контроль-Эм? (Блюфокс)
- cul/maxcul (Bluefox)
- Foobar200 (Инсталлятор)
- фрицбокс (70 руб.)
- км200 (шутка)
- мегаэсп (ausHaus)
- Modbus (Bluefox)
- mqtt/mqtt-клиент (Bluefox)
- owfs (Bluefox)
- rpi2 (если ioBroker работает на Raspberry)
- rwe-умный дом (PArns)
- s7 (Блюфокс)
- смартметр (Аполлон77)
- унифи (jens-maus)
- волк (улыбающийся валет)
- xs1 (откровенная шутка)

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 4.3.0 (2024-02-21)
* (bluefox) Replaced vis with vis-2

### 4.2.0 (2023-10-09)
* (pdbjjens) Changed detection of myvbus and resol

### 4.1.0 (2023-09-25)
* (pdbjjens) Added detection of myvbus and resol

### 4.0.0 (2023-09-04)
* (pdbjjens) Added: frontier_silicon, sma-em, and speedwire
* (bluefox) Dropped node14 support, refactoring

### 3.2.0 (2023-06-15)
* (sbormann) Added iControl to the suggested adapters

### 3.1.0 (2022-10-10)
* (bluefox) Corrected syntax error in the german translation

### 3.0.6 (2022-10-09)
* (Apollon77) Prepare for future js-controller versions
* (Apollon77) Prevent crash cases

### 3.0.5 (2022-06-16)
* (Apollon77) Fix potential crash cases reported by Sentry

### 3.0.4 (2022-06-09)
* (bluefox) Disable configuration settings for this adapter

### 3.0.3 (2022-04-01)
* (Apollon77) Fix crash cases reported by Sentry

### 3.0.2 (2022-03-21)
* (bluefox) Updated `serialport` package

### 2.8.0 (2022-02-20)
* (boellner) added `openknx`
* (git-kick) added `e3dc-rscp`

### 2.7.5 (2021-11-09)
* (Apollon77) Fix `kecontact` detection (Sentry IOBROKER-DISCOVERY-3P)

### 2.7.4 (2021-11-09)
* (bluefox) Replaced `flot` with `eCharts`
* (bluefox) info Adapter removed

### 2.7.3 (2021-10-05)
* (Sneak-L8) updated `kecontact` detection

### 2.7.2 (2021-08-31)
* (Sneak-L8) support `KeBa KeContact P30`

### 2.7.0 (2021-07-01)
* (hacki11) Added discovery for `BSBLan` and `ValloxMV`
* (Apollon77) Optimize for js-controller 3.3

### 2.6.3 (2021-05-03)
* (bluefox) Added support of Admin5

### 2.6.2 (2021-04-13)
* (Apollon77) Fixed the crash case in mihome discovery (Sentry IOBROKER-DISCOVERY-30)
* (Apollon77) Fixed the crash case in ping logic (Sentry IOBROKER-DISCOVERY-2Y)
* (Apollon77) Fixed the crash case in hf-lpb100 logic (Sentry IOBROKER-DISCOVERY-34)

### 2.6.1 (2021-02-28)
* (JeyCee) added iot and net-tools
* (Apollon77) Adjust and optimize UDP and UPnP discoveries
* (Apollon77) Added an option to specify the "own IP address" and netmask to also allow discovery for e.g. docker cases where an external network should be scanned
* (Apollon77) Fix ping progress counter when scanning multiple ip ranges
* (JeyCee) removed mobile
* (Apollon77) fix sonos and synology
* (JeyCee) UI adjustments
* (Apollon77) Fix crash cases (Sentry IOBROKER-DISCOVERY-2Q)

### 2.5.0 (2021-01-11)
* (Zefau) Replace nuki2 with nuki-extended
* (Zefau) Suggest jarvis for discovery as advice
* (Apollon77) Added checks on broadlink2 discovery to prevent the crash case (Sentry IOBROKER-DISCOVERY-2H)

### 2.4.1 (2020-12-06)
* (Apollon77) Fixed the potential crash case in lightify (Sentry IOBROKER-DISCOVERY-2D)
* (Apollon77) Fixed the potential crash case (Sentry IOBROKER-DISCOVERY-2C)

### 2.4.0 (2020-11-29)
* (withstu) added heos

### 2.3.11 (2020-08-08)
* (Grizzelbee) Added MieleCloudService

### 2.3.10 (2020-07-26)
* (MiSchroe) Discovery Velux KLF-200 updated to new firmware

### 2.3.9 (2020-07-17)
* (Apollon77) Added error handling to onvif discovery (Sentry IOBROKER-DISCOVERY-13)
* (Apollon77) Added error handling to smapee discovery (Sentry IOBROKER-DISCOVERY-14)
* (Apollon77) Added error handling to synology discovery (Sentry IOBROKER-DISCOVERY-1A)
* (Apollon77) Update mndp library to prevent crashes (Sentry IOBROKER-DISCOVERY-15+)

### 2.3.7 (2020-06-11)
* (Apollon77) Added error handling for Synology detection (Sentry IOBROKER-DISCOVERY-E)

### 2.3.6 (2020-05-02)
* (Garfonso) Added mydlink adapter
* (haba1234) New adapter added: Onvif
* (Apollon77) serial device discovery fixed

### 2.3.4 (2020-04-30)
* (Apollon77) make sure to check if initialization was done when ending (Sentry IOBROKER-DISCOVERY-8) 
* (APollon77) fix megad discovery error

### 2.3.3 (2020-04-23)
* (Apollon77) corrected access to a wrong variable (Sentry IOBROKER-DISCOVERY-3)
* (Apollon77) catch http errors better (Sentry IOBROKER-DISCOVERY-2)

### 2.3.2 (2020-04-18)
* (Apollon77) Fix potential crash in knx discovery

### 2.3.1 (2020-04-16)
* (instalator) Added Synology, Onkyo, Mpd, Mikrotik
* (instalator) Fixed eKey, Mihome, Broadlink2, Plex
* (instalator) Several optimizations and fixing of crash causes
* (Apollon77) Added Sentry Crash Reporting for js-controller 3.0
* (bluefox) Refactoring

### 2.2.2 (2020-02-13)
* (dkleber89) Added discovery for Beckhoff PLC
* (forelleblau) Added discovery for Solarlog
* (oweitman) Added discovery for SqueezeboxRPC

### 2.1.0 (2020-01-21)
* (foxriver76) no longer use `adapter.objects`
* __js-controller > 2.0.0 required__

### 2.0.0 (2019-05-15)
* (thewhobox) Code refactoring
* (thewhobox) Added emby detection
* (frankjoke) boradlink => broadlink2
* (bluefox) Small fixes
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.3.0 (2019-01-04)
* (bluefox) Added support of the compact mode
* (ldittmar) info Adapter added

### 1.2.4 (2018-09-22)
* (bluefox) Small GUI update was made
* (rg-engineering) Added ebus

### 1.2.3 (2018-09-13)
* (bluefox) Proxmox was fixed
* (unltdnetworx) solarwatt
* (Michael Schroeder) klf200
* (bluefox) Use OpenStreetMap
* (MeisterTR) yeelight
* (unltdnetworx) stiebel-isg
* (BuZZy1337) doorbird

### 1.2.1 (2018-07-28)
* (bluefox) New adapter added: DENON

### 1.1.1 (2018-03-27)
* (bluefox) New adapter added: ekey, Home Assistant, FHEM

### 1.1.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-13)
* (bluefox) ready for admin3

### 1.0.1 (2017-12-28)
* Fix Epson Stylus PX830
* Added Bose Soundtouch

### 1.0.0 (2017-10-18)
* (pix) Added Epson Stylus PX830
* (pix) Added Homepilot
* (Samuel Weibel) Loxone

### 0.4.5 (2017-08-25)
* (Apollon77) Fixes in mihome

### 0.4.4 (2017-06-01)
* (bluefox) Added lgtv
* (bluefox) disable serial by default. It must be explicitly enabled every time
* (bluefox) Added mihome

### 0.4.2 (2017-05-17)
* (bluefox) Added discovery methods selection

### 0.4.0 (2017-05-01)
* (soef) Added SamsungTV, Lightify, Miele and yamaha
* (soef) Added new discovery method mDNS
* (bluefox) Added openhab, Broadlink

### 0.3.3 (2017-04-15)
* (bluefox) Added philips HUE

### 0.3.2 (2017-04-12)
* (bluefox) Added mysensors USB/Serial

### 0.3.1 (2017-04-01)
* (apollon77) Added Daikin climate control

### 0.3.0 (2017-03-27)
* (bluefox) Fixed serial discovery

### 0.2.3 (2017-03-18)
* (bluefox) fix license dialog
* (bluefox) Added zwave
* (bluefox) Added sqllite and flot
* (bluefox) ack => ignore
* (bluefox) Added megad
* (apollon77) Added history
* (apollon77) enhance/fix sql-sqlite
* (apollon77) Added InfluxDB
* (ykuendig) german translation updated

### 0.2.2 (2017-03-18)
* (bluefox) Fix typo

### 0.2.1 (2017-03-15)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2024, Denis Haev ak Bluefox <dogafox@gmail.com>

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