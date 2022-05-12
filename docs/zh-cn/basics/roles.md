---
lastChanged: 24.01.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/roles.md
title: 数据点的作用
hash: MLon33fkDPXEUvl6ebdPNQ3ihE1hkWlkVAqvJrZe6UA=
---
# 数据点的作用
对于`state`类型的对象，`common.role`属性必须设置为下面列表中定义的角色之一。
角色信息是非常重要的信息，它允许可视化和智能助手适配器识别对象的功能以及它如何/是否与同一通道、设备或文件夹中的其他对象相关。

示例：一个 RGB 灯可以具有以下三个（或更多）具有不同角色的对象，它们属于同一类：

* `switch` - （开/关）
* `level.color.rgb` 带有#RRGGBB 灯的颜色代码
* `level.brightness` 与亮度值

请参阅[类型检测器存储库](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md)，了解用于发现所需和可选对象及其角色的各种设备模板。

＃＃ 一般的
* `state` - 非常通用，当数据项的角色未知时使用。
* `text` `common.type = string`
* `text.url` `common.type = string` val 包含在锚点、iframe 或 img 中使用的 url
* `html` `common.type=string`
* `json` `common.type = string`
* `list` `common.type = array`
* `date` `common.type = string` - 可被`new Date(ddd)` 字符串解析
* `date` `common.type = number` - `epoch seconds * 1000`

## 传感器（布尔值，只读）
`common.type=boolean, common.write=false`

* `sensor.window` - 窗口打开-`true` 或关闭-`false`
* `sensor.door` - 门打开-`true` 或关闭-`false`
* `sensor.alarm` - 一些一般警报
* `sensor.alarm.flood` - 漏水
* `sensor.alarm.fire` - 火灾传感器
* `sensor.alarm.secure` - 警报开启时检测到门打开、窗户打开或运动。
* `sensor.alarm.power` - 没有电源（`电压 = 0`）
*`sensor.light` - 来自灯的反馈，它是打开的
* `sensor.lock` - 锁的当前位置
* `sensor.motion` - 运动传感器
* `sensor.rain` - 检测到雨
* `sensor.noise` - 检测到的噪音

## 键（布尔值，只写）
`common.type=boolean, common.write=true, common.read=false`

* `按钮`
* `button.long`
* `button.stop` - 例如盲停，
* `button.stop.tilt`
* `button.start`
* `button.open.door`
* `button.window.open`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
* `button.mode`*
* `button.mode.auto`
* `button.mode.manual`
* `button.mode.silent`

## 按键作为传感器
`common.type=boolean, common.write=false, common.read=true`

* `button` - `common.write=false` 的区别。请避免使用此角色并使用 `button.press` 或 `button.long`。
* `button.long`
* `button.press`

##值（数字，只读）
`common.type=number, common.write=false`

