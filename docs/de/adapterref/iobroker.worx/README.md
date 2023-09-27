---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.worx.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.worx.svg
BADGE-Number of Installations: https://iobroker.live/badges/worx-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/worx-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.worx.png?downloads=true
---
![Logo](../../admin/worx.png)

# ioBroker.worx Adapter

## Beschreibung

### Instanzeinstellungen

-   `App-Benutzername`: APP Benutzername (eMail)
-   `App-Passwort`: APP Passwort
-   `App Name`: Geräte auswählen
-   `Verzögerung für Kantenschnitt`: Wann soll EdgeCut nach dem Losfahren starten (Beispiel nach 5 Sekunden bis zum Rasen)

![Instance Settings img/instance_1.png](img/instance_1.png)

-   `Entfernung und Zeit in Minuten und Metern`: Einheit für Laufzeit und Arbeitszeit in Min./Std. und Meter/KM
-   `MQTT-Verbindung alle 10 Minuten anpingen`: Nur zum testen. Bitte nicht länger als 1 Stunde!
-   `Aktualisieren der MQTT-Daten nach der Token-Aktualisierung.`: Nach der Erneuerung vom Token (jede Stunde) die Mqtt Daten neu laden. Das sind 24 zusätzlich Abfragen pro Tag und pro Geräte.

![Instance Settings img/instance_2.png](img/instance_2.png)

### Ordner

-   `activityLog`: Aktivitätenprotokoll (Kontrolle möglich)
-   `areas`: Zonen (Kontrolle möglich)
-   `calendar`: Mähplan (Kontrolle möglich)
-   `Modules`: Verfügbare Module (Kontrolle möglich)
-   `mower`: Mäher (Kontrolle möglich)
-   `product`: Alle Eigenschaften vom Geräte (Nur lesen)
-   `rawMqtt`: Alle Daten von der Worx-Cloud (Nur lesen)

![Folder img/all_folders.png](../en/img/all_folders.png)

### activityLog (Draht und Vision)

-   `last_update`: Letzte Update als Zeitstempel (nur lesen)
-   `manuell_update`: Lädt das aktuelle Aktivitätenprotokoll (automatisch nach Statusänderungen) (änderbar)
-   `payload`: Protokoll als JSON (für VIS oder Blockly) (nur lesen)

![Activity img/activity.png](../en/img/activity.png)

### areas (Nur Draht)

-   `actualArea`: Aktuelle Zone (nur lesen)
-   `actualAreaIndicator`: Nächste Zonenanfahrt im Array. Bsp. 0 - [`2`,2,2,2,2,2,2,2,2,2] (nur lesen)
-   `area_0`: Start Zone 1 in Meter (array=0) (änderbar)
-   `area_1`: Start Zone 2 in Meter (array=1) (änderbar)
-   `area_2`: Start Zone 3 in Meter (array=2) (änderbar)
-   `area_3`: Start Zone 4 in Meter (array=3) (änderbar)
-   `startSequence`: Zonenstart Array (0-9 Ereignisse) Bsp.: Nur Zone 3 anfahren [2,2,2,2,2,2,2,2,2,2] (änderbar)
-   `zoneKeeper`: Verhindert Zonendurchbrüche (Zonen müssen erstellt sein) (ab Firmware 3.30) (änderbar)

![Area img/areas.png](../en/img/areas.png)

### calendar (Draht und Vision)

-   Beispiel Zeiteinstellung Mittwoch

    -   `wednesday.borderCut`: Mit oder ohne Kantenschnitt (ohne Verzögerung setzen) (änderbar)
    -   `wednesday.startTime`: Startzeit als Format hh:mm (0-23/0-59) Bsp.: 09:00 (ohne Verzögerung setzen) (änderbar)
    -   `wednesday.workTime`: Arbeitszeit in Minuten (180 min = 3h) Bsp.: 30 = Endzeit 09:30 (ohne Verzögerung setzen) (änderbar)
    -   `calJson_sendto`: Sind alle Datenpunkte gesetzt dann diesen Button auf true setzen (mit einer Verzögerung von 1,1). Der Mäher mäht nun für 30 Minuten! (änderbar)
    -   `calJson_tosend`: Dieser JSON wird automatisch gefüllt und dann an Mqtt versendet. Kann natürlich auch selber erstellt werden. (änderbar)
    -   `calendar.calJson`: Array für den Wochenmähplan 1 (wird automatisch gesetzt - nur Draht) (änderbar)
    -   `calendar.calJson2`: Array für den Wochenmähplan 2 (wird automatisch gesetzt - nur Draht) (änderbar)

