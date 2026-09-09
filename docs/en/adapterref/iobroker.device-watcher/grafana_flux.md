---
chapters: {"pages":{"de/adapterref/iobroker.device-watcher/README.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/README.md"},"de/adapterref/iobroker.device-watcher/grafana.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana.md"},"de/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana_flux.md"},"de/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/lovelace.md"},"de/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.device-watcher/grafana_flux.md
title: ioBroker.device-watcher
hash: cA3hAjMnOWyjGilzTuvzuumULKpFL8cstehQHXpXcv8=
---
![logo](../../../de/admin/device-watcher.png)

# ioBroker.device-watcher

## How to display a JSON table in Grafana using Flux

In order to display JSON lists correctly in Grafana without a plugin, certain settings must be configured.

1. First, the values of the data points are passed on to the InfluxDB.

![influxDBSetting](../../../de/adapterref/iobroker.device-watcher/img/influxDBSetting.png)

2. In Grafana, you then create a new panel and select the visualization.`Table` out of.

![grafanaTable](../../../de/adapterref/iobroker.device-watcher/img/grafanaTable.png)

3. In the query settings, select your ioBroker database as the data source. Then enter the following syntax (the bucket name and data point name in the measurement area may differ for you, so please check and adjust if necessary):

```
from(bucket: "iobroker")
    |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    |> filter(fn: (r) => r["_measurement"] == "device-watcher.0.listAll")
    |> filter(fn: (r) => r["_field"] == "value")
```

![grafanaQuerySettingsInflux](../../../de/adapterref/iobroker.device-watcher/img/grafanaquerySettingsInflux.png)

4. Then go to the Transform tab.

![grafanaRiderTransform](../../../de/adapterref/iobroker.device-watcher/img/grafanaReiterTransform.png)

5. Here you must choose three transformations:

- First, take`Extract fields` Select the data point as the source; the format is...`JSON` and the checkbox`Replace all fields` will be selected.

![grafanaTransformOne](../../../de/adapterref/iobroker.device-watcher/img/grafanaTransformOne.png)

- The next transformation is`Reduce` Here you must specify that only the last recorded value from the data point should be displayed. Therefore, you select the mode.`Series to rows` and in Calculations`Last` chosen.

![grafanaTransformTwo](../../../de/adapterref/iobroker.device-watcher/img/grafanaTransformTwo.png)

- Finally, the transformation is added.`Extract fields` One more thing. Select the following as the source:`Last` Value out, this time the format is used`Key+value pairs` and selects the checkbox again`Replace all fields` out of.

![grafanaTransformThree](../../../de/adapterref/iobroker.device-watcher/img/grafanaTransformThree.png)

Once all settings have been configured, the table should be displayed correctly.

![grafanaTableAll](../../../de/adapterref/iobroker.device-watcher/img/grafanaTableAll.png)

### Additional information:

If you want to display the battery and signal levels graphically as gauges, you need to adjust the syntax as in the following example, removing the percent signs so that the text is changed from type string to number:

```
import "strings"
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Device-Status")
  |> filter(fn: (r) => r["_field"] == "value")
  |> map(fn: (r) => ({r with _value: strings.replaceAll(v: r._value, t: "%", u: "")}))
```

After that, you can customize the displays to your liking, as shown in the picture.

![grafanaInfluxGauges](../../../de/adapterref/iobroker.device-watcher/img/grafanaInfluxGauges.png)