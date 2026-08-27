---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
BADGE-WERO: https://img.shields.io/badge/WERO-8A2BE2
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white
BADGE-Buy Me a Coffee: https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black
BADGE-GitHub Sponsor: https://img.shields.io/badge/Sponsor-GitHub-181717?logo=github&logoColor=white
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.senec/README.md
title: <img src="../../admin/senec.png" width="36" align="top" alt="">ioBroker.senec
hash: JVe38En/cj1cuV9Pok3slNcCbKu7BxLVI0GN0H1RqNY=
---
#<img src="../../admin/senec.png" width="36" align="top" alt=""> ioBroker.senec
## IoBroker 的 SENEC 适配器
监控和控制您的 SENEC 家庭储能系统。该适配器支持四个独立的连接器，可以单独使用，也可以组合使用：

- **本地** (lala.cgi) — 直接 LAN 查询，提供 10 秒实时数据。提供完整的楼宇管理系统数据、网络计量读数、壁挂式电表数据和设备控制。
- **SENEC App API** — 通过 SENEC App API 进行基于云的查询。提供仪表盘数据、测量历史记录、系统详情和壁挂式电源盒信息。
- **mein-senec.de** — Web门户查询。状态概览、测量历史记录、自给自足、应急电源、削峰、SG-Ready和可切换插座的控制。
- **SENEC.Connect** — 基于 Azure 的 API。通过订阅密钥获取电池和电表数据。

并非所有连接器都需要激活。根据您的需求选择——对于没有本地 Web 界面的系统，纯本地设置与纯云端配置的效果一样好。

### 支持的系统
几乎所有 SENEC 储能系统都能正常工作：从早期的铅酸锂电池型号到 V2、V2.1 和 V3 型号的家用系列，再到当前的 V4 | P4 | E4 型号，以及商用型号和合作伙伴型号 ADS Tec、OEM LG 和 Solarinvert。

具有本地 Web 界面的系统可以使用全部四个连接器。不具备本地 Web 界面的系统（包括 V4 代系统）则通过 SENEC App API、mein-senec.de 和 SENEC.Connect 运行。可用的数据点取决于系统型号。

[完整型号列表](../SUPPORTED_SYSTEMS.md) 有助于重新找到您自己的系统。

## 免责声明
**所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用这些名称或标识并不意味着与这些所有者或其关联公司存在任何关联或得到其认可！此个人项目系利用业余时间维护，不用于任何商业目的。**

**不提供任何担保和责任。** 此适配器为业余项目，根据 MIT 许可证“按原样”提供。它通过 SENEC 未提供文档或支持的接口与昂贵的设备通信，并可发送改变该设备行为的命令。您使用此适配器的一切操作均需自行承担风险。作者不对您的系统损坏、数据丢失或错误、输入信号丢失或任何其他使用后果承担责任，也无法保证使用此适配器是否会影响 SENEC 或您的安装商提供的保修或支持。如果您不接受这些条款，请勿使用此适配器。

＃＃ 要求
- ioBroker，Node.js 版本 >= 22
- 本地网络中的 SENEC 存储系统（用于本地连接器）
- my-senec.de 帐户（用于 API 和 Web 连接器）
- 已安装 ioBroker.web 适配器（用于集成仪表板）

＃＃ 安装
通过 ioBroker 适配器仓库安装适配器。安装完成后，创建一个适配器实例并配置至少一个连接器。

＃＃ 配置
适配器设置分为多个选项卡——每个连接器一个选项卡，以及常规设置和调试选项。

### SENEC账户
![SENEC账户](../../../de/adapterref/iobroker.senec/media/admin-account.png)

请在此处输入您的 mein-senec.de 登录信息。这些信息由 SENEC 应用 API 和 mein-senec.de 共享。您也可以在此处配置出站 HTTP 请求的用户代理模式。

双因素身份验证 (2FA)
如果 mein-senec.de 帐户启用了双因素身份验证，适配器仍然可以自动登录——无需任何人坐在旁边输入代码。

设置过程中，会显示身份验证器应用的二维码，以及与密钥相同的文本。请将此文本填写到“TOTP 密钥”字段中。请在设置页面打开时将其记下：激活后，密钥将不再显示；只有重新设置时才会生成新的密钥。文本中的空格和连字符无关紧要。

这里指的是永久密钥，而不是应用程序中的六位数代码——该代码每三十秒更改一次，在适配器能够使用它之前很久就已经过期了。

两个云连接器只需一个密钥即可，因为它们都登录到同一个账户。即使需要双因素身份验证 (2FA)，如果缺少该密钥，适配器也会在日志中明确指出，而不是简单地报告登录失败。

### 本地连接 (lala.cgi)
![本地连接](../../../de/adapterref/iobroker.senec/media/admin-local.png)

| 设置 | 说明 | 默认值 |
|-------------|-------------|----------|
| 通过 lala.cgi 连接 | 启用本地查询 | 开启 |
| SENEC 系统 IP | SENEC 设备的 IP 地址或 FQDN | — |
| 使用 HTTPS | 当设备使用 HTTPS 时启用 | 关闭 |

**查询设置** 展开查看计时选项：

| 设置 | 说明 | 默认值 |
|-------------|-------------|----------|
| 查询间隔（高优先级） | 实时数据间隔（秒） | 10 |
| 查询间隔（低优先级） | 很少更改的数据间隔（分钟） | 60 |
| 查询超时 | HTTP 请求时间限制（毫秒） | 5000 |

如果连接出现错误，适配器会自动采用指数退避算法重试，无需手动配置。如果 SENEC 设备暂时不可用（例如重启、固件更新），查询将在设备恢复在线后自动恢复。

#### TLS证书验证
适配器使用多阶段流程验证 SENEC 设备的 HTTPS 证书：

