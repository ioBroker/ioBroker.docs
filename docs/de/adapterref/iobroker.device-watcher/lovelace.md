---
chapters: {"pages":{"de/adapterref/iobroker.device-watcher/README.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/README.md"},"de/adapterref/iobroker.device-watcher/grafana.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana.md"},"de/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana_flux.md"},"de/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/lovelace.md"},"de/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
---
![Logo](../../admin/device-watcher.png)
# ioBroker.device-watcher

## HTML Tabelle in Lovelace-UI anzeigen

![lovelacehtmllist](img/lovelacehtmllist.png)

- Aktiviere zuerst in den Instanz Einstellungen vom Adapter Device-Watcher das die HTML Tabellen mit erzeugt werden sollen.

![dw_setting_htmllist](img/dw_setting_htmllist.png)


- Danach können die Tabellen in Lovelace hinzugefügt werden. Die Karten sind vom Typ `Markdown`. Hier ist ein Beispiel Code der Intergration, es müsste nur noch der Pfad der Listen angepasst werden:

```
type: markdown
content: |-
  {device-watcher.0.offlineListHTML}
  <small><font color=gray>DataTime: {device-watcher.0.lastCheck}</font></small>
```