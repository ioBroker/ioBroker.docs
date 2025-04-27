---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.worx.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.worx.svg
BADGE-Number of Installations: https://iobroker.live/badges/worx-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/worx-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.worx.png?downloads=true
---
![Logo](../../admin/worx.png)

# ioBroker.worx Adapter

## Wichtige Info

🟢 1,1 Sekunde Pause zwischen 2 Aktive Schaltvorgänge</br>
🔴 Keine Pause und der nächste aktive auch ohne Pause

Falsch</br>
🟢🟢🟢

Richtig</br>
🟢1,1🟢1,1🟢

Falsch</br>
🔴🔴🟢🟢

Richtig</br>
🔴🔴🟢1,1🟢

Falsch</br>
🔴🟢🔴🟢

Richtig</br>
🔴🟢1,1🔴🟢

## Beschreibung

### Instanzeinstellungen

- `App-Benutzername`: APP Benutzername (eMail)
- `App-Passwort`: APP Passwort
- `App Name`: Geräte auswählen
- `Aktualisierungsintervall in Minuten` Intervall um alle Daten zu aktualisieren (Bereich von 10 bis 1440 möglich)
- `Verzögerung für Kantenschnitt`: Wann soll EdgeCut nach dem Losfahren starten (Beispiel nach 5 Sekunden bis zum Rasen)
- `Entfernung und Zeit in Minuten und Metern`: Einheit für Laufzeit und Arbeitszeit in Min./Std. und Meter/KM
- `Aktualisieren der MQTT-Daten nach der Token-Aktualisierung.`: Nach der Erneuerung vom Token (jede Stunde) die Mqtt Daten neu laden.
- `Sitzungsdaten löschen` Bei Login Probleme die aktuelle Session löschen
- `Login-Zähler zurücksetzen` Login-Zähler zurücksetzen

![Instance Settings img/instance.png](img/instance.png)</br>
![Instance Settings img/instance_1.png](img/instance_1.png)

### Login Infos `worx.0.loginInfo`

```json
{
    "loginCounter": 1, // Zähler der Logins (reset via instance setting)
    "loginDiff": [1741458177709], // Zeitliche Differenz der letzten 10 Logins
    "lastLoginTimestamp": 1741458177709, // Letzte Login als Zeitstempel
    "lastLoginDate": "2025-03-08T18:22:57.710Z", // Letzte Login als ISO String OHNE Zeitzone
    "refreshCounter": 1, // Zähler für refreshToken (wird bei Neustart zurückgesetzt)
    "refreshHistory": [1741516809807], // Historie refreshToken als Zeitstempel
    "lastRefreshTimestamp": 1741459690942, // Letzte refreshToken als Zeitstempel
    "lastRefreshDate": "2025-03-08T18:48:10.942Z", // Letzte refreshToken als ISO String OHNE Zeitzone
    "nextRefreshTimestamp": 1743548215943, // Nächste refreshToken als Zeitstempel
    "nextRefreshDate": "2025-04-01T22:56:55.943Z", // Nächste refreshToken als ISO String OHNE Zeitzone
    "lastError": "", // Letzte Fehlermeldung
    "errorHistory": [], // Error Historie als Zeitstempel
    "errorCounter": 0, // Zähler der Fehlermeldungen (wird bei Neustart zurückgesetzt)
    "lastErrorTimestamp": 0, // Letzte Fehlermeldung als Zeitstempel
    "lastErrorDate": "" // Letzte Fehlermeldung als ISO String OHNE Zeitzone
}
```

### Ordner

- `activityLog`: Aktivitätenprotokoll (Draht & Vision / Kontrolle möglich)
- `areas`: Zonen (Draht / Kontrolle möglich)
- `multiZones`: Multizonen (Vision / Kontrolle möglich)
- `calendar`: Mähplan (Draht & Vision / Kontrolle möglich)
- `Modules`: Verfügbare Module (Draht & Vision / Kontrolle möglich)
- `mower`: Mäher (Draht & Vision / Kontrolle möglich)
- `product`: Alle Eigenschaften vom Gerät (Draht & Vision / Nur lesen)
- `rawMqtt`: Alle Daten von der Cloud (Draht & Vision / Nur lesen)

![Folder img/all_folders.png](../en/img/all_folders.png)

### activityLog (Draht und Vision)

- `last_update`: Letzte Update als Zeitstempel (nur lesen)
- `manuell_update`: Lädt das aktuelle Aktivitätenprotokoll (automatisch nach Statusänderungen - Draht & Vision / Kontrolle möglich) 🟢
- `payload`: Protokoll als JSON (für VIS oder Blockly) (nur lesen)

![Activity img/activity.png](../en/img/activity.png)

### areas (Nur Draht)

- `actualArea`: Aktuelle Zone (nur lesen)
- `actualAreaIndicator`: Nächste Zonenanfahrt im Array. Bsp. 0 - [`2`,2,2,2,2,2,2,2,2,2] (nur lesen)
- `area_0`: Start Zone 1 in Meter (array=0) (änderbar) 🟢
- `area_1`: Start Zone 2 in Meter (array=1) (änderbar) 🟢
- `area_2`: Start Zone 3 in Meter (array=2) (änderbar) 🟢
- `area_3`: Start Zone 4 in Meter (array=3) (änderbar) 🟢
- `startSequence`: Zonenstart Array (0-9 Ereignisse) Bsp.: Nur Zone 3 anfahren [2,2,2,2,2,2,2,2,2,2] (änderbar) 🟢
- `zoneKeeper`: Verhindert Zonendurchbrüche (Zonen müssen erstellt sein) (ab Firmware 3.30) (änderbar) 🟢

