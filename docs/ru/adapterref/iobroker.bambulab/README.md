---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: Npdxe0Wfa/8qp6RNiAfnnJRuqVEzu429TKoYNg8lwRA=
---
![версия NPM](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![Количество установок](https://iobroker.live/badges/bambulab-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/bambulab-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)

<img src="admin/bambulab.png" alt="Логотип" width="200"/>

# IoBroker.bambulab
**Тесты:** ![Тестируйте и выпускайте](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## Адаптер Bambulab для 3D-печати для ioBroker
## Начиная
Благодаря кредитам [kmxak](https://forum.iobroker.net/user/kmxak), [djalexz](https://forum.iobroker.net/user/djalexz), все другие участники и вдохновленные [этой веткой форума](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration) этот адаптер интегрирует 3D-принтеры Bambulab в ioBroker.

Пожалуйста, укажите IP-адрес вашего принтера, токен API и серийный номер в настройках адаптера, они необходимы для локального подключения (без использования облака) к вашему принтеру.
Эти учетные данные хранятся локально и не передаются третьим лицам.

Вы должны выбрать модель вашего принтера, только X1 позволяет отправлять сообщения, серия P1x должна запрашивать настройку интервала (по умолчанию каждые 5 секунд)

## Поддерживаемые модели
| Модель принтера | Статус |
|---------------|-------------------------|
| P1p | :white_check_mark: |
| P1s | :вопрос:нужно проверить |
| Х1 | :white_check_mark: |
| АМС | :white_check_mark: |

## Поддерживаемые команды
| Команда | Х1С | Х1 | P1P | П1С |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|
| Пользовательский g-код | :white_check_mark: | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании |
| Пауза | :white_check_mark: | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании |
| Резюме | :white_check_mark: | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании |
| Стоп | :white_check_mark: | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании |
| Вентилятор-Aux | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании | :question: нуждается в тестировании |
| Фан-камера | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании | :question: нуждается в тестировании |
| Вентилятор-ToolHead | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании | :question: нуждается в тестировании |
| Световая палата | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании | :question: нуждается в тестировании |
| Световое сопло | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании | :question: нуждается в тестировании |
| Лайт-Лого | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании | :question: нуждается в тестировании |
| Температурная кровать | :white_check_mark: | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании |
| Температурное сопло | :white_check_mark: | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании |
| Уровень скорости | :white_check_mark: | :white_check_mark: | :white_check_mark: | :question: нуждается в тестировании |

## Делать
[ ] Реализовать больше команд, дайте отзыв, что нам нужно :exclamation: [ ] Реструктурировать/дополнить текущие состояния элементов управления в папке управления [ ] Оптимизировать определения атрибутов состояний [ ] Протестировать серию принтеров P1S

## Поддержите меня
Если вам нравится моя работа, рассмотрите возможность личного пожертвования (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

При сбое адаптера или любой другой ошибке кода это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.5 (2023-07-29) - HMS error codes Human readable, new functionalities added
#### Several state locations have been changed, advise to completely remove adapter & reinstall to upgrade
* (DutchmanNL) State for human readable start time added
* (DutchmanNL) Speed level control implemented solves #10
* (DutchmanNL) Capability to control all fans implemented
* (DutchmanNL) Control bed & Nozzle temperature implemented
* (DutchmanNL) HMS error status indicator states implemented
* (DutchmanNL) Translations of HMS error codes implemented solves #9
* (DutchmanNL) Correct definitions for all temperature related states
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