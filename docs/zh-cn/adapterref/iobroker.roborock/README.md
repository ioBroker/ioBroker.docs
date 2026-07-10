---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roborock/README.md
title: ioBroker.roborock
hash: 9hqz/v5MCibz9LgvvbHfm2zM5NgZ7eOibBdC9MTozj8=
---
![标识](../../../en/adapterref/iobroker.roborock/admin/roborock.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.roborock.svg)
![下载](https://img.shields.io/npm/dm/iobroker.roborock.svg)
![安装数量](https://iobroker.live/badges/roborock-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/roborock-stable.svg)
![NPM](https://nodei.co/npm/iobroker.roborock.png?downloads=true)

# IoBroker.roborock
**测试：** ![测试与发布](https://github.com/copystring/ioBroker.roborock/workflows/Test%20and%20Release/badge.svg)

**翻译：** [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/roborock/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Roborock ioBroker 适配器
通过此适配器，您可以控制、获取状态、清洁历史记录并查看已在 Roborock 应用程序中设置的 Roborock 吸尘器的地图。

- [要求](#requirements)
- [支持的机器人](#supported-robots)
- [区域清洁](#zone-cleaning)
- [更新日志](#changelog)
- [许可证](#license)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 要求
- Node.js 版本 >= 22.0.0
- ioBroker.admin >= 7.6.17
- ioBroker.js-controller >= 6.0.11

支持的机器人
- **S系列：** S4、S4 Max、S5 Max、S6、S6 Pure、S6 MaxV、S7、S7 MaxV（Pro/Ultra）、S7 Pro Ultra、S7 Max Ultra、S8、S8+、S8 Pro Ultra、S8 MaxV Ultra
- **Q系列：** Q5 Pro、Q7、Q7 Max、Q7 L5、Q8 Max
- **Q Revo：** Q Revo、Q Revo Pro
- **Qrevo：** Qrevo Slim、Qrevo S、Qrevo Curve、Qrevo Curv 系列、Qrevo Edge、Qrevo Edge 系列、Qrevo L、Qrevo Master、Qrevo MaxV
- **Saros：** Saros 10、Saros 10R、Saros 20 / Saros 20X、Saros Z70

区域清洁
此功能仅在适配器选项中启用地图创建时有效。在 ioBroker 管理界面中，从适配器的 Web UI 选项卡打开地图；无需手动输入 URL。

### 树莓派上无法创建地图
- 画出您的清洁区域。Roborock 最多可同时支持 4 个清洁区域。

 ![](https://github.com/copystring/ioBroker.roborock/blob/main/images/Rockrock_zone_cleaning.gif)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.4 (2026-06-07)

* (copystring) Documented tested Roborock S8+ support.
* (copystring) Fixed consumable percentage values for devices where Roborock reports maintenance data via HomeData.
* (copystring) Re-enabled macOS support and added macOS test coverage.
* (copystring) Improved dependency update automation so updates are checked weekly and merged only after successful checks.
* (copystring) Updated `p-queue` to 9.3.0 and `protobufjs` to 8.5.0.
* (copystring) Improved CI performance for Linux, macOS and Windows adapter tests without reducing test coverage.

### 0.7.3 (2026-05-22)

* (copystring) Fixed V1 auto-empty dust collection to use the AppPlugin-verified `app_start_collect_dust` command.

### 0.7.2 (2026-05-20)

* (copystring) Fixed missing auto-empty command for Roborock Qrevo MaxV (#1272).
* (copystring) Fixed local endpoint refresh after temporary MQTT outages so stale local IP recovery retries immediately again.
* (copystring) Require bug reports to upload a `.txt` debug log file.

### 0.7.1 (2026-05-19)

* (copystring) Fixed local TCP recovery when a Roborock device gets a new LAN IP address.
* (copystring) Updated dependencies: `@napi-rs/canvas` to 1.0.0, `protobufjs` to 8.2.0 and `zod` to 4.4.3.
* (copystring) Resolved npm audit security advisories in transitive dependencies and documented the temporary dependency overrides.

### 0.7.0 (2026-05-04)

* (copystring) Added support for Roborock Q10, including map handling for this model.
* (copystring) Added support for Roborock Saros Z70.
* (copystring) Improved local connections for newer Roborock models so reconnects, keepalive checks and map transfers are more reliable.
* (copystring) Fixed empty images in `mapBase64` and `mapBase64Truncated`.

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 copystring <copystring@gmail.com>

See [LICENSE](LICENSE) for the full license text.