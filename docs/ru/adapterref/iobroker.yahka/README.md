---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: 5kS1aNzjVYFZ7GMXeZQp0GDoEU84l7z6x91GrxmtWbQ=
---
![Логотип](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![Количество установок](http://iobroker.live/badges/yahka-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.yahka.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# Iobroker.yahka
## Установка и использование
Подробную информацию об установке и настройке этого адаптера см. в разделе [Вики](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Предпосылки
Прежде чем вы сможете установить адаптер, вам необходимо установить несколько пакетов (для Linux): `sudo apt-get install libavahi-compat-libdnssd-dev`

## Установите последнюю **версию**
Просто нажмите кнопку «+» рядом с «Homekit yahka adapter» в панели администратора ioBroker на странице «Адаптер».

## Установите последнюю **Бета**
Если вы хотите быть в курсе последних событий и протестировать последнюю бета-версию, вы можете установить адаптер через URL-адрес GitHub.

(Иногда требуется дополнительная загрузка (например, `iobroker upload yahka`) и перезапуск адаптера)

## Резервное копирование и восстановление
Внимание: Чтобы иметь возможность восстановить `ioBroker.yahka` в другой системе, в дополнение к обычным `iobroker backup` и `iobroker restore`, папка `yahka.X.hapdata` в `/opt/iobroker/iobroker-data` также должна быть зарезервирована и, при необходимости, восстановлена. [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen) / [Проблема](https://github.com/jensweigele/ioBroker.yahka/issues/176)

Другим вариантом для резервного копирования и восстановления является адаптер [Резервное копирование](https://github.com/simatec/ioBroker.backitup/blob/master/README.md). Он автоматически создает резервную копию папки `yahka.X.hapdata`. Восстановление также возможно через графический интерфейс BackItUp.

Подробное описание вы можете найти [здесь](https://github.com/simatec/ioBroker.backitup/wiki/ioBroker.backitup-Wiki-Deutsch#yahka-backup).

## Поиск неисправностей
### Мост не работает или устройство не отвечает
Попробуйте изменить MAC/имя пользователя моста или активировать рекламодателя ciao.

### Не все новые функции доступны:
Если после обновления yahka не все новые функции доступны, попробуйте выполнить загрузку (например, `iob upload yahka`) и перезапустить адаптер.

### Отсутствует демон Avahi (linux)
Если в журнале обнаружена следующая ошибка:

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

Вам необходимо выполнить некоторые дополнительные шаги:

* установка демона avahi:

`sudo apt-get install avahi-daemon -y`

* Редактировать avahi-daemon.conf

`sudo nano avahi-daemon.conf `

измените следующие переменные:

```
host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### Отсутствует пакет pam-devel (linux)
Если в журнале обнаружена следующая ошибка:

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

Вам необходимо установить пакет pam-devel:

* установка демона avahi:

`sudo apt-get install pam-devel -y`

### Отсутствует бонжур (окна)
- Скачать: `https://www.samuelattard.com/files/bonjourcore2.msi`
- Выполнить: `msiexec /i bonjourcore2.msi /qn`
- удалить: `del bonjourcore2.msi`
- Скачать: `https://www.samuelattard.com/files/bonjoursdksetup.exe`
- Выполните: `bonjoursdksetup.exe /quiet`
- Удалить: `del bonjoursdksetup.exe`
- Установить: `set BONJOUR_SDK_HOME=C:\Program Files\Bonjour SDK`

И после этого установите адаптер yahka.

## Несколько слов о HomeKit
Архитектура HomeKit выглядит следующим образом:

Есть **устройства** как логические сущности. Каждое устройство может иметь несколько **сервисов**, а каждая услуга имеет несколько **характеристик**.

В конечном итоге характеристика представляет собой конечную точку, из которой можно считывать или в которую можно записывать значения.

Какие характеристики может иметь услуга, определяется Apple/HomeKit и определяется типом услуги. Типы услуг также определяются Apple/HomeKit.

Пример:

Устройство открывания гаражных ворот — это устройство, которое может выполнять две функции:

1. Устройство открывания гаражных ворот
2. Свет

Сама служба открывания гаражных ворот может иметь различные характеристики, такие как: CurrentDoorState, TargetDoorState и многие другие.

Кроме того, служба освещения может иметь различные характеристики, например: Вкл. (и многие другие для изменения цвета освещения и т. д.)

## Что делает Яхка
С помощью Yahka можно сопоставить точку данных ioBroker с характеристикой HomeKit.

Поскольку иногда необходимы сопоставления (например, значения «Состояния» гаражных ворот различаются между HomeKit и другими системами), также есть возможность указать Функции для преобразования значений. Это описано ниже.

Чтобы избежать лишней работы по администрированию, все устройства, которые вы создаете в Yahka, находятся за так называемым «мостом». С этим мостом вам нужно только соединить мост с вашим устройством iOS, чтобы получить доступ ко всем устройствам. В противном случае вам нужно будет соединить каждое устройство Yahka с Homekit.

## Настройте мост и создайте устройства и службы
Каждому устройству, которое должно быть сопряжено с Homekit, необходимо «имя пользователя», которое имеет форму mac-адреса. Yahka автоматически генерирует случайное имя пользователя для каждого экземпляра yahka.

**Важно: если вы измените имя пользователя после сопряжения Yahka с HomeKit, вам необходимо перенастроить все устройства в iOS (назначение комнаты, положение и т. д.). Изменение имени пользователя означает для iOS, что это совершенно новое устройство!**

Помимо имени пользователя, вам необходимо указать PIN-код, который необходимо ввести на устройстве iOS.
Все это можно указать, нажав на ":yahka.0" в панели администратора Yahka. (Разверните панель справа после нажатия на запись в списке). Там же можно изменить имя моста.

После настройки моста вы можете добавить нужные вам устройства с помощью кнопки «Добавить устройство» вверху.
После добавления/выбора устройства вы можете добавить службы к этому устройству.

Необходимо указать название услуги и тип услуги.

В зависимости от типа услуги список доступных характеристик меняется.

## Настройка характеристик
Если вы хотите поддержать характеристику, вам необходимо поставить галочку в поле «включено» слева от характеристики.
Для каждой характеристики вы можете указать следующие свойства:

- InOutFunction: можно указать предопределенную функцию, которая отвечает за передачу значений из HomeKit в ioBroker и наоборот.
- InOutParameter: здесь вы можете указать параметры для выбранной InOutFunction. Доступные/ожидаемые параметры зависят от выбранной функции. Ниже приведен краткий обзор функций и параметров.
- ConversionFunction: в дополнение к InOutFunction вы также можете указать функцию, которая преобразует значение, поступающее из HomeKit, в ioBroker (и наоборот)
- ConversionParameter: то же, что и InOutParameter — доступные/ожидаемые параметры зависят от выбранной функции.

## Обзор InOut-функций
| Функция | Ожидаемый параметр | Описание |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| const | Значение | Функция const всегда передает значение, указанное в "InOutParameter", в функцию преобразования, если HomeKit считывает значение. Если HomeKit хочет записать значение, это действие отклоняется |
| ioBroker.State | имя точки данных ioBroker | С помощью этой функции адаптер использует указанную точку данных ioBroker для операций чтения и записи. Все операции выполняются немедленно без буферизации или фильтрации (значения передаются указанным функциям преобразования) |
| ioBroker.State.Deferred | имя точки данных ioBroker | С помощью этой функции адаптер использует указанную точку данных ioBroker для операций чтения и записи. Операции записи из HomeKit напрямую передаются в функцию преобразования. Изменения из ioBroker отменяются в течение 150 мс — это означает, что значение передается в HomeKit только в том случае, если в течение 150 мс не произошло никаких других изменений. |
| ioBroker.State.OnlyACK | имя точки данных ioBroker | С помощью этой функции адаптер использует указанную точку данных ioBroker для операций чтения и записи. Операции записи из HomeKit напрямую передаются в функцию преобразования. Изменения из ioBroker пересылаются в HomeKit только в том случае, если установлен флаг "Acknowledged" значения. В противном случае последнее подтвержденное значение передается в HomeKit |
| ioBroker.homematic.<br> WindowCovering.TargetPosition | Идентификатор точки данных уровня HomeMatic<br> или<br> Массив строк с идентификатором точки данных уровня и идентификатором рабочей точки данных | Эта функция специально предназначена для управления HomeMatic Window Covering. Эта функция откладывает передачу значений в HomeKit во время перемещения оконного покрытия. Это необходимо для предотвращения мерцания ползунка оконного покрытия в iOS |

## Обзор функций преобразования
| Функция | Ожидаемый параметр | Описание |
|------------------------------------------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| passthrough | \<none\> | Значение из ioBroker передается в HomeKit без преобразования (и наоборот) |
| HomematicDirectionTo<br> HomekitPositionState | \<none\> | Эта функция сопоставляет перечисление direction оконного покрытия Homematic с перечислением PositionState HomeKit (и обратно) |
| HomematicControlModeTo<br> HomekitОтоплениеОхлаждениеСостояние | \<none\> | Эта функция сопоставляет перечисление ControlMode Homematic с перечислением HeathingCoolingState HomeKit (и обратно) |
| уровень255 | \<none\> | Эта функция масштабирует значение ioBroker с диапазоном значений от 0 до 255 до значения HomeKit с диапазоном значений от 0 до 100 (и обратно).<br> **Пример:** 255 в ioBroker преобразуется в 100 для HomeKit. |
| масштабInt<br> scaleFloat | `{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }` | Эта функция похожа на &quot;level255&quot;, но она более общая. Она преобразует значение ioBroker с диапазоном от &quot;iobroker.min&quot; (0, если пропущено) до &quot;iobroker.max&quot; в значение HomeKit с диапазоном значений от &quot;homekit.min&quot; (0, если пропущено) до &quot;homekit.max&quot; (и обратно).<br> **Пример:** Если поле параметра: `{ "homekit.max": 500, "iobroker.max": 250}`<br> значение ioBroker фактически умножается на 2 перед отправкой в HomeKit.<br> **Мин-параметры доступны только в версии 0.8.0 и выше** |
| hue | \<none\> | Эта функция является специализированной версией scaleInt с параметрами `iobroker.max=65535` и `homekit.max=360`. |
| hue | \<none\> | Эта функция является специализированной версией scaleInt с параметрами `iobroker.max=65535` и `homekit.max=360`. |

## Homematic Blind Actuator \ Оконные покрытия
Для интеграции активаторов жалюзи Homematic (например, HM-LC-Bl1PBU-FM) необходимы следующие настройки:

* Добавить услугу на устройство
* Установите Service Name на какое-либо имя и service type на "WindowCovering". Service subtype можно оставить пустым
* Включите и заполните следующие характеристики:

| Название характеристики | 1: Функция InOut<br> 2: Функция преобразования | 1: Параметры InOut<br> 2: Параметры преобразования |
|---------------------|---------------------------------------------------------------------------|----------------------------------------------------------------|
| Текущая позиция | 1: ioBroker.State.OnlyACK<br> 2: сквозной | 1: _\<path to homematic object\> _.1.УРОВЕНЬ<br> 2: \<empty\> |
| PositionState | 1: ioBroker.State.OnlyACK<br> 2: HomematicDirectionToHomekitPositionState | 1: _\<path to homematic object\> _.1.НАПРАВЛЕНИЕ<br> 2: \<empty\> |
| TargetPosition | 1: ioBroker.homematic.WindowCovering.TargetPosition<br> 2: сквозной | 1: _\<path to homematic object\> _.1.УРОВЕНЬ<br> 2: \<empty\> |

Значение _\<путь к объекту Homematic\>_ необходимо заменить на фактический путь к устройству (например, hm-rpc.0.NEQ0012345)

Для получения общей информации о маске конфигурации см.: TODO

Для получения дополнительной информации о конфигурации, функциях InOut и функциях преобразования см.: [Вики](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

## Заметки для разработчиков
Этот репозиторий включает один подмодуль, поэтому перед сборкой вам также необходимо закрыть/инициализировать его, например, использовать `git submodule update --init --recursive` для обновления и извлечения его содержимого.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Revert renaming of states back: `HomematicControlModeToHomekitHeatingCoolingState => HomematicControlModeToHomekitHeathingCoolingState, Deferred => Defered`

### 1.0.4 (2024-08-12)
* (Apollon77) Important: js-controller 5.0 is required at least
* (tarikweiss) Rewrote community types from submodule (js) to typescript
* (tarikweiss) Added the ability to set an ioBroker state for the availability indication in HomeKit

### 1.0.3 (2023-03-29)
* (TA2K) Corrected empty device list with rebuild

### 1.0.1 (2023-03-24)
* (foxriver76) we ensured controller 5 compatibility
* (bluefox) Formatting

### 0.17.0 (2022-10-17)
* Added AVAHI advertiser as default and updated HomeKit Library to improve performance and stability
* Update release and test scripts

### 0.14.0 (unreleased)
* (jw) added support to group devices in Admin Interface
* (jw) added support to mark services as "primary" and as "hidden"
* (jw) added ioFunctions "round" and "invert"
* (jw) updated dependencies
* (jw) Updated to HAP-NodeJS 0.9.2
* (jw) Fixed crashes due to changes in used HomeKit Library
* (nh) improved changelog in readme

### 0.13.1 (2021-01-14)
* (jw) switched to HAP-NodeJS 0.9.0-beta.113 and added useLegacyAdvertiser option
* (jw) fixed bug which prevented cameras from deletion and duplication

### 0.13.0 (2021-01-08)
* (jw) updated dependencies
* (jw) improved state selector (scrolling and refresh on open)

### 0.12.0 (2020-12-23)
* (jw) updated dependencies
* (jw) added support for linking services to support Television Services
* (jw) added possibility to publish devices without the bridge (necessary for TV service)
* (jw) added support for audio stream in camera 
* (jw) added support for custom characteristics on the services (e.g. to add Wattage characteristic to plugs) 
* (jw) added support for additional services to camera (to enable usage of doorbell service)> 
  (many20) fixed scaleInt conversion - results are now rounded

### 0.11.0 (2020-02-19)
* Intermediate release

### 0.10.0 (2020-02-19)
* (apollon77) updated dependencies, nodejs 12 support

### 0.10.0
* (jw) updated dependencies
* (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)  
* (yaming116) fixed scale conversion to support min values others than 0

### 0.9.2 (2019-03-12)
* (jw) fixed a bug where the adapter didn't start anymore
* (jw) removed the reference to the git repository of the hap community types

### 0.9.1 (2019-01-29)
* (jw) fixed a bug where the adapter crashes if a state does not exist
* (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))
* (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
* (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))

### 0.9.0 (2019-01-24)
* (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)
* (jw) improved admin interface to support individual editors for IO/Conversion functions
* (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions
* (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) 
* (jw) added ioFunction "MultiState" to get multiple states and/or separate between read and write states 
* (jw) added conversion function "map" to customize mappings between ioBroker and HomeKit 
* (jw) added possibility to specify IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86)) 
* (jw) switched to webpack and refactored admin interface and io/conversion functions 
* (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))
* (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))
* (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))
* (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))
* (jw) added support for specifying device information via data points ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))
* (SchumyHao) added Chinese support

