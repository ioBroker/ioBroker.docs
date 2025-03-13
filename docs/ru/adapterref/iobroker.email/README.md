---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.email/README.md
title: ioBroker электронная почта
hash: ypVBzSrm5mbo+TfW0HK5vnJMZibj1ActmAB2k7PbHKA=
---
![Логотип](../../../en/adapterref/iobroker.email/admin/email.png)

![Количество установок](http://iobroker.live/badges/email-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.email.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker электронная почта
![Тест и выпуск](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Отправка писем из ioBroker. С помощью этого адаптера вы не можете проверять письма, только отправлять их.

Адаптер использует [nodemailer](https://github.com/nodemailer/nodemailer) для обеспечения функциональности.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Для использования Gmail вам может потребоваться настроить «Разрешить менее безопасные приложения» в вашей учетной записи Gmail, если вы не используете 2FA, в этом случае вам придется создать пароль для конкретного приложения. Вам также может потребоваться разблокировать свою учетную запись с помощью «Разрешить доступ к вашей учетной записи Google» для использования SMTP.

## Использование
Чтобы отправить электронное письмо из ScriptEngine, просто напишите:

```js
// send email to all instances of email adapter
sendTo('email', 'Email body');

// send email to specific instance of email adapter
sendTo("email.1", 'Email body');

// To specify subject or other options
sendTo('email', {
    from:    'iobroker@mydomain.com',
    to:      'aabbcc@gmail.com, xxyyzz@gmail.com', // comma separated multiple recipients.
    subject: 'Message from ioBroker',
    text:    'This is test email to you!',
});

// To send attachments
sendTo('email', {
    attachments: [
        {
            path: '/pathToImage/picture1.jpg', // use file on disk as attachment
        },
        {
            filename: 'license.txt',
            path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE', // use URL as an attachment
        },
    ]
});

// To send in html format
sendTo('email', {
    html: '<p>Embedded image: <img src='cid:image1'/></p>',
    attachments:[
        {
            path: 'path/to/file/image1.jpg',
            cid: 'image1',
        },
    ]
});
```

Чтобы отправить электронное письмо с другого адаптера, используйте функцию `adapter.sendTo`.

## Поддерживаемые услуги
- 1und1 / ионос
- АОЛ
- DebugMail.io
- DynectEmail
- Быстрая почта
- ГандиМейл
- Gmail
- Годэдди
- GodaddyAsia
- GodaddyEurope
- hot.ee
- Хотмейл
- iCloud
- ит
- mail.ee
- Mail.ru
- Почтовый пистолет
- Мэйлджет
- Мандрил
- Навер
- Офис365
- OpenMailBox
- Почтовый штемпель
- КК
- QQex
- SendCloud
- SendGrid
- СЭС
- ЮВС-США-ВОСТОК-1
- SES-US-WEST-2
- ЕЭП-ЕС-ЗАПАД-1
- Спаркпост
- Яху
- Яндекс
- Зохо
- Зависит от пользователя (сервер, порт и безопасность определяются вручную)

Для других служб см. документацию **Nodemailer**: `§§LLLLL_0§§`

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@GermanBluefox) Renamed `dist` folder to `build`

### 2.0.0 (2025-03-11)
* (@GermanBluefox) Breaking change: Structure of configuration was corrected, and it could be they needed to be reconfigured
* (@GermanBluefox) Made Outlook work again. Requires now to be authenticated via OAuth2
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now
* (mcm1957) EsLint uses @iobroker/linter-config now
* (mcm1957) Dependencies have been updated
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Added "Ignore SSL errors" option

### 1.4.0 (2024-11-17)
* (simatec) Responsive Design added
* (Jey-Cee) Admin-UI has been migrated to jsonConfig

### 1.3.1 (2024-06-09)
* (klein0r) Updated Blockly definitions

### 1.3.0 (2024-04-29)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.2.2 (2023-12-25)
* (foxriver76) trim host messages from notification-manager correctly

## License

The MIT License (MIT)

Copyright (c) 2014-2025 bluefox

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