---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: WfcLVym732qAh1afIgZhieVEXWo4hQCltjkfrSn3hpc=
---
![Logo](../../../en/adapterref/iobroker.ecoflow-mqtt/admin/ecoflow-mqtt.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ecoflow-mqtt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ecoflow-mqtt.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ecoflow-mqtt-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ecoflow-mqtt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ecoflow-mqtt.png?downloads=true)

# IoBroker.ecoflow-mqtt
**Tests:** ![Testen und Freigeben](https://github.com/foxthefox/ioBroker.ecoflow-mqtt/workflows/Test%20and%20Release/badge.svg)

## Ecoflow-mqtt-Adapter für ioBroker
verbindet sich mit Produkten von Ecoflow ([https://www.ecoflow.com])

## WARNUNG
Dieser Adapter nutzt eine inoffizielle Kommunikation mit den Geräten.
Eine fehlerhafte Kommunikation oder die Einstellung falscher Werte kann die Funktionalität des Geräts beeinträchtigen und zum Ausschluss vom Dienst führen.

Der Adapter basiert auf der Arbeit von:

* meine eigene Bewertung und Recherche
* https://github.com/tolwi/hassio-ecoflow-cloud
* https://haus-automatisierung.com/hardware/2023/02/13/ecoflow-river-2-usv-batteriespeicher.html
* https://forum.iobroker.net/topic/66743/ecoflow-connector-script-zur-dynamischen-leistungsanpassung
* https://konkludenz.de/de/ecoflow-wave2-smart-home-fähig-machen-mit-node-red-und-mqtt

## Installation
Der Adapter befindet sich in einem stabilen Repository und kann daher durch Suchen installiert werden.
Wenn Updates verfügbar sind, installieren Sie diese.

Wenn eine sehr neue Version verfügbar ist, kann eine benutzerdefinierte Installation über npm/github erforderlich sein.
In diesem Fall muss der Expertenmodus aktiviert sein, um Zugriff auf das „Octacat“-Symbol zu erhalten.
![einige weitere Details](../../../en/adapterref/iobroker.ecoflow-mqtt/doc/en/installation.md)

## EF-Anmeldeinformationen
Auf der Admin-Seite (erste Registerkarte) müssen die MQQT-Anmeldeinformationen für den MQQT-Broker eingegeben werden.

* Benutzername – etwa „app-….“
* Benutzer-ID - eine 19-stellige Nummer
* Benutzerkennwort - ein alphanumerisches
* ClientID – eine Zeichenfolge, die mit „ANDROID_…“ beginnt.

Es gibt 3 Möglichkeiten:

1. per Skript https://github.com/mmiller7/ecoflow-withoutflow/blob/main/cloud-mqtt/ecoflow_get_mqtt_login.sh
2. über die Website https://energychain.github.io/site_ecoflow_mqtt_credentials/
3. durch den eigenen Algorithmus des Adapters (durch Drücken der Taste), hierfür sind der Benutzername und das Passwort von ecoflow erforderlich.

Die MQQT-Broker-Einstellungen sind Standardeinstellungen und müssen normalerweise nicht geändert werden.

!!! In Fällen, in denen der MQTT-Server die Verbindung ablehnt, kann es hilfreich sein, mit Option Nr. 2 die Ausgabe dieser Website zu überprüfen. In einigen Fällen wird eine andere MQTT-Broker-Adresse zurückgegeben!!!

## Geräteeinrichtung und -konfiguration
Verwenden Sie die Registerkarte „Gerätekonfiguration“, um Ihre Geräte hinzuzufügen.

<details><summary><i>Parametrisierung des Powerstreams</i></summary><p>

* eine neue Zeile hinzufügen
* Stellen Sie die Geräte-ID von Powerstream wie in der App angezeigt ein, etwa „HW51....“
* gib ihm einen Namen
* wählen Sie die Version (600W oder 800W)

</p></details>

<details><summary><i>Parametrierung der Powerstation</i></summary><p>

* eine neue Zeile hinzufügen
* Legen Sie die Geräte-ID der Powerstation wie in der App angezeigt fest. Die Zeichenfolge variiert je nach Gerätetyp.
* gib ihm einen Namen
* Wählen Sie den Gerätetyp
* Wenn ein zusätzlicher Akkupack angeschlossen ist, überprüfen Sie die Portnummer, an der er angeschlossen ist

</p></details>

<details><summary><i>Parametrierung des Smart Plug</i></summary><p>

* eine neue Zeile hinzufügen
* Stellen Sie die Geräte-ID des Smart Plug wie in der App angezeigt ein, etwa „HW52....“
* gib ihm einen Namen
* den Typ auf "Stecker" einstellen

</p></details>

<details><summary><i>Parametrisierung des Shelly</i></summary><p>

* eine neue Zeile hinzufügen
* Stellen Sie die Geräte-ID von Shelly wie in der App angezeigt ein. Bitte beachten Sie, dass sich die ID von der des Shelly-Geräts selbst unterscheidet.
* gib ihm einen Namen
* setze den Typ auf „Shelly3EM“

</p></details>

<details><summary><i>Parametrierung des Generators</i></summary><p>

* eine neue Zeile hinzufügen
* Legen Sie die Geräte-ID des Generators wie in der App angezeigt fest, etwa „DGEB....“
* gib ihm einen Namen
* setze den Typ auf „Generator“

</p></details>

<details><summary><i>Parametrierung des Smart Home Panels</i></summary><p>

* eine neue Zeile hinzufügen
* Legen Sie die Geräte-ID des Generators wie in der App angezeigt fest, etwa „SP10....“
* gib ihm einen Namen
* den Typ auf „SHP“ oder „SHP2“ einstellen

</p></details>

<details><summary><i>Parametrierung des Power Kits und Hubs</i></summary><p>

* eine neue Zeile hinzufügen
* Stellen Sie die Geräte-ID des Power Kits wie in der App angezeigt ein, etwa „M10....“
* gib ihm einen Namen
* Stellen Sie den Typ auf „Power Kit BP2000“ oder „Power Kit BP5000“ ein
* wenn eine zweite oder dritte Batterie angeschlossen ist, dann markieren Sie diese als Slave1 oder Slave2

</p></details>

<details><summary><i>Parametrisierung der Power Ocean DC-Anpassung</i></summary><p>

* eine neue Zeile hinzufügen
* Legen Sie die Geräte-ID des Generators wie in der App angezeigt fest, etwa „HJ31....“
* gib ihm einen Namen
* Stellen Sie den Typ auf „Power Ocean“ ein
* wenn eine zweite oder dritte Batterie angeschlossen ist, dann markieren Sie diese als Slave1 oder Slave2

</p></details>

<details><summary><i>Parametrisierung der Welle</i></summary><p>

* eine neue Zeile hinzufügen
* Stellen Sie die Geräte-ID des Smart Plug wie in der App angezeigt ein, etwa „KT21ZCH …“
* gib ihm einen Namen
* setze den Typ auf "Wave2"

</p></details>

<details><summary><i>Parametrisierung des Gletschers</i></summary><p>

* eine neue Zeile hinzufügen
* Stellen Sie die Geräte-ID des Smart Plug wie in der App angezeigt ein, etwa „BX11ZCB …“
* gib ihm einen Namen
* den Typ auf „Gletscher“ einstellen

</p></details>

<details><summary><i>Parametrierung des Generators</i></summary><p>

* eine neue Zeile hinzufügen
* Stellen Sie die Geräte-ID des Smart Plug wie in der App angezeigt ein, etwa „F371ZE …“
* gib ihm einen Namen
* den Typ auf „Lichtmaschine 800W“ einstellen

</p></details>

Verwenden Sie die Registerkarte „Homeassistant“ zum Einrichten der MQTT-Verbindung zu HA

<details><summary><i>Parametrisierung des Homeassistant-Connectors</i></summary><p>

* den Dienst aktivieren
* die Benutzereinstellungen des MQTT Brokers von HA festlegen
* Setzen Sie die Verbindungsparameter des MQTT-Brokers von HA
* Wählen Sie bei Bedarf Debug-Einstellungen

Modifikation auf der HA-Seite:

* Der Adapter verwendet die Erkennungsfunktion in HA, es ist keine Konfiguration von Datenpunkten in HA erforderlich.
* MQTT-Add-on ...

</p></details>

## Aktualisieren des Adapters
Normalerweise reicht es aus, die nächste Version über die alte zu installieren. In manchen Fällen (z. B. 1.0.0) kann es erforderlich sein, den gesamten Objektbaum zu löschen.
Wenn datenpunktbezogene Werte geändert werden, z. B. das Minimum oder Maximum des Bereichs, müssen Sie Folgendes tun:

- Stoppen Sie den Adapter
- die betroffenen Datenpunkte gelöscht
- Starten Sie den Adapter

Anschließend werden die neuen Bereiche übernommen.

## IoBroker-Adapterfunktionen
* die definierten Geräte werden per MQTT mit dem Adapter verbunden
* Der Adapter filtert die eingehenden Nachrichten der Geräte. Nur geänderte Werte werden intern gespeichert
* Wenn die App die Anpassung unter bestimmten Bedingungen verhindert, wird diese, wenn bekannt, repliziert (z. B. wird das Einschalten des Wechselrichters bei Unterschreiten der Mindestbatterieladung verhindert, Sie können eine Warnung im Protokoll sehen)
* nicht alles ist bekannt, daher können Informationen zur Statusinterpretation unsicher sein, dies wird meist mit einem abschließenden „?“ gekennzeichnet.

### Anmerkungen zur Aktualisierung der Datenpunkteinstellungen (Min., Max., Einheit, ....)
Wenn die Einstellungen eines Datenpunkts in der neuen Version des Adapters geändert werden (z. B. Name, Einheit, Maximalwert), wird die Änderung erst wirksam, wenn Sie:

- Stoppen Sie die Adapterinstanz
- Löschen des entsprechenden Datenpunkts oder der gesamten Objektstruktur der Adapterinstanz
- Starten Sie die Adapterinstanz

Beim Start werden die Datenpunkte erstellt, jedoch nicht verändert, sofern sie vorhanden sind.

### Anmerkungen zu Warnungen/Fehlern
Einige Vorkommnisse im Adapter werden als Warnung oder Fehler gekennzeichnet, um im Protokoll angezeigt zu werden, wenn sich der Loglevel im Infomodus befindet.
Dies ist nicht unbedingt ein Fehler oder ein Hinweis auf einen nicht funktionierenden Adapter, sondern eher ein Hinweis auf ein unerwartetes Verhalten. Die Ursache liegt möglicherweise nicht im Adapter selbst, aber die Aufmerksamkeit ist darauf gerichtet.

## HA-Anschluss/Gateway
* die MQTT-Erkennungsfunktion in HA ermöglicht eine elegante Art des Informationsaustauschs
* Die MQTT-Erkennungsfunktion kann möglicherweise nicht aktiviert werden, wenn der MQTT-Broker bereits in HA ausgeführt wird. Sie muss während der Neukonfiguration des MQTT-Dienstes aktiviert werden.
* Bei jedem Start des iobroker-Adapters werden alle Discovery-Objekte an HA übertragen (auch wenn sie im HA verbleiben sollen)
* Der iobroker-Adapter filtert die eingehenden Nachrichten der Geräte. Nur geänderte Werte werden intern gespeichert und an HA übertragen.
* Wenn ein Wert nicht durch die Aktualisierung der Gerätedaten festgelegt wird, wird er in HA als unbekannt angezeigt
* Wenn das Gerät erreichbar ist, wird die Verfügbarkeit in der Gerätekonnektivität angezeigt. Dies wird an die „Untergeräte“ vererbt (Nichtverfügbarkeit wird auf die gleiche Weise verarbeitet).

[einige Hinweise für HA](./doc/en/IOB_HA/navi.md)

### Anmerkungen zur Funktionalität
* Aufgrund der Asynchronität von Informationsaktualisierungen und Befehlsübertragungen können gelegentlich Race Conditions auftreten. So kann beispielsweise ein Wechsel durch einen Befehl hin und her geschaltet werden, bevor er stehen bleibt.
* Neustart von HA wird im iobroker möglicherweise nicht korrekt erkannt, daher ist ein manueller Neustart des Adapters erforderlich (WIP)

## Implementierte Geräte und Struktur mit Datenpunkten
einige Erläuterungen zu den Gerätedaten

* Zahl -> Datenpunkt mit numerischem Wert
* Ebene -> einstellbarer Datenpunkt mit numerischem Wert, manchmal auch Auswahlen mit numerischer Darstellung
* Schalter -> einstellbarer Datenpunkt Boolean
* Diagnose -> Boolescher oder Multi-State-Datenpunkt in Text übertragen
* Zeichenfolge -> Datenpunkt nur als Text
* Array -> Datenpunkt mit Array
* Bei der Konvertierung von Werten in Text wird möglicherweise ein nicht validierter Text verwendet (Feedback ist willkommen). Dies wird durch ein „?“ am Ende des Textes angezeigt.

### Kraftwerk
[Fluss Max](./doc/devices/rivermax.md)

[River Pro](./doc/devices/riverpro.md)

[Delta Mini](./doc/devices/deltamini.md)

[Delta](./doc/devices/delta.md)

[Delta Max](./doc/devices/deltamax.md)

[Delta Pro](./doc/devices/deltapro.md)

[Fluss 2 Max](./doc/devices/river2max.md)

[River 2 Pro](./doc/devices/river2pro.md)

[River 3 Plus](./doc/devices/river3plus.md)

[Delta 2](./doc/devices/delta2.md)

[Delta 2 Max](./doc/devices/delta2max.md)

[Delta 3 Plus](./doc/devices/delta3plus.md)

[Delta Pro 3](./doc/devices/deltapro3.md)

[Delta Pro Ultra](./doc/devices/deltaproultra.md)

### Smart-Home-Panel
[Smart Home-Panel](./doc/devices/panel.md)

[Smart Home Panel 2](./doc/devices/panel2.md)

### Stromversorgungskit und Hub
[Stromversorgungskit](./doc/devices/powerkit.md)

### Kraft Ozean
[Kraft Ozean](./doc/devices/powerocean.md)

### Generator
[Generator](./doc/devices/generator.md)

Dual-Fuel-Generator ist nicht verfügbar, könnte aber implementiert werden, wenn Daten verfügbar sind.

### Powerstream
[Powerstream](./doc/devices/pstream600.md)

Die 800-W-Version ist ebenfalls implementiert. Der einzige Unterschied besteht in der maximalen Leistung von 800 W.
Versorgungspriorität -> 0/falsch = priorisierte Netzversorgung; -> 1/wahr = priorisierte Batterieversorgung (Laden)

### Intelligente Stecker
[Intelligenter Stecker](./doc/devices/plug.md)

### Shelly-Geräte
[Shelly3EM](./doc/devices/shelly3em.md)

### Wave 2 Klimaanlage
[Welle 2](./doc/devices/wave2.md)

Wave ist nicht verfügbar, könnte implementiert werden, wenn Daten verfügbar sind.

### Gletscherkühlschrank
[Gletscher](./doc/devices/glacier.md)

### Lichtmaschine
[Generator](./doc/devices/alternator.md)

### Nicht unterstützte Geräte
Dieser Abschnitt wurde für Debugging-Zwecke erstellt. Wählen Sie das Gerät (Delta Pro3, Delta3, Delta3 Plus) aus und geben Sie die Seriennummer in die hinzugefügte Zeile ein. Es wird erwartet, dass das unbekannte Gerät Protobuf verwendet. Es erstellt die Meldung [PROTOBUF unbekannt] im Protokoll. Sie enthalten das rohe Hexadezimaltelegramm.

## Aufgaben
* vergessene Randbedingungen für Befehle prüfen (Befehl unterdrücken, oder zusätzlichen Wert)
* Überprüfen Sie den Pieptonbefehl, wenn eine Rückwärtsfahrt erforderlich ist
* SlaveBattery DM, OutWatts-Multiplikation mit 10
* mehr getCmds für SHP-Werte

## Haftungsausschluss
Diese Open-Source-Software steht in keiner Verbindung zu Ecoflow und wird von Ecoflow auch nicht unterstützt.
Die Nutzung der Software erfolgt auf eigene Gefahr und nach eigenem Ermessen. Ich übernehme keine Haftung für mögliche Schäden oder Probleme, die durch die Nutzung der Software entstehen können. Bitte beachten Sie, dass für die Nutzung dieser Open-Source-Software keine direkte Unterstützung oder Garantien durch Ecoflow gewährt werden.

## Changelog

### 1.3.0 (npm)
* (foxthefox) correction for PStream energy
* (foxthefox) new Delta Pro 3 implementation
* (foxthefox) new Delta 3 Plus implementation
* (foxthefox) new River 3 Plus implementation
* (foxthefox, radeonorama) enhancements alternator
* (foxthefox) major refactoring
* (foxthefox) new items to PowerOcean and HeatingRod


### 1.2.2 (npm)
* (foxthefox) some documentation for HA users
* (foxthefox) corrections in SHP2 protobuf definition
* (foxthefox) new datapoints in SHP2 ProtoTime, new telegram ProtoTimeStat mapped to ProtoTime
* (foxthefox) corrections to alternator (objects 268,269), power,wifiRssi setting, 
* (foxthefox) DeltaPro mpptTemp, outAmp new max value

### 1.2.1 (npm)
* (foxthefox) corrections for pstream objects, some changed from string to number
* (foxthefox) new SHP time task config values

### 1.2.0 (npm)
* (foxthefox) new values powerocean
* (foxthefox) new values powerstream
* (foxthefox) new values plug
* (foxthefox) enhancements on values for SHP2,DPU,alternator

### 1.1.3 (npm)
* (foxthefox) enhancements to alternator values
* (foxthefox) refactoring of protobuf handling/structure/component data

### 1.1.2 (npm)
* (bh1cqx) handle HA restart #PR193
* (foxthefox) initial state population of BPInfo2/3 to HA
* (foxthefox) jsonConfig enhancements

### 1.1.1 (npm)
* (foxthefox) changed code structure
* (foxthefox) initial state creation of BPInfo2/3 to HA

### 1.1.0 (npm)
* (foxthefox) added a preliminary version of alternator (no cmd, non final state names)
* (foxthefox) added a config possibility for unsupported devices for capturing the transmitted telegrams
* (foxthefox) #168 changed SHP2 masterIncreInfo.gridSta '0': 'Grid volt. not detected', '1': 'Grid OK'
* (foxthefox) #173 DPU added additional battery selection
* (foxthefox) #174 SHP2 added in ProtoTime the wattInfoChWatt, wattInfoAllHallWatt
* (foxthefox) #174 SHP2 added channel values of power and current in loadPower/loadCurrent including the sum of the values
* (foxthefox) #167 DELTA2/2Max pd.dsgPowerAC and pd.dsgPowerDC (type from 'power' to 'energy')

### 1.0.5 (npm)
* (foxthefox) mppt.outWatts 500 -> 600; inverter_heartbeat.invOutputWatts 800 -> 810
* (foxthefox) update of Readme (adapter now in stable)
* (foxthefox) changes for responsive design #160

### 1.0.4 (npm)
* (foxthefox) some more protobuf decoding for power ocean (ev pulse portion)
* (foxthefox) correction for powerkit telegram reception #99
* (foxthefox) corrected/imroved powerkit datapoints

### 1.0.3 (npm)
* (foxthefox) watth16/17/18 upper range 10kWh
* (foxthefox) 'Backup reserve' option added for D2M #137
* (foxthefox) preparations for DeltaPro3 decode

### 1.0.2 (npm)
* (foxthefox) correction of SHP commands (#130)

### 1.0.1 (npm)
* (foxthefox) correction to level commands (not recognized when appendix level.xxx)
* (foxthefox) "this." for timer functions
* (foxthefox) corrected some debug functions
* (foxthefox) min js-controller = 5.0.12

### 1.0.0 (npm) BREAKING
* (foxthefox) correction of state roles (requires deletion of ecoflow objecttree!)
* (foxthefox) deletion of InverterHeartbeat2 of power stream, since latest FW does not deliver this telegram anymore (most likely part of the larger inverter_heartbeat)
* (foxthefox) some multiplication and max settings for SHP and Power Ocean corrected, 


### 0.0.42 (npm)
* (foxthefox) correction SHP command
* (foxthefox) new data point power ocean, range min corrections
* (foxthefox) shelly3em model definition
* (foxthefox) IOB checker corrections

### 0.0.41 (npm)
* (foxthefox) correction in Compare function

### 0.0.40 (npm)
* (foxthefox) IOB checker corrections

### 0.0.39 (npm)
* (foxthefox) update devDeps
* (foxthefox) eslint upgrade and corrections

### 0.0.38 (npm)
* (foxthefox) additional datapoints for power ocean
* (foxthefox) corrections for upper limit on power ocean data points

### 0.0.37 (npm)
* (foxthefox) corrections for HA discovery of PowerOcean/SHP2/PowerKit

### 0.0.36 (npm)
* (foxthefox) correction bmsMaster.cellVol/cellTemp as array for DeltaPro
* (foxthefox) correction for transfer of values derived from protobuf to HA
* (foxthefox) enhanced to device specific logging

### 0.0.35 (npm)
* (foxthefox) unified detail debug settings, device specific debugging (new checkbox in device config)

### 0.0.34 (npm)
* (foxthefox) first implementation for power ocean kit
* (foxthefox) first implementation for smart home panel 2
* (foxthefox) new values watth16/17/18 for powerstream
* (foxthefox) deltapro max values mmpt.inAmp, mpptTemp
* (foxthefox) fixed updates to info.reconnects
* (foxthefox) fixed #90 cfgAcEnabled on river2max
* (foxthefox) logging enhancements

### 0.0.33 (npm)
* (foxthefox) added Power Kit
* (foxthefox) added new object ratedPower as command for powerstream 

### 0.0.32 (npm)
* (foxthefox) added Shelly3EM reporting (cloud to cloud connection to be setup in EF App)

### 0.0.31 (npm)
* (foxthefox) optimization EF MQTT reconnect
* (foxthefox) initial update slave battery to HA
* (foxthefox) online status from latestQuotas
* (foxthefox) adapter config merge all device tabs into one (to overcome the problem that on tablets the last tab is not reachable), size adjustment
* (foxthefox) correction for deltapro at xt60ChgType
* (foxthefox) correction for river2max commands

### 0.0.30 (npm)
* (foxthefox) correction for River2Pro/Max cmd dcChgCurrent
* (foxthefox) correction for Delta2 cmd dcChgCurrent/pv2DcChgCurrent
* (foxthefox) correction for slave battery transfer to HA

### 0.0.29 (npm)
* (foxthefox) new objects for wave2
* (foxthefox) device emulation
* (foxthefox) mppt max value corrections

### 0.0.28 (npm)
* (foxthefox) fix value normalization (DP,wave2,glacier)
* (foxthefox) set actions initially to false to avoid null
* (foxthefox) fix latestQuotas for glacier/wave2
* (foxthefox) enhance logging

### 0.0.27 (npm)
* (foxthefox) fixed issues with additional battery and homeassistant transfer
* (foxthefox) bmsMaster Delta Pro new points (maxVolDiff,mosState,cellSeriesNum,cellNtcNum)
* (foxthefox) fix issue with SHP heartbeat.errorCodes

### 0.0.26 (npm)
* (foxthefox) bmasMaster.amp max = 50
* (foxthefox) corrections SHP

### 0.0.25 (npm)
* (foxthefox) new datapoints for DeltaPro

### 0.0.24 (npm)
* (foxthefox) SHP incomming data processing

### 0.0.23 (npm)
* (foxthefox) correction to latestQuotas (shift from info to action)
* (foxthefox) X_Unknown_15 range max 1000
* (foxthefox) new debug button for devices with protobuf msg

### 0.0.22 (npm)
* (foxthefox) Homeassistant Connector/Gateway
* (foxthefox) added Generator (indication only, no knowledge on commands)
* (foxthefox) added Delta Pro Ultra
* (foxthefox) added Smart Home Panel
* (foxthefox) latestQuotas/getTimeTaskConfig moved from info to action
* (foxthefox) uptime no max boundary
* (foxthefox) several adjustable values which represent a mode or predefined set of settings are now using "states" definition (IOB)
* (foxthefox) changed factor for pd/usb1Watts, usb2Watts, qcUsb1Watts, qcUsb2Watts
* (foxthefox) info for offline/online status with EF cloud
* (foxthefox) correction for protobuf cmds (dataLen)
* (foxthefox) some strings are now diagnostic
* (foxthefox) X_unknown_15/17/34 are now numbers
* (foxthefox) skip telegrams where openBmsIdx=0, bqSysStatReg=0
* (foxthefox) deltapro mppt value changes (inWatts/outWatts max=1600, mult= 0.001)
* (foxthefox) deltapro new values bmsMaster.diffSoc, bmsMaster.packSn


### 0.0.21 (npm)
* (foxthefox) more debug on connection
* (foxthefox) new datapoints for wave2
* (foxthefox) deleted max on duration values
* (foxthefox) moved several datapoints from number/string to arrays (mainly wave2/glacier)
* (foxthefox) moved datapoints from string to arrays (bms*.hwVersion, bms*.hwEdition, bms*.cellVol, bms*.cellTemp, pd.bmsKitState)
* (foxthefox) plug switch "dynWattEnable" which includes plug for dynamic watts of powerstream

### 0.0.20 (npm)
* (foxthefox) first additional integration tests
* (foxthefox) corrections in data model
* (foxthefox) new datapoints for glacier
* (foxthefox) new button in config for 'debug quotas' (retrieving data for all JSON-devices and displaying it)

### 0.0.19 (npm)
* (foxthefox) better error handling of incomplete messages from pstream
* (foxthefox) added indication of time tasks
* (foxthefox) cleanup pstream/plugs creation (both are protobuf)
* (foxthefox) further refactoring of code -> devices must be again defined !
* (foxthefox) differentiation between actual energy values and historical
* (foxthefox) getAllTaskCfg for powerstations in structure info
* (foxthefox) initial lastQuotas after adapter start for powerstream and plug
* (foxthefox) interpreted unknown values have now clear names
* (foxthefox) cyclic latestQuotas call instead of forced disconnect and reconnect (reconnects value only for checking, if stays with 0/null adapter has still mqtt telegrams)
* (foxthefox) new data points for deltamax
* (foxthefox) corrected pstream value changes to 0 (numbers), pdata must be omitted

### 0.0.18 (npm)
* (foxthefox) correction of wrong version number io io-package.json

### 0.0.17
* (foxthefox) added ems objects for River2Pro
* (foxthefox) more logging to pstream decode
* (foxthefox) spelling correction for latestQuotas 

### 0.0.16
* (foxthefox) correction for array of devices, cause of "loosing" power stations

### 0.0.15
* (foxthefox) new implementation of Wave 2 Air conditioner
* (foxthefox) new implementation of Glacier refrigerator
* (foxthefox) correction of factors for delta2/delta2max/river2pro/river2max (mppt.?Vol, mppt.?Amp, mppt.?Watts)
* (foxthefox) some shifting from string to diagnostics
* (foxthefox) some updates to max values
* (foxthefox) delta2/delta2max pd.chgPowerAC and pd.chgPowerDC changed from power to energy 
* (foxthefox) correction of plug_heartbeat values, protobuf shifts from snake_case to camelCase

### 0.0.14
* (foxthefox) new implementation of River 2 Pro, River 2 Max, River Pro, River Max
* (foxthefox) new feature get "lastQuotas"
* (foxthefox) recfactoring of protobuf encoding
* (foxthefox) watth5=daily energy plug, watth6=on time plug
* (foxthefox) plug_heartbeat new values unknown16...19

### 0.0.13
* (foxthefox) correction for changing of factors for pstations
* (foxthefox) watth5 for plugs
* (foxthefox) more logging pstream/plug
* (foxthefox) optional detection of no updates from mqtt server -> reconnection

### 0.0.12
* (foxthefox) new command brightness for plugs
* (foxthefox) correction of factors for plugs
* (foxthefox) powerstream bpType with value as texts
* (foxthefox) DELTA 2 factors corrected (mppt.inVol, mppt.inAmp,mppt.carOutAmp, mppt.carOutVol)
* (foxthefox) naming of watth1...8 (except 5)

### 0.0.11
* (foxthefox) correction this.pstreamStatesDict to cope with pstream and plug

### 0.0.10
* (foxthefox) unknown pstream message debug possibility
* (foxthefox) inv.outTemp max=90°C, inverter_heartbeat.pv1/2inputWatts max=600W
* (foxthefox) new function -> smart plugs

### 0.0.9
* (foxthefox) final version of credential creation, at least 6.12.3 for admin required
* (foxthefox) pd.wattsInSum max=4000W, pd.wattsOutSum max=4000W
* (foxthefox) unknwon59 -> batChargingTime, battMin -> batDischargingTime
* (foxthefox) processing multiple messages in one datagram 

### 0.0.8
* (foxthefox) Delta2Max mppt.outVol mult=0.001 instead 0.1
* (foxthefox) handling additional battery for Delta2Max
* (foxthefox) pd.dsgPowerAC -> mult 0.001 Delta2Max
* (foxthefox) pd.chgPowerAC -> mult 0.001 Delta2Max
* (foxthefox) inv.acChgRatedPower -> max 4000W
* (foxthefox) inv.FastChgWatts -> max 2400W
* (foxthefox) chgwatts Delta 2 -> min 50W

### 0.0.7
* (foxthefox) jsonUI wrong attr for additional battery corrected

### 0.0.6
* (foxthefox) device doc
* (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent changed back to start at 4A

### 0.0.5
* (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent again with min=0, seems that there comes 0 at a certein telegram and causing warning
* (foxthefox) energy values (yield per day) for powerstream

### 0.0.4
* (foxthefox) new switch inverter_heartbeat.feedPriority (handling the excessive solar energy when battery is full)

### 0.0.3
* (foxthefox) requirement for admin 6.12.2 -> 6.12.0
* (foxthefox) iverter_heartbeat pv1InputCur, pv2InputCur factor corrected now 0.1
* (foxthefox) ems.chgAmp factor 0.0001 ( seemed too high by factor 10 )
* (foxthefox) bmsMaster.tagChgAmp factor 0.0001 ( seemed too high by factor 10 )
* (foxthefox) delta2max command for cfgDcChgCurrent/pv2DcChgCurrent changed
* (foxthefox) ensuring that commanded bppowerSoc value is always minimum 5% higher than the ems.minDsgSoc, also putting actual minDsgSoc into the command

### 0.0.2
* (foxthefox) pv2DcChgCurrent as level in delta2max
* (foxthefox) *pv2DcChgCurrent with range 4-8 and step 2
* (foxthefox) chgPauseFlag as switch in delta2max

### 0.0.1 (npm)
* (foxthefox) initial release

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