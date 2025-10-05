---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sbms/README.md
title: ioBroker.sbms
hash: AR1e9Yuaa4B4UTBx4REZgDYRTfmg0XKY4chdC1kyeGA=
---
![Логотип](../../../en/adapterref/iobroker.sbms/admin/sbms.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.sbms.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sbms.svg)
![Количество установок](https://iobroker.live/badges/sbms-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/sbms-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sbms.png?downloads=true)

# IoBroker.sbms
**Тесты:** ![Тестирование и выпуск](https://github.com/buffoletti/ioBroker.sbms/workflows/Test%20and%20Release/badge.svg)

## Адаптер Electrodacus SBMS для ioBroker
Простой адаптер, позволяющий сделать данные из [Электродакус СБМС](https://electrodacus.com/) доступными в виде состояний из MQTT, html-страницы rawData или последовательного порта.

Единицы измерения и структура исходного потока данных были немного изменены. Если включена опция полного сообщения, исходные данные дополнительно отправляются в папки sbms.x.mqtt/html/serial.

При использовании любого из трёх методов с включённым Wi-Fi я обнаружил, что даже при интервале обновления в 1 секунду новые данные часто предоставляются только каждые 2 секунды, как видно в поле sbms.time.second, так что это максимум, которого можно ожидать. Для получения постоянных обновлений каждые 1 секунду используйте последовательный порт, а в SBMS установите параметр журнала данных USART на 1. В этом случае счётчики и информация о балансировке будут недоступны.

Протестировано только на SBMS0.

### Последовательный порт / USB с платой расширения Wi-Fi
1. В SBMS проверьте скорость передачи данных (фиксированная скорость 921600 при включенном Wi-Fi)
2. Подключите хост к USB-порту SBMS (или используйте адаптер USB-Serial и подключитесь напрямую, если у вас нет платы расширения Wi-Fi)
3. На хосте идентифицируйте последовательный порт с помощью `ls /dev/serial/by-id`
4. Настройте соответствующим образом страницу администрирования адаптера.
5. Настройте интервал обновления (1 с: обрабатывается весь поток)

Примечания:

- В руководстве SBMS говорится, что скорость передачи данных 921,6 кбит/с может быть ненадежной.
- Если последовательный порт настроен в администраторе адаптера, MQTT и HTML деактивируются.

### MQTT
1. Настройте MQTT Broker и подключите iobroker.
2. Подключите SBMS к Wi-Fi и брокеру MQTT.
3. Определите состояние ioBroker, которое получает SBMS JSON (по умолчанию root/sbms)
4. В теме конфигурации адаптера SBMS укажите имя в формате iobroker с точками
5. Настройте интервал обновления (1 с: обрабатывается каждое обновление состояния темы)

### HTML-страница rawData
HTML-страница rawData содержит дополнительную информацию (например, счетчики и балансировку)

1. Подключите SBMS к Wi-Fi
2. Определите IP-адрес и установите статический (Wi-Fi-роутер)
3. В имени адаптера SBMS IP-адрес
4. Настройте интервал обновления.

Если включены параметры MQTT и HTML, базовая информация обновляется из потока MQTT, тогда как параметры батареи и счетчики — из rawPage. Балансировка не помещается в общую структуру данных.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.4.1 (2025-09-28)
- fix: negative loads when using non-pv chargers

### 0.4.0 (2025-09-25)

Review add to latest:
- Breaking: Object Tree (cells.min > cells.min.voltage, cells.max.ID > cells.maxID)
- added multilanguage support
- fix connection watchdog intervals, change to adapter.intervals, safe ui intervals
- cleaning: devDependencies, object tree, eslint 9
- debug logs changed to iobroker standard


### 0.3.0 (2025-09-15)

- Support for USART Data Log Optin added

### 0.2.0 (2025-09-13)

- New object tree structure for info/parameters, flags and balancing

### 0.1.2 (2025-09-12)

- Added Serial Port

### 0.0.1 (2025-09-02)

- Initial Release

## License

MIT License

Copyright (c) 2025 buffoletti <info@buffoletti.de>

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