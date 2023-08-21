---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tinymqttbroker/README.md
title: ioBroker.tinymqttbroker
hash: cWrHtGghV+tWk8SBfeWecFwIkzPfwCU5Qv403t3MxWA=
---
![Логотип](../../../en/adapterref/iobroker.tinymqttbroker/admin/tinymqttbroker.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.tinymqttbroker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tinymqttbroker.svg)
![Количество установок](https://iobroker.live/badges/tinymqttbroker-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/tinymqttbroker-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tinymqttbroker.png?downloads=true)

# IoBroker.tinymqttbroker
**Тесты:** ![Тестируйте и выпускайте](https://github.com/HGlab01/ioBroker.tinymqttbroker/workflows/Test%20and%20Release/badge.svg)

## Адаптер tinymqttbroker для ioBroker
Это очень маленький брокер MQTT, который не управляет никакими объектами/состояниями в iobroker, но предлагает экземпляр центрального брокера MQTT для публикации тем подписки в качестве клиента MQTT. Очень полезно позволить нескольким устройствам общаться с одним брокером и взаимодействовать на iobroker с помощью javascript-клиента MQTT.

Клиент MQTT может выглядеть так

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

Для публикации сообщения я использую одно состояние ioBroker, прослушивающее любые изменения и отправляющее его брокеру.
Состояние ожидает JSON с «темой» и «сообщением».

```
on({ id: stateMqttIn, change: 'any' }, function (obj) {
    let input: any = obj.state.val;
    let topic: string = input.topic;
    let message: string = String(input.message);
    if (topic && message) client.publish(topic, message);
    else log(`MQTT publish not possible with topic '${topic}' and message '${message}'`,'warn');
});
```

ВАЖНЫЙ! Если вы создаете свой собственный клиент MQTT в javascript ioBroker, не забудьте закрыть клиент в скрипте с помощью

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