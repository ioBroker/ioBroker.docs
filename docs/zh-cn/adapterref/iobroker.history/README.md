---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: PtdWXDfO7iyz5LSlWyu5E++pME8W7qWuproQAaoXRFc=
---
![标识](../../../en/adapterref/iobroker.history/admin/history.png)

![安装数量](http://iobroker.live/badges/history-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.history.svg)
![下载](https://img.shields.io/npm/dm/iobroker.history.svg)
![测试](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![新PM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![绿卫士徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

# IoBroker.history
此适配器在两个阶段的过程中保存状态历史。

＃＃ 配置
* [英文说明](docs/en/README.md)
* [deutsche Beschreibung](docs/de/README.md)

## 1.9.0 (2020-01-16)
* (foxriver76) 移除了对 adapter.objects 的使用
* __需要 js 控制器 >= 2.0.0__

### 1.8.7 (2019-09-02)
* (paul53) 旧文件应自动删除

### 1.8.6
* 修复若干小问题并优化部分文字

### 1.8.5 (2018-07-02)
* (Apollon77) storeState 中的错误已修复

### 1.8.4 (2018-06-24)
*（Apollon77）修复/允许禁用开始和结束值的写入

### 1.8.0 (2018-06-19/24)
* (Apollon77) 添加选项以将数据写入不同的 ID，以使设备更改更容易。检索数据适用于两个 ID

### 1.7.4 (2018-04-03)
* (AlCalzone) 修复带有特殊字符的状态的文件名处理

### 1.7.3 (2018-03-28)
* (Apollon77) 尊重数据点配置中保留的“永远保留”设置

### 1.7.2 (2018-02-05)
* (bondrogen) Admin3 修复

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3 修复

### 1.7.0 (2018-01-17)
* (bluefox) 为 Admin3 做好准备

### 1.6.6 (2017-12-20)
* (bluefox) 翻译

### 1.6.5 (2017-10-05)
* (Apollon77) 修复重新登录值功能

### 1.6.4 (2017-08-12)
* (bluefox) 添加“保存最后一个值”选项

### 1.6.3 (2017-08-03)
* (Apollon77) 修复日志间隔的行为以始终记录当前值

### 1.6.2 (2017-04-07)
* 修复数据类型转换

### 1.6.0 (2017-02-28)
* (Apollon77) 替换历史文件名中的一些字符

### 1.5.3 (2017-02-22)
* (Apollon77) 旧配置的小修复

### 1.5.2
* (Apollon77) 增强混合类型数据点的最小增量逻辑

### 1.5.1 (2017-01-16)
* (bluefox) 修复适配器配置和数据点配置中浮点值的处理。

### 1.5.0 (2016-12-01)
* (Apollon77) 添加消息 enableHistory/disableHistory
* (Apollon77) 仅当值与数字的最小值不同时才添加对日志更改的支持
* (Apollon77) 修复聚合计算

### 1.4.0 (2016-10-29)
* (Apollon77) 添加选项以重新记录未更改的值，以使其更易于可视化
* (Apollon77) 添加了将历史数据移动到数据库的转换器脚本

### 1.3.1 (2016-09-25)
* (Apollon77) 固定：ts 被分配为 val
* (bluefox) 修复历史对象的选择器

### 1.3.0 (2016-08-30)
* (bluefox) 仅与新管理员兼容

### 1.2.0 (2016-08-27)
* (bluefox) 将对象名称从历史更改为自定义

### 1.1.0 (2016-08-27)
* (bluefox) 修复最后一点的聚合
* (bluefox) 聚合 none 只提供原始数据而不进行任何聚合

### 1.0.5 (2016-07-24)
* (bluefox) 修复大间隔聚合

### 1.0.4 (2016-07-05)
* (bluefox) 修复聚合秒数

### 1.0.3 (2016-05-31)
* (bluefox) 如果忽略 null，则画线到末尾

### 1.0.2 (2016-05-29)
* (bluefox) 相互切换最大值和最小值

### 1.0.1 (2016-05-28)
* (bluefox) 也计算“on change”的结束/开始值

### 1.0.0 (2016-05-20)
* (bluefox) 更改默认聚合名称

### 0.4.1 (2016-05-14)
* (bluefox) 支持 sessionId

### 0.4.0 (2016-05-05)
* (bluefox) 使用来自 sql 适配器的聚合文件
* (bluefox) 修复退出时的值存储
* (bluefox) 每 5 分钟存储一次所有缓存数据
* (bluefox) 支持 ms

### 0.2.1 (2015-12-14)
* (bluefox) 添加设置说明
* (bluefox) 将聚合函数放在单独的文件中，以便与其他适配器共享
* (smiling-Jack) 添加生成Demo数据
*（微笑杰克）在自己的叉子中获取历史
* (bluefox) 添加 storeAck 标志
* (bluefox) onchange 模型

### 0.2.0 (2015-11-15)
* (Smiling_Jack) 在适配器中保存和加载，而不是在 js-controller 中
* (Smiling_Jack) 数据点聚合
* (Smiling_Jack) 支持存储路径

### 0.1.3 (2015-02-19)
* (bluefox) 修复历史上的小错误（感谢 Dschaedl）
* (bluefox) 更新管理页面

### 0.1.2 (2015-01-20)
* (bluefox) 通过配置启用保存和关闭按钮

### 0.1.1 (2015-01-10)
* (bluefox) 检查状态是否未被删除

### 0.1.0 (2015-01-02)
* (bluefox) 启用 npm 安装

### 0.0.8 (2014-12-25)
* (bluefox) 支持去抖动间隔

### 0.0.7 (2014-11-01)
* (bluefox) 存储每一个变化，而不仅仅是 lc != ts

### 0.0.6 (2014-10-19)
* (bluefox) 添加配置页面

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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