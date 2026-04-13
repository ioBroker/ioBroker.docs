---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hass/README.md
title: ioBroker.hass
hash: DTMrMvmhDjW3snxD6Sxstww2gJf/X7BwdV54R2ogU0M=
---
![标识](../../../en/adapterref/iobroker.hass/admin/hass.png)

![安装数量](http://iobroker.live/badges/hass-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.hass.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hass.svg)

# IoBroker.hass
![测试与发布](https://github.com/ioBroker/ioBroker.hass/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/hass/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

此适配器允许将 Home Assistant 连接到 ioBroker。

＃＃ 用法
在 HASS 中创建一个长期令牌并将其用作密码（同时将其复制到重复字段中）。

然后它应该读取所有设备的全部属性。服务可能是可控的（例如，“开启”）。要控制服务，您有两种选择：

### 设置直接值
将状态设置为 ack=false 且该值不是字符串（例如布尔值 true），则即使没有额外的服务数据，HASS 也会触发该状态。这仅适用于只有一个字段需要发送的情况——此时值将作为该字段发送！如果服务有多个字段，您将在日志中找到一条警告，其中包含有关可发送字段的更多详细信息，例如：

```
Please make sure to provide a stringified JSON as value to set relevant fields! Please refer to the Readme for details!
Allowed field keys are: temperature, target_temp_high, target_temp_low, hvac_mode
```

### 设置字符串化的 JSON 以提供一个或多个字段
将状态设置为 ack=false，该状态是一个字符串化的 JSON 对象，用于调用服务并将该 JSON 对象用作服务数据。

对于 light.turn_off 的最后一个选项（例如 `{"transition":10,"flash":"short"}`），这两个服务数据详细信息会随调用发送到 HASS。可用字段及其确切的数据定义可以在 ioBroker 对象的 JSON 定义中的 `native` 字段部分找到，在上面的示例中如下所示：

```json5
{
    // ...
    native: {
        "fields": {
            "transition": {
                "name": "Transition",
                "description": "Duration it takes to get to next state.",
                "selector": {
                    "number": {
                        "min": 0,
                        "max": 300,
                        "unit_of_measurement": "seconds"
                    }
                }
            },
            "flash": {
                "name": "Flash",
                "description": "If the light should flash.",
                "advanced": true,
                "selector": {
                    "select": {
                        "options": [
                            "long",
                            "short"
                        ]
                    }
                }
            }
        },
        "entity_id": "light.mi_control_hub_light",
        "attr": "turn_off",
        "type": "light"
    }
    //...
}
```

对于某些服务（例如 set_speed），通常需要使用类似 `{speed: "high"}` 的 JSON 对象来调用，以提供所需的值。在这种情况下，字段定义例如如下所示：

```json5
{
    //...
    native: {
        "fields": {
            "speed": {
                "name": "Speed",
                "description": "Speed setting.",
                "required": true,
                "example": "low",
                "selector": {
                    "text": null
                }
            }
        }
        // ...
    }
    // ...
}
```

＃＃ 配置
有一篇关于人际关系的好文章。

请查看 https://www.smarthomejetzt.de/mit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen/

**可惜只有德语版，但是 [谷歌翻译效果相当不错。](https://translate.google.com/translate?hl=en&sl=de&tl=en&u=https%3A%2F%2Fwww.smarthomejetzt.de%2Fmit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen%2F)**

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 2.0.3 (2026-04-02)
* (@GermanBluefox) Adapter was updated and migrated to TypeScript
* (@Titanium177) Added roles for states and added debouncing for reading states from hass

### 1.4.0 (2023-01-03)
* (Apollon77) Added more guidance logging when setting services incorrectly
* (Apollon77) Prevent crashes when attributes contain "." at the end of their names
* (Apollon77) Added logging for state updates for unknown objects

### 1.3.0 (2022-07-01)
* (Apollon77) Further optimize sending data to HASS and allow setting values like numbers as normal states if the service has one attribute and it can be mapped

### 1.2.0 (2022-06-17)
* (Apollon77) IMPORTANT: Replace special characters in entity attribute names with an underscore! Object IDs might change!
* (Apollon77) make sure a "null" value in state changes is not crashing

### 1.1.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 1.1.1 (2022-03-25)
* (Apollon77) Show password fields masked again in config

### 1.1.0 (2022-03-24)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Apollon77) Implement Service triggers to use any value to trigger or stringified JSON to call with fields
* (Apollon77) Optimize unload handling
* (Apollon7) Add Sentry for crash reporting

### 1.0.1 (2021-09-04)
* IMPORTANT: js-controller 2.0 is needed at least!
* (Apollon77) Fix start issue
* (Apollon77/Garfonso) Fix issue where value could not be set in hass

### 1.0.0 (2020-12-13)
* (bluefox) added the support of compact mode

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2026 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.