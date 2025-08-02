---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: +Y3fTE3nCjE0f9m03KWr9TD02GnweDhdmOqMaSdMScg=
---
![标识](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![安装数量](http://iobroker.live/badges/musiccast-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**测试：**![测试与发布](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

适用于 Yamaha MusicCast 设备（如 WX-010/030、YSP-1600）的适配器

＃＃ 设置
管理页面的“+”可用于手动添加 IP 地址、设备 ID、类型和名称。
按搜索按钮进行发现。如果您有多个设备，则必须多次点击该按钮，直到发现所有设备。不幸的是，发现一次只返回一个对象，这可能是您的任何 MusicCast 设备。如果返回的内容与表格中已有的内容相同，则必须再次点击该按钮。有时保存并再次打开 damin 页面会有所帮助。

在极少数情况下，如果两个或多个设备提供相同的 ID，则稍微更改一个 ID。否则适配器无法区分这两个设备。

如果您想查看所听曲目的播放时间更新，请启用/选中相应的复选框。请注意，这会增加消息数量（每台设备每秒都会更新一次）。

## 可用对象
当前已实现以下对象：

### 基本（区域）
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> 开启/待机|
|{zone}.zone_b|boolean|?|true/false -> 目标区域是区域 B|
|{zone}.mute|boolean|x|true/false -> 静音/非静音|
|{zone}.volume|value|x|0...max（最大值取决于设备）|
|{zone}.act_vol_mode|text|?|dB 模式下的实际音量|
|{zone}.act_vol_val|值|？|实际音量（以 dB 为单位）|
|{zone}.act_vol_unit|text|-|实际音量单位（应为 dB）|
|{zone}.act_vol_mode_list|文本|-|dB 模式下的实际音量|
|{zone}.input|text|x|根据设备输入|
|{zone}.input_list|文本|-|可能的输入|
|{zone}.input_text|文本|-|选定的输入为文本|
|{zone}.sound_program|文本|x|设置声音程序|
|{zone}.sound_program_list|文本|-|可能的声音程序|
|{zone}.surr_decoder_type|文本|?|设置环绕类型|
|{zone}.surr_decoder_type_list|文本|-|可能的环绕解码器|
|{zone}.link_control|文本|x|设置链接控制|
|{zone}.link_control_list|text|-|可能的链接控制设置|
|{zone}.link_audio_delay|文本|x|设置链接音频延迟|
|{zone}.link_audio_delay_list|text|-|可能的链接音频延迟设置|
|{zone}.clearVoice|boolean|x|清除语音控制|
|{区域}.低|值|x|级别 EQ 低|
|{区域}.mid|值|x|级别 EQ 中间|
|{区域}.高|值|x|级别 EQ 高|
|{区域}.subwoofer_volume|值|x|级别低音炮音量|
|{区域}.低音|值|x|低音级别|
|{区域}.treble|值|x|高音级别|
|{zone}.tone_control_mode_list|text|-|可能的音调控制模式|
|{zone}.tone_mode|布尔值|？|音调控制模式|
|{区域}.balance|值|x|级别平衡|
|{zone}.direct|boolean|x|设置直接|
|{zone}.pure_direct|boolean|x|设置纯直接|
|{zone}.enhancer|布尔值|x|设置增强器|
|{zone}.bass_extension|boolean|x|设置低音扩展|
|{zone}.sleep|值|x|睡眠定时器|
|{区域}.disable_flags|布尔值|x|设置disable_flags|
|{区域}.contents_display|布尔值|x|设置contents_display|
|{区域}.party_enable|布尔值|x|设置party_enable|
|{区域}.extra_bass|布尔值|x|设置extra_bass|
|{区域}.adaptive_drc|布尔值|x|设置adaptive_drc|
|{区域}.dts_dialogue_control|值|x|设置 dts_dialogue_control|
|{区域}.adaptive_dsp_level|布尔值|x|设置adaptive_dsp_level|

### 网络 USB
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|netusb.input|值|x|设置/实际输入|
|netusb.playPause|boolean|x|设置播放/暂停|
|netusb.playback|文本|-|状态网络播放器|
|netusb.stop|boolean|x|设置停止|
|netusb.auto_stop|boolean|-|自动停止|
|netusb.next|boolean|x|设置前进|
|netusb.prev|boolean|x|设置倒带|
|netusb.shuffle|布尔值|x|切换随机播放|
|netusb.shuffle_stat|文本|-|随机播放状态|
|netusb.repeat|boolean|x|切换重复|
|netusb.repeat_stat|文本|-|重复状态|
|netusb.artist|文本|-|艺术家姓名|
|netusb.album|文本|-|专辑名称|
|netusb.track|文本|-|轨道名称|
|netusb.albumart_url|文本|-|专辑封面的 http 地址|
|netusb.albumart_id|值|-|专辑封面ID|
|netusb.play_time|值|-|播放时间（秒）|
|netusb.play_queue_type|文本|-|netusb 队列类型|
|netusb.total_time|值|-|秒内播放的总时间|
|netusb.recent_info|json|-|播放过的项目的历史记录|
|netusb.preset_info|json|-|已保存的预设/收藏夹|
|netusb.presetrecallnumber|值|x|重新调用收藏列表中的#|
|netusb.usb_devicetype|text|-|连接的 USB 设备的类型|
|netusb.attribute|值|-|哪些可能有服务需要解码|
|netusb.recallRecentItem|值|x|哪些可能有服务需要解码|

＃＃＃ 系统
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|system.api_version|值|-|API 版本|
|system.system_version|值|-|系统版本|
|system.inputs.{service}|value|-|可用的输入服务|
|system.inputs.{service}.account_enable|值|-|可用输入服务已启用|
|system.inputs.{service}.distribution_enable|值|-|可用输入服务可分发|
|system.inputs.{service}.play_info_type|value|-|可用的输入服务类型|

＃＃＃ 激光唱机
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|设置播放/暂停|
|cd.playback|文本|-|状态 CD 播放器|
|cd.stop|boolean|x|设置停止|
|cd.next|boolean|x|设置前进|
|cd.prev|boolean|x|设置倒带|
|cd.shuffle|布尔值|x|切换随机播放|
|cd.shuffle_stat|文本|-|随机播放状态|
|cd.repeat|boolean|x|切换重复|
|cd.repeat_stat|文本|-|重复状态|
|cd.device_stat|文本|-|设备状态|
|cd.playtime|值|-|当前播放时间|
|cd.totaltime|值|-|当前曲目总时间|
|cd.disctime|值|-|CD总时间|
|cd.tracknumber|值|-|播放中的当前曲目|
|cd.totaltracks|值|-|CD 曲目总数|
|cd.artist|文本|-|艺术家姓名|
|cd.album|文本|-|专辑名称|
|cd.track|文本|-|曲目名称|

### 调谐器
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|tuner.common_preset_info|array|-|预设信息|
|tuner.am.preset_info|array|-|预设 AM 信息|
|tuner.fm.preset_info|array|-|预设 FM 信息|
|tuner.dab.preset_info|array|-|预设 DAB 信息|
|tuner.am.preset|number|x|AM 预设编号|
|tuner.am.freq|number|x|以 kHz 为单位的 AM 频率|
|tuner.am.tuned|布尔值|-|AM 调谐|
|tuner.fm.preset|number|x|FM 预设号码|
|tuner.fm.freq|number|x|以 kHz 为单位的 FM 频率|
|tuner.fm.tuned|布尔值|-|FM 调谐|
|tuner.fm.audio_mode|字符串|-|FM 单声道/立体声|
|tuner.dab.preset|number|x|DAB 预设编号|
|tuner.dab.id|号码|-|DAB 站ID|
|tuner.dab.status|字符串|-|DAB 状态|
|tuner.dab.freq|数字|-|DAB 频率|
|tuner.dab.category|字符串|-|主要/次要|
|tuner.dab.audio_mode|字符串|-|DAB 单声道/立体声|
|tuner.dab.bit_rate|number|-|DAB 比特率（以 kpbs 为单位）|
|tuner.dab.quality|number|-|DAB 质量 0-100|
|tuner.dab.tune_aid|数字|-|DAB 信号强度 0-100|
|tuner.dab.off_air|布尔值|-|DAB 空中停播|
|tuner.dab.dab_plus|布尔值|-|DAB+|
|tuner.dab.program_type|字符串|-|DAB 节目类型|
|tuner.dab.ch_label|字符串|-|DAB CH 标签|
|tuner.dab.service_label|字符串|-|DAB 服务标签|
|tuner.dab.dls|字符串|-|DAB DLS|
|tuner.dab.ensemble_label|字符串|-|DAB 集合标签|
|tuner.dab.initial_scan_progress|number|-|DAB 初始扫描进度 0-100|
|tuner.dab.total_station_num|数量|-|DAB 总电台数 0-255|
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
|clock.fade_interval|number|x|时钟闹钟淡入淡出间隔|
|clock.fade_type|number|x|时钟闹钟淡入淡出类型|
|clock.mode|string|x|时钟闹钟模式 一天/每周|
|clock.repeat|boolean|x|如果指定了一天则重复时钟闹钟|
|clock.{day}.enable|boolean|x|时钟设置有效性|
|clock.{day}.time|string|-|时钟闹钟启动时间 hhmm 00-23,00-59|
|clock.{day}.beep|boolean|x|时钟蜂鸣有效性|
|clock.{day}.playback_type|string|-|时钟闹钟播放类型恢复/预设|
|clock.{day}.resume_input|string|-|时钟闹钟恢复输入ID|
|clock.{day}.preset_type|string|-|时钟闹钟预设类型|
|clock.{day}.preset_num|number|-|时钟闹钟预设输入ID|
|clock.{day}.preset_netusb_input|string|-|时钟闹钟 netusb 输入 ID|
|clock.{day}.preset_netusb_text|string|-|时钟闹钟 netusb 文本|
|clock.{day}.preset_tuner_band|string|-|时钟闹钟调谐器频段|
|clock.{day}.preset_tuner_number|number|-|时钟闹钟调谐器频率或电台ID|

待办事项
* 支持列表
* 将交互值更改为好听的命名
* NETUSB/CD 快进/快退
* 蓝牙
* 对话级别

## 1.0.0 重大变化
* 之前 deviceId 是 systemId，不唯一。现在使用 deviceId，这会改变对象树
* 音乐广播 API 2.0.0
* 设备搜索现在可以返回多于 1 个设备
* 管理面板中为开发人员提供新的输出
* 更多异步/等待
* 修正测试

0.2.2
* 音乐广播 API 0.0.14

0.2.1
* 许可证 2022
* 依赖性修正

0.2.0
* 使用“创建适配器”进行重构
* 异步/等待

0.1.5
* (Scrounger) 当设备无法连接时进行错误处理

0.1.4
*（Scrounger）修正类型不匹配（数组对象）

0.1.3
* (foxthefox) 添加了 linkControl/linkAudioDelay/linkAudioQuality 的写入

0.1.2
*（Scrounger）更正类型不匹配（字符串布尔值）

0.1.1
* 修正时钟“oneday”

0.1.0
* 紧凑模式
* yamaha-yxc-nodejs 0.0.8
* 小部件更新

0.0.9
* adminV3 使用 values2table 并再次添加按钮
* zone2/3/4 现已正常工作
* 扩展自动测试
* 管理界面中用于收集 JSON 响应的按钮

0.0.8
* 自动测试更新
* 在管理页面中给出对象（设备）中显示的名称

0.0.7
* 调谐器支持
* 时钟支持（主要为信息）
* 支持更多区域
* 支持 mc-link
* 根据特征设置最小值和最大值
* 管理员 v3

0.0.6 修复
* 与对象和控件匹配的小部件集
* cd.shuffle_stat 布尔值 -> 文本
* 新的 netusb.shuffle_stat (文本)
* 通过订阅 UDP 消息更新状态
* 切换播放时间信息更新（禁用可减少流量）

0.0.5
* 管理页面清理
* 对象创建的改进
* 更多 netusb 上的对象
* 系统中有更多对象
* 增加了对 CD 的支持

0.0.4
* 新对象和功能（输入、sound_prog、EQ、clearVoice）
* 在管理页面中搜索/发现

0.0.3
* 实现了更多对象

0.0.2
* 细微修正

0.0.1
* 初始版本在配置页面中设置 IP，
* 可用命令电源、静音、音量

## Changelog

### 1.1.4
* fixed main.surround_ai
* update devDeps, eslint corrections
* IOB checker corrections

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

Copyright (c) 2017 - 2024 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2024 foxthefox <foxthefox@wysiwis.net>