---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.blustream-acm/README.md
title: ioBroker.blustream-acm
hash: WM9idrhDJNPp0YpPYf0WY/YaRdSPfim+FOwHpryGUws=
---
# IoBroker.blustream-acm

![Версия NPM](https://img.shields.io/npm/v/iobroker.blustream-acm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.blustream-acm.svg)
![Количество установок](https://iobroker.live/badges/blustream-acm-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/blustream-acm-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.blustream-acm.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.blustream-acm/workflows/Test%20and%20Release/badge.svg)

## Матричный контроллер Blustream ACM для ioBroker
Управляет модулями управления Blustream ACM для распределения аудио/видеосигнала HDMI по IP. Обнаруживает подключенные передатчики и приемники через интерфейс Telnet контроллера и отображает состояния маршрутизации/состояния для каждого из них. Доступные команды и состояния зависят от модели контроллера, которую вы выбираете в конфигурации адаптера.

> **Переименовано из `iobroker.blustream-acm200`.** Этот адаптер теперь поддерживает несколько моделей ACM, поэтому он больше не привязан к имени ACM200. Существующие установки `blustream-acm200.0` необходимо перенастроить в новом пространстве имен `blustream-acm.0`.

### Поддерживаемое оборудование
- **ACM200** — [Blustream ACM200](https://www.blustream.com/product/acm200/) (маршрутизация + источник звука передатчика)
- **ACM210** — маршрутизация, разъединение (ИК/RS232/USB/CEC), выходная мощность/отключение звука, аудиоматрица Dante + ARC
- **ACM500** — маршрутизация, отключение, выходная мощность/отключение звука
- **ACM1000** — маршрутизация, разъединение, выходная мощность/отключение звука, аудиоматрица Dante + ARC
- **Производитель:** [Blustream](https://www.blustream.com/)

Данный адаптер не связан с компанией Blustream и не одобрен ею; все товарные знаки принадлежат их соответствующим владельцам.

## Функции
- Автоматическое обнаружение подключенных передатчиков и приемников
— Возможности, учитывающие особенности модели: адаптер создает состояния и принимает команды только в том случае, если выбранная модель их поддерживает.
- Управление маршрутизацией видео/аудио (как комбинированное, так и независимое для каждого потока)
- Разъединяемая маршрутизация потоков ИК/RS232/USB/CEC (ACM210/500/1000)
- Регулировка выходной мощности и отключение звука (ACM210/500/1000)
- Аудиоматрица Dante/аналоговый/HDMI и управление ARC (ACM210/1000)
- Выбор источника звука передатчика (HDMI / ANA)
- Команды "Перенаправить на все дисплеи" (аудио+видео, только видео, только аудио)
- Мониторинг состояния всех устройств
- Предварительный просмотр URL-адресов изображений (предоставляемых встроенной точкой захвата контроллера)

## Установка
Установите адаптер через административный интерфейс ioBroker (Адаптеры → найдите "blustream").

## Конфигурация
### Основные настройки
- **Модель контроллера**: Выберите модель вашего контроллера ACM (ACM200 / ACM210 / ACM500 / ACM1000). Это определяет, какие команды и состояния будут доступны.
- **IP-адрес**: IP-адрес вашего контроллера ACM (по умолчанию: 192.168.0.225)
- **Порт**: порт Telnet (по умолчанию: 23)

### Расширенные настройки
- **Интервал опроса (мс)**: Как часто следует опрашивать обновления статуса (по умолчанию: 30000). Должен быть как минимум в два раза больше времени ожидания команды, чтобы каждый опрос мог завершиться до начала следующего — меньшие значения автоматически повышают уровень тревоги, и в журнал записывается предупреждение.
- **Тайм-аут команды (мс)**: Тайм-аут для одной команды, отправленной контроллеру (по умолчанию: 10000, минимум 1000). Увеличьте его, если в журнале большой системы сообщается о тайм-аутах команд.

## Штаты
Состояния, отмеченные как _(модель)_, создаются только в том случае, если выбранная модель контроллера поддерживает данную возможность.

### Система
- `info.connection` — Статус подключения к контроллеру
- `system.status.connected` — То же самое, что и info.connection (устаревшая версия)
- `system.status.lastUpdate` — Отметка времени последнего обновления статуса
- `system.status.nextScheduledRefresh` — Когда будет выполнено следующее полное ночное обновление
- `system.status.lastFullRefresh` — Временная метка последнего полного обновления
- `system.status.fullRefreshRunning` — возвращает значение true, пока выполняется полное обновление.
- `system.commands.routeAll` — Записать идентификатор передатчика для маршрутизации аудио и видео на все дисплеи
- `system.commands.routeAllVideo` — Записать идентификатор передатчика для маршрутизации видео только на все дисплеи
- `system.commands.routeAllAudio` — Записать идентификатор передатчика для маршрутизации только звука на все дисплеи

#### Команды обновления
Две кнопки обновления выполняют разный объем работы:

- `system.commands.refresh` — отправляет один запрос `STATUS`, тот же, что используется при обычном опросе. Обновляет маршруты, имена и состояние сети для каждого устройства одной командой. Недорого; используйте это после изменения чего-либо вне ioBroker.
- `system.commands.refreshAll` — запрашивает `IN<id>` / `OUT<id>` для каждого известного устройства, заполняя информацию о каждом устройстве, которую не сообщает `STATUS` (версия прошивки, MAC-адрес, режим вывода, маршруты отсоединения). Отправляет одну команду на устройство, поэтому это занимает заметно больше времени. Кроме того, она запускается автоматически один раз в ночь, в случайное время между 02:45 и 03:15, чтобы несколько экземпляров не опрашивали одновременно.

### Количество передатчиков (на один передатчик)
- `transmitters.<id>.id` — Идентификатор передатчика
- `transmitters.<id>.name` — Отображаемое имя
- `transmitters.<id>.ip` — IP-адрес
- `transmitters.<id>.connected` — Статус подключения
- `transmitters.<id>.edid` — настройка EDID
- `transmitters.<id>.audioSource` — Выбор источника звука (HDMI/ANA)
- `transmitters.<id>.audioMatrixMode` — _(ACM210/1000)_ Входной аудиоматричный тракт (HDMI/Аналоговый/Dante)
- `transmitters.<id>.previewUrl` — URL-адрес для предварительного просмотра изображения (если служба предварительного просмотра включена)

### Приемники (на один приемник)
- `receivers.<id>.id` — Идентификатор получателя
- `receivers.<id>.name` — Отображаемое имя
- `receivers.<id>.ip` — IP-адрес
- `receivers.<id>.connected` — Статус подключения
- `receivers.<id>.route` — Комбинированный маршрут аудио+видео (запишите идентификатор передатчика)
- `receivers.<id>.videoRoute` — Маршрут только для видео
- `receivers.<id>.audioRoute` — Маршрут только для аудио
- `receivers.<id>.irRoute` / `.rs232Route` / `.usbRoute` / `.cecRoute` — _(ACM210/500/1000)_ Маршруты прерывания (записать идентификатор передатчика)
- `receivers.<id>.power` — _(ACM210/500/1000)_ Включение/выключение выходной мощности
- `receivers.<id>.mute` — _(ACM210/500/1000)_ Включение/выключение отключения звука на выходе
- `receivers.<id>.audioOutputMode` — _(ACM210/1000)_ Выходной аудиоматричный путь
- `receivers.<id>.arcMode` — _(ACM210/1000)_ Режим ARC (Выкл/HDMI/Оптический)
- `receivers.<id>.resolution` — Разрешение выходных данных
- `receivers.<id>.previewUrl` — URL для предварительного просмотра изображения

## Примеры использования
Направьте передатчик 2 к приемнику 1:

```javascript
setState('blustream-acm.0.receivers.001.route', '002');
```

Направьте передатчик 3 на все приемники:

```javascript
setState('blustream-acm.0.system.commands.routeAll', '003');
```

## Поиск неисправностей
— Если адаптер не может подключиться, проверьте IP-адрес, порт и убедитесь, что интерфейс Telnet контроллера включен.
— Убедитесь, что настроенная **модель контроллера** соответствует вашему оборудованию — неправильная модель может отправлять команды, которые ваше устройство не понимает, или скрывать состояния, которые оно поддерживает.
- Если после запуска отсутствуют передатчики или приемники, выполните обновление с помощью команды `system.commands.refresh`.
- Включите отладочное логирование в разделе Администрирование → экземпляр → уровень логирования, чтобы видеть трафик Telnet.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.3.2 (2026-08-07)
- (Alan Paris) Fixed: the adapter stopped retrying for good if the controller was unreachable at start or when a cable was pulled
- (Alan Paris) Fixed: a command timing out while queued removed the wrong queue entry
- (Alan Paris) Command Timeout now applies to all commands, not just the handshake; default raised 5000 to 10000 ms
- (Alan Paris) Routing writes are validated; a non-numeric transmitter id is rejected instead of sent to the controller
- (Alan Paris) The nightly full refresh is now spread over 02:45-03:15 instead of firing at exactly 03:00
- (Alan Paris) Polling interval is floored at twice the command timeout
- (Alan Paris) Preview URLs are only rewritten when the previewed source changes
- (Alan Paris) Clarified the refresh and refreshAll button labels; existing installs are updated on start
- (Alan Paris) Corrected the Command Timeout help text in the configuration UI
- (Alan Paris) Per-device detail parsing logs at debug level instead of flooding the info log
- (Alan Paris) Receiver mode shows Matrix or Video Wall instead of the raw MX and VW tokens
- (Alan Paris) A transient object database error during a status parse no longer stops the instance

### 0.3.1 (2026-07-17)
- (Alan Paris) Object role corrections for ioBroker repository review: per-device `connected` states now use `indicator.reachable`; transmitter/receiver `id` states use the `text` role
- (Alan Paris) Remove a stale command-timeout comment

### 0.3.0 (2026-07-17)
- (Alan Paris) Renamed adapter from `blustream-acm200` to `blustream-acm` to reflect multi-model support
- (Alan Paris) Added a Controller Model setting (ACM200 / ACM210 / ACM500 / ACM1000); states and commands are now model-aware
- (Alan Paris) Added breakaway routing (IR/RS232/USB/CEC) and output power/mute for ACM210/500/1000
- (Alan Paris) Added Dante/analogue/HDMI audio matrix and ARC control for ACM210/1000
- (Alan Paris) Preview image URLs now use the configured controller host instead of a hardcoded address

### 0.2.4 (2026-07-03)
- (Alan Paris) Remove unused username/password settings — the ACM200 telnet interface requires no login
- (Alan Paris) Transmitter/receiver name states are now read-only (they are reported by the device and cannot be set from the adapter)
- (Alan Paris) Validate and clamp polling interval and command timeout to safe ranges
- (Alan Paris) Add Blustream product/manufacturer links to the documentation

### 0.2.3 (2026-07-03)
- (Alan Paris) Resolve adapter-checker errors: use framework-managed timers, add missing config help translations, and clean up redundant devDependencies

**Older changes have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)**

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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