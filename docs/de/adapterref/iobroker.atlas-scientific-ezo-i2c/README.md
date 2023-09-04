---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.atlas-scientific-ezo-i2c/README.md
title: ioBroker.atlas-scientific-ezo-i2c
hash: v9RAK7QEG5BrWsrUSr+aIbnA5Z3BCv9GgjX7ZtuS+MM=
---
![Logo](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/admin/atlas-scientific-ezo-i2c.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.atlas-scientific-ezo-i2c.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.atlas-scientific-ezo-i2c.svg)
![Anzahl der Installationen](https://iobroker.live/badges/atlas-scientific-ezo-i2c-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/atlas-scientific-ezo-i2c-stable.svg)
![NPM](https://nodei.co/npm/iobroker.atlas-scientific-ezo-i2c.png?downloads=true)

# IoBroker.atlas-scientific-ezo-i2c
**Tests:** ![Test und Freigabe](https://github.com/Buzze11/ioBroker.atlas-scientific-ezo/workflows/Test%20and%20Release/badge.svg)

### Wenn Ihnen dieser Adapter gefällt, lesen Sie ihn bitte bis zum Ende und helfen Sie mir, meine Bemühungen zu spenden
Ich freue mich über jede einzelne Person, die ich dabei unterstützen kann, diese großartigen Sensoren von Atlas Scientific in ihr eigenes Zuhause zu integrieren, und ich hoffe, Sie können sich vorstellen, wie viel Zeit und Mühe eine solche Adapterentwicklung mit sich bringt. Trotzdem bin ich sehr dankbar dafür Helfen Sie mir mit einer Spende über Paypal.

[![Mit PayPal spenden](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=7PGJFJX8X3Y82)

## Atlas Scientific EZO I2C-Adapter für ioBroker
Dieser ioBroker-Adapter integriert mehrere Atlas Scientific EZO-Geräte https://atlas-scientific.com/ in Ihre eigene ioBroker-Umgebung. Die EZO-Geräte müssen für den I2C-Bus konfiguriert und auf einem Gerät (z. B. RaspberryPi) mit konfiguriertem und aktiviertem I2C-Bus montiert werden.

### Derzeit unterstützte Geräte
* EZO DO – Gelöster Sauerstoff -> https://atlas-scientific.com/dissolved-oxygen
* EZO ORP – Oxidations-Reduktionspotential -> https://atlas-scientific.com/orp
* EZO pH – Potenzial von Wasserstoff -> https://atlas-scientific.com/ph
* EZO RTD – Widerstandstemperaturdetektor -> https://atlas-scientific.com/temperature
* EZO PMP – Embedded Peristaltic Dosing Pump -> https://atlas-scientific.com/peristaltic/ezo-pmp/ (ungetestet aufgrund fehlender Hardware)
* EZO EC – Elektrische Leitfähigkeit -> https://atlas-scientific.com/conductivity

### Zukünftige Unterstützung
* Bitte erstellen Sie ein Feature-Request-Problem, wenn Sie über weitere Implementierungen nachdenken

## Erste Schritte
### Installation
Stellen Sie insbesondere sicher, dass Sie I2C auf Ihrem System ordnungsgemäß konfiguriert und aktiviert haben (falls erforderlich):

- [I2C auf dem Raspberry Pi konfigurieren](https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)

### Setup-Adapter
Nach der Adapterinstallation und der Vorkonfiguration auf dem RaspberryPi finden Sie den neuen Adapter im Abschnitt „Instaces“, wo Sie Ihre Sensoren weiter konfigurieren können.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/adapter_instance.png)

Mit einem Klick auf das Schraubenschlüssel-Symbol erscheint ein neues Einstellungsfenster, in dem bereits die Registerkarte „Allgemein“-Einstellungen ausgewählt ist.

Hier müssen Sie die I2C-Nummer in das Textfeld eingeben, das auf dem Raspberry Pi konfiguriert wurde (0 oder 1). Anschließend können Sie über den „Gerätesuche“-Button nach allen angeschlossenen EZO-Schaltkreisen suchen. Die erkannten Geräteadressen werden auf der linken Seite aufgelistet.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/device_search.png)

Mit einem Klick auf eines der erkannten Geräte erscheint der „unkonfigurierte“ Gerätebildschirm.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/unconfigured_device.png)

Klicken Sie auf das Dropdown-Menü, um den Typ Ihres gewünschten Geräts auszuwählen.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/device_selector.png)

Nachdem Sie den Gerätetyp ausgewählt haben, erscheint der Einstellungsbildschirm für das gewünschte Gerät. Wiederholen Sie diese Schritte für jedes Gerät, das Sie verwenden möchten.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/configured_device.png)

## Allgemeine Konfiguration (alle Geräte)
* **Adresse:** Nicht anpassbar (außer Änderung der IP-Adresse)
* **Gerätetyp:** Dropdown-Liste für den gewünschten Gerätetyp
* **Name:** Name des Geräts, der später auf dem Gerät gespeichert wird (Leerzeichen werden entfernt. Bei mehr als 16 Zeichen werden nur die ersten 16 gesendet.)
* **Abfrageintervall:** Intervall in Millisekunden für die Gerätewertabfrage. Wenn > 0, liest das Gerät alle Werte in diesem Intervall. Bitte erhöhen Sie die Intervallzeit, wenn Sie falsche Messwerte erhalten. Ich schlage vor, mindestens mit 15000 ms zu beginnen
* **Aktiver Schalter:** Schalter zum Aktivieren oder Deaktivieren der Verwendung dieses Sensors
* **LED-Aktivschalter:** Mit dieser Einstellung können Sie die LED am EZO-Gerät aktivieren oder deaktivieren

### Gemeinsame Funktionalitäten (alle Geräte)
* **„Find EZO Board“-Button** -> Mit einem Klick auf diesen Button beginnt die LED auf dem EZO Board schnell zu blinken.
* **"Factory Reset"-Button** -> Führen Sie einen Werksreset für dieses Gerät durch
* **"Change I2C Address"-Button** -> Hier können Sie eine neue I2C-Adresse für diesen Adapter programmieren. Bitte stellen Sie sicher, dass Sie die Konfiguration anschließend speichern.

