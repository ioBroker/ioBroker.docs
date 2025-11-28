---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cmicoe/README.md
title: ioBroker.cmicoe
hash: GgOdBJHikNsOHVmqZN1dQ/hCzXa6H+gkuRZOxCyJ3T8=
---
![Логотип](../../../en/adapterref/iobroker.cmicoe/admin/cmicoe.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.cmicoe.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cmicoe.svg)
![Количество установок](https://iobroker.live/badges/cmicoe-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/cmicoe-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.cmicoe.png?downloads=true)

# IoBroker.cmicoe
**Тесты:** ![Тестирование и выпуск](https://github.com/FreDeko06/ioBroker.cmicoe/workflows/Test%20and%20Release/badge.svg)

## Адаптер cmicoe для ioBroker
Адаптер для связи с [CMI от Technische Alternative через CoE](https://www.ta.co.at/x2-bedienung-schnittstellen/cmi)

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Это приложение является независимым продуктом и не связано с Technische Alternative, не одобрено и не спонсируется ею. Все товарные знаки, логотипы и фирменные наименования являются собственностью их соответствующих владельцев.
Это приложение разработано для работы с C.M.I., но не является официальным продуктом Technische Alternative. Совместимость со всеми версиями устройства не гарантируется.

## Настройка C.M.I.
### Включить CoE V2
В веб-интерфейсе C.M.I. перейдите в раздел «Настройки» > «CAN» и выберите `CoE V2 (4byte)` в качестве версии CoE.

### Настроить вывод
В веб-интерфейсе C.M.I. перейдите в раздел Настройки > Выходы > CoE и добавьте аналоговый или цифровой выход со следующими настройками:

#### IP
Введите IP-адрес сервера iobroker

#### Номер узла / Сетевой выход
Введите тот же номер, который вы указали в настройках входов адаптера.

## Настройка адаптера
### Настройки
#### Локальный IP
IP-адрес, iobroker прослушивает CoE-пакеты C.M.I.

#### Локальный порт
Порт, на котором iobroker прослушивает пакеты CoE через C.M.I.

По умолчанию C.M.I. отправляет все пакеты CoEv2 через порт 5442. **Этот адаптер поддерживает только CoE V2!**

#### IP-адрес C.M.I.
IP-адрес, на который iobroker отправляет CoE-пакеты

#### C.M.I. порт
Порт, iobroker отправляет CoE-пакеты в

#### Интервал отправки
Интервал в секундах, в течение которого все выходные данные отправляются в C.M.I.

#### Отправить при изменении
Если этот флажок установлен, адаптер также отправляет выходные данные при их изменении.

## Changelog
### 1.2.3 (2025-10-25)
* migrate to npm trusted publishing

### 1.2.2 (2025-10-18)
* added export/import to config tables

### 1.2.1 (2025-10-12)
* Bump @types/node to 24.7.2
* Bump @alcalzone/release-script-plugin-license to 4.0.0
* Bump rimraf to 6.0.1
* updated other dependencies
* fixed forbidden chars in ids

### 1.2.0 (2025-10-11)
* used iobroker prettier config
* changed title
* improved state roles and attributes
* limited send interval to 1 day
* fixed deletion of empty node channels
* removed old node string config

### 1.1.3 (2025-09-23)
* used @iobroker/eslint
* changed .vscode schema
* updated adapter-core dependency

### 1.1.2 (2025-09-23)
* fixed delete unused states

### 1.1.1 (2025-09-23)
* added logo
* upgrade to node 20
* updated dependencies

### 1.1.0 (2025-08-18)
* added units from https://fci.ta.co.at/docu/developer
* removed factors, decimals are computed automatically from the unit
* fixed problems with negative numbers

### 1.0.5 (2025-08-14)
* fixed layout

### 1.0.4 (2025-08-14)
* update dependencies

### 1.0.3 (2025-08-14)
* added factors to inputs/outputs settings
* update README

### 1.0.2 (2025-08-13)
* fixed degree, cubic meter symbol

### 1.0.1 (2025-08-13)
* fixed adapter crash on first start

### 1.0.0 (2025-08-13)
* improved config ui
* added support for units
* added support for names and descriptions for inputs/outputs
* BREAKING: state names now contain names from config

### 0.3.1 (2025-02-18)
* fix: negative values crashed adapter

### 0.3.0 (2025-02-17)
* added support for multiple messages in one packet (receiving and sending)
* added error handling

### 0.2.0 (2025-02-17)
* created bind and port options

### 0.1.2 (2025-02-17)
* downgrade to node 18
* create channel/devices before states
* performance improvements

### 0.1.1 (2025-02-16)
* improved log messages
* added log message if address/ip are already in use (probably two instances started)

### 0.1.0 (2025-02-16)
* (FreDeko) initial release

## License
MIT License

Copyright (c) 2025 FreDeko <freddegenkolb@gmail.com>

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