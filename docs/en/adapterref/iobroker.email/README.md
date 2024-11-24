![Logo](admin/email.png)
# ioBroker email

![Number of Installations](http://iobroker.live/badges/email-installed.svg)
![Number of Installations](http://iobroker.live/badges/email-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.email.svg)](https://www.npmjs.com/package/iobroker.email)

![Test and Release](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.email.svg)](https://www.npmjs.com/package/iobroker.email)

Send emails from ioBroker.

| :exclamation: This adapter currently does not support microsoft mail servers (Hotmail, Live.com, Office365 und Web-Outlook).  |
|-----------------------------------------|

The adapter uses [nodemailer](https://github.com/nodemailer/nodemailer) to provide the functionality.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

To use Gmail you may need to configure "Allow Less Secure Apps" in your Gmail account unless you are using 2FA in which
case you would have to create an Application Specific password. You also may need to unlock your account with "Allow access to your Google account" to use SMTP.


## Usage

To send email from ScriptEngine just write:

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

To send email from other adapter use **adapter.sendTo** function.


## Supported services
- 1und1 / ionos
- AOL
- DebugMail.io
- DynectEmail
- FastMail
- GandiMail
- Gmail
- Godaddy
- GodaddyAsia
- GodaddyEurope
- hot.ee
- Hotmail
- iCloud
- ith
- mail.ee
- Mail.ru
- Mailgun
- Mailjet
- Mandrill
- Naver
- Office365
- OpenMailBox
- Postmark
- QQ
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
- User specific (Server, port and security defined manually)

For other services see documentation of **Nodemailer**: `[https://github.com/nodemailer/nodemailer](https://github.com/nodemailer/nodemailer)`

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now
* (mcm1957) EsLint uses @iobroker/linter-config now
* (mcm1957) Dependencies have been updated

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

### 1.2.1 (2023-12-08)
 * (foxriver76) send the actual message too via notification-manager

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
