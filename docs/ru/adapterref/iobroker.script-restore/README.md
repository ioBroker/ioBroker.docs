---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.script-restore/README.md
title: ioBroker.script-restore
hash: lmh/JMN6R7yz8kyrDMfpGztJz6FqAXQQ1KUl8Zk2sgQ=
---
![Логотип](../../../en/adapterref/iobroker.script-restore/admin/script-restore.svg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.script-restore.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.script-restore.svg)
![Количество установок](https://iobroker.live/badges/script-restore-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/script-restore-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.script-restore.png?downloads=true)

# IoBroker.script-restore
**Тесты:** ![Тестирование и выпуск](https://github.com/ipod86/ioBroker.script-restore/workflows/Test%20and%20Release/badge.svg)

## Адаптер script-restore для ioBroker
Просматривайте и восстанавливайте отдельные скрипты из архивов резервных копий ioBroker — без необходимости восстанавливать всю резервную копию целиком.

## Описание
Адаптер script-restore добавляет в административный интерфейс ioBroker вкладку, позволяющую открывать архивы резервных копий и просматривать все содержащиеся в них скрипты JavaScript, TypeScript, Blockly и Rules. Вы можете просмотреть исходный код каждого скрипта, а также загрузить или скопировать его по отдельности.

Архив полностью обрабатывается в браузере — во время просмотра файлы на диск не записываются.

## Функции
— Просматривайте архивы резервных копий непосредственно во вкладке администратора ioBroker.
- Загрузить локальные файлы резервных копий из каталога резервных копий (по умолчанию: `/opt/iobroker/backups`)
- Загружайте архивные файлы непосредственно с вашего компьютера.
Поддерживаемые форматы: `.tar.gz`, `.tar`, `.json`, `.jsonl`
- Древовидное представление всех скриптов, организованных по папкам.
- Фильтрация скриптов по типу: JS, TypeScript, Blockly, Rules
- Полнотекстовый поиск по именам скриптов, путям и исходному коду.
- Просмотреть исходный код (JS/TS/Blockly/Rules)
— Скопировать исходный код в буфер обмена или загрузить как файл
- **Выберите несколько скриптов** с помощью флажка ☐ и загрузите их в виде ZIP-архива.
- **Импортировать ZIP-архивы** из экспорта script-restore или из собственной резервной копии JS-адаптера (`2026-07-17-scripts.zip`)
- Полностью браузерный анализ — без обращения к серверу для загрузки.
- **Восстанавливайте скрипты непосредственно в ioBroker** с настраиваемым суффиксом (по умолчанию: `_rcvr`) — существующие скрипты никогда не перезаписываются.

## Конфигурация
| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Путь к резервной копии | Каталог, где хранятся файлы резервных копий ioBroker | `/opt/iobroker/backups` |

## Использование
### Загрузка локального файла резервной копии
1. Откройте вкладку **Восстановление скриптов** в административной панели ioBroker.
2. Щелкните раскрывающийся список **Локальные файлы**.
3. Выберите файл резервной копии из списка — скрипты загружаются автоматически.

### Загрузка файла резервной копии
1. Откройте вкладку **Восстановление скриптов** в административной панели ioBroker.
2. Нажмите **Загрузить архив** и выберите файл со своего компьютера.
3. Архив анализируется в браузере, и отображаются все скрипты.

### Просмотр и загрузка скриптов
— Щелкните по скрипту в дереве, чтобы просмотреть его исходный код.
— Используйте кнопку **Копировать**, чтобы скопировать исходный текст в буфер обмена.
— Используйте кнопку **Скачать**, чтобы сохранить скрипт в виде файла.
— Нажмите ☐ слева от сценария, чтобы выбрать его — выберите несколько сценариев и нажмите **ZIP**, чтобы загрузить их все в один архив.

## Поддерживаемые форматы резервного копирования
| Формат | Описание |
|--------|-------------|
| `.tar.gz` | Стандартная резервная копия ioBroker (`iobroker_YYYY-MM-DD-HH-mm_SS_backupiobroker.tar.gz`) |
| `.json` | Экспорт скрипта адаптера JavaScript |
| `.jsonl` | Экспорт объектов ioBroker (строки JSON) |
| `.zip` (scripts.zip) | Экспорт ZIP-архива с восстановлением скрипта (содержит файлы `.js`/`.ts`) |
| `.zip` (резервная копия адаптера JS) | Внутренняя резервная копия адаптера JS (`YYYY-MM-DD-scripts.zip`, содержит `.json` файлы с метаданными скрипта) |
| `.zip` (резервная копия JS-адаптера) | Внутренняя резервная копия JS-адаптера (`YYYY-MM-DD-scripts.zip`, содержит файлы `.json` с метаданными скриптов) |

## Changelog
### 0.1.13 (2026-07-22)
* (winnyschuster) fix: correct folder indentation in script tree for deeply nested folders
* (ipod86) chore: update dev dependencies (@types/tar, @iobroker/testing, @types/node)

### 0.1.12 (2026-07-18)
* (ipod86) fix: add 30s timeout to all WebDAV operations
* (ipod86) fix: remove redundant variable alias in handleListLocalFiles

### 0.1.11 (2026-07-18)
* (ipod86) fix: move @types/tar to devDependencies (W0050, W5060)

### 0.1.10 (2026-07-18)
* (ipod86) fix: replace shell tar command with pure Node.js tar library for Windows compatibility
* (ipod86) feat: test local backup path button with result feedback
* (ipod86) feat: suggest backup path button
* (ipod86) fix: jsonConfig sendTo result format validation

### 0.1.9 (2026-07-17)
* (ipod86) feat: checkbox multi-select for ZIP export — click ☐ to select, main click still views only
* (ipod86) feat: import scripts.zip (our adapter export) and JS adapter backup ZIP (2026-07-17-scripts.zip)
* (ipod86) fix: align script list item columns (checkbox, icon, name) with flex layout

### 0.1.8 (2026-07-15)
* (ipod86) fix: sanitize object IDs from backup paths to prevent invalid ioBroker state IDs
* (ipod86) fix: add 30s timeout to HTTP URL download
* (ipod86) fix: bundle jszip locally in admin tab — no CDN dependency
* (ipod86) fix: zip export now works in all browsers (script tag loading, DOM-append before click)
* (ipod86) fix: remove postinstall lifecycle script from package.json (E0093)

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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