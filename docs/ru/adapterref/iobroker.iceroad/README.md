---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iceroad/README.md
title: ioBroker.iceroad
hash: GT3Yk8VYljDheJHLZ3CbH/9itm9a7YYSffuTbSfGcCs=
---
![Логотип](../../../en/adapterref/iobroker.iceroad/docs/de/img/iceroad.png)

![Количество установок](http://iobroker.live/badges/iceroad-installed.svg)
![Текущая версия в стабильном репозитории](http://iobroker.live/badges/iceroad-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.iceroad.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iceroad.svg)

# IoBroker.iceroad
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/iobroker.iceroad/workflows/Test%20and%20Release/badge.svg) [![CodeQL] (https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml)

## Документация
Vorhersage zur vereisten Frontscheibe</br> Bitte die API hier beantragen: https://www.eiswarnung.de/rest-api/ </br>

Прогноз обледенения лобового стекла</br> Пожалуйста, запросите API здесь: https://www.eiswarnung.de/rest-api/ </br> </br> 🇩🇪 [Документация](docs/de/iceroad.md)</br> 🇬🇧 §§ LLLLL_1§§</br>

## Обсуждение и вопросы
[Форум ioBroker](https://forum.iobroker.net/topic/50041/test-adapter-ice-road)</br>

## Адаптер Ice-Road для ioBroker
Это адаптер расписания, который опрашивает текущую ледовую ситуацию через https://eiswarnung.de, например. каждый час.
Основываясь на данных о климате и погоде для вашего местоположения, они накануне вечером рассчитывают, ожидаются ли ледяные окна в вашем районе на следующее утро. Оптимальное время запроса — за 8-10 часов. Если вы хотите выйти из дома в 8 утра, лучше всего использовать прогноз с 22 до 24 часов накануне вечером.</br> </br> Если на адаптере отображается статус «Лед» или «Возможно гололед», это можно получить уведомление. В настоящее время существует несколько встроенных сервисов уведомлений (Telegram, Pushover, WhatsApp, Email, Jarvis, Lovelace, SynoChat). Если статус изменится на «Нет льда», вы также получите уведомление. Кроме того, возможно напоминание, когда статус «Лед» и «Возможно лед» находится в ожидании более X часов. (Может быть установлено в конфигурации). В противном случае для дальнейшей обработки доступны различные точки данных.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.3 (2023-01-20)

-   (ciddi89) Bugfix: reminder doesn't work correctly
-   (ciddi89) Added: name and type for channel folders
-   (ciddi89) Other: Small code improvements

### 1.1.2 (2022-12-23)

-   (ciddi89) handling if no data was received added

### 1.1.1 (2022-12-18)

-   (ciddi89) changed order in table of longitude and latitude

### 1.1.0 (2022-12-18)

-   (ciddi89) added handling for wrong location data (comma to fullstop)
-   (ciddi89) added functionality for reminder notification
-   (ciddi89) updated readme

### 1.0.0 (2022-12-17)

-   (ciddi89) fixed issue messages wasn't sent
-   (ciddi89) increased timeout
-   (ciddi89) BREAKING CHANGE -> rebuild adapter complete. Please save your data and delete the instance before update
-   (ciddi89) drop support for admin 5

### 0.1.1 (2022-10-01)

-   (Apollon77) Make sure adapter stops when he is done

### 0.1.0

-   (Patrick Walther) add locations, add pushover/telegram/mail

### 0.0.1

-   (Patrick Walther) initial release

## License

The MIT License (MIT)

Copyright (c) 2023 Patrick Walther walther-patrick@gmx.net

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
