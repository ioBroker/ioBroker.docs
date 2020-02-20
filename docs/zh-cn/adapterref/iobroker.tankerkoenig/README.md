---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: RshBHrBeH5FO+wSL8kiOLO+Pq/GL8aiJSnNkF9rALkk=
---
![商标](../../../en/adapterref/iobroker.tankerkoenig/admin/tankerkoenig.png)

![安装数量](http://iobroker.live/badges/tankerkoenig-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![开放式问题](http://githubbadges.herokuapp.com/Pix---/ioBroker.tankerkoenig/issues.svg)
![NPM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true)

＃ioBroker.tankerkoenig
：de：[Dokumentation](/docs/de/doc_tankerkoenig_de.md)

：英国：[文档](/docs/en/doc_tankerkoenig_en.md)

：ru：[Документация](/docs/en/doc_tankerkoenig_en.md)

：葡萄牙：[Documentação](/docs/en/doc_tankerkoenig_en.md)

：荷兰：[Documentatie](/docs/en/doc_tankerkoenig_en.md)

：fr：[文档](/docs/en/doc_tankerkoenig_en.md)

：它：[Documentazione](/docs/en/doc_tankerkoenig_en.md)

：es：[Documentación](/docs/en/doc_tankerkoenig_en.md)

：波兰：[Dokumentacja](/docs/en/doc_tankerkoenig_en.md)

：cn：[文档](/docs/en/doc_tankerkoenig_en.md)

##路线图
*未输入间隔时无法保存设置 - >
*状态HTML表
* VIS JSON表小部件的状态JSON表
*通过CSS类选择价格趋势
*捕获并显示tankerkoenig速率限制错误503
* ~~应在适配器重启后创建每个站的数据点，不仅在安装后~~

## Changelog

### 2.0.5 (2019-02-221)
* (jens-maus) fixes to prevent request() floodings

### 2.0.3 (2019-02-21)
* (pix) fixed issue with too short sync interval
* (pix) removed datoint 'price' which was created for debug only

### 2.0.1 (2019-02-20)
* (pix) fixed scrollbar issue in firefox

### 2.0.0 (2019-02-18)
* (pix) admin3 ready

### 1.3.1 (2019-02-05)
* (arteck, pix) request issues fixed

### 1.3.0 (2019-02-05)
* (pix) Compact mode added

### 1.2.1 (2018-11-25)
* (pix) fixed issue 'station_id' and 'status' mixed up

### 1.2.0 (2018-11-25)
* (pix) new datapoint station ID added

### 1.1.0 (2018-05-12)
* (bluefox) prices as number to allow logging were added

### 1.0.5 (2018-02-07)
* (pix) Log entry opt out

### 1.0.4 (2017-03-21)
* (pix) position of adapter.stop() optimized

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
* (pix) HTML Code in Datapoint "combined" corrected

### 0.0.3 (2016-06-01)
* (pix) Datapoint "combined" with CSS class for status

### 0.0.2 (2016-06-01)
* (pix) Datapoint "combined"

### 0.0.1 (2016-05-31)
* (pix) Adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2019 pix

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