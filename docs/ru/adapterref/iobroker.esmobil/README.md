---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.esmobil/README.md
title: ioBroker.esmobil
hash: YfLXnDcM14TcdDB9HEUmpYiPd00op3YFQs+V8pVG6Nc=
---
![Логотип](../../../en/adapterref/iobroker.esmobil/admin/esmobil.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.esmobil.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.esmobil.svg)
![Количество установок](https://iobroker.live/badges/esmobil-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.esmobil.png?downloads=true)

# ioBroker.esmobil

## Адаптер ESmobil для ioBroker

Адаптер ioBroker для школьного расписания ( **VpMobil/Indiware** ) и домашних заданий/замечаний/оценок ( **Home.InfoPoint** ) — **эксклюзивно для четырех школ [группы TEGW](https://www.tegw.de/)** :

- **EOSW** - Европейская высшая школа Вальденбурга
- **EGW** - Европейская гимназия Вальденбург
- **EOSH** - Европейская высшая школа Хартмансдорф
- **EGL** - Европейская начальная школа Лихтенштейна

Это намеренно **не** универсальный адаптер VpMobil/Indiware: адреса серверов жестко закодированы для каждой школы (см. ниже) и не подлежат свободной настройке. Конфигурация адаптера позволяет выбрать только свою школу из фиксированного списка. Название и используемые в этом адаптере знания заимствованы из Android-приложения **ESmobil,** используемого той же группой школ — этот адаптер переносит интеграцию VpMobil/Home.InfoPoint один в один на Node.js.

Адаптер непрерывно работает в фоновом режиме (в режиме демона, как и большинство адаптеров ioBroker — без cron-заданий): он немедленно при запуске получает настроенные источники, а затем снова с настраиваемым интервалом (по умолчанию: каждые 30 минут).

Этот адаптер является независимым проектом, созданным силами сообщества, и не имеет никакого отношения к операторам VpMobil/Indiware или Home.InfoPoint.

## Что подходит для какой школы?

| Школа | Расписание (VpMobil)                                                                                      | Домашняя работа/замечания/оценки (Главная.Информационная точка) |
| ----- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| EOSW  | ✅                                                                                                         | ✅                                                               |
| ЭГВ   | ✅ (использует тот же экземпляр VpMobil, что и EOSW, имеет собственную область Home.InfoPoint)             | ✅                                                               |
| EOSH  | ⚠️ **Неподтверждено** - адрес угадан по шаблону других школ, никогда не проверялся (см. `lib/schools.js`) | ✅                                                               |
| ЭГЛ   | ❌ Расписание VpMobil недоступно                                                                           | ✅                                                               |

Адаптер автоматически скрывает раздел конфигурации расписания для EGL и дополнительно регистрирует предупреждение при запуске, если выбран режим EOSH, чтобы неподтвержденный адрес не остался незамеченным.

## Конфигурация

### Школа

Выберите одну из четырех школ, перечисленных выше. Все остальное (адреса серверов) определяется автоматически.

### Расписание (VpMobil / Indiware)

Отображается только в том случае, если у выбранной школы есть расписание (не для EGL).

| Поле             | Описание                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| Сорт             | Название класса точно такое, как указано в VpMobil, например: `08m2`     |
| Имя пользователя | Общешкольный вход, а не личный — по умолчанию используется... `schueler` |
| Пароль           | Пароль VpMobil для всей школы                                           |

### Домашняя работа / замечания / оценки (Главная.Информационная точка)

Необязательная опция, активируется с помощью флажка «Также получать домашние задания, замечания и оценки».

- Доступно для всех четырех школ.

| Поле                      | Описание                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| Имя пользователя / Пароль | Персональный логин студента                                               |
| URL календаря Moodle      | Необязательный параметр, не зависящий от указанных выше полей — см. ниже. |

Имя пользователя/пароль Home.InfoPoint и URL-адрес календаря Moodle независимы друг от друга — можно указать и то, и другое (или оба варианта). Замечания и оценки берутся только из Home.InfoPoint; список домашних заданий объединяет данные из обоих источников.

#### Календарь Moodle (необязательно)

Если вы также хотите, чтобы сроки сдачи заданий в Moodle отображались в `homework.entries` Вставьте сюда URL-адрес экспорта вашего личного календаря Moodle. Найдите его в Moodle в разделе **Календарь → Экспорт календаря → "События этого курса"/"Все курсы" → "Получить URL календаря"** . Этот URL-адрес уже содержит закрытый токен доступа, поэтому он хранится так же, как пароль (зашифрованный, скрытый в пользовательском интерфейсе).

## Дерево штата

```
esmobil.0.info.connection          boolean  - at least one source was fetched successfully
esmobil.0.plan.day1.date           string   - date (yyyy-MM-dd) of the Monday of the school week
esmobil.0.plan.day1.sourceTimestamp string  - data timestamp reported by the server
esmobil.0.plan.day1.lessonCount    number   - number of lessons
esmobil.0.plan.day1.lessons        string   - lessons as a JSON array
esmobil.0.plan.day1.zusatzInfo     string   - general notice(s) for the day (e.g. special schedule, event day), multiple lines joined with " | "; empty if none
esmobil.0.plan.day2.* ... plan.day5.*       - the same states for Tuesday through Friday of the same week
esmobil.0.plan.week.days           string   - the complete week plan (day1-day5) as one JSON array, see below
esmobil.0.homework.count           number   - number of homework entries (Home.InfoPoint + Moodle combined)
esmobil.0.homework.entries         string   - homework as a JSON array, each entry tagged with "source": "homeinfopoint" or "moodle"
esmobil.0.homework.newCount        number   - number of NEW homework entries since the last poll
esmobil.0.homework.newEntries      string   - new homework entries since the last poll, as a JSON array
esmobil.0.remarks.count            number   - number of remarks
esmobil.0.remarks.entries          string   - remarks as a JSON array
esmobil.0.remarks.newCount         number   - number of NEW remarks since the last poll
esmobil.0.remarks.newEntries       string   - new remarks since the last poll, as a JSON array
esmobil.0.grades.subjectCount      number   - number of subjects WITH at least one grade
esmobil.0.grades.bySubject         string   - all subjects as a JSON object (including subjects without any grade)
esmobil.0.grades.subjects.<subject>.label       string - subject label, e.g. "DE - Deutsch (Schuster)"
esmobil.0.grades.subjects.<subject>.count       number - number of grades for this subject
esmobil.0.grades.subjects.<subject>.average     number - average of this subject as a number, e.g. 1.7
esmobil.0.grades.subjects.<subject>.averageNote string - average of this subject as a grade, e.g. "2+"
esmobil.0.grades.subjects.<subject>.entries     string - grades of this subject as a JSON array
esmobil.0.grades.overallAverage    number   - average across all subjects as a number (weighted per grade, not per subject)
esmobil.0.grades.overallAverageNote string  - the same average as a grade
esmobil.0.grades.newCount          number   - number of NEW grades since the last poll
esmobil.0.grades.newEntries        string   - new grades since the last poll, as a JSON array (including subject)
esmobil.0.info.newItemsCount       number   - new homework+remarks+grades combined in this poll
esmobil.0.info.lastNewAt           string   - timestamp (ISO) of the last poll that found at least one new entry
```

### Получать уведомления о поступлении чего-либо нового

Сам адаптер не отправляет push-уведомления (он не знает ваших настроек Telegram/Pushover и т. д.), но он предоставляет все необходимое для этого для пользовательской автоматизации (скрипт, Blockly, Node-RED):

- `esmobil.0.info.lastNewAt` Изменения происходят **только** тогда, когда опрос выявляет хотя бы одну новую запись — это наиболее надежная точка срабатывания для «изменения состояния», поскольку она не может быть «поглощена» двумя последовательными партиями новых записей одинакового размера (в отличие от простого состояния «истина/ложь» или счетчика, которое может не сработать снова при идентичном значении).
- `esmobil.0.info.newItemsCount` а также `homework.newCount` /`remarks.newCount` /`grades.newCount` Укажите, сколько их было.
- `homework.newEntries` /`remarks.newEntries` /`grades.newEntries` Содержит сами новые записи (текст для уведомления).

Пример простого скрипта-адаптера на JavaScript:

```js
on({ id: 'esmobil.0.info.lastNewAt', change: 'ne' }, () => {
    const homework = JSON.parse(getState('esmobil.0.homework.newEntries').val);
    const grades = JSON.parse(getState('esmobil.0.grades.newEntries').val);
    // e.g. sendTo('telegram.0', 'send', { text: '...' });
});
```

При первом же опросе после установки/обновления ничто не считается «новым» (иначе все существующие записи были бы отмечены как новые) — подлинно новые записи обнаруживаются только начиная со второго опроса.

`plan.day1` через `plan.day5` Данные всегда отображаются с понедельника по пятницу реальной календарной недели, а не за «следующие 5 доступных дней». В будний день это текущая неделя (включая уже прошедшие будние дни, поэтому отображение недели всегда полное); в субботу/воскресенье это уже предстоящая неделя. Дни, данные по которым отсутствуют на сервере (например, праздники или прошлые будние дни, которые VpMobil больше не хранит), по-прежнему отображают правильную дату. `lessonCount: 0` пустое пространство `lessons` массив и пустой `zusatzInfo` Вместо того чтобы отсутствовать. Для EGL все эти состояния остаются пустыми, поскольку там нет расписания VpMobil.

Для просмотра недельного графика (например, в вашем собственном виджете панели мониторинга/визуализации) самый простой вариант —`plan.week.days` - единый JSON-массив, содержащий все пять дней в следующем формате:

```json
[
  { "weekdayEn": "Monday", "weekdayDe": "Montag", "date": "2026-09-07", "sourceTimestamp": "04.09.2026, 10:36", "lessons": [ /* see below */ ], "zusatzInfo": [] },
  { "weekdayEn": "Tuesday", "weekdayDe": "Dienstag", "date": "2026-09-08", "sourceTimestamp": "...", "lessons": [], "zusatzInfo": ["EOSW: Kl. 7m2 1.-5. Stunde Alkoholparcours"] }
]
```

На странице оценок Home.InfoPoint всегда отображаются **все** предметы класса, включая те, по которым оценки не выставлены (они отображаются в виде пустой таблицы). `grades.subjectCount` /`grades.bySubject` В противном случае, они бы тоже учитывались. Для наглядного просмотра в разделе «Администрирование» → «Объекты» каждый предмет **, имеющий хотя бы одну оценку,** получает свой собственный канал. `grades.subjects.<subject-code>` (например `grades.subjects.de`, `grades.subjects.bio`) с `label`, `count`, `average`, `averageNote` и `entries` Предметы без оценок намеренно не получают собственный канал, чтобы избежать загромождения списка объектов пустыми записями — они появляются (с пустым массивом) только в `grades.bySubject`.

`average` Отображает среднее значение в виде числа (например, 1,7). `averageNote` Средний балл равен оценке (например, «2+»). Оценки, которые нельзя однозначно интерпретировать как оценку (например, свободный текст), не учитываются при расчете среднего балла, но все же принимаются во внимание. `count`. `grades.overallAverage` /`overallAverageNote` сформировать одинаковое среднее значение по всем предметам.

А `lessons` Запись имеет следующий вид:

```json
{
  "period": "3",
  "begin": "09:50",
  "end": "10:35",
  "subjects": ["MA"],
  "teacher": "Mül",
  "room": "101",
  "info": "substitution",
  "changed": true
}
```

## Changelog
### 0.5.12 (2026-09-22)
* Fix: `plan.day1`-`plan.day5` channel names now include translations for all 11 recommended languages (previously only `en`/`de`)
* Fix: README's `plan.week.days` example now shows `weekdayEn`/`weekdayDe` instead of the removed single `weekday` field

### 0.5.11 (2026-09-13)
* Fix: all `common.name` objects created in code now include translations for all 11 recommended languages (previously only `en`/`de`), fixing repository object-structure check warnings (E6001)

### 0.5.10 (2026-09-13)
* Fix: all log messages in `main.js` are now in English (were German)
* Fix: all object/channel `common.name` fields created in code now use bilingual `{en, de}` names instead of German-only text
* Fix: `plan.week.days` entries now carry `weekdayEn`/`weekdayDe` instead of a single German-only `weekday` field
* Fix: `pollIntervalMinutes` now has an enforced upper bound (1440 minutes / 24h) to avoid a `setTimeout` overflow with very large configured values
* README: added a link to the [TEGW school group](https://www.tegw.de/)

### 0.5.9 (2026-09-09)
* Repository maintenance: removed the changelog entry for 0.5.7, a version that was tagged in this file's history but never actually published to npm (0.5.6 was followed directly by 0.5.8)

### 0.5.8 (2026-09-09)
* Fix: a Moodle homework/exam due date with a specific time (not all-day) could be off by one day depending on the time of day, because the UTC timestamp from the calendar export was used as-is instead of being converted to the school's local time (Europe/Berlin) first (e.g. a `20260913T220000Z` deadline - 00:00 CEST on the 14th - was wrongly shown as due on the 13th)
* Corrected for both this adapter (`lib/moodle.js`) and the companion Android app

## License

MIT License

Copyright (c) 2026 Maik Ries & Christian Winter <iobroker@ne-xt.de>

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