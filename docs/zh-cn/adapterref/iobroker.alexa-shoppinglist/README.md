---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-购物清单
hash: 6egxt8ZmXvDHA1Wy1yHws/5BBQHshFPj77Kv1TE6mws=
---
![标识](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![安装数量](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![新平台](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

#ioBroker.alexa-购物清单
**测试：**![测试与发布](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 alexa-shoppingList 适配器
从 Alexa 生成购物清单

您还可以使用 Alexa 中的其他列表。在管理员中配置它。
当您使用新的管理员 UI 时，它会变得更加容易。

有一个状态可以插入新项目。只需输入文本并按 Enter 即可。
您可以删除活动和非活动列表。
您也可以只移动一个项目，双向移动。

希望你喜欢

**如果您喜欢它，请考虑捐赠：**

[![贝宝]（https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

数据点
| DP 名称 | 类型 | 描述 |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| add_position | 字符串 | 输入要插入列表的文本 |
| delete_activ_list | 按钮 | 清除活动列表并将其移至非活动列表 |
| delete_inactiv_list | 按钮 | 清除非活动列表 |
| position_to_shift | 编号 | 您可以插入项目移动的位置编号，然后按钮移动到活动列表或非活动列表 |
| list_active | JSON | JSON 格式的活动列表 |
| list_active_sort | 开关 | 您可以按名称或插入时间对活动列表进行排序 |
| list_inactive | JSON | JSON 格式的非活动列表 |
| list_inactive_sort | 开关 | 您可以按名称或插入时间对非活动列表进行排序 |
| to_activ_list | 按钮 | 首先插入 position_to_shift 然后按按钮移动到 activ_list |
| to_inactive_list | 按钮 | 首先插入 position_to_shift 然后按按钮移动到 inactiv_list |

| JSON 中的属性 | 描述 |
| ----------------- | ----------------------------------------- |
| 名称 | 产品名称 |
| 时间 | 插入时间戳 |
| id | Alexa2 适配器中的 id |
| pos | 列表中的位置 |
| buttonmove | 移至活动或非活动列表的按钮 |
| buttondelete | 彻底删除项目的按钮 |

JSON 现在包含 2 个按钮，用于移动项目或删除。
为此，您必须在 Skript 下的 VIS 编辑器中插入代码，输入以下内容：

```
 /* Alexa Einkaufsliste JSON */

function setOnDblClickCustomShop( myvalue) {
    let id = myvalue.slice(0,myvalue.indexOf(","));
    let val = myvalue.slice(myvalue.indexOf(",")+1, myvalue.length);
    if (val=== "true"){
      vis.setValue(id,true);
      return
    }
    vis.setValue(id,false);
  }
```

![](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/Skript.png)

## Changelog
### 1.0.0 (2024-08-09)

- Js-controller >=5.0.19 is required
- Breaking change: minimal supported node.js version is 18.x

### 0.1.5 (09.01.2023)

- Error when deleting via the JSON list fixed

### 0.1.4 (25.09.2022)

- Its now possible to delete always the inactive list, when you delete an article from the active list
- You only have to check the checkbox

### 0.1.2 ( 09.04.2022)

- Add Buttons in JSON String

### 0.1.1 ( 20.02.2022)

- Error fixed in jsonConfig

### 0.1.0 ( 20.02.2022)

- First complete working Releases

### 0.0.1

- (MiRo1310) initial release

## License

MIT License

Copyright (c) 2024 MiRo1310 <michael.roling@gmx.de>

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