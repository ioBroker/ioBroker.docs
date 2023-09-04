---
title: Node.js и нпм
lastChanged: 11.08.2023
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/nodejs.md
hash: /hSnG0OLvcDTR6X3kHdCsXwqL6zIPClPDIsPLmmynDI=
---
!> С введением сценария установки отдельная установка Node.js и npm в стандартных системах Linux больше не требуется! См. [Установка в Linux](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker и адаптеры в основном написаны на языке программирования JavaScript, и, поскольку компьютер не может выполнять JavaScript напрямую, для этого ему требуется среда выполнения Node.js.

?> Мы рекомендуем устанавливать ioBroker на дистрибутивы Linux на основе Debian и Ubuntu.

Здесь при необходимости устанавливается Node.js с помощью следующих команд:

```curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> По состоянию на март 2023 года для ioBroker рекомендуется версия 18 Node.js!

!> Нельзя использовать нечетные версии Node.js.

Дополнительную информацию об установке Node.js для различных операционных систем можно найти здесь [Фонд Node.js](https://nodejs.org/en/download/package-manager/).