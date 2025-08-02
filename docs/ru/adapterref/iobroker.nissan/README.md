---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nissan/README.md
title: ioBroker.nissan
hash: FbxmhAnuLWz2syQPO2VGYuM2z74lmRVrTUd5kZrMjuQ=
---
![Логотип](../../../en/adapterref/iobroker.nissan/admin/nissan.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.nissan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nissan.svg)
![Количество установок (последних)](https://iobroker.live/badges/nissan-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/nissan-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.nissan.svg)
![НПМ](https://nodei.co/npm/iobroker.nissan.png?downloads=true)

# IoBroker.nissan
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.nissan/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.**\ Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\ Отчеты Sentry используются, начиная с js-контроллера. 3.0.

##адаптер Nissan для ioBroker
С помощью адаптера Nissan вы можете запросить у вашего автомобиля Nissan последние данные, отобразить текущий статус аккумулятора и зарядки, текущее состояние климат-контроля, запустить или остановить климат-контроль, а также начать зарядку удаленно.

[Nissan Connect/информация о приложении](https://www.nissan.de/kunden/nissan-connect-apps.html)

## Форум
Не стесняйтесь следить за обсуждениями на немецком языке [форум iobroker](https://forum.iobroker.net/topic/46700/test-adapter-nissan-v-0-0-x).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (bolliy) Dependency and configuration updates
- (bolliy) Added Admin 5 configuration
- (bolliy) ConnectEV: Update status before reading cachedeStatus
- (bolliy) improve State roles and types

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

Copyright (c) 2021-2024 TA2k <tombox2020@gmail.com>

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
