---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: ioBroker.ecovacs-deebot
hash: Pfjue01765+6tWgkRnw7rf4zZ3X6XMZYNCFdeAOJpG4=
---
# IoBroker.ecovacs-deebot
![标识](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![稳定版](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![最新版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![安装数量](http://iobroker.live/badges/ecovacs-deebot-installed.svg)

此适配器使用 [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) 库。

> **⚠️维护状态：社区驱动项目** > 此适配器目前采用**社区驱动**的维护模式。维护者专注于核心引擎和个人拥有的设备。对所有其他型号的支持完全依赖于社区贡献（Pull Request）。

---

## 🗺️路线图与战略
为了确保长期可维护性，我们正在简化适配器的架构。**注：我们目前处于 1.4.x 版本发布周期。**

1. **第一阶段（计划中）：最终旧版支持（适配器 v1.5.x / 库 v0.9.6）**
* 这将是所有使用 XML 协议（XMPP/XML 或 MQTT/XML）的传统设备的最终“安全港”。
* 一旦发布，将不再添加任何新的旧版功能。
2. **第二阶段（计划中）：现代化改造（适配器 v2.0.x / 库 v1.0.0）**
* 过渡到**纯MQTT/JSON**协议栈。
* 完全移除遗留代码，以提高性能和稳定性。
* **重大变更：** v2.x 将不再支持旧型号（例如 OZMO 930、Deebot 900）。

---

## 型号和支持级别
根据维护人员的设备可用性，支持服务分为不同等级：

| **级别** | **型号系列（示例）** | **状态** |
| :--- | :--- | :--- |
| 🟢 已启用 | OZMO 920/950、T8 AIVI、X1 Turbo | **完全支持。** 维护者拥有的设备 |
| 🟡 社区 | T10、T20、T30、X2、X8 等 | **尽力而为。** 通过社区 Pull Request 提供支持 |
| 🔴 旧款 | OZMO 930、Deebot 900/901 等 | **仅维护。** 仅支持 **v1.5.x 版本** |

### 如何让您的模型获得支持？
如果您拥有目前不受支持的现代（MQTT/JSON）型号：

1. 检查 [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) 库。
2. 提交包含必要模型定义的**拉取请求**。
3. **未提交 Pull Request 的新模型请求将被直接关闭，恕不另行通知。**

---

## 安装及前提条件
* **Node.js：** >= 20.x（自 v1.4.16 起）
* **ioBroker：** 稳定安装
* **可选：** `canvas` 用于地图渲染（详情请参阅 [Wiki](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)）。

## 免责声明
我与科沃斯机器人有限公司或亿迪科技有限公司没有任何关联。这只是我个人的业余项目。

## Changelog

### 1.4.16 (alpha)
- Breaking change: Bump minimum required version of Node.js to 20.x
- Add more states for air drying timer
- Use adapter-dev module
- Some further improvements and optimizations
- Bumped ecovacs-deebot.js to 0.9.6 (latest beta)
- Bumped several other dependencies
 
### 1.4.15 (latest stable)
- Breaking change: Bump minimum required version of Node.js to 18.x
- Bumped ecovacs-deebot.js to 0.9.6 (beta)
- Add state (button) for manually requesting the cleaning log
- Separate mopping and scrubbing mode
- Add states for air drying timer
- Some further improvements and optimizations

### 0.0.1 - 1.4.14
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

---

## License
MIT License - Copyright (c) 2026 Sascha Hölzel