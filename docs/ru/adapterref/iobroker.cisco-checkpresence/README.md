---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cisco-checkpresence/README.md
title: ioBroker.cisco-checkpresence
hash: 6+T+2vQnd6HzYSNvcHp2+s9gjVTOJ+FL6iLzVYR1V34=
---
![Логотип](../../../en/adapterref/iobroker.cisco-checkpresence/admin/cisco-checkpresence.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.cisco-checkpresence.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cisco-checkpresence.svg)
![Количество установок](https://iobroker.live/badges/cisco-checkpresence-installed.svg)

# IoBroker.cisco-checkpresence
**Тесты:** ![Тестирование и выпуск](https://github.com/NurPech/ioBroker.cisco-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Адаптер Cisco Catalyst 9800 CheckPresence для ioBroker
Обнаруживает присутствие членов семьи, запрашивая информацию у беспроводного контроллера Cisco Catalyst 9800 через RESTCONF. Вместо ненадежных проверок ping, адаптер считывает таблицу аутентифицированных клиентов непосредственно с WLC — если контроллер сообщает о подключении устройства, значит, оно действительно подключено.

## Требования
- Беспроводной контроллер Cisco Catalyst 9800 Series (9800-L, 9800-CL, 9800-40, 9800-80)
— Требуется **аутентификация 802.1X**. Адаптер идентифицирует клиентов по их имени пользователя 802.1X. Внешний RADIUS-сервер не требуется — достаточно локального EAP на контроллере беспроводной сети.
— Учетная запись пользователя WLC с доступом для чтения RESTCONF.
- ioBroker с js-controller ≥ 6.0.11 и Admin ≥ 7.0.23

## Конфигурация
Откройте настройки адаптера в административной панели ioBroker.

### Вкладка "Подключение"
| Поле | Описание |
|-------|-------------|
| Хост/IP-адрес контроллера беспроводной сети (WLC) | IP-адрес или имя хоста контроллера Catalyst 9800 WLC |
| Имя пользователя | Имя пользователя RESTCONF (например, `iobroker_bot`) |
| Пароль | Пароль RESTCONF (хранится в зашифрованном виде) |
| Интервал (с) | Интервал опроса в секундах (10–300, по умолчанию: 30) |
| Игнорировать самоподписанный сертификат | Включить, если ваш WLC использует самоподписанный TLS-сертификат (рекомендуется) |

### Вкладка "Пользователи"
Сопоставление имен пользователей 802.1X с именами штатов в ioBroker:

| Поле | Описание |
|-------|-------------|
| Имя пользователя 802.1X | Имя пользователя, указанное в таблице клиентов WLC |
| Название штата | Название, используемое для штата в соответствии с `presence.<name>` |

## Штаты
Для каждого настроенного пользователя адаптер создает следующие состояния:

| Штат | Тип | Описание |
|-------|------|-------------|
| `presence.<name>.present` | логическое значение | `true` если клиент в данный момент подключен |
| `presence.<name>.band` | строка | Радиодиапазон (`2.4 GHz`, `5 GHz` или `6 GHz`) |
| `presence.<name>.rssi` | число (дБм) | Уровень принимаемого сигнала |
| `presence.<name>.snr` | число (дБ) | Соотношение сигнал/шум |
| `info.connection` | логическое значение | `true` если WLC доступен |
| `info.connection` | логическое значение | `true`, если контроллер беспроводной сети доступен |

## Интеграция с ioBroker Residents
Состояния присутствия можно связать с [адаптер ioBroker Residents](https://github.com/jpawlowski/ioBroker.residents) через поле **Точки данных о иностранном присутствии**:

```
cisco-checkpresence.0.presence.leonie.present
```

## Известные ограничения
- **Несколько устройств на одного пользователя:** Если несколько устройств аутентифицированы с использованием одного и того же имени пользователя 802.1X, используется первый клиент, возвращенный API WLC. Это ограничение, связанное с конкретным сценарием использования, а не ошибка.
- **Требуется 802.1X:** Устройства без аутентификации 802.1X (например, устройства IoT, использующие PSK) не обнаруживаются. Локального EAP на контроллере беспроводной сети достаточно, если внешний RADIUS-сервер недоступен.
- **Только централизованное переключение:** Протестировано с точками доступа в локальном режиме с централизованным переключением (CAPWAP). В режиме гибкого/локального переключения поведение может отличаться.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.7 (2026-06-11)
- Fixed: Sanitise user-supplied state names to remove characters forbidden in ioBroker object IDs
- Fixed: Clamp pollInterval and absentThreshold to sane upper bounds
- Fixed: Avoid overlapping polls by self-scheduling the poll loop instead of using setInterval
- Fixed: Use translations for the admin tab labels and poll interval field
- Fixed: Corrected admin page title

### 0.0.6 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.5 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.4 (2026-06-06)
- Chore: Update to node 22
- Chore: Update dependencies
- Fixed: Fixed object structure

### 0.0.3 (2026-04-27)
- (M1kad0) fix npm publishing

### 0.0.2 (2026-04-26)
- (M1kad0) added absent threshold to debounce presence detection

### 0.0.1 (2026-04-26)
- Initial release
- Presence detection via RESTCONF (`common-oper-data`)
- AP name, radio band, RSSI and SNR via `traffic-stats`
- Encrypted password storage
- Dark/light mode admin UI with MUI v6

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 M1kad0 <leonie+iobroker@sgessinger.de>

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