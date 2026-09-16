---
chapters: {"pages":{"en/adapterref/iobroker.otlp/README.md":{"title":{"en":"ioBroker.otlp"},"content":"en/adapterref/iobroker.otlp/README.md"},"en/adapterref/iobroker.otlp/docs/showcase.prom-graf.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.otlp/docs/showcase.prom-graf.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.otlp/docs/showcase.prom-graf.md
title: kein Titel
hash: B2beWNdXuMI18gGl/5LszXtkIB21tBwGQIWB6HtD/EQ=
---
Dieses Dokument beschreibt eine Konfiguration, bei der`ioBroker.otlp` Der Adapter dient dazu, Daten von Fenstersensoren weiterzuleiten und Benachrichtigungen zu versenden, wenn erkannt wird, dass ein Fenster länger als \[Anzahl der Tage] geöffnet ist.`X` Minuten.

## Überblick auf hoher Ebene

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

Ich habe einige Matter-kompatible Fenstersensoren, die mit ioBroker verbunden sind. Jeder Datenpunkt/Zustand generiert eine Zeitreihe für denselben Metriknamen (`contact-sensor-open` ):

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/custom-setting.png)

Dies führt zu Folgendem:`ioBroker.otlp` Adapter, der diese Metriken veröffentlicht über`OTLP` zum konfigurierten offenen Telemetrie-Gateway/Collector. Der Collector ist so konfiguriert, dass er Metriken (remote-write) in (zustandslos) überträgt.`Prometheus` , das mir als kurzfristiger Speicher für historische Daten dient.

**Anmerkung:** Selbstverständlich _könnte_ ich die Daten auch in einer Zeitreihendatenbank wie Influx speichern, aber für diesen Anwendungsfall benötige ich im Allgemeinen keine Langzeitspeicherung. Es interessiert mich nicht, ob mein Fenster _heute_ geöffnet war, wenn es in drei Monaten geschlossen ist; die Daten sind dann praktisch wertlos.

Sobald die Daten in Prometheus gespeichert sind, werden sie von Grafana abgefragt und mit einer Aufzeichnungsregel überschrieben:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/recording-rule.png)

Das erleichtert die Arbeit mit den Daten etwas; denn Promql ist ziemlich umständlich, wenn es um relative Zeitstempel, Resets und fehlende Datenpunkte geht. Die resultierende Metrik sieht folgendermaßen aus – man kann erkennen, wo Datenpunkte fehlen, weil das Fenster längere Zeit geschlossen war:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/recorded-metric.png)

Im obigen Screenshot sind die (stetig) zunehmenden Öffnungszeiten der jeweiligen Räume zu erkennen. Damit lässt sich problemlos eine Benachrichtigung einrichten, die versendet wird, sobald eine Zeitreihe einen bestimmten Schwellenwert überschreitet:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/alert.png)

Die Benachrichtigung wird über Telegram zugestellt, was am einfachsten erschien.`Contact-Point` um dies zu erreichen und nativ mit Grafana zu versenden:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/tg.png)