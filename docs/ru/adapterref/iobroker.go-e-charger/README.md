---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.go-e-charger/README.md
title: ioBroker.go-eCharger
hash: 9PuITMsoXTFS4BOV2w2tpaoS6tl9WVTtDZoW+DmH5Yk=
---
![Логотип](../../../en/adapterref/iobroker.go-e-charger/admin/go-eCharger.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.go-e-charger?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.go-e-charger?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.go-e-charger?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.go-e-charger?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.go-e-charger?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.go-e-charger/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.go-e-charger?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.go-e-charger/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.go-e-charger.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/go-e-charger-stable.svg)
![Установлено](https://iobroker.live/badges/go-e-charger-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.go-e-charger.png?downloads=true)

# IoBroker.go-eCharger
[![CodeQL](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml)

## Версии
## Адаптер ioBroker для настенных зарядных устройств go-e Charger EV
Этот адаптер интегрирует одну или несколько настенных зарядных устройств go-e Charger в вашу систему домашней автоматизации ioBroker. Он циклически опрашивает каждое зарядное устройство через его локальный HTTP API, предоставляет все необходимые данные в соответствии с настройками ioBroker и позволяет управлять зарядкой непосредственно из вашей системы умного дома.

Для получения дополнительной информации об оборудовании go-e Charger посетите веб-сайт производителя: [go-e GmbH](https://go-e.com).

### Функции
- Поддерживает несколько зарядных устройств go-e в рамках одного адаптера.
- Мониторинг состояния автомобиля, мощности зарядки, тока зарядки, фаз сети и статистики энергопотребления.
- **ChargeNOW** – начните зарядку немедленно с настраиваемым током.
- **ChargeManager** – автоматическая зарядка от избытка солнечной энергии: зарядный ток постоянно регулируется в зависимости от доступной солнечной энергии, учитывая потребление электроэнергии в доме и уровень заряда домашней батареи. Зарядку вашего электромобиля можно отложить до тех пор, пока домашняя батарея не достигнет настраиваемого минимального уровня заряда.

> **Примечание:** В настоящее время функция зарядки от избытка солнечной энергии предназначена для управления **одним** зарядным устройством. При одновременном включении ChargeManager на нескольких зарядных устройствах зарядные токи не согласовываются между ними, и расчет избытка солнечной энергии будет давать неверные значения. Вскоре будет доступно расширение с согласованным управлением нагрузкой для нескольких зарядных устройств.

- Переключение между однофазной и трехфазной зарядкой (оборудование 3-го поколения и новее)
- Статистика энергопотребления для каждой RFID-карты (название карты, идентификатор и уровень заряженной энергии)
- Режим только для чтения для каждого настенного зарядного устройства – мониторинг только зарядного устройства без отправки **каких-либо** команд управления (без отпускания заряда, без зарядного тока, без переключения фаз), например, когда зарядка контролируется в другом месте или доступ управляется с помощью RFID-меток.

Протестировано с прошивками V033, V040.0, V041.0, V054.7, V054.11, V055.5, V055.7, V055.8, V56.1, V56.2, V56.8, V56.9, V56.11, V57.0, V57.1, V59.4, V60.0, V60.1, V60.2, V60.5, V60.6 и с параллельным подключением до 3 зарядных устройств.

### Требования
- Для аппаратных устройств 3-го и 4-го поколений необходимо включить "HTTP API v1" в вашем приложении go-e.
- Для переключения фаз дополнительно необходимо включить "HTTP API v2" в вашем приложении go-e (для оборудования 3-го поколения и новее).

## Конфигурация
Добавьте по одной записи для каждого зарядного устройства go-e в список настенных зарядных устройств и укажите его IP-адрес. При желании присвойте каждому зарядному устройству имя.

Включите **режим только для чтения** для зарядного устройства, если адаптер должен только считывать данные и никогда не записывать их. В режиме только для чтения адаптер не отправляет никаких команд управления — ни команды разблокировки заряда, ни команды зарядного тока, ни команды переключения фаз. Состояния ChargeNOW и ChargeManager по-прежнему можно переключать, но они не влияют на работу зарядного устройства в режиме только для чтения. Используйте этот режим, если зарядка данного настенного зарядного устройства контролируется другой системой или управляется локально с помощью RFID-меток.

Длительность цикла опроса определяет, как часто адаптер считывает данные с зарядных устройств и регулирует зарядный ток (минимум 3 секунды, по умолчанию 10 секунд).

### Зарядка излишков солнечной энергии с помощью ChargeManager
ChargeManager вычисляет зарядный ток на основе числовых состояний ioBroker, предоставляемых системой управления энергопотреблением, инвертором, счетчиком или созданным пользователем источником данных. Он не зависит от конкретного производителя, но выбранные состояния должны соответствовать величинам, описанным ниже.

Настройте идентификаторы объектов для следующих состояний:

- доступная в настоящее время солнечная энергия [Вт]
- текущее потребление электроэнергии в доме [Вт]
- Текущий уровень заряда вашей домашней батареи [%]

#### Требования к входным данным
| Входные данные | Ожидаемое значение | Единица измерения | Знак |
| ---------------------------- | ------------------------------ | ---- | -------------------- |
| Солнечная энергия | Общая выработка фотоэлектрической энергии | Вт | Положительная выработка |
| Потребление электроэнергии в домохозяйстве | Общий текущий спрос домохозяйства | Вт | Положительное потребление |
| Состояние заряда домашней батареи | Текущий уровень заряда батареи | % | От 0 до 100 |

Все настроенные состояния должны содержать числовые значения. Значения мощности в кВт необходимо преобразовать в Вт перед их выбором. Состояние импорта/экспорта в сеть нельзя использовать напрямую, поскольку ChargeManager в настоящее время ожидает отдельные значения генерации и потребления.

Если домашняя батарея не установлена, создайте числовое вспомогательное состояние и выберите его в качестве состояния заряда батареи. Установите для этого вспомогательного состояния **то же постоянное значение**, что и для `Settings.Setpoint_HomeBatSoC` (например, `70` для обоих случаев). Это позволит поддерживать смещение батареи на нулевом уровне, поэтому ChargeManager будет заряжать батарею исключительно за счет доступного избытка солнечной энергии.

#### Потребление электроэнергии настенным блоком в единицах домашнего потребления
Включите параметр **Потребление зарядного устройства включается в значение потребления электроэнергии в доме**, когда выбранное состояние потребления электроэнергии в доме увеличивается примерно на мощность зарядки после начала зарядки. В этом случае ChargeManager добавляет измеренную мощность настенного зарядного устройства перед расчетом доступного избытка. Это предотвращает обработку контроллером собственной нагрузки на зарядку как дополнительного потребления электроэнергии в домохозяйстве.

Оставьте эту опцию отключенной, если выбранное состояние уже исключает потребление энергии настенным блоком.

#### Расчет
ChargeManager использует следующий расчет один раз за цикл опроса:

```text
available power =
    solar power
  - home power consumption
  + wallbox power, if it is included in home power consumption
  - grid reserve
  + battery SoC offset

target current = floor(available power / 230 V / active phases)
```

Четыре параметра на стандартной странице конфигурации позволяют настроить этот расчет:

- **Резервная мощность сети** [Вт] (по умолчанию 100) – мощность, которая остается свободной при подключении к сети, а не выделяется автомобилю. Увеличьте ее, чтобы обеспечить больший запас мощности; установите значение «0», чтобы передать весь избыток автомобилю.
- **Максимальный бонус батареи** [Вт] (по умолчанию 2000) – сколько дополнительной энергии, помимо чисто солнечного избытка, может потребляться, пока домашняя батарея находится выше минимального уровня заряда. Бонус равен «0», когда батарея находится точно на минимальном уровне заряда, и линейно возрастает до этого максимума по мере приближения батареи к 100%, поэтому более полная батарея позволяет автомобилю заряжаться быстрее. Установите значение «0», чтобы заряжать автомобиль исключительно за счет измеренного солнечного избытка, не разряжая домашнюю батарею в автомобиле.
- **Минимальный ток ChargeManager** [А] (по умолчанию 6) – избыточный зарядный ток, ниже которого зарядное устройство отключается после небольшой задержки. Это относится только к зарядке избыточного тока от солнечных батарей.
- **Максимальный зарядный ток** [А] (по умолчанию 16, до 32) – максимальный ток, который когда-либо сможет назначить адаптер. Он ограничивает **как** ChargeManager (избыток солнечной энергии), **так и** ChargeNOW.

> **⚠️ Не устанавливайте максимальный зарядный ток выше, чем позволяет ваше зарядное устройство go-e и особенности вашей электропроводки.** Модели зарядных устройств go-e рассчитаны на разные максимальные токи (например, 16 А или 32 А), и фактическое ограничение также зависит от вашего кабеля, вилки и проводки. Установка значения выше номинального значения оборудования/установки может привести к срабатыванию защитных устройств или повреждению оборудования. В случае сомнений, оставьте значение по умолчанию — 16 А.

Ниже значения `Settings.Setpoint_HomeBatSoC` зарядка электромобиля отключается, так что приоритет отдается домашней батарее. Зарядка начинается, как только внутренний целевой ток достигает 10 А (или минимального тока, если он установлен выше). Расчетный ток ограничивается заданным максимальным значением, а внутренний целевой ток изменяется не более чем на 1 А за цикл опроса, чтобы уменьшить резкие изменения.

#### Включение ChargeManager
После запуска адаптера используйте указанные ниже состояния записи. При необходимости замените экземпляр `0` и номер настенного блока `0`.

| Государство | Цель |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `go-e-charger.0.Settings.Setpoint_HomeBatSoC` | Минимальный уровень заряда домашней батареи, при котором допускается избыточная зарядка |
| `go-e-charger.0.Wallbox_0.Settings.ChargeNOW` | Переопределяет ChargeManager и принудительно запускает зарядку |
| `go-e-charger.0.Wallbox_0.Settings.ChargeCurrent` | Текущий тариф, используемый ChargeNOW |
| `go-e-charger.0.Wallbox_0.Settings.Charge3Phase` | Выбирает однофазную или трехфазную зарядку на поддерживаемом оборудовании |
| `go-e-charger.0.Wallbox_0.Settings.Charge3Phase` | Выбирает однофазную или трехфазную зарядку на поддерживаемом оборудовании |

Для зарядки излишков установите `ChargeNOW` в `false` и `ChargeManager` в `true`. Если оба параметра включены, ChargeNOW имеет приоритет и использует настроенный `ChargeCurrent`, не учитывая доступные излишки.

#### Однофазная и трехфазная зарядка
ChargeManager не переключается автоматически между одной и тремя фазами в зависимости от доступного избытка. На оборудовании 3-го поколения и более новых версиях `Charge3Phase` выбирает фазовый режим:

- `false`: однофазная зарядка
- `true`: трехфазная зарядка

Поскольку в текущей реализации зарядка начинается, когда внутренний целевой ток превышает 9 А, эффективная начальная точка составляет 10 А. Это требует приблизительно 2,3 кВт в однофазном режиме или 6,9 кВт в трехфазном режиме после корректировки резерва и батареи. Таким образом, однофазный режим обеспечивает более широкий диапазон работы для небольших фотоэлектрических систем или при переменчивой погоде.

#### Режимы работы
| ChargeNOW | ChargeManager | Результат |
| --------- | ------------- | ------------------------------------------ |
| `false` | `false` | Зарядка отключена |
| `true` | `false` | Принудительная зарядка при `ChargeCurrent` |
| `true` | `true` | ChargeNOW имеет приоритет |
| `true` | `true` | ChargeNOW имеет приоритет |

В режиме только для чтения эти состояния по-прежнему можно изменять, но соответствующая команда управления на зарядное устройство не отправляется.

#### Проверка и устранение неполадок
Прежде чем полагаться на автоматическую зарядку, проверьте выбранные состояния входных сигналов в представлении объекта ioBroker:

1. Ночью выработка солнечной энергии близка к нулю, а днем она соответствует текущей выработке.
2. Потребление электроэнергии в домашних условиях остается положительным и демонстрирует правдоподобную реакцию при включении бытовых электроприборов.
3. Уровень заряда батареи остается в пределах от 0 до 100.
4. Все значения мощности выражены в Вт, а не в кВт.
5. Параметр потребления настенного зарядного устройства зависит от того, включена ли мощность зарядки в выбранное значение потребления электроэнергии в доме.
6. `Wallbox_0.info.connection` имеет значение `true`.
7. `Wallbox_0.Power.Charge`, `Wallbox_0.Power.GridPhases` и, на поддерживаемом оборудовании, `Wallbox_0.Power.EnabledPhases` содержат допустимые значения.

Для начала зарядки может потребоваться несколько циклов опроса, поскольку внутреннее целевое значение увеличивается всего на 1 А за цикл. При стандартном 10-секундном цикле и начальном целевом значении 0 А достижение стандартного начального значения 10 А может занять приблизительно 100 секунд.

В настоящее время ChargeManager предназначен для управления одним зарядным устройством. Включение его для нескольких зарядных устройств одновременно приводит к тому, что каждое зарядное устройство независимо использует один и тот же избыток энергии, что может вызвать некорректное распределение ресурсов.

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде. Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, обратитесь к разделу [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=76GBRV9BX5US8"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.go-e-charger/master/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто в хорошем настроении — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) ChargeManager: grid reserve power and maximum battery bonus are now configurable (defaults 100 W / 2000 W) (#852)
- (hombach) ChargeManager: minimum and maximum surplus charging current are now configurable, with the maximum raised to up to 32 A (#852)
- (hombach) the configurable maximum charging current now caps ChargeNOW as well
- (hombach) admin: moved the ChargeManager settings into their own configuration tab, separate from the standard settings
- (hombach) updated dependencies

### 1.4.1 (2026-08-23)

- (typhosj) refactored the ChargeManager control decision into a deterministic, unit-tested function (#846); behavior unchanged
- (hombach) fixed vulnerabilities
- (hombach) updated dependencies

### 1.4.0 (2026-08-10)

- (hombach) added info.unlockedByRFIDName with the name of the current session's RFID card, in parallel to unlockedByRFIDNo (#634)
- (hombach) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts
- (hombach) projectUtils: fixed min/max/step value of 0 being dropped from number state definitions
- (hombach) updated dependencies

### 1.3.1 (2026-08-06)

- (hombach) fixed "unlocked by RFID" always 0 on gen 3+ chargers: API V2 uses the "trx" key instead of "uby" (#634)
- (hombach) live data is now refreshed every cycle in all modes, so read-only monitoring stays up to date
- (hombach) API V2 not being reachable is now a single warning instead of an error (normal on hardware gen 1/2)
- (typhosj) use generic go-e brand logo as adapter icon (#843)

### 1.3.0 (2026-08-04)

- (hombach) added info.accessControlState (go-e access_state: 0 = open, 1 = RFID/App required, 2 = price/automatic) (#634)
- (hombach) tightened TypeScript types for go-e API response fields (removed any)
- (hombach) updated dependencies

### 1.2.1 (2026-07-31)

- (typhosj) made ChargeManager surplus control more fail-safe: input validation, current clamped to 0-16 A, resilience of state-machine loop (#841)
- (hombach) added support for firmware V60.5 (#800) and V60.6 (#844)
- (typhosj) added ChargeManager PV surplus configuration guide (#842)
- (hombach) corrected no-battery helper-state recommendation for ChargeManager
- (hombach) updated dependencies

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach

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