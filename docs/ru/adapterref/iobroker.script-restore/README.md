---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.script-restore/README.md
title: ioBroker.script-restore
hash: 05lDjRBWxNlEW5kfBMo+dy6tyY40FpgxYvyOX/d9+Es=
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

## Поддерживаемые форматы резервного копирования
| Формат | Описание |
|--------|-------------|
| `.tar.gz` | Стандартная резервная копия ioBroker (`iobroker_YYYY-MM-DD-HH-mm_SS_backupiobroker.tar.gz`) |
| `.json` | Экспорт скрипта адаптера JavaScript |
| `.jsonl` | Экспорт объектов ioBroker (строки JSON) |
| `.jsonl` | Экспорт объектов ioBroker (строки JSON) |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-05-13)
* (ipod86) drop Node.js 20 support (EOL 2026-04-30), require >= 22
* (ipod86) fix: move @iobroker/types to production dependencies to fix CI integration test
* (ipod86) add .npmrc with legacy-peer-deps to resolve peer dependency conflicts
* (ipod86) update dependencies: webdav, basic-ftp, typescript, @types/node, @iobroker/eslint-config

### 0.0.12 (2026-04-30)
* (ipod86) add common.singleton to prevent multiple instances
* (ipod86) complete i18n translations for all supported languages (fr, es, it, nl, pl, pt, ru, uk, zh-cn)

### 0.0.11 (2026-04-13)
* (ipod86) add type filter (JS/TS/Blockly/Rules) in script sidebar
* (ipod86) add direct restore into ioBroker with suffix input and confirm modal
* (ipod86) remove obsolete admin/words.js and .prettierignore

### 0.0.10 (2026-04-08)
* (ipod86) fix jsonConfig responsive sizes lg/xl for backupPath (E5509)
* (ipod86) trim news entries to 7 (W1032)
* (ipod86) add Dependabot npm cooldown of 7 days (W8915)

### 0.0.9 (2026-04-08)
* (ipod86) fix jsonConfig: add responsive size attributes (E5507)
* (ipod86) add i18n translation files (W5022)
* (ipod86) remove outdated index_m.html and style.css (W5047)
* (ipod86) remove invalid copyToField attribute (W5512)

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