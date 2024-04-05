---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.myuplink/README.md
title: ioBroker.myuplink
hash: +c8Neb3KKonGY9VtQq66QhvwidPModoE5QWdcaxh5Og=
---
# IoBroker.myuplink

![NPM 版本](https://img.shields.io/npm/v/iobroker.myuplink.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/myuplink-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.myuplink.svg)
![安装数量](https://iobroker.live/badges/myuplink-installed.svg)
![新平台](https://nodei.co/npm/iobroker.myuplink.png?downloads=true)

[![构建状态]（https://github.com/sebilm/ioBroker.myuplink/workflows/Test%20and%20Release/badge.svg）](https://github.com/sebilm/ioBroker.myuplink/actions/workflows/test-and-release.yml)

## Myuplink.com ioBroker 适配器
此 ioBroker 适配器从 myUplink.com 接收数据。

## 使用此适配器
以下是德语版本 - 此指南将继续提供德语版本。

1. 您需要一个 myUplink 兼容热泵，品牌包括 NIBE、AIT、Cetetherm、ClimateMaster、Contura、CTA、CTC、Enertech Global 或 Høiax - 如果没有，请购买一个 ;-)
2. 您需要一个 myUplink 账户：https://myuplink.com
3. 前往 myUplink Api：https://dev.myuplink.com 并登录
4. 点击“应用程序”，然后点击“创建新应用程序”
5. 填写：名称和描述可以是任意内容，例如 ioBroker
6. 回调 URL 对于授权码授予流程很重要。您可以使用 https://sebilm.github.io/ioBroker.myuplink/myuplink.html
7. 接受myUplink API服务协议，点击“创建”
8.然后你会得到一个标识符和一个秘密——我们需要它们
9. 在 ioBroker 中安装此适配器
10. 在适配器设置页面填写标识符和密钥。
11. 选择您的语言和所有其他设置。
12.单击保存并关闭

每个设备在对象树中都有一个名为`setData`的对象。您可以输入以下格式的 JSON 对象

```json
{
    "12345": "42",
    "23456": "1"
}
```

在此对象中。这样可以同时向 API 发送和更改多个数据点。
它还可用于更改 API 未发送的数据点。

## 适配器的工作原理
适配器每 x 分钟（取决于设置）从 myUplink API 检索一次系统和设备列表。然后，它会检索每个设备的可用参数并将其保存在对象树中。如果 myUplink 在此过程中发送了新参数，这些参数会自动添加到对象树中。

适配器通常不会删除任何对象，以便如果 myUplink 不发送参数，数据就不会丢失。

适配器对 myUplink 发送哪些参数也没有影响。

## 使用这些适配器
1. 将使用与 myUplink 兼容的 NIBE、AIT、Cetetherm、ClimateMaster、Contura、CTA、CTC、Enertech Global 或 Høiax 暖气泵。
2. 您将在 myUplink 上拥有一个帐户：https://myuplink.com
3. 在 myUplink-API 网站上登录：https://dev.myuplink.com
4. 点击“应用程序”和“创建新应用程序”
5. 名称和描述可以证明是 ausgefüllt werden, z.B. “ioBroker”
6. 回调 URL 是授权码授予流程的一部分。可以创建 https://sebilm.github.io/ioBroker.myuplink/myuplink.html。
7. 必须接受 myUplink API 服务协议，并且必须单击“创建”。
8. 将会显示一个标识符和一个秘密 - 这些将会有用。
9. 在 ioBroker 中安装此适配器。
10. 在适配器设置页面上输入标识符和密码。
11. 选择并设置语言和其他所有设置。
12. 点击仓库和闸门。

设备将使用名为“setData”的对象集来执行该操作。你可以使用 JSON 格式的对象

```json
{
    "12345": "42",
    "23456": "1"
}
```

物体诞生了。值得注意的是，发送和接收 API 时会显示更多相同的数据。
也可以使用未发送 API 的数据点来替代它。

## 适配器作业
适配器通过 myuplink-API 连接到 x 分钟（然后设置）系统和设备列表。请将上述设备连接到指定的设备，以获取所需的预先设置参数并将其存储在对象库中。当 myUplink 收到新参数时，就会自动生成此对象。

由于适配器通常没有对象，因此无法发送数据，因此 myUplink 无法发送参数。

该适配器也没有输入任何内容，因此发送了 myUplink 参数。

## Changelog

### **WORK IN PROGRESS**

-   Do not send empty objects (setData)
-   The initial refresh interval was set to 5 minutes
-   The code has been restructured internally
-   At least Node.js 18 is required!
-   Dependencies have been updated

### 0.7.1 (2024-02-10)

-   Crash after 'unhandled promise rejection' fixed #15

### 0.7.0 (2024-02-04)

-   Forbidden characters are removed from the category
-   An error when setting data has been fixed
-   Performance has been improved

### 0.6.1 (2024-02-03)

-   Performance has been improved
-   Dependencies have been updated

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