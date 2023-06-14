---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-MBUS
hash: r24RXJvLfu8k0vOUNpFyk2vqhq2DF66EqmnatUmAKVE=
---
![Логотип](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![количество установленных](https://iobroker.live/badges/wireless-mbus-installed.svg)
![стабильная версия](https://iobroker.live/badges/wireless-mbus-stable.svg)

# IoBroker.wireless-mbus
Этот адаптер позволяет получать беспроводные данные M-Bus от поддерживаемых приемников. Степень реализации устройства различается, но режимы wMBus можно настроить для всех перечисленных устройств.

* Встроить модули WMB
* Amber Wireless AMB8465 (**Осторожно:** командный режим (UART_CMD_Out_Enable) включен!)
* ИМСТ iM871A
* КУЛ

Стек WMBUS был «перенесен» из проекта FHEM и был в значительной степени исправлен и реорганизован. Тестирование проводилось с необработанными данными, полученными из Интернета, образцами данных OMS и некоторыми тестовыми данными из библиотеки jmbus. Некоторые крайние случаи еще не проверены.

Создание устройства, обновление и т. д. в основном основано на адаптере M-Bus компании Apollon77 (см. ниже).

Если адаптер получает зашифрованные телеграммы, на вкладке конфигурации ключа AES должен автоматически отображаться идентификатор устройства.

Если синтаксический анализатор дает сбой, необработанные данные телеграммы будут сохранены в состоянии info.rawdata.

*Внимание:* Кажется, что приемник Amber зависает через некоторое время (или количество полученных сообщений) в режиме C? Аппаратный недостаток?

* Вариант IMST iM871A: * Существует USB-приемник «RWE Smart Home», который в принципе является IMST iM871A, но ядро не будет автоматически загружать соответствующий драйвер. Это однострочник для создания правила udev, чтобы исправить это:

```shell
sudo bash -c "echo \$'ACTION==\"add\", ATTRS{idVendor}==\"10c4\", ATTRS{idProduct}==\"87ed\", RUN+=\"/sbin/modprobe cp210x\" RUN+=\"/bin/sh -c \\'echo 10c4 87ed > /sys/bus/usb-serial/drivers/cp210x/new_id\\'\"' > /etc/udev/rules.d/99-imst.rules"
```

## Ссылки:
* [Модуль стека WMBus] (https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
* [ioBroker.mbus] (https://github.com/Apollon77/ioBroker.mbus)
* [Исходный стек WMBUS: wm-bus] (https://github.com/soef/wm-bus)
* [Протокол M-Bus] (http://www.m-bus.com/files/MBDOC48.PDF)
* [Спецификации OMS](https://oms-group.org/en/download4all/oms-specification/)

## Начальная настройка
Первоначальная настройка требует настройки основных параметров (аппаратного подключения к приемнику wmbus) и настройки ключей AES для всех зашифрованных узлов wmbus, которые необходимо собрать. Самая сложная часть — это ключи AES.

### Базовая настройка
Для этого необходимо выбрать соответствующее USB-устройство и правильную скорость передачи (**обычно** для IMST: 57600 бод; желтый: 9600 бод; Embit: 9600 бод, CUL: 38400 или 9600 бод). Большинство **измерителей** отправляют данные в «T-режиме».

Начиная с версии 0.9.0 адаптер также поддерживает подключение к последовательным устройствам, доступным через сокет TCP. Однако интерфейс администратора на самом деле не отражает этого (на данный момент), и вам нужно выбрать «пользовательский порт» и ввести хост как `tcp://host:port`.

### Другие варианты
* **Обновить неизмененные состояния**: При поступлении телеграммы все состояния будут обновлены, даже если их значение не изменилось. (по умолчанию: включено)
* **Кэш для поддержки компактных фреймов**: Для поддержки компактных телеграмм (используемых некоторыми (Kamstrup?) устройствами) структура всех полученных телеграмм кэшируется. Обычно это означает только одну запись кэша на устройство. Если у вас нет устройства, которое отправляет компактные телеграммы, вы можете отключить его, чтобы сэкономить немного производительности и памяти. (по умолчанию: выключено)
* **Перевести единицы энергии в кВтч**: Все единицы энергии (Втч и Дж) будут преобразованы в кВтч. (по умолчанию: выключено)
* **Временно блокировать устройство после последовательных сбоев**: если 10 последовательных телеграмм одного и того же устройства не проанализированы успешно, устройство будет игнорироваться до перезапуска адаптера (по умолчанию: включено)

### AES-ключи
Идентификатор устройства представляет собой комбинацию кода производителя и идентификатора устройства (например, AAA-12345678). Ключ можно ввести либо в виде обычного текста с 16 символами, либо в виде шестнадцатеричной строки с 32 символами (16 байт).

Самый простой способ настроить ключи — запустить адаптер без настройки ключа и дождаться зашифрованной телеграммы, после чего адаптером будет сгенерирована запись с ключом «НЕИЗВЕСТНО». Затем можно заполнить соответствующий ключ и сохранить настройки. Если вы видите устройства, которые вам не известны или от которых вы хотите избавиться (например, устройства от соседей), вы можете указать их на вкладке заблокированных устройств (см. ниже).

### Блокировка нежелательных устройств
Вкладка «заблокированные устройства» позволяет полностью запретить адаптеру обрабатывать телеграммы от нежелательных устройств.

Вам нужно только ввести идентификатор устройства (например, AAA-12345678), который вы можете получить из дерева объектов после получения и анализа телеграммы или из журнала (отладки).

После этого, когда вы удалите устройство из дерева объектов, адаптер больше не создаст его заново.

## Делать
* отправка телеграмм для приемников S-режима?
* работа со счетчиками с "множественными телеграммами"

## Changelog

### 0.9.1
* (ChL) Fix custom port display in admin page if SerialPort returns no ports

### 0.9.0
* (ChL/kubax) Experimental! Enable serial over raw TCP socket for all devices - use `tcp://host:port` as custom serial port
* serialport is upgraded to v11 - this finally breaks node v12 support!

### 0.8.10
* (ChL) Use compact frame cache independently from manufacturer code

### 0.8.9
* (ChL) Fix display of non-default settings in admin page

### 0.8.8
* (ChL) Add datetime type I handling

### 0.8.7
* (ChL) Slightly improve handling of LVAR DIF values

### 0.8.3 / 0.8.4 / 0.8.5 / 0.8.6
* (ChL) Update dev dependencies - Attention CI test will no longer support <= NodeJS 12
* (ChL) Minor logging changes

### 0.8.2
* (ChL) C-mode support for CUL

### 0.8.1
* (ChL) Fix connection state
* (ChL) Re-add serial logging

### 0.8.0
* (ChL) Complete rewrite of serial communication - now includes unit tested device classes
* (ChL) Upgrade to SerialPort 10.x and dependency clean up
* (ChL) Improve PRIOS decoder

### 0.7.9
* (ChL) Add debug logging to all serial devices

### 0.7.8
* (ChL) Improve logging from receiver modules
* (ChL) fix rawdata state

### 0.7.7
* (ChL) Add support for Diehl PRIOS encoded telegrams (ported from wmbusmeters)

### 0.7.5 / 0.7.6
* (ChL) Fix timeout handling - if no problems occur this will be republished as 1.0.0

### 0.7.3 / 0.7.4
* (ChL) Try to improve CUL support

### 0.7.1 / 0.7.2
* (ChL) Rename to ioBroker.wireless-mbus to be able to publish to npm
* (ChL) Fix block list, admin page logo and repo url in package.json

### 0.7.0
* (ChL) Change main adapter code to class
* (ChL) Include actual (machine) translations besides English and German
* (ChL) Upgrade denpendencies
* (ChL) Add test for wmbus decoder
* (ChL) Add integration tests
* (ChL) Add github workflow

### 0.6.2
* (ChL) Improve admin page to handle custom serialport path
* (ChL) Add option to turn automatic blocking of devices off
* (ChL) Add "Simple Hexstring" receiver for testing purposes
* (ChL) Internal refactoring

### 0.6.0 / 0.6.1
* (ChL) Upgrade of serialport library to 9.2.0
* (ChL) experimental CUL support

### 0.5.2
* (ChL) fix for connection indicator with js-controller 2.x

### 0.5.1
* (ChL) Small fixes
* (ChL) Internal telegram parser now supports wired M-Bus frames (not used - for testing / developing purpose)
* (D Glaser) Added timestamp of last update to device info
* (D Glaser/ChL) Added some setup documentation to README

### 0.5.0
* (ChL) Basic support for Techem devices
* (ChL) Option to force energy units (Wh and J) to kWh - BEWARE this is not really backwards compatible. Old states will keep their "old" unit, but display the adjusted value!

### 0.4.7
* (ChL) Block devices after 10 consecutive failed parse attempts until adapter restart
* (ChL) Assign roles derived from units (as does the mbus adapter)

### 0.4.6
* (ChL) Support for (Kamstrup?) compact frames through data record cache (pre-defined frames have been removed!)

### 0.4.5
* (ChL) Append device ids with key "UNKNOWN" at startup to needskey

### 0.4.2 / 0.4.3 / 0.4.4
* (ChL) Small fixes

### 0.4.1
* (ChL) basic IMST iM871A support

### 0.4.0
* (ChL) better Amber Stick support
* (ChL) Compact mode?
* (ChL) Nicer state names
* (ChL) wMBus mode partially selectable

### 0.3.0
* (ChL) Implemented all VIF types from MBus doc
* (ChL) VIF extensions are handled better (again)
* (ChL) reorganised VIF info
* (ChL) reorganised receiver handling
* (ChL) blocking of devices possible

### 0.2.0 (not tagged)
* (ChL) Dramatically improved parser: support for security mode 7, frame type B, many small fixes
* (ChL) VIF extensions are handled better, but correct handling is still not fully clear
* (ChL) CRCs are checked and removed if still present
* (ChL) raw data is saved if parser fails

### 0.1.0
* (ChL) initial release

## License

Copyright (c) 2019 ISFH - Institute for Solar Energy Research www.isfh.de
Copyright (c) 2021 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)