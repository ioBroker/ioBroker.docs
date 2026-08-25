---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: oaqoou6vvpehAbAq3LqCQlfGuultuiw9HVLcvogU/Sg=
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

### Обнаружение датчиков Home Assistant
Для числовых сенсорных устройств мост назначает атрибуты Home Assistant `device_class` и `state_class` в соответствии с соглашением адаптера о приоритете счетчика. Для текущих измерений используется `measurement`. Для состояний направления ветра с ролью ioBroker `value.direction.wind` используется класс устройства `wind_direction` и класс состояния `measurement_angle`; существующая единица измерения сохраняется, а `°` добавляется, если единица измерения не определена. Значения энергии в `Wh`, `kWh` или `MWh`, а также значения, идентифицированные ролью ioBroker в отношении энергии или потребления, рассматриваются как счетчики потребления и используют `total_increasing` для статистики энергопотребления Home Assistant. Если величину невозможно надежно отличить от показаний потребления, мост предпочитает семантику счетчиков: `m³` и `ft³` публикуются как `gas` с `total_increasing`, а `L` как `water` с `total_increasing`. `mL` и `gal` остаются общими значениями `volume`. Неоднозначные единицы концентрации, такие как `ppm`, `ppb` или `µg/m³`, не указывают на конкретное вещество. `L/min`, `L/s` и `m³/h` используют `volume_flow_rate`.

## ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Права на товарные знаки и названия компаний остаются за их владельцами и не имеют отношения к данному адаптеру. Оператор адаптера должен и впредь придерживаться политики добросовестного использования. При создании форка данного репозитория необходимо указывать его в качестве источника.

LoRa® является зарегистрированным товарным знаком или знаком обслуживания корпорации Semtech или ее дочерних компаний.

LoRaWAN® — это лицензированный товарный знак.

Я не имею никакого отношения к упомянутым брендам, их дочерним компаниям, логотипам или товарным знакам, и они меня не поддерживают.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.22.33 (2026-08-19)
- (BenAhrdt) Add Home Assistant wind direction and angle measurement classification

### 1.22.32 (2026-08-19)
- (BenAhrdt) Align Home Assistant sensor device classes, state classes, and units with the current specification

### 1.22.31 (2026-07-09)
- (BenAhrdt) Add selection of ToIob source id

### 1.22.30 (2026-07-07)
- (BenAhrdt) Add PIR Mini device Profile
- (BenAhrdt) Add possibillity to ad states to downlink numbers

### 1.22.29 (2026-07-06)
- (BenAhrdt) Add some roles and units to assignhandler

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