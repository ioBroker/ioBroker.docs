---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: nE1zdiOBPnbfSn/KHa2BjgeqquXjhkSUlBpIeAhbkC8=
---
# IoBroker.poolcontrol
![测试与发布](https://github.com/DasBo1975/ioBroker.poolcontrol/actions/workflows/test-and-release.yml/badge.svg)

![npm](https://img.shields.io/npm/v/iobroker.poolcontrol?color=blue)
![下载](https://img.shields.io/npm/dm/iobroker.poolcontrol)
![安装](https://iobroker.live/badges/poolcontrol-installed.svg)
![稳定的](https://iobroker.live/badges/poolcontrol-stable.svg)
![执照](https://img.shields.io/github/license/DasBo1975/ioBroker.poolcontrol?cacheSeconds=3600)

---

＃＃ 描述
适配器 ioBroker.poolcontrol 用于控制、监控和分析池系统。

它提供泵、加热、太阳能和光伏控制的自动化，以及监测、诊断、化学分析和能源评估。

---

＃＃ 特征
### 控制与自动化
- **泵控制**
- 操作模式：自动、自动（PV）、手动、定时控制、关闭
- 错误检测（无功耗、关机后仍耗电、过载）
- 安全功能（防冻保护、过热保护）
- 优先所有权和协助协调
- 变速泵的泵功率建议
- 学习功率和流量行为的功能（`pump.learning.*`）

- **时间控制**
- 最多可设置 3 个可自由配置的每周时间窗口
- 持久配置值
- 防止更新过程中被覆盖

- **太阳能控制**
- 带滞后特性的集电极开/关阈值
- 收集器警告阈值
- 可选语音输出，用于发出警告
自动复位逻辑

- **太阳能扩展**
- 外部太阳能执行器的独立控制
- Delta 开/关阈值
- 最高泳池温度限制
- 诊断和原因状态
- 优先级和阻塞逻辑
- `solar.extended.*` 下的状态部分

- **光伏控制（自 v0.6.0 版本起）**
- 基于光伏盈余和家庭用电量的水泵控制
- 开始使用可配置盈余边际的逻辑
- 阴天期间可选择延时
- 当达到流通目标时忽略模式
- 支持外部能源对象 ID
- 水泵模式：`自动（PV）`

- **供暖/热泵控制（测试阶段）**
- 加热棒或热泵的自动控制
- 可配置的目标温度和安全温度
- 可选泵预运行和超运行
所有权保护
- 维护阻塞逻辑
- 支持可切换输出和布尔状态
- 在 `heat.*` 下的内部状态和诊断
- 不涉及化学或太阳能逻辑

- **附加执行器**
- 照明控制
- 额外的泵
- 随泵装置
- 根据泵的运行情况自动开启/关闭
- 外部目标状态的验证
适用于紫外线系统、水景和辅助系统

### 监测与诊断
- **温度管理**
- 最多可连接 6 个传感器：
    - 表面
- 地面/底部
    - 流动
    - 返回
收藏家
室外温度
- 每日最小值/最大值
- 每小时变化
温度差异
- 最后有效值跟踪
- 源监测和诊断
- 缺失更新的恢复逻辑
- 来源状态评估

- **放映时间和发行量**
- 运行时间计数器（今日/总计）
- 循环计算和剩余容量
- 运行时自愈
反冲洗提醒系统
- 最后一次反冲跟踪
反冲洗完成后自动复位
- 光伏发电集成以实现循环目标

- **压力传感器集成（自 v0.7.x 版本起）**
- 实时压力测量
趋势分析
- 学习平均值
- 自学习最小/最大范围
- 诊断状态
- 压力历史和评估
- 支持外部传感器和 PoolControl PressureBox
仅供参考（无自动控制）

- **系统检查**
- 诊断和调试区域
- 对选定的子系统进行监控
- 内部调试日志
- 手动清除日志
- 用于分析和故障排除

### 分析与洞察
- **统计系统**
- 每日/每周/每月统计数据
- 最小值/最大值/平均值计算
- 运行时评估
- 持久状态
- HTML 和 JSON 摘要

- **太阳能洞察**
- 太阳能运行时间分析
- 效率计算
- 诊断输出
- 每日日志
- HTML / JSON / 文本输出
仅供参考（无控制权）

- **光伏洞察**
- 运行时分析
- 能源评估
- 储蓄计算
- 启动和运行统计数据
- HTML/JSON摘要

- **支持可视化输出**
- 结构化文本输出
- HTML 输出
- JSON 摘要
- 适用于 VIS / VIS2 / 仪表盘

### 化学与人工智能
- **水质化学分析**

**pH值**

- 手动或外部来源
- 测量位置逻辑
- 稳定逻辑
- 手动混合运行支持
- 无自动加药

**TDS**

- 手动或外部来源
- 趋势评估（24小时/7天/30天）
- 参考值
- 测量位置逻辑
- HTML / JSON / 文本输出

**氧化还原电位/氧化还原反应**

- ORP评估
- pH 参考支持
仅供参考
- 无氯控制
- 无自动加药

- **人工智能系统**
- 天气提示（Open-Meteo）
泳池推荐
- 每日摘要
- 周末报道
- 明日天气预报
- 可选语音输出
- 重复上下文跟踪

- **化学帮助**
- 互动式化学辅助
- 典型的泳池问题选择
原因和解决方案的解释
- 无自动加药
- 无设备控制

- **语音输出**
- 支持 Alexa
- Telegram 支持
- 水泵、警告和温度通知

### 信息系统
- 适配器信息系统
- 节日问候
版本信息

---

＃＃ 配置
配置是通过管理界面中的选项卡完成的：

- **常规信息** → 泳池名称、泳池尺寸、最小循环次数
- **水泵** → 水泵功率、功率限制、安全功能
- **温度** → 传感器选择和对象 ID
- **太阳能管理** → 开/关阈值、滞后、警告阈值
- **时间控制** → 水泵运行时间窗口
- **语音输出** → 激活、Alexa/Telegram 集成
- **用电量及成本** → 外置千瓦时表，电价

---

## 计划扩展
- 扩展光伏和太阳能效率分析（COP 计算、每日收益、天气因素整合）
- 统计数据导出功能（CSV/Excel）
- 用于自动系统检查的诊断助手
- VIS/VIS2（图形化泳池和太阳能可视化）的自有小部件
- 阀门和逆流系统的专用控制模块
- 集成其他传感器盒（例如，温度盒、压力盒、液位盒）
- AI 和语音助手扩展（每日报告、提示、语音命令）

---

＃＃ 笔记
该适配器正在积极开发中。

我们会定期添加新功能——请参阅更新日志。

---

## 文档
＃＃＃ 英语
- [文档/帮助](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/help.md)
- [函数概述](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/function_overview.md)

### 德语
- [文档/Hilfe](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/help.md)
- [Funktionsübersicht](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/funktionsuebersicht.md)

---

## 已存档的发布历史记录
有关旧版本和存档版本历史记录，请参阅：

[变更日志_旧版.md](./CHANGELOG_OLD.md)

---

＃＃ 支持
- [ioBroker 论坛](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/DasBo1975/ioBroker.poolcontrol/issues)

---

## 支持适配器开发
如果您喜欢 **ioBroker.poolcontrol**，请考虑捐赠：➡️ [通过 PayPal 提供支持](https://www.paypal.com/donate?business=dirk.bertin@t-online.de)

---

## 免责声明
使用适配器**风险自负**。

开发商对因安装、使用或故障造成的任何损失**不承担任何责任**。

这尤其适用于直接控制电器设备（例如，泳池水泵）。

用户有责任**安全安装和操作其硬件**。

---

## 法律声明
PoolControl 是由 D. Bertin (DasBo1975) 开发的开源项目。

- PoolControl 名称和相关徽标均为原创作品，可在开源出版物（适配器、GitHub 存储库、wiki、文档、可视化）范围内自由使用。

- 商业用途、再分发或以修改形式出版（尤其是作为商业产品或服务的一部分）需要获得作者的明确许可。

- 所有已开发的传感器、硬件和外壳结构（例如温度、压力、液位、电子元件或控制箱），包括设计、原理图、3D 模型和内部结构，均受 D. Bertin (DasBo1975) 的版权保护。

- 未经作者书面授权，不得出版、复制用于转售或商业用途。

本项目的软件源代码采用 MIT 许可证授权。详情请参阅 LICENSE 文件。

---

## Changelog
### 1.3.25 (2026-05-26)

- Updated README structure and feature overview
- Synchronized German and English function overviews
- Updated repository maintenance dependencies

### 1.3.24 (2026-05-26)

- Updated release-script dependencies to current versions
- Improved README and changelog structure
- Repository checker recommendations reviewed

### 1.3.23 (2026-05-26)

- Added extended temperature diagnostics for all temperature sensors:
  - last valid value
  - last valid value timestamp
  - minutes since last value
  - source status (`ok`, `warning`, `not_received`, `invalid_timestamp`)
- Added automatic recovery mechanism for stalled temperature updates
- Recovery runs only when a sensor enters warning state and uses cooldown protection
- Switched temperature helper timers to ioBroker adapter timers
- Improved visibility and troubleshooting for missing or delayed temperature updates

### 1.3.22 (2026-05-24)

- Improved ORP pH reference synchronization
- ORP helper now updates pH reference independently from ORP value processing
- Immediate update of ORP pH reference when pH enabled state or pH value changes
- Fixed missing pH reference updates when ORP evaluation was blocked, invalid or waiting for measurement conditions

### 1.3.21 (2026-05-17)

NEW: Follow-pump devices

Added a new `actuators.follow_pump_devices` area.

Up to three external devices can now automatically follow the operation of the main pump.

Typical examples:

- UV systems
- Water features
- Auxiliary filters
- Additional circulation devices

Features:

- Automatic ON when the main pump starts
- Automatic OFF when the main pump stops
- Configurable target state per device
- Validation of target states:
  - state exists
  - boolean type required
  - writable required
- Protection against invalid internal follow-pump targets
- Persistent configuration values

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License