### Gemeinsame Zustände/Objekte (alle Geräte)
In einigen Staaten ist ein Mechanismus zur Erkennung von Zustandsänderungen aktiv, der die Möglichkeit bietet, dass einige Werte nicht nur über die Admin-Benutzeroberfläche, sondern zusätzlich auch durch Änderungen direkt am Zustandswert von außen festgelegt werden können. (z. B. per Skript oder manuell) Dies kann beispielsweise nützlich sein, wenn Sie Kompensationswerte von einem Sensor wie der Temperatur verwenden möchten, um den Temperaturkompensationswert am PH-Sensor anzupassen.

* **"IsPaused"** -> Schalten Sie um, um alle Messwerte vom Gerät vorübergehend anzuhalten, es sei denn, es ist während der Laufzeit „Aktiv“. true = pausiert, false = Messungen aktiv. Der Wert ist beim Start/Neustart des Adapters standardmäßig auf „false“ (Messung aktiv) eingestellt.

## DO-bezogene Funktionen und Einstellungen
### DO Admin-UI-Elemente
![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/do_config.png)

* **"Kalibrierung löschen"-Button** -> Kalibrierungsdaten löschen
* **"Atmosphärisch kalibrieren"-Button** -> Kalibrieren auf den Luftsauerstoffgehalt
* **„Calibrate 0DO“-Button** -> Gerät auf 0 gelösten Sauerstoff kalibrieren
* **"Set Temp. Compensation"-Button** -> Stellen Sie die Temperaturkompensation mit dem gewünschten Wert im Textfeld ein, z.B. 20.4
* **"Druckkompensation einstellen"-Button** -> Stellen Sie die Druckkompensation mit dem gewünschten Wert in kPA im Textfeld ein, z.B. 101.3
* **"Salinitätskompensation festlegen"-Button** -> Stellen Sie die Salinitätskompensation mit dem gewünschten Wert im Textfeld ein, z.B. 50000 uns
* **"isPpt"-Switch** -> Wechseln Sie, um zu definieren, ob der Salzgehaltswert in ppt statt in uns gelesen/eingestellt wird

### DO-Zustände mit Include-Zustandsänderungserkennung
Für den DO-Sensor warten folgende Zustände auf Änderungen:

* **"Temperature_compensation"** -> Legt die Temperaturkompensation fest
* **"Salinity_compensation"** -> Legt die Salinitätskompensation fest
* **"Pressure_compensation"** -> Legt die Druckkompensation fest
* **"Calibrate_Clear"** -> Auf „true“ setzen, um die Sensorkalibrierung zu löschen. Wird auf eine falsche Kalibrierung gesetzt und wurde gelöscht.
* **"Calibrate_Atmospheric"** -> Auf „true“ setzen, um eine atmosphärische Sensorkalibrierung durchzuführen. Wird nach dem Kalibrierungslauf auf „false“ gesetzt.
* **"Calibrate_Zero_DO"** -> Auf „True“ setzen, um eine Nullkalibrierung des Sensors für gelösten Sauerstoff durchzuführen. Wird nach dem Kalibrierungslauf auf „false“ gesetzt.

## PH-bezogene Funktionen und Einstellungen
### PH Admin-UI-Elemente
![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/ph_config.png)

* **"Kalibrierung löschen"-Button** -> Kalibrierungsdaten löschen
* **"Calibrate Low"-Button** -> führt die Niedrigwertkalibrierung durch (normalerweise 4,0)
* **"Calibrate Mid"-Button** -> führt die Mittelwertkalibrierung durch (normalerweise 7,0 )
* **"Calibrate High"-Button** -> führt die Hochwertkalibrierung durch (normalerweise 10,0)
* **"Set Temp. Compensation"-Button** -> Stellen Sie die Temperaturkompensation mit dem gewünschten Wert im Textfeld ein, z.B. 20.4

### PH-Zustände mit Zustandsänderungserkennung
Für den pH-Sensor warten folgende Zustände auf Änderungen:

* **"Temperature_compensation"** -> Legt die Temperaturkompensation fest
* **"Calibrate_Clear"** -> Auf „true“ setzen, um die Sensorkalibrierung zu löschen. Wird automatisch auf „falsch“ gesetzt, nachdem die Kalibrierung gelöscht wurde.
* **"Calibrate_Low"** -> Stellen Sie einen durch Punkte getrennten Wert ein, z. B. 4.0, um die Niedrigkalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht
* **"Calibrate_Mid"** -> Legen Sie einen durch Punkte getrennten Wert fest, z. B. 7.0, um die Niedrigkalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht
* **"Calibrate_High"** -> Stellen Sie einen durch Punkte getrennten Wert ein, z. B. 10,0, um die Niedrigkalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht

## ORP-bezogene Funktionen und Einstellungen
### ORP Admin-UI-Elemente
![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/orp_config.png)

* **"Kalibrierung löschen"-Button** -> Kalibrierungsdaten löschen
* **„Kalibrieren“-Button** -> auf gewünschten Wert kalibrieren

### ORP-Zustände mit Erkennung von Zustandsänderungen
Für ORP-Sensoren warten folgende Zustände auf Änderungen:

* **"Temperature_compensation"**"-> Legt die Temperaturkompensation fest
* **"Calibrate_Clear"** -> Auf „true“ setzen, um die Sensorkalibrierung zu löschen. Wird automatisch auf „falsch“ gesetzt, nachdem die Kalibrierung gelöscht wurde.
* **„Kalibrieren“** -> Stellen Sie einen punktgetrennten Wert ein, z. B. xx,x mV, um die Kalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht

## EC-bezogene Funktionen und Einstellungen
### EC Admin-UI-Elemente
![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/ec_config.png)

