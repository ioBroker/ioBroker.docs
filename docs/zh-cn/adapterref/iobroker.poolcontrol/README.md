---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: eIqeTqHW3nUxOeSsKahRRpawR5LYEU09UCdSTpXrdSw=
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
泳池开放时间已到。
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

- **常规信息** → 泳池名称、泳池尺寸、最小循环水量
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

## 1.2.19 (2026-04-10)
- 修复了 `photovoltaicHelper` 和 `controlHelper` 之间的交互问题，该问题会导致自动后续泵送意外停止。
- photovoltaicHelper 现在会遵循 controlHelper 的优先级，并且在自动后续泵送运行时不再停止水泵。
- 修复了当泵从外部停止时，`controlHelper` 可能仍处于“nachpumpen”状态的问题
- `photovoltaic.threshold_w` 现在已与实例配置正确同步
- 适配器设置中光伏剩余阈值的更改现在可以可靠地反映在相应的只读数据点中。

### 2018年1月2日
发布日期：2026年4月7日

- 修复了 `status.season_active` 的持久性问题（适配器启动时不再被覆盖）
- 提高了防冻设置的持久性

### 2017年1月2日
发布日期：2026年4月7日

- 修复：解决了压力学习重置按钮无法可靠触发的问题。pumpHelper4 现在会显式订阅其相关的内部状态，以确保事件得到正确处理。

### 2015年1月2日
发布日期：2026年3月22日

- 修复 i18n 使用问题（将 I18n.t 替换为 I18n.translate），以解决某些系统上的适配器启动崩溃和重启循环问题。

### 2014年1月2日
发布日期：2026年3月22日

- ### 为化学帮助文本添加国际化支持

### 2013年1月2日
发布日期：2026年3月22日

- 添加了多语言的州名和描述（德语/英语）
- 提高了所有州文本的一致性
- 对文本和结构进行了一些细微的修改

### 1.2.12
发布日期：2026年3月21日

- 清理和修复 ioBroker 仓库检查器的问题
- 已在 io-package.json 中恢复所需的本地对象
- 删除了无效属性和过时的条目
- 更新了 README 文件

### 1.2.11
- 代码库清理（已解决 ioBroker 检查器问题）
- 从 io-package.json 中移除无效属性
- README 文件已更新

### 1.2.10 (2026-03-20)
- 改进了管理界面（jsonConfig）中的德语翻译
- 修正了不正确和误导性的术语（例如，流量传感器与温度传感器）
- 改进了所有配置选项的一致性和措辞

### 1.2.9
发布日期：2026年3月19日

- 修复：更正运行时通道中无效的公共对象。

### 1.2.7
发布日期：2026年3月16日

- 根据 ioBroker 指南修正了可写状态的角色定义
- 多个内部学习和诊断状态设置为只读
- 从存储库中删除了过时的文件

### 1.2.6
发布日期：2026年3月12日

- 修复了剩余的适配器检查器问题
- 将发布脚本插件更新到最新版本
- 将剩余的日志消息转换为英文
- 更新了 Dependabot 配置（添加了 GitHub Actions 生态系统）
- 减少了 io-package.json 中的 `common.news` 条目，以符合仓库要求

### 1.2.5
发布日期：2026年3月7日

- 修复了 `actuatorsHelper` 中某些情况下状态更改处理不正确的问题
- 进行了一些内部小改进和稳定性修复

### 1.2.4
发布日期：2026年3月7日

- 修复：actuatorsHelper 未将实例配置与内部状态（活动/名称）同步。导致无法激活其他执行器。

### 1.2.3
发布日期：2026年3月6日

- 将原生定时器（setTimeout / setInterval）替换为适配器定时器（adapter.setTimeout / adapter.setInterval）
- 增加了适配器卸载时定时器的正确清理功能
- 内部代码清理和维护改进

### 1.2.2
发布日期：2026年3月6日

- 将所需的管理员版本提高到 >=7.6.20
- jsonConfig i18n 重构后更新了翻译
- 维护性更新（无功能变更）

### 1.2.1
发布日期：2026年3月6日

- 将管理员配置迁移到 i18n 翻译环境
- jsonConfig 现在使用英文标签，翻译在 admin/i18n 中进行管理。
- 使用 `npm run translate` 生成的翻译

### 1.2.0
发布日期：2026年2月15日

- 在 jsonConfig 中激活多语言支持 (i18n)。
- 实例配置的双语标签（德语/英语）
- 适配器功能未做任何更改

## V1.1.0 水泵功率建议（2026年1月23日）
- **泵功率建议（自 v1.1.0 起）**
- 新增被动部分 `pump.speed`
- 得出运行中水泵的清晰逻辑性能状态：
- `off`、`frost`、`low`、`normal`、`high`、`boost`
- 性能状态完全取决于：
- 现有泵逻辑
- 主动助手（例如，防霜、太阳能、维护）
- 当前泵状态
此外，还提供**推荐泵功率百分比（0-100%）**
百分比值**可自由配置**，并且**防止过度安装**。
- **无主动速度控制**
- **不干扰现有泵的控制**
- 旨在连接外部系统，例如：
- Shelly 0–10 V
- 变频器
- Blockly / 脚本

