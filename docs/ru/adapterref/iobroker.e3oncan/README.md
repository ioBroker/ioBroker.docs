---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: y7oFnc7+gxrXSaUyk35hgP0rwcK4nxcTWMA1i1i0qMg=
---
![Логотип](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Количество установок](https://iobroker.live/badges/e3oncan-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/e3oncan-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**Тесты:** ![Тестирование и выпуск](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## Адаптер e3oncan для ioBroker
## Оглавление
- [Обзор](#обзор)
- [Быстрый старт](#quick-start)
- [Руководство по настройке](#configuration-guide)
- [Шаг 1 – CAN-адаптер](#шаг-1--can-адаптер)
- [Шаг 2 – Сканирование устройства](#шаг-2--сканирование-устройства)
- [Шаг 3 – Сканирование точек данных](#шаг-3--сканирование-точек-данных)
- [Шаг 4 – Задания и расписание](#шаг-4--задания-и-расписания)
- [Чтение точек данных](#reading-data-points)
- [Запись данных](#writing-data-points)
- [Точки данных и метаданные](#data-points-and-metadata)
- [Энергосчетчики](#энергосчетчики)
- [Данные и единицы измерения E380](#e380-data-and-units)
- [Данные и блоки E3100CB](#e3100cb-data-and-units)
- [Часто задаваемые вопросы и ограничения](#faq-and-limitations)
- [Пожертвовать](#пожертвовать)
- [Список изменений](#changelog)

---

## Обзор
Устройства серии Viessmann E3 (экосистема One Base) обмениваются большими объемами данных по шине CAN. Этот адаптер подключается к этому обмену данными и делает их доступными внутри ioBroker.

Два режима работы работают независимо и могут быть объединены:

| Режим | Описание |
|---|---|
| **Сбор данных** | Пассивно прослушивает шину CAN и извлекает данные в режиме реального времени по мере обмена ими между устройствами. Запросы не отправляются. Идеально подходит для быстро меняющихся значений, таких как поток энергии. |
| **UDSonCAN** | Активно считывает и записывает данные с использованием протокола UDS (Universal Diagnostic Services over CAN). Необходимо для заданных значений, расписаний и данных, не передаваемых автоматически. |

Доступные режимы зависят от топологии вашего устройства. См. раздел [Подробности см. в разделе [обсуждение топологии устройства](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34). Чтобы получить представление о том, что можно сделать с адаптером, см. [обсуждение вариантов использования].](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35).

> Важные части этого адаптера основаны на проекте [open3e](https://github.com/open3e).
> Реализация на Python, использующая только сбор данных и протокол MQTT, доступна по адресу [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

---

## Быстрый старт
**Предварительные требования**

- USB-адаптер для подключения к CAN-шине или CAN-адаптер, подключенный к внешней или внутренней CAN-шине вашего устройства Viessmann E3.
- Хост-система на базе Linux (поддерживается только Linux).
- CAN-адаптер активен и виден в системе, например, как `can0` (проверьте с помощью `ifconfig`).
— Подробную информацию о настройке CAN-адаптера см. в вики-странице проекта open3e по адресу [https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry].

**Важно:** Убедитесь, что при первой настройке этого адаптера не запущен другой клиент UDSonCAN (например, open3e). Параллельная связь UDS приведет к ошибкам в обоих приложениях.

**Первая настройка – краткий обзор**

1. Установите адаптер и откройте диалоговое окно его настроек.
2. Настройте свой CAN-адаптер(ы) на вкладке **CAN-адаптер** и сохраните изменения.
3. Выполните поиск устройств E3 на вкладке **Список устройств UDS**.
4. Выполните поиск точек данных на вкладке **Список точек данных** (занимает до 5 минут).
5. Настройте расписание чтения на вкладке **Задания** и сохраните.

Подробные шаги описаны в разделе [Руководство по настройке](#configuration-guide) ниже.

> **После обновления Node.js:** Нативные модули, используемые этим адаптером, необходимо пересобрать при изменении версии Node.js. Если адаптер не запускается после обновления Node.js, остановите его, выполните команду `iob rebuild` в командной строке, а затем запустите снова.

---

## Руководство по настройке
### Шаг 1 – CAN-адаптер
Откройте диалоговое окно настройки адаптера и перейдите на вкладку **CAN-адаптер**.

- Введите имя вашего CAN-интерфейса (по умолчанию: `can0`).
— Установите флажок **Подключиться к адаптеру** для каждого интерфейса, который вы хотите использовать.
— Нажмите **СОХРАНИТЬ**. Экземпляр адаптера перезапустится и подключится к шине CAN.

Если у вас есть вторая шина CAN (например, внутренняя шина), настройте её здесь как второй адаптер. После настройки второго адаптера появится вторая вкладка **Назначения**.

### Шаг 2 – Сканирование устройства
Перейдите на вкладку **Список устройств UDS** и нажмите кнопку **Сканировать**.

— Сканирование занимает несколько секунд. Вы можете отслеживать ход выполнения в журнале адаптера (откройте вторую вкладку браузера).
— Будут перечислены все устройства E3, подключенные к шине. Счетчики электроэнергии (E380, E3100CB) здесь не указаны — их настройка производится отдельно.
— Во втором столбце можно переименовывать устройства. Эти имена используются в качестве идентификаторов в дереве объектов ioBroker.
— После завершения нажмите **СОХРАНИТЬ**. Экземпляр перезапустится.

В процессе сканирования устройства адаптер также считывает конфигурацию формата данных устройства (точка данных 382), включая единицы измерения температуры (°C или °F) и форматы даты/времени. Эти данные сохраняются и используются при последующих сканированиях точек данных.

### Шаг 3 – Сканирование точек данных
Перейдите на вкладку **Список точек данных**, нажмите **Начать сканирование…** и подтвердите нажатием **ОК**.

**Наберитесь терпения** – сканирование может занять до 5 минут. Ход выполнения отображается в журнале адаптера.

Что делает сканирование:

— Находит все доступные точки данных для каждого устройства.
- Добавляет метаданные (описание, единица измерения, доступ для чтения/записи) к каждому объекту точки данных.
- Устанавливает физические единицы измерения на основе конфигурации формата устройства, найденной на шаге 2.
- Создает полное дерево объектов для каждого устройства в ioBroker.

Этот шаг не является строго обязательным для использования в режиме только для чтения, но он **настоятельно рекомендуется** и **необходим**, если вы хотите записывать данные в какую-либо точку данных.

После сканирования вы можете просмотреть обнаруженные точки данных в диалоговом окне конфигурации, выбрав устройство и нажав кнопку **Обновить список точек данных**. Используйте значок фильтра для поиска по имени или кодеку. Отключите фильтр перед переключением на другое устройство.

### Шаг 4 – Задания и расписания
Перейдите на вкладку **Назначения адаптеру UDS CAN** (и на вторую вкладку адаптера, если применимо).

**Электросчетчики (режим сбора данных)**

Если у вас установлены счетчики электроэнергии E380 или E3100CB, вы можете активировать их прослушивание здесь. Установите **Минимальное время обновления (с)**, чтобы контролировать частоту сохранения значений. Рекомендуется значение по умолчанию 5 секунд – счетчики электроэнергии передают более 20 значений в секунду, а установка этого значения на 0 создаст высокую нагрузку на ioBroker.

**Сбор устройств E3 (режим сбора)**

Нажмите **+** для добавления устройства. Установите флажок **Активно**, выберите устройство и задайте **Минимальное время обновления (с)**. Рекомендуется значение 5 с; значение 0 с (сохранение каждого полученного значения) также возможно, но создаст дополнительную нагрузку.

В этом режиме данные, которыми обмениваются ваши устройства E3, перехватываются в режиме реального времени без отправки каких-либо запросов. Подробную информацию о том, какие устройства поддерживают этот режим, см. в разделе [Часто задаваемые вопросы](#faq-and-limitations).

**Расписание занятий в UDSonCAN**

Нажмите **+**, чтобы добавить расписание. Выберите устройство и список точек данных для чтения, затем установите интервал в секундах. Значение 0 означает, что точки данных считываются один раз при запуске адаптера.

Вы можете добавить несколько расписаний для каждого устройства, чтобы запрашивать некоторые точки данных чаще, чем другие. Используйте вкладку **Список точек данных** (откроется во второй вкладке браузера) в качестве справочного материала.

После завершения нажмите **СОХРАНИТЬ И ЗАКРЫТЬ**. Проверьте дерево объектов, чтобы убедиться, что данные собираются.

---

## Чтение точек данных
Данные считываются автоматически в соответствии с настроенными вами расписаниями. Значения отображаются в дереве объектов ioBroker под именем устройства, организованные в подобъекты `json`, `raw` и `tree` с удобочитаемыми именами и метаданными.

**Считывание конкретной точки данных по запросу**

Вы можете запросить любую точку данных в любое время, отредактировав состояние `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` и введя список идентификаторов точек данных, например `[3350, 3351, 3352]`. Если точка данных доступна на устройстве, значение появится в дереве объектов и может быть использовано в расписаниях чтения.

В настоящее время диапазон числового сканирования ограничен (например, 256–3338 в версии 0.11.0). Используйте `udsReadByDid` для проверки точек данных за пределами этого диапазона.

---

## Запись точек данных
Процесс записи намеренно упрощен: измените значение соответствующего состояния в ioBroker и сохраните его **без** установки флажка `Acknowledged` (ack). Адаптер обнаруживает неподтвержденную запись и отправляет ее на устройство.

Примерно через 2,5 секунды после записи адаптер считывает данные с устройства и сохраняет подтвержденное значение. Если после этого состояние не подтверждается, проверьте журнал адаптера для получения подробной информации об ошибке.

**Белый список доступных для записи точек данных**

Запись разрешена только для точек данных из белого списка, хранящихся по адресу:

```
e3oncan.0.<DEVICE>.info.udsDidsWritable
```

Вы можете расширить список, отредактировав это состояние. Сохраните его **без** установки флажка `Acknowledged`.

Некоторые параметры данных нельзя изменить, даже если они внесены в белый список — устройство вернет отрицательный ответ. В этом случае адаптер повторит попытку, используя альтернативный сервис (только внутренняя шина CAN). Всегда проверяйте операции записи, убеждаясь, что значение было подтверждено.

---

## Точки данных и метаданные
Подробную информацию о структуре точек данных, работе с вариантами точек данных и метаданными, а также обработке форматов температуры/даты/времени см. в разделе [data-points.md](data-points.md).

---

## Счетчики электроэнергии
### Данные и единицы измерения E380
Поддерживается подключение до двух счетчиков электроэнергии E380. Идентификаторы точек данных зависят от CAN-адреса устройства:

- **CAN-адрес 97:** точки данных с четными идентификаторами
- **CAN-адрес 98:** точки данных с нечетными идентификаторами

| ID | Данные | Единица измерения |
|---|---|---|
| 592, 593 | Активная мощность L1, L2, L3, общая | Вт |
| 594, 595 | Реактивная мощность L1, L2, L3, общая | вар |
| 596, 597 | Абсолютный ток L1, L2, L3; cosPhi | A, — |
| 598, 599 | Напряжение L1, L2, L3; Частота | В, Гц |
| 600, 601 | Совокупный импорт, экспорт | кВтч |
| 602, 603 | Полная активная мощность, Полная реактивная мощность | Вт, вар |
| 604, 605 | Суммарный импорт | кВтч |

### Данные и устройства E3100CB
| ID | Данные | Единица измерения |
|---|---|---|
| 1385_01 | Суммарный импорт | кВтч |
| 1385_02 | Суммарный экспорт | кВтч |
| 1385_03 | Состояние: −1 = подача электроэнергии / +1 = подача электроэнергии | — |
| 1385_04 | Общая активная мощность | Вт |
| 1385_08 | Активная мощность L1 | Вт |
| 1385_12 | Активная мощность L2 | Вт |
| 1385_16 | Активная мощность L3 | Вт |
| 1385_05 | Суммарная реактивная мощность | var |
| 1385_09 | Реактивная мощность L1 | var |
| 1385_13 | Реактивная мощность L2 | вар |
| 1385_17 | Реактивная мощность L3 | var |
| 1385_06 | Текущий, абсолютный L1 | A |
| 1385_10 | Текущий, абсолютный L2 | A |
| 1385_14 | Текущий, абсолютный L3 | A |
| 1385_07 | Напряжение L1 | В |
| 1385_11 | Напряжение L2 | В |
| 1385_15 | Напряжение L3 | В |

---

## Часто задаваемые вопросы и ограничения
**Почему стоит использовать Collect и UDsonCAN вместе?**

Collect предоставляет данные в реальном времени обо всем, чем обмениваются устройства между собой – быстро меняющиеся значения, такие как поток энергии, и медленно меняющиеся значения, такие как температура, все обновляется в момент изменения. UDSonCAN позволяет получать доступ к данным, которые не передаются автоматически, как правило, к заданным значениям и параметрам конфигурации. Сочетание обоих методов дает наиболее полную и актуальную картину вашей системы.

**Какие устройства поддерживают режим сбора данных?**

В настоящее время протокол collect известен следующими особенностями:

- Vitocal (прослушивает CAN ID `0x693`, внутреннюю шину CAN)
- Vitocharge VX3 и Vitoair (прослушивание CAN ID `0x451`, внешняя и внутренняя шина CAN)

**Можно ли использовать Open3e одновременно?**

Да, с условиями. Если в этом адаптере используется только режим Collect, open3e может работать параллельно без каких-либо ограничений. Если вы используете UDSonCAN, не запускайте open3e для одних и тех же устройств одновременно — это вызовет периодические ошибки связи в обоих приложениях.

**Адаптер перестал работать после обновления Node.js. Что мне делать?**

Этот адаптер использует нативные модули, которые необходимо пересобрать при изменении версии Node.js. Остановите адаптер, выполните команду `iob rebuild` в командной строке, а затем снова запустите адаптер. Если проблема сохраняется, пожалуйста, создайте заявку в службу поддержки.

**Чем проект отличается от проекта open3e?**

- Прямая интеграция с ioBroker: настройка через диалоги, данные отображаются непосредственно в дереве объектов.
— В дополнение к UDSonCAN доступен режим сбора данных в режиме реального времени.
— Запись данных проще: достаточно изменить значение состояния и сохранить без подтверждения.
- MQTT не требуется (хотя MQTT, конечно, доступен через стандартную конфигурацию ioBroker).
- 64-битное целочисленное кодирование для записи ограничено значениями ниже 2^52 (4 503 599 627 370 496). Декодирование работает корректно во всем 64-битном диапазоне.

**Могу ли я запросить точки данных за пределами диапазона сканирования?**

Да. Отредактируйте состояние `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` и введите список идентификаторов точек данных, например, `[3350, 3351, 3352, 3353]`. Доступные точки данных появятся в дереве объектов и могут быть использованы в расписаниях чтения. Недоступные точки данных приведут к появлению сообщения «Отрицательный ответ» в журнале.

---

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете себя щедрым, — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (MyHomeMyData) To take full advantage of the variant data points and metadata, please perform a device scan followed by a data point scan
* (MyHomeMyData) Added handling for variant data points and for device's data format configuration, refer to https://github.com/MyHomeMyData/ioBroker.e3oncan/data-points.md for details
* (MyHomeMyData) Added metadata to several data points, e.g. description, unit, link to further info
* (MyHomeMyData) During scan of data points now metadata are added to data point objects
* (MyHomeMyData) Changed handling of writable data points; this info now also is available within definition of data point; however, there is no change to handling of the whitelist of writables
* (MyHomeMyData) During device scan the information about used data formats (data point 382) is evaluated
* (MyHomeMyData) Updated structure of the following data points: 268,269,271,274,279,282,284,285,286,287,288,289,290,291,318,320,321,324,531,1659,1684,1768,1769,1770,1771,1772,2084,2085,2087,2088,2090,2091,2093,2094,2096,2097,2099,2100,2102,2103,2105,2106,2108,2109,2111,2112,2114,2115,2117,2118,2120,2121,2123,2124,2126,2127,2129,2130,2132,2133,2135,2136,2138,2139,2141,2142,2240,2260,2261,2263,2264,2266,2267,2269,2270,2272,2273,2275,2276,2278,2279,2281,2282,2284,2285,2287,2288,2290,2291,2293,2294,2296,2297,2299,2300,2302,2303,2305,2306,2308,2309,2311,2312,2314,2315,2317,2318,2320,2333,2334,2351,2352,2593,2735,2806,3014,3015,3016,3017,3018,3032,3034,3035,3036
* (MyHomeMyData) Hint: For all sensor data points the last entry "Unknown" was changed to "SensorStatus". That's why the list of changed data points is so long.
* (MyHomeMyData) Hint: For the frequently used data points 531, 1415..1418, 2351, 2532 and 2735 the numerical value has been moved to the sub "ID": 0531_DomesticHotWaterOperationState, 1415_MixerOneCircuitOperationState.State.ID, 2351_HeatPumpCompressor.PowerState.ID, 2352_AdditionalElectricHeater.PowerState.ID, 2735_FourThreeWayValveValveCurrentPosition.ID

### 0.10.14 (2025-11-03)
* (MyHomeMyData) Added elements to enums.js based of PR no. 182 of open3e
* (MyHomeMyData) Simplified configuration of dids scan limits in source code
* (MyHomeMyData) Extended scan up to did 3338
* (MyHomeMyData) Added hint regarding scan range in Readme
* (MyHomeMyData) Fixes for issue #169 (repository checker)
* (MyHomeMyData) Bugfix: Manual change of device specific dids was not evaluated for collect workers
* (MyHomeMyData) Update of list of data points for E3 devices to version 20251102

### 0.10.13 (2025-09-30)
* (MyHomeMyData) Fix for issue #162

### 0.10.12 (2025-09-15)
* (MyHomeMyData) Migration to ESLint 9, refer to issues #141 and #152

### 0.10.11 (2025-09-06)
* (MyHomeMyData) Fix for issue #152 (repository checker) and #126 (node.js 24)
* (MyHomeMyData) Added hint to readme regarding user action after upgrading version of node.js
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250903

### 0.10.10 (2025-08-07)
* (MyHomeMyData) Fix for issue #142 (WriteByDid not working in case of specific UDS control frame)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250729
* (MyHomeMyData) Added codec for 64-bit integers. Remark: Encoding (for writing of data) is limited to values < 2^52 (4.503.599.627.370.496).

### 0.10.9 (2025-05-22)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250422
* (MyHomeMyData) Fixed version number of enum info
* (MyHomeMyData) Fix for issue #125 (findings of repository checker)

### 0.10.8 (2025-03-07)
* (MyHomeMyData) Bugfix for issue #117
* (MyHomeMyData) Updated data point 381, refer to discussion https://github.com/open3e/open3e/discussions/212
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250307

### 0.10.7 (2025-02-26)
* (MyHomeMyData) Updated dependencies according to issue #111

### 0.10.6 (2025-02-19)
* (MyHomeMyData) Added missing enum info for data point 2850

### 0.10.5 (2025-02-18)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250217
* (MyHomeMyData) Updated dependencies according to issues #101 and #108

### 0.10.4 (2025-01-15)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250114

### 0.10.3 (2024-11-26)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241125

### 0.10.2 (2024-11-16)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241115
* (MyHomeMyData) Fixes for issue #81 (added missing size attributes)

### 0.10.1 (2024-10-20)
* (MyHomeMyData) Fixes for issue #79 (improvements for usability on mobile devices)

### 0.10.0 (2024-10-14)
* (MyHomeMyData) Added extended support for writing of data points.
* (MyHomeMyData) Changed naming for CAN adapter.

### 0.9.5 (2024-09-19)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240916

### 0.9.4 (2024-08-26)
* (MyHomeMyData) Start up an UDS worker for each device to allow writing of data points even when no schedule for reading is defined on this device
* (MyHomeMyData) Update of npm dependencies

### 0.9.3 (2024-08-20)
* (MyHomeMyData) Bugfix: Updating UDS communication statistics, even in case of persistent timeout events
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Fixes based on issues #55,#56
* (MyHomeMyData) Bugfix: Time delta between schedules of UDS workes was not working properly

### 0.9.2 (2024-08-09)
* (MyHomeMyData) Update of dependencies, fixes based on issue #53
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240808

### 0.9.1 (2024-05-26)
* (MyHomeMyData) Updated README, added links for description of device topology and to uses cases
* (MyHomeMyData) Added info for data points 2404_BivalenceControlMode and 2831_BivalenceControlAlternativeTemperature
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240505

### 0.9.0 (2024-04-21)
* (MyHomeMyData) Structure of data point 1690 (ElectricalEnergySystemPhotovoltaicStatus) changed based on issue https://github.com/MyHomeMyData/E3onCAN/issues/6. Manual adaptations may be needed, please check!
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240420
* (MyHomeMyData) Added support for energy meter E3100CB
* (MyHomeMyData) Update of list of data points for E380 to version 20240418
* (MyHomeMyData) Main change for E380 id 600/601 (GridEnergy): Now using correct data format. Many thanks to @M4n197 for unveiling the right data format. Manual adaptations may be needed, please check!

### 0.8.0 (2024-03-22)
* (MyHomeMyData) Added support for energy meter E380 with CAN-address=98
* (MyHomeMyData) Update of list of data points for E380 to version 20240320

### 0.7.2 (2024-03-20)
* (MyHomeMyData) Update of data type and role added for device specific data points
* (MyHomeMyData) Update list of writable data points when updating data points to newer version
* (MyHomeMyData) Improved handling of failed CAN communication during scan for data points
* (MyHomeMyData) Update of list of data points to version 20240319

### 0.7.1 (2024-03-15)
* (MyHomeMyData) Bugfix for data point 1190: Scaling changed back to 10.0
* (MyHomeMyData) Update of list of data points to version 20240314

### 0.7.0 (2024-03-13)
* (MyHomeMyData) Store numbers in states of channel "tree" with type "Number" instead of "String"
* (MyHomeMyData) IMPORTANT: This may affect handling of tree states, e.g. in scripts, vis and history
* (MyHomeMyData) Bugfix for Energy Meter E380 data point id 0x25C
* (MyHomeMyData) Update of list of data points to version 20240309
* (MyHomeMyData) Bugfix for update of changed data point structure during start of adapter
* (MyHomeMyData) Changed default values for CAN adapters to can0 and can1
* (MyHomeMyData) Increased value for collect timeout to 2000 ms

### 0.6.19 (2024-02-19)
* (MyHomeMyData) Check for changed structure of data points during startup
* (MyHomeMyData) Update of list of data points to version 20240218
* (MyHomeMyData) Bugfix to avoid warnings on very first start of adapter

### 0.6.18 (2024-02-08)
* (MyHomeMyData) Added versioning to list of data points and check for updates on start of adapter
* (MyHomeMyData) Added optional description in configuration of UDS schedules

### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed data points to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in data point ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added data points to list writable dids
* (MyHomeMyData) Added unit test cases for codecs
* (MyHomeMyData) Improved speed of codes for numerical values
* (MyHomeMyData) Improved error messages on UDS negative response

### 0.6.11 (2024-01-17)
* (MyHomeMyData) Improved layout of configuration dialog for device scan

### 0.6.10 (2024-01-15)
* (MyHomeMyData) Removed code for Rawmode because it's never activated

### 0.6.9 (2024-01-13)
* (MyHomeMyData) Bugfix: Only Linux is supported

### 0.6.8 (2024-01-13)
* (MyHomeMyData) Initial npm version

## License
MIT License

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

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