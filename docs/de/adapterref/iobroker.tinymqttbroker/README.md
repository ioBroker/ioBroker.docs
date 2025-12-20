---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tinymqttbroker/README.md
title: ioBroker.tinymqttbroker
hash: QfKSqlGftbJyv0MlEm0qUNwcfEF1jai3/FY+3jQYAzI=
---
![Logo](../../../en/adapterref/iobroker.tinymqttbroker/admin/tinymqttbroker.png)

![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tinymqttbroker-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tinymqttbroker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tinymqttbroker.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tinymqttbroker-installed.svg)
![NPM](https://nodei.co/npm/iobroker.tinymqttbroker.png?downloads=true)

# IoBroker.tinymqttbroker
![Test und Freigabe](https://github.com/HGlab01/ioBroker.tinymqttbroker/workflows/Test%20and%20Release/badge.svg) [![FOSSA-Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.tinyMQTTbroker?ref=badge_shield&issueType=license)

## Tinymqttbroker-Adapter für ioBroker
Dies ist ein sehr kleiner MQTT-Broker, der keine Objekte/Zustände in iobroker verwaltet, sondern eine zentrale MQTT-Broker-Instanz zum Veröffentlichen und Abonnieren von Themen als MQTT-Client bereitstellt. Er ist sehr hilfreich, um mehreren Geräten die Kommunikation mit einem Broker und die Interaktion über iobroker mit einem MQTT-Client-JavaScript zu ermöglichen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* Node.js 20 oder höher
* ioBroker-Host (js-Controller) 5.0 oder höher

## Wie man es benutzt
Ein MQTT-Client könnte wie folgt aussehen:

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

Zum Veröffentlichen von Nachrichten wird ein dedizierter ioBroker-Status verwendet, der Änderungen überwacht und diese an den MQTT-Broker weiterleitet.
Der Status erwartet eine JSON-Nutzlast, die Thema und Nachricht enthält.

```
on({ id: stateMqttIn, change: 'any' }, function (obj) {
    const input: any = obj.state.val;
    const topic: string = input?.topic ?? null;
    const message: string = String(input?.message) ?? null;
    if (topic && message) client.publish(topic, message);
    else log(`MQTT publish not possible for topic '${topic}' and message '${message}'`, 'warn');
});
```

WICHTIG! Wenn Sie Ihren eigenen MQTT-Client in einem ioBroker-JavaScript-Skript implementieren, stellen Sie sicher, dass Sie den Client am Ende des Skripts ordnungsgemäß schließen, indem Sie Folgendes aufrufen:

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
### **WORK IN PROGRESS**
* (HGlab01) Update libs
* (HGlab01) (c) 2026

### 0.1.4 (2025-04-22)
* (HGlab01) Improve port scan

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

Copyright (c) 2026 HGlab01 <myiobrokeradapters@gmail.com>

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