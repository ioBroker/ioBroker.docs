---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: MFeotZ8hkjwmdHiXxk+qNPxZ3kM1dwoMGTw2Ef24lLw=
---
![Логотип](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
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
# IoBroker TeslaFi Adapter – бесшовная интеграция данных Tesla для вашего умного дома
Адаптер TeslaFi обеспечивает легкую интеграцию данных о транспортном средстве из вашего аккаунта TeslaFi в систему ioBroker. Используйте эти данные для улучшения вашего опыта работы с Tesla и оптимизации рабочих процессов домашней автоматизации.

## Почему именно этот адаптер?
Основная цель этого адаптера — интегрировать данные Tesla в ioBroker без прямого запроса систем автомобиля. Используя существующий опрос данных TeslaFi, адаптер избегает дополнительных запросов к автомобилю, сохраняя срок службы батареи и обеспечивая эффективный доступ к данным.

## Функции
Адаптер подключается к API TeslaFi для получения полной информации о вашем автомобиле Tesla и делает эти данные доступными в ioBroker. Все модели Tesla, поддерживаемые TeslaFi, полностью совместимы. В настоящее время доступны следующие категории данных:

- **Тепловое состояние**: сведения о системе терморегулирования и температурах.
- **Состояние батареи**: информация о состоянии батареи, уровне заряда и запасе хода.
- **Состояние транспортного средства**: общее состояние транспортного средства, включая местоположение и общее состояние.
- **Данные о транспортном средстве**: сведения о транспортном средстве, такие как название и VIN-номер.

## Типичные случаи использования
- **Автоматизация**: активируйте действия умного дома на основе текущего состояния вашего Tesla. Например, автоматически регулируйте домашний климат-контроль, когда прибывает автомобиль.
- **Управление энергопотреблением**: оптимизируйте потребление энергии, планируя время зарядки автомобиля и отслеживая состояние аккумулятора непосредственно из ioBroker.
- **Уведомления и отчеты**: настройте оповещения для определенных состояний автомобиля, таких как низкий уровень заряда аккумулятора, завершенные сеансы зарядки или доступные обновления.

## Конфигурация
Настройка адаптера проста:

1. Введите ключ API TeslaFi на экране конфигурации адаптера.
2. Установите желаемый интервал опроса, чтобы настроить частоту обновления данных.

## Совместимость
Адаптер совместим со всеми моделями Tesla, поддерживаемыми TeslaFi. Требуется действующая учетная запись TeslaFi с доступом к API.

## Активная разработка и вклад пользователей
Адаптер TeslaFi активно поддерживается, и дополнительные функции или категории данных могут быть добавлены на основе запросов пользователей. Не стесняйтесь предлагать свои идеи и помогать улучшать адаптер для всего сообщества!

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Для получения дополнительных сведений и информации о том, как отключить отчеты об ошибках, обратитесь к [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry инициируются, начиная с js-controller 3.0.

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете щедрость, подумайте о том, чтобы угостить меня пивом. Ура! :beers:

## Changelog

### 0.4.6 (2024-12-21)

- (hombach) fix chai-as-promised
- (hombach) enrich documentation

### 0.4.5 (2024-12-11)

- (hombach) change some state roles

### 0.4.4 (2024-12-10)

- (hombach) add roles to projectUtils

### 0.4.3 (2024-12-09)

- (hombach) use of ioBroker.setInterval

### 0.4.2 (2024-12-06)

- (hombach) intruduce i18n for translations (#41)

### 0.4.1 (2024-11-28)

- (hombach) intruduce 'iobroker/eslint-config' (#67)
- (hombach) add axios timeout
- (hombach) optimized code stability
- (hombach) fix typo
- (hombach) remove message handler

### 0.4.0 (2024-11-10)

- (hombach) implement managed charging time (#29)
- (hombach) implement battery range
- (hombach) fixed errors in 'time to finish charge'
- (hombach) changed min update interval to 10 sec
- (hombach) fixed typos

### 0.3.0 (2024-11-08)

- (hombach) implement string for time to finish charge (#42)
- (hombach) reorganize data in folders (#43)
- (hombach) show 3rd row seat heater only if 3rd row is available (#40)
- (hombach) implement 'charging_state' (#37)

### 0.2.1 (2024-11-08)

- (hombach) change 'time_to_full_charge' type to number (#38)
- (hombach) total rework of vehicle data parser
- (hombach) set speed to 0 if null in API data (#39)

### 0.2.0 (2024-11-07)

- (hombach) implement raw data state (#26)
- (hombach) implement charger_phases (#28)
- (hombach) implement driver_temp_setting (#31)
- (hombach) implement seat and steeringwheel heater states (#30)

### 0.1.5 (2024-11-06)

- (hombach) harmonize project tools
- (hombach) removed doubled texts in state names

### 0.1.4 (2024-11-01)

- (hombach) fix conversion error

### 0.1.3 (2024-10-30)

- (hombach) fix typo in error text
- (hombach) optimize responsive design
- (hombach) bump dependencies

### 0.1.2 (2024-10-28)

- (hombach) introduce to ioBroker latest repo
- (hombach) bump dependencies

### 0.1.1 (2024-10-26)

- (hombach) fix npm error

### 0.1.0 (2024-10-26)

- (hombach) first working version

### 0.0.1 (2024-10-24)

- (hombach) initial release

## License

MIT License

Copyright (c) 2024 C.Hombach <TeslaFi@homba.ch>

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