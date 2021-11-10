---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/objectsschema.md
title: 核心理念
hash: Q2THTK6k9JASAaTUU7igwi6tN3LRWYgdBVXM7LjCO1o=
---
# 核心概念
ioBroker 中有两种根本不同的数据类型。所谓的**状态**（`states`）和**对象**。

对象代表很少变化和更大的数据，如系统设备、配置和附加文件的元数据。每个对象都必须有一个属性“类型”。有关哪些对象类型可用以及特定类型的对象需要哪些强制属性的更多信息，请参见下文。适配器模块为您提供了 setObject、getObject 等函数。

状态代表系统中经常变化的数据，例如 f.e.如果灯打开或关闭，如果运动探测器检测到一些运动，客厅的温度或是否按下了遥控器的按钮。与对象相反，状态可用于触发操作，状态可创建历史数据。为了处理状态，适配器模块中有几个函数，如 setState、getState 等。

对于每个状态，还必须存在具有 `type=state` 的相应对象。

以下章节描述了数据库架构。

## ID
ID 是一个最大长度为 240 字节的字符串，具有层次结构，级别由点分隔。

禁止在 ID 中使用以下字符：`._\\-/ :!#$%&()+=@^{}|~`。

ID有不同的级别。每个级别由点决定。示例：`system.adapter.admin.0`

- `system` - 是系统对象的命名空间
- `adapter` - 适配器配置的命名空间
- `admin` - 适配器名称
- `0` - 适配器实例

或其他示例 `hm-rpc.1.ABC110022.2.VALUE`：

- `hm-rpc` - 是适配器的名称
- `1` - 适配器实例
- `ABC110022` - 设备地址
- `2` - 频道名称
- `VALUE` - 状态名称

## 命名空间
* `system.` - 系统对象和状态
* `system.host.` - 控制器进程
* `system.config.` - 系统设置，如默认语言
* `system.meta.` - 系统元数据
* `system.user.` - 用户
* `system.group.` - 组
* `system.adapter.<adapter-name>` - 适配器的默认配置
* `<adapter-name>.` - 特定适配器的对象。
* `<adapter-name>.meta.` - 此适配器的所有实例使用的公共元数据
* `<adapter-name>.<instance-number>.` - 一个适配器实例命名空间
* `enum.` - 枚举
* `history.` - 历史数据
* `scripts.` - 脚本引擎脚本
* `scripts.js.` - javascript 脚本引擎脚本
* `scripts.py.` - python 脚本引擎脚本（未来）

### 命名空间 system.config。
```
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
        "activeRepo": "online1",    // active repository
        "listRepo": {               // list of possible repositories
            "default": "conf/sources-dist.json",
            "online1": "https://raw.githubusercontent.com/ioBroker/ioBroker.nodejs/master/conf/sources-dist.json"
        }
    }
}
```

### 命名空间 system.host.<hostname>
```
{
    _id:   id,
    type: 'host',
    common: {
        name:       id,
        process:    title,           // iobroker.ctrl
        version:    version,         // Vx.xx.xx
        platform:   'javascript/Node.js',
        cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
        hostname:   hostname,
        address:    ipArr,
        defaultIP:  ???
    },
    native: {
        process: {
            title:      process.title,
            pid:        process.pid,
            versions:   process.versions,
            env:        process.env
        },
        os: {
            hostname:   hostname,
            type:       os.type(),
            platform:   os.platform(),
            arch:       os.arch(),
            release:    os.release(),
            uptime:     os.uptime(),
            endianness: os.endianness(),
            tmpdir:     os.tmpdir()
        },
        hardware: {
            cpus:       os.cpus(),
            totalmem:   os.totalmem(),
            networkInterfaces: os.networkInterfaces()
        }
    }
};
```

<a id="states"></a>

＃＃ 状态
getState 方法和 stateChange 事件传递一个具有除 expire 之外的所有属性的对象

