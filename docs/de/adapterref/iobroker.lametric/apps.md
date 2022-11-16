---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
---
![Logo](../../admin/lametric.png)

# ioBroker.lametric

## Spezielle Apps / Widgets *(Adapter-Version >= 1.1.2 notwendig)*

Einige Apps lassen sich mit Zusatzinformationen versehen oder steuern.

- [Alarm Clock](https://apps.lametric.com/apps/alarm_clock/68)
- [Stop Watch](https://apps.lametric.com/apps/stopwatch/71)
- [Timer](https://apps.lametric.com/apps/timer/72)
- [Radio](https://apps.lametric.com/apps/radio/70)
- [Weather](https://apps.lametric.com/apps/weather/69)

### Alarm Clock

**clock.clockface**

Gültige Werte sind

- `weather`, `page_a_day`, `custom` oder `none`
- Eigene Icons im Format `data:image/png;base64,<base64 encoded png binary>` oder `data:image/gif;base64,<base64 encoded gif binary>`

Beispiel:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYlWNUVFBgwAeYcEncv//gP04FMEmsCmCSiooKjHAFMEF0SRQTsEnCFcAE0SUZGBgYGAl5EwA+6RhuHb9bggAAAABJRU5ErkJggg==
```

**clock.alarm.enabled**

Alarm aktivieren oder deaktivieren

**clock.alarm.time**

Weckzeit im Format ``HH:MM:SS`` oder ``HH:MM`` - z.B. ``10:00:00`` oder ``10:00``

**clock.alarm.wake_with_radio**

Mit Radio statt alarm wecken

### Timer

**countdown.configure**

Zeit in Sekunden

### Weather

**weather.forecast**

Startet die Anzeige der Wettervorhersage