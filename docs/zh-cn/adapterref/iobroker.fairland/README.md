---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fairland/README.md
title: ioBroker Fairland适配器
hash: X2QwLc1+dUvRr56EPEdbbWE9NoapNldpVRKI+GskoR0=
---
# IoBroker Fairland适配器
适用于 Fairland **iGarden** 云 API 的 Fairland 泳池热泵和泳池泵的非官方 ioBroker 适配器。

制造商/产品信息：https://www.fairland.com.cn/

此适配器直接与 iGarden 云平台通信。它不使用涂鸦智能，也不支持通过 SmartPool 应用配对的 Fairland 设备。

## 支持的设备
- Fairland泳池热泵在iGarden平台上
- Fairland Inverflow Plus泳池水泵，适用于iGarden平台
- 例如，贴牌生产的iGarden设备，如Madimack泳池水泵

适配器当前识别的设备类别为`heatPump`和`waterPump`。

未知类别将被记录并跳过。

本项目与 Fairland、Home Assistant、ioBroker 或上游 ha-fairland 项目维护者没有任何关联、认可或支持关系。

＃＃ 安装
该适配器已发布在 npm 上，编号为 `iobroker.fairland`。

已向 ioBroker 官方适配器库提交审核申请。适配器添加到 ioBroker 官方库后，即可直接从 ioBroker 管理后台的适配器列表中安装。

＃＃ 要求
- Node.js 22 或更高版本
- ioBroker js-controller 6.0.11 或更高版本
- ioBroker 管理员 7.8.23 或更高版本

为了当地发展：

```bash
npm run build
```

其他开发命令：

```bash
npm run lint
npm run translate
npm run release
```

＃＃ 配置
实例配置包含：

- `iGarden 账户邮箱`：iGarden 应用中使用的账户名称
- `iGarden 密码`: 账户密码
- `登录国家/地区`：用于 iGarden 登录的可选国家/地区代码。留空

`Automatic` 如果您的帐户无需明确的国家代码即可工作。

- `扫描间隔`：轮询间隔（以秒为单位），最小 10 秒，最大

3600秒

- `庭院 ID`：可选，可从 iGarden 云端动态选择。 留

`Automatic` 使用云返回的第一个庭院。

- `创建原始 dpId 状态`：可选的诊断状态

`devices.<device>.raw.dp_<id>`

适配器会自动检测正确的区域 API 服务器：

- 欧盟：`api-eu.fairlandiot.com`
- 美国：`api-us.fairlandiot.com`
- CN: `api-cn.fairlandiot.com`
- 香港：`api-hk.fairlandiot.com`

## IGarden 的重要限制
iGarden云通常每个账户只允许一个活动会话。如果适配器已登录，iGarden移动应用可能会显示设备离线，反之亦然。

推荐的解决方法：创建第二个 iGarden 帐户，在 iGarden 应用中将设备共享给该帐户，并使用第二个帐户配置 ioBroker。

## 国家结构
设备创建如下：

```text
fairland.0.devices.<deviceId>
```

常见状态：

```text
info.name
info.category
info.version
power.switch
```

热泵系统包括：

```text
temperature.current
temperature.target
temperature.outlet
temperature.ambient
power.current
hvac.mode
hvac.presetMode
hvac.action
performance.runningPercentage
config.*
diagnostic.*
```

水泵状态包括：

```text
pump.speedSetpoint
pump.runningRate
pump.backwashDuration
pump.backwashCountdown
power.current
energy.consumption
pump.mode
```

可写状态会被映射回正确的 Fairland `dpId`。适配器会在写入操作后短时间内保持乐观值，因为 iGarden 云平台需要几秒钟才能将新写入的值报告回来。

## 开发说明
该实现是 Home Assistant Fairland/iGarden 集成逻辑的 TypeScript 移植版：

- 云登录和自动区域服务器检测
- 庭院和设备发现
- 特定类别的 `dpId` 映射
- 从 `dpProperty` 解析比例和单位
- 乐观写入处理

建造：

```bash
npm run build
```

编译后的适配器入口点为`build/main.js`。

## 归属
此适配器源自 @siedi 开发的采用 MIT 许可的 Home Assistant Fairland 集成：

