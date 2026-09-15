---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: lYtxUhl+rQUeHLNemk+zcyVV1CgJ01ScINDOgBXnsGI=
---
![Логотип](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![Количество установок](http://iobroker.live/badges/whatsapp-cmb-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.whatsapp-cmb/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/whatsapp-cmb/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)

# ioBroker.whatsapp-cmb

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## адаптер whatsapp-cmb для ioBroker

Огромное спасибо бесплатному сервису [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) , этот адаптер позволяет отправлять сообщения WhatsApp себе или на другой номер.

**Примечание** : _Бесплатный API предназначен только для личного использования!_

### Конфигурация

_Приведенная ниже документация скопирована со страницы [callmebot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) ._

Перед использованием API необходимо получить ключ API от бота:

- Добавьте номер телефона XXXX (актуальный номер можно найти на странице CallMeBot) в свои телефонные контакты. (Назовите его по своему усмотрению.)
- Отправить это сообщение`I allow callmebot to send me messages` (на английском языке) новому созданному контакту (разумеется, через WhatsApp).
- Подождите, пока не получите сообщение.`API Activated for your phone number. Your APIKEY is 123123` от бота. Поскольку это все еще находится на стадии бета-тестирования, активация может занять до 2 минут.
- В сообщении WhatsApp от бота будет содержаться ключ API, необходимый для отправки сообщений с использованием API.
- Теперь вы можете использовать ключ API в конфигурации ioBroker.

Пример:![Пример](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Использование

Существует два способа отправки сообщений:

- с помощью`whatsapp-cmb.0.sendMessage` Просто введите какой-нибудь текст в это поле, и сообщение будет отправлено на номер по умолчанию, который был настроен в диалоговом окне настроек.
- через сообщение от JavaScript-адаптера:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message', 
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Блокли](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

Если вы хотите отправлять смайлики, пожалуйста, обратитесь к <https://www.callmebot.com/uncategorized/how-to-use-emoticos-with-the-api/>

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 0.3.0 (2024-05-25)
* Important: Node.js 18 and js-controller 5.0.19 is required at least
* (Sneak-L8) Treats all response codes other than 200 as errors

### 0.2.3 (2022-08-29)
* (Apollon77) Refer to website for current phone number

### 0.2.2 (2022-03-27)
* (Apollon77) Fix message encoding

### 0.2.1 (2022-03-25)
* (Apollon77) Add Emoticons support
* (Apollon77) Add Sentry for crash reporting

### 0.1.6 (2020-08-31)
* (Apollon77) Fixed the error with the phone number

### 0.1.3 (2020-08-29)
* (bluefox) The documentation and translations were added.

### 0.0.1 (2020-08-27)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2024 Bluefox <dogafox@gmail.com>

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