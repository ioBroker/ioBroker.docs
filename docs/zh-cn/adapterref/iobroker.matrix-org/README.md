---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.matrix-org/README.md
title: ioBroker.matrix-org
hash: GZR4bzUQOeknIhKMSjDEg1JPvz/1REXq4jJPMWMgKYs=
---
![标识](../../../en/adapterref/iobroker.matrix-org/admin/matrix-logo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.matrix-org.svg)
![下载](https://img.shields.io/npm/dm/iobroker.matrix-org.svg)
![安装数量](https://iobroker.live/badges/matrix-org-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/matrix-org-stable.svg)
![NPM](https://nodei.co/npm/iobroker.matrix-org.png?downloads=true)

# IoBroker.matrix-org
**测试：** ![测试和发布](https://github.com/oelison/ioBroker.matrix-org/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的矩阵组织适配器
矩阵推送消息的适配器非常感谢创建矩阵（https://matrix.org/）创建一个完整的免费通信基础

＃＃＃ 配置
最佳：在您的服务器上运行您自己的客户端！

使用密码创建自己的用户作为您的 BOT。为所有需要机器人消息的成员创建一个房间。将您的 BOT 添加到此房间。将所有成员添加到此房间。将所有数据放入配置中。 (BOT名称、密码、房间名称)

＃＃＃ 用法
根据需要添加任意数量的实例。按照你喜欢的方式为matrix-org.0.sendMessage添加一个值，用js 如果你设置“image”为matrix.0.sendMessage，它会发送矩阵标志到你的频道。
或者在 js 中使用：

```
sendTo("matrix-org.0", "Hello World!");
```

或者使用 Sendto 中的块状符号。

对于来自本地文件系统 (Linux) 的图像：

```
sendTo("matrix-org.0",{file: "file:///tmp/images/test.png"});
```

对于来自本地文件系统 (Windows) 的图像：

``` 
sendTo("matrix-org.0",{file: "file:///C:/tmp/images/test.png"});
```

图片供参考：

```
sendTo("matrix-org.0",{file: "https://www.abcd/images/test.png"});
```

对于 base64 中的图像：

```
sendTo("matrix-org.0",{file:{type:"image/png",base64:"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"}});
```

或者

```
sendTo("matrix-org.0",{file:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"});
```

对于 html，请遵循此规范：https://spec.matrix.org/v1.3/client-server-api/#mroommessage-msgtypes 例如：

```
sendTo("matrix-org.0",{html: "<h1>Hello World!</h1>", text: "Hello World!"});
```

或者

```
sendTo("matrix-org.0",{html: "<table><tr><td>1</td><td>2</td></tr><tr><td>a</td><td>b</td></tr><table>", text: "Your client can not show html!"});
```

如果您的客户无法解码 html，您将获得文本。
如果您的客户端不支持表格，它要么显示文本，要么只显示 12ab。

### 测试你的配置使用 sendMessage
只需打开对象并更改一个 matrix-org 实例的字符串 大多数端口是 443，如果你有一个像 matrix.org 这样的公共系统 端口有时是 8448，当你有一个没有代理的自托管系统时，但是你知道它。

如果您想测试它： 服务器：matrix.org 端口：443 房间：#test-ioBroker-adapter:matrix.org 加入这个房间并使用您自己的凭据进行尝试

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2023-04-01)
* upgrade matrix-js-sdk (node 18 needed)

### 0.1.6 (2023-04-01)
* last version for node 16
* updated libs according dependabot accept matrix-js-sdk

### 0.1.5 (2023-03-02)
* downgrade for node 16
* translation for configuration

### 0.1.4 (2023-02-04)
* update of dependencies
* small readme improvement

### 0.1.3 (2022-11-03)
* updates of dependencies

### 0.1.2 (2022-08-12)
* base64 with html format added again
* html messages added

### 0.1.1 (2022-08-08)
* bugfix local file system was not working
* bugfix base64 was not working
* unit test added

### 0.1.0 (2022-08-05)
* sending files added
* sending from url and base64 encoded data
* image ans video mime types are send as image and video all others as file

### 0.0.7 (2022-07-24)
* removed all axios request
* replaced with matrix-js-sdk calls
* no logoff during the whole time
* test with servers with access token expiery need to be done
* sync added
* receive message added (please check on update and not on change to react on the same message)

### 0.0.6 (2022-07-10)
* repeat false set for stable admin v5.3.8
* Readme with example improved (how to chose port 443 or 8448)
* some more debug output on errors

### 0.0.5 (2022-07-08)
* sendMessage stay in for fast config testing
* index_m.html and files from admin/build removed
* password encryption and protection enabled
* password field now as type password
* detection of missing config give an error log
* detection of unread room data give an error log
* encodeURI() used where possible
* catching termination during await for avoid errors when writing on ioBroker database
* adding matrix to blockly symbol

### 0.0.4 (2022-07-02)
* blockly added
* onMessage method added

### 0.0.3 (2022-06-26)
* Invalid workflow line 54 in test-and-release.yml (leading space removed)

### 0.0.2 (2022-06-26)
* (oelison) message sending by setting object sendMessage implemented
* (oelison) most "try/catch" done
* (oelison) Readme completed.

### 0.0.1 (2022-06-26)
* (oelison) initial release

## License
MIT License

Copyright (c) 2023 Christian Oelschlegel <iobrokermatrix@sciphy.de>

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