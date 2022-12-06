---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: 9aeEIokXbdHZ0PK5kwL7/DXckDM9lFRJEFhSrXd4mUE=
---
![标识](../../../en/admin/tankerkoenig.png)

![安装数量](http://iobroker.live/badges/tankerkoenig-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![NPM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)

# IoBroker.tankerkoenig
**测试：** [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml)

＃＃ 描述
此适配器通过网络服务 [tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about)。所有数据都存储在对象中以供使用和显示在[ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) 的 JSON 提要返回最多十个不同站点的燃油价格。
适配器使用站点 prices.php，与 list.php 和 detail.php（批量）相比，它减少了更新时要传输的数据量。适配器为销售最便宜的 E5、E10 和柴油的车站创建数据点。

＃＃ 配置
### API 密钥
API 密钥可以在 [网站 Tankerkönig](https://creativecommons.tankerkoenig.de/#about) 获得。这是必须在此字段中输入的 36 位代码。

### 车站
最多可查询10个加油站。为此，您需要输入加油站 ID。您可以在 tankerkoenig.de 上获取每个加油站的 ID。它也是 36 位长。
此外，您可以为电台输入您自己的名称。
![替代文字](../img/tankerkoenigSettingsScreenshot1.png "截图设置")![替代文字](../../../en/adapterref/img/tankerkoenigSettingsScreenshot2.png "截图设置")

此窗口用于添加新站点，您可以直接在下面的地图中读取体育场ID并将其复制到上面的字段中。

#### Copy station ID 有两种方法可以将ID复制到字段中：
- 您标记 ID 并使用 Ctrl+C 复制它或右键单击复制然后粘贴到字段中。
- 您也可以使用“复制”按钮执行此操作，这将复制全部内容，然后您可以将其直接粘贴到字段中。

  或者你点击按钮 `Paste` 然后只有 ID 将被粘贴到字段中。

**但是为此你必须允许浏览器访问剪贴板。**

![替代文字](../../../en/adapterref/img/tankerkoenigStationFinder_copyId.png "截图设置") 在折扣选项下，您可以选择折扣变体 ⇨ 欧元/百分比以及折扣适用的燃料类型（默认均已选中）。

![替代文字](../../../en/adapterref/img/tankerkoenigStationFinder.png "截图设置")

### Set values to 0 如果在加油站关闭时将价格设置为 0，则激活此功能。\ 如果关闭此功能，价格将设置为无效，见下文。
### 无效价格
如果加油站不提供 E5、E10 或柴油的价格，例如如果车站关闭，价格不会改变，而是状态质量将设置为 `Quality code 0x40 => Substitute value from device`，然后该状态将显示为橙色。

![替代文字](../../../en/adapterref/img/state_quality.png "截图设置")

## 激活
该适配器作为守护程序运行（不是以调度模式）并每五分钟定期启动一次。源提要的数据由 tankerkoenig.de 的服务器每 4 分钟更新一次，因此更频繁地查询数据没有意义，只会导致多余的数据流量和资源成本。可以随时设置更大的间隔。

＃＃  数据点
数据点是动态创建的，也就是说，当您创建一个站时，会为其创建数据点（最多 10 个站）。
![替代文字](../../../en/adapterref/img/tankerkoenigNewDP.png "截图设置") 根据不同的燃料类型创建以下数据点：

* `feed`（小数点后三位数字的价格）
* `short`（带两位小数的价格（未四舍五入）作为字符串）
* `3rd`（价格小数点后第三位，代表VIS中的上标）
* `combined`（现成的 HTML 格式，带有价格和上标小数点后第三位，或者如果需要打开状态 [`closed`/`not found`] 以便使用 VIS HTML 小部件轻松显示）

在每种燃料类型下，还有另一个文件夹 `minmax`，其中创建了加油站最低和最高价格的数据点。它们仅存储一天，将设置为 0 并在第二天重新填充。

此外，在相应的站中创建了五个数据点：

* `discount`（欧元折扣/数字百分比）
* `discounted`（显示折扣是否有效）
* `status`（车站开放？）
* `name`（用户给的加油站名称）
* `station_id`（加油站的 Tanker King ID）

此外，列表中最便宜的加油站在渠道中确定

*`最便宜的.E5`
*`chepest.E10`
*`最便宜的柴油`

在站级创建了另外五个数据点：

* `adapterStatus`（显示适配器的状态可能值：`空闲/自动请求/手动请求/请求超时1分钟/写入状态/请求错误/离线`）
* `json`（加油站的JSON数据）
* `jsonTable` (json table for the vis `only the json data no widget`)

![替代文字](../../../en/adapterref/img/jsonTable.png "截图设置")

* `lastUpdate`（上次更新时间）
* `refresh`（这是一个手动刷新数据的按钮 `WARNING` 触发后一旦1分钟无法触发手动刷新）

在这些渠道中，将创建最适合指定燃料类型的加油站。如果多个加油站以相同的价格提供燃料，则输出首先输入/位于设置顶部的加油站。

## 可视化
可以在此 VIS 小部件中轻松显示“组合”数据点

```js
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```

数据点 `combined` 的值提供了一个 css 类。这些类是 `station_open`、`station_closed` 和 `station_notfound`。通过 VIS 中 CSS 编辑器中的 CSS 定义，现在可以实现不同的设计（如封闭站的红色字体颜色）。

```css
.station_open {
    color: blue;
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}
.station_no_prices {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

## Changelog
 <!--
 Release Script: https://github.com/AlCalzone/release-script
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
### 3.1.0 (2022-11-27)
* (xXBJXx) removed noLog option because the adapter log output was strongly optimized
* (xXBJXx) Optimized sorting of the cheapest gas station [issue #96](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/96)
* (xXBJXx) add new state `cheapest_stations` for the cheapest gas station [issue #93](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/93)

### 3.0.6 (2022-11-23)
* (xXBJXx) Added new option to adjust the text in the combined data point [issue #95](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/95)

### 3.0.5 (2022-11-20)
* (xXBJXx) fixed sort bug for cheapest station

### 3.0.4 (2022-11-19)
* (xXBJXx) moved misc-data type to vehicle type
* (xXBJXx) fixed messages rules and added new messages for Adapter Update
* (xXBJXx) update dependencies
* (xXBJXx) added lastUpdate_min / lastUpdate_max DP [issue #91](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/91)

### 3.0.3 (2022-11-18)
* (xXBJXx) Ukrainian translation added
* (xXBJXx) add validation function for ID and Name Input fields
* (xXBJXx) add copy from clipboard function for ID Input field
* (Schmakus) added daily min/max prices to all stations and fuel types
* (xXBJXx) update documentation because of new min/max datapoints

## License

The MIT License (MIT)

Copyright (c) 2016-2022 xXBJXx <issi.dev.iobroker@gmail.com> pix

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