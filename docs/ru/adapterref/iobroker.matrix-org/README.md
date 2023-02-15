---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.matrix-org/README.md
title: ioBroker.matrix-org
hash: VMiIjOfbLptdI65a7gk+b2UlcZiAgkrCsv0M3PMya04=
---
![Логотип](../../../en/adapterref/iobroker.matrix-org/admin/matrix-logo.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.matrix-org.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.matrix-org.svg)
![Количество установок](https://iobroker.live/badges/matrix-org-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/matrix-org-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.matrix-org.png?downloads=true)

# IoBroker.matrix-org
**Тесты:** ![Тестируйте и выпускайте](https://github.com/oelison/ioBroker.matrix-org/workflows/Test%20and%20Release/badge.svg)

## Адаптер matrix-org для ioBroker
Адаптер матричных push-сообщений Большое спасибо за создание матрицы (https://matrix.org/) за создание полноценной бесплатной базы для общения

### Конфигурация
Лучше всего: Запустите свой собственный клиент на своем сервере!

Создайте собственного пользователя в качестве BOT с паролем. Создайте комнату для всех участников, которым нужны сообщения бота. Добавьте своего бота в эту комнату. Добавить всех участников в эту комнату. Внесите все данные в конфиг. (имя бота, пароль, имя комнаты)

### Использование
Добавьте столько экземпляров, сколько вам нужно. Добавьте значение в matrix-org.0.sendMessage так, как вам нравится, с помощью js. Если вы установите «image» в matrix.0.sendMessage, он отправит логотип матрицы на ваш канал.
Или в js используйте:

```
sendTo("matrix-org.0", "Hello World!");
```

Или используйте блочный символ в Sendto.

Для образов из локальной файловой системы (Linux):

```
sendTo("matrix-org.0",{file: "file:///tmp/images/test.png"});
```

Для изображений из локальной файловой системы (Windows):

``` 
sendTo("matrix-org.0",{file: "file:///C:/tmp/images/test.png"});
```

Для изображений в качестве справки:

```
sendTo("matrix-org.0",{file: "https://www.abcd/images/test.png"});
```

Для изображений в base64:

```
sendTo("matrix-org.0",{file:{type:"image/png",base64:"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"}});
```

Или

```
sendTo("matrix-org.0",{file:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"});
```

Для html следуйте этой спецификации: https://spec.matrix.org/v1.3/client-server-api/#mroommessage-msgtypes Например:

```
sendTo("matrix-org.0",{html: "<h1>Hello World!</h1>", text: "Hello World!"});
```

или

```
sendTo("matrix-org.0",{html: "<table><tr><td>1</td><td>2</td></tr><tr><td>a</td><td>b</td></tr><table>", text: "Your client can not show html!"});
```

Если ваш клиент не может декодировать html, вы получите текст.
Если ваш клиент не поддерживает таблицу, он либо показывает текст, либо просто 12ab.

### Для проверки вашей конфигурации используйте sendMessage
просто откройте объекты и измените строку одного экземпляра matrix-org. Порт в основном 8448, если у вас есть собственная система без прокси.
Иногда используется порт 443, если у вас общедоступная система, такая как matrix.org. Если вы хотите ее протестировать: Сервер: matrix.org Порт: 443, комната: #test-ioBroker-adapter:matrix.org Присоединяйтесь к этой комнате и попробуйте. с вашими собственными полномочиями

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.4 (2023-02-04)
* update of dependencies
* small readme improvement

### 0.1.3 (2022-11-03)
* updates of dependencies

### 0.1.2 (2022-08-12)
* base64 with html format added again
* html messages added

### 0.1.1 (2022-08-08)
* bugfix local file system was not working
* bugfix base64 was not working
* unit test added

### 0.1.0 (2022-08-05)
* sending files added
* sending from url and base64 encoded data
* image ans video mime types are send as image and video all others as file

### 0.0.7 (2022-07-24)
* removed all axios request
* replaced with matrix-js-sdk calls
* no logoff during the whole time
* test with servers with access token expiery need to be done
* sync added
* receive message added (please check on update and not on change to react on the same message)

### 0.0.6 (2022-07-10)
* repeat false set for stable admin v5.3.8
* Readme with example improved (how to chose port 443 or 8448)
* some more debug output on errors

### 0.0.5 (2022-07-08)
* sendMessage stay in for fast config testing
* index_m.html and files from admin/build removed
* password encryption and protection enabled
* password field now as type password
* detection of missing config give an error log
* detection of unread room data give an error log
* encodeURI() used where possible
* catching termination during await for avoid errors when writing on ioBroker database
* adding matrix to blockly symbol

### 0.0.4 (2022-07-02)
* blockly added
* onMessage method added

### 0.0.3 (2022-06-26)
* Invalid workflow line 54 in test-and-release.yml (leading space removed)

### 0.0.2 (2022-06-26)
* (oelison) message sending by setting object sendMessage implemented
* (oelison) most "try/catch" done
* (oelison) Readme completed.

### 0.0.1 (2022-06-26)
* (oelison) initial release

## License
MIT License

Copyright (c) 2023 Christian Oelschlegel <iobrokermatrix@sciphy.de>

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