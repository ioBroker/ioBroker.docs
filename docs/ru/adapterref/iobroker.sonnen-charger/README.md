---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-зарядное устройство
hash: 3S9zsY2VTfXcDFiF/YYwzuECoDTkYfp1ZS5+3WIDrlY=
---
![Логотип](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![Количество установок](https://iobroker.live/badges/sonnen-charger-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/sonnen-charger-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)

# IoBroker.sonnen-зарядное устройство
**Тесты:** ![Тестирование и выпуск](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

##sonnen-адаптер зарядного устройства для ioBroker
Этот адаптер интегрирует ваш sonnenCharger в ioBroker. Дополнительную информацию о sonnenCharger можно найти на странице [веб-страница поставщиков](https://sonnen.de/ladestation-elektroauto/).

## Конфигурация
После того, как вы создали экземпляр апдейтера, вам необходимо настроить несколько параметров:

|Имя параметра|Описание|По умолчанию|
|:---|:---|:---|
|IP-адрес|IP-адрес sonnenCharger|-|
|Порт|Порт Modbus-интерфейса sonnenCharger|502|
|Интервал запроса|Интервал получения данных в секундах (ValueRage 30 - 3600) |30|
|Разрешить доступ для записи в sonnenCharger|**ЭКСПЕРИМЕНТАЛЬНАЯ** будьте осторожны при записи данных в sonnenCharger|false|

## Использование
### Канал: информация
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|соединение|Устройство или служба подключены|логическое значение|-|R|-|

### Канал: Настройки зарядного устройства
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|serialNumber|Серийный номер|строка||R||
|модель|Модель|строка||R||
|hwVersion|Версия оборудования|строка||R||
|swVersion|Версия программного обеспечения|строка||R||
|numberOfConnectors|Количество соединителей|целое число||R||

### Канал: chargeSettings.connector.\<номер\>
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|connectorType|Тип соединителя|строка||R||
|numberOfPhases|Число фаз|целое||R||
|l1ConnectedToPhase|L1 подключен к фазе|целое число||R||
|l2ConnectedToPhase|L2 подключен к фазе|целое число||R||
|l3ConnectedToPhase|L3 подключен к фазе|целое число||R||
|customMaxCurrent|Пользовательский максимальный ток|float|A|R||

### Канал: измерения.\<номер\>
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|connectorStatus|Идентификатор состояния соединителя|целое число||R||
|connectorStatusLabel|Метка состояния соединителя|строка||R|0 : Неизвестно<br> 1: СокетДоступен<br> 2: ОжиданиеForVehicleToBeConnected<br> 3: Ожидание запуска транспортного средства<br> 4: Зарядка<br> 5: ЗарядкаPausedByEv<br> 6: ЗарядкаPausedByEvse<br> 7: Зарядка завершена<br> 8: Ошибка зарядки<br> 9: Возобновление зарядки<br> 10: Недоступно|
|measuredVehicleNumberOfPhases|Измеренное количество фаз автомобиля id|целое число||R||
|measuredVehicleNumberOfPhasesLabel|Измеренная метка количества фаз автомобиля|string||R||
|evMaxPhaseCurrent|Макс. фазный ток EV|float|A|R||
|targetCurrentFromPowerMgm|Заданный ток от Power mgm или Modbus|float|A|R||
|частота|Частота|float|Гц|R||
|напряжениеL1|Напряжение L-N (L1)|float|V|R||
|напряжениеL2|Напряжение L-N (L2)|float|V|R||
|напряжениеL3|Напряжение L-N (L3)|float|V|R||
|текущийL1|Текущий (L1)|float|A|R||
|текущийL2|Текущий (L2)|float|A|R||
|текущийL3|Текущий (L3)|float|A|R||
|activePowerL1|Активная мощность (L1)|float|кВт|R||
|activePowerL2|Активная мощность (L2)|float|кВт|R||
|activePowerL3|Активная мощность (L3)|float|кВт|R||
|activePowerTotal|Активная мощность (общая)|float|кВт|R||
|powerFactor|Коэффициент мощности|float||R||
|totalImportedActiveEnergyInRunningSession|Общее количество импортированной активной энергии за текущий сеанс|float|кВтч|R||
|runningSessionDuration|Длительность текущего сеанса|число|секунд|R||
|runningSessionDepartureTime|Время завершения текущего сеанса|число|секунды|R|Unix-время (в секундах с 1970-01-01 00:00:00 UTC)|
|runningSessionDepartureTimeISO|Время отправления текущего сеанса в формате ISO UTC|string||R||
|runningSessionID|Идентификатор текущего сеанса|целое число||R|В случае, если зарядное устройство обменивается данными с центральной системой, это идентификатор транзакции, предоставленный центральной системой через OCPP|
|evMaxPower|Максимальная мощность EV|float|кВт|R|Максимальная мощность, обнаруженная в текущем сеансе зарядки|
|evPlannedEnergy|Запланированная энергия электромобиля|float|кВтч|R|Общее количество энергии, которое планируется доставить для текущего сеанса зарядки|

### Канал: команды
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|перезагрузка|Перезапуск зарядного устройства|кнопка||W||
|setTime|Установить время UTC"|integer|секунды|W|Unix-время (в секундах с 1970-01-01 00:00:00 UTC)|

### Канал: команды.коннекторы\<номер\>
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|stopCharging|Остановить зарядку|кнопка||W||
|pauseCharging|Приостановить зарядку|кнопка||W||
|setDepartureTime|Установить время отправления|целое число|секунды|W||
|setCurrentSetpoint|Установить текущую уставку|float|A|W||
|cancelCurrentSetpoint|Отменить текущую уставку|кнопка||W||
|setPowerSetpoint|Установить заданное значение мощности|float|кВт|Вт||
|cancelPowerSetpoint|Отменить уставку мощности|кнопка||Вт||

## Changelog

### **WORK IN PROGRESS**
* (ChrisWbb) adjust state roles
* (ChrisWbb) new version of @types/node
* (ChrisWbb) tests for node 20.x


### 1.1.1 (2023-03-30)
* (ChrisWbb) fixed release problem

### 1.1.0 (2023-03-30)
* (ChrisWbb) write access to holding register
* (ChrisWbb) refactoring async calls
* (ChrisWbb) smaller changes based on suggestions from review
* (ChrisWbb) update readme

### 1.0.2 (2023-02-18)
* (ChrisWbb) fix ESLint findings

### 1.0.1 (2023-02-18)
* (ChrisWbb) preparation for release
* (ChrisWbb) small fixes from adapter check

### 1.0.0 (2023-01-02)
* (ChrisWbb) initial version

## License
MIT License

Copyright (c) 2023 ChrisWbb <development@chrweber.de>

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
