---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dreame/README.md
title: ioBroker.dreame
hash: XcsNMvva6WtXttYYwmYlO7AE9+rTDkV+b9sydyrfgig=
---
![标识](../../../en/adapterref/iobroker.dreame/admin/dreame.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.dreame.svg)
![下载](https://img.shields.io/npm/dm/iobroker.dreame.svg)
![安装数量](https://iobroker.live/badges/dreame-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/dreame-stable.svg)
![NPM](https://nodei.co/npm/iobroker.dreame.png?downloads=true)

# IoBroker.dreame
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

![实时地图小部件](../../../en/adapterref/iobroker.dreame/docs/Pics/Map-Screen.jpg)

## IoBroker 的 dreame 适配器
适用于 Dreame 和 MOVA 扫地机器人和割草机器人的适配器。

**支持的品牌：** Dreame、MOVA（请在适配器设置中选择）

**测试机型：** L10、L20、X40、A2 1200（割草机）、MOVA 600、MOVA 1000

---

＃＃ 安装
### 通过 ioBroker 管理员界面（推荐）
1. 确保“最新”存储库处于活动状态

管理 → 设置 → 存储库

2. 转到“适配器”选项卡并搜索“dreame”。
3. 点击安装

该适配器目前可在 **最新** 存储库中找到。已请求将其纳入稳定存储库（请参阅 https://github.com/ioBroker/ioBroker.repositories/pull/6200 的状态）。

### 通过 CLI
```
iobroker install dreame@latest
```

### 用于适配器开发
如果您想为适配器代码本身做出贡献（而不仅仅是使用它）：

```
git clone https://github.com/TA2k/ioBroker.dreame.git
cd ioBroker.dreame
npm install
npm link
```

---

＃＃ 配置
| 设置 | 描述 |
| --------------- | --------------------------------------------------- |
| 云服务 | 根据您的应用选择 **Dream** 或 **MOVA** |
| 应用邮箱 | 您的 Dreame/MOVA 应用登录邮箱 |
| 应用密码 | 您的 Dreame/MOVA 应用密码 |
| 获取地图 | 在适配器启动时以及每隔 *更新间隔* 分钟从云端获取地图；同时维护房间名称和已存储的地图图像。下方地图小部件需要此功能。 |
| 更新间隔 | 适配器主动轮询云端的周期（分钟）——获取地图信息**以及**设备常规状态（电池、清洁状态等）。数值越高，云请求次数越少，但两者都会延迟。 |

MOVA 设备（600、1000）与 Dreame 使用相同的云后端，但域名不同。如果您使用 MOVA 应用，请选择 **MOVA**。

---

## 真空（L10、L20、X40 等）
适配器会以惰性方式为扫地机器人创建状态——只有设备实际上报的属性才会出现在对象树中。状态会在适配器启动后以及第一个轮询周期结束后逐渐填充。下表显示了所有已知的可能状态；您的设备可能只会上报其中一部分。

### 真空状态
| 状态 | 描述 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 状态 | 机器人状态（1=清洁中，2=待机，3=暂停，5=返回中，6=充电中，7=拖地中，8=烘干中，9=洗涤中，……） |
| 错误 | 错误代码 |
| 电池电量 | 电池百分比 |
| 充电状态 | 1=正在充电，2=未充电，3=已充满，5=返回充电 |
| 状态 | 清洁状态（0=空闲，1=暂停，2=清洁中，3=返回主屏幕，6=充电中，18=分段清洁，19=区域清洁，20=点清洁，21=地图绘制中） |
| 清洁时间 | 当前清洁时间（分钟） |
| 已清洁区域 | 当前已清洁区域（平方米） |
| 清洁进度 | 清洁进度 (%) |
| 干燥进度 | 干燥进度 (%) |
| 任务状态 | 任务（0=已完成，1=自动，2=区域，3=分段，4=点，5=测绘） |
| 任务类型 | 任务类型 |
| 序列号 | 序列号 |
| 故障 | 故障详情 |
| 警告状态 | 警告状态 |
| 水箱 | 0=未安装，1=已安装，10=已安装拖把 |
| 自洗基地状态 | 自洗基地状态 |
| 拖地站 | 拖地站 |
| 拖把垫已安装 | 拖把垫已安装 |
| 排水状况 | 排水状况 |
| 设备功能 | 设备功能标志 |

耗材
| 状态 | 描述 |
| ---------------------- | ------------------------ |
| 主刷剩余寿命 | 主刷寿命 (%) |
| main-brush-time-left | 主刷剩余时间（小时） |
| 左侧边刷 | 边刷寿命 (%) |
| 侧刷剩余时间 | 侧刷剩余时间（小时） |
| 滤芯剩余量 | 滤芯寿命 (%) |
| 剩余过滤时间 | 剩余过滤时间（小时） |
| 传感器剩余脏污时间 | 传感器寿命 (%) |
| sensor-dirty-time-left | 传感器剩余时间（小时） |
| 左侧车轮脏污程度 | 车轮寿命 (%) |

#### 站点状态
| 状态 | 描述 |
| ----------------------- | ----------------------------------------- |
| 净水箱状态 | 0=已安装，1=未安装，2=水位低 |
| 脏水箱状态 | 0=已安装，1=未安装或已满 |
| 防尘袋状态 | 0=已安装，1=未安装，2=检查 |
| 洗涤剂状态 | 洗涤剂状态 |
| 热水状态 | 热水状态 |

＃＃＃＃ 统计数据
| 状态 | 描述 |
| ------------------- | ------------------------------------ |
| 首次清洁日期 | 首次清洁日期（Unix 时间戳） |
| 总清洁时间 | 总清洁时间（分钟） |
| 清洁次数 | 总清洁次数 |
| 总清洁面积 | 总清洁面积（平方米） |

#### 自动切换已解析值
这些信息是从 `auto-switch-settings` JSON 中解析出来的，并作为单独的状态提供：

| 状态 | 描述 |
| ------------------- | ---------------------------------------------- |
| 自动烘干 | 自动烘干：0=关闭，1=开启 |
| 防碰撞 | 防碰撞：0=关闭，1=开启 |
| 补光灯 | 黑暗环境下的补光：0=关闭，1=开启 |
| 防污功能 | 防污功能：0=关闭，1=开启 |
| 拖地类型 | 0=日常，1=精准，2=深度 |
| clean-genius | CleanGenius：0=关闭，1=常规，2=深度清洁 |
| 清洁路线 | 1=标准，2=深度，3=彻底，4=快速 |
| 更宽的角落 | 角落覆盖：0=关闭，1=高频，-7=低频 |
| 地面方向 | 地面方向清洁：0=关闭，1=开启 |
| 宠物专用 | 宠物专用清洁：0=关闭，1=开启 |
| 最大吸力 | 最大吸力：0=关闭，1=开启 |
| 热水洗涤 | 热水洗涤：0=关闭，1=开启 |
| 紫外线杀菌 | 紫外线杀菌：0=关闭，1=开启 |
| 超净模式 | 超净模式：0=关闭，1=开启 |
| 拖把延伸 | 拖把延伸：0=关闭，1=开启 |
| 智能充电 | 智能充电：0=关闭，1=开启 |

### 真空吸尘器遥控器
| 状态 | 描述 |
| ---------------------- | ----------------------------------------------------- |
| 吸力等级 | 0=静音，1=标准，2=强劲，3=超强 |
| 水量 | 1=低，2=中，3=高 |
| 清洁模式 | 0=扫地，1=拖地，2=扫地+拖地，3=扫地后拖地 |
| 地毯增压 | 地毯增压开启/关闭 |
| 避障 | 避障功能开启/关闭 |
| 人工智能检测 | 人工智能检测位域 |
| 儿童锁 | 儿童锁开启/关闭 |
| 地毯敏感度 | 1=低，2=中，3=高 |
| 地毯识别 | 地毯识别开启/关闭 |
| 地毯清洁 | 0=避免，1=适应，2=忽略 |
| 自清洁 | 自清洁开关 |
| 干燥时间 | 2=2小时，3=3小时，4=4小时 |
| 自动安装拖把 | 自动安装拖把开关 |
| 拖把清洗级别 | 拖把清洗级别 |
| 自动补水 | 自动补水开关 |
| 自动添加洗涤剂 | 自动添加洗涤剂开关 |
| 请勿打扰开/关 |
| 勿扰模式开始/结束 | 勿扰模式时间范围 |
| 音量 | 音量级别 |
| 自动集尘 | 自动集尘开关 |
| 自动清空频率 | 自动清空频率 |
| 湿度等级 | 湿度等级（1–32） |
| cleangenius-mode | 0=关闭，1=常规，2=深度清洁 |
| 水温 | 0=冷，1=温，2=热，3=沸腾 |
| 静音烘干 | 静音烘干开/关 |
| 头发压缩 | 头发压缩开关 |
| 使用清洁剂拖地 | 开启/关闭使用清洁剂拖地功能 |

#### 自动切换集命令
这些设置直接写入设备的自动切换设置（属性 4-50）：

| 状态 | 描述 |
| --------------------------- | ------------------------------------------------------------ |
| 设置自动烘干 | 设置自动烘干：0=关闭，1=开启 |
| 设置碰撞避免 | 设置碰撞避免：0=关闭，1=开启 |
| 设置补光灯 | 设置补光灯：0=关闭，1=开启 |
| 设置防污功能 | 设置防污功能：0=关闭，1=开启 |
| 设置拖地类型 | 设置拖地类型：0=日常，1=精准，2=深度 |
| set-clean-genius | 设置 CleanGenius：0=关闭，1=例行清洁，2=深度清洁 |
| 设置清洁路线 | 设置清洁路线：1=标准，2=强力，3=深度，4=快速 |
| set-wider-corner | 设置更宽的转角：0=关闭，1=高频，-7=低频 |
| 设置地板方向 | 设置地板方向：0=关闭，1=开启 |
| set-pet-focused | 设置宠物优先：0=关闭，1=开启 |
| 设置智能充电 | 设置智能充电：0=关闭，1=开启 |
| 设置热水洗涤 | 设置热水洗涤：0=关闭，1=开启 |
| 设置紫外线消毒 | 设置紫外线消毒：0=关闭，1=开启 |
| 设置最大吸力 | 设置最大吸力：0=关闭，1=开启 |
| 设置超洁净模式 | 设置超洁净模式：0=关闭，1=开启 |
| 设置拖把伸出长度 | 设置拖把伸出长度：0=关闭，1=开启 |
| 设置智能烘干 | 设置智能烘干：0=关闭，1=开启 |
| 设置自清洁频率 | 0=每个房间，1=标准，2=高 |
| set-intensive-carpet | 设置地毯强力模式：0=关闭，1=开启 |
| 设置间隙清洁 | 设置间隙清洁扩展：0=关闭，1=开启 |
| 设置家具下方拖地 | 设置家具下方拖地：0=关闭，1=开启 |
| 设置自定义拖地模式 | 设置自定义拖地模式：0=关闭，1=开启 |

#### 操作
> **自 0.3.18 版本以来的重大变更：** 操作状态（`start-clean`、`stop`、`pause`、`return-to-dock`、`locate`、`start-washing`、`start-auto-empty`、`clear-warning` 以及所有重置按钮）现在类型为**布尔值/角色按钮**。

> 写入 `true` 即可触发这些操作。之前写入字符串值的脚本或可视化控件必须进行更新。

| 状态 | 描述 |
| ------------------ | ------------------------------------------------------ |
| 开始清洁 | 开始清洁（按钮） |
| 暂停 | 暂停清洁（按钮） |
| 停止 | 停止清洁（按钮） |
| 返回坞站 | 返回坞站（按钮） |
| start-custom-clean | 开始自定义清理（值：包含 piid/value 对的 JSON） |
| 开始清洗 | 开始拖把清洗（按钮） |
| 启动自动清空 | 启动自动清空（按钮） |
| 定位 | 定位机器人/播放声音（按钮） |
| 清除警告 | 清除警告（按钮） |
| reset-main-brush | 重置主刷耗材（按钮） |
| 重置边刷 | 重置边刷耗材（按钮） |
| 重置过滤器 | 重置过滤器耗材（按钮） |
| 重置传感器 | 重置传感器耗材（按钮） |
| 获取地图 | 从设备获取地图（按钮） |
| 自定义命令 | 发送自定义 MIoT 命令（JSON） |

#### 客房清洁
`dreame.0.XXXX.remote.start-custom-clean`

```json
[
  { "piid": 1, "value": 18 },
  { "piid": 10, "value": "{\"selects\":[[X,1,3,2,1]]}" }
]
```

X = 房间 ID。多个房间：`{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}`

#### 切换地图
`dreame.0.XXXXXXX.remote.customCommand`:

```json
{ "siid": 6, "aiid": 2, "in": [{ "piid": 4, "value": "{\"sm\":{},\"mapid\":X}" }] }
```

X = mapId（参见`dreame.0.XXXX.status.map-list`）

---

### 定制客房清洁
“自定义房间清洁”功能允许您选择特定房间，并仅派遣机器人清洁这些房间，而不是清洁整个楼层。吸力强度和水量设置将应用于所有选定的房间。

#### 分步指南
**a) 为您的地图命名（可选，建议多层住宅使用）**

首次检测到映射时，会创建状态 `map.maps.<id>.mapName`，其占位符值为 `"Map <id>"`（例如 `"Map 1"`）。此状态可直接写入——只需将 ioBroker 对象树中的值更改为有意义的值，例如从 `"Map 1"` 更改为 `"Ground Floor"`。保存新值后，通道名称 `map.maps.<id>` 会自动更新。无需重启适配器。

**b) 设置活动地图**

将地图 ID（例如 `1`）写入 `remote.custom-room-cleaning.active-map`。触发启动时，只会将属于该地图的房间发送给机器人。步骤 (a) 中命名的地图有助于您识别哪个 ID 对应哪个楼层。

**c) 选择房间**

