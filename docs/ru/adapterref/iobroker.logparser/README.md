---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.logparser
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.logparser.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.logparser/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.logparser
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.logparser.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/logparser-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/logparser-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.logparser/README.md
title: Конфигурация
hash: 5zs2X6FhpG3ahs4RzVTvqdP9xanfT3Sxx46uIvsWJ6Y=
---
## Адаптер парсера логов для парсинга (фильтрации) логов ioBroker
С помощью этого адаптера логи ioBroker всех адаптеров можно анализировать, т.е. фильтровать соответственно.

# Конфигурация
## Вкладка "Правила парсера (Фильтр)"
Для каждого установленного фильтра (правила) состояния создаются в разделе `logparser.[instance].filters`.

| **Столбец** | **Описание** |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Активный | Активировать/деактивировать фильтры |
| Имя | Любое имя (пробелы и специальные символы удаляются автоматически), используемое в качестве состояния в разделе «Фильтры» |
| Белый список: И | Все эти выражения должны присутствовать. Если вы введете подстановочный знак `*` или оставите его пустым, это правило будет пропущено. |
| Белый список: ИЛИ | По крайней мере одно из этих выражений должно встречаться. Если вы введете подстановочный знак `*` или оставите его пустым, это правило будет пропущено. |
| Черный список | Как только присутствует одно из этих выражений, журнал не принимается во внимание, независимо от того, какие другие фильтры определены. |
| Отладка/информация/предупреждение/ошибка | Какие уровни журналов следует учитывать? |
| Чистота | Удалите ненужные строки из строки журнала. |
| Объединить | Это объединяет записи журнала с одинаковым содержимым и ставит перед ними счетчик.<br> Без слияния:<br> `2019-08-17 20:00:00 - Retrieve weather data.`<br> `2019-08-17 20:15:00 - Retrieve weather data.`<br> `2019-08-17 20:30:00 - Retrieve weather data.`<br> Слияние активировано:<br> `2019-08-17 20:30:00 - [3 Entries] Retrieve weather data.` |
| Формат даты | `YYYY` = год из 4 цифр, `YY` = год из 2 цифр, `MM` = месяц, `DD` = день, `hh` = час, §§SSSSS_5§ § = минута, `ss` = секунда. Части внутри символов `#` заменяются на «Сегодня» или «Вчера». |
| Формат даты | `ГГГГ` = год из 4 цифр, `ГГ` = год из 2 цифр, `ММ` = месяц, `ДД` = день, `чч` = час, `мм` = минута, `сс` = секунда. Части внутри символов `#` заменяются на «Сегодня» или «Вчера». |

#### Строка/регулярное выражение
В столбцах _Белый список И_, _Белый список ИЛИ_, _Черный список_ и _Очистить_ разрешены как обычный текст (строка), так и регулярное выражение. Разделяйте несколько выражений запятыми. Поместите регулярное выражение между `/` и `/`, чтобы адаптер распознал, является ли это регулярным выражением. Если String: всегда проверяется на частичное совпадение. Чтобы игнорировать/отключить: оставьте пустым.

## Вкладка «Дополнительные настройки»
- **Удалить PID**: контроллер JS версии 2.0 или выше добавляет PID в скобках в начало журналов, например. `(12234) Прекращено: Без причины`. Если активировано, PID, включая скобки, например (1234), удаляются из строк журнала.

