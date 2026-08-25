---
BADGE-Number of Installations: http://iobroker.live/badges/shuttercontrol-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.shuttercontrol.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.shuttercontrol.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.shuttercontrol/badge.svg
BADGE-License: https://img.shields.io/github/license/simatec/ioBroker.shuttercontrol?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shuttercontrol/README.md
title: 快门控制文档和说明
hash: m6dC/wouAopBKat1lqclsfJ69mcEKJfP7zcrFAlZibE=
---
![标识](../../../en/adapterref/iobroker.shuttercontrol/img/shuttercontrol.png)

![安装数量](http://iobroker.live/badges/shuttercontrol-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.shuttercontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.shuttercontrol.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.shuttercontrol/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.shuttercontrol?style=flat)
![捐](https://img.shields.io/badge/donate-paypal-blue?style=flat)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# 快门控制文档和说明
![测试与发布](https://github.com/simatec/ioBroker.shuttercontrol/workflows/Test%20and%20Release/badge.svg)

---

## 支持适配器开发
如果您喜欢这款适配器，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

基础知识
>:grey_exclamation: 本手册适用于稳定版 1.6.2 及更高版本 :grey_exclamation:

Shuttercontrol 是一款适配器，可对卷帘、百叶窗或遮阳篷进行非常全面的控制，包括自动遮光和夜间变暗功能。

>:point_right: 为了简单起见，这里只提到卷帘门。

控制方面有大量可调参数，例如：

* 三个不同的全局定时器，例如分别用于客厅、卧室和儿童区，
* 可为每个卷帘单独设置各种与太阳位置相关的参数。

可以为每个卷帘门单独设置，

* 用于门窗传感器的触发器，可实现单独级别的锁定保护或自动开启。

当门窗打开时，各个部件会随之打开。

* 可根据例如以下情况调整各种可调参数进行着色：

室内温度、室外温度、亮度、热传感器或类似设备

* 考虑太阳的位置，以便只对实际处于阴影中的房间进行调暗。

被照亮。

所有配置数据点都已预设好示例，因此安装并输入快门 ID 后，适配器即可快速投入使用。

然后通过进一步配置来适应个人需求。

百叶窗控制只能通过位置参数（例如 LEVEL）来控制执行器，其值分别为 0 到 100 或 0 到 255。百叶窗或卷帘的定时必须由执行器控制。

由执行器控制。如果卷帘执行器分别提供“高度”和“叶片角度”两个对象，则可以使用两个卷帘来控制它们。

可以与两个参数相同的百叶窗对象一起使用。

使用。

---

＃＃ 安装
该适配器位于 ioBroker 的“稳定”存储库中。在“适配器”选项卡中，选择“shuttercontrol”，然后通过 (+) 创建 shuttercontrol 适配器的实例。

＃＃ 配置
创建实例后，配置窗口会自动打开，其中包含“主要设置”、“时间设置”和“附加设置”选项卡。

>:point_right: 应先编辑 [时间设置](#time-settings) 和 [额外设置](#time-settings)](#extra-settings) 选项卡，即在通过主设置中的铅笔添加快门之前。

---

### 主要设置
![主要的](../../../en/adapterref/iobroker.shuttercontrol/img/main.png) --- >:point_right: 可以通过右上角的问号访问 GitHub 上的文档 (7)。

#### 保存或上传适配器配置
点击右上角向下箭头 (9) 将适配器配置保存为 .json 文件。

点击向上箭头 (8) 上传现有的 .json 格式适配器配置。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

### 时间设置
此处进行基本时间或天文设置，这些设置稍后将用于每个快门的 [快门设置](#shutter-settings) 中。

以及每个快门的 [快门设置](#shutter-settings) 中。

>:heavy_exclamation_mark: 百叶窗控制系统始终在**周末**的设定时间关闭百叶窗。

并且始终在**工作日**的设定时间关闭百叶窗。 :heavy_exclamation_mark:

![时间设置](../../../en/adapterref/iobroker.shuttercontrol/img/timeSettings.png)

#### 客厅、卧室和儿童区的设置
各项设置可通过下拉菜单打开。以下描述以起居室为例，但同样适用于所有区域。

适用于所有区域。

当然，这种分类并非一定要用于起居区、睡眠区或儿童区。

儿童区，而是可以将建筑物内的三个区域划分为不同的卷帘门开启时间。

**生活区自动控制类型**

下拉菜单用于选择：

* **仅限居住区域使用时间：**

*卷帘门只能定时操作。

* 体验日出日落的时光。

*卷帘门根据日出日落时间进行控制，但不会早于最早时间升起，也不会晚于最晚时间落下。

* **黄金时段生活区：**

*类似于日出日落，但以“黄金时段”的开始和结束为参考。

**工作日关闭百叶窗：** *工作日通常的关灯时间*。

**一周内最早升起百叶窗的时间：** *这是一周内升起百叶窗的最早时间。

**本周最晚升起时间：** *这是本周卷帘门升起的最晚时间*。

**卷帘门交错升起的延迟时间（秒）：** *此范围内各个卷帘门升起之间的距离，例如，为了避免无线电干扰或给人一种手动移动的错觉。

**周末卷帘门关闭时间：** *周末和**公共假日的惯例遮光时间。

**周末最早升起百叶窗的时间：** *这是周末和公共假日最早升起百叶窗的时间。

**周末最晚升起时间：** *此时卷帘门在周末**以及**公共假期最晚升起。

>:point_right: 如果在太阳尚未越过某个位置时卷帘门永远不能升起，则此时间必须设置为太阳在该位置的最晚时间（21.12.）。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

### 其他设置
![配置额外](../../../en/adapterref/iobroker.shuttercontrol/img/KonfigExtra.png)

#### 天文设置
![额外设置天文](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsAstro.png)

**纬度和经度：** *快门控制程序从ioBroker系统设置中获取纬度和经度。

快门控制程序使用这些值来计算太阳的位置。

**根据太阳高度（仰角）退出遮阳功能：** *当太阳高度低于此处设置的高度时，遮阳功能即停止。

快门控制的遮阳功能停止。

>:point_right: 建筑物或高大的树木可能造成的过早遮荫，可以考虑在这里进行处理，并提前结束自动遮荫。

**升降快门延迟时间（分钟）：** *此处可输入 +/- 偏移量，快门运动应根据 [时间设置](#time-settings) 中选择的自动控制类型进行延迟。

**交错快门运动时间延迟（秒）：** *为防止所有快门同时运动，可在此处设置全局时间延迟（秒）。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 夏季设置
![额外设置夏季](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsSummer.png)

**夏季开始**和**夏季结束：*夏季的开始或结束可以根据您自己的意愿设定。

在相应百叶窗的 [快门设置](#shutter-settings) 下，将 ``Do not close shutter in summer`` 处的复选框设置为可防止此百叶窗在夏季关闭。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 圣诞节场景
![额外设置圣诞节](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsChristmas.png)

**圣诞节假期开始时间**和**圣诞节假期结束时间：** *您可以根据自己的意愿设置圣诞节假期的开始或结束时间。

在 [卷帘门的额外设置](#extra-settings-roller-shutter) 圣诞节设置下，此时所需的功能已开启，并且所需的卷帘门位置已开启。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 假日和公共假日设置
![额外设置 假期](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsHolidays.png)

**利用公共假期：** *选中此复选框并选择相应的假期适配器实例后，百叶窗将在周末的公共假期按设定的时间移动。

>:point_right: 如有必要，可以创建两个公共假期适配器实例：一个用于显示所有可能的公共假期，另一个用于显示与工作时间相关的公共假期，然后通过 shuttercontrol 访问该实例。

**用于设置节假日的对象 ID：*此对象 ID 设置内部状态“节假日”。

例如，此处可以使用来自 iCal 适配器的数据点，该数据点在节假日时返回值 ``true``，从而允许百叶窗在周末期间移动。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 亮度传感器设置
![额外设置亮度传感器](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsBrightnesssensor.png)

如果要使用亮度传感器自动移动快门，则在此处进行配置。

然后，在 [主快门设置](#main-shutter-settings) 下，对每个卷帘门分别进行激活。

在“卷帘门关闭（或打开）控制类型”下，选择“亮度传感器”条目。

**使用亮度传感器关闭时的亮度值** *百叶窗关闭时的亮度值。

**使用亮度传感器开启时的亮度值** *百叶窗开启时的亮度值*。

**亮度传感器的对象 ID** *亮度传感器的参考信息，例如来自气象站、室外运动传感器或独立亮度传感器的信息。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 学校假期设置
![额外设置学校假期](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsSchoolholidays.png)

此处，假期模式可通过单独的数据点（包含用于激活/停用学校假期的对象 ID）或已安装的 Schoolfree Adapter 实例的复选框来激活。

假期期间，百叶窗会在设定的周末出行时间自动开启。

每个区域的假期模式均可单独激活。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 特别时刻
![额外设置 Sonder](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsSonder.png)

**延迟关闭特定卷帘** *此选项允许所有卷帘在傍晚时分再次放下。

这适用于以下情况：在通常应该关闭窗户或门的时间，窗户或门仍然打开。

例如，如果窗户或门在通常应该关闭的时间仍然打开，或者露台门在关闭后又被打开。

选中此复选框后，将显示“已配置卷帘延迟关闭的时间”设置。

> 必须为 [快门设置](#shutter-settings) 中的每个卷帘门激活此功能，并在 **延迟关闭卷帘门** 处分别勾选每个卷帘门的复选框，或者如果不需要则将其停用。

**将所有百叶窗完全关闭在中间位置** *晚上所有百叶窗完全关闭的时间（例如晚上 10:00）*。

**仅当上次移动发生在 x 分钟前时才打开卷帘门：** *仅当此处设置的时间已过时，适配器才会打开卷帘门。

此处设置的时间已过。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 额外设置
![额外设置](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsExtra.png)

**检查当前快门状态：**部分用户（包括 Shelly 用户）遇到快门级别略有变化的问题。因此，此处提供了一个复选框。

如果选中此复选框，快门控制程序将在等待快门状态检查时间后检查当前级别，并将检查结果临时保存。

**已锁定已知卷帘高度的手动模式** *向上或向下取整当前卷帘高度*。

此处卷帘高度可以以 5 或 10 为步长进行取整。

**睡眠区触发器的对象 ID（自动）：** *此触发器激活睡眠区的自动模式。

**起居室触发器的对象 ID（自动）：** *此触发器激活起居室的自动模式。

**儿童区触发器的对象 ID（自动）：** *此触发器激活儿童区的自动模式。

---

#### 闹钟设置
![额外设置闹钟](../../../en/adapterref/iobroker.shuttercontrol/img/ExtraSettingsAlarm.png)

>:point_right: 每个警报都需要一个逻辑数据点（真/假）来激活，该数据点激活警报状态为**真**，或停用警报状态为**假**。

>:point_right: 此外，还必须为每个警报定义卷帘门在警报触发时移动的高度（0-100%）。

>point_right: 然后，在相应卷帘门的[闹钟设置](#alarm-setting)中，定义卷帘门应响应哪些警报。

卷帘门应响应。

各个警报的优先级：

优先级 1（最高优先级）--> 火灾：

如果此警报被触发，与之对应的卷帘门无论如何都会移动到设定高度。

>:exclamation: 之后，卷帘门会被锁定，即使火警被重置（误报），也不会自动关闭。

火警复位后，必须使用“全部打开”/“全部关闭”按钮重新初始化卷帘门。

这样可以防止卷帘门在发生火灾时因任何原因再次自动关闭。

同时，也能确保逃生通道畅通，并保证消防队能够顺利进入。

优先级 2 - 5（优先级相同）--> 雨、风2、风1、霜冻：

当这些警报被激活时，快门控制会将配置的卷帘门移动到最后一个激活的警报级别。

然而，在关闭各个警报时，遵循以下优先级：优先级 1 = 火警；优先级 2 = 雨警；优先级 3 = 二级风警；优先级 4 = 一级风警；优先级 5 = 霜冻。

只有当卷帘已关闭时，防冻警报才会直接生效（否则卷帘有冻结的风险）。如果卷帘仍处于打开状态时触发了防冻警报，卷帘只会在关闭时自动移动到防冻警报设定的高度。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

### 快门设置
![main1](../../../en/adapterref/iobroker.shuttercontrol/img/main1.png)

>:point_right: 示例执行器 *快门示例* 已自动创建，请通过垃圾桶 (5) 将其删除。

现在，点击 (+) (1) 添加您自己的卷帘门执行器。此时将打开 ID 选择窗口，请选择代表所需卷帘门位置的数据点 LEVEL。

![ID_Selector_DP_Levelg](../../../en/adapterref/iobroker.shuttercontrol/img/ID_Selector_DP_Level.png)

表格结构：

![标签页](../../../en/adapterref/iobroker.shuttercontrol/img/main1.png)

* **编号：** *所列百叶窗的连续编号*。

* **启用：** *用于激活/停用相应卷帘门控制的复选框*。

* **名称：** 选择 ID 后，执行器的名称将自动从对象中读取。

然后可以根据您的意愿进行更改。

* **对象 ID 快门：** *对象中要控制的数据点的唯一 ID*。

* **(+)** *更改选定的卷帘门执行器* * **铅笔** * *修改选定的卷帘门执行器

* **铅笔** *打开相应卷帘门的个性化配置*。

* **双页：** *复印卷帘门*

* **箭头：** *确定卷帘门在相同设置下的移动顺序。

* 垃圾桶：* *删除带有所有已配置数据的快门执行器。

创建卷帘门后，用铅笔 (3) 按下带有标签 [卷帘门主要设置](#main-shutter-settings)、[遮阳设置](#sun-protection-settings) 和 [附加设置]](#extra-settings) 的相应卷帘门，即可对每个卷帘门进行单独配置。

---

#### 主要快门设置
![主快门.png](../../../en/adapterref/iobroker.shuttercontrol/img/mainShutter.png)

在上方区域，快门开启或关闭的时间可通过下拉菜单单独选择。

> :point_right: 这些时间已在 [时间设置](#time-settings) 中配置。

选择选项：

* **关闭：** *请勿使用定时器。

* **起居室：** *百叶窗会在 *起居室设置* 中配置的时间移动。

* 起居室（自动）：* * *卷帘门会在*起居室设置*中配置的时间移动。

此外，卷帘门还会根据“附加设置”中定义的触发器启动。

用于激活/停用“自动生活区”的对象 ID。如果此项设置为 false，卷帘门将不会自动移动。

* 卷帘门会在*睡眠区设置*中配置的时间移动。

* 卷帘门会在*睡眠区设置*中配置的时间移动。

此外，卷帘门还会根据“附加设置”中指定的触发器激活。

用于激活/停用“自动休眠区域”的对象 ID。

如果此项设置为 false，卷帘门将不会自动移动。

* 儿童区：* *卷帘门会在*儿童区设置*中配置的时间移动。

* 儿童区（自动）：* *卷帘门会在 *儿童区设置* 中配置的时间移动。

此外，快门还会根据“附加设置”中定义的触发器激活。

用于激活/停用“自动儿童区域”的对象 ID。

如果设置为 false，快门将不会自动移动。

* 日落/日出：* * *快门在日落或日出时移动。

* 太阳高度角：如果太阳高度角低于此处设定的值，则卷帘门关闭。

* 黄金时段：* * *卷帘门在黄金时段关闭，根据纬度和一年中的时间，黄金时段大约是日落前 1 小时或日出后 1 小时。

根据纬度和季节的不同，日落前或日出后都有可能。

* 亮度传感器：** * *卷帘门仅根据亮度传感器移动，该亮度传感器在[亮度传感器设置](#brightness-sensor-settings)下设置。

* 仅限手动操作：* * *卷帘门只能在选定的方向上手动移动。

:point_right: 无法通过 ``shuttercontrol.0.control`` 下的按钮进行任何操作。

point_right: 例如，这对于遮阳篷很有用，遮阳篷不应与其他卷帘门同时打开。

不应与其他卷帘门同时打开。

**门窗传感器在关闭状态下的值：** *此处定义了**门窗触点对象 ID**（例如，门窗触点）的触发值。

（例如，门窗或旋钮触点）在该触发值下，自动卷帘系统可以无限期地移动。

:point_right: 可以选择 true、false、0、1 或 2 等值。

> point_right：如果卷帘门不在最高位置，且此处指定的传感器状态发生变化，则卷帘门将移动到最高位置。

传感器状态发生变化时，卷帘门将移动到**窗户或门打开时的卷帘门高度**。

**倾斜状态下门窗传感器的值：** *此设置用于设置**门窗触点对象 ID**（例如，门窗触点）下的触发值。

（例如，门窗或旋转把手触点）在该值下，自动卷帘系统可以无限期地移动。

:point_right: 可以选择 true、false、0、1 或 2 等值。

> point_right：如果卷帘门不在最高位置，且此处指定的传感器状态发生变化，则卷帘门将移动到最高位置。

传感器状态发生变化时，卷帘门将移动到**窗户或门打开时的卷帘门高度**。

> :exclamation: 如果没有与倾斜功能相连的窗户，则此值应设置为“不存在”。

**当门窗状态改变时移动卷帘：** *下拉选择当门窗传感器移动时要执行的功能：*

**关闭**：无移动

* **开启**：打开窗户/门时，百叶窗向上移动并保持在那里；关闭时，百叶窗不会移动。
* **关闭**：关闭窗户/门后，卷帘门移动到遮光位置；打开时，卷帘门不会移动。

**开启和关闭：** 当窗户/门打开时，卷帘向上移动；当窗户/门关闭时，卷帘向下移动。

**打开窗户或门时卷帘的高度：** *所需卷帘位置范围为 0-100，例如，窗户通风时为 25%，门可以通行时为 100%。

门可以通行。

**窗户或门倾斜时卷帘门的高度：** *所需的卷帘门位置为 0-100，例如，窗户通风时为 25%。

**即使门窗打开，也使用自动卷帘门（锁定保护）** **如果在自动关闭时，门窗传感器__不__与输入的值（门窗已关闭）相符，则将根据所选设置执行以下操作：**

* **关闭**：双向锁定保护功能均已激活，窗户打开时百叶窗不会移动。
* **开启**：仅允许升起。遮光/遮阳结束后，即使窗户处于开启状态，卷帘也会向上移动。窗户开启时，卷帘不会自动关闭。
* **关闭**：仅允许关闭。在开始遮光/遮阳时，即使窗户打开，卷帘也会向下移动。窗户打开时，卷帘不会打开。
* **开启和关闭**：当窗户打开时，卷帘可以向两个方向移动。

**当自动卷帘在窗户打开或倾斜时关闭时，也请使用以下高度：** *如果启用此选项，且在自动卷帘下降时窗户处于打开或倾斜状态，则卷帘随后将分别移动到**打开窗户或门时的卷帘高度**和**窗户或门倾斜时的卷帘高度**。目前，这些高度仅在窗户/门传感器发生变化时使用——启用此选项后，它们也将应用于自动卷帘关闭时。

如果**窗户/门倾斜时的传感器值**设置为“不可用”，则始终使用打开窗户时的高度。*

卷帘首先会完全关闭至遮光位置，然后再移动到通风高度。这是有意为之：卷帘电机向下移动的速度通常比向上移动的速度快，因此从上方达到的相同百分比对应的位置与从下方达到的位置不同。从完全关闭的位置开始，设置的值始终与窗户打开时使用的位置一致。

在两次驱动之间，适配器会等待在“额外设置”中配置的“检查卷帘状态的等待时间”（默认为 60 秒）。该时间必须至少与卷帘的运行时间一样长。设备确认并非充分条件：某些设备（例如通过 zigbee2mqtt 连接的设备）会在命令发出几毫秒后才报告目标位置，而不是在驱动结束时报告。如果电机仍在运行期间发送第二个命令，这些设备将无法接收到该命令——此时卷帘会报告通风高度，但仍然保持关闭状态。

> :point_right: 该选项仅更改**目标高度**，不更改驱动器权限。卷帘门在窗户打开时是否可以移动，仍然取决于锁定保护设置。如果该设置设为“关闭”或“打开”，则窗户打开时卷帘门仍然不会移动。

> :point_right: 霜冻警报生效时优先——在这种情况下，仍然使用防霜冻位置。

> :point_right: 如果在卷帘门移动到遮光位置时窗户关闭，卷帘门将保持在该位置，通风高度将不再被利用。

> :point_right: 完全遮光位置会被存储，并在窗户关闭后立即自动调整到该位置。这需要将“当窗户/门状态改变时百叶窗移动”设置为“关闭”或“开启和关闭”，或者启用“窗户关闭后自动调整到该位置”功能。

> :point_right: 此选项适用于所有自动降温功能（定时自动、日出/日落自动、黄金时段自动、太阳高度角自动、亮度感应自动和延迟降温）。防晒功能和手动“全部降温”按钮不受影响。

**卷帘门向下移动时的高度：** *卷帘门关闭时的位置值。

**卷帘门升起时的高度：** *卷帘门打开时的位置值*。

> :point_right: 卷帘门高度必须根据所使用的执行器输入（0-100 或 0-255）： > 0 = 关闭，100 = 打开，或 0 = 打开，100 = 关闭。

**门窗触点的对象 ID：** 使用 (+) 选择要阻止卷帘门移动的传感器（状态）（例如门触点）。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 防晒设置
![防晒](../../../en/adapterref/iobroker.shuttercontrol/img/mainSunprotect.png)

**遮阳控制类型：** 遮阳功能可通过多种触发器控制遮阳及其结束状态。可通过下拉菜单选择以下组合：

* 出局
* 室内外温度/光线传感器
* 指南针方向（太阳位置）
* 室内/室外温度/光线传感器和方位指示
* 室外温度/光线传感器及方向
* 室外温度/光照传感器
* 室内温度

> :point_right: 遮阳功能仅在所选组合的所有触发器都处于活动状态时触发（逻辑与连接），并在其中一个触发器变为非活动状态时结束。

> :point_right: 还必须为所有选定的触发器存储对象 ID。

> :point_right: 光传感器始终是可选的，可以留空。如果配置了光传感器，它将与其他参数关联，且关系为 AND。

卷帘下降高度：*遮光时卷帘应关闭的程度。*

**方向（太阳位置）：** *窗口在罗盘玫瑰图上的对准（0° = 北；180° = 南）*

**主动遮阳的太阳位置范围（+/-）：** *太阳（中心点附近）会影响窗户光线的区域。此区域外没有遮阳措施。*

**设定室外温度：** *遮光罩从此值（或更高值）开始工作。*

**外部温度滞后（百分比）：** *您可以在此处设置滞后百分比，以便卷帘在波动时不会不断上下移动。* 滞后值是指遮阳开始的最高温度值与遮阳结束的最低温度值之间的差值。

**室外温度对象 ID：**此处通过 (+) 选择的传感器不一定需要测量室外温度。它可以提供任何可用于触发遮阳装置的值。

它也可以是热传感器（温差传感器）。

如果未选择任何室外传感器作为触发装置，请将此字段留空。

**遮阳光传感器设定点：** *开始遮阳的阈值。* 此值取决于在“遮阳光传感器对象 ID”字段中选择的传感器。

**滞后光传感器（百分比）：** 您可以在此处设置向下滞后百分比，以防止卷帘在云层变化引起的波动时频繁上下移动。

滞后值是指遮光开始的设定亮度值与遮光结束的最低亮度值之间的差值。

> :point_right: 示例：遮阳光传感器的设定点设置为 30,000，滞后设置为 40%：遮阳功能从 30,000 开始激活，并保持激活状态，直到该值低于 18,000。

**遮阳光传感器对象 ID：** *类似于室外温度传感器* 如果未选择作为触发器，请留空

**设定室内温度：**您可以在此处输入分配给卷帘的内部温度传感器的温度，低于此温度时不应进行任何遮光，例如为了减少热量，以便在冬季使用辐射辅助供暖。

**内部温度滞后（百分比）：** *您可以在此处设置滞后百分比，以防止卷帘在内部温度波动时频繁上下波动。* 滞后值是指遮阳开始的最高温度值与遮阳结束的最低温度值之间的差值。

**室内温度传感器对象 ID：** 使用 (+) 选择温度传感器。

如果未选择任何室内传感器作为触发器，请将此字段留空。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

#### 额外设置卷帘门
![主要额外](../../../en/adapterref/iobroker.shuttercontrol/img/mainExtra.png)

#### 卷帘门设置
![主要额外快门设置](../../../en/adapterref/iobroker.shuttercontrol/img/mainExtraShutterSettings.png)

**延迟关闭卷帘门** 启用此选项后，卷帘门会在设定的时间（可在[特殊时刻](#special-times)中调整）自动开启并关闭。

> :exclamation: 此选项未考虑防锁功能，即使窗户打开，卷帘门也会放下！（存在被锁在门外的危险！！） :exclamation:

**夏季请勿关闭卷帘门** 部分卷帘门夏季不应关闭。夏季指[夏日景色](#summer-settings)中的时间段。

**关窗后继续行驶** 车窗/车门关闭后，卷帘门将恢复到上次请求的设置位置。

> :point_right: 只有当锁定保护未设置为“关闭”时，此方法才有效！

#### 圣诞节布置
![主要额外圣诞节](../../../en/adapterref/iobroker.shuttercontrol/img/mainExtraChristmas.png)

如果圣诞节期间卷帘门只需部分关闭（例如，为了让烛台拱门或其他装饰物可见），可以使用此选项。这样，卷帘门不会在正常关闭时间完全关闭，而是会关闭到设定的位置。

> :point_right: **圣诞节期间的卷帘门关闭位置** 仅在勾选“启用圣诞节期间的卷帘门关闭位置”复选框后才可见且可调节。

此功能的启用时间段在 [圣诞节场景](#christmas-settings) 设置中设置。

> :point_right: 如果要在晚上晚些时候完全关闭卷帘门，可以使用此选项 > **延迟关闭卷帘门** 或 **移动到中间位置并稍后完全关闭**。

> :point_right: 这两个选项也可以独立于圣诞节设置使用。

#### 防晒设置
![mainExtraSun](../../../en/adapterref/iobroker.shuttercontrol/img/mainExtraSun.png)

**保持卷帘处于遮阳状态** 如果启用此选项，即使不再需要遮阳，卷帘也会保持遮阳状态，直到傍晚收到“关闭”信号为止。

这样可以防止卷帘每天多次升降。

在卷帘高度较低（已勾选此选项）且仅需打开和关闭帘片时，此功能非常实用。

**亮度低于设定值后延迟时间（分钟）** 此处设置当遮光罩变暗且亮度低于设定值时，遮光罩停止工作的延迟时间。

默认值为 0，可根据需要进行调整。此选项仅在与亮度传感器配合使用时有效。

**隔热保护** 启用此选项后，卷帘门可在炎热天气下完全关闭。

启用此选项后，将显示用于输入温度（单位：摄氏度）的字段。

> :point_right: 如果手动调整卷帘门，但位置与自动调整的位置不符，则自动系统将停止运行！

> :point_right: 如果手动将卷帘门移动到配置的高度以进行打开、关闭或遮阳，则自动功能仍然保留。

#### 额外设置
![主要额外内容](../../../en/adapterref/iobroker.shuttercontrol/img/mainExtraExtra.png)

**窗户开启时卷帘延迟时间（秒）** *窗户/门开启后，卷帘延迟开启的参数（以秒为单位）*

**窗户关闭时卷帘延迟时间（秒）** *用于设置窗户/门关闭后卷帘延迟关闭时间的参数（以秒为单位）*

**移动到中间位置，然后完全关闭** *激活后，**卷帘门在中间位置的高度**会显示出来。卷帘门在关闭时会移动到设定的中间位置，然后完全关闭。*

#### 闹钟设置
![主警报](../../../en/adapterref/iobroker.shuttercontrol/img/mainExtraAlarm.png)

在这里，通过 [闹钟设置](#alarm-setting) 为当前卷帘门预定义的警报将被激活或停用。

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

---

## 数据点
Shuttercontrol 会在以下文件夹下创建各种数据点：

* shuttercontrol.x.control
* shuttercontrol.x.info
* shuttercontrol.x.shutters

> :point_right: x 代表相应的已安装实例

---

### 卷帘门状态
卷帘门可以处于以下状态

* 上：卷帘门打开
* 向下：卷帘门已关闭
* 防晒模式：卷帘处于防晒模式
* 无：无可用状态
* OpenInSunProtect：窗户或门在防晒模式下打开
* Manu_Mode：手动模式（手动移动卷帘门）
* manu_sunProtect：手动切换到防晒模式
* 风速1：风速1级警报
* wind2：二级风力警报
* 触发条件：窗户打开，卷帘移动到打开位置
* 霜冻：霜冻警报
* rain：降雨警报
* 火警：火警警报

---

### 快门控制0控制
![数据点控制](../../../en/adapterref/iobroker.shuttercontrol/img/datapointscontrol.png)

用于控制各种功能的数据点，例如：*节假日 *如果 ```true```，则卷帘门在周末和节假日按设定时间移动

```false``` during weekday hours.*
> :point_right: Can use your own scripts that calculate or display vacation, days off, etc.
set to true to enable weekend settings.

* autoAll
*Button to set **all** shutters to auto mode*

* autoChildren
*If the roller shutters are controlled with **children's area (automatic)**, the automatic function is activated here
switched on with ```true``` and switched off with ```false```.*

* auto living
*If the roller shutters are controlled with **Living area (automatic)**, the automatic mode is used here
switched on with ```true``` and switched off with ```false```.*

* auto sleep
*If the roller shutters are controlled with **sleeping area (automatic)**, the automatic mode is used here
switched on with ```true``` and switched off with ```false```.*

* closeAll
*Button to close **all** roller shutters in **all areas***

* closeChildren
*Button to close **all** roller shutters in the children's area*

* closeLiving
*Button to close **all** roller shutters in the living area*

* closeSleep
*Button to close **all** shutters in the sleeping area*

* openAll
*Button to open **all** roller shutters in **all areas***

* openChildren
*Button to open **all** roller shutters in the children's area*

* openLiving
Button to open **all** roller shutters in the living area

* openSleep
*Button to open **all** shutters in the sleeping area*

* school free
*Button to manually activate the holiday season and have the roller shutters open at the set time on the weekend*

* sunProtect
*Button to move the roller shutters into the sun protection position*

* sunProtectChildren
*Button to move the roller shutters in the children's area to the sun protection position*

* sunProtectLiving
*Button to move the roller shutters in the living area to the sun protection position*

* sunProtectSleep
*Button to move the roller shutters in the sleeping area to the sun protection position*


_[Back to top](#documentation-and-instructions-for-shuttercontrol)_


---


### shuttercontrol0info
Data points for displaying calculated values and checking configured ones
Times:

![datapointsinfo](../../../en/adapterref/iobroker.shuttercontrol/img/datapointsinfo.png)


_[Back to top](#documentation-and-instructions-for-shuttercontrol)_


---


### shuttercontrol0shutters
![datapointsshutters](../../../en/adapterref/iobroker.shuttercontrol/img/datapointsshutters.png)

* autoDown
*For each roller shutter, automatic closing can be deactivated here with ```false```

或使用 ```true```.* 激活

* 自动调平

*显示每个卷帘门的当前位置（无法通过此功能控制卷帘门）。*

* 自动状态

*显示每个卷帘门的当前状态（升起、下降、手动模式、防晒模式）（卷帘门无法通过此功能控制）。*

* autoSun

*每个卷帘门的遮阳功能可通过```false```停用，或通过```true```启用。*

* 自动向上

*每个卷帘门的自动开启功能可在此处通过```false```停用，或通过```true```启用。*

_[返回顶部](#documentation-and-instructions-for-shuttercontrol)_

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### __WORK IN PROGRESS__
* (simatec) Update dependabot

### 2.1.1 (2026-08-21)
* (simatec) small Bugfix
* (simatec) Update dependabot
* (simatec) Fix Azimut & Elevation

### 2.1.0 (2026-08-18)
* (simatec) Code Cleaning
* (Eistee82) Add the ventilation height to the down automatics with an open window
* (simatec) Update dependabot

### 2.0.12 (2026-02-21)
* (simatec) License updated
* (simatec) Update dependabot

### 2.0.11 (2025-12-21)
* (simatec) Update dependabot

### 2.0.10 (2025-12-21)
* (simatec) Fix JSON Tab

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019 - 2026 simatec

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