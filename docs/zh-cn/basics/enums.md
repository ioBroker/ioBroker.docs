---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/enums.md
title: ioBroker 中的类别/列表 – 完整概述
hash: NagHzS5uBOdyMgM+SA2Wj7OhaTsJqREfxSpqosZJ0AQ=
---
# IoBroker 中的类别/列表 – 完整概述
什么是类别/枚举？
类别或枚举（英文：enums）构成了ioBroker的**组织基础**。它们根据房间或功能等标准对设备和数据点进行分类，从而实现统一管理，而不是对单个设备进行配置。

**核心原则：**脚本、可视化和自动化功能基于类别而非特定设备或数据点运行。这使得智能家居系统易于维护、灵活且可扩展。

## 标准和自定义类别
- **enum.rooms** – 空间分配（例如：客厅、厨房、卧室）
- **枚举函数** – 功能赋值（例如，照明、窗户、供暖、安防）
- **自定义类别** – 任何自行创建的分组，例如：
- `enum.custom.battery_status` 用于电池警告
- 用于多媒体设备的 `enum.custom.heimkino`
- `enum.custom.alarmlichter` 用于报警照明

> **注意：**不仅设备，而且**数据点**也可以分配给枚举类型，例如温度或湿度值。

主要优势
✅ **可维护性：** 设备更换或数据点变更只需分配类别，无需修改脚本。✅ **可扩展性：** 系统可随需求增长而扩展——新设备或数据点可无缝集成。✅ **清晰度：** 即使包含数百个元素，结构依然清晰。✅ **面向未来：** 独立于制造商和设备类型。

---

# 应用领域及示例
## 1. 自动化/脚本
**可能性**

- 与设备和数据点无关的编程
对多个要素的集中控制
- 免维护扩展

**示例 – 电池监控**

```
// Alle Datenpunkte der eigenen Kategorie "battery_status" überwachen
$('state[id=*battery][custom=battery_status]').on('change', obj => {
    if (obj.state.val < 20) {
        sendTo('telegram', 'Batterie schwach: ' + obj.common.name);
    }
});
```

*优势：* 新设备或数据点 → 只需分配到相应类别，脚本即可自动运行。

---

## 2. 可视化
**可能性**

- 自动结构化
- 响应式显示
- 动态组件创建
分组和排序

**示例 – iQontrol 房间布局** `enum.rooms` 中的房间将自动作为独立视图。设备和数据点会根据其房间分配自动分配到正确的视图。

---

## 3. 场景
**可能性**

- 复杂的多设备和数据点自动化
跨类别行动
- 免维护场景创建

**示例——“我们要离开了”场景**

```
// Alle Lichter ausschalten
$('state[id=*on][functions=licht]').setState(false);
// Alle Sicherheitsgeräte aktivieren
$('state[id=*][functions=sicherheit]').setState(true);
```

---

4. 语音控制
**可能性**

自然语言命令
- 与 Alexa/Google Home 自动集成
- 支持离线语音控制

**示例 – Alexa 控制**

- **指令：** “Alexa，打开客厅的灯”
- **功能：** 控制 `enum.rooms.livingroom` 和 `enum.functions.light` 中的所有设备和数据点

---

# 实际应用
创建和管理类别
1. **管理员界面：** 在“枚举”下创建一个新类别（标准或自定义）
2. **对象浏览器：**通过拖放操作分配设备和数据点
3. **基于脚本：** 通过 JavaScript 创建类别和任务

## 使用选择器
- `state[id=*][functions=licht]` – 所有灯开关
- `state[id=*][rooms=kitchen][functions=light]` – 厨房里的所有灯
- `state[id=*][functions=windowstatus]` – 所有窗户传感器

最佳实践
1. **逻辑结构：** 统一分配空间、功能和数据点。
2. **唯一名称：** 使用清晰易懂的类别名称。
3. **利用层级结构：**为复杂系统创建子类别。
4. **文档编制：** 记录并传达类别结构

---

＃ 结论
类别/枚举将一系列独立的设备和数据点转换为结构化的、智能联网的智能家居系统。它们是专业 ioBroker 安装的**基本组织原则**，并可实现以下功能：

- **免维护扩展** – 新元素自动集成。
- **灵活的自动化** – 脚本独立于设备和数据点运行。
- **直观的操作** – 自然语音命令和结构化可视化
- **面向未来** – 不依赖于特定制造商