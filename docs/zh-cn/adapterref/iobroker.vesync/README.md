---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vesync/README.md
title: ioBroker.vesync
hash: 6KWO3g5PHUaA038TwB0lxGiz7C+MgWBuuhdUyJhUSAU=
---
![标识](../../../en/adapterref/iobroker.vesync/admin/vesync.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.vesync.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vesync.svg)
![安装数量](https://iobroker.live/badges/vesync-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/vesync-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.vesync.png?downloads=true)

# IoBroker.vesync
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.vesync/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 vesync 适配器
VeSync 适配器

# 登录ablauf
Die App Mail 和 Passwort eingeben。

# 指示
Geräte können 通过 vesync.0.id.remote gesteuert werden

开始烹饪 Beispieles Fritten：

```
{
            "accountId": "000000",
            "cookTempDECP": 0,
            "hasPreheat": 1,
            "hasWarm": false,
            "imageUrl": "",
            "mode": "Fries",
            "readyStart": true,
            "recipeId": 18,
            "recipeName": "Fritten",
            "recipeType": 3,
            "startAct": {
                "appointingTime": 0,
                "cookSetTime": 240,
                "cookTemp": 75,
                "cookTempDECP": 0,
                "imageUrl": "",
                "level": 0,
                "preheatTemp": 75,
                "shakeTime": 120,
                "targetTemp": 0
            },
            "tempUnit": "c"
        }
```

空气炸锅

```
{
            "accountId": "000000",
            "cookTempDECP": 0,
            "hasPreheat": 0,
            "hasWarm": false,
            "imageUrl": "",
            "mode": "AirFry",
            "readyStart": true,
            "recipeId": 14,
            "recipeName": "Air Fry",
            "recipeType": 3,
            "startAct": {
                "appointingTime": 0,
                "cookSetTime": 600,
                "cookTemp": 180,
                "cookTempDECP": 0,
                "imageUrl": "",
                "level": 0,
                "preheatTemp": 0,
                "shakeTime": 0,
                "targetTemp": 0
            },

```

烹饪模式：

```
{
            "accountId": "8604100",
            "appointmentTs": 0,
            "cookSetTemp": 175,
            "cookSetTime": 15,
            "cookStatus": "cooking",
            "customRecipe": "Manuell",
            "mode": "custom",
            "readyStart": true,
            "recipeId": 1,
            "recipeType": 3,
            "tempUnit": "celsius"
        }
```

停止：

```
{
            "cookStatus": "end"
        }
```

## 讨论和讨论
<https://forum.iobroker.net/topic/59466/test-adapter-vesync>

## Changelog

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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

```

```