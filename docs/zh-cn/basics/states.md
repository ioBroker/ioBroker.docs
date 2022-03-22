---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/states.md
title: 状态和数据点
hash: aIO1w4SfYfWnzYZfPXueWBcfwCpnwvYUOpBdvmaCpfA=
---
# 状态和数据点
**数据点**由“状态”类型的静态对象和动态状态（状态）组成。

状态的属性

 * val - 当前值
 * ack - 指示目标系统确认值的标志
 * ts - 上次状态更新的 Unix 时间戳（以毫秒为单位）
 * lc - 最后一次值更改的 Unix 时间戳（以毫秒为单位）
 * q - [质量](../dev/objectsschema.md#states)
 * 来自 - （可选）上次更新的源（适配器实例）
 * user - （可选）最后写入值的用户名。
 * c - （可选）注释
 * expire - （可选）值重置为“零”的时间（以秒为单位）。

静态对象的属性是 id、type = 'state'、common、native。以下常见属性是可能的：

* `common.type`（可选）- 默认为 'mixed' = 任何类型。可能的值：“数字”、“字符串”、“布尔”、“数组”、“对象”、“混合”、“文件”。
* `common.name`（可选，字符串）
* `common.max`（可选，数字）
* `common.step`（可选，数字） - 增加/减少间隔。例如恒温器为 0.5
* `common.unit`（可选，字符串）
* `common.def`（可选 - 默认值）
* `common.defAck`（可选 - 如果设置了 common.def，此值将用作 ack 标志，js-controller 2.0.0+）
* `common.desc`（可选，字符串或对象） - 描述，多语言描述的对象
* `common.read` (bool, 强制) - 如果数据点可读则为真
* `common.write` (bool, 强制) - 如果数据点是可写的，则为真
* `common.role`（字符串，强制）- 数据点的角色（在用户界面中用于指示应选择哪个小部件。[看这里]（../dev/stateroles.md）
* `common.states`（可选）属性与可能的状态对象` {'value': 'valuename', 'value2': 'valuename2', 0: 'OFF', 1: 'ON'} `
* `common.workingID`（字符串，可选）- 如果此状态具有辅助状态 WORKING。如果前部分与真实部分相同，则此处必须写全名或仅写最后一部分。用于“HM.LEVEL”，通常具有“WORKING”值。
* `common.custom`（可选）- 具有特定适配器的自定义设置的结构。像`{"influxdb.0": {"enabled": true, "alias": "name"}}`。 `enabled` 属性是必需的。如果不是这种情况，则删除整个属性。

?> ***这是一个占位符***。<br><br>帮助 ioBroker 并扩展本文。请注意 [ioBroker 风格指南](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md)，以便更容易地采用更改。