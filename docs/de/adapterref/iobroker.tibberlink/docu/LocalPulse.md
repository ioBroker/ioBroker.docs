---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/docu/LocalPulse.md
title: Direkte lokale Umfrage zu Pulse-Daten
hash: NcnxUD+dbX+iSpw4vdZmbmx/YSsZ9jhMfloSYtrkQmc=
---
# Direkte lokale Umfrage zu Pulse-Daten

_Teil der [ioBroker.tibberlink-Dokumentation](/#/adapters/tibberlink) ._

Damit das funktioniert, müssen Sie die Weboberfläche der Bridge so modifizieren, dass sie dauerhaft aktiviert bleibt. marq24 bietet eine hervorragende Schritt-für-Schritt-Anleitung dazu (für seine Home-Assistant-Integration, aber die Vorbereitung der Bridge ist identisch):

📖 **[Vorbereitungsleitfaden für die Tibberbrücke](https://github.com/marq24/ha-tibber-pulse-local/blob/main/preparation.md)** (siehe auch die [Projektübersicht](https://github.com/marq24/ha-tibber-pulse-local) ).

Wenn alles korrekt funktioniert, werden die Messdaten alle 2 Sekunden in die ioBroker-Zustände geschrieben.

## Bridge-Firmware-Endpunkte

Tibber Bridge Firmware ungefähr `1794-…` Die lokalen HTTP-JSON-Pfade wurden umbenannt:

| Zweck                  | Vermächtnis               | Neu (FW ≥1794)                 |
| ---------------------- | ------------------------- | ------------------------------ |
| Rohzähler-Telegramm    | `/data.json?node_id=N`    | `/node_data.json?node_id=N`    |
| Metriken / Meter-Modus | `/metrics.json?node_id=N` | `/node_metrics.json?node_id=N` |

Der Adapter versucht zunächst die neuen Pfade und greift bei HTTP 404 auf die alten zurück, sodass beide Firmware-Generationen weiterhin funktionieren. Siehe auch [ha-tibber-pulse-local#129](https://github.com/marq24/ha-tibber-pulse-local/discussions/129) und Issue #947.

Firmware ≥1794 hat auch die Metrik-JSON-Datei **umstrukturiert** : die ehemalige `node_status` /`hub_attachments` Objekte wurden ersetzt durch `node`, `ir` Und `hub`, Und `node_uptime_ms` wurde umbenannt in `node_uptime` (immer noch in Millisekunden). Der Adapter verarbeitet die umbenannte Betriebszeit und schreibt die Zustände unter den neuen Baum. Der alte `PulseInfo.node_status.*` /`PulseInfo.hub_attachments.*` Zustände werden zu Waisen; der Adapter entfernt beim Start automatisch alle PulseInfo-Zustände, die seit mehr als 14 Tagen nicht aktualisiert wurden (und löscht die leeren Ordner), sodass keine manuelle Bereinigung erforderlich ist.

## Unterstützte Messmodi

Die Tibber Bridge berichtet von einem `meter_mode` für den angeschlossenen Netzzähler. Der Adapter unterstützt beide von gängigen Zählern verwendeten Telegrammkodierungen:

| `meter_mode` | Codierung                                                          | Beispielmeter              |
| ------------ | ------------------------------------------------------------------ | -------------------------- |
| 1            | Klarer OBIS-Text                                                   | ZPA GH305                  |
| 3            | Binäres SML                                                        | ISKRA, EasyMeter, EMH, EFR |
| 4            | Einfacher OBIS-Text (oder binäres SML bei einigen EMH-Messgeräten) | eBZ DD3                    |
| 5            | Klarer OBIS-Text                                                   | eBZ                        |

Falls Ihr Messgerät einen anderen Modus meldet oder sich nicht aktualisiert, erstellen Sie bitte ein Ticket mit dem unformatierten HEX-Telegramm aus dem Debug-Log. Vollständige technische Details finden Sie unter: [../info/PulseMeterModes.md](/#/docs/adapterref/iobroker.tibberlink/info/PulseMeterModes.md) .