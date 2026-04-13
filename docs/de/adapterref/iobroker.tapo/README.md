---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tapo/README.md
title: ioBroker.tapo
hash: zJ00Y8JOfjWdGGUkWKlwttkEu9B+n3zEk8j3EoF43aY=
---
![Logo](../../../en/adapterref/iobroker.tapo/admin/tapo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tapo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tapo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tapo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tapo-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tapo.png?downloads=true)

# IoBroker.tapo
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.tapo/workflows/Test%20and%20Release/badge.svg)

## Tapo-Adapter für ioBroker
Adapter für TP-Link Tapo

basiert auf https://github.com/apatsufas/homebridge-tapo-p100

## Anmeldeablauf
Die Tapo-Mail und das Passwort eingeben. Es werden die Geräte über die Cloud abgerufen, aber lokal gesteuert.
Wenn die IP nicht gefunden wird, muss sie manuell unter tapo.0.id.ip gesetzt werden.

## Status-Werte (eingehend)
Alle Geräte werden regelmäßig abgefragt. Die Werte werden automatisch unter `tapo.0.id.*` angelegt.

### Alle Geraete
Beispiel: `tapo.0.80A5897B21C7.nickname`, `tapo.0.80A5897B21C7.device_on`

| Wert | Typ | Beschreibung |
| --- | --- | --- |
| Nickname | String | Geraetename |
| Geräte-ID | Zeichenkette | Geräte-ID |
| Modell | Zeichenfolge | Modellbezeichnung |
| fw_ver | Zeichenkette | Firmware-Version |
| hw_ver | Zeichenkette | Hardwareversion |
| mac | Zeichenfolge | MAC-Adresse |
| device_on | boolescher Wert | Geraet ein/aus |
| on_time | Nummer | Einschaltdauer in Sekunden |
| RSSI | Nummer | WLAN-Signalstärke |
| Signalpegel | Nummer | Signalstärke (1-3) |
| ssid | Zeichenkette | WLAN-Name |
| ip | string | IP-Adresse |
| überhitzt | boolescher Wert | Überhitzungsstatus |

### Lampen (zusaetzlich)
Beispiel: `tapo.0.80A5897B21C7.brightness`, `tapo.0.80A5897B21C7.hue`

| Wert | Typ | Beschreibung |
| --- | --- | --- |
| Helligkeit | Zahl | Helligkeit (0-100) |
| color_temp | Zahl | Farbtemperatur in Kelvin |
| Farbton | Zahl | Farbton (0-360, nur L530/L630) |
| Sättigung | Zahl | Sättigung (0-100, nur L530/L630) |

### P110/P115 Energiedaten (zusaetzlich)
Beispiel: `tapo.0.80A5897B21C7.current_power`, `tapo.0.80A5897B21C7.voltage_mv`

| Wert | Typ | Beschreibung |
| --- | --- | --- |
| aktuelle_Leistung | Nummer | Aktuelle Leistung (mW) |
| today_energy | Zahl | Energieverbrauch heute (Wh) |
| Monat_Energie | Zahl | Energieverbrauch Monat (Wh) |
| voltage_mv | number | Spannung (mV) |
| Stromstärke (mA) | Zahl | Stromstärke (mA) |
| power_mw | Zahl | Leistung (mW) |
| Strom (Verbrauch) | Zahl | Aktuelle Leistung (W, berechnet) |
| Gesamt (Verbrauch) | Zahl | Energie heute (kWh, berechnet) |

### Hub-Sensoren (Kindergeräte)
Beispiel: `tapo.0.80A5897B21C7.child_SENSOR_ID.current_temp`

| Sensor | Werte | Beschreibung |
| --- | --- | --- |
| T100 (Bewegung) | erkannt | Bewegung erkannt |
| T110 (Kontakt) | öffnen | Tür/Fenster offen |
| T300 (Wasserleck) | water_leak_status, in_alarm | Wasserleck-Status |
| T310/T315 (Temp/Feuchte) | current_temp, current_humidity, temp_unit | Temperatur und Luftfeuchtigkeit |
| KE100 (Thermostat) | Zieltemperatur, aktuelle Temperatur, Frostschutz ein, Thermostatzustände | Thermostatstatus |

