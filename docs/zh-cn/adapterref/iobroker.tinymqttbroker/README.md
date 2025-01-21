---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tinymqttbroker/README.md
title: ioBroker.tinymqttbroker
hash: +4BEYBju93eii2cAjZxbr+S6XLLuzNLxSM8pDCE4O68=
---
![标识](../../../en/adapterref/iobroker.tinymqttbroker/admin/tinymqttbroker.png)

![稳定存储库中的当前版本](https://iobroker.live/badges/tinymqttbroker-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.tinymqttbroker.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tinymqttbroker.svg)
![安装数量](https://iobroker.live/badges/tinymqttbroker-installed.svg)
![新平台](https://nodei.co/npm/iobroker.tinymqttbroker.png?downloads=true)

# IoBroker.tinymqttbroker
![测试与发布](https://github.com/HGlab01/ioBroker.tinymqttbroker/workflows/Test%20and%20Release/badge.svg) [![FOSSA 状态]（https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker.svg?type=shield&issueType=license）](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker?ref=badge_shield&issueType=license)

## 用于 ioBroker 的 tinymqttbroker 适配器
这是非常小的 MQTT 代理，它不管理 iobroker 中的任何对象/状态，但提供了一个中央 MQTT 代理实例，以 MQTT 客户端的身份发布订阅主题。非常有助于让多个设备与一个代理对话，并通过 MQTT 客户端 javascript 在 iobroker 上进行交互。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

## 需要
* Node.js 20 或更高版本
* ioBroker 主机 (js-controller) 5.0 或更高版本

如何使用
MQTT 客户端可能看起来像

```
const mqtt = require('mqtt');
const protocol = 'mqtt';
const host = 'localhost';
const portClient = 1884;

const clientId = `iobroker_mqtt_client_` + Math.floor(Math.random() * 100000 + 100000);
const connectUrl = `${protocol}://${host}:${portClient}`;
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 10000
})

const topics = ['topic1', 'topic2', 'topic3];
client.on('connect', () => {
    client.subscribe(topics, () => {
        console.log(`MQTT client says: Connected and subscribe to topics '${topics}'`)
    })
})

client.on('message', (topic: string, payload) => {
    payload = payload.toString();
    // deal as you need with topics and payload here
    // 'switch' could be helpful
    switch (topic) {
        case 'topic1':
            //your code
            break;
        case 'topic2':
            //your code
            break;
})
```

为了发布消息，我使用一个 ioBroker 状态来监听任何更改并将其推送到代理。
状态需要包含“主题”和“消息”的 JSON。

```
on({ id: stateMqttIn, change: 'any' }, function (obj) {
    let input: any = obj.state.val;
    let topic: string = input.topic;
    let message: string = String(input.message);
    if (topic && message) client.publish(topic, message);
    else log(`MQTT publish not possible with topic '${topic}' and message '${message}'`,'warn');
});
```

重要提示！如果您在 ioBroker javascript 中创建自己的 MQTT 客户端，请不要忘记使用以下命令在脚本中关闭客户端

```
onStop(function (callback) {
    log('MQTT Client will be closed...');
    client.end(() => {
        if (callback) {
            callback();
            log('MQTT Client closed');
        }
    })
}, 2000 /*ms*/);
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.3 (2024-10-19)
* (HGlab01) Improve port scan for available ports
* (HGlab01) Improve UI config
* (HGlab01) Bump json-explorer to 0.1.16
* (HGlab01) Bump aedes to 0.51.3

### 0.1.1 (2024-02-01)
* (HGlab01) Bump json-explorer to 0.1.15
* (HGlab01) Bump aedes to 0.51.0

### 0.1.0 (2023-12-04)
* (HGlab01) first minor release
* (HGlab01) Node.js 18.0 or higher
* (HGlab01) ioBroker host (js-controller) 5.0 or higher

### 0.0.8 (2023-10-09)
* (HGlab01) Bump json-explorer to 0.1.14

### 0.0.7 (2023-10-05)
* (HGlab01) add logs for "address already in use"-issue

### 0.0.6 (2023-09-18)
* (HGlab01) Improve error handling
* (HGlab01) Verify if port is used from other process

### 0.0.5 (2023-09-11)
* (HGlab01) add sentry support

### 0.0.4(2023-06-30)
* (HGlab01) first release

## License
MIT License

Copyright (c) 2025 HGlab01 <myiobrokeradapters@gmail.com>

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

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker?ref=badge_large&issueType=license)