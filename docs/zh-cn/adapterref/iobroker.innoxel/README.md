---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: VKgsaXa83kaMqCtr9cKRlAFeLWMLDCmTLldAQujBdpI=
---
![标识](../../../en/adapterref/iobroker.innoxel/admin/innoxel.png)

![节点](https://img.shields.io/node/v-lts/iobroker.innoxel)
![NPM版本](https://img.shields.io/npm/v/iobroker.innoxel.svg)
![下载](https://img.shields.io/npm/dm/iobroker.innoxel.svg)
![执照](https://img.shields.io/npm/l/iobroker.innoxel)
![安装数量](https://iobroker.live/badges/innoxel-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/innoxel-stable.svg)
![依赖状态](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)
![国家公共管理](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)

# IoBroker.innoxel
Innoxel Master 3 适配器 (https://innoxel.ch)

![测试与发布](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

＃＃ 要求
- NodeJS >= 18.x
- ioBroker >= 4.x，管理员 >= 5.x
- Innoxel Master 3智能家居系统

＃＃ 安装
在适配器成为稳定存储库的一部分之前，您可以通过在 ioBroker 中启用专家模式来安装最新版本，并从 npm 安装适配器。不要直接从 Github 安装它，这将导致适配器启动时出现错误（“找不到启动文件”）。

安装后，创建一个新实例并配置设置：

- 用于访问 innoxel master 的连接设置
    -   IP地址
    -   港口
    -   用户名
    -   密码
- 不同区域的轮询间隔
    - 状态变化（即开关、调光器）
    - 室内气候/恒温器
    -   天气
    - innoxel主设备详细信息

## 支持的模块和固件
该适配器的预发布版本已使用固件 1.4.1.0 和 1.5.1.0 运行了 2 年多。

该最初发布的版本已使用固件 1.6.0.0 进行了测试。

以下模块已经过测试/支持：

- 不锈钢大师 3
- 开关 8 G1
- 电机 4 x 230 VAC G1
- 暗淡 4 x 600 VA
- 品尝者RGB
- 热能
- Wetterstation P03/3-RS485-CET

如果它适用于您的不同模块，或者您有其他模块不起作用，请随时提出问题。

## 消息
该适配器支持以下各节中描述的消息。

### 触发模块
模拟按下“Taster”上的按钮。

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
    // do something after the button press has been executed
});
```

- <code>moduleId</code>是“Taster”的 ID/地址
<code>channelId</code>是“Taster”上按钮的索引
- <code>callback</code> （可选）执行操作时调用的回调函数

### SetDimValue
模拟按下“Taster”上的按钮。

```ts
sendTo("innoxel.0", "setDimValue", "<moduleId>:<channelId>:<dimValue>:<dimSpeed>", callback);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
    // do something after value has been set
});
```

- <code>moduleId</code>是调光器模块的 ID/地址
<code>channelId</code>是模块上调光器的通道
- <code>dimValue</code>是要设置的百分比值 (0-100)
- <code>dimSpeed</code> （可选）是要使用的调光速度（0-15）
- <code>callback</code> （可选）执行操作时调用的回调函数

### 设置温度
设置加热或冷却温度。

```ts
sendTo("innoxel.0", "setTemperature", "<moduleId>:<temperatureType>:<temperature>", callback);

// i.e. to set setTemperatureHeating to 20° on room climate module 0
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20");
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20", () => {
    // do something after the button press has been executed
});
```

- <code>moduleId</code>是房间气候模块的 ID/地址
<code>temperatureType</code>是要设置的温度类型（absenceSetbackTemperatureCooling、absenceSetbackTemperatureHeating、nightSetbackTemperatureCooling、nightSetbackTemperatureHeating、setTemperatureCooling、setTemperatureHeating、）
- <code>temperature</code>设置温度，以 0.5° 为步长。根据类型还有最小/最大值
- <code>callback</code> （可选）执行操作时调用的回调函数

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-(matthsc) drop support for Node 16

### 0.3.1 (2023-05-23)

-   (matthsc) change actual value from temperature sensor if it doesn't provide values
-   (matthsc & dependabot) dependency updates

### 0.3.0 (2023-04-22)

-   (matthsc) allow to set heating/cooling temperatures
-   (matthsc & dependabot) dependency updates

### 0.2.0 (2022-09-28)

-   (matthsc) drop support for Node 12 and js-controller 3
-   (matthsc) implement migrations from create-adapter
-   (matthsc & dependabot) dependency updates

### 0.1.5 (2022-02-12)

-   (matthsc) don't always terminate adapter on errors while updating identities
-   (matthsc) improve error messages

### 0.1.4 (2022-01-25)

-   (matthsc) fix double decryption issues with password in adapter admin
-   (matthsc) change input field types in adapter admin

### 0.1.3 (2022-01-16)

-   (matthsc) improve error messages

### 0.1.2 (2022-01-07)

-   (matthsc) catch authentication errors
-   (matthsc) fix authentication
-   (matthsc) remove build folders from git

### 0.1.1 (2022-01-01)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2021-12-30)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2023 matthsc <matthsc@gmx.net>

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