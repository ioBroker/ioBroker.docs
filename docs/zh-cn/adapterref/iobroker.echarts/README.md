---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.echarts/README.md
title: ioBroker.echarts
hash: USV0DtM4cmKWURgsttOjXnQjTRgXrKtJOXVavTdefNk=
---
![标识](../../../en/adapterref/iobroker.echarts/admin/echarts.png)

![安装数量](http://iobroker.live/badges/echarts-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.echarts.svg)
![下载](https://img.shields.io/npm/dm/iobroker.echarts.svg)

# IoBroker.echarts
![测试与发布](https://github.com/ioBroker/ioBroker.echarts/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

## IoBroker 的 echarts 适配器
在 ioBroker 中构建有用的图表：

![截屏](../../../en/adapterref/iobroker.echarts/img/screenshot1.png)

![酒吧](../../../en/adapterref/iobroker.echarts/img/bars.png)

![雷达](../../../en/adapterref/iobroker.echarts/img/radar.png) 使用“实际值”聚合来预测结果。

＃＃ 用法
重启后在管理面板中添加：![行政](../../../en/adapterref/iobroker.echarts/img/admin.png)

创建的预设也可以在网络适配器中访问。网址：`http://IP:8082/echarts/index.html?preset=echarts.0.PRESETID`。

对于`vis`，有一个特殊的小部件可以轻松选择预设。

### 工具提示
小写`i` 表示该值是根据 2 个邻域值插值而来的，并且在该时间戳不存在。

![工具提示](../../../en/adapterref/iobroker.echarts/img/tooltip.png)

### JSON 数据
您可以从 JSON 定义数据源。在这种情况下，您可以创建一些类型为 `json` 的自定义状态并像这样存储值：

```json
[
    { "ts": 1675887847000, "val": 45 },
    { "ts": 1675887848000, "val": 77 },
    { "ts": 1675887849000, "val": 180 }
]
```

对于 `val`，支持以下备选属性名称：`value`、`v`、`data`、`y`。
对于 `ts`，支持以下备选属性名称：`time`、`t`、`date`。

您无法在 echarts 设置中定义开始和结束。开始和结束将根据数据自动计算。
也无法进行聚合。所有操作都必须通过写入 JSON 数据来完成。
每次值发生变化时，图表都会自动更新。

### 服务器端渲染
您可以在服务器上呈现预设并将其作为 base64 URL 获取或将其保存在 ioBroker DB 中的磁盘上：

```js
sendTo(
    'echarts.0',
    {
        preset: 'echarts.0.myPreset', // the only mandatory attribute

        renderer: 'svg', // svg | png | jpg | pdf, default: svg

        width: 1024, // default 1024
        height: 300, // default 300
        background: '#000000', // Background color
        theme: 'light', // Theme type: 'light', 'dark'

        title: 'ioBroker Chart', // Title of PDF document
        quality: 0.8, // quality of JPG
        compressionLevel: 3, // Compression level of PNG
        filters: 8, // Filters of PNG (Bit combination https://github.com/Automattic/node-canvas/blob/master/types/index.d.ts#L10)

        fileOnDisk: '', // Path on disk to save the file.
        fileName: '', // Path in ioBroker DB to save the files on 'echarts.0'. E.g. if your set "chart.svg", so you can access your picture via http(s)://ip:8082/echarts.0/chart.png

        cache: 600, // Cache time for this preset in seconds, default: 0 - no cache
    },
    result => {
        if (result.error) {
            console.error(result.error);
        } else {
            console.log(result.data);
        }
    },
);
```

**注意：您无法在启用缩放功能的触摸设备上启用/禁用图例中的线条**

## 开发者手册
**对于非开发人员，此链接无效！**

您可以使用以下方式在本地调试视图图表：

-cd iobroker.echarts/src-chart
-npm运行开始
- 浏览器：http://localhost:8081/adapter/echarts/tab.html?dev=true

待办事项
- vis 小部件（按钮）
- 在文件夹上或附近显示枚举图标

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 2.0.0 (2025-01-05)

- (@GermanBluefox) Project was completely rewritten with TypeScript
- (@GermanBluefox) Better mobile layouts added

### 1.9.5 (2024-12-20)

- (@GermanBluefox) Convert actual values with provided "convert" function too

### 1.9.2 (2024-09-10)

- (@GermanBluefox) Fixed polar and bar charts

### 1.9.0 (2024-08-06)

- (@GermanBluefox) upgraded packages
- (@GermanBluefox) removed `withStyles`

### 1.8.4 (2024-06-21)

- (foxriver76) upgraded dependencies

### 1.8.0 (2024-02-03)

- (@GermanBluefox) Added the radar (polar) chart type

### 1.7.2 (2023-11-20)

- (@GermanBluefox) Added option to hide the value in the future

### 1.7.1 (2023-11-16)

- (@GermanBluefox) Added X-Label offset
- (@GermanBluefox) Corrected icons in the object selection dialog

### 1.6.1 (2023-11-08)

- (@GermanBluefox) Added vis-2 widget

### 1.5.4 (2023-09-13)

- (@GermanBluefox) Added an option to the export dialog: select / unselect all
- (@GermanBluefox) Added the availability to show legend as dialog

### 1.5.3 (2023-09-12)

- (@GermanBluefox) Added an option to reset zoom and tilt after X seconds of idle

### 1.5.1 (2023-06-14)

- (@GermanBluefox) Error handling in JSON data was improved

### 1.5.0 (2023-05-17)

- (@GermanBluefox) Implemented raw data export

### 1.4.15 (2023-05-10)

- (@GermanBluefox) Allowed using the timestamp in seconds in JSON sources

### 1.4.14 (2023-04-20)

- (@GermanBluefox) Added support for the alternative names for JSON sources

### 1.4.13 (2023-03-14)

- (@GermanBluefox) Corrected some issues from GitHub

### 1.4.11 (2023-02-25)

- (@GermanBluefox) Booleans were improved

### 1.4.9 (2023-02-22)

- (@GermanBluefox) Allowed the disabling of texts for enums and the adding/deletion of own text values

### 1.4.7 (2023-02-22)

- (@GermanBluefox) Implemented custom texts for enums

### 1.4.6 (2023-02-16)

- (@GermanBluefox) Implemented custom texts for true and false values

### 1.4.5 (2023-02-16)

- (@GermanBluefox) Allowed copying only the web URLs in the preview
- (@GermanBluefox) Corrected boolean charts

### 1.4.3 (2023-02-15)

- (@GermanBluefox) Implemented charts preview

### 1.4.1 (2023-02-14)

- (@GermanBluefox) Corrected some issues from GitHub
- (@GermanBluefox) Implemented negative offset of X-Axis
- (@GermanBluefox) Show device names for charts

### 1.4.0 (2023-02-13)

- (@GermanBluefox) Added possibility to load the history data from JSON state.

### 1.3.4 (2023-02-08)

- (@GermanBluefox) Added a formula for the value conversion

### 1.3.3 (2023-02-08)

- (@GermanBluefox) Implemented bar chart

### 1.2.1 (2023-01-31)

- (@GermanBluefox) Changed german translation
- (@GermanBluefox) Added new positions for markings: inside, top, bottom

### 1.1.5 (2022-12-31)

- (@GermanBluefox) Refactoring and packages update done

### 1.1.3 (2022-12-01)

- (@GermanBluefox) Make all buttons smaller

### 1.1.1 (2022-08-23)

- (@GermanBluefox) Added preparations for vis2.0

### 1.1.0 (2022-07-05)

- (@GermanBluefox) Made it work with ioBroker cloud
- (@GermanBluefox) GUI migrated to mui5

### 1.0.10 (2022-06-20)

- (@GermanBluefox) Corrected the problem with `socket.io`

### 1.0.9 (2022-06-17)

- (@GermanBluefox) Added 2 weeks as a relative period

### 1.0.8 (2022-06-01)

- (@GermanBluefox) Added option `shift+mouse move` to scale Y axis

### 1.0.7 (2022-05-13)

- (@GermanBluefox) Added background to export image
- (@GermanBluefox) Added integral and percentile aggregate methods

### 1.0.5 (2022-02-16)

- (@GermanBluefox) Added "i" in tooltips by interpolated values

### 1.0.4 (2022-01-31)

- (@GermanBluefox) License changed to Apache-2.0 (because of apache/echarts)
- (@GermanBluefox) Updated some packages
- (@GermanBluefox) Added fast properties editor

### 1.0.3 (2021-07-21)

- (@GermanBluefox) Fixed server-side rendering

### 1.0.2 (2021-07-20)

- (@GermanBluefox) Fixed the communication with admin4

### 1.0.1 (2021-07-14)

- (@GermanBluefox) Fixed the "no background" option

### 1.0.0 (2021-07-02)

- (@GermanBluefox) Fixed many bugs

### 0.4.14 (2021-04-29)

- (@GermanBluefox) Fixed reorder of presets

### 0.4.13 (2021-03-27)

- (@GermanBluefox) Tried to sort the time series before displaying it

### 0.4.12 (2021-03-27)

- (@GermanBluefox) Added the support of parameters in URL

### 0.4.11 (2021-02-06)

- (@GermanBluefox) Fixed the dashed lines

### 0.4.10 (2020-12-22)

- (@GermanBluefox) Allow the hiding of lines at start and show them via legend later
- (@GermanBluefox) Use canvas renderer on touch devices to allow zoom and pan

### 0.4.9 (2020-12-21)

- (@GermanBluefox) Updated echarts to 5.0
- (@GermanBluefox) Implemented copy&paste of lines and markings
- (@GermanBluefox) Available vertical legend
- (@GermanBluefox) Allowed the hiding the interpolated values in tooltip

### 0.4.7 (2020-12-13)

- (@GermanBluefox) Updated the select ID dialog

### 0.4.6 (2020-12-12)

- (@GermanBluefox) Allowed the same names in different folders

### 0.4.5 (2020-12-11)

- (@GermanBluefox) Some sentry errors were corrected.
- (@GermanBluefox) Added the possibility to show actual values in legend.

### 0.4.4 (2020-12-07)

- (@GermanBluefox) Some sentry errors were corrected.

### 0.4.2 (2020-11-29)

- (@GermanBluefox) Corrected the error with overflow of axis.

### 0.4.1 (2020-11-29)

- (@GermanBluefox) Disconnection errors are caught now.

### 0.4.0 (2020-11-28)

- (@GermanBluefox) Added new option: no background

### 0.3.9 (2020-11-28)

- (@GermanBluefox) Corrected error with the chart.

### 0.3.8 (2020-11-27)

- (@GermanBluefox) Implemented the conversion of the flot presets into echarts.

### 0.3.7 (2020-11-17)

- (@GermanBluefox) Hide nulls in hover details

### 0.3.6 (2020-11-13)

- (@GermanBluefox) The copy of charts is implemented

### 0.3.5 (2020-11-10)

- (@GermanBluefox) Corrected SENTRY errors

### 0.3.4 (2020-11-08)

- (@GermanBluefox) Corrected server-side rendering of PNG

### 0.3.1 (2020-10-31)

- (@GermanBluefox) Added the color of export button
- (@GermanBluefox) The interpolated values are shown now
- (@GermanBluefox) Server-side rendering is implemented

### 0.2.1 (2020-10-25)

- (@GermanBluefox) GUI fixes

### 0.2.0 (2020-10-22)

- (@GermanBluefox) Implemented the grouping by the category.

### 0.1.2 (2020-10-21)

- (@GermanBluefox) Added support for multiple charts

### 0.1.1 (2020-10-21)

- (@GermanBluefox) initial release

## License

ioBroker.echarts is available under the Apache License V2.

Copyright (c) 2019-2025 @GermanBluefox <dogafox@gmail.com>

Apache ECharts
Copyright (c) 2017-2025 The Apache Software Foundation

This product includes software developed at
The Apache Software Foundation (https://www.apache.org/).