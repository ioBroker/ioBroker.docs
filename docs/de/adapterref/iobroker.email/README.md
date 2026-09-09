---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.email/README.md
title: ioBroker-E-Mail
hash: PM+MP5/oqCLY8KYLAw85V70xjz6H3xMVnI9JFCbQBKY=
---
![Logo](../../../en/adapterref/iobroker.email/admin/email.png)

![Anzahl der Installationen](http://iobroker.live/badges/email-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.email.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.email.svg)

# ioBroker-E-Mail

Senden Sie E-Mails von ioBroker. Mit diesem Adapter können Sie keine E-Mails abrufen, sondern nur senden.

Der Adapter verwendet [nodemailer](https://github.com/nodemailer/nodemailer) , um die Funktionalität bereitzustellen.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**WICHTIG:** Sollten beim Wechsel von Version 1.xx auf 2.xx Verbindungsprobleme auftreten, müssen Sie Ihre Zugangsdaten möglicherweise erneut eingeben.

## Hinweise zu E-Mail-Anbietern

### Gmail

**Wichtig:** Wenn Sie die Zwei-Faktor-Authentifizierung (2FA) für Ihr Gmail-Konto aktiviert haben, **müssen** Sie ein App-Passwort anstelle Ihres regulären Gmail-Passworts verwenden. Dies war für nodemailer bei Gmail mit 2FA schon immer erforderlich.

So richten Sie Gmail mit 2FA ein:

1. Aktivieren Sie die zweistufige Bestätigung in Ihren Google-Kontoeinstellungen.
2. Generieren Sie ein App-Passwort speziell für den ioBroker-E-Mail-Adapter.
3. Verwenden Sie Ihre Gmail-Adresse als Benutzernamen und das generierte App-Passwort als Passwort in der Adapterkonfiguration.

Bei Konten ohne Zwei-Faktor-Authentifizierung müssen Sie möglicherweise in Ihren Gmail-Kontoeinstellungen die Option „Weniger sichere Apps zulassen“ aktivieren. Außerdem müssen Sie Ihr Konto unter „Zugriff auf Ihr Google-Konto erlauben“ entsperren, um SMTP nutzen zu können.

### mail.ee

Verwenden Sie für den E-Mail-Dienst mail.ee **nicht** Ihre normalen Webmail-Anmeldedaten. Stattdessen:

- **Benutzername** : Verwenden Sie Ihre vollständige E-Mail-Adresse (z. B.`username@mail.ee` )
- **Passwort** : Verwenden Sie das spezielle IMAP/SMTP-Passwort (nicht Ihr Webmail-Passwort).
  - So finden Sie Ihr IMAP/SMTP-Passwort: Melden Sie sich in Ihrem mail.ee-Webmail-Konto an und besuchen Sie <https://posti.mail.ee/prefs?group=enable_pop3>

## Verwendung

Um eine E-Mail aus ScriptEngine zu versenden, geben Sie einfach Folgendes ein:

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

Um E-Mails von einem anderen Adapter zu senden, verwenden Sie`adapter.sendTo` Funktion.

## Unterstützte Dienste

- 1und1 / ionos
- AOL
- DebugMail.io
- DynacEmail
- FastMail
- GandiMail
- Gmail
- GoDaddy
- GoDaddyAsia
- GoDaddy Europa
- hot.ee
- Hotmail
- iCloud
- mit
- mail.ee
- Mail.ru
- Mailgun
- Mailjet
- Mandrill
- Naver
- Office365
- OpenMailBox
- Stempel
- QQ
- QQex
- SendCloud
- SendGrid
- SES
- SES-US-EAST-1
- SES-US-WEST-2
- SES-EU-WEST-1
- t-online.de
- Sparkpost
- Yahoo
- Yandex
- Zoho
- Benutzerspezifisch (Server, Port und Sicherheit manuell definiert)

Weitere Dienste finden Sie in der Dokumentation von **Nodemailer** :`[https://github.com/nodemailer/nodemailer](https://github.com/nodemailer/nodemailer)`

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@GermanBluefox) Migrated the build script (`tasks.js` => `tasks.mts`) to TypeScript
* (@GermanBluefox) Migrated blockly to TypeScript

### 3.0.0 (2026-08-03)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Adapter requires admin >= 8.0.0 now
* (copilot) Adapter requires js-controller >= 6.0.11 now
* (@copilot) Set up GitHub Copilot instructions with centralized ioBroker template (v0.5.7) and weekly monitoring workflow
* (@ipod86) Added configurable number of file attachments to the Blockly email block via plus/minus buttons
* (@GermanBluefox) Migrated to admin 8

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