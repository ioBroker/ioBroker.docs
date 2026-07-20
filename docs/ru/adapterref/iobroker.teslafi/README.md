---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: KhgkAlZZc0UTF1M0lHLFVxmCTUDao3rnXFVGnOEKgYg=
---
![Логотип](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/teslafi-stable.svg)
![Установлено](https://iobroker.live/badges/teslafi-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)

# IoBroker.teslafi
[![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml)

## Версии
## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">в документации Sentry-Plugin</a> !

## Адаптер ioBroker TeslaFi – Бесшовная интеграция данных Tesla для вашего умного дома
Адаптер TeslaFi обеспечивает простую интеграцию данных об автомобиле из вашей учетной записи TeslaFi в систему ioBroker. Используйте эти данные для улучшения работы с Tesla и оптимизации процессов домашней автоматизации.

## Зачем нужен этот адаптер?
Основная цель этого адаптера — интегрировать данные Tesla в ioBroker без прямого запроса к системам автомобиля. Используя существующую систему опроса данных TeslaFi, адаптер избегает дополнительных запросов к автомобилю, экономя заряд батареи и обеспечивая эффективный доступ к данным.

## Функции
Адаптер подключается к API TeslaFi для получения исчерпывающей информации о вашем автомобиле Tesla и делает эти данные доступными в ioBroker. Все модели Tesla, поддерживаемые TeslaFi, полностью совместимы. В настоящее время доступны следующие категории данных:

- **Тепловое состояние**: Анализ системы терморегулирования и температурных режимов.
- **Состояние батареи**: Информация о состоянии батареи, уровне заряда и дальности хода.
- **Состояние транспортного средства**: Общее состояние транспортного средства, включая его местоположение и общее состояние.
- **Данные об автомобиле**: Подробная информация об автомобиле, такая как название и VIN.

## Типичные сценарии использования
- **Автоматизация**: Запускайте действия умного дома на основе состояния вашего Tesla в режиме реального времени. Например, автоматически регулируйте климат-контроль дома, когда автомобиль прибудет.
- **Управление энергопотреблением**: Оптимизируйте потребление энергии, планируя время зарядки автомобиля и отслеживая состояние батареи непосредственно через ioBroker.
- **Уведомления и отчеты**: Настройте оповещения о конкретных состояниях автомобиля, таких как низкий уровень заряда батареи, завершенные сеансы зарядки или доступные обновления.

## Конфигурация
Настройка адаптера очень проста:

1. Введите свой API-ключ TeslaFi на экране конфигурации адаптера.
2. Установите желаемый интервал опроса, чтобы настроить частоту обновления данных.

## Совместимость
Адаптер совместим со всеми моделями Tesla, поддерживаемыми TeslaFi. Для работы требуется действующая учетная запись TeslaFi с доступом к API.

## Активная разработка и вклад пользователей
Адаптер TeslaFi активно поддерживается, и по запросам пользователей могут быть добавлены дополнительные функции или категории данных. Не стесняйтесь предлагать свои идеи и помогать улучшать адаптер для всего сообщества!

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете себя щедрым, — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-07-05)

- (hombach) removed unneeded test devDependencies (chai, sinon-chai, proxyquire) and switched tests to Node.js assert
- (hombach) updated axios

### 3.0.2 (2026-06-19)

- (hombach) fixed warnings by adapter checker

### 3.0.1 (2026-06-05)

- (hombach) upgraded TypeScript to 6.x
- (hombach) fixed warnings by adapter checker
- (hombach) updated dependencies

### 3.0.0 (2026-05-05)

- (copilot) BREAKING: adapter requires node.js >= 22 now
- (hombach) update dependencies

### 2.0.7 (2026-04-12)

- (hombach) switch to ES2023 code
- (hombach) fix vulnerability in axios
- (hombach) update dependencies

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 C.Hombach <TeslaFi@homba.ch>

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