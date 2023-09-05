---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: dKOLwGLUrES+/onbfQwzxVAzlZbq1/kxHEkiJSe7nTI=
---
![Логотип](../../../en/adapterref/iobroker.rct/admin/rct.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.rct.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rct.svg)
![Количество установок (последних)](https://iobroker.live/badges/rct-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/rct-stable.svg)
![Статус зависимости](https://img.shields.io/david/aruttkamp/iobroker.rct.svg)
![НПМ](https://nodei.co/npm/iobroker.rct.png?downloads=true)

# IoBroker.rct
**Тесты:** ![Тестирование и выпуск](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## Смена владельца
После того, как Лауфф перешел на Home Assistant - проект будет продолжен aruttkamp

##адаптер RCT для ioBroker
Обратите внимание, что это частный проект и что я (Андреас Рутткамп) не имею никакого отношения к RCT.

Показать характеристики фотоэлектрического преобразователя энергии RCT Power

## ПРИМЕЧАНИЯ
### Первоначальный продуктивный выпуск
Это первоначальный продуктивный выпуск после того, как предыдущая версия оказалась стабильной и выполнила минимально возможный объем.

Конфигурация по-прежнему ограничена и скорее техническая. С помощью «RCT ELEmente» можно выбрать, какие данные следует считывать с преобразователя мощности. По умолчанию используется «battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[ 1].flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board .s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_sm.island_flag,prim_sm.state". Остальные элементы можно найти в коде (файл «rct/rc_core2.js»). Но это совсем не самоописательно (даже не проверено).

## Известные вопросы
### Неправильные каналы/состояния
Новая версия может не иметь возможности создавать правильные каналы/состояния ioBroker. В большинстве случаев это можно распознать по узлу «батарея», отображающемуся как отдельный элемент, а не как папка.

Если это произойдет, остановите адаптер и вручную удалите узел «rct.0».

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Andreas Ruttkamp) Connection state bei Stop des Adapters zurückgesetzt
* (Andreas Ruttkamp) Connection state bei Start des Adapters nochmals angepasst

### 1.1.7 (2023-08-30)
* (Andreas Ruttkamp) Connection state korrigiert

### 1.1.6 (2023-08-23)
* (Andreas Ruttkamp) rct_core.js entfernt (wurde durch rct_core2 ersetzt)
* (Andreas Ruttkamp) Parameter die nicht unterstützt werden aus Defaultbelegung entfernt.
* (Andreas Ruttkamp) min. Node 18

### 1.1.5 (2023-08-18)
* (Andreas Ruttkamp) Fix: Abbruch bei lesen von UInt8 Datentypen behoben
* (Andreas Ruttkamp) Verzeichnisse aufgeräumt

### 1.1.4 (2023-08-18)
* (Andreas Ruttkamp) Fix: Rückgabewerte nochmals angepasst.

### 1.1.3 (2023-08-18)
* (Andreas Ruttkamp) Fix: Weitere Datenprüfungen eingbaut

### 1.1.2 (2023-08-17)
* (Andreas Ruttkamp) Fix: Abbruch des Adapters

### 1.1.1 (2023-08-17)
* (Andreas Ruttkamp) Daten für g_sync.p_ac_load[0-2] / dc_conv.dc_conv_struct[0-1].u_sg_lp hinzugefügt
* (Andreas Ruttkamp) Weitere Parameter ergänzt. 
* (Andreas Ruttkamp) Konvertierungsproblem mit Datumswerten behoben
* (Andreas Ruttkamp) Konvertierungsfehler bei % Werten behoben
* (Andreas Ruttkamp) Abbruch der Instanz bei Übertragungsfehlern behoben

### 1.0.5 (2023-07-29)
* (Andreas Ruttkamp) interne Arbeiten
* (Andreas Ruttkamp) Umgebung für Neuen Admin aktualisiert
* (Andreas Ruttkamp) Abhängigkeiten aktualisiert

### 1.0.4 (2023-04-24)
* (Andreas Ruttkamp) Release Script added and update dev-components
* (Andreas Ruttkamp) Vorbereitung neues Backend

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

Copyright (c) 2023 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>