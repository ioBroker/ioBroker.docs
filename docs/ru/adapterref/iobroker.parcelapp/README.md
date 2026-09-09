---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.parcelapp
BADGE-stable: https://iobroker.live/badges/parcelapp-stable.svg
BADGE-Installations: https://iobroker.live/badges/parcelapp-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.parcelapp
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.parcelapp/README.md":{"title":{"en":"ioBroker.parcelapp — User documentation"},"content":"en/adapterref/iobroker.parcelapp/README.md"},"en/adapterref/iobroker.parcelapp/scripting.md":{"title":{"en":"Scripting and automation"},"content":"en/adapterref/iobroker.parcelapp/scripting.md"},"en/adapterref/iobroker.parcelapp/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.parcelapp/faq.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parcelapp/README.md
title: ioBroker.parcelapp - Документация для пользователей
hash: 8L8tMG8cypKGVVg3vPP8hyDskQ7p0X7simBEBDMW290=
---
# ioBroker.parcelapp — Документация для пользователей

Отслеживайте посылки от всех перевозчиков. [parcel.app](https://parcelapp.net) Поддерживается с помощью одного API-ключа. Адаптер опрашивает вашу учетную запись parcel.app и отображает каждую отправку в дереве объектов ioBroker.

Главы: **эта страница** · [Скриптинг и автоматизация](scripting.md) · [Часто задаваемые вопросы](faq.md)

---

## Прежде чем начать

Вам нужен **Премиум-подписка parcel.app**API — это функция премиум-класса; без него каждый запрос будет возвращать HTTP 403, и адаптер не сможет ничего прочитать. Адаптер никогда не создает и не управляет вашей учетной записью parcel.app; он только читает (и, по запросу, добавляет) заказы на доставку.

Адаптер не взаимодействует с перевозчиками напрямую. Все, что вы видите в ioBroker, — это информация, которую parcel.app сам знает о доставке, поэтому, если parcel.app не сможет связаться с перевозчиком, поле останется пустым и здесь.

---

## Настройка

### 1. Получите свой API-ключ.

1. Открыть [web.parcelapp.net](https://web.parcelapp.net) и войдите в систему, используя свою учетную запись parcel.app.
2. Откройте **API** панель.
3. Скопируйте ключ. Это длинная строка — скопируйте её целиком, без пробелов.

### 2. Создайте экземпляр.

В ioBroker перейдите в **Адаптеры**, искать `parcelapp` и добавить экземпляр. Диалоговое окно конфигурации откроется автоматически.

### 3. Заполните настройки.

| Параметр                                       | Что это делает                                                                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Ключ API**                                   | Ключ из шага 1. Он хранится в зашифрованном виде в объекте экземпляра и никогда не записывается в журнал.                                  |
| **Интервал опроса**                            | Как часто адаптер запрашивает у parcel.app обновление, в минутах (5–60, по умолчанию 10).                                                  |
| **Автоматически удалять доставленные посылки** | Вкл.: доставленный пакет исчезает из дерева объектов. Выкл.: он сохраняет свой статус. _Доставленный_ пока вы не удалите его в parcel.app. |

### 4. Проверьте соединение.

Нажимать **Проверить соединение**Кнопка выполняет один реальный запрос к API и сообщает фактический результат — указывается неверный ключ, истекшая подписка или проблема в сети, а не скрывается за зеленым «ОК». После этого сохраните изменения; экземпляр запускается, и сразу же следует первый опрос.

> Примечание: в тесте используется тот же бюджет запросов, что и при опросе (20 запросов в час). Нажатие кнопки несколько раз во время настройки допустимо; многократное нажатие — нет.

### Выбор интервала опроса

parcel.app предоставляет список доставок из серверного кэша, который примерно равен... **от 45 до 90 минут**
устаревшие данные. Поэтому более короткий интервал не делает данные отслеживания более актуальными — он лишь сокращает задержку между обновлением кеша parcel.app и обнаружением этого ioBroker. Значение по умолчанию в 10 минут — хороший компромисс; любое значение меньше 5 минут превысит почасовой лимит запросов и будет отклонено.

---

## Что отображается в дереве объектов?

```
parcelapp.0.
├── info.connection              Connection to the parcel.app API
├── summary.
│   ├── activeCount              Packages not yet delivered
│   ├── todayCount               Packages expected today
│   └── deliveryWindow           Combined window of today's packages
└── deliveries.
    └── <packageId>.             One device per package
        ├── carrier
        ├── status
        ├── statusCode
        ├── description
        ├── trackingNumber
        ├── extraInfo
        ├── deliveryWindow
        ├── deliveryEstimate
        ├── lastEvent
        ├── lastLocation
        └── lastUpdated
```

### Связь

| Точка данных      | Тип        | Значение                                                                                                                                                                                                                     |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | логический | Верно, пока адаптер может получить доступ к API parcel.app. Небольшая проблема с базой данных на стороне ioBroker не решит проблему. **нет** Установите значение false — это произойдет только в случае реальной ошибки API. |

### Краткое содержание

| Точка данных             | Тип   | Значение                                                                                                                                                                                                                                   |
| ------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `summary.activeCount`    | число | Посылки, которые еще не доставлены.                                                                                                                                                                                                        |
| `summary.todayCount`     | число | Посылки, ожидаемая дата доставки которых — сегодня.                                                                                                                                                                                        |
| `summary.deliveryWindow` | нить  | Суммарный временной интервал для всех посылок, ожидаемых сегодня: от самого раннего начала до самого позднего окончания, например. `09:15 - 18:30`Пустое поле, если ни один пакет не сообщает о наличии пригодного для использования окна. |

Сводные значения следующие: **нет** Сбрасывается при остановке экземпляра. Количество пакетов в пути не меняется просто потому, что никто не смотрит.

### За упаковку

Каждый пакет становится **устройство** под `deliveries.`Название устройства — это описание, которое вы указали для отправления в parcel.app, и если вы переименуете устройство в административной панели ioBroker, ваше имя останется неизменным и никогда не будет перезаписано при обновлении.

| Точка данных       | Тип   | Значение                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `carrier`          | нить  | Отображаемое название перевозчика (например) `DHL Express`). В случае, если в parcel.app нет для него названия, используется код перевозчика, написанный заглавными буквами.                                                                                                                                                                                                   |
| `status`           | нить  | Статус отображается в виде читаемого текста на языке вашей системы ioBroker.                                                                                                                                                                                                                                                                                                   |
| `statusCode`       | число | Статус как числа — **Это точка данных, которую следует использовать в скриптах.**, потому что это не меняется в зависимости от языка. См. таблицу ниже.                                                                                                                                                                                                                        |
| `description`      | нить  | Описание с сайта parcel.app. В отличие от названия устройства, здесь всегда отображается текущее значение.                                                                                                                                                                                                                                                                     |
| `trackingNumber`   | нить  | Номер для отслеживания.                                                                                                                                                                                                                                                                                                                                                        |
| `extraInfo`        | нить  | Дополнительная информация, необходимая перевозчику, например, почтовый индекс или адрес электронной почты. Для большинства отправлений поле остается пустым.                                                                                                                                                                                                                   |
| `deliveryWindow`   | нить  | Ожидаемый временной интервал доставки, например: `14:00 - 16:00`В окне, охватывающем несколько дней, дата отображается с обеих сторон.`12-06 14:30 - 12-08 18:30`). Пусто, если нет подходящего окна — либо оператор связи не сообщает о его наличии, либо сообщает дату в формате, который адаптер не считывает (в этом случае в отладочной строке указывается имя значения). |
| `deliveryEstimate` | нить  | Та же информация в текстовом виде: _сегодня_, _завтра_, _через 3 дня_, _просрочен&#x43E;_&#x41E;тображено на языке системы.                                                                                                                                                                                                                                                    |
| `lastEvent`        | нить  | Последнее событие отслеживания с указанием даты, например. `Arrived at delivery depot - 2026-09-02`.                                                                                                                                                                                                                                                                           |
| `lastLocation`     | нить  | Место, где произошло это событие, определяется по сообщению оператора связи.                                                                                                                                                                                                                                                                                                   |
| `lastUpdated`      | нить  | Когда появились последние данные отслеживания **измененный** — Не тогда, когда адаптер в последний раз опрашивался. Упаковка, которая лежит неподвижно два дня, сохраняет двухдневную метку времени; это сделано намеренно.                                                                                                                                                    |