1. **用户 CA** — 通过控制面板上传 SenecGui-Root CA 证书（系统选项卡 → TLS 证书）。您可以从 mein-senec.de 下载（文档 / 常规文档 / SenecGui-Root），然后上传 .pem 或 .zip 文件。SENEC 需要登录才能获取此证书，因此适配器无法包含它。
2. **缓存的 CA 证书** — 如果不存在用户证书，适配器可以自动从 mein-senec.de 下载 CA 证书（前提是已启用 mein-senec.de 连接器）。下载的证书存储在适配器状态中，并在重启后仍然有效。
3. **首次使用信任 (TOFU)** — 如果没有验证 CA 证书，适配器会在首次连接时记住设备证书的指纹，并将每次后续连接与之比较。如果发生更改（例如，固件更新后），则会记录警告，然后自动应用新的指纹。

适配器按顺序尝试每个阶段，并使用第一个验证成功的阶段。

TOFU 是一种连续性检查，而非证书绑定：它会通知您设备的证书已更改，但不会拒绝新证书或检查证书链。这对于您自己网络上的设备来说是一种有意为之的妥协——合法的证书更改不应导致适配器断开连接太久，以至于有人会注意到日志条目。要进行完整验证，您需要指定 CA：上传 CA 是可选的，但却是更可靠的选择。

如果自动 CA 下载失败，并且您想再次尝试，请将 `_local.tls.certFetchFailed` 设置为 `false` — 适配器将在下次重新启动时尝试下载，或者如果它正在运行，则会立即尝试下载。

**重要提示**：频繁查询或过多的数据点可能会导致 SENEC 设备过载，进而导致设备重启、无法访问或云同步失败。如果出现问题，请降低查询频率或停止适配器运行。

#### 其他高优先级轮询数据点
![高优先级轮询](../../../de/adapterref/iobroker.senec/media/admin-highprio.png)

您可以向高优先级轮询添加其他数据范围（例如，BMS、PV1、WALLBOX）。这需要您接受免责声明。仅允许使用 A-Z 字符、0-9 数字和逗号。

### SENEC 应用 API
![SENEC 应用 API](../../../de/adapterref/iobroker.senec/media/admin-api.png)

| 设置 | 说明 | 默认值 |
|-------------|-------------|----------|
| 使用 SENEC 应用 API | 启用云 API 查询 | 关闭 |
| 仪表盘更新间隔 | 仪表盘/当前数据查询间隔（分钟） | 6 |
| 详细间隔 | 每日测量值的查询间隔（分钟） | 60 |
| 高强度间隔 | 查询月度/年度测量间隔（分钟） | 1440（24 小时） |
| 并行度 / 最大并行度 | 并行 API 请求的限制 | 1 / 1 |
| 最小请求间隔 | API 请求之间的最小时间（毫秒） | 400 |
| API 请求超时 | 等待普通 API 请求（仪表盘、系统状态、详细信息）的时间（毫秒）。如果这些请求超时，请增加超时时间 | 30000 |
| 测量查询时间限制 | 等待测量聚合的时间（毫秒）。如果日志中大量轮询超时，请增加此值 | 60000 |

#### 历史重建
API 连接器可以完整重建历史测量数据（总和）。可根据需要配置重建模式和起始年份。此过程在轮询高峰期作为后台进程运行。

### Mein-senec.de
![mein-senec.de](../../../de/adapterref/iobroker.senec/media/admin-web.png)

| 设置 | 说明 | 默认值 |
|-------------|-------------|----------|
| 使用 mein-senec.de | 启用 Web 门户查询 | 关闭 |
| 状态间隔 | 状态数据查询间隔（分钟） | 6 |
| 中等间隔 | 查询昨日/自给自足/储备容量的间隔（分钟） | 360（6 小时） |
| 慢速间隔 | 查询月度/年度/历史数据间隔（分钟） | 1440（24 小时） |
| 查询测量历史记录 | 启用测量数据查询 | 关闭 |
| 包含 5 分钟详细数据 | 查询更细粒度的详细数据（约 3,500 个额外州） | 关闭 |
| 并行度 / 最大并行度 | 并行查询限制 | 1 / 2 |
| 最小请求间隔 | 请求之间的最小时间（毫秒） | 500 |

### 账户的其他资产
如果多个系统分配给 mein-senec.de 帐户（被替换的设备仍然在其后继设备旁边可见），则适配器在启动时会识别所有这些系统，并在 `_meinsenec.Plants.{steuereinheitnummer}.` 下创建每个系统。

默认情况下，仅查询第一个系统。每个附加系统在 `control.Plants.{steuereinheitnummer}.poll` 下都有自己的开关，初始状态为关闭。激活此开关后，较慢的查询级别会包含该系统，并使用与主系统相同的测量值结构填充该系统。

| 状态 | 内容 |
|-------|--------|
| `_meinsenec.Plants.{sn}.System.*` | 产品名称、设备编号、系统编号 |
| `_meinsenec.Plants.{sn}.Measurements.Monthly.*` | 每月每日数值 |
| `_meinsenec.Plants.{sn}.Measurements.Yearly.*` | 每年的月度值 |
| `_meinsenec.Plants.{sn}.Measurements.AllTime.*` | 总计 |
| `_meinsenec.Plants.{sn}.Autarky.*` | 每期自给率 |
| `_meinsenec.Plants.{sn}.Autarky.*` | 每周期自给率 |

即使开关处于关闭状态，系统首次被检测到时也会检索一次总值——因此，无需持续查询即可获得已停用设备的最终值。

请注意，每激活一个系统，门户请求的数量就会增加。如果您只需要旧设备的历史统计数据，最好关闭此功能。

