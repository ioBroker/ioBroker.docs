---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: TkNzrlaPuiWSxDi44H60IfPnfLfcvFyljbVeVnrAoBU=
---
![Логотип](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.youtube?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.youtube?label=npm%20downloads&style=flat-square)
![Уязвимости Snyk для пакета npm](https://img.shields.io/snyk/vulnerabilities/npm/iobroker.youtube?label=npm%20vulnerabilities&style=flat-square)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.youtube?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.youtube?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/klein0r/iobroker.youtube?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/klein0r/iobroker.youtube?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/klein0r/iobroker.youtube?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/klein0r/iobroker.youtube?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/klein0r/iobroker.youtube?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.youtube/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Уязвимости Snyk для репозитория GitHub](https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.youtube?label=repo%20vulnerabilities&logo=github&style=flat-square)
![Бета](https://img.shields.io/npm/v/iobroker.youtube.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/youtube-stable.svg)
![Установлен](http://iobroker.live/badges/youtube-installed.svg)

# IoBroker.youtube
## Версии
Статистика, такая как просмотры, подписчики и видео

## При поддержке
[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-youtube)

## Монтаж
Пожалуйста, используйте «список адаптеров» в ioBroker, чтобы установить стабильную версию этого адаптера. Вы также можете использовать CLI для установки этого адаптера:

```
iobroker add youtube
```

## Документация
[🇺🇸 Документация](./docs/en/README.md)

[🇩🇪 Документация](./docs/de/README.md)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.3.0 (2023-08-28)

* (klein0r) Added customUrl to JSON summary

### 4.2.1 (2023-03-13)

* (klein0r) Video data as JSON

### 4.2.0 (2023-02-03)

* (klein0r) Allow alias or custom url in configuration
* (klein0r) Added request success indicators
* (klein0r) Added Ukrainian language

### 4.1.0 (2022-11-10)

NodeJS >= 14.5 is required

* (klein0r) Fixed issue with unescaped characters in URL (e.g. API key)
* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 4.0.0 (2022-05-29)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Fixed last update time

## License

The MIT License (MIT)

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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