在 `remote.custom-room-cleaning.map-<id>/` 下，每个识别出的房间都显示为一个布尔状态。通道和状态名称显示映射表中转换后的房间名称（例如 `kitchen`、`living-room`、`bathroom`）。将所需的房间设置为 `true`。

**d) 调节吸力大小和水量（可选）**

`remote.suction-level` 和 `remote.water-volume` 适用于所有选定的房间。如果您需要非默认值，请在触发启动之前设置这些值。这些状态与常规清洁时使用的状态相同。

e) 开始清洁运行

将 `remote.custom-room-cleaning.start` 设置为 `true`。适配器根据活动地图的复选框构建房间选择，将其发送给机器人，并将 `start` 状态自动重置为 `false`。

#### 高级：直接编辑 `customCommand`
`remote.custom-room-cleaning.customCommand` 以 JSON 字符串的形式保存原始选择结果。您也可以直接写入：

```json
{"selects":[[roomId, repeats, suctionLevel, waterVolume, index], ...]}
```

示例——厨房（ID 4）强力吸水，中等水量：

```json
{"selects":[[4, 1, 2, 2, 1]]}
```

`customCommand` 和房间复选框是**双向同步**的：编辑其中一个会自动更新另一个。写入 `customCommand` 会直接更新当前地图的复选框；勾选复选框会重建 `customCommand`。两种方法等效。