Alle Sensoren liefern zusätzlich `battery_percentage`, `at_low_battery` und `signal_level`.

### Kamera-Status
Beispiel: `tapo.0.80A5897B21C7.alarm`, `tapo.0.80A5897B21C7.personDetection`

| Wert | Typ | Beschreibung |
| --- | --- | --- |
| Alarm | boolescher Wert | Alarm aktiv |
| Augen | boolescher Wert | Privacy-Modus (invertiert: true = Kamera sieht) |
| Benachrichtigungen | boolescher Wert | Push-Benachrichtigungen aktiv |
| Bewegungserkennung | boolescher Wert | Bewegungserkennung aktiv |
| LED | Boolesch | LED aktiv |
| autoTrack | boolean | Auto-Tracking aktiv |
| personDetection | boolescher Wert | Personenerkennung aktiv |
| Fahrzeugerkennung | boolescher Wert | Fahrzeugerkennung aktiv |
| Haustiererkennung | boolescher Wert | Tiererkennung aktiv |
| babyCryDetection | boolescher Wert | Baby-Schrei-Erkennung aktiv |
| barkDetection | boolescher Wert | Bellen-Erkennung aktiv |
| meowDetection | boolescher Wert | Miauen-Erkennung aktiv |
| glassBreakDetection | boolescher Wert | Glasbruch-Erkennung aktiv |
| Manipulationserkennung | boolescher Wert | Manipulations-Erkennung aktiv |
| imageFlip | boolescher Wert | Bild vertikal gespiegelt |
| ldc | boolescher Wert | Linsenverzerrungskorrektur aktiv |
| recordAudio | boolescher Wert | Audio-Aufnahme aktiv |
| autoUpgrade | boolescher Wert | Firmware-Auto-Update aktiv |

Nicht jedes Gerät liefert alle Werte. Felder die das Gerät nicht unterstützt werden nicht angelegt.

### Kamera-Erkennungsereignisse
Beispiel: `tapo.0.80A5897B21C7.detection.active`, `tapo.0.80A5897B21C7.detection.events.0.alarm_type`

Die Kamera wird lokal gepollt und liefert Erkennungs-Events (Bewegung, Personen, etc.). Die letzten 10 Events werden abgerufen (`searchDetectionList`), neuestes Event zuerst.

| Wert | Typ | Beschreibung |
| --- | --- | --- |
| Erkennung.aktiv | boolescher Wert | true wenn Erkennung in den letzten 30 Sekunden |
| Erkennung.eventCount | Zahl | Anzahl Ereignisse in den letzten 10 Minuten |
| detection.events.0.start_time | number | Unix-Timestamp Start des neuesten Ereignisses |
| detection.events.0.end_time | number | Unix-Timestamp Ende des letzten Ereignisses |
| Erkennung.events.0.alarm_type | Zahl | Erkennungstyp (siehe Tabelle unten) |
| Erkennung.events.1.start_time | Zahl | Zweitneuestes Event (usw. bis 9) |
| Bewegungsereignis | boolescher Wert | ONVIF Echtzeit-Bewegungserkennung |

#### Alarmtyp-Werte
| ID | Beschreibung |
| --- | --- |
| 2 | Bewegung |
| 3 | Manipulation (Störung) |
| 4 | Linienüberquerung |
| 5 | Bereichsintrusion (Bereichsintrusion) |
| 6 | Person (Mensch) |
| 7 | Baby-Schrei |
| 8 | Fahrzeug (vehicle) |
| 9 | Stufe (Haustier) |
| 11 | Bellen (Berbe) |
| 12 | Miauen (Miau) |
| 13 | Glasbruch |
| 14 | Rauch |
| 15 | Paket abgelegt |
| 16 | Paket abgeholt |
| 20 | Gesichtserkennung |
| 32 | Herumlungern |

Nicht jede Kamera liefert alle Typen. Die verfügbaren Werte hängen von Modell und Firmware ab.

### Alarmkonfiguration
Beispiel: `tapo.0.80A5897B21C7.alarmInfo.enabled`, `tapo.0.80A5897B21C7.alarmInfo.alarm_volume`

