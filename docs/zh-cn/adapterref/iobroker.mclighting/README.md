---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mclighting/README.md
title: ioBroker McLighting 适配器
hash: B+Xv4mslDQtd1AW3kZPCMev2cZZaLYvfVR7+ifEgCi8=
---
![标识](../../../en/adapterref/iobroker.mclighting/admin/mclighting.png)

![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker McLighting 适配器
=================

## Описание
Драйвер позволяет управлять RGB лентой на светодиодах WS2811/WS2812 подключенной к ESP8266 с прошив

ЕсливыхотитеиспользоватьRGBW-светодиоды（например，SK6812），подключенныекESP8266，вамнужнавотэтадоработаннаяпрошивка：[麦克闪电RGBW](https://github.com/FabLab-Luenen/McLighting)ивнастройкахдрайверавыбратьRGBW。

＃＃ 描述
该驱动程序允许您使用固件[麦克莱特](https://github.com/toblum/McLighting)控制连接到 ESP8266 的 LED WS2811/WS2812 上的 RGB 灯条

如果您想使用连接到 ESP8266 的 RGBW Leds（如 SK6812），您应该只使用这个分支：[麦克闪电RGBW](https://github.com/FabLab-Luenen/McLighting) 并在适配器配置中选择 *RGBW*。

＃＃ 使用
###亮度
设置亮度。

其中 <brightness> 是亮度，值为 0-255。

### 速度 设置速度。
 其中 <speed> 是从 0 到 255 的速度。

### Mode 设置模式。
 其中 <lightmode> 是以下之一：

- 关闭（关闭所有 LED。）
- 全部（以给定或先前设置的颜色打开所有 LED。）
- 擦除（以给定或先前设置的颜色打开所有 LED，具有擦除效果。）
- 彩虹（启动彩虹效果。）
- RainbowCycle（启动彩虹循环效果。）
- 剧院（以给定或先前设置的颜色启动剧院效果。）
- theatrechaseRainbow（通过改变颜色开始剧院追逐效果。）
- tv（启动电视模拟器。）

### Array_RGB(W)
 以给定的颜色点亮多个 LED。

```
+[numled][hexrgb(w)]+[numled][hexrgb(w)]+[numled][hexrgb(w)] [...] or
[numled][hexrgb(w)],[numled][hexrgb(w)],[numled][hexrgb(w)],[...]
```

 其中 <numled> 是 LED 的编号（以 00 开头），例如01.

 其中 <hexrgb> 是十六进制的颜色，例如04d2ff。

 示例：+09ffffff+19ff0000 或 09ffffff,19ff0000

### Color 设置灯的默认颜色。
 其中 <r,g,b(,w)> 是作为数字 (0 - 255) 的颜色，例如32,3,200(, 255)

 如果活动模式 0（静态） - 设置灯的默认颜色并以该颜色点亮所有 LED。

### Color_R, color_G, color_B(, color_W) 设置灯的默认颜色。
 其中 <r(g)(b)(w)> 是颜色作为数字 (0 - 255)，例如154

 如果活动模式 0（静态） - 设置灯的默认颜色并以该颜色点亮所有 LED。

### Color_RGB(W) 设置灯的默认颜色。
 其中 <hexrgb(w)> 是十六进制的颜色，例如04d2ff

 如果活动模式 0（静态） - 设置灯的默认颜色并以该颜色点亮所有 LED。

### list_modes 可用动画模式列表作为数组。
结果：
```

 {
   "mode": 0,
   "name": "Static"
 },
 {
   "mode": 1,
   "name": "Blink"
 },
 {
   "mode": 2,
   "name": "Breath"
 },
 ...

```

### Range_RGB(W)
 以给定的颜色点亮多个 LED 范围。

```
R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)] [...] or
[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[...]
```

 其中 <rangestart_led> 是范围的起始编号（以 00 开头的数字），例如00.

 其中 <rangeend_led> 是范围的结束编号（以 00 开头的数字），例如09.

 其中 <hexrgb(w)> 是十六进制的颜色，例如04d2ff。

 可以重复多次。

 示例：R0009ffffffR1019ff0000 OR 0009ffffff,1019ff0000 将前 10 个 LED 点亮为白色，接下来的 10 个为红色

### Set_all_RGB(W) 设置灯的默认颜色并以该颜色点亮所有 LED。
 其中 <hexrgb(w)> 是十六进制的颜色，例如04d2ff

### Single_RGB(W) 以给定颜色点亮单个 LED。
 其中 <numled> 是 LED 的编号（以 00 开头），例如01.

 其中 <hexrgb(w)> 是十六进制的颜色，例如04d2ff。

### Fx_mode 设置动画模式。
 <animation_mode_id> 在 list_modes 中的位置

### Fx_mode_name 当前名称 fx_mode

## Changelog

### 0.1.2
* (instalator) change role

### 0.1.1
* (Bluefox) Fix clear timeouts

### 0.1.0
* (instalator) refactoring
* (instalator) added compact mode

### 0.0.12 (2018-12-09)
* (instalator) fix error

### 0.0.11 (2018-10-14)
* (Johannes Jaeger) Add support for RGBW Leds ([McLightingRGBW](https://github.com/FabLab-Luenen/McLighting))
* (Johannes Jaeger) Fix typo for state *rang_RGB* to *range_RGB* !

### 0.0.10 (2018-04-02)
* (instalator) fix error, added ping pong function for reconnect

### 0.0.4 (2018-03-27)
* (instalator) fix error

### 0.0.3 (2018-03-24)
* (instalator) fix error, change README

### 0.0.2 (2018-03-24)
* (instalator) Release version

### 0.0.1 (2018-03-24)
* (instalator) initial

## License

The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.