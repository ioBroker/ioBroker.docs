---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: sYc1FFNyG/KdRyiwudb7H9czCrpySLFq6D5lDISBLTQ=
---
![Логотип](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.kostal-piko-ba?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.kostal-piko-ba?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.kostal-piko-ba?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
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
Он создает и последовательно обновляет несколько состояний, обеспечивая постоянную доступность самой актуальной информации.
Адаптер специально разработан для инверторов Kostal Piko BA, 6.0BA, 8.0BA и 10BA, но также поддерживает широкий спектр других моделей, включая:

- Костал Пико: 3,0, 4,2, 4,6, 5,5, 7,0, 8,5, 10, 12, 15, 17, 20 и 36.
- Костал ПИКО МП: 1,5, 3,0, 3,6.
- Костал ПИКО МП плюс: 1,5-1, 2,0-1, 2,5-1, 3,0-1, 3,0-2, 3,6-1, 3,6-2 и 5,0-2.

Мы будем благодарны за любые отзывы о функциональности с другими инверторами. Пожалуйста, сообщите нам, если вы протестируете его с другими моделями.

## Конфигурация
Убедитесь, что ваш инвертор Piko или Piko BA обновлен до версии Kostal UI 6.11 или выше.
Для подключения к инвертору Kostal Piko (BA / MP plus) необходимо настроить его IP-адрес в параметрах.
При желании вы можете настроить частоту обновления данных в реальном времени, ежедневной статистики и статистики за весь период эксплуатации.
Если ваше оборудование это поддерживает, вы также можете включить отображение четырех аналоговых значений.

## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">в документации Sentry-Plugin</a> !

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=XFFBB332R4RCQ"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете себя щедрым, — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 7.0.5 (2026-07-05)

- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now
- (HombachC) removed chai-based unit test dependencies; modernized test harness to Node.js assert
- (HombachC) updated dependencies

### 7.0.4 (2026-06-19)

- (HombachC) fixed adapterchecker warnings
- (HombachC) updated dependencies

### 7.0.3 (2026-06-03)

- (HombachC) fixed instanceObject roles
- (HombachC) fixed warnings of adapter checker
- (HombachC) updated dependencies

### 7.0.2 (2026-05-17)

- (HombachC) fix tsconfig

### 7.0.1 (2026-05-16)

- (HombachC) update typescript from 5.9.3 to 6.0.3
- (HombachC) fix vulnerability in axios
- (HombachC) update dependencies

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach <Kostal-Piko-BA@homba.ch>

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