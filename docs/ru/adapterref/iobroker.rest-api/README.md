---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rest-api/README.md
title: REST-API-адаптер
hash: MuAe9zV/tno/70JhUmaXdIDSIYyEN+FgP2l2uFKG+T4=
---
![Логотип](../../../en/adapterref/iobroker.rest-api/admin/rest-api.png)

![Количество установок](http://iobroker.live/badges/rest-api-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.rest-api.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rest-api.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)

# Адаптер REST-API
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Это интерфейс RESTFul для чтения объектов и состояний из ioBroker, а также для записи/управления состояниями через HTTP-запросы Get/Post.

Назначение этого адаптера аналогично simple-api. Но этот адаптер поддерживает длительный опрос и перехват URL-адресов для подписки.

Он имеет очень полезный веб-интерфейс для игры с запросами:

![Скриншот](../../../en/adapterref/iobroker.rest-api/img/screen.png)

## Использование
Вызовите в браузере ```http://ipaddress:8093/``` и используйте пользовательский интерфейс Swagger для запроса и изменения состояний и объектов.

Некоторые примеры запросов:

- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal` - читать состояние как JSON
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain` - чтение состояния в виде строки (только значение)
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5` - записать состояние с помощью GET (только для обратной совместимости с simple-api)
- `http://ipaddress:8093/v1/sendto/javascript.0?message=toScript&data={"message":"MESSAGE","data":"FROM REST-API"}` - отправить сообщение на javascript.0 в скрипте `scriptName`

## Подписка на изменения состояния или объекта
Ваше приложение может получать уведомления при каждом изменении состояния или объекта.

Для этого ваше приложение должно предоставить конечную точку HTTP(S) для принятия обновлений.

Пример в node.js см. здесь [demoNodeClient.js](examples/demoNodeClient.js)

## Долгий опрос
Этот адаптер поддерживает подписку на изменение данных посредством длительного опроса.

Пример для браузера можно найти здесь: [demoNodeClient.js](examples/demoBrowserClient.html)

## Веб-расширение
Этот адаптер может работать как веб-расширение. В этом случае путь доступен по адресу http://iipaddress:8082/rest.

## Уведомление
- `POST` всегда для создания ресурса (не имеет значения, был ли он продублирован)
- `PUT` предназначен для проверки существования ресурса, а затем обновления, иначе создайте новый ресурс.
- `PATCH` всегда для обновления ресурса

## Команды
Кроме того, вы можете выполнять множество команд сокета через специальный интерфейс:

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

Например.

- `http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive` - чтобы прочитать состояние `system.adapter.admin.0.alive`
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png` - чтобы прочитать файл `admin.admin/admin.png` как результат JSON
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary` - читать файл `admin.admin/admin.png` как файл
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` - для перезапуска администратора

Вы также можете запросить все команды методом POST. Поскольку тело должно быть объектом с параметрами. Например:

```
curl --location --request POST 'http://ipaddress:8093/v1/command/sendTo' \
--header 'Content-Type: application/json' \
--data-raw '{
"adapterInstance": "history.0",
"command": "getHistory",
"message": {"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}
}'
```

Вы не можете отправить POST-запрос командам через графический интерфейс.

<!-- НАЧАТЬ -->

### Состояния
- `getStates(pattern)` - получить список состояний для паттерна (например, для system.adapter.admin.0.*). GUI может иметь проблемы с визуализацией ответа.
- `getForeignStates(шаблон)` - то же, что и getStates
- `getState(id)` - получить значение состояния по ID
- `setState(id, state)` - установить значение состояния с помощью объекта JSON (например, `{"val": 1, "ack": true}`)
- `getBinaryState(id)` - получить бинарное состояние по ID
- `setBinaryState(id, base64)` - установить бинарное состояние по ID

### Объекты
- `getObject(id)` - получить объект по ID
- `getObjects()` - получить все состояния и комнаты. GUI может иметь проблемы с визуализацией ответа.
- `getObjectView(design, search, params)` - получить определенные объекты, например. design=system, search=state, params=`{"startkey": "system.adapter.admin.", "endkey": "system.adapter.admin.\u9999"}`
- `setObject(id, obj)` - установить объект с объектом JSON (например, `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`)
- `delObject(id, options)` - удалить объект по ID

### Файлы
- `readFile(adapter, fileName)` - прочитать файл, т.е. адаптер=vis.0, имя файла=main/vis-views.json. Кроме того, вы можете установить опцию в запросе binary=true, чтобы получить ответ в виде файла, а не в виде json.
- `readFile64(adapter, fileName)` - прочитать файл как строку base64, например адаптер=vis.0, имя файла=main/vis-views.json. Кроме того, вы можете установить опцию в запросе binary=true, чтобы получить ответ в виде файла, а не в виде json.
- `writeFile64(adapter, fileName, data64, options)` - записать файл, т.е. адаптер = vis.0, имя файла = main/vis-test.json, data64 = eyJhIjogMX0 =
- `unlink(адаптер, имя)` - удалить файл или папку
- `deleteFile(адаптер, имя)` - удалить файл
- `deleteFolder(адаптер, имя)` - удалить папку
- `renameFile(adapter, oldName, newName)` - переименовать файл
- `rename(adapter, oldName, newName)` - переименовать файл или папку
- `mkdir(adapter, dirName)` - создать папку
- `readDir(adapter, dirName, options)` - прочитать содержимое папки
- `chmodFile(adapter, fileName, options)` - изменить режим файла. Например. адаптер=vis.0, имя_файла=main/*, параметры = `{"mode": 0x644}`
- `chownFile(adapter, fileName, options)` - изменить владельца файла. Например. адаптер=vis.0, имя_файла=main/*, options = `{"owner": "newOwner", "ownerGroup": "newgroup"}`
- `fileExists(adapter, fileName)` - проверить, существует ли файл

### Админы
- `getHostByIp(ip)` - прочитать информацию о хосте по IP. например от локального хоста
- `readLogs(host)` - прочитать имя файла и размер лог-файлов. Вы можете прочитать их с http://ipaddress:8093/<fileName>
- `delState(id)` - удалить состояние и объект. То же, что и ДелОбъект
- `getRatings(update)` - читать рейтинги адаптеров (как в админке)
- `getCurrentInstance()` - чтение пространства имен адаптера (всегда rest-api.0)
- `checkFeatureSupported(feature)` - проверить, поддерживается ли функция js-контроллером.
- `decrypt(encryptedText)` - расшифровать строку с системным секретом
- `encrypt(plainText)` - зашифровать строку системным секретом
- `getAdapters(adapterName)` - получить объекты типа "адаптер". Вы можете определить дополнительно имя адаптера
- `updateLicenses(логин, пароль)` - прочитать лицензии с портала ioBroker.net
- `getCompactInstances()` - прочитать список экземпляров с краткой информацией
- `getCompactAdapters()` - прочитать список установленных адаптеров с краткой информацией
- `getCompactInstalled(host)` - прочитать краткую информацию об установленных адаптерах
- `getCompactSystemConfig()` - прочитать краткую системную конфигурацию
- `getCompactSystemRepositories()`
- `getCompactRepository(host)` - прочитать краткий репозиторий
- `getCompactHosts()` - получить краткую информацию о хостах
- `addUser(user, pass)` - добавить нового пользователя
- `delUser(user)` - удалить пользователя
- `addGroup(group, desc, acl)` - создать новую группу
- `delGroup(group)` - удалить группу
- `changePassword(user, pass)` - изменить пароль пользователя
- `getAllObjects()` - прочитать все объекты в виде списка. GUI может иметь проблемы с визуализацией ответа.
- `extendObject(id, obj)` - модифицировать объект по ID с помощью JSON. (например, `{"common":{"enabled": true}}`)
- `getForeignObjects(шаблон, тип)` - то же, что и getObjects
- `delObjects(id, options)` - удалять объекты по шаблону

### Другие
- `log(text, level[info])` - нет ответа - добавить запись в лог ioBroker
- `getHistory(id, options)` - прочитать историю. См. варианты: https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter.
- `httpGet(url)` - прочитать URL с сервера. Вы можете установить binary=true, чтобы получить ответ в виде файла
- `sendTo(adapterInstance, command, message)` - отправить команду экземпляру. Например. adapterInstance=history.0, command=getHistory, message=`{"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}} `
- `listPermissions()` - чтение статической информации с разрешениями функций
- `getUserPermissions()` - прочитать объект с правами пользователя
- `getVersion()` - прочитать имя и версию адаптера
- `getAdapterName()` - прочитать имя адаптера (всегда rest-api)
- `getAdapterInstances(имя_адаптера)` - получить объекты типа "экземпляр". Вы можете определить дополнительно имя адаптера

<!-- КОНЕЦ -->

## Делать
- [] Реализовать файловые операции GET,PATCH,POST,DELETE.

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
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

Copyright (c) 2017-2023 bluefox <dogafox@gmail.com>