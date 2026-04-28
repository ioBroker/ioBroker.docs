---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dreame/README.md
title: ioBroker.dreame
hash: g1QuOY4iiAVrnM10uAngpzgiBrH37ampgmcsBgKUfUg=
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

## IoBroker 的 dreame 适配器
适用于 Dreame 和 MOVA 扫地机器人和割草机器人的适配器。

**支持的品牌：** Dreame、MOVA（请在适配器设置中选择）

**测试机型：** L10、L20、X40、A2 1200（割草机）、MOVA 600、MOVA 1000

---

＃＃ 配置
| 设置 | 描述 |
| --- | --- |
| 云服务 | 根据您的应用选择 **Dream** 或 **MOVA** |
| 应用邮箱 | 您的 Dreame/MOVA 应用登录邮箱 |
| 应用密码 | 您的 Dreame/MOVA 应用密码 |
| 获取地图 | 启用地图渲染（CPU占用率较高） |
| 更新间隔 | 轮询间隔（分钟） |

MOVA 设备（600、1000）与 Dreame 使用相同的云后端，但域名不同。如果您使用 MOVA 应用，请选择 **MOVA**。

---

## 真空（L10、L20、X40 等）
该适配器为扫地机器人创建专用的状态树，具有命名状态、可写设置和操作按钮。

### 真空状态
| 状态 | 描述 |
| ----- | ----------- |
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
| ----- | ----------- |
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
| ----- | ----------- |
| 净水箱状态 | 0=已安装，1=未安装，2=水位低 |
| 脏水箱状态 | 0=已安装，1=未安装或已满 |
| 防尘袋状态 | 0=已安装，1=未安装，2=检查 |
| 洗涤剂状态 | 洗涤剂状态 |
| 热水状态 | 热水状态 |

＃＃＃＃ 统计数据
| 状态 | 描述 |
| ----- | ----------- |
| 首次清洁日期 | 首次清洁日期（Unix 时间戳） |
| 总清洁时间 | 总清洁时间（分钟） |
| 清洁次数 | 总清洁次数 |
| 总清洁面积 | 总清洁面积（平方米） |

#### 自动切换已解析值
这些信息是从 `auto-switch-settings` JSON 中解析出来的，并作为单独的状态提供：

| 状态 | 描述 |
| ----- | ----------- |
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
| ----- | ----------- |
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
| 湿度等级 | 湿度等级 |
| cleangenius-mode | 0=关闭，1=常规，2=深度清洁 |
| 水温 | 0=冷，1=温，2=热，3=沸腾 |
| 静音烘干 | 静音烘干开/关 |
| 头发压缩 | 头发压缩开关 |
| 使用清洁剂拖地 | 开启/关闭使用清洁剂拖地功能 |

#### 自动切换集命令
这些设置直接写入设备的自动切换设置（属性 4-50）：

| 状态 | 描述 |
| ----- | ----------- |
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
| 状态 | 描述 |
| ----- | ----------- |
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

## 割草机（A2、A2 1200 等）
该适配器支持 Dreame 机器人割草机，具有专用状态和地图渲染功能。

### 割草机状态
| 状态 | 描述 |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
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

### 割草机遥控器
| 状态 | 描述 |
| ---------------------- | ---------------------------------------------------------------------- |
| 开始割草 | 开始割草 |
| 停止割草 | 停止割草 |
| 暂停割草 | 暂停割草 |
| 开始充电 | 返回充电座 |
| start-mow-ext | 开始自定义割草（带参数的区域/分段清洁） |
| 清除警告 | 清除警告/错误状态 |
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

### 割草机快捷方式
快捷方式从属性 4-48（base64 编码的名称）中解析。每个快捷方式在 `deviceId.shortcuts.{id}` 下都有自己的通道：

| 状态 | 描述 |
| ----- | ----------- |
| 名称 | 解码后的快捷方式名称 |
| 运行中 | 快捷方式当前是否正在运行 |
| 开始 | 启动快捷方式的按钮 |

### 割草机历史
清洁历史记录是从云 API 获取的（最近 20 次割草会话）。

| 状态 | 描述 |
| ----- | ----------- |
| last-mow-date | 上次割草的日期 |
| 上次割草持续时间 | 上次割草持续时间（分钟） |
| 上次修剪区域 | 上次修剪的面积（平方米） |
| 上次割草完成情况 | 上次割草是否成功完成 |
| history-json | 最近 20 次会话的 JSON 数组 |

### 割草机地图
地图数据是通过 Dreame iotuserdata API 获取的（而不是像吸尘器那样通过 MQTT 获取）。

| 状态 | 描述 |
| --------------- | ---------------------------------------- |
| 地图图像 | 以 PNG 格式渲染的地图（base64 数据 URL） |
| slot0.zone_X | 区域数据（名称、面积、割草时间） |
| 割草路径 | 原始割草路径坐标 |
| 设置 | 各区域的割草设置 |
| 时间表 | 割草时间表 |
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

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-04-28)

