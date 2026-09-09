---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.atlas-scientific-ezo-i2c/README.md
title: ioBroker.atlas-scientific-ezo-i2c
hash: lpR2iSygYLYhf4+CG/NgJ/hqBc+nHosk17SNROc+kZU=
---
![Logo](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/admin/atlas-scientific-ezo-i2c.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.atlas-scientific-ezo-i2c.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.atlas-scientific-ezo-i2c.svg)
![Anzahl der Installationen](https://iobroker.live/badges/atlas-scientific-ezo-i2c-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/atlas-scientific-ezo-i2c-stable.svg)
![NPM](https://nodei.co/npm/iobroker.atlas-scientific-ezo-i2c.png?downloads=true)
![Test und Freigabe](https://github.com/Buzze11/ioBroker.atlas-scientific-ezo/workflows/Test%20and%20Release/badge.svg)

# ioBroker.atlas-scientific-ezo-i2c

### Wenn Ihnen dieser Adapter gefällt, lesen Sie bitte bis zum Ende und unterstützen Sie meine Arbeit mit einer Spende.

Ich freue mich über jeden einzelnen Menschen, dem ich helfen kann, diese großartigen Sensoren von Atlas Scientific in sein Zuhause zu integrieren, und ich hoffe, Sie können sich vorstellen, wie viel Zeit und Mühe die Entwicklung eines solchen Adapters erfordert. Deshalb bin ich Ihnen sehr dankbar für Ihre Unterstützung in Form einer Spende via PayPal.

[![Spenden Sie mit PayPal](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=7PGJFJX8X3Y82)

## Atlas Scientific EZO I2C-Adapter für ioBroker

Dieser ioBroker-Adapter integriert mehrere Atlas Scientific EZO-Geräte [(https://atlas-scientific.com/)](https://atlas-scientific.com/) in Ihre ioBroker-Umgebung. Die EZO-Geräte müssen für den I2C-Bus konfiguriert und auf einem Gerät (z. B. Raspberry Pi) mit konfiguriertem und aktiviertem I2C-Bus montiert sein.

### Aktuell unterstützte Geräte

- EZO DO – Gelöster Sauerstoff -> <https://atlas-scientific.com/dissolved-oxygen>
- EZO ORP – Redoxpotential -> <https://atlas-scientific.com/orp>
- EZO pH - Potenzial des Wasserstoffs -> <https://atlas-scientific.com/ph>
- EZO RTD – Widerstandsthermometer -> <https://atlas-scientific.com/temperature>
- EZO PMP – Eingebettete Peristaltik-Dosierpumpe -> <https://atlas-scientific.com/peristaltic/ezo-pmp/> (ungetestet aufgrund fehlender Hardware)
- EZO EC – Elektrische Leitfähigkeit -> <https://atlas-scientific.com/conductivity>

### Zukünftige Unterstützung

- Bitte erstellen Sie ein Ticket für einen Funktionswunsch, falls Sie weitere Implementierungen vorschlagen möchten.

## Erste Schritte

### Installation

Stellen Sie insbesondere sicher, dass Sie I2C auf Ihrem System ordnungsgemäß konfiguriert und aktiviert haben (falls erforderlich):

- [I2C auf dem Raspberry Pi konfigurieren](https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)

### Setup-Adapter

Nach der Installation des Adapters und der Vorkonfiguration auf dem Raspberry Pi finden Sie den neuen Adapter im Abschnitt „Instanzen“, wo Sie Ihre Sensoren weiter konfigurieren können.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/adapter_instance.png)

Durch Klicken auf das Schraubenschlüssel-Symbol öffnet sich ein neues Einstellungsfenster, in dem standardmäßig die Registerkarte „Allgemeine Einstellungen“ ausgewählt ist.

Hier müssen Sie die auf dem Raspberry Pi konfigurierte I2C-Nummer (0 oder 1) in das Textfeld eingeben. Anschließend können Sie auf die Schaltfläche „Gerätesuche“ klicken, um alle angeschlossenen EZO-Schaltungen zu finden. Die gefundenen Geräteadressen werden links angezeigt.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/device_search.png)

Durch Anklicken eines der erkannten Geräte erscheint der Bildschirm „Nicht konfiguriertes Gerät“.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/unconfigured_device.png)

Klicken Sie auf das Dropdown-Menü, um den gewünschten Gerätetyp auszuwählen.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/device_selector.png)

Nachdem Sie den Gerätetyp ausgewählt haben, werden die Einstellungen für das gewünschte Gerät angezeigt. Wiederholen Sie diese Schritte für jedes Gerät, das Sie verwenden möchten.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/configured_device.png)

## Allgemeine Konfiguration (alle Geräte)

- **Adresse:** Nicht anpassbar (außer Änderung der IP-Adresse)
- **Gerätetyp:** Auswahlliste für den gewünschten Gerätetyp
- **Name:** Name des Geräts, der später auf dem Gerät gespeichert wird (Leerzeichen werden entfernt. Bei mehr als 16 Zeichen werden nur die ersten 16 gesendet.)
- **Abfrageintervall:** Intervall in Millisekunden für die Abfrage der Gerätewerte. Ist der Wert > 0, liest das Gerät alle Werte innerhalb dieses Intervalls. Erhöhen Sie das Intervall, wenn Sie falsche Messwerte erhalten. Ich empfehle, mit mindestens 15000 ms zu beginnen.
- **Aktiver Schalter:** Schalter zum Aktivieren oder Deaktivieren der Verwendung dieses Sensors
- **LED-Aktivschalter:** Mit dieser Einstellung können Sie die LED am EZO-Gerät aktivieren oder deaktivieren.

### Gemeinsame Funktionen (alle Geräte)

- **Schaltfläche "EZO-Platine suchen"** -> Durch Klicken auf diese Schaltfläche beginnt die LED auf der EZO-Platine schnell zu blinken.
- **Schaltfläche „Auf Werkseinstellungen zurücksetzen“** -> Führt einen Werksreset für dieses Gerät durch.
- **Schaltfläche „I2C-Adresse ändern“** -> Hier können Sie eine neue I2C-Adresse für diesen Adapter programmieren. Bitte speichern Sie die Konfiguration anschließend.

### Allgemeine Zustände / Objekte (alle Geräte)

Einige Zustände verfügen über einen Mechanismus zur Zustandsänderungserkennung, der es ermöglicht, bestimmte Werte nicht nur über die Admin-Oberfläche, sondern auch durch direkte Zustandsänderungen von außen (z. B. per Skript oder manuell) festzulegen. Dies kann beispielsweise nützlich sein, wenn Sie Kompensationswerte eines Sensors wie der Temperatur verwenden möchten, um den Temperaturkompensationswert des pH-Sensors anzupassen.

- **„IsPaused“** -> Schaltet alle Messwerte des Geräts vorübergehend an, es sei denn, es befindet sich während der Laufzeit im „Aktiv“-Modus. „true“ = angehalten, „false“ = Messungen aktiv. Der Wert ist beim Start/Neustart des Adapters standardmäßig auf „false“ (Messung aktiv) gesetzt.

## DO-bezogene Funktionen und Einstellungen

### DO Admin-UI-Elemente

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/do_config.png)