```text
https://github.com/siedi/ha-fairland
```

原始项目许可通知保存在`LICENSE`中，其他第三方通知列于`THIRD_PARTY_NOTICES.md`中。

## Changelog

### 0.2.16

- Translated the new admin configuration help texts for repository checks.

### 0.2.15

- Replaced the Courtyard ID text field with a dynamic iGarden courtyard dropdown.

### 0.2.14

- Fixed the water pump energy consumption state role.
- Added a configurable iGarden login country dropdown without a Germany default.
- Rescheduled write refresh polling when it overlaps with an active poll.

### 0.2.13

- Removed the reserved `ioBroker` keyword from adapter metadata.

### 0.2.12

- Restored the required default iGarden login country and phone codes.
- Prefer authentication errors over later regional timeout errors during API region detection.

### 0.2.11

- Added an official Fairland manufacturer link to the README.
- Enforced the configured scan interval range in adapter code.
- Reworked polling to schedule the next run after the current run finishes.
- Reused the last detected API region as startup hint.
- Moved mode and running percentage states into grouped channels.
- Cleaned stale channel metadata from upgraded object structures.

### 0.2.10

- Removed unpublished version 0.2.8 from adapter news.
- Added an ioBroker deploy action marker for repository checks while keeping the fixed trusted publishing flow.

### 0.2.9

- Replaced the release deploy step to avoid the broken npm 12 global publish path.
- Kept npm trusted publishing with provenance enabled for release tags.

### 0.2.8

- Added standard ioBroker package and integration tests.
- Updated npm test scripts to run the standard `@iobroker/testing` checks.
- Completed Russian and Ukrainian `io-package.json` news translations.

### 0.2.7

- Fixed the generated ioBroker object hierarchy for device objects.
- Moved the writable power switch to `power.switch` so `power.current` can use a valid channel parent.
- Replaced invalid mode roles with valid ioBroker state roles.

### 0.2.6

- Removed discouraged manual installation instructions from the README.

### 0.2.5

- Updated installation documentation after npm publication.
- Documented the pending official ioBroker adapter repository approval.

### 0.2.4

- Optimized the adapter icon image size.

### 0.2.3

- Converted admin i18n files to the short ioBroker format.
- Added VS Code JSON schema settings for ioBroker development.
- Added the release script manual review plugin.

### 0.2.2

- Removed unpublished historical versions from `io-package.json` news.

### 0.2.1

- Skip the npm deploy job until npm publishing is explicitly enabled for the repository.

### 0.2.0

- Added Dependabot update configuration and Dependabot auto-merge workflow.
- Added Node.js 22 TypeScript base configuration.
- Raised the minimum ioBroker Admin requirement to 7.8.23.

### 0.1.8

- Updated TypeScript to 6.0.3.
- Adjusted the TypeScript configuration for TypeScript 6.
- Added `CHANGELOG_OLD.md` for older changelog entries.

### 0.1.7

- Aligned Node.js type definitions with the supported Node.js 22 runtime.

### 0.1.6

- Completed admin UI i18n files for all standard ioBroker languages.

### 0.1.5

- Added the standard GitHub Actions test and release workflow.
- Added ioBroker development tooling for linting, translations, and releases.
- Replaced plain timers with ioBroker adapter timers or native abort timeouts.
- Removed direct GitHub installation instructions for repository checks.

### 0.1.4

- Added an adapter icon.
- Completed `io-package.json` translations for repository checks.

### 0.1.3

- Raised the minimum Node.js version to 22.
- Added `@iobroker/testing` as a development dependency.
- Updated package keywords for ioBroker repository checks.

### 0.1.2

- Fixed `diagnostic.powerDisplayStatus` state type for boolean Fairland API values.

### 0.1.1

- Fixed ioBroker package schema for GitHub installation.
- Added upstream license attribution and third-party notices.

### 0.1.0

- Initial ioBroker port of the Fairland iGarden integration.

Older changelog entries may be moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT.

Copyright (c) 2026 dude2k.
Portions derived from ha-fairland: Copyright (c) 2025 @siedi.

See `LICENSE` for details.