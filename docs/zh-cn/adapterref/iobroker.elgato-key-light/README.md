---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.elgato-key-light/README.md
title: ioBroker.elgato-key-light
hash: 12th8LHpGRONBMe5hYjbgGxLte2cGiXWo1PtJzPFvvo=
---
![标识](../../../en/adapterref/iobroker.elgato-key-light/admin/elgato-key-light.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)
![下载](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)
![安装](https://iobroker.live/badges/elgato-key-light-installed.svg)
![稳定的](https://iobroker.live/badges/elgato-key-light-stable.svg)

# IoBroker.elgato-key-light
英文 | [德语](README_DE.md)

## 免责声明
本项目中提及的所有产品和公司名称、标识和商标均属于其各自所有者。使用这些名称、标识和商标仅用于识别目的，并不暗示与这些所有者或其关联公司存在任何关联、赞助或认可关系。本项目为私人非商业项目，仅供娱乐用途。Elgato 是 Corsair GmbH 的商标。

## 使用 Sentry 进行错误报告
此适配器使用 ioBroker 提供的 Sentry 集成，自动向开发人员报告意外异常和代码错误。自 3.0 版本起，js-controller 就已提供错误报告功能，有助于识别和解决那些可能被忽略的缺陷。

有关传输信息的详细信息以及禁用错误报告的说明，请参阅 [ioBroker Sentry 官方文档](https://github.com/ioBroker/ioBroker.js-controller#error-reporting-via-iobroker-sentry)。

无需 Elgato 云账户，即可通过 ioBroker 在本地控制支持的 Elgato Wi-Fi 灯。该适配器可通过 Bonjour/mDNS 发现灯具，或连接到手动配置的私有 IP 地址或本地主机名。它会根据 ioBroker 的状态提供设备控制和状态信息，并在管理界面中提供便捷的仪表盘。

## 适配器的用途
该适配器将 Elgato 灯连接到 ioBroker，以便可以从管理对象视图、脚本、场景、可视化和其他 ioBroker 适配器中使用它们。典型用途包括：

- 将演播室灯光与直播或录音设备一起切换；
- 根据一天中的时间调节亮度和色温；
- 通过 RGB/HSV 颜色控制 Elgato 灯带；
- 监控灯是否可达以及下次轮询时间；
- 显示 Key Light Mini 的电池和充电状态；
- 通过 Elgato Lights 专用控制面板手动操作灯光。

通信始终在本地网络上进行。适配器轮询每个已配置的设备，发布其当前状态并将用户更改发送回设备。失败的请求采用有界重试/退避策略，以防止离线指示灯造成网络过载。

支持的设备和功能
控件是根据实际的 API 响应创建的，而不是根据硬编码的产品名称创建的。这使得兼容的固件和相关的 Elgato 灯光型号能够展现它们所报告的所有功能。

| 功能 | 钥匙灯/空气灯/环形灯 | 迷你钥匙灯 | 灯带 |
| --- | --- | --- | --- |
| 电源和亮度 | 是 | 是 | 是 |
| 色温 | 是 | 是 | 如果已报告 |
| 色相、饱和度、RGB 和十六进制 | 如有报告 | 如有报告 | 是 |
| 电池和充电信息 | 否 | 是 | 否 |
| 录音室模式/电池旁路 | 否 | 如果已报告 | 否 |
| 确定 | 是 | 是 | 是 |

由于尚未在支持的硬件和固件矩阵中验证灯带场景/效果和设备重启的行为，因此故意不公开这些功能。

＃＃ 要求
- Node.js 22.18 或更高版本
- js-controller 7.2.2 或更高版本
- 管理员版本 7.8.23 或更高版本
- 从 ioBroker 主机到灯具的网络访问，通常使用 TCP 端口 9123
- 使用自动发现时，Bonjour/mDNS UDP 端口 5353

Elgato Light 和 ioBroker 主机通常需要位于同一局域网内。跨 VLAN 发现可能需要 mDNS 反射器；当多播发现不可用时，可以使用手动配置。

安装和设置
1. 安装适配器并创建实例。
2. 打开实例配置。
3. 选择“扫描网络”查找 `_elg._tcp.local.` 服务，然后添加所需结果。或者，手动输入私有 IP 地址或 `.local` 主机名和端口。Elgato API 的默认端口为 `9123`。
4. 添加地址前，请使用**测试**功能检查手动地址。
5. 启用已配置的设备并保存配置。
6. 打开管理侧边栏中的 **Elgato Key Light** 选项卡进行实时控制。

网络扫描仅显示可用设备。请显式添加所需的扫描结果，以确保设备始终分配给预期的适配器实例。

### 运行时选项
| 选项 | 默认值 | 用途 |
| --- | ---: | --- |
| 轮询 | 60 秒 | 读取当前设备数据的正常间隔 |
| 请求超时 | 3000 毫秒 | 单次设备请求的最大持续时间 |
| 最大退避时间 | 300 秒 | 失败后延迟重试次数的上限 |
| 写入防抖 | 200 毫秒 | 将快速的滑块变化合并为更少的 API 请求 |
| 发现超时 | 5000 毫秒 | 一次 Bonjour/mDNS 扫描的持续时间 |

更短的轮询间隔可以更快地更新状态，但会增加网络和设备的负载。仪表盘的开关和滑块采用乐观更新方式，因此成功操作会立即显示，而下一次设备响应则会确认该值。

## 使用仪表板
适配器选项卡会为所选实例中配置的每个设备显示一张卡片。每张卡片仅显示该设备支持的控件：

- **电源**控制灯的开关。
- **亮度** 设置输出范围为 0% 到 100%。
- **温度** 控制白色色温，支持时范围为 2900 K 至 7000 K。
- **颜色** 打开支持 RGB 的设备的浏览器颜色选择器。
- **工作室模式** 当 Key Light Mini 的固件报告设置时，该模式可控制 Key Light Mini 的电池旁路。
- **识别** 使选定的设备识别自身。
- **重新连接** 会立即再次读取设备。

该卡片还会显示在线/离线状态、响应延迟、固件版本、电池信息（如有）以及下次轮询的实时倒计时。“全部开启”和“全部关闭”按钮会控制当前适配器实例中所有可访问的指示灯。“刷新”按钮会重新加载仪表盘数据，而“诊断”按钮则会显示有助于故障排除的运行时间和设备信息。

更改灯带颜色不会影响其单独的亮度设置。状态值 `hex` 和 `rgb` 代表当前发出的颜色，因此也包含了当前的亮度。例如，同一种蓝色在 50% 亮度下可能显示为 `#000080`，而在 100% 亮度下可能显示为 `#0000FF`。

## 使用 ioBroker 状态控制设备
每个成功连接的设备都会根据其序列号获得一个根对象：

```text
elgato-key-light.<instance>.<serial>
```

大多数设备在`light.lights.0`处包含一个指示灯。仅创建设备支持的状态。

| 相对状态 | 类型/范围 | 描述 |
| --- | --- | --- |
| `reachable` | 布尔值，只读 | 设备当前是否可达 |
| `info.displayName` | 字符串 | 读取或更改设备显示名称 |
| `light.numberOfLights` | 数字，只读 | API 报告的轻元素数量 |
| `light.lights.0.on` | 布尔值 | 开关电源 |
| `light.lights.0.brightness` | 数字，0–100% | 设置亮度 |
| `light.lights.0.temperature` | 数值，2900–7000 K | 设置白色色温 |
| `light.lights.0.hue` | 数字，0–360° | 设置色调 |
| `light.lights.0.saturation` | 数字，0–100% | 设置颜色饱和度 |
| `light.lights.0.hex` | 字符串 | 设置颜色为 `#RRGGBB` |
| `light.lights.0.rgb` | 字符串 | 以旧版 `R,G,B` 格式设置颜色，例如 `255,0,0` |
| `battery.level` | 数字，0–100%，只读 | 按键指示灯迷你电池电量 |
| `battery.status` | 字符串，只读 | 设备报告的充电状态 |
| `battery.powerSource` | 字符串，只读 | 当前电源 |
| `battery.studioMode` | 布尔值 | 启用或禁用 Studio 模式（如果支持） |
| `health.reachable` | 布尔值，只读 | 详细可达性状态 |
| `health.latency` | 以毫秒为单位的数字，只读 | 最近一次 API 请求的持续时间 |
| `health.lastSuccess` | 日期字符串，只读 | 上次成功联系的时间 |
| `health.lastError` | 字符串，只读 | 最近一次通信错误 |
| `health.consecutiveFailures` | 数字，只读 | 连续轮询失败次数 |
| `health.nextPoll` | 日期字符串，只读 | 下次轮询的预定时间 |
| `health.nextPoll` | 日期字符串，只读 | 下次轮询的预定时间 |

当报告相应数据时，可能会创建额外的只读状态 `info`、Wi-Fi、电池电压/电流和设备设置状态。

### 脚本示例
请将实例编号和序列号替换为 ioBroker 对象树中的 ID。可写状态必须以 `ack = false` 的形式写入，以便适配器将其识别为命令。

```javascript
const light = 'elgato-key-light.0.EW40K1A09882.light.lights.0';

// Switch on and set brightness to 65%.
setState(`${light}.on`, true, false);
setState(`${light}.brightness`, 65, false);

// Set a warm white color temperature.
setState(`${light}.temperature`, 3200, false);

// Set an RGB-capable light to blue without changing its brightness.
setState(`${light}.hex`, '#0000FF', false);
```

Blockly、Scenes、VIS 和其他 ioBroker 组件均可使用相同的可写状态。快速滑块写入操作会按设备合并，最后写入的值生效。

## 多实例和移除设备
每个适配器实例都有其自身的权威设备列表。其配置页面、对象树和仪表盘仅使用分配给该实例的设备。如果您运行多个实例，请将每个灯具仅添加到需要控制它的实例中。

使用垃圾桶图标移除设备会将其从正在运行的实例、持久化的实例配置以及该实例的设备对象树中移除。建议在配置更改后保存管理页面。分配给其他实例的设备不受影响。

## 故障排除
### 未找到设备
- 确认 ioBroker 和灯可以通过本地网络相互通信。
- 对于发现，请检查组播 DNS/UDP 5353 和 `_elg._tcp.local.` 转发。
- 如果无法跨 VLAN 发现，请手动添加私有 IP 地址或 `.local` 主机名。
- 确认 TCP 端口 9123 可访问，并且设备未被访客 Wi-Fi 策略隔离。

### 控制面板中显示某个设备离线
此卡片显示最新错误以及下次重试的倒计时。使用**重新连接**可立即读取。请查看`health.lastError`、`health.consecutiveFailures`和`health.nextPoll`，了解自动化或监控设置。

### 缺少控件
适配器会根据设备返回的字段创建控件。如有需要，请更新设备固件，重新连接设备并检查 `info.capabilities` 或仪表板诊断信息。控件缺失通常表示 API 未报告该功能。

### 收集诊断信息
仪表盘诊断对话框包含适配器/运行时版本和当前设备视图。SSID 值已省略，但设备序列号和本地网络地址可能会显示，因为这些信息有助于诊断。请在公开分享输出结果之前仔细检查。

开发人员和硬件测试人员可以使用仅 GET 探测：

```shell
npm run elgato:probe -- 192.168.1.50 9123
```

探测器会隐去序列号、MAC 地址和 SSID。协议详情记录在 [docs/ELGATO_API.md](docs/ELGATO_API.md) 中。

网络和隐私
设备通信使用本地未经身份验证的 Elgato HTTP API。主机验证仅接受私有/链路本地地址和本地主机名；URL 方案、嵌入式凭据、路径和公共 IP 地址均被拒绝。该适配器不需要 Elgato 云帐户，也不会添加遥测数据。

由于本地设备 API 没有身份验证，请将灯具和 ioBroker 主机放在受信任的网络上，不要将 TCP 端口 9123 暴露给互联网。

## 从旧版本更新
设备序列号根目录和 `<serial>.light.lights.0` 下方已建立的可写路径将被保留。有关元数据更正、配置迁移和回滚信息，请参阅 [docs/MIGRATION.md](docs/MIGRATION.md)。在进行重大更新之前，请创建 ioBroker 备份。

＃＃ 发展
```shell
npm run install:all
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run build
```

硬件测试默认是可选的、仅允许 GET 请求的，并且不能在 CI 中运行。

## Changelog
### **WORK IN PROGRESS**

### 2.0.0 (2026-08-16)

- (xXBJXx) Reworked the backend with a validated HTTP client, capability detection, resilient polling and bounded Bonjour/mDNS discovery.
- (xXBJXx) Added reliable controls for supported lights, including RGB, temperature, battery and studio mode, with strict instance isolation and clean device removal.
- (xXBJXx) Modernized the configuration and dashboard UIs with responsive device cards, health data, diagnostics and device/API details.
- (xXBJXx) Addressed repository checker findings for managed timers and repository metadata.
- (xXBJXx) Requires Node.js >= 22.18, js-controller >= 7.2.2 and Admin >= 7.8.23.
- (xXBJXx) Fixes issues [#116](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/116), [#117](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/117), [#130](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/130), [#152](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/152) and [#159](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/159); supersedes PRs [#39](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/39), [#129](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/129), [#181](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/181), [#185](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/185), [#186](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/186), [#209](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/209) and [#250](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/250).

Older entries: [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License

Created by xXBJXx and maintained by ioBroker Community Adapters. Elgato is a trademark of Corsair GmbH; this project is not affiliated with or endorsed by Elgato/Corsair.

Copyright (c) 2024-2026 iobroker-community-adapters mcm57@gmx.at  
Copyright (c) 2023 xXBJXx issi.dev.iobroker@gmail.com

Released under the MIT License. See [LICENSE](LICENSE).