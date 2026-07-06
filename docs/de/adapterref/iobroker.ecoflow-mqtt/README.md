---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: D1rKWu0HbkvRqAaFrit3qOdi8ETGYEIcONe6kFpQ7LY=
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
- Falls eine zweite oder dritte Batterie angeschlossen ist, prüfen Sie diese als Slave1 oder Slave2.

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

[Delta 3 Classic](./doc/devices/delta3classic.md)

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

### Ladegerät
[Rapid Pro 320W](./doc/devices/rapidpro320.md)

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
- (foxthefox) new device Rapid Pro 320W support
- (foxthefox) enhancements on wave3
- (foxthefox) corrections in river3plus for data processing
- (foxthefox) corrections in D2M for command inv.cfgAcEnabled #340
- (foxthefox) poweroceanplus set hrPwr/fromPv/romBat/fromGrid values to 0 for non transmitted datapoints in HeatingRodEnergyStreamShow
- (foxthefox) poweroceanplus pcsActPwr max 20kW, pcsXPhase_amp max 60A
- (foxthefox) corrections in BMSHeartBeatReport for river3/river3plus
- (foxthefox) powGetSysLoad for streamAC/ACPro/Ultra set to 10kW, powGetSchuko 2100W
- (foxthefox) new msg counter for received telegrams from EF-cloud (within 10s)
- (foxthefox) correction of enBeep (dataLen=2) for Delta3/+/max+/pro
- (foxthefox) correction of AC1/2/3 switching on SHP2 (issue #312)
- (foxthefox) Stream AC timetask58x exclude
- (foxthefox) correction of powerocean / powerocean+ (issue #378), new ENERGY_STREAM_DETAIL and switch for missing datapoint -> value = 0
- (foxthefox) dev dependencies cleanup

[older changes](./CHANGELOG.md)

## License

MIT License

Copyright (c) 2023-2026 foxthefox <foxthefox@wysiwis.net>

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