#### 已知局限性
- **仅限全局吸力/水量** — 所有选定房间的吸力和水量均设置为相同值。此功能不支持单个房间的单独设置（如 `map.cleanset.*` 中所示）。
- **单地图多层测试** — 多地图结构（每个地图对应一个通道组）已完全实现，但目前仅在实际硬件上对单地图操作进行了广泛测试。使用两个或更多地图的多层家庭网络应该可以正常工作，但尚未进行端到端验证。

---

### 真空吸尘器快捷方式
快捷指令（在 Dreame 应用中创建的快速命令）会根据属性 4-48（base64 编码的名称）进行解析。每个快捷指令在 `deviceId.shortcuts.{id}` 下都有自己的通道：

| 状态 | 描述 |
| ------- | ------------------------------------------ |
| 名称 | 解码后的快捷方式名称 |
| 运行中 | 快捷方式当前是否正在运行 |
| 开始 | 启动快捷方式的按钮 |

通道会在适配器启动时自动重建（而不仅仅是在下次应用端更改时），并且当在应用中删除快捷方式时也会自动删除。

---

### 时间表
在 Dreame 应用（属性 8-2）中创建的日程表，会根据 `deviceId.schedule.{id}` 中的每个日程表条目解析为一个频道：

| 状态 | 描述 |
| ---------- | ------------------------------------------------------------------------------------- |
| 已启用 | 是否启用日程安排 — 可写入，直接在机器人上切换日程安排 |
| 时间 | 日程触发时间（`HH:MM`） |
| 工作日 | 日程安排的工作日（目前始终为德语，例如 `Mo,Mi,Fr` 或 `täglich`） |
| 类型 | 日程安排类型：房间清洁、所有房间清洁或快捷方式 |
| 房间 | *(仅限房间清洁计划)* JSON 数组，每个房间一个条目，包含其自身的模式/吸力/路线/循环/湿度和翻译后的房间名称 |
| 参数 | *(仅限所有房间日程安排)* JSON 对象，包含应用于整个地板的模式/吸力/路线/循环/湿度等参数 |
| 孤立 | *(仅限快捷指令计划)* `true` 如果链接的快捷指令不再存在（已在应用中删除） — 在这种情况下不应依赖 `enabled` |
| 孤立 | *(仅限快捷指令计划)* 如果链接的快捷指令不再存在（已在应用中删除）则为 `true` — 在这种情况下不应依赖 `enabled` |