- **Schaltfläche „Kalibrierung löschen“** -> Kalibrierungsdaten löschen
- **Schaltfläche „Atmosphärische Kalibrierung“** -> Kalibrierung auf atmosphärische Sauerstoffwerte
- **Schaltfläche „0DO kalibrieren“** -> Gerät auf 0 gelösten Sauerstoff kalibrieren
- **Schaltfläche „Temperaturkompensation einstellen“** -> Geben Sie im Textfeld den gewünschten Wert für die Temperaturkompensation ein, z. B. 20,4.
- **Schaltfläche „Druckkompensation einstellen“** -> Geben Sie im Textfeld den gewünschten Wert für die Druckkompensation in kPa ein, z. B. 101,3.
- **Schaltfläche „Salzgehaltskompensation einstellen“** -> Geben Sie den gewünschten Wert für die Salzgehaltskompensation in das Textfeld ein, z. B. 50000 µs.
- **"isPpt"-Schalter** -> Schalter zur Festlegung, ob der Salzgehaltswert in der PPT-Datei anstatt in der Benutzeroberfläche gelesen/eingestellt wird.

### DO-Zustände mit Zustandsänderungserkennung

Für den DO-Sensor werden folgende Zustände auf Änderungen überwacht:

- **"Temperaturkompensation"** -> Legt die Temperaturkompensation fest
- **"Salinity\_compensation"** -> Legt die Salzkompensation fest
- **"Druckkompensation"** -> Legt die Druckkompensation fest
- **"Calibrate\_Clear"** -> Auf "true" setzen, um die Sensorkalibrierung zu löschen. Wird auf "false" gesetzt, wenn die Kalibrierung gelöscht wurde.
- **"Calibrate\_Atmospheric"** -> Auf "true" setzen, um eine Kalibrierung des Atmosphärensensors durchzuführen. Nach der Kalibrierung wird der Wert auf "false" gesetzt.
- **"Calibrate\_Zero\_DO"** -> Auf "true" setzen, um eine Kalibrierung des Sauerstoffsensors bei Nullpunkt durchzuführen. Nach der Kalibrierung wird der Wert auf "false" gesetzt.

