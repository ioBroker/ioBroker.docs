---
chapters: {"pages":{"de/adapterref/iobroker.device-watcher/README.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/README.md"},"de/adapterref/iobroker.device-watcher/grafana.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana.md"},"de/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana_flux.md"},"de/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/lovelace.md"},"de/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.device-watcher/lovelace.md
title: ioBroker.device-watcher
hash: cBwQruyKCZyflXXIegblSik+FEY4s4ohoAQfCp9Scbk=
---
![логотип](../../../de/admin/device-watcher.png)

# ioBroker.device-watcher

## Отображение HTML-таблицы в пользовательском интерфейсе Lovelace

![lovelacehtmllist](../../../de/adapterref/iobroker.device-watcher/img/lovelacehtmllist.png)

- Во-первых, в настройках экземпляра адаптера Device-Watcher включите опцию генерации HTML-таблиц.

![dw\_setting\_htmllist](../../../de/adapterref/iobroker.device-watcher/img/dw_setting_htmllist.png)

- Затем таблицы можно добавить в Lovelace. Карты имеют следующий тип:`Markdown` Вот пример кода интеграции; нужно будет лишь скорректировать путь к спискам:

```
type: markdown
content: |-
  {device-watcher.0.offlineListHTML}
  <small><font color=gray>DataTime: {device-watcher.0.lastCheck}</font></small>
```