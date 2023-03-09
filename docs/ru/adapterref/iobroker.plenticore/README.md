---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: uArP6UMVgzTXm8IFmUFIA9RvTSRbxw8eeM0r7Y/lhpk=
---
![Логотип](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Количество установок](http://iobroker.live/badges/plenticore-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![НПМ](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![Стабильный](http://iobroker.live/badges/plenticore-stable.svg)
![версия NPM](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [hier zu finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md).

# IoBroker.plenticore
Адаптер ioBroker для инвертора KOSTAL Plenticore Plus (например, Plenticore Plus 8.5)

Этот адаптер использует внутренний веб-интерфейс инвертора для доступа к свойствам и настройкам вашего инвертора и подключенных устройств (например, аккумулятора или интеллектуального счетчика энергии). Чтобы использовать адаптер, вам нужно, чтобы экземпляр ioBroker был подключен к сети, в которой находится ваш KOSTAL Plenticore.

Этот адаптер НЕ является официальным продуктом KOSTAL, не поддерживается и не одобряется KOSTAL. Это частный проект, который все еще находится на ранней стадии разработки, поэтому используйте его на свой страх и риск!

## Конфигурация
Установите IP-адрес вашего инвертора (например, 192.168.0.23) и ваш пароль, который вы используете для подключения в качестве владельца установки к веб-интерфейсу инвертора. Интервал опроса указывается в миллисекундах (т. е. 10000 — это 10 секунд).

## Адаптер
Адаптер не использует скриншоты. Он использует тот же REST API, что и веб-интерфейс. Может быть (множество) функций, которые (пока) не используются адаптером.

### Почему бы (просто) не использовать Modbus?
В инверторе включен протокол Modbus TCP, поэтому вы можете использовать адаптер Modbus для запроса значений. Однако KOTAL не разрешил записывать ни один из адресов Modbus. Таким образом, вы не можете установить e. г. минимальная батарея SoC с использованием ioBroker.

### Использование адаптера
Адаптер должен заполнить некоторые объекты в дереве объектов lenticore.X. Некоторые из них доступны только для чтения, например. г. текущая выходная мощность PV или домашняя потребляемая мощность. Другие изменчивы, т.е. г. минимальный SoC батареи или режимы управления батареей. Я тестировал адаптер на Plenticore Plus 10.

## Объекты
Ниже приводится выдержка из наиболее важных объектов, используемых и заполняемых этим адаптером. Все настройки, отмеченные `[**]`, должны быть редактируемыми, но не все из них были протестированы, и в них могут быть ошибки.

### Pleticore.X.devices.local
Дерево devices.local содержит информацию об инверторе и, возможно, подключенном интеллектуальном счетчике электроэнергии и/или аккумуляторе.

`plenticore.X.devices.local.Dc_P` - текущая мощность постоянного тока, включая собственную мощность инвертора. Это значение должно быть близко к значению `plenticore.X.devices.local.ac.P` (около +30-40 Вт) `plenticore.X.devices.local.Pv_P` - текущая генерируемая фотоэлектрическая мощность. Это значение рассчитывается адаптером путем суммирования значений pvx.P.
`plenticore.X.devices.local.Home_P` - текущая общая потребляемая мощность дома `plenticore.X.devices.local.HomeBat_P` - текущая домашняя мощность, обеспечиваемая аккумулятором `plenticore.X.devices.local.HomePv_P` - текущая домашняя мощность, непосредственно обеспечиваемая станцией `plenticore.X.devices.local.HomeGrid_P` - текущий дом мощность, предоставляемая сетью `plenticore.X.devices.local.ToGrid_P` - текущая мощность, отправляемая в сеть. Это значение рассчитывается адаптером и может быть неточным на 100 %.
`plenticore.X.devices.local.LimitEvuAbs` - расчетный текущий предел мощности, которая может уйти из преобразователя. если завод вырабатывает больше энергии, она будет потеряна.
`plenticore.X.devices.local.StateKey0` - если true, управление батареями инвертора разблокировано.

#### Pleticore.X.devices.local.ac
Этот канал содержит информацию о стороне переменного тока инвертора. Наиболее важными являются: `plenticore.X.devices.local.ac.Frequency` - частота сети `plenticore.X.devices.local.ac.L1_P` - текущая мощность фазы 1 в Вт `plenticore.X.devices.local.ac.L2_P` - текущая мощность фазы 2 в Вт `plenticore.X.devices.local.ac.L3_P` - текущая мощность фазы 3 в Вт `plenticore.X.devices.local.ac.P` - текущая общая мощность, излучаемая инвертором, включая разряд батареи

#### Pleticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` – срок службы батареи истекает до настоящего момента. `[**] plenticore.X.devices.local.battery.DynamicSoc` – значение true, если включена динамическая SoC (только если также верно значение `SmartBatteryControl`). `[**] plenticore.X.devices.local.battery.MinHomeConsumption` – минимальное энергопотребление дома, которое требуется для использования батареи `[**] plenticore.X.devices.local.battery.MinSoc` - желаемый минимальный SoC (состояние заряда) батареи. Фактический SoC может быть ниже этого, если не хватает солнечной энергии.
`plenticore.X.devices.local.battery.MinSocDummy` — это значение устанавливается адаптером, если управление MinSoC отключено в конфиге. Это должно показать, какое значение будет установлено MinSoC.
`plenticore.X.devices.local.battery.P` - текущая мощность батареи (отрицательная при зарядке, положительная при разрядке) `plenticore.X.devices.local.battery.Charge_P` - текущая мощность зарядки батареи (0 при разрядке) `plenticore.X.devices.local.battery.Discharge_P` - текущая мощность разряда батареи (0 при зарядке ) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` — true, если включено интеллектуальное управление батареями. Что касается официального руководства, это должно быть включено только в том случае, если нет другого источника переменного тока, такого как второй задействованный инвертор. `[**] plenticore.X.devices.local.battery.ExternControl` — Можно установить только через веб-интерфейс в качестве установщика. Для управления через ioBroker используйте состояния ExternControl_DcPowerAbs и ExternControl_MaxChargePowerAbs, при этом ExternControl установлен на 2 (Modbus TCP).
`[**] plenticore.X.devices.local.battery.ExternControl_DcPowerAbs` - ОПАСНОСТЬ: Используйте это, только если вы знаете, что делаете, неправильное использование может привести к повреждению аккумулятора! ВАЖНО: Значение должно обновляться каждые 3 минуты, в противном случае plenticore переключается на внутренний контроль, если не получит новое значение. Это состояние доступно, только если для ExternControl установлено значение 2 (Modbus TCP). Значение указывается в ваттах и может быть установлено от -10000 до 10000. Отрицательное значение означает, что батарея разряжается, положительное значение означает, что батарея заряжается.
`[**] plenticore.X.devices.local.battery.ExternControl_MaxChargePowerAbs` - ОПАСНОСТЬ: Используйте это только в том случае, если вы знаете, что делаете, неправильное использование может привести к повреждению аккумулятора! ВАЖНО: Значение должно обновляться каждые 3 минуты, в противном случае plenticore переключается на внутренний контроль, если не получит новое значение. Это состояние доступно, только если для ExternControl установлено значение 2 (Modbus TCP).
`plenticore.X.devices.local.battery.SoC` - текущее состояние заряда аккумулятора

#### Pleticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - максимальная мощность, которую может обеспечить инвертор

#### Pleticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P` - текущая мощность, которая обеспечивается фазой X станции

### Pleticore.X.scb
Этот канал содержит информацию и настройки самого устройства

#### Pleticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` — true, если протокол Modbus TCP включен. `[**] plenticore.X.scb.modbus.ModbusUnitId` — идентификатор модуля Modbus устройства.

#### Pleticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` — текущее имя хоста инвертора `[**] plenticore.X.scb.network.IPv4Auto` — используйте DHCP для предоставления настроек IP-адреса для инвертора `[**] plenticore.X.scb.network.IPv4Address` — текущий IP-адрес инвертора `[**] plenticore.X.scb.network.IPv4DNS1` и § §SSSSS_4§§ — используемые в данный момент DNS-серверы `[**] plenticore.X.scb.network.IPv4Gateway` — используемый в настоящее время сетевой шлюз `[**] plenticore.X.scb.network.IPv4Subnetmask` — маска подсети сети

#### Pleticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - используемые в данный момент серверы времени (NTP). Их может быть несколько, разделенных пробелом.
`[**] plenticore.X.scb.time.NTPuse` — используйте NTP для установки текущих настроек времени устройства `[**] plenticore.X.scb.time.Timezone` — часовой пояс устройства

### Pleticore.X.scb.statistic.EnergyFlow
Точки данных в этом разделе содержат статистику, которая отображается в веб-интерфейсе Plenticore. Далее упоминаются только точки данных `Day`, но каждая из них также доступна для `Month`, `Year` и `Total`.

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - автаркия в процентах за текущий день `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - расчетная экономия CO2 в кг за текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - общее домашнее потребление в Втч за текущий день §§SSSSS_3§ § - общее бытовое потребление, обеспечиваемое фотоэлектрической установкой за текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - общее бытовое потребление, обеспечиваемое аккумулятором за текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - общее бытовое потребление, обеспечиваемое электросетью за текущий день текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - общая мощность, отданная в сеть за текущий день `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - норма собственного потребления (выработанная электростанция НЕ отданная в сеть) за текущий день `plenticore.0.scb.statistic.EnergyFlow.YieldDay` - общая выработка завода за текущий день

## Данные прогноза
Для питания функции прогноза используются различные источники данных о погоде. Он работает «из коробки», но вы можете улучшить результаты, добавив экземпляры одного или нескольких следующих адаптеров погоды: ioBroker.darksky, ioBroker.weatherunderground, ioBroker.daswetter. Чтобы эта функция работала, вам необходимо настроить глобальное географическое положение системы (долготу и широту) и установить расширенную конфигурацию адаптера plenticore (данные панели и батареи, если применимо).

### Как работает прогноз
Функция прогноза использует предоставленные данные вашей электростанции и батареи для расчета максимально возможной мощности, вырабатываемой в каждое время суток. Это делается путем использования местоположения системы для получения высоты и азимута солнца и расчета значений солнечной радиации. Эти значения объединяются с данными прогноза погоды из разных источников, чтобы получить прогноз облачности, тумана и дождя на каждый час дня. Используя эти данные, адаптер вычисляет возможную мощность, которую растение может генерировать за каждый солнечный свет.

Затем прогнозируемые значения можно использовать для установки MinSoC батареи, включения или выключения динамического «интеллектуального управления батареями» преобразователя (оба выполняются внутри адаптера) или для управления другими устройствами в домашнем хозяйстве, например. г. отопление, стиральная машина, сушилка, посудомоечная машина и т. д. (выполняется внешним JavaScript/Blockly пользователя).

### Pleticore.0.прогноз.потребления
`plenticore.0.forecast.consumption.day` - текущее среднее дневное энергопотребление за последние 3 дня `plenticore.0.forecast.consumption.night` - текущее среднее энергопотребление в ночное время за последние 3 дня `plenticore.0.forecast.consumption.remaining` - расчетное оставшееся энергопотребление на текущий прогнозируемый день до захода солнца

### Pleticore.0.forecast.current
`plenticore.0.forecast.current.power.generated` - выработанная мощность станции в текущий день до текущего времени `plenticore.0.forecast.current.power.max` - расчетная максимальная мощность станции при ясном небе (0% облачности) `plenticore.0.forecast.current.power.sky` - расчетная мощность станции с учетом текущей облачности от погодные адаптеры `plenticore.0.forecast.current.power.skyvis` - расчетная мощность установки с учетом текущей облачности и видимости от погодных адаптеров `plenticore.0.forecast.current.power.skyvisrain` - расчетная мощность установки с учетом текущей облачности, видимости и прогноза дождя от погодных адаптеров `plenticore.0.forecast.current.visibility.*` - текущий прогноз видимости, предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.rain.*` - текущий прогноз дождя, предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.rainChance.*` - текущий прогноз вероятности дождя, предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.sky.*` - текущий прогноз облачности предоставляемый соответствующим адаптером погоды `plenticore.0.forecast.current.sky_high.*` - текущий прогноз облачности (верхние слои атмосферы) предоставляемый соответствующим адаптером погоды лет), предоставляемый соответствующим адаптером погоды `plenticore.0.forecast.current.sky_low.*` - текущий прогноз облачности (нижние слои воздуха), предоставляемый соответствующим адаптером погоды `plenticore.0.forecast.current.sun.azimuth` - текущее положение солнца (азимут) `plenticore.0.forecast.current.sun.elevation` - текущее положение солнца ( высота)

### Pleticore.0.forecast.day1 – то же самое относится и ко дню2
`plenticore.0.forecast.day1.power.date` - дата получения информации о текущем прогнозе мощности `plenticore.0.forecast.day1.power.day` - прогноз общей мощности на день `plenticore.0.forecast.day1.power.day_adjusted` - прогноз общей мощности на день с учетом выработанной мощности до настоящего момента и с использованием данных прогноза только для оставшихся солнечных часов `plenticore.0.forecast.day1.power.day_high` - прогноз общей мощности на день без учета данных о видимости метеоадаптера `plenticore.0.forecast.day1.power.remaining` - прогноз общей оставшейся мощности на день на основе прогноза оставшихся солнечных часов `plenticore.0.forecast.day1.power.Xh.power` - расчетная общая мощность станции в солнечный час X прогнозируемого дня, где 1h - час восхода солнца `plenticore.0.forecast.day1.power.Xh.power_high` - расчетная общая мощность станции в солнечный час X прогнозируемого дня, но без учета видимости или данные о дожде `plenticore.0.forecast.day1.power.Xh.time` - время начала солнечного часа для `plenticore.0.forecast.power.Xh.power` `plenticore.0.forecast.day1.sun.sunrise` - время восхода солнца прогнозируемой даты `plenticore.0.forecast.day1.sun.sunset` - время заката прогнозируемой даты

## Умное управление батареей
Умное управление аккумулятором от KOSTAL не использует прогноз погоды. Следовательно, не всегда удается идеально контролировать, с одной стороны, чтобы батарея была полностью заряжена, а с другой стороны, чтобы максимально избежать ограничения подачи.
Этот адаптер пытается оптимизировать это. Для этого предлагается две стратегии, которые можно выбрать в настройках адаптера.
Если интеллектуальное управление батареями от KOSTAL активно, оно решает, когда и сколько электроэнергии уходит в сеть или в батарею. Адаптер может только решить, активен ли интеллектуальный контроль KOSTAL, но не как он работает.

### Стратегия 1: Прогноз на два дня в сравнении с емкостью батареи
Краткое описание: Включите KOSTAL Smart Management, если (достигнут минимум SoC) И (остаточная мощность до захода солнца - оставшееся потребление - свободная емкость батареи) >= 2 * емкость батареи.

### Стратегия 2: оставшийся прогноз по сравнению с потреблением и свободной емкостью батареи
KOSTAL Smart Management активируется только в том случае, если (согласно прогнозу) выполняются оба следующих условия:

- Существует по крайней мере один час, в течение которого превышен лимит подачи (иначе вам не нужно Smart Management, потому что все может быть отправлено в сеть).
- Электроэнергии предположительно больше, чем необходимо в течение дня для потребления в течение дня и для зарядки аккумулятора (иначе место в аккумуляторе было бы свободно в течение дня даже без Умного управления)

Фактическое управление немного сложнее, поскольку оно также предотвращает многократное включение/выключение интеллектуального управления.

Подробности:

- Если все значения почасового прогноза ниже, чем «Максимальная подача», управление KOSTAL не активируется. Предполагается, что максимальная подача на 15% ниже, чтобы предвидеть изменения, вызванные облачностью.
- Между 15:00 и восходе солнца, настройка интеллектуального управления KOSTAL не изменяется. Управление KOSTAL работает лучше, если его не включать/выключать без необходимости часто. В этот период система управления KOSTAL не имеет недостатков.
- Гистерезис используется для более редкого включения/выключения. Он выключится, когда текущий SoC меньше «Минимального SoC для активации управления батареей» или когда свободная мощность ниже 0. Он включится, когда текущий SoC больше «Минимального SoC для активации управления батареей» +1 а свободная мощность превышает 10% емкости аккумулятора.

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.3.0
- (Jey Cee) Added possibility to control battery charging

### 2.2.2
- Added alternative smart battery strategy (Description see above) [PastCoder]

### 2.2.1
- Fixed forecast zickzack [PastCoder]

### 2.2.0
- Fixed state value types for new version of js-controller  
  Warning: Please delete state object scb.export.LastExportOk after update and restart adapter
- Allow providing a custom port for connection to converter
- Allow using https connection to converter
- Fixed some state object types

### 2.1.9
- Fixed met.no rain forecast value

### 2.1.8
- Update of met.no API to locationforecast 2.0
- Removed xml2js library
- Update of base library

### 2.1.7
- Updated base library to support js controller 3.2

### 2.1.6
- Copyright year updated

### 2.1.5
- Package information fixed

### 2.1.4
- Disable smart battery control as long as SoC is lower than MinSoC + 8% to avoid using grid power on consumption peaks
- Disable darksky usage (service discontinued)

### 2.1.3
-   Fixed wrong hour of weather forecast from daswetter adapter

### 2.1.2
-   Added setting for minimum SoC to enable battery management

### 2.1.1
-   Fixed problems in config and translations

### 2.1.0
-   Added further forecast sources to provide better power forecasts
-   Added second day forecast
-   Improved code and fixed some minor issues
-   New dependency for xml2js
-   Updated readme

### 2.0.0

-   Code rework
-   Outsourced many functions to libraries
-   This version has new dependencies and requires a newer adapter-core version!
-   Several fixes

### 1.1.1

-   No changes

### 1.1.0

-   Added support for weatherunderground weather adapter. The adapter can be choosen as alternative forecast source over the DarkSky adapter.

### 1.0.2

-   Fixed a warning message occuring far too often

### 1.0.1

-   Added forecast features to readme

### 1.0.0

-	Added power forecast feature

### 0.1.5

-   Added translations
-   Fixed shadow management handling.

### 0.1.4

-   Added shadow management datapoint.

### 0.1.3

-   Do not query battery values if battery management is not unlocked.

### 0.1.2

-   Resolved adapter check issues, see https://github.com/StrathCole/ioBroker.plenticore/issues/1
-   Added statistics data points.

### 0.1.1

-   Removed admin adapter dependency

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2022 Marius Burkard

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