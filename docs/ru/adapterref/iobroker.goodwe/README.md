---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.goodwe/README.md
title: ioBroker.goodwe
hash: FYcQ9wobDD5kVjFDFSP8CmBTxNtGqNGVRjWI3bcqAOI=
---
![Логотип](../../../en/adapterref/iobroker.goodwe/admin/goodwe.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.goodwe.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.goodwe.svg)
![Количество установок](https://iobroker.live/badges/goodwe-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/goodwe-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.goodwe.png?downloads=true)
![Тестирование и выпуск](https://github.com/typhosj/ioBroker.goodwe/workflows/Test%20and%20Release/badge.svg)

# ioBroker.goodwe

## адаптер goodwe для ioBroker

Взаимодействие с инверторами GoodWe серий ET/EH/BH/BT

Производитель: [GoodWe](https://www.goodwe.com/)

Данный адаптер создан на основе оригинальной работы Томаса Шёнбергера.

## Требования

- Node.js 22 или более поздняя версия
- js-controller 6.0.11 или новее
- admin 7.8.23 или новее

## Поддерживаемые данные

Адаптер считывает блоки регистров протокола GoodWe EMS Modbus версии 1.7 для устройств ET/EH/BH/BT:

- Информация об устройстве, включая дополнительный SIMCCID.
- Текущие данные
- Внешняя связь и расширенные данные счетчика
- Срочная информация
- Информация о системе управления зданием (BMS) и подробная информация о системе управления зданием (BMS).
- Информация об автоматическом тестировании CEI
- Информация об ограничении мощности
- Настройки батареи и системы управления энергопотреблением (EMS), включая ограничение экспорта в сеть и режим работы EMS.

Исходные значения регистров хранятся в виде состояний ioBroker. Значения режимов представляют собой числовые состояния с метками перечисления ioBroker. Важные битовые поля также отображаются в виде декодированных текстовых состояний, например, ошибки активного инвертора, диагностическое состояние, аварийные сигналы BMS и состояние DRM.

## Важные штаты

| Государственный район                                                                            | Описание                                                                                                                                |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `DeviceInfo.*`                                                                                   | Протокол инвертора, номинальная мощность, серийный номер, тип устройства и данные прошивки.                                             |
| `RunningData.PV1.*`... `RunningData.PV4.*`                                                       | Напряжение, ток, мощность и режим работы фотоэлектрической системы.                                                                     |
| `RunningData.GridL1.*`... `RunningData.GridL3.*`                                                 | Напряжение, ток, частота и мощность сети                                                                                                |
| `RunningData.BackUpL1.*`... `RunningData.BackUpL3.*`                                             | Резервное выходное напряжение, ток, частота, мощность и режим работы                                                                    |
| `RunningData.Battery1.*`                                                                         | Напряжение, ток, мощность и режим работы батареи.                                                                                       |
| `RunningData.*Energy*`                                                                           | Суточные и суммарные счетчики энергии                                                                                                   |
| `RunningData.*Mode`, `RunningData.GridMode`, `RunningData.WorkMode`, `RunningData.OperationMode` | Числовые состояния режимов с метками перечисления ioBroker                                                                              |
| `RunningData.ErrorMessageActive`                                                                 | Биты ошибок активного инвертора в текстовом формате                                                                                     |
| `RunningData.DiagStatusActive`                                                                   | Активные диагностические биты в виде текста, декодированные из `RunningData.DiagStatusL`                                                |
| `RunningData.DiagStatusH`                                                                        | Основной показатель диагностического статуса, хранящийся в виде исходного числа, поскольку протокол GoodWe не определяет для него биты. |
| `ExtComData.*`                                                                                   | Данные интеллектуальных счетчиков и связи                                                                                               |
| `BMSInfo.*`                                                                                      | Состояние BMS, SOC, SOH, данные об ошибках и предупреждениях.                                                                           |
| `BMSInfo.ErrorCodeActive`                                                                        | Расшифрованное битовое поле сигнала тревоги BMS                                                                                         |
| `BMSInfo.WarningCodeActive`, `BMSInfo.DRMStatusActive`                                           | Расшифровка битовых полей предупреждений BMS и DRM при включении расширенного опроса BMS.                                               |
| `FlashInfo.*`                                                                                    | Информация о версии флэш-памяти и количестве записей, если эта функция включена и поддерживается инвертором.                            |
| `BMSDetail.*`                                                                                    | Подробные значения параметров системы управления батареей (BMS), если эта функция включена и поддерживается инвертором.                 |
| `CEIAutoTest.*`                                                                                  | Значения автоматического тестирования CEI, если они поддерживаются инвертором.                                                          |
| `PowerLimit.*`                                                                                   | Значения ограничения мощности и параметров диспетчеризации, если они включены и поддерживаются инвертором.                              |
| `Settings.Battery.*`                                                                             | Емкость батареи, количество модулей, пределы заряда и разряда, а также глубина разряда.                                                 |
| `Settings.GridExportEnabled`, `Settings.GridExportLimit`                                         | Переключатель и значение ограничения экспорта из сети                                                                                   |
| `Settings.EmsMode`, `Settings.EmsPowerLimit`                                                     | Режим EMS и мощность, с которой работает режим EMS.                                                                                     |

## Конфигурация

- `ipAddr`: IP-адрес инвертора. Пусто при новых установках. Адаптер проверяет его как доступный IPv4-адрес хоста при запуске.
- `discoverySubnet`: Необязательный `/24` подсеть для обнаружения сети, например `192.168.178.0/24`.
- `pollCycle`: Секунды между двумя считываниями данных в реальном времени (`RunningData`, `ExtComData`, `BMSInfo`) и настройки (`Settings.*`), от 2 до 3600. Другие необязательные группы регистров не следуют этому циклу: они используют один общий слот, который обслуживается по круговой схеме примерно каждые 30 секунд, и `DeviceInfo` Считывается один раз за каждое соединение.
- `timeoutMs`: Время ожидания UDP-запроса в миллисекундах, от 1000 до 30000.
- `retries` Количество повторных попыток для каждого UDP-запроса, от 0 до 5.
- `pollExtended` Главный переключатель для дополнительных групп регистров. `DeviceInfo`, `RunningData`, `ExtComData` и `BMSInfo` их всегда читают.
- `pollSimccid`: Включает дополнительный опрос SIMCCID.
- `pollExtendedMeter`: Включает расширенные регистры счетчиков.
- `pollFlashInfo`: Включает регистры информации флэш-памяти.
- `pollBmsExtended`: Включает расширенные регистры информации системы управления зданием (BMS).
- `pollBmsDetail`: Включает регистры с подробными данными системы управления зданием (BMS), если это поддерживается инвертором.
- `pollCeiAutoTest`: Включает регистры автоматического тестирования CEI.
- `pollPowerLimit` Включает регистры ограничения мощности, если они поддерживаются инвертором.
- `pollSettings`: Включает регистры настроек батареи и EMS.
- `enableControl`: Делает состояния экспорта EMS и сети доступными для записи (см. ниже). По умолчанию отключено.

На странице основных настроек также доступны вспомогательные средства обнаружения:

- `Inverter IP`: Сохраняет только IPv4-адрес инвертора.
- `Validate inverter IP` Проверяет настроенный адрес и отправляет запрос GoodWe ID на UDP-порт 8899.
- `Discover inverters`: Сканирует настроенные `/24` Отображает информацию о найденных инверторах в подсети для устройств GoodWe на UDP-порту 8899, включая IP-адрес, название модели, серийный номер и версию (если она предоставлена самим инвертором).

## Управление инвертором

С `enableControl` При включении четыре состояния становятся доступными для записи и передаются инвертору в виде операций записи в один регистр. Все остальные состояния остаются доступными только для чтения.

| Состояние                    | Регистрация | Диапазон   | Описание                                                                    |
| ---------------------------- | ----------- | ---------- | --------------------------------------------------------------------------- |
| `Settings.GridExportEnabled` | 47509       | 0-1        | Включает или выключает ограничение экспорта электроэнергии из сети.         |
| `Settings.GridExportLimit`   | 47510       | 0-30000 Вт | Максимальная мощность, подаваемая в сеть.                                   |
| `Settings.EmsMode`           | 47511       | 1-12       | Режим EMS, например: 1 — авто, 11 — зарядка батареи, 12 — разрядка батареи. |
| `Settings.EmsPowerLimit`     | 47512       | 0-30000 Вт | Питание, выбираемое в режиме EMS, работает с                                |

`GridExportLimit` и `EmsPowerLimit` Запрещает значения, выходящие за пределы допустимого диапазона. `GridExportEnabled` и `EmsMode` Это регистры перечислений, принимающие только значения, перечисленные выше; значение, выходящее за рамки этого списка, отклоняется, а не помещается в режим, который никто не запрашивал. Например, числа, записанные в виде обычного десятичного текста. `"500"` Из поля ввода принимаются и `GridExportEnabled` также принимает `true` и `false` Любое другое значение отклоняется. Состояния представляют собой числа, поэтому ioBroker записывает текст и логические значения в информационную строку в журнале адаптера, который их записал. После отклонения значения и после каждой записи группа регистров считывается обратно, поэтому состояния показывают, что инвертор действительно сохранил.

Запись данных, когда инвертор отключен, отклоняется без отправки каких-либо данных, поскольку каждый запрос будет только ждать истечения тайм-аута. Первый опрос после переподключения возвращает значение, хранящееся в инверторе, в состояние.

Перед записью адаптер считывает группу регистров и пропускает запись, если инвертор уже хранит значение. Таким образом, скрипт, повторяющий одно и то же заданное значение в каждом цикле, не отправляет запрос на запись в регистр каждый раз.

Переключение `enableControl` Функция «включено» поддерживает опрос регистров настроек EMS даже при включении. `pollSettings` или `pollExtended` Отключено, потому что состояния, допускающие запись, должны существовать и быть считаны обратно. В отличие от других необязательных групп, неудачная попытка чтения этой группы не приостанавливает её на час; она повторяется в следующем цикле опроса.

Настройки считываются при каждом цикле опроса, поэтому изменения, внесенные в другом месте, например, в приложении GoodWe, отображаются в штатах в течение одного цикла опроса. `pollCycle`.

Компания GoodWe не документирует свои регистры, доступные для записи. Управление по умолчанию отключено, и его включение осуществляется на ваш собственный риск: неправильное значение изменяет настройки инвертора, которые адаптер не сможет восстановить. Оставьте его выключенным, если вам нужно только считывать данные.

## Поиск неисправностей

Дополнительные группы регистров зависят от модели инвертора, прошивки и подключенного оборудования. Если группа не поддерживается, адаптер приостанавливает ее на час после неудачного считывания и поддерживает основное соединение в режиме онлайн. Переподключение после потери соединения завершает паузу, поэтому группа, которая не считывалась только из-за отключения инвертора, считывается снова немедленно.

Известные группы, зависящие от модели:

- `pollBmsDetail` Часто не поддерживается, если система управления зданием (BMS) не предоставляет доступ к регистрам с подробной информацией.
- `pollPowerLimit` Часто не поддерживается на устройствах, которые не предоставляют телеметрию ограничения мощности.
- `pollCeiAutoTest`: может предоставлять значения для устройств/прошивки, поддерживающих данные автоматического тестирования CEI.

Если в журналах отображаются тайм-ауты необязательных регистров, отключите соответствующую группу в расширенных настройках. Отключенные состояния необязательных регистров удаляются при запуске адаптера.

При нестабильном сетевом соединении, оставьте `timeoutMs` низко и поднять `retries` Вместо этого инвертор отвечает на корректный запрос в течение миллисекунд, поэтому длительный тайм-аут не приводит к получению потерянного пакета — он лишь блокирует очередь запросов до истечения срока её действия. Значение около 2000 с двумя повторными попытками позволяет восстановить потерянный ответ за две секунды вместо ожидания десятисекундного тайм-аута.

Повторяющийся `retry` Сообщения на уровне отладки означают, что отдельные ответы UDP теряются. Чем больше группа регистров, тем чаще она затрагивается, поэтому такая группа, как... `RunningData` Сначала появляется сигнал. Если они появляются в одну и ту же секунду каждой минуты, значит, что-то вне адаптера периодически занято на инверторе — обычно это загрузка данных из облака в модуль Wi-Fi. Пока нет `timed out` После предупреждения запрос был восстановлен, и данные не были потеряны. Подключение инвертора к локальной сети вместо Wi-Fi устраняет причину; отключение дополнительных групп регистров уменьшает количество возможных запросов.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-09-14)
- Added the battery settings (registers 45350-45358) and the EMS settings (registers 47509-47512) as new `Settings.*` states, enabled with the new `pollSettings` option and read on every poll cycle.
- Added optional inverter control: with the new `enableControl` option the states `Settings.EmsMode`, `Settings.EmsPowerLimit`, `Settings.GridExportEnabled` and `Settings.GridExportLimit` become writable and are sent to the inverter as single register writes. Only these four registers are ever written: limit values are clamped to the range the adapter allows, mode values outside the list in this README are refused, numbers written as text are accepted, a write while the inverter is offline is refused, a value the inverter already holds is not written again, and the register group is read back after every write. While control is on, the EMS settings stay polled whatever `pollSettings` and `pollExtended` say. Control is off by default.
- Fixed optional register groups pausing for an hour after a connection loss. A group whose read failed only because the inverter was gone is read again right after the reconnect, and a poll cycle whose live data got no answer stops there instead of running the remaining reads into their timeouts as well.
- Fixed UDP answers being discarded when the inverter pads them into a larger datagram (the 257 byte running data frame arrives in 1024 bytes). The frame check read the checksum from the end of the datagram, so every padded answer ran into a timeout and a retry. On a live inverter the running data retries dropped from 1.57 % to 0.46 %.
- The network discovery scans at most four subnets, starting with the one of the configured inverter address. Container bridges and VPN adapters no longer turn a scan into thousands of probes.
- A register the inverter rejects is reported as a Modbus exception right away instead of running into the full timeout of every retry.
- Reworked the poll cycle to cut the UDP traffic to the inverter. `pollCycle` now means the interval of the live data (`RunningData`, `ExtComData`, `BMSInfo`) and accepts values from 2 seconds, where it started at 10 before. The optional register groups other than the settings no longer run all at once every cycle but share one slot that is served round robin roughly every 30 seconds, and the static `DeviceInfo` is read once per connection instead of every cycle. With the default settings this is 32 register requests per minute instead of 54, and every request that is not sent is one whose answer cannot get lost. The small `BMSInfo` read now goes first in every cycle, because the first request after the idle gap loses the most answers.

### 1.1.3 (2026-08-28)
- Fixed the adapter crashing with `Cannot read properties of undefined (reading 'debug')`: the logger is now read when it is used instead of being captured before the adapter assigned it.
- Fixed the adapter staying offline after a single lost UDP answer. The socket is rebound after a timeout, so a late answer can no longer be mistaken for the answer of the next register group.
- The first failed reconnect is logged as a warning again, so an adapter that turned yellow no longer stays silent.

### 1.1.2 (2026-08-27)
- Fixed unsigned 32 bit registers being reported as negative values (for example `RunningData.DiagStatusL` and `RunningData.ErrorMessage`).
- Boolean options are normalized at adapter start, so a string typed switch no longer disables an optional register group and deletes its states.
- Discarded late UDP answers after a timeout; they could be parsed as the answer of the next register group with the same length.
- Blocked state writes after `onUnload()` and moved the last direct state write out of the scheduler.
- Added an exponential backoff for reconnect attempts while the inverter is offline and reduced the repeated warnings to debug.
- Clamped probe timeouts coming from admin messages.
- Enabled TypeScript `strict` mode.

### 1.1.1 (2026-07-16)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- Migrated the admin configuration page to a React based UI and removed the legacy Materialize UI files.
- Added translations for the admin configuration page and documented numeric setting limits.
- Avoided rebuilding the admin bundle during GitHub installs.
- Excluded `CHANGELOG_OLD.md` from the npm package.

### 1.1.0 (2026-06-24)
* Migrated the adapter runtime to TypeScript
* Raised the minimum Node.js version to 22
* Switched the packaged adapter entry point to the compiled `build/main.js`
* Updated CI to run on Node.js 22 and 24 and verify the npm package contents
* Replaced additional mode `*Text` states with enum labels on the numeric mode states

## License
MIT License

Copyright (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>  
Copyright (c) 2025-2026 typhosj <typhosj@gmx.de>

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