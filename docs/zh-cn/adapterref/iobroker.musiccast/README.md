---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: T5qSweTthdZEApvP+6oMSEZA/qXiooHxcYxHPtmHTrc=
---
![标识](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![安装数量](http://iobroker.live/badges/musiccast-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**测试：** ![测试与发布](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

适用于 Yamaha MusicCast 设备（如 WX-010/030、YSP-1600）的适配器

＃＃ 安装：
安装至少需要nodejs v10

来自 npm

```javascript
npm install iobroker.musiccast
```

来自 github 的实际版本（当开发正在进行时，这可能不是每次都有效）

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

＃＃ 设置
管理页面的“+”可用于手动添加 IP 地址、DeviceID、类型和名称。
按搜索按钮进行发现。如果您有多个设备，则必须多次点击按钮，直到发现所有设备。不幸的是，该发现当时仅返回一个对象，这可能是您的任何 MusicCast 设备。如果返回值与表中已有的部分相同，则必须再次点击按钮。有时保存并再次打开大明页面会有所帮助。

万一出现 2 个或更多设备提供相同 ID 的情况，请稍微更改一个 ID。否则适配器无法区分这两个设备。

如果您想查看您收听的曲目的播放时间更新，请启用/选中相应的复选框。请注意，这会增加消息计数（每台设备每秒都会更新）。

## 可用对象
目前已实现以下对象：

### 基本（区域）
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> 开启/待机|
|{zone}.zone_b|boolean|?|true/false -> 目标区域是区域 B|
|{zone}.mute|boolean|x|true/false -> 静音/不静音|
|{zone}.volume|value|x|0...max（最大值取决于设备）|
|{zone}.act_vol_mode|文本|?|dB 模式下的实际音量|
|{zone}.act_vol_val|值|?|实际音量（以 dB 值表示）|
|{zone}.act_vol_unit|文本|-|实际音量单位（应为 dB）|
|{zone}.act_vol_mode_list|文本|-|dB 模式下的实际音量|
|{zone}.input|text|x|输入取决于设备|
|{zone}.input_list|文本|-|可能的输入|
|{zone}.input_text|文本|-|选择输入作为文本|
|{zone}.sound_program|文本|x|设置声音程序|
|{zone}.sound_program_list|文本|-|可能的声音节目|
|{zone}.surr_decoder_type|文本|?|设置环绕类型|
|{zone}.surr_decoder_type_list|text|-|可能的环绕解码器|
|{zone}.link_control|text|x|设置链接控制|
|{zone}.link_control_list|文本|-|可能的链接控制设置|
|{zone}.link_audio_delay|text|x|设置链接音频延迟|
|{zone}.link_audio_delay_list|text|-|可能的链接链接音频延迟设置|
|{zone}.clearVoice|boolean|x|清除语音控制|
|{zone}.low|值|x|EQ 低电平|
|{zone}.mid|值|x|电平均衡器中|
|{zone}.high|值|x|EQ 电平高|
|{zone}.subwoofer_volume|值|x|级别低音炮音量|
|{zone}.bass|值|x|低音级别|
|{zone}.treble|值|x|高音级别|
|{zone}.tone_control_mode_list|文本|-|可能的音调控制模式|
|{zone}.tone_mode|boolean|?|音调控制模式|
|{zone}.balance|值|x|级别余额|
|{zone}.direct|boolean|x|设置直接|
|{zone}.pure_direct|boolean|x|设置纯直接|
|{zone}.enhancer|boolean|x|设置增强器|
|{zone}.bass_extension|boolean|x|设置低音扩展|
|{zone}.sleep|值|x|睡眠定时器|
|{zone}.disable_flags|boolean|x|设置disable_flags|
|{zone}.contents_display|boolean|x|设置contents_display|
|{zone}.party_enable|boolean|x|设置 party_enable|
|{zone}.extra_bass|boolean|x|设置 extra_bass|
|{zone}.adaptive_drc|boolean|x|设置adaptive_drc|
|{zone}.dts_dialogue_control|值|x|设置dts_dialogue_control|
|{zone}.adaptive_dsp_level|boolean|x|设置adaptive_dsp_level|

### 网络
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|netusb.input|值|x|设置/实际输入|
|netusb.playPause|boolean|x|设置播放/暂停|
|netusb.playback|文本|-|网络播放器状态|
|netusb.stop|布尔值|x|设置停止|
|netusb.auto_stop|boolean|-|自动停止|
|netusb.next|布尔值|x|设置向前|
|netusb.prev|布尔值|x|设置快退|
|netusb.shuffle|布尔值|x|切换随机播放|
|netusb.shuffle_stat|文本|-|随机播放状态|
|netusb.repeat|布尔值|x|切换重复|
|netusb.repeat_stat|文本|-|重复状态|
|netusb.artist|文本|-|艺术家姓名|
|netusb.album|文本|-|相册名称|
|netusb.track|文本|-|轨道名称|
|netusb.albumart_url|文本|-|专辑封面的http地址|
|netusb.albumart_id|值|-|专辑艺术 ID|
|netusb.play_time|值|-|以 s 为单位的播放时间|
|netusb.play_queue_type|文本|-|netusb 队列类型|
|netusb.total_time|值|-|s 中播放的总时间|
|netusb.recent_info|json|-|播放过的项目的历史记录|
|netusb.preset_info|json|-|保存的预设/收藏夹|
|netusb.presetrecallnumber|值|x|调出收藏夹列表中的#|
|netusb.usb_devicetype|文本|-|连接的 USB 设备类型|
|netusb.attribute|值|-|哪些可能有服务，需要解码|
|netusb.recallRecentItem|值|x|哪个possibiolites有该服务，待解码|

＃＃＃ 系统
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|system.api_version|值|-|API 版本|
|system.system_version|值|-|系统版本|
|system.inputs.{service}|值|-|可用的输入服务|
|system.inputs.{service}.account_enable|值|-|启用可用输入服务|
|system.inputs.{service}.distribution_enable|值|-|可用的输入服务可分发|
|system.inputs.{service}.play_info_type|值|-|可用的输入服务类型|

＃＃＃ 激光唱机
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|设置播放/暂停|
|cd.playback|文本|-|CD 播放器状态|
|cd.stop|布尔值|x|设置停止|
|cd.next|boolean|x|设置前进|
|cd.prev|boolean|x|设置快退|
|cd.shuffle|boolean|x|切换随机播放|
|cd.shuffle_stat|文本|-|随机播放状态|
|cd.repeat|boolean|x|切换重复|
|cd.repeat_stat|文本|-|重复状态|
|cd.device_stat|文本|-|设备状态|
|cd.playtime|值|-|当前播放时间|
|cd.totaltime|值|-|当前曲目总时间|
|cd.disctime|值|-|CD 总时间|
|cd.tracknumber|值|-|播放中的当前曲目|
|cd.totaltracks|值|-|CD 曲目总数|
|cd.艺术家|文本|-|艺术家姓名|
|cd.album|文本|-|专辑名称|
|cd.track|文本|-|曲目名称|

### 调音器
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|tuner.common_preset_info|数组|-|预设信息|
|tuner.am.preset_info|数组|-|预设 AM 信息|
|tuner.fm.preset_info|数组|-|预设 FM 信息|
|tuner.dab.preset_info|数组|-|预设 DAB 信息|
|tuner.am.preset|编号|x|AM 预设编号|
|tuner.am.freq|数字|x|AM 频率（kHz）|
|tuner.am.tuned|布尔值|-|AM 已调谐|
|tuner.fm.preset|编号|x|FM 预设编号|
|tuner.fm.freq|数字|x|FM 频率（kHz）|
|tuner.fm.tuned|布尔值|-|FM 调谐|
|tuner.fm.audio_mode|字符串|-|FM 单声道/立体声|
|tuner.dab.preset|编号|x|DAB 预设编号|
|tuner.dab.id|编号|-|DAB 站 ID|
|tuner.dab.status|字符串|-|DAB 状态|
|tuner.dab.freq|数字|-|DAB 频率|
|tuner.dab.category|字符串|-|主要/次要|
|tuner.dab.audio_mode|字符串|-|DAB 单声道/立体声|
|tuner.dab.bit_rate|数字|-|以 kpbs 为单位的 DAB 比特率|
|tuner.dab.quality|数字|-|DAB 质量 0-100|
|tuner.dab.tune_aid|数字|-|DAB 信号强度 0-100|
|tuner.dab.off_air|布尔值|-|DAB 关闭广播|
|tuner.dab.dab_plus|布尔值|-|DAB+|
|tuner.dab.program_type|字符串|-|DAB 节目类型|
|tuner.dab.ch_label|字符串|-|DAB CH 标签|
|tuner.dab.service_label|字符串|-|DAB 服务标签|
|tuner.dab.dls|字符串|-|DAB DLS|
|tuner.dab.ensemble_label|字符串|-|DAB 合奏标签|
|tuner.dab.initial_scan_progress|数字|-|DAB 初始扫描进度 0-100|
|tuner.dab.total_station_num|编号|-|DAB 总站 0-255|
|tuner.rds.program_type|字符串|-|RDS 节目类型|
|tuner.rds.program_service|字符串|-|RDS 节目服务|
|tuner.rds.radio_text_a|字符串|-|RDS 文本 A|
|tuner.rds.radio_text_b|字符串|-|RDS 文本 B|

＃＃＃ 钟
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|clock.auto_sync|boolean|x|时钟自动同步|
|clock.format|字符串|x|时钟格式 12h/24h|
|clock.alarm_on|boolean|x|时钟闹钟状态开/关|
|clock.volume|number|x|时钟闹钟音量|
|clock.fade_interval|number|x|时钟闹钟淡入淡出间隔|
|clock.fade_type|number|x|时钟闹钟淡入淡出类型|
|clock.mode|string|x|时钟闹钟模式一天/每周|
|clock.repeat|boolean|x|如果指定某一天则时钟闹钟重复|
|clock.{day}.enable|boolean|x|时钟设置有效性|
|clock.{day}.time|string|-|时钟闹钟启动时间 hhmm 00-23,00-59|
|clock.{day}.beep|boolean|x|时钟蜂鸣声有效性|
|clock.{day}.playback_type|string|-|时钟闹钟播放类型恢复/预设|
|clock.{day}.resume_input|string|-|时钟闹钟恢复输入ID|
|clock.{day}.preset_type|string|-|时钟闹钟预设类型|
|clock.{day}.preset_num|number|-|时钟闹钟预设输入ID|
|clock.{day}.preset_netusb_input|string|-|时钟闹钟netusb输入ID|
|clock.{day}.preset_netusb_text|string|-|时钟闹钟 netusb 文本|
|clock.{day}.preset_tuner_band|string|-|时钟闹钟调谐器频段|
|clock.{day}.preset_tuner_number|number|-|时钟闹钟调谐器频率或电台 ID|

＃＃ 去做
* 支持列表
* 将交互值更改为漂亮的命名
* NETUSB/CD 快进/快退
* 蓝牙
* 对话级别

## 1.0.0 重大变更
* deviceId 以前是 systemId，它不是唯一的。现在使用了 deviceId，这正在更改对象树
* 音乐广播API 2.0.0
* 设备搜索现在可以返回超过 1 个设备
* 开发人员在管理面板中的新输出
* 更多异步/等待
* 修正测试

#### 0.2.2
* 音乐广播 API 0.0.14

#### 0.2.1
* 2022 年许可证
* 依赖性修正

#### 0.2.0
* 使用“创建适配器”进行重构
* 异步/等待

#### 0.1.5
* (Scrounger) 设备无法访问时的错误处理

#### 0.1.4
* (Scrounger) 类型不匹配的修正（数组对象）

#### 0.1.3
* (foxthefox) 添加了 linkControl/linkAudioDelay/linkAudioQuality 的编写

#### 0.1.2
*（Scrounger）类型不匹配的更正（字符串布尔值）

#### 0.1.1
* 修正时钟“oneday”

#### 0.1.0
* 紧凑模式
* 雅马哈-yxc-nodejs 0.0.8
* 小部件更新

#### 0.0.9
* adminV3使用values2table并再次添加按钮
* zone2/3/4 现已工作
* 扩展自动测试
* 管理中用于收集 JSON 响应的按钮

#### 0.0.8
* 自动测试更新
* 管理页面中的给定名称出现在对象（设备）中

#### 0.0.7
* 调谐器支持
* 时钟支持（主要是信息）
* 支持更多区域
* 支持mc-link
* 根据特性设置最小值和最大值
* 管理v3

#### 0.0.6
* 与对象和控件相匹配的小部件集
* cd.shuffle_stat 布尔值 -> 文本
* 新的netusb.shuffle_stat（文本）
* 通过订阅UDP消息更新状态
* 更新游戏时间信息的开关（禁用会减少流量）

#### 0.0.5
* 管理页面中的清理
* 改进对象创建
* netusb 上有更多对象
* 系统中更多的对象
* 增加了对CD的支持

#### 0.0.4
* 新对象和函数（输入、sound_prog、EQ、clearVoice）
* 在管理页面中搜索/发现

#### 0.0.3
* 实现了更多对象

#### 0.0.2
* 小修正

#### 0.0.1
* 初始版本在配置页面中设置 IP，
* 可用命令电源、静音、音量

## Changelog
### 1.1.3
* translation with adapter-dev

### 1.1.2
* new version yamahe-yxc library

### 1.1.1
*  (scrounger) added datapoint isOnline, used by ioBroker.device-watcher

### 1.1.0 (npm)
* improved testing

### 1.0.8
* error correction add_to_group/remove_from_group

#### 1.0.7
* error correction in link/unlink/distribution

#### 1.0.6
* (scrounger) recallRecentItem added

#### 1.0.5
* usage of new IOB test library

#### 1.0.4
* correction for setting the input ("setInput")

#### 1.0.3
* new datapoint "extra_bass"
* new datapoint "adaptive_drc"
* new datapoint "dts_dialogue_control"
* new datapoint "adaptive_dsp_level"
* these are only read in, most likely they are commands, but the API is unknown

#### 1.0.2
* new datapoint "input_text"

#### 1.0.1
* changed algorithm for developer support

## License

The MIT License (MIT)

Copyright (c) 2017 - 2023 foxthefox <foxthefox@wysiwis.net>