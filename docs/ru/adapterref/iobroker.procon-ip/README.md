---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: QkhH6qFpl+fwsn0v+WwUtamC4pIlVNf10o9cSpzX+cU=
---
![Логотип](../../../en/adapterref/iobroker.procon-ip/admin/iobroker-procon-ip.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![Установки](http://iobroker.live/badges/procon-ip-installed.svg)
![Известные уязвимости](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

# IoBroker.procon-ip
[![Тестирование и выпуск] (https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

## Адаптер управления пулом ProCon.IP для ioBroker
Адаптер ioBroker для базовой поддержки блока управления бассейном ProCon.IP. Он предназначен для интеграции с вашей домашней автоматизацией ioBroker, например.
для построения логики, включающей другие устройства, или просто для сопряжения с вашими любимыми голосовыми помощниками:

* Вы можете использовать [_cloud_](https://github.com/ioBroker/ioBroker.cloud) или

[_IoT_](https://github.com/ioBroker/ioBroker.iot) адаптер для Alexa (а также Google Home, я думаю) и

* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) как мост к

  Apple HomeKit будет доступен Siri или

* используйте [_javascript_](https://github.com/ioBroker/ioBroker.javascript) для

  построить свою собственную пользовательскую логику.

Дополнительную информацию см. в [вики](https://github.com/ylabonte/ioBroker.procon-ip/wiki).

### Что такое управление пулом ProCon.IP?
![Изображение с сайта pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

Блок управления бассейном ProCon.IP — это недорогой блок управления с сетевым подключением для домашних бассейнов. С помощью реле с программным переключением он может управлять несколькими насосами (для фильтра бассейна и различных аспектов дозирования), либо просто планируя их по расписанию, либо в зависимости от показаний/значений одного из многочисленных входных каналов для измерений (например, расхода в/в). датчиков, термометров Dallas 1-Wire, окислительно-восстановительных и рН-электродов). По крайней мере, есть также возможность переключать эти реле по запросу, что делает их также применимыми для включения/выключения света (или чего-либо еще, что вы хотите).
Не все его функции доступны через API. На самом деле существует один задокументированный API для чтения (опроса) значений в формате CSV (`/GetState.csv`). В моей памяти был еще один для включения/выключения реле и включения с таймером. Но я не могу найти второй больше. Так что даже не красиво, но функционально: ProCon.IP имеет два родных веб-интерфейса, которые можно анализировать, чтобы перепроектировать заданную функциональность (например, переключение реле).

Для получения дополнительной информации см. следующую ссылку (извините, это только на немецком языке, пока не нашел документацию/информацию на английском языке):

* [Интернет-магазин pooldigital.de] (https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [форум pooldigital.de](http://forum.pooldigital.de/)

**Просто для ясности: я не имею никакого отношения к разработке, продажам, маркетингу или поддержке блока управления пулом. Я только что разработал решение для интеграции с ioBroker, чтобы сделать дом моих родителей немного умнее.**

### Подробности об адаптере
Адаптер использует `/GetState.csv` API ProCon.IP для опроса своих значений и другой недокументированный API, который работает с побитовыми командами для переключения реле. Второй также используется оригинальными веб-интерфейсами ProCon.IP. Так что в будущем могут быть обновления прошивки, тормозящие совместимость с этим адаптером или, по крайней мере, функциональность переключения реле.

#### Совместимость
На данный момент адаптер протестирован и разработан в сочетании с прошивкой ProCon.IP **редакция 1.7.0.c**.

## Дорожная карта
Ничего особенного в плане нет. Вы можете создать задачу, чтобы предложить новые функции/функции...

## Развитие и участие
Не стесняйтесь обращаться ко мне, если вы хотите принять участие в разработке или документировании этого адаптера.

Полезные ссылки для подхода будут

* [Шаблон адаптера TypeScript] (https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  Я начал с и

* [руководство для разработчиков адаптеров](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Changelog

### Release v1.2.3
Dependency updates.

### Release v1.2.2
Dependency updates.

### Release v1.2.1
Bugfix release:
* Fix connection problem (see [related issue](https://github.com/ylabonte/ioBroker.procon-ip/issues/29))

### Release v1.2.0
Minor release:
* Update `procon-ip` API library package to v1.3.2  
  (should fix a bug that let the relay switching fail).
* Fix minor issues that occur with invalid controller URLs.
* Update further dependencies.

### ~~Release v1.1.3~~
Skipped.

### ~~Release v1.1.2~~
Release skipped, because it failed in integration tests.

### Release v1.1.1
Minor release:
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies

### ~~Release v1.1.0~~
Release skipped.

### Release v1.0.2
Minor update (was accidentally released as patch, regarding the version number):
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 
**All point should reduce issues regarding irregular network disruptions.**

### Release v1.0.1
Hotfix release:
* Fix Object State updates  
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### Release v1.0.0
Official release in ioBroker adapter repository:  
The most exciting change with this release is, that it's available from the
ioBroker adapter repository. Hence you can just install it, without copy/
pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### Release v0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### Release v0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### Release v0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### Release v0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### Release v0.1.1
Security update:
* Update vulnerable eslint-utils

### Release v0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature
      sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as
      `smartType` _LIGHT_ 

### Release v0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### Release v0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### Release v0.0.2
Bugfix release:
* Fix sys info state values

### Release v0.0.1
Initial release with following features:
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off

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

Copyright (c) 2021 Yannic Labonte <yannic.labonte@gmail.com>