---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vbus-gw/README.md
title: ioBroker.vbus-gw
hash: 5+k0/b+7tSVJOEGcpAJOPLMp7fD1L31P1oQFo5jJ4hU=
---
# IoBroker.vbus-gw
![Логотип](../../../en/adapterref/iobroker.vbus-gw/admin/vbus-gw.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/vbus-gw-stable.svg)
![Количество установок](https://iobroker.live/badges/vbus-gw-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)
![НПМ](https://nodei.co/npm/iobroker.vbus-gw.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)

## Адаптер vbus-gw для ioBroker
Разрешает TCP-доступ к устройствам VBus на базе последовательного порта.

Этот адаптер ioBroker основан на работе Дэниела Випперманна.
<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp> Авторские права и лицензия см. раздел «Лицензия».

## Обзор
Существует два типа аппаратных адаптеров VBus:

- На основе TCP: DL2, DL3, KM2, VBus/LAN.
- На базе последовательного порта: VBus/USB, USB-порт DeltaSol SLT и других контроллеров.

Этот адаптер ioBroker подключается к одному или нескольким аппаратным адаптерам на базе последовательного порта и предоставляет им доступ через TCP. Это позволяет:

- передача данных VBus на большие расстояния, чем обычно позволяют USB или последовательные порты
- доступ к адаптерам на основе последовательного порта из приложений, которые поддерживают только адаптеры на основе TCP.

## Конфигурация
Настраиваемые элементы:

— TCP-порт, на котором служба прослушивает входящие соединения.

По умолчанию используется порт: 7053, который не следует менять.

— HTTP-порт, на котором служба прослушивает запросы на обнаружение.

По умолчанию используется порт: 80, в качестве альтернативы можно выбрать порт 3000.

- Пароль шлюза VBus.

Обеспечивает доступ ко всем устройствам VBus, подключенным к последовательному порту. По умолчанию — «vbus».

- Список последовательных портов для подключения со следующими параметрами для каждого последовательного порта:

- канал: канал vbus, которому назначен последовательный порт.

Если вы хотите подключиться только к одному последовательному порту, рекомендуется настроить его на использование канала 0, поскольку большинство приложений по умолчанию будут пытаться подключиться к этому каналу 0.

- путь: путь к последовательному порту, например «/dev/tty.usbmodem141301» или «COM5».
- Скорость передачи: Скорость последовательного порта. По умолчанию установлено значение 9600, которое обычно не требует изменения.

## Известные вопросы
- Этот адаптер в настоящее время поддерживает до 3 устройств VBus, подключенных через последовательные порты.
- Пароли для всех VBus, подключенных к последовательным портам, одинаковы.
- Устройства, подключенные к VBus.net, не эмулируются. Отправка команды CONNECT (через тег) возвращает +OK, хотя соединение не установлено.
- Отправка команды DATA с выбранным несуществующим каналом возвращает +OK, но после этого соединение сразу же закрывается.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

### 0.0.4 (2023-10-03)

- (pdbjjens) New: Selectable discovery port
- (pdbjjens) New: Check for default password
- (pdbjjens) New: support for up to 3 serial ports

### 0.0.3 (2023-09-21)

- (pdbjjens) Fix: Disable SENTRY

## License

MIT License  
Copyright (c) 2024 Jens-Peter Jensen <jjensen@t-online.de>  
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