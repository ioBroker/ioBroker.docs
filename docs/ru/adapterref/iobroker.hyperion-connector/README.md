---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hyperion-connector/README.md
title: ioBroker.hyperion-connector
hash: P5rYX2Ca/VKiU/fHUhTtTcYys5k82A8zAiFS7ZFJ+p8=
---
![Логотип](../../../en/adapterref/iobroker.hyperion-connector/admin/hyperion-connector.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.hyperion-connector.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hyperion-connector.svg)
![Количество установок](https://iobroker.live/badges/hyperion-connector-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/hyperion-connector-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.hyperion-connector.png?downloads=true)
![Тестирование и выпуск](https://github.com/ticaki/ioBroker.hyperion-connector/workflows/Test%20and%20Release/badge.svg)

# ioBroker.hyperion-connector

## адаптер hyperion-connector для ioBroker

Подключитесь к серверу hyperion.ng. Проект Hyperion [: https://hyperion-project.org/forum/](https://hyperion-project.org/forum/)

Вскоре после запуска адаптер автоматически выполняет поиск доступных серверов Hyperion в локальной сети. Если он находит такой сервер, он пытается подключиться; если требуется авторизация, он запрашивает токен. Это вызовет появление всплывающего окна в веб-интерфейсе Hyperion, которое необходимо подтвердить. Если соединение не устанавливается после первого подтверждения, подождите 1-2 минуты, и должно появиться еще одно сообщение.

В программу были включены команды, которые я считаю полезными.

Если вам потребуются дополнительные команды, пожалуйста, напишите на форуме или здесь.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
* (ticaki) feat: controls/effect/* — start hyperion effects (name dropdown is auto-populated from serverinfo)
* (ticaki) feat: multi-instance support — per-instance channels under instances/<id>/, instances.json metadata, controls/instance/{setinstance,start,stop} lifecycle commands
* (ticaki) feat: convenience light role — light/{power,brightness,color} as a VIS/Alexa/Google-friendly projection over componentstate LEDDEVICE / adjustment.brightness / color
* (ticaki) feat: writable controls/videomode/mode, controls/processing/mappingType, controls/leddevice/identify
* (ticaki) chore: replaced silent catch blocks with debug logging so failures stop being invisible
* (ticaki) test: added a reusable mock hyperion server (test/mock-hyperion-server.ts) and protocol-level specs (npm run test:hyperion-mock); the existing smoke test (test/integration.js) is unchanged
* (ticaki) docs: added CLAUDE.md with project conventions, architecture map and Hyperion-API quick reference

### 0.2.1 (2025-11-11)
* (ticaki) first latest release
* (ticaki) Clean termination of the adapter

### 0.2.0 (2025-10-27)
* (ticaki) controls: adjustment added
* (ticaki) workaround for buggy subscribe in 2.1.1 (maybe adapter only work with 2.1.1)
* (ticaki) update deps

### 0.1.2 (2025-02-05)
* (ticaki) remove unit from admin
* (ticaki) reduced version requirements for js-controller

### 0.1.1 (2025-01-14)
* (ticaki) Renaming repo
* (ticaki) Adjustable reconnection interval. State to activate accelerated reconnection
* (ticaki) Incoming updates for leds are handled (most updates force a complete update of the data unless I have added code to handle - leds, components, effects so far)
* (ticaki) Added a json data point for priorities to allow better access from the javascript adapter
* (ticaki) Added leds update handling
* (ticaki) remove leds subfolders and write all data into a json datapoint (-500 folder/states for me)
* (ticaki) added controls.system
* (ticaki) add info.connection for adapter and device
* (ticaki) initial release
* (ticaki) initial release

[Older changelogs can be found there](https://github.com/ticaki/ioBroker.hyperion-connector/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 ticaki <github@renopoint.de>

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