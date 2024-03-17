---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: 3bOvnWEL8AyBYUbkbPBMOHU0REczZsEAXxM8b9g23Ro=
---
![Логотип](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Количество установок (последних)](https://iobroker.live/badges/ems-esp-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/ems-esp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Тесты:** ![Тестирование и выпуск](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Системы отопления Bosch / Buderus с интерфейсом km200 / IP-inside и/или ems-esp
Адаптер поддерживает интерфейс с системами отопления Bosch Group по шине EMS или EMS+.
(Будерус/Юнкерс/Нетфит и т.д.).

## Он может взаимодействовать с системой отопления с использованием вызовов Web-API для:
* км200, км200 грн, км100, км50, HMC300 или IP-inside (от Bosch Group)

* шлюз ems-esp (https://github.com/emsesp/EMS-ESP32) с последней версией для разработчиков (см. ниже) и чипом ESP32.

Старые шлюзы ESP8266 с API V2 БОЛЬШЕ НЕ ПОДДЕРЖИВАЮТСЯ! Адаптер протестирован для шлюза ems-esp с последней версией прошивки (> V3.6.0) ESP32.

* Новые облачные шлюзы Bosch-Group (MX300 / EasyControl ...) не поддерживаются, поскольку они не поддерживают LAN API!

Адаптер ioBroker ems-esp может считывать и записывать данные на оба шлюза для управления всеми компонентами отопления.
Его можно использовать либо для оригинальных шлюзов Bosch-Group, либо для ems-esp, либо для обоих параллельно.
Все измененные состояния из собственных скриптов или браузера объектов должны устанавливать подтверждение = false !!!

## НОВОЕ в версии >= 3.0.0: объекты EMS+ (switchPrograms и HolidayModes) реализованы для шлюза EMS-ESP и при обнаружении создаются состояния.
Прошивка шлюза ems-esp не поддерживает программы переключения и HolidayModes для термостатов EMS+ (RC310 / RC300 или аналогичных). Включение этой новой функции приведет к отправке необработанных телеграмм шлюзу ems-esp, а затем попытается прочитать ответ.
Тестирование выполняется для программ переключения A и B для hc1 на hc4, ГВС (теплая вода) и циркуляционного насоса (cp) и режимов отпуска hm1-hm5.
Найденные расширенные сущности сохраняются в настройках экземпляра. Поэтому после перезагрузки экземпляра адаптера произойдет перезагрузка.

Затем после этих найденных состояний необработанный ответ декодируется и создаются состояния, аналогичные данным API шлюза KM200.
Когда шлюз km200 включен, эта функция отключается, чтобы избежать двойного ввода одного и того же имени.
Создаваемые состояния состоят из структур JSON, значений перечислений или массивов и доступны для записи. Будьте осторожны с правильным содержимым.
Я рекомендую провести тестирование с помощью приложений Bosch/Buderus, чтобы определить правильный контент, особенно для HolidayModes.
Опрос установлен каждые 2 минуты.

## НОВИНКА Для записей и статистики энергопотребления требуется активный экземпляр базы данных.
Для записей требуется адаптер InfluxDB версии >= 4.0.2, который позволяет удалять записи базы данных. Период восстановления теперь считывается, и записи сохраняются только в течение периода хранения. Бета-статус InfluxDB v2 требует, чтобы период хранения был установлен на > 2 года для хранения. все исторические ценности.
В V2 это глобальный параметр для всех состояний!

## НОВИНКА: улучшен гистерезис потребности в тепле.
Включайте запрос тепла, когда фактическая температура <= заданная температура - дельта. Выключайте, когда заданная температура < фактическая температура. Ничего не делайте между заданной температурой - дельта и заданной температурой. Убедитесь, что разница достаточно высока, чтобы избежать слишком большого количества запусков котла.

## НОВИНКА: параметры потребности в тепле можно изменить во время активного экземпляра.
Параметры потребности в тепле (дельта/вес) для каждого термостата могут быть изменены внутри объектов во время активного экземпляра. Примечание. Обновленный вес используется только в том случае, если обнаружена новая потребность в тепле.

Документация на немецком языке: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf.

Английская документация: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf.

Немецкий форум ioBroker: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.3 (2024-03-09)
* improve km200 data read to avoid errors

### 3.0.2 (2024-03-02)
* improve km200 data read to avoid errors - try http get up to 3 times now - especially for recordings

### 3.0.1 (2024-02-25)
* change KM200 error messages for recordings

### 3.0.0 (2024-02-17)
* Node >= 18 required
* update heatdemand weight changes to be effective during active instance
* ems-esp gateway: Raw telegram search for EMS+ thermostats: switchPrograms and holidayModes (RC310/RC300)
* create writable objects / states for switchPrograms and holidayModes
* this function is only active when no km200 gateway is selected - ems-esp gateway only
* improve error messages for km200 (wrong ip / passwords)
* small changes within PDF adapter documentation

### 3.0.0-alpha.2 (2024-02-16)
* Node >= 18 required
* update heatdemand weight changes to be effective during active instance

## License
MIT License

Copyright (c) 2024 Thomas Petrick <tp1degit@gmail.com>

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
SOFTWARE."