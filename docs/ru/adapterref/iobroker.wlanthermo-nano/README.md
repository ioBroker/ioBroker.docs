---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wlanthermo-nano/README.md
title: ioBroker.wlanthermo-нано
hash: dXyP552FUGUaw44ss0/iVFDKJq+ThYgA/ZrktqJLcXQ=
---
![логотип](../../../en/adapterref/iobroker.wlanthermo-nano/admin/wlanthermo-nano.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.wlanthermo-nano.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wlanthermo-nano.svg)
![Состояние зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.wlanthermo-nano.svg)
![Количество установок](http://iobroker.live/badges/wlanthermo-nano-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wlanthermo-nano/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wlanthermo-nano.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.wlanthermo-nano/master.svg)

# IoBroker.wlanthermo-nano
## Адаптер wlanthermo-nano для ioBroker
[WLANThermo Nano](https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki "WLANThermo Nano"), цифровое преимущество для вашего барбекю спорта

## Конфигурация
Адаптер можно установить и настроить в интерфейсе администратора.
Пожалуйста, введите IP-адрес, имя пользователя и пароль в конфигурации экземпляра.

## Сделать
* [] Оптимизировать настройки pitmaster, сделать состояния доступными для записи только в соответствующих режимах, в противном случае только для чтения
* [] Реализация автоматического определения устройства
* [] Реализация устройства в режиме онлайн
* [x] разрешить несколько устройств
* [] очистка кода

## Поддержите меня
Если вам нравится моя работа, пожалуйста, не стесняйтесь предоставить личное пожертвование (это личная ссылка на пожертвования для DutchmanNL, никакого отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.1.2
* (DutchmanNL) Support multiple devices

### 0.1.1
* (DutchmanNL) Code optimalisation
* (DutchmanNL) Implement state_attr.js to handle state options outside of source code
* (DutchmanNL) Optimised state creation in 1 function
* (DutchmanNL) Small cleanups

### 0.1.0
* (DutchmanNL) remove color settngs from pitmaster

### 0.0.9
* (DutchmanNL) optimize pid profile setting

### 0.0.8
* (DutchmanNL) fix post command for pitmaster

### 0.0.7
* (DutchmanNL) State unit fixes
* (DutchmanNL) start integration of pidmaster
* (DutchmanNL) rename  type  to modus for pitmaster

### 0.0.6
* (DutchmanNL) make type and alarm selectable with dropdown

### 0.0.5
* (DutchmanNL) add  capability to change sensors

### 0.0.4
* (DutchmanNL) Fix issue with password set
* (DutchmanNL) Implemented new states for config (reboot/update/checkupdate)
* (DutchmanNL) Change  configuration (way of ip-adress, also dyndns now supported)

### 0.0.3
* (DutchmanNL) implement secure storage of login credentials (required to enable setting changes later)

### 0.0.2
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda86@gmail.com>

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