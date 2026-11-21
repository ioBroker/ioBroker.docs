![Logo](admin/prometheus.png)
# ioBroker.prometheus

[![NPM version](https://img.shields.io/npm/v/iobroker.prometheus.svg)](https://www.npmjs.com/package/iobroker.prometheus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.prometheus.svg)](https://www.npmjs.com/package/iobroker.prometheus)
![Number of Installations](https://iobroker.live/badges/prometheus-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/prometheus-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.prometheus.png?downloads=true)](https://nodei.co/npm/iobroker.prometheus/)

**Tests:** ![Test and Release](https://github.com/bloop16/ioBroker.prometheus/workflows/Test%20and%20Release/badge.svg)

## prometheus adapter for ioBroker

Connects ioBroker with [Prometheus](https://prometheus.io/) in both directions: it polls your
Prometheus server via the HTTP API and stores aggregated query results as ioBroker states, and
it can expose selected ioBroker states on a `/metrics` endpoint for scraping by Prometheus.
Everything is configured visually in the Admin UI — **no PromQL knowledge required**.

**Prometheus® is a registered trademark of The Linux Foundation. This adapter is an independent
community project and is not affiliated with or endorsed by the Prometheus project or The Linux Foundation.**

## Features

* One centrally configured Prometheus server (URL, optional basic auth, connection test)
* Any number of sources: each source combines one query and one poll interval
* Visual query configuration:
  * **Metric** picker with type-ahead search, loaded live from `/api/v1/label/__name__/values`
  * **Metric overview**: shows series count plus all labels and their values of the selected
    metric, so filters can be built without guessing
  * **Aggregation** dropdown: last value, average, sum, minimum, maximum, count of series
  * **Filters**: up to 5 label/value pairs — both selected from searchable dropdowns loaded
    live from `/api/v1/labels` and `/api/v1/label/<name>/values`, no free text needed;
    clearing a label ("— no filter —") removes the filter
  * **Group by**: multi-select of labels; one state per label value combination is created
  * **Live preview**: shows the generated PromQL query and its current result before saving
* The PromQL query is always built server-side from the structured fields — never from free text
* Robust polling: an unreachable Prometheus server never crashes the adapter; the error is logged,
  written to the `error` state and polling continues with the next cycle
* Optional HTTP basic auth (applied to all sources)
* **Pull exporter** (separately activatable): exposes selected ioBroker states on a `/metrics`
  endpoint — datapoints are chosen in the object settings of each state, like with the
  influxdb/history adapters
* Scrape statistics: `info.lastScrape`, `info.scrapeCount` and `info.scrapeInterval` show how
  often Prometheus actually scrapes the endpoint
* Compact mode supported

## Configuration

1. Enter the base URL of your Prometheus server (e.g. `http://192.168.1.10:9090` — a bare
   `192.168.1.10:9090` works too) and use **Test connection** to verify it. If the server
   requires HTTP basic auth, enter username and password. Save the configuration once so the
   live dropdowns use the server settings.
2. Add a source and pick a metric from the dropdown — the list is loaded live from the server.
3. Choose an aggregation and optionally filters and group-by labels.
4. Check the live preview: it shows the generated query and its current result.
5. Choose a poll interval and (optionally) a target datapoint path, then save.

### HTTPS with an internal CA

If your Prometheus server uses a certificate signed by an internal (private) CA, paste the CA
certificate in PEM format (including the `-----BEGIN CERTIFICATE-----` / `-----END CERTIFICATE-----`
lines) into **Custom CA certificate**. Several certificates (e.g. root and intermediate) can be
pasted one after another. They are trusted in addition to the default root certificates.

**Do not verify the TLS certificate** accepts any server certificate. It is meant for testing
only, because the connection is then no longer protected against man-in-the-middle attacks.

## Exporter (ioBroker to Prometheus)

The adapter can also work in the opposite direction: it exposes selected ioBroker states on a
`/metrics` endpoint (Prometheus text exposition format) so your Prometheus server can scrape
them — like a node exporter for your smart home.

1. Enable the exporter in the instance settings (port, default `9126`).
2. Open the object settings of any numeric or boolean datapoint and tick **Enabled** on the
   adapter's tab to export it. Optionally set a custom metric
   name (default: `iobroker_state` with the state id and name as labels). Non-numeric states
   (strings, objects) cannot be exported — Prometheus stores numbers only — and a notice is
   shown instead of the settings. Changes take effect immediately, no adapter restart needed.
3. Add a scrape job to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: iobroker
    static_configs:
      - targets: ["<iobroker-ip>:9126"]
```

Prometheus stores every scrape as a time series sample, so history and Grafana dashboards work
out of the box. Note that values changing faster than the scrape interval are sampled, not
recorded completely; booleans are exported as 0/1.

The endpoint also serves the self-metrics `iobroker_exporter_scrapes_total` and
`iobroker_exporter_exported_states`, and the adapter mirrors the scrape statistics into the
states `info.lastScrape`, `info.scrapeCount` and `info.scrapeInterval` so you can verify the
actual scrape frequency directly in ioBroker.

## Created states

For each source the adapter creates the following states below `metrics.<target path>`
(the path is configurable per source and defaults to the source name):

| State | Description |
|-------|-------------|
| `value` | The query result (only for queries without group-by) |
| `<groupValue>` | One state per label value combination (only for queries with group-by) |
| `query` | The generated PromQL query |
| `lastUpdate` | Timestamp of the last successful update |
| `error` | Last error message; empty while everything is ok |

`info.connection` is `true` while all enabled sources are reachable (a query returning no
data does not count as a connection problem). With the exporter enabled, `info.lastScrape`,
`info.scrapeCount` and `info.scrapeInterval` reflect the scrapes by your Prometheus server.

## Known limitations

* States created for group-by label values that no longer exist are not deleted automatically.
* All sources query the single configured Prometheus server.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2026-11-15)
- (bloop16) Object settings: removed the duplicate export checkbox, the built-in "Enabled" checkbox now controls the export alone
- (bloop16) HTTPS servers signed by an internal CA are supported: a custom CA certificate can be configured, certificate verification can optionally be disabled (#15)
- (bloop16) Exporter: unacknowledged commands (ack=false) are no longer exported
- (bloop16) Connection type set to "cloud", as the Prometheus server can be remote
- (bloop16) Added the missing translations of the "Test connection" result
- (bloop16) Dependencies have been updated

### 1.0.1 (2026-10-18)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.0 (2026-09-15)

- (Martin Rauscher) initial release
- visual query builder: live metric/label/value dropdowns, metric overview, aggregation,
  filters, group-by and live preview - no PromQL knowledge required
- per-source poll interval; group-by results create one state per label value combination
- pull exporter: expose selected ioBroker states on /metrics (per-datapoint activation in the
  object settings), including scrape statistics

Older changes can be found in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 Martin Rauscher <bloop16@hotmail.com>

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