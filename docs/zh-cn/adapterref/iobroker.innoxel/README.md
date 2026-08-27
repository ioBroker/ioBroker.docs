---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: HEjFi/yoc2LNXdA4xAbLmvgbX1xYMOhBWzioRLUNoF0=
---
![标识](../../../en/adapterref/iobroker.innoxel/admin/innoxel.png)

![节点](https://img.shields.io/node/v-lts/iobroker.innoxel)
![NPM 版本](https://img.shields.io/npm/v/iobroker.innoxel.svg)
![下载](https://img.shields.io/npm/dm/iobroker.innoxel.svg)
![执照](https://img.shields.io/npm/l/iobroker.innoxel)
![安装数量](https://iobroker.live/badges/innoxel-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/innoxel-stable.svg)
![依赖状态](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)
![NPM](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)

# IoBroker.innoxel
Innoxel Master 3 适配器 (https://innoxel.ch)

![测试与发布](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

＃＃ 要求
- NodeJS 版本 >= 22.x
- ioBroker 版本 >= 6.0.11，且 admin 版本 >= 6.x
Innoxel Master 3 智能家居系统

＃＃ 安装
在适配器正式发布到稳定版仓库之前，您可以通过在 ioBroker 中启用专家模式，然后从 npm 安装适配器来获取最新版本。请勿直接从 GitHub 安装，否则适配器启动时会报错（“找不到启动文件”）。

可以直接从稳定版/测试版软件仓库安装该适配器。安装完成后，创建一个新实例并配置设置：

- 访问 innoxel master 的连接设置
- IP地址
  - 港口
- 用户名
  - 密码
- 不同区域的轮询间隔
- 状态变化（例如开关、调光器）
- 房间气候/温控器
  - 天气
- innoxel 主设备详细信息（连接到 innoxel 主设备的用户需要管理员权限）

请注意：不要直接从 Github 安装适配器，否则适配器启动时会出错（“找不到启动文件”）。

支持的模块和固件
该适配器的预发布版本已经运行了两年多，固件版本分别为 1.4.1.0 和 1.5.1.0。

最初发布的版本已使用固件 1.6.0.0 进行测试。

以下模块已通过测试/受支持：

- Innoxel Master 3
- 8G1开关
- 电机 4 x 230 VAC G1
- 调暗 4 x 600 VA
- 品尝器 RGB
- 热
- Wetterstation P03/3-RS485-CET

如果其他模块可以正常工作，或者您有其他模块无法正常工作，请随时提出问题。

## 消息
该适配器支持以下各节中描述的消息。

### 模块内触发器
模拟按下“品尝器”上的按钮。

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code>是“Taster”的 id/地址
- <code>channelId</code>是“Taster”按钮的索引
- <code>callback</code> （可选） 操作完成后要调用的回调函数

### 设置维度值
模拟按下“品尝器”上的按钮。

```ts
sendTo(
  "innoxel.0",
  "setDimValue",
  "<moduleId>:<channelId>:<dimValue>:<dimSpeed>",
  callback
);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
  // do something after value has been set
});
```

- <code>moduleId</code>是调光模块的 ID/地址
<code>channelId</code>是模块上调光器的通道号。
- <code>dimValue</code>是要设置的百分比值（0-100）
- <code>dimSpeed</code> （可选）是要使用的调光速度（0-15）
- <code>callback</code> （可选） 操作完成后要调用的回调函数

### 设置温度
设置制热或制冷温度。

```ts
sendTo(
  "innoxel.0",
  "setTemperature",
  "<moduleId>:<temperatureType>:<temperature>",
  callback
);

// i.e. to set setTemperatureHeating to 20° on room climate module 0
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20");
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code>是房间气候模块的 ID/地址
- <code>temperatureType</code>是要设置的温度类型（absenceSetbackTemperatureCooling、absenceSetbackTemperatureHeating、nightSetbackTemperatureCooling、nightSetbackTemperatureHeating、setTemperatureCooling、setTemperatureHeating）。
- <code>temperature</code>设置，以 0.5°C 为步长。根据类型不同，还有最小值/最大值。
- <code>callback</code> （可选） 操作完成后要调用的回调函数

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-05-16)
- (matthsc) implement adapter checker feedback and create-adapter migrations
- (copilot) Adapter requires node.js >= 22 now
- (matthsc & dependabot) dependency updates

### 1.0.1 (2024-12-09)
- (matthsc) implement adapter checker feedback
- (matthsc) cleanup changelog

### 1.0.0 (2024-11-17)

- (matthsc) drop support for Node 18
- (matthsc) switch admin to json config
- (matthsc) prepare for future controller versions (fix deprecation warnings)
- (matthsc & dependabot) dependency updates

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 matthsc <matthsc@gmx.net>

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