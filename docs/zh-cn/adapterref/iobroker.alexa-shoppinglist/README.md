---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-购物清单
hash: or7jj4BKgLMQAtb9TD415gPeR8SUoLzBJq0i6Me7pzQ=
---
![标识](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![安装数量](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-购物清单
**测试：**![测试和发布](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 alexa-shoppingList 适配器
此适配器使用 Sentry 库自动向开发者报告异常和代码错误。更多详情以及如何禁用错误报告，请参阅 Sentry 插件文档！从 js-controller 3.0 开始使用 Sentry 报告功能。

从 Alexa 生成购物清单

您还可以使用 Alexa 的其他列表。请在管理员界面中进行配置。
使用新的管理员界面，一切将更加便捷。

有一个状态可以插入新项目。只需输入文本并按 Enter 键即可。
您可以删除活动和非活动列表。
您也可以双向移动单个项目。

我希望你喜欢

**如果您喜欢它，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

数据点
| DP 名称 | 类型 | 描述 |
|---------------------|--------|-----------------------------------------------------------------------------------------------------|
| add_position | 字符串 | 输入要插入列表的文本 |
| delete_activ_list | 按钮 | 清除活动列表并将其移至非活动列表 |
| delete_inactiv_list | 按钮 | 清除非活动列表 |
|position_to_shift|数字|您可以插入项目移动的位置编号，然后按钮移动到活动列表或非活动列表|
| list_active | JSON | JSON 格式的活动列表 |
| list_active_sort | 开关 | 您可以按名称或插入时间对活动列表进行排序 |
| list_inactive | JSON | JSON 格式的非活动列表 |
| list_inactive_sort | 开关 | 您可以按名称或插入时间对非活动列表进行排序 |
| to_activ_list | 按钮 | 首先插入position_to_shift，然后按按钮移动到activ_list |
| to_inactive_list | 按钮 | 首先插入position_to_shift，然后按按钮移动到inactiv_list |

| JSON 中的属性 | 描述 |
|-------------------|-------------------------------------------|
| 名称 | 商品名称 |
| 时间 | 插入时间戳 |
| id | Alexa2 适配器中的 id |
| pos | 列表中的位置 |
| buttonmove | 移动到活动或非活动列表的按钮 |
| buttondelete | 彻底删除项目的按钮 |

JSON 现在包含 2 个按钮，分别用于移动项目和删除。
为此，您需要在 Skript 下的 VIS 编辑器中插入代码，如下所示：

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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- CHORE: #145 Update dependencies

### 1.1.1 (2025-08-13)

- FIX: Error reported by sentry

### 1.1.0 (2025-07-14)

- FEAT: Activate sentry
- Breaking change: minimal supported node.js version is 20.x
- FEAT: Add typescript

### 1.0.3 (2024-12-04)

- CHORE: Migration to ESLint 9 and @iobroker/eslint-config

### 1.0.2 (2024-11-09)

- FIX: #97 Add missing attributes to jsonConfig

### 1.0.1 (2024-10-19)

- FEAT: #95 Responsive Design

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

Copyright (c) 2025 MiRo1310 <michael.roling@gmx.de>

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