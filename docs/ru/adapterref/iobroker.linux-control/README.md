---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.linux-control/README.md
title: ioBroker.linux-control
hash: 4OAFdJPUvwnqs54swKDBI/2TA0hF6FiD0QjY3+lPw6I=
---
![Логотип](../../../en/adapterref/iobroker.linux-control/admin/linux-control.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.linux-control.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.linux-control.svg)
![Количество установок (последние)](http://iobroker.live/badges/linux-control-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/linux-control-stable.svg)
![Статус зависимости](https://img.shields.io/david/Scrounger/iobroker.linux-control.svg)
![Известные уязвимости](https://snyk.io/test/github/Scrounger/ioBroker.linux-control/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.linux-control.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Scrounger/ioBroker.linux-control/master.svg)

# IoBroker.linux-control
## Адаптер управления Linux для ioBroker
[![[paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

Управление устройствами Linux и получение информации о вашей системе.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Конфигурация
### Общий
![Общий](../../../en/adapterref/iobroker.linux-control/docs/en/img/general.png)

|настройка|описание|
|-------|-----------|
|enabled|Включено или отключено обновление хоста|
|идентификатор точки данных|идентификатор, под которым должны храниться все точки данных|
|IP|IP-адрес вашего устройства Linux|
|Порт|SSH-порт вашего Linux-устройства|
|Интервал опроса|Интервал опроса в минутах.<br> Чтобы отключить опрос, можно использовать значение «0» или оставить поле пустым. |
|пользователь|пользователь ssh для входа|
|password / passpharse|Пароль SSH для входа или парольная фраза, если вы используете ключ RSA|
|использовать Sudo| с помощью sudo |
|Устаревший SSH|Включить устаревшие алгоритмы обмена ключами и шифрования SSH (например, `diffie-hellman-group1-sha1`, `3des-cbc`, `ssh-rsa`) для более старых устройств/коммутаторов|
|Ключ RSA| Путь и имя файла вашего ключа RSA. Права доступа должны быть предоставлены!|
|таймаут|таймаут соединения|

### Точки данных
![Точки данных](../../../en/adapterref/iobroker.linux-control/docs/en/img/datapoints.gif)

Адаптер создает предопределенные точки данных с информацией и возможностью управления устройством Linux. Их можно выбрать здесь.
Кроме того, для каждого отдельного хоста отдельные точки данных или целые каналы можно перетащить в черный список, чтобы они не создавались для данного хоста.

Обратите внимание: если вы хотите добавить весь канал в черный список, необходимо перетащить узел канала в черный список. Только после этого весь канал будет игнорироваться — см. скриншот ниже:

![Точки данных](../../../en/adapterref/iobroker.linux-control/docs/en/img/all_to_blacklist.gif)

**В связи с большим количеством различных дистрибутивов Linux эта функция протестирована только на Debian 10 и Ubuntu 18/20 LTS!**

### Услуги
![Услуги](../../../en/adapterref/iobroker.linux-control/docs/en/img/services.png)

Если активирована функция получения информации о службах в рамках точек данных, здесь можно указать для каждого хоста, для каких служб следует получать только информацию.

**В связи с большим количеством различных дистрибутивов Linux эта функция протестирована только на Debian 10 и Ubuntu 18/20 LTS!**

### Папки
![Папки](../../../en/adapterref/iobroker.linux-control/docs/en/img/folders.png)

Здесь вы можете получить информацию о размере папок, количестве файлов, содержащихся в этих папках, и метке времени последнего изменения в этой папке.

**В связи с большим количеством различных дистрибутивов Linux эта функция протестирована только на Debian 10 и Ubuntu 18/20 LTS!**

|настройка|описание|
|-------|-----------|
|enabled|Включено или отключено обновление папки|
|Хост|Хост, который следует использовать|
|идентификатор точки данных|идентификатор, под которым должны храниться все точки данных|
|Путь|путь к папке|
|шаблон имени файла|шаблон для имен файлов, которые должны быть распознаны.|
|Единица|Единица измерения размера|
|десятичные знаки|десятичные знаки|
|количество файлов|создать точку данных для подсчета файлов|
|последнее изменение|создать точку данных для метки времени последнего изменения в этой папке|

### Мои команды
![Пользовательские команды](../../../en/adapterref/iobroker.linux-control/docs/en/img/myCommands.png)

Здесь можно определить индивидуальные команды и затем записать их в заданные вами точки данных.
Важно, чтобы полученные данные передавались в правильном типе! Затем этот тип необходимо соответствующим образом настроить.

|настройка|описание|
|-------|-----------|
|enabled|Включено или отключено обновление команды|
|Хост|Хост, который следует использовать|
|идентификатор точки данных|идентификатор, под которым должны храниться точки данных|
|Интервал опроса|Различный интервал опроса в секундах только для команды. Для отключения используйте `0` или оставьте поле пустым, тогда будет использоваться интервал опроса с хоста. |
|команда|команда, которую следует использовать<br><br> Если вы используете пользователя, которому требуется `sudo`, то вам необходимо добавить `sudo -S` к вашей собственной команде! |
|команда|команда, которую следует использовать<br><br> Если вы используете пользователя, которому требуется `sudo`, то вам необходимо добавить `sudo -S` к своей команде! |
|тип|тип точки данных|
|единица|единица измерения точки данных|

## Известные проблемы
* Если подключение к вашему Linux-клиенту не удается, проверьте, правильно ли установлен на клиенте пакет `iputils-ping`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
* (meistermopper) add optional legacy SSH algorithms support for older devices (closes #90)
* (meistermopper) add Biome linter, `npm run test:local` workflow and align with harvia-fenix quality standard
* (meistermopper) fix invalid common.states type for `command.host` object
* (meistermopper) update dependencies, adminUI configuration and repochecker compliance

### 1.1.6 (2022-09-06)
* (Scrounger) global interval for update informations added
* (Scrounger) fix invalid object host

### 1.1.6 (2026-07-23)
* (meistermopper) Improved timer resource cleanup on unload using adapter-core safe timeouts
* (meistermopper) Enforced state ack handling filter in onStateChange
* (meistermopper) Added legacy SSH key exchange and cipher algorithm support

### 1.1.5 (2022-05-03)
* (Scrounger) Dependencies updated

### 1.1.4 (2021-12-18)
* (Scrounger) always create my command datapoint

### 1.1.3 (2021-10-04)
* (Scrounger) show warn message if permission denied
* (xCruziX) preformance improvment

### 1.1.2 (2021-01-08)
* (Scrounger) show error if user is not in sudoers file
* (Scrounger) bug fix if response has no result optimized
* (Scrounger) myCommands: bug fix sudo is no longer mandatory

Older changelogs can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2020-2026 Scrounger <scrounger@gmx.net>

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