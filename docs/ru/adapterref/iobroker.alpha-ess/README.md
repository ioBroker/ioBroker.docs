---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.alpha-ess
hash: 0sy426DMRu447/TNVSaYXQoInBH95iLwwWIEbai1qrs=
---
![Логотип](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![Количество установок (последние)](https://iobroker.live/badges/alpha-ess-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/alpha-ess-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![Известные уязвимости](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# ioBroker.alpha-ess

## Адаптер Alpha ESS для ioBroker

Этот адаптер подключает ioBroker к официальному [открытому API Alpha ESS](https://open.alphaess.com/) . Он считывает данные о мощности, энергии, системе, конфигурации батареи и настенном блоке питания. Поддерживаемые настройки батареи и настенного блока питания также можно изменить через ioBroker.

Доступные значения зависят от модели системы и от функций, предоставляемых Alpha ESS для данной системы.

## Функции

- Данные об энергопотреблении в режиме реального времени для фотоэлектрических систем, сети, нагрузки, аккумуляторов и подключенного зарядного оборудования.
- Суточные объемы потребления энергии и информация о системе.
- Графики зарядки и разрядки и ограничения уровня заряда батареи.
- Сводные данные, включая ежемесячную и годовую статистику.
- Резервные данные об энергопотреблении для систем без поддержки API реального времени
- Состояние настенного блока, управление запуском/остановкой и текущие настройки.
- Укажите информацию о качестве соединения и ошибках API.

## Требования

- ioBroker с js-controller 6.0.11 или новее и Admin 7.6.20 или новее
- Node.js 22 или более поздняя версия
- Учетная запись Alpha ESS и система, зарегистрированная на портале разработчиков Open API.
- Персональный идентификатор приложения, секретный ключ приложения и серийный номер системы Alpha ESS.

Адаптер использует облачный API и, следовательно, требует доступа в интернет. Он не подключается напрямую к инвертору и не обеспечивает соединение по протоколу Modbus.

## Настраивать

1. Войдите на [портал Alpha ESS Open API](https://open.alphaess.com/) и зарегистрируйте систему.
2. Создайте или выберите персональное приложение, чтобы получить его идентификатор и секретный ключ.
3. Найдите серийный номер системы (SN) и код проверки. Alpha ESS описывает процесс регистрации в [репозитории Open API](https://github.com/alphaess-developer/alphacloud_open_api) .
4. Установите адаптер со страницы адаптеров ioBroker и создайте экземпляр.
5. Введите идентификатор приложения, секретный ключ приложения и серийный номер системы в настройках экземпляра.
6. Включите только те группы данных, которые необходимы для системы, и сохраните конфигурацию.

Секретный ключ приложения хранится в ioBroker в зашифрованном и защищенном виде как встроенная настройка. Не публикуйте его в отчетах об ошибках или выдержках из журналов.

## Конфигурация

| Вариант                               | Единица         | Описание                                                                                                 |
| ------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| Персональный идентификатор приложения | —               | Идентификатор приложения из портала Alpha ESS Open API                                                   |
| Секрет личного приложения             | —               | Секрет, принадлежащий идентификатору приложения.                                                         |
| Идентификатор системы Alpha ESS       | —               | Серийный номер системы (SN)                                                                              |
| Данные в реальном времени             | секунд          | Значения мощности и уровня заряда батареи; минимальный интервал: 10 секунд.                              |
| Системная информация                  | секунд          | Метаданные модели и системы; минимальный интервал: 10 секунд.                                            |
| Последние данные по электроэнергии    | зафиксированный | Получает данные о резервном энергопотреблении каждые 5 минут для систем без поддержки реального времени. |
| энергетические данные                 | минут           | Суточный объем потребляемой энергии; минимальный интервал: 5 минут.                                      |
| Настройки зарядки                     | минут           | График зарядки и ограничение уровня заряда батареи; минимальный интервал: 1 минута.                      |
| Настройки разряда                     | минут           | График выписки и крайний срок окончания стационарного лечения; минимальный интервал: 1 минута.           |
| Сводные данные                        | минут           | Статистические сводки; минимальный интервал: 5 минут.                                                    |
| данные Wallbox                        | минут           | Отображение состояния настенного блока и управление запуском/остановкой; минимальный интервал: 1 минута. |
| Настенный блок питания текущий        | секунд          | Текущие настройки настенного блока; минимальный интервал: 10 секунд.                                     |
| Обновить неизмененные состояния       | —               | Записывает новое обновление состояния, даже если значение не изменилось.                                 |

Короткие интервалы приводят к увеличению количества запросов к облаку. Используйте максимально подходящий для автоматизации интервал и соблюдайте ограничения открытого API Alpha ESS.

## Точки данных

Ниже представлены включенные и поддерживаемые группы данных. `alpha-ess.<instance>`:

| Папка                | Содержание                                                                         | Записываемые значения                 |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------- |
| `Realtime`           | Текущая мощность фотоэлектрических систем, сети, нагрузки, аккумулятора и зарядки. | —                                     |
| `Recent`             | Данные о резервной мощности за пять минут                                          | —                                     |
| `System`             | Идентификация системы и метаданные                                                 | —                                     |
| `Energy`             | Суточные объемы потребляемой энергии                                               | —                                     |
| `Settings_Charge`    | Периоды зарядки и лимит уровня заряда (SOC)                                        | Все настройки находятся в этой папке. |
| `Settings_Discharge` | Периоды разряда и пороговое значение SOC                                           | Все настройки находятся в этой папке. |
| `Summary`            | Ежедневная, месячная, годовая и общая статистика                                   | —                                     |
| `Wallbox`            | Серийный номер, модель, состояние и управление зарядкой.                           | `Charging_Start`, `Charging_Stop`    |
| `Wallbox_Current`    | Настройки тока для настенной приставки (для всего домохозяйства)                   | Текущая настройка                     |

Папки и состояния создаются только тогда, когда соответствующая конечная точка включена и API возвращает атрибут. Поэтому неподдерживаемые или отключенные состояния могут отсутствовать.

### Настройки письма

Перевести документ в состояние, доступное для записи, с указанием источника (`ack`) установить на `false` как это делает ioBroker для изменений, внесенных в представление объектов или пользователем. `setState(id, value, false)` Адаптер отправляет полную группу настроек в Alpha ESS и считывает значения обратно после запроса. Это позволяет избежать нескольких одновременных записей значений в одной и той же группе.

В настоящее время поддержка Wallbox позволяет использовать один Wallbox на систему Alpha ESS. Перед автоматизацией зарядки или изменения тока проверьте допустимый диапазон и поведение установленной модели Wallbox.

## Государственное качество

Он `q` Атрибут показывает, является ли значение текущим:

| Качество | Значение                                                               |
| -------- | ---------------------------------------------------------------------- |
| `0x00`   | Значение является текущим.                                             |
| `0x01`   | Значение не было обновлено с ожидаемым интервалом; см. журнал отладки. |
| `0x02`   | Проблема с подключением к сети или облаку.                             |
| `0x12`   | Адаптер остановлен или отключен                                        |
| `0x44`   | API вернул ошибку, или адаптер обнаружил внутреннюю ошибку.            |

`info.connection` является `true` после успешного ответа API и `false` когда коммуникация терпит неудачу.

## Поиск неисправностей

- **Состояния не создаются:** убедитесь, что группа данных включена, и проверьте журнал отладки. Некоторые системы Alpha ESS не поддерживают все конечные точки.
- **Ошибка аутентификации:** проверьте идентификатор приложения и секретный ключ, затем подтвердите, что системный серийный номер зарегистрирован для этого приложения на портале Open API.
- **Ошибка временной метки (`6006` Синхронизируйте** часы и часовой пояс хоста ioBroker с помощью NTP.
- **Значения остаются устаревшими:** проверьте качество состояния и журнал отладки, увеличьте интервал опроса и проверьте, доступна ли облачная платформа Alpha ESS.
- **Записанное значение возвращается к исходному:** ответ API является авторитетным. Проверьте диапазон значений и формат, принимаемые системой, и избегайте одновременной записи одной и той же группы настроек.

При сообщении о проблеме укажите версию адаптера, версии Node.js и js-controller, модель системы, идентификатор затронутого состояния и отладочный журнал, охватывающий один неудачный запрос. В первую очередь удалите секретный ключ приложения и другие учетные данные.

## Поддерживать

- [Проблемы на GitHub](https://github.com/Gaspode69/ioBroker.alpha-ess/issues)
- [ветка форума ioBroker](https://forum.iobroker.net/topic/60009/)
- [Ветка обсуждения сообщества Storion4you](https://www.storion4you.de/thread/683)

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями, а также не подразумевает одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.**

## Changelog
### **WORK IN PROGRESS**
- (Gaspode) Adapter requires Node.js 22 or newer
- (Gaspode) Added Node.js 26 tests and updated development tooling
- (Gaspode) Improved setup, configuration, data point, and troubleshooting documentation
- (Gaspode) Improved the configuration layout on small screens

### 4.1.0 (2026-02-14)

- (Gaspode) Read and write wallbox current

### 4.0.0 (2025-11-01)

- (Gaspode) Update dependencies, Node.js version 20 or later is now required

### 3.0.1 (2024-12-22)

- (Gaspode) Optimizations of reading pseudo-realtime power data for slow systems

### 3.0.0 (2024-12-21)

- (Gaspode) **Breaking Change:** Renamed state "Charging_period 1_end" to "Charging_period_1_end"
- (Gaspode) Optimizations in configuration dialog

### 2.3.0 (2024-12-20)

- (Gaspode) Provides the ability to read pseudo-realtime power data using the API function getTodayPowerBySn. This feature is useful for systems that lack "realtime data support." When activated, data is fetched every 5 minutes and stored in the "Recent" folder.

### 2.2.0 (2024-12-16)

- (Gaspode) Provide system information data (getEssList)

### 2.1.6 (2024-12-01)

- (Gaspode) Migrated to ESLint 9

### 2.1.5 (2024-11-14)

- (Gaspode) Optimized GUI for all screen resolutions (responsive design)

### 2.1.4 (2024-08-13)

- (Gaspode) Updated some formal stuff

### 2.1.3 (2024-08-07)

- (Gaspode) Increased read timeout from 10 to 20 s

### 2.1.2 (2024-08-07)

- (Gaspode) Quality of states optimized

### 2.1.1 (2024-08-07)

- (Gaspode) Do not longer report read timeouts as error. It should be enough to set the quality of concerned states to values according the table above and to display warnings, if values were not updated for a long time. To see details, debug log level must be enabled by the user.

### 2.1.0 (2024-08-01)

- (Gaspode) Adapter requires node.js >= 18 and js-controller >= 5 now
- (Gaspode) Dependencies updated
- (Gaspode) Adapter logo updated. Alpha-ESS has kindly permitted to use the Alpha-ESS logo. This does not imply any affiliation with Alpha-ESS! Alpha-ESS is not the developer or provider of this adapter!

### 2.0.2 (2024-01-12)

- (Gaspode) Updated Copyright year

### 2.0.1 (2024-01-03)

- (Gaspode) Adapted timeout to new API restrictions

### 2.0.0 (2023-12-02)

- (Gaspode) Breaking Change: Removed support of Closed API

### 1.3.0 (2023-11-22)

- (Gaspode) Support wallbox with Open API
- (Gaspode) Start and stop charging of wallbox with Open API

### 1.2.1 (2023-11-11)

- (Gaspode) Fixed severe error in ClosedAPI

### 1.2.0 (2023-11-10)

- (Gaspode) Added additional realtime attributes for OpenAPI

### 1.1.1 (2023-11-04)

- (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

- (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
- (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

- (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

- (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

- (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
- (Gaspode) Set state quality accordingly to status of data
- (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
- (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

- (Gaspode) Optimized deletion of group states
- (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

- (Gaspode) Read selected statistical data
- (Gaspode) Added Summary data
- (Gaspode) Refactored complete implementation
- (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
- (Gaspode) Remove disabled states at adapter startup
- (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
- (Gaspode) Optimized rounding for selected values
- (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

- (Gaspode) First release for Latest repository
- (Gaspode) Corrected typo in state ID Battery_SOC
- (Gaspode) Implemented improvements as suggested in code review
- (Gaspode) Slow down requests in case of permanent errors
- (Gaspode) Changed adapter type from metering to energy
- (Gaspode) Correction for NPM
- (Gaspode) Enable NPM

### 0.0.5

- (Gaspode) Use meaningful state names
- (Gaspode) Use suitable state roles
- (Gaspode) Added new state for Alpha-ESS settings parameter 'upsReserve'

### 0.0.4

- (Gaspode) use axios to perform Alpha-ESS API calls instead of deprecated request
- (Gaspode) New option "Update unchanged states" added

### 0.0.3

- (Gaspode) refactored API calls, added daily energy values

### 0.0.2

- (Gaspode) corrected api call for realtime data

### 0.0.1

- (Gaspode) initial release

## License

MIT License

Copyright (c) 2025-2026 Gaspode <gaspode69@online.de> (**NO SUPPORT VIA EMAIL**)

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