![Area img/areas.png](../en/img/areas.png)

### calendar (Draht)

- Beispiel Zeiteinstellung Mittwoch

    - `wednesday.borderCut`: Mit oder ohne Kantenschnitt (ohne Verzögerung setzen) (änderbar) 🔴
    - `wednesday.startTime`: Startzeit als Format hh:mm (0-23/0-59) Bsp.: 09:00 (ohne Verzögerung setzen) (änderbar) 🔴
    - `wednesday.workTime`: Arbeitszeit in Minuten (180 min = 3h) Bsp.: 30 = Endzeit 09:30 (ohne Verzögerung setzen) (änderbar) 🔴
    - `calJson_sendto`: Sind alle Datenpunkte gesetzt dann diesen Button auf true setzen. Der Mäher mäht nun für 30 Minuten! (änderbar) 🟢
    - `calJson_tosend`: Dieser JSON wird automatisch gefüllt und dann an Mqtt versendet. Kann natürlich auch selber erstellt werden. (änderbar) 🟢
    - `calendar.calJson`: Array für den Wochenmähplan 1 (wird automatisch gesetzt - nur Draht) (änderbar) 🔴
    - `calendar.calJson2`: Array für den Wochenmähplan 2 (wird automatisch gesetzt - nur Draht) (änderbar) 🔴

![Folder img/calendar.png](../en/img/calendar.png)

### calendar (Vision)

- Beispiel Zeiteinstellung Freitag
- Als Standard werden 2 Timeslots angelegt. Werden 3 Slots in der APP angelegt werden auch 3 in ioBroker erstellt. Wird wieder auf 2 reduziert, dann wird in ioBroker diese Slots gelöscht. Der Tag mit den meisten Slots wird als Referenz für alle Tage verwendet.

    - `friday.time_0.borderCut`: Mit oder ohne Kantenschnitt (ohne Verzögerung setzen) (änderbar) 🔴
    - `friday.time_0.startTime`: Startzeit als Format hh:mm (0-23/0-59) Bsp.: 09:00 (ohne Verzögerung setzen) (änderbar) 🔴
    - `friday.time_0.workTime`: Arbeitszeit in Minuten (180 min = 3h) Bsp.: 30 = Endzeit 09:30 (ohne Verzögerung setzen) (änderbar) 🔴
    - `friday.time_0.enabled_time`: Zeit aktivieren oder deaktivieren. (ohne Verzögerung setzen) (änderbar) 🔴
    - `friday.time_0.zones`: Welche Zonen sollen angefahren werden z. Bsp. [1,2,3] (ohne Verzögerung setzen) (änderbar) 🔴
    - `calJson_sendto`: Sind alle Datenpunkte gesetzt dann diesen Button auf true setzen. Der Mäher mäht nun für 30 Minuten! (änderbar) 🟢
    - `calJson_tosend`: Dieser JSON wird automatisch gefüllt und dann an Mqtt versendet. Kann natürlich auch selber erstellt werden. (änderbar) 🔴
    - `add_timeslot`: Es wird ein zusätzlicher Timeslot hinzugefügt. Nicht genutzte Timeslots werden nach einem Neustart entfernt. (änderbar) 🔴

![Folder img/calendar.png](img/calendar_vision.png)
![Folder img/calendar.png](img/calendar_slot_vision.png)

### Beispiel Timeslot (Vision)

- `calJson_tosend` Dieser JSON würde 1 Zeit am Sonntag eintragen und alle anderen Tage löschen. Es muss immer die gesamte Woche übermittelt werden. 🔴

```json
[
    {
        "e": 1, // 0=deaktiviert/1=aktiviert - Bei 0 wird der Slot deaktiviert
        "d": 0, // Tage 0=Sonntag, 1=Montag, 2=Dienstag, 3=Mittwoch, 4=Donnerstag, 5=Freitag, 6=Samstag
        "s": 360, // Startzeit in Minuten 06:00 (360/60) - (320/60 = 5 Stunden und 20 Minuten)
        "t": 180, // Laufzeit in Minuten = Endzeit 09:00 (180/60) - (200/60 = 3 Stunden und 20 Minuten)
        "cfg": {
            "cut": {
                "b": 1, // 0=ohne Kantenschnitt/1=Mit Kantenschnitt
                "z": [1] // In which zones - example 3 zones [1,2,6]
            }
        }
    }
]
```

### modules (Draht und Vision)

- Off Limit Modul (Draht und Vision)

    - `DF.OLMSwitch_Cutting`: Verhindert das überfahren vom Magnetband - true-an/false-aus 🟢
    - `DF.OLMSwitch_FastHoming`: Verwendet erstellte Abkürzungen mit Magnetband - mithilfe von Abkürzungen aus Magnetstreifen - true-an/false-aus 🟢

- ACS Modul (nur Draht)

    - `US.ACS`: ACS aktivieren oder deaktivieren - 1-on/0-off 🟢
    - `US.ACS_Status`: Status vom ACS Modul (nur lesen)

- EA Modul (nur Vision)

    - `EA.height`: Höheneinstellung Mähwerk von 30-60 in 5mm Schritte 🟢

- HL Modul (nur Vision)
    - `HL.status`: Status Scheinwerfer (nur lesen)
    - `HL.enabled`: Scheinwerfer installiert ja = 1/nein = 0 🟢
    - `HL.on`: Tageslicht = 0/Dunkelheit = 1 🟢