![Folder img/calendar.png](../en/img/calendar.png)

### modules (Draht und Vision)

-   Off Limit Module (Draht und Vision)

    -   `DF.OLMSwitch_Cutting`: Verhindert das überfahren vom Magnetband - true-an/false-aus
    -   `DF.OLMSwitch_FastHoming`: Verwendet erstellte Abkürzungen mit Magnetband - true-an/false-aus

-   ACS Module (nur Draht)
    -   `US.ACS`: ACS aktivieren oder deaktivieren - 1-on/0-off

![Module img/module.png](../en/img/module.png)

### mower (Draht und Vision)

-   `AutoLock`: automatische Verriegelung true-an/false-aus (Draht & Vision/änderbar)
-   `AutoLockTimer`: Timer für automatische Verriegelung max. 10 Minuten in 30 Sekunden Schritte (Draht & Vision/änderbar)
-   `batteryChargeCycle`: Batterieladezyklus (Draht & Vision/nur lesen)
-   `batteryCharging`: Batterieladung false->nein/true->ja (Draht & Vision/nur lesen)
-   `batteryState`: Batteriestatus in % (Draht & Vision/nur lesen)
-   `batteryTemperature`: Batterietemperatur in Celsius (Draht & Vision/nur lesen)
-   `batteryVoltage`: Batteriespannung in Volt (Draht & Vision/nur lesen)
-   `direction`: Richtung in Grad (Draht & Vision/nur lesen)
-   `edgecut`: Start EdgeCut (Draht & Vision/änderbar)
-   `error`: Errormeldung vom Mäher (Draht & Vision/nur lesen)

```json
{
    "states": {
        "0": "No error", //(Draht & Vision)
        "1": "Trapped", //(Draht & Vision unbekannt)
        "2": "Lifted", //(Draht & Vision)
        "3": "Wire missing", //(Draht & Vision unbekannt)
        "4": "Outside wire", //(Draht & Vision unbekannt)
        "5": "Raining", //(Draht & Vision)
        "6": "Close door to mow", //(Draht & Vision)
        "7": "Close door to go home", //(Draht & Vision)
        "8": "Blade motor blocked", //(Draht & Vision)
        "9": "Wheel motor blocked", //(Draht & Vision)
        "10": "Trapped timeout", //(Draht & Vision)
        "11": "Upside down", //(Draht & Vision)
        "12": "Battery low", //(Draht & Vision)
        "13": "Reverse wire", //(Draht & Vision unbekannt)
        "14": "Charge error", //(Draht & Vision)
        "15": "Timeout finding home", //(Draht & Vision)
        "16": "Mower locked", //(Draht & Vision)
        "17": "Battery over temperature", //(Draht & Vision)
        "18": "dummy model", //(Draht & Vision)
        "19": "Battery trunk open timeout", //(Draht & Vision)
        "20": "wire sync", //(Draht & Vision unbekannt)
        "21": "msg num", //(Draht & Vision)
        "110": "Camera error" //(Vision)
    }
}
```

![Mower img/mower_1.png](../en/img/mower_1.png)

-   `firmware`: Installierte Firmware (Draht & Vision/nur lesen)
-   `firmware_available`: Verfügbare Firmware (Draht & Vision/nur lesen)
-   `firmware_available_all`: Letzte verfügbare Firmware als JSON - Dieses JSON wird aktualisiert, wenn ein neues Update zur Verfügung steht (Draht & Vision/nur lesen)

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

