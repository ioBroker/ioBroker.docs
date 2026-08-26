---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: g8VrbNDoLmYPA1H3vfwazDDbJcw04EbwgBpnmQO0HsA=
---
![标识](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![下载](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![自最新版本发布以来的 GitHub 提交记录（按日期排序）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![GitHub 最新提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![NPM 版本](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/tractive-gps-stable.svg)
![安装数量](https://iobroker.live/badges/tractive-gps-installed.svg)

# IoBroker.tractive-gps
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>

**版本：**

## 免责声明
本项目中提及的所有产品和公司名称、标识和商标均属于其各自所有者。Tractive及其相关名称、标识和商标均为Tractive GmbH或其各自所有者的财产。其使用仅用于识别目的，并不暗示与Tractive GmbH或其关联公司存在任何关联、赞助或认可关系。本项目为私人非商业项目，仅供娱乐用途。

## 哨兵
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 有关禁用错误报告的更多详细信息和说明，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 描述
该适配器将 ioBroker 连接到 Tractive 账户，并使 ioBroker 能够提供宠物和 GPS 追踪器的当前信息。这样，位置、电池电量、连接状态、宠物信息以及支持的追踪器功能就可以用于自动化和可视化操作。

该适配器使用非官方的 Tractive 服务接口。需要拥有有效的 Tractive 帐户和有效的追踪器订阅。此社区适配器与 Tractive 无任何关联，也未获得 Tractive 的支持。

> [德国文献](README_DE.md)

＃＃ 要求
- Node.js 22.13 或更高版本
- js-controller 7.2.2 或更高版本
- 管理员版本 7.8.23 或更高版本
- 使用内置小部件时，需要 VIS 1 或 VIS 2 版本 2.12.8 或更高版本。
- 一个至少关联了一个跟踪器的 Tractive 帐户

＃＃ 特征
- 获取与该帐户关联的宠物的实际名称和详细信息。
- 提供当前 GPS 坐标、海拔、速度、位置精度、与配置的 ioBroker 位置的距离以及上次更新时间。
- （可选）将坐标解析为可读地址。
- 提供电池电量、充电状态、使用的位置源（`KNOWN_WIFI`/`GPS`）、在家/离家状态、在线状态和省电状态。
- 提供型号、固件、硬件版本、功能、性别、生日、身高、体重和其他可用信息。
- 当追踪器报告具备相应功能时，支持实时追踪、LED 和蜂鸣器命令。
- 将所有检索到的帐户、订阅、共享、宠物、跟踪器、位置和硬件数据存储为逻辑本地状态树和一个完整的 JSON 快照。
- 包括 VIS 1 和 VIS 2 的响应式卡片，带有宠物图像、交互式地图、范围显示、跟踪器状态和命令控制。
- 支持 Tractive 提供的图像或上传到 ioBroker 的自定义图像。
- 检测缺失或过时的跟踪器数据，而不会自动删除现有对象。

＃＃ 配置
打开适配器实例并配置以下设置：

| 设置 | 描述 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 电子邮件 | Tractive 账户的电子邮件地址。 |
| 密码 | Tractive 账户密码。它采用 ioBroker 的标准加密配置格式存储。 |
| 更新间隔 | 两次定期位置更新之间的时间间隔。可选值介于 2 分钟到 60 分钟之间。 |
| 将坐标解析为地址 | 请求当前坐标对应的可读地址。如果不需要地址，请禁用此选项。 |

使用“测试连接”功能验证输入的凭据。使用配置页面底部的 ioBroker“保存”按钮保存所有设置。

如果配置保存后密码字段留空，则密码保持不变。使用旧版 ioBroker 加密格式的现有密码将在下次保存配置时转换为当前的 AES 格式。

### 数据更新计划
- 位置信息会根据设定的更新间隔进行刷新。
- 电池和硬件信息每 15 分钟刷新一次。
- 宠物档案、图片和其他静态细节会在每日完全同步期间刷新。
- 适配器启动后还会执行完全同步。

Tractive 可能会暂时限制请求，并返回 HTTP 429 错误。适配器会间隔请求，并在收到此类限制时暂停所有请求，然后自动重试。成功更新将显示在 `info.lastSuccessfulSync` 和 `info.dataFresh` 中。

## 对象和状态
最重要的对象按以下方式分组：

```text
tractive-gps.0
├── info
│   ├── connection
│   ├── dataFresh
│   ├── lastSync
│   ├── lastSuccessfulSync
│   ├── currentApi
│   ├── refresh
│   └── status
├── account.*
├── subscriptions.<subscription-id>.*
├── pets.<pet-id>
│   ├── info.*
│   ├── activity.*
│   └── media.*
├── trackers.<tracker-id>
│   ├── info.*
│   ├── status.*
│   ├── location.*
│   ├── hardware.*
│   └── commands.*
```

### 适配器信息
- `info.connection`：指示上次同步是否成功。
- `info.dataFresh`：指示当前是否有可用数据。
- `info.lastSync`：上次同步尝试的时间。
- `info.lastSuccessfulSync`: 上次成功同步的时间。
- `info.refresh`：用于手动启动完整同步的按钮。
- `info.status`: 当前适配器状态。
- `info.currentApi`：当前可用的 Tractive 数据的完整 JSON 快照。

### 宠物
以下状态 `pets.<pet-id>.*` 包含有用的宠物档案信息、追踪器分配、活动目标和个人资料图片。空白字段和内部 API 字段已被省略。

### 追踪器
以下状态 `trackers.<tracker-id>.*` 包含跟踪器标识、运行和在线状态、位置、位置来源、与 ioBroker 系统位置的距离、地址、电池信息以及支持的命令。`location.sensorUsed` 包含 Tractive 位置来源。`status.home` 由 `KNOWN_WIFI` 或 `GPS` 派生而来。不存在重复的 `connectionType` 状态。ioBroker 的纬度和经度在系统设置中配置。

### 完整的 API 数据
只有对脚本、自动化和可视化有用的值才会被创建为单独的状态。空值、API 元数据、内部版本字段和重复表示形式将被省略。完整的未修改的组合响应将作为单个 JSON 值保留在 `info.currentApi` 中。登录密码和访问令牌永远不会添加到其中。

## Tracker 命令
以下可写状态仅在所选跟踪器支持时才会创建：

- `trackers.<tracker-id>.commands.liveTracking`
- `trackers.<tracker-id>.commands.led`
- `trackers.<tracker-id>.commands.buzzer`

将所需状态设置为`true`或`false`。Tractive接受命令后，状态即被确认。

## VIS 小部件
该适配器包含一个用于 VIS 1 的经典 `PetTrackerCard` 和一个用于 VIS 2 的原生 React `PetTrackerCard`。为每个宠物或追踪器添加一个组件，并在组件设置中分配请求的状态。

该卡片可以显示：

- 宠物名称、品种、性别、年龄和体重，
- 追踪器名称和在线状态，
- 从本地 `media.localProfilePictureUrl` 状态获取宠物图片，
- 交互式 Leaflet/OpenStreetMap 地图，
- 已报告或手动配置的位置半径，
- 电池电量、位置来源、在家/离家状态以及与 ioBroker 的距离，
- 最后更新时间、地址、省电状态、充电状态、速度、海拔和位置精度，
- 为支持的跟踪器提供蜂鸣器、LED 和实时跟踪的开关。

对于 Tractive 图片，请选择 `pets.<pet-id>.media.localProfilePictureUrl` 作为图片状态。它包含存储在本地 ioBroker 文件存储中的图片副本的 URL。如果未返回图片或图片无法加载，请在小部件的“外观”部分选择或上传自定义图片。

地图可以自动调整至完整的精度或范围圆。最小和最大缩放级别、交互方式、范围来源以及手动半径均可在控件中配置。显示地图时会从 OpenStreetMap 下载地图图块。

要使用命令开关，请在控件的“命令”部分中分配相应的 `trackers.<tracker-id>.commands.*` 状态。在编辑 VIS 视图时，命令将被禁用；在运行时模式下，命令将变为可用状态。

## 隐私和安全
- 密码采用 ioBroker 的加密配置机制进行存储。
- 访问令牌保存在内存中，并自动刷新。
- 选定的账户和订阅信息存储在逻辑对象树中。检索到的完整 API 数据存储在本地的 `info.currentApi` 中。请相应地保护对 ioBroker 对象树的访问。
- 密码和访问令牌永远不会添加到 API 状态树中，而是通过加密配置或内存进行保护。
- 精确位置信息存储在 ioBroker 状态中，因为这是适配器实现目标所必需的。
- 反向地理编码是可选的，启用后会将坐标发送到 Tractive 的地址服务。
- Sentry 错误报告遵循全局 ioBroker Sentry 配置。
- API 响应正文和完整的本地快照不会写入适配器日志，也不会显式提交给 Sentry。

## 故障排除
- **连接测试失败：** 请检查电子邮件地址、密码、互联网连接和出站 HTTPS 访问。
- **未显示宠物或追踪器：**请确认追踪器已分配给已配置的 Tractive 帐户，然后重新启动适配器实例。
- **数据未更新：** 请检查 `info.status`、`info.dataFresh` 和 `info.lastSuccessfulSync`。
- **报告 HTTP 429 错误：** 保持实例运行。适配器会在 Tractive 限制到期后暂停请求并自动重试。
- **未显示地址：** 请在适配器配置中启用反向地理编码。
- **缺少命令：**跟踪器未报告所需的功能。
- **缺少宠物图片：** 请将 `localProfilePictureUrl` 分配给小部件或选择自定义图片。

## 开发者文档
贡献者信息可在[开发者文档](docs/DEVELOPMENT.md)中找到。

## 鸣谢
最初由 [xXBJXx](https://github.com/xXBJXx) 创建，并由 ioBroker 社区适配器组织维护。

## Changelog
### 3.1.0 (2026-08-25)

- (xXBJXx) Addressed repository-checker findings for dependencies, metadata, documentation, and adapter-managed timers (#319).
- (xXBJXx) Added and correctly registered a classic VIS 1 pet tracker card alongside the native VIS 2 widget, including the pet image, Leaflet map, location and tracker details, automatic theme colors, and tracker command controls.

### 3.0.0 (2026-08-24)

- (xXBJXx) BREAKING: rewritten for Node.js 22, js-controller 7.2.2, and Admin 8.
- (xXBJXx) Configured Sentry through ioBroker's adapter integration (#4).
- (xXBJXx) Replaced stored authorization data with in-memory authentication, automatic token renewal, request validation, retry handling, and account-wide rate limiting (#16, #115, #213, #231).
- (xXBJXx) Added the `pets.*`, `trackers.*`, and health object structures.
- (xXBJXx) Fixed pet names and added all available pet profile states with corrected height and weight units.
- (xXBJXx) Fixed missing state definitions for API fields that were not known in advance (#81, #113, #305; supersedes #114 and #175).
- (xXBJXx) Replaced the duplicate API hierarchy with a curated account, subscription, pet, tracker, position, and hardware state tree while retaining the complete JSON snapshot.
- (xXBJXx) Restored `sensor_used` and distance-from-ioBroker information based on PR #3, added home/away information, and removed the duplicate `connectionType` state.
- (xXBJXx) Fixed Tractive CDN profile-picture URLs and added home/away status and distance to the VIS 2 card.
- (xXBJXx) Cached Tractive profile pictures in ioBroker so VIS 2 can display CDN files delivered as binary downloads.
- (xXBJXx) Fixed profile-picture storage by using a dedicated ioBroker `meta` file container.
- (xXBJXx) Added the local profile-picture URL, textual charging state, speed, and altitude to the curated states and VIS 2 card.
- (xXBJXx) Fixed recognition of relative ioBroker file URLs in `localProfilePictureUrl`.
- (xXBJXx) Added live tracking, LED, and buzzer commands for supported trackers.
- (xXBJXx) Added buzzer, LED, and live-tracking controls to the VIS 2 card.
- (xXBJXx) Reorganized the VIS 2 card into compact command, location, tracker, and pet sections.
- (xXBJXx) Updated the release tooling and added fixed-version Lerna support for the private npm workspaces.
- (xXBJXx) Rebuilt the adapter configuration for Admin 8 and removed the invalid jsonConfig configuration (#176).
- (xXBJXx) Added the VIS 2 `PetTrackerCard` widget with pet image, Leaflet/OpenStreetMap map, range display, and tracker information.
- (xXBJXx) Added support for Tractive profile images and custom ioBroker images.
- (xXBJXx) Added automatic light and dark theme colors to the VIS 2 widget.
- (xXBJXx) Added configurable map interaction, automatic range fitting, and minimum and maximum zoom.
- (xXBJXx) Switched password storage to ioBroker's server-side AES encryption and automatic migration of older passwords.
- (xXBJXx) Reduced recurring API traffic and added separate update intervals for positions, battery information, and static profile data.
- (xXBJXx) Added adaptive HTTP 429 handling, global request pauses, conservative retries, and cached address lookup.
- (xXBJXx) Migrated linting to ESLint 9 and `@iobroker/eslint-config` (#45).
- (xXBJXx) Added Node.js 24 to the CI test matrix (#116).
- (xXBJXx) Migrated automated npm releases to Trusted Publishing with GitHub OIDC (#169).
- (xXBJXx) Updated repository metadata and schema configuration, superseding maintenance PRs #214, #215, #216, and #291.
- (xXBJXx) Updated dependencies and workspace tooling, superseding PRs #91, #140, #147, #203, #211, #220, #256, #281, #298, #301, and #303.
- (xXBJXx) Updated tests, documentation, and privacy safeguards.

### 2.1.0 (2024-11-12)

- (mcm1957) Adapter requires Node.js 20 now.
- (mcm1957) Adapter requires js-controller 5.0.19 and Admin 6.17.14 now.
- (simatec) Adapter changed to meet responsive design rules.
- (mcm1957) Corrected an error in the jsonConfig reauthorization command.
- (mcm1957) Dependencies have been updated.

### 2.0.1 (2024-08-20)

- (bluefox) Fixed encryption of the access token.

### 2.0.0 (2024-08-18)

- (bluefox) BREAKING: credentials must be entered again.
- (bluefox) Removed old code and rewrote the GUI.
- (bluefox) Updated dependencies.

Earlier changes are documented in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

Copyright (c) 2023-2026 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

MIT License. See [LICENSE](LICENSE).