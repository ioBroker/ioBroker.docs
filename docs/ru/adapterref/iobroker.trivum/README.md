---
chapters: {"pages":{"en/adapterref/iobroker.trivum/README.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/README.md"},"en/adapterref/iobroker.trivum/READMEde.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/READMEde.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: DJdf6kaQvJ9pAxMTT655m2wwgva6OZDgs0763u6av9g=
---
![Логотип](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.trivum.svg)
![Тестирование и выпуск](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.trivum

Управляйте многокомнатной аудиосистемой trivum из ioBroker через его локальный XML API.

Документация на немецком языке: [READMEde.md](/#/docs/adapterref/iobroker.trivum/READMEde.md)

## Конфигурация

Введите IPv4-адрес trivum MusicCenter. Зоны и элементы управления будут обнаружены автоматически. Интервал опроса и время ожидания HTTP можно настроить; в существующих установках сохраняются исторические значения.`adresse` и`option3` ключи конфигурации.

`Number of paging presets` Создает глобальные кнопки постраничной навигации, начиная с ID 0.

## Штаты

Глобальные элементы управления:

- `Global.ALLOFF` : выключить все зоны
- `Global.Aktive_zonen` : активные зоны, о которых сообщает компания Trivum
- `Global.PagingN` : начать пейджинг, предустановка N

Каждая обнаруженная зона предоставляет:

- `Muten` : включить/выключить звук
- `DEFAULT_STREAMING` : запустить поток по умолчанию
- `ZONECMD_DEFAULT_TUNER` : запустить тюнер по умолчанию
- `VOLUME` : установить громкость от 0 до 100 процентов
- `ZONECMD_POWER_OFF` : выключить зону
- `Status` : текущий статус зоны

Состояние кнопок автоматически сбрасывается после успешного запроса.`info.connection` становится истинным только после успешного тривума, в то время как`info.lastError` Сохраняет последнюю ошибку связи.

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

MIT License. See [LICENSE](https://github.com/TheBam1990/ioBroker.trivum/blob/master/LICENSE).