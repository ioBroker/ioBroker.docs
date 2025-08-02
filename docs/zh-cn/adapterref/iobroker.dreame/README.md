---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dreame/README.md
title: ioBroker.dreame
hash: m3Z73x1GlLvBtpVNeaPYWbjy5ChBc34At6Z39b6bxzQ=
---
![标识](../../../en/adapterref/iobroker.dreame/admin/dreame.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.dreame.svg)
![下载](https://img.shields.io/npm/dm/iobroker.dreame.svg)
![安装数量](https://iobroker.live/badges/dreame-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/dreame-stable.svg)
![新平台](https://nodei.co/npm/iobroker.dreame.png?downloads=true)

# IoBroker.dreame
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## IoBroker 的 dreame 适配器
Dreame 家庭设备适配器已使用 L10 L20 和 x40 进行测试

设备 ID.状态
设备的当前状态

设备 ID.远程
设备的远程控制 开始：dreame.0.xxxxx.remote.start-sweep 停止：dreame.0.xxxxx.remote.start-charge

启动快捷方式：

dreame.0.XXXXXXXX.remote.start-clean

```
[
                {
                    "piid": 1,
                    "value": 25
                },
                {
                    "piid": 10,
                    "value": "32"
                }
]
```

“value”：“32” -> 快捷方式 ID

快捷方式列表：

dreame.0.XXXXX.status.4-48

名称采用 base64 编码，如果没有 4-48 状态，则必须启动快捷方式

### 客房清洁
dreame.0.XXXX.remote.start-clean

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1]]}"
                }
            ]
```

X = 房间 ID

多间客房：

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}"
                }
            ]
```

X = 房间 1 Y = 房间 2

Karte wechseln dreame.XXXXXXX.remote.update-map

```
 [
                {
                    "piid": 4,
                    "value": "{\"sm\":{},\"mapid\":X}"
                }
            ]
```

X = mapId dreame.0.XXXX.status.6-99 或者 dreame.0.XXXX.map.curid

### 控制清洁模式
启用 CleanGenius：dreame.0.XXXXXX.remote.customCommand

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":1}",
    "siid": 4,
    "piid": 50
  }
]
```

禁用 CleanGenius：

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":0}",
    "siid": 4,
    "piid": 50
  }
]
```

CleanGenius 深层清洁：\"v\":2

CleanGenius 模式：值：3 或值 2

```
[
            {

                "value": 2,
                "siid": 28,
                "piid": 5
            }
        ]

```

更改清洁模式：

```
[
{

                "value": 5122,
                "siid": 4,
                "piid": 23
            }
        ]
```

值：5120、5121、5122...

真空模式：

```
[
{

                "value": 2,
                "siid": 4,
                "piid": 4
            }
        ]

```

拖把强度：

```
[
            {

                "value": 28,
                "siid": 28,
                "piid": 1
            }
        ]
```

路线：

```
 [
            {

                "value": "{\"k\":\"CleanRoute\",\"v\":1}",
                "siid": 4,
                "piid": 50
            }
        ]
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2025-01-24)

- reduce cpu load while cleaning

### 0.2.1 (2025-01-15)

- fix for canvas installation

### 0.2.0 (2024-12-28)

- add simple maps

### 0.1.0 (2024-12-14)

- bugfixes

### 0.1.0 (2024-12-14)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2030 TA2k <tombox2020@gmail.com>

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

````

```

```
````