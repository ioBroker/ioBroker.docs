---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: 4iqN3AF7oKF/D1R7sZG4oIHpqApYO7HiS2XzbVmJ5oQ=
---
![标识](https://github.com/ylabonte/ioBroker.procon-ip/blob/master/admin/procon-ip.png?raw=true)

![安装数量](http://iobroker.live/badges/procon-ip-installed.svg)
![当前稳定版本](http://iobroker.live/badges/procon-ip-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![已知漏洞](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![下载](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)

# IoBroker.procon-ip
[![测试和发布](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

适用于 Pool Digital ProCon.IP 游泳池控制器的 ioBroker 适配器。

它旨在与您的 ioBroker 家庭自动化系统集成，例如：

构建涉及其他设备的逻辑，或与您喜爱的语音助手配对：

- 您可以使用 [_cloud_](https://github.com/ioBroker/ioBroker.cloud) 或

[物联网](https://github.com/ioBroker/ioBroker.iot) Alexa（以及我认为也适用于 Google Home）的适配器

- [_yahka_](https://github.com/jensweigele/ioBroker.yahka) 适配器作为桥接器

可通过 Siri 或 Apple HomeKit 进行访问

- 使用 [_javascript_](https://github.com/ioBroker/ioBroker.javascript)

用于构建自定义逻辑的适配器。

有关更多信息，请参阅 [维基百科](https://github.com/ylabonte/ioBroker.procon-ip/wiki)。

## 什么是 ProCon.IP 池控制器？
ProCon.IP泳池控制器是一款低成本的家用泳池网络连接控制单元。它利用软件控制的继电器，可以控制多个水泵（用于泳池过滤和各种加药），控制方式既可以按照预设时间表进行，也可以根据其众多测量输入通道（例如I/O流量传感器、Dallas 1-Wire温度计、氧化还原电极和pH电极）的读数/数值进行控制。此外，它还支持按需控制这些继电器，因此也可用于控制灯光（或其他任何设备）的开关。

并非所有功能都可通过API访问。实际上，目前只有一个API用于读取（轮询）CSV格式的值（`/GetState.csv`）。我记得还有一个API用于控制继电器的开关以及定时开关。但我现在找不到第二个API了。所以，虽然界面不够美观，但功能齐全：ProCon.IP有两个原生Web界面，可以通过分析这些界面来逆向工程实现某些功能（例如控制继电器）。

更多信息请参见以下链接（抱歉，目前只有德语版本；尚未找到英文文档/信息）：

- [pooldigital.de 网上商店](https://pooldigital.de/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
- [pooldigital.de 论坛](https://www.poolsteuerung.de/)

**澄清一下：我与泳池控制单元的开发、销售、市场推广或技术支持没有任何关系。我只是开发了一个解决方案，将它与ioBroker集成，让我父母的家更智能一些。**

## 适配器详情
该适配器使用 ProCon.IP 的 `/GetState.csv` API 来轮询其值，并使用另一个未公开的 API，该 API 通过位操作命令来切换继电器。ProCon.IP 的原始 Web 界面也使用了第二个 API。因此，未来的固件升级可能会破坏与该适配器的兼容性，或者至少会影响其切换继电器的功能。

＃＃＃ 兼容性
目前，该适配器已与 ProCon.IP 固件 **版本 1.7.6.a** 配合测试和开发。但它应该也适用于任何先前更新或即将发布的固件版本。

## 发展与参与
如果您希望参与此适配器的开发、翻译或文档编写，请随时与我联系。

与此方法相关的有用链接将是

- [TypeScript 适配器模板](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

我从……开始

- [适配器开发人员指南](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md)。

### 使用开发服务器进行本地测试
要针对真实的 ProCon.IP 控制器进行实际测试，请使用 [`@iobroker/dev-server`](https://github.com/ioBroker/dev-server)。它会启动一个临时的本地 ioBroker 实例（js 控制器 + 管理 UI），并从您的本地构建运行此适配器：

```bash
npm i -g @iobroker/dev-server   # once, globally
npm run dev:setup               # creates the local .dev-server/ profile (git-ignored)
npm run dev                     # builds, runs, admin UI at http://localhost:8081
```

在管理界面中使用控制器 URL 配置实例。`npm run dev` 会在源代码更改时重建并重新加载适配器。

捐赠
如果您想支持此适配器或表示感谢，您可以：

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="请我喝杯咖啡" style="height: 40px !important;width: 144px !important;" >](https://www.buymeacoffee.com/ylabonte)

## Changelog
### 1.9.0 (2026-08-23)

- **DMX512 lighting support (opt-in).** Enable "DMX512 channels" in the adapter settings to expose the controller's 16 DMX channels as writable 0–255 dimmer states (`dmx.CH01` … `dmx.CH16`).
- **Self-healing object definitions.** Objects are now updated on upgrade (via `extendObject`, versioned), so improved roles/types reach existing installations — while your custom object names are preserved.
- **Fewer redundant events.** State values are written only when they actually change, and relay/dosage/timer commands are acknowledged immediately once the controller confirms them.
- Subscriptions are narrowed to the writable command states, and the boolean status flags now use the `indicator` role.
- Large internal refactor for testability: the monolithic adapter was split into a thin shell plus focused, unit-tested modules with a CI coverage gate. No functional change from this part.

### 1.8.1 (2026-08-22)

- **Fixed relay and DMX switching**, which had silently stopped working since 1.8.0's move to the ProCon.IP 2.x library: the controller accepted a write with `200 OK` but ignored it. Updated the library to 2.1.1, which sends the exact HTTP request format the controller's firmware requires. Reads were never affected.
- Resilient startup: the adapter now comes up and keeps polling until the controller becomes reachable, instead of staying inactive when the controller was offline at boot time.
- Fixed a corner case in the forced-update handling that could keep a relay flagged for updates.
- Aligned the admin configuration defaults with the adapter's effective runtime defaults and fixed a help-text typo.
- Maintenance: fixed the unit-test runner so tests actually execute, trimmed the CI test matrix, bumped CI actions (checkout/codeql), and pinned `@types/node` to the supported Node baseline.

### 1.8.0 (2026-08-22)

- Raised the minimum Node.js version to 22 (Node 20 is end-of-life).
- Updated the ProCon.IP library to 2.x, replacing its axios HTTP client with a leaner implementation and typed error handling.
- Updated all dependencies and shrank the security-advisory backlog.
- Internal cleanup: migrated off the deprecated `setStateAsync` API to `setState`.
- Maintenance: adopted npm Trusted Publishing (OIDC), modernized the CI workflow, grouped Dependabot updates, and applied the latest ioBroker repository-checker fixes.

### 1.7.0 (2025-09-20)

- Satisfy latest requirements demanded by the ioBroker-Bot.
- Raise minimum required js-controller version to 7.0.7.
- Raise minimum required admin version to 7.6.17.
- Remove calls to deprecated methods.
- Minor code cleanup.
- Dependency updates.

### 1.6.0 (2024-09-08)

- Fix versioning according to prior changes in requirements (should have happened with v1.5.5).
    - Raise minimum required js-controller version to 5.0.19.
    - Raise minimum required node version to 20.
- Dependency updates.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2019-2026 Yannic Labonte <yannic.labonte@gmail.com>