![Module img/module.png](../en/img/module.png)
![Module img/module_ea.png](../en/img/module_ea.png)
![Module img/module_hl.png](../en/img/module_hl.png)

### mower (Draht und Vision)

- `AutoLock`: automatische Verriegelung true-an/false-aus (Draht & Vision/änderbar) 🟢
- `AutoLockTimer`: Timer für automatische Verriegelung max. 10 Minuten in 30 Sekunden Schritte (Draht & Vision/änderbar) 🟢
- `batteryChargeCycle`: Batterieladezyklus (Draht & Vision/nur lesen)
- `batteryCharging`: Batterieladung false->nein/true->ja (Draht & Vision/nur lesen)
- `batteryState`: Batteriestatus in % (Draht & Vision/nur lesen)
- `batteryTemperature`: Batterietemperatur in Celsius (Draht & Vision/nur lesen)
- `batteryVoltage`: Batteriespannung in Volt (Draht & Vision/nur lesen)
- `cameraStatus`: Status Camera 0=OK/1=Error (Vision/nur lesen)
- `cameraError`: Camera error 0=OK/1=Error (Vision/nur lesen)
- `cutOverSlabs`: Über Platten mähen an = true / aus = false (Vision/änderbar) 🟢
- `direction`: Richtung in Grad (Draht & Vision/nur lesen)
- `edgecut`: Start EdgeCut (Draht & Vision/änderbar) 🟢
- `error`: Errormeldung vom Mäher (Draht & Vision/nur lesen)

```json
{
    "states": {
        "0": "No error", //(Draht & Vision & RTK)
        "1": "Trapped", //(Draht & Vision & RTK-Body)
        "2": "Lifted", //(Draht & Vision & RTK-Body)
        "3": "Wire missing", //(Draht)
        "4": "Outside boundary", //(Draht & Vision & RTK-Body)
        "5": "Raining", //(Draht & Vision & RTK-Body)
        "6": "Close door to cut grass", //(Draht)
        "7": "Close door to go home", //(Draht)
        "8": "Blade motor fault", //(Draht & Vision & RTK-Body)
        "9": "Wheel motor fault", //(Draht & Vision & RTK-Body)
        "10": "Trapped timeout fault", //(Draht & Vision & RTK-Body)
        "11": "Upside down", //(Draht & Vision & RTK-Body)
        "12": "Battery low", //(Draht & Vision & RTK)
        "13": "Wire reversed", //(Draht)
        "14": "Charge error", //(Draht & Vision & RTK-Body)
        "15": "Home search timeout", //(Draht & Vision)
        "16": "Wifi locked", //(Draht & Vision)
        "17": "Battery over temperature", //(Draht & Vision & RTK)
        "18": "Dummy model", //(Draht)
        "19": "Battery trunk open timeout", //(Draht & Vision)
        "20": "Wire signal out of sync", //(Draht)
        "100": "Charging station docking error", //(RTK-Body)
        "101": "HBI error", //(RTK-Body)
        "102": "OTA upgrade error", //(Vision & RTK)
        "103": "Map error", //(RTK)
        "104": "Excessive slope", //(RTK-Body)
        "105": "Unreachable zone", //(RTK-Body)
        "106": "Unreachable charging station", //(RTK-Body)
        "107": "Calibration needed", //(RTK-Head)
        "108": "Insufficient sensor data", //(RTK)
        "109": "Training start disallowed", //(RTK)
        "110": "Camera error", //(Vision)
        "111": "Lawn exploration required", //(Vision)
        "112": "Mapping exploration failed", //(Vision)
        "113": "RFID reader error", //(Vision)
        "114": "Headlight error", //(Vision)
        "115": "Missing charging station", //(RTK-Body)
        "116": "Blade height adjustment blocked", //(Vision & RTK-Body)
        "117": "Unsupported blade height", //(Vision & RTK-Body)
        "118": "Manual firrnware upgrade required", //(Vision & RTK-Body)
        "119": "Area limit exceeded", //(RTK-Body)
        "120": "Charging station undocking error" //(RTK-Body)
    }
}
```

![Mower img/mower_1.png](img/mower_1.png)

- `firmware`: Installierte Firmware (Draht & Vision/nur lesen)
- `firmware_available`: Verfügbare Firmware (Draht & Vision/nur lesen)
- `firmware_available_all`: Letzte verfügbare Firmware als JSON - Dieses JSON wird aktualisiert, wenn ein neues Update zur Verfügung steht (Draht & Vision/nur lesen)

```json
{
    "mandatory": false,
    "product": {
        "uuid": "1236ll8d-0000-0000-9999-07ff6690003f",
        "version": "3.30.0+1",
        "released_at": "2023-05-24",
        "changelog": "•\tSupport for new models \tWR166E and WR184E\n•\tImproved Grass cutting coverage\n•\tImproved ACS\n•\tAdded Zone Keeper function (need to be enabled by app)\n•\tImproved wheel torque algorithm\n• \tNew FML firmware\n•\tFixed \"FML\" and \"Radiolink\" Activation problem\n•\tFixed some translations error\n•\tRain delay can now be cleared pressing START / HOME button, (1 minute after countdown has started)\n•\tImproved PRO Battery management\n• \tImproved boundary wire recognition\n• \tFixed border cut when zones are active\n• \tNew wifi firmware for board HW REV > 7\n\nThe Worx Landroid team would like to thank our amazing beta testers, with hundreds of hours of their own free time to make this firmware possible."
    }
}
```

