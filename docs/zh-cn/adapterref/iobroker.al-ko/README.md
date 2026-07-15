---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.al-ko.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.al-ko.svg
BADGE-Number of Installations: https://iobroker.live/badges/al-ko-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/al-ko-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.al-ko.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.al-ko/README.md
title: ioBroker.al-ko – 德语文档
hash: kWJTXjzNI4eSIS0CkGJ3ZfGnZsHvJB8XFSnoO+w7sf4=
---
# IoBroker.al-ko – 德语文档
![标识](../../../de/admin/al-ko-128.png)

＃＃ 概述
ioBroker.al-ko 适配器可将 **AL-KO Robolinho 机器人割草机** 和其他 AL-KO 智能花园设备集成到 ioBroker 平台。

通信通过 **官方 AL-KO 云 API** 进行，包括通过 WebSocket 进行实时更新。

---

## 函数
- 连接到官方 AL-KO 云 API
- 自动创建所有可读状态
- 可通过白名单控制的可写状态
- 更改通过 PATCH 传输到 AL-KO（“期望”状态）。
- 通过 WebSocket 进行实时更新
- 支持多种设备
- 与现代 ioBroker 管理后台/jsonConfig 兼容

---

＃＃ 要求
使用AL-KO API需要访问数据：

请在此处申请：➡ https://alko-garden.at/iot-api-zugang-anfordern/

必要的：

- 用户名
- 密码
- 客户端 ID
客户密钥

进入：**实例 → al-ko → 配置**

---

## 免责声明
此适配器为**社区项目**。

AL-KO 对此不提供**官方支持**。

---

## 变更（节选）
### 0.3.11 (2026-05-07)
- CI问题已解决，工作流程已稳定
发布工具已更新
需要Node.js版本>= 22.13.0。
- 提高了代码质量（eslint/prettier）

### 0.3.10 (2026-05-07)
- i18n 已切换至短格式
- 已针对 Node.js 22 进行适配的 tsconfig
- Node.js 版本要求增加至 >=22.13.0
- CI配置已稳定

### 0.3.9 (2026-05-07)
- 添加了版本 0.3.8 缺失的变更日志条目
版本比较

### 0.3.8 (2026-05-07)
- CI/npm 发布问题已解决
- 依赖项已更新
- 稳定性提升

### 0.3.7 (2026-05-07)
- 依赖项已更新（包括 Axios 安全修复）
需要Node.js版本22或更高版本。
- 稳定性提升

### 0.3.6 (2026-04-26)
- 修正了无效的状态角色（移除了 `value.number`，正确使用了 `value` 和 `level`）
- 修正了可写状态的白名单
- 根据评审要求改进了对象结构

### 0.3.5 (2026-03-26)
- 已启用 npm Trusted Publishing
- 修复了 GitHub Actions 工作流警告

查看完整变更日志了解所有变更：➡ [变更日志_旧版.md](../../CHANGELOG_OLD.md)

主要创新点：

- 改进了对象结构
- 修订后的日志记录
- 改进了身份证件消毒
- 全局超时和适配器安全定时器
- 文件已修订

---

＃＃ 执照
本作品采用**MIT许可证**发布。

## Changelog

### 0.3.11 (2026-05-07)
- Fixed CI issues and stabilized workflow
- Updated release tooling
- Require Node.js >= 22.13.0
- Improved code quality (eslint/prettier)

### 0.3.10 (2026-05-07)
- Migrated i18n to short format
- Aligned tsconfig with Node.js 22
- Updated Node.js requirement to >=22.13.0
- Stabilized CI configuration

### 0.3.9 (2026-05-07)
- Fixed missing changelog entry for 0.3.8
- Version alignment

### 0.3.8 (2026-05-07)
- Fixed CI/npm publish issues
- Updated dependencies
- Stability improvements

### 0.3.7 (2026-05-07)
- Updated dependencies (including axios security fixes)
- Require Node.js >= 22
- Stability improvements


➡ Full changelog here:  
[CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

---

## License

MIT License

Copyright (c) 2026 Hubert Zechner <hubertiob@posteo.at>

This project is released under the **MIT License**.  
See the included **LICENSE** file for full details.