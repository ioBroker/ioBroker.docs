---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cmicoe/README.md
title: ioBroker.cmicoe
hash: cJRvP2RLxBZQpjizWE6RDCbnL0+2frib6wzjhxz22zs=
---
![Логотип](../../../en/adapterref/iobroker.cmicoe/admin/cmicoe.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.cmicoe.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cmicoe.svg)
![Количество установок](https://iobroker.live/badges/cmicoe-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/cmicoe-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.cmicoe.png?downloads=true)
![Тестирование и выпуск](https://github.com/FreDeko06/ioBroker.cmicoe/workflows/Test%20and%20Release/badge.svg)

# ioBroker.cmicoe

## адаптер cmicoe для ioBroker

Адаптер для связи с [CMI от Technische Alternative через CoE.](https://www.ta.co.at/x2-bedienung-schnittstellen/cmi)

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ

Данное приложение является независимым продуктом и не связано с компанией Technische Alternative, не одобрено ею и не спонсируется ею. Все товарные знаки, логотипы и фирменные наименования являются собственностью их соответствующих владельцев. Это приложение разработано для работы с CMI, но не является официальным продуктом Technische Alternative. Совместимость со всеми версиями устройства не гарантируется.

## Настройка CMI

### Включить CoE V2

В веб-интерфейсе CMI перейдите в раздел «Настройки» > «CAN» и выберите...`CoE V2 (4byte)` в версии CoE

### Настройка вывода

В веб-интерфейсе CMI перейдите в раздел «Настройки» > «Выходы» > «CoE» и добавьте аналоговый или цифровой выход со следующими параметрами:

#### IP

Введите IP-адрес сервера iobroker.

#### Номер узла / Выход сети

Введите то же число, которое вы указали в настройках входов адаптера.

## Настройка адаптера

### Настройки

#### Локальный IP-адрес

IP-адрес, по которому iobroker ожидает пакеты CoE от CMI

#### Местный порт

Порт iobroker прослушивает пакеты CoE от CMI.\
&#x20;По умолчанию CMI отправляет все пакеты CoEv2 через порт 5442.\
&#x20;**Этот адаптер поддерживает только CoE V2!**

#### IP-адрес CMI

IP-адрес, по которому iobroker отправляет пакеты CoE,

#### порт CMI

Порт iobroker отправляет пакеты CoE на

#### интервал отправки

Интервал в секундах, в течение которого все выходные данные отправляются в CMI.

#### отправить на изменение

Если этот параметр отмечен, адаптер также отправляет выходной сигнал при изменении значения.

## Changelog
### 1.3.1 (2026-07-06)
* update dependencies

### 1.3.0 (2026-05-14)
* update dependencies
* (copilot) Adapter requires node.js >= 22 now

### 1.2.5 (2026-04-01)
* update dependencies

### 1.2.4 (2025-12-13)
* bump @types/node to 25.0.1
* bump @tsconfig/node20 to 20.0.8
* bump glob
* bump actions/checkout to 6
* more dependency updates

### 1.2.3 (2025-10-25)
* migrate to npm trusted publishing

[Older changelogs can be found there](https://github.com/FreDeko06/ioBroker.cmicoe/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 FreDeko <freddegenkolb@gmail.com>

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