---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ocpp.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ocpp.svg
BADGE-Number of Installations: https://iobroker.live/badges/ocpp-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/ocpp-stable.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/ocpp/svg-badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ocpp.png?downloads=true
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.ocpp/workflows/Test%20and%20Release/badge.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ocpp/README.md
title: ioBroker.ocpp
hash: NnF+Qh5v3eELziD7PONBBjJpIgUVlptG2G1oQfdO6HI=
---
![Логотип](../../../en/admin/ocpp.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ocpp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ocpp.svg)
![Количество установок](https://iobroker.live/badges/ocpp-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/ocpp-stable.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/ocpp/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.ocpp.png?downloads=true)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.ocpp/workflows/Test%20and%20Release/badge.svg)

# IoBroker.ocpp
## Отказ от ответственности
Разработчики данного модуля никоим образом не поддерживают Open Charge Alliance и не связаны с ней, а также с какими-либо ее дочерними компаниями, логотипами или товарными знаками.

## OCPP-адаптер для ioBroker
Адаптер для подключения и управления настенными зарядными устройствами и зарядными станциями для электромобилей, совместимыми с протоколом OCPP 1.6-J, через локальный WebSocket-сервер.

## Документация
- 🇺🇸 [Документация](/#/adapters/ocpp)
- 🇩🇪 [Документация](https://github.com/iobroker-community-adapters/ioBroker.ocpp/blob/main/docs/de/README.md)

## Конфигурация
- **Порт сервера:** TCP-порт, на котором прослушивает сервер OCPP WebSocket (по умолчанию: `9220`). Настройте свой Wallbox для подключения к `ws://<iobroker-ip>:9220/<ChargePointId>`.
- **Удалить начальную косую черту (`/`) из идентификаторов зарядных станций (`stripLeadingSlash`):** Включите эту опцию для новых установок или совместимости с Node-RED, чтобы объекты устройств создавались как `ocpp.0.EVB-P123456` вместо `ocpp.0./EVB-P123456` (или `ocpp.0.http://192_168_178_80:9220/EVB-P123456` для зарядных устройств, отправляющих абсолютный URL-адрес во время рукопожатия WebSocket). Оставьте отключенной, чтобы сохранить существующие идентификаторы объектов.
- **Аутентификация:** Во время установления соединения WebSocket требуется необязательная базовая HTTP-аутентификация (имя пользователя и пароль).

## Интеллектуальная зарядка и зарядка избыточной солнечной энергии
- **Требования и совместимость с настенным адаптером:**
- Для динамического ограничения зарядки с помощью `chargeLimit` требуется, чтобы настенное зарядное устройство поддерживало дополнительный профиль функции OCPP 1.6 **SmartCharging** (поддерживается большинством современных настенных зарядных устройств, таких как EVBox, ABL, Alfen, Easee, Heidelberg, Mennekes, Webasto и др.).
- При подключении адаптер проверяет `SupportedFeatureProfiles` настенной зарядной станции. Если `SmartCharging` не поддерживается прошивкой настенной зарядной станции, состояния `chargeLimit` автоматически опускаются во избежание путаницы. (Для таких настенных зарядных станций ограничения заряда часто можно настроить с помощью аппаратных/производительских ключей в `configuration.<key>`, например, `evb_MaximumStationCurrent` на EVBox).
- **Динамическое управление во время активной зарядки:**
- Изменение параметра `chargeLimit` во время активной зарядки транспортного средства отправляет запрос OCPP `SetChargingProfile` с параметром `chargingProfilePurpose: 'TxProfile'`, нацеленный непосредственно на активный `transactionId`.
- Блок питания модулирует коэффициент заполнения ШИМ на выводе управляющего пилотного сигнала типа 2 (CP) в реальном времени (например, 10% для 6 А, ~26,7% для 16 А) без размыкания контакторов или прерывания сеанса.
- В соответствии со стандартом IEC 61851, бортовое зарядное устройство автомобиля (OBC) регулирует силу зарядного тока в течение 1-5 секунд.
- **Сброс лимитов (`null`):**
- Установка `chargeLimit` в значение `null` (или `0`) отправляет команду `ClearChargingProfile` на зарядную станцию для снятия всех активных ограничений.
- **Альтернативный вариант конфигурации от поставщика (`configuration.evb_MaximumStationCurrent` в EVBox):**
- Хотя `chargeLimit` является универсальным стандартом OCPP для всех производителей, интеллектуальные настенные приставки часто предоставляют ключи конфигурации, специфичные для конкретного производителя, такие как `configuration.evb_MaximumStationCurrent` (EVBox Elvi/BusinessLine).
- **Почему этот ключ часто предпочитают использовать на станциях EVBox:**
1. **Энергонезависимое сохранение данных:** Значения записываются во внутреннюю энергонезависимую память станции (EEPROM/Flash). Даже после отключения электроэнергии, перезагрузки настенного блока или перезапуска сервера станция безопасно сохраняет заданный максимальный предел тока.
2. **Более высокое разрешение (деци-амперы):** Многие настенные зарядные устройства обрабатывают это значение в деци-амперах (дА): например, `65` (6,5 А), `72` (7,2 А) или `80` (8,0 А). Это позволяет осуществлять сверхплавное отслеживание избытка солнечной энергии с шагом ~100-200 Вт, а не с шагом 1 А (~690 Вт в трехфазном режиме).
3. **Бесшовная динамическая регулировка:** При нажатии этой клавиши система немедленно реагирует сообщением «Принято»; станция обновляет свой ШИМ-сигнал в течение 1-3 секунд в режиме реального времени, не требуя перезагрузки и не прерывая активную зарядку.
- **Рекомендуемая единица измерения (`chargeLimitType`):**
Настоятельно рекомендуется оставлять параметр `chargeLimitType` в значении `A` (амперы).

> **Примечание о минимальном токе согласно IEC 61851:** В соответствии со стандартами зарядки электромобилей (IEC 61851), для стандартной зарядки переменным током требуется минимальный ток **6 А**.
> > - Минимум для 1 фазы: ~1380 Вт (230 В x 6 А) > - Минимум для 3 фаз: ~4140 Вт (3 x 230 В x 6 А) > > Если `chargeLimitType` установлено на `W` со значениями ниже этих пределов (например, 1000 Вт), результирующий ток падает ниже 6 А, что может привести к тому, что настенные зарядные устройства отклонят профиль или прервут зарядку.

## Благодарности
Создание этого адаптера было бы невозможно без замечательной работы @foxriver76 (https://github.com/foxriver76), который разрабатывал предыдущие версии этого адаптера.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (meistermopper) add Weblate translation status badge

### 1.0.0 (2026-11-09)
* (meistermopper) fix repochecker findings: nogit, info.connection role, and unused deps (#117)
* (meistermopper) align workflow concurrency and timer wrappers with repochecker (#121)
* (meistermopper) fix TxProfile schedule kind and add ClearChargingProfile on null chargeLimit

### 1.0.0-alpha.4 (2026-11-09)
* (meistermopper) migrate to ESLint 9 and @iobroker/eslint-config (#33)
* (meistermopper) replace legacy `@ampeco/ocpp-eliftech` with native TypeScript OCPP 1.6J server
* (meistermopper) fix SmartCharging removal when `GetConfigurationMaxKeys` truncates response (#65)
* (meistermopper) use `TxProfile` for `RemoteStartTransaction` and track `transactionId` (#24, #65)
* (meistermopper) prevent zombie sockets on reconnect (#20) and serialize outgoing OCPP commands
* (meistermopper) support `DiagnosticsStatusNotification` and `FirmwareStatusNotification` (#32)
* (meistermopper) add `stripLeadingSlash` option and responsive `jsonConfig` with i18n (#30, #60)

### 1.0.0-alpha.3 (2026-11-08)
- (mcm1957) Adapter has been migrated to iobroker-communities organisation
- (copilot) Adapter requires js-controller >= 7.2.5 now
- (copilot) Adapter requires admin >= 8.3.5 now
- (copilot) Adapter requires Node.js >= 22.19.0 now
- (mcm1957) Dependencies have been updated

### 0.12.5 (2023-02-09)
* (foxriver76) revert changes of 0.12.4

### 0.12.3 (2023-02-07)
* (foxriver76) allow deactivating `numberPhases` by setting `null

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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