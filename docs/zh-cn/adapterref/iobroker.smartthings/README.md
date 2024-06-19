---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartthings/README.md
title: ioBroker.smartthings
hash: Q47BVVpyPnZejeYC0pAFCqs/NiNWvj6Zwvwp8fmtZpE=
---
![标识](../../../en/adapterref/iobroker.smartthings/admin/smartthings.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.smartthings.svg)
![下载](https://img.shields.io/npm/dm/iobroker.smartthings.svg)
![安装数量](https://iobroker.live/badges/smartthings-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/smartthings-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.smartthings.svg)
![新平台](https://nodei.co/npm/iobroker.smartthings.png?downloads=true)

# IoBroker.smartthings
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.smartthings/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 smartthings 适配器
三星智能设备适配器

## 登录流程：
访问链接。https://account.smartthings.com/tokens 使用您的三星帐户登录，转到“个人访问令牌”页面。
点击“生成新令牌”按钮，转到“新访问令牌”页面。
为新令牌提供名称。在“授权范围”部分，选择您要为令牌授权的任何功能。
完成后，点击“生成令牌”按钮，您将返回到“个人访问令牌”页面。复制新生成的令牌并将其保存在安全的地方。这是您检索新生成的令牌值的唯一方法。

## 转向
smartthings.0.id.capabilities 设置为 true 或设置预定义值

## 讨论和问题：
https://forum.iobroker.net/topic/48091/test-adapter-samsung-smartthings-v-0-0-x

## Changelog
### 0.1.2 (2024-05-19)

- Update Dependencies

- 0.1.0 Added object excluding to reduce cpu usage

- 0.0.4 Reduced cpu load while writing states

- 0.0.3 (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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