---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tedee/README.md
title: ioBroker.tedee
hash: QIl9g1Oofm6MEZ/uxLhspd4PZDpqRB1eWB6V8eyd6K0=
---
![标识](../../../en/adapterref/iobroker.tedee/admin/tedee.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.tedee.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tedee.svg)
![安装数量](https://iobroker.live/badges/tedee-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/tedee-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.tedee.png?downloads=true)

# IoBroker.tedee
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.tedee/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## IoBroker 的 tedee 适配器
Tedee 锁适配器

该适配器使用本地桥API来控制tedee锁

支持 Tedee 的所有 Lock 设备。

1. 在您的用户个人资料中激活 Beta 测试
2. 在桥设置中启用 API
3.复制实例设置中的IP和token

![标识](../../../en/adapterref/iobroker.tedee/admin/tedee_api.png)

适配器通过 webhooks 立即接收所有状态更新。设置中的间隔只是连续刷新的备份。

锁的当前状态：tedee.0.id.state

- 0 未校准
- 1 校准
- 2 个已解锁
- 3 半锁
- 4 次解锁
- 5 个锁定
- 6 锁定
- 7 拉动
- 8 拉动
- 9 未知
- 18 更新中

＃＃ 用法
您可以通过tedee.0.id.remote控制tedee锁

- 锁定锁定/解锁
- 拉到拉
- 解锁解锁

解锁模式：

- 0 -（或无参数设置）- 正常。从关闭位置：仅解锁或通过自动拉动解锁（如果启用）。从开放位置来看：什么都没有。
- 2 - 力。用力移动，直到锁遇到阻力。
- 3 - 无拉力。从关闭位置：仅解锁，无需自动拉动。从开放位置来看：什么都没有。
- 4 - 解锁或拉动。从关闭位置：仅解锁或通过自动拉动解锁（如果启用）。从打开位置：拉动。

## 免责声明
Tedee 是 tedee 的商标。我不以任何方式获得 tedee 或任何相关子公司、徽标或商标的认可或附属

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.3.0 (2023-12-16)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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