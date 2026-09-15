---
chapters: {"pages":{"en/adapterref/iobroker.otlp/README.md":{"title":{"en":"ioBroker.otlp"},"content":"en/adapterref/iobroker.otlp/README.md"},"en/adapterref/iobroker.otlp/docs/showcase.prom-graf.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.otlp/docs/showcase.prom-graf.md"}}}
---
This document describes a setup where the `ioBroker.otlp` adapter is used to forward window sensor data and send reminders 
if a window is detected  open for longer than `X` minutes.

## High Level Overview

```mermaid
flowchart
    
iobOtlp[[ioBroker OTLP Adapter]]

otlpGw(Open Telemetry Gateway)

prom[(Prometheus)]
grafana(Grafana)

telegram(Telegram)

iobOtlp -->|Custom Setting Config|iobOtlp
iobOtlp -->|Push Datapoints as Metrics| otlpGw

otlpGw -->|Remote Write| prom

grafana <-->|Tracks| prom
grafana -->|Push via Recording Rule| prom

grafana -->|Notification: Window Open > X Minutes| telegram
```

I have a few Matter-compatible window sensors which are connected to ioBroker. Each datapoint/state generates a timeseries 
for the same metric name (`contact-sensor-open`):

![img.png](./images/custom-setting.png)

This results in the `ioBroker.otlp` adapter publishing these metrics via `OTLP` to the configured open telemetry gateway/collector.
The collector is configured to push (remote-write) metrics into (stateless) `Prometheus`, which serves as my short-term storage for historical data.

__Note:__ Needless to say I _could_ store the data in a timeseries database like Influx too, but for this usecase I generally do not need or want
long-term storage. I will not be interested if my window was open _today_ in 3 months time; It's effectively useless data
after the window was closed.

Once the data is stored in prometheus it is queried by Grafana and rewritten with a recording rule:

![img.png](images/recording-rule.png)

This makes it a little bit easier to work with the data; Since promql is quite a headache when dealing with relative timestamps,
resets and missing data points.
The resulting metric looks like this - you can see where data points are missing because the window was closed for a long time:

![img.png](images/recorded-metric.png)

In the above screenshot you can see the (steadingly) increasing open times for the respective rooms.
With this in place, it's trivial to set up an alert that should be sent if any timeseries exceeds a specific threshold:

![img.png](images/alert.png)

The alert is set up to be delivered via Telegram, which seemed like the easiest `Contact-Point` to achieve and ships natively with Grafana:

![img.png](images/tg.png)