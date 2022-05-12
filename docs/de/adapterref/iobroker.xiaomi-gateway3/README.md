---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.xiaomi-gateway3/README.md
title: ioBroker.xiaomi-gateway3
hash: chcMoV8/LrU3wP/rKmsvMrQTdqahOj4PRZPfLc9vB6s=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.xiaomi-gateway3.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.xiaomi-gateway3.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/xiaomi-gateway3-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/xiaomi-gateway3-stable.svg)
![NPM](https://nodei.co/npm/iobroker.xiaomi-gateway3.png?downloads=true)

<img src="static/xiaomi-gateway3_logo.png" alt="Logo" width="150"/>

# IoBroker.xiaomi-gateway3
![Testen und freigeben](https://github.com/lasthead0/ioBroker.xiaomi-gateway3/workflows/Test%20and%20Release/badge.svg)

## Xiaomi-gateway3 ioBroker-Adapter
Dieser Adapter ermöglicht es ioBroker, mit Xiaomi Gateway 3 zu kommunizieren und es zur Steuerung von Xiaomi-Geräten zu verwenden.
Der Adapter kommuniziert mit dem Gateway über das MQTT-Protokoll (er verbindet sich mit dem integrierten MQTT-Broker). Allerdings müssen Sie Ihr Gateway und Ihre Geräte mit Mi Home (Cloud) koppeln.

## Frühe Version
Adapter befindet sich derzeit in der Entwicklungsphase. Hat aber bereits einsatzbereite Funktionalität.

Für eine erfolgreiche Adapterentwicklung braucht es Community-Hilfe, hauptsächlich beim Testen von Adaptern und Geräten.

## Vielen Dank
Ein großer Teil des Codes basiert auf und wurde neu geschrieben von [AlexxIT](https://github.com/AlexxIT) Projekt [XiaomiGateway3](https://github.com/AlexxIT/XiaomiGateway3)

## Wie kannst du helfen?
Zunächst einmal können Sie den Adapter einfach installieren, verwenden und Probleme melden.

Außerdem können Sie, wenn Sie viele verschiedene Geräte haben, helfen, deren Unterstützung zu verbessern, indem Sie die Option `Debug output (to state)` (siehe unten) aktivieren und mir nach einigen Tagen, in denen Debug-Daten gesammelt werden, eine Debug-Ausgabe geben.

## Hardware und Grenzen
<img src="static/xiaomi-gateway3-img.png" width="250">

Adapter unterstützt `Xiaomi Gateway 3 (ZNDMWG03LM and ZNDMWG02LM)` auf Original-Firmware dieser Versionen:

- `v1.5.0_0026` (darauf entwickelt)
- `v1.5.0_0102` (ähnlich `1.5.0_0026`, aber nicht getestet)

Sie können das Gateway mit benutzerdefinierter oder vorrätiger Firmware in diesen Versionen flashen: [wiki](https://github.com/AlexxIT/XiaomiGateway3/wiki).

__*!!Achtung:*__ Firmware-Versionen niedriger als `1.4.7_0000` Adapter werden nicht unterstützt und werden nicht unterstützt. Unterstützung von Versionen niedriger als `v1.5.0_0026` nicht garantiert.

## Unterstützte Geräte
- [x] Getestet
- [ ] Nicht getestet

### Zigbee-Geräte
- [ ] Aqara-Birne (ZNLDP12LM)
- [ ] Aqara-Taste (WXKG11LM)
- [ ] Aqara-Würfel (MFKZQ01LM)
- [x] Aqara-Vorhang (ZNCLDJ11LM)
- [ ] Aqara Vorhang B1 (ZNCLDJ12LM)
- [ ] Aqara Türschloss S1 (ZNMS11LM)
- [ ] Aqara Türschloss S2 (ZNMS12LM)
- [] Aqara Türschloss S2 Pro (ZNMS12LM)
- [x] Aqara Türsensor (MCCGQ11LM)
- [ ] Aqara Double Wall Button (WXKG02LM)
- [ ] Aqara Double Wall Button D1 (WXKG07LM)
- [ ] Aqara Doppelwandschalter (QBKG03LM,QBKG12LM)
- [ ] Aqara Doppelwandschalter D1 (QBKG22LM,QBKG24LM)
- [ ] Aqara Doppelwandschalter E1 (QBKG39LM,QBKG41LM)
- [ ] Aqara Doppelwandschalter H1 (WS-EUK02)
- [ ] Aqara Doppelwandschalter US (WS-USC04)
- [x] Aqara-Bewegungssensor (RTCGQ11LM)
- [ ] Aqara Opple Vierknopf (WXCJKG12LM)
- [ ] Aqara Opple MX480 (XDD13LM)
- [ ] Aqara Opple MX650 (XDD12LM)
- [ ] Aqara Opple Sechsknopf (WXCJKG13LM)
- [ ] Aqara Opple Zweiknopf (WXCJKG11LM)
- [ ] Aqara-Stecker (SP-EUC01)
- [ ] Aqara Präzisionsbewegungssensor (RTCGQ13LM)
- [ ] Aqara-Relais (LLKZMK11LM)
- [ ] Aqara Relais T1 (DLKZMK11LM,SSM-U01,SSM-U02)
- [x] Aqara Rollo (ZNGZDJ11LM)
- [ ] Aqara Rollo E1 (ZNJLBL01LM)
- [ ] Aqara Shake-Taste (WXKG12LM)
- [ ] Aqara Single Wall Button (WXKG03LM)
- [ ] Aqara Single Wall Button D1 (WXKG06LM)
- [ ] Aqara Einzelwandschalter (QBKG04LM,QBKG11LM)
- [ ] Aqara Einzelwandschalter D1 (QBKG21LM,QBKG23LM)
- [ ] Aqara Einzelwandschalter E1 (QBKG38LM,QBKG40LM)
- [ ] Aqara Einzelwandschalter H1 (WS-EUK01)
- [ ] Aqara-Sockel (QBCZ11LM)
- [x] Aqara TH-Sensor (WSDCGQ11LM, WSDCGQ12LM)
- [ ] Aqara TVOC Luftqualitätsmonitor (VOCKQJK11LM)
- [ ] Aqara Thermostat S2 (KTWKQ03ES)
- [ ] Aqara Dreifach-Wandschalter D1 (QBKG25LM,QBKG26LM)
- [ ] Aqara Vibrationssensor (DJT11LM)
- [ ] Aqara Wasserlecksensor (SJCGQ11LM)
- [ ] Honeywell Gassensor (JTQJ-BF-01LM/BW)
- [ ] Honeywell-Rauchsensor (JTYJ-GD-01LM/BW)
- [ ] IKEA Birne E14 (LED1649C5)
- [ ] IKEA Birne E14 400 lm (LED1536G5)
- [ ] IKEA Birne E27 1000 lm (LED1623G12)
- [ ] IKEA Birne E27 950 lm (LED1546G12)
- [ ] IKEA Birne E27 980 lm (LED1545G12)
- [ ] IKEA Glühbirne GU10 400 lm (LED1537R6,LED1650R5)
- [x] Xiaomi-Taste (WXKG01LM)
- [x] Xiaomi Türsensor (MCCGQ01LM)
- [] Xiaomi Lichtsensor (GZCGQ01LM)
- [ ] Xiaomi-Bewegungssensor (RTCGQ01LM)
- [x] Xiaomi-Stecker (ZNCZ02LM)
- [ ] Xiaomi Stecker EU (ZNCZ04LM)
- [ ] Xiaomi Stecker TW (ZNCZ03LM)
- [ ] Xiaomi-Stecker US (ZNCZ12LM)
- [] Xiaomi TH-Sensor (WSDCGQ01LM)

### BLE-Geräte
- [ ] Aqara Türschloss N100 (ZNMS16LM)
- [ ] Aqara Türschloss N200 (ZNMS17LM)
- [ ] Honeywell-Rauchmelder (JTYJ-GD-03MI)
- [ ] Xiaomi-Wecker (CGD1)
- [] Xiaomi Türschloss (MJZNMS02LM, XMZNMST02YD)
- [] Xiaomi Türsensor 2 (MCCGQ02HL)
- [ ] Xiaomi Blumenpflege (HHCCJCY01)
- [] Xiaomi Blumentopf (HHCCPOT002)
- [] Xiaomi Zauberwürfel (XMMF01JQD)
- [ ] Xiaomi Mückenschutz (WX08ZM)
- [x] Xiaomi-Bewegungssensor 2 (RTCGQ02LM)
- [] Xiaomi Nachtlicht 2 (MJYD02YL-A)
- [] Xiaomi Qingping Türsensor (CGH1)
- [] Xiaomi Qingping Bewegungssensor (CGPR1)
- [] Xiaomi Qingping TH Lite (CGDK2)
- [] Xiaomi Qingping TH-Sensor (CGG1)
- [] Xiaomi-Safe (BGX-5/X1-3001)
- [x] Xiaomi TH Uhr (LYWSD02MMC)
- [] Xiaomi TH-Sensor (LYWSDCGQ/01ZM)
- [x] Xiaomi TH-Sensor 2 (LYWSD03MMC)
- [] Xiaomi Zahnbürste T500 (MES601)
- [] Xiaomi Wasserlecksensor (SJWS01LM)
- [ ] Xiaomi ZenMeasure Uhr (MHO-C303)
- [x] Xiaomi ZenMeasure TH (MHO-C401)
- [ ] Yeelight-Taste S1 (YLAI003)

_**Hinweis:** BLE-Geräte haben möglicherweise beim ersten Mal nach dem Koppeln keinen Status, da ich die Spezifikationen für Geräte nicht kenne und vorerst keine Eigenschaften für alle Geräte definiert habe. Zustände werden hinzugefügt, wenn das Gerät die entsprechende Eigenschaft aktualisiert. Ich hoffe, ich werde das mit Ihrer Hilfe im Laufe der Zeit beheben._

## Beschreibung einiger Staaten
### `Button long press`
Für Tastengeräte sehen Sie eine Kombination aus zwei Zuständen (wie) `long_press` und `long_timeout`.
Wie funktioniert es? Schaltflächen, die langes Drücken unterstützen, senden eine Nachricht beim Drücken und beim Loslassen-Ereignis. Manchmal kann es vorkommen, dass die Schaltfläche keine Nachricht auf der Freigabetaste gesendet hat. In diesem Fall sollte `timeout` helfen, den Zustand "freizugeben".

Standardmäßig ist `timeout` der Statuswert nicht gesetzt und `long_press` wird 1 Sekunde nach dem Start losgelassen, auch wenn Sie die Taste noch gedrückt halten. Wenn Sie `long_timeout` auf -1 setzen, wird der Timeout überhaupt ignoriert und der Status wird nur durch eine Nachricht von der Schaltfläche "freigegeben".

In den meisten Fällen ist es sinnvoll, `timeout` auf einen kleinen Wert wie 4 oder 5 Sekunden einzustellen.

### `Occupancy` und `Occupancy timeout`
RTCGQ11LM und andere Bewegungssensoren haben eine Verzögerung (Timeout) nach der Bewegungserkennung von 5 bis 60 Sekunden (abhängig von Versionen und Modifikationen). Das bedeutet, dass während dieser Zeit keine neue Bewegung erkannt werden kann (technisch sendet der Sensor keine Nachricht).

`occupancy` werden _**true**_, wenn der Sensor Bewegung erkennt und bleiben _**true**_.

Ziel von `occupancy_timeout` wird `occupancy` auf _**false**_ gesetzt, wenn Sensor wieder Nachricht senden kann. Standardmäßig ist `occupancy_timeout` nicht gesetzt und `occupancy` wechseln nach 60 Sekunden wieder auf _**false**_. Wenn Ihr Sensor eine andere Verzögerung hat, ist es besser, `occupancy_timeout` auf diesen Verzögerungswert einzustellen.

Wenn Sie direkt nach der Bewegungserkennung zu _**false**_ zurückkehren möchten, können Sie `occupancy_timeout` auf 1 Sekunde einstellen.

## Aufbau
Um ein Gateway zu verbinden, benötigen Sie IP und TOKEN des Gateways. Sie können dies manuell oder über die Cloud tun.

Außerdem müssen Sie den Telnet-Öffnungsbefehl auswählen (in den meisten Fällen Option Nr. 2). Sie können Verbindung und Telnet über Schaltflächen testen.

*Ping hier nicht wirklich ping. Es ist eher eine Überprüfung der Geräteverfügbarkeit.*

<img src="static/configuration-main.png">

<br/>

Sie haben mehrere Möglichkeiten, Adapter und Gateway zu konfigurieren.

<img src="static/configuration-settings.png">

### Adaptereinstellungen
- [x] __Statistik sammeln__<br/>

Der Adapter sammelt Statistiken über Nachrichten von Zigbee-Geräten: wie viele empfangene, wie viele verpasste usw. Statistiken werden für jedes Gerät gespeichert und können auf der Registerkarte &quot;Registerkarte&quot; (aus dem Seitenleistenmenü) angezeigt werden.<br/> _**Hinweis:** Adapter setzt Statistik beim Neustart zurück._

- [x] __Debug-Ausgabe (zum Status)__<br/>

Der Adapter gibt für jedes Gerät einige Debug-Informationen in den Zustand aus.

### Grundlegende Gateway3-Einstellungen
- [x] __Telnet aktiviert__<br/>

Standardmäßig aktiviert und muss aktiviert bleiben. Hier nur zur Info.

- [x] __Öffentliches MQTT aktiviert__<br/>

Standardmäßig aktiviert und muss aktiviert bleiben. Hier nur zur Info.

- [x] __Firmware sperren__<br/>

Stellen Sie true (oder false) ein, um die Möglichkeit zum Upgrade der Gateway-Firmware zu deaktivieren (oder zu aktivieren).

- [x] __Summer deaktivieren__<br/>

Setzen Sie true, um störende Summersignale zu deaktivieren, oder false, um alle Signale zu aktivieren.

### Erweiterte Gateway3-Einstellungen
- [x] __Speicherplatz (Beta)__<br/>

Verschieben Sie Geräte-DB-Dateien in den Speicher. Dies kann die Arbeit von Zigbee- und Bluetooth-Geräten verbessern. __*Aber es kann vorkommen, dass einige Daten verloren gehen. Verwendung auf eigene Gefahr.*__

### Protokollierungseinstellungen
_**Hinweis:** Um Debug-Meldungen im ioBroker-Protokoll anzuzeigen, müssen Sie `debug` Protokollebene für Adapter auf der Seite `Instances` einstellen (Expertenmodus auf aktiviert umschalten)_

- [x] __Lumi MQTT-Nachrichten__<br/>

Debug-Protokollierung von MQTT-Nachrichten für Lumi (Zigbee)-Geräte aktivieren.

- [x] __Ble MQTT-Nachrichten__<br/>

Debug-Protokollierung von MQTT-Nachrichten für BLE-Geräte aktivieren.

- [x] __Alle anderen__<br/>

Aktivieren Sie die Debug-Protokollierung aller anderen Adaptermeldungen.

- [x] __Spam schneiden__<br/>

Aktivieren Sie das Ausschneiden doppelter Nachrichten. Wenn sich identische Fehlermeldungen mehrmals wiederholen, werden sie ausgeblendet und nach 1 Stunde wird die Gesamtzahl angezeigt.

## Registerkarte
### Geräte
<img src="static/tab-devices.png">

<br>

Auf der Seite `devices` gibt es Gerätekarten, auf denen Sie einige Informationen über Geräte und aktuelle Statuswerte sehen und einige davon steuern können.

Außerdem können Sie `friendly name` des Geräts ändern.

_**Hinweis:** Im Moment hat diese Seite grundlegende Funktionen. Es wird in Zukunft gut ausgebaut._

### Gerätekonfig
Sie können einige Optionen zum Konfigurieren des Geräts (und der Karte des Geräts) definieren, indem Sie die Konfiguration mit yaml schreiben. Verfügbare Optionen unten in der Tabelle beschrieben. Sie können das Gerätekonfigurationsfenster (Fenster mit Texteingabebereich) mit dem Punkt `Config` im Menü aufrufen.

<img src="static/device-yaml-config.png">

#### Gerätekonfigurationsoptionen
|Feld|Typ|Beschreibung|
|---|---|---|
|cardStates|Dictionary|Dieses Wörterbuch enthält Optionen für Zustände in der Karte des Geräts|
|cardStates.hide|List|Liste der Zustände (Status-IDs), die vor der Karte des Geräts verborgen werden müssen|

### Statistik
<img src="static/tab-statistic.png">

- Statistiken werden standardmäßig nicht geladen. Sie müssen die Schaltfläche „RELOAD“ verwenden, um die Statistik auf der Seite zu aktualisieren.

- Sie können die Statistik auch mit der Schaltfläche „LÖSCHEN“ löschen. Dies ist eigentlich keine saubere Statistik, wie sie ist. Sie löschen nur Zustände, die Statistiken enthalten. Dies kann nützlich sein, falls der Adapter neu gestartet wird, da ioBroker-Zustände beim Neustart nicht gelöscht werden.

_**Achtung:** Sie sollten bedenken, dass dies nicht wirklich eine Statistik der Zigbee-Nachrichten zwischen Gateway und Gerät ist (Statistik des Zigbee-Protokolls). Dies ist eine Statistik der Nachrichten, die den Adapter erhalten. Was bedeutet das? Keine Unterschiede für Adapter, Gateway erhält keine Nachricht vom Gerät oder Adapter selbst erhält keine Nachricht vom Gateway (durch MQTT). Und wenn der Adapter in irgendeinem Fall (z. B. Wi-Fi-Verbindungsproblem) keine Nachrichten vom Gateway erhält, interpretiert er diese Nachrichten als verpasst, aber eigentlich ist Zigbee in Ordnung._

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.5 (2022-05-08)
* Added configuration for devices
* Added cutting SPAM messages at log
* Remove unnecessary `Debug log` option
* Fixes and improvements

### 0.3.4 (2022-02-10)
* Fix issue getting devices from cloud and switch to RC4
* Add devices page
* Other fixes and improvements

### 0.3.3 (2022-01-30)
* Fix lumi temperature and voltage

### 0.3.2 (2022-01-30)
* Bug fixes and code improvements
* Add curtain and buttons support
* Update README

### 0.3.1 (2022-01-17)
* Bug fixes and code improvements
* Improved support firmware 1.5.1_0032 and some devices

### 0.3.0 (2021-12-10)
* Improved adapter logging

### 0.2.0 (2021-12-07)
* Added states classes and rewrote code with using them
* Added tab-page of adapter
* Added zigbee (lumi) devices statistic
* A lot of code improvements

### 0.1.0 (2021-11-09)
* (Evgenii Abramov) Added support for BLE devices (needed tests)
* (Evgenii Abramov) Improvements for zigbee and BLE support
* (Evgenii Abramov) Added output for debug purpose
* (Evgenii Abramov) A lot of code improvements

### 0.0.1-alpha.0 (2021-10-13)
* (Evgenii Abramov) Initial release

## License
MIT License

Copyright (c) 2022 Evgenii Abramov <john.abramov@gmail.com>

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

<!--
    npm run release -- -p iobroker --all --dry
-->