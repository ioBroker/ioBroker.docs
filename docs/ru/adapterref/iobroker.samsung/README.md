---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.samsung/README.md
title: без названия
hash: BK9hDp4J6hHfVw5dRktWIEpQEXoEKFWMJlYpwg2+Lbk=
---
![Логотип](../../../en/adapterref/iobroker.samsung/admin/samsung.png)

![Количество установок](http://iobroker.live/badges/samsung-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.samsung.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.samsung/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/samsung/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.samsung.svg)

### ioBroker.samsung

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

**Важное примечание для пользователей Windows: для работы этого адаптера требуется установленный в системе Git.**

#### Описание

Адаптер для телевизоров Samsung

### Первоначальное создание

Этот адаптер был первоначально создан @soef по адресу <https://github.com/soef/ioBroker.samsung> , но больше не поддерживается, поэтому мы перенесли его в iobroker-community для исправления ошибок. Спасибо @soef за его работу. С тех пор адаптер был расширен jogibear9988 и mwp007 с добавлением новых API.

#### Конфигурация

Введите IP-адрес вашего телевизора Samsung. Выберите API: Samsung Remote - телевизоры до 2014 года. После установки необходимо подтвердить новое подключение на вашем телевизоре. Samsung HJ - 2014 и 2015 годы. После первого подключения необходимо ввести PIN-код, отображаемый на вашем телевизоре. Samsung2016 - объяснение от первого лица. SamsungTV - телевизоры Tizen после 2016 года.

#### Требования

Телевизор Samsung<br> Серия HJ протестирована мной на UE55HU7200. Поддержка устройств с 2016 года экспериментальная. Если что-то не работает, смотрите лог.

<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 0.7.0 (2026-02-14)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 0.6.1 (2024-09-28)
* (marian-t-web-de) Sending a key to TV logged an error [#210]
* (marian-t-web-de) Error connecting to Samsung HJ Series TV has been fixed [#202] [#138]
* (mcm1957) Dependencies have been updated

### 0.6.0 (2024-05-24)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Adapter uses adapter-core now
* (Apollon77) Only Wake-On-Lan SamsungTVs on adapterstart if no token is configured
* (mcm1957) Dependencies have been updated

### 0.5.11 (2022-06-02)
* (Apollon77) Optimize checkOnOff logic on adapter start

### 0.5.10 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/iobroker.samsung/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2017 soef <soef@gmx.net>, 2018-2022 ioBroker Community

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