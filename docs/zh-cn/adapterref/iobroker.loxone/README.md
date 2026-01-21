---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.loxone/README.md
title: ioBroker.loxone
hash: YkjvNYRdWtmjOVjVA795TpNxsCDUbmN6c3+fCVavieY=
---
![标识](../../../en/adapterref/iobroker.loxone/admin/loxone.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.loxone.svg)
![下载](https://img.shields.io/npm/dm/iobroker.loxone.svg)
![安装数量](https://iobroker.live/badges/loxone-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/loxone-stable.svg)
![NPM](https://nodei.co/npm/iobroker.loxone.png?downloads=true)

# IoBroker.loxone
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/loxone/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** ![测试与发布](https://github.com/UncleSamSwiss/ioBroker.loxone/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 loxone 适配器
此适配器需要 Node.js 20.x 或更高版本！

获取 Loxone Miniserver（和 Loxone Miniserver Go）中所有可用的信息，并提供实时更改。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 安装
通过 ioBroker 管理后台安装此适配器：

1. 打开实例配置对话框
2. 输入您的 Loxone Miniserver 的 IP 地址或主机名以及 HTTP 端口（默认为 80）。
3. 在 Loxone Miniserver 中创建一个新用户（使用 Loxone Config 应用程序），并仅授予该用户对所有必需变量的读取和写入权限。
4. 在配置对话框中输入此用户的用户名和密码
5. 保存配置
6. 启动适配器

＃＃ 配置
### 迷你服务器主机名/IP
这是您的 Loxone Miniserver 或 Miniserver Go 的 IP 地址或主机名。

### 迷你服务器端口
这是您的 Loxone 迷你服务器的 HTTP 端口。

默认情况下，Miniserver 配置为监听 80 端口，但您可能已经更改了它。

### 迷你服务器用户名
请提供有效的用户名以访问 Loxone Miniserver。

出于安全考虑，强烈建议使用与“admin”不同的用户。

用户只需要对 ioBroker 中你想使用的变量具有读取权限。

### 迷你服务器密码
请提供给定用户名对应的密码（见上文）。

### 同步名称
这将使 ioBroker 中的名称在 Loxone 配置发生更改时自动更新。

如果禁用此功能，则名称仅在首次检测到控件时同步。

### 同步房间
这将使用 Loxone Miniserver 提供的所有房间填充 enum.rooms 枚举，并将所有控件链接起来。

### 同步函数
这将使用 Loxone Miniserver 提供的所有类别填充 enum.functions 枚举，并将所有控件链接起来。

### 天气服务器
选择要同步的天气数据：

- “不同步天气数据”将不会同步任何与天气服务器相关的数据。
- “仅同步当前天气”将同步“实际”数据。
- “同步24小时天气预报”将同步当前天气和24小时天气预报。
- “同步整个天气预报”将同步当前天气和整个天气预报（96 小时）。

## 州
适配器会自动连接到已配置的 Loxone Miniserver，并为找到的每个控制状态创建状态。

各州的 ID 格式如下：`loxone.<instance>.<control>.<state>`

- `<instance>` 是 ioBroker 适配器实例索引（通常为“0”）。
- `<control>` 是控件的 UUID
- `<state>` 是控件内的状态（有关更多信息，请参阅[支持的控件类型](#supported-control-types)）。

在 Loxone Config 中配置控件时提供的名称将仅用作其在 ioBroker 中的显示名称。

这是因为用户可能为多个控件选择相同的名称。

有关控件及其状态的更多信息，请参阅 Loxone API（特别是结构文件）：https://www.loxone.com/enen/kb/api/

## 控制可见性
默认情况下，Loxone Miniserver 会隐藏 Web 界面上的许多控件（以及它们的状态）。

这意味着，它们对这个 ioBroker 适配器也是隐藏的。

### 在用户界面中使用
为确保您的所有状态都已正确报告给 ioBroker，请确认“用户界面”部分中的“使用”选项已勾选：

![在用户界面设置中使用](../../../en/adapterref/iobroker.loxone/doc/loxone-config-use-in-visualization.png)

### 显示诊断输入
要查看诊断输入（例如 Air 设备的电池状态），请确认设备已勾选“显示诊断输入”选项：

![显示诊断输入设置](../../../en/adapterref/iobroker.loxone/doc/loxone-config-display-diagnostics.png)

全球国家
此适配器目前提供以下全局状态：

- `operatingMode`：Loxone Miniserver 的当前运行模式编号
- `operatingMode-text`：Loxone Miniserver 的当前运行模式（文本格式）。
- `日出`：指今天太阳从午夜升起的分钟数
- `日落`：指今天太阳从午夜落下至今的分钟数
- `notifications`：通知数量
- `修改次数`：修改次数
- 所有其他全球状态均以文本形式报告。

## 支持的控件类型
此适配器目前支持以下控制类型。

在州名后面，可以看到该州的类型：

- `(rw)`：可读写：此状态可从 ioBroker 更改
- `(ro)`：只读：此状态无法从 ioBroker 更改
- `(wo)`：只写：此适配器不会报告此状态的值，但可以更改，从而触发 Loxone Miniserver 上的某些操作。

### AalSmartAlarm
由 AAL 智能报警控制系统提供。

- `alarmLevel` (ro) 当前报警级别的 ID
- 0 = 无警报
-1 = 立即报警
- 2 = 延迟报警
- `alarmCause` (ro) 表示最后一次警报原因的字符串
- `isLocked` (ro) 重置激活，输入将被忽略，因此不会执行任何警报。
- `isLeaveActive` (ro) 离开输入已设置，不会执行任何警报
- `disableEndTime`（只读）控件禁用结束时间
- `confirm` (wo) 确认待处理的警报
- `disable`（wo）禁用一段时间的控制功能，期间不会执行任何警报。将其设置为 0 将重新启用智能警报。
- `startDrill` (wo) 执行测试警报

### AalEmergency
由 AAL 智能紧急按钮控制系统提供。

- `status` (ro) 当前状态的 ID
- 0 = 运行中，正常运行，等待紧急按钮按下
- 1 = 警报已触发
-2 = 配置中的重置输入被置位，控制关闭
- 3 = 应用已暂时禁用控制
- `disableEndTime`（只读）控件禁用结束时间
- `resetActive` (ro) 文本状态，带有活动的重置输入（如果控件处于重置状态）
- `trigger` (wo) 从应用程序触发闹钟
- `quit` (wo) 退出活动警报
- `disable`（wo）禁用控件，禁用时间为指定的秒数。如果控件已禁用，则设置为 0 可重新启用控件。

＃＃＃ 警报
由防盗报警控制系统提供。

- `armed`（读写）警报的布尔状态（真/假）；将此值写入 `true` 将立即开启警报（没有预定义的延迟）
- `nextLevel` (ro) 下一个警报级别的 ID
- 1 = 静音
- 2 = 原声
- 3 = 光学
- 4 = 内部
- 5 = 外部
- 6 = 远程
- `nextLevelDelay` (ro) 下一关的延迟时间（秒）。
- `nextLevelDelayTotal` (ro) 下一关的总延迟时间（秒）。
- `level` (ro) 当前报警级别的 ID
- 1 = 静音
- 2 = 原声
- 3 = 光学
- 4 = 内部
- 5 = 外部
- 6 = 远程
- `startTime`（只读）闹钟开始的时间戳
- `armedDelay` (ro) 警报控制布防的延迟时间
- `armedDelayTotal` (ro) 报警控制布防的总延迟时间
- `sensors` (ro) 传感器列表
- `disabledMove`（读写）移动是否被禁用（true）或不被禁用（false）
- `delayedOn` (wo) 向此状态写入任何值都会启动警报，并设置延迟时间。
- `quit`（wo）向此状态写入任何值都会确认警报

中央报警系统
由中央防盗报警控制系统提供。

- `armed`（读写）警报的布尔状态（真/假）；将此值写入 `true` 将立即开启警报（没有预定义的延迟）
- `delayedOn` (wo) 向此状态写入任何值都会启动警报，并设置延迟时间。
- `quit`（wo）向此状态写入任何值都会确认警报

### 闹钟
由闹钟控制提供。

- `isEnabled`（读写）闹钟的布尔状态（true / false）
- `isAlarmActive` (ro) 布尔值 (true / false) 表示闹钟当前是否正在响铃
- `confirmationNeeded` (ro) 布尔值 (true / false) 用户是否需要确认警报
- `ringingTime` (ro) 倒计时，以秒为单位，表示闹钟响铃到再次进入贪睡状态前会响多久。
- `ringDuration` (rw) 闹钟响铃的持续时间（秒）。
- `prepareDuration` (rw) 准备时间（秒）
- `snoozeTime` (ro) 指小睡结束前的秒数
- `snoozeDuration` (rw) 打盹持续时间（秒）
- `snooze`（wo）向此状态写入任何值都会使当前闹钟暂停。
- `dismiss`（wo）向此状态写入任何值都会关闭当前警报

### 音频区
由音乐服务器区提供。

- `serverState` (ro) 音乐服务器的状态：
- -3 = 未知/无效区域
-2 = 无法连接
-1 = 未知
- 0 = 离线
- 1 = 初始化（启动，尝试连接）
- 2 = 在线
- `playState` (rw) 播放状态：
-1 = 未知（此值无法设置）
- 0 = 停止（设置此值将暂停播放）
-1 = 暂停（设置此值将暂停播放）
- 2 = 正在播放（设置此值将开始/恢复播放）
- `clientState`（只读）客户端状态：
- 0 = 离线
- 1 = 初始化（启动，尝试连接）
- 2 = 在线
- `power`（读写）客户端电源是否处于活动状态
- `volume` (rw) 当前音量
- `maxVolume` (ro) 区域可以设置最大容量
- `shuffle`（读写）是否启用播放列表随机播放
- `sourceList`（只读）列表，包含所有区域收藏夹
- `repeat` (rw) 重复模式：
-1 = 未知
- 0 = 关闭
- 1 = 重复所有操作
- 2 = 未使用
- 3 = 重复当前项
- `songName` (ro) 歌曲名称
- `duration` (ro) 整首曲目的长度，如果不知道则为 -1 (stream)
- `progress` (rw) 当前在轨道中的位置
- `album` (ro) 专辑名称
- `artist` (ro) 艺术家姓名
- `station` (ro) 车站名称
- `genre` (ro) 类型名称
- `cover` (ro) 歌曲/专辑封面图片 URL
- `source` (rw) 当前选定的源标识符（参见上面的 `sourceList`）
- `prev` (wo) 向此状态写入任何值都会移动到上一个轨道
- `next` (wo) 向此状态写入任何值都会移动到下一个轨道

### 中央音频
由中央音乐服务器提供。

- `control` (wo) 设置所有玩家的播放状态（`true` = 播放，`false` = 暂停）

### 颜色选择器
该设备仅出现在 LightController 内部。

- `red` (rw) 颜色选择器的红色值
- `green` (rw) 颜色选择器的绿色值
- `blue` (rw) 颜色选择器的蓝色值

通过 ioBroker 设置上述一个或多个状态后，大约 100 毫秒后才会向 Miniserver 发送命令。

这样做是为了防止单个用户输入导致颜色多次变化。

### 颜色选择器 V2
该设备仅出现在 Loxone 软件版本 9 及以上版本的 Light Controller V2 中。

- `red` (rw) 颜色选择器的红色值
- `green` (rw) 颜色选择器的绿色值
- `blue` (rw) 颜色选择器的蓝色值

通过 ioBroker 设置上述一个或多个状态后，大约 100 毫秒后才会向 Miniserver 发送命令。

这样做是为了防止单个用户输入导致颜色多次变化。

### Daytimer / IRCDaytimer
由定时器/日程表提供。

- `mode` (ro) 日间计时器的当前操作模式
- `mode-text` (ro) 日历的当前操作模式名称
- `覆盖` (ro) 计时器的剩余时间
- `value` (ro) 当前值，对于数字信号为 `true` 或 `false`，对于模拟信号为一个值。
- `value-formatted` (ro) 当前格式化值（文本）
- `needsActivation` (ro) 仅在控件需要激活时可用
- 只要日历的重置输入处于活动状态，`resetActive` (ro) 就保持活动状态。
- `pulse` (wo) 用于在需要激活条目时激活新值。

### 调光器
由调光器提供。

- `position`（读写）调光器的当前位置
- `min` (ro) 当前最小值
- `max` (ro) 当前最大值
- `step` (ro) 当前步长值
- `on`（wo）向此状态写入任何值都会将调光器设置为上次已知的位置
- 将任何值写入“off”（wo）状态都会禁用调光器，并将位置设置为 0，但会记住上次的位置。

### EIBDimmer
由EIB/KNX调光器提供。

- `position`（读写）调光器的当前位置
- `on`（wo）向此状态写入任何值都会将调光器设置为上次已知的位置
- 将任何值写入“off”（wo）状态都会禁用调光器，并将位置设置为 0，但会记住上次的位置。

弗罗尼乌斯
由能源监测器提供。

- `prodCurr` (ro) 当前生产能力
- `prodCurrDay` (ro) 当日所有能源生产
- `prodCurrMonth` (ro) 本月所有能源产量
- `prodCurrYear` (ro) 本年度所有能源产量
- 自成立以来的 `prodTotal` (ro) 能源产量
- `consCurr` (ro) 当前消耗功率
- `consCurrDay` (ro) 当日消耗的能量
- 自设置以来消耗的 `consTotal` (ro) 能量
- `deliveryDay` (ro) 未知
- `earningsDay` (ro) 指的是通过两种方式赚取的收益：一是自己消耗产生的电力而不是从电网消耗电力；二是将未使用的电力输送到电网。
- `earningsMonth` (ro) 当月收入金额
- `earningsYear` (ro) 本年度赚了多少钱
- `earningsTotal` (ro) 自成立以来赚了多少钱
- `gridCurr` (ro) 当前电网消耗/输送功率。如果为负值，则表示正在向电网输送功率。
- `batteryCurr` (ro) 表示当前电池充电/使用功率。如果为负值，则表示电池正在充电。
- `stateOfCharge` (ro) 表示电池的充电状态。100 = 已充满电。
- `co2Factor` (ro) 生产 1 千瓦时电能需要多少二氧化碳排放，用于计算二氧化碳减排量
- `online` (ro) true：在线，false：离线

＃＃＃ 门
由闸机控制系统提供。

- `position` (ro) 表示位置，取值范围从 1（向上）到 0（向下）。
- `active` (rw) 门控运动的当前方向
- -1 = 关闭
- 0 = 不移动
- 1 = 打开
- `preventOpen` (ro) 是否阻止门打开
- `preventClose` (ro) 是否阻止门关闭

### 中央大门
由中央门禁系统控制。

- `open` (wo) 打开所有大门
- `close` (wo) 关闭所有门
- `stop` (wo) 停止所有门电机

### 小时计数器
由……提供

- `total` (ro) 计数器至今已激活的总秒数
- `剩余时间` (ro) 距离下次维护还剩多少秒
- `lastActivation`（ro）计数器上次激活的时间戳
- `overdue` (ro) 如果未逾期则为 `false`，否则需要维护。
- `maintenanceInterval` (ro) 秒，表示距离下次维护的时间间隔
- `active`（ro）计数器当前是否处于活动状态
- `overdueSince` (ro) 自维护间隔超时以来的秒数
- `reset` (wo) 将重置以下值
- 剩余维护周期
- 逾期 0
- 逾期至 0
- `resetAll`（wo）类似于 `reset`，但还会设置
总计为 0
- lastActivation 设置为 0

### 仅供参考模拟
由虚拟状态以及 Loxone Touch 开关提供。

- `value` (ro) 控件的状态值（数字）
- `value-formatted` (ro) 如果已配置，则为状态的格式化值（使用 Loxone Config 中的“Unit”格式）

### InfoOnlyDigital
由虚拟状态以及 Loxone Touch 开关提供。

- `active` (ro) 控件的布尔状态（true / false）。
- `active-text`（只读）如果已配置，则表示状态的文本等效项
- `active-image`（只读）如果已配置，则表示状态的镜像等效项
- `active-color`（只读）如果已配置，则表示该状态的颜色等效值

![仅供参考的数字设置](../../../en/adapterref/iobroker.loxone/doc/loxone-config-info-only-digital.png)

### 仅供参考文本
由虚拟文本状态提供。

- `text` (ro) 控件的状态值
- 如果配置了 `text-formatted`（ro），则表示状态的格式化值。

对讲机
由门禁控制器提供。

- `bell` (ro) 指铃铛是否在响
- `lastBellEvents`（只读）数组，包含所有未作答的铃声活动的时间戳。
- `version` (ro) 仅限 Loxone 对讲机 - 包含当前已安装固件的文本

版本

- `answer`（wo）向此状态写入任何值都会停用铃铛

此类通道可能包含其他设备。更多信息请参阅相关章节。

### 智能房间控制器 V2
由 Miniserver 10.0 及更高版本中的智能房间控制器 V2 提供。

待办事项：文档目前缺失

### 嫉妒
由不同类型的百叶窗（自动和手动）提供。

- `up` (rw) Jalousie 是否向上移动
- `down` (rw) 百叶窗是否向下移动
- `position` (ro) 百叶窗的位置，一个介于 0 到 1 之间的数字
    - 百叶窗上部位置 = 0
    - 百叶窗下部位置 = 1
- `shadePosition` (ro) 百叶窗的遮光位置，取值范围为 0 到 1。
- 百叶窗未遮光 = 0
- 百叶窗已遮光 = 1
- `safetyActive` (ro) 仅供启用自动驾驶功能的用户使用，表示安全关闭状态
- `autoAllowed` (ro) 仅供启用自动驾驶功能的用户使用
- `autoActive` (rw) 仅供启用自动驾驶功能的用户使用
- 仅对启用自动驾驶功能的用户启用 `locked` (ro)，这代表 Loxone 配置中的输出 QI。
- `infoText` (ro) 会告知例如导致锁定状态的原因，或者导致安全功能激活的原因。
- `fullUp` (wo) 向此状态写入任何值都会触发完全向上运动
- `fullDown` (wo) 向此状态写入任何值都会触发完全向下运动
- `shade`（wo）向此状态写入任何值都会将百叶窗调整到最佳位置

### 中央百叶窗
由中央百叶窗控制系统提供。

- `autoActive` (rw) 仅供启用自动驾驶功能的用户使用
- `fullUp` (wo) 向此状态写入任何值都会触发完全向上运动
- `fullDown` (wo) 向此状态写入任何值都会触发完全向下运动
- `shade`（wo）向此状态写入任何值，将所有百叶窗的阴影调整到完美位置

### 灯光控制器
由（酒店）照明控制器提供。

场景只能在 Loxone 应用程序中修改，但可以在 ioBroker 中选择。

- `activeScene` (rw) 当前活动场景编号
- 0：全部关闭
- 1..8：用户自定义场景（场景的定义/学习必须使用 Loxone 工具完成）
- 9：全部
- `sceneList`（ro）所有场景的列表
- `plus` (wo) 切换到下一场景
- `minus` (wo) 更改前一场景

此类通道可能包含其他设备。更多信息请参阅相关章节。

### 灯光控制器 V2
由 Loxone 软件 9 及以上版本中的（酒店）照明控制器提供。

氛围只能在 Loxone 应用程序中修改，但可以在 ioBroker 中选择和组合。

- `moodList` (ro) 所有已配置情绪名称的列表
- `activeMoods`（读写）当前活跃的情绪名称列表
- `favoriteMoods` (ro) 最喜欢的心情名称列表
- `additionalMoods` (ro) 非常用情绪名称列表
- `plus` (wo) 变为下一个语气
- `minus` (wo) 改变之前的情绪

此类通道可能包含其他设备。更多信息请参阅相关章节。

### 中央照明控制器
由中央照明控制器提供照明。

- `control` (wo) 打开或关闭所有灯

### 邮箱
由 Paketsafe Air / Tree 提供。

- `notificationsDisabledInput` (ro) 已禁用通知输入的状态
- `packetReceived`（只读）表示是否已收到数据包
- `mailReceived` (ro) 表示邮件是否已收到
- `disableEndTime`（只读）时间戳，直到通知被禁用为止
- `confirmPacket`（wo）确认收到数据包
- `confirmMail` (wo) 确认收到邮件
- `disableNotifications`（wo）禁用通知 x 秒；0 秒表示取消计时器

＃＃＃ 仪表
由公用事业计量表提供。

- `actual` (ro) 实际值（数字）
- `actual-formatted` (ro) 如果已配置，则为状态的格式化实际值（使用 Loxone Config 中的“Unit”格式）
- `total` (ro) 总值（数字）
- `total-formatted` (ro) 如果已配置，则表示状态的格式化总值（使用 Loxone Config 中的“Unit”格式）
- `reset`（wo）向此状态写入任何值都会重置总值。

### 存在检测器
由人体感应器提供。

- `active` (ro) 存在状态
- `locked` (ro) 锁定状态
- `events` (ro) 事件数量
- `infoText` (ro) 存在检测器被锁定的原因

### 按钮
通过虚拟按钮输入提供。

- `active`（读写）按钮的当前状态
- `pulse`（wo）向此状态写入任何值只会模拟按钮被按下，持续时间非常短。

＃＃＃ 收音机
通过单选按钮（8x 和 16x）提供。

- `activeOutput`（读写）当前活动输出的 ID，如果没有活动输出，则为 0（“全部关闭”）。

＃＃＃ 偏僻的
由媒体控制器提供。

仅具备基本只读功能。

- `active` (ro) 如果 Miniserver 正在发送用于切换模式或开机的命令，则为 true
- `mode` (ro) 当前模式的键，如果未选择任何模式则为 0（“全部关闭”）
- `timeout`（只读）超时时间，单位为毫秒

＃＃＃ 滑块
由模拟虚拟输入提供。

- `value`（读写）滑块的当前值
- `value-formatted` (ro) 如果已配置，则为状态的格式化值（使用 Loxone Config 中的“Unit”格式）
- `error` (ro) 表示滑块的值无效

### 烟雾报警器
由公用事业计量表提供。

- `nextLevel` (ro) 下一个警报级别的 ID
- 1 = 静音
- 2 = 原声
- 3 = 光学
- 4 = 内部
- 5 = 外部
- 6 = 远程
- `nextLevelDelay` (ro) 下一关延迟时间（秒）
- `nextLevelDelayTotal` (ro) 下一关的总延迟时间（秒）
- `level` (ro) 当前报警级别的 ID
- 1 = 静音
- 2 = 原声
- 3 = 光学
- 4 = 内部
- 5 = 外部
- 6 = 远程
- `sensors` (ro) 传感器列表
- `acousticAlarm` (ro) 声控警报的状态，false 表示未激活，true 表示已激活
- `testAlarm` (ro) 测试警报是否处于活动状态
- `alarmCause` (ro) 警报原因：
- 1 = 仅烟雾探测器
- 2 = 仅水
- 3 = 烟和水
-4 = 仅温度
- 5 = 火和温度
- 6 = 温度和水
- 7 = 火、温度和水
- `startTime`（只读）闹钟开始的时间戳
- `timeServiceMode`（读写）延迟直到服务模式禁用
- `mute`（wo）向此状态写入任何值都会使警报器静音
- `quit` (wo) 向此状态写入任何值都会确认烟雾报警器已启动

＃＃＃ 转变
由虚拟输入开关提供。

- `active`（读写）开关的当前状态

### 文本状态
由“州”提供。

- `textAndIcon` (ro) 状态的当前值

### 定时开关
由楼梯间和多功能开关提供。

- `deactivationDelayTotal` (ro) 秒，表示使用定时器时输出将保持活动状态的时长。
- `deactivationDelay`（只读）输出停用前的倒计时
-0 表示输出已关闭
-1 = 输出始终开启
否则，它将从 deactivationDelayTotal 开始倒计时。
- 向此状态写入任何值都会永久启用该开关，而不会有停用延迟。
- 将任何值写入“off”（wo）状态都会禁用该开关。
- `pulse` (wo) 使开关发出脉冲：
- deactivationDelay = 0
- 将开始倒计时，从 deactivationDelayTotal 到 0。
- 如果这是楼梯间的开关：
- 停用延迟 = -1
- 无任何效果，将永久保持开启状态。
- deactivationDelay > 0
- 重新开始倒计时
- 如果这是一个多功能开关
- 关闭（从倒计时或永久开启状态）

### 追踪器
由楼梯间和多功能开关提供。

- `entries`（只读）从微型服务器返回的条目列表

### 上下模拟
通过虚拟输入（上下按钮）提供。

- `value`（读写）输入的当前值
- `value-formatted` (ro) 如果已配置，则为状态的格式化值（使用 Loxone Config 中的“Unit”格式）
- `error` (ro) 表示滑块的值无效

### 值选择器
数值选择。

- `value` (rw) 当前值
- `min` (ro) 当前最小值
- `max` (ro) 当前最大值
- `step` (ro) 当前步长值

### 窗口监视器
由公用事业计量表提供。

- `numOpen` (ro) 打开的窗户和门的数量
- `numClosed` (ro) 关闭的门窗数量
- `numTilted` (ro) 倾斜的窗户和门的数量
- `numOffline` (ro) 不可用的门窗数量
- `numLocked` (ro) 锁定的门窗数量
- `numUnlocked` (ro) 未上锁的门窗数量

所有这些状态的值之和等于被监控的门窗数量。具有两种状态的门窗始终计入“最差”状态。

每个受监控的门窗都会对应一个设备，该设备以索引作为其 ID，并带有给定的名称。它们具有以下状态：

- `closed` (ro) 窗户/门已关闭
- `tilted` (ro) 窗户/门是倾斜的。
- `open` (ro) 窗户/门已打开
- `locked` (ro) 窗户/门已锁
- `unlocked` (ro) 窗户/门已解锁

## 天气服务器
天气服务器信息以多通道设备的形式提供。

该设备名为`WeatherServer`。

它包含：

- “实际”频道，显示当前天气值
- 每个预测小时对应一个通道，称为“HourXX”，其中“XX”表示距离现在的小时数。

每个通道包含以下状态：

- `barometricPressure`：气压数值
- `barometricPressure-formatted`：格式化的气压值，带单位
- `dewPoint`：露点数值
- `dewPoint-formatted`：格式化的露点值，带单位
- `perceivedTemperature`：感知温度的数值值
- `perceivedTemperature-formatted`：格式化的感知温度值，带单位
- `precipitation`：数值降水量
- `precipitation-formatted`：格式化的降水量值，带单位
- `relativeHumidity`：相对湿度数值
- `relativeHumidity-formatted`：格式化的相对湿度值，带单位
- `solarRadiation`：太阳辐射值
- `temperature`：数值温度值
- `temperature-formatted`：格式化的温度值，带单位
- `timestamp`：数据的时间戳，格式为 `value.time`（JavaScript 时间）。
- `weatherType`：数值型天气类型枚举值
- `weatherType-text`：天气类型的文本表示
- `windDirection`: 风向值
- `windSpeed`：风速值
- `windSpeed-formatted`：格式化的风速值，带单位

## 不支持的控件类型
当 Loxone 添加新的控制类型时，这些类型通常不会立即得到此适配器的支持。

在这种情况下，控件名称前会显示“Unknown:”。例如：`Unknown: Wallbox`

这些控件将包含 Miniserver 报告的所有状态，但它们都是只读字符串。

如果您需要对新的控件类型提供更好的支持，请按照下一节中的步骤重新申请新功能。

**Sentry：**不支持的控件类型将通过 Sentry 报告给开发者。这样，您无需自行请求，即可在下一个版本中获得新的控件。

## 错误报告和功能请求
请使用 GitHub 代码库报告任何错误或请求新功能。

如果您需要使用不受支持的控件类型，请提供 ioBroker 错误日志中报告的控件名称，以及 ioBroker 对象树中该设备的完整原始内容：

“LightController”的日志文件示例：

![缺少 LightController 控制的日志](../../../en/adapterref/iobroker.loxone/doc/log-missing-control-type.png)

来自 ioBroker > 对象的原生值

![缺失的 LightController 控制的详细信息](../../../en/adapterref/iobroker.loxone/doc/details-missing-control-type.png)

＃＃ 合法的
本项目与 Loxone Electronics GmbH 公司没有任何直接或间接的关联。

Loxone 和 Miniserver 是 Loxone Electronics GmbH 的注册商标。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.0 (2025-12-11)

- (raintonr) Set correct min/max target on IRCv2 when in override (#528)
- (raintonr) Fix compatibility with js-controller 7.1 (fixes #730)
- (UncleSamSwiss) Recreate project structure using latest create-adapter
- (mpaulustsx) Basic AudioZoneV2 implementation (#430)

### 3.0.1 (2023-03-30)

- (raintonr) Added info statistics (#364)
- (raintonr) Added missing states from IRCv2 (#365)
- (raintonr) Added basic functionality for Remote (Media Controller)
- (raintonr) Fixed ack overwrites of fast changing states (#399) and general ack improvements
- (raintonr) Fix crash when state changes occur during Miniserver reboot or otherwise unavailable (#298)
- (raintonr) Release script and other dependency updates

### 3.0.0 (2021-12-29)

- (tdesmet) Changed to lxcommunicator (fixes #210)
- (UncleSamSwiss) Updated all dependencies

### 2.2.3 (2021-07-06)

- (UncleSamSwiss) Reduced number of Sentry reports for unsupported controls.

### 2.2.2 (2021-06-23)

- (UncleSamSwiss) Explicitly setting adapter tier to 2.
- (UncleSamSwiss) Added support for Daytimer (IOBROKER-LOXONE-1Z)
- (UncleSamSwiss) Added support for Radio (IOBROKER-LOXONE-21)
- (UncleSamSwiss) Added support for Fronius (IOBROKER-LOXONE-1Y)
- (UncleSamSwiss) Added support for IRCDaytimer (IOBROKER-LOXONE-27)
- (UncleSamSwiss) Added support for Hourcounter (IOBROKER-LOXONE-23)
- (UncleSamSwiss) Added support for InfoOnlyText (IOBROKER-LOXONE-29)
- (UncleSamSwiss) Fixed issues with Lumitech color pickers (#150)

### 2.2.1 (2021-05-18)

- (UncleSamSwiss) Fixed typo causing "Cannot read property 'off' of undefined" (IOBROKER-LOXONE-2R, #72)
- (UncleSamSwiss) Improved Sentry reporting for structure file

### 2.2.0 (2021-05-17)

- (UncleSamSwiss) Unknown/unsupported controls are now shown with their states as read-only strings
- (raintonr) Fixes for auto-position based on percentage (#76)
- (raintonr) Added support for IRoomControllerV2 (#22)
- (UncleSamSwiss) Added experimental support for EIBDimmer (#15)
- (UncleSamSwiss) Added support for ValueSelector (#36)
- (UncleSamSwiss) Added support for TextState (#73)
- (UncleSamSwiss) Added support for UpDownAnalog (#57)
- (UncleSamSwiss) Fixed some "State has wrong type" warnings (#99, #128)
- (UncleSamSwiss) Added support for Lumitech color picker (#44)
- (UncleSamSwiss) Weather server data can now be filtered (#131)
- (UncleSamSwiss) Added support for PresenceDetector (IOBROKER-LOXONE-1R)
- (UncleSamSwiss) Added support for AAL Smart Alarm (IOBROKER-LOXONE-1X)
- (UncleSamSwiss) Added support for AAL Emergency Button (IOBROKER-LOXONE-1W)
- (UncleSamSwiss) Added support for Paketsafe (IOBROKER-LOXONE-1P)

### 2.1.0 (2020-12-21)

- (raintonr) Fixed: activeMoods can get stuck/not sync properly; all events is now handled with a queue (#58, #61, #62)
- (raintonr) Added open/close buttons to Garage/Gate Control (#59, #60)
- (pinkit) Added support for virtual text inputs (#48)
- (UncleSamSwiss) Updated to the latest adapter template
- (UncleSamSwiss) Changed log level of "Currently unsupported control type" message to "info" (#65)

### 2.0.2 (2020-10-26)

- (UncleSamSwiss) Fixed color picker updates (#52)
- (UncleSamSwiss) TimedSwitch to have `on`/`off` instead of `active` (#53)
- (UncleSamSwiss) Cleaning illegal characters for room and function names (#54)

### 2.0.1 (2020-09-24)

- (UncleSamSwiss) Fixed percentage states always showing 0% (#49)
- (UncleSamSwiss) Fixed analog virtual inputs wouldn't set the value 0 from ioBroker (#47)
- (UncleSamSwiss) Added translations to package information.

### 2.0.0

- **BREAKING:** Since the password is now encrypted, you will need to enter the password again after an update to this version!
- (UncleSamSwiss) Updated to the latest development tools and changed to the TypeScript language

### 1.1.0

- (UncleSamSwiss) Added support for Miniserver Gen 2
- (sstroot) RGB for LightControllerV2
- (Apollon77) Updated CI Testing

### 1.0.0

- (UncleSamSwiss) Fixed issue that was resetting the custom settings and cloud smartName
- (alladdin) Fixed connection issues with Loxone Miniserver 10
- (UncleSamSwiss) Changed all write-only "switch"es to "button"s
- (UncleSamSwiss) Added support for AlarmClock control
- (Apollon77) Updated CI Testing

### 0.4.0

- (UncleSamSwiss) Improved support for Loxone Config 9
- (UncleSamSwiss) Changed all color choosers (i.e. color lights) to use RGB (previously HSV/HSL was completely wrong)

### 0.3.0

- (UncleSamSwiss) Control names only synchronized on the first time by default (configurable); users can change control names the way they want

### 0.2.1

- (UncleSamSwiss) Added support for Slider control

### 0.2.0

- (UncleSamSwiss) Added proper support for Alexa for the following controls: Alarm, AudioZone, Gate, Jalousie and LightController

### 0.1.1

- (UncleSamSwiss) Added support for synchronizing rooms and functions (categories) from Loxone Miniserver

### 0.1.0

- (UncleSamSwiss) Added support for many more controls including commands from ioBroker to Loxone Miniserver

### 0.0.3

- (Bluefox) Formatting, refactoring and Russian translations

### 0.0.2

- (UncleSamSwiss) Added creation of an empty device for all unsupported controls (helps figure out its configuration)

### 0.0.1

- (UncleSamSwiss) Initial version

## License

Copyright 2025 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.