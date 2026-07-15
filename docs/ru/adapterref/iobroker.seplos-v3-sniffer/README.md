---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.seplos-v3-sniffer/README.md
title: ioBroker.seplos-v3-sniffer
hash: 8bSCVtLKER3vRTxSHeRJQXp3hvFSYf9PsPG5Y0oMWSE=
---
![Логотип](../../../en/adapterref/iobroker.seplos-v3-sniffer/admin/seplos-v3-sniffer.jpg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.seplos-v3-sniffer.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.seplos-v3-sniffer.svg)
![Количество установок](https://iobroker.live/badges/seplos-v3-sniffer-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/seplos-v3-sniffer-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.seplos-v3-sniffer.png?downloads=true)

# IoBroker.seplos-v3-sniffer
**Тесты:** ![Тестирование и выпуск](https://github.com/DpunktS/ioBroker.seplos-v3-sniffer/workflows/Test%20and%20Release/badge.svg)

## Адаптер seplos-v3-sniffer для ioBroker
[www.seplos.com](https://www.seplos.com/)

Этот адаптер разработан для считывания данных с BMS Seplos V3 в конфигурации с несколькими устройствами. В поколении V3 первое устройство BMS выступает в роли ведущего устройства Modbus, а все остальные — в роли ведомых. В такой конфигурации доступ к BMS через Modbus с третьего устройства больше невозможен, поскольку в системе RS-485 Modbus не может существовать два ведущих устройства. Адаптер пассивно обнаруживает связь между устройствами, что означает, что связь между отдельными устройствами BMS не прерывается. Он может обмениваться данными либо через локальный интерфейс (например, /dec/ttyS0), либо через Ser2Net (tcp://ip:2001).

Адаптер автоматически определяет количество доступных устройств и создает соответствующие точки данных. Система управления батареей (BMS) передает новый набор данных каждые 200 мс. Интервал обновления можно настроить на странице конфигурации адаптера (значение по умолчанию: 5 секунд).

![сеплос 4х](https://github.com/user-attachments/assets/9d710287-069d-44b6-acda-e96764642a33)

Для установления соединения необходимо подключить контакты 1/8 (B), 2/7 (A) и 5 ​​(GND) к адаптеру RS485. Можно использовать различные адаптеры RS485, например, RS485-USB или RS485-TTL. Важно проверить, как система обнаружила соответствующий адаптер, и ввести интерфейс в поле "последовательный адаптер" (например, /dev/ttyUSB0 или /dev/ttyS0). Если используется Ser2Net, следует ввести адрес tcp://ip:2001. Сервер Ser2Net должен быть настроен на передачу данных в формате RAW. Простой способ — использовать ESP8266/ESP32 с ESPHome (см. мой пример ниже).

В ходе моих тестов я обнаружил, что 120-омный терминатор в адаптере не нужен. В оригинальном USB-адаптере Seplos V3 терминатора тоже нет. Если необходимо считывать данные только с одного BMS, нужно соединить контакт 6 (B) с контактом 5 (GND), чтобы ведущее устройство могло передавать данные независимо.

![распиновка](https://github.com/user-attachments/assets/1c8ec271-d20f-4a5d-baf4-87e5a98fc35a)

Соединение Ser2Net было протестировано с помощью ESPHome.

```
external_components:
  - source: github://oxan/esphome-stream-server

uart:
- id: seplos
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 19200
  rx_buffer_size: 2048

stream_server:
   uart_id: seplos
   port: 2001
   buffer_size: 2048
```

В настоящий момент считываются следующие данные:

```
pack_voltage
current
remaining_capacity
total_capacity
total_discharge_capacity
soc
soh
cycle_count
average_cell_voltage
average_cell_temp
max_cell_voltage
min_cell_voltage
delta_cell_voltage
max_cell_temp
min_cell_temp
maxdiscurt
maxchgcurt
cell_1_voltage
cell_2_voltage
cell_3_voltage
cell_4_voltage
cell_5_voltage
cell_6_voltage
cell_7_voltage
cell_8_voltage
cell_9_voltage
cell_10_voltage
cell_11_voltage
cell_12_voltage
cell_13_voltage
cell_14_voltage
cell_15_voltage
cell_16_voltage
cell_temp_1
cell_temp_2
cell_temp_3
cell_temp_4
case_temp
power_temp
system_status
active_balancing_cells
cell_temperature_alarms
cell_voltage_alarms
FET_status
active_alarms
active_protections
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-04-08)
* (DpunktS) add delta_cell_voltage

### 0.1.1 (2025-02-28)
* (DpunktS) bugfix

### 0.1.0 (2025-02-25)
* (DpunktS) infos, alarms and protections messages added

### 0.0.8 (2025-02-22)
* (DpunktS) ioBroker repository checker bugfix

### 0.0.7 (2025-02-19)
* (DpunktS) ioBroker repository checker Issues #9 fix

### 0.0.6 (2025-02-13)
* (DpunktS) adapter-dev 1.0.1 > 1.3.0

### 0.0.5 (2025-02-12)
* (DpunktS) connections status added

### 0.0.4 (2025-02-12)
* (DpunktS) bugfix

### 0.0.3 (2025-02-12)
* (DpunktS) bugfix

### 0.0.2 (2025-02-12)
* (DpunktS) npm release

### 0.0.1 (2025-01-11)
* (DpunktS) initial release

## License
MIT License

Copyright (c) 2025-2026 DpunktS <dpunkts@online.de>

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