---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: lKGiezjOoJXiCCR7Lh7hs3Om8sJBs/GZ76i6tRg04/s=
---
![Логотип](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Количество установок (последние)](https://iobroker.live/badges/ems-esp-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/ems-esp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Тесты:** ![Тестирование и выпуск](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Системы отопления Bosch / Buderus с интерфейсами km200 / IP-inside и/или ems-esp
Адаптер обеспечивает интерфейс для подключения к системам отопления Bosch Group с использованием шины EMS или EMS+.

(Bosch / Buderus / Junkers / Netfit и др.).

## Адаптер может взаимодействовать с системой отопления с помощью вызовов API. Поддерживаемые шлюзы:
* km200, km200 hRV, km100, km50, HMC300 или IP-inside (от Bosch Group)

* Шлюз ems-esp (https://github.com/emsesp/EMS-ESP32) с чипом ESP32.

Адаптер протестирован на шлюзе ems-esp с последней стабильной версией прошивки. Последние версии прошивки для разработчиков могут работать нестабильно с адаптером ioBroker. Использование осуществляется на собственный риск.

ПОЖАЛУЙСТА, УЧИТЫВАЙТЕ РЕГУЛЯРНЫЕ ИЗМЕНЕНИЯ В ПРОШИВКЕ EMS_ESP — АДАПТЕР ioBROKER МОЖЕТ НЕ РАБОТАТЬ С НЕЙ!!!

* Новые облачные шлюзы Bosch-Group (MX300 / EasyControl ...) не поддерживаются, поскольку они не поддерживают API локальной сети!

Адаптер ioBroker ems-esp может считывать и записывать данные на оба шлюза для управления всеми компонентами системы отопления.
Его можно использовать как с оригинальными шлюзами Bosch-Group, так и с ems-esp, или с обоими одновременно.
Для всех изменений состояний, внесенных собственными скриптами или обозревателем объектов, необходимо установить acknowledged = false !!!

Немецкая документация: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

Документация на английском языке: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

Немецкий форум ioBroker: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

* Версия адаптера >= 7.0.0 поддерживает только версии прошивки ems-esp >= 7.2.0.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
### **WORK IN PROGRESS**
-->
### 7.0.8 (2026-07-05)
* fixing issues detected by repository checker

### 7.0.7 (2026-06-29)
* dependabot updates
* fixing issues detected by repository checker

### 7.0.6 (2026-06-20)
* dependabot updates 
* fixing errors while restarting adapter

### 7.0.4 (2026-06-20)
* fixing issue on main

### 7.0.3 (2026-05-30)
* dependabot updates
* fixing issues detected by repository checker


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Thomas Petrick (tp1de)

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
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."