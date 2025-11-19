---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: AF+RI5eEFD5nF67c1zE0cBxPzygqQnbWGlpn/U2DwyE=
---
![Logo](../../../en/adapterref/iobroker.ecoflow-mqtt/admin/ecoflow-mqtt.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ecoflow-mqtt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ecoflow-mqtt.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ecoflow-mqtt-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ecoflow-mqtt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ecoflow-mqtt.png?downloads=true)

# IoBroker.ecoflow-mqtt
**Tests:** ![Test und Freigabe](https://github.com/foxthefox/ioBroker.ecoflow-mqtt/workflows/Test%20and%20Release/badge.svg)

## Ecoflow-mqtt-Adapter für ioBroker
Verbindet sich mit Produkten von Ecoflow ([https://www.ecoflow.com])

## WARNUNG
Dieser Adapter nutzt eine inoffizielle Kommunikationsschnittstelle zu den Geräten. Fehlerhafte Kommunikation oder falsche Werte können die Funktionalität des Geräts beeinträchtigen und zum Ausschluss vom Dienst führen.

Der Adapter basiert auf der Arbeit von:

- meine eigene Bewertung und Forschung
- https://github.com/tolwi/hassio-ecoflow-cloud
- https://haus-automatisierung.com/hardware/2023/02/13/ecoflow-river-2-usv-batteriespeicher.html
- https://forum.iobroker.net/topic/66743/ecoflow-connector-script-zur-dynamischen-leistungsanpassung
- https://konkludenz.de/en/making-ecoflow-wave2-smart-home-capable-with-node-red-and-mqtt

## Installation
Der Adapter befindet sich im stabilen Repository und kann daher durch Suchen installiert werden.
Sollten Updates verfügbar sein, sollten Sie diese installieren.

Falls eine sehr neue Version verfügbar ist, kann eine benutzerdefinierte Installation über npm/GitHub erforderlich sein.
In diesem Fall muss der Expertenmodus aktiviert werden, um auf das „octacat“-Symbol zugreifen zu können.

![weitere Details](../../../en/adapterref/iobroker.ecoflow-mqtt/doc/en/installation.md)

## EF-Anmeldeinformationen
Auf der Admin-Seite (erster Tab) müssen die MQQT-Zugangsdaten für den MQQT-Broker eingegeben werden.

- Benutzername - etwa "app-...".
- Benutzer-ID - eine 19-stellige Nummer
- Benutzerpasswort - eine alphanumerische Zeichenfolge
- ClientID - eine Zeichenkette, die mit "ANDROID\_...." beginnt.

Es gibt 3 Möglichkeiten:

1. per Skript https://github.com/mmiller7/ecoflow-withoutflow/blob/main/cloud-mqtt/ecoflow_get_mqtt_login.sh
2. über die Website https://energychain.github.io/site_ecoflow_mqtt_credentials/
3. durch den eigenen Algorithmus des Adapters (Drücken des Knopfes), hierfür sind der Ecoflow-Benutzername und das Passwort erforderlich.

Die Einstellungen des MQQT-Brokers sind Standard und müssen normalerweise nicht geändert werden.

!!! Falls der MQTT-Server die Verbindung ablehnt, kann es hilfreich sein, mit Option 2 die Ausgabe der Webseite zu überprüfen. In manchen Fällen wird eine andere MQTT-Broker-Adresse zurückgegeben !!!

## Geräteeinrichtung und Konfiguration
Über die Registerkarte „Gerätekonfiguration“ können Sie Ihre Geräte hinzufügen.

<details><summary><i>Parametrisierung des Powerstreams oder STREAMs</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID von (Power)Stream wie in der App angezeigt ein, etwa so: "HW51..../BK...."
- gib ihm einen Namen
- Wählen Sie die Version aus

</p></details>

<details><summary><i>Parametrisierung des Kraftwerks</i></summary><p>

- eine neue Zeile hinzufügen
- Legen Sie die Geräte-ID der Powerstation wie in der App angezeigt fest; die Zeichenfolge variiert je nach Gerätetyp.
- gib ihm einen Namen
- Wählen Sie den Gerätetyp aus
- Falls ein zusätzlicher Akku angeschlossen ist, überprüfen Sie die Portnummer, an der er angeschlossen ist.

</p></details>

<details><summary><i>Parametrisierung des intelligenten Steckers</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Smart Plugs wie in der App angezeigt ein, etwa so: "HW52...".
- gib ihm einen Namen
- Stellen Sie den Typ auf "Stecker" ein

</p></details>

<details><summary><i>Parametrisierung des Smartmeters</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Smartmeters (Shelly oder EF) wie in der App angezeigt ein. Beachten Sie bei Shelly, dass die ID sich von der ID des Shelly-Geräts selbst unterscheidet.
- gib ihm einen Namen
- Stellen Sie den Typ auf "Shelly3EM" oder "EF smartmeter" ein.

</p></details>

<details><summary><i>Parametrisierung des Generators</i></summary><p>

- eine neue Zeile hinzufügen
- Legen Sie die Geräte-ID des Generators so fest, wie sie in der App angezeigt wird, etwa so: "DGEB...".
- gib ihm einen Namen
- den Typ auf "Generator" setzen

</p></details>

<details><summary><i>Parametrisierung des Smart-Home-Panels</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Generators so ein, wie sie in der App angezeigt wird, etwa so: "SP10...".
- gib ihm einen Namen
- Stellen Sie den Typ auf "SHP" oder "SHP2" ein.

</p></details>

<details><summary><i>Parametrisierung des Stromversorgungs-Kits und der Nabe</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Stromversorgungs-Kits wie in der App angezeigt ein, etwa so: "M10...".
- gib ihm einen Namen
- Stellen Sie den Typ auf „Power Kit BP2000“ oder „Power Kit BP5000“ ein.
- Falls eine zweite oder dritte Batterie angeschlossen ist, prüfen Sie diese als Slave 1 oder Slave 2.

</p></details>

<details><summary><i>Parametrisierung der Power Ocean DC-Anpassung</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Generators wie in der App angezeigt ein, etwa so: "HJ31...".
- gib ihm einen Namen
- Stellen Sie den Typ auf "Power Ocean" ein.
- Falls eine zweite oder dritte Batterie angeschlossen ist, prüfen Sie diese als Slave1 oder Slave2.

</p></details>

<details><summary><i>Parametrisierung der Welle</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Smart Plugs wie in der App angezeigt ein, etwa so: "KT21ZCH..."
- gib ihm einen Namen
- Stellen Sie den Typ auf "Wave2" ein.

</p></details>

<details><summary><i>Parametrisierung des Gletschers</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Smart Plugs wie in der App angezeigt ein, etwa so: "BX11ZCB..."
- gib ihm einen Namen
- den Typ auf "Gletscher" einstellen

</p></details>

<details><summary><i>Parametrisierung des Generators</i></summary><p>

- eine neue Zeile hinzufügen
- Stellen Sie die Geräte-ID des Smart Plugs wie in der App angezeigt ein, etwa so: "F371ZE..."
- gib ihm einen Namen
- Stellen Sie den Typ auf "Lichtmaschine 800W" ein.

</p></details>

Verwenden Sie den Tab „Home Assistant“, um die MQTT-Verbindung zu Home Assistant einzurichten.

<details><summary><i>Parametrisierung des Home Assistant Connectors</i></summary><p>

- den Dienst aktivieren
- die Benutzereinstellungen des MQTT-Brokers von HA festlegen
- die Verbindungsparameter des MQTT-Brokers von HA festlegen
- Wählen Sie bei Bedarf die Debug-Einstellungen aus.

Modifikation auf der HA-Seite:

- Der Adapter nutzt die Erkennungsfunktion in HA, eine Konfiguration von Datenpunkten in HA ist nicht erforderlich.
- MQTT-Add-on ...

</p></details>

## Aktualisierung des Adapters
Normalerweise genügt es, die nächste Version über die alte zu installieren. In manchen Fällen (z. B. bei Version 1.0.0) muss möglicherweise der gesamte Objektbaum gelöscht werden.
Wenn sich datenpunktbezogene Werte ändern, wie z. B. Minimal- oder Maximalwerte des Bereichs, müssen Sie Folgendes tun:

- Schalten Sie den Adapter aus
- die betreffenden Datenpunkte wurden gelöscht
- Schalten Sie den Adapter ein

Anschließend werden die neuen Bereiche übernommen.

## IoBroker-Adapterfunktionen
- die definierten Geräte sind über MQTT mit dem Adapter verbunden
Der Adapter filtert die eingehenden Nachrichten der Geräte. Nur geänderte Werte werden intern gespeichert.
- Wenn die App die Anpassung unter einer bestimmten Bedingung verhindert, wird dies, sobald es bekannt ist, repliziert (z. B. wenn das Einschalten des Wechselrichters bei Unterschreitung des Mindestladestands der Batterie verhindert wird, kann eine Warnung im Protokoll angezeigt werden).
Da nicht alles bekannt ist, kann die Interpretation der Informationen unsicher sein; dies wird meist durch ein nachfolgendes „?“ gekennzeichnet.

### Anmerkungen zur Aktualisierung der Datenpunktkonfiguration (min, max, Einheit, ....)
Wenn die Einstellungen eines Datenpunkts in der neuen Version des Adapters geändert werden (z. B. Name, Einheit, Maximalwert), wird die Änderung erst wirksam, wenn Sie:

- die Adapterinstanz stoppen
- Löschen Sie den entsprechenden Datenpunkt oder die gesamte Objektstruktur der Adapterinstanz.
- Starten Sie die Adapterinstanz

Beim Startvorgang werden die Datenpunkte erstellt, aber nicht verändert, sobald sie vorhanden sind.

### Anmerkungen zu Warnungen/Fehlern
Bestimmte Ereignisse im Adapter werden als Warnung oder Fehler gekennzeichnet, um im Protokoll (Protokollierungsstufe: Info) angezeigt zu werden.
Dies bedeutet nicht zwangsläufig einen Fehler oder dass der Adapter nicht funktioniert; es ist eher ein Hinweis auf ein unerwartetes Verhalten. Die Ursache liegt möglicherweise nicht im Adapter selbst, aber es wird darauf hingewiesen.

## HA-Anschluss/Gateway
Die MQTT-Erkennungsfunktion in HA ermöglicht einen eleganten Informationsaustausch.
- Die MQTT-Erkennungsfunktion ist möglicherweise nicht aktiviert, wenn der MQTT-Broker bereits in HA ausgeführt wird. Sie muss bei der Neukonfiguration des MQTT-Dienstes aktiviert werden.
- Bei jedem Start des iobroker-Adapters werden alle Discovery-Objekte an HA übertragen (auch wenn sie in HA verbleiben sollten).
Der iobroker-Adapter filtert die eingehenden Nachrichten der Geräte. Nur geänderte Werte werden intern gespeichert und an HA übertragen.
- Wenn ein Wert nicht durch eine Gerätedatenaktualisierung festgelegt wird, wird er in HA als unbekannt angezeigt.
- Wenn das Gerät erreichbar ist, wird die Verfügbarkeit in der Geräteverbindung angezeigt; dies wird an die "Untergeräte" vererbt (Nichtverfügbarkeit wird auf die gleiche Weise verarbeitet).

[einige_Hinweise_für HA](./doc/en/IOB_HA/navi.md)

### Anmerkungen zur Funktionalität
Aufgrund der Asynchronität von Informationsaktualisierungen und Befehlsübertragung können mitunter Race Conditions auftreten. So kann beispielsweise beobachtet werden, wie ein Schalter betätigt wird und anschließend mehrmals hin und her schaltet, bevor er in der eingestellten Position verbleibt.

## Implementierte Geräte & Struktur mit Datenpunkten
eine Erklärung zu den Gerätedaten

- Zahl -> Datenpunkt mit numerischem Wert
- Ebene -> anpassbarer Datenpunkt mit numerischem Wert, manchmal auch Auswahlen mit numerischer Darstellung
- Schalter -> einstellbarer Datenpunkt (Boolescher Wert)
- Diagnose -> boolescher oder mehrwertiger Datenpunkt in Text umgewandelt
- Zeichenkette -> Datenpunkt nur als Text
- Array -> Datenpunkt mit Array
Die Wert-zu-Text-Konvertierung verwendet möglicherweise einen nicht validierten Text (Feedback ist willkommen); dies wird durch ein "?" am Ende des Textes gekennzeichnet.

### Kraftwerk
[River Max](./doc/devices/rivermax.md)

[River Pro](./doc/devices/riverpro.md)

[Fluss 2 Max](./doc/devices/river2max.md)

[River 2 Pro](./doc/devices/river2pro.md)

[Fluss 3](./doc/devices/river3.md)

[River 3 Plus](./doc/devices/river3plus.md)

[Delta Mini](./doc/devices/deltamini.md)

[Delta](./doc/devices/delta.md)

[Delta Max](./doc/devices/deltamax.md)

[Delta 2](./doc/devices/delta2.md)

[Delta 2 Max](./doc/devices/delta2max.md)

[Delta 3](./doc/devices/delta3.md)

[Delta 3 Plus](./doc/devices/delta3plus.md)

[Delta 3 Max Plus](./doc/devices/delta3maxplus.md)

[Delta Pro](./doc/devices/deltapro.md)

[Delta Pro 3](./doc/devices/deltapro3.md)

[Delta Pro Ultra](./doc/devices/deltaproultra.md)

### Smart-Home-Panel
[Smart-Home-Panel](./doc/devices/panel.md)

[Smart Home Panel 2](./doc/devices/panel2.md)

### Stromversorgungssatz & Nabe
[Power Kit](./doc/devices/powerkit.md)

### Power Ocean
[Power Ocean DC](./doc/devices/powerocean.md)

[Power Ocean Plus](./doc/devices/poweroceanplus.md)

[Power Ocean DC FIT](./doc/devices/poweroceanfit.md)

### Generator
[Generator](./doc/devices/generator.md)

Ein Dual-Fuel-Generator ist derzeit nicht verfügbar, könnte aber implementiert werden, sofern entsprechende Daten vorliegen.

### Powerstream & Stream
[Powerstream](./doc/devices/pstream600.md)

[Stream AC](./doc/devices/stream_ac.md)

[Stream AC PRO](./doc/devices/stream_ac_pro.md)

[Stream Ultra](./doc/devices/stream_ultra.md)

[Stromumrichter](./doc/devices/stream_inverter.md)

Die 800-W-Version ist ebenfalls implementiert; der einzige Unterschied besteht in der maximalen Leistung von 800 W.
Versorgungspriorität: 0/falsch = priorisierte Netzversorgung; 1/wahr = priorisierte Batterieversorgung (Laden).

### Intelligente Steckdosen
[Intelligente Steckdose](./doc/devices/plug.md)

### Smartmeter-Geräte
[Shelly3EM](./doc/devices/shelly3em.md)

[Smartmeter](./doc/devices/smartmeter.md)

### Wave Klimaanlage
[Welle 2](./doc/devices/wave2.md)

[Welle 3](./doc/devices/wave3.md)

Wave ist derzeit nicht verfügbar, könnte aber implementiert werden, falls Daten verfügbar sind.

### Gletscherkühlschrank
[Gletscher](./doc/devices/glacier.md)

[Glacier Classic 55L](./doc/devices/glacier55.md)

### Lichtmaschine
[Generator](./doc/devices/alternator.md)

### Nicht unterstützte Geräte
Dieser Abschnitt dient Debugging-Zwecken. Bitte wählen Sie das Gerät (Delta Pro3, Delta3, Delta3 Plus) aus und tragen Sie die Seriennummer in die hinzugefügte Zeile ein. Es wird davon ausgegangen, dass das unbekannte Gerät Protobuf verwendet. Es erzeugt [PROTOBUF unknown]-Meldungen im Log, die das rohe Hex-Telegramm enthalten.

## Aufgaben
- Vergessene Randbedingungen für Befehle prüfen (Befehl unterdrücken oder zusätzlichen Wert)
- Überprüfen Sie den Piepton-Befehl, falls die Umkehrung erforderlich ist
- SlaveBattery DM, outWatts Multiplikation mit 10
- mehr getCmds für SHP-Werte

## Haftungsausschluss
Diese Open-Source-Software steht in keiner Verbindung zu Ecoflow und wird von diesem Unternehmen auch nicht unterstützt. Die Nutzung der Software erfolgt auf eigene Gefahr und nach eigenem Ermessen. Ich übernehme keine Haftung für etwaige Schäden oder Probleme, die durch die Nutzung der Software entstehen können. Bitte beachten Sie, dass für die Nutzung dieser Open-Source-Software kein direkter Support oder Garantieleistungen von Ecoflow gewährt werden.

## Changelog

### 1.4.9 (WIP)

- (foxthefox) new datapoints Delta2max

### 1.4.8 (npm)

- (foxthefox) new device Glacier Classic 55L support
- (foxthefox) new device Delta 3 Max Plus support
- (foxthefox) new device Stream AC support
- (foxthefox) enhancements on wave3
- (foxthefox) poweroceanplus set hrPwr/fromPv/romBat/fromGrid values to 0 for non transmitted datapoints in HeatingRodEnergyStreamShow
- (foxthefox) poweroceanplus pcsActPwr max 20kW, pcsXPhase_amp max 60A
- (foxthefox) corrections in BMSHeartBeatReport for river3/river3plus
- (foxthefox) dev dependencies cleanup

### 1.4.7 (npm)

- (foxthefox) poweroceanplus, set mpptPwr/sysGridPwr/bpPwr values to 0, when the entity is not sent within the telegram
- (foxthefox) poweroceanplus, bpTargetSoc max new set to 101%, pcsBpPower max=10kW, pcsXPhase_actPwr min=-5kW

### 1.4.6 (npm)

- (foxthefox) powerocean implementation of ParallelEnergyStreamDetail which is the update to ParallelEnergyStreamReport
- (foxthefox) powerocean implementation of EnergyStreamDetail which is the update to EnergyStreamReport

### 1.4.5 (npm)

- (foxthefox) change from object to array for messages (for telegrams with multiple messages of same type i.e. powerocean)
- (foxthefox) change of cmdId/CmdFunc structure

### 1.4.4 (npm)

- (foxthefox) new datapoints for PowerOcean (HeatingRod, ParallelEnergy)
- (foxthefox) improvements tp powerocean plus
- (foxthefox) corrections for powerocean
- (foxthefox) testing JSON->buffer

### 1.4.3 (npm)

- (foxthefox) new cmd Stream to adjust output power via load task (dayResidentLoadList)
- (foxthefox) correction energyBackupand cmd for River3(Plus)
- (foxthefox) new device Stream Inverter supported
- (foxthefox) first improvements for power ocean plus (i.e. 6 batteries)
- (foxthefox) SHP time task enable switch and load level adjustment

### 1.4.2 (npm)

- (foxthefox) completion commands for River3(Plus)
- (foxthefox) correction of bool in proto of River3(Plus)

### 1.4.1 (npm)

- (foxthefox) Correction of multiplication, some float values may be incorrect now
- (foxthefox) new commands for STREAM and River3
- (foxthefox) River3 llcbusvol correction
- (foxthefox) Stream max settings for power,
- (foxthefox) separate handler for unknown devices

### 1.4.0 (npm)

- (foxthefox) new support of EF Smartmeter
- (foxthefox) new support of River3 (without cmds)
- (foxthefox) new support of Stream Series
- (foxthefox) new support of Power Ocean Plus
- (foxthefox) new Statistics for Gen3 powerstattions
- (foxthefox) new battery data for Gen3 powerstattions
- (foxthefox) new support of Power Ocean DC FIT
- (foxthefox) new support of Wave3 (without cmds!)
- (foxthefox) support of 3 extra batteries DeltaProUltra
- (foxthefox) new datapoints for stream series
- (foxthefox) new datapoints for river2max/pro in pd section
- (foxthefox) correction of river2max command chgWatts
- (foxthefox) corrections at history.. values for powerstream (not kWh, it is W)
- (foxthefox) issue #264, correction, additional bat Delta 2 has different data names than D2M
- (foxthefox) improved recognition of HA broker status and better initializing of data
- (foxthefox) telegram counter now in each device/info
- (foxthefox) major refactoring for the "JSON-devices"
- (foxthefox) min nodejs version >=20
- (foxthefox) debug button for latestQuotas, dbug button for unknown protobuf msg
- (foxthefox) iobroker/eslint-config

### 1.3.2 (npm)

- (foxthefox) improvement on HA cmds with numbers
- (foxthefox) correction on startVoltage for alternator, new cablelength

### 1.3.1 (npm)

- (foxthefox) new cmd for Delta3Plus and corrections to ranges
- (foxthefox) correction to cmd DPU,D3P,D3+,R3+ to appear correctly in HA (must be number to be adjustable)
- (foxthefox) improvement on HA cmds to devices with protobuf
- (foxthefox) delta2 settings improvement (unit, device_class)

### 1.3.0 (npm)

- (foxthefox) correction for PStream energy
- (foxthefox) new Delta Pro 3 implementation
- (foxthefox) new Delta 3 Plus implementation
- (foxthefox) new River 3 Plus implementation
- (foxthefox, radeonorama) enhancements alternator
- (foxthefox) major refactoring
- (foxthefox) new items to PowerOcean and HeatingRod

### 1.2.2 (npm)

- (foxthefox) some documentation for HA users
- (foxthefox) corrections in SHP2 protobuf definition
- (foxthefox) new datapoints in SHP2 ProtoTime, new telegram ProtoTimeStat mapped to ProtoTime
- (foxthefox) corrections to alternator (objects 268,269), power,wifiRssi setting,
- (foxthefox) DeltaPro mpptTemp, outAmp new max value

### 1.2.1 (npm)

- (foxthefox) corrections for pstream objects, some changed from string to number
- (foxthefox) new SHP time task config values

### 1.2.0 (npm)

- (foxthefox) new values powerocean
- (foxthefox) new values powerstream
- (foxthefox) new values plug
- (foxthefox) enhancements on values for SHP2,DPU,alternator

### 1.1.3 (npm)

- (foxthefox) enhancements to alternator values
- (foxthefox) refactoring of protobuf handling/structure/component data

### 1.1.2 (npm)

- (bh1cqx) handle HA restart #PR193
- (foxthefox) initial state population of BPInfo2/3 to HA
- (foxthefox) jsonConfig enhancements

### 1.1.1 (npm)

- (foxthefox) changed code structure
- (foxthefox) initial state creation of BPInfo2/3 to HA

### 1.1.0 (npm)

- (foxthefox) added a preliminary version of alternator (no cmd, non final state names)
- (foxthefox) added a config possibility for unsupported devices for capturing the transmitted telegrams
- (foxthefox) #168 changed SHP2 masterIncreInfo.gridSta '0': 'Grid volt. not detected', '1': 'Grid OK'
- (foxthefox) #173 DPU added additional battery selection
- (foxthefox) #174 SHP2 added in ProtoTime the wattInfoChWatt, wattInfoAllHallWatt
- (foxthefox) #174 SHP2 added channel values of power and current in loadPower/loadCurrent including the sum of the values
- (foxthefox) #167 DELTA2/2Max pd.dsgPowerAC and pd.dsgPowerDC (type from 'power' to 'energy')

### 1.0.5 (npm)

- (foxthefox) mppt.outWatts 500 -> 600; inverter_heartbeat.invOutputWatts 800 -> 810
- (foxthefox) update of Readme (adapter now in stable)
- (foxthefox) changes for responsive design #160

### 1.0.4 (npm)

- (foxthefox) some more protobuf decoding for power ocean (ev pulse portion)
- (foxthefox) correction for powerkit telegram reception #99
- (foxthefox) corrected/imroved powerkit datapoints

### 1.0.3 (npm)

- (foxthefox) watth16/17/18 upper range 10kWh
- (foxthefox) 'Backup reserve' option added for D2M #137
- (foxthefox) preparations for DeltaPro3 decode

### 1.0.2 (npm)

- (foxthefox) correction of SHP commands (#130)

### 1.0.1 (npm)

- (foxthefox) correction to level commands (not recognized when appendix level.xxx)
- (foxthefox) "this." for timer functions
- (foxthefox) corrected some debug functions
- (foxthefox) min js-controller = 5.0.12

### 1.0.0 (npm) BREAKING

- (foxthefox) correction of state roles (requires deletion of ecoflow objecttree!)
- (foxthefox) deletion of InverterHeartbeat2 of power stream, since latest FW does not deliver this telegram anymore (most likely part of the larger inverter_heartbeat)
- (foxthefox) some multiplication and max settings for SHP and Power Ocean corrected,

### 0.0.42 (npm)

- (foxthefox) correction SHP command
- (foxthefox) new data point power ocean, range min corrections
- (foxthefox) shelly3em model definition
- (foxthefox) IOB checker corrections

### 0.0.41 (npm)

- (foxthefox) correction in Compare function

### 0.0.40 (npm)

- (foxthefox) IOB checker corrections

### 0.0.39 (npm)

- (foxthefox) update devDeps
- (foxthefox) eslint upgrade and corrections

### 0.0.38 (npm)

- (foxthefox) additional datapoints for power ocean
- (foxthefox) corrections for upper limit on power ocean data points

### 0.0.37 (npm)

- (foxthefox) corrections for HA discovery of PowerOcean/SHP2/PowerKit

### 0.0.36 (npm)

- (foxthefox) correction bmsMaster.cellVol/cellTemp as array for DeltaPro
- (foxthefox) correction for transfer of values derived from protobuf to HA
- (foxthefox) enhanced to device specific logging

### 0.0.35 (npm)

- (foxthefox) unified detail debug settings, device specific debugging (new checkbox in device config)

### 0.0.34 (npm)

- (foxthefox) first implementation for power ocean kit
- (foxthefox) first implementation for smart home panel 2
- (foxthefox) new values watth16/17/18 for powerstream
- (foxthefox) deltapro max values mmpt.inAmp, mpptTemp
- (foxthefox) fixed updates to info.reconnects
- (foxthefox) fixed #90 cfgAcEnabled on river2max
- (foxthefox) logging enhancements

### 0.0.33 (npm)

- (foxthefox) added Power Kit
- (foxthefox) added new object ratedPower as command for powerstream

### 0.0.32 (npm)

- (foxthefox) added Shelly3EM reporting (cloud to cloud connection to be setup in EF App)

### 0.0.31 (npm)

- (foxthefox) optimization EF MQTT reconnect
- (foxthefox) initial update slave battery to HA
- (foxthefox) online status from latestQuotas
- (foxthefox) adapter config merge all device tabs into one (to overcome the problem that on tablets the last tab is not reachable), size adjustment
- (foxthefox) correction for deltapro at xt60ChgType
- (foxthefox) correction for river2max commands

### 0.0.30 (npm)

- (foxthefox) correction for River2Pro/Max cmd dcChgCurrent
- (foxthefox) correction for Delta2 cmd dcChgCurrent/pv2DcChgCurrent
- (foxthefox) correction for slave battery transfer to HA

### 0.0.29 (npm)

- (foxthefox) new objects for wave2
- (foxthefox) device emulation
- (foxthefox) mppt max value corrections

### 0.0.28 (npm)

- (foxthefox) fix value normalization (DP,wave2,glacier)
- (foxthefox) set actions initially to false to avoid null
- (foxthefox) fix latestQuotas for glacier/wave2
- (foxthefox) enhance logging

### 0.0.27 (npm)

- (foxthefox) fixed issues with additional battery and homeassistant transfer
- (foxthefox) bmsMaster Delta Pro new points (maxVolDiff,mosState,cellSeriesNum,cellNtcNum)
- (foxthefox) fix issue with SHP heartbeat.errorCodes

### 0.0.26 (npm)

- (foxthefox) bmasMaster.amp max = 50
- (foxthefox) corrections SHP

### 0.0.25 (npm)

- (foxthefox) new datapoints for DeltaPro

### 0.0.24 (npm)

- (foxthefox) SHP incomming data processing

### 0.0.23 (npm)

- (foxthefox) correction to latestQuotas (shift from info to action)
- (foxthefox) X_Unknown_15 range max 1000
- (foxthefox) new debug button for devices with protobuf msg

### 0.0.22 (npm)

- (foxthefox) Homeassistant Connector/Gateway
- (foxthefox) added Generator (indication only, no knowledge on commands)
- (foxthefox) added Delta Pro Ultra
- (foxthefox) added Smart Home Panel
- (foxthefox) latestQuotas/getTimeTaskConfig moved from info to action
- (foxthefox) uptime no max boundary
- (foxthefox) several adjustable values which represent a mode or predefined set of settings are now using "states" definition (IOB)
- (foxthefox) changed factor for pd/usb1Watts, usb2Watts, qcUsb1Watts, qcUsb2Watts
- (foxthefox) info for offline/online status with EF cloud
- (foxthefox) correction for protobuf cmds (dataLen)
- (foxthefox) some strings are now diagnostic
- (foxthefox) X_unknown_15/17/34 are now numbers
- (foxthefox) skip telegrams where openBmsIdx=0, bqSysStatReg=0
- (foxthefox) deltapro mppt value changes (inWatts/outWatts max=1600, mult= 0.001)
- (foxthefox) deltapro new values bmsMaster.diffSoc, bmsMaster.packSn

### 0.0.21 (npm)

- (foxthefox) more debug on connection
- (foxthefox) new datapoints for wave2
- (foxthefox) deleted max on duration values
- (foxthefox) moved several datapoints from number/string to arrays (mainly wave2/glacier)
- (foxthefox) moved datapoints from string to arrays (bms*.hwVersion, bms*.hwEdition, bms*.cellVol, bms*.cellTemp, pd.bmsKitState)
- (foxthefox) plug switch "dynWattEnable" which includes plug for dynamic watts of powerstream

### 0.0.20 (npm)

- (foxthefox) first additional integration tests
- (foxthefox) corrections in data model
- (foxthefox) new datapoints for glacier
- (foxthefox) new button in config for 'debug quotas' (retrieving data for all JSON-devices and displaying it)

### 0.0.19 (npm)

- (foxthefox) better error handling of incomplete messages from pstream
- (foxthefox) added indication of time tasks
- (foxthefox) cleanup pstream/plugs creation (both are protobuf)
- (foxthefox) further refactoring of code -> devices must be again defined !
- (foxthefox) differentiation between actual energy values and historical
- (foxthefox) getAllTaskCfg for powerstations in structure info
- (foxthefox) initial lastQuotas after adapter start for powerstream and plug
- (foxthefox) interpreted unknown values have now clear names
- (foxthefox) cyclic latestQuotas call instead of forced disconnect and reconnect (reconnects value only for checking, if stays with 0/null adapter has still mqtt telegrams)
- (foxthefox) new data points for deltamax
- (foxthefox) corrected pstream value changes to 0 (numbers), pdata must be omitted

### 0.0.18 (npm)

- (foxthefox) correction of wrong version number io io-package.json

### 0.0.17

- (foxthefox) added ems objects for River2Pro
- (foxthefox) more logging to pstream decode
- (foxthefox) spelling correction for latestQuotas

### 0.0.16

- (foxthefox) correction for array of devices, cause of "loosing" power stations

### 0.0.15

- (foxthefox) new implementation of Wave 2 Air conditioner
- (foxthefox) new implementation of Glacier refrigerator
- (foxthefox) correction of factors for delta2/delta2max/river2pro/river2max (mppt.?Vol, mppt.?Amp, mppt.?Watts)
- (foxthefox) some shifting from string to diagnostics
- (foxthefox) some updates to max values
- (foxthefox) delta2/delta2max pd.chgPowerAC and pd.chgPowerDC changed from power to energy
- (foxthefox) correction of plug_heartbeat values, protobuf shifts from snake_case to camelCase

### 0.0.14

- (foxthefox) new implementation of River 2 Pro, River 2 Max, River Pro, River Max
- (foxthefox) new feature get "lastQuotas"
- (foxthefox) recfactoring of protobuf encoding
- (foxthefox) watth5=daily energy plug, watth6=on time plug
- (foxthefox) plug_heartbeat new values unknown16...19

### 0.0.13

- (foxthefox) correction for changing of factors for pstations
- (foxthefox) watth5 for plugs
- (foxthefox) more logging pstream/plug
- (foxthefox) optional detection of no updates from mqtt server -> reconnection

### 0.0.12

- (foxthefox) new command brightness for plugs
- (foxthefox) correction of factors for plugs
- (foxthefox) powerstream bpType with value as texts
- (foxthefox) DELTA 2 factors corrected (mppt.inVol, mppt.inAmp,mppt.carOutAmp, mppt.carOutVol)
- (foxthefox) naming of watth1...8 (except 5)

### 0.0.11

- (foxthefox) correction this.pstreamStatesDict to cope with pstream and plug

### 0.0.10

- (foxthefox) unknown pstream message debug possibility
- (foxthefox) inv.outTemp max=90°C, inverter_heartbeat.pv1/2inputWatts max=600W
- (foxthefox) new function -> smart plugs

### 0.0.9

- (foxthefox) final version of credential creation, at least 6.12.3 for admin required
- (foxthefox) pd.wattsInSum max=4000W, pd.wattsOutSum max=4000W
- (foxthefox) unknwon59 -> batChargingTime, battMin -> batDischargingTime
- (foxthefox) processing multiple messages in one datagram

### 0.0.8

- (foxthefox) Delta2Max mppt.outVol mult=0.001 instead 0.1
- (foxthefox) handling additional battery for Delta2Max
- (foxthefox) pd.dsgPowerAC -> mult 0.001 Delta2Max
- (foxthefox) pd.chgPowerAC -> mult 0.001 Delta2Max
- (foxthefox) inv.acChgRatedPower -> max 4000W
- (foxthefox) inv.FastChgWatts -> max 2400W
- (foxthefox) chgwatts Delta 2 -> min 50W

### 0.0.7

- (foxthefox) jsonUI wrong attr for additional battery corrected

### 0.0.6

- (foxthefox) device doc
- (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent changed back to start at 4A

### 0.0.5

- (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent again with min=0, seems that there comes 0 at a certein telegram and causing warning
- (foxthefox) energy values (yield per day) for powerstream

### 0.0.4

- (foxthefox) new switch inverter_heartbeat.feedPriority (handling the excessive solar energy when battery is full)

### 0.0.3

- (foxthefox) requirement for admin 6.12.2 -> 6.12.0
- (foxthefox) iverter_heartbeat pv1InputCur, pv2InputCur factor corrected now 0.1
- (foxthefox) ems.chgAmp factor 0.0001 ( seemed too high by factor 10 )
- (foxthefox) bmsMaster.tagChgAmp factor 0.0001 ( seemed too high by factor 10 )
- (foxthefox) delta2max command for cfgDcChgCurrent/pv2DcChgCurrent changed
- (foxthefox) ensuring that commanded bppowerSoc value is always minimum 5% higher than the ems.minDsgSoc, also putting actual minDsgSoc into the command

### 0.0.2

- (foxthefox) pv2DcChgCurrent as level in delta2max
- (foxthefox) \*pv2DcChgCurrent with range 4-8 and step 2
- (foxthefox) chgPauseFlag as switch in delta2max

### 0.0.1 (npm)

- (foxthefox) initial release

## License

MIT License

Copyright (c) 2023-2025 foxthefox <foxthefox@wysiwis.net>

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