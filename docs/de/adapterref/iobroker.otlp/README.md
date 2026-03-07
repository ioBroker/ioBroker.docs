---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.otlp/README.md
title: ioBroker.otlp
hash: WM/o7c2ViljimveNTcymHQn2sgtCGqgGQra+T/HfGBs=
---
![Logo](../../../en/adapterref/iobroker.otlp/admin/otlp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.otlp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.otlp.svg)
![Anzahl der Installationen](https://iobroker.live/badges/otlp-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/otlp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.otlp.png?downloads=true)

# IoBroker.otlp
**Tests:** ![Test und Freigabe](https://github.com/OlliMartin/ioBroker.otlp/workflows/Test%20and%20Release/badge.svg)

## Open Telemetry Protocol (OTLP) Adapter für ioBroker
Dieser Adapter ermöglicht das Übertragen historischer Daten an ein OTLP-kompatibles Gateway.

Der Abruf historischer Daten ist – systembedingt – nicht möglich.
Da Datenpunkte/Zustände als Metriken veröffentlicht werden, können nur numerische Werte geschrieben werden.

## Warum?
Durch den Export von Datenpunkten – genauer gesagt `number` und `boolean` – in ein OTLP-kompatibles Gateway kann vom zugrunde liegenden Datenspeicher abstrahiert werden.

Angesichts der Vielzahl verfügbarer offener Telemetrie-Exporteure fungiert dieses Projekt als Adapter für Speicher wie

- [Prometheus](https://prometheus.io/)/[Mimir](https://github.com/grafana/mimir)
- InfluxDB (offensichtlich nicht so leistungsstark wie der [vorhandene Adapter](https://github.com/ioBroker/ioBroker.influxdb/tree/master))
- Kafka

Diese Speicher-Backends werden innerhalb des offenen Telemetrie-Collectors (dem Ziel dieses Dienstes) konfiguriert, wo weitere Anpassungen vorgenommen werden können. Wenn ein nicht-numerischer Status für den Export aktiviert ist, wird dieser ignoriert und es werden keine Daten geschrieben.

## Nicht-Tore
**Alle Datenpunkte/Zustände müssen boolesche Werte oder Zahlen sein, da sie als Metrik, genauer gesagt als Messgröße, behandelt werden.**

Zeichenketten oder auch komplexe Objekte als Metrik zu verwenden, ist einfach nicht sinnvoll; und es würde nicht funktionieren. Es wird niemals Unterstützung für etwas anderes als Zahlen und boolesche Werte geben.

## Instanzkonfiguration
Folgende Optionen können in der Admin-Benutzeroberfläche des Adapters festgelegt werden:

| Legende | Beschreibung |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Protokoll | Das Protokoll des Servers (`http` oder `https`). Dies ist _nicht_ das OTLP! |
| Offenes Telemetrieprotokoll | Das Protokoll, das zum Senden von Telemetriedaten/Metriken verwendet wird (`gRPC` oder `http (protobuf)`) |
| Port | Der Port des otelcol-Gateways. Normalerweise `4317 (gRPC)` oder `4318 (http)` |
| Port | Der Port des otelcol-Gateways. Normalerweise `4317 (gRPC)` oder `4318 (http)`. |
| Zählername | Der Name des erstellten SDK-Zählers. Normalerweise ist dies nur intern im SDK. |
| Ressourcenattribute | Eine Schlüssel-Wert-Liste von [Ressourcenattribute](https://opentelemetry.io/docs/concepts/resources/#introduction) zur globalen Befüllung |
| Ressourcenattribute | Eine Schlüssel-Wert-Liste von [Ressourcenattributen](https://opentelemetry.io/docs/concepts/resources/#introduction) zur globalen Befüllung |

## Benutzerdefinierte Statuskonfiguration
Der Adapter ermöglicht den Export von Metriken pro Status, der wie jeder andere Verlaufsadapter konfiguriert werden kann.
Wenn ein Wert für `aliasId` angegeben wird, wird dieser als Metrikname verwendet.

Hinweis: Je nach verwendetem Speichersystem für Zeitreihen kann es vorkommen, dass Teile der Metrik umbenannt werden.
Beispielsweise ersetzt Prometheus Punkte durch Unterstriche, sodass die Alias-ID `my.metric` als `my_metric` gespeichert wird.

Zusätzlich zu den `aliasId` kann für jeden exportierten Wert eine Liste von Attributen, d. h. Schlüssel-Wert-Paaren, angegeben werden.

### Präsentationen
In den folgenden Beispielen finden Sie praktische Anwendungsbeispiele:

* [Prometheus & Grafana: Offene Fenster erkennen](./docs/showcase.prom-graf.md)

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