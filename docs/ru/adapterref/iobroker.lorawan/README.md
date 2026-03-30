---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: sMZfwV8TUXXWa4qLliB0sgdbz+aEsEcCI6vT/aASaxo=
---
![Логотип](../../../en/adapterref/iobroker.lorawan/admin/lorawan.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.lorawan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lorawan.svg)
![Количество установок](https://iobroker.live/badges/lorawan-stable.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![НПМ](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)

# IoBroker.lorawan
![Тестирование и выпуск](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)

## Адаптер lorawan для ioBroker
Адаптер осуществляет двустороннюю связь с устройствами LoRaWAN через сетевой сервер LoRaWAN по протоколу MQTT.
В настоящее время поддерживаются сети «The Thinks Network» и «Chirpstack», в дальнейшем могут быть добавлены и другие.
Адаптер создан в сотрудничестве с Йоргом Фрёнером LoraWan@hafenmeister.com

Документация в вики находится здесь: https://github.com/BenAhrdt/ioBroker.lorawan/wiki<br/> На данный момент документация на английском языке доступна здесь: https://wiki.hafenmeister.de

## ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Права на товарные знаки и названия компаний остаются за их владельцами и не имеют отношения к данному адаптеру.
Оператор адаптера должен и впредь придерживаться политики добросовестного использования.
В случае создания форка этого репозитория необходимо указать в качестве источника.

LoRa® является зарегистрированным товарным знаком или знаком обслуживания корпорации Semtech или ее дочерних компаний.

LoRaWAN® — это лицензированный товарный знак.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.21.8 (2026-03-04)
* (BenAhrdt) update icons

### 1.21.7 (2026-03-04)
* (BenAhrdt) update logic for icons and link building

### 1.21.6 (2026-03-04)
* (BenAhrdt) change logic for TTN link and change base ip handling
* (BenAhrdt) set more devices at default

### 1.21.5 (2026-03-04)
* (BenAhrdt) implements link to Chirpstack / TTN

### 1.21.4 (2026-03-03)
* (BenAhrdt) update the updateBridge function in objectStore
* (BenAhrdt) improve LoraWAN and ToIob funkction (init / update)

### 1.21.3 (2026-03-02)
* (BenAhrdt) add Link to ToIoB Devices

### 1.21.2 (2026-03-02)
* (BenAhrdt) update icon for device link

### 1.21.1 (2026-03-02)
* (BenAhrdt) bring possibility for editing base ip in devce Manager

### 1.21.0 (2026-03-02)
* (BenAhrdt) update deviceManager (dm-utils) to 3.0.0
* (BenAhrdt) add Links for Bridge devices

### 1.20.57 (2026-03-02)
* (BenAhrdt) bugfix query for null

### 1.20.56 (2026-03-02)
* (BenAhrdt) implement deviceId Handling from bridge

### 1.20.55 (2026-03-02)
* (BenAhrdt) catch publishing value (null) and log warning for this id

### 1.20.54 (2026-02-27)
* (BenAhrdt) update dependencies
* (BenAhrdt) bugfix button press

### 1.20.53 (2026-02-21)
* (BenAhrdt) errorhandling in case of aggregat error with mqtt connection

### 1.20.52 (2026-02-20)
* (BenAhrdt) bugfix show ToIob always in device Manager
* (BenAhrdt) correction of wording in downlink Profil Vicki
* (BenAhrdt) add role button.mode.startMotorcalibration

### 1.20.51 (2026-02-14)
* (BenAhrdt) including of more entites in ToIob functionality (light, climate, hummidifier, lock, cover)

### 1.20.50 (2026-02-10)
* (BenAhrdt) implements light to ToIoB function

### Older entries
[here](OLD_CHANGELOG.md)

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>  
Copyright (c) 2025-2026 Joerg Froehner <LoraWan@hafenmeister.com>

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