---
chapters: {"pages":{"en/adapterref/iobroker.iceroad/README.md":{"title":{"en":"ioBroker.iceroad"},"content":"en/adapterref/iobroker.iceroad/README.md"},"en/adapterref/iobroker.iceroad/docs/en/iceroad.md":{"title":{"en":"iceroad - Adapter to forecast a icy windshield"},"content":"en/adapterref/iobroker.iceroad/docs/en/iceroad.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iceroad/README.md
title: ioBroker.iceroad
hash: 7IUpdxRDqygLjXleVM3t3nTzfiDkKOF9TNIF9gf2Oz0=
---
![Логотип](../../../en/adapterref/iobroker.iceroad/docs/de/img/iceroad.png)

![Количество установок](http://iobroker.live/badges/iceroad-installed.svg)
![Текущая версия находится в стабильном репозитории.](http://iobroker.live/badges/iceroad-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.iceroad.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.iceroad/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml/badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iceroad.svg)

# ioBroker.iceroad

## Документация

Vorhersage zur vereisten Frontscheibe</br> Bitte die API здесь: <https://www.eiswarnung.de/rest-api/></br>

Прогноз погоды: обледенение лобового стекла</br> Запрос на использование API можно отправить здесь: <https://www.eiswarnung.de/rest-api/></br></br> 🇩🇪 [Документация](https://github.com/iobroker-community-adapters/ioBroker.iceroad/blob/main/docs/de/iceroad.md)</br> 🇬🇧 [Документация](/#/docs/adapterref/iobroker.iceroad/docs/en/iceroad.md)</br>

## Обсуждение и вопросы

[Форум ioBroker](https://forum.iobroker.net/topic/50041/test-adapter-ice-road)</br>

## Адаптер Ice-Road для ioBroker

Это адаптер расписания, который ежечасно опрашивает текущую ситуацию с обледенением через <https://eiswarnung.de> . На основе климатических и погодных данных для вашего местоположения он рассчитывает накануне вечером, ожидается ли обледенение окон в вашем районе на следующее утро. Оптимальное время для запроса — за 8-10 часов до поездки. Если вы хотите выйти из дома в 8 утра, лучше всего использовать прогноз с 22:00 до 24:00 накануне вечером.</br></br> Если адаптер отображает статус «Лед» или «Возможно, лед», можно получить уведомление. В настоящее время существует несколько встроенных сервисов уведомлений (Telegram, Pushover, WhatsApp, Email, Jarvis, Lovelace, SynoChat). Если статус меняется на «Нет льда», вы также получаете уведомление. Кроме того, можно получать напоминания, если статус «Лед» и «Возможно, лед» находится в состоянии ожидания более X часов (можно настроить в конфигурации). В противном случае доступны различные точки данных для дальнейшей обработки.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) **CI/CD**: Migrated the project to ESLint 9 with the shared @iobroker/eslint-config and Prettier templates
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Adapter requires node.js 18 now
- (mcm1957) Dependencies have been updated

### 1.2.1 (2023-05-26)

-   (ciddi89) Updated dependecies
-   (ciddi89) increased timeout for axios to ten seconds

### 1.2.0 (2023-02-22)

-   (ciddi89) Updated dependencies

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.iceroad/blob/main/CHANGELOG_OLD.md)

## License

The MIT License (MIT)


Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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