---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.email/README.md
title: электронная почта ioBroker
hash: OCwy25hQr/7+CA/MUkCbY1CqRk1SW2ZZroC6I4SG/yA=
---
![Логотип](../../../en/adapterref/iobroker.email/admin/email.png)

![Количество установок](http://iobroker.live/badges/email-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.email.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker электронная почта
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Отправляйте письма из ioBroker. С помощью этого адаптера вы не сможете проверять письма, только отправлять их.

Адаптер использует [nodemailer](https://github.com/nodemailer/nodemailer) для обеспечения функциональности.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

## Примечания, касающиеся конкретного поставщика услуг электронной почты
### Gmail
**Важно:** Если в вашем аккаунте Gmail включена двухфакторная аутентификация (2FA), вам **необходимо** использовать пароль приложения вместо обычного пароля Gmail. Nodemailer всегда требовал этого для Gmail с двухфакторной аутентификацией.

Чтобы настроить Gmail с 2FA:

1. Включите двухэтапную аутентификацию в настройках вашего аккаунта Google.
2. Создайте пароль приложения специально для адаптера электронной почты ioBroker.
3. Используйте свой адрес Gmail в качестве имени пользователя и сгенерированный пароль приложения в качестве пароля в настройках адаптера.

Для учётных записей без двухфакторной аутентификации (2FA) вам может потребоваться включить функцию «Разрешить менее безопасные приложения» в настройках учётной записи Gmail. Также для использования SMTP может потребоваться разблокировать учётную запись, разрешив доступ к вашей учётной записи Google.

### Mail.ee
Для электронной почты mail.ee **не** используйте ваши обычные данные для входа в веб-почту. Вместо этого:

- **Имя пользователя**: используйте полный адрес электронной почты (например, `username@mail.ee`)
- **Пароль**: используйте специальный пароль IMAP/SMTP (не пароль вашей веб-почты)
- Чтобы узнать пароль IMAP/SMTP: войдите в свою учетную запись веб-почты mail.ee и перейдите на страницу [https://posti.mail.ee/prefs?group=enable_pop3](https://posti.mail.ee/prefs?group=enable_pop3)

## Использование
Чтобы отправить письмо из ScriptEngine, просто напишите:

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
- 1und1 / ionos
- АОЛ
- DebugMail.io
- DynectEmail
- Быстрая почта
- GandiMail
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
- Mailgun
- Мэйлджет
- Мандрил
- Навер
- Office365
- OpenMailBox
- Почтовый штемпель
- QQ
- QQex
- SendCloud
- SendGrid
- СЭС
- SES-US-EAST-1
- SES-US-WEST-2
- ЮЭС-ЕС-ЗАПАД-1
- t-online.de
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
### 2.0.5-alpha.0 (2025-10-06)
* (@copilot) Fixed SMTP relay anonymous access by ignoring user and password when empty
* (@copilot) Fixed Office365 OAuth email sending from scripts by ensuring fresh tokens are used
* (mcm1957) Dependencies have been updated

### 2.0.4 (2025-04-15)
* (@mcm1957) `From email address is not equal to the configured email address for authentication.` changed to debug level.
* (mcm1957) Dependencies have been updated

### 2.0.3 (2025-03-24)
* (@GermanBluefox) Added t-online.de to the list of supported services

### 2.0.2 (2025-03-14)
* (@GermanBluefox) Renamed `dist` folder to `build`
* (@GermanBluefox) Fixing pass decoding

### 2.0.0 (2025-03-11)
* (@GermanBluefox) Breaking change: Structure of configuration was corrected, and it could be they needed to be reconfigured
* (@GermanBluefox) Made Outlook work again. Requires now to be authenticated via OAuth2
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now
* (mcm1957) EsLint uses @iobroker/linter-config now
* (mcm1957) Dependencies have been updated
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Added "Ignore SSL errors" option

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