---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/faq/_020_installation/030_update_nodejs.md
title: без названия
hash: rfmDysgNjSfP8ChiBHfvvf2rjus9yRzteMPLY26HVgo=
---
## Как правильно обновить Node.js?

В рамках одной основной версии (например, с 22.9 на 22.11) достаточно обычного обновления системы:

```bash
sudo apt update && sudo apt upgrade
```

Обновление до **основной версии** (например, с 20 до 22) — это совсем другое дело. В этом случае необходимо пересобрать модули; в противном случае адаптеры больше не будут запускаться. Это обрабатывается командой.`iob nodejs-update` .

!> Создайте [резервную копию](/docs/config/backup.md) заранее. И **никогда не** пропускайте основные версии и не переключайтесь на нечетные версии.

Полный процесс описан в разделе [«Обновление Node.js».](/docs/install/updatenode.md)

Обновление самого ioBroker отличается от обновления Node.js. Информацию об ioBroker см. в разделе [«Обновление»](/docs/install/update.md) .