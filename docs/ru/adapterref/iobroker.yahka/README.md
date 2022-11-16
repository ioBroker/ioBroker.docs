---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: yomG4y/Sjkfg98dRYlugZUYP4SrmYntEO3ea8zNuKSs=
---
![Логотип](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![Количество установок](http://iobroker.live/badges/yahka-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.yahka.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

#iobroker.yahka
## Установка и использование
Подробнее об установке и настройке этого адаптера см. в [Вики](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Предпосылки
Прежде чем вы сможете установить адаптер, вам необходимо установить несколько пакетов (для Linux): `sudo apt-get install libavahi-compat-libdnssd-dev`

## Установите последнюю **выпуск**
Просто нажмите кнопку «+» рядом с «Адаптер Homekit yahka» в панели администратора ioBroker на странице «Адаптер».

## Установите последнюю **бета-версию**
Если вы хотите быть в курсе последних событий и протестировать последнюю бета-версию, вы можете установить адаптер через URL-адрес GitHub.

(Иногда требуется дополнительная загрузка (например, `iobroker upload yahka`) и перезапуск адаптера)

## Резервное восстановление
Внимание: Чтобы иметь возможность восстановить `ioBroker.yahka` в другой системе, в дополнение к обычным `iobroker backup` и `iobroker restore` также необходимо сделать резервную копию папки `yahka.X.hapdata` в `/opt/iobroker/iobroker-data` и, при необходимости, реставрируется. [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen) / [Выпуск](https://github.com/jensweigele/ioBroker.yahka/issues/176)

## Исправление проблем
### Доступны не все новые функции:
Если после обновления yahka доступны не все новые функции, попробуйте выполнить загрузку (например, `iob upload yahka`) и перезапустите адаптер.

### Отсутствует демон Avahi (linux)
Если у вас есть следующая ошибка в журнале:

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

Вы должны сделать несколько дополнительных шагов:

* установить демон avahi:

`sudo apt-get install avahi-daemon -y`

* Редактировать avahi-daemon.conf

`sudo nano avahi-daemon.conf `

изменить следующие переменные:

```
host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### Отсутствует пакет pam-devel (linux)
Если у вас есть следующая ошибка в журнале:

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

Вы должны установить пакет pam-devel:

* установить демон avahi:

`sudo apt-get install pam-devel -y`

### Отсутствует bonjour (windows)
- Скачать: `https://www.samuelattard.com/files/bonjourcore2.msi`
- Выполнить: `msiexec/i bonjourcore2.msi/qn`
- удалить: `del bonjourcore2.msi`
- Скачать: `https://www.samuelattard.com/files/bonjoursdksetup.exe`
- Выполнить: `bonjoursdksetup.exe /quiet`
- Удалить: `del bonjoursdksetup.exe`
- Установить: `set BONJOUR_SDK_HOME=C:\Program Files\Bonjour SDK`

И после этого установить адаптер yahka.

## Несколько слов о HomeKit
Архитектура HomeKit выглядит следующим образом:<br> Есть **устройства** как логические объекты. Каждое устройство может иметь несколько **служб**, и каждая служба имеет несколько **характеристик**.<br> В конце концов, характеристика — это конечная точка, из которой можно считывать или записывать значения.<br> Какие характеристики может иметь служба, определяются Apple/HomeKit и определяются типом службы. Типы служб также определяются Apple/HomeKit.

Пример:<br> Устройство открывания гаражных ворот — это устройство, которое может выполнять две функции:<br>

1. Устройство открывания гаражных ворот
2. Свет

Сама служба открывания гаражных ворот может иметь различные характеристики, например: CurrentDoorState, TargetDoorState и многие другие.<br> Кроме того, Light Service может иметь различные характеристики, такие как: On (и многие другие для изменения цвета света и т. д.)

## Что делает Яхка
С помощью Yahka можно сопоставить точку данных ioBroker с характеристикой HomeKit.<br> Поскольку иногда необходимы сопоставления (например, значения «Состояние» гаражных ворот различаются между HomeKit и другими системами), также существует возможность указать Функции для преобразования значений. Это описано ниже.

Чтобы избежать слишком большой работы по администрированию, все Устройства, которые вы создаете в Yahka, находятся за так называемым «Мостом». С этим мостом вам нужно только соединить мост с вашим устройством iOS, чтобы получить доступ ко всем устройствам. В противном случае вам потребуется выполнить сопряжение каждого устройства Yahka с Homekit.

## Настройте мост и создайте устройства и службы
Каждому устройству, которое должно быть сопряжено с Homekit, требуется «имя пользователя», которое имеет форму mac-адреса. Yahka автоматически генерирует случайное имя пользователя для каждого экземпляра yahka.

**Важно: если вы измените имя пользователя после сопряжения Yahka с HomeKit, вам необходимо перенастроить все устройства в iOS (назначение комнаты, положение и т. д.). Изменение имени пользователя означает для iOS, что это совершенно новое устройство!**

Помимо имени пользователя необходимо указать PIN-код, который необходимо ввести на устройстве iOS.
Все это можно указать, нажав «:yahka.0» в панели администратора Yahka. (Разверните панель справа после нажатия на запись в списке). Там же могло быть изменено и название моста.

После настройки моста вы можете добавить понравившиеся устройства с помощью кнопки «Добавить устройство» вверху.
После того, как устройство добавлено/выбрано, вы можете добавить службы к этому устройству.

Необходимо указать имя службы и тип службы.

В зависимости от типа услуги меняется список доступных характеристик.

## Настройка характеристик
Если вы хотите поддерживать какую-либо характеристику, вам необходимо установить флажок «включено» в левой части характеристики.
Для каждой характеристики можно указать следующие свойства:

- InOutFunction: вы можете указать предопределенную функцию, которая отвечает за передачу значений из HomeKit в ioBroker и наоборот.
- InOutParameter: здесь вы можете указать параметры для выбранной InOutFunction. Доступные/ожидаемые параметры зависят от выбранной функции. Краткий обзор функций и параметров приведен ниже.
- ConversionFunction: в дополнение к InOutFunction вы также можете указать функцию, которая преобразует значение, поступающее из HomeKit в ioBroker (и наоборот)
- ConversionParameter: то же, что и InOutParameter - доступные/ожидаемые параметры зависят от выбранной функции.

## Обзор функций InOut
|Функция|Ожидаемый параметр|Описание|
|---|---|---|

|const|Value|Константная функция всегда передает значение, указанное в «InOutParameter», в функцию преобразования, если HomeKit считывает значение. Если HomeKit хочет записать значение, это действие будет отклонено.

|ioBroker.State|имя точки данных ioBroker|С помощью этой функции адаптер использует указанную точку данных ioBroker для операций чтения и записи. Все операции выполняются сразу, без буферизации и фильтрации (значения передаются в указанные функции преобразования)|
|ioBroker.State.Defered|имя точки данных ioBroker|С помощью этой функции адаптер использует указанную точку данных ioBroker для операций чтения и записи. Операции записи из HomeKit напрямую передаются в функцию преобразования. Изменения от ioBroker отклоняются в течение 150 мс — это означает, что значение передается в HomeKit только в том случае, если в течение 150 мс не произошло никаких других изменений. |
|ioBroker.State.OnlyACK|имя точки данных ioBroker|С помощью этой функции адаптер использует указанную точку данных ioBroker для операций чтения и записи. Операции записи из HomeKit напрямую передаются в функцию преобразования. Изменения от ioBroker пересылаются в HomeKit только в том случае, если для значения установлен флаг «Подтверждено». В противном случае в HomeKit| передается последнее подтвержденное значение. |
|ioBroker.homematic.<br> WindowCovering.TargetPosition|Идентификатор точки данных уровня HomeMatic<br> или же<br> Строковый массив с идентификатором точки данных уровня и идентификатором рабочей точки данных | Эта функция предназначена специально для управления покрытием окна HomeMatic. Эта функция откладывает передачу значений в HomeKit во время перемещения оконного покрытия. Это необходимо, чтобы избежать мерцания ползунка закрытия окна в iOS |

## Обзор функций преобразования
|Функция|Ожидаемый параметр|Описание|
|---|---|---|

|passthrough|\<none\>|Значение от ioBroker передается в HomeKit без преобразования (и наоборот)

|HomematicDirectionTo<br> HomekitPositionState|\<none\> |Эта функция сопоставляет перечисление направления покрытия окна Homematic с перечислением PositionState HomeKit (и обратно)|
|HomematicControlModeTo<br> HomekitHeathingCoolingState|\<none\> |Эта функция сопоставляет перечисление ControlMode Homematic с перечислением HeathingCoolingState HomeKit (и обратно) |
|масштабИнт<br> scaleFloat|`{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }`|Эта функция похожа на «level255», но более общая. Он преобразует значение ioBroker с диапазоном от «iobroker.min» (0, если опущено) до «iobroker.max» в значение HomeKit с диапазоном значений от «homekit.min» (0, если опущено) до «homekit.max». (и назад).<br> **Пример:** Если поле параметра: `{ "homekit.max": 500, "iobroker.max": 250}`<br> фактически значение ioBroker умножается на 2 перед отправкой в HomeKit.<br> **Параметры min доступны только в версии 0.8.0 и выше**|
|inverse|number|Эта функция используется для «инвертирования» значения из ioBroker. В параметре указано максимальное значение в ioBroker. Формула: `Parameter - value`<br> **Пример:** Если поле параметра имеет вид `100`, значение 100 от ioBroker отправляется как 0 в HomeKit, значение 80 отправляется как 20 в HomeKit и т. д. |
|hue|\<none\>|Эта функция является специализированной версией scaleInt с параметрами `iobroker.max=65535` и `homekit.max=360`.|
|hue|\<none\>|Эта функция является специализированной версией scaleInt с параметрами `iobroker.max=65535` и `homekit.max=360`.|

## Привод для жалюзи Homematic \ Оконное покрытие
Для интеграции приводов жалюзи Homematic (таких как HM-LC-Bl1PBU-FM) необходимы следующие настройки:

* Добавить услугу на устройство
* Установите имя службы на какое-либо имя и тип службы на "WindowCovering". Подтип услуги можно оставить пустым
* Включите и заполните следующие характеристики:

|Имя характеристики|1: Функция InOut<br> 2: Функция преобразования|1: Параметры входа/выхода<br> 2: Параметры преобразования|
|---|---|---|
|Текущая позиция| 1: ioBroker.State.OnlyACK<br> 2: сквозной | 1: _\<path to homematic object\> _.1.УРОВЕНЬ<br> 2: \<empty\> |
|СостояниеПозиции | 1: ioBroker.State.OnlyACK<br> 2: HomematicDirectionToHomekitPositionState| 1: _\<path to homematic object\> _.1.НАПРАВЛЕНИЕ<br> 2: \<empty\> |
|целевая позиция | 1: ioBroker.homematic.WindowCovering.TargetPosition<br> 2: сквозной | 1: _\<path to homematic object\> _.1.УРОВЕНЬ<br> 2: \<empty\> |

Значение _\<путь к объекту Homematic\>_ необходимо заменить фактическим путем к устройству (например, hm-rpc.0.NEQ0012345).

Общие сведения о маске конфигурации см. в TODO.<br> Для получения дополнительной информации о конфигурации, функциях входа и выхода и функциях преобразования см.: [Вики](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog

### 0.17.0 (2022-10-17)
  Added AVAHI advertiser as default and updated HomeKit Library to improve performance and stability
  Update release and test scripts

### 0.14.0 (unreleased)
  (jw) added support to group devices in Admin Interface<br>
  (jw) added support to mark services as "primary" and as "hidden"<br>
  (jw) added ioFunctions "round" and "invert"<br>
  (jw) updated dependencies<br>
  (jw) Updated to HAP-NodeJS 0.9.2<br>
  (jw) Fixed crashes due to changes in used HomeKit Library<br>
  (nh) improved changelog in readme<br>

### 0.13.1 (2021-01-14)
  (jw) switched to HAP-NodeJS 0.9.0-beta.113 and added useLegacyAdvertiser option<br>
  (jw) fixed bug which prevented cameras from deletion and duplication<br>

### 0.13.0 (2021-01-08)
  (jw) updated dependencies<br>
  (jw) improved state selector (scrolling and refresh on open)<br>

### 0.12.0 (2020-12-23)
  (jw) updated dependencies<br>
  (jw) added support for linking services to support Television Services<br> 
  (jw) added possibility to publish devices without the bridge (necessary for TV service)<br> 
  (jw) added support for audio stream in camera<br> 
  (jw) added support for custom characteristics on the services (e.g. to add Wattage characteristic to plugs)<br> 
  (jw) added support for additonal services to camera (to enable usage of doorbell service)<br> 
  (many20) fixed scaleInt conversion - results are now rounded<br> 
  
### 0.11.0 (2020-02-19)
  Intermediate release<br>

### 0.10.0 (2020-02-19)
  (apollon77) updated dependencies, nodejs 12 support<br>

### 0.10.0
  (jw) updated dependencies<br>
  (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)<br>  
  (yaming116) fixed scale conversion to support min values others than 0<br>

### 0.9.2 (2019-03-12)
  (jw) fixed a bug where the adapter didn't start anymore<br>
  (jw) removed the reference to the git repository of the hap community types<br>

### 0.9.1 (2019-01-29)
  (jw) fixed a bug where the adapter crashes if a state does not exist<br>
  (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))<br>
  (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
  (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))<br>

### 0.9.0 (2019-01-24)
  (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)<br>
  (jw) improved admin interface to support individual editors for IO/Conversion functions<br>
  (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions<br>
  (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) <br>
  (jw) added ioFunction "MultiState" to get multiple states and/or seperate between read and write states <br>
  (jw) added conversion function "map" to customize mappings betwen ioBroker and HomeKit <br>
  (jw) added possibility to specifiy IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86))<br> 
  (jw) switched to webpack and refactored admin interface and io/conversion functions <br>
  (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))<br>
  (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))<br>
  (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))<br>
  (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))<br>
  (jw) added support for specifiyng device information via datapoints ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))<br>
  (SchumyHao) added Chinese support
  
