---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: fOohMvM9rkBsyLDQRL76oFAhiZ1eoEWkgJUzh9nehew=
---
![Количество установок](https://iobroker.live/badges/unifi-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.unifi.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.unifi/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/unifi/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi.svg)

<img height="100px" src="admin/unifi.svg" align="left"><br/>

# ioBroker.unifi

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub

Этот адаптер отображает вашу [сеть UniFi](https://ui.com/) в ioBroker: какие устройства находятся в сети, как работают ваш шлюз UniFi, коммутаторы и точки доступа, какой объем интернет-трафика вы используете и многое другое. Некоторые параметры также можно переключать через ioBroker, например, беспроводные сети, порты PoE, светодиоды устройств, блокировку клиента или создание гостевых ваучеров.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Требования

- Консоль UniFi с операционной системой UniFi OS (UDM, UDM-Pro, UDM-SE, UCG, UX, Cloud Key Gen2+, UniFi OS Server) или самостоятельно установленное приложение UniFi Network.
- **Ключ API** (рекомендуется только для UniFi OS) или **локальный пользователь** консоли. Облачные учетные записи ui.com использовать нельзя: они требуют многофакторной аутентификации, вход в систему завершается ошибкой. `MFA_AUTH_REQUIRED`.

## Настраивать

1. **Создайте ключ API** (рекомендуется): откройте приложение UniFi Network → **Интеграции** (в Network 11 в левой панели навигации, ранее в Настройках → Панель управления → Интеграции) → **Создать новый ключ API** . Скопируйте ключ, он отображается только один раз. _Без UniFi OS или если вы предпочитаете использовать пользователя:_ создайте пользователя в консоли в разделе Администраторы и Пользователи с правами **«Ограничить доступ только к локальной сети»** и доступом к UniFi Network: полное управление для переключения между функциями, только просмотр или только чтение.
2. **Установите адаптер** в ioBroker (Адаптеры → UniFi) и откройте настройки экземпляра.
3. Вкладка **«Общие»** :
   - **IP-адрес** консоли, например `192.168.1.1` Для консолей UniFi OS оставьте **порт** пустым; для приложений, размещаемых на собственном сервере, обычно используется другой порт. `8443`.
   - **Аутентификация** : _ключ API_ (вставьте ключ) или _локальный пользователь_ с именем пользователя и паролем.
   - Оставьте включенной опцию **«Игнорировать ошибки SSL-сертификатов»** : в консолях используется самоподписанный сертификат.
   - **Интервал обновления** в 60 секунд подходит для большинства сетей.
4. Включите необходимые параметры на других вкладках (см. ниже) и **сохраните** . Примерно через минуту данные появятся в списке объектов. `unifi.0`.

`info.connection` Показывает, подключен ли адаптер; в этом случае индикатор горит зеленым.

## Настройки

| Вкладка                     | Что вы получите                                                                                                                                           | Рекомендация                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Общий                       | интервал подключения и обновления                                                                                                                         | Ключ API, 60 с                                                                  |
| Sysinfo                     | Статус версии и обновления приложения UniFi Network                                                                                                       | на                                                                              |
| Клиенты                     | Каждое устройство в вашей сети: имя, IP-адрес, подключение к сети, беспроводная сеть, сигнал; блокировка/повторное подключение.                           | на                                                                              |
| Устройства                  | шлюз, коммутаторы, точки доступа: состояние, микропрограмма, температура, порты с PoE, интернет-соединения (`wan1`, `wan2`); перезапуск, PoE, светодиоды | на                                                                              |
| Беспроводные локальные сети | Включайте и выключайте беспроводные сети.                                                                                                                 | на                                                                              |
| Сети                        | сети и VLAN с их настройками                                                                                                                              | по мере необходимости                                                           |
| Здоровье                    | Общее состояние интернета, локальной сети, беспроводной сети и VPN.                                                                                       | на                                                                              |
| Ваучеры                     | гостевые ваучеры для точки доступа; создание новых.                                                                                                       | только с точкой доступа                                                         |
| Сигнализация                | тревожные сообщения                                                                                                                                       | **Отключено** в UniFi Network 10 и более новых версиях (больше нет оповещений). |
| ДПИ                         | трафик по приложениям и категориям                                                                                                                        | При необходимости требуется шлюз с идентификацией трафика.                      |
| трафик шлюза                | трафик в сутки на старых шлюзах                                                                                                                           | **Отключите** UniFi Network 11 и более новые версии, используйте WAN.           |
| ВАН                         | интернет-трафик сегодня / вчера / месяц, провайдер, доступность, тест скорости                                                                            | Продолжаем работу с UniFi Network 11 и более новыми версиями.                   |

**Фильтрация объектов:** записи объектов, которые не должны создаваться. Клиенты: имя, имя хоста, IP-адрес или MAC-адрес; список можно использовать и в обратном порядке, как список только создаваемых клиентов. Устройства: имя, IP-адрес или MAC-адрес. Беспроводные сети (WLAN): имя (SSID). Сети: имя. Состояние: подсистема, например. `wan`, `www`, `lan`, `wlan`, `vpn`.

**Фильтрация состояний:** создаются только выбранные состояния; если ничего не выбрано, создаются все состояния. Новые экземпляры начинают работу с рекомендуемым выбором для клиентов и устройств, поэтому дерево объектов остается чистым. Состояния, необходимые для выбранного состояния, добавляются автоматически, например... `last_seen_by_uap` /`last_seen_by_usw` для `is_online`.

## Что вы получите

| Папка                               | Содержание                                                                                                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unifi.0.<site>.sysinfo`            | версия, доступно обновление                                                                                                                                                                                   |
| `unifi.0.<site>.clients.<mac>`      | Одна папка на одного клиента: `name`, `ip`, `is_online`, `essid`, `signal`, `last_seen` текущий трафик (`tx_bytes-r` /`rx_bytes-r`, проводной: `wired-…`), скорость соединения WLAN (`tx_rate` /`rx_rate`) … |
| `unifi.0.<site>.devices.<mac>`      | Одна папка на каждое устройство UniFi: `state`, `version`, `upgradable`, `uptime` температуры, `port_table` (порты, PoE), `wan1` /`wan2` (интернет-соединения шлюза) …                                           |
| `unifi.0.<site>.wlans.<name>`       | одна папка на каждую беспроводную сеть. `enabled`                                                                                                                                                             |
| `unifi.0.<site>.networks.<name>`    | одна папка на сеть                                                                                                                                                                                            |
| `unifi.0.<site>.health.<subsystem>` | `wan`, `lan`, `wlan`, `vpn`, `www` с `status`                                                                                                                                                                  |
| `unifi.0.<site>.wan.<connection>`   | Проверка трафика, провайдера, доступности и скорости каждого интернет-соединения.                                                                                                                             |
| `unifi.0.<site>.vouchers`           | ваучеры и кнопка `create_vouchers`                                                                                                                                                                            |
| `unifi.0.info`                      | Состояние соединения и последнее обновление (см. раздел «Устранение неполадок»)                                                                                                                               |

`<site>` — это название сайта UniFi, обычно `default` Все состояния имеют соответствующую роль ioBroker, поэтому они распознаются средствами визуализации и помощниками.

### Интернет-соединения (WAN)

Для шлюзов (например, UDM-Pro, UCG, USG) каждому интернет-соединению присваивается отдельная папка в каталоге устройства: `wan1`, и `wan2` Если установлено второе соединение, отображается публичный IPv4-адрес, IPv6-адреса, состояние соединения, номер порта на шлюзе, скорость соединения, а также, во время подключения, задержка и доступность.

### Статистика WAN (UniFi Network 11 и более новые версии)

В UniFi Network 11 перешли на новый механизм сбора статистики и очистили историю статистики; отчет шлюза использовался для `gateway_traffic` С тех пор данные не возвращаются. Параметр **«Обновить статистику WAN»** считывает данные с панели мониторинга сетевого приложения и создает `<site>.wan.<connection>` для каждого интернет-соединения (`WAN`, `WAN2`, …):

| Состояние                                                                       | Содержание                                                     |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `today_rx_bytes`, `today_tx_bytes`                                              | Получено/отправлено с полуночи (местное время хоста ioBroker). |
| `yesterday_rx_bytes`, `yesterday_tx_bytes`                                      | получено / отправлено вчера                                    |
| `last24h_rx_bytes`, `last24h_tx_bytes`                                          | получено/отправлено за последние 24 часа                       |
| `monthly_bytes`                                                                 | По данным консоли, трафик за текущий месяц                     |
| `rx_rate`, `tx_rate`                                                            | текущая скорость в байтах в секунду                            |
| `up`, `active`, `interface`, `uptime`                                           | Состояние соединения, доступность в %                          |
| `latency`, `packet_loss`                                                        | последнего часа                                                |
| `isp_name`, `isp_asn`, `capacity_download`, `capacity_upload`                   | провайдер и его пропускная способность в Мбит/с                |
| `speedtest_download`, `speedtest_upload`, `speedtest_latency`, `speedtest_time` | последний тест скорости консоли                                |

Значения трафика суммируются из почасовых значений консоли, поэтому они точны примерно до одного часа. Значение остается пустым (`null`) до тех пор, пока на консоли не будет данных за весь интервал, например `yesterday_*` В день обновления до UniFi Network 11 контроллеры без этой панели мониторинга пропускаются после одного предупреждения.

## Контроль

| Состояние                                            | Действие                                                                                                          |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `wlans.<name>.enabled`                               | включить Wi-Fi (`true`) или выключено (`false`); Точки доступа обрабатывают данные в течение нескольких секунд. |
| `clients.<mac>.blocked`                              | блокировать (`true`) или разблокировать (`false`) клиент, беспроводной или проводной                            |
| `clients.<mac>.reconnect`                            | Кнопка: отключить беспроводного клиента, чтобы он снова подключился.                                              |
| `devices.<mac>.restart`                              | кнопка: перезагрузить устройство                                                                                  |
| `devices.<mac>.led_override`                         | Светодиоды `on`, `off` или `default` (настройка сайта)                                                              |
| `devices.<mac>.port_table.port_<n>.port_poe_enabled` | Включить или выключить PoE на порту                                                                               |
| `devices.<mac>.port_table.port_<n>.port_poe_cycle`   | Кнопка: выключает и снова включает PoE, например, для перезапуска камеры.                                         |
| `vouchers.create_vouchers`                           | Кнопка: создание ваучеров с настройками вкладки «Ваучеры».                                                        |
| `unifi.0.trigger_update`                             | кнопка: прочитать данные сейчас                                                                                   |

Для переключения требуется ключ API или локальный пользователь с полными правами управления сетью UniFi.

## Поиск неисправностей

| Состояние                    | Значение                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| `info.connection`            | `true` пока консоль отвечает                                                                           |
| `info.lastSuccessfulRefresh` | время последнего полного обновления                                                                    |
| `info.lastError`             | последнее сообщение об ошибке, пустое, если все в порядке.                                             |
| `info.consecutiveErrors`     | Повторяющиеся неудачные обновления; после ошибок адаптер немного дольше ждет перед следующей попыткой. |

| Сообщение в журнале                                                    | Что делать                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Incorrect username or password`                                       | Проверьте имя пользователя и пароль; пользователь должен быть локальным пользователем.                                                                                                                                                      |
| `The API key was rejected`                                             | Ключ недействителен, просрочен или удален: создайте новый в UniFi Network → Интеграции                                                                                                                                                      |
| `The UniFi console blocks the login of the local user`                 | Слишком много попыток авторизации, например, из-за того, что один и тот же пользователь используется другими системами. Адаптер пытается снова через 15 минут. Ключ API позволяет этого избежать.                                           |
| `not available right now`                                              | Сетевое приложение консоли перезапускается, например, во время обновления. Адаптер продолжает работу самостоятельно через несколько минут; только `still not available` требует внимания.                                                    |
| `cannot be reached`, `refused the connection`, `closed the connection` | Если консоль или сеть на мгновение отключались (перезагрузка, обновление), следующее обновление повторяет это. Сразу после запуска или при повторении: проверьте IP-адрес и порт, а также убедитесь, что консоль доступна с хоста ioBroker. |
| `did not answer within 10 s`                                           | Консоль на мгновение оказалась занята, следующее обновление повторяет это. Внимание требуют только повторяющиеся сообщения.                                                                                                                 |
| `no gateway statistics`                                                | В UniFi Network 11 и более новых версиях: отключите _трафик шлюза_ и включите _WAN._                                                                                                                                                        |

## Известные проблемы

- Он `is_wired` Состояние клиентов отображается некорректно после того, как клиент отключился от сети. Это известная проблема контроллера UniFi (см. <https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1> ).
- После слишком большого количества попыток входа в систему консоль UniFi блокирует локального пользователя на некоторое время. Адаптер ждет 15 минут, прежде чем повторить попытку; для ввода ключа API вход в систему не требуется.
- В UniFi Network 10 и более новых версиях функция оповещений больше не работает, отключите её в настройках.

<details>
<summary>For developers: API endpoints</summary>

Не все данные API отображаются в ioBroker. Чтобы проверить исходные данные, откройте эти URL-адреса в браузере, находясь в консоли (замените `IP` и `SITE`; саморазмещаемое приложение не имеет `/proxy/network` и требует наличия порта, например. `https://IP:8443/api/s/SITE/stat/sta`):

| Информация                  | URL                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------ |
| Сайты                       | `https://IP/proxy/network/api/self/sites`                                            |
| Системная информация        | `https://IP/proxy/network/api/s/SITE/stat/sysinfo`                                   |
| Клиенты                     | `https://IP/proxy/network/api/s/SITE/stat/sta`                                       |
| Устройства                  | `https://IP/proxy/network/api/s/SITE/stat/device`                                    |
| Беспроводные локальные сети | `https://IP/proxy/network/api/s/SITE/rest/wlanconf`                                  |
| Сети                        | `https://IP/proxy/network/api/s/SITE/rest/networkconf`                               |
| Здоровье                    | `https://IP/proxy/network/api/s/SITE/stat/health`                                    |
| Ваучеры                     | `https://IP/proxy/network/api/s/SITE/stat/voucher`                                   |
| ДПИ                         | `https://IP/proxy/network/api/s/SITE/stat/dpi`                                       |
| Статистика WAN              | `https://IP/proxy/network/v2/api/site/SITE/aggregated-dashboard?historySeconds=3600` |

</details>

## Ссылки

Этот адаптер использует функциональность следующих сторонних модулей Node.js:

- [json-logic-js](https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@Schimi1983) Clients: current traffic per second (`tx_bytes-r`, `rx_bytes-r`, wired `wired-tx_bytes-r`, `wired-rx_bytes-r`), WLAN link speed in Mbit/s (`tx_rate`, `rx_rate`) and `powersave_enabled` (#71, #531)
- (@Schimi1983) Short network errors (console not reachable, connection refused or closed) after a successful refresh are a warning in plain text instead of an error; an error right after the start (wrong IP address or port) or after 3 failed refreshes in a row
- (@Schimi1983) While the UniFi Network application restarts (e.g. during an update, HTTP 502/503/504) a warning instead of an error with stack; an error only after 3 failed refreshes in a row

### 2.0.0 (2026-11-08)
- (@GermanBluefox) **Breaking change:** 16 states store numbers or booleans instead of text now (PoE power/voltage/current, load average, CPU / memory / uptime of `system-stats`, port settings speed and rates, voucher duration; `full_duplex`, `isolation`, `autoneg` and `stp_port_mode` of the port settings are true/false). History adapters may reject the new type for an existing series (InfluxDB: field type conflict), and scripts that compare these states with text (e.g. `=== 'true'`) have to be adjusted. The object IDs do not change
- (@Schimi1983) Repository checker: `sinon` comes with `@iobroker/testing`, news of versions that are not on npm removed, line breaks of the copyright lines
- (@Schimi1983) Gateway traffic: with UniFi Network 11 and newer (no gateway statistics anymore) the request is skipped after one message until the next start. With the WAN statistics switched on it is only an info, without them a warning that tells which settings to change
- (@Schimi1983) Login of the local user blocked by the UniFi console (account locked, login limit): a clear message instead of the raw answer, and the next attempt only after 15 minutes, so the block is not extended
- (@Schimi1983) Internal errors of the controller (HTTP 500) are logged in one short line instead of the whole HTML page
- (@Schimi1983) A single timeout of the controller is a warning without stack (the next refresh repeats the request), only from 3 failed refreshes in a row an error
- (@Schimi1983) README and settings page for beginners: setup step by step, every tab explained with a recommendation, overview of the folders, control and troubleshooting tables, the API endpoints moved to a section for developers; short explanations on every tab of the settings in 11 languages
- (@Schimi1983) All states have a specific ioBroker role (e.g. `info.ip`, `info.mac`, `indicator.reachable`, `value.temperature`, `switch.enable`, `date`) instead of the generic `state`, so visualizations and assistants recognize them
- (@Schimi1983) Unified units (`B`, `B/s`, `Mbit/s`, `kbit/s`, `min`), numbers are stored as numbers (PoE power/voltage/current, load, CPU, memory, uptime of the devices, voucher duration), and the port settings full duplex, isolation, auto negotiation and spanning tree as true/false
- (@Schimi1983) `rssi` of the clients is the signal-to-noise ratio in dB (unit was dBm)
- (@Schimi1983) Readable names for all folders (e.g. "Ports", "Radios", "Speed test") in 11 languages, the site gets its name from the controller
- (@Schimi1983) New instances: recommended selection of client and device states, alarms off (UniFi Network 10 and newer has no alarms)
- (@hdering) Endpoints removed in newer UniFi Network versions (e.g. alarms, 404 `api.err.NotFound`) are logged once as a warning and skipped instead of logging an error on every refresh
- (@hdering) Added a hint to the settings that a local UniFi OS user or an API key is required, as UI.com accounts require MFA
- (@hdering) A login rejected with `MFA_AUTH_REQUIRED` (UI.com account) is explained in the log instead of logging the response with the MFA cookie
- (@GermanBluefox) Settings: the hint of the object filter names what each tab really filters (clients, devices, WLANs, networks, health), and a separate hint for the client whitelist

### 1.2.1 (2026-11-04)
- (@GermanBluefox) WAN statistics: traffic was counted several times if the history had a gap at its start (e.g. the gateway was offline)

### 1.2.0 (2026-11-04)
- (@Schimi1983) The `blocked` state is created for wired clients too, with role `switch` [#760]
- (@Schimi1983) Gateways: IPv4 and IPv6 addresses, status, port, link speed, latency and availability of every internet connection (`wan1`, `wan2`) [#696]

### 1.1.0 (2026-11-04)
- (@Schimi1983) Authentication with an API key (UniFi OS), as alternative to the local user
- (@Schimi1983) node-unifi was replaced by an own client without dependencies (no axios with known vulnerabilities, one request less per call)
- (@Schimi1983) The session of the local user is ended when the adapter stops
- (@Schimi1983) The default port is empty (UniFi OS) and `common.dataSource` is `poll`
- (@Schimi1983) WAN statistics for UniFi Network 11 and newer: traffic today, yesterday and in the last 24 hours, monthly traffic, state, availability, latency, provider and last speed test of every internet connection [#696]
- (@Schimi1983) Warning when the controller returns no gateway statistics (UniFi Network 11 cleared them)

### 1.0.3 (2026-11-03)
- (@Schimi1983) Settings page: size attributes for all fields of the tabs, as required by the repository checker (W5507)
- (@Schimi1983) Fixed the `blocked` state of the clients: it was not updated when all states were selected (empty states filter), and with several sites the refresh of one site reset the blocked clients of the others
- (@Schimi1983) Fixed commands (restart, LED, PoE, block, ...) failing before the first refresh or after an expired session [#725]
- (@Schimi1983) Switching PoE creates the missing override of a port instead of failing [#658]

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2023 Jens Maus &lt;mail@jens-maus.de&gt;  
Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.