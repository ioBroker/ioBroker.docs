---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gigaset-elements/README.md
title: ioBroker.gigaset-elements
hash: 1oyVwCTbRtET9A4NHBQpmOTqee1TGRRmfusOyCqqJ6Y=
---
![标识](../../../en/adapterref/iobroker.gigaset-elements/admin/gigaset-elements.png)

![节点](https://img.shields.io/node/v-lts/iobroker.gigaset-elements)
![NPM版本](https://img.shields.io/npm/v/iobroker.gigaset-elements.svg)
![下载](https://img.shields.io/npm/dm/iobroker.gigaset-elements.svg)
![执照](https://img.shields.io/npm/l/iobroker.gigaset-elements)
![安装数量](https://iobroker.live/badges/gigaset-elements-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/gigaset-elements-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.gigaset-elements.png?downloads=true)

# IoBroker.gigaset-elements
Gigaset Elements 适配器 (https://gigaset.com/smart-home)

![测试与发布](https://github.com/matthsc/ioBroker.gigaset-elements/workflows/Test%20and%20Release/badge.svg)

＃＃ 要求
- NodeJS >= 18.x
- ioBroker >= 4.x，管理员 >= 5.x
- Gigaset Elements系统

＃＃ 安装
您可以从稳定或最新/测试存储库安装适配器（通过在 ioBroker 中启用专家模式并从 npm 安装适配器）。不要直接从 Github 安装它，这将导致适配器启动时出现错误（“找不到启动文件”）。

安装后，创建一个新实例并配置设置：

- 用于访问 Gigaset Elements 云的连接设置
    -   电子邮件
    -   密码
    - 身份验证间隔以小时为单位，应为 6
- 不同区域的轮询间隔
    - 事件（即窗/门打开/倾斜/关闭） - 轮询之间的秒数
    - 元件/传感器数据（即温度、湿度） - 轮询之间的分钟数
    - 系统运行状况数据（绿色/橙色/红色） - 轮询之间的分钟数

### 支持的元素
到目前为止，该适配器已经过测试/已知可与以下元素配合使用，并且测试数据可通过 [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) 获得：

|元素类型 |元素名称 |测试者 |
| ------------ | ----------------------- | --------------------------------------------------------------------- |
|是01 |警报器|数学 |
|嗯01 |通用/窗/门|数学 |
| WD01 |水 |数学 |
| sd01 | sd01 |烟雾（仅测试警报）|家庭控制|
| SP01 |插头| matthsc（由[沃格尔93](https://github.com/Voggl93)赞助的硬件）|

该适配器还支持以下其他设备：

|设备类型 |友好名称|事件类型 |
| ----------- | ------------- | ----------- |
| GP02 |电话 | GP.call |

### 为不支持的元素提供测试数据
如果您还有其他元素，或者遇到适配器尚未处理的事件类型，您可以在 ioBroker 中启用专家模式，转到适配器设置中的_调试_选项卡（仅在专家模式下可见），然后使用“调试 - 准备” test data”来生成测试数据，这些测试数据可以作为此适配器的 github 问题的一部分提交，以获得包含的其他元素/事件类型。尽可能从生成的数据中删除基站或元素名称和 ID 等个人数据。

## 消息
到目前为止，适配器仅支持用于测试/调试的消息。

### 测试
如果操作成功，回调响应为<code>{ response: &quot;&lt;message&gt;&quot; }</code> ；如果出现问题，回调响应为<code>{ error: &quot;&lt;error message&gt;&quot; }</code> 。

#### 平
向适配器发送 ping，并接收<code>{ response: &quot;pong&quot; }</code> 。

```ts
sendTo("gigaset-elements.0", "test", "ping", callback);
```

#### 处理测试数据
处理来自[gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api)的测试数据。创建基站、元素并处理捕获的测试事件。

```ts
sendTo("gigaset-elements.0", "test", "process-test-data", callback);
```

### 调试
如果操作成功，回调响应为<code>{ response: object }</code>如果出现问题，回调响应为<code>{ error: &quot;&lt;error message&gt;&quot; }</code> 。

#### 准备测试数据
从 Gigaset Elements API 加载当前数据，并准备将其作为测试数据集成到 [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) 中，即用于尚无测试数据的新事件或元素。

从 API 加载基站、元素和事件，减少数据量以最大限度地减少数据量，并尝试从数据中删除姓名和 ID 等个人信息。

以<code>{ response: { bs: [], elements: [], events: [] } }</code>对象的形式返回数据。

```ts
sendTo("gigaset-elements.0", "debug", { action: "prepare-test-data" from?: Date }, callback);
```

####加载基站和元素数据
加载原始基站和元素数据并将其作为<code>{ response: { bs: [], elements: []} }</code>对象返回。

```ts
sendTo("gigaset-elements.0", "test", { action: "load-bases-elements" }, callback);
```

#### 加载事件
加载事件并返回一个<code>{ response: { events: [] } }</code>对象。

事件数据通常可用 1 个月，较旧的数据似乎不可用。

```ts
sendTo("gigaset-elements.0", "test", { action: "load-events", from: Date, to: Date }, callback);
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.3 (2023-11-21)

-   (matthsc) bugfix

### 0.4.2 (2023-11-20)

-   (matthsc) downgrade typescript to fix integration tests

### 0.4.1 (2023-11-20)

-   (matthsc) add states for batterySaverMode, momentaryPowerMeasurement (plug), setPoint (thermostat)
-   (matthsc) allow to change setPoint for thermostat (experimental/untested)
-   (matthsc) allow to change intrusion mode
-   (matthsc) allow to trigger user alarm
-   (matthsc) add info.systemHealth state
-   (matthsc/dependabot) dependency updates

### 0.4.0 (2023-10-15)

-   (matthsc) add support for plugs
-   (matthsc) drop support for Node 14 and 16
-   (matthsc/dependabot) dependency updates

### 0.3.0 (2022-09-28)

-   (matthsc) drop support for Node 12 and js-controller 3
-   (matthsc) implement migrations from create-adapter
-   (matthsc/dependabot) dependency updates

### 0.2.2 (2022-09-17)

-   (matthsc) fix probably_open state
-   (matthsc/dependabot) dependency updates

### 0.2.1 (2022-07-02)

-   (matthsc) add initial support for smoke detectors
-   (matthsc/dependabot) dependency updates

### 0.2.0 (2022-04-30)

-   (matthsc) add support for phones
-   (matthsc) add Node 18 to test matrix
-   (matthsc/dependabot) dependency updates

### 0.1.3 (2022-03-22)

-   (matthsc) fix "unknown" element position state
-   (matthsc) add more tests
-   (matthsc/dependabot) dependency updates

### 0.1.2 (2022-02-28)

-   (matthsc) fix test data generation
-   (matthsc/dependabot) dependency updates

### 0.1.1 (2022-02-12)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2022-01-29)

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