---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.worx.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.worx.svg
BADGE-Number of Installations: https://iobroker.live/badges/worx-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/worx-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.worx.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.worx/README.md
title: Адаптер ioBroker.worx
hash: Uhw8niNCQQPen2x6WAmPDxAcOcsubHLP63T3Jrd+I7U=
---
![Логотип](../../../en/admin/worx.png)

# Адаптер ioBroker.worx
## Описание
### Настройки экземпляра
- «Электронная почта приложения»: ваше имя пользователя приложения.
- `Пароль приложения`: Ваш пароль приложения
- «Имя приложения»: выберите свое устройство.
- «Задержка для EdgeCut»: когда должен начаться EdgeCut (например, 5 секунд до газона)

![Настройки экземпляра img/instance_1.png](../../../en/adapterref/iobroker.worx/img/instance_1.png)

- `Расстояние и время в мин и м`: по умолчанию ч и км
- `Ping MQTT Connection каждые 10 минут`: просто для проверки. Пожалуйста, не более 1 часа!

![Настройки экземпляра img/instance_2.png](../../../en/adapterref/iobroker.worx/img/instance_2.png)

### Папка
- `activityLog`: Ваш журнал активности (возможен контроль)
- `areas`: Области (возможен контроль)
- `календарь`: расписание (возможен контроль)
- `Модули`: Ваш(и) модуль(и) (возможен контроль)
- `косилка`: Ваша косилка (возможно управление)
- `product`: все свойства ваших устройств (только для чтения)
- `rawMqtt`: все данные из облака (только для чтения)

![Папка img/all_folders.png](../../../en/adapterref/iobroker.worx/img/all_folders.png)

### ActivityLog (Wire и Vision)
- `last_update`: Последнее обновление в виде метки времени
- `manuell_update`: загружает текущий журнал активности
- `payload`: журнал активности в виде таблицы JSON (для VIS или Blockly)

![Активность img/activity.png](../../../en/adapterref/iobroker.worx/img/activity.png)

### Областей (без Vision)
- `actualArea`: текущий
- `actualAreaIndicator`: Начало следующей зоны массива
- `area_0`: Начало зоны 1 в метрах (изменяемое)
- `area_1`: Начало зоны 2 в метрах (изменяемое)
- `area_2`: Начало зоны 3 в метрах (изменяемое)
- `area_3`: Начало зоны 4 в метрах (изменяемое)
- `startSequence`: начало зоны массива (события 0-9), например. Старт только в Зоне 2 [2,2,2,2,2,2,2,2,2,2] (изменяемый)
- `zoneKeeper`: Безопасное вождение в узких пересечениях зон (начиная с прошивки 3.30) (изменяемый)

![Район img/areas.png](../../../en/adapterref/iobroker.worx/img/areas.png)

### Календарь (Wire и Vision)
- напр. настройка времени на среду

    - `wednesday.borderCut`: с границей или без нее (изменение значения без задержки)
    - `wednesday.startTime`: время начала чч:мм (0-23/0-59), например. 09:00 (Изменение значения без задержки)
    - `wednesday.workTime`: рабочее время в минутах (180 мин = 3 часа), например. 30 (Изменить значение без задержки)
    - `calJson_sendto`: если все точки данных установлены, нажмите кнопку для отправки (с задержкой 1,1 секунды). Теперь газонокосилка будет косить в течение 30 минут.
    - `calJson_tosend`: Эти данные отправляются в Mqtt (как график скашивания, так и устанавливается автоматически). Вы также можете создать этот JSON самостоятельно.
    - `calendar.calJson`: название дня недели графика скашивания без номера (график скашивания 1/устанавливается автоматически - только для провода)
    - `calendar.calJson2`: название дня недели расписания скашивания с номером (график скашивания 2/устанавливается автоматически - только для провода)

![Папка img/calendar.png](../../../en/adapterref/iobroker.worx/img/calendar.png)

### Модули (Wire и Vision)
- Модуль Off Limit (Wire и Vision)

    - `DF.OLMSwitch_Cutting`: Запретные зоны true-on/false-off
    - `DF.OLMSwitch_FastHoming`: быстрый возврат на зарядную станцию в режиме true-on/false-off

