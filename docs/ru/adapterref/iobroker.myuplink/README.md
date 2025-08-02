---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.myuplink.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/myuplink-stable.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.myuplink.svg
BADGE-Number of Installations: https://iobroker.live/badges/myuplink-installed.svg
BADGE-NPM: https://nodei.co/npm/iobroker.myuplink.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myuplink/README.md
title: ioBroker.myuplink
hash: IeZvYW3c0DaaueslEjv8qw0vKPC1TrKdSqYRGxumEAE=
---
# IoBroker.myuplink
Этот адаптер ioBroker получает данные от myUplink.com. Настройки, которые были включены для этого myUplink, могут быть изменены.

## Использование этого адаптера
1. Вам нужен совместимый с myUplink тепловой насос от NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global или Høiax — купите его, если у вас его нет ;-)
2. Вам нужна учетная запись на myUplink: https://myuplink.com
3. Перейдите в myUplink API: https://dev.myuplink.com и войдите в систему.
4. Нажмите «Приложения», а затем «Создать новое приложение».
5. Заполните: Имя и Описание могут быть любыми, например, ioBroker
6. URL обратного вызова важен для потока предоставления кода авторизации. Вы можете использовать https://sebilm.github.io/ioBroker.myuplink/myuplink.html
7. Примите Соглашение об услугах API myUplink и нажмите «Создать».
8. Затем вы получаете Идентификатор и Секрет — они нам нужны.
9. Установите этот адаптер в ioBroker
10. На странице настроек адаптера заполните Идентификатор и Секрет.
11. Выберите язык и все остальные настройки.
12. Нажмите «Сохранить» и «Закрыть».

Каждое устройство имеет объект в дереве объектов, называемый `setData`. Вы можете ввести объект JSON в форме

```json
{
    "12345": "42",
    "23456": "1"
}
```

в этом объекте. Это позволяет отправлять и изменять несколько точек данных в API одновременно.
Его также можно использовать для изменения точек данных, которые не отправляются API.

## Как работает адаптер
Адаптер извлекает список систем и устройств из API myUplink каждые x минут (в зависимости от настройки). Затем он извлекает доступные параметры для каждого устройства и сохраняет их в дереве объектов. Если myUplink отправляет новые параметры в процессе, они автоматически добавляются в дерево объектов.

Адаптер обычно не удаляет никакие объекты, поэтому данные не теряются, если myUplink не отправляет параметр.

Адаптер также не влияет на то, какие параметры отправляет myUplink.

## Changelog
### 0.8.1 (2024-08-18)

-   Existing incorrect minimum and maximum values are now deleted #39
-   Minimum and maximum values of the API are not adopted if the current value is outside minimum and maximum #39
-   Instructions for German and English have been moved to separate files #47
-   Dependencies have been updated

### 0.8.0 (2024-07-14)

-   No empty objects are sent (setData)
-   Incorrect minimum and maximum values of the API are not adopted #39
-   The initial refresh interval was set to 5 minutes
-   The code has been restructured internally
-   At least Node.js 18 is required!
-   Unit tests have been added
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
