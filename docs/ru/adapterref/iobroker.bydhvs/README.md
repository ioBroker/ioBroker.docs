---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bydhvs/README.md
title: нет названия
hash: 6rJsGMiwPDh+TVJW6fkrBhq0iv+bPoQEMAMO0zfJzWU=
---
![Логотип](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## Адаптер bydhvs для ioBroker
Данные опроса BYD HVS Battery

## Введение
Этот адаптер берет данные с батареи byd PV ( https://www.bydbatterybox.com/ ) и помещает их в точки данных в адаптере. К сожалению, нет официального API и документации, поэтому я использовал wireshark и byd-hvs-simulator, чтобы попытаться понять связь. Мой адаптер имитирует byd-app, отправляет аналогичные пакеты на устройство и анализирует ответы.

## Будь осторожен
В приложении beConnect есть два шага: на первом шаге вы получаете обычные данные, на втором шаге вы получаете подробные данные для всех ячеек (температура и напряжение отдельной ячейки и некоторые другие подробности). Чтобы получить подробные данные, должна быть задержка после одного из пакетов данных, пока я не получу результат. Я думаю, что в это время измеряются все ячейки, но я не уверен. Я определенно не уверен, навредите ли вы своей батарее, опрашивая эти данные слишком часто, поэтому будьте осторожны: вы действуете на свой страх и риск!

## Поддержка до 5 модулей
Теперь поддерживается до 5 модулей HVS.

## Настройки
Интервал: Это просто: как часто (ы) будут опрашиваться данные IP-адрес: Это само собой разумеется. Либо вы используете стандартный адрес (192.168.16.254) и меняете маршрутизацию дома, например: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343. Преимущество в том, что приложение beConnect тоже работает. Другая возможность: вы меняете IP-адрес коробки. Но: Будьте осторожны: текст на веб-странице сбивает с толку, и если вы не совсем уверены в том, что вы делаете: ПОЖАЛУЙСТА, не трогайте настройки. На немецких форумах я читал от людей, которые были заблокированы из своей системы и нет пути назад, либо byd отправляет вам замену HVU, либо вам придется купить новый. Battery-details: Как объяснялось выше: Вам нужны данные об аккумуляторе? Если да: установите флажок.
Battery-details - every ... cycles: Также, как и выше, должно быть чисто Test Mode - show data in error log: Если вы установите этот флажок: отправленные и полученные данные отображаются в error-log, поэтому вы можете легко загрузить данные и отправить их мне в случае ошибок.
Copy and Paste не работает - данные обрезаются в конце. Вам придется загрузить их, прежде чем отправлять мне.

[Ссылка на ознакомительные сведения о родном немецком языке:](README-German.md)

## **РАБОТА В ПРОЦЕССЕ**
* первая версия с двумя башнями в НПМ

### 1.5.1 (2024-01-15)
* Возможность получения информации из двух башен
* КРУТОЕ ИЗМЕНЕНИЕ структуры.

### 1.5.0 (2023-11-04)
* Критическое изменение: требуется минимум nodejs 16
* исправлены автоматические проверки и скрипт выпуска (спасибо mcm1957, он проделал эту работу)
* больше ничего не изменилось в коде

### 1.4.2 (2023-09-28)
* Опечатка в номере версии удалена

### 1.4.1 (2023-09-24)
* Совместимость с js.controller 5x
* Устранены некоторые ошибки в обнаружении инвертора
* Номер инвертора зарегистрирован, поэтому я могу легко добавить новые инверторы, если это необходимо. Просто отправьте мне глупый лог, если инвертор неизвестен.

### 1.4.0 (2022-10-31)
* Обновление указанных модулей (в основном касающихся тестирования)
* улучшения, внесенные Tapter (5 модулей, readme и более читаемый код)
* Лучшее определение типа батареи и инвертора
* SOC не только из обычных данных, но и из диагностических данных. Там у нас на одну десятичную больше
* удалено ограничение частоты для данных о батарее
* увеличено максимальное количество измерений температуры для HVS до 64
* поддержка до 5 модулей HVS

### 1.3.0 (2021-11-06)
* обновлено еще больше зависимостей
* официальный релиз с новым государственным SOH

###

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## License
MIT License

Copyright (c) 2023 Christian <github@familie-herrmann.de>

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