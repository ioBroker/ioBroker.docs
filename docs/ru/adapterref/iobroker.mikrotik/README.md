---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mikrotik/README.md
title: без заголовка
hash: 5wkEfDIZsK7dzAgyhr+x4qsYKxaEOKdIRMBDIMhm/DA=
---
![Логотип](../../../en/adapterref/iobroker.mikrotik/admin/mikrotik_admin.png) ioBroker MikroTik Router адаптер

![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

================

## С использованием
### Add_firewall
Добавьте адрес в список брандмауэра и включите.
например `name,127.0.0.1,comment`.

### Raw Отправить команду api в mikrotik, результат выполнения будет получен в объекте `mikrotik.0.commands.response`, например: `/ip/firewall/address-list/add\n=list=2vpn\n=address=195.82.146.0/24\n=comment=rutracker.org`. ИЛИ `ip/firewall/address-list/add list=FuckRKN address=195.82.146.0/24 comment=rutracker.org``ip/kid-control/print``ip/kid-control/pause .id=*1` `ip/kid-control/resume .id=*1`
### Перезагрузка, выключение перезагрузка / выключение микротика
### Usb_reset Сброс питания USB в микротике
*Созданные объекты не удаляются автоматически при удалении в роутере.*

## Changelog

#### 1.0.16
* (instalator) changed parse RAW

#### 1.0.14
* (instalator) added CAPsMAN [issues#28](https://github.com/instalator/ioBroker.mikrotik/issues/33)

#### 1.0.13
* (instalator) changed parse RAW command
* (instalator) added last-link-up-time and last-link-down-time to interface
* (instalator) added [issues#28](https://github.com/instalator/ioBroker.mikrotik/issues/31)

#### 1.0.12
* (instalator) fixed error symb

#### 1.0.11
* (instalator) fixed [issues#28](https://github.com/instalator/ioBroker.mikrotik/issues/28)

#### 1.0.10
* (instalator) added name object
* (instalator) fix error

#### 1.0.6
* (instalator) added in interface RX/TX (packets) [issues#20](https://github.com/instalator/ioBroker.mikrotik/issues/20)
* (instalator) Added Support for Compact mode
* (instalator) Refactoring

#### 1.0.5
* (instalator) Update Login Protocol [issues#23](https://github.com/instalator/ioBroker.mikrotik/issues/23)

#### 1.0.4
* (instalator) fix add_firewall command [issues#18](https://github.com/instalator/ioBroker.mikrotik/issues/18#issue-358331248)

#### 1.0.3
* (instalator) added checkboxes - receive the following data

#### 1.0.2
* (bondrogeen) added support for the Admin 3
* (instalator) fixed some bugs
* (instalator) added in settings time polling

#### 1.0.1
* (instalator) Change in objects symbol "*" to "_", see [issues#10](https://github.com/instalator/ioBroker.mikrotik/issues/10)
* (instalator) fix [issues#9](https://github.com/instalator/ioBroker.mikrotik/issues/9)
* (instalator) add to settings Timeout get
* (instalator) add firewall list [issues#7](https://github.com/instalator/ioBroker.mikrotik/issues/7) and command 'add_firewall' e.g. "name,127.0.0.1,comment"

#### 1.0.0
* (instalator) up to stable

#### 0.0.20
* (instalator) add mask for password in settings dialog
* (instalator) added info error login or password

#### 0.0.12
* (instalator) change logic connect

#### 0.0.11
* (instalator) added WAN address to systeminfo

#### 0.0.10
* (instalator) change logo
* (instalator) fix error

#### 0.0.4
* (instalator) added commands usb power reset
* (instalator) fix error

#### 0.0.2
* (instalator) added command 'disbled ' for: filter, interface, filter nat.
* (instalator) fix error
* (instalator) added list dhcp and wifi client

#### 0.0.1
* (instalator) initial version

## License

The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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