---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"Luxtronik 2 Controller\\n\\nAdapter to control Luxtronik 2.x heat pumps."},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luxtronik2-controller/README.md
title: ioBroker.luxtronik2-controller
hash: /l01HaR4aznecPJ1/pEEYN5Z2GFvfC0LosCeuNklAJc=
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

## Функции

- Встроенный протокол TCP: прямое подключение к тепловому насосу без дополнительных затрат.

- Защита компрессора (оптимизация цикла): объединение циклов отопления и горячего водоснабжения для сокращения количества запусков компрессора.

- Интегрированные действия (макросы): Предопределенная логика управления для принудительного отопления, запросов на горячую воду и циркуляционного насоса (ZIP), включая автоматическое переключение на значения по умолчанию.

- Пользовательские точки данных: Измеренные значения (индекс 3004) и параметры (индекс 3003) можно добавить через конфигурацию адаптера. Временные метки Unix форматируются автоматически.

- Автоматическое управление объектами: Отменённые или удалённые точки данных и пустые структуры папок автоматически удаляются из ioBroker при перезапуске адаптера.

- Система уведомлений: коды ошибок теплового насоса можно отправлять напрямую в Telegram или в систему уведомлений ioBroker.

- Подключение к датчику движения: опция для активации циркуляционного насоса по требованию с помощью существующих датчиков движения ioBroker.

## ⚠️ Предупреждение

Некоторые настройки, предоставляемые этой интеграцией, могут влиять на производительность вашего теплового насоса. Неправильная настройка может привести к переходу контроллера в состояние неисправности, что потребует ручной перезагрузки на месте.

Цель этого проекта — защитить ваш тепловой насос, ограничив параметры конфигурации безопасными значениями. Однако никаких гарантий дать нельзя. Будьте осторожны, ознакомьтесь с руководством пользователя Luxtronik и не изменяйте настройки, которые вы не до конца понимаете.

## 🔧 Совместимость

Интеграция позволяет отслеживать и управлять тепловыми насосами с помощью контроллера Luxtronik2. Она работает локально, без доступа в интернет. Интеграция тестировалась и в настоящее время тестируется с тепловым насосом LWD50A (LD5) от Alpha Innotec.

## ⚠️ Отказ от ответственности / Haftungsausschluss ⚠️

Dieses Projekt steht in keinerlei Verbindung zu Alpha Innotec, Novelan, ait-deutschland GmbH или другие компании Herstellern. Это касается частного проекта с открытым исходным кодом, который в свободном доступе Entwickelt und Gepflegt Wird. Die Nutzung des Adaptors, найденные на собственном сайте.

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
### 0.7.3 (2026-09-07)

**Bugfixes**
-(Fixed) Timer Table Register Conflict: Resolved conflicting Luxtronik register IDs for Domestic Hot Water (DHW) Monday–Sunday schedules (WW_MoSo_Start1 to End5). These were previously mapped to registers 507–516 (colliding with Circulation timer registers) and have now been corrected to registers 406–415.

-(Fixed) Time-String Conversion on State Change: Fixed a parsing bug where manual updates to time strings (HH:MM / HH:MM:SS) on states marked with isDurationFormat or time-related roles were passed directly as strings instead of converting to seconds since midnight, preventing user-entered schedule values from persisting in the controller.

### 0.7.2 (2026-09-07)

**Bugfixes**

- (Fixed) Unintended Configuration Overwrites: Fixed a critical architectural flaw where the adapter blindly forced default values (e.g., hot water target temperature, heating curve) to the heat pump on every startup. The adapter is now 100% passive (read-only) upon installation until features are explicitly enabled.

- (Fixed) Strict Opt-In Logic: All internal condition checks for background automations (cycle optimization, ZIP optimization, idle resets) were refactored to strict opt-in logic (=== true), preventing unintended actions when settings have never been saved.

- (Fixed) Live Toggle for Cycle Optimization: Fixed an issue where the ioBroker switch Actions.Regelung_Aktiv was ignored during runtime. The optimization loop now evaluates this switch dynamically, allowing users to toggle the feature live via their dashboard.

- (Fixed) Hardware ZIP Timer Disable: Fixed a bug where a mismatched configuration key (zip_hardware_timer_disable instead of zip_lWP_aktiv) prevented the adapter from correctly disabling the hardware circulation pump timer for flash memory protection.

- (Fixed) "Heating after hot water" Reset: Restored missing logic that properly resets the "Heating after water" status back to false at the end of a cycle, preventing the system from getting stuck in this mode.

**Features & Change**

- (Changed) Forced DHW Safety Limit: Reduced the internal safety limit for temporary hot water target adjustments during forced DHW runs from 75°C to 70°C to better protect the system's high-pressure switch.

### 0.7.1 (2026-09-07)

**Bugfixes**

- (Fixed) Status Display: Fixed a logical evaluation bug where the operating state "Heating" (Code 0) was incorrectly overwritten and displayed as "No demand" (Code 5). Thanks to @michiproep for reporting!

- (Fixed) Temperature Values: Fixed a related issue where temperature readings of exactly 0 °C (e.g., average temperature, return target temperature, cooling release) were incorrectly replaced by internal fallback values (e.g., 1.5 °C).

### 0.7.0 (2026-09-04)

**Features & Changes**

- **(Changed) Cycle Optimization & Forced Hot Water**: To force a hot water cycle, the adapter now temporarily increases the hot water target temperature instead of modifying the hysteresis. This crucial safety improvement allows users to manually revert changes directly on the heat pump display without needing an installer password.
- **(Changed) Disable default**: Disabled reset to default values in idle mode by default on initial start
- **(Removed) Hysteresis Protection**: Removed all dynamic manipulations of the hot water hysteresis (e.g., during idle or active DHW cycles) to ensure installer-level settings remain untouched.
- **(UI/Docs)**: Added detailed explanations and trigger rules for "Intelligent Cycle Optimization" and "Heating after hot water" directly to the admin configuration page.

**Bugfixes**

- Fixed adapter checker warning [W0066] by downgrading `@types/node` dependency to v22

### 0.6.6 (2026-08-31)

- review / fix findings reported by claude based checker.
- Extended minimum limit for `temperature_outdoor_min` from -20°C to -25°C
- Lowered minimum allowed value for `heating_curve_parallel_offset` (base point) from 20°C to 15°C
- Disabled dynamic cycle optimization / regulation by default on initial start

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

[Older changelogs can be found there](https://github.com/TbsJah/ioBroker.luxtronik2-controller/blob/main/CHANGELOG_OLD.md)