- Модуль ACS (только провод)
    - `US.ACS`: 1-вкл./0-выкл.

![Модуль img/module.png](../../../en/adapterref/iobroker.worx/img/module.png)

### Косилка (Wire и Vision)
- `AutoLock`: автоматическая блокировка истинного включения/ложного выключения (провод и видение/изменяемый)
- `AutoLockTimer`: Таймер автоматической блокировки макс. 10 минут с шагом 30 секунд (проводной и Vision/сменный)
- `batteryChargeCycle`: цикл зарядки батареи (провод и видение/только чтение)
- `batteryCharging`: зарядка батареи false->нет/true->yes (провод и видение/только для чтения)
- `batteryState`: состояние батареи в % (провод и видение/только для чтения)
- `batteryTemperature`: температура батареи в градусах Цельсия (провод и видение/только для чтения)
- `batteryVoltage`: напряжение батареи в вольтах (провод и видение/только для чтения)
- `direction`: Направление в градусах (проволока и видение/только для чтения)
- `edgecut`: запуск EdgeCut (проволока и Vision/изменяемый)
- `ошибка`: сообщение об ошибке от газонокосилки (провод и Vision/только для чтения)

```json
{
    "states": {
        "0": "No error", //(wire & Vision)
        "1": "Trapped", //(wire & Vision unknown)
        "2": "Lifted", //(wire & Vision)
        "3": "Wire missing", //(wire & Vision unknown)
        "4": "Outside wire", //(wire & Vision unknown)
        "5": "Raining", //(wire & Vision)
        "6": "Close door to mow", //(wire & Vision)
        "7": "Close door to go home", //(wire & Vision)
        "8": "Blade motor blocked", //(wire & Vision)
        "9": "Wheel motor blocked", //(wire & Vision)
        "10": "Trapped timeout", //(wire & Vision)
        "11": "Upside down", //(wire & Vision)
        "12": "Battery low", //(wire & Vision)
        "13": "Reverse wire", //(wire & Vision unknown)
        "14": "Charge error", //(wire & Vision)
        "15": "Timeout finding home", //(wire & Vision)
        "16": "Mower locked", //(wire & Vision)
        "17": "Battery over temperature", //(wire & Vision)
        "18": "dummy model", //(wire & Vision)
        "19": "Battery trunk open timeout", //(wire & Vision)
        "20": "wire sync", //(wire & Vision unknown)
        "21": "msg num" //(wire & Vision)
    }
}
```

![Косилка img/mower_1.png](../../../en/adapterref/iobroker.worx/img/mower_1.png)

- `firmware`: текущая установленная прошивка (проводная и Vision/только для чтения)
- `firmware_available`: Доступная прошивка (проводная/только для чтения)
- `firmware_available_all`: Все доступные прошивки (проводные/только для чтения)
- `firmware_available_date`: Дата выпуска прошивки (только для чтения)
- `градиент`: Градиент в градиенте (проволока и видение/только для чтения)
- `наклон`: наклон в градусах (проволока и видение/только для чтения)
- `last_command`: последний запрос от iobroker или APP в виде таблицы JSON (провод и видение/только для чтения)
- `mowTimeExtend`: время скашивания увеличивается в % Диапазон: -100%->100% (проводной/изменяемый)
- `mowerActive`: приостановить план скашивания (проводной/изменяемый)
- `mqtt_update`: макс. обновление данных Mqtt. 150/день (проводной и Vision/сменный)
- `mqtt_update_count`: счетчик обновлений данных Mqtt (провод и видение/только для чтения)

![Косилка img/mower_2.png](../../../en/adapterref/iobroker.worx/img/mower_2.png)

- `oneTimeJson`: Однократное скашивание в формате JSON.

```json
{
    "wtm": 60, //Minutes
    "bc": 0 //0=w/o bordercut 1=with bordercut or use the next datapoints
}
```

