---
chapters: {"pages":{"de/adapterref/iobroker.device-watcher/README.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/README.md"},"de/adapterref/iobroker.device-watcher/grafana.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana.md"},"de/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana_flux.md"},"de/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/lovelace.md"},"de/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
---
![Logo](../../admin/device-watcher.png)
# ioBroker.device-watcher

## Wie JSON Tabelle in Grafana mit InfluxQL anzeigen

Um Json Listen in Grafana korrekt und ohne Plugin anzeigen lassen zu können, müssen gewisse Einstellungen vorgenommen werden. 

1. Als erstes gibt man die Werte der Datenpunkte weiter an die InfluxDB

![influxDBSetting](img/influxDBSetting.png)

2. In Grafana erstellt man dann ein neues Panel und wählt die Visualisierung `Table` aus.

![grafanaTable](img/grafanaTable.png)

3. In den Query Einstellungen wählt man als Data source eure ioBroker Datenbank aus. Bei `From` nimmt man sein gewünschten Datenpunkt, bei `Select` entfernt man das voreingestellte `mean()` und bei `Group by` müssen `time($_interval)` und `fill(null)` entfernt werden. (Draufklicken und auf remove)

![grafanaQuerySettings](img/grafanaQuerySettings.png)

4. Danach geht man auf den Reiter Transform.

![grafanaReiterTransform](img/grafanaReiterTransform.png)

5. Hier muss man nun drei Transformationen wählen:

- Als erstes nimmt man `Extract fields`. Wählt als Source den Datenpunkt aus, Format ist `JSON` und die Checkbox `Replace all fields` wird ausgewählt.

![grafanaTransformOne](img/grafanaTransformOne.png)

- Die nächste Transformation ist `Reduce`. Hier muss man angeben das nur der letzte aufgezeichnete Wert vom Datenpunkt angezeigt werden soll. Daher nimmt man als Mode `Series to rows` und bei Calculations wird `Last` gewählt.

![grafanaTransformTwo](img/grafanaTransformTwo.png)

- Zu guter letzt fügt man die Transformation `Extract fields` noch mal hinzu. Wählt als Source den `Last` Wert aus, diesmal nimmt man das Format `Key+value pairs` und wählt wieder die Checkbox `Replace all fields` aus. 

![grafanaTransformThree](img/grafanaTransformThree.png)

Wenn alle Einstellungen getroffen wurden, sollte die Tabelle korrekt angezeigt werden.

![grafanaTableAll](img/grafanaTableAll.png)