- Fix mower SETTINGS/SCHEDULE parsing: reassemble chunked data before JSON.parse (fixes warning every 30s)
- Fix mower actions: remove dangerous start-zone-mow (was sending DOCK), add pause-mow and clear-warning
- Remove mower stop-mow-ext (no HA equivalent)

### 0.3.6 (2026-04-21)

- Add dedicated vacuum state tree (createVacuumRemotes) with ~85 status, ~32 remote, ~22 AutoSwitch, ~13 action states
- Add vacuum consumable reset buttons (main brush, side brush, filter, sensor)
- Add vacuum AutoSwitch parsing (25 features: auto-drying, collision-avoidance, fill-light, clean-genius, cleaning-route, etc.)
- Add vacuum action buttons (start, pause, stop, return-to-dock, locate, start-washing, start-auto-empty, clear-warning)
- Add vacuum station status (clean/dirty water tank, dust bag, detergent, hot water)
- Add vacuum extended settings (wetness, CleanGenius mode, water temperature, silent drying, hair compression)
- Add 20 new vacuum status enums (draining, dust bag drying, floor maintaining, finding pet, etc.)
- Fix mower return-to-dock command (was siid:3 aiid:1, now correct siid:5 aiid:3)
- Fix mower start-zone-mow was sending DOCK command (siid:2 aiid:3 remapped to siid:5 aiid:3) — removed, use start-mow-ext with params instead
- Fix mower missing pause-mow action — added (siid:5 aiid:4)
- Fix mower missing clear-warning action — added (siid:4 aiid:3)
- Remove mower stop-mow-ext (siid:4 aiid:2, no HA equivalent)
- Fix set_properties method for writable states (was incorrectly sending as action)
- Fix boolean action commands now send in:[] parameter

### 0.3.5 (2026-04-19)

- Add AutoSwitch properties (4-50): collision avoidance, fill light, CleanGenius, cleaning route, auto charging, etc.
- Add PRE mowing preferences: cutting height, obstacle distance, mow mode, edge mowing, edge detection, direction change
- Add shortcuts support (4-48): parsed names, running state, start buttons
- Add cleaning history via cloud API (last 20 mow sessions with date, duration, area, completion)
- Fix battery byte parsing (buf[11] & 0x7F + charging bit 7)

### 0.3.4 (2026-04-19)

- Add mower settings states from getCFG (rain protection, frost protection, low speed, DND, battery config, volume, headlight, AI obstacle, camera, anti-theft, etc.)
- Load all settings on startup and auto-reload on prop.2.51 MQTT trigger
- Add dedicated remote states for setting CFG values (set-rain-protection, set-frost-protection, set-volume, find-robot, lock-robot, etc.)
- Split consumables into individual states (blade-hours, brush-hours, robot-maintenance-hours + health %)
- Add individual consumable reset buttons (reset-blade, reset-brush, reset-robot-maintenance)
- Correct prop.2.51 as generic settings-update trigger (WRP/FDP/LOW)
- Remove invalid cleaning-progress (4-63) from mower states

### 0.3.3 (2026-04-19)

- Parse all mower MQTT binary state fields (battery, error, location, docking, pin, camera, BLE/WiFi/LTE RSSI)
- Parse mower live position from MQTT siid:1 piid:4 (12-bit packed format)
- Parse mower task progress (region, percent, total/finished area)
- Draw robot position and dock on mower map image
- Draw robot, charger, virtual walls, no-go zones and zone names on vacuum map image
- Add siid-piid identifiers to all mower state names
- Fix mower status labels per common_mower_protocol.json
- Add named mower properties (task-info, device-time, zone-status, RTK, GPS satellites, positioning-mode)
- Fetch all siid property values on startup (removed siid<=3 filter)
- Fix undefined deviceArray entry in connectMqtt

### 0.3.2 (2026-04-17)

- Add MOVA brand support (MOVA 600, MOVA 1000)
- Add Cloud Service selector (Dreame/MOVA) in adapter settings
- Centralize API configuration (domain, auth, headers) per brand
- Add mower support (A1, A1 Pro, A2, A2 1200, A3 AWD 1000)
- Dedicated mower states (status, remote, map)
- Mower map rendering via iotuserdata API
- Add 3D LIDAR map generation and download URL
- Add retry logic for API requests
- Fix JSON parsing errors

### 0.2.2 (2025-01-24)

- Reduce CPU load while cleaning

### 0.2.1 (2025-01-15)

- Fix for canvas installation

### 0.2.0 (2024-12-28)

- Add simple maps

### 0.1.1 (2024-12-14)

- Improve error handling

### 0.1.0 (2024-12-14)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2030 TA2k <tombox2020@gmail.com>

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