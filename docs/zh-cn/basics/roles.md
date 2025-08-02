---
lastChanged: 24.01.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/roles.md
title: 滚动数据点
hash: P9fMNtraDsN408rMatVAgEME/i2cWWKuxVubLP3+9HI=
---
# 滚动数据点
对于类型 `state` 的对象，属性 `common.role` 必须设置为下面列表中定义的角色之一。
角色信息是非常重要的信息，允许可视化和智能助理适配器识别对象的功能以及它们如何/是否与同一通道、设备或文件夹中的其他对象相关。

示例：RGB 灯可以具有以下三个（或更多）具有不同角色的对象：

* `开关` - （开/关）
* `level.color.rgb` 带有 #RRGGBB 灯的颜色代码
* `level.brightness` 为亮度值

用于检测必需和可选对象及其角色的各种设备模板可以在[类型检测器存储库](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md)中找到。

＃＃ 一般来说
* `state` - 非常通用的用途，在不知道数据点具有什么作用时使用。
* `文本` `common.type = string`
* `text.url` `common.type = string` val 包含用于锚点、iframe 或 img 的 URL
* `html` `common.type = string`
* `json` `common.type = string`
* `列表` `common.type = 数组`
* `date` `common.type = string` - 可通过 `new Date(ddd)` 字符串解析
* `date` `common.type = number` - `纪元秒 * 1000`

## 传感器（布尔值，只读）
`common.type=boolean, common.write=false`

* `sensor.window` - 窗口打开 - `true` 或关闭 - `false`
* `sensor.door` - 门打开 - `true` 或关闭 - `false`
* `sensor.alarm` - 一些常规警报
* `sensor.alarm.flood` - 漏水
* `sensor.alarm.fire` - 火灾传感器
* `sensor.alarm.secure` - 警报打开时门打开、窗户打开或检测到运动。
* `sensor.alarm.power` - 没有电源（`电压 = 0`）
* `sensor.light` - 来自灯打开的反馈
* `sensor.lock` - 锁的当前位置
* `sensor.motion` - 运动传感器
* `sensor.rain` - 检测到雨
* `sensor.noise` - 检测到噪声

## 键（布尔值，只写）
`common.type=boolean, common.write=true, common.read=false`

*`按钮`
* `按钮.long`
* `button.stop` - 例如卷帘停止，
* `按钮.停止.倾斜`
* `按钮.开始`
* `按钮.打开.门`
* `按钮.窗口.打开`
* `button.open.blind`
* `按钮.打开.倾斜`
* `button.close.blind`
* `按钮.关闭.倾斜`
* `按钮.模式`*
* `按钮.模式.自动`
* `按钮.模式.手动`
* `按钮.模式.静音`

## 按钮作为传感器
`common.type=boolean, common.write=false, common.read=true`

* `button` - 与 `common.write=false` 的区别。请避免这个角色并使用“button.press”或“button.long”。
* `按钮.long`
* `按钮.按下`

## 值（数字，只读）
`common.type=number, common.write=false`

