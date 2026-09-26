---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.public-holidays
BADGE-stable: https://iobroker.live/badges/public-holidays-stable.svg
BADGE-Installations: https://iobroker.live/badges/public-holidays-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.public-holidays
BADGE-Test and Release: https://github.com/krobipd/ioBroker.public-holidays/actions/workflows/test-and-release.yml/badge.svg
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
hash: cVtBSkH7gjzNvPv9Id54R6QiLKqomUHumEUKZHW8/mg=
---
# Государственные праздники

Сервис Public Holidays преобразует календарь в данные: является ли сегодняшний день праздником, как он называется, что будет дальше и сколько дней до этого. Все расчеты производятся **в автономном режиме** на вашей собственной системе — не требуется учетная запись, ключ API и подключение к интернету.

## Как это работает

Адаптер работает в **режиме планирования** . Он выполняет вычисления один раз при запуске или сохранении настроек, а затем один раз в день в полночь по запросу контроллера ioBroker. Каждый запуск записывает свои результаты, и процесс завершается — данные не сохраняются в памяти между запусками.

Данные о праздниках получены из `date-holidays` Библиотека, поставляемая вместе с адаптером, охватывает 207 стран, включая их штаты, провинции и регионы.

## Настраивать

1. Установите адаптер из репозитория ioBroker (стабильную или последнюю версию) и создайте экземпляр. Установка с URL-адреса GitHub не поддерживается.
2. Откройте настройки экземпляра. Все настройки находятся на одной пошаговой карточке, которую нужно просмотреть сверху вниз.
3. Сохраните. Адаптер немедленно производит вычисления и записывает полученные данные.

### Расположение

Выберите свою страну. Штаты/провинции и регионы отображаются только для стран, в которых они есть — например, в Германии есть штаты, а в Италии — числовые коды провинций.

Если вы оставите поле страны пустым, адаптер возьмет страну из **системных настроек ioBroker** (Системные настройки → Основные настройки → Страна). Распознаются оба списка стран, из которых ioBroker хранит данные — системные настройки и мастер первого запуска (до версии Admin 8.0.14 мастер пишет названия по-разному, например, «Vietnam» вместо «Viet Nam») — и на карточке отображается предварительный просмотр обнаруженной страны. Если для этой страны нет данных о праздниках (например, Катар) или она представляет собой несколько стран («Сербия и Черногория», «Нидерландские Антильские острова»), об этом сообщается в журнале, и адаптер публикует пустой результат, пока вы не выберете страну. Семь стран из данных о праздниках вообще не имеют названия в списке ioBroker — Сен-Бартелеми, Карибские Нидерланды, Кюрасао, Канарские острова, Сен-Мартен, Южный Судан и Синт-Мартен: выберите их на карточке.

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

> Если отключить **все** типы, адаптер вообще не будет сообщать о праздниках — это видно как в карточке настроек, так и в журнале.

### Праздники, длящиеся несколько дней

Некоторые праздники длятся несколько дней — Новый год в России, Чхусок в Корее, Тет во Вьетнаме, Ид во многих странах. Каждый из этих дней имеет значение: `today.isHoliday` Это верно для каждого из них. `next` Отсчитывается следующий праздник после сегодняшнего, а не второй день того же праздника. Праздник, начинающийся вечером накануне (еврейские и исламские дни начинаются с наступлением сумерек), отсчитывается от первого полного дня.

### Дни моста

«Переходный день» — это один рабочий день, втиснутый между двумя выходными, как минимум один из которых является праздничным днем. Выходной день заполняет этот промежуток до выходных или следующего праздника. При включении этой опции адаптер добавляет их как отдельные праздничные дни, которые в системном языке ioBroker называются «Переходный день». При выходных в субботу и воскресенье:

- Выходной в **четверг** → **пятница** становится переходным днем.
- Выходной во **вторник** → **понедельник** становится переходным днем.
- Будний день, ограниченный двумя праздниками, становится переходным днем — среда между вторником и четвергом, вторник между понедельником и средой (например, 2 мая в Польше).

