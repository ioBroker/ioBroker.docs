---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.public-holidays
BADGE-stable: https://iobroker.live/badges/public-holidays-stable.svg
BADGE-Installations: https://iobroker.live/badges/public-holidays-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.public-holidays
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.public-holidays/README.md
title: Государственные праздники
hash: gzjB4T+4q441M5IXfP9h/Z3pNhOb/dcylxZDvZRx1eo=
---
# Государственные праздники

Сервис Public Holidays преобразует календарь в данные: является ли сегодняшний день праздником, как он называется, какой будет следующий и сколько дней до него осталось. Все рассчитывается автоматически. **офлайн** В вашей собственной системе — нет учетной записи, ключа API и подключения к интернету.

## Как это работает

Адаптер работает в **режим расписания**Расчеты производятся один раз при запуске или сохранении настроек, а затем один раз в сутки в полночь по запросу контроллера ioBroker. Результаты каждого запуска записываются, и процесс завершается — данные не сохраняются в памяти между запусками.

Данные о праздниках получены из `date-holidays` Библиотека, поставляемая вместе с адаптером, охватывает 206 стран, включая их штаты, провинции и регионы.

## Настраивать

1. Установите адаптер из репозитория ioBroker (стабильную или последнюю версию) и создайте экземпляр. Установка с URL-адреса GitHub не поддерживается.
2. Откройте настройки экземпляра. Все настройки находятся на одной пошаговой карточке, которую нужно просмотреть сверху вниз.
3. Сохраните. Адаптер немедленно производит вычисления и записывает полученные данные.

### Расположение

Выберите свою страну. Штаты/провинции и регионы отображаются только для стран, в которых они есть — например, в Германии есть штаты, а в Италии — числовые коды провинций.

Если вы оставите поле "Страна" пустым, адаптер возьмет страну из вашего списка. **системные настройки ioBroker**
(Системные настройки → Основные настройки → Страна) и записывает в журнал строку с указанием использованной страны. Если эту страну не удается сопоставить, адаптер сообщает «Страна не настроена» и останавливается.

### Виды праздников

Пять типов можно включить независимо друг от друга:

| Тип            | Значение                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Общественный   | Государственные праздники, установленные законом. Включено по умолчанию.                            |
| Банк           | Дни, когда банки и государственные учреждения закрыты, но не являются государственными праздниками. |
| Школа          | Школьные каникулы.                                                                                  |
| Необязательный | Дни, которые являются выходными только для части населения.                                         |
| Соблюдение     | Памятные дни, которые не являются выходными днями — например, День матери.                          |

Если на один день выпадают два праздника, то для определения того, какой из них будет указан, применяются три правила, в следующем порядке:

1. Побеждает тип с более высоким рангом, в порядке, указанном в таблице выше.
2. Праздник, который действительно должен отмечаться в этот день, гораздо лучше, чем тот, который просто перенесли на этот день с выходных.
3. А если и это не приведет к ничьей, то решающим фактором станет фиксированный внутренний порядок.

Все три названия однозначны, поэтому они остаются неизменными при каждом обновлении данных. До версии 0.15.1 ничья разрешалась тем праздником, который в данных был указан первым, но это могло незаметно измениться при каждом обновлении данных — в 42 странах, включая Норвегию, Польшу, Румынию, Сербию и Тайвань.

> Если вы переключитесь **все** При выключении адаптера никаких праздников не отображается — это видно и в карточке настроек, и в журнале.

### Дни моста

Переходный день — это рабочий день, расположенный между праздником и выходными. При включении этой опции адаптер добавляет их в качестве отдельных праздников, которые в вашем языке называются «Переходный день»:

- праздник в **Четверг** → **Пятница** становится днем моста
- праздник в **Вторник** → **Понедельник** становится днем моста
- а **Среда** в контексте праздника во вторник _и_ Четверг станет днем игры в бридж.

Один только выходной в среду не создает никаких дополнительных выходных: чтобы добраться до выходных, потребуется два выходных дня. Дополнительный выходной день никогда не заменяет настоящий выходной и не создает дополнительных выходных дней.

### Исключенные праздничные дни

Некоторые праздники неактуальны для конкретного домохозяйства — вы можете исключить отдельные записи. В списке отображаются именно те праздники, которые соответствуют выбранному вами местоположению и включенным типам, поэтому вы можете исключить то, что адаптер в противном случае бы отображал.

Исключение хранится по внутреннему идентификатору, полученному из правила расчета праздника. Если последующее обновление данных переименовывает или удаляет это правило, исключение перестает соответствовать чему-либо — адаптер выводит предупреждение с указанием устаревшей записи, а в карточке настроек оно отображается как съемный чип в списке выбора.

Применяются исключения. **до** Дни проведения бридж-турниров рассчитываются отдельно, поэтому исключение выходного дня в четверг также исключает и пятничный бридж-турнир, который к нему прилагается.

### Обнаружены праздники

В нижней части карточки отображается список праздников, которые адаптер обнаружит в текущем году с учетом ваших текущих настроек — включая переходные дни и за вычетом исключений. Расчет производится тем же способом, что и адаптер, поэтому вы видите то, что получаете.

## Точки данных

