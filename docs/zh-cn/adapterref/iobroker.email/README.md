---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.email/README.md
title: ioBroker 电子邮件
hash: OCwy25hQr/7+CA/MUkCbY1CqRk1SW2ZZroC6I4SG/yA=
---
![标识](../../../en/adapterref/iobroker.email/admin/email.png)

![安装数量](http://iobroker.live/badges/email-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.email.svg)
![下载](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker 电子邮件
![测试和发布](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

从 ioBroker 发送电子邮件。您无法使用此适配器查看电子邮件，只能发送邮件。

适配器使用[节点邮件程序](https://github.com/nodemailer/nodemailer)来提供功能。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 电子邮件提供商具体说明
### Gmail
**重要提示**：如果您的 Gmail 帐户启用了双因素身份验证 (2FA)，则**必须**使用应用密码，而不是常规的 Gmail 密码。nodemailer 一直以来都要求启用 2FA 的 Gmail 必须使用应用密码。

要使用 2FA 设置 Gmail：

1. 在您的 Google 帐户设置中启用两步验证
2. 为 ioBroker 电子邮件适配器生成专用应用程序密码
3. 在适配器配置中使用您的 Gmail 地址作为用户名，并使用生成的 App Password 作为密码

对于未启用双重身份验证 (2FA) 的账户，您可能需要在 Gmail 账户设置中配置“允许安全性较低的应用”。您还需要通过“允许访问您的 Google 账户”解锁账户才能使用 SMTP。

###邮件.ee
对于 mail.ee 电子邮件服务，请勿使用您常用的网页邮件登录凭证。请改为：

- **用户名**：使用您的完整电子邮件地址（例如，`username@mail.ee`）
- **密码**：使用特殊的 IMAP/SMTP 密码（不是您的网络邮件密码）
- 要查找您的 IMAP/SMTP 密码：登录您的 mail.ee 网络邮件帐户并访问 [https://posti.mail.ee/prefs?group=enable_pop3](https://posti.mail.ee/prefs?group=enable_pop3)

＃＃ 用法
要从 ScriptEngine 发送电子邮件，只需输入：

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

要从另一个适配器发送电子邮件，请使用`adapter.sendTo` 函数。

## 支持的服务
- 1und1 / ionos
- 美国在线
- DebugMail.io
- Dynect电子邮件
-FastMail
- GandiMail
- Gmail
- 戈达迪
- GoDaddy亚洲
-Godaddy欧洲
- hot.ee
- Hotmail
- iCloud
- ith
- mail.ee
- Mail.ru
- 邮枪
- Mailjet
- 山魈
- Naver
-Office365
- OpenMailBox
- 邮戳
- QQ
- QQex
-SendCloud
- 发送网格
- SES
- SES-美国-东部-1
- SES-美国西部-2
- SES-欧盟-西部-1
- t-online.de
- Sparkpost
- 雅虎
- Yandex
- Zoho
- 用户特定（手动定义服务器、端口和安全性）

对于其他服务，请参阅 **Nodemailer** 的文档：`§§LLLLL_0§§`

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