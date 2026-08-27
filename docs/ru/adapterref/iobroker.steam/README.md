---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.steam/README.md
title: ioBroker.steam
hash: gMuV3gFX6s2hFU7VmyVC07P0mBzCQ8OQMtfaikPKWf8=
---
![Логотип](../../../en/adapterref/iobroker.steam/admin/steam.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.steam.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.steam.svg)
![Количество установок](https://iobroker.live/badges/steam-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/steam-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.steam.png?downloads=true)

# IoBroker.steam
## IoBroker.steam
Этот адаптер интегрирует информацию о профиле Steam и игровой активности в ioBroker.

## Требования
- Node.js >= 22
- ioBroker.js-controller >= 6.0.11
- ioBroker.admin >= 7.6.20

## Функции
* **Информация о профиле Steam:**
* **Имя игрока:** Отображает текущее имя игрока в Steam.
* **URL профиля:** Указывает URL профиля Steam.
* **URL-адрес аватара:** Отображает URL-адрес аватара игрока.
* **Состояние игрока:** Отображает текущее состояние игрока (например, онлайн, в игре, вне игры).
* **Дополнительная информация об игре:** Отображает информацию о текущей игре (если доступна).
* **Steam ID64:** Уникальный 64-битный идентификатор пользователя Steam.

* **Мониторинг игры:**
* **Игры для мониторинга:** Настройте список игр для мониторинга.
* **Идентификатор приложения игры:** Сохраняет идентификатор приложения Steam для каждой отслеживаемой игры.
* **Игровые новости:** Получает и обновляет последние новости по каждой отслеживаемой игре каждые 6 часов (4 раза в день).
* **Предложения по названиям игр:** Если игра не найдена (например, из-за опечатки), адаптер выдает предупреждение и предлагает до 5 похожих названий игр из списка приложений Steam.
* **Автозаполнение:** При добавлении игр адаптер автоматически заполняет недостающую информацию — если вы указываете название игры, он находит AppID, и наоборот.
* **Импорт собственных игр:** Импортирует все ваши игры из библиотеки Steam одним щелчком мыши.
* **Расширенная информация об игре:** Отображает значки игры, логотипы, URL-адреса статистики сообщества, статистику игрового времени и многое другое.
* **Автоматическое определение игр:** Автоматически определяет и создает состояния для игр по мере их прохождения.

* **Управление запросами API:**
* **GetPlayerSummaries:** Запрашивает сводные данные об игроках с настраиваемым интервалом (минимум 15 секунд, по умолчанию 60 секунд).
* **Ежедневное количество запросов:** Отслеживает количество запросов к API GetPlayerSummaries, чтобы избежать превышения лимита в 10 000 запросов в день.
* **Автоматический сброс:** Автоматически сбрасывает счетчик ежедневных запросов в 0:00 (полночь).
* **Оптимизированное использование API:** Предотвращает дублирование вызовов API и добавляет соответствующие задержки между запросами.
* **Кэширование списка приложений Steam:** Эффективно кэширует список приложений Steam для сокращения количества вызовов API.

## Конфигурация
1. **Имя в Steam / SteamID64**

Введите своё имя пользователя в Steam или 17-значный SteamID64 из вашего общедоступного профиля.

2. **Ключ API Steam**

Войдите в Steam через браузер, откройте [Страница с ключами API Steam](https://steamcommunity.com/dev/apikey), создайте ключ и скопируйте его в конфигурацию адаптера.
Ваш профиль сообщества Steam должен быть установлен как «Общедоступный».

3. **Интервал сводки по игрокам**

Установите интервал опроса для сводок по игрокам (минимум 15 секунд).

4. **Включить подсказки к играм**

Включает в себя подсказки названий игр, учитывающие опечатки, в логах.

5. **Включить собственные игры**

Импортирует приобретенные игры в конфигурацию (требуется перезапуск адаптера).

6. **Игры, за которыми следует следить**

Добавьте название игры или идентификатор приложения. Недостающая информация будет автоматически заполнена адаптером.

## Использование
После установки и настройки адаптера информация о профиле Steam, новости игр, недавно сыгранные игры и статистика запросов API будут доступны в ioBroker в виде состояний.

Адаптер создает несколько папок состояния:

- **steam.0** - Содержит общую информацию о профиле и статусе подключения.
- **steam.0.games** - Содержит список отслеживаемых игр с их AppID, новостями и статистикой.

Во время игры её состояние `isPlaying` будет установлено в значение true, и все данные для этой игры будут автоматически обновляться.

## Changelog

### WORK IN PROGRESS

### 0.5.11 (2026-07-02)
- (bloop16) Fixed repo-checker issues E5600/S5601 by fully migrating admin i18n to short format.
- (bloop16) Fixed W5606 by completing missing translations and correcting placeholder formatting.
- (bloop16) bumped key dependencies (axios, adapter-core).
- (bloop16) #113 follow-up fixes: release-script minimum update, Node 22 tsconfig alignment, and ESLint/dependency cleanup.

### 0.5.10 (2026-05-29)
- (bloop16) Improved Steam onboarding and setup guidance
- (bloop16) Fixed editor and test typing diagnostics for JavaScript adapter workflow
- (bloop16) Updated README to ioBroker release format and moved legacy entries to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

### 0.5.9 (2026-03-22)
- (bloop16) Added concurrency configuration to CI workflow
- (bloop16) Removed obsolete dependabot workflow file

Older changelog entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2025-2026 bloop16 <bloop16@hotmail.com>

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