## pH-bezogene Funktionen und Einstellungen

### PH Admin-UI-Elemente

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/ph_config.png)

- **Schaltfläche „Kalibrierung löschen“** -> Kalibrierungsdaten löschen
- **Schaltfläche "Kalibrieren Niedrig"** -> führt die Kalibrierung mit niedrigem Wert durch (normalerweise 4,0).
- **Schaltfläche "Mitte kalibrieren"** -> führt die Kalibrierung des Mittelwerts durch (normalerweise 7,0).
- **Schaltfläche „Hoch kalibrieren“** -> führt die Kalibrierung mit hohem Wert durch (normalerweise 10,0).
- **Schaltfläche „Temperaturkompensation einstellen“** -> Geben Sie im Textfeld den gewünschten Wert für die Temperaturkompensation ein, z. B. 20,4.

### pH-Werte einschließlich Zustandsänderungserkennung

Folgende Zustände des pH-Sensors werden auf Änderungen überwacht:

- **"Temperaturkompensation"** -> Legt die Temperaturkompensation fest
- **"Calibrate\_Clear"** -> Auf "true" setzen, um die Sensorkalibrierung zu löschen. Wird nach dem Löschen der Kalibrierung automatisch auf "false" zurückgesetzt.
- **„Kalibrieren\_Niedrig“** -> Geben Sie einen durch Punkte getrennten Wert ein, z. B. 4,0, um die Kalibrierung im niedrigen Bereich mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht.
- **„Calibrate\_Mid“** -> Geben Sie einen durch Punkte getrennten Wert ein, z. B. 7,0, um die Kalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht.
- **"Calibrate\_High"** -> Geben Sie einen durch Punkte getrennten Wert ein, z. B. 10,0, um die Kalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht.

## ORP-bezogene Funktionen und Einstellungen

### ORP Admin-UI-Elemente

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/orp_config.png)

- **Schaltfläche „Kalibrierung löschen“** -> Kalibrierungsdaten löschen
- **Schaltfläche „Kalibrieren“** -> auf den gewünschten Wert kalibrieren

### ORP-Zustände einschließlich Zustandsänderungserkennung

Für den ORP-Sensor werden folgende Zustände auf Änderungen überwacht:

- **"Temperaturkompensation"** -> Legt die Temperaturkompensation fest
- **"Calibrate\_Clear"** -> Auf "true" setzen, um die Sensorkalibrierung zu löschen. Wird nach dem Löschen der Kalibrierung automatisch auf "false" zurückgesetzt.
- **„Kalibrieren“** -> Geben Sie einen durch Punkte getrennten Wert ein, z. B. xx,x mV, um die Kalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht.

## Funktionen und Einstellungen im Zusammenhang mit Elektrotechnik

### EC Admin-UI-Elemente

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/ec_config.png)

- **Schaltfläche „Kalibrierung löschen“** -> Kalibrierungsdaten löschen

- **Schaltfläche „Trocken kalibrieren“** -> führt eine Kalibrierung des Trockensensors durch.

- **Schaltfläche „Niedrigen Punkt kalibrieren“** -> Gerät auf den gewünschten unteren Messpunkt kalibrieren

- **Schaltfläche „Hoch kalibrieren“** -> Gerät auf den gewünschten Höchstwert kalibrieren

