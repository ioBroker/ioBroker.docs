---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luxtronik2-controller/README.md
title: ioBroker.luxtronik2-controller
hash: VX5VBGjgw7FuveRKiH2plCoEp8Juix6diYcu2+OlPwg=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.luxtronik2-controller.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.luxtronik2-controller.svg)
![НПМ](https://nodei.co/npm/iobroker.luxtronik2-controller.png?downloads=true)
![Тестирование и выпуск](https://github.com/TbsJah/ioBroker.luxtronik2-controller/workflows/Test%20and%20Release/badge.svg)

<img src="admin/luxtronik2-controller.png" alt="Projekt Logo" width="20%">

# ioBroker.luxtronik2-controller

## адаптер luxtronik2-controller для ioBroker

Этот адаптер ioBroker позволяет осуществлять локальное управление и мониторинг тепловых насосов с [контроллерами Luxtronik 2.x](https://www.alpha-innotec.com/en/products/accessories/control/luxtronik) (например, Alpha Innotec, Novelan). Адаптер полностью написан на TypeScript.

## Благодарности и история

Этот проект основан на предварительной работе существующих проектов с открытым исходным кодом. Особая благодарность выражается:

[Буни](https://github.com/bouni/luxtronik-2) , чья новаторская работа и разработка кода составляют важнейшую основу для взаимодействия с контроллерами Luxtronik.

[Coolchip:](https://github.com/coolchip/luxtronik2) Для фундаментального обратного проектирования сетевого протокола Luxtronik.

[UncleSamSwiss:](https://github.com/UncleSamSwiss/ioBroker.luxtronik2) Для оригинального адаптера ioBroker.

Инновации в этой версии: контроллер luxtronik2 изначально интегрирует TCP-связь (порты 8888/8889) и не зависит от внешних библиотек. Кроме того, реализованы управляющие макросы, логика защиты компрессора и автоматическое управление точками данных.

### Функции

- **Встроенная связь по протоколу TCP:** прямое подключение к тепловому насосу без каких-либо дополнительных затрат.
- **Защита компрессора (оптимизация цикла):** интеллектуальное объединение циклов отопления и горячего водоснабжения для значительного сокращения количества запусков компрессора.
- **Динамическое управление циркуляционным насосом отопления (ЦНХО):** автоматическая регулировка напряжения циркуляционного насоса отопления (ЦНХО) в зависимости от разброса температур напора и отводимой жидкости для достижения максимальной эффективности.
- **Интегрированные действия (макросы):** Предварительно заданная логика управления для принудительного отопления, запросов на горячее водоснабжение и циркуляционного насоса (ZIP), включая автоматическое переключение на безопасные значения по умолчанию.
- **Циркуляция по требованию (ZIP):** управляйте циркуляционным насосом с помощью существующих датчиков движения ioBroker или напрямую с помощью внешних исполнительных механизмов (например, Shelly) — без каких-либо аппаратных модификаций теплового насоса.
- **Пользовательские точки данных:** Измеренные значения (индекс 3004) и параметры (индекс 3003) можно гибко добавлять через конфигурацию адаптера. Временные метки Unix автоматически преобразуются в удобочитаемый формат.
- **Расширенные текстовые сообщения о состоянии и расчеты:** Расчет разброса температур, тепловой энергии в режиме реального времени и подробные текстовые сообщения о текущем состоянии системы (включая смещения, защиту от замерзания и состояние охлаждения).
- **Интеллектуальная система уведомлений:** отправляйте коды ошибок и критические сбои (например, проблемы со скоростью потока) напрямую в Telegram или систему уведомлений ioBroker — с защитой от спама в период ожидания.
- **Автоматическое резервное копирование DTA:** запланированная загрузка диагностических журналов DTA непосредственно с теплового насоса в хранилище ioBroker для удобного анализа (например, в OpenDTA).
- **Автоматическое управление объектами:** Отменённые выборки или удалённые точки данных, а также пустые структуры папок автоматически и корректно удаляются из ioBroker при перезапуске адаптера.
- **Широкая совместимость:** Полная поддержка более старых (V2.x) и более новых (V3.x) поколений прошивки (например, Alpha Innotec, Novelan), использующих динамические коэффициенты масштабирования.

## ⚠️ Предупреждение

Некоторые настройки, предоставляемые этой интеграцией, могут влиять на производительность вашего теплового насоса. Неправильная настройка может привести к переходу контроллера в состояние неисправности, что потребует ручной перезагрузки на месте.

Цель этого проекта — защитить ваш тепловой насос, ограничив параметры конфигурации безопасными значениями. Однако никаких гарантий дать нельзя. Будьте осторожны, ознакомьтесь с руководством пользователя Luxtronik и не изменяйте настройки, которые вы не до конца понимаете.

## 🔧 Совместимость

Интеграция позволяет отслеживать и управлять тепловыми насосами с помощью контроллера Luxtronik2. Она работает локально, без доступа в интернет. Интеграция тестировалась и в настоящее время тестируется с тепловым насосом LWD50A (LD5) от Alpha Innotec.

## ⚠️ Предупреждение ⚠️

_Данный проект не связан с компаниями Alpha Innotec, Novelan, ait-deutschland GmbH или какой-либо другой компанией. Это личный проект, который поддерживается в свободное время. Использование на свой страх и риск._

## Сообщения об ошибках и вклад в разработку

Сообщения об ошибках, примечания о совместимости с конкретными версиями прошивки или запросы на добавление новых функций можно отправлять через систему отслеживания ошибок в [репозитории GitHub](https://github.com/TbsJah/ioBroker.luxtronik2-controller/issues) .

## Информация

[Info Deutsch](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md)

[Информация на английском языке](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md)

<img src="documentation/Bilder/Haupteinstellung.png" alt="Haupteinstellung" width="100%">
<img src="documentation/Bilder/Objekte.png" alt="Objekte" width="100%">
<img src="documentation/Bilder/Datenpunkte.png" alt="Datenpunkte" width="100%">
<img src="documentation/Bilder/Benachrichtigung.png" alt="Benachrichtigung" width="100%">
<img src="documentation/Bilder/EigeneWerte.png" alt="EigeneWerte" width="100%">
<img src="documentation/Bilder/Fehlermeldung.png" alt="Fehlermeldung" width="100%">
<img src="documentation/Bilder/Bewegungssensoren.png" alt="Bewegungssensoren" width="100%">

## Changelog

// ### **WORK IN PROGRESS**
### 0.11.1 (2026-09-22)

- Resolve issues which are reported by repository checker

### 0.11.0 (2026-09-21)

- **Improvements:**
    - Added global rounding to 2 decimal places for all calculated telemetry values (e.g., converting operating seconds to hours). This provides a cleaner ioBroker state tree and prevents excessively long floating-point numbers from cluttering history databases (like InfluxDB).

### 0.10.4 (2026-09-21)

- Update Readme

### 0.10.3 (2026-09-21)

- **Features & Improvements:**
    - Optimized the automated DTA backup process by directly utilizing the `/NewProc` file stream, eliminating unnecessary artificial delays and stabilizing the heat pump controller.
    - Streamlined the backup configuration: Removed the custom file path input to prevent file system conflicts. Backups are now securely stored in the universally accessible global `0_userdata.0/luxtronik_backups/` directory.
    - Added a clear information box in the adapter configuration, explaining where to find the generated backup files within the ioBroker UI.

- **Fixes:**
    - Fixed the persistent `not an object of type "meta"` crash during DTA backups. The storage architecture was migrated away from isolated adapter namespaces to the robust, native `0_userdata.0` global storage, completely resolving folder creation permission issues on existing instances.
    - Corrected the dynamic file naming logic (`dta_live_...` vs. `dta_history_...`) to accurately reflect whether a live memory dump or a fallback history log was downloaded.

### 0.10.2 (2026-09-21)

- **🚀 Features:**
    - Implemented automated DTA file backup management with customizable cron schedules and automatic meta-directory creation in the ioBroker file system.

- **🛠 Chores / Under the Hood**
    - Enhanced TypeScript type checking, resolved strict ESLint warnings, and upgraded Node.js type definitions to support Node.js version 22.
    - Optimized image scaling and layout rendering in `jsonConfig.json` for cleaner adapter settings presentation.

## License

MIT License

Copyright (c) 2026 TbsJah <github.tbsjah@googlemail.com>

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