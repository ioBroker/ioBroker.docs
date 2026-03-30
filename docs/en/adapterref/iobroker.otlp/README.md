![Logo](admin/otlp.png)
# ioBroker.otlp

[![NPM version](https://img.shields.io/npm/v/iobroker.otlp.svg)](https://www.npmjs.com/package/iobroker.otlp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.otlp.svg)](https://www.npmjs.com/package/iobroker.otlp)
![Number of Installations](https://iobroker.live/badges/otlp-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/otlp-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.otlp.png?downloads=true)](https://nodei.co/npm/iobroker.otlp/)

**Tests:** ![Test and Release](https://github.com/OlliMartin/ioBroker.otlp/workflows/Test%20and%20Release/badge.svg)

## Open Telemetry Protocol (OTLP) Adapter for ioBroker

This adapter allows pushing historical data into an OTLP-compatible gateway.

_Retrieval_ of historical data is - by design - __not__ possible.
Since data points/states are published as metrics, _only numerical values_ can be written.

## Why?

Exporting data points - well `number` and `boolean` - into a OTLP compatible gateway allows to abstract from the 
underlying data store. 

With the great number of open telemetry exporters available, this project functions as an adapter
to storage like
- [Prometheus](https://prometheus.io/)/[Mimir](https://github.com/grafana/mimir)
- InfluxDB (obviously not as powerful as the [existing adapter](https://github.com/ioBroker/ioBroker.influxdb/tree/master))
- Kafka

These storage backends are configured within the open telemetry collector (which is the target of this service), 
where further customization may be applied. If a non-numerical state is enabled for export, 
it will be _ignored_ and no data will be written.

## Non Goals

**All data points/states must be boolean or number, since they are treated as a metric, more specifically a Gauge.**

A string or even complex object as a metric just does not make sense; And it would not work. 
There will never be support for anything besides numbers and boolean.

## Instance Configuration

The following options can be set in the Admin UI of the adapter:

| Key                     | Description                                                                                                                                                                         |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Protocol                | The protocol of the server (`http` or `https`). This is _not_ the OTLP!                                                                                                             |
| Open Telemetry Protocol | The protocol used to send telemetry data/metrics (`gRPC` or `http (protobuf)`)                                                                                                      |
| Host                    | The hostname of the target server/otelcol gateway                                                                                                                                   |
| Port                    | The port of the otelcol gateway. Usually `4317 (gRPC)`  or `4318 (http)`                                                                                                            |
| Meter Name              | The name of the create SDK meter. Usually this is only SDK internal                                                                                                                 |
| Headers                 | A key-value list of headers to add to each request. This is how _authentication_ may be configured                                                                                  |
| Resource Attributes     | A key-value list of [resource attributes](https://opentelemetry.io/docs/concepts/resources/#introduction) to globally populate                                                      |   

## Custom State Configuration

The adapter allows to enable the export of metrics on a per-state basic, which can be configured like any other history adapter.
If a value for `aliasId` is provided, this is what will be used as the metric name.

__Note:__ Depending on the timeseries storage backend it can happen that parts of the metric are renamed. 
For example, Prometheus will replace dot withs underscores, so `my.metric` as alias id will be stored as `my_metric`.

In addition to the `aliasId` a list of attributes, i.e. key-value pairs, may be specified for each exported value. 

### Showcases

Refer to the showcases below for practical examples:

* [Prometheus & Grafana: Detect open windows](./docs/showcase.prom-graf.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2025-12-28)

* (OlliMartin) Implement connection test by exporting (empty) dummy metric and shutdown on error
* (OlliMartin) Recreate all meters on custom config change; Fixes alias renames only taking affect after adapter restart
* (OlliMartin) Fix [issue #3](https://github.com/OlliMartin/ioBroker.otlp/issues/3) where configured headers would not be applied correctly to the respective exporter
* (OlliMartin) Translate admin & custom UI (i18n)
* (OlliMartin) Add missing layout column definitions to custom settings UI
* (OlliMartin) Remove unnecessary `noTranslation` flags
* (OlliMartin) Remove `.stop()` call on invalid configuration

### 0.0.3 (2025-12-20)

* (OlliMartin) Include MIT Copyright Notice from [ioBroker.influxdb](https://github.com/ioBroker/ioBroker.influxdb)

### 0.0.2 (2025-12-20)

* (OlliMartin) Fix invalid number-range in MeterName (type: text)

### 0.0.1 (2025-12-20)
* (OlliMartin) Final cleanup & release first stable

### 0.0.1-rc.5 (2025-12-20)

* (OlliMartin) More cleanup

### 0.0.1-rc.4 (2025-12-20)

* (OlliMartin) Update logo (transparent background)

### 0.0.1-rc.3 (2025-12-20)

* (OlliMartin) Still trying to automate release

### 0.0.1-rc.2 (2025-12-20)

* (OlliMartin) preparing automated release

### **0.0.1-rc.1 (20.12.2025)**
* (OlliMartin) initial release
  * Basic OTLP exporter functionality (periodic exporting)
  * gRPC or HTTP otlp transport

## License
MIT License

Copyright (c) 2026 OlliMartin <oss@ollimart.in>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
