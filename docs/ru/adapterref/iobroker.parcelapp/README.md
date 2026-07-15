---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parcelapp/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="48" align="top" /> ioBroker.parcelapp
hash: CzzU2EVq7OkXREMnw8rabS8u8RiGKuEC+cHoym2mXxE=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="48" align="top" /> ioBroker.parcelapp

![npm версия](https://img.shields.io/npm/v/iobroker.parcelapp)
![стабильный](https://iobroker.live/badges/parcelapp-stable.svg)
![Установки](https://iobroker.live/badges/parcelapp-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.parcelapp)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Адаптер ioBroker для API [parcel.app](https://parcelapp.net). Поддерживает всех перевозчиков, которых отслеживает parcel.app.

---

## Функции
- **Все перевозчики, поддерживаемые parcel.app** — DHL, FedEx, UPS, Amazon, Hermes, GLS, DPD и все остальные, которых поддерживает parcel.app.
- **Состояния ioBroker для каждой посылки** — перевозчик, статус, номер отслеживания, временной интервал доставки, последнее событие, последнее местоположение
- **Сводные данные по штатам** — количество активных случаев, количество случаев за сегодняшний день, общий период доставки
- **Ориентировочные сроки доставки** — сегодня, завтра, через X дней с учетом объединенного временного интервала.
- **Настраиваемый интервал опроса** (5–60 минут)
- **Настраиваемая очистка** — автоматическое удаление доставленных посылок или сохранение их до удаления в parcel.app
- **Добавление доставок** через сообщение sendTo из скриптов или других адаптеров
- **Административный интерфейс** с настройками проверки соединения и опроса.

---

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Требования
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **Администратор ioBroker >= 7.8.23**
- **Премиум-подписка на parcel.app** — необходима для доступа к API.

---

## Конфигурация
| Параметр | Описание | По умолчанию |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **Ключ API** | Ваш ключ API parcel.app (получите его по адресу [web.parcelapp.net](https://web.parcelapp.net)) | — |
| **Интервал опроса** | Как часто получать обновления (в минутах). parcel.app предоставляет список из серверного кэша с интервалом ~45–90 минут, поэтому более короткие интервалы, как правило, уменьшают задержку до момента обновления. | 10 |
| **Автоматическое удаление доставленных** | Автоматическое удаление доставленных посылок из списка статусов. При отключении этой функции они остаются в списке до тех пор, пока не будут удалены в parcel.app. | Да |

Метки статуса (`Delivered`, `In Transit`, …) и предполагаемые сроки доставки (`today`, `tomorrow`, `in X days`) отображаются на языке системы ioBroker.

---

## Государственное дерево
```
parcelapp.0.
├── info.connection              — Connection status (bool)
├── summary.
│   ├── activeCount              — Number of active deliveries
│   ├── todayCount               — Number of deliveries expected today
│   └── deliveryWindow           — Combined delivery window for today
└── deliveries.
    └── {packageId}.             — One device per package
        ├── carrier              — Carrier name (e.g. DHL Express)
        ├── status               — Status text (e.g. In Transit)
        ├── statusCode           — Status code (0-8, -1 = unknown)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Timestamp of the last tracking-data change
```

**Коды состояния** (`statusCode` — основной показатель для автоматизации):

| Код | Значение | Код | Значение |
| ---- | --------------- | ---- | ----------------------- |
| 0 | Доставлено | 5 | Не найдено |
| 1 | Заморожено | 6 | Попытка доставки не удалась |
| 2 | В пути | 7 | Исключение |
| 3 | Ожидается получение | 8 | Информация получена |
| 4 | В пути | -1 | Неизвестно (неожиданное значение API — пакет остается видимым) |

---

## Добавление доставок через скрипт
Вы можете добавлять новые доставки из JavaScript/Blockly-скриптов:

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
  // optional:
  language: "de", // tracking language as an ISO 639-1 code, default "en"
  send_push_confirmation: true, // send a push once the delivery is added, default false
});
```

`tracking_number`, `carrier_code` и `description` обязательны; `language` и `send_push_confirmation` необязательны. Доставка добавляется в ваш аккаунт parcel.app, и сразу же запускается опрос (не более одного опроса в минуту) — но для недавно добавленных доставок обычно еще нет данных отслеживания (см. примечание ниже).

**Примечания:**

- **Ограничение на количество доставок POST: 20 в день** — неудачные попытки (например, неверный `carrier_code`) также учитываются в этом лимите.
- **Каждое поле может содержать не более 512 символов**, и адаптер принимает не более **20 вызовов addDelivery в минуту** — при превышении любого из этих ограничений вызов возвращает `success: false` с поясняющим сообщением `error_message` вместо того, чтобы обратиться к parcel.app.
- Отслеживание новых отправлений обычно прекращается на **45–90 минут** после добавления в базу данных. Это задержка на стороне parcel.app, а не проблема адаптера.
— **Удаление пакетов возможно только в веб-интерфейсе приложения parcel.app** — API не имеет конечной точки для удаления. При включенной опции `autoRemoveDelivered` адаптер по-прежнему автоматически удаляет доставленные пакеты из состояний ioBroker.

---

## Поиск неисправностей
### Проверка соединения не удалась
— Подтвердите свой API-ключ на сайте [web.parcelapp.net](https://web.parcelapp.net)
— Убедитесь, что у вас есть активная премиум-подписка.
— Проверьте, есть ли у вашего экземпляра ioBroker доступ к интернету.

### Доставка не указана
- API возвращает кэшированные данные — для отображения новых доставок и новых событий отслеживания может потребоваться **45–90 минут** (кэш на стороне приложения Parcel.app).
— Проверьте, есть ли у вас активные доставки в приложении parcel.app.

### Лимит скорости
- GET (опрос): **20 запросов в час** — минимальный интервал опроса составляет 5 минут, чтобы оставаться в пределах этого лимита.
- POST (добавление доставок): **20 запросов в день**, неудачные попытки также учитываются.

---

## Поддерживать
- [Форум ioBroker](https://forum.iobroker.net/)
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.parcelapp/issues)

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-08)

- Fixed: the admin "Test Connection" button now reports real failures — before, it always showed "Ok" even with a wrong API key.
- Fixed: a package's last-updated timestamp no longer jumps to the restart time after an adapter restart — it only changes when tracking data actually changed.
- Fixed: a stalled API response can no longer freeze polling until a manual restart — every request now has a hard 60-second deadline.
- Fixed: a failed adapter start now triggers an automatic restart instead of leaving the adapter idle until restarted by hand.
- Changed: recurring errors such as a wrong API key are logged once instead of every poll cycle, and stopping the adapter no longer leaves a red error line in the log.
- Changed: short ioBroker database hiccups no longer flip the connection indicator — it now reflects only the parcel.app connection.
- Changed: the fallback package name ("Package …") is localized like all other texts, and the adapter is listed under a fitting admin category (misc-data).
- Changed: the automatic poll after adding a delivery now respects the one-minute pacing, so bulk-adds can no longer exhaust the hourly API budget.

### 0.9.0 (2026-06-23) — stable

- Fixed: tracked packages could disappear from the object tree after a temporary update error or an unexpected API response — a package is now kept until parcel.app actually stops returning it.
- Changed: multi-day delivery windows now show the date on each side (e.g. `12-06 14:30 - 12-08 18:30`) instead of looking same-day; out-of-range or reversed dates no longer produce a misleading window.

### 0.8.0 (2026-06-19)

- The delivery window is now also shown for carriers that report it only as a date/time range, not just when the API provides a Unix timestamp.
- When adding a delivery via script, you can now set an optional tracking language and request a push confirmation.

### 0.7.2 (2026-06-12) — stable

- Much quieter state updates: a package's last-updated timestamp now only changes when its tracking data actually changed, and device entries are no longer rewritten on every poll
- Adding a delivery with a malformed request now returns a clear error message instead of failing cryptically

### 0.7.1 (2026-06-09)

- Fixed a timezone edge case in delivery estimates: when the API reports only a calendar date, the estimate could be off by a day in time zones west of UTC — now stable everywhere.

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