- **Schaltfläche „Einzelpunkt kalibrieren“** -> Einzelpunktkalibrierung des Geräts auf den gewünschten Wert

- **Schaltfläche „Temperaturkompensation einstellen“** -> Geben Sie im Textfeld den gewünschten Wert für die Temperaturkompensation ein, z. B. 20,4.

- **Schaltfläche „TDS-Umrechnung einstellen“** -> Legen Sie den TDS-(ppt)-Umrechnungsfaktor mit dem gewünschten Wert aus dem Textfeld zwischen 0,001 und 1,00 fest.

- **Schaltfläche "Sondentyp festlegen"** -> Wählen Sie im Textfeld den gewünschten Sondentyp aus (K0.1, K1.0 oder K10).

- **"EC(us)"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von "Leitfähigkeit = μS/cm" innerhalb der Lesezeichenkette

- **"TDS(ppm)"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von "Gesamt gelöste Feststoffe = ppm" innerhalb der Lesezeichenkette

- **"S(ppt)"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von "Salinität = PSU (ppt) 0,00 – 42,00" innerhalb der Lesezeichenkette

- **"SG"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von "Spezifisches Gewicht (nur Meerwasser) = 1,00 – 1,300" innerhalb der Messwertzeichenkette

### EG-Staaten mit Zustandsänderungserkennung

Für den EC-Sensor werden folgende Zustände auf Änderungen überwacht:

- **"Temperaturkompensation"** -> Legt die Temperaturkompensation fest
- **"Calibrate\_Clear"** -> Auf "true" setzen, um die Sensorkalibrierung zu löschen. Wird auf "false" gesetzt, wenn die Kalibrierung gelöscht wurde.
- **"Calibrate\_Singlepoint"** -> Auf "true" setzen, um eine Einzelpunkt-Sensorkalibrierung durchzuführen. Nach der Kalibrierung wird der Wert auf "false" gesetzt.
- **"Calibrate\_Dry"** -> Auf "true" setzen, um eine Kalibrierung des Trockensensors durchzuführen. Nach der Kalibrierung wird der Wert auf "false" gesetzt.
- **"Calibrate\_Low"** -> Auf "true" setzen, um eine Kalibrierung des Niedrigtemperatursensors mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch zurückgesetzt.
- **"Calibrate\_High"** -> Auf "true" setzen, um eine Kalibrierung des Hochgeschwindigkeitssensors mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch zurückgesetzt.

## RTD-bezogene Funktionen und Einstellungen

### RTD Admin-UI-Elemente

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/rtd_config.png)

- **Schaltfläche „Kalibrierung löschen“** -> Kalibrierungsdaten löschen
- **Schaltfläche „Kalibrieren“** -> auf den gewünschten Wert kalibrieren

### RTD-Zustände einschließlich Zustandsänderungserkennung

Folgende Zustände des RTD-Sensors überwachen Änderungen:

- **"Calibrate\_Clear"** -> Auf "true" setzen, um die Sensorkalibrierung zu löschen. Wird nach dem Löschen der Kalibrierung automatisch auf "false" zurückgesetzt.
- **„Kalibrieren“** -> Geben Sie einen durch Punkte getrennten Wert ein, z. B. xx,x mV, um die Kalibrierung mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch gelöscht.

## Pumpenbezogene Funktionen und Einstellungen

### Pumpen-Admin-UI-Elemente

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/pump_config.png)

- **Schaltfläche „Kalibrierung löschen“** -> Kalibrierungsdaten löschen
- **Schaltfläche „Kalibrieren“** -> auf die gewünschte Lautstärke kalibrieren

### Pumpensteuerungsabschnitt

- **"Umkehr"-Schalter** -> Wenn diese Option in der Konfiguration aktiviert ist, werden alle Befehle an die Pumpe mit dem umgekehrten Flag ausgeführt, sodass die Pumpenrichtung umgekehrt wird.
- **Schaltfläche „Abgegebenes Volumen löschen“** -> Der Zähler für das gesamte abgegebene Volumen wird auf 0 zurückgesetzt.
- **Taste "Kontinuierliche Abgabe"** -> Die Pumpe läuft kontinuierlich mit ca. 105 ml/min (mit dem mitgelieferten Schlauch).
- **Taste „Ausgabe stoppen“** -> Die Pumpe stoppt die Ausgabe sofort.
- **„Pumpe pausieren“-Taste** -> Die Pumpe unterbricht die Abgabe sofort.
- **Schaltfläche „Dosis über Zeit einstellen“** -> Die Pumpe gibt die angegebene ml-Menge innerhalb der angegebenen Dauer in Minuten ab.
- **Taste „Ausgabemenge“** -> Die Pumpe gibt die angegebene Menge in ml ab.
- **Schaltfläche „Konstante Durchflussrate einstellen“** -> Die Pumpe gibt die angegebene Menge in ml pro Minute „ml/min“ für die angegebene Dauer in Minuten ab.

