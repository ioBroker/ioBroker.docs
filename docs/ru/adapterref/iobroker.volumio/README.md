---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: PRYS/rdRmFMThY9AKaKcBnlG6tygjMp3yDwzr+ylM0c=
---
![Логотип](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.volumio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![Количество установок (последние)](http://iobroker.live/badges/volumio-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/volumio-stable.svg)
![Статус зависимости](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![Известные уязвимости](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.volumio.png?downloads=true)
![Тестирование и выпуск](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

# ioBroker.volumio

### Поддержите меня

Если этот адаптер помог вам реализовать интересные сценарии автоматизации в вашем умном доме и сократить время на разработку, можете пригласить меня на чашечку кофе :)

[![Пожертвовать](https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## адаптер Volumio для ioBroker

Адаптер Volumio для ioBroker

Это адаптер для удаленного управления экземпляром Volumio.

### ✨ Версия 0.9.0 - Поддержка двух API

Теперь адаптер поддерживает **два режима связи** с Volumio:

#### 🚀 Режим WebSocket (рекомендуемый - по умолчанию)

- **Обновления в реальном времени** через Socket.IO
- Мгновенные изменения в состоянии дел без проведения опросов общественного мнения.
- Снижение сетевых накладных расходов
- Автоматическое переподключение при потере соединения
- Идеально подходит для быстрой автоматизации дома.

#### 📡 Режим REST API

- Обновление состояния на основе опроса (настраиваемый интервал)
- Совместимо со старыми версиями Volumio.
- Дополнительная поддержка HTTP-push-уведомлений (устарело)
- Резервный вариант для сетей, где WebSocket заблокирован.

### 🎛️ Конфигурация

Выберите предпочтительный режим API в настройках адаптера:

- **Режим API** : выберите «WebSocket» (рекомендуется) или «REST API».
- **Интервал опроса** (режим REST): Как часто проверять изменения состояния (по умолчанию: 2 секунды)
- **Настройки повторного подключения** (режим WebSocket): Настройка поведения повторных попыток при потере соединения.

### 🎵 Реализованные функции

- **Управление воспроизведением**
  - Воспроизведение / Пауза / Стоп
  - Переключение между режимами «Воспроизведение» и «Пауза»
  - Следующая / Предыдущая композиция
  - Воспроизвести n-ю песню из плейлиста
- **Регулятор громкости**
  - Установите определенное значение (0-100)
  - Увеличение/уменьшение громкости
  - Включить/выключить звук
  - Отключить звук
- **Управление очередями**
  - Очистить очередь
- **Параметры воспроизведения**
  - Воспроизведение в случайном порядке (в случайном порядке)
  - Режим повтора
  - Повтор одной дорожки
- **Информация о штате**
  - Состояние игрока в реальном времени (WebSocket) или опрос (REST)
  - Информация о треке (название, исполнитель, альбом, обложка)
  - Системная информация
  - Статус подключения

### 📚 Документация по API

Этот адаптер использует официальные API Volumio:

- **API WebSocket** : <https://developers.volumio.com/api/websocket-api>
- **REST API** : <https://developers.volumio.com/api/rest-api>

### 🔮 Планируемые функции (в будущих версиях)

- [ ] Просмотрите музыкальную библиотеку
- [ ] Управление плейлистами (список, создание, удаление)
- [ ] Функциональность поиска
- [ ] Поддержка многокомнатного аудио

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.11.0 (2026-08-18)
#### 🔧 Improvements
* Timers are now registered via the adapter (`this.setInterval`/`this.setTimeout`) instead of the global functions, so js-controller can track and clean them up automatically (unload, compact mode)
* `@types/node` downgraded to `^22.20.1` to match the adapter's actual Node 22 minimum (avoids incorrect typings for newer Node APIs)
* Migrated `admin/i18n` translation files from the long directory format (`{lang}/translations.json`) to the short format (`{lang}.json`)
* CI: `adapter-tests` now runs after `check-and-lint` instead of in parallel
* Dependabot: npm dependency checks now run on a randomized monthly schedule instead of all on the same day, and the open-PR limit was raised from 5 to 15

### 0.10.0 (2026-08-18)
#### 🐛 Bug Fixes
* **Critical**: fixed a crash (`RangeError: Maximum call stack size exceeded`) that took down the whole adapter whenever the WebSocket connection to Volumio failed or was lost (e.g. Volumio restarting, a network hiccup). Cause: the bundled `engine.io-client` v3 (required by `socket.io-client` v2 for Volumio's Socket.IO v2 server) unconditionally prefers Node's native `WebSocket` global over the `ws` package if present, but predates it and cannot handle its error/close events correctly under modern Node.js (>= 21). Fixed by making socket.io-client's module load lazily while briefly hiding the native global, forcing the working `ws` transport. Verified by killing a live Volumio instance mid-connection: the adapter now reconnects/retries cleanly instead of crashing.
* Fixed WebSocket client sending wrong Volumio command names for playback options (`random`/`repeat`/`repeatSingle` instead of `setRandom`/`setRepeat`/`setRepeatSingle`), which silently made shuffle/repeat toggles a no-op in WebSocket mode. Found via a new live test against a real Volumio instance.
* Removed `process.exit()` from `test-client.js` (incompatible with ioBroker compact mode)
* Corrected `read`/`write` role flags in `io-package.json` for `queue.repeatTrack`, `playbackInfo.random`, `queue.shuffle`
* `playbackInfo.mute`/`player.muted` (role `media.mute`) and `playbackInfo.status` (role `media.state`) were declared writable but had no handler, so writes were silently ignored; both now actually control playback/mute, matching the official ioBroker `media.*` role spec

#### 🔧 Improvements
* Dependencies updated (axios, body-parser, rimraf, @types/node, @typescript-eslint/*, @alcalzone/release-script and plugins, @iobroker/adapter-core)
* Reverted an attempted `socket.io-client` v2→v4 upgrade: Volumio bundles a Socket.IO v2 server, which is fundamentally incompatible with v3/v4 clients (verified against a real Volumio 4 instance); added a dependabot ignore rule to prevent this from recurring
* CI/`engines.node` raised to Node.js 22.x (Node 20 is EOL); test matrix now `[22.x, 24.x]`
* Set up automated Dependabot PR auto-merging (`automerge-dependabot.yml`), replacing the previously broken workflow
* Added `prettier.config.mjs` and reformatted the whole `src/` tree to the shared ioBroker style; removed redundant ESLint devDependencies (already provided via `@iobroker/eslint-config`)
* Added missing English admin UI translation keys (`apiMode`, `pollInterval`, `reconnectAttempts`, `reconnectDelay`, host field)
* Bumped `@iobroker/adapter-core` and the required `admin` version

#### ✅ Testing
* Added `npm run test:live`: an automated integration test (`test/live.volumio.test.ts`) exercising both REST and WebSocket clients against a real, reachable Volumio instance (connect, ping, system info, state shape, a reversible random-playback round-trip, clean disconnect)

### 0.9.0 (2025-12-22)
**Major Release - Milestone before 1.0.0**

#### 🎉 New Features
* **Dual API Support**: Choose between WebSocket (real-time) or REST API (polling) mode
* **WebSocket Mode** (NEW - Default):
  - Real-time state updates via Socket.IO
  - Automatic reconnection with configurable retry settings
  - Lower network overhead and better responsiveness
* **REST API Mode** (Enhanced):
  - Improved polling mechanism with configurable interval
  - Better error handling and connection management
* **Client Abstraction Layer**: Clean architecture for API communication
* **Configurable API Settings**:
  - API mode selection in adapter configuration
  - Poll interval for REST mode (default: 2 seconds)
  - Reconnection attempts and delay for WebSocket mode

#### 🔧 Improvements
* Complete refactoring of API communication layer
* Unified interface for both REST and WebSocket clients
* Better connection state management
* Improved error handling across all operations
* Enhanced logging for debugging

#### 📦 Dependencies
* Added `socket.io-client` v4.8.1 for WebSocket support
* Updated all dependencies to latest secure versions
* Migrated to ESLint 9 with @iobroker/eslint-config
* Updated to NPM Trusted Publishing via OIDC

#### 🏗️ Architecture
* New modular client structure:
  - `IVolumioClient` - Common interface
  - `RestVolumioClient` - REST API implementation
  - `WebSocketVolumioClient` - WebSocket implementation
  - `VolumioClientFactory` - Dynamic client creation

#### ⚠️ Deprecations
* HTTP push notifications marked as deprecated (REST-only feature)
* WebSocket mode provides superior real-time updates

#### ✅ Testing
* Added comprehensive unit tests for client implementations
* All 72 tests passing (15 unit tests + 57 package validation tests)
* Build and type-checking successful

### 0.2.0 (2024-05-21)
* (André Iske)
  - Updated to newest ioBroker adapter structure
  - Fixed adapter crashes

### 0.1.3
* (André Iske) Security patches

Older changes can be found in [CHANGELOG_OLD.md](https://github.com/a-i-ks/ioBroker.volumio/blob/master/CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2024-2026 André Iske <andre.iske@mailbox.org>

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