---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.email/README.md
title: электронная почта ioBroker
hash: XHxOkGba8ZmVQ7H0ZNFdBYOUTdU4maACXKitF3f39do=
---
![Логотип](../../../en/adapterref/iobroker.email/admin/email.png)

![Количество установок](https://iobroker.live/badges/email-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.email.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.email.svg)

# электронная почта ioBroker

Отправляйте электронные письма из ioBroker. С помощью этого адаптера вы не можете проверять электронные письма, только отправлять их.

Для обеспечения функциональности адаптер использует [Nodemailer](https://github.com/nodemailer/nodemailer) .

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

**ВАЖНО:** При переходе с версии 1.xx на 2.xx вам может потребоваться повторно ввести свои учетные данные, если возникнут проблемы с подключением.

## Примечания, касающиеся конкретного поставщика услуг электронной почты.

### Гмайл

**Важно:** если в вашей учетной записи Gmail включена двухфакторная аутентификация (2FA), вам **необходимо** использовать пароль приложения вместо обычного пароля Gmail. Для Gmail с 2FA приложение nodemailer всегда требовало этого.

Чтобы настроить Gmail с двухфакторной аутентификацией:

1. Включите двухфакторную аутентификацию в настройках своего аккаунта Google.
2. Создайте пароль приложения специально для почтового адаптера ioBroker.
3. В настройках адаптера используйте свой адрес Gmail в качестве имени пользователя, а сгенерированный пароль приложения — в качестве пароля.

Для учетных записей без двухфакторной аутентификации может потребоваться настроить параметр «Разрешить менее защищенные приложения» в параметрах вашей учетной записи Gmail. Также может потребоваться разблокировать вашу учетную запись, разрешив доступ к вашей учетной записи Google, чтобы использовать протокол SMTP.

### mail.ee

Для работы с почтовым сервисом mail.ee **не** используйте свои обычные учетные данные для входа в веб-почту. Вместо этого:

- **Имя пользователя** : Используйте свой полный адрес электронной почты (например, `username@mail.ee`)
- **Пароль** : Используйте специальный пароль IMAP/SMTP (а не пароль от вашей веб-почты).
  - Чтобы узнать свой пароль IMAP/SMTP: войдите в свою учетную запись веб-почты mail.ee и перейдите по ссылке <https://posti.mail.ee/prefs?group=enable_pop3>

## Использование

Для отправки электронных писем из ScriptEngine просто напишите:

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

Для отправки электронных писем с другого адаптера используйте `adapter.sendTo` функция.

`sendTo('email.0', 'help', {})` ответы `{ help, commands }`: описание всех сообщений с их параметрами для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов, а также список всех команд с `write` (Указывает, оказывает ли команда какое-либо воздействие, например, отправляет электронное письмо).

## Поддерживаемые услуги

- 1und1 / ionos
- АОЛ
- DebugMail.io
- DynectEmail
- FastMail
- ГандиМейл
- Гмайл
- Годадди
- GodaddyAsia
- GodaddyEurope
- hot.ee
- Hotmail
- iCloud
- сит
- mail.ee
- Mail.ru
- Почтовая пушка
- Mailjet
- Мандрилл
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
- SES-EU-WEST-1
- t-online.de
- Спаркпост
- Яху
- Яндекс
- Зоохо
- Настройки пользователя (сервер, порт и параметры безопасности задаются вручную)

Для получения информации о других сервисах см. документацию **Nodemailer** : `[https://github.com/nodemailer/nodemailer](https://github.com/nodemailer/nodemailer)`

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.2.0 (2026-11-19)
* (@GermanBluefox) Added the message `help`: a description of all messages for AI agents (e.g. pi-agent), and `common.supportedMessages.help`

### 3.1.2 (2026-11-16)
* (@GermanBluefox) Fixed build of the rules block (missing Emotion dependencies for MUI 9) and CI lint

### 3.1.1 (2026-11-15)
* (mcm1957) Adapter requires node.js >= 22.19.0, admin >= 8.1.0 and js-controller >= 7.2.4 now
* (mcm1957) Dependencies have been updated

### 3.1.0 (2026-10-26)
* (@GermanBluefox) Migrated the build script (`tasks.js` => `tasks.mts`) to TypeScript
* (@GermanBluefox) Migrated blockly to TypeScript
* (@GermanBluefox) Fixed Office365: emails sent from scripts or other adapters failed after the first email, because the access token was not refreshed (#653)
* (@GermanBluefox) A selected service has now priority over the stored host and port
* (@GermanBluefox) Fixed the translations of the settings dialog and added Ukrainian to the Blockly block
* (@GermanBluefox) The password is stored encrypted now and is not readable by other adapters. An existing password is encrypted automatically on the first start (#715)
* (@GermanBluefox) Renamed the option "Ignore SSL certificate errors" to "Check SSL certificate", because that is what it actually does
* (@GermanBluefox) Removed the unused dependency `googleapis`

### 3.0.0 (2026-08-03)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Adapter requires admin >= 8.0.0 now
* (copilot) Adapter requires js-controller >= 6.0.11 now
* (@copilot) Set up GitHub Copilot instructions with centralized ioBroker template (v0.5.7) and weekly monitoring workflow
* (@ipod86) Added configurable number of file attachments to the Blockly email block via plus/minus buttons
* (@GermanBluefox) Migrated to admin 8

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox

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