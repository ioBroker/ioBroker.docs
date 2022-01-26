---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: wkBvhQ++frCk99DOENud8SfkZpKXrLLCwHJ4f60MGoo=
---
![标识](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![安装数量](http://iobroker.live/badges/musiccast-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![构建状态](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![新PM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

# IoBroker.musiccast
适用于 WX-010/030、YSP-1600 等 Yamaha MusicCast 设备的适配器

＃＃ 安装：
安装至少需要 nodejs v10

来自 npm

```javascript
npm install iobroker.musiccast
```

来自 github 的实际版本（这可能不是每次都有效，当开发正在进行时）

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## 设置
管理页面的“+”可用于手动添加 IP 地址、设备 ID、类型和名称。
按搜索按钮进行发现。如果您有多个设备，则必须多次点击该按钮，直到发现所有设备。不幸的是，该发现当时只返回一个对象，这可能是您的任何 MusicCast 设备。如果返回与表中已经存在的部分相同，则必须再次点击按钮。有时它有助于保存并再次打开 damin 页面。

万一有 2 个或更多设备提供相同的 ID，则稍微更改一个 ID。否则适配器无法区分这 2 个设备。

如果您想查看您收听的曲目的播放时间更新，请启用/选中相应的复选框。请注意，这会增加消息计数（每台设备每秒更新一次）。

## 可用对象
当前实现了以下对象：

### 基本（区域）
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> 开启/待机|
|{zone}.zone_b|boolean|?|true/false -> 目标区域是区域 B|
|{zone}.mute|boolean|x|true/false -> 静音/不静音|
|{zone}.volume|value|x|0...max（最大值取决于设备）|
|{zone}.act_vol_mode|text|?|dB 模式下的实际音量|
|{zone}.act_vol_val|value|?|实际音量（dB 值）|
|{zone}.act_vol_unit|text|-|实际音量单位（应为dB）|
|{zone}.act_vol_mode_list|text|-|dB 模式下的实际音量|
|{zone}.input|text|x|取决于设备的输入|
|{zone}.input_list|文本|-|可能的输入|
|{zone}.sound_program|text|x|设置声音程序|
|{zone}.sound_program_list|text|-|可能的声音节目|
|{zone}.surr_decoder_type|text|?|设置环绕类型|
|{zone}.surr_decoder_type_list|text|-|可能的环绕解码器|
|{zone}.link_control|text|x|设置链接控制|
|{zone}.link_control_list|text|-|可能的链接控制设置|
|{zone}.link_audio_delay|text|x|设置链接音频延迟|
|{zone}.link_audio_delay_list|text|-|可能的链接链接音频延迟设置|
|{zone}.clearVoice|boolean|x|clear 语音控制|
|{zone}.low|value|x|电平 EQ 低|
|{zone}.mid|value|x|level EQ mid|
|{zone}.high|value|x|电平 EQ 高|
|{zone}.subwoofer_volume|value|x|level 低音炮音量|
|{zone}.bass|value|x|低音级别|
|{zone}.treble|value|x|高音电平|
|{zone}.tone_control_mode_list|text|-|可能的音调控制模式|
|{zone}.tone_mode|boolean|?|音调控制模式|
|{zone}.balance|value|x|级别余额|
|{zone}.direct|boolean|x|直接设置|
|{zone}.pure_direct|boolean|x|设置纯直接|
|{zone}.enhancer|boolean|x|设置增强器|
|{zone}.bass_extension|boolean|x|设置低音扩展|
|{zone}.sleep|value|x|睡眠定时器|

### Netusb
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|netusb.input|value|x|设置/实际输入|
|netusb.playPause|boolean|x|设置播放/暂停|
|netusb.playback|文本|-|状态网络播放器|
|netusb.stop|boolean|x|设置停止|
|netusb.auto_stop|boolean|-|自动停止|
|netusb.next|boolean|x|向前设置|
|netusb.prev|boolean|x|设置倒带|
|netusb.shuffle|boolean|x|切换随机播放|
|netusb.shuffle_stat|文本|-|随机状态|
|netusb.repeat|布尔值|x|切换重复|
|netusb.repeat_stat|文本|-|重复状态|
|netusb.artist|文本|-|艺术家姓名|
|netusb.album|文本|-|专辑名称|
|netusb.track|文本|-|曲目名称|
|netusb.albumart_url|文本|-|专辑封面的http地址|
|netusb.albumart_id|值|-|专辑封面 ID|
|netusb.play_time|值|-|以 s 为单位的播放时间|
|netusb.play_queue_type|文本|-|netusb 队列类型|
|netusb.total_time|value|-|在 s 中播放的总时间|
|netusb.recent_info|json|-|播放项目历史|
|netusb.preset_info|json|-|保存的预设/收藏|
|netusb.presetrecallnumber|value|x|调用收藏列表中的#|
|netusb.usb_devicetype|text|-|连接的 USB 设备的类型|
|netusb.attribute|value|-|哪些可能性有服务，待解码|

＃＃＃ 系统
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|system.api_version|value|-|API 版本|
|system.system_version|值|-|系统版本|
|system.inputs.{service}|value|-|可用的输入服务|
|system.inputs.{service}.account_enable|value|-|可用的输入服务已启用|
|system.inputs.{service}.distribution_enable|value|-|可用的输入服务可分发|
|system.inputs.{service}.play_info_type|value|-|可用的输入服务类型|

＃＃＃ 激光唱机
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|设置播放/暂停|
|cd.playback|text|-|状态 CD 播放器|
|cd.stop|boolean|x|设置停止|
|cd.next|boolean|x|向前设置|
|cd.prev|boolean|x|设置倒带|
|cd.shuffle|boolean|x|切换随机播放|
|cd.shuffle_stat|text|-|洗牌状态|
|cd.repeat|布尔值|x|切换重复|
|cd.repeat_stat|文本|-|重复状态|
|cd.device_stat|文本|-|设备状态|
|cd.playtime|value|-|当前播放时间|
|cd.totaltime|value|-|当前曲目总时间|
|cd.disctime|值|-|CD 总时间|
|cd.tracknumber|value|-|当前正在播放的曲目|
|cd.totaltracks|值|-|CD 曲目总数|
|cd.artist|文本|-|艺术家姓名|
|cd.album|文本|-|专辑名称|
|cd.track|文本|-|曲目名称|

###调谐器
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|tuner.common_preset_info|array|-|预设信息|
|tuner.am.preset_info|array|-|预设 AM 信息|
|tuner.fm.preset_info|array|-|预设调频信息|
|tuner.dab.preset_info|array|-|预设 DAB 信息|
|tuner.am.preset|number|x|AM 预设编号|
|tuner.am.freq|number|x|以 kHz 为单位的 AM 频率|
|tuner.am.tuned|布尔值|-|调幅|
|tuner.fm.preset|number|x|FM 预设编号|
|tuner.fm.freq|number|x|以 kHz 为单位的 FM 频率|
|tuner.fm.tuned|布尔值|-|调频|
|tuner.fm.audio_mode|字符串|-|FM 单声道/立体声|
|tuner.dab.preset|number|x|DAB 预设编号|
|tuner.dab.id|编号|-|DAB 电台 ID|
|tuner.dab.status|字符串|-|DAB 状态|
|tuner.dab.freq|数字|-|DAB 频率|
|tuner.dab.category|字符串|-|主要/次要|
|tuner.dab.audio_mode|字符串|-|DAB 单声道/立体声|
|tuner.dab.bit_rate|number|-|DAB 比特率 (kpbs)|
|tuner.dab.quality|number|-|DAB 质量 0-100|
|tuner.dab.tune_aid|number|-|DAB 信号强度 0-100|
|tuner.dab.off_air|布尔值|-|DAB 关闭空气|
|tuner.dab.dab_plus|布尔值|-|DAB+|
|tuner.dab.program_type|字符串|-|DAB 节目类型|
|tuner.dab.ch_label|字符串|-|DAB CH 标签|
|tuner.dab.service_label|字符串|-|DAB 服务标签|
|tuner.dab.dls|字符串|-|DAB DLS|
|tuner.dab.ensemble_label|字符串|-|DAB 合奏标签|
|tuner.dab.initial_scan_progress|number|-|DAB 初始扫描进度 0-100|
|tuner.dab.total_station_num|number|-|DAB 全站 0-255|
|tuner.rds.program_type|字符串|-|RDS 程序类型|
|tuner.rds.program_service|字符串|-|RDS 程序服务|
|tuner.rds.radio_text_a|字符串|-|RDS 文本 A|
|tuner.rds.radio_text_b|字符串|-|RDS 文本 B|

＃＃＃ 钟
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|clock.auto_sync|boolean|x|时钟自动同步|
|clock.format|string|x|时钟格式 12h/24h|
|clock.alarm_on|boolean|x|时钟闹钟状态开/关|
|clock.volume|number|x|时钟闹钟音量|
|clock.fade_interval|number|x|时钟警报渐变间隔|
|clock.fade_type|number|x|时钟闹钟渐变类型|
|clock.mode|string|x|每天/每周时钟闹钟模式|
|clock.repeat|boolean|x|如果指定了一天，则重复时钟闹钟|
|clock.{day}.enable|boolean|x|时钟设置有效性|
|clock.{day}.time|string|-|时钟闹钟启动时间 hhmm 00-23,00-59|
|clock.{day}.beep|boolean|x|时钟哔声有效性|
|clock.{day}.playback_type|string|-|时钟闹钟播放类型恢复/预设|
|clock.{day}.resume_input|string|-|时钟闹钟恢复输入ID|
|clock.{day}.preset_type|string|-|时钟闹钟预设类型|
|clock.{day}.preset_num|number|-|时钟闹钟预设输入ID|
|clock.{day}.preset_netusb_input|string|-|时钟闹钟netusb输入ID|
|clock.{day}.preset_netusb_text|string|-|时钟闹钟 netusb 文本|
|clock.{day}.preset_tuner_band|string|-|时钟闹钟调谐器波段|
|clock.{day}.preset_tuner_number|number|-|时钟闹钟调谐器频率或电台 ID|

＃＃ 去做
* 支持列表
*将交互值更改为漂亮的命名
* NETUSB/CD 的快进/快退
* 蓝牙
* 对话级别

## 1.0.0 重大更改
* deviceId 以前是 systemId，它不是唯一的。现在使用了 deviceId，这是在更改对象树
* 音乐广播 API 2.0.0
* 设备搜索现在可以返回超过 1 个设备
* 管理面板中开发人员的新输出
* 更多异步/等待

#### 0.2.2
* 音乐广播 API 0.0.14

#### 0.2.1
* 许可证 2022
* 依赖修正

#### 0.2.0
* 使用“创建适配器”进行重构
* 异步/等待

#### 0.1.5
* (Scrounger) 设备不可访问时的错误处理

#### 0.1.4
* (Scrounger) 修正类型不匹配（数组对象）

#### 0.1.3
* (foxthefox) 为 linkControl/linkAudioDelay/linkAudioQuality 添加了写作

#### 0.1.2
* (Scrounger) 修正类型不匹配（字符串布尔值）

#### 0.1.1
*修正时钟“一天”

#### 0.1.0
*紧凑模式
* yamaha-yxc-nodejs 0.0.8
* 小部件更新

#### 0.0.9
* adminV3 使用 values2table 并再次添加按钮
* zone2/3/4 现在工作
* 扩展自动测试
* 用于收集 JSON 响应的管理员按钮

#### 0.0.8
* 自动测试更新
* 管理页面中的给定名称出现在对象（设备）中

#### 0.0.7
*调谐器支持
*时钟支持（信息为主）
* 支持更多区域
* 支持 mc-link
*根据功能设置最小值和最大值
* 管理员 v3

#### 0.0.6
* 小部件集匹配对象和控件
* cd.shuffle_stat 布尔值 -> 文本
* 新的 netusb.shuffle_stat（文本）
* 通过订阅 UDP 消息更新状态
* 切换以更新游戏时间信息（禁用可减少流量）

#### 0.0.5
* 管理页面中的清理
* 对象创建的改进
* netusb 上的更多对象
* 系统中的更多对象
* 增加了对 CD 的支持

#### 0.0.4
* 新对象和功能（输入、sound_prog、EQ、clearVoice）
* 在管理页面中搜索/发现

#### 0.0.3
* 更多对象实现

#### 0.0.2
* 小修正

#### 0.0.1
* 在配置页面中设置 IP 的初始版本，
* 可用命令电源、静音、音量

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2017 - 2022 foxthefox <foxthefox@wysiwis.net>