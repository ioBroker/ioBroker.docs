---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: AUZm+yNMfbmjhuKgqNXr2p7rtC4oa5hyZ0yUVgZgxuQ=
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
ioBroker.poolcontrol 适配器用于控制和监控泳池系统。

它支持水泵、温度和太阳能控制的自动化，并可进行能耗分析。

---

＃＃ 特征
- **泵控制**
- 操作模式：自动、自动（PV）、手动、定时控制、关闭
- 自动（PV）控制泵的运行取决于光伏发电盈余。
- 错误检测（无功耗、即使“关闭”状态仍有功耗、过载）
- 安全功能（防冻保护、过热保护）
- 变速泵的泵功率建议

- **温度管理**
- 最多可连接 6 个传感器（表面、底部、流量、回流、收集器、外部温度）
- 每日最低/最高
- 每小时变化
- 差异（例如，集热器 - 空气集热器、表面集热器 - 底部集热器、流动集热器 - 回流集热器）

- **太阳能控制**
- 具有滞后特性的开/关阈值
- 集线器警告（低于阈值 10% 时自动复位）
- 警告时可选择语音输出

- **供暖/热泵控制（新增，测试阶段）**
- 根据泳池温度自动控制加热棒或热泵
- 目标温度和最高安全温度可配置
- 仅在以下情况下有效：
泳池开放季已开始
- 水泵模式**自动**
维护模式未激活
- 优先级逻辑：
- 维护模式完全禁用加热控制
- 加热功能不会干扰手动或定时泵模式
- 加热结束后可配置泵的超负荷运转时间
所有权保护：
只有当水泵之前是由 heatHelper 本身开启时，水泵才会关闭。
- 支持：
- 可切换插座 **或**
- 外部供暖系统的布尔控制状态
- `heat.*` 下的内部状态和诊断部分
纯粹的控制，**不涉及化学或太阳能逻辑**

**注意：**此功能目前处于**测试阶段**。

逻辑已完全实现，但初期仅供感兴趣的测试用户使用。

- **光伏控制（自 v0.6.0 版本起）**
- 基于光伏发电量和家庭用电量的自动水泵控制
- 启动逻辑：盈余 ≥（泵额定功率 + 安全裕度）
- 阴天期间可选择延时
- 如果已达到每日发行量目标，则忽略此规则
- 通过两个外部对象 ID（power_generated_id、power_house_id）进行配置
- 新增泵模式“自动（PV）”

- **时间控制**
- 每周最多可设置 3 个可自由配置的时间窗口

- **放映时间和发行量**
- 统计运行时间（今天，总计）
- 计算每日循环量和剩余容量
- 反冲洗提醒，间隔可配置（例如，每7天一次）
- 显示上次反冲洗的日期
反冲洗完成后自动复位
- PV 模式考虑循环状态（例如，“达到循环状态时忽略”）

- **消耗量与成本**
- 外部千瓦时表的评估
- 每日、每周、每月和每年的消耗量
- 基于可配置价格的电力成本计算

**注意：**有关能耗和成本值的变化详情（例如，重启后或更换电表时）请点击此处查看：

- [文档（英文）](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/help.md)
- [文档（德语）](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/help.md)

- **统计系统**
- 包含每日、每周和每月值的 `analytics.statistics.*` 部分
- 自动计算最小值、最大值、平均值和运行时间值
- 完全持久化的数据点（安装后保护）
- 每个传感器的 HTML 和 JSON 摘要以及总体概览

- **压力传感器集成（自 v0.7.x 版本起）**
- 实时过滤器压力测量
趋势分析：上升/下降/稳定
- 移动学习平均值（avg_bar）
- 自学习最小/最大压力值
- 诊断文本 + 最新更新
- 无自动控制 - 纯粹信息提供
- 用户可配置正常压力范围

- **人工智能系统（自 v0.8.0 版本起）**
- 模块：天气提示（OpenMeteo）、泳池小贴士、每日天气概览、周末天气预报
- 自动文本输出，可选语音输出
- 每小时更新天气信息，持续刷新
- 反垃圾邮件系统，避免重复提示