### Коды состояния

| Код | Значение          | Код | Значение                     |
| --- | ----------------- | --- | ---------------------------- |
| 0   | Доставленный      | 5   | Не найдено                   |
| 1   | Замороженный      | 6   | Попытка доставки не удалась. |
| 2   | В пути            | 7   | Исключение                   |
| 3   | Ожидание отправки | 8   | Получена информация          |
| 4   | Доставка в пути   | -1  | Неизвестный                  |

`-1` Это не статус parcel.app. Адаптер использует его, когда parcel.app отправляет значение статуса, которое он не может интерпретировать — например, потому что в будущей версии приложения был введен новый код. Такой пакет остается
**видимый** вместо того, чтобы быть ошибочно принятым за "доставленный" и незаметно удаленным.

Только для посылок со статусом 2, 4 и 8 может быть указана ожидаемая дата доставки, поэтому `deliveryWindow` и
`deliveryEstimate` Для всех остальных статусов эти поля пусты.

---

## Язык

Весь текст, который записывает адаптер — метки статуса, предполагаемые сроки доставки, названия и описания объектов — соответствует... **язык системы ioBroker** (_Системные настройки → Язык_). Для каждого экземпляра нет отдельной настройки языка. Изменение системного языка вступает в силу для имен объектов немедленно, а для значений состояния — после следующей перезагрузки адаптера.

