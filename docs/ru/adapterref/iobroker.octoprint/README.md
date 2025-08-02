---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.octoprint?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.octoprint?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.octoprint?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.octoprint?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.octoprint?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.octoprint/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.octoprint.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/octoprint-stable.svg
BADGE-Installed: http://iobroker.live/badges/octoprint-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.octoprint/README.md
title: ioBroker.octoprint
hash: H4qRBSp+mVOtQTbgU7iPXEaZb0UlHE+fz4+92pDc2MM=
---
![Логотип](../../../en/admin/octoprint.png)

# IoBroker.octoprint
**Проверено с [OctoPrint](https://github.com/OctoPrint/OctoPrint/releases) 1.10.3**

## Функции
### Информация
- Получить информацию о версии
- Получить информацию о принтере (когда он «работает»)
- Получить информацию о текущем задании на печать (во время ``печати``)
- Получить информацию о списке файлов (когда не выполняется ``печать``)

### Инструменты
- Установить температуру инструмента (в рабочем состоянии)
- Установка температуры кровати (при ``эксплуатации``)
- Выдавливание/Втягивание (в рабочем состоянии)

### Команды
- Принтер: подключение, отключение и возврат домой
- Задание: Запуск, Пауза, Возобновление, Отмена, Перезапуск
- SD-карта: инициализация, обновление, освобождение
- Пользовательские команды принтера
- Системные команды
- Перемещение по осям X, Y и Z
- Выберите файл или распечатайте его

### Поддерживаемые плагины
- [Прогресс отображения слоя](https://github.com/OllisGit/OctoPrint-DisplayLayerProgress) - протестировано с версией 1.28.0 (требуется **версия адаптера 2.1.0** или более поздняя)
- [Миниатюры слайсера](https://github.com/jneilliii/OctoPrint-PrusaSlicerThumbnails) - протестировано с версией 1.0.0 (требуется **версия адаптера 2.2.0** или более поздняя)

## Важный!
НЕ перезапускайте экземпляр OctoPrint (или любой другой экземпляр) с помощью такого кода:

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

Поскольку `API key` является защищенным атрибутом с версии 1.1.0, это приведет к удалению настроенного ключа API. Причина в том, что `getObject` не возвращает защищенную информацию (поэтому ключ API не включен в возвращаемый объект). При сохранении объекта вы сохраните объект без ключа.

Используйте состояние `system.adapter.octoprint.0.alive` для остановки/запуска экземпляра.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 6.0.0 (2025-01-07)

NodeJS >= 20.x and js-controller >= 6 is required

Tested with OctoPrint 1.10.3

### 5.1.0 (2023-10-25)

NodeJS 16.x is required

Tested with OctoPrint 1.9.3

* (klein0r) Added admin icons

### 5.0.1 (2023-05-30)

* (klein0r) Allow self-signed certificates

### 5.0.0 (2023-05-24)

Tested with OctoPrint 1.9.0

* (klein0r) Removed binary states (deprecated)
* (klein0r) Allow self-signed certificates
* (klein0r) Added Ukrainian language

### 4.1.0 (2022-12-14)

Tested with OctoPrint 1.8.6

* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

## License

The MIT License (MIT)

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

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