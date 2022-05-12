---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.email/README.md
title: ioBroker 电子邮件
hash: V9ZiJFBBiK4b2VIceoFz0SVcAzIY1qvrSVAf/tgiaHY=
---
![标识](../../../en/adapterref/iobroker.email/admin/email.png)

![安装数量](http://iobroker.live/badges/email-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.email.svg)
![下载](https://img.shields.io/npm/dm/iobroker.email.svg)

# IoBroker 电子邮件
![测试和发布](https://github.com/ioBroker/ioBroker.email/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/email/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

从 ioBroker 发送电子邮件。

适配器使用 [节点邮件程序](https://github.com/nodemailer/nodemailer) 来提供功能。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

要使用 Gmail，您可能需要在您的 Gmail 帐户中配置“允许安全性较低的应用程序”，除非您使用的是 2FA，在这种情况下，您必须创建一个应用程序专用密码。您可能还需要使用“允许访问您的 Google 帐户”解锁您的帐户才能使用 SMTP。

＃＃ 用法
要从 ScriptEngine 发送电子邮件，只需编写：

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

要从其他适配器发送电子邮件，请使用 **adapter.sendTo** 函数。

##支持的服务
- 1und1 / ionos
- 美国在线
- 调试邮件.io
- Dynect电子邮件
- 快速邮件
- 甘地邮报
- 邮箱
- 去吧爸爸
- GodaddyAsia
- GodaddyEurope
- 热.ee
- 热邮件
- iCloud
- 我
- 邮件.ee
- Mail.ru
- 邮筒
- 邮递
- 山魈
- 纳维尔
- Office365
- 打开邮箱
- 邮戳
- QQ
- QQex
- 发送云
- 发送网格
- SES
- SES-US-EAST-1
- SES-US-WEST-2
- SES-EU-WEST-1
- 火花邮报
- 雅虎
-Yandex
- 佐霍
- 用户特定（手动定义服务器、端口和安全性）

对于其他服务，请参阅 **Nodemailer** 的文档：`§§LLLLL_0§§`

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