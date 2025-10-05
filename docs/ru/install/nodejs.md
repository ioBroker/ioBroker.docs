---
title: Node.js и npm
lastChanged: 28.09.2025
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/nodejs.md
hash: 5VmhgF6IZVKJAoCC+lc8+082z7AVOORazHpIunSfxIg=
---
!> С появлением установочного скрипта отдельная установка Node.js и npm в стандартных системах Linux больше не требуется! См. [Установка под Linux](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker и адаптеры в основном написаны на языке программирования JavaScript, и поскольку компьютер не может выполнять JavaScript напрямую, для него требуется среда выполнения Node.js.

?> Мы рекомендуем устанавливать ioBroker в дистрибутивах Linux на базе Debian и Ubuntu.

При необходимости Node.js устанавливается здесь с помощью следующих команд:

```curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> По состоянию на сентябрь 2025 года для ioBroker рекомендуется версия 22 Node.js!

!> Нельзя использовать нечетные версии Node.js.

Дополнительную информацию об установке Node.js для различных операционных систем можно найти здесь [Фонд Node.js](https://nodejs.org/en/download/package-manager/).