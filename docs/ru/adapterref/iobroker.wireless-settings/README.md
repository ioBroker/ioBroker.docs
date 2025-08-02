---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wireless-settings/README.md
title: ioBroker.беспроводные-настройки
hash: euDLn4ru6fnpTRHbcoQY/Rf6AFzU4lqb6Kjx03Q3iG0=
---
![Логотип](../../../en/adapterref/iobroker.wireless-settings/admin/wireless-settings.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.telemetry.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.telemetry.svg)
![Количество установок (последнее)](http://iobroker.live/badges/wireless-settings-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wireless-settings-stable.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)

# IoBroker.wireless-настройки
## Адаптер для Wi-Fi и настройки беспроводной сети на Raspberry Pi
Этот адаптер может настроить беспроводную связь на Raspberry Pi. Его можно использовать для подключения или отключения от беспроводных сетей.

**Протестировано только на Raspberry Pi 5**

## Требуемые разрешения
Этот адаптер предполагает, что пользователь `iobroker` может выполнять следующие команды:

- `/usr/bin/nmcli`

Добавить права можно по телефону:

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### **WORK IN PROGRESS**

-   (@GermanBluefox) Small layout changes

### 1.0.2 (2024-10-04)

-   (@GermanBluefox) Updated for raspberry 5
-   (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

-   (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

-   (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

-   (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

-   (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

-   (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2024 @GermanBluefox <dogafox@gmail.com>

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