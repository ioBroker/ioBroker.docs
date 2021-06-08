---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/states.md
title: 状态和数据点
hash: MOsvNxcXWYjRz8dmEGJh+aRa220Vu/VeRkYJYlt2zFQ=
---
# 状态和数据点
** 数据点** 由“状态”类型的静态对象和动态状态（状态）组成。

是状态的属性

 * val - 当前值
 * ack - 显示目标系统确认值的标志
 * ts - 上次更新状态的 Unix 时间戳（以毫秒为单位）
 * lc - 最后一次更改值的 Unix 时间戳（以毫秒为单位）
 * q - [质量] (../dev/objectsschema.md # 状态)
 * from - （可选）上次更新的源（适配器实例）
 * user - （可选）用户名，最后写入值的人。
 * c - （可选）注释
 * expire - （可选）值重置为“null”时的时间（以秒为单位）。

?> *** 这是一个占位符***。<br><br>帮助 ioBroker 并扩展这篇文章。请注意 [ioBroker 风格指南](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) 以便可以更轻松地采用更改。