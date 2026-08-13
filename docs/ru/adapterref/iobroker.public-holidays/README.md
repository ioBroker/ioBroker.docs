---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.public-holidays/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.public-holidays@main/admin/public-holidays.svg" width="48" align="top" /> ioBroker.public-holidays
hash: rCtPqJCmRXvi87lkuWpn0a8M3l16vLe25sy1raAErWY=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.public-holidays@main/admin/public-holidays.svg" width="48" align="top" /> ioBroker.public-holidays

![npm версия](https://img.shields.io/npm/v/iobroker.public-holidays)
![стабильный](https://iobroker.live/badges/public-holidays-stable.svg)
![Установки](https://iobroker.live/badges/public-holidays-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.public-holidays)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Обнаруживает государственные праздники в 206 странах. Работает полностью в автономном режиме — без облачных сервисов и вызовов API. Обновляется ежедневно в полночь.

Данные о праздниках предоставлены [даты-праздники](https://github.com/commenthol/date-holidays) (ISC + CC-BY-SA-3.0).

---

## Функции
- **206 стран** при поддержке штатов/провинций и регионов.
- **Полностью офлайн** — весь праздничный трафик включен в пакет, подключение к интернету не требуется.
- **5 типов праздников** — государственный, банковский, школьный, необязательный, памятный (настраиваемый)
- **Обнаружение рабочих дней между праздниками** — определяет рабочие дни между праздниками и выходными.
- **Исключить отдельные праздники** — выберите праздники для исключения из выпадающего списка.
- **Локализованные названия праздников** — используется язык системы с резервным английским языком.
- **Режим планирования** — вычисления выполняются один раз при запуске и ежедневно в полночь, между запусками не используется память.

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Требования
- ioBroker js-controller >= 7.2.2
- Администратор >= 7.8.23
- Node.js >= 22

## Конфигурация
Все настройки находятся на одной карточке с пошаговыми инструкциями. Пройдите весь процесс сверху вниз:

| Шаг | Описание |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Местоположение | Страна (доступно 206); штат/провинция и регион отображаются только для стран, в которых они есть. Если поле «Страна» оставлено пустым, она автоматически определяется из настроек вашей системы ioBroker. |
| Типы праздников | Государственные (по умолчанию включены), банковские, школьные, необязательные и памятные дни. |
| Переходные дни | Добавляет переходные дни между праздником и выходными. |
| Исключенные праздники | Выберите отдельные праздники, которые следует исключить из проверки. |
| Обнаруженные праздники | Предварительный просмотр праздников, которые адаптер обнаружит для текущего выбора. |

> Карточка настроек является компонентом Admin-8, поэтому для работы этого адаптера требуется Admin 8.

## Государственное дерево
```
public-holidays.0.
├── today.
│   ├── name         string    "Karfreitag" / "Good Friday"
│   └── isHoliday    boolean   true / false
├── yesterday.
│   ├── name         string
│   └── isHoliday    boolean
├── tomorrow.
│   ├── name         string
│   └── isHoliday    boolean
├── dayAfterTomorrow.
│   ├── name         string
│   └── isHoliday    boolean
└── next.
    ├── name         string    next holiday name (localized)
    ├── isHoliday    boolean   true when an upcoming holiday exists
    ├── date         string    "2026-12-25" (ISO date)
    └── daysUntil    number    days until holiday
```

Если праздник не отмечается (например, сегодня не выходной), состояние канала отображается в виде пустой строки / false / 0.

## Алгоритм дня бриджа
Переходный день — это рабочий день (с понедельника по пятницу) между праздником и выходными:

- Выходной в **четверг** → Пятница - переходный день
- Выходной день во вторник → Понедельник - переходный день
- Выходной в **среду** → нет игры в бридж (пропущено два дня)

Дни перехода отображаются в дереве состояний с локализованным названием, соответствующим языку системы.

## Поиск неисправностей
**После первого запуска страны не отображаются** — Откройте настройки адаптера и выберите страну.

**Неверные праздники / отсутствуют региональные праздники** — Убедитесь, что выбран правильный штат/провинция. Установите уровень логирования на «отладка», чтобы увидеть все обнаруженные праздники.

**Праздник не обнаружен** — Некоторые праздники классифицируются как `observance`, а не `public`. При необходимости включите этот тип празднования в настройках праздника.

## Благодарности
Идея восходит к адаптеру `feiertage` от pix, который изначально предоставил данные о праздниках для ioBroker. Спасибо [Джей Си](https://github.com/Jey-Cee) за предоставленное имя пакета `public-holidays`. Этот адаптер является независимой реализацией и не использует общий код ни с одним из них.

## Поддерживать
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.public-holidays/issues) — сообщения об ошибках, запросы на добавление новых функций
- [Форум ioBroker](https://forum.iobroker.net/) — общие вопросы

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.13.0 (2026-08-13)

- The adapter settings are now a single guided card — country, region, holiday types and exclusions on one page, with a live preview of the holidays that will be detected.

### 0.12.0 (2026-08-10)

- The holiday exclusion selector in the settings now works on Admin 8 — it was blank there since Admin 8.0.1, so this version requires Admin 8.

### 0.11.0 (2026-07-12)

- Breaking change: the states that flag whether each day is a holiday were renamed for clarity — update any scripts or views that read them.
- Refreshed the built-in holiday data, adding newly recognised regional holidays.

### 0.10.0 (2026-07-02)

- The "next holiday" date and days-until states now show up correctly as a date and a day count in VIS widgets and scripts (they carry the proper ioBroker role and a "days" unit).
- The exclude-holidays list in the settings now also offers holidays that only occur in the coming year, not just the current one.

### 0.9.0 (2026-06-28)

- The holiday exclude list now shows only your selected region's holidays, in your admin language and sorted by date — no longer every region of a country mixed alphabetically.
- The false "excluded holidays no longer match" warning at startup is fixed; it now fires only for a holiday that genuinely no longer exists.

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