---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: MAZ2H0yS5SFp1zG4VizqNi3Wndc4JrvDqZerO2GB6U0=
---
![标识](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![安装数量](https://iobroker.live/badges/mihome-cloud-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/mihome-cloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## Mihome-cloud ioBroker 适配器
适用于所有米家云设备的适配器。连接小米云API，提供您米家账号中所有注册设备的状态、控制和场景执行功能。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 5.0 开始使用。

＃＃ 要求
- Node.js 版本 >= 20
- js-controller >= 6.0.11
- 管理员版本 >= 7.6.20

＃＃ 配置
您可以在适配器设置中配置：

| 设置 | 描述 |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **地区** | 选择与您的米家 App 相匹配的小米云地区（德国、中国、俄罗斯、台湾、新加坡、美国） |
| **更新间隔** | 轮询间隔（分钟）（最短 1 分钟） |

＃＃ 登录
该适配器使用**基于 URL 的登录**（适配器设置中不需要用户名/密码）。

1. 在适配器设置中配置**区域**和**间隔**并保存。
2. 启动适配器。
3. 查看适配器日志——将显示**登录 URL**：

```
XIAOMI CLOUD LOGIN REQUIRED
Please visit this URL in your browser and log in: https://account.xiaomi.com/...
```

4. 在浏览器中打开网址，并使用小米账号登录。
5. 适配器自动检测到登录成功并连接。

会话会一直保留，即使适配器重启后仍然有效。只有当服务器端会话过期时才需要重新登录。

## 对象树
登录成功后，适配器会为每个设备创建以下对象结构：

### `mihome-cloud.0.<device-id>.general`
设备一般信息（型号、名称、固件版本等）。

### `mihome-cloud.0.<device-id>.status`
从 MIoT 规范中读取只读状态值（例如电源状态、亮度、温度）。这些值会按配置的间隔进行轮询。

### `mihome-cloud.0.<device-id>.remote`
来自 MIoT 规范的可写控制命令。要发送命令，请将状态（未确认）设置为 `true` 或所需的值。

如果命令需要输入参数，则这些参数会列在状态名称中，并且预期的 ID 会显示为默认值。

### `mihome-cloud.0.<device-id>.custom`
来自内部数据库`configDes`的设备特定属性（例如，对于吸尘器：`clean_area`、`clean_time`、`battery`）。这些属性通过`get_prop` / `get_status`进行轮询。

### `mihome-cloud.0.<device-id>.remotePlugins`
从小米云插件中提取的其他命令。这些命令会在启动时通过分析每个设备型号的插件包自动发现。

### `mihome-cloud.0.scenes`
从您的米家账号设置智能场景/自动化。将场景设置为`true`即可执行。

## 示例：机器人吸尘器房间清洁
1. 查找房间 ID：

`mihome-cloud.0.<id>.remote.get-map-room-list` – 需要 `[cur-map-id]` 作为输入。

您可以从 `mihome-cloud.0.<id>.status.cur-map-id` 获取当前地图 ID，或者通过以下方式查询地图列表：

`mihome-cloud.0.<id>.remote.get-map-list`（无需输入）→ 结果显示在 `mihome-cloud.0.<id>.status.map-list` 下方

2. 设置地图 ID 并查询房间：

`mihome-cloud.0.<id>.remote.get-map-room-list` 输入 `[<map-id>]`

→ 结果：`mihome-cloud.0.<id>.status.room-id-name-list`：`[{"name":"room1","id":10}]`

3. 开始打扫房间：

`mihome-cloud.0.<id>.remote.start-room-sweep` 格式为 `["10", "11", "12", "13"]`

   或者

`mihome-cloud.0.<id>.remote.set-room-clean` 格式为 `["10",0,1]`

## 故障排除
- **“数据库已关闭”错误**：无害——当适配器在请求仍在等待处理时停止运行时会发生此错误。这些错误会自动抑制。
- **“ECONNRESET”错误**：小米云网络暂时中断。适配器会在下一个轮询间隔自动重试。
- **“-106 设备网络不可达”**：设备（例如吸尘器）当前处于离线状态、已断开 Wi-Fi 连接或已关闭电源。适配器会将此信息记录为调试信息并继续尝试连接。
- **401 错误**：服务器端会话已过期。请重启适配器以触发新的二维码登录。
- **设备无属性**：某些纯 Zigbee/蓝牙传感器设备（例如 `lumi.sensor_switch.v2`）不会通过云 API 公开其状态。请考虑改用本地 Zigbee 适配器。

## 讨论和提问
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog
### 1.0.5 (2026-04-01)
- (fix) improve 401 authentication error handling and session reset
- (fix) validate and limit user configurable update interval
- (fix) update dependencies to address vulnerabilities

### 1.0.4 (2026-03-14)
- Maintenance update: Consolidated changelog and fixed repository metadata for better standards compliance

### 1.0.3 (2026-03-14)
- **Major update with complete rewrite:**
  - New QR-code based login flow
  - Support for many new Xiaomi device models (Air Purifiers 4 series, newer fans/heaters, robot vacuums)
  - Added environment properties (Temperature, Humidity) to many device configurations
  - Improved error handling for network interruptions
  - Migration to external i18n files and Node.js 20+ requirement
  - Updated dependencies and fixed known vulnerabilities
  - Added missing translations (uk, ru, pt, nl, fr, it, es, pl, zh-cn)
  - Migration to ESLint flat config and release-script support

### 0.2.2

- Minor improvements with device handling

### 0.2.1

- Fix login. Check Log after starting Adapter

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.4

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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