对于 `setState` 方法，除 `val` 之外的所有内容都是可选的，`from` 由 `setState` 方法自动设置。 `ack`默认为false，`ts`和`lc`按预期设置

请务必注意，必须使用 `JSON.stringify()` 序列化类型为数组、对象、混合或文件的状态值。

getState/stateChange/setState 对象的属性：

* `val` - 实际值 - 可以是任何 JSON 类型 -“可编码”
* `ack` - 一个布尔标志，指示目标系统是否已确认该值
* `ts` - 一个 unix 时间戳，指示状态的最后更新（以毫秒为单位）
* `lc` - 一个 unix 时间戳，指示状态实际值的最后更改（以毫秒为单位）
* `from` - 执行 `setState` 的适配器实例
* `user` - 用户名，设置值
* `expire` - 一个整数值，可用于设置在给定秒数后过期的状态。可以与 `setValue` 一起使用。值过期后，从redisDB中消失。
* `c` - 对此状态更改的注释。
* `q` - 质量。具有以下状态的编号：

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x20 - 00100000 - substitute initial value
  0x40 - 01000000 - substitute value from device or instance
  0x80 - 10000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

每个 *state* 必须由包含状态元数据的 state 类型对象表示。见下文。

## 对象
### 强制属性
每个对象中都必须存在以下属性：

* `_id`
* `type` - 有关可能的值，请参见下文
* `common` - 一个包含 ioBroker 特定抽象属性的对象
* `native` - 一个包含目标系统全等属性的对象

### 可选属性
* `common.name` - 对象的名称（可选但严格建议填写）

###树结构
树结构是按名称自动组装的。例如。 ```system.adapter.0.admin``` 是 `system.adapter.0.admin.uptime` 的父项。将此命名约定与点“.”一起用作级别的分隔符。

### 对象类型
* `state` - 父级应该是通道、设备、实例或主机类型
* `channel` - 对一个或多个状态进行分组的对象。父母应该是设备。
* `device` - 对一个或多个通道或状态进行分组的对象。除了适配器实例命名空间之外，应该没有父级。
* `enum` - 在 common.members 中保存指向状态、通道、设备或文件的数组的对象。枚举可以有一个父枚举（树结构可能）
* `host` - 运行控制器进程的主机
* `adapter` - 适配器的默认配置。存在还表明适配器已成功安装。 （建议：应该有一个属性来保存安装它的主机数组）
* `instance` - 适配器的实例。父级必须是适配器类型
* `meta` - 很少改变适配器或其实例需要的元信息
* `config` - 配置
* `script` - 脚本
* `user` - 用户
* `group` - 组
* `chart` - 图表
* `folder` - 一堆设备或可能是其他东西。

#### 特定对象类型的属性
＃＃＃＃＃ 状态
属性：

* `common.type`（可选 - （默认是混合==任意类型）（可能的值：数字、字符串、布尔值、数组、对象、混合、文件）。作为例外，类型为 `meta` 的对象可能有 `common .type=meta.user` 或 `meta.folder`。需要注意的是数组、对象、混合和文件必须使用 JSON.stringify() 进行序列化。
* `common.min`（可选）
* `common.max`（可选）
* `common.step` (可选) - 增加/减少间隔。例如。 0.5 用于恒温器
* `common.unit`（可选）
* `common.def`（可选 - 默认值）
* `common.defAck`（可选 - 如果设置了 common.def，则此值用作 ack 标志，js-controller 2.0.0+）
* `common.desc`（可选，字符串或对象）-描述，多语言描述的对象
* `common.read` (boolean, 强制) - 如果状态可读则为真
* `common.write` (boolean, 强制) - 如果状态可写则为真
* `common.role`（字符串，强制） - 状态的角色（在用户界面中用于指示选择哪个小部件，见下文）
* `common.states`（可选）类型为可能状态对象的属性 `{'value': 'valueName', 'value2': 'valueName2', 0: 'OFF', 1: 'ON'}`或（从 admin5 支持）一个状态数组，如`['Start', 'Flight', 'Land']`
* `common.workingID`（字符串，可选） - 如果此状态具有辅助状态 WORKING。如果前几部分与实际相同，这里必须写全名或只写最后一部分。用于 HM.LEVEL 并且通常具有值“WORKING”
* `common.custom`（可选）- 具有特定适配器的自定义设置的结构。像 `{"influxdb.0": {"enabled": true, "alias": "name"}}`。 `enabled` 属性是必需的，如果它不是 true，则整个属性将被删除。

