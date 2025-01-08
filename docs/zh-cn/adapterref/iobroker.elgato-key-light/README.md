---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.elgato-key-light/README.md
title: ioBroker.elgato-key-light
hash: 1sJXajz4QdmDmjNSwZtWe8Vq1C3LNTao4eYtTfiUE4Q=
---
![标识](../../../en/adapterref/iobroker.elgato-key-light/admin/elgato-key-light.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)
![下载](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)
![安装数量](https://iobroker.live/badges/elgato-key-light-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/elgato-key-light-stable.svg)

# IoBroker.elgato-key-light
**测试：**![测试与发布](https://github.com/xXBJXx/ioBroker.elgato-key-light/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 elgato-key-light 适配器
### 免责声明
所有产品和公司名称或徽标均为其各自所有者的商标™ 或注册商标®。其使用并不表示其或相关附属机构有任何从属关系或认可！此个人项目仅供娱乐，不具有任何商业目的。**Elgato** 是 **Corsair GmbH** 的商标。

### 哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**\ 有关更多详细信息以及如何禁用错误报告的信息，请参阅。
[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

### 致谢
如果没有 @xXBJXx (https://github.com/xXBJXx) 的出色工作，这个适配器就不可能实现，他创建了这个适配器并希望将来能够再次维护它。

＃＃＃ 描述
该适配器允许您通过 ioBroker 控制[Elgato 按键灯](https://www.elgato.com/de/key-light)。\该适配器支持以下功能：

* 开/关电源。
* 亮度⇨（所有主灯均可用）。
* 色温 ⇨（仅适用于 [Elgato Key Light](https://www.elgato.com/de/key-light)、[Elgato Key Light Air](https://www.elgato.com/de/key-light-air)，

[Elgato 环形灯](https://www.elgato.com/de/ring-light) 和 [Elgato Key Light 迷你](https://www.elgato.com/de/key-light-mini) 可用）

* 颜色 ⇨（仅适用于 [Elgato 灯带](https://www.elgato.com/de/light-strip)）

### 适配器用户界面
实例下不存在经典适配器 UI。\![适配器 UI](admin/media/instances.png)![适配器 UI](../../../en/adapterref/iobroker.elgato-key-light/admin/media/elgato-key-light_UI.png)

在 UI 中可以做什么？

* 1号设置适配器的轮询间隔（默认值：60秒）。

更改间隔后，必须重新启动适配器，这可以使用“保存”按钮完成。

* 2号向适配器添加新设备。
* 3号设置所有关键灯的色温（2900K至7000K）
* 4 号设置所有主灯的亮度（0% 至 100%）
* 5号设置灯条的颜色

  ![适配器 UI](../../../en/adapterref/iobroker.elgato-key-light/admin/media/ColorPicker.png)

* 6号开关灯

**当更改3号、4号和5号时，更改将在1.5秒后执行。**

＃＃＃ 警告
**请不要过于频繁地访问数据点，否则设备将在几秒钟内无法访问。**

### 数据点
当发现新设备时，会自动创建数据点。

#### 所有主灯/灯带的数据点
![适配器 UI](../../../en/adapterref/iobroker.elgato-key-light/admin/media/ObjectsMain.png)\ 数据点分为：

* **info** ⇨ 有关设备的信息。

  ![适配器 UI](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_Info.png)

* **light** ⇨ 用于控制设备的数据点，这里有两种不同类型的数据点：
* 用于控制亮度和色温。

    ![适配器 UI](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_light_colorTemp.png)

* 用于控制颜色

    ![适配器 UI](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_light_color.png)

* **设置** ⇨ 来自设备设置的信息的数据点

  ![适配器 UI](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_settings.png)

### 注释
* 颜色数据点仅适用于灯带。
* 色温数据点仅适用于主光。
* 所有主灯和灯带均提供亮度数据点。
* 不支持光带场景。因为它们无法通过 API 访问。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2024-04-14)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.1 (2024-01-18)
* (mcm1957) Writing states now requires ack flag to be false.
* (mcm1957) Small adaptions to solve review issues have been applied.

### 1.0.0 (2024-01-18)
* (mcm1957) Adapter requires node.js 18 or newer now
* (mcm1957) Adapter has been moved into iobroker-community-adapters area
* (mcm1957) Dependencies have been updated

### 0.2.0 (2023-02-26)
* (xXBJXx) updated dependencies
* (xXBJXx) Updating the UI to the new functions of the iobroker-react library

### 0.1.0 (2023-02-06)
* (xXBJXx) removed the Bonjour search, because it did not work properly
* (xXBJXx) Adding a delete function for devices
* (xXBJXx) Dependency updates
* (xXBJXx) feature request [#2](https://github.com/xXBJXx/ioBroker.elgato-key-light/issues/2) added

## License
MIT License

Copyright (c) 2024 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

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