---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.maxcul/README.md
title: ioBroker.maxcul
hash: EcdEsDmLFDTrbUWEx3Iu+S5kSFQwwzE9BSuDcaVl+TI=
---
![Логотип](../../../en/adapterref/iobroker.maxcul/admin/maxcul.png)

![Количество установок](http://iobroker.live/badges/maxcul-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.maxcul.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.maxcul.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)

# IoBroker.maxcul
Адаптер ioBroker для управления Max! через [КУЛ](http://busware.de/tiki-index.php?page=CUL)

Адаптер создан на основе [пиматик-макскул](https://github.com/fbeek/pimatic-maxcul)

## Поддерживаемые устройства
- Термостат
- Датчик двери/окна
- Нажмите кнопку
- Термостат

## Использование
Перед использованием необходимо сначала выполнить сопряжение устройств с ioBroker.
Например, для термостатов нажмите и удерживайте кнопку «ускорение», пока не начнется обратный отсчет.

## Связь
Адаптер взаимодействует с CUL, работающим под управлением [калв](http://culfw.de/), либо через последовательный порт, либо по сети:

- **CUL-адаптер (последовательный порт)** - CUL/COC-адаптер, подключенный через USB. Выберите последовательный порт и скорость передачи данных.
- **CUN/CUNO (сеть)** - устройство CUN, CUNO или любое другое устройство CULW, доступное по протоколу TCP.

Например, перепрошитый MAX! Cube с помощью culfw или мост ESP8266/CC1101. Введите имя хоста или IP-адрес и TCP-порт, на котором culfw прослушивает запросы (по умолчанию 2323).
Обходной путь с `ser2net`/`socat` больше не требуется.

Если подключено более одного последовательного устройства, отдайте предпочтение одному из пунктов `/dev/serial/by-id/...` списка портов. Какое устройство станет `/dev/ttyUSB0`, а какое `/dev/ttyUSB1`, зависит от порядка их обнаружения и может измениться после перезагрузки, в то время как имя `by-id` всегда указывает на одно и то же устройство.
Любой другой путь можно ввести вручную.

В случае потери соединения адаптер автоматически переподключается каждые 10 секунд. Команды, которые не удалось отправить, остаются в очереди и передаются после восстановления соединения.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.1.0 (2026-08-13)
* (@GermanBluefox) Added support for CUN/CUNO devices which are connected over the network (TCP)
* (@GermanBluefox) The connection is now re-established automatically if it was lost
* (@GermanBluefox) Fixed the crash on a communication error and the missing cause in the connection error message
* (@GermanBluefox) The serial port list now also offers the stable device links below `/dev/serial`, so a stick can be selected by a name which does not change after a reboot
* (@GermanBluefox) Fixed the CI workflow, which was not triggered by pushes to the master branch
* (@GermanBluefox) Fixed the issues reported by the repository checker

### 2.0.1 (2026-08-06)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (9Mad-Max5) Updating serialport to version 12.0.0 to support Node.js 20
* (9Mad-Max5) Updating serialport to version 13.0.0 to stop support for Node.js 20
* (@GermanBluefox) Migrated the sources to TypeScript
* (@GermanBluefox) Fixed the message counter, which was sent as `01` for every packet
* (@GermanBluefox) Refactoring and code cleanup

### 1.3.1 (2020-07-26)
* (bowao) Fix unhandled exception
* (bowao) Fix serial port selection
* (Apollon77) Update dependencies

### 1.3.0 (2020-05-12)
* (Apollon77) Support nodejs 12+14
* (Apollon77) Prevent warnings in js-controller 3

### 1.2.0 (2020-01-23)
* (bluefox) Refactoring

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>