---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zte-mc888/README.md
title: ioBroker.zte-mc888
hash: v53dMYCwOaCCfF+zXcVK9Zhql55pO/YHWip7D+jETHA=
---
# IoBroker.zte-mc888
Считывает значения сигналов LTE и 5G с маршрутизатора ZTE MC888 и отображает их в виде состояний ioBroker.

## Поддерживаемые устройства
[ZTE MC888 5G FWA (внутренний маршрутизатор)](https://www.ztedevices.com/de/products/mobile-internet/5g-fwa/MC888.html) — страница продукта на сайте ZTE Devices.

Адаптер взаимодействует с локальным HTTP API маршрутизатора, поэтому учетная запись в облаке и подключение к интернету не требуются.

## Штаты
Все состояния доступны только для чтения. Состояния `…Dec` представляют собой десятичное отображение шестнадцатеричного значения, расположенного рядом с ними (именно это отображается в веб-интерфейсе маршрутизатора).

### `general`
| Штат | Тип | Единица измерения | Описание |
| --- | --- | --- | --- |
| `networkType` | строка | | Текущий тип сети, например, `ENDC` или `LTE` |
| `cellIdDec` | число | | Идентификатор ячейки в десятичном виде |
| `cellIdDec` | число | | Идентификатор ячейки в десятичном формате |

### `lte` — Основная ячейка LTE
| Штат | Тип | Единица измерения | Описание |
| --- | --- | --- | --- |
| `rsrp` | число | дБм | Мощность принимаемого опорного сигнала |
| `sinr` | число | дБ | Отношение сигнала к помехам плюс шум |
| `rssi` | число | дБм | Уровень принимаемого сигнала |
| `band` | строка | | Диапазон основной несущей, например, `3` |
| `bandName` | строка | | Диапазон, как указано в информации о ячейке, например, `LTE BAND 3` |
| `arfcn` | строка | | Downlink EARFCN (номер канала) |
| `bandwidth` | строка | | Пропускная способность основной несущей |
| `pci` | строка | | Идентификатор физической ячейки (шестнадцатеричный) |
| `pciDec` | число | | Идентификатор физической ячейки в десятичном виде |
| `carrierAggregation` | строка | | Состояние агрегации несущих, сообщаемое маршрутизатором |
| `carrierAggregation` | строка | | Состояние агрегации несущих, сообщаемое маршрутизатором |

### `lte.scc0` … `lte.scc3` — вторичные несущие LTE
Один канал на каждую вторичную несущую ячейку (до четырех), каждый с одинаковым состоянием:

| Штат | Тип | Единица измерения | Описание |
| --- | --- | --- | --- |
| `active` | логическое значение | | `true` пока используется этот дополнительный несущий канал |
| `band` | номер | | Диапазон |
| `arfcn` | номер | | Номер канала |
| `bandwidth` | число | МГц | Полоса пропускания |
| `rsrp` | число | дБм | Мощность принимаемого опорного сигнала |
| `rsrq` | число | дБ | Качество принимаемого опорного сигнала |
| `sinr` | число | дБ | Отношение сигнала к помехам плюс шум |
| `rssi` | число | дБм | Уровень принимаемого сигнала |
| `rssi` | число | дБм | Уровень принимаемого сигнала |

### `nr5g` — Основная сота 5G NR
| Штат | Тип | Единица измерения | Описание |
| --- | --- | --- | --- |
| `rsrp` | число | дБм | Мощность принимаемого опорного сигнала |
| `sinr` | число | дБ | Отношение сигнала к помехам плюс шум |
| `rssi` | число | дБм | Уровень принимаемого сигнала |
| `band` | строка | | Группа, например, `78` |
| `bandName` | строка | | Диапазон, как указано в информации о ячейке |
| `arfcn` | строка | | NR-ARFCN (номер канала) |
| `bandwidth` | строка | | Пропускная способность |
| `pci` | строка | | Идентификатор физической ячейки (шестнадцатеричный) |
| `pciDec` | число | | Идентификатор физической ячейки в десятичном виде |
| `pciDec` | число | | Идентификатор физической ячейки в десятичном формате |

### `info`
| Штат | Тип | Единица измерения | Описание |
| --- | --- | --- | --- |
| `connection` | логическое значение | | `true` пока последний опрос прошел успешно |

Без авторизации маршрутизатор отображает только тип сети и основные значения RSRP/RSSI; все остальные состояния остаются пустыми. См. [Вход в систему, сессии и веб-интерфейс](#login-sessions-and-the-web-ui).

## Конфигурация
- **IP-адрес маршрутизатора** — обычно `192.168.0.1`, в некоторых версиях прошивки используется `192.168.254.1`.
- **Интервал опроса** — секунд между считываниями (от 5 до 86400).
- **Требуется авторизация** — включите эту опцию, если API отвечает только после аутентификации.
- **Имя пользователя / Пароль** — учетные данные администратора маршрутизатора (по умолчанию используется имя пользователя `admin`).
- **Веб-интерфейс имеет приоритет** (только при авторизации)* — когда веб-интерфейс маршрутизатора выполняет вход в систему.

При попытке входа в систему под тем же пользователем адаптер приостанавливает работу, вместо того чтобы повторно войти и отключиться. См. ниже.

- **Время ожидания после входа в веб-интерфейс (минуты)** *(только после входа в систему)* — сколько времени

После того, как веб-интерфейс перехватывает сессию, адаптер остается в состоянии выхода из системы (сохраняя последние значения). Значение по умолчанию: 5. Установите значение `0`, чтобы повторно войти в систему при следующем же запросе.

## Вход в систему, сессии и веб-интерфейс
Маршрутизатор MC888 обрабатывает лишь несколько полей (тип сети + основной RSRP/RSSI) без аутентификации; для RSRQ, SINR, диапазонов, PCI, агрегации несущих и вторичных ячеек требуется авторизация. Маршрутизатор также разрешает **только одну сессию на пользователя**, и вторая авторизация автоматически прерывает первую.

Чтобы избежать конфликтов с веб-интерфейсом маршрутизатора (с тем же пользователем `admin`), адаптер:

1. Выполняет вход в систему один раз и **сохраняет** сессию между опросами (полный набор полей).
2. Определяет, когда другой пользователь (веб-интерфейс) перехватывает его сессию.
3. Затем **отключается** на заданное время вместо немедленного повторного выхода из системы.

В течение этого периода сохраняются последние значения, и обновляются только общедоступные поля, поэтому ваша сессия в веб-интерфейсе не прерывается.

4. Восстанавливает сессию по истечении периода ожидания.

Если вы предпочитаете всегда иметь полные данные и вас не смущает выход из системы веб-интерфейса, отключите параметр **Приоритет веб-интерфейса** (или установите значение параметра backoff на `0`).

## Различия в прошивке
Имена полей маршрутизатора различаются в зависимости от версии прошивки, поэтому в некоторых версиях прошивки отдельные состояния могут оставаться пустыми. В этом случае, пожалуйста, отправьте отладочный лог (уровень логирования экземпляра `debug`, который регистрирует необработанный ответ маршрутизатора) и укажите версию вашей прошивки — тогда в адаптер можно будет добавить поддержку различных имен полей.

## Вклад
Примечания по сборке, тестированию и расширению возможностей адаптера находятся в разделе [DEVELOPMENT.md](https://github.com/muraus/ioBroker.zte-mc888/blob/main/DEVELOPMENT.md).

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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