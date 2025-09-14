---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.steam/README.md
title: ioBroker.steam
hash: 3IsZC6sGoAbu/vEEiNS99z+Zq4WrUYMO/0JetlssxRk=
---
![Логотип](../../../en/adapterref/iobroker.steam/admin/steam.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.steam.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.steam.svg)
![Количество установок](https://iobroker.live/badges/steam-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/steam-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.steam.png?downloads=true)

# IoBroker.steam
## IoBroker.steam
Этот адаптер позволяет интегрировать информацию из Steam API в вашу систему ioBroker.

## Функции
* **Информация о профиле Steam:**
* **Имя игрока:** Отображает текущее имя игрока в Steam.
* **URL-адрес профиля:** Предоставляет URL-адрес профиля Steam.
* **URL-адрес аватара:** Отображает URL-адрес аватара игрока.
* **Состояние игрока:** Отображает текущее состояние игрока (например, «В сети», «В игре», «Отошел»).
* **Дополнительная информация об игре:** Отображает информацию о текущей игре (если доступно).
* **Steam ID64:** Уникальный 64-битный Steam ID пользователя.

* **Мониторинг игры:**
* **Игры для мониторинга:** Настройте список игр для мониторинга.
* **Идентификатор игрового приложения:** Сохраняет идентификатор приложения Steam для каждой отслеживаемой игры.
* **Игровые новости:** Получает и обновляет последние новости для каждой отслеживаемой игры каждые 6 часов (4 раза в день).
* **Предложения по названию игры:** Если игра не может быть найдена (например, из-за опечатки), адаптер выводит предупреждение и предлагает до 5 похожих названий игр из списка приложения Steam.
* **Автодополнение:** При добавлении игр адаптер автоматически дополняет недостающую информацию — если вы указываете название игры, он находит AppID, и наоборот.
* **Импорт собственных игр:** Импортирует все ваши собственные игры из библиотеки Steam одним щелчком мыши.
* **Расширенная информация об игре:** отображает значки игр, логотипы, URL-адреса статистики сообщества, статистику игрового времени и многое другое.
* **Автоматическое определение игры:** Автоматически определяет и создает состояния для игр по мере их запуска.

* **Управление запросами API:**
* **GetPlayerSummaries:** Запрашивает сводки по игрокам с настраиваемым интервалом (минимум 15 секунд, по умолчанию 60 секунд).
* **Ежедневное количество запросов:** Отслеживает количество запросов API GetPlayerSummaries, чтобы не превышать лимит в 10 000 запросов в день.
* **Автоматический сброс:** Автоматически сбрасывает ежедневный счетчик запросов в 0:00 (полночь).
* **Оптимизированное использование API:** Предотвращает дублирование вызовов API и добавляет правильные паузы между запросами.
* **Кэширование списка приложений Steam:** Эффективно кэширует список приложений Steam для уменьшения количества вызовов API.

## Конфигурация
1. **Имя пользователя Steam:** Введите свое имя пользователя Steam.
2. **Ключ API Steam:** Введите свой ключ API Steam. Вы можете сгенерировать ключ API [здесь](https://steamcommunity.com/dev/apikey).
3. **Интервал сводки по игроку:** Установите частоту запроса сводки по игроку (минимум 15 секунд).
4. **Включить предложения игр:** Включите или выключите функцию, следует ли предлагать похожие названия игр, если игра не найдена.
5. **Включите собственные игры:** Импортируйте все свои собственные игры из Steam в свою конфигурацию (требуется перезапуск адаптера).
6. **Игры для мониторинга:** Добавьте игры для мониторинга. Вы можете указать название или AppID — адаптер автоматически заполнит недостающую информацию.

## Использование
После установки и настройки адаптера информация профиля Steam, новости игр, недавно запущенные игры и статистика запросов API будут доступны в виде состояний в ioBroker.

Адаптер создает несколько папок состояний:

- **steam.0** - Содержит общую информацию профиля и статус подключения.
- **steam.0.games** - Содержит отслеживаемые игры с их AppID, новостями и статистикой.

Во время игры ее состояние `isPlaying` будет установлено на true, и все данные для этой игры будут автоматически обновлены.

## Changelog

### 0.5.6 (2025-06-28)
* (bloop16)
    * release version

### 0.5.3 (2025-06-14)
* (bloop16)
    * fixed state roles.
    * fixed io-package.json (`info.connention`)
    * removed uneeded `getState`
    * added trigger to `onReady`for `onStateChange`

### 0.5.2 (2025-06-14)
* (bloop16)
    * Fixed `onStateChange`to work correct with `currentGameAppId`

### 0.5.1 (2025-05-04)
* (bloop16)
    * Automatic detection and addition of newly played games to the monitored list (no adapter restart required)
    * Full internationalization (i18n) for all log messages and UI texts
    * Improved game lookup: supports AppID/name, fuzzy search, and suggestions for typos
    * Import all owned Steam games with one click
    * Enhanced management and updating of game states (icons, logos, stats, news)
    * Optimized API request handling (rate limits, backoff, random intervals)
    * Automatic creation and cleanup of objects/states
    * Improved error handling and logging

### 0.4.5 (2025-05-02)
* (bloop16)
    * Corrected state roles to align with ioBroker standards
    * Replaced standard `setTimeout`/`setInterval` with adapter versions (`this.setTimeout`/`this.setInterval`) for better lifecycle management.
    * Ensured the standard `info` device object is created in `io-package.json`.

### 0.4.4 (2025-05-01)
* (bloop16) changed view log message log levels, ready for latest

### 0.4.3 (2025-05-01)
* (bloop16)
    * Update package.json: Upgrade Node.js engine requirement and dependencies

### 0.4.2 (2025-04-21)
* (bloop16)
    * Improved rate limit handling: only shows warnings after 3 consecutive rate limits

### 0.4.1 (2025-04-21)
* (bloop16)
    * Added randomness API request vary +-5sec

### 0.4.0 (2025-04-21)
* (bloop16)
    * Button "Get owned games" in admin UI now reliably triggers fetching 
    * Improved error handling and logging for owned games import
    * Removed unnecessary debug/info logs and startup messages
    * Optimized interval and timer handling for all background tasks
    * Improved translation coverage for all user-facing messages

### 0.3.0 (2025-04-18)
* (bloop16)
    * Added auto-completion for game names and AppIDs
    * Added import of all owned games from Steam library
    * Enhanced game information with icons, logos, and community stats
    * Fixed adapter termination issues
    * Added automatic game detection when player starts playing
    * Optimized API usage with reduced duplicate calls

### 0.2.3 (2025-04-18)
* (bloop16)
    * Fix APIRequest

### 0.2.1 (2025-04-16)
* (bloop16)
    * Fix APIRequest

### 0.2.0 (2025-04-16)
* (bloop16)
    * Added function to suggest up to 5 similar game names if a game cannot be found (typo-tolerant search and warning in log).

### 0.1.2 (2025-04-15)
* (bloop16)
    * Added configurable interval for GetPlayerSummaries (min 15s, default 60s)
    * Added fetching and updating of game news every 6 hours (4x per day)
    * Added fetching of recently played games every 15 minutes
    * Improved API request management and daily request counter reset
    * Cleaned up code and improved error handling

### 0.0.3 (2025-04-13)
* (bloop16)  
    * fixed state directory

### 0.0.2 (2025-04-13)
* (bloop16) First working Version  
    * Steam profile information integration  
    * API request management with daily limits  
    * Automatic reset of request counter  
    * Secure API key storage

## License
MIT License

Copyright (c) 2025 bloop16 <bloop16@hotmail.com>

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