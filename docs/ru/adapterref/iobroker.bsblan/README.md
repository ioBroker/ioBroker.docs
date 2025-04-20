---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bsblan/README.md
title: ioBroker.bsblan
hash: haHr0tg9u5OtGuZeXjL1ia46eC98hfCm7eWcwUdhShU=
---
![Логотип](../../../en/adapterref/iobroker.bsblan/admin/bsblan.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.bsblan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bsblan.svg)
![Количество установок](https://iobroker.live/badges/bsblan-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/bsblan-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bsblan.png?downloads=true)
![Известные уязвимости](https://snyk.io/test/github/hacki11/ioBroker.bsblan/badge.svg)

# IoBroker.bsblan
## Адаптер bsb_lan для ioBroker
Этот адаптер подключает [Интерфейс BSB_LAN](https://github.com/fredlcore/bsb_lan) к ioBroker.
Интерфейс BSB_LAN подключает BSB (шину котловой системы) к локальной сети. Этот адаптер подключает ее к ioBroker.

[Руководство пользователя интерфейса BSB_LAN](https://docs.bsb-lan.de)

## Поддерживаемые устройства
- Устройства, совместимые с BSB/LPB (например, Brötje, Elco, MHG, Fujitsu)
- подробности см.: [Поддерживаемые устройства](https://docs.bsb-lan.de/supported_heating_systems.html)

## Использование
- Интерфейс BSB_LAN запущен и работает
- Установить адаптер
- Настроить
- ИП
- Имя пользователя и пароль (если активирована базовая аутентификация)
- Интервал опроса в секундах (минимум 10)
- Идентификаторы, которые следует опрашивать или изменять (разделяются запятыми или символами новой строки, доступные идентификаторы см. в веб-интерфейсе BSB_LAN)

## Написание ценностей
- Активировать все или определенные идентификаторы как доступные для записи в
* ru: [Только чтение или доступ для чтения/записи](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap05.html)
  * de: [Zugriff des Adapters auf den Regler](https://1coderookie.github.io/BSB-LPB-LAN/kap05.html)
* для всех: `bsb_lan_config.h: #define DEFAULT_FLAG 0`
* компиляция и загрузка
- Добавьте идентификаторы, которые следует записать в конфигурацию экземпляра адаптера (см. Использование)
- Теперь можно записывать числа, перечисления и типы hr:min (конечно, можно записывать только доступные для записи идентификаторы)

## Кредиты
- Значок создан [Freepik](https://www.freepik.com/home) с сайта www.flaticon.com

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* Maintenance release
* Setup Eslint 9, Prettier and Dev Container
* Migrate to newest adapter-creator version

### 0.3.4
* Fix order of individual destinations (They need to be queried sorted by destination, starting with default destination)

### 0.3.3
* Support for individual destinations e.g. `710!7`
### 0.3.2
* Support dot-separated parameter ids like `20200.0`, `20200.1`. `.0` is omitted from object view as it is also omitted in the bsb_lan response.

### 0.3.1
* Code Quality Improvements

### 0.3.0
* Add support for BSB_LAN 2.x
* BREAKING: Names of 24h Average values changed (e.g. Außentemperatur_(8700) => 24h Durchschnittswert. Außentemperatur_(20050))

### 0.2.2
* Replace invalid characters: https://github.com/ioBroker/ioBroker.js-controller/issues/198

### 0.2.1
* Fix write issue with new bsb_lan2 firmware

### 0.2.0
* Add 24h averages (needs BSB_LAN FW 1.1)

### 0.1.2
* Support INF interface for setting external room temperatures

### 0.1.1
* Support unit micro
* Made robust against invalid or non existing IDs

### 0.1.0
* Support write access

### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2025 hacki11

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