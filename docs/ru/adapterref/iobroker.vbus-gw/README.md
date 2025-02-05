---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vbus-gw/README.md
title: ioBroker.vbus-gw
hash: 27jJv88V7+juZCeU0sCVgDG033Cz3ejMB0Xg5dK7yeI=
---
# IoBroker.vbus-gw
![Логотип](../../../en/adapterref/iobroker.vbus-gw/admin/vbus-gw.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/vbus-gw-stable.svg)
![Количество установок](https://iobroker.live/badges/vbus-gw-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)
![НПМ](https://nodei.co/npm/iobroker.vbus-gw.png?downloads=true)

**Тесты:** ![Тест и выпуск](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)

## Адаптер vbus-gw для ioBroker
Обеспечивает TCP-доступ к последовательным портам на базе VBus-устройств

Этот адаптер ioBroker основан на работе Дэниела Випперманна.
<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp> Авторские права и лицензия см. в разделе «Лицензия»

## Обзор
Существует два типа аппаратных адаптеров VBus:

- На основе TCP: DL2, DL3, KM2, VBus/LAN.
- На основе последовательного порта: VBus/USB, USB-порт DeltaSol SLT и других контроллеров

Этот адаптер ioBroker подключается к одному или нескольким аппаратным адаптерам на базе последовательного порта и предоставляет их через TCP. Это позволяет:

- передача данных VBus на большие расстояния, чем это обычно позволяют USB или последовательные порты
- доступ к адаптерам на базе последовательного порта из приложений, которые поддерживают только адаптеры на базе TCP

## Конфигурация
Настраиваемые элементы:

- TCP-порт, на котором служба прослушивает входящие соединения.

По умолчанию используется порт: 7053, который не следует менять.

- HTTP-порт, на котором служба прослушивает запросы на обнаружение.

По умолчанию используется порт: 80, в качестве альтернативы можно выбрать порт 3000.

- Пароль шлюза VBus.

Позволяет получить доступ ко всем последовательным портам, подключенным к устройствам VBus. По умолчанию "vbus".

- Список последовательных портов для подключения со следующими параметрами для каждого последовательного порта:

- канал: канал vbus, которому назначен последовательный порт.

Если вы хотите подключиться только к одному последовательному порту, рекомендуется настроить его на использование канала 0, поскольку большинство приложений по умолчанию будут пытаться подключиться к этому каналу 0.

- путь: Путь к последовательному порту, например

'/dev/ttyUSB0' или '/dev/serial/by-id/usb-Silicon_Labs_USB-Modul_UO2102_TDEB6I8DAVDLGAGC-if00-port0' или '/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' или 'COM5'

- baudrate: Скорость передачи данных последовательного порта. По умолчанию 9600, обычно ее не нужно менять.

## Известные проблемы
- В настоящее время этот адаптер поддерживает до 3 устройств VBus, подключенных через последовательные порты.
- Пароли для всех VBus, подключенных к последовательным портам, одинаковы.
- Устройства, подключенные к VBus.net, не эмулируются. Отправка команды CONNECT (через тег) возвращает +OK, хотя соединение не установлено.
- Отправка команды DATA при несуществующем выбранном канале возвращает +OK, но после этого немедленно закрывает соединение.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-01-29) - 2025H1 maintenance release

- (pdbjjens) Change: Migration to ESLint 9
- (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
- (pdbjjens) Change: Responsive Design optimizations

### 0.1.0 (2024-08-13) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Ensure that vbus-gw is started before myvbus or resol

### 0.0.7 (2024-02-24)

- (pdbjjens) Fix: VBus write fixed
- (pdbjjens) Fix: Password logging removed

### 0.0.6 (2024-01-23)

- (pdbjjens) New: Use resol-vbus v0.29.0
- (pdbjjens) New: Logging of denied connection events

### 0.0.5 (2024-01-21)

- (pdbjjens) New: Use resol-vbus v0.28.0
- (pdbjjens) New: Configurable password for the VBus gateway
- (pdbjjens) Fix: Channel forwarding to the requesting connections only

## License

MIT License  
Copyright (c) 2025 Jens-Peter Jensen <jjensen@t-online.de>  
Copyright (c) 2013-present, Daniel Wippermann.

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