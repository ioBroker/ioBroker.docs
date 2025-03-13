---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.email/README.md
title: ioBroker 电子邮件
hash: ypVBzSrm5mbo+TfW0HK5vnJMZibj1ActmAB2k7PbHKA=
---
![标识](../../../en/adapterref/iobroker.email/admin/email.png)

![安装数量](http://iobroker.live/badges/email-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.email.svg)
![下载](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker 电子邮件
![测试与发布](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

从 ioBroker 发送电子邮件。您无法使用此适配器检查电子邮件，只能发送它们。

适配器使用[节点邮件程序](https://github.com/nodemailer/nodemailer)来提供功能。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

要使用 Gmail，您可能需要在 Gmail 帐户中配置“允许安全性较低的应用程序”，除非您使用 2FA，在这种情况下您必须创建应用程序专用密码。您可能还需要使用“允许访问您的 Google 帐户”解锁您的帐户才能使用 SMTP。

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
- FastMail
- GandiMail
- Gmail
- 哥达迪
- Godaddy亚洲
-Godaddy欧洲
- hot.ee
- Hotmail
- iCloud
- 其
- mail.ee
- Mail.ru
- 邮枪
-Mailjet
- 山魈
- Naver
-Office365
- OpenMailBox
- 邮戳
- QQ
- QQex
-SendCloud
- 发送网格
- 塞拉
- SES-美国-东部-1
- SES-美国西部-2
- SES-欧盟-西部-1
-Sparkpost
- 雅虎
- Yandex
-Zoho
- 用户特定（手动定义服务器、端口和安全性）

对于其他服务，请参阅 **Nodemailer** 文档：`§§LLLLL_0§§`

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@GermanBluefox) Renamed `dist` folder to `build`

### 2.0.0 (2025-03-11)
* (@GermanBluefox) Breaking change: Structure of configuration was corrected, and it could be they needed to be reconfigured
* (@GermanBluefox) Made Outlook work again. Requires now to be authenticated via OAuth2
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now
* (mcm1957) EsLint uses @iobroker/linter-config now
* (mcm1957) Dependencies have been updated
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Added "Ignore SSL errors" option

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