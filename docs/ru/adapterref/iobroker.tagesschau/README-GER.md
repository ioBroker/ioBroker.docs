---
chapters: {"pages":{"en/adapterref/iobroker.tagesschau/README.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README.md"},"en/adapterref/iobroker.tagesschau/README-GER.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README-GER.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tagesschau/README-GER.md
title: ioBroker.tagesschau
hash: EU8FNZ2XwOAJP2KDYI832vBvd5tASEZTmwmrFX6Iik4=
---
![Логотип](../../../en/adapterref/iobroker.tagesschau/admin/tagesschau.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tagesschau.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tagesschau.svg)
![Количество установок](https://iobroker.live/badges/tagesschau-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/tagesschau-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tagesschau.png?downloads=true)
![Тестирование и выпуск](https://github.com/ticaki/ioBroker.tagesschau/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tagesschau

## адаптер tagesschau для ioBroker

Новости Ruft и видеоссылки от Tagesschau ab.

Installieren - Im Admin gewünschtes einstellen - Fertig.

**Laut Tagesschau api sind 60 Abfragen pro Stunde в Орднунге. Используйте темы и видео с 1 сокращением. 30 минут для активного погружения. Keine Ahnung wie genau die das nehmen.**

Бичтен:

1. Если вы не активируете видео или активируете видео, вы можете отключить адаптер
2. Активация адаптера активируется только при включении конфигурации 1 Thema и 1 Bundesland ausgewählt.
3. Die Schlüsselwörter werden aus den Nachrichten gewonnen und sind erst nach dem ersten Durchlauf verfügbar. Es werden mit der Zeit immer mehr! Это не лучший выбор для ваших видеороликов.

Die Scrollmöglichkeiten sollten soweit selbsterklärend sein, findet man unter news.controls

- Если при автоматической настройке функции прокрутки все синхронные прокрутки будут отключены, будут установлены все интервалы и адаптер будет отключен.
- Beim Einstellen des Intervalls bedenken, dass fast alle States unter News neu geschrieben werden. Das können je nach Auswahl ein paar tausend sein. (мин. 2 секунды – nicht empfohlen)

Beispiel был с VIS möglich ist:![Videoansicht von Armilar](img/BeispielVideoansicht1.png)![Videoansicht von bahnuhr](../../../en/adapterref/iobroker.tagesschau/img/BeispielVideoansicht2.png) Weiteres zu den Bilder: <https://forum.iobroker.net/post/1235111>