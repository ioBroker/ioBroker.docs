---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.email/README.md
title: ioBroker 电子邮件
hash: Ov4aLJqCZXW3HxuRV6bwJO5tYF3Tev0m8wEdJq4E7zI=
---
![标识](../../../en/adapterref/iobroker.email/admin/email.png)

![安装数量](http://iobroker.live/badges/email-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.email.svg)
![下载](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker 电子邮件
![测试与发布](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

使用 ioBroker 发送电子邮件。此适配器只能发送邮件，不能查看邮件。

该适配器使用[节点邮件](https://github.com/nodemailer/nodemailer)来提供功能。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

**重要提示：**如果您在从 1.x.x 版本迁移到 2.x.x 版本时遇到连接问题，可能需要再次输入您的凭据。

## 电子邮件提供商特定说明
### Gmail
**重要提示：**如果您在 Gmail 帐户上启用了双重验证 (2FA)，则**必须**使用应用密码，而不是您的常规 Gmail 密码。nodemailer 一直以来都要求启用了 2FA 的 Gmail 用户必须这样做。

设置 Gmail 双重验证：

1. 在您的 Google 帐户设置中启用两步验证
2. 专门为 ioBroker 电子邮件适配器生成应用密码
3. 在适配器配置中，使用您的 Gmail 地址作为用户名，使用生成的应用程序密码作为密码。

对于未启用双重验证的帐户，您可能需要在 Gmail 帐户设置中启用“允许安全性较低的应用”。此外，您可能还需要启用“允许访问您的 Google 帐户”才能使用 SMTP 服务。

### Mail.ee
对于 mail.ee 电子邮件服务，**请勿**使用您常用的网页邮箱登录凭据。请改用：

- **用户名**：请使用您的完整电子邮件地址（例如，`username@mail.ee`）
- **密码**：请使用专用的 IMAP/SMTP 密码（而不是您的网页邮箱密码）。
- 要查找您的 IMAP/SMTP 密码：登录您的 mail.ee 网络邮箱帐户并访问 [https://posti.mail.ee/prefs?group=enable_pop3](https://posti.mail.ee/prefs?group=enable_pop3)

＃＃ 用法
要从 ScriptEngine 发送电子邮件，只需编写：

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

要从另一个适配器发送电子邮件，请使用 `adapter.sendTo` 函数。

## 支持的服务
- 1und1 / 离子
- 美国在线
- DebugMail.io
- Dynect电子邮件
快速邮件
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
邮枪
邮件喷射
山魈
- Naver
- Office365
- OpenMailBox
邮戳
- QQ
- QQex
SendCloud
SendGrid
- SES
- SES-US-EAST-1
- SES-US-WEST-2
- SES-EU-WEST-1
- t-online.de
- Sparkpost
雅虎
Yandex
Zoho
- 用户特定（服务器、端口和安全设置手动定义）

其他服务请参阅**Nodemailer**文档：`§§LLLLL_0§§`

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