- **明日天气预报（aiForecastHelper，版本 0.8.0 及更高版本）**
- 自动生成第二天的每日天气预报
- 分析温度、天气状况、降雨概率和风力
- 生成第二天泳池使用建议（例如，关闭盖子，预计太阳辐射热量较少）
- 完全基于事件，仅需来自 ioBroker 地理数据的 Open-Meteo 数据
- 在 `ai.weather.switches.*` 下设置单独的开关，用于启用/禁用各个预报功能
- 结果存储在 `ai.weather.outputs.forecast_text` 下

- **化学帮助（aiChemistryHelpHelper，版本 0.8.x 及更高版本）**
- 用于水化学的交互式、纯粹信息型人工智能助手
- 通过选择字段选择典型的泳池问题（例如，pH 值过高/过低、氯气无效、水变绿/浑浊）
- 以文本形式清晰描述原因和解决方案
- 无自动加药
- 无产品推荐
- 无设备控制
- 无语音输出（纯视觉信息）
目标：了解原因并系统地进行处理（测量→纠正→过滤→再次测量）
- `ai.chemistry_help.*` 下的数据点

- **信息系统（自 v0.7.x 版本起）**
- 适配器信息系统
- 节日问候（圣诞节、新年、复活节）
- 显示已安装的适配器版本

- **语音输出**
- 通过 Alexa 或 Telegram 输出
- 关于水泵启动/停止、错误或温度阈值的公告

- **系统检查（诊断部分）**
- 用于调试和监控功能的内部诊断部分
- 选择要监测的区域（例如，水泵、太阳能、温度）
- 持续记录最新变更
- 可手动清除日志

本部分仅用于分析和故障排除。

正常运行时，监控功能应保持禁用状态。

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
- 扩展光伏和太阳能效率分析（COP 计算、每日效益、天气因素整合）
- 统计数据导出功能（CSV/Excel）
- 用于自动系统检查的诊断助手
- VIS/VIS2（图形化泳池和太阳能可视化）的自有小部件
- 控制泳池照明、阀门和逆流系统
- 集成其他传感器盒（例如，温度盒、压力盒、液位盒）
- AI 和语音助手扩展（每日报告、提示、语音命令）

---

＃＃ 笔记
该适配器正在积极开发中。

我们会定期添加新功能——请参阅更新日志。

---

## 文档
- [help.md（详细说明和注释）](./help.md)

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

## Changelog

### 1.2.20
Release: 11.04.2026
- (DasBo) Reduced unnecessary state writes in status and photovoltaic helpers. Summary and PV timestamps are now only updated when the functional result actually changes, making the adapter quieter without affecting existing logic.

### 1.2.19
Release: 10.04.2026
- Fixed an interaction issue between `photovoltaicHelper` and `controlHelper` where automatic follow-up pumping could be stopped unexpectedly
- photovoltaicHelper now respects controlHelper priority and no longer stops the pump while automatic follow-up pumping is active
- Fixed an issue where `controlHelper` could remain in "nachpumpen" state if the pump was stopped externally
- `photovoltaic.threshold_w` is now correctly synchronized with the instance configuration
- Changes to the PV surplus threshold in adapter settings are now reliably reflected in the corresponding read-only datapoint

### 1.2.18
Release: 07.04.2026
- Fixed persistence issue for `status.season_active` (no longer overwritten on adapter start)
- Improved persistence for frost protection settings

### 1.2.17
Release: 07.04.2026
- Fix: Resolved an issue where the pressure learning reset button did not trigger reliably. The pumpHelper4 now explicitly subscribes to its relevant internal states to ensure proper event handling.

### 1.2.15
Release: 22.03.2026
- Fix i18n usage (replace I18n.t with I18n.translate) to resolve adapter startup crash and restart loop on certain systems.


*(older versions are automatically moved to CHANGELOG_OLD.md)*

---

## License

PoolControl is an open-source project developed by D. Bertin (DasBo1975).

- The name PoolControl and the associated logo are original developments and may be freely used within the scope of the open-source publication (adapter, GitHub repository, wiki, documentation, visualizations).

- Commercial use, redistribution or publication in modified form (especially as part of a commercial product or service) requires the explicit permission of the author.

- All developed sensor, hardware and enclosure constructions (e.g., temperature, pressure, level, electronics or control boxes) including designs, schematics, 3D models and internal constructions are subject to the copyright of D. Bertin (DasBo1975).

- Publication, reproduction for resale or commercial use of these hardware designs is only permitted with written authorization from the author.

The software source code of this project is licensed under the MIT License. See LICENSE for details.

---

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License