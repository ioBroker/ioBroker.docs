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
hash: mfnW7nb851CN+8eNR8e8QpAUijOu62ETX0SmdtNp/bY=
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
### 0.3.6 (2026-04-26)
- 修正了无效的状态角色（移除了 `value.number`，正确使用了 `value` 和 `level`）
- 修正了可写状态的白名单
- 根据评审要求改进了对象结构

### 0.3.5 (2026-03-26)
- 已启用 npm Trusted Publishing
- 修复了 GitHub Actions 工作流警告

### 0.3.4 (2026-03-20)
- 修正了 jsonConfig 中的响应式布局（xs/sm/md/lg/xl）
- 示例 i18n 条目（选项 1/选项 2）已移除

### 0.3.3 (2026-03-13)
- 改进了 WebSocket 处理
- 修正了对 AL-KO `reportedState` WebSocket 消息的处理
- WebSocket 连接重连更加稳定
- GitHub 工作流程已更新（Dependabot / Automerge）
- 开发依赖项已更新

### 0.3.2 (2026-03-12)
- 改进了令牌更新后的 WebSocket 重连机制
- 防止在有意关闭的 WebSocket 连接中出现重连循环
- 改进了推送请求的 API 错误日志记录
- 添加了 WebSocket 关闭代码和原因的日志记录

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

### 0.3.6
- Fixed invalid state roles (`value.number` removed, correct usage of `value` and `level`)
- Fixed whitelist handling for writable states
- Improved object structure according to review feedback

### 0.3.5 (2026-03-26)

- Enable npm trusted publishing
- Fix GitHub Actions workflow warnings


➡ Full changelog here:  
[CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

---

## License

MIT License

Copyright (c) 2026 Hubert Zechner <hubertiob@posteo.at>

This project is released under the **MIT License**.  
See the included **LICENSE** file for full details.