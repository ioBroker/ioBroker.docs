---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.alpha-ess
hash: UslDWiBGRjPCtrHax99ES3x5k9QSerk9mrhTUe/Fm6s=
---
![Логотип](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![Количество установок (последние)](http://iobroker.live/badges/alpha-ess-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/alpha-ess-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![Известные уязвимости](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# IoBroker.alpha-ess
## Адаптер alpha-ess для ioBroker
Этот адаптер входит в веб-API [Альфа ЭСС](https://www.alphaess.com/) и извлекает информацию для вашего оборудования Alpha ESS.\ В зависимости от вашего продукта Alpha ESS можно получать данные в реальном времени и данные конфигурации для вашего оборудования. Какие точки данных возвращаются API, зависит от вашего оборудования Alpha ESS.

Этот адаптер основан на замечательной работе [Чарльз Гилландерс](https://github.com/CharlesGillanders/alphaess), реконструировавшего веб-API Alpha ESS. Это внутренний API, который Alpha ESS может изменить в любое время.

В настоящее время этот адаптер создает состояние с, надеюсь, самообъясняющим именем для каждой точки данных, которую мне удалось идентифицировать. Все остальные точки данных игнорируются. Во время запуска адаптера эти точки данных регистрируются как информационное сообщение.

По сути, можно изменить выбранные параметры конфигурации с помощью веб-API Alpha ESS. Это еще не реализовано.

## Настройки:
**Используемый API:** Выберите между неофициальным «Закрытым» API и официальным «Открытым» API (в разработке). В зависимости от выбранного API доступны различные настройки.

**Настройки закрытого API:**

- **Имя пользователя:** имя пользователя вашей учетной записи Alpha ESS.
- **Пароль:** пароль вашей учетной записи Alpha ESS.
- **Идентификатор системы Alpha ESS:** Идентификатор системы вашего оборудования Alpha ESS.
- **Интервал для чтения данных в реальном времени:** Единица измерения: секунды.
- **Интервал для чтения данных об энергии:** Единица измерения: минуты.
- **Интервал чтения данных настроек:** Единица измерения: минуты.
- **Интервал чтения статистических данных за текущий день:** Единица измерения: минуты.
- **Интервал для чтения сводных данных:** Единица измерения: минуты.

Можно использовать демо-счет, предоставленный Alpha ESS. Учетные данные (имя пользователя, идентификатор системы) устанавливаются в качестве значений по умолчанию в адаптере.
Пароль хранится в зашифрованном виде, поэтому его необходимо вводить вручную: demo

**Открыть настройки API:**

Чтобы иметь возможность использовать новый Open API, вам необходимо зарегистрировать свое устройство Alpha-ESS по адресу https://open.alphaess.com. После регистрации вы получаете идентификатор разработчика и ключ разработчика (называемый «Секрет»). Они понадобятся вам для доступа к Open API. В настоящее время у меня нет информации, будет ли это изменено в будущем.

- **Идентификатор личного приложения:** Идентификатор приложения (см. выше)
- **Секрет личного приложения:** Секрет приложения (см. выше)
- **Идентификатор системы Alpha ESS:** Идентификатор системы вашего оборудования Alpha ESS.
- **Интервал для чтения данных в реальном времени:** Единица измерения: секунды.
- **Интервал для чтения данных об энергии:** Единица измерения: минуты.
- **Интервал чтения настроек зарядки:** Единица измерения: минуты.
- **Интервал чтения настроек разрядки:** Единица измерения: минуты.
- **Интервал для чтения сводных данных:** Единица измерения: минуты.

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения ими или какими-либо связанными с ними дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет коммерческой цели.**

## Changelog
### 1.0.0-alpha.1 (2023-04-16)

-   (Gaspode) Writing charging and discharging settings implemented (OpenAPI only)

### 1.0.0-alpha.0 (2023-04-11)

-   (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS

### 0.5.0 (2023-03-05)

-   (Gaspode) Remove no more supported states at startup automatically
-   (Gaspode) Prepared data migration for future versions

### 0.4.0 (2023-02-16)

-   (Gaspode) Optimized deletion of group states
-   (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

-   (Gaspode) Rearranged statistical data and added more values. Many thanks to [Thorsten](https://github.com/ThorstenBoettler) for his valuable contribution in testing the early alpha versions of this release and providing informative suggestions and recommendations for new data points.
-   (Gaspode) Added Summary data
-   (Gaspode) Refactored complete implementation
-   (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
-   (Gaspode) Remove disabled states at adapter startup
-   (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
-   (Gaspode) Optimized rounding for selected values

### 0.2.1-beta.0 (2023-01-31)

-   (Gaspode) Read selected statistical data

### 0.2.0 (2023-01-19)

-   (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

-   (Gaspode) First release for Latest repository
-   (Gaspode) Corrected typo in state ID Battery_SOC
-   (Gaspode) Implemented improvements as suggested in code review

### 0.0.6-beta.5 (2023-01-07)

-   (Gaspode) Slow down requests in case of permanent errors

### 0.0.6-beta.4 (2023-01-03)

-   (Gaspode) Changed adapter type from metering to energy

### 0.0.6-beta.3 (2023-01-02)

-   (Gaspode) Correction for NPM

### 0.0.6-beta.2 (2023-01-02)

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