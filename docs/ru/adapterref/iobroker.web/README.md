---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: nCZZ/tiSV0rJFdTKBfL+MhLVzVYnIIHqOk4a61i472Q=
---
![Логотип](../../../en/adapterref/iobroker.web/admin/web.png)

![Количество установок](http://iobroker.live/badges/web-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.web.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Веб-сервер на базе Node.js и экспресс для чтения файлов из БД ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Настройка веб-сокетов
На некоторых клиентах веб-сокетов возникают проблемы с производительностью связи.
Иногда эта проблема возникает из-за отказа связи сокета.io в механизме длинного опроса.
Вы можете установить параметр *Force Web-Sockets*, чтобы принудительно использовать только транспорт веб-сокетов.

## Давайте зашифруем сертификаты
Прочтите [здесь](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Расширения
Веб-драйвер поддерживает расширения.
Расширение представляет собой обработчик URL-адресов, который будет вызываться при появлении такого URL-запроса.
Расширения выглядят как обычный адаптер, но у них нет запущенных процессов, и они будут вызываться веб-сервером.

Например, пользователь может активировать специальный прокси-адаптер и получить доступ к другим устройствам (например, веб-камерам) на том же веб-сервере.
Необходимо, чтобы все сервисы были доступны на одном веб-сервере.

Веб-расширение может и должно поддерживать функцию `unload`, которая может возвращать `promise`, если действие выгрузки займет некоторое время.

Подробнее о веб-расширениях можно прочитать [здесь](WEB-EXTENSIONS-HOWTO.md).

## Защита от грубой силы
Если аутентификация включена и пользователь вводит неверный пароль 5 раз в течение одной минуты, ему придется подождать не менее одной минуты до следующей попытки.
После 15-й неверной попытки пользователь должен подождать 1 час.

## Опция «Оставаться в системе»
Если выбран этот параметр, пользователь остается в системе в течение одного месяца.
В противном случае пользователь останется в системе в течение настроенного «тайм-аута входа».

## Доступ к значениям состояния
Вы можете получить доступ к значениям нормального и двоичного состояния через HTTP-запрос на получение.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

или

```
http://IP:8082/state/javascript.picture.png =>
[IMAGE]
```

Изображение должно быть записано в адаптере javascript, например:

```
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

## Опция «Базовая аутентификация»
Разрешает вход через базовую аутентификацию, отправляя `401` Неавторизованный с заголовком `WWW-Authenticate`.
Это можно использовать для таких приложений, как *FullyBrowser*. Если вы введете неправильные учетные данные один раз, вы будете перенаправлены на страницу входа.

## Список пользователей
Вы можете определить список пользователей, которые могут получить доступ к веб-серверу. Вы можете изменить права доступа для вошедшего в систему пользователя.

Если пользователя нет в списке, он не сможет получить доступ к веб-серверу.

Проще задать для каждого объекта и каждого состояния права доступа конкретного пользователя.

## Расширенные настройки
### Перенаправление по умолчанию
Если при открытии веб-порта в браузере не должен отображаться выбор приложения, а только какое-то конкретное приложение, здесь можно указать путь (например, `/vis/`), чтобы этот путь был открыт автоматически.

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 6.2.1 (2023-12-04)
* (bluefox) Added the user access list option

### 6.1.10 (2023-10-16)
* (bluefox) Corrected the start screen

### 6.1.7 (2023-10-16)
* (bluefox) Added the public accessibility check

### 6.1.6 (2023-10-13)
* (bluefox) Corrected adapter termination if the alias has no target
* (bluefox) Corrected socket.io connection

### 6.1.4 (2023-10-08)
* (foxriver76) upgrade socketio and ws dependencies to fix vis subscribe problem

### 6.1.3 (2023-09-28)
* (bluefox) upgraded socketio and ws dependencies to correct the error by unsubscribing on client disconnect

### 6.1.2 (2023-09-14)
* (foxriver76) upgraded socketio and ws dependencies

### 6.1.1 (2023-09-05)
* (mcm1957) Added missing node16 requirement

### 6.1.0 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 6.0.3 (2023-07-27)
* (bluefox) Updated packages
* (bluefox) Implemented the possibility to view folder content

### 6.0.1 (2023-03-20)
* (bluefox) Removed letsencrypt handling from web adapter

### 5.5.3 (2023-03-17)
* (bluefox) Increased max size of the uploaded file via socket.io to 200MB (from 10MB)

### 5.5.2 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 5.5.1 (2023-02-25)
* (bluefox) Allowed reading projects of vis-2-beta

### 5.5.0 (2023-02-15)
* (bluefox) Added special end-points for app authentication

### 5.4.3 (2023-01-29)
* (bluefox) Corrected error with `publishFileAll` (for future use)

### 5.4.1 (2022-12-23)
* (bluefox) Corrected GUI error

### 5.4.0 (2022-12-22)
* (bluefox) Used a new version of socket classes

## License
The MIT License (MIT)

Copyright (c) 2014-2023 Bluefox <dogafox@gmail.com>

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