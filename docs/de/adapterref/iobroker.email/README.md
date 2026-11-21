---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.email/README.md
title: ioBroker-E-Mail
hash: XHxOkGba8ZmVQ7H0ZNFdBYOUTdU4maACXKitF3f39do=
---
![Logo](../../../en/adapterref/iobroker.email/admin/email.png)

![Anzahl der Installationen](https://iobroker.live/badges/email-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.email.svg)
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

- **Benutzername** : Verwenden Sie Ihre vollständige E-Mail-Adresse (z. B. `username@mail.ee`)
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

Um E-Mails von einem anderen Adapter zu senden, verwenden Sie `adapter.sendTo` Funktion.

`sendTo('email.0', 'help', {})` Antworten `{ help, commands }`: eine Beschreibung aller Nachrichten mit ihren Parametern für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren sowie die Liste aller Befehle mit `write` (ob der Befehl eine Wirkung hat, z. B. eine E-Mail versendet).

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
- GoDaddy Europe
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

Weitere Dienste finden Sie in der Dokumentation von **Nodemailer** : `[https://github.com/nodemailer/nodemailer](https://github.com/nodemailer/nodemailer)`

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