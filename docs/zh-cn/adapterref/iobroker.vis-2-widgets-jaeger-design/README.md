---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md
title: ioBroker.vis 2.0 的材料小部件
hash: //Q4E7vgLGJl6O1SWB6NV8Tg1l7EjWwvhnPz4IN34tY=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-jaeger-design.png?downloads=true)

# IoBroker.vis 2.0 的材料小部件
## 小工具
### 按钮和开关
### 真实消息
![实际新闻](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/news.png)

要使用此小部件，您需要在 Javascript 适配器中创建一个小脚本：

```
const axios = require('axios');

function readRss() {
    axios('https://www.n-tv.de/rss')
        .then(resp => setState('javascript.0.rss', resp.data.toString(), true));
}

createState('javascript.0.rss', {type: 'string'}, () => {
    setInterval(() => readRss(), 60000 * 60 * 2); // update rss every 2 hours
    readRss();
});
```

然后在此小部件中使用 `javascript.0.rss` 对象。

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 0.4.3 (2023-06-07)
* (bluefox) Corrected visualization of view

### 0.4.0 (2023-05-31)
* (bluefox) Added exclusions
* (bluefox) Added possibility to show information on the very top of layout

### 0.3.2 (2023-04-05)
* (bluefox) Corrected license problem

### 0.3.1 (2023-03-22)
* (bluefox) Corrected build process

### 0.3.0 (2023-03-21)
* (bluefox) Implemented dark mode

### 0.2.3 (2023-03-09)
* (bluefox) update packages

### 0.2.2 (2023-03-06)
* (bluefox) Updated thermostat widget

### 0.2.1 (2023-02-03)
* (bluefox) Mobile views tuned

### 0.2.0 (2023-02-01)
* (bluefox) implemented mobile view

### 0.1.3 (2023-01-30)
* (bluefox) initial commit

## License
Copyright (c) 2022-2023 bluefox <dogafox@gmail.com>
All rights reserved.