![Logo](admin/tinymqttbroker.png)
# ioBroker.tinymqttbroker

[![NPM version](https://img.shields.io/npm/v/iobroker.tinymqttbroker.svg)](https://www.npmjs.com/package/iobroker.tinymqttbroker)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tinymqttbroker.svg)](https://www.npmjs.com/package/iobroker.tinymqttbroker)
![Number of Installations](https://iobroker.live/badges/tinymqttbroker-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/tinymqttbroker-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.tinymqttbroker.png?downloads=true)](https://nodei.co/npm/iobroker.tinymqttbroker/)

**Tests:** ![Test and Release](https://github.com/HGlab01/ioBroker.tinymqttbroker/workflows/Test%20and%20Release/badge.svg)

## tinymqttbroker adapter for ioBroker

This is very tiny MQTT broker which is not managing any objects/states in iobroker but offers a central MQTT broker instance to publish an subscribe topics as MQTT client. Very helpful to let several devices to talk with one broker and interact on iobroker with a MQTT client javascript.

A MQTT client could look like
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

For publishing message I use one ioBroker state listening for any changes and pushing it to the broker.
The state expects a JSON with 'topic' and 'message'.
```
on({ id: stateMqttIn, change: 'any' }, function (obj) {
    let input: any = obj.state.val;
    let topic: string = input.topic;
    let message: string = String(input.message);
    if (topic && message) client.publish(topic, message);
    else log(`MQTT publish not possible with topic '${topic}' and message '${message}'`,'warn');
});
```
IMPORTANT! If you create your own MQTT client in a ioBroker javascript, do not forget to close the client in the scipt by using
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