### SENEC.Connect
![SENEC.连接](../../../de/adapterref/iobroker.senec/media/admin-connect.png)

| 设置 | 说明 | 默认值 |
|-------------|-------------|----------|
| 使用 SENEC.Connect | 启用 Azure API 查询 | 关闭 |
| 查询间隔 | 查询频率（秒） | 300 |
| 请求超时 | 等待响应时间（毫秒） | 30000 |
| 订阅密钥 | Azure API 订阅密钥 | — |
| 包含区域 | 查询哪些数据区域 | 电池、电表、电动汽车充电桩、电池铭牌 |

### 外部资源
![外部资源](../../../de/adapterref/iobroker.senec/media/admin-external.png)

添加来自其他 ioBroker 适配器的外部能源，例如阳台光伏系统、额外的逆变器、独立式壁挂式电源箱、热泵或外部电池储能设备。数值已标准化为瓦特，并显示在仪表盘的能量流图和实时功率曲线中。

使用**州 ID 搜索**查找所需数据点的州 ID，并将其插入到表中。

| 栏目 | 描述 |
|--------|-------------|
| 州 ID / 公式 | 单个州 ID（例如 `solar.0.power`）或带有 `{stateId}` 引用的公式（例如 `{wallbox.0.l1_amps} * {wallbox.0.l1_volts}`） |
| 类型 | 光伏发电、家用（壁挂式储能系统、热泵等）或电池 |
| 单位 | W 或 kW — 应用于最终值 |
| 模式 | **集成** = 添加到 SENEC 总数（一个节点）。**分离** = 在能量流中显示为单独的节点 |
| SOC 状态 | （仅限电池）电量状态 (%) 的状态 ID |
| 容量 | （仅限电池）电池容量（千瓦时）— 用于估算使用时间 |
| 标签 | 在能量流图中显示的名称 |

公式支持 `+ - * / ( )` 运算符。如果状态 ID 不包含花括号，且其中包含算术运算符，系统会自动检测。我们计划为复杂公式开发一个基于仪表盘的配置器，并提供交互式状态选择功能。

### 设备控制
![设备控制](../../../de/adapterref/iobroker.senec/media/admin-control.png)

控制功能允许您更改 SENEC 设备上的设置。每项控制功能都可通过特定的接口实现：

| 控制 | 本地 | API | Web |
|-----------|:-----:|:---:|:---:|
| 强制电池充电 | x | | |
| 阻塞放电 | x | | |
| 重启设备 | x | | |
| 应急电源储备 | | | x |
| 巅峰剃须 | | | x |
| SG-Ready | | | x |
| 可切换插座 | x | | x |
| 墙盒控制 | x | x | |

**使用风险自负。** 控制功能必须在设置中明确启用，并附带免责声明。该适配器无法防止来自多个连接器的冲突命令。

### 调试和日志记录
![调试和日志记录](../../../de/adapterref/iobroker.senec/media/admin-debug.png)

每个连接器（本地、API、mein-senec.de、Connect）均可配置：

- **在信息日志中显示轮询信息** — 在信息日志中显示轮询状态消息，而不仅仅是在调试日志中显示。
- **记录请求和响应** — 以调试级别记录 HTTP 详细信息（可能包含敏感数据）
- **信息日志中的队列诊断** — 在信息日志中显示队列统计信息（仅限 API 和 Web）
- **将诊断信息写入状态** — 将队列数据写入专用的 ioBroker 状态（仅限 API 和 Web）

#### 创建调试日志
大多数问题都可以通过日志文件发现，几乎没有问题能在没有日志文件的情况下被发现。

1. 将实例的日志级别设置为 **debug**：ioBroker 管理后台 → 实例 → senec 实例 → 日志级别选择字段。“silly”选项也可用，但很少能提供更多信息，反而会产生大量噪音。
2. 在适配器选项卡的“调试和日志记录”中，为受影响的连接器启用“记录请求和响应”。此设置会将“请求失败”更改为“此 URL 响应了此状态”。
3. 让程序运行足够长的时间，直到问题至少出现一次。对于查询速度较慢的级别（例如测量值、月度或年度数据），这可能意味着需要等待下一个周期，而不是重新启动。
4. 从 ioBroker 日志选项卡复制日志，或使用 `/opt/iobroker/log/` 中的文件。
5. 然后切换回**info**模式。调试日志非常庞大，会占用硬盘数周时间。

**请在转发前仔细检查。** 请求日志包含 URL 和响应，其中可能包含系统 ID、系统编号和序列号。虽然不包含密码，但这些数据属于您个人所有。请替换任何您不希望公开的信息。

