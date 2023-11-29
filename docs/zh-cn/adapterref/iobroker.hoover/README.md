---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hoover/README.md
title: ioBroker.hoover
hash: hZ/B/w6tNxTxwWk0cCc8PaeF2/Hj5s+b1xUaoDAijtg=
---
![标识](../../../en/adapterref/iobroker.hoover/admin/hoover.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.hoover.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hoover.svg)
![安装数量（最新）](https://iobroker.live/badges/hoover-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/hoover-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.hoover.png?downloads=true)

# IoBroker.hoover
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.hoover/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的胡佛适配器
胡佛设备适配器

## 登录ablauf
Die hon Mail und Passwort eingeben。

## 斯图恩
hoover.0.id.remote auf true/false setzen steuert den jeweiligen Befehl

hoover.0.id.remote.send 用于定义 Befehle zum einschalten。
Waschmaschine 适配器的默认设置：

AC 简介：

```
{
    "macAddress": "set by adapter",
    "timestamp": "2023-10-29T19:01:37.014Z",
    "ancillaryParameters": {
        "ecoMode": {
            "category": "general",
            "typology": "range",
            "mandatory": 1,
            "defaultValue": "0",
            "minimumValue": "0",
            "maximumValue": "1",
            "incrementValue": "1"
        },
        "programFamily": {
            "category": "cluster",
            "typology": "enum",
            "mandatory": 1,
            "enumValues": [
                "standard"
            ],
            "defaultValue": "[standard]"
        },
        "programRules": {
            "category": "rule",
            "typology": "fixed",
            "mandatory": 0,
            "fixedValue": {
                "tempSel": {
                    "ecoMode": {
                        "1": {
                            "machMode": {
                                "1": {
                                    "typology": "fixed",
                                    "fixedValue": "26"
                                },
                                "4": {
                                    "typology": "fixed",
                                    "fixedValue": "20"
                                }
                            }
                        }
                    }
                },
                "windSpeed": {
                    "ecoMode": {
                        "1": {
                            "machMode": {
                                "1|4": {
                                    "typology": "enum",
                                    "defaultValue": "1",
                                    "enumValues": "1|2|3|5"
                                }
                            }
                        }
                    }
                },
                "windDirectionVertical": {
                    "ecoMode": {
                        "1": {
                            "machMode": {
                                "1|4": {
                                    "typology": "fixed",
                                    "fixedValue": "3"
                                }
                            }
                        }
                    }
                }
            }
        },
        "remoteActionable": {
            "category": "general",
            "typology": "fixed",
            "mandatory": 0,
            "fixedValue": "1"
        },
        "remoteVisible": {
            "category": "general",
            "typology": "fixed",
            "mandatory": 0,
            "fixedValue": "1"
        }
    },
    "applianceOptions": {},
    "applianceType": "AC",
    "attributes": {
        "prStr": "Heizen",
        "channel": "mobileApp",
        "origin": "standardProgram"
    },
    "commandName": "startProgram",
    "device": {
        "mobileId": "36bcee2ebe0dbdas",
        "mobileOs": "android",
        "osVersion": "28",
        "appVersion": "2.3.12",
        "deviceModel": "S23"
    },
    "parameters": {
        "onOffStatus": "1",
        "windSpeed": "5",
        "tempSel": "22"
    },
    "transactionId": "2023-10-29T19:01:37.014Z",
    "programName": "PROGRAMS.AC.IOT_HEAT"
}
```

## 讨论和讨论
<https://forum.iobroker.net/topic/55667/test-adapter-hoover-hon>

## Changelog

### 0.0.7

- (TA2k) add wizard app login

### 0.0.6

- (TA2k) fix login

### 0.0.2

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