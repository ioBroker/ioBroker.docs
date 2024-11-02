---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-зарядное устройство
hash: vATzeNQGQW8IZuSUI/bk1Aq+ygmG+6AQwEb0Fpee0Jc=
---
![Логотип](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![Количество установок](https://iobroker.live/badges/sonnen-charger-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/sonnen-charger-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)

# IoBroker.sonnen-зарядное устройство
**Тесты:** ![Тест и выпуск](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

## Адаптер зарядного устройства sonnen для ioBroker
Этот адаптер интегрирует ваш sonnenCharger в ioBroker. Дополнительную информацию о sonnenCharger можно найти на [веб-страница поставщиков](https://sonnen.de/ladestation-elektroauto/).

## Конфигурация
После создания экземпляра апдейтера вам необходимо настроить несколько параметров:

|Имя параметра|Описание|По умолчанию|
|:---|:---|:---|
|IP-адрес|IP-адрес sonnenCharger|-|
|Порт|Порт Modbus-интерфейса sonnenCharger|502|
|Интервал запроса|Интервал извлечения данных в секундах (ValueRage 30 - 3600) |30|
|Разрешить запись в sonnenCharger|**ЭКСПЕРИМЕНТАЛЬНО** будьте осторожны при записи данных в sonnenCharger|false|

## Использование
### Канал: информация
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|подключение|Подключенное устройство или служба|логическое|-|R|-|

### Канал: настройки зарядного устройства
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|serialNumber|Серийный номер|строка||R||
|модель|Модель|строка||R||
|hwVersion|Версия оборудования|строка||R||
|swVersion|Версия программного обеспечения|строка||R||
|numberOfConnectors|Количество соединителей|целое число||R||

### Канал: chargeerSettings.connector.\<number\>
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|connectorType|Тип соединителя|строка||R||
|numberOfPhases|Число фаз|целое число||R||
|l1ConnectedToPhase|L1 подключен к фазе|целое число||R||
|l2ConnectedToPhase|L2 подключен к фазе|целое число||R||
|l3ConnectedToPhase|L3 подключен к фазе|целое число||R||
|customMaxCurrent|Пользовательский максимальный ток|float|A|R||

### Канал: измерения.\<число\>
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|connectorStatus|Идентификатор состояния коннектора|целое число||R||
|connectorStatusLabel|Метка состояния коннектора|строка||R|0 : Неизвестно<br> 1 : Доступен разъем<br> 2: Ожиданиеподключениятранспортного средства<br> 3: ОжиданиеЗапускаТранспортногоСредства<br> 4 : Зарядка<br> 5 : ЗарядкаПриостановленаЭвом<br> 6 : ЗарядкаПриостановленаEvse<br> 7 : Зарядка завершена<br> 8 : Ошибка зарядки<br> 9 : Возобновление зарядки<br> 10 : Недоступно|
|measuredVehicleNumberOfPhases|Измеренное количество фаз транспортного средства id|integer||R||
|measuredVehicleNumberOfPhasesLabel|Измеренное количество фаз транспортного средства label|string||R||
|evMaxPhaseCurrent|макс. фазный ток EV|float|A|R||
|targetCurrentFromPowerMgm|Целевой ток от power mgm или modbus|float|A|R||
|частота|Частота|плавающая|Гц|R||
|напряжениеL1|L-N напряжение (L1)|плавающее|V|R||
|напряжениеL2|напряжение L-N (L2)|плавающее|V|R||
|напряжениеL3|L-N напряжение (L3)|плавающее|V|R||
|currentL1|Текущий (L1)|плавающий|A|R||
|currentL2|Текущий (L2)|плавающий|A|R||
|currentL3|Текущий (L3)|плавающий|A|R||
|activePowerL1|Активная мощность (L1)|float|кВт|R||
|activePowerL2|Активная мощность (L2)|float|кВт|R||
|activePowerL3|Активная мощность (L3)|float|кВт|R||
|activePowerTotal|Активная мощность (общая)|float|кВт|R||
|powerFactor|Коэффициент мощности|плавающий||R||
|totalImportedActiveEnergyInRunningSession|Общая импортированная активная энергия в текущем сеансе|float|кВт·ч|R||
|runningSessionDuration|Длительность сеанса работы|число|секунд|R||
|runningSessionDepartureTime|Время отправления текущего сеанса|число|секунды|R|Время Unix (секунды с 1970-01-01 00:00:00 UTC)|
|runningSessionDepartureTimeISO|Время отправления текущего сеанса в формате ISO UTC|string||R||
|runningSessionID|Идентификатор запущенного сеанса|целое число||R|В случае, если зарядное устройство взаимодействует с центральной системой, это transactionId, предоставленный центральной системой через OCPP|
|evMaxPower|Максимальная мощность электромобиля|float|кВт|R|Максимальная мощность, обнаруженная в текущем сеансе зарядки|
|evPlannedEnergy|Планируемая энергия электромобиля|float|кВт·ч|R|Общее количество энергии, которое планируется доставить для текущего сеанса зарядки|

### Канал: команды
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|перезапустить|Перезапустить sonnen-charger|кнопка||W||
|setTime|Установить время UTC"|целое число|секунды|W|Время Unix (секунды с 1970-01-01 00:00:00 UTC)|

### Канал: commands.connectors\<number\>
|Идентификатор|Описание|Тип данных|Единица измерения|Чтение/запись|Дополнительная информация|
|:---|:---|:---|:---|:---|:---|
|stopCharging|Остановить зарядку|кнопка||W||
|pauseCharging|Приостановить зарядку|кнопка||W||
|setDepartureTime|Установить время отправления|целое число|секунды|W||
|setCurrentSetpoint|Установить текущую уставку|float|A|W||
|cancelCurrentSetpoint|Отменить текущую уставку|кнопка||W||
|setPowerSetpoint|Установить заданное значение мощности|float|кВт|Вт||
|cancelPowerSetpoint|Отменить заданное значение мощности|кнопка||W||

## **РАБОТА В ПРОЦЕССЕ**
* (ChrisWbb) реализация интеллектуального режима (в настоящее время не отключено)
* (ChrisWbb) обновить версии зависимостей

### 1.2.1 (2024-05-30)
* (ChrisWbb) исправлены выводы проверки адаптера

### 1.2.0 (2024-05-30)
* (ChrisWbb) обновить версии зависимостей
* (ChrisWbb) исправлено обнаружение средства проверки адаптера
* (ChrisWbb) настроить государственные роли
* (ChrisWbb) новая версия @types/node
* (ChrisWbb) тесты для узла 20.x

### 1.1.1 (2023-03-30)
* (ChrisWbb) исправлена проблема с выпуском

### 1.1.0 (2023-03-30)
* (ChrisWbb) доступ на запись в регистр хранения
* (ChrisWbb) рефакторинг асинхронных вызовов
* (ChrisWbb) небольшие изменения на основе предложений из обзора
* (ChrisWbb) обновить файл readme

### 1.0.2 (2023-02-18)
* (ChrisWbb) исправить выводы ESLint

### 1.0.1 (2023-02-18)
* (ChrisWbb) подготовка к выпуску
* (ChrisWbb) небольшие исправления из проверки адаптера

### 1.0.0 (2023-01-02)
* (ChrisWbb) первоначальная версия

## Changelog

## License
MIT License

Copyright (c) 2024 ChrisWbb <development@chrweber.de>

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