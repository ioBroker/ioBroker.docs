---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: 6xz78qe47l9UjQdyv3+SKEGq4UogHIcdLUi8NTCG5no=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![Количество установок](https://iobroker.live/badges/bambulab-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/bambulab-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)
![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

<img src="admin/bambulab.png" alt="Logo" width="200"/>

# ioBroker.bambulab

## Адаптер Bambulab для 3D-печати для ioBroker

## Начиная

Благодаря [kmxak](https://forum.iobroker.net/user/kmxak) , [djalexz](https://forum.iobroker.net/user/djalexz) и всем остальным участникам и вдохновленным [этой темой на форуме,](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration) этот адаптер интегрирует 3D-принтеры Bambulab в ioBroker.

Пожалуйста, укажите IP-адрес вашего принтера, токен API и серийный номер в настройках адаптера; эти данные необходимы для локального подключения к принтеру (без использования облака). Эти учетные данные хранятся локально и не передаются третьим лицам.

## Как найти токен API и серийный номер

Расположение токена API и серийного номера зависит от модели вашего принтера:

### Мини-серия A1/A1

1. На экране принтера перейдите в раздел **«Настройки»** → **«Сеть»** .
2. Включить **«Только режим LAN»** (nur Lan-Modus)
3. После включения будут отображаться IP-адрес, токен доступа и серийный номер.

### Серия P1S

1. На экране принтера перейдите в раздел **«Настройки»** → **«Сеть»** .
2. Токен доступа отображается непосредственно в сетевых настройках (режим локальной сети не требуется).
3. Серийный номер можно найти в том же меню или в информации об устройстве.

### Серия X1/X1C

1. На экране принтера перейдите в раздел **«Настройки»** → **«Сеть»** .
2. Токен доступа отображается непосредственно в сетевых настройках.
3. Серийный номер можно найти в том же меню или в информации об устройстве.

**Примечание:** Необходимо правильно выбрать модель вашего принтера в настройках адаптера. Только принтеры серии X1 позволяют отправлять сообщения, для серии P1x необходимо запрашивать сообщения с заданным интервалом (по умолчанию каждые 5 секунд).

## Поддерживаемые модели

| Модель принтера | Статус           |
| --------------- | ---------------- |
| АМС             | :белая\_галочка: |
| А1              | :белая\_галочка: |
| П1п             | :белая\_галочка: |
| П1с             | :белая\_галочка: |
| X1              | :белая\_галочка: |

## Поддерживаемые команды

| Командование                | X1C              | X1               | П1П                             | П1С                          | А1                           |
| --------------------------- | ---------------- | ---------------- | ------------------------------- | ---------------------------- | ---------------------------- |
| Пользовательский G-код      | :белая\_галочка: | :белая\_галочка: | :белая\_галочка:                | :белая\_галочка:             | :белая\_галочка:             |
| Пауза                       | :белая\_галочка: | :белая\_галочка: | :белая\_галочка:                | :белая\_галочка:             | :белая\_галочка:             |
| Резюме                      | :белая\_галочка: | :белая\_галочка: | :белая\_галочка:                | :белая\_галочка:             | :белая\_галочка:             |
| Останавливаться             | :белая\_галочка: | :белая\_галочка: | :белая\_галочка:                | :белая\_галочка:             | :белая\_галочка:             |
| Вспомогательный вентилятор  | :белая\_галочка: | :белая\_галочка: | :interrobang: если присутствует | :белая\_галочка:             | :x: Нет аппаратной поддержки |
| Фан-камера                  | :белая\_галочка: | :белая\_галочка: | :interrobang: если присутствует | :белая\_галочка:             | :x: Нет аппаратной поддержки |
| Веерная головка инструмента | :белая\_галочка: | :белая\_галочка: | :interrobang: если присутствует | :белая\_галочка:             | :белая\_галочка:             |
| Световая камера             | :белая\_галочка: | :белая\_галочка: | :interrobang: если присутствует | :белая\_галочка:             | :белая\_галочка:             |
| Световой логотип            | :белая\_галочка: | :белая\_галочка: | :x: Нет аппаратной поддержки    | :x: Нет аппаратной поддержки | :x: Нет аппаратной поддержки |
| Температурный слой          | :белая\_галочка: | :белая\_галочка: | :белая\_галочка:                | :белая\_галочка:             | :белая\_галочка:             |
| Температурное сопло         | :белая\_галочка: | :белая\_галочка: | :белая\_галочка:                | :белая\_галочка:             | :белая\_галочка:             |
| Уровень скорости            | :белая\_галочка: | :белая\_галочка: | :белая\_галочка:                | :белая\_галочка:             | :белая\_галочка:             |

## Задачи

\[ ] Реструктурировать/дополнить текущие состояния управления в папке управления \[ ] Оптимизировать определения атрибутов состояния

## Поддержите меня

Если вам нравится мое творчество, пожалуйста, рассмотрите возможность личного пожертвования.\
&#x20;(Это личная ссылка для пожертвований DutchmanNL, не имеющая отношения к проекту ioBroker!)\
[![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и какая информация передается на серверы этой компании?

Sentry.io — это сервис для разработчиков, позволяющий получать обзор ошибок в их приложениях. И именно это реализовано в данном адаптере.

Когда адаптер зависает или возникает любая другая ошибка в коде, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Если вы разрешаете iobroker GmbH собирать диагностические данные, то в них также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не зависают.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL & Copilot) Update all dependencies to latest versions, consolidating 17 Dependabot PRs
* (DutchmanNL & Copilot) Synchronize admin translations with jsonConfig.json - add missing translations and remove orphaned keys (#202)
* (DutchmanNL) Raise minimum Node.js to 22, modernise CI (Node 24, testing-action-check v2) and release tooling, and resolve repository checker findings

### 0.4.3 (2025-09-16)
* (DutchmanNL) Improve error messages if printer is offline or not reachable.
* (DutchmanNL) Added HD2 printer to the selection menu for easier access (#142)
* (DutchmanNL) Solve several type definition issues. #203, #202, #201, #200, #199, #198
* (DutchmanNL) Implemented a buffer system to reduce CPU usage and improve performance (#145)
* (DutchmanNL & Copilot) Fix type conversion errors by replacing deprecated `tonumber` with proper `TOINTEGER`/`TOFLOAT` modifiers. #197
* (DutchmanNL & Copilot) Add missing state attribute definitions for HD2 printer during printing (height, platform, tool, mapping). Fixes #194
* (DutchmanNL & Copilot) Fix repository checker issues: update devDependencies to latest versions and correct news entries

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

Older changes can be found at [CHANGELOG_OLD.md](https://github.com/DrozmotiX/ioBroker.bambulab/blob/main/CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2025-2026 DutchmanNL <oss@drozmotix.eu>

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