---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.valloxmv/README.md
title: ioBroker.valloxmv
hash: tNjVgq43vlnczmfzNl4UqayZRgRraM7L1puKDRIyrWE=
---
![Логотип](../../../en/adapterref/iobroker.valloxmv/admin/valloxmv.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.valloxmv.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)
![Количество установок](https://iobroker.live/badges/valloxmv-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/valloxmv-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)
![Тестирование и выпуск](https://github.com/hacki11/ioBroker.valloxmv/workflows/Test%20and%20Release/badge.svg)

# ioBroker.valloxmv

## Адаптер ValloxMV для ioBroker

Подключает вашу систему вентиляции Vallox к системе домашней автоматизации ioBroker.

## Использование

- Установите адаптер
- Настройте адрес устройства и интервал опроса (минимум 60).
- Чтение и запись состояний осуществляются как обычно.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-07-18)
- Use latest vallox-api with AUTOMATIC profile support

### 1.6.0 (2026-07-06)
- (copilot) Adapter requires node.js >= 22 now
- Add support for AUTOMATIC profile on firmware 3.1.4 or newer

### 1.5.0 (2026-02-28)
* Update dependencies
* Update minimum node version
* Fix ioBroker issues

### 1.4.1 (2025-04-14)
* Maintenance Release
* Add support for NodeJS 18 as long as iobroker supports
* Add devcontainer for development
* Add release script

### 1.4.0
* Maintenance Release
* Bump engines to NodeJS 20 as minimum version

[Older changelogs can be found there](https://github.com/hacki11/ioBroker.valloxmv/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 hacki11