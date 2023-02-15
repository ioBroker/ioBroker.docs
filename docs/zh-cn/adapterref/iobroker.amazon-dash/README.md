---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.amazon-dash/README.md
title: ioBroker.amazon-dash（仅限 Linux！）
hash: sGzxItEtI3Jqdb9z3uu0NdbFH9wL1sCN4sBS+ACF/2c=
---
![标识](../../../en/adapterref/iobroker.amazon-dash/admin/amazon-dash.png)

![安装数量](http://iobroker.live/badges/amazon-dash-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.amazon-dash.svg)
![下载](https://img.shields.io/npm/dm/iobroker.amazon-dash.svg)
![NPM](https://nodei.co/npm/iobroker.amazon-dash.png?downloads=true)

# IoBroker.amazon-dash（仅限 Linux！）
用于检测 ioBroker 中 Amazon Dash 按钮按下情况的适配器。

此适配器在 Windows 下不工作！

＃＃ 脚步
1. 安装 `libpcap-dev`：

`sudo apt-get install libpcap-dev`

2. 在 Amazon App 中配对您的 Dash-Adapter 但不要选择产品！

只需在产品选择选项卡中退出安装过程即可。
否则，您每次都会订购产品；）[德文说明](https://www.amazon.de/gp/help/customer/display.html?nodeId=201746340)。

3.点击破折号按钮（应该先是白色，然后闪烁红色）

4. 在适配器对象中，应该会出现一个新的破折号按钮，您可以使用它来启动场景或在 JS 适配器中

5、有时需要给节点网络访问权限：

`sudo setcap 'cap_net_raw,cap_net_admin+eip' $(readlink -f $(which node))`

＃＃ 把招工广告！
由于这个项目是我业余时间开发的。
我正在积极寻求帮助来维护和扩展此适配器！如果你愿意帮忙，请给我留言！

<!--

### **正在进行中** -->

## Changelog
### 1.2.0 (2023-02-10)
* (bluefox) added option to execute `setcap` rights by every start

### 1.1.0 (2020-02-25)
+ (foxriver76) support of compact mode
+ (foxriver76) usage of adapter-core and eslint

### 1.0.1
+ (Apollon77) BREAKING: Upgrade pcap library supports nodejs 10+ and also supports nodejs 12

### 0.3.1
+ (PArns) Added new Amazon MAC family

### 0.3.0
+ (foxriver76) materialize ui
+ (foxriver76) dash buttons are now of type device

### 0.2.9
+ (cernst1980) Ignore duplicate ARPs for 5 seconds
+ (PArns) Added new Amazon MAC family

### 0.2.8
+ (offline4ever) Added new Amazon MAC family

### 0.2.7
+ (arteck) fixed MAC parsing

### 0.2.6
+ (arteck) edit admin
+ (arteck) add manual MAC Addresses 
+ (PArns) Added new Amazon MAC family

### 0.2.5
+ (PArns) Added new Amazon MAC family

### 0.2.4
+ (PArns) Added new Amazon MAC family

### 0.2.3
+ (PArns) Added new Amazon MAC family

### 0.2.2
+ (PArns) Added new Amazon MAC family
+ (PArns) Fixed function name in description

### 0.2.1
+ (PArns) Added new Amazon MAC family

### 0.2.0
+ (PArns) Simplified MAC lookup (thx to GermanBluefox)

### 0.1.2
+ (PArns) Added new Amazon MAC family

### 0.1.1
+ (GermanBluefox) Try to install `libpcap-dev` automatically

### 0.1.0
+ (Niksac) Added the ability to select an interface

### 0.0.5
+ (PArns) Fixed lastPushed
+ (PArns) Fixed GIT dependency which might cause problems on some systems

### 0.0.4
+ (PArns) Removed debug infos

### 0.0.3
+ (PArns) Fixed switch state

### 0.0.2
* (PArns) Added switch state, which toggles between true and false
* (PArns) Changed License

### 0.0.1
* (PArns) Initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2023 Patrick Arns <npm@patrick-arns.de>

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