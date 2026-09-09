---
chapters: {"pages":{"en/adapterref/iobroker.zte-mc888/README.md":{"title":{"en":"ioBroker.zte-mc888"},"content":"en/adapterref/iobroker.zte-mc888/README.md"},"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md":{"title":{"en":"Development notes"},"content":"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zte-mc888/README.md
title: ioBroker.zte-mc888
hash: MYLsWZ5v0Sl2PFLkJZxXvF2MDXXZp9nx0Zpz9PFUDs4=
---
# ioBroker.zte-mc888

Считывает значения сигналов LTE и 5G с маршрутизатора ZTE MC888 и отображает их в виде состояний ioBroker.

## Поддерживаемое устройство

[ZTE MC888 5G FWA (внутренний маршрутизатор)](https://www.ztedevices.com/de/products/mobile-internet/5g-fwa/MC888.html) — страница продукта на сайте ZTE Devices.

Адаптер взаимодействует с локальным маршрутизатором.`goform` Использование HTTP API, поэтому не требуется облачный аккаунт и подключение к интернету.

## Штаты

Все штаты доступны только для чтения.`…Dec` Состояния представляют собой десятичное отображение шестнадцатеричного значения, расположенного рядом с ними (именно это отображает веб-интерфейс маршрутизатора).

### `general`

| Состояние     | Тип   | Единица | Описание                                                                            |
| ------------- | ----- | ------- | ----------------------------------------------------------------------------------- |
| `networkType` | нить  |         | Тип текущей сети, например`ENDC` или `LTE`                                          |
| `cellId`      | нить  |         | Идентификатор ячейки, предоставленный маршрутизатором (в шестнадцатеричном формате) |
| `cellIdDec`   | число |         | Идентификатор ячейки в виде десятичного числа                                       |

### `lte` — Основная ячейка LTE

| Состояние            | Тип   | Единица | Описание                                                            |
| -------------------- | ----- | ------- | ------------------------------------------------------------------- |
| `rsrp`               | число | дБм     | Мощность принимаемого опорного сигнала                              |
| `rsrq`               | число | дБ      | Качество принимаемого эталонного сигнала                            |
| `sinr`               | число | дБ      | Отношение сигнал/помеха плюс шум                                    |
| `rssi`               | число | дБм     | Уровень принимаемого сигнала                                        |
| `band`               | нить  |         | Диапазон основного несущего сигнала, например `3`                   |
| `bandName`           | нить  |         | Диапазон, как указано в информации о ячейке, например: `LTE BAND 3` |
| `arfcn`              | нить  |         | Нисходящий канал EARFCN (номер канала)                              |
| `bandwidth`          | нить  |         | Пропускная способность основного несущего сигнала                   |
| `pci`                | нить  |         | Физический идентификатор ячейки (шестнадцатеричный)                 |
| `pciDec`             | число |         | Физический идентификатор ячейки в виде десятичного числа.           |
| `carrierAggregation` | нить  |         | Состояние агрегации несущих, сообщаемое маршрутизатором.            |

### `lte.scc0` …`lte.scc3` — Вторичные операторы LTE

Один канал на каждую вторичную несущую ячейку (до четырех), каждый с одинаковым состоянием:

| Состояние   | Тип        | Единица | Описание                                         |
| ----------- | ---------- | ------- | ------------------------------------------------ |
| `active`    | логический |         | `true` пока используется этот вторичный носитель |
| `pci`       | число      |         | Физический идентификатор ячейки                  |
| `band`      | число      |         | Группа                                           |
| `arfcn`     | число      |         | номер канала                                     |
| `bandwidth` | число      | МГц     | Пропускная способность                           |
| `rsrp`      | число      | дБм     | Мощность принимаемого опорного сигнала           |
| `rsrq`      | число      | дБ      | Качество принимаемого эталонного сигнала         |
| `sinr`      | число      | дБ      | Отношение сигнал/помеха плюс шум                 |
| `rssi`      | число      | дБм     | Уровень принимаемого сигнала                     |

### `nr5g` — Основная ячейка 5G NR

| Состояние   | Тип   | Единица | Описание                                                  |
| ----------- | ----- | ------- | --------------------------------------------------------- |
| `rsrp`      | число | дБм     | Мощность принимаемого опорного сигнала                    |
| `rsrq`      | число | дБ      | Качество принимаемого эталонного сигнала                  |
| `sinr`      | число | дБ      | Отношение сигнал/помеха плюс шум                          |
| `rssi`      | число | дБм     | Уровень принимаемого сигнала                              |
| `band`      | нить  |         | Группа, например `78`                                     |
| `bandName`  | нить  |         | Диапазон, как указано в информации о ячейке.              |
| `arfcn`     | нить  |         | NR-ARFCN (номер канала)                                   |
| `bandwidth` | нить  |         | Пропускная способность                                    |
| `pci`       | нить  |         | Физический идентификатор ячейки (шестнадцатеричный)       |
| `pciDec`    | число |         | Физический идентификатор ячейки в виде десятичного числа. |

### `info`

| Состояние    | Тип        | Единица | Описание                                   |
| ------------ | ---------- | ------- | ------------------------------------------ |
| `connection` | логический |         | `true` хотя последний опрос прошел успешно |

Без авторизации маршрутизатор отображает только тип сети и основные значения RSRP/RSSI; все остальные состояния остаются пустыми. См. [раздел «Вход в систему, сессии и веб-интерфейс»](#login-sessions-and-the-web-ui) .

## Конфигурация

- **IP-адрес маршрутизатора** — обычно`192.168.0.1` Некоторые прошивки используют`192.168.254.1` .
- **Интервал опроса** — секунды между считываниями (от 5 до 86400).
- **Требуется авторизация** — включите эту опцию, если API отвечает только после аутентификации.
- **Имя пользователя / Пароль** — учетные данные администратора маршрутизатора (по умолчанию используется имя пользователя).`admin` ).
- **Веб-интерфейс имеет приоритет** _(только при авторизации)_ — когда веб-интерфейс маршрутизатора авторизуется под тем же пользователем, адаптер приостанавливает работу, а не выполняет повторную авторизацию и отключается. См. ниже.
- **Время ожидания после входа в веб-интерфейс (минуты)** _(только при входе в систему)_ — как долго адаптер остается в режиме выхода из системы (с сохранением последних значений) после того, как веб-интерфейс перехватывает сессию. Значение по умолчанию: 5. Установите значение:`0` повторно войти в систему на следующем же опросе.

## Вход в систему, сессии и веб-интерфейс

Маршрутизатор MC888 обрабатывает лишь несколько полей (тип сети + основной RSRP/RSSI) без аутентификации; для RSRQ, SINR, диапазонов, PCI, агрегации несущих и вторичных ячеек требуется авторизация. Маршрутизатор также разрешает **только одну сессию на пользователя** , и вторая авторизация автоматически прерывает первую.

Чтобы избежать проблем с веб-интерфейсом маршрутизатора (тот же самый).`admin` пользователь), адаптер:

1. Вход в систему осуществляется один раз, и сессия **сохраняется** между опросами (полный набор полей).
2. Определяет, когда другой пользователь (веб-интерфейс) перехватывает его сессию.
3. Затем **происходит откат** на заданное время вместо немедленного повторного входа в систему — в течение этого периода сохраняются последние значения, и обновляются только общедоступные поля, поэтому ваша сессия в веб-интерфейсе не прерывается.
4. После истечения срока отсрочки, сессия возобновляется.

Если вы предпочитаете всегда иметь полные данные и вас не смущает выход из веб-интерфейса, отключите **приоритет веб-интерфейса** (или установите значение параметра backoff на ).`0` ).

## Различия в прошивке

Названия полей маршрутизатора различаются в зависимости от версии прошивки, поэтому в некоторых версиях прошивки отдельные состояния могут оставаться пустыми. В этом случае, пожалуйста, [создайте заявку](https://github.com/muraus/ioBroker.zte-mc888/issues) и приложите отладочный лог (уровень логирования экземпляра).`debug` (который регистрирует необработанный ответ маршрутизатора) плюс версию вашей прошивки — затем в адаптер можно добавить поддержку различных имен полей.

## Вклад

Примечания по сборке, тестированию и расширению возможностей адаптера находятся в [файле DEVELOPMENT.md](/#/docs/adapterref/iobroker.zte-mc888/DEVELOPMENT.md) .

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.5 (2026-08-13)
* (Adapterman) Adapter requires admin >= 7.8.23 now.
* (Adapterman) The poll interval is now capped at 24 h so a huge value cannot overflow the timer
* (Adapterman) The web UI back-off is now capped at 24 h and both limits are enforced in the admin config
* (Adapterman) New adapter icon, delivered only in the admin directory as in the ioBroker template
* (Adapterman) Corrected and completed the list of adapter states in the README
* (Adapterman) Removed the install section from the README and moved the development notes to DEVELOPMENT.md

### 0.0.4 (2026-07-29)
* (Adapterman) Added the supported device section with a link to the ZTE MC888 product page
* (Adapterman) Corrected the required Node.js version in the development section
* (Adapterman) Added the readme link to io-package.json so Admin can link the documentation
* (Adapterman) Completed the author information in package.json, io-package.json and LICENSE

### 0.0.3 (2026-07-25)
* (Adapterman) Added ESLint (@iobroker/eslint-config) and prettier config plus a `lint` script
* (Adapterman) Added a tsconfig.json and a `check` script to type check the JavaScript sources via JSDoc
* (Adapterman) Fixed a crash in the poll loop when the router did not answer and no login is configured
* (Adapterman) Admin config is now translated into all 11 ioBroker languages (jsonConfig i18n)
* (Adapterman) Added dependabot configuration and VS Code JSON schema settings
* (Adapterman) Lint and type checking are now enforced in CI

### 0.0.2 (2026-07-25)
* (Adapterman) Normalized the repository URL in package.json
* (Adapterman) Release is published via npm trusted publishing and signed with provenance

### 0.0.1 (2026-07-25)
* (Adapterman) Initial release

[Older changelogs can be found there](https://github.com/muraus/ioBroker.zte-mc888/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Adapterman <adapterman@proton.me>

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