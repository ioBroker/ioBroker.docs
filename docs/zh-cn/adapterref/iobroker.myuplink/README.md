---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myuplink/README.md
title: ioBroker.myuplink
hash: FUesn9bNELv4MJOxaed5prn9MNSB85YuwkWRxt57Lec=
---
# IoBroker.myuplink

![NPM版本](https://img.shields.io/npm/v/iobroker.myuplink.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/myuplink-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.myuplink.svg)
![安装数量](https://iobroker.live/badges/myuplink-installed.svg)
![国家公共管理](https://nodei.co/npm/iobroker.myuplink.png?downloads=true)

[![构建状态](https://github.com/sebilm/ioBroker.myuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.myuplink/actions/workflows/test-and-release.yml)

## IoBroker 的 myuplink.com 适配器
此 ioBroker 适配器从 myUplink.com 接收数据。

## 使用此适配器
1. 您需要 NIBE、AIT、Cetetherm、ClimateMaster、Contura、CTA、CTC、Enertech Global 或 Høiax 的兼容热泵 - 如果您没有，请购买一个；-)
2.您需要一个myUplink帐户：https://myuplink.com
3. 前往 myUplink Api: https://dev.myuplink.com/ 并登录
4. 单击“应用程序”，然后单击“创建新应用程序”
5. 填写：名称和描述可以是任何内容，例如io经纪商
6. 回调 URL 对于授权代码授予流程很重要。您可以使用 https://sebilm.github.io/ioBroker.myuplink/myuplink.html
7.接受myUplink API服务协议并点击“创建”
8. 然后你会得到一个标识符和一个秘密 - 我们需要它们
9. 在ioBroker中安装此适配器
10. 在适配器设置页面填写 Identifier 和 Secret。
11. 选择您的语言和所有其他设置。
12. 单击“保存并关闭”

每个设备在对象树中都有一个名为`setData`的对象。您可以输入以下形式的 JSON 对象

```json
{
    "12345": "42",
    "23456": "1"
}
```

在这个对象中。这使得同时向 API 发送和更改多个数据点成为可能。
它还可用于更改 API 未发送的数据点。

## Changelog

### 0.6.0 (2024-01-28)

-   The setData object has been added

### 0.5.0 (2024-01-14)

-   Parameter IDs and categories have been added for a few heat pumps

### 0.4.1 (2024-01-13)

-   In object IDs, all characters that are not officially supported are now replaced by an underscore
-   The roles of the data objects have been improved
-   The logging of token data (in log level silly) has been removed
-   Dependencies have been updated

### 0.4.0 (2023-12-31)

-   New options for renaming IDs have been added #5
-   Options are deactivated if checkboxes are not checked

### 0.3.0 (2023-12-29)

-   Support for setting parameter values has been added (must be paid for at myuplink.com) #4
-   Authorization Code Grant Flow settings have been moved to new Extended tab
-   Password control will be used for Secret and Auth Code

### 0.2.1 (2023-12-28)

-   All responsive sizes have been added to jsonConfig
-   More error logging have been added

### 0.2.0 (2023-12-28)

-   Settings page have been changed from materialize to jsonConfig
-   Dependencies have been updated

### 0.1.0 (2023-12-25)

-   Initial release

## License

MIT License

Copyright (c) 2024 Sebastian Häßelbarth <seb@sebmail.de>

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