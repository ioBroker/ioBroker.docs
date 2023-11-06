---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.alpha-ess
hash: M6Pb96xs6fXW4YBZQe3uyrcsPXcBedj/6Y5T4mEyjMI=
---
![Логотип](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![Количество установок (последних)](http://iobroker.live/badges/alpha-ess-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/alpha-ess-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![Известные уязвимости](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# IoBroker.alpha-ess
## Адаптер альфа-ess для ioBroker
Этот адаптер входит в веб-API [Альфа ЭСС](https://www.alphaess.com/) и получает информацию о вашем оборудовании Alpha ESS.\ В зависимости от вашего продукта Alpha ESS можно получать данные в реальном времени и данные конфигурации для вашего оборудования. Какие точки данных возвращает API, зависит от вашего оборудования Alpha ESS.

Этот адаптер поддерживает два API: внутренний веб-API Alpha ESS, который может быть изменен Alpha ESS в любое время, и открытый API Alpha ESS, который обеспечивает меньшую функциональность, но является официальным и документированным API для устройств Alpha ESS.

Начиная с версии 1.0.0-alpha.5 атрибут качества каждого состояния устанавливается в соответствии с его статусом:

| Качество | смысл |
|:--------|:--------------------------------------------------|
|0x00 |ОК и актуально |
|0x01 |значение не обновлено по неизвестной причине, см. журнал |
|0x02 |проблема с онлайн-соединением для этой точки данных |
|0x12 |адаптер отключен или остановлен |
|0x44 |API возвратил ошибку или внутреннюю ошибку, см. журнал |

## Настройки:
**Используемый API:** Выбирайте между неофициальным «закрытым» API и официальным «открытым» API. В зависимости от выбранного API доступны различные настройки.

**Закрытые настройки API:**

- **Имя пользователя:** Имя пользователя вашей учетной записи Alpha ESS.
- **Пароль:** пароль вашей учетной записи Alpha ESS.
- **Идентификатор системы Alpha ESS:** Системный идентификатор вашего оборудования Alpha ESS.
- **Интервал чтения данных в реальном времени:** Единица измерения: секунды.
- **Интервал чтения данных об энергии:** Единица измерения: минуты.
- **Интервал чтения данных настроек:** Единица измерения: минуты.
- **Интервал чтения статистических данных за текущий день:** Единица измерения: минуты.
- **Интервал чтения сводных данных:** Единица измерения: минуты.

Можно использовать демо-счет, предоставленный Alpha ESS. Учетные данные (имя пользователя, идентификатор системы) устанавливаются в адаптере как значения по умолчанию.
Пароль хранится в зашифрованном виде, поэтому его необходимо вводить вручную: демо

**Открыть настройки API:**

Чтобы иметь возможность использовать новый Open API, вам необходимо зарегистрировать свое устройство Alpha-ESS на https://open.alphaess.com. После регистрации вы получаете идентификатор разработчика и ключ разработчика (называемый «Секретный»). Они понадобятся вам для доступа к Open API. В настоящее время у меня нет информации, будет ли это изменено в будущем.
Как найти серийный номер и контрольный код для регистрации описано здесь: https://github.com/alphaess-developer/alphacloud_open_api

- **Личный идентификатор приложения:** Идентификатор приложения (см. выше).
- **Секрет личного приложения:** Секрет приложения (см. выше)
- **Идентификатор системы Alpha ESS:** Системный идентификатор вашего оборудования Alpha ESS.
- **Интервал чтения данных в реальном времени:** Единица измерения: секунды.
- **Интервал чтения данных об энергии:** Единица измерения: минуты.
- **Интервал считывания настроек зарядки:** Единица измерения: минуты.
- **Интервал считывания настроек разрядки:** Единица измерения: минуты.
- **Интервал чтения сводных данных:** Единица измерения: минуты.

## Отказ от ответственности
**Все названия и логотипы продуктов и компаний являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения с их стороны или любых связанных с ними дочерних компаний! Этот личный проект ведется в свободное время и не имеет бизнес-целей.**

## Changelog

### 1.1.1 (2023-11-04)

-   (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

-   (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
-   (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

-   (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

-   (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

-   (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
-   (Gaspode) Set state quality accordingly to status of data
-   (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
-   (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

-   (Gaspode) Optimized deletion of group states
-   (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

-   (Gaspode) Read selected statistical data
-   (Gaspode) Added Summary data
-   (Gaspode) Refactored complete implementation
-   (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
-   (Gaspode) Remove disabled states at adapter startup
-   (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
-   (Gaspode) Optimized rounding for selected values
-   (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

-   (Gaspode) First release for Latest repository
-   (Gaspode) Corrected typo in state ID Battery_SOC
-   (Gaspode) Implemented improvements as suggested in code review
-   (Gaspode) Slow down requests in case of permanent errors
-   (Gaspode) Changed adapter type from metering to energy
-   (Gaspode) Correction for NPM
-   (Gaspode) Enable NPM

### 0.0.5

-   (Gaspode) Use meaningful state names
-   (Gaspode) Use suitable state roles
-   (Gaspode) Added new state for Alpha ESS settings parameter 'upsReserve'

### 0.0.4

-   (Gaspode) use axios to perform Alpha ESS API calls instead of deprecated request
-   (Gaspode) New option "Update unchanged states" added

### 0.0.3

-   (Gaspode) refactored API calls, added daily energy values

### 0.0.2

-   (Gaspode) corrected api call for realtime data

### 0.0.1

-   (Gaspode) initial release

## License

MIT License

Copyright (c) 2023 Gaspode <gaspode69@online.de>

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