-   `firmware_available_date`: Datum verfügbaren Firmware - Dummy 1970-01-01 wenn der Adapter neu installiert wird und es kein Update zur Verfügung steht (Draht & Vision/nur lesen)
-   `firmware_update_start`: Start Update in 2 Schritten (Draht & Vision/änderbar)
-   `firmware_update_start_approved`: Aktualisierung der Firmware starten - `firmware_update_start` muss auf true gesetzt sein (Draht & Vision/änderbar)
-   `gradient`: Gefälle oder Anstieg in Grad (Draht & Vision/nur lesen)
-   `inclination`: Neigung in Grad (Draht & Vision/nur lesen)
-   `last_command`: Letzter Befehl von iobroker oder der APP als JSON Table (Draht & Vision/nur lesen)
-   `mowTimeExtend`: Mähzeitverlängerung-/Verkürzung in % Bereich: -100%->100% (Draht/änderbar)
-   `mowerActive`: Pause Mähplan (Draht/änderbar)
-   `mqtt_update`: Update Mqtt Daten vom Mäher - max. 150/Tag (Draht & Vision/änderbar)
-   `mqtt_update_count`: Counter von Update Mqtt Daten (Draht & Vision/nur lesen)

![Mower img/mower_2.png](../en/img/mower_2.png)

-   `oneTimeJson`: einmaliges Mähen als JSON (Draht & Vision/änderbar)

```json
{
    "wtm": 60, //Minuten
    "bc": 0 //0=ohne Kantenschnitt 1=mit Kantenschnitt - oder die nächsten Datenpunkte verwenden
}
```

-   `oneTimeStart`: einmaliges Mähen start "Erst oneTimeWithBorder und oneTimeWorkTime setzen" - mit einer Verzögerung von 1,1 Sekunde (Draht & Vision/änderbar)
-   `oneTimeWithBorder`: Mit Kantenschnitt - Wert ohne Verzögerung setzen (Draht & Vision/änderbar)
-   `oneTimeWorkTime`: Mähzeit max. 8h in 30 Minuten Schritte - Wert ohne Verzögerung setzen (Draht & Vision/änderbar)
-   `online`: Mäher Online (Draht & Vision/nur lesen)
-   `partyModus`: Party-Modus schalten an/aus (Draht & Vision/änderbar)
-   `pause`: Mähpause schalten an/aus (Draht & Vision/änderbar)
-   `reset_battery_time`: Batterieladungen in 2 Schritten zurücksetzen (Draht & Vision/änderbar)
-   `reset_battery_time_approved`: Batterieladungen zurücksetzen bestätigen - `reset_battery_time` muss auf true gesetzt sein (Draht & Vision/änderbar)
-   `reset_blade_time`: Klingenarbeitszeit in 2 Schritten zurücksetzen (Draht & Vision/änderbar)
-   `reset_blade_time_approved`: Klingenarbeitszeit zurücksetzen bestätigen - `reset_battery_time` muss auf true gesetzt sein (Draht & Vision/änderbar)

![Mower img/mower_3.png](../en/img/mower_3.png)

-   `sendCommand`: Ein Befehl versenden (Draht & Vision/änderbar)

```json
{
    "states": {
        "1": "Start", //(Draht & Vision)
        "2": "Stop", //(Draht & Vision)
        "3": "Home", //(Draht & Vision)
        "4": "Start Zone Taining", //(Draht & Vision unbekannt)
        "5": "Lock", //(Draht & Vision)
        "6": "Unlock", //(Draht & Vision)
        "7": "Restart Robot", //(Draht & Vision unbekannt)
        "8": "pause when follow wire", //(Draht & Vision unbekannt)
        "9": "safe homing" //(Draht & Vision unbekannt)
    }
}
```

-   `state`: True für Mähvorgang starten und False für Mähvorgang beenden (Draht & Vision/änderbar)
-   `status`: Status vom Mäher (Draht & Vision/nur lesen)

