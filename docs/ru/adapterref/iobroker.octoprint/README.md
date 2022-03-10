---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.octoprint.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.octoprint.svg
BADGE-Stable: http://iobroker.live/badges/octoprint-stable.svg
BADGE-installed: http://iobroker.live/badges/octoprint-installed.svg
BADGE-Dependency Status: https://img.shields.io/david/klein0r/iobroker.octoprint.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/klein0r/ioBroker.octoprint/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.octoprint.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.octoprint/README.md
title: ioBroker.octoprint
hash: aTYwR68R4eY5dXYLeHgdlUJrMnSoz0zuuOcbWfrgxhg=
---
![Логотип](../../../en/adapterref/iobroker.octoprint/../../admin/octoprint.png)

# IoBroker.octoprint
**Протестировано с [Октопринт](https://github.com/OctoPrint/OctoPrint/releases) 1.7.3**

## Функции
### Информация
- Получить информацию о версии
- Получить информацию о принтере (когда «работает»)
- Получить текущую информацию о задании на печать (при ``печати``)
- Получить информацию о списке файлов (когда не ``печать``)

### Инструменты
- Установите температуру инструмента (когда «работает»)
- Установите температуру кровати (когда «работает»)
- Выдавливание/Втягивание (когда "работает")

### Команды
- Принтер: подключи, отключи и домой
- Работа: запуск, пауза, возобновление, отмена, перезапуск
- SD-карта: инициализация, обновление, выпуск
- Пользовательские команды принтера
- Системные команды
- Перемещение по осям X, Y и Z
- Выберите файл или распечатайте его

### Поддерживаемые плагины
- [Отображение хода выполнения слоя] (https://github.com/OllisGit/OctoPrint-DisplayLayerProgress) - протестировано с версией 1.28.0 (требуется **адаптер версии 2.1.0** или новее)
- [Slicer Thumbnails] (https://github.com/jneilliii/OctoPrint-PrusaSlicerThumbnails) - протестировано с версией 1.0.0 (требуется **адаптер версии 2.2.0** или выше)

## Важный!
НЕ перезапускайте свой экземпляр OctoPrint (или любой другой экземпляр) с помощью такого кода:

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

Поскольку `API key` является защищенным атрибутом, начиная с версии 1.1.0, настроенный ключ API будет удален. Причина в том, что `getObject` не возвращает защищенную информацию (поэтому ключ API не включается в возвращаемый объект). Когда вы сохраняете объект, вы сохраняете объект без ключа.

Используйте состояние `system.adapter.octoprint.0.alive`, чтобы остановить или запустить экземпляр.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.2.0 (2022-03-07)

Tested with OctoPrint 1.7.3

* (klein0r) Added print times as readable states (seconds to string)
* (klein0r) Added formatted date when print job will finish
* (klein0r) Added fan speed and feedrate from plugin Display Layer Progress

### 3.1.0 (2022-02-24)

* (klein0r) Calculate date/time when print will be finished
* (klein0r) Renamed ``printjob.progress.printtime_left`` to ``printjob.progress.printtimeLeft`` **(BREAKING CHANGE - CHECK YOUR SCRIPTS AND VIS)**

### 3.0.1 (2022-02-12)

* (klein0r) Updated state roles
* (klein0r) Added hint for Admin 4 configuration

### 3.0.0 (2022-01-19)

* (klein0r) Added printing and operational state

### 2.2.0 (2022-01-15)

* (klein0r) Added plugin support: Slicer Thumbnails

### 2.1.1 (2022-01-14)

* (klein0r) Added: Request timeout in seconds
* (klein0r) Logging improvements

### 2.1.0 (2021-12-28)

* (klein0r) Added HTTPS option
* (klein0r) Fixed Display Layer Progress integration

### 2.0.7 (2021-12-23)

* (klein0r) Added plugin support: Display Layer Progress

### 2.0.6 (2021-12-01)

* (klein0r) Allow to pause/resume printjob

### 2.0.5 (2021-11-18)

* (klein0r) Require new version for translated instance objects
* (klein0r) Fixed timeout issues

### 2.0.4 (2021-11-16)

* (klein0r) Improved API request handling

### 2.0.3 (2021-11-15)

* (klein0r) Translated all objects

### 2.0.2 (2021-11-08)

* (klein0r) Extrude commands

### 2.0.1 (2021-11-06)

* (klein0r) Fixed missing translations

### 2.0.0 (2021-11-04)

* (klein0r) Admin 5 Support **(BREAKING CHANGE - RENAMED TEMPERATURE NAMESPACE)**

### 1.1.2 (2021-09-17)

* (klein0r) Updated file refresh handling

### 1.1.1 (2021-05-27)

* (klein0r) Minor fixes

### 1.1.0 (2021-05-03)

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.0.10 (2021-05-01)

* (klein0r) Fixed printjob state format issues

### 1.0.9 (2021-03-22)

* (klein0r) nodejs 12 required

### 1.0.8 (2021-02-06)

* (klein0r) Avoid constant refresh of file list

### 1.0.7 (2021-01-24)

* (klein0r) Fixed async object creation

### 1.0.6 (2021-01-09)

* (foxriver76) Avoid spamming the same error again and again

### 1.0.5 (2020-12-10)

* (klein0r) Allow to select and print files using objects
* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.4 (2020-12-08)

* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.3 (2020-12-05)

* (klein0r) Fixed filament information (volume and length)

### 1.0.2 (2020-11-27)

* (klein0r) Added name for OctoPrint Instance
* (klein0r) Fixed admin translation issue (syntax error)

### 1.0.1 (2020-11-10)

* (klein0r) Added iobroker sentry

### 1.0.0 (2020-10-29)

* (klein0r) First stable release

### 0.0.6 (2020-08-25)

* (klein0r) Improved error handling

### 0.0.5 (2020-08-21)

* (klein0r) Switched to axios lib (replaced request - deprecated)

### 0.0.4 (2020-05-14)

* (klein0r) Added missing translations
* (klein0r) Changed default port to 80

### 0.0.3 (2020-05-13)

* (klein0r) Updated depencencies

### 0.0.2 (2020-02-26)

* (klein0r) fixed several issues, new class based structure

### 0.0.1 (2018-05-15)

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2022 Matthias Kleine <info@haus-automatisierung.com>

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