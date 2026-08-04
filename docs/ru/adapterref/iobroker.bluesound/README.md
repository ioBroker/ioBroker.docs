---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bluesound/README.md
title: ioBroker.bluesound
hash: iV2CHKkj7AxzPdppcXqxwCC+QBN4/7BamJrPp/TP0WI=
---
![Логотип](../../../en/adapterref/iobroker.bluesound/admin/bluesound.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.bluesound.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bluesound.svg)
![Количество установок](https://iobroker.live/badges/bluesound-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/bluesound-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bluesound.png?downloads=true)

# IoBroker.bluesound
[![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/bluesound/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестирование и выпуск](https://github.com/Uwe1958/ioBroker.bluesound/workflows/Test%20and%20Release/badge.svg)

## Адаптер Bluesound для ioBroker
Адаптер для управления устройствами Bluesound

## Включенные функции
Адаптер использует вызовы API в формате: http://--playerIP--:11000/xxx

При запуске предустановки считываются из плеера и добавляются в канал «presets».
Модель и имя плеера хранятся в канале «info».
Во время воспроизведения плеера названия устанавливаются в канале «info».

Состояние игрока опрашивается с интервалом, заданным параметром 'config.pollingtime', а результат сохраняется в файле 'control.state', а также в файле 'info.\*'.

Значения PollingTime до 120 секунд являются разумными. Адаптер не может быть запущен со значениями, превышающими 300 секунд. Значение по умолчанию — 30 секунд.

Параметр timeout задается необязательным параметром 'config.TimeOut' в качестве времени ожидания для вызова API. Значение по умолчанию — 2 секунды.

Реализованы следующие функции:

- Остановка игрока (срабатывает при установке параметра 'control.stop' в значение true)
- Запуск игрока (запускается установкой параметра 'control.start' в значение true)
- Пауза для игрока (запускается установкой параметра 'control.pause' в значение true)
- Воспроизвести Presetxxx (запускается установкой параметра '.presets.preset(x).start' в значение true)
- Изменение громкости (запускается изменением параметра 'control.volume')
- Перемешивание плейлиста (активируется установкой параметра 'control.shuffle' в значение true, переключение режима)
- Перемотка плейлиста вперед (запускается установкой параметра 'control.forward' в значение true)
- Перемотка плейлиста назад (активируется установкой параметра 'control.backward' в значение true)

Добавлена функция просмотра библиотеки LocalMusic. В файле 'info.list' доступен динамический список меню. Этот объект следует установить в качестве 'ID объекта' для таблицы JSON, чтобы визуализировать текущее меню. Объект 'control.command' используется для передачи следующей команды плееру. Он обновляется путем определения его в качестве 'Selected ID' этой таблицы. Сам заголовок таблицы обновляется с помощью 'info.listheader' через привязку объекта к имени первого заголовка. Для лучшей визуализации должен отображаться только первый заголовок, а его ширина должна быть установлена на 100%.

Весь контент отображается вплоть до уровня альбома (за исключением меню «Песни», где песни перечислены напрямую). При выборе альбома его содержимое воспроизводится немедленно, заменяя содержимое текущего плейлиста или добавляясь к нему. Это поведение зависит от значения параметра info.playliststate. Если значение равно true, плейлист заменяется, в противном случае добавляется новое содержимое. Этот объект можно изменить с помощью control.playlist (кнопка с режимом переключения). При каждом нажатии этой кнопки значение info.playliststate инвертируется.

Добавлена функция поиска по библиотеке. Если в поле «control.search» (встроенном в браузер поле) ввести поисковую строку, результат поиска отобразится в поле «info.list», и его можно детализировать, как при просмотре страниц библиотеки.

Теперь также появилась возможность транслировать музыку с радиостанций. Станции организованы в меню, предоставляемом плеером. При выборе станции музыка воспроизводится немедленно.

Содержимое текущего плейлиста доступно в объекте info.playlist (JSON) и может быть визуализировано таким образом. Оно также доступно в виде HTML-таблицы в info.playlisthtml и может быть непосредственно отображено в HTML-виджете. Формат результирующей таблицы можно изменить с помощью CSS.

```javascript
.playlist table {
    background-color: #514d4d;
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-y: auto;
    max-height: 100%;
}
.playlist img {
    margin: 10px;
    height: 50px;
    width:  50px;
}

.playlist .title {
    color: #ffffff;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist .artist {
    color: #888888;
    padding-bottom: 10px;
}

.playlist .current {
    color: #2f9bde;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist div {
    height: 800px;
}
```

## Changelog

### **WORK IN PROGRESS**

- (Uwe Nagel) Amazon service added

### 1.4.0 (2026-07-25)

- (Uwe Nagel) Fixes @types/node version
- (Uwe Nagel) Corrected translation files
- (Uwe Nagel) Bump @iobroker/adapter-core from 3.3.2 to 3.4.1
- (Uwe Nagel) Translation converted to short format
- (dependabot) Bump @iobroker/eslint-config from 2.2.0 to 2.3.4
- (dependabot) Bump axios from 1.16.0 to 1.16.1
- (dependabot) Bump @types/node from 25.6.0 to 25.9.1
- (Uwe Nagel) Radio stations added

### 1.3.1 (2026-06-05)

- (copilot) Adapter requires node.js >= 22 now
- (Uwe Nagel) Code consolidation and update @alcalzone/release-script to 5.2.1
- (Uwe Nagel) Fixed issue 184
- (Uwe Nagel) Fixed issue 152
- (Uwe Nagel) Fixed issue 162

### 1.3.0 (2025-12-03)

- (Uwe Nagel) Library search added
- (Uwe Nagel) Add control.search
- (Uwe Nagel) Add info.playlisthtml
- (Uwe Nagel) Add info.playliststate
- (Uwe Nagel) Function setPlaylistToggle added
- (Uwe Nagel) Add control.playlist
- (Uwe Nagel) Function readPlaylist added
- (Uwe Nagel) Add info.playlist
- (Uwe Nagel) Library browsing added

### 1.2.1 (2025-10-18)

- (Uwe Nagel) Add info.list and control.command
- (Uwe Nagel) Changes according to ioBroker Check
- (Uwe Nagel) Bump @types/node from 24.5.2 to 24.6.1
- (Uwe Nagel) Bump chai from 6.0.1 to 6.2.0
- (Uwe Nagel) Bump typescript from 5.9.2 to 5.9.3
- (Uwe Nagel) Bump mocha from 11.7.2 to 11.7.3
- (Uwe Nagel) Correct error in main.js, update package-lock.json
- (Uwe Nagel) Update io-package.json and package.json
- (Uwe Nagel) Update .vscode/jsonConfig.json and .gitignore
- (Uwe Nagel) Resolve dependency errors
- (Uwe Nagel) Bump mocha from 11.1.0 to 11.7.1
- (Uwe Nagel) Bump globals from 16.2.0 to 16.3.0
- (Uwe Nagel) Bump @types/node from 24.0.8 to 24.1.0
- (Uwe Nagel) Bump typescript from 5.7.3 to 5.9.2
- (Uwe Nagel) Bump chai from 5.2.0 to 5.2.1
- (Uwe Nagel) Further code cleaning (apiclient, getStateAsync)
- (Uwe Nagel) @types/xml2js added
- (Uwe Nagel) Move to eslint 9 and fix subsequent issues

### 1.2.0 (2025-07-24)

- (Uwe Nagel) Logic added to shift playlist forward/backward
- (Uwe Nagel) State roles updated
- (Uwe Nagel) Logic added to shuffle playlist
- (Uwe Nagel) Translated using Weblate (Dutch)
- (Uwe Nagel) Update test-and.release.yml to node 24.x
- (Uwe Nagel) Update testing to minimum node.js version 20

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Uwe Nagel <uwenagel@kabelmail.de>

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