* `值`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) 很重要 (`CLOSED/TILTED/OPEN " ）。值可能会有所不同。
* `值.温度` (`common.unit='°C' 或 '°F' 或 'K'')
* `值.湿度`
* `value.brightness` - 亮度（单位：勒克斯，）
* `值.min`
* `值.max`
* `值.默认`
* `value.battery` - 电池电量
* `value.valve` - 阀门级别
* `value.time` - Date() 对象的 getTime()
* `value.interval` (common.unit='sec') - 以秒为单位的间隔（可以是 0.1 或更小）
* ~~value.date (common.type=string) - 格式为 2015.01.01 的日期（不含时间）~~
* ~~value.datetime (common.type=string) - 系统格式的日期和时间~~
* `value.gps.longitude` - GPS经度坐标
* `value.gps.latitude` - GPS 纬度
* `value.gps.elevation` - GPS海拔
* `value.gps` - 经度和纬度一起，如 '5.56;43.45'
* `value.gps.accuracy` - 当前 GPS 测量的精度
* `value.gps.radius` - 当前 GPS 测量的半径
* `value.power` - 实际功率（单位=W或KW）
* `value.power.conspiration` - 能源消耗（单位=Wh或KWh）
* `value.power.reactive` - 无功功率（单位=VAr）
* `value.direction` - (common.type=数字~~或字符串~~，显示上/下，左/右，4路开关，风向，...)
* `value.curtain` - 窗帘的当前位置
* `value.blind` - 百叶窗的当前位置（`max = 全开，min = 全关`）
* `value.tilt` - 当前倾斜位置（`max = 全开，min = 全关`）
* `value.lock` - 锁的当前位置
* `value.speed` - 风速
* `值.压力` - （单位：mbar）
* `值.距离`
* `值.距离.可见性`
* `value.severity` - 一定的严重性（可以指定条件），越高越重要
* `value.warning` - 一些警告（可以指定状态），越高越重要
* `value.sun.elevation` - 太阳位置°
* `value.sun.azimuth` - 太阳方位角（°）
* `value.volt` - 电压（以伏特为单位），`unit=V`
* `value.current` - 以安培为单位的电流，`unit=A`
* `value.fill` - 填充水平，`unit=l,ml,m3,%`
* `value.blood.sugar` - 血糖值，`unit=mmol,mgdl`

## 指标（布尔值，只读）
`common.type=boolean, common.write=false`

*指示器*和*传感器*之间的区别在于指示器显示为小图标。传感器作为实际值。
因此该指标不能单独存在于通道中。一定是渠道内的另一个主要地位。

* `指标`
* `indicator.working` - 指示目标系统正在执行某些操作，例如百叶窗或开锁。
* `indicator.reachable` - 如果设备在线
* `indicator.connected` - 仅用于实例。对设备使用“indicator.reachable”
* `indicator.maintenance` - 显示系统警告/错误、警报、服务消息、电池电量低或类似信息
* `指标.维护.lowbat`
* `指标.维护.未达到`
* `指示器.维护.警报`
* `indicator.lowbat` - 如果电池电量低则为 true
* `indicator.alarm` - 与indicator.maintenance.alarm相同
* `indicator.alarm.fire` - 检测到火灾
* `indicator.alarm.flood` - 检测到洪水
* `indicator.alarm.secure` - 门或窗打开
* `indicator.alarm.health` - 健康问题

## Level/级别（数字，读写）
使用**级别**，您可以控制或设置数值。

`common.type=number, common.write=true`

* `级别`
* `level.co2` - 0-100% 空气质量
* `level.dimmer` - 亮度也变暗
* `level.blind` - 设置百叶窗位置（最大=完全打开，最小=完全关闭）
* `level.temper` - 设置所需的温度
* `level.valve` - 阀门位置设定点
* `级别.颜色.红色`
* `级别.颜色.绿色`
* `级别.颜色.蓝色`
* `level.color.white` - rgbW
* `level.color.hue` - 颜色°`0-360； 0=红色，120=绿色，240=蓝色，360=红色（循环）`
* `级别.颜色.饱和度`
* `level.color.rgb` - 十六进制颜色，如`#rrggbb`
* `级别.颜色.亮度`
* `level.color.Temperature` - 色温 K° `2200 暖白，6500° 冷白`
* `level.timer`
* `level.timer.sleep` - 睡眠定时器。 0 - 关闭，或以分钟为单位
* ...
* `level.volume` - (`min=0, max=100`) - 音量，但最小值、最大值可能不同。最小值 < 最大值
* `level.volume.group` - (`min=0, max=100`) - 设备组的音量
* `level.curtain` - 设置窗帘位置
* `level.tilt` - 设置百叶窗的倾斜位置（最大=完全打开，最小=完全关闭）

## 开关（布尔值，读写）
开关控制布尔设备（`true = ON, false = OFF`）

`common.type=boolean, common.write=true`

*`开关`
* `switch.lock` - 锁定（`true - 打开锁定， false - 关闭锁定`）
* `switch.lock.door` - 门锁
* `switch.lock.window` - 窗口锁
* `switch.mode.boost` - 启动/停止恒温器的升压模式
* `switch.mode.party` - 启动/停止恒温器派对模式
* `switch.power` - 开/关恒温器或空调
* `开关.灯`
* `switch.comfort` - 舒适模式
* `开关.启用`
* `switch.power` - 电源开/关
* `切换模式`*
* `switch.mode.auto` - 自动模式开/关
* `switch.mode.manual` - 手动模式开/关
* `switch.mode.silent` - 静音模式开/关
* `switch.mode.moonlight` - 月光模式开/关
* `switch.mode.color` - 颜色模式开/关
* `switch.gate` - 关闭（false）或打开（true）门

## 空调或恒温器
* `level.mode.fan` - `自动、高、低、中、安静、涡轮`
* `level.mode.swing` - `自动、水平、静止、垂直`
* `level.mode.airconditioner` - 空调：`AUTO、COOL、DRY、ECO、FAN_ONLY、HEAT、OFF`，加热恒温器：`AUTO、MANUAL、VACATION`，
* `level.mode.thermostat` - 恒温器：`自动、手动、休假`,

 除了这些状态之外，通常还需要 `level.temperature` 和 `switch.power` 来绘制空调系统图。

TODO：考虑电离和振荡。

## 吸尘器
* `level.mode.cleanup` - 枚举`AUTO、ECO、EXPRESS、NORMAL、QUIET`。仅需要“AUTO”和“NORMAL”。
* `level.mode.work` - 枚举`AUTO、FAST、MEDIUM、SLOW、TURBO`。可选条件。
* `value.water` - 0-100% 水位。
* `value.waste` - 0-100% 垃圾箱水平。 （0% - 空，100% - 满）
* `indicator.maintenance.waste` - 垃圾桶很愚蠢。
* `value.state` - `家庭、清洁、暂停`等。

除了这些状态之外，通常还需要 `switch.power` 来关联真空吸尘器。在本例中，`switch.power` 的作用为：`true` - 干净，`false` - 返回家园。
可选`value.battery`和

＃＃ 目标
* `switch.gate` - 关闭（false）或打开（true）门（必需）
* `value.position` - 门的位置百分比（100% 打开，0% - 关闭）
* `value.gate` - 与 `value.position` 相同
* `button.stop` - 停止门运动

＃＃ 媒体
媒体播放器的特殊角色

* `按钮.停止`
* `按钮.播放`
* `按钮.下一步`
* `按钮.上一个`
* `按钮.暂停`
* `切换.暂停`
* `按钮.前进`
* `按钮.反转`
* `按钮.快进`
* `按钮.fastreverse`
* `按钮.音量.增大`
* `按钮.音量.减小`
* `media.seek` - (`common.type=number`) %
* `media.mode.shuffle` - (`common.type=number`) 0 - 无，1 - 全部，2 - 一个
* `media.mode.repeat` - (`common.type=boolean`)
* `media.state` - ['播放','停止','暂停'] 或 [0 - 暂停, 1 - 播放, 2 - 停止] 或 [true - 播放/false - 暂停]
* `媒体艺术家`
* `媒体.相册`
* `媒体.标题`
* `媒体.标题.下一个`
* `media.cover` - 封面 URL
* `media.cover.big` - 大封面 URL
* `media.cover.small` - 小封面 URL
* `media.duration.text` - 例如“2:35”
* `media.duration` - (`common.type=number`) 秒
* `media.elapsed.text` - 例如“1:30”
* `media.elapsed` - (`common.type=number`) 秒
* `media.broadcastDate` - (`common.type=string`) 广播日期
* `media.mute` - (`common.type=boolean`) true 为静音
* `media.season` - (`common.type=string`) 季节编号（重要的是类型实际上是“字符串”，以便能够用“”指示季节的缺失）
* `media.episode` - (`common.type=string`) 剧集编号（重要的是类型实际上是“字符串”，以便能够用“”指示剧集的缺失）
* `media.mute.group` - (`common.type=boolean`) 静音设备组
* `media.tts` - 文本转语音
* `媒体.比特率` - kbps
* `media.genre` - 流派歌曲
* `media.date` - 年度歌曲
* `media.track` - (`common.type=string`) 当前播放曲目 ID [0 - ~] （重要的是类型实际上是 `string`，以便能够用“”指示曲目的缺失。
* `media.playid` - 媒体播放器轨道 ID
* `media.add` - 添加当前播放列表
* `media.clear` - 清除当前播放列表（只写）
* `media.playlist` - json 数组，例如
* `media.url` - 要播放的 URL 或当前 URL
* `media.url.announcement` - 播放公告的 URL
* `media.jump` - 跳转到播放列表的项目数（可以为负数）
* `media.content` - 播放的媒体类型，例如音频/mp3
* `media.link` - 当前文件的状态
* `media.input` - 输入的数字或字符串（AUX、AV、TV、SAT...）
* `level.bass` - 低音级别
* `level.treble` - 高音级别
* `switch.power.zone` - 电源区域

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

* `media.browser` - Json 数组，如“Files”

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
* `value.temper` - 当前温度
* `value.Temperature.windchill` - 实际风寒
* `value.Temperature.dewpoint` - 当前露点
* `value.Temperature.feelslike` - 实际温度“感觉像”
* `value.temperence.min` - 过去24小时内的最低温度
* `value.Temperature.max` - 过去24小时内的最高温度
* `value.humidity` - 实际或平均湿度
* `value.humidity.min` - 实际湿度
* `value.humidity.max` - 实际湿度
* `value.speed.wind` - 当前或平均风速
* `value.speed.max.wind` - 过去24小时的最大风速
* `value.speed.min.wind` - 过去24小时的最小风速
* `value.speed.wind.gust` - 实际阵风速度
* `value.direction.wind` - 当前或平均风向（以度为单位）
* `value.direction.max.wind` - 当前风向（以度为单位）
* `value.direction.min.wind` - 当前风向（以度为单位）
* `weather.direction.wind` - 当前或平均风向为文本，例如 NNW
* `date` - 当前日期或上次读取信息的日期
* `date.sunrise` - 今天的日出
* `date.sunset` - 今天的日落
* `dayofweek` - 一周中的某一天作为文本
* `location` - 位置的文本描述（例如地址）
* `weather.icon` - 当前状态图标 URL
* `weather.icon.wind` - 当前的风图标 URL
* `weather.icon.name` - 状态图标的当前名称
* `weather.state` - 当前天气描述
* `value.precipitation` - (`类型：数字，单位：毫米`) 最近24小时雨/雪的降水量（今天的降水量为雪或雨）
* `value.precipitation.hour` - 最后一小时的实际降水量
* `value.precipitation.today` - 今天的当前降雨量（截至 0:00）
* `value.precipitation.chance` - 今天实际降水概率
* `value.precipitation.type` - 今天的当前降水类型。 （`类型：数字`）状态：0 - 无，1 - 雨，2 - 雪，3 - 冰雹
* `value.radiation` - 实际太阳辐射
* `value.uv` - 实际 UV 值
* `value.clouds` - 天空中的云。 0% - 无云，100% - 许多云。
* `value.rain` - 过去 24 小时内的实际降雨量
* `value.rain.hour` - 过去一小时的实际降雨量
* `value.rain.today` - 今天的当前降雨量（直到 0:00）
* `value.snow` - 过去24小时内的实际雪量
* `value.snow.hour` - 过去一小时的实际雪量
* `value.snow.today` - 今天的当前降雪高度（直到 0:00）
* `value.snowline` - 实际雪线（以米为单位）
* `weather.chart.url` - 天气历史图表的 URL
* `weather.chart.url.forecast` - 天气预报图表的 URL
* `weather.html` - 带有天气描述的 HTML 对象
* `waether.title` - 非常简短的描述
* `weather.title.short` - 非常非常简短的描述（一个词）
* `weather.type` - 天气信息的类型
* `weather.json` - 具有特定数据的 JSON 对象
* `value.speed.wind.forecast.0` - 今天的风速预测
* `weather.state.forecast.0` - 今天的天气描述
* `value.direction.wind.forecast.0` - 今天的风向预测（以度为单位）
* `weather.direction.wind.forecast.0` - 今天的风向预测文本
* `value.Pressure.forecast.0` - 今天的压力预测
* `value.Temperature.min.forecast.0` - 今天的最低气温预测
* `value.Temperature.max.forecast.0` - 今天的最高气温预测
* `value.precipitation.forecast.0` - (`类型：数字，单位：%`) 今天的降水概率预测
* `value.prepitation.forecast.0` - (`类型：数字，单位：毫米`) 今日降水量预测
* `weather.title.forecast.0` - 对明天的非常简短的描述
* `value.precipitation.day.forecast.0` - 当天的降水量预报
* `value.precipitation.night.forecast.0` - 夜间降水预报

* `date.forecast.1` - 明天的日期
* `weather.icon.forecast.1` - 明天的图标
* `weather.state.forecast.1` - 明天的天气状态
* `值.温度.最低.预测.1`
* `值.温度.最低.预测.1`
* `value.prepitation.forecast.1` - (`类型：数字，单位：%`) 明天降水概率的预测
* `value.prepitation.forecast.1` - (`类型：数字，单位：毫米`) 明天降水量预测
* `值.方向.风.预测.1`
* `值.速度.风.预测.1`
* `值.压力.预测.1`

## 信息
* `info.ip` - 设备的IP
* `info.mac` - 设备的 Mac
* `info.name` - 设备名称
* `info.address` - 另一个地址（例如 KNX）
* `info.serial` - 序列号
* `info.firmware` - 固件版本
* `info.hardware` - 硬件版本
* `info.port` - TCP 端口
* `info.standby` - 如果设备处于待机模式则为 true
* `info.status` - 设备状态
* `info.display` - 设备显示屏上显示的信息
* `date.start` - 字符串或数字
* `date.end` - 字符串或数字

＃＃ 健康
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - 身体脂肪指数（%）
* `value.health.weight` - 体重（公斤、磅）
* `value.health.bmi` - Bmi 指数
* `value.health.calories` - 燃烧的卡路里
* `value.health.steps` - 完成的步骤
* `value.health.bpm` - 每分钟心跳数

＃＃ 其他的
* `网址`
* `url.icon` - 图标（此外，每个对象都可以有 `common.icon`）
* `url.cam` - 网络摄像头 URL
* `url.blank` - 在新窗口中打开 URL
* `url.same` - 在此窗口中打开 URL
* `url.audio` - 音频文件的 URL
* `text.phone` - 电话号码