Выходные дни — это праздники вашей страны: если они выпадают на пятницу и субботу (Израиль, Саудовская Аравия, Египет, Бангладеш…), то выходной в среду заменяет выходной в четверг, а пятница никогда не является переходным днем. Переходным днем становятся только государственные и банковские праздники, длящиеся весь день — памятные даты, школьные и необязательные праздники, а также дни, отсутствующие в течение дня, такие как Сочельник с 14:00. Выходной в среду сам по себе не создает переходного дня при наличии выходных в субботу и воскресенье: чтобы достичь выходных, потребуется два выходных дня. Переходный день никогда не заменяет настоящий праздник и никогда не создает дополнительных переходных дней; день, в который входит только праздник того типа, который вы отменили, считается рабочим днем.

### Исключенные праздничные дни

Некоторые праздники неактуальны для конкретного домохозяйства — вы можете исключить отдельные записи. В списке отображаются именно те праздники, которые соответствуют выбранному вами местоположению и включенным типам, поэтому вы можете исключить то, что адаптер в противном случае бы отображал.

Исключение праздника также исключает дни, которые он заменяет — день, на который переносится праздник, если он выпадает на выходные (например, День подарков на понедельник); таким образом, в списке отображается только сам праздник. Исключение типа праздника, который вы отключили, сохраняется и отображается отдельно: оно снова вступает в силу, как только тип праздника снова становится доступным.

Исключение хранится по внутреннему идентификатору, полученному из правила расчета праздника. Если последующее обновление данных переименовывает или удаляет это правило, или если прошла какая-либо разовая дата, исключение перестает соответствовать чему-либо: адаптер записывает предупреждение с указанием устаревшей записи, а в карточке настроек оно отображается как съемный чип в списке выбора.

Исключения применяются **до** расчета дней для игры в бридж, поэтому исключение выходного дня в четверг также исключает и пятничный день для игры в бридж, который к нему относился.

### Обнаружены праздники

В нижней части карточки отображается предварительный просмотр праздников, которые адаптер обнаружит в текущем году с вашими текущими настройками — включая переходные дни и за вычетом исключений. Она формируется с помощью тех же функций, что и адаптер, и называет праздники на языке системы ioBroker, как и точки данных, поэтому вы видите то, что получаете. Если страна не выбрана, отображается обнаруженная системная страна.

## Точки данных

| Точка данных                                          | Тип                          | Значение                                                                             |
| ----------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| `today.name`                                          | нить                         | Название сегодняшнего праздника (в обычный день поле пустое)                         |
| `today.isHoliday`                                     | логический                   | Сегодня выходной?                                                                    |
| `yesterday.name` /`yesterday.isHoliday`               | строка / логическое значение | То же самое и вчера.                                                                 |
| `tomorrow.name` /`tomorrow.isHoliday`                 | строка / логическое значение | То же самое и завтра.                                                                |
| `dayAfterTomorrow.name` /`dayAfterTomorrow.isHoliday` | строка / логическое значение | То же самое и послезавтра.                                                           |
| `next.name`                                           | нить                         | Название следующего предстоящего праздника                                           |
| `next.isHoliday`                                      | логический                   | Удалось ли вообще найти место для предстоящего отпуска?                              |
| `next.date`                                           | нить                         | Дата его `YYYY-MM-DD` — машиночитаемый формат, не зависящий от формата вашего дисплея |
| `next.daysUntil`                                      | число                        | До праздника осталось несколько дней.                                                |

Все точки данных доступны только для чтения, и каждая из них содержит краткое пояснение на вашем языке, которое вы можете прочитать в дереве объектов. `next` смотрит строго вперед: праздник, который отмечается сегодня, появляется в `today` не в `next` — и то же самое относится к оставшимся дням праздника, который продолжается сегодня.

Названия каналов и точек данных соответствуют системному языку ioBroker и обновляются при каждом запуске, в том числе и в случае обновлений, а не новой установки. Если вы переименуете одну из этих точек данных вручную, адаптер перезапишет её.

## Язык

Названия праздников отображаются на языке вашей системы ioBroker, если данные о праздниках содержат этот язык, в противном случае — на английском языке — как в самих данных, так и в предварительном просмотре карты. Поддерживаются одиннадцать языков: немецкий, английский, испанский, французский, итальянский, голландский, польский, португальский, русский, украинский и китайский. Названия стран в карте соответствуют языку страницы администратора.

## Поиск неисправностей