- `oneTimeStart`: однократный запуск скашивания "сначала заполнить oneTimeWithBorder и oneTimeWorkTime" - с задержкой 1,1 секунды (проводная и Vision/изменяемая)
- `oneTimeWithBorder`: с границей - изменение значения без задержки (проводное и видение/изменяемое)
- `oneTimeWorkTime`: максимальное рабочее время. 8 часов с шагом 30 минут - изменение значения без задержки (проводное и визуальное/изменяемое)
- `онлайн`: газонокосилка онлайн (провод и Vision/только для чтения)
- `partyModus`: включение/выключение Partymodus (проводной и Vision/изменяемый)
- `pause`: включение/выключение перерыва косилки (проводной и Vision/изменяемый)
- `sendCommand`: Отправить команду cmd (проводная и Vision/изменяемая)

```json
{
    "states": {
        "1": "Start", //(wire & Vision)
        "2": "Stop", //(wire & Vision)
        "3": "Home", //(wire & Vision)
        "4": "Start Zone Taining", //(wire & Vision unknown)
        "5": "Lock", //(wire & Vision unknown)
        "6": "Unlock", //(wire & Vision unknown)
        "7": "Restart Robot", //(wire & Vision unknown)
        "8": "pause when follow wire", //(wire & Vision unknown)
        "9": "safe homing" //(wire & Vision unknown)
    }
}
```

- `состояние`: True для запуска газонокосилки и False для остановки газонокосилки (проводной и Vision/изменяемый)
- `статус`: Статус газонокосилки (провод и видение/только для чтения)

```json
{
    "states": {
        "0": "IDLE", //(wire & Vision)
        "1": "Home", //(wire & Vision)
        "2": "Start sequence", //(wire & Vision)
        "3": "Leaving home", //(wire & Vision)
        "4": "Follow wire", //(wire & Vision unknown)
        "5": "Searching home", //(wire & Vision)
        "6": "Searching wire", //(wire & Vision unknown)
        "7": "Mowing", //(wire & Vision)
        "8": "Lifted", //(wire & Vision)
        "9": "Trapped", //(wire & Vision)
        "10": "Blade blocked", //(wire & Vision)
        "11": "Debug", //(wire & Vision)
        "12": "Remote control", //(wire & Vision)
        "13": "escape from off limits", //(wire & Vision)
        "30": "Going home", //(wire & Vision)
        "31": "Zone training", //(wire & Vision)
        "32": "Border Cut", //(wire & Vision)
        "33": "Searching zone", //(wire & Vision)
        "34": "Pause" //(wire & Vision)
    }
}
```

![Косилка img/mower_3.png](../../../en/adapterref/iobroker.worx/img/mower_3.png)

- `крутящий момент`: диапазон крутящего момента колеса -50-> 50 (проводной и визуальный/изменяемый)
- `totalBladeTime`: общее время блейда (провод и видение/только чтение)
- `totalDistance`: общее расстояние (провод и видение/только для чтения)
- `totalTime`: общее время работы (провод и видение/только для чтения)
- `waitRain`: макс. задержка дождя. 12 часов с шагом 30 минут (проводной и Vision/сменный)
- `wifiQuality`: качество Wi-Fi (провод и видение/только для чтения)

![Косилка img/mower_4.png](../../../en/adapterref/iobroker.worx/img/mower_4.png)

### Дополнительно для зрения
-   Область
    - `rfid`: общая площадь (только для чтения)

![Видение img/areas_vision.png](../../../en/adapterref/iobroker.worx/img/areas_vision.png)

- Косилка
    - `log_improvement`: отправить журнал улучшений в worx отключить/включить (изменяемый)
    - `log_troubleshooting`: отправить журнал устранения неполадок в worx отключить/включить (изменяемый)

![Видение img/logs_vision.png](../../../en/adapterref/iobroker.worx/img/logs_vision.png)

- Косилка
    - `paused`: приостановленное расписание в минутах (изменяемое)

![Видение img/paused_vision.png](../../../en/adapterref/iobroker.worx/img/paused_vision.png)

## Changelog

### **WORK IN PROGRESS**

