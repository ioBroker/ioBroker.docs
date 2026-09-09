---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-spreadsheet
hash: vRtLWpHLurnNZaTJ7BHue2OCR2m1ofY3Sm8iv8P8Noc=
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
![Тестирование и выпуск](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.google-spreadsheet

</br>
**Version:** </br>
</br>
**Tests:** </br>

## адаптер Google Таблиц для ioBroker

Этот адаптер можно использовать для автоматического взаимодействия с Google Табличками.

## API

- [документация API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md)

## Функции

- [Добавить данные в электронную таблицу](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/append.md)
- [Удаление строк из электронной таблицы](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md)
- [Создать листы](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md)
- [Удалить лист](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md)
- [Удалить листы](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md)
- [Дубликаты листов](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md)
- [Прочитать ячейку](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md)
- [Записать ячейку](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md)
- [Запись ячеек](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md)

## Использование

### Настраивать

#### Включить доступ к API

1. Посетите [консоль Google Cloud](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com) .

2. Создайте или выберите существующий проект, который вы хотите использовать с API.

3. Включите API Google Sheets для своего проекта.

#### Создать учетную запись службы

Для проекта, выбранного на предыдущем шаге, создайте новую учетную запись службы в Google Cloud IAM, выполнив следующие действия:

1. Перейдите на страницу IAM и администрирование в [консоли Google Cloud](https://console.cloud.google.com/iam-admin/iam) .

2. Нажмите на «Учетные записи служб», а затем на «Создать учетную запись службы».

3. Укажите имя для учетной записи службы и выберите роль "Проект" > "Редактор".

4. Нажмите «Продолжить», чтобы перейти к следующему шагу.

5. На вкладке «Ключи» нажмите «Создать ключ» и выберите формат «JSON». Затем нажмите «Продолжить».

6. Ваш закрытый ключ будет сгенерирован и автоматически загружен. Сохраните этот файл в безопасном месте, он понадобится вам позже.

#### Предоставить доступ к электронной таблице

Откройте электронную таблицу, с которой хотите взаимодействовать, и отправьте ее на адрес электронной почты, указанный в вашей недавно созданной учетной записи службы:

1. Откройте нужную электронную таблицу в Google Таблицах.

2. Нажмите кнопку «Поделиться» в правом верхнем углу.

3. В поле «Добавить пользователей» введите адрес электронной почты учетной записи службы и предоставьте ей необходимые права доступа (например, «Редактировать» или «Просмотреть»).

4. Нажмите «Отправить», чтобы завершить процесс обмена.

#### Настройка экземпляра адаптера

Добавьте следующую информацию в конфигурацию вашего экземпляра адаптера в ioBroker:

- **Идентификатор электронной таблицы** — вы можете найти идентификатор в URL-адресе вашей электронной таблицы.
- **Учетная запись службы** — адрес электронной почты созданной вами учетной записи службы.
- **Закрытый ключ** — Откройте загруженный JSON-файл и найдите в нем закрытый ключ. Скопируйте только ту часть, которая начинается с "-----BEGIN PRIVATE KEY-----."

![Настройки](../../../en/adapterref/iobroker.google-spreadsheet/docs/img/settings.png)

#### Найдите идентификатор электронной таблицы в URL-адресе.

Чтобы найти идентификатор электронной таблицы (Spreadsheet ID) в URL-адресе вашего документа Google Sheets, выполните следующие действия:

1. Когда вы откроете документ Google Sheets в веб-браузере, URL-адрес в адресной строке будет выглядеть примерно так:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2. "SPREADSHEET\_ID" — это длинная строка символов и цифр, расположенная между частями URL-адреса "/d/" и "/edit".

### Блокли

Используйте доступные блоки для автоматического взаимодействия с вашей электронной таблицей.

![Блокли](../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-append.png)

## Поиск неисправностей

### Ошибка при отправке данных в Google Таблицы: Ошибка: error:0909006C:PEM routines:get\_name:no start line

При копировании закрытого ключа в конфигурацию убедитесь, что в нем нет символов \n. Если в ключе есть символы \n, замените их обычными переносами строк.

### Ошибка при отправке данных в Google Таблицы: Ошибка: У вызывающей стороны нет разрешения.

Убедитесь, что у учетной записи службы есть необходимые права на запись в электронную таблицу. См. раздел «Предоставление доступа к электронной таблице» выше.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.1 (2026-02-16)
* (Thomas Pohl) Fix for admin ui

### 1.0.0 (2026-01-06)
* (Thomas Pohl) Support for multiple spreadsheets with aliases
* (Thomas Pohl) Automatic migration of old configs
* (Thomas Pohl) Improved tests, error handling, and logging
* (Thomas Pohl) Better async handling in Blockly blocks

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

[Older changelogs can be found there](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/blob/main/CHANGELOG_OLD.md)

## License

   Copyright (c) 2024-2026 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.