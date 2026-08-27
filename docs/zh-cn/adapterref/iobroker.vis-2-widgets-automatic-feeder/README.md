---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-automatic-feeder/README.md
title: ioBroker.vis-2-widgets-automatic-feeder
hash: MshJEBjiUIwpJYyFivX/vVTGny2PlVTmkSeOkF3j9XI=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/admin/vis-2-widgets-automatic-feeder.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-2-widgets-automatic-feeder.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-automatic-feeder.svg)
![安装数量](https://iobroker.live/badges/vis-2-widgets-automatic-feeder-installed.svg)
![执照](https://img.shields.io/npm/l/iobroker.vis-2-widgets-automatic-feeder.svg)

# IoBroker.vis-2-widgets-automatic-feeder
---

<p align="center"><a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="请我喝杯咖啡" /></a></p>

---

## 自动送料器的 vis-2 小部件
适用于 [ioBroker.自动馈送器](https://github.com/ssbingo/ioBroker.automatic-feeder) 适配器的现成 **vis-2 仪表盘小部件**——用于鱼类/锦鲤/池塘喂食器的拖放式卡片。**无需查找对象 ID，也无需编写 HTML 代码**：您只需从下拉菜单中**通过其友好名称**选择喂食器实例和喂食器开关，每个小部件即可自动读取和控制相应的数据点。

此软件包包含**六个组件**，它们共同构成一个完整的喂食器控制面板，采用深色、适合平板电脑的卡片式设计，并带有可更改的强调色。其中四个组件仅*显示*数据；另外两个组件还允许您*执行操作*（触发一次性喂食或暂停喂食）。

> 这只是**可视化层**。所有日程安排、温度模型、日出日落逻辑、暂停和通知都位于独立的**ioBroker.automatic-feeder**适配器中；这些小部件是该适配器的实时视图和远程控制。（在更广泛的智能池塘系列中，同系列的*pond-aeration*适配器可以例如在喂食器喂食时暂停曝气——但这需要在那里配置，而不是在这里。）

本文档是一份完整的使用手册。如果您之前从未使用过这些组件，请从头到尾阅读：**快速入门**部分将帮助您在大约一分钟内创建一张可用的卡片，其余部分将详细解释每个组件和每个选项。

> 🇩🇪 德国广播：[doc/de/README.md](doc/de/README.md)·其他语言：请参阅底部的 > [文档](#documentation)。

---

＃＃ 目录
1. [什么是 vis-2 小部件？](#1-what-are-vis-2-widgets)
2. [你将获得什么](#2-what-you-get)
3. [要求](#3-requirements)
4. [安装](#4-安装)
5. [快速入门](#5-quick-start)
6. [小部件详情](#6-the-widgets-in-detail)
- [6.1 FeederStatus](#61-feederstatus)
- [6.2 FeedControl](#62-feedcontrol)
- [6.3 环境](#63-environment)
- [6.4 动态喂食](#64-dynamicfeeding)
- [6.5赛季横幅](#65-seasonbanner)
   - [6.6 AnimatedFeeder](#66-animatedfeeder)
7. [配置和绑定](#7-configuration--bindings)
8. [每个组件使用哪些数据点](#8-which-data-points-each-widget-uses)
9. [开发](#9-开发)
10. [故障排除和常见问题解答](#10-troubleshooting--faq)

---

## 1. 什么是 vis-2 小部件？
**vis-2** 是 ioBroker 的现代化可视化工具（经典 *vis 1* 的升级版）。您可以通过将**小部件**（按钮、仪表盘、卡片）拖放到画布上，并将它们连接到您的设备状态来构建仪表板（“视图”）。

通常情况下，你需要手动将组件连接到状态：查找对象 ID（例如 `automatic-feeder.0.switches.sw-0.status.feedingActive`）并将其输入到绑定字段中。这对于单个值来说没问题，但一个好的馈送卡需要十几个组件协同工作。

像这样的**组件集**就能解决这个问题：它是一个插件，为特定适配器提供**专用组件**。每个组件都已预先知道需要哪些状态。你只需告诉它显示**哪个馈送器**——其他一切都已为你配置好。因此，你无需手动绑定十几个参数，只需**点击两次**（实例 + 切换）即可获得一张完整的卡片。

---

2. 你将获得什么
六个组件。每个组件都是一个独立的卡片；您可以单独使用一个，也可以将它们组合成一个完整的仪表板。

| 小部件 | 它显示什么/做什么 | 写入什么？ |
|--------|----------------------|---------|
| **喂食器状态** | 主状态卡：动态喂食器图形（喂食时风扇旋转）、实时运行倒计时、下次喂食倒计时（含时间和模式）、上次喂食及其结果、天文（日出/日落）窗口，以及（如果窗口被遮挡）遮挡原因。 | 否 |
| **喂食控制** | 一个带有两步确认的“立即喂食”按钮、一个喂食量（时长）滑块和一个主“暂停喂食”开关。 | 是 |
| **环境** | 水温（浅水和深水）、热分层Δ、氧气读数（仅当存在传感器时）以及带有实时“当前”标记的日出日落时间条。 | 否 |
| **动态喂料** | 适配器的 **Q10** 温度模型概览：平均温度、速率系数、间隔和份量，以及驱动它的传感器（水/空气）。 | 无 |
| **赛季横幅** | 一条单一的、颜色编码的状态栏，显示当前最重要的状态（手动暂停 → 定时暂停 → 冬季暂停 → 自动激活）。 | 否 |
| **动态喂食器** | 画布上的大型动态喂食器：喂食时食物颗粒会落下，倒计时环会逐渐填满；其他时间则显示暂停符号（手动/定时/冬季）。**点击即可触发一次性喂食。** | 是 |

这两个“写入”小部件（**FeedControl**、**AnimatedFeeder**）只有在*您*点击/轻触时才会写入内容——它们不会自行改变。

在 vis-2 小部件面板中，整个组件集显示在名为“自动送料器”的组下。

---

3. 要求
- 已安装 vis-2（现代版 vis）的 ioBroker。这些是 vis-2 小部件，在经典版 vis 中无法使用。

视觉1。

- 已安装并配置了 **ioBroker.automatic-feeder** 适配器，该适配器至少需要连接一个交换机（一个“交换机”是指一个

适配器配置中的喂食器；它有一个易于理解的名称，例如 *KoiTeich Ponton*）。推荐的适配器版本：

- **v1.4.0 或更高版本** — 需要此版本才能使用数字时间戳、`blockReasonCode` 和 `feedFor` 命令。

小部件依赖于。

- **v1.5.0 或更高版本** — 推荐，此外，还可在 FeederStatus 中启用实时**运行时倒计时**。

（`status.feedingEndsTs` 数据点）。

- **v1.6.0 或更高版本** — 推荐用于 **AnimatedFeeder** 中的精确倒计时环（

`status.feedingDurationSec` 数据点）。

您无需手动输入对象 ID：小部件仅读取和写入所选开关自身的 `status.*` 和 `settings.*` 数据点，这些数据点由您选择的实例 + 开关解析而来。

---

4. 安装
1. 在 ioBroker 中安装 **ioBroker.vis-2-widgets-automatic-feeder**——安装完成后，从管理后台的 **适配器** 列表中进行安装。

可以从存储库下载，也可以直接从 GitHub / npm 下载。它会安装为 *visualization-widgets* 适配器（`onlyWWW`，不会创建运行实例）。

2. 打开 **vis-2**。组件面板（左侧，编辑模式）中会出现一个新的组件组 **自动送料器**。

   模式）。

3. 将它的任何小部件拖到视图上——请参阅下面的[快速入门](#5-quick-start)。

> **每次更新后：**运行`iobroker upload vis-2-widgets-automatic-feeder`，然后重启vis-2（安装适配器已将vis-2标记为需要重启），并在浏览器中强制刷新（Ctrl+F5），以便运行程序获取新的组件包。参见[故障排除](#10-troubleshooting--faq)。

---

5. 快速入门
1. 在 vis-2 中，切换到**编辑模式**，打开一个视图，然后从**自动喂食器**中拖动**喂食器状态**小部件。

将其分组。

2. 选择该组件后，打开右侧的“属性”面板，并在“通用”字段中填写两个字段。

   团体：

- **喂食器实例** — 选择您的 `automatic-feeder` 实例（通常为 `0`；这是一个标准实例选择器）。
- **交换机** — 从下拉菜单中选择您的馈线。它会按**易记名称**列出您已配置的交换机。

（例如 *KoiTeich Ponton*），直接从适配器自身的配置中读取。

3. 卡片会立即显示实时数据。对任何其他小部件重复此操作——实例/开关选择功能完全相同。

六个人的情况都一样。

仅此而已：无需对象 ID、无需手动绑定、无需脚本。在两个字段都设置好之前，小部件会显示友好的提示信息“请在小部件设置中选择馈线开关通道。”，而不是显示数据。

---

## 6. 小部件详解
每个组件都共享相同的两个必需设置——**喂食器实例**和**开关**——它们位于**通用**属性组（参见[配置和绑定](#7-configuration--bindings)）。每个组件的外观选项列于下方。所有屏幕截图均显示来自真实锦鲤池喂食器的实时数据。

### 6.1 喂料器状态
![FeederStatus 小部件](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/feederstatus.png)

主卡片。从上到下依次显示：

- 状态指示牌：**就绪**（绿色）或**已阻止**（琥珀色）。“已阻止”表示适配器当前无权……

喂食（夜间、温度过低、氧气过低、暂停……）。

- 一个**动画喂食器图形**。喂食运行时，风扇会旋转，并且——使用适配器 v1.5.0+——会显示一个**运行时图形**。

倒计时**（例如 `5 s`）出现在旁边，并倒计时至当前喂食结束。

- **下次喂奶**：长时间倒计时（*大约还有27分钟，或1小时05分），准确时间，以及

模式（启用动态喂养时为*动态间隔*，否则为*计划*）。

- **最后一次喂食**，带有✓（成功，绿色）或✗（错误，红色）标记以及适配器的**结果**文本。
- 用于昼夜逻辑的**天文窗口**（日出 - 日落）。
- 当被阻止时，会显示一行额外的**原因**，其中包含人类可读的阻止原因（以琥珀色显示）。

卡片每秒重新渲染一次，因此倒计时会一直显示。

**外观选项**（*外观*组）：

| 选项 | 类型 | 默认值 | 含义 |
|--------|------|---------|---------|
| **强调色** | 颜色 | `#33c1cf` | 卡片和图形的高亮颜色。 |
| **运行计时器位置** | 选择（右/左） | 右 | 在图形左侧或右侧显示运行喂食倒计时。 |
| **动画送料器图形** | 复选框 | 开启 | 打开/关闭旋转风扇动画。 |
| **无卡片背景** | 复选框 | 关闭 | 渲染时不显示卡片背景（以便将其放置在您自己的面板上）。 |

默认小部件尺寸：320 × 340 像素。

### 6.2 进料控制
![FeedControl 小部件](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/feedcontrol.png)

控制卡：

- **立即喂食** — 一个**两步操作**的按钮。第一次点击会*启用*喂食功能，标签会变为*确认：N s ?*；

第二次点击会触发一次选定持续时间的喂食，并短暂显示“已触发✓”。如果您在约4秒内未确认，它将自动解除。

- **份量（手动）** — 一个滑块，用于设置喂食持续时间（以秒为单位），从 `1` 到 *最大持续时间*（默认值）。

从第 5 秒开始）。

- **暂停喂食** — 一个主开关，按下此开关后，将立即暂停该开关的所有喂食，直到您将其拨动为止。

退后。它会写入适配器的 `settings.pauseNow`，这将覆盖所有模式和所有基于时间的暂停。

**外观选项**（*外观*组）：

| 选项 | 类型 | 默认值 | 含义 |
|--------|------|---------|---------|
| **强调色** | 颜色 | `#33c1cf` | 高亮颜色。 |
| **最大持续时间（秒）** | 数字（1–3600） | 30 | 滑块上限。 |
| **显示暂停开关** | 复选框 | 开启 | 显示/隐藏主“暂停喂食”开关。 |
| **无卡片背景** | 复选框 | 关闭 | 渲染时不显示卡片背景。 |

默认小部件尺寸：300 × 240 像素。

该按钮通过适配器的 `feedFor` 命令（值为持续时间，单位为秒）写入一次性数据。它不会更改您的日程安排，也不会重启适配器。

### 6.3 环境
![环境组件](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/environment.png)

水/环境卡：

- **浅水区**和**深水区**温度（单位：摄氏度，四舍五入到小数点后一位）。如果您未设置深水区温度，则深水区温度将显示为“–”。

配置第二个更深层的传感器。

- 一张**分层**药片，显示两层之间的温差Δ（单位为K）。当两层温度降低时，药片会变成琥珀色。

相差超过**3K**。

- 氧气浓度指示条（单位：mg/l）——仅当配置了氧气传感器时显示，当氧气浓度下降时变为红色

低于配置的最小值（`settings.o2Min`）。

- 从日出 (☀) 到日落 (☾) 的**日条**，带有当前时间的实时标记（每分钟重新计算一次）。

**外观选项**（*外观*组）：

| 选项 | 类型 | 默认值 | 含义 |
|--------|------|---------|---------|
| **强调色** | 颜色 | `#33c1cf` | 高亮颜色。 |
| **无卡片背景** | 复选框 | 关闭 | 渲染时不显示卡片背景。 |

默认小部件尺寸：320 × 220 像素。

### 6.4 动态喂料
![动态馈送小部件](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/dynamicfeeding.png)

显示适配器用于根据水温调节供水温度的 **Q10 温度模型**。共四块图块：

- **平均温度** — 该模型所依据的平均温度（°C）。
- **速率 (Q10)** — 所得速率因子（相对于参考温度的×）。
- **间隔** — 以分钟为单位的喂食间隔。
- **份量** — 由此产生的喂食持续时间（以秒为单位）。

标题栏中的“来源”字段显示模型是由“水（浅）”传感器还是“空气”传感器驱动（`settings.dynamicSource`）。如果此开关的动态投喂功能已关闭，则卡片上会显示提示“此开关的动态投喂功能已关闭。”，而不是显示图块。

**外观选项**（*外观*组）：

| 选项 | 类型 | 默认值 | 含义 |
|--------|------|---------|---------|
| **强调色** | 颜色 | `#33c1cf` | 平均温度图块的高亮颜色。 |
| **无卡片背景** | 复选框 | 关闭 | 渲染时不显示卡片背景。 |

默认小部件尺寸：460 × 150 像素。

### 6.5 赛季横幅
![赛季横幅小部件](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/seasonbanner.png)

一条单一的、颜色编码的状态栏——非常适合放在视图顶部。它始终显示**最重要的**当前状态，优先级顺序如下：

1. **手动暂停**（红色）— 主暂停开关（`status.pauseManual`）已开启。
2. **基于时间的暂停**（琥珀色）— 已配置的暂停窗口处于活动状态 (`status.pauseActive`)，并显示其结束时间

附加（`status.pauseActiveUntil`）。

3. **冬季暂停**（蓝色）— 冬季窗口处于活动状态（`status.winterActive`）。
4. **自动激活**（绿色）— 喂食无阻，日程照常运行。

除了两个常见设置（实例 + 开关）之外，此小部件**没有**任何外观选项。

默认小部件尺寸：460 × 44 像素。

### 6.6 动画喂食器
![喂食时的动画喂食器小部件](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/animatedfeeder.png)

一个大型的动态喂食器，渲染在 HTML `<canvas>` 上——它是池塘仪表盘的视觉中心。它会对开关做出实时反应：

- **喂食时：**食物颗粒从出料口落下，**倒计时环**显示剩余秒数。

当适配器提供 `status.feedingDurationSec` (**v1.6.0+**) 时，环是精确的；对于较旧的适配器，总持续时间是从开始喂食的那一刻算起的。

- **暂停状态**，以带有红色十字的圆盘符号显示，优先级与赛季横幅相同：

**手动暂停**（手）→ **基于时间的暂停**（时钟）→ **冬季暂停**（雪花）。

- **空闲状态：** 仅显示喂食器，并可选显示“点击喂食”提示。

![动画喂食器空闲和暂停状态](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/animatedfeeder-states.png)

**轻触喂食：**轻触小部件一次即可启动喂食（*确认：N 秒？*），再次轻触即可触发一次性喂食，喂食时长为设定值（通过 `feedFor`）。暂停或喂食进行中时，轻触操作将被忽略。此功能可通过“启用轻触喂食”选项关闭。（当操作系统请求减少动画效果时，饲料颗粒下落的动画效果会自动降低。）

**选项** — AnimatedFeeder 具有三个属性组：

*行为：*

| 选项 | 类型 | 默认值 | 含义 |
|--------|------|---------|---------|
| **启用点击喂食** | 复选框 | 开启 | 允许通过点击小部件触发喂食。 |
| **喂食持续时间（秒）** | 数字（1–3600） | 5 | 持续时间由点击操作记录。 |
| **动画喂食器图形** | 复选框 | 开启 | 开启/关闭饲料颗粒下落动画。 |

*外貌：*

| 选项 | 类型 | 默认值 | 含义 |
|--------|------|---------|---------|
| **强调色** | 颜色 | `#33c1cf` | 倒计时环和提示的颜色。 |
| **图像（可选）** | 图像 | *（内置）* | 自定义进纸器图像；留空则使用内置图像。自定义图像的宽高比可能不同。 |
| **无卡片背景** | 复选框 | 关闭 | 渲染时不显示卡片背景。 |

*几何形状* — 位置以小部件的**%**表示，因此当您使用自己的图像时，可以对齐动画：

| 选项 | 类型 | 默认值 | 范围 |
|--------|------|---------|-------|
| **颗粒出口 X (%)** | 数量 | 50 | 0–100 |
| **颗粒出口 Y (%)** | 数量 | 80 | 0–100 |
| **倒计时 X (%)** | 数字 | 50 | 0–100 |
| **倒计时 Y (%)** | 数字 | 44 | 0–100 |
| **倒计时百分比 (%)** | 数字 | 20 | 5–45 |

默认小部件尺寸：300 × 440 像素。

---

7. 配置和绑定
每个组件在**通用**属性组中都有相同的两个必需设置：

![小部件属性：实例和按名称切换](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/config-attributes.png)

- **喂食器实例** — 从下拉菜单中选择您的 `automatic-feeder` 实例（通常为 `0`）。接受以下任一选项：

普通数字（`0`）或完整形式（`automatic-feeder.0`）。

- **交换机** — 从下拉列表中选择馈线，该列表按交换机的友好名称列出已配置的交换机（例如，交换机名称为“交换机名称”）。

*KoiTeich Ponton*），而不是通过内部 ID。列表是从所选实例的配置中读取的（`system.adapter.automatic-feeder.<instance>` → `native.switches[]`）。

该组件会根据这两个值构建开关通道 `automatic-feeder.<instance>.switches.<switch>`，并订阅所需的相应子状态——您无需手动输入绑定。在两个字段都设置好之前，组件会显示“选择馈线开关通道…”提示，而不是显示数据。

可选的外观设置位于每个控件的“外观”组中（对于 AnimatedFeeder 控件，还位于“行为”和“几何”组中）；请参见上文各控件的说明。控件通用选项：

| 选项 | 小部件 | 含义 |
|--------|---------|---------|
| **强调色** | 除“季节横幅”外的所有颜色 | 高亮颜色（默认为池塘蓝 `#33c1cf`）。 |
| **无卡片背景** | 除赛季横幅外 | 渲染小部件时不显示卡片背景，例如，将其放置在自定义面板上。 |

---

## 8. 每个组件使用哪些数据点
为了完全透明——这些小部件订阅了开关通道`automatic-feeder.<instance>.switches.<switch>.…`，并且仅使用这些相关数据点：

| 小部件 | 阅读 | 写入 |
|--------|-------|--------|
| **喂食器状态** | `status.feedingActive`, `status.feedingEndsTs`, `status.nextFeeding`, `status.nextFeedingTs`, `status.lastFeeding`, `status.lastResult`, `status.blocked`, `status.blockReasonCode`, `status.blockReason`, `status.error`, `status.sunrise`, `status.sunset`, `settings.dynamicEnabled` | — |
| **环境** | `status.waterTemperature`, `status.waterTemperatureDeep`, `status.waterStratification`, `status.oxygen`, `status.sunrise`, `status.sunset`, `status.sunriseTs`, `status.sunsetTs`, `settings.o2Min` | — |
| **动态馈送** | `settings.dynamicEnabled`, `settings.dynamicSource`, `status.dynamicAvgTemperature`, `status.dynamicRate`, `status.dynamicIntervalMin`, `status.dynamicDurationSec` | — |
| **赛季横幅** | `status.winterActive`, `status.pauseActive`, `status.pauseActiveUntil`, `status.pauseManual`, `settings.winterWindow` | — |
| **动画喂食器** | `status.feedingActive`, `status.feedingEndsTs`, `status.feedingDurationSec`, `status.winterActive`, `status.pauseManual`, `status.pauseActive` | `feedFor` (点击喂食，数值 = 秒) |
| **动画喂食器** | `status.feedingActive`、`status.feedingEndsTs`、`status.feedingDurationSec`、`status.winterActive`、`status.pauseManual`、`status.pauseActive` | `feedFor`（点击喂食，值 = 秒） |

有关每个数据点的确切含义，请参阅 [ioBroker.automatic-feeder 文档](https://github.com/ssbingo/ioBroker.automatic-feeder)。

---

9. 发展
这些组件使用 **TypeScript + React 18** 编写（属性编辑器使用 MUI），并与 **Vite** 和 **模块联合** 打包成一个单独的 `customWidgets.js`，vis-2 在运行时加载该模块。源代码位于 [`src-widgets-ts/src/`](src-widgets-ts/src/)：

| 文件 | 小部件/角色 |
|------|---------------|
| `FeederWidgetBase.tsx` | 四个组件（Environment、DynamicFeeding、SeasonBanner、AnimatedFeeder）共享的基类：解析切换通道、订阅子状态、保存状态值，并提供读/写/格式化辅助函数。FeederStatus 和 FeedControl 直接继承 `window.visRxWidget` 并执行各自的订阅/种子操作。 |
| `FeederStatus.tsx`, `FeedControl.tsx`, `Environment.tsx`, `DynamicFeeding.tsx`, `SeasonBanner.tsx`, `AnimatedFeeder.tsx` | 这六个小部件。 |
| `styles.ts` | 用于卡片设计的注入 CSS。 |
| `translations.ts` + `i18n/*.json` | 用户界面文本支持 11 种语言。 |
| `translations.ts` + `i18n/*.json` | 包含 11 种语言的 UI 文本。 |

该控件集在 [`io-package.json`](io-package.json) 下注册，属于 `common.visWidgets.vis2AutomaticFeeder`（组件 `FeederStatus`、`FeedControl`、`Environment`、`DynamicFeeding`、`SeasonBanner`、`AnimatedFeeder`）。

**构建和脚本**（从仓库根目录运行）：

```bash
npm run npm      # install root + src-widgets-ts dependencies
npm run build    # build the TypeScript widgets → widgets/vis-2-widgets-automatic-feeder/
npm run lint     # ESLint over src-widgets-ts
npm test         # @iobroker/testing package tests (mocha test/package)
```

`npm run build`运行`node tasks --typescript`，后者清理并构建`src-widgets-ts`（使用Vite），并将`customWidgets.js`（资源、图像和图标集）复制到`widgets/vis-2-widgets-automatic-feeder/`（发送给最终用户的文件夹；`main`指向其`customWidgets.js`）。版本发布使用`@alcalzone/release-script`（`npm run release-patch` / `-minor` / `-major`）进行，该步骤也会在提交之前运行构建。

---

10. 故障排除和常见问题解答
**小部件仅显示“选择馈线开关通道…” 。** 请同时设置两个**通用**字段（实例和开关）。开关下拉列表会根据所选实例自动填充，因此请先选择实例。

**交换机下拉菜单为空。** 所选的 `automatic-feeder` 实例尚未配置任何交换机，或者实例编号错误。请先在适配器中配置交换机。

**数值显示为`–`。** 请确保适配器版本为**v1.4.0 或更高版本**（运行时倒计时功能需要 v1.5.0 或更高版本）。旧版本无法提供组件所依赖的数字时间戳和命令数据点。“深水”磁贴会保持 `–` 状态，除非您配置了第二个更深的传感器；“O₂”磁贴默认隐藏，除非您配置了氧气传感器——这两项均属正常现象。

**运行时倒计时永远不会出现。** 它需要适配器 **v1.5.0+** (`status.feedingEndsTs`)，并且仅在*喂食实际运行时*显示。

**动画喂食器倒计时环并非完全成比例。** 精确的倒计时环需要适配器 **v1.6.0+** (`status.feedingDurationSec`)；使用旧版适配器时，倒计时环的持续时间是根据喂食开始时间估算的，因此倒计时环只是近似值。

**新增/更新的小部件未显示，或仅显示部分小部件。** 这通常是由于浏览器/运行器中的小部件包已过时造成的。运行 `iobroker upload vis-2-widgets-automatic-feeder`，重启 vis-2（或主机），然后强制刷新浏览器（Ctrl+F5）。

**这会取代适配器吗？** 不会。这些只是仪表盘小部件。所有日程安排、温度逻辑、暂停和通知都运行在 **ioBroker.automatic-feeder** 适配器中；这些小部件只是它的一个视图，也是它的一个远程控制点。

---

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
### 0.2.1 (2026-07-07)
* (ssbingo) Fixed **AnimatedFeeder** showing nothing in Firefox: the built-in feeder image now uses a base64 data URI (Firefox rejects the non-standard `;utf8,` form that Chrome tolerated) and the canvas 2D context is initialised from the `<canvas>` ref callback, so it binds reliably regardless of mount order. A failed or zero-size custom image can no longer blank the whole widget

### 0.2.0 (2026-07-07)
* (ssbingo) New sixth widget **AnimatedFeeder**: a large animated feeder (canvas) with falling pellets, a countdown ring and pause symbols (manual / time-based / winter); tap it to trigger a one-off feeding. The exact countdown ring uses the adapter's new `status.feedingDurationSec` (**automatic-feeder v1.6.0+**)
* (ssbingo) New stylized adapter and widget-set icon (feeder on a light grey tile)

### 0.1.0 (2026-07-07)
* (ssbingo) Fixed the adapter icon not showing in the ioBroker Developer Portal — `extIcon` and `readme` now point to the real repository instead of the template placeholder

### 0.0.5 (2026-07-06)
* (ssbingo) Internal: the package test now uses the standard `@iobroker/testing` test suite (`tests.packageFiles`) so the ioBroker adapter checker can verify it

### 0.0.4 (2026-07-06)
* (ssbingo) Internal/CI: adopted the ioBroker standard workflow actions (`ioBroker/testing-action-check`, `ioBroker/testing-action-deploy`) — still token-less npm trusted publishing (OIDC) with provenance — and the standard Dependabot auto-merge workflow

### 0.0.3 (2026-07-06)
* (ssbingo) Full user manual with screenshots of every widget, plus translations in all 11 languages (`doc/<lang>/README.md`)
* (ssbingo) Repository and CI hardening: added a `check-and-lint` job, committed the root `package-lock.json`, replaced the broken Dependabot auto-merge with the GitHub-native flow, moved Dependabot to a distributed cron schedule and added `.vscode` JSON-schema settings; first release published with provenance via the npm Trusted Publisher pipeline

### 0.0.2 (2026-07-06)
* (ssbingo) All five widgets now register correctly; widget preview uses the feeder icon instead of the template demo image; the adapter installs straight from GitHub (removed the puppeteer-based demo test)

### 0.0.1 (2026-07-06)
* (ssbingo) Initial version with five widgets — FeederStatus, FeedControl, Environment, DynamicFeeding and SeasonBanner — for the ioBroker.automatic-feeder adapter, configurable by feeder instance and switch name

---

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 ssbingo <silvio.sternitzke@googlemail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.