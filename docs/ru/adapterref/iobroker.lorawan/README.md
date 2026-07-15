---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: +2AvOJrUWLBQdvNOzwMRYXj8fqtf7D2p6OcPUqw847k=
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

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.22.31 (2026-07-09)
- (BenAhrdt) Add selection of ToIob source id

### 1.22.30 (2026-07-07)
- (BenAhrdt) Add PIR Mini device Profile
- (BenAhrdt) Add possibillity to ad states to downlink numbers

### 1.22.29 (2026-07-06)
- (BenAhrdt) Add some roles and units to assignhandler

### 1.22.28 (2026-07-05)
- (BenAhrdt) Add DewPointTemperature to assignhandler

### 1.22.27 (2026-07-04)
- (BenAhrdt) Bugfix warning for wrong id
- (BenAhrdt) Add Profile to downloadconfig

[Older changes can be found there](CHANGELOG_OLD.md)

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