#### 报告错误
请通过 [GitHub](https://github.com/nobl/ioBroker.senec/issues) 提交报告。以下措施可加快报告处理速度：

- **哪个系统** — 型号以及（如果知道）固件版本（如果本地连接器正在运行，则 `_local.FACTORY` 和 `_local.SYS_UPDATE` 包含这两项信息）
- **哪些连接器**处于活动状态，因为同样的症状在本地和云端有不同的原因。
- **适配器和 ioBroker 版本** 以及 Node.js 版本
- **预期结果与实际结果** — “电池电量缺失”可以编辑，“无法工作”需要先提出后续问题。
- **相关的日志摘录**（调试级别），包含错误前后几行日志，而不仅仅是错误行。

开始之前：不合理的数值通常来自设备本身，而非适配器。适配器主要负责传递数值，因此仪表盘上显示不正确的温度或电量信息，在设备的网页界面上通常也会显示错误。快速查看一下网页界面通常就能解决问题——如果问题仍然存在，那么上述对比信息就是该消息中最有用的信息。

## 集成仪表盘
该适配器包含一个完整的 Web 控制面板，可通过 `http://<iobroker-ip>:8082/senec/` 访问。它需要 ioBroker.web 适配器，并出现在 ioBroker.web 起始页上。

特征：

- 深色和浅色设计（可在标题栏切换）
- 国际化 — 支持 11 种语言，遵循浏览器语言设置
- 通过 socket.io 状态订阅实现实时更新
- 来自所有带有来源徽章的连接器的数据
- 支持键盘操作（Tab 键导航、ARIA 标签）

### 概览选项卡
![仪表盘概览](../../../de/adapterref/iobroker.senec/media/dashboard-overview.png)

**能量流图** — 实时 SVG 可视化显示光伏、电池、电网、房屋和壁挂式储能罐之间的能量流动。动画流路径，粗细与功率成正比。显示电池荷电状态 (SOC) 和电量。显示运行模式标识。预估剩余时间（直至电量耗尽/充满）。显示周期总计（今日/本月/本年）及自给率百分比。可选择数据源（自动/本地/API/Web）。

**实时功率曲线** — 实时折线图，显示所有五项指标（光伏、家庭、电网、电池、壁挂式充电桩）的功率随时间的变化。数据点之间采用平滑的单调三次插值。时间窗口预设范围为 10 分钟至 24 小时，并支持鼠标滚轮缩放（5 分钟至 30 天，为提升性能已进行降采样）。拖动即可滚动浏览历史记录，支持延迟加载和午夜日期标记。可以显示/隐藏单条曲线，包括一条可选的充电状态曲线（默认关闭），该曲线位于独立的 0-100% 坐标轴右侧。设有暂停/禁用开关。“实时”按钮可返回实时状态。当功率状态启用历史适配器（InfluxDB、SQL 或 History）时，图表会在加载时预先填充历史数据。每个状态单独解析——状态可以由不同的历史适配器记录，未记录的状态只会影响其对应的曲线。ⓘ 按钮会列出每条曲线背后的状态以及记录历史数据的适配器——这有助于了解为什么某条曲线没有历史数据。

![现场表现曲线](../../../de/adapterref/iobroker.senec/media/dashboard-live-chart.png)

**事件时间线** — 以简洁的 24 小时条形图显示设备日志中今日的警报（橙色）、错误（红色）和紧急事件（紫色）。鼠标悬停可查看详情。每 10 分钟自动更新。需要配置设备 IP 地址。

![事件时间表](../../../de/adapterref/iobroker.senec/media/dashboard-timeline.png)

### 电池标签
![电池平板电脑](../../../de/adapterref/iobroker.senec/media/dashboard-battery.png)

- **健康状况 (SOH) 报告** — 系统和每包健康状况，采用颜色编码指示器（绿色 > 80%，橙色 > 60%，红色）
- **模块状态** — 活动/正在加载/正在卸载的模块数量
- **充电循环次数** — 每块电池的循环次数和总能量（已充电/已放电）
- **电池电压热图** — 以颜色编码的网格显示所有组件中各个电池的电压。红色代表最低电压，绿色代表最高电压。每个组件均有电压差指示器。可立即显示电池电压不平衡情况。
- **温度** — 总温度、单模块温度和单电池温度。
- **包装电气** — 专业包装电压和电流

来自本地（BMS）和/或 API（SystemDetails）的数据，带有来源徽章。

![电池电压热图](../../../de/adapterref/iobroker.senec/media/dashboard-heatmap.png)

### 图表选项卡
![今日图表](../../../de/adapterref/iobroker.senec/media/dashboard-charts-today.png)

能源测量数据柱状图：

- **今日** — 小时条（自动限制为有数据的小时）
- **本月** — Daily Bar
- **今年** — 月度酒吧

特征：

- 可以显示/隐藏单个测量类型（光伏发电、用电量、电网输入/输出、电池充电/放电）
- 堆叠视图（生产与消费）
- 对比模式（昨天、上个月、可选年份）
- 电池电量（%）线条叠加显示。API 连接器从测量历史记录中读取此信息。mein-senec.de 不提供此类历史记录，因此 Web 连接器会采样实时充电水平：每日视图采用每小时平均值，每月视图采用每日平均值。因此，这些值仅在适配器运行时开始计算——对于适配器在午夜后未运行的日期，不存在每日平均值，也无法追溯获取。年度视图在 Web 连接器中不显示电池电量。
- 数据源选择（自动/API/Web）
- 数据表
- PNG图像导出
自动更新模式

![图表 - 年份](../../../de/adapterref/iobroker.senec/media/dashboard-charts-year.png)

### 系统选项卡
![系统选项卡](../../../de/adapterref/iobroker.senec/media/dashboard-system.png)

- **电能质量** — 频率、总功率、每相电压/功率/电流。支持 EnFluRi 1 和 EnFluRi 2（自动检测）。
- **光伏组串** — Pro-Tracker MPP 功率、电压和电流
- **壁挂式充电桩** — 电动汽车连接状态、智能充电、每相充电电流
- **功能标志** — 每个连接器的活动功能，并带有偏差检测功能
- **系统详情** — 产品、固件、GUI/NPU 版本、逆变器状态、温度（外壳、MCU、电池、逆变器）、运行时间、安装日期、安装人员联系方式

来源徽章指示哪个连接器提供了相应的值。

### 控制选项卡
![控制选项卡](../../../de/adapterref/iobroker.senec/media/dashboard-control.png)

与适配器控制功能相匹配的交互式控制：

- 强制电池充电（开关）
- 重启设备（弹出确认对话框）
- 应急电量储备（百分比设置）
- 峰值削波（模式相关场）
- SG-Ready（激活 + 阈值）
- 可切换插座（每个插座模式、阈值、名称编辑）
- 壁挂式充电桩（智能充电，限流）

控制器会检查连接器是否可用，如果所需的连接器未激活，则会显示警告。“应用”按钮会提供“已发送”反馈。

### 统计标签页
mein-senec.de 提供每周一次的 CSV 导出服务，数据精度为 5 分钟，数据可追溯至数年前——远超 ioBroker 状态所能容纳的数据量。因此，数据不会被永久存储：适配器仅维护可用周的列表，每天更新一次，并且仅在请求时加载特定周的数据。数据仅在标签页打开时存在。

- 设备选择，同时列出该帐户之前使用过的设备（如果只有一个设备，则不适用）。此实例查询的设备已预先选定。
- 选择每周的日期范围
- 每日筛选——将一周内约 2000 行的数据限制为一天。
- 分辨率 — 每小时平均值或 5 分钟原始值
- 十列出口列的列开关，包括电池电压、电流和液位
- 可排序的列标题；第三次单击可恢复时间顺序
- 汇总行显示所显示行的最小值、平均值和最大值
- 表格或图表视图；在图表中，功率列共享左侧 kW 轴，百分比值有自己的右侧 0-100% 轴，行中的空白会断开线条而不是连接起来。
- 将当前选择下载为 CSV 文件

需要已激活并连接的 mein-senec.de 连接器。

### 协议选项卡
![协议选项卡](../../../de/adapterref/iobroker.senec/media/dashboard-logs.png)

按日期搜索SENEC设备日志：

- 可筛选表格（时间、级别、类别、消息）
- 阶段筛选器：信息、警告、错误、恐慌
- 类别筛选器（从日志条目自动填充）
- 自由文本搜索
- 按严重程度用颜色编码突出显示线条
- 最新条目优先
- 实时模式 — 自动更新今日日志（符合 UTC 时间）
- 下载原始日志文件

需要配置设备 IP 地址（即使未启用本地连接器）。

## 状态参考
适配器会创建状态，并按连接器和数据区进行组织。除非明确标记为控制状态，否则所有状态均为只读。

### 连接和状态 (`info.*`)
| 状态 | 描述 |
|-------|-------------|
| `info.connection` | 总体连接状态（如果连接器处于活动状态，则为真） |
| `info.localConnected` | 本地 (lala.cgi) 连接状态 |
| `info.apiConnected` | SENEC 应用 API 连接状态 |
| `info.webConnected` | mein-senec.de 连接状态 |
| `info.connectConnected` | SENEC.Connect 连接状态 |
| `info.lastPoll.HighPrio` | 上次高优先级本地查询的时间戳 |
| `info.lastPoll.LowPrio` | 上次低优先级本地查询的时间戳 |
| `info.lastPoll.LowPrio` | 上次低优先级本地查询的时间戳 |

### TLS 状态 (`_local.tls.*`)
| 状态 | 类型 | 写入 | 描述 |
|-------|-----|:---------:|-------------|
| `_local.tls.mode` | 字符串 | 否 | 活动 TLS 验证模式：`user`、`cached`、`tofu` 或 `none` |
| `_local.tls.userCaPem` | 字符串 | 是 | 用户上传的 CA 证书（PEM，加密） |
| `_local.tls.cachedCaPem` | 字符串 | 否 | 从 mein-senec.de 下载的 CA 证书（PEM，加密） |
| `_local.tls.certFetchFailed` | 布尔值 | 是 | 设置为 `false` 以触发新的 CA 下载尝试 |
| `_local.tls.certFetchFailed` | 布尔值 | 是 | 设置为 `false` 以触发新的 CA 下载尝试 |

### 地方州
lala.cgi 查询的数据直接存储在区域名称下（例如 `ENERGY.*`、`BMS.*`、`PV1.*`、`WIZARD.*`）。

**关键能量状态：**

| 状态 | 类型 | 描述 |
|-------|-----|-------------|
| `ENERGY.GUI_INVERTER_POWER` | 数值 (W) | 当前光伏发电量 |
| `ENERGY.GUI_GRID_POW` | 数值 (W) | 电网功率（正值 = 消耗量，负值 = 馈入量） |
| `ENERGY.GUI_HOUSE_POW` | 数量 (W) | 当前家庭消费量 |
| `ENERGY.GUI_BAT_DATA_FUEL_CHARGE` | 数量 (%) | 电池电量 |
| `ENERGY.STAT_STATE` | 编号 | 运行状态代码 |
| `ENERGY.STAT_STATE_Text` | 文本 | 纯文本格式的运行状态 |
| `ENERGY.STAT_HOURS_OF_OPERATION` | 数量 (小时) | 营业时间 |
| `ENERGY.STAT_HOURS_OF_OPERATION` | 数量（小时） | 运行小时数 |

**重要电池管理系统声明：**

| 状态 | 类型 | 描述 |
|-------|-----|-------------|
| `BMS.MODULE_COUNT` | 数量 | 电池模块数量 |
| `BMS.CYCLES.{n}` | 数量 | 每个模块的加载循环次数 |
| `BMS.CELL_VOLTAGES_MODULE_{A-D}.{n}` | 数量 (mV) | 单个电池电压 |
| `BMS.TEMP_MIN.{n}` / `BMS.TEMP_MAX.{n}` | 数值 (°C) | 模块温度范围 |
| `BMS.VOLTAGE.{n}` / `BMS.CURRENT.{n}` | 数量 (V/A) | 电池组电压和电流 |
| `BMS.VOLTAGE.{n}` / `BMS.CURRENT.{n}` | 数量 (V/A) | 电池组电压和电流 |

### API 状态 (`_api.*`)
云 API 数据存储在 `_api.Anlagen.{systemId}.*` 下：

- `Dashboard.currently.*` — 实时功率值 (W)
- `Measurements.Daily.*` — 每小时测量数据 (kWh)
- `Measurements.Monthly.*` — 每日测量数据（千瓦时）
- `Measurements.Yearly.*` — 月度测量数据（千瓦时）
- `Measurements.AllTime.*` — 生命周期总计 (kWh)
- `SystemDetails.*` — 电池详情、温度、固件
- `SystemStatus.*` — 运行状态、功能标志

### Web 状态 (`_meinsenec.*`)
mein-senec.de 数据存储在 `_meinsenec.*` 下：

- `状态.*` — 当前功率值 (kW)，运行状态
- `测量数据.*` — 历史测量数据（千瓦时）
- `自给自足.*` — 自给自足百分比（日/周/月/年/总计）
- `EmergencyPower.*` — 应急电源储备设置
- `PeakShaving.*` — 削峰配置
- `SGReady.*` — SG-Ready 设置
- `Sockets.*` — 可切换套接字的状态

### 连接状态 (`_connect.*`)
SENEC.Connect 数据存储在 `_connect.Systems.{system_id}.*` 下，包含电池和电表子区域。一个账户可以包含多个系统；每个系统都有自己的通道，通道名称根据系统型号命名，并通过 `bessNameplate` 中报告的系统 ID 进行寻址——这确保即使 API 返回的系统顺序不同，系统也能保留其状态。`_connect.info.systemCount` 报告 API 检测到的系统数量。

无论配置了哪些部分，都会始终查询部分 `bessNameplate`，因为它包含此 ID。

Wallbox 的存储方式相同，分别位于相应的报告 `id`: `_connect.Systems.{system_id}.evse.{wallbox_id}.*` 下。如果 Wallbox 从响应中消失，则其状态将被删除，而不是保留最后的值。

如果系统未报告 `system_id`，则使用其序列号代替。系统可通过其报告过的所有标识符进行识别——因此，缺少这些标识符的响应不会导致系统跳转到新的路径。如果响应中完全不包含任何标识符，系统将使用其在响应中的位置，就像 2.15.0 版本之前一样，并且在此期间清理工作将暂停。

不再向 API 报告的系统状态将被移除。2.15.0 版本之前的适配器会根据系统在响应中的位置对其进行编号（`_connect.Systems.0.*`）；这些状态会在更新后的第一次轮询期间删除，届时系统已被识别。

**对于使用历史适配器（History、InfluxDB、SQL）记录 SENEC.Connect 状态的用户：此设置与状态本身绑定，旧状态更新后将丢失此设置。日志记录不会自动继续——请在更新后为新路径下的状态重新启用日志记录。

### 外部国家（`_external.*`）
来自外部来源的数据存储在`_external.{typ}.{index}.*`下：

| 状态 | 描述 |
|-------|-------------|
| `_external.pv.{n}.power` | 外部光伏功率 (W) |
| `_external.battery.{n}.power` | 外接电池功率（瓦，带符号） |
| `_external.battery.{n}.soc` | 外部电池电量 (%) |
| `_external.battery.{n}.capacity` | 外部电池容量 (kWh) |
| `_external.{typ}.{n}.label` | 用户自定义标签 |
| `_external.{typ}.{n}.mode` | 显示模式（集成/分离） |
| `_external.{typ}.{n}.sourceId` | 外国国家 ID 或公式 |
| `_external.{typ}.{n}.sourceId` | 外部状态 ID 或公式 |

### 控制状态 (`control.*`)
用于设备控制的可写状态：

| 状态 | 类型 | 描述 |
|-------|-----|-------------|
| `control.ForceCharge` | 布尔值 | 强制电池充电开启/关闭 |
| `control.RebootAppliance` | 布尔值 | 触发设备重启 |
| `control.EmergencyPower.ReserveInPercent` | 编号 | 应急电源储备 (%) |
| `control.PeakShaving.*` | 其他 | 剃须峰值设置 |
| `control.SGReady.*` | 其他 | SG-Ready 设置 |
| `control.Sockets.{n}.*` | 各种 | 专业插座控制 |
| `control.Wallbox.{n}.*` | 其他 | 墙盒控制 |
| `control.Wallbox.{n}.*` | 各种 | Wallbox 控制 |

只有当相应的功能已启用并通过已配置的连接器可用时，才会创建控制状态。

## 故障排除
设备无响应/频繁重启：请缩短高优先级轮询间隔或移除自定义高优先级数据点。SENEC 设备资源有限。

**API/Web 未收到任何数据**：请在 SENEC 帐户选项卡中检查您的 mein-senec.de 登录信息。适配器会将身份验证错误记录为警告级别。

**仪表盘未加载**：请确保 ioBroker.web 正在端口 8082 上运行。仪表盘作为 Web 扩展程序在 `/senec/` 下提供。

**缺失状态**：可用状态取决于您的 SENEC 型号、固件版本和配置的连接器。并非所有系统都提供所有状态。

**控制状态不显示**：必须在设备控制设置中显式启用控制功能。每个控制功能都需要一个特定的活动连接器。

**本地连接出现 TLS 证书错误**：适配器会自动处理证书验证。请检查 `_local.tls.mode` 以查看当前激活的验证方法。如果 TOFU 模式已激活，并且您想要升级到 CA 验证，请启用 mein-senec.de 连接器——适配器将尝试自动下载 CA 证书。如果之前的下载失败，请将 `_local.tls.certFetchFailed` 更改为 `false` 以重试。

## 帮助和交流
对于问题、配置和与其他用户交换信息，可以使用 [在 ioBroker 论坛上另开一个帖子](https://forum.iobroker.net/topic/30620/neuer-adapter-senec-home-adapter)——通常是获得答案的最快方式。

如果看起来像是一个错误，请按照上述说明在 [在 GitHub 上创建 issue（https://github.com/nobl/ioBroker.senec/issues）。了解如何创建调试日志（#debug-log-creation）以及如何使消息可编辑。](#fehler-melden) 中创建一个问题。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.15.1 (2026-08-23)
- Dependency Updates

### 2.15.0 (2026-08-14)
- 🔎 **Wanted: testers for the SENEC.Connect connector.** I cannot see what your subscription returns, and real responses are what this connector is missing — especially from accounts holding more than one system, and from responses containing more than `battery` and `meter` (`evse`, `bessNameplate`). If SENEC.Connect reports anything at all for your account, please get in touch in the [ioBroker forum thread](https://forum.iobroker.net/topic/30620/neuer-adapter-senec-home-adapter) or via a [GitHub issue](https://github.com/nobl/ioBroker.senec/issues).
- **Breaking (SENEC.Connect only):** The systems of a SENEC.Connect account were stored by their position in the API response, as `_connect.Systems.0.*`, `_connect.Systems.1.*` and so on. The API does not promise an order, so on an account with more than one system that position can change from one poll to the next — two systems then swap their states inside the same history, with nothing in the values to show it happened. Each system is now stored under the system id from its `bessNameplate` section instead, for example `_connect.Systems.P4H1-1234567.*`, and gets a channel named after its model. A system is remembered by every identifier it has ever reported, so a response that omits one of them does not move it; a system that reports no identity at all keeps its old position-based path and is left alone. The old numbered states are deleted on the first poll after the update; scripts, charts and visualisations that refer to them have to be pointed at the new paths, and the history recorded under the old paths ends there. **If you log these states with a history adapter, that setting is stored on the state and does not survive the move — switch logging back on for the new paths, or recording stops silently.** Accounts with a single system are affected the same way, but nothing else changes for them.
- **Breaking (SENEC.Connect only):** Wallboxes are stored under the `id` they report rather than their position in the response, for the same reason and with the same consequence — `_connect.Systems.{system_id}.evse.{wallbox_id}.*`. A wallbox that disappears from the response now has its states removed instead of leaving them frozen at their last values, looking current.
- New: `_connect.info.systemCount` reports how many systems SENEC.Connect returns, and the states of a system the API stops reporting are removed.
- New: SENEC.Connect has its own request timeout, adjustable between 5 and 120 seconds and 30 seconds by default. It previously borrowed the local appliance's timeout, which is capped at ten seconds and is not even shown unless the local connection is switched on — so a slow cloud response failed every poll with no reachable setting to change.
- Fix: A SENEC.Connect reply that arrived with a success code but did not contain the expected data — an error page or a captive portal, for instance — left the connector reporting itself as connected indefinitely while nothing was being read.
- Fix: A SENEC.Connect polling interval outside the permitted range is corrected on start-up, as the other intervals already were. Only a value written directly into the instance settings could get there, but a negative one made the adapter poll a request-metered API in a tight loop.
- Fix: A SENEC.Connect request in progress is now cancelled when the adapter stops, instead of running on and writing during shutdown, and it identifies itself with the same user agent as the adapter's other requests.
- Fix: Clearing the SENEC.Connect section list in the settings fell back to fewer sections than the field's own default, silently dropping wallbox data.
- Change: The `bessNameplate` section is now always requested from SENEC.Connect regardless of the configured sections, because it carries the id the states are stored under. The API is billed per request, not per section, so this costs nothing.
- Fix: When mein-senec.de measurement detail states were cleared at the daily rollover and written again in the same cycle, they came back as bare values — the name, unit and role were gone, because the adapter still believed the deleted definitions existed.
- Fix: On appliances not set to German, `ENERGY.STAT_STATE_Text` was never created at all. It puts the numeric system state into plain language — "Laden", "Akku voll", "Fernabschaltung" — but the English and Italian tables were stored under a name the adapter never looked them up by, so nothing was written and no error appeared. English is also what the adapter falls back to when it cannot read the appliance's language, so this affected most installations. The state now appears; on an affected system it shows up as a new datapoint after the update. `FACTORY.COUNTRY_Text` was missing on Italian appliances for the same reason.
- Fix: System state 41 was labelled "Schlafmodus" / "Sleeping mode". The appliance itself calls it "Abschaltung Lithium" / "Lithium shutdown", which is a different condition; the Italian text already said so. State 74 also carried a spelling mistake.
- New: Three more numeric datapoints are translated into text — `BMS.MANUFACTURER_Text` names the battery module generation (BMZ or Ampace / LFP), `PWR_UNIT.ENFLURI_Text` says which meter a power unit is measured by, and `CASC.STATE_Text` gives the cascade state.
- **Change: A datapoint your appliance does not have no longer gets a state, and an existing one says so.** The adapter asks every appliance for the same set of datapoints and no model provides all of them, so the answer "I do not have that one" is normal rather than a fault. Until now that answer was stored as the value, so the state read `VARIABLE_NOT_FOUND`. No state is created for it any more, and one that already exists is set to "not provided by appliance" so it is obvious at a glance instead of sitting there with a stale number that still looks current. Nothing is deleted, nothing is reported as a problem, and nothing is required of you. A datapoint that merely failed to be read this once is left untouched, because the real reading is expected back. A whole section your appliance does not have is handled the same way; it previously left behind a state called `<SECTION>.OBJECT_NOT_FOUND` holding nothing. This covers what the adapter asks for by name and the sections it requests — a field that quietly vanishes from a section still being provided cannot be detected this way, because the appliance simply omits it rather than saying anything about it.
- Fix: An unreadable datapoint could be published as a real-looking measurement. The appliance answers with a word where a number was expected, and that word slipped into the conversions for flags, factors, dates and IP addresses: a flag was stored as `true`, a scaled value as `NaN`, a timestamp as "Invalid Date" and an address as garbage. Nothing is stored for such an answer any more, so a state either holds a real reading or does not exist. A datapoint answering with an empty value no longer becomes `0` either, and a few value formats the appliance uses were decoded wrongly — text beginning with "u" could be read as a number, so a state could show 14 where the appliance had sent no reading at all.
- Change: `ENERGY.GUI_BAT_DATA_OA_CHARGING` is no longer polled every few seconds. A SENEC.Home V3 does not have it, it is absent from every field that appliance reports for this section, and the appliance's own web interface never asks for it. It remains defined, so an older appliance that still provides it keeps the state from the slower poll.
- Fix: The appliance's display language was read once at start-up, in a race with the first poll of the datapoint that carries it. On a fresh installation the adapter could therefore stay on English for the whole session, and changing the language on the appliance never took effect until the adapter was restarted. It is now picked up as soon as the appliance reports it, and a language the adapter has no texts for falls back to English instead of silently leaving every translated state empty.
- Fix: A code that is not in a translation table was shown as "(unknown)", which discarded the very number needed to identify it. It now reads "(unknown 7)". If you see one, the number is worth reporting.
- Change: Translated `_Text` states are no longer marked writable — writing to them never did anything — and are declared as text rather than as a measurement. Existing ones are corrected on the first poll after the update.
- Fix: The operating-mode text on the web dashboard now comes from the appliance's own system state on English and Italian systems as well. It previously fell back to the cloud status text there, because the local text did not exist.
- Fix: Several labels in the English and Italian system-state lists were misspelled, one Italian entry contained a stray fragment of an untranslated string, and some Italian entries were missing their accents.
- Change: The adapter warns when the datapoints configured for high-priority polling make a request large enough to approach the size the appliance can still answer. Beyond that size the appliance replies with a truncated body, which used to surface only as a connection error.

### 2.14.2 (2026-08-13)
- Dependency updates

### 2.14.1 (2026-08-02)
- Fix: Emptying one of the additional high-priority datapoint fields left its "add datapoints to polling" box ticked, and the adapter then reported a faulty configuration on every start although nothing was configured at all. Such a field is no longer treated as an error, which also settles it for instances that are already in this state; clearing the field now unticks the box as well. Two related problems are fixed with it: a blank after a comma discarded the whole entry instead of being read as the separator it is, and a trailing comma sent a nameless datapoint to the appliance. An entry containing an invalid name is still ignored as a whole, but the warning now names the part that caused it.

### 2.14.0 (2026-08-01)
- Fix: With the local connection switched on but no IP address entered, the adapter repeatedly tried to reach 0.0.0.0 and logged a connection error on every attempt. It now says once that no address is configured and waits for one.
- Change: A new instance now starts with no connector preselected — pick the ones you want in the settings. The local connection is no longer switched on in advance, and its address field starts empty instead of showing 0.0.0.0. Existing instances keep their settings unchanged.
- Fix: When the SENEC sign-in service rejected the stored token and was itself unreachable, the adapter attempted a full login twice and then kept two recovery loops running side by side, doubling every request. It now makes one attempt and retries on a single schedule.
- Fix: If the appliance was unreachable at start-up and only answered on a later attempt, sections found during that attempt were not actually polled until the adapter was restarted.
- Fix: Four of the six mein-senec.de queue diagnostic states were always empty. They now report real values and count finished requests rather than started ones, so the success rate is no longer dragged down by work still in progress.
- Fix: The two mein-senec.de debug settings only took effect when measurement history polling happened to be switched on as well. They now work on their own.
- Fix: An external source using a formula with several references was recalculated once per reference at start-up, reading every referenced state repeatedly. It is now calculated once.
- Fix: A battery level of infinity from an external source, and a kilowatt reading too large to express in watts, are no longer written to states.
- Fix: When mein-senec.de asks the adapter to wait before retrying, a wait expressed as a date is now understood as well as one expressed in seconds. An implausibly long wait is capped at an hour so the connector always recovers on its own.
- New: The timeout for ordinary SENEC API requests is configurable, and its default is raised from 10 to 30 seconds. The API is regularly slow enough that dashboard and system status requests were timing out, which loses the whole reading until the next poll cycle. Measurement history keeps its own, longer limit.
- Fix: An error reply from mein-senec.de was treated as if it were data. A failed request could write an error page into the status states, advance the "last poll" timestamp and leave the connector reporting itself as connected. Responses are now checked centrally, so a failure is a failure everywhere.
- Fix: The adapter no longer keeps its request rate up when mein-senec.de is struggling. A server error now pauses the whole queue briefly, exactly as rate limiting already did, and the server's own requested delay is honoured. Control commands are still never repeated automatically.
- Fix: If the SENEC login had to be renewed and that renewal failed, the adapter could end up with no token, no scheduled retry and no error — silently stuck until restarted. It now retries with a growing delay, so it recovers on its own.
- Fix: Measurements for "today" and "yesterday" could be fetched for the wrong day between midnight and the UTC changeover — up to two hours every night in Central European time, and any part of the night in other time zones.
- Fix: The battery level recorded from mein-senec.de lost a full day twice a year, at the daylight-saving changeovers, because two adjacent days were not recognised as adjacent.
- Fix: Sections the appliance did not list during discovery are no longer dropped from polling. A restricted or partial answer could previously reduce the adapter to polling almost nothing, including the live values.
- Fix: A failing poll step is now counted, so a system that is only partly readable is reported instead of passing as healthy.
- Fix: External energy sources sharing one foreign state now all update. Previously only the last one configured for a given state received changes, and a state used both directly and in a formula drove only one of the two. Values are also read once at startup instead of showing 0 until the source next changes, and a formula that divides by zero no longer writes Infinity.

### [Former Updates](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2026 Norbert Bluemle <github@bluemle.org>

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