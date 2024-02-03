---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myuplink/README.md
title: ioBroker.myuplink
hash: FUesn9bNELv4MJOxaed5prn9MNSB85YuwkWRxt57Lec=
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
1. Вам нужен совместимый тепловой насос от NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global или Høiax — купите его, если у вас его нет ;-)
2. Вам нужна учетная запись на myUplink: https://myuplink.com.
3. Перейдите на myUplink Api: https://dev.myuplink.com/ и войдите в систему.
4. Нажмите «Приложения», а затем «Создать новое приложение».
5. Заполните: Имя и Описание могут быть любыми, например. ioBroker
6. URL-адрес обратного вызова важен для потока предоставления кода авторизации. Вы можете использовать https://sebilm.github.io/ioBroker.myuplink/myuplink.html.
7. Примите соглашение об услугах API myUplink и нажмите «Создать».
8. Затем получаете Идентификатор и Секрет – они нам нужны.
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

## Changelog

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