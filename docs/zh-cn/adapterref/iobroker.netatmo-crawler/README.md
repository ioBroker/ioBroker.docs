---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.netatmo-crawler/README.md
title: ioBroker.netatmo-爬虫
hash: YJtbbntubeP/5CC/A1idWy9ui6wMTFdEprQHr2Oanrs=
---
![标识](../../../en/adapterref/iobroker.netatmo-crawler/img/netatmo-logo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.netatmo-crawler.svg)
![下载](https://img.shields.io/npm/dm/iobroker.netatmo-crawler.svg)
![安装数量（最新）](http://iobroker.live/badges/netatmo-crawler-installed.svg)
![稳定版本](http://iobroker.live/badges/netatmo-crawler-stable.svg)
![依赖状态](https://img.shields.io/david/Bart1909/iobroker.netatmo-crawler.svg)
![已知漏洞](https://snyk.io/test/github/Bart1909/ioBroker.netatmo-crawler/badge.svg)
![构建状态](https://travis-ci.org/Bart1909/ioBroker.netatmo-crawler.svg?branch=master)
![新公共管理](https://nodei.co/npm/iobroker.netatmo-crawler.png?downloads=true)

# IoBroker.netatmo-crawler
ioBroker 的 netatmo-crawler 适配器

=================

从公共网络大气站抓取信息

目录

=================

* [说明](#说明)
* [一般信息](#general-information)
* [湿度](#humidity)
* [雨](#雨)
* [压力](#压力)
* [温度](#温度)
* [风](#wind)
* [致谢](#credits)
* [变更日志](#changelog)
* [许可证](#license)

操作说明

===========

要查找您首选气象站的网址，请按照以下步骤操作：

1. 打开 [Netatmo 天气图](https://weathermap.netatmo.com)
2. 找到您的电台并点击分享图标

   ![分享图片](../../../en/adapterref/iobroker.netatmo-crawler/img/share.jpg)

3. 点击“复制链接”

   ![复制链接](../../../en/adapterref/iobroker.netatmo-crawler/img/copyLink.jpg)

4. 在适配器的实例设置中插入链接

   ![插入](../../../en/adapterref/iobroker.netatmo-crawler/img/insert.png)

一般信息

===================

“Netatmo Crawler” 会解析您附近的大量真实本地信息。您会如何处理这些信息呢？以下是一些常见信息和示例：

湿度 -------- Netatmo 使用相对湿度，即当前绝对湿度与最高可能绝对湿度（取决于当前气温）的比值。100% 的相对湿度读数意味着空气已完全饱和，无法再容纳水蒸气，从而可能下雨。这并不意味着必须达到 100% 的相对湿度才会下雨——在云层形成的地方，相对湿度必须达到 100%，但靠近地面的相对湿度可能要低得多。

雨量 ---- 使用单位毫米。如果您希望使用单位升/立方米，也可以使用这个单位。例如，您可以用它来表示花园浇水。

压力 -------- 你周围的空气有重量，它会挤压它接触到的一切。这种压力被称为大气压力，或气压。
你应该用这个值做什么？听起来很简单：天气预报！高压=好天气，低压=坏天气。
正常的中间值是 1013 毫巴。
对于“真正的”天气预报，你应该需要几个小时的气压历史数据（我使用 4 小时）。
如果气压下降，未来应该是坏天气；如果气压上升，未来应该是好天气。
我发现了一个[此处为预测脚本](http://www.beteljuice.co.uk/zambretti/forecast.html)（它被称为 zambretti 方法，预测准确率高达 90%）。
其他单位：1 毫巴 = 100 帕 = 1 百帕

温度 ----------- 您可以在此处计算寒冷温度水平。对于低温，可以使用风寒指数（10°C 或更低，结合风力计算）；对于高温，可以使用热指数（25°C 或更高，结合湿度计算）。
示例脚本：

```
windchill1 = windchill(temp, windkmh); //Vars to-from IOBroker

function windchill(temperature, windspeed) {
	var windchill = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windspeed, 0.16) + 0.3965 *
			temperature * Math.pow(windspeed, 0.16);
	return windchill;
}

heatindex1 = heatindex(temp, hum); //Vars to-from IOBroker

function heat(temperature, humidity) {
	var heatindex = -8.784695 + 1.61139411 * temperature + 2.338549 * humidity - 0.14611605 *
			temperature * humidity - 0.012308094 * (temperature * temperature) -
			0.016424828 * (humidity * humidity) + 0.002211732* (temperature *
			temperature) * humidity + 0.00072546 * temperature * (humidity * humidity)
			- 0.000003582 * (temperature * temperature) * (humidity * humidity);
	return heatindex;
}
```

风 ---- 风速是空气从高压向低压移动的测量值，通常是由于温度变化引起的。
阵风强度是短时间内（例如三秒）测得的风的最大值。
您应该为您的遮阳篷或 Zambretti 方法（见上文）编写一个脚本。

## 致谢
如果没有@bart1909 (https://github.com/jbart1909) 的出色工作，这个适配器是不可能实现的，他创建了此适配器的 V1.x.x 之前的版本。

非常感谢[回鱼](https://github.com/backfisch88)的最初想法和支持！

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2025-06-13)
* (Bart1909) A problem handling urls and authentication has been fixed.
* (mcm1957) Adapter has been migrated into iobroker-community-adapters organisation.
* (Bart1909) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) Dependencies have been updated.

### 0.8.0
* (Bart19) Adds additional 'rain_lastHour' state as 'rain' state is now real time value

### 0.7.1
* (Bart19) removed old news (#17)

### 0.7.0
* (Bart19) saves states as read-only (#23)

### 0.6.3
* (Bart19) updates dependencies

## License

MIT License

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Bart19 <webmaster@bart19.de>

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