---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.matrix-org/README.md
title: ioBroker.matrix-org
hash: CW0AYPSP4fFJezrWC6bDJmYH8psL1qoZRvlc2zN/EIg=
---
![Логотип](../../../en/adapterref/iobroker.matrix-org/admin/matrix-logo.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.matrix-org.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.matrix-org.svg)
![Количество установок](https://iobroker.live/badges/matrix-org-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/matrix-org-stable.svg)
![Тестирование и выпуск](https://github.com/oelison/ioBroker.matrix-org/workflows/Test%20and%20Release/badge.svg)

# ioBroker.matrix-org

## адаптер matrix-org для ioBroker

Адаптер для push-уведомлений Matrix. Огромное спасибо Matrix ( <https://matrix.org/> ) за создание полноценной бесплатной коммуникационной базы.

### Конфигурация

Лучший вариант: запустите собственный клиент на своем сервере!

Создайте собственного пользователя в качестве своего бота с паролем. Создайте комнату для всех участников, желающих получать сообщения от бота. Добавьте своего бота в эту комнату (это не обязательно, если включено автоматическое присоединение). Добавьте всех участников в эту комнату. Введите все данные в файл конфигурации (имя бота, пароль, название комнаты).

### Использование

Добавьте столько экземпляров, сколько вам нужно. Присвойте значение параметру matrix-org.0.sendMessage любым удобным для вас способом, используя JavaScript. Если вы установите значение параметра "image" в matrix.0.sendMessage, логотип Matrix будет отправлен на ваш канал. Или используйте в JavaScript:

```
sendTo("matrix-org.0", "Hello World!");
```

Или воспользуйтесь символом blockly в Sendto.

Для образов из локальной файловой системы (Linux):

```
sendTo("matrix-org.0",{file: "file:///tmp/images/test.png"});
```

Для изображений из локальной файловой системы (Windows):

```
sendTo("matrix-org.0",{file: "file:///C:/tmp/images/test.png"});
```

Изображения приведены для справки:

```
sendTo("matrix-org.0",{file: "https://www.abcd/images/test.png"});
```

Для изображений в формате base64:

```
sendTo("matrix-org.0",{file:{type:"image/png",base64:"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"}});
```

Или

```
sendTo("matrix-org.0",{file:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"});
```

Для HTML-кода следуйте этой спецификации: <https://spec.matrix.org/v1.3/client-server-api/#mroommessage-msgtypes> Например:

```
sendTo("matrix-org.0",{html: "<h1>Hello World!</h1>", text: "Hello World!"});
```

или

```
sendTo("matrix-org.0",{html: "<table><tr><td>1</td><td>2</td></tr><tr><td>a</td><td>b</td></tr><table>", text: "Your client can not show html!"});
```

Если ваш клиент не может декодировать HTML, вы получите текст. Если ваш клиент не поддерживает таблицы, он либо покажет текст, либо просто 12ab.

### Для проверки вашей конфигурации используйте sendMessage.

Просто откройте объекты и измените строку одного из экземпляров matrix-org. Чаще всего используется порт 443, если у вас публичная система, например matrix.org. Иногда используется порт 8448, если у вас саморазмещенная система без прокси, но вы это и так знаете.

Если хотите протестировать: Сервер: matrix.org Порт: 443 Комната: #test-ioBroker-adapter:matrix.org Присоединяйтесь к этой комнате и попробуйте, используя свои учетные данные.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* some bumps

### 1.2.2 (2026-03-29)
* string normalisation due to bug report #95
* some bumbs

### 1.2.1 (2026-02-12)
* set body in send file to matrix

### 1.2.0 (2025-10-17)
* upgrade matrix-js-sdk to 38.4.0 node 22 required
* switch to ESM
* eslint 9 (what a messi commit)

### 1.1.0 (2024-11-23)
* upgrade matrix-js-sdk
* auto join added (default false)

### 1.0.0 (2023-04-01)
* upgrade matrix-js-sdk (node 18 needed)

[Older changelogs can be found there](https://github.com/oelison/ioBroker.matrix-org/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Christian Oelschlegel <iobrokermatrix@sciphy.de>

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