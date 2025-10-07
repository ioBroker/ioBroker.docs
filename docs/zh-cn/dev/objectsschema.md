---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/objectsschema.md
title: 核心概念
hash: ZrGxXyZrIiTT1Ijp70v86qN2uIcQ5fe+bwvxMACMwzA=
---
# 核心概念
ioBroker 中有两种根本不同的数据类型，即所谓的**状态**（`states`）和**对象**。

对象表示很少更改且较大的数据，例如系统设备、配置和其他文件的元数据。每个对象都必须具有一个“type”属性。有关可用的对象类型以及特定类型的对象需要哪些强制属性的更多信息，请参阅下文。适配器模块为您提供了 setObject、getObject 等函数。

状态表示系统中经常变化的数据，例如，灯是开着还是关着，运动检测器是否检测到运动，客厅的温度，或者遥控器的按钮是否被按下。与对象不同，状态可以用来触发操作，并创建历史数据。适配器模块中提供了一些函数来处理状态，例如`setState`、`getState`等等。

对于每个状态，也必须存在一个与`type=state`相对应的对象。

以下章节描述数据库模式。

## ID
ID是一个最大长度为240字节的字符串，采用层次结构，各层级之间用点分隔。

用于检查 ID 中禁止使用的字符的正则表达式是[这里](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e2dc20d89672ab505a495384c62869987/packages/common/src/lib/common/tools.ts#L137)。

该 ID 有不同级别。每个级别由点号决定。例如：`system.adapter.admin.0`

- `system` - 是系统对象的名称空间
- `adapter` - 适配器配置的命名空间
- `admin` - 适配器名称
- `0` - 适配器实例

或者其他示例`hm-rpc.1.ABC110022.2.VALUE`：

- `hm-rpc` - 是适配器的名称
- `1` - 适配器实例
- `ABC110022` - 设备地址
- `2` - 频道名称
- `VALUE` - 州名称

## 命名空间
* `system.` - 系统对象和状态
* `system.host.` - 控制器进程
* `system.config.` - 系统设置，例如默认语言
* `system.meta.` - 系统元数据
* `system.user.` - 用户
* `system.group.` - 群组
* `system.adapter.<adapter-name>` - 适配器的默认配置
* `<adapter-name>.` - 特定适配器的对象。
* `<adapter-name>.meta.` - 此适配器的所有实例使用的通用元数据
* `<adapter-name>.<instance-number>.` - 适配器实例命名空间
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

### 命名空间 system.host.&lt;hostname&gt;
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

## `getState` 方法和 `stateChange` 事件传递一个包含除 expire 之外所有属性的对象。`setState` 方法中除 `val` 之外的所有属性都是可选的。`from` 由 `setState` 方法自动设置。`ack` 默认为 false，`ts` 和 `lc` 按预期设置。
值得注意的是，类型为`array`、`object`、`mixed` 或`file` 的状态值必须使用`JSON.stringify()` 进行序列化。

`getState/stateChange/setState` 对象的属性：

* `val` - 实际值 - 可以是任何 JSON“可编码”的类型
* `ack` - 一个布尔标志，指示目标系统是否已确认该值
* `ts` - 表示状态最后更新的 UNIX 时间戳（以毫秒为单位）
* `lc` - 表示状态实际值的最后变化的 UNIX 时间戳（以毫秒为单位）
* `from` - 执行 `setState` 的适配器实例
* `user` - 设置值的用户名
* `expire` - 一个整数值，用于设置在指定秒数后过期的状态。只能与 `setValue` 一起使用。值过期后，将从 redisDB 中消失。
* `c` - 对此状态变化的评论。
* `q` - 质量。以下状态的数量：

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

每个“状态”都必须由一个类型为`state`的对象表示，该对象包含该状态的元数据。见下文。

## 对象
### 强制属性
每个对象都必须具有以下属性：

*`_id`
* `type` - 请参阅下文了解可能的值
* `common` - 包含 ioBroker 特定抽象属性的对象
* `native` - 包含目标系统一致属性的对象

### 可选属性
* `common.name` - 对象的名称（可选，但强烈建议填写）

### 树形结构
树形结构由名称自动组装而成。例如，```system.adapter.0.admin``` 是 `system.adapter.0.admin.uptime` 的父级。使用此命名约定，并使用点“.”作为层级分隔符。

### 对象类型
* `state` - 父级应该是通道、设备、实例或主机类型。
* `channel` - 用于对一个或多个状态进行分组的对象。父级应该是一个设备。
* `device` - 用于对一个或多个通道或状态进行分组的对象。除了适配器实例命名空间外，不应有父级。
* `enum` - 在 `common.members` 中保存指向状态、通道、设备或文件的数组的对象。枚举可以有一个父枚举（可以是树结构）
* `host` - 运行控制器进程的主机
* `adapter` - 适配器的默认配置。存在也表明适配器已成功安装。（建议：应该有一个属性，保存安装主机的数组）
* `instance` - 适配器实例。父级必须是适配器类型
* `meta` - 很少改变适配器或其实例所需的元信息
* `config` - 配置
* `script` - 脚本
* `user` - 用户
* `group` - 群组
* `chart` - 图表
* `文件夹` - 一堆设备或者可能是其他东西。
* `schedule` - 时间表，例如日历事件
* `design` - 用于 `getObjectView` 的设计对象

#### 特定对象类型的属性
＃＃＃＃＃ 状态
属性：

* `common.type`（可选 - （默认为 `mixed`==any type）（可能的值：`array`、`boolean`、`file`、`json`、`mixed`、`multistate`、`number`、`object`、`string`）。作为例外，类型为 `meta` 的对象可以具有 `common.type=meta.user` 或 `meta.folder`。重要的是要注意，数组、对象、混合和文件必须使用 `JSON.stringify()` 进行序列化。
* `common.min`（可选）
* `common.max`（可选）
* `common.step`（可选）- 增加/减少间隔。例如，恒温器为 0.5
* `common.unit`（可选）
* `common.def`（可选 - 默认值）
* `common.defAck`（可选 - 如果设置了 `common.def`，则此值用作确认标志，`js-controller` 2.0.0+）
* `common.desc`（可选，字符串或对象）- 描述，多语言描述的对象
* `common.read` (布尔值，强制) - 如果状态可读则为 true
* `common.write` (布尔值，强制) - 如果状态可写则为 true
* `common.role` (字符串，强制) - 状态角色（用于用户界面以指示选择哪个小部件，见下文）
* `common.states`（可选） - 为具有字符串和数字数据类型的状态提供更多允许值的上下文：
* 对于**未**提供 common.min/common.max 的数字：包含允许的数字值列表及其（显示的）标签，形式为 `{0: 'OFF', 1: 'ON', '-1': 'whatever'}`。仅允许这些值
* 对于**带有** `common.min` **和/或** common.max 的数字：允许的数字范围由 min/max 定义，此属性包含一个“特殊”数字值列表及其（显示的）标签，例如 `{0: 'OFF', 254: 'ON', 255: 'BLINK'}`（最小值=0，最大值=255）。允许仅指定最小值**或**最大值，则缺失的限制将假定为 +/-Infinity（不包括 +/-Infinity）。
* 对于字符串，包含允许值列表及其（显示）标签，例如 `{'value': 'valueName', 'value2': 'valueName2'}`。仅允许这些值
* 对于字符串，包含允许值列表，例如 `['Start', 'Flight', 'Land']`（实际上与 `{'Start': 'Start', 'Flight': 'Flight', 'Land': 'Land'}` 相同）。仅允许使用这些值
* 这些值目前（从 js-controller 4.0 开始）尚未经过 js-controller 检查或验证，仅适用于 UI 和可视化
* `common.workingID`（字符串，可选）- 如果此状态具有辅助状态 WORKING，则必须在此处填写全名；如果前部分与实际值相同，则仅填写后半部分。用于 `HM.LEVEL`，通常值为 `WORKING`
* `common.custom`（可选）- 针对特定适配器的自定义设置结构。例如 `{"influxdb.0": {"enabled": true, "alias": "name"}}`。`enabled` 属性是必需的，如果该属性不为 true，则整个属性将被删除。

##### 州 `common.role`
* `common.role`（表示此状态应如何在用户界面中表示）

[可能值](stateroles.md)

＃＃＃＃ 渠道
##### 频道`common.role`（可选）
建议：通道对象`common.role`应该/可以暗示一组强制和/或可选的状态子对象

可能的值：

* `info` - 货币或股票汇率、燃料价格、邮箱插入等信息
*`日历`-
* `forecast` - 天气预报

* `media - 通用媒体渠道
* `media.music` - 媒体播放器，如 SONOS、YAMAHA 等
* `media.tv` - 电视
* `media.tts` - 文本转语音

* `thermo` - 监测或控制温度、湿度等
*`thermo.heat`
*`thermo.cool`

* `blind` - 窗帘控制

*`光`
* `light.dimmer` - 调光器
* `light.switch` - 灯开关。
* `light.color` - 具有颜色变化能力的灯光控制
* `light.color.rgb` - 设置 RGB 颜色
* `light.color.rgbw` - 设置 RGBW 颜色
* `light.color.hsl` - 设置色相/饱和度/亮度的颜色（色相颜色光 - LivingColors...）
* `light.color.hslct` - 设置色相/饱和度/亮度或色温的颜色（色相扩展色光）
* `light.color.ct` - 色温 K

* `switch` - 一些通用开关

* `传感器` - 例如窗户或门触点、漏水传感器、火灾传感器
*`sensor.door` - 打开、关闭
*`sensor.door.lock` - 打开、关闭、锁定
*`sensor.window`-打开、关闭
*`sensor.window.3` - 打开、倾斜、关闭
*`sensor.water` - true（警报），false（无警报）
*`sensor.fire` - true（警报），false（无警报）
* `sensor.CO2` - true（警报），false（无警报）

*

* `alarm` - 一些警报

* `电话` - fritz box、speedport 等等

* `按钮` - 像墙壁开关或电视遥控器，每个按钮都是一种状态，如.play、.stop、.pause
* `remote` - 电视或其他遥控器的状态是带有按下值的字符串，例如“播放”、“停止”、“暂停”

* `meta` - 有关设备的信息
* `meta.version` - 设备版本
* `meta.config` - 来自设备的配置
* ...

#### 频道描述
~~属性名称可以由适配器自由定义，除了用**粗体**字体书写的属性名称。~~

“W”——common.write=true

“M”——必填

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
| **名称** | **common.role** | **M** | **W** | **common.type** | **描述** |
| ------------- |:--------------------------|:-----:|:-----:|-----------------|-------------------------------------|
| 状态 | 开关 | X | X | 布尔值 | |
| 描述 | 文本描述 | | | | |
| mmm | indicator.maintenance.mmm | | | | mmm = lowbat 或 unreach 或其他 |

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
| **名称** | **common.role** | **M** | **W** | **common.type** | **描述** |
| `ringing_number` | `text.phone_number` | | | `string` | |
| `ringing` | `indicator` | | | `boolean` | |
| `响铃` | `指示器` | | | `布尔值` | |

...

＃＃＃＃ 设备
枚举
* `common.members` - （可选）枚举成员 ID 数组

元
ID

* `*&lt;适配器名称&gt;.&lt;实例编号&gt;.meta.&lt;元名称&gt;*`
* `*&lt;适配器名称&gt;.meta.&lt;meta名称&gt;*`
* `系统。*meta。&lt;meta-name&gt;*`

＃＃＃＃ 适配器
ID：`system.adapter.<adapter.name>`

*注意：*除特殊标记为**强制**的标志外，所有标志都是可选的。

* `common.adminColumns` - 自定义属性，必须在对象浏览器的管理员面板中显示。例如：`[{"name": {"en": "KNX address"}, "path": "native.address", "width": 100, "align": "left"}, {"name": "DPT", "path": "native.dpt", "width": 100, "align": "right", "type": "number", "edit": true, "objTypes": ["state", "channel"]}]`。`type` 是属性的类型（例如字符串、数字、布尔值），仅在启用编辑功能时需要。`objTypes` 是可以具有此类属性的对象类型列表。也仅在编辑模式下使用。
* `common.adminTab.fa-icon` - （已弃用）TAB 的 Font-Awesome 图标名称。
* `common.adminTab.icon` - （可选）TAB图标链接或base64编码图标。可以是SVG
* `common.adminTab.ignoreConfigUpdate` - 如果配置发生变化，则不更新配置 TAB（以在 TAB 中启用配置设置）
* `common.adminTab.link` - TAB 中 iframe 的链接。您可以使用类似这样的参数替换：`http://%ip%:%port%`。IP 地址将被替换为主机 IP 地址。`port` 将从 `native.port` 中提取。
* `common.adminTab.name` - 管理员中的 TAB 名称
* `common.adminTab.singleton` - [true/false] 适配器是否具有管理员的 TAB。所有实例仅显示一个 TAB。
* `common.adminUI.config` - [none/json/materialize/html] 配置 UI 类型。如果未定义，适配器将显示为 html。（`admin` 文件夹中应包含 `jsonConfig.json` 或 `jsonConfig.json5`（对应 `json`）、`materialize` 的 `index_m.html` 和 `html` 的 `index.html`）
* `common.adminUI.custom` - [none/json] 自定义配置 UI 类型。如果未定义，则不会显示自定义 UI。只能在 `admin` 文件夹中使用 `jsonCustom.json` 或 `jsonCustom.json5`。
* `common.adminUI.tab` - [none/html] TAB UI 类型。如果定义为 `html`，则 `tab.html` 或 `tab_m.html` 会在文件夹 `admin` 中扩展。
* `common.allowInit` - [true/false] 允许在设置更改或适配器启动后，将“已调度”适配器调用为“不在时间表内”。或者允许在配置更改后，将已调度的适配器启动一次，然后按时间表调用。
* `common.availableModes` - 如果有多种模式可用，则为 `common.mode` 的值
* `common.blockly` - [true/false] 适配器是否具有 blockly 的自定义块。（需要 `admin/blockly.js`）
* `common.compact` - 告诉控制器，如果需要，这个适配器可以在同一个进程中启动
* `common.config.height` - 配置对话框的默认高度（已弃用 - 仅对 admin2 有效）
* `common.config.minHeight` - 配置对话框的最小高度（已弃用 - 仅对 admin2 有效）
* `common.config.minWidth` - 配置对话框的最小宽度（已弃用 - 仅对 admin2 有效）
* `common.config.width` - 配置对话框的默认宽度（已弃用 - 仅对 admin2 有效）
* `common.connectionType` - 与设备的连接类型：`local/cloud`。另请参阅 `common.dataSource`。
* `common.dataFolder` - 相对于 iobroker-data 的文件夹，适配器用于存储数据。此文件夹将自动备份和恢复。您可以在其中使用变量 `%INSTANCE%`。
* `common.dataSource` - 从设备接收数据的方式：`poll/push/assumption`。它与 `connectionType` 一起很重要。
* `common.dependencies` - 类似 `[{"js-controller": ">=2.0.0"}]` 的数组，描述同一主机上此适配器需要哪些 ioBroker 模块。
* `common.disableDataReporting` - 不要通过 `sentry` 报告此实例的错误
* `common.docs` - 如果不在 `README.md` 中，则使用类似 `{"en": "docs/en/README.md", "de": ["docs/de/README.md", "docs/de/README1.md"]}` 的结构来描述文档
* `common.enabled` - **强制** [true/false] 值应为 false，以便默认禁用新实例
* `common.engineTypes` - 已弃用。请使用 package.json 中的 engine
* `common.eraseOnUpload` - 上传前清除目录中所有以前的数据
* `common.expert` - 仅在管理员的专家模式下显示此对象
* `common.extIcon` - 已卸载适配器的外部图标链接。通常在 GitHub 上。
* `common.getHistory` - [true/false] 如果适配器支持 getHistory 消息
* `common.globalDependencies` - 类似 `[{"admin": ">=2.0.0"}]` 的数组，描述其中一个主机上的此适配器需要哪些 ioBroker 模块。
* `common.icon` - 本地图标的名称（应位于子目录“admin”）
* `common.ignoreVersion` - 不显示此适配器此特定版本的更新图标
* `common.installedVersion` - 不要使用它，只会在内部设置
* `common.jsonConfig` - 此适配器支持 admin5 并提供 admin/jsonConfig.json 来描述配置对话框布局
* `common.jsonCustom` - 此适配器支持 admin5 并提供 admin/jsonCustom.json 来描述自定义设置布局
* `common.keywords` - 类似于 package.json 中的关键字，但可以在多种语言中定义。只是一个数组。
* `common.localLink` - 已弃用。请使用 `common.localLinks`。
* `common.localLinks` - 链接到此适配器的 Web 服务。例如，从管理员访问 http://localhost:5984/_utils 即可访问 futon
* `common.logTransporter` - 如果此适配器从其他主机和适配器接收日志（例如，将它们存储在某处）
* `common.loglevel` - 调试、信息、警告或错误
* `common.main` - **已弃用** 在 package.json 中使用 main。
* `common.materializeTab` - 如果适配器支持 > admin3 选项卡（materialize 样式）
* `common.materialize` - 如果适配器支持 > admin3（materialize 样式）
* `common.messagebox` - 如果支持消息框，则为 true。因此，适配器可以接收 sendTo 消息（用于电子邮件、推送等）。
* `common.messages` - 更新时触发的条件消息。详情请参阅[条件消息](#conditional-messages)。
* `common.mode` - **强制** 可能的值见下文
* `common.name` - **强制** 不带“ioBroker”的适配器名称。
* `common.noConfig` - [true/false] 例如不显示配置对话框
* `common.noIntro` - 从不在管理员的简介/概览屏幕上显示此适配器的实例（如图标、小部件）
* `common.noRepository` - [true/false] 如果适配器随初始安装一起交付或有自己的存储库
* `common.nogit` - 如果为真，则无法直接从 GitHub 安装
* `common.nondeletable` - [true/false] 此适配器无法删除或更新。它将与控制器一起更新。
* `common.npmLibs` - 已弃用。请使用 package.json `dependencies`。
* `common.onlyWWW` - [true/false] 告诉控制器，该适配器只有 HTML 文件而没有 main.js，就像 rickshaw 一样
* `common.osDependencies.darwin` - 此适配器所需的 OSX 包数组
* `common.osDependencies.linux` - 此适配器所需的 debian/centos 包数组（当然仅适用于使用 apt、apt-get、yum 作为包管理器的操作系统）
* `common.osDependencies.win32` - 未使用，因为 win32 没有包管理器
* `common.os` - 支持的操作系统的字符串或数组，例如 `["linux", "darwin"]`
* `common.platform` - **强制** 可能值：Javascript/Node.js，更多即将推出
* `common.preserveSettings` - 包含实例共有属性名称的字符串（或数组），这些属性不会被删除。例如“history”，因此通过 `setState("system.adapter.mqtt.0", {..})` 调用 `common.history` 字段，即使新对象没有此字段，也不会删除该字段。要删除该属性，必须使用 `common: {history: null}` 明确指定。
* `common.pugins.sentry` - 包含 `sentry` 插件配置数据的结构
* `common.readme` - ReadMe 文件的 URL
* `common.restartAdapters` - 包含安装此适配器后必须重新启动的适配器名称的数组，例如 ["vis"]
* `common.restartSchedule` - CRON 计划重新启动模式 `daemon` 适配器
* `common.schedule` - 如果适配器在 `schedule` 模式下运行，则为 CRON 计划。
* `common.serviceStates` - [true/false 或 path] 适配器是否支持传递附加状态。如果支持，则将调用路径 `adapter/lib/states.js`，并提供以下参数函数（对象、状态、实例、配置、回调）。该函数必须传递包含值的点数组，例如 `function (err, result) { result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}`
* `common.singletonHost` - 适配器只能在一个主机上安装一次
* `common.singleton` - 适配器在整个系统中只能安装一次
* `common.statusStates` - 用于管理界面状态指示的结构，格式为 `"statusStates": {"onlineId": "0.connected", "errorId": "hm-rpc.0.AB203424.0.error"}`。可以使用 `offlineId` 代替 `onlineId`。如果 ID 非常短（少于 2 个点），则该 ID 将被视为相对于当前对象。
* `common.stopBeforeUpdate` - [true/false] 适配器是否必须在更新前停止
* `common.stopTimeout` - 等待适配器关闭的超时时间（毫秒）。默认为 500 毫秒。
* `common.stoppedWhenWebExtension` - 如果实例具有模式 `daemon` 但它作为 Web 扩展运行（`native.webInstance !== ''`），则如果 `common.stoppedWhenWebExtension` 为真，控制器将不会启动此实例。
* `common.subscribable` - 此适配器的变量必须通过 sendTo 订阅才能启用更新
* `common.subscribe` - 自动订阅的变量名称
* `common.supportCustoms` - [true/false] 适配器是否支持每个州的设置。它必须在管理员账户中有一个 custom.html 文件。示例可以在 `ioBroker.history` 中找到。
* `common.supportStopInstance`- [true/false] 表示适配器是否支持信号 stopInstance（需要**messagebox**）。该信号将在停止之前发送给适配器。（如果出现 SIGTERM 问题则使用）
* `common.tier` - 实例的启动顺序。允许值：1、2、3。1 - 第一个，3 - 最后一个
* `common.titleLang` - **强制** 所有支持语言的适配器的较长名称，如 `{en: 'Adapter', de: 'adapter', ru: 'Драйвер'}`
* `common.title` - （已弃用）在管理员中显示的适配器的较长名称
* `common.type` - 适配器类型。参见 [类型](adapterpublish.md)
* `common.unchanged` - （系统）请勿使用此标志。该标志用于通知系统，必须在管理界面中显示配置对话框。
* `common.unsafePerm` - [true/false] 是否必须使用 `npm --unsafe-perm` 参数安装包
* `common.version` - **强制**可用版本
* `common.visWidgets` - 描述 `vis2 react widgets`。例如 `{"i18n": "component", "vis2NAMEWidgets": { "name": "vis2NAMEWidgets", "url": "vis-2-widgets-NAME/customWidgets.js", "components": [ "NAMEwidgetName"]} }`
* `common.wakeup` - 如果将某个值写入 `system.adapter.NAME.x.wakeup`，适配器将启动。通常，适配器应在处理事件后停止。
* `common.webByVersion` - 在 Web 适配器中显示版本作为前缀（通常为 - `ip:port/material`，webByVersion - `ip:port/1.2.3/material`）
* `common.webExtendable` - [true/false] 此适配器中的 Web 服务器是否可以使用代理、simple-api 等插件/扩展进行扩展
* `common.webExtension` - 用于连接 Web 扩展的相对文件名。例如，在 `simple-api` 的 `lib/simpleapi.js` 中，相对于适配器根目录。此外，还需要 `native.webInstance` 来指定此扩展的包含位置。空表示必须作为自己的 Web 服务运行。“*”表示每个 Web 服务器都必须包含它。
* `common.webPreSettings` - webServer 适配器必须包含在 info.js 中的参数列表。（示例材料）
* `common.webservers` - Web 服务器实例数组，用于提供适配器 www 文件夹中的内容
* `common.welcomeScreen.order` - 待办事项
* `common.welcomeScreenPro` - 与 `common.welcomeScreen` 相同，但仅通过 ioBroker.cloud 访问使用。
* `common.welcomeScreen` - 页面数组，应显示在“web”index.html 页面上。`["vis/edit.html", "vis/index.html"]` 或 `[{"link": "vis/edit.html", "name": "Vis editor", "img": "vis/img/edit.png", "color": "blue"}, "vis/index.html"]`
* `common.wwwDontUpload` - 不要将 www 目录上传到数据库。仅供管理员使用。你可以将目录命名为其他名称，然后按“确定”。
* `protectedNative` - 配置属性数组，只能由自己的适配器访问，例如 `["password"]`
* `encryptedNative` - 配置属性数组，通过管理配置页面存储时将自动加密，并在适配器运行时自动解密，例如 `["password", "token"]`
* `native` - 预定义属性，可在 `index_m.html` 中访问，并在运行时通过 `adapter.config.<attribute>` 访问，例如 `{"port": 1234, "password": "secret"}`

#### 条件消息（`common.messages`）
您可以定义在更新适配器时向用户显示的**条件消息**。
这些消息可以取决于旧版本、新版本，甚至其他适配器的存在。

＃＃＃＃＃ 结构
```jsonc
"messages": {
  "condition": {
    "operand": "and", // "and" = all rules must be true, "or" = at least one must be true
    "rules": [
      "oldVersion<=1.0.44",   // condition using the old version
      "newVersion>=1.0.45"    // condition using the new version
    ]
  },
  "title": {
    "en": "Important notice"
  },
  "text": {
    "en": "Main text shown to the user"
  },
  "link": "https://iobroker.net/www/pricing", // optional
  "buttons": ["agree", "cancel", "ok"],       // optional. If missing, the message only appears in the changelog
  "linkText": {
    "en": "More info"                         // optional text for the link
  },
  "level": "warn" // one of: "info", "warn", "error"
}
```

##### 支持的规则
规则是 `rules` 数组中的字符串。示例：

**版本检查**

* `“oldVersion<=1.0.44”` – 旧版本小于或等于 1.0.44
* `"newVersion>=1.0.45"` – 新版本大于或等于 1.0.45

*（运算符：`<`、`>`、`<=`、`>=`、`==`、`!=`）*

* **安装状态**

* `"installed"` – 如果适配器已经安装则为 true
* `"not-installed"` 或 `"!"` – 如果未安装适配器则为 true

* **其他适配器**

* `"vis-2>=1.0.0"` – 如果适配器 `vis-2` 安装的版本≥1.0.0，则为 true
* `"vis"` – 如果安装了适配器 `vis`，则为 true
* `"!vis-2"` – 如果未安装适配器 `vis-2`，则为 true

##### 规则参考
| 规则示例 | 含义 |
| ---------------------- | --------------------------------------------------------- |
| `oldVersion<=1.0.44` | 当前安装的版本≤1.0.44 |
| `newVersion>=1.0.45` | 正在安装的版本≥1.0.45 |
| `newVersion==2.0.0` | 正在安装的版本正好是 2.0.0 |
| `installed` | 如果适配器已经安装（任何版本）则为真 |
| `not-installed` 或 `!` | 如果之前未安装适配器，则为真 |
| `vis-2>=1.0.0` | 如果适配器`vis-2`安装的版本≥1.0.0，则为真|
| `vis` | 如果安装了适配器`vis`（任何版本），则为真|
| `!vis-2` | 如果适配器`vis-2`未安装则为真 |
| `!vis-2` | 如果适配器 `vis-2` 未安装则为真 |

###### 支持的运算符
* `==` – 等于
* `!=` – 不等于
* `<` – 小于
* `<=` – 小于或等于
* `>` – 大于
* `>=` – 大于或等于

###### 操作数
* `“and”` → 所有规则必须为真
* `“或”` → 至少有一条规则必须为真

示例
###### 示例 1：仅当从版本 ≤1.0.44 升级到 ≥1.0.45 时显示消息
```json
"messages": {
  "condition": {
    "operand": "and",
    "rules": [
      "oldVersion<=1.0.44",
      "newVersion>=1.0.45"
    ]
  },
  "title": { "en": "Important update" },
  "text": { "en": "Please read before continuing." },
  "level": "warn"
}
```

###### 示例 2：如果适配器是新安装的，则显示消息
```json
"messages": {
  "condition": {
    "operand": "or",
    "rules": ["not-installed"]
  },
  "title": { "en": "Welcome!" },
  "text": { "en": "Thanks for installing this adapter." },
  "level": "info"
}
```

###### 示例 3：如果需要另一个适配器，则显示消息
```json
"messages": {
  "condition": {
    "operand": "and",
    "rules": ["vis-2>=1.0.0"]
  },
  "title": { "en": "Dependency notice" },
  "text": { "en": "This adapter requires vis-2 version 1.0.0 or higher." },
  "link": "https://example.com/setup-guide",
  "linkText": { "en": "Setup guide" },
  "level": "error"
}
```

##### 测试和调试
例如，要在“开发服务器”环境中测试消息及其规则，必须执行以下步骤：

- 确定该消息未来应显示的版本号。该版本号将在后续发布过程中选定。
- 根据描述将`common.messages`对象添加到`io-packages.json`文件中。
- 如有必要，在“common.messages”对象中包含先前确定的版本号。
- 使用已识别的版本号将变更日志条目添加到 `common.news` 对象。此变更日志信息稍后将与 `common.messages` 对象中的信息一起显示在更新对话框中。
- 在测试环境的 iobroker 中启用专家模式。
- 在对象视图中，打开以下数据点：`system.repositories`。
- 出于安全原因，并且由于对象非常大，建议复制内容并在 JSON 编辑器（例如 VS Code 或 Notepad++）中对其进行编辑。
- 在编辑器中，找到现有的适配器对象。
- 在找到的对象中，修改以下信息：
- `version` -> 上面标识的版本号
- `news` -> 添加已识别版本号的变更日志条目
- `messages` -> 从 `io-packages.json` 插入准备好的消息对象。
- 为防止出现问题，应在 JSON 验证器中检查结果。
- 然后将结果复制回“system.repositories”对象并保存。
- 在管理界面中打开或重新加载适配器选项卡。
- 现在应显示更新后的版本可供适配器更新。
- 单击适配器的更新按钮后，消息对象中的信息应在短时间后显示在对话框中。
- 由于此版本尚未在 npm 上提供，因此按下更新按钮将导致错误，并且应关闭对话框。

＃＃＃＃ 实例
ID：`system.adapter.&lt;adapter.name&gt;.&lt;instance-number&gt;`

* `common.host` - （强制）适配器应启动的主机 - 对象 `system.host.&lt;host&gt;` 必须存在
* `common.enabled` - （强制）
* `common.mode` - （强制）可能的值见下文

##### 适配器/实例 common.mode
* `none` - 此适配器不启动进程
* `daemon` - 始终运行的进程（如果进程退出，将重新启动）
* `subscribe` - 当 `system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt;.alive` 状态变为 `true` 时启动。当 `.alive` 状态变为 `false` 时终止，如果进程退出，则将 `.alive` 设置为 `false`（进程退出时**不会**重新启动）
* `schedule` - 由 `system.adapter.&lt;adapter-name&gt;.&lt;instance-number&gt; 中的计划启动。.schedule` - 根据 `.schedule` 的变化，通过重新安排新状态来做出反应
* `once` - 每次 `system.adapter.yyy.x` 对象发生变化时，此适配器都会启动。终止后不会重新启动。
* `extension` - 此适配器不会由 `js-controller` 启动，而是由 Web 实例启动。Web 实例可以在 `native.webInstance` 中定义为 '*'（如果每个 Web 实例都包含该实例），也可以在 `web.x` 中针对特定 Web 实例进行定义（例如：`cameras`、`proxy`）。此外，在 `common.webExtension` 中必须提供插件文件的路径。

＃＃＃＃ 主持人
ID：`system.host.<host>`

* `common.name` - 例如 `system.host.banana`
*`common.process`
*`common.version`
*`common.platform`
*`common.cmd`
* `common.hostname` - 例如 `banana`
* `common.address` - IP 地址字符串数组

配置
＃＃＃＃ 脚本
* `common.platform` - （必填）可能的值 `Javascript/Node.js`（更多内容即将推出）
* `common.enabled` - （强制）脚本是否激活
* `common.source` - （强制）脚本源
* `common.engine` - （可选）应该运行此脚本的*脚本引擎*实例（例如“javascript.0”） - 如果省略则自动选择引擎

#### 用户
* `common.name` - （必填）用户名（区分大小写）
* `common.password` - （必填）密码的 MD5 哈希值

＃＃＃＃ 团体
* `common.name` - （必填）组的名称
* `common.members` - （强制）用户对象 ID 数组
* `common.desc` - (可选) 群组目的描述