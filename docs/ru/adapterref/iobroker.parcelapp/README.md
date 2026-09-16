---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.parcelapp
BADGE-stable: https://iobroker.live/badges/parcelapp-stable.svg
BADGE-Installations: https://iobroker.live/badges/parcelapp-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.parcelapp
BADGE-Test and Release: https://github.com/krobipd/ioBroker.parcelapp/actions/workflows/test-and-release.yml/badge.svg
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
hash: JzPjHwn4xT8wIIjWrvCiSyuRL3+Fjxxz6MMyWuqqLT4=
---
# ioBroker.parcelapp — Документация для пользователей

Отслеживайте посылки от всех перевозчиков, поддерживаемых [parcel.app](https://parcelapp.net) , с помощью одного API-ключа. Адаптер опрашивает вашу учетную запись parcel.app и отображает каждую отправку в дереве объектов ioBroker.

Разделы: **эта страница** · [Скриптинг и автоматизация](/#/docs/adapterref/iobroker.parcelapp/scripting.md) · [Часто задаваемые вопросы](/#/docs/adapterref/iobroker.parcelapp/faq.md)

---

## Прежде чем начать

Для использования API требуется **премиум-подписка parcel.app** . Без неё каждый запрос будет возвращать HTTP-код 403, и адаптер не сможет ничего прочитать. Адаптер никогда не создаёт и не управляет вашей учётной записью parcel.app; он только читает (и, по запросу, добавляет) отправления.

Адаптер не взаимодействует с перевозчиками напрямую. Все, что вы видите в ioBroker, — это информация, которую parcel.app сам знает о доставке, поэтому, если parcel.app не сможет связаться с перевозчиком, поле останется пустым и здесь.

---

## Настройка

### 1. Получите свой API-ключ.

1. Откройте [web.parcelapp.net](https://web.parcelapp.net) и войдите в систему, используя свою учетную запись parcel.app.
2. Откройте панель **API** .
3. Скопируйте ключ. Это длинная строка — скопируйте её целиком, без пробелов.

### 2. Создайте экземпляр.

В ioBroker перейдите в **раздел «Адаптеры»** и найдите...`parcelapp` и добавить экземпляр. Диалоговое окно конфигурации откроется автоматически.

### 3. Заполните настройки.

| Параметр                                       | Что это делает                                                                                                                                                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ключ API**                                   | Ключ из шага 1. Он хранится в зашифрованном виде в объекте экземпляра и никогда не записывается в журнал.                                                                                                              |
| **Интервал опроса**                            | Как часто адаптер запрашивает у parcel.app обновление, в минутах (5–60, по умолчанию 10).                                                                                                                              |
| **Автоматически удалять доставленные посылки** | Вкл.: доставленный пакет исчезает из дерева объектов. Выкл.: он остается в статусе _«Доставлено»_ до тех пор, пока parcel.app отображает его — адаптер удаляет пакет только тогда, когда API перестает его возвращать. |

### 4. Проверьте соединение.

Нажмите **«Проверить соединение»** . Кнопка выполняет один реальный запрос к API и сообщает фактический результат — указывается неверный ключ, истекшая подписка или проблема с сетью, а не скрывается за зеленым «ОК». После этого сохраните изменения; экземпляр запускается, и сразу же следует первый опрос.

> Примечание: в тесте используется тот же бюджет запросов, что и при опросе (20 запросов в час). Нажатие кнопки несколько раз во время настройки допустимо; многократное нажатие — нет.

### Выбор интервала опроса

parcel.app получает список доставок из серверного кэша, который обновляется примерно за **45–90 минут** . Поэтому более короткий интервал не делает данные отслеживания более актуальными — он лишь сокращает задержку между обновлением кэша parcel.app и обнаружением этого ioBroker. Значение по умолчанию в 10 минут — хороший компромисс; любое значение меньше 5 минут превысит почасовой лимит запросов и будет отклонено.

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

| Точка данных      | Тип        | Значение                                                                                                                                                                                      |
| ----------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | логический | Это верно, пока адаптер может получить доступ к API parcel.app. Кратковременный сбой в базе данных на стороне ioBroker **не** делает это ложным — ложным становится только реальный сбой API. |

### Краткое содержание

| Точка данных             | Тип   | Значение                                                                                                                                                                                                                                   |
| ------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `summary.activeCount`    | число | Посылки, которые еще не доставлены.                                                                                                                                                                                                        |
| `summary.todayCount`     | число | Посылки, ожидаемая дата доставки которых — сегодня.                                                                                                                                                                                        |
| `summary.deliveryWindow` | нить  | Суммарный временной интервал для всех посылок, ожидаемых сегодня: от самого раннего начала до самого позднего окончания, например.`09:15 - 18:30` Пустое поле, если ни один пакет не сообщает о наличии пригодного для использования окна. |

Сводные значения **не** сбрасываются при остановке экземпляра. Количество пакетов в пути не меняется просто потому, что никто не следит за ними.

### За упаковку

Каждый пакет становится **устройством** в рамках`deliveries.` Имя устройства — это описание, которое вы указали для отправления в parcel.app, и оно следует за ним: измените описание там, и устройство будет переименовано при следующем запросе. Адаптер владеет этим именем, поэтому переименование устройства в административной панели ioBroker не сохраняется — для собственной метки используйте псевдоним или точку данных в`0_userdata` .

На каждом пакете в дереве объектов также отображается **пиктограмма его курьера** , поэтому вы можете увидеть, кто доставляет посылку, еще до того, как прочитаете название: DHL, Deutsche Post, Hermes/Evri, DPD, GLS, UPS, Amazon, USPS, TNT, Apple, Vinted и DoorDash имеют свои собственные знаки, национальные почтовые операторы используют один конверт, а каждый второй курьер получает свой фургон для доставки. Знаки отображаются в монохромном режиме и соответствуют вашей теме оформления административной панели.

| Точка данных       | Тип   | Значение                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `carrier`          | нить  | Отображаемое название перевозчика (например)`DHL Express` ). В случае, если в parcel.app нет названия для кода перевозчика, используется код, написанный заглавными буквами.                                                                                                                                                                                                    |
| `status`           | нить  | Статус отображается в виде читаемого текста на языке вашей системы ioBroker.                                                                                                                                                                                                                                                                                                    |
| `statusCode`       | число | Статус в числовом виде — **это тот параметр, который следует использовать в скриптах** , поскольку он не меняется в зависимости от языка. См. таблицу ниже.                                                                                                                                                                                                                     |
| `description`      | нить  | Описание с сайта parcel.app — тот же текст, что и в названии устройства.                                                                                                                                                                                                                                                                                                        |
| `trackingNumber`   | нить  | Номер для отслеживания.                                                                                                                                                                                                                                                                                                                                                         |
| `extraInfo`        | нить  | Дополнительная информация, необходимая перевозчику, например, почтовый индекс или адрес электронной почты. Для большинства отправлений поле остается пустым.                                                                                                                                                                                                                    |
| `deliveryWindow`   | нить  | Ожидаемый временной интервал доставки, например:`14:00 - 16:00` В окне, охватывающем несколько дней, дата отображается с обеих сторон.`12-06 14:30 - 12-08 18:30` ). Пусто, если нет подходящего окна — либо оператор связи не сообщает о его наличии, либо сообщает дату в формате, который адаптер не считывает (в этом случае в отладочной строке указывается имя значения). |
| `deliveryEstimate` | нить  | Та же информация словами: _сегодня_ , _завтра_ , _через 3 дня_ , _просрочено_ . Отображается на языке системы.                                                                                                                                                                                                                                                                  |
| `lastEvent`        | нить  | Последнее событие отслеживания с указанием даты, например.`Arrived at delivery depot - 2026-09-02` .                                                                                                                                                                                                                                                                            |
| `lastLocation`     | нить  | Место, где произошло это событие, определяется по сообщению оператора связи.                                                                                                                                                                                                                                                                                                    |
| `lastUpdated`      | нить  | Время последнего **изменения** данных отслеживания — а не время последнего опроса адаптером. У посылки, которая лежит без движения два дня, сохраняется двухдневная отметка времени; это сделано намеренно.                                                                                                                                                                     |

### Коды состояния

| Код | Значение          | Код | Значение                     |
| --- | ----------------- | --- | ---------------------------- |
| 0   | Доставленный      | 5   | Не найдено                   |
| 1   | Замороженный      | 6   | Попытка доставки не удалась. |
| 2   | В пути            | 7   | Исключение                   |
| 3   | Ожидание отправки | 8   | Получена информация          |
| 4   | Доставка в пути   | -1  | Неизвестный                  |

`-1` Это не статус parcel.app. Адаптер использует его, когда parcel.app отправляет значение статуса, которое он не может интерпретировать — например, потому что в будущей версии приложения был введен новый код. Такой пакет остается **видимым,** вместо того чтобы быть ошибочно принятым за «доставленный» и незаметно удаленным.

Только для посылок со статусом 2, 4 и 8 может быть указана ожидаемая дата доставки, поэтому`deliveryWindow` и`deliveryEstimate` Для всех остальных статусов эти поля пусты.

Посылка в статусе 4 ( _В пути_ ) считается доставленной **сегодня,** даже если перевозчик не указывает ожидаемую дату, при условии, что последнее сканирование произошло сегодня — она находится в фургоне.`deliveryEstimate` затем читает _сегодня_ , и пакет включен в`summary.todayCount` , пока`deliveryWindow` Остается пустым, потому что нет времени показать.

---

## Язык

Весь текст, записываемый адаптером — метки состояния, оценки сроков доставки, имена и описания объектов — соответствует **системному языку ioBroker** ( _Системные настройки → Язык_ ). Для каждого экземпляра нет отдельной настройки языка. Изменение системного языка вступает в силу для имен объектов немедленно, а для значений состояния — после следующего перезапуска адаптера.

---

## Удаление пакетов

В API parcel.app отсутствует конечная точка удаления, поэтому адаптер **не может** удалить отправление из вашей учетной записи parcel.app. Удалите его в приложении parcel.app или в веб-версии, и оно исчезнет из ioBroker при следующем опросе.

Что делает адаптер: при включенной опции _«Автоматически удалять доставленные посылки_ » доставленная посылка и все ее состояния удаляются из дерева объектов — сама отправка остается в вашей учетной записи parcel.app.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.13.0 (2026-09-15)

- Fixed: Every package showed the carrier's short code instead of its name — parcel.app changed the format of its carrier list, and the adapter could no longer read it.
- New: Each package now carries the pictogram of its carrier in the object tree, drawn to read in the light and the dark theme.
- New: Deliveries added from a script can pass a postcode or an e-mail address — some carriers cannot track a shipment without one.
- Fixed: When parcel.app rejects a request, the reply now carries its own explanation instead of only the HTTP status line.
- Changed: The device name of a package follows the description in parcel.app again; a rename in the ioBroker admin no longer survives, use an alias for your own label.
- Fixed: The same tracking number under two carriers is two packages again — one of them used to be invisible in the object tree.
- Fixed: A failed removal of a delivered package no longer kept the count of active packages and the combined delivery window a poll behind.
- Improved: A package the carrier reports as out for delivery counts towards today even when no delivery date is reported.
- Fixed: Stopping the instance while it was still starting no longer spends one more request of the hourly parcel.app budget on a poll nobody reads.
- Fixed: The setting for delivered packages promised they stay until you delete them in parcel.app — they stay while parcel.app still lists them.

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