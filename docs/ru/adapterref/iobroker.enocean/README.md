---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enocean/README.md
title: ioBroker.enocean
hash: y/viydDLxV2KiiNnj5jhcxJRBDdNfxzPs6ESoqDTG3w=
---
![Логотип](../../../en/adapterref/iobroker.enocean/admin/enocean.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.enocean.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.enocean.svg)
![Количество установок (последних)](http://iobroker.live/badges/enocean-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/enocean-stable.svg)
![Статус зависимости](https://img.shields.io/david/jey-cee/iobroker.enocean.svg)
![НПМ](https://nodei.co/npm/iobroker.enocean.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/jey-cee/ioBroker.enocean/master.svg)

# IoBroker.enocean
## Адаптер EnOcean для ioBroker
Подключает устройства EnOcean через USB/последовательные устройства с чипами TCM300.

## Присоединяйтесь к серверу Discord, чтобы обсудить все об интеграции ioBroker-enocean!
<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [Спонсоры](./SPONSORS.md)
Если вам нравится моя работа, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвований для Jey Cee, не имеющая отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Совместимые USB-накопители и модули
USB300

USB-накопитель DOSMUNG с портом SMA

FAM-USB (прошивка ESP3)

Модуль EnOcean Pi **Важное примечание:** На Pi3 и Pi4 необходимо отключить встроенный модуль Bluetooth, иначе модуль EnOcean не будет работать!

Eltako FGW14: **Важные примечания**: Этот шлюз поддерживает не все функции и устройства этого адаптера.
Известные функции, которые не работают: RSSI, информация о шлюзе не может быть прочитана, и без FTD14 можно управлять только устройствами шины RS485 (еще не тестировалось). Если нет технических причин использовать этот шлюз, настоятельно рекомендуется использовать другой.
Устройства шины сообщают свой адрес шины, т. е. он начинается с 00 00 00 01.

ALL SMART EnOcean LAN Gateway — ~~[КУПИТЬ](https://www.all-smart.net/produkt/all-smart-enocean-lan-gateway/)~~ Больше не доступен.

ВСЕ SMART EnOcean Multi-Gateway — [КУПИТЬ](https://www.all-smart.net/produkt/all-smart-enocean-multi-gateway/)

### [Поддерживаемые устройства](./docs/devices.md)
## Устройства управления
В общем, есть объект cmd, где вы можете выбрать команду, которую хотите выполнить. Прежде чем вы сможете выполнить команду, вам необходимо установить все необходимые атрибуты. Эту информацию можно найти в определении профиля.

Особенный:

* A5-20-xx: Устройства с этим профилем принимают команды только в течение 1 секунды после отправки сообщения. Отправляют периодически (10 минут?), читайте инструкцию.

## Учить в
- Процесс документирован (краткими) пошаговыми инструкциями по настройке адаптера. Там вы можете выбрать

  ваше устройство и инструкции будут отображены. Следуйте за ними.

- Устройства без возможности обучения другому устройству (например, Eltako Series 12, также известному как Opus Green Net):

Ими можно управлять с помощью виртуального переключателя (F6-02-02): откройте конфигурацию и нажмите «Добавить новое устройство».
Теперь выберите X_Virtual в качестве производителя и Switch в качестве устройства, используйте идентификатор fffffff0. Подсчитайте последний знак от 1 до 9 и a-f для каждого нового виртуального коммутатора.
Нажмите «Добавить устройство» и закройте конфигурацию. Затем запустите обучение на своем устройстве согласно инструкции, отправьте команду с виртуального коммутатора.
Теперь вы сможете управлять устройством.

## Обучение (удаление привязки адаптера с устройства)
- Eltako Tipp-Funk: отправьте 3 раза команду обучения в течение 2 секунд с ioBroker на устройство.
- Устройства с UTE: запустите обучение адаптера и следуйте инструкциям устройства.
- RPS: просто удалите объекты
- нет: просто удалите объекты

## Поиск неисправностей
1. Устройство не реагирует на команду:
   - Процесс обучения не был успешным. В зависимости от устройства сигнализируется об успешном обучении, обратите внимание на этот сигнал. Если сигнала нет, попробуйте еще раз.
   - Проверьте, правильно ли установлены все атрибуты, связанные с CMD.
   - Если значение rssi превышает -70 дБм, сигнал может быть слишком слабым. Попробуйте переместить устройство поближе к шлюзу.
   - Приводы клапанов (термостаты) отправляют сообщение каждые x минут. После получения сообщения устройство принимает команду в течение секунды. Для этого используйте сценарий, который отправляет команду после получения сообщения. Хорошим триггером в сценарии является значение rssi.

## Файл определения профиля
#### Структура данных
***case:*** Это может быть один элемент или массив, содержащий набор полей данных. В случае массива элемент привязан к условию.

***send:*** true означает, что этот набор данных представляет собой команду, которая будет отправлена на устройство.

***auto_answer:*** true означает, что эта команда будет выполнена после получения телеграммы от устройства.

***условие:*** Условие, которое должно быть истинным, чтобы этот набор полей данных был обработан. В большинстве случаев условием является конкретное значение из пакета данных.

***поле данных:*** Информация о том, где в пакете данных находятся данные и как обрабатывать значение. Кроме того, существует определение объекта для ioBroker.

***поле данных -> второйАргумент:*** Используется для получения вторичной информации/значения из пакета данных. Вариант использования: единицы измерения могут различаться в зависимости от их количества, поэтому устройство отправляет единицы измерения как отдельную информацию.
Чтобы изменить единицу измерения внутри ioBroker в зависимости от отправленной информации, необходимо знать это при обработке значения.

***поле данных -> условие:*** Это может быть формула для преобразования значения. Это основано на JSON-логике. Подробную информацию см. на http://jsonlogic.com/operations.html.

Пример:

```
//True or false
"==": [{"var": "value"}, 0]

//This will take the delivered value and check if it is equal to 0, if it is the state in iobroker will set to true.
```

***поле данных -> значение:*** Представляет возвращаемое значение, за исключением того, что условием является выходное значение. Значение не должно определяться.

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

***поле данных -> value_out:*** представляет значение, которое будет отправлено на устройство. Это необходимо определять только в том случае, если требуется преобразование.

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

***поле данных -> десятичные числа:*** Определяет, сколько цифр после десятичной точки будет отображаться.

***поле данных -> единица измерения:*** Используйте это значение, если единица измерения является переменной, в противном случае определите ее в iobroker.

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
Полная реализация устройства состоит как минимум из двух частей: записи в lib/devices/MANUFACTURER/MODEL/device.json и файла EEP, который определяет объекты и способы обработки телеграммы данных.
Файл lib/definitions/devices.js необходимо обновить для нового устройства.
Существуют устройства, которые для связи используют более одного типа телеграмм данных, это означает, что у них больше файлов EEP.
В особых случаях, например Eltako, в package_handler.js также определена часть, специфичная для производителя.

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
Чтобы проверить обработку телеграмм, создайте канал с именем development и в этом канале объект с именем telegram, введите строку.

## Changelog

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

[Older changelog entries are moved to changelog.md](changelog.md)

## License
Attribution-NonCommercial 3.0 (CC BY-NC 3.0)

Copyright (c) 2023 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).