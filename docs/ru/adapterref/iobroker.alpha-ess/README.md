---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.альфа-есс
hash: MQlhZDufCij98ZD1mBBFOylZ/vD+HChaCplicsJj9ZI=
---
![Логотип](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![Количество установок (последнее)](http://iobroker.live/badges/alpha-ess-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/alpha-ess-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![Известные уязвимости](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# IoBroker.alpha-ess
## Альфа-ess адаптер для ioBroker
---

### Для получения поддержки, пожалуйста, откройте вопрос на GitHub или посетите
https://forum.iobroker.net/post/892023 https://www.storion4you.de/thread/683

---

### В связи со сложившимися обстоятельствами, пожалуйста, примите это к сведению!
[Объявление об ограничении интерфейса](https://github.com/alphaess-developer/alphacloud_open_api/issues/54)

---

Этот адаптер входит в веб-API [Альфа-ЕСС](https://www.alphaess.com/) и извлекает информацию для вашего оборудования Alpha-ESS.\ В зависимости от вашего продукта Alpha-ESS, можно получать данные в реальном времени и данные конфигурации для вашего оборудования. Какие точки данных возвращаются API, зависит от вашего оборудования Alpha-ESS.

Этот адаптер использует Alpha-ESS Open API, который является официальным и документированным API для устройств Alpha-ESS.

Атрибут качества каждого состояния устанавливается в соответствии с его статусом:

| Качество | значение |
|:--------|:--------------------------------------------------|
|0x00 |ОК и актуально |
|0x01 |значение не обновлено по неизвестной причине, см. журнал отладки |
|0x02 |проблема с онлайн-подключением для этой точки данных |
|0x12 |адаптер отключен или остановлен |
|0x44 |API вернул ошибку или внутреннюю ошибку, см. журнал отладки |

## Настройки:
Чтобы использовать API Alpha-ESS Open, вам необходимо зарегистрировать свое устройство Alpha-ESS на https://open.alphaess.com. После регистрации вы получите идентификатор разработчика и ключ разработчика (называемый «Secret»). Они вам понадобятся для доступа к API Open.
Как найти серийный номер и проверочный код для регистрации, описано здесь: https://github.com/alphaess-developer/alphacloud_open_api

- **Персональный идентификатор приложения:** Идентификатор приложения (см. выше)
- **Персональный Секрет приложения:** Секрет приложения (см. выше)
- **Идентификатор системы Alpha-ESS:** Серийный номер (S/N) вашего оборудования Alpha-ESS
- **Интервал считывания данных в реальном времени:** Единица измерения: секунды.
- **Интервал считывания данных об энергии:** Единица измерения: минуты.
- **Интервал считывания настроек зарядки:** Единица измерения: минуты.
- **Интервал считывания настроек разрядки:** Единица измерения: минуты.
- **Интервал для считывания сводных данных:** Единица: минуты.
- **Интервал для чтения данных Wallbox:** Единица: минуты. Внимание: в настоящее время поддерживается только один Wallbox.
- **Обновлять неизмененные состояния:** Если этот параметр отмечен, состояния изменяются, даже если соответствующее значение не изменилось.

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками их соответствующих владельцев. Их использование не подразумевает какой-либо связи или одобрения ими или любыми связанными дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет бизнес-целей.**

## Changelog
### 2.1.6 (2024-12-01)

- (Gaspode) Migrated to ESLint 9

### 2.1.5 (2024-11-14)

- (Gaspode) Optimized GUI for all screen resolutions (responsive design)

### 2.1.4 (2024-08-13)

- (Gaspode) Updated some formal stuff

### 2.1.3 (2024-08-07)

- (Gaspode) Increased read timeout from 10 to 20 s

### 2.1.2 (2024-08-07)

- (Gaspode) Quality of states optimized

### 2.1.1 (2024-08-07)

- (Gaspode) Do not longer report read timeouts as error. It should be enough to set the quality of concerned states to values according the table above and to display warnings, if values were not updated for a long time. To see details, debug log level must be enabled by the user.

### 2.1.0 (2024-08-01)

- (Gaspode) Adapter requires node.js >= 18 and js-controller >= 5 now
- (Gaspode) Dependencies updated
- (Gaspode) Adapter logo updated. Alpha-ESS has kindly permitted to use the Alpha-ESS logo. This does not imply any affiliation with Alpha-ESS! Alpha-ESS is not the developer or provider of this adapter!

### 2.0.2 (2024-01-12)

- (Gaspode) Updated Copyright year

### 2.0.1 (2024-01-03)

- (Gaspode) Adapted timeout to new API restrictions

### 2.0.0 (2023-12-02)

- (Gaspode) Breaking Change: Removed support of Closed API

### 1.3.0 (2023-11-22)

- (Gaspode) Support wallbox with Open API
- (Gaspode) Start and stop charging of wallbox with Open API

### 1.2.1 (2023-11-11)

- (Gaspode) Fixed severe error in ClosedAPI

### 1.2.0 (2023-11-10)

- (Gaspode) Added additional realtime attributes for OpenAPI

### 1.1.1 (2023-11-04)

- (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

- (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
- (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

- (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

- (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

- (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
- (Gaspode) Set state quality accordingly to status of data
- (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
- (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

- (Gaspode) Optimized deletion of group states
- (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

- (Gaspode) Read selected statistical data
- (Gaspode) Added Summary data
- (Gaspode) Refactored complete implementation
- (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
- (Gaspode) Remove disabled states at adapter startup
- (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
- (Gaspode) Optimized rounding for selected values
- (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

- (Gaspode) First release for Latest repository
- (Gaspode) Corrected typo in state ID Battery_SOC
- (Gaspode) Implemented improvements as suggested in code review
- (Gaspode) Slow down requests in case of permanent errors
- (Gaspode) Changed adapter type from metering to energy
- (Gaspode) Correction for NPM
- (Gaspode) Enable NPM

### 0.0.5

- (Gaspode) Use meaningful state names
- (Gaspode) Use suitable state roles
- (Gaspode) Added new state for Alpha-ESS settings parameter 'upsReserve'

### 0.0.4

- (Gaspode) use axios to perform Alpha-ESS API calls instead of deprecated request
- (Gaspode) New option "Update unchanged states" added

### 0.0.3

- (Gaspode) refactored API calls, added daily energy values

### 0.0.2

- (Gaspode) corrected api call for realtime data

### 0.0.1

- (Gaspode) initial release

## License

MIT License

Copyright (c) 2024 Gaspode <gaspode69@online.de> (**NO SUPPORT VIA EMAIL**)

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