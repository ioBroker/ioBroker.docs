---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: /u7lTibuTChR3pNxT1eoPHUWSPRhIN6Jie1/3qqnl60=
---
![версия НПМ](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![Количество установок](https://iobroker.live/badges/bambulab-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/bambulab-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)

<img src="admin/bambulab.png" alt="Логотип" width="200"/>

# IoBroker.bambulab
**Тесты:** ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## Адаптер Bambulab 3D-печати для ioBroker
## Начиная
Благодаря этому адаптеру [kmxak](https://forum.iobroker.net/user/kmxak), [djalexz](https://forum.iobroker.net/user/djalexz), все остальные, кто участвует и вдохновляется [этой темой форума](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration) вы сможете интегрировать 3D-принтеры Bambulab в ioBroker.

Укажите IP-адрес принтера, API-токен и серийный номер в настройках адаптера. Эти данные необходимы для локального подключения к принтеру (без использования облака).
Эти учётные данные хранятся локально и не передаются третьим лицам.

## Поиск токена API и серийного номера
Расположение API-токена и серийного номера зависит от модели вашего принтера:

### Серия A1/A1 mini
1. Перейдите в **Настройки** → **Сеть** на дисплее принтера.
2. Включите **Только режим LAN»** (ну и Lan-Modus).
3. После включения будут отображены IP-адрес, токен доступа и серийный номер.

### Серия P1S
1. Перейдите в **Настройки** → **Сеть** на дисплее принтера.
2. Токен доступа виден непосредственно в настройках сети (режим локальной сети не требуется)
3. Серийный номер можно найти в том же меню или в информации об устройстве.

### Серия X1/X1C
1. Перейдите в **Настройки** → **Сеть** на дисплее принтера.
2. Токен доступа виден непосредственно в настройках сети.
3. Серийный номер можно найти в том же меню или в информации об устройстве.

**Примечание:** Необходимо правильно выбрать модель принтера в настройках адаптера. Только серия X1 поддерживает push-уведомления, для серии P1x требуется запрашивать сообщения с заданным интервалом (по умолчанию каждые 5 секунд).

## Поддерживаемые модели
| Модель принтера | Статус |
|---------------|-------------------------|
| АМС | :white_check_mark: |
| A1 | :white_check_mark: |
| P1p | :white_check_mark: |
| P1s | :white_check_mark: |
| X1 | :white_check_mark: |

## Поддерживаемые команды
| Команда | X1C | X1 | P1P | P1S | A1 |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|--------------------------|
| Пользовательский g-код | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Пауза | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Резюме | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Стоп | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Fan-Aux | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :x: Аппаратная поддержка отсутствует |
| Вентиляторная камера | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :x: Аппаратная поддержка отсутствует |
| Fan-ToolHead | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :white_check_mark: |
| Световая камера | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :white_check_mark: |
| Light-Logo | :white_check_mark: | :white_check_mark: | :x: Нет аппаратной поддержки | :x: Нет аппаратной поддержки | :x: Нет аппаратной поддержки |
| Температура-кровать | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Температура-Сопло | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Уровень скорости | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

## Список дел
[ ] Реструктурировать/дополнить текущие состояния элементов управления в папке элементов управления [ ] Оптимизировать определения атрибутов состояний

## Поддержи меня
Если вам нравится моя работа, пожалуйста, рассмотрите возможность личного пожертвования (это персональная ссылка для пожертвований для DutchmanNL, не имеющая никакого отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и какие данные передаются на серверы этой компании?
Sentry.io — это сервис, позволяющий разработчикам получать обзор ошибок в своих приложениях. Именно это и реализовано в этом адаптере.

При сбое адаптера или возникновении любой другой ошибки кода это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry.

Если вы разрешаете iobroker GmbH собирать диагностические данные, то также указывается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, например, адреса электронной почты, имени или чего-либо подобного).
Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей столкнулись с такой ошибкой.
Всё это помогает мне создавать безошибочные адаптеры, которые практически никогда не выходят из строя.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.2 (2025-09-16)
* (DutchmanNL) Improve error messages if printer is offline or not reachable. #xxx
* (DutchmanNL) Solve several type definition issues. #203, #202, #201, #200, #199, #198
* (DutchmanNL & Copilot) Fix type conversion errors by replacing deprecated `tonumber` with proper `TOINTEGER`/`TOFLOAT` modifiers. #197
* (DutchmanNL & Copilot) Add missing state attribute definitions for HD2 printer during printing (height, platform, tool, mapping). Fixes #194

### 0.4.1 (2025-09-13)
* (DutchmanNL & Copilot) Fix HMS error code translations timeout error handling (#183)
* (DutchmanNL & Copilot) Block dangerous G-code commands during printing for safety (#185)
* (DutchmanNL & Copilot) Fix P1S fan speed display issues - double conversion and incorrect mapping (#184)
* (DutchmanNL & Copilot) Add comprehensive API token location documentation for all Bambulab printer models (#182)

### 0.4.0 (2025-09-13)
* (DutchmanNL) Add missing state definitions to resolve adapter warnings (#181)
* (DutchmanNL) Empty finishTime and avoid time calculation when not printing (#179)
* (DutchmanNL) Fix MQTT reconnection to prevent maximum call stack size exceeded error (#177)

### 0.3.5 (2025-09-13)
* (DutchmanNL & Copilot) Fix several type mismatches #143 #139 #130
* (DutchmanNL) Updated missing definitions for full MQTT API incl H2D
* (DutchmanNL & Copilot) Fix repository checker issues and improve admin UI compatibility

### 0.3.4 (2024-10-28) - Door Indicator Fixes #115
* (DutchmanNL) Added doorOpen indicator, Fixes [#115](https://github.com/DrozmotiX/ioBroker.bambulab/issues/115)

### 0.3.3 (2024-10-27) - Bugfixes
* (DutchmanNL) update state definitions, (solves [#77](https://github.com/DrozmotiX/ioBroker.bambulab/issues/77) [#58](https://github.com/DrozmotiX/ioBroker.bambulab/issues/58))
* (DutchmanNL) update connection handling, show connection error only once (Solves #99 #78 #74)

## License
MIT License

Copyright (c) 2025 DutchmanNL <oss@drozmotix.eu>

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