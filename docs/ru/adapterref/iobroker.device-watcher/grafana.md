---
chapters: {"pages":{"de/adapterref/iobroker.device-watcher/README.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/README.md"},"de/adapterref/iobroker.device-watcher/grafana.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana.md"},"de/adapterref/iobroker.device-watcher/grafana_flux.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/grafana_flux.md"},"de/adapterref/iobroker.device-watcher/lovelace.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/lovelace.md"},"de/adapterref/iobroker.device-watcher/listSupportAdapter.md":{"title":{"de":"ioBroker.device-watcher"},"content":"de/adapterref/iobroker.device-watcher/listSupportAdapter.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.device-watcher/grafana.md
title: ioBroker.device-watcher
hash: Z1bFVHtrRfjDWXo64n6yc3e4sdlZqkSmJzAOqALiexU=
---
![логотип](../../../de/admin/device-watcher.png)

# ioBroker.device-watcher

## Как отобразить JSON-таблицу в Grafana с помощью InfluxQL

Для корректного отображения JSON-списков в Grafana без плагина необходимо настроить определенные параметры.

1. Сначала значения точек данных передаются в InfluxDB.

![influxDBSetting](../../../de/adapterref/iobroker.device-watcher/img/influxDBSetting.png)

2. В Grafana вы создаете новую панель и выбираете визуализацию.`Table` из.

![grafanaTable](../../../de/adapterref/iobroker.device-watcher/img/grafanaTable.png)

3. В настройках запроса выберите базу данных ioBroker в качестве источника данных.`From` Если вы возьмете нужную вам точку данных,`Select` Если удалить предустановку`mean()` и в`Group by` должен`time($_interval)` и`fill(null)` Оно будет удалено. (Нажмите на него, а затем на кнопку «Удалить»).

![grafanaQuerySettings](../../../de/adapterref/iobroker.device-watcher/img/grafanaQuerySettings.png)

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