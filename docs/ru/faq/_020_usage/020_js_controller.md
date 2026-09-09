---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/faq/_020_usage/020_js_controller.md
title: без названия
hash: dDuRxWR8fYL2k6gkOEaoYAox45L3oiGf+xqZGVOqznk=
---
## Что такое js-контроллер?

js-контроллер — это ядро ioBroker. Он запускает и останавливает экземпляры, управляет двумя базами данных (объектами и состояниями) и осуществляет мониторинг системы. Без него ничего не работает.

Это не адаптер, поэтому он не отображается в списке адаптеров. Его версия указана на вкладке [«Хосты»](/docs/admin/hosts.md) , а обновления выполняются с помощью [функции обновления ioBroker](/docs/install/updateself.md) .

!> Перед обновлением js-контроллера необходимо создать [резервную копию](/docs/config/backup.md) .