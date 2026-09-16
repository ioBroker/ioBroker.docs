---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openmediavault/README.md
title: ioBroker.openmediavault
hash: PIFlilMllP5K4tlwt7+nBxfg4xnUO5spN696H9Ba9tc=
---
![Логотип](../../../en/adapterref/iobroker.openmediavault/admin/openmediavault.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.openmediavault.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.openmediavault.svg)
![Количество установок](https://iobroker.live/badges/openmediavault-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/openmediavault-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.openmediavault.png?downloads=true)
![Тестирование и выпуск](https://github.com/Scrounger/ioBroker.openmediavault/workflows/Test%20and%20Release/badge.svg)

# ioBroker.openmediavault

## Адаптер OpenMediaVault для ioBroker

Этот адаптер позволяет считывать информацию из вашего OpenMediaVault с помощью интерфейса RPC.

## Конфигурация

Вам потребуется URL-адрес вашего сервера OpenMediavault и пароль от вашей учетной записи администратора.<br> **Примечание** : использование учетной записи администратора необходимо, поскольку интерфейс RPC доступен только для администраторов.

## Известные проблемы

Адаптер предотвращает переход жестких дисков в режим ожидания во время циклического опроса и выводит их из режима ожидания по запросу.<br> Причина в том, что это заложено в самой архитектуре RPC API.<br> [Подробнее см.](https://github.com/openmediavault/openmediavault/issues/2063)

Чтобы этого избежать, данные также можно обновлять с помощью задания cron.<br> Например, вы можете запланировать запрос к адаптеру на время, когда жесткие диски и так не находятся в режиме ожидания, например, во время резервного копирования.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.5.0 (2026-07-13)
- (Scrounger) dependencies updated
- (Scrounger) typescript 6.x bug fixes
- (Scrounger) authentication bug fix for >= v.8.5.x #63
- (copilot) Adapter requires node.js >= 22 now
- (ioBrokerTranslator) spanish language added #57

### 1.4.4 (2026-03-17)

- (Scrounger) dependencies updated

### 1.4.3 (2026-03-09)

- (Scrounger) translation updates
- (Scrounger) dependencies updated
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases

### 1.4.2 (2025-12-04)

- (Scrounger) connection timeout bug fix

### 1.4.1 (2025-12-02)

- (Scrounger) session expired bug fix

[Older changelogs can be found there](https://github.com/Scrounger/ioBroker.openmediavault/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Scrounger <scrounger@gmx.net>

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