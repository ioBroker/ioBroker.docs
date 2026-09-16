---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.life360ng/docs/en/general.md
title: Вкладка: Общие
hash: xCtlecS144eJqLddCM8R89iRoxRCV39Yefl5xVSVvyI=
---
![Логотип](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Следующее поколение

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

## Следующее поколение

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

# Вкладка: Общие

Вкладка **«Общие»** содержит основные настройки для подключения к сервису Life360.

**Ключевые области:**

- **Токен Life360:** Введите здесь свой персональный токен Life360. Вы можете получить его, следуя инструкциям в адаптере или через инструменты разработчика вашего браузера.
- **Электронная почта:** требуется только в том случае, если вы хотите использовать вход по паролю вместо токена (не рекомендуется).
- **Интервал опроса:** определяет, как часто адаптер получает новые данные о местоположении от Life360 (в секундах, по умолчанию: 60). Более короткие интервалы обеспечивают более актуальные данные, но увеличивают нагрузку на API.

**Примечание:** Для подключения адаптера к Life360 необходим токен. Без действительного токена адаптер останется в автономном режиме.

Дополнительные справочные тексты доступны непосредственно в административном интерфейсе в виде всплывающих подсказок.