---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.simple-api/README.md
title: 简单的api
hash: txduiwaVbJHHCbM4ZG9+h/lYVF/17V9Qo6bz2ml5m9E=
---
![标识](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)

![安装数量](http://iobroker.live/badges/simple-api-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.simple-api.svg)

# 简单的api
![测试和发布](https://github.com/ioBroker/ioBroker.simple-api/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/simple-api/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

这是 RESTFul 接口，用于从 ioBroker 读取对象和状态，并通过 HTTP Get/Post 请求写入/控制状态。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

＃＃ 用法
调用浏览器 `http://ipaddress:8087/help` 以获取有关 API 的帮助。结果是：

```
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID?json",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID&prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&prettyPrint"
}
```

### GetPlainValue
调用例如：

`http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive`

结果：

`true`

此外，您可以使用查询键 `json` 来强制解析存储的值：

`http://ipaddress:8087/getPlainValue/javascript.0.value?json`

结果：

`{"a":1}`

如果没有 `json` 标志，结果将是

`"{\"a\": 1}"`

也可以使用一个更有用的标志，`noStringify`：

`http://ipaddress:8087/getPlainValue/javascript.0.stringValue?noStringify`

结果：

`VALUETEXT`

如果没有 `noStringify` 标志，结果将是

`"VALUETEXT"`

＃＃＃ 得到
呼叫例如：`http://ipaddress:8087/get/system.adapter.admin.0.alive`

结果：

```
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

或致电例如：

```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

结果：

```
{
  "val": true,
  "ack": true,
  "ts": 1442432238,
  "from": "system.adapter.admin.0",
  "lc": 1442431190,
  "expire": 28494,
  "_id": "system.adapter.admin.0.alive",
  "type": "state",
  "common": {
    "name": "admin.0.alive",
    "type": "boolean",
    "role": "indicator.state"
  },
  "native": {}
}
```

### 获取批量
通过一个请求获取多个状态，以请求中列表的顺序作为对象数组返回，以 id/val/ts 作为子对象返回

＃＃＃ 放
调用例如：

```
http://ipaddress:8087/set/javascript.0.test?value=1
```

结果：

```
{"id":"javascript.0.test","value":1}
```

或致电例如：

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint
```

结果：

```
{
  "id": "javascript.0.test",
  "value": 1
}
```

当然，数据点 `javascript.0.test` 必须存在。

此外，可以定义值的类型：

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string
```

也可以定义 ack 标志：

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true
```

### 切换
切换值：

- 布尔值：真 => 假，假 => 真
- 数量没有限制：x => 100-x
- 有限制的数字：x => max - (x - min)

### SetBulk
通过一个请求设置多个状态。此请求也支持 POST 方法，因为 POST 数据应该在正文中而不是在 URL 中。

### SetValueFromBody
允许设置由 POST 正文内容设置的给定状态的值。

### 对象
＃＃＃ 状态
＃＃＃ 搜索
是否在配置中设置了数据源（History、SQL），那么只列出数据源已知的数据点。
如果已激活“列出所有数据点”选项或未指定数据源，则将列出所有数据点。
Grafana JSON / SimpleJSON 插件需要此命令。

＃＃＃ 询问
如果已指定数据源（History、SQL），则在指定时间段内读取指定数据点的数据，否则仅读取当前值。
Grafana JSON / SimpleJSON 插件需要此命令。

＃＃＃ 帮助
返回 [这个](#usage) 输出

＃＃ 安装
```node iobroker.js add simple-api```

＃＃ 用法
假设我们没有安全措施，服务器在默认端口 8087 上运行。

对于所有查询，可以指定状态的名称或 ID。

对于每个返回 JSON 的请求，您可以设置参数 `prettyPrint` 以获取人类可读形式的输出。

如果启用了身份验证，则另外两个字段是必填字段：`?user=admin&pass=iobroker`

### GetPlainValue
将状态值读取为文本。您可以指定更多的 id 以分号分隔

```http://ip:8087/getPlainValue/admin.0.memHeapTotal```

```
  31.19
```

```http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed```

```
  31.19
  17.52
```

＃＃＃ 得到
将状态和状态的对象数据读取为 json。您可以指定更多以分号分隔的 id。
如果请求多个 ID，将返回 JSON 数组。

```http://localhost:8087/get/admin.0.memHeapTotal/?prettyPrint```

```
  {
    "val": 31.19,
    "ack": true,
    "ts": 1423154619,
    "from": "system.adapter.admin.0",
    "lc": 1423153989,
    "_id": "system.adapter.admin.0.memHeapTotal",
    "type": "state",
    "common": {
      "name": "admin.0.memHeapTotal",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  }
```

```http://ip:8087/get/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint```

```
  [
    {
      "val": 31.19,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423153989,
      "_id": "system.adapter.admin.0.memHeapTotal",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapTotal",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    },
    {
      "val": 16.25,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423154544,
      "_id": "system.adapter.admin.0.memHeapUsed",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapUsed",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    }
  ]
```

### 获取批量
使用时间戳读取更多 ID 的状态。您可以指定更多以分号分隔的 id。
JSON 数组将始终返回。

```http://ip:8087/getBulk/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint```

```
  {
      "admin.0.memHeapTotal": {
          "val": 31.19,
          "ts": 1423154754
      },
      "admin.0.memHeapUsed": {
          "val": 15.6,
          "ts": 1423154754
      }
  }
```

＃＃＃ 放
写入具有指定 ID 的状态。您可以以毫秒为单位指定 *wait* 选项以等待驱动程序的回答。

```http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&prettyPrint```

```{
       "id": "hm-rpc.0.IEQ12345.LEVEL",
       "value": 1
     }
```

```http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&wait=5000&prettyPrint```

```{
       "val": 1,
       "ack": true,
       "ts": 1423155399,
       "from": "hm-rpc.0.IEQ12345.LEVEL",
       "lc": 1423155399
     }
```

如果在指定时间内没有收到答复，将返回 `null` 值。
在第一种情况下，答案将立即返回并且 `ack` 为假。在第二种情况下 `ack` 为真。这意味着这是来自司机的回应。

### SetBulk
- 在一个请求中写入大量 ID。

```http://ip:8087/setBulk?hm-rpc.0.FEQ1234567:1.LEVEL=0.7&Anwesenheit=0&prettyPrint```

```
  [
    {
      "id": "hm-rpc.0.FEQ1234567:1.LEVEL",
      "val": "0.7"
    },
    {
      "error": "error: datapoint \"Anwesenheit\" not found"
    }
  ]
```

您也可以将此请求作为 POST 发送。

### 对象
获取模式的所有对象的列表。如果没有模式将所有对象指定为 JSON 数组，则将返回。

```http://ip:8087/objects?prettyPrint```

```
  {
  "system.adapter.admin.0.uptime": {
    "_id": "system.adapter.admin.0.uptime",
    "type": "state",
    "common": {
      "name": "admin.0.uptime",
      "type": "number",
      "role": "indicator.state",
      "unit": "seconds"
    },
    "native": {}
  },
  "system.adapter.admin.0.memRss": {
    "_id": "system.adapter.admin.0.memRss",
    "type": "state",
    "common": {
      "name": "admin.0.memRss",
      "desc": "Resident set size",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  },
  ...
```

获取适配器 system.adapter.admin.0 的所有控制对象：

```http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint```

```
    {
    "system.adapter.admin.0.uptime": {
      "_id": "system.adapter.admin.0.uptime",
      "type": "state",
      "common": {
        "name": "admin.0.uptime",
        "type": "number",
        "role": "indicator.state",
        "unit": "seconds"
      },
      "native": {}
    },
    ...

```

＃＃＃ 状态
获取模式的所有状态的列表。如果没有模式将所有状态指定为 JSON 数组，则将返回。

```http://ip:8087/states?prettyPrint```

```
  {
    "system.adapter.admin.0.uptime": {
      "val": 32176,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156164
    },
    "system.adapter.admin.0.memRss": {
      "val": 41.14,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156119
    },
    "system.adapter.admin.0.memHeapTotal": {
      "val": 31.19,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423155084
    },
  ...
```

获取适配器 system.adapter.admin.0 的所有控制对象：

```http://ip:8087/states?pattern=system.adapter.admin.0*&prettyPrint```

```
    {
      "system.adapter.admin.0.uptime": {
        "val": 32161,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.memRss": {
        "val": 41.14,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156119
      },
      "system.adapter.admin.0.memHeapTotal": {
        "val": 31.19,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423155084
      },
      "system.adapter.admin.0.memHeapUsed": {
        "val": 19.07,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.connected": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28100
      },
      "system.adapter.admin.0.alive": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28115
      }
    }
```

＃＃＃ 搜索
是否在配置中设置了数据源（History、SQL），那么只列出数据源已知的数据点。
如果已激活“列出所有数据点”选项或未指定数据源，则将列出所有数据点。

```
http://ip:8087/search?pattern=system.adapter.admin.0*&prettyPrint
```

```
  {
    "system.adapter.admin.0.outputCount",
    "system.adapter.admin.0.inputCount",
    "system.adapter.admin.0.uptime",
    "system.adapter.admin.0.memRss",
    "system.adapter.admin.0.memHeapTotal",
    "system.adapter.admin.0.memHeapUsed",
    "system.adapter.admin.0.cputime",
    "system.adapter.admin.0.cpu",
    "system.adapter.admin.0.connected",
    "system.adapter.admin.0.alive"
  }
```

＃＃＃ 询问
如果已指定数据源（History、SQL），则在指定时间段内读取来自指定数据点的数据。

```http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&dateFrom=2019-06-08T01:00:00.000Z&dateTo=2019-06-08T01:00:10.000Z```

```
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.12,
          1559955600000
        ],
        [
          0.46,
          1559955601975
        ],
        [
          0.44,
          1559955610000
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          23.01,
          1559955600000
        ],
        [
          22.66,
          1559955601975
        ],
        [
          22.69,
          1559955610000
        ]
      ]
    }
  ]
```

如果未指定数据源或传递 noHistory 参数，则仅读出数据点的当前值。

```http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&noHistory=true```

```
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.58,
          1559970500342
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          21.53,
          1559970500342
        ]
      ]
    }
  ]
```

<!-- 下一版本的占位符（在行首）：

### __工作正在进行中__ -->

## Changelog
### 2.6.2 (2021-11-12)
* (bluefox) Support of new flags for `getPlainValue`: `json` and `noStringify`

### 2.6.1 (2021-05-13)
* (Apollon77) Catch error in request parsing when malformed (Sentry IOBROKER-SIMPLE-API-16)

### 2.6.0 (2021-05-09)
* (Apollon77) Also URL-Decode the path parts like state ids
* (Apollon77) Optimize for js-controller 3.3

### 2.5.3 (2021-01-25)
* (Apollon77) Make sure that delayed answers are not crashing (Sentry IOBROKER-SIMPLE-API-Z)

### 2.5.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 2.4.8 (2020-09-17)
* (Apollon77) Make sure missing favico file locally is not throwing exceptions (Sentry IOBROKER-SIMPLE-API-G)

### 2.4.7 (2020-08-17)
* (Apollon77) check that targets are an array for "query" requests (Sentry IOBROKER-SIMPLE-API-F)

### 2.4.6 (2020-06-11)
* (Apollon77) Make sure adapter is showing correct error when webserver can not be initialized (Sentry IOBROKER-SIMPLE-API-7)

### 2.4.5 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with imvalid certificates

### 2.4.4 (2020-05-02)
* (Apollon77) Make sure Permission errors do not crash adapter (Sentry IOBROKER-SIMPLE-API-3)

### 2.4.3 (2020-04-30)
* (Apollon77) Optimize web server error handling

### 2.4.1 (2020-04-23)
* (bluefox) Caught the web server errors

### 2.4.0 (2020-04-12)
* (Apollon77) Add Sentry support with js-controller 3.0
* (Apollon77) fix potential crash

### 2.3.3 (2019-11-16)
* (bluefox) Added response code for unknown commands

### 2.3.2 (2019-10-18)
* (Apollon77) Fix Admin 3 support

### 2.3.1 (2019-10-12)
* (bluefox) Admin 3 is now supported
* (bluefox) NPM packages were updated

### 2.2.0 (2019-09-10)
* (bluefox) New flags are supported: ack and type
* (bluefox) Return error codes as JSON if no pretty print defined

### 2.1.2 (2019-09-05)
* (Apollon77) fix compact mode

### 2.1.0 (2019-07-05)
* (Marco.K) Added command set for the Grafana plugins JSON / SimpleJSON. Usage see https://forum.iobroker.net/topic/23033/aufruf-modifikation-simpleapi-adapter-iobroker-als-datenquelle-f%C3%BCr-grafana

### 2.0.5 (2019-06-26)
* (Apollon77) remove logging

### 2.0.4 (2019-06-23)
* (Apollon77) fix usage as web extension

### 2.0.2 (2018-12-17)
* (Apollon77) fix decoding for state Ids with # in it

### 2.0.0 (2018-06-29)
* (Giermann) BREAKING CHANGE: getBulk is returning data in a different structure

### 1.6.3 (2018-04-15)
* (Apollon77) Return used character encoding (UTF-8)

### 1.6.2 (2017-11-27)
* (Apollon77) Fix decoding problems

### 1.6.1 (2017-09-25)
* (Apollon77) Fix statuscode for setBulk and optimize permission errors

### 1.6.0 (2017-07-10)
* (Apollon77) Fix handling of URL-encoded values, they are now decoded properly
* (Apollon77) Optimize Permission handling
* (Apollon77) add possibility to only allow access to states where user is also owner, finally works correct with js-controller 1.1.1!

### 1.5.0 (2017-03-10)
* (greyhound) Add new POST method setValueFromBody

### 1.4.0 (2017-01-05)
* (bluefox) new web server plugin support

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.1.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.1.0 (2016-02-09)
* (bluefox) fix toggle, objects, states, setBulk, POST
* (bluefox) add tests

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.1.2 (2015-06-28)
* (bluefox) add description in readme.md
* (bluefox) change "toggle" for boolean and numbers

### 0.1.1 (2015-06-28)
* (bluefox) change setForeignState api
* (bluefox) add type to io-package.json
* (bluefox) enable run from "web"
* (bluefox) add default user

### 0.1.0 (2015-06-10)
* (bluefox) change setForeignState api
* (bluefox) support of user permissions

### 0.0.4 (2015-03-11)
* (bluefox) remove socket.io from file

### 0.0.3 (2015-02-13)
* (bluefox) remove socket.io from dependencies

### 0.0.2 (2015-02-12)
* (bluefox) enable be a part of "web"

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2021 bluefox <dogafox@gmail.com>

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