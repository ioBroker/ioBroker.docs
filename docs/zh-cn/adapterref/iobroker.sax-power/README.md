---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sax-power/README.md
title: ioBroker.sax-power
hash: BNO6C7bw4B8pUryMvGiSTz5IB0n4G9VZkGHBsQfoXxs=
---
# IoBroker.sax-power

![NPM 版本](https://img.shields.io/npm/v/iobroker.sax-power.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sax-power.svg)
![执照](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-brightgreen.svg)

[![测试和发布](https://github.com/GodHunter/ioBroker.sax-power/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/GodHunter/ioBroker.sax-power/actions/workflows/test-and-release.yml)

ioBroker 适配器，适用于 SAX Power 电池储能系统。

这款独立的社区适配器将 ioBroker 连接到 SAX Power 云平台，并提供实时测量数据、设备信息和历史能耗统计数据。它支持自动设备发现，并汇总所有检测到的存储系统的数据。

产品和制造商信息：[SAX Power GmbH](https://sax-power.net/)

> 本项目与 SAX Power GmbH 无任何关联，亦未获得其认可或维护。

＃＃ 特征
- SAX Power 云认证
- 自动发现分配给该帐户的所有存储系统
- 光伏发电量、家庭用电量、电网用电量、电池电量和充电状态的实时数值
- 今日、本周、本月、今年和全年的历史能源统计数据
- SAX 报告的循环次数，以及每个设备和整个安装过程的透明等效完整循环计算。
- 明确指定电池模型，包括标称容量和可用容量。
- 跨多个存储系统的汇总实时值和统计信息
- 基于 React 的响应式管理界面
- 已为未来的控制功能预留了可选的 Modbus 配置
- 为避免对 SAX Power 服务造成不必要的负载，最小支持的轮询间隔为 **60 秒**。
- 文档化的对象模型、API集成和统计处理

＃＃ 要求
- ioBroker 管理员版 **7.8.23 或更高版本**
- Node.js **22 或更高版本**
- 拥有 SAX Power 控制面板访问权限的 SAX Power 帐户

＃＃ 安装
通过 ioBroker 管理界面，从官方 ioBroker 存储库安装适配器。

＃＃ 配置
在ioBroker管理后台打开适配器配置，然后输入：

- SAX Power 控制面板电子邮件地址
- 对应的密码
- 轮询间隔
- 适用于所有自动检测到的存储系统的 SAX Power 型号

最小轮询间隔为**60 秒**。

SAX Power API 端点已内置于适配器中，无法在管理界面中更改。

密码通过 ioBroker 的 `encryptedNative` 配置机制存储，并通过 `protectedNative` 防止普通配置读取。当保存轮询间隔或电池型号等无关设置时，密码保持不变。

管理界面将云登录与适配器设置分开。存储系统无法手动添加：适配器会从 SAX Power 帐户中自动发现存储系统，并且只会询问匹配的型号。

## 实时仪表盘
管理界面显示以下各项的汇总实时卡片：

- 光伏发电
- 家庭消费
- 电网电力
- 电池供电
- 充电状态

该仪表盘仅读取ioBroker的状态，不会执行其他云端请求。

## 对象结构
适配器会为每个检测到的 SAX Power 存储系统创建单独的对象树。所有全局值都分组在 `summary` 下，因此不会与单个存储设备的值混淆。

典型结构：

```text
sax-power.0
├── info
├── devices
│   └── <device-id>
│       ├── info
│       ├── live
│       ├── battery
│       └── statistics
└── summary
    ├── battery
    └── statistics
        ├── info
        ├── day
        ├── week
        ├── month
        ├── year
        └── total
```

详细参考资料见：

- [对象参考](docs/OBJECTS.md)
- [字段参考](docs/FIELD_REFERENCE.md)
- [统计数据](docs/STATISTICS.md)
- [电池型号、循环次数和健康状况](docs/BATTERY.md)

＃＃ 统计数据
从 SAX Power 能源图表端点检索历史值，并将其映射到 ioBroker 状态。

支持的时期：

- 今天
- 星期
- 月
- 年
- 全部的

对于拥有多个存储系统的帐户，适配器还会计算汇总统计信息。

更多详情请参阅[docs/STATISTICS.md](docs/STATISTICS.md)。

等效完整循环使用文档中记录的公式 `(charged energy + discharged energy) / (2 × nominal capacity)`。电池健康状况通过五次合格放电运行的中位数进行明确估算，每次运行的 SOC 值至少覆盖 40 个百分点。有效运行、必需运行和被拒绝的运行，以及当前运行进度，在数据采集期间始终可见。积分方法、验收限值、持久性和已知精度限制均记录在 [文档/电池.md](docs/BATTERY.md) 中。

## Modbus
Modbus 配置是可选的，并且与 SAX Power 云连接无关。

1.0.x 版本不提供主动式 Modbus 控制功能。现有配置为后续版本提供了技术基础，无需更改只读云集成。

参见[docs/MODBUS.md](docs/MODBUS.md)。

## 文档
- [API 集成](docs/API.md)
- [架构](docs/ARCHITECTURE.md)
- [电池型号、循环次数和健康状况](docs/BATTERY.md)
- [品牌塑造和项目独立性](docs/BRANDING.md)
- [字段参考](docs/FIELD_REFERENCE.md)
- [Modbus](docs/MODBUS.md)
- [对象结构](docs/OBJECTS.md)
- [统计数据](docs/STATISTICS.md)

## 支持与反馈
请使用 GitHub Issues 提交错误报告和功能请求：

- [报告错误](https://github.com/GodHunter/ioBroker.sax-power/issues)
- [贡献](CONTRIBUTING.md)
- [安全策略](SECURITY.md)
- [行为准则](CODE_OF_CONDUCT.md)

来自操作多个 SAX Power 储能系统的用户的反馈尤其有价值，因为它有助于在实际条件下验证发现、聚合和多设备行为。

＃＃ 发展
安装依赖项：

```bash
npm ci
npm --prefix src-admin ci
```

运行完整的项目检查：

```bash
npm run check
```

运行历史测试：

```bash
npm run test:history
```

运行软件包验证：

```bash
npm run test:package
```

## Changelog

### 1.2.4 (2026-08-20)

- Removed direct GitHub installation guidance in favor of installation from the official ioBroker repository.
- Standardized the custom administration interface on English until full ioBroker i18n support is implemented.
- Added a safe upper bound of 2,147,483 seconds for the polling interval to prevent Node.js timer overflow.
- Replaced deprecated directional power roles with `value.power.consumed` and `value.power.produced`.
- Removed inactive Modbus configuration fields that had no runtime effect.
- Added regression tests for the repository inclusion requirements and polling interval boundaries.

### 1.2.3 (2026-08-11)

- Added the missing `info` channel required by the instance information states.
- Corrected the `devices` container from `channel` to `folder` so device objects have a valid ioBroker parent.
- Added regression tests for both object hierarchy requirements.
- Existing state IDs and values remain unchanged.


### 1.2.2 (2026-08-10)

- Limited the adapter news history to the seven entries supported by the ioBroker repository builder.
- Added mandatory release checks for version metadata, release notes and the README changelog.
- Kept adapter runtime behavior unchanged.

### 1.2.1 (2026-08-10)

- Removed the deprecated `common.title` metadata in favor of `common.titleLang`.
- Replaced the direct npm installation command with ioBroker Admin installation guidance.
- Kept adapter runtime behavior unchanged.

### 1.2.0 (2026-08-10)

- Added automatically assigned battery models with documented nominal and usable capacities.
- Added SAX-reported and adapter-calculated equivalent full cycles per device and for the complete system.
- Added persistent, transparent battery-health estimation from qualified discharge runs, including valid, required and rejected run counters.
- Added the separate `devices.<serial>.*` and `summary.*` object structures and automatic cleanup of obsolete root objects.
- Redesigned the administration interface and fixed password persistence when saving unrelated settings.
- Documented health formulas, validation rules, object paths, data sources and known limitations in `docs/BATTERY.md` and the object references.

### 1.1.2 (2026-08-05)

- Updated the public project identity and maintainer contact.
- Corrected the donation address shown in the administration interface.
- Aligned the Node.js 22 TypeScript dependency declaration with ioBroker repository requirements.


### 1.1.1 (2026-08-05)

- Added detailed SAX Power Cloud connection states and HTTP status reporting.
- Improved authentication error messages, including guidance to re-enter and save the password after upgrading from an older adapter version.
- Updated the React admin interface with clear connection, authentication, timeout, network and server status messages.
- Updated `@tsconfig/node22` to 22.0.5 and removed the remaining backend ESLint warning.

### 1.1.0 (2026-08-05)

- Update the TypeScript configuration from `@tsconfig/node20` to `@tsconfig/node22`
- Commit the compiled backend to support direct GitHub installations
- Remove the unsupported `common.noGit` property
- Optimize the build workflow so admin dependencies are installed only once per full check
- Clean up conflicting and malformed `.gitignore` rules
- Keep runtime behavior and the existing SAX Power functionality unchanged


### 1.0.1 (2026-08-04)

- Require Node.js 22 or newer
- Raise the required ioBroker Admin version
- Align package metadata with current ioBroker repository requirements
- Modernize GitHub Actions and Dependabot configuration
- Replace the deprecated Dependabot auto-merge action
- Configure npm dependency cooldown and include the separate admin project
- Correct encrypted and protected native password declarations
- Remove unused template translations and obsolete `jsonConfig.json`
- Mark generated build files correctly for GitHub installations
- Replace the plain API request timer with `AbortSignal.timeout()`
- Keep the existing React administration interface and runtime behavior unchanged

### 1.0.0 (2026-08-03)

- Initial public release
- Automatic discovery of SAX Power systems
- Live monitoring
- Historical energy statistics
- Aggregated values across multiple systems
- Responsive React-based admin interface
- Optional Modbus configuration
- Comprehensive project documentation

## License

Copyright (c) 2026 GodHunter godhunter@posteo.de

MIT License

See [LICENSE](LICENSE) for the complete license text.