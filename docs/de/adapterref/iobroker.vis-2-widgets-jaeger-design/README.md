---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md
title: Material-Widgets für ioBroker.vis 2.0
hash: tVGv+9zUgAVG739WJpAvkSTHy2J+xcFdzQqdNogjTsc=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-jaeger-design.png?downloads=true)

# Material-Widgets für ioBroker.vis 2.0
##Widgets
### Knöpfe und Schalter
### Aktuelle Nachrichten
![Aktuelle Nachrichten](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/news.png)

Um dieses Widget zu verwenden, müssen Sie ein kleines Skript im Javascript-Adapter erstellen:

```
const axios = require('axios');

function readRss() {
    axios('https://www.n-tv.de/rss')
        .then(resp => setState('javascript.0.rss', resp.data.toString(), true));
}

createState('javascript.0.rss', {type: 'string'}, () => {
    setInterval(() => readRss(), 60000 * 60 * 2); // update rss every 2 hours
    readRss();
});
```

Und dann verwenden Sie das Objekt `javascript.0.rss` in diesem Widget.

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 0.2.1 (2023-02-03)
* (bluefox) Mobile views tuned

### 0.2.0 (2023-02-01)
* (bluefox) implemented mobile view

### 0.1.3 (2023-01-30)
* (bluefox) initial commit

## License
Copyright (c) 2022-2023 bluefox <dogafox@gmail.com>
All rights reserved.