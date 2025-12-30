---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-spreadsheet
hash: pAaiT8VT5xOS7LRS+dmUq09dTm8BShfsSGVVqdHbYXA=
---
![Логотип](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![Лицензия GitHub](https://img.shields.io/github/license/ThomasPohl/ioBroker.google-spreadsheet)
![Загрузки](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/ThomasPohl/ioBroker.google-spreadsheet)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/ThomasPohl/ioBroker.google-spreadsheet)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/ThomasPohl/ioBroker.google-spreadsheet/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/ThomasPohl/ioBroker.google-spreadsheet)
![Проблемы на GitHub](https://img.shields.io/github/issues/ThomasPohl/ioBroker.google-spreadsheet)
![Версия NPM](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![Количество установок](https://iobroker.live/badges/google-spreadsheet-installed.svg)

# IoBroker.google-spreadsheet
</br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml)

## Адаптер Google Таблиц для ioBroker
Этот адаптер можно использовать для автоматического взаимодействия с электронными таблицами Google.

## Функции
* [Добавить данные в электронную таблицу](features/append.md)
* [Удаление строк из электронной таблицы](features/delete-rows.md)
* [Создать листы](features/create-sheet.md)
* [Удалить лист](features/delete-sheet.md)
* [Удалить листы](features/delete-sheets.md)
* [Дублировать листы](features/duplicate-sheet.md)
* [Чтение ячейки](features/read-cell.md)
* [Запись ячейки](features/write-cell.md)
* [Запись ячеек](features/write-cells.md)

## Использование
### Настраивать
#### Включить доступ к API
1. Перейдите в [консоль Google Cloud](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com).

2. Создайте или выберите существующий проект, который вы хотите использовать с API.

3. Включите API Google Таблиц для вашего проекта.

#### Создание учетной записи службы
Для проекта, выбранного на предыдущем шаге, создайте новую учетную запись службы в Google Cloud IAM, выполнив следующие действия:

1. Перейдите на страницу IAM и администрирования в [консоли Google Cloud](https://console.cloud.google.com/iam-admin/iam).

2. Нажмите на «Учетные записи служб», а затем на «Создать учетную запись службы».

3. Укажите имя для учетной записи службы и выберите роль "Проект" > "Редактор".

4. Нажмите «Продолжить», чтобы перейти к следующему шагу.

5. На вкладке «Ключи» нажмите «Создать ключ» и выберите формат «JSON». Затем нажмите «Продолжить».

6. Ваш закрытый ключ будет сгенерирован и автоматически загружен. Сохраните этот файл в безопасном месте, так как он понадобится вам позже.

#### Предоставить доступ к электронной таблице
Откройте электронную таблицу, с которой хотите взаимодействовать, и отправьте ее на адрес электронной почты, указанный в вашей недавно созданной учетной записи службы:

1. Откройте нужную электронную таблицу в Google Таблицах.

2. Нажмите кнопку «Поделиться» в правом верхнем углу.

3. Введите адрес электронной почты учетной записи службы в поле «Добавить пользователей» и предоставьте ей необходимые права доступа (например, «Редактировать» или «Просмотреть»).

4. Нажмите «Отправить», чтобы завершить процесс обмена.

#### Настройка экземпляра адаптера
Добавьте следующую информацию в конфигурацию вашего экземпляра адаптера в ioBroker:

- **Идентификатор электронной таблицы** - Вы можете найти идентификатор в URL-адресе вашей электронной таблицы.
- **Сервисный аккаунт** - Адрес электронной почты созданного вами сервисного аккаунта.
- **Закрытый ключ** - Откройте загруженный JSON-файл и найдите в нем закрытый ключ. Скопируйте только ту часть, которая начинается с "-----BEGIN PRIVATE KEY-----."

![Настройки](../../../en/adapterref/iobroker.google-spreadsheet/img/settings.png)

#### Найдите идентификатор электронной таблицы в URL-адресе
Чтобы найти идентификатор электронной таблицы (Spreadsheet ID) в URL-адресе вашего документа Google Sheets, выполните следующие действия:

1. Когда вы откроете документ Google Sheets в веб-браузере, URL-адрес в адресной строке будет выглядеть примерно так:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2. "SPREADSHEET_ID" — это длинная строка символов и цифр, расположенная между частями "/d/" и "/edit" URL-адреса.

### Блокли
Используйте доступные блоки для автоматического взаимодействия с вашей электронной таблицей.

![Блокли](../../../en/adapterref/iobroker.google-spreadsheet/img/blockly-append.png)

## Поиск неисправностей
### Ошибка при отправке данных в электронную таблицу Google:Error: error:0909006C:PEM routines:get_name:no start line
При копировании закрытого ключа в конфигурацию убедитесь, что в нем нет символов \n. Если в ключе есть символы \n, замените их обычными переносами строк.

### Ошибка при отправке данных в электронную таблицу Google: Ошибка: У вызывающей стороны нет разрешения
Убедитесь, что у учетной записи службы есть необходимые права на запись в электронную таблицу. См. раздел «Предоставление доступа к электронной таблице» выше.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.0 (2025-12-26)
- (Thomas Pohl) Added deleteSheets functionality (delete multiple sheets in one call)
- (Thomas Pohl) Added blockly block for deleteSheets
- (Thomas Pohl) Add write cells functionality (write multiple cells in one call)
- (Thomas Pohl) Added blockly block for writeCells

### 0.5.0
* (Thomas Pohl) Minimum node.js version is now 20
* (Thomas Pohl) Display connection state

### 0.4.0
* (Thomas Pohl) The privateKey is saved now encrypted
* (Thomas Pohl) Support for node.js 22

### 0.3.1
* (Thomas Pohl) Fixed reading cells and added error handling

### 0.3.0
* (Thomas Pohl) Added writing of single cells
* (Thomas Pohl) Added reading of single cells
* (Thomas Pohl) Documentation for all features

### 0.2.0
* (Thomas Pohl) Parsing of private keys is now more robust

### 0.1.0
* (Thomas Pohl) Preparation for first stable release
* (Thomas Pohl) Improve logging + Code cleanup

## License

   Copyright (c) 2024-2025 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.