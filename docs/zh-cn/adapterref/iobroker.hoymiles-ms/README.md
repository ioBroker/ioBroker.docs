---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.hoymiles-ms.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.hoymiles-ms.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/hoymiles-ms-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/hoymiles-ms-stable.svg
BADGE-License: https://img.shields.io/github/license/mcm4iob/ioBroker.hoymiles-ms?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hoymiles-ms/README.md
title: ioBroker.hoymiles-ms 文档
hash: XdANQRUTTcvgeXXYUoLAqs4mHBD9YcrHLLelH+Ggnjs=
---
# IoBroker.hoymiles-ms 文档
＃＃ 概述
**ioBroker.hoymiles-ms** 适配器将 **Hoymiles 微型储能系统**（目前支持 Hoymiles MS-A2 型号）集成到 ioBroker 中。该适配器使用户能够通过 ioBroker 平台监控和控制您的 Hoymiles MS-A2 储能系统。

Hoymiles MS-A2 是一款集太阳能逆变器和电池储能功能于一体的微型储能单元。有关该设备的更多信息，请参阅 [这里](https://www.hoymiles.com/de/products/micro-storage)。

**注意：**此适配器与 Hoymiles 无关，是一个独立的社区项目。

＃＃ 特征
- **实时监控**：电池状态、功耗、电网交互
- **能源跟踪**：监测能源生产、消耗和存储
- **电网监测**：跟踪并网和离网运行情况
- **系统统计信息**：系统性能的全面概览
- **功率控制**：设置和控制功率输出级别
- **多设备支持**：可同时处理多个 MS-A2 设备
- **MQTT 通信**：通过 MQTT 协议进行可靠通信

## 先决条件
安装适配器前，请确保您已具备以下条件：

1. **ioBroker 系统** 正在运行（Node.js >= 20）
2. **Hoymiles MS-A2** 微型存储单元
3. 在您的移动设备上安装**S-Miles Home App**
4. ioBroker 与 MS-A2 单元之间的**网络连接**
5. 用于 MQTT 通信的**空闲 TCP 端口**（默认值：1881）

## 适配器设置和配置
### 第一步：安装适配器
通过ioBroker管理界面安装适配器：

1. 在您的网络浏览器中打开 ioBroker 管理界面
2. 导航至“适配器”选项卡
3. 在适配器存储库中搜索“hoymiles-ms”
4. 点击适配器旁边的“安装”按钮。

**重要提示：**切勿直接使用 npm 安装 ioBroker 适配器。务必使用 ioBroker 管理界面进行正确的安装和依赖项管理。

### 步骤 2：配置适配器
1. 打开ioBroker管理界面
2. 导航至“适配器”并找到“hoymiles-ms”
3. 点击配置（齿轮）图标
4. 配置以下设置：

#### MQTT 服务器配置
| 参数 | 描述 | 默认值 | 备注 |
|-----------|-------------|---------------|-------|
| **客户端模式** | 启用 MQTT 客户端模式 | `false` | 目前尚未实现 |
| **MQTT 端口** | MQTT 服务器的 TCP 端口 | `1881` | 避免与其他 MQTT 服务冲突 |
| **MQTT 端口** | MQTT 服务器的 TCP 端口 | `1881` | 避免与其他 MQTT 服务冲突 |

重要提示：

- 该适配器目前仅在**MQTT 服务器模式**下运行。
- **目前尚不支持身份验证** - 请确保您的网络安全
选择端口 1881 是为了避免与 ioBroker.mqtt (1883) 和 ioBroker.shelly (1882) 发生冲突。

### 第三步：保存并启动适配器
1. 在配置对话框中单击“保存并关闭”
2. 启用适配器实例
3. 适配器将启动并开始监听 MQTT 连接。

## Hoymiles MS-A2 设备设置
要将 MS-A2 设备连接到 ioBroker 适配器，您需要使用 S-Miles Home App 进行配置。

### 步骤 1：打开 S-Miles Home 应用程序
1. 在您的移动设备上启动 S-Miles Home 应用程序
2. 确保您的设备与 MS-A2 设备连接到同一网络。

### 步骤 2：访问 MQTT 配置
1. 进入**配置**页面（右上角齿轮图标）
2. 向下滚动找到“MQTT 服务”部分
3. 启用 MQTT 服务

### 步骤 3：配置 MQTT 设置
| 设置 | 值 | 描述 |
|---------|-------|-------------|
| **服务器地址** | `<ioBroker-IP>` | 您的 ioBroker 系统的 IP 地址 |
| **客户端前缀** | `MSA` | 可选标识符前缀（默认值：MSA） |
| **身份验证** | `Disabled` | 必须禁用（尚不支持） |
| **身份验证** | `已禁用` | 必须禁用（尚不支持） |

**配置示例：**

- 服务器地址：`192.168.1.100`（请替换为您的 ioBroker IP 地址）
- 端口：`1881`
- 客户端前缀：`MSA`
- 用户名：*（留空）*
- 密码：*（留空）*

### 步骤 4：应用设置
1. 在 S-Miles Home 应用中保存 MQTT 配置
2. MS-A2 设备将重启其 MQTT 服务
3. 检查 ioBroker 日志以确认连接。

## 操作和数据流
### 数据更新间隔
MS-A2 单元以不同的时间间隔发送数据（这些时间间隔由 Hoymiles API 定义，无法配置）：

- **配置数据**：连接建立后发送一次
- **实时数据**：每**1秒**更新一次
- **系统统计信息**：每**5分钟**更新一次

### 设备连接状态
适配器会自动监控设备连接。
如果 30 秒内未收到任何数据，则设备被视为**离线**。
连接状态显示在 `info.online` 状态中

## 适配器创建的状态
适配器会根据从 MS-A2 设备接收的数据动态创建状态。状态以分层结构组织：

### 设备信息状态
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `device.manufacturer` | 字符串 | - | 文本 | 设备制造商 |
| `device.name` | 字符串 | - | info.name | 设备名称 |
| `device.sw_version` | 字符串 | - | info.firmware | 软件版本 |
| `device.identifiers` | 数组 | - | 列表 | 设备标识符 |
| `device.identifiers` | 数组 | - | 列表 | 设备标识符 |

### 电池状态
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `device.bat_i` | 数字 | A | 值.电流 | 电池电流 |
| `device.bat_temp` | 数字 | °C | 温度值 | 电池温度 |
| `device.bat_v` | 数字 | V | 电压值 | 电池电压 |
| `device.bat_sts` | 字符串 | - | 文本 | 电池状态 |
| `device.soc` | 数量 | % | 值 | 充电状态 |
| `device.soc` | 数字 | % | 值 | 电量 |

### 并网状态（并网开启）
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `device.grid_on.v` | 编号 | V | 电压值 | 电网电压（并网） |
| `device.grid_on.f` | 数字 | 赫兹 | 值.频率 | 电网频率（并网） |
| `device.grid_on.p` | 数字 | W | value.power.active | 有功功率（并网） |
| `device.grid_on.q` | 数字 | 变量 | 值.功率.无功功率 | 无功功率（并网） |
| `device.grid_on.ein` | 数字 | 瓦时 | 能量消耗值 | 电网消耗的能量 |
| `device.grid_on.eout` | 数字 | 瓦时 | 能量产生值 | 并网发电量 |
| `device.grid_on.etin` | 数字 | 瓦时 | 能量消耗值 | 总能量消耗（并网） |
| `device.grid_on.etout` | 数字 | 瓦时 | 能量产生值 | 总发电量（并网） |
| `device.grid_on.etout` | 数字 | 瓦时 | value.energy.produced | 总发电量（并网） |

### 并网状态（电网关闭）
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `device.grid_off.v` | 编号 | V | 电压值 | 电网电压（离网） |
| `device.grid_off.f` | 数字 | 赫兹 | 值.频率 | 电网频率（离网） |
| `device.grid_off.p` | 数字 | W | value.power.active | 有功功率（离网） |
| `device.grid_off.q` | 数字 | 变量 | 值.功率.无功功率 | 无功功率（离网） |
| `device.grid_off.ein` | 数字 | 瓦时 | 耗能值 | 离网耗能 |
| `device.grid_off.eout` | 数字 | 瓦时 | 能量产生值 | 离网发电量 |
| `device.grid_off.etin` | 数字 | 瓦时 | 能量消耗值 | 总能量消耗（离网） |
| `device.grid_off.etout` | 数字 | 瓦时 | 能量产生值 | 总发电量（离网） |
| `device.grid_off.etout` | 数字 | 瓦时 | value.energy.produced | 总发电量（离网） |

### 逆变器状态
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `device.inv.v` | 编号 | V | 电压值 | 逆变器电压 |
| `device.inv.p` | 数字 | W | value.power.active | 逆变器有功功率 |
| `device.inv.q` | 数字 | 变量 | 值.功率.无功 | 逆变器无功功率 |
| `device.inv.ein` | 数量 | 瓦时 | 能量消耗值 | 逆变器能量消耗 |
| `device.inv.eout` | 数量 | 瓦时 | 能量产生值 | 逆变器产生的能量 |
| `device.inv.etin` | 数量 | 瓦时 | 能量消耗值 | 逆变器总能量消耗 |
| `device.inv.etout` | 数量 | 瓦时 | 能量产生值 | 逆变器总能量产生量 |
| `device.inv.etout` | 数量 | 瓦时 | 产生的能量值 | 逆变器总产生能量 |

### 实时数据状态
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `realtime.bat_p` | 数字 | 瓦 | 功率值 | 实时电池电量 |
| `realtime.grid_on_p` | 数字 | 瓦特 | 值.功率 | 实时电网功率（并网） |
| `realtime.grid_off_p` | 数字 | 瓦特 | 值.功率 | 实时电网功率（离网） |
| `realtime.soc` | 数量 | % | 值 | 实时电量状态 |
| `realtime.sys_bat_p` | 数字 | W | 值.功率 | 实时系统电池电量 |
| `realtime.sys_grid_p` | 数字 | 瓦 | 值.功率 | 实时系统电网功率 |
| `realtime.sys_load_p` | 数字 | W | 值.功率 | 实时系统负载功率 |
| `realtime.sys_plug_p` | 数字 | 瓦 | 值.功率 | 实时系统插头功率 |
| `realtime.sys_pv_p` | 数字 | 瓦 | 值.功率 | 实时系统光伏功率 |
| `realtime.sys_soc` | 数值 | % | 值 | 实时系统荷电状态 |
| `realtime.sys_sp_p` | 数字 | W | 值.功率 | 实时系统设定点功率 |
| `realtime.sys_sp_p` | 数字 | 瓦 | 值.功率 | 实时系统设定点功率 |

### 系统统计状态
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `system.bat_p` | 数字 | W | 值.功率 | 系统电池功率 |
| `system.dchg_e` | 数量 | 瓦时 | 产生的能量值 | 系统放电能量 |
| `system.grid_p` | 数值 | 瓦 | 值.功率 | 系统电网功率 |
| `system.ems_mode` | 字符串 | - | 状态 | 能源管理系统模式 |
| `system.plug_in_e` | 编号 | 瓦时 | 能量消耗值 | 系统插头输入能量 |
| `system.plug_out_e` | 数量 | 瓦时 | 能量产生值 | 系统插头输出能量 |
| `system.pv_e` | 数量 | 瓦时 | 产生的能量值 | 系统光伏能量 |
| `system.pv_p` | 数值 | 瓦 | 值.功率 | 系统光伏功率 |
| `system.soc` | 编号 | % | 值 | 系统荷电状态 |
| `system.sp_p` | 数字 | W | 值.功率 | 系统设定功率 |
| `system.sp_p` | 数字 | W | 值.功率 | 系统设定功率 |

### 电源控制状态
| 状态 | 类型 | 单位 | 角色 | 访问权限 | 描述 |
|-------|------|------|------|--------|-------------|
| `power_ctrl.min` | 数字 | W | 值.功率 | 读取 | 最小功率设置 |
| `power_ctrl.set` | 数字 | 瓦特 | 功率级别 | 读/写 | **功率设定点（可控）** |
| `power_ctrl.step` | 数字 | W | 值.功率 | 读取 | 功率调整步长 |
| `power_ctrl.step` | 数字 | 瓦 | 值.功率 | 读取 | 功率调节步长 |

### 信息国家
| 状态 | 类型 | 单位 | 角色 | 描述 |
|-------|------|------|------|-------------|
| `info.online` | 布尔值 | - | indicator.reachable | 设备在线状态 |
| `info.timestamp` | 数字 | - | 日期 | 最后数据时间戳 |
| `device.rssi` | 数字 | 分贝 | 值 | Wi-Fi 信号强度 |
| `device.rssi` | 数字 | 分贝 | 值 | Wi-Fi 信号强度 |

### EMS 控制状态
| 状态 | 类型 | 角色 | 访问权限 | 值 | 描述 |
|-------|------|------|--------|--------|-------------|
| `ems_mode.command` | 字符串 | 状态 | 读/写 | `general`, `mqtt_ctrl` | **EMS 模式控制** |

## 电源控制功能
该适配器通过特定的可写状态提供电源控制功能：

### 设置功率输出
要控制 MS-A2 设备的功率输出：

1. **设置 EMS 模式**：首先将 `ems_mode.command` 设置为 `mqtt_ctrl`
2. **设置功率级别**：将所需的功率值写入 `power_ctrl.set`
3. **有效范围**：功率值必须介于 `power_ctrl.min` 和 `power_ctrl.max` 之间。
4. **步长**：使用 `power_ctrl.step` 设置合适的增量

### 功率控制示例
```javascript
// Enable MQTT control mode
setState('hoymiles-ms.0.MSA_12345.ems_mode.command', 'mqtt_ctrl');

// Set power output to 500W (example)
setState('hoymiles-ms.0.MSA_12345.power_ctrl.set', 500);
```

### 电源控制注意事项
- 仅当设备处于 `mqtt_ctrl` 模式时，电源控制才可用
- 电源设置由 MS-A2 单元立即应用。
- 监控实时状态以验证功率变化
- 返回“常规”模式以恢复自动操作

多设备支持
该适配器可自动处理多个 MS-A2 单元：

每个设备都通过其唯一的客户端 ID 进行识别。
- 状态是为每个连接的设备动态创建的
设备对象被整理到不同的文件夹中。
- 每个设备的在线状态都是单独跟踪的。

## 故障排除
### 常见问题
设备无法连接：

1. 验证ioBroker和MS-A2之间的网络连接
2. 检查适配器设置中的 MQTT 服务器配置
3. 确保防火墙未阻止端口 1881。
4. 在 S-Miles Home 应用中验证 MQTT 设置

**未更新的州/地区：**

1. 检查设备在线状态（`info.online`）
2. 验证时间戳更新（`info.timestamp`）
3. 检查适配器日志中的错误消息
4. 如有必要，请重启适配器

**电源控制功能失效：**

1. 确保 EMS 模式设置为 `mqtt_ctrl`
2. 确认功率值在最小/最大范围内
3. 检查设备是否在线并有响应
4. 实时监控状态变化

### 日志分析
通过将适配器日志级别设置为“debug”或“silly”来启用详细日志记录：

- **信息级别**：连接事件和基本操作
- **调试级别**：详细的 MQTT 通信
- **愚蠢级别**：所有 MQTT 消息和状态更新

### 网络要求
- **端口 1881/TCP**：必须能够从 MS-A2 访问 ioBroker
- **防火墙**：确保允许 MQTT 流量。
- **网络稳定性**：稳定的连接是可靠运行的必要条件

＃＃ 常问问题
问：我可以使用不同的 MQTT 端口吗？答：可以，在适配器设置中配置任意空闲端口，并相应地更新 MS-A2 配置。

问：该适配器是否支持身份验证？答：目前不支持。身份验证支持计划在未来的版本中推出。

问：我可以监控多个 MS-A2 设备吗？答：可以，每个设备都会显示为一个独立的设备，并具有自己的状态。

问：数据更新频率如何？答：实时数据每秒更新一次，系统统计数据每 5 分钟更新一次（由 Hoymiles API 控制）。

问：我可以控制充电/放电时间表吗？答：目前仅支持功率输出控制。未来版本可能会添加更高级的时间表功能。

问：如果网络连接中断会怎样？答：适配器会检测离线设备并进行相应标记。连接恢复后，数据传输将自动恢复。

问：有哪些限制？答：该适配器目前仅限于只读监控和基本电源控制。高级功能取决于 Hoymiles API 的功能。

## 支持与贡献
如有任何问题、疑问或投稿：

- **GitHub Issues**：[在此处报告问题](https://github.com/mcm4iob/ioBroker.hoymiles-ms/issues)
- **ioBroker 论坛**：[社区支持和讨论](https://forum.iobroker.net/topic/81667/test-adapter-hoymiles-ms-v0-2-x)
- **文档**：本文档和内联代码注释

如果您喜欢这款适配器，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

---

*此适配器为独立社区项目，与Hoymiles无关。*

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.2 (2026-01-10)
* (mcm1957) Subscription code has been fixed to allow operation with hoymiles mqtt v3.0
* (mcm1957) NOTE: TOU topics are not yet supported and raising warnings currently.

### 0.2.1 (2026-01-09)
* (mcm1957) ignore empty and invalid payloads. [#90]
* (mcm1957) Dependencies have been updated

### 0.2.0 (2025-08-23)
* (mcm1957) States are created dynamically now. So no states should be created if a system does not provide data for it (i.e slave micro storage).
* (mcm1957) State values are reset during startup now to prevent stale information.
* (mcm1957) Support to control power consumption and delivery has been added.
* (mcm1957) Dependencies have been updated

### 0.1.2 (2025-08-03)
* (mcm1957) Warnings raised from slave systems have been removed
* (mcm1957) Dependencies have been updated

### 0.1.1 (2025-07-27)
* (mcm1957) Handling of configuration has been corrected
* (mcm1957) Translations have been adapted

### 0.1.0 (2025-07-26)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025-2026 mcm1957 <mcm57@gmx.at>

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