### Pumpenzustände einschließlich Zustandsänderungserkennung

Bei EZO Pumps überwachen die folgenden Zustände Änderungen:

- **"Kontinuierliche Abgabe"** -> Wenn auf "true" gesetzt, schaltet die Pumpe in den kontinuierlichen Abgabemodus mit 105 ml/min (Rückwärtsschalter berücksichtigt). Wenn auf "false" gesetzt, stoppt die Pumpe die Abgabe.
- **"Dosierung\_über\_Zeit"** -> Format: Kommagetrennte Werte ml, Dauer in min -> Gibt das angegebene Volumen über die angegebene Zeit in Minuten ab. ml für Volumen und Dauer in Minuten. Negative Werte lassen die Pumpe rückwärts laufen. Der Status wird nach Ausführung des Befehls automatisch zurückgesetzt.
- **„Volumen abgeben“** -> Gibt das angegebene Volumen (ml) ab. Negative Werte lassen die Pumpe rückwärts laufen. Der Status wird nach Ausführung des Befehls automatisch zurückgesetzt.
- **"Konstante Durchflussrate"** -> Format: Kommagetrennte Werte ml pro Minute, Dauer -> Gibt das angegebene Volumen/min über die angegebene Dauer in Minuten konstant ab. ml für Volumen/min und Dauer in Minuten. Negative Werte lassen die Pumpe rückwärts laufen. Der Status wird nach Ausführung des Befehls automatisch zurückgesetzt.
- **"Pause\_Pump"** -> Wenn auf "true" gesetzt, wird die Pumpe angehalten. Die Wiederaufnahme erfolgt beim nächsten Abgabevorgang.

## PRS-bezogene Funktionen und Einstellungen

### PRS Admin-UI-Elemente

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/prs_config.png)

- **Schaltfläche „Kalibrierung löschen“** -> Kalibrierungsdaten löschen

- **Schaltfläche „Nullpunkt kalibrieren“** -> Nullpunkt des Geräts kalibrieren

- **Schaltfläche „Hoch kalibrieren“** -> Gerät auf den gewünschten Höchstwert kalibrieren

- **"psi"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren der Option "Ausgabe erfolgt in PSI" innerhalb der Lesezeichenkette

- **"atm"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren von "Ausgabe erfolgt am Geldautomaten" innerhalb der Lesezeichenkette

- **"bar"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren der Option "Ausgabe in Balken" innerhalb der Lesezeichenkette

- **"kPa"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren der Option "Ausgabe in kPa" innerhalb der Lesezeichenkette

- **"inh2o"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren der Ausgabe "in Zoll Wassersäule" innerhalb der Lesezeichenkette

- **"cmh2o"-Schalter** -> Schalter zum Aktivieren oder Deaktivieren der Option "Ausgabe in cm Wassersäule" innerhalb der Lesezeichenkette

### PRS-Zustände mit Zustandsänderungserkennung

Für den PRS-Sensor werden folgende Zustände auf Änderungen überwacht:

- **"Calibrate\_Clear"** -> Auf "true" setzen, um die Sensorkalibrierung zu löschen. Wird auf "false" gesetzt, wenn die Kalibrierung gelöscht wurde.
- **"Zeropoint\_Kalibrieren"** -> Auf "true" setzen, um eine Nullpunktsensorkalibrierung durchzuführen. Nach der Kalibrierung wird der Wert auf "false" gesetzt.
- **"Calibrate\_High"** -> Auf "true" setzen, um eine Kalibrierung des Hochgeschwindigkeitssensors mit dem gewünschten Wert durchzuführen. Wird nach der Kalibrierung automatisch zurückgesetzt.
- **"Alarm\_enabled"** -> Auf "true" setzen, um den Alarm-Pin des Sensors zu aktivieren, auf "false", um ihn zu deaktivieren.
- **"Alarm\_Threshold"** -> Legen Sie den gewünschten Wert für den Alarmschwellenwert fest. Nach der Änderung wird der Wert an den Sensor übermittelt.
- **"Alarmtoleranz"** -> Legen Sie den gewünschten Wert für den Alarmschwellenwert fest. Nach der Änderung wird der Wert an den Sensor übermittelt.