* **"Kalibrierung löschen"-Button** -> Kalibrierungsdaten löschen
* **"Calibrate Dry"-Button** -> Führen Sie eine Trockenkalibrierung des Sensors durch
* **"Calibrate Low"-Button** -> Kalibrieren Sie den Tiefpunkt des Geräts auf den gewünschten Wert
* **"Calibrate High"-Button** -> Kalibrieren Sie den Geräte-Hochpunkt auf den gewünschten Wert
* **"Einzelpunkt kalibrieren"-Button** -> Geräte-Einzelpunkt auf den gewünschten Wert kalibrieren

* **"Set Temp. Compensation"-Button** -> Stellen Sie die Temperaturkompensation mit dem gewünschten Wert im Textfeld ein, z.B. 20.4
* **"Set TDS Conversion"-Button** -> Stellen Sie den TDS (ppt)-Umrechnungsfaktor mit dem gewünschten Wert aus dem Textfeld zwischen 0,001 und 1,00 ein
* **"Set Probe Type"-Button** -> Setzen Sie den verwendeten Sondentyp auf den gewünschten Typ aus dem Textfeld (K0.1, K1.0 oder K10)
* **„EC(us)“-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Conductivity = μS/cm“ innerhalb des Lesestrangs
* **„TDS(ppm)“-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Total gelöste Feststoffe = ppm“ innerhalb der Messwertzeichenfolge
* **„S(ppt)“-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Salinity = PSU (ppt) 0.00 – 42.00“ innerhalb der Messwertzeichenfolge
* **„SG“-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Spezifisches Gewicht (nur Meerwasser) = 1,00 – 1,300“ innerhalb der Lesezeichenfolge

### EC-Zustände mit Include-Zustandsänderungserkennung
Für den EC-Sensor warten folgende Zustände auf Änderungen:

* **"Temperature_compensation"** -> Legt die Temperaturkompensation fest
* **"Calibrate_Clear"** -> Auf „true“ setzen, um die Sensorkalibrierung zu löschen. Wird auf eine falsche Kalibrierung gesetzt und wurde gelöscht.
* **"Calibrate_Singlepoint"** -> Auf „true“ setzen, um eine Einzelpunkt-Sensorkalibrierung durchzuführen. Wird nach dem Kalibrierungslauf auf „false“ gesetzt.
* **"Calibrate_Dry"** -> Auf „true“ setzen, um eine Trockensensorkalibrierung durchzuführen. Wird nach dem Kalibrierungslauf auf „false“ gesetzt.
* **„Calibrate_Low“** -> Auf „True“ setzen, um eine Kalibrierung des Sensors für niedrige Werte mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht
* **„Calibrate_High“** -> Auf „true“ setzen, um eine hohe Sensorkalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht

## RTD-bezogene Funktionen und Einstellungen
### RTD Admin-UI-Elemente
![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/rtd_config.png)

* **"Kalibrierung löschen"-Button** -> Kalibrierungsdaten löschen
* **„Kalibrieren“-Button** -> auf gewünschten Wert kalibrieren

### RTD-Zustände mit Erkennung von Zustandsänderungen
Für RTD-Sensoren warten die folgenden Zustände auf Änderungen:

* **"Calibrate_Clear"** -> Auf „true“ setzen, um die Sensorkalibrierung zu löschen. Wird automatisch auf „falsch“ gesetzt, nachdem die Kalibrierung gelöscht wurde.
* **„Kalibrieren“** -> Stellen Sie einen punktgetrennten Wert ein, z. B. xx,x mV, um die Kalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht

## Pumpenbezogene Funktionen und Einstellungen
### Pump Admin-UI-Elemente
![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/pump_config.png)

* **"Kalibrierung löschen"-Button** -> Kalibrierungsdaten löschen
* **„Kalibrieren“-Button** -> auf gewünschte Lautstärke kalibrieren

### Abschnitt zur Pumpensteuerung
* **"Reverse"-Schalter** -> Wenn in der Konfiguration festgelegt, werden alle Befehle an die Pumpe mit gesetztem Reverse-Flag ausgeführt, sodass die Pumpenrichtung umgekehrt wird
* **„Abgegebenes Volumen löschen“-Button** -> Der Zähler für das gesamte abgegebene Volumen wird auf 0 gesetzt
* **„Kontinuierliche Abgabe“-Taste** -> Pumpe läuft kontinuierlich mit ~105 ml/min (mit mitgeliefertem Schlauch)
* **„Stop Dispense“-Button** -> Pumpe stoppt die Abgabe sofort
* **„Pumpe anhalten“-Button** -> Pumpe unterbricht die Abgabe sofort
* **"Dosis über Zeit einstellen"-Button** -> Pumpe gibt die angegebene Menge ml innerhalb der angegebenen Dauer in Minuten ab
* **„Volumen abgeben“-Button** -> Pumpe gibt die angegebene ml-Menge ab
* **„Konstante Durchflussrate einstellen“-Button** -> Pumpe gibt die angegebene Menge ml pro Minute „ml/min“ für die angegebene Dauer in Minuten ab

### Pumpenzustände mit Erkennung von Zustandsänderungen
Für EZO Pumps warten die folgenden Staaten auf Änderungen:

* **"Continous_dispense"** -> Wenn auf true gesetzt, springt die Pumpe in den kontinuierlichen Abgabemodus mit 105 ml/min (Umkehrschalter berücksichtigt). Bei der Einstellung „false“ stoppt die Pumpe die Abgabe.
* **"Dose_over_time"** -> Format: durch Kommas getrennte Werte ml, Dauer in Minuten -> Gibt das angegebene Volumen über die angegebenen Minuten ab. ml für Volumen und Dauer in Minuten. Bei negativen Mengen läuft die Pumpe rückwärts. Der Status wird automatisch gelöscht, nachdem der Befehl ausgeführt wurde.
* **"Dispense_volume"** -> Gibt das angegebene Volumen (ml) ab. Bei negativen Mengen läuft die Pumpe rückwärts. Der Status wird automatisch gelöscht, nachdem der Befehl ausgeführt wurde.
* **"Constant_flow_rate"** -> Format: durch Kommas getrennte Werte ml pro Minute, Dauer -> Gibt konstant das angegebene Volumen/Minute über die angegebene Dauer in Minuten ab. ml für Volumen/Minute und Dauer in Minuten. Bei negativen Mengen läuft die Pumpe rückwärts. Der Status wird automatisch gelöscht, nachdem der Befehl ausgeführt wurde.
* **"Pause_Pump"** -> Wenn auf true gesetzt, wird die Pumpe angehalten. Die Pause wird bei der nächsten Abgabeaktion aufgehoben.

