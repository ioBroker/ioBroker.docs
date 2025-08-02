---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/README.md
title: Адаптер ioBroker Discover
hash: 8ZC7Dm35Xlje6vXUX0PcjjVgWk0L6sXeaxRpbl3uHyM=
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
- Эйр-Кью
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
- ЛаМетрик
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
- ВЛЭД
- Ямаха
- Йилайт
- Z-wave USB (протестировано в Aeon Labs)

### Предлагается в качестве дополнительных адаптеров
- Облако
- История (если не найден SQL или InfluxDB)
- Интернет вещей
- iControl
- Электронные диаграммы (предлагаются при наличии адаптера истории)
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
- фрицбокс (ruhr70)
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

### 4.1.0 (2023-09-25)
* (pdbjjens) Added detection of myvbus and resol

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
