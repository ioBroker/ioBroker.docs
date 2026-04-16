---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.air-q/README.md
title: ioBroker.air-q
hash: n8TAgcFn4LhWTlqTjxNW1MkZ003SePBMmj9nOZmqgXo=
---
# IoBroker.air-q

![NPM 版本](https://img.shields.io/npm/v/iobroker.air-q.svg)
![下载](https://img.shields.io/npm/dm/iobroker.air-q.svg)
![安装数量](https://iobroker.live/badges/air-q-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/air-q-stable.svg)
![NPM](https://nodei.co/npm/iobroker.air-q.png?downloads=true)

<img src="admin/air-q.png" alt="airq-logo" width="200"/>

**测试：** ![测试与发布](https://github.com/CorantGmbH/ioBroker.air-q/workflows/Test%20and%20Release/badge.svg)

＃＃ 内容
- [关于](#about)
- [入门指南](#start)
- [更新日志](#change)
- [许可证](#license)

＃＃ 关于<a id="about"/>
此 ioBroker 适配器与我们的 [air-Q 设备](https://www.air-q.com) 配合使用。它会轮询传感器数据，并在 ioBroker 环境中显示这些数据。

</br> </br>

![air-Q_frontal + Seitlich_full](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5c38d737-9641-463f-bd07-ac62ce5f1973)

＃＃ 入门<a id="start" />
### 安装适配器并添加实例
在您的管理界面中，导航至侧边栏中的 `Adapters`，并在 `Filter by name` 中搜索 `air-q`。在适配器的 `⋮` (`Info`) 菜单中选择 `+` (`Add instance`)。

这将自动打开实例设置。

否则，您也可以通过控制台使用 ioBroker 命令行界面。只需进入 ioBroker 根文件夹，然后通过以下方式添加适配器即可。

```
iobroker add air-q
```

此操作会安装适配器（如果尚未安装）并添加一个实例。您仍需按照以下说明配置此实例。

如果您只想安装适配器而不想创建实例，请使用以下命令：

```
iobroker install air-q
```

有关更多信息，请访问 ioBroker CLI 文档，网址为 https://github.com/ioBroker/ioBroker/wiki/Console-commands。

＃＃ 配置
![配置](../../../en/adapterref/iobroker.air-q/docs/screenshot-config.png)

### 查找您的 Air-Q 设备
该适配器可使用 mDNS（Bonjour）自动发现本地网络上的 air-Q 设备。打开实例设置后，“扫描网络”下拉菜单将搜索设备（约 10 秒），并按名称列出所有找到的 air-Q 设备。选择您的设备后，系统将自动填写短 ID 和 IP 地址。

**如果未找到任何设备**，可能是您的路由器阻止了设备间的 mDNS 通信（常见于网状网络、访客网络或企业级网络）。在这种情况下，请勾选“使用 IP 连接”复选框，然后手动输入设备的 IP 地址。您可以在 air-Q 智能手机应用或路由器的设备列表中找到该 IP 地址。

您还可以通过 **ioBroker.discovery** 配置适配器：从发现适配器运行网络扫描，air-Q 设备将通过 DNS 或 HTTP 自动检测到。

### 连接选项
- **网络扫描**：通过 mDNS 自动发现 air-Q 设备。选择设备即可自动填充短 ID 和 IP 地址。
- **使用 IP 地址连接**：直接使用设备的 IP 地址连接。当您的网络无法通过 mDNS 发现功能连接时，请使用此方法。
- **短 ID**：设备序列号的前 5 个字符。当“使用 IP 连接”未选中时，用于 mDNS 查询。
- **设备密码**：您的 air-Q 设备的密码。

＃＃＃ 选修的
- **尊重设备夜间模式**。默认：`开启`。当您的 air-Q 设备启用夜间模式并在夜间关闭 WiFi 时，适配器可以自动跳过夜间的轮询尝试。这可以避免日志中出现不必要的连接错误。⚠️ 如果您更改了设备的夜间模式设置（开始/结束时间、启用/禁用），您有两种选择：
1.（推荐）：重启适配器以立即加载新配置
2.（自动）：等待最多 1 小时，适配器将自动刷新配置（仅在夜间模式之外有效）

- **截断负值**。默认值：`off`。为了进行基线校准，某些传感器值可能会短暂变为负值。您可以安全地将这些值截断为 0。

- **每隔 x 秒轮询一次数据**。默认值：`10`。您可以通过输入以秒为单位的数字来配置数据轮询的频率。

- **检索数据类型**。默认值：`平均数据`。在默认配置下，air-Q 会对传感器值流进行平均。此适配器允许在轮询设备的平均数据和原始数据之间切换。要轮询设备中存在噪声的传感器读数，请从下拉菜单中选择“实时数据”。

现在一切就绪，可以出发了！

传感器是物体
设备被找到后，数据将根据您的配置检索并显示在“对象”选项卡中。当然，根据您拥有的设备，可能会显示更多传感器信息。

![屏幕截图 2024-02-13 110655](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5639fdcb-3acf-4223-b1fa-fb69016c9d7b)

***目前我们已包含 air-Q Pro 的所有传感器。可选传感器将在未来的补丁中添加。***

## Changelog

### 1.2.0
* **Network discovery**: air-Q devices on the local network are now automatically discovered via mDNS. Select a device from the dropdown and the Short ID and IP are filled in automatically.
* **Admin UI modernized**: Migrated from Materialize HTML to jsonConfig (declarative JSON). Settings are now organized in two tabs: Connection and Data Retrieval.
* **ioBroker.discovery integration**: Fixed the detection file to correctly populate adapter config fields, call the discovery callback, and distinguish multiple air-Q devices. Added HTTP `/ping` fallback for networks without reverse DNS.
* **Troubleshooting guidance**: The admin UI now explains what to do when mDNS doesn't work (router blocking, how to find the device IP).

### 1.1.0
* Added support for 19 new sensors: acetaldehyde (C₂H₄O), arsine (AsH₃), bromine (Br₂), methanethiol (CH₄S), chlorine dioxide (ClO₂), carbon disulfide (CS₂), ethylene (C₂H₄), fluorine (F₂), temperature in Farenheit, hydrochloric acid (HCl), hydrogen cyanide (HCN), hydrogen fluoride (HF), hydrogen peroxide (H₂O₂), mold protection, phosphine (PH₃), refrigerant R-32, refrigerant R-454B, refrigerant R-454C, silane (SiH₄)

### 1.0.7
* Missing (e.g. warming up) sensors are skipped gracefully
* Fixed incorrect translations
* Refactor redundant methods

### 1.0.6
* The adapter can automatically respect your air-Q device's night mode configuration

### 1.0.5
* Fixed sensors dropping custom configuration after a restart
* Updated dependencies: version bump for `adapter-core`

### 1.0.4

* Updated dependencies: bumped multiple packages (`chai-as-promised`, `sinon`, `mocha`) to address vulnerabilities
* Codebase maintenance: updated `io-package.json` and added tests against Node.js 22

### 1.0.3

* Added a checkbox for showing and hiding the password in the instance configuration
* Edited the error messages to be more helpful
* Added logging information when the air-Q device is actually connected

### 1.0.2

* Added units for each sensor value
* Updates within config files

### 1.0.1

* Added sensor list update when connecting to a different air-Q in the same instance
* Fixed name display and update of device

### 1.0.0

* Include typescript files by @pr0crstntr in #6
* Created air-Q class by @pr0crstntr in #4
* Fix restart bug by @pr0crstntr in #7
* Update data poll by @pr0crstntr in #8
* Updated io-package by @pr0crstntr in #9
* Fixed save option for configuration by @pr0crstntr in #16
* Added clear intervals on unload by @pr0crstntr in #26
* Update README by @pr0crstntr in #37
* Changed role for temperature and added unit by @pr0crstntr in #38

### 0.0.1

* (Katharina K.) initial release

## License

MIT License

Copyright (c) 2024-2026 Corant GmbH

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