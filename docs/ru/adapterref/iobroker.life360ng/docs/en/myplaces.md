---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.life360ng/docs/en/myplaces.md
title: Вкладка: Мои места
hash: X6X3kpcksr+lUFc1tKht/2zwC+qcOEyQV0afygLnc2w=
---
![Логотип](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Следующее поколение

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

# Вкладка: Мои места

На вкладке **«Мои места»** вы можете определить свои собственные личные места, независимые от облачных мест Life360.

**Функции:**

- Добавьте любое количество мест, указав название, широту, долготу и радиус.
- Эти места используются для обнаружения присутствия и автоматизации в ioBroker.
- Облачные ресурсы Life360 и ваши собственные ресурсы могут использоваться параллельно.

**Стол:**

- **Название:** Свободно выбираемое название для места (например, «Дом», «Работа»).
- **Широта / Долгота:** Координаты места (например, скопированные из Google Maps)
- **Радиус:** Площадь в метрах, в пределах которой человек считается «присутствующим».
- **Круг:** (необязательно) Назначение в круг Life360

**Примечание:** Ваши собственные местоположения видны только локально в ioBroker и не передаются в Life360.

> Доступ к облачным сервисам **Life360 Places недоступен?** Life360 ограничил доступ к облачным сервисам через API для некоторых учетных записей, особенно для учетных записей из ЕС на бесплатном уровне. Если в журнале адаптера отображается следующее:`All place sources returned 0 places` Life360 больше не предоставляет доступ к вашим местам через какие-либо API-интерфейсы. **Временное решение:** отметьте важные для вас места как **«Мои места»** на этой вкладке. Они работают независимо от Life360 и обеспечивают ту же функциональность обнаружения присутствия.