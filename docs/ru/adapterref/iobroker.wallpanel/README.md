---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wallpanel/README.md
title: ioBroker.wallpanel
hash: 8IZ7RZ71Bv/GJK63UmHbo/Z6E+HDKyBuHNYmO+/1duM=
---
![Логотип](../../../en/adapterref/iobroker.wallpanel/admin/wallpanel.png)

![Релиз GitHub](https://img.shields.io/github/v/release/xXBJXx/ioBroker.wallpanel?include_prereleases&label=GitHub%20release&logo=github)
![версия NPM](https://img.shields.io/npm/v/iobroker.wallpanel.svg?logo=npm)
![загрузки NPM](https://img.shields.io/npm/dm/iobroker.wallpanel.svg?logo=npm)
![Установлены](https://iobroker.live/badges/wallpanel-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wallpanel-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/xXBJXx/ioBroker.wallpanel/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.wallpanel.png?downloads=true)

# IoBroker.wallpanel
![Тестируйте и выпускайте](https://github.com/xXBJXx/ioBroker.wallpanel/workflows/Test%20and%20Release/badge.svg)

** Этот адаптер использует службу Sentry.io для автоматического сообщения мне как разработчику об исключениях и ошибках кода, а также о новых схемах устройств.
Подробнее смотрите ниже! [Часовой](#sentry)**

## Для адаптера требуется версия Node.js >= 16.x
## **Подробное описание можно найти [Документация по адаптеру](https://xxbjxx.github.io/wallpanel/)**
# Описание адаптера
![настенная панельАдаптер](../../../en/adapterref/iobroker.wallpanel/admin/media/wallpanelAdapter.png)

С помощью адаптера вы можете запросить несколько значений, таких как яркость и MQTT, а также уровень заряда батареи и еще несколько вещей,<br> запросите эти значения, записанные в состояниях, и они доступны.<br> Также можно отправить планшету несколько управляющих команд, например, изменить яркость или текущий URL.

В адаптер можно одновременно установить несколько планшетов, которые затем можно опрашивать один за другим и, конечно же, также можно контролировать.

Приложение больше не доступно в Play Store, но вы по-прежнему можете установить его с GitHub через APK + оригинал (версия для Play Store) ⇨ [старая версия](https://github.com/thecowan/wallpanel-android/releases) не находится в стадии дальнейшей разработки + новая версия в настоящее время только на GitHub ⇨ § §LLLLL_1§§ находится в стадии разработки.

### **Внимание, если вы устанавливаете приложение с GitHub, то вы устанавливаете его «из неизвестного источника», это может быть опасно при определенных обстоятельствах, поскольку приложение не было проверено на наличие вредоносных программ ни одним официальным источником.**
Вот еще ветка форума к этому адаптеру: [Сообщение на форуме](https://forum.iobroker.net/topic/36438/test-adapter-wallpanel)

## Часовой
### Что такое Sentry.io и что сообщается серверам этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор без какой-либо дополнительной информации о вас, имени электронной почты и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой.
Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

Дополнительные сведения и сведения о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)<br> Sentry Reporting используется из js-controller 3.0.

## Changelog
 <!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
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

### 0.3.6 (2022-05-30)
* (xXBJXx) preparation for release in ioBroker Repo. Adapter-Check issues processed

### 0.3.5 (2022-05-30)
* (xXBJXx) update Changelog and fixed type issues

## License
MIT License

Copyright (c) 2020-2022 xXBJXx <issi.dev.iobroker@gmail.com>

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