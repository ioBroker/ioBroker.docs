---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cec2/README.md
title: ioBroker.cec2
hash: EMAqD2sH3brmb4L8tLeFJLuQJv73syqnJHv+aKcHCXI=
---
![Логотип](../../../en/adapterref/iobroker.cec2/admin/cec2.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.cec2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cec2.svg)
![Количество установок](https://iobroker.live/badges/cec2-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/cec2-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.cec2.png?downloads=true)

# IoBroker.cec2
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.cec2/workflows/Test%20and%20Release/badge.svg)

Адаптер для HDMI CEC

Вы можете отслеживать/управлять устройствами с помощью HDMI CEC. Большинство современных телевизоров и мультимедийных устройств в той или иной степени поддерживают CEC.

## Информация
При запуске этот адаптер запускает cec-client и опрашивает все устройства на шине HDMI. Для каждого устройства CEC создается устройство в ioBroker. OSDName устройства становится его идентификатором в ioBroker (поскольку он не должен меняться и хорошо читается).
Если устройства появляются во время выполнения, они также добавляются в ioBroker.

#### Адреса CEC
Краткое введение об адресах CEC, этот раздел можно пропустить, но если вам непонятно описание ниже, возможно, стоит прочитать его здесь.

В CEC используются два типа адресов. Оба важны.

##### Логический адрес
Логический адрес — это число от 0 до 15 (или F в шестнадцатеричном формате, который обычно используется). Это число определяет тип устройства:

* 0 = ТВ
* 5 = Аудиосистема
* 4,8,11 = Воспроизведение
* 1,2,9 = Запись
* 3,6,7,10 = Тюнер

Остальные адреса являются зарезервированными (12,13), свободными для использования (14) и незарегистрированными/транслируемыми (15). Устройства, использующие эти адреса, ограничены в своей связи.

Логический адрес назначается динамически. Это означает, что в один день может возникнуть ситуация, когда устройству воспроизведения A присвоен адрес 4, а устройству воспроизведения B — 8. Но на следующий день они включаются в другом порядке, и тогда A получает адрес 8, а B — 4. (Однако некоторые устройства всегда активны на шине CEC и поэтому сохраняют свои адреса). Если устройств одного типа слишком много (например, 4 устройства воспроизведения), то логические адреса приходится использовать повторно, и это неизбежно. Адаптер пытается справиться с этой ситуацией.

Логический адрес используется для адресации сообщений и отчетов.
ioBroker также нуждается в логическом адресе для получения отчетов из шины. Поэтому настройте адаптер на тип устройства, для которого у вас есть свободные логические адреса (например, для записи).

##### Физический адрес
Физический адрес определяется количеством HDMI-портов, используемых устройством. По сути, это путь от номера порта к устройству. Он состоит из 4 чисел, разделённых точками. Вот несколько примеров:

* 0.0.0.0 = ТВ
* 1.0.0.0 = 1. HDMI-порт телевизора
* 2.0.0.0 = 2. HDMI-порт телевизора
* 2.2.0.0 = 2. HDMI-порт телевизора, 2. HDMI-порт коммутатора/AV-ресивера
* 4.1.2.0 = 4. HDMI-порт телевизора, 1. HDMI-порт AV-ресивера/коммутатора, 2. HDMI-порт следующего AV-ресивера/коммутатора

Это должно дать общее представление. 0 означает, что путь заканчивается.

Физический адрес устройства остается неизменным, если оно не подключено к другому порту HDMI (или к любым другим устройствам, которые отображаются на телевизоре).

#### Состояний для каждого устройства
Для каждого устройства создаются следующие состояния:

