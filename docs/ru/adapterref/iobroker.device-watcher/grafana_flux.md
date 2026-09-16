---
chapters: {"pages":{"de/adapterref/iobroker.device-watcher/README.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/README.md"},"de/adapterref/iobroker.device-watcher/grafana.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana.md"},"de/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana_flux.md"},"de/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/lovelace.md"},"de/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.device-watcher/grafana_flux.md
title: ioBroker.device-watcher
hash: cA3hAjMnOWyjGilzTuvzuumULKpFL8cstehQHXpXcv8=
---
![логотип](../../../de/admin/device-watcher.png)

# ioBroker.device-watcher

## Как отобразить JSON-таблицу в Grafana с помощью Flux

Для корректного отображения JSON-списков в Grafana без плагина необходимо настроить определенные параметры.

1. Сначала значения точек данных передаются в InfluxDB.

![influxDBSetting](../../../de/adapterref/iobroker.device-watcher/img/influxDBSetting.png)

2. В Grafana вы создаете новую панель и выбираете визуализацию.`Table` из.

![grafanaTable](../../../de/adapterref/iobroker.device-watcher/img/grafanaTable.png)

3. В настройках запроса выберите базу данных ioBroker в качестве источника данных. Затем введите следующий синтаксис (имя сегмента и имя точки данных в области измерения могут отличаться, поэтому проверьте и скорректируйте их при необходимости):

```
from(bucket: "iobroker")
    |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    |> filter(fn: (r) => r["_measurement"] == "device-watcher.0.listAll")
    |> filter(fn: (r) => r["_field"] == "value")
```

![grafanaQuerySettingsInflux](../../../de/adapterref/iobroker.device-watcher/img/grafanaquerySettingsInflux.png)

4. Затем перейдите на вкладку «Преобразование».

![grafanaRiderTransform](../../../de/adapterref/iobroker.device-watcher/img/grafanaReiterTransform.png)

5. Здесь вам необходимо выбрать три преобразования:

- Во-первых, возьмите`Extract fields` Выберите точку данных в качестве источника; формат следующий...`JSON` и флажок`Replace all fields` будут отобраны.

![grafanaTransformOne](../../../de/adapterref/iobroker.device-watcher/img/grafanaTransformOne.png)

- Следующая трансформация —`Reduce` Здесь необходимо указать, что должно отображаться только последнее записанное значение из точки данных. Для этого вы выбираете режим.`Series to rows` и в расчетах`Last` выбран.

![grafanaTransformTwo](../../../de/adapterref/iobroker.device-watcher/img/grafanaTransformTwo.png)

- Наконец, добавляется преобразование.`Extract fields` И ещё кое-что. Выберите следующий текст в качестве источника.`Last` На этот раз используется следующий формат для вывода значения.`Key+value pairs` и снова ставит галочку в этом поле.`Replace all fields` из.

![grafanaTransformThree](../../../de/adapterref/iobroker.device-watcher/img/grafanaTransformThree.png)

После настройки всех параметров таблица должна отображаться корректно.

![grafanaTableAll](../../../de/adapterref/iobroker.device-watcher/img/grafanaTableAll.png)

### Дополнительная информация:

Если вы хотите отображать уровни заряда батареи и сигнала графически в виде индикаторов, вам необходимо изменить синтаксис, как показано в следующем примере, удалив знаки процента, чтобы текст изменился со строкового типа на числовой:

```
import "strings"
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Device-Status")
  |> filter(fn: (r) => r["_field"] == "value")
  |> map(fn: (r) => ({r with _value: strings.replaceAll(v: r._value, t: "%", u: "")}))
```

После этого вы можете настроить отображение информации по своему вкусу, как показано на картинке.

![grafanaInfluxGauges](../../../de/adapterref/iobroker.device-watcher/img/grafanaInfluxGauges.png)