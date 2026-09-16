---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.moma/README.md
title: без названия
hash: Ix3OpWeB2VypjxxdUXrFWxN+Ra/jToA8BhsRSe1OhwE=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.moma.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Количество установок](http://iobroker.live/badges/moma-installed.svg)
![Стабильная версия](http://iobroker.live/badges/moma-stable.svg)
![Статус зависимости](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Известные уязвимости](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)

<h1>
	<img src="admin/moma.png" width="64"/>
	ioBroker.moma
</h1>

## адаптер moma для ioBroker

**MoMa** — это адаптер для **мониторинга** и **обслуживания** системы домашней автоматизации на базе ioBroker. **MoMa** ориентирован на системы домашней автоматизации, которые несколько сложнее, чем одна машина, работающая в режиме «все в одном», или небольшое количество машин, выполняющих базовую балансировку нагрузки в одной сети.

Он не предназначен для замены инструментов администрирования, таких как **Puppet** , **Chef** , **Salt** или **Ansible** . Эти инструменты предназначены для больших сред с большим количеством компьютеров и позволяют удаленно устанавливать пакеты. **MoMa** сможет только удаленно обновлять существующие установки, удаленная установка и удаленная настройка невозможны.

**Внимание:**

При использовании JavaScript-адаптера установите флаг "не регистрировать все состояния при запуске" в значение true, если возникает ошибка "RangeError: Maximum call stack size exceeded".<br> При регистрации всех состояний при запуске каждое событие изменения состояния также будет генерировать событие для адаптера JavaScript. Особенно для Windows такое большое количество событий может стать проблемой.<br> Другим решением является увеличение значения времени для интервала 0.

MoMa использует платформенно-независимую библиотеку 'systeminformation' ( <https://github.com/sebhildebrandt/systeminformation> ) для сбора информации о компьютере. Многие из вызовов доступны для использования в интервалах таймера — см. ссылку ниже.

Для работы MoMA требуется как минимум Node.js версии 10.

## Установка

Доступно в репозитории ioBroker 'latest'.

альтернативный вариант:

npm install iobroker.moma

Работает также в многохостовых средах — убедитесь, что перед установкой выбран правильный экземпляр.

**Внимание:** В настоящее время в качестве временного решения необходимо установить экземпляр Admin-Adapter на каждом подчиненном сервере. Активная работа Admin-Adapter не обязательна!

## Основная концепция

Проект всё ещё находится в стадии разработки — идеи, предложения, подсказки и т.д. приветствуются!

Форум: <https://forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma>

GitHub: <https://github.com/AWhiteKnight/ioBroker.moma>

Основная идея заключается в том, чтобы иметь

- дерево для каждого экземпляра (moma.\<instance-id>), содержащее всю информацию о машине, на которой запущен данный экземпляр.
- Общее дерево (moma.meta), ниже которого каждый экземпляр создает устройство \<hostname>, содержащее ссылку на экземпляр и некоторую информацию для мониторинга.
- Вкладка администратора для обслуживания (обновления операционной системы, js-контроллера, адаптеров).

## Ссылка

Вкладка администратора MoMa позволяет запускать обновления или, при необходимости, перезагружать систему.

Следующие функции системы библиотечного доступа вызываются один раз при запуске:

- базовая плата - Информация о материнских платах компьютеров
- шасси - Информация о шасси компьютеров
- BIOS — информация о BIOS компьютеров
- система - Информация о производителе компьютеров
- ЦП — Информация о компьютерах
- cpuFlags - Доступные флаги ЦП
- memLayout - Информация о микросхемах памяти компьютеров
- diskLayout - Информация о жестких дисках компьютеров

Следующие функции библиотечной системы информации вызываются с интервалом 0 (по умолчанию — каждую секунду):

- время - Фактическое время, часовой пояс и время работы
- cpuCurrentSpeed - Фактическая частота процессора и ядра.
- networkConnections - Фактические сетевые подключения
- currentLoad - Фактическая загрузка ЦП
- процессы - Обзор процессов с файлом process.list в виде HTML-таблицы

Следующие функции системы библиотечного обслуживания вызываются с интервалом 1 (по умолчанию каждые 10 секунд):

- mem - Информация об использовании памяти
- cpuTemperature — температура процессора и ядер.
- networkStats - Статистика сети
- fullLoad - Средняя загрузка с момента последней загрузки

Следующие функции системы библиотечного обслуживания вызываются с интервалом 2 (по умолчанию — каждую минуту):

- Батарея — состояние заряда и информация о батарее.
- пользователи - Текущие пользовательские сессии
- fsSize — информация о файловой системе компьютера.
- blockDevices - Подключенные блочные устройства
- fsStats — статистика доступа к файлам — не поддерживается в Windows.
- disksIO — статистика ввода-вывода блочных устройств — не поддерживается в Windows.

Следующие функции системы библиотечного обслуживания вызываются с интервалом 3 (по умолчанию — каждый час):

- networkInterfaceDefault - Сетевой интерфейс по умолчанию
- networkInterfaces - Доступные сетевые интерфейсы
- Графика — информация о видеокартах компьютеров и подключенных мониторах.
- inetLatency — Проверка задержки интернет-соединения по IP-адресу 8.8.8.8.
- dockerInfo — Общая информация о Docker — для корректной работы требуется наличие на машине команды «adduser iobroker docker».
- dockerContainers — список всех контейнеров Docker — для корректной работы требуется установка команды «adduser iobroker docker» на компьютере.

Следующие функции информационной системы библиотеки вызываются с интервалом 4 (по умолчанию — каждый день):

- osInfo — информация об операционной системе компьютера.
- uuid - UUID установки
- shell — Системная оболочка по умолчанию — не поддерживается в Windows.
- версии - Версии установленных программных пакетов

Следующие функции **MoMa** вызываются с интервалом в 4 дня (по умолчанию — каждый день):

- updates — проверяет наличие ожидающих обновлений и отображает количество обновлений в файле moma.meta.\<hostname>.updates (в настоящее время только для Ubuntu, Debian, openSUSE, RedHat).
- checkIob — проверяет все адаптеры и js-контроллер на наличие доступных обновлений.
- checkBatteries — проверяет переменные состояния батареи (в настоящее время реализованы следующие названия состояний: LOWBAT, LOW\_BAT).

## Changelog

### 1.2.9 (2021-08-17)
* (AWhiteKnight) issue2 #53-55, upgrade to systeminformation lib 5.8.0, update all dependencies

### 1.2.8 (2021-03-26)
* (AWhiteKnight) eliminate warning messages (issue #52), upgrade to systeminformation lib 5.6.8
	- in systeminformation many states of currentLoad have been renamed. The old ones will be deleted and the new ones created. Have a look into the logs.

### 1.2.7 (2020-10-18)
* (AWhiteKnight) remove leading i in names that are not a number, systeminformation lib 4.27.0 

### 1.2.6 (2020-04-27)
* (AWhiteKnight) fix typo, precise error location, systeminformation lib 4.23.6 

### 1.2.5 (2020-04-12)
* (AWhiteKnight) minor bugfixing, prepare stable release 

### 1.2.4 (2020-03-20)
* (AWhiteKnight) bugfixing: issues #45 #42 #24, controller update working again 

### 1.2.3 (2019-11-06)
* (AWhiteKnight) bugfixing, code cleanup 

### 1.2.2 (2019-09-12)
* (AWhiteKnight) ioBroker adapter/controller updates for windows, issue #24 

### 1.2.1 (2019-08-12)
* (AWhiteKnight) Bugfixing on 1.2.0 

### 1.2.0 (2019-07-26)
* (AWhiteKnight) Library 'systeminformation' version 4.14.4, 
                 check for update of Adapters and JS-Controller in Interval 4,
				 dockerInfo, dockerContainers in Interval 3,
				 moma admin-tab with update buttons for os, js-controller, adapters.

### 1.1.0 (2019-05-20)
* (AWhiteKnight) Performance optimization,
				 partial fix of Issu #24,
				 Check internet latency.

### 1.0.0 (2019-05-11)
* (AWhiteKnight) First release for adapter list 'stable'.

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list 'latest'.

### 0.0.1
* (AWhiteKnight) initial version

## License
MIT License

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

Copyright (c) 2021 AWhiteKnight