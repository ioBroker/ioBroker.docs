---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.f1/README.md
title: ioBroker.f1
hash: /pTewFoFkbMdbk4wPfZAkag8T4Jx0mXXXVRWdrN30Zw=
---
# IoBroker.f1

![Версия NPM](https://img.shields.io/npm/v/iobroker.f1.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.f1.svg)
![Лицензия](https://img.shields.io/github/license/bloop16/ioBroker.f1.svg)

Интеграция данных Формулы-1 в режиме реального времени для ioBroker — предоставляет календарь гонок, турнирную таблицу чемпионата, результаты сессий и данные о сессиях в режиме реального времени через [[Официальная трансляция результатов Формулы-1 в режиме реального времени](https://www.formula1.com/) и [Jolpica API]](https://api.jolpi.ca/).

## Функции
- **Календарь соревнований** — Информация о следующем заезде и сессии с обратным отсчетом (дни/часы)
- **Полный календарь сезона** — Все раунды текущего сезона в формате JSON
- **Турнирная таблица чемпионата** — Турнирная таблица пилотов и конструкторов с указанием очков и побед.
- **Результаты сессий** — Результаты гонки, квалификации, спринта и тренировочных заездов
- **Данные сессии в реальном времени** — Данные в реальном времени через WebSocket от F1 Live Timing SignalR
- Состояние трассы (Все чисто / Желтый / Автомобиль безопасности / Виртуальная безопасность / Красный флаг)
- Статус и название сессии
- Текущее и общее количество кругов
- Оставшееся время / прошедшее время
- Отслеживание погодных условий (температура воздуха, температура трассы, дождь, ветер, влажность)
- Позиции пилотов с указанием промежутков между ними, время круга и информация о шинах.
- Топ-3 в интерактивной таблице лидеров
- Сообщения системы управления гонкой
- Пит-стопы
- Состав резиновой смеси на одного водителя
— Командная радиосвязь

## Точки данных
Полную иерархию объектов и интервалы обновления см. в разделе **Использование** ниже.

## Источники данных
| Канал | Источник | Обновление |
|---|---|---|
| `schedule/` | API Jolpica | Почасовая оплата |
| `results/` | API Jolpica | Ежечасно + после сессии |
| `live/` | F1 Live Timing SignalR WebSocket | Передача данных в реальном времени |
| `live/` | F1 Live Timing SignalR WebSocket | Передача данных в реальном времени |

## Требования
- ioBroker >= 5.0.19
- Node.js >= 22
- Подключение к интернету
- Стабильное соединение с [Jolpica API](https://api.jolpi.ca/)

## Установка и настройка
1. Установите адаптер через панель администратора ioBroker или командную строку.
2. Откройте настройки адаптера (по умолчанию настройка пользователем не требуется).
3. Адаптер автоматически:
- Ежечасно получает текущий календарь сезона Формулы-1.
- Обновляет турнирную таблицу чемпионата после каждой сессии.
- Предоставляет данные о сессиях в режиме реального времени, когда сессии активны.
4. Дополнительно: при необходимости отрегулируйте интервалы обновления в настройках адаптера.

### Источники данных и согласованность
Адаптер использует несколько источников данных с автоматическим резервным вариантом:

| Канал | Основной | Резервный | Поведение |
|---------|---------|----------|----------|
| Расписание и турнирная таблица | [Jolpica API](https://api.jolpi.ca/) | Обновляется ежечасно и после гонок |
| Данные в реальном времени | [F1 Live Timing SignalR](https://www.formula1.com/) | API OpenF1 | Отправка данных в реальном времени во время сессий |
| Данные в реальном времени | [F1 Live Timing SignalR](https://www.formula1.com/) | API OpenF1 | Отправка данных в реальном времени во время сессий |

**Примечание:** Во время гоночных уикендов API-интерфейсы могут временно предоставлять данные по разным раундам (например, турнирная таблица обновляется до объявления результатов). Адаптер включает логику повторных попыток (6 попыток с интервалом в 10 минут) для обеспечения согласованности данных.

## Использование
После установки и запуска адаптер предоставляет доступ к состояниям ioBroker по пути к объекту `f1.0`:

```
f1.0
├── info.connection           (adapter connection status)
├── schedule/
│   ├── next_race_name / round / circuit / country / date
│   ├── next_session_name / type / date / countdown_*
│   ├── weekend_json          (all sessions of current weekend)
│   └── calendar              (full season as JSON)
├── standings/
│   ├── drivers               (JSON array with positions & points)
│   ├── teams                 (JSON array with constructor standings)
│   └── last_update
├── results/
│   ├── race / qualifying / sprint   (JSON arrays)
│   └── last_update
└── live/                     (only during session ±30 min)
    ├── is_live / session_status / track_status
    ├── laps_current / laps_total / time_remaining / time_elapsed
    ├── weather / race_control / top_three
    ├── drivers / tyres / pit_stops / team_radio
    └── last_update
```

Информация по штатам обновлена:

- **Почасовая оплата** за расписание, турнирную таблицу и результаты.
- **Данные о результатах каждой сессии** (гонка, квалификация, спринт)
- **В режиме реального времени** для отображения данных о сессиях (во время активных сессий)

## Поиск неисправностей
### "Разница в очках" в заключительный период гонки
В течение первых 60 минут после окончания гонки турнирная таблица и результаты могут на короткое время отображать разные круглые числа. Это ожидаемое поведение — API-интерфейс обновляется асинхронно. Адаптер автоматически проверяет согласованность данных (6 попыток, с интервалом в 10 минут).

### Данные в реальном времени не отображаются
1. Убедитесь, что сессия активна (трансляция F1 Live Timing обычно ведется во время тренировок, квалификации и гонки).
2. Проверьте подключение к интернету.
3. Проверьте журналы адаптера (администрирование ioBroker → Экземпляры → F1 → Журналы)

### Устаревшие данные
Данные кэшируются и обновляются по расписанию. Если данные кажутся устаревшими:

1. Ручной запуск: перезапуск экземпляра адаптера.
2. Автоматический режим: в следующем цикле обновления, выполняемом раз в час, будут получены актуальные данные.
3. После завершения сессии: автоматическое обновление запускается в течение 2 минут после окончания сессии.

## Источники данных и атрибуция
Данный адаптер использует следующие источники данных:

- **[Jolpica API](https://api.jolpi.ca/)** — Зеркало API Ergast, основной источник календаря гонок Формулы-1, турнирной таблицы и результатов.
- **[Ergast API](https://ergast.com/mwapi/)** — Исторические данные Формулы-1, используемые в качестве резервного варианта, когда данные по Йольпике недоступны.
- **[Темпы Формулы-1 в режиме реального времени](https://www.formula1.com/)** — Официальные данные о сессиях в режиме реального времени через SignalR WebSocket
- **[API OpenF1](https://openf1.org/)** — Резервный вариант для обнаружения сеансов в реальном времени

## Отказ от ответственности
Данный проект **не связан** с Формулой-1, FIA или какими-либо их дочерними компаниями или филиалами, не поддерживается ими и никоим образом официально с ними не связан.

**F1®**, **FORMULA ONE®**, **FORMULA 1®**, **FIA FORMULA ONE WORLD CHAMPIONSHIP®**, **GRAND PRIX®** и связанные с ними знаки являются товарными знаками Formula One Licensing B.V.

Данный адаптер предназначен исключительно для личного, некоммерческого использования.

## Changelog


### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.11 (2026-06-10)

- (bloop) Live data quality: fixed truncated outputs for `live.race_control` and `live.team_radio`
- (bloop) Live ranking quality: corrected top-three ordering by position
- (bloop) Live cache consistency: improved tyre and driver merge logic for partial incremental updates
- (bloop) Session-end flow: unified handling path to avoid inconsistent post-session states

### 0.1.10 (2026-06-05)

- (bloop) Fixed live sessions by migrating from legacy SignalR to SignalR Core transport
- (bloop) Reduced repeated 401 reconnect warnings from F1 Live Timing legacy endpoint
- (bloop) Improved live connection stability with handshake-aware subscription flow

For older changelog entries, see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Martin (bloop) <bloop16@hotmail.com>

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