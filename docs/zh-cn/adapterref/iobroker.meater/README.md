---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meater/README.md
title: ioBroker.meater
hash: 4ywg8L04c0K1aEpLqGWc3YiAkBJeMg0owCIxMMyhVMM=
---
![标识](../../../en/adapterref/iobroker.meater/admin/meater.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.meater.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meater.svg)
![安装数量](https://iobroker.live/badges/meater-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/meater-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meater.png?downloads=true)

# IoBroker.meater
**测试：** ![测试和发布](https://github.com/Standarduser/ioBroker.meater/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Meater 适配器
此适配器将您的 MEATER 无线肉类温度计带入 ioBroker。

它通过 MEATER 云 API 从您的探测器中获取数据。您可以配置 2 个间隔：

1.所有探针空闲时的更新间隔（不做饭）
2. 至少 1 个烹饪会话开始时的更新间隔

##先决条件
您需要设置一个 MEATER 云帐户（使用智能手机应用程序）并激活 MEATER Link。

＃＃ 配置
- `MEATER cloud 的用户名`：您注册的电子邮件地址
- `MEATER cloud 密码`：您用于云访问的密码
- `Language`：一些（不是全部！）值将被翻译，例如肉的名字
- `Update interval idle`：以秒为单位的时间应该从云中获取数据的频率
- `Update interval cook`：时间是秒，当 cook senssion 处于活动状态时，从云中获取数据的频率是多少
- `Temperature unit`：用于在 ioBroker 状态下创建单位。将其设置为与您在应用程序中使用的单位相同。如果在创建状态后更改了单位，则删除所有探测器状态并重新启动适配器
- `清除旧值`：MEATER 云 API 仅发送活动探测/运行烹饪会话的值。如果会话结束，您不会收到温度和状态的更新。激活此复选框以清除没有更新的旧值以避免误解。

## 使用适配器
设置适配器后，它将自动登录到 MEATER 云并获取其数据。

如果您没有看到任何探针和/或值，请开始烹饪会话并稍等片刻。您可能需要加热探头才能获得任何值（热水可以很好地进行测试）。

## 免责声明
MEATER® 是 Apption Labs™ Limited 的商标。
此适配器使用 [公共接口](https://github.com/apption-labs/meater-cloud-public-rest-api)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2023-01-14)

-   (Standarduser): improved: error handling if websever sent no response

### 0.2.0 (2022-12-15)

-   (Standarduser) added: State for manually trigger an update
-   (Standarduser) improved: description of errors
-   (Standarduser) fixed: Adapter stopped working if got an error from MEATER Cloud server (not API)

### 0.1.2 (2022-12-05)

-   (Standarduser) Improved error handling for fetch

### 0.1.0 (2022-12-04)

-   (Standarduser) Save password encrypted => please reenter password in adapter config
-   (Standarduser) Some minor improvements

### 0.1.0-alpha.0 (2022-11-21)

-   (Standarduser) First test release

## License

MIT License

Copyright (c) 2023 Standarduser

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