| Точка данных                                           | Тип                          | Значение                                                                              |
| ------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------- |
| `today.name`                                           | нить                         | Название сегодняшнего праздника (в обычный день поле пустое)                          |
| `today.isHoliday`                                      | логический                   | Сегодня выходной?                                                                     |
| `yesterday.name` / `yesterday.isHoliday`               | строка / логическое значение | То же самое и вчера.                                                                  |
| `tomorrow.name` / `tomorrow.isHoliday`                 | строка / логическое значение | То же самое и завтра.                                                                 |
| `dayAfterTomorrow.name` / `dayAfterTomorrow.isHoliday` | строка / логическое значение | То же самое и послезавтра.                                                            |
| `next.name`                                            | нить                         | Название следующего предстоящего праздника                                            |
| `next.isHoliday`                                       | логический                   | Удалось ли вообще найти место для предстоящего отпуска?                               |
| `next.date`                                            | нить                         | Дата его `YYYY-MM-DD` — машиночитаемый формат, не зависящий от формата вашего дисплея |
| `next.daysUntil`                                       | число                        | До праздника осталось несколько дней.                                                 |

Все точки данных доступны только для чтения, и каждая из них содержит краткое пояснение на вашем языке, которое вы можете прочитать в дереве объектов. `next` смотрит строго вперед: праздник, который отмечается сегодня, появляется в
`today`не в `next`.

Названия каналов и точек данных соответствуют системному языку ioBroker и обновляются при каждом запуске, в том числе и в случае обновлений, а не новой установки. Если вы переименуете одну из этих точек данных вручную, адаптер перезапишет её.

## Язык

Названия праздников отображаются на языке вашей системы ioBroker, если данные о праздниках содержат этот язык, в противном случае — на английском. Поддерживаются одиннадцать языков: немецкий, английский, испанский, французский, итальянский, нидерландский, польский, португальский, русский, украинский и китайский.

## Поиск неисправностей

**О каких-либо праздниках не сообщается.**
Проверьте журнал. «Страна не настроена» означает, что ни адаптер, ни системные настройки ioBroker не предоставляют доступную страну. «Тип праздника не включен» означает, что все флажки типов отключены.

**Похоже, что указанный мной штат или регион игнорируется.**
Если состояние или регион неизвестны, система автоматически переключается на более общий уровень. Адаптер обнаруживает это и предупреждает: «Состояние 'XX' неизвестно для YY — используются праздники на уровне страны». Выберите нужную запись из выпадающего списка, а не вводите её вручную. Если обновление данных удалило сохраненную запись, карточка настроек укажет на это над выпадающим списком, и ваши настройки останутся неизменными до тех пор, пока вы не выберете новую.

**Праздник отсутствует или появляется неожиданно.**
Включите соответствующий тип праздника — некоторые дни считаются памятными датами, а не государственными праздниками, и это может измениться при обновлении данных. Также проверьте свой список исключений.

**После обновления перестала работать функция исключения.**
Правило расчета праздника было переименовано в данных. Адаптер предупреждает об устаревших исключениях при каждом запуске; удалите чип в настройках и выберите праздник снова.

**В журнале отображается `Connection is closed.` около полуночи.**
Это происходит из-за отключения адаптера контроллером ioBroker, а не из-за самого адаптера. Это безвредно; к этому моменту данные уже были записаны.

## Конфиденциальность

Адаптер работает полностью в автономном режиме: данные не покидают вашу систему. Дополнительную функцию отправки отчетов об ошибках через Sentry можно отключить в настройках ioBroker — см. документацию по плагину Sentry, ссылка на которую приведена в основном файле README.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.16.0 (2026-09-06)

- Fixed: Two holidays on one day could swap the reported name on their own with a data update. A fixed rule decides now — the name changes in 39 countries, among them Norway, Poland and Taiwan.
- Fixed: A day moved off a weekend no longer pushes aside the holiday that genuinely belongs on that date.
- New: Every data point now explains itself in the object tree, in your language.
- Fixed: Opening the settings marked them as changed when a stored state or province had vanished from the holiday data. The card points that entry out now instead.
- Fixed: A country written as a name instead of its code was rejected in the settings, although the same name worked when it came from the ioBroker system settings.
- Fixed: Refreshed holiday data — Belgian holidays now carry English names, and the entries for Albania and Andorra were corrected.
- Changed: Install the adapter from the ioBroker repository (stable or latest) — installing from GitHub is no longer supported.

### 0.15.1 (2026-09-04)

- Fixed: Installations kept whatever holiday data was already on the system, so corrections and new countries never arrived. An update now brings the current data along.

### 0.15.0 (2026-09-04)

- Fixed: With no holiday type enabled the adapter reported nothing without a word while the card still previewed a full year. Card and log now say it.
- Changed: Channel and data point names are refreshed on every run, so renames reach updated installations too — a manual rename of them is overwritten.

### 0.14.0 (2026-09-01)

- New: the next-holiday log line now shows the date in your system's date format — for example 26.10.2026 instead of 2026-10-26. The date data point itself stays machine-readable for scripts.

### 0.13.2 (2026-08-27) — stable

- Fixed: Stopping or restarting the instance while the holidays were being worked out cut that run short, which could leave half-written values and errors in the log.
- Changed: Heads-up for Austria — St. Martin's, Rupert's and Referendum Day count as observances now and disappear unless that type is enabled. Plus data fixes for Ireland, Russia and others.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

_Developed with assistance from Claude.ai_