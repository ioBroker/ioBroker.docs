---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: vQHzTP8mzOS9nXXWF81cYazOfJVkP7pz+Z+g89oG6vo=
---
![Логотип](../../../en/adapterref/iobroker.web/admin/web.png)

![Количество установок](http://iobroker.live/badges/web-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.web.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Веб-сервер на базе Node.js и Express для чтения файлов из базы данных ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Настройка веб-сокетов
У некоторых клиентов, использующих веб-сокеты, наблюдаются проблемы с производительностью связи.
Иногда эта проблема возникает из-за переключения связи socket.io на механизм длительного опроса.
Вы можете установить параметр *Force Web-Sockets*, чтобы принудительно использовать только транспорт веб-сокетов.

## Сертификаты Let's Encrypt
Прочитайте [здесь](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Расширения
Веб-драйвер поддерживает расширения.
Расширение представляет собой обработчик URL-адресов, который будет вызываться при появлении запроса такого URL.
Расширения выглядят как обычный адаптер, но у них нет запущенного процесса, и они будут вызываться веб-сервером.

Например, пользователь может активировать специальный прокси-адаптер и получить доступ к другим устройствам (например, веб-камерам) на том же веб-сервере.
Необходимо, чтобы все сервисы были доступны на одном веб-сервере.

Расширение веб-сайта могло бы и должно поддерживать функцию `unload`, которая могла бы возвращать `promise`, если операция выгрузки займет некоторое время.

Вы можете узнать больше о веб-расширениях [здесь](WEB-EXTENSIONS-HOWTO.md).

## Защита от грубой силы
Если аутентификация включена и пользователь вводит неверный пароль 5 раз в течение одной минуты, он должен подождать не менее одной минуты до следующей попытки.
После 15-й неверной попытки пользователь должен подождать 1 час.

## Опция "Оставаться в системе"
Если этот параметр выбран, пользователь останется авторизованным в течение одного месяца.
В противном случае пользователь останется авторизованным в течение заданного "тайм-аута входа".

## Доступ к значениям состояния
Доступ к значениям нормального состояния можно получить с помощью HTTP-запроса GET.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

или получить доступ к таким файлам, как:

```
http://IP:8082/vis-2.0/javascript.picture.png =>
[IMAGE]
```

Начиная с версии 8.0.0, вы также можете записывать значения через HTTP POST-запрос:

```
[POST] http://IP:8082/state/javascript.0.myVariable => true
```

Или в виде JSON-объекта с дополнительными параметрами:

```
[POST] http://IP:8082/state/javascript.0.myVariable =>
{"val": true, "ack": false}
```

Примечание: для использования этой функции необходимо отключить параметр "Отключить состояния и информацию о сокете" в настройках веб-адаптера.

## Опция "Базовая аутентификация"
Разрешает вход через базовую аутентификацию путем отправки `401` Unauthorized с заголовком `WWW-Authenticate`.
Это можно использовать для таких приложений, как *FullyBrowser*. При однократном вводе неверных учетных данных вы будете перенаправлены на страницу входа.

## Список пользователей
Вы можете определить список пользователей, имеющих доступ к веб-серверу. Вы можете изменить права доступа для авторизованных пользователей.

Если пользователя нет в списке, он не сможет получить доступ к веб-серверу.

Проще установить для каждого объекта и каждого состояния права доступа для конкретного пользователя.

## Расширенные параметры
### Перенаправление по умолчанию
Если при открытии веб-порта в браузере не нужно отображать выбор приложения, а требуется выбрать какое-либо конкретное приложение, то здесь можно указать путь (например, `/vis/`), и этот путь будет открыт автоматически.

## Аутентификация OAuth2
Веб-адаптер поддерживает аутентификацию OAuth2.

Для получения токенов пользователю необходимо перейти по следующему URL-адресу:

```
http://ip:8082//oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker&stayloggedin=<false/true>
```

`stayloggedin=true` означает, что токен будет сохранен в браузере и будет использоваться для последующих запросов; он является необязательным.

Ответ выглядит так:

```json
{
    "access_token": "21f89e3eee32d3af08a71c1cc44ec72e0e3014a9",
    "expires_in": "2025-02-23T11:39:32.208Z",
    "refresh_token": "66d35faa5d53ca8242cfe57367210e76b7ffded7",
    "refresh_token_expires_in": "2025-03-25T10:39:32.208Z",
    "token_type": "Bearer"
}
```

Более подробную информацию можно найти здесь: https://github.com/ioBroker/webserver?tab=readme-ov-file#oauth2-support

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 8.0.0 (2026-02-18)
* (@GermanBluefox) Updated packages. Minimal Node.js version is now 20.0.0
* (@GermanBluefox) Removed binary states
* (@GermanBluefox) Added possibility to write values via `/state/` endpoint with `POST`

### 7.0.9 (2025-03-28)
* (@GermanBluefox) Corrected the loading of the material adapter

### 7.0.8 (2025-03-18)
* (@GermanBluefox) Added settings for custom CORS headers
* (@GermanBluefox) Added the possibility to show admin instances on the web welcome page
* (@GermanBluefox) Implemented the new index page

### 7.0.7 (2025-03-15)
* (@GermanBluefox) Trying to catch an error by the web extension

### 7.0.6 (2025-03-09)
* (@GermanBluefox) Corrected the login for iobroker.visu app
* (@GermanBluefox) Corrected load of TypeScript Web extensions

### 7.0.4 (2025-03-04)
* (@GermanBluefox) Corrected the login page
* (@GermanBluefox) Removed the frequent debug output

### 7.0.3 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 7.0.1 (2025-03-02)
* (@GermanBluefox) [Breaking change] Removed simple-api as it could be connected as web-extension
* (@GermanBluefox) updated packages
* (@GermanBluefox) removed gulp in a build process
* (@GermanBluefox) Migrated GUI to vite
* (@GermanBluefox) Rewritten in TypeScript
* (@GermanBluefox) Added OAuth2 support
* (@GermanBluefox) Added new 404 and the directory list pages

### 6.3.1 (2024-09-23)
* (@foxriver76) added new admin icon (svg)

### 6.3.0 (2024-06-27)
* (bluefox) Corrected call of getObjectView with null parameter
* (bluefox) updated packages
* (bluefox) GUI was migrated to a non-style framework

### 6.2.6 (2024-05-25)
* (bluefox) Preparations for a custom loading background
* (bluefox) updated packages

### 6.2.5 (2024-02-22)
* (bluefox) Just some packages were updates

### 6.2.4 (2024-02-17)
* (klein0r) Extensions may block the web instance
* (klein0r) Fixed directory listing

### 6.2.3 (2023-12-18)
* (foxriver76) updated the websocket library to increase the maximum file size from 100 MB to 500 MB

### 6.2.2 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

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
* (foxriver76) upgrade socketio and ws dependencies to fix a vis subscribe problem

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

Copyright (c) 2014-2026 Bluefox <dogafox@gmail.com>

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