**Никаких данных о праздниках не поступало.** Проверьте журнал. "Страна не настроена" означает, что ни адаптер, ни системные настройки ioBroker не предоставляют информацию о стране. "В системной стране "..." нет данных о праздниках" / "... охватывает несколько стран" / "... не распознается" указывает системную страну, которую адаптер не смог использовать — выберите страну на карточке. "Тип праздника не включен" означает, что все флажки типов отключены.

**Похоже, что настроенный мной штат или регион игнорируется.** Неизвестный штат или регион молча переключается на более общий уровень. Адаптер обнаруживает это и предупреждает: «Штат 'XX' неизвестен для YY — используются праздники на уровне страны». Выберите запись из выпадающего списка, а не вводите её вручную. Если обновление данных удалило сохраненную вами запись, карточка настроек укажет на это над выпадающим списком и оставит вашу конфигурацию без изменений, пока вы не выберете новую. Двенадцать регионов вообще не могут быть загружены библиотекой праздников (известный дефект — десять островов Кука, Тимару и Буллер в Новой Зеландии): адаптер использует праздники более широкого региона и сообщает об этом в журнале и на карточке.

**День недели меняется на несколько часов раньше или позже.** Время суток определяется часами хоста ioBroker. Контейнер Docker без часового пояса работает по UTC — set `TZ` для контейнера. При включении отладочного логирования адаптер указывает часовой пояс хоста, который не входит в число часовых поясов страны.

**В день перехода на летнее время значения остаются на уровне предыдущего дня.** В некоторых часовых поясах при переходе на летнее время часы пропускают полночь (Чили, Куба, Египет, Ливан, Азорские острова). В этот день переход на летнее время в полночь не происходит; значения предыдущего дня остаются до следующего перехода.

**Праздник отсутствует или появляется неожиданно.** Включите соответствующий тип праздника — некоторые дни считаются памятными датами, а не государственными праздниками, и это может измениться после обновления данных. Также проверьте список исключений.

**После обновления перестала работать функция исключения.** Правило расчета праздника было переименовано в данных. Адаптер предупреждает об устаревших исключениях при каждом запуске; удалите чип в настройках и выберите праздник снова.

**В журнале отображается `Connection is closed.` Примерно в полночь.** Это происходит из-за отключения адаптера контроллером ioBroker, а не самим адаптером. Это безвредно; к этому моменту данные уже были записаны.

## Конфиденциальность

Учет праздничных дней производится в автономном режиме на вашей собственной системе — сетевой адаптер не отправляет никаких сетевых запросов по ним.

Функция отправки сообщений об ошибках через Sentry активна по умолчанию; что именно она отправляет и как её отключить, описано в [разделе Sentry основного файла README](https://github.com/krobipd/ioBroker.public-holidays/blob/main/README.md#sentry--error-reporting) .

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.18.0 (2026-09-25)

- Fixed: Holidays lasting several days now count on every day (Russian New Year, Chuseok, Tết, Eid …); the next holiday skips the rest of the one running today.
- Fixed: Bridge days follow the country's own weekend (Friday and Saturday in Israel, Saudi Arabia, Egypt …) and come only from whole-day public and bank holidays.
- New: A single working day between two holidays is a bridge day too, e.g. 2 May in Poland or 7 December in Spain.
- Fixed: Excluding a holiday now excludes its substitute day as well, e.g. Boxing Day moved to the Monday.
- Fixed: The system country is recognised for the names of the first-run wizard (Korea, Vietnam, Serbia …); a country the adapter cannot use is named in the log.
- Fixed: The settings card shows holiday names in your language like the data points and previews the country detected from the system settings.
- Improved: The settings card lists countries in your admin language and keeps exclusions of holiday types you switched off.
- Changed: The bridge-day name in Russian and Ukrainian is now "День-мост" / "День-міст"; next.daysUntil uses the unit "d".
- Fixed: Error reporting via Sentry is active by default — the README and the documentation said otherwise.
- New: Holiday data for Uzbekistan.

### 0.17.0 (2026-09-15) — stable

- Fixed: Changing the country or the state in the settings now clears the narrower selection too — a leftover state code could silently publish another region's holidays.
- Fixed: Bridge days now carry their name in your language even for countries whose holiday data has no translation for it — they used to fall back to the English "Bridge day".
- Fixed: Without a configured country the adapter now publishes an empty result instead of leaving the last run's values standing.
- New: Errors during a run are reported to Sentry when error reporting is enabled in the ioBroker settings, so they can be fixed without a log file.

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