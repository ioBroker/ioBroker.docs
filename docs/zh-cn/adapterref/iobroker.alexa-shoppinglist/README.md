---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-购物清单
hash: r5nDQXWStgnd8CQzQtUDbON4qebgQ6aQ6/Nol4aY2Yk=
---
![商标](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![安装数量](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa 购物清单
**测试：** ![测试和发布](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 alexa-shoppinglist 适配器
从 Alexa 生成购物清单

您还可以使用 Alexa 的其他列表。在管理员中配置它。
当您使用新的管理 UI 时，这对您来说会容易得多。

有一个插入新项目的状态。只需编写文本并输入。
您可以删除活动和非活动列表。
您也可以只向两个方向移动一个项目。

我希望你喜欢

＃＃ 数据点
| DP 名称 |类型 |说明 |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
|添加位置 |字符串 |键入要插入列表中的文本 |
|删除活动列表 |按钮 |清除活动列表并将其移至非活动列表 |
|删除无效列表 |按钮 |清除非活动列表 |
| position_to_shift |编号 |您可以插入项目移动的位置编号，而不是按钮 to_active_list 或 to_inactive list |
|列表活动 | JSON | JSON 格式的活动列表 |
|列表活动排序 |切换 |您可以按名称或插入时间对活动列表进行排序 |
| list_inactive | JSON |非活动列表作为 JSON |
| list_inactive_sort |切换 |您可以按名称或插入时间对非活动列表进行排序 |
| to_activ_list |按钮 |首先插入 position_to_shift 然后按下按钮移动到 activ_list |
| to_inactive_list |按钮 |首先插入 position_to_shift 然后按下按钮移动到 inactiv_list |

| JSON 中的属性 |说明 |
| ----------------- | ----------------------------------------- |
|姓名 |物品名称 |
|时间 |插入的时间戳 |
|编号 | Alexa2 适配器中的 ID |
|位置 |榜单位置 |
|按钮移动 |移动到活动或非活动列表的按钮 |
|按钮删除 |完全删除项目的按钮 |

JSON 现在包含 2 个用于移动项目或删除的按钮。
为此，您必须在 Skript 下的 VIS 编辑器中插入代码，将其放入：

```
 /* Alexa Einkaufsliste JSON */

function setOnDblClickCustomShop( myvalue) {
    let id = myvalue.slice(0,myvalue.indexOf(","));
    let val = myvalue.slice(myvalue.indexOf(",")+1, myvalue.length);
    if (val){
      vis.setValue(id,val);
    }
  }
```

![](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/Skript.png)

## Changelog

### 0.1.5 (09.01.2023)

- Error when deleting via the JSON list fixed

### 0.1.4 (25.09.2022)

- Its now possible to delete always the Inactiv list, when you delete an Articel from the Activ list
- You only have to check the Checkbox

### 0.1.2 ( 09.04.2022)

- Add Buttons in JSON String

### 0.1.1 ( 20.02.2022)

- Error fixed in jsonConfig

### 0.1.0 ( 20.02.2022)

- First complete working Release

### 0.0.1

- (MiRo1310) initial release

## License

MIT License

Copyright (c) 2023 MiRo1310 <michael.roling@gmx.de>

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