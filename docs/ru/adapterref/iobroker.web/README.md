---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: dOQpPOEcGT/VCyUB2KTqeOreQjN8EXpe3bmjWcwWxfk=
---
![Логотип](../../../en/adapterref/iobroker.web/admin/web.png)

![Количество установок](http://iobroker.live/badges/web-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.web.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Веб-сервер на базе Node.js и экспресс для чтения файлов из БД ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Настройка веб-сокетов
На некоторых клиентах веб-сокетов возникают проблемы с производительностью связи.
Иногда эта проблема возникает из-за отката связи socket.io в механизме длительного опроса.
Вы можете установить параметр *Force Web-Sockets*, чтобы принудительно использовать транспорт только через веб-сокеты.

## Давайте зашифруем сертификаты
Читать [здесь](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Расширения
Веб-драйвер поддерживает расширения.
Расширение является обработчиком URL, который будет вызываться при появлении такого запроса URL.
Расширения выглядят как обычный адаптер, но у них нет запущенного процесса, и они будут вызываться веб-сервером.

Например, пользователь может активировать специальный прокси-адаптер и получить доступ к другим устройствам (например, к веб-камерам) на том же веб-сервере.
Необходимо, чтобы все службы были доступны на одном веб-сервере.

Веб-расширение может и должно поддерживать функцию `unload`, которая может возвращать `promise`, если действие выгрузки займет некоторое время.

Подробнее о веб-расширениях можно прочитать [здесь](WEB-EXTENSIONS-HOWTO.md).

## Защита от грубой силы
Если включена аутентификация и пользователь вводит неверный пароль 5 раз в течение одной минуты, он должен подождать не менее одной минуты до следующей попытки.
После 15-й неправильной попытки пользователь должен подождать 1 час.

## Опция «Оставаться в системе»
Если выбран этот параметр, пользователь остается в системе в течение одного месяца.
В противном случае пользователь останется в системе в течение настроенного «время ожидания входа».

## Значения состояния доступа
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

Изображение должно быть записано в адаптер javascript, например:

```
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

## Опция «Базовая аутентификация»
Разрешает вход через обычную аутентификацию путем отправки `401` Unauthorized с заголовком `WWW-Authenticate`.
Это можно использовать для таких приложений, как *FullyBrowser*. При вводе неверных учетных данных один раз вы будете перенаправлены на страницу входа.

## Расширенные настройки
### Перенаправление по умолчанию
Если при открытии веб-порта в браузере должно отображаться не приложение, а какое-то конкретное приложение, здесь можно указать путь (например, `/vis/`), чтобы этот путь был открыт автоматически.

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 6.0.2 (2023-07-07)
* (bluefox) Updated packages

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