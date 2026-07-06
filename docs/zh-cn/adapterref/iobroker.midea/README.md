---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.midea/README.md
title: ioBroker.midea
hash: rN8jfwxs85SLopsq8p9KCqOXt0t8ZLeiXzJA2gUVZQ8=
---
![标识](../../../en/adapterref/iobroker.midea/admin/midea.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.midea.svg)
![下载](https://img.shields.io/npm/dm/iobroker.midea.svg)
![安装数量（最新）](http://iobroker.live/badges/midea-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/midea-stable.svg)
![NPM](https://nodei.co/npm/iobroker.midea.png?downloads=true)

# IoBroker.midea
适用于美的、迪姆斯达和皇家克莱玛空调的ioBroker适配器。它通过**美的局域网协议**直接与您的设备通信——支持V3（默认）、V2和V1固件版本。仅在需要获取V3设备的加密令牌和完善设备名称时才会联系云账户；V1和V2设备无需云即可运行。

## 工作原理
1. 在端口 6445 上进行 UDP 广播，以发现局域网上的所有美的设备。

V3 固件回复 5a5a/8370 二进制帧，V2 回复原始 5a5a 帧，V1 回复 `<?xml …>` 响应（然后适配器打开与设备的短 TCP 往返，以了解其设备 ID）。

2. 对于 V3 设备，适配器会针对配置的云进行身份验证。

（默认使用 MSmartHome；NetHome Plus、美的 Air 或 Ariston Clima 可在*云应用*中选择），并请求 LAN 握手所需的设备专用 `{token, key}` 对。V1 和 V2 设备不需要云令牌——仅通过设备发现即可控制它们。

3. 从那时起，控制协议通过 TCP/6444 端口运行。V3 版本使用 8370 传输协议。

（AES-256-CBC + HMAC-SHA-256 会话）封装了 AES-128-ECB 加密的命令体。V1 和 V2 发送的原始 5a5a 数据包中包含相同的 AES-128-ECB 命令体，但没有 8370 信封和会话密钥。

云端仅用于获取 V3 令牌/密钥对，以及列出广播未覆盖的设备。云端路径中不包含任何实时数据。

＃＃ 要求
- Node.js **20** 或更高版本。
- ioBroker 主机必须与设备共享一个 L2 广播域 — UDP

6445端口必须能够到达。跨VLAN传输需要一个UDP广播中继（例如：

`udpbroadcastrelay`）。

- 对于 V3 固件设备（目前大多数空调产品线）：需要一个云账户

在匹配的应用程序中，*MSmartHome*（`com.midea.ai.overseas`, [Google Play](https://play.google.com/store/apps/details?id=com.midea.ai.overseas)）为默认设备。*NetHome Plus*、*Midea Air* 和 *Ariston Clima* 也受支持，可在*云应用程序*设置中选择。V1 和 V2 固件的设备无需云端控制，也无需凭据。

＃＃ 配置
| 字段 | 描述 |
| ---------- | ----------------------------------------------------------------------------- |
| `user` | 您的 MSmartHome 帐户电子邮件地址。 |
| `interval` | 轮询间隔（秒）（5–3600，默认 30）。每个设备均在本地进行轮询。 |
| `interval` | 轮询间隔，单位为秒（5-3600，默认 30）。每个设备均在本地进行轮询。 |

## 对象树
```text
midea.0
├── info.connection                 — boolean: cloud reachable
└── <deviceId>
    ├── info.*                      — id, name, host, mac, firmware, online…
    ├── capabilities.*              — flags reported by the appliance (B5)
    ├── status.*                    — current device state (read-only)
    └── control.*                   — writeable commands
```

### 控制（住宅空调，0xAC）
| 控制 | 类型 | 描述 |
| --------------------- | ------- | ---------------------------------------------- |
| `powerOn` | 布尔值 | 打开/关闭设备 |
| `temperatureSetpoint` | 数值 | 16–31 °C (60–87 °F) |
| `temperatureUnit` |枚举 |摄氏度/华氏度 |
| `fanSpeed` | 数字 | 0–102 (102 = 自动) |
| `fanSpeedName` | 枚举 | 静音 / 低 / 中 / 高 / 全开 / 自动 |
| `swing` | 枚举 | 关闭 / 垂直 / 水平 / 两者 |
| `ecoMode` | 布尔值 | 节能模式 |
| `turboMode` | 布尔值 | Turbo 模式 |
| `sleepMode` | 布尔值 | 睡眠模式 |
| `purify` | 布尔值 | 离子发生器/净化 |
| `dryClean` | 布尔值 | 内部干燥器 |
| `frostProtection` | 布尔值 | 8 °C 防冻加热 |
| `toggleDisplay` | 按钮 | 切换室内显示屏 LED |
| `toggleDisplay` | 按钮 | 切换室内显示屏 LED 的开关 |

`status.*` 树公开了设备报告的所有信息（室内/室外温度、摆动轴、错误代码、定时器状态、总耗电量 `powerUsage`（单位：kWh）等）。

`capabilities.*` 树反映了 B5 功能响应，因此您可以根据设备实际支持的功能对脚本进行分支。

### 控制（除湿器，0xA1）
| 控制 | 类型 | 描述 |
| ------------------ | ------- | -------------------------------------------- |
| `powerOn` | 布尔值 | 打开/关闭设备 |
| `targetHumidity` | 数值 | 0–100% 目标湿度 |
| `fanSpeed` | 数字 | 0–127 (40 静音，60 低，80 高，102 自动) |
| `fanSpeedName` | 枚举 | 静默 / 低 / 中 / 高 / 自动 |
| `ionMode` | 布尔值 | 离子发生器/负离子模式 |
| `sleepMode` | 布尔值 | 睡眠模式 |
| `pumpSwitch` | 布尔值 | 排水泵开/关 |
| `verticalSwing` | 布尔值 | 垂直摆动 |
| `tankWarningLevel` | 编号 | 油箱警告阈值（0–100%） |
| `tankWarningLevel` | 数字 | 油箱警告阈值（0–100%） |

`status.*` 树公开了设备报告的所有信息（室内/室外温度、摆动轴、错误代码、定时器状态、总耗电量 `powerUsage`（单位：kWh）等）。

`capabilities.*` 树反映了 B5 功能响应，因此您可以根据设备实际支持的功能对脚本进行分支。

## 支持的设备类型
涵盖 [美的本地](https://github.com/midea-lan/midea-local) 中描述的所有 36 种美的 V3 家电类型。

完全控制：

- `0xAC` 家用空调，`0xCC` 商用空调，`0xA1` 除湿机，`0xFA` 风扇，

`0xFC`空气净化器，`0xFD`加湿器。

- `0xCE` 新风系统、`0xCF` 热泵系统、`0xCD` 热泵热水器系统

`0xC3` 热泵控制器（区域、生活热水、静音/节能/消毒）。

- `0xDA` 顶装式洗衣机，`0xDB` 前装式洗衣机，`0xDC` 烘干机。
- `0xE2` 电热水器、`0xE3` 燃气热水器、`0xE6` 燃气锅炉、

`0xFB` 电加热器。

- `0xE1` 洗碗机、`0xB0` 微波炉、`0xBF` 嵌入式烤箱、`0xB6` 抽油烟机，

`0xB8` 吸尘器，`0xC2` 智能马桶，`0xED` 净水器。

- `0x13` 灯，`0x26` 浴室暖气，`0x34` 浴室洗碗机，

`0x40` 浴室排气扇。

只读元数据（上游未定义 `MessageSet`）：

- `0xCA` 冰箱。
- `0xE8` 压力锅，`0xEA`/`0xEC` 电饭煲。
- `0xB1` 烤箱，`0xB3` 蒸笼，`0xB4` 烤箱-蒸笼组合。
- `0xAD` 空气盒（PM2.5 / VOC 传感器）。

对于每个可控类型，可写字段在 `devices.<id>.controls.*` 下公开；传感器值在 `devices.<id>.status.*` 下公开。

### 控制（风扇，0xFA）
| 控制 | 类型 | 描述 |
| ------------------ | ------- | ------------------------------------------------------- |
| `powerOn` | 布尔值 | 打开/关闭设备 |
| `mode` | 枚举 | 正常 / 自然 / 睡眠 / 舒适 / 静音 / 婴儿 / … |
| `fanSpeed` | 数字 | 1–26 |
| `oscillate` | 布尔值 | 振荡开/关 |
| `oscillationMode` | 枚举 | 关闭 / 振荡 / 倾斜 / 曲线-W / 曲线-8 / 两者 |
| `oscillationAngle` | 枚举 | 关闭 / 30 / 60 / 90 / 120 / 180 / 360 |
| `tiltingAngle` | 枚举 | 关闭 / 30 / 60 / 90 / 120 / 180 / 360 / +60 / -60 / 40 |
| `tiltingAngle` | 枚举 | 关闭 / 30 / 60 / 90 / 120 / 180 / 360 / +60 / -60 / 40 |

### 控制（空气净化器，0xFC）
| 控制 | 类型 | 描述 |
| ------------------- | ------- | ------------------------------------------------- |
| `powerOn` | 布尔值 | 打开/关闭设备 |
| `fanSpeedName` | 枚举 | 自动 / 待机 / 低 / 中 / 高 |
| `anion` | 布尔值 | 阴离子/离子发生器 |
| `childLock` | 布尔值 | 童锁 |
| `screenDisplayName` | 枚举 | 亮 / 暗 / 关闭 |
| `detectMode` | 枚举 | 关闭 / pm25 / 甲醛 |
| `standby` | 布尔值 | 洁净空气时自动待机 |
| `standby` | 布尔值 | 洁净空气时自动待机 |

状态树将 pm25、tvoc、hcho、filter1Life 和 filter2Life 作为只读传感器值公开。

### 控制（加湿器，0xFD）
| 控制 | 类型 | 描述 |
| ------------------- | ------- | -------------------------------------------------------------------- |
| `powerOn` | 布尔值 | 打开/关闭设备 |
| `targetHumidity` | 数值 | 0–100% 目标湿度 |
| `fanSpeedName` | 枚举 | 最低 / 低 / 中 / 高 / 自动 / 关闭 |
| `screenDisplayName` | 枚举 | 亮 / 暗 / 关闭 |
| `disinfect` | 布尔值 | 消毒周期 |
| `消毒` | 布尔值 | 消毒周期 |

状态树将 currentHumidity、currentTemperature 和 tank 作为只读传感器值公开。

## 故障排除
- **`LAN 发现未找到 0 个设备`** — 您的 ioBroker 主机不在局域网内

与设备相同的广播域，或者 UDP 6445 被防火墙屏蔽。

- **`无法获取…的令牌/密钥`** — 该设备在云端处于离线状态

帐户或适配器配置中的凭据有误。

- **`LanClient: 超时`** — AC 可通过 UDP 访问，但 TCP/6444 连接中断

已被阻止，或者另一个局域网客户端（手机应用）当前已连接。

一次只允许一个 TCP 控制会话。

将适配器切换到调试日志记录模式——每个协议步骤（云调用、UDP 发现、TCP 握手、加密帧）都会记录有效负载大小和设备 ID，以便仅通过日志即可诊断实现情况。

## Changelog

<!-- 
  Placeholder for next versions. Do NOT remove. 
-->
### 1.8.3 (2026-05-25)

-   Adds a NetHome Plus Fallback for ot working devices

### 1.8.1 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 ("value is illegal") by aligning
    the V3 cloud request with the msmart-ng reference: drops the
    `uid:null` and `platformId` body fields, the `Authorization` header,
    switches the `random` header to crypto-random hex and the `stamp`
    to UTC.

### 1.8.0 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 on regional accounts: the V3
    client now follows the cloud's MAS re-route, sends the missing
    auth header, and falls back from LITTLE to BIG udpId.

### 1.7.1 (2026-05-20)

-   Adds a fixture-driven test suite for the unified `_processFrame`
    hook introduced in 1.7.0. Covers all 26 device classes and replays
    two real captures (A1 dehumidifier) so future parser changes break
    loudly. No runtime behaviour change.

### 1.5.0 (2026-05-19)

-   Adds LAN support for V1- and V2-firmware appliances. They are now
    discovered alongside V3 devices and controlled directly over TCP/6444 —
    no cloud token required (V1 only needs the cloud for the device list, V2
    works fully offline).
-   Tested only against V3 hardware; V1/V2 paths are ported from the
    `midea-local` reference implementation. Reports of mis-decoded frames are
    welcome.

### 1.4.0 (2026-05-19)

-   Adds NetHome Plus, Midea Air and Ariston Clima cloud accounts (V3 firmware
    appliances). Pick the cloud variant in the new "Cloud app" setting; the
    default stays MSmartHome.
-   Object tree simplified: devices now appear directly under the instance
    (no `devices.<id>` prefix) and the controls channel is now called
    `control`.
-   On first 1.4.0 start the old object tree is cleared automatically. If you
    want to start fresh later, set `info.migrationV1` to `false` and restart
    the adapter.
-   V1-firmware appliances on the LAN are not supported — they show up in
    the cloud list but never respond to local discovery.

### 1.3.1 (2026-05-19)

-   Controls now stay automatically in sync with the device status across all
    appliance types.
-   Internal refactor — no behavior changes for end users.

### 1.3.0

-   Coverage for all 36 Midea appliance types.
-   Full control for heat pumps, washers and dryer, water heaters, gas boiler,
    electric heater, dishwashers, microwave, oven, range hood, vacuum, smart
    toilet, water purifier, bathroom light/heater/fan and fresh-air.
-   Read-only data for refrigerator, pressure/rice cookers, oven/steamer and
    air-box.

### 1.2.0

-   Full control for fan, air purifier, and humidifier.

### 1.1.0

-   Full control for dehumidifier and commercial AC.
-   Poll interval is now in seconds (default 30 s).

### 1.0.0

-   Breaking change: rewritten on the LAN-first Midea V3 protocol. The cloud is
    only used to fetch each device's token/key.
-   Adds device discovery, local status polling, full AC controls and metadata
    for other appliances.

### 0.0.7

-   Last release of the legacy implementation.

## License

MIT License

Copyright (c) 2020-2026 TA2k <tombox2020@gmail.com>

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