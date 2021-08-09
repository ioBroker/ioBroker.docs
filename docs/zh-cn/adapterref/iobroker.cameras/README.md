---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cameras/README.md
title: ioBroker.cameras
hash: md4NOTpy9bBQKDCixUgrVhRjR4M6ZCwAR29la883rHo=
---
![商标](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.cameras.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![特拉维斯CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.cameras
## IoBroker 的 IP 摄像机适配器
您可以将您的网络/网络摄像机集成到可视化和其他可视化中。
如果您配置名称为 `cam1` 的摄像机，它将在 `http(s)://iobroker-IP:8082/cameras.0/cam1` 下的 Web 服务器上可用。

此外，您可以通过消息请求图像：

```
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90   // optional
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

结果始终采用 `jpg` 格式。

支持的相机：

### URL image 这是普通的 URL 请求，所有参数都在 URL 中。喜欢`http://mycam/snapshot.jpg`
### 带有基本身份验证的 URL 图像
这是图像的 URL 请求，其中所有参数都在 URL 中，但您可以提供用于基本身份验证的凭据。喜欢`http://mycam/snapshot.jpg`

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 0.1.4 (2021-07-13)
* (bluefox) Add role for states

### 0.1.3 (2020-08-08)
* (Hirsch-DE) Parameters were applied

### 0.1.2 (2020-06-03)
* (bluefox) implemented get image by message

### 0.1.0
* (bluefox) URL and URL with basic authentication were implemented

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2021 bluefox <dogafox@gmail.com>

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