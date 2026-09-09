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

Изменение **Основная версия** (например, с 20 на 22) — это совсем другое дело. В этом случае модули необходимо пересобрать; в противном случае адаптеры не запустятся. Это обрабатывается командой. `iob nodejs-update`.

!> Перед [Резервная копия](/docs/config/backup.md)
творить. И **никогда** Пропустите основную версию или переключитесь на версию с нечетным номером.

Полный процесс доступен по адресу:
[Обновите Node.js](/docs/install/updatenode.md).

Обновление самого ioBroker отличается от обновления Node.js. Информацию об ioBroker см. в \[ссылка/ссылка].
[Обновлять](/docs/install/update.md).