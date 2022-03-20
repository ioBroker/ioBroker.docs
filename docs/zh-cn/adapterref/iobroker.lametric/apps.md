---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/apps.md
title: ioBroker.lametric
hash: j5FC6pyj9IDYeBmi5L0fh2+FA3gCfwB3lvZKq3FvgrI=
---
![商标](../../../de/adapterref/iobroker.lametric/../../admin/lametric.png)

# IoBroker.lametric
## 特殊应用程序/小部件 *（版本 > 1.1.2）*
可以为某些应用程序提供附加信息或对其进行控制。

### 时钟.clockface
有效值为

- `weather`、`page_a_day`、`custom` 或 `none`
- 格式为 `data:image/png;base64,<base64 编码的 png 二进制文件>` 或 `data:image/gif;base64,<base64 编码的 gif 二进制文件>` 格式的自定义图标

示例：`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYlWNUVFBgwAeYcEncv//gP04FMEmsCmCSiooKjHAFMEF0SRQTsEnCFcAE0SUZGBgYGAl5EwA+6RhuHb9bggAAAABJRU5ErkJggg==`

### Countdown.configure
允许值：以秒为单位的时间