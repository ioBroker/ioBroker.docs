---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: fvwFfs4ZipzQ1yq3AF5UcGKRPl2iRj9HGabHVEobors=
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
- 用于仪表盘和脚本的实时收集器表面增量
- 收集器警告阈值
- 可选语音输出，用于发出警告
自动复位逻辑

- **太阳能扩展**
- 外部太阳能执行器的独立控制
- Delta 开/关阈值
- 用于仪表板和脚本的实时收集池参考增量
- 最高泳池温度限制
- 诊断和原因状态
- 优先级和阻塞逻辑
- `solar.extended.*` 下的状态部分
- 对 `solar.extended.pool_temperature_source` 的运行时更改会自动应用；因为 Solar Extended 使用循环检查间隔，计算、控制逻辑和 `solar.extended.collector_pool_reference_delta` 的更新可能需要长达大约 60 秒。

- **光伏控制**
- 基于光伏盈余和家庭用电量的水泵控制
- 开始使用可配置盈余边际的逻辑
- 阴天期间可选择延时
- 当达到流通目标时忽略模式
- 支持外部能源对象 ID
- 水泵模式：`自动（PV）`

- **供暖/热泵控制**
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
- 温度差异
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

- **压力传感器集成**
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

- **泳池洞察**
- 基于规则的整体池分析，位于 analytics.insights.pool.*
- 仅读取现有的 PoolControl 数据
- 无自动控制、计量、泵切换或执行器切换
- 默认禁用
- 可选地将摘要移交给 speech.queue
- HTML / JSON / 文本输出

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

**双层边界化学史**

- 现有的 samples_json 数据状态仍然是 7 天、每 15 分钟的短期历史记录：最多 672 个样本，每个样本 64 KB。
- 新的内部 daily_json 状态以紧凑的方式保存本地日历日期聚合数据，包含最小值/最大值/平均值/最后更新日期/计数：最多 32 条记录，每条记录 8 KB。
- 24 小时和 7 天趋势使用 samples_json；30 天趋势使用匹配的每日汇总数据的最后一个值。
- 现有的 24 小时、7 天和 30 天趋势状态以及文本/HTML/JSON 报告保留其 API 和含义
- 每日汇总数据是对原始历史数据的补充，但不会取代它们；有效的历史数据在迁移过程中会被规范化，过大的 JSON 数据会在解析前被拒绝。
- 原始的长期历史数据应存储在专门的 ioBroker 历史/时间序列数据库中。
- 如果过大的 states.jsonl 文件已经阻止了 js-controller 启动，则必须先从外部修复它，PoolControl 才能运行。

化学工具

- pH Plus 计算器
- pH 减号计算器
- 盐计算器
- 手动计算辅助工具
- 泳池容积预填充支持
- 可选的手动值覆盖
- 结果文本带有验证和错误处理功能

-无自动化学药剂添加

仅供参考

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
- 扩展光伏和太阳能效率分析（COP 计算、每日效益、天气因素整合）
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
### 1.4.2 (2026-07-01)

- Fixed monthly temperature statistics reset scheduling
  - Monthly reset no longer uses long timeouts above the Node.js/ioBroker limit
  - Added persistent monthly period tracking
  - Missed month changes after adapter downtime are detected safely
  - Monthly reset is now checked daily and executed only once per period

- Improved solar logbook logging
  - Oversized solar logbook entries are now logged as debug instead of warning
  - This avoids unnecessary warning noise for non-critical diagnostic information

### 1.4.1 (2026-06-30)

- Fixed Auto-PV holding logic for already running pumps.
- When Auto-PV already controls the pump, the current pump power is now considered for the holding decision.
- This prevents a running pump from triggering its own Auto-PV afterrun/stop cycle after startup.
- The displayed PV surplus (`photovoltaic.power_surplus_w`) remains the real remaining surplus and is not artificially adjusted.

### 1.4.0 (2026-06-29)

- Added a reset button for pump learning to quickly clear learned values after a pump replacement or incorrect learning while keeping user settings intact.
- Made the daily circulation factor writable and persistent. The adapter configuration is now only used as the initial value, allowing adjustments directly via states (e.g. VIS or HomePanel).
- Added an optional temperature-dependent circulation factor that automatically increases the required daily circulation based on a selectable temperature sensor and configurable threshold.
- Extended the existing time control with an optional interval mode. Each time window can now operate either continuously or in configurable intervals without introducing a new pump mode.
- Added new diagnostic states and multilingual status messages to improve transparency and troubleshooting for the new circulation and time control features.

### 1.3.35 (2026-06-29)

- Fixed an inconsistency in the daily circulation calculation.
- `circulation.daily_remaining` is now recalculated together with `circulation.daily_required`.
- Changing the pool size or minimum daily circulation now produces consistent values immediately after adapter restart.
- The remaining daily circulation is no longer blocked by zero flow or a stopped pump.

### 1.3.34 (2026-06-27)

- **Major stability improvement:** Completely redesigned the internal chemistry history (pH, ORP and TDS) to prevent unbounded JSON state growth. This significantly reduces the risk of oversized `states.jsonl` files and potential js-controller startup failures.
- **New two-stage history architecture:** Chemistry history now uses a compact short-term history for recent measurements together with a dedicated daily history for long-term trends. All existing 24-hour, 7-day and 30-day trend calculations and reports remain fully available.
- **Protected history storage:** Added strict limits for chemistry history sample count and JSON size. Oversized or invalid history states are now safely detected, validated and handled before being processed.
- **Daily aggregates introduced:** Added compact daily aggregates for pH, ORP and TDS containing minimum, maximum, average and last measurement together with the number of valid samples. This preserves long-term trend analysis without storing large raw histories.
- **Additional safeguards:** Added size protection for the solar logbook and debug log to prevent uncontrolled state growth.
- **Maintenance:** Updated the `@iobroker/adapter-core` dependency to the latest recommended version.

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License