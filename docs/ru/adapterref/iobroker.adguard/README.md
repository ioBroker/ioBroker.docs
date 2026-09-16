---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.adguard/README.md
title: ioBroker.adguard
hash: nQL6rbpeWOIG0MuiEdkCJ+hu7hQ09GTHk/UcABT+dpA=
---
![Логотип](../../../en/adapterref/iobroker.adguard/admin/adguard.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.adguard.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.adguard.svg)
![Количество установок (последние)](https://iobroker.live/badges/adguard-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/adguard-stable.svg)
![Статус зависимости](https://img.shields.io/david/o0shojo0o/iobroker.adguard.svg)
![НПМ](https://nodei.co/npm/iobroker.adguard.png?downloads=true)
![Тестирование и выпуск](https://github.com/o0shojo0o/ioBroker.adguard/workflows/Test%20and%20Release/badge.svg)

# ioBroker.adguard

## Адаптер AdGuard для ioBroker

AdGuard Home — это DNS-сервер, блокирующий рекламу и трекеры в масштабах всей сети, с возможностями родительского контроля (блокировка контента для взрослых). Адаптер AdGuard позволяет управлять и отслеживать работу вашего экземпляра AdGuard Home в ioBroker.

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @o0Shojo0o ( <https://github.com/o0Shojo0o> ), который разрабатывал предыдущие версии этого адаптера.

## Как сообщать о проблемах и отправлять запросы на добавление новых функций

В идеале, пожалуйста, используйте для этого раздел "Проблемы" на GitHub, а наилучший способ — установить для адаптера режим отладочного логирования (Экземпляры -> Экспертный режим -> Уровень логирования столбцов). Затем получите файл лога с диска через подкаталог ioBroker 'log', **а не** через административную панель, так как это позволит сократить строки.

## Конфигурация

1. Создайте новый экземпляр адаптера.
2. Введите URL/IP-адрес с сервера AdGurad.
3. Настройте имя пользователя и пароль.
4. Сохраните настройки
5. Веселиться :)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.2.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated.

### 1.1.1 (2026-02-11)
- (mcm1957) Dependencies have been updated.

### 1.1.0 (2025-09-07)
- (mcm1957) Adapter requires admin >= 7.6.17, js-controller >= 6.0.11 and node.js >= 20 now.
- (mcm1957) Dependencies have been updated.

### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.adguard/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <info@bastelbunker.de>

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