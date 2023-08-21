---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tinymqttbroker/README.md
title: ioBroker.tinymqttbroker
hash: cWrHtGghV+tWk8SBfeWecFwIkzPfwCU5Qv403t3MxWA=
---
![标识](../../../en/adapterref/iobroker.tinymqttbroker/admin/tinymqttbroker.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.tinymqttbroker.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tinymqttbroker.svg)
![安装数量](https://iobroker.live/badges/tinymqttbroker-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/tinymqttbroker-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.tinymqttbroker.png?downloads=true)

# IoBroker.tinymqttbroker
**测试：** ![测试与发布](https://github.com/HGlab01/ioBroker.tinymqttbroker/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的tinymqttbroker 适配器
这是一个非常小的 MQTT 代理，它不管理 iobroker 中的任何对象/状态，但提供一个中央 MQTT 代理实例来作为 MQTT 客户端发布订阅主题。让多个设备与一个代理通信并使用 MQTT 客户端 JavaScript 在 iobroker 上进行交互非常有帮助。

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

为了发布消息，我使用一个 ioBroker 状态来侦听任何更改并将其推送到代理。
状态需要一个包含“主题”和“消息”的 JSON。

```
on({ id: stateMqttIn, change: 'any' }, function (obj) {
    let input: any = obj.state.val;
    let topic: string = input.topic;
    let message: string = String(input.message);
    if (topic && message) client.publish(topic, message);
    else log(`MQTT publish not possible with topic '${topic}' and message '${message}'`,'warn');
});
```

重要的！如果您在 ioBroker javascript 中创建自己的 MQTT 客户端，请不要忘记使用以下命令在 scipt 中关闭客户端

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
### 0.0.5-alpha.0 (2023-07-03)
* (HGlab01) first release

## License
MIT License

Copyright (c) 2023 HGlab01 <iobroker.followthesun@gmail.com>

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