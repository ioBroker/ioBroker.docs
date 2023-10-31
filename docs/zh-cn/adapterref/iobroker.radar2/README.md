---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.radar2/README.md
title: 雷达2网络和蓝牙可用性
hash: ui5trG7dVr4zZ47eDTJ9ZvnJ76AIGsrS7M9A9+yQjuM=
---
![标识](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.radar2)
![下载](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.radar2)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.radar2)
![GitHub 自最新版本以来提交的内容（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.radar2/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.radar2)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.radar2)
![NPM版本](http://img.shields.io/npm/v/iobroker.radar2.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/radar2-stable.svg)
![安装数量](https://iobroker.live/badges/radar2-installed.svg)

# 雷达2网络和蓝牙可用性
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/radar2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml)

<!--

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。
-->
## IoBrokerradar2 网络和蓝牙设备、HP 打印机、UWZ 警告和 ECB 货币的可见性测试
该适配器尝试查找网络上或通过蓝牙指定的设备。它还显示网络当前的外部 IP，可以读取 HP 打印机的墨水状态以及来自 UWZ 的多个欧洲国家的天气警告。它还可以读取欧洲央行的每日货币汇率。

它的工作原理是：

* 使用 arp-scan 和 ping 来查找 IPv4 和 IPv6 网络上的设备！
* 监听 dhcp 消息，宣布新设备接入网络。
* 它适用于多个接口，这意味着您的系统在不同网络上有 WLAN 和 lan，它可以看到这两个 lan。
* 支持普通蓝牙和蓝牙 LE
* HP-打印机墨水状态
* 欧洲央行货币兑换为Euero
* ioBroker 设置的地区的 UWZ 天气警告
* 在网络上使用 arp-scan 和 ping 作为外部程序，其他一切都是 Nodejs 的内部程序。
* 该适配器无需 root 权限也可工作，但安装前需要进行一些配置操作
* 每个项目现在都可以在其消失之前配置单独的时间，也可以将其禁用。

如果您在名称末尾添加 `-`，则该设备将不会计入 _notHere 或 _isHere。

如果 IP 地址以“http”开头，radar2 会将其解释为 URL/Web 地址并尝试从服务器读取页面，这可用于测试 Web 服务器的可用性（例如 http://iobroker.net ）。对于 https，如果没有更新的安全密钥，可能会出现服务器无法访问的情况！

要使用 UWZ，您需要在 ioBroker.Admin 中配置您的位置！如果最大消息的值>0，则每个警告将以单独的状态写入，否则它们将被合并。
您还可以设置是否要使用长警告文本，但所有信息也可以在简短的文本中提供。

欧洲央行货币可在此处查看：`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### 蓝牙使用
BT 设备有两种不同类型：BT-LE (V 4.x+) 和普通 BT (V<=3.x)。该适配器针对每种不同的设备类型具有两种不同的扫描功能。

1) 对于 BT-LE：Noble（Nodejs 模块）和“hcitool lescan”命令 2) 对于普通 BT：BT 扫描（Nodejs 模块）和“l2ping”命令

每个 BT 设备同时只能使用两种方法中的一种。

Noble 和 BT scan 是使用 npm 在适配器安装上编译的模块，应该适用于 Linux 和大多数 Windows 设置。
Hcitool 和 l2ping 与安装脚本中的蓝牙工具一起安装，并且仅适用于 Linux。

在 Adapter-config BT-LE mac 中应使用“!”进行标识在 mac 地址之前，以避免使用 l2ping 等普通 BT 扫描来扫描它们。
通常，Noble 比 hcitool lescan 识别设备要好一些，但它也会产生更多错误，并且可能无法安装在所有系统上。
同样，l2ping 可以更好地查找普通 BT 设备，但在 Linux 以外的其他平台上不可用。
因此，您可以在适配器配置中单独配置用法。

如果您使用多个 BT 设备，您可以在配置中指定设备编号，默认值为“-1”，即使用第一个可用的设备。在 Linux 上可以通过 `lescan dev` 查看所有可用设备的列表。
在同一适配器中，您只能使用一台设备，如果您想扫描多个设备，则需要使用不同的适配器（或实例）。

＃＃ 安装
在将适配器安装到 ioBroker 之前，您需要在 Linux 上安装 `arp-scan` 和 `libcap2-bin` 以及一些驱动程序，您可以通过运行以下命令来安装这些驱动程序。
在 Debian（Raspi-Stretch、Ubuntu...）上，它看起来像：

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

每当您或系统更新nodejs或上面安装的任何应用程序时，都需要运行以下命令！

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

如果第一行安装了除`readlink`或`hcitools`之外的所有内容，则很可能缺少路径，请尝试使用`sudo find / -name readlink`搜索路径（在我的例子中是`/usr/bin`） ) 未包含在 $PATH 中！然后编辑 `.bashrc` 并添加一行 `export PATH=$PATH:/usr/bin`!

如果您更新节点或某些系统工具，则应再次执行上述操作！

在 Windows（也许还有 osx）上，没有 arp 扫描，这意味着只会使用 ping，但无法扫描 IP-mac 地址！

在 OSX 上，蓝牙也可能根本无法工作！

安装设置适配器配置后，您可以删除演示行项目。

### Arp-scan 的特殊信息：
定义了一个标准命令行`-lgq --retry=5 --timeout=400`，它将在所有 IPv4 接口上扫描所有 254 个地址，如果它在 400 毫秒内没有应答，它将重试 5 次！如果您只需要扫描特定接口，则可以添加例如` --interface=br0`，但通常现在可以正确使用桥接接口，但在 docker 环境中物联网可能仍然是必要的。repeat=5 可以更改为 6 或 7更好的检测，以上7个我没有发现改进！超时也是如此，超过 500 我找不到任何改进。

### 针对从雷达转移到雷达2适配器或从一台机器转移到另一台机器的提示
* 如果您移动雷达适配器，您可以通过以下方式轻松复制整个设备列表或设置
* - 进入对象管理并启用专家模式
* - 查找名为“system.adapter.radar.0”的对象树（其中“0”是实例，如果您有多个实例，请选择正确的一个）
* - 这条线的最右边是一个带有铅笔的按钮，点击它
* - 在窗口中选择 NATIVE
* - 然后您应该看到配置字段，选择“设备”字段的内容并将其复制到剪贴板
* - 在目标计算机上执行相同的操作，在 Admin/objects 中选择“system.adapter.radar2.0”，然后也转到 NATIVE。
* - 删除“设备”字段中的文本以及剪贴板中旧字段中的文本
* - 保存更改

这种移动设置的方法也适用于系统之间，但如果其他适配器具有不同的结构，则可能不起作用。雷达和雷达2的设备列表是相同的，唯一的区别是在雷达2中你可以有多个IP地址/条目，用“,”分隔。

## 重要/重要
* 适配器需要节点 >= v10.1！并且 npm >=6.4
* 适配器可能无法在 osx 上使用蓝牙和 arp 扫描，只能 ping ror ip，无法检测 IP mac 地址！
* 适配器在 Windows 上也可能存在蓝牙问题，而且 arp 扫描在 Windows 上不可用，将仅使用 ping，然后无法检测 IP mac 地址！

## 与雷达适配器的差异
Radar2 设置当设备变得可见时立即可见的设备，甚至在扫描再次开始之前就可以找到新的 IP。
Radar2 使用 nodejs-libraries 来查找蓝牙设备，但它现在也可以在 iobroker 的用户空间中运行，并且不需要获得 root 访问权限（请参阅下面的安装要求）。
您可以在同一行中配置多个 IP（现在是 IPv4 和 IPv6）地址或主机地址（不是 URL），这样您就可以通过多种方式对设备进行 ping 操作。
`arp-scan`用于查找mac地址，它将在所有具有外部IPv4的网络接口上运行（如果没有在命令行中以不同方式指定），因此它不会根据IPv6上的mac地址检测设备，但它现在将同时检测无线和固定网络上的设备！

设备的可用性的处理方式有所不同。每当看到设备时，每台设备都会获得使用当前日期和时间更新的`_lasthere`状态。每次扫描结束时，适配器都会检查所有最后的条目是否早于当前时间（配置的缺勤分钟数）。从未出现过的设备也不会具有 `_lasthere` 状态！

Web URL 现在可以更好地管理 https 服务器。
MAC 地址供应商解析现在是在内部完成的，而不是通过网络完成的。仅在适配器启动时加载文件 lib/vendor.json，如果该文件超过 31 天，则从网络下载新版本 - 仅在适配器启动时！

蓝牙部分已更新，您可以定义要使用的蓝牙设备（0,1，...默认值：-1=第一个）。通过这种方式，您可以使用多个 BT 棒在同一设备上运行多个适配器，例如 BLE 和 Radar2（一台设备的蓝牙 LE 驱动程序不能同时被多个程序访问）。

如果发现您未在设备列表中指定的 IP 地址或蓝牙设备，它们将显示在未知 IP 和 BT 列表中，并且将为每个设备生成一个状态。通过这种方式，您可以识别登录您的网络或可集成的设备的人员。
如果您不想将它们列为未知，请将它们放入适配器配置中相应的已知 IP/BT 列表中。

另外一个新功能是可以单独定义 HP 打印机、ECB、UWZ 和正常扫描的间隔。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.0 (2023-10-29)
* (mcm1957) Adapter has been moved to iobroker-community-adapters area
* (mcm1957) Adapter requires nodejs 16 now
* (mcm1957) Dependencies have been updated

### 2.0.8
* (ta2k) fix arp-scan detection for debian 12

### 2.0.7 (2023-01-05)
* (Apollon77) Upgrade noble

### 2.0.5 (2022-12-31)
* (Apollon77) Downgrade noble again

### 2.0.4 (2022-12-22)
* Update noble

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

Copyright (c) 2018-2023, frankjoke <frankjoke@hotmail.com>

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