---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myuplink/README.md
title: ioBroker.myuplink
hash: +c8Neb3KKonGY9VtQq66QhvwidPModoE5QWdcaxh5Og=
---
# IoBroker.myuplink

![НПМ-версия](https://img.shields.io/npm/v/iobroker.myuplink.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/myuplink-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.myuplink.svg)
![Количество установок](https://iobroker.live/badges/myuplink-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.myuplink.png?downloads=true)

[![Статус сборки] (https://github.com/sebilm/ioBroker.myuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.myuplink/actions/workflows/test-and-release.yml)

## Адаптер myuplink.com для ioBroker
Этот адаптер ioBroker получает данные от myUplink.com.

## Использование этого адаптера
Немецкая версия ниже — Eine deutsche Version dieser Anleitung gibt's weiter unten.

1. Вам нужен тепловой насос, совместимый с myUplink, от NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global или Høiax — купите его, если у вас его нет ;-)
2. Вам нужна учетная запись на myUplink: https://myuplink.com.
3. Перейдите на myUplink Api: https://dev.myuplink.com и войдите в систему.
4. Нажмите «Приложения», а затем «Создать новое приложение».
5. Заполните: Имя и Описание могут быть любыми, например. ioBroker
6. URL-адрес обратного вызова важен для потока предоставления кода авторизации. Вы можете использовать https://sebilm.github.io/ioBroker.myuplink/myuplink.html.
7. Примите соглашение об услугах API myUplink и нажмите «Создать».
8. Далее получаете Идентификатор и Секрет – они нам нужны.
9. Установите этот адаптер в ioBroker.
10. На странице настроек адаптера заполните Идентификатор и Секрет.
11. Выберите язык и все остальные настройки.
12. Нажмите «Сохранить и закрыть».

Каждое устройство имеет объект в дереве объектов с именем `setData`. Вы можете ввести объект JSON формы

```json
{
    "12345": "42",
    "23456": "1"
}
```

в этом объекте. Это позволяет одновременно отправлять и изменять несколько точек данных в API.
Его также можно использовать для изменения точек данных, которые не отправляются API.

## Как работает адаптер
Адаптер получает список систем и устройств из API myUplink каждые x минут (в зависимости от настроек). Затем он извлекает доступные параметры для каждого устройства и сохраняет их в дереве объектов. Если myUplink отправляет в процессе новые параметры, они автоматически добавляются в дерево объектов.

Адаптер обычно не удаляет какие-либо объекты, чтобы данные не были потеряны, если myUplink не отправит параметр.

Адаптер также не влияет на то, какие параметры отправляет myUplink.

## Адаптеры Verwendung dieses
1. Это может быть совместимое с myUplink тепловое оборудование от NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global или Høiax.
2. Вы можете использовать учетную запись myUplink: https://myuplink.com
3. На сайте myUplink-API-Webseite: https://dev.myuplink.com.
4. Нажмите «Приложения» и «Создать новое приложение».
5. Название и описание können beliebig ausgefüllt werden, z.B. «ИоБрокер»
6. URL-адрес обратного вызова предназначен для потока предоставления кода авторизации. Это возможно https://sebilm.github.io/ioBroker.myuplink/myuplink.html eingetragen werden.
7. Соглашения об услугах API myUplink должны быть указаны и должны быть указаны при нажатии кнопки «Создать».
8. Es wird ein Identifier und ein Secret angezeigt - diese werden benötigt.
9. Установите адаптер в ioBroker.
10. Auf der Einstellungsseite des Adapters den Identifier und das Secret eingeben.
11. Die Sprache und alle anderen Einstellungen auswählen und einstellen.
12. Шпайхерн и Шлиссен кликен.

Необходимо указать, что объект в объектной базе называется «setData». Можно ли использовать JSON-объект формы

```json
{
    "12345": "42",
    "23456": "1"
}
```

в das Objekt eingetragen werden. Это действительно так, лучше использовать Datenpunkte gleichzeitig и API для отправки и обработки.
Это может быть связано с датами, которые не используются API.

## Работа с адаптерами
Адаптер должен удерживать myuplink-API в течение нескольких минут (je nach Einstellung) в списке и создании системы. Для этого необходимо указать заданный параметр и указать его в объекте. Если myUplink не будет отправлять новые параметры, это автоматически приведет к указанию объекта.

В качестве общего объекта адаптера, если он не используется для передачи данных, параметр myUplink не может быть установлен с отправкой.

Адаптер также может быть использован в некоторых случаях, когда параметр myUplink используется.

## Changelog

### **WORK IN PROGRESS**

-   Do not send empty objects (setData)
-   The initial refresh interval was set to 5 minutes
-   The code has been restructured internally
-   At least Node.js 18 is required!
-   Dependencies have been updated

### 0.7.1 (2024-02-10)

-   Crash after 'unhandled promise rejection' fixed #15

### 0.7.0 (2024-02-04)

-   Forbidden characters are removed from the category
-   An error when setting data has been fixed
-   Performance has been improved

### 0.6.1 (2024-02-03)

-   Performance has been improved
-   Dependencies have been updated

### 0.6.0 (2024-01-28)

-   The setData object has been added

### 0.5.0 (2024-01-14)

-   Parameter IDs and categories have been added for a few heat pumps

### 0.4.1 (2024-01-13)

-   In object IDs, all characters that are not officially supported are now replaced by an underscore
-   The roles of the data objects have been improved
-   The logging of token data (in log level silly) has been removed
-   Dependencies have been updated

### 0.4.0 (2023-12-31)

-   New options for renaming IDs have been added #5
-   Options are deactivated if checkboxes are not checked

### 0.3.0 (2023-12-29)

-   Support for setting parameter values has been added (must be paid for at myuplink.com) #4
-   Authorization Code Grant Flow settings have been moved to new Extended tab
-   Password control will be used for Secret and Auth Code

### 0.2.1 (2023-12-28)

-   All responsive sizes have been added to jsonConfig
-   More error logging have been added

### 0.2.0 (2023-12-28)

-   Settings page have been changed from materialize to jsonConfig
-   Dependencies have been updated

### 0.1.0 (2023-12-25)

-   Initial release

## License

MIT License

Copyright (c) 2024 Sebastian Häßelbarth <seb@sebmail.de>

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