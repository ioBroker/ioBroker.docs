---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kecontact/README.md
title: Адаптер ioBroker для KEBA KeContact P20 или P30 и настенного бокса BMW i
hash: LjZdhIBc51HwBzjb27or5MaAFejnGQIfGy9+Tgmbfj4=
---
![Логотип адаптера](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![Количество установок](http://iobroker.live/badges/kecontact-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Трэвис](https://img.shields.io/travis/iobroker-community-adapters/ioBroker.kecontact.svg)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.kecontact.svg)

Адаптер # ioBroker для KEBA KeContact P20 или P30 и настенного бокса BMW i
Предоставляет информацию о текущем состоянии настенного бокса KEBA KeContact, используя его протокол UDP.

## Установить
Установите этот адаптер через ioBroker Admin:

1. Откройте диалоговое окно конфигурации экземпляра.
2. Введите IP-адрес своего настенного ПК KEBA KeContact.
3. При необходимости отрегулируйте интервал обновления.
4. Сохраните конфигурацию.
5. Запустите адаптер.

## Конфигурация
### KeContact IP-адрес
Это IP-адрес вашего KEBA KeContact или BMW i wallbox.

### Проверка прошивки
Раз в день адаптер будет проверять, доступна ли более новая прошивка на сайте KEBA. Эта информация будет напечатана в журнале как предупреждение.

### Пассивный режим
Активируйте эту опцию, если вы хотите управлять своим настенным ящиком самостоятельно и не хотите, чтобы этот адаптер выполнял некоторые функции автоматики. В этом случае все последующие опции, касающиеся фотоэлектрической автоматики и ограничения мощности, будут проигнорированы.

### Загрузка сеансов зарядки
Вы можете установить этот флажок, чтобы периодически загружать последние сеансы зарядки (30) из настенной коробки.
ВНИМАНИЕ для пользователей с версии v1.1.1 и ниже: вы должны отметить эту опцию, чтобы по-прежнему получать за сеансы зарядки!

### Интервал обновления
Это интервал в секундах, в течение которого настенный бокс должен запрашивать новые значения зарядки.

Значение по умолчанию - 10 минут, что является хорошим балансом между нагрузкой на KeConnect и наличием актуальной информации в ioBroker.

### Фотоэлектрическая автоматика
Чтобы зарядить свой автомобиль в соответствии с излишком (например, от фотоэлектрической энергии), вы также можете определить состояния, которые представляют излишки, и с учетом основной мощности. Эти значения используются для расчета силы тока, которую можно использовать для зарядки. По дополнительным значениям вы можете определить

* переключите опцию X1, если вы хотите использовать вход X1 от зарядной станции, чтобы контролировать, заряжать ли на полной мощности или с помощью фотоэлектрической автоматической
* минимальная сила тока, отличная от установленной по умолчанию 6 А (требуется только, например, для Renault Zoe)
* значение расчетной мощности, которая может быть использована для начала зарядки (это означает, что зарядка начнется, даже если имеется недостаточный излишек - рекомендуется 0 Вт для 1-фазной зарядки, от 500 Вт до 2000 Вт для 3-фазной зарядки)
* увеличение силы тока (рекомендуется 500 мА)
* значение внимания, которое может быть временно использовано для поддержания сеанса зарядки (это означает, что зарядка будет остановлена позже, даже если достаточный излишек больше не доступен - начальное значение будет добавлено - предлагается 500 Вт)
* минимальная продолжительность сеанса зарядки (даже если излишка больше не хватает, сеанс зарядки продлится как минимум на этот раз - рекомендуется 300 секунд)
* время для продолжения сеанса зарядки каждый раз, когда излишка больше не хватает (чтобы сократить время в пасмурные дни)

### Ограничение мощности
Вы также можете ограничить макс. мощность вашей настенной коробки, чтобы ограничить основную мощность. Например. при использовании обогревателей для ночного хранения вам, возможно, придется соблюдать ограничение максимальной мощности.
Если вы введете значение, ваш настенный бокс будет постоянно ограничен, чтобы не превышать ваш предел мощности.
Для ограничения можно указать до трех состояний счетчиков энергии. Все значения будут добавлены для расчета текущего потребления.
Дополнительный флажок используется для указания, включено ли питание настенного блока (в этом случае мощность настенного блока будет вычтена из значений состояния).

### Динамические параметры
Кроме того, есть несколько состояний, чтобы влиять на поведение фотоэлектрических автоматов на лету, например: с помощью собственного скрипта, обновляющего эти значения в соответствии с вашими потребностями)

* kecontact.0.automatic.photovoltaics - активизирует фотоэлектрические элементы автоматически (true) или будет заряжать автомобиль максимальной мощностью, если установлено значение false
* kecontact.0.automatic.calcPhases - определяет текущее количество фаз, которые будут использоваться для расчета заряда. Это необходимо для версии Keba Deutschland и может использоваться для начального сеанса зарядки для всех зарядных станций.
* kecontact.0.automatic.addPower - определяет количество ватт, разрешенное для зарядки вашего автомобиля (как в опциях)
* kecontact.0.automatic.pauseWallbox - немедленно останавливает каждую сессию зарядки, если установлено значение true
* kecontact.0.automatic.limitCurrent - ограничивает зарядку до указанной силы тока в мА (0 = без ограничений)

Пример: Чтобы зарядить ваш автомобиль постоянной силой тока 6 А независимо от излишка, установите для фотоэлектрических элементов значение false и ограничьте ток до 6000.

## Юридический
Этот проект не связан прямо или косвенно с компанией KEBA AG.

KeConnect является зарегистрированным товарным знаком KEBA AG.

## Changelog

### 1.2.2 (2021-07-28)
* (Sneak-L8) new: limit max. charging current dynamically
* (Sneak-L8) support BMW charging station (Keba OEM, Sentry IOBROKER-KECONTACT-3)
* (Sneak-L8) support P20 charging station (Sentry IOBROKER-KECONTACT-B)
* (Sneak-L8) optimized power calculation for Deutschland edition

### 1.2.1 (2021-07-20)
* (Sneak-L8) support X1 contact of charging station to switch photovoltaics automatic
* (Sneak-L8) prevent a crash case (Sentry IOBROKER-KECONTACT-2)

### 1.2.0 (2021-06-07)
* (Sneak-L8) support for compact mode
* (Sneak-L8) using sentry.io to track errors
* (Sneak-L8) support for KeContact P30 Deutschland edition

### 1.1.3 (2021-04-26)
* (Sneak-L8) new time option to continue charging session with regard
* (Sneak-L8) optimized calculation of surplus (prevent alternating amperage)

### 1.1.2 (2021-04-02)
* (Sneak-L8) default state of photovoltaics automatic set to true for new users
* (Sneak-L8) new option to select whether charging sessions list should be downloaded and be saved in states or not, do so only once an hour
             ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!
* (Sneak-L8) firmware version check
* (Sneak-L8) expanded readme

### 1.1.1 (2021-02-25)
* (Sneak-L8) internal state update prevented recognition of state change

### 1.1.0 (2021-02-20)
* (Sneak-L8) intermediate results saved as states values
* (Sneak-L8) additional power for charging session as state

### 1.0.3 (2021-02-08)
* (Sneak-L8) new options for minimal amerage (e.g. Renault Zoe) and permanent regard value

### 1.0.2
* Added readout of last 30 Charging Sessions from Wallbox; Enabled 'setenergy' State to send and set Charging Goal in Wh to Wallbox

### 1.0.1 (2020-08-20)
* (Sneak-L8) add missing german translation for IP address setting

### 1.0.0 (2020-08-20)
* (UncleSam) change settings layout to material design, first offical version

### 0.3.2 (2020-08-04)
* (Sneak-L8) in PV automatics mode wallbox will be disabled as long as no vehicle is plugged

### 0.3.1 (2020-07-23)
* (Sneak-L8) do not start charging when vehicle is plugged even if current is too low for photovoltaics automation

### 0.3.0 (2020-07-21)
* (Sneak-L8) regulate wallbox by PV automatics independant from state curr user

### 0.2.6 (2020-07-20)
* (Sneak-L8) try again to regulate wallbox by currtime instead of curr as suggested

### 0.2.3 (2020-05-24)
* (Sneak-L8) fix call to display PV automatics after vehicle is plugged, fix object in energy meter states

### 0.2.2 (2020-05-13)
* (Sneak-L8) display information about photovoltaics automatic also at begin of charging
* (Sneak-L8) delayed display of photovoltaics automatic when vehicle is plugged (8 sec)

### 0.2.1 (2019-11-14)
* (Sneak-L8) handle values of undefined in getStates
* (Sneak-L8) better recognition of max power function

### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

## License

Copyright (c) 2020-2021 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.