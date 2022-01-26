---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.adguard/README.md
title: ioBroker.adguard
hash: ZONWA7AVIU0BWLNsU45LuyHkQCX3Yd5aYmfSxgbXrHs=
---
![Логотип](../../../en/adapterref/iobroker.adguard/admin/adguard.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.adguard.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.adguard.svg)
![Количество установок (последнее)](https://iobroker.live/badges/adguard-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/adguard-stable.svg)
![Статус зависимости](https://img.shields.io/david/o0shojo0o/iobroker.adguard.svg)
![НПМ](https://nodei.co/npm/iobroker.adguard.png?downloads=true)

# IoBroker.adguard
** Тесты: ** ![Тестирование и выпуск](https://github.com/o0shojo0o/ioBroker.adguard/workflows/Test%20and%20Release/badge.svg)

## Адаптер AdGuard для ioBroker
AdGuard Home - это общесетевой DNS-сервер, блокирующий рекламу и трекер, с возможностями родительского контроля (блокировка контента для взрослых). Адаптер AdGuard позволяет вам контролировать и отслеживать свой экземпляр AdGuard Home в ioBroker.

## Конфигурация
1. Создайте новый экземпляр адаптера.
2. Заполните URL / IP с сервера AdGurad.
3. Настройте имя пользователя и пароль.
4. Сохраните настройки.
5. Удачи :)

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.0.8 (2021-08-18)

-   (o0Shojo0o) change UI to JSONConfig

### 0.0.7 (2021-08-01)

-   (o0Shojo0o) better unload handling

### 0.0.6 (2021-08-01)

-   (o0Shojo0o) more resource-efficient handling of the States
-   (o0Shojo0o) better unload handling

### 0.0.5 (2021-07-19)

-   (o0Shojo0o) better background color for dark theme
-   (o0Shojo0o) accept self signed certificate

### 0.0.4 (2021-07-13)

-   (o0Shojo0o) Bugfix dark theme

### 0.0.3 (2021-07-12)

-   (o0Shojo0o) added ratio of blocked queries by filtering queries (ratio_blocked_filtering)
-   (o0Shojo0o) added ratio of blocked queries by safe browsing (ratio_replaced_safebrowsing)
-   (o0Shojo0o) added ratio of blocked queries by parental control (ratio_replaced_parental)
-   (o0Shojo0o) added ratio of all blocked DNS queries (ratio_blocked_total)
-   (o0Shojo0o) added number of all blocked DNS queries (num_blocked_total)

### 0.0.2 (2021-07-11)

-   (o0Shojo0o) first usable version

### 0.0.1

-   (o0Shojo0o) initial release

## License

MIT License

Copyright (c) 2021 Dennis Rathjen <info@bastelbunker.de>

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