- `firmware_available_date`: Datum verfügbaren Firmware - Dummy 1970-01-01 wenn der Adapter neu installiert wird und es kein Update zur Verfügung steht (Draht & Vision/nur lesen)
- `firmware_body` Inhalt von dat.fw (Vision/nur lesen)
- `firmware_head` Inhalt dat.head.fw (Vision/nur lesen)
- `firmware_update_start`: Start Update in 2 Schritten - siehe `firmware_update_start_approved` (Draht & Vision/änderbar) 🔴
- `firmware_update_start_approved`: Aktualisierung der Firmware starten - `firmware_update_start` muss auf true gesetzt sein (Draht & Vision/änderbar) 🟢
- `gradient`: Gefälle oder Anstieg in Grad (Draht & Vision/nur lesen)
- `inclination`: Neigung in Grad (Draht & Vision/nur lesen)
- `last_command`: Letzter Befehl von iobroker oder der APP als JSON Table (Draht & Vision/nur lesen)
- `last_update` Letzte Update (wire & Vision/nur lesen)
- `last_update_connection` Von welcher Verbindung (Mqtt oder Cloud / wire & Vision/nur lesen)
- `mowTimeExtend`: Mähzeitverlängerung-/Verkürzung in % Bereich: -100%->100% (Draht/änderbar) 🟢
- `mowerActive`: false für Pause Mähplan für 60 Minuten und true für Stop Mähpause und Party-Modus (Draht/änderbar) 🟢
- `mqtt_update`: Update Mqtt Daten vom Mäher - max. 150/Tag (Draht & Vision/änderbar) 🟢
- `mqtt_update_count`: Counter von Update Mqtt Daten (Draht & Vision/nur lesen)
- `notification`: Benachrichtigung über JS-Controller aktivieren oder deaktivieren. Es wird Offline und Fehlermeldungen ausgegeben. (Draht & Vision/änderbar) 🔴

![Mower img/mower_2.png](img/mower_2.png)</br>
![Mower img/info_connection.png](img/info_connection.png)

- `oneTimeJson`: einmaliges Mähen als JSON (Draht & Vision/änderbar)

```json
{
    "wtm": 60, //Minuten
    "bc": 0 //0=ohne Kantenschnitt 1=mit Kantenschnitt - oder die nächsten Datenpunkte verwenden
}
```

- `oneTimeStart`: einmaliges Mähen start "Erst oneTimeWithBorder, oneTimeWorkTime und beim Vision noch oneTimeZones setzen" - mit einer Verzögerung von 1,1 Sekunde (Draht & Vision/änderbar) 🟢
- `oneTimeWithBorder`: Mit Kantenschnitt - Wert ohne Verzögerung setzen (Draht & Vision/änderbar) 🔴
- `oneTimeWorkTime`: Mähzeit max. 8h in 30 Minuten Schritte - Wert ohne Verzögerung setzen (Draht & Vision/änderbar) 🔴
- `oneTimeZones`: Zonen setzen [1,2,4] (Vision/änderbar) 🔴
- `online`: Mäher Online (Draht & Vision/nur lesen)
- `partyModus`: Party-Modus schalten an/aus (Draht & Vision/änderbar) 🟢
- `partyModusTimer`: Party-Modus zeitlich limitieren. Möglich 1 - 1440 Minuten - Mit `partyModus` auf "false" setzen wieder deaktivieren. Der Partymodus wird in der APP nicht angezeigt aber der Timer wird runtergezählt. (Draht/änderbar) 🟢
- `pause`: Mähpause schalten an/aus (Draht & Vision/änderbar) 🟢
- `reset_battery_time`: Batterieladungen in 2 Schritten zurücksetzen (Draht & Vision/änderbar) 🔴
- `reset_battery_time_approved`: Batterieladungen zurücksetzen bestätigen - `reset_battery_time` muss auf true gesetzt sein (Draht & Vision/änderbar) 🔴
- `reset_blade_time`: Klingenarbeitszeit in 2 Schritten zurücksetzen (Draht & Vision/änderbar) 🔴
- `reset_blade_time_approved`: Klingenarbeitszeit zurücksetzen bestätigen - `reset_battery_time` muss auf true gesetzt sein (Draht & Vision/änderbar) 🔴

![Mower img/mower_3.png](img/mower_3.png)

- `rfidStatus`: Status RF Sensor 0=OK/1=Fehler (Vision/nur lesen)
- `sendCommand`: Ein Befehl versenden (Draht & Vision/änderbar) 🟢

```json
{
    "states": {
        "1": "Start", //(Draht & Vision & RTK)
        "2": "Stop", //(Draht & Vision & RTK)
        "3": "Home", //(Draht & Vision & RTK)
        "4": "Follow border", //(Draht & Vision & RTK)
        "5": "Wi-Fi Lock", //(Draht & Vision)
        "6": "Wi-Fi Unlock", //(Draht & Vision)
        "7": "Reset Log", //(Draht & Vision & RTK)
        "8": "Pause over border", //(Draht & Vision)
        "9": "Safe go home", //(Draht & Vision & RTK)
        "10": "Start once", //(Vision)
        "100": "Pairing command", //(Vision & RTK)
        "101": "Border Cut", //(Vision & RTK)
        "102": "Resume cutting", //(RTK)
        "103": "Start driving", //(Vision & RTK)
        "104": "Stop driving" //(Vision & RTK)
    }
}
```

