---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: AWM/s63PesA/QWA1r+Oz8kXoEgKnxqblSeNcRzEARBU=
---
![Логотип](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/tibberlink-stable.svg)
![Установлено](https://iobroker.live/badges/tibberlink-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## Версии
## Адаптер для использования данных об энергии TIBBER в ioBroker
Этот адаптер облегчает подключение данных из API вашей учетной записи Tibber для использования в ioBroker, как для одного дома, так и для нескольких жилых помещений.
Новая функция: адаптер теперь поддерживает прямое локальное считывание импульсного датчика Tibber через вашу домашнюю сеть, что позволяет осуществлять мониторинг и сбор данных в режиме реального времени, не полагаясь исключительно на облачный API.

Если вы в настоящее время не являетесь пользователем Tibber, я был бы очень признателен, если бы вы могли воспользоваться моей реферальной ссылкой: [Реферальная ссылка Тиббера](https://invite.tibber.com/mu8c82n5).

## Стандартная конфигурация
- Начните с создания нового экземпляра адаптера.
- Вам также потребуется токен API от Tibber, который можно получить здесь: [Tibber Developer API](https://developer.tibber.com).
- Введите свой токен API Tibber в стандартных настройках и настройте хотя бы одну строку для параметров прямой трансляции (выберите «Нет доступных»).
- Сохраните настройки и выйдите из конфигурации, чтобы перезапустить адаптер; этот шаг позволит вашему дому(ам) впервые получить запрос с сервера Tibber.
- Вернитесь на экран конфигурации и выберите дома, из которых вы хотите получать данные в реальном времени с помощью Tibber Pulse. Вы также можете выбрать дома и отключить канал (Примечание: это работает только в том случае, если установлено оборудование и сервер Tibber проверил подключение к Pulse).
- Примечание: Если в вашей учетной записи Tibber активно более одного дома, вам придется добавить их все, чтобы избавиться от сообщения об ошибке, вызванной потенциально ненужными домами. Добавьте их все и отключите опции.
- У вас есть возможность отключить получение данных о ценах на сегодня и завтра, например, если вы собираетесь использовать только прямые трансляции Pulse.
- При желании вы можете включить извлечение исторических данных о потреблении. Укажите количество наборов данных для часов, дней, недель, месяцев и лет. Вы можете использовать «0», чтобы отключить один или несколько из этих интервалов в зависимости от ваших предпочтений.
- Примечание: важно помнить о размере набора данных, так как чрезмерно большие запросы могут привести к отсутствию ответа от сервера Tibber. Мы рекомендуем поэкспериментировать с размером набора данных, чтобы обеспечить оптимальную функциональность. Настройка интервалов и номеров наборов данных может помочь найти правильный баланс между получением полезных данных и поддержанием отзывчивости сервера. Например, 48 — это довольно хорошее количество для часов.
- Сохраните настройки.

## Конфигурация калькулятора
- Теперь, когда соединение Tibber установлено и работает, вы также можете использовать калькулятор для включения дополнительных функций автоматизации в адаптер TibberLink.
- Калькулятор работает с использованием каналов, каждый из которых связан с выбранным домом.
- Эти каналы могут быть активированы или деактивированы в зависимости от соответствующих состояний.
- Эти состояния предназначены для использования в качестве внешних динамических входов для TibberLink, позволяя, например, корректировать предельную стоимость («TriggerPrice») из внешнего источника или отключать канал калькулятора («Active»).
- Состояния канала калькулятора располагаются рядом с домашними состояниями и именуются в соответствии с номером канала. Таким образом, имя канала, выбранное на экране администратора, отображается здесь для лучшей идентификации ваших конфигураций.

  ![Калькулятор Состояния](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- Поведение каждого канала определяется его типом: «лучшая стоимость (LTF)», «лучшие отдельные часы (LTF)», «лучший блок часов (LTF)» или «умный буфер батареи».
- Каждый канал заполняет одно или два внешних состояния в качестве выходных данных, которые должны быть выбраны на вкладке настроек. Например, это состояние может быть "0_userdata.0.example_state" или любое другое записываемое внешнее состояние.
- Если внешнее выходное состояние не выбрано, будет создано внутреннее состояние в диапазоне канала.
- Значения, которые должны быть записаны в выходное состояние, могут быть определены как «значение ДА» и «значение НЕТ», например, «истина» для логических состояний или число или текст, которые должны быть записаны.
- Выходы:
- «Лучшая стоимость»: использует состояние «TriggerPrice» в качестве входных данных, создавая выход «ДА» каждый час, когда текущая стоимость энергии Tibber ниже цены триггера.
- «Лучшие отдельные часы»: генерирует вывод «ДА» в течение наименее дорогих часов с числом, указанным в состоянии «AmountHours».
- «Блок лучших часов»: выводит «ДА» в течение наиболее экономически эффективного блока часов с количеством часов, указанным в состоянии «AmountHours».

Дополнительно, средняя общая стоимость в определенном блоке записывается в состояние "AverageTotalCost" рядом с входными состояниями этого канала. Также начальный и конечный час блока записывается в "BlockStartFullHour" и "BlockEndFullHour" как результат расчета.

- «Лучшая стоимость LTF»: «Лучшая стоимость» в течение ограниченного периода времени (LTF).
- «Лучшие отдельные часы LTF»: «Лучшие отдельные часы» в течение ограниченного периода времени (LTF).
- «Блок лучших часов LTF»: «Блок лучших часов» в течение ограниченного периода времени (LTF).
- "Smart Battery Buffer": используйте параметр "EfficiencyLoss", чтобы указать потерю эффективности аккумуляторной системы. Параметр "EfficiencyLoss" может иметь значение от 0 до 1, где 0 означает отсутствие потери эффективности, а 1 означает полную потерю эффективности. Например, значение 0,25 указывает на потерю эффективности 25% для цикла заряда/разряда.

Используйте параметр "AmountHours" для ввода желаемого количества часов для зарядки аккумулятора. Калькулятор активирует зарядку аккумулятора ("значение ДА") и деактивирует питание аккумулятора ("значение 2 НЕТ") в течение указанных "AmountHours" самых дешевых часов. И наоборот, он деактивирует зарядку аккумулятора ("значение НЕТ") и активирует питание аккумулятора ("значение 2 ДА") в часы с самой высокой стоимостью, при условии, что стоимость выше самой высокой общей цены среди дешевых часов. В оставшиеся обычные часы, когда буферизация энергии аккумулятором экономически нецелесообразна, оба выхода будут отключены.

- «Лучший процент»: выводит «ДА» в течение наименее дорогого часа и любых других часов, когда цена попадает в процентный диапазон, указанный в настройках «Процент».
- «Лучший процент LTF»: «Лучший процент» в течение ограниченного периода времени (LTF).
- Каналы LTF: они работают аналогично стандартным каналам, но активны только в течение временного интервала, определяемого объектами состояния «StartTime» и «StopTime». После «StopTime» канал автоматически деактивируется. «StartTime» и «StopTime» могут охватывать два календарных дня, так как Tibber не предоставляет данные за пределами 48-часового окна. Для обоих состояний требуется строка даты и времени в формате ISO-8601 со смещением часового пояса, например, «2024-12-24T18:00:00.000+01:00». Кроме того, каналы LTF имеют новый параметр состояния, называемый «RepeatDays», который по умолчанию равен 0. Если для «RepeatDays» задано положительное целое число, канал будет повторять свой цикл, увеличивая «StartTime» и «StopTime» на указанное количество дней после достижения «StopTime». Например, установите «RepeatDays» на 1 для ежедневного повторения.

### Подсказки
#### Обратное использование
Чтобы получить, например, часы пик вместо оптимальных часов, просто поменяйте местами использование и параметры: ![Калькулятор Состояния Обратные](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png) Поменяв местами true <-> false, вы получите true по низкой стоимости в первой строке и true по высокой стоимости во второй строке (названия каналов не являются триггерами и по-прежнему могут быть выбраны).

Внимание: Для пиковых отдельных часов, таких как в примере, вам также необходимо скорректировать количество часов. Исходное: 5 -> Обратное (24-5) = 19 -> Вы получите истинный результат в течение 5 пиковых часов.

#### LTF-каналы
Расчет выполняется для «многодневных» данных. Поскольку у нас есть только информация на «сегодня» и «завтра» (доступная примерно после 13:00), временной диапазон фактически ограничен максимум 35 часами. Однако крайне важно помнить об этом поведении, поскольку рассчитанный результат может/изменится около 13:00, когда станут доступны новые данные о завтрашних ценах.

Чтобы наблюдать это динамическое изменение временного диапазона для стандартного канала, вы можете выбрать Limited Time Frame (LTF), охватывающий несколько лет. Это особенно полезно для сценария «Best Single Hours LTF».

## Прямой локальный опрос данных Pulse
Чтобы это заработало, вам нужно изменить веб-интерфейс Bridge, чтобы он оставался постоянно включенным.
marq24 описал, как это сделать превосходно для его интеграции с HomeAssistant здесь:

https://github.com/marq24/ha-tibber-pulse-local

Если все работает правильно, данные счетчика будут записываться в состояния ioBroker каждые 2 секунды.

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Для получения дополнительных сведений и информации о том, как отключить отчеты об ошибках, обратитесь к [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry инициируются, начиная с js-controller 3.0.

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете щедрость, подумайте о том, чтобы угостить меня пивом. Ура! :beers:

## Changelog

### 4.2.0 (2024-12-xx)

- (HombachC) add new calculator channels 'BestPercentage' and 'BestPercentageLTF' (#616)

### 4.1.1 (2024-12-21)

- (HombachC) code cleanup
- (HombachC) fix translations
- (HombachC) fix chai-as-promised

### 4.1.0 (2024-12-15)

- (HombachC) enable local poll also without Token (#613)
- (HombachC) split jsonConfig.json to multiple files
- (HombachC) fix typo in translation handling
- (HombachC) bump cron

### 4.0.0 (2024-12-08)

- (HombachC) BREAKING: dropped support for ioBroker.admin < 7.0.0 because of ioBroker Responsive Design Initiative (#544)
- (HombachC) redesigned admin tab for calculator
- (HombachC) optimize translations, added more tooltips
- (HombachC) fix repeated calculation of LTF channels (#593)
- (HombachC) added BlockStart / BlockEnd as date string (#516)
- (HombachC) throttle sentry messaging
- (HombachC) add prices yesterday (#600)

### 3.5.4 (2024-12-01)

- (HombachC) add warning when LTF stop time isn't same or next day and provide docu
- (HombachC) fix error in calculator channel 'best single hours' (#594)
- (HombachC) intruduce 'iobroker/eslint-config' (#591)
- (HombachC) performance optimizations
- (HombachC) dependency updates

### 3.5.3 (2024-11-23)

- (HombachC) fix edge case in output state setup and usage
- (HombachC) optimzed state subscription
- (HombachC) update deprecated state calls
- (HombachC) add await to delObjectAsync
- (HombachC) harmonize project tools
- (HombachC) dependency updates

### 3.5.2 (2024-10-30)

- (HombachC) add verification for YES/NO 2 values in calculator (#547)
- (HombachC) optimized responsive design (#544)
- (HombachC) migrate eslint to >9.x
- (HombachC) switch to ES2022 code
- (HombachC) adapted to new API constraints (#546)
- (HombachC) replace deprecated setStateAsync by setState

### 3.5.1 (2024-10-05)

- (HombachC) changed to less feed disconnection warnings in log (#445)
- (HombachC) fix error in output2 of smart battery buffer (#538)
- (HombachC) update deprecated state calls
- (HombachC) dependency updates

### 3.5.0 (2024-10-02)

- (HombachC) update adapter core
- (HombachC) fix error in SML decoder
- (HombachC) add 2 new SML scale factor codes (#535)
- (HombachC) dependency updates

### 3.4.10 (2024-09-16)

- (HombachC) add verification of poll interval (#518)
- (HombachC) bumb date-fns to 4.0.0

### 3.4.9 (2024-09-15)

- (HombachC) add adjustable Bridge poll intervall (#518)
- (HombachC) add node.js 22 to the adapter testing (#519)
- (HombachC) add docu link to config screen (#504)
- (HombachC) repository cleanup
- (HombachC) dependency updates

### 3.4.8 (2024-08-16)

- (HombachC) updated axios because of vulnerability
- (HombachC) added tests for Node.js 22

### 3.4.7 (2024-08-10)

- (HombachC) adapter checker detected optimizations (#493)
- (HombachC) improved error message (#490)

### 3.4.6 (2024-08-07)

- (HombachC) Catch wrong OBIS Codes, probably caused by Pulse communication errors
- (HombachC) code cleanup

### 3.4.5 (2024-07-31)

- (HombachC) decode meter mode 4 for local Tipper Pulse poll (#477)
- (HombachC) decode meter mode 1 for local Tipper Pulse poll (#478)
- (HombachC) fixed wrong Pulse local status names (voltage)
- (HombachC) add docu on local Pulse poll config screen (#479)
- (HombachC) code cleanup
- (HombachC) bump dependencies

### 3.4.4 (2024-07-28)

- (HombachC) local poll of data - change units Wh to kWh and round to 0,1kWh (#469)

### 3.4.3 (2024-07-14)

- (HombachC) added unit to Pulse temperature and round to 0,1°C
- (HombachC) added unit to Pulse battery voltage and round to 100mV
- (HombachC) added unit to Pulse uptime
- (HombachC) added state with Pulse uptime as human readable string
- (HombachC) reinitialize some TibberLocal states upon adapter startup
- (HombachC) code optimisation
- (HombachC) bump dependencies

### 3.4.2 (2024-07-13)

- (HombachC) fix typos in units
- (HombachC) fix type mismatch for state objects (#455)
- (HombachC) code optimisation

### 3.4.1 (2024-07-13)

- (HombachC) fix logging error
- (HombachC) bump dependencies

### 3.4.0 (2024-07-12)

- (HombachC) add mode for local poll of Pulse data (#201)

### 3.3.3 (2024-07-04)

- (HombachC) fix sentry notified possible error
- (HombachC) try to fix startup error (#444)

### 3.3.2 (2024-06-21)

- (HombachC) fix 2 security issues in dependencies
- (HombachC) fix sentry notified possible error

### 3.3.1 (2024-06-13)

- (HombachC) fix small sentry discovered error (#418)
- (HombachC) added note for multihomes to documentation (#422)

### 3.3.0 (2024-06-05)

- (HombachC) implements optional, obsolete api call for total historical cost, incl. grid fees (#405)
- (HombachC) Updates @iobroker/adapter-core from 3.1.6
- (HombachC) Updates @iobroker/types from 5.0.19 to 6.0.0

### 3.2.1 (2024-06-03)

- (HombachC) added unique endpoint string

### 3.2.0 (2024-06-03)

- (HombachC) IMPORTANT: adapter components had been blocked by Tibber - you have to update!
- (HombachC) bump base dependencies
- (HombachC) adapter will use internal output states for calculator if none defined in configuration (#325)
- (HombachC) implement first run mode in calculator to reduce system load
- (HombachC) internal optimisations

### 3.1.2 (2024-05-20)

- (HombachC) deleting unused temp home objects after adapter config (#393)
- (HombachC) bump dependencies

### 3.1.1 (2024-05-16)

- (HombachC) throttle down reconnection speed
- (HombachC) logging optimizations (#396; #217)
- (HombachC) adaptations to newer environment (#394; #395)

### 3.1.0 (2024-05-07)

- (HombachC) enable manual control of configured outputs when automation is deactivated (#334)
- (HombachC) fix not working LTF Channel when using too short LTF (#383)
- (HombachC) code optimisations
- (HombachC) update adapter-core to 3.1.4
- (HombachC) bump dependencies

### 3.0.1 (2024-04-20)

- (HombachC) updated adapter testing
- (HombachC) bump dependencies

### 3.0.0 (2024-04-15)

- (HombachC) BREAKING: dropped support for node.js 16 (#368)
- (HombachC) BREAKING: js-controller >= 5 is required
- (HombachC) changed to tier 2 as data provider
- (HombachC) corrected io-package.json according to new schema (#368)
- (HombachC) update typescript to 5.4.5
- (HombachC) update adapter-core to 3.0.6

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2024 C.Hombach <TibberLink@homba.ch>