---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.beszel/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.beszel@main/admin/beszel.svg" width="48" align="top" /> ioBroker.beszel
hash: 0viDphe7RrsOLxgCrqiuf8RfUmY0gXXvkg3PiRS9vZQ=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.beszel@main/admin/beszel.svg" width="48" align="top" /> ioBroker.beszel

![npm версия](https://img.shields.io/npm/v/iobroker.beszel)
![стабильный](https://iobroker.live/badges/beszel-stable.svg)
![Установки](https://iobroker.live/badges/beszel-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.beszel)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Подключается к хабу [Безель](https://github.com/henrygd/beszel) и предоставляет метрики мониторинга сервера для всех зарегистрированных систем, как указано в ioBroker.

---

## Функции
- Получает метрики со всех систем, зарегистрированных в вашем Beszel Hub.
- Состояние каждой системы: ЦП, память, диск, сеть, температура, средняя загрузка.
- Дополнительная информация: загрузка ЦП на ядро, пиковые значения, загрузка дискового ввода-вывода, трафик по интерфейсам, сведения о графическом процессоре, информация об оборудовании/ОС, контейнеры Docker/Podman, батарея, дополнительные файловые системы, распределение нагрузки по ЦП, службы systemd.
— Для каждой опции есть пояснительный текст, объясняющий создаваемые ею состояния; подробные опции остаются неактивными (серыми), пока не будет активирована их категория.
- Настраиваемый интервал опроса (10–300 секунд)
- Автоматическая повторная аутентификация при истечении срока действия токена (в том числе в процессе опроса).
- Кнопка проверки соединения в административном интерфейсе
- Автоматическая очистка состояний для удаленных систем, устаревших контейнеров и отключенных метрик.

---

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Требования
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **Администратор ioBroker >= 7.8.23**
- Работающий [Beszel Hub](https://github.com/henrygd/beszel) как минимум с одной зарегистрированной системой.

---

## Конфигурация
### Связь
| Параметр | Описание | По умолчанию |
| ----------------------- | --------------------------------------------------------------------------------------- | ------- |
| **URL-адрес хаба Beszel** | Полный URL-адрес вашего Beszel Hub (например, `http://192.168.1.100:8090`) | — |
| **Имя пользователя** | Электронная почта/имя пользователя для входа в Beszel Hub | — |
| **Интервал опроса (с)** | Как часто получать данные из хаба (10–300) | `60` |
| **Тайм-аут запроса (с)** | Тайм-аут HTTP для каждого запроса. Вызывается для медленных хабов или больших контейнеров/статистических данных (5–120) | `15` |
| **Тайм-аут запроса (с)** | Тайм-аут HTTP для каждого запроса. Вызывается для медленных хабов или больших контейнеров/статистических данных (5–120) | `15` |

Используйте кнопку **Проверить соединение**, чтобы подтвердить свои учетные данные перед сохранением.

### Метрики
Все метрики являются глобальными переключателями, которые применяются ко **всем** системам. Отключенные метрики автоматически удаляются из дерева состояний при следующем запуске адаптера.

Параметры детализации остаются неактивными (серыми) до тех пор, пока не будет включен основной показатель соответствующей категории, и каждый параметр сопровождается справочным текстом, точно описывающим, какие состояния он создает.

| Группа | Метрика | По умолчанию |
| --------------- | ----------------------------------------------------- | ------- |
| **Система** | Время работы | включено |
| | Информация о системе (оборудование, ОС, версия агента) | выключено |
| | Службы Systemd (всего / неисправных) | выключены |
| **ЦП** | Использование ЦП (%) | включено |
| | Средняя нагрузка (1 м / 5 м / 15 м) | включена |
| | Сбой ЦП (Пользовательский / Системный / IOWait / Steal / Idle) | выключено |
| | Использование каждого ядра | выключено |
| | Пиковые значения | выключено |
| **Память** | Использование памяти (% и ГБ) | включено |
| | Сведения о памяти (буферы, ZFS ARC) | выключено |
| | Сменить | выключить |
| | Пиковые значения | выключено |
| **Диск** | Использование диска (% и ГБ) | включено |
| | Скорость чтения/записи | включена |
| | Загрузка ввода/вывода (использование, время ожидания чтения/записи) | выключено |
| | Дополнительные файловые системы | выключены |
| | Пиковые значения | выключено |
| **Сеть** | Сетевой трафик (скорость загрузки/выгрузки МБ/с) | включен |
| | Для каждого интерфейса | выключено |
| | Пиковые значения | выключено |
| **Температура** | Температура (среднее значение самых горячих датчиков + значение самого горячего датчика) | включено |
| | Индивидуальные датчики температуры | выключены |
| **GPU** | Показатели GPU (использование, память, энергопотребление) | выключено |
| | Подробная информация о графическом процессоре (движки, энергопотребление пакета) | выключено |
| **Контейнеры** | Мониторинг контейнеров, включая сетевой мониторинг (Docker / Podman) | выключено |
| **Батарея** | Состояние батареи | выключено |

---

## Государственное дерево
Состояния организованы в каналы по группам метрик. Дополнительные каналы (отмеченные *) создаются только при включении соответствующей метрики.

```
beszel.0.
├── info.connection                   — Connection status (bool)
└── systems.
    └── {system_name}/                — Device (sanitized name)
        ├── info/                     — System info
        │   ├── online               — Is system up? (bool, used as device indicator)
        │   ├── status               — Status string (up/down/paused/pending)
        │   ├── uptime               — Uptime in seconds
        │   ├── uptime_text          — Human-readable uptime (e.g. "14d 6h")
        │   ├── agent_version *      — Beszel agent version
        │   ├── hostname *           — Host name (System info)
        │   ├── os *                 — Operating system (Linux/macOS/Windows/FreeBSD)
        │   ├── os_name *            — OS version (e.g. "Ubuntu 22.04")
        │   ├── kernel *             — Kernel version
        │   ├── cpu_model *          — CPU model
        │   ├── arch *               — CPU architecture
        │   ├── cores *              — Physical CPU cores
        │   ├── threads *            — Logical CPU threads
        │   ├── podman *             — Container engine is Podman (bool)
        │   ├── services_total *     — Systemd services total
        │   └── services_failed *    — Systemd services failed
        ├── cpu/                      — CPU metrics
        │   ├── usage                — CPU usage (%)
        │   ├── load_1m              — Load average 1 min
        │   ├── load_5m              — Load average 5 min
        │   ├── load_15m             — Load average 15 min
        │   ├── user *               — CPU user (%)
        │   ├── system *             — CPU system (%)
        │   ├── iowait *             — CPU I/O wait (%)
        │   ├── steal *              — CPU steal (%)
        │   ├── idle *               — CPU idle (%)
        │   ├── peak *               — Peak CPU usage in interval (%)
        │   └── cores/ *             — Per-core usage (core0, core1, …) (%)
        ├── memory/                   — Memory metrics
        │   ├── percent              — RAM usage (%)
        │   ├── used                 — RAM used (GB)
        │   ├── total                — RAM total (GB)
        │   ├── buffers *            — Buffers + cache (GB)
        │   ├── zfs_arc *            — ZFS ARC (GB)
        │   ├── swap_used *          — Swap used (GB)
        │   ├── swap_total *         — Swap total (GB)
        │   └── peak *               — Peak RAM used in interval (GB)
        ├── disk/                     — Disk metrics
        │   ├── percent              — Disk usage (%)
        │   ├── used                 — Disk used (GB)
        │   ├── total                — Disk total (GB)
        │   ├── read                 — Disk read (MB/s)
        │   ├── write                — Disk write (MB/s)
        │   ├── read_peak *          — Peak read in interval (MB/s)
        │   ├── write_peak *         — Peak write in interval (MB/s)
        │   ├── io_util *            — I/O utilization (%)
        │   ├── io_await_read *      — Read wait time (ms)
        │   └── io_await_write *     — Write wait time (ms)
        ├── network/                  — Network metrics
        │   ├── sent                 — Upload (MB/s)
        │   ├── recv                 — Download (MB/s)
        │   ├── sent_peak *          — Peak upload in interval (MB/s)
        │   ├── recv_peak *          — Peak download in interval (MB/s)
        │   └── interfaces/ *        — Per interface: up, down (MB/s) + total_up, total_down (cumulative GB)
        ├── temperature/              — Temperature metrics
        │   ├── average              — Avg of top 3 sensors (°C)
        │   ├── max                  — Hottest single sensor (°C)
        │   └── sensors/ *           — Individual sensor readings
        ├── battery/ *                — Battery metrics
        │   ├── percent              — Battery level (%)
        │   └── charging             — Is charging? (bool)
        ├── gpu/ *                    — GPU metrics (per GPU)
        │   └── {gpu_name}/
        │       ├── usage            — GPU usage (%)
        │       ├── memory_used      — VRAM used (MB)
        │       ├── memory_total     — VRAM total (MB)
        │       ├── power            — Power draw (W)
        │       ├── power_package *  — Package power (W) (GPU details)
        │       └── engines/ *       — Per-engine usage (render, video, …) (%)
        ├── filesystems/ *            — Extra filesystems (per mount)
        │   └── {fs_name}/
        │       ├── disk_percent     — Usage (%)
        │       ├── disk_used        — Used (GB)
        │       ├── disk_total       — Total (GB)
        │       ├── read_speed       — Read (MB/s)
        │       └── write_speed      — Write (MB/s)
        └── containers/ *             — Docker/Podman containers
            └── {container_name}/
                ├── status           — Container status
                ├── health           — Health (none/starting/healthy/unhealthy)
                ├── cpu              — CPU usage (%)
                ├── memory           — Memory (MB)
                ├── image            — Image name
                └── network          — Combined network throughput (bytes/s)
```

> **Критически важное изменение в версии 0.3.0:** Состояния перемещены из плоских путей (например, `cpu_usage`) в каналы (например, `cpu.usage`). Устаревшие состояния автоматически очищаются при первом запуске.

---

## Поиск неисправностей
### Соединение не удалось
— Убедитесь, что URL-адрес хаба доступен с хоста ioBroker.
— Проверьте имя пользователя и пароль (воспользуйтесь кнопкой «Проверить соединение»).
— Убедитесь, что ни один брандмауэр не блокирует доступ к порту Beszel Hub.

### Штаты не обновляются
— Проверьте журнал ioBroker на наличие ошибок от адаптера `beszel`.
— Убедитесь, что интервал опроса не слишком короткий (минимум 10 секунд).
— Проверьте состояние `info.connection` — если `false`, аутентификация не удалась.

### Отсутствующие состояния системы
— Система может быть недоступна или приостановлена в Beszel — статистические данные пока отсутствуют.
— Убедитесь, что метрика включена в конфигурации адаптера.

---

## Поддерживать
- [Форум ioBroker](https://forum.iobroker.net/)
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.beszel/issues)

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog
### 0.9.0 (2026-07-07)

- The "Test connection" button now correctly reports a failure when the URL, username or password is wrong — it previously showed a green "Ok" even for bad credentials.
- States for a sensor, GPU, filesystem or network interface that disappears from a system are now removed instead of freezing at their last value forever.
- Battery, GPU-power and status states now carry proper roles so VIS widgets and the type detector recognize them correctly; existing states are upgraded on the next start.
- New fleet-overview states (systems total, systems online, all-systems-online) for building a multi-server dashboard at a glance.
- Per-interface network speeds are now shown in MB/s (and totals in GB), matching the overall network values instead of raw bytes.
- A user account without permission to read containers no longer freezes all other system states — container data is skipped with a warning instead.
- The connection settings are reordered and gained help texts explaining that the "Username" is your Beszel web login, plus a hint that polling faster than 60s brings no fresher data.

### 0.8.0 (2026-06-24)

- A brief empty response from the Hub no longer deletes your devices or containers — for example right after a restart — so monitored systems and their history stay intact.
- Server hardware and OS details now recover on their own after a short network problem, instead of staying empty until the adapter is restarted.
- Two systems, filesystems, network interfaces or containers whose names shorten to the same id no longer overwrite each other's values.
- A malformed or oversized response from the Hub can no longer exhaust memory and crash the adapter.
- The adapter now warns when the Hub is reached over an unencrypted http connection to another machine, so you can switch to https.

### 0.7.2 (2026-06-12) — stable

- Much lighter polling: the adapter no longer pages through hours of stats history on every poll and only rewrites device objects when something actually changed
- Disappeared sensors, network interfaces, GPUs, filesystems and CPU cores are now cleaned up automatically instead of keeping frozen values forever
- Turning off "GPU details" now removes the package-power and engine states it created

### 0.7.1 (2026-06-09)

- Improved compact-mode behavior: beszel no longer registers global process error handlers that could interfere with other adapters running in the same process.

### 0.7.0 (2026-06-07)

- Added optional Sentry error reporting: crashes are sent to the developer so issues get fixed faster. Active only with ioBroker diagnostics enabled; anonymous.

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