---

## Удаление пакетов

В API parcel.app отсутствует конечная точка удаления, поэтому адаптер **не может** Удалите отправление из своего аккаунта parcel.app. Удалите его в приложении parcel.app или на веб-сайте, и оно исчезнет из ioBroker после следующего опроса.

Что делает адаптер: с _Автоматически удалять доставленные посылки_ При включении этой функции доставленная посылка и все ее состояния удаляются из дерева объектов — сама отправка остается в вашей учетной записи parcel.app.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.12.1 (2026-09-07)

- New: Carrier, status and description of a package now carry a short explanation in the object tree, in all eleven languages — including why scripts should read the status code, not the text.

### 0.12.0 (2026-09-06)

- Fixed: A package that reappeared after a database hiccup kept datapoints without a name or description until the adapter was restarted.
- Fixed: A delivery window written as "September 6, 2026 14:30" was ignored, so window, estimate and the count of packages expected today stayed empty for those carriers.
- New: The documentation explains why a delivery window can stay empty, and an unreadable date from the carrier can now be reported so the format gets added.
- New: The last known location of a package explains itself in the object tree: it is where the carrier last scanned it, not a live position.

### 0.11.1 (2026-09-04)

- Fixed: The last-changed timestamp of a package kept its old label and had no description as long as the package did not move.

### 0.11.0 (2026-09-04)

- Fixed: Since version 0.10.3 the Test Connection button gave no response at all, and packages added from a script never showed up — both work again.
- Fixed: On installations that already existed, the summary datapoints and the connection state kept their old English names — an update now reaches every datapoint.
- New: Datapoints whose name alone does not explain them now carry a short description in the object tree, in all eleven languages.
- New: Detailed user documentation in English and German, shown in the ioBroker documentation portal.
- Fixed: Two settings from much older versions were still listed in the instance configuration although nothing used them any more.

### 0.10.4 (2026-09-02)

- Fixed: A malformed reply from parcel.app (empty body or a broken delivery entry) no longer aborts the poll with a cryptic internal message — it is reported as an API problem and retried next poll.
- Fixed: A brief ioBroker database hiccup while marking the connection as online was mistaken for a parcel.app failure and switched the connection indicator to red.
- Fixed: Scripts that call checkConnection with a non-text API key now receive the regular "API key is too short" reply instead of an internal failure.
- Improved: Control characters in texts coming from parcel.app (carrier names, status notes) are now stripped completely before they reach the states.

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

---

_Developed with assistance from Claude.ai_