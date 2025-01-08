---
lastChanged: 25.08.2024
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/states.md
title: 状态和数据点
hash: YhGzxu5h8tG54E4wLlrlkwYe9yGh8rPylLjo4462bp0=
---
# 状态和数据点
**数据点**由类型为`state`的静态对象和动态状态组成。

状态的属性有：

 * `val` - 当前值
 * `ack` - 指示目标系统确认该值的标志
 * `ts` - 最后状态更新的 Unix 时间戳（以毫秒为单位）
 * `lc` - 最后值更改的 Unix 时间戳（以毫秒为单位）
 * `q` - [质量](../dev/objectsschema.md#states)
 * `from` - （可选）上次更新的源（适配器实例）
 * `user` - （可选）用户名，最后写入该值的人。
 * `c` - （可选）注释
 * `expire` - （可选）值设置为“零”时的时间（以秒为单位）。

静态对象的属性有id、type='state'、common、native。以下常见属性是可能的：

* `common.type` （可选）- 默认为 `mixed` = 任何类型。可能的值：“数字”、“字符串”、“布尔值”、“数组”、“对象”、“混合”、“文件”。
* `common.name` （可选，字符串）
* `common.max` （可选，数字）
* `common.step` （可选，数字）- 增加/减少间隔。例如恒温器为 0.5
* `common.unit` （可选，字符串）
* `common.def` （可选 - 默认值）
* `common.defAck` （可选 - 如果设置了 common.def，则该值用作 ack 标志，js-controller 2.0.0+）
* `common.desc` (可选，字符串或对象) - 描述，多语言描述对象
* `common.read` (bool, 强制) - 如果数据点可读则为 true
* `common.write` (bool, 强制) - 如果数据点可写则为 true
* `common.role` （字符串，强制） - 数据点的角色（在用户界面中用于指定选择哪个小部件。[查看此处](../dev/stateroles.md)
* `common.states` （可选）具有可能状态对象的属性` {'value': 'valuename', 'value2': 'valuename2', 0: 'OFF', 1: 'ON'} `
* `common.workingID`（字符串，可选）- 如果此状态的帮助程序状态为 WORKING。这里需要写全名，如果前面部分与实际名称相同，则只写最后部分。用于“HM.LEVEL”，通常值为“WORKING”。
* `common.custom`（可选）- 具有特定适配器的自定义设置的结构。就像`{"influxdb.0": {"enabled": true, "alias": "name"}}`。 “enabled”属性是必需的。如果不是，则删除整个属性。