---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: 5zS18euTcTWgxurLHr8gj7RbqPnHqk68qY3n67jVDCk=
---
![Логотип](../../../en/adapterref/iobroker.rct/admin/rct.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.rct.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rct.svg)
![Количество установок (последние)](https://iobroker.live/badges/rct-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/rct-stable.svg)
![Статус зависимости](https://img.shields.io/david/lauff/iobroker.rct.svg)
![НПМ](https://nodei.co/npm/iobroker.rct.png?downloads=true)

# IoBroker.rct
**Тесты:** ![Тестируйте и выпускайте](https://github.com/lauff/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## Адаптер RCT для ioBroker
Обратите внимание, что это частный проект и что я (Маркус Лауфф) никак не связан с RCT.

Показать значения фотоэлектрического преобразователя мощности RCT Power

## ЗАМЕЧАНИЯ
### Первоначальный продуктивный релиз
Это первоначальный продуктивный выпуск после того, как предыдущая версия доказала свою стабильность и соответствует минимально возможному объему.

Конфигурация по-прежнему ограничена и довольно техническая. С помощью "RCT ELemente" можно выбрать, какие данные будут считываться с силового преобразователя. По умолчанию это «battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].enabled,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].enabled, dc_conv.dc_conv_struct[1].p_dc_lp,ошибка[0].flt,ошибка[1].flt,ошибка[2].flt,ошибка[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync .p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.battery_type,power_mng.is_grid,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_sm,ism.ism.is .государство". Остальные элементы можно найти в коде (файл "rct/rc_core.js"). Но это совсем не описательно (даже не проверено).

## Известные вопросы
### Неверные каналы/состояния
Новая версия может быть не в состоянии создать правильные каналы/состояния ioBroker. В большинстве случаев это можно узнать по узлу «батарея», отображаемому как отдельный элемент, а не как папка.

В этом случае остановите адаптер и вручную удалите узел «rct.0».

## Changelog

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

Copyright (c) 2022 Markus Lauff <ioBroker.rct@markus.lauff.com>