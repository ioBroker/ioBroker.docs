---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weathersense/README.md
title: ioBroker.weathersense
hash: KidM5Ba4LU29tLpPps9GkMP8pYa1nrPOuLUfmYmcTjY=
---
![标识](../../../en/adapterref/iobroker.weathersense/admin/weathersense.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.weathersense.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weathersense.svg)
![安装数量](https://iobroker.live/badges/weathersense-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/weathersense-stable.svg)
![NPM](https://nodei.co/npm/iobroker.weathersense.png?downloads=true)

# IoBroker.weathersense
**测试：** ![测试与发布](https://github.com/ltspicer/ioBroker.weathersense/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 WeatherSense 适配器
WeatherSense 是一个气象站云平台。此适配器从 WeatherSense 服务器读取数据。

请参阅：https://play.google.com/store/apps/details?id=com.emax.weahter&hl=de_CH

部分 WiFi 气象站使用 WeatherSense 云服务。

例如，Ideoon（Pearl）的这款WiFi气象站：

![截屏](https://github.com/ltspicer/WeatherSense/blob/main/wetterstation.png)

![截屏](https://github.com/ltspicer/WeatherSense/blob/main/casativo_ideoon_weatherstation.png)

＃＃ 使用：
只需输入您的 WeatherSense 账户登录信息（邮箱和密码）。

气象站数据存储在 WeatherSense 数据点中。

数据也可以通过 MQTT 发送。

## 处理多个气象站（多实例支持）
原版 WeatherSense 云服务器存在软件限制/漏洞：如果您在同一个智能手机帐户中注册两个或多个相同的气象站，它们会互相覆盖并从您的设备列表中消失。

为了能够同时从多个站点成功读取数据而不会发生任何冲突，您可以利用 ioBroker 的原生多实例架构。

### 分步设置：
1. **创建单独的云帐户：** 在 WeatherSense 移动应用程序中为您的**每个**气象站注册一个唯一的免费帐户（例如，*电子邮件 A* 用于气象站 1，*电子邮件 B* 用于气象站 2）。
2. **每个账户绑定一个工作站：** 将您的第一个工作站严格与账户 A 配对，将您的第二个工作站严格与账户 B 配对。
3. **在 ioBroker 中添加多个实例：**
* 转到 ioBroker 中的“实例”选项卡，并添加 WeatherSense 适配器的第二个实例（这将创建“weathersense.0”和“weathersense.1”）。
4. 配置实例：
* 打开 **`weathersense.0`** 的配置，并输入 **帐户 A** 的凭据。将 `传感器 ID` 设置为 `1`。
* 打开 **`weathersense.1`** 的配置，并输入 **帐户 B** 的凭据。将 `传感器 ID` 设置为 `2`。

### 此设置的优点：
* **无数据冲突：** ioBroker 将启动两个完全独立的进程。
* **分离的对象：** 您的数据点已整齐地分离为 `weathersense.0.*` 和 `weathersense.1.*`。
* **清晰的 MQTT 路由：** 如果您使用集成的 MQTT 功能，您的主题将按传感器 ID 清晰地分隔开（例如，`weathersense/1/...` 和 `weathersense/2/...`），防止数据在您的代理上被覆盖。

## Changelog
### 5.2.2 (2026-07-09)

- Typo corrected

### 5.2.1 (2026-07-09)

- Typo corrected

### 5.2.0 (2026-07-09)

- Invert PowerStatus flag added

### 5.1.1 (2026-07-05)

- Bugfix: Unit windDirection km/h → °

### 5.1.0 (2026-07-04)

- Now filenames of JSON files beginning with weathersense.{sensor_id}...

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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