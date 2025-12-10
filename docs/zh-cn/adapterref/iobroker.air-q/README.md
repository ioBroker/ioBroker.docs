---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.air-q/README.md
title: ioBroker.air-q
hash: /mRC28Db6zteKQ26qsHwEGoBQpAsc98CHy0AbKPJ7ns=
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
＃＃＃ 必需的
要配置您的实例，您只需选择是通过设备的 IP 地址还是短 ID 进行连接即可。

<img width="1263" height="953" alt="2025-12-10T17:57:57,025532652+01:00" src="https://github.com/user-attachments/assets/93ff4c76-bdf5-4336-bb5a-1a0aa844ec0d" />

请确保您输入的IP地址/ID和密码正确。

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

Copyright (c) 2024 Corant GmbH

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