## PRS-bezogene Funktionen und Einstellungen
### PRS Admin-UI-Elemente
![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/prs_config.png)

* **"Kalibrierung löschen"-Button** -> Kalibrierungsdaten löschen
* **"Nullpunkt kalibrieren"-Button** -> Gerätenullpunkt kalibrieren
* **"Calibrate High"-Button** -> Kalibrieren Sie den Geräte-Hochpunkt auf den gewünschten Wert

* **"psi"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Ausgabe erfolgt in psi“ innerhalb der Lesezeichenfolge
* **"atm"-Switch** -> Schalter zum Aktivieren oder Deaktivieren von „Ausgabe erfolgt in atm“ innerhalb der Lesezeichenfolge
* **"bar"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Ausgabe erfolgt in Balken“ innerhalb der Lesezeichenfolge
* **„kPa“-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Ausgabe erfolgt in kPa“ innerhalb der Lesezeichenfolge
* **"inh2o"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Ausgabe erfolgt in Zoll Wassersäule“ innerhalb der Lesezeichenfolge
* **„cmh2o“-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von „Ausgabe erfolgt in cm Wassersäule“ innerhalb der Lesezeichenfolge

### PRS-Zustände mit Include-Zustandsänderungserkennung
Für den PRS-Sensor warten folgende Zustände auf Änderungen:

* **"Calibrate_Clear"** -> Auf „true“ setzen, um die Sensorkalibrierung zu löschen. Wird auf eine falsche Kalibrierung gesetzt und wurde gelöscht.
* **"Calibrate_Zeropoint"** -> Auf true setzen, um eine Nullpunkt-Sensorkalibrierung durchzuführen. Wird nach dem Kalibrierungslauf auf „false“ gesetzt.
* **„Calibrate_High“** -> Auf „true“ setzen, um eine hohe Sensorkalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht
* **„Alarm_enabled“** -> Auf „true“ setzen, um den Alarm-Pin vom Sensor zu aktivieren, auf „false“ setzen, um ihn zu deaktivieren
* **"Alarm_Threshold"** -> Stellen Sie den gewünschten Wert für den Alarmschwellenwert ein. Nach der Änderung wird der Wert auf den Sensor geschrieben
* **"Alarm_Tolerance"** -> Stellen Sie den gewünschten Wert für die Alarmschwelle ein. Nach der Änderung wird der Wert auf den Sensor geschrieben

## Visualisierungsbeispiel mit Grafana Dashboard
Hier sehen Sie ein kleines Beispiel, wie einfach es ist, die Adapterwerte zu visualisieren. In diesem Beispiel sammelt und speichert eine InfluxDB-Instanz die vom Adapter gelieferten Werte.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/dashboard_example.png)

<details><summary>Beispielcode Grafana-Dashboard JSON</summary>

  ### JSON-Export aus Grafana
