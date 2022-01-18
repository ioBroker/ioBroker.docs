---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Pix---/ioBroker.tankerkoenig/badge.svg?targetFile=package.json
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: prGhaNtsE2EchhnmVj2lhDlALqJtEe8yqbEtmyg/jjU=
---
![标识](../../../en/adapterref/iobroker.tankerkoenig/../../admin/tankerkoenig.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![新PM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg)
![应用程序](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true)

# IoBroker.tankerkoenig
＃＃ 描述
此适配器通过 Web 服务[tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about)。所有数据都存储在要使用和显示的对象中 [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) 的 JSON 提要返回多达 10 个不同站点的燃料价格。
与 list.php 和 detail.php (bulk) 相比，适配器使用的网站 prices.php 减少了更新时要传输的数据量。适配器为销售最便宜的 E5、E10 和柴油的加油站创建数据点。

＃＃ 配置
### API 密钥
API 密钥可在 [Tankerkönig 网站](https://creativecommons.tankerkoenig.de/#about) 处获取。这是一个 36 位的代码，必须在此字段中输入。

### 站
最多可以定义十个不同的站点。因此，可以在 tankerkoenig.de 上获得具体的站点 ID。它也有36位数字。必须在列表中输入此 ID。相应的名称是可选的。
![替代文字](../../../en/adapterref/iobroker.tankerkoenig/img/tankerkoenigSettingsScreenshot.jpg "截图设置")

### 写空
在断开连接的情况下，此选项可防止适配器存储旧值。它有助于生成更平滑的历史图表。

### 最小化日志
为了减少日志写入（例如在 SD 卡上），可以选择此选项。

## 激活
适配器作为守护程序运行（不是在计划模式下），并且每五分钟定期启动。 tankerkoenig.de 上的服务器仅每 4 分钟更新一次源源的数据，因此更频繁地查询数据是没有意义的，只会导致多余的数据流量和资源成本。可以随时设置更大的间隔。

＃＃  数据点
十个站点中的每个站点都有一个用于每种燃料类型（E5、E10 和柴油）的通道，而且每个站点都有另外四个数据点。

* `feed`（三位小数的价格；类型编号）
* `short`（两位小数的价格；输入字符串）
* `3rd`（在 VIS 中第三个小数不能写为上标）
* `combined`（准备使用带有上标第三位小数和信息的 HTML 格式价格，无论站点是否打开 [“关闭”/“未找到”] 都将显示在 VIS HTML 小部件中）

![替代文字](../../../en/adapterref/iobroker.tankerkoenig/img/tankerkoenigDP.jpg "数据点")

存储了另外三个数据点

* `status`（站打开/关闭）
* `name`（用户给定的电台名称）
* `station_id` （该站的Tankerkönig ID）

此外，还存储了每种 fule 类型的最便宜的电台

*`最便宜的.E5`
*`chepest.E10`
*`最便宜的柴油`

在这些频道中，存储了每种完整类型价格最低的电台。如果多个站点提供相同的最低价格，站点将按照配置中使用的顺序进行排序。

创建了 181 个数据点。

##可见
数据点“组合”可以轻松显示在此 VIS 小部件中

```
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```

数据点 `combined` 的值提供了一个 css 类。这些类是`station_open`、`station_closed`和`station_notfound`。通过在 VIS 中的 CSS 编辑器中定义 CSS，现在可以实现区分设计（如封闭站的红色字体颜色）。

```
.station_open {
    color: blue;
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

## 紧凑模式
此适配器已准备好用于 iobroker 的紧凑模式。

## Changelog
### 2.2.0 (2021-11-14)
* (simatec) Design Fix for Admin Dark/Blue Theme

### 2.1.1 (2021-06-22)
* (pix) New adapter category "vehicle" [#67](https://github.com/Pix---/ioBroker.tankerkoenig/issues/67)
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

Copyright (c) 2016-2021 pix

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