| Wert | Typ | Beschreibung |
| --- | --- | --- |
| alarmInfo.enabled | string | Alarm aktiv (ein/aus) |
| alarmInfo.alarm_mode | mixed | Alarmmodus (z.B. Ton, Licht) |
| alarmInfo.alarm_volume | Zeichenfolge | Lautstaerke |
| alarmInfo.alarm_duration | Zeichenfolge | Dauer in Sekunden |
| alarmInfo.alarm_type | Zeichenfolge | Sirenen-Typ |
| alarmInfo.light_type | string | Licht-Typ |
| alarmInfo.light_alarm_enabled | string | Licht-Alarm aktiv (ein/aus) |
| alarmInfo.sound_alarm_enabled | string | Tonalarm aktiv (ein/aus) |

### Alarm-Event-Typen (welche Erkennungen lösen Alarm aus)
Beispiel: `tapo.0.80A5897B21C7.alertEventTypes.motion`, `tapo.0.80A5897B21C7.alertEventTypes.person`

| Wert | Typ | Beschreibung |
| --- | --- | --- |
| alarmEventTypes.motion | boolescher Wert | Alarm bei Bewegung |
| alertEventTypes.person | boolean | Alarm bei Person |
| alarmEventTypes.vehicle | boolescher Wert | Alarm bei Fahrzeug |
| alertEventTypes.pet | boolean | Alarm bei Tier |

### Benachrichtigungen einrichten
Für Benachrichtigungen bei Erkennung ein ioBroker-Skript auf `detection.events.0.start_time` triggern:

```javascript
const alarmTypen = { 2:'Bewegung', 3:'Manipulation', 4:'Linienueberquerung', 5:'Bereichsintrusion',
  6:'Person', 7:'Baby-Schrei', 8:'Fahrzeug', 9:'Tier', 11:'Bellen', 12:'Miauen',
  13:'Glasbruch', 14:'Rauch', 15:'Paket abgelegt', 16:'Paket abgeholt', 20:'Gesicht', 32:'Herumlungern' };

on({ id: 'tapo.0.DEVICE_ID.detection.events.0.start_time', change: 'ne' }, (obj) => {
  const typ = getState('tapo.0.DEVICE_ID.detection.events.0.alarm_type').val;
  sendTo('telegram.0', {
    text: (alarmTypen[typ] || 'Typ ' + typ) + ' um ' + new Date(obj.state.val * 1000).toLocaleString()
  });
});
```

Blockly-Beispiel (als XML importierbar):

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="on_ext" x="38" y="13">
    <mutation xmlns="http://www.w3.org/1999/xhtml" items="1"></mutation>
    <field name="CONDITION">ne</field>
    <field name="ACK_CONDITION"></field>
    <value name="OID0">
      <shadow type="field_oid">
        <field name="oid">tapo.0.DEVICE_ID.detection.events.0.start_time</field>
      </shadow>
    </value>
    <statement name="STATEMENT">
      <block type="telegram">
        <field name="INSTANCE">.0</field>
        <field name="LOG"></field>
        <value name="MESSAGE">
          <block type="text_join">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="text">
                <field name="TEXT">Tapo Erkennung: Typ </field>
              </block>
            </value>
            <value name="ADD1">
              <block type="get_value">
                <field name="ATTR">val</field>
                <field name="OID">tapo.0.DEVICE_ID.detection.events.0.alarm_type</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="text">
                <field name="TEXT"> erkannt</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>
