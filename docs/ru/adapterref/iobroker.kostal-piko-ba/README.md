---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: CG7zT6steqVPVFubw52Nx9uNu0BnoA7E+iyf6qzLvgI=
---
![Логотип](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba?label=npm%20downloads&style=flat-square)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.kostal-piko-ba?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.kostal-piko-ba?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.kostal-piko-ba?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.kostal-piko-ba/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![Бета](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/kostal-piko-ba-stable.svg)
![Установлено](https://iobroker.live/badges/kostal-piko-ba-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
[![CodeQL](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)

## Версии
## Адаптер для чтения данных Kostal Piko и Piko BA для iOBroker
Этот адаптер позволяет считывать данные с инверторов Kostal Piko, Piko BA и PIKO MP plus.
Он создает и последовательно обновляет несколько состояний, гарантируя, что последняя информация всегда доступна.
Адаптер специально разработан для инверторов Kostal Piko BA, 6.0BA, 8.0BA и 10BA, но он также поддерживает широкий спектр других моделей, включая:

- Костал Пико: 3,0, 4,2, 4,6, 5,5, 7,0, 8,5, 10, 12, 15, 17, 20 и 36.
- Костал ПИКО МП: 1,5, 3,0, 3,6.
- Костал ПИКО МП плюс: 1,5-1, 2,0-1, 2,5-1, 3,0-1, 3,0-2, 3,6-1, 3,6-2 и 5,0-2.

Мы ценим любые отзывы о функциональности с другими инверторами. Пожалуйста, отправьте нам сообщение, если вы протестируете его с дополнительными моделями.

## Конфигурация
Убедитесь, что ваш инвертор Piko или Piko BA обновлен до версии Kostal UI 6.11 или выше.
Для подключения к инвертору Kostal Piko (BA / MP plus) необходимо настроить его IP-адрес в настройках.
При желании вы можете настроить частоту обновления для данных в реальном времени, ежедневной статистики и статистики за весь срок службы.
Если ваше оборудование поддерживает это, вы также можете включить считывание четырех аналоговых значений.

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Для получения дополнительных сведений и информации о том, как отключить отчеты об ошибках, обратитесь к [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry инициируются, начиная с js-controller 3.0.

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=XFFBB332R4RCQ"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете щедрость, подумайте о том, чтобы угостить меня пивом. Ура! :beers:

## Changelog

### 4.2.0 (2024-08-xx)

-   (HombachC) convert adapter to TypeScript
-   (HombachC) switch to ES2022 code
-   (HombachC) migrate eslint to >9.x
-   (HombachC) repository cleanup
-   (HombachC) dependency updates
-   (HombachC) code optimizations

### 4.1.3 (2024-08-13)

-   (HombachC) fixed vulnerability in dependency

### 4.1.2 (2024-08-10)

-   (HombachC) optimized translation handling
-   (HombachC) hide not used configuration inputs

### 4.1.1 (2024-08-09)

-   (HombachC) adapter checker detected optimizations (#643)

### 4.1.0 (2024-08-05)

-   (HombachC) replaced deprecated ioBroker state calls
-   (HombachC) doku cleanup

### 4.0.2 (2024-08-04)

-   (HombachC) added node.js 22 tests
-   (HombachC) dependency updates

### 4.0.1 (2024-06-24)

-   (HombachC) dependency updates, removed unfunctional snyk tests

### 4.0.0 (2024-04-21)

-   (HombachC) BREAKING: Dropped support for Node.js 16 (#591)
-   (HombachC) BREAKING: Minimum needed js-controller bumped to 5 (#592)
-   (HombachC) changed timeout settings for older Kostal inverters (#589)
-   (HombachC) dependency updates
-   (HombachC) added tests for node.js 21
-   (HombachC) raised minimum poll time for daily statistics
-   (HombachC) code optimizations

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2024 C.Hombach <Kostal-Piko-BA@homba.ch>

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