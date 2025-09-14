---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.homeconnect.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.homeconnect.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/homeconnect-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/homeconnect-installed.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: BdcZm1VjlEnueSZVKY13h3Fx1CBwDnFApSOExNTZfZc=
---
![标识](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

# IoBroker.homeconnect
## 安装前的要求
- 节点 20、22 或 24
-JS 控制器 >= 6.0.11
- 管理员 >= 7.4.10

适配器需要 ClientID。请使用每个步骤的设置进行注册。

<https://developer.home-connect.com>

![截屏](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

对于**用于测试的默认 Home Connect 用户帐户**，请指定用于发送 Home Connect 应用程序的电子邮件地址。
已注册，这在后续授权过程中也是必需的。

![截屏](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

在“账户类型”中选择“个人”。如有剩余数据，请添加（不知道是否会被勾选）。

![截屏](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

然后转到**应用程序**，然后转到**注册应用程序**。

![截屏](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

在“应用程序 ID”中输入应用程序名称，例如 ioBroker。在“OAuth 流程”中选择“设备流程”。
“Home Connect 测试用户帐户”可以留空。在“成功重定向”中输入 URI，例如 https://example.com。
保存后，您便获得了所需的客户端 ID。

＃＃ 配置
请将 Homeconnect App 用户名、密码和生成的 cleintId 添加到适配器配置中。

＃＃ 用法
使用命令中的状态，您可以停止、暂停和恢复程序。
使用设置中的状态，您可以关闭或打开设备。更改 programs.active.BSH_Common_Root_ActiveProgram 的值将启动程序。更新 iQ300：您需要在此变量中设置程序名称。如果复制了 programs.selected.BSH_Common_Root_SelectedProgram，机器用户可以在机器上预定义所需的程序，并通过 ioBroker 启动。更改 programs.selected.BSH_Common_Root_SelectedProgram 的值将选择程序或选项。

## 速率限制
[API 速率限制](https://api-docs.home-connect.com/general/#rate-limiting)

- 每个用户和 Home Connect 帐户 10 次事件监控会话
- 未添加
- 每秒 10 次查询（这取决于数据量）

- 未添加

- 每分钟刷新 10 次令牌
- 一分钟内9次请求触发，锁定1分钟
- 每天刷新 109 次令牌
- 一天内收到99个请求后触发。之后锁定至午夜。不确定是否真的是24小时。

## Homeconnect.0.rateTokenLimit.isBlocked
- true 表示锁定，false 表示无锁定

## Homeconnect.0.rateTokenLimit.limitJson
```JSON
{
  "tokenRefreshMinutesMax": 9, // Max requests per 10 minutes
  "tokenRefreshMinutesCount": 0, // Counter for max requests per 10 minutes
  "tokenRefreshMinutesLast": 1754680202619, // Start time as a timestamp from which counting begins
  "tokenRefreshDayMax": 99, // Max requests per day
  "tokenRefreshDayCount": 2, // Counter for max requests per day
  "tokenRefreshDayLast": 1754658108428, // Start time as a timestamp from which counting begins
  "tokenBlock": false, // True if a lock is active
  "tokenBlockTime": 0, // Timestamp when the lock was triggered
  "tokenReason": "No Block" // Name of the lock (internal adapter)
}
```

## Homeconnect.0.rateTokenLimit.reason
```JSON
    "states": {
      "0": "Nothing", // No lock
      "1": "Token Limit (10 per minute)", // 10 minute lock active
      "2": "Token Limit (100 per day)" // 24h active
    }
```

- 使用漏桶算法，平均每秒 10 个请求（最大突发 20 个请求）

- 15 次请求后触发

- 每个客户和 Home Connect 用户帐户每天 1000 个请求

- 一天内收到 9999 次请求后触发。之后锁定至午夜。我不确定是不是真的 24 小时。

- 每个客户端和 Home Connect 用户帐户每分钟 50 个请求

- 一分钟内收到 49 个请求后触发。所有查询将被阻止一分钟。

- 每个用户和 Home-Connect 用户帐户每分钟 5 次启动请求

- 一分钟内收到 4 次请求后触发。所有查询将被阻止 1 分钟。

- 每个用户和 Home-Connect 用户帐户每分钟 5 次停止请求

- 一分钟内收到 4 次请求后触发。所有查询将被阻止 1 分钟。

- 每 10 分钟每个客户端和 Home Connect 用户帐户连续 10 次请求
- 10分钟内出现9条错误消息后触发。所有查询将被阻止10分钟。

## Homeconnect.0.rateLimit.isBlocked
- true 表示锁定，false 表示无锁定

## Homeconnect.0.rateLimit.limitJson
```JSON
{
  "requestsMinutesMax": 49, // Max requests per minute
  "requestsMinutesCount": 0, // Counter for max requests per minute
  "requestsMinutesLast": 1754680202594, // Start time as a timestamp from which counting begins
  "requestsDayMax": 999, // Max requests per day
  "requestsDayCount": 21, // Counter for max requests per day
  "requestsDayLast": 0, // Start time as a timestamp from which counting begins
  "requestsMinutesStartMax": 4, // Max start requests per minute
  "requestsMinutesStartCount": 0, // Counter for start requests per minute
  "requestsMinutesStartLast": 1754680202594, // Start time as a timestamp from which counting begins
  "requestsMinutesStopMax": 4, // Max stop requests per minute
  "requestsMinutesStopCount": 0, // Counter for stop requests per minute
  "requestsMinutesStopLast": 1754680202594, // Start time as a timestamp from which counting begins
  "responseErrorLast10MinutesMax": 9, // Max requests per 10 minutes
  "responseErrorLast10MinutesCount": 2, // Counter for max requests per 10 minutes
  "responseErrorLast10MinutesLast": 1754680143652, // Start time as a timestamp from which counting begins
  "requestBlock": false, // True if a lock is active
  "requestBlockTime": 0, // Timestamp when the lock was triggered
  "requestReason": "No Block", // Name of the lock (internal adapter)
  "requests": [ // All requests per day
    {
      "methode": "GET", // Methode
      "haId": "0000", // Serial number
      "url": "/status", // URL
      "date": "2025-08-14T18:46:17.535Z", // TIme
      "response": "OK" // OK == Kein Fehler / Error == Fehler
    },
    {
      "methode": "GET",
      "haId": "015030396331009276",
      "url": "/settings",
      "date": "2025-08-14T18:46:17.536Z",
      "response": "OK"
    },
  ],
}
```

## Homeconnect.0.rateLimit.reason
```JSON
    "states": {
      "0": "Nothing", // No lock
      "1": "Error Limit (10 per 10 minutes)", // Error lock active for 10 minutes
      "2": "Start (5 per minute)", // Start lock active for 1 minute
      "3": "Stop Limit (5 per minute)", // Stop lock active for 1 minute
      "4": "Request Limit (50 per minute)", // Lock active for 1 minute
      "5": "Request Limit (1000 per day)" // Block for one day active
    }
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

**WORK IN PROGRESS**

- (Lucky-ESA) Fixed: Name of the objects are deleted

### 1.5.0 (2025-09-02)

- (Lucky-ESA) Clean up state roles and code
- (Lucky-ESA) Added rate limiting
- (Lucky-ESA) Dependencies updated
- (Lucky-ESA) Added language selection
- (Lucky-ESA) Migrated to ESLint 9
- (Lucky-ESA) Adapter requires js-controller >= 6.0.11 now
- (Lucky-ESA) Adapter requires admin >= 7.6.17 now
- (mcm1957) Adapter requires node.js >= 20 now

### 1.4.3 (2024-11-19)

- (TA2k) fix for -001 devices
- (simatec) Adapter has been adapted to meet Responsive Design rules.

### 1.4.2 (2024-10-25)

- (TA2k) fix for devices with object values

### 1.4.1 (2024-07-02)

- (foxriver76) fixed invalid min/max values

### 1.4.0 (2024-04-18)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 dna909 <dna909@googlemail.com>, TA2k

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