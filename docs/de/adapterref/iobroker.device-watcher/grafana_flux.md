---
chapters: {"pages":{"de/adapterref/iobroker.device-watcher/README.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/README.md"},"de/adapterref/iobroker.device-watcher/grafana.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana.md"},"de/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana_flux.md"},"de/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/lovelace.md"},"de/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
---
![Logo](../../admin/device-watcher.png)
# ioBroker.device-watcher

## Wie JSON Tabelle in Grafana mit Flux anzeigen

Um Json Listen in Grafana korrekt und ohne Plugin anzeigen lassen zu können, müssen gewisse Einstellungen vorgenommen werden. 

1. Als erstes gibt man die Werte der Datenpunkte weiter an die InfluxDB

![influxDBSetting](img/influxDBSetting.png)

2. In Grafana erstellt man dann ein neues Panel und wählt die Visualisierung `Table` aus.

![grafanaTable](img/grafanaTable.png)

3. In den Query Einstellungen wählt man als Data source eure ioBroker Datenbank aus. Dann trägt man folgende Syntax ein (der bucket-name und Datenpunktname im measurement Bereich könnte bei euch abweichend sein, daher bitte prüfen und ggf. anpassen.):
```
from(bucket: "iobroker")
    |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    |> filter(fn: (r) => r["_measurement"] == "device-watcher.0.listAll")
    |> filter(fn: (r) => r["_field"] == "value")
```

![grafanaQuerySettingsInflux](img/grafanaquerySettingsInflux.png)

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

### Zusatzinfo:

Falls ihr die Batterie und Signalanzeige grafisch als Gauges darstellen wollt, müsst ihr die Syntax wie im folgenden Beispiel anpassen und damit die Prozentzeichen entfernen damit der Text vom Typ string auf number geändert wird:
```
import "strings"
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Device-Status")
  |> filter(fn: (r) => r["_field"] == "value")
  |> map(fn: (r) => ({r with _value: strings.replaceAll(v: r._value, t: "%", u: "")}))
```

Danach kann man wie im Bild die Anzeigen nach seinen Wünschen anpassen.

![grafanaInfluxGauges](img/grafanaInfluxGauges.png)