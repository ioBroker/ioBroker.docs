---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.samsung/README.md
title: без заголовка
hash: yV2UJS2q2NC3u9uj++eNNGbe8+MrMbJdbL2+4YYtkvI=
---
![Логотип](../../../en/adapterref/iobroker.samsung/admin/samsung.png)

![Количество установок](http://iobroker.live/badges/samsung-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.samsung.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.samsung.svg)

### IoBroker.samsung
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.samsung/workflows/Test%20and%20Release/badge.svg) <!-- [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/samsung/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) -->

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

**Важное примечание для пользователей Windows: для этого адаптера требуется установка git во всей системе**

#### Описание
Адаптер для телевизоров Samsung.

### Первоначальное создание
Этот адаптер изначально был создан @soef по адресу https://github.com/soef/ioBroker.samsung, но больше не поддерживается, поэтому мы переместили его в iobroker-community, чтобы можно было исправить ошибки. спасибо @soef за его работу.
С тех пор адаптер был расширен jogibear9988 и mwp007 дополнительным API.

#### Конфигурация
Введите IP вашего телевизора Samsung.
Выберите свой API: Samsung Remote — телевизоры до 2014 года. После установки вам необходимо подтвердить новое подключение на вашем телевизоре. Samsung HJ — 2014 и 2015 годов. После первого подключения вам необходимо ввести PIN-код, показанный на вашем телевизоре.
Samsung2016 - самообъясняющее SamsungTV - Телевизоры Tizen после 2016 года

#### Требования
телевизор Самсунг<br> Серия HJ проверена мной на UE55HU7200. Поддержка устройств с 2016 года экспериментальная, если что-то не работает, посмотрите в журнале.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.0 (2024-05-24)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Adapter uses adapter-core now
* (Apollon77) Only Wake-On-Lan SamsungTVs on adapterstart if no token is configured
* (mcm1957) Dependencies have been updated

### 0.5.11 (2022-06-02)
* (Apollon77) Optimize checkOnOff logic on adapter start

### 0.5.10 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.9 (2022-05-27)
* (Apollon77) fix crash when initializing a SamsungTV (Tizen)

### 0.5.8 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

## License
The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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