##### 状态 `common.history`
History 函数需要 history 适配器或任何其他类型为 history 的存储适配器

当达到最大值时，fifo 长度减少到最小值。设置为 null 或保留 undefined 以使用默认值

有关传输列表，请参阅历史适配器自述文件

* `common.history`（可选）
* `common.history.<HISTORY-INSTANCE>.changesOnly`（可选，布尔值，如果为 true，则仅记录值更改）
* `common.history.<HISTORY-INSTANCE>.enabled`（布尔值）

##### 状态 `common.role`
* `common.role`（指示该状态应如何在用户界面中表示）

[可能的值](stateroles.md)

＃＃＃＃ 渠道
#####频道`common.role`（可选）
建议：通道对象 common.role 应该/可能暗示一组强制和/或可选的状态子对象

可能的值：

* `info` - 货币或股票价格、燃料价格、邮箱插入和类似的东西
*`日历`-
* `forecast` - 天气预报

* `media - 公共媒体频道
* `media.music` - 媒体播放器，如 SONOS、YAMAHA 等
* `media.tv` - 电视
* `media.tts` - 文本到语音

* `thermo` - 监控或控制温度、湿度等
*`热.热`
* `thermo.cool`

* `blind` - 百叶窗控制

*`光`
* `light.dimmer` - 调光器
* `light.switch` - 灯开关。
* `light.color` - 具有变色能力的灯光控制
* `light.color.rgb` - 在 RGB 中设置颜色
* `light.color.rgbw` - 在 RGBW 中设置颜色
* `light.color.hsl` - 在色调/饱和度/亮度中设置颜色（色调颜色光 - LivingColors...）
* `light.color.hslct` - 在色相/饱和度/亮度或色温（色相扩展色光）中设置颜色
* `light.color.ct` - 色温 K

* `switch` - 一些通用开关

* `sensor` - 例如门窗触点、漏水传感器、火灾传感器
* `sensor.door` - 打开，关闭
* `sensor.door.lock` - 打开、关闭、锁定
* `sensor.window` - 打开，关闭
* `sensor.window.3` - 打开、倾斜、关闭
* `sensor.water` - true（警报），false（无警报）
* `sensor.fire` - true（警报），false（无警报）
* `sensor.CO2` - 真（警报），假（无警报）

*

* `alarm` - 一些警报

* `phone` - fritz box、speedport 等

* `button` - 像墙壁开关或电视遥控器，其中每个按钮都是一种状态，如 .play、.stop、.pause
* `remote` - 带有状态的电视或其他遥控器是带有按下值的字符串，例如“播放”、“停止”、“暂停”

* `meta` - 关于设备的信息
* `meta.version` - 设备版本
* `meta.config` - 从设备配置
* ...

#### 频道说明
~~属性的名称可以由适配器自由定义，除了**粗体**字体。~~

"W" - common.write=true

“M” - 强制性

##### 每个通道/设备的可选状态
```javascript
// state-working (optional)
{
   "_id": "adapter.instance.channelName.stateName-working", // e.g. "hm-rpc.0.JEQ0205612:1.WORKING"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.working"     // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-direction (optional). The state can have following states: "up"/"down"/""
{
   "_id": "adapter.instance.channelName.stateName-direction", // e.g. "hm-rpc.0.JEQ0205612:1.DIRECTION"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   "",                     // optional,  default ""
       "type":  "string",               // optional,  default "string"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "role":  "direction"             // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-maintenance (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance", //e.g. "hm-rpc.0.JEQ0205612:1.MAINTENANCE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance" // mandatory
       "desc":  "Problem description"   // optional,  default undefined
   }
}
,
// state-maintenance-unreach (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance-unreach", //e.g. "hm-rpc.0.JEQ0205612:0.UNREACH"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance.unreach" // mandatory
       "desc":  "Device unreachable"    // optional,  default 'Device unreachable'
   }
}
```

##### `light.switch` - 属性描述
| **姓名** | **common.role** | **米** | **W** | **common.type** | **说明** | ------------- |:----------------------------------------|:-----:| :-----:|-----------------|---

|状态 |开关| X | X |布尔值 |
|说明 |文字说明| | | |
|嗯 |指标.maintenance.mmm | | | | mmm = lowbat 或 unreach 或其他什么 |

```
// SWITCH CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205614:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.switch"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// SWITCH STATES
{
   "_id": "adapter.instance.channelName.state-switch", // e.g. "hm-rpc.0.JEQ0205614:1.STATE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "role":  "switch"                // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `light.dimmer` - 属性描述
```
// DIMMER CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205612:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.dimmer"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// DIMMER STATES
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205612:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.dimmer"          // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-working",             // optional
//            "adapter.instance.channelName.state-direction",           // optional
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `blind` - 属性描述
```
// BLIND CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205615:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
      "role":  "blind"                 // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// BLIND STATES
// Important: 0% - blind is fully closed, 100% blind is fully opened
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205615:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.blind"           // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
```

##### `phone` - 属性描述
| **姓名** | **common.role** | **米** | **W** | **common.type** | **说明** | `ringing_number` | `text.phone_number` | | | `string` |

| `ringing` | `indicator` | | | `boolean` |
| `铃声` | `指标` | | | `布尔` |

...

＃＃＃＃ 设备
#### 枚举
* `common.members` -（可选）枚举成员 ID 数组

####元
ID

 * `*<adapter-name>.<instance-number>.meta.<meta-name>*`
 * `*<适配器名称>.meta.<元名称>*`
 * `system.*meta.<meta-name>*`

＃＃＃＃ 适配器
ID `system.adapter.<adapter.name>`

*注意：*除特殊标记为**强制**外，所有标志都是可选的。

* `common.adminColumns` - 自定义属性，必须在对象浏览器的管理员中显示。如：`[{"name": {"en": "KNX address"}, "path": "native.address", "width": 100, "align": "left"}, {"name": "DPT", "path": "native.dpt", "width": 100, "align": "right", "type": "number", "edit": true, "objTypes": ["state" ，“频道”]}]`。 `type` 是属性的一种类型（例如字符串、数字、布尔值），只有在启用编辑时才需要。 `objTypes` 是一个对象类型列表，可能具有这样的属性。也仅用于编辑模式。
* `common.adminTab.fa-icon` - TAB 的字体很棒的图标名称。
* `common.adminTab.ignoreConfigUpdate` - 如果配置更改，则不更新配置选项卡（以启用选项卡中的配置设置）
* `common.adminTab.link` - 标签中 iframe 的链接。您可以像这样使用参数替换：`http://%ip%:%port%`。 IP 将替换为主机 IP。将从 native.port 中提取“端口”。
* `common.adminTab.name` - 管理中的 TAB 名称
* `common.adminTab.singleton` - [true/false] 如果适配器有管理员的选项卡。将仅显示所有实例的一个选项卡。
* `common.allowInit` - [true/false] 如果设置更改或适配器启动，则允许将“预定”适配器称为“不在时间表内”。或者在配置更改后允许计划的适配器启动一次，然后按计划启动。
* `common.availableModes` - `common.mode` 的值，如果可能有多种模式
* `common.blockly` - [true/false] 如果适配器具有用于 blockly 的自定义块。 （需要 admin/blockly.js）
* `common.connectionType` - 与设备的连接类型：`local/cloud`。参见`common.dataSource`。
* `common.compact` - 告诉控制器如果需要，这个适配器可以在同一进程中启动
* `common.config.height` - 配置对话框的默认高度（不推荐使用 - 仅对 admin2 有效）
* `common.config.minHeight` - 配置对话框的最小高度（不推荐使用 - 仅对 admin2 有效）
* `common.config.minWidth` - 配置对话框的最小宽度（不推荐使用 - 仅对 admin2 有效）
* `common.config.width` - 配置对话框的默认宽度（不推荐使用 - 仅对 admin2 有效）
* `common.dataFolder` - 与适配器存储数据的 iobroker-data 相关的文件夹。该文件夹将被自动备份和恢复。您可以在其中使用变量 `%INSTANCE%`。
* `common.dataSource` - 如何从设备接收数据：`poll/push/assumption`。它与 `connectionType` 一起很重要。
* `common.disableDataReporting` - 不要通过 `sentry` 为这个实例报告错误
* `common.dependencies` - 类似 `[{"js-controller": ">=2.0.0"}]` 的数组，描述了同一主机上此适配器需要哪些 ioBroker 模块。
* `common.docs` - 结构如 `{"en": "docs/en/README.md", "de": ["docs/de/README.md", "docs/de/README1.md" ]}` 描述文档，如果不在 `README.md` 中
* `common.enabled` - **mandatory** [true/false] 值应为 false，因此默认情况下禁用新实例
* `common.engineTypes` - 已弃用。在 package.json 中使用引擎
* `common.eraseOnUpload` - 上传前擦除目录中的所有先前数据
* `common.expert` - 仅在管理员的专家模式下显示此对象
* `common.extIcon` - 链接到已卸载适配器的外部图标。通常在github上。
* `common.getHistory` - [true/false] 如果适配器支持 getHistory 消息
* `common.globalDependencies` - 类似 `[{"admin": ">=2.0.0"}]` 的数组，描述其中一台主机上的此适配器需要哪些 ioBroker 模块。
* `common.icon` - 本地图标的名称（应该位于子目录“admin”中）
* `common.installedVersion` - 不要使用它，只会在内部设置
* `common.ignoreVersion` - 不显示此特定版本的此适配器的更新图标
* `common.jsonConfig` - 此适配器支持 admin5 并提供 admin/jsonConfig.json 与配置对话框布局的描述
* `common.jsonCustom` - 此适配器支持 admin5 并提供 admin/jsonCustom.json 与自定义设置布局的描述
* `common.keywords` - 类似于 package.json 中的关键字，但可以用多种语言定义。只是一个数组。
* `common.localLinks` - 链接到此适配器的 Web 服务。例如。从管理员到 http://localhost:5984/_utils 获取蒲团
* `common.localLink` - 已弃用。使用`common.localLinks`。
* `common.loglevel` - 调试、信息、警告或错误
* `common.logTransporter` - 如果此适配器从其他主机和适配器接收日志（例如将它们存储在某处）
* `common.main` - **已弃用** 在 package.json 中使用 main。
* `common.materializeTab` - 如果适配器支持 > admin3 选项卡（实体化样式）
* `common.materialize` - 如果适配器支持 > admin3 (materialize style)
* `common.messagebox` - 如果支持消息框，则为真。如果是，将创建对象 system.adapter.&lt;adapter.name&gt&lt;adapter.instance&gt.messagebox 以将消息发送到适配器（用于电子邮件，pushover，...；
* `common.mode` - **强制性** 可能的值见下文
* `common.name` - **强制性** 适配器名称，不带“ioBroker”。
* `common.noConfig` - [true/false] 例如不显示配置对话框
* `common.noIntro` - 永远不会在管理员的介绍/概览屏幕上显示此适配器的实例（如图标、小部件）
* `common.noRepository` - [true/false] 如果适配器随初始安装交付或有自己的存储库
* `common.nogit` - 如果为 true，则无法直接从 github 安装
* `common.nondeletable` - [true/false] 这个适配器不能被删除或更新。它将与控制器一起更新。
* `common.npmLibs` - 已弃用。使用 package.json `dependencies`。
* `common.onlyWWW` - [true/false] 告诉控制器，那个适配器只有 html 文件，没有 main.js，就像人力车
* `common.osDependencies.darwin` - 此适配器所需的 OSX 包数组
* `common.osDependencies.linux` - 这个适配器需要的 debian/centos 包数组（当然只有带有 apt、apt-get、yum 作为包管理器的操作系统）
* `common.osDependencies.win32` - 未使用，因为 win32 没有包管理器
* `common.os` - 支持的操作系统的字符串或数组，例如[“Linux”，“达尔文”]
* `common.platform` - **mandatory** 可能的值：Javascript/Node.js，更多
* `common.pugins.sentry` - 带有 `sentry` 插件配置数据的结构
* `common.preserveSettings` - 字符串（或数组）具有实例的公共属性名称，不会被删除。例如。 "history"，所以通过 setState('system.adapter.mqtt.0", {..}) 即使新对象没有这个字段，字段 common.history 也不会被删除。要删除属性，它必须明确用 ```common:{history: null}``` 完成。
* `common.readme` - 自述文件的 URL
* `common.restartAdapters` - 安装此适配器后必须重新启动的适配器名称数组，例如[“可见”]
* `common.restartSchedule` - CRON 计划重启模式`daemon` 适配器
* `common.schedule` - 如果适配器以 `schedule` 模式运行，则 CRON 计划。
* `common.serviceStates` - [true/false or path] 如果适配器可以提供额外的状态。如果是，路径adapter/lib/states.js 将被调用并给出以下参数函数（对象、状态、实例、配置、回调）。该函数必须提供具有如下值的点数组： function (err, result) { result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
* `common.singletonHost` - 适配器只能在一台主机上安装一次
* `common.singleton` - 适配器在整个系统中只能安装一次
* `common.stopBeforeUpdate` - [true/false] 如果适配器必须在更新前停止
* `common.stopTimeout` - 以毫秒为单位的超时等待时间，直到适配器关闭。默认 500 毫秒。
* `common.subscribable` - 必须使用 sendTo 订阅此适配器的变量才能启用更新
* `common.subscribe` - 变量名，自动订阅
* `common.supportCustoms` - [true/false] 如果适配器支持每个状态的设置。它必须在管理员中有 custom.html 文件。示例可以在 ioBroker.history 中找到
* `common.supportStopInstance`- [true/false] 如果适配器支持信号 stopInstance（**messagebox** 需要）。信号将在停止前发送到适配器。 （在 SIGTERM 出现问题时使用）
* `common.titleLang` - **强制性** 在所有支持的语言中的更长的适配器名称，例如 {en: 'Adapter', de: 'adapter', ru: 'Драйвер'}
* `common.title` -（不推荐使用）在管理员中显示的更长的适配器名称
* `common.type` - 适配器类型。见[类型](adapterpublish.md)
* `common.unchanged` - （系统）请不要使用这个标志。这是一个通知系统的标志，必须在管理员中显示配置对话框。
* `common.unsafePerm` - [true/false] 如果必须使用 `npm --unsafe-perm` 参数安装包
* `common.version` - **强制**可用版本
* `common.wakeup` - 如果将一些值写入 `system.adapter.NAME.x.wakeup`，适配器将启动。通常适配器应该在处理完事件后停止。
* `common.webByVersion` - 在网络适配器中显示版本作为前缀（通常 - ip:port/material，webByVersion - ip:port/1.2.3/material）
* `common.webExtendable` - [true/false] 如果此适配器中的 Web 服务器可以使用插件/扩展（如代理、简单 API）进行扩展
* `common.webExtension` - 连接网络扩展的相关文件名。例如。在相对于适配器根目录的 `simple-api` `lib/simpleapi.js` 中。此外，`native.webInstance` 需要说明此扩展将包含在何处。 Empty 表示它必须作为自己的 Web 服务运行。 “*”表示每个 Web 服务器都必须包含它。
* `common.webPreSettings` - webServer 适配器必须包含在 info.js 中的参数列表。 （示例材料）
* `common.webservers` - 应该提供来自适配器的 www 文件夹的内容的 Web 服务器实例数组
* `common.welcomeScreen` - 页面数组，应该显示在“web” index.html 页面上。 ["vis/edit.html", "vis/index.html"] 或 [{"link": "vis/edit.html", "name": "Vis editor", "img": "vis/img/ edit.png", "color": "blue"}, "vis/index.html"]
* `common.welcomeScreen.order` - 待办事项
* `common.welcomeScreenPro` - 与 `common.welcomeScreen` 相同，但只能通过 ioBroker.cloud 访问使用。
* `common.wwwDontUpload` - 不要将 www 目录上传到数据库中。仅用于管理员。您可以将目录命名为其他名称，然后确定。
* `protectedNative` - 只能由自己的适配器访问的配置属性数组，例如`[“密码”]`
* `encryptedNative` - 配置属性数组，当通过管理配置页面存储时将自动加密，并在适配器运行时自动解密，例如`[“密码”，“令牌”]`
* `native` - 可以在 `index_m.html` 和运行时通过 `adapter.config.<attribute>` 访问的预定义属性，例如`{“端口”：1234，“密码”：“秘密”}`

＃＃＃＃ 实例
id *system.adapter.<adapter.name>.<instance-number>*

* `common.host` - 适配器应该在其中启动的（强制性）主机 - 对象 *system.host.&lt;host&gt;* 必须存在
* `common.enabled` - （强制）
* `common.mode` -（强制）可能的值见下文

##### 适配器/实例 common.mode
* `none` - 此适配器不启动进程
* `daemon` - 始终运行的进程（如果进程退出将重新启动）
* `subscribe` - 当状态 *system.adapter.<adapter-name>.<instance-number>.alive* 更改为 *true* 时启动。当 *.alive* 更改为 *false* 时被终止，如果进程退出，则将 *.alive* 设置为 *false*（当进程退出时**不会**重新启动）
* `schedule` - 由在 *system.adapter.<adapter-name>.<instance-number>.schedule* 中找到的调度启动 - 通过重新调度新状态对 *.schedule* 的变化做出反应
* `once` - 每次 system.adapter.yyy.x 对象改变时都会启动这个适配器。终止后不会重新启动。
* `extension` - 这个适配器不会被 `js-controller` 启动，而是会被 web 实例启动。 Web 实例可以在 `native.webInstance` 中定义为“*”（如果在每个 Web 中）或特定 Web 实例的 `web.x`。 （例如：`相机，代理`）。此外，在`common.webExtension` 中必须提供插件文件的路径。

＃＃＃＃ 主持人
ID `system.host.<host>`

* `common.name` - f.e. `system.host.banana`
* `common.process`
* `common.version`
* `common.platform`
*`common.cmd`
* `common.hostname` - f.e. `香蕉`
* `common.address` - IP 地址字符串数组

#### 配置
＃＃＃＃ 脚本
* `common.platform` -（强制）可能的值 `Javascript/Node.js`（更多）
* `common.enabled` -（强制）脚本是否激活
* `common.source` -（强制）脚本源
* `common.engine` -（可选）*脚本引擎* 应该运行这个脚本的实例（例如'javascript.0'） - 如果省略引擎被自动选择

#### 用户
* `common.name` -（强制）用户名（区分大小写）
* `common.password` -（强制）密码的 MD5 哈希

＃＃＃＃ 团体
* `common.name` -（强制）组名
* `common.members` -（强制）用户对象 ID 数组
* `common.desc` -（可选）组目的描述