---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.snips/README.md
title: ioBroker.snips! [Логотип] (admin / snips.png)
hash: JpIjjtnNgvaIHPCyi4HJt1SJk61t2dSjkHx2qZsNGRA=
---
# IoBroker.snips ![Логотип](../../../en/adapterref/iobroker.snips/admin/snips.png)

![Количество установок](http://iobroker.live/badges/snips-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.snips.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.snips.svg)
![НПМ](https://nodei.co/npm/iobroker.snips.png?downloads=true)

[![Статус сборки] (https://app.travis-ci.com/unltdnetworx/ioBroker.snips.svg?branch=master)](https://travis-ci.org/unltdnetworx/ioBroker.snips)

ВНИМАНИЕ: адаптер больше не разрабатывается и не обслуживается, потому что Sonos купил Snips, а бесплатная платформа была прекращена 01.02.2020. Адаптер и установленные ножницы по-прежнему будут работать.

Требуется node.js 6.0 или выше и Admin v3!

Адаптер взаимодействует с оборудованием Snips с помощью MQTT. Для выполнения команд требуется адаптер text2command.

URL фрагмента: <https://makers.snips.ai/>

## Установочные фрагменты
Для Snips в Debian Stretch (x86), Raspbian / Armbian Stretch (RPI3, Odroid) установите следующие пакеты:

lsb-release apt-transport-https ca-Certificates systemd systemd-sysv libttspico-utils alsa-utils dirmngr mosquitto snips-asr snips-audio-server snips-dialog snips-hotword snips-nlu snips-tts snips-injection

В зависимости от вашего оборудования и дистрибутива Linux у вас могут уже быть установлены пакеты.

Инструкции по установке и настройке для Raspian / Armbian: <https://snips.gitbook.io/documentation/installing-snips/on-a-raspberry-pi>

Инструкции по установке и настройке для Debian: sudo nano /etc/apt/sources.list Добавьте «non-free» в каждую строку, иначе вы не сможете установить пакет «libttspico-utils».
<https://snips.gitbook.io/documentation/advanced-configuration/advanced-solutions>

Войдите в <https://console.snips.ai> и добавьте нового мастера.
Добавьте приложение, над отметкой «показывать только приложения с действиями», найдите iobroker ![Логотип приложения ioBroker snips-app](https://console.snips.ai/images/bundles/bundle-home.svg) и выберите.
Когда вы закончите, нажмите Deploy Assistant, чтобы загрузить ZIP-файл.
Zip-файл распаковывается на машине snips в "/ usr / share / snips", затем перезагружается.

Прежде чем мы продолжим, должны сработать фрагменты:

### Настроить адаптер Snips
Url: Адрес Snips-MQTT-Servers Порт: Порт Snips-MQTT-Servers Instanz: Text2Command-Instanz (например, 0) Фильтр: например, понять ClientID: ID (например, 0)

### Настроить адаптер Text2Command
Вставьте в конфигурацию адаптера Text2Command в разделе Ответ в идентификаторе snips.X.devices.all.send.say.text.

### Инъекция (учим новые слова)
Неизвестные слова можно выучить в snips.0.send.inject.room или устройстве.
ВНИМАНИЕ: на устройстве / сервере должна быть установлена служба инъекции sudo apt-get install -y snips-injection

## Changelog

### 1.5.1

* (unltdnetworx) new adapter testing and security update

### 1.5.0

* (unltdnetworx) removal of language support, may come back

### 1.4.0

* (unltdnetworx) multilingualism support for german and english

### 1.3.1

* (unltdnetworx) add multilingual blinds/switch-rule

### 1.3.0

* (unltdnetworx) preparation for multilingualism support

### 1.2.1

* (unltdnetworx) bugfix for multiple devices in stellite's room

### 1.2.0

* (unltdnetworx) possibility to enforce the room for a satellite

### 1.1.7

* (unltdnetworx) security update because of vulnerability in pulled by mqtt-dependency mqtt-package

### 1.1.6

* (unltdnetworx) activation/deactivation of hotword recognition for each satellite (mute)

### 1.1.5

* (unltdnetworx) bugfixes for adapter-testing

### 1.1.4

* (unltdnetworx) control soundfeedback for every satellite

### 1.1.3

* (unltdnetworx) delete states after session ended

### 1.1.2

* (unltdnetworx) create satellites manually

### 1.1.1

* (apollon77) Update CI testing

### 1.1.0

* (unltdnetworx) support for satellites

### 1.0.1

* (wal) bugfix memoryleak

### 1.0.0

* (wal) stable version

### 0.3.1

* (unltdnetworx) bugfix for not recognized slots

### 0.3.0

* (unltdnetworx) slots reduced to two

### 0.2.2

* (unltdnetworx) slot setBoolean changed to setDevice

### 0.2.1

* (unltdnetworx) slot-type names converted to singular

### 0.2.0

* (unltdnetworx) support for compact-mode added

### 0.1.1

* (unltdnetworx) 2 new slots added incl. injection

### 0.1.0

* (wal) add soundfeedback

### 0.0.9

* (unltdnetworx) testadapter and slots added

### 0.0.8

* (wal) adaptation for new snips version

### 0.0.7

* (wal) file corrupt

### 0.0.6

* (wal) add receive.text

### 0.0.5

* (wal) bugfix injection

### 0.0.4

* (wal) add hotword recognize

### 0.0.3

* (wal) add filter and text2command_Instanz

### 0.0.2

* (wal) first working adapter

### 0.0.1

* (wal) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 Michael Schuster <development@unltd-networx.de> & Walter Zengel <w.zengel@gmx.de>

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