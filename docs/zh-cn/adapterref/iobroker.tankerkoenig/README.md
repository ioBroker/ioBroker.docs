---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: EVWakFmysLhV8jLpiuNRzO7eNy4Jr6IqSS4XZofd160=
---
![标识](../../../en/adapterref/iobroker.tankerkoenig/../../admin/tankerkoenig.png)

![安装数量](http://iobroker.live/badges/tankerkoenig-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![新PM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)

# IoBroker.tankerkoenig
**测试：** [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml)

＃＃ 描述
此适配器通过 Web 服务[tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about)。所有数据都存储在要使用和显示的对象中 [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) 的 JSON 提要返回多达 10 个不同站点的燃料价格。
与 list.php 和 detail.php (bulk) 相比，适配器使用的网站 prices.php 减少了更新时要传输的数据量。适配器为销售最便宜的 E5、E10 和柴油的加油站创建数据点。

＃＃ 配置
### API 密钥
API 密钥可在 [Tankerkönig 网站](https://creativecommons.tankerkoenig.de/#about) 处获取。这是一个 36 位的代码，必须在此字段中输入。

### 站
最多可查询10个加油站。为此，您需要输入加油站 ID。您可以在 tankerkoenig.de 上获取每个加油站的 ID。它也是 36 位数长。
此外，您可以输入您自己的电台名称。
![替代文字](../img/tankerkoenigSettingsScreenshot1.png "截图设置")![替代文字](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigSettingsScreenshot2.png "截图设置")

此窗口用于添加新站，您可以直接在下面的地图中读取体育场 ID 并将其复制到上面的字段中。

#### 复制站ID 有2种方法将ID复制到字段中：
- 标记 ID 并使用 Ctrl+C 复制或右键单击复制，然后粘贴到字段中。
- 您也可以使用“复制”按钮进行操作，这将复制整个内容，然后您可以将其直接粘贴到字段中。

  或者您点击按钮`Paste`然后只有 ID 将被粘贴到该字段中。

![替代文字](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigStationFinder_copyId.png "截图设置") 在折扣选项下，您可以选择折扣变量⇨欧元/百分比以及折扣适用的燃料类型（默认全部选择）。

![替代文字](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigStationFinder.png "截图设置")

### 设置值为0 关闭加油站时，如果要设置价格为0，请激活此功能。\ 如果关闭此功能，价格将被设置为无效，见下文。
### 无效价格
如果加油站不提供 E5、E10 或柴油的价格，例如如果车站关闭，价格不会改变，而是将状态质量设置为`Quality code 0x40 => Substitute value from device`，然后状态将显示为橙色。

![替代文字](../../../en/adapterref/iobroker.tankerkoenig/../img/state_quality.png "截图设置")

### 最小化日志
为了减少日志写入（例如在 SD 卡上），可以选择此选项。

## 激活
适配器作为守护程序运行（不是在计划模式下），并且每五分钟定期启动。 tankerkoenig.de 上的服务器仅每 4 分钟更新一次源源的数据，因此更频繁地查询数据是没有意义的，只会导致多余的数据流量和资源成本。可以随时设置更大的间隔。

＃＃  数据点
数据点是动态创建的，也就是说，当您创建一个站时，会为其创建数据点（最多 10 个站）。
删除站时，不再需要的数据点也会被删除。
![替代文字](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigNewDP.png "截图设置") 在不同的燃料类型下，创建了以下数据点：

* `feed`（价格为小数点后三位）
* `short`（带两位小数的价格（不四舍五入）作为字符串）
* `3rd`（价格的第三个小数位，代表 VIS 中的上标）
* `combined`（现成的 HTML 格式为价格和上标小数点后第三位，或者必要时打开状态 [“已关闭”/“未找到”]，以便使用 VIS HTML 小部件轻松显示）

此外，在各个站中创建了五个数据点：

* `discount`（以欧元计的折扣/百分比为数字）
* `discounted`（显示折扣是否有效）
* `status`（站打开？）
* `name`（用户给出的加油站名称）
* `station_id`（加油站的油轮大王ID）

此外，列表中最便宜的加油站在渠道中确定

*`最便宜的.E5`
*`chepest.E10`
*`最便宜的柴油`

在站级别上创建了另外五个数据点：

* `adapterStatus`（显示适配器可能值的状态：`idle / automatic request / manual request / requet timeout 1min / write states / request Error / offline`）
* `json`（加油站的JSON数据）
* `jsonTable`（用于可见的json表`只有json数据没有小部件`）

![替代文字](../../../en/adapterref/iobroker.tankerkoenig/../img/jsonTable.png "截图设置")

* `lastUpdate`（上次更新时间）
* `refresh`（这是一个手动刷新数据的按钮`WARNING`一旦触发后，1分钟内无法触发手动刷新）

在这些渠道中，为指定的燃料类型创建了最有利的加油站。如果多个加油站以相同的价格提供燃料，则会输出设置中最先输入/位于顶部的加油站。

##可见
数据点“组合”可以轻松显示在此 VIS 小部件中

```js
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```

数据点 `combined` 的值提供了一个 css 类。这些类是`station_open`、`station_closed`和`station_notfound`。通过在 VIS 中的 CSS 编辑器中定义 CSS，现在可以实现区分设计（如封闭站的红色字体颜色）。

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
### __WORK IN PROGRESS__
* (xXBJXx) Ukrainian translation added
* (xXBJXx) add validation function for ID and Name Input fields
* (xXBJXx) add copy from clipboard function for ID Input field

### 3.0.2 (2022-11-10)
* (xXBJXx) release new version from Tankerkoenig

### 3.0.1 (2022-07-30)
* (xXBJXx) added datapoints delete function
* (xXBJXx) resetValue function removed and state quality implemented. [issue #79](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/79)
* (xXBJXx) added function => Set values to 0 when the Station is closed.
* (xXBJXx) updated dependencies

### 3.0.0 (2022-07-02)
* (xXBJXx) BREAKING Adapter code completely revised
* (xXBJXx) Adapter completely switched to TypeScript
* (xXBJXx) BREAKING Adapter configurations page switched to React and redesigned
  (old config not compatible stations must be recreated)
* (xXBJXx) add Dependabot auto merge support
* (xXBJXx) add test and release script 
* (xXBJXx) Dependency updated
* (xXBJXx) add feature request: manual update of all stations (one request per minute allowed) [issue #53](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/53) 
* (xXBJXx) add a new state => adapterStatus (indicates whether the adapter executes an automatic request or a manual request)
* (xXBJXx) add new cutPrice function [issue #73](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/73)
* (xXBJXx) add the feature request: Include discount in price (euro and percent) [issue #50](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/50) and adapter code optimized
* (xXBJXx) add the feature request: JsonTable for the vis [issue #24](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/24)

### 2.2.0 (2021-11-14)
* (simatec) Design Fix for Admin Dark/Blue Theme

### 2.1.1 (2021-06-22)
* (pix) New adapter category "vehicle" [#67](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/67)
* (pix) Testing for Nodejs 16

### 2.0.12 (2021-05-05)
* (pix) connectionType and dataSource added

### 2.0.11 (2021-05-02)
* (anwa) "wrong type" and "ack flag" issues fixed (upcoming in js-controller > 3.3)

### 2.0.10 (2021-02-01)
* (wendy) "has no existing object" issue fixed

### 2.0.9 (2020-04-21)
* (pix) NodeJS 10 or higher required

### 2.0.8 (2020-03-27)
* (Zwer2k) 2.0.8 Catch error if station status reports _no data_

### 2.0.7 (2020-03-25)
* (pix) 2.0.7 Catch error if station status reports _no stations_

### 2.0.6 (2019-04-17)
* (Zwer2k) implementation of utils corrected
* (Zwer2k) fixed error occured when all stations were closed

### 2.0.5 (2019-02-22)
* (jens-maus) fixes to prevent _request()_ floodings

### 2.0.3 (2019-02-21)
* (pix) fixed issue with too short sync interval
* (pix) removed datapoint __price__ which was created for debug only

### 2.0.1 (2019-02-20)
* (pix) fixed scrollbar issue in firefox

### 2.0.0 (2019-02-18)
* (pix) admin3 ready

### 1.3.1 (2019-02-05)
* (arteck, pix) request issues fixed

### 1.3.0 (2019-02-05)
* (pix) Compact mode added

### 1.2.1 (2018-11-25)
* (pix) fixed issue __station_id__ and __status__ mixed up

### 1.2.0 (2018-11-25)
* (pix) new datapoint station ID added

### 1.1.0 (2018-05-12)
* (bluefox) prices as number to allow logging were added

### 1.0.5 (2018-02-07)
* (pix) Log entry opt out

### 1.0.4 (2017-03-21)
* (pix) position of _adapter.stop()_ optimized

### 1.0.3 (2017-01-05)
* (pix) Appveyor testing added

### 1.0.2 (2017-01-04)
* (apollon77) TravisCI testing added

### 1.0.1 (2016-12-20)
* (pix) reset to zero issue fixed

### 1.0.0 (2016-10-08)
* (pix) reset values to zero before each refresh now can be ticked off.

### 0.1.2 (2016-07-05)
* (pix,jens-maus) whitespaces between price and € sign

### 0.1.1 (2016-07-05)
* (pix) € appearance in datapoints __combined__ is customizable through css now (thanx jens-maus)

### 0.1.0 (2016-06-12)
* (pix) first version for npm
* (pix) settings window

### 0.0.8 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.7 (2016-06-09)
* (pix) New channels and values for cheapest station created

### 0.0.6 (2016-06-08)
* (pix) Short prices now string

### 0.0.5 (2016-06-08)
* (pix) Channels added for stations 2 to 10
* (pix) Readme corrected (CSS code example)
* (pix) no more log.warn if station is closed
* (pix) scheduled starting improved

### 0.0.4 (2016-06-01)
* (pix) HTML Code in Datapoint __combined__ corrected

### 0.0.3 (2016-06-01)
* (pix) Datapoint __combined__ with CSS class for status

### 0.0.2 (2016-06-01)
* (pix) Datapoint __combined__

### 0.0.1 (2016-05-31)
* (pix) Adapter created

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