---
chapters: {"pages":{"en/adapterref/iobroker.lametric/README.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/README.md"},"en/adapterref/iobroker.lametric/apps.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/apps.md"},"en/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/my-data-diy.md"},"en/adapterref/iobroker.lametric/notifications.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/notifications.md"},"en/adapterref/iobroker.lametric/blockly.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/blockly.md"}}}
---
![Logo](../../admin/lametric.png)

# ioBroker.lametric

## Special Apps / Widgets *(Adapter version >= 1.1.2 required)*

You can control some apps with custom information.

- [Alarm Clock](https://apps.lametric.com/apps/alarm_clock/68)
- [Stop Watch](https://apps.lametric.com/apps/stopwatch/71)
- [Timer](https://apps.lametric.com/apps/timer/72)
- [Radio](https://apps.lametric.com/apps/radio/70)
- [Weather](https://apps.lametric.com/apps/weather/69)

### Alarm Clock

**clock.clockface**

Allowed values are:

- one of `weather`, `page_a_day`, `custom` or `none`
- custom icon data in format `data:image/png;base64,<base64 encoded png binary>` or `data:image/gif;base64,<base64 encoded gif binary>`

Example:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYlWNUVFBgwAeYcEncv//gP04FMEmsCmCSiooKjHAFMEF0SRQTsEnCFcAE0SUZGBgYGAl5EwA+6RhuHb9bggAAAABJRU5ErkJggg==
```

**clock.alarm.enabled**

Activate or deactivate alarm

**clock.alarm.time**

Alarm time with format ``HH:MM:SS`` or ``HH:MM`` - e.g. ``10:00:00`` or ``10:00``

**clock.alarm.wake_with_radio**

Wake with radio instead of alarm

### Timer

**countdown.configure**

Time in seconds

### Weather

**weather.forecast**

Displays the weather forecast