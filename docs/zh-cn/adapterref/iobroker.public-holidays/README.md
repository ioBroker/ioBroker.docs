---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.public-holidays/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.public-holidays@main/admin/public-holidays.svg" width="48" align="top" /> ioBroker.public-holidays
hash: rCtPqJCmRXvi87lkuWpn0a8M3l16vLe25sy1raAErWY=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.public-holidays@main/admin/public-holidays.svg" width="48" align="top" /> ioBroker.public-holidays

![npm 版本](https://img.shields.io/npm/v/iobroker.public-holidays)
![稳定的](https://iobroker.live/badges/public-holidays-stable.svg)
![安装](https://iobroker.live/badges/public-holidays-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.public-holidays)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![哨兵](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

可检测 206 个国家/地区的公共假期。完全离线运行——无需云端，无需 API 调用。每日午夜更新。

假日数据由 [日期-假期](https://github.com/commenthol/date-holidays) (ISC + CC-BY-SA-3.0) 提供。

---

＃＃ 特征
- **206 个国家** 获得州/省和地区支持
- **完全离线** — 所有假期流量均已包含在套餐内，无需网络连接
- **5 种假期类型** — 公共假期、银行假期、学校假期、可选假期、纪念日（可配置）
- **桥梁日检测** — 检测节假日和周末之间的工作日
- **排除特定节假日** — 通过下拉菜单选择要排除的节假日
- **本地化节日名称** — 遵循系统语言，并以英语作为备用语言
- **计划模式** — 启动时计算一次，每天午夜计算一次，两次运行之间不占用内存

## 哨兵/错误报告
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 仅当您在 ioBroker 诊断中启用错误报告功能（**系统设置 → 诊断和错误报告**）时，才会进行报告。仅传输匿名安装 ID，不包含姓名、电子邮件地址或 IP 地址。

有关详细信息以及如何禁用此功能，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。错误报告需要 js-controller 3.0 或更高版本。

---

＃＃ 要求
- ioBroker js-controller >= 7.2.2
- 管理员版本 >= 7.8.23
- Node.js 版本 >= 22

＃＃ 配置
所有设置都集中在一张引导卡上。请从上到下依次操作：

| 步骤 | 说明 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 位置 | 国家/地区（共 206 个）；州/省和地区仅在设有此项的国家/地区中显示。如果国家/地区留空，系统将从您的 ioBroker 系统设置中自动检测。 |
| 假期类型 | 公共假期（默认开启）、银行假日、学校假期、可选假期和纪念日。 |
| 过渡日 | 在节假日和周末之间增加过渡日。 |
| 排除的节假日 | 选择要从检测范围中排除的特定节假日。 |
| 已检测到的节假日 | 实时预览适配器将针对当前选择检测到的节假日。 |

> 设置卡是 Admin-8 组件，因此该适配器需要 Admin 8。

## 州树
```
public-holidays.0.
├── today.
│   ├── name         string    "Karfreitag" / "Good Friday"
│   └── isHoliday    boolean   true / false
├── yesterday.
│   ├── name         string
│   └── isHoliday    boolean
├── tomorrow.
│   ├── name         string
│   └── isHoliday    boolean
├── dayAfterTomorrow.
│   ├── name         string
│   └── isHoliday    boolean
└── next.
    ├── name         string    next holiday name (localized)
    ├── isHoliday    boolean   true when an upcoming holiday exists
    ├── date         string    "2026-12-25" (ISO date)
    └── daysUntil    number    days until holiday
```

当没有节假日适用时（例如，今天不是节假日），频道状态为空字符串/false/0。

## 桥日算法
桥梁日是指节假日和周末之间的工作日（周一至周五）：

- 周四放假 → 周五是过渡日
- 星期二放假 → 星期一是过渡日
- 周三放假 → 无桥牌日（缺两天）

桥梁日会在状态树中以与系统语言匹配的本地化名称显示。

## 故障排除
**首次启动后无状态** — 打开适配器设置并选择一个国家/地区。

**节假日错误/地区性节假日缺失** — 请检查是否选择了正确的州/省。将日志级别设置为调试以查看所有检测到的节假日。

**未检测到节假日** — 部分节假日被归类为 `observance` 而非 `public`。如有需要，请在节假日设置中启用节假日类型。

## 鸣谢
这个想法源于 pix 的 `feiertage` 适配器，正是它最初将节假日数据引入了 ioBroker。感谢 [杰伊·西](https://github.com/Jey-Cee) 提供了 `public-holidays` 包名。此适配器是一个独立的实现，与上述两个适配器均无任何代码共享。

＃＃ 支持
- [GitHub Issues](https://github.com/krobipd/ioBroker.public-holidays/issues) — 错误报告、功能请求
- [ioBroker 论坛](https://forum.iobroker.net/) — 一般问题

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.13.0 (2026-08-13)

- The adapter settings are now a single guided card — country, region, holiday types and exclusions on one page, with a live preview of the holidays that will be detected.

### 0.12.0 (2026-08-10)

- The holiday exclusion selector in the settings now works on Admin 8 — it was blank there since Admin 8.0.1, so this version requires Admin 8.

### 0.11.0 (2026-07-12)

- Breaking change: the states that flag whether each day is a holiday were renamed for clarity — update any scripts or views that read them.
- Refreshed the built-in holiday data, adding newly recognised regional holidays.

### 0.10.0 (2026-07-02)

- The "next holiday" date and days-until states now show up correctly as a date and a day count in VIS widgets and scripts (they carry the proper ioBroker role and a "days" unit).
- The exclude-holidays list in the settings now also offers holidays that only occur in the coming year, not just the current one.

### 0.9.0 (2026-06-28)

- The holiday exclude list now shows only your selected region's holidays, in your admin language and sorted by date — no longer every region of a country mixed alphabetically.
- The false "excluded holidays no longer match" warning at startup is fixed; it now fires only for a holiday that genuinely no longer exists.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

_Developed with assistance from Claude.ai_