---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heytech/README.md
title: без названия
hash: vKFiX3EgroG+jWe0agbj0psJ50+4zzEI7tZng73ueX8=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.heytech.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heytech.svg)
![Статус зависимости](https://img.shields.io/david/jey-cee/iobroker.heytech.svg)
![Известные уязвимости](https://snyk.io/test/github/jey-cee/ioBroker.heytech/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heytech.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/jey-cee/ioBroker.heytech/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/jey-cee/ioBroker.heytech?branch=master&svg=true)

<h1><img alt="" src="admin/heytech.png" width="64"/>ioBroker.heytech</h1>

## Адаптер HEYtech для ioBroker
Этот адаптер подключается к контроллеру HEYtech, автоматически получает данные и может управлять выходными сигналами.

## Руководство
Введите IP-адрес, порт и, если задан, PIN-код.
Обычно функцию «Автоматическое определение» можно оставить включенной. Если это не сработает, вы можете выбрать руководство по эксплуатации вашего оборудования.

## Ссылки
[HEYTech](https://rolladensteuerung.de/index.htm)

## Changelog
### 1.1.5 (2026-04-03)
* Bump lodash from 4.17.23 to 4.18.1

### 1.1.4 (2026-04-02)
* (jey-cee) fix some issues found by adapter checker

### 1.1.3 (2026-03-31)
* (jey-cee) automate release

### 1.1.2 (2026-03-31)
* (jey-cee) fix linting errors

### 1.1.1 (2026-03-31)
* (jey-cee) update dependencies
* (jey-cee) update testing
* (jey-cee) fix repochecker issues

### 1.1.0 (2024-09-30)
* (Jey Cee) Delete group objects if the group was removed from configuration
* (Jey Cee) Migrate configuration to JSON Config
* (Jey Cee) Update dependencies
* (Jey Cee) Fix issues found by adapter checker

### 0.2.4 / 0.2.5 / 1.0.0 / 1.0.1
* back to original & updated telnet-rxjs dependency

### 0.2.3 
* brigthness fixes (dot instead of comma) and less state updates

### 0.2.2 
* Telnet Dependency Update für aktuellere Node Versionen

### 0.2.1 
* Minor Bugfix actual brightness

### 0.2.0 
* Update Version

### 0.1.9
* (AnsgarSchulte) Support of Controller Version 1.014p of HEYtech RS874LL

### 0.1.8 
* (AnsgarSchulte) Support of Controller Version 8.027o

### 0.1.7
* (AnsgarSchulte) Set percentage shutter opening above 'percent' state. Definition of shutter groups in order to switch whole rooms at once

### 0.1.6
* (AnsgarSchulte) Bugfixes for stable setStates and shutter detection

### 0.1.5
* telnet connection will automaticly reconnect on refresh intervall to check weather and shutter status

### 0.1.4
* update lux calculation (Thanks to stefan)

### 0.1.3
* update calculation for brightness

### 0.1.2
* added LUX calculation

### 0.1.1
* added travis file

### 0.1.0
* ready for beta test

### 0.0.1
* (Author) initial release

## License
MIT License

Copyright (c) 2019-2026 Jey Cee <jey-cee@live.com>

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