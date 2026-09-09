---
chapters: {"pages":{"en/adapterref/iobroker.enocean/README.md":{"title":{"en":"ioBroker.enocean"},"content":"en/adapterref/iobroker.enocean/README.md"},"en/adapterref/iobroker.enocean/SPONSORS.md":{"title":{"en":"Sponsors"},"content":"en/adapterref/iobroker.enocean/SPONSORS.md"},"en/adapterref/iobroker.enocean/docs/devices.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.enocean/docs/devices.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enocean/README.md
title: ioBroker.enocean
hash: DJE7o/fG7sQrBhhgxMYAD/sXPGFFuMJ2cZkixm/iWxc=
---
![Логотип](../../../en/adapterref/iobroker.enocean/admin/enocean.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.enocean.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.enocean.svg)
![Количество установок (последние)](http://iobroker.live/badges/enocean-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/enocean-stable.svg)
![Статус зависимости](https://img.shields.io/david/jey-cee/iobroker.enocean.svg)
![НПМ](https://nodei.co/npm/iobroker.enocean.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/jey-cee/ioBroker.enocean/master.svg)

# ioBroker.enocean

## Адаптер EnOcean для ioBroker

Подключает устройства EnOcean через USB/последовательный порт к микросхемам TCM300.

## Присоединяйтесь к серверу Discord, чтобы обсудить все аспекты интеграции ioBroker и enocean!

<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [Спонсоры](/#/docs/adapterref/iobroker.enocean/SPONSORS.md)

Если вам нравится моя работа, пожалуйста, не стесняйтесь сделать личное пожертвование.\
&#x20;(Это личная ссылка для пожертвований Джея Си, не имеющая отношения к проекту ioBroker!)\
[![Пожертвовать](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=95YZN2LR59Q64\&source=url)

## Совместимые USB-накопители и модули

USB300

USB-накопитель DOSMUNG с портом SMA

FAM-USB (прошивка для ESP3)

**Важное примечание к модулю EnOcean для Pi:** на Pi3 и Pi4 необходимо отключить встроенный модуль Bluetooth, иначе модуль EnOcean работать не будет!

Eltako FGW14:\
&#x20;**Важные примечания** : Данный шлюз не поддерживает все функции и устройства этого адаптера.\
&#x20;Известные неработающие функции: невозможность чтения информации о RSSI и шлюзе, а также возможность управления устройствами только через шину RS485 без FTD14 (пока не тестировалось). Если нет технических оснований для использования данного шлюза, настоятельно рекомендуется использовать другой.\
&#x20;Устройства, подключенные к шине, передают свой адрес, который начинается с 00 00 00 01.

Умный сетевой шлюз EnOcean LAN Gateway - ~~[КУПИТЬ.](https://www.all-smart.net/produkt/all-smart-enocean-lan-gateway/)~~ Больше не доступен.

Умный многошлюзовый маршрутизатор EnOcean - [КУПИТЬ](https://www.all-smart.net/produkt/all-smart-enocean-multi-gateway/)

### [Поддерживаемые устройства](/#/docs/adapterref/iobroker.enocean/docs/devices.md)

## Устройства управления

Как правило, существует объект cmd, где можно выбрать команду, которую вы хотите выполнить. Перед выполнением команды необходимо установить все необходимые атрибуты; эту информацию можно найти в определении профиля.

Особенный:

- A5-20-xx: Устройства с этим профилем принимают команды только в течение 1 секунды после отправки сообщения. Они отправляют команды периодически (10 минут?), пожалуйста, ознакомьтесь с инструкцией.

## Просвещение

- Процесс описан (краткими) пошаговыми инструкциями в конфигурации адаптера. Там вы можете выбрать свое устройство, и отобразятся инструкции. Следуйте им.
- Устройства, не имеющие возможности обучения другому устройству (например, Eltako Series 12, также известные как Opus Green Net): ими можно управлять с помощью виртуального переключателя (F6-02-02): Откройте конфигурацию и нажмите «Добавить новое устройство». Теперь выберите X\_Virtual в качестве производителя и Switch в качестве устройства, используя ID fffffff0. Подсчитайте последний знак, от 1 до 9 и af, для каждого нового виртуального переключателя. Нажмите «Добавить устройство» и закройте конфигурацию. Затем запустите обучение вашего устройства в соответствии с инструкцией, отправляя команды с виртуального переключателя. Теперь вы сможете управлять устройством.

## Отключение обучения (удаление привязки адаптера с устройства)

- Eltako Tipp-Funk: Отправка команды обучения 3 раза в течение 2 секунд с ioBroker на устройство.
- Устройства с поддержкой UTE: запустите функцию обучения адаптера и следуйте инструкциям для устройства.
- RPS: Просто удалите объекты
- Ничего: Просто удалите объекты.

## Поиск неисправностей

1. Устройство не реагирует на команду:
   - Процесс обучения не удался. В зависимости от устройства, при успешном обучении поступает сигнал, обратите внимание на этот сигнал. Если сигнала нет, попробуйте снова.
   - Проверьте, правильно ли заданы все параметры, относящиеся к командной строке (CMD).
   - Если значение RSSI превышает -70 дБм, сигнал может быть слишком слабым. Попробуйте переместить устройство ближе к шлюзу.
   - Приводы клапанов (термостаты) отправляют сообщение каждые x минут. После получения сообщения устройство принимает команду в течение секунды. Для этого используйте скрипт, который отправляет команду после получения сообщения. Хорошим триггером в скрипте является значение RSSI.

## файл определения профиля

#### Структура данных

_**case:**_ Это может быть один элемент или массив, содержащий набор полей данных. В случае массива элемент связан с условием.

_**Параметр send:**_ true означает, что данный набор данных представляет собой команду, которая будет отправлена на устройство.

_**Параметр auto\_answer:**_ true означает, что эта команда будет выполнена после получения телеграммы от устройства.

_**Условие:**_ Условие, которое должно быть выполнено для обработки данного набора полей данных. В большинстве случаев условием является конкретное значение из пакета данных.

_**Поле данных:**_ информация о том, где в пакете данных находятся данные и как обрабатывать значение. Также имеется определение объекта для ioBroker.

_**datafield -> secondArgument:**_ Используется для получения дополнительной информации/значения из пакета данных. Пример использования: Единицы измерения могут различаться, поэтому устройство отправляет единицу измерения как отдельную информацию. Для изменения единицы измерения внутри ioBroker в зависимости от отправленной информации необходимо знать это при обработке значения.

_**Поле данных -> условие:**_ Это может быть формула для преобразования значения. Основано на JSON-логике; подробную информацию см. на сайте <http://jsonlogic.com/operations.html> .

Пример:

```
//True or false
"==": [{"var": "value"}, 0]

//This will take the delivered value and check if it is equal to 0, if it is the state in iobroker will set to true.
```

_**Поле данных -> значение:**_ Это представляет собой возвращаемое значение, за исключением условия, которое является выходным значением. В этом случае значение не должно быть определено.

Пример:

```
//Temperature conversion from received data
 "+": [{
         "*": [
              { "-": [{"var": "value"}, 0] },
              0.2
            ]}, 0]

//This is a more complex looking formula.
//It is based on this one: Device Value = Multiplier * ( rawValue - Range min) + Scale min
//The Multiplier, in this case 0.2, is calculated in this way: (Scale max - Scale min) / (Range max - Range min)
```

_**datafield -> value\_out:**_ Это значение, которое будет отправлено на устройство. Его необходимо указать только в том случае, если требуется преобразование.

Пример:

```
//Temperature conversion from ioBroker
 "/": [{
         "+": [
              { "-": [{"var": "value"}, 0] },
              0
            ]}, 0.2]

//This is a more complex looking formula.
//It is based on this one: Device Value = ( ( rawValue - Range min) + Scale min ) / Multiplier
//The Multiplier, in this case 0.2, is calculated in this way: (Scale max - Scale min) / (Range max - Range min)
```

_**Поле данных -> десятичные знаки:**_ Определяет, сколько цифр после десятичной точки будет отображаться.

_**Поле данных -> единица измерения:**_ Используйте это, если единица измерения является переменной, в противном случае определите ее в iobroker.

Пример:

```
//Choose between Watt(W) and Kilowatt(kW) depending on the unit information from the device
 "unit":{
            "if": [
              {"==":[{"var": "value2"}, 3]}, "W",
              {"==":[{"var": "value2"}, 4]}, "kW"
            ]
          }

//value2 comes from secondArgument. 
```

## Определение устройства

Полная реализация устройства состоит как минимум из двух частей: записи в файле 'lib/devices/MANUFACTURER/MODEL/device.json' и файла EEP, который определяет объекты и способ обработки телеграмм данных. Файл lib/definitions/devices.js необходимо обновить в соответствии с новым устройством. Существуют устройства, которые используют более одного типа телеграмм данных для связи, что означает наличие у них нескольких файлов EEP.\
&#x20;В особых случаях, как, например, у Eltako, в файле 'packet\_handler.js' также определена часть, специфичная для конкретного производителя.

```
"Model name or type" : {
      "EEP": [                    //The EEP(s) that will be used for this device. First one has to be the one that controlls the device.
        "TF-13-07",
        "TF-13-06"
      ],
      "autocreate": false,         //false if the device needs additional steps for teachin
      "teachin_method": "none",    //filter for automated teachin telegrams
      "id_offset": true,           //not all devices checks if the telegram whether it is for them. Not applicable where teachin_method is 4BS.
      "broadcast": false,          //true if the receiver id has to be ffffffff. This is used for virtual devices like a switch.
      "help": {                    //a step by step instruction how to add the device.
        "en": {
          "1": "Enter device ID.",
          "2": "Click on 'Add Device'."
        },
        "de": {
          "1": "Geräte ID eintragen.",
          "2": "Auf 'Gerät Hinzufügen' klicken."
        }
      }
    }
```

## Для развития

Для проверки обработки Telegram создайте канал с именем development, а в этом канале — объект с именем telegram, строкового типа.

## Changelog

### 0.9.4 (2024-10-12)
* (Jey Cee) fix use gateway fgw(-14) with ser2net
* (Jey Cee) add notice to the ser2net switch 

### 0.9.1 (2023-09-01)
* (Jey Cee) added support for Eltako FKD-am
* (Jey Cee) added Afriso ASD 20
* (Jey Cee) added EEP F6-05-02
* (Jey Cee) change log level for missing /dev/serial/by-id
* (Jey Cee) change log level for initial information request on gateway
* (Holger Will) update X1-01-02.json

### 0.9.0 (2023-07-27)
* added Afriso ASD 10
* fix D2-05-00 Goto top/bottom
* catch error while update objects on adapter start
* workaround for serial port selection does not display all options

### 0.8.5 (2023-02-11)
* rework TF-13-25, fixes Eltako DSZ14 (#87)
* rework TF-13-14, SP uses now temperature range 0-40°C
* remove useless object ASC from A5-20-01
* added Afriso FT & FTF
* added R-Tronic RT B (A5-10-06 + RPS)
* added Eltako F3Z14D, FWZ14, FRGBW14, FWS81
* added new teachin telegram for FUD61NPN-230V
* added remove button to device list in config
* added profile F6-05-01
* fix F6-10-00: The close state was not set, the window was always shown as open.
* fix multiple conditions in eep's
* fix Eltako FGW14-USB does not receive status updates
* fix lastID is null when using Eltako FGW14-USB
* fix TF-01-01 TT and TTT both set on incoming telegram, only TT has to be set
* fix I1-01-01 invalid telegram send by on and off
* fix device definition Oventrop mote 420
* fix missing zeros in front of sender IDs while using FGW14
* fix incomplete data while receiving type 10 messages
* fix missing device name
* code cleanup and refactoring

[Older changelog entries are moved to changelog.md](https://github.com/jey-cee/ioBroker.enocean/blob/master/changelog.md)

## License
Attribution-NonCommercial 3.0 (CC BY-NC 3.0)

Copyright (c) 2023 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).