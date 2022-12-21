---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.radar2/README.md
title: radar2 网络和蓝牙可用性
hash: I/CU1jFnLVGPsOX8mf0av1Al4HHlfgN7c3vUjZpR9Ro=
---
# Radar2 网络和蓝牙可用性
![商标](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![安装数量](http://iobroker.live/badges/radar2-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.radar2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.radar2.svg)

![测试和发布](https://github.com/frankjoke/iobroker.radar2/workflows/Test%20and%20Release/badge.svg)

[Deutsche Anleitung 由谷歌翻译](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.radar2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.radar2%2Fblob%2Fmaster%2FREADME.md)

## IoBroker radar2 网络和蓝牙设备、HP 打印机、UWZ 警告和 ECB 货币的可见性测试
此适配器尝试查找网络上或蓝牙指定的设备。它还显示网络的当前外部 IP，可以读取 HP 打印机的墨水状态以及来自 UWZ 的几个欧洲国家的天气警告。它还可以从 ECB 读取每日货币汇率。

它的工作原理是：

* 使用 arp-scan 和 ping 来查找 IPv4 和 IPv6 网络上的设备！
* 收听宣布新设备进入网络的 dhcp 消息。
* 它适用于多个接口，这意味着您的系统在不同网络上具有 Wlan 和 lan，它可以看到两个 lan。
* 支持普通蓝牙和蓝牙 LE
* 惠普打印机墨水状态
* Euero 的欧洲中央银行货币兑换
* ioBroker 设置为所在区域的 UWZ 天气警告
* 仅将网络上的 arp-scan 和 ping 用作外部程序，其他一切都在 nodejs 内部。
* 适配器也可以在没有 root 权限的情况下工作，但在安装之前需要进行一些配置操作
* 每个项目现在都可以在它消失之前配置单独的时间，也可以将其禁用。

如果您将 `-` 放在名称末尾，则该设备将不会计入 _notHere 或 _isHere。

如果 IP 地址以“http”开头，radar2 会将其解释为 URL/网络地址并尝试从服务器读取页面，这可用于测试网络服务器的可用性（例如 http://iobroker.net ).在 https 的情况下，如果他没有更新的安全密钥，则可能无法访问服务器！

要使用 UWZ，您需要在 ioBroker.Admin 中配置您的位置！如果 max messages 的值 >0，则每个警告将以单独的状态写入，否则它们将被合并。
您还可以设置是否要使用长警告文本，但所有信息也可以在短文本中使用。

欧洲央行货币可以在这里看到：`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### 蓝牙使用
有两种不同类型的 BT 设备：BT-LE (V 4.x+) 和普通 BT (V<=3.x)。对于每种不同的设备类型，适配器都有两种不同的扫描功能。

1) 对于 BT-LE：Noble（Nodejs modile）和 'hcitool lescan' 命令 2）对于普通 BT：BT 扫描（Nodejs 模块）和 'l2ping' 命令

每个蓝牙设备同时只能使用两种方法中的一种。

Noble 和 BT 扫描是使用 npm 在适配器安装上编译的模块，它们应该可以在 linux 和大多数 Windows 设置上运行。
Hcitool 和 l2ping 与安装脚本中的蓝牙工具一起安装，仅适用于 linux..

在 Adapter-config BT-LE macs 中应该用“！”标识在 mac 地址之前避免使用像 l2ping 这样的普通 BT 扫描来扫描它们。
通常 Noble 比 hcitool lescan 识别设备好一点，但它也会产生更多错误，并且可能无法安装在所有系统上。
同样，l2ping 可以更好地找到普通的 BT 设备，但在 linux 以外的其他平台上不可用。
因此，您可以在适配器配置中单独配置用法。

如果您使用多个 BT 设备，您可以在配置中指定设备编号，默认值为“-1”，即使用第一个可用的。可以在 Linux 上使用 `lescan dev` 查看所有可用设备的列表。
在同一个适配器中，您只能使用一个设备，如果您想扫描多个设备，则需要使用不同的适配器（或实例）。

＃＃ 安装
在将适配器安装到 ioBroker 之前，您需要在 linux 上安装 `arp-scan` 和 `libcap2-bin` 以及您可以通过运行以下命令来完成的一些驱动程序。
在 Debian（Raspi-Stretch、Ubuntu 等）上它看起来像：

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

每当您或系统更新 nodejs 或上面安装的任何应用程序时，都需要运行以下内容！

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

如果第一行安装了除 `readlink` 或 `hcitools` 之外的所有内容，则很可能缺少路径，请尝试使用 `sudo find / -name readlink` 搜索路径（在我的例子中是 `/usr/bin` ) 未包含在 $PATH 中！然后编辑 `.bashrc` 并添加一行 `export PATH=$PATH:/usr/bin`!

如果你更新节点或一些系统工具，上面应该再次执行！

在 Windows（可能还有 osx）上没有 arp-scan，这意味着将只使用 ping 但不能扫描 IP-mac 地址！

在 Osx 上，蓝牙也可能根本无法工作！

安装设置适配器配置后，您可以删除演示行项目。

### Arp扫描的特殊信息：
有一个标准命令行 `-lgq --retry=5 --timeout=400` 定义，它将在所有 IPv4 接口上扫描所有 254 个地址，如果它在 400 毫秒内没有回答，它将重试 5 次！如果您只需要扫描特定接口，您可以添加例如 ` --interface=br0` 但现在通常正确使用桥接接口，但在 docker 环境中 iot 可能仍然是必要的。repeat=5 可以更改为 6 或 7更好的检测，以上 7 我没有发现改进！超时也是如此，超过 500 我找不到任何改进。

### 给那些从雷达转移到 radar2-adapter 或从一台机器转移到另一台机器的人的提示
* 如果您移动雷达适配器，您可以通过以下方式轻松复制整个设备列表或设置
* - 进入对象管理并启用专家模式
* - 寻找名为“system.adapter.radar.0”的对象树（其中“0”是实例，如果您有多个实例，请选择正确的一个）
* - 这条线的最右边是一个带铅笔的按钮，点击它
* - 在窗口中选择 NATIVE
* - 您应该会看到配置字段，选择“设备”字段的内容并将其复制到剪贴板
* - 在目标机器上执行相同的操作，在 Admin/objects 中选择“system.adapter.radar2.0”，然后转到此处也转到 NATIVE。
* - 从剪贴板中删除“设备”字段中的文本和过去的旧文本
* - 保存更改

这种移动设置的方法在系统之间也有效，但如果其他适配器具有不同的结构，则可能无效。 radar 和 radar2 的设备列表是相同的，唯一的区别是在 radar2 中你可以有多个 ip 地址/条目，用 ',' 分隔。

## 重要/Wichtig
* 适配器需要节点 >= v10.1！和 npm >=6.4
* 适配器可能无法在 osx 上使用蓝牙和 arp-scan，只能 ping ror ip 无法检测到 IP mac 地址！
* 适配器在 Windows 上也可能存在蓝牙问题，而且 arp-scan 在 Windows 上不可用，将仅使用 ping 然后无法检测到 IP mac 地址！。

## 与雷达适配器的区别
Radar2 设置设备，当它们变得可见时立即可见，甚至在扫描再次开始之前为新的 ip。
Radar2 使用 nodejs-libraries 来查找蓝牙设备，但它现在也可以在 iobroker 的用户空间中运行，并且不需要获得 root 访问权限（请参阅下面的安装要求）。
您可以在同一行中配置多个 IP（现在是 IPv4 和 IPv6）地址或主机地址（不是 URL），这样您就可以通过多种方式 ping 设备。
`arp-scan` 用于查找 mac 地址，它将在所有具有外部 IPv4 的网络接口上运行（如果未在其命令行中不同地指定），因此它不会检测基于 IPv6 上 mac 地址的设备，但它现在将同时检测无线和固定网络上的设备！

设备可用性的处理方式不同。无论何时，每台设备都会获得一个 `_lasthere` 状态更新为当前日期和时间。在每次扫描结束时，适配器检查所有 lasthere 条目是否早于当前时间 - 配置的缺席分钟数。从未到过这里的设备也不会有 `_lasthere` 状态！

Web URL 现在可以更好地管理 https 服务器。
MAC 地址供应商解析现在在内部完成，而不是通过网络。仅在适配器启动时加载文件 lib/vendor.json，如果此文件超过 31 天，则从 Web 下载新版本 - 仅在适配器启动时！

蓝牙部分已更新，您可以定义要使用的蓝牙设备（0,1，...默认值：-1=first）。通过这种方式，您可以使用多个 BT 棒在同一设备上运行多个适配器，如 BLE 和 radar2（多个程序不能同时访问一个设备的蓝牙 LE 驱动程序）。

如果发现您未在设备列表中指定的 IP 地址或蓝牙设备，它们将显示在未知 IP 和 BT 列表中，并且将为每个设备生成一个状态。通过这种方式，您可以识别登录到您的网络的人或可以集成的设备。
如果您不想将它们列为未知，请将它们放入适配器配置中相应的已知 IP/BT 列表中。

另一个新功能是可以单独定义 HP-Printer、ECB-、UWZ- 和正常扫描的间隔。

## Changelog

### __WORK IN PROGRESS__
* Update noble

### V2.0.1

* Removed node-bluetooth because package is not updated to run on recent nodejs versions
* Updated noble to more recent version
* Completely rewritten logic for pinging BT with l2ping, or hcitool lescan
* Updated scan methot to reduce process load and also increase hit rate
* Completely re-written config page with new options
* Added possibility to switch off storing of _unknown's
* Added  `._nHere` for each item showing the number of scans device was found, reset to `0` when not found in a scan. This allows to implement delayed here logic.
* Changes to adapter to run on latest js-controller versions (and on older ones as well)
* Added `away time` in config for each item, with this you can set time until item is flagged for away individually for different items. Possible settings are -1 for default configured away time, 0 for item disabled or 1-30 for minutes until item is flagged as away.

### 1.2.5

* Updated to use the adapter for js-controller 3.0 
* Updated HP printer routine to understand some newer inkjet printers

### 1.2.0

* You may use now hcitool as only BT scanner instead of noble on linux (standatd)
* _LastHere will not be change on restart
* Standard scan cycle set to 20 seconds
* Removed the 'remove-end' field and replaced it with a debug flag

### 1.0.7

* check on linux the availability of BT-devices and if no devices are found do not run any BT scans to avoid SIGSEGV

### 1.0.3

* Added possibility to add more than one BT mac address for a device

### 1.0.2

* Corrected version which works with _lastHere and all new devices

### 1.0.0

* First public realease

## License

The MIT License (MIT)

Copyright (c) 2018-2022, frankjoke <frankjoke@hotmail.com>

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