- **Заменить дату на «сегодня» / «вчера»**: в фильтрах вы можете заменить сегодняшнюю или вчерашнюю дату на «Сегодня» или «Вчера» в столбце формата даты, используя решетку (#). В этих полях можно определить другие термины вместо «Сегодня»/«Вчера».

- **Текст для «Слияния»** Этот текст помещается перед каждой строкой журнала, если слияние активировано. Затем символ # заменяется количеством журналов с тем же содержимым. Допускаются специальные символы, такие как `[](){}/\` и т. д. Примеры (без кавычек): "`[# записей] `", "`(#) `", "`# записей: `"

## Вкладка "Визуализация"
- **Количество таблиц JSON, используемых в VIS**:

Эта опция добавляет дополнительные состояния для лучшей визуализации в VIS. После этого вы сможете выбрать определенные фильтры, которые будут соответствующим образом отображаться в таблице JSON (например, «Homematic», «Предупреждения», «Ошибки» и т. д.).<br> Укажите необходимое количество различных таблиц JSON. Их состояния создаются в «visualization.table0», «visualization.table1» и т. д. Введите 0, чтобы деактивировать.

- **Порядок столбцов для таблицы JSON**: здесь вы можете изменить порядок столбцов. В качестве дополнительного столбца всегда добавляется ts (отметка времени). В ВИС и т.п. просто скройте его при необходимости.<br> Если вам нужно менее 4 столбцов: просто выберите одну запись из первых нужных столбцов, а затем скройте остальные с помощью виджета таблицы VIS JSON (или аналогичного).

- **Сортировка**: если активировано: сортирует записи журнала в порядке убывания, самые новые вверху. Если деактивировано: сортирует записи журнала в порядке возрастания, т. е. самые старые вверху. Рекомендуется сортировка по убыванию, поэтому активируйте эту опцию.

## Вкладка "Глобальный черный список"
Если одна из этих фраз/терминов содержится в строке лога, то запись лога игнорируется этим адаптером, вне зависимости от того, что установлено в правилах парсера (фильтре). Допускаются как строки, так и регулярные выражения. Если строка: проверяется на частичное совпадение, т.е. если вы вводите, например. "echo", то каждая строка журнала, содержащая "echo", будет отфильтрована, например. "Команда отправлена эхом на кухню".
Поместите регулярное выражение между `/` и `/`, чтобы адаптер распознал, является ли это регулярным выражением.

В столбце «Комментарий» вы можете прокомментировать/объяснить соответствующую запись по своему усмотрению, например, чтобы вы могли позже понять, почему вы установили эту запись в черный список.

## Вкладка «Экспертные настройки»
- **Интервал обновления состояний**: новые входящие записи журнала собираются и регулярно записываются в точки данных. Таким образом, интервал может быть определен. Примечание. Состояния обновляются только в случае изменения. Однако с точки зрения производительности не имеет смысла задавать здесь слишком короткий интервал. Менее 2 секунд не допускается.

- **Максимальное количество записей журнала**: максимальное количество записей журнала, которые сохраняются в состояниях (более старые записи удаляются). Пожалуйста, не устанавливайте слишком большое число, чем больше число, тем больше нагрузка на адаптер и, следовательно, на ваш сервер ioBroker. Число 100 оказалось хорошим.

# Визуализация (отображение логов в VIS)
Это пример проекта VIS, который можно импортировать в VIS: [vis-project-ex_logparser-adapter.zip](https://github.com/iobroker-community-adapters/ioBroker.logparser/raw/master/accessories/vis/vis-project-ex_logparser-adapter.zip).
Просто скачайте этот zip-файл. Затем в VIS перейдите в меню `Setup > Projekt-Export/Import > Import` и выберите соответствующий zip-файл.
Обратите внимание, что для использования этого проекта вам также потребуется [Виджеты материального дизайна](https://github.com/Scrounger/ioBroker.vis-materialdesign).

![основной.jpg](../../../en/adapterref/iobroker.logparser/img/visintro.gif)

# Дополнительные функции
## Манипулирование содержимым столбца JSON по журналу
Этот адаптер предоставляет возможность использовать JavaScript, Blockly и т. д. и влиять на то, какой контент помещается в столбцы журнала «дата», «серьезность», «от», «сообщение» таблиц JSON.

**Пример:** Следующая команда выполняется в JavaScript: `log('[Alexa-Log-Script] ##{"message":"' + 'Command [Turn on music].' + '", "from":"' + 'Alexa Kitchen' + '"}##');`

Часть `##{"message":"' + 'Command [Turn on music].' + '", "from":"' + 'Alexa Kitchen' + '"}##` будет извлечена, а сообщение журнала станет «Команда [Включить музыку]», а источником будет «Alexa Kitchen» (вместо javascript.0).

**Синтаксис:** Добавьте в строку журнала следующее: `##{"date":"", "severity":"", "from":"", "message":""}##` Можно удалить отдельные параметры, например. просто чтобы изменить текст журнала (сообщение), возьмите `##{"message": "text comes here."}##`

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.2 (2023-04-07)

-   (ciddi89) Fixed: Visualization tables was not working correctly
-   (ciddi89) Fixed: Issue if no dateformat was selected correctly

### 2.1.1 (2023-04-05)

-   (ciddi89) Fixed: [#25](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/25) Missing CSS class in date if it's older than today
-   (ciddi89) Changed: Moved Dateformat option from table to other settings
-   (ciddi89) Updated: Dependencies

### 2.1.0 (2023-03-05)

-   (ciddi89) Added: [#24](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/24) Option to remove 'COMPACT' in log entries
-   (ciddi89) Added: [#21](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/21) Option to remove only 'script.js' in log entries
-   (ciddi89) Fixed: [#46](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/46) Midnight function to change today/yesterday
-   (ciddi89) Fixed: [#23](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/23) When nothing selected in blacklist, adapter didn't work anymore
-   (ciddi89) Other: Small code and translation improvements

### 2.0.0 (2023-03-02)

-   (ciddi89) Dropped: Admin 5 support
-   (ciddi89) Changed: Admin html to jsonConfig [#36](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/36)
-   (ciddi89) Fixed: Issue with Midnight function
-   (ciddi89) Added: Translations of admin ui [#28](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/28)
-   (ciddi89) Updated: Readme

### 1.2.3 (2023-02-25)

-   (ciddi89) Fixed: Alexa-History script
-   (ciddi89) Fixed: adjusted links in admin/docs to new repo
-   (ciddi89) Rebuilded main.js

### 1.2.2 (2023-02-23)

-   (McM1957) sentry integration has been fixed

### 1.2.1 (2023-02-23)

-   (McM1957) Adapter has been moved to iobroker-community-adapters

### 1.1.0

-   (Mic-M) Fixed issue [#15](https://github.com/Mic-M/ioBroker.logparser/issues/15) regarding regex for tab "Parser Rules", column "Blacklist"
-   (Mic-M) Enhancement [#16](https://github.com/Mic-M/ioBroker.logparser/issues/16) - add specific CSS classes to any element of the JSON log per adapter option.
-   (Mic-M) Major improvement: Implemented entire documentation into adapter itself to significantly improve usability.
-   (Mic-M) A few improvements under the hood.

### 1.0.4

-   (Mic-M) Fixed 'Today/Yesterday' updating issue - https://forum.iobroker.net/post/469757. Thanks to (Kuddel) for reporting and (Glasfaser) for further debugging.

### 1.0.3

-   (Mic-M) Added [Sentry](https://github.com/ioBroker/plugin-sentry)

### 1.0.2

-   (Mic-M) Added debug logging for callAtMidnight() and updateTodayYesterday()

### 1.0.1

-   (Mic-M) Updated lodash dependency from 4.17.15 to 4.17.19

### 1.0.0

-   (Mic-M) No changes - just prepare versioning to add adapter to stable repository per [Adapter dev docu](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)

## License

MIT License

Copyright (c) 2020 - 2023 Mic-M, McM1957 <mcm57@gmx.at>, ciddi89 <mail@christian-behrends.de>, ioBroker Community Developers

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