```json

  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": 1,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 0
      },
      "id": 16,
      "panels": [],
      "title": "Temperatur (RTD)",
      "type": "row"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "mappings": [],
          "max": 28,
          "min": 0,
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 0
              },
              {
                "color": "#EAB839",
                "value": 10
              },
              {
                "color": "dark-green",
                "value": 20
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 6,
        "w": 3,
        "x": 0,
        "y": 1
      },
      "id": 4,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x63.Temperature",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "Temperatur aktuell",
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "0": {
                  "color": "dark-red",
                  "index": 0,
                  "text": "unkalibriert"
                },
                "1": {
                  "color": "dark-green",
                  "index": 1,
                  "text": "kalibriert"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 1
      },
      "id": 11,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x63.IsCalibrated",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "RTD Kalibrierung",
      "type": "stat"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "axisSoftMax": 28,
            "axisSoftMin": -2,
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "opacity",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "smooth",
            "lineStyle": {
              "fill": "solid"
            },
            "lineWidth": 2,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "celsius"
        },
        "overrides": [
          {
            "matcher": {
              "id": "byName",
              "options": "atlas-scientific-ezo-i2c.0.0x61.Temperature_compensation.last"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "DO temp compensation"
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "atlas-scientific-ezo-i2c.0.0x62.Temperature_compensation.last"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "PH temp compensation"
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "Current Temperature"
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "PH temp compensation"
            },
            "properties": [
              {
                "id": "color",
                "value": {
                  "fixedColor": "super-light-yellow",
                  "mode": "fixed"
                }
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 6,
        "w": 12,
        "x": 5,
        "y": 1
      },
      "id": 1,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x63.Temperature",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "Temperaturverlauf",
      "transformations": [
        {
          "id": "convertFieldType",
          "options": {
            "conversions": [
              {
                "destinationType": "number",
                "targetField": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
              }
            ],
            "fields": {}
          }
        }
      ],
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "false": {
                  "color": "dark-green",
                  "index": 0,
                  "text": "aktiv"
                },
                "true": {
                  "color": "dark-red",
                  "index": 1,
                  "text": "pausiert"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 3
      },
      "id": 20,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x63\\.IsPaused\\.last$/",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x63.IsPaused",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "RTD Messung",
      "type": "stat"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 7
      },
      "id": 15,
      "panels": [],
      "title": "PH",
      "type": "row"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "mappings": [],
          "max": 14,
          "min": 0,
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              },
              {
                "color": "dark-red",
                "value": 0
              },
              {
                "color": "red",
                "value": 1
              },
              {
                "color": "orange",
                "value": 2
              },
              {
                "color": "yellow",
                "value": 3
              },
              {
                "color": "super-light-green",
                "value": 4
              },
              {
                "color": "light-green",
                "value": 5
              },
              {
                "color": "green",
                "value": 6
              },
              {
                "color": "dark-green",
                "value": 7
              },
              {
                "color": "green",
                "value": 8
              },
              {
                "color": "super-light-blue",
                "value": 9
              },
              {
                "color": "blue",
                "value": 10
              },
              {
                "color": "dark-blue",
                "value": 11
              },
              {
                "color": "super-light-purple",
                "value": 12
              },
              {
                "color": "purple",
                "value": 13
              },
              {
                "color": "dark-purple",
                "value": 14
              }
            ]
          },
          "unit": "pH"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 6,
        "w": 3,
        "x": 0,
        "y": 8
      },
      "id": 5,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true,
        "text": {}
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x62.PH_Value",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "PH Wert aktuell",
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "0": {
                  "color": "dark-red",
                  "index": 0,
                  "text": "unkalibriert"
                },
                "1": {
                  "color": "super-light-green",
                  "index": 1,
                  "text": "Einpunkt"
                },
                "2": {
                  "color": "green",
                  "index": 2,
                  "text": "Zweipunkt"
                },
                "3": {
                  "color": "dark-green",
                  "index": 3,
                  "text": "Dreipunkt"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 8
      },
      "id": 12,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x62.IsCalibrated",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "PH Kalibrierung",
      "type": "stat"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "axisSoftMax": 10,
            "axisSoftMin": 0,
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "smooth",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "pH"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 6,
        "w": 12,
        "x": 5,
        "y": 8
      },
      "id": 2,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": false
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x62.PH_Value",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "PH Verlauf",
      "transformations": [
        {
          "id": "convertFieldType",
          "options": {
            "conversions": [
              {
                "destinationType": "number",
                "targetField": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
              }
            ],
            "fields": {}
          }
        }
      ],
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "false": {
                  "color": "dark-green",
                  "index": 0,
                  "text": "aktiv"
                },
                "true": {
                  "color": "dark-red",
                  "index": 1,
                  "text": "pausiert"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 10
      },
      "id": 21,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x62\\.IsPaused\\.last$/",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x62.IsPaused",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "PH Messung",
      "type": "stat"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 12
      },
      "id": 10,
      "options": {
        "colorMode": "value",
        "graphMode": "area",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x62.Temperature_compensation",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "PH Temp. Kompensation ",
      "type": "stat"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 14
      },
      "id": 14,
      "panels": [],
      "title": "Redox (ORP)",
      "type": "row"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "mappings": [],
          "max": 1019,
          "min": 0,
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "dark-red",
                "value": 0
              },
              {
                "color": "orange",
                "value": 200
              },
              {
                "color": "#EAB839",
                "value": 400
              },
              {
                "color": "super-light-green",
                "value": 600
              },
              {
                "color": "dark-green",
                "value": 800
              },
              {
                "color": "dark-green",
                "value": 1019
              }
            ]
          },
          "unit": "mvolt"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 6,
        "w": 3,
        "x": 0,
        "y": 15
      },
      "id": 6,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true,
        "text": {}
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x64.ORP_Value",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "Redox (ORP) aktuell",
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "0": {
                  "color": "dark-red",
                  "index": 0,
                  "text": "unkalibriert"
                },
                "1": {
                  "color": "dark-green",
                  "index": 1,
                  "text": "kalibriert"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 15
      },
      "id": 17,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x64.IsCalibrated",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "Redox Kalibrierung",
      "type": "stat"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "smooth",
            "lineWidth": 2,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "mvolt"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 6,
        "w": 12,
        "x": 5,
        "y": 15
      },
      "id": 3,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": false
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x64.ORP_Value",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "Redox Verlauf",
      "transformations": [
        {
          "id": "convertFieldType",
          "options": {
            "conversions": [
              {
                "destinationType": "number",
                "targetField": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
              }
            ],
            "fields": {}
          }
        }
      ],
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "false": {
                  "color": "dark-green",
                  "index": 0,
                  "text": "aktiv"
                },
                "true": {
                  "color": "dark-red",
                  "index": 1,
                  "text": "pausiert"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 17
      },
      "id": 22,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x64\\.IsPaused\\.last$/",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x64.IsPaused",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "Redox Messung",
      "type": "stat"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 21
      },
      "id": 13,
      "panels": [],
      "title": "Gelöster Sauerstoff (DO)",
      "type": "row"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "mappings": [],
          "max": 10,
          "min": 0,
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              },
              {
                "color": "dark-orange",
                "value": 3
              },
              {
                "color": "dark-yellow",
                "value": 6
              },
              {
                "color": "dark-green",
                "value": 8
              },
              {
                "color": "dark-green",
                "value": 10
              }
            ]
          },
          "unit": "mg/L"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 6,
        "w": 3,
        "x": 0,
        "y": 22
      },
      "id": 18,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true,
        "text": {}
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "javascript.0.DO_Sensor.DO_mg_L",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "mg/L Sauerstoff",
      "transformations": [
        {
          "id": "convertFieldType",
          "options": {
            "conversions": [],
            "fields": {}
          }
        }
      ],
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "0": {
                  "color": "dark-red",
                  "index": 0,
                  "text": "unkalibriert"
                },
                "1": {
                  "color": "super-light-green",
                  "index": 1,
                  "text": "Atmospherisch"
                },
                "3": {
                  "color": "dark-green",
                  "index": 2,
                  "text": "Atmospherisch & 0 DO"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 22
      },
      "id": 19,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x61.IsCalibrated",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "DO Kalibrierung",
      "type": "stat"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "smooth",
            "lineWidth": 2,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "mg/L"
        },
        "overrides": [
          {
            "matcher": {
              "id": "byName",
              "options": "javascript.0.DO_Sensor.DO_Percent.last"
            },
            "properties": [
              {
                "id": "custom.axisPlacement",
                "value": "right"
              },
              {
                "id": "unit",
                "value": "percent"
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "javascript.0.DO_Sensor.DO_mg_L.last"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "Dissolved Oxygen mg/L"
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "javascript.0.DO_Sensor.DO_Percent.last"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "Dissolved Oxygen %"
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 6,
        "w": 10,
        "x": 5,
        "y": 22
      },
      "id": 7,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "timezone": [
          ""
        ],
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "javascript.0.DO_Sensor.DO_mg_L",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        },
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "hide": false,
          "measurement": "javascript.0.DO_Sensor.DO_Percent",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "B",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "Gelöster Sauerstoff ",
      "transformations": [
        {
          "id": "convertFieldType",
          "options": {
            "conversions": [
              {
                "destinationType": "number",
                "targetField": "atlas-scientific-ezo-i2c.0.0x61.Dissolved_Oxygen.last"
              }
            ],
            "fields": {}
          }
        }
      ],
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              },
              {
                "color": "dark-orange",
                "value": 30
              },
              {
                "color": "dark-yellow",
                "value": 60
              },
              {
                "color": "dark-green",
                "value": 80
              },
              {
                "color": "dark-green",
                "value": 100
              }
            ]
          },
          "unit": "percent"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 6,
        "w": 2,
        "x": 15,
        "y": 22
      },
      "id": 9,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "/^javascript\\.0\\.DO_Sensor\\.DO_Percent\\.last$/",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true,
        "text": {}
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "javascript.0.DO_Sensor.DO_Percent",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "% Sauerstoff",
      "transformations": [
        {
          "id": "convertFieldType",
          "options": {
            "conversions": [],
            "fields": {}
          }
        }
      ],
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [
            {
              "options": {
                "false": {
                  "color": "dark-green",
                  "index": 0,
                  "text": "aktiv"
                },
                "true": {
                  "color": "dark-red",
                  "index": 1,
                  "text": "pausiert"
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "dark-red",
                "value": null
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 24
      },
      "id": 23,
      "options": {
        "colorMode": "background",
        "graphMode": "none",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x61\\.IsPaused\\.last$/",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "$__interval"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x61.IsPaused",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "DO Messung",
      "type": "stat"
    },
    {
      "datasource": {
        "type": "influxdb",
        "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
      },
      "fieldConfig": {
        "defaults": {
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "short"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 2,
        "w": 2,
        "x": 3,
        "y": 26
      },
      "id": 24,
      "options": {
        "colorMode": "value",
        "graphMode": "area",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x61\\.Temperature_compensation\\.last$/",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "10.0.2",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
          },
          "groupBy": [
            {
              "params": [
                "1m"
              ],
              "type": "time"
            },
            {
              "params": [
                "null"
              ],
              "type": "fill"
            }
          ],
          "measurement": "atlas-scientific-ezo-i2c.0.0x61.Temperature_compensation",
          "orderByTime": "ASC",
          "policy": "autogen",
          "refId": "A",
          "resultFormat": "time_series",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "field"
              },
              {
                "params": [],
                "type": "last"
              }
            ]
          ],
          "tags": []
        }
      ],
      "title": "DO Temp. Kompensation ",
      "type": "stat"
    }
  ],
  "refresh": "5s",
  "schemaVersion": 38,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": []
  },
  "time": {
    "from": "now-15m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "NAF Stein Bruthaus-Wassermonitor",
  "uid": "d6d13e1c-3d76-4996-8b30-42db5d61a555",
  "version": 11,
  "weekStart": ""
}
```

