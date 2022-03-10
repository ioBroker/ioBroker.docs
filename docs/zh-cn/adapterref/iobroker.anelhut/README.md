---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.anelhut/README.md
title: ioBroker.anelhut
hash: zCcv67mMcDZEazbGRPY0dDNLQz1d4F9XSQcwNaI7ooE=
---
![商标](../../../en/adapterref/iobroker.anelhut/admin/anelhut.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.anelhut.svg)
![下载](https://img.shields.io/npm/dm/iobroker.anelhut.svg)
![安装数量（最新）](http://iobroker.live/badges/anelhut-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/anelhut-stable.svg)
![依赖状态](https://img.shields.io/david/dan1-de/iobroker.anelhut.svg)
![已知漏洞](https://snyk.io/test/github/dan1-de/ioBroker.anelhut/badge.svg)
![新PM](https://nodei.co/npm/iobroker.anelhut.png?downloads=true)

# IoBroker.anelhut
**测试：** ![测试和发布](https://github.com/dan1-de/ioBroker.anelhut/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 anelhut 适配器
ANEL Electronic AG NET-PwrCrtl 设备的适配器。
制造商：https://shop.anel.eu/

## 此适配器适用于以下 anel 设备：
- NET-PwrCtrl 小屋
- NET-PwrCtrl IO
-   家
- 专业版
-   力量
- 进阶

＃＃ 用法
- 安装适配器

- 配置设备

    - 在您的 Anel 设备上启用 UDP 通信
    - 插入您的 Anel 设备的属性

        - DeviceName：您的设备的自定义名称。此名称用于在对象列表中显示设备。示例：anelhut.0.DeviceName
        - DeviceIP：您设备的 IP 地址（请不要使用主机名）
        - UDPSendPort：插入显示在您的 Anel 设备 Web 界面中的端口。这是从 anel 设备视图中的接收端口（默认值：75）。
        - UDPRecievePort：插入显示在您的 Anel 设备的 web 界面中的端口。这是 anel 设备视图中的发送端口（默认值：77）。

重要提示：如果您想控制多个设备，请为每个设备使用不同的接收端口。
例如，您可以将端口 77 用于第一个设备，将 78 用于第二个设备，将 79 用于第三个设备，依此类推。
如果只使用一台设备，则可以使用默认端口 77。
对于发送端口，默认端口 75 可用于所有设备。
您可以在设备的 Web 界面上更改端口。

- 码头工人
    - 不要忘记端口转发，如果您想将此适配器与 docker 环境一起使用：
        - 77:77/udp #port 转发第一个 anel 设备
        - 78:78/udp #port 转发第二个 anel 设备
    - 您可以在此存储库 (examples/docker-compose.yml) 中找到一个可用的 docker-compose 示例以供参考

＃＃ 笔记
此适配器已针对所有 Anel 设备进行了测试。感谢 anel 开发人员:)。
请报告任何问题。

## Changelog

### 1.0.10

-   (dan1-de) Implemented XOR User/Password encryption; improved logging/log levels;

### 1.0.9

-   (dan1-de) Corrected bug for Pro v3

### 1.0.8

-   (dan1-de) Quick Fix: Corrected bug in io control

### 1.0.7

-   (dan1-de) Added possibility to control IO's; Code restructure

### 1.0.6

-   (dan1-de) Fixed issues with sensor; display only 3 relais at anel home device; display type code instead of only letter; fixed temperature

### 1.0.4

-   (dan1-de) New Icon; Improved object structure

### 1.0.3

-   (dan1-de) Improvements: logging, udp broadcast adress, configuration

### 1.0.0

-   (dan1-de) initial release

## License

MIT License

Copyright (c) 2021 dan1-de <dan1-de@gmx.de>

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