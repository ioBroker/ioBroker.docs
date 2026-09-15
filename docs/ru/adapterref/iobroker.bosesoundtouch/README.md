---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch
hash: 6hxSpZMtQHk3p4URmK6dT02kgheJvPWeMyWSBPHLTSI=
---
![Логотип](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)

![Количество установок](http://iobroker.live/badges/bosesoundtouch-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.bosesoundtouch.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.bosesoundtouch/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/bosesoundtouch/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bosesoundtouch.svg)

# ioBroker.bosesoundtouch

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Адаптер Bose SoundTouch для платформы ioBroker IoT

## Контрольные государства

Для управления динамиком можно использовать следующие объекты:

| Состояние         | Описание                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ключ              | Для отправки используйте один из следующих ключей:<br><br> ИГРАТЬ<br> ПАУЗА<br> ОСТАНАВЛИВАТЬСЯ<br> PREV\_TRACK<br> СЛЕДУЮЩИЙ\_ТРЕК<br> НЕДУРНО<br> THUMBS\_DOWN<br> ЗАКЛАДКА<br> ВЛАСТЬ<br> НЕМОЙ<br> УВЕЛИЧЕНИЕ ГРОМКОСТИ<br> УМЕНЬШЕНИЕ ГРОМКОСТИ<br> ПРЕСЕТ\_1<br> ПРЕСЕТ\_2<br> ПРЕСЕТ\_3<br> PRESET\_4<br> PRESET\_5<br> PRESET\_6<br> AUX\_INPUT<br> SHUFFLE\_OFF<br> SHUFFLE\_ON<br> ПОВТОРИТЬ\_ВЫКЛ<br> ПОВТОРИТЬ\_ОДИН<br> ПОВТОРИТЬ ВСЕ<br> PLAY\_PAUSE<br> ДОБАВИТЬ В ИЗБРАННОЕ<br> УДАЛИТЬ\_ИЗБРАННОЕ<br> INVALID\_KEY |
| приглушенный      | Включить или выключить звук на устройстве.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| на                | Включение и выключение устройства.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| играть везде      | Назначьте динамик в качестве главного динамика зоны и воспроизводите его содержимое на всех остальных динамиках.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| объем             | Изменяйте громкость устройства в диапазоне от 0 до 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| прямая трансляция | Воспроизведение аудиопотока в режиме реального времени по протоколу HTTP/HTTPS. Например: <http://liveradio.swr.de/sw282p3/swr3/play.mp3>                                                                                                                                                                                                                                                                                                                                                                                           |

## Информационные государства

Следующая информация собирается с вашего устройства (в режиме только для чтения):

### Информация об устройстве

| Состояние  | Описание                                                                  |
| :--------- | :------------------------------------------------------------------------ |
| ipAddress  | IP-адрес устройства, обычно тот же, что вы указали в настройках адаптера. |
| macAddress | MAC-адрес устройства                                                      |
| имя        | Имя, которое вы указали в приложении SoundTouch.                          |
| тип        | Тип устройства (например, SoundTouch 300).                                |

### Сейчас играет

| Состояние   | Описание                                                                                                                                                                |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| альбом      | Альбом, который играет в данный момент.                                                                                                                                 |
| искусство   | URL-адрес исходного изображения.                                                                                                                                        |
| художник    | Исполнитель, чей альбом играет в данный момент.                                                                                                                         |
| жанр        | Жанр воспроизводимой в данный момент композиции.                                                                                                                        |
| источник    | Тип или название воспроизводимого сервиса. Чтобы определить, находится ли устройство в режиме ожидания, проверьте, равно ли значение параметра source значению STANDBY. |
| станция     | Название станции или плейлиста.                                                                                                                                         |
| отслеживать | Текущая воспроизводимая композиция.                                                                                                                                     |

### Предустановки

Для каждого из 6 доступных предустановленных режимов присутствуют следующие состояния:

| Состояние | Описание                                                                                   |
| :-------- | :----------------------------------------------------------------------------------------- |
| iconUrl   | URL-адрес исходного изображения.                                                           |
| имя       | Название альбома, станции, плейлиста, песни, номера телефона и т. д. зависит от источника. |
| источник  | Тип или название услуги.                                                                   |

### Зоны

Следующее описание поможет вам создавать группы в вашей многокомнатной системе. Поля, доступные только для чтения, автоматически обновляются устройствами Soundtouch, даже если вы изменяете группы через само приложение Soundtouch.

| Состояние      | Описание                                                                                                                                                             |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| мастерОф       | Отображение MAC-адресов подчиненных устройств динамика (разделенных символом ";") (только для чтения)                                                                |
| член           | Отобразить MAC-адрес основного устройства этого динамика (только для чтения)                                                                                         |
| addMasterOf    | Укажите MAC-адрес динамика, который вы хотите подключить к этому основному динамику. Также можно подключить более одного динамика (разделив адрес точкой с запятой). |
| removeMasterOf | Укажите MAC-адрес динамика, который вы хотите отключить от этого основного динамика. Также можно подключить более одного динамика (разделив точкой с запятой).       |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.13.0 (2026-07-11)
- (JR-home) Control objects have been extended to suppiort playing a livestream directly
- (mcm1957) Deprecated delete state has been migrated.
- (mcm1957) Dependencies have been updated

### 0.12.0 (2026-05-09)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated
- (copilot) Migrated to ESLint 9 and @iobroker/eslint-config following ioBroker community standards

### 0.11.1 (2024-04-03)
* (mcm1957) Release workflow has been fixed

### 0.11.0 (2024-04-03)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Testing has been changed to support node 18 and 20
* (mcm1957) Dependencies have been updated

### 0.10.3 (2022-06-17)
* (Apollon77) Fix crash case reported by Sentry

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.bosesoundtouch/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2022 SwedishChef <swedish.chef@gmx.at>

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