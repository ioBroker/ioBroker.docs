---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wireguard/README.md
title: ioBroker.wireguard
hash: +1ql84dUfbie/gcH5o/9Xhy2nKAxXJ8SdA5Hq8BsaUw=
---
![商标](../../../en/adapterref/iobroker.wireguard/admin/Logo_of_WireGuard.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.wireguard.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wireguard.svg)
![安装数量](https://iobroker.live/badges/wireguard-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/wireguard-stable.svg)
![新PM](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)

# IoBroker.wireguard
![商标](../../../en/adapterref/iobroker.wireguard/admin/wireguard.svg)

![测试和发布](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg)![代码QL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)

## IoBroker 的wireguard 适配器
连接到 WireGuard 主机并获取对等点的连接信息。此适配器旨在成为您的 WireGuard 主机的监控实例。

&gt; 如果你喜欢这个适配器并考虑支持我<br/>&gt; [![使用 payPal 捐款](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## 先决条件
* 在每台主机上运行 ssh 服务器进行监控
* wg 可执行文件（Windows 上的 wg.exe）需要在搜索路径中
* 有权执行wg命令的用户的用户名和密码

##安装步骤
* 检查您的 WireGuard 主机是否正在运行 ssh 服务器。如果没有 - 安装一个。如果您可以使用 putty（或类似工具）打开命令行，则您正在运行 ssh 服务器。
* 确保您喜欢使用的用户能够执行 `wg`（Windows 和 Linux 相同）。 **此用户需要管理员权限！**
* 总结一下测试：打开远程命令行，登录并执行`wg show`命令。如果您收到正确的结果，您就完成了并且可以使用这些数据来运行适配器。
* 为您想要监控的每个主机执行此操作
* 安装适配器并配置它

## 配置选项
由于 WireGuard 在内部仅使用公钥来识别对等点，但它们非常不方便人类阅读和识别，因此添加了翻译页面。随意添加公钥和名称以将名称集成到对象树中。

* 主页
  - 名称：只是主机的象征性名称，因为它比 IP 地址更方便、更容易记住
  - 主机地址：主机的 IP 地址。 fqdn 或 dns 名称也可以。如果你在同一台主机上运行 WireGuard 和 ioBroker，你可以使用 `localhost` 作为 IP。
  - 用户：在主机上执行脚本的用户（将被加密存储）
  - 密码：此用户的密码（将加密存储）
  - sudo：是否应该使用 sudo 执行 wg 命令（需要有效的 sudoers 配置！-> 参见 [安全提示]）
  - 轮询间隔：以秒为单位在每次轮询之间暂停（也会延迟适配器启动后的第一次运行）
* 翻译页面
    - 公钥：您的同行之一的公钥
    - 组名：此对等点的符号名称

＃＃ 这个怎么运作
* 适配器的 info.connection 用于指示至少有一个 WireGuard 接口在线并由 `wg show all` 报告。如果没有 Wireguard 接口在线 - 不报告任何内容。在这种情况下，将记录错误并且适配器的交通灯变为黄色。
* 此适配器在每个配置的主机上打开一个 ssh shell，执行 `wg show all dump` 命令，删除 shell 并解析结果。
* 由于每个公钥都是唯一的，适配器使用它们将公钥转换为用户友好、可读和可识别的名称。
* 不幸的是，WireGuard 本身并不提供“已连接”状态。它只提供最后一次握手信息。

由于握手通常每 120 秒发生一次 - 此适配器以这种方式计算连接状态，它假定在不到 130 秒前收到最后一次握手时已连接对等体。

## 安全提示
> 我强烈推荐在 Linux 下使用 sudoers！

这些安全提示主要依赖于 linux，因为它的安全系统比 windows 系统更复杂。在 Windows 服务器上，您只需要使用管理用户。
由于 `wg` 命令（执行该命令以获取 WireGuard 的状态）需要管理权限，因此请仔细考虑您在此处执行的操作以及如何配置放置在 config 中的用户。
为了尽可能保护这些凭据 - 用户名和密码 - 均已加密。

基本上有三种方式来执行命令：

* 使用管理用户（root 或类似用户）。这将起作用，但会暴露您的整个服务器，以防凭证丢失/被盗。
* SetUID-Bit 的使用：通过设置这个位（据我所知），每个用户都可以使用管理权限执行标记的文件，而无需任何密码。 **这包括黑客**。因此，在 wg 命令上设置此位会公开整个 wg 命令及其所有功能。如果您愿意，请以管理员身份执行 `chmod u+s /usr/bin/wg`。
* sudoers 的使用：从我的角度来看，最安全的方法是设置一个具有基本权限的新简单用户，并在 sudoers 文件中添加一个简单的行，允许该用户在不输入密码的情况下执行所需的命令 - 仅此而已命令。请参阅您的发行版文档以获取有关编辑 sudoers 文件和使用 visudo 的正确信息。下面的屏幕截图显示了需要添加到文件中的内容。 `wireguard-monitoring-user` 是您选择的用户。其余的需要和你看到的完全一样。

```
#iobroker.wireguard adapter
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
```

此设置允许 `ALL` 主机上的 `<wireguard-monitoring-user>` 从目录 `/usr/bin/` 执行 `wg show all dump` 命令（可能需要在您的发行版中更改），而无需密码（§§ SSSSS_4§§)。
![图片](../../../en/adapterref/iobroker.wireguard/admin/sudoers_config.png)

＃＃ 已知的问题
* 没有任何

##哨兵.io
该适配器使用 sentry.io 收集有关崩溃的详细信息并将其自动报告给作者。
[ioBroker.sentry 插件](https://github.com/ioBroker/plugin-sentry)用于它。请参阅 [插件主页](https://github.com/ioBroker/plugin-sentry) 了解有关插件的功能、收集哪些信息以及如何禁用它的详细信息，如果您不喜欢用您的崩溃信息来支持作者。

### 免责声明
该项目与 WireGuard 没有任何关系。 WireGuard 名称和 WireGuard 徽标仅用于指代该项目，并且是其所有者的财产。他们不是这个项目的一部分。

##版权
版权所有 (c) 2022 grizzelbee <open.source@hingsen.de>

## Changelog
### v1.1.3 (2022-03-31)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-1](https://sentry.io/organizations/grizzelbee/issues/3027754005/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-H](https://sentry.io/organizations/grizzelbee/issues/3129951381/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-C](https://sentry.io/organizations/grizzelbee/issues/3036902024/events/?project=6215712)
* (grizzelbee) Upd: dependencies got updated

### v1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### v1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### v1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### v1.0.0 (2022-02-25)
* (grizzelbee) New: Added individual online state indicator for each interface
* (grizzelbee) fix: Improved some data roles
* (grizzelbee) fix: Improved documentation

### v0.9.5 (2022-02-22)
* (grizzelbee) New: dropped use of wg-json script - not needed anymore
* (grizzelbee) New: making internal use of wg show all dump command and self parsing the result
* (grizzelbee) New: Added windows support by using the wg show all command
* (grizzelbee) Upd: moved dependency **admin** to globalDependency as requested during adapter review

### v0.9.2 (2022-02-20)
* (grizzelbee) Fix: removed unnecessary secret from index_m.html file
* (grizzelbee) Fix: Using info.connection of adapter to indicate that at least one interface is online.
* (grizzelbee) Fix: Updated adapter icon

### v0.9.1 (2022-02-19)
* (grizzelbee) New: Improved optical quality of admin page - no technical improvements

### v0.9.0 (2022-02-18)
* (grizzelbee) New: Improved documentation
* (grizzelbee) New: Username and password for WireGuard hosts are getting encrypted now

### v0.8.0 (2022-02-17)
* (grizzelbee) New: admin extended with second page
* (grizzelbee) New: data file is getting parsed
* (grizzelbee) New: data tree is getting populated
* (grizzelbee) New: entire basic functionality is implemented
* (grizzelbee) New: added plugin sentry

### v0.2.0 (2022-02-16)
* (grizzelbee) New: admin is working as expected
* (grizzelbee) New: first steps in backend

### v0.1.0 (2022-02-14)
* (grizzelbee) working on admin

### v0.0.1
* (grizzelbee) initial release

## License
MIT License


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