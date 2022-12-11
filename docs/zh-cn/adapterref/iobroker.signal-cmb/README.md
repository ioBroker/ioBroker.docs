---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.signal-cmb/README.md
title: ioBroker.signal-cmb
hash: xZa4B9PNJNdfpTfZvXpQA0jQbZRd899ijkFHZ4W8t6U=
---
![标识](../../../en/adapterref/iobroker.signal-cmb/admin/signal-cmb.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.signal-cmb.svg)
![下载](https://img.shields.io/npm/dm/iobroker.signal-cmb.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.signal-cmb.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.signal-cmb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.signal-cmb.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.signal-cmb/master.svg)

# IoBroker.signal-cmb
-->

-->

**测试**：[![测试和发布](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml)

## IoBroker 的 signal-cmb 适配器
非常感谢免费的 [叫我机器人](https://www.callmebot.com/blog/free-api-signal-send-messages/) 服务，此适配器允许您向自己或其他号码发送 Signal 消息。

**注意**：*免费 API 仅供个人使用！*

＃＃＃ 配置
*以下文档是从 [叫我机器人](https://www.callmebot.com/blog/free-api-signal-send-messages/) 页面复制的。*

在使用 API 之前，您需要从机器人获取 API 密钥：

- 将 CallMeBot 的电话号码添加到您的电话联系人中（随意命名）。您可以在这里找到实际的电话号码：https://www.callmebot.com/blog/free-api-signal-send-messages/
- 将此消息“我允许 callmebot 向我发送消息”（英文）发送到创建的新联系人（当然使用 Signal）。
- 等到您收到消息“已为您的电话号码激活 API”。您的 APIKEY 是来自机器人的 123123`。由于这仍处于 Beta 测试阶段，激活最多可能需要 2 分钟。
- 来自机器人的 Signal 消息将包含使用 API 发送消息所需的 API 密钥。
- 您现在可以在 ioBroker 配置中使用 API KEY。

示例：![例子](../../../en/adapterref/iobroker.signal-cmb/img/signal.jpg)

＃＃＃ 用法
发送消息有两种可能性：

- 通过“signal-cmb.0.sendMessage”。只需将一些文本写入此状态，消息就会发送到在设置对话框中配置的默认号码。
- 通过来自 javascript 适配器的消息：

```
sendTo('signal-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![块状](../../../en/adapterref/iobroker.signal-cmb/img/blockly-signal.png)

### 表情符号
要发送表情符号，您必须在消息中添加一些**“代码”**。您可以在此处找到所有可用代码：https://www.callmebot.com/uncategorized/list-of-urlencoded-unicode-emoticons-emojis/

### 可用的表情符号
CallMeBot 官方支持以下表情：

|代码|表情|
|%F0%9F%98%80|![咧着嘴笑](../../../en/adapterref/iobroker.signal-cmb/img/emojies/01_grinning.png)|
|%F0%9F%98%83|![咧着嘴笑的大眼睛](../../../en/adapterref/iobroker.signal-cmb/img/emojies/02_grinning_big_eyes.png)|
|%F0%9F%98%84|![咧着嘴笑的眼睛](../../../en/adapterref/iobroker.signal-cmb/img/emojies/03_grinning_smiling_eyes.png)|
|%F0%9F%98%81|![灿烂的笑眼](../../../en/adapterref/iobroker.signal-cmb/img/emojies/04_beaming_smiling_eyes.png)|
|%F0%9F%98%86|![咧着嘴笑的喷脸](../../../en/adapterref/iobroker.signal-cmb/img/emojies/05_grinning_squinting_face.png)|
|%F0%9F%98%85|![咧着嘴笑](../../../en/adapterref/iobroker.signal-cmb/img/emojies/06_grinning_sweat.png)|
|%F0%9F%A4%A3|![笑得在地上打滚](../../../en/adapterref/iobroker.signal-cmb/img/emojies/07_rolling_on_the_floor_laughing.png)|
|%F0%9F%A4%A3|![满脸喜悦的泪水](../../../en/adapterref/iobroker.signal-cmb/img/emojies/08_face_with_tears_of_joy.png)|
|%F0%9F%98%82|![微微笑的脸](../../../en/adapterref/iobroker.signal-cmb/img/emojies/09_slightly_smiling_face.png)|
|%F0%9F%99%82|![颠倒的脸](../../../en/adapterref/iobroker.signal-cmb/img/emojies/10_upside_down_face.png)|
|%F0%9F%98%89|![眨眼的脸](../../../en/adapterref/iobroker.signal-cmb/img/emojies/11_winking_face.png)|
|%F0%9F%98%8A|![微笑的脸和微笑的眼睛](../../../en/adapterref/iobroker.signal-cmb/img/emojies/12_smiling_face_with_smiling_eyes.png)|
|%F0%9F%98%87|![带光环的笑脸](../../../en/adapterref/iobroker.signal-cmb/img/emojies/13_smiling_face_with_halo.png)|
|%F0%9F%98%87|![带光环的笑脸](../../../en/adapterref/iobroker.signal-cmb/img/emojies/13_smiling_face_with_halo.png)|

#### 使用表情符号
要使用 Emojie，您必须将 Emojie 的代码插入到您要发送的文本中。

![插入表情符号](../../../en/adapterref/iobroker.signal-cmb/img/add_emojies.png)

**signal-cmb** 适配器 URL 编码此代码，您会在打电话时在 Signal Messenger 中看到 Emojie。

![表情符号信号使者](../../../en/adapterref/iobroker.signal-cmb/img/emojie_signal_mesenger.png)

＃＃ **工作正在进行中**
* 做了一些改动
* 做了一些更多的改变

-->

### 0.2.3 (08.12.22)
* (derAlff) 添加了对字符串中“编码换行符”的支持
* (derAlff) 更新自述文件

### 0.2.2 (07.12.22)
* (derAlff) NPM 的版本更改

### 0.2.1 (07.12.22)
* (derAlff) NPM 的版本变更

### 0.2.0 (07.12.22)
* (derAlff) 添加了对 Emojies 的支持
* (derAlff) 在自述文件中添加了有关表情符号的信息
* (derAlff) 用 CallMeBot 网站上实际电话号码的链接替换了 README/Configuration 中的电话号码

### 0.1.7 (16.02.22)
* (derAlff) NPM 的版本更改

### 0.1.6 (2022-01-22)
* (derAlff) 在 npm 上发布
* (derAlff) 更新了 README.md
* (derAlff) io-package.json 中的翻译描述
* (derAlff) 将连接类型更改为云
* (derAlff) 更改了原生部分

### 0.1.5 (2022-01-22)
* (derAlff) 修复了 Blockly 问题

### 0.1.4 (2022-01-22)
* (derAlff) 更新了 io-package.json 和 package.json。
* (derAlff) 在 io-package.json 中添加了“messagebox”：true。
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