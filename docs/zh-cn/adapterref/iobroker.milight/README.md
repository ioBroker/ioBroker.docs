---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: qErBHu72dxLHQ4Qw9RqTJzzOvk+r3FR4JZKRKiDV7+k=
---
![标识](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![安装数量](http://iobroker.live/badges/milight-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.milight.svg)
![下载](https://img.shields.io/npm/dm/iobroker.milight.svg)
![构建状态](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![新平台](https://nodei.co/npm/iobroker.milight.png?downloads=true)

# IoBroker.milight
ioBroker 适配器，适用于 milight、easybulb、limitless 等 LED 灯

## 常用设置：
在管理页面中

* IP 地址 -> 桥的 IP
* 端口 -> 桥的端口
* delaybetweenPackages -> UDP 包之间的毫秒延迟（v5 为 100 毫秒）
* repeatPackage -> 重复次数 (v5 为 1)
* milight 协议版本 v5 或 v6 -> 自动设置相应端口
* 切换到白色模式时设置全亮度

## 区域中的灯泡类型：
在管理页面中

* basic = 仅适用于区域 1 和 v6 的桥接
* RGBWW = 带白色 LED 和色温调节的全彩灯泡（增加色温意味着颜色更冷），仅在 v6 中
* RGB = 纯色灯泡（不含白光）仅适用于 1 区
* RGBW = 带白色 LED 的彩色灯泡
* 白色 = WW/CW 白色灯泡，带色温调节功能（色温越高，颜色越冷）

Zone0 或 ZoneAll 可用于向所有 4 个区域发出命令，适配器在 v6 中使用 base/bridge 命令进行配置，在 v5 中使用 rgbw 命令进行配置。

## 版本 6 中的状态
| 可用状态 | 基本/桥接 | 白色 | RGB | RGBW | RGBWW |
|:-------------------------------------------:|:--------------------------------:|:------------------------------:|:------------------------------:|:-------------------------------------:|:--------------------------------------:|
| 开/关作为开关 | 状态（区域 1），功能 | 状态（区域），功能 | 状态（区域 1），功能 | 状态（区域），功能 | 状态（区域），功能 | 状态（区域），功能 |
| 以按钮开启 | 在（区域 1），本机 | 在（区域），本机 | 在（区域 1），本机 | 在（区域），本机 | 在（区域），本机 | 在（区域），本机 |
| 关闭按钮 | 关闭（区域 1），本机 | 关闭（区域），本机 | 关闭（区域 1），本机 | 关闭（区域），本机 | 关闭（区域），本机 |
| colorMode 作为布尔状态 | | | | colorMode (0=nightMode, 1=whiteMode) | colorMode (0=nightMode, 1=whiteMode) |
| maxWhite 作为按钮 | | maxBright(区域), 原生 | | | |
| whiteMode 作为按钮 | whiteMode（zone1），本机 | | | whiteMode（区域），本机 | whiteMode（区域），本机 |
| nightMode 作为按钮 | | nightMode(zone), native | | nightMode(zone), native | nightMode(zone), native |
| 亮度作为值（0-100％）| 亮度（区域），原生 | | | 亮度（区域），原生 | 亮度（区域），原生 |
| 颜色为 3 个十六进制值 | 颜色（区域），原生 | | 颜色（区域），原生 | 颜色（区域），原生 | 颜色（区域），原生 |
| rgb 作为组合值 (#000000 - #FFFFFF) | rgb (区域)，本机 | | rgb (区域)，本机 | rgb (区域)，本机 | rgb (区域)，本机 |
| 模式作为值 | 模式（区域），本机 | | | 模式（区域），本机 | 模式（区域），本机 |
| modeSpeedUp 作为按钮 | | modeSpeedUp（区域），本机 | | modeSpeedUp（区域），本机 | modeSpeedUp（区域），本机 |
| modeSpeedDown 作为按钮 | | modeSpeedDown (区域), 本机 | | modeSpeedDown(区域), 本机 | modeSpeedDown(区域), 本机 |
| 链接为按钮 | | | | 链接（区域），本机 | 链接（区域），本机 |
| 取消链接为按钮 | | | | 取消链接（区域），本机 | 取消链接（区域），本机 |
| 饱和度值（0-100%）| | | | | 饱和度（区域），原生|
| colorTemp 作为值（0-100 等于 2700K 到 6500K）| | | | | colorTemp（区域），原生|
| brightnessUp 作为按钮 | brightnessUp (区域), 功能 | brightnessUp (区域), 本机 | brightnessUp (区域), 本机 | brightnessUp (区域), 功能 | brightnessUp (区域), 功能 |
| brightDown 作为按钮 | brightDown (区域)，功能 | brightDown (区域)，本机 | brightDown (区域)，本机 | brightDown (区域)，功能 | brightDown (区域)，功能 |
| colorUp 作为按钮 | colorUp(区域), 函数 | | | colorUp(区域), 函数 | colorUp(区域), 函数 |
| 颜色向下作为按钮 | 颜色向下（区域），功能 | | 颜色向下（区域），功能 | 颜色向下（区域），功能 | |
| saturationUp 作为按钮 | | | | | saturationUp (区域), 功能 |
| saturationDown 作为按钮 | | | | | saturationDown (区域), 功能 |
| colorTempUp 作为按钮 | | colorTempUp (区域), 本机 | | | colorTempUp (区域), 功能 |
| colorTempDown 作为按钮 | | colorTempDown (区域), 本机 | | | colorTempDown (区域), 功能 |
| 色调作为值（0-360） | | | | 色调（区域），功能 | 色调（区域），功能 |

## 版本 5/版本 4 中的状态
| 可用状态 | RGB | 白色 | RGBW |
|:---------------------------------------------:|:-----------------------:|:-----------------------:|:----------------------------------------:|
| 开/关作为开关 | 状态（区域），功能 | 状态（区域），功能 | 状态（区域），功能 |
| ON 作为按钮 | on（区域），本机 | on（区域），本机 | on（区域），本机 |
| 关闭按钮 | 关闭（区域），本机 | 关闭（区域），本机 | 关闭（区域），本机 |
| colorMode 作为布尔状态 | | | colorMode (0/hs=whiteMode, 1/ct=color(hue=55))|
| maxWhite 作为按钮 | | maxBright(区域), 原生 | |
| whiteMode 作为按钮 | | | whiteMode(区域), 原生 |
| nightMode 作为按钮 | | | nightMode(zone), native |
| 颜色作为色调值（0-255） | | | 色调，原生 |
| rgb 作为组合值 (#000000 - #FFFFFF) | | | rgb，原生 |
| colorTempUp 作为按钮 | | 更温暖，原生 | |
| colorTempDown 作为按钮 | | 更凉爽，原生 | |
| 亮度值（0-100%）| | | 亮度，原生|
| 亮度作为值（0-100%），扩展范围 | | | |
| effectModeNext 作为按钮 | | | effectModeNext，本机 |
| speedUp 作为按钮 | speedUp，原生 | | effectSpeedUp，原生 |
| speedDown 作为按钮 | speedDown，本机 | | effectSpeedDown，本机 |
| brightUp 作为按钮 | brightUp，本机 | brightUp，本机 | |
| brightDown 作为按钮 | brightDown，本机 | brightDown，本机 | |
| effectModeNext 作为按钮 | effectSpeedUp，本机 | | |
| effectModePrev 作为按钮 | effectSpeedDown，本机 | | |

effectSpeedUp/Down 具有不同的含义（对于 rgb 来说改变模式，对于 rgbw 来说改变速度）！

＃＃ 配置：
在适配器版本 5 的管理页面中也可用于 v4 灯

待办事项：
* ??

## 已知问题：
* ??

## Changelog
### 0.4.0
* compact mode
### 0.3.6
* (foxthefox) node-milight-promise 0.3.1 (former version 0.2.32)

### 0.3.5
* (mrinc)     fix for the v5 color setting (was always blue)
* (foxthefox) nightModeSwitch added on white bulbs for command from Alexa

### 0.3.4
* (foxthefox) adminv3 added

### 0.3.3
* (foxthefox) setting of state after usage of command OFF/ON
* (foxthefox) v6 widget for RGBW; RGBWW mode switch night/weiß instead weiß/farbe
* (foxthefox) v6 widget for RGBW, RGBWW speedup/down correction, no hide of color temp vs. color when switching night/weiß
* (foxthefox) v5 widget for RGBW with color changing to matching the selected color
* (foxthefox) v6 widget for RGBWW with colortemperature changing to matching the selected colortemperature

### 0.3.2
* (foxthefox) V5 uses brightUp/brightDown instead brightnessUp/brightnessDown
* (foxthefox) corrections in V5 for white Commands (cooler/warmer/maxBright)
* (foxthefox) new RGBWW V6 widget
* (foxthefox) update for effects and correctios in RGBW V6 widget
* (foxthefox) added CW/WW widget V4 and V6
* (foxthefox) added disco button in RGBW V4

### 0.3.1
* (bluefox) added checking of methods before calling them

### 0.3.0
* (foxthefox) cleanup of states
* (foxthefox) added white/rgb lamp
* (foxthefox) correction of mismatch RGBW/RGBWW in v6
* (foxthefox) v6 brightness only 0-0x64(100)

### 0.2.2/0.2.1
* (foxthefox) debug messages with v5/v6 prefix; v6 colorset->colormode

### 0.2.0 
* (bluefox) discovery for v6

### 0.1.1
* (foxthefox) switch lamp on with full brightness -> checkbox in admin for v5

### 0.1.0
* (foxthefox) tested with bridge version 4 and protocol version v5
* (bluefox)v6 implementation
* (foxthefox) node-milight-promise 0.0.9
* (foxthefox) jqui widget RGBW lamp

### 0.0.1
* (foxthefox) initial setup

## License

The MIT License (MIT)

Copyright (c) 2018 - 2020 foxthefox <foxthefox@wysiwis.net>