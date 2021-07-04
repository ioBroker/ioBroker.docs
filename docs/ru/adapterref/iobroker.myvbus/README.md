---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: 6kKllJqqY6mebKgEc/lPReCJxOPTFTpcWPfDSiCXAfY=
---
# IoBroker.myvbus
![Логотип](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Количество установок (последнее)](http://iobroker.live/badges/myvbus-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/myvbus-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

** Тесты: ** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## Адаптер ioBroker для Resol VBus
Этот адаптер подключает ioBroker к различным устройствам на базе VBus с помощью resol-vbus, библиотеки JavaScript для получения данных RESOL VBus, предоставленной Дэниелом Випперманном.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Функции
* Позволяет считывать данные измерений с различных устройств RESOL (R) VBus (R) - предпочтительно солнечных и системных контроллеров серии DeltaSol (R), включая встроенные счетчики количества тепла (HQM) - с использованием логгеров данных DL3 или DL2, KM2 коммуникационные модули, адаптеры интерфейса VBus / LAN или последовательные / LAN-шлюзы локально через TCP / IP.
* Также поддерживается доступ к устройству с помощью адаптера последовательного интерфейса VBus / USB или через VBus.net (R) с использованием DLx / KMx.
* Обрабатывает живые потоки данных VBus и делает их доступными в виде состояний ioBroker.
* Значения обновляются с настраиваемым временем цикла.
* Чтение или установка параметров конфигурации устройства VBus не поддерживается. Для этого следует использовать инструменты, предоставляемые Resol, например через VBus.net или инструмент параметризации RPT.
* Чтение канала 0 DL3 (датчики, напрямую подключенные к устройству DL3) не поддерживается из-за ограничений интерфейса DL3.

## Подсказки по настройке
* По умолчанию для типа подключения используется VBus / LAN, но он должен быть явно выбран даже для VBus / LAN, в противном случае соединение не будет установлено.
* Правильные настройки для прямого доступа к локальной сети для VBus / LAN, DL3, DL2, KM2:
  * Тип подключения: VBus / LAN или KM2 или DL2 или DL3
  * Идентификатор подключения: IP-адрес (например, 192.168.178.188) или FullyQualifiedHostName (например, host1.example.com)
  * Пароль VBus: YourVBusPassword (по умолчанию: vbus)
  * Порт подключения: настройку по умолчанию 7053 изменять не следует.
  * Канал DL3: актуален только для DL3 (значения 1-6, канал 0 не может быть считан)
  * Интервал обновления: время между обновлениями измеренных значений (по умолчанию 30 с)
* Правильные настройки для доступа DL3, DL2, KM2 через VBus.net:
  * Тип подключения: DL3 или DL2 или KM2
  * Идентификатор подключения: vbus.net (или vbus.io) - как без http://, так и без идентификатора Via!
  * Порт подключения: настройку по умолчанию 7053 изменять не следует.
  * Пароль VBus: YourVBusPassword (по умолчанию: vbus)
  * Канал DL3: актуален только для DL3 (значения: 1-6, канал 0 не может быть считан)
  * Через идентификатор: YourViaIdentifier (например, d1234567890) - без http:// перед или .vbus.io позади
  * Интервал обновления: время между обновлением измеренных значений (по умолчанию 30 с)

## Юридические уведомления
RESOL, VBus, VBus.net, DeltaSol и другие являются товарными знаками или зарегистрированными товарными знаками RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en>

Все остальные товарные знаки являются собственностью соответствующих владельцев.
Авторы никоим образом не одобрены или связаны с RESOL GmbH или какими-либо связанными с ними дочерними компаниями, логотипами или товарными знаками.

## Changelog
### 0.2.0 (2021-06-25)
* Dropped node.js 10 support, added node.js 14 and 16 support

### 0.1.1 (2021-05-18)
* Fixes for supporting js-controller >=3.2.x

### 0.1.0
* (grizzelbee) Fix: config page shows current settings now (not default anymore)
* (grizzelbee) Fix: "Connected" state is updated correctly now if connection is disrupted.
* (grizzelbee) New: Added Badge for latest(npm) version to readme
* (grizzelbee) Fix: removed default password from config to ensure it's encrypted on first config
* (grizzelbee) Fix: removed Force-ReInit
* (grizzelbee) Fix: sensor maintenance indicators are booleans now
* (grizzelbee) New: added activity indicator states for relays
* (pdbjjens) Fix: Prevent warnings regarding non-existent objects upon adapter instance creation and start-up with js-controller 3.2.x
* (pdbjjens) Fix: updated dependencies and vulnerabilities

### 0.0.6
* (pdbjjens) alpha 6 release updated dependencies

### 0.0.5
* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### 0.0.4
* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### 0.0.3
* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### 0.0.2
* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2021 Jens-Peter Jensen <jjensen@t-online.de>

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