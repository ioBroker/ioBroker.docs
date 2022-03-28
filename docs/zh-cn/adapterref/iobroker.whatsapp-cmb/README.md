---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: +4R0b4EKTxlIOP+ASeqLAdhQ4h9URBWifmI6ci2xrow=
---
![商标](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![安装数量](http://iobroker.live/badges/whatsapp-cmb-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![下载](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)

# IoBroker.whatsapp-cmb
![测试和发布](https://github.com/ioBroker/ioBroker.whatsapp-cmb/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/whatsapp-cmb/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的 whatsapp-cmb 适配器
非常感谢免费的[呼叫我机器人](https://www.callmebot.com/blog/free-api-whatsapp-messages/)服务，此适配器允许您将 WhatsApp 消息发送给自己或其他号码。

**注意**：*免费 API 仅供个人使用！*

＃＃＃ 配置
*以下文档是从[呼叫机器人](https://www.callmebot.com/blog/free-api-whatsapp-messages/)页面复制的。*

在使用 API 之前，您需要从机器人获取 API 密钥：

- 将电话号码 **+34 644 44 21 48** 添加到您的电话联系人中。 （随意命名。）
- 将此消息“我允许 callmebot 向我发送消息”（英文）发送给创建的新联系人（当然使用 WhatsApp）。
- 等到您收到消息“API 已为您的电话号码激活”。您的 APIKEY 是来自机器人的 123123`。由于这仍处于 Beta 测试阶段，因此激活可能需要 2 分钟。
- 来自机器人的 WhatsApp 消息将包含使用 API 发送消息所需的 API 密钥。
- 您现在可以在 ioBroker 配置中使用 API KEY。

示例：![例子](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

＃＃＃ 用法
发送消息有两种可能性：

- 通过`whatsapp-cmb.0.sendMessage`。只需将一些文本写入此状态，消息将发送到默认号码，该号码在设置对话框中配置。
- 通过来自 javascript 适配器的消息：

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![块状](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

如果您想发送表情符号，请参考 https://www.callmebot.com/uncategorized/how-to-use-emoticos-with-the-api/

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 0.2.2 (2022-03-27)
* (Apollon77) Fix message encoding

### 0.2.1 (2022-03-25)
* (Apollon77) Add Emoticons support
* (Apollon77) Add Sentry for crash reporting

### 0.1.6 (2020-08-31)
* (Apollon77) Fixed the error with the phone number

### 0.1.3 (2020-08-29)
* (bluefox) The documentation and translations were added.

### 0.0.1 (2020-08-27)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2022 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.