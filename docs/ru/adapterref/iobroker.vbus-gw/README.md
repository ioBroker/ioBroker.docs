---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vbus-gw/README.md
title: ioBroker.vbus-gw
hash: Mo9ceBCnAjZAZM2zIb/j7WLcWOFtT5pVhkrECFDRqJc=
---
# ioBroker.vbus-gw

![Версия NPM](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vbus-gw-stable.svg)
![Количество установок](https://iobroker.live/badges/vbus-gw-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)
![Тестирование и выпуск](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vbus-gw.svg?data=d,s)

![Логотип](../../../en/adapterref/iobroker.vbus-gw/admin/vbus-gw.png)

## адаптер vbus-gw для ioBroker

Предоставляет TCP-доступ к устройствам VBus на основе последовательного порта.

Этот адаптер ioBroker основан на работе Даниэля Випперманна.\
&#x20;<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp>\
&#x20;Авторские права и лицензия: см. раздел «Лицензия».

## Обзор

Существует два типа аппаратных адаптеров VBus:

- На основе TCP: DL2, DL3, KM2, VBus/LAN.
- Использование последовательных портов: VBus/USB, USB-порт контроллера DeltaSol SLT и других контроллеров.

Этот адаптер ioBroker подключается к одному или нескольким аппаратным адаптерам на основе последовательного порта и предоставляет к ним доступ по протоколу TCP. Это позволяет:

- передача данных VBus на большие расстояния, чем это обычно позволяют USB или последовательные порты.
- доступ к адаптерам на основе последовательного порта из приложений, поддерживающих только адаптеры на основе TCP.

## Конфигурация

К настраиваемым элементам относятся:

- TCP-порт, на котором служба ожидает входящие соединения.\
  &#x20;По умолчанию используется порт 7053, который изменять не следует.

- HTTP-порт, на котором служба принимает запросы обнаружения.\
  &#x20;По умолчанию используется порт 80, в качестве альтернативы можно выбрать порт 3000.

- Пароль шлюза VBus.\
  &#x20;Предоставляет доступ ко всем устройствам VBus, подключенным через последовательный порт. По умолчанию используется значение "vbus".

- Список последовательных портов для подключения со следующими параметрами для каждого последовательного порта:

- канал: канал VBUS, к которому назначен последовательный порт.\
  &#x20;Если вам нужно подключиться только к одному последовательному порту, рекомендуется настроить его на использование канала 0, поскольку большинство приложений по умолчанию будут пытаться подключиться именно к этому каналу.

- путь: путь к последовательному порту, например:\
  &#x20;'/dev/ttyUSB0' или\
  &#x20;'/dev/serial/by-id/usb-Silicon\_Labs\_USB-Modul\_UO2102\_TDEB6I8DAVDLGAGC-if00-port0' или\
  &#x20;'/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' или\
  &#x20;'COM5'

- baudrate: Скорость передачи данных последовательного порта. Значение по умолчанию — 9600, обычно его не нужно изменять.

## Известные проблемы

- В настоящее время данный адаптер поддерживает подключение до 3 устройств VBus через последовательные порты.
- Пароли для всех VBus, подключенных к последовательным портам, одинаковы.
- Устройства, подключенные по протоколу VBus.net, не эмулируются. Отправка команды CONNECT (через тег) возвращает +OK, хотя соединение не устанавливается.
- Отправка команды DATA с выбранным несуществующим каналом возвращает +OK, но сразу же после этого соединение разрывается.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.3.2 (2026-03-04) - 2026H1 maintenance release

- (pdbjjens) **Changed**: node>=20, js-controller>=7.0.7 and admin>=7.7.22 required
- (pdbjjens) **Fixed**: update release-script (#149)

### 0.3.2-alpha.0 (2025-10-20)

- (pdbjjens) Fix: Removed NPM_TOKEN secret from repository

### 0.3.1-alpha.0 (2025-10-20)

- (pdbjjens) Fix: Add GitHub as npm Trusted Publisher
- (pdbjjens) Change: Update dependencies

### 0.3.0 (2025-08-29) - 2025H1 maintenance release

- (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
- (pdbjjens) Change: Cleanup devDependencies

### 0.2.0 (2025-01-29) - 2025H1 maintenance release

- (pdbjjens) Change: Migration to ESLint 9
- (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
- (pdbjjens) Change: Responsive Design optimizations

[Older changelogs can be found there](https://github.com/pdbjjens/ioBroker.vbus-gw/blob/main/CHANGELOG_OLD.md)

## License

MIT License  
Copyright (c) 2025-2026 Jens-Peter Jensen <jjensen@t-online.de>  
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