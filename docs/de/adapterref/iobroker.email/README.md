---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.email/README.md
title: ioBroker-E-Mail
hash: V9ZiJFBBiK4b2VIceoFz0SVcAzIY1qvrSVAf/tgiaHY=
---
![Logo](../../../en/adapterref/iobroker.email/admin/email.png)

![Anzahl der Installationen](http://iobroker.live/badges/email-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.email.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker-E-Mail
![Testen und freigeben](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Senden Sie E-Mails von ioBroker.

Der Adapter verwendet [Knotenmailer](https://github.com/nodemailer/nodemailer), um die Funktionalität bereitzustellen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

Um Google Mail zu verwenden, müssen Sie möglicherweise "Weniger sichere Apps zulassen" in Ihrem Google Mail-Konto konfigurieren, es sei denn, Sie verwenden 2FA. In diesem Fall müssten Sie ein anwendungsspezifisches Passwort erstellen. Möglicherweise müssen Sie Ihr Konto auch mit „Zugriff auf Ihr Google-Konto zulassen“ entsperren, um SMTP verwenden zu können.

## Verwendungszweck
Um eine E-Mail von ScriptEngine zu senden, schreiben Sie einfach:

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

Um E-Mails von einem anderen Adapter zu senden, verwenden Sie die Funktion **adapter.sendTo**.

## Unterstützte Dienste
- 1und1 / ionos
- AOL
- DebugMail.io
- DynectEmail
-FastMail
- GandiMail
- Gmail
- Los Papa
- GodaddyAsia
- GodaddyEurope
- heiß.ee
- Heisse Mail
- iCloud
- mit
- mail.ee
-Mail.ru
- Mailgun
- Mailjet
- Mandrill
- Naver
- Büro 365
- OpenMailBox
- Poststempel
-QQ
- QQex
-SendCloud
- SendGrid
- SE
- SES-USA-OST-1
-SES-US-WEST-2
- SES-EU-WEST-1
- Sparkpost
- Yahoo
- Jandex
-Zoho
- Benutzerspezifisch (Server, Port und Sicherheit manuell definiert)

Für andere Dienste siehe Dokumentation von **Nodemailer**: `§§LLLLL_0§§`

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