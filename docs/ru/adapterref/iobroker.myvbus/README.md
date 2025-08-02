---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: ZiVALRmHECLNqlEbG+VupRJUNFp71+MElfgIjLt0HE4=
---
# IoBroker.myvbus
![Логотип](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Количество установок (последнее)](http://iobroker.live/badges/myvbus-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/myvbus-stable.svg)
![версия НПМ](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![НПМ](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**Тесты:** ![Тест и выпуск](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## Адаптер ioBroker для Resol VBus
Этот адаптер подключает ioBroker к различным устройствам на базе VBus с помощью resol-vbus, библиотеки JavaScript для сбора данных RESOL VBus, предоставленной Дэниелом Випперманном.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Функции
* Позволяет считывать данные измерений с различных устройств RESOL(R) VBus(R) - предпочтительно солнечных и системных контроллеров серии DeltaSol(R), включая встроенные счетчики количества тепла (HQM) - с использованием регистраторов данных DL3 или DL2, коммуникационных модулей KM2, адаптеров интерфейса VBus/LAN или последовательных/LAN-шлюзов локально через TCP/IP.
* Также поддерживается доступ к устройству с использованием адаптера последовательного интерфейса VBus/USB или через VBus.net(R) с использованием DLx/KMx.
* Обрабатывает потоки данных VBus в реальном времени и делает их доступными в виде состояний ioBroker.
* Значения обновляются с настраиваемым временем цикла.
* Чтение или настройка параметров конфигурации устройства VBus не поддерживается. Для этого следует использовать инструменты, предоставляемые Resol, например, через VBus.net или инструмент параметризации RPT.

Производная версия этого адаптера, поддерживающая управление устройствами VBus, доступна по адресу <https://github.com/Grizzelbee/ioBroker.resol>

* Чтение канала 0 DL3 (датчики, напрямую подключенные к устройству DL3) не поддерживается из-за ограничений интерфейса DL3.

## Советы по настройке
* Тип устройства подключения, например VBus/LAN или DL2. Должен быть выбран явно, в противном случае соединение не будет установлено.
* Порт подключения TCP: Только соответствующий или доступ на основе локальной сети. Значение по умолчанию 7053 не следует менять
* Пароль устройства: пароль, который вы установили на своем устройстве подключения (по умолчанию: vbus)
* Канал DL3: актуально только для DL3/DL2Plus — для всех остальных устройств подключения оставьте значение «Нет».

(допустимые значения: 1-6, канал 0 не может быть считан)

* Через тег: актуально только для доступа DL3, DL2, KM2 через VBus.net — оставьте поле пустым для всех остальных устройств подключения.
* Интервал обновления: время между обновлениями измеренных значений (по умолчанию 30 с)
* Правильные настройки для прямого доступа к последовательному интерфейсу для VBus/USB:
* Устройство подключения: VBus/USB
* Адрес устройства: путь к последовательному порту, к которому подключен адаптер последовательного интерфейса, например

'/dev/ttyUSB0' или '/dev/serial/by-id/usb-Silicon_Labs_USB-Modul_UO2102_TDEB6I8DAVDLGAGC-if00-port0' или '/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' для Linux или 'COM5' для платформ ioBroker на базе Windows

* Правильные настройки для прямого доступа к локальной сети для VBus/LAN, DL3, DL2, KM2:
* Устройство подключения: VBus/LAN или KM2/DL2 или DL3/DL2Plus
* Адрес устройства: IP-адрес (например, 192.168.178.188) или полностью определенное имя хоста (например, myKM2.fritz.box)
* Правильные настройки для доступа DL3, DL2, KM2 через VBus.net:
* Устройство подключения: DL3/DL2Plus или DL2/KM2
* Адрес устройства: vbus.net (или vbus.io) - оба без http:// и идентификатора Via!
* Через тег: YourViaIdentifier (например, d1234567890) - без http:// перед или .vbus.io после

## Юридические уведомления
RESOL, VBus, VBus.net, DeltaSol и другие являются торговыми марками или зарегистрированными торговыми марками RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en>

Все остальные товарные знаки являются собственностью их владельцев.
Авторы никоим образом не поддерживаются и не связаны с RESOL GmbH или любыми связанными с ними дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-01-30) - 2025H1 maintenance release

* (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
* (pdbjjens) Change: Migration to ESLint 9
* (simatec) Responsive Design added

### 0.4.0 (2024-08-13) - 2024H2 maintenance release

* (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
* (pdbjjens) Change: Removed .npmignore
* (pdbjjens) New: Updated dependencies

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

## License

MIT License

Copyright (c) 2025 Jens-Peter Jensen <jjensen@t-online.de>

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