---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.icloud/README.md
title: ioBroker.icloud
hash: l8oC8rjNxbGr9CsPxPxumhQy7MaRHMcBJFABlnmDLLY=
---
![标识](../../../en/adapterref/iobroker.icloud/admin/icloud.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.icloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.icloud.svg)
![安装数量](https://iobroker.live/badges/icloud-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/icloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.icloud.png?downloads=true)
![德国文献](https://img.shields.io/badge/Doku-Deutsch-green?logo=readme)
![英文文档](https://img.shields.io/badge/docs-English-blue?logo=readme)

# IoBroker.icloud
**测试：** ![测试与发布](https://github.com/ticaki/ioBroker.icloud/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 iCloud 适配器
此适配器将您的 Apple iCloud 帐户与 ioBroker 集成。它使您能够访问各种 Apple 服务——从设备位置和提醒事项到驱动器文件、联系人、备忘录、日历事件和您的照片图库——所有这些都是可读的，并且（在支持的情况下）可写，正如 ioBroker 所述或通过 `sendTo()`。

---

## 鸣谢
如果没有以下开源项目，这个适配器是不可能实现的：

- **[icloud.js](https://github.com/foxt/icloud.js)** by foxt — 此适配器源自并基于其构建的原始 JavaScript iCloud 客户端库。
- **[pyicloud](https://github.com/picklepete/pyicloud)** 由 picklepete 开发 — 是 Apple iCloud API 的 Python 参考实现，指导了许多服务集成。
- **[pyicloud (timlaing 分支)](https://github.com/timlaing/pyicloud)** 由 timlaing 维护 — pyicloud 的一个活跃维护的分支，作为现代提醒 (CloudKit v2) 和其他最新 API 细节的参考实现。

非常感谢所有为这些项目做出贡献的人！

## 免责声明
此适配器是一个独立的、由社区开发的开源项目。它与苹果公司**没有任何关联，也未获得苹果公司的认可或以任何方式与其官方联系。**

*iCloud*、*查找*、*Apple ID*、*iCloud 云盘* 以及所有其他 Apple 商标均为 Apple Inc. 的财产。所有产品名称、徽标和品牌均为其各自所有者的财产。使用这些名称仅用于识别目的。

该适配器使用与苹果客户端相同的 API 访问苹果的 iCloud 服务。使用这些 API 须遵守苹果的服务条款。使用此适配器即表示您同意遵守所有适用的苹果条款和条件。对于任何滥用适配器或违反苹果服务条款的行为，作者概不负责。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-06-28)
* (ticaki) **New: FIDO2 / security-key MFA** — sign in with a hardware security key (passkey) straight from the admin panel; the full sign-in ceremony runs in the background with a live, localized status (MFA panel translated into 11 languages)
* (ticaki) Admin: the security-key button now shows a live "running" state while the background ceremony is in progress
* (ticaki) fixed: object writes in `syncMap` now use read-merge-write (`getObject` + `setObject`) so existing ACLs and custom settings are preserved instead of being overwritten
* (ticaki) changed: internal waits (security-key polling, PCS consent, geocoder rate-throttle) now use the cancellable adapter timer, so pending timers are cleared cleanly when the adapter unloads
* (ticaki) changed: geocoder HTTP requests now use `AbortSignal.timeout` with improved timeout detection
* (ticaki) fixed: addressed ioBroker repochecker findings for the latest-repo listing

### 0.7.7 (2026-05-11)
- (ticaki) Extends an ioBroker object only when the provided partial object has actually changed

### 0.7.6 (2026-04-26)
* (ticaki) fixed: SMS 2FA verification mode is now always forced to `sms` — using `pushMode` from the trusted phone could cause authentication failures

### 0.7.5 (2026-04-23)
* (ticaki) changed: Removed unused keytar dependency and code.
* (ticaki) fixed: jsonConfig warnings / all repochecker error, warnings
* (ticaki) donate link

### 0.7.4 (2026-04-22)
* (ticaki) New: SMS MFA panel in the General admin tab — appears automatically below the login fields when the adapter requests MFA; lets you request an SMS code and submit the 6-digit code directly from the admin UI without touching ioBroker states; visibility is driven by an internal adapter variable (not the `mfa.required` state) so the panel only appears once the adapter is ready to accept the code

Older changes are listed in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ticaki <github@renopoint.de>

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