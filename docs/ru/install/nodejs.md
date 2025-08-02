---
title: Node.js и npm
lastChanged: 11.08.2023
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/nodejs.md
hash: +/clKGI6Nn2MdnSbbF4O7f+FeueoHcyUaLSIcalX/Gs=
---
!> С появлением сценария установки отдельная установка Node.js и npm в обычных системах Linux больше не требуется! См. [Установка в Linux](https://www.iobroker.net/#de/documentation/install/linux.md).

ioBroker и адаптеры в основном написаны на языке программирования JavaScript, и поскольку компьютер не может выполнять Javascript напрямую, для этого требуется среда выполнения Node.js.

?> Мы рекомендуем устанавливать ioBroker в дистрибутивах Linux на базе Debian и Ubuntu.

Node.js сюда устанавливается при необходимости с помощью следующих команд:

```curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> С марта 2023 года для ioBroker рекомендуется использовать Node.js версии 18!

!> Нечетные версии Node.js использовать нельзя.

Дополнительную информацию об установке Node.js для различных операционных систем можно найти здесь [Фонд Node.js](https://nodejs.org/en/download/package-manager/).