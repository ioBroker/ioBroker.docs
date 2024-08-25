---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: aF4K57u2d/78Cw2v4pkxrJUrcmi9N7upgA12YFtYMP4=
---
# IoBroker.myvbus
![Логотип](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Количество установок (последних)](http://iobroker.live/badges/myvbus-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/myvbus-stable.svg)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![НПМ](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## Адаптер ioBroker для Resol VBus
Этот адаптер подключает ioBroker к различным устройствам на базе VBus с помощью resol-vbus, библиотеки JavaScript для сбора данных RESOL VBus, предоставленной Дэниелом Випперманном.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Функции
* Позволяет считывать данные измерений с различных устройств RESOL(R) VBus(R) - предпочтительно солнечных и системных контроллеров серии DeltaSol(R), включая встроенные счетчики количества тепла (HQM) - с использованием регистраторов данных DL3 или DL2, KM2. коммуникационные модули, адаптеры интерфейса VBus/LAN или шлюзы последовательного порта/LAN локально через TCP/IP.
* Также поддерживается доступ к устройству с помощью адаптера последовательного интерфейса VBus/USB или через VBus.net(R) с использованием DLx/KMx.
* Обрабатывает живые потоки данных VBus и делает их доступными, как утверждает ioBroker.
* Значения обновляются с настраиваемым временем цикла.
* Чтение или установка параметров конфигурации устройства VBus не поддерживается. Для этого следует использовать инструменты, предоставляемые Resol, например. через VBus.net или инструмент параметризации RPT.

Производная версия этого адаптера, поддерживающая управление устройствами VBus, доступна по адресу <https://github.com/Grizzelbee/ioBroker.resol>

* Чтение канала DL3 0 (датчики, напрямую подключенные к устройству DL3) не поддерживается из-за ограничений интерфейса DL3.

## Подсказки по настройке
* Тип подключаемого устройства, например. VBus/LAN или DL2 должны быть выбраны явно, иначе соединение не будет установлено.
* Порт TCP-соединения: настройку по умолчанию 7053 менять не следует.
* Пароль устройства: пароль, который вы установили на подключаемом устройстве (по умолчанию: vbus).
* Канал DL3: актуально только для DL3/DL2Plus. Для всех остальных подключаемых устройств оставьте значение «Нет».

(допустимые значения: 1–6, канал 0 не может быть считан)

* Интервал обновления: время между обновлениями измеренных значений (по умолчанию 30 с).
* Правильные настройки прямого доступа к локальной сети для VBus/LAN, DL3, DL2, KM2:
  * Устройство подключения: VBus/LAN или KM2/DL2 или DL3/DL2Plus.
  * Адрес устройства: IP-адрес (например, 192.168.178.188) или полное имя хоста (например, myKM2.fritz.box).
* Правильные настройки доступа DL3, DL2, KM2 через VBus.net:
  * Устройство подключения: DL3/DL2Plus или DL2/KM2
  * Адрес устройства: vbus.net (или vbus.io) — оба без http:// и идентификатора Via!
  * Через тег: YourViaIdentifier (например, d1234567890) — без http:// перед или .vbus.io позади.

## Юридические уведомления
RESOL, VBus, VBus.net, DeltaSol и другие являются торговыми марками или зарегистрированными торговыми марками RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en>

Все остальные товарные знаки являются собственностью соответствующих владельцев.
Авторы никоим образом не одобрены и не связаны с RESOL GmbH или любыми связанными с ней дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.3.0 (2024-01-24) - 2024 maintenance release

* (pdbjjens) New: Use JSON config UI
* (pdbjjens) New: Support ioBroker discovery
* (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=6 required
* (pdbjjens) Updated dependencies
* (pdbjjens) Fix: Set info.connection false when reconnecting

### 0.2.5 (2023-03-14)

* (pdbjjens) Updated dependencies
* (pdbjjens) Fix: reconnect handling for serial connections

### 0.2.4 (2023-03-01)

* (pdbjjens) Fix password check

### 0.2.3 (2023-02-27) - 2023 maintenance release

* (pdbjjens) Updated dependencies
* (pdbjjens) New: Use adapter-dev instead of gulp translate
* (pdbjjens) Fix: error handling for serial connections

### 0.2.2 (2022-02-11)

* Updated dependencies
* Compatibility check for js-controller 4.0
* Support for js-controller 1.x dropped

## License

MIT License

Copyright (c) 2024 Jens-Peter Jensen <jjensen@t-online.de>

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
