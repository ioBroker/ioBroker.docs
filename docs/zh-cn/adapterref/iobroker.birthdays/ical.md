---
chapters: {"pages":{"de/adapterref/iobroker.birthdays/README.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/README.md"},"de/adapterref/iobroker.birthdays/ical.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/ical.md"},"de/adapterref/iobroker.birthdays/carddav.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/carddav.md"},"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/blockly.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/blockly.md"},"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/javascript.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/javascript.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.birthdays/ical.md
title: ioBroker.birthdays
hash: mcVTwMZLmbvL3BdMZ8HGHJrN5FiiqS6c2TzAt7uJjzc=
---
![标识](../../../de/adapterref/iobroker.birthdays/../../admin/birthdays.png)

# IoBroker.birthdays
## ICal
您可以使用包含所有生日的 iCal 文件（HTTP url 或本地文件的路径）。适配器搜索此文件中的所有约会。

_自适配器版本 2.0.0 起支持本地文件_

你的约会

1. 必须在描述中包含出生年份（例如 1987 年）
2. 全职
3.设置为“每年重复”

使用 iCal 选项不是强制性的。您还可以使用其他来源的生日。 _如果您使用多个选项，信息将被合并。_

### 谷歌日历
转到[谷歌日历](http://calendar.google.com/)并创建一个新日历。然后在此输入符合条件的新约会（见上文）。之后，可以在适配器中使用私有日历 URL 来使用约会。

![iCal 新条目谷歌](../../../de/adapterref/iobroker.birthdays/./img/ical-google-new.png)

![iCal 设置谷歌](../../../de/adapterref/iobroker.birthdays/./img/ical-google-settings.png)

![iCal 网址谷歌](../../../de/adapterref/iobroker.birthdays/./img/ical-google-url.png)

### Synology 日历
![iCal 新品 Synology](../../../de/adapterref/iobroker.birthdays/./img/ical-synology-new.png)

![iCal 新品 Synology](../../../de/adapterref/iobroker.birthdays/./img/ical-synology-new-r.png)

![iCal URL Synology](../../../de/adapterref/iobroker.birthdays/./img/ical-synology-url.png)