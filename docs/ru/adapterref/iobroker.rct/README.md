---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: sqx85/dahqva12edT+C3ZDet63lgaQKL3RYSBhBJjOc=
---
![версия НПМ](https://img.shields.io/npm/v/iobroker.rct.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rct.svg)
![Количество установок (последнее)](https://iobroker.live/badges/rct-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/rct-stable.svg)
![Статус зависимости Libraries.io для репозитория GitHub](https://img.shields.io/librariesio/release/npm/ioBroker.rct)
![НПМ](https://nodei.co/npm/iobroker.rct.png?downloads=true)

[![Логотип](admin/rct.png)](https://www.rct-power.com/de)

# IoBroker.rct
**Тесты:** ![Тест и выпуск](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## Адаптер RCT для ioBroker
Обратите внимание, что это частный проект и что я (Андреас Рутткамп) никак не связан с RCT.
Ознакомьтесь со значениями преобразователя мощности фотоэлектрических систем RCT Power.

## ЗАМЕЧАНИЯ
Используя поле «Элементы RCT», можно выбрать, какие данные будут считываться с преобразователя мощности.
Если здесь ничего не введено, будут использоваться данные по умолчанию:

"battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_syn c.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.u_acc_mix_lp,prim_sm.island_flag"

Другие элементы можно найти в коде (файл "rct/rc_core2.js"). Поскольку это не самоописательно, используйте на свой страх и риск!

Объект «battery.bat_status» указывает состояние подключенной батареи:

* 0 -> заряд/разряд (нормальная работа)
* 1 -> холостой ход (нет CAN-подключения инвертора -> аккумулятор)
* 3 -> подключение (инвертор -> аккумулятор)
* 5 -> синхронизация (инвертор -> аккумулятор)
* 8 -> калибровка - фаза зарядки (0% --> 100%)
* 1024 -> калибровка - фаза разряда (xx% --> 0%)
* 2048 -> балансировка

Объект "inverter_state" указывает состояние инвертора.

* 0 -> «Режим ожидания»
* 1 -> «Инициализация»
* 2 -> «Режим ожидания»
* 3 -> «Эффективность (состояние отладки для целей разработки)»
* 4 -> «Проверка изоляции»
* 5 -> «Проверка острова (решение, куда идти — к сети или на остров)»
* 6 -> «Проверка мощности (решение, достаточно ли энергии для запуска или нет)»
* 7 -> «Симметрия (выравнивание звена постоянного тока)»
* 8 -> «Тест реле»
* 9 -> «Сетевой пассивный (инвертор получает питание от сети без тактирования моста)»
* 10 -> «Подготовить пассивную батарею»
* 11 -> «Пассивная батарея (вне сети)»
* 12 -> «Тест оборудования»
* 13 -> «Кормление через сетку»

## Известные проблемы
Никто

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.2.17 (2025-01-01)
* (Andreas Ruttkamp) update deps
* (Andreas Ruttkamp) update copyright

### 1.2.16 (2024-12-16)
* (NCIceWolf) Changed admin to type "panel"

### 1.2.15 (2024-12-15)
* (Andreas Ruttkamp) update deps
* (Andreas Ruttkamp) include node.js 22 testing
* (Andreas Ruttkamp) IMPLEMENTING eslint 9

### 1.2.14 (2024-09-13)
* (Andreas Ruttkamp) removed .npmignore

### 1.2.13 (2024-07-17)
* (NCIceWolf) Added multiple debugging messages
* (NCIceWolf) Corrected debug messages to be shown as debug, not info
* (NCIceWolf) corrected connection abortion if not successfully established
* (NCIceWolf) elements from inverter are only requested once a connection is successfully established
* (NCIceWolf) added requested and received elements to/from inverter to debug logging
* (NCIceWolf) merged recent dependabot suggestions   
* (Andreas Ruttkamp) Dependabot suggested updates
* (Andreas Ruttkamp) some Code cosmetics

### 1.2.12 (2024-07-03)
* (Andreas Ruttkamp) Dependabot suggested updates
* (NCIceWolf) Improving connectivity to inverter

### 1.2.11 (2024-06-28)
* (NCIceWolf) mistyping corrected

### 1.2.10 (2024-06-28)
* (NCIceWolf) stability improvements for data connection to inverter
* (Andreas Ruttkamp) some code corrections

### 1.2.9 (2024-05-17)
* (Andreas Ruttkamp) wrong type for next_calib_date corrected

### 1.2.8 (2024-05-16)
* (NCIceWolf) Implementation of new adminUI
* (Andreas Ruttkamp) index_m.html deleted
* (Andreas Ruttkamp) Datatype battery_stack_cycles corrected
* (NCIceWolf) style.css deleted (not needed for json admin)
* (NCIceWolf) removed tab-materialize (leftover from initial adapter creation)
* (NCIceWolf) updated minimum js-controller version to >= 5.0.0
* (NCIceWolf) added minimum admin version to >= 5.0.0
* (NCIceWolf) prepared translations for adminUI

### 1.2.7 (2024-05-05)
* (Andreas Ruttkamp) prim_sm.state added
* (NCIceWolf) handling of type errors added
* (Andreas Ruttkamp) some Code cleaning
* (NCIceWolf) Update io-package.json

### 1.2.6 (2024-05-03)
* (Andreas Ruttkamp) unused parameter deleted

### 1.2.5 (2024-05-02)
* (Andreas Ruttkamp) misspelling in rct_core2 corrected
* (Andreas Ruttkamp) Missing ack:true added ( issue:#89)
* (Andreas Ruttkamp) datatypes corrected ( issue:#106)
* (NCIceWolf) changes to correct loosing connection ( issue:#114 )

### 1.2.4 (2024-02-09)
* (Andreas Ruttkamp) adapter not running in 1.2.3 - fixed

### 1.2.3 (2024-02-09)
* (Andreas Ruttkamp) prim_sm.state added
* (Andreas Ruttkamp) states for battery added
* (Andreas Ruttkamp) output of data points power_mng.soc_min and soc_min_island corrected

### 1.2.2 (2023-09-13)
* (Andreas Ruttkamp) data type for power_mng.bat_next_calib_date corrected
* (Andreas Ruttkamp) data type for battery.stack_cycles[x] corrected

### 1.2.1 (2023-09-13)
* (Andreas Ruttkamp) configured rct elements will now be used correctly ( in 1.2.0 only power_mng.bat_next_calib_date was read)

### 1.2.0 (2023-09-11)
* (Andreas Ruttkamp) connection state corrected when adapter is stopped
* (Andreas Ruttkamp) dependancies updated

### 1.1.7 (2023-08-30)
* (Andreas Ruttkamp) connection state corrected

### 1.1.6 (2023-08-23)
* (Andreas Ruttkamp) rct_core.js deleted (now rct_core2 is used)
* (Andreas Ruttkamp) parameters in default setting deleted 
* (Andreas Ruttkamp) min. Node 18

### 1.1.5 (2023-08-18)
* (Andreas Ruttkamp) Fix: crash reading UInt8 corrected
* (Andreas Ruttkamp) some cleaning actions

### 1.1.4 (2023-08-18)
* (Andreas Ruttkamp) Fix: proofments corrected.

### 1.1.3 (2023-08-18)
* (Andreas Ruttkamp) Fix: more data checks implemented

### 1.1.2 (2023-08-17)
* (Andreas Ruttkamp) Fix: adapter crashes

### 1.1.1 (2023-08-17)
* (Andreas Ruttkamp) data for g_sync.p_ac_load[0-2] / dc_conv.dc_conv_struct[0-1].u_sg_lp added
* (Andreas Ruttkamp) more parameters added 
* (Andreas Ruttkamp) date conversions fixed
* (Andreas Ruttkamp) conversions of percentages fixed
* (Andreas Ruttkamp) instance crash if data failure fixed

### 1.0.5 (2023-07-29)
* (Andreas Ruttkamp) some internal work
* (Andreas Ruttkamp) preparation for new admin
* (Andreas Ruttkamp) dependecies update

### 1.0.4 (2023-04-24)
* (Andreas Ruttkamp) Release Script added and update dev-components
* (Andreas Ruttkamp) Preparation of new backend

### 1.0.3 (2023-03-30)
* (Andreas Ruttkamp) Release Script added and update dev-components

### 1.0.1
* (Markus Lauff) fixing review comments - thanks to Apollon77

### 1.0.0
* (Markus Lauff) 0.0.6 version proved stable and fulfilling minimal functional requirements, so releasing it as version 1.0.0 for productive usage

### 0.0.6
* (Markus Lauff) adding further channels/states, major stability improvements

### 0.0.5
* (Markus Lauff) some fixes / minor improvements

### 0.0.1
* (Markus Lauff) initially bare minimum working release

## License
MIT License

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

Copyright (c) 2025 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>