### 0.8.2 (2018-12-09)
  (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption<br>

### 0.8.1 (2018-12-04)
  (jw) updated dependencies<br>
  (jw) change default name of new instances<br>
  (foxriver76) remove excessive logging<br>
  (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)<br>
  (arichter83) added "Duplicate Device" functionality<br>

### 0.7.1 (2018-02-14)
  (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore<br>
  (jw) restructured repository to support install via url<br>

### 0.7.0 (2018-02-01)
  (bluefox) Fixed the ID select dialog in Admin3<br>
  (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve<br>
  (jw) added ip-package to dependencies to avoid errors on some installations<br>

### 0.6.1 (2018-01-25)
  (jw) fixed startup crash<br>

### 0.6.0 (2018-01-24)
  (jw) add support for IP-Cameras<br>
  (jw) included iOS 11 device definitions<br>
  (jw) allowed negative temperatures for temperature sensors<br>
  (jw) fixed crashes due to duplicate device names<br>
  (oliverschulze) added conversion functions "hue" and "level255"<br>
  (jw) added conversion functions scaleInt, scaleFloat and inverse<br>
  (jw) devices are now sorted by name in the admin panel<br>

### 0.5.5 (2017-05-08)
  (bluefox) allow select ID in configuration dialog<br>

### 0.5.4 (2017-02-08)
  (jw) improve logoutput<br>
  (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping<br>

### 0.5.3 (2017-02-08)
  (jw) internal release<br>

### 0.5.2 (2016-12-23)
  (jw) fixed issues with empty characteristic values<br>
  (jw) fixed issue with empty adapter.systemConfig.system object<br>

### 0.5.1 (2016-10-05)
  (jw) fixed issue with wrongly displayed logo<br>

### 0.5.0 (2016-10-05)
  (jw) initial release<br>

## License
The MIT License (MIT)

Copyright (c) 2016-2022 Jens Weigele (iobroker.yahka@gmail.com)

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