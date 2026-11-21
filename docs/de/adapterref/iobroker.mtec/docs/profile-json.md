---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mtec/docs/profile-json.md
title: Eingabeprofil `json`
hash: BnAv0u2EGuiQrXju9hPuiVEiFxeWwRAS9wX+AAb3sLA=
---
# Eingabeprofil `json`

Ein einfaches, allgemeines MQTT-Format: ein Thema pro Gerät, jede Nachricht ein JSON-Objekt mit allen aktuellen Werten und dem Messzeitpunkt. Jede Datenquelle kann dieses Format erzeugen, beispielsweise ein Node-RED-Flow, ein Skript oder ein eigener Modbus-Reader.

Das Profil ist für beide Geräte verfügbar: die Wärmepumpe und den Energy Butler.

## Themen

Ein Thema pro Gerät. Wählen Sie in den Instanzeinstellungen **JSON** als Datenquelle des Geräts aus und geben Sie dessen Thema ein:

| Gerät          | Standardthema               |
| -------------- | --------------------------- |
| Wärmepumpe     | `energy/heatpump/telemetry` |
| Energie-Butler | `energy/butler/telemetry`   |

Wenn Sie kein Gerät besitzen, setzen Sie dessen Datenquelle auf **„Nicht vorhanden“** . Bei **JSON** ist das Thema erforderlich.

## Nachricht

```json
{
  "name": "butler",
  "fields": {
    "battery_soc_percent": 81,
    "pv_total_power_w": 2300,
    "grid_import_power_w": 628,
    "grid_export_power_w": 0
  },
  "timestamp": 1791956345000
}
```

| Schlüssel   | Bedeutung                                              |
| ----------- | ------------------------------------------------------ |
| `fields`    | Objekt mit den Werten, Feldname → Zahl. Erforderlich.  |
| `timestamp` | Messzeit als Unix-Zeit in Millisekunden. Erforderlich. |
| `name`      | Optional, wird vom Adapter ignoriert.                  |

Die Werte sind einfache Zahlen. Ein-/Aus-Werte werden gesendet als `0` oder `1` Die

## Regeln

- **Messzeitpunkt:** Jeder Wert wird `timestamp` als es `ts` History-Adapter (InfluxDB, SQL) speichern daher den Zeitpunkt der Messung in Echtzeit, nicht den Zeitpunkt des Empfangs.
- **Doppelte und ältere Nachrichten** werden erkannt durch `timestamp` und verworfen: Eine Nachricht wird nur verarbeitet, wenn sie `timestamp` ist neuer als die zuletzt verarbeitete Datei. QoS 1 und Pufferung an der Quelle stellen daher kein Problem dar.
- **Zeitstempel, die mehr als 60 Sekunden in der Zukunft liegen,** werden abgelehnt. In diesem Fall ist die Uhr der Quelle oder des ioBroker-Hosts falsch.
- **Eine Nachricht stellt eine vollständige Momentaufnahme dar.** Senden Sie alle vorhandenen Felder in jeder Nachricht. Ein fehlendes oder nicht-numerisches Feld wird als Datenpunkt auf „false“ gesetzt. `null` mit Qualität `0x82` (Der Sensor meldete keinen Wert), daher bleibt kein alter Wert erhalten.
- **Fehlend ist nicht 0.** Wenn ein Sensor ausfällt, lassen Sie sein Feld weg, anstatt 0 zu senden. 0 ist ein gültiger Wert.
- **Neue Felder,** die unten nicht aufgeführt sind, werden automatisch als Zahlen erstellt und einmalig im Protokoll erfasst. Ihr Name wird Teil der Datenpunkt-ID und darf daher nur Kleinbuchstaben und Ziffern enthalten. `_` muss mit einem Buchstaben beginnen und darf nicht sein `info` oder `mtecmqtt` Andere Namen werden ignoriert und mit einer Warnung versehen.
- **Veraltete Daten:** Wenn die letzte Messung älter als der konfigurierte Grenzwert (Standard: 20 Sekunden) ist, `<device>.info.stale` wird `true` Es wird ein Sendeintervall von wenigen Sekunden (z. B. 5 s) empfohlen.
- **QoS und Retain:** Sowohl QoS 0 als auch 1 funktionieren. Retain ist nicht erforderlich; eine retainierte Nachricht wird wie jede andere verarbeitet. `info.stale` Man sieht ihm sein Alter an.

## Wärmepumpenfelder

Getestet mit einer M-TEC Wärmepumpe mit KEBA-Regler (AHPA-Serie).

