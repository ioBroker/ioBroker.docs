---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: bD8IPCX1XoUvSvVSiOAA5siHu2+WKbLK/W1qbydFlgA=
---
![Логотип](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.trivum.svg)

# IoBroker.trivum
[![Тестирование и выпуск](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml)

Управляйте многокомнатной аудиосистемой trivum из ioBroker через его локальный XML API.

Немецкая документация: [READMEde.md](READMEde.md)

## Конфигурация
Введите IPv4-адрес trivum MusicCenter. Зоны и элементы управления будут обнаружены автоматически. Интервал опроса и время ожидания HTTP можно настроить; в существующих установках сохраняются исторические ключи конфигурации `adresse` и `option3`.

`Number of paging presets` создает глобальные кнопки постраничной навигации, начиная с ID 0.

## Штаты
Глобальные элементы управления:

- `Global.ALLOFF`: отключить все зоны
- Global.Aktive_zonen: активные зоны, о которых сообщает trivum.
- `Global.PagingN`: запуск предустановки пейджинга N

Каждая обнаруженная зона предоставляет:

- `Muten`: отключить/включить звук
- `DEFAULT_STREAMING`: запустить поток по умолчанию
- `ZONECMD_DEFAULT_TUNER`: запустить тюнер по умолчанию
- `VOLUME`: чтение или установка громкости от 0 до 100 процентов
- `ZONECMD_POWER_OFF`: выключить зону
- `Статус`: текущий статус зоны

Состояния кнопок автоматически сбрасываются после успешного запроса. `info.connection` становится истинным только после успешного ответа trivum, а `info.lastError` хранит последнюю ошибку связи.

## Changelog

### 0.1.0

- Migrated to the current ioBroker adapter template and responsive JSON Config
- Added Node.js 22/24 and js-controller 6 compatibility
- Updated adapter-core, dependencies, linting, tests and release workflows
- Reworked zone discovery, polling, connection state and error handling
- Fixed zone commands to use discovered zone IDs
- Changed volume to a numeric percentage state and prevented overlapping polls

### 0.0.5

- Updated adapter core

## License

Copyright (c) 2021-2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).