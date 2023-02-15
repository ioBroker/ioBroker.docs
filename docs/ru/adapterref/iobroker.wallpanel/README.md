---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wallpanel/README.md
title: ioBroker.wallpanel
hash: 18e3WSSDTtMe3rpocCDe+eu15UCJCzhXxBsZN6PT/y0=
---
![Логотип](../../../en/adapterref/iobroker.wallpanel/admin/wallpanel.png)

![Релиз GitHub](https://img.shields.io/github/v/release/xXBJXx/ioBroker.wallpanel?include_prereleases&label=GitHub%20release&logo=github)
![версия NPM](https://img.shields.io/npm/v/iobroker.wallpanel.svg?logo=npm)
![загрузки NPM](https://img.shields.io/npm/dm/iobroker.wallpanel.svg?logo=npm)
![Установлен](https://iobroker.live/badges/wallpanel-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wallpanel-stable.svg)

# IoBroker.wallpanel
![Тестируйте и выпускайте](https://github.com/xXBJXx/ioBroker.wallpanel/workflows/Test%20and%20Release/badge.svg)

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо аффилированности или одобрения ими или связанными с ними аффилированными лицами! Этот личный проект осуществляется в развлекательных целях и не имеет коммерческих целей. **[Настенная панель](https://github.com/TheTimeWalker/wallpanel-android)**.

### Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.**\ Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см.
[Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Для адаптера требуется версия Node.js >= 16.x
## **Подробное описание можно найти [Документация по адаптеру](https://xxbjxx.github.io/wallpanel/)**
# Описание адаптера
![настенная панельАдаптер](../../../en/adapterref/iobroker.wallpanel/admin/media/wallpanelAdapter.png)

С помощью адаптера вы можете запросить несколько значений, таких как яркость и MQTT, а также уровень заряда батареи и еще несколько вещей,<br> запросите эти значения, записанные в состояниях, и они доступны.<br> Также можно отправить планшету несколько управляющих команд, например, изменить яркость или текущий URL.

В адаптер можно одновременно установить несколько планшетов, которые затем можно опрашивать один за другим и, конечно же, также можно контролировать.

### **Внимание, если вы устанавливаете приложение с GitHub, то вы устанавливаете его «из неизвестного источника», это может быть опасно при определенных обстоятельствах, поскольку приложение не было проверено на наличие вредоносных программ ни одним официальным источником.**

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