</details>

## Führen Sie Skripte pro Javascript-Adapter-Instanz aus
In manchen Fällen ist es hilfreich, die Ausführung von Javascript-Code zu nutzen. Ich habe dem Repository einige Beispiele inklusive Beschreibung hinzugefügt.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/jsadapter.png)

### Beispiel 1: Teilzeichenfolgen vom DO-Sensorwert abrufen, der sich auf die aktiven Parameter mg/l und % bezieht
Dieses Skript wurde für die Verwendung im JavaScript-Adapter „Skriptausführung“ erstellt. Die Datenpunkte müssen natürlich an die lokalen Gegebenheiten angepasst werden. Das Skript teilt den vom Sauerstoffsensor gelieferten Wertestring, der je nach aktivierten Parametern sowohl mg/L als auch % enthalten kann, in zwei Werte auf und speichert diese in zwei Datenpunkten .

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/do_Substrings.png)

<details><summary>Beispiel 1 Skript</summary>

```javascript
 console.log('Start');

 const DO_mg_L = 'javascript.' + instance + '.DO_Sensor.DO_mg_L';
 createState(DO_mg_L, 0, {"type": "string", read: true, write: false, role: "value.do", unit: "mg/L"});
 const DO_Percent = 'javascript.' + instance + '.DO_Sensor.DO_Percent';
 createState(DO_Percent, 0, {"type": "string", read: true, write: false, role: "value.do", unit: "%"});


 function buildSubstrings(str, start, end) {
 const arr = str.split(',');
 console.log('Array:' + arr.toString());
 return arr;
 }

 on({id: 'atlas-scientific-ezo-i2c.0.0x61.Dissolved_Oxygen', change: "any"}, function (obj) {

 console.log('Value changed: ' + obj.state.val);
 const doString = obj.state.val;
 const result = buildSubstrings(doString, 0, 1);
 console.log(result.toString());

 // Only mg/L
 if(result.length === 1){
    console.log('Setting state DO_mg_L: ' + result[0].toString());
    setState(DO_mg_L, result[0], true);
 }
 // mg/l & %
 else if (result.length === 2) {
    console.log('Setting state DO_mg_L: ' + result[0].toString());
    setState(DO_mg_L, result[0], true);
    console.log('Setting state DO_Percent: ' + result[1].toString());
    setState(DO_Percent, result[1], true);
 }
 });
`

</details>

### Beispiel 2: Stellen Sie die Temperaturkompensation für mehrere Sensoren ein
Dieses Skript wurde für die Verwendung im JavaScript-Adapter „Skriptausführung“ erstellt. Die Datenpunkte müssen natürlich an die lokalen Gegebenheiten angepasst werden. Es werden die vom RTD-Sensor gelieferten Temperaturwerte überprüft und die Nachkommastellen auf 1 gekürzt.
Bei einem Wechsel vom alten zum neuen Wert werden die temp_compensation-Zustände der gewünschten (Ziel-)Sensoren mit Zeitversatz eingestellt

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/tempcompensation.png)