计划通道会在适配器启动时自动重建，并在应用程序中删除计划时自动移除，与上述快捷方式相同。

---

### 实时地图小部件
该适配器包含一个基于浏览器的实时地图组件：机器人位置、清洁路径和已清洁房间，并在机器人清洁过程中实时更新。该组件由适配器直接提供，无需可视化组件或额外适配器，并且可以作为 iframe 嵌入到可视化界面、Grafana 或自定义仪表板中。

＃＃＃＃ 设置
- 需要 ioBroker **web** 适配器（任何实例）来提供页面服务。
- 在 `%web_protocol%://%ip%:%web_port%/dreame/` 处打开，例如 `http://<your-iobroker>:8082/dreame/`。ioBroker 起始页上有一个现成的链接（“Dreame-Map”），在适配器列表中此实例旁边。
- 必须启用“获取地图”功能（参见[配置](#configuration)）——如果没有启用，则小部件没有数据。
- 如果尚未显示地图，请在机器人停放在充电座上时启动适配器一次，以便加载第一个完整地图。
- 同一实例上的多个机器人：当找到多个设备时，小部件会在标题中显示设备切换器，或者直接在地址中使用 `?did=<did>` 选择一个设备。

**不支持摄像头/VSLAM机器人。** 使用摄像头而非激光雷达进行导航的设备（例如米家1C/1T、Dreame F9）不在地图组件的覆盖范围内——该组件仅针对激光雷达机器人进行构建和测试。适配器会记录警告，并且地图对于这些设备将显示为空白。

＃＃＃＃ 外貌
所有外观设置都在小部件本身中——打开右上角的齿轮图标。提供四种颜色模式：

| 模式 | 描述 |
| --- | --- |
| 浅色 | 固定浅色主题 |
| 深色 | 固定深色主题（默认） |
| 主色 | 选择一种基础颜色；侧边栏、边框和文本将自动由此颜色衍生，并进行对比度检查，以确保文本始终清晰易读 |
| 自定义 | 五种可单独选择的颜色（背景、侧边栏、按钮、边框、文本），实现完全控制 |

<table><tr><td width="50%"><img src="docs/Pics/Map-Dark.jpg" alt="深色主题"></td><td width="50%"><img src="docs/Pics/Map-White.jpg" alt="浅色主题"></td></tr></table>

＃＃＃＃ 特征
- 顶部设备切换器，用于设置多个机器人
- 可自定义布局：侧边栏左右方向、界面缩放、侧边栏宽度、地图旋转
- 面板可以单独显示或隐藏（清洁、快捷方式、工作站、维护、水和拖把、统计信息）——有些面板还可以隐藏其中的个别行/图块（例如清洁面板上的吸力级别或湿度）
- 快捷指令面板：每个应用快捷指令对应一个磁贴，点击即可直接从小部件启动。
- “日程安排”按钮会打开一个表格，列出Dreame应用程序中创建的所有日程安排（时间、星期几、类型、房间或楼层设置），每个日程安排都带有一个开关——指向已删除快捷方式的日程安排会显示一个锁定的开关，而不是静默无声。
- 小部件用户界面提供德语和英语版本，遵循 ioBroker 系统语言。
- 信息亭模式（`?gear=0`）隐藏设置齿轮图标 — 适用于只读显示器（墙面平板电脑、仪表盘）
- 当前外观和面板设置可以导出为紧凑链接（`?cfg=<blob>`），以便在多个嵌入式应用中快速共享或重用设置，而无需修改已存储的配置。
- 水箱和拖把消耗计数器（水和拖把面板）
- 一键重置为默认外观和面板设置，不受已保存适配器配置的影响

#### 信息亭/iframe 示例
将 `?gear=0`（隐藏设置）与设置面板中生成的 `?cfg=` 链接组合起来，嵌入一个预配置的只读视图：

```
http://<your-iobroker>:8082/dreame/?gear=0&cfg=<blob>
```

`<blob>` 由小部件设置面板中的“链接”部分生成，并且仅影响该浏览器标签页/嵌入内容——它永远不会覆盖为小部件本身存储的设置。

---

## 割草机（A2、A2 1200 等）
该适配器支持带有专用状态和地图渲染功能的 Dreame 机器人割草机。状态采用延迟创建方式——对象树中仅显示设备实际上报的属性。

### 割草机状态
| 状态 | 描述 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 状态 | 割草机状态（1=割草中，2=待机，3=暂停，5=返回中，6=充电中，11=测绘中，13=已充电，14=更新中） |
| 故障 | 错误代码 |
| 电池电量 | 电池百分比 |
| 充电状态 | 充电状态 |
| 工作模式 | 当前工作模式 |
| 割草时间 | 当前割草时间（分钟） |
| 割草区域 | 当前割草面积（平方米） |
| 任务状态 | 任务状态 |
| 故障 | 故障详情 |
| 警告状态 | 警告状态 |
| 设置更新 | 通过 MQTT 更改设置（2-51）。值：`[en,hours]`=下雨，`0/1`=霜冻，`[en,start,end]`=低速 |
| 区域状态 | 各区域的割草状态 |
| 人工智能障碍物 | 人工智能检测到的障碍物 |
| 自检 | 自检诊断结果 |
| 总割草时间 | 总割草时间（分钟） |
| 总割草次数 | 总割草次数 |
| 防雨 | 防雨设置 (WRP)：`[enabled, wait_hours, sensitivity]` |
| 防雨 | 防雨设置 (WRP)：`[启用，等待时间，灵敏度]` |
| 低速 | 低速夜间模式 (LOW): `[enabled, start_min, end_min]` |
| dnd-settings | 请勿打扰设置 (DND): `[enabled, start_min, end_min]` |
| 电池配置 | 电池配置 (BAT): `[return%, max%, charge_en, ?, start, end]` |
| 电池配置 | 电池配置 (BAT): `[return%, max%, charge_en, ?, start, end]` |
| 音量 | 音量（VOL）：0-100 |
| child-lock-cfg | 儿童锁 (CLS)：0=关闭，1=开启 |
| ai-obstacle-cfg | AI避障（AOP）：0=关闭，1=开启 |
| 前大灯 | 前大灯设置（点亮）：`[enabled, start, end, l1, l2, l3, l4]` |
| 前大灯 | 前大灯设置（点亮）：`[启用，开始，结束，l1，l2，l3，l4]` |
| 草坪保护 | 草坪保护（PROT）：0=关闭，1=开启 |
| 刀片运行小时数 | 刀片运行小时数（最多 100 小时） |
| 刀刃生命值 | 刀刃生命值 0-100% |
| 刷机运行时间 | 刷机运行时间（最多 500 小时） |
| 刷子健康状况 | 刷子健康状况 0-100% |
| 机器人维护工时 | 机器人维护工时（最多 60 小时） |
| 机器人维护健康状况 | 机器人维护健康状况 0-100% |
| 防碰撞 | 防碰撞（自动切换 LessColl）：0=关闭，1=开启 |
| 补光灯 | 补光灯（自动切换补光灯）：0=关闭，1=开启 |
| clean-genius | CleanGenius（自动切换智能主机）：0=关闭，1=例行清洁，2=深度清洁 |
| 清洁路线 | 清洁路线（自动切换清洁路线）：1=标准，2=强力，3=深度，4=快速 |
| 更宽的角落 | 更宽的角落覆盖范围（自动切换精细旋转）：0=关闭，1=高频，7=低频 |
| 地面方向 | 地面方向清洁（自动切换材质清洁方向）：0=关闭，1=开启 |
| 宠物专用 | 宠物专用清洁（自动切换宠物部位清洁）：0=关闭，1=开启 |
| 自动充电 | 自动充电（AutoSwitch SmartCharge）：0=关闭，1=开启 |
| 切削高度 | 切削高度（毫米）（预） |
| 障碍物距离配置 | 障碍物距离（毫米）（PRE） |
| 割草模式 | 割草模式（预设）：0=标准，1=高效 |
| 方向改变 | 方向改变（预设）：0=自动，1=关闭 |
| 边缘修剪 | 边缘修剪（预设）：0=关闭，1=开启 |
| 边缘检测 | 边缘检测（前置）：0=关闭，1=开启 |

#### 位置和任务数据（二进制协议，实时）
这些状态由 MQTT 二进制消息填充，并且是延迟创建的——它们只在割草机发送其第一个二进制更新后才会出现。

**来自机器人位置数据包（siid 1-5）：**

| 状态 | 描述 |
| -------------------- | ------------------------------------------------------------------ |
| 机器人位置 | 当前机器人位置 JSON：`{"x":..., "y":..., "angle":...}` |
| 割草进度 | 当前任务进度 (%) |
| 已修剪区域 | 本次任务完成的面积（平方米） |
| 割草任务 | 完整任务数据 JSON：`{regionId, taskId, percent, total, finish}` |
| 割草任务 | 完整任务数据 JSON：`{regionId, taskId, percent, total, finish}` |

**来自设备遥测数据包（siid 1-1）：**

| 状态 | 描述 |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| 底座位置 | 底座/充电器位置 JSON：`{"x":..., "y":..., "angle":...}`（对接时更新） |
| 对接状态 | 在站 / 出站 / 暂停对接 / 完成对接 / 对接失败 / 在基地对接 |
| 位置状态 | 位置状态（0-3） |
| battery-level-live | 基于二进制遥测数据的实时电池电量百分比 |
| 充电状态 | 实时充电：0=未充电，1=正在充电 |
| wifi-rssi | WiFi 信号强度 (dBm) |
| lte-rssi | LTE 信号强度 (dBm) |
| ble-rssi | 蓝牙信号强度 (dBm) |
| error-code-binary | 来自二进制遥测的原始错误代码 |
| 引脚状态 | 引脚状态（0/1） |
| 脱离停靠 | 脱离停靠标志 (0/1) |
| 相机状态 | 相机状态 |

### 割草机遥控器
| 状态 | 描述 |
| ----------------------- | ------------------------------------------------------------------------ |
| 开始割草 | 开始割草（按钮） |
| 停止割草 | 停止割草（按钮） |
| 暂停割草 | 暂停割草（按钮） |
| 开始充电 | 返回充电座（按钮） |
| start-mow-ext | 开始自定义割草（带参数的区域/分段清洁） |
| 清除警告 | 清除警告/错误状态（按钮） |
| 避障 | 避障功能开启/关闭 |
| 人工智能检测 | 人工智能检测开启/关闭 |
| 儿童锁 | 儿童锁开启/关闭 |
| 请勿打扰开/关 |
| 勿扰模式开始/结束 | 勿扰模式时间范围 |
| 日程安排 | 割草日程安排 |
| 设置防雨保护 | 设置防雨保护：`{"value":1,"time":8,"sen":0}` 或 `{"value":0}` |
| 设置低速 | 设置夜间低速：`{"value":1,"time":[1200,480]}` 或 `{"value":0}` |
| 设置勿扰模式 | 设置勿扰模式：`{"value":1,"time":[1200,480]}` 或 `{"value":0}` |
| 设置勿扰模式 | 设置勿扰模式：`{"value":1,"time":[1200,480]}` 或 `{"value":0}` |
| 设置儿童锁 | 设置儿童锁：0=关闭，1=开启 |
| 设置音量 | 设置音量：0-100 |
| set-ai-obstacle | 设置 AI 避障：0=关闭，1=开启 |
| 设置前大灯 | 设置前大灯：`{"value":1,"time":[480,1200],"light":[1,1,1,1]}` |
| 设置前大灯 | 设置前大灯：`{"value":1,"time":[480,1200],"light":[1,1,1,1]}` |
| 设置路径显示 | 设置路径显示：0=关闭，1=开启 |
| 重置耗材 | 重置耗材：`{"value":[0,brush,robot]}` |
| 重置消耗品 | 重置消耗品：`{"value":[0,刷子,机器人]}` |
| 查找机器人 | 查找机器人（播放声音，按钮） |
| 锁定机器人 | 锁定机器人（按钮） |
| 获取地图 | 从设备获取地图（按钮） |
| generate-3dmap | 生成 3D 激光雷达地图（按钮） |
| 自定义命令 | 发送自定义 MIoT 命令 |
| 设置碰撞避免 | 设置碰撞避免（自动切换）：0=关闭，1=开启 |
| 设置补光灯 | 设置补光灯（自动切换）：0=关闭，1=开启 |
| 设置 CleanGenius | 设置 CleanGenius（自动切换）：0=关闭，1=例行清洁，2=深度清洁 |
| 设置清洁路线 | 设置清洁路线（自动切换）：1=标准，2=强力，3=深度，4=快速 |
| 设置自动充电 | 设置自动充电（自动切换）：0=关闭，1=开启 |
| 设置切割高度 | 设置切割高度（毫米）（预设） |
| 设置割草模式 | 设置割草模式（预设）：0=标准，1=高效 |
| 设置边缘修剪 | 设置边缘修剪（预设）：0=关闭，1=开启 |
| 设置边缘检测 | 设置边缘检测（PRE）：0=关闭，1=开启 |
| 设置方向改变 | 设置方向改变（PRE）：0=自动，1=关闭 |
| 割草区域 | 修剪选定区域 — CSV `"1,3"` 或 JSON `"[1,3]"` (o=102) |
| 割草区域 | 割草选定区域 — CSV `"1,3"` 或 JSON `"[1,3]"` (o=102) |
| 割草计划 | 根据已保存的计划开始割草（按钮，o=104） |
| 割草边缘 | 割草轮廓：JSON `{"edge":[[x,y],...]}` (o=101) |
| 割草点 | 割草点区域：JSON `{"area":{...}}` (o=103) |
| 割草点 | 割草点区域：JSON `{"area":{...}}` (o=103) |
| 割草机切换地图 | 切换活动地图（编号，从 0 开始的索引，o=200） |

#### 特定区域割草
地图上定义的每个割草区域都以独立通道的形式显示在 `dreame.0.<did>.mower.map.slot<X>.zone<zoneId>` 下。打开 ioBroker 的对象浏览器，导航到您的割草机，然后导航到 `mower.map`，您将看到每个已存储地图对应一个 `slot0`、`slot1`……。每个槽位包含每个割草区域的一个 `zone<N>` 通道——例如 `slot0.zone1`、`slot0.zone3`。在每个区域内，您会找到 `name`（如应用程序中所示）、`area`（平方米）、`time` 和 `path`。

**`zone`** 后面的数字部分是您要写入 `remote.mow-zone` 的区域 ID。因此，如果树状图如下所示：

```text
dreame.0.<did>.mower.map.slot0.zone1     name = "Front lawn"
dreame.0.<did>.mower.map.slot0.zone3     name = "Back lawn"
dreame.0.<did>.mower.map.slot0.zone5     name = "Side strip"
```

然后：

单区修剪“前院草坪”：

```text
dreame.0.<did>.remote.mow-zone = "1"
```

多区域修剪——修剪“前院草坪”+“后院草坪”+“侧边草坪”：

```text
dreame.0.<did>.remote.mow-zone = "1,3,5"
```

JSON 表单也适用——可用于 Blockly 或 JavaScript 脚本：

```text
dreame.0.<did>.remote.mow-zone = "[1,3,5]"
```

Blockly/JavaScript适配器示例：

```js
setState('dreame.0.' + did + '.remote.mow-zone', '1,3', false);
```

割草机解析列表，开始修剪选定区域，完成后返回停靠点。要中途停止，请按 `stop-mow` (o=2) 或 `pause-mow` (o=4)。如果目标区域位于不同的地图上，则必须先切换地图 (`mow-change-map`)，否则区域 ID 将无法解析。

#### 切换活动地图
如果割草机有多个地图，请在写入区域 ID 之前选择当前激活的地图：

```text
dreame.0.<did>.remote.mow-change-map = 0   // first map
dreame.0.<did>.remote.mow-change-map = 1   // second map
```

### 割草机快捷方式
快捷方式从属性 4-48（base64 编码的名称）中解析。每个快捷方式在 `deviceId.shortcuts.{id}` 下都有自己的通道：

| 状态 | 描述 |
| ------- | ----------------------------------------- |
| 名称 | 解码后的快捷方式名称 |
| 运行中 | 快捷方式当前是否正在运行 |
| 开始 | 启动快捷方式的按钮 |

### 割草机历史
清洁历史记录是从云 API 获取的（最近 20 次割草会话）。

| 状态 | 描述 |
| ------------------ | ------------------------------------------- |
| last-mow-date | 上次割草的日期 |
| 上次割草持续时间 | 上次割草持续时间（分钟） |
| 上次修剪区域 | 上次修剪的面积（平方米） |
| 上次割草完成情况 | 上次割草是否成功完成 |
| history-json | 最近 20 次会话的 JSON 数组 |

### 割草机地图
地图数据是通过 Dreame iotuserdata API 获取的（而不是像吸尘器那样通过 MQTT 获取）。

| 状态 | 描述 |
| -------------- | -------------------------------------- |
| 地图图像 | 以 PNG 格式渲染的地图（base64 数据 URL） |
| slot0.zone_X | 区域数据（名称、面积、割草时间） |
| 割草路径 | 原始割草路径坐标 |
| 设置 | 各区域的割草设置 |
| 日程安排 | 割草日程安排 |
| 3D地图URL | 3D激光雷达地图下载URL（已预先签名） |
| 3D地图生成进度 | 3D地图生成进度（0-100%） |

**地图轮询：** 地图会在适配器启动时以及通过 `fetchMap` 按钮获取。在割草活动期间（状态 1、3、5、11），地图会每 30 秒自动轮询一次，以跟踪割草路径。

**地图渲染：** 需要可选的 `canvas` npm 包。地图显示区域（绿色）、等高线（白色轮廓）、割草路径（黄色）、禁区（红色）和障碍物（红色圆圈）。

**3D激光雷达地图：** 按下`generate-3dmap`按钮，即可触发割草机扫描并上传3D点云地图。下载的文件为PCD（点云数据）文件，可使用CloudCompare或MeshLab等工具查看。进度显示在`3dmap-progress`按钮中。完成后，预先签名的下载URL将写入`3dmap-url`按钮。该URL为临时URL，会在数小时后失效。

#### 割草机自定义命令
通过 `dreame.0.XXXXXX.remote.customCommand`：

```json
{
  "siid": 5,
  "aiid": 9,
  "in": [{ "order": 4, "region": [1], "type": "order" }]
}
```

## 已知局限性
**对象树会逐步填充（延迟状态创建）** 状态仅在设备至少报告过一次相应属性后才会出现。全新安装或适配器重启后，对象树可能在几分钟内看起来不完整——这是预期行为。

**L40s Pro Ultra 及类似型号：部分状态仅在主动使用后才会显示** SIID 4 组（`cleaning-mode` 4-23、`suction-level` 4-4、`water-volume` 4-5）和 SIID 28 组（`wetness-level` 28-1）中的属性只能在设备执行主动清洁操作后才能推送，空闲轮询期间不会推送。

适配器安装或重启后，至少要完成一次清洁周期，这些状态才会显示。

**`cleaning-mode` 部分设备上的原始值** 0.3.18 之前的版本在某些设备（包括 L40s Pro Ultra）上可能会报告原始复合值（例如 5120、5121、5122），而不是文档中规定的 0-3 范围。这是由于适配器无法解码将模式、区域和湿度组合成单个整数的复合编码值所致。自 0.3.18 版本起，该值已正确解码。如果您在更新后仍然看到大于 1000 的原始值，请提交问题报告，并提供您的设备型号和您观察到的原始值。

---

## 翻译
各州名称和描述提供 11 种语言版本：英语、德语、俄语、葡萄牙语、荷兰语、法语、意大利语、西班牙语、波兰语、乌克兰语和简体中文。

`lib/i18n/en.json` 是权威源文件。所有其他语言均通过 `npm run translate` 生成。对非英语翻译的更正应作为 PR 提交到相应的 `lib/i18n/<lang>.json` 文件。

---

## 鸣谢
- **TA2k** — 仓库所有者和原始适配器作者
- **RicardoHipp** — 此组件的地图渲染基于原始地图渲染器（MIT 许可）
- **Sefina-DS (David)** — 共同维护者，组件重建，在线测试
- **社区** — krobipd、flapman、volvodani 以及所有其他报告问题和测试设备的用户

## Changelog
### 0.4.1 (2026-08-03)
- Added Schedules: schedules created in the Dreame app are now parsed into `schedule.<id>.*` states (time, weekdays, type, enabled toggle, per-room or whole-floor settings with translated room names and enum values, linked shortcut for shortcut-type schedules). See [Schedules](#schedules).
- Widget: added a Schedules panel/button showing all schedules in a table with an on/off switch each; schedules pointing at a deleted shortcut show a locked switch instead of silently failing.
- Widget: added a Shortcuts panel — one tile per app shortcut, tap to start it directly.
- Fixed app shortcuts being unavailable on vacuums (previously mower-only); shortcut channels are now rebuilt on adapter restart and cleaned up when deleted in the app.
- Widget: full German/English translation of every panel (Cleaning, Shortcuts, Schedules, Station, Maintenance, Water & Mop, Statistics, Kopf/Fehler status and error text), following the ioBroker system language.
- Widget: individual rows/tiles within a panel can now be hidden, not just whole panels (e.g. hide suction level or moisture on the Cleaning panel).
- Widget: menu width control changed from a slider (which visibly drifted under the pointer while dragging) to a number field with −/+ buttons, matching the existing UI zoom control.
- Widget: fixed a label/input association bug where clicking the "UI zoom"/"Menu width" caption activated the adjacent minus button instead of focusing the field (#104, thanks RicardoHipp).
- Widget: the cleaning-mode tile is no longer locked as soon as any room is selected — testing showed the robot does honour the globally set mode for room cleaning except for the combined vacuum+mop mode (#103, thanks RicardoHipp).
- Widget: removed the unused, never-wired-up Mopp panel placeholder; `configVersion` bumped 5→6 to clean up any leftover `panels.mopp` config entry.
- Retyped six MIoT settings from `boolean` to `number` (auto-dust-collecting, auto-lds-coverage, clean-carpets-first, silent-drying, hair-compression, mopping-with-detergent) — devices reporting a value outside 0/1 had those silently rejected before. Thanks to krobipd for the analysis.
- Fixed several `map.*` states logging "has no existing object" on first creation (missing `await` before the object was created).
- Named 13 previously raw/unnamed status datapoints (mop pad and dirty water tank consumables, firmware/MCU version, cleaning-related flags, camera light, current city, cleaning mode) after cross-checking them against another adapter on the same hardware. Thanks to krobipd.
- Decoded `status.error` (previously a raw numeric code) into readable, translated text for 98 error codes, cross-checked against two independent sources. Thanks to krobipd.
- Added a fallback so `status.state`/`status.battery-level` still populate on models whose regular status poll omits them (e.g. Aqua10 Ultra / r95475). Thanks to krobipd.
- Added `remote.go-to-point` (x/y/use-current-position/start): send the robot to a stored map coordinate to look around, without cleaning on the way. Thanks to krobipd.
- Added per-device `info.online` reachability state with one log line per online/offline transition, replacing silent timeout logging.
- Bumped `pako` (map data compression) from 2.x to 3.x.

### 0.4.0 (2026-07-31)
- Modular widget rebuild: customizable appearance (light/dark/main-color/custom themes), configurable panels, kiosk mode with URL-based configuration sharing, robot switcher for multi-device setups.

### 0.3.26 (2026-07-20)
- Fixed stream-status (siid 10001 piid 1) type warning: the value is a streaming-session object, not a number - state declaration corrected to type string / role json, matching the convention used for dnd-task, task-info and zone-status (#82). The boolean type mismatch reported by flapman on remote.auto-dust-collecting, mopping-with-detergent, hair-compression, silent-drying, auto-lds-coverage and clean-carpets-first is already covered by the boolean coercion added in 0.3.25 - please update. Thanks to krobipd for reporting the exact device payload and preparing the fix.

### 0.3.25 (2026-07-20)
- Fixed room-specific cleaning settings being written to the wrong room (cleanset used RoomOrder instead of the real room id) (#95). Fixed boolean switches being rejected by the device - values are now sent as 1/0 (#94). Fixed adapter reboot loop on devices without a generated map, e.g. MOVA Z70 (#83). Fixed multi-room cleaning only cleaning the first selected room on 5th gen devices. Fixed swapped cleaning modes (vacuum/vacuum+mop) on devices with liftable mop pads. Fixed stream-status type warning (#82). German translation: renamed dining hall segment from Speisesaal to Esszimmer. Thanks to RicardoHipp for reporting and analyzing several of these issues.

### 0.3.24 (2026-07-01)
- Fixed custom room cleaning bug where switching active-map without touching a checkbox left customCommand holding room IDs from the previously selected map, causing the robot to clean the wrong room (room segment IDs are not unique across maps). customCommand is now rebuilt automatically whenever active-map changes, and is recomputed fresh from the active map's checkboxes immediately before every start as a final safeguard. Start is now aborted with a warning if no room is selected for the active map.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 TA2k <tombox2020@gmail.com>

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