---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.email/README.md
title: электронная почта ioBroker
hash: m+iTfz/eu+K9plwOKiOxq6OVW/fN8GZGXpf8ViAawOk=
---
![Логотип](../../../en/adapterref/iobroker.email/admin/email.png)

![Количество установок](http://iobroker.live/badges/email-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.email.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.email.svg)

# Адрес электронной почты ioBroker
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Отправляйте электронные письма от ioBroker.

Адаптер использует [почтовая программа узла](https://github.com/nodemailer/nodemailer) для обеспечения функциональности.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

Чтобы использовать Gmail, вам может потребоваться настроить «Разрешить менее безопасные приложения» в вашей учетной записи Gmail, если только вы не используете 2FA, и в этом случае вам придется создать пароль для конкретного приложения. Вам также может потребоваться разблокировать свою учетную запись с помощью параметра «Разрешить доступ к вашей учетной записи Google», чтобы использовать SMTP.

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

Чтобы отправить электронную почту с другого адаптера, используйте функцию **adapter.sendTo**.

## Поддерживаемые услуги
- 1und1/ионос
- АОЛ
- DebugMail.io
- Электронная почта Динекта
- ФастПочта
- ГандиПочта
- Gmail
- Годадди
- ГодаддиАзия
- GodaddyЕвропа
- hot.ee
- Горячая почта
- iCloud
- это
- mail.ee
- Mail.ru
- Почтовый пистолет
- Мэйлджет
- Мандрил
- Навер
- Офис365
- OpenMailBox
- Почтовый штемпель
- QQ
- QQex
- ОтправитьОблако
- ОтправитьГрид
- СЭС
- SES-US-EAST-1
- SES-US-WEST-2
- СЭС-ЕС-ЗАПАД-1
- Спаркпост
- Яху
- Яндекс
- Зохо
- Зависит от пользователя (сервер, порт и безопасность определяются вручную)

Информацию о других службах см. в документации **Nodemailer**: `§§LLLLL_0§§`.

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.3.1 (2024-06-09)
* (klein0r) Updated Blockly definitions

### 1.3.0 (2024-04-29)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.2.2 (2023-12-25)
* (foxriver76) trim host messages from notification-manager correctly

### 1.2.1 (2023-12-08)
 * (foxriver76) send the actual message too via notification-manager

### 1.2.0 (2023-06-02)
* (foxriver76) support [Notification Manager](https://github.com/foxriver76/ioBroker.notification-manager)

## License

The MIT License (MIT)

Copyright (c) 2014-2024 bluefox

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