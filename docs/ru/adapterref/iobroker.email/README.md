---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.email/README.md
title: электронная почта ioBroker
hash: V9ZiJFBBiK4b2VIceoFz0SVcAzIY1qvrSVAf/tgiaHY=
---
![Логотип](../../../en/adapterref/iobroker.email/admin/email.png)

![Количество установок](http://iobroker.live/badges/email-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.email.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.email.svg)

# Электронная почта ioBroker
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Отправляйте электронные письма от ioBroker.

Адаптер использует [узел почты](https://github.com/nodemailer/nodemailer) для обеспечения функциональности.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Чтобы использовать Gmail, вам может потребоваться настроить «Разрешить менее безопасные приложения» в вашей учетной записи Gmail, если вы не используете 2FA, и в этом случае вам нужно будет создать пароль для конкретного приложения. Вам также может потребоваться разблокировать свою учетную запись с помощью «Разрешить доступ к вашей учетной записи Google», чтобы использовать SMTP.

## Использование
Чтобы отправить электронное письмо из ScriptEngine, просто напишите:

```
// send email to all instances of email adapter
sendTo("email", "Email body");

// send email to specific instance of email adapter
sendTo("email.1", "Email body");

// To specify subject or other options
sendTo("email", {
    from:    "iobroker@mydomain.com",
    to:      "aabbcc@gmail.com, xxyyzz@gmail.com", // comma separated multiple recipients.
    subject: "Message from ioBroker",
    text:    "This is test email to you!"
});

// To send attachments
sendTo("email", {
    attachments: [
       // use file on disk as attachment
       {path: "/pathToImage/picture1.jpg"},
       {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
       }
    ]
});

// To send in html format
sendTo("email", {
    html: "<p>Embedded image: <img src='cid:image1'/></p>",
    attachments:[
        {path: "path/to/file/image1.jpg", cid: "image1"}
    ]
});
```

Для отправки электронной почты с другого адаптера используйте функцию **adapter.sendTo**.

## Поддерживаемые сервисы
- 1унд1 / ионос
- АОЛ
- DebugMail.io
- DynecEmail
- Быстрая почта
- Гандимейл
- Gmail
- Годадди
- ГодаддиАзия
- GodaddyЕвропа
- hot.ee
- Горячая почта
- айклауд
- ит
- mail.ee
- Mail.ru
- Почтовый пистолет
- Мэйджет
- Мандрил
- Навер
- Офис365
- Открытый почтовый ящик
- Почтовый штемпель
- QQ
- QQex
- Отправить облако
- SendGrid
- СЭС
- СЭС-УС-ВОСТОК-1
- СЭС-УС-ЗАПАД-2
- СЭС-ЕС-ЗАПАД-1
- Спаркпост
- Yahoo
- Яндекс
- Зохо
- Пользовательский (сервер, порт и безопасность определяются вручную)

Информацию о других службах см. в документации **Nodemailer**: `§§LLLLL_0§§`

## Changelog
### 1.1.0 (2022-05-11)
* (Apollon77) Adjust default settings for web.de and 1und1 and add ionos
* (Apollon77) Add "Always use STARTTLS" option for custom SMTP settings

### 1.0.10 (2021-07-06)
* (Apollon77) Optimize for js-controller 3.3

### 1.0.9 (2021-02-22)
* (Apollon77) Call message callback always with error or without

### 1.0.7 (2020-06-11)
* (Apollon77) Make sure adapter is not crashing on stop in some edge cases
* (Apollon77) Add Sentry for crash reporting with js-controller >=3.x

### 1.0.6 (2019-12-29)
* (bluefox) Compact mode supported

### 1.0.5 (2019-09-18)
* (Apollon77/bluefox) js-controller 2.0 compatibility, dependency updates

### 1.0.4 (2018-03-26)
* (skraw.iobroker) Add ith

### 1.0.3 (2018-03-04)
* (bluefox) fix blockly
* (bluefox) Admin3 ready

### 1.0.2 (2017-01-31)
* (instalator) fix translations

### 1.0.1 (2016-12-20)
* (bluefox) add Office365

### 1.0.0 (2016-10-12)
* (bluefox) support of blockly

### 0.2.1 (2016-09-03)
* (bluefox) fix sending emails after first one

### 0.2.0 (2016-08-29)
* (bluefox) filter out double messages
* (bluefox) use new nodemailer packet

### 0.1.2 (2015-04-30)
* (bluefox) fix settings if "user defined" was selected

### 0.1.1 (2015-04-28)
* (bluefox) update configuration page and decode errors

### 0.1.0 (2015-01-02)
* (bluefox) prepare npm

### 0.0.4 (2014-11-2)
(bluefox) support of new naming concept

### 0.0.3 (2014-10-09)
* (bluefox) support of daemon mode
* (bluefox) add Gruntfile.js

## License

The MIT License (MIT)

Copyright (c) 2014-2022 bluefox

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