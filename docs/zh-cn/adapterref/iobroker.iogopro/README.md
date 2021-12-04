---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iogopro/README.md
title: ioBroker.iogopro
hash: PLPDqGY4SCLSFRMMIZKWZJwVEk3Fx86a5KTvwek6Arg=
---
![标识](../../../en/adapterref/iobroker.iogopro/admin/iogopro.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.iogopro.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iogopro.svg)
![安装数量（最新）](https://iobroker.live/badges/iogopro-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/iogopro-stable.svg)
![依赖状态](https://img.shields.io/david/nisiode/iobroker.iogopro.svg)
![新产品管理](https://nodei.co/npm/iobroker.iogopro.png?downloads=true)

# IoBroker.iogopro
**测试：** ![测试和发布](https://github.com/nisiode/ioBroker.iogopro/workflows/Test%20and%20Release/badge.svg)

## Iogopro ioBroker 适配器
此适配器将 ioBroker 连接到移动应用 ioGo PRO https://play.google.com/store/apps/details?id=de.nisnagel.iogopro。
请访问 www.iogo.app 了解更多关于入门的信息。

＃＃ 配置
您需要此适配器的有效 api-secret，您可以在 ioGO-PRO 应用程序中生成该信息。

＃＃ 状态
所有状态都基于角色和通过直观图标显示的当前值。
此处提供了所有可用映射图标的列表：[图标.png](https://github.com/nisiode/ioBroker.iogopro/blob/342d92454401fdf93f6ebae0e6a12ccef68ee1b5/img/icons.png)

＃＃ 用法
您可以通过 messageBox `sendTo('iogo', 'New message')` 或特定用户 `sendTo('iogo', {user: 'Username', text: 'Test message'})` 向所有经过身份验证的用户发送消息。
用户必须在创建之前（请阅读应用程序文档以获取更多详细信息）。

可以指定多个收件人（只需用逗号分隔用户名）。例如：收件人：“User1,User4,User5”

示例如何使用 javascript 发送通知自定义消息：

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

和一个块状的例子：

![块状](../../../en/adapterref/iobroker.iogopro/img/blockly.png)

还支持回调：

```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

只需将路径发送到您的图像而不是文本或使用 url 属性 `sendTo('iogo.0', 'absolute/path/file.png')`

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

**可能的选择**：

- `user`：单个用户或用户列表
- `text`：消息本身
- `title`：通知的标题
- `url`：图像的绝对路径
- `expiry`：以秒为单位的过期时间

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.5 (2021-10-27)
* (nis) Automatisches Löschen von Locations

### 0.2.4 (2021-10-18)
* (nis) simplify admin ui for blocked enums

### 0.2.2 (2021-10-04)
* (nis) change sync of enum member changes

### 0.2.1 (2021-09-21)
* (nis) bugfix blocked enums

### 0.2.0 (2021-09-21)
* (nis) sync states only when value has changed
* (nis) added list of blocked enums to instance config

### 0.1.0 (2021-09-12)
* (nis) migrate current state from ioBroker.iogo

### 0.0.1 (2021-08-29)
* (nis) initial release

## License
MIT License

Copyright (c) 2021 nis <info@iogo.app>

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