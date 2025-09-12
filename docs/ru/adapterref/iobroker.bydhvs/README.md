---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bydhvs/README.md
title: нет названия
hash: KB7RargX+yva7yH7Db8nwbj/wkP5w5DHRtli0soAJ0E=
---
![Логотип](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.bydhvs.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bydhvs.svg)
![Количество установок](https://iobroker.live/badges/bydhvs-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/bydhvs-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bydhvs.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/christianh17/ioBroker.bydhvs/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/christianh17/ioBroker.bydhvs/actions/workflows/codeql.yml/badge.svg?branch=main)

## Адаптер bydhvs для ioBroker
Данные опроса BYD HVS Battery

## Введение
Этот адаптер получает данные с фотоэлектрической батареи Byd (https://www.bydbatterybox.com/) и передаёт их в точки данных адаптера. К сожалению, официального API и документации нет, поэтому я использовал Wireshark и симулятор Byd-hvs-simulator, чтобы разобраться в этом процессе. Мой адаптер имитирует работу приложения Byd, отправляет аналогичные пакеты устройству и анализирует ответы.

## Будь осторожен
Приложение beConnect состоит из двух этапов: на первом этапе вы получаете обычные данные, на втором — подробные данные по всем ячейкам (температуру и напряжение отдельных ячеек, а также некоторые другие данные). Чтобы получить подробные данные, требуется задержка после отправки одного из пакетов данных, пока я не получу результат. Думаю, в это время измеряются все ячейки, но я не уверен. Я точно не знаю, навредит ли слишком частый опрос этих данных аккумулятору, поэтому имейте в виду: вы действуете на свой страх и риск!

## Поддержка до 5 модулей
Теперь поддерживается до 5 модулей HVS.

## Настройки
Интервал: Всё просто: как часто (ы) будут опрашиваться данные. IP-адрес: Всё понятно. Либо вы используете стандартный адрес (192.168.16.254), либо меняете маршрутизацию дома, например: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343. Преимущество: приложение beConnect тоже работает. Другой вариант: вы меняете IP-адрес устройства. Но: Имейте в виду: текст на веб-странице запутанный, и если вы не совсем уверены в том, что делаете: ПОЖАЛУЙСТА, не трогайте настройки. На немецких форумах я читал от людей, которым заблокировали доступ к системе, и пути назад нет. Byd либо присылает вам замену HVU, либо вам придётся покупать новый. Информация об аккумуляторе: Как объяснялось выше: Вам нужна информация об аккумуляторе? Если да, установите флажок.
Информация об аккумуляторе — каждые ... циклов: Также, как и выше, должно быть снято. Тестовый режим — показывать данные в журнале ошибок: Если вы установите этот флажок, отправленные и полученные данные будут отображаться в журнале ошибок, поэтому вы можете легко скачать их и отправить мне в случае возникновения ошибок.
Копирование и вставка не работают — данные обрезаются в конце. Вам придётся скачать их перед отправкой мне.

[Ссылка на ознакомительные сведения о родном немецком языке:](README-German.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (arteck) add current info
* (arteck) add creates into separated file 

### 1.5.4 (2025-08-03)
* (arteck) typo

### 1.5.3 (2025-08-02)
* (arteck) update dependecy

### 1.5.2 (2025-08-02)
* (arteck) add socketConnection DP
* (arteck) use jsconConfig
* (arteck) refactoring to modern Code
* (arteck) use direct socket connection without detour IPClient
* first Version with two towers in NPM

### 1.5.1 (2024-01-15)
* Enable the possibility to get informations from a two tower setup
* BREAKING CHANGE of Structure.

### 1.5.0 (2023-11-04)
* Breaking change: nodejs 16 minimum required
* automated checks and release-script repaired (thanks to mcm1957, he did the work)
* nothing else changed in code

###

## License
MIT License

Copyright (c) 2025 Christian <github@familie-herrmann.de>

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