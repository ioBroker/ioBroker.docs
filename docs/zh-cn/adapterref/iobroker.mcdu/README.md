---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mcdu/README.md
title: ioBroker.mcdu
hash: skBMZ7Xjrw0He+SOKteKaIqxPU+i19hQ4jS2ccLMZ+U=
---
![标识](../../../en/adapterref/iobroker.mcdu/admin/mcdu.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mcdu.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mcdu.svg)
![安装数量](https://iobroker.live/badges/mcdu-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/mcdu-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mcdu.png?downloads=true)

# IoBroker.mcdu
**测试：** ![测试与发布](https://github.com/Flixhummel/ioBroker.mcdu/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 MCDU 智能家居适配器
通过 MQTT 协议，使用 WINWING MCDU-32-CAPTAIN 航空驾驶舱显示器控制您的智能家居。该项目将为您的智能家居带来升级体验，提供真实的航空风格界面，包括草稿纸输入、页面导航、确认对话框以及 14x24 字符、8 色显示屏。

我们都经历过：把平板电脑挂在墙上控制智能家居，摆弄那些繁琐的界面，费劲地找到控制灯泡的开关。

我家有位飞行员，所以当我看到驾驶舱的MCDU时，立刻就有了灵感：数据输入简单，快速选择所需数据点。后来，我发现了Winwing的一款很棒的产品（https://eu.winctrl.com/view/goods-details.html?id=945），并开始进行逆向工程。特别感谢https://github.com/alha847提供的设备信息。

由于我并非开发人员，而是一位技术爱好者，所以我以结构化的方式使用了 Claude 的代码。首先，我用它来收集设备信息并进行逆向工程；然后，我用它来构建适合智能家居环境的架构；最后，我开发了 iobroker 适配器和树莓派客户端。

感谢并特别感谢伟大的开源社区，尤其是 https://github.com/klein0r 以及他关于适配器开发和各种 iobroker 智能家居应用的精彩视频。

这是适配器和客户端的第一个版本。我还需要进行全面的测试并做一些改进。欢迎大家贡献代码。

＃＃＃ 建筑学
```
ioBroker Adapter (main.js)  <-->  MQTT Broker  <-->  RasPi Client (mcdu-client/)  <-->  USB HID Hardware
```

ioBroker适配器运行所有业务逻辑（页面渲染、输入处理、验证）。树莓派客户端是一个“哑终端”，它负责将MQTT消息桥接到USB HID硬件——它不包含任何业务逻辑。

＃＃＃ 特征
- **14x24字符显示屏**，8种颜色（白、琥珀色、青色、绿色、品红色、红色、黄色、灰色）
- **73 个按键**，包括 12 个行选择键、12 个功能键和全字母数字键盘。
- **11 个 LED 灯**（9 个指示灯 + 2 个背光灯，带 BRT/DIM 亮度控制）
- **逐行颜色控制**：独立的 colLabel 和 colData 颜色，以及每页的状态栏颜色
- **航空风格输入**：第 14 行草稿纸，基于 LSK 的字段选择，OVFY 确认
- **页面系统**：可配置页面，带有子标签、自动分页、布局类型（菜单/数据/列表）
- **功能键**：11 个可配置按键（菜单、初始化、方向、功能列表、性能等），每个设备均可单独映射。
- **导航**：父级层级结构、面包屑导航状态栏、圆形 SLEW、CLR 到父级
- **验证引擎**：按键验证、格式验证、范围验证和业务逻辑验证级别
- **确认对话框**：软确认对话框（LSK 或 OVFY）和硬确认对话框（仅限 OVFY），用于关键操作
- **多设备支持**：通过每个设备的MQTT主题命名空间支持多个MCDU
- **32 种自动化状态**：LED 控制、草稿纸、通知、来自 ioBroker 脚本的按钮触发

### 开发状态
| 阶段 | 状态 |
|-------|--------|
| 适配器基础（MQTT、状态树、显示） | 完成 |
| 输入系统（草稿纸、验证、确认） | 完成 |
| 业务逻辑（渲染、分页、功能键） | 完成 |
| 管理后台界面重新设计 + 左右线条模型 | 已完成 |
| 用户体验阶段 A：功能键配置 | 完成 |
| 用户体验阶段 B：导航层级和面包屑导航 | 完成 |
| 用户体验阶段 C：页面布局类型（菜单/数据/列表）| 完成 |
| 显示增强（色彩分割、亮度、设备状态） | 完成 |
| 用户体验阶段 D：快速访问页面 | 尚未开始 |
| 用户体验阶段 E：LED 分配配置 | 尚未开始 |
| 用户体验阶段 F：配置配置文件 | 尚未开始 |
| 用户体验阶段 G：管理界面优化与集成 | 尚未开始 |
| 硬件部署测试 | 尚未开始 |

199 项测试通过（188 项单元测试 + 11 项综合测试）。

### 推荐硬件（mcdu-client）
mcdu-client 是一个轻量级的 Node.js 进程（约 50-100MB 内存），用于将 MQTT 连接到 USB HID。它需要 WiFi、USB 主机端口以及足够的 USB 电源来为 MCDU 供电（约 500mA）。

| 主板 | 价格 | WiFi | USB 主机 | 评测结论 |
|-------|-------|------|----------|---------|
| **树莓派 4 (1-2GB)** | 35-45 美元 | 双频 | 4 个 USB-A 接口 | **推荐** -- 价格、性能和易用性的最佳平衡点 |
| 树莓派 3B+ | 约 35 美元 | 双频 | 4 个 USB-A 接口 | 已验证（当前开发配置），速度略慢 |
| 树莓派 5 | 50-80 美元 | 双频 | 4 个 USB-A 接口 | 性能不错，但需要官方 27W 电源适配器才能实现完整的 USB 供电输出 |
| 树莓派 Zero 2W | 约 15 美元 | 2.4GHz | 需要 OTG 适配器 | 价格低廉但安装略显繁琐的单端口 OTG 设置 |
| ESP32-S3 | 5-15美元 | 支持 | USB OTG | 无法运行Node.js——需要完全重写C++代码 |

**关键限制**：WinWing MCDU 固件需要 SET_REPORT 控制传输（而非中断 OUT）。mcdu 客户端使用 `node-hid`，该指令在所有平台上都能自动处理此问题（macOS 上使用 IOHIDManager，Linux 上使用 hidraw）。

### 快速入门（开发）
```bash
npm install
npm test          # Run all tests
npm run lint      # ESLint
npm run check     # Lint + test combined
```

有关详细文档，请参阅[文档/](docs/README.md)。

### 脚本
| 脚本 | 描述 |
|--------|-------------|
| `npm test` | 运行所有测试 |
| `npm run test:integration` | 仅限集成测试 |
| `npm run test:watch` | 单元测试监视模式 |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint 自动修复 |
| `npm run check` | Lint + 测试组合 |
| `npm run check` | 代码检查 + 测试结合 |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Flixhummel) Address ioBroker adapter review feedback (reviewer McM1957)
* (Flixhummel) Migrate to ESLint 9 flat config with @iobroker/eslint-config v2.2.0
* (Flixhummel) MQTT password now stored encrypted -- users must re-enter password once after updating
* (Flixhummel) Fix object hierarchy: `devices` container changed from channel to folder
* (Flixhummel) Fix 12+ state roles to match ioBroker standards
* (Flixhummel) Replace native setTimeout/setInterval with adapter equivalents
* (Flixhummel) Consolidate i18n translations to flat JSON files, move i18n.js to scripts/
* (Flixhummel) Remove unused admin/jsonConfig-complexversion.json

### 0.2.0 (2026-02-28)
* (Flixhummel) Fix error display for read-only datapoints, improve save config handling

### 0.1.9 (2026-02-27)
* (Flixhummel) Unify MCDU driver to node-hid on all platforms, clean up mcdu-client setup

### 0.1.8 (2026-02-26)
* (Flixhummel) Remove unpublished news entries and add missing jsonConfig size attributes

### 0.1.7 (2026-02-25)
* (Flixhummel) Fix ioBroker repository checker errors and warnings

### 0.1.4 (2026-02-25)
* (Flixhummel) Switch to npm trusted publishing (OIDC) for automated releases

### 0.1.3 (2026-02-25)
* (Flixhummel) Initial npm release with MQTT bridge, page system, admin UI, and automation states

For detailed changelog see [CHANGELOG.md](CHANGELOG.md).

## License
MIT License

Copyright (c) 2026 Flixhummel <hummelimages@googlemail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.