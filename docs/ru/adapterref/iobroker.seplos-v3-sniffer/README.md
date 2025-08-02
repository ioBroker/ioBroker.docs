---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.seplos-v3-sniffer/README.md
title: ioBroker.seplos-v3-сниффер
hash: snOYxX39iBN2/nEN5uJR+Z0bTgu5GGF46xmmOhASu7w=
---
![Логотип](../../../en/adapterref/iobroker.seplos-v3-sniffer/admin/seplos-v3-sniffer.jpg)

![версия НПМ](https://img.shields.io/npm/v/iobroker.seplos-v3-sniffer.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.seplos-v3-sniffer.svg)
![Количество установок](https://iobroker.live/badges/seplos-v3-sniffer-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/seplos-v3-sniffer-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.seplos-v3-sniffer.png?downloads=true)

# IoBroker.seplos-v3-sniffer
**Тесты:** ![Тест и выпуск](https://github.com/DpunktS/ioBroker.seplos-v3-sniffer/workflows/Test%20and%20Release/badge.svg)

## Адаптер seplos-v3-sniffer для ioBroker
[www.seplos.com](https://www.seplos.com/)

Этот адаптер был разработан для чтения Seplos V3 BMS в конфигурации multipack. В поколении V3 первый BMS действует как ведущий Modbus, в то время как все остальные BMS действуют как ведомые. В этой конфигурации больше невозможно получить доступ к BMS через Modbus с третьего устройства, поскольку два ведущих устройства не могут существовать в системе RS-485 Modbus. Адаптер пассивно обнаруживает связь между устройствами, что означает, что связь отдельных BMS не нарушается. Он может взаимодействовать либо через локальный интерфейс (например, /dec/ttyS0), либо через Ser2Net (tcp://ip:2001).

Адаптер автоматически определяет количество доступных устройств и создает соответствующие точки данных. BMS передает новый набор данных каждые 200 мс. Интервал обновления можно настроить на странице конфигурации адаптера (значение по умолчанию: 5 секунд).

![сеплос 4x](https://github.com/user-attachments/assets/9d710287-069d-44b6-acda-e96764642a33)

Для установки соединения контакты 1/8 (B), 2/7 (A) и 5 ​​(GND) должны быть подключены к адаптеру RS485. Можно использовать различные адаптеры RS485, например RS485 в USB или RS485 в TTL. Важно проверить, как система обнаружила соответствующий адаптер, и ввести интерфейс соответствующим образом в «последовательный адаптер» (например, /dev/ttyUSB0 или /dev/ttyS0). Если используется Ser2Net, следует ввести адрес tcp://ip:2001. Сервер Ser2Net должен быть настроен на предоставление данных в формате RAW. Самый простой способ — использовать ESP8266/ESP32 с ESPHome (см. мой пример ниже).

В ходе моих тестов я обнаружил, что терминатор 120 Ом в адаптере не нужен. Терминатор также отсутствует в оригинальном USB-адаптере Seplos V3. Если необходимо прочитать только один BMS, необходимо подключить контакт 6 (B) к контакту 5 (GND), чтобы мастер мог отправлять данные независимо.

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

В настоящее время считываются следующие данные:

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
### **WORK IN PROGRESS**

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

Copyright (c) 2025 DpunktS <dpunkts@online.de>

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