---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.goodwe/README.md
title: ioBroker.goodwe
hash: /Po4GEOVH/rzHvbBKetrxMElMBoTB6lSL7FxVMei9nY=
---
![Логотип](../../../en/adapterref/iobroker.goodwe/admin/goodwe.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.goodwe.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.goodwe.svg)
![Количество установок](https://iobroker.live/badges/goodwe-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/goodwe-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.goodwe.png?downloads=true)

# IoBroker.goodwe
**Тесты:** ![Тестирование и выпуск](https://github.com/typhosj/ioBroker.goodwe/workflows/Test%20and%20Release/badge.svg)

## Адаптер goodwe для ioBroker
Взаимодействие с инверторами GoodWe серий ET/EH/BH/BT

Производитель: [GoodWe](https://www.goodwe.com/)

Данный адаптер создан на основе оригинальной работы Томаса Шёнбергера.

## Требования
* Node.js 22 или новее
* js-controller 6.0.11 или новее
* admin 7.8.23 или новее

## Поддерживаемые данные
Адаптер считывает блоки регистров протокола GoodWe EMS Modbus версии 1.7 для устройств ET/EH/BH/BT:

* Информация об устройстве, включая дополнительный SIMCCID
* Текущие данные
* Внешняя связь и расширенные данные счетчика
* Информация о вспышке
* Информация о системе управления зданием (BMS) и подробная информация о системе управления зданием (BMS)
* Информация об автоматическом тестировании CEI
* Информация об ограничении мощности

Исходные значения регистров хранятся в виде состояний ioBroker. Значения режимов представляют собой числовые состояния с метками перечисления ioBroker. Важные битовые поля также отображаются в виде декодированных текстовых состояний, например, ошибки активного инвертора, диагностическое состояние, аварийные сигналы BMS и состояние DRM.

## Важные штаты
| Территория штата | Описание |
| --- | --- |
| `DeviceInfo.*` | Протокол инвертора, номинальная мощность, серийный номер, тип устройства и данные прошивки |
| `RunningData.GridL1.*` ... `RunningData.GridL3.*` | Напряжение, ток, частота и мощность сети |
| `RunningData.BackUpL1.*` ... `RunningData.BackUpL3.*` | Резервное выходное напряжение, ток, частота, мощность и режим работы |
| `RunningData.Battery1.*` | Напряжение, ток, мощность и режим работы батареи |
| `RunningData.*Energy*` | Счетчики суточной и общей потребляемой энергии |
| `RunningData.*Mode`, `RunningData.GridMode`, `RunningData.WorkMode`, `RunningData.OperationMode` | Числовые состояния режима с метками перечисления ioBroker |
| `RunningData.ErrorMessageActive` | Биты ошибок активного инвертора в текстовом формате |
| `RunningData.DiagStatusActive` | Активные диагностические биты в виде текста, декодированные из `RunningData.DiagStatusL` |
| `RunningData.DiagStatusH` | Старшее слово диагностического статуса, сохраняется в виде необработанного числа, поскольку протокол GoodWe не определяет для него биты |
| `ExtComData.*` | Данные интеллектуального счетчика и связи |
| `BMSInfo.*` | Состояние BMS, SOC, SOH, данные об ошибках и предупреждениях |
| `BMSInfo.ErrorCodeActive` | Декодированное битовое поле тревоги BMS |
| `BMSInfo.WarningCodeActive`, `BMSInfo.DRMStatusActive` | Декодированные битовые поля предупреждений BMS и DRM при включенном расширенном опросе BMS |
| `FlashInfo.*` | Информация о версии флэш-памяти и количестве записей, если эта функция включена и поддерживается инвертором |
| `BMSDetail.*` | Подробные значения BMS, если она включена и поддерживается инвертором |
| `CEIAutoTest.*` | Значения автоматического теста CEI, если поддерживается инвертором |
| `PowerLimit.*` | Значения ограничения мощности и диспетчеризации, если они включены и поддерживаются инвертором |
| `PowerLimit.*` | Значения ограничения мощности и диспетчеризации, если они включены и поддерживаются инвертором |

## Конфигурация
* `ipAddr`: IP-адрес инвертора.

При чистой установке значение отсутствует. Адаптер проверяет его как пригодный для использования IPv4-адрес хоста при запуске.

* `discoverySubnet`: Необязательная подсеть `/24` для обнаружения сети, например `192.168.178.0/24`.
* `pollCycle`: Базовый цикл опроса в секундах.
* `timeoutMs`: Время ожидания UDP-запроса в миллисекундах, от 1000 до 30000.
* `retries`: Количество повторных попыток для каждого UDP-запроса, от 0 до 5.
* `pollExtended`: Главный переключатель для необязательных групп регистров.
* `pollSimccid`: Включает необязательный опрос SIMCCID.
* `pollExtendedMeter`: Включает расширенные регистры счетчиков.
* `pollFlashInfo`: Включает регистры информации о флэш-памяти.
* `pollBmsExtended`: Включает расширенные регистры информации BMS.
* `pollBmsDetail`: Включает регистры с подробной информацией о системе управления зданием (BMS), если это поддерживается инвертором.
* `pollCeiAutoTest`: Включает регистры автоматического тестирования CEI.
* `pollPowerLimit`: Включает регистры ограничения мощности, если это поддерживается инвертором.

На странице основных настроек также доступны вспомогательные средства обнаружения:

* `IP-адрес инвертора`: хранит только IPv4-адрес инвертора.
* `Проверка IP-адреса инвертора`: Проверяет настроенный адрес и отправляет запрос идентификатора GoodWe на UDP-порт 8899.
* `Обнаружение инверторов`: Сканирует настроенную подсеть `/24` на наличие устройств GoodWe через UDP-порт 8899 и отображает найденные инверторы с IP-адресом, названием модели, серийным номером и информацией о версии, если она предоставлена самим инвертором.

## Поиск неисправностей
Дополнительные группы регистров зависят от модели инвертора, прошивки и подключенного оборудования. Если группа не поддерживается, адаптер пропускает её после истечения тайм-аута и поддерживает основное соединение в режиме онлайн.

Известные группы, зависящие от модели:

* `pollBmsDetail`: часто не поддерживается, если BMS не предоставляет доступ к регистрам с подробной информацией.
* `pollPowerLimit`: часто не поддерживается на устройствах, которые не предоставляют телеметрию ограничения мощности.
* `pollCeiAutoTest`: может предоставлять значения для устройств/прошивок, поддерживающих данные автоматического тестирования CEI.

Если в журналах отображаются тайм-ауты необязательных регистров, отключите соответствующую группу в расширенных настройках. Отключенные состояния необязательных регистров удаляются при запуске адаптера.

При нестабильном сетевом соединении сначала увеличьте `timeoutMs`. Увеличивайте `retries` только в том случае, если инвертор периодически пропускает пакеты, поскольку повторные попытки также увеличивают продолжительность одного цикла опроса.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

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

### 1.0.9 (2026-06-23)
* Added validation for usable IPv4 inverter addresses
* Added GoodWe UDP reachability check from the admin configuration
* Added `/24` network discovery for GoodWe inverters via UDP port 8899
* Added discovered inverter selection in the IP address field with model and serial information

### 1.0.8 (2026-06-23)
* Added separate basic and advanced configuration tabs
* Added per-group optional register polling defaults based on real device feedback
* Removed legacy misspelled states and added startup cleanup for them
* Cleaned up legacy hard-coded decoder code in favor of the register map
* Finalized selected state units and roles
* Expanded README with state overview and troubleshooting

### 1.0.7 (2026-06-23)
* Hardened UDP communication with async request handling, timeout and retry support
* Added specification based register map and extended GoodWe register groups
* Added decoded status and bitfield states for inverter, BMS, DRM and diagnostics
* Added adapter options for request timeout, retries and per-group extended register polling
* Added optional cleanup for disabled extended register states
* Added register-map and status-decoding tests

### 1.0.6 (2025-04-02)
* (ty) updated dependencies
* (ty) extended logging

### 1.0.5 (2025-03-14)
* (ty) Fixed EnergyDayDischarge
* (mrx8) fixed memory leak

[Older changelogs can be found there](CHANGELOG_OLD.md)

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