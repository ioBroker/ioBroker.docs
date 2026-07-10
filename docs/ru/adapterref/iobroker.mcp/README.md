---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcp/README.md
title: ioBroker.mcp
hash: biPH4rPRb+GHsloLOCfhsQ6SiuWpblvywj7w39BIzOU=
---
<img src="admin/mcp.png" alt="ioBroker.mcp" width="200"/>

# IoBroker.mcp
Сервер MCP для ioBroker

## Описание
Этот адаптер предоставляет доступ к ioBroker в качестве сервера [MCP (Протокол контекста модели)](https://modelcontextprotocol.io), поэтому клиенты, поддерживающие MCP (например, Claude Desktop), могут считывать данные и управлять вашей установкой с помощью четко определенного набора инструментов.

## Функции
- Сервер MCP, использующий протокол **Streamable HTTP** (конечная точка `/mcp`)
- Настраиваемый веб-сервер HTTP/HTTPS
- Настраиваемый порт и адрес привязки
- Дополнительная аутентификация
- Дополнительная поддержка SSL/TLS
- Диагностика сети (ICMP ping / TCP probe) для устранения неполадок в работе сетевых адаптеров.
- Поиск в репозитории адаптеров для рекомендации устанавливаемых адаптеров.

## Режимы работы
Адаптер может работать в двух режимах:

1. **Автономный** (по умолчанию) – запускает собственный веб-сервер на настроенном порту. Конечная точка MCP:

`http(s)://<host>:<port>/mcp`.

2. **Веб-расширение** – оно работает внутри существующего [`web`](https://github.com/ioBroker/ioBroker.web) адаптера

экземпляр и использует общий веб-сервер (порт, аутентификация, SSL). Выберите целевой веб-экземпляр в конфигурации администратора ("Расширить веб-адаптер"). Затем конечная точка MCP будет обслуживаться через веб-адаптер, например,

`http(s)://<host>:8082/mcp/`.

При выборе веб-экземпляра настройки автономного сервера (порт, адрес привязки, аутентификация, SSL) скрываются, поскольку они наследуются от выбранного экземпляра `web`.

## Конфигурация
Адаптер можно настроить через административный интерфейс ioBroker с помощью JSONConfig:

### Конфигурация сервера
- **Расширить веб-адаптер**: Выберите экземпляр `web`, который будет запущен в качестве его расширения. Оставьте поле пустым для автономного запуска.
- **Порт**: Порт, на котором веб-сервер будет прослушивать запросы (по умолчанию: 8093) – только для автономного режима.
- **Адрес привязки**: IP-адрес, к которому будет привязан сервер (0.0.0.0 для всех интерфейсов) – только для автономного режима.

### Аутентификация
- **Включить аутентификацию**: Включить аутентификацию пользователей ioBroker для веб-сервера.
- **Пользователь по умолчанию**: Пользователь ioBroker, с правами которого выполняется каждый запрос MCP (по умолчанию: `admin`).

Все операции чтения и записи объектов/состояний, выполняемые инструментами, осуществляются от имени этого пользователя, поэтому применяются списки контроля доступа (ACL) этого пользователя. Простое имя, например `operator`, автоматически преобразуется в `system.user.operator`.
При работе в качестве веб-расширения, если здесь не указан пользователь, используется пользователь по умолчанию экземпляра хоста `web`.

### Разрешения
- **Разрешить установку состояний**: Разрешить клиентам MCP записывать значения состояний (инструменты `set_state` и `set_states`).

По умолчанию: **включено**.

- **Разрешить изменение объектов/файлов**: Разрешить клиентам MCP создавать/изменять/удалять объекты и файлы (функция `set_object`).

Инструменты `delete_object`, `create_state`, `create_scene`, `write_file`, `delete_file`, `rename_file` и `mkdir`). По умолчанию: **выключено**. В выключенном состоянии эти инструменты вообще не отображаются.

### Настройка SSL/TLS
- **Включить HTTPS**: Включите HTTPS/SSL для безопасных соединений.
- **Открытый сертификат**: Путь к файлу открытого сертификата
- **Закрытый ключ**: Путь к файлу закрытого ключа
- **Цепочка сертификатов**: Путь к файлу цепочки сертификатов (необязательно)

## Конечная точка MCP
Сервер MCP обслуживается по адресу `POST/GET/DELETE /mcp` с использованием потокового HTTP-транспорта с отслеживанием состояния каждой сессии (через заголовок `Mcp-Session-Id`). Направьте свой клиент MCP по следующему адресу:

- автономный режим: `http(s)://<host>:<port>/mcp`
- веб-расширение: `http(s)://<host>:<webPort>/mcp/`

### Доступные инструменты
| Инструмент | Описание |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get_states` | Получает текущее значение одного или нескольких состояний; идентификаторы могут содержать подстановочные знаки (например, `hue.0.*.brightness`) |
| `search_objects` | Поиск объектов/состояний по ключевому слову (сопоставление с ID и именем); дополнительные фильтры для объекта `type`, `role`, `room` и экземпляра источника `adapter` |
| `list_devices` | Список обнаруженных устройств, сгруппированных по комнатам (использует детектор типов ioBroker для отображения функциональных устройств с именованными элементами управления); необязательный фильтр `language` и `room` |
| `list_instances` | Список экземпляров адаптера с указанием их статуса |
| `list_adapters` | Список установленных адаптеров с метаданными (версия, название, описание, ключевые слова) |
| `search_adapter_repository` | Поиск в репозитории адаптеров ioBroker (все *устанавливаемые* адаптеры, а не только уже установленные) по ключевому слову; необязательные фильтры `type` категории, `onlyNotInstalled` и `language` — используйте их, чтобы порекомендовать, какой адаптер установить для устройства/сервиса |
| `list_hosts` | Список хостов ioBroker с указанием их статуса |
| `list_rooms` | Список комнат (`enum.rooms.*`) с локализованными названиями и данными участников; необязательные `language` и `withIcons` |
| `list_functions` | Список функций (`enum.functions.*`) с локализованными именами и подробными сведениями о членах; необязательные `language` и `withIcons` |
| `history_query` | Запрос исторических значений (требуется адаптер истории); агрегации: `raw`, `min`, `max`, `avg`, `sum`, `count`, `minmax`, `percentile`, `quantile`, `integral` |
| `read_file` | Чтение файла из файлового хранилища адаптера (опционально base64) |
| `list_files` | Список каталогов в файловом хранилище адаптера |
| `file_exists` | Проверка наличия файла в файловом хранилище адаптера |
| `get_logs` | Получение последних строк логов ioBroker; опциональные фильтры по `level` (ошибка/предупреждение/информация/отладка), источнику `adapter` и времени начала (`from_ts`) |
| `write_log` | Записать сообщение в лог ioBroker |
| `system_info` | Получение информации о системе и js-контроллере |
| `ping_host` | Диагностика подключения к сетевому устройству: ICMP-пинг к `host` плюс, при необходимости, TCP-подключение к `port` — полезно для исследования ошибок адаптера `ETIMEDOUT`/подключения |
| `set_state` | Установить значение состояния (значение, преобразованное в тип состояния) — требуется *Разрешить установку состояний* |
| `set_states` | Установка нескольких состояний за один вызов (для сцен/групповых действий, таких как «все лампы выключены») — требуется *Разрешить установку состояний* |
| `set_object` | Создание/обновление объекта (объединение общих/собственных данных) — требуется *Разрешить изменение объекта/файла* |
| `delete_object` | Удаление объекта, при необходимости со всеми дочерними элементами — требует *Разрешить изменение объекта/файла* |
| `create_state` | Создать новый объект состояния с типом/ролью/единицей измерения/минимальным/максимальным значением и необязательным начальным значением — требуется *Разрешить изменение объекта/файла* |
| `create_scene` | Создание или обновление сцены для адаптера ioBroker `scenes` (пары состояние/значение применяются одновременно) — требуется *Разрешить изменение объектов/файлов* |
| `write_file` | Запись файла в файловое хранилище адаптера — требуется *Разрешить изменение объектов/файлов* |
| `delete_file` | Удаление файла из файлового хранилища адаптера — требуется *Разрешить изменение объектов/файлов* |
| `rename_file` | Переименование/перемещение файла в пределах одного файлового хранилища адаптера — требуется *Разрешить изменение объектов/файлов* |
| `mkdir` | Создание каталога в файловом хранилище адаптера — требуется *Разрешить изменение объектов/файлов* |
| `mkdir` | Создать каталог в файловом хранилище адаптера — требуется *Разрешить изменение объектов/файлов* |

Доступ ко всем объектам/состоянию осуществляется с правами, предоставленными настроенным **Пользователем по умолчанию**. Инструменты записи регистрируются только в том случае, если включена соответствующая опция прав доступа.

### Ресурсы и обновления в режиме реального времени (SSE)
Состояния и объекты также доступны в качестве **ресурсов** MCP с использованием канонической схемы URI ioBroker, поэтому клиенты могут читать их и **подписываться на них**. Сервер передает изменения через поток Streamable HTTP SSE (`notifications/resources/updated`).

- Состояния: `iobstate://<id>` (например, `iobstate://javascript.0.temperature`) – `resources/read` возвращает

`{ id, val, ack, ts, lc, q }`.

- Объекты: `iobobject://<id>` (например, `iobobject://system.adapter.admin.0`) – `resources/read` возвращает объект.
- Журналы: `ioblog://all` (все источники) или `ioblog://<source> ` (например, `ioblog://admin.0`) – `resources/read`

Возвращает последние строки журнала (`{ source, logs: [{ ts, level, source, message }] }`). Подписка включает пересылку журнала для адаптера; каждая новая соответствующая строка запускает `notifications/resources/updated`.

— `resources/subscribe` подписывается на состояние/объект/журнал базового ioBroker; при каждом изменении клиент

Получает `notifications/resources/updated` для этого URI и перечитывает его. `resources/unsubscribe` останавливает его.

Подписки отслеживаются для каждой сессии и подсчитываются по количеству ссылок, поэтому адаптер подписывается на состояние/объект только один раз, независимо от того, сколько клиентов/сессий следят за ним, и отписывается, когда последний клиент покидает систему.

(В файлах используется обозначение `iobfile://<adapter>/<path>` в той же схеме; они доступны через инструменты `read_file`/`write_file`, а не как ресурсы, доступные по подписке.)

### Показатели состояния здоровья (не относящиеся к MCP)
- `GET /` - Основная информация о сервере
- `GET /status` - Состояние сервера, время работы и количество активных сессий
- `GET /api/info` - Информация об адаптере

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.11 (2026-07-02)
* (@GermanBluefox) Default port was changed to 8011
* (@GermanBluefox) Corrected the issue with authentication

### 1.0.8 (2026-06-18)
* (@GermanBluefox) Used `@iobroker/mcp-server` package

### 1.0.5 (2026-06-17)
* (@GermanBluefox) Added debug for ICMP ping and TCP probe in `ping_host` tool

### 1.0.2 (2026-06-13)
* (@GermanBluefox) Some repo checker errors were fixed

### 1.0.0 (2026-06-12)
* (@GermanBluefox) Allowed node 18

### 0.3.1 (2026-06-11)
* (@GermanBluefox) Added `search_adapter_repository` tool to search the whole adapter repository (not only installed adapters)
* (@GermanBluefox) Added `ping_host` tool (ICMP ping + optional TCP probe) for network diagnostics

### 0.2.5 (2026-06-11)
* (@GermanBluefox) Supported direct import of MCP server

### 0.2.0 (2026-06-11)
* (@GermanBluefox) Many changes: see the previous changelog entry

### 0.1.5 (2026-06-11)
* (@GermanBluefox) Added wildcard support to `get_states` (e.g. `hue.0.*.brightness`)
* (@GermanBluefox) Added `set_states` for writing multiple states in one call (scenes/group actions)
* (@GermanBluefox) Added `delete_object` and `create_state` tools (gated by *Allow object/file changes*)
* (@GermanBluefox) Added `create_scene` tool that creates scenes for the ioBroker `scenes` adapter
* (@GermanBluefox) Added file management tools: `list_files`, `file_exists`, `delete_file`, `rename_file`, `mkdir`
* (@GermanBluefox) Added `list_adapters` to list installed adapters with metadata
* (@GermanBluefox) Extended `search_objects` with `type` and `adapter` filters; the keyword now also matches object names
* (@GermanBluefox) Extended `history_query` with the aggregations `count`, `minmax`, `percentile`, `quantile` and `integral`

### 0.1.4 (2026-05-28)
* (@GermanBluefox) Initial development

### 0.0.1 (2025-01-03)
* Initial release with basic web server functionality
*Configurable port, bind address, authentication, and SSL

## License

MIT License

Copyright (c) 2025-2026 ioBroker

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