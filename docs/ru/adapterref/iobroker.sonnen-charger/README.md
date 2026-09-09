---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-charger
hash: qchnlxvVfIix5sXl7UUv1A8uFIn6SPk9HvsD75XfH/I=
---
![Логотип](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![Количество установок](https://iobroker.live/badges/sonnen-charger-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/sonnen-charger-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)
![Тестирование и выпуск](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sonnen-charger

## адаптер sonnen-charger для ioBroker

Этот адаптер интегрирует ваш sonnenCharger в ioBroker.\
&#x20;Дополнительную информацию о sonnenCharger можно найти на [веб-странице поставщика](https://sonnen.de/ladestation-elektroauto/) .

## Конфигурация

После создания экземпляра apdater необходимо настроить несколько параметров:

| Имя параметра                                | Описание                                                                         | По умолчанию |
| :------------------------------------------- | :------------------------------------------------------------------------------- | :----------- |
| IP-адрес                                     | IP-адрес зарядного устройства sonnenCharger                                      | -            |
| Порт                                         | Порт интерфейса Modbus зарядного устройства sonnenCharger                        | 502          |
| Интервал запроса                             | Интервал для получения данных в секундах (ValueRage 30 - 3600)                   | 30           |
| Разрешить доступ на запись для sonnenCharger | **ЭКСПЕРИМЕНТАЛЬНАЯ ЧАСТЬ:** будьте осторожны при записи данных в SonnenCharger. | ЛОЖЬ         |

## Использование

### Канал: информация

| Идентификатор | Описание                           | Тип данных | Единица | Чтение/Запись | Дополнительная информация |
| :------------ | :--------------------------------- | :--------- | :------ | :------------ | :------------------------ |
| связь         | Подключенное устройство или сервис | логический | -       | Р             | -                         |

### Канал: chargerSettings

| Идентификатор          | Описание                        | Тип данных  | Единица | Чтение/Запись | Дополнительная информация |
| :--------------------- | :------------------------------ | :---------- | :------ | :------------ | :------------------------ |
| серийный номер         | Серийный номер                  | нить        |         | Р             |                           |
| модель                 | Модель                          | нить        |         | Р             |                           |
| hwVersion              | Аппаратная версия               | нить        |         | Р             |                           |
| swVersion              | Версия программного обеспечения | нить        |         | Р             |                           |
| количествоСоединителей | Количество разъемов             | целое число |         | Р             |                           |

### Канал: chargerSettings.connector.\<number>

| Идентификатор      | Описание                       | Тип данных  | Единица | Чтение/Запись | Дополнительная информация |
| :----------------- | :----------------------------- | :---------- | :------ | :------------ | :------------------------ |
| тип соединителя    | Тип разъема                    | нить        |         | Р             |                           |
| количествоФаз      | Пронумеровать этапы            | целое число |         | Р             |                           |
| l1ConnectedToPhase | L1 подключен к фазе            | целое число |         | Р             |                           |
| l2ConnectedToPhase | L2 подключен к фазе            | целое число |         | Р             |                           |
| l3ConnectedToPhase | L3 подключен к фазе            | целое число |         | Р             |                           |
| customMaxCurrent   | Настраиваемый максимальный ток | плавать     | А       | Р             |                           |

### Канал: измерения.<номер>

| Идентификатор                             | Описание                                                       | Тип данных  | Единица | Чтение/Запись | Дополнительная информация                                                                                                                                                                                                                                                                      |
| :---------------------------------------- | :------------------------------------------------------------- | :---------- | :------ | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| connectorStatus                           | Идентификатор состояния разъема                                | целое число |         | Р             |                                                                                                                                                                                                                                                                                                |
| connectorStatusLabel                      | Метка состояния разъема                                        | нить        |         | Р             | 0: Неизвестно<br> 1: SocketAvailable<br> 2: Ожидание подключения транспортного средства<br> 3: Ожидание запуска автомобиля<br> 4: Зарядка<br> 5: ChargingPausedByEv<br> 6: ChargingPausedByEvse<br> 7: Зарядка завершена<br> 8: Ошибка зарядки<br> 9: Возобновление зарядки<br> 10: Недоступно |
| measuredVehicleNumberOfPhases             | Измеренное количество фаз транспортного средства id            | целое число |         | Р             |                                                                                                                                                                                                                                                                                                |
| measuredVehicleNumberOfPhasesLabel        | Измеренное количество фаз на транспортном средстве.            | нить        |         | Р             |                                                                                                                                                                                                                                                                                                |
| evMaxPhaseCurrent                         | максимальный фазный ток электромобиля                          | плавать     | А       | Р             |                                                                                                                                                                                                                                                                                                |
| targetCurrentFromPowerMgm                 | Целевой ток от модуля управления питанием или Modbus.          | плавать     | А       | Р             |                                                                                                                                                                                                                                                                                                |
| частота                                   | Частота                                                        | плавать     | Гц      | Р             |                                                                                                                                                                                                                                                                                                |
| напряжениеL1                              | Напряжение LN (L1)                                             | плавать     | В       | Р             |                                                                                                                                                                                                                                                                                                |
| напряжениеL2                              | Напряжение LN (L2)                                             | плавать     | В       | Р             |                                                                                                                                                                                                                                                                                                |
| напряжениеL3                              | Напряжение LN (L3)                                             | плавать     | В       | Р             |                                                                                                                                                                                                                                                                                                |
| текущийL1                                 | Текущий (L1)                                                   | плавать     | А       | Р             |                                                                                                                                                                                                                                                                                                |
| текущийL2                                 | Текущий (L2)                                                   | плавать     | А       | Р             |                                                                                                                                                                                                                                                                                                |
| текущийL3                                 | Текущий (L3)                                                   | плавать     | А       | Р             |                                                                                                                                                                                                                                                                                                |
| activePowerL1                             | Активная мощность (L1)                                         | плавать     | кВт     | Р             |                                                                                                                                                                                                                                                                                                |
| activePowerL2                             | Активная мощность (L2)                                         | плавать     | кВт     | Р             |                                                                                                                                                                                                                                                                                                |
| activePowerL3                             | Активная мощность (L3)                                         | плавать     | кВт     | Р             |                                                                                                                                                                                                                                                                                                |
| activePowerTotal                          | Активная мощность (суммарная)                                  | плавать     | кВт     | Р             |                                                                                                                                                                                                                                                                                                |
| коэффициент мощности                      | коэффициент мощности                                           | плавать     |         | Р             |                                                                                                                                                                                                                                                                                                |
| totalImportedActiveEnergyInRunningSession | Общая затраченная активная энергия во время беговой тренировки | плавать     | кВтч    | Р             |                                                                                                                                                                                                                                                                                                |
| runningSessionDuration                    | Продолжительность беговой сессии                               | число       | секунд  | Р             |                                                                                                                                                                                                                                                                                                |
| runningSessionDepartureTime               | Время начала беговой сессии                                    | число       | секунд  | Р             | Время Unix (секунды с 1 января 1970 г., 00:00:00 UTC)                                                                                                                                                                                                                                          |
| runningSessionDepartureTimeISO            | Время начала текущей сессии в формате ISO UTC                  | нить        |         | Р             |                                                                                                                                                                                                                                                                                                |
| runningSessionID                          | Идентификатор текущей сессии                                   | целое число |         | Р             | В случае, если зарядное устройство взаимодействует с центральной системой, это идентификатор транзакции (tactionId), предоставленный центральной системой по протоколу OCPP.                                                                                                                   |
| evMaxPower                                | максимальная мощность электромобиля                            | плавать     | кВт     | Р             | Обнаружена максимальная мощность в текущей сессии зарядки.                                                                                                                                                                                                                                     |
| evPlannedEnergy                           | Планируемая энергетика для электромобилей                      | плавать     | кВтч    | Р             | Общее количество энергии, которое планируется передать в ходе текущей сессии зарядки.                                                                                                                                                                                                          |

### Канал: команды

| Идентификатор | Описание                     | Тип данных  | Единица | Чтение/Запись | Дополнительная информация                             |
| :------------ | :--------------------------- | :---------- | :------ | :------------ | :---------------------------------------------------- |
| перезапуск    | Перезапустить sonnen-charger | кнопка      |         | В             |                                                       |
| setTime       | Установить время UTC"        | целое число | секунд  | В             | Время Unix (секунды с 1 января 1970 г., 00:00:00 UTC) |

### Канал: commands.connectors\<number>

| Идентификатор         | Описание                             | Тип данных  | Единица | Чтение/Запись | Дополнительная информация |
| :-------------------- | :----------------------------------- | :---------- | :------ | :------------ | :------------------------ |
| остановить зарядку    | Прекратите зарядку                   | кнопка      |         | В             |                           |
| паузаЗарядка          | Приостановить зарядку                | кнопка      |         | В             |                           |
| setDepartureTime      | Установить время отправления         | целое число | секунд  | В             |                           |
| setCurrentSetpoint    | Установить текущую заданную точку    | плавать     | А       | В             |                           |
| cancelCurrentSetpoint | Отменить текущую заданную точку      | кнопка      |         | В             |                           |
| setPowerSetpoint      | Установите заданный уровень мощности | плавать     | кВт     | В             |                           |
| отменитьPowerSetpoint | Отмена заданного значения мощности   | кнопка      |         | В             |                           |

## **РАБОТА В ПРОЦЕССЕ**

- (ChrisWbb) Реализация интеллектуального режима (в настоящее время не отключена)
- (ChrisWbb) обновить версии зависимостей

### 1.2.1 (2024-05-30)

- (ChrisWbb) исправьте результаты проверки адаптера.

### 1.2.0 (2024-05-30)

- (ChrisWbb) обновить версии зависимостей
- (ChrisWbb) исправление поиска адаптера в программе проверки адаптеров
- (ChrisWbb) корректирует роли в штате
- (ChrisWbb) новая версия @types/node
- (ChrisWbb) тесты для Node 20.x

### 1.1.1 (2023-03-30)

- (ChrisWbb) исправил проблему с релизом

### 1.1.0 (2023-03-30)

- (ChrisWbb) доступ на запись к реестру хранения
- (ChrisWbb) рефакторинг асинхронных вызовов
- (ChrisWbb) Небольшие изменения, основанные на предложениях, высказанных в ходе проверки.
- (ChrisWbb) обновить файл readme

### 1.0.2 (2023-02-18)

- (ChrisWbb) исправьте результаты проверки ESLint

### 1.0.1 (2023-02-18)

- (ChrisWbb) подготовка к выпуску
- (ChrisWbb) Небольшие исправления из проверки адаптера

### 1.0.0 (2023-01-02)

- (ChrisWbb) первоначальная версия

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