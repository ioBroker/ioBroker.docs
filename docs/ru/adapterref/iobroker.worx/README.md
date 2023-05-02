---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: Ol2vkPFqs9qkriLlPG0oWXLVC/aQEMmYbyvPCkshdVc=
---
![Логотип](../../../en/adapterref/iobroker.worx/admin/worx.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.worx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.worx.svg)
![Количество установок](https://iobroker.live/badges/worx-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/worx-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.worx.png?downloads=true)

# IoBroker.worx
**Тесты:** ![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.worx/workflows/Test%20and%20Release/badge.svg)

## Адаптер Worx (Kress, Landxcape и Ferrex) для ioBroker
управление через облако и mqtt

Этот адаптер соединяет ioBroker с газонокосилкой Landroid Kress Landxcape или Ferrex через облако.
Температура, время скашивания, уровень заряда батареи и другие данные считываются с газонокосилки.
Адаптер может управлять газонокосилкой, и вы можете изменять параметры конфигурации, такие как время работы.

Минимальная версия узла 14.18

ActivityLog das Aktivitätenprotokoll aus der App Areas Die Areas des Mähers calendar Der Mähkalender des Mähers modules Die verbauten Modules des Mähers mower Aufbereite Informationen des Mähers sowie Steuerung des Mähers product Produkinformationen zum Mäher rawMqtt dieRohaten die via MQTT vom Mäher kommen workx.0.xx.косилка .firmware_available -> Verfügbare Firmware worx.0.xx.mower.firmware_available_date -> Datum Update der Letzten Firmware worx.0.xx.mower.firmware_available_all -> History der Firmware als JSON Update der Daten 24H worx.0.xx.product - > Informationen von eurem Mower Welche Features, Board und Accessories er hat.
Update der Daten einmalig nach einem Neustart/Restart worx.0.xx.activityLog.last_update -> Letzte Aktualisierung worx.0.xx.activityLog.payload -> Alle Aktivitäten der letzten 8 Tage als JSON

## Настройки
- для подключения к газонокосилке введите адрес электронной почты и пароль от своего рабочего аккаунта в Config.
- Задержка для обрезки кромок: если обрезка кромок начинается на повороте или изгибе, газонокосилка может потерять провод и остановиться с ошибкой, или лезвия могут не вращаться. Для этого можно задать начальную точку, в которой лопасти начинают вращаться.
- Mäher ab eine Zone oder Meterzahl starten lassen:

Setze Areas.area_0 auf die Meterzahl des Gewünschten Startpunktes Setze Areas.area_1, Areas.area_2 und Areas.area_3 Jeweils auf 0 Setze Areas.startSequence auf [0,0,0,0,0,0,0,0,0,0 ]

## Расписание setzen:
wochentagname/borderCut wochentagname/startTime wochentagname/workTime

Danach ein Timeout 1,1 Sek. и worx.0.xxxxxxxxxxx.calendar.calJson_tosend на истинную установку.
In dieser Zeit darf natürlich nicht autotisch ein Update kommen, da die geänderten Zeiten wieder glöscht werden. Wenn das zu oft vorkommt, dann muss ich leider einen weiteren Datenpunkt hinzufügen der Updates von MQTT oder den 10 Minuten Refresh unterbindet.

Естественная позолота для печати: mower.oneTimeWithBorder mower.oneTimeWorkTime

Und dann nach 1,1 Sek. worx.0.xxx.mower.oneTimeStart setzen

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/4834/adapter-worx-landroid/>

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Changelog

### 2.1.3

Add ping option in the instance settings",

### 2.1.2

Improve reconnection for multiple mower

### 2.1.1

Change reconnection times

### 2.1.0

Move Calendar setState to one Json and other fixes to prevent blocking because of too many sending requests
Verschieben des Calendar in eine Json und andere Verbesserung, um ein 24h Block zu verhindern, der passiert wenn zu viele Anfragen gesendet werden.

### 2.0.3

Add manual refresh. Fix empty status and firmware format. Reduce info logs.

### 2.0.1

Adapter rewritten. Added product info and activity log. rawMqtt values improved and compatible with Node v18.

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

(MeisterTR) fix bug with OLMSwitch_Cutting
(MeisterTR) fix bug with PartyMode
(TA2k) fix error with wrong serialnumber (please delete all objects manually)
(MeisterTR) fix bug in autolock function

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

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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