### 0.8.2 (2018-12-09)
* (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption

### 0.8.1 (2018-12-04)
* (jw) updated dependencies
* (jw) change default name of new instances
* (foxriver76) remove excessive logging
* (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)
* (arichter83) added "Duplicate Device" functionality

### 0.7.1 (2018-02-14)
* (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore
* (jw) restructured repository to support install via url

### 0.7.0 (2018-02-01)
* (bluefox) Fixed the ID select dialog in Admin3
* (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve
* (jw) added ip-package to dependencies to avoid errors on some installations

### 0.6.1 (2018-01-25)
* (jw) fixed startup crash

### 0.6.0 (2018-01-24)
* (jw) add support for IP-Cameras
* (jw) included iOS 11 device definitions
* (jw) allowed negative temperatures for temperature sensors
* (jw) fixed crashes due to duplicate device names
* (oliverschulze) added conversion functions "hue" and "level255"
* (jw) added conversion functions scaleInt, scaleFloat and inverse
* (jw) devices are now sorted by name in the admin panel

### 0.5.5 (2017-05-08)
  (bluefox) allow select ID in configuration dialog

### 0.5.4 (2017-02-08)
* (jw) improve log output
* (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping

### 0.5.3 (2017-02-08)
* (jw) internal release

### 0.5.2 (2016-12-23)
* (jw) fixed issues with empty characteristic values
* (jw) fixed issue with empty adapter.systemConfig.system object

### 0.5.1 (2016-10-05)
* (jw) fixed issue with wrongly displayed logo

### 0.5.0 (2016-10-05)
* (jw) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2024 Jens Weigele (iobroker.yahka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.