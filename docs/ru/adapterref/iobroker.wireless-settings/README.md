---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wireless-settings/README.md
title: ioBroker.wireless-settings
hash: zSAWcaG2UiXMtmzLDrhD8+mBgQxOlaYOW/2HfpXdz2E=
---
![Логотип](../../../en/adapterref/iobroker.wireless-settings/admin/wireless-settings.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.telemetry.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.telemetry.svg)
![Количество установок (последние)](http://iobroker.live/badges/wireless-settings-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/wireless-settings-stable.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)

# IoBroker.wireless-settings
## Адаптер для настройки Wi-Fi и Ethernet на Raspberry Pi / Linux
Эта версия позволяет настраивать сетевые интерфейсы, управляемые NetworkManager.

### Поддерживаемые функции
- Подключение и отключение от сетей Wi-Fi
- Отображение текущей информации об интерфейсе (IPv4/IPv6, шлюз, DNS)
- Изменение настроек Ethernet IPv4
- Изменение настроек IPv4 активных профилей Wi-Fi
- Переключение между DHCP и статической конфигурацией IPv4
- Настройка маски/префикса подсети, шлюза и DNS-серверов.

**Проверенная логика основана на `nmcli` / NetworkManager.**

## Необходимые разрешения
Данный адаптер предполагает, что пользователь `iobroker` может выполнить следующую команду:

- `/usr/bin/nmcli`

Добавить права можно, вызвав:

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

## Примечания
— Применение новых сетевых настроек может на короткое время прервать текущее подключение администратора.
— При изменении IP-адреса устройства повторно откройте административную панель ioBroker, указав новый адрес.
- Для интерфейсов Ethernet, для которых отсутствует профиль, адаптер автоматически создает отдельный профиль NetworkManager.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 1.2.2 (2026-04-19)

- Detect docker

### 1.2.1 (2026-04-19)

- Added editable Ethernet and IPv4 settings in the Admin UI
- Added DHCP/static IPv4 switching with subnet, gateway and DNS handling
- Improved command execution by using argument-based process calls instead of raw shell strings
- Migrated GUI to vite

### 1.0.2 (2024-10-04)

- (@GermanBluefox) Updated for raspberry 5
- (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

- (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

- (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

- (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

- (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

- (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2026 @GermanBluefox <dogafox@gmail.com>

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