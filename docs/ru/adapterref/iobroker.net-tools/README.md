---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.net-tools/README.md
title: ioBroker.net-tools
hash: 6R2tDpkRmj7rCzgPkl8R1XTZ+58uJYhwQ1t8e4L3MqE=
---
![Логотип](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.net-tools.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Количество установок](https://iobroker.live/badges/net-tools-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/net-tools-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)
![Тестирование и выпуск](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

# ioBroker.net-tools

## адаптер net-tools для ioBroker

Этот адаптер циклически опрашивает настроенные IP-адреса, может отправлять пакеты Wake-on-LAN и сканировать открытые порты.

Эта функция обнаружения предоставляется адаптером обнаружения, что означает, что обнаружение будет установлено, если он еще не установлен, и его необходимо запустить. Примечание: Эта функция ограничена подсетью хоста ioBroker.

### Важно: Для использования этого адаптера необходимо приобрести лицензию. Вы можете приобрести её здесь -> <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Важная информация: Для адаптеров Nutzung необходимо использовать дополнительные лицензии. Sie können eine hier kaufen -> <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Автоматическое обнаружение

Функция автоматического поиска устройств также доступна по расписанию. Примечание: если вы используете ioBroker внутри контейнера Docker, эта функция не будет работать в зависимости от конфигурации вашей сети.

### Пинг настроенных IP-адресов

Отправляет пинги на указанные IP-адреса с заданным интервалом и отслеживает результаты (активность, RPS, время). Интервал пинга можно задать на уровне устройства.

### Wake-on-LAN

Установите для объекта wol значение true, и на ваше устройство будет отправлено 3 пакета WOL с паузой в 750 мс.

### сканирование портов

В конфигурации можно указать список портов или диапазон, которые должны сканироваться по умолчанию. Если это поле пустое, по умолчанию будет использоваться диапазон 0-65535. Также можно указать список или диапазон для каждого устройства, который будет использоваться для одного сканирования.

При желании укажите список или диапазон портов в объекте portList. Это переопределит настройку в файле config. Установите параметр scan в значение true, и система просканирует все открытые порты в диапазоне 0-65535 или в соответствии с параметрами, заданными в portList. Этот процесс займет некоторое время. Результат будет записан в объект ports.

---

### iPhone

В iPhone при изменении MAC-адреса предпринимаются попытки защитить пользователей от отслеживания. Подробнее об этом и о том, как отключить эту функцию для частных сетей, читайте здесь: <https://support.apple.com/en-us/102509>

---

## Для разработчиков

#### Получите Mac для конкретного устройства

`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Примечание: Эта функция доступна только в подсети хоста ioBroker.

#### Пинг конкретного IP-адреса

`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake-on-LAN

`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.3 (2025-11-09)
* Change link to license

### 1.2.2 (2025-11-09)
* Fix ip and mac check while add manual new device

### 1.2.1 (2025-11-09)
* Refactor port scan

### 1.2.0 (2025-06-11)
* Added network interface information for localhost to device manager

### 1.1.3 (2025-06-05)
* Fix out of memory while scanning

### 1.1.2 (2025-04-21)
* (Jey Cee) Add meta object object for instance to store device pictures from device manager
* (Jey Cee) Fix repository checker errors

### 1.1.1 (2025-03-13)
* (Jey Cee) Fix "Cannot read properties of undefined (reading 'find')"

### 1.1.0 (2025-02-04)
* (Jey Cee) New feature ignore list for autodiscovery
* (Jey Cee) New feature Wake-on-LAN with IP for devices on other subnets
* (Jey Cee) Optimize config for better responsive behavior
* (Jey Cee) Sync license key on all instance configurations if a key was already entered in one instance configuration
* (Jey Cee) Moved translations from configuration interface to i18n files
* (Jey Cee) Update dependencies
* (Jey Cee) Fix some stuff that was mentoined by adapter checker

### 1.0.11 27.03.2024
* (Jey Cee) Fix high CPU load while running discovering devices

### 1.0.9 19.03.2024
* (Jey Cee) Fix unexpected stop of discovery

### 1.0.6 04.03.2024
* (Jey Cee) Reduce system load during discovery process to prevent adapter crash

### 1.0.5 04.02.2024
* (Jey Cee) remove discovery adapter as dependency
* (Jey Cee) add possibility to choose the interface which will be used for ping operations
* (Jey Cee) add possibility to enter IP range for device discovery
* (Jey Cee) add auto search by configurable schedule
* (Jey Cee) fix/catch crash if device was deleted in objects and not in device management
* (Jey Cee) fix ping rights on lxc containers which prevent to ping devices

### 1.0.2 20.01.2024
* (Jey Cee) bugfix require

### 1.0.1 19.01.2024
* (Jey Cee) add device manager to configuration
* (Jey Cee) add use of license

[Older changelogs can be found there](https://github.com/Jey-Cee/ioBroker.net-tools/blob/master/CHANGELOG_OLD.md)

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2025-2026 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).