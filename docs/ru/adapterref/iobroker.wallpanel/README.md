---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wallpanel/README.md
title: ioBroker.wallpanel
hash: dqOQcx3Xcl7ykjFlFKt+YFjcFyUJI/6vs2R/sWx0bts=
---
![Логотип](../../../en/adapterref/iobroker.wallpanel/admin/wallpanel.png)

![Релиз на GitHub](https://img.shields.io/github/v/release/xXBJXx/ioBroker.wallpanel?include_prereleases&label=GitHub%20release&logo=github)
![Версия NPM](https://img.shields.io/npm/v/iobroker.wallpanel.svg?logo=npm)
![Загрузка NPM](https://img.shields.io/npm/dm/iobroker.wallpanel.svg?logo=npm)
![Установлено](https://iobroker.live/badges/wallpanel-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/wallpanel-stable.svg)
![Тестирование и выпуск](https://github.com/xXBJXx/ioBroker.wallpanel/workflows/Test%20and%20Release/badge.svg)

# ioBroker.wallpanel

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ

Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи или одобрения с ними или связанными с ними компаниями! Этот личный проект осуществляется в развлекательных целях и не преследует никаких коммерческих целей. **[WallPanel](https://github.com/TheTimeWalker/wallpanel-android)** .

### Часовой

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.**\
&#x20;Для получения более подробной информации и сведений о том, как отключить отчеты об ошибках, см. [документацию по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Отчеты Sentry используются начиная с версии js-controller 3.0.

## Для работы адаптера требуется версия Node.js >= 16.x.

## **Подробное описание можно найти [в документации к адаптеру.](https://xxbjxx.github.io/wallpanel/)**

# Описание адаптера

![адаптер для настенной панели](../../../en/adapterref/iobroker.wallpanel/admin/media/wallpanelAdapter.png)

С помощью адаптера можно запрашивать некоторые параметры, такие как яркость и информацию из MQTT, а также уровень заряда батареи и еще кое-что.<br> Запросите значения, записанные в состояниях, и они станут доступны.<br> Также можно отправлять на планшет несколько команд управления, например, регулировать яркость или изменять текущий URL-адрес.

В адаптер можно одновременно подключить несколько планшетов, которые затем можно запрашивать информацию о каждом из них по очереди и, конечно же, управлять ими.

### **Внимание! Если вы устанавливаете приложение с GitHub, то делаете это «из неизвестного источника». В определенных обстоятельствах это может быть опасно, поскольку приложение не было проверено на наличие вредоносного ПО ни одним официальным источником.**

## Changelog
 <!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
### 0.3.11 (2023-02-06)
* (xXBJXx) Dependencies updated

### 0.3.10 (2022-12-23)
* (xXBJXx) update dependencies
* (xXBJXx) update to new React library for UI

### 0.3.9 (2022-10-02)
* (xXBJXx) dependencies updated 
* (xXBJXx) Moved global variable to constructor

### 0.3.8 (2022-07-02)
* (xXBJXx) removed the play Store Link and added the GitHub Link to the new version and add a Warning for the Installer from GitHub.
* (xXBJXx) optimized the code
* (xXBJXx) dependencies updated
* (xXBJXx) Leave the device switched off when creating Problem solved

### 0.3.7 (2022-06-06)
* (xXBJXx) Node version support set to >= v16.x because of new features of Node.js that are needed.
* (xXBJXx) fixed mqtt topic Display Direction

## License
MIT License

Copyright (c) 2020-2023 xXBJXx <issi.dev.iobroker@gmail.com>

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