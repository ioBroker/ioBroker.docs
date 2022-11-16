---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lametric/apps.md
title: ioBroker.lametric
hash: zIqxC1mqT1GyChvDagDfjVSXqQPcvYonXcFew2h197A=
---
![логотип](../../../de/adapterref/iobroker.lametric/../../admin/lametric.png)

# IoBroker.lametric
## Специальные приложения/виджеты *(требуется адаптер версии >= 1.1.2)*
Некоторые приложения могут быть снабжены дополнительной информацией или контролироваться.

- [Будильник](https://apps.lametric.com/apps/alarm_clock/68)
- [Секундомер](https://apps.lametric.com/apps/stopwatch/71)
- [Таймер](https://apps.lametric.com/apps/timer/72)
- [Радио] (https://apps.lametric.com/apps/radio/70)
- [Погода] (https://apps.lametric.com/apps/weather/69)

### Будильник
**часы.циферблат**

Допустимые значения

- `погода`, `page_a_day`, `настраиваемый` или `нет`
- Пользовательские значки в формате `data:image/png;base64,<двоичный png в кодировке base64>` или `data:image/gif;base64,<двоичный файл gif в кодировке base64>`

Пример:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYlWNUVFBgwAeYcEncv//gP04FMEmsCmCSiooKjHAFMEF0SRQTsEnCFcAE0SUZGBgYGAl5EwA+6RhuHb9bggAAAABJRU5ErkJggg==
```

**часы.будильник включен**

Активировать или деактивировать будильник

**часы.будильник.время**

Время будильника в формате ``HH:MM:SS`` oder ``HH:MM`` - z.B. ``10:00:00`` oder ``10:00``

**часы.будильник.пробуждение_с_радио**

Просыпайтесь с радио вместо будильника

### Таймеры
**обратный отсчет.configure**

время в секундах

### Погода
**прогноз погоды**

Запускает отображение прогноза погоды