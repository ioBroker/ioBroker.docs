---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nspanel-lovelace-ui/README.md
title: ioBroker.nspanel-lovelace-ui
hash: uNqdmZ3zPDhZew/erMIJrCG4G4lO3NIkV3l54TFPuEs=
---
![标识](../../../en/adapterref/iobroker.nspanel-lovelace-ui/admin/nspanel-lovelace-ui.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.nspanel-lovelace-ui.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nspanel-lovelace-ui.svg)
![安装数量](https://iobroker.live/badges/nspanel-lovelace-ui-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/nspanel-lovelace-ui-stable.svg)
![NPM](https://nodei.co/npm/iobroker.nspanel-lovelace-ui.png?downloads=true)

# IoBroker.nspanel-lovelace-ui
**测试：** ![测试与发布](https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/actions/workflows/test-and-release.yml/badge.svg?branch=main)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nspanel-lovelace-ui/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/nspanel-lovelace-ui/)

## 适用于 ioBroker 的 nspanel-lovelace-ui 适配器
NsPanel Lovelace UI 是 NSPanel 内部 Nextion 屏幕的固件，采用 Lovelace UI 设计。

### 简短描述
NSPanel Lovelace UI 是 Sonoff NSPanel 的另一种用户界面，专为与 iobroker 集成而设计。它通常依赖于 Tasmota（固件）和 MQTT（消息协议），直接在 NSPanel 的小型触摸屏上提供自定义控件和显示。

### 什么是 NSPanel？
Sonoff NSPanel 是一款智能墙壁开关，具有以下功能：

- 两个物理继电器开关
- 一个3.5英寸触摸屏
- 温度和亮度传感器

它最初是为 eWeLink 应用开发的，但使用替代固件可以与 ioBroker 实现更强大的集成。

### “NSPanel Lovelace UI”是做什么用的？
借助此自定义用户界面，您可以：

- 在 NSPanel 上显示类似 Lovelace 的卡片
- 显示传感器数值（例如，温度、湿度）
- 控制场景和自动化
- 直接在屏幕上控制灯光、恒温器和其他设备

---

### 安装及问题
适配器 Wiki：https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/wiki 适配器社区（ioBroker 论坛）：[论坛](https://forum.iobroker.net/topic/80055/alphatest-nspanel-lovelace-ui-v0-1-1)

---

## 以下 HMI 组件已集成到 NSPanel 适配器中：
### 人机界面卡
- [x] 屏幕保护程序
- [x] 屏幕保护程序2
- [x] 屏幕保护程序3
- [x] 卡片图表
- [x] cardLChart
- [ ] cardLChart2（新增 - 开发中）
- [x] 卡片实体
- [x] 卡片日程
- [x] 卡片网格
- [x] cardGrid2
- [x] cardGrid3
- [x] 卡片热敏
- [ ] 卡片媒体
- [x] 卡解锁
- [x] 卡片二维码
- [ ] 卡片警报
- [x] 卡牌功率

### 人机界面弹出窗口
- [x] popupInSel
- [x] popupFan
- [x] 弹出式热成像
- [x] 弹出通知
- [x] 弹出式快门
- [x] 弹出快门2
- [x] 弹出灯
- [x] popupLight2
- [x] 弹出计时器
- [x] 弹出滑块
- [ ] popupColor（新增 - 开发中）

---

## 蜂鸣器控制
该适配器支持使用 Tasmota `Buzzer` 命令控制 NSPanel 设备的蜂鸣器。这可以实现按钮声音、紧急消息通知和常规蜂鸣器控制。

### 先决条件
要使用蜂鸣器功能，请确保您的 NSPanel Tasmota 固件已启用 `SetOption111 1`。这将使用 BuzzerPwm 来输出压电蜂鸣器的频率，而不是开关信号。

### 使用方法
#### 1. 基于状态的控制
每个面板都有一个蜂鸣器控制状态：`panels.{panelName}.cmd.buzzer`

```javascript
// Set buzzer command (tone, duration, count, frequency)
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,2,3,0xF54');

// Examples:
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1'); // Single beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,5'); // Longer beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '2,3,5'); // 5 beeps
```

#### 2. SendTo 接口
```javascript
// Basic buzzer command
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'panelTopic',
    command: '1,2,3,0xF54',
});

// Button feedback sound
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'kitchen_panel',
    command: '1',
});

// Urgent notification
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'living_room',
    command: '3,5,10,0x800', // High-pitched, multiple beeps
});
```

### 蜂鸣器命令格式
蜂鸣器命令遵循 Tasmota 的格式：`tone,duration,count,frequency`

- **音调**：1-4（音调类型）
- **持续时间**：1-10（持续时间单位，每个单位约100毫秒）
- **计数**：1-255（哔声次数）
- **频率**：0x100-0xFFFF（压电频率，十六进制）

**示例：**

- `1` - 单声短促的哔声
- `1,5` - 单声较长的提示音
- `2,3,5` - 5 声中等强度的蜂鸣声，音调为 2
- `1,2,3,0xF54` - 3 声短促的蜂鸣声，频率可自定义

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.1 (2025-11-15)
- (ticaki) first Version at latest
- (ticaki) New attempt to get MQTT TLS keys into the backup

### 0.8.0 (2025-11-13)
- (Armilar) IMPORTANT: update to TFT Version 5.1.0
- (ticaki) pagePopup added
- (ticaki) color for brightsky favorit/bottom day fixed
- (ticaki) unlock pin fail fixed

## License

MIT License

Copyright (c) 2024-2025 ticaki <github@renopoint.de>  
Copyright (c) 2024-2025 tt-tom17 <tgb@kabelmail.de>

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