---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: Pc2vT2/oU2hjpLvmV5g1O4ShZPkhlOcRqfm3IE1UwKk=
---
# IoBroker.heizungssteuerung
![标识](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![依赖状态](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![已知漏洞](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)
![新公共管理](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

**测试：**[![测试与发布](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml)

## IoBroker 适配器用于加热控制
该适配器为 ioBroker 安装提供全面的加热系统管理。它支持加热和冷却模式，并具有升压模式、暂停功能和基于时间的温度调度等高级功能。

[🇩🇪 德语版](README_DE.md)

＃＃ 特征
- **双模式支持**：在加热和冷却模式之间切换
- **增强模式**：暂时增加个别房间的供暖/制冷
- **暂停模式**：暂时禁用特定房间的供暖/制冷
- **基于时间的调度**：定义不同时间和日期的温度周期
- **基于房间的控制**：每个房间的单独温度管理
- **湿度控制**：达到湿度阈值时停止冷却
- **缺勤模式**：在节假日或长期缺勤期间设置降低温度
- **温度覆盖**：需要时手动覆盖目标温度

＃＃ 安装
### 通过 ioBroker 管理界面
1. 打开ioBroker管理界面
2. 转到“适配器”选项卡
3. 搜索“heizungssteuerung”
4.点击“安装”

### 通过 npm
```bash
npm install iobroker.heizungssteuerung
```

## 快速入门指南
### 1. 设置房间结构
在配置适配器之前，您需要在 ioBroker 中设置您的房间结构：

1. 导航至**对象 → 枚举 → 房间**
2. 为您想要控制的每个区域创建房间（例如“客厅”、“卧室”、“厨房”）
3. 在每个房间添加以下设备：
- 温度传感器
- 加热/冷却执行器（阀门、开关等）
- 湿度传感器（可选）

### 2. 配置函数
在**对象→枚举→函数**中设置所需的函数：

- **温度**：添加所有温度传感器状态
- **湿度**：添加湿度传感器状态（可选）
- **引擎**：添加所有加热/冷却执行器状态

### 3. 适配器配置
#### 基本设置
- **操作模式**：在“加热”和“冷却”之间选择
- **检查间隔**：适配器检查温度的频率（以分钟为单位）
- **默认温度**：当没有匹配的时间段时回退温度
- **温度滞后**：用于打开/关闭加热/冷却的温差阈值

基于时间的周期
为每个房间配置温度计划：

1. 从下拉菜单中选择一个房间
2. 设置开始和结束时间
3. 定义目标温度
4. 选择星期几
5. 指定此时间段是用于加热还是冷却模式

＃＃＃＃ 高级设置
- **暂停时长**：暂停模式的自动重置时间（分钟）
- **增强持续时间**：增强模式的自动重置时间（分钟）
- **湿度阈值**：冷却停止前的最大湿度
- **启动时重置**：适配器启动时用默认值覆盖所有温度

＃＃ 用法
### 手动控制操作
适配器在`heizungssteuerung.0.Actions`下创建操作对象：

#### 全局操作（所有房间）
- **absenceUntil**：设置缺席模式直到特定日期/时间
- 格式：`dd.MM.yyyy HH:mm`（例如，“01.01.2024 14:00”）
- 效果：忽略周期并使用默认温度
- **暂停**：暂时暂停所有加热/冷却
- **增强**：为所有房间激活增强模式

#### 特定房间的操作
对于每个房间，您会发现：

- **暂停**：仅暂停此房间的供暖/制冷
- **增强**：仅为该房间激活增强模式
-**targetTemp**：暂时覆盖目标温度

### 示例配置
#### 基本供暖时间表
```
Room: Living Room
Time: 06:00 - 22:00
Days: Monday to Friday
Temperature: 21°C
Mode: Heating
```

#### 周末安排
```
Room: Living Room
Time: 08:00 - 24:00
Days: Saturday, Sunday
Temperature: 22°C
Mode: Heating
```

夜间温度
```
Room: Bedroom
Time: 22:00 - 06:00
Days: All days
Temperature: 18°C
Mode: Heating
```

## 配置示例
### 典型的家庭设置
1. **生活区**：白天 21°C，夜间 19°C
2. **卧室**：白天 19°C，夜间 16°C
3. **浴室**：早/晚 22°C，其他时间 19°C
4. **办公室**：工作时间 21°C，其他时间 18°C

### 节能小贴士
- 使用较低的夜间温度（降低2-3°C）
- 将外出温度设置为低于正常温度 3-5°C
- 配置升压模式以实现快速预热而不是持续高温
- 使用湿度控制来防止过度冷却

故障排除
### 常见问题
**温度没有变化**

- 检查房间枚举是否正确配置
- 验证温度传感器是否分配到正确的房间
- 确保执行器位于“引擎”功能枚举中

**句号不起作用**

- 验证时间格式（24小时格式）
- 检查操作模式是否与周期配置匹配
- 在时间段设置中确认房间选择

**湿度控制不工作**

- 向房间和功能枚举添加湿度传感器
- 检查湿度阈值设置
- 验证传感器是否提供当前数据

### 调试信息
在适配器设置中启用调试日志记录以查看有关以下内容的详细信息：

- 温度计算
- 周期匹配
- 执行器控制决策
- 错误情况

## 致谢
图标由 Freepik ([https://www.flaticon.com/de/kostenloses-icon/heizung_1295221](https://www.flaticon.com/de/kostenloses-icon/heizung_1295221)) 创建

---

**支持这个项目** ⭐ 如果您发现它有用，请为该存储库加星标！

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-09-17)
* (jbeenenga) update dependencies
* (jbeenenga) add absence mode
* (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)
* (jbeenenga) fix bug for end boost or pause mode
* (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)
* (jbeenenga) fix date format

### 1.6.5 (2022-12-16)
* (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)
* (jbeenenga) add more debug outputs
* (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)
* (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)
* (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

## License

MIT License

Copyright (c) 2024 jbeenenga [j.beenenga@gmail.com](mailto:j.beenenga@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.