```

Das Polling-Intervall ist in den Adaptereinstellungen konfigurierbar (Standard: 10 Sekunden). Alles lokal, kein Cloud-Zugriff noetig.

## Steuern
tapo.0.id.remote auf true/false setzen steuert den jeweiligen Befehl. Der Befehl wird lokal an das Gerät gesendet.

### Stecker / Schalter (P100, P110, P115, ...)
| Fernbedienung | Typ | Beschreibung |
| --- | --- | --- |
| Aktualisieren | Boolesch | Manuelle Statusaktualisierung |
| setPowerState | boolescher Wert | Ein/Aus |
| setPowerStateChild | Zeichenfolge | Kindergerät steuern: `childId,true` oder `childId,false` |
| setLedEnabled | boolescher Wert | LED-Anzeige ein/aus |
| setAutoOff | boolescher Wert | Auto-Off-Timer ein/aus |
| setAutoOffDelay | Zahl | Auto-Off-Verzögerung in Minuten |
| setChildProtection | boolescher Wert | Tastensperre ein/aus |
| setPowerProtection | boolescher Wert | Überlastschutz ein/aus |
| setPowerProtectionThreshold | Nummer | Überlast-Schwellwert in Watt |
| setAutoUpdate | boolescher Wert | Firmware-Auto-Update ein/aus |

P110/P115 liefern zusätzlich Energiedaten (Leistung, Spannung, Strom).

### Lampen (L510E, L520E, L530, L630, L900, L920, ...)
Alle Plug-Remotes plus:

| Fernbedienung | Typ | Beschreibung |
| --- | --- | --- |
| setBrightness | Zahl | Helligkeit setzen |
| setColorTemp | Zahl | Farbtemperatur (2500-6500K) |
| setColor | Zeichenfolge | Farbe setzen: `hue, saturation` |
| setLightEffect | Zeichenfolge | Lichteffekt-ID oder „aus“ |
| setGradualOnOff | boolescher Wert | Sanftes Ein-/Ausschalten |

### Fans (F1xx)
| Fernbedienung | Typ | Beschreibung |
| --- | --- | --- |
| setFanSpeedLevel | Zahl | Geschwindigkeit 0-4 (0 = aus) |
| setFanSleepMode | boolescher Wert | Schlafmodus ein/aus |

### Hub (H100, H200)
| Fernbedienung | Typ | Beschreibung |
| --- | --- | --- |
| playAlarm | boolescher Wert | Alarm abspielen |
| stopAlarm | boolescher Wert | Alarm stoppen |
| setAlarmVolume | Zeichenfolge | Alarmlautstärke: stumm/niedrig/normal/hoch |
| setAlarmDuration | Zahl | Alarmdauer in Sekunden |

### Thermostat / TRV (KE100)
| Fernbedienung | Typ | Beschreibung |
| --- | --- | --- |
| setTargetTemperature | Zahl | Zieltemperatur setzen |
| setTemperatureOffset | Zahl | Temperatur-Offset (-10 bis 10) |
| setFrostProtection | boolescher Wert | Frostschutz ein/aus |

### Hub-Sensoren (T100, T110, T300, T310, T315)
Sensordaten (Temperatur, Luftfeuchtigkeit, Bewegung, Kontakt, Wasserleck) werden automatisch über `getChildDeviceList` abgerufen und als Status angezeigt.

### Kameras (C200, C310, C520, TC70, ...)
| Fernbedienung | Typ | Beschreibung |
| --- | --- | --- |
| Aktualisieren | Boolesch | Manuelle Statusaktualisierung |
| setAlertConfig | boolescher Wert | Alarm ein/aus |
| setLensMaskConfig | boolean | Privacy (Eyes) ein/aus |
| setForceWhitelampState | boolescher Wert | Weisslicht ein/aus |
| setLedStatus | boolescher Wert | LED ein/aus |
| setMsgPushConfig | boolescher Wert | Benachrichtigungen ein/aus |
| setDetectionConfig | boolescher Wert | Bewegungserkennung ein/aus |
| setAutoTrackTarget | boolescher Wert | Auto-Tracking ein/aus |
| setPersonDetection | boolescher Wert | Personenerkennung ein/aus |
| setVehicleDetection | boolescher Wert | Fahrzeugerkennung ein/aus |
| setPetDetection | boolescher Wert | Tiererkennung ein/aus |
| setBabyCryDetection | boolescher Wert | Baby-Schrei-Erkennung ein/aus |
| setBarkDetection | boolescher Wert | Bellen-Erkennung ein/aus |
| setMeowDetection | boolescher Wert | Miauen-Erkennung ein/aus |
| setGlassBreakDetection | boolescher Wert | Glasbruch-Erkennung ein/aus |
| setTamperDetection | boolescher Wert | Manipulations-Erkennung ein/aus |
| setImageFlipVertical | boolescher Wert | Bild vertikal spiegeln |
| setLensDistortionCorrection | boolescher Wert | Linsenverzerrungskorrektur ein/aus |
| setRecordAudio | boolescher Wert | Audio ein/aus | aufnehmen |
| setAutoUpgrade | boolescher Wert | Firmware-Auto-Update ein/aus |
| setHDR | boolescher Wert | HDR ein/aus |
| setCoverConfig | boolean | Privacy Zones ein/aus |
| setRecordPlan | boolescher Wert | SD-Karten Aufnahme ein/aus |
| moveMotor | Zeichenfolge | Kamera bewegen: `x, y` (-360..360, -45..45) |
| moveMotorStep | Zeichenfolge | Schrittwinkel (0-360) |
| moveToPreset | Zeichenfolge | Zu Preset fahren (ID) |
| kalibrierenMotor | boolescher Wert | Motor kalibrieren |
| savePreset | Zeichenfolge | Preset speichern (Name) |
| deletePreset | string | Preset loeschen (ID) |
| setCruise | string | Patrol: x/y/off |
| startManualAlarm | boolescher Wert | Manueller Alarm starten |
| stopManualAlarm | boolescher Wert | Manueller Alarm stoppen |
| setAlarmMode | Zeichenkette | Alarm-Modus: beide/Licht/Ton/aus |
| setDayNightMode | Zeichenfolge | Tag/Nacht-Modus: automatisch/ein/aus |
| setLightFrequencyMode | Zeichenfolge | Lichtfrequenz: Auto/50/60 |
| setSpeakerVolume | Zahl | Lautsprecher-Lautstärke (0-100) |
| setMicrophoneVolume | Zahl | Mikrofon-Lautstärke (0-100) |
| setMotionDetectionSensitivity | string | Bewegungs-Sensitivity: high/normal/low |
| setPersonDetectionSensitivity | Zeichenfolge | Personen-Sensibilität: hoch/normal/niedrig |
| setOsd | Zeichenfolge | OSD-Beschriftungstext |
| neu starten | boolescher Wert | Kamera neu starten |
| formatSdCard | boolescher Wert | SD-Karte formatieren |

Nicht jede Kamera unterstützt alle Funktionen. Nicht unterstütze Befehle werden mit einer Fehlermeldung im Log quittiert.

## Kamerasteuerung aktivieren
![Alternativtext](./img/tpcamera01.jpeg "TP Labor") ![Alternativtext](../../../en/adapterref/iobroker.tapo/img/tpcamera02.jpeg "TP Labor")

## Diskussion und Fragen
<https://forum.iobroker.net/topic/57336/test-adapter-tp-link-tapo/>

## Changelog
### 0.5.0 (2026-04-02)

- Support for TPAP/SPAKE2+ protocol (P100 FW 1.4.3+ and newer devices)
- Support for KLAP v1 (md5) handshake
- Fix camera connection for firmware 1.9.1+ (C310 etc.)
- 30+ new camera remotes (detection, motor, alarm, cruise, presets, image/audio, OSD)
- New data points for camera status and detection events
- New remotes for plugs, lamps, fans, hubs and thermostats
- Device-specific remotes (only relevant controls per device type)
- Energy data (voltage, current) for P110/P115
- Automatic reconnect for devices that go offline and come back
- Less log spam for unreachable devices

### 0.4.8 (2025-02-04)

- disable sentry to prevent crashes

### 0.4.7 (2025-01-14)

- disable battery devices
- improved wrong formatted mail adresses

### 0.4.6 (2025-01-10)

- add checks for battery devices

### 0.4.5 (2024-12-16)

- fix camera remotes

### 0.4.4 (2024-12-12)

- improve handshake if e-mail is not entered in lowercase

### 0.4.3 (2024-12-09)

- fix handshake for device with HW v1.20

### 0.4.1 (2024-11-29)

- fixed Get Device Info failed error

### 0.3.4 (2024-11-10)

- update Tapo local lib

### 0.3.3 (2024-06-17)

- ignore ssl legacy error
-

### 0.3.2 (2024-05-27)

update onvif lib to fix issues with newer cameras

### 0.2.9 (2024-01-30)

- fix tapo Plugs and setLensMask

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2030 TA2k <tombox2020@gmail.com>

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