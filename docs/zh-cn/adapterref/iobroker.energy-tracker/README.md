---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.energy-tracker/README.md
title: ioBroker.能源追踪器
hash: n55Qf5xNASOOJMjfcnMUc0QoYCHIL7D+SDwykDxQuF4=
---
![标识](../../../en/adapterref/iobroker.energy-tracker/admin/energy-tracker.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.energy-tracker.svg)
![下载](https://img.shields.io/npm/dm/iobroker.energy-tracker.svg)
![安装](https://iobroker.live/badges/energy-tracker-installed.svg)
![稳定版本](https://iobroker.live/badges/energy-tracker-stable.svg)

# IoBroker.energy-tracker
用于将电表读数发送到 Energy Tracker 平台的适配器。
它使用公共 REST API 定期从已配置的 ioBroker 状态传输值。

＃＃ 要求
1. **注册账户：**

   👉 [创建您的帐户](https://www.energy-tracker.best-ios-apps.de/en-US/register)

2. **创建个人访问令牌**（需要登录）

   👉 [生成令牌](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Faccess-token)

3. **从 API 文档获取您的设备 ID**（需要登录）

   👉 [API 文档](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Frest-api)

＃＃ 配置
必须在适配器中配置以下字段：

-**个人访问令牌**
- **设备列表** 包含：
- `deviceId`（能量追踪器设备 ID）
- `sourceState`（提供读数的 ioBroker 状态）
- 启用数值四舍五入

**此外，您必须在 ioBroker 中创建一个计划，以便定期触发适配器。**如果没有计划，适配器将不会自动获取或传输任何数据。

＃＃ 安全
- 访问令牌以加密方式存储。
- 仅**发送**数据 - 不检索读数。

## Changelog

### 0.2.8

- Improved API reliability, added request timeout, and addressed review feedback.

### 0.2.7

- Updated ESLint to v9, fixed repository URL in package.json, and improved test coverage.

### 0.2.6

- Added README note: schedule required in ioBroker.

### 0.2.5

- Updated dependencies for testing and added Node.js v24 to adapter tests.

### 0.2.4

- Removed old news entries (fix W132 warning)

### 0.2.3

- Reduced build size

### 0.2.2

- Improved support for integration testing

### 0.2.1

- Added default schedule configuration for scheduled adapter mode

### 0.2.0

- Changed adapter type to 'schedule' to reflect intended usage. Fixed repository metadata and added missing GitHub test workflows.

### 0.1.3

- Fixed repository metadata and performed required minor adjustments

### 0.1.2

- Fixed repository metadata and performed required minor adjustments

### 0.1.1

- Fixed repository metadata

### 0.1.0

- Initial version with full Admin UI configuration
- Supports multiple devices and configurable intervals

## License

MIT – see [LICENSE](LICENSE).

Copyright (c) 2017-2025 Bluefox <dogafox@gmail.com>
Copyright (c) 2015-2025 energy-tracker support@best-ios-apps.de