---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.minuaru/README.md
title: ioBroker.minuaru
hash: Y8P8DmEv8GI8h1IIllNtUvdR6tbzuWAA3Y/P2JvlavI=
---
![标识](../../../en/adapterref/iobroker.minuaru/admin/minuaru.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.minuaru.svg)
![下载](https://img.shields.io/npm/dm/iobroker.minuaru.svg)
![新平台](https://nodei.co/npm/iobroker.minuaru.png?downloads=true)

# IoBroker.minuaru
[!安装数量](https://iobroker.live/badges/minuaru-installed.svg)[!稳定存储库中的当前版本](https://iobroker.live/badges/minuaru-stable.svg)

## IoBroker 的 minuaru 适配器
ioBroker 和 minuvis 的警报系统

> **V2.0.0 的重大变更：版本 1.x 的现有警报将被删除**

＃＃ 指示
- 照常安装适配器
- 创建 minuaru 实例
- 配置适配器设置

- 选择电报实例并设置用户名（如果您愿意）向电报发送警报

![minuaruTelegram设置](https://user-images.githubusercontent.com/20790635/151257135-3b8e335f-9510-4531-9452-a982426011ab.png)

- 如果需要，调整电报消息文本

![minuaruTelegram消息设置](https://user-images.githubusercontent.com/20790635/151257507-b882a3ec-88b3-4c91-bc24-c774db30908f.png)

- 如有必要，翻译警报表的列标题

![minuaruAlarmtableSettingsheader](https://user-images.githubusercontent.com/20790635/151255365-4613045d-c868-4e5e-b428-9077b7ae6f99.png)

- 如果需要，更改消息行和文本的颜色

![minuaruAlarmtableSettingsColor](https://user-images.githubusercontent.com/20790635/151256690-ee9bead9-9277-4438-998b-c04d8c566124.png)

- 在所需物体上激活米努阿鲁

![激活米努阿鲁](https://user-images.githubusercontent.com/20790635/151258456-58e99565-8af5-4200-a1f0-c6c75f4351d2.png)

- 激活 Minuaru 并设置对象的设置

![设置对象](https://user-images.githubusercontent.com/20790635/151258700-4d3ca8ca-5df0-4c3d-9638-968b97d788eb.png)

> 对于 **ioBroker.minuvis** 用户（您需要版本 >= 2.3.0）：

- 在生成器中激活报警页面和 minuaru.0 实例

![激活报警页面](https://user-images.githubusercontent.com/20790635/151258040-6bb074e3-bd35-45b5-9888-5e826a7d3edc.png)

- minuvis-header 中的数字链接到报警页面

![使用新警报页面](https://user-images.githubusercontent.com/20790635/151259455-c8d5a676-027a-4651-813b-211ca2083fd9.png)

- 确认警报以减少待处理警报的数量

![确认警报](https://user-images.githubusercontent.com/20790635/151259642-4daec6cf-35fa-4e68-9d92-0000c2d41c25.png)

- 使用 html 或 json 对象集成到其他可视化中

![其他对象](https://user-images.githubusercontent.com/20790635/151259992-61758c9c-e102-4f38-ae0e-931721d04a17.png)

## Changelog
### 2.0.0-beta (2024-10-11)
* BREAKING CHANGE: Existings alarms of version 1.x will be deleted
* (svallant) fixing issues detected by repository checker
* (svallant) switch to duckdb

### 1.1.0 (2023-03-19)
* (svallant) respect ack-flag at control-states

### 1.0.1 (2022-11-25)
* (svallant) fix translation

### 1.0.0 (2022-11-24)
* (svallant) several bugfixes

### 0.9.0 (2022-01-29)
* (svallant) beta release

### 0.0.1 (2022-01-16)
* (svallant) initial release

## License
MIT License

Copyright (c) 2024 svallant <svallant@gmx.eu>

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