---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: PQzBwTLmm9vo+EpZ2q8J+gAYuaYuHXZwJeyppIQmPhs=
---
![Логотип](../../../en/adapterref/iobroker.extron/admin/extron.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.extron.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.extron.svg)
![Количество установок (последнее)](http://iobroker.live/badges/extron-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/extron-stable.svg)
![Статус зависимости](https://img.shields.io/david/Bannsaenger/iobroker.extron.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
## Адаптер extron для ioBroker
Адаптер Extron SIS

Устройства управления от Extron.
Этот адаптер предназначен для управления некоторыми аудио- и видеотехническими продуктами Extron с помощью **S** реализация **I** nstruction **S** et Protocol.
Функциональный объем устройств огромен. Не все функции имеют смысл поддерживать с помощью адаптера и взаимодействия с iobroker.

** Имейте в виду: ** Когда тип устройства выбран в конфигурации адаптера, он не может быть изменен в будущем!

В установке iobroker может быть больше экземпляров разных или одинаковых типов от этого адаптера. Для будущих выпусков вам необходимо добавить действующую лицензию в конфигурацию адаптера для каждого экземпляра.
Если вы некоммерческая организация или используете его в личных целях, вы можете получить лицензию бесплатно. Пожалуйста, свяжитесь с автором.

### Поддерживаемые устройства
- Матричный коммутатор 8x2 (DTP2 CrossPoint 82)
- Плеер и декодер потокового мультимедиа H.264 (SMD 202)
- Кодировщик потокового мультимедиа (SME 211)
- Процессор 12x8 ProDSP с Dante (DMP 128 Plus AT)
- Процессор ProDSP 12x8 с AEC, VoIP и Dante (DMP 128 Plus C V AT)

## Делать
- Тип устройства проверяется в начале разговора. Иногда это не удается. Необходимо поменять механизм на более надежный.
- Сделайте более детальный выбор используемых входов и выходов, чтобы уменьшить размер базы данных на устройствах DSP.
- добавить больше команд и их реализацию на стороне базы данных
- добавить поддержку воспроизведения мультимедиа в SMD 202

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

![CC BY-NC License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License
http://creativecommons.org/licenses/by-nc/4.0/

Short content:
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.
You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.