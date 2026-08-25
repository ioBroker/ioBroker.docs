---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.node-red?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.node-red?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.node-red?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.node-red?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker/iobroker.node-red?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker/iobroker.node-red/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.node-red.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/node-red-stable.svg
BADGE-Installed: http://iobroker.live/badges/node-red-installed.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.node-red/README.md
title: ioBroker.node-red
hash: m7OAyT9HiOPniI4y9Ns0yLlvYBonwYxwyHnxWfm5+ps=
---
![标识](../../../en/admin/node-red.png)

# IoBroker.node-red
**注意：** 如果您在 ioBroker 节点的 ID 选择对话框中找不到您的州，请按实例设置中的更新按钮或重启 Node-RED 实例。重启后将创建新的对象列表。

＃＃ 设置
![常规设置](../../../en/adapterref/iobroker.node-red/img/instance-settings-general.png)

### 最大内存设置
在适配器/实例配置中，您可以调整 Node-RED 进程的最大内存/堆内存。默认值足以满足小型 Node-RED 安装的需求。如果您有很多节点，或者在日志中发现 Node-RED 进程的性能问题或崩溃，请提高最大内存设置！根据您的可用内存（例如，在“avail”中使用 `free -m`），将其增加到 1024（=1GB）甚至更高。

### 安全模式
流程将不会启动，您可以编辑流程以修复一些过载问题。

### 上下文存储
Node-RED 可以将节点的上下文（`context`、`flow` 和 `global`）存储在不同的 [上下文存储](https://nodered.org/docs/user-guide/context) 中。此适配器配置了其中两个：

| 存储 | 持久 | 描述 |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------- |
| `file` | 是 | 默认存储。上下文信息写入 ioBroker 数据目录，并在适配器重启后仍然存在。 |
| `memoryOnly` | 否 | 上下文仅保存在 RAM 中，适配器重启后立即丢失 |

可以在使用该上下文的每个节点的配置对话框中选择存储。如果未选择存储，则使用 `file`。

**注意：**在 6.0.8 版本之前，基于文件的存储名称为 `default`。如果您在节点中显式选择了该存储，请打开该节点并再次选择 `file`，否则 Node-RED 会记录一条关于未知上下文存储的警告。

＃＃ 验证
＃＃＃ 没有任何
![无需身份验证](../../../en/adapterref/iobroker.node-red/img/instance-settings-auth-none.png)

＃＃＃ 简单的
![简单身份验证](../../../en/adapterref/iobroker.node-red/img/instance-settings-auth-simple.png)

### 扩展
![扩展身份验证](../../../en/adapterref/iobroker.node-red/img/instance-settings-auth-extended.png)

## 节点
### IoBroker 在
### IoBroker 退出
### IoBroker 获取
### IoBroker 获取对象
### IoBroker 列表
### IoBroker sendTo

## Changelog
### 7.0.2 (2026-08-15)
-   (@GermanBluefox) Allowed to use admin instance with authentication (Admin 7.6.4 is required)
-   (@thiloms) Added an additional memory based context storage (`memoryOnly`)
-   (@thiloms) The file based context storage was renamed from `default` to `file`. Existing data is kept, but nodes with an explicitly selected store must be re-selected in the editor
-   (@GermanBluefox) The adapter backend was rewritten in TypeScript. The sources are now located in `src` and are compiled into `build`
-   (@GermanBluefox) Disabled the node-red notification about a new node-red version, as node-red is updated together with the adapter
-   (@GermanBluefox) Updated nore-red to 5

### 6.0.8 (2025-03-24)
-   (@GermanBluefox) Do not try to connect to unsecure admin from secure page and vice versa

### 6.0.7 (2025-03-24)
-   (@GermanBluefox) Replace Select-ID dialog with a library
-   (@GermanBluefox) Packages were updated

### 6.0.5 (2024-12-30)

-   (@GermanBluefox) Restart node-red if admin settings changed
-   (@GermanBluefox) Node-red updated to 4.0.8

### 6.0.1 (2024-09-30)

-   (@GermanBluefox) Corrected the case if `envVars` settings is undefined
-   (@GermanBluefox) Used common `@iobroker/eslint-config`
-   (@GermanBluefox) Node-red updated to 4.0.3

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright 2014-2026 bluefox <dogafox@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.