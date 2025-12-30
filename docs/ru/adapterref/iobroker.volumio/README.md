---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: 0vHVTyX+WBHXZeJc4qalwJaA20eNyJgyhR1I2pgwrSU=
---
![Логотип](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.volumio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![Количество установок (последние)](http://iobroker.live/badges/volumio-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/volumio-stable.svg)
![Статус зависимости](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![Известные уязвимости](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.volumio.png?downloads=true)

# IoBroker.volumio
**Тесты:** ![Тестирование и выпуск](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### Поддержите меня
Если этот адаптер помог вам реализовать интересные сценарии автоматизации в вашем умном доме и сократить время на разработку, можете пригласить меня на чашечку кофе :)

[![Пожертвовать](https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## Адаптер Volumio для ioBroker
Адаптер Volumio для ioBroker

Это адаптер для удаленного управления экземпляром Volumio.

### ✨ Версия 0.9.0 - Поддержка двух API
Теперь адаптер поддерживает **два режима связи** с Volumio:

#### 🚀 Режим WebSocket (Рекомендуемый - по умолчанию)
- **Обновления в режиме реального времени** через Socket.IO
- Мгновенные изменения состояния без проведения опроса.
- Снижение сетевых накладных расходов
- Автоматическое переподключение при потере соединения
- Идеально подходит для быстрой автоматизации дома.

#### 📡 Режим REST API
- Обновление состояния на основе опроса (настраиваемый интервал)
- Совместимо со старыми версиями Volumio
- Дополнительная поддержка HTTP-push-уведомлений (устарело)
- Резервный вариант для сетей, где WebSocket заблокирован.

### 🎛️ Конфигурация
Выберите предпочтительный режим API в настройках адаптера:

- **Режим API**: выберите «WebSocket» (рекомендуется) или «REST API»
- **Интервал опроса** (режим REST): Как часто проверять изменения состояния (по умолчанию: 2 секунды)
- **Настройки повторного подключения** (режим WebSocket): Настройка поведения повторных попыток при потере соединения.

### 🎵 Реализованные функции
* **Управление воспроизведением**
* Воспроизведение / Пауза / Стоп
* Переключение между воспроизведением и паузой
* Следующая / Предыдущая композиция
* Воспроизвести n-ю песню из плейлиста
* **Регулировка громкости**
* Установите определенное значение (0-100)
* Регулировка громкости
* Включить/выключить звук
* Отключить звук
* **Управление очередью**
* Очистить очередь
* **Параметры воспроизведения**
* Воспроизведение в случайном порядке (в случайном порядке)
* Режим повтора
* Повторить один трек
* **Информация о штате**
* Состояние игрока в реальном времени (WebSocket) или опрос (REST)
* Информация о треке (название, исполнитель, альбом, обложка)
* Системная информация
* Состояние подключения

### 📚 Документация API
Этот адаптер использует официальные API Volumio:

- **WebSocket API**: https://developers.volumio.com/api/websocket-api
- **REST API**: https://developers.volumio.com/api/rest-api

### 🔮 Планируемые функции (в будущих версиях)
- [ ] Просмотреть музыкальную библиотеку
- [ ] Управление плейлистами (список, создание, удаление)
- [ ] Функция поиска
- [ ] Поддержка многокомнатного аудио

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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

### 0.1.2
* (André Iske) Minor bug fixes

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2024-2025 André Iske <andre.iske@mailbox.org>

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