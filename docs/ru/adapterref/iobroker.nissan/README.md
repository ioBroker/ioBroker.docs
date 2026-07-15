---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nissan/README.md
title: ioBroker.nissan
hash: af3Tfnb0rFKT6ZGLso/XfB+KB0Tt+b3H0sjQmWHoYUU=
---
![Логотип](../../../en/adapterref/iobroker.nissan/admin/nissan.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.nissan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nissan.svg)
![Количество установок (последние)](https://iobroker.live/badges/nissan-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/nissan-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.nissan.png?downloads=true)

# IoBroker.nissan
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.nissan/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Адаптер Nissan для ioBroker
С помощью адаптера Nissan вы можете запрашивать у своего автомобиля Nissan самые свежие данные, отображать текущее состояние батареи и зарядки, текущее состояние системы климат-контроля, запускать или останавливать климат-контроль и дистанционно запускать зарядку.

[Информация о приложении Nissan Connect](https://www.nissan.de/kunden/nissan-connect-apps.html)

## Форум
Не стесняйтесь следить за обсуждениями в немецком разделе [форум iobroker](https://forum.iobroker.net/topic/46700/test-adapter-nissan-v-0-0-x)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.17 (2026-03-14)
- (bolliy) dependency and configuration updates

### 0.1.17-alpha.0 (2025-11-22)
- (bolliy) dependency and configuration updates
- (booliy) NPM: migration to trusted publishing

### 0.1.16 (2025-07-03)
- (bolliy) dependency and configuration updates
- (bolliy) ConnectEV: update API endpoint and enhance password encryption method

### 0.1.15 (2025-02-22)
- (bolliy) dependency and configuration updates
- (bolliy) ConnectEV: Unset user-agent

### 0.1.14 (2025-01-16)

- fix for nissan ev login

### 0.1.13 (2024-11-22)

- battery status v2 moved to to batter-statusv2 object folder

### 0.1.7 (2024-11-11)

- battery status fixed

### 0.1.6 (2024-11-01)

- (bolliy) dependency and configuration updates
- (bolliy) Requirements from ioBroker Check and Service Bot
- (bolliy) dependency and configuration updates

### 0.1.4 (2024-07-07)

- (bolliy) dependency and configuration updates
- (bolliy) breaking change: added Admin 5 configuration
- (bolliy) ConnectEV: update status before reading cachedeStatus
- (bolliy) improve State roles and types
- (bolliy) ConnectEV: update Blowfish v4.1

### 0.1.2 (2024-05-31)

- Refresh Token fix

### 0.1.1 (2024-05-20)

- Login fixed.

### 0.1.0 (2024-05-18)

- login fixed

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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