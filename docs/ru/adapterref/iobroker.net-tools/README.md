---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.net-tools/README.md
title: ioBroker.net-инструменты
hash: aywaAn2IRpd3JJOaTlGfgxStQY9zTrvOOPPb/jdf4TQ=
---
![Логотип](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.net-tools.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Количество установок](https://iobroker.live/badges/net-tools-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/net-tools-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

# IoBroker.net-инструменты
**Тесты:** ![Тестирование и выпуск](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

## Адаптер net-tools для ioBroker
Этот адаптер циклически опрашивает настроенные IP-адреса, может отправлять пакеты пробуждения по локальной сети и сканировать открытые порты.

Эта функция обнаружения предоставляется адаптером обнаружения, что означает, что обнаружение будет установлено, если оно не установлено, и его необходимо запустить.
Примечание. Эта функция ограничена подсетью хоста ioBroker.

### Важно: для использования этого адаптера необходимо приобрести лицензию. Вы можете купить его здесь -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/
### Wichtig: Для адаптеров Nutzung dies müssen Sie eine Lizenz erwerben. Sie können eine hier kaufen -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/
### Автоматическое обнаружение
Существует функция автоматического поиска устройств. Также возможно выполнить его по расписанию.
Примечание. Если вы используете ioBroker в Docker-контейнере, эта функция не будет работать в зависимости от конфигурации вашей сети.

### Проверяет настроенные IP-адреса
Проверяет указанные IP-адреса через определенный интервал и отслеживает результаты. (активность, количество об/с, время) Интервал пинга можно указать на уровне устройства.

### Wake On LAN
Установите для объекта wol значение true, и на ваше устройство будут отправлены 3 пакета WOL с паузой 750 мс.

### Сканирование портов
В конфигурации вы можете ввести список портов или диапазон, которые должны сканироваться по умолчанию. Если это поле пусто, по умолчанию будет использоваться диапазон 0–65535.
Также можно указать список или диапазон для каждого устройства, которое будет использоваться для одного сканирования.

Если хотите, введите список или диапазон портов в объекте portList. Это перезапишет настройку в config.
Установите для сканирования значение true, при этом будут сканироваться все открытые порты в диапазоне 0–65535 или в том, что определено в portList. Этот процесс занимает некоторое время.
Результат будет записан в порты объекта.

---

### Айфон
iPhone пытаются защитить пользователей от отслеживания при смене Mac-адреса.
Узнайте больше об этом и о том, как отключить частные сети: https://support.apple.com/en-us/102509.

---

## Для разработчиков
#### Получите Mac для конкретного устройства
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Примечание. Эта функция ограничена подсетью хоста ioBroker.

#### Пинг конкретного IP-адреса
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake On LAN
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

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

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2024 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).