```json
{
    "states": {
        "0": "IDLE", //(Draht & Vision)
        "1": "Home", //(Draht & Vision)
        "2": "Start sequence", //(Draht & Vision)
        "3": "Leaving home", //(Draht & Vision)
        "4": "Follow wire", //(Draht & Vision unbekannt)
        "5": "Searching home", //(Draht & Vision)
        "6": "Searching wire", //(Draht & Vision unbekannt)
        "7": "Mowing", //(Draht & Vision)
        "8": "Lifted", //(Draht & Vision)
        "9": "Trapped", //(Draht & Vision)
        "10": "Blade blocked", //(Draht & Vision)
        "11": "Debug", //(Draht & Vision)
        "12": "Remote control", //(Draht & Vision)
        "13": "escape from off limits", //(Draht & Vision)
        "30": "Going home", //(Draht & Vision)
        "31": "Zone training", //(Draht & Vision)
        "32": "Border Cut", //(Draht & Vision)
        "33": "Searching zone", //(Draht & Vision)
        "34": "Pause" //(Draht & Vision)
    }
}
```

-   `torque`: Raddrehmoment Bereich -50->50 (Draht & Vision/änderbar)
-   `totalBladeTime`: Gesamte Klingen-Arbeitszeit (Draht & Vision/nur lesen)
-   `totalDistance`: Gesamte Entfernung (Draht & Vision/nur lesen)
-   `totalTime`: Gesamte Rasenmäher-Arbeitszeit (Draht & Vision/nur lesen)
-   `waitRain`: Regenverzögerung max. 12h in 30 Minuten Schritte (Draht & Vision/änderbar)
-   `wifiQuality`: Wifi Qualität (Draht & Vision/nur lesen)

![Mower img/mower_4.png](../en/img/mower_4.png)

### Zusätzlich Vision Infos

-   Area
    -   `rfid`: Anzahl Zonen (nur lesen)
    -   `startSequence`: Multizone JSON (Vision/änderbar) [Beispiel](#beispiel-blockly-startsequence-vison)

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
                "c": 1, // 1 Wenn sich die Ladestation in diese Zone gefindet. 0 für keine Ladestation.
                "cfg": {
                    "cut": {
                        "bd": 100, // Kantenschnitt in mm
                        "ob": 0 // 1 zum Überfahren von Platten, wenn diese erkannt werden, ansonsten 0.
                    }
                }
            },
            {
                "id": 2, // Nummerierung fortlaufend
                "c": 0, // 1 Wenn sich die Ladestation in diese Zone gefindet. 0 für keine Ladestation.
                "cfg": {
                    "cut": {
                        "bd": 100, // Kantenschnitt in mm
                        "ob": 0 // 1 zum Überfahren von Platten, wenn diese erkannt werden, ansonsten 0.
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

![Vision img/areas_vision.png](../en/img/areas_vision.png)

-   Mower
    -   `log_improvement`: Protokoll zur Verbesserung an Worx senden de-/aktivieren (änderbar)
    -   `log_troubleshooting`: Fehlerbericht an Worx senden de-/aktivieren (änderbar)

![Vision img/logs_vision.png](../en/img/logs_vision.png)

-   Mower
    -   `paused`: Mähstartverzögerung (änderbar)

![Vision img/paused_vision.png](../en/img/paused_vision.png)

### info_mqtt (Draht und Vision)

-   `incompleteOperationCount`: Gesamtzahl der an die Verbindung übermittelten Vorgänge, die noch nicht abgeschlossen sind. Nicht gepackte Operationen sind eine Teilmenge davon.
-   `incompleteOperationSize`: Gesamtpaketgröße der an die Verbindung übermittelten Vorgänge, die noch nicht abgeschlossen sind. Nicht gepackte Operationen sind eine Teilmenge davon.
-   `unackedOperationCount`: Gesamtzahl der Vorgänge, die an den Server gesendet wurden und auf eine entsprechende Bestätigung warten, bevor sie abgeschlossen werden können.
-   `unackedOperationSize`: Gesamtpaketgröße der Vorgänge, die an den Server gesendet wurden und auf eine entsprechende Bestätigung warten, bevor sie abgeschlossen werden können.
-   `last_update`: Letzte Aktualisierung vom Token
-   `next_update`: Nächste Aktualisierung vom Token
-   `online`: Status MQTT Verbindung (false=offline/true=online)

![Vision img/mqtt_info.png](../en/img/mqtt_info.png)

### Beispiel Blockly startsequence Vison

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
            <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
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
                <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
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
            <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
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
                <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
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

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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