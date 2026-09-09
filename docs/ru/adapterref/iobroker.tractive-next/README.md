---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tractive-next/README.md
title: ioBroker.tractive-next
hash: sHfsj6IJcgHy7gX29U25C8Xpzv2WCrYWgFmIHKRXOHI=
---
# ioBroker.tractive-next

Неофициальный GPS-адаптер Tractive для ioBroker.

## Функции

- Вход в аккаунт Tractive с автоматическим обновлением токенов.
- Одна автоматическая повторная попытка после HTTP-кода 401 или 403.
- Список трекеров / подробности / оборудование / местоположение
- Обзор активности и здоровья (`…health.*`)
- История перемещений за 24 часа (`…history.*`)
- Состояния оповещения для автоматизации (`…alerts.*`)
- JSON-данные геозоны плюс структурированные состояния геозон (`…geofences.*`)
- Дополнительные команды для отслеживания в реальном времени, светодиодной индикации и звукового сигнала (`…controls.*`, закрытый `enableCommands`)
- Данные геозоны предоставляются в формате JSON, если API это позволяет.
- Ссылка на OpenStreetMap и вкладка обзора карты в административной панели с кнопками отслеживания в реальном времени / светодиодной индикацией / звуковым сигналом.
- Отслеживание рабочего дня администратора: путь, переключение тепловой карты, ползунок диапазона «от» до и воспроизведение.
- Дополнительный проект обзора материалов Vis-2 (`docs/vis-2/`)
- Автоматическое создание объектов ioBroker и определение типов данных.
- Зашифрованный пароль, ESLint, пакетные/модульные тесты, GitHub Actions CI

## Важный

Веб-сайт производителя: <https://tractive.com/>

Компания Tractive не предоставляет документированного общедоступного API для этих трекеров. Этот адаптер использует неофициальную конечную точку, используемую существующими интеграциями с открытым исходным кодом. Компания Tractive может изменить её в любое время.

## Установка

Установите и обновите адаптер через **Администратор ioBroker** Список адаптеров появится, как только он станет доступен в официальном издании. **Последний** репозиторий.

После добавления экземпляра откройте конфигурацию и введите адрес электронной почты и пароль Tractive. После первой настройки (и после изменения параметров шифрования пароля) сохраните пароль один раз, чтобы он хранился в зашифрованном виде.

## Конфигурация

Для отправки команд отслеживания в реальном времени / управления светодиодами / звуковым сигналом включите соответствующую опцию. **Включить команды отслеживания** в настройках экземпляра. Доступные для записи состояния находятся под каждым трекером по адресу: `…controls.liveTrackingActive`, `…controls.ledActive` и `…controls.buzzerActive`.

Команды передаются через API облака Tractive. Внутри **Энергосбережение / домашняя зона** Облачные сервисы часто принимают запрос как `pending` но не активирует светодиод, зуммер или отслеживание в реальном времени на устройстве (официальное приложение по-прежнему может использовать Bluetooth Radar локально). За пределами этой зоны команды работают; адаптер поддерживает оптимистичное значение управления, пока API отправляет отчеты. `pending`чтобы пользовательский интерфейс не переключался обратно на `false` прежде чем вы сможете снова отключить эту функцию.

## Разработка

Примечания для авторов и контрольный список для публикации: [`docs/PUBLISHING.md`](docs/PUBLISHING.md).

На хосте разработки можно синхронизировать локальный клон с `UPDATE_ON_PI.sh` (Только для сопровождающих, не для установки конечными пользователями).

## Changelog

### 0.5.5
* (Fraese73) Add alert states per tracker (`alerts.trackerOffline`, `alerts.lowBattery`, `alerts.noRecentPosition`, `alerts.minutesSinceLastSeen`)
* (Fraese73) Add structured geofence states per tracker (`geofences.<id>.id|name|active|enteredAt|leftAt`, plus `count`/`idsJson`)

### 0.5.4
* (Fraese73) Latest review fixes: English admin tab UI, valid state roles (`text` / `value.battery`), poll interval upper bound, full jsonConfig translations
* (Fraese73) Admin day track: from–to range slider to limit visible track points

### 0.5.3
* (Fraese73) Fix day-track / history parser for nested `json_segments` (`[[points]]`)

### 0.5.2
* (Fraese73) E6013/W6018: README install via Admin only; remove root CHANGELOG.md (changelog in README)

### 0.5.1
* (Fraese73) Repository checker fixes: news only for published npm versions

### 0.5.0
* (Fraese73) Admin day track with heatmap toggle and time-slider playback; history.distanceKm

### 0.4.0
* (Fraese73) Optional live-tracking / LED / buzzer commands with enableCommands safety switch
* (Fraese73) Fixed overview.charging for NOT_CHARGING string values
* (Fraese73) Optimistic pending control state, admin control buttons, Vis-2 overview (shipped in 0.5.0)

### 0.3.0
* (Fraese73) Activity/health overview, 24h history, live-tracking status, geofence JSON (read-only)

### 0.2.11
* (Fraese73) Stabilization: null type hints, tolerant API sections, unit tests, redacted logs

### 0.2.10
* (Fraese73) Trusted Publishing release with provenance; news limited to npm versions

Older entries: [`docs/CHANGELOG_OLD.md`](docs/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Fraese73

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