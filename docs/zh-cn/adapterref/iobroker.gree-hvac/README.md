---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gree-hvac/README.md
title: iobroker.gree-hvac
hash: nbnCeatkP5YX4f21mweyh2a/mosv3Qal1E5BFx02vvI=
---
![标识](../../../en/adapterref/iobroker.gree-hvac/admin/air-conditioner.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.gree-hvac.svg)
![下载](https://img.shields.io/npm/dm/iobroker.gree-hvac.svg)
![安装数量](https://iobroker.live/badges/template-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/gree-hvac-stable.svg)

# Iobroker.gree-hvac
**测试：**[![测试与发布]（https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml/badge.svg）](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml)

格力和 C&H 空调适配器

## 支持的设备
所有可以通过EWPE Smart应用程序控制的设备都应受支持，包括：

- 格力智能系列
- Cooper&Hunter：Supreme、Vip Inverter、ICY II、Arctic、Alpha、Alpha NG、Veritas、Veritas NG 系列
- EcoAir X 系列
- 气候专业展会

**请注意，如果没有互联网接入，新空调（可能还有旧空调）将无法工作。它们会停止响应适配器请求。**

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

致谢
- [tomikaa87](https://github.com/tomikaa87) 用于对 Gree 协议进行逆向工程
- [stas-demydiuk](https://github.com/stas-demydiuk) 获取 DeviceManager 代码
- Sizenko Alexander 为 Digital-7 字体
- [con1nuity] 添加 AES-GCM 加密

## Changelog
### 1.1.2 (2024-10-16)
 - Updated dependencies
 - Adjusted admin layout
### 1.1.0 (2024-08-13)
 - Added the AES-GCM encryption which is needed for some devices with newer firmware versions (e.g. gree model 32776, v1.23)
### 1.0.7 (2024-07-03)
 - Host Google icons locally. Updated dependencies.
### 1.0.6 (2024-06-14)
 - Added button titles and translation.
### 1.0.5 (2024-06-12)
 - Added time field.
### 1.0.4 (2024-06-12)
 - Code optimization. Bug fixes.
### 1.0.3 (2024-06-12)
 - Added refresh devices button on tab page.

## License
MIT License

Copyright (c) 2024 Serhiy Krasovskyy xhunter74@gmail.com

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