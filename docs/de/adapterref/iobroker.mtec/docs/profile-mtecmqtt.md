---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md
title: Eingabeprofil `mtecmqtt`
hash: JkdAfxiQ6zpI0u7w4t1tOnGNN0nKs32zXcLkK2kKS88=
---
# Eingabeprofil `mtecmqtt`
Der Adapter liest den Energy Butler aus der MQTT-Ausgabe von [MTECmqtt](https://github.com/croedel/MTECmqtt), einem separaten Open-Source-Projekt, das den Energy Butler via Modbus ausliest und die Werte an einen MQTT-Broker sendet. Der Adapter liest ausschließlich diese MQTT-Nachrichten; er enthält keinen Code von MTECmqtt. Das Format wurde mit MTECmqtt 2.1.0 geprüft.

Die Wärmepumpe ist nicht Teil von MTECmqtt. Sie können sie aber trotzdem gleichzeitig mit [`json`-Profil](/#/docs/adapterref/iobroker.mtec/docs/profile-json.md) auslesen.

## Aufstellen
1. Starten Sie MTECmqtt und lassen Sie es an Ihren Broker senden.
2. Wählen Sie in den Instanzeinstellungen **MTECmqtt** als Datenquelle des Energy Butler aus und geben Sie denselben Broker ein.
3. **Themenpräfix:** der Wert von `MQTT_TOPIC` in der MTECmqtt-Konfiguration (Standardwert `MTEC`).
4. **Seriennummer:** optional. Ein leeres Feld bedeutet, dass der Adapter die erste erkannte Seriennummer verwendet und in `butler.info.serial` anzeigt. Bei mehreren Energy Butlern verwenden Sie für jedes Gerät eine separate Instanz und geben Sie die Seriennummer in jeder Instanz ein.

Der Adapter abonniert `<prefix>/<serial or +>/#` mit QoS 0. Home Assistant-Erkennungsthemen (`homeassistant/…`) werden nicht gelesen.

## Was MTECmqtt sendet
- Ein Thema pro Wert: `<Präfix>/<Seriennummer>/<Gruppe>/<Name>`, Nutzlast Klartext (`"38.400"`, `"-628"`, `"0"`), keine Messzeit.
Etwa alle 10 Sekunden liest und veröffentlicht MTECmqtt die Gruppe `now-base`. Die anderen `now-*`-Gruppen (`now-grid`, `now-inverter`, `now-backup`, `now-battery`, `now-pv`) werden abwechselnd, jeweils eine pro Schleife, verarbeitet, sodass jede von ihnen nur etwa alle 50 Sekunden erscheint. `day` folgt etwa alle 5 Minuten, `total` etwa alle 5 Minuten und `config` etwa stündlich.

## Wie der Adapter es verarbeitet
- **Ein Datensatz pro Schleife:** Die Werte treffen nacheinander ein. Der Adapter sammelt sie, bis die Themen 2 Sekunden lang keine Daten mehr enthalten oder bis sich ein Wert wiederholt (die nächste Schleife hat begonnen), und verarbeitet sie als einen Datensatz.
**Zeit:** MTECmqtt sendet keine Messzeit, daher wird der Zeitpunkt des Empfangs des ersten Werts einer Schleife als `ts` verwendet. Duplikate oder zwischengespeicherte alte Nachrichten können so nicht erkannt werden; bei QoS 0 gibt es keine.
- **Fehlend = null, pro Gruppe:** Eine Gruppe, die Teil des Datensatzes ist, setzt ihre fehlenden oder nicht-numerischen Felder auf „null“ (Qualität „0x82“). Gruppen, die nicht Teil des Datensatzes sind, behalten ihre Werte: Die Werte für Phase und PV werden zwischen den Runden nicht auf „null“ gesetzt.
**Veraltete Daten:** `butler.info.stale` und `butler.info.lastMeasurement` folgen `now-base` mit dem normalen Limit (Standardwert 20 s). Die Phasenwerte (`now-grid`) und PV-Zeichenkettenwerte (`now-pv`) haben ein eigenes, längeres Limit (Standardwert 180 s); ohne neue Werte über diesen Zeitraum werden sie auf `null` gesetzt.

## Kartierung
| Datenpunkt `butler.…` | MTECmqtt | Hinweis |
| `battery_soc_percent` | `now-base/battery_soc` | % |
| `battery_power_signed_w` | `now-base/battery` | + Entladen, − Laden ¹ |
| `battery_charge_power_w` / `battery_discharge_power_w` | abgeleitet von `battery` | |
| `battery_charge_discharge_status_code` | `now-base/battery_mode` | 0 entladen, 1 laden |
| `grid_total_power_signed_w` | `now-base/grid_power` | + Export, − Import ¹ |
| `grid_import_power_w` / `grid_export_power_w` | abgeleitet von `grid_power` | |
| `grid_phase_a/b/c_power_signed_w` | `now-grid/grid_a`, `grid_b`, `grid_c` | etwa alle 50 s |
| `pv_total_power_w` | `now-base/pv` | |
| `pv1_power_w` / `pv2_power_w` | `now-pv/pv_1`, `pv_2` | etwa alle 50 s |
| `inverter_ac_power_signed_w` | `now-base/inverter` | |
| `inverter_operating_status_code` | `now-base/inverter_status` | gleiche Codes |
| `inverter_operating_status_code` | `now-base/inverter_status` | gleiche Codes |

¹ Die Vorzeichen basieren auf der Dokumentation und den Formeln von MTECmqtt. Sie müssen noch anhand realer Daten bestätigt werden - Feedback im Forum oder als GitHub-Issue ist sehr willkommen.

**Alle anderen Werte** (Spannungen, Ströme, Frequenzen, Temperaturen, Batterieladezustand (SOH), Backup-Werte, Betriebsmodus, Energiezähler, Seriennummer, Firmware-Version usw.) werden als `butler.mtecmqtt.<group>.<name>` beibehalten, z. B. `butler.mtecmqtt.now_base.battery_voltage` oder `butler.mtecmqtt.total.pv_total`. Gruppe und Name werden in Kleinbuchstaben umgewandelt, Zeichen außer Buchstaben, Ziffern und `_` werden zu `_`. Zahlen werden zu numerischen Datenpunkten, alles andere zu Text. Einheiten werden hinzugefügt, wo die Benennung von MTECmqtt dies eindeutig macht (V, A, Hz, °C, W, kWh, %).

## Tageswerte der Energiezähler
MTECmqtt sendet die tatsächlichen täglichen Energiezählerwerte in der Gruppe `day`. Sie ersetzen die Schätzung der Analyse:

| `analysis.today.…` | MTECmqtt |
| `pv_kwh` | `day/pv_day` |
| `grid_import_kwh` | `day/grid_purchase_day` |
| `grid_export_kwh` | `day/grid_feed_day` |
| `battery_charge_kwh` | `day/battery_charge_day` |
| `battery_discharge_kwh` | `day/battery_discharge_day` |
| `battery_discharge_kwh` | `day/battery_discharge_day` |

Mit allen fünf Zählern werden auch `house_kwh`, `cost`, `savings` und `autarky_percent` neu berechnet. Zwischen zwei Zählerablesungen (ca. 5 Minuten) wird die Schätzung anhand der letzten Ablesung fortgesetzt.

Unmittelbar nach Mitternacht sendet MTECmqtt möglicherweise noch einige Minuten lang die gestrigen Gesamtwerte. In den ersten 30 Minuten eines Tages übernimmt der Adapter daher nur Zähler, die sichtbar zurückgesetzt wurden; nach einem Neustart in diesem Zeitraum wartet er bis 00:30 Uhr und verwendet bis dahin den Schätzwert.

## Unterschiede zu den eigenen Werten von MTECmqtt
MTECmqtt berechnet den aktuellen Hausverbrauch als `inverter − grid_power`. Der Adapter nutzt PV-Anlage, Netzstrom und Batterie (`pv + import + discharging − export − charging`). Die Werte können geringfügig voneinander abweichen, beispielsweise aufgrund von Wechselrichterverlusten. Für die Tageswerte verwenden beide dieselbe Formel.