- `state`: True für Mähvorgang starten und False für Mähvorgang beenden (Draht & Vision/änderbar) 🟢
- `status`: Status vom Mäher (Draht & Vision & RTK/nur lesen)

```json
{
    "states": {
        "0": "IDLE", //(wire & Vision & RTK-Body)
        "1": "Home", //(wire & Vision & RTK-Body)
        "2": "Start sequence", //(wire)
        "3": "Leaving home", //(wire & Vision & RTK-Body)
        "4": "Following border", //(wire)
        "5": "Searching home", //(wire & Vision & RTK-Body)
        "6": "Searching border", //(wire & Vision)
        "7": "Mowing", //(wire & Vision & RTK-Body)
        "8": "Lifted", //(wire & Vision & RTK-Body)
        "9": "Trapped", //(wire & Vision & RTK-Body)
        "10": "Blade blocked", //(wire & Vision & RTK-Body)
        "11": "Debug", //(wire)
        "12": "Driving", //(wire & Vision)
        "13": "Digital fence escape", //(wire & Vision)
        "30": "Going home", //(wire & Vision)
        "31": "Zone training", //(wire & Vision)
        "32": "Border Cut", //(wire & Vision)
        "33": "Searching zone", //(wire & Vision)
        "34": "Pause", //(wire & Vision)
        "100": "Map training (completable)", //(RTK-Head)
        "101": "Map processing", //(RTK)
        "102": "Upgrading firmware", //(RTK)
        "103": "Moving to zone", //(RTK-Body)
        "104": "Going home", //(RTK-Body)
        "105": "Ready for training", //(RTK-Head)
        "106": "Map download in progress", //(RTK)
        "107": "Map upload in progress", //(RTK-Head)
        "108": "Map training paused", //(RTK-Head)
        "109": "Map training (not completable)", //(RTK-Head)
        "110": "Border crossing", //(Vision)
        "111": "Exploring lawn", //(Vision)
        "112": "Moving to recovery point", //(RTK-Body)
        "113": "Waiting for position", //(RTK-Body)
        "114": "Map training (driving)", //(Vision & RTK-Body)
        "115": "Map training (rolling back)" //(Vision)
    }
}
```

- `torque`: Raddrehmoment Bereich -50->50 (Draht & Vision/änderbar) 🟢
- `totalBladeTime`: Gesamte Klingen-Arbeitszeit (Draht & Vision/nur lesen)
- `totalDistance`: Gesamte Entfernung (Draht & Vision/nur lesen)
- `totalTime`: Gesamte Rasenmäher-Arbeitszeit (Draht & Vision/nur lesen)
- `waitRain`: Regenverzögerung max. 12h in 30 Minuten Schritte und 0 für aus (Draht & Vision/änderbar) 🟢
- `waitRainCountdown` Countdown wenn der Sensor wechselt von nass zu trocken (Draht/nur lesen) (Vision deaktiviert)
- `waitRainSensor` Status 0 für trocken und 1 für feucht (Draht/nur lesen) (Vision deaktiviert)
- `wifiQuality`: Wifi Qualität (Draht & Vision/nur lesen)

```json
{
    "rain": {
        "s": 0, // 0 für trocken und 1 für nass (Draht & Vision)
        "cnt": 59 // Countdown wenn Wechsel von s=1 nass zu s=0 trocken - Regen wurde erkannt (Draht & Vision)
    }
}
```

![Mower img/mower_4.png](img/mower_4.png)

### Zusätzlich Vision Infos

