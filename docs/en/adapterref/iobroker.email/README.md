![Logo](admin/email.png)
# ioBroker email

![Number of Installations](http://iobroker.live/badges/email-installed.svg)
![Number of Installations](http://iobroker.live/badges/email-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.email.svg)](https://www.npmjs.com/package/iobroker.email)

![Test and Release](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.email.svg)](https://www.npmjs.com/package/iobroker.email)

Send emails from ioBroker. You cannot check emails with this adapter, only send them.

The adapter uses [nodemailer](https://github.com/nodemailer/nodemailer) to provide the functionality.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

**IMPORTANT:**
You may have to enter your credentials once again when migrating from release 1.x.x to 2.x.x if you encounter connection problems. 

## Email Provider Specific Notes

### Gmail
**Important:** If you have Two-Factor Authentication (2FA) enabled on your Gmail account, you **must** use an App Password instead of your regular Gmail password. This has always been required by nodemailer for Gmail with 2FA.

To set up Gmail with 2FA:
1. Enable 2-Step Verification in your Google Account settings
2. Generate an App Password specifically for ioBroker email adapter
3. Use your Gmail address as username and the generated App Password as password in the adapter configuration

For accounts without 2FA, you may need to configure "Allow Less Secure Apps" in your Gmail account settings. You also may need to unlock your account with "Allow access to your Google account" to use SMTP.

### mail.ee
For mail.ee email service, **do not** use your normal webmail login credentials. Instead:

- **Username**: Use your complete email address (e.g., `username@mail.ee`)
- **Password**: Use the special IMAP/SMTP password (not your webmail password)
  - To find your IMAP/SMTP password: Log into your mail.ee webmail account and visit [https://posti.mail.ee/prefs?group=enable_pop3](https://posti.mail.ee/prefs?group=enable_pop3)

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

To send email from another adapter, use `adapter.sendTo` function.


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
- t-online.de
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
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (@copilot) Set up GitHub Copilot instructions with centralized ioBroker template (v0.5.7) and weekly monitoring workflow

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
* **IMPORTANT:** You may have to enter your credentials once again if you encounter connection problems. 
* (@GermanBluefox) Breaking change: Structure of configuration was corrected, and it could be they needed to be reconfigured
* (@GermanBluefox) Made Outlook work again. Requires now to be authenticated via OAuth2
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now
* (mcm1957) EsLint uses @iobroker/linter-config now
* (mcm1957) Dependencies have been updated
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Added "Ignore SSL errors" option

## License

The MIT License (MIT)


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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