-   (Lucky-ESA) Fix unique mqtt clientid
-   (Lucky-ESA) Fix [#704](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/704)
-   (Lucky-ESA) readme.md translated [#703](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/703)
-   (Lucky-ESA) Preparation new Mqtt connection Fix [#590](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/590)

### 2.2.0 (2023-06-27)

-   (Lucky-ESA) Removed mowerActive for Vision
-   (Lucky-ESA) Add Vision paused schedule
-   (Lucky-ESA) Add Vision partyModus
-   (Lucky-ESA) Fix ping request Vision
-   (Lucky-ESA) Fix send message inheritance
-   (Lucky-ESA) Fix [#684](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/684)
-   (Lucky-ESA) Fix deviceArray inheritance
-   (Lucky-ESA) Add Vision mowers w/o Status & Error message
-   (Lucky-ESA) Add ZoneKeeper for previous mowers

### 2.1.3

-   (TA2k) Add ping option in the instance settings

### 2.1.2

-   (TA2k) Improve reconnection for multiple mower

### 2.1.1

-   (TA2k) Change reconnection times

### 2.1.0

-   (TA2k) Move Calendar setState to one Json and other fixes to prevent blocking because of too many sending requests

### 2.0.3

-   (TA2k) Add manual refresh. Fix empty status and firmware format. Reduce info logs.

### 2.0.1

-   (TA2k) Adapter rewritten. Added product info and activity log. rawMqtt values improved and compatible with Node v18.

### 1.7.0 (2022-09-28)

-   (TA2k) fix login

### 1.6.6 (2022-06-25)

-   (MeisterTR) fix edgecut

### 1.6.5 (2022-06-19)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions also on second place

### 1.6.4 (2022-06-18)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions
-   (Apollon77) fix error cases reported by Sentry

### 1.6.3 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.2 (2022-06-17)

-   (TA2k) fix issues introduced in 1.6.0

### 1.6.1 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.0 (2022-06-16)

-   (Apollon77) fix some error cases reported by Sentry

### 1.5.5 (2021-09-29)

-   (MeisterTR) fix error

### 1.5.0 (2021-09-26)

-   (MeisterTR) many fixes
-   (MeisterTR) add torque control
-   (MeisterTR) fixed States

### 1.4.3 (2021-07-25)

-   (MeisterTR) fix Partymode detection

### 1.4.2 (2021-07-24)

-   (MeisterTR) fix bug with OLMSwitch_Cutting
-   (MeisterTR) fix bug with PartyMode
-   (TA2k) fix error with wrong serialnumber (please delete all objects manually)
-   (MeisterTR) fix bug in autolock function

### 1.4.1 (2021-07-06)

-   (MeisterTR) fix bug in sendCommand (please remove state manually)

### 1.4.0 (2021-07-05)

-   update testing
-   add gps coordinates
-   add new status states
-   add new Autolock states
-   add new OffLinits states

### 1.3.7 (03.06.2021)

-   (TA2k) type fixes

### 1.3.6 (27.05.2021)

-   (MeisterTR) bugfixes
-   (MeisterTR) better errorhandling

### 1.2.9 (02.12.2020)

-   (MeisterTR) add sentry
-   (MeisterTR) Bugfix (error type of sc... again) (IOBROKER-WORX-3)

### 1.2.4 (15.11.2020)

-   (MeisterTR) Bugfix (error type of sc...)
-   (MeisterTR) change Testing to git

### 1.2.3 (29.08.2020)

-   (MeisterTR) add option to crate a Json Obj to set mowtime with scripts
-   (MeisterTR) add option to disable weather
-   (MeisterTR) add double Shedule, oneTimeShedule, PartyMode
-   (MeisterTR) fix setIntervall => setTimeout
-   (MeisterTR) fix error with Meter and Min. in Config
-   (MeisterTR) add Kress and Landxcape

### 1.0.0 (03.12.2019)

-   (MeisterTR) bump Version
-   (MeisterTR) transfer to community

### 0.4.0 (03.08.2019)

-   (MeisterTR) fix multimower
-   (MeisterTR) change loglevel
-   (MeisterTR) fix online Status

### 0.3.1 (12.06.2019)

-   (MeisterTR) add delay for edgecut in config
-   (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)

-   (MeisterTR) add border
-   (MeisterTR) fix small errors
-   (MeisterTR) code cleanup

### 0.0.1

-   (MeisterTR) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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