<details><summary>Beispiel 2 Skript</summary>

```javascript
 console.log('Start temp compensation Script');

 const ph_temp_compensation = 'atlas-scientific-ezo-i2c.0.0x62.Temperature_compensation';
 const do_temp_compensation = 'atlas-scientific-ezo-i2c.0.0x61.Temperature_compensation';

 on({id: 'atlas-scientific-ezo-i2c.0.0x63.Temperature', change: "any"}, function (obj) {

 const newTemptring = obj.state.val;
 const oldTempString = obj.oldState.val;
 const newTempCut = parseFloat(newTemptring).toFixed(1);
 const oldTempCut = parseFloat(oldTempString).toFixed(1);

 console.log('Temp value received: Old:' + oldTempCut + ' New:' + newTempCut );

 if(!(newTempCut === oldTempCut))
 {
    console.log('Temp changed from ' + oldTempCut + ' to' + newTempCut );
    console.log('Setting state ph_temp_compensation: ' + newTempCut);
    setStateDelayed(ph_temp_compensation, newTempCut, 5000);
    console.log('Setting state do_temp_compensation: ' + newTempCut);
    setStateDelayed(do_temp_compensation, newTempCut, 8000);
 }
 });
`

</details>

### HAFTUNGSAUSSCHLUSS
Bitte beachten Sie Urheberrechte und Marken, wenn Sie Namen oder Logos eines Unternehmens verwenden, und fügen Sie Ihrer README-Datei einen Haftungsausschluss hinzu.
Sie können bei anderen Adaptern nach Beispielen suchen oder in der Entwickler-Community nachfragen. Die Verwendung eines Namens oder Logos eines Unternehmens ohne Genehmigung kann rechtliche Probleme für Sie verursachen.

## Lizenzen von Drittanbietern
Einige kleine Teile dieses Projekts basieren auf ioBroker.i2c von UncleSamSwiss https://github.com/UncleSamSwiss/ioBroker.i2c

Copyright 2021 UncleSamSwiss

Lizenziert unter der Apache-Lizenz, Version 2.0 (die „Lizenz“); Sie dürfen diese Datei nur in Übereinstimmung mit der Lizenz verwenden. Eine Kopie der Lizenz erhalten Sie unter

http://www.apache.org/licenses/LICENSE-2.0

Sofern nicht gesetzlich vorgeschrieben oder schriftlich vereinbart, wird die im Rahmen der Lizenz vertriebene Software „WIE BESEHEN“ und OHNE GEWÄHRLEISTUNGEN ODER BEDINGUNGEN JEGLICHER ART, weder ausdrücklich noch stillschweigend, vertrieben.

Die spezifische Sprache, die die Berechtigungen und Einschränkungen im Rahmen der Lizenz regelt, finden Sie in der Lizenz.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2023-08-14)
- NPM Package updates

### 2.2.3 (2023-08-12)
- Added support for EZO PRS Sensor
- Added help for PRS in readme.md

### 2.2.2 (2023-08-06)
- Bugfixings: Fixed wrong order of delay initialization and delay values for some drivers
- Added backend hardware driver for embedded EZO PRS (not functional right now)

### 2.2.1 (2023-08-04)
- Added support for EC Electrical conductivity sensors
- Extended Help with new implementation

### 2.2.0 (2023-08-02)
- Several Bugfixes in Pump implementation
- adjusted readme.md

### 2.1.0 (2023-08-01)
- Added example Grafana Dashboard code and documentation
- Added example Scripts and documentation for helpful Javascript Adapter

### 2.0.0 (2023-07-31)
- Feature request: add the "active" Switch to objects #10 Part I -> Added State including state change listeners "IsPaused" to pause measure per sensor during runtime
- Feature request: add the "calibration" switches to objects #10 Part II -> Added calibration state objects
- Adjusted Readme with Help for new Features
- Added state translations for alphanumeric and boolean states to clear text

### 1.2.4 (2023-07-06)
- Finished first Pump implementation (UI and Pump control) untested due to missing device
- extended README.md
- Further translations

### 1.2.3 (2023-07-03)
- implemented delay after each polling cycle to decouple memory race conditions on device for I2C
- First steps in base implementation for peristaltic pump
- added translations for new values

### 1.2.2 (2023-06-19)
- Removed forbidden characters from sensor state objects
- added state roles where possible 
- added state units where senseful
- adjusted Readme according changes

### 1.2.1 (2023-06-16)
- Extended Help with Statechangelisteners

### 1.2.0 (2023-06-16)
- Code cleanup
- Exchanged standard setTimeOut / clearTimeout calls with adapter wrapper methods
- Removed "later" function in index.ts and used Delay Class instead

### 1.1.0 (2023-06-08)

- Removed Developer Info
- Extended Test Matrix to [16.x, 18.x, 20.x]
- Patched Translations
- Removed Whitespaces for all States from Sensors and exchanged with underscores

### 1.0.0 (2023-06-06)
- further bugfixes
- patched release yml file
- added  releaseconfig.json

### 0.0.3 (2023-05-09)
bugfixes

### 0.0.2 (2023-05-09)
-   (Buzze11) initial release

### 0.0.1 (2023-05-09)

### DISCLAIMER

Please make sure that you consider copyrights and trademarks when you use names or logos of a company and add a disclaimer to your README.
You can check other adapters for examples or ask in the developer community. Using a name or logo of a company without permission may cause legal problems for you.

