---
chapters: {"pages":{"en/adapterref/iobroker.device-watcher/README.md":{"title":{"en":"ioBroker.device-watcher"},"content":"en/adapterref/iobroker.device-watcher/README.md"},"en/adapterref/iobroker.device-watcher/grafana.md":{"title":{"en":"ioBroker.device-watcher"},"content":"en/adapterref/iobroker.device-watcher/grafana.md"},"en/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"en":"ioBroker.device-watcher"},"content":"en/adapterref/iobroker.device-watcher/grafana_flux.md"},"en/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"en":"ioBroker.device-watcher"},"content":"en/adapterref/iobroker.device-watcher/lovelace.md"},"en/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"en":"ioBroker.device-watcher"},"content":"en/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
---
![Logo](../../admin/device-watcher.png)
# ioBroker.device-watcher

## Show HTML table in Lovelace-UI

![lovelacehtmllist](img/lovelacehtmllist.png)

- First activate in the instance settings of the Adapter Device-Watcher that the HTML tables should be created.

![dw_setting_htmllist](img/dw_setting_htmlist_EN.png)


- After that, the tables can be added in Lovelace. The maps are of type `markdown`. Here is a sample code of the integration, only the path of the lists have to be adjusted:

```
type: markdown
content: |-
  {device-watcher.0.offlineListHTML}
  <small><font color=gray>DataTime: {device-watcher.0.lastCheck}</font></small>
```