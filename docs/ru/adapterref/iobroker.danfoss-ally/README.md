---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.danfoss-ally/README.md
title: без названия
hash: hVcdlLVwHoiSco0XdVcLcghYreoDPRMJlT6VJXj++xQ=
---
![версия](https://img.shields.io/badge/version-0.2.15-blue)
![НПМ](https://nodei.co/npm/iobroker.danfoss-ally.svg)

Облачный адаптер для **Danfoss Ally™** — с использованием **OAuth2 (учетные данные клиента)**.
Считывает данные о температуре, влажности, положении клапана и состоянии батареи для всех устройств в вашей учетной записи Ally и **позволяет выполнять целевые разовые записи** без принудительного изменения режима или цепочек операций.

---

## Функции
- Прямое подключение к **API Danfoss Ally Cloud**
- Автоматическое обновление токена OAuth2**
- Обнаруживает все зарегистрированные устройства
- Считывает все доступные данные с датчиков и элементов управления (температура, влажность, заряд батареи, положение клапана и т. д.).
- Преобразует исходные значения Danfoss (×0,1) в реальные единицы (**°C**, **%**)
- Полностью автоматический опрос с настраиваемым интервалом.
- Поддерживает отдельные изолированные команды записи из ioBroker в облако.

---

## Основные моменты
- **Одиночная запись** — каждое состояние передается независимо (автоматическое переключение режимов отсутствует)
- **Smooth Sync Logic**
- Антирасовая позиция (5 с): пропустить один опрос сразу после локального внесения предложений.
- Удержание окна (1 мин): защита последних локальных значений от перезаписи.
- Подавление задержек (15 с): игнорировать временно устаревшие данные облака
- Мягкое обновление (~1,5 с): повторная выборка только затронутых состояний после каждой записи.
- **Тихое логирование** — информационный уровень для корректной работы, отладочный уровень для диагностики.
- **Автоматическое масштабирование** — температура/влажность автоматически преобразуются в °C / %

> **Примечание:** Обновления облачных сервисов из приложения Danfoss Ally могут отображаться в ioBroker с небольшой задержкой (1–2 минуты).

---

## Поддерживаемые устройства
- Danfoss Icon2 RT (комнатные термостаты)
- Контроллер Danfoss Icon2
- Danfoss Ally™ Gateway

(Другие устройства Danfoss обнаружены автоматически)

---

## Конфигурация
Перейдите в **Экземпляры → danfoss-ally → Настройки**

| Поле | Описание |
| -------------------- | ------------------------------------------------------------------- |
| **Ключ/секрет API** | Ваши учетные данные для приложения разработчика Danfoss |
| **URL токена** | Конечная точка токена OAuth2 (например, `https://api.danfoss.com/oauth2/token`) |
| **Область действия** | Дополнительная область действия OAuth2 (например, `read write`) |
| **Интервал опроса** | По умолчанию `300s` |
| **Интервал опроса** | По умолчанию `300 с` |

Более короткие интервалы обновления происходят быстрее, но создают больший трафик к API. Оптимальный баланс — 30–60 секунд.

```bash
API Key:      your-client-id
API Secret:   your-client-secret
Token URL:    https://api.danfoss.com/oauth2/token
API Base URL: https://api.danfoss.com/ally
Polling:      300
```

---

## Штаты
Каждое обнаруженное устройство создает дерево устройств: `danfoss-ally.0.<device_id>.*`

## Состояние статуса против состояния контроля
Адаптер разделяет **значения состояния, доступные только для чтения**, от **значений управления, доступных для записи**.

### Канал статуса
`danfoss-ally.0.<deviceId>.status.*`

Эти состояния отражают значения, полученные из API Danfoss Cloud.

Характеристики:

- читать: правда
- write: false

Не следует записывать данные в эти состояния из скриптов.

Примеры:

- `status.temp_current`
- `status.temp_set`
- `status.mode`
- `status.humidity_value`
- `status.battery_percentage`

### Канал управления
`danfoss-ally.0.<deviceId>.control.*`

Эти состояния предназначены для **взаимодействия с пользователем** и могут быть созданы с помощью скриптов или Blockly.

Характеристики:

- читать: правда
- write: true

Примеры:

- `control.temp_set`
- `control.manual_mode_fast`
- `control.mode`
- `control.child_lock`

Адаптер автоматически отправляет команды в облако Danfoss и обновляет соответствующие значения состояния.

### Примеры чтения
| Штат | Описание | Единица измерения |
| -------------------------------------- | --------------------------------------------- | ---- |
| `status.temp_current` | Текущая температура | °C |
| `status.battery_percentage` | Уровень заряда батареи | % |
| `status.mode` | Текущий режим (`auto`, `manual`, `at_home`, …) | – |
| `status.work_state`, `status.output_status`, `status.fault` | Статус или ошибка | – |
| `status.upper_temp` / `status.lower_temp` | Температурные пределы | °C |
| `status.upper_temp` / `status.lower_temp` | Температурные пределы | °C |

Все числовые значения масштабируются автоматически в диапазоне от ×0,1 до °C/% .

---

## Написание команд (отдельные команды)
Адаптер поддерживает **точные одиночные записи** в каждое управляемое состояние без цепочек или автоматических переключений режимов.
Это дает вам полный контроль в Blockly, JavaScript или пользовательских логических скриптах.

| Доступное для записи состояние | Ожидаемое значение / поведение |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `control.temp_set` | Целевая температура (°C, шаг 0,5; отправлено ×10) |
| `control.at_home_setting`, `control.leaving_home_setting`, `control.pause_setting`, `control.holiday_setting` | Заданные температуры |
| `control.mode` | `manual`, `at_home`, `leaving_home`, `pause`, `holiday`, `auto` |
| `control.child_lock` | `true` / `false` |
| `control.SetpointChangeSource` | `Externally` или `schedule` |
| `control.SetpointChangeSource` | `Externally` или `schedule` |

> Адаптер **не** переключает режимы автоматически при записи заданных значений — вы сами определяете это в соответствии со своей логикой.

---

## Пример (Blockly / Script)
```js
// Manual mode
setState("danfoss-ally.0.<id>.control.mode", "manual");
setState("danfoss-ally.0.<id>.control.temp_set", 21.5);

// At home
setState("danfoss-ally.0.<id>.control.mode", "at_home");
setState("danfoss-ally.0.<id>.control.at_home_setting", 21.0);

// Leaving home
setState("danfoss-ally.0.<id>.control.mode", "leaving_home");
setState("danfoss-ally.0.<id>.control.leaving_home_setting", 19.0);

// Pause
setState("danfoss-ally.0.<id>.control.mode", "pause");
setState("danfoss-ally.0.<id>.control.pause_setting", 5.0);

// Holiday
setState("danfoss-ally.0.<id>.control.mode", "holiday");
setState("danfoss-ally.0.<id>.control.holiday_setting", 10.0);

// Child lock
setState("danfoss-ally.0.<id>.control.child_lock", true);

// Explicit source (usually not needed)
setState("danfoss-ally.0.<id>.control.SetpointChangeSource", "Externally"); // or 'schedule'
```

> Команды записи должны быть нацелены на состояния `control.*`.

> Состояния `status.*` представляют собой зеркала только для чтения из облака Danfoss.

---

## Логика синхронизации
| Механизм | Продолжительность | Цель |
| ---------------- | -------- | --------------------------------------- |
| **Антирасистский** | 5с | Пропустить один опрос после написания местного текста |
| **Удерживайте** | 1 мин | Предотвратить перезапись локальных данных в облаке |
| **Подавление задержек** | 15 с | Игнорировать устаревшие облачные данные |
| **Мягкое обновление** | ~1,5 с | Повторная загрузка только затронутых состояний |

Эти механизмы обеспечивают плавную синхронизацию между ioBroker и облаком Danfoss без мерцания или зацикливания значений.

---

## Ведение журнала
Адаптер предоставляет подробную информацию на уровне отладки для диагностики, но при нормальной работе остается бесшумным.

- Обновления `ack=true` отображаются только в режиме отладки (debug).
- `HOLD`, `MATCH`, `SUPPRESS` → отладочная, безвредная диагностика
- Ошибки API (`HTTP 400/401`) автоматически повторяются (регистрируются в режиме отладки)
- Подробный информационный отчет после каждого опроса:

**Пример сводки результатов опроса**

```
✅ Updated 13 devices. Changed=2, Skipped=253, Held=1
📡 Found devices, updating states...
⏸️ Skipping poll (anti-race 5000ms)
```

## Пример вывода в лог
```
🔄 Starting Danfoss Ally adapter...
🔑 Refreshing OAuth2 token...
✅ Token acquired. Expires in ~3599 s
📡 Found 13 devices, updating states...
✅ Updated 13 devices from Danfoss Ally Cloud.
⏱ Polling interval set to 300 s
```

## Обработка токенов
- Использует **поток передачи учетных данных клиента OAuth2**
- Автоматический запрос токена при запуске, обновление перед истечением срока действия.
- При ошибке `401 Unauthorized`: обновите страницу и повторите попытку.
- Токены хранятся **в памяти**, никогда не сохраняются.
- Поддерживается необязательная область действия (`scope`) / аудитория (`audience`).
— Все события, связанные с токенами, отображаются в журнале отладки.

---

## Конечные точки API
Адаптер взаимодействует с API Danfoss Ally Cloud (базовый URL-адрес настраивается).

| Метод | Конечная точка | Цель |
| ------ | ------------------------ | --------------------------- |
| `POST` | `/oauth2/token` | Запрос токена доступа |
| `GET` | `/devices/{id}/status` | Чтение телеметрии устройства |
| `GET` | `/devices/{id}` | Резервный вариант для отсутствующего статуса |
| `POST` | `/devices/{id}/commands` | Отправить команду на однократную запись |
| `POST` | `/devices/{id}/commands` | Отправить одну команду записи |

**Заголовки:** `Authorization: Bearer <token>` `Content-Type: application/json` Необязательно: `X-App-Key`, `X-Tenant-Id` и т. д.

**Обработка ошибок:**

- **400:** недопустимый заголовок/значение → записано в лог
- **401:** обновление токена + повторная попытка
- **5xx:** повторная попытка следующего опроса
- Температура записывается с автоматическим масштабированием в 10 раз (например, 21,5 → 215).

---

## Опрос
- По умолчанию: **300 с** (можно настроить)
- Обновления затрагивали только измененные значения.
- Включает в себя всю описанную выше логику предотвращения гонок/удержаний/задержек/мягкого обновления.
— Сводная информация после каждого опроса показывает измененные, пропущенные и сохраненные штаты.

---

## Пишет
- Одна команда на состояние (без цепочки режимов)
- Режим + температура должны быть указаны отдельно.
- Значения ограничены допустимыми пределами и масштабированы в 10 раз.
- `child_lock`: пытается `0/1`, повторяет попытку `true/false` при ошибке 400
- `SetpointChangeSource`: необязательный параметр; по умолчанию используется значение `"Externally"` при активации ручного режима.

Все записи об отправке, повторной попытке и подтверждении отображаются в режиме отладки.

---

## Разработка
```bash
npm i
node main.js
```

или установить с помощью инструментов разработки ioBroker.

---

## Changelog


### 0.2.15
- Fixed invalid `io-package.json` (JSON syntax error)
- No functional changes

### 0.2.14
- Introduced `control` channel for writable states
- `status` channel is now strictly read-only
- Improved write detection and state handling
- Prevented writes to channels or non-state objects
- Improved adapter stability

### 0.2.13
- Updated CI & deploy workflow
- Fixed npm publishing process
- Improved code formatting (Prettier / ESLint)
- No functional changes for end users


---

## License

MIT License

Copyright (c) 2025-2026 Author Stefan8485@me.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.