## License

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

    "License" shall mean the terms and conditions for use, reproduction,
    and distribution as defined by Sections 1 through 9 of this document.

    "Licensor" shall mean the copyright owner or entity authorized by
    the copyright owner that is granting the License.

    "Legal Entity" shall mean the union of the acting entity and all
    other entities that control, are controlled by, or are under common
    control with that entity. For the purposes of this definition,
    "control" means (i) the power, direct or indirect, to cause the
    direction or management of such entity, whether by contract or
    otherwise, or (ii) ownership of fifty percent (50%) or more of the
    outstanding shares, or (iii) beneficial ownership of such entity.

    "You" (or "Your") shall mean an individual or Legal Entity
    exercising permissions granted by this License.

    "Source" form shall mean the preferred form for making modifications,
    including but not limited to software source code, documentation
    source, and configuration files.

    "Object" form shall mean any form resulting from mechanical
    transformation or translation of a Source form, including but
    not limited to compiled object code, generated documentation,
    and conversions to other media types.

    "Work" shall mean the work of authorship, whether in Source or
    Object form, made available under the License, as indicated by a
    copyright notice that is included in or attached to the work
    (an example is provided in the Appendix below).

    "Derivative Works" shall mean any work, whether in Source or Object
    form, that is based on (or derived from) the Work and for which the
    editorial revisions, annotations, elaborations, or other modifications
    represent, as a whole, an original work of authorship. For the purposes
    of this License, Derivative Works shall not include works that remain
    separable from, or merely link (or bind by name) to the interfaces of,
    the Work and Derivative Works thereof.

    "Contribution" shall mean any work of authorship, including
    the original version of the Work and any modifications or additions
    to that Work or Derivative Works thereof, that is intentionally
    submitted to Licensor for inclusion in the Work by the copyright owner
    or by an individual or Legal Entity authorized to submit on behalf of
    the copyright owner. For the purposes of this definition, "submitted"
    means any form of electronic, verbal, or written communication sent
    to the Licensor or its representatives, including but not limited to
    communication on electronic mailing lists, source code control systems,
    and issue tracking systems that are managed by, or on behalf of, the
    Licensor for the purpose of discussing and improving the Work, but
    excluding communication that is conspicuously marked or otherwise
    designated in writing by the copyright owner as "Not a Contribution."

    "Contributor" shall mean Licensor and any individual or Legal Entity
    on behalf of whom a Contribution has been received by Licensor and
    subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of
   this License, each Contributor hereby grants to You a perpetual,
   worldwide, non-exclusive, no-charge, royalty-free, irrevocable
   copyright license to reproduce, prepare Derivative Works of,
   publicly display, publicly perform, sublicense, and distribute the
   Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
   this License, each Contributor hereby grants to You a perpetual,
   worldwide, non-exclusive, no-charge, royalty-free, irrevocable
   (except as stated in this section) patent license to make, have made,
   use, offer to sell, sell, import, and otherwise transfer the Work,
   where such license applies only to those patent claims licensable
   by such Contributor that are necessarily infringed by their
   Contribution(s) alone or by combination of their Contribution(s)
   with the Work to which such Contribution(s) was submitted. If You
   institute patent litigation against any entity (including a
   cross-claim or counterclaim in a lawsuit) alleging that the Work
   or a Contribution incorporated within the Work constitutes direct
   or contributory patent infringement, then any patent licenses
   granted to You under this License for that Work shall terminate
   as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the
   Work or Derivative Works thereof in any medium, with or without
   modifications, and in Source or Object form, provided that You
   meet the following conditions:

    (a) You must give any other recipients of the Work or
    Derivative Works a copy of this License; and

    (b) You must cause any modified files to carry prominent notices
    stating that You changed the files; and

    (c) You must retain, in the Source form of any Derivative Works
    that You distribute, all copyright, patent, trademark, and
    attribution notices from the Source form of the Work,
    excluding those notices that do not pertain to any part of
    the Derivative Works; and

    (d) If the Work includes a "NOTICE" text file as part of its
    distribution, then any Derivative Works that You distribute must
    include a readable copy of the attribution notices contained
    within such NOTICE file, excluding those notices that do not
    pertain to any part of the Derivative Works, in at least one
    of the following places: within a NOTICE text file distributed
    as part of the Derivative Works; within the Source form or
    documentation, if provided along with the Derivative Works; or,
    within a display generated by the Derivative Works, if and
    wherever such third-party notices normally appear. The contents
    of the NOTICE file are for informational purposes only and
    do not modify the License. You may add Your own attribution
    notices within Derivative Works that You distribute, alongside
    or as an addendum to the NOTICE text from the Work, provided
    that such additional attribution notices cannot be construed
    as modifying the License.

    You may add Your own copyright statement to Your modifications and
    may provide additional or different license terms and conditions
    for use, reproduction, or distribution of Your modifications, or
    for any such Derivative Works as a whole, provided Your use,
    reproduction, and distribution of the Work otherwise complies with
    the conditions stated in this License.

5. Submission of Contributions. Unless You explicitly state otherwise,
   any Contribution intentionally submitted for inclusion in the Work
   by You to the Licensor shall be under the terms and conditions of
   this License, without any additional terms or conditions.
   Notwithstanding the above, nothing herein shall supersede or modify
   the terms of any separate license agreement you may have executed
   with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade
   names, trademarks, service marks, or product names of the Licensor,
   except as required for reasonable and customary use in describing the
   origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or
   agreed to in writing, Licensor provides the Work (and each
   Contributor provides its Contributions) on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
   implied, including, without limitation, any warranties or conditions
   of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
   PARTICULAR PURPOSE. You are solely responsible for determining the
   appropriateness of using or redistributing the Work and assume any
   risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory,
   whether in tort (including negligence), contract, or otherwise,
   unless required by applicable law (such as deliberate and grossly
   negligent acts) or agreed to in writing, shall any Contributor be
   liable to You for damages, including any direct, indirect, special,
   incidental, or consequential damages of any character arising as a
   result of this License or out of the use or inability to use the
   Work (including but not limited to damages for loss of goodwill,
   work stoppage, computer failure or malfunction, or any and all
   other commercial damages or losses), even if such Contributor
   has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing
   the Work or Derivative Works thereof, You may choose to offer,
   and charge a fee for, acceptance of support, warranty, indemnity,
   or other liability obligations and/or rights consistent with this
   License. However, in accepting such obligations, You may act only
   on Your own behalf and on Your sole responsibility, not on behalf
   of any other Contributor, and only if You agree to indemnify,
   defend, and hold each Contributor harmless for any liability
   incurred by, or claims asserted against, such Contributor by reason
   of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

Copyright 2023 Buzze11

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.