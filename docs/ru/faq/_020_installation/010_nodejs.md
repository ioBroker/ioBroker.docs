---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/faq/_020_installation/010_nodejs.md
title: без названия
hash: g+0DZtij/7h1Qps5LH6Sx/RQsFAUj+1Ay+oTcYuTb7U=
---
## Какая версия Node.js мне нужна?

ioBroker работает на Node.js. Рекомендуется использовать версию **Node.js 22** с долгосрочной поддержкой (LTS).

**Не следует использовать нечетные номера версий** (21, 23, 25…). Это ветки разработки, не имеющие долгосрочной поддержки.

В операционных системах Debian, Ubuntu и Raspberry Pi скрипт установки ioBroker автоматически устанавливает Node.js. Для ручной установки:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Проверить установленную версию можно с помощью следующей команды:

```bash
node -v
npm -v
```

Они оба должны быть совместимы.`nodeCurrent` ,`nodeNewest` и`nodeNewestNext` Если на вкладке «Хосты» отображаются несоответствия, необходимо обновить данные.

Подробности: [Установите Node.js](/docs/install/nodejs.md)