* info.active = устройство было обнаружено недавно, и логический адрес должен быть правильным.
* info.cecVersion = должно быть 1.4, определяет функциональность
* info.lastSeen = последнее сообщение от устройства в шине CEC
* info.logicalAddress = логический адрес в виде числа
* info.logicalAddressHex = логический адрес в шестнадцатеричном формате (необходим для собственных команд)
* info.Name = имя, которое устройство задает в шине CEC
* info.physicalAddress = физический адрес
* info.Vendor = производитель устройства
* activeSource = является ли устройство активным источником? Можно переключить это устройство в режим активного источника.
* menuStatus = позволяет управлять устройством с помощью пульта от телевизора
* состояние = состояние питания устройства (позволяет включать/выключать его, если поддерживается)
* createButtons = нажмите здесь, чтобы сгенерировать состояния для кнопок в подпапке .buttons.
* buttons.time = время нажатия кнопки (по умолчанию 500 мс).

## Кнопки
Нажатия кнопок работают не на всех устройствах, и для управления некоторыми может потребоваться активное соединение с устройством ioBroker через шину CEC.
Для FireTV это работает вполне нормально.
Чтобы проверить нажатия кнопок, нажмите кнопку `createButtons` на устройстве и протестируйте несколько созданных кнопок в различных ситуациях. Питание работает на довольно многих устройствах.

#### Глобальные государства
Существуют следующие глобальные государства:

* active-source = физический адрес текущего активного источника (можно установить для переключения входов)
* arc = Канал возврата звука (не)активен, возможно, его можно (де)активировать здесь.
* mute = отключить звук аудиосистемы
* raw-command = отправлять команды непосредственно в cec-client (например, 'scan' или tx + команда CEC с сайта http://www.cec-o-matic.com/)
* standbyAll = перевести все устройства в режим ожидания
* systemAudio = Аудиосистема используется/не используется. Сообщает устройствам, что они должны отправлять команды регулировки громкости/отключения звука в аудиосистему.
* громкость = громкость аудиосистемы, 0 = отключение звука
* Увеличение/уменьшение громкости = изменение громкости аудиосистемы

#### Штаты, где проводятся выборы
В папке «poll» находятся данные о состоянии кнопок для большинства состояний. Если кнопка нажата, адаптер отправляет команду по шине CEC для опроса значения и установки соответствующего состояния (к сожалению, не все устройства реагируют на сообщения опроса).

#### Требования
Необходимо установить cec-client. Обычно это можно сделать с помощью следующей команды:

```
sudo apt install cec-utils
```

Пользователю, запускающему iobroker (в настоящее время "iobroker"), необходим доступ к /dev/vchiq. Для этого может потребоваться добавить пользователя iobroker в группу video:

```
sudo usermod -a -G video iobroker
```

## Конфигурация
* Имя OSD: это имя будет передаваться другим устройствам, например, вашему телевизору. Возможно, вам потребуется выбрать ioBroker, чтобы получать уведомления с пультов дистанционного управления в ioBroker.
* Тип устройства: Вы можете задать тип устройства; см. обсуждение логического адреса выше, чтобы понять, что это значит. Используйте тип устройства, которых у вас немного.
* Предотвращение появления неназванных устройств: Иногда устройства не сообщают своё имя в определённых ситуациях (например, Nintendo Switch не сообщает своё имя в режиме ожидания, но объявляет себя). В таких ситуациях адаптер может создать дубликат устройства по его физическому адресу (например, для чисел). Вы можете включить эту опцию, чтобы предотвратить это.

## Примеры скриптов:
См. [примеры скриптов](doc/ExampleScripts.md) для примеров скриптов, которые помогают в настройке/восстановлении мультимедийных файлов.

## Changelog

<!--
	PLACEHOLDER for next version:
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 0.1.3 (2024-07-04)
* remove unnecessary files from npm package

### 0.1.2 (2024-06-04)
* prevent crash
* try restart in case of error with cec-client

### 0.1.1 (2023-09-06)
* dependency updates.
* sending commands is now more reliable.
* more error handling

### 0.1.0 (2021-02-18)
* add more translations.
* add more options (poll TV power).

### 0.0.8 (2021-02-14)
* Switched from unmaintained dependency to own code to control cec-monitor binary.
* Swtiched from event-stream to readline.
* Probably fixed missed incomming events.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 Garfonso <garfonso@mobo.info>

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