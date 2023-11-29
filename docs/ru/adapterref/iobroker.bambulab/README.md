---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: xF9K+twXSSsRjQblkO/bs0evJUr4bRoAZwa4pUEwSJg=
---
![НПМ-версия](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![Количество установок](https://iobroker.live/badges/bambulab-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/bambulab-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)

<img src="admin/bambulab.png" alt="Логотип" width="200"/>

# IoBroker.bambulab
**Тесты:** ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## Адаптер Bambulab для 3D-печати для ioBroker
## Начиная
Благодаря [kmxak](https://forum.iobroker.net/user/kmxak), [djalexz](https://forum.iobroker.net/user/djalexz), все остальные, вовлеченные и вдохновленные [этой веткой форума](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration) этот адаптер интегрирует 3D-принтеры Bambulab в ioBroker.

Укажите IP-адрес вашего принтера, токен API и серийный номер в настройках адаптера; они необходимы для локального подключения (без использования облака) к вашему принтеру.
Эти учетные данные хранятся локально и не передаются третьим лицам.

Вы должны выбрать модель вашего принтера, только X1 позволяет отправлять сообщения, серия P1x должна запрашивать через настройку интервала (по умолчанию каждые 5 секунд).

## Поддерживаемые модели
| Модель принтера | Статус |
|---------------|-------------------------|
| АМС | :white_check_mark: |
| А1 | :white_check_mark: |
| П1п | :white_check_mark: |
| P1с | :white_check_mark: |
| Х1 | :white_check_mark: |

## Поддерживаемые команды
| Команда | X1C | Х1 | P1P | П1С | А1 |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|--------------------------|
| Пользовательский g-код | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Пауза | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Резюме | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Стоп | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Вентилятор-Aux | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :x: Нет аппаратной поддержки |
| Фан-камера | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :x: Нет аппаратной поддержки |
| Fan-ToolHead | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :white_check_mark: |
| Световая камера | :white_check_mark: | :white_check_mark: | :interrobang: если присутствует | :white_check_mark: | :white_check_mark: |
| Лайт-Логотип | :white_check_mark: | :white_check_mark: | :x: Нет аппаратной поддержки | :x: Нет аппаратной поддержки | :x: Нет аппаратной поддержки |
| Температурный слой | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Температура-Сопло | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Уровень скорости | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

## Делать
[ ] Реструктуризация/дополнение текущих состояний элемента управления в папке управления [ ] Оптимизация определений атрибутов состояния

## Поддержите меня
Если вам нравится моя работа, рассмотрите возможность личного пожертвования (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и какие данные передаются на серверы этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок в их приложениях. И именно это реализовано в этом адаптере.

При сбое адаптера или возникновении любой другой ошибки кода это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry.
Когда вы разрешаете iobroker GmbH собирать диагностические данные, тогда также включается ваш установочный идентификатор (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, адресе электронной почты, имени и т. д.).
Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуло такая ошибка.
Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не выходят из строя.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.2 (2023-11-20)
* (DutchmanNL) Show finish time as ISO string

### 0.3.1 (2023-11-20)
* (DutchmanNL) Bugfix control P & A Series
* (DutchmanNL) Show end time as a separate state, resolves #53
* (DutchmanNL) Bugfix resolves missing fan speed value, resolves #36

### 0.3.0 (2023-11-19) - Release candidate
* (DutchmanNL) Update dependencies for state handling, resolves #50
* (DutchmanNL) Adjust log level for Unknown Message from error to debug, resolves #39
* (DutchmanNL) Add missing definitions to ensure correct creation of states, resolves #39
* (DutchmanNL) Reduce selection dropdown in admin config to printer series instead of a specific printer type
* (DutchmanNL) Update adapter code to support new firmware versions released by bambulab, please ensure your printer is up-to-date! resolves #46, resolves #38, resolves #26,

### 0.2.0 (2023-10-18) - Small fixes for new firmware version
* (DutchmanNL) Button for homing added, fixes #28
* (DutchmanNL) Bugfix: Translation of HMS-Error codes
* (DutchmanNL) Several bugfixes for situations no AMS is used
* (DutchmanNL) Remove control for LED calibration head (could damage hardware)

### 0.1.5 (2023-07-29) - HMS error codes Human readable, new functionalities added
#### Several state locations have been changed, advise to completely remove adapter & reinstall to upgrade
* (DutchmanNL) State for human-readable start time added
* (DutchmanNL) Speed level control implemented solves #10
* (DutchmanNL) Capability to control all fans implemented
* (DutchmanNL) Control bed & Nozzle temperature implemented
* (DutchmanNL) HMS error status indicator states implemented
* (DutchmanNL) Translations of HMS error codes implemented solves #9
* (DutchmanNL) Correct definitions for all temperature-related states
* (DutchmanNL) Control LED for tooling head Logo and calibration unit

### 0.1.4 (2023-07-28) - Support P1-series
* (DutchmanNL) Configuration page in admin updated
* (DutchmanNL) Information messages regarding incorrect type of bed-temperatures solved
* (DutchmanNL) Implemented P1-X printer series, polling interval required for this model (only X1 handles data push)

### 0.1.3 (2023-07-27) - Add new control options
* (DutchmanNL) add control for chamber fan, tooling head light and allow custom g-code

### 0.1.1 - Minor improvements
* (DutchmanNL) Translations added
* (DutchmanNL) Debug logging improved
* (DutchmanNL) Minor code improvements
* (DutchmanNL) Control states implemented
* (DutchmanNL) Test & release workflows updated
* (DutchmanNL) Encryption of token and device serial improved

### 0.1.0 initial release
* (DutchmanNL) initial release
* During startup adapter throws warnings, these can be ignored and will be solved in =< 0.5.0
* Control start/stop/resume and light available in >= 0.1.1

## License
MIT License

Copyright (c) 2023 DutchmanNL <oss@drozmotix.eu>

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