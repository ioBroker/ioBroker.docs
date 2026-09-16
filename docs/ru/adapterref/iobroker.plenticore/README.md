---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: ixpvz+uoTaL0+muYhwth/HPZINpazJbzirKOxO5f7MQ=
---
![Логотип](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Количество установок](http://iobroker.live/badges/plenticore-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![НПМ](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![Стабильный](http://iobroker.live/badges/plenticore-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [hier zu finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md) .

# ioBroker.plenticore

Адаптер ioBroker для инвертора KOSTAL Plenticore Plus (например, Plenticore Plus 8.5)

Этот адаптер использует внутренний веб-интерфейс инвертора для доступа к свойствам и настройкам вашего инвертора и подключенных устройств (например, батареи или интеллектуального счетчика электроэнергии). Для использования адаптера необходимо, чтобы экземпляр ioBroker был подключен к сети, в которой находится ваш KOSTAL Plenticore.

Этот адаптер НЕ является официальным продуктом KOSTAL и не поддерживается и не одобряется компанией KOSTAL. Это частный проект, находящийся на ранней стадии разработки, поэтому используйте его на свой страх и риск!

## Конфигурация

Укажите IP-адрес вашего инвертора (например, 192.168.0.23) и пароль, который вы используете для подключения к веб-интерфейсу инвертора в качестве владельца установки. Интервал опроса указывается в миллисекундах (например, 10000 — это 10 секунд).

## Адаптер

Адаптер не использует парсинг веб-страниц. Он использует тот же REST API, что и веб-интерфейс. Возможно, существуют (многие) функции, которые (пока) не используются адаптером.

### Почему бы (просто) не использовать Modbus?

Инвертор поддерживает протокол Modbus TCP, поэтому вы можете использовать адаптер Modbus для запроса значений. Однако KOSTAL не позволяет записывать какие-либо адреса Modbus. Поэтому вы не можете установить, например, минимальный уровень заряда батареи с помощью ioBroker.

### Используя адаптер

Адаптер должен заполнять некоторые объекты в дереве объектов plenticore.X. Некоторые из них доступны только для чтения, например, текущая выработка солнечной энергии или потребление электроэнергии в доме. Другие можно изменять, например, минимальный уровень заряда батареи или режимы управления батареей. Я протестировал адаптер на Plenticore Plus 10.

## Объекты

Ниже приведён фрагмент наиболее важных объектов, используемых и заполняемых этим адаптером. Все настройки отмечены значком .`[**]` Должно быть доступно для редактирования, но не все элементы были протестированы, и могут быть ошибки.

### plenticore.X.devices.local

В дереве devices.local содержится информация об инверторе и, возможно, подключенном интеллектуальном счетчике энергии и/или батарее.

`plenticore.X.devices.local.Dc_P` - текущая мощность постоянного тока, включая собственную мощность инвертора. Это значение должно быть близко к значению`plenticore.X.devices.local.ac.P` (примерно +30-40 Вт)\
`plenticore.X.devices.local.Pv_P` - Текущая вырабатываемая фотоэлектрическая энергия. Это значение рассчитывается адаптером путем суммирования значений pvx.P.\
`plenticore.X.devices.local.Home_P` - общее текущее потребление электроэнергии в доме\
`plenticore.X.devices.local.HomeBat_P` - текущая мощность электросети, обеспечиваемая батареей.\
`plenticore.X.devices.local.HomePv_P` - текущая электроэнергия, вырабатываемая электростанцией непосредственно в жилых домах.\
`plenticore.X.devices.local.HomeGrid_P` - текущая мощность электроснабжения дома, обеспечиваемая электросетью.\
`plenticore.X.devices.local.ToGrid_P` - Текущая мощность, передаваемая в сеть. Это значение рассчитывается адаптером и может быть не на 100% точным.\
`plenticore.X.devices.local.LimitEvuAbs` - Расчетный предельный ток мощности, которая может покидать преобразователь. Если электростанция вырабатывает больше энергии, она будет потеряна.\
`plenticore.X.devices.local.StateKey0` — Если это так, значит, функция управления батареей инвертора разблокирована.

#### plenticore.X.devices.local.ac

На этом канале содержится информация о стороне переменного тока инвертора. Наиболее важные сведения:\
`plenticore.X.devices.local.ac.Frequency` - частота сети\
`plenticore.X.devices.local.ac.L1_P` - текущая мощность фазы 1 в Вт\
`plenticore.X.devices.local.ac.L2_P` - текущая мощность фазы 2 в Вт\
`plenticore.X.devices.local.ac.L3_P` - текущая мощность фазы 3 в Вт\
`plenticore.X.devices.local.ac.P` - текущая суммарная мощность, излучаемая инвертором, включая мощность разряда батареи.

#### plenticore.X.devices.local.battery

`plenticore.X.devices.local.battery.Cycles`- количество циклов зарядки/разрядки батареи за весь срок службы на данный момент\
`[**] plenticore.X.devices.local.battery.DynamicSoc` - true, если включен динамический SoC (только если`SmartBatteryControl` (Это тоже правда)\
`[**] plenticore.X.devices.local.battery.MinHomeConsumption` - минимальное потребление электроэнергии в домашних условиях, необходимое для работы батареи.\
`[**] plenticore.X.devices.local.battery.MinSoc` - желаемый минимальный уровень заряда батареи (SoC). Фактический уровень заряда может быть ниже этого значения при недостатке солнечной энергии.\
`plenticore.X.devices.local.battery.MinSocDummy` — Это значение устанавливается адаптером, если управление MinSoC отключено в конфигурации. Оно показывает, до какого значения будет установлен MinSoC.\
`plenticore.X.devices.local.battery.P` - Текущий уровень заряда батареи (отрицательный, если заряжается, положительный, если разряжается).\
`plenticore.X.devices.local.battery.Charge_P` - Текущая мощность зарядки аккумулятора (0, если происходит разрядка)\
`plenticore.X.devices.local.battery.Discharge_P` - Текущая мощность разряда батареи (0, если идет зарядка)\
`[**] plenticore.X.devices.local.battery.SmartBatteryControl` — Верно, если включено интеллектуальное управление батареей. Согласно официальному руководству, эта функция должна быть включена только в том случае, если нет дополнительного источника переменного тока, например, второго инвертора.\
`[**] plenticore.X.devices.local.battery.ExternControl` - Настроить можно только через веб-интерфейс установщика. Для управления через ioBroker используйте состояния ExternControl\_DcPowerAbs и ExternControl\_MaxChargePowerAbs, при этом для ExternControl установлено значение 2 (Modbus TCP).`[**] plenticore.X.devices.local.battery.ExternControl_DcPowerAbs` - ОПАСНО: Используйте это только если вы знаете, что делаете, неправильное использование может повредить вашу батарею! ВАЖНО: Значение необходимо обновлять каждые 3 минуты, иначе Plenticore переключится на внутреннее управление, если не получит новое значение. Это состояние доступно только в том случае, если ExternControl установлено на 2 (Modbus TCP). Значение указывается в ваттах и может быть установлено в диапазоне от -10000 до 10000. Отрицательное значение означает, что батарея разряжается, положительное значение означает, что батарея заряжается.`[**] plenticore.X.devices.local.battery.ExternControl_MaxChargePowerAbs` - ОПАСНО: Используйте это только если вы знаете, что делаете, неправильное использование может повредить вашу батарею! ВАЖНО: Значение необходимо обновлять каждые 3 минуты, иначе Plenticore переключится на внутреннее управление, если не получит новое значение. Это состояние доступно только в том случае, если ExternControl установлено на 2 (Modbus TCP).`plenticore.X.devices.local.battery.SoC` - текущий уровень заряда батареи

#### plenticore.X.devices.local.inverter

`plenticore.X.devices.local.inverter.MaxApparentPower` - максимальная мощность, которую может обеспечить инвертор.

#### plenticore.X.devices.local.pv1 / pv2 / pv3

`plenticore.X.devices.local.pvX.P` - текущая мощность, обеспечиваемая фазой X электростанции.

### plenticore.X.scb

Этот канал содержит информацию и настройки самого устройства.

#### plenticore.X.scb.modbus

`[**] plenticore.X.scb.modbus.ModbusEnable` - true, если протокол Modbus TCP включен.\
`[**] plenticore.X.scb.modbus.ModbusUnitId` - Идентификатор устройства Modbus

#### plenticore.X.scb.network

`[**] plenticore.X.scb.network.Hostname` - текущее имя хоста инвертора\
`[**] plenticore.X.scb.network.IPv4Auto` - Используйте DHCP для предоставления IP-адресов инвертору.\
`[**] plenticore.X.scb.network.IPv4Address` - текущий IP-адрес инвертора\
`[**] plenticore.X.scb.network.IPv4DNS1` и`plenticore.X.scb.network.IPv4DNS2` - используемые в данный момент DNS-серверы\
`[**] plenticore.X.scb.network.IPv4Gateway` - используемый в данный момент сетевой шлюз\
`[**] plenticore.X.scb.network.IPv4Subnetmask` - маска подсети

#### plenticore.X.scb.time

`[**] plenticore.X.scb.time.NTPservers` - используемые в данный момент серверы времени (NTP). Их может быть несколько, разделенных пробелом.\
`[**] plenticore.X.scb.time.NTPuse` - Используйте NTP для установки текущего времени на устройстве.\
`[**] plenticore.X.scb.time.Timezone` - часовой пояс устройства

### plenticore.X.scb.statistic.EnergyFlow

В этом разделе представлены статистические данные, отображаемые в веб-интерфейсе Plenticore. Следуя только указанным ниже данным,`Day` Указаны определенные точки данных, но каждая из них также доступна для`Month` ,`Year` и`Total` .

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay`- автаркия в процентах на сегодняшний день\
`plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - расчетное количество сэкономленных CO2 в кг на текущий день\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - общее потребление электроэнергии домохозяйством в Вт·ч за текущий день\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomePvDay` - общее потребление электроэнергии домохозяйством, обеспечиваемое солнечной электростанцией за текущий день.\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - общее потребление энергии домохозяйством, обеспечиваемое батареей за текущий день.\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - общее потребление электроэнергии домохозяйством, обеспечиваемое электросетью за текущий день.\
`plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - общая мощность, переданная в электросеть за текущий день.\
`plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - собственный расход электроэнергии (выработанная электростанция, НЕ поступающая в сеть) за текущий день.\
`plenticore.0.scb.statistic.EnergyFlow.YieldDay` - общий урожай растения за текущий день

## Прогнозные данные

Для работы функции прогнозирования погоды используются различные источники метеорологических данных. Она работает «из коробки», но вы можете улучшить результаты, добавив экземпляры одного или нескольких следующих погодных адаптеров: ioBroker.darksky, ioBroker.weatherunderground, ioBroker.daswetter. Для работы функции необходимо настроить глобальное географическое положение системы (долготу и широту) и задать расширенную конфигурацию адаптера Plenticore (данные о панели и батарее, если применимо).

### Как работает прогноз погоды?

Функция прогнозирования использует предоставленные данные вашей электростанции и батареи для расчета максимально возможной мощности, вырабатываемой в любое время суток. Это делается с помощью определения местоположения системы, высоты и азимута солнца, а также для расчета значений солнечной радиации. Эти значения объединяются с данными прогноза погоды из различных источников для получения прогноза облачности, тумана и дождя на каждый час суток. Используя эти данные, адаптер рассчитывает возможную мощность, которую электростанция может выработать за каждый час солнечного света.

Полученные прогнозные значения затем можно использовать для установки минимального уровня заряда батареи (MinSoC), включения или выключения динамического «интеллектуального управления батареей» преобразователя (оба действия выполняются внутри адаптера) или для управления другими устройствами в доме, например, отоплением, стиральной машиной, сушилкой, посудомоечной машиной и т. д. (это делается с помощью внешнего JavaScript/Blockly пользователя).

### plenticore.0.forecast.consumption

`plenticore.0.forecast.consumption.day` - Среднее текущее потребление электроэнергии в дневное время за последние 3 дня\
`plenticore.0.forecast.consumption.night` - Среднее текущее потребление электроэнергии в ночное время за последние 3 дня\
`plenticore.0.forecast.consumption.remaining` - расчетное оставшееся потребление электроэнергии на текущий прогнозируемый день до захода солнца

### plenticore.0.forecast.current

`plenticore.0.forecast.current.power.generated` - выработанная электроэнергия электростанции за текущий день до текущего времени\
`plenticore.0.forecast.current.power.max` - Расчетная максимальная мощность электростанции при ясном небе (0% облачности)\
`plenticore.0.forecast.current.power.sky` - Расчет мощности электростанции с учетом текущей облачности, полученный с помощью метеорологических адаптеров.\
`plenticore.0.forecast.current.power.skyvis` - Расчет мощности электростанции с учетом текущей облачности и видимости, обеспечиваемой метеорологическими адаптерами.\
`plenticore.0.forecast.current.power.skyvisrain` - Расчет мощности электростанции с учетом текущей облачности, видимости и прогноза осадков, полученного с помощью метеорологических адаптеров.\
`plenticore.0.forecast.current.visibility.*` - текущий прогноз видимости, предоставленный соответствующим метеорологическим адаптером.\
`plenticore.0.forecast.current.rain.*` - текущий прогноз осадков, предоставленный соответствующим погодным адаптером.\
`plenticore.0.forecast.current.rainChance.*` - Текущий прогноз вероятности дождя, предоставленный соответствующим метеорологическим адаптером.\
`plenticore.0.forecast.current.sky.*` - Текущий прогноз облачности, предоставленный соответствующим погодным адаптером.\
`plenticore.0.forecast.current.sky_high.*` - Текущий прогноз облачности (верхние слои атмосферы), предоставляемый соответствующим метеорологическим адаптером.\
`plenticore.0.forecast.current.sky_medium.*` - Текущий прогноз облачности (средние слои атмосферы), предоставляемый соответствующим метеорологическим адаптером.\
`plenticore.0.forecast.current.sky_low.*` - Текущий прогноз облачности (нижние слои атмосферы), предоставляемый соответствующим метеорологическим адаптером.\
`plenticore.0.forecast.current.sun.azimuth` - текущее положение солнца (азимут)\
`plenticore.0.forecast.current.sun.elevation` - текущее положение солнца (высота над горизонтом)

### plenticore.0.forecast.day1 – то же самое относится и ко второму дню.

`plenticore.0.forecast.day1.power.date`- дата, для которой относится информация о текущем прогнозе потребления электроэнергии\
`plenticore.0.forecast.day1.power.day` - Прогноз общей мощности на день\
`plenticore.0.forecast.day1.power.day_adjusted` - Прогноз общей мощности на день с учетом выработанной мощности на данный момент и использованием прогнозных данных только для оставшихся солнечных часов.\
`plenticore.0.forecast.day1.power.day_high` - Прогноз общей мощности на день без учета данных о видимости, полученных с помощью метеорологического адаптера.\
`plenticore.0.forecast.day1.power.remaining` - оставшаяся мощность прогнозируемого суммарного показателя на день, рассчитанная на основе прогноза оставшихся солнечных часов.\
`plenticore.0.forecast.day1.power.Xh.power` - расчетная суммарная мощность, вырабатываемая электростанцией в час восхода солнца X прогнозируемого дня, где 1h — час восхода солнца.\
`plenticore.0.forecast.day1.power.Xh.power_high` - расчетная суммарная мощность, вырабатываемая электростанцией в час X солнечного дня, но без учета данных о видимости и осадках.\
`plenticore.0.forecast.day1.power.Xh.time` - время восхода солнца`plenticore.0.forecast.power.Xh.power` начинается\
`plenticore.0.forecast.day1.sun.sunrise` - время восхода солнца в прогнозируемую дату\
`plenticore.0.forecast.day1.sun.sunset` - время захода солнца в прогнозируемую дату

## Интеллектуальное управление батареей

Интеллектуальная система управления батареей KOSTAL не использует прогноз погоды. Поэтому она не всегда обеспечивает оптимальное управление, с одной стороны, для полной зарядки батареи, а с другой — для минимизации ограничений на подачу электроэнергии в сеть. Данный адаптер пытается оптимизировать этот процесс. Для этого предлагаются две стратегии, которые можно выбрать в настройках адаптера. Если интеллектуальная система управления батареей KOSTAL активна, она определяет, когда и сколько электроэнергии поступает в сеть или в батарею. Адаптер может только определять, активна ли интеллектуальная система управления KOSTAL, но не как она работает.

### Стратегия 1: Двойной прогноз погоды на сутки в зависимости от емкости аккумулятора.

Краткое описание: Включите интеллектуальное управление KOSTAL, если (достигнут минимальный уровень заряда батареи) И (оставшаяся мощность до захода солнца - оставшееся потребление - свободная емкость батареи) >= 2 \* емкость батареи.

### Стратегия 2: Оставшийся прогнозируемый уровень потребления и свободная емкость аккумулятора.

Система интеллектуального управления KOSTAL активируется только в том случае, если (согласно прогнозу) выполняются оба следующих условия:

- Как минимум в течение одного часа превышается лимит подачи электроэнергии (в противном случае интеллектуальное управление не требуется, поскольку вся электроэнергия может подаваться в сеть).
- Предположительно, в течение дня доступно больше электроэнергии, чем необходимо для потребления и зарядки аккумулятора (иначе место в аккумуляторе оставалось бы свободным в течение всего дня даже без интеллектуального управления). Фактическое управление несколько сложнее, поскольку оно также предотвращает многократное включение/выключение интеллектуального управления.

Подробности:

- Если все почасовые прогнозные значения ниже «Максимального уровня сигнала», управление KOSTAL не активируется. Максимальный уровень сигнала принимается на 15% ниже, чтобы учесть колебания, вызванные облачностью.
- В период с 15:00 до восхода солнца настройки интеллектуального управления KOSTAL не меняются. Управление KOSTAL, по-видимому, работает лучше, если его не включать/выключать без необходимости. В этот период управление KOSTAL не имеет недостатков.
- Гистерезис используется для уменьшения частоты включения/выключения. Он выключается, когда текущий уровень заряда батареи меньше «минимального уровня заряда для активации управления батареей» или когда свободная энергия ниже 0. Он включается, когда текущий уровень заряда батареи превышает «минимальный уровень заряда для активации управления батареей» + 1, а свободная энергия превышает 10% от емкости батареи.

## Пожертвовать

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=SFLJ8HCW9T698\&source=url)

## Changelog

### 2.3.1
- Added further option to control battery management [PastCoder]

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

-   Resolved adapter check issues, see https://github.com/pixcept/ioBroker.plenticore/issues/1
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