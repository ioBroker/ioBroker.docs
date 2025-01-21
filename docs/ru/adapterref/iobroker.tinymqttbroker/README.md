---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tinymqttbroker/README.md
title: ioBroker.tinymqttbroker
hash: +4BEYBju93eii2cAjZxbr+S6XLLuzNLxSM8pDCE4O68=
---
![Логотип](../../../en/adapterref/iobroker.tinymqttbroker/admin/tinymqttbroker.png)

![Текущая версия в стабильном репозитории](https://iobroker.live/badges/tinymqttbroker-stable.svg)
![версия НПМ](https://img.shields.io/npm/v/iobroker.tinymqttbroker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tinymqttbroker.svg)
![Количество установок](https://iobroker.live/badges/tinymqttbroker-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.tinymqttbroker.png?downloads=true)

# IoBroker.tinymqttbroker
![Тест и выпуск](https://github.com/HGlab01/ioBroker.tinymqttbroker/workflows/Test%20and%20Release/badge.svg) [![Статус FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker?ref=badge_shield&issueType=license)

## Адаптер tinymqttbroker для ioBroker
Это очень маленький брокер MQTT, который не управляет никакими объектами/состояниями в iobroker, но предлагает центральный экземпляр брокера MQTT для публикации тем подписки в качестве клиента MQTT. Очень полезно, чтобы позволить нескольким устройствам общаться с одним брокером и взаимодействовать на iobroker с клиентом MQTT javascript.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Требует
* Node.js 20 или выше
* ioBroker хост (js-контроллер) 5.0 или выше

## Как это использовать
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

Для публикации сообщения я использую одно состояние ioBroker, которое отслеживает любые изменения и отправляет их брокеру.
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

ВАЖНО! Если вы создаете свой собственный клиент MQTT в ioBroker javascript, не забудьте закрыть клиент в scipt с помощью

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