---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rest-api/README.md
title: Адаптер REST-API
hash: vqjhnkoZ5i0c09TWI75srUhzFN6OBFj8q9V+++8IKTg=
---
![Логотип](../../../en/adapterref/iobroker.rest-api/admin/rest-api.png)

![Количество установок](http://iobroker.live/badges/rest-api-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.rest-api.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rest-api.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)

# Адаптер REST-API
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

Это интерфейс RESTFul для чтения объектов и состояний из ioBroker, а также для записи/управления состояниями посредством HTTP-запросов Get/Post.

Назначение этого адаптера аналогично simple-api. Но этот адаптер поддерживает длинный опрос и перехваты URL для подписок.

Он имеет удобный веб-интерфейс для работы с запросами:

![Скриншот](../../../en/adapterref/iobroker.rest-api/img/screen.png)

## Использование
Вызовите в браузере ```http://ipaddress:8093/``` и используйте пользовательский интерфейс Swagger для запроса и изменения состояний и объектов.

Некоторые примеры запросов:

- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal` — прочитать состояние как JSON
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain` — прочитать состояние как строку (только значение)
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5` — записать состояние с помощью GET (только для обратной совместимости с simple-api)
- `http://ipaddress:8093/v1/sendto/javascript.0?message=toScript&data={"message":"MESSAGE","data":"FROM REST-API"}` - отправить сообщение в javascript. 0 в скрипте `scriptName`

## Подписаться на изменения состояния или объекта
Ваше приложение может получать уведомления о каждом изменении состояния или объекта.

Для этого ваше приложение должно предоставить конечную точку HTTP(S) для приема обновлений.

Пример в node.js см. здесь [demoNodeClient.js](examples/demoNodeClient.js).

## Длинный опрос
Этот адаптер поддерживает подписку на изменение данных посредством длительного опроса.

Пример для браузера можно найти здесь: [demoNodeClient.js](examples/demoBrowserClient.html).

## Веб-расширение
Этот адаптер может работать как веб-расширение. В этом случае путь доступен по адресу http://iipaddress:8082/rest.

## Уведомление
- `POST` всегда предназначен для создания ресурса (не имеет значения, был ли он продублирован)
- `PUT` предназначен для проверки существования ресурса, а затем обновления, иначе создайте новый ресурс.
- `PATCH` всегда предназначен для обновления ресурса.

## Команды
Кроме того, вы можете выполнять многие команды сокета через специальный интерфейс:

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

Например.

- `http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive` - чтобы прочитать состояние `system.adapter.admin.0.alive`
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png` — чтобы прочитать файл `admin.admin/admin.png` как результат JSON.
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary` - чтобы прочитать файл `admin.admin/admin.png` как файл.
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` - чтобы перезапустить администратора

Вы также можете запросить все команды методом POST. Тело должно быть объектом с параметрами. Например.:

```
curl --location --request POST 'http://ipaddress:8093/v1/command/sendTo' \
--header 'Content-Type: application/json' \
--data-raw '{
"adapterInstance": "history.0",
"command": "getHistory",
"message": {"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}
}'
```

Вы не можете отправлять POST-запрос командам через графический интерфейс.

<!-- СТАРТ -->

### Состояния
- `getStates(pattern)` - получить список состояний шаблона (например, для system.adapter.admin.0.*). С графическим интерфейсом могут возникнуть проблемы при визуализации ответа.
- `getForeignStates(pattern)` - то же, что и getStates
- `getState(id)` - получить значение состояния по ID
- `setState(id, state)` - установить значение состояния с помощью объекта JSON (например, `{"val": 1, "ack": true}`)
- `getBinaryState(id)` - получить двоичное состояние по идентификатору
- `setBinaryState(id, base64)` - установить двоичное состояние по ID

### Объекты
- `getObject(id)` - получить объект по идентификатору
- `getObjects(list)` — получить все состояния и комнаты. С графическим интерфейсом могут возникнуть проблемы при визуализации ответа.
- `getObjectView(design, search, params)` - получить определенные объекты, например. design=system, search=state, params=`{"startkey": "system.adapter.admin.", "endkey": "system.adapter.admin.\u9999"}`
- `setObject(id, obj)` - установить объект с помощью объекта JSON (например, `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`)
- `delObject(id, options)` - удалить объект по идентификатору

### Файлы
- `readFile(adapter, fileName)` - прочитать файл, например. адаптер=vis.0, имя_файла=main/vis-views.json. Кроме того, вы можете установить опцию в запросеbinary=true, чтобы получить ответ в виде файла, а не в формате JSON.
- `readFile64(adapter, fileName)` - прочитать файл как строку base64, например адаптер=vis.0, имя_файла=main/vis-views.json. Кроме того, вы можете установить опцию в запросеbinary=true, чтобы получить ответ в виде файла, а не в формате JSON.
- `writeFile64(adapter, fileName, data64, options)` - записать файл, например. адаптер=vis.0, fileName=main/vis-test.json, data64=eyJhIjogMX0=
- `unlink(adapter, name)` - удалить файл или папку
- `deleteFile(адаптер, имя)` - удалить файл
- `deleteFolder(адаптер, имя)` - удалить папку
- `renameFile(adapter, oldName, newName)` - переименовать файл
- `rename(adapter, oldName, newName)` - переименовать файл или папку
- `mkdir(adapter, dirName)` - создать папку
- `readDir(adapter, dirName, options)` - прочитать содержимое папки
- `chmodFile(adapter, fileName, options)` - изменить режим файла. Например. адаптер=vis.0, fileName=main/*, options = `{"mode": 0x644}`
- `chownFile(adapter, fileName, options)` - изменить владельца файла. Например. адаптер=vis.0, fileName=main/*, options = `{"owner": "newOwner", "ownerGroup": "newgroup"}`
- `fileExists(adapter, fileName)` - проверить, существует ли файл

### Админы
- `getHostByIp(ip)` — прочитать информацию о хосте по IP. например по локальному хосту
- `readLogs(host)` - прочитать имя файла и размер файлов журнала. Вы можете прочитать их с помощью http://ipaddress:8093/<fileName>.
- `delState(id)` - удалить состояние и объект. То же, что и delObject
- `getRatings(update)` - прочитать рейтинги адаптеров (как в админке)
- `getCurrentInstance()` — прочитать пространство имен адаптера (всегда rest-api.0)
- `decrypt(encryptedText)` - расшифровать строку с системным секретом
- `encrypt(plainText)` - зашифровать строку с системным секретом
- `getAdapters(adapterName)` - получить объекты типа "адаптер". Вы можете дополнительно определить имя адаптера
- `updateLicenses(логин, пароль)` - читать лицензии с портала ioBroker.net
- `getCompactInstances()` — прочитать список экземпляров с краткой информацией
- `getCompactAdapters()` - прочитать список установленных адаптеров с краткой информацией
- `getCompactInstalled(host)` — прочитать краткую информацию об установленных адаптерах
- `getCompactSystemConfig()` — прочитать краткую конфигурацию системы
- `getCompactSystemRepositories()`
- `getCompactRepository(host)` - прочитать короткий репозиторий
- `getCompactHosts()` - получить краткую информацию о хостах
- `addUser(user, pass)` - добавить нового пользователя
- `delUser(user)` - удалить пользователя
- `addGroup(group, desc, acl)` - создать новую группу
- `delGroup(group)` - удалить группу
- `changePassword(user, pass)` - изменить пароль пользователя
- `getAllObjects()` — прочитать все объекты в виде списка. В графическом интерфейсе могут возникнуть проблемы с визуализацией ответа.
- `extendObject(id, obj)` - изменить объект по идентификатору с помощью JSON. (например, `{"common":{"enabled": true}}`)
- `getForeignObjects(pattern, type)` - то же, что и getObjects
- `delObjects(id, options)` - удалять объекты по шаблону

### Другие
- `log(text, level[info])` - нет ответа - добавить запись в журнал ioBroker
- `checkFeatureSupported(feature)` — проверить, поддерживается ли функция js-контроллером.
- `getHistory(id, options)` - прочитать историю. Варианты см.: https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter.
- `httpGet(url)` - прочитать URL с сервера. Вы можете установитьbinary=true, чтобы получить ответ в виде файла.
— `sendTo(adapterInstance, команда, сообщение)` — отправить команду в экземпляр. Например. адаптерInstance=history.0, команда=getHistory, message=`{"id": "system.adapter.admin.0.memRss", "options": {"aggregate": "onchange", "addId": true}} `
- `listPermissions()` - читать статическую информацию с разрешениями функции
- `getUserPermissions()` — прочитать объект с правами пользователя
- `getVersion()` — прочитать имя и версию адаптера
- `getAdapterName()` — прочитать имя адаптера (всегда rest-api)
- `clientSubscribe(targetInstance, messageType, data)`
— `getAdapterInstances(adapterName)` — получить объекты типа «экземпляр». Вы можете дополнительно определить имя адаптера

<!-- КОНЕЦ -->

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 2.0.0 (2024-04-09)
* (theshengfui) Fixed history requests
* (bluefox) Minimum required node.js version is 16

### 1.1.0 (2023-05-03)
* (bluefox) Converting of the setState values to the according type
* (bluefox) Implemented file operations

### 1.0.5 (2023-03-27)
* (Apollon77) Prepare for future js-controller versions

### 1.0.4 (2022-08-31)
* (bluefox) Check if the port is occupied only on defined interface

### 1.0.2 (2022-07-27)
* (bluefox) Implemented binary read/write operations

### 1.0.1 (2022-07-27)
* (bluefox) Increased the max size of body to 100Mb

### 1.0.0 (2022-05-19)
* (bluefox) Final release

### 0.6.0 (2022-05-18)
* (bluefox) Added sendTo path

### 0.5.0 (2022-05-17)
* (bluefox) Some access errors were corrected

### 0.4.0 (2022-04-26)
* (bluefox) Added socket commands

### 0.3.6 (2022-04-22)
* (bluefox) Added object creation and enumerations reading

### 0.3.5 (2022-04-22)
* (bluefox) Allowed the reading of current subscriptions

### 0.3.4 (2022-04-20)
* (bluefox) Corrected subscription

### 0.3.1 (2022-04-15)
* (bluefox) First release

### 0.1.0 (2017-09-14)
* (bluefox) initial commit

## License
Apache 2.0

Copyright (c) 2017-2024 bluefox <dogafox@gmail.com>