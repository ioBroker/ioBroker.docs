---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: RYTAE/euay/O+nj0qsz90/v9NnoupLautlQcL4dLxbU=
---
![Логотип](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Количество установок](http://iobroker.live/badges/ebus-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.ebus.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.ebus.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.ebus?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.ebus?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.ebus?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)

# ioBroker.ebus

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Этот адаптер читает

- Данные из ebusd с использованием HTML. В этом случае ebusd должен быть запущен и иметь возможность отправлять данные, например, в Explorer через <http://IP:port/data> ( <http://192.168.0.123:8889/data> ). Текущую версию ebusd, включая файлы конфигурации, можно скопировать с [https://github.com/john30/ebusd.](https://github.com/john30/ebusd) Все поля с данными, lastup и из глобального раздела анализируются. Все остальные поля в данный момент игнорируются.

Существует возможность опрашивать данные, которые не опрашиваются ebusd напрямую. Команда 'read -f' используется для принудительного чтения через ebus.

Ещё одна функция — отправка любой команды в ebusd и получение ответа для работы, например, со скриптами.

**Внимание!** В версии 22.1 путь к файлу конфигурации ebusd изменен на <http://cfg.ebusd.eu/> . Убедитесь, что вы изменили его в настройках вашей установки ebusd. Подробности см. в [журнале изменений.](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## как отправлять команды в ebusd

1. Запишите одну команду или список команд в точку данных ebus.0.cmd. Если вы хотите использовать более одной команды, используйте запятую для разделения отдельных команд. Пример: read -f YieldTotal,read LegioProtectionEnabled,read -f -c broadcast outsidetemp

2. После выполнения команды вы получите результаты по каждой команде в точке данных ebus.0.cmdResult. Результат также будет разделен запятыми, например: 2000, ERR: element not found, 10.5

Внимание: команда в файле datapoint ebus.0.cmd удаляется после выполнения команды!

## Установка / Обновление

Пожалуйста, следуйте инструкциям по установке ebusd, размещенным в [вики.](https://github.com/john30/ebusd/wiki/1.-Build-and-install)

В файле /opt/iobroker/node\_modules/iobroker.ebus/lib/scripts вы найдете скрипты для установки и обновления SBFspot в системах на базе Debian.

## известные проблемы

- Пожалуйста, создавайте запросы на [GitHub](https://github.com/rg-engineering/ioBroker.ebus/issues) , если обнаружите ошибки или пожелаете добавить новые функции.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (René) Update dependencies


### 4.0.4 (2026-07-11)
* (copilot) Adapter requires node.js >= 22 now
* (René) Update dependencies and some additional changes based on adapter checker

### 4.0.3 (2026-04-12)
* (René): bug fix see issue #517: avoid crash when using external command

### 4.0.2 (2026-04-11)
* (René): bug fix see issue #513: under some conditions admin page was not available

### 4.0.1 (2026-04-06)
* (René): admin rewitten based on react
* (René): see issue #470: table of polled datapoints can now be filled from existing datapoints in ebusd again
* (René): adapter rewritten in typescript

### 3.8.0 (2026-03-17)
* (René): avoid exception, reported by sentry
* (René) update dependencies + changes based on adapter checker
* (René) see issue #497: support of ebusd 26.1

[Older changelogs can be found there](https://github.com/rg-engineering/ioBroker.ebus/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2017-2026 René G. <info@rg-engineering.eu>

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