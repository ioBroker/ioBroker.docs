---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onkyo/README.md
title: ioBroker.onkyo
hash: d/9zDVFdSixQcSqAGhJOgOTmeqPpXzomWrg1Dpy8MDg=
---
![Логотип](../../../en/adapterref/iobroker.onkyo/admin/onkyo.png)

![Количество установок](http://iobroker.live/badges/onkyo-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.onkyo.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.onkyo/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/onkyo/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onkyo.svg)

# ioBroker.onkyo

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

### 2.0 Крупное обновление!

Начиная с версии 2.0, произойдут структурные изменения!\
&#x20;При обновлении до этой версии вам потребуется изменить переменные во всех других адаптерах, таких как VIS или JavaScript!\
&#x20;Новая версия поддерживает Material Design и обложки альбомов. Медиаобъекты поддерживают виджеты плееров, такие как Sonos или Winamp.![ВИС](../../../en/adapterref/iobroker.onkyo/admin/player.png)

Этот адаптер позволяет управлять AV-ресиверами Onkyo и Pioneer с использованием протокола EISCP.

В нём используется node-eiscp: <https://github.com/tillbaks/node-eiscp>

Для отправки команд существует специальное состояние «RAW». Запись в это состояние запускает только команды RAW, такие как известные файлы Excel EISCP. В качестве примера команды EISCP RAW можно привести команду «PWR01».

Ещё одно особое состояние, поддерживаемое адаптером, — это «подключено». Это логическое значение, показывающее, подключен ли node-eiscp в данный момент к приемнику.

Пример представления VIS![ВИС](../../../en/adapterref/iobroker.onkyo/admin/onkyo-vis.png)

## Протестированные приемники

### Онкио

- TX-NR 525
- TX-NR 626
- TX-NR 727

### Пионер

- VXS-S520D
- VSX-1131

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.

### 2.1.2 (2022-03-11)
* (Diginix/Apollon77) set object defaults with correct data type

### 2.1.1 (2021-11-18)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.1.0 (2021-07-05)
* (Apollon77) Add reconnection and device offline detection
* (Apollon77) Optimize packet parsing
* (Apollon77) Fix Image handling
* (Apollon77) Add crash reporting using sentry in js-controller 3+

### 2.0.6 (2021-05-28)
* (Diginix) fixed data types

### 2.0.5 (2021-04-27)
* (Diginix) fixed some object properties
* (bluefox) Added the support of compact mode

### 2.0.3   
* (Eisbaeeer) now support zone3

### 2.0.2
* (Eisbaeeer) fix double .js

### 2.0.0
* (Eisbaeeer) Major update iobroker.onkyo

### 1.1.5
* (Eisbaeeer) Zones will be powered if tune preset selected

### 1.1.4  
* (Eisbaeeer) Added direct tuning in zones (issue #2)

### 1.1.3
* (Eisbaeeer) Adding Navigation Items

### 1.1.2
* (Eisbaeeer) Adding CoverArt

### 1.1.1
* (Eisbaeeer) Update zone 2 volume after power on. Adding Pioneer Receivers with eiscp support.

### 1.1.0
* (Eisbaeeer) Completely new structure (Zone1, Zone2, Device)

### 1.0.5
* (Eisbaeeer) Changed structure
* (Eisbaeeer) Added Object RAW to send own commands

### 1.0.4 (2018.07.24)
* (Eisbaeeer) Cleaned program
* (Eisbaeeer) Fix logging

### 1.0.2 (2018.02.28)
* (Eisbaeeer) Changed name of adapter
* (Eisbaeeer) Added testing of adapter in travis

### 1.0.0 (2017.11.28)
* (Eisbaeeer) Add max volume settings to zone1 and zone2.   
* (Eisbaeeer) changed objects to switch
* (Eisbaeeer) moved adapter to "multimedia"
* (Eisbaeeer) cleaned log outputs

### 0.1.20 (2016.03.29)
* (Eisbaeeer) Add checkbox in settings for VIS objects. Volumes can be set in
  decimal. Power states, mute states, etc. are now usable with VIS buttons.

### 0.1.12 (2016.02.25)
* (installator) Fix power state

### 0.1.11 (2016.01.13)
* (installator) Fix regexp error

### 0.1.10
* (installator) For command CTL sets Center Level -12 - 0 - +12

### 0.1.9
* (installator) change power to system-power

### 0.1.8
* (installator) fix values to control power and enable using of 1 and 0

### 0.1.7
* (bluefox) fix creation of specific states (twice)

### 0.1.6
* (bluefox) fix creation of specific states

### 0.1.5
* (bluefox) fix node-eiscp package

### 0.1.4
* (bluefox) add debug outputs

### 0.1.1
* (bluefox) replace git with tarball

### 0.1.0
* (bluefox) update adapter for new concept

### 0.0.4
* (owagner) use verify_commands=false, to be able to send high-level commands to unknown AVR models

### 0.0.3
* (owagner) allow setting of states other than "command". This will trigger a high level
  command with the state name being set to the new value. Note that this will fail for
  many newer models, as they are not yet properly represented in node-eiscp's
  command table. Use the raw command in that case
* send some initial queries upon connect to get basic state information from the AVR

### 0.0.2
* (owagner) support node-eiscp's Autodiscovery mechanism
* (owagner) updated README, notably removing bogus reference to single instancing

### 0.0.1
* (owagner) initial version

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.onkyo/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)
Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>,
              2014-2015 Oliver Wagner <owagner@tellerulam.com>