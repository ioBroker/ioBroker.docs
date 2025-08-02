---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wireguard/README.md
title: ioBroker.wireguard
hash: YEcQxVexD5uD4OXqwolElUBJr0C6hZh4+cNzoTGAFF4=
---
![标识](../../../en/adapterref/iobroker.wireguard/admin/Logo_of_WireGuard.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.wireguard.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wireguard.svg)
![安装数量](https://iobroker.live/badges/wireguard-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/wireguard-stable.svg)
![新平台](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)

# IoBroker.wireguard
![标识](../../../en/adapterref/iobroker.wireguard/admin/wireguard.svg)

![测试与发布](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg)![代码QL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)

## IoBroker 的 wireguard 适配器
连接到 WireGuard 主机并获取对等端的连接信息。此适配器旨在作为 WireGuard 主机的监控实例。它还支持普通安装和 docker。

&gt; 如果您喜欢这个适配器并考虑支持我<br/>&gt; [![使用 payPal 捐款](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## 先决条件
* 在每个要监控的主机上运行 ssh 服务器
* wg 可执行文件（Windows 上为 wg.exe）需要位于搜索路径中
* 有权限执行 wg 命令的用户名和密码

## 安装步骤
* 检查您的 WireGuard 主机是否正在运行 ssh 服务器。如果没有，请安装一个。如果您可以使用 putty（或类似程序）打开命令行，则表示您正在运行 ssh 服务器。
* 确保您要使用的用户能够执行“wg”（Windows 和 Linux 相同）。**此用户需要管理员权限！**
* 总结一下测试：打开远程命令行，登录并执行“wg show”命令。如果您收到正确的结果，则说明您已完成并可以使用这些数据来运行适配器。
* 对您要监控的每个主机执行此操作
* 安装适配器并进行配置

## 配置选项
由于 WireGuard 内部仅使用公钥来识别对等方，但对于人类来说，它们非常不方便阅读和识别，因此添加了翻译页面。您可以随意添加公钥和名称，以将名称集成到对象树中。

* 主页
- 名称：主机的符号名称，因为它比 IP 地址更方便且更好记
- 主机地址：主机的 IP 地址。fqdn 或 dns 名称也适用。如果您在同一台主机上运行 WireGuard 和 ioBroker，则只需使用“localhost”作为 IP。
- 端口：您的 ssh 服务器的端口号。默认值：22
- 用户：在主机上执行脚本的用户（将加密存储）
- 密码：此用户的密码（将以加密形式存储）
- sudo：是否应使用 sudo 执行 wg 命令（需要有效的 sudoers 配置！-> 参见[安全提示]）
- Docker：执行 `docker exec` 命令以访问 docker 容器内的 wireguard 服务器。请检查它是否符合您的需求，或者您是否可以切换到受支持的容器。
- 轮询间隔：每次轮询之间暂停几秒（也会延迟适配器启动后的第一次运行）
- 容器：docker 容器的名称。通常为“wireguard”，但在单个服务器上运行多个容器时可能会有所不同
* 翻译页面
- 公钥：你的某个同伴的公钥
- 组名：此对等体的符号名称
* 配置文件页面
- 姓名：必须与主页上的名称相同
- 接口：存储在此配置文件中的接口名称（wg0、wg1、...）
- 配置文件：此接口的配置文件的完整限定路径和名称（/etc/wireguard/wg0.conf，...）

### 执行的命令行取决于复选框：
* 未选中复选框：将执行 `wg show all dump`（对于 root 类用户和使用 SetUID-Bit）
* 选中 Sudo 复选框：将执行 `sudo wg show all dump`（与正确的 sudoers 行一起使用）
* 选中 Docker 复选框：将执行 `docker exec -it wireguard /usr/bin/wg show all dump`
* 已选中 Sudo 和 Docker 复选框：将执行 `sudo docker exec -it wireguard /usr/bin/wg show all dump`

> 如果您在 docker 容器中使用 WireGuard，我假设您对技术和安全概念足够熟悉，可以配置您的系统以不要求任何密码的方式执行显示的命令。

### Docker
基本上，关于常规安装的所有内容也适用于 docker，并且工作方式相同。
除了需要复选框才能执行正确的命令和所需的 sudoers 行。如果您在 docker 容器内使用 WireGuard，则可能需要类似这样的 sudoers 行：

```
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg show all dump
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * remove
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * allowed-ips *
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg syncconf * *
```

此适配器需要您的 WireGuard 容器的名称 `wireguard` 和容器内 `/usr/bin/` 中的 `wg` 命令。
这些值目前无法自定义。

工作原理
* 适配器的 info.connection 用于指示至少一个 WireGuard 接口处于在线状态，并由 `wg show all` 报告。如果没有 Wireguard 接口处于在线状态 - 则不会报告任何内容。在这种情况下，会记录错误，并且适配器的交通灯变为黄色。
* 此适配器在每个配置的主机上打开一个 ssh shell，执行“wg show all dump”命令，删除 shell 并解析结果。
* 由于每个公钥都是唯一的，适配器使用它们将公钥转换为用户友好、可读和可识别的名称。
* 遗憾的是，WireGuard 本身不提供“已连接”状态。它仅提供最后一次握手信息。

由于握手通常每 120 秒发生一次 - 该适配器以这种方式计算连接状态，它假定在少于 130 秒之前收到最后一次握手时对等方已连接。

## 安全提示
> 我强烈推荐在 Linux 下使用 sudoers！

这些安全提示主要依赖于 Linux，因为它的安全系统比 Windows 更复杂。在 Windows 服务器上，您只需使用管理员用户即可。
由于 `wg` 命令（用于获取 WireGuard 的状态）需要管理员权限，请仔细考虑您在此处执行的操作以及如何配置您在配置中放置的用户。
为了尽可能地保护这些凭据，用户名和密码都经过加密。

基本上，执行命令有三种方法：

* 使用管理员用户（root 或类似用户）。这种方法可行，但万一凭证丢失或被盗，整个服务器就会暴露。
* 使用 SetUID-Bit：通过设置此位（据我所知），每个用户都可以使用管理员权限执行标记文件，而无需任何密码。**这包括黑客**。因此，在 wg 命令上设置此位会暴露整个 wg 命令及其所有功能。如果您愿意，请以管理员身份执行“chmod u+s /usr/bin/wg”。
* 使用 sudoers：从我的角度来看，最安全的方法是设置一个具有基本权限的新简单用户，并在 sudoers 文件中添加一行简单的内容，允许该用户无需输入密码即可执行所需的命令 - 并且只能执行此命令。请参阅发行版的文档以获取有关编辑 sudoers 文件和使用 visudo 的正确信息。下面的屏幕截图显示了需要添加到文件的内容。`wireguard-monitoring-user` 是您选择的用户。其余的需要与您看到的完全一样。

```
#iobroker.wireguard adapter
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * remove
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * allowed-ips *
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg syncconf * *
```

此设置允许 `ALL` 主机上的 `<wireguard-monitoring-user>` 从目录 `/usr/bin/`（可能需要在您的发行版上进行更改）执行 `wg show all dump` 命令，而无需密码（`NOPASSWD`）。
![图像](../../../en/adapterref/iobroker.wireguard/admin/sudoers_config.png)

## 已知问题
* 没有任何

## Sentry.io
此适配器使用 sentry.io 收集崩溃的详细信息并自动向作者报告。
[ioBroker.sentry 插件](https://github.com/ioBroker/plugin-sentry) 用于此目的。如果您不想用崩溃信息支持作者，请参阅[插件主页](https://github.com/ioBroker/plugin-sentry) 了解有关插件功能、收集哪些信息以及如何禁用它的详细信息。

### 免责声明
该项目与 WireGuard 没有任何关系。WireGuard 名称和 WireGuard 徽标仅用于指代该项目，且属于其所有者的财产。它们不属于该项目的一部分。

## 版权
版权所有 (c) 2025 grizzelbee <open.source@hingsen.de>

## Changelog
### 1.8.0 (2025-02-15)
- (grizzelbee) Upd: [#137](https://github.com/Grizzelbee/ioBroker.wireguard/issues/137)minor fixes for adapter checker
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: Removed snyk
- (grizzelbee) Fix: [#138](https://github.com/Grizzelbee/ioBroker.wireguard/issues/138) moved  to eslint 9 and fixed new lint errors
- (grizzelbee) Fix: [#119](https://github.com/Grizzelbee/ioBroker.wireguard/issues/119) Fixed log warning "invalid JsonConfig"

### 1.7.0 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: [#120](https://github.com/Grizzelbee/ioBroker.wireguard/issues/120) Fixed some issues mentioned by adapter-checker

### 1.6.4 (2024-05-08)
- (grizzelbee) Upd: Dependencies got updated

### 1.6.3 (2024-04-16)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: Removed annoying warning when setting null or undefined values (introduced in v1.6.2)
* (grizzelbee) Upd: Requiring at least admin v6.13.16

### 1.6.2 (2024-03-26)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: fixed sentry issues WIREGUARD-2B & WIREGUARD-2C
* (grizzelbee) Upd: Adapter requires at least node 18.x

### 1.6.1 (2023-09-14)
* (mcm1957) Fix: [#90](https://github.com/Grizzelbee/ioBroker.wireguard/pull/90) adapter-core 3.x.x is known to fail during installation at node 14 as npm 6 fails to install peerDependencies. So this adapter requires node 16 or newer
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: removed some old news entries in io-package file

### 1.5.11 (2023-08-30)
* (grizzelbee) Fix: [#88](https://github.com/Grizzelbee/ioBroker.wireguard/issues/88) Avoid warning: Cannot read properties of undefined (reading 'at') when user- or devicename is empty

### 1.5.10 (2023-08-17)
* (grizzelbee) Fix: Adapter doesn't crash anymore when user or device name is missing in config.

### 1.5.9 (2023-08-12)
* (grizzelbee) Fix: First device of any user was missing in users viewing
* (grizzelbee) New: Added an icon to peers, users, peer and user

### 1.5.8 (2023-08-11)
* (grizzelbee) Fix: Interface is now correctly set to offline if host is not reachable.

### 1.5.7 (2023-08-10)
* (grizzelbee) Fix: Added missing icon file
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy
* (grizzelbee) Fix: Another icon fix

### 1.5.2 (2023-08-09)
* (grizzelbee) Fix: Adapter does not crash anymore when host isn't reachable
* (grizzelbee) Fix: Added .releaseconfig file 
* (grizzelbee) Fix: Added icon to interface-device
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy

### 1.5.1 (2023-08-08)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.wireguard/issues/65) No names in object tree
* (grizzelbee) Fix: [#64](https://github.com/Grizzelbee/ioBroker.wireguard/issues/64) Online state of interface isn't set correctly if more than one server is queried
* (grizzelbee) Upd: Dependencies got updated

### 1.5.0 (2023-06-27)
* (grizzelbee) Deprecated: The current peer name/description will be dropped in one of the next versions. So please move over to Username/Device config.
* (grizzelbee) New: Splitted Peer names in config in user and device names; So that you are able to group devices by user
* (grizzelbee) New: Some new data fields: connectedPeers, connectedPeersCount, connectedUsers, connectedUsersCount and connection states per user
* (grizzelbee) Fix:  [#61](https://github.com/Grizzelbee/ioBroker.wireguard/issues/61) Fixed continuous recreation of objects
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Dropped support for NodeJS 12
* (grizzelbee) Upd: Added support for NodeJS 18

### 1.4.1 (2022-10-26)
* (grizzelbee) New: Showing number of currently connected peers for each interface

### 1.4.0 (2022-09-09)
* (grizzelbee) New: [#37](https://github.com/Grizzelbee/ioBroker.wireguard/issues/37) Added config options for port and docker container name
* (grizzelbee) Chg: Moved over to new jsonConfig Admin UI

### 1.3.2 (2022-09-07)
* (grizzelbee) New: [#38](https://github.com/Grizzelbee/ioBroker.wireguard/issues/38) Fixed "Adapter doesn't come online" bug caused by pseudo-tty settings

### 1.3.1 (2022-06-26)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added button to resume a single peer

### 1.3.0 (2022-06-25)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added buttons to suspend single and restore all peers of an interface
* (grizzelbee) Chg: Changed polling log entry from info to debug 
* (grizzelbee) Upd: dependencies got updated

### 1.2.1 (2022-04-24)
* (grizzelbee) Fixed: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Fixed a bug in tty linking which prevented docker option to work.

### 1.2.0 (2022-04-21)
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Added support for WireGuard inside a docker container

### 1.1.3 (2022-03-31)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-1](https://sentry.io/organizations/grizzelbee/issues/3027754005/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-H](https://sentry.io/organizations/grizzelbee/issues/3129951381/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-C](https://sentry.io/organizations/grizzelbee/issues/3036902024/events/?project=6215712)
* (grizzelbee) Upd: dependencies got updated

### 1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### 1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### 1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### 1.0.0 (2022-02-25)
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