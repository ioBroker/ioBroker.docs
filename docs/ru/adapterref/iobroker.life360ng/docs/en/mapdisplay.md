---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.life360ng/docs/en/mapdisplay.md
title: Вкладка: Отображение карты
hash: GgWJSoRKIwQukGz8waCvdAbV8qzxMh/l7hW0Em4D6lM=
---
![Логотип](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Следующее поколение

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

(Начиная с версии 1.4.0 – полный набор функций доступен только в последней версии)

# Вкладка: Отображение карты

Все настройки на этой вкладке управляют визуальным оформлением карт трекера. Изменения вступят в силу автоматически при следующем обновлении GPS — перезапуск не требуется.

---

## Дизайн карт

Управляет общим внешним видом и функциональностью всех карт трекера.

| Параметр                 | Описание                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| Фон страницы             | Цвет фона страницы с картой                                                                      |
| Фон заголовка            | Цвет фона панели заголовка карты                                                                 |
| Разделитель заголовка    | Цвет разделительной линии под заголовком                                                         |
| Ширина строки (пикселей) | Ширина линии маршрута в пикселях (1–10)                                                          |
| Прозрачность маршрута    | Прозрачность линии маршрута (0,0 = невидима, 1,0 = полностью непрозрачна)                        |
| Прозрачность маркера     | Прозрачность маркера положения/булавки (0,0 = невидима, 1,0 = полностью непрозрачна)             |
| Размер маркера           | Коэффициент размера для маркера позиции (0,5 = половина, 1,0 = значение по умолчанию, 2,0 = два) |

---

## Места на карте

На карте можно отображать флажки для мест, указанных в Life360, а также для ваших собственных мест (Мои места). Каждый источник можно настроить независимо.

### Life360 Places

| Параметр                                 | Описание                                                           |
| ---------------------------------------- | ------------------------------------------------------------------ |
| Отображайте места Life360 в виде флагов. | Включение/отключение маркеров-флагов для облачных площадок Life360 |
| Цвет флага (места Life360)               | Цвет флажковых маркеров                                            |
| Размер флага (места по версии Life360)   | Коэффициент размера для маркеров флагов (0,5–3,0)                  |
| Прозрачность флага (места Life360)       | Прозрачность маркеров флага (0,0 = невидим, 1,0 = полностью виден) |

### Мои места (мои места)

| Параметр                                     | Описание                                                           |
| -------------------------------------------- | ------------------------------------------------------------------ |
| Отобразите свои места в виде флагов.         | Включение/отключение флажков для пользовательских «Моих мест».     |
| Цвет флага (свои места)                      | Цвет флажковых маркеров                                            |
| Размер флага (на своих местах)               | Коэффициент размера для маркеров флагов (0,5–3,0)                  |
| Отметить прозрачность (в собственных местах) | Прозрачность маркеров флага (0,0 = невидим, 1,0 = полностью виден) |

---

## Название семейной карты

| Параметр                          | Описание                                                               |
| --------------------------------- | ---------------------------------------------------------------------- |
| Название заголовка семейной карты | Пользовательский заголовок отображается в заголовке карты семьи/круга. |