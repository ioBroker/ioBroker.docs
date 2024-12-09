---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bluesound/README.md
title: ioBroker.bluesound
hash: /O+2fIywwC0gCu62kERdqXvRZk3g/q1KfPeSEqIHI6g=
---
![Логотип](../../../en/adapterref/iobroker.bluesound/admin/bluesound.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.bluesound.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bluesound.svg)
![Количество установок](https://iobroker.live/badges/bluesound-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/bluesound-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bluesound.png?downloads=true)

# IoBroker.bluesound
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/bluesound/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тест и выпуск](https://github.com/Uwe1958/ioBroker.bluesound/workflows/Test%20and%20Release/badge.svg)

## Bluesound адаптер для ioBroker
Адаптер для управления устройствами Bluesound

## Включенные функции
Адаптер использует вызовы API в формате: http://--playerAPI--:11000/xxx

Параметр тайм-аута задается необязательным параметром 'config.TimeOut' как тайм-аут для вызова API. Значение по умолчанию — 2 секунды.

При запуске предустановки считываются и добавляются в канал «presets».
Модель и имя проигрывателя сохраняются в канале «info».
Когда проигрыватель воспроизводится, заголовки устанавливаются в канале «info».

Статус игрока опрашивается с интервалом, установленным параметром «config.pollingtime», а результат сохраняется в «control.state», а также в «info.\*».

Значения PollingTime до 120 секунд являются разумными. Адаптер не может быть запущен со значениями больше 300 секунд. Значение по умолчанию — 30 секунд.

Реализованы следующие функции:

- Остановка игрока (активируется установкой 'control.stop' в значение true)
- Запуск проигрывателя (запускается установкой «control.start» в значение true)
- Пауза проигрывателя (активируется установкой «control.pause» в значение true, режим переключения)
- Воспроизвести Presetxxx (запускается установкой '.presets.preset(x).start' в значение true)
- Изменение громкости (запускается изменением «control.volume»)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2024-12-01)

-   (Uwe Nagel) README.md cosmetics
-   (Uwe Nagel) Added Weblate translation badge
-   (Uwe Nagel) Bump cross-spawn from 7.0.3 to 7.0.6
-   (Uwe Nagel) Switch to adapter-core3.2.2
-   (Uwe Nagel) Corrected logic for remote volume changes

### 1.1.0 (2024-10-19)

-   (Uwe Nagel) Potentially invalid characters are replaced before creating an object
-   (Uwe Nagel) setTimeout used instead of setInterval, clearTimeout added
-   (Uwe Nagel) Check values for PollingTime and TimeOut
-   (Uwe Nagel) Missing sizes added
-   (Uwe Nagel) State roles reevaluated
-   (Uwe Nagel) subscribeState calls eliminated
-   (Uwe Nagel) Instance prefixes in ObjectIds are omitted when calling setState()
-   (Uwe Nagel) State change now honors ack flag
-   (Uwe Nagel) PollingTime and TimeOUT changed to type number
-   (Uwe Nagel) onReady() stopped when no IP is set
-   (Uwe Nagel) Testing extended to node 22.x
-   (Uwe Nagel) Example code removed

### 1.0.3 (2024-09-26)

-   (Uwe Nagel) Parsing of /State corrected

### 1.0.2 (2024-09-19)

-   (Uwe Nagel) Modified due to adapter checks

### 1.0.1 (2024-05-24)

-   (Uwe Nagel) Added config descriptions
-   (Uwe Nagel) Added translations for object descriptions
-   (Uwe Nagel) Added role definition for all objects
-   (Uwe Nagel) Added Timeout config Parameter

### 1.0.0 (2024-05-17)

-   (Uwe Nagel) initial release

## License

MIT License

Copyright (c) 2024 Uwe Nagel <uwenagel@kabelmail.de>

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