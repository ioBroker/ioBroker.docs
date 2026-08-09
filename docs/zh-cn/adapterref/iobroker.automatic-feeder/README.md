---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.automatic-feeder/README.md
title: ioBroker.自动馈送器
hash: 4zYYV48p9P/TSfvM+Gnfat/sE2s+3g5iYzBG+KrsNys=
---
![标识](../../../en/adapterref/iobroker.automatic-feeder/admin/automatic-feeder.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.automatic-feeder.svg)
![下载](https://img.shields.io/npm/dm/iobroker.automatic-feeder.svg)
![安装数量](https://iobroker.live/badges/automatic-feeder-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/automatic-feeder-stable.svg)
![NPM](https://nodei.co/npm/iobroker.automatic-feeder.png?downloads=true)

# IoBroker.automatic-feeder
**测试：** ![测试与发布](https://github.com/ssbingo/ioBroker.automatic-feeder/workflows/Test%20and%20Release/badge.svg)

---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## IoBroker 的自动馈送适配器
这款适配器可以将任何现有的 ioBroker 开关（智能插座、继电器、GPIO 输出等）变成定时**自动喂食器**。它会在您设定的时间将输出开启指定秒数，并能考虑温度和昼夜循环，确保不会在错误的时间喂食。

本文档为完整使用手册。如果您之前从未使用过此适配器，请从头到尾阅读——**快速入门**部分将指导您在几分钟内完成首次喂食，其余部分将详细解释每项功能。

> 🇩🇪 德国广播：[doc/de/README.md](doc/de/README.md)·其他语言：请参阅底部的 > [文档](#documentation)。

---

＃＃ 目录
1. [适配器的功能](#1-what-the-adapter-does)
2. [要求](#2-要求)
3. [安装](#3-安装)
4. [快速入门](#4-quick-start--your-first-feeding)
5. [设置页面详情](#5-the-settings-page-in-detail)
6. [对象/数据点](#6-对象--数据点)
7. [示例/配方](#7-examples--recipes)
8. [Telegram 通知](#8-telegram-notifications)
9. [故障排除和常见问题解答](#9-troubleshooting--faq)
10. [日志记录和调试](#10-logging--debugging)
11. [动态喂养 — 背景和来源](#11-dynamic-feeding--background--sources)

---

1. 适配器的功能
“喂食”过程很简单：**打开输出端口 → 等待一段可配置的秒数 → 再次关闭输出端口**。对于改装后的喂食器，在这几秒钟内，运转的电机就会将食物分配出去。

该适配器最多可管理 5 台交换机，每台交换机完全独立，并拥有以其名称命名的专属配置选项卡。您可以为每台交换机单独设置：

* 喂食时间——可以是固定时间（例如 08:00 和 18:00），也可以是间隔一段时间。

在一定时间窗口内（例如，从 08:00 到 18:00 之间每隔 60 分钟）；

* 输出持续时间（以秒为单位）
* 当水温或气温过低/过高时，是否停止喂食；
* **是否将喂食时间限制在天文日窗口（日出/日落，每次切换）**

偏移量（来自系统、共享位置或每个交换机位置）；

* **是否需要监督**开关（检查其是否真正打开和关闭），以及（可选）

发送一条关于结果的**Telegram**消息；

* **是否减少或暂停**冬季喂食——可选择与

Telegram 会在活动开始和结束时发送提醒；

* **是否自动调整**间隔和比例以适应水/空气温度

（**动态喂料**，Q10 型号）

* 当溶解氧（O₂）过低时，是否停止进食；
* **最多可暂停喂食 3 次**（绝对的日期时间段，例如隔离期

补货）并在每次补货的开始和结束时发送**Telegram**消息；

* 一个**主暂停开关**（*立即暂停喂食*），可立即暂停**所有**喂食

每次拨动开关，都会显示一条 **Telegram** 消息，直到你再次将其关闭。

您也可以随时**手动**触发喂食——从适配器的设置页面（带有可自由选择持续时间的按钮）或从数据点（例如 VIS 视图中的按钮）触发。

该适配器可选配**自动喂食继电器板**（一个带有三个定时按钮和独立网页界面的ESP32芯片）。您可以**针对每个开关**单独决定是否使用该继电器板；在常规设置中为某个开关启用该继电器板后，该开关将新增一个**继电器**选项卡，您可以在其中设置继电器板的网络地址、测试连接，并直接通过适配器配置其三个定时按钮（S1-S3）的喂食时间。

重要提示：适配器本身不会创建交换机。它**控制 ioBroker 系统中已存在的对象**。您需要在配置中选择该对象。

---

2. 要求
| 您需要 | 详情 |
|----------|---------|
| **ioBroker**，需满足以下最低版本要求：**admin 版本 ≥ 8.0.0**、**js-controller 版本 ≥ 6.0.11** 和 **Node.js 版本 ≥ 22**。配置页面使用 React 19 构建，与 admin 8 使用的版本相同。 |
| **开关对象** | 任何可写入的 ioBroker 状态，用于打开/关闭您的馈线——例如智能插头（`shelly.0.…`、`sonoff.0.…`、`zigbee.0.…`）、继电器、脚本变量。 |
| *（可选）* **地理坐标** | 用于计算每个交换机的**天文窗口**的日出/日落时间。仅当交换机使用该窗口时才需要；取自 ioBroker 系统设置、共享位置或为每个交换机单独配置。 |
| *（可选）* 温度对象 | 包含空气和/或水温度的现有状态，用于温度锁定或动态供水。在开关选项卡上为每个开关分配。 |
| *（可选）* Telegram 实例 | 如果您需要推送通知，则需要配置并运行官方的 `telegram` 适配器。 |
| *(可选)* Telegram 实例 | 如果您需要推送通知，则需要配置并运行官方的 `telegram` 适配器。 |
| ioBroker 主机需要互联网访问权限 | 仅用于配置中的地址搜索/映射。正常情况下，该主机可以离线运行。 |

---

3. 安装
1. 在 ioBroker **管理后台**，打开**适配器**选项卡。
2. 在列表中找到**自动喂食器**，然后点击**安装**。
3. 创建适配器的**实例**。
4. 打开实例设置（齿轮图标）——您应该会看到配置页面，其中包含：

**常规设置**选项卡。如果该选项卡为空，请参阅[故障排除](#9-troubleshooting--faq)。

---

4. 快速入门——您的第一次喂食
目标：立即进行一次 5 秒钟的切换馈电，以证明一切正常。

1. **打开自动喂食器实例的设置**。
2. 在“常规设置”选项卡上：
在“位置”下，保持选中“对所有交换机使用系统设置”选项（仅当

您稍后可以启用天文窗口）。您还可以选择共享位置或为每个交换机进行配置。

向下滚动到“开关”并单击“添加开关”。
* 给它起个**名字**（例如“锦鲤池”）。这个名字会成为它所在标签页的标题。
* 点击“切换对象”旁边的列表图标，然后选择要切换的状态。

电源适配器（例如您的智能插座）。请确保开关处于**激活**状态（左侧的复选框）。

3. **保存**（底部的磁盘/勾号）。此时会显示一个以您的交换机名称命名的新标签页。
4. 打开**切换标签页**。在顶部的**手动喂食**下方，设置持续时间（例如“5”）。

几秒钟后），然后点击“立即喂食”。输出应该会开启 5 秒钟，然后再次关闭。

5. 仍在“开关”选项卡中，在“喂食计划”下设置实际的喂食计划（例如，固定喂食）。

时间 08:00 和 18:00）以及 **喂食动作** 下的 **喂食持续时间**，然后 **保存**。

好了，适配器现在会自动供电。以下内容将详细解释各项选项。

---

## 5. 设置页面详情
配置界面包含一个“常规设置”选项卡，以及每个交换机一个选项卡（交换机命名后自动创建）。如果页面无法滚动，请拖动窗口放大或使用右侧的滚动条——所有部分均可访问。

### 5.1 常规设置选项卡
#### 位置（天文窗口）
该位置信息用于计算每个开关可启用的**天文喂食窗口**的日出/日落时间（请参阅开关选项卡上的“限制”）。仅当至少有一个开关使用该窗口时才需要此信息。共有三个选项：

* **所有交换机均使用系统设置** – 从 ioBroker 系统获取经纬度。

配置（如果已设置，建议进行此操作）。此处显示当前值。

* **所有开关共用一个位置** – 设置一个所有开关都使用的单一位置：
输入地址并按“搜索”。适配器会解析地址（通过 OpenStreetMap）。

    Nominatim）并放置一个标记。

* 或者**点击地图** / **拖动标记** 到确切位置。
* 也可以直接输入纬度/经度；地图随后显示。
* **每个交换机单独配置位置** – 每个交换机定义自己的位置

它有自己的标签页（当喂食站（例如池塘）位于不同地点时非常有用）。

地址搜索在适配器后端运行，因此**实例必须正在运行**。

地图瓦片和搜索功能需要访问互联网。

**日出/日落偏移量是按交换机配置的**（在*限制*下），计算出的时间按交换机发布为`status.sunrise` / `status.sunset`，每晚自动重新计算。

#### 开关
饲料槽列表（最多 5 个）。每个饲料槽条目：

* **启用**（复选框）– 仅对启用的交换机进行调度。
* **名称** – 自由文本；将成为交换机的选项卡标题和对象树中的通道名称。
* **切换对象** – 要控制的现有 ioBroker 状态。使用列表图标浏览，或

清除十字架。

使用“添加开关”按钮创建另一个开关（最多 5 个），使用垃圾桶图标删除一个开关。删除开关也会删除其数据点。

* **此开关使用自动喂料继电器板**（每个开关单独拨动）——仅打开此开关

对于使用可选自动喂料继电器板 (ESP32) 的喂料站的开关，开启后，该开关会获得一个额外的 **继电器** 选项卡（参见 [5.3](#53-relay-board-tab-optional)）。

### 5.2 切换标签页
每个已配置的交换机都有自己的选项卡，选项卡标题为其名称。选项卡包含以下几个部分。

#### 手动喂料
* **手动喂食持续时间（秒）** – 按钮使用的持续时间。
* **立即喂食** – 立即触发喂食，持续时间指定。适用于测试或……

额外部分。（是否忽略区块取决于“限制”中的“手动触发忽略所有区块”选项。）

* 实例必须正在运行且配置已**保存**，按钮才能正常工作。

#### 喂食时间表
选择**一种**模式：

* **固定时间** – 时钟时间列表（`HH:mm`）。您可以添加任意数量的固定时间；程序会自动运行。

每天都要查看它们。例如：`08:00` 和 `18:00`。

* **时间窗口内的间隔** – 在时间窗口内重复喂食：
* **窗口开始时间** / **窗口结束时间** – 例如 08:00 至 18:00。
* **间隔（分钟）** – 例如 60 → 在 08:00、09:00、… 直至时间窗口结束时喂食，

    每天。

如果启用了**天文窗口**（参见*限制*），则固定窗口的开始/结束时间将被日出/日落窗口替换并隐藏；此时，时间间隔将在日出和日落之间运行。下一个计划时间始终显示在`status.nextFeeding`数据点中。

#### 喂食动作
* **喂食持续时间（秒）** – 在预定喂食期间输出保持开启的时间。
* **开启值** / **关闭值** – 写入开关对象的值。默认值为 `true`。

以及 `false`，适用于大多数智能插头/继电器。如果您的设备需要数字或文本，请在此处输入例如 `1` / `0` 或 `ON` / `OFF`。

#### 温度和氧气来源
每个开关（喂食站）都有**自己的**传感器——不同的池塘/水箱可以使用不同的物体：

* **气温** – 勾选方框并选择该站点气温所在的州。
* **水温** – 勾选方框并选择该站点水温所在的州。

这是主要的**摄食区**传感器（将其放置在鱼实际进食的地方，而不是水面）。

* **深水温度** – *可选的第二个*水温传感器（例如，位于底部附近）。仅显示一次

主水质传感器已启用。使用两个传感器时，您可以选择动态投喂的**组合模式**：*投喂区（仅限浅水区）* [默认]、*两者平均值*、*最冷层* 或 *季节性*（当水位达到或超过阈值时使用浅水传感器，否则使用深水传感器）。温度**模块**始终使用两个水层中**温度最低的**水层。第二个传感器仅在**深而未混合的池塘**中才有用（运行中的水泵会混合水并消除任何分层现象）——请参阅*动态投喂——背景和来源*。

* **氧气 (O₂)** – 勾选方框并选择含有溶解氧的状态。

只有数值状态才有意义。当前值与此开关的 `status.airTemperature`、`status.waterTemperature`、`status.waterTemperatureDeep`、`status.oxygen`（以及 `status.waterStratification` = 浅层 - 深层）数据点相对应。阈值设置在下方（*温度阻塞*），温度也驱动*动态进给*。

#### 温度阻隔
仅显示您上方启用的温度源（*温度和氧气源*）。每个开关可执行以下操作：

* **按水温封锁** – 设置 *低于封锁* 和/或 *高于封锁* (°C)。
* **受气温影响** – 空气也是如此。

如果当前温度超出允许范围，则跳过此次喂料，并将原因写入`status.blockReason`。（如果温度值未知，则该源不会被阻塞。）

＃＃＃＃ 限制
* **将喂食时间限制在天文日窗口期（日出/日落 + 偏移时间）** – 开启时，

喂食时间仅限于根据此开关位置计算出的白天时间段。对于“间隔喂食”和“动态喂食”模式，此时间段将取代固定的开始/结束时间；对于“固定时间喂食”模式，它起到昼夜守卫的作用（跳过时间段）。启用后，您可以设置：

* **日出后分钟数** – 从日出后*分钟数开始（默认为 0）。
* **日落前分钟数** – 在日落前*分钟数停止（默认为 0）。
* **此开关的位置** – 仅当常规*位置*设置为*个性化*时显示：

请为此交换机选择“使用系统设置”或“定义特定位置”（地址搜索 + 地图）。计算出的时间显示在 `status.sunrise` / `status.sunset` 中。

* **手动触发会忽略所有模块** – 开启后，手动按钮和 `feedNow` /

`feedFor` 即使温度/窗口块处于活动状态，数据点也会继续传输。

#### 动态喂养
可选：使用 Q10 模型根据温度调整喂食**间隔和持续时间**（代谢率大约每升高 10°C 翻倍）。需要连接温度源；固定时间将被设定的温度区间内的间隔所取代。

* **启用/来源** – 打开此选项并选择水温或空气温度。当配置第二个（深层）水温传感器时，此处使用的水温将根据所选的组合模式（参见*温度和氧气来源*）从两个层中合并。
* **参考值 / Q10** – 基本间隔和持续时间适用于参考温度（例如 20 °C）；Q10 通常为 2–2.5（代谢率每升高 10 °C 大约翻倍 — 参见 *动态喂养 — 背景和来源*）。
* **间隔/持续时间（基准值、最小值、最大值）** – 计算出的间隔（分钟）和持续时间（秒）的范围。**基准间隔和最大间隔必须大于 0**，否则无法安排喂食。
* **平均窗口/滞后** – 移动平均值（例如 24 小时）可以平滑尖峰；滞后避免因微小变化而重新计划。

当前值分别显示在 `status.dynamicAvgTemperature`、`status.dynamicRate`、`status.dynamicIntervalMin` 和 `status.dynamicDurationSec` 中。可选的**氧气 (O₂)**源可在溶解氧低于阈值时阻止投喂。冬季暂停优先于动态投喂。

如果启用了动态喂料，但无法计算出有效的喂料间隔（基本间隔或最大间隔为 0，或者时间窗口无效），则不会安排任何喂料：`status.nextFeeding` 为空，`status.blockReason` 显示提示。请设置大于 0 的基本间隔和最大间隔。

#### 冬季暂停
每个开关都可以定义一个循环的**冬季暂停**（季节性的，以 `MM-DD` 日期表示，每年重复，可能会延续到新年）。

* **启用冬季暂停功能** – 打开暂停功能。
* **冬季开始/冬季结束** – 从日历中选择日期和月份（显示为 dd.mm），例如 01.11 至 15.03。
* **模式** – 在暂停期间，可以**暂停喂食**，**缩短**喂食间隔**，或在设定的时间**每天喂食一次**；**冬季喂食持续时间**另行规定。
* **提醒（Telegram）** – 每日提醒会在开始前几天和结束前几天发送（最后一次会在当天发送），时间由您设置。需要一个 Telegram 实例（见下文）。

当前状态显示在 `status.winterActive` 数据点中。暂停结束后，进料将自动恢复。

#### 喂食暂停
**立即暂停喂食（主开关）。** 本节顶部的单个**开/关开关**可让您**立即且无限期地**暂停**该开关的所有喂食——它会覆盖下方基于时间的暂停设置以及**所有**喂食模式（固定时间、间隔、动态喂食、冬季暂停）。再次将其**关闭**后，喂食将恢复到之前的配置；无需更改任何其他设置。切换此开关会发送一条**Telegram**消息（*开* / *关*）。典型用途：在不更改任何计划的情况下，进行临时中断（例如用药、维护、水处理）。可通过设置页面**以及通过 `settings.pauseNow` 从 VIS/脚本**进行编辑，其实时状态显示在 `status.pauseManual` 中。

主开关下方，每个开关最多可设置**3个一次性喂食暂停**，允许您设定绝对的日期和时间段，在此期间**完全停止喂食**（优先级高于任何喂食模式）。典型用途：**补货后的隔离期**，此时新鱼暂时不应喂食。

* **暂停 1 / 2 / 3** – 勾选启用，然后选择**开始**和**结束**（日期+时间，显示为`DD.MM.YYYY HH:mm`），例如`15.07.2026 08:00`到`22.07.2026 18:00`。
* 当处于已启用的暂停状态时，喂食会停止，并在暂停结束后自动恢复。
* 每次暂停的**开始**和**结束**时都会发送一条**Telegram**消息（需要Telegram实例，详见下文）。如果适配器在暂停已生效时启动，则只会发送*结束*消息。
* 可通过设置页面**和 VIS/scripts**中的`settings.*`状态进行编辑（例如`settings.pause1Start`）。

当前状态显示在 `status.pauseActive` 和 `status.pauseActiveUntil` 中（主开关也驱动 `status.pauseActive`）。

#### 切换监管
切换完成后，适配器可以验证开关**确实**达到了开和关状态，并针对每次喂食报告以下三种结果之一：

| 结果 | 含义 | 信息 |
|--------|---------|---------|
| ✅ 成功 | 开关按预期开启和关闭 | “喂食已触发，持续 x 秒。” |
| ❌ 开启失败 | 开关从未确认开启状态 | “无法进行供电。请检查开关！” |
| ❌ 关闭失败 | 它已开启，但未再次关闭 | “故障：喂食器未关闭！” |

> 消息以配置的 ioBroker 系统语言（默认为英语）发送。

* **确认开关确实可以打开和关闭** – 启用监控功能。
* **验证超时（秒）** – 等待确认的时间。
* **验证尝试次数** – 在报告故障之前执行的交错复检次数（默认值为 3）。每次尝试还会读取当前状态，因此延迟的状态反馈（例如 Homematic 无线电）不再触发误报故障。

**重要提示：**只有当开关**报告其真实状态**时，监控功能才能正常工作，也就是说，目标对象会被更新为`ack=true`（这通常是具有状态反馈的智能插座/继电器的典型状态）。

如果使用一个无人响应的普通辅助布尔值，则始终会报告故障——在这种情况下，请关闭此开关的监控功能。

结果还存储在 `status.lastResult`（文本）和 `status.error`（布尔值）数据点中，以便您可以对其做出反应（例如，触发您自己的通知）。

#### Telegram 通知
将监管消息发送到 Telegram – **每个交换机单独配置**：

* **消息语言** – 此交换机所有外发消息的语言（Telegram、Sayit 等）。

信息推送公告）：*系统语言*（ioBroker 系统语言）或指定语言。状态数据点不受影响。

* **Telegram 实例** – 选择一个已安装的 `telegram.*` 实例（或选择 *None* 表示无实例）。

（禁用此开关的 Telegram 功能）。如果未安装任何 Telegram，该字段会显示相关信息。

* **Telegram 收件人（可选）** – Telegram 中配置的特定用户/聊天名称

适配器；留空则发送给所有已配置的收件人。

* **复选框** – 选择要发送的消息：喂食成功、喂食失败和/或

断路故障。

**冬季暂停提醒**（如果启用，请参阅*冬季暂停*）会发送到同一个 Telegram 实例，与这些监督复选框无关。

有关完整设置，请参阅 [Telegram 通知](#8-telegram-notifications)。

#### Sayit 通知
通过 **Sayit（文本转语音）**实例朗读相同的监管消息——**每个交换机**单独配置，独立于 Telegram（两者可以同时激活）：

* **Sayit 实例** – 选择一个已安装的 `sayit.*` 实例（或选择 *None* 以禁用 Sayit）。

对于此交换机）。如果没有安装，现场会提示您。

* **音量（0-100，可选）** – 此开关的说话音量；留空则使用

Sayit 实例自身的默认值。

* **测试提示** – 在实例选择旁边：通过语音朗读一段简短的测试文本

选中实例，即可立即检查音频输出，无需等待喂食。

* **复选框** – 选择要显示的消息：喂食成功、喂食失败和/或

关机故障（与 Telegram 的三个故障相同，但在这里是单独选择的）。

语音文本使用上方 Telegram 部分中选择的**消息语言**。

#### 喂养通知
通过 Telegram 和/或 Sayit 提前在可配置的时间宣布即将进行的喂食：

* **提前通知喂食时间** – 开启通知功能。
* **提前时间（分钟）** – 通知发送时间比喂食时间早多少（例如 `5`）。
* **通过 Telegram 公告** / **通过 Sayit 公告** – 用于公告的渠道

（每个实例都需要按照上述方式进行配置）。

喂食通知会与每次喂食同时进行。如果在通知时间，喂食因**夜间、温度、氧气或其他原因被**阻止或暂停**（例如暂停喂食），则会跳过通知，因此不会出现无法进行的喂食的情况。手动喂食（点击“立即喂食”按钮 / `feedFor`）没有提前通知，也不会发出通知。

### 5.3 继电器板接线片（可选）
仅当开关的“**此开关使用自动喂食继电器板**”开关在常规设置中启用时（参见[5.1](#switches)），此选项卡才会显示。一个继电器板对应一个开关（喂食站）。该继电器板是一个 ESP32 开发板，带有三个定时器按钮（S1–S3）以及其自身的 Web 管理界面，可通过网络**端口 80**访问。适配器仅**配置**继电器板并**显示其状态**，它不会触发继电器板的喂食（按钮由继电器板本身操作）。

> **注意：**自动喂料继电器板是作为一个**独立项目**并行开发的。

> 即使没有该继电器板，适配器也能正常工作——继电器板是一个可选的便捷附加组件。由于继电器板是独立开发的，因此其某些细节可能会独立于适配器而发生变化。

* **板卡地址（IP 或 mDNS 主机）** – 例如 `192.168.1.50` 或 `feeder.local`。固定 IP 地址是

最可靠；mDNS（`.local`）仅在您的主机系统能够解析它时才有效。允许使用 `:port` 后缀，但通常不需要（默认值为 `80`）。

* **测试连接和获取时间** – 连接电路板一次。绿色 *已连接* 芯片亮起，表示连接成功。

电路板的主机/IP/固件确认连接正常；然后从电路板读取三次按键操作时间并显示在下方字段中。红色“未连接”芯片表示错误。

* **按键进给时间（秒）** – 每个按键 **S1**、**S2** 和 **S3** 的进给时间

（1-600 秒）。由于这些设置**也可以在开发板自身的网页界面上进行编辑**，因此请务必先*获取*这些设置，然后再进行调整。

* **节省写板时间** – 将三个值写到写板。
* **重启开发板** – 通过 ESP32 的 API (`POST /api/reboot`) 重启 ESP32。确认后即可执行。

提示板卡重启，离线几秒钟后自动恢复。

在标签页底部，“系统概览”显示了连接测试成功后（“测试连接和获取时间”按钮）电路板的实时系统数据：固件版本和构建、主机名、IP 地址、Wi-Fi 网络、信号强度 (dBm)、MAC 地址、运行时间、可用内存和上次重置原因（以纯文本显示，例如“软件”）。

该连接也会反映到对象树中，并每 60 秒刷新一次——请参阅 [第6节](#6-objects--data-points) 中的 `relay.*` 数据点。

---

## 6. 对象/数据点
> **注意：**所有时间戳数据点均以**系统本地时区**显示（格式为`DD.MM.YYYY HH:MM:SS`，例如`01.07.2026 16:20:00`）。对于可视化界面和脚本，每个时间戳还有一个以`…Ts`结尾的**数字对应值**（Unix 时间，单位为**毫秒**，`0` 表示无）——非常适合倒计时和时间条，无需任何字符串解析，且与显示格式无关。

适配器在其命名空间（`automatic-feeder.<instance>.`）下创建以下状态。

**全球的**

| 数据点 | 类型 | 含义 |
|------------|------|---------|
| `info.connection` | 布尔值（只读） | 适配器正在运行且配置有效。 |

**每个交换机，在 `switches.<id>.` 下**（`<id>` 是一个内部 ID，类似于 `sw-0`）

开关正下方是手动触发器和两个子通道：

* **`status`** (`switches.<id>.status.*`) – 下面列出的只读状态数据点。
* **`settings`** (`switches.<id>.settings.*`) – 此开关的**可编辑**镜像

配置。在此处写入新值（通过 VIS 或脚本）会更改配置并重启实例以使更改生效。一些派生字段是只读的（例如 `winterWindow`）。

* **`继电器`** (`switches.<id>.relay.*`) – 仅当此开关使用继电器板时存在；

表格末尾列出了只读继电器板状态数据点。

| 数据点 | 类型 | 含义 |
|------------|------|---------|
| `feedNow` | 布尔值（读写） | 写入 `true` 以触发手动进料。 |
| `status.feedingActive` | 布尔值 (ro) | 当前正在喂食。 |
| `status.feedingEndsTs` | 数字（只读） | **运行** 馈送结束时间，以 Unix 时间（毫秒）表示（`0` = 不馈送）—— 用于 VIS 中的实时运行时倒计时（例如 15 → 0 秒）。 |
| `status.feedingDurationSec` | 数字 (ro) | **运行中**喂食的总持续时间（秒）（`0` = 不喂食）— 允许 VIS 小部件在倒计时旁边绘制精确的进度环。 |
| `status.lastFeeding` | 字符串（只读） | 上次喂食的时间戳。 |
| `status.lastFeedingTs` | 编号（只读） | 上次喂食时间（以毫秒为单位，单位为 Unix 时间戳）（`0` = 尚未喂食）。 |
| `status.nextFeeding` | 字符串（只读） | 下次计划喂食的时间戳。 |
| `status.nextFeedingTs` | 编号（只读） | 下次计划喂食时间，以 Unix 时间戳（毫秒）表示（`0` = 无计划喂食）。 |
| `status.blocked` | 布尔值 (只读) | 最后一次尝试被阻止。 |
| `status.blockReason` | string (ro) | 系统语言中说明被屏蔽的原因（夜晚/温度/氧气）。 |
| `status.blockReasonCode` | 字符串（只读） | 阻塞原因，以**稳定的机器可读代码**表示（例如 `blockNight`、`blockWaterBelow`、`blockPauseManual`；空值表示未阻塞）——用于 VIS 中的图标/颜色逻辑，与编程语言无关。 |
| `status.lastResult` | 字符串（只读） | 上次喂食尝试的结果文本。 |
| `status.error` | 布尔值 (ro) | 上次尝试出现切换故障。 |
| `status.winterActive` | 布尔值 (ro) | 冬季暂停功能当前处于激活状态。 |
| `status.winterLastStartReminder` | 字符串（只读） | 上次发送“冬季开始”提醒的日期。 |
| `status.winterLastEndReminder` | string (ro) | 上次发送“冬季结束”提醒的日期。 |
| `status.pauseManual` | 布尔值 (只读) | 手动主暂停（*立即暂停进料* / `settings.pauseNow`）已开启。 |
| `status.pauseActive` | 布尔值 (ro) | 当前已启用一次性喂食暂停。 |
| `status.pauseActiveUntil` | 字符串 (ro) | 当前喂食暂停的结束（如果没有暂停则为空）。 |
| `status.pauseActiveUntilTs` | 数字（只读） | 活动喂食暂停结束时间，以 Unix 时间戳（毫秒）表示（`0` = 无）。 |
| `status.dynamicAvgTemperature` | 数值 (ro) | 动态喂入使用的平均温度。 |
| `status.dynamicRate` | 数量 (ro) | 动态喂料当前应用的 Q10 速率系数。 |
| `status.dynamicIntervalMin` | 数字 (ro) | 当前计算的动态间隔（分钟）。 |
| `status.dynamicDurationSec` | 数字 (ro) | 当前计算的动态持续时间（秒）。 |
| `status.airTemperature` | 数字 (ro) | 此开关自身的空气温度源值。 |
| `status.waterTemperature` | 数字 (ro) | 此开关自身的水温源值（喂食区/浅水传感器）。 |
| `status.waterTemperatureDeep` | 数字 (ro) | 此开关的可选深水温度传感器值。 |
| `status.waterStratification` | 数值 (ro) | 浅层与深层温差（仅限使用两个水传感器时）。 |
| `status.oxygen` | 编号 (ro) | 此开关自身的溶解氧源值。 |
| `status.sunrise` / `status.sunset` | string (ro) | 此交换机位置的计算日出/日落时间（天文窗口）。 |
| `status.sunriseTs` / `status.sunsetTs` | 数字（只读） | 日出/日落时间，以毫秒为单位的 Unix 时间 — 例如，用于 VIS 中的日期进度条。 |
| `relay.connected` | 布尔值 (只读) | 为此交换机配置的继电器板是否可达（仅当此交换机使用继电器板时）。 |
| `relay.info` | 字符串（只读） | 上次成功轮询的继电器板标识（主机/IP/固件）。 |
| `relay.active` | 布尔值（只读） | 继电器板的定时器当前正在运行。 |
| `relay.remaining` | 数字 (ro) | 继电器板运行计时器剩余的秒数。 |
| `relay.remaining` | 数字（只读） | 继电器板运行计时器剩余的秒数。 |

您可以在 VIS、脚本或其他适配器中使用这些——例如，在仪表板上显示 `status.nextFeeding`，或对 `status.error = true` 做出反应以发送您自己的警报。

---

7. 示例/食谱
锦鲤池，每天两次，仅在水温适宜时进行。

* 模式 *固定时间* → `08:00`、`18:00`；持续时间 `6` 秒。
在开关选项卡上的“温度和氧气源”下，启用“水温”并选择

传感器；然后 *按水温阻止* → *低于以下温度阻止* `8` °C（冷时不进食）。

在“限制”设置下，启用“将喂食限制在天文日窗口内”，这样就不会有任何影响。

天黑后喂食。

**鸟舍，仅在白天（天文观测窗口期）开放**

* 模式 *时间窗口内的间隔* → 间隔 `90` 分钟；持续时间 `3` 秒。
* 在*限制条件*下，启用天文窗口，偏移量为`30` / `30` 分钟 → 馈送

运行时间为日出后 30 分钟至日落前 30 分钟，并根据季节自动调整。

锦鲤池，温度适应型（动态投喂）

* 在开关选项卡上的“温度和氧气源”下，启用“水温”并选择传感器。
然后打开*动态喂食*，启用它，数据源为*水温*。
* 参考温度 20 °C，Q10 2.2，基准间隔 60 分钟（最小 30 分钟，最大 480 分钟），基准持续时间 5 秒

（最小值`2`，最大值`15`）。体温较高时，进食频率更高，进食量也略有增加；体温较低时，进食量则减少。

池塘进入冬季休眠期

在开关选项卡中打开“冬季暂停”，启用它，并将“冬季开始”设置为 `01.11`，“冬季结束”设置为 `01.11`。

`15.03`，模式*暂停进给*。

* （可选）勾选提醒，以便在开始/结束前几天收到 Telegram 通知。

补货后隔离（暂停喂食）

* 在切换选项卡中打开 *喂食暂停*，勾选 *暂停 1* 并将 *开始时间* 设置为 `15.07.2026 08:00`，

*结束* `22.07.2026 18:00` → 该时间段内完全不喂食，然后自动恢复。

* 如果配置了 Telegram 实例，您将在暂停开始和结束时收到一条消息。

立即停止喂食（主开关）

在开关选项卡中打开“喂食暂停”，然后启用“立即暂停喂食”——或者写入“true”

`automatic-feeder.0.switches.sw-0.settings.pauseNow` 来自 VIS 开关。

* 所有喂食操作立即停止（覆盖所有模式），直到您再次将其关闭；每个开关

发送 Telegram 消息。`status.pauseManual` 显示实时状态。

**手动从VIS按钮添加额外部分**

* 在 VIS 中添加一个按钮，将 `true` 写入 `automatic-feeder.0.switches.sw-0.feedNow`。
或者使用滑块/数字字段来写入**秒数**

`automatic-feeder.0.switches.sw-0.feedFor` → **仅持续一次**（无配置更改，无重启；之后状态重置为 `0`）。

* 可选设置 *手动触发忽略所有块*，使其始终馈送。

---

8. Telegram 通知
1. 安装并配置 **Telegram** 适配器（使用 @BotFather 创建一个机器人，输入

使用令牌（开始与你的机器人聊天）。确保 Telegram 实例正在运行。

2. 在自动推送器的**切换标签页**中，打开**Telegram通知**：
* 从下拉菜单中选择您的 **Telegram 实例**（例如 `telegram.0`）。
* （可选）输入**收件人**（Telegram 适配器中显示的用户/聊天名称）；留空

空无一物，通知所有人。

* 勾选您想要的消息：*喂食成功*、*喂食失败*、*关机故障*。
3. 保存。从现在开始，选定的监督结果将推送至 Telegram（以“@Telegram”为前缀）。

交换机名称）。这需要为该交换机启用*交换机监控*功能。

4. **冬季暂停提醒**使用同一个 Telegram 实例和收件人。它们是

在“冬季暂停”部分进行控制（开始/结束前的天数和提醒时间），并且**不需要**监督即可启用。

---

9. 故障排除和常见问题解答
设置页面显示空白。请使用 **Ctrl+Shift+R** 刷新浏览器（管理员可能缓存了旧页面）。如果问题仍然存在，请重启实例并重新打开设置页面。

**新图标/更改未显示。** 浏览器缓存 - 使用 **Ctrl+Shift+R** 强制刷新。

**没有数据被读取。** 请按顺序检查：交换机是否处于**活动状态**；是否已选择**交换机对象**；**计划**是否有效（`status.nextFeeding` 显示时间）；是否未被**阻塞**（查看`status.blocked` / `status.blockReason`）；**天文窗口**是否包含该时间；将实例的**日志级别**设置为`debug`并查看日志。

**它从不在夜间喂食，尽管我希望它这样做。** 请禁用该开关的“限制喂食时间至天文日窗口”功能，或调整其日出/日落偏移量。如果天文窗口功能已启用，但开关没有有效的坐标，则其窗口保护功能将保持非活动状态，并记录一条警告信息。

**监控始终报告故障。** 您的交换机对象可能未报告其真实状态 (`ack=true`)。请使用具有状态反馈的交换机，或禁用该交换机的*交换机监控*。

动态投料不会改变任何内容。请确保在“温度和氧气源”切换选项卡中启用所选的温度源（水或空气），并且该温度源能够提供数值。重启后，移动平均值仍在填充，因此会从基值开始。请观察 `status.dynamicAvgTemperature` 和 `status.dynamicIntervalMin`。

**动态喂料已启用，但未喂料（`status.nextFeeding` 为空）。**基本间隔或最大间隔为 0（或时间窗口无效），因此无法计算间隔——`status.blockReason` 会显示提示。请设置大于 0 的基本间隔和最大间隔（以及有效的时间窗口）。注意：如果将最小间隔和最大间隔都设置为 0，则结果也为 0。

**即使不是冬季，也没有任何作物被喂食（或者本应暂停喂食却仍在喂食）。** 请检查“冬季暂停”日期（`Winter start` / `Winter end`，格式为 dd.mm）及其模式。`status.winterActive` 数据点显示暂停功能当前是否处于激活状态。

地址搜索显示实例必须正在运行。启动自动馈送实例——地理编码在后端运行。

**Telegram 消息无法送达。** 是否在切换选项卡中选择了 Telegram 实例？Telegram 适配器是否已配置并正在运行？是否至少勾选了一种消息类型，并且是否启用了“切换监控”？

---

10. 日志记录和调试
适配器会记录标准的 ioBroker 日志级别。要查看详细信息，请将实例日志级别（实例 → automatic-feeder.x → 日志级别）提高到 **debug** 或 **silly**：

* **错误** – 需要注意的故障（例如，写入交换机失败）。
* **警告** – 配置错误（没有坐标，无效的日程安排……）。
* **信息** – 里程碑（启动、已执行或已阻止的馈送、手动触发）。
* **调试** – 详细流程（调度决策、温度更新、地理编码、开关）

值，验证已确认/超时）。

* **silly** – 非常详细的跟踪（每个计时器、每个块检查、每个状态更改）。

---

## 11. 动态喂养——背景与来源
鱼类（锦鲤、金鱼、鲤鱼）是**变温动物（外温动物）**：它们的代谢率随水温变化。一般来说，代谢率大约**每升高10°C就翻倍**，这恰好是该适配器使用的**Q10系数**（通常为2-3）——因此，在水温较高时增加喂食频率和喂食量，在水温较低时减少喂食量，在生理上是合理的。

**实用温度指南（锦鲤/池塘鱼类）：**

* **低于 ~4–5 °C** – 不要喂食（使用 *冬季暂停*）。
* **~4–10 °C** – 几乎不活动；很少进食，或者根本不进食，易消化的（小麦胚芽）食物。
* **~10–15 °C** – 进食减少；免疫系统仍然虚弱（~12 °C）。
* **~15–25 °C** – 最佳生长范围，充分供养。
* **高于 ~28 °C** – 溶解的**氧**成为限制因素 → O₂ 块在这里很有用。

**测量位置及为何需要第二个传感器：**真正重要的温度是鱼实际栖息的水温（**觅食区**），*而不是*水面温度（水面温度可能相差几度）。在有水泵循环的池塘或浅水池塘中，一个位置合适的传感器就足够了。只有在**深水且未混合的池塘**中才会出现水体分层：高于 4°C 的温暖水位于上层（下层较冷）；低于 4°C 时，水体会翻转，在底部附近形成一个温度约为 4°C 的避难区。在这种情况下，**第二个（深水）传感器**就显得尤为重要——为了安全起见（让鱼儿在最冷的水层觅食），为了根据季节切换浅水/深水区，以及为了使水体分层现象更加明显（`status.waterStratification`）。对于大多数池塘来说，第二个传感器并非必需。

**参考资料/延伸阅读：**

* Volkoff H. & Rønnestad I. (2020): *温度对鱼类摄食和消化过程的影响*。Temperature 7(4):307–320。<https://pubmed.ncbi.nlm.nih.gov/33251280/>
*锦鲤协会 – *水温与锦鲤* <https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi>
*锦鲤国际组织 (K.O.I.) – *锦鲤池塘冷水背后的科学原理* <https://koiorganisationinternational.org/koi-articles/science-behind-cold-water-koi-ponds>
*池塘资讯网 – *锦鲤喂养指南* <https://pondinformer.com/koi-feeding-guide/>

这些数据仅供锦鲤/池塘鱼类参考，不能替代您亲自观察鱼只的实际情况。请根据您的鱼种和饲养环境调整参考温度、Q10值、限制值和阈值。

## 文档
- 🇩🇪 [德国文档](doc/de/README.md)
- 🇷🇺 [Документация на русском](doc/ru/README.md)
- 🇳🇱 [荷兰文档](doc/nl/README.md)
- 🇫🇷 [法语文档](doc/fr/README.md)
- 🇮🇹 [意大利文档](doc/it/README.md)
- 🇪🇸 [西班牙语文档](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [葡萄牙语文档](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.10.0 (2026-08-05)
* (ssbingo) **Admin UI now runs on React 19** — the configuration page uses the same React version that ioBroker **admin 8** ships; `@iobroker/adapter-react-v5` updated to 8.3.2
* (ssbingo) **Raised the minimum requirements**: **admin ≥ 8.0.0**, **js-controller ≥ 6.0.11** and **Node.js ≥ 22**
* (ssbingo) `@mui/material` and `@mui/icons-material` are now explicit direct dependencies. They stay on **MUI 6** for now because `adapter-react-v5` still requires it (it imports `Grid2`, removed in MUI 7+); the move to **MUI 9** follows automatically once the library supports it
* (ssbingo) No changes to feeding, notifications or data points — this release only modernizes the admin build and baseline versions

### 1.9.9 (2026-07-17)
* (ssbingo) The relay tab's **System overview** now also shows the **firmware release version** (`ver`, e.g. `0.0.15`) in addition to the firmware build date
* (ssbingo) The **last reset reason** is now spelled out in plain, localized words — the board sends a short code (`sw`, `poweron`, `wdt`, `brownout`, `deepsleep`, `panic`, …), which the adapter shows as e.g. “Software”, “Power-on”, “Watchdog”

### 1.9.8 (2026-07-17)
* (ssbingo) Fix (state role): `switches.<id>.relay.connected` now uses the role **`indicator.reachable`** instead of `indicator.connected` — the relay board is a physical LAN device (ESP32), not an adapter instance, and the ioBroker stateroles spec reserves `indicator.connected` for instances. Objects created by older versions are corrected automatically on start

### 1.9.7 (2026-07-15)
* (ssbingo) Maintenance: re-aligns the published version with the current GitHub state (which contained a CI-only change keeping the deploy action on the floating `@v1` major tag, per repochecker S3044). No functional or shipped-code changes

### 1.9.6 (2026-07-15)
* (ssbingo) Maintenance: updated a development dependency (`@types/node` → 22.20.1) and pinned the CI deploy action to a fixed version (`ioBroker/testing-action-deploy@v1.5.1`); Dependabot now keeps `pdfmake` on the 0.2.x line (0.3.x has an incompatible server API). No functional changes

### 1.9.5 (2026-07-15)
* (ssbingo) New comprehensive **German PDF handbook** ([doc/de/Handbuch.pdf](doc/de/Handbuch.pdf)) with a modern, colourful design — generated from `tools/build-handbook.js` (`npm run doc:handbook`) and linked from the German documentation
* (ssbingo) Added a note in the relay-board section (all 11 languages) that the **Automatic-Feeder relay board is developed in parallel as a separate project**

### 1.9.4 (2026-07-15)
* (ssbingo) The feeding announcement now also states the **approximate feeding duration** — e.g. "The next feeding starts in 5 minutes. The feeding will take about 8 seconds." The duration is the effective one (static/winter/dynamic), localized with correct singular/plural in every language
* (ssbingo) The **Sayit volume** is now set shortly before the spoken text (small delay) so it reliably applies to that announcement instead of the previous one

### 1.9.3 (2026-07-15)
* (ssbingo) Fix: the **Sayit volume** is now written to the instance's own `tts.volume` state (only if it exists) instead of a `tts.text` prefix — the volume actually takes effect now, and the announcement **test no longer hangs** when a volume is set. An empty volume keeps the Sayit instance's own volume

### 1.9.2 (2026-07-15)
* (ssbingo) New **Test announcement** button next to the Sayit instance selection — speaks a short test text through the selected instance so you can check the audio output without waiting for a feeding
* (ssbingo) The feeding announcement now uses the **correct singular/plural** form of "minutes" for each language (e.g. "1 minute" vs "5 minutes"; Russian/Polish/Ukrainian 1 / 2–4 / 5+ forms), via the language's CLDR plural rules

### 1.9.1 (2026-07-15)
* (ssbingo) The feeding announcement now uses the final text **"The next feeding starts in X minutes"** (localized in the switch's selected message language; `X` = the configured lead time)

---

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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