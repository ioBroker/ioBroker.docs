---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-электронная таблица
hash: yoyuekYJi0ukMjQSCfcXiwUeUlNXwnHrjmD10whffSg=
---
![Логотип](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![Лицензия GitHub](https://img.shields.io/github/license/ThomasPohl/ioBroker.google-spreadsheet)
![Загрузки](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/ThomasPohl/ioBroker.google-spreadsheet)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/ThomasPohl/ioBroker.google-spreadsheet)
![Коммиты GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/ThomasPohl/ioBroker.google-spreadsheet/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/ThomasPohl/ioBroker.google-spreadsheet)
![Проблемы с GitHub](https://img.shields.io/github/issues/ThomasPohl/ioBroker.google-spreadsheet)
![версия НПМ](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![Количество установок](https://iobroker.live/badges/google-spreadsheet-installed.svg)

# IoBroker.google-электронная таблица
</br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml)

## Адаптер Google-таблиц для ioBroker
Этот адаптер можно использовать для автоматического взаимодействия с электронными таблицами Google.

## Функции
* [Добавить данные в электронную таблицу](features/append.md)
* [Удаление строк из электронной таблицы](features/delete-rows.md)
* [Создать листы](features/create-sheet.md)
* [Удалить листы](features/delete-sheet.md)
* [Дубликаты листов](features/duplicate-sheet.md)
* [Читать ячейку](features/read-cell.md)
* [Записать ячейку](features/write-cell.md)

## Использование
### Настраивать
#### Включить доступ API
1. Посетите [Google Cloud Console](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com).

2. Создайте или выберите существующий проект, который вы хотите использовать с API.

3. Включите API Google Spreadsheet для вашего проекта.

#### Создать учетную запись службы
Для проекта, выбранного на предыдущем шаге, создайте новую учетную запись службы в Google Cloud IAM, выполнив следующие действия:

1. Перейдите на страницу IAM и администрирования в [Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).

2. Нажмите «Учетные записи служб», а затем «Создать учетную запись служб».

3. Укажите имя для учетной записи службы и выберите роль «Проект» > «Редактор».

4. Нажмите «Продолжить», чтобы перейти к следующему шагу.

5. На вкладке «Ключи» нажмите «Создать ключ» и выберите формат «JSON». Затем нажмите «Продолжить».

6. Ваш закрытый ключ будет сгенерирован и автоматически загружен. Сохраните этот файл в безопасности, так как он вам понадобится позже.

#### Предоставить доступ к электронной таблице
Откройте электронную таблицу, с которой вы хотите взаимодействовать, и отправьте ее по адресу электронной почты вашей недавно созданной учетной записи службы:

1. Откройте нужную таблицу в Google Таблицах.

2. Нажмите «Поделиться» в правом верхнем углу.

3. Введите адрес электронной почты учетной записи службы в поле «Добавить людей» и предоставьте ей необходимые разрешения (например, «Редактировать» или «Просмотр»).

4. Нажмите «Отправить», чтобы завершить процесс обмена.

#### Настройка экземпляра адаптера
Добавьте следующую информацию в конфигурацию экземпляра вашего адаптера в ioBroker:

- **Идентификатор электронной таблицы** - Идентификатор можно найти в URL-адресе вашей электронной таблицы.
- **Учетная запись службы** - адрес электронной почты созданной вами учетной записи службы.
- **Закрытый ключ** - Откройте загруженный файл JSON и найдите закрытый ключ в файле. Скопируйте только часть, начинающуюся с "-----BEGIN PRIVATE KEY-----."

![Настройки](../../../en/adapterref/iobroker.google-spreadsheet/img/settings.png)

#### Найдите идентификатор электронной таблицы в URL-адресе
Чтобы найти «Идентификатор электронной таблицы» в URL-адресе документа Google Таблиц, выполните следующие действия:

1. Когда вы открываете документ Google Таблиц в веб-браузере, URL-адрес в адресной строке будет выглядеть примерно так:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2. «SPREADSHEET_ID» — это длинная строка символов и цифр между частями «/d/» и «/edit» URL-адреса.

### Блочно
Используйте доступные блоки для автоматического взаимодействия с вашей электронной таблицей.

![Блочный](../../../en/adapterref/iobroker.google-spreadsheet/img/blockly-append.png)

## Поиск неисправностей
### Ошибка при отправке данных в Google Spreadsheet: Ошибка: error:0909006C:PEM routines:get_name:no start line
При копировании закрытого ключа в конфигурацию убедитесь, что нет \n. Если в ключе есть \n, замените их на обычные переносы строк

### Ошибка при отправке данных в Google Spreadsheet: Ошибка: У вызывающего абонента нет разрешения
Убедитесь, что у учетной записи службы есть достаточные разрешения для записи в электронную таблицу. См. раздел «Предоставить доступ к электронной таблице» выше.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

   Copyright (c) 2024 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.