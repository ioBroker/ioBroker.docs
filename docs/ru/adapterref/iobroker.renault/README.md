---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.renault/README.md
title: ioBroker.renault
hash: 2LxrPTWWmj+KSLWSb6KZIi8BQv1Bxtkadf+rBlQ1f44=
---
![Логотип](../../../en/adapterref/iobroker.renault/admin/renault.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.renault.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.renault.svg)
![Количество установок](https://iobroker.live/badges/renault-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/renault-stable.svg)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.renault/workflows/Test%20and%20Release/badge.svg)

# ioBroker.renault

## Адаптер Renault/Dacia для ioBroker

Этот адаптер подключает ioBroker к облаку My Renault / My Dacia и предоставляет данные о состоянии автомобиля (аккумулятор, зарядка, система кондиционирования, пробег и т. д.), а также команды дистанционного управления (запуск системы кондиционирования, запуск/остановка зарядки, принудительное обновление) для совместимых моделей Renault и Dacia, таких как Renault Zoe, Megane E-Tech, Kangoo E-Tech и Dacia Spring.

## Установка / Вход

1. Установите адаптер через административный интерфейс ioBroker.
2. Откройте настройки адаптера и введите учетные данные вашей учетной записи **My Renault** (или **My Dacia** ): адрес электронной почты приложения и пароль приложения.
3. Укажите **страну,** используя двухбуквенный код страны, соответствующий вашей учетной записи (например,`de` ,`fr` ,`it` ,`es` ).
4. При желании можно установить **интервал** опроса в минутах и **ключ API** (оставьте поле пустым для автоматического определения).
5. Сохраните изменения, и экземпляр начнет опрос.

## Пульт дистанционного управления

Каждое транспортное средство создается как устройство на основе его VIN-кода. Дистанционные команды отображаются в виде состояний в разделе`renault.0.<VIN>.remote.*` :

| Состояние                | Тип        | Действие                                                                      |
| ------------------------ | ---------- | ----------------------------------------------------------------------------- |
| `actions/hvac-start`     | логический | `true` = старт,`false` = прекратить предварительную подготовку                |
| `hvac-temperature`       | число      | Целевая температура системы отопления, вентиляции и кондиционирования воздуха |
| `actions/charging-start` | логический | `true` = старт,`false` = прекратить зарядку                                   |
| `charge/pause-resume`    | логический | `true` = старт,`false` = пауза                                                |
| `charge/start`           | логический | `true` = старт,`false` = прекратить зарядку (устаревшее конечное устройство)  |
| `refresh`                | логический | `true` = принудительное обновление данных автомобиля                          |

Установите соответствующее состояние на`true` для запуска команды.

## Обсуждение / вопросы

Форум ioBroker: <https://forum.iobroker.net/topic/48074/test-adapter-renault-v0-0-x>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 0.0.23

- (TA2k) align API headers with My Renault Android app, drop EOL Node 18/20, migrate admin UI to jsonConfig

### 0.0.22

- (TA2k) update dependencies, migrate to ESLint 10, fix repochecker findings

### 0.0.7

- (TA2k) initial release

[Older changelogs can be found here](https://github.com/TA2k/ioBroker.renault/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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