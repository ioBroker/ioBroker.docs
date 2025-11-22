---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.email/README.md
title: ioBroker-E-Mail
hash: OCwy25hQr/7+CA/MUkCbY1CqRk1SW2ZZroC6I4SG/yA=
---
![Logo](../../../en/adapterref/iobroker.email/admin/email.png)

![Anzahl der Installationen](http://iobroker.live/badges/email-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.email.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker-E-Mail
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Senden Sie E-Mails von ioBroker. Sie können mit diesem Adapter keine E-Mails abrufen, sondern nur senden.

Der Adapter verwendet [Knotenmailer](https://github.com/nodemailer/nodemailer), um die Funktionalität bereitzustellen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## E-Mail-Anbieterspezifische Hinweise
### Google Mail
**Wichtig:** Wenn Sie die Zwei-Faktor-Authentifizierung (2FA) für Ihr Gmail-Konto aktiviert haben, **müssen** Sie anstelle Ihres regulären Gmail-Passworts ein App-Passwort verwenden. Dies war von nodemailer für Gmail mit 2FA schon immer erforderlich.

So richten Sie Gmail mit 2FA ein:

1. Aktivieren Sie die Bestätigung in zwei Schritten in Ihren Google-Kontoeinstellungen
2. Generieren Sie ein App-Passwort speziell für den ioBroker-E-Mail-Adapter
3. Verwenden Sie Ihre Gmail-Adresse als Benutzernamen und das generierte App-Passwort als Passwort in der Adapterkonfiguration

Für Konten ohne 2FA müssen Sie möglicherweise in Ihren Gmail-Kontoeinstellungen die Option „Weniger sichere Apps zulassen“ konfigurieren. Möglicherweise müssen Sie Ihr Konto auch mit „Zugriff auf Ihr Google-Konto zulassen“ entsperren, um SMTP verwenden zu können.

### Mail.ee
Verwenden Sie für den E-Mail-Dienst mail.ee **nicht** Ihre normalen Webmail-Anmeldedaten. Stattdessen:

- **Benutzername**: Verwenden Sie Ihre vollständige E-Mail-Adresse (z. B. „Benutzername@mail.ee“)
- **Passwort**: Verwenden Sie das spezielle IMAP/SMTP-Passwort (nicht Ihr Webmail-Passwort)
- So finden Sie Ihr IMAP/SMTP-Passwort: Melden Sie sich bei Ihrem mail.ee-Webmail-Konto an und besuchen Sie [https://posti.mail.ee/prefs?group=enable_pop3](https://posti.mail.ee/prefs?group=enable_pop3)

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

Um E-Mails von einem anderen Adapter zu senden, verwenden Sie die Funktion `adapter.sendTo`.

## Unterstützte Dienste
- 1und1 / ionos
- AOL
- DebugMail.io
- DynectEmail
- FastMail
- GandiMail
- Google Mail
- GoDaddy
- GodaddyAsia
- GodaddyEurope
- hot.ee
- Hotmail
iCloud
- ich
- mail.ee
- Mail.ru
- Mailgun
Mailjet
- Mandrill
- Naver
Office365
- OpenMailBox
- Poststempel
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

Weitere Dienste finden Sie in der Dokumentation von **Nodemailer**: `§§LLLLL_0§§`

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