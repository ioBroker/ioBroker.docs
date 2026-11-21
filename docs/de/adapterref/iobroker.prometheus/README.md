---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.prometheus/README.md
title: ioBroker.prometheus
hash: r8Fugf+SQQbOngjvDsxekQqVWucudwrEDaDTbnOPV2g=
---
![Logo](../../../en/adapterref/iobroker.prometheus/admin/prometheus.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.prometheus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.prometheus.svg)
![Anzahl der Installationen](https://iobroker.live/badges/prometheus-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/prometheus-stable.svg)
![NPM](https://nodei.co/npm/iobroker.prometheus.png?downloads=true)
![Test und Freigabe](https://github.com/bloop16/ioBroker.prometheus/workflows/Test%20and%20Release/badge.svg)

# ioBroker.prometheus

## Prometheus-Adapter für ioBroker

Verbindet ioBroker bidirektional mit [Prometheus](https://prometheus.io/) : Es fragt Ihren Prometheus-Server über die HTTP-API ab und speichert aggregierte Abfrageergebnisse als ioBroker-Zustände. Außerdem kann es ausgewählte ioBroker-Zustände auf einem Server bereitstellen. `/metrics` Endpunkt für das Web-Scraping mit Prometheus. Die Konfiguration erfolgt visuell über die Admin-Oberfläche – **PromQL-Kenntnisse sind nicht erforderlich** .

**Prometheus® ist eine eingetragene Marke der Linux Foundation. Dieser Adapter ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zum Prometheus-Projekt oder der Linux Foundation und wird von diesen auch nicht unterstützt.**

## Merkmale

- Ein zentral konfigurierter Prometheus-Server (URL, optionale Basisauthentifizierung, Verbindungstest)
- Beliebig viele Quellen: Jede Quelle kombiniert eine Abfrage und ein Abfrageintervall
- Konfiguration der visuellen Abfrage:
  - **Metrische** Auswahlliste mit automatischer Suchfunktion, live geladen von `/api/v1/label/__name__/values`
  - **Metrikübersicht** : Zeigt die Anzahl der Datenreihen sowie alle Bezeichnungen und deren Werte der ausgewählten Metrik an, sodass Filter ohne Raten erstellt werden können.
  - **Aggregations-** Dropdown-Menü: letzter Wert, Durchschnitt, Summe, Minimum, Maximum, Anzahl der Reihen
  - **Filter** : Bis zu 5 Label/Wert-Paare – beide aus durchsuchbaren Dropdown-Listen ausgewählt, die live geladen werden `/api/v1/labels` Und `/api/v1/label/<name>/values` Kein Freitext erforderlich; durch Löschen einer Bezeichnung ("— kein Filter —") wird der Filter entfernt.
  - **Gruppieren nach** : Mehrfachauswahl von Bezeichnungen; es wird ein Zustand pro Kombination aus Bezeichnungswert erstellt
  - **Live-Vorschau** : Zeigt die generierte PromQL-Abfrage und ihr aktuelles Ergebnis vor dem Speichern an.
- Die PromQL-Abfrage wird immer serverseitig aus den strukturierten Feldern erstellt – niemals aus Freitext.
- Robustes Polling: Ein nicht erreichbarer Prometheus-Server führt niemals zum Absturz des Adapters; der Fehler wird protokolliert und in die Datei geschrieben. `error` Die Umfragen und die Erhebungen in den einzelnen Bundesstaaten werden im nächsten Zyklus fortgesetzt.
- Optionale HTTP-Basisauthentifizierung (gilt für alle Quellen)
- **Pull-Exporter** (separat aktivierbar): Stellt ausgewählte ioBroker-Zustände auf einem `/metrics` Endpunkt – Datenpunkte werden in den Objekteinstellungen jedes Zustands ausgewählt, ähnlich wie bei den InfluxDB/History-Adaptern.
- Scrape-Statistiken: `info.lastScrape`, `info.scrapeCount` Und `info.scrapeInterval` zeigen, wie oft Prometheus den Endpunkt tatsächlich abfragt.
- Kompaktmodus unterstützt

## Konfiguration

1. Geben Sie die Basis-URL Ihres Prometheus-Servers ein (z. B. `http://192.168.1.10:9090` — ein nackter `192.168.1.10:9090` Funktioniert auch) und verwenden Sie **„Verbindung testen“** , um dies zu überprüfen. Falls der Server eine HTTP-Basisauthentifizierung erfordert, geben Sie Benutzername und Passwort ein. Speichern Sie die Konfiguration einmal, damit die Live-Dropdown-Menüs die Servereinstellungen verwenden.
2. Fügen Sie eine Datenquelle hinzu und wählen Sie eine Metrik aus dem Dropdown-Menü aus – die Liste wird live vom Server geladen.
3. Wählen Sie eine Aggregation und optional Filter und Gruppierungsbezeichnungen.
4. Überprüfen Sie die Live-Vorschau: Sie zeigt die generierte Abfrage und ihr aktuelles Ergebnis an.
5. Wählen Sie ein Abfrageintervall und (optional) einen Zieldatenpfad aus und speichern Sie anschließend.

### HTTPS mit interner Zertifizierungsstelle

Wenn Ihr Prometheus-Server ein von einer internen (privaten) Zertifizierungsstelle signiertes Zertifikat verwendet, fügen Sie das Zertifikat der Zertifizierungsstelle im PEM-Format ein (einschließlich des Namens). `-----BEGIN CERTIFICATE-----` /`-----END CERTIFICATE-----` In das **benutzerdefinierte CA-Zertifikat** können mehrere Zertifikate (z. B. Stamm- und Zwischenzertifikate) nacheinander eingefügt werden. Diese werden zusätzlich zu den Standard-Stammzertifikaten als vertrauenswürdig eingestuft.

**Prüfen Sie nicht, ob das TLS-Zertifikat** beliebige Serverzertifikate akzeptiert. Dies dient ausschließlich Testzwecken, da die Verbindung anschließend nicht mehr vor Man-in-the-Middle-Angriffen geschützt ist.

## Exporter (ioBroker zu Prometheus)

Der Adapter kann auch in umgekehrter Richtung funktionieren: Er stellt ausgewählte ioBroker-Zustände auf einem `/metrics` Endpunkt (Prometheus Text Exposition Format), damit Ihr Prometheus-Server sie abrufen kann – wie ein Node Exporter für Ihr Smart Home.

1. Aktivieren Sie den Exporter in den Instanzeinstellungen (Port, Standardwert). `9126`).
2. Öffnen Sie die Objekteinstellungen eines beliebigen numerischen oder booleschen Datenpunkts und aktivieren Sie die Option **„Aktiviert“** auf der Registerkarte des Adapters, um ihn zu exportieren. Optional können Sie einen benutzerdefinierten Metriknamen festlegen (Standard: `iobroker_state` (mit Status-ID und -Name als Bezeichnungen). Nicht-numerische Status (Zeichenketten, Objekte) können nicht exportiert werden – Prometheus speichert nur Zahlen – und es wird anstelle der Einstellungen eine Benachrichtigung angezeigt. Änderungen werden sofort wirksam, ein Neustart des Adapters ist nicht erforderlich.
3. Fügen Sie Ihrem Projekt einen Scrape-Job hinzu. `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: iobroker
    static_configs:
      - targets: ["<iobroker-ip>:9126"]
```

Prometheus speichert jeden Scrape als Zeitreihen-Sample, sodass Verlauf und Grafana-Dashboards sofort funktionieren. Beachten Sie, dass Werte, die sich schneller als das Scrape-Intervall ändern, nur erfasst und nicht vollständig aufgezeichnet werden; boolesche Werte werden als 0/1 exportiert.

Der Endpunkt dient auch der Erfassung von Selbstmetriken. `iobroker_exporter_scrapes_total` Und `iobroker_exporter_exported_states` und der Adapter spiegelt die Scrape-Statistiken in die Staaten wider. `info.lastScrape`, `info.scrapeCount` Und `info.scrapeInterval` So können Sie die tatsächliche Abrufhäufigkeit direkt in ioBroker überprüfen.

## Geschaffene Staaten

Für jede Quelle erzeugt der Adapter die folgenden Zustände: `metrics.<target path>` (Der Pfad ist pro Quelle konfigurierbar und entspricht standardmäßig dem Quellnamen):

| Zustand        | Beschreibung                                                          |
| -------------- | --------------------------------------------------------------------- |
| `value`        | Das Abfrageergebnis (nur für Abfragen ohne Gruppierung nach)          |
| `<groupValue>` | Ein Status pro Label-Wert-Kombination (nur für Abfragen mit GROUP BY) |
| `query`        | Die generierte PromQL-Abfrage                                         |
| `lastUpdate`   | Zeitstempel der letzten erfolgreichen Aktualisierung                  |
| `error`        | Letzte Fehlermeldung; leer, obwohl alles in Ordnung ist               |

`info.connection` Ist `true` Alle aktivierten Datenquellen sind erreichbar (eine Abfrage, die keine Daten zurückgibt, gilt nicht als Verbindungsproblem). Wenn der Exporter aktiviert ist, `info.lastScrape`, `info.scrapeCount` Und `info.scrapeInterval` Die Abfragen Ihres Prometheus-Servers werden widergespiegelt.

## Bekannte Einschränkungen

- Zustände, die für nicht mehr existierende Gruppierungsbezeichnungen erstellt wurden, werden nicht automatisch gelöscht.
- Alle Quellen fragen den einzigen konfigurierten Prometheus-Server ab.

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