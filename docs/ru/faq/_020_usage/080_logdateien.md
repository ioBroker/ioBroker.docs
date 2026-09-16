---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/faq/_020_usage/080_logdateien.md
title: без названия
hash: cueiceNrwpfLJ3hDiEzpNDLO4ZY8wWl0CZlxj/D6b2c=
---
## Где я могу найти эти записи?

В панели администратора, на [вкладке «Журналы»](/docs/admin/log.md) , вы можете фильтровать записи по экземпляру, уровню и тексту.

Они лежат на пластине снизу.`/opt/iobroker/log/` Один файл в день. Полный файл можно скачать, нажав кнопку **«Скачать журнал»** .

Это также работает через командную строку:

```bash
iob logs          # die letzten 100 Zeilen
iob logs --watch  # fortlaufend mitlesen
```

Длинные строки обрезаются в браузере. Для более детального изучения сообщения следует проверить загруженный файл. Причина часто кроется в строках, предшествующих сообщению.