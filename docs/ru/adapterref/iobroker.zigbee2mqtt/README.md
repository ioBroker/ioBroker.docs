---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zigbee2mqtt/README.md
title: ioBroker.zigbee2mqtt
hash: yXUMuTuBvZQ81LA9ez0ERkZmo+nojx0LUh5r+7Lnrfc=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.zigbee2mqtt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zigbee2mqtt.svg)
![Количество установок](https://iobroker.live/badges/zigbee2mqtt-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/zigbee2mqtt-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zigbee2mqtt.png?downloads=true)
![Тестирование и выпуск](https://github.com/arteck/ioBroker.zigbee2mqtt/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/arteck/ioBroker.zigbee2mqtt/actions/workflows/codeql.yml/badge.svg?branch=main)

<img src="admin/zigbee2mqtt.png" width="200" />

# ioBroker.zigbee2mqtt

**Тесты:**

## адаптер zigbee2mqtt для ioBroker

Этот адаптер позволяет управлять точками данных устройств экземпляра Zigbee2MQTT в ioBroker.

## Поиск неисправностей

Если в логе вы видите сообщение с текстом Caught by controller\[1]: /opt/iobroker/node\_modules/iobroker.zigbee2mqtt/node\_modules/sharp/lib/sharp.js, проверьте настройки вашей виртуальной машины.

<img width="619" height="238" alt="grafik" src="https://github.com/user-attachments/assets/83879925-96f8-4c33-a6cd-2b68e4b41780" />
<img width="618" height="216" alt="grafik" src="https://github.com/user-attachments/assets/30c33952-b055-4d6f-99d9-f7cc49831db3" />
<img width="711" height="497" alt="grafik" src="https://github.com/user-attachments/assets/803340a6-f000-4e64-b53f-8e80f2a13127" />

## Документация по адаптеру

[Документация по адаптеру](/#/docs/adapterref/iobroker.zigbee2mqtt/docs/wiki.md)

## Changelog
### **WORK IN PROGRESS**
* (arteck) fix available status direct after new device is paired

### 3.2.6 (2026-08-20)
* (arteck) add wait time for internal mqtt server into settings

### 3.2.5 (2026-08-04)
* (arteck) State updates lag issue https://github.com/arteck/ioBroker.zigbee2mqtt/issues/662

### 3.2.4 (2026-06-26)
* (arteck) Dependencies have been updated

### 3.2.3 (2026-06-25)
* (arteck) typo
* (arteck) fix some warnings
* (arteck) fix internal mqtt
* (arteck) fix languages

### 3.2.2 (2026-05-26)
* (arteck) Dependencies have been updated

## License

MIT License

Copyright (c) 2025-2026 Arthur Rupp <arteck@outlook.com>,

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