## V1.0.0 附加执行器（照明和辅助泵）（2026年2月1日）
- 控制可选泳池执行器：
- 泳池照明（最多 3 个通道）
- 辅助水泵/游乐设施（最多 3 个通道）
- 通过管理界面进行完整配置：
- 通过复选框激活每个执行器
- 分配**外部对象 ID**

（例如，可切换的套接字或布尔控制状态）

- 支持的操作模式：
- 开/关
- 定时运行（运行时间，以分钟为单位）
- 连续运行
- 内部状态和控制状态：
- 当前运行状态
剩余运行时间
- 切换状态和操作模式
- 清晰的系统分离：
- 附加执行器**不**

影响水泵、太阳能、供暖或人工智能逻辑

- 纯可选的系统扩展

## V0.9.0
- 引入供暖/热泵控制（“heatHelper”）
- 根据泳池温度自动发出加热请求
- 目标温度和最高温度可配置
- 支持：
可切换插座
- 布尔控制状态
加热结束后泵的超负荷运转时间
- 优先级系统：
- 维护模式会阻止加热控制
- 仅在自动模式下有效
- 考虑赛季状态
- 泵控制的所有权保护
- 新增内部状态 `heat.heating_request`，用于外部评估

## V0.8.2 (2025-12-25)
- 新增人工智能模块**化学助手**（`aiChemistryHelpHelper`）
- 纯粹提供泳池水化学信息的支持系统
- 常见泳池问题示例（例如，pH值过高/过低、氯气消毒效果不佳、水体变绿/浑浊）
- 以文本输出形式提供清晰的原因和解决方案提示
- 无自动加药
- 无产品推荐
- 无设备或泵控制
- 无语音输出（纯视觉信息）
- `ai.chemistry_help.*` 下新增数据点

## V0.8.0 (2025-12-08)
- 模块：天气提示（OpenMeteo）、泳池小贴士、每日天气概览、周末天气预报
- 自动文本输出，可选语音输出
- 每小时更新天气信息，持续刷新
- 反垃圾邮件系统，避免重复提示
- 集成了新的AI预测系统`aiForecastHelper`
- 每日自动生成“明日预测”，内容包括：
温度范围
天气描述
降雨概率
- 风力分析（微风/中风/强风）
- 第二天泳池推荐
- `ai.weather.*` 下新增开关、日程安排和输出
- 实例启动后立即执行
- “帮助与信息”下的扩展管理员概览，包含重要的 AI 说明
- 改进了人工智能系统的内部结构（aiHelper + aiForecastHelper）

## V0.7.4 (2025-12-03)
- 修复了 ControlHelper 中的一个错误。为 control.circulation.mode 提供持久保护

## V0.7.0 (2025-11-29)
- 在 `pump.pressure.*` 下引入新的压力传感器系统
- 支持外部压力传感器对象 ID（来自 ioBroker 的 bar 值）
- 趋势检测（上升/下降/稳定）和移动压力平均值
- 具有手动重置状态的自学习最小/最大压力值
- 新增诊断文本（`status_text_diagnostic`），包含扩展分析信息
- 扩展泵监测功能，不具备自动控制逻辑（纯信息功能）

## V0.6.2 (2025-11-07)
- 修改实例概览，采用新的标题结构，使操作更清晰
- 新的起始页图片“Egon in Workwear”已集成到管理界面中
- 扩展语音系统，可配置 Alexa 输出时间
- 对 jsonConfig、speechHelper 和 speechStates 进行调整和清理

## V0.6.0 (2025-11-03)
- 引入带自动泵逻辑的全光伏控制

（新泵模式 `Automatic (PV)`，位于 `pump.mode` 下）

- 适配器根据可配置的家庭用电量和发电量对光伏发电盈余做出反应
- 启动逻辑：当过剩功率≥（额定功率+阈值）时，泵开启
- 考虑季节状态、超时时间和可选的“已达到发行量”保护措施
- 自动迁移功能在现有安装中添加了新的模式 `auto_pv`。
- 改进了内部逻辑、持久性和调试日志记录

## V0.5.5 (2025-11-01)
- 修复了周统计和月统计中的无限循环问题

## V0.5.3 (2025-10-30)
- 新增 Telegram 用户选择

## V0.5.2 (2025-10-30)
## V0.5.0 (2025-10-28)
### **0.4.0 (2025年10月26日)**
**新增功能**

- 引入了新的统计系统，位于 `analytics.statistics.temperature.today` 下
自动采集所有活动温度传感器的**最小值、最大值和平均值**
- 每个传感器：持续更新的 JSON 和 HTML 摘要
- 所有传感器的总输出（表格）

`analytics.statistics.temperature.today.outputs.summary_all_html`

- 完全**持久化数据点**，并具有覆盖安装保护功能
- **每日重置自动午夜重置**，包含时间戳
- 为未来的每周、每月和季节性统计数据做准备

改进之处

- 通过新的主文件夹“analytics”实现统一的结构
- 无永久循环或定时器负载——纯事件处理
- 提升了性能和内存稳定性
- 修改了启动时所有统计状态的初始化方式

**注意** 此版本构成了所有后续统计和分析功能的稳定基础（例如，每周和每月统计、历史记录和效率评估）。

*（旧版本请参见[io-package.json](./io-package.json)）*

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