| Feld                                          | Bedeutung                                                             | Einheit |
| --------------------------------------------- | --------------------------------------------------------------------- | ------- |
| `dhw_top_temperature_c`                       | Oberseite des Warmwasserspeichers                                     | °C      |
| `buffer_bottom_temperature_c`                 | Puffertankboden                                                       | °C      |
| `heating_flow_after_mixer_temperature_c`      | Heizkreislauf nach dem Mischer                                        | °C      |
| `flow_temperature_c`                          | Wärmepumpendurchfluss                                                 | °C      |
| `return_temperature_c`                        | Rücklauf der Wärmepumpe                                               | °C      |
| `outdoor_temperature_c`                       | Außentemperatur                                                       | °C      |
| `heatpump_target_temperature_c`               | Aktuelle Zieltemperatur                                               | °C      |
| `electrical_power_w`                          | Elektrische Energie                                                   | W       |
| `thermal_power_w`                             | Thermische Leistung                                                   | W       |
| `cop`                                         | Aktueller Leistungskoeffizient                                        | –       |
| `heating_water_mass_flow_kg_s`                | Heizwasser-Massenstrom                                                | kg/s    |
| `circulation_pump_percent`                    | Sollwert der Wärmepumpen-Umwälzpumpe ¹                                | %       |
| `compressor_setpoint_percent`                 | Kompressor-Sollwert ¹                                                 | %       |
| `heating_circuit_pump_state`                  | Separate Heizkreislaufpumpe an                                        | 0/1     |
| `heating_circuit_mixer_raw`                   | Mischer-Sollwert, vorzeichenbehafteter Rohwert²                       | –       |
| `dhw_heat_request`                            | Warmwasserbedarf                                                      | 0/1     |
| `buffer_heat_request`                         | Pufferwärmeanforderung                                                | 0/1     |
| `consuming_excess_energy`                     | Überschüssiger Energieverbrauch, wie vom Wärmepumpenregler gemeldet ³ | Status  |
| `operating_status_code`                       | Betriebsstatus siehe unten                                            | Code    |
| `operating_substatus_code`                    | Sequenzstatus (gerätespezifische Codes, nicht dekodiert)              | Code    |
| `dhw_sensor_status_code`                      | Sensorstatus Warmwasser                                               | 0 = OK  |
| `buffer_bottom_sensor_status_code`            | Sensorstatuspuffer unten                                              | 0 = OK  |
| `heating_flow_after_mixer_sensor_status_code` | Sensorstatus Heizkreisfluss                                           | 0 = OK  |
| `flow_sensor_status_code`                     | Sensorstatus Wärmepumpendurchfluss                                    | 0 = OK  |
| `outdoor_sensor_status_code`                  | Sensorstatus Außentemperatur                                          | 0 = OK  |

¹ Sollwerte, nicht gemessene Drehzahlen. ² Die Umrechnung in Prozent ist noch nicht bekannt. ³ Stammt vom Wärmepumpenregler und belegt keinen PV-Überschuss.

Betriebszustand: 0 Standby · 1 Vorlauf · 2 Aufheizen · 3 Abtauen · 4 Kühlen · 5 Nachlauf · 7 Sicherheitsabschaltung · 8 Fehler

`dhw_heat_request`, `buffer_heat_request` Und `heating_circuit_pump_state` werden zu booleschen Werten in ioBroker.

## Energie Butler Felder

| Feld                                   | Bedeutung                                | Einheit |
| -------------------------------------- | ---------------------------------------- | ------- |
| `battery_soc_percent`                  | Batterieladezustand                      | %       |
| `battery_charge_power_w`               | Ladeleistung                             | W, ≥ 0  |
| `battery_discharge_power_w`            | Entladeleistung                          | W, ≥ 0  |
| `battery_power_signed_w`               | Akkuleistung, + Entladen, − Laden        | W       |
| `battery_charge_discharge_status_code` | Akkumodus: 0 Entladung, 1 Ladung         | Code    |
| `grid_import_power_w`                  | Grid-Import                              | W, ≥ 0  |
| `grid_export_power_w`                  | Netzexport (Einspeisung)                 | W, ≥ 0  |
| `grid_total_power_signed_w`            | Netzleistung, − Import, + Export         | W       |
| `grid_phase_a_power_signed_w`          | Netzleistungsphase A, − Import, + Export | W       |
| `grid_phase_b_power_signed_w`          | Netzleistungsphase B, − Import, + Export | W       |
| `grid_phase_c_power_signed_w`          | Netzleistungsphase C, − Import, + Export | W       |
| `pv_total_power_w`                     | PV-Gesamtleistung                        | W       |
| `pv1_power_w`                          | PV-Eingang 1                             | W       |
| `pv2_power_w`                          | PV-Eingang 2                             | W       |
| `inverter_ac_power_signed_w`           | Wechselrichter-Wechselstrom              | W       |
| `inverter_operating_status_code`       | Wechselrichterstatus, siehe unten        | Code    |

Wechselrichterstatus: 0 Wartend · 1 Selbsttest · 2 Netzbetrieben · 3 Störung · 4 Firmware-Update · 5 Netzunabhängig

Die Analyse (`analysis.*`) verwendet `pv_total_power_w`, `grid_import_power_w`, `grid_export_power_w`, `battery_charge_power_w`, `battery_discharge_power_w` Und `battery_soc_percent` Ohne diese Felder liegen keine Angaben zum Haushaltsverbrauch, den Kosten oder dem Tageswert vor. Bitte senden Sie Import-/Export- und Lade-/Entladedaten als separate Felder ohne Vorzeichen.

## Beispiele

Mit `mosquitto_pub`:

```bash
mosquitto_pub -h <broker> -t energy/butler/telemetry \
  -m '{"fields":{"battery_soc_percent":81,"pv_total_power_w":2300,"grid_import_power_w":0,"grid_export_power_w":450,"battery_charge_power_w":1200,"battery_discharge_power_w":0},"timestamp":1791956345000}'
```

In einem Node-RED-Funktionsknoten vor einem MQTT-Ausgangsknoten (Thema) `energy/butler/telemetry`):

```js
msg.payload = {
    fields: {
        battery_soc_percent: flow.get('soc'),
        pv_total_power_w: flow.get('pv'),
    },
    timestamp: Date.now(), // better: the time the values were read
};
return msg;
```

## Überprüfung eines Brokers

`tools/mqtt-check.mjs` Lauscht einige Sekunden lang auf die Standardthemen und vergleicht die Felder mit den obigen Definitionen:

```bash
node tools/mqtt-check.mjs --host <broker> --user <user>
```