---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fiat/README.md
title: ioBroker.fiat
hash: n21nQeX3lRWpDJAGybHkB3B7vtiKW6IVn8Ltgn8qqyo=
---
![标识](../../../en/adapterref/iobroker.fiat/admin/fiat.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.fiat.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fiat.svg)
![安装数量（最新）](https://iobroker.live/badges/fiat-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/fiat-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.fiat.svg)
![NPM](https://nodei.co/npm/iobroker.fiat.png?downloads=true)

# IoBroker.fiat
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.fiat/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的菲亚特吉普适配器
适用于菲亚特和吉普车的适配器

## 登录日志：
菲亚特或吉普应用程序邮件和密码。

## 施托伊恩
fiat.0.id.remote auf true setzen steuert den jeweiligen Befehl

### Ladeplan（remote.CPPLUS）
Der State `<VIN>.remote.CPPLUS` erwartet ein Array von Schedule-Objekten（auch einzelnes Objekt wird akzeptiert und automatisch in ein Array verpackt）。适配器位于 My-Uconnect-App 的 Wrapper-Body 中：

```json
{
  "command": "CPPLUS",
  "pinAuth": "…",
  "schedules": [
    {
      "cabinPriority": false,
      "chargeToFull": false,
      "enableScheduleType": true,
      "endTime": "13:05",
      "repeatSchedule": true,
      "scheduleType": "CHARGE",
      "scheduledDays": {
        "friday": true, "monday": true, "saturday": true, "sunday": true,
        "thursday": true, "tuesday": true, "wednesday": true
      },
      "startTime": "13:00"
    }
  ]
}
```

使用 `/v2/accounts/{UID}/vehicles/{VIN}/ev/schedule/` — 正文格式是官方应用程序 (APK 1.99.701) 的`ScheduleV2Model$Post$Request`。

## 讨论和问题：
https://forum.iobroker.net/topic/46378/test-adapter-fiat-v0-0-x

## Changelog
### 0.0.11 (2026-06-28)
- Updated Dependencies and latest API changes

### 0.0.10 (2024-06-10)

- added schedule edit via remote.CPPLUS

### 0.0.7

- (TA2k) Added Jeep support

### 0.0.3

- (TA2k) Added precondition

### 0.0.2

- (TA2k) Enable deep refresh to update charging state

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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