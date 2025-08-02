---
lastChanged: 13.09.2018
template: true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/objects.md
title: 信息是如何存储的？
hash: 1esXUxnW4ODED5oca7t4iOPzFYH7TNdyhjh2/64jlUk=
---
# 信息是如何存储的？
ioBroker 中有两种类型的信息：

- 对象：描述数据的结构和属性的元数据，例如名称、类型、单位、最小/最大值。
- 状态：实际数据，例如 23.5°C，true，“Hello World”。

## 对象
有不同类型的对象：

- `host`：有关运行 ioBroker 的主机（计算机）的信息。一个系统中可以运行多个主机。
- `user`：有关用户的信息：密码、图片、名称、颜色。可以存在多个用户。
- `group`：有关包含多个用户的组的信息。
- `script`：有关脚本的信息：源代码、名称、描述。
- `design`：包含有关控制器应如何搜索特定类型的 vpm 对象的说明。
- `适配器`：适配器是执行特定任务的软件模块，例如从设备读取数据或控制设备。
- `instance`：实例是在主机上运行的适配器的副本。一个实例有一个索引。
- “设备”：设备是属于物理设备的一组通道，例如电灯开关。
- “通道”：通道是一组主题上属于在一起的状态，例如灯开关的所有状态。
- “状态”：数据点是一种状态，例如房间的温度。
- `enum`：类别是一组按主题属于在一起的对象，例如房间中的所有设备。
- `meta`：元对象是包含其他对象信息的对象，例如设备的描述。
- `chart`：图表对象是包含图表配置的对象。
- `文件夹`：文件夹是包含其他对象的对象，例如房间中的所有设备。
- `schedule`：计划是包含计划配置的对象。
- `config`：配置对象是包含有关 ioBroker 的配置的对象：语言、活动存储库等。