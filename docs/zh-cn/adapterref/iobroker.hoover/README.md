---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hoover/README.md
title: ioBroker.hoover
hash: pMYvwFYuQSjYEXlyYxgluH12XgfHS6DsI+XMISe+dVI=
---
![标识](../../../en/adapterref/iobroker.hoover/admin/hoover.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hoover.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hoover.svg)
![安装数量（最新）](https://iobroker.live/badges/hoover-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/hoover-stable.svg)
![新平台](https://nodei.co/npm/iobroker.hoover.png?downloads=true)

# IoBroker.hoover
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.hoover/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 hoover 适配器
胡佛设备适配器

## 登录
输入您的电子邮件和密码。

## 施托伊恩
hoover.0.id.remote 设置为 true/false 则珠宝的保护等级

hoover.0.id.remote.send 针对用户定义的错误

以下示例可以打开并发送 hoover.0.id.remote.send。
参数下的值可以被忽略。

AC 示例：

Ac Start 库伦

```json
{
  "macAddress": "set by adapter",
  "timestamp": "2024-04-12T10:16:04.886Z",
  "ancillaryParameters": {},
  "applianceOptions": {},
  "applianceType": "AC",
  "attributes": {
    "prStr": "PROGRAMS.AC.IOT_COOL",
    "channel": "mobileApp",
    "origin": "standardProgram"
  },
  "commandName": "startProgram",
  "device": {
    "mobileId": "78A04D05-8F3C-43BE-90A6-5BC3B1A2CA52",
    "mobileOs": "ios",
    "osVersion": "17.4.1",
    "appVersion": "2.7.9",
    "deviceModel": "iPhone10,5"
  },
  "parameters": {
    "onOffStatus": "1",
    "windSpeed": "5",
    "tempSel": "22"
  },
  "transactionId": "78-e3-6d-27-fb-f4_2024-04-12T10:16:04.886Z",
  "programName": "PROGRAMS.AC.IOT_COOL"
}
```

交流停止

```json
{
  "ancillaryParameters": {},
  "applianceOptions": {},
  "applianceType": "AC",
  "attributes": {
    "channel": "mobileApp",
    "origin": "standardProgram"
  },
  "commandName": "stopProgram",
  "device": {
    "appVersion": "2.7.9",
    "deviceModel": "iPhone10,5",
    "mobileId": "78A04D05-8F3C-43BE-90A6-5BC3B1A2CA52",
    "mobileOs": "ios",
    "osVersion": "16.7.7"
  },
  "macAddress": "setbyadapter",
  "parameters": {
    "onOffStatus": "0"
  },
  "programName": "PROGRAMS.AC.IOT_COOL",
  "timestamp": "2024-04-12T10:21:44.919Z",
  "transactionId": "2024-04-12T10:21:44.919Z"
}
```

AC 设置

```json
{
  "macAddress": "set by adapter",
  "timestamp": "2024-04-12T10:52:40.997Z",
  "ancillaryParameters": {},
  "applianceOptions": {},
  "applianceType": "AC",
  "attributes": {
    "prStr": "Kühl",
    "channel": "mobileApp",
    "origin": "standardProgram"
  },
  "commandName": "startProgram",
  "device": {
    "mobileId": "78A04D05-8F3C-43BE-90A6-5BC3B1A2CA52",
    "mobileOs": "ios",
    "osVersion": "16.7.7",
    "appVersion": "2.7.9",
    "deviceModel": "iPhone10,5"
  },
  "parameters": {
    "10degreeHeatingStatus": "0",
    "ch2oCleaningStatus": "0",
    "cleaningTimeStatus": "0",
    "echoStatus": "0",
    "electricHeatingStatus": "0",
    "energySavePeriod": "15",
    "energySavingStatus": "0",
    "filterChangeStatusCloud": "0",
    "freshAirStatus": "0",
    "halfDegreeSettingStatus": "0",
    "healthMode": "0",
    "heatAccumulationStatus": "0",
    "humanSensingStatus": "0",
    "humidificationStatus": "0",
    "humiditySel": "30",
    "intelligenceStatus": "0",
    "lightStatus": "0",
    "lockStatus": "0",
    "machMode": "1",
    "muteStatus": "0",
    "onOffStatus": "1",
    "operationName": "grSetDAC",
    "pm2p5CleaningStatus": "0",
    "pmvStatus": "0",
    "rapidMode": "0",
    "screenDisplayStatus": "1",
    "selfCleaning56Status": "0",
    "selfCleaningStatus": "0",
    "silentSleepStatus": "0",
    "specialMode": "0",
    "tempSel": "22",
    "tempUnit": "0",
    "voiceSignStatus": "0",
    "voiceStatus": "0",
    "windDirectionHorizontal": "0",
    "windDirectionVertical": "2",
    "windSensingStatus": "0",
    "windSpeed": "3"
  },
  "transactionId": "2024-04-12T10:52:40.997Z",
  "programName": "PROGRAMS.AC.IOT_COOL"
}
```

交流海森

```json
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
      "enumValues": ["standard"],
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

## 讨论和提问
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

```

```