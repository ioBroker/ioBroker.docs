---
title: Node.js и npm
lastChanged: 13.10.2025
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/nodejs.md
hash: 38xyrXo/C1YwLwdNL8ZM8DCwvUJijKb+SFiC8oRyvO4=
---
Благодаря скрипту установки iobroker, на рекомендуемых системах Linux больше не требуется отдельная установка Node.js и npm! См. [Установка под Linux](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker и его адаптеры написаны преимущественно на языке программирования JavaScript. Поскольку компьютер не может напрямую выполнять JavaScript, необходима среда выполнения, которую предоставляет Node.js.

Рекомендуются дистрибутивы на основе Debian и Ubuntu.

В настоящее время ioBroker рекомендует использовать версию Node.js 22 с долгосрочной поддержкой (LTS). Использовать версии с нечетными номерами нельзя.

## Стандартное обновление Node.js
Начиная с версии js-controller 5.5.x, доступна новая консольная команда для обновления Node.js:

```
iobroker nodejs-update
```

Эта команда автоматически загружает и устанавливает рекомендуемую версию LTS **Node.js 22**, а также соответствующий npm.

Если вы хотите переключиться именно на другую версию (например, Node.js 24), укажите желаемую версию в качестве параметра:

```
iobroker nodejs-update 24
```

## Альтернативная ручная установка
Если требуется ручная установка или определенная версия, используйте репозиторий Nodesource:

```
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Для другой версии внесите соответствующие изменения в `setup_22.x` (например, `setup_24.x`).