- multiZones
    - `multiZones.zones.zone_1.borderDistance`: Beim Kantenschnitt der Abstand zur Kante in mm - erlaubt 50mm, 100mm, 150mm und 200mm - Mit Blockly ohne Verzögerung setzen - Änderung wird in `multiZones.multiZones` geschrieben (Vision/änderbar) 🔴
    - `multiZones.zones.zone_1.chargingStation`: 1 Wenn sich die Ladestation in dieser Zone befindet. 0 für keine Ladestation - Mit Blockly ohne Verzögerung setzen - Änderung wird in `multiZones.multiZones` geschrieben (Vision/änderbar) 🔴
    - `multiZones.zones.zone_1.cutOverBorder`: 1 zum Überfahren von Platten, wenn diese erkannt werden, ansonsten 0. Mit Blockly ohne Verzögerung setzen - Änderung wird in `multiZones.multiZones` geschrieben (Vision/änderbar) 🔴
    - `multiZones.zones.zone_1.zone_id`: Nummerierung - Start mit 1 (Vision/nur lesen)
    - `multiZones.passages.passage_01.tagIdFrom`: RFID id von zoneIdFrom - Mit Blockly ohne Verzögerung setzen - Änderung wird in `multiZones.multiZones` geschrieben (Vision/änderbar) 🔴
    - `multiZones.passages.passage_01.tagIdTo`: RFID id von zoneIdTo - Mit Blockly ohne Verzögerung setzen - Änderung wird in `multiZones.multiZones` geschrieben (Vision/änderbar) 🔴
    - `multiZones.passages.passage_01.zoneIdFrom`: Zone von (muss zoneIdFrom < zoneIdTo) - Mit Blockly ohne Verzögerung setzen - Änderung wird in `multiZones.multiZones` geschrieben (Vision/änderbar) 🔴
    - `multiZones.passages.passage_01.zoneIdTo`: Zone zu (muss zoneIdTo > zoneIdFrom) - Mit Blockly ohne Verzögerung setzen - Änderung wird in `multiZones.multiZones` geschrieben (Vision/änderbar) 🔴
    - `multiZones.multiZones`: multiZones JSON (Vision/änderbar) [Beispiel](#beispiel-blockly-sendMultiZonesJson-vision) 🔴
    - `multiZones.sendMultiZonesJson`: Änderungen an Worx senden mit mit einer Verzögerung von 1,1 Sekunden (Vision/änderbar) 🟢

Beispiel:

```json
{
    "mz": {
        "p": [
            // Durchgang zwischen den Zonen
            {
                "z1": 1, // Zone von (muss z1 < z2)
                "z2": 2, // Zone zu (muss z2 > z1)
                "t1": "E000000000000000", // RFID id von z1
                "t2": "E0000000KKKKKKKK" // RFID id von z2
            }
        ],
        "s": [
            // Die Zonen selbst
            {
                "id": 1, // Nummerierung - Start mit 1
                "c": 1, // 1 Wenn sich die Ladestation in dieser Zone befindet. 0 für keine Ladestation.
                "cfg": {
                    "cut": {
                        "bd": 100, // Kantenschnitt der Abstand zur Kante in mm - erlaubt 50mm, 100mm, 150mm und 200mm
                        "ob": 0 // 1 zum Überfahren von Platten, wenn diese erkannt werden, ansonsten 0.Unterschiedliche Werte pro Zone sind nicht zulässig
                    }
                }
            },
            {
                "id": 2, // Nummerierung fortlaufend
                "c": 0, // 1 Wenn sich die Ladestation in dieser Zone befindet. 0 für keine Ladestation.
                "cfg": {
                    "cut": {
                        "bd": 100, // Kantenschnitt der Abstand zur Kante in mm - erlaubt 50mm, 100mm, 150mm und 200mm
                        "ob": 0 // 1 zum Überfahren von Platten, wenn diese erkannt werden, ansonsten 0. Unterschiedliche Werte pro Zone sind nicht zulässig
                    }
                }
            }
        ]
    }
}
```

Standard ohne Zonen:

```json
{
    "mz": {
        "p": [],
        "s": [
            {
                "id": 1,
                "c": 1,
                "cfg": {
                    "cut": {
                        "bd": 150,
                        "ob": 0
                    }
                }
            }
        ]
    }
}
```

![Vision img/areas_vision.png](img/areas_vision.png)

- Mower
    - `log_improvement`: Protokoll zur Verbesserung an Worx senden de-/aktivieren (änderbar) 🟢
    - `log_troubleshooting`: Fehlerbericht an Worx senden de-/aktivieren (änderbar) 🟢

![Vision img/logs_vision.png](../en/img/logs_vision.png)

- Mower
    - `paused`: Mähstartverzögerung (änderbar) 🟢

![Vision img/paused_vision.png](../en/img/paused_vision.png)

### info_mqtt (Draht und Vision)

- `incompleteOperationCount`: Gesamtzahl der an die Verbindung übermittelten Vorgänge, die noch nicht abgeschlossen sind. Nicht quitierte Operationen sind eine Teilmenge davon.
- `incompleteOperationSize`: Gesamtpaketgröße der an die Verbindung übermittelten Vorgänge, die noch nicht abgeschlossen sind. Nicht quitierte Operationen sind eine Teilmenge davon.
- `unackedOperationCount`: Gesamtzahl der Vorgänge, die an den Server gesendet wurden und auf eine entsprechende Bestätigung warten, bevor sie abgeschlossen werden können.
- `unackedOperationSize`: Gesamtpaketgröße der Vorgänge, die an den Server gesendet wurden und auf eine entsprechende Bestätigung warten, bevor sie abgeschlossen werden können.
- `last_update`: Letzte Aktualisierung vom Token
- `next_update`: Nächste Aktualisierung vom Token
- `online`: Status MQTT Verbindung (false=offline/true=online)

![Vision img/mqtt_info.png](../en/img/mqtt_info.png)

### Beispiel Blockly sendMultiZonesJson Vision

```
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="${]4s$w?n24Az}=7iAIY">mz</variable>
    <variable id="o.FQ]_Xa!tHn2T7Ak{Pt">value</variable>
    <variable id="/@E4iFRMr:x+u?{7yFlB">test</variable>
    <variable id="jxTInS{}mk_)WJa[:,fA">i</variable>
  </variables>
  <block type="procedures_defcustomnoreturn" id="u:w*aBH!92nydG0Mu.1-" x="-87" y="-87">
    <mutation statements="false">
      <arg name="mz" varid="${]4s$w?n24Az}=7iAIY"></arg>
      <arg name="value" varid="o.FQ]_Xa!tHn2T7Ak{Pt"></arg>
    </mutation>
    <field name="NAME">set_bd</field>
    <field name="SCRIPT">bXouY2ZnLmN1dC5iZCA9IDE1MA==</field>
    <comment pinned="false" h="80" w="160">Beschreibe diese Funktion …</comment>
  </block>
  <block type="variables_set" id="jiP0218}2,Y]B]RdKD~`" x="-87" y="-35">
    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
    <value name="VALUE">
      <block type="convert_json2object" id=";Ef{FHk_~heeozyHFxci">
        <value name="VALUE">
          <block type="get_value" id="LMfldD:[D4%}yWE8,N0y">
            <field name="ATTR">val</field>
            <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.multiZones.sendMultiZonesJson</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="controls_forEach" id="D{XG==q$flbH?32eX%D(">
        <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
        <value name="LIST">
          <block type="get_attr" id="b~2/cb$WhEj*9i6,(ey5">
            <value name="PATH">
              <shadow type="text" id="+n~;GfHf{,#D!5D}H+m=">
                <field name="TEXT">s</field>
              </shadow>
            </value>
            <value name="OBJECT">
              <block type="variables_get" id="YloS$N%I=6[yk;loD*1O">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO">
          <block type="procedures_callcustomnoreturn" id="er{Pwq:Y7n_I|CQoup,|">
            <mutation name="set_bd">
              <arg name="mz"></arg>
              <arg name="value"></arg>
            </mutation>
            <value name="ARG0">
              <block type="variables_get" id="(-_i0(y:W}U_x?s(7k%4">
                <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
              </block>
            </value>
            <value name="ARG1">
              <block type="math_number" id="{2u/=v!k|yJsOesq[CU^">
                <field name="NUM">150</field>
              </block>
            </value>
            <next>
              <block type="debug" id="b1}}DmS-[_W:+Y+$|%)r">
                <field name="Severity">log</field>
                <value name="TEXT">
                  <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                    <field name="TEXT">test</field>
                  </shadow>
                  <block type="variables_get" id="_zz;w64g-!E$zX$]pvyI">
                    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="debug" id="o[S0+1%{oLU+r:03tz7=">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                <field name="TEXT">test</field>
              </shadow>
              <block type="variables_get" id="tjqxQ(MO|CR~/Xq5;Pm[">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
            <next>
              <block type="control" id="C^lZ^SNIQ#,vh}?hSG_O">
                <mutation xmlns="http://www.w3.org/1999/xhtml" delay_input="false"></mutation>
                <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.multiZones.sendMultiZonesJson</field>
                <field name="WITH_DELAY">FALSE</field>
                <value name="VALUE">
                  <block type="convert_object2json" id="z)EXA+%8lB4K#7!Hp1V%">
                    <field name="PRETTIFY">FALSE</field>
                    <value name="VALUE">
                      <block type="variables_get" id="C4np)gS@^Y*?-0I+R6+r">
                        <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>

<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="${]4s$w?n24Az}=7iAIY">mz</variable>
    <variable id="o.FQ]_Xa!tHn2T7Ak{Pt">value</variable>
    <variable id="/@E4iFRMr:x+u?{7yFlB">test</variable>
    <variable id="jxTInS{}mk_)WJa[:,fA">i</variable>
  </variables>
  <block type="procedures_defcustomnoreturn" id="u:w*aBH!92nydG0Mu.1-" x="-87" y="-87">
    <mutation statements="false">
      <arg name="mz" varid="${]4s$w?n24Az}=7iAIY"></arg>
      <arg name="value" varid="o.FQ]_Xa!tHn2T7Ak{Pt"></arg>
    </mutation>
    <field name="NAME">set_bd</field>
    <field name="SCRIPT">bXouY2ZnLmN1dC5iZCA9IDE1MA==</field>
    <comment pinned="false" h="80" w="160">Beschreibe diese Funktion …</comment>
  </block>
  <block type="variables_set" id="jiP0218}2,Y]B]RdKD~`" x="-87" y="-35">
    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
    <value name="VALUE">
      <block type="convert_json2object" id=";Ef{FHk_~heeozyHFxci">
        <value name="VALUE">
          <block type="get_value" id="LMfldD:[D4%}yWE8,N0y">
            <field name="ATTR">val</field>
            <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.multiZones.sendMultiZonesJson</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="controls_forEach" id="D{XG==q$flbH?32eX%D(">
        <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
        <value name="LIST">
          <block type="get_attr" id="b~2/cb$WhEj*9i6,(ey5">
            <value name="PATH">
              <shadow type="text" id="+n~;GfHf{,#D!5D}H+m=">
                <field name="TEXT">s</field>
              </shadow>
            </value>
            <value name="OBJECT">
              <block type="variables_get" id="YloS$N%I=6[yk;loD*1O">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO">
          <block type="procedures_callcustomnoreturn" id="er{Pwq:Y7n_I|CQoup,|">
            <mutation name="set_bd">
              <arg name="mz"></arg>
              <arg name="value"></arg>
            </mutation>
            <value name="ARG0">
              <block type="variables_get" id="(-_i0(y:W}U_x?s(7k%4">
                <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
              </block>
            </value>
            <value name="ARG1">
              <block type="math_number" id="{2u/=v!k|yJsOesq[CU^">
                <field name="NUM">150</field>
              </block>
            </value>
            <next>
              <block type="debug" id="b1}}DmS-[_W:+Y+$|%)r">
                <field name="Severity">log</field>
                <value name="TEXT">
                  <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                    <field name="TEXT">test</field>
                  </shadow>
                  <block type="variables_get" id="_zz;w64g-!E$zX$]pvyI">
                    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="debug" id="o[S0+1%{oLU+r:03tz7=">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                <field name="TEXT">test</field>
              </shadow>
              <block type="variables_get" id="tjqxQ(MO|CR~/Xq5;Pm[">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
            <next>
              <block type="control" id="C^lZ^SNIQ#,vh}?hSG_O">
                <mutation xmlns="http://www.w3.org/1999/xhtml" delay_input="false"></mutation>
                <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.multiZones.sendMultiZonesJson</field>
                <field name="WITH_DELAY">FALSE</field>
                <value name="VALUE">
                  <block type="convert_object2json" id="z)EXA+%8lB4K#7!Hp1V%">
                    <field name="PRETTIFY">FALSE</field>
                    <value name="VALUE">
                      <block type="variables_get" id="C4np)gS@^Y*?-0I+R6+r">
                        <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

### oder

```
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="2#Mf$#JFCN9Nw2F2L[?=">x</variable>
    <variable id="fNt-C|86(glunJ:-t=dK">p</variable>
    <variable id="Rci4:iMYXzjoI2k]P^X)">s</variable>
    <variable id="[t-srB,I/UkXaWBk4*A*">list</variable>
    <variable id="]WA|%5f=H9^9uiLc;KS[">new_json</variable>
  </variables>
  <block type="procedures_defcustomreturn" id="@Y/LobsPw4k!jQb)fI!." x="88" y="13">
    <mutation statements="false">
      <arg name="x" varid="2#Mf$#JFCN9Nw2F2L[?="></arg>
      <arg name="p" varid="fNt-C|86(glunJ:-t=dK"></arg>
      <arg name="s" varid="Rci4:iMYXzjoI2k]P^X)"></arg>
    </mutation>
    <field name="NAME">json</field>
    <field name="SCRIPT">eFsicCJdID0gcDsNCnhbInMiXSA9IHM7DQpyZXR1cm4geA==</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
  </block>
  <block type="variables_set" id="WAsPqIMv;bh95{7~Y!D!" x="88" y="63">
    <field name="VAR" id="[t-srB,I/UkXaWBk4*A*">list</field>
    <value name="VALUE">
      <block type="convert_json2object" id="S5uRAnpcGp/7*1b,aum~">
        <value name="VALUE">
          <block type="text" id="}n3]_HIP*7y5GMEo-!c3">
            <field name="TEXT">{p:[],s:[]}</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="variables_set" id="Kf#KkskB7l|uDiI!(fjq">
        <field name="VAR" id="]WA|%5f=H9^9uiLc;KS[">new_json</field>
        <value name="VALUE">
          <block type="procedures_callcustomreturn" id="K;OJHrji~09PeJ33q.gl">
            <mutation name="json">
              <arg name="x"></arg>
              <arg name="p"></arg>
              <arg name="s"></arg>
            </mutation>
            <value name="ARG0">
              <block type="variables_get" id="ipM^e+~#-hoo0(047Ybo">
                <field name="VAR" id="[t-srB,I/UkXaWBk4*A*">list</field>
              </block>
            </value>
            <value name="ARG1">
              <block type="lists_create_with" id="HJIZHLc]lL0Tgqe$E~Ul">
                <mutation items="0"></mutation>
              </block>
            </value>
            <value name="ARG2">
              <block type="lists_create_with" id="JH=jADj%lYJ(:7%v[o+3">
                <mutation items="1"></mutation>
                <value name="ADD0">
                  <block type="convert_json2object" id="@5BT0}WJ`srV89LD5h?D">
                    <value name="VALUE">
                      <block type="text" id="=.e.D[I2IQ{u!4;(-D-,">
                        <field name="TEXT">{"id":1,"c":1,"cfg":{"cut":{"bd":150,"ob":1}}}</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="control" id="k$;?LM/[x-TbZ^m=F4}i">
            <mutation xmlns="http://www.w3.org/1999/xhtml" delay_input="false"></mutation>
            <field name="OID">worx.0.xxxxxxxxxx.multiZones.sendMultiZonesJson</field>
            <field name="WITH_DELAY">FALSE</field>
            <value name="VALUE">
              <block type="convert_object2json" id="b~2Bz}OiNg{V]!QgN^J7">
                <field name="PRETTIFY">FALSE</field>
                <value name="VALUE">
                  <block type="variables_get" id="b|+SOSd+ZD@*XHPGu*I(">
                    <field name="VAR" id="]WA|%5f=H9^9uiLc;KS[">new_json</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

### oder direct

```
{"p": [],"s": [{"id": 1, "c": 1, "cfg": {"cut": {"bd": 100, "ob": 1}}}]}
```

![img/ok_direct.png](img/ok_direct.png)

### nicht erlaubt

![img/json_nok.png](../en/img/json_nok.png)
![img/array_nok.png](../en/img/array_nok.png)

## Changelog

### **WORK IN PROGRESS**

- (Lucky-ESA) Fixed starting firmware update (did not work)

### 3.2.0 (2025-04-08)

- (Lucky-ESA) Migration to ESLint9
- (Lucky-ESA) Node 20 required
- (Lucky-ESA) Admin 7.4.10 required
- (Lucky-ESA) Added Party Modus Timer (wire only)
- (Lucky-ESA) Save session infos
- (Lucky-ESA) Added rain countdown (wire only)

### 3.1.1 (2024-11-04)

- (Lucky-ESA) Added JS-Controller Notification
- (Lucky-ESA) Dependencies updated
- (Lucky-ESA) New design for settings page added

### 3.1.0 (2024-09-10)

- (Lucky-ESA) Added Landroid IP
- (Lucky-ESA) Fixed interval
- (Lucky-ESA) Fixed Vision Edgecut

### 3.0.2 (2024-05-12)

- (Lucky-ESA) mowTimeExtend restricted input
- (Lucky-ESA) Fixed TypeError

### 3.0.1 (2024-05-08)

- (Lucky-ESA) Preperation mission Kress new API
- (Lucky-ESA) Fixed TypeError
- (Lucky-ESA) Fixed missing activity states
- (Lucky-ESA) Added update interval in instance setting
- (Lucky-ESA) Added last update

## License

MIT License

Copyright (c) 2023-2025 TA2k <tombox2020@gmail.com>

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