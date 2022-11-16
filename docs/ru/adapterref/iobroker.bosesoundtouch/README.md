---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch
hash: UIuNWeecy5izhYdfQFSTQpoFV4kTaU+3tUfHe/ATGTk=
---
![Логотип](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)

![Количество установок](http://iobroker.live/badges/bosesoundtouch-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.bosesoundtouch.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bosesoundtouch.svg)

# IoBroker.bosesoundtouch
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.bosesoundtouch/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/bosesoundtouch/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер Bose SoundTouch для платформы ioBroker IoT

## Состояния управления
Для управления динамиком можно записать следующие объекты:

| состояние | Описание |
| :---           | :---        |
| ключ | Один из следующих ключей для отправки:<br><br> ИГРАТЬ В<br> ПАУЗА<br> ОСТАНОВКА<br> PREV_TRACK<br> NEXT_TRACK<br> ПАЛЬЦЫ ВВЕРХ<br> THUMBS_DOWN<br> ЗАКЛАДКА<br> СИЛА<br> НЕМОЙ<br> УВЕЛИЧИТЬ ГРОМКОСТЬ<br> УБАВИТЬ ЗВУК<br> ПРЕДУСТАНОВКА_1<br> ПРЕДУСТАНОВКА_2<br> ПРЕДУСТАНОВКА_3<br> ПРЕДУСТАНОВКА_4<br> ПРЕДУСТАНОВКА_5<br> ПРЕДУСТАНОВКА_6<br> AUX_INPUT<br> SHUFFLE_OFF<br> SHUFFLE_ON<br> REPEAT_OFF<br> REPEAT_ONE<br> REPEAT_ALL<br> PLAY_PAUSE<br> ДОБАВИТЬ_ИЗБРАННОЕ<br> REMOVE_FAVORITE<br> INVALID_KEY |
| приглушенный | Отключить или включить звук устройства. |
| на | Включите или выключите устройство. |
| игратьВезде | Определите динамик в качестве мастера зоны и воспроизведите его содержимое на всех остальных динамиках. |
| объем | Изменение громкости устройства от 0 до 100. |

## Информационные состояния
От вашего динамика собирается следующая информация (состояния только для чтения):

### Информация об устройстве
| состояние | Описание |
| :---       | :---        |
| IP-адрес | IP-адрес устройства, обычно тот же, что вы настроили в настройках адаптера. |
| macАдрес | MAC-адрес устройства |
| имя | Имя, которое вы настроили в приложении SoundTouch. |
| тип | Тип устройства (например, SoundTouch 300). |

### Сейчас играет
| состояние | Описание |
| :---       | :---        |
| альбом | Воспроизводимый в данный момент альбом. |
| искусство | URL-адрес исходного изображения. |
| художник | Играющий в настоящее время артист. |
| жанр | Жанр текущего воспроизводимого трека. |
| источник | Тип или название воспроизводимой службы. Чтобы определить, находится ли продукт в режиме ожидания, проверьте, находится ли источник == STANDBY. |
| станция | Название станции или плейлиста. |
| трек | Воспроизводимый в данный момент трек. |

### Пресеты
Следующие состояния присутствуют для каждого из 6 доступных пресетов:

| состояние | Описание |
| :---       | :---        |
| URL-адрес иконки | URL-адрес исходного изображения. |
| имя | Название альбома, станции, плейлиста, песни, телефона и т. д. в зависимости от источника. |
| источник | Тип или имя службы. |

### Зоны
Следующее описание поможет вам создать группы с вашей многокомнатной системой. Поле только для чтения автоматически обновляется устройствами soundtouch, а также при изменении групп самим приложением Soundtouch.

| состояние | Описание |
| :---       | :---        |
| мастер | Отображение MAC-адресов ведомых устройств динамика (разделенных знаком ";") (только для чтения) |
| член | Отображение MAC-адреса мастера этой колонки (только для чтения)|
| добавитьМастерОф| Добавьте MAC-адрес динамика, который вы хотите добавить к этому основному динамику. Также можно поставить более одного динамика (разделить ";").|
| удалитьМастерОф| Добавьте MAC-адрес динамика, который вы хотите удалить из основного динамика. Также можно поставить более одного динамика (разделить ";").|

## Changelog
### 0.10.3 (2022-06-17)
* (Apollon77) Fix crash case reported by Sentry

### 0.10.2 (2022-06-12)
* (Apollon77) Check if adapter is configured properly before trying to connect

### 0.10.1 (2022-06-02)
* (Apollon77) Add Sentry for crash reporting

### 0.10.0 (2021-07-30)
* IMPORTANT: The adapter now requires at least js-controller 2.0
* (Apollon77) Optimize for js-controller 3.3

### 0.9.4 (07.05.2021)
* fixed vulnerability in NPM

### 0.9.3 (02.02.2021)

* transfer of adapter to iobroker-community-adapters

### 0.9.3 (10.01.2021)

* Added elapsed time, duration, status, keys and roles

### 0.9.2 (09.12.2019)

* We don't use adapter.objects anymore

### 0.9.1 (12.05.2019)

* Support for compact mode.
* Fixed bugs found by adapter checker.

### 0.9.0 (23.01.2019)

* Added possibility to change the source.  
  All available sources are listed as states in folder sources and can be used as play buttons.

### 0.2.4 (05.05.2019)

* Core Files/Testing Update and introduce adapter-core

### 0.2.3 (11.11.2018)

* fixed issue #24 "does not start"

### 0.2.2 (03.11.2018)

* Zones: objects moved to sub folder 'zones'

### 0.2.1 (12.10.2018)

* Update now playing info for source Deezer

### 0.2.0 (27.09.2018)

* Add support for zones

### 0.1.9 (07.03.2018)

* Update now playing info for source Amazon

### 0.1.8 (08.02.2018)

* Update now playing info for source Spotify
* now playing: added state 'genre'

### 0.1.7 (04.02.2018)

* fixed crash if no presets are defined

### 0.1.6 (17.01.2018)

* fixed crash if socket connection fails
* added setting: time to reconnect in seconds

### 0.1.5 (06.01.2018)

* added 'TUNEIN' to now playing info
* state playEverywhere falls back to false after activation
* admin/bose.png renamed to admin/bosesoundtouch.png to be shown correctly in adapter list
* added short adapter description in io-package.json

### 0.1.4 (30.12.2017)

* playEverywhere: support multi room (zones) to define one speaker as master for all others

### 0.1.3 (22.12.2017)

* revert last change

### 0.1.2 (22.12.2017)

* fixed typo in package.json

### 0.1.1 (20.12.2017)

* now playing: added state 'art' (URL to cover image if available)
* merged pull request from Apollon77 (basic config files for testing)
* renamed repository to 'ioBroker.bosesoundtouch'

### 0.1.0 (26.11.2017)

* objectChange/stateChange: log level 'debug'
* added 'STORED_MUSIC' to now playing info.

### 0.0.9 (22.11.2017)

* Merge pull request #1 from Apollon77/master: Add testing and fix things...

### 0.0.8 (19.11.2017)

* send value to correct instance when having multiple adapters installed
* first version of README.md

### 0.0.7 (09.11.2017)

* fixed logging in soundtouchsocket.js

### 0.0.6 (09.11.2017)

* renamed main.js to bosesoundtouch.js
* line ending: LF
* strings: single quote

### 0.0.5 and earlier (01.11.2017)

* Initial versions

## License

[The MIT License (MIT)](LICENSE)

Copyright (c) 2019-2022 SwedishChef <swedish.chef@gmx.at>