---
chapters: {"pages":{"en/adapterref/iobroker.omron-fins/README.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/README.md"},"en/adapterref/iobroker.omron-fins/READMEde.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/READMEde.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.omron-fins/README.md
title: ioBroker.omron-fins
hash: 58SeRsjT3l+UdWVFTe8D0SPIZMQpiMSK7xhQxnVvXS4=
---
![Логотип](../../../en/adapterref/iobroker.omron-fins/admin/omron-fins.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.omron-fins.svg)
![Тестирование и выпуск](https://github.com/TheBam1990/ioBroker.omron-fins/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.omron-fins

Подключайте ПЛК Omron CP, CV, CS, CJ, NJ и совместимые с ними ПЛК NX к ioBroker, используя протокол FINS по UDP или TCP.

Документация на немецком языке: [READMEde.md](/#/docs/adapterref/iobroker.omron-fins/READMEde.md)

## Конфигурация

Настройте IP-адрес ПЛК и порт FINS (обычно`9600` ), протокол и интервал опроса на странице администрирования адаптивного адаптера. Значения целевого/исходного узла могут оставаться неизменными.`0` для автоматической адресации, если только сеть ПЛК не требует явной маршрутизации FINS.

Переменные можно вводить вручную, указывая уникальное имя, FINS-адрес и тип данных. Поддерживаемые примеры включают:`CIO0.00` (или наследие)`CB0:00` ),`W31.00` ,`H0.01` ,`A0.00` ,`D100` таймеры и счетчики.

Каждая переменная становится доступным для записи состоянием ioBroker, если опция записи не отключена. Запись подтверждается только после успешного выполнения запроса FINS.

## импорт таблицы символов CX-Programmer

Экспортируйте таблицу символов из CX-Programmer в формате CSV или в виде текста с разделителями-табуляторами и вставьте ее содержимое в соответствующее поле конфигурации. Адаптер распознает заголовки с именами/адресами/типами данных на английском и немецком языках и автоматически импортирует символы. Поддерживаются разделители: запятая, точка с запятой и табуляция. Переменные, заданные вручную, переопределяют импортированные символы с тем же именем.

## Поиск неисправностей

- `info.connection` Это утверждение справедливо только после успешной реакции ПЛК.
- `info.lastError` Содержит информацию о последней ошибке связи или конфигурации.
- Проверьте порт UDP/TCP 9600 и настройки FINS/ETN ПЛК.
- Если автоматическая адресация узлов не удалась, явно настройте DA1 и SA1.

## Changelog

### 0.1.0

- Updated for Node.js 22/24, js-controller 6 and current adapter-core
- Replaced the legacy administration page with responsive JSON Config
- Added UDP/TCP, timeout and FINS node settings
- Added automatic CX-Programmer CSV/TSV symbol table import
- Prevented overlapping polls and added reliable connection/error handling
- Updated tests, linting, release and Dependabot workflows

### 0.0.2

- Improved cyclic polling

[Older changelogs can be found there](https://github.com/TheBam1990/ioBroker.omron-fins/blob/master/CHANGELOG_OLD.md)

## License

Copyright (c) 2021-2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](https://github.com/TheBam1990/ioBroker.omron-fins/blob/master/LICENSE).