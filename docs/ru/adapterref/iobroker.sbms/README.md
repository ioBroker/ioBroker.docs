---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sbms/README.md
title: ioBroker.sbms
hash: LQkEOgiSfkvPuGO/8ZATWLxNkDZquclyBg+fSvrpmb8=
---
![Логотип](../../../en/adapterref/iobroker.sbms/admin/sbms.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.sbms.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sbms.svg)
![Количество установок](https://iobroker.live/badges/sbms-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/sbms-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sbms.png?downloads=true)
![Тестирование и выпуск](https://github.com/buffoletti/ioBroker.sbms/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sbms

## Адаптер Electrodacus SBMS для ioBroker

Простой адаптер для передачи данных из [Electrodacus SBMS](https://electrodacus.com/) в виде состояний через MQTT, HTML-страницу rawData или последовательный порт.

Структура и параметры были немного изменены по сравнению с исходным потоком данных. Если включена опция отправки полного сообщения, исходные данные дополнительно передаются в папки sbms.x.mqtt/html/serial.

При использовании любого из 3 методов с включенным Wi-Fi я обнаружил, что даже при интервалах обновления в 1 секунду новые данные часто предоставляются только каждые 2 секунды, как видно из поля sbms.time.second, так что это максимально ожидаемый результат. Для получения стабильных обновлений с интервалом в 1 секунду используйте последовательный порт и установите параметр USART Data Log Option в значение 1 на SBMS. Таким образом, информация о счетчиках и балансировке недоступна.

Протестировано только на SBMS0.

### Последовательный порт / USB с платой расширения Wi-Fi

1. В SBMS проверьте скорость передачи данных (фиксированная на 921600 при включенном Wi-Fi).
2. Подключите хост к USB-порту SBMS (или используйте USB-последовательный адаптер и подключитесь напрямую, если у вас нет платы расширения Wi-Fi).
3. На хосте определите последовательный порт с помощью`ls /dev/serial/by-id`
4. Настройте адаптер соответствующим образом на странице администрирования.
5. Настройка интервала обновления (1 с: обработка всего потока)

Примечания:

- В руководстве по SBMS указано, что скорость передачи данных 921,6 кбит/с может быть ненадежной.
- Если в административной панели адаптера настроен последовательный порт, то функции MQTT и HTML деактивируются.

### MQTT

1. Настройте MQTT-брокер и подключитесь к iobroker.
2. Подключите SBMS к Wi-Fi и брокеру MQTT.
3. Определите состояние ioBroker, которое получает JSON-данные SBMS (по умолчанию root/sbms).
4. В конфигурации адаптера SBMS имя темы указывается в формате iobroker с точками.
5. Настройка интервала обновления (1 с: обрабатывается каждое обновление состояния темы)

### HTML-страница rawData

На HTML-странице rawData содержится дополнительная информация (например, счетчики и балансировка).

1. Подключите SBMS к Wi-Fi
2. Определите IP-адрес и установите статический IP-адрес (для Wi-Fi роутера).
3. В имени адаптера SBMS указан IP-адрес.
4. Настройте интервал обновления

Если включены параметры MQTT и HTML, основная информация обновляется из потока MQTT, тогда как параметры батареи и счетчики из rawPage.balancer не помещаются в общую структуру данных.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.4.3 (2025-11-20)
- update release workflow and npm trusted publishing
- dev Depencies

### 0.4.2 (2025-10-06)
- Dependencies

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