---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.signal-cmb/README.md
title: ioBroker.signal-cmb
hash: z8ko8/wZBLuqpA4NrhvLfQJ/89LtGyxY9JDC6wI4g4c=
---
![商标](../../../en/adapterref/iobroker.signal-cmb/admin/signal-cmb.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.signal-cmb.svg)
![下载](https://img.shields.io/npm/dm/iobroker.signal-cmb.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.signal-cmb.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.signal-cmb/badge.svg)
![新PM](https://nodei.co/npm/iobroker.signal-cmb.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.signal-cmb/master.svg)

# IoBroker.signal-cmb
-->

-->

**测试**：[![测试和发布](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml)

## IoBroker 的信号 cmb 适配器
非常感谢免费的 [呼叫我机器人](https://www.callmebot.com/blog/free-api-signal-send-messages/) 服务，此适配器允许您向自己或其他号码发送 Signal 消息。

**注意**：*免费 API 仅供个人使用！*

＃＃＃ 配置
*以下文档是从[呼叫机器人](https://www.callmebot.com/blog/free-api-signal-send-messages/)页面复制的。*

在使用 API 之前，您需要从机器人获取 API 密钥：

- 将电话号码 **+34 603 21 25 97** 添加到您的电话联系人中。 （随意命名。）
- 将此消息“我允许 callmebot 向我发送消息”（英文）发送给创建的新联系人（当然使用 Signal）。
- 等到您收到消息“API 已为您的电话号码激活”。您的 APIKEY 是来自机器人的 123123`。由于这仍处于 Beta 测试阶段，因此激活可能需要 2 分钟。
- 来自机器人的 Signal 消息将包含使用 API 发送消息所需的 API 密钥。
- 您现在可以在 ioBroker 配置中使用 API KEY。

示例：![例子](../../../en/adapterref/iobroker.signal-cmb/img/signal.jpg)

＃＃＃ 用法
发送消息有两种可能性：

- 通过`signal-cmb.0.sendMessage`。只需将一些文本写入此状态，消息将发送到默认号码，该号码在设置对话框中配置。
- 通过来自 javascript 适配器的消息：

```
sendTo('signal-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![块状](../../../en/adapterref/iobroker.signal-cmb/img/blockly-signal.png)

＃＃ **工作正在进行中**
* 做了一些改动
* 做了更多的改变

-->

### 0.1.7 (16.02.22)
* (derAlff) NPM 的版本更改

### 0.1.6 (2022-01-22)
* (derAlff) 在 npm 上发布
* (derAlff) 更新了 README.md
* (derAlff) 在 io-package.json 中翻译 desc
* (derAlff) 将连接类型更改为云
* (derAlff) 改变原生部分

### 0.1.5 (2022-01-22)
* (derAlff) 修复了 Blockly 问题

### 0.1.4 (2022-01-22)
* (derAlff) 更新了 io-package.json 和 package.json。
* (derAlff) 为 io-package.json 添加了 "messagebox": true。
* (derAlff) 更改了管理页面中的电话号码。

### 0.1.3 (2022-01-21)
* (derAlff) 更新了 README.md、io-package.json 和 package.json

### 0.1.0
* (derAlff) 发布测试和运行版本 0.1.0

### 0.0.1 (2022-01-21)
* (derAlff) 初始版本。

＃＃ 去做
* 添加电话簿
* 添加多个用户（电话号码和 API 密钥）

## Changelog
<!--
Placeholder for the next version (at the beginning of the line):

## License
MIT License

Copyright (c) 2022 derAlff <derAlff@gmail.com>

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