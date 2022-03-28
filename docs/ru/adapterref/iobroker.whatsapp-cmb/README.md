---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: +4R0b4EKTxlIOP+ASeqLAdhQ4h9URBWifmI6ci2xrow=
---
![Логотип](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![Количество установок](http://iobroker.live/badges/whatsapp-cmb-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)

# IoBroker.whatsapp-cmb
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.whatsapp-cmb/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/whatsapp-cmb/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер whatsapp-cmb для ioBroker
Большое спасибо бесплатному сервису [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/), этот адаптер позволяет отправлять сообщения WhatsApp на себя или на другой номер.

**Примечание** : *Бесплатный API предназначен только для личного использования!*

### Конфигурация
*Следующая документация была скопирована со страницы [callmebot](https://www.callmebot.com/blog/free-api-whatsapp-messages/).*

Вам необходимо получить ключ API от бота перед использованием API:

- Добавьте номер телефона **+34 644 44 21 48** в свои телефонные контакты. (Назовите его как хотите.)
- Отправьте это сообщение «Я разрешаю callmebot отправлять мне сообщения» (на английском языке) новому созданному контакту (конечно, используя WhatsApp).
- Подождите, пока вы не получите сообщение `API активирован для вашего номера телефона. Ваш APIKEY 123123` от бота. Поскольку это все еще находится в стадии бета-тестирования, активация может занять до 2 минут.
- Сообщение WhatsApp от бота будет содержать ключ API, необходимый для отправки сообщений с использованием API.
- Теперь вы можете использовать API KEY в конфигурации ioBroker.

Пример: ![Пример](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Применение
Есть две возможности отправить сообщение:

- через `whatsapp-cmb.0.sendMessage`. Просто напишите текст в этом состоянии, и сообщение будет отправлено на номер по умолчанию, который был настроен в диалоге настроек.
- через сообщение от javascript-адаптера:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Блочный](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

Если вы хотите отправить смайлики, обратитесь к https://www.callmebot.com/uncategorized/how-to-use-emoticos-with-the-api/

<!-- Заполнитель для следующей версии (в начале строки):

### __РАБОТА ВЫПОЛНЯЕТСЯ__ -->

## Changelog
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

Copyright (c) 2020-2022 Bluefox <dogafox@gmail.com>

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