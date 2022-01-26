---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iogopro/README.md
title: ioBroker.iogopro
hash: PLPDqGY4SCLSFRMMIZKWZJwVEk3Fx86a5KTvwek6Arg=
---
![Логотип](../../../en/adapterref/iobroker.iogopro/admin/iogopro.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.iogopro.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iogopro.svg)
![Количество установок (последнее)](https://iobroker.live/badges/iogopro-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/iogopro-stable.svg)
![Статус зависимости](https://img.shields.io/david/nisiode/iobroker.iogopro.svg)
![НПМ](https://nodei.co/npm/iobroker.iogopro.png?downloads=true)

# IoBroker.iogopro
** Испытания: ** ![Тестирование и выпуск](https://github.com/nisiode/ioBroker.iogopro/workflows/Test%20and%20Release/badge.svg)

## Адаптер iogopro для ioBroker
Этот адаптер подключает ioBroker к мобильному приложению ioGo PRO https://play.google.com/store/apps/details?id=de.nisnagel.iogopro.
Посетите www.iogo.app для получения дополнительной информации о том, как начать работу.

## Конфигурация
Для этого адаптера вам понадобится действующий api-secret, который вы можете сгенерировать в приложении ioGO-PRO.

## Состояния
Все состояния основаны на роли и текущем значении, отображаемом интуитивно понятным значком.
Список всех доступных отображенных значков доступен здесь: [icons.png](https://github.com/nisiode/ioBroker.iogopro/blob/342d92454401fdf93f6ebae0e6a12ccef68ee1b5/img/icons.png)

## Использование
Вы можете отправить сообщение всем авторизованным пользователям через messageBox `sendTo('iogo', 'New message')` или конкретному пользователю `sendTo('iogo', {user: 'Username', text: 'Test message'})`.
Пользователь должен быть создан раньше (подробности см. В документации к приложению).

Можно указать более одного получателя (просто разделите имена пользователей запятыми). Например: Получатель: «Пользователь1, Пользователь4, Пользователь5».

Пример отправки настроенного сообщения уведомления с помощью javascript:

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

И один пример с блочным:

![блочно](../../../en/adapterref/iobroker.iogopro/img/blockly.png)

Также поддерживаются обратные вызовы:

```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Просто отправьте путь к вашему изображению вместо текста или используйте атрибут url `sendTo('iogo.0', 'absolute/path/file.png')`

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

** Возможные варианты **:

- `user`: один пользователь или список пользователей.
- `text`: само сообщение
- `title`: заголовок уведомления.
- `url`: Абсолютный путь к изображению.
- `expiry`: время истечения в секундах

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.5 (2021-10-27)
* (nis) Automatisches Löschen von Locations

### 0.2.4 (2021-10-18)
* (nis) simplify admin ui for blocked enums

### 0.2.2 (2021-10-04)
* (nis) change sync of enum member changes

### 0.2.1 (2021-09-21)
* (nis) bugfix blocked enums

### 0.2.0 (2021-09-21)
* (nis) sync states only when value has changed
* (nis) added list of blocked enums to instance config

### 0.1.0 (2021-09-12)
* (nis) migrate current state from ioBroker.iogo

### 0.0.1 (2021-08-29)
* (nis) initial release

## License
MIT License

Copyright (c) 2021 nis <info@iogo.app>

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