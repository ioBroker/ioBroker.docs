---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-technic/README.md
title: ioBroker VIS 2 技术小部件
hash: Abcg2n0+2FDne7QqbLMDghBF19jYZHtcjnwNua8Jy88=
---
# IoBroker VIS 2 技术小部件

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-2-widgets-technic.svg)
![许可证：MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Technic 为 ioBroker VIS 2 设计的智能家居可视化组件，采用统一的深青色设计语言。

## 小部件
**窗户 - 墙壁** – 窗户和卷帘控制，带有 SVG 可视化、自动/手动模式切换、位置滑块、上下文菜单和快速设置按钮（0 / 25 / 50 / 75 / 100%）。

**开关 - 布尔型** – 开/关开关，带有可选择的 SVG 图标和可配置的开/关颜色。

**调光器 - 灯光** – 270°弧形调光器，带可拖动旋钮、动态灯光光线动画、电源切换和亮度百分比显示。

＃＃ 要求
- ioBroker js-controller >= 6.0.11
- ioBroker VIS 2 >= 2.0.0
- Node.js 版本 >= 20

＃＃ 安装
通过 ioBroker 管理界面，在适配器列表中搜索“vis-2-widgets-technic”进行安装。

安装完成后，请在浏览器中强制刷新（Ctrl+Shift+R）。

＃＃ 设计
所有组件都使用一致的调色板：

- Teal `#2ecfbf` – 活动/开启状态
- 辅助 `#5f8f8a` – 非活动/关闭状态
- 背景色 `#0d1820` – 小部件背景
- 文本 `#c8e6e3` – 标签和文本

## Changelog

### 0.1.20 (2026-06-28)
- fix: complete translations for all news entries

### 0.1.19 (2026-06-28)
- fix: remove duplicate English news translations flagged by repochecker

### 0.1.18 (2026-06-27)
- Remove postinstall script, fix i18n translations (component mode), remove demo widget and template keys

### 0.1.17 (2026-06-27)
- Release 0.1.17

### 0.1.16 (2026-06-26)
- Translate all widget names and labels to English, fix window blind open/close logic, add quick-set buttons (0/25/50/75/100%)

### 0.1.15 (2026-06-21)
- Release 0.1.15

### 0.1.14 (2026-06-21)
- Release 0.1.14

### 0.1.13 (2026-06-19)
- fix: workflow permissions and provenance flag

### 0.1.12 (2026-06-19)
- fix: enable npm provenance via GitHub Actions, remove debug script

### 0.1.11 (2026-06-19)
- fix: remove process.env/exit for compact mode compliance

### 0.1.10 (2026-06-19)
- fix: correct web restart command chaining in install.js

### 0.1.9 (2026-06-19)
- fix: call iobroker.js directly to bypass broken wrapper recursion

### 0.1.8 (2026-06-19)
- fix: capture real stderr in install.js for debugging

### 0.1.7 (2026-06-19)
- fix: persistent logging in install.js for debugging

### 0.1.6 (2026-06-19)
- fix: persistent logging in install.js for debugging

### 0.1.5 (2026-06-19)
- fix: robust install.js with retry and file verification for fresh installs

### 0.1.4 (2026-06-18)
- Initial npm release

### 0.1.3 (2026-06-18)
- Added BeleuchtungDimmer widget

### 0.1.2 (2026-05-01)
- AnAusSchalter widget with SVG icons and freely configurable colors

### 0.1.1 (2026-04-01)
- FensterNormal widget with SVG transparency and context menu

### 0.1.0 (2026-03-01)
- Initial release

## License

MIT License
Copyright (c) 2026 iobroker-community-adapters

See [LICENSE](LICENSE) for full text.