* `价值`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) 很重要 (`CLOSED/TILTED/OPEN" ). 值可能会有所不同。
* `value.temperature` (`common.unit='°C' or '°F' or 'K'')
* `值.湿度`
* `value.brightness` - 亮度（单位：勒克斯，）
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - 电池电量
* `value.valve` - 阀门级别
* `value.time` - Date() 对象的 getTime()
* `value.interval` (common.unit='sec') - 以秒为单位的间隔（可以是 0.1 或更小）
* ~~value.date (common.type=string) - 格式为 2015.01.01 的日期（不含时间）~~
* ~~value.datetime (common.type=string) - 系统格式的日期和时间~~
* `value.gps.longitude` - GPS 经度坐标
* `value.gps.latitude` - GPS 纬度
* `value.gps.elevation` - GPS 海拔
* `value.gps` - 经度和纬度一起像'5.56;43.45'
* `value.gps.accuracy` - 当前 GPS 测量的精度
* `value.gps.radius` - 当前 GPS 测量的半径
* `value.power` - 实际功率（单位=W 或 KW）
* `value.power.consumption` - 能耗（单位=Wh 或 KWh）
* `value.power.reactive` - 无功功率（单位=VAr）
* `value.direction` - (common.type=number ~~or string~~, 表示上/下、左/右、四向切换、风向...)
* `value.curtain` - 窗帘的当前位置
* `value.blind` - 百叶窗的当前位置（`max = 全开，min = 全关`）
* `value.tilt` - 当前倾斜位置（`max = 全开，min = 全关`）
* `value.lock` - 锁的当前位置
* `value.speed` - 风速
* `value.pressure` - （单位：mbar）
* `值.距离`
* `value.distance.visibility`
* `value.severity` - 一些严重性（可以指定状态），越高越重要
* `value.warning` - 一些警告（可以指定状态），越高越重要
* `value.sun.elevation` - 以°为单位的太阳高度
* `value.sun.azimuth` - 太阳方位角°
* `value.voltage` - 以伏特为单位的电压，`unit=V`
* `value.current` - 以安培为单位的电流，`unit=A`
* `value.fill` - 填充水平，`unit=l,ml,m3,%`
* `value.blood.sugar` - 血糖值，`unit=mmol,mgdl`

## 指标（布尔值，只读）
`common.type=boolean, common.write=false`

*indicators* 和 *sensors* 之间的区别在于，指标显示为一个小图标。传感器作为真正的价值。
所以指标在通道中一定不能单独存在。它必须是频道内的另一个主要状态。

* `指标`
* `indicator.working` - 表示目标系统正在做某事，例如打开百叶窗或打开锁。
* `indicator.reachable` - 当设备在线时
* `indicator.connected` - 仅用于实例。对设备使用 `indicator.reachable`
* `indicator.maintenance` - 显示系统警告/错误、警报、服务消息、电池没电或类似情况
*`indicator.maintenance.lowbat`
*`indicator.maintenance.unreach`
*`indicator.maintenance.alarm`
* `indicator.lowbat` - 如果电池电量不足则为真
* `indicator.alarm` - 像indicator.maintenance.alarm
* `indicator.alarm.fire` - 检测到火灾
* `indicator.alarm.flood` - 检测到洪水
* `indicator.alarm.secure` - 门或窗打开
* `indicator.alarm.health` - 健康问题

## 级别（数字，读写）
使用 **Levels** 您可以控制或设置数值。

`common.type=number, common.write=true`

* `级别`
* `level.co2` - 0-100% 空气质量
* `level.dimmer` - 亮度也更暗
* `level.blind` - 设置盲点（最大 = 全开，最小 = 全关）
* `level.temperature` - 设置所需的温度
* `level.valve` - 阀门位置的设定值
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` - RGBW
* `level.color.hue` - 以° `0-360 为单位的颜色； 0=红色，120=绿色，240=蓝色，360=红色（循环）`
* `level.color.saturation`
* `level.color.rgb` - 十六进制颜色，如`#rrggbb`
* `level.color.luminance`
* `level.color.temperature` - K°色温`2200暖白，6500°冷白`
* `level.timer`
* `level.timer.sleep` - 睡眠定时器。 0 - 关闭，或以分钟为单位
* ...
* `level.volume` - (`min=0, max=100`) - 音量，但 min, max 可能不同。最小值 < 最大值
* `level.volume.group` - (`min=0, max=100`) - 设备组的音量
* `level.curtain` - 设置窗帘位置
* `level.tilt` - 设置百叶窗的倾斜位置（最大=完全打开，最小=完全关闭）

## 开关（布尔，读写）
开关控制布尔设备（`true = ON, false = OFF`）

`common.type=boolean, common.write=true`

* `开关`
* `switch.lock` - 锁（`true - 打开锁，false - 关闭锁`）
* `switch.lock.door` - 门锁
* `switch.lock.window` - 窗口锁定
* `switch.mode.boost` - 恒温器启动/停止升压模式
* `switch.mode.party` - 恒温器的启动/停止派对模式
* `switch.power` - 开/关恒温器或空调
* `switch.light`
* `switch.comfort` - 舒适模式
* `switch.enable`
* `switch.power` - 电源开/关
*`switch.mode`*
* `switch.mode.auto` - 自动模式开/关
* `switch.mode.manual` - 手动模式开/关
* `switch.mode.silent` - 静音模式开/关
* `switch.mode.moonlight` - 月光模式开/关
* `switch.mode.color` - 颜色模式开/关
* `switch.gate` - 关闭（假）或打开（真）门

##空调或恒温器
* `level.mode.fan` - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing` - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - 空调：`AUTO，COOL，DRY，ECO，FAN_ONLY，HEAT，OFF`，加热器恒温器：`AUTO，MANUAL，VACATION`，
* `level.mode.thermostat` - 恒温器：`AUTO，MANUAL，VACATION`，

 除了这些状态之外，通常还需要 `level.temperature` 和 `switch.power` 来映射空调。

TODO：想想电离和振荡。

＃＃ 吸尘器
* `level.mode.cleanup` - 枚举`AUTO、ECO、EXPRESS、NORMAL、QUIET`。只需要“AUTO”和“NORMAL”。
* `level.mode.work` - `AUTO, FAST, MEDIUM, SLOW, TURBO`的枚举。可选状态。
* `value.water` - 0-100% 水位。
* `value.waste` - 0-100% 垃圾箱水平。 （0% - 空，100% - 满）
* `indicator.maintenance.waste` - 垃圾桶是愚蠢的。
* `value.state` - `HOME, CLEANING, PAUSE` 等等。

除了这些状态，通常还需要 `switch.power` 来关联真空吸尘器。 `switch.power`在这种情况下工作为：`true` - 干净，`false` - 回家。
可选的`value.battery`和

＃＃ 目标
* `switch.gate` - 关闭（假）或打开（真）门（必需）
* `value.position` - 门的位置百分比（100% 打开，0% - 关闭）
* `value.gate` - 与 `value.position` 相同
* `button.stop` - 停止门的移动

＃＃ 媒体
媒体播放器的特殊角色

* `button.stop`
* `button.play`
*`button.next`
* `button.prev`
* `button.pause`
* `switch.pause`
* `button.forward`
* `button.reverse`
* `button.fastforward`
* `button.fastreverse`
* `button.volume.up`
* `button.volume.down`
* `media.seek` - (`common.type=number`) %
* `media.mode.shuffle` - (`common.type=number`) 0 - 无，1 - 全部，2 - 一个
* `media.mode.repeat` - (`common.type=boolean`)
* `media.state` - ['play','stop','pause'] 或 [0 - pause, 1 - play, 2 - stop] 或 [true - play/false - pause]
* `media.artist`
* `media.album`
* `media.title`
* `media.title.next`
* `media.cover` - 封面 URL
* `media.cover.big` - 大封面网址
* `media.cover.small` - 小封面 URL
* `media.duration.text` - 例如“2:35”
* `media.duration` - (`common.type=number`) 秒
* `media.elapsed.text` - 例如“1:30”
* `media.elapsed` - (`common.type=number`) 秒
* `media.broadcastDate` - (`common.type=string`) 广播日期
* `media.mute` - (`common.type=boolean`) true 是静音
* `media.season` - (`common.type=string`) 季节编号（重要的类型是真正的“字符串”，以便能够用“”显示缺少的季节）
* `media.episode` - (`common.type=string`) 剧集编号（重要的类型是真正的“字符串”，以便能够用“”表示缺少的剧集）
* `media.mute.group` - (`common.type=boolean`) 静音设备组
* `media.tts` - 文本到语音
* `media.bitrate` - kbps
* `media.genre` - 流派歌曲
* `media.date` - 年度歌曲
* `media.track` - (`common.type=string`) 当前播放曲目 id [0 - ~]（重要的是，类型确实是 `string`，以便能够用“”指示丢失的曲目。
* `media.playid` - 媒体播放器轨道 ID
* `media.add` - 添加当前播放列表
* `media.clear` - 清除当前播放列表（只写）
* `media.playlist` - json 数组
* `media.url` - 要播放的 URL 或当前 URL
* `media.url.announcement` - 播放公告的 URL
* `media.jump` - 跳转到播放列表的项目数（可以是负数）
* `media.content` - 正在播放的媒体类型，如音频/mp3
* `media.link` - 当前文件的状态
* `media.input` - 输入的数字或字符串（AUX，AV，TV，SAT，...）
* `level.bass` - 低音级别
* `level.treble` - 高音级别
* `switch.power.zone` - 电源区

```
[
    {
        "artist": "",
        "album": "",
        "bitrate":0,
        "title": "",
        "file": "",
        "genre": "",
        "year": 0,
        "len": "00:00",
        "rating": "",
        "cover": ""
    }
]
```

* `media.browser` - 像“文件”这样的 json 数组

```
[
    {
        "fanart": "",
        "file": "",//smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", //directory
        "label": "",
        "lastmodified": "",
        "mimetype": "",
        "size": 0,
        "thumbnail": "",
        "title": "",
        "type": "",
        "lastmodified": "2016-02-27 16:05:46",
        "time": "88",
        "track": "01",
        "date": "2005",
        "artist": "yonderboy (H)",
        "album": "splendid isolation",
        "genre": "Trip-Hop"
    }
]
```

＃＃ 天气
* `value.temperature` - 当前温度
* `value.temperature.windchill` - 实际的风寒
* `value.temperature.dewpoint` - 当前露点
* `value.temperature.feelslike` - 实际温度“感觉”
* `value.temperature.min` - 过去 24 小时的最低温度
* `value.temperature.max` - 过去 24 小时内的最高温度
* `value.humidity` - 实际或平均湿度
* `value.humidity.min` - 实际湿度
* `value.humidity.max` - 实际湿度
* `value.speed.wind` - 当前或平均风速
* `value.speed.max.wind` - 过去 24 小时的最大风速
* `value.speed.min.wind` - 过去 24 小时的最小风速
* `value.speed.wind.gust` - 实际阵风速度
* `value.direction.wind` - 当前或平均风向，以度为单位
* `value.direction.max.wind` - 当前风向以度为单位
* `value.direction.min.wind` - 当前风向以度为单位
* `weather.direction.wind` - 当前或平均风向作为文本，例如 NNW
* `date` - 当前日期或上次读取信息的日期
* `date.sunrise` - 今天的日出
* `date.sunset` - 今天的日落
* `dayofweek` - 星期几作为文本
* `location` - 位置的文字描述（例如地址）
* `weather.icon` - 当前状态图标 url
* `weather.icon.wind` - 当前的风图标 url
* `weather.icon.name` - 状态图标的当前名称
* `weather.state` - 当前天气描述
* `value.precipitation` - (`type: number, unit: mm`) 过去 24 小时雨/雪的降水量（今天的降水量为雪或雨）
* `value.precipitation.hour` - 过去一小时的实际降水量
* `value.precipitation.today` - 今天的当前降水量（直到 0:00）
* `value.precipitation.chance` - 今天的实际降水机会
* `value.precipitation.type` - 今天的当前降水类型。 （`类型：数字`）状态：0 - NO，1 - RAIN，2 - SNOW，3 - HAIL
* `value.radiation` - 实际太阳辐照度
* `value.uv` - 实际 UV 值
* `value.clouds` - 天空中的云彩。 0% - 没有云，100% - 很多云。
* `value.rain` - 过去 24 小时的实际降雨量
* `value.rain.hour` - 过去一小时的实际降雨量
* `value.rain.today` - 今天的当前降雨量（直到 0:00）
* `value.snow` - 过去 24 小时的实际雪量
* `value.snow.hour` - 最近一小时的实际降雪量
* `value.snow.today` - 今天的当前雪位（直到 0:00）
* `value.snowline` - 以米为单位的实际雪线
* `weather.chart.url` - 天气历史图表的 URL
* `weather.chart.url.forecast` - 天气预报图表的 URL
* `weather.html` - 带有天气描述的 HTML 对象
* `waether.title` - 非常简短的描述
* `weather.title.short` - 非常非常简短的描述（一个词）
* `weather.type` - 天气信息的类型
* `weather.json` - 带有特定数据的 JSON 对象
* `value.speed.wind.forecast.0` - 今天的风速预测
* `weather.state.forecast.0` - 今天的天气描述
* `value.direction.wind.forecast.0` - 今天的风向预报（以度为单位）
* `weather.direction.wind.forecast.0` - 今天的风向预测为文本
* `value.pressure.forecast.0` - 今天的压力预测
* `value.temperature.min.forecast.0` - 今天的最低温度预测
* `value.temperature.max.forecast.0` - 今天的最高温度预测
* `value.precipitation.forecast.0` - (`type: number, unit: %`) 今天的降水概率预测
* `value.prepitation.forecast.0` - (`type: number, unit: mm`) 今天的降水量预报
* `weather.title.forecast.0` - 明天的简短描述
* `value.precipitation.day.forecast.0` - 当天的降水预报
* `value.precipitation.night.forecast.0` - 夜间降水预报

* `date.forecast.1` - 明天的日期
* `weather.icon.forecast.1` - 明天的图标
* `weather.state.forecast.1` - 明天的天气状态
*`value.temperature.min.forecast.1`
*`value.temperature.min.forecast.1`
* `value.prepitation.forecast.1` - (`type: number, unit: %`) 预测明天的降水概率
* `value.prepitation.forecast.1` - (`type: number, unit: mm`) 明天的降水量预报
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

##信息
* `info.ip` - 设备的 IP
* `info.mac` - 设备的 Mac
* `info.name` - 设备名称
* `info.address` - 另一个地址（例如 KNX）
* `info.serial` - 序列号
* `info.firmware` - 固件版本
* `info.hardware` - 硬件版本
* `info.port` - TCP 端口
* `info.standby` - 如果设备处于待机模式，则为 true
* `info.status` - 设备状态
* `info.display` - 设备显示屏上显示的信息
* `date.start` - 字符串或数字
* `date.end` - 字符串或数字

＃＃ 健康
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - 以百分比表示的体脂指数
* `value.health.weight` - 体重，公斤，磅
* `value.health.bmi` - bmi 指数
* `value.health.calories` - 燃烧的卡路里
* `value.health.steps` - 完成的步骤
* `value.health.bpm` - 每分钟心跳数

＃＃ 其他
*`网址`
* `url.icon` - 图标（此外，任何对象都可以有`common.icon`）
* `url.cam` - 网络摄像头 URL
* `url.blank` - 在新窗口中打开 URL
* `url.same` - 在此窗口中打开 URL
* `url.audio` - 音频文件的 URL
* `text.phone` - 电话号码