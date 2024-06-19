---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.email/README.md
title: ioBroker E-Mail
hash: m+iTfz/eu+K9plwOKiOxq6OVW/fN8GZGXpf8ViAawOk=
---
![Logo](../../../en/adapterref/iobroker.email/admin/email.png)

![Anzahl der Installationen](http://iobroker.live/badges/email-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.email.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker-E-Mail
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Senden Sie E-Mails von ioBroker.

Der Adapter verwendet [Knotenmailer](https://github.com/nodemailer/nodemailer), um die Funktionalität bereitzustellen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Um Gmail zu verwenden, müssen Sie möglicherweise „Weniger sichere Apps zulassen“ in Ihrem Gmail-Konto konfigurieren, es sei denn, Sie verwenden 2FA. In diesem Fall müssten Sie ein anwendungsspezifisches Passwort erstellen. Möglicherweise müssen Sie Ihr Konto auch mit „Zugriff auf Ihr Google-Konto zulassen“ entsperren, um SMTP verwenden zu können.

## Verwendung
Um eine E-Mail von ScriptEngine zu senden, schreiben Sie einfach:

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

Um E-Mails von einem anderen Adapter zu senden, verwenden Sie die Funktion **adapter.sendTo**.

## Unterstützte Dienste
- 1und1 / ionos
- AOL
- DebugMail.io
- DynectEmail
- FastMail
- GandiMail
- Google Mail
- Los Papa
- GodaddyAsia
- GodaddyEuropa
- heiß.ee
- Heisse Mail
- iCloud
- ich
- mail.ee
- Mail.ru
- Mailgun
- Mailjet
- Mandrill
- Navigation
- Büro 365
- OpenMailBox
- Poststempel
- Frage
- QQex
- SendCloud
- SendGrid
- SES
- SES-US-EAST-1
- SES-US-WEST-2
- SES-EU-WEST-1
- Sparkpost
- Yahoo
- Yandex
- Zoho
- Benutzerspezifisch (Server, Port und Sicherheit manuell definiert)

Weitere Dienste finden Sie in der Dokumentation von **Nodemailer**: `§§LLLLL_0§§`

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