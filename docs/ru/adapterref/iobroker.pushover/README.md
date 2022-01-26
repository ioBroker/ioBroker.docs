---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pushover/README.md
title: Адаптер ioBroker pushover
hash: 8uVUvVWDJ0tLUQJQXXAaaPEfh0TOt1FQ6IXV3kwF0lY=
---
![Логотип](../../../en/adapterref/iobroker.pushover/admin/pushover.png)

![Количество установок](http://iobroker.live/badges/pushover-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.pushover.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pushover.svg)

# IoBroker pushover Adapter
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.pushover/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/pushover/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Отправляйте пустые уведомления от ioBroker.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Конфигурация
Сначала требуется аккаунт на пустяке.
![Конфигурация Pushover](../../../en/adapterref/iobroker.pushover/img/Screen0.png)

![Токен API](../../../en/adapterref/iobroker.pushover/img/Screen1.png)

![Групповой токен](../../../en/adapterref/iobroker.pushover/img/Screen3.png)

## Применение
Чтобы отправить уведомление из ScriptEngine, просто напишите:

```
// send notification to all instances of pushover adapter
sendTo("pushover", "message body");

// send notification to specific instance of pushover adapter
sendTo("pushover.1", "message body");

// To specify subject or other options
sendTo("pushover", {
   message:  'Test text', // mandatory - your text message
   title:    'SweetHome', // optional  - your message's title, otherwise your app's name is used
   sound:    'magic',     // optional  - the name of one of the sounds supported by device clients to override the user's default sound choice
                          //    pushover, bike, bugle, cashregister, classical, cosmic, falling,
                          //    gamelan, incoming, intermission, magic, mechanical, pianobar, siren,
                          //    spacealarm, tugboat, alien, climb, persistent, echo, updown, none
   priority: -1,          // optional
                          //    -1 to always send as a quiet notification,
                          //    1 to display as high-priority and bypass the user's quiet hours, or
                          //    2 to also require confirmation from the user
   token: 'API/KEY token' // optional
                          // add other than configured token to the call
   url,                   // optional  - a supplementary URL to show with your message
   url_title,             // optional  - a title for your supplementary URL, otherwise just the URL is shown
   device,                // optional  - your user's device name to send the message directly to that device, rather than all of the user's devices
   timestamp              // optional  - a Unix timestamp of your message's date and time to display to the user, rather than the time your message is received by our API
   html                   // optional  - 1 to enable parsing of HTML formatting for bold, italic, underlined and font color
   monospace              // optional  - 1 to display the message in monospace font
                          //    either html or monospace is allowed
   file:                  '/opt/picture.png', // optional - attachment
   file:                  { name: '/opt/picture.png', data: fs.readFileSync('/opt/picture.png') }, // optional - attachment
});

// Example for HTML format in the message
sendTo("pushover", {
    message: 'This message includes <b>bold</b>, <i>italic</i> and <u>underlined</u> text <font color=green>in</font> <font color=#ffa500>different</font> <font color=red>colors</font>.',
    html:    1
});

// Example for monospace font in the message
sendTo("pushover", {
    message:   'This message is in monospace font.',
    monospace: 1
});

```

## Взгляд
С помощью Pushover's Glances вы можете отправлять небольшие фрагменты данных прямо на постоянно обновляемый экран, называемый виджетом, например, усложнение на ваших умных часах или виджет на экране блокировки вашего телефона.

```
sendTo("pushover", "glances", {
   message:  'Test text',    // mandatory - (100 characters) - the main line of data, used on most screens
   title:    'SweetHome',    // optional  - (100 characters) - a description of the data being shown, such as "Widgets Sold"
   token:    'API/KEY token' // optional  - add other than configured token to the call
   subtext:  'Second line',  // optional  - (100 characters) - a second line of data
   count:    3,              // optional  - (integer, may be negative) - shown on smaller screens; useful for simple counts
   percent:   90,            // optional  - (integer 0 through 100, inclusive) - shown on some screens as a progress bar/circle
   device:   'DEVICE_NAME',  // optional  - a user's device name to restrict messages to the widget on that device, otherwise leave blank to send messages to all available widgets of that user
});
```

Вы можете использовать блочно с именем `glances` для отправки сообщения из `blockly`.

## Что такое Sentry и что передается на серверы?
Sentry.io - это способ для разработчиков получить обзор ошибок в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется на наш собственный сервер Sentry, расположенный в Германии. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш установочный идентификатор (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 2.0.5 (2021-06-29)
* (bluefox) Corrected error with token

### 2.0.4 (2021-06-28)
* (dipts) Blockly input value for attachments
* (bluefox) implemented the "glances"

### 2.0.3 (2020-09-25)
* (klein0r) Removed spaces in the admin config dropdown

### 2.0.2 (2020-04-29)
* (Apollon77) fixes case that token is not defined/existing (Sentry IOBROKER-PUSHOVER-2)

### 2.0.1 (2020-04-24)
* (bluefox) Fixed error in the blockly if language was not "ru/en/de"
* (bluefox) Breaking change: the encryption of the password was changed, so the token must be entered anew. Store your token before update.

### 1.3.2 (2020-04-17)
* (Apollon77) add Error handler to not crash adapter (fixes Sentry IOBROKER-PUSHOVER-1)

### 1.3.0 (2020-04-12)
* (Apollon77) Fix token decryption and add compatibility to js-controller 3.0
* (Apollon77) Add Sentry (used in js-controller 3.0)

### 1.2.3 (2020-02-19)
* (bluefox) Token will be encrypted now.

### 1.2.0 (2020-02-03)
* (bluefox) Removed the getMessages call.

### 1.1.1 (2019-09-18)
* (Apollon77) js-controller 2.0 compatibility, dependency updates

### 1.1.0 (2018-09-02)
* (bluefox) Admin3 is supported now

### 1.0.4 (2017-10-22)
* (janhuddel) callback is now possible (to receive the receipt from pushover if you use priority = 2)

### 1.0.3 (2017-10-21)
* (Tan-DE) Change priorities in blockly

### 1.0.2 (2016-10-12)
* (bluefox) support of blockly

### 1.0.1 (2016-08-28)
* (bluefox) filter out double messages

### 1.0.0 (2016-06-01)
* (bluefox) fix timestamp
* (bluefox) update grunt packages

### 0.1.1 (2015-05-03)
* (bluefox) add readme link

### 0.1.0 (2015-01-03)
* (bluefox) enable npm install

### 0.0.4 (2014-11-22)
* (bluefox) support of new naming concept

### 0.0.3 (2014-10-08)
* (bluefox) add "daemon" mode to "subscribe"

## License

The MIT License (MIT)

Copyright (c) 2014-2021 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.