## Visualisierungsbeispiel mit dem Grafana-Dashboard

Hier sehen Sie ein kleines Beispiel, wie einfach sich die Adapterwerte visualisieren lassen. In diesem Beispiel sammelt und speichert eine InfluxDB-Instanz die vom Adapter gelieferten Werte.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/dashboard_example.png)

<details>
  <summary>Example Code Grafana-Dashboard JSON</summary>

### JSON-Export aus Grafana

```json
{
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

## Skripte pro Javascript-Adapter-Instanz ausführen

In manchen Fällen ist die Verwendung von JavaScript-Codeausführung hilfreich. Ich habe dem Repository einige Beispiele inklusive Beschreibung hinzugefügt.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/jsadapter.png)

### Beispiel 1: Teilzeichenketten aus dem DO-Sensorwert extrahieren, die sich auf die aktiven Parameter mg/l und % beziehen

Dieses Skript ist für die Verwendung im JavaScript-Adapter „Skriptausführung“ vorgesehen. Die Datenpunkte müssen selbstverständlich an die lokale Konfiguration angepasst werden. Das Skript teilt die vom DO-Sensor gelieferte Wertezeichenkette, die je nach aktivierten Parametern mg/L oder Prozentwerte enthalten kann, in zwei Werte auf und speichert diese in zwei Datenpunkten.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/do_Substrings.png)

<details>
  <summary>Example 1 Script </summary>

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
```

</details>

### Beispiel 2: Einstellen der Temperaturkompensation für mehrere Sensoren

Dieses Skript ist für die Verwendung mit dem JavaScript-Adapter „Skriptausführung“ vorgesehen. Die Datenpunkte müssen selbstverständlich an die lokale Konfiguration angepasst werden. Es prüft die vom RTD-Sensor gelieferten Temperaturwerte und kürzt die Dezimalstellen auf 1. Bei einer Änderung vom alten zum neuen Wert werden die Temperaturkompensationszustände der gewünschten (Ziel-)Sensoren mit einem Zeitversatz gesetzt.

![Bild](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/tempcompensation.png)

<details>
  <summary>Example 2 Script </summary>

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
```

</details>

### HAFTUNGSAUSSCHLUSS

Bitte beachten Sie Urheberrechte und Markenrechte, wenn Sie Namen oder Logos von Unternehmen verwenden, und fügen Sie einen entsprechenden Hinweis in Ihre README-Datei ein. Beispiele finden Sie in anderen Adaptern oder Sie können in der Entwickler-Community nachfragen. Die Verwendung von Firmennamen oder -logos ohne Genehmigung kann rechtliche Konsequenzen haben.

## Lizenzen Dritter

Einige kleinere Teile dieses Projekts basieren auf ioBroker.i2c von UncleSamSwiss [(https://github.com/UncleSamSwiss/ioBroker.i2c).](https://github.com/UncleSamSwiss/ioBroker.i2c)

Copyright 2021 UncleSamSwiss

Lizenziert unter der Apache-Lizenz, Version 2.0 (die „Lizenz“). Sie dürfen diese Datei nur in Übereinstimmung mit der Lizenz verwenden. Eine Kopie der Lizenz erhalten Sie unter \[Link zur Lizenz].

<http://www.apache.org/licenses/LICENSE-2.0>

Sofern nicht durch geltendes Recht vorgeschrieben oder schriftlich vereinbart, wird die unter der Lizenz vertriebene Software auf einer "AS IS"-Basis ohne jegliche ausdrückliche oder stillschweigende Gewährleistung oder Bedingungen jeglicher Art vertrieben.

Die genauen Bestimmungen und Einschränkungen der Lizenz finden Sie in der Lizenz selbst.

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