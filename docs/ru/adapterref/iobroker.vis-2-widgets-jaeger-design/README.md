---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md
title: Виджеты материалов для ioBroker.vis 2.0
hash: tVGv+9zUgAVG739WJpAvkSTHy2J+xcFdzQqdNogjTsc=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-2-widgets-jaeger-design.png?downloads=true)

# Материальные виджеты для ioBroker.vis 2.0
## Виджеты
### Кнопки и переключатели
### Актуальные новости
![Актуальные новости](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/news.png)

Чтобы использовать этот виджет, вам нужно создать небольшой скрипт в адаптере Javascript:

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

А затем используйте объект `javascript.0.rss` в этом виджете.

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

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