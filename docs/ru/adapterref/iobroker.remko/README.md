---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.remko/README.md
title: ioBroker.remko
hash: 4KPtUQOzEkAEa1uVsA8l3v4zWlOWKJZ64iBnw7OpKOY=
---
![Логотип](../../../en/adapterref/iobroker.remko/admin/remko.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.remko.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.remko.svg)
![Количество установок](https://iobroker.live/badges/remko-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/remko-stable.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![Тестирование и выпуск](https://github.com/mrdimixx/ioBroker.remko/workflows/Test%20and%20Release/badge.svg)

# ioBroker.remko

## Адаптер теплового насоса REMKO для ioBroker

Система считывает данные и управляет **тепловыми насосами REMKO с помощью Smart-Web / Smart-Control** (прошивка 4.26 и новее) локально через MQTT. Не требуется облачное хранилище и дополнительный MQTT-брокер.

Протестировано с: REMKO WKF 100, прошивка Smart-Web 4.28. Отзывы о других моделях (WKF, WSP, LWM, KWT…) приветствуются – пожалуйста, создайте заявку в системе.

Производитель: [REMKO GmbH & Co. KG](https://www.remko.de)

> **Предупреждение:** Данный проект не связан с компанией REMKO GmbH & Co. KG, не одобрен ею и не поддерживается ею. REMKO является товарным знаком соответствующего владельца. Использование на свой страх и риск.

## Как это работает

Устройство Smart-Control использует собственный MQTT-брокер (порт WebSocket 9001, который также используется веб-интерфейсом, и порт TCP 1883). При запуске адаптер считывает все необходимые данные **непосредственно из веб-интерфейса теплового насоса** .

| Источник                                 | Содержание                                                                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/js/smt.min.js`                         | версия прошивки → тема (например) `V04P28/SMTID`), учетные данные MQTT                                                                                    |
| `/json/smt18.json` +`/json/smtmain.json` | Полная база данных регистров (\~2150 регистров): тип, диапазон, количество десятичных знаков, единица измерения, текст, дерево меню, условия отображения. |

Ни один регистр не задан жестко — другие модели и версии прошивки используют свои собственные определения.

Протокол:

- читать: `CLIENT2HOST` ←`{"FORCE_RESPONSE":true,"query_list":[1082,5039,…],"CLIENT_ID":"SMT123I0000000000000000"}`
- отвечать: `HOST2CLIENT` →`{"values":{"1082":"01C2","5039":"01DC",…}}` (шестнадцатеричный формат с порядком байтов от старшего к младшему, масштабированный в соответствии с базой данных регистров)
- написать: тот же запрос с `"values":{"1082":"01E0"}`

## Конфигурация

| Вариант                            | Описание                                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| IP-адрес                           | IP-адрес Smart-Web / Smart-Control                                                                          |
| Транспорт / порт                   | WebSocket 9001 (по умолчанию, как в веб-интерфейсе) или MQTT TCP 1883                                       |
| Пароль/тема MQTT                   | Оставьте поле пустым — данные будут считываться автоматически из веб-интерфейса.                            |
| Быстрый запрос / полное обновление | интервал быстрого запроса (обзорные значения) и полного обновления всех регистров                           |
| Какие точки данных                 | например, веб-интерфейс (пользователь, статус, обзор) или дополнительно сервис/эксперт/ввод в эксплуатацию. |
| Записываемые регистры              | Выкл., пользовательское меню (рекомендуется) или все параметры (экспертный режим)                           |

## Объекты

Адаптер оценивает **условия отображения веб-интерфейса** (например, «солнечная энергия только если солнечная система включена»), поэтому создаются только те точки данных, которые существуют в вашей установке. Структура соответствует меню контроллера:

- `remko.0.information.<area>.<no>` – пользователь → информация (например) `information.domestic_hot_water.5039`)
- `remko.0.settings.<area>.<no>` – пользователь → настройки (например) `settings.domestic_hot_water.1082`)
- `remko.0.status.<no>` – страница состояния
- `remko.0.overview…`, `remko.0.homescreen…` – базовое отображение, а также значения, которые всегда считываются, но не имеют собственного пункта меню.
- `remko.0.refrigerant_circuit.<no>` – контур хладагента, как показано на схеме «тепловой насос» в веб-интерфейсе (горячий газ 5146, всасываемый газ 5612, жидкость 5139, испаритель/регистр 5200, расширительный клапан 5615, четырехходовой клапан 5136); всегда считывается в быстром цикле, независимо от уровня меню.
- необязательный `service…`, `expert…`, `commissioning…`
- `remko.0.general.<no>` /`remko.0.additional.<no>` – значения без меню / все остальные значения (опция «показать все»)

Идентификаторы папок имеют английский язык: они формируются на основе английского текста меню контроллера (например, `settings`, `domestic_hot_water`, `meter_readings` Только если в меню контроллера отсутствует английский текст, используется немецкий текст.

Регистрационный номер всегда является последней частью идентификатора. Имена, единицы измерения, минимальные/максимальные значения и перечисления (`common.states`) поступают от теплового насоса. Названия и тексты нумерации переводятся, если контроллер передает тексты на английском языке; в противном случае текст отображается точно так, как он получен от устройства.

Важные регистры (WKF 100):

| Нет                         | Значение                                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1079                        | Режим ГВС (0 комфортный, 1 экономичный, 2 только солнечная/фотоэлектрическая энергия, 3 выключено)             |
| 1082                        | заданная температура горячей воды                                                                              |
| 1951 / 1088                 | режим климат-контроля в помещении                                                                              |
| 1893 / 1894                 | отсутствие / вечеринка                                                                                         |
| 1946                        | холоднее / теплее                                                                                              |
| 5693                        | 1x Нагрев горячей воды (кнопка)                                                                                |
| 1269 / 1270                 | Уставка ГВС, состояние готовности SG-3/4                                                                       |
| 1902 / 1258                 | Уставка температуры нагрева SG-Ready состояние 3 / 4                                                           |
| 2142, 1719–1722, 1679, 2164 | Самопотребление фотоэлектрической энергии / влияние                                                            |
| 5001                        | текущий режим работы                                                                                           |
| 5032 / 5039 / 5132 / 5581   | температура наружного воздуха / фактическая температура ГВС / расход / температура обратной воды               |
| 5320 / 5321                 | электрическая/тепловая энергия                                                                                 |
| 5105 / 5119                 | электрическая/тепловая энергия                                                                                 |
| 5359 / 5565                 | Мощность фотоэлектрической системы / Выработка фотоэлектрической энергии (по данным счетчика теплового насоса) |
| 5174 / 5572                 | Блокировка служебного режима / оставшееся время блокировки                                                     |

### Защита от записи

- **Выкл** .: только для чтения
- **Меню пользователя** (по умолчанию): только те регистры, которые также можно изменить в меню пользователя контроллера. Сетевые регистры, регистры паролей и регистры установки всегда заблокированы. Действия: только «1x ГВС отопление» и «сброс ошибки».
- **Все параметры** : экспертный режим – включая значения служб/установки и критически важные действия (обновление, перезапуск, сброс). Используйте с осторожностью!

Значения, выходящие за пределы допустимого диапазона, отклоняются адаптером.

## Тестирование без установки

```
node tools/probe.js <ip-of-heat-pump>                  # read only
node tools/probe.js <ip-of-heat-pump> --write 1082=46  # write one value
```

## Пожертвовать

Если вам понравился этот адаптер и вы хотите поддержать его разработку, вы можете угостить меня кофе:

## Кредиты

Знания о протоколе частично основаны на [Altrec/remko\_mqtt-ha](https://github.com/Altrec/remko_mqtt-ha) , [fuchsi585/remko\_http](https://github.com/fuchsi585/remko_http) и [Christoph-87/remko-smartweb-ha](https://github.com/Christoph-87/remko-smartweb-ha) .

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.2 (2026-11-03)
- (mrdimixx) objects are no longer deleted while the adapter is running: values that are currently hidden by a display condition (e.g. register did not answer yet, operating mode changed) keep their object and user settings and are still updated. Only on start, really obsolete objects are removed (renamed ids, registers that cannot appear with the current settings, empty folders)
- (mrdimixx) errors while processing MQTT messages are logged instead of restarting the adapter

### 0.6.1 (2026-10-24)
- (mrdimixx) **Breaking:** folder ids below the menu of the controller are now derived from its English menu texts (e.g. `einstellungen.warmwasser` → `settings.domestic_hot_water`, `information.zaehlerstaende` → `information.meter_readings`, `uebersicht` → `overview`). Old objects are removed automatically; user settings (e.g. history, SourceAnalytix) are taken over by register number. Please adapt scripts and visualisations.
- (mrdimixx) folder names are always translation objects (German controller text as fallback if there is no English text)
- (mrdimixx) timer intervals are limited to the maximum supported by Node.js
- (mrdimixx) writable energy registers get role `level`
- (mrdimixx) unused setting `httpPort` removed

### 0.6.0 (2026-10-22)
- (mrdimixx) **Breaking:** folder ids defined by the adapter are now English: `kaeltekreis` → `refrigerant_circuit`, `uebersicht` (values without menu) → `overview`, `allgemein` → `general`, `weitere` → `additional`, `experte` → `expert`, `inbetriebnahme` → `commissioning`. Old objects are removed automatically, user settings (e.g. history) are taken over. Please adapt scripts and visualisations.
- (mrdimixx) folder names and enumeration texts (`common.states`) are translated; English names never fall back to German texts
- (mrdimixx) `tools/probe.js` output is English
- (mrdimixx) cache meta object is created with `setObjectNotExistsAsync`
- (mrdimixx) dependencies updated

### 0.5.1 (2026-10-08)
- (mrdimixx) read-only values no longer get min/max (fixes warnings like `remko.0.status.5026 has value 1082 greater than max 999`)

### 0.5.0 (2026-10-08)
- (mrdimixx) all values are re-published during the full refresh (fresh timestamp), so visualisations started later also get rarely changing settings
- (mrdimixx) new folder `kaeltekreis` with the refrigerant circuit values of the web UI scheme (hot gas, suction gas, liquid, evaporator temperature, expansion valve, 4-way valve), read in the fast cycle

### 0.4.0 (2026-09-30)
- (mrdimixx) object structure fixed (ioBroker object checker): only valid roles (`value`/`level` instead of `value.mode`/`level.mode`), writable power settings use `level`
- (mrdimixx) actions are write-only buttons (`read: false`); actions that are not allowed are no longer created
- (mrdimixx) object names in all ioBroker languages (texts from the controller, English as fallback)
- (mrdimixx) existing objects are replaced on update so outdated attributes disappear (user settings like history are kept)

### 0.3.3 (2026-09-30)
- (mrdimixx) registers containing secrets (service/expert passwords, session id, unlock code, SMT-ID) are no longer read or created; existing objects are removed automatically

### 0.3.2 (2026-09-28)
- (mrdimixx) PayPal donation link added (README, GitHub sponsor button, npm funding)

### 0.3.1 (2026-09-28)
- (mrdimixx) release via GitHub Actions (npm trusted publishing with provenance)

### 0.3.0 (2026-09-28)
- (mrdimixx) prepared for the ioBroker repository: English README, translations, tests, GitHub Actions, npm deployment
- (mrdimixx) log messages in English

### 0.2.1 (2026-09-28)
- (mrdimixx) actions (e.g. 5693 "1x DHW heating", 2126 "reset fault") as buttons; critical actions only in write mode "all"
- (mrdimixx) role of the coefficient of performance fixed

### 0.2.0 (2026-09-28)
- (mrdimixx) only registers that are also shown by the web UI (display conditions)
- (mrdimixx) objects structured by menu; old 0.1 objects are removed automatically

Older changes can be found in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 mrdimixx <stoppeld@gmx.de>

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