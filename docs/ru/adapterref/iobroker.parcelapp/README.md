---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parcelapp/README.md
title: ioBroker.parcelapp
hash: HMJiV39ELYn9BaDqr4iqCvqkfdmvJWle3gxBYIeasv0=
---
# IoBroker.parcelapp

![npm версия](https://img.shields.io/npm/v/iobroker.parcelapp)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![npm downloads](https://img.shields.io/npm/dt/iobroker.parcelapp)
![Установки](https://iobroker.live/badges/parcelapp-installed.svg)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="100" />

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

## Требования
- **Node.js >= 22**
- **ioBroker js-controller >= 7.0.7**
- **Администратор ioBroker >= 7.8.23**
- **Премиум-подписка на parcel.app** — необходима для доступа к API.

---

## Конфигурация
| Параметр | Описание | По умолчанию |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **Ключ API** | Ваш ключ API parcel.app (получите его по адресу [web.parcelapp.net](https://web.parcelapp.net)) | — |
| **Интервал опроса** | Как часто получать обновления (в минутах) | 10 |
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
        ├── statusCode           — Status code (0-8)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Last update timestamp
```

---

## Добавление доставок через скрипт
Вы можете добавлять новые доставки из JavaScript/Blockly-скриптов:

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
});
```

Доставка добавляется в ваш аккаунт parcel.app и сразу же отображается в ioBroker после автоматического запроса.

**Примечания:**

- **Ограничение на количество доставок POST: 20 в день** — неудачные попытки (например, неверный `carrier_code`) также учитываются в этом лимите.
- Отслеживание новых отправлений обычно прекращается на **45–90 минут** после добавления в базу данных. Это задержка на стороне parcel.app, а не проблема адаптера.
— **Удаление пакетов возможно только в веб-интерфейсе приложения parcel.app** — API не имеет конечной точки для удаления. При включенной опции `autoRemoveDelivered` адаптер по-прежнему автоматически удаляет доставленные пакеты из состояний ioBroker.

---

## Поиск неисправностей
### Проверка соединения не удалась
— Подтвердите свой API-ключ на сайте [web.parcelapp.net](https://web.parcelapp.net)
— Убедитесь, что у вас есть активная премиум-подписка.
— Проверьте, есть ли у вашего экземпляра ioBroker доступ к интернету.

### Доставка не указана
— API возвращает кэшированные данные — отображение новых заказов может занять несколько минут.
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
### 0.4.4 (2026-05-13)
- Adapter shuts down cleanly even if the "Test Connection" button was still running — the test request is now aborted at unload along with regular polling.

### 0.4.3 (2026-05-13)
- Debug log now traces previously silent paths: HTTPS request lifecycle, carrier-list fetch outcome, per-delivery updates, admin-message handling and lifecycle anchors. Default log unchanged.

### 0.4.2 (2026-05-10)

- Adapter shuts down cleanly even if parcel.app is slow — pending requests are aborted instead of hanging until kill.
- "Forbidden" responses (e.g. when the Premium subscription is no longer active) now log a clear hint pointing to your parcel.app account, instead of looping reauth as if the API key were just wrong.
- Two parcels whose tracking numbers differ only in special characters no longer overwrite each other in the state tree — the second one gets a hash suffix.
- Defensive: bogus poll-interval values can no longer turn into a tight loop hammering the API; rate-limit cooldowns can no longer get stuck near zero.

### 0.4.1 (2026-05-09)

- Adapter log messages are now English only, in line with the ioBroker community standard. Localized state names (11 languages) are unchanged.

### 0.4.0 (2026-05-06)

- State names now follow your ioBroker system language (11 languages).
- Minimum requirements: Node.js 22 and ioBroker Admin 7.8.23.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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

*Developed with assistance from Claude.ai*